/** Orchestration : fichier brut -> digest calibré sur un budget de tokens. */

import { parseTcx } from "./parse-tcx.ts";
import { parseGpx } from "./parse-gpx.ts";
import { parseFit, parseFitBuffer, type FitExtras } from "./parse-fit.ts";
import { trimPrivacyZone, rebase } from "./privacy.ts";
import { fillDistance } from "./geo.ts";
import {
  computeSplits,
  detectIntervals,
  hrZones,
  paceZones,
  powerZones,
  summarize,
  speedSeries,
  gradeSeries,
  gapSeries,
} from "./analyze.ts";
import { reduceSamples } from "./reduce.ts";
import { buildBundle, estimateTokens, streamRows, toCsv, LLM_DIALECT } from "./serialize.ts";
import { analyzeHrSource, hrSourceLabel, type HrSourceAnalysis } from "./sensor.ts";
import { classifyActivity, defaultSplitUnit, detectErg, type Classification, type ErgAnalysis } from "./classify.ts";
import { analyzeSwim, type SwimAnalysis } from "./swim.ts";
import { analyzeDrift, hrSpeedProfile, type DriftAnalysis, type HrSpeedPoint } from "./drift.ts";
import { bestEfforts, type BestEffort } from "./efforts.ts";
import { analyzeAdherence, inferTarget, type AdherenceReport, type BlockTarget } from "./adherence.ts";
import { gradeLabel } from "./adherence.ts";
import { translator } from "./i18n.ts";
import type { Activity, Digest, DigestOptions, FieldPresence, Sample } from "./types.ts";

export function detectFormat(filename: string, head: string): "tcx" | "gpx" | "fit" | null {
  const ext = filename.toLowerCase().split(".").pop();
  if (ext === "fit") return "fit";
  if (ext === "tcx") return "tcx";
  if (ext === "gpx") return "gpx";
  // Extension absente ou trompeuse (export renommé) : on regarde le contenu.
  if (/TrainingCenterDatabase/i.test(head)) return "tcx";
  if (/<gpx[\s>]/i.test(head)) return "gpx";
  return null;
}

export async function parseAny(
  filename: string,
  data: string | ArrayBuffer | Uint8Array,
  locale?: string,
): Promise<Activity> {
  if (typeof data !== "string") {
    return parseFit(data, locale);
  }
  const fmt = detectFormat(filename, data.slice(0, 2048));
  if (fmt === "tcx") return parseTcx(data);
  if (fmt === "gpx") {
    // Un GPX sans horodatage est un itinéraire planifié (dossier « routes » de
    // l'archive Strava, trace préparée pour la montre) : l'analyser comme une
    // séance fabriquerait une fausse sortie de quelques secondes.
    const activity = parseGpx(data);
    if (!activity.startTime) throw new Error(translator(locale)("digest.errNoTime", { filename }));
    return activity;
  }
  throw new Error(translator(locale)("digest.errFormat", { filename }));
}



function presence(samples: Sample[]): FieldPresence {
  const has = (f: (s: Sample) => unknown) => samples.some((s) => f(s) != null);
  return {
    lat: has((s) => s.lat),
    ele: has((s) => s.ele),
    dist: has((s) => s.dist),
    hr: has((s) => s.hr),
    cad: has((s) => s.cad),
    pw: has((s) => s.pw),
    temp: has((s) => s.temp),
  };
}

/** Coût moyen d'une ligne du flux, en caractères, selon les colonnes actives. */
function bytesPerRow(f: FieldPresence): number {
  let n = 5; // t_s
  if (f.dist) n += 6;
  if (f.ele) n += 6;
  if (f.hr) n += 4;
  if (f.cad) n += 4;
  if (f.pw) n += 4;
  if (f.temp) n += 3;
  if (f.lat) n += 21;
  return n + 2; // séparateurs + saut de ligne
}

export interface BuildResult {
  digest: Digest;
  samples: Sample[];
  speed: number[];
  insights: Insights;
}

export function buildDigest(activity: Activity, opts: DigestOptions = {}): Digest {
  return buildFull(activity, opts).digest;
}

