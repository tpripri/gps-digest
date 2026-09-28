/**
 * Textes des pages du site (accueil, confidentialité) et moteur de rendu.
 *
 * Séparé du catalogue des analyses (i18n.ts) pour une raison de poids : ce
 * module ne sert qu'au build et au serveur de développement. Il n'est jamais
 * envoyé au navigateur. Les quelques textes dont le script de la page a besoin
 * au moment de l'analyse (clés « js.* ») sont injectés dans la page, pour la
 * seule langue concernée.
 *
 * Les pages sont des gabarits (public/*.html). Syntaxe des emplacements :
 *
 *   {{clé}}        texte, HTML autorisé (le catalogue est une source sûre)
 *   {{attr:clé}}   valeur d'attribut, échappée
 *   {{json:clé}}   chaîne JSON complète, pour le JSON-LD
 *
 * et des emplacements calculés : {{locale}}, {{htmlLang}}, {{ogLocale}},
 * {{alternates}}, {{ogAlternates}}, {{langNav}}, {{pageJson}}. Un texte du
 * catalogue peut lui-même contenir {{locale}} (lien vers la page de
 * confidentialité dans la bonne langue).
 *
 * Le français fait référence, comme pour les analyses. Un emplacement inconnu
 * ou une clé absente de tous les catalogues fait échouer le rendu : une page
 * publiée avec « {{home.lede}} » en clair serait pire qu'un build cassé.
 */

import { LOCALES, type Locale } from "./i18n.ts";
import { en } from "./page-en.ts";
import { es } from "./page-es.ts";
import { pt } from "./page-pt.ts";
import { de } from "./page-de.ts";
import { zh } from "./page-zh.ts";
import { ja } from "./page-ja.ts";

/** Langue affichée par défaut aux visiteurs dont la langue n'est pas publiée. */
export const X_DEFAULT: Locale = "en";

export const LOCALE_META: Record<
  Locale,
  { name: string; htmlLang: string; hreflang: string; og: string; number: string }
> = {
  fr: { name: "Français", htmlLang: "fr", hreflang: "fr", og: "fr_FR", number: "fr-FR" },
  en: { name: "English", htmlLang: "en", hreflang: "en", og: "en_US", number: "en-US" },
  es: { name: "Español", htmlLang: "es", hreflang: "es", og: "es_ES", number: "es-ES" },
  pt: { name: "Português", htmlLang: "pt-BR", hreflang: "pt", og: "pt_BR", number: "pt-BR" },
  de: { name: "Deutsch", htmlLang: "de", hreflang: "de", og: "de_DE", number: "de-DE" },
  zh: { name: "中文", htmlLang: "zh-Hans", hreflang: "zh-Hans", og: "zh_CN", number: "zh-CN" },
  ja: { name: "日本語", htmlLang: "ja", hreflang: "ja", og: "ja_JP", number: "ja-JP" },
};

// ─────────────────────────────────────────────────────────────── français

