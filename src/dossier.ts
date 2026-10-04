/**
 * Construction du dossier d'entraînement.
 *
 * Le premier format était trop maigre : la synthèse multi-séances ne portait
 * que des tableaux transversaux, sans aucun détail par séance. Un modèle ne
 * pouvait donc rien dire de précis sur une sortie donnée.
 *
 * Principe retenu ici : **les tableaux portent la précision, le flux porte la
 * forme.** Les temps exacts des tours, des splits et des répétitions vivent
 * dans des blocs dédiés ; le flux, lui, est sur une grille régulière, plus
 * facile à lire pour un modèle que des pas de temps irréguliers.
 *
 * Le budget n'est plus le facteur limitant : une fenêtre de contexte moderne
 * absorbe sans peine 50 à 150 k tokens. Autant les dépenser en information
 * utile plutôt que de sur-comprimer par réflexe.
 */

import { resampleByTime, resampleByDistance, type GridPoint } from "./reduce.ts";
import {
  toCsv,
  estimateTokens,
  paceLabel,
  splitRows,
  lapRows,
  zoneRows,
  intervalRows,
  LLM_DIALECT,
} from "./serialize.ts";
import { hrSourceLabel } from "./sensor.ts";
import { progressionRows, progressionMonthlyRows } from "./progression.ts";
import { swimRows, paceLabel100 } from "./swim.ts";
import { formatSpeed } from "./classify.ts";
import { heatStressNote } from "./weather.ts";
import { formatDuration, raceLabel, confidenceLabel } from "./efforts.ts";
import { gradeLabel } from "./adherence.ts";
import { driftQualityLabel } from "./drift.ts";
import { resolveLocale, translator, type Locale, type MessageKey, type MessageParams } from "./i18n.ts";
import type { BatchAnalysis, FileAnalysis } from "./batch.ts";
import { weeklyLoadRows } from "./batch.ts";

export type StreamMode = "time" | "distance" | "adaptive" | "none";

export interface DossierOptions {
  maxHr?: number;
  /** Grille du flux détaillé. */
  streamMode?: StreamMode;
  /** Pas en secondes (mode « time »). 5 ou 10 sont les valeurs utiles. */
  intervalS?: number;
  /** Pas en mètres (mode « distance »). 100 est la valeur usuelle. */
  intervalM?: number;
  dropCoordinates?: boolean;
  /** Inclut le détail séance par séance. Le désactiver ne laisse que la synthèse. */
  perSessionDetail?: boolean;
  splitUnitM?: number;
  /** Langue du dossier. Par défaut, celle de l'analyse multi-fichiers. */
  locale?: string;
  /**
   * Mode historique (une saison, une année) : seules les séances des N
   * derniers jours gardent leur détail complet ; les autres ne vivent que
   * dans le tableau « sessions », une ligne chacune. Sans cela, un an de
   * séances dépasserait le million de tokens.
   */
  recentDetailDays?: number;
}

/** Début de la fenêtre de détail : N jours avant la séance la plus récente. */
function recentFromMs(batch: BatchAnalysis, days?: number): number | undefined {
  if (!days) return undefined;
  const last = batch.files[batch.files.length - 1]?.digest.session.startTimeUtc;
  return last ? Date.parse(last) - days * 86_400_000 : undefined;
}

type Tr = (key: MessageKey, params?: MessageParams) => string;

// Le guide de lecture vit dans le catalogue (clé dossier.guide) : il se
// traduit en bloc, avec ses préfixes « # ».

function streamRowsFrom(points: GridPoint[], withCoords: boolean) {
  return points.map((p) => {
    const row: Record<string, string | number | undefined> = { t_s: p.t };
    row.dist_m = p.dist;
    if (p.paceSPerKm != null) row.pace_s_km = p.paceSPerKm;
    if (p.hr != null) row.hr_bpm = p.hr;
    if (p.cad != null) row.cad_spm = p.cad;
    if (p.pw != null) row.pw_w = p.pw;
    if (p.ele != null) row.ele_m = p.ele;
    if (p.gradePct != null) row.grade_pct = p.gradePct;
    if (p.temp != null) row.temp_c = p.temp;
    if (withCoords && p.lat != null) {
      row.lat = p.lat;
      row.lon = p.lon;
    }
    return row;
  });
}

