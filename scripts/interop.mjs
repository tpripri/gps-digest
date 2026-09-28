/**
 * Banc d'interopérabilité multi-marques.
 *
 * Passe un dossier de fichiers .fit / .tcx / .gpx dans le décodeur et rend, pour
 * chacun, ce qui a été compris et ce qui manque. Conçu pour le corpus public
 * ThomasKuehne/FIT-test-files, qui couvre Garmin, Coros, Suunto, Wahoo et Zwift :
 *
 *   git clone https://github.com/ThomasKuehne/FIT-test-files.git ../FIT-test-files
 *   node scripts/interop.mjs ../FIT-test-files/Activity
 *
 * Fonctionne aussi sur vos propres exports. L'objectif n'est pas de tout faire
 * passer — certains fichiers du corpus sont volontairement corrompus — mais de
 * voir QUELS fichiers échouent et POURQUOI.
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const { parseFitBuffer } = await import("../src/parse-fit.ts");
const { parseTcx } = await import("../src/parse-tcx.ts");
const { parseGpx } = await import("../src/parse-gpx.ts");
const { classifyActivity } = await import("../src/classify.ts");
const { speedSeries } = await import("../src/analyze.ts");

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node scripts/interop.mjs <dossier>");
  process.exit(1);
}

async function* walk(d) {
  for (const entry of await readdir(d)) {
    const p = join(d, entry);
    if ((await stat(p)).isDirectory()) yield* walk(p);
    else yield p;
  }
}

const results = [];
const byManufacturer = new Map();

for await (const path of walk(dir)) {
  const ext = extname(path).toLowerCase();
  if (![".fit", ".tcx", ".gpx"].includes(ext)) continue;

  const row = { file: path.slice(dir.length + 1), ext };
  try {
    let activity, extras;
    if (ext === ".fit") {
      ({ activity, extras } = parseFitBuffer(await readFile(path)));
      row.maker = extras.manufacturer ?? "?";
      row.sub = extras.subSport;
      row.lengths = extras.lengths.length || undefined;
      row.hrSensor = extras.hrSensor;
    } else {
      const text = await readFile(path, "utf8");
      activity = ext === ".tcx" ? parseTcx(text) : parseGpx(text);
      row.maker = activity.device ?? "?";
    }

    row.points = activity.samples.length;
    row.sport = activity.sport;
    row.laps = activity.laps.length;

    if (activity.samples.length) {
      const c = classifyActivity(activity, speedSeries(activity.samples));
      row.tier = c.tier;
      row.classified = c.sport;
      const last = activity.samples[activity.samples.length - 1];
      row.km = ((last.dist ?? 0) / 1000).toFixed(2);
      row.hasHr = activity.samples.some((s) => s.hr != null);
    } else {
      row.warn = "aucun point exploitable";
    }
  } catch (e) {
    row.error = e.message.slice(0, 60);
  }

  results.push(row);
  const key = row.maker ?? "?";
  byManufacturer.set(key, (byManufacturer.get(key) ?? 0) + 1);
}

const ok = results.filter((r) => !r.error && r.points > 0);
const empty = results.filter((r) => !r.error && !r.points);
const failed = results.filter((r) => r.error);

console.log(`\n  ${results.length} fichiers — ${ok.length} lus, ${empty.length} vides, ${failed.length} en échec\n`);
console.log("  Par fabricant :");
for (const [m, n] of [...byManufacturer].sort((a, b) => b[1] - a[1])) {
  console.log(`    ${String(m).padEnd(22)} ${n}`);
}

if (ok.length) {
  console.log("\n  Échantillon :");
  for (const r of ok.slice(0, 15)) {
    console.log(
      `    ${r.file.slice(-38).padEnd(38)} ${String(r.maker).padEnd(10)} ` +
        `${String(r.sport).padEnd(9)} [${r.tier}] ${String(r.km).padStart(7)} km ` +
        `${String(r.points).padStart(6)} pts${r.lengths ? ` ${r.lengths} long.` : ""}` +
        `${r.hrSensor ? ` ${r.hrSensor}` : ""}`,
    );
  }
}

if (empty.length) {
  console.log("\n  Sans point exploitable (à examiner) :");
  for (const r of empty.slice(0, 12)) console.log(`    ${r.file} (${r.maker})`);
}

if (failed.length) {
  console.log("\n  Échecs :");
  for (const r of failed.slice(0, 12)) console.log(`    ${r.file} — ${r.error}`);
}
console.log();
