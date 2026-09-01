# Architecture du site

## 1. Le choix structurant : rendu statique + traitement client

Ces deux décisions se renforcent et conditionnent tout le reste.

**Le contenu est rendu côté serveur (statique).** Une SPA où le texte n'existe qu'après exécution du JS ne sera pas citée par les moteurs génératifs. Chaque page de doc, de référence et de conversion doit exister en HTML complet dans la réponse initiale.

**Les fichiers ne quittent jamais le navigateur.** Le parsing et la compaction tournent dans un Web Worker. Conséquences :

| | Effet |
|---|---|
| RGPD | Aucun traitement de donnée de localisation côté serveur. Pas de sous-traitant, pas de registre, pas de DPA. |
| Coût | Zéro coût variable. Un fichier de 40 Mo ne coûte rien. |
| Limites | Pas de plafond d'upload, pas de timeout. |
| Marketing | « Vos traces ne quittent jamais votre navigateur » est vérifiable (onglet Réseau) et c'est le seul argument que les concurrents serveur ne peuvent pas copier. |

**Stack recommandée : Astro.** Le site est à 90 % du contenu et à 10 % de l'application. Astro sort du HTML statique par défaut et n'hydrate que l'îlot du convertisseur. Next.js reste valable si tu veux un seul outil, mais tu passeras du temps à empêcher l'App Router de tout transformer en composant serveur dynamique.

```
src/
  pages/[locale]/index.astro          → l'app
  pages/[locale]/[...slug].astro      → contenu depuis les collections
  content/{fr,en,es}/…                → Markdown, une arborescence par langue
  components/Converter.tsx            → îlot React, client:visible
  i18n/{fr,en,es}.json                → chaînes d'interface
  lib/                                → gps-digest (le module fourni)
public/
  robots.txt  llms.txt  sitemap-index.xml
```

## 2. URL et internationalisation

**Un seul domaine, des sous-répertoires par langue.** Pas de ccTLD (`.fr`, `.es`), pas de sous-domaines. Une autorité unique se construit trois fois plus vite que trois autorités séparées, et les moteurs génératifs raisonnent au niveau du domaine.

```
/fr/convertir-tcx-en-csv
/en/convert-tcx-to-csv
/es/convertir-tcx-a-csv
```

**Slugs traduits, pas transposés.** `/es/convert-tcx-to-csv` est une occasion manquée : c'est la requête réelle en espagnol qui doit être dans l'URL.

**Toutes les langues sont préfixées, y compris l'anglais.** Pas de racine implicitement anglaise : ça crée des doublons `/` et `/en/` impossibles à canonicaliser proprement.

**La racine `/` redirige** selon `Accept-Language`, avec un sélecteur de langue toujours visible. Une redirection ne doit jamais être un cul-de-sac : chaque page traduite est atteignable par un lien en dur.

**`hreflang` sur chaque page**, réciproque et incluant `x-default` :

```html
<link rel="alternate" hreflang="fr" href="https://exemple.com/fr/convertir-tcx-en-csv">
<link rel="alternate" hreflang="en" href="https://exemple.com/en/convert-tcx-to-csv">
<link rel="alternate" hreflang="es" href="https://exemple.com/es/convertir-tcx-a-csv">
<link rel="alternate" hreflang="x-default" href="https://exemple.com/en/convert-tcx-to-csv">
```

Une page qui déclare une alternative doit recevoir la déclaration inverse, sinon tout le groupe est ignoré. C'est l'erreur la plus fréquente en multilingue — génère ces balises à partir d'une source unique, jamais à la main.

**Un sitemap par langue**, agrégé dans un `sitemap-index.xml`.

**Ne traduis pas à la machine sans relecture.** Trois langues bien écrites battent huit langues automatiques, qui diluent l'autorité et se font déclasser.

## 3. Rendu de l'app dans une page indexable

Le convertisseur est un îlot dans une page qui contient déjà, en HTML statique :

- le titre H1 et la proposition de valeur ;
- les formats acceptés et leurs limites ;
- un exemple de sortie **en dur dans le HTML** (un extrait de bundle réel) ;
- la FAQ.

Un moteur qui ne peut pas exécuter le JS doit quand même comprendre ce que fait l'outil et pouvoir citer l'exemple de sortie.

## 4. Données structurées

Une seule source de vérité, injectée en JSON-LD (voir `seo/schema.ts`) :

| Type de page | Schéma |
|---|---|
| Toutes | `Organization` + `WebSite` |
| Page app | `SoftwareApplication` (`applicationCategory`, `offers` à 0, `featureList`) |
| Pages conversion | `HowTo` + `FAQPage` |
| Pages référence | `Article` (avec `author`, `datePublished`, `dateModified`) |
| Guides d'export | `HowTo` |
| Glossaire des colonnes | `DefinedTermSet` + `DefinedTerm` |

`DefinedTermSet` est sous-utilisé et particulièrement adapté ici : il déclare explicitement que tu es la source de définition pour « GAP », « découplage aérobie », « Normalized Power ». C'est exactement le type d'entité qu'un moteur génératif cite.

Valide chaque type dans le test de résultats enrichis de Google avant mise en ligne.

## 5. Accès des robots

Deux fichiers à la racine — `robots.txt` et `llms.txt`, fournis dans `seo/`.

Point de vigilance : si le site passe par Cloudflare, le blocage des robots d'IA est **activé par défaut** sur les offres récentes. Beaucoup de sites publient un `robots.txt` accueillant tout en renvoyant des 403 aux robots au niveau du CDN. Vérifie avec un `curl -A "GPTBot"` réel avant de conclure.

`Google-Extended` est un choix de fond : le bloquer protège ton contenu de l'entraînement, mais te retire des réponses Gemini. Pour un produit dont l'argument est « préparez vos données pour un LLM », s'exclure des réponses des LLM serait contradictoire.

## 6. Performance et qualité

- Zéro dépendance JS sur les pages de contenu. L'îlot du convertisseur ne se charge que sur la page app (`client:visible`).
- Le SDK FIT (~200 Ko) est en import dynamique : chargé seulement quand un `.fit` est déposé.
- Cibles Core Web Vitals : LCP < 2,0 s, CLS < 0,05, INP < 200 ms.
- Le worker doit émettre une progression : sur un fichier de 30 Mo le parsing prend 1 à 3 s, et un écran figé sans retour fait fermer l'onglet.

## 7. Analytique sans contradiction

Un produit qui promet que rien ne sort du navigateur ne peut pas embarquer Google Analytics. Utilise une solution sans cookie ni identifiant persistant (Plausible, Umami auto-hébergé, ou les statistiques du CDN). Mesure les événements produit — fichier déposé, format, bundle exporté — jamais le contenu.

À suivre en parallèle, et c'est le point aveugle habituel : les citations dans les moteurs génératifs. Elles ne remontent pas dans l'analytique web. Il faut interroger périodiquement ChatGPT, Gemini, Perplexity et Claude sur tes requêtes cibles et consigner qui est cité.
