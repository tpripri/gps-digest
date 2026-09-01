/**
 * Sérialisation.
 *
 * Deux sorties strictement séparées, et c'est volontaire :
 *
 *  - `csvForLlm`  : RFC 4180 pur — séparateur ",", décimale ".", pas de BOM.
 *  - `csvForExcel`: séparateur ";", décimale ",", BOM UTF-8, ligne `sep=;`.
 *
 * Les mélanger est le bug n°1 des convertisseurs : un utilisateur français
 * ouvre le CSV "LLM" dans Excel et voit une seule colonne, ou pire, envoie à
 * Gemini un fichier où "3,45" est lu comme deux champs.
 */

import type { Digest, Lap, Sample, Split, ZoneBin, IntervalBlock } from "./types.ts";

export interface CsvDialect {
  delimiter: string;
  decimal: string;
  eol: string;
  bom: boolean;
  sepHint: boolean;
}

export const LLM_DIALECT: CsvDialect = {
  delimiter: ",",
  decimal: ".",
  eol: "\n",
  bom: false,
  sepHint: false,
};

export const EXCEL_EU_DIALECT: CsvDialect = {
  delimiter: ";",
  decimal: ",",
  eol: "\r\n",
  bom: true,
  sepHint: true,
};

type Row = Record<string, string | number | undefined>;

