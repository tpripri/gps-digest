/**
 * Météo réelle au lieu et à l'heure de la séance.
 *
 * Le capteur d'une montre est porté au poignet et chauffé par le corps : il
 * surestime de 3 à 8 °C et ne dit rien de l'humidité ni du vent. Or la chaleur
 * est le premier facteur confondant de la dérive cardiaque — sans elle, on
 * attribue à la méforme ce qui n'est que le coût thermique normal.
 *
 * ── Confidentialité ──────────────────────────────────────────────────────
 * C'est la seule fonction de l'outil qui contacte un serveur tiers, et elle
 * contredit en apparence la promesse « rien ne quitte votre navigateur ».
 * Trois mesures la rendent acceptable :
 *
 *  1. **On envoie le milieu du parcours, jamais le départ.** Le point de
 *     départ, c'est le domicile ; le milieu, c'est un endroit quelconque.
 *  2. **Coordonnées arrondies à 2 décimales**, soit environ 1,1 km. La météo
 *     est un phénomène régional : on ne perd rien, et la requête cesse
 *     d'identifier un lieu précis.
 *  3. **Aucune donnée personnelle** : ni FC, ni allure, ni trace, ni identité.
 *     Une latitude arrondie, une longitude arrondie, une date.
 *
 * L'utilisateur doit pouvoir la couper d'un clic, et l'interface doit dire
 * clairement ce qui part. Une promesse de confidentialité ne se défend qu'en
 * étant exacte.
 *
 * Source : Open-Meteo (open-meteo.com), gratuit, sans clé d'API, CORS ouvert.
 * Archive ERA5 pour l'historique, API de prévision avec `past_days` pour les
 * jours récents que l'archive n'a pas encore intégrés.
 */

import type { Sample } from "./types.ts";
import { translator } from "./i18n.ts";

export interface WeatherObservation {
  tempC: number;
  /** Ressenti, qui intègre humidité, vent et rayonnement. */
  apparentC?: number;
  humidityPct?: number;
  windKmh?: number;
  dewPointC?: number;
  source: string;
  /** Coordonnées effectivement transmises, pour affichage honnête. */
  sentLat: number;
  sentLon: number;
}

/** Point médian du parcours : ni le domicile au départ, ni celui à l'arrivée. */
export function trackMidpoint(samples: Sample[]): { lat: number; lon: number } | null {
  const located = samples.filter((s) => s.lat != null && s.lon != null);
  if (!located.length) return null;
  const m = located[Math.floor(located.length / 2)];
  return { lat: m.lat!, lon: m.lon! };
}

/** ~1,1 km de résolution : suffisant pour la météo, insuffisant pour localiser. */
const round2 = (v: number) => Math.round(v * 100) / 100;

const HOURLY = "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,dew_point_2m";

interface OpenMeteoResponse {
  hourly?: {
    time?: string[];
    temperature_2m?: (number | null)[];
    relative_humidity_2m?: (number | null)[];
    apparent_temperature?: (number | null)[];
    wind_speed_10m?: (number | null)[];
    dew_point_2m?: (number | null)[];
  };
}

