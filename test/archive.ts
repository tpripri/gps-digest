/**
 * Banc d'essai des archives : ZIP de Garmin (« Export Original », export
 * complet aux ZIP imbriqués), .gz de l'archive Strava.
 *
 * Les archives sont fabriquées ici, octet par octet, pour couvrir des cas
 * qu'aucun fichier d'exemple ne réunit : entrée stockée et compressée,
 * métadonnées du Finder, dossier, fichier chiffré, archive tronquée.
 *
 *   node --experimental-strip-types test/archive.ts
 */

import { deflateRawSync, gzipSync } from "node:zlib";

import { extractActivities, isArchiveName, openArchive, RecentWindow } from "../src/archive.ts";
import { t } from "../src/i18n.ts";
import { digestFile } from "../src/digest.ts";
import { analyzeBatch, type FileAnalysis } from "../src/batch.ts";
import { buildDossier } from "../src/dossier.ts";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  const mark = ok ? "\u001b[32m✓\u001b[0m" : "\u001b[31m✗\u001b[0m";
  console.log(`  ${mark} ${label}${detail ? `  \u001b[2m${detail}\u001b[0m` : ""}`);
  if (!ok) failures++;
}

interface Entry {
  name: string;
  data: Uint8Array;
  method?: 0 | 8;
  flags?: number;
}

/** ZIP minimal mais conforme : en-têtes locaux, répertoire central, fin. */
function zip(entries: Entry[]): Uint8Array {
  const body: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;
  for (const e of entries) {
    const method = e.method ?? 8;
    const packed = method === 8 ? deflateRawSync(e.data) : Buffer.from(e.data);
    const name = Buffer.from(e.name, "utf8");
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(e.flags ?? 0, 6);
    local.writeUInt16LE(method, 8);
    local.writeUInt32LE(packed.length, 18);
    local.writeUInt32LE(e.data.length, 22);
    local.writeUInt16LE(name.length, 26);
    const dir = Buffer.alloc(46);
    dir.writeUInt32LE(0x02014b50, 0);
    dir.writeUInt16LE(20, 4);
    dir.writeUInt16LE(20, 6);
    dir.writeUInt16LE(e.flags ?? 0, 8);
    dir.writeUInt16LE(method, 10);
    dir.writeUInt32LE(packed.length, 20);
    dir.writeUInt32LE(e.data.length, 24);
    dir.writeUInt16LE(name.length, 28);
    dir.writeUInt32LE(offset, 42);
    body.push(local, name, packed);
    central.push(dir, name);
    offset += 30 + name.length + packed.length;
  }
  const dir = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(dir.length, 12);
  end.writeUInt32LE(offset, 16);
  return new Uint8Array(Buffer.concat([...body, dir, end]));
}

const bytes = (s: string) => new TextEncoder().encode(s);
const same = (a: Uint8Array, b: Uint8Array) => a.length === b.length && a.every((v, i) => v === b[i]);
/** Faux FIT : 2 Ko d'octets variés, pour que deflate ait du travail. */
const fit = Uint8Array.from({ length: 2048 }, (_, i) => (i * 37) % 251);
const gpx = bytes('<?xml version="1.0"?><gpx><trk><trkseg></trkseg></trk></gpx>');
const tcx = bytes('<?xml version="1.0"?><TrainingCenterDatabase></TrainingCenterDatabase>');

async function rejects(p: Promise<unknown>): Promise<string> {
  try {
    await p;
    return "";
  } catch (e) {
    return (e as Error).message;
  }
}

console.log("\n\u001b[1mArchives (ZIP Garmin, .gz Strava)\u001b[0m");

check("noms d'archive reconnus", isArchiveName("a.zip") && isArchiveName("1234.FIT.GZ") && !isArchiveName("a.fit"));

{
  // Export Original de Garmin : un ZIP, un FIT compressé dedans.
  const out = await extractActivities("activity_123.zip", zip([{ name: "123_ACTIVITY.fit", data: fit }]));
  check("ZIP Garmin : FIT extrait à l'identique", out.length === 1 && out[0].name === "123_ACTIVITY.fit" && same(out[0].data, fit));
}
{
  // Archive faite par le Finder : dossier, métadonnées « ._ » et __MACOSX.
  const out = await extractActivities("seances.zip", zip([
    { name: "seances/", data: new Uint8Array(0), method: 0 },
    { name: "seances/sortie.gpx", data: gpx, method: 0 },
    { name: "__MACOSX/seances/._sortie.gpx", data: bytes("junk") },
    { name: "seances/._autre.gpx", data: bytes("junk") },
    { name: "seances/lisez-moi.txt", data: bytes("rien") },
  ]));
  check("ZIP du Finder : seule la séance est retenue",
    out.length === 1 && out[0].name === "sortie.gpx" && same(out[0].data, gpx), out.map((f) => f.name).join(", "));
}
{
  // Archive Strava : activities/1234.fit.gz, compressé en gzip.
  const out = await extractActivities("1234.fit.gz", new Uint8Array(gzipSync(fit)));
  check(".fit.gz Strava : décompressé et renommé en .fit", out.length === 1 && out[0].name === "1234.fit" && same(out[0].data, fit));
}
{
  // Export complet Garmin : ZIP dans un ZIP, avec des .gz au fond.
  const inner = zip([
    { name: "a.tcx.gz", data: new Uint8Array(gzipSync(tcx)), method: 0 },
    { name: "b.fit", data: fit },
  ]);
  const out = await extractActivities("export.zip", zip([
    { name: "DI_CONNECT/DI-Connect-Uploaded-Files/UploadedFiles_0-_Part1.zip", data: inner },
    { name: "DI_CONNECT/summary.json", data: bytes("{}") },
  ]));
  const names = out.map((f) => f.name).sort().join(",");
  check("ZIP imbriqués : séances trouvées au fond", names === "a.tcx,b.fit" && same(out.find((f) => f.name === "a.tcx")!.data, tcx), names);
}
{
  const msg = await rejects(extractActivities("vide.zip", zip([{ name: "photo.jpg", data: bytes("jpg") }])));
  check("archive sans séance : message explicite", msg === t("fr", "archive.empty"), msg);
}
{
  const full = zip([{ name: "x.fit", data: fit }]);
  const msg = await rejects(extractActivities("x.zip", full.subarray(0, full.length - 30)));
  check("archive tronquée : signalée comme endommagée", msg === t("fr", "archive.corrupt"), msg);
}
{
  const msg = await rejects(extractActivities("x.zip", zip([{ name: "x.fit", data: fit, flags: 1 }])));
  check("archive chiffrée : message « décompressez-la »", msg === t("fr", "archive.unsupported"), msg);
}
{
  const msg = await rejects(extractActivities("x.fit.gz", bytes("pas du gzip"), "en"));
  check("faux .gz : message dans la langue de la page", msg === t("en", "archive.corrupt") && !/archive endommag/i.test(msg), msg);
}

// ── Archive de compte Strava (« Download your account ») ────────────────
{
  const archive = zip([
    { name: "activities.csv", data: bytes("ID de l'activité,Date de l'activité\n") },
    { name: "profile.csv", data: bytes("x") },
    { name: "activities/48418534.gpx", data: gpx },
    { name: "activities/21572748203.fit.gz", data: new Uint8Array(gzipSync(fit)), method: 0 },
    { name: "activities/9123456789.tcx.gz", data: new Uint8Array(gzipSync(tcx)), method: 0 },
    { name: "routes/1.gpx", data: gpx },
    { name: "media/photo.jpg", data: bytes("jpg") },
  ]);
  const plan = await openArchive("export_1907198.zip", new Blob([archive]));
  check("archive Strava reconnue", plan.kind === "strava");
  check("archive Strava : itinéraires et photos écartés", plan.entries.length === 3 && !plan.entries.some((e) => e.path.startsWith("routes/")),
    plan.entries.map((e) => e.path).join(", "));
  check("archive Strava : séances récentes d'abord (identifiants décroissants)",
    plan.entries.map((e) => e.name).join(",") === "21572748203.fit,9123456789.tcx,48418534.gpx");
  check("archive Strava : décompression à la demande", same(await plan.entries[0].read(), fit));
}

// ── ZIP64 (archives de plus de 4 Go ou de 65 535 entrées) ────────────────
{
  // Même contenu qu'un ZIP classique, mais tailles et position saturées, avec
  // les vraies valeurs dans le champ ZIP64 et l'enregistrement de fin 64 bits.
  const packed = deflateRawSync(fit);
  const name = Buffer.from("big.fit");
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(8, 8);
  local.writeUInt32LE(0xffffffff, 18);
  local.writeUInt32LE(0xffffffff, 22);
  local.writeUInt16LE(name.length, 26);
  const extra = Buffer.alloc(4 + 24);
  extra.writeUInt16LE(1, 0);
  extra.writeUInt16LE(24, 2);
  extra.writeBigUInt64LE(BigInt(fit.length), 4);
  extra.writeBigUInt64LE(BigInt(packed.length), 12);
  extra.writeBigUInt64LE(0n, 20);
  const dir = Buffer.alloc(46);
  dir.writeUInt32LE(0x02014b50, 0);
  dir.writeUInt16LE(8, 10);
  dir.writeUInt32LE(0xffffffff, 20);
  dir.writeUInt32LE(0xffffffff, 24);
  dir.writeUInt16LE(name.length, 28);
  dir.writeUInt16LE(extra.length, 30);
  dir.writeUInt32LE(0xffffffff, 42);
  const body = Buffer.concat([local, name, packed]);
  const central = Buffer.concat([dir, name, extra]);
  const end64 = Buffer.alloc(56);
  end64.writeUInt32LE(0x06064b50, 0);
  end64.writeBigUInt64LE(44n, 4);
  end64.writeBigUInt64LE(1n, 24);
  end64.writeBigUInt64LE(1n, 32);
  end64.writeBigUInt64LE(BigInt(central.length), 40);
  end64.writeBigUInt64LE(BigInt(body.length), 48);
  const locator = Buffer.alloc(20);
  locator.writeUInt32LE(0x07064b50, 0);
  locator.writeBigUInt64LE(BigInt(body.length + central.length), 8);
  locator.writeUInt32LE(1, 16);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0xffff, 8);
  end.writeUInt16LE(0xffff, 10);
  end.writeUInt32LE(0xffffffff, 12);
  end.writeUInt32LE(0xffffffff, 16);
  const out = await extractActivities("big.zip", new Uint8Array(Buffer.concat([body, central, end64, locator, end])));
  check("ZIP64 : séance extraite à l'identique", out.length === 1 && out[0].name === "big.fit" && same(out[0].data, fit));
}

