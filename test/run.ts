/**
 * Banc d'essai sans dépendance : génère un TCX de séance à intervalles
 * réaliste, le passe dans toute la chaîne, et vérifie que la compaction
 * conserve l'information qui compte.
 *
 *   node --experimental-strip-types test/run.ts
 */

import { parseTcx } from "../src/parse-tcx.ts";
import { parseGpx } from "../src/parse-gpx.ts";
import { buildDigest, buildFull, finalize } from "../src/digest.ts";
import { estimateTokens, paceLabel } from "../src/serialize.ts";

// ------------------------------------------------------ génération du TCX

/** Séance : 15 min échauffement, 8 × 400 m / 90 s récup, 10 min retour au calme. */
function speedAt(t: number): number {
  const warmup = 900;
  const repDist = 400;
  const restS = 90;
  const fastPace = 210; // 3:30/km
  const easyPace = 330; // 5:30/km
  const restPace = 390;

  if (t < warmup) return 1000 / easyPace;
  let cursor = warmup;
  for (let rep = 0; rep < 8; rep++) {
    const repDur = (repDist / 1000) * fastPace;
    if (t < cursor + repDur) return 1000 / fastPace;
    cursor += repDur;
    if (t < cursor + restS) return 1000 / restPace;
    cursor += restS;
  }
  return 1000 / (easyPace + 15);
}

