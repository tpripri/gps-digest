/**
 * Catalogue des textes produits par les analyses.
 *
 * Le français est la langue de référence : c'est lui qui définit la liste des
 * clés, et son rendu ne doit jamais bouger (test/snapshot.ts le vérifie au
 * caractère près). L'anglais est complet, et le compilateur l'impose. Les
 * autres langues peuvent être partielles : une clé absente retombe sur
 * l'anglais, jamais sur une chaîne vide.
 *
 * Ce qui reste hors catalogue, volontairement :
 *  - les noms de colonnes et de blocs du dossier (`hr_source`, `## splits`) :
 *    ce sont des identifiants que le modèle et les scripts relisent ;
 *  - les valeurs machine (`yes`, `no`, `n/a`, `running`, `chest_strap`) ;
 *  - les unités SI (`km`, `m/s`, `bpm`, `W`).
 *
 * Paramètres : `{nom}` dans le texte, remplacé par `params.nom`. Les nombres
 * sont passés déjà formatés par l'appelant (toFixed, Math.round) : le format
 * numérique fait partie du calcul, pas de la traduction.
 */

import { es } from "./i18n-es.ts";
import { pt } from "./i18n-pt.ts";
import { de } from "./i18n-de.ts";
import { zh } from "./i18n-zh.ts";
import { ja } from "./i18n-ja.ts";