const fr = {
  "common.langs": "Langue",
  "common.footerNav": "Pied de page",
  "common.privacy": "Confidentialité",
  "common.source": "Code source",

  // ── accueil : en-tête et métadonnées ───────────────────────────────────
  "home.title": "Convertir un fichier TCX, GPX ou FIT en CSV pour ChatGPT ou Gemini — gps-digest",
  "home.description":
    "Outil gratuit qui transforme vos fichiers de montre GPS en dossier d'entraînement lisible par une IA. Détecte la ceinture cardio, calcule la dérive cardiaque, vérifie le respect des blocs et projette vos chronos. Tout est calculé dans votre navigateur : aucun fichier n'est envoyé.",
  "home.h1": "Faites analyser vos séances de course par une IA",
  "home.og.description":
    "Vos fichiers de montre sont trop volumineux pour une IA. Cet outil en fait un dossier structuré qu'elle peut vraiment analyser.",
  "home.og.imageAlt": "Un fichier de montre GPS transformé en dossier d'entraînement structuré.",

  "home.ld.description":
    "Transforme les fichiers de montres GPS (TCX, GPX, FIT) en dossier d'entraînement structuré, analysable par un modèle de langage.",
  "home.ld.feature1": "Conversion TCX, GPX et FIT vers CSV structuré",
  "home.ld.feature2": "Traitement intégral dans le navigateur, aucun fichier envoyé",
  "home.ld.feature3": "Détection du capteur de fréquence cardiaque (ceinture ou poignet)",
  "home.ld.feature4": "Dérive cardiaque avec contrôle de validité",
  "home.ld.feature5": "Analyse du respect des blocs d'entraînement",
  "home.ld.feature6": "Projections de chrono sur 5 km, 10 km, semi et marathon",
  "home.ld.feature7": "Nombre de fichiers illimité",
  "home.ld.howto": "Faire analyser ses séances de course par une IA",
  "home.ld.step1.name": "Déposer ses fichiers",
  "home.ld.step1.text":
    "Glissez vos fichiers TCX, GPX ou FIT exportés de votre montre. Le nombre n'est pas limité.",
  "home.ld.step2.name": "Renseigner ses repères",
  "home.ld.step2.text":
    "Indiquez votre fréquence cardiaque maximale mesurée et un chrono de course récent.",
  "home.ld.step3.name": "Lire les avertissements",
  "home.ld.step3.text":
    "L'outil signale les changements de capteur cardiaque et les séances dont la fréquence cardiaque n'est pas fiable.",
  "home.ld.step4.name": "Copier le dossier dans l'IA",
  "home.ld.step4.text":
    "Copiez le dossier généré et collez-le dans ChatGPT, Gemini ou Claude avec votre question.",
  "home.ld.faq1.q": "Pourquoi mon fichier TCX est-il trop gros pour une IA ?",
  "home.ld.faq1.a":
    "Un TCX d'une heure enregistré à 1 Hz pèse environ 1,7 Mo, dont près de 90 % de balises XML, soit à peu près 533 000 tokens. Même quand ce volume tient dans la fenêtre de contexte, le modèle raisonne mal : on lui demande une analyse d'entraînement à partir de milliers de lignes de coordonnées brutes.",
  "home.ld.faq2.q": "Mes fichiers GPS sont-ils envoyés sur un serveur ?",
  "home.ld.faq2.a":
    "Non. Tout le calcul s'exécute dans votre navigateur. Aucun fichier ne transite par un serveur, ce que vous pouvez vérifier dans l'onglet Réseau. Une trace GPS contient l'adresse du domicile au mètre près : l'outil rogne par défaut le départ et l'arrivée.",
  "home.ld.faq3.q": "Comment savoir si une séance vient d'une ceinture ou du capteur du poignet ?",
  "home.ld.faq3.a":
    "Le fichier ne le dit presque jamais. L'outil le déduit de la signature du signal, dont le marqueur le plus caractéristique est le verrouillage sur la cadence : le capteur optique confond le rythme des foulées avec les pulsations et affiche par exemple 172 bpm au lieu de 140. Une ceinture, qui mesure un signal électrique, ne peut pas produire cette erreur.",
  "home.ld.faq4.q": "Peut-on comparer une fréquence cardiaque au poignet et à la ceinture ?",
  "home.ld.faq4.a":
    "Non. Les deux technologies divergent nettement à l'effort, et le capteur optique se dégrade quand l'intensité varie. Un changement de capteur au milieu d'une période fausse silencieusement zones, dérives et tendances. L'outil détecte ce changement, le date et analyse les deux périodes séparément.",
  "home.ld.faq5.q": "Quelle est la fiabilité d'une projection marathon ?",
  "home.ld.faq5.a":
    "Faible. Une étude sur 2 303 coureurs amateurs a montré que la formule de Riegel est bien calibrée jusqu'au semi-marathon mais donne des prévisions marathon au moins dix minutes trop rapides pour la moitié des coureurs. Un modèle fondé sur un ou deux résultats de course réels divise l'erreur par environ deux.",
  "home.ld.faq6.q": "La température affichée par ma montre est-elle celle de l'air ?",
  "home.ld.faq6.a":
    "Non. Le capteur est porté au poignet et chauffé par le corps : il surestime généralement de 3 à 8 °C. L'outil affiche la valeur mais l'accompagne toujours de cet avertissement, y compris dans le dossier transmis à l'IA.",

  // ── accueil : corps ────────────────────────────────────────────────────
  "home.lede":
    "Vos fichiers de montre sont trop volumineux pour ChatGPT, Gemini ou Claude. Cet outil en fait un dossier d'entraînement structuré — allures, tours, zones, répétitions, dérive cardiaque — que l'IA peut vraiment analyser.",
  "home.promise":
    "<strong>Vos fichiers ne quittent pas votre navigateur.</strong> Tout le calcul se fait sur votre appareil ; vous pouvez le vérifier dans l'onglet Réseau. Une trace GPS contient votre adresse au mètre près : le départ et l'arrivée sont rognés par défaut. <a href=\"/{{locale}}/confidentialite.html\">Ce qui sort, et ce qui n'en sort jamais</a>.",
  "home.step1.title": "Déposez vos fichiers",
  "home.step1.text": "Autant que vous voulez, en TCX, GPX ou FIT, exportés de votre montre ou de Strava.",
  "home.step2.title": "Renseignez vos repères",
  "home.step2.text": "FC maximale et dernier chrono. Sans eux, zones et projections restent approximatives.",
  "home.step3.title": "Lisez les avertissements",
  "home.step3.text": "Changement de capteur, FC peu fiable : ils conditionnent la validité du reste.",
  "home.step4.title": "Récupérez le dossier",
  "home.step4.text": "Un fichier texte complet et annoté, à glisser dans ChatGPT, Gemini ou Claude.",

  "home.why.title": "Pourquoi passer par cet outil ?",
  "home.why.p1":
    "Un fichier TCX d'une heure enregistré à 1 Hz pèse environ 1,7 Mo, dont près de 90 % de balises XML — soit à peu près <strong>533 000 tokens</strong>. Même quand ce volume tient dans la fenêtre de contexte, le modèle raisonne mal : on lui demande une analyse d'entraînement à partir de milliers de lignes de coordonnées brutes.",
  "home.why.p2":
    "Le dossier produit ici fait quelques dizaines de milliers de tokens et contient des objets qu'un modèle sait interpréter : splits au kilomètre, tours, temps par zone, répétitions une à une, meilleurs efforts, projections. <strong>L'analyse est meilleure qu'avec le fichier complet</strong>, pas seulement moins coûteuse.",
  "home.why.tableTitle": "Ce que l'outil calcule tout seul",
  "home.why.colAnalysis": "Analyse",
  "home.why.colAnswer": "Ce qu'elle répond",
  "home.why.sensor": "Source de la FC",
  "home.why.sensorText":
    "Ceinture ou capteur du poignet ? Le fichier ne le dit presque jamais. L'outil le déduit du signal, en particulier du verrouillage sur la cadence — quand la montre confond les foulées avec les pulsations.",
  "home.why.drift": "Dérive cardiaque",
  "home.why.driftText":
    "Votre rendement se dégrade-t-il en seconde moitié d'effort ? Au-delà de 5 %, l'endurance de base est en cause. L'outil refuse de calculer une dérive sur du fractionné, où le chiffre n'aurait aucun sens.",
  "home.why.blocks": "Respect des blocs",
  "home.why.blocksText":
    "Vos répétitions sont-elles régulières ? L'allure se dégrade-t-elle ? La FC monte-t-elle à allure tenue — signe de fatigue avant que les jambes ne lâchent ?",
  "home.why.projections": "Projections de chrono",
  "home.why.projectionsText":
    "5 km, 10 km, semi, marathon, avec fourchette et niveau de fiabilité. Un chrono de course pèse plus qu'un effort d'entraînement, et son poids décroît avec l'ancienneté.",
  "home.why.hardware": "Changement de matériel",
  "home.why.hardwareText":
    "Sur plusieurs séances, l'outil détecte et date un changement de capteur cardiaque — qui invaliderait silencieusement toute comparaison de FC.",

  "home.set.title": "1. Vos repères",
  "home.set.intro":
    "Facultatif, mais sans ces valeurs les zones sont estimées sur la FC maximale observée dans les fichiers, ce qui est approximatif.",
  "home.set.fcmax": "FC maximale",
  "home.set.fcmaxHint": "Mesurée, pas 220 moins l'âge",
  "home.set.fcmaxPlaceholder": "ex. 185",
  "home.set.threshold": "Allure seuil",
  "home.set.thresholdHint": "Tenue environ 1 h",
  "home.set.refDist": "Chrono de référence",
  "home.set.refDistHint": "Distance",
  "home.set.refNone": "Aucun",
  "home.set.ref5k": "5 km",
  "home.set.ref10k": "10 km",
  "home.set.refHalf": "Semi-marathon",
  "home.set.refMarathon": "Marathon",
  "home.set.refTime": "Temps",
  "home.set.refTimeHint": "h:mm:ss",
  "home.set.refDate": "Date du chrono",
  "home.set.refDateHint": "Pondère l'ancienneté",
  "home.set.privacy": "Rognage vie privée",
  "home.set.privacyHint": "Mètres au départ et à l'arrivée",
  "home.set.weather": "Température de l'air",
  "home.set.weatherOn": "Récupérer la météo réelle",
  "home.set.weatherOff": "Ne rien envoyer",
  "home.set.weatherHint":
    "Envoie le <strong>milieu</strong> du parcours arrondi à ~1 km et la date à Open-Meteo. Jamais votre départ, jamais vos données.",

  "home.files.title": "2. Vos fichiers",
  "home.files.drop": "Déposez vos fichiers ici",
  "home.files.formats": "TCX, GPX ou FIT — autant que vous voulez, une saison entière si besoin",
  "home.files.fit":
    "Le FIT est le format natif de votre montre : c'est le seul à porter les longueurs de bassin et le capteur cardiaque réellement appairé.",
  "home.files.pick": "Choisir des fichiers",

  "home.export.title": "3. Votre dossier, prêt à analyser",
  "home.export.intro":
    "Les fenêtres de contexte actuelles absorbent largement 100 000 tokens. Le réglage par défaut privilégie donc le détail. Descendez d'un cran si votre modèle est plus limité, ou si vous chargez beaucoup de séances.",
  "home.export.resolution": "Finesse du relevé",
  "home.export.res5s": "Un point toutes les 5 s — maximum",
  "home.export.res10s": "Un point toutes les 10 s — recommandé",
  "home.export.res30s": "Un point toutes les 30 s — allégé",
  "home.export.res100m": "Un point tous les 100 m",
  "home.export.res10m": "Un point tous les 10 m — très détaillé",
  "home.export.resNone": "Tableaux seuls, sans relevé continu",
  "home.export.resSummary": "Synthèse courte, sans détail par séance",
  "home.export.coords": "Coordonnées GPS",
  "home.export.coordsDrop": "Retirer — recommandé",
  "home.export.coordsKeep": "Conserver",
  "home.export.coordsHint": "Profil, allures et FC sont conservés dans tous les cas.",
  "home.export.questions": "Questions à poser à votre IA",
  "home.export.q1":
    "Analyse ma dérive cardiaque en tenant compte de la température, et dis-moi si mon endurance de base est un facteur limitant.",
  "home.export.q2": "Mes blocs sont-ils respectés ? Que corriger sur la prochaine séance ?",
  "home.export.q3": "Compare les périodes de capteur séparément et dis-moi ce qui a changé.",
  "home.export.q4": "À partir de cette charge, propose ma semaine d'entraînement.",
  "home.export.q5": "Ma répartition d'intensités est-elle cohérente avec mon objectif ?",
  "home.export.preview": "Voir le dossier généré",

  "home.results.title": "4. Le détail, si vous voulez creuser",
  "home.results.overview": "Vue d'ensemble",
  "home.results.colFile": "Fichier",
  "home.results.colDate": "Date",
  "home.results.colDist": "Dist.",
  "home.results.colMoving": "En mouvement",
  "home.results.colElapsed": "Écoulé",
  "home.results.colSpeed": "Allure / vitesse",
  "home.results.colHr": "FC moy",
  "home.results.colSensor": "Capteur",
  "home.results.colDrift": "Dérive",
  "home.results.colBlocks": "Blocs",
  "home.results.detail": "Détail par séance",
  "home.results.detailIntro":
    "Dépliez une séance pour voir les signaux derrière chaque verdict. Utile en particulier pour juger la détection du capteur : vous seul savez quelles séances ont été faites à la ceinture.",
  "home.results.load": "Charge d'entraînement",
  "home.results.progression": "Progression aérobie",
  "home.results.progressionIntro":
    "FC à allure identique dans le temps : le seul indicateur de forme qui ne dépende ni du parcours ni de l'envie du jour. Les capteurs sont traités séparément.",
  "home.results.projections": "Projections",

  "home.faq.title": "Questions fréquentes",
  "home.faq.q1": "Pourquoi mon fichier TCX est-il trop gros pour Gemini ou ChatGPT ?",
  "home.faq.a1":
    "Un TCX d'une heure à 1 Hz pèse environ 1,7 Mo, dont près de 90 % de balises XML, soit à peu près 533 000 tokens. Même quand ce volume tient dans la fenêtre de contexte, le modèle raisonne mal sur des milliers de lignes de coordonnées brutes.",
  "home.faq.q2": "Mes fichiers sont-ils envoyés sur un serveur ?",
  "home.faq.a2":
    "Non. Tout le calcul s'exécute dans votre navigateur, et vous pouvez le vérifier dans l'onglet Réseau. Une trace GPS contient l'adresse du domicile au mètre près dans ses premiers et derniers points : l'outil les rogne par défaut.",
  "home.faq.q3": "Comment l'outil devine-t-il si j'avais une ceinture ?",
  "home.faq.a3":
    "Le marqueur le plus caractéristique est le verrouillage sur la cadence : un capteur optique confond le rythme des foulées avec les pulsations et affiche par exemple 172 bpm au lieu de 140. Une ceinture, qui mesure un signal électrique, ne peut pas produire cette erreur. S'y ajoutent la longueur des plateaux de valeurs identiques, la granularité battement à battement et la latence de réponse aux changements d'allure. C'est une heuristique : sa confiance est plafonnée, et affichée.",
  "home.faq.q4": "Pourquoi la dérive n'est-elle pas calculée sur certaines séances ?",
  "home.faq.a4":
    "Parce qu'elle n'y voudrait rien dire. La dérive compare le rendement entre les deux moitiés d'un effort <em>continu</em>. Sur du fractionné, le rapport vitesse/FC oscille entre répétitions et récupérations : le chiffre obtenu serait un artefact. L'outil préfère annoncer qu'il ne mesure pas plutôt que produire un nombre trompeur.",
  "home.faq.q5": "La température affichée est-elle celle de l'air ?",
  "home.faq.a5":
    "Non. Le capteur est au poignet, chauffé par le corps : il surestime généralement de 3 à 8 °C. La valeur est affichée mais toujours accompagnée de cet avertissement, y compris dans le dossier transmis à l'IA.",
  "home.faq.q6": "Quelle est la fiabilité d'une projection marathon ?",
  "home.faq.a6":
    "Faible, et il faut le dire. Une étude sur 2 303 coureurs amateurs a montré que la formule de Riegel est bien calibrée jusqu'au semi mais donne des prévisions marathon au moins dix minutes trop rapides pour la moitié des coureurs. Un modèle fondé sur des résultats de course réels divise l'erreur par environ deux.",
  "home.faq.q7": "Quels formats sont acceptés ?",
  "home.faq.a7":
    "TCX, GPX et FIT. <strong>Privilégiez le FIT</strong> : c'est le format natif de la plupart des montres Garmin, Coros, Wahoo et Suunto, et le seul à porter les longueurs de bassin une par une ainsi que la liste du matériel appairé — ce qui permet de savoir avec certitude, et non par estimation, si vous portiez une ceinture cardiaque. L'export TCX de Garmin Connect écrase les longueurs d'une séance de natation en une seule ligne.",
  "home.faq.q8": "L'allure affichée ne correspond pas à celle de Garmin Connect",
  "home.faq.a8":
    "C'est une différence de convention, pas une erreur. L'allure est calculée ici sur le <strong>temps en mouvement</strong>, comme le fait Strava : les arrêts aux feux et les pauses sont exclus. Garmin Connect divise par la durée totale et affiche donc une allure plus lente. Sur une sortie de 16 km en ville, l'écart atteint facilement quinze secondes au kilomètre. Les deux durées sont affichées côte à côte pour que la différence soit lisible, et le dossier transmis à l'IA précise la convention employée — sans quoi un modèle comparerait des chiffres qui ne se comparent pas.",
  "home.faq.q9": "Le dénivelé ne correspond pas non plus",
  "home.faq.a9":
    "Si vous déposez un fichier FIT, l'outil reprend le dénivelé mesuré par l'altimètre barométrique de votre montre. En TCX ou en GPX, cette information n'existe pas : elle est recalculée depuis l'altitude GPS, ce qui la sous-estime généralement de 30 à 50 %. Sur une sortie réelle de 16 km, 61 mètres calculés contre 140 mesurés. C'est une des raisons de préférer le FIT.",
  "home.faq.q10": "Le sport détecté est faux, pourquoi ?",
  "home.faq.a10":
    "L'outil ne fait pas confiance au libellé du fichier, parce qu'il est souvent inexact : une séance de renforcement entrecoupée de portions courues est étiquetée « course », et une séance en bassin est étiquetée « autre ». La classification se fait donc sur la forme des données. Chaque séance reçoit un niveau : analyse complète pour la course et le vélo, traitement dédié pour la natation, et comptage en charge uniquement pour tout le reste — une séance de renforcement pèse sur la récupération même si son allure ne veut rien dire.",

  "home.refs.title": "Sur quoi reposent ces calculs",
  "home.refs.intro":
    "Chaque métrique s'appuie sur un travail publié. Voici lesquels, et ce que chacun ne dit pas.",
  "home.refs.minetti":
    "<strong>Allure ajustée à la pente.</strong> Minetti AE, et al. <em>Energy cost of walking and running at extreme uphill and downhill slopes.</em> J Appl Physiol. 2002;93(3):1039–46. <a href=\"https://doi.org/10.1152/japplphysiol.01177.2001\" rel=\"nofollow\">doi</a> · <a href=\"https://pubmed.ncbi.nlm.nih.gov/12183501/\" rel=\"nofollow\">PubMed</a>. Établi sur tapis roulant : ne tient compte ni du terrain technique ni de la casse musculaire en descente prolongée.",
  "home.refs.sensors":
    "<strong>Écart entre capteurs de FC.</strong> Gillinov S, et al. Med Sci Sports Exerc. 2017;49(8):1697–703. · Pasadyn SR, et al. Cardiovasc Diagn Ther. 2019;9(4):379–85. <a href=\"https://doi.org/10.21037/cdt.2019.06.05\" rel=\"nofollow\">doi</a>. Ces travaux mesurent l'erreur du capteur optique ; ils ne proposent pas de méthode pour l'identifier à partir du seul fichier. Notre détection en est dérivée : ce n'est pas un protocole validé.",
  "home.refs.riegel":
    "<strong>Projection de chrono.</strong> Riegel PS. <em>Athletic records and human endurance.</em> American Scientist. 1981;69(3):285–90. Calibré sur des records du monde, sur route plate.",
  "home.refs.vickers":
    "<strong>Correction pour coureurs amateurs.</strong> Vickers AJ, Vertosick EA. <em>An empirical study of race times in recreational endurance runners.</em> BMC Sports Sci Med Rehabil. 2016;8:26. <a href=\"https://doi.org/10.1186/s13102-016-0052-y\" rel=\"nofollow\">doi</a>. Raison directe pour laquelle un chrono de course pèse davantage qu'un effort d'entraînement.",
  "home.refs.cs":
    "<strong>Vitesse critique.</strong> Jones AM, et al. <em>Critical power: implications for determination of V̇O₂max and exercise tolerance.</em> Med Sci Sports Exerc. 2010;42(10):1876–90. <a href=\"https://doi.org/10.1249/MSS.0b013e3181d9cf7f\" rel=\"nofollow\">doi</a>. Le modèle suppose la vitesse critique tenable indéfiniment, ce qui est faux au-delà d'environ 90 minutes.",
  "home.refs.coggan":
    "<strong>Puissance normalisée, TSS, dérive Pa:Hr.</strong> Méthodologies d'entraînement (Coggan, Friel) largement adoptées, mais pas des articles évalués par les pairs. La distinction compte.",
  "home.refs.noteTitle": "Ce que ces références ne garantissent pas",
  "home.refs.note":
    "Elles fondent les formules, pas les conclusions. Un chiffre calculé correctement à partir d'un capteur défaillant reste faux. En cas de douleur, ou avant de modifier un plan d'entraînement, l'avis d'un professionnel prime sur cet outil comme sur l'IA à qui vous transmettrez ses résultats.",
  "home.footer": "Licence MIT. Aucun compte, aucune publicité, aucun traceur.",

  // ── accueil : textes du script (injectés dans la page) ─────────────────
  "js.libError":
    "<strong>La bibliothèque n'a pas pu être chargée.</strong>Lancez la page via <code>npm run dev</code> : l'ouvrir directement depuis l'explorateur de fichiers ne fonctionne pas.",
  "js.vigilance": "{n} point(s) de vigilance inclus dans le dossier",
  "js.indicShort": "indic.",
  "js.sensorSummary": "{file} — {label} (confiance {confidence})",
  "js.noSignal": "Aucun signal exploitable.",
  "js.signal": "{name} : <b>{value}</b> — {note}",
  "js.lock": "Verrouillage cadence : <b>{pct}</b>, <b>{n}</b> plage(s) écartée(s) du calcul de dérive.",
  "js.sets": "Séries détectées : <b>{sets}</b>",
  "js.weather": "Air <b>{temp} °C</b>{feels}{humidity}{wind} — Open-Meteo",
  "js.weatherFeels": " (ressenti {temp})",
  "js.weatherHumidity": ", {pct} HR",
  "js.weatherWind": ", vent {kmh} km/h",
  "js.drift":
    "Dérive <b>{pct}</b> {badge} sur {min} min à {pace} ({coverage} de la séance) — {interpretation}",
  "js.driftNone": "Dérive non calculée : {reason}",
  "js.hrr": "Récupération cardiaque : <b>{bpm} bpm</b> en 60 s{erosion}",
  "js.hrrErosion": ", érosion {bpm} bpm/répétition",
  "js.adherence": "<b>{set}</b> — {grade} : {verdicts}",
  "js.progPace": "Allure",
  "js.progSensor": "Capteur",
  "js.progPoints": "Points",
  "js.progTrend": "Tendance",
  "js.progReading": "Lecture",
  "js.perWeek": "{value} bpm/sem",
  "js.progNone":
    "Pas encore de suivi possible : il faut au moins trois séances de course tenant une allure comparable, avec le même capteur de FC.",
  "js.trendTitle": "FC à {pace} — {source}",
  "js.projDistance": "Distance",
  "js.projEstimate": "Estimation",
  "js.projRange": "Fourchette",
  "js.projReliability": "Fiabilité",
  "js.projMethod": "Méthode",
  "js.cs": "Vitesse critique <b>{pace}/km</b>, D' <b>{d} m</b>, R² <b>{r2}</b>",
  "js.projNone": "Aucune projection : il faut au moins une séance de course à pied.",
  "js.redOriginal": "Vos fichiers d'origine",
  "js.redGenerated": "Dossier généré",
  "js.redReduction": "Réduction",
  "js.redCompat": "Compatibilité",
  "js.sizeMb": "{value} Mo — ~{tokens} tokens",
  "js.sizeKb": "{value} Ko — ~{tokens} tokens",
  "js.compatTooBig": "⚠ trop volumineux pour ChatGPT — réduisez la finesse",
  "js.compatGemini": "⚠ Gemini uniquement",
  "js.compatOk": "✓ ChatGPT, Claude et Gemini",
  "js.truncated": "… aperçu tronqué — la copie contient tout.",
  "js.download": "Télécharger le dossier (.txt)",
  "js.copy": "Copier dans le presse-papiers",
  "js.copied": "Copié",
  "js.filename": "dossier-entrainement.txt",

  // ── confidentialité ────────────────────────────────────────────────────
  "privacy.title": "Confidentialité — ce qui sort de votre navigateur, et ce qui n'en sort jamais",
  "privacy.description":
    "Vos fichiers GPS ne sont jamais envoyés sur un serveur : tout le calcul se fait dans votre navigateur. Seule exception, la météo, qui transmet le milieu du parcours arrondi à environ un kilomètre. Détail technique complet et vérifiable.",
  "privacy.ld.q1": "Les fichiers GPS sont-ils envoyés sur un serveur ?",
  "privacy.ld.a1":
    "Non. Le parsing et l'analyse s'exécutent dans le navigateur, en JavaScript, sur l'appareil de l'utilisateur. Aucun fichier n'est transmis, ce qui est vérifiable dans l'onglet Réseau des outils de développement : aucune requête ne contient le contenu d'un fichier.",
  "privacy.ld.q2": "Qu'est-ce qui est transmis à un tiers ?",
  "privacy.ld.a2":
    "Uniquement la requête météo, quand elle est activée : le point milieu du parcours arrondi à deux décimales (environ 1,1 km de résolution) et la date de la séance, envoyés à Open-Meteo. Jamais le point de départ, qui correspond généralement au domicile, et jamais de donnée physiologique ni d'identifiant.",
  "privacy.ld.q3": "Pourquoi l'outil rogne-t-il le début et la fin de la trace ?",
  "privacy.ld.a3":
    "Parce que les premiers et derniers points d'une trace GPS révèlent l'adresse du domicile au mètre près. Ce rognage est actif par défaut sur 250 mètres et s'applique avant tout export, y compris celui destiné à une intelligence artificielle.",
  "privacy.back": "← Retour à l'outil",
  "privacy.h1": "Confidentialité",
  "privacy.lede":
    "Une trace GPS contient l'adresse de votre domicile au mètre près. Cette page dit précisément ce qui reste sur votre appareil, ce qui en sort, et comment le vérifier vous-même.",
  "privacy.principle.title": "Le principe",
  "privacy.principle.p1":
    "<strong>Vos fichiers ne sont jamais transmis.</strong> Le décodage et l'analyse s'exécutent en JavaScript, dans votre navigateur, sur votre appareil. Il n'existe aucun serveur qui les reçoive — ce n'est pas une politique, c'est une absence d'infrastructure.",
  "privacy.principle.p2":
    "Concrètement : vous pouvez couper votre connexion internet après le chargement de la page, déposer vos fichiers, et l'analyse fonctionnera. Seule la météo échouera, ce qui est justement la preuve qu'elle est la seule chose à sortir.",
  "privacy.table.title": "Ce qui sort, ce qui ne sort pas",
  "privacy.table.colData": "Donnée",
  "privacy.table.colSent": "Transmise ?",
  "privacy.table.file": "Le fichier de votre montre",
  "privacy.table.fileText": "<strong>Jamais.</strong> Lu depuis le disque par le navigateur, analysé en mémoire.",
  "privacy.table.track": "Votre trace GPS",
  "privacy.table.never": "<strong>Jamais.</strong>",
  "privacy.table.physio": "Fréquence cardiaque, allures, puissance",
  "privacy.table.settings": "FC maximale, allure seuil, chronos saisis",
  "privacy.table.settingsText":
    "<strong>Jamais.</strong> Conservés en mémoire le temps de la session, et perdus à la fermeture de l'onglet.",
  "privacy.table.dossier": "Le dossier généré",
  "privacy.table.dossierText":
    "<strong>Jamais</strong> par l'outil. Vous seul le copiez ou le téléchargez — et ce que vous en faites ensuite dépend de vous.",
  "privacy.table.midpoint": "Point milieu du parcours, arrondi",
  "privacy.table.midpointText": "<strong>Oui</strong>, si la météo est activée. Voir ci-dessous.",
  "privacy.weather.title": "La météo : la seule exception",
  "privacy.weather.p1":
    "Le capteur de température d'une montre est porté au poignet et chauffé par le corps : il surestime de 3 à 8 °C et ignore l'humidité et le vent. Or la chaleur est le premier facteur confondant de la dérive cardiaque — sans température réelle, on attribue à la méforme ce qui n'est que le coût thermique normal.",
  "privacy.weather.p2": "La requête est donc construite pour être inexploitable comme donnée de localisation :",
  "privacy.weather.midTitle": "On envoie le milieu du parcours, jamais le départ",
  "privacy.weather.midText":
    "Le point de départ, c'est votre domicile. Le point milieu est un endroit quelconque, sans rapport avec l'endroit où vous dormez.",
  "privacy.weather.roundTitle": "Les coordonnées sont arrondies à deux décimales",
  "privacy.weather.roundText":
    "Soit environ 1,1 km de résolution. La météo est un phénomène régional : on ne perd rien en précision, et la requête cesse de désigner un lieu identifiable.",
  "privacy.weather.nothingTitle": "Rien d'autre n'est joint",
  "privacy.weather.nothingText":
    "Pas de fréquence cardiaque, pas d'allure, pas de trace, pas d'identifiant, pas de cookie. Une latitude arrondie, une longitude arrondie, une date. La requête complète ressemble à ceci :",
  "privacy.weather.recipient":
    "Le destinataire est <a href=\"https://open-meteo.com\" rel=\"nofollow noopener\">Open-Meteo</a>, service météo ouvert. La fonction se désactive d'un menu déroulant sur la page d'accueil, et l'outil continue de fonctionner sans elle.",
  "privacy.trim.title": "Le rognage du domicile",
  "privacy.trim.text":
    "Les premiers et derniers points d'une trace révèlent votre porte d'entrée. L'outil en retire <strong>250 mètres par défaut</strong>, au départ comme à l'arrivée, avant toute analyse et avant tout export. Le réglage est modifiable, et une option permet de retirer complètement les coordonnées tout en conservant profil, allures et fréquence cardiaque.",
  "privacy.note.title": "Ce que nous ne contrôlons pas",
  "privacy.note.text":
    "Le dossier que vous copiez dans ChatGPT, Gemini ou Claude quitte votre navigateur au moment où vous le collez, et il est alors soumis aux conditions de ce service, pas aux nôtres. Si le dossier contient encore des coordonnées, elles partent avec. C'est précisément pourquoi l'option « retirer les coordonnées » est active par défaut à l'export.",
  "privacy.dont.title": "Ce que nous ne faisons pas",
  "privacy.dont.1": "Aucun compte, aucune inscription, aucun mot de passe.",
  "privacy.dont.2": "Aucun cookie, aucun traceur publicitaire, aucun pixel.",
  "privacy.dont.3": "Aucune publicité, donc aucun intérêt à collecter quoi que ce soit.",
  "privacy.dont.4": "Aucune revente de données — il n'y en a aucune à revendre.",
  "privacy.dont.analytics":
    "Si une mesure d'audience est mise en place, elle le sera sans cookie ni identifiant persistant, et cette page sera mise à jour avant.",
  "privacy.verify.title": "Le vérifier vous-même",
  "privacy.verify.p1":
    "Ne nous croyez pas sur parole. Ouvrez les outils de développement de votre navigateur (<code>F12</code>), onglet <strong>Réseau</strong>, puis déposez un fichier. Vous verrez le chargement de la page, et — si la météo est activée — une requête vers <code>open-meteo.com</code>. Rien d'autre. Aucune requête ne contient le contenu de votre fichier.",
  "privacy.verify.p2":
    "Le <a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">code source est ouvert</a>, sous licence MIT : ce que fait la page est lisible ligne à ligne.",
  "privacy.rights.title": "Vos droits",
  "privacy.rights.text":
    "Aucune donnée personnelle n'étant collectée ni conservée, il n'y a pas de fichier à consulter, corriger ou supprimer : fermer l'onglet suffit à tout effacer. Pour toute question, le dépôt GitHub ci-dessus permet d'ouvrir une discussion.",
  "privacy.footerTool": "L'outil",
  "privacy.updated": "Dernière mise à jour : <time datetime=\"2026-09-25\">25 septembre 2026</time>.",
} as const;

