# Plan de contenu multilingue

## Principe directeur

Le site vise deux publics qui ne se comportent pas pareil :

- **Les humains** arrivent par une requête transactionnelle (« convertir tcx en csv ») et veulent l'outil en trois secondes.
- **Les moteurs génératifs** ne citent pas des outils, ils citent des **faits vérifiables**. Ils reprennent un tableau comparatif, une définition, un chiffre mesuré.

D'où la structure : un noyau transactionnel mince et rapide, et un socle de référence dense qui produit les citations.

## Langues

Démarre à **trois : français, anglais, espagnol**. L'anglais porte le volume mondial, le français et l'espagnol sont des marchés de course à pied importants et peu servis sur ce créneau précis. L'allemand et l'italien en phase 3, seulement si les trois premières tiennent.

## Inventaire des pages

### Niveau 0 — l'application

| | |
|---|---|
| fr | `/fr/` |
| en | `/en/` |
| es | `/es/` |

H1 orienté bénéfice, pas fonctionnalité. Pas « Convertisseur TCX » mais « Rendez votre séance analysable par une IA ». La page contient l'outil, un exemple de sortie en dur, et la FAQ.

### Niveau 1 — pages de conversion (intention transactionnelle)

| Sujet | fr | en | es |
|---|---|---|---|
| TCX → CSV | `/fr/convertir-tcx-en-csv` | `/en/convert-tcx-to-csv` | `/es/convertir-tcx-a-csv` |
| GPX → CSV | `/fr/convertir-gpx-en-csv` | `/en/convert-gpx-to-csv` | `/es/convertir-gpx-a-csv` |
| FIT → CSV | `/fr/convertir-fit-en-csv` | `/en/convert-fit-to-csv` | `/es/convertir-fit-a-csv` |

**Le piège à éviter.** Trois formats × trois langues = neuf pages qui se ressemblent. Si elles ne diffèrent que par trois lettres, c'est du contenu mince et Google les fusionnera ou les ignorera. Chacune doit porter ce que les autres n'ont pas :

- **TCX** : le format le plus verbeux, celui qui pose vraiment le problème de taille. Quelles extensions Garmin existent, ce qui est perdu.
- **GPX** : aucune distance cumulée, aucun tour — tout est recalculé. Les trois dialectes d'extensions concurrents. Quand un GPX n'a même pas d'horodatage.
- **FIT** : binaire, format natif des montres, déjà compact. Les champs développeur (Stryd, Running Dynamics). Pourquoi partir du FIT donne un meilleur résultat que du TCX exporté depuis le même fichier.

### Niveau 2 — pages d'usage (le cœur de la conversion)

| Sujet | fr |
|---|---|
| Analyser une séance avec ChatGPT | `/fr/analyser-course-chatgpt` |
| Analyser une séance avec Gemini | `/fr/analyser-course-gemini` |
| Analyser une séance avec Claude | `/fr/analyser-course-claude` |
| Bibliothèque de prompts d'analyse | `/fr/prompts-analyse-course` |

La bibliothèque de prompts est le meilleur actif de partage du site : des prompts prêts à coller, calés sur le format de sortie du bundle. « Analyse ma dérive cardiaque », « compare cette séance à la précédente », « propose la séance de la semaine prochaine ». Elle génère des liens entrants naturels et donne une raison de revenir.

### Niveau 3 — socle de référence (le moteur GEO)

| Sujet | fr | Rôle |
|---|---|---|
| Qu'est-ce qu'un fichier TCX | `/fr/format-tcx` | Définition d'entité |
| TCX vs GPX vs FIT | `/fr/tcx-gpx-fit-comparaison` | **Page pivot** |
| Pourquoi un fichier GPS est trop gros pour une IA | `/fr/fichier-gps-trop-gros-ia` | **Page pilier** |
| Référence des colonnes CSV | `/fr/reference-colonnes-csv` | `DefinedTermSet` |
| Glossaire : GAP, découplage, NP, TSS | `/fr/glossaire-metriques` | Définitions citables |

Ces cinq pages ne convertissent presque personne et portent l'essentiel de la visibilité dans les moteurs génératifs.