export function buildStream(file: FileAnalysis, opts: DossierOptions): GridPoint[] {
  const mode = opts.streamMode ?? "time";
  if (mode === "none") return [];
  const drop = { dropCoordinates: opts.dropCoordinates };

  if (mode === "distance") {
    return resampleByDistance(file.samples, opts.intervalM ?? 100, drop);
  }
  if (mode === "adaptive") {
    // Conservé pour les très longues sorties : à budget égal, l'adaptatif
    // préserve mieux les ruptures qu'une grille lâche.
    return file.digest.stream.map((s) => ({
      t: s.t, dist: s.dist, ele: s.ele, hr: s.hr, cad: s.cad,
      pw: s.pw, temp: s.temp, lat: s.lat, lon: s.lon,
    }));
  }
  return resampleByTime(file.samples, opts.intervalS ?? 10, drop);
}

/** Un bloc de séance, prêt à concaténer. */
function sessionBlocks(
  file: FileAnalysis,
  n: number,
  opts: DossierOptions,
  locale: Locale,
  tr: Tr,
): string[] {
  const out: string[] = [];
  const s = file.digest.session;
  const p = `s${n}`;
  const date = s.startTimeUtc?.slice(0, 10) ?? tr("dossier.unknownDate");

  const push = (name: string, csv: string) => {
    if (csv.trim()) out.push(`## ${p}_${name}\n${csv.trim()}\n`);
  };

  const label = file.digest.intervalSets.length
    ? file.digest.intervalSets.map((x) => x.description).join(" + ")
    : `${(s.distM / 1000).toFixed(1)} km`;

  out.push(`\n# ${tr("dossier.sessionHeader", { n, date, sport: s.sport, label })}`);
  out.push(`# ${tr("dossier.file", { name: file.filename })}`);

  // --- Résumé ---
  const summary: [string, string | number | undefined][] = [
    ["date_utc", s.startTimeUtc],
    ["sport", s.sport],
    ["analysis_tier", s.tier],
    ["declared_sport", s.reclassified ? s.declaredSport : undefined],
    ["device", s.device],
    ["dist_m", s.distM],
    ["dur_elapsed_s", s.durElapsedS],
    ["dur_moving_s", s.durMovingS],
    ["dur_moving", formatDuration(s.durMovingS)],
    ["pace_avg_s_km", s.paceAvgSPerKm != null ? Math.round(s.paceAvgSPerKm) : undefined],
    ["pace_basis", tr("dossier.paceBasis")],
    ["pace_avg_mmss", paceLabel(s.paceAvgSPerKm)],
    ["speed_avg_display", formatSpeed(s.sport, s.speedAvgMS)],
    ["gap_avg_s_km", s.gapAvgSPerKm != null ? Math.round(s.gapAvgSPerKm) : undefined],
    ["gap_avg_mmss", paceLabel(s.gapAvgSPerKm)],
    ["ele_gain_m", s.eleGainM],
    ["ele_loss_m", s.eleLossM],
    ["ele_source", s.elevationFromDevice ? tr("dossier.eleDevice") : tr("dossier.eleGps")],
    ["hr_avg", s.hrAvg != null ? Math.round(s.hrAvg) : undefined],
    ["hr_max", s.hrMax],
    ["cad_avg", s.cadAvg != null ? Math.round(s.cadAvg) : undefined],
    ["pw_avg_w", s.pwAvg != null ? Math.round(s.pwAvg) : undefined],
    ["pw_normalized_w", s.pwNormalizedW != null ? Math.round(s.pwNormalizedW) : undefined],
    ["tss", s.tss != null ? Math.round(s.tss) : undefined],
    ["temp_watch_c", s.tempAvgC != null ? Math.round(s.tempAvgC) : undefined],
    ["temp_air_c", file.weather ? Math.round(file.weather.tempC) : undefined],
    ["temp_apparent_c",
      file.weather?.apparentC != null ? Math.round(file.weather.apparentC) : undefined],
    ["humidity_pct",
      file.weather?.humidityPct != null ? Math.round(file.weather.humidityPct) : undefined],
    ["wind_kmh", file.weather?.windKmh != null ? Math.round(file.weather.windKmh) : undefined],
    ["power_is_estimated", s.pwIsEstimated ? tr("dossier.powerEstimated") : undefined],
    ["drift_window_quality", file.drift.quality && driftQualityLabel(file.drift.quality, locale)],
    ["drift_window_from_s", file.drift.window?.fromS],
    ["drift_window_to_s", file.drift.window?.toS],
    ["drift_window_coverage_pct",
      file.drift.windowCoveragePct != null ? Math.round(file.drift.windowCoveragePct) : undefined],
    ["hrr60_avg_bpm",
      file.adherence[0]?.hrr60AvgBpm != null
        ? Math.round(file.adherence[0].hrr60AvgBpm)
        : undefined],
    ["hr_source", hrSourceLabel(file.hrSource.verdict, locale)],
    ["hr_source_confidence", file.hrSource.confidence.toFixed(2)],
    ["hr_cadence_lock_pct",
      file.hrSource.cadenceLockPct > 1 ? file.hrSource.cadenceLockPct.toFixed(1) : undefined],
    ["drift_applicable", file.drift.applicable ? "yes" : "no"],
    ["drift_pct",
      file.drift.applicable ? file.drift.decouplingPct!.toFixed(1) : undefined],
    ["drift_not_computed_because", file.drift.applicable ? undefined : file.drift.reason],
    ["drift_hr_first_half",
      file.drift.firstHalfHr != null ? Math.round(file.drift.firstHalfHr) : undefined],
    ["drift_hr_second_half",
      file.drift.secondHalfHr != null ? Math.round(file.drift.secondHalfHr) : undefined],
    ["drift_pace_first_half", paceLabel(file.drift.firstHalfPaceSPerKm)],
    ["drift_pace_second_half", paceLabel(file.drift.secondHalfPaceSPerKm)],
    // La régularité est une propriété de la FENÊTRE analysée, pas de la séance
    // entière : c'est le CV du signal d'effort sur la portion retenue.
    ["effort_regularity_cv_pct",
      file.drift.window?.speedCvPct != null
        ? file.drift.window.speedCvPct.toFixed(1)
        : undefined],
    ["raw_sample_count", s.sampleCountRaw],
    ["privacy_mask_radius_m", opts.dropCoordinates ? undefined : s.privacyMaskRadiusM],
    ["records_end_gap_s", s.recordsEndGapS],
  ];
  push(
    "summary",
    toCsv(
      summary.filter(([, v]) => v != null && v !== "").map(([key, value]) => ({ key, value })),
      LLM_DIALECT,
      ["key", "value"],
    ),
  );

  if (file.drift.interpretation) {
    out.push(`# ${tr("dossier.driftReading", { text: file.drift.interpretation })}`);
  }
  if (file.drift.qualityNote) out.push(`# ${tr("dossier.representativeness", { text: file.drift.qualityNote })}`);
  if (file.drift.basisNote) out.push(`# ${file.drift.basisNote}`);
  if (file.weather) {
    const note = heatStressNote(file.weather, locale);
    if (note) out.push(`# ${tr("dossier.conditions", { text: note })}`);
  }
  out.push("");

  for (const r of s.classificationReasons ?? []) out.push(`# ${tr("dossier.classification", { text: r })}`);

  // --- Natation : métriques propres, aucune reprise des blocs de course ---
  const sw = file.swim;
  if (sw) {
    const rows: [string, string | number | undefined][] = [
      ["pool_swim", sw.poolSwim ? "yes" : "no"],
      ["pool_length_m", sw.poolLengthM],
      ["distance_m", sw.totalDistanceM],
      ["swim_time_s", sw.swimTimeS],
      ["elapsed_s", sw.elapsedS],
      ["pace_avg_per_100m", sw.avgPaceSPer100m ? paceLabel100(sw.avgPaceSPer100m) : undefined],
      ["pace_best_per_100m", sw.bestPaceSPer100m ? paceLabel100(sw.bestPaceSPer100m) : undefined],
      ["hr_avg", sw.hrAvg != null ? Math.round(sw.hrAvg) : undefined],
      ["lengths_recorded", sw.lengths.filter((l) => !l.isRest).length],
    ];
    push(
      "swim_summary",
      toCsv(
        rows.filter(([, v]) => v != null && v !== "").map(([key, value]) => ({ key, value })),
        LLM_DIALECT,
        ["key", "value"],
      ),
    );
    if (sw.sets.length) {
      out.push(`# ${tr("dossier.swimSets", { list: sw.sets.map((x) => x.description).join(" + ") })}`);
    }
    push("swim_lengths", toCsv(swimRows(sw), LLM_DIALECT));
    for (const c of sw.caveats) out.push(`# ⚠ ${c}`);
    out.push("");
    return out;
  }

  // --- Tableaux : c'est ici que vit la précision ---
  push("splits", toCsv(splitRows(file.digest.splits), LLM_DIALECT));
  push("laps", toCsv(lapRows(file.digest.laps), LLM_DIALECT));
  push("hr_zones", toCsv(zoneRows(file.digest.hrZones), LLM_DIALECT));
  push("pace_zones", toCsv(zoneRows(file.digest.paceZones), LLM_DIALECT));
  push("power_zones", toCsv(zoneRows(file.digest.powerZones), LLM_DIALECT));
  push("intervals", toCsv(intervalRows(file.digest.intervals), LLM_DIALECT));
  for (const set of file.digest.intervalSets) {
    if (set.source) out.push(`# ${tr(`dossier.setSource.${set.source}`, { set: set.description })}`);
  }

  // --- Respect des blocs, répétition par répétition ---
  for (const a of file.adherence) {
    push(
      "block_reps",
      toCsv(
        a.reps.map((r) => ({
          rep: r.index,
          dur_s: r.durS,
          dist_m: r.distM,
          pace_s_km: r.paceSPerKm != null ? Math.round(r.paceSPerKm) : undefined,
          pace_mmss: paceLabel(r.paceSPerKm),
          hr_avg: r.hrAvg != null ? Math.round(r.hrAvg) : undefined,
          hr_max: r.hrMax,
          pw_w: r.pwAvgW != null ? Math.round(r.pwAvgW) : undefined,
              rest_after_s: r.restAfterS,
          delta_vs_set_pct: r.deltaVsSetPct != null ? r.deltaVsSetPct.toFixed(1) : undefined,
        })),
        LLM_DIALECT,
      ),
    );
    out.push(`# ${tr("dossier.adherence", {
      set: a.setDescription,
      grade: gradeLabel(a.grade, locale),
      verdicts: a.verdicts.join(" "),
    })}\n`);
  }

  if (file.efforts.length) {
    push(
      "best_efforts",
      toCsv(
        file.efforts.map((e) => ({
          distance: raceLabel(e.distanceM, locale) ?? `${Math.round(e.distanceM)} m`,
          time: formatDuration(e.timeS),
          time_s: Math.round(e.timeS),
          pace_mmss: paceLabel(e.paceSPerKm),
          start_s: Math.round(e.startS),
        })),
        LLM_DIALECT,
      ),
    );
  }

  // --- Flux détaillé ---
  const points = buildStream(file, opts);
  if (points.length) {
    const mode = opts.streamMode ?? "time";
    const step = mode === "distance" ? `${opts.intervalM ?? 100} m` : `${opts.intervalS ?? 10} s`;
    out.push(`# ${tr("dossier.streamNote", { step })}`);
    push("stream", toCsv(streamRowsFrom(points, !opts.dropCoordinates), LLM_DIALECT));
  }

  return out;
}