function cell(v: string | number | undefined, d: CsvDialect): string {
  if (v == null) return "";
  let s = typeof v === "number" ? String(v) : v;
  if (typeof v === "number" && d.decimal !== ".") s = s.replace(".", d.decimal);
  if (s.includes(d.delimiter) || s.includes('"') || /[\r\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCsv(rows: Row[], d: CsvDialect = LLM_DIALECT, columns?: string[]): string {
  if (!rows.length) return "";
  const all = columns ?? [...new Set(rows.flatMap((r) => Object.keys(r)))];
  // Une colonne vide sur toutes les lignes coûte des tokens et laisse le modèle
  // spéculer sur un capteur absent. On la retire.
  const cols = all.filter((c) => rows.some((r) => r[c] != null && r[c] !== ""));
  const lines = [cols.join(d.delimiter)];
  for (const r of rows) lines.push(cols.map((c) => cell(r[c], d)).join(d.delimiter));
  return (d.bom ? "\uFEFF" : "") + (d.sepHint ? `sep=${d.delimiter}${d.eol}` : "") +
    lines.join(d.eol) + d.eol;
}

/**
 * Estimation du nombre de tokens. Sur du CSV numérique dense, les tokenizers
 * BPE tournent autour de 3,2 caractères par token — nettement moins bien que
 * sur de la prose. Approximation volontairement prudente : mieux vaut
 * surestimer que se faire tronquer le fichier.
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 3.2);
}

const r1 = (v?: number) => (v == null ? undefined : Math.round(v * 10) / 10);
const r0 = (v?: number) => (v == null ? undefined : Math.round(v));
const r2 = (v?: number) => (v == null ? undefined : Math.round(v * 100) / 100);

/** s/km -> "4:32" — beaucoup plus lisible pour le modèle que 272 secondes. */
export function paceLabel(sPerKm?: number): string | undefined {
  if (sPerKm == null || !Number.isFinite(sPerKm) || sPerKm <= 0) return undefined;
  const m = Math.floor(sPerKm / 60);
  const s = Math.round(sPerKm % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function splitRows(splits: Split[]): Row[] {
  return splits.map((s) => ({
    n: s.index,
    dist_m: s.distM,
    dur_s: s.durS,
    pace_s_km: r0(s.paceSPerKm),
    pace_mmss: paceLabel(s.paceSPerKm),
    gap_s_km: r0(s.gapSPerKm),
    hr_bpm: r0(s.hrAvg),
    cad_spm: r0(s.cadAvg),
    pw_w: r0(s.pwAvg),
    ele_gain_m: r0(s.eleGainM),
    ele_loss_m: r0(s.eleLossM),
    partial: s.partial ? 1 : 0,
  }));
}

export function lapRows(laps: Lap[]): Row[] {
  return laps.map((l) => ({
    n: l.index + 1,
    start_s: r0(l.startT),
    dur_s: r0(l.durS),
    dist_m: r0(l.distM),
    pace_s_km: l.distM > 0 ? r0((l.durS / l.distM) * 1000) : undefined,
    hr_avg: r0(l.hrAvg),
    hr_max: r0(l.hrMax),
    kcal: r0(l.calories),
    intensity: l.intensity,
    trigger: l.trigger,
  }));
}

export function zoneRows(zones: ZoneBin[]): Row[] {
  return zones.map((z) => ({
    zone: z.zone,
    label: z.label,
    from: z.lowerInclusive,
    to: Number.isFinite(z.upperExclusive) ? z.upperExclusive : "",
    time_s: z.timeS,
    pct: r1(z.pct),
  }));
}

export function intervalRows(blocks: IntervalBlock[]): Row[] {
  return blocks.map((b) => ({
    n: b.index + 1,
    kind: b.kind,
    start_s: b.startT,
    dur_s: b.durS,
    dist_m: b.distM,
    pace_s_km: r0(b.paceSPerKm),
    pace_mmss: paceLabel(b.paceSPerKm),
    hr_avg: r0(b.hrAvg),
    hr_max: r0(b.hrMax),
    pw_w: r0(b.pwAvg),
  }));
}

export function streamRows(stream: Sample[], fields: Digest["fields"]): Row[] {
  return stream.map((s) => {
    const row: Row = { t_s: s.t };
    if (fields.dist) row.dist_m = s.dist;
    if (fields.ele) row.ele_m = s.ele;
    if (fields.hr) row.hr_bpm = s.hr;
    if (fields.cad) row.cad_spm = s.cad;
    if (fields.pw) row.pw_w = s.pw;
    if (fields.lat) {
      row.lat = s.lat;
      row.lon = s.lon;
    }
    if (fields.temp) row.temp_c = s.temp;
    return row;
  });
}

const GLOSSARY = [
  "t_s = secondes depuis le départ | dist_m = distance cumulée (m)",
  "pace_s_km = allure en secondes/km | gap_s_km = allure ajustée à la pente (Minetti 2002)",
  "hr_bpm = fréquence cardiaque | cad_spm = cadence (pas/min ou tr/min) | pw_w = puissance (W)",
  "decoupling_pct = dérive aérobie entre 1re et 2e moitié ; > 5 % = endurance limitante",
  "hr_source = capteur de FC estimé ; ne JAMAIS comparer des FC de sources différentes",
  "drift_applicable = no signifie que la séance ne permet pas ce calcul, pas qu'il vaut zéro",
];

/**
 * Assemble le bundle final. Un seul fichier, plusieurs blocs préfixés `##`.
 * Les LLM parsent ce format sans instruction particulière, et l'en-tête `#`
 * leur donne les unités — ce qui évite la moitié des contresens d'analyse.
 */
export interface BundleInsights {
  hrSource: { verdict: string; confidence: number; cadenceLockPct: number };
  drift: {
    decouplingPct: number | null;
    applicable: boolean;
    reason?: string;
    interpretation?: string;
    firstHalfHr?: number;
    secondHalfHr?: number;
    firstHalfPaceSPerKm?: number;
    secondHalfPaceSPerKm?: number;
    speedCvPct?: number;
    temperature?: { avgC?: number; fromWristSensor: boolean; caveat?: string; externalAvgC?: number };
  };
  adherence: {
    setDescription: string;
    grade: string;
    paceCvPct?: number;
    fadePctPerRep?: number;
    hrRiseBpm?: number;
    repsCompleted: number;
    verdicts: string[];
  }[];
  efforts: { distanceM: number; timeS: number; paceSPerKm: number }[];
  hrSpeed: { paceSPerKm: number; hrAvg: number; timeS: number }[];
}

export function buildBundle(
  digest: Digest,
  opts: { includeStream?: boolean; warnings?: string[]; insights?: BundleInsights } = {},
): string {
  const { session } = digest;
  const out: string[] = [];
  const block = (name: string, csv: string) => {
    if (csv.trim()) out.push(`## ${name}\n${csv.trim()}\n`);
  };

  out.push("# gps-digest v1 — résumé d'activité compacté pour analyse par un LLM");
  out.push(`# source: ${session.sourceFormat} | ${session.sampleCountRaw} points bruts -> ${digest.reduction.keptSamples} conservés`);
  for (const g of GLOSSARY) out.push(`# ${g}`);
  for (const w of opts.warnings ?? []) out.push(`# ⚠ ${w}`);
  out.push("");

  const sessionRows: Row[] = Object.entries({
    sport: session.sport,
    start_utc: session.startTimeUtc,
    device: session.device,
    dur_elapsed_s: session.durElapsedS,
    dur_moving_s: session.durMovingS,
    dist_m: session.distM,
    ele_gain_m: session.eleGainM,
    ele_loss_m: session.eleLossM,
    pace_avg_s_km: r0(session.paceAvgSPerKm),
    pace_avg_mmss: paceLabel(session.paceAvgSPerKm),
    gap_avg_s_km: r0(session.gapAvgSPerKm),
    speed_max_ms: r1(session.speedMaxMS),
    hr_avg: r0(session.hrAvg),
    hr_max: r0(session.hrMax),
    cad_avg: r0(session.cadAvg),
    pw_avg_w: r0(session.pwAvg),
    pw_normalized_w: r0(session.pwNormalizedW),
    intensity_factor: r2(session.intensityFactor),
    tss: r0(session.tss),
    decoupling_pct: r1(session.decouplingPct),
    efficiency_factor: r2(session.efficiencyFactor),
    temp_avg_c: r1(session.tempAvgC),
    sampling_hz: r1(session.samplingHz),
  })
    .filter(([, v]) => v != null && v !== "")
    .map(([key, value]) => ({ key, value: value as string | number }));

  block("session", toCsv(sessionRows, LLM_DIALECT, ["key", "value"]));

  if (digest.intervalSets.length) {
    block(
      "interval_sets",
      toCsv(
        digest.intervalSets.map((s) => ({
          description: s.description,
          reps: s.reps,
          avg_work_s: s.avgWorkDurS,
          avg_work_pace: paceLabel(s.avgWorkPaceSPerKm),
          avg_work_w: r0(s.avgWorkPwW),
          avg_rest_s: s.avgRestDurS,
        })),
      ),
    );
  }

  block("splits", toCsv(splitRows(digest.splits)));
  block("laps", toCsv(lapRows(digest.laps)));
  block("hr_zones", toCsv(zoneRows(digest.hrZones)));
  block("power_zones", toCsv(zoneRows(digest.powerZones)));
  block("pace_zones", toCsv(zoneRows(digest.paceZones)));
  block("intervals", toCsv(intervalRows(digest.intervals)));

  const ins = opts.insights;
  if (ins) {
    // Bloc analyse : ce que l'outil a déjà conclu. Le donner au modèle évite
    // qu'il refasse — mal — un travail déjà fait sur des données propres.
    const rows: Row[] = [
      { key: "hr_source", value: ins.hrSource.verdict },
      { key: "hr_source_confidence", value: r2(ins.hrSource.confidence) },
    ];
    if (ins.hrSource.cadenceLockPct > 2) {
      rows.push({ key: "hr_cadence_lock_pct", value: r1(ins.hrSource.cadenceLockPct) });
    }
    rows.push({ key: "drift_applicable", value: ins.drift.applicable ? "yes" : "no" });
    if (ins.drift.applicable) {
      rows.push(
        { key: "drift_pct", value: r1(ins.drift.decouplingPct ?? undefined) },
        { key: "drift_hr_first_half", value: r0(ins.drift.firstHalfHr) },
        { key: "drift_hr_second_half", value: r0(ins.drift.secondHalfHr) },
        { key: "drift_pace_first_half", value: paceLabel(ins.drift.firstHalfPaceSPerKm) },
        { key: "drift_pace_second_half", value: paceLabel(ins.drift.secondHalfPaceSPerKm) },
        { key: "effort_regularity_cv_pct", value: r1(ins.drift.speedCvPct) },
      );
    } else if (ins.drift.reason) {
      rows.push({ key: "drift_not_computed_because", value: ins.drift.reason });
    }
    if (ins.drift.temperature?.avgC != null) {
      rows.push({ key: "temp_avg_c", value: r1(ins.drift.temperature.avgC) });
      rows.push({
        key: "temp_source",
        value: ins.drift.temperature.fromWristSensor
          ? "capteur montre (surestime de 3 à 8 °C, ce n'est PAS la température de l'air)"
          : "externe",
      });
    }
    if (ins.drift.temperature?.externalAvgC != null) {
      rows.push({ key: "temp_air_c", value: r1(ins.drift.temperature.externalAvgC) });
    }
    block("analysis", toCsv(rows, LLM_DIALECT, ["key", "value"]));

    if (ins.adherence.length) {
      block(
        "block_adherence",
        toCsv(
          ins.adherence.map((a) => ({
            set: a.setDescription,
            grade: a.grade,
            reps_done: a.repsCompleted,
            pace_cv_pct: r1(a.paceCvPct),
            fade_total_pct:
              a.fadePctPerRep != null ? r1(a.fadePctPerRep * (a.repsCompleted - 1)) : undefined,
            hr_rise_bpm: r0(a.hrRiseBpm),
            notes: a.verdicts.join(" "),
          })),
        ),
      );
    }

    if (ins.efforts.length) {
      block(
        "best_efforts",
        toCsv(
          ins.efforts.map((e) => ({
            dist_m: Math.round(e.distanceM),
            time_s: r0(e.timeS),
            pace_mmss: paceLabel(e.paceSPerKm),
          })),
        ),
      );
    }

    if (ins.hrSpeed.length >= 3) {
      block(
        "hr_vs_pace",
        toCsv(
          ins.hrSpeed.map((p) => ({
            pace_mmss: paceLabel(p.paceSPerKm),
            pace_s_km: p.paceSPerKm,
            hr_bpm: r0(p.hrAvg),
            time_s: p.timeS,
          })),
        ),
      );
    }
  }

  if (opts.includeStream !== false && digest.stream.length) {
    block("stream", toCsv(streamRows(digest.stream, digest.fields)));
  }

  return out.join("\n");
}
