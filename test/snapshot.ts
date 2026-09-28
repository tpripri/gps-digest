/**
 * Banc de non-régression du texte produit.
 *
 * Les autres bancs vérifient que les analyses trouvent ce qu'elles doivent
 * trouver. Celui-ci vérifie que le texte rendu ne bouge pas : il fait passer
 * un lot de séances synthétiques dans toute la chaîne (résumé par séance,
 * synthèse multi-séances, dossier, graphiques, notes météo, erreurs) et compare
 * la sortie, caractère pour caractère, à une référence enregistrée.
 *
 * Écrit pour le passage au multilingue : le français doit rester strictement
 * identique une fois les chaînes déplacées dans le catalogue.
 *
 *   node --experimental-strip-types test/snapshot.ts            compare
 *   node --experimental-strip-types test/snapshot.ts --write    réenregistre
 *   node --experimental-strip-types test/snapshot.ts --locale=en --print
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { parseTcx } from "../src/parse-tcx.ts";
import { parseGpx } from "../src/parse-gpx.ts";
import { buildFull, finalize, parseAny } from "../src/digest.ts";
import { analyzeBatch, buildBatchBundle, type FileAnalysis } from "../src/batch.ts";
import { buildDossier, type DossierOptions } from "../src/dossier.ts";
import { analyzeDrift } from "../src/drift.ts";
import { analyzeHrSource, hrSourceLabel } from "../src/sensor.ts";
import { analyzeAdherence } from "../src/adherence.ts";
import { classifyActivity, detectErg } from "../src/classify.ts";
import { analyzeSwim } from "../src/swim.ts";
import { analyzeProgression } from "../src/progression.ts";
import { projectRaces, fitCriticalSpeed } from "../src/efforts.ts";
import { heatStressNote, type WeatherObservation } from "../src/weather.ts";
import { sessionChart, repsChart, trendChart, loadChart } from "../src/charts.ts";
import { decodeFit } from "../src/fit-decode.ts";
import { fromStravaStreams } from "../src/strava.ts";
import type { Activity, DigestOptions, IntervalBlock, IntervalSet, Sample, Sport } from "../src/types.ts";

const args = process.argv.slice(2);
const WRITE = args.includes("--write");
const PRINT = args.includes("--print");
const LOCALE = args.find((a) => a.startsWith("--locale="))?.split("=")[1];

const here = dirname(fileURLToPath(import.meta.url));
const GOLDEN = join(here, "golden", "snapshot-fr.txt");

const out: string[] = [];
const emit = (title: string, value: unknown) => {
  out.push(`\n==================== ${title}`);
  out.push(typeof value === "string" ? value : JSON.stringify(value, null, 1));
};
const loc = LOCALE ? { locale: LOCALE } : {};

// ------------------------------------------------------------ générateur

interface Tick {
  v: number;
  hr?: number;
  cad?: number;
  pw?: number;
  pos?: boolean;
  temp?: number;
}

interface LapSpec {
  fromS: number;
  toS: number;
  distM?: number;
  intensity?: string;
}

function tcx(
  sport: string,
  startIso: string,
  durationS: number,
  tick: (t: number) => Tick,
  laps: LapSpec[] = [{ fromS: 0, toS: durationS, intensity: "Active" }],
  opts: { noDistance?: boolean } = {},
): string {
  const t0 = Date.parse(startIso);
  let dist = 0;
  let lat = 45.764;
  let lon = 4.8357;
  const pts: { t: number; xml: string; dist: number }[] = [];
  for (let t = 0; t <= durationS; t++) {
    const k = tick(t);
    dist += k.v;
    const heading = 0.5 * Math.sin(dist / 1300);
    lat += (k.v * Math.cos(heading)) / 111320;
    lon += (k.v * Math.sin(heading)) / (111320 * Math.cos((lat * Math.PI) / 180));
    const ele = 180 + 12 * Math.sin(dist / 1800) + 0.3 * Math.sin(t / 5);
    const ext =
      (k.cad != null ? (sport === "Biking" ? "" : `<ns3:RunCadence>${Math.round(k.cad / 2)}</ns3:RunCadence>`) : "") +
      (k.pw != null ? `<ns3:Watts>${Math.round(k.pw)}</ns3:Watts>` : "") +
      (k.temp != null ? `<ns3:Temp>${k.temp}</ns3:Temp>` : "");
    pts.push({
      t,
      dist,
      xml:
        `<Trackpoint><Time>${new Date(t0 + t * 1000).toISOString()}</Time>` +
        (k.pos === false
          ? ""
          : `<Position><LatitudeDegrees>${lat.toFixed(7)}</LatitudeDegrees>` +
            `<LongitudeDegrees>${lon.toFixed(7)}</LongitudeDegrees></Position>` +
            `<AltitudeMeters>${ele.toFixed(2)}</AltitudeMeters>`) +
        (opts.noDistance ? "" : `<DistanceMeters>${dist.toFixed(2)}</DistanceMeters>`) +
        (k.hr != null ? `<HeartRateBpm><Value>${Math.round(k.hr)}</Value></HeartRateBpm>` : "") +
        (sport === "Biking" && k.cad != null ? `<Cadence>${Math.round(k.cad)}</Cadence>` : "") +
        (ext
          ? `<Extensions><ns3:TPX xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2">${ext}</ns3:TPX></Extensions>`
          : "") +
        `</Trackpoint>`,
    });
  }
  const lapXml = laps
    .map((l) => {
      const inLap = pts.filter((p) => p.t >= l.fromS && p.t < l.toS);
      const d = l.distM ??
        (inLap.length ? inLap[inLap.length - 1].dist - inLap[0].dist : 0);
      return (
        `<Lap StartTime="${new Date(t0 + l.fromS * 1000).toISOString()}">` +
        `<TotalTimeSeconds>${l.toS - l.fromS}</TotalTimeSeconds>` +
        `<DistanceMeters>${d.toFixed(2)}</DistanceMeters>` +
        `<Intensity>${l.intensity ?? "Active"}</Intensity><TriggerMethod>Manual</TriggerMethod>` +
        `<Track>${inLap.map((p) => p.xml).join("")}</Track></Lap>`
      );
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<TrainingCenterDatabase xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2">
<Activities><Activity Sport="${sport}"><Id>${startIso}</Id>${lapXml}</Activity></Activities>
<Author><Name>Forerunner 255</Name></Author></TrainingCenterDatabase>`;
}

/** FC du premier ordre vers une cible, bruit de ceinture ou lissage optique. */
function heart(sensor: "strap" | "optical") {
  let hr = 95;
  let shown = 95;
  return (t: number, target: number, cad?: number): number => {
    hr += (target - hr) * 0.04;
    if (sensor === "strap") {
      const v = hr + (Math.sin(t * 1.7) + Math.sin(t * 0.9)) * 1.4;
      return t < 65 ? 168 - t * 0.55 : v;
    }
    shown += (hr - shown) * 0.028;
    if (cad != null && t % 420 < 80 && t > 400) return cad + Math.sin(t / 9);
    return t % 12 < 9 ? Math.round(shown) : shown;
  };
}

