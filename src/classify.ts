/**
 * Classification des activités.
 *
 * Le champ `Sport` du fichier n'est pas fiable, et ce n'est pas une opinion :
 * sur des fichiers réels, une séance de renforcement avec des portions courues
 * est étiquetée « Running », et deux séances en bassin sont étiquetées
 * « Other ». Filtrer sur le libellé laisserait passer la première et
 * rejetterait les secondes.
 *
 * On classe donc sur la forme des données, et on range chaque séance dans un
 * niveau de traitement :
 *
 *   full      course et vélo — toutes les analyses
 *   swim      natation — métriques propres, distance issue des longueurs
 *   load      le reste — compté dans la charge, jamais analysé
 *
 * Le niveau « load » est délibéré. Une séance de renforcement le soir d'un
 * footing du matin pèse sur la récupération : la faire disparaître fausserait
 * le volume hebdomadaire et la densité de séances dures. On l'exclut de
 * l'analyse, pas du tableau.
 */

import { mmss } from "./geo.ts";
import { translator } from "./i18n.ts";
import type { Activity, Sample, Sport } from "./types.ts";

export type ActivityTier = "full" | "swim" | "load";

export interface Classification {
  tier: ActivityTier;
  sport: Sport;
  /** Vrai si le sport retenu diffère de celui déclaré dans le fichier. */
  reclassified: boolean;
  declaredSport: Sport;
  confidence: number;
  reasons: string[];
  /** Nage en bassin : distance par longueurs, aucune position. */
  poolSwim?: boolean;
  /** Longueur de bassin déduite, en mètres. */
  poolLengthM?: number;
}

