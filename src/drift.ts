/**
 * Dérive cardiaque (découplage aérobie).
 *
 * Version 2. La précédente répondait par oui ou non : dès que l'effort était
 * irrégulier, elle refusait de calculer. C'était trop binaire. Une sortie
 * longue avec deux blocs de 5 km contient des portions parfaitement régulières
 * sur lesquelles la dérive a un sens — il faut les trouver, pas jeter la
 * séance.
 *
 * Le module cherche donc **la plus longue fenêtre homogène** de la séance,
 * calcule la dérive dessus, et annonce laquelle il a retenue. C'est ce qu'on
 * fait à la main quand on analyse un fichier sérieusement.
 *
 * Il ne renonce que dans un cas : quand aucune fenêtre suffisamment longue et
 * suffisamment régulière n'existe. Là, l'absence de mesure est la réponse.
 *
 * Références : protocole Pa:Hr / Pw:Hr (Friel). Au-delà de 5 %, l'endurance
 * aérobie de base est généralement le facteur limitant — sous réserve de la
 * chaleur, qui produit exactement le même effet.
 */

import { smoothByTime, mean, maxOf } from "./geo.ts";
import { t, translator } from "./i18n.ts";
import type { Sample, Sport } from "./types.ts";

export interface DriftWindow {
  fromS: number;
  toS: number;
  durationS: number;
  distanceM: number;
  /** Coefficient de variation de la vitesse sur la fenêtre, en %. */
  speedCvPct: number;
  paceSPerKm?: number;
}

export interface DriftAnalysis {
  /** null quand aucune fenêtre exploitable n'existe — c'est une réponse. */
  decouplingPct: number | null;
  applicable: boolean;
  reason?: string;
  /** Base du ratio. En course, toujours la vitesse : voir noteBasis. */
  basis: "power" | "speed";
  /** Explique pourquoi cette base a été retenue. */
  basisNote?: string;
  /** Fenêtre effectivement analysée. */
  window?: DriftWindow;
  /** Part de la séance couverte par la fenêtre, en %. */
  windowCoveragePct?: number;
  /**
   * Représentativité de la fenêtre. « indicatif » signale que le chiffre est
   * calculé sur une portion courte ou peu intense — un retour au calme, par
   * exemple : la mesure est valide mais ne décrit pas la séance.
   */
  quality?: "solide" | "indicatif";
  qualityNote?: string;
  firstHalfRatio?: number;
  secondHalfRatio?: number;
  firstHalfHr?: number;
  secondHalfHr?: number;
  firstHalfPaceSPerKm?: number;
  secondHalfPaceSPerKm?: number;
  interpretation?: string;
  temperature?: TemperatureContext;
}

export interface TemperatureContext {
  avgC?: number;
  maxC?: number;
  fromWristSensor: boolean;
  caveat?: string;
  externalAvgC?: number;
  externalSource?: string;
  apparentC?: number;
  humidityPct?: number;
  windKmh?: number;
}

/**
 * La température relevée par une montre au poignet est chauffée par le corps :
 * elle surestime typiquement de 3 à 8 °C, et le biais augmente à l'arrêt.
 * On l'expose quand même — c'est un ordre de grandeur — mais jamais sans
 * l'avertissement, sinon le modèle en tirera des conclusions fausses.
 */
export function temperatureContext(
  samples: Sample[],
  wristMounted: boolean,
  external?: {
    avgC: number;
    source: string;
    apparentC?: number;
    humidityPct?: number;
    windKmh?: number;
  },
  locale?: string,
): TemperatureContext | undefined {
  const temps = samples.map((s) => s.temp).filter((v): v is number => v != null);
  if (!temps.length && !external) return undefined;

  return {
    avgC: temps.length ? mean(temps) : undefined,
    maxC: maxOf(temps),
    fromWristSensor: wristMounted,
    caveat:
      wristMounted && temps.length
        ? t(locale, "drift.wristCaveat")
        : undefined,
    externalAvgC: external?.avgC,
    externalSource: external?.source,
    apparentC: external?.apparentC,
    humidityPct: external?.humidityPct,
    windKmh: external?.windKmh,
  };
}