function steadyRun(startIso: string, sensor: "strap" | "optical", speed: number, driftBpm: number, temp = 18) {
  const h = heart(sensor);
  const dur = 3000;
  return tcx("Running", startIso, dur, (t) => {
    const v = t < 300 ? 2.6 : speed;
    const cad = Math.round(160 + (v - 2.6) * 9);
    return { v, cad, hr: h(t, Math.min(178, 92 + (v - 2.2) * 42 + driftBpm * (t / dur)), cad), temp };
  });
}

function intervalRun(startIso: string, fade = 0) {
  const h = heart("strap");
  const dur = 3000;
  return tcx("Running", startIso, dur, (t) => {
    let v = 2.7;
    if (t >= 720) {
      const rep = Math.floor((t - 720) / 300);
      const cyc = (t - 720) % 300;
      if (rep < 6) v = cyc < 180 ? 4.1 - rep * fade : 2.35;
    }
    const cad = Math.round(160 + (v - 2.6) * 9);
    return { v, cad, hr: h(t, Math.min(182, 92 + (v - 2.2) * 42 + t / 400)), temp: 27 };
  });
}

function ergRide(startIso: string) {
  const h = heart("strap");
  const dur = 3600;
  return tcx("Biking", startIso, dur, (t) => {
    let pw = 150;
    let cad = 88;
    if (t >= 600 && t < 600 + 6 * 360) {
      const rep = Math.floor((t - 600) / 360);
      const cyc = (t - 600) % 360;
      if (cyc < 240) {
        pw = 260 + Math.sin(t) * 4;
        cad = 92 - (cyc / 240) * (rep >= 3 ? 12 : 2);
      } else pw = 120;
    }
    const v = 7 + 2 * Math.sin(t / 90);
    return { v, pw, cad, hr: h(t, 100 + pw * 0.25) };
  });
}

