/**
 * Catalogue chinois (simplifié). Les clés et les paramètres suivent le
 * français (i18n.ts), qui fait référence.
 *
 * Typographie : ponctuation pleine chasse （，。：；（）“”）, chiffres et
 * unités SI en caractères latins, « % » et « °C » collés au nombre, espace
 * entre un sinogramme et un mot latin ou un nombre. Les unités qui figurent
 * aussi dans les colonnes du dossier (s, m, bpm, W) restent en latin pour que
 * le texte et les tableaux parlent la même langue.
 *
 * La semaine est notée « W » (notation ISO) : le graphique de charge n'en
 * affiche que les trois derniers caractères.
 */

import type { Catalog } from "./i18n.ts";

export const zh: Partial<Catalog> = {
  "unit.percent": "%",

  "digest.errFormat": "无法识别“{filename}”的格式。支持的格式：TCX、GPX、FIT。",
  "digest.errNoTime":
    "“{filename}”没有时间戳：这是规划的路线，不是记录下来的训练。",
  "digest.errNoPoints": "文件中没有可用的数据点。",
  "digest.warnZonesObserved":
    "心率区间基于文件中观测到的最大心率计算，而非运动员档案：请谨慎解读。",
  "digest.warnNoFtp": "FTP 未知：未计算 IF 和 TSS。",
  "digest.warnCoords": "起点和终点坐标未裁剪：轨迹可能暴露住址。",
  "digest.warnHrSource":
    "估计的心率来源：{label}（置信度 {confidence}）。只在同一来源的训练之间比较心率数值。",
  "digest.warnDrift": "未计算心率漂移：{reason}",

  "sensor.label.chest_strap": "胸带",
  "sensor.label.optical": "手腕光学传感器",
  "sensor.label.unknown": "未确定",
  "sensor.lockRange": "心率锁定在步频上",
  "sensor.device.name":
    "文件中声明的设备",
  "sensor.device.note":
    "来源读取自 FIT 的 device_info 消息。",
  "sensor.startDrop.name":
    "开头异常",
  "sensor.startDrop.note":
    "心率在约 {min} 分钟时下降 {bpm} bpm，而配速未变：传感器重新校准（手腕冰冷、胸带干燥）。训练开头部分不计入心率计算。",
  "sensor.startDrop.reason":
    "开头心率异常（配速未变而下降 {bpm} bpm）",
  "sensor.swim.name": "检测不适用",
  "sensor.swim.note":
    "游泳时，心率数据先被缓存，出水后才导出：信号形态无法说明传感器类型。上传 FIT 文件则可以直接读取已配对的设备。",
  "sensor.lock.name": "步频锁定",
  "sensor.lock.found": "心率在训练的相当一部分时间里跟随步频：这是手腕传感器的典型伪影。",
  "sensor.lock.none": "未检测到心率与步频混淆。",
  "sensor.plateau.name": "最长平台",
  "sensor.plateau.long": "心率长时间完全不变：光学平滑的典型特征。",
  "sensor.plateau.normal": "没有异常长的平台。",
  "sensor.plateauTime.name": "平台时间占比",
  "sensor.plateauTime.note": "心率连续 5 秒以上不变的时间占比。",
  "sensor.step.name": "平均变化",
  "sensor.step.note": "{pct}% 的间隔完全没有变化。",
  "sensor.lag.name": "响应延迟",
  "sensor.lag.slow": "心率对配速变化的反应明显滞后。",
  "sensor.lag.fast": "对配速变化反应迅速。",
  "sensor.spike.name": "起步尖峰",
  "sensor.spike.note": "开始时心率异常，随后骤降：电极干燥，是胸带的典型现象。",
  "sensor.calibration.name": "校准",
  "sensor.calibration.note":
    "阈值基于跑步数据设定：骑行时信号不够明显，判定常常无法确定。FIT 文件会给出已配对的设备，从而消除疑问。",

  "drift.wristCaveat": "手表传感器受手腕体温加热：读数通常偏高 3 到 8°C。这不是气温。",
  "drift.basisPowerIgnored":
    "存在功率数据但已忽略：非骑行运动的功率由手表估算，不是可靠的基准。解耦按速度计算。",
  "drift.noWindowPower":
    "本次训练中没有至少 10 分钟功率平稳的片段。功率与心率之比只能在恒定强度下比较；建议逐次分析各重复。",
  "drift.noWindowSpeed":
    "本次训练中没有至少 10 分钟配速平稳的片段。心率漂移只能在持续强度下测量；建议逐次分析各重复。",
  "drift.sparseHr": "找到了平稳窗口，但其中可用的心率数据太少。",
  "drift.halvesInsufficient": "数据不足，无法比较窗口的前后两半。",
  "drift.workDrop.power":
    "窗口前后两半之间强度下降 {drop}%（功率 {from} → {to}）：效率下降是因为强度下降，而不是心率漂移。无法计算漂移。",
  "drift.workDrop.speed":
    "窗口前后两半之间强度下降 {drop}%（速度 {from} → {to}）：效率下降是因为强度下降，而不是心率漂移。无法计算漂移。",
  "drift.qualityNote.shortEasy":
    "窗口较短，且位于训练中强度最低的部分，很可能是热身或放松。数值准确，但不代表主要训练内容；建议查看重复分析。",
  "drift.qualityNote.easy":
    "唯一找到的平稳片段是训练中强度最低的部分。这里的漂移天然偏低，对主要训练内容的参考意义不大。",
  "drift.qualityNote.short":
    "窗口长 {min} 分钟，覆盖训练的 {pct}%：测量有效，但对整体的代表性不足。",
  "drift.interp.negative":
    "负解耦：后半段效率提升。常见于窗口开始时热身尚未充分，或有意逐步加速。",
  "drift.interp.low": "漂移很小：强度明显低于有氧阈值。",
  "drift.interp.normal": "漂移在正常范围内（≤ 5%）。有氧耐力足以支撑该配速持续这么长时间。",
  "drift.interp.markedHot":
    "漂移明显（> 5%），但气温为 {temp}°C：在这个温度下，5% 到 6% 的解耦是正常的高温代价，并非状态不佳。",
  "drift.interp.marked":
    "漂移明显（> 5%）。配速相对时长过高，或基础耐力是限制因素。脱水和残余疲劳也会产生同样的效果。",
  "drift.interp.highHot":
    "漂移很大（> 10%），气温 {temp}°C：高温能解释一部分，但不是全部。请检查补水和恢复状态。",
  "drift.interp.high": "漂移很大（> 10%）。在此条件下无法以该配速维持这么长时间。",
  "drift.quality.solide": "可靠",
  "drift.quality.indicatif": "仅供参考",

  "adh.tooFew": "识别出的重复少于两次：无可比较。",
  "adh.veryRegular.pace": "各次重复之间配速非常稳定（变异 {cv}%）。",
  "adh.veryRegular.power": "各次重复之间功率非常稳定（变异 {cv}%）。",
  "adh.regularOk": "稳定性尚可（变异 {cv}%）。",
  "adh.irregular.pace": "各次重复配速不均（变异 {cv}%）：需要改进节奏控制，或课表设置不当。",
  "adh.irregular.power": "各次重复功率不均（变异 {cv}%）：需要改进节奏控制，或课表设置不当。",
  "adh.fade.pace":
    "第一次到最后一次重复之间配速下降 {pct}%：起步过快，或训练量超出当前水平。",
  "adh.fade.power":
    "第一次到最后一次重复之间功率下降 {pct}%：起步过快，或训练量超出当前水平。",
  "adh.build": "整组过程中提升 {pct}%：有意识的渐进加速，说明仍有余力。",
  "adh.held.pace": "整组从头到尾保持住了配速。",
  "adh.held.power": "整组从头到尾保持住了功率。",
  "adh.restLonger": "恢复时间越来越长（每次重复 +{s} 秒）：训练在组末开始失控。",
  "adh.restShorter": "恢复时间越来越短（每次重复 {s} 秒）。",
  "adh.hrRiseStable":
    "配速保持住了，但整组心率上升 {bpm} bpm：同等强度下心脏负担递增，是疲劳累积的特征。",
  "adh.hrRiseStable.power":
    "功率保持住了，但整组心率上升 {bpm} bpm：同等强度下心脏负担递增，是疲劳累积的特征。",
  "adh.hrRise": "整组心率上升 {bpm} bpm。",
  "adh.hrrGood": "心率恢复很好：每次重复后 60 秒内下降 {bpm} bpm。",
  "adh.hrrOk": "心率恢复尚可：60 秒内下降 {bpm} bpm。",
  "adh.hrrSlow":
    "恢复较慢：60 秒内仅下降 {bpm} bpm。可能是残余疲劳、高温，或恢复时间对该课表而言太短。",
  "adh.hrrErode":
    "心率恢复每次重复减少 {bpm} bpm：这组训练消耗储备的速度比配速所显示的更快。",
  "adh.missingReps": "计划 {planned} 次重复，完成 {done} 次。",
  "adh.targetMet.pace": "达到目标配速。",
  "adh.targetMet.power": "达到目标功率。",
  "adh.belowTarget": "该组完成情况比目标低 {pct}%。",
  "adh.aboveTarget":
    "该组完成情况比目标高 {pct}%：间歇训练的收益来自执行课表要求，而不是超额完成。",
  "adh.grade.conforme": "达标",
  "adh.grade.acceptable": "可接受",
  "adh.grade.dégradé": "未达标",
  "adh.grade.non évaluable": "无法评估",

  "cls.pool": "无 GPS 位置、无步频，速度 {speed} m/s：泳池游泳。",
  "cls.openWater":
    "GPS 位置时断时续（覆盖率 {pct}%，掉线 {flips} 次），速度 {speed} m/s 且无步频：公开水域游泳。此时 GPS 距离偏高，因为每次手臂出水时信号都会重新连接。",
  "cls.static": "{min} 分钟内仅移动 {dist} 米：位移太小，不属于耐力运动。",
  "cls.crossTraining":
    "标记为跑步，但 {stopPct}% 的时间处于静止，每分钟仅移动 {mpm} 米：间断性运动，很可能是力量训练或交叉训练。计入负荷，不做跑步分析。",
  "cls.hiking": "徒步：计入负荷，不做配速分析和成绩预测。",
  "cls.unknownSport": "该运动未被识别为耐力运动：仅计入负荷。",
  "erg.evidence":
    "{total} 个区块中有 {pinned} 个功率被锁定：ERG 模式训练。此时距离和速度是虚拟的，没有测量意义。",
  "erg.warning":
    "{n} 个区块中踏频下降（最多下降 {max} rpm）。在 ERG 模式下，踏频下降会使阻力增加，进而使踏频进一步下降：这种恶性循环最终会导致停踏。应对方法是踏频一开始下降就主动提起来，或在最后几次重复中关闭 ERG。",

  "zone.1": "Z1 恢复",
  "zone.2": "Z2 耐力",
  "zone.3": "Z3 节奏",
  "zone.4": "Z4 阈值",
  "zone.5": "Z5 最大摄氧量",
  "zone.6": "Z6 无氧",
  "zone.7": "Z7 神经肌肉",
  "set.rest": "，恢复 {s} s",
  "set.power": "（{w} W）",

  "swim.set": "{reps} × {dist} m，配速 {pace}/100m",
  "swim.setRest": "，恢复 {s} s",
  "swim.lapDistance": "距离由圈数据重建：数据点流中不含距离，这在泳池中是正常的。",
  "swim.hr":
    "游泳时的心率：光学传感器在水下无法读数，胸带在水中也无法传输，而是先记录、出水后再导出。数值仅供参考，时间戳也不精确。本次训练不计算心率漂移。",
  "swim.noLaps": "没有可用的圈数据：该训练未按趟划分。只能使用总距离和总时长。",
  "swim.lowDensity":
    "在 {elapsed} 分钟中实际游泳仅 {swim} 分钟：训练非常零碎，或更像是戏水而非训练。请据此解读。",
  "swim.openWater":
    "公开水域游泳：距离来自 GPS，每次手臂入水都会掉线，之后再重新连接。距离通常偏高 5% 到 15%，瞬时配速不可用，只有平均值可用。",
  "swim.noStrokes":
    "文件中没有划水次数：无法计算衡量游泳效率的 SWOLF。并非所有手表都会记录该数据。",
  "swim.noPoolLength": "无法从数据推断泳池长度：距离直接采用手表记录的数值。",

  "race.400": "400米",
  "race.800": "800米",
  "race.1000": "1000米",
  "race.1609.344": "1英里",
  "race.3000": "3000米",
  "race.5000": "5公里",
  "race.10000": "10公里",
  "race.15000": "15公里",
  "race.20000": "20公里",
  "race.21097.5": "半程马拉松",
  "race.42195": "全程马拉松",
  "proj.method.race": "基于{ref}比赛成绩的 Riegel 公式（k={k}）",
  "proj.method.raceAge": "，成绩距今 {months} 个月",
  "proj.method.training": "基于训练中{ref}成绩的 Riegel 公式",
  "proj.method.cs": "临界速度（CS {pace}/km，R²={r2}）",
  "dossier.setSource.workout":
    "{set}：手表上预设的课程，结构和目标读取自文件。",
  "dossier.setSource.laps":
    "{set}：结构读取自分段（每段一个步骤）。",
  "dossier.setSource.auto":
    "{set}：根据信号识别，文件中没有预设课程。不评估完成度。",
  "proj.method.achievedRace":
    "比赛成绩（{date}）：以真实成绩为准，而非模型",
  "proj.method.achievedTraining":
    "训练中跑出的成绩（{date}）：以真实成绩为准，而非模型",
  "proj.caveat.gap":
    "仅凭模型得出 {model}，与真实成绩（{date}）相差 {pct}%：已降低可信度。",
  "proj.dateUnknown":
    "日期未知",
  "dossier.projNote":
    "临界速度与成绩预测：仅使用最近 {days} 天（自 {from} 起）的跑步成绩。achieved = 该时段内该距离的最佳真实成绩，model_gap_pct = 模型与该成绩的偏差（正值：模型更慢）。偏差超过 3% 时降低可信度。",
  "proj.caveat.marathon":
    "根据训练数据预测马拉松成绩，前提是完整完成了专项备赛：长距离跑、目标配速训练、补给策略。这是所有预测中最不可靠的一项。",
  "proj.caveat.half": "前提是进行了专项备赛，并能稳定保持配速。",
  "proj.confidence.haute": "高",
  "proj.confidence.moyenne": "中",
  "proj.confidence.faible": "低",

  "prog.tooFew": "可用的跑步训练少于三次：跟踪进步需要更多数据点。",
  "prog.multiSource":
    "该批数据中有多种心率来源：曲线按传感器分别建立。相互比较没有意义。",
  "prog.shortSpan": "时间段太短，无法区分进步与日常波动。",
  "prog.improving": "明显进步：在 {pace}/km 配速下，心率每周约降低 {bpm} bpm。",
  "prog.worsening":
    "在 {pace}/km 配速下心脏负担上升。应首先排除高温、疲劳累积或训练负荷过密等原因。",
  "prog.stable": "稳定：该时间段内心脏负担没有可测量的变化。",
  "prog.none":
    "没有任何参考配速在至少三次可比训练中保持足够长的时间。以恒定配速、固定时长进行轻松跑，就能实现这项跟踪。",
  "prog.tempSpread":
    "该批训练的温度跨度为 {spread}°C。相同配速下，高温会多消耗 5 到 10 bpm：观察到的趋势可能部分只是季节因素。",

  "batch.week": "{year}-W{week}",
  "batch.duplicateOf": "{file}（与 {first} 相同）",
  "batch.warnDuplicates": "已剔除 {n} 个重复文件（开始时间和距离均相同）：{list}。",
  "batch.warnRecordsGap":
    "{n} 个文件的数据点在训练声明的结束时间之前就中断了（{list}）：记录的结尾缺失。总计来自手表的汇总，但表格和结尾阶段的心率可能不完整。",
  "batch.warnReclassified":
    "{n} 次训练已重新分类：文件中声明的运动类型与数据形态不符（{list}）。",
  "batch.warnLoadOnly":
    "{n} 次非耐力训练计入了训练量，但不参与配速、漂移和成绩预测分析。",
  "batch.warnHrSources":
    "各次训练的心率来源不同：{strap} 次使用胸带，{optical} 次为腕部，{unknown} 次无法确定。心率只能在同一来源的训练之间比较（训练表中的 hr_source 列）：区间、漂移和趋势需按来源分别解读。",
  "batch.warnCadenceLock":
    "{n} 个文件存在心率锁定步频的现象：其中的心率数值部分错误，相应的漂移结果不可用。",
  "batch.warnDriftPartial":
    "{total} 次训练中有 {ok} 次计算了心率漂移：其余训练太短或太不规律，计算没有意义。",
  "batch.warnCsFit":
    "临界速度模型拟合一般（R² = {r2}）：预测仅供参考。专门做一次测试（在体力充沛时全力跑 3 分钟和 12 分钟）可以得到可靠得多的模型。",
  "batch.warnNoRace":
    "未提供比赛成绩。预测仅基于训练中的表现，通常会高估比赛成绩。填写一个真实比赛成绩能明显改善校准。",
  "batch.racesFound":
    "在文件中识别出的比赛：{list}。它们用于校准成绩预测。请核对列表：周末以全力跑完标准距离的训练也可能被当作比赛。",
  "race.noteMultisport":
    "多项运动赛事中的一段，不是单独的跑步比赛",
  "race.noteNonStandard":
    "非标准距离",
  "race.noteMeasured":
    "实测路线 {km} km，与官方 {official} 相差太大，不用于校准预测",
  "dossier.racesNote":
    "识别出的比赛。detected_by：user（运动员勾选）、strava（在 Strava 标记为比赛）、name（活动名称）、auto（推测：标准距离、持续用力、心率高或配速快、周末）。time = 训练的总用时。used = 用于校准预测。",
  "batch.warnMaxHr":
    "观测到的最大心率（{observed} bpm）高于设定值（{maxHr} bpm）。在更正此设置之前，所有区间都会发生偏移。",
  "batch.bundle.title": "gps-digest v1 — 多次训练汇总",
  "batch.bundle.range": "{n} 次训练，{from} 至 {to}",
  "batch.bundle.volume": "总训练量：{km} km，运动时间 {dur}",
  "batch.bundle.note":
    "只有当 hr_source 列相同时，不同训练之间的心率数值\n才可以比较。得出任何结论前请先阅读警告。",
  "common.refMaxHr": "参考最大心率：{hr} bpm",

  "bundle.title": "gps-digest v1 — 供 LLM 分析的精简活动摘要",
  "bundle.source": "来源：{format} | 原始点 {raw} 个 -> 保留 {kept} 个",
  "bundle.glossary": [
    "t_s = 从起点开始的秒数 | dist_m = 累计距离（m）",
    "pace_s_km = 配速（秒/公里）| gap_s_km = 坡度调整配速（Minetti 2002）",
    "hr_bpm = 心率 | cad_spm = 步频或踏频（步/分钟或 rpm）| pw_w = 功率（W）",
    "decoupling_pct = 前后半程之间的有氧漂移；> 5% = 耐力是限制因素",
    "hr_source = 估计的心率传感器；切勿比较不同来源的心率",
    "drift_applicable = no 表示该训练不适合此计算，而不是其值为零",
  ].join("\n"),
  "bundle.tempWrist": "手表传感器（读数偏高 3 到 8°C，不是气温）",
  "bundle.tempExternal": "外部",

  "dossier.guide": `# ─────────────────────────────────────────────────────────────────────
# 如何阅读本档案
#
# 结构：先是跨训练的汇总表（所有训练合并），然后是每次训练的明细，
# 每次训练以“═══ 训练 n ═══”开头。
# 每个数据块以“## 块名”开头，内容为带表头的 CSV。
#
# 单位：米、秒、bpm、瓦、摄氏度。小数点 = 英文句点。
# 列分隔符 = 英文逗号。
#
# 主要列
#   t_s          从训练开始经过的秒数
#   dist_m       从起点开始的累计距离，单位米
#   speed        按运动类型显示配速或速度：跑步为 min/km，骑行为 km/h，
#                游泳为 min/100m。切勿相互换算。
#   pace_s_km    以每公里秒数表示的配速（300 = 5:00/km），按运动时间计算，
#                与 Strava 相同。Garmin Connect 按总时长计算，因此其配速
#                更慢。不要仅凭这一差异判断表现变差。
#   pace_mmss    同一配速，以 m:ss 格式表示，便于阅读
#   gap_s_km     坡度调整配速（Minetti 2002）：起伏路线与平路之间可比较
#   grade_pct    该路段的平均坡度，单位百分比
#   hr_bpm       心率
#   cad_spm      步频（跑步，步/分钟）或踏频（骑行，rpm）
#   pw_w         功率，单位瓦
#
# 阅读注意事项，按重要性排序
#   1. hr_source 表示估计的心率传感器。切勿比较来源不同的两次训练的
#      心率：测得的差异是设备造成的伪影，而不是状态变化。
#   2. drift_applicable = no 表示该训练不适合计算漂移（强度太不规律或
#      时间太短）。这不是零漂移，而是没有有效测量。
#   3. temp_c 来自佩戴在手腕上的手表传感器，比气温高 3 到 8°C。
#      这不是天气数据。
#   4. 详细数据流是每个区间的平均值，而非瞬时读数。精确时间见
#      splits、laps 和 intervals 数据块。
# ─────────────────────────────────────────────────────────────────────`,
  "dossier.title": "gps-digest — 训练档案",
  "dossier.range": "{n} 次训练，{from} 至 {to}",
  "dossier.volume": "训练量：{km} km，运动时间 {dur}",
  "dossier.contextNote":
    "历史记录：共 {total} 次训练。最近 {days} 天（{n} 次）提供完整明细；更早的训练只在 sessions 表中各占一行。",
  "dossier.hrZonesObserved":
    "心率区间：因缺少运动员资料，按该时段观测到的最大心率（{hr} bpm）的百分比划分。所有训练使用相同界限；填写最大心率或阈值心率可使其更可靠。",
  "dossier.hrZonesMax":
    "心率区间：按最大心率（{hr} bpm）的百分比划分，所有训练使用相同界限。",
  "dossier.hrZonesReserve":
    "心率区间：按储备心率的百分比划分（最大心率 {max} bpm，静息心率 {rest} bpm），所有训练使用相同界限。",
  "dossier.hrZonesThreshold":
    "心率区间：按阈值心率（{hr} bpm）的百分比划分，所有训练使用相同界限。Z5 从阈值开始。",
  "dossier.privacyMasked":
    "已删除起点和终点 {m} 米范围内的 GPS 位置。距离、时长和各项计算覆盖整次训练：缺少的只是坐标。",
  "dossier.warningsHeader": "⚠ 警告 — 得出任何结论前请先阅读",
  "dossier.unknownDate": "日期未知",
  "dossier.sessionHeader": "═══ 训练 {n} — {date} — {sport} — {label} ═══",
  "dossier.file": "文件：{name}",
  "dossier.paceBasis":
    "运动时间（Strava 惯例）；Garmin Connect 按总时长计算，因此显示的配速更慢",
  "dossier.eleDevice": "手表气压高度计",
  "dossier.eleGps": "根据 GPS 海拔计算，通常低估 30% 到 50%",
  "dossier.powerEstimated": "yes（手表估算，不能与骑行功率比较）",
  "dossier.driftReading": "漂移解读：{text}",
  "dossier.representativeness": "代表性：{text}",
  "dossier.conditions": "环境条件：{text}",
  "dossier.classification": "分类：{text}",
  "dossier.swimSets": "分组：{list}",
  "dossier.adherence": "{set} — {grade}：{verdicts}",
  "dossier.streamNote": "以下数据流：每 {step} 一个点，数值为该区间的平均值",
  "dossier.progNote":
    "参考配速下的心率随时间变化。只比较 hr_source\n相同的行：两种传感器之间不可比较。",
  "dossier.progMonthlyNote":
    "按月汇总的有氧进展：各参考配速下的平均心率，\n按在该配速下的时间加权。只比较 hr_source 相同的行。",
  "dossier.progVerdict": "{pace}（{source}）：{verdict}",

  "chart.sessionPower": "功率与心率",
  "chart.sessionPace": "配速与心率",
  "chart.windowNote": "阴影区域：用于计算漂移的片段",
  "chart.reps": "重复",
  "chart.repsNote": "柱：强度；点：心率",
  "chart.trendNote": "心率（bpm），下降表示进步",
  "chart.load": "每周负荷",
  "chart.loadNote": "柱：TRIMP，基于心率的负荷，适用于所有运动；深色部分：中高强度时间",
  "chart.loadNoteHours":
    "柱：所有运动的运动时长（文件中没有心率）",
  "dossier.loadNote":
    "每周负荷：每个项目单独一列（距离、时长、爬升），从不相加。trimp = Edwards TRIMP（各心率区间的分钟数 × 区间编号），是所有运动唯一共用的负荷；hr_coverage_pct = 运动时间中有心率的比例。没有心率的训练不计入 trimp。",

  "heat.humid": "，湿度 {pct}%",
  "heat.strong":
    "高温压力大（体感 {temp}°C{humid}）。在此水平下，无论状态如何，预计会出现 8% 到 12% 的心率漂移。",
  "heat.notable": "明显炎热（体感 {temp}°C{humid}）。预计会有 5% 到 8% 纯粹由高温引起的漂移。",
  "heat.cold": "寒冷（体感 {temp}°C）。相同配速下心率往往更低，热身需要更长时间。",

  "fit.hrEvidence": "通过 {source}{product} 配对的外部心率传感器：信息读取自文件，而非估算。",
  "fit.hrEvidenceProduct": "（产品 {id}）",
  "fit.hrEvidenceWrist":
    "手表只列出其腕部光学传感器，未连接外部心率传感器：信息读取自文件，而非推测。",
  "fit.sourceN": "来源 {n}",
  "fit.manufacturerN": "制造商 {id}",
  "fit.errHeader": "无效的 FIT 文件：文件头异常。",
  "fit.errSignature": "无效的 FIT 文件：缺少签名。",
  "strava.errNoTime": "Strava 活动 {id}：缺少时间数据流。",
  "strava.sensorCaveat":
    "Strava 数据流：服务器端已平滑处理。心率传感器检测不如原始 FIT 文件可靠。",

  // ── archive.ts ─────────────────────────────────────────────────────────
  "archive.empty":
    "此压缩包中没有 FIT、TCX 或 GPX 文件。",
  "archive.tooBig":
    "压缩包太大，浏览器无法处理：请先解压，只拖入需要的训练文件。",
  "archive.unsupported":
    "无法在此读取该压缩包（ZIP64、加密或不常见的压缩方式）：请先解压，再拖入 FIT、TCX 或 GPX 文件。",
  "archive.corrupt":
    "压缩包已损坏或不完整：请重新下载。",
};
