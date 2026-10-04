/**
 * Reconnaissance des courses.
 *
 * Un dossier qui contient un marathon, un semi et deux 10 km ne peut pas
 * affirmer « aucun résultat de course fourni » : les projections perdaient
 * leur meilleure calibration. Quatre sources, de la plus sûre à la plus
 * fragile :
 *
 *  1. l'athlète, qui coche ou décoche une séance sur la page ;
 *  2. Strava, quand la séance y est marquée « course » (rare en pratique) ;
 *  3. le nom de l'activité : « Marathon de la Ville », « 10km du Parc » ;
 *  4. sinon, une suggestion : distance officielle, effort continu, FC haute
 *     ou allure bien plus rapide que d'habitude, et de préférence le
 *     week-end.
 *
 * Une course n'alimente les projections que si son parcours mesure bien sa
 * distance officielle : un « 10 km » mesuré à 9,2 km reste une course, mais ne
 * dit rien d'un vrai 10 km.
 */

import { raceLabel } from "./efforts.ts";
import { translator } from "./i18n.ts";
import type { SessionSummary } from "./types.ts";

export interface RaceMark {
  file: string;
  /** AAAA-MM-JJ. */
  date: string;
  /** Distance officielle, en mètres. Absente pour une distance hors standard. */
  distanceM?: number;
  label: string;
  /** Durée écoulée de la séance : sur une course, c'est le chrono. */
  timeS: number;
  /** Distance mesurée par le GPS. */
  measuredM: number;
  by: "user" | "strava" | "name" | "auto";
  /** Sert à caler les projections : distance officielle bien mesurée, course seule. */
  usable: boolean;
  note?: string;
}

/** Séance candidate, vue depuis le lot. */
export interface RaceInput {
  filename: string;
  session: SessionSummary;
  /** Nom de l'activité (archive Strava). */
  title?: string;
  /** Marquée « course » dans Strava. */
  declaredRace?: boolean;
  /** Une série d'intervalles a été trouvée : ce n'est pas une course. */
  hasIntervals: boolean;
  /** Discipline d'un enchaînement multisport. */
  multisport: boolean;
}

const OFFICIAL = [5000, 10000, 15000, 16093.4, 21097.5, 42195] as const;

/**
 * Noms qui annoncent une course. « Course à pied le matin », nom par défaut
 * de Strava en français, ne doit pas passer : « course » seul ne suffit pas.
 * Une distance seule non plus (« Footing 8 km ») : il faut la forme d'une
 * épreuve, « 10km du Parc », « 10 km de la Ville ».
 */
const RACE_WORDS =
  /marathon|\bsemi\b|\bhalf\b|\brace\b|corrida|foul[ée]es|triathlon|duathlon|ekiden|parkrun|\bcross\b|\bcourse (de|du|des)\b|carrera|\bmeia\b|maratona|マラソン|马拉松/i;
