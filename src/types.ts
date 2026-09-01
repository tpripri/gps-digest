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
  /** TCX : "Active" | "Resting". Signal en or pour détecter des intervalles. */
  intensity?: string;
  trigger?: string;
}

export interface Activity {
  sport: Sport;
  /** ISO 8601 UTC du premier point. */
  startTime?: string;
  device?: string;
  source: SourceFormat;
  samples: Sample[];
  laps: Lap[];
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
  paceAvgSPerKm?: number;
  gapAvgSPerKm?: number;
  speedAvgMS?: number;
  speedMaxMS?: number;
  hrAvg?: number;
  hrMax?: number;
  cadAvg?: number;
  pwAvg?: number;
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
}

export interface AthleteProfile {
  maxHr?: number;
  restHr?: number;
  /** Seuil lactique cardiaque, plus fiable que maxHr pour les zones. */
  lthr?: number;
  ftpW?: number;
  /** Allure seuil en s/km, pour les zones d'allure. */
  thresholdPaceSPerKm?: number;
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
