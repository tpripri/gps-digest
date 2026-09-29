/** Catalogue de page : espagnol. Clés et emplacements : voir page-i18n.ts. */

import type { PageCatalog } from "./page-i18n.ts";

export const es: Partial<PageCatalog> = {
  "common.langs": "Idioma",
  "common.footerNav": "Pie de página",
  "common.privacy": "Privacidad",
  "common.source": "Código fuente",

  "home.title": "Convertir un archivo TCX, GPX o FIT a CSV para ChatGPT o Gemini — gps-digest",
  "home.description":
    "Herramienta gratuita que convierte los archivos de tu reloj GPS en un informe de entrenamiento legible por una IA. Detecta la banda pectoral, calcula la deriva cardíaca, comprueba si respetaste las series y proyecta tus marcas. Todo se calcula en tu navegador: no se envía ningún archivo.",
  "home.h1": "Haz que una IA analice tus sesiones de carrera",
  "home.og.description":
    "Los archivos de tu reloj son demasiado grandes para una IA. Esta herramienta los convierte en un informe estructurado que sí puede analizar.",
  "home.og.imageAlt": "Un archivo de reloj GPS convertido en un informe de entrenamiento estructurado.",

  "home.ld.description":
    "Convierte los archivos de relojes GPS (TCX, GPX, FIT) en un informe de entrenamiento estructurado, analizable por un modelo de lenguaje.",
  "home.ld.feature1": "Conversión de TCX, GPX y FIT a CSV estructurado",
  "home.ld.feature2": "Procesamiento íntegro en el navegador, sin enviar ningún archivo",
  "home.ld.feature3": "Detección del sensor de frecuencia cardíaca (banda o muñeca)",
  "home.ld.feature4": "Deriva cardíaca con control de validez",
  "home.ld.feature5": "Análisis del cumplimiento de las series",
  "home.ld.feature6": "Proyección de marcas en 5 km, 10 km, media maratón y maratón",
  "home.ld.feature7": "Número de archivos ilimitado",
  "home.ld.howto": "Hacer que una IA analice tus sesiones de carrera",
  "home.ld.step1.name": "Subir tus archivos",
  "home.ld.step1.text":
    "Arrastra los archivos TCX, GPX o FIT exportados de tu reloj. No hay límite de cantidad.",
  "home.ld.step2.name": "Indicar tus referencias",
  "home.ld.step2.text": "Indica tu frecuencia cardíaca máxima medida y una marca de competición reciente.",
  "home.ld.step3.name": "Leer las advertencias",
  "home.ld.step3.text":
    "La herramienta señala los cambios de sensor cardíaco y las sesiones cuya frecuencia cardíaca no es fiable.",
  "home.ld.step4.name": "Copiar el informe en la IA",
  "home.ld.step4.text":
    "Copia el informe generado y pégalo en ChatGPT, Gemini o Claude junto con tu pregunta.",
  "home.ld.faq1.q": "¿Por qué mi archivo TCX es demasiado grande para una IA?",
  "home.ld.faq1.a":
    "Un TCX de una hora grabado a 1 Hz pesa unos 1,7 MB, casi un 90 % de etiquetas XML, es decir, unos 533 000 tokens. Incluso cuando ese volumen cabe en la ventana de contexto, el modelo razona mal: se le pide un análisis de entrenamiento a partir de miles de líneas de coordenadas en bruto.",
  "home.ld.faq2.q": "¿Se envían mis archivos GPS a un servidor?",
  "home.ld.faq2.a":
    "No. Todo el cálculo se ejecuta en tu navegador. Ningún archivo pasa por un servidor, lo que puedes comprobar en la pestaña Red. Un recorrido GPS revela tu domicilio al metro: la herramienta recorta por defecto la salida y la llegada.",
  "home.ld.faq3.q": "¿Cómo saber si una sesión se grabó con banda pectoral o con el sensor de muñeca?",
  "home.ld.faq3.a":
    "El archivo casi nunca lo dice. La herramienta lo deduce de la firma de la señal, cuyo marcador más característico es el bloqueo en la cadencia: el sensor óptico confunde el ritmo de la zancada con el pulso y muestra, por ejemplo, 172 ppm en lugar de 140. Una banda pectoral mide una señal eléctrica y no puede cometer ese error.",
  "home.ld.faq4.q": "¿Se puede comparar la frecuencia cardíaca de muñeca con la de la banda?",
  "home.ld.faq4.a":
    "No. Las dos tecnologías divergen claramente durante el esfuerzo, y el sensor óptico se degrada cuando varía la intensidad. Un cambio de sensor a mitad de un periodo falsea en silencio zonas, derivas y tendencias. La herramienta detecta ese cambio, lo fecha y analiza los dos periodos por separado.",
  "home.ld.faq5.q": "¿Qué fiabilidad tiene una proyección de maratón?",
  "home.ld.faq5.a":
    "Baja. Un estudio con 2303 corredores aficionados mostró que la fórmula de Riegel está bien calibrada hasta la media maratón, pero da previsiones de maratón al menos diez minutos demasiado rápidas para la mitad de los corredores. Un modelo basado en uno o dos resultados reales de competición reduce el error aproximadamente a la mitad.",
  "home.ld.faq6.q": "¿La temperatura que muestra mi reloj es la del aire?",
  "home.ld.faq6.a":
    "No. El sensor se lleva en la muñeca y lo calienta el cuerpo: suele sobrestimar entre 3 y 8 °C. La herramienta muestra el valor, pero siempre con esta advertencia, también en el informe enviado a la IA.",

  "home.lede":
    "Los archivos de tu reloj son demasiado grandes para ChatGPT, Gemini o Claude. Esta herramienta los convierte en un informe de entrenamiento estructurado (ritmos, vueltas, zonas, repeticiones, deriva cardíaca) que la IA sí puede analizar.",
  "home.promise":
    "<strong>Tus archivos no salen de tu navegador.</strong> Todo el cálculo se hace en tu dispositivo, y puedes comprobarlo en la pestaña Red. Un recorrido GPS revela tu dirección al metro, así que la salida y la llegada se recortan por defecto. <a href=\"{{href:confidentialite.html}}\">Lo que sale y lo que nunca sale</a>.",
  "home.step1.title": "Sube tus archivos",
  "home.step1.text": "Tantos como quieras, en TCX, GPX o FIT, exportados de tu reloj o de Strava.",
  "home.step2.title": "Indica tus referencias",
  "home.step2.text": "FC máxima y última marca. Sin ellas, zonas y proyecciones quedan aproximadas.",
  "home.step3.title": "Lee las advertencias",
  "home.step3.text": "Cambio de sensor, FC poco fiable: de ellas depende la validez del resto.",
  "home.step4.title": "Descarga el informe",
  "home.step4.text": "Un archivo de texto completo y comentado, para pegar en ChatGPT, Gemini o Claude.",

  "home.why.title": "¿Por qué usar esta herramienta?",
  "home.why.p1":
    "Un archivo TCX de una hora grabado a 1 Hz pesa unos 1,7 MB, casi un 90 % de etiquetas XML. Son unos <strong>533 000 tokens</strong>. Incluso cuando ese volumen cabe en la ventana de contexto, el modelo razona mal: se le pide un análisis de entrenamiento a partir de miles de líneas de coordenadas en bruto.",
  "home.why.p2":
    "El informe que se genera aquí ocupa unas decenas de miles de tokens y contiene objetos que un modelo sabe interpretar: parciales por kilómetro, vueltas, tiempo por zona, repeticiones una a una, mejores esfuerzos, proyecciones. <strong>El análisis es mejor que con el archivo completo</strong>, no solo más barato.",
  "home.why.tableTitle": "Lo que la herramienta calcula por sí sola",
  "home.why.colAnalysis": "Análisis",
  "home.why.colAnswer": "Qué responde",
  "home.why.sensor": "Fuente de la FC",
  "home.why.sensorText":
    "¿Banda pectoral o sensor de muñeca? El archivo casi nunca lo dice. La herramienta lo deduce de la señal, en particular del bloqueo en la cadencia: cuando el reloj confunde las zancadas con las pulsaciones.",
  "home.why.drift": "Deriva cardíaca",
  "home.why.driftText":
    "¿Se degrada tu rendimiento en la segunda mitad del esfuerzo? Por encima del 5 %, la resistencia de base está en juego. La herramienta se niega a calcular una deriva en sesiones de series, donde la cifra no tendría sentido.",
  "home.why.blocks": "Cumplimiento de las series",
  "home.why.blocksText":
    "¿Son regulares tus repeticiones? ¿Se degrada el ritmo? ¿Sube la FC con el ritmo mantenido, señal de fatiga antes de que fallen las piernas?",
  "home.why.projections": "Proyección de marcas",
  "home.why.projectionsText":
    "5 km, 10 km, media maratón, maratón, con horquilla y nivel de fiabilidad. Una marca de competición pesa más que un esfuerzo de entrenamiento, y su peso disminuye con la antigüedad.",
  "home.why.hardware": "Cambio de equipo",
  "home.why.hardwareText":
    "A lo largo de varias sesiones, la herramienta detecta y fecha un cambio de sensor cardíaco, que invalidaría en silencio cualquier comparación de FC.",

  "home.set.title": "1. Tus referencias",
  "home.set.intro":
    "Opcional, pero sin estos valores las zonas se estiman con la FC máxima observada en los archivos, lo que es aproximado.",
  "home.set.fcmax": "FC máxima",
  "home.set.fcmaxHint": "Medida, no 220 menos la edad",
  "home.set.fcmaxPlaceholder": "p. ej. 185",
  "home.set.threshold": "Ritmo umbral",
  "home.set.thresholdHint": "Sostenido cerca de 1 h",
  "home.set.refDist": "Marca de referencia",
  "home.set.refDistHint": "Distancia",
  "home.set.refNone": "Ninguna",
  "home.set.ref5k": "5 km",
  "home.set.ref10k": "10 km",
  "home.set.refHalf": "Media maratón",
  "home.set.refMarathon": "Maratón",
  "home.set.refTime": "Tiempo",
  "home.set.refTimeHint": "h:mm:ss",
  "home.set.refDate": "Fecha de la marca",
  "home.set.refDateHint": "Pondera la antigüedad",
  "home.set.privacy": "Recorte de privacidad",
  "home.set.privacyHint": "Metros en la salida y la llegada",
  "home.set.weather": "Temperatura del aire",
  "home.set.weatherOn": "Obtener la meteorología real",
  "home.set.weatherOff": "No enviar nada",
  "home.set.weatherHint":
    "Envía a Open-Meteo el <strong>punto medio</strong> del recorrido, redondeado a ~1 km, y la fecha. Nunca tu salida, nunca tus datos.",

  "home.files.title": "2. Tus archivos",
  "home.files.drop": "Suelta aquí tus archivos",
  "home.files.formats": "TCX, GPX o FIT, tantos como quieras, una temporada entera si hace falta",
  "home.files.fit":
    "FIT es el formato nativo de tu reloj: es el único que incluye los largos de piscina y el sensor cardíaco realmente emparejado.",
  "home.files.pick": "Elegir archivos",

  "home.export.title": "3. Tu informe, listo para analizar",
  "home.export.intro":
    "Las ventanas de contexto actuales admiten sin problema 100 000 tokens, así que el ajuste por defecto prioriza el detalle. Baja un nivel si tu modelo es más limitado o si cargas muchas sesiones.",
  "home.export.resolution": "Detalle del registro",
  "home.export.res5s": "Un punto cada 5 s (máximo)",
  "home.export.res10s": "Un punto cada 10 s (recomendado)",
  "home.export.res30s": "Un punto cada 30 s (ligero)",
  "home.export.res100m": "Un punto cada 100 m",
  "home.export.res10m": "Un punto cada 10 m (muy detallado)",
  "home.export.resNone": "Solo tablas, sin registro continuo",
  "home.export.resSummary": "Resumen corto, sin detalle por sesión",
  "home.export.coords": "Coordenadas GPS",
  "home.export.coordsDrop": "Eliminar (recomendado)",
  "home.export.coordsKeep": "Conservar",
  "home.export.coordsHint": "El perfil, los ritmos y la FC se conservan en cualquier caso.",
  "home.export.questions": "Preguntas para tu IA",
  "home.export.q1":
    "Analiza mi deriva cardíaca teniendo en cuenta la temperatura y dime si mi resistencia de base es un factor limitante.",
  "home.export.q2": "¿He respetado mis series? ¿Qué debo corregir en la próxima sesión?",
  "home.export.q3": "Compara los periodos de cada sensor por separado y dime qué ha cambiado.",
  "home.export.q4": "A partir de esta carga, propón mi semana de entrenamiento.",
  "home.export.q5": "¿Es coherente mi distribución de intensidades con mi objetivo?",
  "home.export.preview": "Ver el informe generado",

  "home.results.title": "4. El detalle, si quieres profundizar",
  "home.results.overview": "Visión general",
  "home.results.colFile": "Archivo",
  "home.results.colDate": "Fecha",
  "home.results.colDist": "Dist.",
  "home.results.colMoving": "En movimiento",
  "home.results.colElapsed": "Total",
  "home.results.colSpeed": "Ritmo / velocidad",
  "home.results.colHr": "FC media",
  "home.results.colSensor": "Sensor",
  "home.results.colDrift": "Deriva",
  "home.results.colBlocks": "Series",
  "home.results.detail": "Detalle por sesión",
  "home.results.detailIntro":
    "Despliega una sesión para ver las señales detrás de cada veredicto. Resulta útil sobre todo para juzgar la detección del sensor: solo tú sabes qué sesiones hiciste con banda pectoral.",
  "home.results.load": "Carga de entrenamiento",
  "home.results.progression": "Progresión aeróbica",
  "home.results.progressionIntro":
    "FC a ritmo idéntico a lo largo del tiempo: el único indicador de forma que no depende ni del recorrido ni de las ganas del día. Los sensores se tratan por separado.",
  "home.results.projections": "Proyecciones",

  "home.faq.title": "Preguntas frecuentes",
  "home.faq.q1": "¿Por qué mi archivo TCX es demasiado grande para Gemini o ChatGPT?",
  "home.faq.a1":
    "Un TCX de una hora a 1 Hz pesa unos 1,7 MB, casi un 90 % de etiquetas XML, es decir, unos 533 000 tokens. Incluso cuando ese volumen cabe en la ventana de contexto, el modelo razona mal sobre miles de líneas de coordenadas en bruto.",
  "home.faq.q2": "¿Se envían mis archivos a un servidor?",
  "home.faq.a2":
    "No. Todo el cálculo se ejecuta en tu navegador, y puedes comprobarlo en la pestaña Red. Un recorrido GPS contiene tu domicilio al metro en sus primeros y últimos puntos: la herramienta los recorta por defecto.",
  "home.faq.q3": "¿Cómo adivina la herramienta si llevaba banda pectoral?",
  "home.faq.a3":
    "El marcador más característico es el bloqueo en la cadencia: un sensor óptico confunde el ritmo de la zancada con el pulso y muestra, por ejemplo, 172 ppm en lugar de 140. Una banda pectoral mide una señal eléctrica y no puede cometer ese error. A ello se suman la longitud de las mesetas de valores idénticos, la granularidad latido a latido y la latencia de respuesta a los cambios de ritmo. Es una heurística: su confianza está limitada, y se muestra.",
  "home.faq.q4": "¿Por qué no se calcula la deriva en algunas sesiones?",
  "home.faq.a4":
    "Porque allí no significaría nada. La deriva compara el rendimiento entre las dos mitades de un esfuerzo <em>continuo</em>. En una sesión de series, la relación velocidad/FC oscila entre repeticiones y recuperaciones: la cifra obtenida sería un artefacto. La herramienta prefiere decir que no mide antes que dar un número engañoso.",
  "home.faq.q5": "¿La temperatura que se muestra es la del aire?",
  "home.faq.a5":
    "No. El sensor está en la muñeca y lo calienta el cuerpo: suele sobrestimar entre 3 y 8 °C. El valor se muestra, pero siempre acompañado de esta advertencia, también en el informe enviado a la IA.",
  "home.faq.q6": "¿Qué fiabilidad tiene una proyección de maratón?",
  "home.faq.a6":
    "Baja, y hay que decirlo. Un estudio con 2303 corredores aficionados mostró que la fórmula de Riegel está bien calibrada hasta la media maratón, pero da previsiones de maratón al menos diez minutos demasiado rápidas para la mitad de los corredores. Un modelo basado en resultados reales de competición reduce el error aproximadamente a la mitad.",
  "home.faq.q7": "¿Qué formatos se aceptan?",
  "home.faq.a7":
    "TCX, GPX y FIT. <strong>Mejor el FIT</strong>: es el formato nativo de la mayoría de los relojes Garmin, Coros, Wahoo y Suunto, y el único que incluye los largos de piscina uno a uno y la lista del equipo emparejado. Así se sabe con certeza, y no por estimación, si llevabas banda pectoral. La exportación TCX de Garmin Connect aplasta todos los largos de una sesión de natación en una sola línea.",
  "home.faq.q8": "El ritmo que se muestra no coincide con el de Garmin Connect",
  "home.faq.a8":
    "Es una diferencia de convención, no un error. Aquí el ritmo se calcula sobre el <strong>tiempo en movimiento</strong>, como hace Strava: se excluyen las paradas en semáforos y las pausas. Garmin Connect divide por la duración total y por eso muestra un ritmo más lento. En una salida de 16 km por ciudad, la diferencia llega fácilmente a quince segundos por kilómetro. Las dos duraciones se muestran una al lado de la otra para que la diferencia se vea, y el informe enviado a la IA indica la convención usada. De lo contrario, un modelo compararía cifras que no son comparables.",
  "home.faq.q9": "El desnivel tampoco coincide",
  "home.faq.a9":
    "Si subes un archivo FIT, la herramienta usa el desnivel medido por el altímetro barométrico de tu reloj. En TCX o GPX esa información no existe: se recalcula a partir de la altitud GPS, lo que suele subestimarlo entre un 30 y un 50 %. En una salida real de 16 km, 61 metros calculados frente a 140 medidos. Es una razón más para preferir el FIT.",
  "home.faq.q10": "El deporte detectado es incorrecto, ¿por qué?",
  "home.faq.a10":
    "La herramienta no se fía de la etiqueta del archivo, porque a menudo es inexacta: una sesión de fuerza con tramos de carrera se etiqueta como «carrera», y una sesión en piscina como «otro». Por eso la clasificación se hace según la forma de los datos. Cada sesión recibe un nivel: análisis completo para carrera y ciclismo, tratamiento propio para natación y recuento como carga para todo lo demás. Una sesión de fuerza pesa en la recuperación aunque su ritmo no signifique nada.",

  "home.refs.title": "En qué se basan estos cálculos",
  "home.refs.intro":
    "Cada métrica se apoya en un trabajo publicado. Estos son, y lo que cada uno no dice.",
  "home.refs.minetti":
    "<strong>Ritmo ajustado a la pendiente.</strong> Minetti AE, et al. <em>Energy cost of walking and running at extreme uphill and downhill slopes.</em> J Appl Physiol. 2002;93(3):1039–46. <a href=\"https://doi.org/10.1152/japplphysiol.01177.2001\" rel=\"nofollow\">doi</a> · <a href=\"https://pubmed.ncbi.nlm.nih.gov/12183501/\" rel=\"nofollow\">PubMed</a>. Establecido en cinta: no tiene en cuenta ni el terreno técnico ni el daño muscular en bajadas largas.",
  "home.refs.sensors":
    "<strong>Diferencias entre sensores de FC.</strong> Gillinov S, et al. Med Sci Sports Exerc. 2017;49(8):1697–703. · Pasadyn SR, et al. Cardiovasc Diagn Ther. 2019;9(4):379–85. <a href=\"https://doi.org/10.21037/cdt.2019.06.05\" rel=\"nofollow\">doi</a>. Estos trabajos miden el error del sensor óptico; no proponen un método para identificarlo solo a partir del archivo. Nuestra detección se deriva de ellos: no es un protocolo validado.",
  "home.refs.riegel":
    "<strong>Proyección de marcas.</strong> Riegel PS. <em>Athletic records and human endurance.</em> American Scientist. 1981;69(3):285–90. Calibrada con récords del mundo, en carretera llana.",
  "home.refs.vickers":
    "<strong>Corrección para corredores aficionados.</strong> Vickers AJ, Vertosick EA. <em>An empirical study of race times in recreational endurance runners.</em> BMC Sports Sci Med Rehabil. 2016;8:26. <a href=\"https://doi.org/10.1186/s13102-016-0052-y\" rel=\"nofollow\">doi</a>. Es la razón directa por la que una marca de competición pesa más que un esfuerzo de entrenamiento.",
  "home.refs.cs":
    "<strong>Velocidad crítica.</strong> Jones AM, et al. <em>Critical power: implications for determination of V̇O₂max and exercise tolerance.</em> Med Sci Sports Exerc. 2010;42(10):1876–90. <a href=\"https://doi.org/10.1249/MSS.0b013e3181d9cf7f\" rel=\"nofollow\">doi</a>. El modelo supone que la velocidad crítica se puede mantener indefinidamente, lo que es falso a partir de unos 90 minutos.",
  "home.refs.coggan":
    "<strong>Potencia normalizada, TSS, deriva Pa:Hr.</strong> Metodologías de entrenamiento (Coggan, Friel) ampliamente adoptadas, pero no artículos revisados por pares. La distinción importa.",
  "home.refs.noteTitle": "Lo que estas referencias no garantizan",
  "home.refs.note":
    "Fundamentan las fórmulas, no las conclusiones. Una cifra calculada correctamente a partir de un sensor defectuoso sigue siendo falsa. Si tienes dolor, o antes de cambiar un plan de entrenamiento, la opinión de un profesional prevalece sobre esta herramienta y sobre la IA a la que envíes sus resultados.",
  "home.footer": "Licencia MIT. Sin cuenta, sin publicidad, sin rastreadores.",

  "js.libError":
    "<strong>No se ha podido cargar la biblioteca.</strong>Abre la página con <code>npm run dev</code>: abrirla directamente desde el explorador de archivos no funciona.",
  "js.vigilance": "{n} punto(s) de atención incluidos en el informe",
  "js.indicShort": "orient.",
  "js.sensorSummary": "{file} — {label} (confianza {confidence})",
  "js.noSignal": "Ninguna señal utilizable.",
  "js.signal": "{name}: <b>{value}</b> — {note}",
  "js.lock": "Bloqueo en la cadencia: <b>{pct}</b>, <b>{n}</b> tramo(s) excluido(s) del cálculo de la deriva.",
  "js.sets": "Series detectadas: <b>{sets}</b>",
  "js.weather": "Aire <b>{temp} °C</b>{feels}{humidity}{wind} — Open-Meteo",
  "js.weatherFeels": " (sensación {temp})",
  "js.weatherHumidity": ", {pct} HR",
  "js.weatherWind": ", viento {kmh} km/h",
  "js.drift":
    "Deriva <b>{pct}</b> {badge} en {min} min a {pace} ({coverage} de la sesión) — {interpretation}",
  "js.driftNone": "Deriva no calculada: {reason}",
  "js.hrr": "Recuperación cardíaca: <b>{bpm} bpm</b> en 60 s{erosion}",
  "js.hrrErosion": ", erosión de {bpm} bpm/repetición",
  "js.adherence": "<b>{set}</b> — {grade}: {verdicts}",
  "js.progPace": "Ritmo",
  "js.progSensor": "Sensor",
  "js.progPoints": "Puntos",
  "js.progTrend": "Tendencia",
  "js.progReading": "Lectura",
  "js.perWeek": "{value} bpm/sem",
  "js.progNone":
    "Todavía no es posible hacer seguimiento: hacen falta al menos tres sesiones de carrera a un ritmo comparable, con el mismo sensor de FC.",
  "js.trendTitle": "FC a {pace} — {source}",
  "js.projDistance": "Distancia",
  "js.projEstimate": "Estimación",
  "js.projRange": "Horquilla",
  "js.projReliability": "Fiabilidad",
  "js.projMethod": "Método",
  "js.cs": "Velocidad crítica <b>{pace}/km</b>, D' <b>{d} m</b>, R² <b>{r2}</b>",
  "js.projNone": "Ninguna proyección: hace falta al menos una sesión de carrera a pie.",
  "js.redOriginal": "Tus archivos originales",
  "js.redGenerated": "Informe generado",
  "js.redReduction": "Reducción",
  "js.redCompat": "Compatibilidad",
  "js.sizeMb": "{value} MB — ~{tokens} tokens",
  "js.sizeKb": "{value} KB — ~{tokens} tokens",
  "js.compatTooBig": "⚠ demasiado grande para ChatGPT, reduce el detalle",
  "js.compatGemini": "⚠ solo Gemini",
  "js.compatOk": "✓ ChatGPT, Claude y Gemini",
  "js.truncated": "… vista previa truncada, la copia lo contiene todo.",
  "js.download": "Descargar el informe (.txt)",
  "js.copy": "Copiar al portapapeles",
  "js.copied": "Copiado",
  "js.filename": "informe-entrenamiento.txt",

  "privacy.title": "Privacidad: lo que sale de tu navegador y lo que nunca sale",
  "privacy.description":
    "Tus archivos GPS nunca se envían a un servidor: todo el cálculo se hace en tu navegador. La única excepción es la meteorología, que envía el punto medio del recorrido redondeado a un kilómetro aproximadamente. Detalle técnico completo y verificable.",
  "privacy.ld.q1": "¿Se envían los archivos GPS a un servidor?",
  "privacy.ld.a1":
    "No. La lectura y el análisis se ejecutan en el navegador, en JavaScript, en el dispositivo del usuario. No se transmite ningún archivo, lo que se puede comprobar en la pestaña Red de las herramientas de desarrollo: ninguna petición contiene el contenido de un archivo.",
  "privacy.ld.q2": "¿Qué se transmite a un tercero?",
  "privacy.ld.a2":
    "Solo la petición meteorológica, cuando está activada: el punto medio del recorrido redondeado a dos decimales (unos 1,1 km de resolución) y la fecha de la sesión, enviados a Open-Meteo. Nunca el punto de salida, que suele corresponder al domicilio, y nunca datos fisiológicos ni identificadores.",
  "privacy.ld.q3": "¿Por qué la herramienta recorta el inicio y el final del recorrido?",
  "privacy.ld.a3":
    "Porque los primeros y últimos puntos de un recorrido GPS revelan el domicilio al metro. Este recorte está activado por defecto en 250 metros y se aplica antes de cualquier exportación, incluida la destinada a una inteligencia artificial.",
  "privacy.back": "← Volver a la herramienta",
  "privacy.h1": "Privacidad",
  "privacy.lede":
    "Un recorrido GPS contiene la dirección de tu domicilio al metro. Esta página dice exactamente qué se queda en tu dispositivo, qué sale y cómo comprobarlo tú mismo.",
  "privacy.principle.title": "El principio",
  "privacy.principle.p1":
    "<strong>Tus archivos nunca se transmiten.</strong> La decodificación y el análisis se ejecutan en JavaScript, en tu navegador, en tu dispositivo. No existe ningún servidor que los reciba. No es una política, es una ausencia de infraestructura.",
  "privacy.principle.p2":
    "En la práctica: puedes cortar tu conexión a internet después de cargar la página, subir tus archivos y el análisis funcionará. Solo fallará la meteorología, lo que demuestra precisamente que es lo único que sale.",
  "privacy.table.title": "Lo que sale y lo que no",
  "privacy.table.colData": "Dato",
  "privacy.table.colSent": "¿Se transmite?",
  "privacy.table.file": "El archivo de tu reloj",
  "privacy.table.fileText": "<strong>Nunca.</strong> El navegador lo lee del disco y lo analiza en memoria.",
  "privacy.table.track": "Tu recorrido GPS",
  "privacy.table.never": "<strong>Nunca.</strong>",
  "privacy.table.physio": "Frecuencia cardíaca, ritmos, potencia",
  "privacy.table.settings": "FC máxima, ritmo umbral, marcas introducidas",
  "privacy.table.settingsText":
    "<strong>Nunca.</strong> Se conservan en memoria durante la sesión y se pierden al cerrar la pestaña.",
  "privacy.table.dossier": "El informe generado",
  "privacy.table.dossierText":
    "<strong>Nunca</strong> por parte de la herramienta. Solo tú lo copias o lo descargas, y lo que hagas después con él depende de ti.",
  "privacy.table.midpoint": "Punto medio del recorrido, redondeado",
  "privacy.table.midpointText": "<strong>Sí</strong>, si la meteorología está activada. Ver más abajo.",
  "privacy.weather.title": "La meteorología: la única excepción",
  "privacy.weather.p1":
    "El sensor de temperatura de un reloj se lleva en la muñeca y lo calienta el cuerpo: sobrestima entre 3 y 8 °C e ignora la humedad y el viento. Sin embargo, el calor es el primer factor de confusión de la deriva cardíaca. Sin la temperatura real, se atribuye a la mala forma lo que solo es el coste térmico normal.",
  "privacy.weather.p2": "Por eso la petición está construida para que no sirva como dato de localización:",
  "privacy.weather.midTitle": "Se envía el punto medio del recorrido, nunca la salida",
  "privacy.weather.midText":
    "El punto de salida es tu domicilio. El punto medio es un lugar cualquiera, sin relación con el sitio donde duermes.",
  "privacy.weather.roundTitle": "Las coordenadas se redondean a dos decimales",
  "privacy.weather.roundText":
    "Es decir, unos 1,1 km de resolución. La meteorología es un fenómeno regional: no se pierde precisión, y la petición deja de señalar un lugar identificable.",
  "privacy.weather.nothingTitle": "No se adjunta nada más",
  "privacy.weather.nothingText":
    "Ni frecuencia cardíaca, ni ritmo, ni recorrido, ni identificador, ni cookie. Una latitud redondeada, una longitud redondeada, una fecha. La petición completa es así:",
  "privacy.weather.recipient":
    "El destinatario es <a href=\"https://open-meteo.com\" rel=\"nofollow noopener\">Open-Meteo</a>, un servicio meteorológico abierto. La función se desactiva desde un menú desplegable en la página principal, y la herramienta sigue funcionando sin ella.",
  "privacy.trim.title": "El recorte del domicilio",
  "privacy.trim.text":
    "Los primeros y últimos puntos de un recorrido revelan la puerta de tu casa. La herramienta elimina <strong>250 metros por defecto</strong>, tanto en la salida como en la llegada, antes de cualquier análisis y de cualquier exportación. El ajuste se puede cambiar, y una opción permite eliminar por completo las coordenadas conservando el perfil, los ritmos y la frecuencia cardíaca.",
  "privacy.note.title": "Lo que no controlamos",
  "privacy.note.text":
    "El informe que copias en ChatGPT, Gemini o Claude sale de tu navegador en el momento en que lo pegas, y queda sujeto a las condiciones de ese servicio, no a las nuestras. Si el informe todavía contiene coordenadas, se van con él. Precisamente por eso la opción «eliminar las coordenadas» está activada por defecto en la exportación.",
  "privacy.dont.title": "Lo que no hacemos",
  "privacy.dont.1": "Sin cuenta, sin registro, sin contraseña.",
  "privacy.dont.2": "Sin cookies, sin rastreadores publicitarios, sin píxeles.",
  "privacy.dont.3": "Sin publicidad, así que sin ningún interés en recopilar nada.",
  "privacy.dont.4": "Sin reventa de datos: no hay ninguno que revender.",
  "privacy.dont.analytics":
    "Si algún día se añade una medición de audiencia, será sin cookies ni identificadores persistentes, y esta página se actualizará antes.",
  "privacy.verify.title": "Compruébalo tú mismo",
  "privacy.verify.p1":
    "No te fíes de nuestra palabra. Abre las herramientas de desarrollo de tu navegador (<code>F12</code>), pestaña <strong>Red</strong>, y sube un archivo. Verás la carga de la página y, si la meteorología está activada, una petición a <code>open-meteo.com</code>. Nada más. Ninguna petición contiene el contenido de tu archivo.",
  "privacy.verify.p2":
    "El <a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">código fuente es abierto</a>, con licencia MIT: lo que hace la página se puede leer línea a línea.",
  "privacy.rights.title": "Tus derechos",
  "privacy.rights.text":
    "Como no se recopila ni se conserva ningún dato personal, no hay ningún registro que consultar, corregir o eliminar: cerrar la pestaña basta para borrarlo todo. Para cualquier pregunta, el repositorio de GitHub mencionado arriba permite abrir una discusión.",
  "privacy.footerTool": "La herramienta",
  "privacy.updated": "Última actualización: <time datetime=\"2026-09-25\">25 de septiembre de 2026</time>.",
  "common.blog": "Blog",
  "home.why.more":
    "Por qué una IA necesita un informe estructurado y no un archivo en bruto: <a href=\"{{href:post-ia-analyse.html}}\">leer el artículo</a>.",

  "blog.title": "Blog de gps-digest: entrenamiento, datos del reloj e IA",
  "blog.description":
    "Artículos sobre el análisis del entrenamiento con inteligencia artificial: qué pueden hacer ChatGPT, Gemini y Claude con tus sesiones, y cómo darles datos que de verdad puedan usar.",
  "blog.lede":
    "Entrenamiento, datos del reloj e inteligencia artificial. Artículos breves, con cifras, y sin promesas que los datos no puedan cumplir.",
  "blog.readMore": "Leer el artículo",

  "post.title": "Analizar tus entrenamientos con ChatGPT: la trampa de los tokens",
  "post.description":
    "Una IA analiza muy bien un entrenamiento, pero un TCX de una hora ocupa 533 000 tokens. Por qué falla, y cómo solucionarlo en tres minutos.",
  "post.kicker": "Entrenamiento e IA",
  "post.h1": "ChatGPT puede analizar tus entrenamientos de running. Siempre que consiga leerlos.",
  "post.meta": "Publicado el <time datetime=\"2026-09-28\">28 de septiembre de 2026</time> · 7 min de lectura",
  "post.lede":
    "Pregúntale a una IA por qué las series del martes se te hicieron tan duras y te responderá mejor que la mayoría de las apps de entrenamiento. Con una condición: que vea de verdad tus datos. Y ahí es donde todo se complica, y no por el motivo que imaginas.",
  "post.tldrTitle": "En resumen",
  "post.tldr1":
    "ChatGPT, Gemini y Claude saben interpretar una sesión, relacionarla con tu objetivo y responder a tus preguntas de seguimiento, como un entrenador disponible a cualquier hora.",
  "post.tldr2":
    "Un archivo TCX de una hora grabado a 1 Hz pesa unos 1,7 MB, es decir, unos 533 000 tokens, y casi el 90 % son etiquetas XML.",
  "post.tldr3": "Incluso cuando el archivo entra, el modelo razona mal sobre miles de líneas de coordenadas en bruto.",
  "post.tldr4":
    "La solución no es comprimir, sino reestructurar: parciales, vueltas, zonas, repeticiones. Una sesión cabe entonces en unos 5800 tokens, y el análisis mejora.",

  "post.why.title": "¿Por qué una IA es tan buena compañera de entrenamiento?",
  "post.why.p1":
    "Porque parte de tu pregunta, no de un panel de control. Una app te enseña los mismos gráficos que a todo el mundo. Una IA puede explicarte por qué tu ritmo cayó en el kilómetro 8, teniendo en cuenta el calor, tu semana cargada y el objetivo que le has dado.",
  "post.why.listIntro": "Con buenos datos, una IA sabe:",
  "post.why.li1": "explicar una sesión con palabras sencillas, sin jerga;",
  "post.why.li2":
    "relacionar tus cifras con tu objetivo: un 10K por debajo de 45 minutos no pide las mismas sesiones que un primer maratón;",
  "post.why.li3": "comparar varias semanas y detectar una tendencia que se te había escapado;",
  "post.why.li4":
    "responder a la siguiente pregunta, y a la siguiente, con la paciencia de un entrenador disponible a las 11 de la noche;",
  "post.why.li5": "proponer la semana que viene a partir de tu carga real, no de un plan genérico.",
  "post.why.p2":
    "Esa personalización es lo que marca la diferencia. Pero se basa en una suposición que casi nadie comprueba: que el modelo tiene acceso real a tus datos, y no a un resumen de tres líneas o a un archivo ilegible.",

  "post.tokens.title": "¿Qué es un token y por qué tu reloj genera tantos?",
  "post.tokens.p1":
    "Un token es la unidad de texto que un modelo de lenguaje lee y cobra: un trozo de palabra, de número o de puntuación. Cada modelo tiene un límite, su ventana de contexto, a partir del cual ya no puede leer nada más. Según el modelo y la suscripción, hoy va de unas decenas de miles a unos pocos millones de tokens.",
  "post.tokens.p2":
    "El problema es que los archivos del reloj están pensados para programas, no para ser leídos. Un archivo TCX repite las mismas etiquetas XML en cada segundo de tu salida. Esto es lo que miden nuestras pruebas:",
  "post.tokens.colCase": "Datos",
  "post.tokens.colSize": "Tamaño",
  "post.tokens.colTokens": "Tokens estimados",
  "post.tokens.r1": "Una sesión de una hora, archivo TCX en bruto",
  "post.tokens.r1size": "1,7 MB",
  "post.tokens.r1tokens": "≈ 533 000",
  "post.tokens.r2": "La misma sesión, como informe estructurado",
  "post.tokens.r2size": "≈ 18 KB",
  "post.tokens.r2tokens": "≈ 5800",
  "post.tokens.r3": "15 MB de archivos reales, en bruto",
  "post.tokens.r3size": "15 MB",
  "post.tokens.r3tokens": "≈ 4,7 millones",
  "post.tokens.r4": "Los mismos archivos, como informe estructurado",
  "post.tokens.r4size": "≈ 100 KB",
  "post.tokens.r4tokens": "≈ 32 000",
  "post.tokens.note":
    "Estimación a 3,2 caracteres por token, la proporción observada en CSV numérico. Mediciones reproducibles con las pruebas publicadas en el código fuente.",
  "post.tokens.p3":
    "Dicho de otro modo: una sola sesión en bruto puede saturar una suscripción estándar, y una temporada entera no cabe en ninguna parte.",

  "post.paste.title": "¿Qué pasa cuando pegas un archivo TCX en ChatGPT?",
  "post.paste.intro": "Tres escenarios posibles. Ninguno es bueno.",
  "post.paste.h1": "1. El archivo se rechaza",
  "post.paste.p1":
    "Es el caso más honesto: la interfaz te avisa de que el archivo es demasiado grande. Pierdes tiempo, pero al menos lo sabes.",
  "post.paste.h2": "2. El archivo se lee solo en parte, sin que lo sepas",
  "post.paste.p2":
    "Ante un adjunto pesado, los asistentes a menudo solo leen fragmentos, o lo pasan a un script que lo resume. La IA responde entonces con seguridad a partir de solo una parte de la sesión. La respuesta parece correcta. Puede que no lo sea.",
  "post.paste.h3": "3. El archivo entra, pero el análisis es flojo",
  "post.paste.p3":
    "Incluso con una ventana de contexto grande, un modelo aprovecha mal la información enterrada en mitad de un documento largo. Investigadores de Stanford documentaron este efecto con el nombre de «lost in the middle» (Liu et al., 2024). Pedir un análisis de entrenamiento a partir de 3600 líneas de latitudes y longitudes es pedirle que haga de cabeza cálculos que hace mal, sobre datos que casi no le dicen nada.",

  "post.restructure.title": "¿Hay que comprimir el archivo? No, hay que reestructurarlo",
  "post.restructure.p1":
    "Hacer el archivo más pequeño no basta: hay que hacerlo legible. Un entrenador no lee tus coordenadas GPS segundo a segundo. Mira tus tiempos por kilómetro, tus repeticiones y tu frecuencia cardíaca por zonas. Justo lo que un modelo de lenguaje sabe interpretar.",
  "post.restructure.colRaw": "En el archivo en bruto",
  "post.restructure.colDossier": "En un informe estructurado",
  "post.restructure.r1raw": "3600 líneas de latitud, longitud y altitud",
  "post.restructure.r1dossier": "Parciales por kilómetro, vueltas, tiempo en cada zona",
  "post.restructure.r2raw": "Un valor de frecuencia cardíaca por segundo",
  "post.restructure.r2dossier": "La deriva cardíaca ya calculada, con el tramo de la sesión medido",
  "post.restructure.r3raw": "Ninguna indicación sobre el sensor cardíaco",
  "post.restructure.r3dossier": "Banda pectoral o muñeca, con un nivel de confianza",
  "post.restructure.r4raw": "Etiquetas XML repetidas en cada punto",
  "post.restructure.r4dossier": "Tablas CSV con unidades explícitas",
  "post.restructure.p2":
    "Con 15 MB de archivos reales, el informe ocupa unos 32 000 tokens. Y el análisis que sale es mejor que con los archivos completos. No solo más barato: mejor, porque el modelo trabaja con objetos que entiende.",

  "post.blind.title": "¿Qué no puede adivinar una IA por sí sola?",
  "post.blind.p1":
    "Algunos errores no se ven en las cifras. Si nada los señala, la IA los toma por hechos y construye su análisis sobre ellos.",
  "post.blind.li1":
    "<strong>El sensor cardíaco.</strong> Un sensor de muñeca a veces confunde tu cadencia con tu pulso y marca 172 ppm en lugar de 140. Comparar una sesión con sensor de muñeca y otra con banda pectoral es comparar dos instrumentos, no dos estados de forma.",
  "post.blind.li2":
    "<strong>La temperatura.</strong> La del reloj la calienta tu muñeca: sobrestima el aire entre 3 y 8 °C. Una IA que la toma por la meteorología se equivoca sobre el origen de tu deriva cardíaca.",
  "post.blind.li3":
    "<strong>El ritmo.</strong> Strava lo calcula sobre el tiempo en movimiento; Garmin Connect, sobre la duración total. En una salida por ciudad, la diferencia supera fácilmente los 15 segundos por kilómetro.",
  "post.blind.li4":
    "<strong>Las mediciones que no tienen sentido.</strong> Una deriva cardíaca calculada en una sesión de series no significa nada. Mejor ninguna cifra que una cifra falsa que parece creíble.",
  "post.blind.p2":
    "Un buen informe no se limita a resumir. Dice qué es fiable y qué no, para que la IA no razone sobre arena.",

  "post.howto.title": "¿Cómo hacer que una IA analice tus sesiones en tres minutos?",
  "post.howto.step1":
    "<strong>Exporta tus archivos</strong> desde tu reloj o desde Strava, a ser posible en formato FIT, el más completo.",
  "post.howto.step2":
    "<strong>Súbelos a gps-digest.</strong> Todo se calcula en tu navegador: ningún archivo se envía a un servidor.",
  "post.howto.step3": "<strong>Copia el informe</strong> en ChatGPT, Gemini o Claude y haz tu pregunta.",
  "post.howto.cta": "Preparar mis sesiones para la IA",

  "post.prompts.title": "¿Qué preguntas hacerle a tu IA?",
  "post.prompts.intro":
    "Las mejores preguntas nacen de una duda real. Aquí tienes cinco ejemplos que funcionan bien con un informe estructurado:",
  "post.prompts.q1": "«¿Ha aumentado mi deriva cardíaca respecto al mes pasado, con una temperatura parecida?»",
  "post.prompts.q2": "«¿Mantuve el ritmo en las repeticiones del martes? ¿Qué corrijo la próxima vez?»",
  "post.prompts.q3": "«Con esta carga, ¿estoy listo para bajar de 45 minutos en un 10K dentro de seis semanas?»",
  "post.prompts.q4": "«¿Es coherente mi reparto entre rodajes suaves y sesiones duras para un maratón?»",
  "post.prompts.q5": "«Proponme la semana que viene teniendo en cuenta mi fatiga actual.»",

  "post.faq.title": "Preguntas frecuentes",
  "post.faq.q1": "¿Puede ChatGPT leer directamente un archivo FIT o TCX?",
  "post.faq.a1":
    "Puede abrirlo, pero no aprovecharlo bien. El FIT es un formato binario que la IA tiene que decodificar con un script, y un TCX de una hora ocupa unos 533 000 tokens. En ambos casos, el análisis se basa en fragmentos o en datos en bruto poco adecuados. Un informe estructurado resuelve los dos problemas.",
  "post.faq.q2": "¿Por qué no exportar simplemente un CSV desde Garmin Connect?",
  "post.faq.a2":
    "Porque esa exportación se limita básicamente a las vueltas. No incluye la deriva cardíaca, ni la detección del sensor, ni el detalle de las repeticiones, ni el contexto que evita malas interpretaciones, como la forma de calcular el ritmo.",
  "post.faq.q3": "¿Se envían mis datos a algún sitio?",
  "post.faq.a3":
    "No. Tus archivos se leen y analizan en tu navegador. Solo sale de tu dispositivo el informe que tú mismo copias en una IA, y las coordenadas GPS se eliminan de él por defecto.",
  "post.faq.q4": "¿Puede una IA sustituir a un entrenador?",
  "post.faq.a4":
    "No, y no es el objetivo. Explica, compara y propone, pero no te ve correr ni siente tus molestias. Ante una lesión o una duda seria, la opinión de un profesional va primero.",
  "post.faq.q5": "¿Qué IA elegir: ChatGPT, Gemini o Claude?",
  "post.faq.a5":
    "Las tres saben analizar un informe estructurado. La verdadera diferencia está en el tamaño de la ventana de contexto de tu suscripción. Con un informe de unos pocos miles de tokens por sesión, la pregunta deja de importar.",

  "post.sources.title": "Fuentes",
  "post.sources.liu":
    "Liu NF, et al. <em>Lost in the Middle: How Language Models Use Long Contexts.</em> Transactions of the Association for Computational Linguistics, 2024. <a href=\"https://arxiv.org/abs/2307.03172\" rel=\"nofollow\">arXiv:2307.03172</a>.",
  "post.sources.bench":
    "Mediciones de tamaño y de tokens: pruebas de gps-digest, reproducibles, en el <a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">código fuente abierto</a>.",

  "post.end.title": "Tu próxima sesión merece algo mejor que un gráfico genérico",
  "post.end.text":
    "Convierte los archivos de tu reloj en un informe que ChatGPT, Gemini o Claude puedan analizar de verdad. Gratis, sin cuenta, y tus archivos no salen de tu navegador.",
  "post.end.cta": "Probar gps-digest",
  "privacy.analytics.row": "Estadísticas de visitas",
  "privacy.analytics.rowText":
    "<strong>Sí, anónimas.</strong> Cloudflare Web Analytics cuenta las páginas vistas, sin cookies ni identificadores persistentes. Nada sobre tus archivos ni tus sesiones.",
  "privacy.analytics.active":
    "La medición de audiencia usa Cloudflare Web Analytics: sin cookies, sin identificadores persistentes y sin ningún dato de tus archivos. Cuenta páginas vistas, países, fuentes de tráfico y tipos de dispositivo, nunca a una persona.",
  "privacy.verify.p1Analytics":
    "No te fíes de nuestra palabra. Abre las herramientas de desarrollo de tu navegador (<code>F12</code>), pestaña <strong>Red</strong>, y sube un archivo. Verás la carga de la página, la medición de audiencia hacia <code>cloudflareinsights.com</code> y, si la meteorología está activada, una petición a <code>open-meteo.com</code>. Nada más. Ninguna petición contiene el contenido de tu archivo.",
};