**La page pivot** est un vrai tableau comparatif : taille moyenne, verbosité, présence des tours, capteurs supportés, quelles montres l'exportent, ce qui est perdu à la conversion. Les moteurs extraient les tableaux et les citent avec la source.

**La page pilier** est ton unique avantage éditorial durable, parce que tu es le seul à disposer des mesures. Publie un **banc d'essai reproductible** :

| Sortie | Format | Taille | Tokens estimés | Après compaction |
|---|---|---|---|---|
| 1 h course @ 1 Hz | TCX | 1,7 Mo | ~533 000 | ~5 800 |
| 1 h course @ 1 Hz | GPX | … | … | … |
| 1 h course @ 1 Hz | FIT | … | … | … |

Les chiffres ci-dessus sortent du banc d'essai fourni avec le module (`test/run.ts`). C'est de la donnée originale que personne d'autre ne publie : c'est exactement ce qu'un moteur génératif cite, et ce qui te positionne comme la source sur le sujet. Mets à jour le tableau et affiche la date de dernière mesure.

### Niveau 4 — guides d'export par marque

Un par marque, en trois langues. Fort volume, intention claire, concurrence faible.

`/fr/exporter-fichier-garmin-connect`, `strava`, `coros`, `polar-flow`, `suunto`, `wahoo`, `apple-watch`, `zepp-amazfit`, `decathlon-coros`.

Ces pages doivent contenir le chemin **exact** de l'interface, à jour, avec la date de vérification. Le contenu périmé est le principal motif de perte de citation.

Attention aux marques : décris la procédure d'export, n'utilise pas les logos et ne laisse pas entendre un partenariat. Vérifie aussi les conditions d'utilisation de l'API Strava avant toute intégration directe — elles sont restrictives sur les données dérivées.

### Niveau 5 — confiance

`/fr/confidentialite` (page substantielle, pas un texte juridique recopié : explique techniquement pourquoi rien ne part), `/fr/a-propos` (le « brand hub » : qui, pourquoi, comment c'est fait, contact), `/fr/journal-des-modifications`.

## Rédaction : les règles qui changent vraiment quelque chose

**Réponse d'abord.** Chaque section commence par la réponse directe, le contexte vient après. Les moteurs extraient des passages courts et autoportants : un paragraphe qui commence par « Il est important de comprendre que… » n'est jamais extrait.

**H2 formulés comme des questions réelles.** « Pourquoi Gemini refuse-t-il mon fichier TCX ? » plutôt que « Limites de taille TCX ». C'est la formulation des prompts, pas celle des mots-clés.

**Tableaux, listes, définitions.** Le contenu doit être découpable en morceaux autonomes.

**Chiffres et sources.** Une affirmation datée et chiffrée est reprise ; une affirmation vague ne l'est pas. Cite tes sources (Minetti 2002 pour le GAP, Coggan pour la NP) — la citation d'autorité augmente la probabilité d'être cité à son tour.

**Fraîcheur visible.** `dateModified` en JSON-LD et une date affichée. Repasse sur les guides d'export tous les trimestres.

## Ordre de bataille

**Phase 1 — semaines 1 à 4.** L'app en trois langues, les trois pages de conversion, confidentialité, à propos. `robots.txt`, `llms.txt`, sitemaps, hreflang, schémas. Objectif : un produit qui marche et est indexable.

**Phase 2 — semaines 5 à 10.** La page pilier avec le banc d'essai, la page pivot comparative, le glossaire, la référence des colonnes. Objectif : exister dans les réponses génératives.

**Phase 3 — semaines 11 et suivantes.** Les guides d'export marque par marque, la bibliothèque de prompts, les pages d'usage par modèle. Objectif : volume.

Ne lance pas les niveaux 4 et 5 avant que le socle de référence existe : sans lui, les pages de marque sont orphelines et n'ont aucune autorité à recevoir.

## Maillage interne

Structure en étoile. Chaque page de conversion et chaque guide d'export pointe vers la page pivot comparative et vers l'app. La page pilier pointe vers tout. Aucune page ne doit être à plus de deux clics de l'app.
