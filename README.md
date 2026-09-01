# gps-digest

[![CI](https://github.com/tpripri/gps-digest/actions/workflows/ci.yml/badge.svg)](https://github.com/tpripri/gps-digest/actions/workflows/ci.yml)

Compacte les fichiers de montres GPS (**TCX**, **GPX**, **FIT**) en résumés CSV qu'un LLM peut réellement analyser.

Zéro dépendance obligatoire, tourne dans le navigateur, aucun fichier n'est envoyé sur un serveur.

## Le problème

Un TCX d'une heure à 1 Hz pèse ~1,7 Mo, dont ~90 % de balises XML. Cela représente environ **533 000 tokens**. Même quand ça rentre dans la fenêtre de contexte, le modèle raisonne mal : on lui demande de faire de l'analyse d'entraînement sur 3 600 lignes de coordonnées.

## Le résultat

Mesuré par `npm test` sur une séance synthétique de 8 × 400 m :

```
1,70 Mo (~533 000 tokens)  →  18,2 Ko (~5 800 tokens)   = 98,9 % de réduction
```

Et le résumé est *plus* utile que le fichier brut, parce qu'il contient des objets que le modèle sait interpréter :

```
## interval_sets
description,reps,avg_work_s,avg_work_pace,avg_rest_s
"8 × 400 m, récup 89 s",8,83,3:30,89

## splits
n,dist_m,dur_s,pace_s_km,pace_mmss,gap_s_km,hr_bpm,cad_spm,ele_gain_m,partial
1,1000,330,330,5:30,284,134,172,0,0
2,1000,330,330,5:30,329,135,172,0,0
3,1000,287,287,4:47,300,147,177,0,0
…
```

## Utilisation

```ts
import { digestFile } from "gps-digest";

const { bundle, digest, warnings } = await digestFile(file.name, await file.text(), {
  athlete: { maxHr: 190, lthr: 172, thresholdPaceSPerKm: 240 },
  streamTokenBudget: 8000,   // budget pour la trace rééchantillonnée
  splitUnitM: 1000,          // 1609.344 pour des miles
  privacyRadiusM: 250,       // rogne départ et arrivée
});

console.log(bundle);                        // à coller dans Gemini / ChatGPT / Claude
console.log(digest.reduction.estimatedTokens);
```

Dans un Web Worker (recommandé — un TCX de 20 Mo fige le thread principal) :

```ts
const worker = new Worker(new URL("gps-digest/worker", import.meta.url), { type: "module" });
worker.postMessage({ id: "1", filename: file.name, data: await file.text(), options });
```

Pour le FIT : `npm i @garmin/fitsdk` (dépendance optionnelle, chargée dynamiquement).

## Analyses autonomes

Au-delà de la compaction, la bibliothèque produit des analyses lisibles sans passer par un LLM — et les injecte aussi dans le bundle, pour que le modèle n'ait pas à refaire mal un travail déjà fait sur des données propres.

**Source de la FC : ceinture ou capteur poignet.** Détectée par signature du signal : verrouillage sur la cadence (l'artefact optique par excellence — la montre confond les foulées avec les pulsations), longueur des plateaux, granularité battement à battement, latence de réponse, pic de démarrage aux électrodes sèches. En FIT, `device_info` sert de vérité terrain quand elle est présente. C'est la première analyse à faire : tout le reste en dépend.

**Dérive cardiaque, avec refus assumé.** Le module commence par répondre à « cette séance permet-elle un calcul de dérive ? ». Au-delà de 18 % de variation d'allure, l'effort est du fractionné déguisé et la réponse est non — `decouplingPct` vaut `null`, pas zéro. Les segments où la FC est verrouillée sur la cadence sont exclus de la fenêtre : les inclure reviendrait à mesurer un artefact.

**Respect des blocs.** Régularité entre répétitions, dégradation d'allure sur la série, dérive des temps de récupération, et montée de FC à allure tenue. Ce dernier signal est le plus fin : le coût cardiaque augmente avant que les jambes ne lâchent.

**Projections de chrono.** Riegel avec exposant calibrable sur deux performances réelles, plus un modèle de vitesse critique ajusté sur les meilleurs efforts de 2 à 20 min. Les deux sont mélangés avec des poids explicites, et l'écart entre eux devient la fourchette d'incertitude. Un résultat de course pèse davantage qu'un effort d'entraînement, mais son poids décroît avec l'ancienneté : un chrono de 2025 décrit un potentiel, plus une forme actuelle.

**Analyse multi-fichiers.** Vingt séances posent des questions qu'un fichier isolé ne peut pas poser : charge hebdomadaire, répartition des intensités, meilleurs efforts consolidés avec leur provenance — et surtout la **cohérence du matériel**. Un changement de capteur de FC au milieu d'une période invalide silencieusement toute comparaison cardiaque. Le module le détecte, le date et l'annonce avant toute autre conclusion.

## Chaîne de traitement

| Étape | Fichier | Ce qui se passe |
|---|---|---|
| 1. Parsing | `parse-tcx.ts`, `parse-gpx.ts`, `parse-fit.ts` | SAX maison sans dépendance, extraction des extensions Garmin, lecture des tours natifs |
| 2. Assainissement | `geo.ts` | Rejet des valeurs physiologiquement impossibles (FC à 255, puissance à 4 000 W, coordonnées 0,0) |
| 3. Vie privée | `privacy.ts` | Rognage du départ et de l'arrivée par distance parcourue |
| 4. Dérivation | `derive.ts` | Pente sur fenêtre de distance, GAP (Minetti 2002), temps en mouvement, Normalized Power, dérive aérobie |
| 5. Analyse | `analyze.ts` | Splits, zones FC / allure / puissance, détection d'intervalles par k-moyennes |
| 6. Réduction | `reduce.ts` | Douglas-Peucker multi-canaux + dichotomie sur le budget de lignes |
| 7. Analyses | `sensor.ts`, `drift.ts`, `adherence.ts`, `efforts.ts` | Capteur de FC, dérive, respect des blocs, meilleurs efforts, projections |
| 8. Agrégation | `batch.ts` | Multi-fichiers : charge, intensités, changements de capteur |
| 9. Sérialisation | `serialize.ts` | Bundle multi-blocs, dialectes CSV séparés LLM / Excel |

Source Strava : `strava.ts` convertit les flux du MCP vers le même modèle interne — tout le pipeline est partagé.

## Deux points qui font la différence

**La réduction est multi-canaux.** Un sous-échantillonnage régulier détruit exactement ce qui intéresse le modèle : un départ d'intervalle dure deux secondes, un sommet de côte est un point unique. Ici, Douglas-Peucker tourne indépendamment sur l'altitude (contre la distance), la vitesse, la FC, la puissance et la cadence, puis on prend l'union des indices retenus. Une rupture sur n'importe quel canal survit. Les bornes de splits, de tours et d'intervalles sont des ancres qui ne peuvent pas être supprimées.

**Les dialectes CSV sont séparés, et c'est volontaire.**

| | Séparateur | Décimale | BOM |
|---|---|---|---|
| `LLM_DIALECT` | `,` | `.` | non |
| `EXCEL_EU_DIALECT` | `;` | `,` | oui |

Les mélanger est le bug n°1 des convertisseurs : un utilisateur francophone ouvre le CSV « LLM » dans Excel et voit une seule colonne — ou pire, envoie à un modèle un fichier où `3,45` compte pour deux champs.

## Tests

```bash
npm test    # test/run.ts (compaction) + test/analysis.ts (analyses)
```

46 tests sur deux suites, sans dépendance.

`test/run.ts` génère un TCX synthétique cohérent — trajectoire intégrée le long d'un cap variable, réponse cardiaque du premier ordre, bruit altimétrique — et vérifie parsing, plausibilité des métriques, détection des 8 × 400 m et de la récupération de 90 s, tenue du budget de tokens, intégrité du CSV.

`test/analysis.ts` fabrique **deux fichiers identiques sauf la FC** : l'un avec la signature d'une ceinture, l'autre avec les artefacts d'un capteur optique (retard, lissage, verrouillage cadence intermittent). C'est la seule façon de savoir si le détecteur mesure quelque chose ou s'il devine. Il vérifie aussi que la dérive est *refusée* sur du fractionné, que le changement de capteur est détecté et daté sur un lot de fichiers, et que l'adaptateur Strava produit le même résultat que le fichier d'origine.

## Limites connues

- Les zones de FC retombent sur la **FC max observée dans le fichier** si aucun profil athlète n'est fourni. Le bundle le signale explicitement au modèle.
- `estimateTokens()` est une approximation (≈ 3,2 caractères par token sur du CSV numérique dense), volontairement prudente. Pour un budget exact, brancher le tokenizer du modèle cible.
- La natation en bassin n'est pas traitée spécifiquement (pas de longueurs, pas de SWOLF).
- La détection de capteur de FC est une heuristique : sa confiance est plafonnée à 0,9 sans métadonnée constructeur, et elle est moins fiable sur des flux Strava, lissés côté serveur.
- La température des fichiers Garmin vient d'un capteur porté au poignet : elle surestime de 3 à 8 °C et n'est **pas** la température de l'air. Le bundle le signale au modèle.
- Les projections marathon sont les moins fiables du lot : le modèle de vitesse critique ignore la déplétion glycogénique, et un chrono d'entraînement suppose une préparation spécifique menée à terme.
- La détection d'intervalles s'abstient quand les deux centroïdes sont trop proches : sur une sortie à allure constante, elle ne renvoie rien plutôt que d'inventer des séries.

## Structure du dépôt

```
src/          bibliothèque : parsing, analyses, compaction
test/         68 assertions, sans dépendance externe
worker/       Worker de bord : redirection de langue, en-têtes de sécurité
site/         architecture, plan de contenu, SEO/GEO, maquettes
  seo/        robots.txt, llms.txt, générateurs JSON-LD
  pages/      gabarit de page entièrement balisé
DEPLOIEMENT.md  du dépôt au domaine : tester, déployer, vérifier
```

## Déploiement

Voir [DEPLOIEMENT.md](DEPLOIEMENT.md). En résumé : `npm test`, puis `wrangler deploy`
sur Cloudflare Workers.

## Licence

MIT.
