/**
 * Lecture des fichiers FIT.
 *
 * Format natif de la quasi-totalité des montres. Plus compact que le TCX, plus
 * riche, et surtout **le seul à porter deux choses que rien d'autre ne donne** :
 *
 *   1. Les longueurs de bassin, une par une. L'export TCX de Garmin Connect les
 *      écrase en un tour unique.
 *   2. Le matériel réellement appairé. Un `device_info` annonçant un capteur
 *      cardiaque ANT+ est une **vérité terrain** : plus besoin de deviner si
 *      l'athlète portait une ceinture, le fichier le dit.
 *
 * Construit sur un décodeur maison (fit-decode.ts) plutôt que sur le SDK
 * Garmin, qui est un module CommonJS et ne se charge pas dans un navigateur
 * sans bundler — ce qui rendait le FIT inutilisable dans l'outil.
 */

import {
  decodeFit, GLOBAL, fitTimeToUnix, semicircles, scaled,
  FIT_SPORT, FIT_SUB_SPORT, SWIM_STROKE, FIT_MANUFACTURER, type FitMessage,
} from "./fit-decode.ts";
import { translator } from "./i18n.ts";
import { fillDistance, sanitizeSamples } from "./geo.ts";
import type { Activity, Lap, Sample, Sport } from "./types.ts";

/** Une longueur de bassin, telle que la montre l'a comptée. */
export interface FitLength {
  index: number;
  startT: number;
  durS: number;
  active: boolean;
  strokes?: number;
  stroke?: string;
  speedMS?: number;
  cadence?: number;
}

export interface FitExtras {
  /** Dénivelé mesuré par l'altimètre barométrique de la montre. */
  totalAscentM?: number;
  totalDescentM?: number;
  manufacturer?: string;
  manufacturerId?: number;
  /** Compte des messages décodés, pour diagnostiquer un fichier inconnu. */
  messageCounts?: Record<number, number>;
  subSport?: string;
  poolLengthM?: number;
  lengths: FitLength[];
  hrSensor?: "chest_strap" | "optical" | "unknown";
  hrSensorEvidence?: string;
  totalDistanceM?: number;
}

/**
 * Identifie le capteur cardiaque à partir du matériel appairé.
 *
 * Piège : le champ `device_type` est une **union**, dont la signification
 * dépend de `source_type`. En ANT+, un moniteur cardiaque porte le type 120 ;
 * en Bluetooth LE, il porte le type 1. Ne chercher que 120 revient à ne
 * détecter que les ceintures connectées en ANT+ — c'est exactement ce qui
 * faisait manquer une ceinture appairée en Bluetooth sur une sortie où elle
 * était bel et bien présente.
 *
 * L'absence de ces messages ne prouve rien en revanche : beaucoup de montres
 * n'écrivent pas de `device_info` pour leur capteur optique intégré. On répond
 * donc « indéterminé » plutôt que « poignet », et l'heuristique de signal
 * reprend la main.
 */
const SOURCE_LABEL: Record<number, string> = {
  0: "ANT", 1: "ANT+", 2: "Bluetooth", 3: "Bluetooth LE",
};

function detectHrSensor(devices: FitMessage[], locale?: string): {
  verdict?: "chest_strap" | "optical" | "unknown";
  evidence?: string;
} {
  const tr = translator(locale);
  for (const d of devices) {
    const deviceType = d[1] as number | undefined;
    const sourceType = d[25] as number | undefined;
    if (sourceType == null || deviceType == null) continue;

    // source_type : 0 ant, 1 antplus, 2 bluetooth, 3 BLE, 4 wifi, 5 local.
    // Le type 5 désigne un capteur interne à la montre : jamais une ceinture.
    const antHr = (sourceType === 0 || sourceType === 1) && deviceType === 120;
    const bleHr = (sourceType === 2 || sourceType === 3) && deviceType === 1;
    if (!antHr && !bleHr) continue;

    const product = d[4] as number | undefined;
    return {
      verdict: "chest_strap",
      evidence: tr("fit.hrEvidence", {
        source: SOURCE_LABEL[sourceType] ?? tr("fit.sourceN", { n: sourceType }),
        product: product != null ? tr("fit.hrEvidenceProduct", { id: product }) : "",
      }),
    };
  }
  return {};
}

