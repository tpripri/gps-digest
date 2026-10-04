/**
 * Archives déposées telles quelles.
 *
 * Garmin Connect livre l'« Export Original » d'une séance dans un ZIP, l'export
 * complet du compte dans des ZIP imbriqués, et Strava son archive de compte
 * (« Download your account ») dans un ZIP qui mêle activités compressées en
 * « .fit.gz », itinéraires, photos et CSV. Demander de décompresser d'abord,
 * c'est une étape manuelle de plus entre l'export et l'analyse.
 *
 * Deux principes :
 *
 * - **Lire sans charger.** Une archive Strava pèse souvent plusieurs Go avec
 *   les photos. On lit la fin du fichier (répertoire central), puis seulement
 *   les entrées utiles, morceau par morceau (Blob.slice). La mémoire ne porte
 *   jamais l'archive entière.
 * - **Ne garder que les séances.** Itinéraires planifiés, photos et CSV sont
 *   écartés sans être décompressés.
 *
 * La décompression est native (DecompressionStream, gzip et deflate brut) :
 * aucune dépendance. ZIP64 est lu (archives de plus de 4 Go ou de plus de
 * 65 535 entrées). Limites assumées, chacune signalée par un message clair :
 * pas de chiffrement, et seules les méthodes « stockée » et « deflate », celles
 * de Garmin, de Strava, de l'Explorateur Windows et du Finder.
 */

import { translator } from "./i18n.ts";

export interface ExtractedFile {
  /** Nom du fichier d'activité, sans chemin ni « .gz » : « 1234.fit ». */
  name: string;
  data: Uint8Array;
}

/** Une séance repérée dans une archive, décompressée seulement à la demande. */
export interface ArchiveEntry {
  /** Nom du fichier d'activité, sans chemin ni « .gz ». */
  name: string;
  /** Chemin complet dans l'archive, pour les messages. */
  path: string;
  read(): Promise<Uint8Array>;
  /** Archive Strava : nom de l'activité (« 10 km du Parc »). */
  title?: string;
  /** Archive Strava : séance marquée « course ». */
  declaredRace?: boolean;
}

export interface ArchivePlan {
  /**
   * « strava » : archive de compte Strava, séances triées de la plus récente
   * à la plus ancienne (identifiants croissants avec le temps). « files » :
   * toute autre archive, dans l'ordre où elle range ses fichiers.
   */
  kind: "strava" | "files";
  entries: ArchiveEntry[];
}

/**
 * Plafond des fichiers « .gz » isolés, décompressés en mémoire. Les ZIP, lus
 * par morceaux, n'en ont pas besoin.
 */
export const MAX_ARCHIVE_BYTES = 300 * 1024 * 1024;

const ACTIVITY = /\.(fit|tcx|gpx)$/i;
const ACTIVITY_OR_GZ = /\.(fit|tcx|gpx)(\.gz)?$/i;
const ARCHIVE = /\.(zip|gz)$/i;
/** Export Garmin complet : ZIP dans un ZIP. Au-delà de trois niveaux, on s'arrête. */
const MAX_DEPTH = 3;

const SIG_LOCAL = 0x04034b50;
const SIG_CENTRAL = 0x02014b50;
const SIG_END = 0x06054b50;
const SIG_END64 = 0x06064b50;
const SIG_LOCATOR64 = 0x07064b50;

export function isArchiveName(name: string): boolean {
  return ARCHIVE.test(name);
}

type Tr = ReturnType<typeof translator>;

// ─────────────────────────────────────────────── sources d'octets

/** Un fichier qu'on lit par morceaux : Blob du navigateur ou octets en mémoire. */
interface ByteSource {
  size: number;
  read(offset: number, length: number): Promise<Uint8Array>;
}

function blobSource(blob: Blob): ByteSource {
  return {
    size: blob.size,
    read: async (offset, length) =>
      new Uint8Array(await blob.slice(offset, Math.min(offset + length, blob.size)).arrayBuffer()),
  };
}

function bytesSource(bytes: Uint8Array): ByteSource {
  return {
    size: bytes.length,
    read: async (offset, length) => bytes.subarray(offset, Math.min(offset + length, bytes.length)),
  };
}

const view = (b: Uint8Array) => new DataView(b.buffer, b.byteOffset, b.byteLength);

// ─────────────────────────────────────────────────── API publique

/**
 * Repère les séances d'une archive (.zip ou .gz) sans les décompresser.
 * Lève une erreur traduite si l'archive est illisible ou ne contient aucune
 * séance.
 */
