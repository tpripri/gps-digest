/** Catalogue de page : allemand. Clés et emplacements : voir page-i18n.ts. */

import type { PageCatalog } from "./page-i18n.ts";

export const de: Partial<PageCatalog> = {
  "common.langs": "Sprache",
  "common.footerNav": "Fußzeile",
  "common.privacy": "Datenschutz",
  "common.source": "Quellcode",

  "home.title": "Garmin- und Strava-Läufe mit ChatGPT analysieren — gps-digest",
  "home.description":
    "Exportiere deine Einheiten von Garmin, Strava oder Apple Watch und lass sie von ChatGPT, Claude oder Gemini analysieren. Kostenlos, ohne Konto, ohne Upload.",
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
    "Nein. Die gesamte Berechnung läuft in deinem Browser. Keine Datei geht über einen Server, und du kannst das im Netzwerk-Tab prüfen. Ein GPS-Track verrät deine Wohnadresse auf den Meter genau: Die Koordinaten werden standardmäßig aus dem Dossier entfernt.",
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
    "<strong>Deine Dateien verlassen deinen Browser nicht.</strong> Die gesamte Berechnung läuft auf deinem Gerät, und du kannst das im Netzwerk-Tab prüfen. Ein GPS-Track verrät deine Adresse auf den Meter genau, deshalb werden die Koordinaten standardmäßig aus dem Dossier entfernt. <a href=\"{{href:confidentialite.html}}\">Was hinausgeht und was nie hinausgeht</a>.",
  "home.step1.title": "Lade dein Strava-Archiv herunter",
  "home.step1.text": "Auf <a href=\"https://www.strava.com/account\" rel=\"noopener\">strava.com/account</a> unter „Download your account“. Strava schickt dir ein ZIP per E-Mail, meist innerhalb weniger Stunden. Eilig oder nicht bei Strava? Exportiere einzelne Einheiten: <a href=\"{{href:guide-garmin.html}}\">Garmin</a> · <a href=\"{{href:guide-strava.html}}\">Strava</a> · <a href=\"{{href:guide-apple.html}}\">Apple Watch</a>.",
  "home.step1.badge":
    "Empfohlen",
  "home.step2.title": "Lege das ZIP hier ab, so wie es ist",
  "home.step2.text": "Das Tool behält deine letzten 12 Monate und ignoriert Fotos und Routen. Alles wird in deinem Browser berechnet: Deine Dateien werden nirgendwohin hochgeladen.",
  "home.step3.title": "Füge das Dossier in deine KI ein",
  "home.step3.text": "ChatGPT, Claude, Gemini oder Vibe, mit deiner Frage. <a href=\"{{href:post-ia-coach.html}}\">Was fragen?</a>",

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

  "home.set.title": "Analyse verfeinern (optional): maximale HF, letzter Wettkampf, Wetter",
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
  "home.set.privacy": "Privatsphäre-Zone",
  "home.set.privacyHint": "Radius in Metern, in dem Positionen gelöscht werden, wenn du die Koordinaten behältst. Kürzt die Einheit nie.",
  "home.set.weather": "Lufttemperatur",
  "home.set.weatherOn": "Echtes Wetter abrufen",
  "home.set.weatherOff": "Nichts senden",
  "home.set.weatherHint":
    "Sendet den <strong>Mittelpunkt</strong> der Strecke, auf ~1 km gerundet, und das Datum an Open-Meteo. Nie deinen Start, nie deine Daten.",

  "home.files.title": "Deine Dateien",
  "home.reads.title":
    "Anleitungen und Artikel",
  "home.files.drop": "Dateien hier ablegen",
  "home.files.formats": "Dein komplettes Strava-Archiv, ein Garmin-ZIP oder FIT-, TCX- und GPX-Dateien: Alles funktioniert direkt.",
  "home.files.fit":
    "FIT ist das native Format deiner Uhr: Nur es enthält die Beckenbahnen und den tatsächlich gekoppelten Herzfrequenzsensor.",
  "home.files.pick": "Dateien auswählen",
  "home.archive.period":
    "Analysierter Zeitraum:",
  "home.archive.p3m":
    "Letzte 3 Monate",
  "home.archive.p6m":
    "Letzte 6 Monate",
  "home.archive.p1y":
    "Letzte 12 Monate",
  "home.archive.p2y":
    "Letzte 2 Jahre",
  "home.archive.pAll":
    "Gesamter Verlauf",

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
    "Nein. Die gesamte Berechnung läuft in deinem Browser, und du kannst das im Netzwerk-Tab prüfen. Ein GPS-Track verrät deine Wohnadresse auf den Meter genau: Die Koordinaten werden standardmäßig aus dem Dossier entfernt, und eine Privatsphäre-Zone löscht die an Start und Ziel, wenn du sie behalten willst.",
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
    "<strong>Das Tool konnte nicht geladen werden.</strong> Prüfe deine Verbindung und lade die Seite neu. In einem Firmennetz kann ein Sicherheitsfilter die Seite blockieren: Versuch es über eine andere Verbindung.",
  "js.archiveNote":
    "<strong>Archiv:</strong> {kept} von {total} Einheiten übernommen. Die letzten {days} Tage sind Einheit für Einheit detailliert; der Rest des Zeitraums steht mit einer Zeile pro Einheit im Dossier.",
  "js.archiveProgress":
    "Archiv wird gelesen: {n} Einheiten übernommen ({read} Dateien gelesen)…",
  "js.olderInTable":
    "Details für die Einheiten der letzten {days} Tage. Die {n} älteren stehen in der Tabelle der Einheiten und im Dossier.",
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
  "privacy.ld.q3": "Wie schützt das Tool deine Wohnadresse?",
  "privacy.ld.a3":
    "Die ersten und letzten Punkte eines GPS-Tracks verraten deine Wohnadresse auf den Meter genau. Standardmäßig enthält das Dossier keine einzige Koordinate. Wenn du sie behalten willst, löscht eine einstellbare Privatsphäre-Zone die Positionen nahe Start und Ziel, ohne die Einheit zu kürzen: Distanzen, Dauern und Berechnungen bleiben vollständig.",
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
  "privacy.trim.title": "Die Privatsphäre-Zone",
  "privacy.trim.text":
    "Die ersten und letzten Punkte eines Tracks verraten deine Haustür. Standardmäßig <strong>enthält das Dossier keine einzige Koordinate</strong>: Höhenprofil, Tempo und Herzfrequenz reichen für die Analyse. Wenn du die Koordinaten behalten willst, stelle eine Privatsphäre-Zone ein: Positionen in diesem Radius um Start und Ziel werden gelöscht, auch wenn der Track später wieder nahe an deiner Wohnung vorbeiführt. Die Einheit wird nie gekürzt: Distanzen, Dauern und Berechnungen beziehen sich auf die vollständige Aufzeichnung, und das Dossier sagt das der KI.",
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
  "privacy.updated": "Zuletzt aktualisiert: <time datetime=\"2026-09-29\">29. September 2026</time>.",
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
  "post.next":
    "Wie aus diesen Fragen eine echte Begleitung Woche für Woche wird: <a href=\"{{href:post-ia-coach.html}}\">einen KI-Coach in ChatGPT, Claude, Gemini oder Vibe einrichten</a>.",

  "coach.title": "ChatGPT, Claude, Gemini oder Vibe als Lauftrainer nutzen",
  "coach.description":
    "Athletenprofil, Coach-Regeln zum Kopieren, Einrichtung in ChatGPT, Claude, Gemini und Vibe, und wie du ihnen deine Einheiten kostenlos gibst.",
  "coach.kicker": "Praxisleitfaden",
  "coach.h1": "So machst du ChatGPT, Claude, Gemini oder Vibe zu deinem Lauftrainer",
  "coach.meta": "Veröffentlicht am <time datetime=\"2026-09-29\">29. September 2026</time> · 11 Min. Lesezeit",
  "coach.lede":
    "Ein Coach, der deine Einheiten, dein Ziel und deine empfindliche Wade kennt, um 23 Uhr erreichbar, ohne einen Cent extra: Das versprechen KI-Assistenten. Das Versprechen hält, unter zwei Bedingungen. Du musst sie einmal richtig briefen, sonst behandeln sie dich bei jeder Einheit wie einen Fremden. Und du musst ihnen deine Einheiten geben, was viel schwieriger ist, als es klingt.",
  "coach.tldr1":
    "Eine KI ist ein guter Coach, wenn sie drei Dinge hat: dein Profil, deine echten Einheiten und klare Regeln. Ohne sie spult sie einen Standardplan ab.",
  "coach.tldr2":
    "Das Schwierigste ist, ihr deine Einheiten zu geben. Der offizielle Strava-Connector kostet Geld und funktioniert nur mit Claude. Der Dateiexport ist kostenlos und funktioniert überall, aber eine Rohdatei ist zu schwer: Sie muss komprimiert werden.",
  "coach.tldr3":
    "ChatGPT, Claude und Vibe haben Projekte, Gemini hat Gems: Athletenprofil und Regeln bleiben dort von einem Gespräch zum nächsten erhalten. Alle gibt es in der kostenlosen Version.",
  "coach.tldr4":
    "Die Routine, die funktioniert: eine Auswertung pro Woche, in einem neuen Gespräch, mit deinen Einheiten und einer Zeile zu deinem Befinden. Und behalte das Steuer in der Hand: Eine KI neigt dazu, dir recht zu geben.",

  "coach.can.title": "Kann eine KI dich wirklich coachen?",
  "coach.can.p1":
    "Ja, für einen großen Teil der Arbeit eines Coaches: deine Einheiten lesen, sie mit deinem Ziel verbinden und das Weitere anpassen. Nein, für alles, wofür man dich sehen oder anfassen muss. Die Grenze ist klar, und es lohnt sich, sie vorher zu kennen.",
  "coach.can.goodIntro": "Was eine KI gut kann:",
  "coach.can.good1": "eine Einheit analysieren und mit Zahlen sagen, ob sie ihren Zweck erfüllt hat;",
  "coach.can.good2":
    "deine Woche umbauen, wenn das Leben dazwischenkommt: eine Reise, eine Erkältung, ein Meeting, das länger dauert;",
  "coach.can.good3": "erklären, warum eine Einheit sinnvoll ist, was viele fertige Pläne nie tun;",
  "coach.can.good4": "um 23 Uhr antworten, ohne von deiner zehnten Frage genervt zu sein.",
  "coach.can.badIntro": "Was sie nie tun wird:",
  "coach.can.bad1": "dich laufen sehen, also weder Laufstil noch Haltung korrigieren;",
  "coach.can.bad2": "merken, dass du müder bist, als du sagst;",
  "coach.can.bad3": "einen Schmerz diagnostizieren.",
  "coach.can.p2":
    "Sieh sie als sehr gut erreichbaren Trainer, der dich nie hat laufen sehen. Alles, was sie über dich weiß, ist das, was du ihr zu lesen gibst. Daher das Folgende.",

  "coach.need.title": "Was muss dein KI-Coach wissen, bevor es losgeht?",
  "coach.need.p1": "Drei Dinge. Fehlt eines, bricht die Qualität der Ratschläge ein.",
  "coach.need.li1":
    "<strong>Dein Profil.</strong> Dein Niveau, dein Ziel, deine Einschränkungen und deine Schwachstellen. Ohne Profil behandelt dich die KI wie einen Durchschnittsläufer, den es nicht gibt.",
  "coach.need.li2":
    "<strong>Deine echten Einheiten.</strong> Nicht deine Erinnerungen, sondern deine Daten. Das ist die schwierigste Zutat, dazu gleich mehr.",
  "coach.need.li3":
    "<strong>Klare Regeln.</strong> Wie sie denken soll, was sie ablehnen soll, in welcher Form sie antwortet. Das unterscheidet einen Coach von einem Ratschlag-Automaten.",
  "coach.sheet.title": "Das Athletenprofil, einmal ausfüllen",
  "coach.sheet.intro":
    "Kopiere diese Vorlage, fülle sie in fünf Minuten aus und speichere sie als Textdatei. Aktualisiere sie nach jedem Wettkampf oder wenn sich dein Ziel ändert.",
  "coach.sheet.text":
    "ATHLETENPROFIL\nAlter, Geschlecht, Laufjahre:\nAktueller Umfang (km und Läufe pro Woche):\nBestzeiten der letzten 12 Monate (5 km, 10 km, Halbmarathon, Marathon):\nMaximale HF und Ruhe-HF, falls bekannt:\nZiel (Wettkampf, Distanz, Datum, Zielzeit):\nVerfügbarkeit (mögliche Tage, längste Einheit):\nFrühere Verletzungen und Schwachstellen:\nAusrüstung (Uhr, Brustgurt oder Handgelenkssensor):\nWas ich am Training liebe und was ich hasse:",

  "coach.data.title": "Wie gibst du deinem KI-Coach deine Einheiten?",
  "coach.data.p1":
    "Diesen Schritt überspringen die meisten Ratgeber, und er ist der schwierigste. Deine KI sieht deine Uhr nicht: Du musst ihr die Einheiten bringen. Es gibt zwei Wege, und sie kosten nicht dasselbe.",
  "coach.data.strava.title": "Der Strava-Connector: bequem, aber kostenpflichtig und nur für Claude",
  "coach.data.strava.p":
    "Seit Juni 2026 bietet Strava einen offiziellen Connector an, einen MCP-Server, über den Claude deinen Verlauf direkt lesen kann. Das ist bequem: kein Export mehr, die KI holt sich, was sie braucht. Aber du brauchst ein kostenpflichtiges Strava-Abo, und der Connector funktioniert nur mit Claude. Strava verspricht weitere Assistenten für später, ohne Datum. Für ChatGPT, Gemini oder Vibe hat Strava bisher keinen offiziellen Connector, und inoffizielle erfordern eine technische Einrichtung.",
  "coach.data.garmin.title":
    "Drittanbieter für Garmin: ein weiterer Weg, mit Zwischenhändler",
  "coach.data.garmin.p":
    "Bei Garmin übernehmen Drittanbieter die Brücke. Tredict, offizieller Garmin-Partner, bietet eine App in ChatGPT, die sogar mit einem kostenlosen ChatGPT-Konto funktioniert, und einen MCP-Server für Claude. Shape macht dasselbe für 5 Dollar im Monat, verlangt aber ein bezahltes ChatGPT-Abo. In beiden Fällen legst du ein Konto bei einem Dritten an und gibst ihm deine Garmin-Daten. Das lohnt sich, wenn du auch Einheiten auf deine Uhr schicken willst. Um deine Läufe analysieren zu lassen, bleibt der Export kostenlos und läuft über niemanden.",
  "coach.data.export.title": "Dateiexport: kostenlos und universell, wenn du komprimierst",
  "coach.data.export.p1":
    "Garmin Connect, Coros, Polar Flow und Strava lassen dich eine Einheit kostenlos als FIT, TCX oder GPX exportieren. Diese Datei funktioniert mit jeder KI, auch in den kostenlosen Versionen. Der Haken ist ihre Größe: Eine Stunde Laufen als TCX sind etwa 533.000 Tokens, genug, um eine kostenlose Version mit einer einzigen Einheit zu sprengen (<a href=\"{{href:post-ia-analyse.html}}\">warum das so ist</a>).",
  "coach.data.export.p2":
    "Die Lösung: die Datei komprimieren und umstrukturieren, bevor die KI sie bekommt. gps-digest macht daraus ein Dossier von etwa 5.800 Tokens pro Einheit, mit Kilometerzeiten, Zonen, Wiederholungen, kardialer Drift und der Zuverlässigkeit des Sensors. Jeder Assistent, kostenlos oder bezahlt, liest es vollständig.",
  "coach.data.colStrava": "Strava-Connector",
  "coach.data.colExport": "Export + gps-digest",
  "coach.data.r1": "Kosten",
  "coach.data.r1strava": "Kostenpflichtiges Strava-Abo",
  "coach.data.r1export": "Kostenlos",
  "coach.data.r2": "Kompatible Assistenten",
  "coach.data.r2strava": "Bisher nur Claude",
  "coach.data.r2export": "Alle: ChatGPT, Claude, Gemini, Vibe und die anderen",
  "coach.data.r3": "Aufwand",
  "coach.data.r3strava": "Keiner, sobald verbunden",
  "coach.data.r3export": "Ein Export und einmal Ziehen und Ablegen pro Woche",
  "coach.data.r4": "Was die KI bekommt",
  "coach.data.r4strava": "Die Strava-Daten, zusammengefasst oder sekundengenau",
  "coach.data.r4export": "Ein fertig berechnetes Dossier: Zonen, Wiederholungen, Drift, Zuverlässigkeit des Sensors",
  "coach.data.r5": "GPS-Koordinaten",
  "coach.data.r5strava": "Für die KI zugänglich",
  "coach.data.r5export": "Standardmäßig entfernt",
  "coach.data.p3":
    "Strava-Abonnent und Claude-Nutzer? Dann spart dir der Connector ein paar Minuten pro Woche. Für alle anderen funktioniert der kostenlose Export sehr gut. Du musst die Dateien nur komprimieren, bevor die KI sie bekommt.",

  "coach.rules.title": "Die Coach-Anweisungen zum Kopieren",
  "coach.rules.intro":
    "Dieser Text legt fest, wie sich deine KI verhält. Er ist absichtlich kurz: Jede Regel korrigiert eine bekannte Schwäche von Sprachmodellen.",
  "coach.rules.text":
    "Du bist mein Lauftrainer. Du analysierst meine Einheiten, verfolgst meinen Fortschritt in Richtung meines Ziels und passt mein Training Woche für Woche an.\n\nMein Profil steht im Athletenprofil. Meine Einheiten kommen als gps-digest-Dossiers.\n\nRegeln:\n1. Stütze jede Aussage auf eine Zahl aus dem Dossier und nenne sie.\n2. Wenn ein Wert fehlt oder unzuverlässig ist, sag es, statt zu raten.\n3. Sei ehrlich. Wenn eine Einheit misslungen oder ein Ziel unrealistisch ist, sag es klar.\n4. Geh von meinem tatsächlichen Umfang aus und begründe jede Steigerung der Belastung.\n5. Wenn ich einen Schmerz melde, der anhält, schlimmer wird oder meinen Laufstil verändert, schick mich zu einer medizinischen Fachkraft, statt einen Plan vorzuschlagen.\n6. Wenn dir Informationen für eine Entscheidung fehlen, frag mich.\n7. Beende jede Auswertung mit höchstens drei konkreten Maßnahmen.",
  "coach.rules.note":
    "Die Regeln 1 und 2 verhindern, dass die KI Lücken mit plausiblen Zahlen füllt. Regel 3 wirkt ihrer Neigung entgegen, dir recht zu geben. Regel 4 bremst zu ehrgeizige Pläne. Regel 5 erinnert daran, dass ein Chatbot kein Arzt ist.",
  "coach.copy": "Kopieren",
  "coach.copied": "Kopiert",

  "coach.setup.title": "Wie richtest du deinen Coach in ChatGPT, Claude, Gemini oder Vibe ein?",
  "coach.setup.intro":
    "Alle vier Assistenten haben einen Bereich, in dem Profil und Regeln von einem Gespräch zum nächsten erhalten bleiben. Du musst sie nicht jedes Mal neu einfügen.",
  "coach.setup.colTool": "Assistent",
  "coach.setup.colWhere": "Wo der Coach wohnt",
  "coach.setup.colPlus": "Vorteil für Läufer",
  "coach.setup.gpt.where": "Ein Projekt, mit Anweisungen und Dateien",
  "coach.setup.gpt.plus": "Der Sprachmodus, um die Einheit auf dem Heimweg laut zu besprechen",
  "coach.setup.claude.where": "Ein Projekt, mit Anweisungen und Wissen",
  "coach.setup.claude.plus": "Kann den Wochenplan als eigenes Dokument liefern, leicht wiederzuverwenden",
  "coach.setup.gemini.where": "Ein Gem, mit Anweisungen und Wissen",
  "coach.setup.gemini.plus": "Verbunden mit Google Drive und Google Kalender",
  "coach.setup.vibe.where": "Ein Projekt, mit Anweisungen und Dateien",
  "coach.setup.vibe.plus": "Ein europäischer Anbieter: Mistral AI mit Sitz in Paris",
  "coach.setup.gpt.title": "ChatGPT: ein Projekt anlegen",
  "coach.setup.gpt.text":
    "Lege in der Seitenleiste ein neues Projekt an, zum Beispiel „Lauf-Coach“. Füge die Regeln in die <strong>Projektanweisungen</strong> ein und lade das Athletenprofil in die <strong>Dateien</strong> des Projekts. Jedes Gespräch in diesem Projekt startet mit diesem Kontext. Die kostenlose Version begrenzt die Zahl der Dateien pro Projekt: Nutze sie für das Profil und füge die Dossiers deiner Einheiten direkt ins Gespräch ein.",
  "coach.setup.claude.title": "Claude: ein Projekt anlegen",
  "coach.setup.claude.text":
    "Lege ein Projekt an, füge die Regeln in seine <strong>Anweisungen</strong> ein und lade das Athletenprofil in sein <strong>Wissen</strong>. Jedes neue Gespräch im Projekt startet mit beidem. Die kostenlose Version begrenzt die Zahl der Projekte und den verfügbaren Platz, aber ein Profil und ein Dossier pro Woche passen locker hinein.",
  "coach.setup.gemini.title": "Gemini: ein Gem anlegen",
  "coach.setup.gemini.text":
    "Öffne den Gem-Manager und lege ein <strong>neues Gem</strong> an. Füge die Regeln in seine <strong>Anweisungen</strong> ein und lade das Athletenprofil in sein <strong>Wissen</strong>, vom Computer oder aus Google Drive. Gems sind kostenlos und begleiten dich auch in der mobilen App.",
  "coach.setup.vibe.title": "Vibe: ein Projekt anlegen",
  "coach.setup.vibe.text":
    "Vibe ist seit Mai 2026 der neue Name von Le Chat von Mistral AI. Lege ein <strong>neues Projekt</strong> an, öffne seine Anpassungen, um die Regeln einzufügen, und lade das Athletenprofil in seine <strong>Dateien</strong>. Projekte gibt es in allen Tarifen, mit Grenzen.",
  "coach.setup.fallback":
    "Kein eigener Bereich in deinem Tarif, oder keine Lust, einen anzulegen? Füge Profil und Regeln am Anfang jedes neuen Gesprächs ein. Das ist weniger bequem und funktioniert genauso gut.",

  "coach.weekly.title": "Die Routine, die dich weiterbringt: eine Auswertung pro Woche",
  "coach.weekly.intro":
    "Ein nützlicher Coach begleitet dich über die Zeit. Am wirksamsten ist ein fester Termin, Sonntagabend oder Montagmorgen, der zehn Minuten dauert.",
  "coach.weekly.step1":
    "<strong>Exportiere die Einheiten der Woche</strong> von deiner Uhr oder aus Strava, am besten als FIT.",
  "coach.weekly.step2":
    "<strong>Lege sie in <a href=\"{{href:index.html}}\">gps-digest</a> ab</strong> und kopiere das Dossier. Alles wird in deinem Browser berechnet.",
  "coach.weekly.step3":
    "<strong>Öffne ein neues Gespräch im Projekt</strong>, füge das Dossier ein und ergänze eine Zeile zu deinem Befinden.",
  "coach.weekly.step4":
    "<strong>Stelle die Auswertungsfrage</strong> und besprich die vorgeschlagene Woche, bevor du sie übernimmst.",
  "coach.weekly.promptIntro": "Die Auswertungsfrage, zum unveränderten Kopieren:",
  "coach.weekly.prompt":
    "Hier sind meine Einheiten der Woche und mein Befinden. Werte sie aus:\n1. Was lief gut? Mit Zahlen belegt.\n2. Was sollte ich im Auge behalten?\n3. Passt meine Belastung zu meinem Ziel und meinem Wettkampftermin?\n4. Schlag die nächste Woche vor, Einheit für Einheit, jeweils mit ihrem Zweck.\n\nMeine Einschränkungen für nächste Woche: [ergänzen]",
  "coach.weekly.feel":
    "Die Zeile zum Befinden zählt genauso viel wie die Daten. Deine Uhr weiß nicht, dass du schlecht geschlafen hast oder dass deine Wade seit Dienstag zieht. Zum Beispiel: „Gefühlte Anstrengung 8/10 am Samstag, zwei schlechte Nächte, rechte Wade seit Dienstag fest.“ Ohne diese Zeile beurteilt die KI deine Woche nur nach der Uhr.",
  "coach.weekly.fresh":
    "Warum jede Woche ein neues Gespräch? Weil ein Modell schlecht nutzt, was in der Mitte eines sehr langen Austauschs steht (Liu et al., 2024). Woche für Woche im selben Verlauf verwässern die ersten Anweisungen. Das Projekt behält Profil und Regeln, das Dossier liefert die Fakten. Gib ihr einmal im Monat das Dossier der letzten vier Wochen, damit sie den Trend beurteilen kann.",

  "coach.more.title": "Vier weitere Anfragen, die gut funktionieren",
  "coach.more.intro":
    "Neben der Wochenauswertung holen diese Anfragen das Beste aus einem gut eingerichteten KI-Coach heraus:",
  "coach.more.q1":
    "„Analysiere meine Intervalle: Gleichmäßigkeit der Wiederholungen, Erholung dazwischen und was ich beim nächsten Mal ändern sollte.“",
  "coach.more.q2":
    "„Mein Wettkampf ist in zehn Tagen. Hier sind meine letzten sechs Wochen. Welches Tempo soll ich anpeilen, und wie gestalte ich das Tapering?“",
  "coach.more.q3":
    "„Ich habe diese Woche nur drei Tage zum Laufen. Behalte das Wichtigste und sag mir, worauf ich verzichte.“",
  "coach.more.q4":
    "„Erstelle einen Zwölf-Wochen-Plan für einen Halbmarathon in 1:45 h, ausgehend von meinem aktuellen Umfang. Plane Entlastungswochen ein und begründe die Steigerung.“",

  "coach.traps.title": "Die fünf Fallen des KI-Coaches, und wie du sie vermeidest",
  "coach.traps.intro":
    "Ein falsch genutzter KI-Coach warnt dich nicht, wenn er sich irrt. Das sind die häufigsten Fehler.",
  "coach.traps.li1":
    "<strong>Er gibt dir recht.</strong> Sprachmodelle neigen dazu, ihrem Gegenüber zuzustimmen, eine gut belegte Verzerrung (Sharma et al., 2024). Frag „Was stimmt an dieser Einheit nicht?“ statt „War das eine gute Einheit?“.",
  "coach.traps.li2":
    "<strong>Er erfindet, wenn Zahlen fehlen.</strong> Ohne Daten ergänzt er plausible Werte, immer im selbstsicheren Ton. Daher die Regeln 1 und 2 und ein vollständiges Dossier.",
  "coach.traps.li3":
    "<strong>Er weiß nur, was du ihm sagst.</strong> Dein Schlaf, dein Stress, deine Arbeitswoche: Nichts davon steht in der Uhr. Ohne Zeile zum Befinden hält er dich für topfit.",
  "coach.traps.li4":
    "<strong>Seine Pläne sind manchmal zu ehrgeizig.</strong> Auf dem Papier ermüdet ein Plan niemanden. Verlange, dass er von deinem tatsächlichen Umfang ausgeht und jede Steigerung begründet.",
  "coach.traps.li5":
    "<strong>Er ist kein Arzt.</strong> Ein Schmerz, der anhält, schlimmer wird oder deinen Laufstil verändert, gehört zu einer medizinischen Fachkraft, nicht zu einem Chatbot.",

  "coach.choose.title": "Welche KI eignet sich als Lauftrainer?",
  "coach.choose.p1":
    "Die, die du schon nutzt. ChatGPT, Claude, Gemini und Vibe können alle ein strukturiertes Dossier lesen, Regeln befolgen und eine sinnvolle Woche vorschlagen. Die Unterschiede hängen von deinen Gewohnheiten ab: das Google-Ökosystem bei Gemini, die Auswertung per Sprache bei ChatGPT, lange Dokumente und der Strava-Connector bei Claude, ein europäischer Anbieter bei Vibe.",
  "coach.choose.p2":
    "Was die Qualität des Coachings wirklich verändert, ist nicht das Modell. Es ist das, was du ihm zu lesen gibst.",

  "coach.faq.q1": "Kann man ChatGPT kostenlos als Lauftrainer nutzen?",
  "coach.faq.a1":
    "Ja. Die Projekte von ChatGPT, Claude und Vibe gibt es ebenso wie die Gems von Gemini in den kostenlosen Versionen, mit Grenzen bei Dateien und Nutzung. Auch der Export deiner Einheiten ist kostenlos. Du musst sie nur vor dem Einfügen komprimieren, sonst kann eine einzige Einheit eine kostenlose Version sprengen.",
  "coach.faq.q2": "Kann ChatGPT einen Marathon-Trainingsplan erstellen?",
  "coach.faq.a2":
    "Ja, und zwar recht gut, wenn er von deinem echten Niveau ausgeht: aktueller Umfang, aktuelle Bestzeiten, Verfügbarkeit und Wettkampftermin. Eine Studie hat das gemessen: Trainer bewerten die Pläne von ChatGPT als verbesserungswürdig, doch ihre Qualität steigt deutlich, wenn er mehr Informationen über den Läufer bekommt (Düking et al., 2024). Lass ihn die Steigerung begründen und passe den Plan jede Woche mit deinen echten Einheiten an, statt ihm blind zu folgen.",
  "coach.faq.q3": "Kann man Strava oder Garmin direkt mit einer KI verbinden?",
  "coach.faq.a3":
    "Seit Juni 2026 bietet Strava einen offiziellen Connector an, der zahlenden Abonnenten und bisher nur Claude vorbehalten ist. Für Garmin schlagen Drittanbieter wie Tredict oder Shape die Brücke, mit einem Konto bei ihnen. Ansonsten bleibt der einfachste Weg der Dateiexport, den Garmin Connect wie Strava anbieten: kostenlos, mit jeder KI kompatibel, solange du die Dateien vor dem Einfügen komprimierst.",
  "coach.faq.q4": "Was passiert mit den Daten, die ich meinem KI-Coach anvertraue?",
  "coach.faq.a4":
    "Was du in einen Assistenten einfügst, verarbeitet dessen Anbieter nach seinen Bedingungen. Prüfe in den Einstellungen, wie lange der Verlauf gespeichert wird und ob deine Gespräche zum Training von Modellen genutzt werden. Das gps-digest-Dossier enthält standardmäßig keine GPS-Koordinaten.",
  "coach.faq.q5": "Muss man mit dem KI-Coach auf Englisch schreiben?",
  "coach.faq.a5":
    "Nein. Alle vier Assistenten antworten sehr gut auf Deutsch, und gps-digest erzeugt das Dossier in der Sprache der Seite. Du kannst alles auf Deutsch machen, vom Athletenprofil bis zur Wochenauswertung.",

  "coach.end.title": "Ein guter Coach beginnt mit guten Daten",
  "coach.end.text":
    "gps-digest verwandelt deine Uhrendateien in ein Dossier, das ChatGPT, Claude, Gemini oder Vibe wirklich analysieren können, auch in der kostenlosen Version. Ohne Konto, und deine Dateien verlassen deinen Browser nicht.",

  "coach.sources.sharma":
    "Sharma M, et al. <em>Towards Understanding Sycophancy in Language Models.</em> ICLR 2024. <a href=\"https://arxiv.org/abs/2310.13548\" rel=\"nofollow\">arXiv:2310.13548</a>.",
  "coach.sources.duking":
    "Düking P, et al. <em>ChatGPT Generated Training Plans for Runners are not Rated Optimal by Coaching Experts, but Increase in Quality with Additional Input Information.</em> Journal of Sports Science and Medicine, 2024, 23(1), 56-72. <a href=\"https://www.jssm.org/jssm-23-56.xml%3EFulltext\" rel=\"nofollow\">jssm.org</a>.",

  "guide.kicker":
    "Export-Anleitung",
  "guide.formats.title":
    "FIT, TCX oder GPX: Welches Format exportieren?",
  "guide.formats.colFormat":
    "Format",
  "guide.formats.colContent":
    "Was es enthält",
  "guide.formats.colUse":
    "Wann verwenden",
  "guide.formats.fit":
    "Alles: Herzfrequenz, Runden, gekoppelter Herzfrequenzsensor, barometrische Höhenmeter, Bahnlängen",
  "guide.formats.fitUse":
    "Erste Wahl",
  "guide.formats.tcx":
    "Herzfrequenz, Runden, Kadenz; weder gekoppelter Sensor noch barometrische Höhenmeter",
  "guide.formats.tcxUse":
    "Gute Alternative",
  "guide.formats.gpx":
    "Strecke und Zeiten, oft Herzfrequenz und Kadenz; keine Runden",
  "guide.formats.gpxUse":
    "Notlösung",
  "guide.why.title":
    "Warum die Datei nicht einfach direkt in ChatGPT einfügen?",
  "guide.why.p":
    "Weil eine Uhrendatei für Software gemacht ist, nicht zum Lesen. FIT ist binär, und eine Stunde Laufen als TCX sind etwa 533.000 Tokens: genug, um eine kostenlose Version mit einer einzigen Einheit zu sprengen. Selbst wenn die Datei durchgeht, schließt die KI schlecht aus Tausenden rohen Zeilen. <a href=\"{{href:post-ia-analyse.html}}\">Die ganze Erklärung gibt es hier</a>.",
  "guide.next.title":
    "Und dann: deine Einheiten von einer KI analysieren lassen",
  "guide.next.s1":
    "<strong>Lege die Datei in <a href=\"{{href:index.html}}\">gps-digest</a> ab</strong>, so wie sie ist: FIT, TCX, GPX, ZIP oder .gz. Alles wird in deinem Browser berechnet.",
  "guide.next.s2":
    "<strong>Kopiere das erzeugte Dossier</strong>: ein paar Tausend Tokens pro Einheit statt mehrerer Hunderttausend.",
  "guide.next.s3":
    "<strong>Füge es in ChatGPT, Claude, Gemini oder Vibe ein</strong>, zusammen mit deiner Frage. Für eine Begleitung Woche für Woche gibt es unseren <a href=\"{{href:post-ia-coach.html}}\">Leitfaden zum KI-Coach</a>.",
  "guide.next.cta":
    "Meine Einheiten analysieren",
  "guide.more.title":
    "Die anderen Export-Anleitungen",
  "blog.guides":
    "Export-Anleitungen",
  "guide.garmin.title":
    "Garmin-Daten (FIT) für ChatGPT exportieren: die Anleitung",
  "guide.garmin.description":
    "Eine Garmin-Connect-Aktivität als FIT exportieren, den ganzen Verlauf sichern oder Dateien per USB von der Uhr kopieren und von ChatGPT analysieren lassen.",
  "guide.garmin.h1":
    "So exportierst du deine Garmin-Einheiten für die Analyse mit ChatGPT",
  "guide.garmin.meta":
    "Veröffentlicht am <time datetime=\"2026-10-01\">1. Oktober 2026</time> · 4 Min. Lesezeit",
  "guide.garmin.lede":
    "Garmin Connect zeigt deine Einheiten an, gibt sie aber nicht an ChatGPT weiter. Zuerst musst du die Datei herausholen. Hier sind drei Wege, vom schnellsten bis zum vollständigsten, und was du danach mit der Datei machst.",
  "guide.garmin.tldr1":
    "Eine Einheit: auf connect.garmin.com das Zahnrad der Aktivität, dann die Originaldatei exportieren. Du bekommst ein ZIP mit der FIT-Datei.",
  "guide.garmin.tldr2":
    "Die Garmin-Connect-App exportiert keine Dateien: Nimm einen Computer oder schließ die Uhr per USB an.",
  "guide.garmin.tldr3":
    "Eine rohe FIT-Datei kann ChatGPT nicht lesen. Lege das ZIP unverändert in gps-digest ab und füge das erzeugte Dossier in deine KI ein.",
  "guide.garmin.m1.title":
    "Eine Einheit aus Garmin Connect exportieren",
  "guide.garmin.m1.intro":
    "Das ist der Weg für den Alltag. Er läuft über die Website, an einem Computer.",
  "guide.garmin.m1.s1":
    "Melde dich auf <strong>connect.garmin.com</strong> an.",
  "guide.garmin.m1.s2":
    "Öffne <strong>Aktivitäten</strong> im linken Menü und dann die gewünschte Einheit.",
  "guide.garmin.m1.s3":
    "Klicke oben rechts in der Aktivität auf das <strong>Zahnrad</strong>.",
  "guide.garmin.m1.s4":
    "Wähle die Option, die die <strong>Originaldatei</strong> exportiert; ihre Bezeichnung hängt von der Version der Website ab. TCX- und GPX-Export gibt es auch, aber die originale FIT-Datei ist vollständiger.",
  "guide.garmin.m1.s5":
    "Der Download ist ein <strong>ZIP</strong>, das die FIT-Datei enthält. Entpacken ist nicht nötig: gps-digest öffnet es direkt.",
  "guide.garmin.m1.note":
    "Mehrere Einheiten? Exportiere sie einzeln und lege alle ZIP-Dateien auf einmal ab.",
  "guide.garmin.m2.title":
    "Ohne Internet: Dateien per USB von der Uhr kopieren",
  "guide.garmin.m2.p":
    "Schließ die Uhr mit ihrem Kabel an einen Computer an. Sie erscheint als Laufwerk oder als Gerät namens GARMIN. Die Einheiten liegen im Ordner <code>GARMIN/Activity</code>, eine FIT-Datei pro Aktivität. Kopiere die neuesten und lege sie in gps-digest ab. Auf dem Mac erscheinen neuere Uhren nicht als Laufwerk: Dann brauchst du ein Programm für die MTP-Dateiübertragung.",
  "guide.garmin.m3.title":
    "Der ganze Verlauf: der vollständige Konto-Export",
  "guide.garmin.m3.p":
    "Um Jahre an Einheiten zu sichern, melde dich in deinem Garmin-Konto an und fordere im Bereich Datenverwaltung den Export deiner Daten an. Garmin schickt dir per E-Mail einen Link zu einem ZIP-Archiv deines ganzen Kontos, meist innerhalb weniger Tage. Die FIT-Dateien stecken darin in verschachtelten ZIPs. gps-digest findet sie dort, aber das Archiv ist oft mehrere Hundert MB groß: Entpacke es und lege nur die Einheiten der letzten Wochen ab.",
  "guide.garmin.faq.q1":
    "Kann man eine Einheit aus der Garmin-Connect-App auf dem Handy exportieren?",
  "guide.garmin.faq.a1":
    "Nein, die App bietet keinen Dateiexport. Nutze connect.garmin.com an einem Computer oder kopiere die Dateien per USB von der Uhr.",
  "guide.garmin.faq.q2":
    "Warum kann ChatGPT meine Garmin-FIT-Datei nicht lesen?",
  "guide.garmin.faq.a2":
    "FIT ist ein Binärformat: ChatGPT muss ein Skript schreiben, um es zu dekodieren, und nutzt oft nur einen Teil davon. Selbst als Text ist eine Stunde Laufen Hunderttausende Tokens groß. gps-digest dekodiert die Datei in deinem Browser und macht daraus ein Dossier von etwa 5.800 Tokens pro Einheit.",
  "guide.garmin.faq.q3":
    "Braucht man ein Garmin-Connect+-Abo, um seine Daten zu exportieren?",
  "guide.garmin.faq.a3":
    "Nein. Der Export einer Einheit und der vollständige Konto-Export sind beide kostenlos.",
  "guide.strava.title":
    "Strava-Aktivitäten (GPX, FIT) für ChatGPT exportieren: die Anleitung",
  "guide.strava.description":
    "Eine Strava-Aktivität als GPX oder im Originalformat exportieren, das ganze Archiv sichern und von ChatGPT, Claude oder Gemini analysieren lassen. Kostenlos.",
  "guide.strava.h1":
    "So exportierst du deine Strava-Aktivitäten für die Analyse mit ChatGPT",
  "guide.strava.meta":
    "Veröffentlicht am <time datetime=\"2026-10-01\">1. Oktober 2026</time> · 4 Min. Lesezeit",
  "guide.strava.lede":
    "Strava speichert deine Läufe, gibt sie aber nicht an deine KI weiter, außer über einen kostenpflichtigen Connector, der nur mit Claude funktioniert. Die gute Nachricht: Der Export ist kostenlos, solange du die Website nutzt. So geht es, und das machst du danach mit der Datei.",
  "guide.strava.tldr1":
    "Am ergiebigsten: das Archiv deines Kontos (strava.com/account, „Download your account“). Lege das ZIP unverändert ab: gps-digest behält deine letzten 12 Monate.",
  "guide.strava.tldr2":
    "Die Strava-App exportiert nichts: Du brauchst die Website, an einem Computer.",
  "guide.strava.tldr3":
    "Die Rohdatei ist zu schwer für ChatGPT. Lege sie in gps-digest ab, auch als .gz, und füge das Dossier in deine KI ein.",
  "guide.strava.m1.title":
    "Eine Aktivität auf strava.com exportieren",
  "guide.strava.m1.intro":
    "Der Export funktioniert nur auf der Strava-Website. Für deine eigenen Aktivitäten ist er kostenlos.",
  "guide.strava.m1.s1":
    "Melde dich an einem Computer auf <strong>strava.com</strong> an und öffne die Aktivität.",
  "guide.strava.m1.s2":
    "Klicke links neben der Aktivität auf die Schaltfläche <strong>„…“</strong> (weitere Aktionen).",
  "guide.strava.m1.s3":
    "Wähle den <strong>Export der Originaldatei</strong>, wenn die Aktivität von einer Uhr stammt: Du bekommst die FIT-Datei der Uhr, die vollständigste Version.",
  "guide.strava.m1.s4":
    "Sonst wähle den <strong>GPX-Export</strong>. Er enthält Strecke, Zeiten und, falls aufgezeichnet, Herzfrequenz, Kadenz und Temperatur.",
  "guide.strava.m1.s5":
    "Lege die heruntergeladene Datei in gps-digest ab.",
  "guide.strava.m1.note":
    "Wurde die Aktivität mit der Strava-App auf dem Handy aufgezeichnet, reicht der GPX-Export völlig.",
  "guide.strava.m2.title":
    "Empfohlen: das Archiv deines Kontos, für ein Jahr Kontext",
  "guide.strava.m2.p":
    "Fordere auf <a href=\"https://www.strava.com/account\" rel=\"noopener\">strava.com/account</a> unter „Download your account“ das Archiv deines Kontos an. Strava schickt dir einen Link per E-Mail, meist innerhalb weniger Stunden. Lege das ZIP unverändert in gps-digest ab: Das Tool findet deine Einheiten, ignoriert Fotos und Routen und behält standardmäßig die letzten 12 Monate, wahlweise von 3 Monaten bis zum ganzen Verlauf. Die letzten 14 Tage sind Einheit für Einheit detailliert, der Rest steht mit einer Zeile pro Einheit darin: Ein Jahr mit über 300 Einheiten ergibt etwa 30.000 Tokens.",
  "guide.strava.m3.title":
    "Eine Vorsicht: Das Strava-Tempo ist nicht das von Garmin",
  "guide.strava.m3.p":
    "Strava berechnet das Tempo auf Basis der Bewegungszeit, Garmin Connect auf Basis der Gesamtzeit. Bei einem Stadtlauf mit Stopps an Ampeln liegt der Unterschied schnell über 15 Sekunden pro Kilometer. gps-digest gibt im Dossier an, welche Konvention es verwendet, damit die KI keine unvergleichbaren Zahlen vergleicht.",
  "guide.strava.faq.q1":
    "Kann man eine Aktivität aus der Strava-App exportieren?",
  "guide.strava.faq.a1":
    "Nein. Der Export funktioniert nur auf der Website strava.com, an einem Computer.",
  "guide.strava.faq.q2":
    "Braucht man ein Strava-Abo, um seine Aktivitäten zu exportieren?",
  "guide.strava.faq.a2":
    "Nein, der Export deiner eigenen Aktivitäten ist kostenlos. Das Abo brauchst du nur für den offiziellen Connector, der Strava mit Claude verbindet.",
  "guide.strava.faq.q3":
    "GPX-Export oder Originaldatei: Was soll man wählen?",
  "guide.strava.faq.a3":
    "Die Originaldatei, wenn die Aktivität von einer Uhr stammt: Meist ist es eine FIT-Datei, die vollständiger ist (Runden, gekoppelter Sensor, barometrische Höhenmeter). Sonst GPX: Es enthält die Strecke und meistens die Herzfrequenz.",
  "guide.strava.source":
    "Strava-Hilfe, <em>Exporting your Data and Bulk Export</em>. <a href=\"https://support.strava.com/en-us/articles/15401919-exporting-your-data-and-bulk-export\" rel=\"nofollow\">support.strava.com</a>.",
  "guide.apple.title":
    "Apple-Watch-Workouts (GPX, FIT) für ChatGPT exportieren",
  "guide.apple.description":
    "Apple bietet keinen direkten Export deiner Workouts. Drei Wege, ein Apple-Watch-Training als FIT oder GPX zu bekommen und von ChatGPT analysieren zu lassen.",
  "guide.apple.h1":
    "So exportierst du deine Apple-Watch-Workouts für die Analyse mit ChatGPT",
  "guide.apple.meta":
    "Veröffentlicht am <time datetime=\"2026-10-01\">1. Oktober 2026</time> · 4 Min. Lesezeit",
  "guide.apple.lede":
    "Deine Läufe mit der Apple Watch liegen in der Health-App des iPhones, und Apple bietet keine Schaltfläche, um daraus eine GPX- oder FIT-Datei zu machen. Es gibt trotzdem drei Wege, an sie heranzukommen.",
  "guide.apple.tldr1":
    "Am einfachsten: eine App, die Health liest und als FIT oder GPX exportiert, etwa HealthFit oder WorkoutGPX.",
  "guide.apple.tldr2":
    "Ohne zu zahlen: Synchronisiere deine Workouts mit Strava und exportiere sie dann auf strava.com.",
  "guide.apple.tldr3":
    "Du kannst gps-digest direkt in Safari auf dem iPhone öffnen und die exportierte Datei dort ablegen.",
  "guide.apple.m1.title":
    "Mit einer Export-App: am vollständigsten",
  "guide.apple.m1.intro":
    "Manche Apps lesen deine Workouts in Health und exportieren sie in einem Standardformat, Herzfrequenz inklusive. HealthFit exportiert als FIT, GPX oder TCX, WorkoutGPX als GPX. Prüfe im App Store, was die kostenlose Version erlaubt.",
  "guide.apple.m1.s1":
    "Installiere die App und erlaube ihr, deine <strong>Workouts</strong>, <strong>Routen</strong> und deine <strong>Herzfrequenz</strong> in Health zu lesen.",
  "guide.apple.m1.s2":
    "Wähle das Workout, das du exportieren willst.",
  "guide.apple.m1.s3":
    "Exportiere es als <strong>FIT</strong>, wenn die App das anbietet, sonst als GPX.",
  "guide.apple.m1.s4":
    "Speichere die Datei in der App <strong>Dateien</strong> oder schick sie per AirDrop an deinen Computer.",
  "guide.apple.m1.s5":
    "Öffne gps-digest in Safari, auf dem iPhone oder am Computer, und lege die Datei ab.",
  "guide.apple.m1.note":
    "FIT ist besser als GPX: Es behält die Runden und die Sensordaten.",
  "guide.apple.m2.title":
    "Ohne zu zahlen: über Strava",
  "guide.apple.m2.p":
    "Wenn du Strava nutzt, erlaube ihm in den Einstellungen der Strava-App, deine Workouts in Health zu lesen. Deine Apple-Watch-Workouts werden dann automatisch dorthin übertragen. Danach musst du sie nur noch auf strava.com exportieren, wie es unsere <a href=\"{{href:guide-strava.html}}\">Strava-Anleitung</a> erklärt.",
  "guide.apple.m3.title":
    "Mit dem nativen Health-Export: nur für Neugierige",
  "guide.apple.m3.p":
    "Tippe in der Health-App auf dein Profilbild und dann auf „Alle Gesundheitsdaten exportieren“. Du bekommst ein ZIP-Archiv mit deinen Routen als GPX im Ordner <code>workout-routes</code>. Diese Routen enthalten nur Position, Höhe und Uhrzeit: Die Herzfrequenz liegt woanders, in einer riesigen XML-Datei. Das Archiv ist oft Hunderte MB groß. Um ein Workout zu analysieren, sind die ersten beiden Wege viel besser.",
  "guide.apple.faq.q1":
    "Kann man einen Apple-Watch-Lauf ohne App als GPX exportieren?",
  "guide.apple.faq.a1":
    "Nur über den vollständigen Health-Export, der die Routen ohne Herzfrequenz liefert. Für eine vollständige Datei brauchst du eine Export-App oder den Umweg über Strava.",
  "guide.apple.faq.q2":
    "Funktioniert gps-digest auf dem iPhone?",
  "guide.apple.faq.a2":
    "Ja. Öffne die Seite in Safari, tippe auf die Schaltfläche zum Auswählen von Dateien und wähle die Datei in der App Dateien. Die Analyse läuft auf dem Handy, nichts wird an einen Server geschickt.",
  "guide.apple.faq.q3":
    "Welches Format ist für ein Apple-Watch-Workout das richtige?",
  "guide.apple.faq.a3":
    "FIT, wenn deine Export-App es anbietet: Es behält Runden und Sensordaten. GPX geht auch, solange es die Herzfrequenz enthält. Das tun die Export-Apps, der native Health-Export aber nicht.",
  "coach.sources.strava":
    "Strava, <em>Strava Launches MCP Connector, Allowing Athletes to Sync Training History to Claude</em>, Pressemitteilung vom 1. Juni 2026. <a href=\"https://press.strava.com/articles/strava-launches-mcp-connector\" rel=\"nofollow\">press.strava.com</a>.",
  "coach.sources.docs":
    "Offizielle Dokumentation: <a href=\"https://help.openai.com/en/articles/10169521-projects-in-chatgpt\" rel=\"nofollow\">Projekte in ChatGPT</a>, <a href=\"https://support.claude.com/en/articles/9517075-what-are-projects\" rel=\"nofollow\">Projekte in Claude</a>, <a href=\"https://support.google.com/gemini/answer/15146780\" rel=\"nofollow\">Gems in Gemini</a>, <a href=\"https://docs.mistral.ai/vibe/work/projects\" rel=\"nofollow\">Projekte in Vibe</a>.",
  "privacy.analytics.row": "Besuchsstatistik",
  "privacy.analytics.rowText":
    "<strong>Ja, anonym.</strong> Cloudflare Web Analytics zählt Seitenaufrufe, ohne Cookie und ohne dauerhafte Kennung. Nichts über deine Dateien oder Einheiten.",
  "privacy.analytics.active":
    "Die Reichweitenmessung nutzt Cloudflare Web Analytics: ohne Cookie, ohne dauerhafte Kennung und ohne Daten aus deinen Dateien. Sie zählt Seitenaufrufe, Länder, Besucherquellen und Gerätetypen, nie eine Person.",
  "privacy.verify.p1Analytics":
    "Verlass dich nicht auf unser Wort. Öffne die Entwicklerwerkzeuge deines Browsers (<code>F12</code>), Tab <strong>Netzwerk</strong>, und lege eine Datei ab. Du siehst das Laden der Seite, die Reichweitenmessung an <code>cloudflareinsights.com</code> und, wenn das Wetter aktiviert ist, eine Anfrage an <code>open-meteo.com</code>. Sonst nichts. Keine Anfrage enthält den Inhalt deiner Datei.",
};
