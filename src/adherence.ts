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
import { t, translator } from "./i18n.ts";
import type { IntervalBlock, IntervalSet, Sample, Sport } from "./types.ts";

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
  /** FC à la fin de la répétition, avant récupération. */
  hrEndBpm?: number;
  /** Chute de FC dans les 60 s suivant la répétition. Marqueur parasympathique. */
  hrr60Bpm?: number;
  /** Idem à 120 s. */
  hrr120Bpm?: number;
  /** Écart à la cible, en % (positif = plus lent que demandé). */
  deltaVsTargetPct?: number;
  /** Écart à la moyenne de la série, en %. */
  deltaVsSetPct?: number;
}

export interface AdherenceReport {
  setDescription: string;
  reps: RepReport[];
  target?: BlockTarget;
  /** Grandeur sur laquelle la régularité est jugée : allure ou puissance. */
  basis?: "pace" | "power";
  /** Coefficient de variation entre répétitions, en %. */
  paceCvPct?: number;
  /** Pente de dégradation, en % d'allure par répétition. */
  fadePctPerRep?: number;
  restCvPct?: number;
  restDriftS?: number;
  /** Montée de FC entre première et dernière répétition, à allure comparable. */
  hrRiseBpm?: number;
  /** Moyenne des chutes de FC à 60 s sur la série. */
  hrr60AvgBpm?: number;
  /** Érosion de la récupération : bpm perdus par répétition. Positif = dégradation. */
  hrr60DeclinePerRep?: number;
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

/**
 * FC à un instant donné, par recherche dichotomique sur la trace.
 * Renvoie undefined si l'instant tombe dans un trou d'enregistrement.
 */
function hrAt(samples: Sample[], t: number): number | undefined {
  if (!samples.length) return undefined;
  let lo = 0;
  let hi = samples.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (samples[mid].t < t) lo = mid + 1;
    else hi = mid;
  }
  // Tolérance de 5 s : au-delà, on extrapolerait sur un trou.
  return Math.abs(samples[lo].t - t) <= 5 ? samples[lo].hr : undefined;
}

/**
 * Récupération cardiaque après chaque répétition.
 *
 * La vitesse à laquelle la FC redescend après un effort est un des meilleurs
 * marqueurs du tonus parasympathique disponibles sans matériel de laboratoire.
 * Plus révélateur encore : son **érosion au fil de la série**. Une récupération
 * qui passe de 40 à 25 bpm entre la première et la dernière répétition indique
 * une fatigue accumulée que l'allure, elle, ne montre pas encore.
 */
function recoveryFor(
  samples: Sample[],
  block: IntervalBlock,
): { hrEnd?: number; hrr60?: number; hrr120?: number } {
  const endT = block.startT + block.durS;
  // La FC culmine quelques secondes APRÈS l'arrêt de l'effort : la prendre
  // pile à la fin sous-estimerait systématiquement la récupération.
  const peak = [0, 3, 6, 9, 12]
    .map((d) => hrAt(samples, endT + d))
    .filter((v): v is number => v != null);
  if (!peak.length) return {};
  const hrEnd = Math.max(...peak);

  const at60 = hrAt(samples, endT + 60);
  const at120 = hrAt(samples, endT + 120);

  // Borne de plausibilité. Une chute de plus de 60 bpm en une minute n'existe
  // pas chez l'humain à l'effort : c'est un décrochage de capteur. La rapporter
  // comme une récupération exceptionnelle serait pire que ne rien dire.
  const plausible = (v: number | undefined, max: number) =>
    v != null && v >= -10 && v <= max ? v : undefined;

  return {
    hrEnd,
    hrr60: plausible(at60 != null ? hrEnd - at60 : undefined, 60),
    hrr120: plausible(at120 != null ? hrEnd - at120 : undefined, 80),
  };
}

