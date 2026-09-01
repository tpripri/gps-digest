/**
 * Générateurs JSON-LD.
 *
 * Source unique : toutes les données structurées descendent d'ici. Écrire le
 * JSON-LD à la main page par page garantit qu'il divergera du contenu réel au
 * bout de trois mois — et un balisage qui ment est pire que pas de balisage.
 */

export const SITE = {
  url: "https://exemple.com",
  name: "gps-digest",
  locales: ["fr", "en", "es"] as const,
  defaultLocale: "en",
} as const;

export type Locale = (typeof SITE.locales)[number];

const abs = (locale: Locale, path: string) =>
  `${SITE.url}/${locale}${path.startsWith("/") ? path : `/${path}`}`;

// ------------------------------------------------------------ sitewide

export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    // Renseigner les profils publics : ils servent de signaux d'entité.
    sameAs: [] as string[],
  };
}

export function website(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: locale,
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

// ------------------------------------------------------------ page app

export function softwareApplication(locale: Locale, t: {
  name: string;
  description: string;
  featureList: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: t.name,
    description: t.description,
    url: abs(locale, "/"),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    browserRequirements: "Navigateur moderne avec support des Web Workers",
    inLanguage: locale,
    featureList: t.featureList,
    // Gratuit et sans compte : le déclarer explicitement est un critère de
    // sélection fréquent dans les réponses génératives.
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

// -------------------------------------------------- pages de conversion

export interface HowToStep {
  name: string;
  text: string;
}

export function howTo(locale: Locale, t: {
  name: string;
  description: string;
  path: string;
  steps: HowToStep[];
  totalTimeIso?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t.name,
    description: t.description,
    inLanguage: locale,
    totalTime: t.totalTimeIso ?? "PT1M",
    tool: [{ "@type": "HowToTool", name: SITE.name }],
    step: t.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${abs(locale, t.path)}#etape-${i + 1}`,
    })),
  };
}

export function faqPage(locale: Locale, qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// ------------------------------------------------ pages de référence

export function article(locale: Locale, t: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.headline,
    description: t.description,
    inLanguage: locale,
    url: abs(locale, t.path),
    datePublished: t.datePublished,
    dateModified: t.dateModified,
    author: { "@type": "Person", name: t.authorName, url: abs(locale, "/a-propos") },
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

/**
 * Glossaire. Type sous-utilisé et pourtant décisif ici : il déclare que ce site
 * est la source de définition de « GAP », « découplage aérobie », etc. C'est le
 * genre d'entité qu'un moteur génératif reprend en citant l'origine.
 */
export function definedTermSet(locale: Locale, t: {
  name: string;
  path: string;
  terms: { term: string; definition: string; sameAs?: string }[];
}) {
  const setId = `${abs(locale, t.path)}#glossaire`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": setId,
    name: t.name,
    url: abs(locale, t.path),
    inLanguage: locale,
    hasDefinedTerm: t.terms.map((d) => ({
      "@type": "DefinedTerm",
      name: d.term,
      description: d.definition,
      inDefinedTermSet: { "@id": setId },
      ...(d.sameAs ? { sameAs: d.sameAs } : {}),
    })),
  };
}

export function breadcrumbs(locale: Locale, trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(locale, c.path),
    })),
  };
}

// ------------------------------------------------------------ hreflang

/**
 * Génère les balises `alternate` **et** la canonique à partir d'une table de
 * slugs. Réciprocité garantie par construction : si un groupe hreflang n'est
 * pas réciproque, les moteurs l'ignorent en entier. C'est l'erreur multilingue
 * la plus fréquente, et elle est invisible sans outillage.
 */
export function alternates(slugs: Partial<Record<Locale, string>>, current: Locale) {
  const links = SITE.locales
    .filter((l) => slugs[l] != null)
    .map((l) => ({ hreflang: l, href: abs(l, slugs[l]!) }));

  const fallback = slugs[SITE.defaultLocale] ?? Object.values(slugs)[0];
  if (fallback) links.push({ hreflang: "x-default", href: abs(SITE.defaultLocale, fallback) });

  return { canonical: abs(current, slugs[current]!), links };
}

/** Table de correspondance des slugs. Une entrée par page, toutes langues. */
export const SLUGS: Record<string, Partial<Record<Locale, string>>> = {
  home: { fr: "/", en: "/", es: "/" },
  "tcx-csv": {
    fr: "/convertir-tcx-en-csv",
    en: "/convert-tcx-to-csv",
    es: "/convertir-tcx-a-csv",
  },
  "gpx-csv": {
    fr: "/convertir-gpx-en-csv",
    en: "/convert-gpx-to-csv",
    es: "/convertir-gpx-a-csv",
  },
  "fit-csv": {
    fr: "/convertir-fit-en-csv",
    en: "/convert-fit-to-csv",
    es: "/convertir-fit-a-csv",
  },
  comparaison: {
    fr: "/tcx-gpx-fit-comparaison",
    en: "/tcx-vs-gpx-vs-fit",
    es: "/tcx-gpx-fit-comparacion",
  },
  pilier: {
    fr: "/fichier-gps-trop-gros-ia",
    en: "/gps-file-too-large-for-ai",
    es: "/archivo-gps-demasiado-grande-ia",
  },
  glossaire: {
    fr: "/glossaire-metriques",
    en: "/metrics-glossary",
    es: "/glosario-metricas",
  },
  confidentialite: { fr: "/confidentialite", en: "/privacy", es: "/privacidad" },
};

export function renderJsonLd(...blocks: object[]): string {
  return blocks
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join("\n");
}
