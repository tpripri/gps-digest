/**
 * Robustesse : bugs trouvés lors de la revue de code du 5 octobre 2026.
 *
 * Chaque section reproduit un défaut constaté avant correction : fichier
 * légèrement imparfait, séance très longue, format inattendu. Les données
 * réelles sont sales ; l'outil ne doit ni planter ni mentir.
 *
 *   node --experimental-strip-types test/robustness.ts
 */

import { parseFitBuffer } from "../src/parse-fit.ts";
import { decodeFit, FIT_SUB_SPORT } from "../src/fit-decode.ts";
import { digestActivity, digestFile } from "../src/digest.ts";
import { elevationGainLoss, mmss } from "../src/geo.ts";
import { hrZones } from "../src/analyze.ts";
import { thinByTime } from "../src/reduce.ts";
import { paceLabel } from "../src/serialize.ts";
import { formatSpeed } from "../src/classify.ts";
import { fetchWeather } from "../src/weather.ts";
import { pickLocale } from "../worker/index.ts";
import type { Activity, Sample } from "../src/types.ts";
import { FIT, fitWriter, fitTime, toSemicircles, writeDeviceInfo, writeProfile, writeSession } from "./fit-writer.ts";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  const mark = ok ? "\u001b[32m✓\u001b[0m" : "\u001b[31m✗\u001b[0m";
  console.log(`  ${mark} ${label}${detail ? `  \u001b[2m${detail}\u001b[0m` : ""}`);
  if (!ok) failures++;
}
const section = (title: string) => console.log(`\n\u001b[1m${title}\u001b[0m`);
const attempt = <T>(f: () => T): T | Error => {
  try {
    return f();
  } catch (e) {
    return e as Error;
  }
};

const START = "2026-09-20T07:00:00Z";

// ─────────────────────────────────────────────────────────────────────────
section("1. Points sans distance : la séance garde sa distance et son analyse");
{
  // 50 min à 3 m/s ; cinq points sans distance au milieu, et les trente
  // derniers aussi (FC seule après l'arrêt de la montre).
  const w = fitWriter();
  const t0 = fitTime(START);
  // Pas de message session (ses totaux masqueraient le défaut) : le sport
  // vient du message `sport`.
  w.message(12, [{ num: 0, type: FIT.enum, value: 1 }], 7);
  for (let s = 0; s <= 3000; s++) {
    const fields = [
      { num: 253, type: FIT.uint32, value: t0 + s },
      { num: 0, type: FIT.sint32, value: toSemicircles(48.85 + (s * 3) / 111_320) },
      { num: 1, type: FIT.sint32, value: toSemicircles(2.35) },
      { num: 3, type: FIT.uint8, value: 150 },
    ];
    if (!((s >= 1000 && s <= 1004) || s > 2970)) fields.push({ num: 5, type: FIT.uint32, value: Math.round(s * 300) });
    w.message(20, fields, 1);
  }
  const { activity, extras } = parseFitBuffer(w.bytes(), "fr");
  const res = digestActivity(activity, { locale: "fr", fitExtras: extras });
  const s = res.digest.session;
  check("distance : celle du dernier point connu", Math.abs(s.distM - 8910) <= 3, `${s.distM} m`);
  check("vitesse max plausible (pas de saut de toute la distance en une seconde)", (s.speedMaxMS ?? 0) < 4, `${s.speedMaxMS?.toFixed(1)} m/s`);
  check("séance analysée : splits et meilleurs efforts", s.tier === "full" && res.digest.splits.length >= 8 && res.insights.efforts.length > 0,
    `${s.tier}, ${res.digest.splits.length} splits, ${res.insights.efforts.length} efforts`);

  // TCX qui finit par des points de FC seule, sans distance au tour.
  const pts: string[] = [];
  for (let i = 0; i <= 1800; i++) {
    const t = new Date(Date.parse(START) + i * 1000).toISOString();
    const moving = i <= 1740;
    pts.push(`<Trackpoint><Time>${t}</Time>${moving ? `<Position><LatitudeDegrees>${(48.85 + (i * 3) / 111320).toFixed(7)}</LatitudeDegrees><LongitudeDegrees>2.35</LongitudeDegrees></Position><DistanceMeters>${(i * 3).toFixed(1)}</DistanceMeters>` : ""}<HeartRateBpm><Value>150</Value></HeartRateBpm></Trackpoint>`);
  }
  const tcx = `<?xml version="1.0"?><TrainingCenterDatabase><Activities><Activity Sport="Running"><Id>${START}</Id><Lap StartTime="${START}"><TotalTimeSeconds>1800</TotalTimeSeconds><Track>${pts.join("")}</Track></Lap></Activity></Activities></TrainingCenterDatabase>`;
  const t = await digestFile("fin.tcx", tcx, { locale: "fr" });
  check("TCX : distance conservée malgré les derniers points sans distance", Math.abs(t.digest.session.distM - 5220) <= 3, `${t.digest.session.distM} m`);
}

// ─────────────────────────────────────────────────────────────────────────
section("2. Séance très longue : l'analyse ne plante pas");
{
  // 36 h à 1 Hz (ultra-trail) : 130 000 points. Safari plafonne vers 65 000
  // arguments par appel, Chrome vers 120 000.
  const n = 130_000;
  const samples: Sample[] = Array.from({ length: n }, (_, t) => ({
    t, dist: t * 2, lat: 45 + (t * 2) / 111_320, lon: 6, ele: 1000 + Math.sin(t / 500) * 200, hr: 130 + (t % 20), temp: 15,
  }));
  const activity: Activity = { sport: "running", startTime: "2026-08-29T16:00:00Z", source: "fit", samples, laps: [] };
  const out = attempt(() => digestActivity(activity, { locale: "fr", streamTokenBudget: 3000 }));
  check("130 000 points analysés sans erreur", !(out instanceof Error), out instanceof Error ? out.message : `${(out.digest.session.distM / 1000).toFixed(0)} km`);
}

// ─────────────────────────────────────────────────────────────────────────
section("3. Allègement du mode archive : le temps en zones est conservé");
{
  const total = (z: ReturnType<typeof hrZones>) => z.reduce((a, b) => a + b.timeS, 0);
  // Enregistrement « intelligent » Garmin : un point toutes les 4 s.
  const smart: Sample[] = Array.from({ length: 901 }, (_, k) => ({ t: k * 4, hr: 150 }));
  const thin = thinByTime(smart);
  check("4 s entre points : temps en zones identique après allègement", total(hrZones(thin, { maxHr: 190 })) === 3600,
    `${total(hrZones(thin, { maxHr: 190 }))} s sur 3600`);
  const oneHz: Sample[] = Array.from({ length: 3601 }, (_, t) => ({ t, hr: 150 }));
  const thin1 = thinByTime(oneHz);
  check("1 point par seconde : allégé d'un facteur 5 environ", thin1.length <= 760 && thin1.length >= 700, `${thin1.length} points`);
  check("le dernier point est toujours gardé", thin1[thin1.length - 1].t === 3600 && thin[thin.length - 1].t === 3600);
}

// ─────────────────────────────────────────────────────────────────────────
section("4. Format m:ss : jamais « 4:60 »");
{
  check("mmss(299.6) = 5:00", mmss(299.6) === "5:00", mmss(299.6));
  check("mmss(599.7) = 10:00", mmss(599.7) === "10:00", mmss(599.7));
  check("mmss(272.4) = 4:32", mmss(272.4) === "4:32", mmss(272.4));
  check("paceLabel(299.6) = 5:00", paceLabel(299.6) === "5:00", paceLabel(299.6));
  check("formatSpeed : 3,3389 m/s (4:59,5/km) = 5:00/km", formatSpeed("running", 1000 / 299.6) === "5:00/km", formatSpeed("running", 1000 / 299.6));
  check("formatSpeed natation : 1:59,7/100 m = 2:00/100m", formatSpeed("swimming", 100 / 119.7) === "2:00/100m", formatSpeed("swimming", 100 / 119.7));
}

// ─────────────────────────────────────────────────────────────────────────
section("5. Dénivelé : une montée prolongée n'est plus perdue");
{
  const profile = (levels: number[], holdS = 120): Sample[] =>
    levels.flatMap((e, k) => Array.from({ length: holdS }, (_, i) => ({ t: k * holdS + i, ele: e })));
  const a = elevationGainLoss(profile([0, 10, 12, 9]));
  check("0 → 10 → 12 → 9 m : +12 / -3", Math.round(a.gain) === 12 && Math.round(a.loss) === 3, JSON.stringify(a));
  const b = elevationGainLoss(profile([0, 2, 0, 2, 0, 2, 0]));
  check("bruit de ±2 m sur le plat : rien", a && b.gain === 0 && b.loss === 0, JSON.stringify(b));
  const c = elevationGainLoss(profile([0, 20, 40, 60, 40, 20, 0]));
  check("aller-retour en côte de 60 m : +60 / -60", Math.round(c.gain) === 60 && Math.round(c.loss) === 60, JSON.stringify(c));
}

// ─────────────────────────────────────────────────────────────────────────
section("6. FIT tronqué : lu jusqu'à la coupure, jamais d'erreur technique");
{
  const w = fitWriter();
  writeDeviceInfo(w, { startIso: START, deviceIndex: 1, deviceType: 10, sourceType: 5 });
  const parts = writeProfile(w, { startIso: START, segments: [{ durS: 600, speedMS: 3 }] });
  writeSession(w, { startIso: START, elapsedS: 600, distM: parts[0].distM, sport: 1 });
  const full = w.bytes();
  let thrown = 0;
  let lastError = "";
  for (let cut = 14; cut < full.length; cut += cut < 600 ? 1 : 29) {
    const out = attempt(() => decodeFit(full.subarray(0, cut)));
    if (out instanceof Error) { thrown++; lastError = out.message; }
  }
  check("aucune coupure ne fait échouer la lecture", thrown === 0, thrown ? `${thrown} échecs : ${lastError}` : "");
  const half = attempt(() => decodeFit(full.subarray(0, Math.floor(full.length / 2))));
  const records = half instanceof Error ? 0 : (half.byGlobal.get(20)?.length ?? 0);
  check("la moitié du fichier donne environ la moitié des points", records > 250 && records < 350, `${records} points`);
}

// ─────────────────────────────────────────────────────────────────────────
section("7. Météo : la requête de prévision est acceptée par l'API");
{
  const urls: string[] = [];
  const fakeFetch = (async (url: string) => {
    urls.push(String(url));
    return new Response(JSON.stringify({ hourly: { time: ["2026-10-03T07:00"], temperature_2m: [12] } }), { status: 200 });
  }) as unknown as typeof fetch;
  const samples: Sample[] = [{ t: 0, lat: 48.85, lon: 2.35 }, { t: 1800, lat: 48.86, lon: 2.35 }];
  const recent = new Date(Date.now() - 2 * 86_400_000);
  recent.setUTCHours(7, 0, 0, 0);
  const obs = await fetchWeather(samples, recent.toISOString(), 1800, { fetchImpl: fakeFetch });
  check("prévision demandée sans « past_days » (incompatible avec start_date)", urls.length > 0 && !urls[0].includes("past_days"), urls[0] ?? "aucune requête");
  check("point milieu du parcours, arrondi à 2 décimales", /latitude=48\.86&longitude=2\.35&/.test(urls[0] ?? ""), urls[0]);
  check("observation renvoyée", obs?.tempC === 12, JSON.stringify(obs));
}

// ─────────────────────────────────────────────────────────────────────────
section("8. Tables FIT et libellés");
{
  check("sous-sport FIT 1 = tapis, 5 = vélo d'intérieur (spin)", FIT_SUB_SPORT[1] === "treadmill" && FIT_SUB_SPORT[5] === "spin",
    `1=${FIT_SUB_SPORT[1]}, 5=${FIT_SUB_SPORT[5]}`);
  // Fabricant absent de la table : libellé dans la langue demandée.
  const w = fitWriter();
  w.message(0, [{ num: 1, type: FIT.uint16, value: 999 }], 6);
  writeProfile(w, { startIso: START, segments: [{ durS: 120, speedMS: 3 }] });
  const en = parseFitBuffer(w.bytes(), "en");
  check("fabricant inconnu traduit (anglais)", en.extras.manufacturer === "manufacturer 999", en.extras.manufacturer);
}

// ─────────────────────────────────────────────────────────────────────────
section("9. digestFile sur un FIT : totaux de session et matériel lus");
{
  const w = fitWriter();
  writeDeviceInfo(w, { startIso: START, deviceIndex: 1, deviceType: 10, sourceType: 5 });
  const parts = writeProfile(w, { startIso: START, segments: [{ durS: 1200, speedMS: 3, hr: 150 }] });
  // La session annonce plus loin que les points : elle fait foi.
  writeSession(w, { startIso: START, elapsedS: 1300, distM: parts[0].distM + 300, sport: 1 });
  const res = await digestFile("seance.fit", w.bytes(), { locale: "fr" });
  check("distance du message session", Math.abs(res.digest.session.distM - (parts[0].distM + 300)) <= 1, `${res.digest.session.distM} m`);
  check("source de FC lue dans device_info", res.insights.hrSource.fromDeviceMetadata && res.insights.hrSource.verdict === "optical",
    `${res.insights.hrSource.verdict}, fichier ${res.insights.hrSource.fromDeviceMetadata}`);
}

// ─────────────────────────────────────────────────────────────────────────
section("10. Redirection de langue (Worker)");
{
  check("fr-CA,fr;q=0.9,en;q=0.8 → fr", pickLocale("fr-CA,fr;q=0.9,en;q=0.8") === "fr");
  check("it-IT,it;q=0.9 → en (langue non publiée)", pickLocale("it-IT,it;q=0.9") === "en");
  check("de;q=0.5, ja → ja (le facteur de qualité compte)", pickLocale("de;q=0.5, ja") === "ja");
  check("sans en-tête → en", pickLocale(null) === "en");
  check("zh-Hans-CN → zh", pickLocale("zh-Hans-CN,zh;q=0.9") === "zh");
}

console.log(failures ? `\n\u001b[31m${failures} échec(s)\u001b[0m\n` : "\n\u001b[32mToute la robustesse passe\u001b[0m\n");
process.exitCode = failures ? 1 : 0;
