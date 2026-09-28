/**
 * Natation.
 *
 * Rien de ce qui vaut en course ou à vélo ne se transpose ici, et c'est
 * pourquoi ce module est séparé plutôt qu'un cas particulier ailleurs.
 *
 *  - **La distance ne vient pas du GPS.** En bassin, la montre compte des
 *    longueurs par détection de virage. Le flux de trackpoints peut n'avoir
 *    aucune distance du tout : elle vit dans les balises `<Lap>`. Un parseur
 *    qui ne lit que les trackpoints rend zéro kilomètre pour une séance de
 *    1 500 m — c'est exactement ce qui se produisait.
 *  - **L'allure se compte aux 100 m**, pas au kilomètre.
 *  - **La FC est peu fiable.** Un capteur optique ne lit pas à travers l'eau,
 *    et une ceinture ne transmet pas : elle enregistre puis déverse ses données
 *    à la sortie. Les valeurs existent souvent, mais leur horodatage est
 *    approximatif. Toute dérive cardiaque calculée là-dessus serait du bruit
 *    présenté comme une mesure.
 *  - **Le SWOLF** — temps d'une longueur plus nombre de coups de bras — est
 *    l'indicateur d'efficacité propre à la nage. Il demande le nombre de coups,
 *    que le TCX ne porte pas toujours.
 */

import { mean } from "./geo.ts";
import { translator, type MessageKey, type MessageParams } from "./i18n.ts";
import type { Activity, Lap, Sample } from "./types.ts";

export interface SwimLength {
  index: number;
  startS: number;
  durS: number;
  distanceM: number;
  paceSPer100m: number;
  strokes?: number;
  /** SWOLF : temps de la longueur + nombre de coups. Plus bas = plus efficace. */
  swolf?: number;
  hrAvg?: number;
  /** Vrai si le tour est une pause plutôt qu'une longueur nagée. */
  isRest: boolean;
}

export interface SwimSet {
  reps: number;
  distanceM: number;
  avgPaceSPer100m: number;
  avgRestS: number;
  description: string;
}

export interface SwimAnalysis {
  poolSwim: boolean;
  poolLengthM?: number;
  totalDistanceM: number;
  /** Temps effectivement passé à nager, pauses exclues. */
  swimTimeS: number;
  elapsedS: number;
  avgPaceSPer100m?: number;
  bestPaceSPer100m?: number;
  lengths: SwimLength[];
  sets: SwimSet[];
  swolfAvg?: number;
  hrAvg?: number;
  /** Réserves sur la fiabilité des données, à transmettre telles quelles. */
  caveats: string[];
}