export type PageKey = keyof typeof fr;
export type PageCatalog = Record<PageKey, string>;
export const PAGE_KEYS = Object.keys(fr) as PageKey[];

const CATALOGS: Record<Locale, Partial<PageCatalog>> = { fr, en, es, pt, de, zh, ja };

/** Texte d'une clé de page, avec repli sur l'anglais puis le français. */
export function pageText(locale: Locale, key: PageKey): string {
  return CATALOGS[locale][key] ?? en[key] ?? fr[key];
}

/** Clés manquantes et paramètres divergents, par langue. */
export function pageCoverage(): Record<Locale, { missing: PageKey[]; badParams: PageKey[] }> {
  const params = (s: string) =>
    [...s.matchAll(/\{\{?(\w+)\}?\}/g)].map((m) => m[1]).sort().join(",");
  const out = {} as Record<Locale, { missing: PageKey[]; badParams: PageKey[] }>;
  for (const loc of LOCALES) {
    const cat = CATALOGS[loc];
    out[loc] = {
      missing: PAGE_KEYS.filter((k) => cat[k] == null),
      badParams: PAGE_KEYS.filter((k) => cat[k] != null && params(cat[k]!) !== params(fr[k])),
    };
  }
  return out;
}

// ─────────────────────────────────────────────────────────────── rendu