export async function openArchive(name: string, file: Blob, locale?: string): Promise<ArchivePlan> {
  const tr = translator(locale);
  const base = baseName(name);
  const head = new Uint8Array(await file.slice(0, 4).arrayBuffer());

  let plan: ArchivePlan;
  if (/\.gz$/i.test(base) && !isZip(head)) {
    if (file.size > MAX_ARCHIVE_BYTES) throw new Error(tr("archive.tooBig"));
    const inner = base.replace(/\.gz$/i, "");
    plan = {
      kind: "files",
      entries: ACTIVITY.test(inner)
        ? [{ name: inner, path: base, read: async () => inflate(new Uint8Array(await file.arrayBuffer()), "gzip", tr) }]
        : [],
    };
  } else {
    const source = blobSource(file);
    const directory = await readCentralDirectory(source, tr);
    plan = isStravaArchive(directory)
      ? { kind: "strava", entries: await withStravaMeta(source, directory, stravaEntries(source, directory, tr), tr) }
      : { kind: "files", entries: await zipEntries(source, directory, 0, tr) };
  }
  if (!plan.entries.length) throw new Error(tr("archive.empty"));
  return plan;
}

/**
 * Toutes les séances d'une archive, décompressées. Pratique pour les petites
 * archives (export d'une séance Garmin) ; pour une archive de compte, préférer
 * openArchive et lire les entrées une à une.
 */
export async function extractActivities(
  name: string,
  data: Uint8Array,
  locale?: string,
): Promise<ExtractedFile[]> {
  const plan = await openArchive(name, new Blob([data as Uint8Array<ArrayBuffer>]), locale);
  const out: ExtractedFile[] = [];
  for (const e of plan.entries) out.push({ name: e.name, data: await e.read() });
  return out;
}

// ─────────────────────────────────────── sélection des séances récentes

/**
 * Garde les séances des N derniers jours d'une archive lue de la plus
 * récente à la plus ancienne. La date de référence est la séance la plus
 * récente vue, pas l'horloge : une archive téléchargée il y a six mois doit
 * quand même donner sa dernière année d'entraînement.
 *
 * L'ordre par identifiant n'est pas parfaitement chronologique (une vieille
 * sortie importée récemment reçoit un grand numéro). D'où deux garde-fous :
 * on ne s'arrête qu'après plusieurs séances hors période d'affilée, et le
 * filtre final (keep) s'applique avec la référence définitive.
 */
export class RecentWindow {
  readonly periodDays: number;
  private readonly patience: number;
  private newestMs = -Infinity;
  private misses = 0;

  /** @param periodDays 0 = tout l'historique. */
  constructor(periodDays: number, patience = 15) {
    this.periodDays = periodDays;
    this.patience = patience;
  }

  /** Verdict au fil de la lecture : garder, ignorer, ou arrêter de lire. */
  judge(startIso?: string): "keep" | "skip" | "stop" {
    const t = startIso ? Date.parse(startIso) : NaN;
    if (!Number.isFinite(t)) return "skip";
    if (t > this.newestMs) this.newestMs = t;
    if (this.periodDays <= 0 || t >= this.cutoffMs()) {
      this.misses = 0;
      return "keep";
    }
    return ++this.misses >= this.patience ? "stop" : "skip";
  }

  /** Filtre final, avec la séance la plus récente effectivement vue. */
  keep(startIso?: string): boolean {
    const t = startIso ? Date.parse(startIso) : NaN;
    return Number.isFinite(t) && (this.periodDays <= 0 || t >= this.cutoffMs());
  }

  private cutoffMs(): number {
    return this.newestMs - this.periodDays * 86_400_000;
  }
}

// ───────────────────────────────────────────────── archive Strava

/**
 * Une archive de compte Strava se reconnaît à son « activities.csv » et à son
 * dossier « activities/ ». Ses itinéraires (« routes/ ») sont des GPX sans
 * horodatage : les analyser comme des séances fabriquerait de fausses sorties.
 */
function isStravaArchive(directory: ZipEntry[]): boolean {
  return directory.some((e) => /(^|\/)activities\.csv$/i.test(e.name))
    && directory.some((e) => /(^|\/)activities\/[^/]+$/i.test(e.name));
}

