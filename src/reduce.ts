/**
 * Réduction adaptative de la trace.
 *
 * Un sous-échantillonnage naïf ("1 point sur 10") détruit exactement ce qui
 * intéresse le modèle : les ruptures. Un départ d'intervalle dure 2 s, un
 * sommet de côte est un point unique.
 *
 * Approche : Douglas-Peucker appliqué **indépendamment à chaque série**
 * (altitude/distance, vitesse/temps, FC/temps, puissance/temps), puis union des
 * indices retenus. Une rupture sur n'importe quel canal survit. On dichotomise
 * ensuite sur epsilon pour atterrir sur le budget de lignes demandé.
 */

import type { Sample } from "./types.ts";

/**
 * Douglas-Peucker itératif (pile explicite) : la version récursive dépasse la
 * pile d'appels au-delà de ~50 000 points.
 * x et y sont supposés normalisés dans [0, 1], epsilon est donc sans unité.
 */
function rdp(x: number[], y: number[], epsilon: number): Uint8Array {
  const n = x.length;
  const keep = new Uint8Array(n);
  if (n === 0) return keep;
  keep[0] = 1;
  keep[n - 1] = 1;
  if (n < 3) return keep;

  const stack: [number, number][] = [[0, n - 1]];
  while (stack.length) {
    const [first, last] = stack.pop()!;
    if (last - first < 2) continue;

    const x1 = x[first], y1 = y[first], x2 = x[last], y2 = y[last];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const norm = Math.hypot(dx, dy);

    let maxDist = -1;
    let idx = -1;
    for (let i = first + 1; i < last; i++) {
      const d =
        norm < 1e-12
          ? Math.hypot(x[i] - x1, y[i] - y1)
          : Math.abs(dy * x[i] - dx * y[i] + x2 * y1 - y2 * x1) / norm;
      if (d > maxDist) {
        maxDist = d;
        idx = i;
      }
    }

    if (maxDist > epsilon && idx > 0) {
      keep[idx] = 1;
      stack.push([first, idx], [idx, last]);
    }
  }
  return keep;
}

function normalize(values: (number | undefined)[]): number[] | null {
  let min = Infinity;
  let max = -Infinity;
  let count = 0;
  for (const v of values) {
    if (v == null || !Number.isFinite(v)) continue;
    if (v < min) min = v;
    if (v > max) max = v;
    count++;
  }
  if (count < 3 || max - min < 1e-9) return null;
  const span = max - min;
  let last = 0;
  return values.map((v) => {
    if (v == null || !Number.isFinite(v)) return last;
    last = (v - min) / span;
    return last;
  });
}

export interface ReduceInput {
  samples: Sample[];
  speed: number[];
  /** Indices à conserver quoi qu'il arrive : bornes de laps, splits, intervalles. */
  anchors?: number[];
}

/**
 * Sélectionne au plus `budget` indices en préservant les inflexions.
 * Retourne des indices triés croissants.
 */
export function selectIndices(input: ReduceInput, budget: number): number[] {
  const { samples, speed, anchors = [] } = input;
  const n = samples.length;
  if (n <= budget) return samples.map((_, i) => i);

  const tNorm = normalize(samples.map((s) => s.t))!;
  const dNorm = normalize(samples.map((s) => s.dist));

  const channels: { x: number[]; y: number[]; weight: number }[] = [];
  const push = (y: number[] | null, x: number[], weight: number) => {
    if (y) channels.push({ x, y, weight });
  };

  // L'altitude se lit contre la distance (une côte est un objet géométrique),
  // les capteurs contre le temps.
  push(normalize(samples.map((s) => s.ele)), dNorm ?? tNorm, 1);
  push(normalize(speed), tNorm, 1);
  push(normalize(samples.map((s) => s.hr)), tNorm, 1);
  push(normalize(samples.map((s) => s.pw)), tNorm, 1.2);
  push(normalize(samples.map((s) => s.cad)), tNorm, 0.6);
  if (channels.length === 0) {
    // Aucun canal exploitable : on retombe sur un pas temporel régulier.
    const step = Math.ceil(n / budget);
    const out: number[] = [];
    for (let i = 0; i < n; i += step) out.push(i);
    if (out[out.length - 1] !== n - 1) out.push(n - 1);
    return out;
  }

  const count = (eps: number): Uint8Array => {
    const keep = new Uint8Array(n);
    for (const c of channels) {
      const k = rdp(c.x, c.y, eps / c.weight);
      for (let i = 0; i < n; i++) if (k[i]) keep[i] = 1;
    }
    for (const a of anchors) if (a >= 0 && a < n) keep[a] = 1;
    return keep;
  };

  // Dichotomie sur epsilon. 24 itérations suffisent largement.
  let lo = 1e-6;
  let hi = 0.5;
  let best = count(hi);
  for (let it = 0; it < 24; it++) {
    const mid = Math.sqrt(lo * hi);
    const keep = count(mid);
    let total = 0;
    for (let i = 0; i < n; i++) total += keep[i];
    if (total > budget) lo = mid;
    else {
      hi = mid;
      best = keep;
    }
  }

  const out: number[] = [];
  for (let i = 0; i < n; i++) if (best[i]) out.push(i);
  return out;
}

/** Applique la sélection et arrondit les valeurs au strict nécessaire. */
export function reduceSamples(
  input: ReduceInput,
  budget: number,
  opts: { dropCoordinates?: boolean } = {},
): Sample[] {
  const idx = selectIndices(input, budget);
  const r = (v: number | undefined, d: number) =>
    v == null || !Number.isFinite(v) ? undefined : Math.round(v * 10 ** d) / 10 ** d;

  return idx.map((i) => {
    const s = input.samples[i];
    return {
      t: Math.round(s.t),
      // 5 décimales ≈ 1,1 m : au-delà on encode du bruit GPS, pas du signal.
      lat: opts.dropCoordinates ? undefined : r(s.lat, 5),
      lon: opts.dropCoordinates ? undefined : r(s.lon, 5),
      ele: r(s.ele, 1),
      dist: r(s.dist, 0),
      hr: r(s.hr, 0),
      cad: r(s.cad, 0),
      pw: r(s.pw, 0),
      temp: r(s.temp, 0),
    };
  });
}
