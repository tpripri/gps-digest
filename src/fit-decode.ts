/**
 * Décodeur FIT minimal, sans dépendance.
 *
 * Écrit pour remplacer `@garmin/fitsdk`, qui est un module CommonJS : il ne se
 * charge pas dans un navigateur sans bundler, ce qui rendait le format FIT
 * inutilisable dans l'outil alors que c'est le format **natif** de la quasi-
 * totalité des montres, et le seul à porter les longueurs de bassin.
 *
 * On ne décode que ce dont l'application a besoin — points, tours, longueurs,
 * session, matériel — plutôt que l'intégralité du profil FIT, qui compte plus
 * de deux cents types de messages. C'est un choix : moins de surface, moins de
 * dépendances, et un comportement vérifiable.
 *
 * Structure du format :
 *   en-tête 12 ou 14 octets, puis une suite d'enregistrements.
 *   Chaque enregistrement commence par un octet d'en-tête :
 *     bit 7 = 0 → en-tête normal
 *       bit 6 : 1 = message de définition, 0 = message de données
 *       bit 5 : présence de champs développeur (définition uniquement)
 *       bits 0-3 : numéro de message local
 *     bit 7 = 1 → en-tête à horodatage compressé
 *       bits 5-6 : numéro de message local
 *       bits 0-4 : décalage temporel
 *   Un message de définition décrit la structure des messages de données qui
 *   suivent sous le même numéro local. Il peut être redéfini en cours de
 *   fichier : c'est pourquoi les définitions vivent dans une table mutable.
 */

import { t } from "./i18n.ts";

/** Origine des horodatages FIT : 31 décembre 1989 à 00:00 UTC. */
const FIT_EPOCH_S = 631065600;

interface BaseType {
  size: number;
  invalid: number | bigint;
  read: (v: DataView, o: number, le: boolean) => number;
}

const BASE_TYPES: Record<number, BaseType> = {
  0x00: { size: 1, invalid: 0xff, read: (v, o) => v.getUint8(o) }, // enum
  0x01: { size: 1, invalid: 0x7f, read: (v, o) => v.getInt8(o) },
  0x02: { size: 1, invalid: 0xff, read: (v, o) => v.getUint8(o) },
  0x83: { size: 2, invalid: 0x7fff, read: (v, o, le) => v.getInt16(o, le) },
  0x84: { size: 2, invalid: 0xffff, read: (v, o, le) => v.getUint16(o, le) },
  0x85: { size: 4, invalid: 0x7fffffff, read: (v, o, le) => v.getInt32(o, le) },
  0x86: { size: 4, invalid: 0xffffffff, read: (v, o, le) => v.getUint32(o, le) },
  0x07: { size: 1, invalid: 0x00, read: (v, o) => v.getUint8(o) }, // string
  0x88: { size: 4, invalid: 0xffffffff, read: (v, o, le) => v.getFloat32(o, le) },
  0x89: { size: 8, invalid: 0xffffffff, read: (v, o, le) => v.getFloat64(o, le) },
  0x0a: { size: 1, invalid: 0x00, read: (v, o) => v.getUint8(o) }, // uint8z
  0x8b: { size: 2, invalid: 0x0000, read: (v, o, le) => v.getUint16(o, le) },
  0x8c: { size: 4, invalid: 0x00000000, read: (v, o, le) => v.getUint32(o, le) },
  0x0d: { size: 1, invalid: 0xff, read: (v, o) => v.getUint8(o) }, // byte
  0x8e: { size: 8, invalid: 0x7fffffffffffffff, read: (v, o, le) => Number(v.getBigInt64(o, le)) },
  0x8f: { size: 8, invalid: 0xffffffffffffffff, read: (v, o, le) => Number(v.getBigUint64(o, le)) },
  0x90: { size: 8, invalid: 0, read: (v, o, le) => Number(v.getBigUint64(o, le)) },
};

interface FieldDef {
  num: number;
  size: number;
  baseType: number;
}

