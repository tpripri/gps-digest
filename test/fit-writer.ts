/**
 * Générateur de fichiers FIT minimal, pour les tests.
 *
 * Chaque message est précédé de sa propre définition : c'est plus verbeux
 * qu'un vrai encodeur, mais exactement ce que le décodeur doit savoir lire
 * (une montre redéfinit ses messages en cours de fichier).
 */

/** Types de base FIT utilisés ici. */
export const FIT = {
  enum: 0x00,
  uint8: 0x02,
  uint16: 0x84,
  sint32: 0x85,
  uint32: 0x86,
} as const;

const SIZE: Record<number, number> = { 0x00: 1, 0x02: 1, 0x84: 2, 0x85: 4, 0x86: 4 };

/** Origine des horodatages FIT : 31 décembre 1989 à 00:00 UTC. */
export const FIT_EPOCH_S = 631065600;
export const fitTime = (iso: string) => Math.round(Date.parse(iso) / 1000) - FIT_EPOCH_S;
export const toSemicircles = (deg: number) => Math.round(deg * (2 ** 31 / 180));

export interface FitFieldValue {
  num: number;
  type: number;
  value: number;
}

export function fitWriter() {
  const buf: number[] = [];
  const u8 = (v: number) => buf.push(v & 0xff);
  const u16 = (v: number) => { u8(v); u8(v >> 8); };
  const u32 = (v: number) => { u16(v & 0xffff); u16((v >>> 16) & 0xffff); };
  const write = (type: number, v: number) => {
    if (SIZE[type] === 1) u8(v);
    else if (SIZE[type] === 2) u16(v);
    else u32(v >>> 0);
  };

  return {
    message(globalNum: number, fields: FitFieldValue[], local = 0) {
      u8(0x40 | local); u8(0); u8(0); u16(globalNum); u8(fields.length);
      for (const f of fields) { u8(f.num); u8(SIZE[f.type]); u8(f.type); }
      u8(local);
      for (const f of fields) write(f.type, f.value);
    },
    bytes(): Uint8Array {
      const data = Uint8Array.from(buf);
      const out = new Uint8Array(12 + data.length + 2);
      const dv = new DataView(out.buffer);
      out[0] = 12; out[1] = 16; dv.setUint16(2, 2140, true);
      dv.setUint32(4, data.length, true);
      out.set([0x2e, 0x46, 0x49, 0x54], 8);
      out.set(data, 12);
      return out;
    },
  };
}

/** Points d'une course rectiligne à allure constante, 1 Hz. */
export function writeRecords(
  w: ReturnType<typeof fitWriter>,
  opts: { startIso: string; fromS: number; toS: number; speedMS: number; hr: number; lat0?: number; lon0?: number; distOffsetM?: number },
) {
  const t0 = fitTime(opts.startIso);
  const lat0 = opts.lat0 ?? 48.85;
  const lon0 = opts.lon0 ?? 2.35;
  for (let s = opts.fromS; s <= opts.toS; s++) {
    const dist = (opts.distOffsetM ?? 0) + (s - opts.fromS) * opts.speedMS;
    w.message(20, [
      { num: 253, type: FIT.uint32, value: t0 + s },
      { num: 0, type: FIT.sint32, value: toSemicircles(lat0 + (s * opts.speedMS) / 111_320) },
      { num: 1, type: FIT.sint32, value: toSemicircles(lon0) },
      { num: 5, type: FIT.uint32, value: Math.round(dist * 100) },
      { num: 3, type: FIT.uint8, value: opts.hr },
    ], 1);
  }
}

/** Message `session` : sport, départ, durée écoulée et distance totales. */
export function writeSession(
  w: ReturnType<typeof fitWriter>,
  opts: { startIso: string; offsetS?: number; elapsedS: number; distM: number; sport: number; subSport?: number; hrAvg?: number; hrMax?: number },
) {
  const fields: FitFieldValue[] = [
    { num: 2, type: FIT.uint32, value: fitTime(opts.startIso) + (opts.offsetS ?? 0) },
    { num: 7, type: FIT.uint32, value: Math.round(opts.elapsedS * 1000) },
    { num: 8, type: FIT.uint32, value: Math.round(opts.elapsedS * 1000) },
    { num: 9, type: FIT.uint32, value: Math.round(opts.distM * 100) },
    { num: 5, type: FIT.enum, value: opts.sport },
    { num: 6, type: FIT.enum, value: opts.subSport ?? 0 },
  ];
  if (opts.hrAvg != null) fields.push({ num: 16, type: FIT.uint8, value: opts.hrAvg });
  if (opts.hrMax != null) fields.push({ num: 17, type: FIT.uint8, value: opts.hrMax });
  w.message(18, fields, 2);
}

