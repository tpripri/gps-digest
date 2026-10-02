/**
 * Catalogue espagnol. Les clés et les paramètres suivent le français
 * (i18n.ts), qui fait référence.
 *
 * Choix de vocabulaire : « ritmo » pour l'allure, « FC » pour la fréquence
 * cardiaque, « bpm » conservé comme unité (c'est celle des colonnes du
 * dossier), espace avant « % » comme le recommande la RAE.
 */

import type { Catalog } from "./i18n.ts";

export const es: Partial<Catalog> = {
  "unit.percent": " %",

  "digest.errFormat": "Formato no reconocido para «{filename}». Formatos aceptados: TCX, GPX, FIT.",
  "digest.errNoTime":
    "«{filename}» no tiene marcas de tiempo: es una ruta planificada, no una sesión registrada.",
  "digest.errNoPoints": "El archivo no contiene ningún punto utilizable.",
  "digest.warnZonesObserved":
    "Zonas de FC calculadas con la FC máxima observada en el archivo, no con un perfil de atleta: interpretar con prudencia.",
  "digest.warnNoFtp": "FTP desconocido: IF y TSS no calculados.",
  "digest.warnCoords":
    "Coordenadas de salida y llegada sin recortar: el recorrido puede revelar un domicilio.",
  "digest.warnHrSource":
    "Fuente de FC estimada: {label} (confianza {confidence}). Comparar valores cardíacos solo entre sesiones de la misma fuente.",
  "digest.warnDrift": "Deriva cardíaca no calculada: {reason}",

  "sensor.label.chest_strap": "banda pectoral",
  "sensor.label.optical": "sensor de muñeca",
  "sensor.label.unknown": "indeterminada",
  "sensor.lockRange": "FC bloqueada en la cadencia",
  "sensor.swim.name": "Detección no aplicable",
  "sensor.swim.note":
    "En natación, la FC se almacena y se vuelca al salir del agua: la forma de la señal no dice nada del sensor. Subir el archivo FIT permite, en cambio, leer directamente el equipo emparejado.",
  "sensor.lock.name": "Bloqueo en la cadencia",
  "sensor.lock.found":
    "La FC sigue a la cadencia durante una parte notable de la sesión: artefacto típico de un sensor de muñeca.",
  "sensor.lock.none": "No se detecta confusión entre FC y cadencia.",
  "sensor.plateau.name": "Meseta más larga",
  "sensor.plateau.long": "Secuencia larga de FC estrictamente constante: firma del suavizado óptico.",
  "sensor.plateau.normal": "Ninguna meseta anormalmente larga.",
  "sensor.plateauTime.name": "Tiempo en meseta",
  "sensor.plateauTime.note": "Parte del tiempo en que la FC no se mueve durante más de 5 s.",
  "sensor.step.name": "Variación media",
  "sensor.step.note": "{pct} % de los intervalos sin ninguna variación.",
  "sensor.lag.name": "Latencia de respuesta",
  "sensor.lag.slow": "La FC reacciona con un retraso importante a los cambios de ritmo.",
  "sensor.lag.fast": "Respuesta rápida a los cambios de ritmo.",
  "sensor.spike.name": "Pico de arranque",
  "sensor.spike.note":
    "FC aberrante al inicio y luego caída brusca: electrodos secos, típico de una banda pectoral.",
  "sensor.calibration.name": "Calibración",
  "sensor.calibration.note":
    "Umbrales establecidos con datos de carrera a pie: en bicicleta las señales son menos claras y el veredicto suele quedar indeterminado. El archivo FIT despeja la duda al indicar el equipo emparejado.",

  "drift.wristCaveat":
    "Sensor del reloj, calentado por la muñeca: suele sobrestimar entre 3 y 8 °C. NO es la temperatura del aire.",
  "drift.basisPowerIgnored":
    "Potencia presente pero ignorada: fuera del ciclismo la estima el reloj y no es una base fiable. Desacoplamiento calculado sobre la velocidad.",
  "drift.noWindowPower":
    "Ningún tramo de al menos 10 minutos a potencia regular en esta sesión. La relación potencia/FC solo se compara a esfuerzo constante; mejor analizar las repeticiones una por una.",
  "drift.noWindowSpeed":
    "Ningún tramo de al menos 10 minutos a ritmo regular en esta sesión. La deriva cardíaca solo se mide en un esfuerzo continuo; mejor analizar las repeticiones una por una.",
  "drift.sparseHr": "Se encontró una ventana regular, pero con muy pocos datos cardíacos utilizables.",
  "drift.halvesInsufficient": "Datos insuficientes para comparar las dos mitades de la ventana.",
  "drift.workDrop.power":
    "Esfuerzo en descenso del {drop} % entre las dos mitades de la ventana (potencia {from} → {to}): el rendimiento cae porque cae la intensidad, no porque el corazón derive. No se puede calcular ninguna deriva.",
  "drift.workDrop.speed":
    "Esfuerzo en descenso del {drop} % entre las dos mitades de la ventana (velocidad {from} → {to}): el rendimiento cae porque cae la intensidad, no porque el corazón derive. No se puede calcular ninguna deriva.",
  "drift.qualityNote.shortEasy":
    "Ventana corta y situada en la parte menos intensa de la sesión, probablemente un calentamiento o una vuelta a la calma. La cifra es exacta pero no describe el esfuerzo principal; mejor mirar el análisis de las repeticiones.",
  "drift.qualityNote.easy":
    "Único tramo regular encontrado: la parte menos intensa de la sesión. Allí la deriva es estructuralmente baja y dice poco del esfuerzo principal.",
  "drift.qualityNote.short":
    "Ventana de {min} min que cubre el {pct} % de la sesión: medida válida pero poco representativa del conjunto.",
  "drift.interp.negative":
    "Desacoplamiento negativo: el rendimiento mejora en la segunda mitad. Típico de un calentamiento aún incompleto al inicio de la ventana, o de una aceleración progresiva voluntaria.",
  "drift.interp.low": "Deriva muy baja: el esfuerzo estaba claramente por debajo del umbral aeróbico.",
  "drift.interp.normal":
    "Deriva dentro de la norma (≤ 5 %). La resistencia aeróbica sostiene este ritmo durante esta duración.",
  "drift.interp.markedHot":
    "Deriva marcada (> 5 %), pero con {temp} °C de aire: a esta temperatura, un desacoplamiento del 5 al 6 % es el coste térmico normal y no una señal de mala forma.",
  "drift.interp.marked":
    "Deriva marcada (> 5 %). El ritmo era demasiado alto para la duración, o la resistencia de base es el factor limitante. La deshidratación y la fatiga residual producen el mismo efecto.",
  "drift.interp.highHot":
    "Deriva importante (> 10 %) con {temp} °C: el calor explica parte de la cifra, pero no todo. Revisar la hidratación y el estado de frescura.",
  "drift.interp.high":
    "Deriva importante (> 10 %). Ritmo no sostenible durante esta duración en estas condiciones.",
  "drift.quality.solide": "sólida",
  "drift.quality.indicatif": "indicativa",

  "adh.tooFew": "Menos de dos repeticiones identificadas: nada que comparar.",
  "adh.veryRegular.pace": "Ritmo muy regular entre repeticiones (variación {cv} %).",
  "adh.veryRegular.power": "Potencia muy regular entre repeticiones (variación {cv} %).",
  "adh.regularOk": "Regularidad correcta (variación {cv} %).",
  "adh.irregular.pace":
    "Repeticiones irregulares en ritmo (variación {cv} %): gestión por trabajar, o sesión mal calibrada.",
  "adh.irregular.power":
    "Repeticiones irregulares en potencia (variación {cv} %): gestión por trabajar, o sesión mal calibrada.",
  "adh.fade.pace":
    "Pérdida del {pct} % en ritmo entre la primera y la última repetición: salida demasiado rápida, o volumen por encima del nivel actual.",
  "adh.fade.power":
    "Pérdida del {pct} % en potencia entre la primera y la última repetición: salida demasiado rápida, o volumen por encima del nivel actual.",
  "adh.build":
    "Progresión del {pct} % a lo largo de la serie: subida voluntaria, señal de que quedaba margen.",
  "adh.held.pace": "Ritmo mantenido de principio a fin de la serie.",
  "adh.held.power": "Potencia mantenida de principio a fin de la serie.",
  "adh.restLonger":
    "Recuperaciones cada vez más largas (+{s} s por repetición): la sesión se descontrola al final de la serie.",
  "adh.restShorter": "Recuperaciones cada vez más cortas ({s} s por repetición).",
  "adh.hrRiseStable":
    "Ritmo mantenido pero FC en aumento de {bpm} bpm a lo largo de la serie: coste cardíaco creciente a igual esfuerzo, firma de la fatiga acumulada.",
  "adh.hrRise": "FC en aumento de {bpm} bpm a lo largo de la serie.",
  "adh.hrrGood":
    "Recuperación cardíaca muy buena: caída de {bpm} bpm en 60 s tras cada repetición.",
  "adh.hrrOk": "Recuperación cardíaca correcta: {bpm} bpm en 60 s.",
  "adh.hrrSlow":
    "Recuperación lenta: solo {bpm} bpm de caída en 60 s. Fatiga residual, calor o recuperaciones demasiado cortas para el formato.",
  "adh.hrrErode":
    "La recuperación se erosiona {bpm} bpm por repetición: la serie consume las reservas más rápido de lo que deja ver el ritmo.",
  "adh.missingReps": "{done} repeticiones realizadas de las {planned} previstas.",
  "adh.targetMet.pace": "Ritmo objetivo cumplido.",
  "adh.targetMet.power": "Potencia objetivo cumplida.",
  "adh.belowTarget": "Serie realizada un {pct} % por debajo del objetivo.",
  "adh.aboveTarget":
    "Serie realizada un {pct} % por encima del objetivo: el beneficio de una sesión de intervalos viene de respetar la consigna, no de superarla.",
  "adh.grade.conforme": "conforme",
  "adh.grade.acceptable": "aceptable",
  "adh.grade.dégradé": "deficiente",
  "adh.grade.non évaluable": "no evaluable",

  "cls.pool": "Sin posición GPS, sin cadencia, velocidad de {speed} m/s: natación en piscina.",
  "cls.openWater":
    "Posición GPS intermitente ({pct} % de cobertura, {flips} cortes) a {speed} m/s sin cadencia: natación en aguas abiertas. La distancia GPS se sobrestima, porque la señal se recupera cada vez que el brazo sale del agua.",
  "cls.static":
    "{dist} m recorridos en {min} min: desplazamiento demasiado escaso para una actividad de resistencia.",
  "cls.crossTraining":
    "Declarada como carrera, pero {stopPct} % del tiempo detenido y {mpm} m por minuto transcurrido: esfuerzo discontinuo, probablemente fuerza o entrenamiento cruzado. Contada como carga, sin análisis de carrera.",
  "cls.hiking": "Senderismo: contado como carga, sin análisis de ritmo ni proyección.",
  "cls.unknownSport": "Deporte no reconocido como actividad de resistencia: contado solo como carga.",
  "erg.evidence":
    "Potencia bloqueada en {pinned} de {total} bloque(s): sesión en modo ERG. La distancia y la velocidad son virtuales y no miden nada.",
  "erg.warning":
    "Cadencia en descenso en {n} bloque(s) (hasta {max} rpm). En ERG, una cadencia que cae hace subir la resistencia, lo que la hace caer todavía más: esta espiral termina en una parada. La solución es relanzar voluntariamente la cadencia en cuanto empieza a caer, o desactivar el ERG en las últimas repeticiones.",

  "zone.1": "Z1 recuperación",
  "zone.2": "Z2 resistencia",
  "zone.3": "Z3 tempo",
  "zone.4": "Z4 umbral",
  "zone.5": "Z5 VO2max",
  "zone.6": "Z6 anaeróbica",
  "zone.7": "Z7 neuromuscular",
  "set.rest": ", recuperación {s} s",
  "set.power": " a {w} W",

  "swim.set": "{reps} × {dist} m a {pace}/100m",
  "swim.setRest": ", recuperación {s} s",
  "swim.lapDistance":
    "Distancia reconstruida a partir de las vueltas: el flujo de puntos no la contiene, lo cual es normal en piscina.",
  "swim.hr":
    "Frecuencia cardíaca en natación: un sensor óptico no lee bajo el agua y una banda pectoral no transmite sumergida, sino que registra y vuelca los datos al salir. Los valores son orientativos y su marca de tiempo aproximada. No se calcula ninguna deriva cardíaca en esta sesión.",
  "swim.noLaps":
    "Ninguna vuelta utilizable: la sesión no está dividida en largos. Solo son utilizables la distancia y la duración totales.",
  "swim.lowDensity":
    "Solo {swim} min de natación efectiva de {elapsed} min transcurridos: sesión muy fraccionada o baño más que entrenamiento. Interpretar como tal.",
  "swim.openWater":
    "Natación en aguas abiertas: la distancia viene del GPS, que se corta con cada brazada sumergida y se recupera después. Suele sobrestimarse entre un 5 y un 15 %, y el ritmo instantáneo no es utilizable; solo lo son las medias.",
  "swim.noStrokes":
    "El archivo no contiene recuento de brazadas: el SWOLF, que mide la eficiencia de nado, no se puede calcular. No todos los relojes lo registran.",
  "swim.noPoolLength":
    "Longitud de piscina no deducida de los datos: las distancias se toman tal cual del reloj.",

  "race.400": "400 m",
  "race.800": "800 m",
  "race.1000": "1000 m",
  "race.1609.344": "1 milla",
  "race.3000": "3000 m",
  "race.5000": "5 km",
  "race.10000": "10 km",
  "race.15000": "15 km",
  "race.20000": "20 km",
  "race.21097.5": "media maratón",
  "race.42195": "maratón",
  "proj.method.race": "Riegel a partir de {ref} en competición (k={k})",
  "proj.method.raceAge": ", marca de hace {months} meses",
  "proj.method.training": "Riegel a partir de un esfuerzo de {ref} en entrenamiento",
  "proj.method.cs": "Velocidad crítica (CS {pace}/km, R²={r2})",
  "proj.caveat.marathon":
    "Una proyección de maratón a partir de datos de entrenamiento supone una preparación específica completada: tiradas largas, ritmo específico, estrategia de nutrición. Es la proyección menos fiable de todas.",
  "proj.caveat.half": "Supone una preparación específica y un ritmo mantenido con regularidad.",
  "proj.confidence.haute": "alta",
  "proj.confidence.moyenne": "media",
  "proj.confidence.faible": "baja",

  "prog.tooFew":
    "Menos de tres sesiones de carrera utilizables: el seguimiento de la progresión necesita más puntos.",
  "prog.multiSource":
    "Varias fuentes de FC en el lote: las curvas se construyen por separado para cada sensor. Compararlas entre sí no tendría sentido.",
  "prog.shortSpan": "Periodo demasiado corto para distinguir una progresión de las variaciones diarias.",
  "prog.improving": "Progresión clara: unos {bpm} bpm menos por semana a {pace}/km.",
  "prog.worsening":
    "Coste cardíaco en aumento a {pace}/km. Calor, fatiga acumulada o carga demasiado densa son las explicaciones que hay que descartar primero.",
  "prog.stable": "Estable: ninguna evolución medible del coste cardíaco en el periodo.",
  "prog.none":
    "Ningún ritmo de referencia se mantiene lo suficiente en al menos tres sesiones comparables. Rodajes de duración regular a ritmo constante harían posible este seguimiento.",
  "prog.tempSpread":
    "Las temperaturas del lote abarcan {spread} °C. A igual ritmo, el calor cuesta entre 5 y 10 bpm: parte de la tendencia observada puede ser solo estacional.",

  "batch.week": "{year}-S{week}",
  "batch.duplicateOf": "{file} (idéntico a {first})",
  "batch.warnDuplicates":
    "{n} duplicado(s) descartado(s) (misma hora de inicio y misma distancia): {list}.",
  "batch.warnReclassified":
    "{n} sesión(es) reclasificada(s): el deporte declarado en el archivo no correspondía a la forma de los datos ({list}).",
  "batch.warnLoadOnly":
    "{n} sesión(es) ajena(s) a la resistencia contada(s) en el volumen pero excluida(s) de los análisis de ritmo, deriva y proyección.",
  "batch.warnSensorChange":
    "Cambio de sensor de FC detectado hacia el {date} ({from} → {to}). Las comparaciones cardíacas a uno y otro lado de esta fecha no son válidas: zonas, derivas y tendencias de FC deben analizarse por separado en cada periodo.",
  "batch.warnCadenceLock":
    "{n} archivo(s) presentan un bloqueo de la FC en la cadencia: los valores cardíacos son parcialmente falsos y las derivas correspondientes no son utilizables.",
  "batch.warnDriftPartial":
    "Deriva cardíaca calculada en {ok} de {total} sesión(es): las demás son demasiado cortas o irregulares para que el cálculo tenga sentido.",
  "batch.warnCsFit":
    "Ajuste mediocre del modelo de velocidad crítica (R² = {r2}): las proyecciones son orientativas. Un test específico (3 min y 12 min a tope, descansado) daría un modelo mucho más fiable.",
  "batch.warnNoRace":
    "No se ha indicado ningún resultado de competición. Las proyecciones se basan solo en esfuerzos de entrenamiento, que suelen sobrestimar el rendimiento en carrera. Indicar una marca real mejora claramente la calibración.",
  "batch.warnMaxHr":
    "FC máxima observada ({observed} bpm) superior a la indicada ({maxHr} bpm). Todas las zonas están desplazadas mientras no se corrija este ajuste.",
  "batch.bundle.title": "gps-digest v1 — resumen de varias sesiones",
  "batch.bundle.range": "{n} sesiones del {from} al {to}",
  "batch.bundle.volume": "volumen total: {km} km, {dur} en movimiento",
  "batch.bundle.note":
    "Los valores de FC solo son comparables entre sesiones si la columna\nhr_source es idéntica. Leer las advertencias antes de sacar conclusiones.",
  "common.refMaxHr": "FC máxima de referencia: {hr} bpm",

  "bundle.title": "gps-digest v1 — resumen de actividad compactado para su análisis por un LLM",
  "bundle.source": "fuente: {format} | {raw} puntos brutos -> {kept} conservados",
  "bundle.glossary": [
    "t_s = segundos desde la salida | dist_m = distancia acumulada (m)",
    "pace_s_km = ritmo en segundos/km | gap_s_km = ritmo ajustado a la pendiente (Minetti 2002)",
    "hr_bpm = frecuencia cardíaca | cad_spm = cadencia (pasos/min o rpm) | pw_w = potencia (W)",
    "decoupling_pct = deriva aeróbica entre la 1.ª y la 2.ª mitad; > 5 % = resistencia limitante",
    "hr_source = sensor de FC estimado; NUNCA comparar FC de fuentes distintas",
    "drift_applicable = no significa que la sesión no permite este cálculo, no que valga cero",
  ].join("\n"),
  "bundle.tempWrist": "sensor del reloj (sobrestima entre 3 y 8 °C, NO es la temperatura del aire)",
  "bundle.tempExternal": "externa",

  "dossier.guide": `# ─────────────────────────────────────────────────────────────────────
# CÓMO LEER ESTE INFORME
#
# Estructura: primero las tablas transversales (todas las sesiones juntas),
# después el detalle de cada sesión, cada una introducida por «═══ SESIÓN n ═══».
# Cada bloque empieza por «## nombre_del_bloque» y contiene un CSV con cabecera.
#
# Unidades: metros, segundos, bpm, vatios, grados Celsius. Separador decimal
# = punto. Separador de columnas = coma.
#
# Columnas principales
#   t_s          segundos transcurridos desde el inicio de la sesión
#   dist_m       distancia acumulada desde la salida, en metros
#   speed        ritmo o velocidad según el deporte: min/km a pie, km/h en
#                bicicleta, min/100m en natación. Nunca convertir uno en otro.
#   pace_s_km    ritmo en segundos por kilómetro (300 = 5:00/km), calculado
#                sobre el tiempo EN MOVIMIENTO, como Strava. Garmin Connect
#                divide por la duración total: sus ritmos son más lentos. No
#                concluir un bajo rendimiento solo por esta diferencia.
#   pace_mmss    el mismo ritmo en minutos:segundos, para la lectura
#   gap_s_km     ritmo ajustado a la pendiente (Minetti 2002): comparable entre
#                una salida con desnivel y una llana
#   grade_pct    pendiente media del segmento, en porcentaje
#   hr_bpm       frecuencia cardíaca
#   cad_spm      cadencia en pasos por minuto (carrera) o rpm (bicicleta)
#   pw_w         potencia en vatios
#
# Precauciones de lectura, por orden de importancia
#   1. hr_source indica el sensor cardíaco estimado. NUNCA comparar valores
#      de FC entre dos sesiones de fuentes distintas: la diferencia medida
#      sería un artefacto del equipo, no un cambio de forma.
#   2. drift_applicable = no significa que la sesión no se presta al cálculo
#      de la deriva (esfuerzo demasiado irregular o demasiado corto). No es
#      una deriva nula: es la ausencia de una medida válida.
#   3. temp_c procede del sensor del reloj, llevado en la muñeca. Sobrestima
#      la temperatura del aire entre 3 y 8 °C. NO es la meteorología.
#   4. El flujo detallado es una media por intervalo, no una lectura
#      instantánea. Los tiempos exactos están en los bloques splits, laps e
#      intervals.
# ─────────────────────────────────────────────────────────────────────`,
  "dossier.title": "gps-digest — informe de entrenamiento",
  "dossier.range": "{n} sesión(es) del {from} al {to}",
  "dossier.volume": "volumen: {km} km, {dur} en movimiento",
  "dossier.contextNote":
    "Historial: {total} sesiones. Detalle completo de los últimos {days} días ({n} sesión(es)); las más antiguas solo aparecen en la tabla «sessions», una línea cada una.",
  "dossier.warningsHeader": "⚠ ADVERTENCIAS — leer antes de sacar conclusiones",
  "dossier.unknownDate": "fecha desconocida",
  "dossier.sessionHeader": "═══ SESIÓN {n} — {date} — {sport} — {label} ═══",
  "dossier.file": "archivo: {name}",
  "dossier.paceBasis":
    "tiempo en movimiento (convención de Strava); Garmin Connect divide por la duración total y por eso muestra un ritmo más lento",
  "dossier.eleDevice": "altímetro barométrico del reloj",
  "dossier.eleGps": "calculado a partir de la altitud GPS; suele subestimar entre un 30 y un 50 %",
  "dossier.powerEstimated": "yes (reloj, no comparable con la potencia en bicicleta)",
  "dossier.driftReading": "lectura de la deriva: {text}",
  "dossier.representativeness": "representatividad: {text}",
  "dossier.conditions": "condiciones: {text}",
  "dossier.classification": "clasificación: {text}",
  "dossier.swimSets": "series: {list}",
  "dossier.adherence": "{set} — {grade}: {verdicts}",
  "dossier.streamNote": "flujo a continuación: un punto cada {step}, valores promediados en el intervalo",
  "dossier.progNote":
    "FC a ritmo de referencia, a lo largo del tiempo. Comparar solo\nfilas con el mismo hr_source: dos sensores no son comparables.",
  "dossier.progMonthlyNote":
    "Progresión aeróbica por mes: FC media a cada ritmo de referencia,\nponderada por el tiempo pasado a ese ritmo. Compara solo filas con el mismo hr_source.",
  "dossier.progVerdict": "{pace} ({source}): {verdict}",

  "chart.sessionPower": "Potencia y frecuencia cardíaca",
  "chart.sessionPace": "Ritmo y frecuencia cardíaca",
  "chart.windowNote": "zona sombreada: tramo analizado para la deriva",
  "chart.reps": "Repeticiones",
  "chart.repsNote": "barras: esfuerzo, puntos: frecuencia cardíaca",
  "chart.trendNote": "FC en bpm, una bajada indica progresión",
  "chart.load": "Carga semanal",
  "chart.loadNote": "parte oscura: tiempo a intensidad alta",

  "heat.humid": ", {pct} % de humedad",
  "heat.strong":
    "Estrés térmico fuerte (sensación de {temp} °C{humid}). A este nivel se espera una deriva cardíaca del 8 al 12 %, independientemente de la forma.",
  "heat.notable":
    "Calor notable (sensación de {temp} °C{humid}). Contar con un 5 a 8 % de deriva de origen puramente térmico.",
  "heat.cold":
    "Frío (sensación de {temp} °C). La FC suele ser más baja a igual ritmo, y el calentamiento requiere más tiempo.",

  "fit.hrEvidence":
    "Sensor cardíaco externo emparejado por {source}{product}: información leída en el archivo, no estimada.",
  "fit.hrEvidenceProduct": " (producto {id})",
  "fit.sourceN": "fuente {n}",
  "fit.errHeader": "Archivo FIT no válido: encabezado inesperado.",
  "fit.errSignature": "Archivo FIT no válido: falta la firma.",
  "strava.errNoTime": "Actividad de Strava {id}: falta el flujo temporal.",
  "strava.sensorCaveat":
    "Flujo de Strava: suavizado en el servidor. La detección del sensor de FC es menos fiable que a partir de un archivo FIT original.",

  // ── archive.ts ─────────────────────────────────────────────────────────
  "archive.empty":
    "No hay ningún archivo FIT, TCX o GPX en este archivo comprimido.",
  "archive.tooBig":
    "Archivo comprimido demasiado grande para el navegador: descomprímelo y suelta solo las sesiones que quieras.",
  "archive.unsupported":
    "Este archivo comprimido no se puede leer aquí (ZIP64, cifrado o compresión poco habitual): descomprímelo y suelta los archivos FIT, TCX o GPX.",
  "archive.corrupt":
    "Archivo comprimido dañado o incompleto: vuelve a descargarlo.",
};