interface MessageDef {
  globalNum: number;
  littleEndian: boolean;
  fields: FieldDef[];
  devFieldBytes: number;
}

/** Message décodé : numéro de champ → valeur brute. */
export type FitMessage = Record<number, number | string>;

export interface FitFile {
  /** Messages groupés par numéro global. */
  byGlobal: Map<number, FitMessage[]>;
}

export const GLOBAL = {
  FILE_ID: 0,
  SPORT: 12,
  SESSION: 18,
  LAP: 19,
  RECORD: 20,
  EVENT: 21,
  DEVICE_INFO: 23,
  WORKOUT: 26,
  WORKOUT_STEP: 27,
  LENGTH: 101,
} as const;

/**
 * Décode un fichier FIT. Ne vérifie pas le CRC : un fichier tronqué par un
 * transfert interrompu reste largement exploitable, et refuser de le lire
 * rendrait un mauvais service.
 */
export function decodeFit(buffer: ArrayBuffer | Uint8Array, locale?: string): FitFile {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  const headerSize = bytes[0];
  if (headerSize !== 12 && headerSize !== 14) {
    throw new Error(t(locale, "fit.errHeader"));
  }
  const magic = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]);
  if (magic !== ".FIT") throw new Error(t(locale, "fit.errSignature"));

  const dataSize = view.getUint32(4, true);
  const end = Math.min(headerSize + dataSize, bytes.length);

  const defs = new Map<number, MessageDef>();
  const byGlobal = new Map<number, FitMessage[]>();
  let pos = headerSize;

  // Horodatage compressé : certains encodeurs, pour économiser trois octets par
  // point, remplacent le champ timestamp par un décalage de 5 bits porté par
  // l'octet d'en-tête. Le lire sans l'appliquer revient à produire des messages
  // sans date — que la couche supérieure écarte en silence, vidant le fichier
  // de ses points sans le moindre message d'erreur.
  let lastTimestamp: number | undefined;

  while (pos < end) {
    const header = bytes[pos++];
    const compressed = (header & 0x80) !== 0;

    if (!compressed && (header & 0x40) !== 0) {
      // ---- Message de définition ----
      pos++; // réservé
      const littleEndian = bytes[pos++] === 0;
      const globalNum = view.getUint16(pos, littleEndian);
      pos += 2;
      const fieldCount = bytes[pos++];

      const fields: FieldDef[] = [];
      for (let i = 0; i < fieldCount; i++) {
        fields.push({ num: bytes[pos], size: bytes[pos + 1], baseType: bytes[pos + 2] });
        pos += 3;
      }

      // Champs développeur (Stryd, Running Dynamics…) : on note leur taille
      // pour pouvoir les sauter, sans chercher à les interpréter.
      let devFieldBytes = 0;
      if ((header & 0x20) !== 0) {
        const devCount = bytes[pos++];
        for (let i = 0; i < devCount; i++) {
          devFieldBytes += bytes[pos + 1];
          pos += 3;
        }
      }

      defs.set(header & 0x0f, { globalNum, littleEndian, fields, devFieldBytes });
      continue;
    }

    // ---- Message de données ----
    const localNum = compressed ? (header >> 5) & 0x03 : header & 0x0f;
    const def = defs.get(localNum);
    if (!def) break; // définition manquante : on ne peut plus avancer sûrement

    const msg: FitMessage = {};

    if (compressed && lastTimestamp != null) {
      // Le décalage couvre 32 s. Quand il est inférieur aux 5 bits de poids
      // faible du dernier horodatage, c'est qu'on a franchi un multiple de 32 :
      // il faut ajouter une période complète.
      const offset = header & 0x1f;
      const previousLow = lastTimestamp & 0x1f;
      const base = lastTimestamp & ~0x1f;
      lastTimestamp = offset >= previousLow ? base + offset : base + offset + 0x20;
      msg[253] = lastTimestamp;
    }
    for (const f of def.fields) {
      const bt = BASE_TYPES[f.baseType];
      if (!bt) {
        pos += f.size;
        continue;
      }

      if (f.baseType === 0x07) {
        // Chaîne terminée par un octet nul.
        let s = "";
        for (let i = 0; i < f.size; i++) {
          const c = bytes[pos + i];
          if (c === 0) break;
          s += String.fromCharCode(c);
        }
        if (s) msg[f.num] = s;
        pos += f.size;
        continue;
      }

      // Un champ plus large que son type de base est un tableau. On ne garde
      // que la première valeur : aucun champ utilisé ici n'est un tableau.
      const count = Math.max(1, Math.floor(f.size / bt.size));
      let value: number | undefined;
      for (let i = 0; i < count; i++) {
        const o = pos + i * bt.size;
        if (o + bt.size > bytes.length) break;
        const raw = bt.read(view, o, def.littleEndian);
        if (i === 0 && raw !== bt.invalid) value = raw;
      }
      if (value != null) {
        msg[f.num] = value;
        // Tout horodatage complet rebase la référence des suivants.
        if (f.num === 253) lastTimestamp = value;
      }
      pos += f.size;
    }
    pos += def.devFieldBytes;

    const list = byGlobal.get(def.globalNum);
    if (list) list.push(msg);
    else byGlobal.set(def.globalNum, [msg]);
  }

  return { byGlobal };
}

