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

  "home.title": "用 ChatGPT 或 DeepSeek 分析佳明和 Strava 跑步数据 — gps-digest",
  "home.description":
    "导出佳明、Strava 或 Apple Watch 的训练数据，交给 ChatGPT、DeepSeek 或 Claude 分析。免费，无需注册，所有计算都在浏览器中完成。",
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
  "home.step1.title": "导出训练数据",
  "home.step1.text": "从手表或 Strava 导出 FIT、TCX 或 GPX 文件。分步指南：<a href=\"{{href:guide-garmin.html}}\">佳明</a> · <a href=\"{{href:guide-strava.html}}\">Strava</a> · <a href=\"{{href:guide-apple.html}}\">Apple Watch</a>。",
  "home.step2.title": "拖到这里",
  "home.step2.text": "数量不限，ZIP 也可以。所有计算都在浏览器中完成：你的文件不会上传到任何地方。",
  "home.step3.title": "把档案粘贴给 AI",
  "home.step3.text": "ChatGPT、DeepSeek、Claude 或 Gemini 都可以，再提出你的问题。<a href=\"{{href:post-ia-coach.html}}\">该问什么？</a>",

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

  "home.set.title": "细化分析（可选）：最大心率、最近比赛成绩、天气",
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

  "home.files.title": "你的文件",
  "home.reads.title":
    "指南与文章",
  "home.files.drop": "把文件拖到这里",
  "home.files.formats": "TCX、GPX 或 FIT，数量不限，需要的话可以是整个赛季。佳明的 ZIP 和 Strava 的 .gz 文件可直接拖入。",
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
    "<strong>工具未能加载。</strong>请检查网络连接并刷新页面。在公司网络中，安全过滤器可能会拦截本站：请换一个网络再试。",
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
  "post.next":
    "想把这些问题变成每周持续的跟进？请看：<a href=\"{{href:post-ia-coach.html}}\">在 ChatGPT、Claude、Gemini 或 Vibe 中设置 AI 教练</a>。",

  "coach.title": "用 ChatGPT、Claude、Gemini 或 Vibe 当你的跑步教练",
  "coach.description":
    "运动员档案、可直接复制的教练规则、在 ChatGPT、Claude、Gemini 和 Vibe 中的设置方法，以及如何免费把训练数据交给它们。",
  "coach.kicker": "实用指南",
  "coach.h1": "把 ChatGPT、Claude、Gemini 或 Vibe 变成你的跑步教练",
  "coach.meta": "发布于 <time datetime=\"2026-09-29\">2026 年 9 月 29 日</time> · 阅读约 11 分钟",
  "coach.lede":
    "一位了解你的训练、你的目标和你那条容易出问题的小腿的教练，晚上 11 点也在线，而且不用多花一分钱：这就是 AI 助手的承诺。这个承诺能兑现，但有两个前提。你得一次性把情况交代清楚，否则每次训练它都把你当陌生人。你还得把训练数据交给它，而这远比听起来难。",
  "coach.tldr1":
    "AI 要当好教练，需要三样东西：你的个人档案、你真实的训练数据和明确的行为规则。缺了它们，它只会背一套通用计划。",
  "coach.tldr2":
    "最难的是把训练数据交给它。Strava 的官方连接器需要付费，而且只支持 Claude。导出文件免费、处处可用，但原始文件太大，必须先压缩。",
  "coach.tldr3":
    "ChatGPT、Claude 和 Vibe 有“项目”，Gemini 有 Gem：运动员档案和规则会在不同对话之间保留。它们都有免费版本。",
  "coach.tldr4":
    "行之有效的节奏：每周复盘一次，每次新开一个对话，附上训练数据和一句主观感受。同时要把握主导权：AI 往往会顺着你说。",

  "coach.can.title": "AI 真的能当你的教练吗？",
  "coach.can.p1":
    "能，教练的大部分工作它都能做：读懂你的训练，把它们和你的目标联系起来，并调整接下来的安排。不能，凡是需要亲眼看到你或亲手接触你的事它都做不了。界线很清楚，开始之前最好先了解。",
  "coach.can.goodIntro": "AI 擅长的事：",
  "coach.can.good1": "分析一次训练，并用数据说明它是否达到了目的；",
  "coach.can.good2": "在生活打乱计划时重新安排一周：出差、感冒、会议拖延；",
  "coach.can.good3": "解释每次训练背后的原因，很多现成计划从来不做这一点；",
  "coach.can.good4": "晚上 11 点也能回答，问到第十个问题也不会嫌烦。",
  "coach.can.badIntro": "它永远做不到的事：",
  "coach.can.bad1": "看你跑步，因此无法纠正你的步态或姿势；",
  "coach.can.bad2": "察觉你比自己说的更累；",
  "coach.can.bad3": "诊断疼痛。",
  "coach.can.p2":
    "把它看作一位随叫随到、却从没见过你跑步的教练。它对你的全部了解，就是你给它看的内容。这就引出了下面的部分。",

  "coach.need.title": "开始之前，AI 教练需要了解你什么？",
  "coach.need.p1": "三样东西。缺了任何一样，建议的质量都会大打折扣。",
  "coach.need.li1":
    "<strong>你的个人档案。</strong>你的水平、目标、限制条件和薄弱环节。没有它，AI 会把你当成一个“平均跑者”，而这样的人并不存在。",
  "coach.need.li2":
    "<strong>你真实的训练。</strong>不是你的记忆，而是你的数据。这是最难提供的一项，下面马上细说。",
  "coach.need.li3":
    "<strong>行为规则。</strong>怎么推理、拒绝什么、用什么形式回答。这正是教练和“建议自动售货机”的区别。",
  "coach.sheet.title": "运动员档案：填一次就够",
  "coach.sheet.intro":
    "复制这个模板，花五分钟填好，保存为文本文件。每次比赛后或目标改变时更新一下。",
  "coach.sheet.text":
    "运动员档案\n年龄、性别、跑龄：\n目前跑量（每周公里数和次数）：\n近 12 个月最好成绩（5 公里、10 公里、半马、全马）：\n最大心率和静息心率（如果知道）：\n目标（比赛、距离、日期、目标时间）：\n可训练时间（哪几天、单次最长时长）：\n既往伤病和薄弱部位：\n装备（手表、胸带或腕式心率）：\n训练中我喜欢和讨厌的内容：",

  "coach.data.title": "怎样把训练数据交给 AI 教练？",
  "coach.data.p1":
    "这是大多数指南略过不谈的一步，也是最难的一步。AI 看不到你的手表：你得把训练数据带给它。有两条路，代价并不一样。",
  "coach.data.strava.title": "Strava 连接器：方便，但要付费，且只支持 Claude",
  "coach.data.strava.p":
    "自 2026 年 6 月起，Strava 提供官方连接器（一个 MCP 服务器），让 Claude 直接读取你的训练历史。这很方便：不用再导出，AI 自己去取需要的数据。但你需要付费订阅 Strava，而且该连接器只支持 Claude。Strava 承诺以后支持其他助手，但没有给出时间。Strava 目前没有面向 ChatGPT、Gemini 或 Vibe 的官方连接器，非官方连接器则需要一定的技术配置。",
  "coach.data.garmin.title":
    "佳明的第三方服务：另一条路，但多了一个中间方",
  "coach.data.garmin.p":
    "在佳明这边，有第三方服务充当桥梁。佳明官方合作伙伴 Tredict 在 ChatGPT 中提供了一个应用，即使是免费 ChatGPT 账号也能用，另外还为 Claude 提供 MCP 服务器。Shape 也能做到，每月 5 美元，但需要付费版 ChatGPT。无论哪种方式，你都要在第三方开设账号，并把佳明数据交给它。如果你还想把训练课表发送到手表上，这很实用。若只是想分析跑步，导出文件仍然免费，而且不经过任何中间方。",
  "coach.data.export.title": "导出文件：免费又通用，前提是先压缩",
  "coach.data.export.p1":
    "Garmin Connect、高驰 COROS、Polar Flow 和 Strava 都可以免费把一次训练导出为 FIT、TCX 或 GPX 文件。这个文件适用于任何 AI，包括免费版。问题在于体积：一小时跑步的 TCX 文件约有 533,000 个 token，一次训练就足以耗尽免费版的额度（<a href=\"{{href:post-ia-analyse.html}}\">原因见此</a>）。",
  "coach.data.export.p2":
    "解决办法：在交给 AI 之前，先压缩并重新组织文件。gps-digest 会把每次训练整理成约 5,800 个 token 的档案，包含分段、心率区间、重复组、心率漂移和传感器可靠性。无论免费还是付费，任何助手都能完整读取。",
  "coach.data.colStrava": "Strava 连接器",
  "coach.data.colExport": "导出 + gps-digest",
  "coach.data.r1": "费用",
  "coach.data.r1strava": "需付费订阅 Strava",
  "coach.data.r1export": "免费",
  "coach.data.r2": "支持的助手",
  "coach.data.r2strava": "目前仅支持 Claude",
  "coach.data.r2export": "全部：ChatGPT、Claude、Gemini、Vibe 等",
  "coach.data.r3": "操作成本",
  "coach.data.r3strava": "连接后无需操作",
  "coach.data.r3export": "每周导出一次、拖放一次",
  "coach.data.r4": "AI 收到的内容",
  "coach.data.r4strava": "Strava 数据，摘要或逐秒数据",
  "coach.data.r4export": "已计算好的档案：心率区间、重复组、漂移、传感器可靠性",
  "coach.data.r5": "GPS 坐标",
  "coach.data.r5strava": "AI 可以读取",
  "coach.data.r5export": "默认移除",
  "coach.data.p3":
    "既订阅了 Strava 又在用 Claude？连接器每周能帮你省几分钟。其他人用免费导出就很好，只要在交给 AI 之前先压缩文件。",

  "coach.rules.title": "可直接复制的教练指令",
  "coach.rules.intro":
    "这段文字决定 AI 的行为方式。它刻意写得很短：每条规则都针对语言模型的一个已知毛病。",
  "coach.rules.text":
    "你是我的跑步教练。你负责分析我的训练，跟踪我朝目标的进展，并逐周调整我的训练。\n\n我的个人情况在运动员档案里。我的训练以 gps-digest 档案的形式提供。\n\n规则：\n1. 每个结论都要以档案中的具体数字为依据，并引用出来。\n2. 如果某项数据缺失或不可靠，直接说明，不要猜。\n3. 坦率直言。训练没练好或目标不现实，就明确告诉我。\n4. 从我的实际跑量出发，每次加量都要说明理由。\n5. 如果我提到持续、加重或改变步态的疼痛，请让我去看医疗专业人员，而不是给出训练计划。\n6. 如果缺少做决定所需的信息，就问我。\n7. 每次复盘最后给出最多三条具体行动。",
  "coach.rules.note":
    "第 1、2 条防止 AI 用看似合理的数字填补空白。第 3 条对抗它顺着你说的倾向。第 4 条遏制过于激进的计划。第 5 条提醒你：聊天机器人不是医生。",
  "coach.copy": "复制",
  "coach.copied": "已复制",

  "coach.setup.title": "如何在 ChatGPT、Claude、Gemini 或 Vibe 中设置你的教练？",
  "coach.setup.intro":
    "四个助手都有一个专用空间，让档案和规则在不同对话之间保留。不必每次都重新粘贴。",
  "coach.setup.colTool": "助手",
  "coach.setup.colWhere": "教练放在哪里",
  "coach.setup.colPlus": "对跑者的优势",
  "coach.setup.gpt.where": "项目：包含指令和文件",
  "coach.setup.gpt.plus": "语音模式，跑完回家路上就能口头复盘",
  "coach.setup.claude.where": "项目：包含指令和知识库",
  "coach.setup.claude.plus": "可以把一周计划单独生成一份文档，方便反复使用",
  "coach.setup.gemini.where": "Gem：包含指令和知识",
  "coach.setup.gemini.plus": "与 Google 云端硬盘和 Google 日历相连",
  "coach.setup.vibe.where": "项目：包含指令和文件",
  "coach.setup.vibe.plus": "欧洲厂商：总部位于巴黎的 Mistral AI",
  "coach.setup.gpt.title": "ChatGPT：创建一个项目",
  "coach.setup.gpt.text":
    "在侧边栏新建一个项目，比如“跑步教练”。把规则粘贴到<strong>项目指令</strong>中，把运动员档案添加到项目<strong>文件</strong>里。在这个项目中打开的每个对话都会带上这些背景。免费版限制每个项目的文件数量：把名额留给档案，训练档案直接粘贴到对话中。",
  "coach.setup.claude.title": "Claude：创建一个项目",
  "coach.setup.claude.text":
    "创建一个项目，把规则粘贴到项目<strong>指令</strong>中，把运动员档案上传到项目<strong>知识库</strong>。项目里的每个新对话都会同时带上两者。免费版限制项目数量和可用空间，但一份档案加每周一份训练档案绰绰有余。",
  "coach.setup.gemini.title": "Gemini：创建一个 Gem",
  "coach.setup.gemini.text":
    "打开 Gem 管理器，创建一个<strong>新 Gem</strong>。把规则粘贴到<strong>指令</strong>中，再从电脑或 Google 云端硬盘把运动员档案添加到<strong>知识</strong>里。Gem 免费使用，并会同步到手机应用。",
  "coach.setup.vibe.title": "Vibe：创建一个项目",
  "coach.setup.vibe.text":
    "自 2026 年 5 月起，Vibe 成为 Mistral AI 旗下 Le Chat 的新名字。创建一个<strong>新项目</strong>，打开项目的自定义设置粘贴规则，再把运动员档案添加到项目<strong>文件</strong>中。所有套餐都有项目功能，但有数量限制。",
  "coach.setup.fallback":
    "你的套餐没有专用空间，或者不想专门建一个？那就在每个新对话开头粘贴档案和规则。没那么方便，但效果一样好。",

  "coach.weekly.title": "让你进步的节奏：每周复盘一次",
  "coach.weekly.intro":
    "有用的教练会长期跟进你。最有效的做法是固定一个时间，比如周日晚上或周一早上，只需十分钟。",
  "coach.weekly.step1": "<strong>导出本周的训练</strong>，来自手表或 Strava，最好是 FIT 格式。",
  "coach.weekly.step2":
    "<strong>拖入 <a href=\"{{href:index.html}}\">gps-digest</a></strong>，然后复制档案。所有计算都在浏览器中完成。",
  "coach.weekly.step3": "<strong>在项目中新开一个对话</strong>，粘贴档案，再加一句你的主观感受。",
  "coach.weekly.step4": "<strong>提出复盘问题</strong>，在采纳建议的下周安排之前先和它讨论。",
  "coach.weekly.promptIntro": "复盘问题，原样复制即可：",
  "coach.weekly.prompt":
    "这是我本周的训练和主观感受。请复盘：\n1. 哪些方面做得好？请用数据说明。\n2. 哪些方面需要留意？\n3. 我的训练负荷和目标、比赛日期是否匹配？\n4. 请逐次安排下周训练，并说明每次训练的目的。\n\n我下周的限制条件：[请填写]",
  "coach.weekly.feel":
    "主观感受和数据同样重要。手表不知道你没睡好，也不知道你的小腿从周二开始就发紧。例如：“周六主观用力 8/10，两晚没睡好，右小腿从周二起发紧。”没有这句话，AI 只能凭手表评判你的一周。",
  "coach.weekly.fresh":
    "为什么每周都要新开对话？因为模型很难利用超长对话中间部分的信息（Liu et al., 2024）。在同一个对话里聊上几周，最初的指令就会被冲淡。项目负责保存档案和规则，训练档案负责提供事实。每个月给它一次最近四周的档案，让它判断趋势。",

  "coach.more.title": "另外四个好用的请求",
  "coach.more.intro": "除了每周复盘，下面这些请求能让设置得当的 AI 教练发挥最大作用：",
  "coach.more.q1": "“分析我的间歇跑：各组是否均匀、组间恢复如何，以及下次应该改进什么。”",
  "coach.more.q2":
    "“我的比赛在十天后。这是我最近六周的训练。我该以什么配速为目标？赛前减量怎么安排？”",
  "coach.more.q3": "“这周我只有三天能跑。保留最重要的训练，并告诉我放弃了什么。”",
  "coach.more.q4":
    "“以我目前的跑量为起点，制定一个十二周的半马计划，目标 1 小时 45 分。安排减量周，并说明加量的理由。”",

  "coach.traps.title": "AI 教练的五个陷阱，以及如何避开",
  "coach.traps.intro": "用错了的 AI 教练，出错时不会提醒你。下面是最常见的问题。",
  "coach.traps.li1":
    "<strong>它顺着你说。</strong>语言模型倾向于迎合对话者，这是一个有充分记录的偏差（Sharma et al., 2024）。与其问“这次训练好吗？”，不如问“这次训练哪里有问题？”。",
  "coach.traps.li2":
    "<strong>缺少数字时它会编造。</strong>没有数据，它就用看似合理的数值来填补，语气却始终笃定。所以才有第 1、2 条规则，以及一份完整的档案。",
  "coach.traps.li3":
    "<strong>你不说，它就不知道。</strong>你的睡眠、压力、工作忙不忙，手表里都没有。没有那句主观感受，它会以为你状态满分。",
  "coach.traps.li4":
    "<strong>它的计划有时过于激进。</strong>纸面上的计划不会让人累。要求它从你的实际跑量出发，并说明每次加量的理由。",
  "coach.traps.li5":
    "<strong>它不是医生。</strong>持续、加重或改变步态的疼痛，应该找医疗专业人员，而不是聊天机器人。",

  "coach.choose.title": "选哪个 AI 当跑步教练？",
  "coach.choose.p1":
    "选你已经在用的那个。ChatGPT、Claude、Gemini 和 Vibe 都能读懂结构化档案、遵守规则并给出合理的一周安排。区别在于你的使用习惯：Gemini 适合 Google 生态，ChatGPT 适合语音复盘，Claude 适合长文档并支持 Strava 连接器，Vibe 则是欧洲厂商。如果你在中国大陆，无法直接使用 ChatGPT、Claude 和 Gemini：DeepSeek、Kimi、豆包或通义千问同样能读懂 gps-digest 档案，把运动员档案和规则粘贴在对话开头即可。",
  "coach.choose.p2": "真正决定教练质量的不是模型，而是你给它读的内容。",

  "coach.faq.q1": "可以免费用 ChatGPT 当跑步教练吗？",
  "coach.faq.a1":
    "可以。ChatGPT、Claude 和 Vibe 的项目，以及 Gemini 的 Gem，在免费版中都能使用，只是文件和用量有限制。导出训练数据也是免费的。只需在粘贴前压缩，否则一次训练就可能耗尽免费版的额度。",
  "coach.faq.q2": "ChatGPT 能制定马拉松训练计划吗？",
  "coach.faq.a2":
    "能，而且只要它从你的真实水平出发，效果相当不错：目前跑量、近期成绩、可训练时间和比赛日期。一项研究对此做过测量：教练专家认为 ChatGPT 制定的计划并不理想，但在获得更多跑者信息后，计划质量明显提高（Düking et al., 2024）。让它说明加量的理由，然后每周根据真实训练调整计划，而不是盲目照做。",
  "coach.faq.q3": "能把 Strava 或 Garmin 直接连接到 AI 吗？",
  "coach.faq.a3":
    "自 2026 年 6 月起，Strava 提供官方连接器，但仅限付费订阅用户，且目前只支持 Claude。佳明方面，Tredict 或 Shape 等第三方服务可以充当桥梁，但需要在它们那里注册账号。除此之外，最简单的方式仍是导出文件，Garmin Connect 和 Strava 都支持：免费，适用于所有 AI，只要在粘贴前先压缩。",
  "coach.faq.q4": "我交给 AI 教练的数据会怎样？",
  "coach.faq.a4":
    "你粘贴到助手里的内容由其服务商按照自身条款处理。请在设置中查看聊天记录的保存方式，以及对话是否会被用于训练模型。gps-digest 生成的档案默认不包含 GPS 坐标。",
  "coach.faq.q5": "必须用英文和 AI 教练交流吗？",
  "coach.faq.a5":
    "不必。四个助手都能很好地用中文回答，gps-digest 也会按页面语言生成档案。从运动员档案到每周复盘，全程都可以用中文。",

  "coach.end.title": "好教练从好数据开始",
  "coach.end.text":
    "gps-digest 把你的手表文件转换成 ChatGPT、Claude、Gemini 或 Vibe 真正能分析的档案，免费版也能用。无需注册，文件不会离开你的浏览器。",

  "coach.sources.sharma":
    "Sharma M, et al. <em>Towards Understanding Sycophancy in Language Models.</em> ICLR 2024. <a href=\"https://arxiv.org/abs/2310.13548\" rel=\"nofollow\">arXiv:2310.13548</a>.",
  "coach.sources.duking":
    "Düking P, et al. <em>ChatGPT Generated Training Plans for Runners are not Rated Optimal by Coaching Experts, but Increase in Quality with Additional Input Information.</em> Journal of Sports Science and Medicine, 2024, 23(1), 56-72. <a href=\"https://www.jssm.org/jssm-23-56.xml%3EFulltext\" rel=\"nofollow\">jssm.org</a>.",

  "guide.kicker":
    "导出指南",
  "guide.formats.title":
    "FIT、TCX 还是 GPX：该导出哪种格式？",
  "guide.formats.colFormat":
    "格式",
  "guide.formats.colContent":
    "包含的内容",
  "guide.formats.colUse":
    "适用场景",
  "guide.formats.fit":
    "全部：心率、分圈、实际配对的心率传感器、气压计测得的爬升、泳池趟数",
  "guide.formats.fitUse":
    "首选",
  "guide.formats.tcx":
    "心率、分圈、步频；不含配对的传感器信息和气压计爬升",
  "guide.formats.tcxUse":
    "不错的替代",
  "guide.formats.gpx":
    "轨迹和时间，通常还有心率和步频；没有分圈",
  "guide.formats.gpxUse":
    "应急使用",
  "guide.why.title":
    "为什么不直接把文件粘贴到 ChatGPT？",
  "guide.why.p":
    "因为手表文件是给软件用的，不是给人读的。FIT 是二进制格式，而一小时跑步的 TCX 文件约有 533,000 个 token，一次训练就足以耗尽免费版的额度。即使文件能传进去，AI 面对成千上万行原始数据也很难推理好。<a href=\"{{href:post-ia-analyse.html}}\">完整解释见此</a>。",
  "guide.next.title":
    "下一步：让 AI 分析你的训练",
  "guide.next.s1":
    "<strong>把文件原样拖入 <a href=\"{{href:index.html}}\">gps-digest</a></strong>：FIT、TCX、GPX、ZIP 或 .gz 都可以。所有计算都在浏览器中完成。",
  "guide.next.s2":
    "<strong>复制生成的档案</strong>：每次训练只需几千个 token，而不是几十万个。",
  "guide.next.s3":
    "<strong>粘贴到 ChatGPT、DeepSeek、Claude 或 Gemini</strong>，再提出你的问题。想要每周持续跟进，请看我们的 <a href=\"{{href:post-ia-coach.html}}\">AI 教练指南</a>。",
  "guide.next.cta":
    "分析我的训练",
  "guide.more.title":
    "其他导出指南",
  "blog.guides":
    "导出指南",
  "guide.garmin.title":
    "导出佳明数据（FIT）给 ChatGPT 或 DeepSeek 分析：完整指南",
  "guide.garmin.description":
    "从 Garmin Connect 导出 FIT 格式的训练、获取全部历史记录，或通过 USB 从手表复制文件，再交给 ChatGPT 或 DeepSeek 分析。",
  "guide.garmin.h1":
    "导出佳明训练数据，交给 ChatGPT 或 DeepSeek 分析",
  "guide.garmin.meta":
    "发布于 <time datetime=\"2026-10-01\">2026 年 10 月 1 日</time> · 阅读约 4 分钟",
  "guide.garmin.lede":
    "Garmin Connect 能展示你的训练，却不会把数据交给 AI。你得先把文件导出来。下面是三种方法，从最快到最完整，以及导出之后该怎么做。",
  "guide.garmin.tldr1":
    "单次训练：在 connect.garmin.com 网站上点击活动的齿轮图标，导出原始文件。你会得到一个包含 FIT 文件的 ZIP。",
  "guide.garmin.tldr2":
    "Garmin Connect 手机应用不能导出文件：请用电脑，或通过 USB 连接手表。",
  "guide.garmin.tldr3":
    "原始 FIT 文件 AI 读不懂。把 ZIP 原样拖入 gps-digest，再把生成的档案粘贴给 AI。",
  "guide.garmin.m1.title":
    "从 Garmin Connect 导出单次训练",
  "guide.garmin.m1.intro":
    "这是日常最常用的方法，需要在电脑上通过网站完成。",
  "guide.garmin.m1.s1":
    "登录 <strong>connect.garmin.com</strong>（中国大陆账号请使用 connect.garmin.cn）。",
  "guide.garmin.m1.s2":
    "打开左侧菜单中的<strong>活动</strong>，再打开要导出的训练。",
  "guide.garmin.m1.s3":
    "点击活动右上角的<strong>齿轮图标</strong>。",
  "guide.garmin.m1.s4":
    "选择导出<strong>原始文件</strong>的选项，名称因网站版本而异。也可以导出 TCX 或 GPX，但原始 FIT 文件信息最完整。",
  "guide.garmin.m1.s5":
    "下载得到的是一个包含 FIT 文件的 <strong>ZIP</strong>。无需解压：gps-digest 可以直接打开。",
  "guide.garmin.m1.note":
    "有多次训练？逐一导出，然后把所有 ZIP 一次性拖入。",
  "guide.garmin.m2.title":
    "无需联网：通过 USB 从手表复制文件",
  "guide.garmin.m2.p":
    "用数据线把手表连接到电脑，它会显示为名为 GARMIN 的磁盘或设备。训练记录在 <code>GARMIN/Activity</code> 文件夹中，每次活动一个 FIT 文件。复制最近的文件，拖入 gps-digest 即可。在 Mac 上，较新的手表不会显示为磁盘，需要使用 MTP 文件传输工具。",
  "guide.garmin.m3.title":
    "全部历史记录：导出整个账户",
  "guide.garmin.m3.p":
    "想获取多年的训练记录，请登录佳明账户，在数据管理部分申请导出你的数据。佳明会通过电子邮件发送一个链接，指向整个账户的 ZIP 压缩包，通常需要几天时间。FIT 文件放在嵌套的 ZIP 里。gps-digest 能找到它们，但压缩包往往有几百 MB：请先解压，只拖入最近几周的训练。",
  "guide.garmin.faq.q1":
    "可以用 Garmin Connect 手机应用导出训练吗？",
  "guide.garmin.faq.a1":
    "不可以，手机应用不提供文件导出。请在电脑上使用 connect.garmin.com 网站，或通过 USB 从手表复制文件。",
  "guide.garmin.faq.q2":
    "为什么 ChatGPT 读不了我的佳明 FIT 文件？",
  "guide.garmin.faq.a2":
    "FIT 是二进制格式：ChatGPT 需要写脚本来解码，而且常常只用到其中一部分。即使转换成文本，一小时跑步也有几十万个 token。gps-digest 在浏览器中解码文件，并生成每次训练约 5,800 个 token 的档案。",
  "guide.garmin.faq.q3":
    "导出数据需要订阅 Garmin Connect+ 吗？",
  "guide.garmin.faq.a3":
    "不需要。导出单次训练和导出整个账户都是免费的。",
  "guide.strava.title":
    "导出 Strava 活动（GPX、FIT）给 ChatGPT 或 DeepSeek 分析：完整指南",
  "guide.strava.description":
    "把 Strava 活动导出为 GPX 或原始格式，下载全部存档，再交给 ChatGPT、DeepSeek 或 Claude 分析。完全免费。",
  "guide.strava.h1":
    "导出 Strava 活动，交给 ChatGPT 或 DeepSeek 分析",
  "guide.strava.meta":
    "发布于 <time datetime=\"2026-10-01\">2026 年 10 月 1 日</time> · 阅读约 4 分钟",
  "guide.strava.lede":
    "Strava 保存了你的跑步记录，却不会把它们交给 AI，除非使用只支持 Claude 的付费连接器。好消息是：只要通过网站，导出就是免费的。下面介绍具体方法，以及导出后该怎么做。",
  "guide.strava.tldr1":
    "单个活动：在 strava.com 上打开活动的“…”菜单，导出原始文件或导出 GPX。",
  "guide.strava.tldr2":
    "Strava 手机应用不能导出：需要在电脑上使用网站。",
  "guide.strava.tldr3":
    "原始文件对 AI 来说太大。把它拖入 gps-digest，即使是 .gz 压缩文件也可以，再把档案粘贴给 AI。",
  "guide.strava.m1.title":
    "在 strava.com 导出单个活动",
  "guide.strava.m1.intro":
    "只能在 Strava 网站上导出。导出你自己的活动是免费的。",
  "guide.strava.m1.s1":
    "在电脑上登录 <strong>strava.com</strong>，打开该活动。",
  "guide.strava.m1.s2":
    "点击活动左侧的<strong>“…”</strong>（更多操作）按钮。",
  "guide.strava.m1.s3":
    "如果活动来自手表，选择<strong>导出原始文件</strong>：你会得到手表的 FIT 文件，信息最完整。",
  "guide.strava.m1.s4":
    "否则选择<strong>导出 GPX</strong>。它包含轨迹、时间，以及记录过的心率、步频和温度。",
  "guide.strava.m1.s5":
    "把下载的文件拖入 gps-digest。",
  "guide.strava.m1.note":
    "如果活动是用手机上的 Strava 应用记录的，导出 GPX 就完全够用。",
  "guide.strava.m2.title":
    "全部历史记录：账户存档",
  "guide.strava.m2.p":
    "在 Strava 账户设置的“我的账户”标签页中，申请下载你的账户。Strava 会通过电子邮件发送存档链接，通常几小时内就到。训练记录在 <code>activities</code> 文件夹中，常常压缩为 <code>.gz</code>：直接拖入 gps-digest 即可。<code>activities.csv</code> 文件列出了每个活动编号的日期，方便只挑选最近几周。",
  "guide.strava.m3.title":
    "注意：Strava 的配速和佳明不一样",
  "guide.strava.m3.p":
    "Strava 按移动时间计算配速，Garmin Connect 按总时长计算。在城市里跑步、遇到红绿灯停下时，两者的差距很容易超过每公里 15 秒。gps-digest 会在档案中注明所用的计算方式，避免 AI 拿不可比的数字做比较。",
  "guide.strava.faq.q1":
    "可以用 Strava 应用导出活动吗？",
  "guide.strava.faq.a1":
    "不可以。只能在电脑上通过 strava.com 网站导出。",
  "guide.strava.faq.q2":
    "导出活动需要订阅 Strava 吗？",
  "guide.strava.faq.a2":
    "不需要，导出你自己的活动是免费的。只有连接 Strava 和 Claude 的官方连接器才需要订阅。",
  "guide.strava.faq.q3":
    "导出 GPX 还是原始文件：该选哪个？",
  "guide.strava.faq.a3":
    "如果活动来自手表，选原始文件：通常是信息更完整的 FIT（分圈、配对的传感器、气压计爬升）。否则选 GPX：它保留轨迹，大多数情况下也包含心率。",
  "guide.strava.source":
    "Strava 帮助中心，<em>Exporting your Data and Bulk Export</em>。<a href=\"https://support.strava.com/en-us/articles/15401919-exporting-your-data-and-bulk-export\" rel=\"nofollow\">support.strava.com</a>。",
  "guide.apple.title":
    "导出 Apple Watch 训练（GPX、FIT）给 ChatGPT 或 DeepSeek 分析",
  "guide.apple.description":
    "Apple 不提供训练的直接导出。三种方法把 Apple Watch 训练导出为 FIT 或 GPX，再交给 ChatGPT 或 DeepSeek 分析。",
  "guide.apple.h1":
    "导出 Apple Watch 训练，交给 ChatGPT 或 DeepSeek 分析",
  "guide.apple.meta":
    "发布于 <time datetime=\"2026-10-01\">2026 年 10 月 1 日</time> · 阅读约 4 分钟",
  "guide.apple.lede":
    "你用 Apple Watch 跑步的记录保存在 iPhone 的“健康”应用里，而 Apple 没有提供任何按钮来导出 GPX 或 FIT 文件。不过，仍然有三种方法可以把它们取出来。",
  "guide.apple.tldr1":
    "最简单：使用能读取“健康”数据并导出 FIT 或 GPX 的应用，例如 HealthFit 或 WorkoutGPX。",
  "guide.apple.tldr2":
    "不花钱：把训练同步到 Strava，再从 strava.com 导出。",
  "guide.apple.tldr3":
    "你可以直接在 iPhone 的 Safari 中打开 gps-digest，把导出的文件放进去。",
  "guide.apple.m1.title":
    "使用导出应用：最完整",
  "guide.apple.m1.intro":
    "有些应用可以读取“健康”中的训练，并导出为标准格式，包含心率。HealthFit 支持 FIT、GPX 或 TCX；WorkoutGPX 支持 GPX。免费版能做什么，请在 App Store 中确认。",
  "guide.apple.m1.s1":
    "安装应用，允许它读取“健康”中的<strong>体能训练</strong>、<strong>路线</strong>和<strong>心率</strong>。",
  "guide.apple.m1.s2":
    "选择要导出的训练。",
  "guide.apple.m1.s3":
    "如果应用支持，导出为 <strong>FIT</strong>，否则导出为 GPX。",
  "guide.apple.m1.s4":
    "把文件存到<strong>文件</strong>应用中，或通过隔空投送发到电脑。",
  "guide.apple.m1.s5":
    "在 iPhone 或电脑的 Safari 中打开 gps-digest，拖入文件。",
  "guide.apple.m1.note":
    "FIT 比 GPX 更好：它保留分圈和传感器数据。",
  "guide.apple.m2.title":
    "不花钱：通过 Strava",
  "guide.apple.m2.p":
    "如果你使用 Strava，可以在 Strava 应用的设置中允许它读取“健康”中的训练。之后你的 Apple Watch 训练会自动同步过去。剩下的就是从 strava.com 导出，具体方法见我们的 <a href=\"{{href:guide-strava.html}}\">Strava 指南</a>。",
  "guide.apple.m3.title":
    "使用“健康”的原生导出：仅供好奇者",
  "guide.apple.m3.p":
    "在“健康”应用中轻点你的头像，再选择“导出所有健康数据”。你会得到一个 ZIP 压缩包，其中 <code>workout-routes</code> 文件夹里是 GPX 格式的路线。这些路线只有位置、海拔和时间：心率存放在另一个巨大的 XML 文件中。压缩包往往有几百 MB。要分析训练，前两种方法要好得多。",
  "guide.apple.faq.q1":
    "不用应用，能把 Apple Watch 跑步导出为 GPX 吗？",
  "guide.apple.faq.a1":
    "只能通过“健康”的完整导出，但得到的路线不含心率。想要完整文件，需要导出应用，或者经由 Strava。",
  "guide.apple.faq.q2":
    "gps-digest 能在 iPhone 上使用吗？",
  "guide.apple.faq.a2":
    "可以。在 Safari 中打开页面，轻点选择文件的按钮，然后在“文件”应用中选取文件。分析在手机上完成，不会向任何服务器发送数据。",
  "guide.apple.faq.q3":
    "Apple Watch 训练应该选择哪种格式？",
  "guide.apple.faq.a3":
    "如果导出应用支持，选 FIT：它保留分圈和传感器数据。GPX 也可以，只要包含心率，导出应用会包含，而“健康”的原生导出不会。",
  "coach.sources.strava":
    "Strava，<em>Strava Launches MCP Connector, Allowing Athletes to Sync Training History to Claude</em>，2026 年 6 月 1 日新闻稿。<a href=\"https://press.strava.com/articles/strava-launches-mcp-connector\" rel=\"nofollow\">press.strava.com</a>。",
  "coach.sources.docs":
    "官方文档：<a href=\"https://help.openai.com/en/articles/10169521-projects-in-chatgpt\" rel=\"nofollow\">ChatGPT 项目</a>、<a href=\"https://support.claude.com/en/articles/9517075-what-are-projects\" rel=\"nofollow\">Claude 项目</a>、<a href=\"https://support.google.com/gemini/answer/15146780\" rel=\"nofollow\">Gemini Gem</a>、<a href=\"https://docs.mistral.ai/vibe/work/projects\" rel=\"nofollow\">Vibe 项目</a>。",
  "privacy.analytics.row": "访问统计",
  "privacy.analytics.rowText":
    "<strong>是，匿名。</strong>Cloudflare Web Analytics 只统计页面浏览量，不使用 cookie，也不使用持久标识符。不涉及你的文件或训练数据。",
  "privacy.analytics.active":
    "访问统计使用 Cloudflare Web Analytics：不使用 cookie，不使用持久标识符，也不包含任何来自你文件的数据。它统计页面浏览量、国家、访问来源和设备类型，从不追踪个人。",
  "privacy.verify.p1Analytics":
    "不要只听我们说。打开浏览器的开发者工具（<code>F12</code>），切换到<strong>“网络”</strong>标签页，然后上传一个文件。你会看到页面加载的请求、发往 <code>cloudflareinsights.com</code> 的访问统计请求，以及（如果启用了天气查询）一个发往 <code>open-meteo.com</code> 的请求。除此之外别无其他。没有任何请求包含你的文件内容。",
};