// ── Fenêtre des séances récentes ─────────────────────────────────────────
{
  const w = new RecentWindow(365, 3);
  const verdicts = ["2026-10-02T06:00:00Z", "2026-03-01T06:00:00Z", "2025-09-01T06:00:00Z", "2025-08-01T06:00:00Z",
    "2025-10-05T06:00:00Z", "2025-07-01T06:00:00Z", "2025-06-01T06:00:00Z", "2025-05-01T06:00:00Z"].map((d) => w.judge(d));
  check("fenêtre d'un an : garde, ignore, puis s'arrête après 3 séances hors période d'affilée",
    verdicts.join(",") === "keep,keep,skip,skip,keep,skip,skip,stop", verdicts.join(","));
  // Une vieille sortie importée récemment arrive en tête : la référence se
  // corrige dès qu'une séance plus récente apparaît, et le filtre final suit.
  const late = new RecentWindow(30, 50);
  late.judge("2019-05-01T06:00:00Z");
  late.judge("2026-10-01T06:00:00Z");
  check("fenêtre : référence corrigée par la séance la plus récente", !late.keep("2019-05-01T06:00:00Z") && late.keep("2026-09-20T06:00:00Z"));
  check("fenêtre « tout l'historique »", new RecentWindow(0).judge("2001-01-01T00:00:00Z") === "keep");
}

