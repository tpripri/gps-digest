/**
 * Banc d'essai des analyses.
 *
 * Le test central : fabriquer deux fichiers identiques sauf la FC — l'un
 * simulant une ceinture, l'autre un capteur optique avec ses artefacts — et
 * vérifier que le détecteur les sépare. C'est la seule façon de savoir si
 * l'heuristique fait quelque chose ou si elle devine.
 *
 *   node --experimental-strip-types test/analysis.ts
 */

import { parseTcx } from "../src/parse-tcx.ts";
import { buildFull, finalize } from "../src/digest.ts";
import { analyzeHrSource, hrSourceLabel } from "../src/sensor.ts";
import { analyzeDrift } from "../src/drift.ts";
import { bestEfforts, fitCriticalSpeed, projectRaces, formatDuration } from "../src/efforts.ts";
import { analyzeBatch, buildBatchBundle, type FileAnalysis } from "../src/batch.ts";
import { fromStravaStreams } from "../src/strava.ts";
import { speedSeries } from "../src/analyze.ts";
import { estimateTokens, paceLabel } from "../src/serialize.ts";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  const mark = ok ? "\u001b[32m✓\u001b[0m" : "\u001b[31m✗\u001b[0m";
  console.log(`  ${mark} ${label}${detail ? `  \u001b[2m${detail}\u001b[0m` : ""}`);
  if (!ok) failures++;
}
const section = (s: string) => console.log(`\n\u001b[1m${s}\u001b[0m`);

// --------------------------------------------------------- générateur

type Profile = "steady" | "intervals" | "progressive";
type Sensor = "strap" | "optical";

interface GenOpts {
  durationS: number;
  profile: Profile;
  sensor: Sensor;
  startIso: string;
  /** Dérive imposée : bpm gagnés sur la durée à effort constant. */
  driftBpm?: number;
}

function targetSpeed(t: number, profile: Profile, dur: number): number {
  if (profile === "steady") return t < 300 ? 2.6 : 3.25;
  if (profile === "progressive") return 2.8 + (t / dur) * 0.9;
  // intervals : 12 min échauffement, 6 × 3 min / 2 min récup
  if (t < 720) return 2.7;
  const cycle = (t - 720) % 300;
  const rep = Math.floor((t - 720) / 300);
  if (rep >= 6) return 2.7;
  return cycle < 180 ? 4.1 : 2.35;
}

function makeTcx(o: GenOpts): string {
  const t0 = Date.parse(o.startIso);
  const pts: string[] = [];
  let dist = 0;
  let hrTrue = 95;
  let lat = 48.8566;
  let lon = 2.3522;
  // État du capteur optique : valeur affichée, retardée et lissée.
  let optDisplay = 95;
  let lockUntil = -1;

  for (let t = 0; t <= o.durationS; t++) {
    const v = targetSpeed(t, o.profile, o.durationS);
    dist += v;
    const heading = 0.5 * Math.sin(dist / 1200);
    lat += (v * Math.cos(heading)) / 111320;
    lon += (v * Math.sin(heading)) / (111320 * Math.cos((lat * Math.PI) / 180));

    const cad = Math.round(160 + (v - 2.6) * 9);
    const drift = (o.driftBpm ?? 0) * (t / o.durationS);
    const target = Math.min(178, 92 + (v - 2.2) * 42 + drift);
    hrTrue += (target - hrTrue) * 0.04;
    // Variabilité battement à battement d'une ceinture ECG.
    const strapHr = hrTrue + (Math.sin(t * 1.7) + Math.sin(t * 0.9)) * 1.4;

    let shown: number;
    if (o.sensor === "strap") {
      shown = strapHr;
      // Pic de démarrage : électrodes sèches.
      if (t < 65) shown = 168 - t * 0.55;
    } else {
      // Optique : retard fort + lissage + verrouillage cadence intermittent.
      optDisplay += (hrTrue - optDisplay) * 0.028;
      // Quantification : l'algorithme ne rafraîchit pas à chaque seconde.
      shown = t % 12 < 9 ? Math.round(optDisplay) : optDisplay;
      // Verrouillage cadence, appliqué en dernier : c'est l'artefact dominant.
      if (t % 420 < 90 && v > 3.0) lockUntil = t + 60;
      if (t <= lockUntil) shown = cad + Math.sin(t / 9) * 1.2;
    }

    const ele = 35 + 6 * Math.sin(dist / 2500) + 0.3 * Math.sin(t / 6);
    pts.push(
      `<Trackpoint><Time>${new Date(t0 + t * 1000).toISOString()}</Time>` +
        `<Position><LatitudeDegrees>${lat.toFixed(7)}</LatitudeDegrees>` +
        `<LongitudeDegrees>${lon.toFixed(7)}</LongitudeDegrees></Position>` +
        `<AltitudeMeters>${ele.toFixed(2)}</AltitudeMeters>` +
        `<DistanceMeters>${dist.toFixed(2)}</DistanceMeters>` +
        `<HeartRateBpm><Value>${Math.round(shown)}</Value></HeartRateBpm>` +
        `<Extensions><ns3:TPX xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2">` +
        `<ns3:RunCadence>${Math.round(cad / 2)}</ns3:RunCadence>` +
        `<ns3:Temp>26</ns3:Temp></ns3:TPX></Extensions></Trackpoint>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<TrainingCenterDatabase xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2">
<Activities><Activity Sport="Running"><Id>${o.startIso}</Id>
<Lap StartTime="${o.startIso}"><TotalTimeSeconds>${o.durationS}</TotalTimeSeconds>
<DistanceMeters>${dist.toFixed(2)}</DistanceMeters><Intensity>Active</Intensity>
<Track>${pts.join("")}</Track></Lap></Activity></Activities>
<Author><Name>Forerunner 255</Name></Author></TrainingCenterDatabase>`;
}

function analyze(xml: string, filename: string): FileAnalysis {
  const activity = parseTcx(xml);
  const built = buildFull(activity, {
    athlete: { maxHr: 168 },
    streamTokenBudget: 3000,
    driftWarmupS: 300,
  });
  const res = finalize(built, xml.length, { athlete: { maxHr: 168 } });
  return {
    filename,
    digest: res.digest,
    hrSource: res.insights.hrSource,
    drift: res.insights.drift,
    adherence: res.insights.adherence,
    efforts: res.insights.efforts,
    samples: res.samples,
  };
}

// ------------------------------------------------ 1. détection capteur

section("Détection du capteur de FC");

const strapXml = makeTcx({
  durationS: 3000, profile: "steady", sensor: "strap",
  startIso: "2026-08-10T06:30:00Z", driftBpm: 9,
});
const opticalXml = makeTcx({
  durationS: 3000, profile: "steady", sensor: "optical",
  startIso: "2026-07-05T06:30:00Z", driftBpm: 9,
});

const strap = analyze(strapXml, "2026-08-10-ceinture.tcx");
const optical = analyze(opticalXml, "2026-07-05-poignet.tcx");

check("ceinture reconnue", strap.hrSource.verdict === "chest_strap",
  `${hrSourceLabel(strap.hrSource.verdict)} @ ${strap.hrSource.confidence.toFixed(2)}`);
check("capteur poignet reconnu", optical.hrSource.verdict === "optical",
  `${hrSourceLabel(optical.hrSource.verdict)} @ ${optical.hrSource.confidence.toFixed(2)}`);
check("verrouillage cadence détecté côté poignet", optical.hrSource.cadenceLockPct > 5,
  `${optical.hrSource.cadenceLockPct.toFixed(1)} %`);
check("pas de faux verrouillage côté ceinture", strap.hrSource.cadenceLockPct < 2,
  `${strap.hrSource.cadenceLockPct.toFixed(1)} %`);
check("segments douteux isolés", optical.hrSource.suspectRanges.length > 0,
  `${optical.hrSource.suspectRanges.length} plage(s)`);
check("confiance jamais à 1 sans métadonnée", strap.hrSource.confidence < 1);

// -------------------------------------------------- 2. dérive cardiaque

section("Dérive cardiaque");

check("dérive calculée sur effort régulier", strap.drift.applicable,
  strap.drift.decouplingPct != null ? `${strap.drift.decouplingPct.toFixed(1)} %` : "");
check("dérive positive avec drift imposé", (strap.drift.decouplingPct ?? 0) > 2,
  `${strap.drift.decouplingPct?.toFixed(1)} %`);
check("interprétation fournie", !!strap.drift.interpretation);

const intervalsXml = makeTcx({
  durationS: 3000, profile: "intervals", sensor: "strap",
  startIso: "2026-08-14T06:30:00Z",
});
const intervals = analyze(intervalsXml, "2026-08-14-fractionne.tcx");
check("dérive REFUSÉE sur du fractionné", !intervals.drift.applicable,
  intervals.drift.reason?.slice(0, 55));
check("irrégularité mesurée", (intervals.drift.speedCvPct ?? 0) > 18,
  `CV ${intervals.drift.speedCvPct?.toFixed(0)} %`);
check("température exposée avec réserve",
  intervals.drift.temperature?.caveat != null,
  `${Math.round(intervals.drift.temperature?.avgC ?? 0)} °C, capteur montre`);

// ----------------------------------------------------- 3. blocs

section("Respect des blocs");

const set = intervals.digest.intervalSets[0];
check("série détectée", !!set, set?.description);
const adh = intervals.adherence[0];
check("rapport d'adhérence produit", !!adh, adh?.grade);
check("répétitions comptées", (adh?.repsCompleted ?? 0) >= 5, `${adh?.repsCompleted}`);
check("régularité mesurée", adh?.paceCvPct != null, `CV ${adh?.paceCvPct?.toFixed(1)} %`);
check("verdicts rédigés", (adh?.verdicts.length ?? 0) > 0, adh?.verdicts[0]?.slice(0, 50));

// ------------------------------------------------ 4. efforts & projections

section("Meilleurs efforts et projections");

const efforts = bestEfforts(strap.samples);
check("efforts extraits", efforts.length >= 4, efforts.map((e) => `${e.distanceM}m`).join(" "));
const k1 = efforts.find((e) => e.distanceM === 1000);
check("1 000 m plausible", k1 != null && k1.timeS > 200 && k1.timeS < 400,
  k1 ? formatDuration(k1.timeS) : "");
// Monotonie : l'allure ne peut pas s'améliorer quand la distance augmente.
const sorted = [...efforts].sort((a, b) => a.distanceM - b.distanceM);
let monotone = true;
for (let i = 1; i < sorted.length; i++) {
  if (sorted[i].paceSPerKm < sorted[i - 1].paceSPerKm - 1) monotone = false;
}
check("allure monotone avec la distance", monotone);

const progXml = makeTcx({
  durationS: 2400, profile: "progressive", sensor: "strap",
  startIso: "2026-08-17T06:30:00Z",
});
const prog = analyze(progXml, "2026-08-17-progressive.tcx");
const cs = fitCriticalSpeed([...efforts, ...prog.efforts]);
check("modèle de vitesse critique ajusté", cs != null,
  cs ? `CS ${paceLabel(cs.csPaceSPerKm)}/km, R²=${cs.r2.toFixed(3)}` : "");

// Projection calibrée sur un marathon réel : 3h29 en 2025.
const proj = projectRaces({
  efforts: [...efforts, ...prog.efforts],
  cs,
  raceResults: [{ distanceM: 42195, timeS: 3 * 3600 + 29 * 60, date: "2025-04-06" }],
});
check("projections produites", proj.length === 4, proj.map((p) => p.label).join(", "));
const semi = proj.find((p) => p.distanceM === 21097.5);
check("semi entre la projection de course et celle de l'entraînement",
  semi != null && semi.timeS > 6000 && semi.timeS < 7200,
  semi ? `${formatDuration(semi.timeS)} [${formatDuration(semi.lowS)}–${formatDuration(semi.highS)}]` : "");
check("fourchette non dégénérée", semi != null && semi.highS - semi.lowS > 60,
  semi ? `± ${Math.round((semi.highS - semi.lowS) / 2)} s` : "");
const mara = proj.find((p) => p.distanceM === 42195);
check("marathon assorti d'une réserve", !!mara?.caveat);

// ------------------------------------------------------- 5. multi-fichiers

section("Analyse multi-fichiers");

const files = [optical, strap, intervals, prog];
const batch = analyzeBatch(files, {
  maxHr: 168,
  raceResults: [{ distanceM: 42195, timeS: 3 * 3600 + 29 * 60 }],
});

check("séances triées par date", batch.files[0].filename.includes("07-05"));
check("volume agrégé", batch.totalDistanceM > 30000,
  `${(batch.totalDistanceM / 1000).toFixed(1)} km`);
check("semaines regroupées", batch.weeks.length >= 2, batch.weeks.map((w) => w.isoWeek).join(" "));
check("changement de capteur détecté", batch.sensorChanges.length >= 1,
  batch.sensorChanges[0]
    ? `${batch.sensorChanges[0].date} : ${hrSourceLabel(batch.sensorChanges[0].from)} → ${hrSourceLabel(batch.sensorChanges[0].to)}`
    : "");
check("avertissement de comparabilité émis",
  batch.warnings.some((w) => w.includes("Changement de capteur")));
check("efforts consolidés avec provenance",
  batch.consolidatedEfforts.every((e) => !!e.sourceFile),
  `${batch.consolidatedEfforts.length} distances`);
check("répartition d'intensité calculée",
  batch.weeks.some((w) => w.easyS + w.moderateS + w.hardS > 0));

const batchBundle = buildBatchBundle(batch, { maxHr: 168 });
const batchTokens = estimateTokens(batchBundle);
check("bundle multi-séances compact", batchTokens < 4000, `~${batchTokens} tokens pour 4 séances`);
check("blocs transversaux présents",
  ["## sessions", "## weekly_load", "## best_efforts", "## race_projections"]
    .every((b) => batchBundle.includes(b)));
check("avertissement en tête du bundle", batchBundle.indexOf("⚠") < batchBundle.indexOf("## sessions"));

// ------------------------------------------------------------ 6. Strava

section("Adaptateur Strava");

const src = strap.samples;
const streams = {
  time: src.map((s) => s.t),
  distance: src.map((s) => s.dist ?? 0),
  heart_rate: src.map((s) => s.hr ?? 0),
  cadence: src.map((s) => Math.round((s.cad ?? 0) / 2)),
  altitude: src.map((s) => s.ele ?? 0),
  location: src.map((s) => [s.lat ?? 0, s.lon ?? 0] as [number, number]),
  temp: src.map(() => 26),
};
const stravaActivity = fromStravaStreams(
  { id: "1234567890", sport_type: "Run", start_date: "2026-08-10T06:30:00Z",
    laps: [{ start_index: 0, moving_time: 3000, distance: 9800 }] },
  streams,
);
check("flux Strava converti", stravaActivity.samples.length === src.length,
  `${stravaActivity.samples.length} points`);
check("sport mappé", stravaActivity.sport === "running");
check("cadence re-doublée", (stravaActivity.samples[600].cad ?? 0) > 150,
  String(stravaActivity.samples[600].cad));
check("tours repris", stravaActivity.laps.length === 1);
const stravaBuilt = buildFull(stravaActivity, { athlete: { maxHr: 168 }, driftWarmupS: 300 });
check("même pipeline appliqué", stravaBuilt.digest.splits.length >= 8,
  `${stravaBuilt.digest.splits.length} splits`);

// ---------------------------------------------------------------- sortie

console.log("\n" + "─".repeat(64));
console.log(batchBundle.slice(0, 1500));
console.log("─".repeat(64));

console.log(failures ? `\n\u001b[31m${failures} échec(s)\u001b[0m\n` : "\n\u001b[32mTous les tests passent\u001b[0m\n");
process.exit(failures ? 1 : 0);
