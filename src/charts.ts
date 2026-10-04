/**
 * Graphiques en SVG, sans aucune dépendance.
 *
 * Pas de bibliothèque de courbes : le SVG est généré à la main, sous forme de
 * chaîne. Trois raisons — la page n'a aucune dépendance et doit le rester, une
 * bibliothèque de graphiques pèse plus lourd que tout le reste du site réuni,
 * et une chaîne SVG s'intègre aussi bien dans la page que dans un export.
 *
 * Les couleurs viennent des variables CSS de la page : le mode sombre suit
 * automatiquement, sans code de thème.
 *
 * Convention retenue pour l'allure : **l'axe est inversé**, le rapide vers le
 * haut. C'est ce qu'attend un coureur, et l'inverse déroute tout le monde.
 */

import { translator } from "./i18n.ts";

const W = 720;
const H = 220;
const PAD = { top: 14, right: 52, bottom: 26, left: 48 };

const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const esc = (s: string) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

interface Scale {
  min: number;
  max: number;
  to: (v: number) => number;
}

function scaleY(values: number[], invert = false, padPct = 0.08): Scale {
  const finite = values.filter((v) => Number.isFinite(v));
  let min = Math.min(...finite);
  let max = Math.max(...finite);
  if (!Number.isFinite(min) || min === max) {
    min = (min || 0) - 1;
    max = (max || 0) + 1;
  }
  const pad = (max - min) * padPct;
  min -= pad;
  max += pad;
  return {
    min,
    max,
    to: (v) => {
      const r = (v - min) / (max - min);
      const y = invert ? r : 1 - r;
      return PAD.top + y * PLOT_H;
    },
  };
}

function path(points: { x: number; y: number }[]): string {
  if (!points.length) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
}

const frame = (title: string, body: string, note?: string) =>
  `<figure class="chart">
  <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}"
       preserveAspectRatio="xMidYMid meet">
    <style>
      .grid{stroke:var(--line);stroke-width:1}
      .lbl{fill:var(--ink-soft);font-size:11px;font-family:inherit}
      .s1{stroke:var(--accent);stroke-width:1.8;fill:none;stroke-linejoin:round}
      .s2{stroke:var(--bad);stroke-width:1.6;fill:none;stroke-linejoin:round;opacity:.85}
      .bar{fill:var(--accent);opacity:.75}
      .bar2{fill:var(--mid);opacity:.55}
      .pt{fill:var(--accent)}
      .zone{fill:var(--accent);opacity:.1}
    </style>
    ${body}
  </svg>
  <figcaption>${esc(title)}${note ? ` — <span>${esc(note)}</span>` : ""}</figcaption>
</figure>`;

function gridAndAxis(left: Scale, right: Scale | null, fmtL: (v: number) => string, fmtR?: (v: number) => string) {
  let out = "";
  for (let i = 0; i <= 3; i++) {
    const y = PAD.top + (i / 3) * PLOT_H;
    const vL = left.min + ((3 - i) / 3) * (left.max - left.min);
    out += `<line class="grid" x1="${PAD.left}" y1="${y.toFixed(1)}" x2="${PAD.left + PLOT_W}" y2="${y.toFixed(1)}"/>`;
    out += `<text class="lbl" x="${PAD.left - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end">${esc(fmtL(vL))}</text>`;
    if (right && fmtR) {
      const vR = right.min + ((3 - i) / 3) * (right.max - right.min);
      out += `<text class="lbl" x="${PAD.left + PLOT_W + 6}" y="${(y + 4).toFixed(1)}">${esc(fmtR(vR))}</text>`;
    }
  }
  return out;
}

const mmss = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

// ─────────────────────────────────────────── allure/puissance + FC dans le temps

export interface SessionPoint {
  t: number;
  hr?: number;
  paceSPerKm?: number;
  powerW?: number;
}

/**
 * Le graphique central : l'effort et la FC sur le même axe temporel.
 *
 * C'est ce qui rend la dérive cardiaque **visible** au lieu d'être un
 * pourcentage abstrait — on voit la courbe rouge monter pendant que la verte
 * reste plate. La fenêtre analysée est ombrée, pour qu'on sache sur quelle
 * portion le chiffre a été calculé.
 */
