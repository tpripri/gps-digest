/**
 * Meilleurs efforts, modèle de vitesse critique et projections de chrono.
 *
 * C'est ici que l'analyse multi-fichiers prend tout son sens. Extrapoler un
 * marathon depuis une seule séance est fragile ; ajuster une courbe
 * durée–vitesse sur les meilleurs efforts de vingt séances est nettement plus
 * robuste, parce que chaque durée est renseignée par la séance qui l'exploitait
 * le mieux.
 *
 * Deux modèles, volontairement, parce qu'ils échouent différemment :
 *
 *  - **Riegel** : T₂ = T₁ · (D₂/D₁)^k, k ≈ 1,06. Simple, calibré sur des
 *    résultats de course réels, correct de 5 km à marathon. Il suppose une
 *    endurance « moyenne » que l'athlète n'a pas forcément.
 *
 *  - **Vitesse critique** (modèle à 2 paramètres) : d = CS·t + D'. Fondé
 *    physiologiquement, ajusté sur des efforts de 2 à 20 min. Excellent
 *    jusqu'au 10 km, **optimiste au-delà** : il ignore l'épuisement du
 *    glycogène et la casse musculaire, qui gouvernent le marathon.
 *
 * Quand les deux divergent, l'écart est l'information : il mesure l'incertitude.
 */

import type { Sample } from "./types.ts";

export interface BestEffort {
  distanceM: number;
  timeS: number;
  paceSPerKm: number;
  speedMS: number;
  startS: number;
  /** Renseigné en analyse multi-fichiers. */
  sourceFile?: string;
  sourceDate?: string;
}

export const STANDARD_DISTANCES = [
  400, 800, 1000, 1609.344, 3000, 5000, 10000, 15000, 21097.5, 42195,
] as const;

export const RACE_LABELS: Record<number, string> = {
  400: "400 m",
  800: "800 m",
  1000: "1 000 m",
  1609.344: "1 mile",
  3000: "3 000 m",
  5000: "5 km",
  10000: "10 km",
  15000: "15 km",
  20000: "20 km",
  21097.5: "semi-marathon",
  42195: "marathon",
};

/**
 * Fenêtre glissante sur la distance : cherche, pour chaque distance cible, la
 * fenêtre la plus rapide de la trace. Deux pointeurs, coût linéaire.
 *
 * On interpole aux deux bornes, sinon un échantillonnage à 1 Hz introduit une
 * erreur systématique de plusieurs secondes sur un 400 m.
 */
export function bestEfforts(
  samples: Sample[],
  distances: readonly number[] = STANDARD_DISTANCES,
): BestEffort[] {
  const out: BestEffort[] = [];
  const n = samples.length;
  if (n < 10) return out;

  const total = samples[n - 1].dist ?? 0;

  for (const target of distances) {
    if (total < target) continue;

    let bestTime = Infinity;
    let bestStart = 0;
    let lo = 0;

    for (let hi = 1; hi < n; hi++) {
      const dHi = samples[hi].dist ?? 0;
      while (lo < hi && dHi - (samples[lo].dist ?? 0) >= target) lo++;
      if (lo === 0) continue;

      // Interpolation sur le segment [lo-1, lo] pour atteindre exactement
      // `target` mètres en arrière depuis hi.
      const a = samples[lo - 1];
      const b = samples[lo];
      const dA = a.dist ?? 0;
      const dB = b.dist ?? 0;
      const wanted = dHi - target;
      const span = dB - dA;
      const frac = span > 0 ? (wanted - dA) / span : 0;
      const tStart = a.t + frac * (b.t - a.t);
      const time = samples[hi].t - tStart;

      if (time > 0 && time < bestTime) {
        bestTime = time;
        bestStart = tStart;
      }
    }

    if (Number.isFinite(bestTime)) {
      out.push({
        distanceM: target,
        timeS: bestTime,
        paceSPerKm: (bestTime / target) * 1000,
        speedMS: target / bestTime,
        startS: bestStart,
      });
    }
  }
  return out;
}

// ------------------------------------------------------- vitesse critique

export interface CriticalSpeedModel {
  /** Vitesse critique, m/s : allure théoriquement soutenable en régime stable. */
  csMS: number;
  /** D', réserve de distance au-dessus de CS, en mètres. */
  dPrimeM: number;
  /** Qualité de l'ajustement. En dessous de 0,95, le modèle est peu fiable. */
  r2: number;
  usedEfforts: BestEffort[];
  csPaceSPerKm: number;
}

