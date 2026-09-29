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
    "<strong>Your files never leave your browser.</strong> All computation happens on your device, and you can check it in the Network tab. A GPS track reveals your address to the meter, so the start and finish are trimmed by default. <a href=\"{{href:confidentialite.html}}\">What leaves, and what never does</a>.",
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
  "common.blog": "Blog",
  "home.why.more":
    "Why an AI needs a structured file rather than a raw one: <a href=\"{{href:post-ia-analyse.html}}\">read the article</a>.",

  "blog.title": "gps-digest blog: training, watch data and AI",
  "blog.description":
    "Articles on AI-powered training analysis: what ChatGPT, Gemini and Claude can do with your workouts, and how to give them data they can actually use.",
  "blog.lede":
    "Training, watch data and artificial intelligence. Short articles, backed by numbers, with no promises the data cannot keep.",
  "blog.readMore": "Read the article",

  "post.title": "Analyzing your runs with ChatGPT: the token trap",
  "post.description":
    "AI is great at analyzing a workout, but a one-hour TCX file is 533,000 tokens. Why that breaks things, and how to get around it in three minutes.",
  "post.kicker": "Training and AI",
  "post.h1": "ChatGPT can analyze your running workouts. It just has to be able to read them first.",
  "post.meta": "Published <time datetime=\"2026-09-28\">September 28, 2026</time> · 7 min read",
  "post.lede":
    "Ask an AI why Tuesday's intervals felt so hard, and it will give you a better answer than most training apps. On one condition: it has to actually see your data. That is where things fall apart, and not for the reason you think.",
  "post.tldrTitle": "Key takeaways",
  "post.tldr1":
    "ChatGPT, Gemini and Claude can interpret a workout, connect it to your goal and answer follow-up questions, like a coach who is available at any hour.",
  "post.tldr2":
    "A one-hour TCX file recorded at 1 Hz weighs about 1.7 MB, roughly 533,000 tokens, and nearly 90% of it is XML tags.",
  "post.tldr3": "Even when the file gets through, the model reasons poorly over thousands of lines of raw coordinates.",
  "post.tldr4":
    "The fix is not compression but restructuring: splits, laps, zones, reps. A workout then fits in about 5,800 tokens, and the analysis gets better.",

  "post.why.title": "Why is AI such a good training partner?",
  "post.why.p1":
    "Because it starts from your question, not from a dashboard. An app shows you the same charts it shows everyone. An AI can explain why your pace dropped at kilometer 8, taking into account the heat, your heavy week and the goal you gave it.",
  "post.why.listIntro": "With good data, an AI can:",
  "post.why.li1": "explain a workout in plain language, without jargon;",
  "post.why.li2":
    "connect your numbers to your goal: a sub-45 10K does not call for the same sessions as a first marathon;",
  "post.why.li3": "compare several weeks and spot a trend you had missed;",
  "post.why.li4": "answer the next question, and the one after that, with the patience of a coach available at 11 pm;",
  "post.why.li5": "plan the coming week from your actual training load, not from a generic plan.",
  "post.why.p2":
    "That personalization is what makes the difference. But it rests on an assumption almost nobody checks: that the model really has access to your data, not to a three-line summary or an unreadable file.",

  "post.tokens.title": "What is a token, and why does your watch produce so many?",
  "post.tokens.p1":
    "A token is the unit of text a language model reads and bills for: a piece of a word, a number or punctuation. Every model has a limit, its context window, beyond which it cannot read anything more. Depending on the model and the plan, that limit ranges today from a few tens of thousands to a few million tokens.",
  "post.tokens.p2":
    "The problem is that watch files are built for software, not for reading. A TCX file repeats the same XML tags for every second of your run. Here is what our benchmark measures:",
  "post.tokens.colCase": "Data",
  "post.tokens.colSize": "Size",
  "post.tokens.colTokens": "Estimated tokens",
  "post.tokens.r1": "One one-hour run, raw TCX file",
  "post.tokens.r1size": "1.7 MB",
  "post.tokens.r1tokens": "≈ 533,000",
  "post.tokens.r2": "The same run, as a structured file",
  "post.tokens.r2size": "≈ 18 KB",
  "post.tokens.r2tokens": "≈ 5,800",
  "post.tokens.r3": "15 MB of real files, raw",
  "post.tokens.r3size": "15 MB",
  "post.tokens.r3tokens": "≈ 4.7 million",
  "post.tokens.r4": "The same files, as a structured file",
  "post.tokens.r4size": "≈ 100 KB",
  "post.tokens.r4tokens": "≈ 32,000",
  "post.tokens.note":
    "Estimated at 3.2 characters per token, the ratio observed on numeric CSV. Measurements can be reproduced with the benchmark published in the source code.",
  "post.tokens.p3":
    "In other words, a single raw workout can max out a consumer plan, and a full season fits nowhere.",

  "post.paste.title": "What happens when you paste a TCX file into ChatGPT?",
  "post.paste.intro": "Three possible outcomes. None of them is good.",
  "post.paste.h1": "1. The file is rejected",
  "post.paste.p1":
    "This is the most honest case: the interface tells you the file is too large. You lose time, but at least you know.",
  "post.paste.h2": "2. The file is only partly read, and you are not told",
  "post.paste.p2":
    "With a large attachment, assistants often read only excerpts of it, or hand it to a script that summarizes it. The AI then answers confidently based on only part of the workout. The answer looks right. It may not be.",
  "post.paste.h3": "3. The file gets through, but the analysis is poor",
  "post.paste.p3":
    "Even with a large context window, a model makes poor use of information buried in the middle of a long document. Stanford researchers documented this effect as \"lost in the middle\" (Liu et al., 2024). Asking for a training analysis from 3,600 lines of latitudes and longitudes means asking it to do mental math it is bad at, on data that tells it almost nothing.",

  "post.restructure.title": "Should you compress the file? No, restructure it",
  "post.restructure.p1":
    "Making the file smaller is not enough: it has to become readable. A coach does not read your GPS coordinates second by second. They look at your kilometer splits, your reps and your heart rate by zone. That is exactly what a language model knows how to interpret.",
  "post.restructure.colRaw": "In the raw file",
  "post.restructure.colDossier": "In a structured file",
  "post.restructure.r1raw": "3,600 lines of latitude, longitude and altitude",
  "post.restructure.r1dossier": "Kilometer splits, laps, time spent in each zone",
  "post.restructure.r2raw": "One heart rate value per second",
  "post.restructure.r2dossier": "Cardiac drift already computed, with the portion of the run it covers",
  "post.restructure.r3raw": "No indication of the heart rate sensor",
  "post.restructure.r3dossier": "Chest strap or wrist, with a confidence level",
  "post.restructure.r4raw": "XML tags repeated at every point",
  "post.restructure.r4dossier": "CSV tables with explicit units",
  "post.restructure.p2":
    "On 15 MB of real files, the structured file comes to about 32,000 tokens. And the analysis it produces is better than with the full files. Not just cheaper: better, because the model works with objects it understands.",

  "post.blind.title": "What can an AI not figure out on its own?",
  "post.blind.p1":
    "Some errors do not show up in the numbers. If nothing flags them, the AI treats them as facts and builds its analysis on top of them.",
  "post.blind.li1":
    "<strong>The heart rate sensor.</strong> A wrist sensor sometimes mistakes your cadence for your pulse and shows 172 bpm instead of 140. Comparing a wrist workout with a chest strap workout means comparing two instruments, not two levels of fitness.",
  "post.blind.li2":
    "<strong>Temperature.</strong> Your watch's sensor is warmed by your wrist: it reads the air 3 to 8 °C too high. An AI that takes it for the weather gets the cause of your cardiac drift wrong.",
  "post.blind.li3":
    "<strong>Pace.</strong> Strava computes it on moving time, Garmin Connect on total duration. On a city run, the gap easily exceeds 15 seconds per kilometer.",
  "post.blind.li4":
    "<strong>Metrics that make no sense.</strong> Cardiac drift computed on an interval session means nothing. No number is better than a wrong number that looks credible.",
  "post.blind.p2":
    "A good file does more than summarize. It says what is reliable and what is not, so the AI does not reason on sand.",

  "post.howto.title": "How do you get an AI to analyze your workouts in three minutes?",
  "post.howto.step1":
    "<strong>Export your files</strong> from your watch or Strava, ideally in FIT format, the most complete one.",
  "post.howto.step2":
    "<strong>Drop them into gps-digest.</strong> Everything is computed in your browser: no file is uploaded to a server.",
  "post.howto.step3": "<strong>Copy the file</strong> into ChatGPT, Gemini or Claude, then ask your question.",
  "post.howto.cta": "Prepare my workouts for AI",

  "post.prompts.title": "What should you ask your AI?",
  "post.prompts.intro":
    "The best questions start from a real doubt. Here are five examples that work well with a structured file:",
  "post.prompts.q1": "\"Has my cardiac drift increased compared with last month, at a similar temperature?\"",
  "post.prompts.q2": "\"Did I hold my target pace on Tuesday's reps? What should I fix next time?\"",
  "post.prompts.q3": "\"With this training load, am I ready for a sub-45 10K in six weeks?\"",
  "post.prompts.q4": "\"Is my split between easy runs and hard sessions right for a marathon?\"",
  "post.prompts.q5": "\"Plan next week for me, taking my current fatigue into account.\"",

  "post.faq.title": "Frequently asked questions",
  "post.faq.q1": "Can ChatGPT read a FIT or TCX file directly?",
  "post.faq.a1":
    "It can open it, but not make proper use of it. FIT is a binary format the AI has to decode with a script, and a one-hour TCX file is about 533,000 tokens. Either way, the analysis relies on excerpts or on raw data that is poorly suited to it. A structured file solves both problems.",
  "post.faq.q2": "Why not just export a CSV from Garmin Connect?",
  "post.faq.a2":
    "Because that export is mostly limited to laps. It contains no cardiac drift, no sensor detection, no rep-by-rep detail, and none of the context that prevents misreadings, such as how pace was calculated.",
  "post.faq.q3": "Is my data sent anywhere?",
  "post.faq.a3":
    "No. Your files are read and analyzed in your browser. Only the file you copy into an AI yourself leaves your device, and GPS coordinates are removed from it by default.",
  "post.faq.q4": "Can an AI replace a coach?",
  "post.faq.a4":
    "No, and that is not the point. It explains, compares and suggests, but it does not see you run and does not feel your pain. If you are injured or seriously unsure, a professional's advice comes first.",
  "post.faq.q5": "Which AI should you use: ChatGPT, Gemini or Claude?",
  "post.faq.a5":
    "All three can analyze a structured file. The real difference is the size of the context window on your plan. With a file of a few thousand tokens per workout, the question no longer matters.",

  "post.sources.title": "Sources",
  "post.sources.liu":
    "Liu NF, et al. <em>Lost in the Middle: How Language Models Use Long Contexts.</em> Transactions of the Association for Computational Linguistics, 2024. <a href=\"https://arxiv.org/abs/2307.03172\" rel=\"nofollow\">arXiv:2307.03172</a>.",
  "post.sources.bench":
    "Size and token measurements: gps-digest benchmark, reproducible, in the <a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">open source code</a>.",

  "post.end.title": "Your next workout deserves better than a generic chart",
  "post.end.text":
    "Turn your watch files into a file that ChatGPT, Gemini or Claude can actually analyze. Free, no account, and your files never leave your browser.",
  "post.end.cta": "Try gps-digest",
  "privacy.analytics.row": "Visit statistics",
  "privacy.analytics.rowText":
    "<strong>Yes, anonymous.</strong> Cloudflare Web Analytics counts page views, with no cookie and no persistent identifier. Nothing about your files or your workouts.",
  "privacy.analytics.active":
    "Audience measurement uses Cloudflare Web Analytics: no cookie, no persistent identifier, and no data from your files. It counts page views, countries, traffic sources and device types, never a person.",
  "privacy.verify.p1Analytics":
    "Do not take our word for it. Open your browser's developer tools (<code>F12</code>), <strong>Network</strong> tab, then drop a file. You will see the page loading, the audience measurement request to <code>cloudflareinsights.com</code> and, if weather is enabled, one request to <code>open-meteo.com</code>. Nothing else. No request contains the content of your file.",
};
