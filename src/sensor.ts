/**
 * Détection de la source de fréquence cardiaque : ceinture ou capteur optique.
 *
 * Pourquoi c'est la première analyse à faire, avant toutes les autres :
 * la dérive cardiaque, les zones et les projections reposent toutes sur la FC.
 * Si la moitié des fichiers vient d'un poignet et l'autre d'une ceinture, la
 * comparaison est faussée — et rien dans le fichier ne le dit explicitement,
 * sauf en FIT.
 *
 * Trois familles de signaux distinguent les deux capteurs :
 *
 * 1. **Verrouillage sur la cadence** — l'artefact optique par excellence. Le
 *    capteur poignet confond le rythme des foulées avec les pulsations et
 *    affiche une FC égale à la cadence, ou à sa moitié. Sur une sortie à
 *    172 pas/min, la montre affiche 172 bpm au lieu de 140. Une ceinture ne
 *    peut pas produire cet artefact : elle mesure un signal électrique.
 *
 * 2. **Plateaux** — l'algorithme optique lisse fortement et sort de longues
 *    séquences de valeurs identiques. Une ceinture ECG varie battement après
 *    battement.
 *
 * 3. **Latence** — l'optique accuse 10 à 30 s de retard sur une accélération
 *    franche. La ceinture répond en quelques secondes.
 *
 * En FIT, `device_info` donne parfois la vérité terrain. On la privilégie
 * toujours ; l'heuristique ne sert que pour le TCX, le GPX et les FIT muets.
 *
 * ── Limite à connaître ──────────────────────────────────────────────────
 * Les seuils ci-dessous ont été calibrés sur des fichiers réels d'un seul
 * athlète et d'un seul modèle de montre. Ils sont donc *calibrés*, pas
 * *validés* : la dynamique cardiaque varie d'une personne à l'autre, et
 * l'algorithme de lissage varie d'un constructeur à l'autre. D'où la confiance
 * plafonnée à 0,90 en l'absence de métadonnée constructeur.
 */

import { smoothByTime, mean } from "./geo.ts";
import { translator, t } from "./i18n.ts";
import type { Sample, Sport } from "./types.ts";

export type HrSource = "chest_strap" | "optical" | "unknown";

export interface HrSignal {
  name: string;
  value: number;
  unit: string;
  points: "chest_strap" | "optical" | "neutral";
  note: string;
}

export interface HrSourceAnalysis {
  verdict: HrSource;
  /** 0 à 1. Au-dessous de 0,6, l'outil doit dire « probable », pas « détecté ». */
  confidence: number;
  fromDeviceMetadata: boolean;
  signals: HrSignal[];
  /** Fraction du temps où la FC est suspectée verrouillée sur la cadence. */
  cadenceLockPct: number;
  /** Segments à écarter avant tout calcul de dérive ou de zones. */
  suspectRanges: { fromS: number; toS: number; reason: string }[];
}

/**
 * Statistiques de variation de la FC seconde à seconde.
 *
 * Piège découvert sur des fichiers réels : la **médiane** de ces variations
 * vaut zéro pour tous les capteurs. À 1 Hz, une FC entière change rarement
 * d'une seconde à l'autre — 55 à 70 % des intervalles sont identiques selon le
 * capteur, donc la médiane est écrasée à 0 dans les deux cas et ne discrimine
 * rien. C'est la **moyenne** qui sépare : mesurée sur un même athlète, environ
 * 0,31 bpm/s au poignet contre 0,51 à la ceinture.
 */
