/**
 * Progression aérobie entre séances.
 *
 * C'est la question qu'un coureur se pose vraiment : « est-ce que je
 * progresse ? » Et la réponse ne se lit pas dans un chrono, qui dépend du jour,
 * du parcours et de l'envie. Elle se lit dans le **coût cardiaque à allure
 * donnée** : tenir 5:20/km à 132 bpm aujourd'hui contre 5:45/km à 133 il y a
 * six semaines, c'est un gain d'endurance fondamentale mesurable.
 *
 * Trois précautions, sans lesquelles la courbe ment :
 *
 *  1. **Ne jamais mélanger deux capteurs de FC.** Un passage du poignet à la
 *     ceinture produit un décrochage qui ressemble à s'y méprendre à une
 *     progression. Les séries sont donc séparées par capteur.
 *  2. **La chaleur décale tout vers le haut.** Une séance à 28 °C coûte 5 à
 *     10 bpm de plus à allure identique. La température est reportée à côté de
 *     chaque point pour que la lecture en tienne compte.
 *  3. **Ne comparer que des régimes réellement tenus.** Un passage de 20 s à
 *     5:20/km au milieu d'un fractionné n'est pas un régime : seules les
 *     tranches d'allure occupées assez longtemps comptent.
 */

import { mean } from "./geo.ts";
import type { HrSpeedPoint } from "./drift.ts";
import type { HrSource } from "./sensor.ts";
import { translator } from "./i18n.ts";

/** Allures de référence auxquelles on interroge chaque séance, en s/km. */
export const REFERENCE_PACES = [270, 300, 330, 360] as const;

export interface ProgressionPoint {
  date: string;
  filename: string;
  paceSPerKm: number;
  hrBpm: number;
  /** Temps réellement passé à ce régime, en secondes. Sert de poids. */
  timeS: number;
  /** Allure effectivement tenue, qui peut différer un peu de la référence. */
  actualPaceSPerKm: number;
  hrSource: HrSource;
  tempC?: number;
  /** Vitesse / FC : monte quand le rendement s'améliore. */
  efficiency: number;
}

export interface ProgressionSeries {
  paceSPerKm: number;
  paceLabel: string;
  hrSource: HrSource;
  points: ProgressionPoint[];
  /** Pente de la FC dans le temps, en bpm par semaine. Négatif = progression. */
  hrTrendBpmPerWeek?: number;
  /** Écart entre le premier et le dernier point, en bpm. */
  hrDeltaBpm?: number;
  spanDays?: number;
  verdict?: string;
}

export interface ProgressionAnalysis {
  series: ProgressionSeries[];
  warnings: string[];
}

export interface SessionProfile {
  filename: string;
  date?: string;
  hrSource: HrSource;
  hrSpeed: HrSpeedPoint[];
  tempC?: number;
  sport: string;
}

