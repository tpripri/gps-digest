/** Géodésie et lissage de séries temporelles irrégulières. */

import type { Sample } from "./types.ts";

const R = 6371008.8; // rayon moyen terrestre, m (IUGG)

export function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const dφ = φ2 - φ1;
  const dλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(dλ / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

/**
 * Remplit `dist` par intégration haversine quand le fichier ne la fournit pas
 * (cas systématique du GPX). Un seuil de 0,3 m évite d'accumuler le bruit GPS
 * à l'arrêt, qui gonfle sinon la distance de plusieurs centaines de mètres.
 */
export function fillDistance(samples: Sample[]): void {
  let cum = 0;
  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    if (i > 0) {
      const p = samples[i - 1];
      if (p.lat != null && p.lon != null && s.lat != null && s.lon != null) {
        const d = haversine(p.lat, p.lon, s.lat, s.lon);
        if (d > 0.3) cum += d;
      }
    }
    s.dist = cum;
  }
}

/**
 * Moyenne glissante centrée sur une **fenêtre temporelle**, pas sur un nombre
 * de points. Indispensable : l'enregistrement "intelligent" de Garmin produit
 * des intervalles de 1 à 15 s dans le même fichier.
 */
export function smoothByTime(
  samples: Sample[],
  get: (s: Sample) => number | undefined,
  windowS: number,
): (number | undefined)[] {
  const n = samples.length;
  const out = new Array<number | undefined>(n);
  const half = windowS / 2;
  let lo = 0;
  let hi = 0;
  let sum = 0;
  let count = 0;

  for (let i = 0; i < n; i++) {
    const tMin = samples[i].t - half;
    const tMax = samples[i].t + half;
    while (hi < n && samples[hi].t <= tMax) {
      const v = get(samples[hi]);
      if (v != null) {
        sum += v;
        count++;
      }
      hi++;
    }
    while (lo < n && samples[lo].t < tMin) {
      const v = get(samples[lo]);
      if (v != null) {
        sum -= v;
        count--;
      }
      lo++;
    }
    out[i] = count > 0 ? sum / count : get(samples[i]);
  }
  return out;
}

/** Vitesse instantanée (m/s) dérivée de la distance cumulée, lissée. */
export function speedSeries(samples: Sample[], windowS = 5): number[] {
  const n = samples.length;
  const raw = new Array<number>(n).fill(0);
  for (let i = 1; i < n; i++) {
    const dt = samples[i].t - samples[i - 1].t;
    const dd = (samples[i].dist ?? 0) - (samples[i - 1].dist ?? 0);
    raw[i] = dt > 0 ? Math.max(0, dd / dt) : 0;
  }
  if (n > 1) raw[0] = raw[1];
  const proxy = samples.map((s, i) => ({ t: s.t, dist: raw[i] }) as Sample);
  return smoothByTime(proxy, (s) => s.dist, windowS).map((v) => v ?? 0);
}

/**
 * Dénivelé cumulé avec hystérésis. Sans seuil, le bruit altimétrique du GPS
 * transforme une sortie plate en 400 m de D+. On lisse sur 30 s puis on ne
 * compte que les variations monotones dépassant `thresholdM`.
 */
export function elevationGainLoss(
  samples: Sample[],
  thresholdM = 3,
): { gain: number; loss: number } {
  const sm = smoothByTime(samples, (s) => s.ele, 30);
  let gain = 0;
  let loss = 0;
  let anchor: number | undefined;
  let dir = 0;

  for (const v of sm) {
    if (v == null) continue;
    if (anchor == null) {
      anchor = v;
      continue;
    }
    const d = v - anchor;
    if (dir >= 0 && d >= thresholdM) {
      gain += d;
      anchor = v;
      dir = 1;
    } else if (dir <= 0 && d <= -thresholdM) {
      loss += -d;
      anchor = v;
      dir = -1;
    } else if (dir === 1 && d < 0) {
      anchor = Math.max(anchor + d, v);
      if (v < anchor) anchor = v;
      dir = 0;
    } else if (dir === -1 && d > 0) {
      if (v > anchor) anchor = v;
      dir = 0;
    }
  }
  return { gain, loss };
}

export function mean(values: (number | undefined)[]): number | undefined {
  let s = 0;
  let c = 0;
  for (const v of values) {
    if (v != null && Number.isFinite(v)) {
      s += v;
      c++;
    }
  }
  return c ? s / c : undefined;
}

export function round(v: number | undefined, digits: number): number | undefined {
  if (v == null || !Number.isFinite(v)) return undefined;
  const f = 10 ** digits;
  return Math.round(v * f) / f;
}

/**
 * Bornes de plausibilité physiologique.
 *
 * Les fichiers réels sont sales : une ceinture qui décroche écrit 0 ou 255 bpm,
 * un capteur de puissance qui se réveille sort des pics à 4000 W, un altimètre
 * barométrique non calibré démarre à -1200 m. Ces valeurs contaminent ensuite
 * toutes les moyennes et, pire, arrivent telles quelles dans le prompt : le
 * modèle commentera très sérieusement une FC max de 316 bpm.
 */
const BOUNDS = {
  hr: [25, 240],
  cad: [0, 260],
  pw: [0, 2500],
  temp: [-60, 70],
  ele: [-500, 9000],
} as const;

export function sanitizeSamples(samples: Sample[]): void {
  for (const s of samples) {
    for (const [key, [min, max]] of Object.entries(BOUNDS)) {
      const k = key as keyof typeof BOUNDS;
      const v = s[k];
      if (v != null && (!Number.isFinite(v) || v < min || v > max)) s[k] = undefined;
    }
    // "Null island" : coordonnées 0,0 émises pendant l'acquisition du signal.
    if (s.lat != null && s.lon != null) {
      const invalid =
        Math.abs(s.lat) > 90 ||
        Math.abs(s.lon) > 180 ||
        (Math.abs(s.lat) < 1e-7 && Math.abs(s.lon) < 1e-7);
      if (invalid) {
        s.lat = undefined;
        s.lon = undefined;
      }
    }
  }
}
