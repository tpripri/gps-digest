/** Catalogue de page : allemand. Clés et emplacements : voir page-i18n.ts. */

import type { PageCatalog } from "./page-i18n.ts";

export const de: Partial<PageCatalog> = {
  "common.langs": "Sprache",
  "common.footerNav": "Fußzeile",
  "common.privacy": "Datenschutz",
  "common.source": "Quellcode",

  "home.title": "TCX-, GPX- oder FIT-Datei in CSV für ChatGPT oder Gemini umwandeln — gps-digest",
  "home.description":
    "Kostenloses Tool, das die Dateien deiner GPS-Uhr in ein Trainingsdossier verwandelt, das eine KI lesen kann. Erkennt den Brustgurt, berechnet die kardiale Drift, prüft die Umsetzung deiner Intervalle und prognostiziert deine Wettkampfzeiten. Alles wird in deinem Browser berechnet: Es wird keine Datei hochgeladen.",
  "home.h1": "Lass deine Laufeinheiten von einer KI analysieren",
  "home.og.description":
    "Die Dateien deiner Uhr sind zu groß für eine KI. Dieses Tool macht daraus ein strukturiertes Dossier, das sie wirklich analysieren kann.",
  "home.og.imageAlt": "Eine GPS-Uhrendatei, umgewandelt in ein strukturiertes Trainingsdossier.",

  "home.ld.description":
    "Wandelt Dateien von GPS-Uhren (TCX, GPX, FIT) in ein strukturiertes Trainingsdossier um, das ein Sprachmodell analysieren kann.",
  "home.ld.feature1": "Umwandlung von TCX, GPX und FIT in strukturiertes CSV",
  "home.ld.feature2": "Verarbeitung komplett im Browser, keine Datei wird hochgeladen",
  "home.ld.feature3": "Erkennung des Herzfrequenzsensors (Brustgurt oder Handgelenk)",
  "home.ld.feature4": "Kardiale Drift mit Plausibilitätsprüfung",
  "home.ld.feature5": "Analyse der Intervallumsetzung",
  "home.ld.feature6": "Zeitprognosen für 5 km, 10 km, Halbmarathon und Marathon",
  "home.ld.feature7": "Unbegrenzte Anzahl an Dateien",
  "home.ld.howto": "Laufeinheiten von einer KI analysieren lassen",
  "home.ld.step1.name": "Dateien hochladen",
  "home.ld.step1.text":
    "Zieh die aus deiner Uhr exportierten TCX-, GPX- oder FIT-Dateien hinein. Die Anzahl ist nicht begrenzt.",
  "home.ld.step2.name": "Eckdaten angeben",
  "home.ld.step2.text": "Gib deine gemessene maximale Herzfrequenz und eine aktuelle Wettkampfzeit an.",
  "home.ld.step3.name": "Warnungen lesen",
  "home.ld.step3.text":
    "Das Tool weist auf Wechsel des Herzfrequenzsensors und auf Einheiten mit unzuverlässiger Herzfrequenz hin.",
  "home.ld.step4.name": "Dossier in die KI kopieren",
  "home.ld.step4.text":
    "Kopiere das erzeugte Dossier und füge es zusammen mit deiner Frage in ChatGPT, Gemini oder Claude ein.",
  "home.ld.faq1.q": "Warum ist meine TCX-Datei zu groß für eine KI?",
  "home.ld.faq1.a":
    "Eine einstündige TCX-Datei mit 1 Hz ist etwa 1,7 MB groß, davon fast 90 % XML-Tags, also rund 533.000 Tokens. Selbst wenn dieses Volumen ins Kontextfenster passt, argumentiert das Modell schlecht: Es soll eine Trainingsanalyse aus Tausenden Zeilen roher Koordinaten liefern.",
  "home.ld.faq2.q": "Werden meine GPS-Dateien an einen Server geschickt?",
  "home.ld.faq2.a":
    "Nein. Die gesamte Berechnung läuft in deinem Browser. Keine Datei geht über einen Server, was du im Netzwerk-Tab prüfen kannst. Ein GPS-Track verrät deine Wohnadresse auf den Meter genau: Das Tool kürzt Start und Ziel standardmäßig.",
  "home.ld.faq3.q": "Woran erkennt man, ob eine Einheit mit Brustgurt oder Handgelenksensor aufgezeichnet wurde?",
  "home.ld.faq3.a":
    "Die Datei sagt es fast nie. Das Tool leitet es aus der Signatur des Signals ab. Das deutlichste Merkmal ist das Einrasten auf die Kadenz: Der optische Sensor verwechselt die Schrittfrequenz mit dem Puls und zeigt zum Beispiel 172 bpm statt 140. Ein Brustgurt misst ein elektrisches Signal und kann diesen Fehler nicht machen.",
  "home.ld.faq4.q": "Kann man die Herzfrequenz vom Handgelenk mit der vom Brustgurt vergleichen?",
  "home.ld.faq4.a":
    "Nein. Beide Technologien weichen unter Belastung deutlich voneinander ab, und der optische Sensor wird bei wechselnder Intensität ungenauer. Ein Sensorwechsel mitten in einem Zeitraum verfälscht unbemerkt Zonen, Drift und Trends. Das Tool erkennt diesen Wechsel, datiert ihn und analysiert beide Zeiträume getrennt.",
  "home.ld.faq5.q": "Wie verlässlich ist eine Marathonprognose?",
  "home.ld.faq5.a":
    "Gering. Eine Studie mit 2.303 Hobbyläufern hat gezeigt, dass die Riegel-Formel bis zum Halbmarathon gut kalibriert ist, beim Marathon aber für die Hälfte der Läufer mindestens zehn Minuten zu schnelle Prognosen liefert. Ein Modell auf Basis von ein oder zwei echten Wettkampfergebnissen halbiert den Fehler ungefähr.",
  "home.ld.faq6.q": "Ist die Temperatur, die meine Uhr anzeigt, die Lufttemperatur?",
  "home.ld.faq6.a":
    "Nein. Der Sensor sitzt am Handgelenk und wird vom Körper erwärmt: Er misst meist 3 bis 8 °C zu hoch. Das Tool zeigt den Wert an, aber immer mit dieser Warnung, auch im Dossier, das an die KI geht.",

  "home.lede":
    "Die Dateien deiner Uhr sind zu groß für ChatGPT, Gemini oder Claude. Dieses Tool macht daraus ein strukturiertes Trainingsdossier (Pace, Runden, Zonen, Wiederholungen, kardiale Drift), das die KI wirklich analysieren kann.",
  "home.promise":
    "<strong>Deine Dateien verlassen deinen Browser nicht.</strong> Die gesamte Berechnung läuft auf deinem Gerät, und du kannst das im Netzwerk-Tab prüfen. Ein GPS-Track verrät deine Adresse auf den Meter genau, deshalb werden Start und Ziel standardmäßig gekürzt. <a href=\"{{href:confidentialite.html}}\">Was hinausgeht und was nie hinausgeht</a>.",
  "home.step1.title": "Dateien hochladen",
  "home.step1.text": "So viele du willst, als TCX, GPX oder FIT, exportiert aus deiner Uhr oder aus Strava.",
  "home.step2.title": "Eckdaten angeben",
  "home.step2.text": "Maximale HF und letzte Wettkampfzeit. Ohne sie bleiben Zonen und Prognosen ungefähr.",
  "home.step3.title": "Warnungen lesen",
  "home.step3.text": "Sensorwechsel, unzuverlässige HF: Davon hängt ab, ob der Rest belastbar ist.",
  "home.step4.title": "Dossier abholen",
  "home.step4.text": "Eine vollständige, kommentierte Textdatei für ChatGPT, Gemini oder Claude.",

  "home.why.title": "Warum dieses Tool?",
  "home.why.p1":
    "Eine einstündige TCX-Datei mit 1 Hz ist etwa 1,7 MB groß, davon fast 90 % XML-Tags. Das sind rund <strong>533.000 Tokens</strong>. Selbst wenn dieses Volumen ins Kontextfenster passt, argumentiert das Modell schlecht: Es soll eine Trainingsanalyse aus Tausenden Zeilen roher Koordinaten liefern.",
  "home.why.p2":
    "Das hier erzeugte Dossier umfasst einige Zehntausend Tokens und enthält Objekte, die ein Modell interpretieren kann: Kilometerzeiten, Runden, Zeit pro Zone, Wiederholungen einzeln, Bestleistungen, Prognosen. <strong>Die Analyse ist besser als mit der vollständigen Datei</strong>, nicht nur günstiger.",
  "home.why.tableTitle": "Was das Tool selbst berechnet",
  "home.why.colAnalysis": "Analyse",
  "home.why.colAnswer": "Was sie beantwortet",
  "home.why.sensor": "Quelle der HF",
  "home.why.sensorText":
    "Brustgurt oder Handgelenksensor? Die Datei sagt es fast nie. Das Tool leitet es aus dem Signal ab, vor allem aus dem Einrasten auf die Kadenz, wenn die Uhr die Schritte mit dem Herzschlag verwechselt.",
  "home.why.drift": "Kardiale Drift",
  "home.why.driftText":
    "Sinkt deine Effizienz in der zweiten Hälfte der Belastung? Über 5 % liegt es an der Grundlagenausdauer. Das Tool berechnet keine Drift bei Intervalleinheiten, wo die Zahl sinnlos wäre.",
  "home.why.blocks": "Intervallumsetzung",
  "home.why.blocksText":
    "Sind deine Wiederholungen gleichmäßig? Lässt die Pace nach? Steigt die HF bei gehaltener Pace, ein Zeichen von Ermüdung, bevor die Beine nachgeben?",
  "home.why.projections": "Zeitprognosen",
  "home.why.projectionsText":
    "5 km, 10 km, Halbmarathon, Marathon, mit Spanne und Verlässlichkeitsstufe. Eine Wettkampfzeit zählt mehr als eine Trainingsbelastung, und ihr Gewicht nimmt mit dem Alter ab.",
  "home.why.hardware": "Gerätewechsel",
  "home.why.hardwareText":
    "Über mehrere Einheiten erkennt und datiert das Tool einen Wechsel des Herzfrequenzsensors, der sonst unbemerkt jeden HF-Vergleich entwerten würde.",

  "home.set.title": "1. Deine Eckdaten",
  "home.set.intro":
    "Optional, aber ohne diese Werte werden die Zonen aus der in den Dateien beobachteten maximalen HF geschätzt, was ungenau ist.",
  "home.set.fcmax": "Maximale HF",
  "home.set.fcmaxHint": "Gemessen, nicht 220 minus Alter",
  "home.set.fcmaxPlaceholder": "z. B. 185",
  "home.set.threshold": "Schwellenpace",
  "home.set.thresholdHint": "Etwa 1 h haltbar",
  "home.set.refDist": "Referenzzeit",
  "home.set.refDistHint": "Distanz",
  "home.set.refNone": "Keine",
  "home.set.ref5k": "5 km",
  "home.set.ref10k": "10 km",
  "home.set.refHalf": "Halbmarathon",
  "home.set.refMarathon": "Marathon",
  "home.set.refTime": "Zeit",
  "home.set.refTimeHint": "h:mm:ss",
  "home.set.refDate": "Datum der Zeit",
  "home.set.refDateHint": "Gewichtet das Alter",
  "home.set.privacy": "Datenschutz-Kürzung",
  "home.set.privacyHint": "Meter an Start und Ziel",
  "home.set.weather": "Lufttemperatur",
  "home.set.weatherOn": "Echtes Wetter abrufen",
  "home.set.weatherOff": "Nichts senden",
  "home.set.weatherHint":
    "Sendet den <strong>Mittelpunkt</strong> der Strecke, auf ~1 km gerundet, und das Datum an Open-Meteo. Nie deinen Start, nie deine Daten.",

  "home.files.title": "2. Deine Dateien",
  "home.files.drop": "Dateien hier ablegen",
  "home.files.formats": "TCX, GPX oder FIT, so viele du willst, notfalls eine ganze Saison",
  "home.files.fit":
    "FIT ist das native Format deiner Uhr: Nur es enthält die Beckenbahnen und den tatsächlich gekoppelten Herzfrequenzsensor.",
  "home.files.pick": "Dateien auswählen",

  "home.export.title": "3. Dein Dossier, bereit zur Analyse",
  "home.export.intro":
    "Heutige Kontextfenster verkraften problemlos 100.000 Tokens, deshalb setzt die Standardeinstellung auf Detail. Geh eine Stufe runter, wenn dein Modell begrenzter ist oder du viele Einheiten lädst.",
  "home.export.resolution": "Detailgrad des Datenstroms",
  "home.export.res5s": "Ein Punkt alle 5 s (maximal)",
  "home.export.res10s": "Ein Punkt alle 10 s (empfohlen)",
  "home.export.res30s": "Ein Punkt alle 30 s (reduziert)",
  "home.export.res100m": "Ein Punkt alle 100 m",
  "home.export.res10m": "Ein Punkt alle 10 m (sehr detailliert)",
  "home.export.resNone": "Nur Tabellen, ohne fortlaufenden Datenstrom",
  "home.export.resSummary": "Kurze Übersicht, ohne Details pro Einheit",
  "home.export.coords": "GPS-Koordinaten",
  "home.export.coordsDrop": "Entfernen (empfohlen)",
  "home.export.coordsKeep": "Behalten",
  "home.export.coordsHint": "Höhenprofil, Pace und HF bleiben in jedem Fall erhalten.",
  "home.export.questions": "Fragen an deine KI",
  "home.export.q1":
    "Analysiere meine kardiale Drift unter Berücksichtigung der Temperatur und sag mir, ob meine Grundlagenausdauer ein limitierender Faktor ist.",
  "home.export.q2": "Habe ich meine Intervalle wie geplant umgesetzt? Was sollte ich in der nächsten Einheit ändern?",
  "home.export.q3": "Vergleiche die Zeiträume der Sensoren getrennt und sag mir, was sich geändert hat.",
  "home.export.q4": "Schlag mir auf Basis dieser Belastung meine Trainingswoche vor.",
  "home.export.q5": "Passt meine Intensitätsverteilung zu meinem Ziel?",
  "home.export.preview": "Erzeugtes Dossier ansehen",

  "home.results.title": "4. Die Details, wenn du tiefer einsteigen willst",
  "home.results.overview": "Überblick",
  "home.results.colFile": "Datei",
  "home.results.colDate": "Datum",
  "home.results.colDist": "Dist.",
  "home.results.colMoving": "In Bewegung",
  "home.results.colElapsed": "Gesamt",
  "home.results.colSpeed": "Pace / Tempo",
  "home.results.colHr": "Ø HF",
  "home.results.colSensor": "Sensor",
  "home.results.colDrift": "Drift",
  "home.results.colBlocks": "Intervalle",
  "home.results.detail": "Einheit für Einheit",
  "home.results.detailIntro":
    "Klapp eine Einheit auf, um die Signale hinter jedem Urteil zu sehen. Besonders nützlich, um die Sensorerkennung zu beurteilen: Nur du weißt, welche Einheiten mit Brustgurt gelaufen sind.",
  "home.results.load": "Trainingsbelastung",
  "home.results.progression": "Aerobe Entwicklung",
  "home.results.progressionIntro":
    "HF bei gleicher Pace im Zeitverlauf: der einzige Formindikator, der weder von der Strecke noch von der Tagesform abhängt. Die Sensoren werden getrennt behandelt.",
  "home.results.projections": "Prognosen",

  "home.faq.title": "Häufige Fragen",
  "home.faq.q1": "Warum ist meine TCX-Datei zu groß für Gemini oder ChatGPT?",
  "home.faq.a1":
    "Eine einstündige TCX-Datei mit 1 Hz ist etwa 1,7 MB groß, davon fast 90 % XML-Tags, also rund 533.000 Tokens. Selbst wenn dieses Volumen ins Kontextfenster passt, argumentiert das Modell schlecht über Tausende Zeilen roher Koordinaten.",
  "home.faq.q2": "Werden meine Dateien an einen Server geschickt?",
  "home.faq.a2":
    "Nein. Die gesamte Berechnung läuft in deinem Browser, und du kannst das im Netzwerk-Tab prüfen. Ein GPS-Track enthält in seinen ersten und letzten Punkten deine Wohnadresse auf den Meter genau: Das Tool kürzt sie standardmäßig.",
  "home.faq.q3": "Wie errät das Tool, ob ich einen Brustgurt getragen habe?",
  "home.faq.a3":
    "Das deutlichste Merkmal ist das Einrasten auf die Kadenz: Ein optischer Sensor verwechselt die Schrittfrequenz mit dem Puls und zeigt zum Beispiel 172 bpm statt 140. Ein Brustgurt misst ein elektrisches Signal und kann diesen Fehler nicht machen. Hinzu kommen die Länge von Plateaus identischer Werte, die Schlag-zu-Schlag-Auflösung und die Reaktionszeit auf Tempowechsel. Es ist eine Heuristik: Ihre Konfidenz ist gedeckelt und wird angezeigt.",
  "home.faq.q4": "Warum wird die Drift bei manchen Einheiten nicht berechnet?",
  "home.faq.a4":
    "Weil sie dort nichts aussagen würde. Die Drift vergleicht die Effizienz zwischen den beiden Hälften einer <em>durchgehenden</em> Belastung. Bei Intervallen schwankt das Verhältnis von Tempo zu HF zwischen Wiederholungen und Pausen: Die Zahl wäre ein Artefakt. Das Tool sagt lieber, dass es nicht misst, als eine irreführende Zahl zu liefern.",
  "home.faq.q5": "Ist die angezeigte Temperatur die Lufttemperatur?",
  "home.faq.a5":
    "Nein. Der Sensor sitzt am Handgelenk und wird vom Körper erwärmt: Er misst meist 3 bis 8 °C zu hoch. Der Wert wird angezeigt, aber immer mit dieser Warnung, auch im Dossier, das an die KI geht.",
  "home.faq.q6": "Wie verlässlich ist eine Marathonprognose?",
  "home.faq.a6":
    "Gering, und das muss man sagen. Eine Studie mit 2.303 Hobbyläufern hat gezeigt, dass die Riegel-Formel bis zum Halbmarathon gut kalibriert ist, beim Marathon aber für die Hälfte der Läufer mindestens zehn Minuten zu schnelle Prognosen liefert. Ein Modell auf Basis echter Wettkampfergebnisse halbiert den Fehler ungefähr.",
  "home.faq.q7": "Welche Formate werden unterstützt?",
  "home.faq.a7":
    "TCX, GPX und FIT. <strong>Nimm am besten FIT</strong>: Es ist das native Format der meisten Uhren von Garmin, Coros, Wahoo und Suunto und das einzige, das Beckenbahnen einzeln sowie die Liste der gekoppelten Geräte enthält. So lässt sich sicher und nicht nur geschätzt sagen, ob du einen Brustgurt getragen hast. Der TCX-Export von Garmin Connect fasst alle Bahnen einer Schwimmeinheit in einer einzigen Zeile zusammen.",
  "home.faq.q8": "Die angezeigte Pace stimmt nicht mit Garmin Connect überein",
  "home.faq.a8":
    "Das ist ein Unterschied in der Konvention, kein Fehler. Die Pace wird hier auf die <strong>Bewegungszeit</strong> berechnet, wie bei Strava: Stopps an Ampeln und Pausen sind ausgenommen. Garmin Connect teilt durch die Gesamtdauer und zeigt daher eine langsamere Pace. Bei einem 16-km-Lauf in der Stadt beträgt der Unterschied leicht fünfzehn Sekunden pro Kilometer. Beide Dauern stehen nebeneinander, damit der Unterschied sichtbar ist, und das Dossier für die KI nennt die verwendete Konvention. Sonst würde ein Modell Zahlen vergleichen, die sich nicht vergleichen lassen.",
  "home.faq.q9": "Auch die Höhenmeter stimmen nicht",
  "home.faq.a9":
    "Lädst du eine FIT-Datei hoch, übernimmt das Tool die Höhenmeter, die der barometrische Höhenmesser deiner Uhr gemessen hat. In TCX oder GPX gibt es diese Information nicht: Sie wird aus der GPS-Höhe neu berechnet, was sie meist um 30 bis 50 % unterschätzt. Bei einem echten 16-km-Lauf waren es 61 berechnete gegenüber 140 gemessenen Metern. Ein weiterer Grund, FIT zu bevorzugen.",
  "home.faq.q10": "Die erkannte Sportart ist falsch, warum?",
  "home.faq.a10":
    "Das Tool traut der Bezeichnung in der Datei nicht, weil sie oft falsch ist: Eine Krafteinheit mit Laufabschnitten ist als „Laufen“ markiert, eine Beckeneinheit als „Sonstiges“. Die Klassifizierung erfolgt deshalb anhand der Form der Daten. Jede Einheit bekommt eine Stufe: vollständige Analyse für Laufen und Radfahren, eigene Behandlung für Schwimmen und für alles andere nur Zählung als Belastung. Eine Krafteinheit wirkt sich auf die Erholung aus, auch wenn ihre Pace nichts bedeutet.",

  "home.refs.title": "Worauf diese Berechnungen beruhen",
  "home.refs.intro":
    "Jede Kennzahl stützt sich auf eine veröffentlichte Arbeit. Hier ist, auf welche, und was jede davon nicht sagt.",
  "home.refs.minetti":
    "<strong>Steigungsbereinigte Pace.</strong> Minetti AE, et al. <em>Energy cost of walking and running at extreme uphill and downhill slopes.</em> J Appl Physiol. 2002;93(3):1039–46. <a href=\"https://doi.org/10.1152/japplphysiol.01177.2001\" rel=\"nofollow\">doi</a> · <a href=\"https://pubmed.ncbi.nlm.nih.gov/12183501/\" rel=\"nofollow\">PubMed</a>. Auf dem Laufband ermittelt: berücksichtigt weder technisches Gelände noch Muskelschäden bei langen Abstiegen.",
  "home.refs.sensors":
    "<strong>Abweichung zwischen HF-Sensoren.</strong> Gillinov S, et al. Med Sci Sports Exerc. 2017;49(8):1697–703. · Pasadyn SR, et al. Cardiovasc Diagn Ther. 2019;9(4):379–85. <a href=\"https://doi.org/10.21037/cdt.2019.06.05\" rel=\"nofollow\">doi</a>. Diese Arbeiten messen den Fehler optischer Sensoren; sie bieten keine Methode, ihn allein aus der Datei zu erkennen. Unsere Erkennung ist davon abgeleitet: Sie ist kein validiertes Protokoll.",
  "home.refs.riegel":
    "<strong>Zeitprognose.</strong> Riegel PS. <em>Athletic records and human endurance.</em> American Scientist. 1981;69(3):285–90. Kalibriert auf Weltrekorde, auf flacher Straße.",
  "home.refs.vickers":
    "<strong>Korrektur für Hobbyläufer.</strong> Vickers AJ, Vertosick EA. <em>An empirical study of race times in recreational endurance runners.</em> BMC Sports Sci Med Rehabil. 2016;8:26. <a href=\"https://doi.org/10.1186/s13102-016-0052-y\" rel=\"nofollow\">doi</a>. Der direkte Grund, warum eine Wettkampfzeit mehr zählt als eine Trainingsbelastung.",
  "home.refs.cs":
    "<strong>Kritische Geschwindigkeit.</strong> Jones AM, et al. <em>Critical power: implications for determination of V̇O₂max and exercise tolerance.</em> Med Sci Sports Exerc. 2010;42(10):1876–90. <a href=\"https://doi.org/10.1249/MSS.0b013e3181d9cf7f\" rel=\"nofollow\">doi</a>. Das Modell nimmt an, dass die kritische Geschwindigkeit unbegrenzt haltbar ist, was ab etwa 90 Minuten falsch ist.",
  "home.refs.coggan":
    "<strong>Normalisierte Leistung, TSS, Pa:Hr-Drift.</strong> Weit verbreitete Trainingsmethoden (Coggan, Friel), aber keine begutachteten Fachartikel. Der Unterschied zählt.",
  "home.refs.noteTitle": "Was diese Quellen nicht garantieren",
  "home.refs.note":
    "Sie begründen die Formeln, nicht die Schlussfolgerungen. Eine korrekt berechnete Zahl aus einem fehlerhaften Sensor bleibt falsch. Bei Schmerzen oder bevor du einen Trainingsplan änderst, hat der Rat einer Fachperson Vorrang vor diesem Tool und vor der KI, der du seine Ergebnisse gibst.",
  "home.footer": "MIT-Lizenz. Kein Konto, keine Werbung, kein Tracker.",

  "js.libError":
    "<strong>Die Bibliothek konnte nicht geladen werden.</strong>Starte die Seite mit <code>npm run dev</code>: Direkt aus dem Datei-Explorer geöffnet funktioniert sie nicht.",
  "js.vigilance": "{n} Warnhinweis(e) im Dossier enthalten",
  "js.indicShort": "Richtw.",
  "js.sensorSummary": "{file} — {label} (Konfidenz {confidence})",
  "js.noSignal": "Kein verwertbares Signal.",
  "js.signal": "{name}: <b>{value}</b> — {note}",
  "js.lock": "Einrasten auf die Kadenz: <b>{pct}</b>, <b>{n}</b> Abschnitt(e) von der Driftberechnung ausgeschlossen.",
  "js.sets": "Erkannte Serien: <b>{sets}</b>",
  "js.weather": "Luft <b>{temp} °C</b>{feels}{humidity}{wind} — Open-Meteo",
  "js.weatherFeels": " (gefühlt {temp})",
  "js.weatherHumidity": ", {pct} rel. Feuchte",
  "js.weatherWind": ", Wind {kmh} km/h",
  "js.drift":
    "Drift <b>{pct}</b> {badge} über {min} min bei {pace} ({coverage} der Einheit) — {interpretation}",
  "js.driftNone": "Drift nicht berechnet: {reason}",
  "js.hrr": "Herzfrequenzerholung: <b>{bpm} bpm</b> in 60 s{erosion}",
  "js.hrrErosion": ", Abnahme {bpm} bpm/Wiederholung",
  "js.adherence": "<b>{set}</b> — {grade}: {verdicts}",
  "js.progPace": "Pace",
  "js.progSensor": "Sensor",
  "js.progPoints": "Punkte",
  "js.progTrend": "Trend",
  "js.progReading": "Einordnung",
  "js.perWeek": "{value} bpm/Woche",
  "js.progNone":
    "Noch keine Verlaufsanalyse möglich: Dafür braucht es mindestens drei Laufeinheiten mit vergleichbarer Pace und demselben HF-Sensor.",
  "js.trendTitle": "HF bei {pace} — {source}",
  "js.projDistance": "Distanz",
  "js.projEstimate": "Schätzung",
  "js.projRange": "Spanne",
  "js.projReliability": "Verlässlichkeit",
  "js.projMethod": "Methode",
  "js.cs": "Kritische Geschwindigkeit <b>{pace}/km</b>, D' <b>{d} m</b>, R² <b>{r2}</b>",
  "js.projNone": "Keine Prognose: Es braucht mindestens eine Laufeinheit.",
  "js.redOriginal": "Deine Originaldateien",
  "js.redGenerated": "Erzeugtes Dossier",
  "js.redReduction": "Reduktion",
  "js.redCompat": "Kompatibilität",
  "js.sizeMb": "{value} MB — ~{tokens} Tokens",
  "js.sizeKb": "{value} KB — ~{tokens} Tokens",
  "js.compatTooBig": "⚠ zu groß für ChatGPT, Detailgrad verringern",
  "js.compatGemini": "⚠ nur Gemini",
  "js.compatOk": "✓ ChatGPT, Claude und Gemini",
  "js.truncated": "… Vorschau gekürzt, die Kopie enthält alles.",
  "js.download": "Dossier herunterladen (.txt)",
  "js.copy": "In die Zwischenablage kopieren",
  "js.copied": "Kopiert",
  "js.filename": "trainingsdossier.txt",

  "privacy.title": "Datenschutz: was deinen Browser verlässt und was nie",
  "privacy.description":
    "Deine GPS-Dateien werden nie an einen Server geschickt: Die gesamte Berechnung läuft in deinem Browser. Einzige Ausnahme ist das Wetter, das den Mittelpunkt der Strecke auf etwa einen Kilometer gerundet überträgt. Vollständige technische Details, überprüfbar.",
  "privacy.ld.q1": "Werden die GPS-Dateien an einen Server geschickt?",
  "privacy.ld.a1":
    "Nein. Einlesen und Analyse laufen im Browser, in JavaScript, auf dem Gerät des Nutzers. Keine Datei wird übertragen, was sich im Netzwerk-Tab der Entwicklerwerkzeuge prüfen lässt: Keine Anfrage enthält den Inhalt einer Datei.",
  "privacy.ld.q2": "Was wird an Dritte übertragen?",
  "privacy.ld.a2":
    "Nur die Wetteranfrage, wenn sie aktiviert ist: der Mittelpunkt der Strecke auf zwei Dezimalstellen gerundet (etwa 1,1 km Auflösung) und das Datum der Einheit, gesendet an Open-Meteo. Nie der Startpunkt, der meist der Wohnadresse entspricht, und nie physiologische Daten oder Kennungen.",
  "privacy.ld.q3": "Warum kürzt das Tool Anfang und Ende des Tracks?",
  "privacy.ld.a3":
    "Weil die ersten und letzten Punkte eines GPS-Tracks die Wohnadresse auf den Meter genau verraten. Diese Kürzung ist standardmäßig auf 250 Meter aktiv und gilt vor jedem Export, auch vor dem für eine künstliche Intelligenz.",
  "privacy.back": "← Zurück zum Tool",
  "privacy.h1": "Datenschutz",
  "privacy.lede":
    "Ein GPS-Track enthält deine Wohnadresse auf den Meter genau. Diese Seite sagt genau, was auf deinem Gerät bleibt, was es verlässt und wie du das selbst prüfen kannst.",
  "privacy.principle.title": "Das Prinzip",
  "privacy.principle.p1":
    "<strong>Deine Dateien werden nie übertragen.</strong> Dekodierung und Analyse laufen in JavaScript, in deinem Browser, auf deinem Gerät. Es gibt keinen Server, der sie empfängt. Das ist keine Richtlinie, sondern eine fehlende Infrastruktur.",
  "privacy.principle.p2":
    "Konkret: Du kannst nach dem Laden der Seite die Internetverbindung trennen, deine Dateien ablegen, und die Analyse funktioniert. Nur das Wetter schlägt fehl, was gerade beweist, dass es als Einziges hinausgeht.",
  "privacy.table.title": "Was hinausgeht, was nicht",
  "privacy.table.colData": "Daten",
  "privacy.table.colSent": "Übertragen?",
  "privacy.table.file": "Die Datei deiner Uhr",
  "privacy.table.fileText": "<strong>Nie.</strong> Vom Browser von der Festplatte gelesen, im Arbeitsspeicher analysiert.",
  "privacy.table.track": "Dein GPS-Track",
  "privacy.table.never": "<strong>Nie.</strong>",
  "privacy.table.physio": "Herzfrequenz, Pace, Leistung",
  "privacy.table.settings": "Maximale HF, Schwellenpace, eingegebene Zeiten",
  "privacy.table.settingsText":
    "<strong>Nie.</strong> Für die Dauer der Sitzung im Arbeitsspeicher gehalten und beim Schließen des Tabs verloren.",
  "privacy.table.dossier": "Das erzeugte Dossier",
  "privacy.table.dossierText":
    "<strong>Nie</strong> durch das Tool. Nur du kopierst oder lädst es herunter, und was du danach damit machst, liegt bei dir.",
  "privacy.table.midpoint": "Mittelpunkt der Strecke, gerundet",
  "privacy.table.midpointText": "<strong>Ja</strong>, wenn das Wetter aktiviert ist. Siehe unten.",
  "privacy.weather.title": "Das Wetter: die einzige Ausnahme",
  "privacy.weather.p1":
    "Der Temperatursensor einer Uhr sitzt am Handgelenk und wird vom Körper erwärmt: Er misst 3 bis 8 °C zu hoch und ignoriert Luftfeuchtigkeit und Wind. Dabei ist Hitze der wichtigste Störfaktor der kardialen Drift. Ohne echte Temperatur wird schlechter Form zugeschrieben, was nur die normalen thermischen Kosten sind.",
  "privacy.weather.p2": "Die Anfrage ist deshalb so gebaut, dass sie als Standortangabe unbrauchbar ist:",
  "privacy.weather.midTitle": "Wir senden den Mittelpunkt der Strecke, nie den Start",
  "privacy.weather.midText":
    "Der Startpunkt ist deine Wohnung. Der Mittelpunkt ist ein beliebiger Ort, ohne Bezug dazu, wo du schläfst.",
  "privacy.weather.roundTitle": "Die Koordinaten werden auf zwei Dezimalstellen gerundet",
  "privacy.weather.roundText":
    "Das entspricht etwa 1,1 km Auflösung. Wetter ist ein regionales Phänomen: Es geht keine Genauigkeit verloren, und die Anfrage bezeichnet keinen identifizierbaren Ort mehr.",
  "privacy.weather.nothingTitle": "Sonst wird nichts mitgeschickt",
  "privacy.weather.nothingText":
    "Keine Herzfrequenz, keine Pace, kein Track, keine Kennung, kein Cookie. Ein gerundeter Breitengrad, ein gerundeter Längengrad, ein Datum. Die vollständige Anfrage sieht so aus:",
  "privacy.weather.recipient":
    "Empfänger ist <a href=\"https://open-meteo.com\" rel=\"nofollow noopener\">Open-Meteo</a>, ein offener Wetterdienst. Die Funktion lässt sich über ein Auswahlmenü auf der Startseite abschalten, und das Tool funktioniert auch ohne sie.",
  "privacy.trim.title": "Die Kürzung um die Wohnung",
  "privacy.trim.text":
    "Die ersten und letzten Punkte eines Tracks verraten deine Haustür. Das Tool entfernt <strong>standardmäßig 250 Meter</strong> an Start und Ziel, vor jeder Analyse und vor jedem Export. Die Einstellung lässt sich ändern, und eine Option entfernt die Koordinaten vollständig, während Höhenprofil, Pace und Herzfrequenz erhalten bleiben.",
  "privacy.note.title": "Was wir nicht kontrollieren",
  "privacy.note.text":
    "Das Dossier, das du in ChatGPT, Gemini oder Claude kopierst, verlässt deinen Browser in dem Moment, in dem du es einfügst, und unterliegt dann den Bedingungen dieses Dienstes, nicht unseren. Enthält das Dossier noch Koordinaten, gehen sie mit. Genau deshalb ist die Option „Koordinaten entfernen“ beim Export standardmäßig aktiv.",
  "privacy.dont.title": "Was wir nicht tun",
  "privacy.dont.1": "Kein Konto, keine Registrierung, kein Passwort.",
  "privacy.dont.2": "Kein Cookie, kein Werbe-Tracker, kein Pixel.",
  "privacy.dont.3": "Keine Werbung, also kein Interesse daran, irgendetwas zu sammeln.",
  "privacy.dont.4": "Kein Verkauf von Daten: Es gibt keine zu verkaufen.",
  "privacy.dont.analytics":
    "Falls jemals eine Reichweitenmessung eingeführt wird, dann ohne Cookie und ohne dauerhafte Kennung, und diese Seite wird vorher aktualisiert.",
  "privacy.verify.title": "Prüf es selbst",
  "privacy.verify.p1":
    "Verlass dich nicht auf unser Wort. Öffne die Entwicklerwerkzeuge deines Browsers (<code>F12</code>), Tab <strong>Netzwerk</strong>, und lege eine Datei ab. Du siehst das Laden der Seite und, wenn das Wetter aktiviert ist, eine Anfrage an <code>open-meteo.com</code>. Sonst nichts. Keine Anfrage enthält den Inhalt deiner Datei.",
  "privacy.verify.p2":
    "Der <a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">Quellcode ist offen</a>, unter MIT-Lizenz: Was die Seite tut, lässt sich Zeile für Zeile nachlesen.",
  "privacy.rights.title": "Deine Rechte",
  "privacy.rights.text":
    "Da keine personenbezogenen Daten erhoben oder gespeichert werden, gibt es keine Daten, die du einsehen, berichtigen oder löschen lassen könntest: Den Tab zu schließen, löscht alles. Für Fragen kannst du im oben genannten GitHub-Repository eine Diskussion eröffnen.",
  "privacy.footerTool": "Das Tool",
  "privacy.updated": "Zuletzt aktualisiert: <time datetime=\"2026-09-25\">25. September 2026</time>.",
  "common.blog": "Blog",
  "home.why.more":
    "Warum eine KI ein strukturiertes Dossier statt einer Rohdatei braucht: <a href=\"{{href:post-ia-analyse.html}}\">zum Artikel</a>.",

  "blog.title": "gps-digest Blog: Training, Uhrendaten und KI",
  "blog.description":
    "Artikel über KI-gestützte Trainingsanalyse: was ChatGPT, Gemini und Claude mit deinen Einheiten anfangen können und wie du ihnen Daten gibst, die sie wirklich nutzen können.",
  "blog.lede":
    "Training, Uhrendaten und künstliche Intelligenz. Kurze Artikel, mit Zahlen belegt und ohne Versprechen, die die Daten nicht halten.",
  "blog.readMore": "Artikel lesen",

  "post.title": "Lauftraining mit ChatGPT analysieren: die Token-Falle",
  "post.description":
    "KI analysiert ein Training hervorragend, aber eine einstündige TCX-Datei hat 533.000 Tokens. Warum das scheitert und wie du es in drei Minuten löst.",
  "post.kicker": "Training und KI",
  "post.h1": "ChatGPT kann deine Laufeinheiten analysieren. Vorausgesetzt, es kann sie überhaupt lesen.",
  "post.meta": "Veröffentlicht am <time datetime=\"2026-09-28\">28. September 2026</time> · 7 Min. Lesezeit",
  "post.lede":
    "Frag eine KI, warum sich die Intervalle am Dienstag so hart angefühlt haben, und sie antwortet dir besser als die meisten Trainings-Apps. Unter einer Bedingung: Sie muss deine Daten wirklich sehen. Genau da wird es schwierig, und nicht aus dem Grund, den du vermutest.",
  "post.tldrTitle": "Das Wichtigste in Kürze",
  "post.tldr1":
    "ChatGPT, Gemini und Claude können eine Einheit interpretieren, sie mit deinem Ziel verknüpfen und Folgefragen beantworten, wie ein Coach, der rund um die Uhr erreichbar ist.",
  "post.tldr2":
    "Eine einstündige TCX-Datei mit 1 Hz ist etwa 1,7 MB groß, also rund 533.000 Tokens, und fast 90 % davon sind XML-Tags.",
  "post.tldr3": "Selbst wenn die Datei durchgeht, argumentiert das Modell schlecht über Tausende Zeilen roher Koordinaten.",
  "post.tldr4":
    "Die Lösung ist nicht Komprimieren, sondern Umstrukturieren: Kilometerzeiten, Runden, Zonen, Wiederholungen. Eine Einheit passt dann in etwa 5.800 Tokens, und die Analyse wird besser.",

  "post.why.title": "Warum ist KI ein so guter Trainingspartner?",
  "post.why.p1":
    "Weil sie von deiner Frage ausgeht, nicht von einem Dashboard. Eine App zeigt dir dieselben Diagramme wie allen anderen. Eine KI kann dir erklären, warum deine Pace bei Kilometer 8 eingebrochen ist, und dabei die Hitze, deine volle Woche und das Ziel berücksichtigen, das du ihr genannt hast.",
  "post.why.listIntro": "Mit guten Daten kann eine KI:",
  "post.why.li1": "eine Einheit in einfacher Sprache erklären, ohne Fachjargon;",
  "post.why.li2":
    "deine Zahlen mit deinem Ziel verknüpfen: 10 km unter 45 Minuten verlangen andere Einheiten als ein erster Marathon;",
  "post.why.li3": "mehrere Wochen vergleichen und einen Trend erkennen, den du übersehen hast;",
  "post.why.li4":
    "die nächste Frage beantworten und die danach, mit der Geduld eines Coaches, der um 23 Uhr noch erreichbar ist;",
  "post.why.li5": "die kommende Woche auf Basis deiner tatsächlichen Belastung planen statt nach einem Standardplan.",
  "post.why.p2":
    "Diese Personalisierung macht den Unterschied. Sie beruht aber auf einer Annahme, die fast niemand prüft: dass das Modell wirklich Zugriff auf deine Daten hat und nicht nur auf eine dreizeilige Zusammenfassung oder eine unlesbare Datei.",

  "post.tokens.title": "Was ist ein Token, und warum erzeugt deine Uhr so viele davon?",
  "post.tokens.p1":
    "Ein Token ist die Texteinheit, die ein Sprachmodell liest und abrechnet: ein Stück eines Wortes, einer Zahl oder eines Satzzeichens. Jedes Modell hat eine Grenze, sein Kontextfenster, jenseits dessen es nichts mehr lesen kann. Je nach Modell und Abo reicht sie heute von einigen Zehntausend bis zu einigen Millionen Tokens.",
  "post.tokens.p2":
    "Das Problem: Uhrendateien sind für Software gemacht, nicht zum Lesen. Eine TCX-Datei wiederholt für jede Sekunde deines Laufs dieselben XML-Tags. Das hat unser Benchmark gemessen:",
  "post.tokens.colCase": "Daten",
  "post.tokens.colSize": "Größe",
  "post.tokens.colTokens": "Geschätzte Tokens",
  "post.tokens.r1": "Eine einstündige Einheit, rohe TCX-Datei",
  "post.tokens.r1size": "1,7 MB",
  "post.tokens.r1tokens": "≈ 533.000",
  "post.tokens.r2": "Dieselbe Einheit als strukturiertes Dossier",
  "post.tokens.r2size": "≈ 18 KB",
  "post.tokens.r2tokens": "≈ 5.800",
  "post.tokens.r3": "15 MB echte Dateien, roh",
  "post.tokens.r3size": "15 MB",
  "post.tokens.r3tokens": "≈ 4,7 Millionen",
  "post.tokens.r4": "Dieselben Dateien als strukturiertes Dossier",
  "post.tokens.r4size": "≈ 100 KB",
  "post.tokens.r4tokens": "≈ 32.000",
  "post.tokens.note":
    "Schätzung mit 3,2 Zeichen pro Token, dem bei numerischem CSV beobachteten Verhältnis. Die Messungen lassen sich mit dem im Quellcode veröffentlichten Benchmark nachvollziehen.",
  "post.tokens.p3":
    "Anders gesagt: Schon eine einzige Rohdatei kann ein normales Abo ausreizen, und eine ganze Saison passt nirgendwo hinein.",

  "post.paste.title": "Was passiert, wenn man eine TCX-Datei in ChatGPT einfügt?",
  "post.paste.intro": "Drei mögliche Szenarien. Keines davon ist gut.",
  "post.paste.h1": "1. Die Datei wird abgelehnt",
  "post.paste.p1":
    "Das ist der ehrlichste Fall: Die Oberfläche meldet, dass die Datei zu groß ist. Du verlierst Zeit, aber wenigstens weißt du es.",
  "post.paste.h2": "2. Die Datei wird nur teilweise gelesen, ohne dass du es merkst",
  "post.paste.p2":
    "Bei großen Anhängen lesen Assistenten oft nur Auszüge oder übergeben die Datei an ein Skript, das sie zusammenfasst. Die KI antwortet dann selbstsicher auf Basis eines Teils der Einheit. Die Antwort klingt richtig. Sie muss es nicht sein.",
  "post.paste.h3": "3. Die Datei geht durch, aber die Analyse ist mittelmäßig",
  "post.paste.p3":
    "Selbst mit einem großen Kontextfenster nutzt ein Modell Informationen schlecht, die mitten in einem langen Dokument stehen. Forschende der Stanford University haben diesen Effekt als „Lost in the Middle“ beschrieben (Liu et al., 2024). Eine Trainingsanalyse aus 3.600 Zeilen Breiten- und Längengraden zu verlangen, heißt, es Kopfrechnungen machen zu lassen, die ihm schlecht gelingen, mit Daten, die ihm kaum etwas sagen.",

  "post.restructure.title": "Soll man die Datei komprimieren? Nein, umstrukturieren",
  "post.restructure.p1":
    "Die Datei kleiner zu machen reicht nicht: Sie muss lesbar werden. Ein Coach liest deine GPS-Koordinaten nicht Sekunde für Sekunde. Er schaut auf deine Kilometerzeiten, deine Wiederholungen und deine Herzfrequenz nach Zonen. Genau das kann ein Sprachmodell interpretieren.",
  "post.restructure.colRaw": "In der Rohdatei",
  "post.restructure.colDossier": "In einem strukturierten Dossier",
  "post.restructure.r1raw": "3.600 Zeilen Breitengrad, Längengrad und Höhe",
  "post.restructure.r1dossier": "Kilometerzeiten, Runden, Zeit in jeder Zone",
  "post.restructure.r2raw": "Ein Herzfrequenzwert pro Sekunde",
  "post.restructure.r2dossier": "Die kardiale Drift bereits berechnet, mit dem gemessenen Abschnitt",
  "post.restructure.r3raw": "Kein Hinweis auf den Herzfrequenzsensor",
  "post.restructure.r3dossier": "Brustgurt oder Handgelenk, mit Konfidenzniveau",
  "post.restructure.r4raw": "XML-Tags, an jedem Punkt wiederholt",
  "post.restructure.r4dossier": "CSV-Tabellen mit expliziten Einheiten",
  "post.restructure.p2":
    "Bei 15 MB echten Dateien umfasst das Dossier etwa 32.000 Tokens. Und die Analyse daraus ist besser als mit den vollständigen Dateien. Nicht nur günstiger: besser, weil das Modell mit Objekten arbeitet, die es versteht.",

  "post.blind.title": "Was kann eine KI nicht von selbst erkennen?",
  "post.blind.p1":
    "Manche Fehler sieht man den Zahlen nicht an. Wenn nichts sie kennzeichnet, hält die KI sie für Fakten und baut ihre Analyse darauf auf.",
  "post.blind.li1":
    "<strong>Der Herzfrequenzsensor.</strong> Ein Handgelenksensor verwechselt manchmal deine Schrittfrequenz mit deinem Puls und zeigt 172 bpm statt 140. Eine Einheit mit Handgelenksensor mit einer Brustgurt-Einheit zu vergleichen, heißt zwei Messgeräte zu vergleichen, nicht zwei Formzustände.",
  "post.blind.li2":
    "<strong>Die Temperatur.</strong> Der Sensor der Uhr wird von deinem Handgelenk erwärmt: Er misst die Luft 3 bis 8 °C zu hoch. Eine KI, die das für das Wetter hält, irrt sich bei der Ursache deiner kardialen Drift.",
  "post.blind.li3":
    "<strong>Die Pace.</strong> Strava berechnet sie auf die Bewegungszeit, Garmin Connect auf die Gesamtdauer. Bei einem Lauf in der Stadt beträgt der Unterschied leicht mehr als 15 Sekunden pro Kilometer.",
  "post.blind.li4":
    "<strong>Werte ohne Aussagekraft.</strong> Eine kardiale Drift, berechnet auf einem Intervalltraining, bedeutet nichts. Lieber keine Zahl als eine falsche, die glaubwürdig aussieht.",
  "post.blind.p2":
    "Ein gutes Dossier fasst nicht nur zusammen. Es sagt, was verlässlich ist und was nicht, damit die KI nicht auf Sand argumentiert.",

  "post.howto.title": "Wie lässt du deine Einheiten in drei Minuten von einer KI analysieren?",
  "post.howto.step1":
    "<strong>Exportiere deine Dateien</strong> aus deiner Uhr oder aus Strava, am besten im FIT-Format, dem vollständigsten.",
  "post.howto.step2":
    "<strong>Lege sie in gps-digest ab.</strong> Alles wird in deinem Browser berechnet: Keine Datei wird an einen Server geschickt.",
  "post.howto.step3": "<strong>Kopiere das Dossier</strong> in ChatGPT, Gemini oder Claude und stelle deine Frage.",
  "post.howto.cta": "Meine Einheiten für die KI vorbereiten",

  "post.prompts.title": "Welche Fragen solltest du deiner KI stellen?",
  "post.prompts.intro":
    "Die besten Fragen entstehen aus echtem Zweifel. Hier sind fünf Beispiele, die mit einem strukturierten Dossier gut funktionieren:",
  "post.prompts.q1": "„Ist meine kardiale Drift im Vergleich zum Vormonat gestiegen, bei ähnlicher Temperatur?“",
  "post.prompts.q2": "„Habe ich bei den Wiederholungen am Dienstag meine Pace gehalten? Was sollte ich nächstes Mal ändern?“",
  "post.prompts.q3": "„Bin ich mit dieser Belastung in sechs Wochen bereit für 10 km unter 45 Minuten?“",
  "post.prompts.q4": "„Passt meine Verteilung zwischen lockeren Läufen und harten Einheiten zu einem Marathon?“",
  "post.prompts.q5": "„Plan mir die nächste Woche unter Berücksichtigung meiner aktuellen Ermüdung.“",

  "post.faq.title": "Häufige Fragen",
  "post.faq.q1": "Kann ChatGPT eine FIT- oder TCX-Datei direkt lesen?",
  "post.faq.a1":
    "Es kann sie öffnen, aber nicht richtig auswerten. FIT ist ein Binärformat, das die KI mit einem Skript dekodieren muss, und eine einstündige TCX-Datei hat etwa 533.000 Tokens. In beiden Fällen stützt sich die Analyse auf Auszüge oder auf ungeeignete Rohdaten. Ein strukturiertes Dossier löst beide Probleme.",
  "post.faq.q2": "Warum nicht einfach eine CSV aus Garmin Connect exportieren?",
  "post.faq.a2":
    "Weil dieser Export sich im Wesentlichen auf die Runden beschränkt. Er enthält weder die kardiale Drift noch die Sensorerkennung noch die Details der Wiederholungen, und auch nicht den Kontext, der Fehldeutungen verhindert, etwa wie die Pace berechnet wurde.",
  "post.faq.q3": "Werden meine Daten irgendwohin geschickt?",
  "post.faq.a3":
    "Nein. Deine Dateien werden in deinem Browser gelesen und analysiert. Nur das Dossier, das du selbst in eine KI kopierst, verlässt dein Gerät, und die GPS-Koordinaten werden standardmäßig daraus entfernt.",
  "post.faq.q4": "Kann eine KI einen Trainer ersetzen?",
  "post.faq.a4":
    "Nein, und darum geht es auch nicht. Sie erklärt, vergleicht und schlägt vor, aber sie sieht dich nicht laufen und spürt deine Beschwerden nicht. Bei Verletzungen oder ernsthaften Zweifeln hat der Rat einer Fachperson Vorrang.",
  "post.faq.q5": "Welche KI solltest du nutzen: ChatGPT, Gemini oder Claude?",
  "post.faq.a5":
    "Alle drei können ein strukturiertes Dossier analysieren. Der eigentliche Unterschied liegt in der Größe des Kontextfensters deines Abos. Mit einem Dossier von einigen Tausend Tokens pro Einheit spielt die Frage keine Rolle mehr.",

  "post.sources.title": "Quellen",
  "post.sources.liu":
    "Liu NF, et al. <em>Lost in the Middle: How Language Models Use Long Contexts.</em> Transactions of the Association for Computational Linguistics, 2024. <a href=\"https://arxiv.org/abs/2307.03172\" rel=\"nofollow\">arXiv:2307.03172</a>.",
  "post.sources.bench":
    "Größen- und Token-Messungen: gps-digest-Benchmark, reproduzierbar, im <a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">offenen Quellcode</a>.",

  "post.end.title": "Deine nächste Einheit verdient mehr als ein Standarddiagramm",
  "post.end.text":
    "Verwandle deine Uhrendateien in ein Dossier, das ChatGPT, Gemini oder Claude wirklich analysieren können. Kostenlos, ohne Konto, und deine Dateien verlassen deinen Browser nicht.",
  "post.end.cta": "gps-digest ausprobieren",
};
