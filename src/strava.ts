/**
 * Adaptateur Strava.
 *
 * Le MCP Strava expose `get_activity_streams` avec exactement les canaux dont
 * le pipeline a besoin : time, distance, heart_rate, cadence, watts, altitude,
 * velocity_smooth, temp, location, moving. La conversion est donc directe et
 * tout le reste du traitement — analyse, dérive, capteur, réduction — est
 * partagé avec les fichiers déposés à la main.
 *
 * Trois différences avec un fichier de montre, qui ont des conséquences :
 *
 *  1. Strava lisse ses flux côté serveur. La détection de capteur de FC est
 *     donc **moins fiable** qu'à partir d'un FIT brut : les micro-variations
 *     qui distinguent une ceinture d'un capteur optique sont en partie
 *     effacées. On le signale au lieu de rendre un verdict trop confiant.
 *
 *  2. La cadence course est en tours/min (une jambe), comme partout ailleurs.
 *
 *  3. Le paramètre `resolution` permet de demander moins de points, mais mieux
 *     vaut demander le flux complet et laisser la réduction adaptative faire le
 *     travail : elle préserve les ruptures, un sous-échantillonnage serveur non.
 */

import { sanitizeSamples, fillDistance } from "./geo.ts";
import type { Activity, Lap, Sample, Sport } from "./types.ts";

/** Réponse de `Strava:get_activity_streams`, canaux optionnels. */
export interface StravaStreams {
  time?: number[];
  distance?: number[];
  heart_rate?: number[];
  cadence?: number[];
  watts?: number[];
  altitude?: number[];
  velocity_smooth?: number[];
  grade_smooth?: number[];
  temp?: number[];
  moving?: boolean[];
  location?: [number, number][];
}

/** Sous-ensemble utile de `Strava:list_activities` / `get_activity_performance`. */
export interface StravaActivityMeta {
  id: string | number;
  name?: string;
  sport_type?: string;
  start_date?: string;
  gear_id?: string;
  device_name?: string;
  laps?: {
    lap_index?: number;
    elapsed_time?: number;
    moving_time?: number;
    distance?: number;
    average_heartrate?: number;
    max_heartrate?: number;
    start_index?: number;
  }[];
}

const SPORT_MAP: Record<string, Sport> = {
  Run: "running",
  TrailRun: "running",
  VirtualRun: "running",
  Ride: "cycling",
  VirtualRide: "cycling",
  GravelRide: "cycling",
  MountainBikeRide: "cycling",
  Swim: "swimming",
  Hike: "hiking",
  Walk: "hiking",
};

export function fromStravaStreams(meta: StravaActivityMeta, streams: StravaStreams): Activity {
  const time = streams.time ?? [];
  const n = time.length;
  if (!n) throw new Error(`Activité Strava ${meta.id} : flux temporel absent.`);

  const sport = SPORT_MAP[meta.sport_type ?? ""] ?? "other";
  const at = <T>(arr: T[] | undefined, i: number): T | undefined => arr?.[i];

  const samples: Sample[] = [];
  for (let i = 0; i < n; i++) {
    const loc = at(streams.location, i);
    samples.push({
      t: time[i],
      lat: loc?.[0],
      lon: loc?.[1],
      ele: at(streams.altitude, i),
      dist: at(streams.distance, i),
      hr: at(streams.heart_rate, i),
      cad: at(streams.cadence, i),
      pw: at(streams.watts, i),
      temp: at(streams.temp, i),
    });
  }

  sanitizeSamples(samples);
  if (samples.every((s) => s.dist == null)) fillDistance(samples);

  // Comme en TCX et en GPX : Strava renvoie la cadence course par jambe.
  if (sport === "running") {
    for (const s of samples) if (s.cad != null && s.cad < 130) s.cad *= 2;
  }

  const laps: Lap[] = (meta.laps ?? []).map((l, i) => ({
    index: i,
    startT: l.start_index != null ? (time[l.start_index] ?? 0) : 0,
    durS: l.moving_time ?? l.elapsed_time ?? 0,
    distM: l.distance ?? 0,
    hrAvg: l.average_heartrate,
    hrMax: l.max_heartrate,
  }));

  return {
    sport,
    startTime: meta.start_date,
    device: meta.device_name ?? "Strava",
    source: "gpx", // flux reconstitué : ni TCX, ni FIT natif
    samples,
    laps,
  };
}

/**
 * Détection de capteur de FC : Strava lisse ses flux, ce qui atténue les
 * signatures. Cet indice permet à `analyzeHrSource` d'être plus prudent.
 */
export const STRAVA_SENSOR_CAVEAT =
  "Flux Strava : lissage serveur. La détection du capteur de FC est moins fiable qu'à partir d'un fichier FIT d'origine.";

/**
 * Séquence d'appels recommandée côté application.
 *
 * Volontairement en deux temps : `list_activities` est peu coûteux et permet à
 * l'utilisateur de choisir. Ne jamais tirer les flux de toutes les activités
 * d'un coup — c'est un appel par activité, et le quota de l'API Strava est
 * strict.
 *
 * ```ts
 * // 1. Lister — un seul appel, l'utilisateur sélectionne
 * const list = await strava.list_activities({
 *   range_start: "2026-06-01T00:00:00",
 *   range_end:   "2026-08-21T23:59:59",
 * });
 *
 * // 2. Pour chaque activité retenue, deux appels
 * const perf    = await strava.get_activity_performance({ activity_id: id });
 * const streams = await strava.get_activity_streams({
 *   activity_id: id,
 *   streams: ["time","distance","heart_rate","cadence","watts",
 *             "altitude","velocity_smooth","temp","location"],
 * });
 *
 * // 3. Même pipeline que pour un fichier déposé
 * const activity = fromStravaStreams({ ...meta, laps: perf.laps }, streams);
 * ```
 *
 * Trois points à vérifier avant de publier une intégration Strava :
 * le quota (limites par 15 min et par jour), les conditions d'utilisation de
 * l'API — restrictives sur le stockage et l'affichage des données dérivées —
 * et l'obligation d'afficher la mention « Powered by Strava ».
 */
export const STRAVA_STREAM_REQUEST = [
  "time",
  "distance",
  "heart_rate",
  "cadence",
  "watts",
  "altitude",
  "velocity_smooth",
  "temp",
  "location",
] as const;