export function sessionChart(
  points: SessionPoint[],
  opts: {
    window?: { fromS: number; toS: number };
    usePower?: boolean;
    title?: string;
    locale?: string;
  } = {},
): string {
  const tr = translator(opts.locale);
  const usable = points.filter(
    (p) => p.hr != null && (opts.usePower ? p.powerW != null : p.paceSPerKm != null && p.paceSPerKm > 0),
  );
  if (usable.length < 5) return "";

  const t0 = usable[0].t;
  const tMax = usable[usable.length - 1].t - t0 || 1;
  const x = (t: number) => PAD.left + ((t - t0) / tMax) * PLOT_W;

  const effort = usable.map((p) => (opts.usePower ? p.powerW! : p.paceSPerKm!));
  // Allure : axe inversé pour que « plus haut » veuille dire « plus rapide ».
  const sEffort = scaleY(effort, !opts.usePower);
  const sHr = scaleY(usable.map((p) => p.hr!));

  let body = "";
  if (opts.window) {
    const x1 = x(opts.window.fromS);
    const x2 = x(opts.window.toS);
    body += `<rect class="zone" x="${x1.toFixed(1)}" y="${PAD.top}" width="${Math.max(0, x2 - x1).toFixed(1)}" height="${PLOT_H}"/>`;
  }
  body += gridAndAxis(
    sEffort,
    sHr,
    (v) => (opts.usePower ? `${Math.round(v)} W` : mmss(v)),
    (v) => `${Math.round(v)}`,
  );
  body += `<path class="s1" d="${path(usable.map((p, i) => ({ x: x(p.t), y: sEffort.to(effort[i]) })))}"/>`;
  body += `<path class="s2" d="${path(usable.map((p) => ({ x: x(p.t), y: sHr.to(p.hr!) })))}"/>`;
  body += `<text class="lbl" x="${PAD.left}" y="${H - 8}">0</text>`;
  body += `<text class="lbl" x="${PAD.left + PLOT_W}" y="${H - 8}" text-anchor="end">${Math.round(tMax / 60)} min</text>`;

  return frame(
    opts.title ?? tr(opts.usePower ? "chart.sessionPower" : "chart.sessionPace"),
    body,
    opts.window ? tr("chart.windowNote") : undefined,
  );
}

// ────────────────────────────────────────────────────── répétitions

export interface RepBar {
  index: number;
  value: number;
  hr?: number;
  label?: string;
}

/**
 * Une barre par répétition, avec la FC en points superposés.
 *
 * L'intérêt n'est pas la valeur absolue mais la **forme** : des barres égales
 * avec des points qui montent, c'est une allure tenue à coût cardiaque
 * croissant — la fatigue qui arrive avant la perte de vitesse.
 */
export function repsChart(
  reps: RepBar[],
  opts: { unit: "pace" | "power"; title?: string; locale?: string } = { unit: "pace" },
): string {
  const tr = translator(opts.locale);
  if (reps.length < 2) return "";
  const vals = reps.map((r) => r.value);
  const s = scaleY([0, ...vals], false, 0.02);
  const hrVals = reps.map((r) => r.hr).filter((v): v is number => v != null);
  const sHr = hrVals.length ? scaleY(hrVals) : null;

  const slot = PLOT_W / reps.length;
  const bw = Math.min(46, slot * 0.62);
  let body = gridAndAxis(
    s,
    sHr,
    (v) => (opts.unit === "power" ? `${Math.round(v)} W` : mmss(v)),
    sHr ? (v) => `${Math.round(v)}` : undefined,
  );

  reps.forEach((r, i) => {
    const cx = PAD.left + slot * (i + 0.5);
    const y = s.to(r.value);
    body += `<rect class="bar" x="${(cx - bw / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, PAD.top + PLOT_H - y).toFixed(1)}" rx="2"/>`;
    body += `<text class="lbl" x="${cx.toFixed(1)}" y="${H - 8}" text-anchor="middle">${r.index}</text>`;
  });

  if (sHr) {
    const pts = reps
      .map((r, i) => (r.hr != null ? { x: PAD.left + slot * (i + 0.5), y: sHr.to(r.hr) } : null))
      .filter((p): p is { x: number; y: number } => p != null);
    body += `<path class="s2" d="${path(pts)}"/>`;
    for (const p of pts) body += `<circle class="pt" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3"/>`;
  }

  return frame(
    opts.title ?? tr("chart.reps"),
    body,
    sHr ? tr("chart.repsNote") : undefined,
  );
}

