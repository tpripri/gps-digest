/**
 * Archives déposées telles quelles.
 *
 * Garmin Connect livre l'« Export Original » d'une séance dans un ZIP, l'export
 * complet du compte dans des ZIP imbriqués, et l'archive Strava compresse ses
 * activités en « .fit.gz ». Demander de décompresser d'abord, c'est une étape
 * manuelle de plus entre l'export et l'analyse : autant de gens perdus en route.
 *
 * La décompression est native dans les navigateurs (DecompressionStream, gzip
 * et deflate brut) : aucune dépendance. Limites assumées, chacune signalée par
 * un message clair plutôt qu'un échec muet : pas de ZIP64 (archives de plus de
 * 4 Go), pas de chiffrement, et seules les méthodes « stockée » et « deflate »,
 * celles de Garmin, de Strava, de l'Explorateur Windows et du Finder.
 */

import { translator } from "./i18n.ts";

export interface ExtractedFile {
  /** Nom du fichier d'activité, sans chemin ni « .gz » : « 1234.fit ». */
  name: string;
  data: Uint8Array;
}

/**
 * Au-delà, mieux vaut décompresser à la main : le navigateur garde l'archive
 * et son contenu en mémoire en même temps. L'export complet Garmin dépasse
 * souvent cette taille ; un export de séance pèse quelques centaines de Ko.
 */
export const MAX_ARCHIVE_BYTES = 300 * 1024 * 1024;

const ACTIVITY = /\.(fit|tcx|gpx)$/i;
const ARCHIVE = /\.(zip|gz)$/i;
/** Export Garmin complet : ZIP dans un ZIP. Au-delà de trois niveaux, on s'arrête. */
const MAX_DEPTH = 3;

const SIG_LOCAL = 0x04034b50;
const SIG_CENTRAL = 0x02014b50;
const SIG_END = 0x06054b50;

export function isArchiveName(name: string): boolean {
  return ARCHIVE.test(name);
}

/**
 * Fichiers d'activité (FIT, TCX, GPX) contenus dans une archive ZIP ou gzip,
 * à n'importe quel niveau d'imbrication raisonnable. Les autres fichiers
 * (export.xml d'Apple Santé, CSV de résumé, images) sont ignorés sans être
 * décompressés.
 */
export async function extractActivities(
  name: string,
  data: Uint8Array,
  locale?: string,
): Promise<ExtractedFile[]> {
  const tr = translator(locale);
  const out: ExtractedFile[] = [];
  await walk(baseName(name), data, 0, out, tr);
  if (!out.length) throw new Error(tr("archive.empty"));
  return out;
}

type Tr = ReturnType<typeof translator>;

async function walk(name: string, data: Uint8Array, depth: number, out: ExtractedFile[], tr: Tr) {
  if (ACTIVITY.test(name)) {
    out.push({ name, data });
    return;
  }
  if (depth >= MAX_DEPTH) return;
  if (/\.gz$/i.test(name) || isGzip(data)) {
    await walk(name.replace(/\.gz$/i, ""), await inflate(data, "gzip", tr), depth + 1, out, tr);
    return;
  }
  if (/\.zip$/i.test(name) || isZip(data)) {
    for (const entry of readCentralDirectory(data, tr)) {
      const base = baseName(entry.name);
      // Dossiers, métadonnées du Finder et tout ce qui n'est pas une séance.
      if (entry.name.endsWith("/") || entry.name.includes("__MACOSX/") || base.startsWith("._")) continue;
      if (!ACTIVITY.test(base) && !ARCHIVE.test(base)) continue;
      await walk(base, await entryData(data, entry, tr), depth + 1, out, tr);
    }
  }
}

interface ZipEntry {
  name: string;
  method: number;
  encrypted: boolean;
  compressedSize: number;
  localOffset: number;
}

/**
 * Le répertoire central, en fin d'archive, fait foi : les en-têtes locaux
 * peuvent annoncer une taille nulle quand l'archive a été écrite en flux.
 */
function readCentralDirectory(buf: Uint8Array, tr: Tr): ZipEntry[] {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  let end = -1;
  // L'enregistrement de fin fait 22 octets, plus un commentaire de 64 Ko au plus.
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 22 - 0xffff); i--) {
    if (view.getUint32(i, true) === SIG_END) {
      end = i;
      break;
    }
  }
  if (end < 0) throw new Error(tr("archive.corrupt"));

  const count = view.getUint16(end + 10, true);
  let p = view.getUint32(end + 16, true);
  if (count === 0xffff || p === 0xffffffff) throw new Error(tr("archive.unsupported"));

  const entries: ZipEntry[] = [];
  const decoder = new TextDecoder();
  for (let n = 0; n < count; n++) {
    if (p + 46 > buf.length || view.getUint32(p, true) !== SIG_CENTRAL) throw new Error(tr("archive.corrupt"));
    const nameLength = view.getUint16(p + 28, true);
    const compressedSize = view.getUint32(p + 20, true);
    const localOffset = view.getUint32(p + 42, true);
    if (compressedSize === 0xffffffff || localOffset === 0xffffffff) throw new Error(tr("archive.unsupported"));
    entries.push({
      name: decoder.decode(buf.subarray(p + 46, p + 46 + nameLength)),
      method: view.getUint16(p + 10, true),
      encrypted: (view.getUint16(p + 8, true) & 1) === 1,
      compressedSize,
      localOffset,
    });
    p += 46 + nameLength + view.getUint16(p + 30, true) + view.getUint16(p + 32, true);
  }
  return entries;
}

async function entryData(buf: Uint8Array, entry: ZipEntry, tr: Tr): Promise<Uint8Array> {
  if (entry.encrypted || (entry.method !== 0 && entry.method !== 8)) throw new Error(tr("archive.unsupported"));
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const p = entry.localOffset;
  if (p + 30 > buf.length || view.getUint32(p, true) !== SIG_LOCAL) throw new Error(tr("archive.corrupt"));
  const start = p + 30 + view.getUint16(p + 26, true) + view.getUint16(p + 28, true);
  if (start + entry.compressedSize > buf.length) throw new Error(tr("archive.corrupt"));
  const raw = buf.subarray(start, start + entry.compressedSize);
  return entry.method === 0 ? raw : inflate(raw, "deflate-raw", tr);
}

async function inflate(data: Uint8Array, format: "gzip" | "deflate-raw", tr: Tr): Promise<Uint8Array> {
  try {
    const stream = new Blob([data as Uint8Array<ArrayBuffer>]).stream().pipeThrough(new DecompressionStream(format));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  } catch {
    throw new Error(tr("archive.corrupt"));
  }
}

const isGzip = (d: Uint8Array) => d.length > 2 && d[0] === 0x1f && d[1] === 0x8b;
const isZip = (d: Uint8Array) => d.length > 4 && d[0] === 0x50 && d[1] === 0x4b && (d[2] === 3 || d[2] === 5);
const baseName = (path: string) => path.split(/[\\/]/).pop() ?? path;
