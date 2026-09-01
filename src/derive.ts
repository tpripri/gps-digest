/** Métriques dérivées : pente, GAP, temps en mouvement, NP, dérive cardiaque. */

import { smoothByTime, speedSeries, mean } from "./geo.ts";
import type { Sample, Sport } from "./types.ts";

/** Vitesse minimale considérée comme "en mouvement", par sport (m/s). */
const MOVING_THRESHOLD: Record<Sport, number> = {
  running: 0.5,
  hiking: 0.3,
  cycling: 1.0,
  swimming: 0.2,
  other: 0.4,
};

/** Un trou de plus de 10 s est une pause, pas du temps d'effort. */
const MAX_GAP_S = 10;

export function movingTime(samples: Sample[], sport: Sport, speed?: number[]): number {
  const v = speed ?? speedSeries(samples);
  const th = MOVING_THRESHOLD[sport] ?? 0.4;
  let total = 0;
  for (let i = 1; i < samples.length; i++) {
    const dt = Math.min(samples[i].t - samples[i - 1].t, MAX_GAP_S);
    if (dt > 0 && v[i] >= th) total += dt;
  }
  return total;
}

/**
 * Pente en %, calculée sur une fenêtre de distance et non de temps : à 3 min/km
 * une fenêtre de 10 s couvre 55 m, à l'arrêt elle couvre 0 m et la pente
 * diverge. On lisse l'altitude puis on dérive sur ~30 m de parcours.
 */
export function gradeSeries(samples: Sample[], windowM = 30): number[] {
  const ele = smoothByTime(samples, (s) => s.ele, 20);
  const n = samples.length;
  const out = new Array<number>(n).fill(0);
  let lo = 0;

  for (let i = 0; i < n; i++) {
    const d = samples[i].dist ?? 0;
    while (lo < i && (samples[lo].dist ?? 0) < d - windowM) lo++;
    const dd = d - (samples[lo].dist ?? 0);
    const de = (ele[i] ?? 0) - (ele[lo] ?? 0);
    out[i] = dd > 1 ? Math.max(-0.5, Math.min(0.5, de / dd)) : 0;
  }
  return out;
}

/**
 * Facteur de coût métabolique de Minetti et al. (2002), *J Appl Physiol* :
 * coût énergétique de la course en fonction de la pente i (rise/run).
 * C(i) = 155,4·i⁵ − 30,4·i⁴ − 43,3·i³ + 46,3·i² + 19,5·i + 3,6  (J/kg/m)
 * Le facteur GAP est C(i)/C(0). Validé entre −45 % et +45 %.
 */
export function gapFactor(i: number): number {
  const g = Math.max(-0.45, Math.min(0.45, i));
  const c =
    155.4 * g ** 5 - 30.4 * g ** 4 - 43.3 * g ** 3 + 46.3 * g ** 2 + 19.5 * g + 3.6;
  return c / 3.6;
}

/** Allure ajustée à la pente, en s/km, point par point. */
export function gapSeries(samples: Sample[], speed: number[], grade: number[]): number[] {
  return speed.map((v, i) => {
    if (v <= 0.3) return 0;
    const adjusted = v / gapFactor(grade[i]);
    return adjusted > 0.1 ? 1000 / adjusted : 0;
  });
}

/**
 * Normalized Power (Coggan) : moyenne glissante 30 s → puissance 4 → moyenne →
 * racine 4e. Reflète le coût physiologique réel d'un effort variable.
 */
export function normalizedPower(samples: Sample[]): number | undefined {
  if (!samples.some((s) => s.pw != null)) return undefined;
  const roll = smoothByTime(samples, (s) => s.pw, 30);
  let sum = 0;
  let count = 0;
  for (const v of roll) {
    if (v != null && Number.isFinite(v)) {
      sum += v ** 4;
      count++;
    }
  }
  return count ? (sum / count) ** 0.25 : undefined;
}

/**
 * Découplage aérobie (Friel). Compare le rendement sur la 1re et la 2e moitié
 * du temps en mouvement : ratio puissance/FC (vélo) ou vitesse/FC (course).
 * Au-delà de ~5 %, l'endurance de base est le facteur limitant.
 */
export function decoupling(
  samples: Sample[],
  speed: number[],
  usePower: boolean,
): number | undefined {
  const n = samples.length;
  if (n < 20) return undefined;
  const mid = Math.floor(n / 2);

  const ratio = (from: number, to: number): number | undefined => {
    const out: number[] = [];
    for (let i = from; i < to; i++) {
      const hr = samples[i].hr;
      const work = usePower ? samples[i].pw : speed[i];
      if (hr != null && hr > 40 && work != null && work > 0) out.push(work / hr);
    }
    return out.length > 10 ? mean(out) : undefined;
  };

  const first = ratio(0, mid);
  const second = ratio(mid, n);
  if (first == null || second == null || first === 0) return undefined;
  return ((first - second) / first) * 100;
}

/**
 * Efficiency Factor. Vélo : NP / FC moyenne. Course : vitesse en m/min / FC.
 * Se suit dans le temps ; en hausse à FC égale = progression aérobie.
 */
export function efficiencyFactor(
  hrAvg: number | undefined,
  np: number | undefined,
  speedAvg: number | undefined,
  sport: Sport,
): number | undefined {
  if (!hrAvg || hrAvg < 40) return undefined;
  if (sport === "cycling" && np) return np / hrAvg;
  if (speedAvg) return (speedAvg * 60) / hrAvg;
  return undefined;
}

/** Fréquence d'échantillonnage médiane, en Hz. */
export function samplingHz(samples: Sample[]): number | undefined {
  if (samples.length < 3) return undefined;
  const deltas: number[] = [];
  for (let i = 1; i < samples.length; i++) {
    const d = samples[i].t - samples[i - 1].t;
    if (d > 0 && d < 60) deltas.push(d);
  }
  if (!deltas.length) return undefined;
  deltas.sort((a, b) => a - b);
  const median = deltas[Math.floor(deltas.length / 2)];
  return median > 0 ? 1 / median : undefined;
}