function poolSwim(startIso: string) {
  const laps: LapSpec[] = [];
  let t = 0;
  for (let i = 0; i < 12; i++) {
    laps.push({ fromS: t, toS: t + 100, distM: 100 });
    t += 100;
    laps.push({ fromS: t, toS: t + 25, distM: 0, intensity: "Resting" });
    t += 25;
  }
  return tcx("Other", startIso, t, (s) => ({ v: 0, pos: false, hr: 120 + Math.sin(s / 30) * 8 }), laps, { noDistance: true });
}

function hyrox(startIso: string) {
  const h = heart("strap");
  return tcx("Running", startIso, 3600, (t) => {
    const running = t % 600 < 150;
    const v = running ? 3.6 : 0.1;
    return { v, cad: running ? 176 : 20, hr: h(t, running ? 165 : 140) };
  });
}

function stroll(startIso: string) {
  return tcx("Other", startIso, 1800, (t) => ({ v: 0.25, hr: 90 + (t % 7) }));
}

function hike(startIso: string) {
  const h = heart("strap");
  return tcx("Hiking", startIso, 2400, (t) => ({ v: 1.3, hr: h(t, 115) }));
}

// --------------------------------------------------------- pipeline

const baseOpts: DigestOptions = { athlete: { maxHr: 180 }, streamTokenBudget: 1500, driftWarmupS: 300, ...loc };

function analyse(xml: string, filename: string, opts: DigestOptions = baseOpts): FileAnalysis {
  const activity = parseTcx(xml);
  const built = buildFull(activity, opts);
  const res = finalize(built, xml.length, opts);
  emit(`bundle ${filename}`, res.bundle);
  emit(`warnings ${filename}`, res.warnings);
  emit(`insights ${filename}`, {
    classification: res.insights.classification,
    swim: res.insights.swim && { ...res.insights.swim, lengths: res.insights.swim.lengths.length },
    erg: res.insights.erg,
    hrSource: res.insights.hrSource,
    drift: res.insights.drift,
    adherence: res.insights.adherence.map((a) => ({ ...a, reps: a.reps.length })),
    zones: [res.digest.hrZones, res.digest.paceZones, res.digest.powerZones].map((z) => z.map((b) => b.label)),
    sets: res.digest.intervalSets.map((s) => s.description),
  });
  return {
    filename,
    digest: res.digest,
    hrSource: res.insights.hrSource,
    drift: res.insights.drift,
    adherence: res.insights.adherence,
    efforts: res.insights.efforts,
    samples: res.samples,
    hrSpeed: res.insights.hrSpeed,
    swim: res.insights.swim,
  };
}

