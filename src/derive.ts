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
 * Pente bornée à ±30 % : au-delà, sur une course, c'est presque toujours un
 * saut de l'altimètre ou du GPS, pas un mur. Minetti reste valide jusqu'à
 * 45 %, mais une pente aberrante y produirait une GAP aberrante.
 */
const MAX_GRADE = 0.3;

/**
 * Pente (rise/run), calculée sur une fenêtre de distance et non de temps : à
 * 3 min/km une fenêtre de 10 s couvre 55 m, à l'arrêt elle couvre 0 m et la
 * pente diverge. L'altitude est d'abord lissée sur ±20 m de parcours (et non
 * sur 20 s : à l'arrêt, un lissage temporel concentrait le bruit de
 * l'altimètre sur quelques mètres), puis dérivée sur 40 m.
 */
export function gradeSeries(samples: Sample[], windowM = 40): number[] {
  const ele = smoothByDistance(samples, windowM / 2);
  const n = samples.length;
  const out = new Array<number>(n).fill(0);
  let lo = 0;

  for (let i = 0; i < n; i++) {
    const d = samples[i].dist ?? 0;
    while (lo < i && (samples[lo].dist ?? 0) < d - windowM) lo++;
    const dd = d - (samples[lo].dist ?? 0);
    const de = (ele[i] ?? 0) - (ele[lo] ?? 0);
    out[i] = dd > 1 ? Math.max(-MAX_GRADE, Math.min(MAX_GRADE, de / dd)) : 0;
  }
  return out;
}

/** Moyenne glissante de l'altitude sur ±halfM mètres de parcours. */
function smoothByDistance(samples: Sample[], halfM: number): (number | undefined)[] {
  const n = samples.length;
  const out = new Array<number | undefined>(n);
  let lo = 0;
  let hi = 0;
  let sum = 0;
  let count = 0;
  const dist = (k: number) => samples[k].dist ?? 0;
  for (let i = 0; i < n; i++) {
    while (hi < n && dist(hi) <= dist(i) + halfM) {
      const e = samples[hi].ele;
      if (e != null) { sum += e; count++; }
      hi++;
    }
    while (lo < i && dist(lo) < dist(i) - halfM) {
      const e = samples[lo].ele;
      if (e != null) { sum -= e; count--; }
      lo++;
    }
    out[i] = count ? sum / count : samples[i].ele;
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

/** La GAP n'a de sens qu'à pied : à vélo, la pente agit tout autrement. */
const GAP_SPORTS: ReadonlySet<Sport> = new Set(["running", "hiking"]);

/**
 * Allure ajustée à la pente, en s/km, point par point.
 *
 * Une montée coûte plus d'énergie par mètre (C(i) > C(0)) : à vitesse égale,
 * elle « vaut » une vitesse plus élevée sur le plat. Vitesse équivalente =
 * v × C(i)/C(0), donc GAP = allure × C(0)/C(i). L'ancienne version divisait
 * par le facteur : montées plus lentes, descentes plus rapides, l'inverse du
 * réel (−2,2 % à 6:30/km donnait 5:45 au lieu de 7:20).
 */
export function gapSeries(samples: Sample[], speed: number[], grade: number[], sport?: Sport): number[] {
  if (sport && !GAP_SPORTS.has(sport)) return speed.map(() => 0);
  return speed.map((v, i) => {
    if (v <= 0.3) return 0;
    const flat = v * gapFactor(grade[i]);
    return flat > 0.1 ? 1000 / flat : 0;
  });
}

/**
 * Facteur de coût moyen d'une portion, pondéré par la distance parcourue :
 * GAP de la portion = allure de la portion ÷ ce facteur.
 *
 * Diviser l'allure elle-même garde GAP et allure sur la même base de temps.
 * Deux pièges évités : moyenner les allures point par point surpondérait les
 * passages lents (une marche en côte à 30 min/km tirait la GAP d'une sortie
 * vallonnée 12 % au-dessus de l'allure), et exclure les arrêts d'un seul côté
 * faisait paraître plus rapide un kilomètre en descente qui comptait un feu.
 */
export function gapCostRatio(
  samples: Sample[],
  speed: number[],
  gap: number[],
  from = 1,
  to = samples.length - 1,
): number | undefined {
  let flat = 0;
  let real = 0;
  for (let i = Math.max(from, 1); i <= to; i++) {
    const g = gap[i];
    if (!(g > 0)) continue;
    const dt = Math.min(samples[i].t - samples[i - 1].t, MAX_GAP_S);
    if (dt <= 0) continue;
    real += speed[i] * dt;
    flat += (1000 / g) * dt;
  }
  return real > 0 ? flat / real : undefined;
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