// ────────────────────────────── fenêtre homogène ──────────────────────────

interface Prefix {
  t: number[];
  sum: number[];
  sumSq: number[];
}

/** Sommes préfixes : permettent de calculer le CV d'une fenêtre en O(1). */
function buildPrefix(times: number[], values: number[]): Prefix {
  const n = values.length;
  const sum = new Array<number>(n + 1).fill(0);
  const sumSq = new Array<number>(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    sum[i + 1] = sum[i] + values[i];
    sumSq[i + 1] = sumSq[i] + values[i] * values[i];
  }
  return { t: times, sum, sumSq };
}

function cvOf(p: Prefix, i: number, j: number): number {
  const n = j - i;
  if (n < 2) return Infinity;
  const m = (p.sum[j] - p.sum[i]) / n;
  if (m <= 0.1) return Infinity;
  const variance = Math.max(0, (p.sumSq[j] - p.sumSq[i]) / n - m * m);
  return (Math.sqrt(variance) / m) * 100;
}

export interface WindowSearchOptions {
  /** Durée minimale exploitable. En dessous, la dérive est du bruit. */
  minDurationS?: number;
  /** Régularité exigée : CV maximal du signal d'effort, en %. */
  maxCvPct?: number;
  /** Secondes d'échauffement à écarter d'office. */
  warmupS?: number;
  excludeRanges?: { fromS: number; toS: number }[];
  /**
   * Signal sur lequel juger la régularité. Décisif : la dérive compare le
   * rendement à **effort constant**, donc la régularité doit se mesurer sur la
   * grandeur qui sert de numérateur au ratio. À vélo avec capteur, c'est la
   * puissance ; ailleurs, la vitesse.
   *
   * Mesurer la régularité sur la vitesse pour un ratio puissance/FC produit un
   * faux : sur home trainer la vitesse est virtuelle et reste lisse pendant
   * que la puissance chute, ce qui fait passer pour de la dérive cardiaque un
   * simple relâchement de l'effort.
   */
  effortSeries?: (number | undefined)[];
}

/**
 * Cherche la plus longue fenêtre régulière.
 *
 * Recherche exhaustive sur une grille de 30 s : pour une sortie d'une heure
 * cela fait ~7 000 couples début/fin, chacun évalué en temps constant grâce
 * aux sommes préfixes. Inutile d'être plus malin.
 *
 * À durée égale on préfère la fenêtre la plus régulière — c'est elle qui donne
 * la mesure la plus propre.
 */
