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
import { progressionRows } from "./progression.ts";
import { swimRows, paceLabel100 } from "./swim.ts";
import { formatSpeed } from "./classify.ts";
import { heatStressNote } from "./weather.ts";
import { formatDuration, RACE_LABELS } from "./efforts.ts";
import type { BatchAnalysis, FileAnalysis } from "./batch.ts";

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
}

const GUIDE = `# ─────────────────────────────────────────────────────────────────────
# COMMENT LIRE CE DOSSIER
#
# Structure : d'abord des tableaux transversaux (toutes séances confondues),
# puis le détail de chaque séance, chacune introduite par « ═══ SÉANCE n ═══ ».
# Chaque bloc commence par « ## nom_du_bloc » et contient un CSV avec en-tête.
#
# Unités : mètres, secondes, bpm, watts, degrés Celsius. Séparateur décimal
# = point. Séparateur de colonnes = virgule.
#
# Colonnes principales
#   t_s          secondes écoulées depuis le départ de la séance
#   dist_m       distance cumulée depuis le départ, en mètres
#   pace_s_km    allure en secondes par kilomètre (300 = 5:00/km), calculée sur
#                le temps EN MOUVEMENT, comme Strava. Garmin Connect divise par
#                la durée totale : ses allures sont donc plus lentes. Ne pas
#                conclure à une contre-performance sur cette seule différence.
#   pace_mmss    la même allure en minutes:secondes, pour la lecture
#   gap_s_km     allure ajustée à la pente (Minetti 2002) : comparable entre
#                une sortie vallonnée et une sortie plate
#   grade_pct    pente moyenne du segment, en pourcentage
#   hr_bpm       fréquence cardiaque
#   cad_spm      cadence en pas par minute (course) ou tours/min (vélo)
#   pw_w         puissance en watts
#
# Précautions de lecture, dans cet ordre d'importance
#   1. hr_source indique le capteur cardiaque estimé. Ne JAMAIS comparer des
#      valeurs de FC entre deux séances de sources différentes : l'écart
#      mesuré serait un artefact de matériel, pas un changement de forme.
#   2. drift_applicable = no signifie que la séance ne se prête pas au calcul
#      de dérive (effort trop irrégulier ou trop court). Ce n'est pas une
#      dérive nulle : c'est l'absence de mesure valide.
#   3. temp_c provient du capteur de la montre, porté au poignet. Il surestime
#      la température de l'air de 3 à 8 °C. Ce n'est PAS la météo.
#   4. Le flux détaillé est une moyenne par intervalle, pas un relevé
#      instantané. Les temps exacts sont dans les blocs splits, laps et
#      intervals.
# ─────────────────────────────────────────────────────────────────────`;

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
function sessionBlocks(file: FileAnalysis, n: number, opts: DossierOptions): string[] {
  const out: string[] = [];
  const s = file.digest.session;
  const p = `s${n}`;
  const date = s.startTimeUtc?.slice(0, 10) ?? "date inconnue";

  const push = (name: string, csv: string) => {
    if (csv.trim()) out.push(`## ${p}_${name}\n${csv.trim()}\n`);
  };

  const label = file.digest.intervalSets.length
    ? file.digest.intervalSets.map((x) => x.description).join(" + ")
    : `${(s.distM / 1000).toFixed(1)} km`;

  out.push(`\n# ═══ SÉANCE ${n} — ${date} — ${s.sport} — ${label} ═══`);
  out.push(`# fichier : ${file.filename}`);

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
    ["pace_basis", "temps en mouvement (convention Strava) — Garmin Connect divise par la durée totale et affiche donc une allure plus lente"],
    ["pace_avg_mmss", paceLabel(s.paceAvgSPerKm)],
    ["speed_avg_display", formatSpeed(s.sport, s.speedAvgMS)],
    ["gap_avg_s_km", s.gapAvgSPerKm != null ? Math.round(s.gapAvgSPerKm) : undefined],
    ["gap_avg_mmss", paceLabel(s.gapAvgSPerKm)],
    ["ele_gain_m", s.eleGainM],
    ["ele_loss_m", s.eleLossM],
    ["ele_source", s.elevationFromDevice
      ? "altimètre barométrique de la montre"
      : "calculé depuis l'altitude GPS — sous-estime généralement de 30 à 50 %"],
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
    ["power_is_estimated", s.pwIsEstimated ? "yes (montre, non comparable au vélo)" : undefined],
    ["drift_window_quality", file.drift.quality],
    ["drift_window_from_s", file.drift.window?.fromS],
    ["drift_window_to_s", file.drift.window?.toS],
    ["drift_window_coverage_pct",
      file.drift.windowCoveragePct != null ? Math.round(file.drift.windowCoveragePct) : undefined],
    ["hrr60_avg_bpm",
      file.adherence[0]?.hrr60AvgBpm != null
        ? Math.round(file.adherence[0].hrr60AvgBpm)
        : undefined],
    ["hr_source", hrSourceLabel(file.hrSource.verdict)],
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
    out.push(`# lecture de la dérive : ${file.drift.interpretation}`);
  }
  if (file.drift.qualityNote) out.push(`# représentativité : ${file.drift.qualityNote}`);
  if (file.drift.basisNote) out.push(`# ${file.drift.basisNote}`);
  if (file.weather) {
    const note = heatStressNote(file.weather);
    if (note) out.push(`# conditions : ${note}`);
  }
  out.push("");

  for (const r of s.classificationReasons ?? []) out.push(`# classification : ${r}`);

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
      out.push(`# séries : ${sw.sets.map((x) => x.description).join(" + ")}`);
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
    out.push(`# ${a.setDescription} — ${a.grade} : ${a.verdicts.join(" ")}\n`);
  }

  if (file.efforts.length) {
    push(
      "best_efforts",
      toCsv(
        file.efforts.map((e) => ({
          distance: RACE_LABELS[e.distanceM] ?? `${Math.round(e.distanceM)} m`,
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
    out.push(`# flux ci-dessous : un point tous les ${step}, valeurs moyennées sur l'intervalle`);
    push("stream", toCsv(streamRowsFrom(points, !opts.dropCoordinates), LLM_DIALECT));
  }

  return out;
}

export function buildDossier(batch: BatchAnalysis, opts: DossierOptions = {}): string {
  const detail = opts.perSessionDetail !== false;
  const out: string[] = [];
  const block = (name: string, csv: string) => {
    if (csv.trim()) out.push(`## ${name}\n${csv.trim()}\n`);
  };

  out.push("# gps-digest — dossier d'entraînement");
  out.push(
    `# ${batch.files.length} séance(s) du ${batch.dateFrom ?? "?"} au ${batch.dateTo ?? "?"}`,
  );
  out.push(
    `# volume : ${(batch.totalDistanceM / 1000).toFixed(1)} km, ` +
      `${formatDuration(batch.totalMovingS)} en mouvement`,
  );
  if (opts.maxHr) out.push(`# FC max de référence : ${opts.maxHr} bpm`);
  out.push("");
  out.push(GUIDE);
  out.push("");

  if (batch.warnings.length) {
    out.push("# ⚠ AVERTISSEMENTS — à lire avant toute conclusion");
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
          sport: s.sport,
          dist_km: (s.distM / 1000).toFixed(2),
          dur_moving: formatDuration(s.durMovingS),
          pace_mmss: paceLabel(s.paceAvgSPerKm),
          gap_mmss: paceLabel(s.gapAvgSPerKm),
          ele_gain_m: s.eleGainM,
          hr_avg: s.hrAvg != null ? Math.round(s.hrAvg) : undefined,
          hr_max: s.hrMax,
          hr_source: hrSourceLabel(f.hrSource.verdict),
          drift_pct: f.drift.applicable ? f.drift.decouplingPct!.toFixed(1) : "n/a",
          temp_c: s.tempAvgC != null ? Math.round(s.tempAvgC) : undefined,
          intervals: f.digest.intervalSets.map((x) => x.description).join(" + ") || undefined,
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
      batch.weeks.map((w) => {
        const total = w.easyS + w.moderateS + w.hardS;
        const pct = (v: number) => (total > 0 ? Math.round((v / total) * 100) : undefined);
        return {
          week: w.isoWeek,
          sessions: w.sessions,
          dist_km: (w.distanceM / 1000).toFixed(1),
          dur_moving: formatDuration(w.movingS),
          ele_gain_m: Math.round(w.elevationM),
          easy_pct: pct(w.easyS),
          moderate_pct: pct(w.moderateS),
          hard_pct: pct(w.hardS),
        };
      }),
      LLM_DIALECT,
    ),
  );

  block(
    "best_efforts_all_sessions",
    toCsv(
      batch.consolidatedEfforts.map((e) => ({
        distance: RACE_LABELS[e.distanceM] ?? `${Math.round(e.distanceM)} m`,
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

  // Progression aérobie : le bloc transversal le plus informatif du dossier.
  const progRows = progressionRows(batch.progression);
  if (progRows.length) {
    out.push("# FC à allure de référence, dans le temps. Comparer uniquement");
    out.push("# des lignes de même hr_source : deux capteurs ne sont pas comparables.");
    block("aerobic_progression", toCsv(progRows, LLM_DIALECT));
    for (const s of batch.progression.series) {
      if (s.verdict) out.push(`# ${s.paceLabel} (${hrSourceLabel(s.hrSource)}) : ${s.verdict}`);
    }
    out.push("");
  }

  if (detail) {
    for (let i = 0; i < batch.files.length; i++) {
      out.push(...sessionBlocks(batch.files[i], i + 1, opts));
    }
  }

  return out.join("\n");
}

/** Estimation du coût avant génération, pour piloter un curseur dans l'UI. */
export function estimateDossierTokens(batch: BatchAnalysis, opts: DossierOptions): number {
  return estimateTokens(buildDossier(batch, opts));
}