export const LOCALES = ["fr", "en", "es", "pt", "de", "zh", "ja"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

// ─────────────────────────────────────────────────────────────── français

const fr = {
  // ── unités dont la typographie change d'une langue à l'autre ───────────
  "unit.percent": " %",

  // ── digest.ts ──────────────────────────────────────────────────────────
  "digest.errFormat": "Format non reconnu pour « {filename} ». Formats acceptés : TCX, GPX, FIT.",
  "digest.errNoPoints": "Aucun point exploitable dans le fichier.",
  "digest.warnZonesObserved":
    "Zones FC calculées sur la FC max observée dans le fichier, pas sur un profil athlète : à interpréter avec prudence.",
  "digest.warnNoFtp": "FTP inconnue : IF et TSS non calculés.",
  "digest.warnCoords":
    "Coordonnées de départ et d'arrivée non rognées : la trace peut révéler un domicile.",
  "digest.warnHrSource":
    "Source de FC estimée : {label} (confiance {confidence}). Ne comparer les valeurs cardiaques qu'entre séances de même source.",
  "digest.warnDrift": "Dérive cardiaque non calculée : {reason}",

  // ── sensor.ts ──────────────────────────────────────────────────────────
  "sensor.label.chest_strap": "ceinture",
  "sensor.label.optical": "capteur poignet",
  "sensor.label.unknown": "indéterminée",
  "sensor.lockRange": "FC verrouillée sur la cadence",
  "sensor.swim.name": "Détection non applicable",
  "sensor.swim.note":
    "En natation, la FC est bufferisée puis déversée à la sortie de l'eau : la forme du signal ne dit rien du capteur. Déposer le fichier FIT permet en revanche de lire directement le matériel appairé.",
  "sensor.lock.name": "Verrouillage sur la cadence",
  "sensor.lock.found":
    "La FC suit la cadence sur une part notable de la séance : artefact typique d'un capteur poignet.",
  "sensor.lock.none": "Aucune confusion FC/cadence détectée.",
  "sensor.plateau.name": "Plateau le plus long",
  "sensor.plateau.long": "Longue séquence de FC strictement constante : signature du lissage optique.",
  "sensor.plateau.normal": "Pas de palier anormalement long.",
  "sensor.plateauTime.name": "Temps en palier",
  "sensor.plateauTime.note": "Part du temps où la FC ne bouge pas pendant plus de 5 s.",
  "sensor.step.name": "Variation moyenne",
  "sensor.step.note": "{pct} % des intervalles sans aucune variation.",
  "sensor.lag.name": "Latence de réponse",
  "sensor.lag.slow": "La FC réagit avec un retard important aux changements d'allure.",
  "sensor.lag.fast": "Réponse rapide aux changements d'allure.",
  "sensor.spike.name": "Pic de démarrage",
  "sensor.spike.note":
    "FC aberrante au départ puis décrochage : électrodes sèches, typique d'une ceinture.",
  "sensor.calibration.name": "Calibration",
  "sensor.calibration.note":
    "Seuils établis sur la course à pied : à vélo, les signaux sont moins tranchés et le verdict reste souvent indéterminé. Le fichier FIT lève le doute en donnant le matériel appairé.",

  // ── drift.ts ───────────────────────────────────────────────────────────
  "drift.wristCaveat":
    "Capteur de la montre, chauffé par le poignet : surestime généralement de 3 à 8 °C. Ce n'est PAS la température de l'air.",
  "drift.basisPowerIgnored":
    "Puissance présente mais ignorée : hors cyclisme, elle est estimée par la montre et ne constitue pas une base fiable. Découplage calculé sur la vitesse.",
  "drift.noWindowPower":
    "Aucune portion d'au moins 10 minutes à puissance régulière dans cette séance. Le rapport puissance/FC ne se compare qu'à effort constant ; analyser plutôt les répétitions une à une.",
  "drift.noWindowSpeed":
    "Aucune portion d'au moins 10 minutes à allure régulière dans cette séance. La dérive cardiaque ne se mesure que sur un effort continu ; analyser plutôt les répétitions une à une.",
  "drift.sparseHr":
    "Fenêtre régulière trouvée mais trop peu de données cardiaques exploitables dedans.",
  "drift.halvesInsufficient": "Données insuffisantes pour comparer les deux moitiés de la fenêtre.",
  "drift.workDrop.power":
    "Effort en baisse de {drop} % entre les deux moitiés de la fenêtre (puissance {from} → {to}) : le rendement chute parce que l'intensité chute, pas parce que le cœur dérive. Aucune dérive calculable.",
  "drift.workDrop.speed":
    "Effort en baisse de {drop} % entre les deux moitiés de la fenêtre (vitesse {from} → {to}) : le rendement chute parce que l'intensité chute, pas parce que le cœur dérive. Aucune dérive calculable.",
  "drift.qualityNote.shortEasy":
    "Fenêtre courte et située dans la partie la moins intense de la séance — vraisemblablement un échauffement ou un retour au calme. Le chiffre est exact mais ne décrit pas l'effort principal ; regarder plutôt l'analyse des répétitions.",
  "drift.qualityNote.easy":
    "Seule portion régulière trouvée : la partie la moins intense de la séance. La dérive y est structurellement faible et n'indique pas grand-chose sur l'effort principal.",
  "drift.qualityNote.short":
    "Fenêtre de {min} min couvrant {pct} % de la séance : mesure valide mais peu représentative de l'ensemble.",
  "drift.interp.negative":
    "Découplage négatif : le rendement s'améliore en seconde moitié. Typique d'un échauffement encore incomplet au début de la fenêtre, ou d'une accélération progressive volontaire.",
  "drift.interp.low": "Très faible dérive : l'effort était nettement sous le seuil aérobie.",
  "drift.interp.normal":
    "Dérive dans la norme (≤ 5 %). L'endurance aérobie soutient cette allure sur cette durée.",
  "drift.interp.markedHot":
    "Dérive marquée (> 5 %), mais par {temp} °C d'air : à cette température, 5 à 6 % de découplage sont le coût thermique normal et non un signe de méforme.",
  "drift.interp.marked":
    "Dérive marquée (> 5 %). L'allure était trop élevée pour la durée, ou l'endurance de base est le facteur limitant. Déshydratation et fatigue résiduelle produisent le même effet.",
  "drift.interp.highHot":
    "Dérive importante (> 10 %) par {temp} °C : la chaleur explique une partie du chiffre, mais pas tout. Vérifier l'hydratation et la fraîcheur.",
  "drift.interp.high":
    "Dérive importante (> 10 %). Allure non soutenable sur cette durée dans ces conditions.",
  "drift.quality.solide": "solide",
  "drift.quality.indicatif": "indicatif",

  // ── adherence.ts ───────────────────────────────────────────────────────
  "adh.tooFew": "Moins de deux répétitions identifiées : rien à comparer.",
  "adh.veryRegular.pace": "Allure très régulière entre les répétitions (variation {cv} %).",
  "adh.veryRegular.power": "Puissance très régulière entre les répétitions (variation {cv} %).",
  "adh.regularOk": "Régularité correcte (variation {cv} %).",
  "adh.irregular.pace":
    "Répétitions irrégulières en allure (variation {cv} %) : gestion à travailler, ou séance mal calibrée.",
  "adh.irregular.power":
    "Répétitions irrégulières en puissance (variation {cv} %) : gestion à travailler, ou séance mal calibrée.",
  "adh.fade.pace":
    "Dégradation de {pct} % en allure entre la première et la dernière répétition : départ trop fort, ou volume au-dessus du niveau actuel.",
  "adh.fade.power":
    "Dégradation de {pct} % en puissance entre la première et la dernière répétition : départ trop fort, ou volume au-dessus du niveau actuel.",
  "adh.build":
    "Progression de {pct} % au fil de la série : montée en puissance volontaire, signe d'une marge disponible.",
  "adh.held.pace": "Allure tenue du début à la fin de la série.",
  "adh.held.power": "Puissance tenue du début à la fin de la série.",
  "adh.restLonger":
    "Récupérations qui s'allongent (+{s} s par répétition) : la séance dérape en fin de série.",
  "adh.restShorter": "Récupérations qui raccourcissent ({s} s par répétition).",
  "adh.hrRiseStable":
    "Allure tenue mais FC en hausse de {bpm} bpm sur la série : coût cardiaque croissant à effort égal, signature de la fatigue accumulée.",
  "adh.hrRise": "FC en hausse de {bpm} bpm sur la série.",
  "adh.hrrGood":
    "Récupération cardiaque très bonne : {bpm} bpm de chute en 60 s après chaque répétition.",
  "adh.hrrOk": "Récupération cardiaque correcte : {bpm} bpm en 60 s.",
  "adh.hrrSlow":
    "Récupération lente : seulement {bpm} bpm de chute en 60 s. Fatigue résiduelle, chaleur ou récupérations trop courtes pour le format.",
  "adh.hrrErode":
    "La récupération s'érode de {bpm} bpm par répétition : la série entame les réserves plus vite que l'allure ne le laisse voir.",
  "adh.missingReps": "{done} répétitions réalisées sur les {planned} prévues.",
  "adh.targetMet.pace": "Allure cible respectée.",
  "adh.targetMet.power": "Puissance cible respectée.",
  "adh.belowTarget": "Série réalisée {pct} % en dessous de la cible.",
  "adh.aboveTarget":
    "Série réalisée {pct} % au-dessus de la cible : le bénéfice d'une séance à intervalles vient du respect de la consigne, pas du dépassement.",
  "adh.grade.conforme": "conforme",
  "adh.grade.acceptable": "acceptable",
  "adh.grade.dégradé": "dégradé",
  "adh.grade.non évaluable": "non évaluable",

  // ── classify.ts ────────────────────────────────────────────────────────
  "cls.pool": "Aucune position GPS, aucune cadence, vitesse de {speed} m/s : nage en bassin.",
  "cls.openWater":
    "Position GPS intermittente ({pct} % de couverture, {flips} décrochages) à {speed} m/s sans cadence : nage en eau libre. La distance issue du GPS y est surestimée, le signal se raccrochant à chaque sortie de bras.",
  "cls.static":
    "{dist} m parcourus en {min} min : déplacement trop faible pour une activité d'endurance.",
  "cls.crossTraining":
    "Déclarée en course mais {stopPct} % du temps à l'arrêt pour {mpm} m par minute écoulée : effort discontinu, vraisemblablement du renforcement ou du cross-training. Comptée en charge, sans analyse de course.",
  "cls.hiking": "Randonnée : comptée en charge, sans analyse d'allure ni projection.",
  "cls.unknownSport": "Sport non reconnu comme activité d'endurance : compté en charge uniquement.",
  "erg.evidence":
    "Puissance verrouillée sur {pinned} bloc(s) sur {total} : séance en mode ERG. La distance et la vitesse y sont virtuelles et ne mesurent rien.",
  "erg.warning":
    "Cadence en baisse sur {n} bloc(s) (jusqu'à {max} tr/min). En ERG, une cadence qui chute fait monter la résistance, ce qui la fait chuter davantage : cette spirale se termine par un arrêt. La parade est de relancer volontairement la cadence dès qu'elle part, ou de couper l'ERG sur les dernières répétitions.",

  // ── analyze.ts ─────────────────────────────────────────────────────────
  "zone.1": "Z1 récup",
  "zone.2": "Z2 endurance",
  "zone.3": "Z3 tempo",
  "zone.4": "Z4 seuil",
  "zone.5": "Z5 VO2max",
  "zone.6": "Z6 anaérobie",
  "zone.7": "Z7 neuro",
  "set.rest": ", récup {s} s",
  "set.power": " à {w} W",

  // ── swim.ts ────────────────────────────────────────────────────────────
  "swim.set": "{reps} × {dist} m à {pace}/100m",
  "swim.setRest": ", récup {s} s",
  "swim.lapDistance":
    "Distance reconstituée à partir des tours : le flux de points ne la porte pas, ce qui est normal en bassin.",
  "swim.hr":
    "Fréquence cardiaque en natation : un capteur optique ne lit pas sous l'eau et une ceinture ne transmet pas en immersion — elle enregistre puis déverse à la sortie. Les valeurs sont indicatives et leur horodatage approximatif. Aucune dérive cardiaque n'est calculée sur cette séance.",
  "swim.noLaps":
    "Aucun tour exploitable : la séance n'a pas de découpage par longueurs. Seules la distance et la durée totales sont utilisables.",
  "swim.lowDensity":
    "Seulement {swim} min de nage effective sur {elapsed} min écoulées : séance très fractionnée ou baignade plutôt qu'entraînement. À interpréter comme telle.",
  "swim.openWater":
    "Nage en eau libre : la distance provient du GPS, qui décroche à chaque bras immergé et se raccroche ensuite. Elle est généralement surestimée de 5 à 15 %, et l'allure instantanée n'est pas exploitable — seules les moyennes le sont.",
  "swim.noStrokes":
    "Aucun comptage de coups de bras dans le fichier : le SWOLF, qui mesure l'efficacité de la nage, ne peut pas être calculé. Toutes les montres ne le relèvent pas.",
  "swim.noPoolLength":
    "Longueur de bassin non déduite des données : les distances proviennent telles quelles de la montre.",

  // ── efforts.ts ─────────────────────────────────────────────────────────
  "race.400": "400 m",
  "race.800": "800 m",
  "race.1000": "1 000 m",
  "race.1609.344": "1 mile",
  "race.3000": "3 000 m",
  "race.5000": "5 km",
  "race.10000": "10 km",
  "race.15000": "15 km",
  "race.20000": "20 km",
  "race.21097.5": "semi-marathon",
  "race.42195": "marathon",
  "proj.method.race": "Riegel depuis {ref} en course (k={k})",
  "proj.method.raceAge": ", chrono vieux de {months} mois",
  "proj.method.training": "Riegel depuis un effort de {ref} à l'entraînement",
  "proj.method.cs": "Vitesse critique (CS {pace}/km, R²={r2})",
  "proj.caveat.marathon":
    "Une projection marathon depuis des données d'entraînement suppose une préparation spécifique menée à son terme : sorties longues, allure spécifique, stratégie nutritionnelle. C'est la projection la moins fiable de toutes.",
  "proj.caveat.half": "Suppose une préparation spécifique et une allure tenue régulièrement.",
  "proj.confidence.haute": "haute",
  "proj.confidence.moyenne": "moyenne",
  "proj.confidence.faible": "faible",

  // ── progression.ts ─────────────────────────────────────────────────────
  "prog.tooFew":
    "Moins de trois séances de course exploitables : un suivi de progression demande davantage de points.",
  "prog.multiSource":
    "Plusieurs sources de FC dans le lot : les courbes sont construites séparément par capteur. Comparer les deux entre elles n'aurait pas de sens.",
  "prog.shortSpan": "Période trop courte pour distinguer une progression des variations quotidiennes.",
  "prog.improving": "Progression nette : environ {bpm} bpm de moins par semaine à {pace}/km.",
  "prog.worsening":
    "Coût cardiaque en hausse à {pace}/km. Chaleur, fatigue accumulée ou charge trop dense sont les explications à écarter d'abord.",
  "prog.stable": "Stable : pas d'évolution mesurable du coût cardiaque sur la période.",
  "prog.none":
    "Aucune allure de référence n'est tenue assez longtemps sur au moins trois séances comparables. Des footings de durée régulière à allure constante rendraient ce suivi possible.",
  "prog.tempSpread":
    "Les températures du lot s'étalent sur {spread} °C. À allure identique, la chaleur coûte 5 à 10 bpm : une partie de la tendance observée peut n'être que saisonnière.",

  // ── batch.ts ───────────────────────────────────────────────────────────
  "batch.week": "{year}-S{week}",
  "batch.duplicateOf": "{file} (identique à {first})",
  "batch.warnDuplicates":
    "{n} doublon(s) écarté(s) — même horodatage de départ et même distance : {list}.",
  "batch.warnReclassified":
    "{n} séance(s) reclassée(s) : le sport déclaré dans le fichier ne correspondait pas à la forme des données ({list}).",
  "batch.warnLoadOnly":
    "{n} séance(s) hors endurance comptée(s) dans le volume mais exclue(s) des analyses d'allure, de dérive et de projection.",
  "batch.warnSensorChange":
    "Changement de capteur de FC détecté autour du {date} ({from} → {to}). Les comparaisons cardiaques de part et d'autre de cette date ne sont pas valides : zones, dérives et tendances de FC doivent être analysées séparément sur chaque période.",
  "batch.warnCadenceLock":
    "{n} fichier(s) présentent un verrouillage de la FC sur la cadence : les valeurs cardiaques y sont partiellement fausses et les dérives correspondantes ne sont pas exploitables.",
  "batch.warnDriftPartial":
    "Dérive cardiaque calculée sur {ok} séance(s) sur {total} : les autres sont trop courtes ou trop irrégulières pour que le calcul ait un sens.",
  "batch.warnCsFit":
    "Ajustement du modèle de vitesse critique moyen (R² = {r2}) : les projections sont indicatives. Un test dédié — 3 min et 12 min à fond, frais — donnerait un modèle bien plus fiable.",
  "batch.warnNoRace":
    "Aucun résultat de course fourni. Les projections reposent uniquement sur des efforts d'entraînement, qui surestiment généralement la performance en compétition. Renseigner un chrono réel améliore nettement la calibration.",
  "batch.warnMaxHr":
    "FC max observée ({observed} bpm) supérieure à celle renseignée ({maxHr} bpm). Toutes les zones sont décalées tant que ce réglage n'est pas corrigé.",
  "batch.bundle.title": "gps-digest v1 — synthèse multi-séances",
  "batch.bundle.range": "{n} séances du {from} au {to}",
  "batch.bundle.volume": "volume total : {km} km, {dur} en mouvement",
  "batch.bundle.note":
    "Les valeurs de FC ne sont comparables entre séances que si la colonne\nhr_source est identique. Lire les avertissements avant toute conclusion.",
  "common.refMaxHr": "FC max de référence : {hr} bpm",

  // ── serialize.ts ───────────────────────────────────────────────────────
  "bundle.title": "gps-digest v1 — résumé d'activité compacté pour analyse par un LLM",
  "bundle.source": "source: {format} | {raw} points bruts -> {kept} conservés",
  "bundle.glossary": [
    "t_s = secondes depuis le départ | dist_m = distance cumulée (m)",
    "pace_s_km = allure en secondes/km | gap_s_km = allure ajustée à la pente (Minetti 2002)",
    "hr_bpm = fréquence cardiaque | cad_spm = cadence (pas/min ou tr/min) | pw_w = puissance (W)",
    "decoupling_pct = dérive aérobie entre 1re et 2e moitié ; > 5 % = endurance limitante",
    "hr_source = capteur de FC estimé ; ne JAMAIS comparer des FC de sources différentes",
    "drift_applicable = no signifie que la séance ne permet pas ce calcul, pas qu'il vaut zéro",
  ].join("\n"),
  "bundle.tempWrist":
    "capteur montre (surestime de 3 à 8 °C, ce n'est PAS la température de l'air)",
  "bundle.tempExternal": "externe",

  // ── dossier.ts ─────────────────────────────────────────────────────────
  "dossier.guide": `# ─────────────────────────────────────────────────────────────────────
# COMMENT LIRE CE DOSSIER
#
# Structure : d'abord des tableaux transversaux (toutes séances confondues),
# puis le détail de chaque séance, chacune introduite par « ═══ SÉANCE n ═══ ».
# Chaque bloc commence par « ## nom_du_bloc » et contient un CSV avec en-tête.
#
# Unités : mètres, secondes, bpm, watts, degrés Celsius. Séparateur décimal
# = point. Séparateur de colonnes = virgule.
#
# Colonnes principales
#   t_s          secondes écoulées depuis le départ de la séance
#   dist_m       distance cumulée depuis le départ, en mètres
#   speed        allure ou vitesse selon le sport : min/km à pied, km/h à vélo,
#                min/100m en natation. Ne jamais convertir l'une en l'autre.
#   pace_s_km    allure en secondes par kilomètre (300 = 5:00/km), calculée sur
#                le temps EN MOUVEMENT, comme Strava. Garmin Connect divise par
#                la durée totale : ses allures sont donc plus lentes. Ne pas
#                conclure à une contre-performance sur cette seule différence.
#   pace_mmss    la même allure en minutes:secondes, pour la lecture
#   gap_s_km     allure ajustée à la pente (Minetti 2002) : comparable entre
#                une sortie vallonnée et une sortie plate
#   grade_pct    pente moyenne du segment, en pourcentage
#   hr_bpm       fréquence cardiaque
#   cad_spm      cadence en pas par minute (course) ou tours/min (vélo)
#   pw_w         puissance en watts
#
# Précautions de lecture, dans cet ordre d'importance
#   1. hr_source indique le capteur cardiaque estimé. Ne JAMAIS comparer des
#      valeurs de FC entre deux séances de sources différentes : l'écart
#      mesuré serait un artefact de matériel, pas un changement de forme.
#   2. drift_applicable = no signifie que la séance ne se prête pas au calcul
#      de dérive (effort trop irrégulier ou trop court). Ce n'est pas une
#      dérive nulle : c'est l'absence de mesure valide.
#   3. temp_c provient du capteur de la montre, porté au poignet. Il surestime
#      la température de l'air de 3 à 8 °C. Ce n'est PAS la météo.
#   4. Le flux détaillé est une moyenne par intervalle, pas un relevé
#      instantané. Les temps exacts sont dans les blocs splits, laps et
#      intervals.
# ─────────────────────────────────────────────────────────────────────`,
  "dossier.title": "gps-digest — dossier d'entraînement",
  "dossier.range": "{n} séance(s) du {from} au {to}",
  "dossier.volume": "volume : {km} km, {dur} en mouvement",
  "dossier.warningsHeader": "⚠ AVERTISSEMENTS — à lire avant toute conclusion",
  "dossier.unknownDate": "date inconnue",
  "dossier.sessionHeader": "═══ SÉANCE {n} — {date} — {sport} — {label} ═══",
  "dossier.file": "fichier : {name}",
  "dossier.paceBasis":
    "temps en mouvement (convention Strava) — Garmin Connect divise par la durée totale et affiche donc une allure plus lente",
  "dossier.eleDevice": "altimètre barométrique de la montre",
  "dossier.eleGps": "calculé depuis l'altitude GPS — sous-estime généralement de 30 à 50 %",
  "dossier.powerEstimated": "yes (montre, non comparable au vélo)",
  "dossier.driftReading": "lecture de la dérive : {text}",
  "dossier.representativeness": "représentativité : {text}",
  "dossier.conditions": "conditions : {text}",
  "dossier.classification": "classification : {text}",
  "dossier.swimSets": "séries : {list}",
  "dossier.adherence": "{set} — {grade} : {verdicts}",
  "dossier.streamNote": "flux ci-dessous : un point tous les {step}, valeurs moyennées sur l'intervalle",
  "dossier.progNote":
    "FC à allure de référence, dans le temps. Comparer uniquement\ndes lignes de même hr_source : deux capteurs ne sont pas comparables.",
  "dossier.progVerdict": "{pace} ({source}) : {verdict}",

  // ── charts.ts ──────────────────────────────────────────────────────────
  "chart.sessionPower": "Puissance et fréquence cardiaque",
  "chart.sessionPace": "Allure et fréquence cardiaque",
  "chart.windowNote": "zone ombrée : portion analysée pour la dérive",
  "chart.reps": "Répétitions",
  "chart.repsNote": "barres : effort — points : fréquence cardiaque",
  "chart.trendNote": "FC en bpm — une baisse est une progression",
  "chart.load": "Charge hebdomadaire",
  "chart.loadNote": "partie foncée : temps passé en intensité élevée",

  // ── weather.ts ─────────────────────────────────────────────────────────
  "heat.humid": ", {pct} % d'humidité",
  "heat.strong":
    "Contrainte thermique forte (ressenti {temp} °C{humid}). Une dérive cardiaque de 8 à 12 % est attendue à ce niveau, indépendamment de la forme.",
  "heat.notable":
    "Chaleur notable (ressenti {temp} °C{humid}). Compter 5 à 8 % de dérive d'origine purement thermique.",
  "heat.cold":
    "Froid (ressenti {temp} °C). La FC est souvent plus basse à allure égale, et l'échauffement demande plus de temps.",

  // ── parse-fit.ts, fit-decode.ts, strava.ts ─────────────────────────────
  "fit.hrEvidence":
    "Capteur cardiaque externe appairé en {source}{product} : information lue dans le fichier, pas estimée.",
  "fit.hrEvidenceProduct": " (produit {id})",
  "fit.sourceN": "source {n}",
  "fit.errHeader": "Fichier FIT invalide : en-tête inattendu.",
  "fit.errSignature": "Fichier FIT invalide : signature absente.",
  "strava.errNoTime": "Activité Strava {id} : flux temporel absent.",
  "strava.sensorCaveat":
    "Flux Strava : lissage serveur. La détection du capteur de FC est moins fiable qu'à partir d'un fichier FIT d'origine.",

  // ── archive.ts ─────────────────────────────────────────────────────────
  "archive.empty":
    "Aucun fichier FIT, TCX ou GPX dans cette archive.",
  "archive.tooBig":
    "Archive trop volumineuse pour le navigateur : décompressez-la et déposez seulement les séances voulues.",
  "archive.unsupported":
    "Archive illisible ici (ZIP64, chiffrement ou compression inhabituelle) : décompressez-la et déposez les fichiers FIT, TCX ou GPX.",
  "archive.corrupt":
    "Archive endommagée ou incomplète : téléchargez-la de nouveau.",
} as const;

export type MessageKey = keyof typeof fr;
export type Catalog = Record<MessageKey, string>;

/** Liste des clés, dans l'ordre du catalogue français. */
export const MESSAGE_KEYS = Object.keys(fr) as MessageKey[];

// ─────────────────────────────────────────────────────────────── anglais

const en: Catalog = {
  "unit.percent": "%",

  "digest.errFormat": "Unrecognized format for \"{filename}\". Accepted formats: TCX, GPX, FIT.",
  "digest.errNoPoints": "No usable data points in the file.",
  "digest.warnZonesObserved":
    "HR zones computed from the max HR observed in the file, not from an athlete profile: interpret with caution.",
  "digest.warnNoFtp": "FTP unknown: IF and TSS not computed.",
  "digest.warnCoords":
    "Start and finish coordinates not trimmed: the track may reveal a home address.",
  "digest.warnHrSource":
    "Estimated HR source: {label} (confidence {confidence}). Only compare heart rate values between sessions from the same source.",
  "digest.warnDrift": "Cardiac drift not computed: {reason}",

  "sensor.label.chest_strap": "chest strap",
  "sensor.label.optical": "wrist sensor",
  "sensor.label.unknown": "undetermined",
  "sensor.lockRange": "HR locked onto cadence",
  "sensor.swim.name": "Detection not applicable",
  "sensor.swim.note":
    "When swimming, HR is buffered and released when you leave the water: the shape of the signal says nothing about the sensor. Uploading the FIT file instead lets the tool read the paired hardware directly.",
  "sensor.lock.name": "Cadence lock",
  "sensor.lock.found":
    "HR follows cadence over a significant part of the session: a typical wrist sensor artifact.",
  "sensor.lock.none": "No HR/cadence confusion detected.",
  "sensor.plateau.name": "Longest plateau",
  "sensor.plateau.long": "Long stretch of perfectly constant HR: the signature of optical smoothing.",
  "sensor.plateau.normal": "No abnormally long plateau.",
  "sensor.plateauTime.name": "Time on plateaus",
  "sensor.plateauTime.note": "Share of time during which HR does not move for more than 5 s.",
  "sensor.step.name": "Average variation",
  "sensor.step.note": "{pct}% of intervals with no variation at all.",
  "sensor.lag.name": "Response lag",
  "sensor.lag.slow": "HR reacts to pace changes with a significant delay.",
  "sensor.lag.fast": "Fast response to pace changes.",
  "sensor.spike.name": "Start-up spike",
  "sensor.spike.note":
    "Aberrant HR at the start, then a sudden drop: dry electrodes, typical of a chest strap.",
  "sensor.calibration.name": "Calibration",
  "sensor.calibration.note":
    "Thresholds were set on running data: on the bike the signals are less clear-cut and the verdict often stays undetermined. The FIT file removes the doubt by giving the paired hardware.",

  "drift.wristCaveat":
    "Watch sensor, warmed by the wrist: usually reads 3 to 8 °C too high. This is NOT the air temperature.",
  "drift.basisPowerIgnored":
    "Power present but ignored: outside cycling it is estimated by the watch and is not a reliable basis. Decoupling computed on speed.",
  "drift.noWindowPower":
    "No stretch of at least 10 minutes at steady power in this session. The power/HR ratio can only be compared at constant effort; analyze the reps one by one instead.",
  "drift.noWindowSpeed":
    "No stretch of at least 10 minutes at steady pace in this session. Cardiac drift can only be measured on a continuous effort; analyze the reps one by one instead.",
  "drift.sparseHr": "Steady window found, but it contains too little usable heart rate data.",
  "drift.halvesInsufficient": "Not enough data to compare the two halves of the window.",
  "drift.workDrop.power":
    "Effort down {drop}% between the two halves of the window (power {from} → {to}): efficiency drops because intensity drops, not because the heart drifts. No drift can be computed.",
  "drift.workDrop.speed":
    "Effort down {drop}% between the two halves of the window (speed {from} → {to}): efficiency drops because intensity drops, not because the heart drifts. No drift can be computed.",
  "drift.qualityNote.shortEasy":
    "Short window located in the least intense part of the session, most likely a warm-up or cool-down. The number is correct but does not describe the main effort; look at the rep analysis instead.",
  "drift.qualityNote.easy":
    "Only steady stretch found: the least intense part of the session. Drift there is structurally low and says little about the main effort.",
  "drift.qualityNote.short":
    "{min} min window covering {pct}% of the session: a valid measurement, but not very representative of the whole.",
  "drift.interp.negative":
    "Negative decoupling: efficiency improves in the second half. Typical of a warm-up that was still incomplete at the start of the window, or of a deliberate progressive build.",
  "drift.interp.low": "Very low drift: the effort was well below the aerobic threshold.",
  "drift.interp.normal":
    "Drift within the normal range (≤ 5%). Aerobic endurance supports this pace for this duration.",
  "drift.interp.markedHot":
    "Marked drift (> 5%), but in {temp} °C air: at this temperature, 5 to 6% decoupling is the normal thermal cost, not a sign of poor form.",
  "drift.interp.marked":
    "Marked drift (> 5%). The pace was too high for the duration, or base endurance is the limiting factor. Dehydration and residual fatigue produce the same effect.",
  "drift.interp.highHot":
    "High drift (> 10%) at {temp} °C: heat explains part of the number, but not all of it. Check hydration and freshness.",
  "drift.interp.high":
    "High drift (> 10%). Pace not sustainable for this duration in these conditions.",
  "drift.quality.solide": "solid",
  "drift.quality.indicatif": "indicative",

  "adh.tooFew": "Fewer than two reps identified: nothing to compare.",
  "adh.veryRegular.pace": "Very consistent pace across reps (variation {cv}%).",
  "adh.veryRegular.power": "Very consistent power across reps (variation {cv}%).",
  "adh.regularOk": "Acceptable consistency (variation {cv}%).",
  "adh.irregular.pace":
    "Uneven reps in pace (variation {cv}%): pacing needs work, or the session was poorly calibrated.",
  "adh.irregular.power":
    "Uneven reps in power (variation {cv}%): pacing needs work, or the session was poorly calibrated.",
  "adh.fade.pace":
    "Pace fades by {pct}% between the first and last rep: started too fast, or volume above current level.",
  "adh.fade.power":
    "Power fades by {pct}% between the first and last rep: started too fast, or volume above current level.",
  "adh.build":
    "Improves by {pct}% over the set: a deliberate build, a sign there was margin left.",
  "adh.held.pace": "Pace held from start to finish of the set.",
  "adh.held.power": "Power held from start to finish of the set.",
  "adh.restLonger":
    "Recoveries getting longer (+{s} s per rep): the session slips at the end of the set.",
  "adh.restShorter": "Recoveries getting shorter ({s} s per rep).",
  "adh.hrRiseStable":
    "Pace held but HR up {bpm} bpm over the set: rising cardiac cost at equal effort, the signature of accumulated fatigue.",
  "adh.hrRise": "HR up {bpm} bpm over the set.",
  "adh.hrrGood": "Very good heart rate recovery: {bpm} bpm drop in 60 s after each rep.",
  "adh.hrrOk": "Acceptable heart rate recovery: {bpm} bpm in 60 s.",
  "adh.hrrSlow":
    "Slow recovery: only {bpm} bpm drop in 60 s. Residual fatigue, heat, or recoveries too short for the format.",
  "adh.hrrErode":
    "Recovery erodes by {bpm} bpm per rep: the set is eating into reserves faster than the pace shows.",
  "adh.missingReps": "{done} reps completed out of {planned} planned.",
  "adh.targetMet.pace": "Target pace met.",
  "adh.targetMet.power": "Target power met.",
  "adh.belowTarget": "Set completed {pct}% below target.",
  "adh.aboveTarget":
    "Set completed {pct}% above target: the benefit of an interval session comes from hitting the prescription, not from exceeding it.",
  "adh.grade.conforme": "on target",
  "adh.grade.acceptable": "acceptable",
  "adh.grade.dégradé": "degraded",
  "adh.grade.non évaluable": "not assessable",

  "cls.pool": "No GPS position, no cadence, speed {speed} m/s: pool swim.",
  "cls.openWater":
    "Intermittent GPS position ({pct}% coverage, {flips} dropouts) at {speed} m/s with no cadence: open water swim. GPS distance is overestimated here, as the signal reconnects every time an arm leaves the water.",
  "cls.static":
    "{dist} m covered in {min} min: too little movement for an endurance activity.",
  "cls.crossTraining":
    "Declared as running, but {stopPct}% of the time stopped and {mpm} m per elapsed minute: discontinuous effort, most likely strength work or cross-training. Counted as load, without running analysis.",
  "cls.hiking": "Hiking: counted as load, without pace analysis or projection.",
  "cls.unknownSport": "Sport not recognized as an endurance activity: counted as load only.",
  "erg.evidence":
    "Power locked on {pinned} of {total} block(s): ERG mode session. Distance and speed are virtual here and measure nothing.",
  "erg.warning":
    "Cadence dropping on {n} block(s) (by up to {max} rpm). In ERG mode, falling cadence raises the resistance, which makes cadence fall further: this spiral ends in a stop. The fix is to deliberately lift cadence as soon as it slips, or to turn ERG off for the last reps.",

  "zone.1": "Z1 recovery",
  "zone.2": "Z2 endurance",
  "zone.3": "Z3 tempo",
  "zone.4": "Z4 threshold",
  "zone.5": "Z5 VO2max",
  "zone.6": "Z6 anaerobic",
  "zone.7": "Z7 neuromuscular",
  "set.rest": ", rest {s} s",
  "set.power": " at {w} W",

  "swim.set": "{reps} × {dist} m at {pace}/100m",
  "swim.setRest": ", rest {s} s",
  "swim.lapDistance":
    "Distance rebuilt from laps: the point stream does not carry it, which is normal in a pool.",
  "swim.hr":
    "Heart rate while swimming: an optical sensor cannot read underwater, and a chest strap does not transmit when submerged, it stores and releases the data afterwards. Values are indicative and their timestamps approximate. No cardiac drift is computed for this session.",
  "swim.noLaps":
    "No usable laps: the session is not split into lengths. Only total distance and duration can be used.",
  "swim.lowDensity":
    "Only {swim} min of actual swimming out of {elapsed} min elapsed: a very broken-up session or a leisure swim rather than training. Read it as such.",
  "swim.openWater":
    "Open water swim: distance comes from GPS, which drops out with every submerged arm and reconnects afterwards. It is usually overestimated by 5 to 15%, and instantaneous pace cannot be used; only averages can.",
  "swim.noStrokes":
    "No stroke count in the file: SWOLF, which measures swimming efficiency, cannot be computed. Not every watch records it.",
  "swim.noPoolLength":
    "Pool length could not be inferred from the data: distances are taken as-is from the watch.",

  "race.400": "400 m",
  "race.800": "800 m",
  "race.1000": "1,000 m",
  "race.1609.344": "1 mile",
  "race.3000": "3,000 m",
  "race.5000": "5K",
  "race.10000": "10K",
  "race.15000": "15K",
  "race.20000": "20K",
  "race.21097.5": "half marathon",
  "race.42195": "marathon",
  "proj.method.race": "Riegel from a {ref} race (k={k})",
  "proj.method.raceAge": ", result {months} months old",
  "proj.method.training": "Riegel from a {ref} training effort",
  "proj.method.cs": "Critical speed (CS {pace}/km, R²={r2})",
  "proj.caveat.marathon":
    "A marathon projection from training data assumes a specific build completed in full: long runs, goal-pace work, a fueling strategy. It is the least reliable projection of all.",
  "proj.caveat.half": "Assumes a specific build and a pace held consistently.",
  "proj.confidence.haute": "high",
  "proj.confidence.moyenne": "medium",
  "proj.confidence.faible": "low",

  "prog.tooFew":
    "Fewer than three usable running sessions: tracking progression needs more data points.",
  "prog.multiSource":
    "Several HR sources in this batch: the curves are built separately for each sensor. Comparing them with each other would make no sense.",
  "prog.shortSpan": "Period too short to tell progression apart from day-to-day variation.",
  "prog.improving": "Clear progression: about {bpm} bpm lower per week at {pace}/km.",
  "prog.worsening":
    "Cardiac cost rising at {pace}/km. Heat, accumulated fatigue or an overly dense load are the explanations to rule out first.",
  "prog.stable": "Stable: no measurable change in cardiac cost over the period.",
  "prog.none":
    "No reference pace is held long enough in at least three comparable sessions. Easy runs of consistent duration at a constant pace would make this tracking possible.",
  "prog.tempSpread":
    "Temperatures in this batch span {spread} °C. At the same pace, heat costs 5 to 10 bpm: part of the observed trend may be purely seasonal.",

  "batch.week": "{year}-W{week}",
  "batch.duplicateOf": "{file} (same as {first})",
  "batch.warnDuplicates":
    "{n} duplicate(s) dropped (same start timestamp and same distance): {list}.",
  "batch.warnReclassified":
    "{n} session(s) reclassified: the sport declared in the file did not match the shape of the data ({list}).",
  "batch.warnLoadOnly":
    "{n} non-endurance session(s) counted in volume but excluded from pace, drift and projection analysis.",
  "batch.warnSensorChange":
    "HR sensor change detected around {date} ({from} → {to}). Heart rate comparisons across this date are not valid: zones, drift and HR trends must be analyzed separately for each period.",
  "batch.warnCadenceLock":
    "{n} file(s) show HR locked onto cadence: heart rate values there are partly wrong and the related drift figures cannot be used.",
  "batch.warnDriftPartial":
    "Cardiac drift computed on {ok} of {total} session(s): the others are too short or too uneven for the calculation to make sense.",
  "batch.warnCsFit":
    "Average fit of the critical speed model (R² = {r2}): projections are indicative. A dedicated test (3 min and 12 min all-out, fresh) would give a much more reliable model.",
  "batch.warnNoRace":
    "No race result provided. Projections rely only on training efforts, which usually overestimate race performance. Entering a real race time clearly improves calibration.",
  "batch.warnMaxHr":
    "Observed max HR ({observed} bpm) is higher than the one entered ({maxHr} bpm). All zones are shifted until this setting is corrected.",
  "batch.bundle.title": "gps-digest v1 — multi-session summary",
  "batch.bundle.range": "{n} sessions from {from} to {to}",
  "batch.bundle.volume": "total volume: {km} km, {dur} moving",
  "batch.bundle.note":
    "HR values are only comparable between sessions when the hr_source\ncolumn is identical. Read the warnings before drawing any conclusion.",
  "common.refMaxHr": "Reference max HR: {hr} bpm",

  "bundle.title": "gps-digest v1 — activity summary compacted for analysis by an LLM",
  "bundle.source": "source: {format} | {raw} raw points -> {kept} kept",
  "bundle.glossary": [
    "t_s = seconds since start | dist_m = cumulative distance (m)",
    "pace_s_km = pace in seconds/km | gap_s_km = grade-adjusted pace (Minetti 2002)",
    "hr_bpm = heart rate | cad_spm = cadence (steps/min or rpm) | pw_w = power (W)",
    "decoupling_pct = aerobic drift between 1st and 2nd half; > 5% = endurance is limiting",
    "hr_source = estimated HR sensor; NEVER compare HR from different sources",
    "drift_applicable = no means the session does not allow this calculation, not that it equals zero",
  ].join("\n"),
  "bundle.tempWrist": "watch sensor (reads 3 to 8 °C too high, this is NOT the air temperature)",
  "bundle.tempExternal": "external",

  "dossier.guide": `# ─────────────────────────────────────────────────────────────────────
# HOW TO READ THIS FILE
#
# Structure: cross-session tables first (all sessions together), then the
# detail of each session, each one introduced by "═══ SESSION n ═══".
# Each block starts with "## block_name" and contains a CSV with a header.
#
# Units: meters, seconds, bpm, watts, degrees Celsius. Decimal separator
# = period. Column separator = comma.
#
# Main columns
#   t_s          seconds elapsed since the start of the session
#   dist_m       cumulative distance since the start, in meters
#   speed        pace or speed depending on the sport: min/km on foot, km/h on
#                the bike, min/100m swimming. Never convert one into the other.
#   pace_s_km    pace in seconds per kilometer (300 = 5:00/km), computed on
#                MOVING time, like Strava. Garmin Connect divides by total
#                duration, so its paces are slower. Do not conclude to a poor
#                performance from this difference alone.
#   pace_mmss    the same pace in minutes:seconds, for reading
#   gap_s_km     grade-adjusted pace (Minetti 2002): comparable between a
#                hilly run and a flat one
#   grade_pct    average grade of the segment, in percent
#   hr_bpm       heart rate
#   cad_spm      cadence in steps per minute (running) or rpm (cycling)
#   pw_w         power in watts
#
# Reading precautions, in order of importance
#   1. hr_source gives the estimated heart rate sensor. NEVER compare HR
#      values between two sessions from different sources: the measured
#      gap would be a hardware artifact, not a change in fitness.
#   2. drift_applicable = no means the session is not suited to a drift
#      calculation (effort too uneven or too short). It is not zero drift:
#      it is the absence of a valid measurement.
#   3. temp_c comes from the watch sensor, worn on the wrist. It reads the
#      air temperature 3 to 8 °C too high. It is NOT the weather.
#   4. The detailed stream is an average per interval, not an instantaneous
#      reading. Exact times are in the splits, laps and intervals blocks.
# ─────────────────────────────────────────────────────────────────────`,
  "dossier.title": "gps-digest — training file",
  "dossier.range": "{n} session(s) from {from} to {to}",
  "dossier.volume": "volume: {km} km, {dur} moving",
  "dossier.warningsHeader": "⚠ WARNINGS — read before drawing any conclusion",
  "dossier.unknownDate": "unknown date",
  "dossier.sessionHeader": "═══ SESSION {n} — {date} — {sport} — {label} ═══",
  "dossier.file": "file: {name}",
  "dossier.paceBasis":
    "moving time (Strava convention); Garmin Connect divides by total duration and therefore shows a slower pace",
  "dossier.eleDevice": "watch barometric altimeter",
  "dossier.eleGps": "computed from GPS altitude, usually underestimates by 30 to 50%",
  "dossier.powerEstimated": "yes (watch, not comparable to cycling power)",
  "dossier.driftReading": "drift reading: {text}",
  "dossier.representativeness": "representativeness: {text}",
  "dossier.conditions": "conditions: {text}",
  "dossier.classification": "classification: {text}",
  "dossier.swimSets": "sets: {list}",
  "dossier.adherence": "{set} — {grade}: {verdicts}",
  "dossier.streamNote": "stream below: one point every {step}, values averaged over the interval",
  "dossier.progNote":
    "HR at reference pace, over time. Only compare rows with the\nsame hr_source: two sensors are not comparable.",
  "dossier.progVerdict": "{pace} ({source}): {verdict}",

  "chart.sessionPower": "Power and heart rate",
  "chart.sessionPace": "Pace and heart rate",
  "chart.windowNote": "shaded area: portion analyzed for drift",
  "chart.reps": "Reps",
  "chart.repsNote": "bars: effort, dots: heart rate",
  "chart.trendNote": "HR in bpm, a drop means progress",
  "chart.load": "Weekly load",
  "chart.loadNote": "dark part: time spent at high intensity",

  "heat.humid": ", {pct}% humidity",
  "heat.strong":
    "Strong heat stress (feels like {temp} °C{humid}). Cardiac drift of 8 to 12% is expected at this level, regardless of fitness.",
  "heat.notable":
    "Notable heat (feels like {temp} °C{humid}). Expect 5 to 8% drift of purely thermal origin.",
  "heat.cold":
    "Cold (feels like {temp} °C). HR is often lower at the same pace, and warming up takes longer.",

  "fit.hrEvidence":
    "External heart rate sensor paired over {source}{product}: read from the file, not estimated.",
  "fit.hrEvidenceProduct": " (product {id})",
  "fit.sourceN": "source {n}",
  "fit.errHeader": "Invalid FIT file: unexpected header.",
  "fit.errSignature": "Invalid FIT file: signature missing.",
  "strava.errNoTime": "Strava activity {id}: time stream missing.",
  "strava.sensorCaveat":
    "Strava stream: server-side smoothing. HR sensor detection is less reliable than from an original FIT file.",

  // ── archive.ts ─────────────────────────────────────────────────────────
  "archive.empty":
    "No FIT, TCX or GPX file in this archive.",
  "archive.tooBig":
    "Archive too large for the browser: unzip it and drop only the workouts you want.",
  "archive.unsupported":
    "This archive cannot be read here (ZIP64, encryption or unusual compression): unzip it and drop the FIT, TCX or GPX files.",
  "archive.corrupt":
    "Damaged or incomplete archive: download it again.",
};

// ─────────────────────────────────────────────────────── autres langues
//
// Un fichier par langue (i18n-xx.ts). Ils sont typés partiels : une clé
// ajoutée au français sans traduction retombe sur l'anglais au lieu de casser
// le build, et coverage() la signale (le banc de test aussi).

const CATALOGS: Record<Locale, Partial<Catalog>> = { fr, en, es, pt, de, zh, ja };

// ─────────────────────────────────────────────────────────────── API

/**
 * Normalise une locale reçue de l'extérieur. Absente : français, la langue
 * historique de l'outil. Inconnue (« it », « nl ») : anglais, plus utile à un
 * lecteur étranger que du français.
 */
export function resolveLocale(input?: string | null): Locale {
  if (!input) return DEFAULT_LOCALE;
  const base = input.toLowerCase().split(/[-_]/)[0];
  return (LOCALES as readonly string[]).includes(base) ? (base as Locale) : "en";
}

export type MessageParams = Record<string, string | number>;

/** Texte d'une clé dans une langue, paramètres interpolés. */
export function t(locale: string | undefined, key: MessageKey, params?: MessageParams): string {
  const loc = resolveLocale(locale);
  const template = CATALOGS[loc][key] ?? en[key] ?? fr[key];
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
    name in params ? String(params[name]) : whole,
  );
}

/** Traducteur lié à une langue : évite de répéter la locale à chaque appel. */
export function translator(locale?: string): (key: MessageKey, params?: MessageParams) => string {
  const loc = resolveLocale(locale);
  return (key, params) => t(loc, key, params);
}

/**
 * Clés manquantes par langue, et clés dont les paramètres ne correspondent pas
 * au français (un `{bpm}` oublié donnerait une phrase sans chiffre). Sert de
 * liste de contrôle pour les catalogues à compléter.
 */
export function coverage(): Record<Locale, { missing: MessageKey[]; badParams: MessageKey[] }> {
  const keys = MESSAGE_KEYS;
  const paramsOf = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
  const out = {} as Record<Locale, { missing: MessageKey[]; badParams: MessageKey[] }>;
  for (const loc of LOCALES) {
    const cat = CATALOGS[loc];
    out[loc] = {
      missing: keys.filter((k) => cat[k] == null),
      badParams: keys.filter((k) => cat[k] != null && paramsOf(cat[k]!) !== paramsOf(fr[k])),
    };
  }
  return out;
}