export function findHomogeneousWindow(
  samples: Sample[],
  speed: number[],
  opts: WindowSearchOptions = {},
): { from: number; to: number; cv: number } | null {
  const { minDurationS = 600, maxCvPct = 8, warmupS = 600, excludeRanges = [] } = opts;
  const effort = opts.effortSeries;
  const n = samples.length;
  if (n < 60) return null;

  const excluded = (t: number) => excludeRanges.some((r) => t >= r.fromS && t <= r.toS);

  // Indices éligibles : après l'échauffement, en mouvement, FC plausible,
  // hors plages où le capteur est suspect.
  const idx: number[] = [];
  for (let i = 0; i < n; i++) {
    const s = samples[i];
    if (s.t < warmupS) continue;
    if (excluded(s.t)) continue;
    if (s.hr == null || s.hr < 60) continue;
    if (effort) {
      const e = effort[i];
      if (e == null || e <= 0) continue;
    } else if (speed[i] <= 1.0) continue;
    idx.push(i);
  }
  if (idx.length < 60) return null;

  // La vitesse instantanée à 1 Hz est dominée par le bruit GPS, pas par la
  // régularité de l'effort : sur un bloc tempo parfaitement tenu, son
  // coefficient de variation dépasse 8 % alors que les temps au kilomètre
  // varient de moins de 2 %. Sans lissage, la recherche tronquait les blocs
  // réguliers au lieu de les retenir en entier. On lisse donc sur 30 s, ce qui
  // mesure la régularité de l'allure et non celle du signal GPS.
  const base = effort ?? speed;
  const smoothed = smoothByTime(
    samples.map((s, i) => ({ t: s.t, dist: base[i] ?? 0 }) as Sample),
    (s) => s.dist,
    30,
  );

  const times = idx.map((i) => samples[i].t);
  const vals = idx.map((i) => smoothed[i] ?? base[i] ?? 0);
  const prefix = buildPrefix(times, vals);

  // Grille : un candidat toutes les ~30 s de données.
  const stride = Math.max(1, Math.round(idx.length / ((times[times.length - 1] - times[0]) / 30)));
  const marks: number[] = [];
  for (let k = 0; k < idx.length; k += stride) marks.push(k);
  if (marks[marks.length - 1] !== idx.length - 1) marks.push(idx.length - 1);

  let best: { from: number; to: number; cv: number; dur: number } | null = null;

  for (let a = 0; a < marks.length; a++) {
    for (let b = marks.length - 1; b > a; b--) {
      const i = marks[a];
      const j = marks[b];
      const dur = times[j] - times[i];
      if (dur < minDurationS) break; // les suivants sont plus courts encore
      // Une fenêtre qui saute une coupure (pause, tunnel) n'est pas continue.
      if (j - i < 30) continue;
      const cv = cvOf(prefix, i, j + 1);
      if (cv > maxCvPct) continue;
      if (!best || dur > best.dur + 30 || (Math.abs(dur - best.dur) <= 30 && cv < best.cv)) {
        best = { from: idx[i], to: idx[j], cv, dur };
      }
      break; // pour ce début, on a trouvé la plus longue fenêtre valide
    }
  }

  return best ? { from: best.from, to: best.to, cv: best.cv } : null;
}

// ──────────────────────────────── analyse ─────────────────────────────────

export interface DriftOptions {
  warmupS?: number;
  excludeRanges?: { fromS: number; toS: number }[];
  wristMountedTemperature?: boolean;
  externalTemperature?: {
    avgC: number;
    source: string;
    apparentC?: number;
    humidityPct?: number;
    windKmh?: number;
  };
  minDurationS?: number;
  maxCvPct?: number;
  locale?: string;
}

