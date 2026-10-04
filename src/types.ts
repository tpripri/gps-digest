/**
 * Types partagés — modèle de données interne, indépendant du format source.
 * Toutes les unités sont SI : mètres, secondes, m/s, bpm, watts, °C.
 */

export type Sport = "running" | "cycling" | "swimming" | "hiking" | "other";

export type SourceFormat = "tcx" | "gpx" | "fit";

/** Un point de la trace, normalisé. `t` = secondes écoulées depuis le départ. */
export interface Sample {
  t: number;
  lat?: number;
  lon?: number;
  ele?: number;
  /** Distance cumulée en mètres depuis le départ. */
  dist?: number;
  hr?: number;
  /** Cadence : spm (course, déjà doublée) ou rpm (vélo). */
  cad?: number;
  pw?: number;
  temp?: number;
  /**
   * Vrai quand ce point ouvre un nouveau segment : la montre a été mise en
   * pause entre le point précédent et celui-ci. Le déplacement dans
   * l'intervalle n'est pas de l'activité.
   */
  discontinuity?: boolean;
}

/** Un tour, tel que présent nativement dans le fichier (TCX et FIT en ont). */
export interface Lap {
  index: number;
  startT: number;
  durS: number;
  distM: number;
  hrAvg?: number;
  hrMax?: number;
  calories?: number;
  /**
   * FIT : "active" | "rest" | "warmup" | "cooldown" | "recovery" | "interval".
   * TCX : "Active" | "Resting".
   */
  intensity?: string;
  /** Déclencheur du tour : "manual" | "time" | "distance"… (FIT), "Manual"… (TCX). */
  trigger?: string;
  /** Étape de la séance programmée à laquelle appartient le tour (FIT). */
  stepIndex?: number;
}

/** Étape d'une séance programmée sur la montre (message FIT workout_step). */
export interface WorkoutStep {
  index: number;
  name?: string;
  intensity?: string;
  durationS?: number;
  durationM?: number;
  /** Étape « répéter » : première étape du bloc répété et nombre de passages. */
  repeatFrom?: number;
  repeatCount?: number;
  targetPaceSPerKm?: number;
  targetPwW?: number;
}

export interface Activity {
  sport: Sport;
  /** ISO 8601 UTC du premier point. */
  startTime?: string;
  device?: string;
  source: SourceFormat;
  samples: Sample[];
  laps: Lap[];
  /** Séance programmée sur la montre, quand le fichier la contient. */
  workoutSteps?: WorkoutStep[];
}

/** Champs présents dans la trace — sert à ne sérialiser que les colonnes utiles. */
export interface FieldPresence {
  lat: boolean;
  ele: boolean;
  dist: boolean;
  hr: boolean;
  cad: boolean;
  pw: boolean;
  temp: boolean;
}

export interface Split {
  index: number;
  /** Unité de découpe atteinte : 1 = fin du 1er km. */
  markM: number;
  startT: number;
  durS: number;
  distM: number;
  paceSPerKm?: number;
  gapSPerKm?: number;
  hrAvg?: number;
  cadAvg?: number;
  pwAvg?: number;
  eleGainM?: number;
  eleLossM?: number;
  partial: boolean;
}

/** Base des zones FC : profil renseigné, ou FC max observée faute de mieux. */
export interface HrZoneBasis {
  model: "max" | "reserve" | "threshold";
  source: "athlete" | "observed";
  maxHr?: number;
  restHr?: number;
  lthr?: number;
}

export interface ZoneBin {
  zone: number;
  label: string;
  lowerInclusive: number;
  upperExclusive: number;
  timeS: number;
  pct: number;
}

export interface IntervalBlock {
  index: number;
  kind: "work" | "rest";
  startT: number;
  durS: number;
  distM: number;
  paceSPerKm?: number;
  hrAvg?: number;
  hrMax?: number;
  pwAvg?: number;
  /** Étape de la séance programmée, quand le bloc en vient. */
  stepIndex?: number;
}

/** Regroupement type "8 × 400 m / récup 90 s". */
export interface IntervalSet {
  reps: number;
  kind: "distance" | "time";
  targetM?: number;
  targetS?: number;
  avgWorkDurS: number;
  avgWorkPaceSPerKm?: number;
  avgWorkPwW?: number;
  avgRestDurS: number;
  description: string;
  /** Indices des blocs de travail qui composent cette série. */
  workBlockIndices?: number[];
  /**
   * D'où vient la série : séance programmée sur la montre, tours manuels, ou
   * détection sur le signal. Seules les deux premières sont une prescription.
   */
  source?: "workout" | "laps" | "auto";
  /** Prescription de la montre, quand le fichier la contient. */
  repsPlanned?: number;
  targetPaceSPerKm?: number;
  targetPwW?: number;
}