/** Une portion de séance à vitesse (et puissance) constante. */
export interface FitSegment {
  durS: number;
  speedMS: number;
  hr?: number;
  pw?: number;
}

/**
 * Points à 1 Hz d'une séance faite de portions successives, en ligne droite.
 * Renvoie l'heure de début (s depuis le départ) et la distance de chaque
 * portion, pour écrire les tours correspondants.
 */
export function writeProfile(
  w: ReturnType<typeof fitWriter>,
  opts: { startIso: string; segments: FitSegment[]; lat0?: number; lon0?: number },
): { startS: number; durS: number; distM: number }[] {
  const t0 = fitTime(opts.startIso);
  const lat0 = opts.lat0 ?? 48.85;
  const lon0 = opts.lon0 ?? 2.35;
  const out: { startS: number; durS: number; distM: number }[] = [];
  let s = 0;
  let dist = 0;
  for (const seg of opts.segments) {
    out.push({ startS: s, durS: seg.durS, distM: seg.speedMS * seg.durS });
    for (let k = 0; k < seg.durS; k++, s++) {
      const fields: FitFieldValue[] = [
        { num: 253, type: FIT.uint32, value: t0 + s },
        { num: 0, type: FIT.sint32, value: toSemicircles(lat0 + dist / 111_320) },
        { num: 1, type: FIT.sint32, value: toSemicircles(lon0) },
        { num: 5, type: FIT.uint32, value: Math.round(dist * 100) },
        { num: 3, type: FIT.uint8, value: seg.hr ?? 140 },
      ];
      if (seg.pw != null) fields.push({ num: 7, type: FIT.uint16, value: seg.pw });
      w.message(20, fields, 1);
      dist += seg.speedMS;
    }
  }
  return out;
}

/** Message `lap`. intensity : 0 actif, 1 repos, 2 échauffement, 3 retour au calme. */
export function writeLap(
  w: ReturnType<typeof fitWriter>,
  opts: { startIso: string; startS: number; durS: number; distM: number; intensity?: number; trigger?: number; stepIndex?: number },
) {
  const fields: FitFieldValue[] = [
    { num: 253, type: FIT.uint32, value: fitTime(opts.startIso) + opts.startS + opts.durS },
    { num: 2, type: FIT.uint32, value: fitTime(opts.startIso) + opts.startS },
    { num: 7, type: FIT.uint32, value: Math.round(opts.durS * 1000) },
    { num: 8, type: FIT.uint32, value: Math.round(opts.durS * 1000) },
    { num: 9, type: FIT.uint32, value: Math.round(opts.distM * 100) },
  ];
  if (opts.intensity != null) fields.push({ num: 23, type: FIT.enum, value: opts.intensity });
  if (opts.trigger != null) fields.push({ num: 24, type: FIT.enum, value: opts.trigger });
  if (opts.stepIndex != null) fields.push({ num: 71, type: FIT.uint16, value: opts.stepIndex });
  w.message(19, fields, 3);
}

/**
 * Message `workout_step`. durationType : 0 temps (ms), 1 distance (cm),
 * 6 répéter (durationValue = première étape répétée, targetValue = nombre de
 * répétitions). targetType : 0 vitesse (low/high en mm/s), 4 puissance
 * (low/high en W + 1000).
 */
export function writeWorkoutStep(
  w: ReturnType<typeof fitWriter>,
  opts: { index: number; durationType: number; durationValue: number; targetType?: number; targetValue?: number; low?: number; high?: number; intensity?: number },
) {
  const fields: FitFieldValue[] = [
    { num: 254, type: FIT.uint16, value: opts.index },
    { num: 1, type: FIT.enum, value: opts.durationType },
    { num: 2, type: FIT.uint32, value: opts.durationValue },
    { num: 3, type: FIT.enum, value: opts.targetType ?? 2 },
    { num: 4, type: FIT.uint32, value: opts.targetValue ?? 0 },
  ];
  if (opts.low != null) fields.push({ num: 5, type: FIT.uint32, value: opts.low });
  if (opts.high != null) fields.push({ num: 6, type: FIT.uint32, value: opts.high });
  if (opts.intensity != null) fields.push({ num: 7, type: FIT.enum, value: opts.intensity });
  w.message(27, fields, 4);
}