const weatherHot: WeatherObservation = {
  tempC: 29, apparentC: 32, humidityPct: 75, windKmh: 8, source: "Open-Meteo", sentLat: 45.76, sentLon: 4.84,
} as WeatherObservation;

const files: FileAnalysis[] = [
  analyse(steadyRun("2026-06-02T06:30:00Z", "strap", 3.2, 4), "a-steady-strap-1.tcx"),
  analyse(steadyRun("2026-06-16T06:30:00Z", "strap", 3.25, 7, 24), "a-steady-strap-2.tcx"),
  analyse(steadyRun("2026-07-07T06:30:00Z", "strap", 3.3, 12, 30), "a-steady-strap-3.tcx"),
  analyse(steadyRun("2026-07-21T06:30:00Z", "optical", 3.2, 3), "b-steady-optical.tcx"),
  analyse(intervalRun("2026-07-23T06:30:00Z", 0.08), "c-intervals-fade.tcx"),
  analyse(intervalRun("2026-07-25T06:30:00Z"), "c-intervals.tcx"),
  analyse(ergRide("2026-07-26T17:00:00Z"), "d-erg.tcx"),
  analyse(poolSwim("2026-07-27T12:00:00Z"), "e-pool.tcx"),
  analyse(hyrox("2026-07-28T18:00:00Z"), "f-hyrox.tcx"),
  analyse(stroll("2026-07-29T18:00:00Z"), "g-stroll.tcx"),
  analyse(hike("2026-07-30T08:00:00Z"), "h-hike.tcx"),
];
files[2].weather = weatherHot;
// Sans profil athlète, puis avec FTP : autres zones, autres avertissements.
analyse(ergRide("2026-07-31T17:00:00Z"), "d-erg-noprofile.tcx", { streamTokenBudget: 800, ...loc });
analyse(ergRide("2026-08-02T17:00:00Z"), "d-erg-ftp.tcx", { athlete: { maxHr: 185, ftpW: 270 }, streamTokenBudget: 800, privacyRadiusM: 200, ...loc });
// Doublon volontaire : Windows renomme en « (1) ».
files.push({ ...files[0], filename: "a-steady-strap-1 (1).tcx" });

// GPX : autre parseur, même chaîne.
{
  const pts = Array.from({ length: 1500 }, (_, i) =>
    `<trkpt lat="${(48.85 + i * 0.00003).toFixed(6)}" lon="2.34"><ele>40</ele><time>${new Date(Date.parse("2026-08-01T07:00:00Z") + i * 2000).toISOString()}</time></trkpt>`,
  ).join("");
  const gpx = `<?xml version="1.0"?><gpx version="1.1" creator="t"><trk><type>running</type><trkseg>${pts}</trkseg></trk></gpx>`;
  const act = parseGpx(gpx);
  const res = finalize(buildFull(act, baseOpts), gpx.length, baseOpts);
  emit("bundle gpx", res.bundle);
}

const batch = analyzeBatch(files, {
  maxHr: 170,
  raceResults: [{ distanceM: 10000, timeS: 2580 }, { distanceM: 21097.5, timeS: 5700 }],
  ...loc,
});
emit("batch warnings", batch.warnings);
emit("batch projections", batch.projections);
emit("batch progression", batch.progression);
emit("batch weeks", batch.weeks.map((w) => w.isoWeek));
emit("batch bundle", buildBatchBundle(batch, { maxHr: 170, ...loc }));

const dossierVariants: DossierOptions[] = [
  { maxHr: 170, streamMode: "time", intervalS: 60 },
  { maxHr: 170, streamMode: "distance", intervalM: 500, dropCoordinates: true },
  { perSessionDetail: false, streamMode: "none" },
];
for (const v of dossierVariants) emit(`dossier ${JSON.stringify(v)}`, buildDossier(batch, { ...v, ...loc }));

