/**
 * Respect des blocs : la séance prescrite a-t-elle été exécutée ?
 *
 * La détection d'intervalles (analyze.ts) dit *ce qui a été fait*. Ce module
 * dit *si c'était bien fait*, ce qui est une question différente et bien plus
 * utile. Quatre axes :
 *
 *  1. **Régularité** — les répétitions sont-elles homogènes ? Mesurée par le
 *     coefficient de variation de l'allure entre répétitions.
 *  2. **Fade** — l'allure se dégrade-t-elle au fil de la série ? Régression
 *     linéaire de l'allure sur l'indice de répétition.
 *  3. **Récupération** — les temps de récup sont-ils tenus ? Une récup qui
 *     s'allonge est le premier signe qu'une séance part en vrille.
 *  4. **Coût cardiaque** — la FC monte-t-elle à allure constante ? C'est la
 *     signature de la fatigue accumulée, et elle apparaît avant la perte
 *     d'allure.
 *
 * Un point de méthode qui change tout : un fade de 2 % avec une FC stable et
 * un fade de 2 % avec une FC qui grimpe de 8 bpm ne racontent pas la même
 * histoire. On ne rend jamais un verdict sur l'allure seule.
 */

import { mean } from "./geo.ts";
import type { IntervalBlock, IntervalSet } from "./types.ts";

export interface BlockTarget {
  reps?: number;
  workM?: number;
  workS?: number;
  targetPaceSPerKm?: number;
  targetPwW?: number;
  restS?: number;
}

export interface RepReport {
  index: number;
  durS: number;
  distM: number;
  paceSPerKm?: number;
  pwAvgW?: number;
  hrAvg?: number;
  hrMax?: number;
  restAfterS?: number;
  /** Écart à la cible, en % (positif = plus lent que demandé). */
  deltaVsTargetPct?: number;
  /** Écart à la moyenne de la série, en %. */
  deltaVsSetPct?: number;
}

export interface AdherenceReport {
  setDescription: string;
  reps: RepReport[];
  target?: BlockTarget;
  /** Coefficient de variation de l'allure entre répétitions, en %. */
  paceCvPct?: number;
  /** Pente de dégradation, en % d'allure par répétition. */
  fadePctPerRep?: number;
  restCvPct?: number;
  restDriftS?: number;
  /** Montée de FC entre première et dernière répétition, à allure comparable. */
  hrRiseBpm?: number;
  repsCompleted: number;
  repsPlanned?: number;
  verdicts: string[];
  grade: "conforme" | "acceptable" | "dégradé" | "non évaluable";
}

function linearSlope(y: (number | undefined)[]): number | undefined {
  const pts = y
    .map((v, i) => ({ x: i, y: v }))
    .filter((p): p is { x: number; y: number } => p.y != null);
  if (pts.length < 3) return undefined;
  const mx = mean(pts.map((p) => p.x))!;
  const my = mean(pts.map((p) => p.y))!;
  let num = 0;
  let den = 0;
  for (const p of pts) {
    num += (p.x - mx) * (p.y - my);
    den += (p.x - mx) ** 2;
  }
  return den === 0 ? undefined : num / den;
}

function cv(values: (number | undefined)[]): number | undefined {
  const v = values.filter((x): x is number => x != null);
  if (v.length < 2) return undefined;
  const m = mean(v)!;
  if (m === 0) return undefined;
  const variance = mean(v.map((x) => (x - m) ** 2))!;
  return (Math.sqrt(variance) / m) * 100;
}

