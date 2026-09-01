export * from "./types.ts";
export { parseTcx } from "./parse-tcx.ts";
export { parseGpx } from "./parse-gpx.ts";
export { parseFit, fromFitMessages } from "./parse-fit.ts";
export { trimPrivacyZone, obfuscateCoordinates } from "./privacy.ts";
export { computeSplits, detectIntervals, hrZones, paceZones, powerZones, summarize } from "./analyze.ts";
export { selectIndices, reduceSamples } from "./reduce.ts";
export {
  toCsv,
  buildBundle,
  estimateTokens,
  paceLabel,
  LLM_DIALECT,
  EXCEL_EU_DIALECT,
  splitRows,
  lapRows,
  zoneRows,
  intervalRows,
  streamRows,
} from "./serialize.ts";
export { digestFile, buildDigest, buildFull, digestActivity, finalize, detectFormat, parseAny } from "./digest.ts";
export type { Insights, DigestResult, BuildResult } from "./digest.ts";

// Analyses autonomes
export { analyzeHrSource, hrSourceLabel } from "./sensor.ts";
export type { HrSource, HrSourceAnalysis } from "./sensor.ts";
export { analyzeDrift, hrSpeedProfile, temperatureContext } from "./drift.ts";
export type { DriftAnalysis, TemperatureContext, HrSpeedPoint } from "./drift.ts";
export { analyzeAdherence, inferTarget } from "./adherence.ts";
export type { AdherenceReport, BlockTarget, RepReport } from "./adherence.ts";
export {
  bestEfforts, fitCriticalSpeed, projectRaces, riegel,
  calibrateRiegelExponent, formatDuration,
  STANDARD_DISTANCES, RACE_LABELS,
} from "./efforts.ts";
export type { BestEffort, CriticalSpeedModel, RaceProjection } from "./efforts.ts";

// Multi-fichiers
export { analyzeBatch, buildBatchBundle } from "./batch.ts";
export type { BatchAnalysis, FileAnalysis, SensorChange, WeekBucket } from "./batch.ts";

// Strava
export { fromStravaStreams, STRAVA_STREAM_REQUEST, STRAVA_SENSOR_CAVEAT } from "./strava.ts";
export type { StravaStreams, StravaActivityMeta } from "./strava.ts";