// Lot sans résultat de course ni FC max : autres avertissements.
const batch2 = analyzeBatch(files.slice(0, 4), { ...loc });
emit("batch2 warnings", batch2.warnings);
emit("batch2 dossier", buildDossier(batch2, { streamMode: "none", ...loc }));
const batch3 = analyzeBatch(files.slice(0, 2), { maxHr: 150, ...loc });
emit("batch3 warnings", batch3.warnings);

// ---------------------------------------------- appels directs, cas limites

function flat(durS: number, f: (t: number) => Partial<Sample>): { samples: Sample[]; speed: number[] } {
  const samples: Sample[] = [];
  const speed: number[] = [];
  let d = 0;
  for (let t = 0; t <= durS; t++) {
    const p = f(t);
    const v = (p as { v?: number }).v ?? 3;
    d += v;
    samples.push({ t, dist: d, hr: p.hr, pw: p.pw, cad: p.cad, temp: p.temp });
    speed.push(v);
  }
  return { samples, speed };
}

const ext = (avgC: number) => ({ avgC, source: "Open-Meteo" });
const driftCases: [string, Sport, ReturnType<typeof flat>, Parameters<typeof analyzeDrift>[3]][] = [
  ["negative", "running", flat(3000, (t) => ({ v: 3, hr: 160 - t / 100 })), {}],
  ["low", "running", flat(3000, (t) => ({ v: 3, hr: 150 + t / 1000 })), {}],
  ["norm", "running", flat(3000, (t) => ({ v: 3, hr: 145 + t / 330 })), {}],
  ["marked", "running", flat(3000, (t) => ({ v: 3, hr: 140 + t / 170 })), {}],
  ["marked-hot", "running", flat(3000, (t) => ({ v: 3, hr: 140 + t / 170 })), { externalTemperature: ext(27) }],
  ["big", "running", flat(3000, (t) => ({ v: 3, hr: 130 + t / 80 })), {}],
  ["big-hot", "running", flat(3000, (t) => ({ v: 3, hr: 130 + t / 80 })), { externalTemperature: ext(31) }],
  ["work-drop", "running", flat(3000, (t) => ({ v: 3.4 - t / 5000, hr: 150 })), { maxCvPct: 50 }],
  ["no-window", "running", flat(3000, (t) => ({ v: t % 200 < 100 ? 4 : 2, hr: 150 })), {}],
  ["power-no-window", "cycling", flat(3000, (t) => ({ v: 8, pw: t % 200 < 100 ? 300 : 100, hr: 150 })), {}],
  ["run-power", "running", flat(3000, (t) => ({ v: 3, pw: 250, hr: 150 + t / 1000, temp: 30 })), {}],
  ["sparse-hr", "running", flat(3000, (t) => ({ v: 3, hr: t % 30 === 0 ? 150 : undefined })), {}],
  ["short-easy", "running", flat(3000, (t) => ({ v: t > 2300 ? 2.5 : t % 120 < 60 ? 4.5 : 2, hr: t > 2300 ? 120 + (t - 2300) / 200 : 165 })), {}],
  ["easy-long", "running", flat(3600, (t) => ({ v: t < 1500 ? (t % 120 < 60 ? 4.5 : 2) : 2.5, hr: t < 1500 ? 170 : 125 + (t - 1500) / 400 })), {}],
  ["short", "running", flat(3600, (t) => ({ v: t > 1200 && t < 2000 ? 3.5 : t % 100 < 50 ? 4.5 : 2, hr: t > 1200 && t < 2000 ? 170 + (t - 1200) / 300 : 150 })), {}],
];
for (const [name, sport, d, o] of driftCases) {
  emit(`drift ${name}`, analyzeDrift(d.samples, d.speed, sport, { warmupS: 300, ...o, ...loc }));
}

