/**
 * Build de production, sans bundler ni dépendance.
 *
 * Node 22 sait retirer les annotations de types (`module.stripTypeScriptTypes`).
 * On s'en sert pour transpiler chaque fichier de `src/` en JavaScript, en
 * réécrivant au passage les imports `./x.ts` en `./x.js`. Le navigateur charge
 * ensuite les modules ES nativement.
 *
 * Pourquoi pas un bundler : il n'apporterait ici qu'une concaténation. Les
 * modules sont petits, servis en HTTP/2 depuis le cache de bordure, et la
 * bibliothèque n'a aucune dépendance à résoudre. Zéro outil de build, c'est
 * zéro chaîne à maintenir et zéro surprise à la mise à jour.
 *
 * Rappel : retirer les types n'est PAS les vérifier. `npx tsc --noEmit` reste
 * la seule garantie, et le build s'arrête si on l'a sauté.
 *
 *   node scripts/build.mjs
 */

import { readFile, writeFile, mkdir, readdir, rm, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SITE_URL = process.env.SITE_URL ?? "https://exemple.com";

/** Langues effectivement publiées. Ajouter ici quand une traduction existe. */
const LOCALES = ["fr"];

async function transpileSources() {
  const srcDir = join(ROOT, "src");
  const outDir = join(DIST, "assets");
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(srcDir)).filter((f) => f.endsWith(".ts"));
  let total = 0;

  for (const file of files) {
    const source = await readFile(join(srcDir, file), "utf8");
    const js = stripTypeScriptTypes(source, {
      mode: "strip",
      sourceMap: false,
      sourceUrl: `/assets/${file}`,
    })
      // Les imports relatifs pointent vers des .ts dans le source ; à
      // l'exécution ce sont des .js.
      .replace(/(\bfrom\s*["'])(\.\/[^"']+)\.ts(["'])/g, "$1$2.js$3")
      .replace(/(\bimport\s*\(\s*["'])(\.\/[^"']+)\.ts(["']\s*\))/g, "$1$2.js$3");

    const out = basename(file, ".ts") + ".js";
    await writeFile(join(outDir, out), js);
    total += js.length;
  }
  return { count: files.length, bytes: total };
}

/**
 * Prépare une page pour la production : chemin du module, domaine réel, et
 * retrait des `hreflang` vers des langues qui n'existent pas encore. Déclarer
 * une alternative absente est pire que ne rien déclarer — les moteurs ignorent
 * le groupe entier quand la réciprocité n'est pas vérifiable.
 */
function preparePage(html) {
  let out = html
    .replace('from "/src/index.ts"', 'from "/assets/index.js"')
    .replace('import("/src/index.ts")', 'import("/assets/index.js")')
    .replaceAll("https://exemple.com", SITE_URL);

  for (const locale of ["en", "es"]) {
    if (LOCALES.includes(locale)) continue;
    out = out
      .replace(new RegExp(`\\s*<link rel="alternate" hreflang="${locale}"[^>]*>`, "g"), "")
      .replace(new RegExp(`\\s*<meta property="og:locale:alternate" content="${locale}[^"]*">`, "g"), "")
      .replace(new RegExp(`\\s*<a href="/${locale}/"[^>]*>[^<]*</a>`, "g"), "");
  }

  // x-default doit pointer vers une page qui existe réellement.
  out = out.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*">/,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/fr/">`,
  );
  return out;
}

async function buildPages() {
  const publicDir = join(ROOT, "public");
  const pages = (await readdir(publicDir)).filter((f) => f.endsWith(".html"));

  for (const locale of LOCALES) {
    await mkdir(join(DIST, locale), { recursive: true });
    for (const page of pages) {
      const html = await readFile(join(publicDir, page), "utf8");
      await writeFile(join(DIST, locale, page), preparePage(html));
    }
  }
  return pages;
}

async function buildSeo(pages) {
  const seoDir = join(ROOT, "site", "seo");
  for (const file of ["robots.txt", "llms.txt"]) {
    if (!existsSync(join(seoDir, file))) continue;
    const text = (await readFile(join(seoDir, file), "utf8")).replaceAll(
      "https://exemple.com",
      SITE_URL,
    );
    await writeFile(join(DIST, file), text);
  }

  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  for (const locale of LOCALES) {
    for (const page of pages) {
      const path = page === "index.html" ? `/${locale}/` : `/${locale}/${page}`;
      urls.push(
        `  <url>\n    <loc>${SITE_URL}${path}</loc>\n` +
          `    <lastmod>${today}</lastmod>\n  </url>`,
      );
    }
  }
  await writeFile(
    join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
  );
  return urls.length;
}

// ── Exécution ──────────────────────────────────────────────────────────────

console.log("\n  Build gps-digest");
console.log(`  domaine : ${SITE_URL}`);
console.log(`  langues : ${LOCALES.join(", ")}\n`);

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

const src = await transpileSources();
console.log(`  ✓ ${src.count} modules transpilés (${(src.bytes / 1024).toFixed(0)} Ko)`);

const pages = await buildPages();
console.log(`  ✓ ${pages.length * LOCALES.length} page(s) : ${pages.join(", ")}`);

const urlCount = await buildSeo(pages);
console.log(`  ✓ robots.txt, llms.txt, sitemap.xml (${urlCount} URL)`);

if (SITE_URL.includes("exemple.com")) {
  console.log(
    `\n  ⚠ Domaine non configuré. Relancer avec SITE_URL=https://votre-domaine.com`,
  );
}
console.log(`\n  dist/ prêt — « npx wrangler deploy » pour publier\n`);
