/**
 * Catalogue allemand. Les clés et les paramètres suivent le français
 * (i18n.ts), qui fait référence.
 *
 * Choix de vocabulaire : « Pace » (usage courant chez les coureurs
 * germanophones), « HF » pour la fréquence cardiaque, « bpm » conservé comme
 * unité, espace avant « % » (DIN 5008). La semaine reste notée « W » : c'est
 * la notation ISO, et le graphique de charge n'affiche que ses trois derniers
 * caractères.
 */

import type { Catalog } from "./i18n.ts";

export const de: Partial<Catalog> = {
  "unit.percent": " %",

  "digest.errFormat": "Format von „{filename}“ nicht erkannt. Unterstützte Formate: TCX, GPX, FIT.",
  "digest.errNoTime":
    "„{filename}“ hat keine Zeitstempel: Das ist eine geplante Route, keine aufgezeichnete Einheit.",
  "digest.errNoPoints": "Keine verwertbaren Datenpunkte in der Datei.",
  "digest.warnZonesObserved":
    "HF-Zonen aus der in der Datei beobachteten maximalen HF berechnet, nicht aus einem Athletenprofil: mit Vorsicht interpretieren.",
  "digest.warnNoFtp": "FTP unbekannt: IF und TSS nicht berechnet.",
  "digest.warnCoords":
    "Start- und Zielkoordinaten nicht gekürzt: die Strecke kann eine Wohnadresse verraten.",
  "digest.warnHrSource":
    "Geschätzte HF-Quelle: {label} (Konfidenz {confidence}). Herzfrequenzwerte nur zwischen Einheiten derselben Quelle vergleichen.",
  "digest.warnDrift": "Kardiale Drift nicht berechnet: {reason}",

  "sensor.label.chest_strap": "Brustgurt",
  "sensor.label.optical": "Handgelenksensor",
  "sensor.label.unknown": "unbestimmt",
  "sensor.lockRange": "HF auf die Kadenz eingerastet",
  "sensor.device.name":
    "In der Datei angegebene Hardware",
  "sensor.device.note":
    "Quelle aus den device_info-Nachrichten der FIT-Datei gelesen.",
  "sensor.startDrop.name":
    "Auffälliger Start",
  "sensor.startDrop.note":
    "Die HF fällt um {min} min um {bpm} bpm, ohne dass sich das Tempo ändert: Der Sensor hat sich neu eingependelt (kaltes Handgelenk, trockener Gurt). Der Beginn der Einheit bleibt bei den HF-Berechnungen außen vor.",
  "sensor.startDrop.reason":
    "auffällige HF zu Beginn (Abfall um {bpm} bpm ohne Tempoänderung)",
  "sensor.swim.name": "Erkennung nicht anwendbar",
  "sensor.swim.note":
    "Beim Schwimmen wird die HF zwischengespeichert und erst nach dem Verlassen des Wassers übertragen: die Form des Signals sagt nichts über den Sensor aus. Mit der FIT-Datei lässt sich dagegen die gekoppelte Hardware direkt auslesen.",
  "sensor.lock.name": "Einrasten auf die Kadenz",
  "sensor.lock.found":
    "Die HF folgt über einen erheblichen Teil der Einheit der Kadenz: typisches Artefakt eines Handgelenksensors.",
  "sensor.lock.none": "Keine Verwechslung von HF und Kadenz erkannt.",
  "sensor.plateau.name": "Längstes Plateau",
  "sensor.plateau.long": "Lange Folge exakt konstanter HF: Kennzeichen optischer Glättung.",
  "sensor.plateau.normal": "Kein ungewöhnlich langes Plateau.",
  "sensor.plateauTime.name": "Zeit auf Plateaus",
  "sensor.plateauTime.note": "Anteil der Zeit, in der sich die HF länger als 5 s nicht bewegt.",
  "sensor.step.name": "Mittlere Veränderung",
  "sensor.step.note": "{pct} % der Intervalle ohne jede Veränderung.",
  "sensor.lag.name": "Reaktionsverzögerung",
  "sensor.lag.slow": "Die HF reagiert deutlich verzögert auf Tempowechsel.",
  "sensor.lag.fast": "Schnelle Reaktion auf Tempowechsel.",
  "sensor.spike.name": "Startspitze",
  "sensor.spike.note":
    "Unplausible HF zu Beginn, dann plötzlicher Abfall: trockene Elektroden, typisch für einen Brustgurt.",
  "sensor.calibration.name": "Kalibrierung",
  "sensor.calibration.note":
    "Die Schwellen wurden anhand von Laufdaten festgelegt: auf dem Rad sind die Signale weniger eindeutig und das Urteil bleibt oft unbestimmt. Die FIT-Datei schafft Klarheit, weil sie die gekoppelte Hardware angibt.",

  "drift.wristCaveat":
    "Sensor der Uhr, vom Handgelenk erwärmt: misst meist 3 bis 8 °C zu hoch. Das ist NICHT die Lufttemperatur.",
  "drift.basisPowerIgnored":
    "Leistung vorhanden, aber ignoriert: außerhalb des Radsports wird sie von der Uhr geschätzt und ist keine verlässliche Basis. Entkopplung auf Basis der Geschwindigkeit berechnet.",
  "drift.noWindowPower":
    "Kein Abschnitt von mindestens 10 Minuten mit gleichmäßiger Leistung in dieser Einheit. Das Verhältnis Leistung/HF lässt sich nur bei konstanter Belastung vergleichen; besser die Wiederholungen einzeln analysieren.",
  "drift.noWindowSpeed":
    "Kein Abschnitt von mindestens 10 Minuten mit gleichmäßiger Pace in dieser Einheit. Kardiale Drift lässt sich nur bei durchgehender Belastung messen; besser die Wiederholungen einzeln analysieren.",
  "drift.sparseHr": "Gleichmäßiges Fenster gefunden, aber mit zu wenigen verwertbaren Herzfrequenzdaten.",
  "drift.halvesInsufficient": "Zu wenige Daten, um die beiden Hälften des Fensters zu vergleichen.",
  "drift.workDrop.power":
    "Belastung zwischen den beiden Fensterhälften um {drop} % gesunken (Leistung {from} → {to}): die Effizienz sinkt, weil die Intensität sinkt, nicht weil das Herz driftet. Keine Drift berechenbar.",
  "drift.workDrop.speed":
    "Belastung zwischen den beiden Fensterhälften um {drop} % gesunken (Geschwindigkeit {from} → {to}): die Effizienz sinkt, weil die Intensität sinkt, nicht weil das Herz driftet. Keine Drift berechenbar.",
  "drift.qualityNote.shortEasy":
    "Kurzes Fenster im am wenigsten intensiven Teil der Einheit, vermutlich Aufwärmen oder Auslaufen. Die Zahl stimmt, beschreibt aber nicht die Hauptbelastung; besser die Analyse der Wiederholungen ansehen.",
  "drift.qualityNote.easy":
    "Einziger gleichmäßiger Abschnitt: der am wenigsten intensive Teil der Einheit. Die Drift ist dort strukturell niedrig und sagt wenig über die Hauptbelastung aus.",
  "drift.qualityNote.short":
    "Fenster von {min} min, das {pct} % der Einheit abdeckt: gültige Messung, aber wenig repräsentativ für das Ganze.",
  "drift.interp.negative":
    "Negative Entkopplung: die Effizienz verbessert sich in der zweiten Hälfte. Typisch für ein zu Beginn des Fensters noch unvollständiges Aufwärmen oder eine bewusste progressive Steigerung.",
  "drift.interp.low": "Sehr geringe Drift: die Belastung lag deutlich unter der aeroben Schwelle.",
  "drift.interp.normal":
    "Drift im Normalbereich (≤ 5 %). Die aerobe Ausdauer trägt diese Pace über diese Dauer.",
  "drift.interp.markedHot":
    "Deutliche Drift (> 5 %), aber bei {temp} °C Lufttemperatur: bei dieser Temperatur sind 5 bis 6 % Entkopplung die normalen thermischen Kosten und kein Zeichen schlechter Form.",
  "drift.interp.marked":
    "Deutliche Drift (> 5 %). Die Pace war für die Dauer zu hoch, oder die Grundlagenausdauer ist der limitierende Faktor. Dehydrierung und Restermüdung haben denselben Effekt.",
  "drift.interp.highHot":
    "Starke Drift (> 10 %) bei {temp} °C: die Hitze erklärt einen Teil der Zahl, aber nicht alles. Flüssigkeitshaushalt und Erholungszustand prüfen.",
  "drift.interp.high":
    "Starke Drift (> 10 %). Pace über diese Dauer unter diesen Bedingungen nicht haltbar.",
  "drift.quality.solide": "belastbar",
  "drift.quality.indicatif": "Richtwert",

  "adh.tooFew": "Weniger als zwei Wiederholungen erkannt: nichts zu vergleichen.",
  "adh.veryRegular.pace": "Sehr gleichmäßige Pace über die Wiederholungen (Streuung {cv} %).",
  "adh.veryRegular.power": "Sehr gleichmäßige Leistung über die Wiederholungen (Streuung {cv} %).",
  "adh.regularOk": "Ordentliche Gleichmäßigkeit (Streuung {cv} %).",
  "adh.irregular.pace":
    "Ungleichmäßige Wiederholungen in der Pace (Streuung {cv} %): Einteilung verbessern, oder Einheit schlecht dosiert.",
  "adh.irregular.power":
    "Ungleichmäßige Wiederholungen in der Leistung (Streuung {cv} %): Einteilung verbessern, oder Einheit schlecht dosiert.",
  "adh.fade.pace":
    "Pace-Verlust von {pct} % zwischen erster und letzter Wiederholung: zu schnell angegangen, oder Umfang über dem aktuellen Niveau.",
  "adh.fade.power":
    "Leistungsverlust von {pct} % zwischen erster und letzter Wiederholung: zu schnell angegangen, oder Umfang über dem aktuellen Niveau.",
  "adh.build":
    "Steigerung um {pct} % im Verlauf der Serie: bewusster Aufbau, Zeichen verfügbarer Reserven.",
  "adh.held.pace": "Pace von Anfang bis Ende der Serie gehalten.",
  "adh.held.power": "Leistung von Anfang bis Ende der Serie gehalten.",
  "adh.restLonger":
    "Pausen werden länger (+{s} s pro Wiederholung): die Einheit entgleitet gegen Ende der Serie.",
  "adh.restShorter": "Pausen werden kürzer ({s} s pro Wiederholung).",
  "adh.hrRiseStable":
    "Pace gehalten, aber HF über die Serie um {bpm} bpm gestiegen: steigende kardiale Kosten bei gleicher Belastung, Kennzeichen angesammelter Ermüdung.",
  "adh.hrRiseStable.power":
    "Leistung gehalten, aber HF über die Serie um {bpm} bpm gestiegen: steigende kardiale Kosten bei gleicher Belastung, Kennzeichen angesammelter Ermüdung.",
  "adh.hrRise": "HF über die Serie um {bpm} bpm gestiegen.",
  "adh.hrrGood":
    "Sehr gute Herzfrequenzerholung: {bpm} bpm Abfall in 60 s nach jeder Wiederholung.",
  "adh.hrrOk": "Ordentliche Herzfrequenzerholung: {bpm} bpm in 60 s.",
  "adh.hrrSlow":
    "Langsame Erholung: nur {bpm} bpm Abfall in 60 s. Restermüdung, Hitze oder für das Format zu kurze Pausen.",
  "adh.hrrErode":
    "Die Erholung nimmt pro Wiederholung um {bpm} bpm ab: die Serie zehrt schneller an den Reserven, als die Pace erkennen lässt.",
  "adh.missingReps": "{done} von {planned} geplanten Wiederholungen absolviert.",
  "adh.targetMet.pace": "Zielpace eingehalten.",
  "adh.targetMet.power": "Zielleistung eingehalten.",
  "adh.belowTarget": "Serie {pct} % unter dem Ziel absolviert.",
  "adh.aboveTarget":
    "Serie {pct} % über dem Ziel absolviert: der Nutzen einer Intervalleinheit kommt vom Einhalten der Vorgabe, nicht vom Übertreffen.",
  "adh.grade.conforme": "planmäßig",
  "adh.grade.acceptable": "akzeptabel",
  "adh.grade.dégradé": "mangelhaft",
  "adh.grade.non évaluable": "nicht bewertbar",

  "cls.pool": "Keine GPS-Position, keine Kadenz, Geschwindigkeit {speed} m/s: Beckenschwimmen.",
  "cls.openWater":
    "Unterbrochene GPS-Position ({pct} % Abdeckung, {flips} Aussetzer) bei {speed} m/s ohne Kadenz: Freiwasserschwimmen. Die GPS-Distanz ist hier überschätzt, weil sich das Signal bei jedem Armzug über Wasser neu verbindet.",
  "cls.static":
    "{dist} m in {min} min zurückgelegt: zu wenig Fortbewegung für eine Ausdaueraktivität.",
  "cls.crossTraining":
    "Als Lauf deklariert, aber {stopPct} % der Zeit im Stillstand bei {mpm} m pro verstrichener Minute: unterbrochene Belastung, vermutlich Kraft- oder Crosstraining. Als Belastung gezählt, ohne Laufanalyse.",
  "cls.hiking": "Wandern: als Belastung gezählt, ohne Pace-Analyse und ohne Prognose.",
  "cls.unknownSport": "Sportart nicht als Ausdaueraktivität erkannt: nur als Belastung gezählt.",
  "erg.evidence":
    "Leistung in {pinned} von {total} Block/Blöcken fixiert: Einheit im ERG-Modus. Distanz und Geschwindigkeit sind hier virtuell und messen nichts.",
  "erg.warning":
    "Sinkende Trittfrequenz in {n} Block/Blöcken (um bis zu {max} U/min). Im ERG-Modus erhöht eine sinkende Trittfrequenz den Widerstand, wodurch sie weiter sinkt: diese Spirale endet mit einem Abbruch. Abhilfe: die Trittfrequenz bewusst anheben, sobald sie abfällt, oder ERG für die letzten Wiederholungen ausschalten.",

  "zone.1": "Z1 Regeneration",
  "zone.2": "Z2 Grundlage",
  "zone.3": "Z3 Tempo",
  "zone.4": "Z4 Schwelle",
  "zone.5": "Z5 VO2max",
  "zone.6": "Z6 anaerob",
  "zone.7": "Z7 neuromuskulär",
  "set.rest": ", Pause {s} s",
  "set.power": " bei {w} W",

  "swim.set": "{reps} × {dist} m in {pace}/100m",
  "swim.setRest": ", Pause {s} s",
  "swim.lapDistance":
    "Distanz aus den Runden rekonstruiert: der Punktstrom enthält sie nicht, was im Becken normal ist.",
  "swim.hr":
    "Herzfrequenz beim Schwimmen: ein optischer Sensor misst unter Wasser nicht, und ein Brustgurt sendet unter Wasser nicht, sondern speichert und überträgt die Daten danach. Die Werte sind Richtwerte, ihre Zeitstempel ungefähr. Für diese Einheit wird keine kardiale Drift berechnet.",
  "swim.noLaps":
    "Keine verwertbaren Runden: die Einheit ist nicht in Bahnen unterteilt. Nur Gesamtdistanz und Gesamtdauer sind verwendbar.",
  "swim.lowDensity":
    "Nur {swim} min effektives Schwimmen bei {elapsed} min Gesamtzeit: stark zerstückelte Einheit oder eher Baden als Training. Entsprechend interpretieren.",
  "swim.openWater":
    "Freiwasserschwimmen: die Distanz stammt vom GPS, das bei jedem Armzug unter Wasser aussetzt und sich danach neu verbindet. Sie ist meist um 5 bis 15 % überschätzt, und die momentane Pace ist nicht verwertbar; nur Durchschnittswerte sind es.",
  "swim.noStrokes":
    "Keine Zugzählung in der Datei: SWOLF, das die Schwimmeffizienz misst, kann nicht berechnet werden. Nicht jede Uhr zeichnet sie auf.",
  "swim.noPoolLength":
    "Beckenlänge nicht aus den Daten ableitbar: die Distanzen stammen unverändert von der Uhr.",

  "race.400": "400 m",
  "race.800": "800 m",
  "race.1000": "1000 m",
  "race.1609.344": "1 Meile",
  "race.3000": "3000 m",
  "race.5000": "5 km",
  "race.10000": "10 km",
  "race.15000": "15 km",
  "race.20000": "20 km",
  "race.21097.5": "Halbmarathon",
  "race.42195": "Marathon",
  "proj.method.race": "Riegel ausgehend von {ref} im Wettkampf (k={k})",
  "proj.method.raceAge": ", Ergebnis {months} Monate alt",
  "proj.method.training": "Riegel ausgehend von einer Trainingsbelastung über {ref}",
  "proj.method.cs": "Kritische Geschwindigkeit (CS {pace}/km, R²={r2})",
  "dossier.setSource.workout":
    "{set}: auf der Uhr programmiertes Training, Struktur und Ziele aus der Datei gelesen.",
  "dossier.setSource.laps":
    "{set}: Struktur aus den Runden gelesen (eine Runde pro Abschnitt).",
  "dossier.setSource.auto":
    "{set}: aus dem Signal erkannt, kein vorgegebenes Training in der Datei. Keine Bewertung der Umsetzung.",
  "proj.method.achievedRace":
    "Wettkampfzeit ({date}): die echte Zeit geht vor das Modell",
  "proj.method.achievedTraining":
    "Im Training gelaufene Leistung ({date}): die echte Zeit geht vor das Modell",
  "proj.caveat.gap":
    "Das Modell allein ergab {model}, {pct} % Abweichung von der echten Zeit ({date}): Konfidenz herabgesetzt.",
  "proj.dateUnknown":
    "Datum unbekannt",
  "dossier.projNote":
    "Kritische Geschwindigkeit und Prognosen: Laufleistungen der letzten {days} Tage (seit {from}). achieved = beste echte Zeit über die Distanz in diesem Zeitraum, model_gap_pct = Abweichung des Modells von dieser Zeit (positiv: Modell langsamer). Über 3 % sinkt die Konfidenz.",
  "proj.caveat.marathon":
    "Eine Marathonprognose aus Trainingsdaten setzt eine vollständig durchgeführte spezifische Vorbereitung voraus: lange Läufe, Renntempo, Verpflegungsstrategie. Sie ist die unzuverlässigste aller Prognosen.",
  "proj.caveat.half": "Setzt eine spezifische Vorbereitung und eine gleichmäßig gehaltene Pace voraus.",
  "proj.confidence.haute": "hoch",
  "proj.confidence.moyenne": "mittel",
  "proj.confidence.faible": "niedrig",

  "prog.tooFew":
    "Weniger als drei verwertbare Laufeinheiten: eine Verlaufsanalyse braucht mehr Datenpunkte.",
  "prog.multiSource":
    "Mehrere HF-Quellen im Datensatz: die Kurven werden je Sensor getrennt erstellt. Sie untereinander zu vergleichen wäre sinnlos.",
  "prog.shortSpan": "Zeitraum zu kurz, um Fortschritt von täglichen Schwankungen zu unterscheiden.",
  "prog.improving": "Deutlicher Fortschritt: etwa {bpm} bpm weniger pro Woche bei {pace}/km.",
  "prog.worsening":
    "Steigende kardiale Kosten bei {pace}/km. Hitze, angesammelte Ermüdung oder zu dichte Belastung sind zuerst auszuschließen.",
  "prog.stable": "Stabil: keine messbare Veränderung der kardialen Kosten im Zeitraum.",
  "prog.none":
    "Keine Referenzpace wird in mindestens drei vergleichbaren Einheiten lange genug gehalten. Lockere Läufe mit gleichbleibender Dauer und konstanter Pace würden diese Analyse ermöglichen.",
  "prog.tempSpread":
    "Die Temperaturen im Datensatz reichen über {spread} °C. Bei gleicher Pace kostet Hitze 5 bis 10 bpm: ein Teil des beobachteten Trends kann rein saisonal sein.",

  "batch.week": "{year}-W{week}",
  "batch.duplicateOf": "{file} (identisch mit {first})",
  "batch.warnDuplicates":
    "{n} Duplikat(e) verworfen (gleicher Startzeitpunkt und gleiche Distanz): {list}.",
  "batch.warnRecordsGap":
    "{n} Datei(en), deren Punkte vor dem angegebenen Ende der Einheit aufhören ({list}): Das Ende der Aufzeichnung fehlt. Die Summen stammen aus der Zusammenfassung der Uhr, Tabellen und HF am Ende können aber unvollständig sein.",
  "batch.warnReclassified":
    "{n} Einheit(en) umklassifiziert: die in der Datei angegebene Sportart passte nicht zur Form der Daten ({list}).",
  "batch.warnLoadOnly":
    "{n} Einheit(en) ohne Ausdauercharakter im Umfang gezählt, aber von Pace-, Drift- und Prognoseanalysen ausgeschlossen.",
  "batch.warnHrSources":
    "Die HF-Quelle wechselt von Einheit zu Einheit: {strap} mit Brustgurt, {optical} am Handgelenk, {unknown} unbestimmt. Herzfrequenzen sind nur zwischen Einheiten derselben Quelle vergleichbar (Spalte hr_source der Einheitentabelle): Zonen, Drift und Trends Quelle für Quelle lesen.",
  "batch.warnCadenceLock":
    "{n} Datei(en) zeigen eine auf die Kadenz eingerastete HF: die Herzfrequenzwerte sind dort teilweise falsch und die zugehörigen Driftwerte nicht verwertbar.",
  "batch.warnDriftPartial":
    "Kardiale Drift für {ok} von {total} Einheit(en) berechnet: die übrigen sind zu kurz oder zu ungleichmäßig, als dass die Berechnung sinnvoll wäre.",
  "batch.warnCsFit":
    "Mäßige Anpassung des Modells der kritischen Geschwindigkeit (R² = {r2}): die Prognosen sind Richtwerte. Ein eigener Test (3 min und 12 min maximal, ausgeruht) ergäbe ein deutlich verlässlicheres Modell.",
  "batch.warnNoRace":
    "Kein Wettkampfergebnis angegeben. Die Prognosen beruhen nur auf Trainingsbelastungen, die die Wettkampfleistung meist überschätzen. Eine echte Wettkampfzeit verbessert die Kalibrierung deutlich.",
  "batch.racesFound":
    "In den Dateien erkannte Wettkämpfe: {list}. Sie kalibrieren die Prognosen. Prüfe die Liste: Ein Lauf am Limit über eine offizielle Distanz am Wochenende kann wie ein Wettkampf aussehen.",
  "race.noteMultisport":
    "Teil eines Multisport-Wettkampfs, kein reiner Laufwettkampf",
  "race.noteNonStandard":
    "keine Standarddistanz",
  "race.noteMeasured":
    "Strecke mit {km} km gemessen, zu weit von offiziellen {official} entfernt, um die Prognosen zu kalibrieren",
  "dossier.racesNote":
    "Erkannte Wettkämpfe. detected_by: user (vom Athleten markiert), strava (in Strava als Wettkampf markiert), name (Name der Aktivität), auto (Vorschlag: offizielle Distanz, durchgehende Belastung, hohe HF oder schnelles Tempo, Wochenende). time = verstrichene Zeit der Einheit. used = kalibriert die Prognosen.",
  "batch.warnMaxHr":
    "Beobachtete maximale HF ({observed} bpm) höher als die eingetragene ({maxHr} bpm). Alle Zonen sind verschoben, bis diese Einstellung korrigiert ist.",
  "batch.bundle.title": "gps-digest v1 — Übersicht mehrerer Einheiten",
  "batch.bundle.range": "{n} Einheiten vom {from} bis {to}",
  "batch.bundle.volume": "Gesamtumfang: {km} km, {dur} in Bewegung",
  "batch.bundle.note":
    "HF-Werte sind zwischen Einheiten nur vergleichbar, wenn die Spalte\nhr_source identisch ist. Vor jeder Schlussfolgerung die Warnungen lesen.",
  "common.refMaxHr": "Referenz-HFmax: {hr} bpm",

  "bundle.title": "gps-digest v1 — kompakte Aktivitätsübersicht zur Analyse durch ein LLM",
  "bundle.source": "Quelle: {format} | {raw} Rohpunkte -> {kept} behalten",
  "bundle.glossary": [
    "t_s = Sekunden seit dem Start | dist_m = kumulierte Distanz (m)",
    "pace_s_km = Pace in Sekunden/km | gap_s_km = steigungsbereinigte Pace (Minetti 2002)",
    "hr_bpm = Herzfrequenz | cad_spm = Kadenz (Schritte/min oder U/min) | pw_w = Leistung (W)",
    "decoupling_pct = aerobe Drift zwischen 1. und 2. Hälfte; > 5 % = Ausdauer limitierend",
    "hr_source = geschätzter HF-Sensor; NIEMALS HF aus verschiedenen Quellen vergleichen",
    "drift_applicable = no bedeutet, dass die Einheit diese Berechnung nicht erlaubt, nicht dass sie null ist",
  ].join("\n"),
  "bundle.tempWrist": "Uhrensensor (misst 3 bis 8 °C zu hoch, das ist NICHT die Lufttemperatur)",
  "bundle.tempExternal": "extern",

  "dossier.guide": `# ─────────────────────────────────────────────────────────────────────
# SO LESEN SIE DIESES DOSSIER
#
# Aufbau: zuerst übergreifende Tabellen (alle Einheiten zusammen), dann die
# Details jeder Einheit, jeweils eingeleitet durch „═══ EINHEIT n ═══“.
# Jeder Block beginnt mit „## blockname“ und enthält eine CSV mit Kopfzeile.
#
# Einheiten: Meter, Sekunden, bpm, Watt, Grad Celsius. Dezimaltrennzeichen
# = Punkt. Spaltentrennzeichen = Komma.
#
# Wichtigste Spalten
#   t_s          seit dem Start der Einheit vergangene Sekunden
#   dist_m       kumulierte Distanz seit dem Start, in Metern
#   speed        Pace oder Geschwindigkeit je nach Sportart: min/km beim
#                Laufen, km/h auf dem Rad, min/100m beim Schwimmen. Niemals
#                ineinander umrechnen.
#   pace_s_km    Pace in Sekunden pro Kilometer (300 = 5:00/km), berechnet
#                auf die BEWEGUNGSZEIT, wie bei Strava. Garmin Connect teilt
#                durch die Gesamtdauer: seine Pace-Werte sind daher langsamer.
#                Aus diesem Unterschied allein keine Leistungseinbuße folgern.
#   pace_mmss    dieselbe Pace in Minuten:Sekunden, zum Lesen
#   gap_s_km     steigungsbereinigte Pace (Minetti 2002): vergleichbar
#                zwischen einer hügeligen und einer flachen Strecke
#   grade_pct    durchschnittliche Steigung des Abschnitts, in Prozent
#   hr_bpm       Herzfrequenz
#   cad_spm      Kadenz in Schritten pro Minute (Laufen) oder U/min (Rad)
#   pw_w         Leistung in Watt
#
# Hinweise zum Lesen, nach Wichtigkeit
#   1. hr_source gibt den geschätzten Herzfrequenzsensor an. NIEMALS
#      HF-Werte zwischen zwei Einheiten verschiedener Quellen vergleichen:
#      der gemessene Unterschied wäre ein Hardware-Artefakt, keine
#      Formveränderung.
#   2. drift_applicable = no bedeutet, dass sich die Einheit nicht für die
#      Driftberechnung eignet (Belastung zu ungleichmäßig oder zu kurz).
#      Das ist keine Drift von null, sondern das Fehlen einer gültigen
#      Messung.
#   3. temp_c stammt vom Sensor der am Handgelenk getragenen Uhr. Er misst
#      die Lufttemperatur 3 bis 8 °C zu hoch. Das ist NICHT das Wetter.
#   4. Der detaillierte Datenstrom ist ein Mittelwert pro Intervall, kein
#      Momentanwert. Exakte Zeiten stehen in den Blöcken splits, laps und
#      intervals.
# ─────────────────────────────────────────────────────────────────────`,
  "dossier.title": "gps-digest — Trainingsdossier",
  "dossier.range": "{n} Einheit(en) vom {from} bis {to}",
  "dossier.volume": "Umfang: {km} km, {dur} in Bewegung",
  "dossier.contextNote":
    "Verlauf: {total} Einheiten. Vollständiges Detail für die letzten {days} Tage ({n} Einheit(en)); ältere stehen nur in der Tabelle „sessions“, eine Zeile pro Einheit.",
  "dossier.hrZonesObserved":
    "HF-Zonen: % der im Zeitraum beobachteten maximalen HF ({hr} bpm), mangels Athletenprofil. Gleiche Grenzen für alle Einheiten; mit maximaler HF oder Schwellen-HF werden sie verlässlich.",
  "dossier.hrZonesMax":
    "HF-Zonen: % der maximalen HF ({hr} bpm), gleiche Grenzen für alle Einheiten.",
  "dossier.hrZonesReserve":
    "HF-Zonen: % der Herzfrequenzreserve (maximale HF {max} bpm, Ruhe-HF {rest} bpm), gleiche Grenzen für alle Einheiten.",
  "dossier.hrZonesThreshold":
    "HF-Zonen: % der Schwellen-HF ({hr} bpm), gleiche Grenzen für alle Einheiten. Z5 beginnt an der Schwelle.",
  "dossier.privacyMasked":
    "GPS-Positionen im Umkreis von {m} m um Start und Ziel gelöscht. Distanzen, Dauern und Berechnungen beziehen sich auf die ganze Einheit: Nur die Koordinaten fehlen.",
  "dossier.warningsHeader": "⚠ WARNUNGEN — vor jeder Schlussfolgerung lesen",
  "dossier.unknownDate": "Datum unbekannt",
  "dossier.sessionHeader": "═══ EINHEIT {n} — {date} — {sport} — {label} ═══",
  "dossier.file": "Datei: {name}",
  "dossier.paceBasis":
    "Bewegungszeit (Strava-Konvention); Garmin Connect teilt durch die Gesamtdauer und zeigt daher eine langsamere Pace",
  "dossier.eleDevice": "barometrischer Höhenmesser der Uhr",
  "dossier.eleGps": "aus der GPS-Höhe berechnet; unterschätzt meist um 30 bis 50 %",
  "dossier.powerEstimated": "yes (Uhr, nicht mit Radleistung vergleichbar)",
  "dossier.driftReading": "Einordnung der Drift: {text}",
  "dossier.representativeness": "Repräsentativität: {text}",
  "dossier.conditions": "Bedingungen: {text}",
  "dossier.classification": "Klassifizierung: {text}",
  "dossier.swimSets": "Serien: {list}",
  "dossier.adherence": "{set} — {grade}: {verdicts}",
  "dossier.streamNote": "Datenstrom unten: ein Punkt alle {step}, Werte über das Intervall gemittelt",
  "dossier.progNote":
    "HF bei Referenzpace im Zeitverlauf. Nur Zeilen mit gleichem\nhr_source vergleichen: zwei Sensoren sind nicht vergleichbar.",
  "dossier.progMonthlyNote":
    "Aerobe Entwicklung pro Monat: durchschnittliche HF bei jedem Referenztempo,\ngewichtet nach der Zeit in diesem Tempo. Nur Zeilen mit gleicher hr_source vergleichen.",
  "dossier.progVerdict": "{pace} ({source}): {verdict}",

  "chart.sessionPower": "Leistung und Herzfrequenz",
  "chart.sessionPace": "Pace und Herzfrequenz",
  "chart.windowNote": "schattierter Bereich: für die Drift analysierter Abschnitt",
  "chart.reps": "Wiederholungen",
  "chart.repsNote": "Balken: Belastung, Punkte: Herzfrequenz",
  "chart.trendNote": "HF in bpm, ein Rückgang bedeutet Fortschritt",
  "chart.load": "Wochenbelastung",
  "chart.loadNote": "Balken: TRIMP, herzfrequenzbasierte Belastung für alle Sportarten; dunkler Anteil: Zeit in mittlerer oder hoher Intensität",
  "chart.loadNoteHours":
    "Balken: Stunden in Bewegung, alle Sportarten (keine Herzfrequenz in den Dateien)",
  "dossier.loadNote":
    "Wochenbelastung: eine Spalte pro Disziplin (Distanz, Dauer, Höhenmeter), nie addiert. trimp = Edwards-TRIMP (Minuten in jeder HF-Zone × Zonennummer), die einzige gemeinsame Belastung aller Sportarten; hr_coverage_pct = Anteil der Bewegungszeit mit Herzfrequenz. Eine Einheit ohne Herzfrequenz zählt nicht zum trimp.",

  "heat.humid": ", {pct} % Luftfeuchtigkeit",
  "heat.strong":
    "Starke Hitzebelastung (gefühlt {temp} °C{humid}). Auf diesem Niveau ist eine kardiale Drift von 8 bis 12 % zu erwarten, unabhängig von der Form.",
  "heat.notable":
    "Spürbare Hitze (gefühlt {temp} °C{humid}). Mit 5 bis 8 % rein thermisch bedingter Drift rechnen.",
  "heat.cold":
    "Kälte (gefühlt {temp} °C). Die HF ist bei gleicher Pace oft niedriger, und das Aufwärmen dauert länger.",

  "fit.hrEvidence":
    "Externer Herzfrequenzsensor über {source}{product} gekoppelt: aus der Datei gelesen, nicht geschätzt.",
  "fit.hrEvidenceProduct": " (Produkt {id})",
  "fit.hrEvidenceWrist":
    "Die Uhr meldet nur ihren optischen Handgelenksensor, kein externer Herzfrequenzsensor verbunden: aus der Datei gelesen, nicht geschätzt.",
  "fit.sourceN": "Quelle {n}",
  "fit.manufacturerN": "Hersteller {id}",
  "fit.errHeader": "Ungültige FIT-Datei: unerwarteter Header.",
  "fit.errSignature": "Ungültige FIT-Datei: Signatur fehlt.",
  "strava.errNoTime": "Strava-Aktivität {id}: Zeitstrom fehlt.",
  "strava.sensorCaveat":
    "Strava-Datenstrom: serverseitig geglättet. Die Erkennung des HF-Sensors ist weniger zuverlässig als bei einer originalen FIT-Datei.",

  // ── archive.ts ─────────────────────────────────────────────────────────
  "archive.empty":
    "Keine FIT-, TCX- oder GPX-Datei in diesem Archiv.",
  "archive.tooBig":
    "Archiv zu groß für den Browser: Entpacke es und lege nur die gewünschten Einheiten ab.",
  "archive.unsupported":
    "Dieses Archiv kann hier nicht gelesen werden (ZIP64, Verschlüsselung oder ungewöhnliche Komprimierung): Entpacke es und lege die FIT-, TCX- oder GPX-Dateien ab.",
  "archive.corrupt":
    "Archiv beschädigt oder unvollständig: Lade es erneut herunter.",
};
