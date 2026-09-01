/**
 * Analyse multi-fichiers.
 *
 * Vingt séances ne sont pas vingt analyses mises bout à bout : ce sont des
 * questions que le fichier isolé ne peut pas poser. Charge d'entraînement,
 * répartition des intensités, meilleurs efforts consolidés, et surtout la
 * **cohérence du matériel** d'un fichier à l'autre.
 *
 * Ce dernier point est le plus important et le plus négligé. Un changement de
 * capteur de FC au milieu d'une période invalide silencieusement toute
 * comparaison cardiaque : les zones se décalent, les dérives deviennent
 * incomparables, les tendances sont des artefacts. Le module le détecte et
 * l'annonce avant toute autre conclusion.
 */

import { mean } from "./geo.ts";
import { bestEfforts, fitCriticalSpeed, projectRaces, formatDuration, RACE_LABELS } from "./efforts.ts";
import { paceLabel, toCsv, estimateTokens, LLM_DIALECT } from "./serialize.ts";
import { hrSourceLabel } from "./sensor.ts";
import type { BestEffort, CriticalSpeedModel, RaceProjection } from "./efforts.ts";
import type { HrSource, HrSourceAnalysis } from "./sensor.ts";
import type { DriftAnalysis } from "./drift.ts";
import type { AdherenceReport } from "./adherence.ts";
import type { Digest, Sample, Sport } from "./types.ts";

export interface FileAnalysis {
  filename: string;
  digest: Digest;
  hrSource: HrSourceAnalysis;
  drift: DriftAnalysis;
  adherence: AdherenceReport[];
  efforts: BestEffort[];
  samples: Sample[];
}

export interface SensorChange {
  date: string;
  from: HrSource;
  to: HrSource;
  filesBefore: number;
  filesAfter: number;
}

export interface WeekBucket {
  isoWeek: string;
  sessions: number;
  distanceM: number;
  movingS: number;
  elevationM: number;
  /** Répartition du temps par intensité, en secondes. */
  easyS: number;
  moderateS: number;
  hardS: number;
}

export interface BatchAnalysis {
  files: FileAnalysis[];
  sports: Partial<Record<Sport, number>>;
  dateFrom?: string;
  dateTo?: string;
  totalDistanceM: number;
  totalMovingS: number;
  weeks: WeekBucket[];
  consolidatedEfforts: BestEffort[];
  criticalSpeed: CriticalSpeedModel | null;
  projections: RaceProjection[];
  sensorChanges: SensorChange[];
  warnings: string[];
}