function stravaEntries(source: ByteSource, directory: ZipEntry[], tr: Tr): ArchiveEntry[] {
  const activities = directory.filter(
    (e) => /(^|\/)activities\/[^/]+$/i.test(e.name) && ACTIVITY_OR_GZ.test(e.name),
  );
  // Les identifiants d'activité Strava croissent avec le temps : trier par
  // numéro décroissant donne les séances récentes d'abord, sans rien lire.
  const id = (e: ZipEntry) => Number(baseName(e.name).match(/^\d+/)?.[0] ?? -1);
  activities.sort((a, b) => id(b) - id(a));
  return activities.map((e) => {
    const path = e.name;
    const gz = /\.gz$/i.test(path);
    return {
      name: baseName(path).replace(/\.gz$/i, ""),
      path,
      read: async () => {
        const raw = await entryData(source, e, tr);
        return gz ? inflate(raw, "gzip", tr) : raw;
      },
    };
  });
}

/**
 * Lit activities.csv : nom de chaque activité et marquage « course ». Le nom
 * est souvent le seul indice qu'une séance était une course (« Marathon de
 * Paris »). Un CSV illisible n'empêche rien : les séances restent analysées.
 */
async function withStravaMeta(source: ByteSource, directory: ZipEntry[], entries: ArchiveEntry[], tr: Tr): Promise<ArchiveEntry[]> {
  const csv = directory.find((e) => /(^|\/)activities\.csv$/i.test(e.name));
  if (!csv) return entries;
  try {
    const meta = parseStravaActivities(new TextDecoder().decode(await entryData(source, csv, tr)));
    for (const e of entries) Object.assign(e, meta.get(e.name) ?? {});
  } catch {
    // Métadonnées facultatives.
  }
  return entries;
}

/** CSV RFC 4180 : guillemets, virgules et retours à la ligne dans les champs. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/**
 * Métadonnées de activities.csv, par fichier d'activité (« 123.fit »). Les
 * en-têtes suivent la langue du compte : on repère la colonne des fichiers
 * par son contenu, le nom par sa position (troisième colonne dans toutes les
 * langues), et le marquage course par les en-têtes connus.
 */