function makeTcx(durationS: number): string {
  const t0 = Date.UTC(2026, 6, 20, 6, 12, 0);
  const pts: string[] = [];
  let dist = 0;
  let hr = 95;
  // Position intégrée pas à pas le long d'un cap qui tourne doucement : la
  // longueur du chemin égale exactement la distance enregistrée, sinon le
  // fichier de test est incohérent avec lui-même.
  let lat = 43.3183;
  let lon = -1.9812;

  for (let t = 0; t <= durationS; t++) {
    const v = speedAt(t);
    dist += v;
    // Colline : montée entre 1200 s et 2000 s.
    const ele = 12 + 30 * Math.max(0, Math.sin(((t - 1200) / 800) * Math.PI)) +
      0.4 * Math.sin(t / 7); // bruit altimétrique réaliste
    // FC premier ordre avec retard, cible fonction de l'allure.
    // Réponse cardiaque du 1er ordre, plafonnée à une FC max plausible.
    const target = Math.min(186, 100 + (v - 2.4) * 55);
    hr += (target - hr) * 0.03;
    const heading = 0.6 * Math.sin(dist / 1500);
    lat += (v * Math.cos(heading)) / 111320;
    lon += (v * Math.sin(heading)) / (111320 * Math.cos((lat * Math.PI) / 180));
    const cad = 82 + (v - 2.4) * 6;

    pts.push(
      `<Trackpoint><Time>${new Date(t0 + t * 1000).toISOString()}</Time>` +
        `<Position><LatitudeDegrees>${lat.toFixed(7)}</LatitudeDegrees>` +
        `<LongitudeDegrees>${lon.toFixed(7)}</LongitudeDegrees></Position>` +
        `<AltitudeMeters>${ele.toFixed(2)}</AltitudeMeters>` +
        `<DistanceMeters>${dist.toFixed(2)}</DistanceMeters>` +
        `<HeartRateBpm><Value>${Math.round(hr)}</Value></HeartRateBpm>` +
        `<Extensions><ns3:TPX xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2">` +
        `<ns3:Speed>${v.toFixed(3)}</ns3:Speed><ns3:RunCadence>${Math.round(cad)}</ns3:RunCadence>` +
        `</ns3:TPX></Extensions></Trackpoint>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<TrainingCenterDatabase xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2">
<Activities><Activity Sport="Running">
<Id>${new Date(t0).toISOString()}</Id>
<Lap StartTime="${new Date(t0).toISOString()}">
<TotalTimeSeconds>${durationS}</TotalTimeSeconds>
<DistanceMeters>${dist.toFixed(2)}</DistanceMeters>
<Calories>620</Calories>
<AverageHeartRateBpm><Value>148</Value></AverageHeartRateBpm>
<MaximumHeartRateBpm><Value>181</Value></MaximumHeartRateBpm>
<Intensity>Active</Intensity><TriggerMethod>Manual</TriggerMethod>
<Track>${pts.join("")}</Track>
</Lap>
</Activity></Activities>
<Author xsi:type="Application_t" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<Name>Garmin Connect</Name></Author>
</TrainingCenterDatabase>`;
}

// ----------------------------------------------------------------- tests

let failures = 0;
function check(label: string, condition: boolean, detail = "") {
  const mark = condition ? "\u001b[32m✓\u001b[0m" : "\u001b[31m✗\u001b[0m";
  console.log(`  ${mark} ${label}${detail ? `  \u001b[2m${detail}\u001b[0m` : ""}`);
  if (!condition) failures++;
}

const DURATION = 3600;
const xml = makeTcx(DURATION);
console.log(`\nTCX synthétique : ${(xml.length / 1e6).toFixed(2)} Mo, ${DURATION + 1} points\n`);

console.log("Parsing");
const t0 = performance.now();
const activity = parseTcx(xml);
const parseMs = performance.now() - t0;
check("points extraits", activity.samples.length === DURATION + 1, `${activity.samples.length}`);
check("sport détecté", activity.sport === "running", activity.sport);
check("lap natif lu", activity.laps.length === 1 && activity.laps[0].calories === 620);
check("extension RunCadence doublée", (activity.samples[500].cad ?? 0) > 150, String(activity.samples[500].cad));
check("perf parsing", parseMs < 3000, `${parseMs.toFixed(0)} ms`);

console.log("\nAnalyse");
const built = buildFull(activity, {
  athlete: { maxHr: 190, thresholdPaceSPerKm: 240 },
  streamTokenBudget: 6000,
  privacyRadiusM: 200,
});
const digest = built.digest;
const insights = built.insights;

const s = digest.session;
check("distance plausible", s.distM > 11000 && s.distM < 14000, `${s.distM} m`);
check("D+ non gonflé par le bruit", (s.eleGainM ?? 0) > 20 && (s.eleGainM ?? 0) < 60, `${s.eleGainM} m`);
check("temps en mouvement < écoulé", s.durMovingS <= s.durElapsedS, `${s.durMovingS}/${s.durElapsedS} s`);
check("FC max cohérente", (s.hrMax ?? 0) > 160 && (s.hrMax ?? 0) < 200, `${s.hrMax} bpm`);
check("GAP calculé", s.gapAvgSPerKm != null, paceLabel(s.gapAvgSPerKm));
check("découplage calculé", s.decouplingPct != null, `${s.decouplingPct?.toFixed(1)} %`);
check("splits au km", digest.splits.length >= 11, `${digest.splits.length}`);
check("zones FC réparties", digest.hrZones.filter((z) => z.pct > 1).length >= 3);
check("zones d'allure présentes", digest.paceZones.length === 5);

const set = digest.intervalSets[0];
check("série détectée", !!set, set?.description);
check("8 répétitions", set?.reps === 8, String(set?.reps));
check("répétitions calées sur 400 m", set?.targetM === 400, String(set?.targetM));
check("récup ~90 s", Math.abs((set?.avgRestDurS ?? 0) - 90) <= 12, `${set?.avgRestDurS} s`);

console.log("\nGPX (distance recalculée, extensions Garmin)");
const gpxPts = activity.samples
  .filter((_, i) => i % 2 === 0)
  .map((s) => {
    const iso = new Date(Date.parse(activity.startTime!) + s.t * 1000).toISOString();
    return `<trkpt lat="${s.lat}" lon="${s.lon}"><ele>${s.ele}</ele><time>${iso}</time>` +
      `<extensions><gpxtpx:TrackPointExtension><gpxtpx:hr>${s.hr}</gpxtpx:hr>` +
      `<gpxtpx:cad>${Math.round((s.cad ?? 0) / 2)}</gpxtpx:cad></gpxtpx:TrackPointExtension></extensions></trkpt>`;
  })
  .join("");
const gpx = `<?xml version="1.0"?><gpx version="1.1" creator="Strava"
  xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1">
  <trk><name>Séance</name><type>running</type><trkseg>${gpxPts}</trkseg></trk></gpx>`;

const g = parseGpx(gpx);
check("points GPX", g.samples.length === Math.ceil(activity.samples.length / 2), `${g.samples.length}`);
check("créateur lu", g.device === "Strava", g.device);
check("cadence GPX re-doublée", (g.samples[300].cad ?? 0) > 150, String(g.samples[300].cad));
// Référence : la distance TCX **non rognée** — `session.distM` est post-rognage
// vie privée, la comparer ici serait comparer deux choses différentes.
const tcxDist = activity.samples[activity.samples.length - 1].dist ?? 0;
const gDist = g.samples[g.samples.length - 1].dist ?? 0;
check(
  "distance haversine ≈ distance TCX",
  Math.abs(gDist - tcxDist) / tcxDist < 0.02,
  `${Math.round(gDist)} m vs ${Math.round(tcxDist)} m (${((gDist / tcxDist - 1) * 100).toFixed(2)} %)`,
);
const gDigest = buildDigest(g, { streamTokenBudget: 4000 });
check("digest GPX exploitable", gDigest.splits.length >= 10, `${gDigest.splits.length} splits`);

console.log("\nCompaction");
const { bundle } = finalize(built, xml.length, { athlete: { maxHr: 190 }, privacyRadiusM: 200 });
const tokens = estimateTokens(bundle);
check("flux dans le budget", digest.stream.length > 40, `${digest.stream.length} lignes`);
check("bundle sous 10k tokens", tokens < 10000, `~${tokens} tokens`);
check("réduction > 98 %", digest.reduction.ratio > 0.98, `${(digest.reduction.ratio * 100).toFixed(2)} %`);
check("blocs présents", ["## session", "## splits", "## interval_sets", "## hr_zones", "## stream"].every((b) => bundle.includes(b)));
// Un séparateur décimal virgule casserait le nombre de colonnes : on le teste
// pour de vrai plutôt que par regex sur les chiffres.
const streamLines = (bundle.split("## stream")[1] ?? "").trim().split("\n");
const widths = new Set(streamLines.map((l) => l.split(",").length));
check("colonnes du flux constantes", widths.size === 1, `${[...widths].join("/")} colonnes`);

const rawTokens = estimateTokens(xml);
console.log(
  `\n  \u001b[2m${(xml.length / 1e6).toFixed(2)} Mo (~${(rawTokens / 1000).toFixed(0)}k tokens) → ` +
    `${(bundle.length / 1024).toFixed(1)} Ko (~${tokens} tokens) = ×${Math.round(rawTokens / tokens)} plus compact\u001b[0m`,
);

console.log("\n" + "─".repeat(60));
console.log(bundle.slice(0, 1600) + "\n…");
console.log("─".repeat(60));

console.log(failures ? `\n\u001b[31m${failures} échec(s)\u001b[0m\n` : "\n\u001b[32mTous les tests passent\u001b[0m\n");
process.exit(failures ? 1 : 0);
