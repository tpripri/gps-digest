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
 * Les pages sont des gabarits (public/*.html) rendus une fois par langue par
 * src/page-i18n.ts. Ce module est en TypeScript : le script se lance avec
 * --experimental-strip-types (voir package.json), inutile à partir de Node 23.6.
 *
 *   npm run build
 */

import { readFile, writeFile, mkdir, readdir, rm, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { renderPage, renderMarkdown, pagePath, markdownPath, LOCALE_META } from "../src/page-i18n.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
/**
 * Domaine du site. Obligatoire : il est injecté dans les URL canoniques, les
 * balises hreflang, le JSON-LD et le sitemap. Un build qui le laisse à sa
 * valeur d'exemple produit un site en apparence correct dont TOUTES les
 * métadonnées pointent ailleurs — les moteurs suivent alors un domaine qui ne
 * vous appartient pas. Échouer bruyamment vaut mieux que livrer ça.
 *
 * Par défaut, le domaine de production (gpsdigest.com). La variable SITE_URL
 * reste prioritaire, pour un environnement de préproduction par exemple.
 */
const SITE_URL = process.env.SITE_URL ?? "https://gpsdigest.com";
if (!SITE_URL || SITE_URL.includes("exemple.com")) {
  console.error(`
  ✗ SITE_URL n'est pas défini.

    Ce domaine est injecté dans les URL canoniques, les hreflang, le JSON-LD
    et le sitemap. Sans lui, le site déployé renverrait les moteurs de
    recherche vers un domaine d'exemple.

    PowerShell :   $env:SITE_URL="https://votre-domaine.com"; npm run build
    bash / zsh :   SITE_URL=https://votre-domaine.com npm run build
`);
  process.exit(1);
}

/**
 * Jeton Cloudflare Web Analytics (mesure d'audience sans cookie). Vide :
 * aucun script de mesure, et la page de confidentialité le dit. Renseigné :
 * le script est ajouté à toutes les pages ET la page de confidentialité le
 * déclare, dans les sept langues. Le jeton n'est pas un secret : il figure en
 * clair dans le HTML publié.
 */
const CF_BEACON_TOKEN = process.env.CF_BEACON_TOKEN ?? "";

/**
 * Langues effectivement publiées. Chacune doit avoir un catalogue complet
 * (npm test le vérifie) ; retirer une langue ici la retire aussi des hreflang,
 * du sélecteur et du sitemap, sans rien casser.
 */
const LOCALES = ["fr", "en", "es", "pt", "de", "zh", "ja"];

async function transpileSources() {
  const srcDir = join(ROOT, "src");
  const outDir = join(DIST, "assets");
  await mkdir(outDir, { recursive: true });

  // Les textes des pages (page-*.ts) ne servent qu'au rendu : inutile de les
  // envoyer au navigateur.
  const files = (await readdir(srcDir)).filter((f) => f.endsWith(".ts") && !f.startsWith("page-"));
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
 * Prépare une page pour la production : rendu dans la langue, chemin du
 * module, domaine réel. Les `hreflang` ne listent que les langues publiées :
 * déclarer une alternative absente est pire que ne rien déclarer, les moteurs
 * ignorent le groupe entier quand la réciprocité n'est pas vérifiable.
 */
function preparePage(template, locale, page) {
  return renderPage(template, locale, { page, locales: LOCALES, analyticsToken: CF_BEACON_TOKEN })
    .replace('from "/src/index.ts"', 'from "/assets/index.js"')
    .replace('import("/src/index.ts")', 'import("/assets/index.js")')
    .replaceAll("https://exemple.com", SITE_URL);
}

async function buildPages() {
  const publicDir = join(ROOT, "public");
  const pages = (await readdir(publicDir)).filter((f) => f.endsWith(".html"));

  for (const locale of LOCALES) {
    for (const page of pages) {
      const template = await readFile(join(publicDir, page), "utf8");
      // Le chemin vient de ROUTES (src/page-i18n.ts) : « /fr/blog/<slug>/ »
      // s'écrit « dist/fr/blog/<slug>/index.html ».
      const path = pagePath(locale, page);
      const file = join(
        DIST,
        path.endsWith("/") ? path + "index.html" : /\.\w+$/.test(path) ? path : path + ".html",
      );
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, preparePage(template, locale, page));

      // Version Markdown, pour les assistants qui suivent llms.txt : écrite à
      // côté de la page quand un gabarit existe dans site/markdown/.
      const mdTemplate = join(ROOT, "site", "markdown", page.replace(/\.html$/, ".md"));
      if (existsSync(mdTemplate)) {
        const md = renderMarkdown(await readFile(mdTemplate, "utf8"), locale, { page, locales: LOCALES })
          .replaceAll("https://exemple.com", SITE_URL);
        await writeFile(join(DIST, markdownPath(locale, page)), md);
        markdownCount++;
      }
    }
  }
  return pages;
}

let markdownCount = 0;

/**
 * Fichiers servis à la racine : favicon, image de partage, manifeste.
 * Ils doivent être accessibles depuis « / » et non depuis « /fr/ », parce que
 * les navigateurs et les réseaux sociaux les cherchent à la racine du domaine.
 */
async function copyStatic() {
  const publicDir = join(ROOT, "public");
  const assets = (await readdir(publicDir)).filter(
    (f) => !f.endsWith(".html") && !f.startsWith("."),
  );
  for (const file of assets) {
    await copyFile(join(publicDir, file), join(DIST, file));
  }
  return assets;
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
  // Chaque URL déclare ses traductions : c'est la forme que Google recommande
  // pour un site multilingue, en complément des hreflang des pages.
  const urls = [];
  for (const locale of LOCALES) {
    for (const page of pages) {
      const alternates = LOCALES.map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${LOCALE_META[l].hreflang}" href="${SITE_URL}${pagePath(l, page)}"/>`,
      ).join("\n");
      urls.push(
        `  <url>\n    <loc>${SITE_URL}${pagePath(locale, page)}</loc>\n` +
          `    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`,
      );
    }
  }
  await writeFile(
    join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
      `${urls.join("\n")}\n</urlset>\n`,
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
console.log(`  ✓ ${markdownCount} version(s) Markdown pour les assistants IA`);
console.log(`  ✓ mesure d'audience : ${CF_BEACON_TOKEN ? "Cloudflare Web Analytics" : "aucune"}`);

const statics = await copyStatic();
if (statics.length) console.log(`  ✓ ${statics.length} fichier(s) statique(s) : ${statics.join(", ")}`);

const urlCount = await buildSeo(pages);
console.log(`  ✓ robots.txt, llms.txt, sitemap.xml (${urlCount} URL)`);

console.log(`\n  dist/ prêt — « npx wrangler deploy » pour publier\n`);