export function parseStravaActivities(text: string): Map<string, { title?: string; declaredRace?: boolean }> {
  const rows = parseCsv(text.replace(/^\uFEFF/, ""));
  const out = new Map<string, { title?: string; declaredRace?: boolean }>();
  if (rows.length < 2) return out;
  const header = rows[0];
  const data = rows.slice(1);
  const fileCol = header.findIndex((_, k) => data.some((r) => /^activities\/[^/]+\.(fit|tcx|gpx)(\.gz)?$/i.test(r[k] ?? "")));
  if (fileCol < 0) return out;
  const competition = header.findIndex((h) => /^(competition|compétition|competici[oó]n|competi[cç][aã]o|wettkampf)$/i.test(h.trim()));
  const workoutType = header.findIndex((h) => /^(workout type|type d'entraînement)$/i.test(h.trim()));
  const yes = (v?: string) => !!v && /^(1|true|vrai|yes|oui)$/i.test(v.trim());
  for (const r of data) {
    const file = r[fileCol];
    if (!file) continue;
    const name = baseName(file).replace(/\.gz$/i, "");
    out.set(name, {
      title: r[2]?.trim() || undefined,
      // Type d'entraînement Strava : 1 course à pied « compétition », 11 vélo « course ».
      declaredRace: yes(r[competition]) || ["1", "11"].includes((r[workoutType] ?? "").trim()) || undefined,
    });
  }
  return out;
}

// ──────────────────────────────────────────────── archive générique

async function zipEntries(source: ByteSource, directory: ZipEntry[], depth: number, tr: Tr): Promise<ArchiveEntry[]> {
  const out: ArchiveEntry[] = [];
  for (const e of directory) {
    const base = baseName(e.name);
    // Dossiers, métadonnées du Finder et tout ce qui n'est pas une séance.
    if (e.name.endsWith("/") || e.name.includes("__MACOSX/") || base.startsWith("._")) continue;
    if (ACTIVITY.test(base)) {
      out.push({ name: base, path: e.name, read: () => entryData(source, e, tr) });
    } else if (/\.gz$/i.test(base) && ACTIVITY.test(base.replace(/\.gz$/i, ""))) {
      out.push({
        name: base.replace(/\.gz$/i, ""),
        path: e.name,
        read: async () => inflate(await entryData(source, e, tr), "gzip", tr),
      });
    } else if (/\.zip$/i.test(base) && depth + 1 < MAX_DEPTH) {
      // ZIP imbriqué (export complet Garmin) : il faut l'avoir en mémoire
      // pour le parcourir, mais ses séances restent lues à la demande.
      const inner = bytesSource(await entryData(source, e, tr));
      out.push(...await zipEntries(inner, await readCentralDirectory(inner, tr), depth + 1, tr));
    }
  }
  return out;
}

// ───────────────────────────────────────────────────── format ZIP

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
async function readCentralDirectory(source: ByteSource, tr: Tr): Promise<ZipEntry[]> {
  // L'enregistrement de fin fait 22 octets, plus un commentaire de 64 Ko au
  // plus ; le localisateur ZIP64, s'il existe, le précède de 20 octets.
  const tailLength = Math.min(source.size, 22 + 0xffff + 20);
  const tailStart = source.size - tailLength;
  const tail = await source.read(tailStart, tailLength);
  const tv = view(tail);
  let end = -1;
  for (let i = tail.length - 22; i >= 0; i--) {
    if (tv.getUint32(i, true) === SIG_END) {
      end = i;
      break;
    }
  }
  if (end < 0) throw new Error(tr("archive.corrupt"));

  let count = tv.getUint16(end + 10, true);
  let size = tv.getUint32(end + 12, true);
  let offset = tv.getUint32(end + 16, true);

  if (count === 0xffff || size === 0xffffffff || offset === 0xffffffff) {
    // ZIP64 : le localisateur donne la position de l'enregistrement de fin 64 bits.
    if (end < 20 || tv.getUint32(end - 20, true) !== SIG_LOCATOR64) throw new Error(tr("archive.corrupt"));
    const recordOffset = Number(tv.getBigUint64(end - 12, true));
    const record = await source.read(recordOffset, 56);
    const rv = view(record);
    if (record.length < 56 || rv.getUint32(0, true) !== SIG_END64) throw new Error(tr("archive.corrupt"));
    count = Number(rv.getBigUint64(32, true));
    size = Number(rv.getBigUint64(40, true));
    offset = Number(rv.getBigUint64(48, true));
  }
  if (offset + size > source.size) throw new Error(tr("archive.corrupt"));

  const dir = await source.read(offset, size);
  const dv = view(dir);
  const entries: ZipEntry[] = [];
  const decoder = new TextDecoder();
  let p = 0;
  for (let n = 0; n < count; n++) {
    if (p + 46 > dir.length || dv.getUint32(p, true) !== SIG_CENTRAL) throw new Error(tr("archive.corrupt"));
    const nameLength = dv.getUint16(p + 28, true);
    const extraLength = dv.getUint16(p + 30, true);
    const commentLength = dv.getUint16(p + 32, true);
    let compressedSize = dv.getUint32(p + 20, true);
    const uncompressedSize = dv.getUint32(p + 24, true);
    let localOffset = dv.getUint32(p + 42, true);

    if (compressedSize === 0xffffffff || uncompressedSize === 0xffffffff || localOffset === 0xffffffff) {
      // Champ supplémentaire ZIP64 (identifiant 1) : seules les valeurs
      // saturées y figurent, dans cet ordre.
      let q = p + 46 + nameLength;
      const stop = q + extraLength;
      while (q + 4 <= stop) {
        const id = dv.getUint16(q, true);
        const len = dv.getUint16(q + 2, true);
        if (id === 1) {
          let r = q + 4;
          if (uncompressedSize === 0xffffffff) r += 8;
          if (compressedSize === 0xffffffff) {
            compressedSize = Number(dv.getBigUint64(r, true));
            r += 8;
          }
          if (localOffset === 0xffffffff) localOffset = Number(dv.getBigUint64(r, true));
          break;
        }
        q += 4 + len;
      }
    }

    entries.push({
      name: decoder.decode(dir.subarray(p + 46, p + 46 + nameLength)),
      method: dv.getUint16(p + 10, true),
      encrypted: (dv.getUint16(p + 8, true) & 1) === 1,
      compressedSize,
      localOffset,
    });
    p += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

async function entryData(source: ByteSource, entry: ZipEntry, tr: Tr): Promise<Uint8Array> {
  if (entry.encrypted || (entry.method !== 0 && entry.method !== 8)) throw new Error(tr("archive.unsupported"));
  const header = await source.read(entry.localOffset, 30);
  const hv = view(header);
  if (header.length < 30 || hv.getUint32(0, true) !== SIG_LOCAL) throw new Error(tr("archive.corrupt"));
  const start = entry.localOffset + 30 + hv.getUint16(26, true) + hv.getUint16(28, true);
  if (start + entry.compressedSize > source.size) throw new Error(tr("archive.corrupt"));
  const raw = await source.read(start, entry.compressedSize);
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

const isZip = (d: Uint8Array) => d.length >= 4 && d[0] === 0x50 && d[1] === 0x4b && (d[2] === 3 || d[2] === 5);
const baseName = (path: string) => path.split(/[\\/]/).pop() ?? path;