const EVENT_DISTANCE = /\b\d{1,2}([.,]\d)?\s?(k|km|kms|miles?)\s+(du|de|des|d'|of)\b/i;
const raceName = (title?: string) => !!title && (RACE_WORDS.test(title) || EVENT_DISTANCE.test(title));

/** Distance annoncée par le nom, s'il en annonce une. */
function nameDistance(title: string): number | undefined {
  if (/semi|half|meia|ハーフ|半马/i.test(title)) return 21097.5;
  if (/marathon|maratona|マラソン|马拉松/i.test(title)) return 42195;
  const miles = title.match(/\b(\d{1,2})\s?miles?\b/i);
  if (miles) return Number(miles[1]) * 1609.34;
  const km = title.match(/\b(\d{1,2}(?:[.,]\d)?)\s?(?:k|km|kms)\b/i);
  return km ? Number(km[1].replace(",", ".")) * 1000 : undefined;
}

/** Distance officielle la plus proche, à 10 % près. */
function nearestOfficial(measuredM: number): number | undefined {
  let best: number | undefined;
  for (const d of OFFICIAL) {
    if (Math.abs(measuredM - d) / d <= 0.1 && (best == null || Math.abs(measuredM - d) < Math.abs(measuredM - best))) best = d;
  }
  return best;
}

/** Un parcours de course mesure sa distance à -3 % / +6 % près au GPS. */
const wellMeasured = (measuredM: number, officialM: number) =>
  measuredM >= officialM * 0.97 && measuredM <= officialM * 1.06;

/** FC moyenne minimale, en part de la FC max, pour une course sur cette distance. */
function hrFloor(officialM: number): number {
  if (officialM <= 10000) return 0.87;
  if (officialM <= 21097.5) return 0.84;
  return 0.78;
}

export function detectRaces(
  inputs: RaceInput[],
  opts: { maxHr?: number; overrides?: Record<string, boolean>; locale?: string } = {},
): { races: RaceMark[]; candidates: RaceMark[] } {
  const tr = translator(opts.locale);
  const runs = inputs.filter((x) =>
    x.session.sport === "running" && x.session.tier === "full" && x.session.startTimeUtc && x.session.distM > 0);

  // Allure habituelle : médiane des séances de course du lot.
  const paces = runs
    .map((x) => x.session.durElapsedS / (x.session.distM / 1000))
    .sort((a, b) => a - b);
  const usualPace = paces.length ? paces[Math.floor(paces.length / 2)] : undefined;

  const races: RaceMark[] = [];
  const candidates: RaceMark[] = [];

  for (const x of runs) {
    const s = x.session;
    const override = opts.overrides?.[x.filename];

    const announced = raceName(x.title) ? nameDistance(x.title!) ?? nearestOfficial(s.distM) : undefined;
    const official = announced ?? nearestOfficial(s.distM);

    let by: RaceMark["by"] | undefined;
    // Un indice d'effort, même insuffisant : de quoi proposer la séance.
    let effort = false;
    if (override === true) by = "user";
    else if (x.declaredRace) by = "strava";
    else if (raceName(x.title)) by = "name";
    else if (official && !x.multisport && wellMeasured(s.distM, official)) {
      // Suggestion automatique : effort continu, et intense.
      const continuous = s.durMovingS / Math.max(1, s.durElapsedS) >= 0.97 && !x.hasIntervals;
      const hrOk = opts.maxHr != null && s.hrAvg != null && s.hrAvg / opts.maxHr >= hrFloor(official);
      const pace = s.durElapsedS / (s.distM / 1000);
      const fast = usualPace != null && pace <= usualPace * 0.88;
      const day = new Date(s.startTimeUtc!).getUTCDay();
      const weekend = day === 0 || day === 6;
      const score = (hrOk ? 2 : 0) + (fast ? 1 : 0) + (weekend ? 1 : 0);
      effort = hrOk || fast;
      if (continuous && effort && score >= 3) by = "auto";
    }

    const mark: RaceMark = {
      file: x.filename,
      date: s.startTimeUtc!.slice(0, 10),
      distanceM: official,
      label: (official != null ? raceLabel(official, opts.locale) : undefined) ?? `${(s.distM / 1000).toFixed(1)} km`,
      timeS: Math.round(s.durElapsedS),
      measuredM: Math.round(s.distM),
      by: by ?? "auto",
      usable: false,
    };

    // Décochée par l'athlète : reste proposée, pour pouvoir la recocher.
    if (override === false) {
      if (by || effort) candidates.push(mark);
      continue;
    }
    if (!by) {
      // Distance officielle et un indice d'effort, sans le reste : on la
      // propose sans la retenir. Sans indice, un footing de 10 km pile ne
      // mérite pas une ligne de plus.
      if (effort) candidates.push(mark);
      continue;
    }

    if (x.multisport) mark.note = tr("race.noteMultisport");
    else if (!official) mark.note = tr("race.noteNonStandard");
    else if (!wellMeasured(s.distM, official)) {
      mark.note = tr("race.noteMeasured", { km: (s.distM / 1000).toFixed(2), official: mark.label });
    } else mark.usable = true;
    races.push(mark);
  }
  return { races, candidates };
}