/**
 * Ajuste d = CS·t + D' par moindres carrés.
 *
 * Ne conserve que les efforts de 2 à 20 min : c'est le domaine de validité du
 * modèle. En dessous de 2 min la contribution anaérobie domine, au-dessus de
 * 20 min la fatigue lente invalide l'hypothèse d'une asymptote.
 */
export function fitCriticalSpeed(efforts: BestEffort[]): CriticalSpeedModel | null {
  const usable = efforts.filter((e) => e.timeS >= 120 && e.timeS <= 1200);
  if (usable.length < 3) return null;

  const t = usable.map((e) => e.timeS);
  const d = usable.map((e) => e.distanceM);
  const n = t.length;
  const mt = t.reduce((a, b) => a + b, 0) / n;
  const md = d.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (t[i] - mt) * (d[i] - md);
    den += (t[i] - mt) ** 2;
  }
  if (den === 0) return null;

  const cs = num / den;
  const dPrime = md - cs * mt;
  if (cs <= 0.5 || dPrime < 0) return null;

  let ssRes = 0;
  let ssTot = 0;
  for (let i = 0; i < n; i++) {
    ssRes += (d[i] - (cs * t[i] + dPrime)) ** 2;
    ssTot += (d[i] - md) ** 2;
  }

  return {
    csMS: cs,
    dPrimeM: dPrime,
    r2: ssTot > 0 ? 1 - ssRes / ssTot : 0,
    usedEfforts: usable,
    csPaceSPerKm: 1000 / cs,
  };
}

// ------------------------------------------------------------ projections

export interface RaceProjection {
  distanceM: number;
  label: string;
  /** Estimation retenue, en secondes. */
  timeS: number;
  /** Fourchette basse et haute : l'incertitude fait partie du résultat. */
  lowS: number;
  highS: number;
  paceSPerKm: number;
  method: string;
  confidence: "haute" | "moyenne" | "faible";
  caveat?: string;
}

/** Riegel. k = 1,06 par défaut ; plus bas pour un athlète à gros volume. */
export function riegel(refDistM: number, refTimeS: number, targetM: number, k = 1.06): number {
  return refTimeS * (targetM / refDistM) ** k;
}

/**
 * Calibre l'exposant de Riegel sur deux performances réelles de l'athlète.
 * Bien plus fiable que la constante universelle : k traduit l'endurance
 * individuelle, qui varie typiquement de 1,03 (très endurant) à 1,10.
 */
export function calibrateRiegelExponent(
  a: { distanceM: number; timeS: number },
  b: { distanceM: number; timeS: number },
): number | null {
  if (a.distanceM <= 0 || b.distanceM <= 0 || a.distanceM === b.distanceM) return null;
  const k = Math.log(b.timeS / a.timeS) / Math.log(b.distanceM / a.distanceM);
  return k >= 1.0 && k <= 1.2 ? k : null;
}

export interface ProjectionInput {
  efforts: BestEffort[];
  cs?: CriticalSpeedModel | null;
  /** Résultats de course réels : la meilleure calibration disponible, de loin. */
  raceResults?: { distanceM: number; timeS: number; date?: string }[];
  riegelExponent?: number;
  targets?: readonly number[];
  /** Date de référence pour pondérer l'ancienneté des chronos. */
  today?: Date;
}

function monthsSince(date: string | undefined, today = new Date()): number | undefined {
  if (!date) return undefined;
  const ms = Date.parse(date);
  if (!Number.isFinite(ms)) return undefined;
  return Math.max(0, (today.getTime() - ms) / (1000 * 60 * 60 * 24 * 30.44));
}

/**
 * Pondération de l'ancienneté d'un chrono.
 *
 * Un résultat de course reste la meilleure calibration disponible, mais il
 * décrit la forme du jour de la course, pas celle d'aujourd'hui. Passé un an,
 * il informe encore le potentiel de l'athlète sans plus décrire son niveau
 * actuel : on lui laisse un poids résiduel plutôt que de l'écarter.
 */
function recencyFactor(ageMonths: number | undefined): number {
  if (ageMonths == null) return 1;
  if (ageMonths <= 3) return 1;
  if (ageMonths <= 6) return 0.85;
  if (ageMonths <= 12) return 0.6;
  if (ageMonths <= 24) return 0.4;
  return 0.25;
}

/**
 * Facteur de correction marathon appliqué au modèle CS.
 *
 * Le modèle à 2 paramètres suppose que CS est tenable indéfiniment. Ce n'est
 * pas vrai : au-delà de ~90 min, la déplétion glycogénique et la dégradation
 * mécanique imposent une décote. Ces valeurs sont des ordres de grandeur usuels
 * pour un coureur amateur entraîné, pas une loi physique.
 */
