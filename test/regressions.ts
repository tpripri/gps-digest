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
import { analyzeBatch, type FileAnalysis } from "../src/batch.ts";
import { buildDossier } from "../src/dossier.ts";
import { haversine } from "../src/geo.ts";
import { t } from "../src/i18n.ts";
import type { DigestOptions } from "../src/types.ts";
import { FIT, fitWriter, fitTime, toSemicircles, writeRecords, writeSession } from "./fit-writer.ts";

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

console.log(failures ? `\n\u001b[31m${failures} échec(s)\u001b[0m\n` : "\n\u001b[32mToutes les régressions passent\u001b[0m\n");
process.exitCode = failures ? 1 : 0;