export function analyzeDrift(
  samples: Sample[],
  speed: number[],
  sport: Sport,
  opts: DriftOptions = {},
): DriftAnalysis {
  const tr = translator(opts.locale);
  const temperature = temperatureContext(
    samples,
    opts.wristMountedTemperature ?? true,
    opts.externalTemperature,
    opts.locale,
  );

  const hasPower = samples.some((s) => s.pw != null);

  // Correction importante : en course à pied, la puissance mesurée par une
  // montre n'est pas comparable à la puissance mécanique d'un capteur vélo.
  // Elle dépend du modèle d'estimation du constructeur et n'a pas de
  // référentiel commun. Baser le découplage dessus produirait un chiffre
  // d'apparence valide, mais sans signification physiologique établie.
  // On ne l'utilise donc qu'à vélo.
  const usePower = hasPower && sport === "cycling";
  const basis: DriftAnalysis["basis"] = usePower ? "power" : "speed";
  const basisNote =
    hasPower && sport !== "cycling"
      ? tr("drift.basisPowerIgnored")
      : undefined;

  const win = findHomogeneousWindow(samples, speed, {
    minDurationS: opts.minDurationS ?? 600,
    // La puissance est plus bruitée que la vitesse lissée : un seuil identique
    // rejetterait toute séance à vélo.
    maxCvPct: opts.maxCvPct ?? (usePower ? 12 : 8),
    warmupS: opts.warmupS ?? 600,
    excludeRanges: opts.excludeRanges ?? [],
    effortSeries: usePower ? samples.map((s) => s.pw) : undefined,
  });

  if (!win) {
    return {
      decouplingPct: null,
      applicable: false,
      reason: usePower
        ? tr("drift.noWindowPower")
        : tr("drift.noWindowSpeed"),
      basis,
      basisNote,
      temperature,
    };
  }

  const slice: { t: number; hr: number; work: number; speed: number }[] = [];
  for (let i = win.from; i <= win.to; i++) {
    const s = samples[i];
    const work = usePower ? s.pw : speed[i];
    if (s.hr == null || s.hr < 60 || work == null || work <= 0) continue;
    slice.push({ t: s.t, hr: s.hr, work, speed: speed[i] });
  }
  if (slice.length < 120) {
    return {
      decouplingPct: null,
      applicable: false,
      reason: tr("drift.sparseHr"),
      basis,
      basisNote,
      temperature,
    };
  }

  const mid = Math.floor(slice.length / 2);
  const half = (from: number, to: number) => {
    const part = slice.slice(from, to);
    return {
      ratio: mean(part.map((w) => w.work / w.hr)),
      hr: mean(part.map((w) => w.hr)),
      speed: mean(part.map((w) => w.speed)),
    };
  };

  const a = half(0, mid);
  const b = half(mid, slice.length);
  if (a.ratio == null || b.ratio == null || a.ratio === 0) {
    return {
      decouplingPct: null,
      applicable: false,
      reason: tr("drift.halvesInsufficient"),
      basis,
      basisNote,
      temperature,
    };
  }

  const pct = ((a.ratio - b.ratio) / a.ratio) * 100;

  // Dernier garde-fou. Le découplage suppose un effort tenu : si le numérateur
  // lui-même s'effondre entre les deux moitiés, le ratio baisse pour une
  // raison triviale — l'athlète a levé le pied — et l'appeler « dérive
  // cardiaque » serait un contresens.
  const workFirst = mean(slice.slice(0, mid).map((w) => w.work));
  const workSecond = mean(slice.slice(mid).map((w) => w.work));
  if (workFirst != null && workSecond != null && workFirst > 0) {
    const workDropPct = ((workFirst - workSecond) / workFirst) * 100;
    if (workDropPct > 6) {
      return {
        decouplingPct: null,
        applicable: false,
        reason: tr(usePower ? "drift.workDrop.power" : "drift.workDrop.speed", {
          drop: workDropPct.toFixed(0),
          from: Math.round(workFirst),
          to: Math.round(workSecond),
        }),
        basis,
        basisNote,
        temperature,
      };
    }
  }

  const paceOf = (v?: number) => (v && v > 0.3 ? 1000 / v : undefined);
  const totalS = samples.length ? samples[samples.length - 1].t - samples[0].t : 0;
  const windowDur = samples[win.to].t - samples[win.from].t;
  const windowDist = (samples[win.to].dist ?? 0) - (samples[win.from].dist ?? 0);
  const coveragePct = totalS > 0 ? (windowDur / totalS) * 100 : 0;

  // Représentativité : une fenêtre courte, ou située dans la partie molle de
  // la séance, donne un chiffre exact mais peu informatif. Le dire vaut mieux
  // que laisser croire qu'il résume l'effort.
  const movingHr = samples
    .map((s, i) => (speed[i] > 1.0 && s.hr != null ? s.hr : null))
    .filter((v): v is number => v != null)
    .sort((x, y) => x - y);
  const p40 = movingHr.length ? movingHr[Math.floor(movingHr.length * 0.4)] : undefined;
  const windowHr = mean(slice.map((w) => w.hr));
  const lowIntensity = p40 != null && windowHr != null && windowHr <= p40;
  const short = windowDur < 900 || coveragePct < 40;

  let quality: "solide" | "indicatif" = short || lowIntensity ? "indicatif" : "solide";
  let qualityNote: string | undefined;
  if (lowIntensity && short) {
    qualityNote = tr("drift.qualityNote.shortEasy");
  } else if (lowIntensity) {
    qualityNote = tr("drift.qualityNote.easy");
  } else if (short) {
    qualityNote = tr("drift.qualityNote.short", {
      min: Math.round(windowDur / 60),
      pct: Math.round(coveragePct),
    });
  }
  const airC = temperature?.externalAvgC ?? undefined;
  const hot = airC != null && airC >= 24;

  let interpretation: string;
  if (pct < 0) {
    interpretation = tr("drift.interp.negative");
  } else if (pct < 3) {
    interpretation = tr("drift.interp.low");
  } else if (pct <= 5) {
    interpretation = tr("drift.interp.normal");
  } else if (pct <= 10) {
    interpretation = hot
      ? tr("drift.interp.markedHot", { temp: Math.round(airC!) })
      : tr("drift.interp.marked");
  } else {
    interpretation = hot
      ? tr("drift.interp.highHot", { temp: Math.round(airC!) })
      : tr("drift.interp.high");
  }

  return {
    decouplingPct: pct,
    applicable: true,
    basis,
    basisNote,
    window: {
      fromS: Math.round(samples[win.from].t),
      toS: Math.round(samples[win.to].t),
      durationS: Math.round(windowDur),
      distanceM: Math.round(windowDist),
      speedCvPct: win.cv,
      paceSPerKm: windowDist > 100 ? (windowDur / windowDist) * 1000 : undefined,
    },
    windowCoveragePct: coveragePct,
    quality,
    qualityNote,
    firstHalfRatio: a.ratio,
    secondHalfRatio: b.ratio,
    firstHalfHr: a.hr,
    secondHalfHr: b.hr,
    firstHalfPaceSPerKm: paceOf(a.speed),
    secondHalfPaceSPerKm: paceOf(b.speed),
    interpretation,
    temperature,
  };
}