const paceLabel100 = (s: number): string =>
  `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

/**
 * Regroupe les longueurs en séries : « 6 × 100 m, récup 30 s ».
 * Une pause de plus de 10 secondes sépare deux séries.
 */
function groupSwimSets(
  lengths: SwimLength[],
  tr: (key: MessageKey, params?: MessageParams) => string,
): SwimSet[] {
  const swum = lengths.filter((l) => !l.isRest);
  if (swum.length < 2) return [];

  const groups: { reps: SwimLength[]; rests: number[] }[] = [];
  let current: SwimLength[] = [swum[0]];
  const rests: number[] = [];

  for (let i = 1; i < swum.length; i++) {
    const gap = swum[i].startS - (swum[i - 1].startS + swum[i - 1].durS);
    const similar =
      Math.abs(swum[i].distanceM - swum[i - 1].distanceM) < 1 &&
      Math.abs(swum[i].durS - swum[i - 1].durS) / Math.max(1, swum[i - 1].durS) < 0.3;
    if (gap > 60 || !similar) {
      groups.push({ reps: current, rests: [...rests] });
      current = [swum[i]];
      rests.length = 0;
    } else {
      current.push(swum[i]);
      if (gap > 3) rests.push(gap);
    }
  }
  groups.push({ reps: current, rests: [...rests] });

  return groups
    .filter((g) => g.reps.length >= 2)
    .map((g) => {
      const dist = mean(g.reps.map((r) => r.distanceM)) ?? 0;
      const pace = mean(g.reps.map((r) => r.paceSPer100m)) ?? 0;
      const rest = mean(g.rests) ?? 0;
      return {
        reps: g.reps.length,
        distanceM: Math.round(dist),
        avgPaceSPer100m: pace,
        avgRestS: Math.round(rest),
        description:
          tr("swim.set", { reps: g.reps.length, dist: Math.round(dist), pace: paceLabel100(pace) }) +
          (rest > 3 ? tr("swim.setRest", { s: Math.round(rest) }) : ""),
      };
    });
}

/** Longueur issue d'un FIT : la seule source qui les donne une par une. */
export interface RawLength {
  index: number;
  startT: number;
  durS: number;
  active: boolean;
  strokes?: number;
  cadence?: number;
}

export function analyzeSwim(
  activity: Activity,
  poolSwim: boolean,
  poolLengthM?: number,
  fitLengths?: RawLength[],
  locale?: string,
): SwimAnalysis {
  const tr = translator(locale);
  const caveats: string[] = [];
  const samples = activity.samples;
  const elapsedS = samples.length ? samples[samples.length - 1].t - samples[0].t : 0;

  // La distance des trackpoints est souvent absente ou figée en bassin :
  // les tours font foi.
  const lapTotal = activity.laps.reduce((s, l) => s + l.distM, 0);
  const trackTotal = samples.length ? (samples[samples.length - 1].dist ?? 0) : 0;
  const totalDistanceM = Math.max(lapTotal, trackTotal);

  if (lapTotal > trackTotal * 1.5) {
    caveats.push(tr("swim.lapDistance"));
  }

  const hrValues = samples.map((s) => s.hr).filter((v): v is number => v != null);
  if (hrValues.length) {
    caveats.push(tr("swim.hr"));
  }

  const hrAt = (t: number): number | undefined => {
    if (!samples.length) return undefined;
    let lo = 0;
    let hi = samples.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (samples[mid].t < t) lo = mid + 1;
      else hi = mid;
    }
    return samples[lo].hr;
  };

  // Les longueurs du FIT priment sur les tours : l'export TCX de Garmin
  // Connect écrase les 64 longueurs d'une séance en un tour unique, ce qui
  // rend impossible toute analyse par répétition.
  const lengths: SwimLength[] = fitLengths?.length && poolLengthM
    ? fitLengths.map((l) => {
        const dist = l.active ? poolLengthM : 0;
        const pace = l.active && l.durS > 0 ? (l.durS / poolLengthM) * 100 : 0;
        return {
          index: l.index,
          startS: Math.round(l.startT),
          durS: Math.round(l.durS * 10) / 10,
          distanceM: dist,
          paceSPer100m: pace,
          strokes: l.strokes,
          // SWOLF = temps de la longueur + coups de bras, ramené à 25 m pour
          // rester comparable entre bassins.
          swolf:
            l.strokes != null && l.strokes > 0
              ? Math.round((l.durS + l.strokes) * (25 / poolLengthM))
              : undefined,
          hrAvg: hrAt(l.startT + l.durS / 2),
          isRest: !l.active,
        };
      })
    : activity.laps.map((l: Lap, i) => {
    // Un tour sans distance est une pause : le nageur est au mur.
        const isRest = l.distM < 5 || l.durS <= 0;
        const pace = !isRest && l.distM > 0 ? (l.durS / l.distM) * 100 : 0;
        return {
          index: i + 1,
          startS: Math.round(l.startT),
          durS: Math.round(l.durS),
          distanceM: Math.round(l.distM),
          paceSPer100m: pace,
          hrAvg: l.hrAvg ?? hrAt(l.startT + l.durS / 2),
          isRest,
        };
      });

  const swum = lengths.filter((l) => !l.isRest && l.paceSPer100m > 20 && l.paceSPer100m < 600);
  const swimTimeS = swum.reduce((s, l) => s + l.durS, 0);
  const paces = swum.map((l) => l.paceSPer100m);

  if (!swum.length) {
    caveats.push(tr("swim.noLaps"));
  }

  // Densité de nage : une séance où l'on nage sept minutes sur quatre-vingt-dix
  // n'est pas une séance d'entraînement, même si le fichier en a la forme.
  const density = elapsedS > 0 ? swimTimeS / elapsedS : 0;
  if (elapsedS > 900 && density < 0.35) {
    caveats.push(
      tr("swim.lowDensity", { swim: Math.round(swimTimeS / 60), elapsed: Math.round(elapsedS / 60) }),
    );
  }

  if (!poolSwim) {
    caveats.push(tr("swim.openWater"));
  }

  if (swum.length > 1 && swum.every((l) => l.strokes == null)) {
    caveats.push(tr("swim.noStrokes"));
  }

  if (poolSwim && !poolLengthM) {
    caveats.push(tr("swim.noPoolLength"));
  }

  return {
    poolSwim,
    poolLengthM,
    totalDistanceM: Math.round(totalDistanceM),
    swimTimeS,
    elapsedS: Math.round(elapsedS),
    avgPaceSPer100m:
      swimTimeS > 0 && totalDistanceM > 0 ? (swimTimeS / totalDistanceM) * 100 : undefined,
    bestPaceSPer100m: paces.length ? Math.min(...paces) : undefined,
    lengths,
    sets: groupSwimSets(lengths, tr),
    hrAvg: hrValues.length ? mean(hrValues) : undefined,
    swolfAvg: mean(lengths.map((l) => l.swolf)),
    caveats,
  };
}

export function swimRows(a: SwimAnalysis) {
  return a.lengths
    .filter((l) => !l.isRest)
    .map((l) => ({
      n: l.index,
      start_s: l.startS,
      dur_s: l.durS,
      dist_m: l.distanceM,
      pace_s_100m: Math.round(l.paceSPer100m),
      pace_mmss_100m: paceLabel100(l.paceSPer100m),
      hr_bpm: l.hrAvg != null ? Math.round(l.hrAvg) : undefined,
      swolf: l.swolf,
    }));
}

export { paceLabel100 };
