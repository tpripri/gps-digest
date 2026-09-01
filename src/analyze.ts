/**
 * Couche d'analyse : c'est ici que se crée l'essentiel de la valeur pour le LLM.
 *
 * Un modèle raisonne mal sur 7 000 lignes brutes, très bien sur 40 lignes de
 * splits + un tableau de zones + une liste d'intervalles détectés. Ce fichier
 * transforme une série temporelle en objets que le modèle peut interpréter.
 */

import { smoothByTime, elevationGainLoss, mean, speedSeries } from "./geo.ts";
import {
  movingTime,
  gradeSeries,
  gapSeries,
  normalizedPower,
  decoupling,
  efficiencyFactor,
  samplingHz,
} from "./derive.ts";
import type {
  AthleteProfile,
  IntervalBlock,
  IntervalSet,
  Lap,
  Sample,
  SessionSummary,
  Sport,
  Split,
  ZoneBin,
} from "./types.ts";

const MAX_GAP_S = 10;

const dt = (s: Sample[], i: number) =>
  i === 0 ? 0 : Math.min(s[i].t - s[i - 1].t, MAX_GAP_S);

// ---------------------------------------------------------------- splits

export function computeSplits(
  samples: Sample[],
  unitM: number,
  speed: number[],
  gap: number[],
): Split[] {
  const splits: Split[] = [];
  if (samples.length < 2) return splits;

  let target = unitM;
  let startIdx = 0;
  let startT = samples[0].t;
  let startDist = samples[0].dist ?? 0;

  const push = (endIdx: number, endT: number, endDist: number, partial: boolean) => {
    const slice = samples.slice(startIdx, endIdx + 1);
    if (slice.length < 2) return;
    const durS = endT - startT;
    const distM = endDist - startDist;
    const { gain, loss } = elevationGainLoss(slice, 2);
    const gapSlice = gap.slice(startIdx, endIdx + 1).filter((v) => v > 0);

    splits.push({
      index: splits.length + 1,
      markM: Math.round(endDist),
      startT: Math.round(startT),
      durS: Math.round(durS),
      distM: Math.round(distM),
      paceSPerKm: distM > 0 ? (durS / distM) * 1000 : undefined,
      gapSPerKm: gapSlice.length ? mean(gapSlice) : undefined,
      hrAvg: mean(slice.map((s) => s.hr)),
      cadAvg: mean(slice.map((s) => s.cad)),
      pwAvg: mean(slice.map((s) => s.pw)),
      eleGainM: gain,
      eleLossM: loss,
      partial,
    });
  };

  for (let i = 1; i < samples.length; i++) {
    const d = samples[i].dist ?? 0;
    while (d >= target) {
      const prev = samples[i - 1].dist ?? 0;
      const span = d - prev;
      const frac = span > 0 ? (target - prev) / span : 0;
      const tCross = samples[i - 1].t + frac * (samples[i].t - samples[i - 1].t);
      push(i, tCross, target, false);
      startIdx = i;
      startT = tCross;
      startDist = target;
      target += unitM;
    }
  }

  const last = samples[samples.length - 1];
  if ((last.dist ?? 0) - startDist > unitM * 0.05) {
    push(samples.length - 1, last.t, last.dist ?? 0, true);
  }
  return splits;
}

// ----------------------------------------------------------------- zones

function binTime(
  samples: Sample[],
  value: (i: number) => number | undefined,
  bounds: number[],
  labels: string[],
): ZoneBin[] {
  const times = new Array(bounds.length - 1).fill(0);
  let total = 0;
  for (let i = 1; i < samples.length; i++) {
    const v = value(i);
    if (v == null) continue;
    const d = dt(samples, i);
    if (d <= 0) continue;
    for (let z = 0; z < times.length; z++) {
      if (v >= bounds[z] && (z === times.length - 1 || v < bounds[z + 1])) {
        times[z] += d;
        total += d;
        break;
      }
    }
  }
  return times.map((timeS, z) => ({
    zone: z + 1,
    label: labels[z],
    lowerInclusive: Math.round(bounds[z]),
    upperExclusive: Math.round(bounds[z + 1] ?? Infinity),
    timeS: Math.round(timeS),
    pct: total > 0 ? (timeS / total) * 100 : 0,
  }));
}

