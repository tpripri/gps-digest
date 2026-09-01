/**
 * Dérive cardiaque (découplage aérobie).
 *
 * L'erreur que commettent la plupart des outils : calculer la dérive sur
 * n'importe quelle séance. Sur du fractionné, le rapport vitesse/FC oscille
 * énormément entre les répétitions et la récupération ; comparer la première
 * moitié à la seconde produit un nombre qui n'a aucun sens physiologique.
 *
 * La dérive n'est interprétable que sur un effort **continu et régulier** :
 * endurance longue, tempo, seuil tenu. Ce module commence donc par répondre à
 * « cette séance permet-elle de calculer une dérive ? », et refuse de produire
 * un chiffre quand la réponse est non.
 *
 * Référence : Friel, protocole Pa:Hr / Pw:Hr. Seuil usuel : au-delà de 5 %,
 * l'endurance aérobie de base est le facteur limitant.
 */

import { smoothByTime, mean } from "./geo.ts";
import type { Sample, Sport } from "./types.ts";

export interface DriftAnalysis {
  /** null quand la séance ne s'y prête pas — c'est une réponse, pas un échec. */
  decouplingPct: number | null;
  applicable: boolean;
  reason?: string;
  basis: "power" | "speed" | "gap";
  firstHalfRatio?: number;
  secondHalfRatio?: number;
  firstHalfHr?: number;
  secondHalfHr?: number;
  firstHalfPaceSPerKm?: number;
  secondHalfPaceSPerKm?: number;
  /** Portion analysée, après retrait de l'échauffement et des segments douteux. */
  windowFromS?: number;
  windowToS?: number;
  /** Coefficient de variation de la vitesse : mesure la régularité de l'effort. */
  speedCvPct?: number;
  interpretation?: string;
  temperature?: TemperatureContext;
}

export interface TemperatureContext {
  avgC?: number;
  maxC?: number;
  /** Vrai si la valeur vient d'une montre portée au poignet — donc peu fiable. */
  fromWristSensor: boolean;
  caveat?: string;
  /** Renseigné par l'appelant s'il dispose d'une météo externe. */
  externalAvgC?: number;
  externalSource?: string;
}

const MAX_GAP_S = 10;

/**
 * La température relevée par une montre au poignet est chauffée par le corps :
 * elle surestime typiquement de 3 à 8 °C, et le biais augmente à l'arrêt.
 * On l'expose quand même — c'est un ordre de grandeur utile — mais jamais sans
 * l'avertissement, sinon le LLM en tirera des conclusions fausses.
 */
export function temperatureContext(
  samples: Sample[],
  wristMounted: boolean,
  external?: { avgC: number; source: string },
): TemperatureContext | undefined {
  const temps = samples.map((s) => s.temp).filter((v): v is number => v != null);
  if (!temps.length && !external) return undefined;

  return {
    avgC: temps.length ? mean(temps) : undefined,
    maxC: temps.length ? Math.max(...temps) : undefined,
    fromWristSensor: wristMounted,
    caveat: wristMounted && temps.length
      ? "Capteur de la montre, chauffé par le poignet : surestime généralement de 3 à 8 °C. À ne pas confondre avec la température de l'air."
      : undefined,
    externalAvgC: external?.avgC,
    externalSource: external?.source,
  };
}

function coefficientOfVariation(values: number[]): number | undefined {
  const m = mean(values);
  if (m == null || m === 0) return undefined;
  const variance = mean(values.map((v) => (v - m) ** 2));
  return variance == null ? undefined : (Math.sqrt(variance) / m) * 100;
}

export interface DriftOptions {
  /** Secondes d'échauffement à écarter. La FC n'est pas stabilisée avant. */
  warmupS?: number;
  /** Plages à ignorer : artefacts de capteur détectés en amont. */
  excludeRanges?: { fromS: number; toS: number }[];
  wristMountedTemperature?: boolean;
  externalTemperature?: { avgC: number; source: string };
}

