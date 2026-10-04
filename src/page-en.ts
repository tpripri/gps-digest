/** Catalogue de page : anglais. Clés et emplacements : voir page-i18n.ts. */

import type { PageCatalog } from "./page-i18n.ts";

export const en: PageCatalog = {
  "common.langs": "Language",
  "common.footerNav": "Footer",
  "common.privacy": "Privacy",
  "common.source": "Source code",

  "home.title": "Analyze Garmin and Strava workouts with ChatGPT — gps-digest",
  "home.description":
    "Export your Garmin, Strava or Apple Watch workouts and get them analyzed by ChatGPT, Claude or Gemini. Free, no account, everything stays in your browser.",
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
  "home.ld.step1.name": "Optional: add your history with the Strava archive",
  "home.ld.step1.text":
    "Request your Strava account archive (Download your account) and drop the ZIP as is: the tool turns it into a compact year of context.",
  "home.ld.step2.name": "Export your latest sessions",
  "home.ld.step2.text": "Get the FIT, TCX or GPX files of your recent sessions from Garmin Connect, Strava or Apple Watch.",
  "home.ld.step3.name": "Drop the files to compress them",
  "home.ld.step3.text":
    "The tool compresses your sessions into a structured file, right in the browser, without uploading anything.",
  "home.ld.step4.name": "Copy the file into the AI",
  "home.ld.step4.text":
    "Copy the generated file and paste it into ChatGPT, Gemini or Claude along with your question.",
  "home.ld.faq1.q": "Why is my TCX file too big for an AI?",
  "home.ld.faq1.a":
    "A one-hour TCX recorded at 1 Hz weighs about 1.7 MB, nearly 90% of it XML tags, which is roughly 533,000 tokens. Even when that fits in the context window, the model reasons poorly: it is asked for a training analysis from thousands of lines of raw coordinates.",
  "home.ld.faq2.q": "Are my GPS files sent to a server?",
  "home.ld.faq2.a":
    "No. All computation happens in your browser. No file goes through a server, which you can check in the Network tab. A GPS track reveals your home address to the meter: coordinates are removed from the file by default.",
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
    "<strong>Your files never leave your browser.</strong> All computation happens on your device, and you can check it in the Network tab. A GPS track reveals your address to the meter, so coordinates are removed from the file by default. <a href=\"{{href:confidentialite.html}}\">What leaves, and what never does</a>.",
  "home.step0.badge":
    "Optional, recommended",
  "home.step0.title":
    "Give it your history: the Strava archive",
  "home.step0.text":
    "Once, on <a href=\"https://www.strava.com/account\" rel=\"noopener\">strava.com/account</a>, under \"Download your account\". Strava emails you a ZIP within a few hours. Drop it here as is: the tool turns it into a compact year of context, without photos or routes.",
  "home.step1.title": "Download your latest sessions",
  "home.step1.text": "The FIT, TCX or GPX files of the sessions you want analysed, from your watch or app: <a href=\"{{href:guide-garmin.html}}\">Garmin</a> · <a href=\"{{href:guide-strava.html}}\">Strava</a> · <a href=\"{{href:guide-apple.html}}\">Apple Watch</a>.",
  "home.step2.title": "Drop them here to compress them",
  "home.step2.text": "The tool turns them into a compact file the AI can read in full. Everything is computed in your browser: your files are never uploaded.",
  "home.step3.title": "Paste the file into your AI",
  "home.step3.text": "ChatGPT, Claude, Gemini or Vibe, with your question. <a href=\"{{href:post-ia-coach.html}}\">What to ask?</a>",

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

  "home.set.title": "Fine-tune the analysis (optional): max HR, recent race, weather",
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
  "home.set.privacy": "Privacy zone",
  "home.set.privacyHint": "Radius in meters where positions are erased, if you keep coordinates. Never cuts the session.",
  "home.set.lthr":
    "Threshold HR",
  "home.set.lthrHint":
    "bpm, the most reliable basis",
  "home.set.lthrPlaceholder":
    "e.g. 160",
  "home.set.restHr":
    "Resting HR",
  "home.set.restHrHint":
    "bpm, for the heart rate reserve model",
  "home.set.zoneModel":
    "HR zones",
  "home.set.zoneAuto":
    "Automatic (threshold if known, else max HR)",
  "home.set.zoneMax":
    "% of max HR",
  "home.set.zoneReserve":
    "% of HR reserve",
  "home.set.zoneThreshold":
    "% of threshold HR",
  "home.set.weather": "Air temperature",
  "home.set.weatherOn": "Fetch the actual weather",
  "home.set.weatherOff": "Send nothing",
  "home.set.weatherHint":
    "Sends the <strong>midpoint</strong> of the route, rounded to ~1 km, and the date to Open-Meteo. Never your start point, never your data.",

  "home.files.title": "Your files",
  "home.reads.title":
    "Guides and articles",
  "home.files.drop": "Drop your files here",
  "home.files.formats": "Your full Strava archive, a Garmin ZIP, or FIT, TCX and GPX files: everything works as is.",
  "home.files.fit":
    "FIT is your watch's native format: it is the only one that carries pool lengths and the heart rate sensor that was actually paired.",
  "home.files.pick": "Choose files",
  "home.archive.period":
    "Period analyzed:",
  "home.archive.p3m":
    "Last 3 months",
  "home.archive.p6m":
    "Last 6 months",
  "home.archive.p1y":
    "Last 12 months",
  "home.archive.p2y":
    "Last 2 years",
  "home.archive.pAll":
    "Full history",

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
  "home.results.races":
    "Recognised races",

  "home.faq.title": "Frequently asked questions",
  "home.faq.q1": "Why is my TCX file too big for Gemini or ChatGPT?",
  "home.faq.a1":
    "A one-hour TCX at 1 Hz weighs about 1.7 MB, nearly 90% of it XML tags, which is roughly 533,000 tokens. Even when that fits in the context window, the model reasons poorly over thousands of lines of raw coordinates.",
  "home.faq.q2": "Are my files sent to a server?",
  "home.faq.a2":
    "No. All computation happens in your browser, and you can check it in the Network tab. A GPS track reveals your home address to the meter: coordinates are removed from the file by default, and a privacy zone erases those near the start and finish if you choose to keep them.",
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
    "<strong>The tool could not load.</strong> Check your connection and reload the page. On a corporate network, a security filter may block the site: try another connection.",
  "js.archiveNote":
    "<strong>Archive:</strong> {kept} sessions kept out of {total}. The last {days} days are detailed session by session; the rest of the period takes one line per session in the file.",
  "js.archiveProgress":
    "Reading the archive: {n} sessions kept ({read} files read)…",
  "js.olderInTable":
    "Detail shown for sessions from the last {days} days. The {n} older ones appear in the sessions table and in the file.",
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
  "js.racesIntro":
    "Your races calibrate the projections. Tick the ones that are races, untick a session wrongly taken for one: everything recalculates.",
  "js.racesNone":
    "No race recognised. If you ran one, enter your latest race time under \"Fine-tune the analysis\": it is the best basis for projections.",
  "js.raceDate":
    "Date",
  "js.raceDistance":
    "Race",
  "js.raceTime":
    "Time",
  "js.raceSource":
    "Recognised by",
  "js.raceBy.user":
    "you",
  "js.raceBy.strava":
    "flagged as a race in Strava",
  "js.raceBy.name":
    "activity name",
  "js.raceBy.auto":
    "suggestion: official distance, sustained effort",
  "js.raceCandidate":
    "to confirm",
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
  "privacy.ld.q3": "How does the tool protect your home address?",
  "privacy.ld.a3":
    "The first and last points of a GPS track reveal your home address to the meter. By default, the file contains no coordinates at all. If you choose to keep them, an adjustable privacy zone erases the positions near the start and finish without cutting the session: distances, durations and calculations stay complete.",
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
  "privacy.trim.title": "The privacy zone",
  "privacy.trim.text":
    "The first and last points of a track reveal your front door. By default, <strong>the file contains no coordinates at all</strong>: elevation profile, pace and heart rate are enough for the analysis. If you choose to keep coordinates, set a privacy zone: positions within that radius of the start and finish are erased, including when the track passes near your home again. The session is never cut: distances, durations and calculations cover the full recording, and the file says so to the AI.",
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
  "privacy.updated": "Last updated: <time datetime=\"2026-09-29\">September 29, 2026</time>.",
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
  "post.next":
    "To turn these questions into real week-by-week follow-up: <a href=\"{{href:post-ia-coach.html}}\">set up an AI coach in ChatGPT, Claude, Gemini or Vibe</a>.",

  "coach.title": "Use ChatGPT, Claude, Gemini or Vibe as a running coach",
  "coach.description":
    "Athlete profile, coach rules to copy and paste, setup in ChatGPT, Claude, Gemini and Vibe, and how to give them your workouts for free.",
  "coach.kicker": "Practical guide",
  "coach.h1": "Turn ChatGPT, Claude, Gemini or Vibe into your running coach",
  "coach.meta": "Published <time datetime=\"2026-09-29\">September 29, 2026</time> · 11 min read",
  "coach.lede":
    "A coach who knows your workouts, your goal and your fragile calf, available at 11 pm, at no extra cost: that is what AI assistants promise. The promise holds, on two conditions. You have to brief them once and for all, or they treat you like a stranger every time. And you have to give them your workouts, which is much harder than it sounds.",
  "coach.tldr1":
    "An AI makes a good coach if it has three things: your profile, your real workouts and rules to follow. Without them, it recites a generic plan.",
  "coach.tldr2":
    "The hard part is getting your workouts to it. Strava's official connector is paid and only works with Claude. File export is free and works everywhere, but a raw file is too heavy: it has to be compressed.",
  "coach.tldr3":
    "ChatGPT, Claude and Vibe have projects, Gemini has Gems: your athlete profile and rules stay there from one conversation to the next. All of them exist on free plans.",
  "coach.tldr4":
    "The routine that works: one review per week, in a new conversation, with your workouts and one line on how you felt. And stay in charge: an AI tends to agree with you.",

  "coach.can.title": "Can an AI really coach you?",
  "coach.can.p1":
    "Yes, for a large part of a coach's job: reading your workouts, linking them to your goal and adjusting what comes next. No, for anything that requires seeing or touching you. The line is clear, so it is worth knowing before you start.",
  "coach.can.goodIntro": "What an AI does well:",
  "coach.can.good1": "analyze a workout and say, with numbers, whether it did its job;",
  "coach.can.good2": "rearrange your week when life gets in the way: a trip, a cold, a meeting that runs late;",
  "coach.can.good3": "explain why each session matters, which many ready-made plans never do;",
  "coach.can.good4": "answer at 11 pm without getting tired of your tenth question.",
  "coach.can.badIntro": "What it will never do:",
  "coach.can.bad1": "watch you run, so it cannot fix your stride or your posture;",
  "coach.can.bad2": "notice that you are more tired than you say;",
  "coach.can.bad3": "diagnose a pain.",
  "coach.can.p2":
    "Think of it as a very available coach who has never seen you run. Everything it knows about you is what you give it to read. Which brings us to the rest of this guide.",

  "coach.need.title": "What does your AI coach need to know before starting?",
  "coach.need.p1": "Three things. If one is missing, the quality of the advice collapses.",
  "coach.need.li1":
    "<strong>Your profile.</strong> Your level, your goal, your constraints and your weak spots. Without it, the AI treats you as an average runner, who does not exist.",
  "coach.need.li2":
    "<strong>Your real workouts.</strong> Not your memories: your data. This is the hardest ingredient to provide, more on that below.",
  "coach.need.li3":
    "<strong>Rules to follow.</strong> How to reason, what to refuse, how to answer. That is what separates a coach from an advice vending machine.",
  "coach.sheet.title": "The athlete profile, filled in once",
  "coach.sheet.intro":
    "Copy this template, fill it in in five minutes and save it as a text file. Update it after each race or when your goal changes.",
  "coach.sheet.text":
    "ATHLETE PROFILE\nAge, sex, years of running:\nCurrent volume (distance and runs per week):\nBests from the last 12 months (5K, 10K, half, marathon):\nMax HR and resting HR, if known:\nGoal (race, distance, date, target time):\nAvailability (possible days, longest session):\nPast injuries and weak spots:\nGear (watch, chest strap or wrist sensor):\nWhat I love and hate in training:",

  "coach.data.title": "How do you get your workouts to your AI coach?",
  "coach.data.p1":
    "This is the step most guides skip, and it is the hardest one. Your AI does not see your watch: you have to bring it your workouts. There are two ways, and they do not cost the same.",
  "coach.data.strava.title": "The Strava connector: convenient, but paid and Claude-only",
  "coach.data.strava.p":
    "Since June 2026, Strava has offered an official connector, an MCP server, that lets Claude read your history directly. It is comfortable: no more exports, the AI fetches what it needs. But you need a paid Strava subscription, and the connector only works with Claude. Strava promises other assistants later, with no date. Strava has no official connector for ChatGPT, Gemini or Vibe so far, and unofficial ones require a technical setup.",
  "coach.data.garmin.title":
    "Third-party services for Garmin: another door, with a middleman",
  "coach.data.garmin.p":
    "On the Garmin side, third-party services act as a bridge. Tredict, an official Garmin partner, offers an app inside ChatGPT that works even with a free ChatGPT account, plus an MCP server for Claude. Shape does the same for 5 dollars a month, but requires a paid ChatGPT plan. Either way, you open an account with a third party and hand it your Garmin data. That makes sense if you also want to send workouts to your watch. To get your runs analyzed, export stays free and goes through no one.",
  "coach.data.export.title": "File export: free and universal, as long as you compress",
  "coach.data.export.p1":
    "Garmin Connect, Coros, Polar Flow and Strava all let you export a workout for free as FIT, TCX or GPX. That file works with any AI, free plans included. The catch is its size: one hour of running as TCX is about 533,000 tokens, enough to max out a free plan with a single workout (<a href=\"{{href:post-ia-analyse.html}}\">see why</a>).",
  "coach.data.export.p2":
    "The fix: compress and restructure the file before giving it to the AI. gps-digest turns each workout into a structured file of about 5,800 tokens, with splits, zones, reps, cardiac drift and sensor reliability. Any assistant, free or paid, reads it in full.",
  "coach.data.colStrava": "Strava connector",
  "coach.data.colExport": "Export + gps-digest",
  "coach.data.r1": "Cost",
  "coach.data.r1strava": "Paid Strava subscription",
  "coach.data.r1export": "Free",
  "coach.data.r2": "Compatible assistants",
  "coach.data.r2strava": "Claude only, so far",
  "coach.data.r2export": "All: ChatGPT, Claude, Gemini, Vibe and the rest",
  "coach.data.r3": "Effort",
  "coach.data.r3strava": "None, once connected",
  "coach.data.r3export": "One export and one drag-and-drop per week",
  "coach.data.r4": "What the AI gets",
  "coach.data.r4strava": "Strava data, summarized or second by second",
  "coach.data.r4export": "A file already computed: zones, reps, drift, sensor reliability",
  "coach.data.r5": "GPS coordinates",
  "coach.data.r5strava": "Accessible to the AI",
  "coach.data.r5export": "Removed by default",
  "coach.data.p3":
    "Strava subscriber and Claude user? The connector will save you a few minutes a week. For everyone else, the free export works very well. You just need to compress the files before giving them to the AI.",

  "coach.rules.title": "Coach instructions to copy and paste",
  "coach.rules.intro":
    "This text sets how your AI behaves. It is short on purpose: each rule fixes a known flaw of language models.",
  "coach.rules.text":
    "You are my running coach. You analyze my workouts, track my progress toward my goal and adjust my training week after week.\n\nMy profile is in the athlete profile. My workouts come as gps-digest files.\n\nRules:\n1. Back every observation with a number from the file, and quote it.\n2. If data is missing or unreliable, say so instead of guessing.\n3. Be frank. If a workout went badly or a goal is unrealistic, say it clearly.\n4. Start from my actual volume and justify every increase in load.\n5. If I report a pain that lasts, gets worse or changes my stride, tell me to see a health professional instead of suggesting a plan.\n6. If you are missing information to decide, ask me.\n7. End every review with three concrete actions at most.",
  "coach.rules.note":
    "Rules 1 and 2 stop the AI from filling gaps with plausible numbers. Rule 3 counters its tendency to agree with you. Rule 4 reins in overambitious plans. Rule 5 is a reminder that a chatbot is not a doctor.",
  "coach.copy": "Copy",
  "coach.copied": "Copied",

  "coach.setup.title": "How do you set up your coach in ChatGPT, Claude, Gemini or Vibe?",
  "coach.setup.intro":
    "All four assistants have a space where your profile and rules stay put from one conversation to the next. No more pasting them every time.",
  "coach.setup.colTool": "Assistant",
  "coach.setup.colWhere": "Where the coach lives",
  "coach.setup.colPlus": "Plus for a runner",
  "coach.setup.gpt.where": "A project, with its instructions and files",
  "coach.setup.gpt.plus": "Voice mode, to debrief out loud on your way home",
  "coach.setup.claude.where": "A project, with its instructions and knowledge",
  "coach.setup.claude.plus": "Can deliver the week's plan as a separate document, easy to reuse",
  "coach.setup.gemini.where": "A Gem, with its instructions and knowledge",
  "coach.setup.gemini.plus": "Connected to Google Drive and Google Calendar",
  "coach.setup.vibe.where": "A project, with its instructions and files",
  "coach.setup.vibe.plus": "A European provider: Mistral AI, based in Paris",
  "coach.setup.gpt.title": "ChatGPT: create a project",
  "coach.setup.gpt.text":
    "In the sidebar, create a new project, for example \"Running coach\". Paste the rules into the <strong>project instructions</strong> and add your athlete profile to its <strong>files</strong>. Every conversation opened in this project starts from that context. The free plan limits the number of files per project: keep them for the profile, and paste your workout files straight into the conversation.",
  "coach.setup.claude.title": "Claude: create a project",
  "coach.setup.claude.text":
    "Create a project, paste the rules into its <strong>instructions</strong> and drop your athlete profile into its <strong>knowledge</strong>. Every new conversation in the project starts with both. The free plan limits the number of projects and the space available, but a profile and one file per week fit easily.",
  "coach.setup.gemini.title": "Gemini: create a Gem",
  "coach.setup.gemini.text":
    "Open the Gem manager and create a <strong>new Gem</strong>. Paste the rules into its <strong>instructions</strong>, then add your athlete profile to its <strong>knowledge</strong>, from your computer or Google Drive. Gems are free and follow you to the mobile app.",
  "coach.setup.vibe.title": "Vibe: create a project",
  "coach.setup.vibe.text":
    "Vibe has been the new name of Mistral AI's Le Chat since May 2026. Create a <strong>new project</strong>, open its customization settings to paste the rules, then add your athlete profile to its <strong>files</strong>. Projects exist on every plan, with limits.",
  "coach.setup.fallback":
    "No dedicated space on your plan, or no wish to create one? Paste the profile and rules at the start of each new conversation. It is less comfortable, and it works just as well.",

  "coach.weekly.title": "The routine that makes you progress: one review per week",
  "coach.weekly.intro":
    "A useful coach follows you over time. What works best is a fixed slot, Sunday evening or Monday morning, that takes ten minutes.",
  "coach.weekly.step1":
    "<strong>Export the week's workouts</strong> from your watch or Strava, preferably as FIT.",
  "coach.weekly.step2":
    "<strong>Drop them into <a href=\"{{href:index.html}}\">gps-digest</a></strong> and copy the file. Everything is computed in your browser.",
  "coach.weekly.step3":
    "<strong>Open a new conversation in the project</strong>, paste the file and add one line on how you felt.",
  "coach.weekly.step4": "<strong>Ask the review question</strong>, then discuss the proposed week before adopting it.",
  "coach.weekly.promptIntro": "The review question, to copy as is:",
  "coach.weekly.prompt":
    "Here are my workouts for the week and how I felt. Review them:\n1. What went well? Back it with numbers.\n2. What should be watched?\n3. Is my load consistent with my goal and race date?\n4. Suggest next week, session by session, with the purpose of each.\n\nMy constraints for next week: [fill in]",
  "coach.weekly.feel":
    "The line on how you felt matters as much as the data. Your watch does not know you slept badly or that your calf has been tight since Tuesday. For example: \"Perceived effort 8/10 on Saturday, two bad nights, right calf stiff since Tuesday.\" Without it, the AI judges your week on the watch alone.",
  "coach.weekly.fresh":
    "Why a new conversation every week? Because a model makes poor use of what sits in the middle of a very long exchange (Liu et al., 2024). Week after week in the same thread, the first instructions fade. The project keeps the profile and rules, the file brings the facts. Once a month, give it the file for the last four weeks so it can judge the trend.",

  "coach.more.title": "Four more requests that work well",
  "coach.more.intro": "Beyond the weekly review, these requests get the most out of a well set-up AI coach:",
  "coach.more.q1":
    "\"Analyze my interval session: rep consistency, recovery between reps, and what I should change next time.\"",
  "coach.more.q2":
    "\"My race is in ten days. Here are my last six weeks. What pace should I aim for, and how should I taper?\"",
  "coach.more.q3":
    "\"I only have three days to run this week. Keep what matters and tell me what I am giving up.\"",
  "coach.more.q4":
    "\"Build a twelve-week plan for a 1:45 half marathon, starting from my current volume. Include easier weeks and justify the progression.\"",

  "coach.traps.title": "The five traps of an AI coach, and how to avoid them",
  "coach.traps.intro": "A misused AI coach will not warn you when it is wrong. Here are the most common mistakes.",
  "coach.traps.li1":
    "<strong>It agrees with you.</strong> Language models tend to side with the person they talk to, a well-documented bias (Sharma et al., 2024). Ask \"What is wrong with this workout?\" rather than \"Was that a good workout?\".",
  "coach.traps.li2":
    "<strong>It makes things up when numbers are missing.</strong> Without data, it fills in plausible values, always in a confident tone. Hence rules 1 and 2, and a complete file.",
  "coach.traps.li3":
    "<strong>It only knows what you tell it.</strong> Your sleep, your stress, your work week: none of that is in the watch. Without a line on how you felt, it thinks you are in top shape.",
  "coach.traps.li4":
    "<strong>Its plans are sometimes too ambitious.</strong> On paper, a plan never gets tired. Insist that it starts from your actual volume and justifies every increase.",
  "coach.traps.li5":
    "<strong>It is not a doctor.</strong> A pain that lasts, gets worse or changes your stride is a job for a health professional, not a chatbot.",

  "coach.choose.title": "Which AI should you pick as a running coach?",
  "coach.choose.p1":
    "The one you already use. ChatGPT, Claude, Gemini and Vibe can all read a structured file, follow rules and suggest a sensible week. Their differences come down to your habits: the Google ecosystem for Gemini, voice debriefs for ChatGPT, long documents and the Strava connector for Claude, a European provider for Vibe.",
  "coach.choose.p2":
    "What really changes the quality of the coaching is not the model. It is what you give it to read.",

  "coach.faq.q1": "Can you use ChatGPT as a running coach for free?",
  "coach.faq.a1":
    "Yes. Projects in ChatGPT, Claude and Vibe, like Gemini's Gems, exist on free plans, with limits on files and usage. Exporting your workouts is free too. You just need to compress them before pasting, or a single workout can max out a free plan.",
  "coach.faq.q2": "Can ChatGPT create a marathon training plan?",
  "coach.faq.a2":
    "Yes, and fairly well if it starts from your real level: current volume, recent bests, availability and race date. A study measured it: coaching experts rate ChatGPT's plans as far from optimal, but their quality rises clearly when it gets more information about the runner (Düking et al., 2024). Ask it to justify the progression, then adjust the plan every week with your real workouts instead of following it blindly.",
  "coach.faq.q3": "Can you connect Strava or Garmin directly to an AI?",
  "coach.faq.a3":
    "Since June 2026, Strava has offered an official connector, limited to its paying subscribers and, so far, to Claude. For Garmin, third-party services such as Tredict or Shape act as a bridge, with an account on their side. Otherwise, the simplest way is still file export, which both Garmin Connect and Strava offer: free, compatible with every AI, as long as you compress the files before pasting them.",
  "coach.faq.q4": "What happens to the data I share with my AI coach?",
  "coach.faq.a4":
    "Whatever you paste into an assistant is processed by its provider, under its terms. Check the settings for chat history retention and whether your conversations are used to train models. The gps-digest file, for its part, contains no GPS coordinates by default.",
  "coach.faq.q5": "Can I talk to my AI coach in my own language?",
  "coach.faq.a5":
    "Yes. All four assistants answer well in many languages, and gps-digest produces the file in seven: English, French, Spanish, Portuguese, German, Chinese and Japanese. Use the language you think in, from the athlete profile to the weekly review.",

  "coach.end.title": "A good coach starts with good data",
  "coach.end.text":
    "gps-digest turns your watch files into a file that ChatGPT, Claude, Gemini or Vibe can actually analyze, even on a free plan. No account, and your files never leave your browser.",

  "coach.sources.sharma":
    "Sharma M, et al. <em>Towards Understanding Sycophancy in Language Models.</em> ICLR 2024. <a href=\"https://arxiv.org/abs/2310.13548\" rel=\"nofollow\">arXiv:2310.13548</a>.",
  "coach.sources.duking":
    "Düking P, et al. <em>ChatGPT Generated Training Plans for Runners are not Rated Optimal by Coaching Experts, but Increase in Quality with Additional Input Information.</em> Journal of Sports Science and Medicine, 2024, 23(1), 56-72. <a href=\"https://www.jssm.org/jssm-23-56.xml%3EFulltext\" rel=\"nofollow\">jssm.org</a>.",

  "guide.kicker":
    "Export guide",
  "guide.formats.title":
    "FIT, TCX or GPX: which format should you export?",
  "guide.formats.colFormat":
    "Format",
  "guide.formats.colContent":
    "What it contains",
  "guide.formats.colUse":
    "When to use it",
  "guide.formats.fit":
    "Everything: heart rate, laps, paired heart rate sensor, barometric elevation, pool lengths",
  "guide.formats.fitUse":
    "First choice",
  "guide.formats.tcx":
    "Heart rate, laps, cadence; no paired sensor, no barometric elevation",
  "guide.formats.tcxUse":
    "Good fallback",
  "guide.formats.gpx":
    "Track and times, often heart rate and cadence; no laps",
  "guide.formats.gpxUse":
    "Last resort",
  "guide.why.title":
    "Why not paste the file straight into ChatGPT?",
  "guide.why.p":
    "Because a watch file is made for software, not for reading. FIT is binary, and one hour of running as TCX is about 533,000 tokens: enough to max out a free plan with a single workout. Even when the file goes through, the AI reasons poorly over thousands of raw lines. <a href=\"{{href:post-ia-analyse.html}}\">The full explanation is here</a>.",
  "guide.next.title":
    "Next: get your workouts analyzed by an AI",
  "guide.next.s1":
    "<strong>Drop the file into <a href=\"{{href:index.html}}\">gps-digest</a></strong> as is: FIT, TCX, GPX, ZIP or .gz. Everything is computed in your browser.",
  "guide.next.s2":
    "<strong>Copy the structured file</strong> it produces: a few thousand tokens per workout instead of several hundred thousand.",
  "guide.next.s3":
    "<strong>Paste it into ChatGPT, Claude, Gemini or Vibe</strong> with your question. For week-by-week follow-up, see our <a href=\"{{href:post-ia-coach.html}}\">AI coach guide</a>.",
  "guide.next.cta":
    "Analyze my workouts",
  "guide.more.title":
    "Other export guides",
  "blog.guides":
    "Export guides",
  "guide.garmin.title":
    "Export Garmin data (FIT) for ChatGPT: the guide",
  "guide.garmin.description":
    "Export a Garmin Connect activity as FIT, get your whole history or copy files from the watch over USB, then get it analyzed by ChatGPT.",
  "guide.garmin.h1":
    "Export your Garmin workouts to get them analyzed by ChatGPT",
  "guide.garmin.meta":
    "Published <time datetime=\"2026-10-01\">October 1, 2026</time> · 4 min read",
  "guide.garmin.lede":
    "Garmin Connect shows your workouts, but it does not hand them to ChatGPT. You first have to get the file out. Here are three ways to do it, from the quickest to the most complete, and what to do with the file next.",
  "guide.garmin.tldr1":
    "One workout: on connect.garmin.com, gear icon on the activity, export the original file. You get a ZIP that contains the FIT.",
  "guide.garmin.tldr2":
    "The Garmin Connect mobile app does not export files: use a computer, or plug the watch in over USB.",
  "guide.garmin.tldr3":
    "A raw FIT is unreadable for ChatGPT. Drop the ZIP as is into gps-digest, then paste the file it produces into your AI.",
  "guide.garmin.m1.title":
    "Export one workout from Garmin Connect",
  "guide.garmin.m1.intro":
    "This is the everyday method. It happens on the website, from a computer.",
  "guide.garmin.m1.s1":
    "Sign in at <strong>connect.garmin.com</strong>.",
  "guide.garmin.m1.s2":
    "Open <strong>Activities</strong> in the left menu, then the workout you want.",
  "guide.garmin.m1.s3":
    "Click the <strong>gear icon</strong> at the top right of the activity.",
  "guide.garmin.m1.s4":
    "Choose the option that exports the <strong>original file</strong>; its label varies with the version of the site. TCX and GPX exports exist too, but the original FIT is more complete.",
  "guide.garmin.m1.s5":
    "The download is a <strong>ZIP</strong> that contains the FIT file. No need to unzip it: gps-digest opens it as is.",
  "guide.garmin.m1.note":
    "Several workouts? Export them one by one and drop all the ZIP files at once.",
  "guide.garmin.m2.title":
    "No internet needed: copy files from the watch over USB",
  "guide.garmin.m2.p":
    "Plug the watch into a computer with its cable. It shows up as a drive or a device named GARMIN. Workouts are in the <code>GARMIN/Activity</code> folder, one FIT file per activity. Copy the most recent ones and drop them into gps-digest. On a Mac, recent watches do not show up as a drive: you need an MTP file transfer utility.",
  "guide.garmin.m3.title":
    "Your whole history: the full account export",
  "guide.garmin.m3.p":
    "To get years of workouts, sign in to your Garmin account and, in the data management section, request an export of your data. Garmin emails you a link to a ZIP archive of your whole account, usually within a few days. FIT files sit inside nested ZIPs. gps-digest can find them there, but the archive often weighs several hundred MB: unzip it and drop only the last few weeks of workouts.",
  "guide.garmin.faq.q1":
    "Can you export a workout from the Garmin Connect phone app?",
  "guide.garmin.faq.a1":
    "No, the mobile app offers no file export. Use connect.garmin.com on a computer, or copy the files from the watch over USB.",
  "guide.garmin.faq.q2":
    "Why can't ChatGPT read my Garmin FIT file?",
  "guide.garmin.faq.a2":
    "FIT is a binary format: ChatGPT has to write a script to decode it, and often uses only part of it. Even converted to text, one hour of running is hundreds of thousands of tokens. gps-digest decodes it in your browser and turns it into a structured file of about 5,800 tokens per workout.",
  "guide.garmin.faq.q3":
    "Do you need a Garmin Connect+ subscription to export your data?",
  "guide.garmin.faq.a3":
    "No. Exporting a workout and exporting your whole account are both free.",
  "guide.strava.title":
    "Export Strava activities (GPX, FIT) for ChatGPT: the guide",
  "guide.strava.description":
    "Export a Strava activity as GPX or in its original format, download your whole archive, then get it analyzed by ChatGPT, Claude or Gemini. Free.",
  "guide.strava.h1":
    "Export your Strava activities to get them analyzed by ChatGPT",
  "guide.strava.meta":
    "Published <time datetime=\"2026-10-01\">October 1, 2026</time> · 4 min read",
  "guide.strava.lede":
    "Strava keeps your runs, but does not hand them to your AI, except through a paid connector that only works with Claude. Good news: export is free, as long as you use the website. Here is how, and what to do with the file next.",
  "guide.strava.tldr1":
    "The richest option: your account archive (strava.com/account, \"Download your account\"). Drop the ZIP as is: gps-digest keeps your last 12 months.",
  "guide.strava.tldr2":
    "The Strava mobile app exports nothing: you need the website, from a computer.",
  "guide.strava.tldr3":
    "The raw file is too heavy for ChatGPT. Drop it into gps-digest, even compressed as .gz, then paste the structured file into your AI.",
  "guide.strava.m1.title":
    "Export an activity from strava.com",
  "guide.strava.m1.intro":
    "Export only works on the Strava website. It is free for your own activities.",
  "guide.strava.m1.s1":
    "Sign in at <strong>strava.com</strong> from a computer and open the activity.",
  "guide.strava.m1.s2":
    "Click the <strong>\"…\"</strong> button (more actions) on the left of the activity.",
  "guide.strava.m1.s3":
    "Choose to <strong>export the original file</strong> if the activity comes from a watch: you get the watch's FIT, the most complete version.",
  "guide.strava.m1.s4":
    "Otherwise, choose <strong>export GPX</strong>. It contains the track, the times and, if they were recorded, heart rate, cadence and temperature.",
  "guide.strava.m1.s5":
    "Drop the downloaded file into gps-digest.",
  "guide.strava.m1.note":
    "If the activity was recorded with the Strava app on a phone, the GPX export does the job just fine.",
  "guide.strava.m2.title":
    "Recommended: your account archive, for a year of context",
  "guide.strava.m2.p":
    "On <a href=\"https://www.strava.com/account\" rel=\"noopener\">strava.com/account</a>, under \"Download your account\", request your account archive. Strava emails you a link, usually within a few hours. Drop the ZIP as is into gps-digest: the tool finds your workouts, skips photos and routes, and keeps the last 12 months by default, anywhere from 3 months to your full history. The last 14 days are detailed workout by workout, the rest takes one line per workout: a year with more than 300 workouts comes to about 30,000 tokens.",
  "guide.strava.m3.title":
    "One caveat: Strava pace is not Garmin pace",
  "guide.strava.m3.p":
    "Strava computes pace on moving time, Garmin Connect on total time. On a city run with stops at traffic lights, the gap easily exceeds 15 seconds per kilometer. gps-digest states in the file which convention it uses, so the AI does not compare numbers that cannot be compared.",
  "guide.strava.faq.q1":
    "Can you export an activity from the Strava app?",
  "guide.strava.faq.a1":
    "No. Export only works on the strava.com website, from a computer.",
  "guide.strava.faq.q2":
    "Do you need a Strava subscription to export your activities?",
  "guide.strava.faq.a2":
    "No, exporting your own activities is free. The subscription is only needed for the official connector that links Strava to Claude.",
  "guide.strava.faq.q3":
    "GPX export or original file: which one should you pick?",
  "guide.strava.faq.a3":
    "The original file if the activity comes from a watch: it is often a FIT, more complete (laps, paired sensor, barometric elevation). GPX otherwise: it keeps the track and, most of the time, heart rate.",
  "guide.strava.source":
    "Strava Support, <em>Exporting your Data and Bulk Export</em>. <a href=\"https://support.strava.com/en-us/articles/15401919-exporting-your-data-and-bulk-export\" rel=\"nofollow\">support.strava.com</a>.",
  "guide.apple.title":
    "Export Apple Watch workouts (GPX, FIT) for ChatGPT",
  "guide.apple.description":
    "Apple offers no direct export of your workouts. Three ways to get an Apple Watch workout as FIT or GPX, then get it analyzed by ChatGPT.",
  "guide.apple.h1":
    "Export your Apple Watch workouts to get them analyzed by ChatGPT",
  "guide.apple.meta":
    "Published <time datetime=\"2026-10-01\">October 1, 2026</time> · 4 min read",
  "guide.apple.lede":
    "Your Apple Watch runs sit in the Health app on your iPhone, and Apple offers no button to get a GPX or FIT file out of it. There are still three ways to get them.",
  "guide.apple.tldr1":
    "The simplest: an app that reads Health and exports to FIT or GPX, such as HealthFit or WorkoutGPX.",
  "guide.apple.tldr2":
    "Without paying: sync your workouts to Strava, then export them from strava.com.",
  "guide.apple.tldr3":
    "You can open gps-digest straight in Safari on your iPhone and drop the exported file there.",
  "guide.apple.m1.title":
    "With an export app: the most complete",
  "guide.apple.m1.intro":
    "Some apps read your workouts in Health and export them in a standard format, heart rate included. HealthFit exports to FIT, GPX or TCX; WorkoutGPX to GPX. Check on the App Store what the free version allows.",
  "guide.apple.m1.s1":
    "Install the app and allow it to read your <strong>workouts</strong>, <strong>routes</strong> and <strong>heart rate</strong> in Health.",
  "guide.apple.m1.s2":
    "Pick the workout to export.",
  "guide.apple.m1.s3":
    "Export it as <strong>FIT</strong> if the app offers it, otherwise as GPX.",
  "guide.apple.m1.s4":
    "Save the file in the <strong>Files</strong> app, or send it to your computer with AirDrop.",
  "guide.apple.m1.s5":
    "Open gps-digest in Safari, on the iPhone or the computer, and drop the file.",
  "guide.apple.m1.note":
    "FIT is better than GPX: it keeps laps and sensor data.",
  "guide.apple.m2.title":
    "Without paying: go through Strava",
  "guide.apple.m2.p":
    "If you use Strava, allow it to read your workouts in Health, from the Strava app settings. Your Apple Watch workouts are then sent there automatically. All that is left is to export them from strava.com, as explained in our <a href=\"{{href:guide-strava.html}}\">Strava guide</a>.",
  "guide.apple.m3.title":
    "With the native Health export: for the curious",
  "guide.apple.m3.p":
    "In the Health app, tap your profile picture, then \"Export All Health Data\". You get a ZIP archive that contains your routes as GPX, in the <code>workout-routes</code> folder. These routes only contain position, altitude and time: heart rate is stored elsewhere, in a huge XML file. The archive often weighs hundreds of MB. To analyze a workout, the first two methods are much better.",
  "guide.apple.faq.q1":
    "Can you export an Apple Watch run as GPX without an app?",
  "guide.apple.faq.a1":
    "Only through the full Health export, which delivers routes without heart rate. For a complete file, you need an export app or a detour through Strava.",
  "guide.apple.faq.q2":
    "Does gps-digest work on iPhone?",
  "guide.apple.faq.a2":
    "Yes. Open the page in Safari, tap the button to choose files and pick the file in the Files app. The analysis runs on the phone; nothing is sent to a server.",
  "guide.apple.faq.q3":
    "Which format should you pick for an Apple Watch workout?",
  "guide.apple.faq.a3":
    "FIT if your export app offers it: it keeps laps and sensor data. GPX works too, as long as it contains heart rate, which export apps include but the native Health export does not.",
  "coach.sources.strava":
    "Strava, <em>Strava Launches MCP Connector, Allowing Athletes to Sync Training History to Claude</em>, press release, June 1, 2026. <a href=\"https://press.strava.com/articles/strava-launches-mcp-connector\" rel=\"nofollow\">press.strava.com</a>.",
  "coach.sources.docs":
    "Official documentation: <a href=\"https://help.openai.com/en/articles/10169521-projects-in-chatgpt\" rel=\"nofollow\">ChatGPT projects</a>, <a href=\"https://support.claude.com/en/articles/9517075-what-are-projects\" rel=\"nofollow\">Claude projects</a>, <a href=\"https://support.google.com/gemini/answer/15146780\" rel=\"nofollow\">Gemini Gems</a>, <a href=\"https://docs.mistral.ai/vibe/work/projects\" rel=\"nofollow\">Vibe projects</a>.",
  "privacy.analytics.row": "Visit statistics",
  "privacy.analytics.rowText":
    "<strong>Yes, anonymous.</strong> Cloudflare Web Analytics counts page views, with no cookie and no persistent identifier. Nothing about your files or your workouts.",
  "privacy.analytics.active":
    "Audience measurement uses Cloudflare Web Analytics: no cookie, no persistent identifier, and no data from your files. It counts page views, countries, traffic sources and device types, never a person.",
  "privacy.verify.p1Analytics":
    "Do not take our word for it. Open your browser's developer tools (<code>F12</code>), <strong>Network</strong> tab, then drop a file. You will see the page loading, the audience measurement request to <code>cloudflareinsights.com</code> and, if weather is enabled, one request to <code>open-meteo.com</code>. Nothing else. No request contains the content of your file.",
};