export function buildFull(activity: Activity, opts: DigestOptions = {}): BuildResult {
  const {
    athlete,
    streamTokenBudget = 8000,
    splitUnitM = 1000,
    privacyRadiusM = 0,
    dropCoordinates = false,
    detectIntervals: wantIntervals = true,
    locale,
  } = opts;

  let samples = activity.samples;
  if (!samples.length) throw new Error(translator(locale)("digest.errNoPoints"));

  if (privacyRadiusM > 0) {
    samples = rebase(activity, trimPrivacyZone(samples, privacyRadiusM));
    if (samples.some((s) => s.dist == null)) fillDistance(samples);
  }

  const speed = speedSeries(samples);
  const grade = gradeSeries(samples);
  const gap = gapSeries(samples, speed, grade);

  // La classification passe avant tout le reste : elle décide quelles analyses
  // ont un sens sur cette séance. Le champ Sport du fichier n'y suffit pas.
  const classification = classifyActivity({ ...activity, samples }, speed, locale);
  const sport = classification.sport;
  const swim =
    classification.tier === "swim"
      ? analyzeSwim(
          { ...activity, samples },
          classification.poolSwim ?? true,
          classification.poolLengthM ?? opts.fitExtras?.poolLengthM,
          opts.fitExtras?.lengths,
          locale,
        )
      : undefined;

  const session = summarize(
    samples,
    activity.sport,
    activity.startTime,
    activity.device,
    activity.source,
    athlete,
    { gainM: opts.fitExtras?.totalAscentM, lossM: opts.fitExtras?.totalDescentM },
  );

  session.tier = classification.tier;
  session.reclassified = classification.reclassified;
  session.declaredSport = classification.declaredSport;
  session.classificationReasons = classification.reasons;
  session.sport = sport;

  // Le découpage suit le sport : 1 km à pied, 5 km à vélo, 100 m en nage.
  const unit = opts.splitUnitM ?? defaultSplitUnit(sport);

  // Hors endurance, on ne produit ni splits ni séries : les chiffres seraient
  // formellement corrects et trompeurs. Seule la charge est conservée.
  const analysable = classification.tier === "full";
  const splits = analysable ? computeSplits(samples, unit, speed, gap) : [];
  const { blocks, sets } = analysable && wantIntervals
    ? detectIntervals(samples, speed, activity.laps, 20, sport, locale)
    : { blocks: [], sets: [] };
  const erg = sport === "cycling" ? detectErg(samples, blocks, locale) : undefined;

  const fields = presence(samples);
  if (dropCoordinates) fields.lat = false;

  // Ancres : bornes de splits, de laps et d'intervalles. Ces points doivent
  // survivre à la réduction, sinon les tableaux et le flux se contredisent.
  const anchors: number[] = [];
  const indexAtTime = (t: number) => {
    let lo = 0;
    let hi = samples.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (samples[mid].t < t) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };
  for (const s of splits) anchors.push(indexAtTime(s.startT));
  for (const l of activity.laps) anchors.push(indexAtTime(l.startT));
  for (const b of blocks) anchors.push(indexAtTime(b.startT), indexAtTime(b.startT + b.durS));

  // Budget de lignes déduit du budget de tokens, puis une passe de correction :
  // l'estimation a priori se trompe de 10-20 % selon les colonnes réellement
  // remplies (capteurs qui décrochent, GPS en tunnel...).
  const perRow = bytesPerRow(fields);
  let rowBudget = streamTokenBudget > 0
    ? Math.max(20, Math.floor((streamTokenBudget * 3.2) / perRow))
    : 0;

  let stream: Sample[] = [];
  if (rowBudget > 0) {
    stream = reduceSamples({ samples, speed, anchors }, rowBudget, { dropCoordinates });
    const actual = estimateTokens(toCsv(streamRows(stream, fields), LLM_DIALECT));
    if (actual > streamTokenBudget * 1.1) {
      rowBudget = Math.max(20, Math.floor(rowBudget * (streamTokenBudget / actual) * 0.95));
      stream = reduceSamples({ samples, speed, anchors }, rowBudget, { dropCoordinates });
    }
  }

  const digest: Digest = {
    session,
    laps: activity.laps,
    splits,
    hrZones: hrZones(samples, athlete, locale),
    paceZones: paceZones(samples, speed, athlete, locale),
    powerZones: powerZones(samples, athlete, locale),
    intervals: blocks,
    intervalSets: sets,
    stream,
    fields,
    reduction: {
      rawSamples: activity.samples.length,
      keptSamples: stream.length,
      rawBytes: 0,
      outputBytes: 0,
      estimatedTokens: 0,
      ratio: 0,
    },
  };

  // --- Analyses autonomes, lisibles sans passer par un LLM ---
  const hrSource = analyzeHrSource(samples, speed, sport, opts.hrSensorHint, locale);
  const drift = analyzeDrift(samples, speed, sport, {
    warmupS: opts.driftWarmupS ?? 600,
    // Les segments où la FC est verrouillée sur la cadence sont faux. Les
    // inclure dans un calcul de dérive reviendrait à mesurer un artefact.
    excludeRanges: hrSource.suspectRanges,
    wristMountedTemperature: true,
    externalTemperature: opts.externalTemperature,
    locale,
  });
  // Correction : chaque série ne doit voir QUE ses propres blocs. En lui
  // passant la totalité, tous les rapports sortaient avec le même coefficient
  // de variation et la même récupération — chiffres identiques donc forcément
  // faux dès qu'une séance contenait plus d'une série.
  const adherence = !analysable ? [] : sets.map((set, i) => {
    const own = set.workBlockIndices?.length
      ? blocks.filter(
          (b) =>
            set.workBlockIndices!.includes(b.index) ||
            (b.kind === "rest" &&
              b.startT >= Math.min(...set.workBlockIndices!.map((k) => blocks.find((x) => x.index === k)?.startT ?? Infinity)) &&
              b.startT <= Math.max(...set.workBlockIndices!.map((k) => {
                const w = blocks.find((x) => x.index === k);
                return w ? w.startT + w.durS : -Infinity;
              }))),
        )
      : blocks;
    return analyzeAdherence(
      own, set, opts.blockTargets?.[i] ?? inferTarget(set, own, sport), samples, sport, locale,
    );
  });

  return {
    digest,
    samples,
    speed,
    insights: {
      classification,
      swim,
      erg,
      hrSource,
      drift,
      adherence,
      // Les meilleurs efforts alimentent le modèle de vitesse critique : les
      // calculer hors course à pied mélangerait des référentiels incomparables.
      efforts: sport === "running" && analysable ? bestEfforts(samples) : [],
      hrSpeed: hrSpeedProfile(samples, speed),
    },
  };
}