export function analyzeDrift(
  samples: Sample[],
  speed: number[],
  sport: Sport,
  opts: DriftOptions = {},
): DriftAnalysis {
  const { warmupS = 600, excludeRanges = [] } = opts;
  const temperature = temperatureContext(
    samples,
    opts.wristMountedTemperature ?? true,
    opts.externalTemperature,
  );

  const excluded = (t: number) => excludeRanges.some((r) => t >= r.fromS && t <= r.toS);
  const hasPower = samples.some((s) => s.pw != null);
  const basis: DriftAnalysis["basis"] = hasPower ? "power" : "speed";

  // Fenêtre d'analyse : après l'échauffement, en mouvement, hors artefacts.
  const idx: number[] = [];
  const movingThreshold = sport === "cycling" ? 1.5 : 1.2;
  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    if (s.t < warmupS) continue;
    if (excluded(s.t)) continue;
    if (s.hr == null || s.hr < 60) continue;
    const work = hasPower ? s.pw : speed[i];
    if (work == null || work <= movingThreshold) continue;
    idx.push(i);
  }

  const notApplicable = (reason: string): DriftAnalysis => ({
    decouplingPct: null,
    applicable: false,
    reason,
    basis,
    temperature,
  });

  if (idx.length < 300) {
    return notApplicable(
      "Moins de 5 minutes d'effort continu exploitable après l'échauffement : trop court pour une dérive fiable.",
    );
  }

  const window = idx.map((i) => ({
    t: samples[i].t,
    hr: samples[i].hr!,
    work: (hasPower ? samples[i].pw! : speed[i]) as number,
    speed: speed[i],
  }));

  const speedCv = coefficientOfVariation(window.map((w) => w.speed));

  // Le verrou principal : au-delà de ~18 % de variation, l'effort est du
  // fractionné déguisé et la dérive ne veut rien dire.
  if (speedCv != null && speedCv > 18) {
    return {
      ...notApplicable(
        `Effort trop irrégulier (variation d'allure de ${Math.round(speedCv)} %) : la dérive cardiaque ne s'interprète que sur un effort continu. Analyser plutôt les répétitions une à une.`,
      ),
      speedCvPct: speedCv,
    };
  }

  const mid = Math.floor(window.length / 2);
  const half = (from: number, to: number) => {
    const slice = window.slice(from, to);
    const ratio = mean(slice.map((w) => w.work / w.hr));
    return {
      ratio,
      hr: mean(slice.map((w) => w.hr)),
      speed: mean(slice.map((w) => w.speed)),
    };
  };

  const a = half(0, mid);
  const b = half(mid, window.length);
  if (a.ratio == null || b.ratio == null || a.ratio === 0) {
    return notApplicable("Données insuffisantes pour comparer les deux moitiés de l'effort.");
  }

  const pct = ((a.ratio - b.ratio) / a.ratio) * 100;
  const paceOf = (v?: number) => (v && v > 0.3 ? 1000 / v : undefined);

  let interpretation: string;
  if (pct < 0) {
    interpretation =
      "Découplage négatif : le rendement s'améliore en seconde moitié. Typique d'un échauffement encore incomplet au début de la fenêtre, ou d'une accélération progressive volontaire.";
  } else if (pct < 3) {
    interpretation = "Très faible dérive : l'effort était nettement sous le seuil aérobie.";
  } else if (pct <= 5) {
    interpretation =
      "Dérive dans la norme (≤ 5 %). L'endurance aérobie soutient cette allure sur cette durée.";
  } else if (pct <= 10) {
    interpretation =
      "Dérive marquée (> 5 %). L'allure était trop élevée pour la durée, ou l'endurance de base est le facteur limitant. Chaleur, déshydratation et fatigue résiduelle produisent le même effet.";
  } else {
    interpretation =
      "Dérive importante (> 10 %). Allure non soutenable sur cette durée dans ces conditions. Vérifier la température et l'état de fraîcheur avant de conclure sur la forme.";
  }

  return {
    decouplingPct: pct,
    applicable: true,
    basis,
    firstHalfRatio: a.ratio,
    secondHalfRatio: b.ratio,
    firstHalfHr: a.hr,
    secondHalfHr: b.hr,
    firstHalfPaceSPerKm: paceOf(a.speed),
    secondHalfPaceSPerKm: paceOf(b.speed),
    windowFromS: window[0].t,
    windowToS: window[window.length - 1].t,
    speedCvPct: speedCv,
    interpretation,
    temperature,
  };
}

/**
 * Profil FC/vitesse : FC moyenne par tranche d'allure. Beaucoup plus parlant
 * pour un modèle qu'une dérive scalaire, et comparable d'une séance à l'autre.
 */
export interface HrSpeedPoint {
  paceSPerKm: number;
  hrAvg: number;
  timeS: number;
}

export function hrSpeedProfile(samples: Sample[], speed: number[], bucketS = 15): HrSpeedPoint[] {
  const hr = smoothByTime(samples, (s) => s.hr, 10);
  const buckets = new Map<number, { hrSum: number; time: number; n: number }>();

  for (let i = 1; i < samples.length; i++) {
    const v = speed[i];
    const h = hr[i];
    if (v == null || v < 1.5 || h == null) continue;
    const pace = 1000 / v;
    if (pace > 900) continue; // au-delà de 15 min/km, ce n'est plus de la course
    const key = Math.round(pace / bucketS) * bucketS;
    const dt = Math.min(samples[i].t - samples[i - 1].t, MAX_GAP_S);
    const cur = buckets.get(key) ?? { hrSum: 0, time: 0, n: 0 };
    cur.hrSum += h * dt;
    cur.time += dt;
    cur.n++;
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