{
  const d = flat(1200, (t) => ({ v: 1, hr: 120 + Math.sin(t) }));
  emit("sensor swim", analyzeHrSource(d.samples, d.speed, "swimming", undefined, LOCALE));
  const c = flat(1800, (t) => ({ v: 8, hr: 140 + Math.round(Math.sin(t / 40) * 3), pw: 200 }));
  emit("sensor cycling", analyzeHrSource(c.samples, c.speed, "cycling", undefined, LOCALE));
  emit("sensor labels", (["chest_strap", "optical", "unknown"] as const).map((v) => hrSourceLabel(v, LOCALE)));
}

{
  const blk = (index: number, kind: "work" | "rest", startT: number, durS: number, pace?: number, hr?: number, pw?: number): IntervalBlock => ({
    index, kind, startT, durS, distM: pace ? (durS / pace) * 1000 : 0, paceSPerKm: pace, hrAvg: hr, pwAvg: pw,
  });
  const set = { reps: 6, kind: "time", targetS: 180, avgWorkDurS: 180, avgRestDurS: 90, description: "6 × 180 s, récup 90 s" } as IntervalSet;
  const regular = [0, 1, 2, 3, 4, 5].flatMap((i) => [
    blk(i * 2, "work", i * 300, 180, 240, 160 + i * 2),
    blk(i * 2 + 1, "rest", i * 300 + 180, 90 + i * 10),
  ]);
  const irregular = [0, 1, 2, 3, 4, 5].flatMap((i) => [
    blk(i * 2, "work", i * 300, 180, 240 + (i % 2 ? 20 : -20) + i * 4, 165),
    blk(i * 2 + 1, "rest", i * 300 + 180, 120 - i * 10),
  ]);
  const progress = [0, 1, 2, 3, 4, 5].flatMap((i) => [
    blk(i * 2, "work", i * 300, 180, 250 - i * 3, 160),
    blk(i * 2 + 1, "rest", i * 300 + 180, 90),
  ]);
  const power = [0, 1, 2, 3].flatMap((i) => [
    blk(i * 2, "work", i * 300, 180, 120, 150, 250 - i * 8),
    blk(i * 2 + 1, "rest", i * 300 + 180, 90),
  ]);
  const hrSamples = flat(2000, (t) => {
    const phase = t % 300;
    return { v: 3, hr: phase < 180 ? 170 : 170 - Math.min(phase - 180, 60) * (0.3 - (t / 2000) * 0.25) };
  }).samples;
  const hrFast = flat(2000, (t) => {
    const phase = t % 300;
    return { v: 3, hr: phase < 180 ? 175 : 175 - Math.min(phase - 180, 60) * 0.7 };
  }).samples;
  const hrMid = flat(2000, (t) => {
    const phase = t % 300;
    return { v: 3, hr: phase < 180 ? 170 : 170 - Math.min(phase - 180, 60) * 0.45 };
  }).samples;
  emit("adh one", analyzeAdherence(regular.slice(0, 1), set, undefined, [], "running", LOCALE));
  emit("adh regular", analyzeAdherence(regular, set, { reps: 8, targetPaceSPerKm: 240 }, hrSamples, "running", LOCALE));
  emit("adh irregular", analyzeAdherence(irregular, set, { targetPaceSPerKm: 230 }, hrFast, "running", LOCALE));
  emit("adh progress", analyzeAdherence(progress, set, { targetPaceSPerKm: 260 }, hrMid, "running", LOCALE));
  emit("adh power", analyzeAdherence(power, set, { targetPwW: 250 }, [], "cycling", LOCALE));
  emit("adh power-over", analyzeAdherence(power, set, { targetPwW: 220 }, [], "cycling", LOCALE));
}