function stepStatistics(samples: Sample[]): {
  meanAbsStep: number;
  zeroStepPct: number;
  plateauTimePct: number;
} {
  let sum = 0;
  let zero = 0;
  let total = 0;
  for (let i = 1; i < samples.length; i++) {
    const a = samples[i - 1].hr;
    const b = samples[i].hr;
    const dt = samples[i].t - samples[i - 1].t;
    if (a == null || b == null || dt <= 0 || dt > 3) continue;
    const perSecond = Math.abs(b - a) / dt;
    sum += perSecond;
    if (perSecond < 1e-9) zero++;
    total++;
  }

  // Part du temps passée dans un palier de plus de 5 s. Le lissage optique en
  // produit deux fois plus que la mesure électrique.
  let inPlateau = 0;
  let run = 1;
  let counted = 0;
  for (let i = 1; i < samples.length; i++) {
    if (samples[i].hr == null) continue;
    counted++;
    if (samples[i].hr === samples[i - 1].hr) run++;
    else {
      if (run > 5) inPlateau += run;
      run = 1;
    }
  }
  if (run > 5) inPlateau += run;

  return {
    meanAbsStep: total ? sum / total : 0,
    zeroStepPct: total ? (zero / total) * 100 : 0,
    plateauTimePct: counted ? (inPlateau / counted) * 100 : 0,
  };
}

/** Plus longue séquence de FC strictement constante, en secondes. */
function longestPlateauS(samples: Sample[]): number {
  let best = 0;
  let startT = 0;
  let current: number | undefined;
  for (const s of samples) {
    if (s.hr == null) continue;
    if (s.hr !== current) {
      current = s.hr;
      startT = s.t;
    } else {
      best = Math.max(best, s.t - startT);
    }
  }
  return best;
}

/**
 * Détecte le verrouillage sur la cadence. On ne teste que les points où
 * l'athlète court réellement : à l'arrêt, FC et cadence sont toutes deux
 * basses et se ressemblent sans que ce soit un artefact.
 */
function cadenceLock(
  samples: Sample[],
  speed: number[],
  reason: string,
): { pct: number; ranges: { fromS: number; toS: number; reason: string }[] } {
  let locked = 0;
  let eligible = 0;
  const hits: number[] = [];

  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    if (s.hr == null || s.cad == null || s.cad < 140 || speed[i] < 1.5) continue;
    eligible++;
    // Verrouillage direct (FC ≈ cadence) ou harmonique (FC ≈ cadence / 2).
    const direct = Math.abs(s.hr - s.cad) <= 4;
    const half = Math.abs(s.hr - s.cad / 2) <= 3;
    if (direct || half) {
      locked++;
      hits.push(s.t);
    }
  }

  // Un verrouillage réel n'est jamais parfaitement continu : l'algorithme de la
  // montre décroche et raccroche en permanence. Chercher des plages strictement
  // contiguës ne trouve donc rien. On agglomère les occurrences séparées de
  // moins de 15 s, puis on ne garde que les agrégats d'au moins 20 s contenant
  // assez d'occurrences pour ne pas être une coïncidence.
  const GAP_S = 15;
  const ranges: { fromS: number; toS: number; reason: string }[] = [];
  let from: number | null = null;
  let last = 0;
  let count = 0;

  const flush = () => {
    if (from != null && last - from >= 20 && count >= 8) {
      ranges.push({ fromS: from, toS: last, reason });
    }
    from = null;
    count = 0;
  };

  for (const t of hits) {
    if (from == null) {
      from = t;
      count = 1;
    } else if (t - last <= GAP_S) {
      count++;
    } else {
      flush();
      from = t;
      count = 1;
    }
    last = t;
  }
  flush();

  return { pct: eligible > 20 ? (locked / eligible) * 100 : 0, ranges };
}

/**
 * Latence de réponse par corrélation croisée entre variation de vitesse et
 * variation de FC. On cherche le décalage qui maximise la corrélation.
 */