export function analyzeAdherence(
  blocks: IntervalBlock[],
  set: IntervalSet,
  target?: BlockTarget,
): AdherenceReport {
  const work = blocks.filter((b) => b.kind === "work");
  const rest = blocks.filter((b) => b.kind === "rest");

  if (work.length < 2) {
    return {
      setDescription: set.description,
      reps: [],
      repsCompleted: work.length,
      verdicts: ["Moins de deux répétitions identifiées : rien à comparer."],
      grade: "non évaluable",
    };
  }

  const setPace = mean(work.map((w) => w.paceSPerKm));

  const reps: RepReport[] = work.map((w, i) => {
    const nextRest = rest.find((r) => r.startT >= w.startT + w.durS - 2);
    const deltaTarget =
      target?.targetPaceSPerKm && w.paceSPerKm
        ? ((w.paceSPerKm - target.targetPaceSPerKm) / target.targetPaceSPerKm) * 100
        : undefined;
    const deltaSet =
      setPace && w.paceSPerKm ? ((w.paceSPerKm - setPace) / setPace) * 100 : undefined;

    return {
      index: i + 1,
      durS: w.durS,
      distM: w.distM,
      paceSPerKm: w.paceSPerKm,
      pwAvgW: w.pwAvg,
      hrAvg: w.hrAvg,
      hrMax: w.hrMax,
      restAfterS: nextRest?.durS,
      deltaVsTargetPct: deltaTarget,
      deltaVsSetPct: deltaSet,
    };
  });

  const paceCv = cv(reps.map((r) => r.paceSPerKm));
  const slope = linearSlope(reps.map((r) => r.paceSPerKm));
  const fadePctPerRep = slope != null && setPace ? (slope / setPace) * 100 : undefined;
  const restCv = cv(reps.map((r) => r.restAfterS).slice(0, -1));
  const restSlope = linearSlope(reps.map((r) => r.restAfterS).slice(0, -1));

  const firstHr = reps[0]?.hrAvg;
  const lastHr = reps[reps.length - 1]?.hrAvg;
  const hrRise = firstHr != null && lastHr != null ? lastHr - firstHr : undefined;

  const verdicts: string[] = [];
  let penalty = 0;

  if (paceCv != null) {
    if (paceCv < 1.5) verdicts.push(`Allure très régulière entre les répétitions (variation ${paceCv.toFixed(1)} %).`);
    else if (paceCv < 3) verdicts.push(`Régularité correcte (variation ${paceCv.toFixed(1)} %).`);
    else {
      verdicts.push(`Répétitions irrégulières (variation ${paceCv.toFixed(1)} %) : gestion d'allure à travailler, ou séance mal calibrée.`);
      penalty += paceCv > 5 ? 2 : 1;
    }
  }

  if (fadePctPerRep != null) {
    const totalFade = fadePctPerRep * (reps.length - 1);
    if (totalFade > 3) {
      verdicts.push(`Dégradation de ${totalFade.toFixed(1)} % entre la première et la dernière répétition : départ trop rapide, ou volume au-dessus du niveau actuel.`);
      penalty += totalFade > 6 ? 2 : 1;
    } else if (totalFade < -2) {
      verdicts.push(`Accélération progressive de ${Math.abs(totalFade).toFixed(1)} % : négative split sur la série, signe d'une marge disponible.`);
    } else {
      verdicts.push("Allure tenue du début à la fin de la série.");
    }
  }

  if (restSlope != null && Math.abs(restSlope) > 3) {
    if (restSlope > 0) {
      verdicts.push(`Récupérations qui s'allongent (+${restSlope.toFixed(0)} s par répétition) : la séance dérape en fin de série.`);
      penalty += 1;
    } else {
      verdicts.push(`Récupérations qui raccourcissent (${restSlope.toFixed(0)} s par répétition).`);
    }
  }

  // Le signal le plus fin : à allure tenue, une FC qui grimpe révèle une
  // fatigue qui n'a pas encore atteint les jambes.
  if (hrRise != null && Math.abs(hrRise) >= 3) {
    const stablePace = paceCv != null && paceCv < 3;
    if (hrRise > 0 && stablePace) {
      verdicts.push(`Allure tenue mais FC en hausse de ${hrRise.toFixed(0)} bpm sur la série : coût cardiaque croissant à effort égal, signature de la fatigue accumulée.`);
      if (hrRise > 8) penalty += 1;
    } else if (hrRise > 0) {
      verdicts.push(`FC en hausse de ${hrRise.toFixed(0)} bpm sur la série.`);
    }
  }

  if (target?.reps && work.length < target.reps) {
    verdicts.push(`${work.length} répétitions réalisées sur les ${target.reps} prévues.`);
    penalty += 2;
  }

  if (target?.targetPaceSPerKm) {
    const avgDelta = mean(reps.map((r) => r.deltaVsTargetPct));
    if (avgDelta != null) {
      if (Math.abs(avgDelta) < 1.5) verdicts.push("Allure cible respectée.");
      else if (avgDelta > 0) {
        verdicts.push(`Série courue ${avgDelta.toFixed(1)} % plus lentement que la cible.`);
        penalty += avgDelta > 4 ? 2 : 1;
      } else {
        verdicts.push(`Série courue ${Math.abs(avgDelta).toFixed(1)} % plus vite que la cible : le bénéfice d'une séance à intervalles vient du respect de l'allure, pas du dépassement.`);
        penalty += Math.abs(avgDelta) > 4 ? 1 : 0;
      }
    }
  }

  const grade: AdherenceReport["grade"] =
    penalty === 0 ? "conforme" : penalty <= 2 ? "acceptable" : "dégradé";

  return {
    setDescription: set.description,
    reps,
    target,
    paceCvPct: paceCv,
    fadePctPerRep,
    restCvPct: restCv,
    restDriftS: restSlope,
    hrRiseBpm: hrRise,
    repsCompleted: work.length,
    repsPlanned: target?.reps,
    verdicts,
    grade,
  };
}

/**
 * Devine une cible à partir de la série détectée, quand l'athlète n'en fournit
 * pas. On arrondit l'allure moyenne au multiple de 5 s/km le plus proche :
 * une séance prescrite l'est presque toujours sur un chiffre rond.
 */
export function inferTarget(set: IntervalSet, blocks: IntervalBlock[]): BlockTarget {
  const work = blocks.filter((b) => b.kind === "work");
  const paces = work.map((w) => w.paceSPerKm).filter((v): v is number => v != null);
  const median = paces.length
    ? [...paces].sort((a, b) => a - b)[Math.floor(paces.length / 2)]
    : undefined;

  return {
    reps: set.reps,
    workM: set.targetM,
    workS: set.targetS,
    targetPaceSPerKm: median != null ? Math.round(median / 5) * 5 : undefined,
    restS: set.avgRestDurS,
  };
}
