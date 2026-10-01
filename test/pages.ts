/**
 * Banc d'essai des pages traduites.
 *
 * Rend chaque gabarit de public/ dans chaque langue et vérifie ce qu'un
 * moteur de recherche et un visiteur verront : aucun emplacement oublié, la
 * bonne langue déclarée, des hreflang réciproques, un JSON-LD valide, un
 * sélecteur de langue en HTML statique, et aucune phrase restée en français.
 *
 *   node --experimental-strip-types test/pages.ts
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { LOCALES } from "../src/i18n.ts";
import {
  renderPage, renderMarkdown, markdownPath, pageCoverage, pageText, pagePath,
  PAGE_KEYS, LOCALE_META, ROUTES, X_DEFAULT,
} from "../src/page-i18n.ts";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  const mark = ok ? "\u001b[32m✓\u001b[0m" : "\u001b[31m✗\u001b[0m";
  console.log(`  ${mark} ${label}${detail ? `  \u001b[2m${detail}\u001b[0m` : ""}`);
  if (!ok) failures++;
}

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const pages = readdirSync(PUBLIC).filter((f) => f.endsWith(".html"));
const KNOWN_PATHS = new Set(LOCALES.flatMap((l) => Object.keys(ROUTES).map((p) => pagePath(l, p))));

console.log("\n\u001b[1mPages traduites\u001b[0m");

const cov = pageCoverage();
const missing = LOCALES.flatMap((l) => cov[l].missing.map((k) => `${l}:${k}`));
check("textes de page complets dans les sept langues", missing.length === 0, missing.slice(0, 3).join(", "));
const bad = LOCALES.flatMap((l) => cov[l].badParams.map((k) => `${l}:${k}`));
check("emplacements identiques au français", bad.length === 0, bad.slice(0, 3).join(", "));

/** Fragments propres au français : absents du catalogue de la langue visée. */
function frenchFragments(locale: (typeof LOCALES)[number]): string[] {
  const target = PAGE_KEYS.map((k) => pageText(locale, k)).join("\n");
  const frags = new Set<string>();
  for (const k of PAGE_KEYS) {
    for (const part of pageText("fr", k).split(/<[^>]+>|\{\{?\w+\}?\}/)) {
      const f = part.trim();
      if (f.length >= 16 && /[a-zé]/i.test(f) && !target.includes(f)) frags.add(f);
    }
  }
  return [...frags];
}

for (const page of pages) {
  const template = readFileSync(join(PUBLIC, page), "utf8");
  for (const locale of LOCALES) {
    const tag = `${locale}/${page}`;
    let html = "";
    try {
      html = renderPage(template, locale, { page });
    } catch (e) {
      check(`${tag} : rendu`, false, (e as Error).message);
      continue;
    }
    const problems: string[] = [];

    if (!html.includes(`<html lang="${LOCALE_META[locale].htmlLang}">`)) problems.push("lang");
    const alternates = html.match(/<link rel="alternate" hreflang="[^"]+"/g) ?? [];
    if (alternates.length !== LOCALES.length + 1) problems.push(`hreflang ${alternates.length}`);
    if (!html.includes(`hreflang="x-default" href="https://exemple.com/${X_DEFAULT}/`)) problems.push("x-default");
    const nav = html.match(/<nav class="langs"[\s\S]*?<\/nav>/)?.[0] ?? "";
    if ((nav.match(/<a /g) ?? []).length !== LOCALES.length - 1) problems.push("sélecteur");
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        JSON.parse(m[1]);
      } catch {
        problems.push("JSON-LD");
      }
    }
    const pageJson = html.match(/const PAGE = (\{.*\});/)?.[1];
    if (page === "index.html") {
      try {
        const parsed = JSON.parse(pageJson ?? "");
        if (parsed.locale !== locale) problems.push("PAGE.locale");
      } catch {
        problems.push("PAGE json");
      }
    }
    // Chaque lien interne doit mener à une page publiée : un slug traduit
    // mal recopié ferait une 404 silencieuse.
    const broken = [...html.matchAll(/href="(\/[a-z]{2}\/[^"#?]*)"/g)]
      .map((m) => m[1])
      .filter((href) => !KNOWN_PATHS.has(href));
    if (broken.length) problems.push(`liens morts : ${broken.slice(0, 2).join(", ")}`);
    if (locale !== "fr") {
      const frags = frenchFragments(locale);
      const leak = frags.find((f) => html.includes(f));
      if (leak) problems.push(`français : « ${leak.slice(0, 50)} »`);
    }
    check(`${tag}`, problems.length === 0, problems.join(", "));
  }
}