/**
 * Zones FC. Priorité au LTHR (seuil lactique) qui est physiologiquement plus
 * fiable que la FC max. À défaut de profil athlète, on retombe sur la FC max
 * **observée dans le fichier** : approximatif, mais toujours plus utile que rien
 * — et le bundle l'annonce explicitement au modèle.
 */
export function hrZones(samples: Sample[], athlete?: AthleteProfile): ZoneBin[] {
  const observed = Math.max(0, ...samples.map((s) => s.hr ?? 0));
  if (observed < 60) return [];

  let maxHr = athlete?.maxHr;
  if (!maxHr && athlete?.lthr) maxHr = athlete.lthr / 0.9;
  if (!maxHr) maxHr = observed;

  const pcts = [0.5, 0.6, 0.7, 0.8, 0.9, 1.01];
  const bounds = pcts.map((p) => p * maxHr);
  return binTime(
    samples,
    (i) => samples[i].hr,
    bounds,
    ["Z1 récup", "Z2 endurance", "Z3 tempo", "Z4 seuil", "Z5 VO2max"],
  );
}

/** Zones de puissance Coggan (7 niveaux, % FTP). Nécessite la FTP. */
export function powerZones(samples: Sample[], athlete?: AthleteProfile): ZoneBin[] {
  const ftp = athlete?.ftpW;
  if (!ftp || !samples.some((s) => s.pw != null)) return [];
  const bounds = [0, 0.56, 0.76, 0.91, 1.06, 1.21, 1.5].map((p) => p * ftp);
  return binTime(
    samples,
    (i) => samples[i].pw,
    bounds,
    ["Z1 récup", "Z2 endurance", "Z3 tempo", "Z4 seuil", "Z5 VO2max", "Z6 anaérobie", "Z7 neuro"],
  );
}

/** Zones d'allure, relatives à l'allure seuil. Omises si le seuil est inconnu. */
export function paceZones(
  samples: Sample[],
  speed: number[],
  athlete?: AthleteProfile,
): ZoneBin[] {
  const thr = athlete?.thresholdPaceSPerKm;
  if (!thr) return [];
  const thrSpeed = 1000 / thr;
  const bounds = [0, 0.78, 0.87, 0.94, 1.0, 1.06].map((p) => p * thrSpeed);
  return binTime(
    samples,
    (i) => (speed[i] > 0.3 ? speed[i] : undefined),
    bounds,
    ["Z1 récup", "Z2 endurance", "Z3 tempo", "Z4 seuil", "Z5 VO2max"],
  );
}

// ------------------------------------------------------------- intervalles

/** k-moyennes 1D à 2 classes. Converge en quelques itérations sur ce type de signal. */
function twoMeans(values: number[]): { low: number; high: number } {
  const sorted = [...values].sort((a, b) => a - b);
  let low = sorted[Math.floor(sorted.length * 0.25)];
  let high = sorted[Math.floor(sorted.length * 0.85)];

  for (let it = 0; it < 30; it++) {
    let sl = 0, cl = 0, sh = 0, ch = 0;
    for (const v of values) {
      if (Math.abs(v - low) <= Math.abs(v - high)) { sl += v; cl++; }
      else { sh += v; ch++; }
    }
    const nl = cl ? sl / cl : low;
    const nh = ch ? sh / ch : high;
    if (Math.abs(nl - low) < 1e-6 && Math.abs(nh - high) < 1e-6) break;
    low = nl;
    high = nh;
  }
  return { low, high };
}

/**
 * Détection automatique des intervalles.
 *
 * 1. Si le fichier porte des laps alternant Active/Resting, on les croit :
 *    l'athlète a appuyé sur le bouton, aucune heuristique ne fera mieux.
 * 2. Sinon : k-moyennes à 2 classes sur la puissance (ou la vitesse), RLE,
 *    fusion des blocs trop courts, puis regroupement en séries.
 */