/** Analyses lisibles telles quelles, sans passer par un LLM. */
export interface Insights {
  classification: Classification;
  swim?: SwimAnalysis;
  erg?: ErgAnalysis;
  hrSource: HrSourceAnalysis;
  drift: DriftAnalysis;
  adherence: AdherenceReport[];
  efforts: BestEffort[];
  hrSpeed: HrSpeedPoint[];
}

export interface DigestResult {
  digest: Digest;
  /** Bundle multi-blocs prêt à coller dans Gemini / ChatGPT / Claude. */
  bundle: string;
  warnings: string[];
  insights: Insights;
  /** Conservé pour l'agrégation multi-fichiers. */
  samples: Sample[];
}

/** Pipeline complet. `rawBytes` sert à afficher le taux de compaction réel. */
export function finalize(
  built: BuildResult,
  rawBytes: number,
  opts: DigestOptions = {},
): DigestResult {
  const { digest, insights, samples } = built;
  const locale = opts.locale;
  const tr = translator(locale);
  const warnings: string[] = [];
  if (!opts.athlete?.maxHr && !opts.athlete?.lthr && digest.hrZones.length) {
    warnings.push(tr("digest.warnZonesObserved"));
  }
  if (!opts.athlete?.ftpW && digest.session.pwAvg != null) {
    warnings.push(tr("digest.warnNoFtp"));
  }
  if (!opts.privacyRadiusM && digest.fields.lat) {
    warnings.push(tr("digest.warnCoords"));
  }

  if (insights.hrSource.verdict !== "unknown") {
    warnings.push(
      tr("digest.warnHrSource", {
        label: hrSourceLabel(insights.hrSource.verdict, locale),
        confidence: insights.hrSource.confidence.toFixed(2),
      }),
    );
  }
  if (!insights.drift.applicable && insights.drift.reason) {
    warnings.push(tr("digest.warnDrift", { reason: insights.drift.reason }));
  }

  // Le bundle écrit la note telle quelle : on lui passe le libellé traduit.
  const bundle = buildBundle(digest, {
    warnings,
    insights: {
      ...insights,
      adherence: insights.adherence.map((a) => ({ ...a, grade: gradeLabel(a.grade, locale) })),
    },
    locale,
  });
  digest.reduction.rawBytes = rawBytes;
  digest.reduction.outputBytes = bundle.length;
  digest.reduction.estimatedTokens = estimateTokens(bundle);
  digest.reduction.ratio = rawBytes > 0 ? 1 - bundle.length / rawBytes : 0;

  return { digest, bundle, warnings, insights, samples };
}

export async function digestFile(
  filename: string,
  data: string | ArrayBuffer | Uint8Array,
  opts: DigestOptions = {},
): Promise<DigestResult> {
  const activity = await parseAny(filename, data, opts.locale);
  const rawBytes = typeof data === "string" ? data.length : data.byteLength;
  return finalize(buildFull(activity, opts), rawBytes, opts);
}

/** Même pipeline, à partir d'une activité déjà construite (flux Strava). */
export function digestActivity(activity: Activity, opts: DigestOptions = {}): DigestResult {
  return finalize(buildFull(activity, opts), 0, opts);
}
