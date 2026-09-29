/**
 * Notifie les moteurs IndexNow (Bing, Yandex, Seznam, Naver…) de toutes les
 * URL du sitemap, après un déploiement.
 *
 * Pourquoi : Bing alimente la recherche de ChatGPT et de Copilot. Attendre
 * qu'il repasse de lui-même peut prendre des semaines ; IndexNow le prévient
 * en une requête, sans compte ni tableau de bord. Google ne participe pas à
 * IndexNow : pour lui, c'est la Search Console et le sitemap.
 *
 * La clé n'est pas un secret : elle est publiée à la racine du site
 * (public/<clé>.txt) et prouve seulement que l'appel vient du propriétaire
 * du domaine.
 *
 *   npm run indexnow          (lancé aussi par npm run deploy)
 */

import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KEY = "ca90fdf3bf0cba41c604a47e5206ecad";
const SITE_URL = process.env.SITE_URL ?? "https://gpsdigest.com";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Le sitemap du dernier build est la liste de référence des pages publiées.
const sitemap = await readFile(join(ROOT, "dist", "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) {
  console.error("  ✗ Aucune URL dans dist/sitemap.xml : lancer npm run build d'abord.");
  process.exit(1);
}

const host = new URL(SITE_URL).host;
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList: urls }),
});

// 200 : accepté. 202 : reçu, clé en cours de vérification (premier envoi).
if (response.status === 200 || response.status === 202) {
  console.log(`  ✓ IndexNow : ${urls.length} URL notifiées (HTTP ${response.status})`);
} else {
  console.error(`  ✗ IndexNow : HTTP ${response.status} ${await response.text()}`);
  process.exit(1);
}