{
  const act = (sport: Sport, n: number, f: (t: number) => Partial<Sample>): Activity => ({
    sport, source: "tcx", laps: [],
    samples: Array.from({ length: n }, (_, t) => ({ t, ...f(t) })),
  });
  const openWater = act("other", 1800, (t) => ({ dist: t * 1.1, lat: t % 10 < 6 ? 45 : undefined, lon: t % 10 < 6 ? 4 : undefined }));
  emit("classify open water", classifyActivity(openWater, openWater.samples.map(() => 1.1), LOCALE));
  emit("classify other", classifyActivity(act("other", 1800, (t) => ({ dist: t * 3, lat: 45, lon: 4, cad: 170 })), new Array(1800).fill(3), LOCALE));
  emit("classify hiking", classifyActivity(act("hiking", 1800, (t) => ({ dist: t * 1.3, lat: 45, lon: 4 })), new Array(1800).fill(1.3), LOCALE));
  emit("swim open", analyzeSwim(openWater, false, undefined, undefined, LOCALE));
  emit("swim fit lengths", analyzeSwim(
    { ...openWater, samples: openWater.samples.map((s) => ({ ...s, hr: undefined })) }, true, 25,
    Array.from({ length: 8 }, (_, i) => ({ index: i, startT: i * 40, durS: 30, active: i !== 4, strokes: 16 })),
    LOCALE,
  ));
  emit("swim sparse", analyzeSwim({ ...openWater, laps: [], samples: openWater.samples.map((s) => ({ t: s.t })) }, true, undefined, undefined, LOCALE));
  emit("erg none", detectErg([], [], LOCALE));
  emit("swim laps only", analyzeSwim(
    { sport: "swimming", source: "tcx", samples: Array.from({ length: 600 }, (_, t) => ({ t })),
      laps: [0, 1, 2, 3].map((i) => ({ index: i, startT: i * 150, durS: 120, distM: 100 })) },
    true, 25, undefined, LOCALE,
  ));
}

{
  const prog = analyzeProgression([
    { filename: "x", date: "2026-01-01", hrSource: "chest_strap", hrSpeed: [], sport: "running" },
  ], LOCALE);
  emit("progression few", prog);
  const profile = (hr: number) => [
    { paceSPerKm: 300, hrAvg: hr, timeS: 900 },
    { paceSPerKm: 330, hrAvg: hr - 8, timeS: 900 },
  ];
  const mk = (date: string, hr: number, src: "chest_strap" | "optical", tempC?: number) =>
    ({ filename: date, date, hrSource: src, hrSpeed: profile(hr), tempC, sport: "running" });
  emit("progression down", analyzeProgression([mk("2026-01-01", 150, "chest_strap", 5), mk("2026-01-20", 147, "chest_strap", 12), mk("2026-02-10", 143, "chest_strap", 22), mk("2026-02-20", 150, "optical")], LOCALE));
  emit("progression up", analyzeProgression([mk("2026-01-01", 140, "chest_strap"), mk("2026-01-20", 144, "chest_strap"), mk("2026-02-10", 148, "chest_strap")], LOCALE));
  emit("progression stable", analyzeProgression([mk("2026-01-01", 140, "chest_strap"), mk("2026-01-20", 140, "chest_strap"), mk("2026-02-10", 140.5, "chest_strap")], LOCALE));
  emit("progression short", analyzeProgression([mk("2026-01-01", 140, "chest_strap"), mk("2026-01-05", 140, "chest_strap"), mk("2026-01-10", 139, "chest_strap")], LOCALE));
  emit("progression none", analyzeProgression([1, 2, 3].map((i) => ({ ...mk(`2026-01-0${i}`, 140, "chest_strap"), hrSpeed: [{ paceSPerKm: 500, hrAvg: 100, timeS: 900 }, { paceSPerKm: 520, hrAvg: 99, timeS: 900 }] })), LOCALE));
}

