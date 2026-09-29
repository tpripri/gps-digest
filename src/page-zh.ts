/**
 * Catalogue de page : chinois simplifié. Clés et emplacements : voir
 * page-i18n.ts. Même typographie que i18n-zh.ts : ponctuation pleine chasse,
 * chiffres et unités en caractères latins.
 */

import type { PageCatalog } from "./page-i18n.ts";

export const zh: Partial<PageCatalog> = {
  "common.langs": "语言",
  "common.footerNav": "页脚",
  "common.privacy": "隐私",
  "common.source": "源代码",

  "home.title": "将 TCX、GPX 或 FIT 文件转换为 CSV，供 ChatGPT 或 Gemini 分析 — gps-digest",
  "home.description":
    "免费工具，把 GPS 手表文件转换成 AI 能读懂的训练档案。识别胸带心率、计算心率漂移、检查间歇训练是否按计划完成，并预测比赛成绩。所有计算都在浏览器中完成：不会上传任何文件。",
  "home.h1": "让 AI 分析你的跑步训练",
  "home.og.description":
    "手表文件太大，AI 无法处理。本工具把它们整理成结构化档案，让 AI 真正能够分析。",
  "home.og.imageAlt": "GPS 手表文件被整理成结构化训练档案。",

  "home.ld.description":
    "将 GPS 手表文件（TCX、GPX、FIT）转换为结构化训练档案，供语言模型分析。",
  "home.ld.feature1": "将 TCX、GPX 和 FIT 转换为结构化 CSV",
  "home.ld.feature2": "全部在浏览器中处理，不上传任何文件",
  "home.ld.feature3": "识别心率传感器（胸带或手腕）",
  "home.ld.feature4": "带有效性检查的心率漂移",
  "home.ld.feature5": "分析间歇训练的完成情况",
  "home.ld.feature6": "预测 5 公里、10 公里、半程马拉松和全程马拉松成绩",
  "home.ld.feature7": "文件数量不限",
  "home.ld.howto": "让 AI 分析你的跑步训练",
  "home.ld.step1.name": "上传文件",
  "home.ld.step1.text": "拖入从手表导出的 TCX、GPX 或 FIT 文件。数量不限。",
  "home.ld.step2.name": "填写参考值",
  "home.ld.step2.text": "填写实测最大心率和一个近期比赛成绩。",
  "home.ld.step3.name": "阅读警告",
  "home.ld.step3.text": "工具会标出心率传感器的更换，以及心率数据不可靠的训练。",
  "home.ld.step4.name": "把档案复制给 AI",
  "home.ld.step4.text": "复制生成的档案，连同你的问题一起粘贴到 ChatGPT、Gemini 或 Claude。",
  "home.ld.faq1.q": "为什么我的 TCX 文件对 AI 来说太大？",
  "home.ld.faq1.a":
    "一个以 1 Hz 记录的一小时 TCX 文件约 1.7 MB，其中近 90% 是 XML 标签，相当于约 533,000 个 token。即使这个体量能放进上下文窗口，模型的推理效果也很差：它要从成千上万行原始坐标中做训练分析。",
  "home.ld.faq2.q": "我的 GPS 文件会被上传到服务器吗？",
  "home.ld.faq2.a":
    "不会。所有计算都在你的浏览器中进行。没有任何文件经过服务器，你可以在“网络”标签页中验证。GPS 轨迹能精确到米地暴露住址：工具默认会裁剪起点和终点。",
  "home.ld.faq3.q": "如何判断一次训练用的是胸带还是手腕传感器？",
  "home.ld.faq3.a":
    "文件几乎从不注明。工具根据信号特征来推断，其中最典型的标志是心率锁定步频：光学传感器把步频误当成心跳，例如显示 172 bpm 而不是 140。胸带测量的是电信号，不会出现这种错误。",
  "home.ld.faq4.q": "手腕心率和胸带心率可以相互比较吗？",
  "home.ld.faq4.a":
    "不可以。两种技术在运动中差异明显，而且强度变化时光学传感器的准确度会下降。在一段时间中途更换传感器，会悄无声息地扭曲心率区间、漂移和趋势。工具会检测这种更换、标出日期，并分别分析两个时段。",
  "home.ld.faq5.q": "马拉松成绩预测有多可靠？",
  "home.ld.faq5.a":
    "不太可靠。一项针对 2,303 名业余跑者的研究表明，Riegel 公式在半程马拉松以内校准良好，但对一半跑者的马拉松预测至少快了十分钟。基于一两个真实比赛成绩的模型，误差大约能减半。",
  "home.ld.faq6.q": "手表显示的温度是气温吗？",
  "home.ld.faq6.a":
    "不是。传感器戴在手腕上，被体温加热：读数通常偏高 3 到 8°C。工具会显示该数值，但总是附上这条警告，包括在发送给 AI 的档案里。",

  "home.lede":
    "手表文件对 ChatGPT、Gemini 或 Claude 来说太大了。本工具把它们整理成结构化训练档案（配速、圈、区间、重复、心率漂移），让 AI 真正能够分析。",
  "home.promise":
    "<strong>你的文件不会离开浏览器。</strong>所有计算都在你的设备上完成，你可以在“网络”标签页中验证。GPS 轨迹能精确到米地暴露你的住址，因此起点和终点默认会被裁剪。<a href=\"{{href:confidentialite.html}}\">哪些数据会发出，哪些永远不会</a>。",
  "home.step1.title": "上传文件",
  "home.step1.text": "数量不限，TCX、GPX 或 FIT 均可，从手表或 Strava 导出。",
  "home.step2.title": "填写参考值",
  "home.step2.text": "最大心率和最近的比赛成绩。没有它们，心率区间和成绩预测只能是近似值。",
  "home.step3.title": "阅读警告",
  "home.step3.text": "传感器更换、心率不可靠：其余结果是否成立取决于它们。",
  "home.step4.title": "获取档案",
  "home.step4.text": "一份完整、带注释的文本文件，可直接放进 ChatGPT、Gemini 或 Claude。",

  "home.why.title": "为什么要用这个工具？",
  "home.why.p1":
    "一个以 1 Hz 记录的一小时 TCX 文件约 1.7 MB，其中近 90% 是 XML 标签，相当于约 <strong>533,000 个 token</strong>。即使这个体量能放进上下文窗口，模型的推理效果也很差：它要从成千上万行原始坐标中做训练分析。",
  "home.why.p2":
    "这里生成的档案只有几万个 token，包含模型能够理解的内容：每公里分段、圈、各区间用时、逐次重复、最佳成绩、成绩预测。<strong>分析效果比用完整文件更好</strong>，而不仅仅是更省。",
  "home.why.tableTitle": "工具自动计算的内容",
  "home.why.colAnalysis": "分析",
  "home.why.colAnswer": "回答的问题",
  "home.why.sensor": "心率来源",
  "home.why.sensorText":
    "胸带还是手腕传感器？文件几乎从不注明。工具根据信号推断，尤其是心率锁定步频的现象，即手表把步伐误当成心跳。",
  "home.why.drift": "心率漂移",
  "home.why.driftText":
    "后半程效率是否下降？超过 5% 说明基础耐力有问题。工具不会对间歇训练计算漂移，因为那样的数值毫无意义。",
  "home.why.blocks": "间歇完成情况",
  "home.why.blocksText":
    "各次重复是否稳定？配速有没有下降？配速保持不变时心率是否上升，这是腿还没撑不住之前的疲劳信号。",
  "home.why.projections": "成绩预测",
  "home.why.projectionsText":
    "5 公里、10 公里、半程马拉松、全程马拉松，附带区间范围和可靠程度。比赛成绩比训练表现权重更高，且权重随时间递减。",
  "home.why.hardware": "设备更换",
  "home.why.hardwareText":
    "跨多次训练，工具会检测并标出心率传感器的更换，否则所有心率比较都会在不知不觉中失效。",

  "home.set.title": "1. 你的参考值",
  "home.set.intro": "可选，但没有这些值时，心率区间只能根据文件中观测到的最大心率估算，结果不够准确。",
  "home.set.fcmax": "最大心率",
  "home.set.fcmaxHint": "实测值，不是 220 减年龄",
  "home.set.fcmaxPlaceholder": "例如 185",
  "home.set.threshold": "阈值配速",
  "home.set.thresholdHint": "约可维持 1 小时",
  "home.set.refDist": "参考成绩",
  "home.set.refDistHint": "距离",
  "home.set.refNone": "无",
  "home.set.ref5k": "5 公里",
  "home.set.ref10k": "10 公里",
  "home.set.refHalf": "半程马拉松",
  "home.set.refMarathon": "全程马拉松",
  "home.set.refTime": "用时",
  "home.set.refTimeHint": "h:mm:ss",
  "home.set.refDate": "成绩日期",
  "home.set.refDateHint": "按时间远近加权",
  "home.set.privacy": "隐私裁剪",
  "home.set.privacyHint": "起点和终点各裁掉的米数",
  "home.set.weather": "气温",
  "home.set.weatherOn": "获取实际天气",
  "home.set.weatherOff": "不发送任何数据",
  "home.set.weatherHint":
    "向 Open-Meteo 发送路线的<strong>中点</strong>（取整到约 1 公里）和日期。绝不发送起点，也绝不发送你的数据。",

  "home.files.title": "2. 你的文件",
  "home.files.drop": "把文件拖到这里",
  "home.files.formats": "TCX、GPX 或 FIT，数量不限，需要的话可以是整个赛季",
  "home.files.fit": "FIT 是手表的原生格式：只有它包含泳池趟数和实际配对的心率传感器信息。",
  "home.files.pick": "选择文件",

  "home.export.title": "3. 你的档案，可以分析了",
  "home.export.intro":
    "如今的上下文窗口轻松容纳 100,000 个 token，因此默认设置优先保留细节。如果你的模型容量较小，或者一次加载了很多训练，就调低一档。",
  "home.export.resolution": "数据流精细度",
  "home.export.res5s": "每 5 秒一个点（最精细）",
  "home.export.res10s": "每 10 秒一个点（推荐）",
  "home.export.res30s": "每 30 秒一个点（精简）",
  "home.export.res100m": "每 100 米一个点",
  "home.export.res10m": "每 10 米一个点（非常详细）",
  "home.export.resNone": "只有表格，不含连续数据流",
  "home.export.resSummary": "简短汇总，不含每次训练的明细",
  "home.export.coords": "GPS 坐标",
  "home.export.coordsDrop": "移除（推荐）",
  "home.export.coordsKeep": "保留",
  "home.export.coordsHint": "海拔剖面、配速和心率在任何情况下都会保留。",
  "home.export.questions": "可以问 AI 的问题",
  "home.export.q1": "结合温度分析我的心率漂移，告诉我基础耐力是否是限制因素。",
  "home.export.q2": "我的间歇训练是否按计划完成？下次训练应该改进什么？",
  "home.export.q3": "分别比较不同传感器的时段，告诉我有什么变化。",
  "home.export.q4": "根据这些训练负荷，帮我安排下周的训练。",
  "home.export.q5": "我的强度分布是否符合我的目标？",
  "home.export.preview": "查看生成的档案",

  "home.results.title": "4. 详细结果，供深入研究",
  "home.results.overview": "总览",
  "home.results.colFile": "文件",
  "home.results.colDate": "日期",
  "home.results.colDist": "距离",
  "home.results.colMoving": "运动时间",
  "home.results.colElapsed": "总时间",
  "home.results.colSpeed": "配速 / 速度",
  "home.results.colHr": "平均心率",
  "home.results.colSensor": "传感器",
  "home.results.colDrift": "漂移",
  "home.results.colBlocks": "间歇",
  "home.results.detail": "逐次训练明细",
  "home.results.detailIntro":
    "展开一次训练，查看每个结论背后的信号。尤其适合判断传感器识别是否正确：只有你知道哪些训练戴了胸带。",
  "home.results.load": "训练负荷",
  "home.results.progression": "有氧能力进展",
  "home.results.progressionIntro":
    "相同配速下心率随时间的变化：唯一不受路线和当天状态影响的体能指标。不同传感器分开处理。",
  "home.results.projections": "成绩预测",

  "home.faq.title": "常见问题",
  "home.faq.q1": "为什么我的 TCX 文件对 Gemini 或 ChatGPT 来说太大？",
  "home.faq.a1":
    "一个以 1 Hz 记录的一小时 TCX 文件约 1.7 MB，其中近 90% 是 XML 标签，相当于约 533,000 个 token。即使这个体量能放进上下文窗口，模型面对成千上万行原始坐标时推理效果也很差。",
  "home.faq.q2": "我的文件会被上传到服务器吗？",
  "home.faq.a2":
    "不会。所有计算都在你的浏览器中进行，你可以在“网络”标签页中验证。GPS 轨迹的起始和结束几个点会精确到米地暴露住址：工具默认会把它们裁掉。",
  "home.faq.q3": "工具怎么判断我戴了胸带？",
  "home.faq.a3":
    "最典型的标志是心率锁定步频：光学传感器把步频误当成心跳，例如显示 172 bpm 而不是 140。胸带测量的是电信号，不会出现这种错误。此外还会参考相同数值的平台长度、逐拍变化的细腻程度，以及对配速变化的响应延迟。这是一种启发式方法：置信度设有上限，并会显示出来。",
  "home.faq.q4": "为什么有些训练不计算漂移？",
  "home.faq.a4":
    "因为在那种情况下它毫无意义。漂移比较的是一次<em>持续</em>运动前后两半的效率。在间歇训练中，速度与心率之比在重复和恢复之间来回摆动：得到的数值只是伪影。工具宁可说明无法测量，也不给出误导性的数字。",
  "home.faq.q5": "显示的温度是气温吗？",
  "home.faq.a5":
    "不是。传感器在手腕上，被体温加热：读数通常偏高 3 到 8°C。数值会显示，但总是附上这条警告，包括在发送给 AI 的档案里。",
  "home.faq.q6": "马拉松成绩预测有多可靠？",
  "home.faq.a6":
    "不太可靠，这一点必须说清楚。一项针对 2,303 名业余跑者的研究表明，Riegel 公式在半程马拉松以内校准良好，但对一半跑者的马拉松预测至少快了十分钟。基于真实比赛成绩的模型，误差大约能减半。",
  "home.faq.q7": "支持哪些格式？",
  "home.faq.a7":
    "TCX、GPX 和 FIT。<strong>优先使用 FIT</strong>：它是大多数 Garmin、Coros、Wahoo 和 Suunto 手表的原生格式，也是唯一逐趟记录泳池数据并附带配对设备列表的格式。这样工具就能确切知道（而不是估计）你是否戴了心率胸带。Garmin Connect 导出的 TCX 会把一次游泳训练的所有趟数压缩成一行。",
  "home.faq.q8": "显示的配速和 Garmin Connect 对不上",
  "home.faq.a8":
    "这是计算口径不同，不是错误。这里的配速按<strong>运动时间</strong>计算，与 Strava 相同：等红灯和暂停都不计入。Garmin Connect 按总时长计算，因此显示的配速更慢。在城市里跑 16 公里，差距很容易达到每公里十五秒。两种时长会并排显示，方便看清差异，发送给 AI 的档案也会注明所用口径。否则模型会拿不可比的数字作比较。",
  "home.faq.q9": "爬升也对不上",
  "home.faq.a9":
    "如果上传 FIT 文件，工具会采用手表气压高度计测得的爬升。TCX 或 GPX 中没有这项数据：只能根据 GPS 海拔重新计算，通常会低估 30% 到 50%。在一次真实的 16 公里跑步中，计算值为 61 米，实测值为 140 米。这也是优先使用 FIT 的原因之一。",
  "home.faq.q10": "识别出的运动类型不对，为什么？",
  "home.faq.a10":
    "工具不相信文件里的运动标签，因为它经常出错：夹杂跑步片段的力量训练会被标成“跑步”，泳池训练会被标成“其他”。因此分类依据的是数据形态。每次训练会被分到一个级别：跑步和骑行做完整分析，游泳单独处理，其余一律只计入负荷。力量训练即使配速毫无意义，也会影响恢复。",

  "home.refs.title": "这些计算的依据",
  "home.refs.intro": "每项指标都基于已发表的研究。以下是具体出处，以及每项研究没有说明的内容。",
  "home.refs.minetti":
    "<strong>坡度调整配速。</strong>Minetti AE, et al. <em>Energy cost of walking and running at extreme uphill and downhill slopes.</em> J Appl Physiol. 2002;93(3):1039–46. <a href=\"https://doi.org/10.1152/japplphysiol.01177.2001\" rel=\"nofollow\">doi</a> · <a href=\"https://pubmed.ncbi.nlm.nih.gov/12183501/\" rel=\"nofollow\">PubMed</a>。基于跑步机实验：未考虑技术性地形，也未考虑长距离下坡造成的肌肉损伤。",
  "home.refs.sensors":
    "<strong>心率传感器之间的差异。</strong>Gillinov S, et al. Med Sci Sports Exerc. 2017;49(8):1697–703. · Pasadyn SR, et al. Cardiovasc Diagn Ther. 2019;9(4):379–85. <a href=\"https://doi.org/10.21037/cdt.2019.06.05\" rel=\"nofollow\">doi</a>。这些研究测量了光学传感器的误差，但没有提出仅凭文件识别传感器的方法。我们的识别方法由此推导而来：它不是经过验证的方案。",
  "home.refs.riegel":
    "<strong>成绩预测。</strong>Riegel PS. <em>Athletic records and human endurance.</em> American Scientist. 1981;69(3):285–90。基于世界纪录、在平坦路面上校准。",
  "home.refs.vickers":
    "<strong>针对业余跑者的修正。</strong>Vickers AJ, Vertosick EA. <em>An empirical study of race times in recreational endurance runners.</em> BMC Sports Sci Med Rehabil. 2016;8:26. <a href=\"https://doi.org/10.1186/s13102-016-0052-y\" rel=\"nofollow\">doi</a>。这正是比赛成绩比训练表现权重更高的直接原因。",
  "home.refs.cs":
    "<strong>临界速度。</strong>Jones AM, et al. <em>Critical power: implications for determination of V̇O₂max and exercise tolerance.</em> Med Sci Sports Exerc. 2010;42(10):1876–90. <a href=\"https://doi.org/10.1249/MSS.0b013e3181d9cf7f\" rel=\"nofollow\">doi</a>。该模型假设临界速度可以无限维持，而超过约 90 分钟后这一假设就不成立。",
  "home.refs.coggan":
    "<strong>标准化功率、TSS、Pa:Hr 漂移。</strong>广泛采用的训练方法（Coggan、Friel），但并非经过同行评审的论文。这个区别很重要。",
  "home.refs.noteTitle": "这些参考文献无法保证的事",
  "home.refs.note":
    "它们支撑的是公式，而不是结论。用故障传感器正确算出的数字依然是错的。如果出现疼痛，或者在调整训练计划之前，专业人士的意见优先于本工具，也优先于你发送结果的 AI。",
  "home.footer": "MIT 许可证。无需账号，没有广告，没有追踪器。",

  "js.libError":
    "<strong>无法加载程序库。</strong>请通过 <code>npm run dev</code> 打开页面：直接从文件管理器打开是无法运行的。",
  "js.vigilance": "档案中包含 {n} 条注意事项",
  "js.indicShort": "参考",
  "js.sensorSummary": "{file} — {label}（置信度 {confidence}）",
  "js.noSignal": "没有可用信号。",
  "js.signal": "{name}：<b>{value}</b> — {note}",
  "js.lock": "步频锁定：<b>{pct}</b>，<b>{n}</b> 个片段已排除在漂移计算之外。",
  "js.sets": "识别出的分组：<b>{sets}</b>",
  "js.weather": "气温 <b>{temp}°C</b>{feels}{humidity}{wind} — Open-Meteo",
  "js.weatherFeels": "（体感 {temp}）",
  "js.weatherHumidity": "，相对湿度 {pct}",
  "js.weatherWind": "，风速 {kmh} km/h",
  "js.drift":
    "漂移 <b>{pct}</b> {badge}，基于 {min} 分钟、配速 {pace} 的片段（占训练的 {coverage}）— {interpretation}",
  "js.driftNone": "未计算漂移：{reason}",
  "js.hrr": "心率恢复：60 秒内下降 <b>{bpm} bpm</b>{erosion}",
  "js.hrrErosion": "，每次重复减少 {bpm} bpm",
  "js.adherence": "<b>{set}</b> — {grade}：{verdicts}",
  "js.progPace": "配速",
  "js.progSensor": "传感器",
  "js.progPoints": "数据点",
  "js.progTrend": "趋势",
  "js.progReading": "解读",
  "js.perWeek": "{value} bpm/周",
  "js.progNone": "暂时无法跟踪：至少需要三次配速相近、使用同一心率传感器的跑步训练。",
  "js.trendTitle": "{pace} 配速下的心率 — {source}",
  "js.projDistance": "距离",
  "js.projEstimate": "预测",
  "js.projRange": "区间",
  "js.projReliability": "可靠性",
  "js.projMethod": "方法",
  "js.cs": "临界速度 <b>{pace}/km</b>，D' <b>{d} m</b>，R² <b>{r2}</b>",
  "js.projNone": "无法预测：至少需要一次跑步训练。",
  "js.redOriginal": "原始文件",
  "js.redGenerated": "生成的档案",
  "js.redReduction": "压缩率",
  "js.redCompat": "兼容性",
  "js.sizeMb": "{value} MB — 约 {tokens} 个 token",
  "js.sizeKb": "{value} KB — 约 {tokens} 个 token",
  "js.compatTooBig": "⚠ 对 ChatGPT 来说太大，请降低精细度",
  "js.compatGemini": "⚠ 仅适用于 Gemini",
  "js.compatOk": "✓ 适用于 ChatGPT、Claude 和 Gemini",
  "js.truncated": "… 预览已截断，复制的内容是完整的。",
  "js.download": "下载档案（.txt）",
  "js.copy": "复制到剪贴板",
  "js.copied": "已复制",
  "js.filename": "gps-digest-training.txt",

  "privacy.title": "隐私：哪些数据会离开浏览器，哪些永远不会",
  "privacy.description":
    "你的 GPS 文件永远不会被发送到服务器：所有计算都在浏览器中完成。唯一的例外是天气查询，它会发送取整到约一公里的路线中点。完整的技术细节，均可验证。",
  "privacy.ld.q1": "GPS 文件会被发送到服务器吗？",
  "privacy.ld.a1":
    "不会。解析和分析都在浏览器中以 JavaScript 在用户设备上运行。不会传输任何文件，这可以在开发者工具的“网络”标签页中验证：没有任何请求包含文件内容。",
  "privacy.ld.q2": "哪些数据会发送给第三方？",
  "privacy.ld.a2":
    "只有启用时的天气查询：取整到两位小数（约 1.1 公里精度）的路线中点和训练日期，发送给 Open-Meteo。绝不发送通常对应住址的起点，也绝不发送任何生理数据或标识符。",
  "privacy.ld.q3": "为什么工具要裁剪轨迹的起点和终点？",
  "privacy.ld.a3":
    "因为 GPS 轨迹的最初和最后几个点会精确到米地暴露住址。这项裁剪默认开启，范围为 250 米，在任何导出之前执行，包括导出给人工智能的档案。",
  "privacy.back": "← 返回工具",
  "privacy.h1": "隐私",
  "privacy.lede":
    "GPS 轨迹能精确到米地暴露你的住址。本页准确说明哪些数据留在你的设备上、哪些会发出，以及你如何亲自验证。",
  "privacy.principle.title": "基本原则",
  "privacy.principle.p1":
    "<strong>你的文件永远不会被传输。</strong>解码和分析以 JavaScript 在你的浏览器、你的设备上运行。根本不存在接收文件的服务器。这不是一项政策，而是根本没有这样的基础设施。",
  "privacy.principle.p2":
    "具体来说：页面加载完成后，你可以断开网络，再上传文件，分析照样能完成。只有天气查询会失败，这恰恰证明它是唯一会发出的数据。",
  "privacy.table.title": "哪些会发出，哪些不会",
  "privacy.table.colData": "数据",
  "privacy.table.colSent": "是否传输？",
  "privacy.table.file": "你的手表文件",
  "privacy.table.fileText": "<strong>从不。</strong>由浏览器从磁盘读取，在内存中分析。",
  "privacy.table.track": "你的 GPS 轨迹",
  "privacy.table.never": "<strong>从不。</strong>",
  "privacy.table.physio": "心率、配速、功率",
  "privacy.table.settings": "最大心率、阈值配速、填写的成绩",
  "privacy.table.settingsText": "<strong>从不。</strong>只在本次会话期间保存在内存中，关闭标签页即消失。",
  "privacy.table.dossier": "生成的档案",
  "privacy.table.dossierText":
    "工具<strong>从不</strong>发送。只有你自己会复制或下载它，之后如何使用由你决定。",
  "privacy.table.midpoint": "路线中点（已取整）",
  "privacy.table.midpointText": "<strong>是</strong>，前提是启用了天气查询。详见下文。",
  "privacy.weather.title": "天气：唯一的例外",
  "privacy.weather.p1":
    "手表的温度传感器戴在手腕上，被体温加热：读数偏高 3 到 8°C，而且无法反映湿度和风。而高温恰恰是心率漂移最主要的干扰因素。没有真实气温，就会把正常的高温代价误判为状态不佳。",
  "privacy.weather.p2": "因此，请求经过专门设计，无法被用作位置数据：",
  "privacy.weather.midTitle": "发送的是路线中点，绝不是起点",
  "privacy.weather.midText": "起点就是你的家。中点只是一个普通地点，与你睡觉的地方毫无关系。",
  "privacy.weather.roundTitle": "坐标取整到两位小数",
  "privacy.weather.roundText":
    "也就是约 1.1 公里的精度。天气是区域性现象：精度毫无损失，而请求也不再指向任何可识别的地点。",
  "privacy.weather.nothingTitle": "不附带任何其他数据",
  "privacy.weather.nothingText":
    "没有心率，没有配速，没有轨迹，没有标识符，没有 cookie。只有一个取整后的纬度、一个取整后的经度和一个日期。完整请求如下：",
  "privacy.weather.recipient":
    "接收方是开放天气服务 <a href=\"https://open-meteo.com\" rel=\"nofollow noopener\">Open-Meteo</a>。可以在首页的下拉菜单中关闭这项功能，工具在没有它的情况下照常运行。",
  "privacy.trim.title": "裁剪住址附近的轨迹",
  "privacy.trim.text":
    "轨迹的最初和最后几个点会暴露你家的大门。工具<strong>默认裁掉 250 米</strong>，起点和终点都裁，并且在任何分析和导出之前执行。该设置可以调整，另有选项可完全移除坐标，同时保留海拔剖面、配速和心率。",
  "privacy.note.title": "我们无法控制的部分",
  "privacy.note.text":
    "你复制到 ChatGPT、Gemini 或 Claude 的档案，在你粘贴的那一刻就离开了浏览器，此后适用的是该服务的条款，而不是我们的。如果档案里仍有坐标，它们也会一并发出。这正是导出时默认开启“移除坐标”选项的原因。",
  "privacy.dont.title": "我们不做的事",
  "privacy.dont.1": "无需账号，无需注册，无需密码。",
  "privacy.dont.2": "没有 cookie，没有广告追踪器，没有像素。",
  "privacy.dont.3": "没有广告，因此没有任何收集数据的动机。",
  "privacy.dont.4": "不出售数据：根本没有数据可卖。",
  "privacy.dont.analytics": "如果将来加入访问统计，也不会使用 cookie 或持久标识符，并且会事先更新本页。",
  "privacy.verify.title": "亲自验证",
  "privacy.verify.p1":
    "不要只听我们说。打开浏览器的开发者工具（<code>F12</code>），切换到<strong>“网络”</strong>标签页，然后上传一个文件。你会看到页面加载的请求，以及（如果启用了天气查询）一个发往 <code>open-meteo.com</code> 的请求。除此之外别无其他。没有任何请求包含你的文件内容。",
  "privacy.verify.p2":
    "<a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">源代码是公开的</a>，采用 MIT 许可证：页面做了什么，可以逐行查看。",
  "privacy.rights.title": "你的权利",
  "privacy.rights.text":
    "由于不收集也不保存任何个人数据，所以不存在可供查阅、更正或删除的记录：关闭标签页就能清除一切。如有任何问题，可以在上方的 GitHub 仓库中发起讨论。",
  "privacy.footerTool": "工具",
  "privacy.updated": "最后更新：<time datetime=\"2026-09-29\">2026 年 9 月 29 日</time>。",
  "common.blog": "博客",
  "home.why.more":
    "为什么 AI 需要结构化档案，而不是原始文件：<a href=\"{{href:post-ia-analyse.html}}\">阅读文章</a>。",

  "blog.title": "gps-digest 博客：训练、手表数据与 AI",
  "blog.description":
    "关于用人工智能分析训练的文章：ChatGPT、Gemini 和 Claude 能为你的训练做什么，以及如何给它们真正可用的数据。",
  "blog.lede": "训练、手表数据与人工智能。文章简短、有数据支撑，不做数据无法兑现的承诺。",
  "blog.readMore": "阅读文章",

  "post.title": "用 ChatGPT 分析跑步训练：token 陷阱",
  "post.description":
    "AI 很擅长分析训练，但一个一小时的 TCX 文件就有 533,000 个 token。为什么会卡住，以及如何在三分钟内解决。",
  "post.kicker": "训练与 AI",
  "post.h1": "ChatGPT 能分析你的跑步训练，前提是它读得懂你的数据。",
  "post.meta": "发布于 <time datetime=\"2026-09-28\">2026 年 9 月 28 日</time> · 阅读约 7 分钟",
  "post.lede":
    "问 AI 为什么周二的间歇跑感觉那么吃力，它的回答会比大多数训练 App 更好。前提只有一个：它必须真正看到你的数据。而问题恰恰出在这里，原因也和你想的不一样。",
  "post.tldrTitle": "要点速览",
  "post.tldr1":
    "ChatGPT、Gemini 和 Claude 能解读一次训练，把它和你的目标联系起来，并回答你的追问，就像一位随时在线的教练。",
  "post.tldr2": "一个以 1 Hz 记录的一小时 TCX 文件约 1.7 MB，相当于约 533,000 个 token，其中近 90% 是 XML 标签。",
  "post.tldr3": "即使文件能传上去，模型面对成千上万行原始坐标时推理效果也很差。",
  "post.tldr4":
    "解决办法不是压缩，而是重新组织：分段、圈、区间、重复。这样一次训练只需约 5,800 个 token，分析效果反而更好。",

  "post.why.title": "为什么 AI 是这么好的训练伙伴？",
  "post.why.p1":
    "因为它从你的问题出发，而不是从仪表盘出发。App 给你看的图表和给所有人看的一样。AI 却能结合气温、你这周的训练量和你给它设定的目标，解释你的配速为什么在第 8 公里掉了下来。",
  "post.why.listIntro": "有了好的数据，AI 能够：",
  "post.why.li1": "用通俗的语言解释一次训练，不讲术语；",
  "post.why.li2": "把你的数据和目标联系起来：10 公里跑进 45 分钟和第一次跑全马，需要的训练完全不同；",
  "post.why.li3": "对比几周的训练，发现你没注意到的趋势；",
  "post.why.li4": "回答你的下一个问题，再下一个，像一位晚上 11 点还在线的教练一样耐心；",
  "post.why.li5": "根据你的实际训练负荷安排下周训练，而不是套用通用计划。",
  "post.why.p2":
    "正是这种个性化带来了差别。但它建立在一个几乎没人验证的前提上：模型真的能拿到你的数据，而不是一段三行的摘要或一个读不懂的文件。",

  "post.tokens.title": "什么是 token，为什么你的手表会产生这么多？",
  "post.tokens.p1":
    "token 是语言模型读取和计费的文本单位：一个词、一个数字或一个标点的片段。每个模型都有上限，也就是上下文窗口，超出部分就读不进去了。根据模型和订阅方案不同，目前这个上限从几万到几百万个 token 不等。",
  "post.tokens.p2":
    "问题在于，手表文件是为软件设计的，而不是为了让人或模型阅读。TCX 文件在你跑步的每一秒都重复同样的 XML 标签。以下是我们的测试结果：",
  "post.tokens.colCase": "数据",
  "post.tokens.colSize": "大小",
  "post.tokens.colTokens": "估计 token 数",
  "post.tokens.r1": "一次一小时的训练，原始 TCX 文件",
  "post.tokens.r1size": "1.7 MB",
  "post.tokens.r1tokens": "≈ 533,000",
  "post.tokens.r2": "同一次训练，整理为结构化档案",
  "post.tokens.r2size": "≈ 18 KB",
  "post.tokens.r2tokens": "≈ 5,800",
  "post.tokens.r3": "15 MB 真实文件，原始格式",
  "post.tokens.r3size": "15 MB",
  "post.tokens.r3tokens": "≈ 470 万",
  "post.tokens.r4": "同样的文件，整理为结构化档案",
  "post.tokens.r4size": "≈ 100 KB",
  "post.tokens.r4tokens": "≈ 32,000",
  "post.tokens.note": "按每个 token 3.2 个字符估算，这是在数值型 CSV 上观测到的比例。测试可用源代码中公开的测试程序复现。",
  "post.tokens.p3": "换句话说，一次原始训练数据就可能占满普通订阅的上限，而一整个赛季的数据放到哪里都装不下。",

  "post.paste.title": "把 TCX 文件粘贴到 ChatGPT 会发生什么？",
  "post.paste.intro": "有三种可能，没有一种是好的。",
  "post.paste.h1": "1. 文件被拒绝",
  "post.paste.p1": "这是最坦诚的情况：界面提示文件太大。你浪费了时间，但至少你知道了。",
  "post.paste.h2": "2. 文件只被读取了一部分，而你并不知道",
  "post.paste.p2":
    "面对较大的附件，AI 助手常常只读取其中的片段，或者交给脚本去概括。于是 AI 只凭一部分训练数据就信心十足地作答。答案看起来没问题，但未必正确。",
  "post.paste.h3": "3. 文件传上去了，但分析质量很差",
  "post.paste.p3":
    "即使上下文窗口很大，模型也很难利用埋在长文档中间的信息。斯坦福大学的研究人员把这种现象称为“lost in the middle”（Liu 等，2024）。让模型从 3,600 行经纬度数据中做训练分析，就等于让它心算自己并不擅长的东西，而这些数据几乎提供不了什么有用信息。",

  "post.restructure.title": "要压缩文件吗？不，要重新组织它",
  "post.restructure.p1":
    "只把文件变小还不够，关键是让它变得可读。教练不会逐秒去看你的 GPS 坐标。他看的是每公里用时、各次重复和各心率区间的时间。这些正是语言模型能够理解的内容。",
  "post.restructure.colRaw": "原始文件里",
  "post.restructure.colDossier": "结构化档案里",
  "post.restructure.r1raw": "3,600 行纬度、经度和海拔",
  "post.restructure.r1dossier": "每公里分段、圈、各区间用时",
  "post.restructure.r2raw": "每秒一个心率值",
  "post.restructure.r2dossier": "已经算好的心率漂移，并注明测量的是哪一段",
  "post.restructure.r3raw": "没有任何心率传感器信息",
  "post.restructure.r3dossier": "胸带还是手腕，并附带置信度",
  "post.restructure.r4raw": "每个数据点都重复的 XML 标签",
  "post.restructure.r4dossier": "单位清晰的 CSV 表格",
  "post.restructure.p2":
    "对 15 MB 的真实文件，整理后的档案约为 32,000 个 token。而且分析结果比用完整文件更好。不只是更省，而是更好，因为模型处理的是它能理解的内容。",

  "post.blind.title": "哪些事情 AI 无法自己判断？",
  "post.blind.p1": "有些错误从数字上看不出来。如果没有人指出，AI 就会把它们当成事实，并在此基础上展开分析。",
  "post.blind.li1":
    "<strong>心率传感器。</strong>手腕传感器有时会把步频误当成心跳，显示 172 bpm 而不是 140。把手腕数据和胸带数据放在一起比较，比的是两种仪器，而不是两种身体状态。",
  "post.blind.li2":
    "<strong>温度。</strong>手表的温度传感器被手腕加热，比实际气温高 3 到 8°C。把它当作天气数据的 AI，会误判你心率漂移的原因。",
  "post.blind.li3":
    "<strong>配速。</strong>Strava 按运动时间计算，Garmin Connect 按总时长计算。在城市里跑步，两者的差距很容易超过每公里 15 秒。",
  "post.blind.li4":
    "<strong>没有意义的指标。</strong>在间歇训练上计算心率漂移毫无意义。没有数字，也比一个看似可信的错误数字好。",
  "post.blind.p2": "好的档案不只是做摘要。它会说明哪些数据可靠、哪些不可靠，让 AI 不至于在沙地上推理。",

  "post.howto.title": "如何在三分钟内让 AI 分析你的训练？",
  "post.howto.step1": "<strong>导出文件</strong>：从手表或 Strava 导出，最好选择信息最完整的 FIT 格式。",
  "post.howto.step2": "<strong>拖入 gps-digest。</strong>所有计算都在你的浏览器中完成：不会把任何文件上传到服务器。",
  "post.howto.step3": "<strong>复制档案</strong>到 ChatGPT、Gemini 或 Claude，然后提出你的问题。",
  "post.howto.cta": "为 AI 准备我的训练数据",

  "post.prompts.title": "该向 AI 提什么问题？",
  "post.prompts.intro": "最好的问题来自真实的疑问。下面五个例子在结构化档案上效果很好：",
  "post.prompts.q1": "“在气温相近的情况下，我的心率漂移比上个月增加了吗？”",
  "post.prompts.q2": "“周二的重复训练我保持住配速了吗？下次该改进什么？”",
  "post.prompts.q3": "“按现在的训练负荷，六周后我能把 10 公里跑进 45 分钟吗？”",
  "post.prompts.q4": "“我的轻松跑和高强度训练的比例适合备战马拉松吗？”",
  "post.prompts.q5": "“结合我现在的疲劳程度，帮我安排下周的训练。”",

  "post.faq.title": "常见问题",
  "post.faq.q1": "ChatGPT 能直接读取 FIT 或 TCX 文件吗？",
  "post.faq.a1":
    "能打开，但无法充分利用。FIT 是二进制格式，AI 需要写脚本来解码；而一个一小时的 TCX 文件约有 533,000 个 token。无论哪种情况，分析依据的都是片段，或者不适合分析的原始数据。结构化档案能同时解决这两个问题。",
  "post.faq.q2": "为什么不直接从 Garmin Connect 导出 CSV？",
  "post.faq.a2":
    "因为这种导出基本只包含圈数据。它没有心率漂移，没有传感器识别，没有每次重复的明细，也没有避免误读所需的背景信息，比如配速是怎么计算的。",
  "post.faq.q3": "我的数据会被发送到别处吗？",
  "post.faq.a3":
    "不会。你的文件在浏览器中读取和分析。只有你自己复制给 AI 的档案会离开你的设备，而且默认会移除其中的 GPS 坐标。",
  "post.faq.q4": "AI 能取代教练吗？",
  "post.faq.a4":
    "不能，这也不是它的目的。它能解释、比较和提出建议，但它看不到你跑步，也感受不到你的伤痛。如果受伤或有严重疑问，请优先听取专业人士的意见。",
  "post.faq.q5": "该选哪个 AI：ChatGPT、Gemini 还是 Claude？",
  "post.faq.a5":
    "三者都能分析结构化档案。真正的差别在于你所订阅方案的上下文窗口大小。如果每次训练的档案只有几千个 token，这个问题就不再重要。",

  "post.sources.title": "参考资料",
  "post.sources.liu":
    "Liu NF, et al. <em>Lost in the Middle: How Language Models Use Long Contexts.</em> Transactions of the Association for Computational Linguistics, 2024. <a href=\"https://arxiv.org/abs/2307.03172\" rel=\"nofollow\">arXiv:2307.03172</a>。",
  "post.sources.bench":
    "文件大小与 token 数的测量：gps-digest 测试程序，可复现，见<a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">开源代码</a>。",

  "post.end.title": "你的下一次训练，值得比通用图表更好的分析",
  "post.end.text":
    "把手表文件转换成 ChatGPT、Gemini 或 Claude 真正能分析的档案。免费，无需注册，文件不会离开你的浏览器。",
  "post.end.cta": "试用 gps-digest",
  "privacy.analytics.row": "访问统计",
  "privacy.analytics.rowText":
    "<strong>是，匿名。</strong>Cloudflare Web Analytics 只统计页面浏览量，不使用 cookie，也不使用持久标识符。不涉及你的文件或训练数据。",
  "privacy.analytics.active":
    "访问统计使用 Cloudflare Web Analytics：不使用 cookie，不使用持久标识符，也不包含任何来自你文件的数据。它统计页面浏览量、国家、访问来源和设备类型，从不追踪个人。",
  "privacy.verify.p1Analytics":
    "不要只听我们说。打开浏览器的开发者工具（<code>F12</code>），切换到<strong>“网络”</strong>标签页，然后上传一个文件。你会看到页面加载的请求、发往 <code>cloudflareinsights.com</code> 的访问统计请求，以及（如果启用了天气查询）一个发往 <code>open-meteo.com</code> 的请求。除此之外别无其他。没有任何请求包含你的文件内容。",
};
