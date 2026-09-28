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
import { decodeFit } from "../src/fit-decode.ts";
import { parseGpx } from "../src/parse-gpx.ts";
import { haversine } from "../src/geo.ts";
import { speedSeries } from "../src/analyze.ts";
import { estimateTokens, paceLabel } from "../src/serialize.ts";
import { buildDossier } from "../src/dossier.ts";
import { coverage, LOCALES, MESSAGE_KEYS, resolveLocale, t } from "../src/i18n.ts";

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
// Nouveau contrat : sur du fractionné, on ne refuse plus en bloc — on cherche
// la plus longue portion régulière et on signale qu'elle est peu représentative.
if (intervals.drift.applicable) {
  check("fenêtre homogène trouvée sur le fractionné", !!intervals.drift.window,
    `${Math.round((intervals.drift.window?.durationS ?? 0) / 60)} min`);
  check("fenêtre signalée comme peu représentative", intervals.drift.quality === "indicatif",
    `${intervals.drift.quality}, couverture ${intervals.drift.windowCoveragePct?.toFixed(0)} %`);
  check("note de représentativité rédigée", !!intervals.drift.qualityNote);
} else {
  check("refus argumenté", !!intervals.drift.reason, intervals.drift.reason?.slice(0, 55));
  check("fenêtre absente cohérente", intervals.drift.window == null);
  check("pas de chiffre trompeur", intervals.drift.decouplingPct === null);
}
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
// Les séances synthétiques sont tenues à allure constante : leurs meilleurs
// efforts sur 800 m, 1 km et 3 km sont trois découpes du même effort, alignées
// par construction. Le modèle doit refuser de s'y ajuster — un D' de quelques
// mètres signalerait une colinéarité, pas un athlète sans réserve anaérobie.
check("ajustement dégénéré refusé sur allure constante", cs === null,
  cs ? `accepté à tort : D'=${Math.round(cs.dPrimeM)} m, R²=${cs.r2.toFixed(4)}` : "aucun modèle");

// Efforts réalistes : la vitesse décroît avec la distance, donc D' est réel.
const varied = [
  { distanceM: 1000, timeS: 190, paceSPerKm: 190, speedMS: 1000 / 190, startS: 0 },
  { distanceM: 1500, timeS: 300, paceSPerKm: 200, speedMS: 1500 / 300, startS: 0 },
  { distanceM: 3000, timeS: 640, paceSPerKm: 213, speedMS: 3000 / 640, startS: 0 },
  { distanceM: 5000, timeS: 1100, paceSPerKm: 220, speedMS: 5000 / 1100, startS: 0 },
];
const csReal = fitCriticalSpeed(varied);
check("modèle ajusté sur des efforts réellement distincts", csReal != null,
  csReal ? `CS ${paceLabel(csReal.csPaceSPerKm)}/km, D'=${Math.round(csReal.dPrimeM)} m, R²=${csReal.r2.toFixed(4)}` : "refusé");

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

// ------------------------------------------- 6. GPX : pauses et segments

section("GPX — coupures de segment");

// Garmin Connect ouvre un <trkseg> après chaque pause. Sans traitement, la
// distance à vol d'oiseau entre l'arrêt et la reprise s'ajoute au total : un
// déjeuner en ville ou un trajet en voiture gonfle la sortie de plusieurs km.
{
  const mkPt = (lat: number, iso: string) =>
    `<trkpt lat="${lat.toFixed(7)}" lon="2.34"><ele>40</ele><time>${iso}</time></trkpt>`;
  const mkSeg = (lat0: number, t0: string, n: number) =>
    Array.from({ length: n }, (_, i) =>
      mkPt(lat0 + i * 0.00009, new Date(Date.parse(t0) + i * 1000).toISOString()),
    ).join("");
  const paused =
    `<?xml version="1.0"?><gpx version="1.1" creator="Garmin Connect"><trk><trkseg>` +
    mkSeg(48.85, "2026-09-01T08:00:00Z", 600) +
    `</trkseg><trkseg>` +
    mkSeg(48.88, "2026-09-01T09:00:00Z", 600) +
    `</trkseg></trk></gpx>`;

  const parsed = parseGpx(paused);
  const segLen = haversine(48.85, 2.34, 48.85 + 599 * 0.00009, 2.34);
  const gap = haversine(48.85 + 599 * 0.00009, 2.34, 48.88, 2.34);
  const total = parsed.samples[parsed.samples.length - 1].dist ?? 0;

  check("rupture de segment détectée",
    parsed.samples.filter((s) => s.discontinuity).length === 1);
  check("saut entre segments exclu de la distance",
    Math.abs(total - 2 * segLen) < 50,
    `${(total / 1000).toFixed(2)} km au lieu de ${((2 * segLen + gap) / 1000).toFixed(2)}`);
  check("les deux segments sont bien comptés", total > 2 * segLen * 0.98,
    `${(total / 1000).toFixed(2)} km`);
}