export function detectIntervals(
  samples: Sample[],
  speed: number[],
  laps: Lap[],
  minBlockS = 20,
): { blocks: IntervalBlock[]; sets: IntervalSet[] } {
  const nativeRest = laps.filter((l) => /rest/i.test(l.intensity ?? "")).length;
  if (nativeRest >= 2 && laps.length >= 4) {
    const blocks = laps.map((l, i) => ({
      index: i,
      kind: /rest/i.test(l.intensity ?? "") ? ("rest" as const) : ("work" as const),
      startT: Math.round(l.startT),
      durS: Math.round(l.durS),
      distM: Math.round(l.distM),
      paceSPerKm: l.distM > 0 ? (l.durS / l.distM) * 1000 : undefined,
      hrAvg: l.hrAvg,
      hrMax: l.hrMax,
    }));
    return { blocks, sets: groupSets(blocks) };
  }

  const hasPower = samples.some((s) => s.pw != null);
  const smoothed = hasPower
    ? smoothByTime(samples, (s) => s.pw, 5).map((v) => v ?? 0)
    : speed;

  const active = smoothed.filter((v) => v > 0.3);
  if (active.length < 60) return { blocks: [], sets: [] };

  const { low, high } = twoMeans(active);
  // Garde-fou : sur une sortie à allure constante, les deux centroïdes sont
  // quasi confondus. Inventer des "intervalles" serait pire que ne rien dire.
  if (high <= 0 || (high - low) / high < 0.18) return { blocks: [], sets: [] };

  const mid = (low + high) / 2;
  const labels = smoothed.map((v) => (v >= mid ? "work" : "rest"));

  // RLE
  type Run = { kind: "work" | "rest"; from: number; to: number };
  const runs: Run[] = [];
  let from = 0;
  for (let i = 1; i <= labels.length; i++) {
    if (i === labels.length || labels[i] !== labels[from]) {
      runs.push({ kind: labels[from] as "work" | "rest", from, to: i - 1 });
      from = i;
    }
  }

  // Fusion des micro-blocs (une accélération de 4 s n'est pas un intervalle).
  const merged: Run[] = [];
  for (const r of runs) {
    const dur = samples[r.to].t - samples[r.from].t;
    const last = merged[merged.length - 1];
    if (dur < minBlockS && last) last.to = r.to;
    else if (last && last.kind === r.kind) last.to = r.to;
    else merged.push({ ...r });
  }

  const blocks: IntervalBlock[] = merged
    .map((r, i) => {
      const slice = samples.slice(r.from, r.to + 1);
      const durS = samples[r.to].t - samples[r.from].t;
      const distM = (samples[r.to].dist ?? 0) - (samples[r.from].dist ?? 0);
      return {
        index: i,
        kind: r.kind,
        startT: Math.round(samples[r.from].t),
        durS: Math.round(durS),
        distM: Math.round(distM),
        paceSPerKm: distM > 5 ? (durS / distM) * 1000 : undefined,
        hrAvg: mean(slice.map((s) => s.hr)),
        hrMax: slice.reduce<number | undefined>(
          (m, s) => (s.hr != null && (m == null || s.hr > m) ? s.hr : m),
          undefined,
        ),
        pwAvg: mean(slice.map((s) => s.pw)),
      };
    })
    .filter((b) => b.durS >= minBlockS * 0.5);

  const workCount = blocks.filter((b) => b.kind === "work").length;
  if (workCount < 2) return { blocks: [], sets: [] };
  return { blocks, sets: groupSets(blocks) };
}

