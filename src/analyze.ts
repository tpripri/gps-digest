/**
 * Couche d'analyse : c'est ici que se crée l'essentiel de la valeur pour le LLM.
 *
 * Un modèle raisonne mal sur 7 000 lignes brutes, très bien sur 40 lignes de
 * splits + un tableau de zones + une liste d'intervalles détectés. Ce fichier
 * transforme une série temporelle en objets que le modèle peut interpréter.
 */

import { smoothByTime, elevationGainLoss, mean, speedSeries } from "./geo.ts";
import { t } from "./i18n.ts";
import {
  movingTime,
  gradeSeries,
  gapSeries,
  gapCostRatio,
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
  WorkoutStep,
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
    const pace = distM > 0 ? (durS / distM) * 1000 : undefined;
    const ratio = gapCostRatio(samples, speed, gap, startIdx + 1, endIdx);

    splits.push({
      index: splits.length + 1,
      markM: Math.round(endDist),
      startT: Math.round(startT),
      durS: Math.round(durS),
      distM: Math.round(distM),
      paceSPerKm: pace,
      gapSPerKm: pace != null && ratio ? pace / ratio : undefined,
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

/** Libellés des n premières zones : Z1 récup, Z2 endurance… */
function zoneLabels(n: 5 | 7, locale?: string): string[] {
  const keys = ["zone.1", "zone.2", "zone.3", "zone.4", "zone.5", "zone.6", "zone.7"] as const;
  return keys.slice(0, n).map((k) => t(locale, k));
}

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
export type HrZoneModel = "max" | "reserve" | "threshold";

/**
 * Bornes des cinq zones FC selon le modèle.
 *
 * - « threshold » : % de la FC au seuil (Friel, course à pied : Z2 dès 85 %,
 *   Z5 à partir du seuil). Retenu d'office quand le seuil est connu.
 * - « reserve » : Karvonen, FC de repos + 50 à 90 % de la FC de réserve.
 * - « max » : 50 à 90 % de la FC max.
 *
 * Sans profil, la FC max est celle observée : à l'échelle d'une séance, elle
 * ne vaut rien (un footing à 159 de max affichait 18 % en « VO2max ») ;
 * analyzeBatch la remplace par la FC max de toute la période.
 */
export function hrZoneBounds(athlete: AthleteProfile | undefined, observedMax: number): { model: HrZoneModel; bounds: number[] } {
  const model = athlete?.hrZoneModel ?? (athlete?.lthr ? "threshold" : "max");
  if (model === "threshold" && athlete?.lthr) {
    const lthr = athlete.lthr;
    return { model, bounds: [0.65, 0.85, 0.9, 0.95, 1.0, 1.25].map((p) => p * lthr) };
  }
  const maxHr = athlete?.maxHr ?? (athlete?.lthr ? athlete.lthr / 0.9 : observedMax);
  if (model === "reserve" && athlete?.restHr && maxHr > athlete.restHr) {
    const rest = athlete.restHr;
    return { model, bounds: [0.5, 0.6, 0.7, 0.8, 0.9, 1.01].map((p) => rest + p * (maxHr - rest)) };
  }
  return { model: "max", bounds: [0.5, 0.6, 0.7, 0.8, 0.9, 1.01].map((p) => p * maxHr) };
}

export function hrZones(samples: Sample[], athlete?: AthleteProfile, locale?: string): ZoneBin[] {
  const observed = Math.max(0, ...samples.map((s) => s.hr ?? 0));
  if (observed < 60) return [];
  const { bounds } = hrZoneBounds(athlete, observed);
  return binTime(
    samples,
    (i) => samples[i].hr,
    bounds,
    zoneLabels(5, locale),
  );
}

/** Zones de puissance Coggan (7 niveaux, % FTP). Nécessite la FTP. */
export function powerZones(samples: Sample[], athlete?: AthleteProfile, locale?: string): ZoneBin[] {
  const ftp = athlete?.ftpW;
  if (!ftp || !samples.some((s) => s.pw != null)) return [];
  const bounds = [0, 0.56, 0.76, 0.91, 1.06, 1.21, 1.5].map((p) => p * ftp);
  return binTime(
    samples,
    (i) => samples[i].pw,
    bounds,
    zoneLabels(7, locale),
  );
}

/** Zones d'allure, relatives à l'allure seuil. Omises si le seuil est inconnu. */
export function paceZones(
  samples: Sample[],
  speed: number[],
  athlete?: AthleteProfile,
  locale?: string,
): ZoneBin[] {
  const thr = athlete?.thresholdPaceSPerKm;
  if (!thr) return [];
  const thrSpeed = 1000 / thr;
  const bounds = [0, 0.78, 0.87, 0.94, 1.0, 1.06].map((p) => p * thrSpeed);
  return binTime(
    samples,
    (i) => (speed[i] > 0.3 ? speed[i] : undefined),
    bounds,
    zoneLabels(5, locale),
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

/** Effort au moins 12 % plus rapide (ou puissant) que la récupération qui l'entoure. */
const MIN_CONTRAST = 0.12;
/** Au-delà, un coureur n'accélère pas : son GPS se recale. */
const MAX_RUN_SPEED_MS = 8;
/** Part maximale d'un effort fournie par des sauts de position. */
const MAX_JUMP_SHARE = 0.02;

const WORK_INTENSITY = /^(active|interval)$/i;
const REST_INTENSITY = /^(rest|resting|recovery)$/i;

type Detected = { blocks: IntervalBlock[]; sets: IntervalSet[] };
const NONE: Detected = { blocks: [], sets: [] };

/** À vélo avec capteur, l'effort se lit en watts ; partout ailleurs, en vitesse. */
const usePower = (sport: Sport, samples: Sample[]) =>
  sport === "cycling" && samples.some((s) => s.pw != null);

/** Intensité d'un bloc dans la grandeur qui définit l'effort. */
const levelOf = (b: IntervalBlock, power: boolean) =>
  power ? (b.pwAvg ?? 0) : b.durS > 0 ? b.distM / b.durS : 0;

/** Bloc couvrant [fromT, toT[ : FC, puissance et allure lues dans la trace. */
function blockOver(
  samples: Sample[],
  index: number,
  kind: "work" | "rest",
  fromT: number,
  toT: number,
  durS: number,
  distM: number,
  stepIndex?: number,
): IntervalBlock {
  const slice = samples.filter((s) => s.t >= fromT && s.t < toT);
  return {
    index,
    kind,
    startT: Math.round(fromT),
    durS: Math.round(durS),
    distM: Math.round(distM),
    paceSPerKm: distM > 5 ? (durS / distM) * 1000 : undefined,
    hrAvg: mean(slice.map((s) => s.hr)),
    hrMax: slice.reduce<number | undefined>(
      (m, s) => (s.hr != null && (m == null || s.hr > m) ? s.hr : m),
      undefined,
    ),
    pwAvg: mean(slice.map((s) => s.pw)),
    stepIndex,
  };
}

/**
 * Détection des intervalles, de la source la plus sûre à la plus fragile.
 *
 * 1. Séance programmée sur la montre : les tours portent l'étape de la séance
 *    (FIT), ou une intensité « Repos » explicite (TCX). C'est la prescription
 *    elle-même, à condition que l'athlète l'ait suivie : si une récupération
 *    a été courue aussi vite que les efforts, on n'y croit plus.
 * 2. Tours manuels : un tour par étape, comme Zwift, ou un athlète qui appuie
 *    sur le bouton à chaque répétition.
 * 3. Sinon seulement, détection sur le signal : vitesse en course (la
 *    puissance de course monte dans chaque côte, elle prenait un footing
 *    vallonné pour un fractionné), puissance à vélo. Un bloc ne compte comme
 *    effort que s'il dure assez (60 s en course), s'il est nettement plus
 *    rapide que la récupération qui l'entoure, et s'il ne doit rien à un
 *    saut de GPS.
 */
export function detectIntervals(
  samples: Sample[],
  speed: number[],
  laps: Lap[],
  minBlockS = 20,
  sport: Sport = "running",
  locale?: string,
  steps: WorkoutStep[] = [],
): Detected {
  return (
    workoutIntervals(samples, laps, steps, sport, locale) ??
    lapIntervals(samples, laps, sport, locale) ??
    autoIntervals(samples, speed, minBlockS, sport, locale)
  );
}

/** 1. Séance programmée : un bloc par étape, la prescription en prime. */
function workoutIntervals(
  samples: Sample[],
  laps: Lap[],
  steps: WorkoutStep[],
  sport: Sport,
  locale?: string,
): Detected | null {
  const stepped = laps.filter((l) => l.stepIndex != null).length >= 3;
  const restLaps = laps.filter((l) => REST_INTENSITY.test(l.intensity ?? "")).length;
  if (!stepped && !(restLaps >= 2 && laps.length >= 4)) return null;

  const stepOf = new Map(steps.map((s) => [s.index, s]));
  const kindOf = (l: Lap): "work" | "rest" => {
    // Tours hors séance (avant ou après) : de la course libre.
    if (stepped && l.stepIndex == null) return "rest";
    const intensity = (l.stepIndex != null ? stepOf.get(l.stepIndex)?.intensity : undefined) ?? l.intensity ?? "";
    return WORK_INTENSITY.test(intensity) ? "work" : "rest";
  };

  // Les tours consécutifs d'une même étape forment un seul bloc : l'auto-lap
  // au kilomètre découpe une répétition de 5000 m en cinq tours. Sans index
  // d'étape (TCX), rien ne distingue ces tours d'étapes distinctes : chaque
  // tour reste un bloc.
  type Group = { kind: "work" | "rest"; stepIndex?: number; fromT: number; toT: number; durS: number; distM: number };
  const groups: Group[] = [];
  for (const l of laps) {
    const kind = kindOf(l);
    const last = groups[groups.length - 1];
    if (stepped && last && last.kind === kind && last.stepIndex === l.stepIndex) {
      last.toT = l.startT + l.durS;
      last.durS += l.durS;
      last.distM += l.distM;
    } else {
      groups.push({ kind, stepIndex: l.stepIndex, fromT: l.startT, toT: l.startT + l.durS, durS: l.durS, distM: l.distM });
    }
  }
  const blocks = groups.map((g, i) => blockOver(samples, i, g.kind, g.fromT, g.toT, g.durS, g.distM, g.stepIndex));

  const work = blocks.filter((b) => b.kind === "work");
  if (!work.length) return null;
  const power = usePower(sport, samples);
  const workLevel = mean(work.map((b) => levelOf(b, power))) ?? 0;
  // Séance suivie ? Une récupération courue aussi vite que les efforts veut
  // dire que l'athlète a appuyé sur le bouton à contretemps : la structure
  // enregistrée ne décrit plus ce qu'il a fait.
  const followed = blocks.every(
    (b) => b.kind === "work" || b.startT < work[0].startT || levelOf(b, power) < workLevel * 0.95,
  );
  if (!followed) return null;

  const sets = groupSets(blocks, sport, locale, stepped).map((set) => {
    const first = blocks.find((b) => b.index === set.workBlockIndices?.[0]);
    const step = first?.stepIndex != null ? stepOf.get(first.stepIndex) : undefined;
    const repeat = step
      ? steps.find((r) => r.repeatCount != null && r.repeatFrom != null && r.repeatFrom <= step.index && step.index < r.index)
      : undefined;
    const out: IntervalSet = {
      ...set,
      source: "workout",
      repsPlanned: repeat?.repeatCount,
      targetPaceSPerKm: step?.targetPaceSPerKm,
      targetPwW: step?.targetPwW,
    };
    // La consigne de la montre prime sur l'arrondi de la distance courue.
    if (step?.durationM || step?.durationS) {
      out.kind = step.durationM ? "distance" : "time";
      out.targetM = step.durationM ? Math.round(step.durationM) : undefined;
      out.targetS = step.durationS ? Math.round(step.durationS) : undefined;
      out.description = describeSet(
        set.reps, out.kind, out.targetM ?? out.targetS ?? set.avgWorkDurS,
        set.avgWorkDurS, set.avgRestDurS, set.avgWorkPwW, sport, locale,
      );
    }
    return out;
  });
  return { blocks, sets };
}

/** 2. Tours manuels : chaque tour est une étape, on classe effort et récup. */
function lapIntervals(samples: Sample[], laps: Lap[], sport: Sport, locale?: string): Detected | null {
  if (laps.length < 4) return null;
  // Le dernier tour se termine avec la séance : son déclencheur ne dit rien.
  const inner = laps.slice(0, -1);
  const manual = inner.filter((l) => /^manual$/i.test(l.trigger ?? "")).length;
  if (manual < inner.length * 0.6) return null;

  const power = usePower(sport, samples);
  const blocks = laps.map((l, i) => blockOver(samples, i, "rest", l.startT, l.startT + l.durS, l.durS, l.distM));
  const levels = blocks.map((b) => levelOf(b, power));
  const positive = levels.filter((v) => v > 0);
  if (positive.length < 4) return null;
  const { low, high } = twoMeans(positive);
  if (high <= 0 || (high - low) / high < MIN_CONTRAST) return null;
  const mid = (low + high) / 2;

  for (let i = 0; i < blocks.length; i++) {
    if (levels[i] < mid || blocks[i].durS < 30) continue;
    const around = [levels[i - 1], levels[i + 1]].filter((v): v is number => v != null && v < mid);
    const ref = around.length ? mean(around)! : low;
    if (levels[i] * (1 - MIN_CONTRAST) >= ref) blocks[i].kind = "work";
  }
  if (blocks.filter((b) => b.kind === "work").length < 2) return null;

  const totalS = laps.reduce((s, l) => s + l.durS, 0);
  const sets = filterMeaningfulSets(groupSets(blocks, sport, locale), blocks, totalS)
    .map((s) => ({ ...s, source: "laps" as const }));
  return sets.length ? { blocks, sets } : null;
}

/** 3. Détection sur le signal, quand le fichier ne dit rien de la séance. */
function autoIntervals(
  samples: Sample[],
  speed: number[],
  minBlockS: number,
  sport: Sport,
  locale?: string,
): Detected {
  const power = usePower(sport, samples);
  const signal = power
    ? smoothByTime(samples, (s) => s.pw, 5).map((v) => v ?? 0)
    : speed;

  const active = signal.filter((v) => v > 0.3);
  if (active.length < 60) return NONE;

  const { low, high } = twoMeans(active);
  // Garde-fou : sur une sortie à allure constante, les deux centroïdes sont
  // quasi confondus. Inventer des "intervalles" serait pire que ne rien dire.
  if (high <= 0 || (high - low) / high < 0.18) return NONE;

  const mid = (low + high) / 2;
  const labels = signal.map((v) => (v >= mid ? "work" : "rest"));

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
  const mergeRuns = (input: Run[]) => {
    const merged: Run[] = [];
    for (const r of input) {
      const dur = samples[r.to].t - samples[r.from].t;
      const last = merged[merged.length - 1];
      if (dur < minBlockS && last) last.to = r.to;
      else if (last && last.kind === r.kind) last.to = r.to;
      else merged.push({ ...r });
    }
    return merged;
  };
  const merged = mergeRuns(runs);

  // Validation de chaque effort. Référence de récupération : le signal en
  // mouvement dans les récupérations voisines ; si elles se passent à
  // l'arrêt (feu rouge, récup debout), l'allure courante de la séance.
  // Sans ce second cas, chaque portion de footing entre deux feux rouges
  // devenait une répétition.
  const sortedActive = [...active].sort((a, b) => a - b);
  const usual = sortedActive[Math.floor(sortedActive.length * 0.25)];
  const minWorkS = sport === "running" ? 60 : 30;
  const restRef = (r: Run | undefined) => {
    if (!r || r.kind !== "rest") return undefined;
    let sum = 0;
    let n = 0;
    for (let i = r.from; i <= r.to; i++) if (signal[i] > 0.3) { sum += signal[i]; n++; }
    return n >= (r.to - r.from + 1) / 2 ? sum / n : undefined;
  };
  for (let k = 0; k < merged.length; k++) {
    const r = merged[k];
    if (r.kind !== "work") continue;
    const durS = samples[r.to].t - samples[r.from].t;
    const distM = (samples[r.to].dist ?? 0) - (samples[r.from].dist ?? 0);
    let jump = 0;
    if (!power) {
      for (let i = r.from + 1; i <= r.to; i++) {
        const step = (samples[i].dist ?? 0) - (samples[i - 1].dist ?? 0);
        jump += Math.max(0, step - MAX_RUN_SPEED_MS * Math.max(0, samples[i].t - samples[i - 1].t));
      }
    }
    const refs = [restRef(merged[k - 1]), restRef(merged[k + 1])].filter((v): v is number => v != null);
    const ref = refs.length ? mean(refs)! : usual;
    const level = power ? (mean(signal.slice(r.from, r.to + 1)) ?? 0) : durS > 0 ? distM / durS : 0;
    const valid = durS >= minWorkS
      && (sport !== "running" || jump <= MAX_JUMP_SHARE * distM)
      && level * (1 - MIN_CONTRAST) >= ref;
    if (!valid) r.kind = "rest";
  }

  const blocks: IntervalBlock[] = mergeRuns(merged)
    .map((r, i) => {
      const durS = samples[r.to].t - samples[r.from].t;
      const distM = (samples[r.to].dist ?? 0) - (samples[r.from].dist ?? 0);
      return blockOver(samples, i, r.kind, samples[r.from].t, samples[r.to].t + 1e-6, durS, distM);
    })
    .filter((b) => b.durS >= minBlockS * 0.5);

  const workCount = blocks.filter((b) => b.kind === "work").length;
  if (workCount < 2) return { blocks: [], sets: [] };
  const totalMoving = samples[samples.length - 1].t - samples[0].t;
  const sets = filterMeaningfulSets(groupSets(blocks, sport, locale), blocks, totalMoving)
    .map((s) => ({ ...s, source: "auto" as const }));
  return { blocks, sets };
}

/**
 * Écarte les séries parasites.
 *
 * Sur une sortie longue contenant deux blocs tempo, la segmentation produit
 * aussi des groupes issus de l'échauffement, des lignes droites ou du bruit —
 * du genre « 2 × 87 s ». Ils sont formellement corrects et parfaitement
 * trompeurs : ils donnent à croire que la séance comportait une structure
 * qu'elle n'avait pas.
 *
 * Critère retenu : une série ne compte que si son temps de travail cumulé
 * représente au moins 8 % de la séance. Une vraie série y parvient largement ;
 * un artefact, jamais.
 */
function filterMeaningfulSets(
  sets: IntervalSet[],
  blocks: IntervalBlock[],
  totalDurationS: number,
): IntervalSet[] {
  if (totalDurationS <= 0) return sets;
  const byIndex = new Map(blocks.map((b) => [b.index, b]));

  const scored = sets
    .map((s) => {
      const work = (s.workBlockIndices ?? [])
        .map((i) => byIndex.get(i))
        .filter((b): b is IntervalBlock => b != null);
      const workS = work.reduce((sum, b) => sum + b.durS, 0);
      return { set: s, sharePct: (workS / totalDurationS) * 100 };
    })
    .filter((x) => x.sharePct >= 8)
    .sort((a, b) => b.sharePct - a.sharePct);

  // Au-delà de trois séries, on décrit du bruit plutôt qu'une séance.
  return scored.slice(0, 3).map((x) => x.set);
}

/**
 * Libellé d'une série, adapté au sport.
 *
 * À vélo, décrire une série en mètres n'a aucun sens : sur home trainer la
 * distance est virtuelle, et en extérieur elle dépend du vent et de la pente.
 * C'est la puissance et la durée qui définissent l'effort — d'où « 7 × 60 s à
 * 257 W » plutôt que « 7 × 1200 m ».
 */
function describeSet(
  reps: number,
  kind: "distance" | "time",
  target: number,
  avgDur: number,
  avgRest: number,
  avgPw: number | undefined,
  sport: Sport,
  locale?: string,
): string {
  const rest = avgRest > 3 ? t(locale, "set.rest", { s: Math.round(avgRest) }) : "";
  if (sport === "cycling") {
    const power = avgPw != null ? t(locale, "set.power", { w: Math.round(avgPw) }) : "";
    return `${reps} × ${Math.round(avgDur)} s${power}${rest}`;
  }
  return kind === "distance"
    ? `${reps} × ${target} m${rest}`
    : `${reps} × ${Math.round(avgDur)} s${rest}`;
}

/** Regroupe les répétitions homogènes : "8 × 400 m, récup 90 s". */
function groupSets(
  blocks: IntervalBlock[],
  sport: Sport = "running",
  locale?: string,
  /** Séance programmée : une série, ce sont les passages d'une même étape. */
  byStep = false,
): IntervalSet[] {
  const work = blocks.filter((b) => b.kind === "work");
  const rest = blocks.filter((b) => b.kind === "rest");
  if (work.length < 2) return [];

  const sets: IntervalSet[] = [];
  let group: IntervalBlock[] = [work[0]];

  const similar = (a: IntervalBlock, b: IntervalBlock) => {
    if (byStep) return a.stepIndex != null && a.stepIndex === b.stepIndex;
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
      workBlockIndices: group.map((g) => g.index),
      reps: group.length,
      kind,
      targetM: kind === "distance" ? near : undefined,
      targetS: kind === "time" ? Math.round(avgDur) : undefined,
      avgWorkDurS: Math.round(avgDur),
      avgWorkPaceSPerKm: avgPace,
      avgWorkPwW: avgPw,
      avgRestDurS: Math.round(avgRest),
      description: describeSet(group.length, kind, target, avgDur, avgRest, avgPw, sport, locale),
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
  /** Dénivelé annoncé par l'appareil, quand le fichier le porte. */
  deviceElevation?: { gainM?: number; lossM?: number },
): SessionSummary {
  const speed = speedSeries(samples);
  const grade = gradeSeries(samples);
  const gap = gapSeries(samples, speed, grade, sport);
  const durElapsed = samples.length ? samples[samples.length - 1].t - samples[0].t : 0;
  const durMoving = movingTime(samples, sport, speed);
  const distM = samples.length ? (samples[samples.length - 1].dist ?? 0) : 0;
  const computed = elevationGainLoss(samples);
  // Le dénivelé calculé depuis l'altitude GPS sous-estime largement celui d'un
  // altimètre barométrique : mesuré sur une sortie réelle, 64 m contre 140,
  // et l'écart ne se rattrape pas en abaissant le seuil — même à 1 m on
  // plafonne à 89. Quand la montre donne son propre chiffre, il fait foi.
  const gain = deviceElevation?.gainM ?? computed.gain;
  const loss = deviceElevation?.lossM ?? computed.loss;
  const elevationFromDevice = deviceElevation?.gainM != null;

  const hrAvg = mean(samples.map((s) => s.hr));
  const paceAvg = distM > 0 ? (durMoving / distM) * 1000 : undefined;
  const gapRatio = gapCostRatio(samples, speed, gap);
  const speedAvg = durMoving > 0 ? distM / durMoving : undefined;
  // La puissance en course à pied est une estimation propre à chaque
  // constructeur, sans référentiel commun avec la puissance mécanique d'un
  // capteur vélo. Lui appliquer le modèle de Coggan (NP, IF, TSS), conçu et
  // validé pour le cyclisme, produirait des chiffres d'apparence sérieuse et
  // sans fondement. On réserve donc ces métriques au vélo.
  const powerIsMechanical = sport === "cycling";
  const np = powerIsMechanical ? normalizedPower(samples) : undefined;
  const ftp = powerIsMechanical ? athlete?.ftpW : undefined;
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
    elevationFromDevice,
    paceAvgSPerKm: paceAvg,
    gapAvgSPerKm: paceAvg != null && gapRatio ? paceAvg / gapRatio : undefined,
    speedAvgMS: speedAvg,
    speedMaxMS: speed.length ? Math.max(...speed) : undefined,
    hrAvg,
    hrMax: samples.reduce<number | undefined>(
      (m, s) => (s.hr != null && (m == null || s.hr > m) ? s.hr : m),
      undefined,
    ),
    cadAvg: mean(samples.map((s) => s.cad)),
    pwAvg: mean(samples.map((s) => s.pw)),
    pwIsEstimated: !powerIsMechanical && samples.some((s) => s.pw != null),
    pwNormalizedW: np,
    intensityFactor,
    tss,
    decouplingPct: decoupling(samples, speed, powerIsMechanical),
    efficiencyFactor: efficiencyFactor(hrAvg, np, speedAvg, sport),
    tempAvgC: mean(samples.map((s) => s.temp)),
    sampleCountRaw: samples.length,
    samplingHz: samplingHz(samples),
  };
}

export { speedSeries, gradeSeries, gapSeries };