const median = (xs: number[]): number | undefined => {
  if (!xs.length) return undefined;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

/**
 * Longueur de bassin déduite du pas de distance entre tours.
 * Les bassins normalisés font 25, 33⅓ ou 50 m.
 */
function inferPoolLength(lapDistances: number[]): number | undefined {
  const positive = lapDistances.filter((d) => d > 5);
  if (positive.length < 2) return undefined;
  for (const candidate of [25, 33.33, 50]) {
    const ok = positive.every((d) => {
      const n = d / candidate;
      return Math.abs(n - Math.round(n)) < 0.06 && Math.round(n) >= 1;
    });
    if (ok) return candidate;
  }
  return undefined;
}

export function classifyActivity(
  activity: Activity,
  speed: number[],
  locale?: string,
): Classification {
  const tr = translator(locale);
  const declared = activity.sport;
  const s = activity.samples;
  const reasons: string[] = [];

  const elapsed = s.length ? s[s.length - 1].t - s[0].t : 0;
  const withPosition = s.filter((p) => p.lat != null).length;
  const positionPct = s.length ? (withPosition / s.length) * 100 : 0;
  const trackDist = s.length ? (s[s.length - 1].dist ?? 0) : 0;
  const lapDist = activity.laps.reduce((sum, l) => sum + l.distM, 0);
  const distM = Math.max(trackDist, lapDist);
  const cadences = s.map((p) => p.cad).filter((v): v is number => v != null && v > 0);
  const medCad = median(cadences);
  const movingSpeed = speed.filter((v) => v > 0.3);
  const medSpeed = median(movingSpeed) ?? 0;

  // ── Natation ────────────────────────────────────────────────────────────
  // Signature du bassin : aucune position, et une distance qui n'existe que
  // dans les tours ou qui progresse par paliers — une montre y compte des
  // longueurs, pas des mètres.
  const noPosition = positionPct < 5;
  const trackDistUseless = trackDist < distM * 0.5;
  const poolLength = inferPoolLength(activity.laps.map((l) => l.distM));

  // ── Signature de la nage ────────────────────────────────────────────────
  // Deux formes très différentes, et la seconde m'avait échappé :
  //
  //   Bassin     aucune position, distance comptée en longueurs.
  //   Eau libre  position présente mais **intermittente** — le GPS décroche à
  //              chaque bras immergé et se raccroche à la sortie. Mesuré sur
  //              un fichier réel : 70 % de couverture et 20 basculements,
  //              contre 100 % et zéro sur une sortie vélo.
  //
  // Exiger une absence totale de position, comme le faisait la version
  // précédente, classait donc toute nage en eau libre hors endurance.
  const noCadence = cadences.length < s.length * 0.1;
  const swimSpeed = medSpeed >= 0.4 && medSpeed <= 2.2;
  let flips = 0;
  for (let i = 1; i < s.length; i++) {
    if ((s[i].lat != null) !== (s[i - 1].lat != null)) flips++;
  }
  const intermittentPosition = positionPct < 90;
  // La marche et la randonnée partagent la plage de vitesse de la nage : on ne
  // les reclasse jamais, sous peine de transformer une balade en natation.
  const notWalking = declared !== "hiking";
  const looksLikeSwim =
    noCadence && swimSpeed && distM > 200 && intermittentPosition && notWalking;

  if (declared === "swimming" || looksLikeSwim) {
    if (noPosition) {
      reasons.push(tr("cls.pool", { speed: medSpeed.toFixed(2) }));
      return {
        tier: "swim",
        sport: "swimming",
        reclassified: declared !== "swimming",
        declaredSport: declared,
        confidence: poolLength ? 0.9 : 0.7,
        reasons,
        poolSwim: true,
        poolLengthM: poolLength,
      };
    }
    reasons.push(
      tr("cls.openWater", { pct: Math.round(positionPct), flips, speed: medSpeed.toFixed(2) }),
    );
    return {
      tier: "swim",
      sport: "swimming",
      reclassified: declared !== "swimming",
      declaredSport: declared,
      // Plus de décrochages, plus de certitude : c'est la signature propre à
      // un bras qui sort de l'eau à chaque cycle.
      confidence: flips >= 10 ? 0.85 : 0.7,
      reasons,
      poolSwim: false,
    };
  }

  // ── Activité sans déplacement réel ──────────────────────────────────────
  // Une séance d'une heure et demie pour 600 mètres n'est pas de l'endurance,
  // quel que soit son libellé.
  const distPerMin = elapsed > 0 ? distM / (elapsed / 60) : 0;
  if (elapsed > 600 && distPerMin < 40) {
    reasons.push(tr("cls.static", { dist: Math.round(distM), min: Math.round(elapsed / 60) }));
    return {
      tier: "load",
      sport: declared,
      reclassified: false,
      declaredSport: declared,
      confidence: 0.85,
      reasons,
    };
  }

  // ── Course déclarée qui n'en est pas ────────────────────────────────────
  if (declared === "running") {
    // La cadence ne sert à rien ici, contrairement à ce que j'avais supposé :
    // sur une séance de renforcement entrecoupée de 400 m, la cadence pendant
    // les portions courues est parfaitement normale (176 pas/min mesurés).
    // Ce qui trahit le cross-training, c'est la discontinuité : le temps passé
    // à l'arrêt et le terrain réellement couvert par minute écoulée.
    const moving = speed.filter((v) => v > 0.5).length;
    const movingRatio = s.length ? moving / s.length : 1;
    const mPerMin = elapsed > 0 ? distM / (elapsed / 60) : 0;

    if (movingRatio < 0.8 && mPerMin < 150) {
      reasons.push(
        tr("cls.crossTraining", {
          stopPct: Math.round((1 - movingRatio) * 100),
          mpm: Math.round(mPerMin),
        }),
      );
      return {
        tier: "load",
        sport: "other",
        reclassified: true,
        declaredSport: declared,
        confidence: 0.75,
        reasons,
      };
    }
  }

  if (declared === "running" || declared === "cycling") {
    return {
      tier: "full",
      sport: declared,
      reclassified: false,
      declaredSport: declared,
      confidence: 0.95,
      reasons,
    };
  }

  if (declared === "hiking") {
    reasons.push(tr("cls.hiking"));
    return { tier: "load", sport: "hiking", reclassified: false, declaredSport: declared, confidence: 0.9, reasons };
  }

  reasons.push(tr("cls.unknownSport"));
  return { tier: "load", sport: declared, reclassified: false, declaredSport: declared, confidence: 0.6, reasons };
}

/** Distance de découpe adaptée au sport : 1 km à pied, 5 km à vélo, 100 m en nage. */
export function defaultSplitUnit(sport: Sport): number {
  if (sport === "cycling") return 5000;
  if (sport === "swimming") return 100;
  return 1000;
}

/** Allure ou vitesse selon le sport — afficher du min/km à vélo n'a pas de sens. */
export function formatSpeed(sport: Sport, speedMS: number | undefined): string | undefined {
  if (speedMS == null || speedMS <= 0) return undefined;
  if (sport === "cycling") return `${(speedMS * 3.6).toFixed(1)} km/h`;
  if (sport === "swimming") {
    const per100 = 100 / speedMS;
    return `${mmss(per100)}/100m`;
  }
  const perKm = 1000 / speedMS;
  return `${mmss(perKm)}/km`;
}


// ─────────────────────────────────────────────────────────────────────────
// Mode ERG (home trainer à puissance imposée)
// ─────────────────────────────────────────────────────────────────────────

export interface ErgAnalysis {
  detected: boolean;
  evidence?: string;
  /** Baisse de cadence sur un bloc, en tr/min. Le début de la spirale ERG. */
  cadenceDropPerBlock: { startS: number; durS: number; dropRpm: number; powerW: number }[];
  warning?: string;
}

/**
 * Détecte le mode ERG et ses conséquences.
 *
 * Signature mesurée sur un fichier réel : la puissance est verrouillée à ±6 %
 * sur chaque bloc pendant que la distance parcourue varie du simple au
 * quadruple pour une même minute — le relief virtuel change la vitesse, le
 * home trainer maintient les watts quoi qu'il arrive.
 *
 * L'intérêt n'est pas l'étiquette mais ce qu'elle implique : en ERG, une baisse
 * de cadence fait monter la résistance, ce qui fait encore baisser la cadence.
 * Cette spirale se termine invariablement par un arrêt. La repérer dans les
 * données permet de l'annoncer avant qu'elle ne se reproduise.
 */
export function detectErg(
  samples: Sample[],
  blocks: { kind: string; startT: number; durS: number }[],
  locale?: string,
): ErgAnalysis {
  const tr = translator(locale);
  const work = blocks.filter((b) => b.kind === "work" && b.durS >= 30);
  if (!samples.some((s) => s.pw != null) || work.length < 3) {
    return { detected: false, cadenceDropPerBlock: [] };
  }

  const stats = (from: number, to: number, pick: (s: Sample) => number | undefined) => {
    const v = samples.filter((s) => s.t >= from && s.t <= to).map(pick).filter((x): x is number => x != null);
    if (v.length < 5) return null;
    const m = v.reduce((a, b) => a + b, 0) / v.length;
    const sd = Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length);
    return { mean: m, cv: m > 0 ? (sd / m) * 100 : Infinity, first: v[0], last: v[v.length - 1] };
  };

  let pinned = 0;
  const drops: ErgAnalysis["cadenceDropPerBlock"] = [];

  for (const b of work) {
    const pw = stats(b.startT, b.startT + b.durS, (s) => s.pw);
    const sp = stats(b.startT, b.startT + b.durS, (s) => s.cad);
    if (!pw) continue;
    // Une puissance tenue à moins de 12 % de variation sur un bloc d'effort
    // n'arrive pas en pédalage libre.
    if (pw.cv < 12) pinned++;
    if (sp) {
      const drop = sp.first - sp.last;
      if (drop >= 6) {
        drops.push({
          startS: Math.round(b.startT),
          durS: Math.round(b.durS),
          dropRpm: Math.round(drop),
          powerW: Math.round(pw.mean),
        });
      }
    }
  }

  const detected = pinned >= Math.max(3, work.length * 0.6);
  if (!detected) return { detected: false, cadenceDropPerBlock: drops };

  return {
    detected: true,
    evidence: tr("erg.evidence", { pinned, total: work.length }),
    cadenceDropPerBlock: drops,
    warning: drops.length
      ? tr("erg.warning", { n: drops.length, max: Math.max(...drops.map((d) => d.dropRpm)) })
      : undefined,
  };
}