// ---------------------------------------------- 7. FIT : horodatage compressé

section("FIT — horodatage compressé");

// Mode qu'aucun fichier Garmin réel n'emploie, donc jamais exercé par les
// autres tests. Un décodeur qui lit le bit d'en-tête sans appliquer le décalage
// produit des messages sans date, que la couche supérieure écarte en silence :
// le fichier se vide de ses points sans la moindre erreur.
{
  const buf: number[] = [];
  const u8 = (v: number) => buf.push(v & 0xff);
  const u16 = (v: number) => { u8(v); u8(v >> 8); };
  const u32 = (v: number) => { u16(v); u16(v >> 16); };

  u8(0x40); u8(0); u8(0); u16(20); u8(3);
  u8(253); u8(4); u8(0x86);
  u8(3); u8(1); u8(0x02);
  u8(5); u8(4); u8(0x86);

  const T0 = 1100000000;
  u8(0x00); u32(T0); u8(120); u32(0);

  u8(0x40); u8(0); u8(0); u16(20); u8(2);
  u8(3); u8(1); u8(0x02);
  u8(5); u8(4); u8(0x86);
  // Le décalage sur 5 bits repasse par zéro toutes les 32 s : c'est ce
  // franchissement que le décodage doit rattraper.
  for (let i = 1; i <= 40; i++) { u8(0x80 | (i & 0x1f)); u8(120); u32(i * 300); }

  const data = Uint8Array.from(buf);
  const out = new Uint8Array(12 + data.length + 2);
  const dv = new DataView(out.buffer);
  out[0] = 12; out[1] = 16; dv.setUint16(2, 2140, true);
  dv.setUint32(4, data.length, true);
  out.set([0x2e, 0x46, 0x49, 0x54], 8);
  out.set(data, 12);

  const decoded = decodeFit(out);
  const recs = decoded.byGlobal.get(20) ?? [];
  check("41 points décodés", recs.length === 41, `${recs.length}`);
  check("tous horodatés", recs.every((r) => r[253] != null));
  const ts = recs.map((r) => r[253] as number);
  check("horodatages strictement croissants", ts.every((v, i) => i === 0 || v > ts[i - 1]));
  check("rollover 32 s rattrapé", ts[ts.length - 1] - ts[0] === 40,
    `plage ${ts[ts.length - 1] - ts[0]} s`);
}

// ------------------------------------------------------------ 8. Strava

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

// ------------------------------------------------------------ 9. Multilingue

section("Multilingue");