export function analyzeAdherence(
  blocks: IntervalBlock[],
  set: IntervalSet,
  target?: BlockTarget,
  samples: Sample[] = [],
  sport: Sport = "running",
  locale?: string,
): AdherenceReport {
  const tr = translator(locale);
  const work = blocks.filter((b) => b.kind === "work");
  const rest = blocks.filter((b) => b.kind === "rest");

  if (work.length < 2) {
    return {
      setDescription: set.description,
      reps: [],
      repsCompleted: work.length,
      verdicts: [tr("adh.tooFew")],
      grade: "non évaluable",
    };
  }

  // À vélo, l'allure ne mesure rien : sur home trainer la distance est
  // virtuelle et le relief simulé fait varier la vitesse de 30 % à watts
  // rigoureusement constants. Juger la régularité là-dessus condamnait une
  // séance ERG parfaitement exécutée comme « dégradée ». C'est la puissance
  // qui définit l'effort, donc c'est elle qu'on mesure.
  const hasPower = work.some((w) => w.pwAvg != null);
  const basis: "pace" | "power" = sport === "cycling" && hasPower ? "power" : "pace";
  const metric = (w: IntervalBlock) => (basis === "power" ? w.pwAvg : w.paceSPerKm);
  /** Vrai quand une valeur plus BASSE est meilleure (allure) plutôt que plus haute. */
  const lowerIsBetter = basis === "pace";

  const setRef = mean(work.map(metric));
  const setPace = setRef;

  const reps: RepReport[] = work.map((w, i) => {
    const nextRest = rest.find((r) => r.startT >= w.startT + w.durS - 2);
    const rec = samples.length ? recoveryFor(samples, w) : {};
    const targetRef = basis === "power" ? target?.targetPwW : target?.targetPaceSPerKm;
    const value = metric(w);
    const deltaTarget =
      targetRef && value ? ((value - targetRef) / targetRef) * 100 : undefined;
    const deltaSet = setRef && value ? ((value - setRef) / setRef) * 100 : undefined;

    return {
      index: i + 1,
      durS: w.durS,
      distM: w.distM,
      paceSPerKm: w.paceSPerKm,
      pwAvgW: w.pwAvg,
      hrAvg: w.hrAvg,
      hrMax: w.hrMax,
      restAfterS: nextRest?.durS,
      hrEndBpm: rec.hrEnd,
      hrr60Bpm: rec.hrr60,
      hrr120Bpm: rec.hrr120,
      deltaVsTargetPct: deltaTarget,
      deltaVsSetPct: deltaSet,
    };
  });

  const series = work.map(metric);
  const paceCv = cv(series);
  const slope = linearSlope(series);
  const fadePctPerRep = slope != null && setPace ? (slope / setPace) * 100 : undefined;
  const restCv = cv(reps.map((r) => r.restAfterS).slice(0, -1));
  const restSlope = linearSlope(reps.map((r) => r.restAfterS).slice(0, -1));

  const hrr60Values = reps.map((r) => r.hrr60Bpm);
  const hrr60Avg = mean(hrr60Values);
  const hrr60Slope = linearSlope(hrr60Values);
  const hrr60Decline = hrr60Slope != null ? -hrr60Slope : undefined;

  const firstHr = reps[0]?.hrAvg;
  const lastHr = reps[reps.length - 1]?.hrAvg;
  const hrRise = firstHr != null && lastHr != null ? lastHr - firstHr : undefined;

  const verdicts: string[] = [];
  let penalty = 0;

  if (paceCv != null) {
    const cv = paceCv.toFixed(1);
    if (paceCv < 1.5) verdicts.push(tr(basis === "power" ? "adh.veryRegular.power" : "adh.veryRegular.pace", { cv }));
    else if (paceCv < 3) verdicts.push(tr("adh.regularOk", { cv }));
    else {
      verdicts.push(tr(basis === "power" ? "adh.irregular.power" : "adh.irregular.pace", { cv }));
      penalty += paceCv > 5 ? 2 : 1;
    }
  }

  if (fadePctPerRep != null) {
    // Une allure qui augmente est une dégradation ; une puissance qui augmente
    // est l'inverse. On ramène donc la pente dans le sens « + = moins bien ».
    const totalFade = fadePctPerRep * (reps.length - 1) * (lowerIsBetter ? 1 : -1);
    if (totalFade > 3) {
      verdicts.push(tr(basis === "power" ? "adh.fade.power" : "adh.fade.pace", { pct: totalFade.toFixed(1) }));
      penalty += totalFade > 6 ? 2 : 1;
    } else if (totalFade < -2) {
      verdicts.push(tr("adh.build", { pct: Math.abs(totalFade).toFixed(1) }));
    } else {
      verdicts.push(tr(basis === "power" ? "adh.held.power" : "adh.held.pace"));
    }
  }

  if (restSlope != null && Math.abs(restSlope) > 3) {
    if (restSlope > 0) {
      verdicts.push(tr("adh.restLonger", { s: restSlope.toFixed(0) }));
      penalty += 1;
    } else {
      verdicts.push(tr("adh.restShorter", { s: restSlope.toFixed(0) }));
    }
  }

  // Le signal le plus fin : à allure tenue, une FC qui grimpe révèle une
  // fatigue qui n'a pas encore atteint les jambes.
  if (hrRise != null && Math.abs(hrRise) >= 3) {
    const stablePace = paceCv != null && paceCv < 3;
    if (hrRise > 0 && stablePace) {
      verdicts.push(tr(basis === "power" ? "adh.hrRiseStable.power" : "adh.hrRiseStable", { bpm: hrRise.toFixed(0) }));
      if (hrRise > 8) penalty += 1;
    } else if (hrRise > 0) {
      verdicts.push(tr("adh.hrRise", { bpm: hrRise.toFixed(0) }));
    }
  }

  // Signal le plus fin de la série : la récupération se dégrade avant l'allure.
  if (hrr60Avg != null) {
    if (hrr60Avg >= 35) {
      verdicts.push(tr("adh.hrrGood", { bpm: hrr60Avg.toFixed(0) }));
    } else if (hrr60Avg >= 22) {
      verdicts.push(tr("adh.hrrOk", { bpm: hrr60Avg.toFixed(0) }));
    } else if (hrr60Avg > 0) {
      verdicts.push(tr("adh.hrrSlow", { bpm: hrr60Avg.toFixed(0) }));
      penalty += 1;
    }
    if (hrr60Decline != null && hrr60Decline >= 3 && reps.length >= 4) {
      verdicts.push(tr("adh.hrrErode", { bpm: hrr60Decline.toFixed(0) }));
      penalty += 1;
    }
  }

  if (target?.reps && work.length < target.reps) {
    verdicts.push(tr("adh.missingReps", { done: work.length, planned: target.reps }));
    penalty += 2;
  }

  const hasTarget = basis === "power" ? target?.targetPwW != null : target?.targetPaceSPerKm != null;
  if (hasTarget) {
    const avgDelta = mean(reps.map((r) => r.deltaVsTargetPct));
    if (avgDelta != null) {
      const off = lowerIsBetter ? avgDelta : -avgDelta;
      if (Math.abs(off) < 1.5) verdicts.push(tr(basis === "power" ? "adh.targetMet.power" : "adh.targetMet.pace"));
      else if (off > 0) {
        verdicts.push(tr("adh.belowTarget", { pct: off.toFixed(1) }));
        penalty += off > 4 ? 2 : 1;
      } else {
        verdicts.push(tr("adh.aboveTarget", { pct: Math.abs(off).toFixed(1) }));
        penalty += Math.abs(off) > 4 ? 1 : 0;
      }
    }
  }

  const grade: AdherenceReport["grade"] =
    penalty === 0 ? "conforme" : penalty <= 2 ? "acceptable" : "dégradé";

  return {
    setDescription: set.description,
    reps,
    target,
    basis,
    paceCvPct: paceCv,
    fadePctPerRep,
    restCvPct: restCv,
    restDriftS: restSlope,
    hrRiseBpm: hrRise,
    hrr60AvgBpm: hrr60Avg,
    hrr60DeclinePerRep: hrr60Decline,
    repsCompleted: work.length,
    repsPlanned: target?.reps,
    verdicts,
    grade,
  };
}

