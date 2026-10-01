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

import { extractActivities, isArchiveName } from "../src/archive.ts";
import { t } from "../src/i18n.ts";

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
  const msg = await rejects(extractActivities("x.gz", bytes("pas du gzip"), "en"));
  check("faux .gz : message dans la langue de la page", msg === t("en", "archive.corrupt") && !/archive endommag/i.test(msg), msg);
}

console.log(failures ? `\n\u001b[31m${failures} échec(s)\u001b[0m\n` : "\n\u001b[32mToutes les archives passent\u001b[0m\n");
process.exitCode = failures ? 1 : 0;