function isoWeek(d: Date): string {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((t.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${t.getUTCFullYear()}-S${String(week).padStart(2, "0")}`;
}

/**
 * Répartition polarisée simple, en pourcentage de FC max. Le seuil bas à 80 %
 * et le seuil haut à 88 % approchent les frontières des zones 2/3 et 4/5.
 */
function intensityBuckets(samples: Sample[], maxHr?: number) {
  let easy = 0;
  let moderate = 0;
  let hard = 0;
  if (!maxHr) return { easy, moderate, hard };

  for (let i = 1; i < samples.length; i++) {
    const hr = samples[i].hr;
    if (hr == null) continue;
    const dt = Math.min(samples[i].t - samples[i - 1].t, 10);
    if (dt <= 0) continue;
    const pct = hr / maxHr;
    if (pct < 0.8) easy += dt;
    else if (pct < 0.88) moderate += dt;
    else hard += dt;
  }
  return { easy, moderate, hard };
}

export interface BatchOptions {
  maxHr?: number;
  raceResults?: { distanceM: number; timeS: number; date?: string; label?: string }[];
  riegelExponent?: number;
}

export function analyzeBatch(files: FileAnalysis[], opts: BatchOptions = {}): BatchAnalysis {
  const sorted = [...files].sort((a, b) =>
    (a.digest.session.startTimeUtc ?? "").localeCompare(b.digest.session.startTimeUtc ?? ""),
  );

  const sports: Partial<Record<Sport, number>> = {};
  const weekMap = new Map<string, WeekBucket>();
  let totalDistanceM = 0;
  let totalMovingS = 0;

  for (const f of sorted) {
    const s = f.digest.session;
    sports[s.sport] = (sports[s.sport] ?? 0) + 1;
    totalDistanceM += s.distM;
    totalMovingS += s.durMovingS;

    if (!s.startTimeUtc) continue;
    const key = isoWeek(new Date(s.startTimeUtc));
    const b = weekMap.get(key) ?? {
      isoWeek: key,
      sessions: 0,
      distanceM: 0,
      movingS: 0,
      elevationM: 0,
      easyS: 0,
      moderateS: 0,
      hardS: 0,
    };
    const { easy, moderate, hard } = intensityBuckets(f.samples, opts.maxHr);
    b.sessions++;
    b.distanceM += s.distM;
    b.movingS += s.durMovingS;
    b.elevationM += s.eleGainM ?? 0;
    b.easyS += easy;
    b.moderateS += moderate;
    b.hardS += hard;
    weekMap.set(key, b);
  }

  // Meilleurs efforts consolidés : pour chaque distance, la meilleure
  // performance toutes séances confondues, avec sa provenance.
  const bestByDistance = new Map<number, BestEffort>();
  for (const f of sorted) {
    for (const e of f.efforts) {
      const current = bestByDistance.get(e.distanceM);
      if (!current || e.timeS < current.timeS) {
        bestByDistance.set(e.distanceM, {
          ...e,
          sourceFile: f.filename,
          sourceDate: f.digest.session.startTimeUtc?.slice(0, 10),
        });
      }
    }
  }
  const consolidatedEfforts = [...bestByDistance.values()].sort((a, b) => a.distanceM - b.distanceM);

  // Seuls les efforts en course alimentent le modèle : mélanger vélo et course
  // dans une courbe durée–vitesse n'a aucun sens.
  const runFiles = sorted.filter((f) => f.digest.session.sport === "running");
  const runEfforts = consolidatedEfforts.filter((e) =>
    runFiles.some((f) => f.filename === e.sourceFile),
  );
  const criticalSpeed = fitCriticalSpeed(runEfforts);
  const projections = projectRaces({
    efforts: runEfforts,
    cs: criticalSpeed,
    raceResults: opts.raceResults,
    riegelExponent: opts.riegelExponent,
  });

  // --- Changements de capteur ---
  const sensorChanges: SensorChange[] = [];
  const dated = sorted.filter(
    (f) => f.digest.session.startTimeUtc && f.hrSource.verdict !== "unknown",
  );
  for (let i = 1; i < dated.length; i++) {
    const prev = dated[i - 1].hrSource.verdict;
    const cur = dated[i].hrSource.verdict;
    if (prev !== cur) {
      sensorChanges.push({
        date: dated[i].digest.session.startTimeUtc!.slice(0, 10),
        from: prev,
        to: cur,
        filesBefore: i,
        filesAfter: dated.length - i,
      });
    }
  }

  const warnings: string[] = [];

  if (sensorChanges.length) {
    const c = sensorChanges[sensorChanges.length - 1];
    warnings.push(
      `Changement de capteur de FC détecté autour du ${c.date} (${hrSourceLabel(c.from)} → ${hrSourceLabel(c.to)}). Les comparaisons cardiaques de part et d'autre de cette date ne sont pas valides : zones, dérives et tendances de FC doivent être analysées séparément sur chaque période.`,
    );
  }

  const opticalFiles = sorted.filter((f) => f.hrSource.verdict === "optical");
  if (opticalFiles.length) {
    const lockHeavy = opticalFiles.filter((f) => f.hrSource.cadenceLockPct > 10);
    if (lockHeavy.length) {
      warnings.push(
        `${lockHeavy.length} fichier(s) présentent un verrouillage de la FC sur la cadence : les valeurs cardiaques y sont partiellement fausses et les dérives correspondantes ne sont pas exploitables.`,
      );
    }
  }

  const inapplicableDrift = sorted.filter((f) => !f.drift.applicable).length;
  if (inapplicableDrift > 0 && inapplicableDrift < sorted.length) {
    warnings.push(
      `Dérive cardiaque calculée sur ${sorted.length - inapplicableDrift} séance(s) sur ${sorted.length} : les autres sont trop courtes ou trop irrégulières pour que le calcul ait un sens.`,
    );
  }

  if (criticalSpeed && criticalSpeed.r2 < 0.97) {
    warnings.push(
      `Ajustement du modèle de vitesse critique moyen (R² = ${criticalSpeed.r2.toFixed(3)}) : les projections sont indicatives. Un test dédié — 3 min et 12 min à fond, frais — donnerait un modèle bien plus fiable.`,
    );
  }

  if (!opts.raceResults?.length) {
    warnings.push(
      "Aucun résultat de course fourni. Les projections reposent uniquement sur des efforts d'entraînement, qui surestiment généralement la performance en compétition. Renseigner un chrono réel améliore nettement la calibration.",
    );
  }

  return {
    files: sorted,
    sports,
    dateFrom: sorted[0]?.digest.session.startTimeUtc?.slice(0, 10),
    dateTo: sorted[sorted.length - 1]?.digest.session.startTimeUtc?.slice(0, 10),
    totalDistanceM,
    totalMovingS,
    weeks: [...weekMap.values()].sort((a, b) => a.isoWeek.localeCompare(b.isoWeek)),
    consolidatedEfforts,
    criticalSpeed,
    projections,
    sensorChanges,
    warnings,
  };
}