export interface SessionSummary {
  sport: Sport;
  startTimeUtc?: string;
  device?: string;
  sourceFormat: SourceFormat;
  durElapsedS: number;
  durMovingS: number;
  distM: number;
  eleGainM?: number;
  eleLossM?: number;
  /** Vrai si le dénivelé vient de l'altimètre de la montre, pas d'un calcul GPS. */
  elevationFromDevice?: boolean;
  paceAvgSPerKm?: number;
  gapAvgSPerKm?: number;
  speedAvgMS?: number;
  speedMaxMS?: number;
  hrAvg?: number;
  hrMax?: number;
  cadAvg?: number;
  pwAvg?: number;
  /** Vrai hors cyclisme : puissance estimée par la montre, non comparable. */
  pwIsEstimated?: boolean;
  /** Normalized Power (moyenne glissante 30 s, puissance 4). */
  pwNormalizedW?: number;
  intensityFactor?: number;
  tss?: number;
  /** Dérive cardiaque en % entre 1re et 2e moitié (Pa:Hr ou Pw:Hr). */
  decouplingPct?: number;
  efficiencyFactor?: number;
  tempAvgC?: number;
  sampleCountRaw: number;
  samplingHz?: number;
  /** Niveau de traitement retenu : full, swim ou load. */
  tier?: "full" | "swim" | "load";
  /** Vrai si le sport déclaré dans le fichier a été corrigé. */
  reclassified?: boolean;
  declaredSport?: Sport;
  classificationReasons?: string[];
  /**
   * Rayon de la zone de confidentialité, quand des positions ont été
   * effacées. Les totaux portent toujours sur la séance complète.
   */
  privacyMaskRadiusM?: number;
  /**
   * Secondes entre le dernier point enregistré et la fin déclarée par le
   * message `session` du FIT, quand l'écart dépasse 30 s : la fin de
   * l'enregistrement manque.
   */
  recordsEndGapS?: number;
}

export interface AthleteProfile {
  maxHr?: number;
  restHr?: number;
  /** Seuil lactique cardiaque, plus fiable que maxHr pour les zones. */
  lthr?: number;
  ftpW?: number;
  /** Allure seuil en s/km, pour les zones d'allure. */
  thresholdPaceSPerKm?: number;
  /**
   * Modèle des zones FC. Par défaut : % de la FC seuil si elle est connue
   * (le plus fiable), sinon % de la FC max.
   */
  hrZoneModel?: "max" | "reserve" | "threshold";
}

export interface DigestOptions {
  athlete?: AthleteProfile;
  /** Budget cible en tokens pour le bloc `stream`. 0 = pas de flux brut. */
  streamTokenBudget?: number;
  /** Unité des splits en mètres (1000 = km, 1609.344 = mile). */
  splitUnitM?: number;
  /** Rognage vie privée : mètres à retirer au départ et à l'arrivée. */
  privacyRadiusM?: number;
  /** Retire complètement lat/lon de la sortie. */
  dropCoordinates?: boolean;
  detectIntervals?: boolean;
  locale?: string;
  /** Vérité terrain du capteur de FC, quand le fichier la fournit (FIT). */
  hrSensorHint?: { hrSensor?: "chest_strap" | "optical" | "unknown" };
  /** Données propres au FIT : longueurs de bassin, longueur du bassin. */
  fitExtras?: {
    poolLengthM?: number;
    lengths?: import("./swim.ts").RawLength[];
    totalAscentM?: number;
    totalDescentM?: number;
    /** Totaux du message `session` du FIT : ils font foi quand ils existent. */
    totalDistanceM?: number;
    totalElapsedS?: number;
    sessionHrAvg?: number;
    sessionHrMax?: number;
    /** Fin déclarée par la session moins dernier point enregistré, en s. */
    recordsEndGapS?: number;
  };
  /** Échauffement à écarter du calcul de dérive, en secondes. */
  driftWarmupS?: number;
  /** Température de l'air issue d'une source météo, si disponible. */
  externalTemperature?: { avgC: number; source: string };
  /** Cibles prescrites, une par série détectée. Sinon inférées. */
  blockTargets?: import("./adherence.ts").BlockTarget[];
}

export interface Digest {
  session: SessionSummary;
  laps: Lap[];
  splits: Split[];
  hrZones: ZoneBin[];
  /** Base des zones FC de cette séance. */
  hrZoneBasis?: HrZoneBasis;
  paceZones: ZoneBin[];
  powerZones: ZoneBin[];
  intervals: IntervalBlock[];
  intervalSets: IntervalSet[];
  /** Trace réduite au budget demandé. */
  stream: Sample[];
  fields: FieldPresence;
  /** Traçabilité de la compaction, utile en UI et dans le bundle. */
  reduction: {
    rawSamples: number;
    keptSamples: number;
    rawBytes: number;
    outputBytes: number;
    estimatedTokens: number;
    ratio: number;
  };
}
