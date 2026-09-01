/**
 * Adaptateur FIT (Garmin, Coros, Wahoo, Suunto, Polar récents).
 *
 * À ne surtout pas négliger : c'est le format **natif** de la quasi-totalité
 * des montres. Il est déjà 5 à 10× plus compact que le TCX, plus riche (events,
 * champs développeur type Stryd/Running Dynamics) et beaucoup d'utilisateurs
 * n'ont pas de TCX sous la main.
 *
 * Dépendance : `@garmin/fitsdk` (SDK officiel, MIT-like, tourne dans le
 * navigateur). Import dynamique pour ne pas l'embarquer si l'utilisateur ne
 * dépose que du TCX/GPX.
 */

import { fillDistance, sanitizeSamples } from "./geo.ts";
import type { Activity, Lap, Sample, Sport } from "./types.ts";

const SEMICIRCLE = 180 / 2 ** 31;

/**
 * Piège classique : selon les options du décodeur, les coordonnées sortent en
 * semicercles (entiers jusqu'à ±2^31) ou déjà en degrés. On détecte au lieu de
 * supposer — c'est la cause n°1 de traces "au milieu de l'Atlantique".
 */
function toDegrees(v: number | undefined): number | undefined {
  if (v == null || !Number.isFinite(v)) return undefined;
  return Math.abs(v) > 180 ? v * SEMICIRCLE : v;
}

const SPORT_MAP: Record<string, Sport> = {
  running: "running",
  cycling: "cycling",
  swimming: "swimming",
  hiking: "hiking",
  walking: "hiking",
};

interface FitRecord {
  timestamp?: Date | number;
  positionLat?: number;
  positionLong?: number;
  altitude?: number;
  enhancedAltitude?: number;
  distance?: number;
  heartRate?: number;
  cadence?: number;
  fractionalCadence?: number;
  power?: number;
  temperature?: number;
}

export interface FitMessages {
  recordMesgs?: FitRecord[];
  lapMesgs?: Record<string, unknown>[];
  sessionMesgs?: Record<string, unknown>[];
  fileIdMesgs?: Record<string, unknown>[];
}

function ts(v: Date | number | undefined): number | undefined {
  if (v == null) return undefined;
  const ms = v instanceof Date ? v.getTime() : v * 1000;
  return Number.isFinite(ms) ? ms / 1000 : undefined;
}

/** Convertit la sortie du décodeur FIT vers le modèle interne. */
export function fromFitMessages(m: FitMessages): Activity {
  const records = m.recordMesgs ?? [];
  const samples: Sample[] = [];
  let t0: number | undefined;

  for (const r of records) {
    const abs = ts(r.timestamp);
    if (abs == null) continue;
    if (t0 == null) t0 = abs;

    // La cadence FIT est en tours/min ; en course, un tour = 2 pas.
    let cad = r.cadence;
    if (cad != null && r.fractionalCadence != null) cad += r.fractionalCadence;

    samples.push({
      t: Math.round((abs - t0) * 10) / 10,
      lat: toDegrees(r.positionLat),
      lon: toDegrees(r.positionLong),
      ele: r.enhancedAltitude ?? r.altitude,
      dist: r.distance,
      hr: r.heartRate,
      cad,
      pw: r.power,
      temp: r.temperature,
    });
  }

  const laps: Lap[] = (m.lapMesgs ?? []).map((l, i) => {
    const start = ts(l.startTime as Date | number | undefined);
    return {
      index: i,
      startT: start != null && t0 != null ? Math.max(0, start - t0) : 0,
      durS: (l.totalTimerTime as number) ?? (l.totalElapsedTime as number) ?? 0,
      distM: (l.totalDistance as number) ?? 0,
      hrAvg: l.avgHeartRate as number | undefined,
      hrMax: l.maxHeartRate as number | undefined,
      calories: l.totalCalories as number | undefined,
      intensity: l.intensity as string | undefined,
      trigger: l.lapTrigger as string | undefined,
    };
  });

  const session = (m.sessionMesgs ?? [])[0] ?? {};
  const rawSport = String(session.sport ?? "").toLowerCase();
  const device = (m.fileIdMesgs ?? [])[0]?.manufacturer as string | undefined;

  sanitizeSamples(samples);
  const sport = SPORT_MAP[rawSport] ?? "other";
  if (sport === "running") {
    for (const s of samples) if (s.cad != null && s.cad < 130) s.cad *= 2;
  }
  if (samples.length && samples[0].dist == null) fillDistance(samples);

  return {
    sport,
    startTime: t0 != null ? new Date(t0 * 1000).toISOString() : undefined,
    device,
    source: "fit",
    samples,
    laps,
  };
}

/**
 * Surface du SDK effectivement utilisée ici.
 *
 * On la déclare nous-mêmes plutôt que de dépendre des typages publiés : sous
 * la résolution NodeNext, le paquet expose son contenu via `module.exports`,
 * et TypeScript ne voit alors ni `Decoder` ni `Stream` comme exports nommés.
 * Décrire le contrat minimal dont on a besoin est plus robuste qu'attendre
 * que les typages amont soient corrigés.
 */
interface FitStream {
  readonly __brand?: "fit-stream";
}

interface FitSdk {
  Stream: { fromByteArray(bytes: number[]): FitStream };
  Decoder: new (stream: FitStream) => {
    isFIT(): boolean;
    checkIntegrity(): boolean;
    read(options?: Record<string, unknown>): { messages: unknown; errors?: unknown[] };
  };
}

/** Décode un .fit brut. Nécessite `npm i @garmin/fitsdk`. */
export async function parseFit(buf: ArrayBuffer | Uint8Array): Promise<Activity> {
  const mod = (await import("@garmin/fitsdk")) as unknown as FitSdk & { default?: FitSdk };
  // Paquet CommonJS importé depuis un module ESM : selon que Node parvient ou
  // non à détecter les exports nommés, le contenu se trouve à la racine ou
  // sous `default`. Tester les deux évite un « Decoder is not a constructor »
  // qui ne se manifesterait qu'à l'exécution, sur la machine de l'utilisateur.
  const sdk: FitSdk = typeof mod.Decoder === "function" ? mod : (mod.default as FitSdk);
  if (!sdk || typeof sdk.Decoder !== "function") {
    throw new Error("SDK FIT introuvable ou incompatible. Installer @garmin/fitsdk.");
  }

  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  const stream = sdk.Stream.fromByteArray(Array.from(bytes));
  const decoder = new sdk.Decoder(stream);
  if (!decoder.isFIT() || !decoder.checkIntegrity()) {
    throw new Error("Fichier FIT invalide ou corrompu.");
  }
  const { messages, errors } = decoder.read({ mesgListener: undefined });
  if (errors?.length) console.warn("FIT: messages ignorés", errors.length);
  return fromFitMessages(messages as FitMessages);
}