// ---------------------------------------------------------------- bundle

/**
 * Bundle multi-séances. Compromis assumé : on ne peut pas donner vingt traces
 * complètes à un modèle. On donne donc une ligne par séance, les tableaux
 * transversaux, et on laisse l'utilisateur exporter le détail d'une séance
 * précise s'il veut creuser.
 */
export function buildBatchBundle(batch: BatchAnalysis, opts: { maxHr?: number } = {}): string {
  const out: string[] = [];
  const block = (name: string, csv: string) => {
    if (csv.trim()) out.push(`## ${name}\n${csv.trim()}\n`);
  };

  out.push("# gps-digest v1 — synthèse multi-séances");
  out.push(`# ${batch.files.length} séances du ${batch.dateFrom ?? "?"} au ${batch.dateTo ?? "?"}`);
  out.push(`# volume total : ${(batch.totalDistanceM / 1000).toFixed(1)} km, ${formatDuration(batch.totalMovingS)} en mouvement`);
  if (opts.maxHr) out.push(`# FC max de référence : ${opts.maxHr} bpm`);
  out.push("#");
  out.push("# Les valeurs de FC ne sont comparables entre séances que si la colonne");
  out.push("# hr_source est identique. Lire les avertissements avant toute conclusion.");
  for (const w of batch.warnings) out.push(`# ⚠ ${w}`);
  out.push("");

  block(
    "sessions",
    toCsv(
      batch.files.map((f) => {
        const s = f.digest.session;
        return {
          date: s.startTimeUtc?.slice(0, 10),
          sport: s.sport,
          dist_km: (s.distM / 1000).toFixed(2),
          dur_moving: formatDuration(s.durMovingS),
          pace_mmss: paceLabel(s.paceAvgSPerKm),
          gap_mmss: paceLabel(s.gapAvgSPerKm),
          ele_gain_m: s.eleGainM,
          hr_avg: s.hrAvg == null ? undefined : Math.round(s.hrAvg),
          hr_max: s.hrMax,
          hr_source: hrSourceLabel(f.hrSource.verdict),
          hr_confidence: f.hrSource.confidence.toFixed(2),
          drift_pct: f.drift.decouplingPct == null ? "n/a" : f.drift.decouplingPct.toFixed(1),
          drift_valid: f.drift.applicable ? 1 : 0,
          temp_c: f.drift.temperature?.avgC == null ? undefined : Math.round(f.drift.temperature.avgC),
          intervals: f.digest.intervalSets.map((s2) => s2.description).join(" + ") || undefined,
          adherence: f.adherence.map((a) => a.grade).join("/") || undefined,
          file: f.filename,
        };
      }),
      LLM_DIALECT,
    ),
  );

  block(
    "weekly_load",
    toCsv(
      batch.weeks.map((w) => ({
        week: w.isoWeek,
        sessions: w.sessions,
        dist_km: (w.distanceM / 1000).toFixed(1),
        dur_moving: formatDuration(w.movingS),
        ele_gain_m: Math.round(w.elevationM),
        easy_pct: w.easyS + w.moderateS + w.hardS > 0
          ? Math.round((w.easyS / (w.easyS + w.moderateS + w.hardS)) * 100)
          : undefined,
        moderate_pct: w.easyS + w.moderateS + w.hardS > 0
          ? Math.round((w.moderateS / (w.easyS + w.moderateS + w.hardS)) * 100)
          : undefined,
        hard_pct: w.easyS + w.moderateS + w.hardS > 0
          ? Math.round((w.hardS / (w.easyS + w.moderateS + w.hardS)) * 100)
          : undefined,
      })),
      LLM_DIALECT,
    ),
  );

  block(
    "best_efforts",
    toCsv(
      batch.consolidatedEfforts.map((e) => ({
        distance: RACE_LABELS[e.distanceM] ?? `${e.distanceM} m`,
        time: formatDuration(e.timeS),
        pace_mmss: paceLabel(e.paceSPerKm),
        date: e.sourceDate,
        file: e.sourceFile,
      })),
      LLM_DIALECT,
    ),
  );

  if (batch.criticalSpeed) {
    const cs = batch.criticalSpeed;
    block(
      "critical_speed",
      toCsv(
        [
          { key: "cs_pace_mmss_km", value: paceLabel(cs.csPaceSPerKm) ?? "" },
          { key: "cs_speed_ms", value: cs.csMS.toFixed(3) },
          { key: "d_prime_m", value: Math.round(cs.dPrimeM) },
          { key: "r2", value: cs.r2.toFixed(4) },
          { key: "efforts_used", value: cs.usedEfforts.length },
        ],
        LLM_DIALECT,
        ["key", "value"],
      ),
    );
  }

  block(
    "race_projections",
    toCsv(
      batch.projections.map((p) => ({
        race: p.label,
        estimate: formatDuration(p.timeS),
        range_low: formatDuration(p.lowS),
        range_high: formatDuration(p.highS),
        pace_mmss: paceLabel(p.paceSPerKm),
        confidence: p.confidence,
        method: p.method,
      })),
      LLM_DIALECT,
    ),
  );

  const allAdherence = batch.files.flatMap((f) =>
    f.adherence.map((a) => ({
      date: f.digest.session.startTimeUtc?.slice(0, 10),
      set: a.setDescription,
      reps_done: a.repsCompleted,
      pace_cv_pct: a.paceCvPct?.toFixed(1),
      fade_total_pct:
        a.fadePctPerRep != null ? (a.fadePctPerRep * (a.repsCompleted - 1)).toFixed(1) : undefined,
      hr_rise_bpm: a.hrRiseBpm?.toFixed(0),
      grade: a.grade,
    })),
  );
  block("interval_adherence", toCsv(allAdherence, LLM_DIALECT));

  return out.join("\n");
}

export function batchBundleTokens(bundle: string): number {
  return estimateTokens(bundle);
}