function paceText(sPerKm: number): string {
  const m = Math.floor(sPerKm / 60);
  const s = Math.round(sPerKm % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Interpole la FC à une allure de référence à partir du profil d'une séance.
 *
 * On n'interpole qu'entre deux tranches encadrantes réellement occupées, et
 * jamais au-delà des allures observées : extrapoler la FC d'un coureur à une
 * allure qu'il n'a pas tenue ce jour-là n'aurait aucun fondement.
 */
function hrAtPace(
  profile: HrSpeedPoint[],
  targetPace: number,
  toleranceS = 25,
): { hr: number; time: number; actualPace: number } | null {
  if (profile.length < 1) return null;

  // Cas fréquent et longtemps mal traité : un coureur régulier n'occupe qu'une
  // ou deux tranches d'allure sur toute la séance. Exiger un encadrement des
  // deux côtés rejetait justement les séances les plus exploitables. Une
  // tranche unique, proche de la cible et tenue assez longtemps, vaut mieux
  // qu'une interpolation impossible — on garde alors l'allure réellement
  // tenue plutôt que de prétendre qu'elle valait la cible.
  const near = profile
    .filter((p) => Math.abs(p.paceSPerKm - targetPace) <= toleranceS && p.timeS >= 120)
    .sort((a, b) => Math.abs(a.paceSPerKm - targetPace) - Math.abs(b.paceSPerKm - targetPace));

  let below: HrSpeedPoint | undefined;
  let above: HrSpeedPoint | undefined;
  for (const p of profile) {
    if (p.timeS < 60) continue;
    if (p.paceSPerKm <= targetPace) below = p;
    if (p.paceSPerKm >= targetPace && !above) above = p;
  }
  const bracketed =
    below && above &&
    Math.abs(below.paceSPerKm - targetPace) <= toleranceS &&
    Math.abs(above.paceSPerKm - targetPace) <= toleranceS;

  if (bracketed) {
    const span = above!.paceSPerKm - below!.paceSPerKm;
    if (span <= 0) {
      return { hr: below!.hrAvg, time: below!.timeS, actualPace: below!.paceSPerKm };
    }
    const w = (targetPace - below!.paceSPerKm) / span;
    return {
      hr: below!.hrAvg + w * (above!.hrAvg - below!.hrAvg),
      time: Math.min(below!.timeS, above!.timeS),
      actualPace: targetPace,
    };
  }

  if (near.length) {
    return { hr: near[0].hrAvg, time: near[0].timeS, actualPace: near[0].paceSPerKm };
  }
  return null;
}

/** Régression linéaire pondérée par le temps passé à chaque régime. */
function weightedSlope(
  points: { x: number; y: number; w: number }[],
): number | undefined {
  if (points.length < 3) return undefined;
  const W = points.reduce((s, p) => s + p.w, 0);
  if (W <= 0) return undefined;
  const mx = points.reduce((s, p) => s + p.x * p.w, 0) / W;
  const my = points.reduce((s, p) => s + p.y * p.w, 0) / W;
  let num = 0;
  let den = 0;
  for (const p of points) {
    num += p.w * (p.x - mx) * (p.y - my);
    den += p.w * (p.x - mx) ** 2;
  }
  return den === 0 ? undefined : num / den;
}

export function analyzeProgression(sessions: SessionProfile[], locale?: string): ProgressionAnalysis {
  const tr = translator(locale);
  const warnings: string[] = [];
  const runs = sessions.filter((s) => s.sport === "running" && s.date && s.hrSpeed.length >= 2);

  if (runs.length < 3) {
    return {
      series: [],
      warnings: [tr("prog.tooFew")],
    };
  }

  const sources = new Set(runs.map((r) => r.hrSource));
  if (sources.size > 1) {
    warnings.push(tr("prog.multiSource"));
  }

  const series: ProgressionSeries[] = [];

  for (const source of sources) {
    if (source === "unknown") continue;
    const group = runs.filter((r) => r.hrSource === source);
    if (group.length < 3) continue;

    for (const target of REFERENCE_PACES) {
      const points: ProgressionPoint[] = [];
      for (const s of group) {
        const hit = hrAtPace(s.hrSpeed, target);
        if (!hit) continue;
        points.push({
          date: s.date!,
          filename: s.filename,
          paceSPerKm: target,
          hrBpm: hit.hr,
          timeS: hit.time,
          actualPaceSPerKm: hit.actualPace,
          hrSource: source,
          tempC: s.tempC,
          efficiency: (1000 / hit.actualPace) / hit.hr,
        });
      }
      if (points.length < 3) continue;

      points.sort((a, b) => a.date.localeCompare(b.date));
      const t0 = Date.parse(points[0].date);
      const spanDays = (Date.parse(points[points.length - 1].date) - t0) / 86400000;

      const slopePerDay = weightedSlope(
        points.map((p) => ({
          x: (Date.parse(p.date) - t0) / 86400000,
          y: p.hrBpm,
          w: Math.min(p.timeS, 600),
        })),
      );
      const trend = slopePerDay != null ? slopePerDay * 7 : undefined;
      const delta = points[points.length - 1].hrBpm - points[0].hrBpm;

      // Une tendance sur moins de trois semaines confond progression et
      // variations du quotidien : sommeil, chaleur, fatigue résiduelle.
      let verdict: string | undefined;
      if (spanDays < 21) {
        verdict = tr("prog.shortSpan");
      } else if (trend != null && trend <= -0.4) {
        verdict = tr("prog.improving", { bpm: Math.abs(trend).toFixed(1), pace: paceText(target) });
      } else if (trend != null && trend >= 0.4) {
        verdict = tr("prog.worsening", { pace: paceText(target) });
      } else {
        verdict = tr("prog.stable");
      }

      series.push({
        paceSPerKm: target,
        paceLabel: `${paceText(target)}/km`,
        hrSource: source,
        points,
        hrTrendBpmPerWeek: trend,
        hrDeltaBpm: delta,
        spanDays,
        verdict,
      });
    }
  }

  if (!series.length) {
    warnings.push(tr("prog.none"));
  }

  const withTemp = runs.filter((r) => r.tempC != null);
  if (withTemp.length >= 3) {
    const temps = withTemp.map((r) => r.tempC!);
    const spread = Math.max(...temps) - Math.min(...temps);
    if (spread >= 10) {
      warnings.push(tr("prog.tempSpread", { spread: Math.round(spread) }));
    }
  }

  return { series, warnings };
}

/** Résumé d'une séance, pour le bloc transversal du dossier. */
export function progressionRows(analysis: ProgressionAnalysis) {
  return analysis.series.flatMap((s) =>
    s.points.map((p) => ({
      date: p.date,
      pace_ref: s.paceLabel,
      hr_bpm: Math.round(p.hrBpm),
      time_at_pace_s: p.timeS,
      hr_source: p.hrSource,
      temp_air_c: p.tempC != null ? Math.round(p.tempC) : undefined,
      pace_held: `${Math.floor(p.actualPaceSPerKm / 60)}:${String(Math.round(p.actualPaceSPerKm % 60)).padStart(2, "0")}`,
      efficiency: Math.round(p.efficiency * 1000) / 1000,
    })),
  );
}

export { mean };