/** Moyenne des heures couvrant réellement la séance. */
function averageOverRun(
  data: OpenMeteoResponse,
  startIso: string,
  durationS: number,
): Omit<WeatherObservation, "source" | "sentLat" | "sentLon"> | null {
  const h = data.hourly;
  if (!h?.time?.length || !h.temperature_2m) return null;

  const start = Date.parse(startIso);
  const end = start + durationS * 1000;
  if (!Number.isFinite(start)) return null;

  const picked: number[] = [];
  for (let i = 0; i < h.time.length; i++) {
    // Open-Meteo renvoie des horodatages locaux sans fuseau quand on ne le
    // précise pas ; on demande donc UTC côté requête pour pouvoir comparer.
    const t = Date.parse(h.time[i] + "Z");
    if (!Number.isFinite(t)) continue;
    // Une heure compte si elle chevauche la séance.
    if (t + 3600_000 > start && t < end) picked.push(i);
  }
  // Séance plus courte qu'une heure : on prend l'heure la plus proche.
  if (!picked.length) {
    let bestIdx = -1;
    let bestGap = Infinity;
    for (let i = 0; i < h.time.length; i++) {
      const t = Date.parse(h.time[i] + "Z");
      const gap = Math.abs(t - start);
      if (Number.isFinite(t) && gap < bestGap) {
        bestGap = gap;
        bestIdx = i;
      }
    }
    if (bestIdx < 0 || bestGap > 7200_000) return null;
    picked.push(bestIdx);
  }

  const avg = (arr?: (number | null)[]) => {
    if (!arr) return undefined;
    const vals = picked.map((i) => arr[i]).filter((v): v is number => v != null);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : undefined;
  };

  const tempC = avg(h.temperature_2m);
  if (tempC == null) return null;

  return {
    tempC,
    apparentC: avg(h.apparent_temperature),
    humidityPct: avg(h.relative_humidity_2m),
    windKmh: avg(h.wind_speed_10m),
    dewPointC: avg(h.dew_point_2m),
  };
}

export interface WeatherOptions {
  /** Passer un fetch personnalisé pour les tests. */
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

/**
 * Récupère la météo d'une séance. Renvoie null en cas d'échec : la météo est
 * un enrichissement, jamais un prérequis — une panne réseau ne doit pas
 * empêcher l'analyse du fichier.
 */
export async function fetchWeather(
  samples: Sample[],
  startIso: string | undefined,
  durationS: number,
  opts: WeatherOptions = {},
): Promise<WeatherObservation | null> {
  if (!startIso) return null;
  const mid = trackMidpoint(samples);
  if (!mid) return null;

  const lat = round2(mid.lat);
  const lon = round2(mid.lon);
  const date = startIso.slice(0, 10);
  const doFetch = opts.fetchImpl ?? fetch;

  const common =
    `latitude=${lat}&longitude=${lon}&hourly=${HOURLY}` +
    `&timezone=UTC&wind_speed_unit=kmh`;

  // L'archive ERA5 est la référence, mais elle accuse environ cinq jours de
  // retard. Pour les séances récentes on passe par l'API de prévision, qui
  // conserve le passé proche.
  const ageDays = (Date.now() - Date.parse(startIso)) / 86400000;
  const urls = ageDays > 6
    ? [`https://archive-api.open-meteo.com/v1/archive?${common}&start_date=${date}&end_date=${date}`]
    : [
        `https://api.open-meteo.com/v1/forecast?${common}&start_date=${date}&end_date=${date}&past_days=14`,
        `https://archive-api.open-meteo.com/v1/archive?${common}&start_date=${date}&end_date=${date}`,
      ];

  for (const url of urls) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 8000);
      const res = await doFetch(url, { signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) continue;
      const data = (await res.json()) as OpenMeteoResponse;
      const obs = averageOverRun(data, startIso, durationS);
      if (obs) {
        return { ...obs, source: "Open-Meteo", sentLat: lat, sentLon: lon };
      }
    } catch {
      // Réseau coupé, CORS, quota : on passe à la source suivante.
    }
  }
  return null;
}

/**
 * Lecture de la contrainte thermique.
 *
 * Le ressenti compte plus que la température sèche : à 26 °C et 80 %
 * d'humidité, l'évaporation de la sueur est freinée et la contrainte dépasse
 * celle de 30 °C en air sec.
 */
export function heatStressNote(obs: WeatherObservation, locale?: string): string | undefined {
  const tr = translator(locale);
  const t = obs.apparentC ?? obs.tempC;
  const humid = obs.humidityPct != null && obs.humidityPct >= 70
    ? tr("heat.humid", { pct: Math.round(obs.humidityPct!) })
    : "";

  if (t >= 30) {
    return tr("heat.strong", { temp: Math.round(t), humid });
  }
  if (t >= 24) {
    return tr("heat.notable", { temp: Math.round(t), humid });
  }
  if (t <= 5) {
    return tr("heat.cold", { temp: Math.round(t) });
  }
  return undefined;
}
