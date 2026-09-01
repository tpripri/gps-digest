/**
 * Worker de bord.
 *
 * Ne s'exécute que pour les requêtes qui ne correspondent à aucun fichier
 * statique — c'est-à-dire, en pratique, la racine « / » uniquement.
 * Tout le reste est servi depuis l'edge sans passer par du code.
 *
 * Deux responsabilités :
 *   1. Rediriger « / » vers la langue du navigateur.
 *   2. Poser les en-têtes de sécurité.
 */

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const LOCALES = ["fr", "en", "es"] as const;
const DEFAULT_LOCALE = "en";

/**
 * Choisit la langue depuis l'en-tête Accept-Language, en respectant les
 * facteurs de qualité (« fr-CA,fr;q=0.9,en;q=0.8 »).
 */
function pickLocale(header: string | null): string {
  if (!header) return DEFAULT_LOCALE;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        // « fr-CA » doit correspondre à « fr ».
        lang: tag.trim().toLowerCase().split("-")[0],
        q: q ? parseFloat(q.split("=")[1]) || 0 : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of ranked) {
    if ((LOCALES as readonly string[]).includes(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      const locale = pickLocale(request.headers.get("Accept-Language"));
      return new Response(null, {
        // 302 et non 301 : la langue préférée d'un visiteur peut changer,
        // et un 301 serait mis en cache définitivement par son navigateur.
        status: 302,
        headers: {
          Location: `/${locale}/`,
          // Indispensable : sans Vary, un cache partagé servirait la version
          // française à un anglophone.
          Vary: "Accept-Language",
          "Cache-Control": "no-store",
        },
      });
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
    // Cohérent avec la promesse produit : la page ne peut pas exfiltrer les
    // fichiers, puisqu'elle n'a le droit de contacter aucun serveur tiers.
    headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; " +
        "frame-ancestors 'none'; base-uri 'self'",
    );

    return new Response(response.body, { status: response.status, headers });
  },
};
