/**
 * Serveur de développement, sans aucune dépendance.
 *
 * Node 22 sait retirer les annotations de types à la volée
 * (`module.stripTypeScriptTypes`). On s'en sert pour servir les fichiers
 * `.ts` du dossier `src/` directement au navigateur, comme des modules ES.
 *
 * Résultat : pas d'étape de build, pas de bundler, rien à installer. On édite
 * un fichier dans `src/`, on recharge la page, c'est à jour.
 *
 * Ce serveur est un outil de test local. Pour la mise en production, le site
 * passe par un vrai build (voir DEPLOIEMENT.md) : le retrait de types ne
 * remplace pas la vérification de types, qui reste `npx tsc --noEmit`.
 *
 * Les pages sont rendues à la volée dans chaque langue, comme au build :
 * /fr/, /en/, /ja/confidentialite.html… La racine redirige selon la langue du
 * navigateur, comme le Worker en production. Après une modification des
 * textes de page (src/page-*.ts), relancer le serveur : Node garde les
 * modules en cache.
 *
 *   npm run dev
 */

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { renderPage } from "../src/page-i18n.ts";
import { LOCALES, resolveLocale } from "../src/i18n.ts";

const ROOT = normalize(join(fileURLToPath(import.meta.url), "..", ".."));
const PORT = Number(process.env.PORT ?? 5173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
};

/** Langue de la racine : ?lang=xx d'abord, sinon la première langue publiée du navigateur. */
function pickLocale(url, acceptLanguage) {
  const asked = url.searchParams.get("lang");
  if (asked) return resolveLocale(asked);
  for (const part of (acceptLanguage ?? "").split(",")) {
    const lang = part.trim().split(";")[0].toLowerCase().split("-")[0];
    if (LOCALES.includes(lang)) return lang;
  }
  return "en";
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://localhost");
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/") {
      const locale = pickLocale(url, req.headers["accept-language"]);
      res.writeHead(302, { Location: `/${locale}/`, "Cache-Control": "no-store" }).end();
      return;
    }

    // Pages : /xx/ ou /xx/page.html, rendues depuis le gabarit de public/.
    const localized = pathname.match(/^\/([a-z]{2})\/([\w-]+\.html)?$/);
    if (localized && LOCALES.includes(localized[1])) {
      const page = localized[2] ?? "index.html";
      const template = await readFile(join(ROOT, "public", page), "utf8");
      const html = renderPage(template, localized[1], { page });
      res.writeHead(200, { "Content-Type": MIME[".html"], "Cache-Control": "no-store" });
      res.end(html);
      return;
    }

    // Fichiers servis à la racine en production (favicon, og.png) : ils
    // vivent dans public/.
    if (/^\/[\w.-]+$/.test(pathname)) pathname = "/public" + pathname;

    // Garde-fou contre la remontée d'arborescence (« ../../etc/passwd ») :
    // on résout puis on vérifie que le chemin reste sous la racine.
    const filePath = normalize(join(ROOT, pathname));
    if (!filePath.startsWith(ROOT + sep) && filePath !== ROOT) {
      res.writeHead(403).end("Interdit");
      return;
    }

    const ext = extname(filePath);

    if (ext === ".ts") {
      const source = await readFile(filePath, "utf8");
      // sourceUrl garde des traces d'appel lisibles dans la console du
      // navigateur : sans lui, toute erreur pointe vers du code anonyme.
      const js = stripTypeScriptTypes(source, {
        mode: "strip",
        sourceMap: false,
        sourceUrl: pathname,
      });
      res.writeHead(200, {
        "Content-Type": "text/javascript; charset=utf-8",
        "Cache-Control": "no-store",
      });
      res.end(js);
      return;
    }

    const body = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(body);
  } catch (err) {
    if (err && err.code === "ENOENT") {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Introuvable : " + req.url);
    } else {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Erreur : " + (err?.message ?? err));
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n  gps-digest — banc d'essai\n`);
  console.log(`  → http://localhost:${PORT}\n`);
  console.log(`  Vos fichiers ne quittent pas votre machine.`);
  console.log(`  Ctrl+C pour arrêter.\n`);
});
