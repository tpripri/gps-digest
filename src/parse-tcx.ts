/**
 * Parseur TCX (Garmin Training Center Database v2).
 *
 * Le TCX est le format le plus verbeux du lot : ~350 octets par point dont
 * ~90 % de balises. C'est précisément pour ça qu'il ne rentre pas dans un LLM.
 * On extrait aussi les <Lap>, déjà présents nativement : c'est de l'information
 * de haute densité obtenue gratuitement.
 */

import { sax, num } from "./xml.ts";
import { fillDistance, sanitizeSamples } from "./geo.ts";
import type { Activity, Lap, Sample, Sport } from "./types.ts";

const SPORT_MAP: Record<string, Sport> = {
  running: "running",
  biking: "cycling",
  cycling: "cycling",
  swimming: "swimming",
  hiking: "hiking",
  other: "other",
};

export function parseTcx(xml: string): Activity {
  const samples: Sample[] = [];
  const laps: Lap[] = [];

  let sport: Sport = "other";
  let device: string | undefined;
  let t0: number | undefined;

  const path: string[] = [];
  let buf = "";

  // État du trackpoint courant
  let tp: (Sample & { time?: number }) | null = null;
  // État du lap courant
  let lap: Partial<Lap> & { startIso?: string } | null = null;
  let inLapHrAvg = false;
  let inLapHrMax = false;

  const at = (depth: number) => path[path.length - depth] ?? "";

  sax(xml, {
    open(name, attrs) {
      path.push(name);
      buf = "";

      switch (name) {
        case "Activity":
          if (attrs.Sport) sport = SPORT_MAP[attrs.Sport.toLowerCase()] ?? "other";
          break;
        case "Lap":
          lap = { index: laps.length, startIso: attrs.StartTime };
          break;
        case "Trackpoint":
          tp = {} as Sample & { time?: number };
          break;
        case "AverageHeartRateBpm":
          inLapHrAvg = true;
          break;
        case "MaximumHeartRateBpm":
          inLapHrMax = true;
          break;
      }
    },

    text(v) {
      buf += v;
    },

    close(name) {
      const value = buf.trim();
      buf = "";

      switch (name) {
        // ---- Trackpoint ----
        case "Time":
          if (tp) {
            const ms = Date.parse(value);
            if (Number.isFinite(ms)) tp.time = ms / 1000;
          }
          break;
        case "LatitudeDegrees":
          if (tp) tp.lat = num(value);
          break;
        case "LongitudeDegrees":
          if (tp) tp.lon = num(value);
          break;
        case "AltitudeMeters":
          if (tp) tp.ele = num(value);
          break;
        case "DistanceMeters":
          if (tp) tp.dist = num(value);
          else if (lap) lap.distM = num(value);
          break;
        case "Cadence":
          if (tp) tp.cad = num(value);
          break;
        case "RunCadence":
          // Garmin stocke la cadence course en pas/min par jambe.
          if (tp) {
            const c = num(value);
            if (c != null) tp.cad = c * 2;
          }
          break;
        case "Watts":
          if (tp) tp.pw = num(value);
          break;
        case "Temp":
        case "TemperatureCelsius":
          if (tp) tp.temp = num(value);
          break;
        case "Value":
          // <HeartRateBpm><Value>. La sémantique dépend du parent.
          if (inLapHrAvg && lap) lap.hrAvg = num(value);
          else if (inLapHrMax && lap) lap.hrMax = num(value);
          else if (tp) tp.hr = num(value);
          break;
        case "AverageHeartRateBpm":
          inLapHrAvg = false;
          break;
        case "MaximumHeartRateBpm":
          inLapHrMax = false;
          break;

        case "Trackpoint": {
          if (tp && tp.time != null) {
            if (t0 == null) t0 = tp.time;
            const { time, ...rest } = tp;
            // Un trackpoint sans position ni capteur ne sert à rien.
            if (rest.lat != null || rest.dist != null || rest.hr != null || rest.ele != null) {
              samples.push({ ...rest, t: Math.round((time - t0) * 10) / 10 });
            }
          }
          tp = null;
          break;
        }

        // ---- Lap ----
        case "TotalTimeSeconds":
          if (lap) lap.durS = num(value);
          break;
        case "Calories":
          if (lap) lap.calories = num(value);
          break;
        case "Intensity":
          if (lap) lap.intensity = value;
          break;
        case "TriggerMethod":
          if (lap) lap.trigger = value;
          break;
        case "Lap": {
          if (lap) {
            const ms = lap.startIso ? Date.parse(lap.startIso) : NaN;
            const abs = Number.isFinite(ms) ? ms / 1000 : undefined;
            laps.push({
              index: laps.length,
              startT: abs != null && t0 != null ? Math.max(0, abs - t0) : 0,
              durS: lap.durS ?? 0,
              distM: lap.distM ?? 0,
              hrAvg: lap.hrAvg,
              hrMax: lap.hrMax,
              calories: lap.calories,
              intensity: lap.intensity,
              trigger: lap.trigger,
            });
          }
          lap = null;
          break;
        }

        case "Name":
          if (at(2) === "Creator" || at(2) === "Author") device ??= value;
          break;
      }

      path.pop();
    },
  });

  samples.sort((a, b) => a.t - b.t);
  sanitizeSamples(samples);
  if (samples.length && samples[0].dist == null) fillDistance(samples);

  return {
    sport,
    startTime: t0 != null ? new Date(t0 * 1000).toISOString() : undefined,
    device,
    source: "tcx",
    samples,
    laps,
  };
}