// ── Mode historique : une année, détail seulement pour les séances récentes ─
{
  /** Sortie GPX horodatée : 20 min à allure régulière, FC stable. */
  const run = (iso: string) => {
    const t0 = Date.parse(iso);
    const pts = Array.from({ length: 1200 }, (_, i) =>
      `<trkpt lat="${(48.85 + i * 0.000025).toFixed(6)}" lon="2.35"><ele>35</ele><time>${new Date(t0 + i * 1000).toISOString()}</time>` +
      `<extensions><gpxtpx:TrackPointExtension><gpxtpx:hr>${140 + (i % 3)}</gpxtpx:hr></gpxtpx:TrackPointExtension></extensions></trkpt>`).join("");
    return `<?xml version="1.0"?><gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"><trk><type>running</type><trkseg>${pts}</trkseg></trk></gpx>`;
  };
  const opts = { athlete: {}, streamTokenBudget: 3000, privacyRadiusM: 0, driftWarmupS: 300, locale: "fr" };
  const files: FileAnalysis[] = [];
  for (const [i, d] of ["2026-10-01T06:00:00Z", "2026-09-25T06:00:00Z", "2026-08-01T06:00:00Z"].entries()) {
    const res = await digestFile(`${i}.gpx`, run(d), opts);
    files.push({ filename: `${i}.gpx`, digest: res.digest, hrSource: res.insights.hrSource, drift: res.insights.drift,
      adherence: res.insights.adherence, efforts: res.insights.efforts, samples: res.samples, hrSpeed: res.insights.hrSpeed });
  }
  const batch = analyzeBatch(files, { locale: "fr" });
  const detailed = (d: string) => (d.match(/^## s\d+_summary$/gm) ?? []).length;
  const history = buildDossier(batch, { recentDetailDays: 14, streamMode: "none" });
  check("mode historique : seules les séances des 14 derniers jours sont détaillées",
    detailed(history) === 2 && detailed(buildDossier(batch, { streamMode: "none" })) === 3);
  check("mode historique : le dossier l'annonce", history.includes(t("fr", "dossier.contextNote", { total: 3, days: 14, n: 2 })));

  const route = `<?xml version="1.0"?><gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1"><trk><trkseg>` +
    Array.from({ length: 50 }, (_, i) => `<trkpt lat="${(48.85 + i * 0.001).toFixed(4)}" lon="2.35"><ele>35</ele></trkpt>`).join("") +
    `</trkseg></trk></gpx>`;
  const msg = await rejects(digestFile("itineraire.gpx", route, opts));
  check("itinéraire sans horodatage : refusé, pas compté comme une séance",
    msg === t("fr", "digest.errNoTime", { filename: "itineraire.gpx" }), msg);
}

console.log(failures ? `\n\u001b[31m${failures} échec(s)\u001b[0m\n` : "\n\u001b[32mToutes les archives passent\u001b[0m\n");
process.exitCode = failures ? 1 : 0;