{
  const efforts = [
    { distanceM: 1000, timeS: 190, paceSPerKm: 190, speedMS: 1000 / 190, startS: 0 },
    { distanceM: 1500, timeS: 300, paceSPerKm: 200, speedMS: 5, startS: 0 },
    { distanceM: 3000, timeS: 640, paceSPerKm: 213, speedMS: 3000 / 640, startS: 0 },
    { distanceM: 5000, timeS: 1100, paceSPerKm: 220, speedMS: 5000 / 1100, startS: 0 },
  ];
  const cs = fitCriticalSpeed(efforts);
  emit("projections dated", projectRaces({
    efforts, cs, today: new Date("2026-09-01T00:00:00Z"),
    raceResults: [{ distanceM: 42195, timeS: 12540, date: "2025-04-06" }, { distanceM: 15000, timeS: 3900, date: "2026-05-01" }],
    ...loc,
  }));
  emit("projections effort only", projectRaces({ efforts, ...loc }));
  emit("projections cs", projectRaces({ efforts, cs, ...loc }));
}

emit("heat", [30, 25, 12, 2].map((t) =>
  heatStressNote({ tempC: t, apparentC: t, humidityPct: 80, source: "Open-Meteo" } as WeatherObservation, LOCALE)));
emit("heat dry", heatStressNote({ tempC: 26, source: "Open-Meteo" } as WeatherObservation, LOCALE));

{
  const pts = Array.from({ length: 40 }, (_, i) => ({ t: i * 60, hr: 140 + i, paceSPerKm: 300 - i, powerW: 200 + i }));
  const c = { ...loc };
  emit("chart session pace", sessionChart(pts, { window: { fromS: 600, toS: 1800 }, ...c }));
  emit("chart session power", sessionChart(pts, { usePower: true, ...c }));
  emit("chart reps", repsChart([{ index: 1, value: 240, hr: 160 }, { index: 2, value: 242, hr: 163 }], { unit: "pace", ...c }));
  emit("chart reps nohr", repsChart([{ index: 1, value: 250 }, { index: 2, value: 252 }], { unit: "power", ...c }));
  emit("chart trend", trendChart([{ date: "2026-01-01", value: 150 }, { date: "2026-02-01", value: 147 }, { date: "2026-03-01", value: 144 }], "FC à 5:00/km", LOCALE));
  emit("chart load", loadChart([{ label: "2026-S01", km: 30, hardPct: 20 }, { label: "2026-S02", km: 42 }], LOCALE));
}

async function errorOf(f: () => unknown): Promise<string> {
  try {
    await f();
    return "(pas d'erreur)";
  } catch (e) {
    return (e as Error).message;
  }
}
emit("errors", [
  await errorOf(() => parseAny("notes.txt", "hello", LOCALE)),
  await errorOf(() => buildFull({ sport: "running", source: "tcx", samples: [], laps: [] }, { ...loc })),
  await errorOf(() => decodeFit(new Uint8Array(20), LOCALE)),
  await errorOf(() => decodeFit(Uint8Array.from([12, 16, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 0, 0]), LOCALE)),
  await errorOf(() => fromStravaStreams({ id: "42" }, {}, LOCALE)),
]);

// ------------------------------------------------------------- verdict

const text = out.join("\n") + "\n";
if (PRINT) {
  process.stdout.write(text);
} else if (WRITE) {
  mkdirSync(dirname(GOLDEN), { recursive: true });
  writeFileSync(GOLDEN, text);
  console.log(`Référence écrite : ${GOLDEN} (${text.length} caractères)`);
} else {
  // Une copie Windows peut recevoir la référence en CRLF : on compare le texte,
  // pas les fins de ligne.
  const ref = readFileSync(GOLDEN, "utf8").replace(/\r\n/g, "\n");
  if (ref === text) {
    console.log(`\u001b[32m✓\u001b[0m rendu français identique à la référence (${text.length} caractères)`);
  } else {
    const a = ref.split("\n");
    const b = text.split("\n");
    let i = 0;
    while (i < a.length && a[i] === b[i]) i++;
    console.log(`\u001b[31m✗\u001b[0m rendu français modifié, ligne ${i + 1}`);
    console.log(`  attendu : ${a[i]?.slice(0, 300)}`);
    console.log(`  obtenu  : ${b[i]?.slice(0, 300)}`);
    process.exitCode = 1;
  }
}