{
  const cov = coverage();
  const missing = LOCALES.flatMap((l) => cov[l].missing.map((k) => `${l}:${k}`));
  check("catalogues complets dans les sept langues", missing.length === 0, missing.slice(0, 3).join(", "));
  check("paramètres cohérents avec le français dans toutes les langues",
    LOCALES.every((l) => cov[l].badParams.length === 0),
    LOCALES.flatMap((l) => cov[l].badParams.map((k) => `${l}:${k}`)).slice(0, 3).join(", "));
  check("locale absente : français", resolveLocale(undefined) === "fr");
  check("locale régionale ramenée à la langue", resolveLocale("pt-BR") === "pt");
  check("locale inconnue : anglais", resolveLocale("it") === "en"
    && t("it", "digest.warnNoFtp") === t("en", "digest.warnNoFtp"));

  // Fragments de texte propres au français : tout ce que le catalogue français
  // contient et qu'aucune autre langue ne reprend telle quelle. En retrouver un
  // dans une sortie traduite signale une chaîne restée en dur.
  const frenchFragments = (loc: string) => {
    const target = MESSAGE_KEYS.map((k) => t(loc, k)).join("\n");
    const frags = new Set<string>();
    for (const k of MESSAGE_KEYS) {
      for (const part of t("fr", k).split(/\{\w+\}|\n/)) {
        const f = part.trim();
        if (f.length >= 14 && /[a-zé]/i.test(f) && !target.includes(f)) frags.add(f);
      }
    }
    return [...frags];
  };
  const frenchWords = /\b(séance|allure|dérive|capteur|récup|avec|pour)\b/i;

  // Mêmes séances, mêmes analyses, dans chaque langue : seuls les textes
  // changent. Les textes d'une séance sont rédigés à l'analyse, donc tout le
  // lot doit être analysé dans la langue voulue.
  for (const loc of LOCALES.filter((l) => l !== "fr")) {
    const opts = { athlete: { maxHr: 168 }, streamTokenBudget: 3000, driftWarmupS: 300, locale: loc };
    const analyzeIn = (xml: string, filename: string) => {
      const res = finalize(buildFull(parseTcx(xml), opts), xml.length, opts);
      const file: FileAnalysis = {
        filename, digest: res.digest, hrSource: res.insights.hrSource,
        drift: res.insights.drift, adherence: res.insights.adherence,
        efforts: res.insights.efforts, samples: res.samples,
      };
      return { file, bundle: res.bundle, warnings: res.warnings };
    };
    const main = analyzeIn(intervalsXml, "intervals.tcx");
    const batchLoc = analyzeBatch(
      [main.file, analyzeIn(strapXml, "strap.tcx").file, analyzeIn(opticalXml, "optical.tcx").file],
      { maxHr: 168, locale: loc },
    );
    const dossier = buildDossier(batchLoc, { streamMode: "none" });
    const lines = [main.bundle, ...main.warnings, buildBatchBundle(batchLoc), dossier]
      .flatMap((txt) => txt.split("\n"));
    const frags = frenchFragments(loc);
    const leak = lines.find((line) => frenchWords.test(line) || frags.some((f) => line.includes(f)));
    check(`${loc} : aucun reste de français`, leak == null, leak?.slice(0, 70));
    check(`${loc} : le dossier suit la langue de l'analyse`,
      dossier.includes(t(loc, "dossier.title")) && dossier.includes(t(loc, "dossier.guide")));
    check(`${loc} : mêmes chiffres qu'en français`,
      main.file.drift.decouplingPct === intervals.drift.decouplingPct
        && main.file.adherence[0]?.paceCvPct === intervals.adherence[0]?.paceCvPct);
    if (loc === "zh" || loc === "ja") {
      // Typographie : pas d'espace avant « % », pas de ponctuation latine
      // collée à un idéogramme dans les commentaires du dossier.
      const bad = lines
        .filter((line) => line.startsWith("#"))
        .find((line) => /\d %/.test(line) || /[\u3040-\u30ff\u4e00-\u9fff][,:;]/.test(line));
      check(`${loc} : ponctuation et unités à la typographie locale`, bad == null, bad?.slice(0, 70));
    }
  }
  check("libellé de capteur traduit", hrSourceLabel("chest_strap", "en") === "chest strap"
    && hrSourceLabel("chest_strap", "de") === "Brustgurt");
}

// ---------------------------------------------------------------- sortie

console.log("\n" + "─".repeat(64));
console.log(batchBundle.slice(0, 1500));
console.log("─".repeat(64));

console.log(failures ? `\n\u001b[31m${failures} échec(s)\u001b[0m\n` : "\n\u001b[32mTous les tests passent\u001b[0m\n");
process.exit(failures ? 1 : 0);