export function parseFitBuffer(buffer: ArrayBuffer | Uint8Array, locale?: string): {
  activity: Activity;
  extras: FitExtras;
} {
  const fit = decodeFit(buffer, locale);
  const records = fit.byGlobal.get(GLOBAL.RECORD) ?? [];
  const session = (fit.byGlobal.get(GLOBAL.SESSION) ?? [])[0];
  const lapMsgs = fit.byGlobal.get(GLOBAL.LAP) ?? [];
  const lengthMsgs = fit.byGlobal.get(GLOBAL.LENGTH) ?? [];
  const devices = fit.byGlobal.get(GLOBAL.DEVICE_INFO) ?? [];
  const fileId = (fit.byGlobal.get(GLOBAL.FILE_ID) ?? [])[0];

  let t0: number | undefined;
  const samples: Sample[] = [];

  for (const r of records) {
    const abs = fitTimeToUnix(r[253] as number | undefined);
    if (abs == null) continue;
    if (t0 == null) t0 = abs;

    let cad = r[4] as number | undefined;
    const frac = r[53] as number | undefined;
    if (cad != null && frac != null) cad += frac / 128;

    samples.push({
      t: Math.round((abs - t0) * 10) / 10,
      lat: semicircles(r[0] as number | undefined),
      lon: semicircles(r[1] as number | undefined),
      ele: scaled(r[78] as number | undefined, 5, 500) ?? scaled(r[2] as number | undefined, 5, 500),
      dist: scaled(r[5] as number | undefined, 100),
      hr: r[3] as number | undefined,
      cad,
      pw: r[7] as number | undefined,
      temp: r[13] as number | undefined,
    });
  }

  // Chaîne de repli pour le sport. Tous les encodeurs n'écrivent pas de
  // message `session` : s'appuyer uniquement dessus ferait basculer une course
  // entière en « autre », donc hors analyse. On interroge ensuite le message
  // `sport`, puis le premier tour, avant d'abandonner.
  const sportMsg = (fit.byGlobal.get(GLOBAL.SPORT) ?? [])[0];
  const rawSport =
    (session?.[5] as number | undefined) ??
    (sportMsg?.[0] as number | undefined) ??
    (lapMsgs[0]?.[25] as number | undefined);
  const subSport =
    (session?.[6] as number | undefined) ?? (sportMsg?.[1] as number | undefined);
  const sport = (FIT_SPORT[rawSport ?? 0] ?? "other") as Sport;

  const lengths: FitLength[] = lengthMsgs.map((l, i) => {
    const start = fitTimeToUnix(l[2] as number | undefined);
    return {
      index: (l[254] as number | undefined) ?? i,
      startT: start != null && t0 != null ? Math.max(0, start - t0) : 0,
      durS: scaled(l[4] as number | undefined, 1000) ?? 0,
      active: l[12] === 1,
      // Beaucoup de montres n'ont pas de compteur de coups de bras : un zéro
      // signifie « non mesuré », pas « aucun mouvement ». Le distinguer évite
      // d'afficher un SWOLF construit sur du vide.
      strokes: (l[5] as number | undefined) || undefined,
      stroke: l[7] != null ? SWIM_STROKE[l[7] as number] : undefined,
      speedMS: scaled(l[6] as number | undefined, 1000),
      cadence: (l[9] as number | undefined) || undefined,
    };
  });

  const laps: Lap[] = lapMsgs.map((l, i) => {
    const start = fitTimeToUnix(l[2] as number | undefined);
    return {
      index: i,
      startT: start != null && t0 != null ? Math.max(0, start - t0) : 0,
      durS: scaled(l[8] as number | undefined, 1000) ?? scaled(l[7] as number | undefined, 1000) ?? 0,
      distM: scaled(l[9] as number | undefined, 100) ?? 0,
      hrAvg: l[15] as number | undefined,
      hrMax: l[16] as number | undefined,
      calories: l[11] as number | undefined,
      intensity: l[23] != null ? String(l[23]) : undefined,
      trigger: l[24] != null ? String(l[24]) : undefined,
    };
  });

  sanitizeSamples(samples);

  // Natation en bassin : les points ne portent aucune distance, la montre
  // comptant des longueurs. On la reconstruit depuis les longueurs — plus
  // précises que les tours, puisqu'on connaît la durée exacte de chacune.
  const poolLengthM = scaled(session?.[44] as number | undefined, 100);
  const needsDistance = samples.length > 0 && samples.every((s) => s.dist == null);

  if (needsDistance && poolLengthM && lengths.some((l) => l.active)) {
    let cumulative = 0;
    for (const len of lengths) {
      const from = len.startT;
      const to = len.startT + len.durS;
      const gained = len.active ? poolLengthM : 0;
      for (const s of samples) {
        if (s.t < from || s.t > to) continue;
        const frac = len.durS > 0 ? (s.t - from) / len.durS : 1;
        s.dist = cumulative + frac * gained;
      }
      cumulative += gained;
    }
    let last = 0;
    for (const s of samples) {
      if (s.dist == null || s.dist < last) s.dist = last;
      else last = s.dist;
    }
  } else if (needsDistance) {
    const lapTotal = laps.reduce((sum, l) => sum + l.distM, 0);
    if (lapTotal > 50) {
      let cumulative = 0;
      for (const lap of laps) {
        for (const s of samples) {
          if (s.t < lap.startT || s.t > lap.startT + lap.durS) continue;
          const frac = lap.durS > 0 ? (s.t - lap.startT) / lap.durS : 1;
          s.dist = cumulative + frac * lap.distM;
        }
        cumulative += lap.distM;
      }
      let last = 0;
      for (const s of samples) {
        if (s.dist == null || s.dist < last) s.dist = last;
        else last = s.dist;
      }
    } else {
      fillDistance(samples);
    }
  }
  if (sport === "running") {
    for (const s of samples) if (s.cad != null && s.cad < 130) s.cad *= 2;
  }

  const hr = detectHrSensor(devices, locale);
  const manufacturerId = fileId?.[1] as number | undefined;
  const manufacturer =
    manufacturerId != null
      ? (FIT_MANUFACTURER[manufacturerId] ?? `fabricant ${manufacturerId}`)
      : undefined;

  return {
    activity: {
      sport,
      startTime: t0 != null ? new Date(t0 * 1000).toISOString() : undefined,
      device: manufacturer ?? "FIT",
      source: "fit",
      samples,
      laps,
    },
    extras: {
      totalAscentM: session?.[22] as number | undefined,
      totalDescentM: session?.[23] as number | undefined,
      manufacturer,
      manufacturerId,
      messageCounts: Object.fromEntries(
        [...fit.byGlobal.entries()].map(([g, m]) => [g, m.length]),
      ),
      subSport: subSport != null ? FIT_SUB_SPORT[subSport] : undefined,
      poolLengthM,
      lengths,
      hrSensor: hr.verdict,
      hrSensorEvidence: hr.evidence,
      totalDistanceM: scaled(session?.[9] as number | undefined, 100),
    },
  };
}

/** Décode un .fit. Plus aucune dépendance externe ni import dynamique. */
export async function parseFit(buf: ArrayBuffer | Uint8Array, locale?: string): Promise<Activity> {
  return parseFitBuffer(buf, locale).activity;
}
