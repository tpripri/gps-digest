/**
 * Rognage vie privée.
 *
 * Une trace GPS contient littéralement l'adresse du domicile de l'utilisateur,
 * au mètre près, dans ses premiers et derniers points. C'est une donnée
 * personnelle au sens du RGPD, et elle part chez un tiers dès qu'on envoie le
 * fichier à un LLM. Le rognage n'est pas une option cosmétique : c'est une
 * étape par défaut de la chaîne.
 *
 * On coupe par **distance parcourue** et non par nombre de points : à l'arrêt,
 * une montre produit 60 points au même endroit.
 */

import { haversine } from "./geo.ts";
import type { Activity, Sample } from "./types.ts";

/**
 * Efface les positions proches du départ et de l'arrivée, sans retirer un
 * seul point.
 *
 * Remplace le rognage (trimPrivacyZone) dans la chaîne d'analyse : couper la
 * trace amputait distance, durée et FC des dernières minutes, et une boucle
 * autour du domicile pouvait perdre une bonne part de son volume. Ici, tous
 * les calculs portent sur la séance entière ; seules disparaissent les
 * coordonnées qui pourraient trahir une adresse, y compris quand la trace
 * repasse près du départ en milieu de sortie.
 */
export function maskPrivacyZone(samples: Sample[], radiusM: number): { samples: Sample[]; masked: number } {
  if (radiusM <= 0) return { samples, masked: 0 };
  const first = samples.find((s) => s.lat != null && s.lon != null);
  const last = [...samples].reverse().find((s) => s.lat != null && s.lon != null);
  if (!first || !last) return { samples, masked: 0 };
  let masked = 0;
  const out = samples.map((s) => {
    if (s.lat == null || s.lon == null) return s;
    const near =
      haversine(s.lat, s.lon, first.lat!, first.lon!) < radiusM ||
      haversine(s.lat, s.lon, last.lat!, last.lon!) < radiusM;
    if (!near) return s;
    masked++;
    return { ...s, lat: undefined, lon: undefined };
  });
  return { samples: out, masked };
}

/**
 * Rognage historique : retire les points de départ et d'arrivée. Conservé
 * pour l'API publique, mais plus utilisé par l'analyse, qui masque au lieu de
 * couper (maskPrivacyZone).
 */
export function trimPrivacyZone(samples: Sample[], radiusM: number): Sample[] {
  if (radiusM <= 0 || samples.length < 3) return samples;

  const origin = samples.find((s) => s.lat != null && s.lon != null);
  const endPoint = [...samples].reverse().find((s) => s.lat != null && s.lon != null);
  if (!origin || !endPoint) return samples;

  let start = 0;
  while (
    start < samples.length &&
    withinRadius(samples[start], origin.lat!, origin.lon!, radiusM)
  ) {
    start++;
  }

  let end = samples.length - 1;
  while (end > start && withinRadius(samples[end], endPoint.lat!, endPoint.lon!, radiusM)) {
    end--;
  }

  if (end - start < 2) return samples;
  return samples.slice(start, end + 1);
}

function withinRadius(s: Sample, lat: number, lon: number, radiusM: number): boolean {
  if (s.lat == null || s.lon == null) return true;
  return haversine(s.lat, s.lon, lat, lon) < radiusM;
}

/**
 * Décalage aléatoire mais cohérent de toute la trace. Conserve la géométrie
 * (utile si le modèle doit raisonner sur le profil ou les virages) tout en
 * rendant la localisation absolue inexploitable.
 */
export function obfuscateCoordinates(samples: Sample[], seed = Date.now()): Sample[] {
  let s = seed >>> 0;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
  const dLat = (rand() - 0.5) * 20;
  const dLon = (rand() - 0.5) * 40;
  return samples.map((p) => ({
    ...p,
    lat: p.lat == null ? undefined : p.lat + dLat,
    lon: p.lon == null ? undefined : p.lon + dLon,
  }));
}

/** Recale les temps et distances à zéro après un rognage. */
export function rebase(activity: Activity, samples: Sample[]): Sample[] {
  if (!samples.length) return samples;
  const t0 = samples[0].t;
  const d0 = samples[0].dist ?? 0;
  return samples.map((s) => ({
    ...s,
    t: Math.round((s.t - t0) * 10) / 10,
    dist: s.dist == null ? undefined : s.dist - d0,
  }));
}