/** Regroupe les répétitions homogènes : "8 × 400 m, récup 90 s". */
function groupSets(blocks: IntervalBlock[]): IntervalSet[] {
  const work = blocks.filter((b) => b.kind === "work");
  const rest = blocks.filter((b) => b.kind === "rest");
  if (work.length < 2) return [];

  const sets: IntervalSet[] = [];
  let group: IntervalBlock[] = [work[0]];

  const similar = (a: IntervalBlock, b: IntervalBlock) => {
    const byDist =
      a.distM > 50 && b.distM > 50 && Math.abs(a.distM - b.distM) / a.distM < 0.15;
    const byTime = Math.abs(a.durS - b.durS) / Math.max(1, a.durS) < 0.15;
    return byDist || byTime;
  };

  const flush = () => {
    if (group.length < 2) {
      group = [];
      return;
    }
    const avgDur = mean(group.map((g) => g.durS)) ?? 0;
    const avgDist = mean(group.map((g) => g.distM)) ?? 0;
    const avgPace = mean(group.map((g) => g.paceSPerKm));
    const avgPw = mean(group.map((g) => g.pwAvg));
    const between = rest.filter(
      (r) => r.startT > group[0].startT && r.startT < group[group.length - 1].startT,
    );
    const avgRest = mean(between.map((r) => r.durS)) ?? 0;

    // On considère la série calibrée en distance si les répétitions tombent
    // près d'un repère rond (200/300/400/800/1000 m…).
    const rounded = [200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 2000, 3000, 5000];
    const near = rounded.find((r) => Math.abs(avgDist - r) / r < 0.08);
    const kind: "distance" | "time" = near ? "distance" : "time";
    const target = near ?? Math.round(avgDur);

    sets.push({
      reps: group.length,
      kind,
      targetM: kind === "distance" ? near : undefined,
      targetS: kind === "time" ? Math.round(avgDur) : undefined,
      avgWorkDurS: Math.round(avgDur),
      avgWorkPaceSPerKm: avgPace,
      avgWorkPwW: avgPw,
      avgRestDurS: Math.round(avgRest),
      description:
        kind === "distance"
          ? `${group.length} × ${target} m, récup ${Math.round(avgRest)} s`
          : `${group.length} × ${Math.round(avgDur)} s, récup ${Math.round(avgRest)} s`,
    });
    group = [];
  };

  for (let i = 1; i < work.length; i++) {
    if (similar(group[0], work[i])) group.push(work[i]);
    else {
      flush();
      group = [work[i]];
    }
  }
  flush();
  return sets;
}

// --------------------------------------------------------------- résumé

export function summarize(
  samples: Sample[],
  sport: Sport,
  startTime: string | undefined,
  device: string | undefined,
  source: SessionSummary["sourceFormat"],
  athlete?: AthleteProfile,
): SessionSummary {
  const speed = speedSeries(samples);
  const grade = gradeSeries(samples);
  const gap = gapSeries(samples, speed, grade);
  const durElapsed = samples.length ? samples[samples.length - 1].t - samples[0].t : 0;
  const durMoving = movingTime(samples, sport, speed);
  const distM = samples.length ? (samples[samples.length - 1].dist ?? 0) : 0;
  const { gain, loss } = elevationGainLoss(samples);

  const hrAvg = mean(samples.map((s) => s.hr));
  const np = normalizedPower(samples);
  const speedAvg = durMoving > 0 ? distM / durMoving : undefined;
  const hasPower = samples.some((s) => s.pw != null);

  const ftp = athlete?.ftpW;
  const intensityFactor = np && ftp ? np / ftp : undefined;
  const tss =
    np && ftp && intensityFactor
      ? ((durMoving * np * intensityFactor) / (ftp * 3600)) * 100
      : undefined;

  return {
    sport,
    startTimeUtc: startTime,
    device,
    sourceFormat: source,
    durElapsedS: Math.round(durElapsed),
    durMovingS: Math.round(durMoving),
    distM: Math.round(distM),
    eleGainM: Math.round(gain),
    eleLossM: Math.round(loss),
    paceAvgSPerKm: distM > 0 ? (durMoving / distM) * 1000 : undefined,
    gapAvgSPerKm: mean(gap.filter((v) => v > 0)),
    speedAvgMS: speedAvg,
    speedMaxMS: speed.length ? Math.max(...speed) : undefined,
    hrAvg,
    hrMax: samples.reduce<number | undefined>(
      (m, s) => (s.hr != null && (m == null || s.hr > m) ? s.hr : m),
      undefined,
    ),
    cadAvg: mean(samples.map((s) => s.cad)),
    pwAvg: mean(samples.map((s) => s.pw)),
    pwNormalizedW: np,
    intensityFactor,
    tss,
    decouplingPct: decoupling(samples, speed, hasPower),
    efficiencyFactor: efficiencyFactor(hrAvg, np, speedAvg, sport),
    tempAvgC: mean(samples.map((s) => s.temp)),
    sampleCountRaw: samples.length,
    samplingHz: samplingHz(samples),
  };
}

export { speedSeries, gradeSeries, gapSeries };