const BASE = "https://exemple.com";

const escAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** JSON inséré dans un <script> : « </script> » ne doit jamais apparaître. */
const safeJson = (v: unknown) => JSON.stringify(v).replace(/</g, "\\u003c");

/** Chemin public d'une page : « index.html » se sert comme « /fr/ ». */
export function pagePath(locale: string, page: string): string {
  return page === "index.html" ? `/${locale}/` : `/${locale}/${page}`;
}

export interface RenderOptions {
  /** Nom du fichier gabarit : « index.html », « confidentialite.html ». */
  page: string;
  /** Langues publiées : seules elles apparaissent dans hreflang et le sélecteur. */
  locales?: readonly Locale[];
}

/**
 * Rend un gabarit dans une langue. Le domaine reste « https://exemple.com » :
 * le build le remplace par SITE_URL, le serveur de développement le laisse.
 */
export function renderPage(template: string, locale: Locale, opts: RenderOptions): string {
  const locales = opts.locales ?? LOCALES;
  const meta = LOCALE_META[locale];
  const xDefault = locales.includes(X_DEFAULT) ? X_DEFAULT : locales[0];

  const computed: Record<string, () => string> = {
    locale: () => locale,
    htmlLang: () => meta.htmlLang,
    ogLocale: () => meta.og,
    alternates: () =>
      [
        ...locales.map(
          (l) =>
            `<link rel="alternate" hreflang="${LOCALE_META[l].hreflang}" href="${BASE}${pagePath(l, opts.page)}">`,
        ),
        `<link rel="alternate" hreflang="x-default" href="${BASE}${pagePath(xDefault, opts.page)}">`,
      ].join("\n"),
    ogAlternates: () =>
      locales
        .filter((l) => l !== locale)
        .map((l) => `<meta property="og:locale:alternate" content="${LOCALE_META[l].og}">`)
        .join("\n"),
    // Sélecteur de langue en HTML statique : un moteur qui n'exécute pas le JS
    // doit pouvoir atteindre chaque version.
    langNav: () =>
      `<nav class="langs" aria-label="${escAttr(pageText(locale, "common.langs"))}">\n` +
      locales
        .map((l) =>
          l === locale
            ? `  <span><strong>${LOCALE_META[l].name}</strong></span>`
            : `  <a href="${pagePath(l, opts.page)}" hreflang="${LOCALE_META[l].hreflang}" lang="${LOCALE_META[l].htmlLang}">${LOCALE_META[l].name}</a>`,
        )
        .join("\n") +
      `\n</nav>`,
    pageJson: () =>
      safeJson({
        locale,
        numberLocale: meta.number,
        ui: Object.fromEntries(
          PAGE_KEYS.filter((k) => k.startsWith("js.")).map((k) => [k, pageText(locale, k)]),
        ),
      }),
  };

  const isKey = (k: string): k is PageKey => k in fr;

  // Passe 1 : textes du catalogue. Passe 2 : emplacements calculés, y compris
  // ceux qu'un texte du catalogue contient ({{locale}} dans un lien).
  let html = template.replace(/\{\{(attr:|json:)?([\w.]+)\}\}/g, (whole, mode: string | undefined, name: string) => {
    if (!isKey(name)) return whole;
    const value = pageText(locale, name);
    if (mode === "attr:") return escAttr(value);
    if (mode === "json:") return safeJson(value);
    return value;
  });
  html = html.replace(/\{\{(\w+)\}\}/g, (whole, name: string) =>
    computed[name] ? computed[name]() : whole,
  );

  const left = html.match(/\{\{[^}]*\}\}/);
  if (left) throw new Error(`Gabarit ${opts.page} (${locale}) : emplacement inconnu ${left[0]}`);
  return html;
}