function responseLagS(samples: Sample[], speed: number[]): number | undefined {
  const hr = smoothByTime(samples, (s) => s.hr, 5);
  const n = samples.length;
  if (n < 120) return undefined;

  // Dérivées : c'est la réaction aux changements qui porte l'information.
  const dHr: number[] = [];
  const dV: number[] = [];
  for (let i = 5; i < n; i++) {
    const a = hr[i];
    const b = hr[i - 5];
    if (a == null || b == null) {
      dHr.push(0);
      dV.push(0);
    } else {
      dHr.push(a - b);
      dV.push(speed[i] - speed[i - 5]);
    }
  }
  if (dV.every((v) => Math.abs(v) < 0.05)) return undefined;

  const corr = (lag: number): number => {
    let num = 0;
    let da = 0;
    let db = 0;
    for (let i = 0; i + lag < dV.length; i++) {
      num += dV[i] * dHr[i + lag];
      da += dV[i] ** 2;
      db += dHr[i + lag] ** 2;
    }
    return da > 0 && db > 0 ? num / Math.sqrt(da * db) : 0;
  };

  let bestLag = 0;
  let bestCorr = -Infinity;
  for (let lag = 0; lag <= 45; lag++) {
    const c = corr(lag);
    if (c > bestCorr) {
      bestCorr = c;
      bestLag = lag;
    }
  }
  return bestCorr > 0.1 ? bestLag : undefined;
}

/**
 * Pic de démarrage : une ceinture aux électrodes sèches affiche souvent une FC
 * aberrante pendant la première ou les deux premières minutes, puis décroche
 * brutalement vers la vraie valeur. Signature quasi exclusive de la ceinture.
 */
function startupSpike(samples: Sample[], speed: number[]): boolean {
  const early = samples.filter((s, i) => s.t < 150 && s.hr != null && speed[i] < 2.5);
  if (early.length < 30) return false;
  const restHr = mean(early.slice(0, Math.floor(early.length / 3)).map((s) => s.hr));
  const later = mean(early.slice(-Math.floor(early.length / 3)).map((s) => s.hr));
  // FC très haute au repos qui redescend de plus de 30 bpm sans effort.
  return restHr != null && later != null && restHr > 150 && restHr - later > 30;
}