/**
 * Libellé affichable d'une note. La note elle-même reste un identifiant stable
 * (la page et les scripts la comparent) ; seul son affichage suit la langue.
 */
export function gradeLabel(grade: AdherenceReport["grade"], locale?: string): string {
  return t(locale, `adh.grade.${grade}` as const);
}

/**
 * Devine une cible à partir de la série détectée, quand l'athlète n'en fournit
 * pas. On arrondit l'allure moyenne au multiple de 5 s/km le plus proche :
 * une séance prescrite l'est presque toujours sur un chiffre rond.
 */
export function inferTarget(
  set: IntervalSet,
  blocks: IntervalBlock[],
  sport: Sport = "running",
): BlockTarget {
  const work = blocks.filter((b) => b.kind === "work");
  const med = (xs: number[]) =>
    xs.length ? [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)] : undefined;

  const powers = work.map((w) => w.pwAvg).filter((v): v is number => v != null);
  if (sport === "cycling" && powers.length) {
    const p = med(powers)!;
    // Une consigne de puissance se donne sur un chiffre rond, à 5 W près.
    return { reps: set.reps, workS: set.targetS, targetPwW: Math.round(p / 5) * 5, restS: set.avgRestDurS };
  }

  const paces = med(work.map((w) => w.paceSPerKm).filter((v): v is number => v != null));
  return {
    reps: set.reps,
    workM: set.targetM,
    workS: set.targetS,
    targetPaceSPerKm: paces != null ? Math.round(paces / 5) * 5 : undefined,
    restS: set.avgRestDurS,
  };
}