// ────────────────────────────────────────── progression entre séances

export interface TrendPoint {
  date: string;
  value: number;
}

/** FC à allure de référence dans le temps. Une baisse est une progression. */
export function trendChart(series: TrendPoint[], title: string, locale?: string): string {
  if (series.length < 3) return "";
  const sorted = [...series].sort((a, b) => a.date.localeCompare(b.date));
  const t0 = Date.parse(sorted[0].date);
  const span = Date.parse(sorted[sorted.length - 1].date) - t0 || 1;
  const x = (d: string) => PAD.left + ((Date.parse(d) - t0) / span) * PLOT_W;
  const s = scaleY(sorted.map((p) => p.value));

  let body = gridAndAxis(s, null, (v) => `${Math.round(v)}`);
  const pts = sorted.map((p) => ({ x: x(p.date), y: s.to(p.value) }));
  body += `<path class="s1" d="${path(pts)}"/>`;
  for (const p of pts) body += `<circle class="pt" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5"/>`;
  body += `<text class="lbl" x="${PAD.left}" y="${H - 8}">${esc(sorted[0].date)}</text>`;
  body += `<text class="lbl" x="${PAD.left + PLOT_W}" y="${H - 8}" text-anchor="end">${esc(sorted[sorted.length - 1].date)}</text>`;

  return frame(title, body, translator(locale)("chart.trendNote"));
}

// ──────────────────────────────────────────────── charge hebdomadaire

export interface WeekBar {
  label: string;
  /** TRIMP de la semaine, ou heures en mouvement faute de FC. */
  value: number;
  hardPct?: number;
}

/**
 * Charge hebdomadaire, toutes disciplines. Les barres sont en TRIMP (charge
 * fondée sur la FC) : des kilomètres empilaient course, vélo et natation.
 * Sans aucune FC, en heures.
 */
export function loadChart(weeks: WeekBar[], locale?: string, basis: "trimp" | "hours" = "trimp"): string {
  if (weeks.length < 2) return "";
  const s = scaleY([0, ...weeks.map((w) => w.value)], false, 0.05);
  const slot = PLOT_W / weeks.length;
  const bw = Math.min(50, slot * 0.7);

  let body = gridAndAxis(s, null, (v) => basis === "trimp" ? `${Math.round(v)}` : `${Math.round(v)} h`);
  weeks.forEach((w, i) => {
    const cx = PAD.left + slot * (i + 0.5);
    const y = s.to(w.value);
    const h = Math.max(1, PAD.top + PLOT_H - y);
    body += `<rect class="bar2" x="${(cx - bw / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2"/>`;
    if (w.hardPct != null && w.hardPct > 0) {
      const hh = h * (w.hardPct / 100);
      body += `<rect class="bar" x="${(cx - bw / 2).toFixed(1)}" y="${(y + h - hh).toFixed(1)}" width="${bw.toFixed(1)}" height="${hh.toFixed(1)}" rx="2"/>`;
    }
    // Une semaine sur deux seulement : au-delà, les libellés se chevauchent.
    if (weeks.length <= 10 || i % 2 === 0) {
      body += `<text class="lbl" x="${cx.toFixed(1)}" y="${H - 8}" text-anchor="middle">${esc(w.label.slice(-3))}</text>`;
    }
  });

  const tr = translator(locale);
  return frame(tr("chart.load"), body, tr(basis === "trimp" ? "chart.loadNote" : "chart.loadNoteHours"));
}