export const fitTimeToUnix = (v: number | undefined): number | undefined =>
  v == null ? undefined : v + FIT_EPOCH_S;

/** Conversion semicercles → degrés. */
export const semicircles = (v: number | undefined): number | undefined =>
  v == null ? undefined : v * (180 / 2 ** 31);

export const scaled = (
  v: number | undefined,
  scale: number,
  offset = 0,
): number | undefined => (v == null ? undefined : v / scale - offset);

/**
 * Fabricants, pour afficher un nom plutôt qu'un numéro.
 * Un identifiant absent de cette table n'empêche rien : le format FIT est le
 * même pour tous, seule l'étiquette manque.
 */
export const FIT_MANUFACTURER: Record<number, string> = {
  1: "Garmin",
  7: "Quarq",
  13: "Dynastream",
  15: "Dynastream",
  23: "Suunto",
  32: "Wahoo",
  37: "Favero",
  41: "Bryton",
  48: "Stages",
  68: "Bkool",
  69: "Lezyne",
  89: "Tacx",
  98: "Magene",
  102: "Hammerhead",
  107: "Wattbike",
  115: "IGPSport",
  123: "Polar",
  260: "Zwift",
  263: "Elite",
  294: "Coros",
};

/** Sports FIT vers le modèle interne. */
export const FIT_SPORT: Record<number, string> = {
  0: "other",
  1: "running",
  2: "cycling",
  5: "swimming",
  11: "hiking",
  17: "hiking",
};

/** Sous-sports utiles : distinguent le bassin de l'eau libre. */
export const FIT_SUB_SPORT: Record<number, string> = {
  17: "lap_swimming",
  18: "open_water",
  6: "indoor_cycling",
  5: "treadmill",
  58: "virtual_activity",
};

/** Intensité d'un tour ou d'une étape de séance. */
export const FIT_INTENSITY: Record<number, string> = {
  0: "active",
  1: "rest",
  2: "warmup",
  3: "cooldown",
  4: "recovery",
  5: "interval",
  6: "other",
};

/** Ce qui a clos un tour : bouton, auto-lap, fin de séance… */
export const FIT_LAP_TRIGGER: Record<number, string> = {
  0: "manual",
  1: "time",
  2: "distance",
  3: "position_start",
  4: "position_lap",
  5: "position_waypoint",
  6: "position_marked",
  7: "session_end",
  8: "fitness_equipment",
};

export const SWIM_STROKE: Record<number, string> = {
  0: "crawl",
  1: "dos",
  2: "brasse",
  3: "papillon",
  4: "éducatif",
  5: "mixte",
  6: "4 nages",
};