export function buildDossier(batch: BatchAnalysis, opts: DossierOptions = {}): string {
  const locale = resolveLocale(opts.locale ?? batch.locale);
  const tr = translator(locale);
  const detail = opts.perSessionDetail !== false;
  const recentFrom = recentFromMs(batch, opts.recentDetailDays);
  const isRecent = (f: FileAnalysis) =>
    recentFrom == null || Date.parse(f.digest.session.startTimeUtc ?? "") >= recentFrom;
  const out: string[] = [];
  const block = (name: string, csv: string) => {
    if (csv.trim()) out.push(`## ${name}\n${csv.trim()}\n`);
  };

  out.push(`# ${tr("dossier.title")}`);
  out.push(
    `# ${tr("dossier.range", { n: batch.files.length, from: batch.dateFrom ?? "?", to: batch.dateTo ?? "?" })}`,
  );
  out.push(
    `# ${tr("dossier.volume", {
      km: (batch.totalDistanceM / 1000).toFixed(1),
      dur: formatDuration(batch.totalMovingS),
    })}`,
  );
  if (opts.maxHr) out.push(`# ${tr("common.refMaxHr", { hr: opts.maxHr })}`);
  // Base des zones FC : l'IA doit savoir sur quoi reposent les pourcentages.
  const z = batch.hrZoneBasis;
  if (z) {
    if (z.source === "observed") out.push(`# ${tr("dossier.hrZonesObserved", { hr: z.maxHr! })}`);
    else if (z.model === "threshold") out.push(`# ${tr("dossier.hrZonesThreshold", { hr: z.lthr! })}`);
    else if (z.model === "reserve") out.push(`# ${tr("dossier.hrZonesReserve", { max: z.maxHr!, rest: z.restHr! })}`);
    else out.push(`# ${tr("dossier.hrZonesMax", { hr: z.maxHr! })}`);
  }
  // Des positions ont été effacées : l'IA doit savoir que les totaux, eux,
  // portent sur la séance complète, et ne pas les recalculer depuis la trace.
  const masked = Math.max(0, ...batch.files.map((f) => f.digest.session.privacyMaskRadiusM ?? 0));
  if (masked > 0 && !opts.dropCoordinates) out.push(`# ${tr("dossier.privacyMasked", { m: masked })}`);
  if (recentFrom != null && detail) {
    out.push(`# ${tr("dossier.contextNote", {
      total: batch.files.length,
      days: opts.recentDetailDays!,
      n: batch.files.filter(isRecent).length,
    })}`);
  }
  out.push("");
  out.push(tr("dossier.guide"));
  out.push("");

  if (batch.warnings.length) {
    out.push(`# ${tr("dossier.warningsHeader")}`);
    for (const w of batch.warnings) out.push(`# ⚠ ${w}`);
    out.push("");
  }

  // --- Transversal ---
  block(
    "sessions",
    toCsv(
      batch.files.map((f, i) => {
        const s = f.digest.session;
        return {
          n: i + 1,
          date: s.startTimeUtc?.slice(0, 10),
          sport: f.part?.transition ? "transition" : s.sport,
          // Rang dans un fichier multisport : « 2/5 » relie le vélo à son triathlon.
          part: f.part ? `${f.part.index}/${f.part.count}` : undefined,
          dist_km: (s.distM / 1000).toFixed(recentFrom == null ? 2 : 1),
          dur_moving: formatDuration(s.durMovingS),
          // Unité propre au sport : des minutes par kilomètre à vélo ou en
          // natation ne veulent rien dire, et un modèle les lirait comme des
          // allures de course aberrantes.
          speed: formatSpeed(s.sport, s.speedAvgMS),
          gap_mmss: s.sport === "running" ? paceLabel(s.gapAvgSPerKm) : undefined,
          ele_gain_m: s.eleGainM,
          hr_avg: s.hrAvg != null ? Math.round(s.hrAvg) : undefined,
          hr_max: s.hrMax,
          hr_source: hrSourceLabel(f.hrSource.verdict, locale),
          drift_pct: f.drift.applicable ? f.drift.decouplingPct!.toFixed(1) : "n/a",
          // Température de la montre, chauffée par le poignet : en mode
          // historique, la colonne coûte plus qu'elle n'apprend.
          temp_c: recentFrom == null && s.tempAvgC != null ? Math.round(s.tempAvgC) : undefined,
          intervals: f.digest.intervalSets.map((x) => x.description).join(" + ") || undefined,
          adherence: f.adherence.map((a) => gradeLabel(a.grade, locale)).join("/") || undefined,
          // En mode historique, le nom de fichier (un identifiant Strava) ne
          // dit rien à l'IA et coûte une colonne sur des centaines de lignes.
          file: recentFrom == null ? f.filename : undefined,
        };
      }),
      LLM_DIALECT,
    ),
  );

  out.push(`# ${tr("dossier.loadNote")}`);
  block("weekly_load", toCsv(weeklyLoadRows(batch.weeks), LLM_DIALECT));

  block(
    "best_efforts_all_sessions",
    toCsv(
      batch.consolidatedEfforts.map((e) => ({
        distance: raceLabel(e.distanceM, locale) ?? `${Math.round(e.distanceM)} m`,
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
          { key: "d_prime_m", value: Math.round(cs.dPrimeM) },
          { key: "r2", value: cs.r2.toFixed(4) },
          { key: "efforts_used", value: cs.usedEfforts.length },
          { key: "window_days", value: batch.effortsWindowDays },
          { key: "window_start", value: batch.effortsWindowFrom ?? "" },
        ],
        LLM_DIALECT,
        ["key", "value"],
      ),
    );
  }

  if (batch.projections.length) {
    out.push(`# ${tr("dossier.projNote", { days: batch.effortsWindowDays, from: batch.effortsWindowFrom ?? "?" })}`);
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
        confidence: confidenceLabel(p.confidence, locale),
        achieved: p.achievedS != null ? formatDuration(p.achievedS) : undefined,
        achieved_on: p.achievedDate,
        model_gap_pct: p.modelGapPct?.toFixed(1),
        method: p.method,
        caveat: p.caveat,
      })),
      LLM_DIALECT,
    ),
  );

  // Progression aérobie : le bloc transversal le plus informatif du dossier.
  // Sur une année, une ligne par course et par allure noierait la tendance :
  // le mode historique la résume par mois.
  const monthly = recentFrom != null;
  const progRows = monthly ? progressionMonthlyRows(batch.progression) : progressionRows(batch.progression);
  if (progRows.length) {
    for (const line of tr(monthly ? "dossier.progMonthlyNote" : "dossier.progNote").split("\n")) out.push(`# ${line}`);
    block("aerobic_progression", toCsv(progRows, LLM_DIALECT));
    for (const s of batch.progression.series) {
      if (s.verdict) {
        out.push(`# ${tr("dossier.progVerdict", {
          pace: s.paceLabel,
          source: hrSourceLabel(s.hrSource, locale),
          verdict: s.verdict,
        })}`);
      }
    }
    out.push("");
  }

  if (detail) {
    // La numérotation reste celle du tableau « sessions », même quand seules
    // les séances récentes sont détaillées.
    for (let i = 0; i < batch.files.length; i++) {
      if (isRecent(batch.files[i])) out.push(...sessionBlocks(batch.files[i], i + 1, opts, locale, tr));
    }
  }

  return out.join("\n");
}

/** Estimation du coût avant génération, pour piloter un curseur dans l'UI. */
export function estimateDossierTokens(batch: BatchAnalysis, opts: DossierOptions): number {
  return estimateTokens(buildDossier(batch, opts));
}