// Un article absent de l'index du blog n'a qu'un seul lien entrant : le
// sitemap. Chaque gabarit « post-* » et « guide-* » doit y figurer, dans chaque langue.
{
  const blog = readFileSync(join(PUBLIC, "blog.html"), "utf8");
  const posts = pages.filter((p) => p.startsWith("post-") || p.startsWith("guide-"));
  for (const locale of LOCALES) {
    const html = renderPage(blog, locale, { page: "blog.html" });
    const missing = posts.filter((p) => !html.includes(`href="${pagePath(locale, p)}"`));
    check(`${locale} : index du blog, ${posts.length} article(s) listé(s)`, missing.length === 0, missing.join(", "));
  }
}

// ─────────────────────────────────────────── versions Markdown

const MARKDOWN = join(dirname(fileURLToPath(import.meta.url)), "..", "site", "markdown");
for (const file of readdirSync(MARKDOWN).filter((f) => f.endsWith(".md"))) {
  const page = file.replace(/\.md$/, ".html");
  const template = readFileSync(join(MARKDOWN, file), "utf8");
  for (const locale of LOCALES) {
    const problems: string[] = [];
    let md = "";
    try {
      md = renderMarkdown(template, locale, { page });
    } catch (e) {
      problems.push((e as Error).message);
    }
    if (/<\/?[a-z][^>]*>/i.test(md)) problems.push("balise HTML restée");
    try {
      JSON.parse(md.match(/^title: (.*)$/m)?.[1] ?? "");
    } catch {
      problems.push("front matter invalide");
    }
    check(`${markdownPath(locale, page)}`, problems.length === 0, problems.join(", "));
  }
}

// ─────────────────────────────── mesure d'audience et confidentialité

// La promesse de la page de confidentialité doit suivre le script de mesure :
// sans jeton, aucune trace de mesure ; avec jeton, script ET déclaration.
{
  const privacy = readFileSync(join(PUBLIC, "confidentialite.html"), "utf8");
  const home = readFileSync(join(PUBLIC, "index.html"), "utf8");
  const off = renderPage(privacy, "fr", { page: "confidentialite.html" }) +
    renderPage(home, "fr", { page: "index.html" });
  check("sans jeton : aucun script ni mention de mesure d'audience",
    !off.includes("cloudflareinsights"));
  for (const locale of LOCALES) {
    const on = renderPage(privacy, locale, { page: "confidentialite.html", analyticsToken: "abc123" });
    const ok = on.includes("static.cloudflareinsights.com/beacon.min.js") &&
      on.includes('"token":"abc123"'.replace(/"/g, "&quot;")) &&
      on.includes(pageText(locale, "privacy.analytics.row")) &&
      on.includes("cloudflareinsights.com</code>");
    check(`${locale} : avec jeton, script et déclaration dans la page de confidentialité`, ok);

    // Mode où Cloudflare injecte le script : déclaré, mais pas en double.
    const cdn = renderPage(privacy, locale, { page: "confidentialite.html", analyticsInjectedByCdn: true });
    check(`${locale} : injectée par Cloudflare, déclarée sans second script`,
      !cdn.includes("beacon.min.js") && cdn.includes(pageText(locale, "privacy.analytics.row")) &&
      cdn.includes(pageText(locale, "privacy.analytics.active")));
  }
}

console.log(failures ? `\n\u001b[31m${failures} échec(s)\u001b[0m\n` : "\n\u001b[32mToutes les pages passent\u001b[0m\n");
process.exitCode = failures ? 1 : 0;