export function analyzeHrSource(
  samples: Sample[],
  speed: number[],
  sport: Sport,
  deviceHint?: { hrSensor?: HrSource },
  locale?: string,
): HrSourceAnalysis {
  const tr = translator(locale);
  // En natation, la détection n'a aucun sens : sous l'eau, un capteur optique
  // ne lit pas et une ceinture ne transmet pas — elle enregistre puis déverse
  // ses données à la sortie. Les « variations » observées décrivent le mode de
  // stockage de la montre, pas le capteur. Mieux vaut le dire que produire un
  // verdict qui n'a rien mesuré.
  if (sport === "swimming" && !deviceHint?.hrSensor) {
    return {
      verdict: "unknown",
      confidence: 0,
      fromDeviceMetadata: false,
      signals: [
        {
          name: tr("sensor.swim.name"),
          value: 0,
          unit: "",
          points: "neutral",
          note: tr("sensor.swim.note"),
        },
      ],
      cadenceLockPct: 0,
      suspectRanges: [],
    };
  }

  const withHr = samples.filter((s) => s.hr != null);
  if (withHr.length < 30) {
    return {
      verdict: "unknown",
      confidence: 0,
      fromDeviceMetadata: false,
      signals: [],
      cadenceLockPct: 0,
      suspectRanges: [],
    };
  }

  const signals: HrSignal[] = [];
  const lock = cadenceLock(samples, speed, tr("sensor.lockRange"));
  const { meanAbsStep, zeroStepPct, plateauTimePct } = stepStatistics(samples);
  const plateau = longestPlateauS(samples);
  const lag = responseLagS(samples, speed);
  const spike = startupSpike(samples, speed);

  // Le verrouillage cadence n'existe qu'en course : à vélo la cadence tourne
  // autour de 90 rpm, trop loin d'une FC d'effort pour créer l'ambiguïté.
  const lockRelevant = sport === "running" || sport === "hiking";

  let score = 0; // > 0 penche ceinture, < 0 penche optique

  if (lockRelevant) {
    signals.push({
      name: tr("sensor.lock.name"),
      value: Math.round(lock.pct * 10) / 10,
      unit: tr("unit.percent"),
      points: lock.pct > 8 ? "optical" : lock.pct < 2 ? "chest_strap" : "neutral",
      note:
        lock.pct > 8
          ? tr("sensor.lock.found")
          : tr("sensor.lock.none"),
    });
    if (lock.pct > 15) score -= 3;
    else if (lock.pct > 8) score -= 2;
    else if (lock.pct < 2) score += 1;
  }

  signals.push({
    name: tr("sensor.plateau.name"),
    value: Math.round(plateau),
    unit: " s",
    points: plateau > 30 ? "optical" : plateau < 20 ? "chest_strap" : "neutral",
    note:
      plateau > 30
        ? tr("sensor.plateau.long")
        : tr("sensor.plateau.normal"),
  });
  if (plateau > 45) score -= 2;
  else if (plateau > 30) score -= 1;
  else if (plateau < 20) score += 1;

  signals.push({
    name: tr("sensor.plateauTime.name"),
    value: Math.round(plateauTimePct),
    unit: tr("unit.percent"),
    points: plateauTimePct > 35 ? "optical" : plateauTimePct < 25 ? "chest_strap" : "neutral",
    note: tr("sensor.plateauTime.note"),
  });
  if (plateauTimePct > 35) score -= 1;
  else if (plateauTimePct < 25) score += 1;

  signals.push({
    name: tr("sensor.step.name"),
    value: Math.round(meanAbsStep * 1000) / 1000,
    unit: " bpm/s",
    points: meanAbsStep > 0.45 ? "chest_strap" : meanAbsStep < 0.35 ? "optical" : "neutral",
    note: tr("sensor.step.note", { pct: Math.round(zeroStepPct) }),
  });
  if (meanAbsStep > 0.45) score += 1;
  else if (meanAbsStep < 0.35) score -= 1;

  if (lag != null) {
    signals.push({
      name: tr("sensor.lag.name"),
      value: lag,
      unit: " s",
      points: lag > 15 ? "optical" : lag < 8 ? "chest_strap" : "neutral",
      note:
        lag > 20
          ? tr("sensor.lag.slow")
          : tr("sensor.lag.fast"),
    });
    if (lag > 22) score -= 2;
    else if (lag > 15) score -= 1;
    else if (lag < 8) score += 1;
  }

  if (spike) {
    signals.push({
      name: tr("sensor.spike.name"),
      value: 1,
      unit: "",
      points: "chest_strap",
      note: tr("sensor.spike.note"),
    });
    score += 2;
  }

  let verdict: HrSource;
  let confidence: number;

  if (deviceHint?.hrSensor && deviceHint.hrSensor !== "unknown") {
    verdict = deviceHint.hrSensor;
    confidence = 1;
  } else {
    const magnitude = Math.abs(score);
    verdict = score >= 2 ? "chest_strap" : score <= -2 ? "optical" : "unknown";
    // Les seuils ont été calibrés sur des fichiers de course à pied. À vélo,
    // l'absence de balancement des bras et la régularité de l'effort décalent
    // les signaux : un verdict incertain y est la règle, pas l'exception.
    if (verdict === "unknown" && sport === "cycling") {
      signals.push({
        name: tr("sensor.calibration.name"),
        value: 0,
        unit: "",
        points: "neutral",
        note: tr("sensor.calibration.note"),
      });
    }
    // Saturation à 0,9 : sans métadonnée constructeur, une heuristique ne
    // devrait jamais s'annoncer certaine.
    confidence = verdict === "unknown" ? 0.3 : Math.min(0.9, 0.45 + magnitude * 0.12);
  }

  return {
    verdict,
    confidence,
    fromDeviceMetadata: !!deviceHint?.hrSensor,
    signals,
    cadenceLockPct: lock.pct,
    suspectRanges: lock.ranges,
  };
}

export function hrSourceLabel(v: HrSource, locale?: string): string {
  return t(locale, v === "chest_strap" ? "sensor.label.chest_strap" : v === "optical" ? "sensor.label.optical" : "sensor.label.unknown");
}