function enduranceFactor(distanceM: number): number {
  if (distanceM <= 10000) return 1.0;
  if (distanceM <= 21097.5) return 0.97;
  if (distanceM <= 30000) return 0.94;
  return 0.91;
}

export function projectRaces(input: ProjectionInput): RaceProjection[] {
  const targets = input.targets ?? [5000, 10000, 21097.5, 42195];
  const out: RaceProjection[] = [];

  // Meilleure référence disponible, par ordre de qualité décroissant :
  // un résultat de course > un effort long en entraînement > un effort court.
  const races = [...(input.raceResults ?? [])].sort((a, b) => b.distanceM - a.distanceM);
  const longEffort = [...input.efforts]
    .filter((e) => e.timeS >= 600)
    .sort((a, b) => b.distanceM - a.distanceM)[0];

  let k = input.riegelExponent ?? 1.06;
  if (!input.riegelExponent && races.length >= 2) {
    const calibrated = calibrateRiegelExponent(races[races.length - 1], races[0]);
    if (calibrated) k = calibrated;
  }

  for (const target of targets) {
    const estimates: { value: number; method: string; weight: number }[] = [];

    if (races.length) {
      // On prend la course dont la distance est la plus proche de la cible :
      // moins on extrapole, moins on se trompe.
      const ref = races.reduce((best, r) =>
        Math.abs(Math.log(r.distanceM / target)) < Math.abs(Math.log(best.distanceM / target))
          ? r
          : best,
      );
      const ageMonths = monthsSince(ref.date, input.today);
      const weight = 3 * recencyFactor(ageMonths);
      estimates.push({
        value: riegel(ref.distanceM, ref.timeS, target, k),
        method:
          `Riegel depuis ${RACE_LABELS[ref.distanceM] ?? `${Math.round(ref.distanceM / 1000)} km`} en course (k=${k.toFixed(3)})` +
          (ageMonths != null ? `, chrono vieux de ${Math.round(ageMonths)} mois` : ""),
        weight,
      });
    }

    if (longEffort) {
      estimates.push({
        value: riegel(longEffort.distanceM, longEffort.timeS, target, k),
        method: `Riegel depuis un effort de ${RACE_LABELS[longEffort.distanceM] ?? `${Math.round(longEffort.distanceM)} m`} à l'entraînement`,
        weight: 1.5,
      });
    }

    if (input.cs && input.cs.r2 > 0.95) {
      const raw = target / input.cs.csMS;
      estimates.push({
        value: raw / enduranceFactor(target),
        method: `Vitesse critique (CS ${(1000 / input.cs.csMS / 60).toFixed(2)} min/km, R²=${input.cs.r2.toFixed(3)})`,
        weight: target <= 10000 ? 2 : 1,
      });
    }

    if (!estimates.length) continue;

    const totalWeight = estimates.reduce((s, e) => s + e.weight, 0);
    const blended = estimates.reduce((s, e) => s + e.value * e.weight, 0) / totalWeight;
    const values = estimates.map((e) => e.value);
    const spread = Math.max(...values) - Math.min(...values);

    // L'incertitude est le maximum entre la dispersion des modèles et une
    // incertitude plancher qui croît avec l'extrapolation.
    const floorPct = target >= 42195 ? 0.06 : target >= 21097.5 ? 0.04 : 0.03;
    const margin = Math.max(spread / 2, blended * floorPct);

    // Un chrono de plus d'un an ne justifie plus une confiance « haute ».
    const freshRace = races.some((r) => (monthsSince(r.date, input.today) ?? 99) <= 12);
    const confidence: RaceProjection["confidence"] =
      freshRace && target <= 21097.5
        ? "haute"
        : races.length || target <= 10000
          ? "moyenne"
          : "faible";

    out.push({
      distanceM: target,
      label: RACE_LABELS[target] ?? `${(target / 1000).toFixed(1)} km`,
      timeS: blended,
      lowS: blended - margin,
      highS: blended + margin,
      paceSPerKm: (blended / target) * 1000,
      method: estimates.sort((a, b) => b.weight - a.weight)[0].method,
      confidence,
      caveat:
        target >= 42195
          ? "Une projection marathon depuis des données d'entraînement suppose une préparation spécifique menée à son terme : sorties longues, allure spécifique, stratégie nutritionnelle. C'est la projection la moins fiable de toutes."
          : target >= 21097.5
            ? "Suppose une préparation spécifique et une allure tenue régulièrement."
            : undefined,
    });
  }

  return out;
}

export function formatDuration(s: number): string {
  const total = Math.round(s);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  return h > 0
    ? `${h}h${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
    : `${m}:${String(sec).padStart(2, "0")}`;
}
