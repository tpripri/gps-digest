/** Catalogue de page : anglais. Clés et emplacements : voir page-i18n.ts. */

import type { PageCatalog } from "./page-i18n.ts";

export const en: PageCatalog = {
  "common.langs": "Language",
  "common.footerNav": "Footer",
  "common.privacy": "Privacy",
  "common.source": "Source code",

  "home.title": "Convert TCX, GPX or FIT files to CSV for ChatGPT or Gemini — gps-digest",
  "home.description":
    "Free tool that turns your GPS watch files into a training file an AI can read. Detects chest straps, computes cardiac drift, checks whether your intervals were executed as planned and projects your race times. Everything runs in your browser: no file is uploaded.",
  "home.h1": "Get your running sessions analyzed by an AI",
  "home.og.description":
    "Your watch files are too big for an AI. This tool turns them into a structured file it can actually analyze.",
  "home.og.imageAlt": "A GPS watch file turned into a structured training file.",

  "home.ld.description":
    "Turns GPS watch files (TCX, GPX, FIT) into a structured training file that a language model can analyze.",
  "home.ld.feature1": "TCX, GPX and FIT conversion to structured CSV",
  "home.ld.feature2": "Processed entirely in the browser, no file uploaded",
  "home.ld.feature3": "Heart rate sensor detection (chest strap or wrist)",
  "home.ld.feature4": "Cardiac drift with validity checks",
  "home.ld.feature5": "Interval execution analysis",
  "home.ld.feature6": "Race time projections for 5K, 10K, half marathon and marathon",
  "home.ld.feature7": "Unlimited number of files",
  "home.ld.howto": "Get your running sessions analyzed by an AI",
  "home.ld.step1.name": "Drop your files",
  "home.ld.step1.text":
    "Drag in the TCX, GPX or FIT files exported from your watch. There is no limit on the number.",
  "home.ld.step2.name": "Enter your benchmarks",
  "home.ld.step2.text": "Enter your measured maximum heart rate and a recent race time.",
  "home.ld.step3.name": "Read the warnings",
  "home.ld.step3.text":
    "The tool flags heart rate sensor changes and sessions where heart rate data is unreliable.",
  "home.ld.step4.name": "Copy the file into the AI",
  "home.ld.step4.text":
    "Copy the generated file and paste it into ChatGPT, Gemini or Claude along with your question.",
  "home.ld.faq1.q": "Why is my TCX file too big for an AI?",
  "home.ld.faq1.a":
    "A one-hour TCX recorded at 1 Hz weighs about 1.7 MB, nearly 90% of it XML tags, which is roughly 533,000 tokens. Even when that fits in the context window, the model reasons poorly: it is asked for a training analysis from thousands of lines of raw coordinates.",
  "home.ld.faq2.q": "Are my GPS files sent to a server?",
  "home.ld.faq2.a":
    "No. All computation runs in your browser. No file goes through a server, which you can check in the Network tab. A GPS track reveals your home address to the meter: the tool trims the start and finish by default.",
  "home.ld.faq3.q": "How can I tell whether a session was recorded with a chest strap or the wrist sensor?",
  "home.ld.faq3.a":
    "The file almost never says. The tool infers it from the signature of the signal, the most telling marker being cadence lock: the optical sensor mistakes your stride rate for your pulse and shows, for example, 172 bpm instead of 140. A chest strap measures an electrical signal and cannot make that error.",
  "home.ld.faq4.q": "Can wrist and chest strap heart rate be compared?",
  "home.ld.faq4.a":
    "No. The two technologies diverge clearly during exercise, and the optical sensor degrades when intensity changes. A sensor change in the middle of a period silently distorts zones, drift and trends. The tool detects that change, dates it and analyzes both periods separately.",
  "home.ld.faq5.q": "How reliable is a marathon projection?",
  "home.ld.faq5.a":
    "Low. A study of 2,303 recreational runners showed that the Riegel formula is well calibrated up to the half marathon but gives marathon predictions at least ten minutes too fast for half of runners. A model based on one or two real race results roughly halves the error.",
  "home.ld.faq6.q": "Is the temperature shown by my watch the air temperature?",
  "home.ld.faq6.a":
    "No. The sensor is worn on the wrist and warmed by the body: it usually reads 3 to 8 °C too high. The tool shows the value but always with this warning, including in the file sent to the AI.",

  "home.lede":
    "Your watch files are too big for ChatGPT, Gemini or Claude. This tool turns them into a structured training file (paces, laps, zones, reps, cardiac drift) that the AI can actually analyze.",
  "home.promise":
    "<strong>Your files never leave your browser.</strong> All computation happens on your device, and you can check it in the Network tab. A GPS track reveals your address to the meter, so the start and finish are trimmed by default. <a href=\"/{{locale}}/confidentialite.html\">What leaves, and what never does</a>.",
  "home.step1.title": "Drop your files",
  "home.step1.text": "As many as you like, in TCX, GPX or FIT, exported from your watch or from Strava.",
  "home.step2.title": "Enter your benchmarks",
  "home.step2.text": "Max heart rate and latest race time. Without them, zones and projections stay approximate.",
  "home.step3.title": "Read the warnings",
  "home.step3.text": "Sensor changes and unreliable heart rate determine whether the rest holds up.",
  "home.step4.title": "Get your file",
  "home.step4.text": "A complete, annotated text file to drop into ChatGPT, Gemini or Claude.",

  "home.why.title": "Why use this tool?",
  "home.why.p1":
    "A one-hour TCX file recorded at 1 Hz weighs about 1.7 MB, nearly 90% of it XML tags. That is roughly <strong>533,000 tokens</strong>. Even when that fits in the context window, the model reasons poorly: it is asked for a training analysis from thousands of lines of raw coordinates.",
  "home.why.p2":
    "The file produced here is a few tens of thousands of tokens and contains objects a model knows how to read: per-kilometer splits, laps, time in zones, reps one by one, best efforts, projections. <strong>The analysis is better than with the full file</strong>, not just cheaper.",
  "home.why.tableTitle": "What the tool computes on its own",
  "home.why.colAnalysis": "Analysis",
  "home.why.colAnswer": "What it answers",
  "home.why.sensor": "Heart rate source",
  "home.why.sensorText":
    "Chest strap or wrist sensor? The file almost never says. The tool infers it from the signal, especially from cadence lock, when the watch mistakes your strides for heartbeats.",
  "home.why.drift": "Cardiac drift",
  "home.why.driftText":
    "Does your efficiency drop in the second half of the effort? Above 5%, base endurance is the issue. The tool refuses to compute drift on interval sessions, where the number would be meaningless.",
  "home.why.blocks": "Interval execution",
  "home.why.blocksText":
    "Are your reps consistent? Does your pace fade? Does heart rate climb while pace holds, a sign of fatigue before the legs give out?",
  "home.why.projections": "Race projections",
  "home.why.projectionsText":
    "5K, 10K, half marathon, marathon, with a range and a reliability level. A race result counts more than a training effort, and its weight fades with age.",
  "home.why.hardware": "Hardware change",
  "home.why.hardwareText":
    "Across several sessions, the tool detects and dates a heart rate sensor change, which would otherwise silently invalidate every heart rate comparison.",

  "home.set.title": "1. Your benchmarks",
  "home.set.intro":
    "Optional, but without these values zones are estimated from the maximum heart rate observed in the files, which is approximate.",
  "home.set.fcmax": "Max heart rate",
  "home.set.fcmaxHint": "Measured, not 220 minus age",
  "home.set.fcmaxPlaceholder": "e.g. 185",
  "home.set.threshold": "Threshold pace",
  "home.set.thresholdHint": "Held for about 1 h",
  "home.set.refDist": "Reference race",
  "home.set.refDistHint": "Distance",
  "home.set.refNone": "None",
  "home.set.ref5k": "5K",
  "home.set.ref10k": "10K",
  "home.set.refHalf": "Half marathon",
  "home.set.refMarathon": "Marathon",
  "home.set.refTime": "Time",
  "home.set.refTimeHint": "h:mm:ss",
  "home.set.refDate": "Race date",
  "home.set.refDateHint": "Weights for age",
  "home.set.privacy": "Privacy trim",
  "home.set.privacyHint": "Meters removed at start and finish",
  "home.set.weather": "Air temperature",
  "home.set.weatherOn": "Fetch the actual weather",
  "home.set.weatherOff": "Send nothing",
  "home.set.weatherHint":
    "Sends the <strong>midpoint</strong> of the route, rounded to ~1 km, and the date to Open-Meteo. Never your start point, never your data.",

  "home.files.title": "2. Your files",
  "home.files.drop": "Drop your files here",
  "home.files.formats": "TCX, GPX or FIT, as many as you like, a whole season if needed",
  "home.files.fit":
    "FIT is your watch's native format: it is the only one that carries pool lengths and the heart rate sensor that was actually paired.",
  "home.files.pick": "Choose files",

  "home.export.title": "3. Your file, ready to analyze",
  "home.export.intro":
    "Today's context windows easily handle 100,000 tokens, so the default setting favors detail. Go one step down if your model is more limited, or if you load many sessions.",
  "home.export.resolution": "Stream detail",
  "home.export.res5s": "One point every 5 s (maximum)",
  "home.export.res10s": "One point every 10 s (recommended)",
  "home.export.res30s": "One point every 30 s (light)",
  "home.export.res100m": "One point every 100 m",
  "home.export.res10m": "One point every 10 m (very detailed)",
  "home.export.resNone": "Tables only, no continuous stream",
  "home.export.resSummary": "Short summary, no per-session detail",
  "home.export.coords": "GPS coordinates",
  "home.export.coordsDrop": "Remove (recommended)",
  "home.export.coordsKeep": "Keep",
  "home.export.coordsHint": "Elevation profile, paces and heart rate are kept either way.",
  "home.export.questions": "Questions to ask your AI",
  "home.export.q1":
    "Analyze my cardiac drift taking temperature into account, and tell me whether my base endurance is a limiting factor.",
  "home.export.q2": "Did I execute my intervals as planned? What should I fix next session?",
  "home.export.q3": "Compare the sensor periods separately and tell me what changed.",
  "home.export.q4": "Based on this load, suggest my training week.",
  "home.export.q5": "Is my intensity distribution consistent with my goal?",
  "home.export.preview": "View the generated file",

  "home.results.title": "4. The details, if you want to dig deeper",
  "home.results.overview": "Overview",
  "home.results.colFile": "File",
  "home.results.colDate": "Date",
  "home.results.colDist": "Dist.",
  "home.results.colMoving": "Moving",
  "home.results.colElapsed": "Elapsed",
  "home.results.colSpeed": "Pace / speed",
  "home.results.colHr": "Avg HR",
  "home.results.colSensor": "Sensor",
  "home.results.colDrift": "Drift",
  "home.results.colBlocks": "Intervals",
  "home.results.detail": "Session by session",
  "home.results.detailIntro":
    "Expand a session to see the signals behind each verdict. Especially useful to judge sensor detection: only you know which sessions were done with a chest strap.",
  "home.results.load": "Training load",
  "home.results.progression": "Aerobic progression",
  "home.results.progressionIntro":
    "Heart rate at the same pace over time: the only fitness indicator that depends neither on the route nor on how you felt that day. Sensors are handled separately.",
  "home.results.projections": "Projections",

  "home.faq.title": "Frequently asked questions",
  "home.faq.q1": "Why is my TCX file too big for Gemini or ChatGPT?",
  "home.faq.a1":
    "A one-hour TCX at 1 Hz weighs about 1.7 MB, nearly 90% of it XML tags, which is roughly 533,000 tokens. Even when that fits in the context window, the model reasons poorly over thousands of lines of raw coordinates.",
  "home.faq.q2": "Are my files sent to a server?",
  "home.faq.a2":
    "No. All computation runs in your browser, and you can check it in the Network tab. A GPS track contains your home address to the meter in its first and last points: the tool trims them by default.",
  "home.faq.q3": "How does the tool guess whether I wore a chest strap?",
  "home.faq.a3":
    "The most telling marker is cadence lock: an optical sensor mistakes your stride rate for your pulse and shows, for example, 172 bpm instead of 140. A chest strap measures an electrical signal and cannot make that error. Other clues add up: the length of plateaus of identical values, beat-to-beat granularity and how fast heart rate responds to pace changes. It is a heuristic: its confidence is capped, and shown.",
  "home.faq.q4": "Why is drift not computed for some sessions?",
  "home.faq.a4":
    "Because it would mean nothing there. Drift compares efficiency between the two halves of a <em>continuous</em> effort. In an interval session, the speed to heart rate ratio swings between reps and recoveries: the number would be an artifact. The tool would rather say it does not measure than produce a misleading figure.",
  "home.faq.q5": "Is the temperature shown the air temperature?",
  "home.faq.a5":
    "No. The sensor sits on the wrist and is warmed by the body: it usually reads 3 to 8 °C too high. The value is shown but always with this warning, including in the file sent to the AI.",
  "home.faq.q6": "How reliable is a marathon projection?",
  "home.faq.a6":
    "Low, and it should be said. A study of 2,303 recreational runners showed that the Riegel formula is well calibrated up to the half marathon but gives marathon predictions at least ten minutes too fast for half of runners. A model based on real race results roughly halves the error.",
  "home.faq.q7": "Which formats are supported?",
  "home.faq.a7":
    "TCX, GPX and FIT. <strong>Prefer FIT</strong>: it is the native format of most Garmin, Coros, Wahoo and Suunto watches, and the only one that carries pool lengths one by one along with the list of paired hardware. That is how the tool can know for certain, rather than estimate, whether you wore a heart rate strap. Garmin Connect's TCX export squashes all the lengths of a swim session into a single line.",
  "home.faq.q8": "The pace shown does not match Garmin Connect",
  "home.faq.a8":
    "It is a difference of convention, not an error. Pace here is computed on <strong>moving time</strong>, as Strava does: stops at traffic lights and pauses are excluded. Garmin Connect divides by total duration and therefore shows a slower pace. On a 16 km city run, the gap easily reaches fifteen seconds per kilometer. Both durations are shown side by side so the difference is visible, and the file sent to the AI states which convention is used. Otherwise a model would compare numbers that are not comparable.",
  "home.faq.q9": "Elevation does not match either",
  "home.faq.a9":
    "If you drop a FIT file, the tool uses the elevation gain measured by your watch's barometric altimeter. In TCX or GPX that information does not exist: it is recomputed from GPS altitude, which usually underestimates it by 30 to 50%. On a real 16 km run, 61 meters computed versus 140 measured. It is one more reason to prefer FIT.",
  "home.faq.q10": "The detected sport is wrong, why?",
  "home.faq.a10":
    "The tool does not trust the label in the file, because it is often wrong: a strength session with a few running segments is labeled \"running\", and a pool session is labeled \"other\". Classification is therefore based on the shape of the data. Each session gets a tier: full analysis for running and cycling, dedicated handling for swimming, and load counting only for everything else. A strength session still weighs on recovery even if its pace means nothing.",

  "home.refs.title": "What these calculations rely on",
  "home.refs.intro":
    "Each metric builds on published work. Here is which, and what each one does not say.",
  "home.refs.minetti":
    "<strong>Grade-adjusted pace.</strong> Minetti AE, et al. <em>Energy cost of walking and running at extreme uphill and downhill slopes.</em> J Appl Physiol. 2002;93(3):1039–46. <a href=\"https://doi.org/10.1152/japplphysiol.01177.2001\" rel=\"nofollow\">doi</a> · <a href=\"https://pubmed.ncbi.nlm.nih.gov/12183501/\" rel=\"nofollow\">PubMed</a>. Established on a treadmill: accounts neither for technical terrain nor for muscle damage on long descents.",
  "home.refs.sensors":
    "<strong>Gap between heart rate sensors.</strong> Gillinov S, et al. Med Sci Sports Exerc. 2017;49(8):1697–703. · Pasadyn SR, et al. Cardiovasc Diagn Ther. 2019;9(4):379–85. <a href=\"https://doi.org/10.21037/cdt.2019.06.05\" rel=\"nofollow\">doi</a>. These studies measure the error of optical sensors; they offer no method to identify one from the file alone. Our detection is derived from them: it is not a validated protocol.",
  "home.refs.riegel":
    "<strong>Race time projection.</strong> Riegel PS. <em>Athletic records and human endurance.</em> American Scientist. 1981;69(3):285–90. Calibrated on world records, on flat roads.",
  "home.refs.vickers":
    "<strong>Correction for recreational runners.</strong> Vickers AJ, Vertosick EA. <em>An empirical study of race times in recreational endurance runners.</em> BMC Sports Sci Med Rehabil. 2016;8:26. <a href=\"https://doi.org/10.1186/s13102-016-0052-y\" rel=\"nofollow\">doi</a>. The direct reason why a race result weighs more than a training effort.",
  "home.refs.cs":
    "<strong>Critical speed.</strong> Jones AM, et al. <em>Critical power: implications for determination of V̇O₂max and exercise tolerance.</em> Med Sci Sports Exerc. 2010;42(10):1876–90. <a href=\"https://doi.org/10.1249/MSS.0b013e3181d9cf7f\" rel=\"nofollow\">doi</a>. The model assumes critical speed can be held indefinitely, which is false beyond about 90 minutes.",
  "home.refs.coggan":
    "<strong>Normalized power, TSS, Pa:Hr drift.</strong> Widely adopted training methodologies (Coggan, Friel), but not peer-reviewed papers. The distinction matters.",
  "home.refs.noteTitle": "What these references do not guarantee",
  "home.refs.note":
    "They ground the formulas, not the conclusions. A number computed correctly from a faulty sensor is still wrong. If you are in pain, or before changing a training plan, a professional's advice outweighs this tool, and the AI you send its results to.",
  "home.footer": "MIT license. No account, no ads, no tracker.",

  "js.libError":
    "<strong>The library could not be loaded.</strong>Run the page with <code>npm run dev</code>: opening it directly from the file explorer does not work.",
  "js.vigilance": "{n} point(s) of caution included in the file",
  "js.indicShort": "indic.",
  "js.sensorSummary": "{file} — {label} (confidence {confidence})",
  "js.noSignal": "No usable signal.",
  "js.signal": "{name}: <b>{value}</b> — {note}",
  "js.lock": "Cadence lock: <b>{pct}</b>, <b>{n}</b> range(s) excluded from the drift calculation.",
  "js.sets": "Detected sets: <b>{sets}</b>",
  "js.weather": "Air <b>{temp} °C</b>{feels}{humidity}{wind} — Open-Meteo",
  "js.weatherFeels": " (feels like {temp})",
  "js.weatherHumidity": ", {pct} RH",
  "js.weatherWind": ", wind {kmh} km/h",
  "js.drift":
    "Drift <b>{pct}</b> {badge} over {min} min at {pace} ({coverage} of the session) — {interpretation}",
  "js.driftNone": "Drift not computed: {reason}",
  "js.hrr": "Heart rate recovery: <b>{bpm} bpm</b> in 60 s{erosion}",
  "js.hrrErosion": ", eroding {bpm} bpm/rep",
  "js.adherence": "<b>{set}</b> — {grade}: {verdicts}",
  "js.progPace": "Pace",
  "js.progSensor": "Sensor",
  "js.progPoints": "Points",
  "js.progTrend": "Trend",
  "js.progReading": "Reading",
  "js.perWeek": "{value} bpm/wk",
  "js.progNone":
    "No tracking possible yet: it takes at least three running sessions holding a comparable pace, with the same heart rate sensor.",
  "js.trendTitle": "HR at {pace} — {source}",
  "js.projDistance": "Distance",
  "js.projEstimate": "Estimate",
  "js.projRange": "Range",
  "js.projReliability": "Reliability",
  "js.projMethod": "Method",
  "js.cs": "Critical speed <b>{pace}/km</b>, D' <b>{d} m</b>, R² <b>{r2}</b>",
  "js.projNone": "No projection: at least one running session is needed.",
  "js.redOriginal": "Your original files",
  "js.redGenerated": "Generated file",
  "js.redReduction": "Reduction",
  "js.redCompat": "Compatibility",
  "js.sizeMb": "{value} MB — ~{tokens} tokens",
  "js.sizeKb": "{value} KB — ~{tokens} tokens",
  "js.compatTooBig": "⚠ too large for ChatGPT, lower the detail",
  "js.compatGemini": "⚠ Gemini only",
  "js.compatOk": "✓ ChatGPT, Claude and Gemini",
  "js.truncated": "… preview truncated, the copy contains everything.",
  "js.download": "Download the file (.txt)",
  "js.copy": "Copy to clipboard",
  "js.copied": "Copied",
  "js.filename": "training-file.txt",

  "privacy.title": "Privacy: what leaves your browser, and what never does",
  "privacy.description":
    "Your GPS files are never sent to a server: all computation happens in your browser. The only exception is the weather, which sends the midpoint of the route rounded to about one kilometer. Full technical detail, verifiable.",
  "privacy.ld.q1": "Are GPS files sent to a server?",
  "privacy.ld.a1":
    "No. Parsing and analysis run in the browser, in JavaScript, on the user's device. No file is transmitted, which can be checked in the Network tab of the developer tools: no request contains the content of a file.",
  "privacy.ld.q2": "What is sent to a third party?",
  "privacy.ld.a2":
    "Only the weather request, when enabled: the midpoint of the route rounded to two decimals (about 1.1 km resolution) and the date of the session, sent to Open-Meteo. Never the start point, which usually matches the home address, and never any physiological data or identifier.",
  "privacy.ld.q3": "Why does the tool trim the start and end of the track?",
  "privacy.ld.a3":
    "Because the first and last points of a GPS track reveal the home address to the meter. Trimming is on by default over 250 meters and applies before any export, including the one meant for an artificial intelligence.",
  "privacy.back": "← Back to the tool",
  "privacy.h1": "Privacy",
  "privacy.lede":
    "A GPS track contains your home address to the meter. This page states exactly what stays on your device, what leaves it, and how to check it yourself.",
  "privacy.principle.title": "The principle",
  "privacy.principle.p1":
    "<strong>Your files are never transmitted.</strong> Decoding and analysis run in JavaScript, in your browser, on your device. There is no server to receive them. This is not a policy, it is an absence of infrastructure.",
  "privacy.principle.p2":
    "In practice: you can cut your internet connection once the page has loaded, drop your files, and the analysis will work. Only the weather will fail, which is precisely the proof that it is the only thing going out.",
  "privacy.table.title": "What leaves, what does not",
  "privacy.table.colData": "Data",
  "privacy.table.colSent": "Sent?",
  "privacy.table.file": "Your watch file",
  "privacy.table.fileText": "<strong>Never.</strong> Read from disk by the browser, analyzed in memory.",
  "privacy.table.track": "Your GPS track",
  "privacy.table.never": "<strong>Never.</strong>",
  "privacy.table.physio": "Heart rate, paces, power",
  "privacy.table.settings": "Max heart rate, threshold pace, race times entered",
  "privacy.table.settingsText":
    "<strong>Never.</strong> Kept in memory for the session, and lost when the tab is closed.",
  "privacy.table.dossier": "The generated file",
  "privacy.table.dossierText":
    "<strong>Never</strong> by the tool. Only you copy or download it, and what you do with it next is up to you.",
  "privacy.table.midpoint": "Route midpoint, rounded",
  "privacy.table.midpointText": "<strong>Yes</strong>, if weather is enabled. See below.",
  "privacy.weather.title": "Weather: the only exception",
  "privacy.weather.p1":
    "A watch's temperature sensor is worn on the wrist and warmed by the body: it reads 3 to 8 °C too high and ignores humidity and wind. Yet heat is the main confounding factor in cardiac drift. Without the real temperature, poor form gets blamed for what is only the normal thermal cost.",
  "privacy.weather.p2": "The request is therefore built so that it is useless as location data:",
  "privacy.weather.midTitle": "We send the midpoint of the route, never the start",
  "privacy.weather.midText":
    "The start point is your home. The midpoint is some random place, unrelated to where you sleep.",
  "privacy.weather.roundTitle": "Coordinates are rounded to two decimals",
  "privacy.weather.roundText":
    "That is about 1.1 km of resolution. Weather is a regional phenomenon: nothing is lost in accuracy, and the request no longer points to an identifiable place.",
  "privacy.weather.nothingTitle": "Nothing else is attached",
  "privacy.weather.nothingText":
    "No heart rate, no pace, no track, no identifier, no cookie. A rounded latitude, a rounded longitude, a date. The full request looks like this:",
  "privacy.weather.recipient":
    "The recipient is <a href=\"https://open-meteo.com\" rel=\"nofollow noopener\">Open-Meteo</a>, an open weather service. The feature can be turned off from a drop-down menu on the home page, and the tool keeps working without it.",
  "privacy.trim.title": "Trimming your home",
  "privacy.trim.text":
    "The first and last points of a track reveal your front door. The tool removes <strong>250 meters by default</strong>, at both start and finish, before any analysis and before any export. The setting can be changed, and an option removes coordinates entirely while keeping the elevation profile, paces and heart rate.",
  "privacy.note.title": "What we do not control",
  "privacy.note.text":
    "The file you copy into ChatGPT, Gemini or Claude leaves your browser the moment you paste it, and is then subject to that service's terms, not ours. If the file still contains coordinates, they go with it. That is exactly why the \"remove coordinates\" option is on by default at export.",
  "privacy.dont.title": "What we do not do",
  "privacy.dont.1": "No account, no sign-up, no password.",
  "privacy.dont.2": "No cookie, no advertising tracker, no pixel.",
  "privacy.dont.3": "No ads, so no incentive to collect anything.",
  "privacy.dont.4": "No data resale: there is none to resell.",
  "privacy.dont.analytics":
    "If audience measurement is ever added, it will be without cookies or persistent identifiers, and this page will be updated first.",
  "privacy.verify.title": "Check it yourself",
  "privacy.verify.p1":
    "Do not take our word for it. Open your browser's developer tools (<code>F12</code>), <strong>Network</strong> tab, then drop a file. You will see the page loading and, if weather is enabled, one request to <code>open-meteo.com</code>. Nothing else. No request contains the content of your file.",
  "privacy.verify.p2":
    "The <a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">source code is open</a>, under the MIT license: what the page does can be read line by line.",
  "privacy.rights.title": "Your rights",
  "privacy.rights.text":
    "Since no personal data is collected or stored, there is no record to access, correct or delete: closing the tab erases everything. For any question, the GitHub repository above lets you open a discussion.",
  "privacy.footerTool": "The tool",
  "privacy.updated": "Last updated: <time datetime=\"2026-09-25\">September 25, 2026</time>.",
};
