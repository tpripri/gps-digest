/**
 * Régressions de la revue du 4 octobre 2026
 * sur fichiers synthétiques.
 *
 * Un banc local, non versionné, vérifie les mêmes points sur les fichiers réels de
 * l'athlète, non versionnés ; celui-ci tourne partout, à chaque commit.
 *
 *   node --experimental-strip-types test/regressions.ts
 */

import { parseFitBuffer, parseFitParts } from "../src/parse-fit.ts";
import { digestActivity } from "../src/digest.ts";
import { hrZones } from "../src/analyze.ts";
import { bestEfforts } from "../src/efforts.ts";
import { analyzeBatch, type FileAnalysis } from "../src/batch.ts";
import { buildDossier } from "../src/dossier.ts";
import { haversine } from "../src/geo.ts";
import { t } from "../src/i18n.ts";
import type { Activity, DigestOptions, Sample } from "../src/types.ts";
import { FIT, fitWriter, fitTime, toSemicircles, writeLap, writeProfile, writeRecords, writeSession, writeWorkoutStep, writeDeviceInfo, type FitSegment } from "./fit-writer.ts";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  const mark = ok ? "\u001b[32m✓\u001b[0m" : "\u001b[31m✗\u001b[0m";
  console.log(`  ${mark} ${label}${detail ? `  \u001b[2m${detail}\u001b[0m` : ""}`);
  if (!ok) failures++;
}
const section = (title: string) => console.log(`\n\u001b[1m${title}\u001b[0m`);

const BASE: DigestOptions = { athlete: {}, streamTokenBudget: 3000, driftWarmupS: 300, locale: "fr" };

function analyse(bytes: Uint8Array, opts: DigestOptions = {}) {
  const { activity, extras } = parseFitBuffer(bytes, "fr");
  return digestActivity(activity, { ...BASE, ...opts, fitExtras: extras });
}
const asFile = (name: string, res: ReturnType<typeof analyse>): FileAnalysis => ({
  filename: name, digest: res.digest, hrSource: res.insights.hrSource, drift: res.insights.drift,
  adherence: res.insights.adherence, efforts: res.insights.efforts, samples: res.samples, hrSpeed: res.insights.hrSpeed,
});

const START = "2026-09-20T07:00:00Z";

// ─────────────────────────────────────────────────────────────────────────
section("1. La zone de confidentialité ne coupe jamais la séance");
{
  // Aller-retour : 10 min vers le nord, 10 min de retour au point de départ.
  // Le rognage d'avant retirait les premières et dernières centaines de
  // mètres, donc la fin de la séance, sa FC max comprise.
  const w = fitWriter();
  const t0 = fitTime(START);
  const v = 3;
  for (let s = 0; s <= 1200; s++) {
    const out = s <= 600 ? s : 1200 - s;
    w.message(20, [
      { num: 253, type: FIT.uint32, value: t0 + s },
      { num: 0, type: FIT.sint32, value: toSemicircles(48.85 + (out * v) / 111_320) },
      { num: 1, type: FIT.sint32, value: toSemicircles(2.35) },
      { num: 5, type: FIT.uint32, value: Math.round(s * v * 100) },
      { num: 3, type: FIT.uint8, value: s >= 1190 ? 181 : 150 },
    ], 1);
  }
  writeSession(w, { startIso: START, elapsedS: 1200, distM: 3600, sport: 1, hrMax: 181 });
  const fit = w.bytes();

  const plain = analyse(fit, { privacyRadiusM: 0 }).digest.session;
  const res = analyse(fit, { privacyRadiusM: 250 });
  const s = res.digest.session;
  check("distance, durée et FC max identiques avec ou sans zone",
    Math.round(s.distM) === Math.round(plain.distM) && s.durElapsedS === plain.durElapsedS && s.hrMax === 181,
    `${Math.round(s.distM)} m, ${s.durElapsedS} s, FC max ${s.hrMax}`);
  const home = { lat: 48.85, lon: 2.35 };
  const leaks = res.samples.filter((p) => p.lat != null && haversine(p.lat, p.lon!, home.lat, home.lon) < 250);
  check("aucune position conservée à moins de 250 m du départ, aller comme retour", leaks.length === 0, `${leaks.length} point(s)`);
  check("tous les points restent là, seules les coordonnées disparaissent", res.samples.length === 1201, `${res.samples.length}`);
  check("la séance note le rayon masqué", s.privacyMaskRadiusM === 250);

  const dossier = buildDossier(analyzeBatch([asFile("aller-retour.fit", res)], { locale: "fr" }),
    { dropCoordinates: false, streamMode: "time", intervalS: 30 });
  check("le dossier prévient l'IA : positions effacées, totaux complets", dossier.includes(t("fr", "dossier.privacyMasked", { m: 250 })));
}

section("1. Les totaux du message session font foi, contrôle d'intégrité");
{
  // Points jusqu'à 400 s, mais la montre déclare 600 s et 1 800 m.
  const w = fitWriter();
  writeRecords(w, { startIso: START, fromS: 0, toS: 400, speedMS: 3, hr: 150 });
  writeSession(w, { startIso: START, elapsedS: 600, distM: 1800, sport: 1 });
  const res = analyse(w.bytes());
  const s = res.digest.session;
  check("distance et durée écoulée reprises du message session", Math.round(s.distM) === 1800 && s.durElapsedS === 600,
    `${Math.round(s.distM)} m, ${s.durElapsedS} s`);
  check("fin d'enregistrement manquante détectée (200 s)", s.recordsEndGapS === 200, `${s.recordsEndGapS}`);
  const warnings = analyzeBatch([asFile("coupe.fit", res)], { locale: "fr" }).warnings;
  check("avertissement explicite dans le dossier",
    warnings.some((x) => x === t("fr", "batch.warnRecordsGap", { n: 1, list: "coupe.fit (200 s)" })), warnings.join(" | ").slice(0, 120));

  const w2 = fitWriter();
  writeRecords(w2, { startIso: START, fromS: 0, toS: 600, speedMS: 3, hr: 150 });
  writeSession(w2, { startIso: START, elapsedS: 600, distM: 1800, sport: 1 });
  check("fichier complet : aucun écart signalé", analyse(w2.bytes()).digest.session.recordsEndGapS == null);
}

// ─────────────────────────────────────────────────────────────────────────
section("2. Multisport : une sous-séance par message session");
{
  // Natation 600 s, transition 120 s, course 900 s, dans un seul fichier.
  // La distance des points est cumulée sur tout le fichier, comme chez Garmin.
  const w = fitWriter();
  writeRecords(w, { startIso: START, fromS: 0, toS: 599, speedMS: 1.2, hr: 130 });
  writeRecords(w, { startIso: START, fromS: 600, toS: 719, speedMS: 1.5, hr: 120, distOffsetM: 720 });
  writeRecords(w, { startIso: START, fromS: 720, toS: 1620, speedMS: 3.3, hr: 155, distOffsetM: 900 });
  writeSession(w, { startIso: START, offsetS: 0, elapsedS: 600, distM: 720, sport: 5, subSport: 18 });
  writeSession(w, { startIso: START, offsetS: 600, elapsedS: 120, distM: 180, sport: 3 });
  writeSession(w, { startIso: START, offsetS: 720, elapsedS: 900, distM: 2970, sport: 1 });
  const parts = parseFitParts(w.bytes(), "fr");
  check("3 sous-séances", parts.length === 3, `${parts.length}`);
  check("sports dans l'ordre, transition marquée",
    parts.map((p) => (p.part?.transition ? "transition" : p.activity.sport)).join(",") === "swimming,transition,running",
    parts.map((p) => p.activity.sport).join(","));
  const res = parts.map((p) => digestActivity(p.activity, { ...BASE, fitExtras: p.extras }));
  check("chaque sous-séance repart de zéro (temps et distance)",
    res[2].samples[0].t === 0 && Math.abs(res[2].samples[0].dist ?? 0) < 1 && res[2].digest.session.durElapsedS === 900,
    `t0 ${res[2].samples[0].t}, d0 ${Math.round(res[2].samples[0].dist ?? 0)}, ${res[2].digest.session.durElapsedS} s`);
  const batch = analyzeBatch(res.map((r, i) => ({ ...asFile("tri.fit", r), part: parts[i].part })), { locale: "fr" });
  check("transitions hors volumes", Math.round(batch.totalDistanceM) === 720 + 2970, `${Math.round(batch.totalDistanceM)} m`);
  const dossier = buildDossier(batch, { streamMode: "none" });
  check("le dossier affiche la transition et rattache les sous-séances", /,transition,/.test(dossier) && /\b3\/3\b/.test(dossier));
  check("un fichier mono-sport reste une seule séance",
    parseFitParts((() => { const x = fitWriter(); writeRecords(x, { startIso: START, fromS: 0, toS: 60, speedMS: 3, hr: 150 });
      writeSession(x, { startIso: START, elapsedS: 60, distM: 180, sport: 1 }); return x.bytes(); })(), "fr").every((p) => !p.part));
}

// ─────────────────────────────────────────────────────────────────────────
section("3. Allure ajustée à la pente (GAP) dans le bon sens");
{
  /**
   * Course à vitesse constante (3 m/s) sur un profil donné par grade(d), en %.
   * Le sens du GAP ne doit dépendre que de la pente, pas de l'allure.
   */
  const course = (sport: Activity["sport"], grade: (d: number) => number, distM = 3000, v = 3): Activity => {
    const samples: Sample[] = [];
    let ele = 100;
    for (let t = 0; t * v <= distM; t++) {
      const d = t * v;
      if (t > 0) ele += grade(d) * v;
      samples.push({ t, dist: d, ele, hr: 150 });
    }
    return { sport, startTime: START, device: "test", source: "fit", samples, laps: [] };
  };
  const session = (a: Activity) => digestActivity(a, BASE).digest.session;

  const up = session(course("running", () => 0.05));
  check("montée à 5 % : GAP plus rapide que l'allure", (up.gapAvgSPerKm ?? Infinity) < (up.paceAvgSPerKm ?? 0),
    `GAP ${up.gapAvgSPerKm?.toFixed(0)} s/km, allure ${up.paceAvgSPerKm?.toFixed(0)} s/km`);
  const down = session(course("running", () => -0.05));
  check("descente à 5 % : GAP plus lente que l'allure", (down.gapAvgSPerKm ?? 0) > (down.paceAvgSPerKm ?? Infinity),
    `GAP ${down.gapAvgSPerKm?.toFixed(0)} s/km, allure ${down.paceAvgSPerKm?.toFixed(0)} s/km`);

  // Aller-retour sur une bosse : 1,5 km à +4 %, retour à −4 %.
  const loop = session(course("running", (d) => (d < 1500 ? 0.04 : -0.04)));
  const gapLoop = Math.abs((loop.gapAvgSPerKm ?? 0) - (loop.paceAvgSPerKm ?? 0)) / (loop.paceAvgSPerKm ?? 1);
  check("boucle (départ = arrivée) : GAP à moins de 3 % de l'allure", gapLoop < 0.03, `${(gapLoop * 100).toFixed(1)} %`);

  // Pente aberrante (saut d'altitude) : bornée à ±30 %, pas de GAP absurde.
  const spike = session(course("running", (d) => (d > 1000 && d < 1010 ? 3 : 0)));
  check("pente bornée : un saut d'altitude ne fait pas exploser la GAP",
    Math.abs((spike.gapAvgSPerKm ?? 0) - (spike.paceAvgSPerKm ?? 0)) / (spike.paceAvgSPerKm ?? 1) < 0.05,
    `GAP ${spike.gapAvgSPerKm?.toFixed(0)} s/km, allure ${spike.paceAvgSPerKm?.toFixed(0)} s/km`);

  const bike = digestActivity(course("cycling", () => 0.03, 15000, 8), BASE).digest;
  check("vélo : pas de GAP, ni dans la séance ni dans les splits",
    bike.session.gapAvgSPerKm == null && bike.splits.every((s) => s.gapSPerKm == null));
}

// ─────────────────────────────────────────────────────────────────────────
section("4. Zones de FC paramétrées, mêmes bornes pour toutes les séances");
{
  const bounds = (z: { lowerInclusive: number }[]) => z.map((x) => x.lowerInclusive).join(",");
  /** 20 min de course, FC constante. */
  const flat = (hr: number, startTime = START): Activity => ({
    sport: "running", startTime, device: "test", source: "fit", laps: [],
    samples: Array.from({ length: 1201 }, (_, t) => ({ t, dist: t * 3, ele: 100, hr })),
  });

  check("% FC max : 50/60/70/80/90 % de 200",
    bounds(hrZones(flat(150).samples, { maxHr: 200 })) === "100,120,140,160,180", bounds(hrZones(flat(150).samples, { maxHr: 200 })));
  check("% FC de réserve (Karvonen) : repos + 50 à 90 % de la réserve",
    bounds(hrZones(flat(150).samples, { maxHr: 200, restHr: 50, hrZoneModel: "reserve" })) === "125,140,155,170,185",
    bounds(hrZones(flat(150).samples, { maxHr: 200, restHr: 50, hrZoneModel: "reserve" })));
  const thr = hrZones(flat(150).samples, { lthr: 160 });
  check("% FC seuil, retenu d'office quand le seuil est connu : Z5 à partir du seuil",
    thr[4]?.lowerInclusive === 160 && thr[3]?.lowerInclusive === 152, bounds(thr));

  // Sans profil : la FC max observée sur TOUTE la période, pas celle de chaque séance.
  const a = digestActivity(flat(140), BASE);
  const b = digestActivity(flat(185, "2026-09-21T07:00:00Z"), BASE);
  const batch = analyzeBatch([asFile("a.fit", a), asFile("b.fit", b)], { locale: "fr" });
  check("sans profil : bornes identiques pour toutes les séances (FC max de la période)",
    bounds(batch.files[0].digest.hrZones) === bounds(batch.files[1].digest.hrZones) && batch.files[0].digest.hrZones[4]?.lowerInclusive === Math.round(0.9 * 185),
    `${bounds(batch.files[0].digest.hrZones)} / ${bounds(batch.files[1].digest.hrZones)}`);
  check("le footing à 140 ne compte plus de VO2max", (batch.files.find((f) => f.filename === "a.fit")!.digest.hrZones[4]?.timeS ?? 0) === 0);
  check("base des zones annoncée en tête de dossier",
    buildDossier(batch, { streamMode: "none" }).includes(t("fr", "dossier.hrZonesObserved", { hr: 185 })));
  const withProfile = analyzeBatch([asFile("a.fit", digestActivity(flat(140), { ...BASE, athlete: { lthr: 160 } }))],
    { locale: "fr", athlete: { lthr: 160 } });
  check("avec profil : base annoncée (modèle et valeur)",
    buildDossier(withProfile, { streamMode: "none" }).includes(t("fr", "dossier.hrZonesThreshold", { hr: 160 })));
}

// ─────────────────────────────────────────────────────────────────────────
section("5. Meilleurs efforts : sauts GPS rejetés, efforts réels conservés");
{
  /** Footing à 3 m/s, cadence 168, FC 140 ; `tweak` modifie le parcours. */
  const footing = (tweak: (t: number, d: number) => { d: number; cad?: number; hr?: number }) => {
    const samples: Sample[] = [];
    let d = 0;
    for (let t = 0; t <= 1800; t++) {
      if (t > 0) d += 3;
      const p = tweak(t, d);
      samples.push({ t, dist: p.d, ele: 100, cad: p.cad ?? 168, hr: p.hr ?? 140 });
    }
    return samples;
  };
  // Tunnel : la distance se fige 25 s, puis rattrape d'un coup 80 m de plus.
  const tunnel = footing((t, d) => ({ d: t >= 600 && t < 625 ? 1800 : t >= 625 ? d + 80 : d }));
  const e400 = bestEfforts(tunnel).find((e) => e.distanceM === 400);
  check("tunnel : pas de 400 m irréaliste", !!e400 && e400.timeS > 120, `${e400?.timeS.toFixed(0)} s`);

  // Vrai 400 m rapide au milieu du footing : 6 m/s, cadence 192, FC qui monte.
  let extra = 0;
  const fast = footing((t, d) => {
    if (t >= 900 && t < 967) { extra += 3; return { d: d + extra, cad: 192, hr: 165 }; }
    return { d: d + extra };
  });
  const real = bestEfforts(fast).find((e) => e.distanceM === 400);
  check("effort réel conservé (400 m à 6 m/s, cadence et FC cohérentes)", !!real && real.timeS < 70, `${real?.timeS.toFixed(0)} s`);

  // Foulée impossible : 400 m à 7 m/s avec une cadence de footing (2,5 m/pas).
  let extra2 = 0;
  const stride = footing((t, d) => {
    if (t >= 900 && t < 958) { extra2 += 4; return { d: d + extra2 }; }
    return { d: d + extra2 };
  });
  const bad = bestEfforts(stride).find((e) => e.distanceM === 400);
  // L'artefact (400 m en 57 s à cadence de footing) ne doit plus être retenu.
  check("foulée incohérente avec la cadence : effort rejeté", !!bad && bad.timeS > 60, `${bad?.timeS.toFixed(0)} s`);
}

// ─────────────────────────────────────────────────────────────────────────
section("6. Vitesse critique sur 90 jours, projections confrontées au réel");
{
  /** Séance de course réduite à ses meilleurs efforts : c'est tout ce que le modèle lit. */
  const effortFile = (date: string, efforts: [number, number][]): FileAnalysis => {
    const res = digestActivity({
      sport: "running", startTime: date, device: "test", source: "fit", laps: [],
      samples: Array.from({ length: 3601 }, (_, t) => ({ t, dist: t * 3, ele: 100, hr: 150 })),
    }, BASE);
    return { ...asFile(date, res), efforts: efforts.map(([d, s]) => ({ distanceM: d, timeS: s, paceSPerKm: (s / d) * 1000, speedMS: d / s, startS: 0 })) };
  };
  const files = [
    // Il y a huit mois : très rapide, ne doit plus peser.
    effortFile("2026-02-01T08:00:00Z", [[1000, 170], [1609.344, 290], [3000, 560], [5000, 960]]),
    effortFile("2026-09-05T08:00:00Z", [[10000, 2470]]),
    // Sortie longue sous-maximale : elle tire le modèle vers le haut.
    effortFile("2026-09-20T08:00:00Z", [[21097.5, 5900]]),
    // Fractionnés courts pas tout à fait maximaux : vitesse critique trop basse.
    effortFile("2026-09-28T08:00:00Z", [[1000, 235], [1609.344, 390], [3000, 760], [5000, 1290]]),
  ];
  const batch = analyzeBatch(files, { locale: "fr" });
  const used = batch.criticalSpeed?.usedEfforts ?? [];
  check("vitesse critique : l'effort de février (hors 90 jours) est écarté",
    used.length > 0 && !used.some((e) => e.sourceDate === "2026-02-01"), used.map((e) => e.sourceDate).join(","));
  check("fenêtre annoncée", batch.effortsWindowDays === 90 && batch.effortsWindowFrom === "2026-06-30", batch.effortsWindowFrom);
  const p10 = batch.projections.find((p) => p.distanceM === 10000);
  check("projection 10 km jamais plus lente que le 10 km réellement couru dans la fenêtre",
    !!p10 && p10.timeS <= 2470 + 1, `${p10?.timeS.toFixed(0)} s`);
  check("écart entre modèle et réel signalé, confiance abaissée",
    !!p10 && p10.achievedS === 2470 && (p10.modelGapPct ?? 0) > 3 && p10.confidence === "faible" && /2026-09-05/.test(p10.caveat ?? ""),
    `réel ${p10?.achievedS}, écart ${p10?.modelGapPct?.toFixed(1)} %, confiance ${p10?.confidence}`);
  // Un 5 km couru tranquillement à l'entraînement : le modèle, plus rapide,
  // n'a pas tort pour autant.
  const easy = analyzeBatch([
    effortFile("2026-09-20T08:00:00Z", [[5000, 1300]]),
    effortFile("2026-09-28T08:00:00Z", [[1000, 210], [1609.344, 350], [3000, 680]]),
  ], { locale: "fr" });
  const p5 = easy.projections.find((p) => p.distanceM === 5000);
  check("5 km : modèle plus rapide qu'un effort d'entraînement, pas de pénalité",
    !!p5 && p5.achievedS === 1300 && (p5.modelGapPct ?? 0) < -3 && p5.confidence === "moyenne" && p5.timeS < 1300,
    `écart ${p5?.modelGapPct?.toFixed(1)} %, confiance ${p5?.confidence}`);
  const raced = analyzeBatch(files, { locale: "fr", raceResults: [{ distanceM: 10000, timeS: 2490, date: "2026-09-05" }] });
  const r10 = raced.projections.find((p) => p.distanceM === 10000);
  check("avec un résultat de course récent, la projection 10 km reste à moins de 2 % du chrono",
    !!r10 && Math.abs(r10.timeS - 2490) / 2490 < 0.02, `${r10?.timeS.toFixed(0)} s`);
  const dossier = buildDossier(batch, { streamMode: "none" });
  check("le dossier montre le chrono réel et l'écart du modèle",
    /achieved,achieved_on,model_gap_pct/.test(dossier) && /window_days,90/.test(dossier) && /depuis le 2026-06-30/.test(dossier));
}

// ─────────────────────────────────────────────────────────────────────────
section("7. Intervalles : séance prescrite d'abord, détection prudente sinon");
{
  const run = (segments: FitSegment[], extra?: (w: ReturnType<typeof fitWriter>, parts: ReturnType<typeof writeProfile>) => void, sport = 1) => {
    const w = fitWriter();
    const parts = writeProfile(w, { startIso: START, segments });
    extra?.(w, parts);
    const total = segments.reduce((a, s) => a + s.durS, 0);
    writeSession(w, { startIso: START, elapsedS: total, distM: parts.reduce((a, p) => a + p.distM, 0), sport });
    return analyse(w.bytes());
  };
  const describe = (res: ReturnType<typeof analyse>) => res.digest.intervalSets.map((s) => s.description).join(" + ") || "rien";

  // Séance prescrite sur la montre : 4 × 400 m à 5 m/s, récup 90 s.
  {
    const segs: FitSegment[] = [{ durS: 600, speedMS: 2.8 }];
    for (let i = 0; i < 4; i++) segs.push({ durS: 80, speedMS: 5, hr: 170 }, { durS: 90, speedMS: 2, hr: 130 });
    segs.push({ durS: 300, speedMS: 2.8 });
    const res = run(segs, (w, parts) => {
      writeWorkoutStep(w, { index: 0, durationType: 0, durationValue: 600_000, intensity: 2 });
      writeWorkoutStep(w, { index: 1, durationType: 1, durationValue: 40_000, targetType: 0, low: 4900, high: 5100, intensity: 0 });
      writeWorkoutStep(w, { index: 2, durationType: 0, durationValue: 90_000, intensity: 1 });
      writeWorkoutStep(w, { index: 3, durationType: 6, durationValue: 1, targetValue: 4 });
      writeWorkoutStep(w, { index: 4, durationType: 5, durationValue: 0, intensity: 3 });
      parts.forEach((p, i) => {
        const step = i === 0 ? 0 : i === parts.length - 1 ? 4 : i % 2 === 1 ? 1 : 2;
        writeLap(w, { startIso: START, startS: p.startS, durS: p.durS, distM: p.distM, stepIndex: step,
          intensity: step === 0 ? 2 : step === 4 ? 3 : step === 1 ? 0 : 1, trigger: step === 1 ? 2 : 1 });
      });
    });
    const s = res.digest.intervalSets[0];
    check("séance prescrite : « 4 × 400 m », lue dans les étapes de la montre",
      res.digest.intervalSets.length === 1 && /^4 × 400 m/.test(s.description) && s.source === "workout", describe(res));
    const a = res.insights.adherence[0];
    check("séance prescrite : adhérence jugée contre la cible de la montre (3:20/km, 4 répétitions)",
      !!a && a.repsPlanned === 4 && Math.round(a.target?.targetPaceSPerKm ?? 0) === 200, `${a?.repsPlanned} rép., cible ${a?.target?.targetPaceSPerKm?.toFixed(0)} s/km`);
  }

  // Footing avec feux rouges : arrêts de 30 s, allure inchangée entre eux.
  {
    const segs: FitSegment[] = [];
    for (let i = 0; i < 6; i++) segs.push({ durS: 300, speedMS: 3 }, { durS: 30, speedMS: 0 });
    segs.push({ durS: 300, speedMS: 3 });
    const res = run(segs);
    check("footing coupé par des arrêts : aucun intervalle", !res.digest.intervalSets.length, describe(res));
  }

  // Footing avec lignes droites de 20 s : trop court pour un intervalle.
  {
    const segs: FitSegment[] = [{ durS: 600, speedMS: 2.8 }];
    for (let i = 0; i < 6; i++) segs.push({ durS: 20, speedMS: 5 }, { durS: 100, speedMS: 2.8 });
    segs.push({ durS: 600, speedMS: 2.8 });
    const res = run(segs);
    check("lignes droites de 20 s : aucun intervalle", !res.digest.intervalSets.length, describe(res));
  }

  // Footing vallonné : la puissance de course varie, l'allure non.
  {
    const segs: FitSegment[] = [];
    for (let i = 0; i < 8; i++) segs.push({ durS: 120, speedMS: 2.9, pw: 320 }, { durS: 150, speedMS: 3, pw: 230 });
    const res = run(segs);
    check("course vallonnée : la puissance seule ne fait pas des intervalles", !res.digest.intervalSets.length, describe(res));
  }

  // Vrai fractionné sans séance enregistrée : détecté, mais sans adhérence.
  {
    const segs: FitSegment[] = [{ durS: 600, speedMS: 2.8 }];
    for (let i = 0; i < 6; i++) segs.push({ durS: 90, speedMS: 4.5, hr: 170 }, { durS: 90, speedMS: 2.4, hr: 130 });
    segs.push({ durS: 600, speedMS: 2.8 });
    const res = run(segs);
    check("fractionné libre : « 6 × 400 m » détecté", /^6 × 400 m/.test(describe(res)) && res.digest.intervalSets[0]?.source === "auto", describe(res));
    check("fractionné libre : pas d'adhérence sans séance prescrite", !res.insights.adherence.length);
  }

  // Home trainer : un tour par étape (déclencheur manuel), comme Zwift.
  {
    const segs: FitSegment[] = [{ durS: 600, speedMS: 8, pw: 150 }];
    for (let i = 0; i < 5; i++) segs.push({ durS: 120, speedMS: 10, pw: 300 }, { durS: 120, speedMS: 8, pw: 150 });
    segs.push({ durS: 300, speedMS: 8, pw: 120 });
    const res = run(segs, (w, parts) => parts.forEach((p) =>
      writeLap(w, { startIso: START, startS: p.startS, durS: p.durS, distM: p.distM, intensity: 0, trigger: 0 })), 2);
    const s = res.digest.intervalSets[0];
    check("home trainer : les tours donnent « 5 × 120 s à 300 W »",
      res.digest.intervalSets.length === 1 && s.reps === 5 && s.avgWorkDurS === 120 && Math.round(s.avgWorkPwW ?? 0) === 300, describe(res));
  }
}

// ─────────────────────────────────────────────────────────────────────────
section("8. Volume hebdomadaire par sport, charge commune");
{
  const session = (day: string, sport: number, segments: FitSegment[]) => {
    const w = fitWriter();
    const startIso = `${day}T07:00:00Z`;
    const parts = writeProfile(w, { startIso, segments });
    writeSession(w, { startIso, elapsedS: segments.reduce((a, s) => a + s.durS, 0), distM: parts.reduce((a, p) => a + p.distM, 0), sport });
    return asFile(`${day}.fit`, analyse(w.bytes()));
  };
  // Même semaine : 10,8 km de course (FC 152, 80 % de 190 : zone 4), 54 km
  // de vélo (FC 128, 67 % : zone 2), 36 km de vélo sans FC.
  const files = [
    session("2026-09-21", 1, [{ durS: 3600, speedMS: 3, hr: 152 }]),
    session("2026-09-23", 2, [{ durS: 5400, speedMS: 10, hr: 128 }]),
    session("2026-09-25", 2, [{ durS: 3600, speedMS: 10, hr: 0 }]),
  ];
  const batch = analyzeBatch(files, { locale: "fr", athlete: { maxHr: 190 } });
  const week = batch.weeks[0];
  check("une seule semaine", batch.weeks.length === 1, batch.weeks.map((x) => x.isoWeek).join(","));
  check("course et vélo comptés à part",
    Math.round((week.bySport.running?.distanceM ?? 0) / 100) === 108 && Math.round((week.bySport.cycling?.distanceM ?? 0) / 1000) === 90,
    `course ${week.bySport.running?.distanceM?.toFixed(0)} m, vélo ${week.bySport.cycling?.distanceM?.toFixed(0)} m`);
  check("durée par sport", Math.round((week.bySport.cycling?.movingS ?? 0) / 60) === 150, `${week.bySport.cycling?.movingS} s`);
  // TRIMP d'Edwards : minutes par zone × numéro de zone.
  check("charge commune : TRIMP fondé sur la FC (60 min × 4 + 90 min × 2 = 420)",
    Math.abs(week.trimp - 420) <= 5, `${week.trimp.toFixed(0)}`);
  check("part du temps couverte par la FC annoncée (150 / 210 min)",
    Math.round(week.hrCoveragePct ?? 0) === 71, `${week.hrCoveragePct?.toFixed(0)} %`);
  const dossier = buildDossier(batch, { streamMode: "none" });
  const header = dossier.split("\n")[dossier.split("\n").findIndex((l) => /weekly_load/.test(l)) + 1] ?? "";
  check("weekly_load : une colonne par sport, plus de distance tous sports confondus",
    /run_km/.test(header) && /bike_km/.test(header) && /bike_time/.test(header) && /trimp/.test(header) && !/(^|,)dist_km/.test(header) && !/swim_m/.test(header),
    header);
}

// ─────────────────────────────────────────────────────────────────────────
section("9. Source de FC lue dans device_info, séance par séance");
{
  // FC qui suit l'allure : rien dans le signal ne trahit le capteur.
  const session = (day: string, devices: { deviceType: number; sourceType: number; product?: number }[]) => {
    const w = fitWriter();
    const startIso = `${day}T07:00:00Z`;
    devices.forEach((d, i) => writeDeviceInfo(w, { startIso, deviceIndex: i + 1, ...d }));
    const segs: FitSegment[] = [];
    for (let i = 0; i < 6; i++) segs.push({ durS: 300, speedMS: 2.8, hr: 135 + i }, { durS: 300, speedMS: 3.1, hr: 145 + i });
    const parts = writeProfile(w, { startIso, segments: segs });
    writeSession(w, { startIso, elapsedS: 3600, distM: parts.reduce((a, p) => a + p.distM, 0), sport: 1 });
    return asFile(`${day}.fit`, analyse(w.bytes()));
  };
  const WRIST = { deviceType: 10, sourceType: 5 };
  const STRAP = { deviceType: 1, sourceType: 3, product: 1234 };
  const strap1 = session("2026-09-21", [WRIST, STRAP]);
  const wrist = session("2026-09-22", [WRIST]);
  const strap2 = session("2026-09-23", [WRIST, STRAP]);
  const bare = session("2026-09-24", []);
  check("ceinture Bluetooth listée : ceinture, lue dans le fichier",
    strap1.hrSource.verdict === "chest_strap" && strap1.hrSource.fromDeviceMetadata, `${strap1.hrSource.verdict}`);
  check("seul le capteur optique de la montre : poignet, lu dans le fichier",
    wrist.hrSource.verdict === "optical" && wrist.hrSource.fromDeviceMetadata && wrist.hrSource.confidence === 1,
    `${wrist.hrSource.verdict}, ${wrist.hrSource.confidence}`);
  check("sans device_info : déduction sur le signal, jamais présentée comme certaine",
    !bare.hrSource.fromDeviceMetadata && bare.hrSource.confidence < 1, `${bare.hrSource.verdict}, ${bare.hrSource.confidence}`);

  const batch = analyzeBatch([strap1, wrist, strap2, bare], { locale: "fr" });
  check("plus de « changement de capteur autour du … » quand les sources alternent",
    !batch.warnings.some((x) => /autour du/.test(x)), batch.warnings.find((x) => /autour du/.test(x)) ?? "");
  const mixed = batch.warnings.find((x) => /ceinture/.test(x) && /poignet/.test(x));
  check("avertissement : décompte des sources, séance par séance", !!mixed && /2 avec ceinture/.test(mixed) && /2 au poignet/.test(mixed), mixed ?? "absent");
  const dossier = buildDossier(batch, { streamMode: "none" });
  const lines = dossier.split("\n");
  const header = lines[lines.findIndex((l) => /^## sessions$/.test(l)) + 1] ?? "";
  check("tableau des séances : source de FC et son origine (fichier ou signal)", /hr_source_basis/.test(header), header);
  check("origine « fichier » pour les FIT avec device_info, « signal » sinon",
    lines.some((l) => /2026-09-22/.test(l) && /,device,/.test(l)) && lines.some((l) => /2026-09-24/.test(l) && /,signal,/.test(l)));
}

console.log(failures ? `\n\u001b[31m${failures} échec(s)\u001b[0m\n` : "\n\u001b[32mToutes les régressions passent\u001b[0m\n");
process.exitCode = failures ? 1 : 0;