/** Libellé affichable de la représentativité, dans la langue demandée. */
export function driftQualityLabel(q: "solide" | "indicatif", locale?: string): string {
  return t(locale, q === "solide" ? "drift.quality.solide" : "drift.quality.indicatif");
}

/**
 * Profil FC/allure : FC moyenne par tranche d'allure. Sert de base au suivi de
 * progression aérobie entre séances (voir progression.ts).
 */
export interface HrSpeedPoint {
  paceSPerKm: number;
  hrAvg: number;
  timeS: number;
}

export function hrSpeedProfile(samples: Sample[], speed: number[], bucketS = 15): HrSpeedPoint[] {
  const hr = smoothByTime(samples, (s) => s.hr, 10);
  const buckets = new Map<number, { hrSum: number; time: number }>();

  for (let i = 1; i < samples.length; i++) {
    const v = speed[i];
    const h = hr[i];
    if (v == null || v < 1.5 || h == null) continue;
    const pace = 1000 / v;
    if (pace > 900) continue;
    const key = Math.round(pace / bucketS) * bucketS;
    const dt = Math.min(samples[i].t - samples[i - 1].t, 10);
    const cur = buckets.get(key) ?? { hrSum: 0, time: 0 };
    cur.hrSum += h * dt;
    cur.time += dt;
    buckets.set(key, cur);
  }

  return [...buckets.entries()]
    // Moins de 30 s dans une tranche : bruit de transition, pas un régime tenu.
    .filter(([, v]) => v.time >= 30)
    .map(([paceSPerKm, v]) => ({
      paceSPerKm,
      hrAvg: v.hrSum / v.time,
      timeS: Math.round(v.time),
    }))
    .sort((x, y) => x.paceSPerKm - y.paceSPerKm);
}
