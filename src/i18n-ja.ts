/**
 * Catalogue japonais. Les clés et les paramètres suivent le français
 * (i18n.ts), qui fait référence.
 *
 * Typographie : ponctuation pleine chasse （、。：（）「」）, « 〜 » pour les
 * intervalles, chiffres et unités SI en caractères latins, « % » et « °C »
 * collés au nombre. Les unités qui figurent aussi dans les colonnes du
 * dossier (s, m, bpm, W) restent en latin. Registre : style poli (です／ます)
 * dans les phrases, style neutre dans le guide de lecture, comme une notice.
 *
 * La semaine est notée « W » (notation ISO) : le graphique de charge n'en
 * affiche que les trois derniers caractères.
 */

import type { Catalog } from "./i18n.ts";

export const ja: Partial<Catalog> = {
  "unit.percent": "%",

  "digest.errFormat": "「{filename}」の形式を認識できません。対応形式：TCX、GPX、FIT。",
  "digest.errNoTime":
    "「{filename}」にはタイムスタンプがありません。記録されたセッションではなく、計画ルートです。",
  "digest.errNoPoints": "ファイルに利用できるデータポイントがありません。",
  "digest.warnZonesObserved":
    "心拍ゾーンはアスリートプロフィールではなく、ファイル内で観測された最大心拍数から算出しています。慎重に解釈してください。",
  "digest.warnNoFtp": "FTP が不明なため、IF と TSS は算出していません。",
  "digest.warnCoords":
    "スタート地点とゴール地点の座標がトリミングされていません。自宅の場所が特定される可能性があります。",
  "digest.warnHrSource":
    "推定心拍ソース：{label}（信頼度 {confidence}）。心拍数は同じソースのセッション同士でのみ比較してください。",
  "digest.warnDrift": "心拍ドリフトは算出していません：{reason}",

  "sensor.label.chest_strap": "胸ストラップ",
  "sensor.label.optical": "手首の光学センサー",
  "sensor.label.unknown": "判定不能",
  "sensor.lockRange": "心拍数がケイデンスに固定",
  "sensor.device.name":
    "ファイルに記録された機器",
  "sensor.device.note":
    "FIT の device_info メッセージから読み取ったソース。",
  "sensor.startDrop.name":
    "開始時の異常",
  "sensor.startDrop.note":
    "{min} 分ごろにペースが変わらないまま心拍が {bpm} bpm 下がっています。センサーが安定し直したためです（手首の冷え、乾いたベルト）。開始部分は心拍の計算から除外します。",
  "sensor.startDrop.reason":
    "開始時の心拍異常（ペースが変わらず {bpm} bpm 低下）",
  "sensor.swim.name": "検出対象外",
  "sensor.swim.note":
    "水泳中の心拍数はいったん記録され、水から上がったときにまとめて送られます。そのため信号の形からはセンサーの種類がわかりません。FIT ファイルをアップロードすれば、ペアリングされた機器を直接読み取れます。",
  "sensor.lock.name": "ケイデンスへの固定",
  "sensor.lock.found":
    "セッションのかなりの部分で心拍数がケイデンスに追従しています。手首センサーに典型的なアーティファクトです。",
  "sensor.lock.none": "心拍数とケイデンスの混同は検出されませんでした。",
  "sensor.plateau.name": "最長の平坦区間",
  "sensor.plateau.long": "心拍数がまったく変化しない状態が長く続いています。光学式の平滑化の特徴です。",
  "sensor.plateau.normal": "異常に長い平坦区間はありません。",
  "sensor.plateauTime.name": "平坦区間の割合",
  "sensor.plateauTime.note": "心拍数が 5 秒以上変化しない時間の割合。",
  "sensor.step.name": "平均変化量",
  "sensor.step.note": "{pct}% の間隔でまったく変化がありません。",
  "sensor.lag.name": "応答の遅れ",
  "sensor.lag.slow": "ペースの変化に対して心拍数の反応が大きく遅れています。",
  "sensor.lag.fast": "ペースの変化に素早く反応しています。",
  "sensor.spike.name": "開始時のスパイク",
  "sensor.spike.note":
    "開始直後に異常な心拍数が出て、その後急に下がっています。電極の乾燥によるもので、胸ストラップに典型的です。",
  "sensor.calibration.name": "キャリブレーション",
  "sensor.calibration.note":
    "しきい値はランニングのデータで設定しています。バイクでは信号が明確でなく、判定不能になることがよくあります。FIT ファイルならペアリングされた機器がわかるため、判別できます。",

  "drift.wristCaveat":
    "手首の熱で温められた時計のセンサーです。通常 3〜8°C 高く表示されます。気温ではありません。",
  "drift.basisPowerIgnored":
    "パワーデータはありますが使用していません。サイクリング以外では時計による推定値で、信頼できる基準になりません。デカップリングは速度で算出しています。",
  "drift.noWindowPower":
    "このセッションには、パワーが安定した 10 分以上の区間がありません。パワーと心拍数の比は一定の強度でしか比較できません。各レップを個別に分析してください。",
  "drift.noWindowSpeed":
    "このセッションには、ペースが安定した 10 分以上の区間がありません。心拍ドリフトは持続的な運動でしか測定できません。各レップを個別に分析してください。",
  "drift.sparseHr": "安定した区間は見つかりましたが、利用できる心拍データが少なすぎます。",
  "drift.halvesInsufficient": "区間の前半と後半を比較するにはデータが不足しています。",
  "drift.workDrop.power":
    "区間の前半と後半で強度が {drop}% 低下しています（パワー {from} → {to}）。効率が下がったのは強度が下がったためで、心拍がドリフトしたためではありません。ドリフトは算出できません。",
  "drift.workDrop.speed":
    "区間の前半と後半で強度が {drop}% 低下しています（速度 {from} → {to}）。効率が下がったのは強度が下がったためで、心拍がドリフトしたためではありません。ドリフトは算出できません。",
  "drift.qualityNote.shortEasy":
    "区間が短く、セッションで最も強度の低い部分にあります。ウォームアップかクールダウンの可能性が高いです。数値は正確ですが、メインの運動を表していません。レップの分析を参照してください。",
  "drift.qualityNote.easy":
    "見つかった安定区間は、セッションで最も強度の低い部分だけです。そこでのドリフトは構造的に小さく、メインの運動についてはほとんど何もわかりません。",
  "drift.qualityNote.short":
    "{min} 分の区間で、セッションの {pct}% をカバーしています。測定は有効ですが、全体の代表性は低めです。",
  "drift.interp.negative":
    "負のデカップリング：後半に効率が上がっています。区間の開始時点でウォームアップが不十分だった場合や、意図的なビルドアップでよく見られます。",
  "drift.interp.low": "ドリフトはごくわずかです。強度は有酸素性閾値を明らかに下回っていました。",
  "drift.interp.normal":
    "ドリフトは正常範囲内です（≤ 5%）。有酸素持久力がこのペースをこの時間支えられています。",
  "drift.interp.markedHot":
    "ドリフトが大きめです（> 5%）が、気温は {temp}°C でした。この気温では 5〜6% のデカップリングは暑さによる通常のコストで、不調のサインではありません。",
  "drift.interp.marked":
    "ドリフトが大きめです（> 5%）。時間に対してペースが高すぎたか、基礎持久力が制限要因になっています。脱水や疲労の残りでも同じ影響が出ます。",
  "drift.interp.highHot":
    "ドリフトが大きいです（> 10%、気温 {temp}°C）。暑さで一部は説明できますが、すべてではありません。水分補給と疲労回復の状態を確認してください。",
  "drift.interp.high":
    "ドリフトが大きいです（> 10%）。この条件でこのペースをこの時間維持するのは無理があります。",
  "drift.quality.solide": "信頼できる",
  "drift.quality.indicatif": "参考値",

  "adh.tooFew": "識別されたレップが 2 本未満のため、比較できません。",
  "adh.veryRegular.pace": "レップ間のペースが非常に安定しています（ばらつき {cv}%）。",
  "adh.veryRegular.power": "レップ間のパワーが非常に安定しています（ばらつき {cv}%）。",
  "adh.regularOk": "安定性はまずまずです（ばらつき {cv}%）。",
  "adh.irregular.pace":
    "レップのペースにばらつきがあります（ばらつき {cv}%）。ペース配分の改善が必要か、メニューの設定が合っていません。",
  "adh.irregular.power":
    "レップのパワーにばらつきがあります（ばらつき {cv}%）。ペース配分の改善が必要か、メニューの設定が合っていません。",
  "adh.fade.pace":
    "最初と最後のレップでペースが {pct}% 落ちています。入りが速すぎたか、現在のレベルに対して量が多すぎます。",
  "adh.fade.power":
    "最初と最後のレップでパワーが {pct}% 落ちています。入りが速すぎたか、現在のレベルに対して量が多すぎます。",
  "adh.build":
    "セットを通じて {pct}% 向上しています。意図的なビルドアップで、余力があったことを示しています。",
  "adh.held.pace": "セットの最初から最後までペースを維持できています。",
  "adh.held.power": "セットの最初から最後までパワーを維持できています。",
  "adh.restLonger":
    "レストがだんだん長くなっています（1 本ごとに +{s} 秒）。セット終盤で崩れています。",
  "adh.restShorter": "レストがだんだん短くなっています（1 本ごとに {s} 秒）。",
  "adh.hrRiseStable":
    "ペースは維持できていますが、セットを通じて心拍数が {bpm} bpm 上昇しています。同じ強度での心臓への負担が増えており、疲労の蓄積を示しています。",
  "adh.hrRiseStable.power":
    "パワーは維持できていますが、セットを通じて心拍数が {bpm} bpm 上昇しています。同じ強度での心臓への負担が増えており、疲労の蓄積を示しています。",
  "adh.hrRise": "セットを通じて心拍数が {bpm} bpm 上昇しています。",
  "adh.hrrGood": "心拍の回復は非常に良好です。各レップ後 60 秒で {bpm} bpm 低下しています。",
  "adh.hrrOk": "心拍の回復はまずまずです。60 秒で {bpm} bpm 低下しています。",
  "adh.hrrSlow":
    "回復が遅いです。60 秒で {bpm} bpm しか低下していません。疲労の残り、暑さ、またはメニューに対してレストが短すぎる可能性があります。",
  "adh.hrrErode":
    "心拍の回復が 1 本ごとに {bpm} bpm ずつ低下しています。ペースから見える以上の速さで余力を消耗しています。",
  "adh.missingReps": "予定 {planned} 本のうち {done} 本を実施しました。",
  "adh.targetMet.pace": "目標ペースを守れています。",
  "adh.targetMet.power": "目標パワーを守れています。",
  "adh.belowTarget": "セットは目標を {pct}% 下回りました。",
  "adh.aboveTarget":
    "セットは目標を {pct}% 上回りました。インターバル練習の効果は指示を守ることで得られるもので、超えることではありません。",
  "adh.grade.conforme": "達成",
  "adh.grade.acceptable": "許容範囲",
  "adh.grade.dégradé": "未達",
  "adh.grade.non évaluable": "評価不可",

  "cls.pool": "GPS 位置なし、ケイデンスなし、速度 {speed} m/s：プールでの水泳です。",
  "cls.openWater":
    "GPS 位置が断続的です（カバー率 {pct}%、途切れ {flips} 回）。速度 {speed} m/s でケイデンスなし：オープンウォーターでの水泳です。腕が水から出るたびに信号が再接続されるため、GPS の距離は過大になります。",
  "cls.static": "{min} 分で {dist} m の移動：持久系の運動としては移動が少なすぎます。",
  "cls.crossTraining":
    "ランニングとして記録されていますが、{stopPct}% の時間は停止しており、経過時間 1 分あたり {mpm} m しか進んでいません。断続的な運動で、筋力トレーニングかクロストレーニングの可能性が高いです。負荷としてカウントし、ランニングの分析は行いません。",
  "cls.hiking": "ハイキング：負荷としてカウントし、ペース分析や予測は行いません。",
  "cls.unknownSport": "持久系の運動として認識されないスポーツです。負荷としてのみカウントします。",
  "erg.evidence":
    "{total} ブロック中 {pinned} ブロックでパワーが固定されています：ERG モードのセッションです。距離と速度は仮想的な値で、何も測定していません。",
  "erg.warning":
    "{n} ブロックでケイデンスが低下しています（最大 {max} rpm）。ERG モードではケイデンスが下がると負荷が上がり、さらにケイデンスが下がります。この悪循環は最終的にペダルが止まって終わります。対策は、ケイデンスが落ち始めたらすぐ意識的に上げること、または最後の数本で ERG をオフにすることです。",

  "zone.1": "Z1 リカバリー",
  "zone.2": "Z2 エンデュランス",
  "zone.3": "Z3 テンポ",
  "zone.4": "Z4 閾値",
  "zone.5": "Z5 VO2max",
  "zone.6": "Z6 無酸素",
  "zone.7": "Z7 神経筋",
  "set.rest": "、レスト {s} s",
  "set.power": "（{w} W）",

  "swim.set": "{reps} × {dist} m（{pace}/100m）",
  "swim.setRest": "、レスト {s} s",
  "swim.lapDistance":
    "距離はラップから再構成しました。プールでは、データポイントの流れに距離が含まれないのが普通です。",
  "swim.hr":
    "水泳中の心拍数：光学センサーは水中では計測できず、胸ストラップも水中では送信できません（記録しておき、水から上がったときに送信します）。値は参考値で、タイムスタンプもおおよそです。このセッションでは心拍ドリフトを算出しません。",
  "swim.noLaps":
    "利用できるラップがありません。セッションが往復ごとに区切られていません。使えるのは合計距離と合計時間だけです。",
  "swim.lowDensity":
    "経過時間 {elapsed} 分のうち、実際に泳いだのは {swim} 分だけです。非常に細切れのセッションか、トレーニングというより水遊びです。そのように解釈してください。",
  "swim.openWater":
    "オープンウォーターでの水泳：距離は GPS によるもので、腕が水中に入るたびに途切れ、その後再接続されます。通常 5〜15% 過大になり、瞬間ペースは使えません。使えるのは平均値だけです。",
  "swim.noStrokes":
    "ファイルにストローク数がありません。泳ぎの効率を示す SWOLF は算出できません。記録しない時計もあります。",
  "swim.noPoolLength":
    "データからプールの長さを推定できませんでした。距離は時計の値をそのまま使っています。",

  "race.400": "400m",
  "race.800": "800m",
  "race.1000": "1000m",
  "race.1609.344": "1マイル",
  "race.3000": "3000m",
  "race.5000": "5km",
  "race.10000": "10km",
  "race.15000": "15km",
  "race.20000": "20km",
  "race.21097.5": "ハーフマラソン",
  "race.42195": "フルマラソン",
  "proj.method.race": "レースでの {ref} の記録からの Riegel 式（k={k}）",
  "proj.method.raceAge": "、{months} か月前の記録",
  "proj.method.training": "練習での {ref} の記録からの Riegel 式",
  "proj.method.cs": "クリティカルスピード（CS {pace}/km、R²={r2}）",
  "dossier.setSource.workout":
    "{set}：ウォッチに設定されたワークアウト。構成と目標はファイルから読み取り。",
  "dossier.setSource.laps":
    "{set}：ラップから構成を読み取り（1 ステップ 1 ラップ）。",
  "dossier.setSource.auto":
    "{set}：信号から検出。ファイルに設定されたワークアウトはないため、達成度は評価しません。",
  "proj.method.achievedRace":
    "レース記録（{date}）：モデルより実測を優先",
  "proj.method.achievedTraining":
    "練習で出した記録（{date}）：モデルより実測を優先",
  "proj.caveat.gap":
    "モデル単独では {model}、実測（{date}）との差は {pct}%。信頼度を下げています。",
  "proj.dateUnknown":
    "日付不明",
  "dossier.projNote":
    "クリティカルスピードと予測：直近 {days} 日間（{from} 以降）のランニング記録のみを使用。achieved = この期間にその距離で出した最速の実測、model_gap_pct = その実測に対するモデルの差（正：モデルの方が遅い）。3% を超えると信頼度を下げます。",
  "proj.caveat.marathon":
    "練習データからのフルマラソン予測は、専門的な準備をやり切っていることが前提です（ロング走、目標ペース走、補給戦略）。すべての予測の中で最も信頼性が低いものです。",
  "proj.caveat.half": "専門的な準備と、安定したペース維持が前提です。",
  "proj.confidence.haute": "高",
  "proj.confidence.moyenne": "中",
  "proj.confidence.faible": "低",

  "prog.tooFew":
    "利用できるランニングのセッションが 3 回未満です。成長を追跡するにはもっとデータが必要です。",
  "prog.multiSource":
    "このデータには複数の心拍ソースがあります。曲線はセンサーごとに分けて作成しています。互いに比較しても意味がありません。",
  "prog.shortSpan": "期間が短すぎて、成長と日々の変動を区別できません。",
  "prog.improving": "明確な成長：{pace}/km での心拍数が 1 週間あたり約 {bpm} bpm 低下しています。",
  "prog.worsening":
    "{pace}/km での心臓への負担が増えています。まず暑さ、疲労の蓄積、詰め込みすぎた練習負荷を疑ってください。",
  "prog.stable": "安定：期間中、心臓への負担に測定できる変化はありません。",
  "prog.none":
    "比較可能な 3 回以上のセッションで、十分な時間維持された基準ペースがありません。一定のペースと一定の時間でジョグを行えば、この追跡ができるようになります。",
  "prog.tempSpread":
    "このデータの気温には {spread}°C の幅があります。同じペースでも暑さで心拍数は 5〜10 bpm 上がります。観察された傾向の一部は季節的なものにすぎない可能性があります。",

  "batch.week": "{year}-W{week}",
  "batch.duplicateOf": "{file}（{first} と同一）",
  "batch.warnDuplicates": "重複 {n} 件を除外しました（開始時刻と距離が同じ）：{list}。",
  "batch.warnRecordsGap":
    "{n} ファイルで、記録ポイントがセッションの終了時刻より前に途切れています（{list}）。記録の終わりが欠けています。合計値はウォッチの集計に基づきますが、表や終盤の心拍数は不完全な可能性があります。",
  "batch.warnReclassified":
    "{n} 件のセッションを再分類しました。ファイルに記録されたスポーツがデータの形と一致しませんでした（{list}）。",
  "batch.warnLoadOnly":
    "持久系以外の {n} 件のセッションは、ボリュームには含めていますが、ペース・ドリフト・予測の分析からは除外しています。",
  "batch.warnHrSources":
    "心拍のソースはセッションごとに異なります：胸ベルト {strap} 回、手首 {optical} 回、不明 {unknown} 回。心拍は同じソースのセッション同士でしか比較できません（セッション表の hr_source 列）。ゾーン、ドリフト、傾向はソースごとに読んでください。",
  "batch.warnCadenceLock":
    "{n} 件のファイルで心拍数がケイデンスに固定されています。心拍数の値は部分的に誤っており、対応するドリフトは利用できません。",
  "batch.warnDriftPartial":
    "心拍ドリフトは {total} 件中 {ok} 件のセッションで算出しました。残りは短すぎるか不規則すぎて、計算に意味がありません。",
  "batch.warnCsFit":
    "クリティカルスピードモデルの当てはまりは平凡です（R² = {r2}）。予測は参考値です。専用のテスト（疲れていない状態で 3 分間と 12 分間の全力走）を行えば、はるかに信頼できるモデルが得られます。",
  "batch.warnNoRace":
    "レース結果が入力されていません。予測は練習での記録だけに基づいており、通常はレースのパフォーマンスを過大評価します。実際のレースタイムを入力すると、キャリブレーションが大きく改善します。",
  "batch.racesFound":
    "ファイルから認識したレース：{list}。予測の基準に使います。リストを確認してください。週末に公式距離を全力で走った練習がレースと見なされることがあります。",
  "race.noteMultisport":
    "複合競技の一部で、単独のランニングレースではない",
  "race.noteNonStandard":
    "標準外の距離",
  "race.noteMeasured":
    "コースの実測は {km} km で、公式の {official} と差が大きいため予測には使わない",
  "dossier.racesNote":
    "認識したレース。detected_by：user（本人がチェック）、strava（Strava でレースに指定）、name（アクティビティ名）、auto（推定：公式距離、途切れない走り、高い心拍または速いペース、週末）。time = セッションの経過時間。used = 予測の基準に使用。",
  "batch.warnMaxHr":
    "観測された最大心拍数（{observed} bpm）が設定値（{maxHr} bpm）を上回っています。この設定を修正するまで、すべてのゾーンがずれています。",
  "batch.bundle.title": "gps-digest v1 — 複数セッションのまとめ",
  "batch.bundle.range": "{n} セッション、{from} 〜 {to}",
  "batch.bundle.volume": "総ボリューム：{km} km、移動時間 {dur}",
  "batch.bundle.note":
    "心拍数は、hr_source 列が同じ場合にのみセッション間で\n比較できます。結論を出す前に警告を読んでください。",
  "common.refMaxHr": "基準最大心拍数：{hr} bpm",

  "bundle.title": "gps-digest v1 — LLM による分析用に圧縮したアクティビティ概要",
  "bundle.source": "ソース：{format} | 生データ {raw} 点 -> {kept} 点を保持",
  "bundle.glossary": [
    "t_s = スタートからの秒数 | dist_m = 累積距離（m）",
    "pace_s_km = ペース（秒/km）| gap_s_km = 勾配補正ペース（Minetti 2002）",
    "hr_bpm = 心拍数 | cad_spm = ケイデンス（歩/分 または rpm）| pw_w = パワー（W）",
    "decoupling_pct = 前半と後半の間の有酸素ドリフト。> 5% = 持久力が制限要因",
    "hr_source = 推定心拍センサー。ソースの異なる心拍数は絶対に比較しないこと",
    "drift_applicable = no はセッションがこの計算に適さないという意味で、値がゼロという意味ではない",
  ].join("\n"),
  "bundle.tempWrist": "時計のセンサー（3〜8°C 高く表示される。気温ではない）",
  "bundle.tempExternal": "外部",

  "dossier.guide": `# ─────────────────────────────────────────────────────────────────────
# この記録の読み方
#
# 構成：まずセッション横断の表（全セッションまとめて）、次に各セッションの
# 詳細。各セッションは「═══ セッション n ═══」で始まる。
# 各ブロックは「## ブロック名」で始まり、ヘッダー付きの CSV を含む。
#
# 単位：メートル、秒、bpm、ワット、摂氏。小数点 = ピリオド。
# 列の区切り = カンマ。
#
# 主な列
#   t_s          セッション開始からの経過秒数
#   dist_m       スタートからの累積距離（メートル）
#   speed        スポーツに応じたペースまたは速度：ランは min/km、バイクは
#                km/h、水泳は min/100m。相互に換算しないこと。
#   pace_s_km    1 km あたりの秒数で表したペース（300 = 5:00/km）。Strava と
#                同じく移動時間で算出。Garmin Connect は合計時間で割るため、
#                ペースが遅くなる。この差だけで不調と判断しないこと。
#   pace_mmss    同じペースを m:ss 形式で表したもの（読みやすさのため）
#   gap_s_km     勾配補正ペース（Minetti 2002）：起伏のあるコースと平坦な
#                コースを比較できる
#   grade_pct    区間の平均勾配（パーセント）
#   hr_bpm       心拍数
#   cad_spm      ケイデンス：ランは歩/分、バイクは rpm
#   pw_w         パワー（ワット）
#
# 読むときの注意（重要な順）
#   1. hr_source は推定した心拍センサーを示す。ソースの異なる 2 つの
#      セッション間で心拍数を絶対に比較しないこと。測定された差は機器による
#      アーティファクトで、コンディションの変化ではない。
#   2. drift_applicable = no は、そのセッションがドリフトの計算に適さない
#      （強度が不規則すぎる、または短すぎる）という意味。ドリフトがゼロ
#      なのではなく、有効な測定がないということ。
#   3. temp_c は手首に着けた時計のセンサーの値。気温より 3〜8°C 高く
#      表示される。天気ではない。
#   4. 詳細なデータ列は区間ごとの平均で、瞬間値ではない。正確な時間は
#      splits、laps、intervals ブロックにある。
# ─────────────────────────────────────────────────────────────────────`,
  "dossier.title": "gps-digest — トレーニング記録",
  "dossier.range": "{n} セッション、{from} 〜 {to}",
  "dossier.volume": "ボリューム：{km} km、移動時間 {dur}",
  "dossier.contextNote":
    "履歴：全 {total} セッション。直近 {days} 日分（{n} セッション）は詳細あり。それより前は「sessions」表に 1 行ずつ記載。",
  "dossier.hrZonesObserved":
    "心拍ゾーン：アスリート情報がないため、期間中に観測された最大心拍数（{hr} bpm）に対する割合で設定。全セッションで同じ境界を使用。最大心拍数か閾値心拍数を入力すると信頼性が上がります。",
  "dossier.hrZonesMax":
    "心拍ゾーン：最大心拍数（{hr} bpm）に対する割合。全セッションで同じ境界を使用。",
  "dossier.hrZonesReserve":
    "心拍ゾーン：予備心拍数に対する割合（最大心拍数 {max} bpm、安静時 {rest} bpm）。全セッションで同じ境界を使用。",
  "dossier.hrZonesThreshold":
    "心拍ゾーン：閾値心拍数（{hr} bpm）に対する割合。全セッションで同じ境界を使用。Z5 は閾値から。",
  "dossier.privacyMasked":
    "スタート地点とゴール地点から半径 {m} m 以内の GPS 位置を消去しました。距離・時間・各種計算はセッション全体が対象で、欠けているのは座標だけです。",
  "dossier.warningsHeader": "⚠ 警告 — 結論を出す前に読むこと",
  "dossier.unknownDate": "日付不明",
  "dossier.sessionHeader": "═══ セッション {n} — {date} — {sport} — {label} ═══",
  "dossier.file": "ファイル：{name}",
  "dossier.paceBasis":
    "移動時間（Strava 方式）。Garmin Connect は合計時間で割るため、ペースが遅く表示される",
  "dossier.eleDevice": "時計の気圧高度計",
  "dossier.eleGps": "GPS の高度から算出。通常 30〜50% 過小になる",
  "dossier.powerEstimated": "yes（時計による推定値で、バイクのパワーとは比較できない）",
  "dossier.driftReading": "ドリフトの解釈：{text}",
  "dossier.representativeness": "代表性：{text}",
  "dossier.conditions": "コンディション：{text}",
  "dossier.classification": "分類：{text}",
  "dossier.swimSets": "セット：{list}",
  "dossier.adherence": "{set} — {grade}：{verdicts}",
  "dossier.streamNote": "以下のデータ列：{step} ごとに 1 点、値は区間の平均",
  "dossier.progNote":
    "基準ペースでの心拍数の推移。hr_source が同じ行だけを\n比較すること。異なるセンサー同士は比較できない。",
  "dossier.progMonthlyNote":
    "月ごとの有酸素能力の推移：各基準ペースでの平均心拍数、\nそのペースで過ごした時間で加重。hr_source が同じ行どうしだけを比較すること。",
  "dossier.progVerdict": "{pace}（{source}）：{verdict}",

  "chart.sessionPower": "パワーと心拍数",
  "chart.sessionPace": "ペースと心拍数",
  "chart.windowNote": "網掛け部分：ドリフトの分析に使った区間",
  "chart.reps": "レップ",
  "chart.repsNote": "棒：強度、点：心拍数",
  "chart.trendNote": "心拍数（bpm）、低下は成長を示す",
  "chart.load": "週間負荷",
  "chart.loadNote": "棒：TRIMP（心拍に基づく全種目共通の負荷）。濃い部分：中〜高強度の時間",
  "chart.loadNoteHours":
    "棒：全種目の移動時間（ファイルに心拍データなし）",
  "dossier.loadNote":
    "週間負荷：種目ごとに列を分ける（距離・時間・獲得標高）。合算はしない。trimp = Edwards TRIMP（各心拍ゾーンの分数 × ゾーン番号）で、全種目に共通する唯一の負荷。hr_coverage_pct = 移動時間のうち心拍がある割合。心拍のないセッションは trimp に加算されない。",

  "heat.humid": "、湿度 {pct}%",
  "heat.strong":
    "強い暑熱ストレス（体感 {temp}°C{humid}）。このレベルでは、コンディションに関係なく 8〜12% の心拍ドリフトが予想されます。",
  "heat.notable":
    "かなりの暑さ（体感 {temp}°C{humid}）。純粋に暑さによるドリフトが 5〜8% あると見込んでください。",
  "heat.cold":
    "寒さ（体感 {temp}°C）。同じペースでも心拍数は低めになりやすく、ウォームアップに時間がかかります。",

  "fit.hrEvidence":
    "{source}{product} でペアリングされた外部心拍センサー：推定ではなく、ファイルから読み取った情報です。",
  "fit.hrEvidenceProduct": "（製品 {id}）",
  "fit.hrEvidenceWrist":
    "ウォッチが記録しているのは手首の光学センサーのみで、外部心拍センサーは未接続：推定ではなくファイルから読み取った情報です。",
  "fit.sourceN": "ソース {n}",
  "fit.manufacturerN": "メーカー {id}",
  "fit.errHeader": "無効な FIT ファイル：ヘッダーが想定外です。",
  "fit.errSignature": "無効な FIT ファイル：シグネチャがありません。",
  "strava.errNoTime": "Strava アクティビティ {id}：時間のデータ列がありません。",
  "strava.sensorCaveat":
    "Strava のデータ列：サーバー側で平滑化されています。心拍センサーの判定は、元の FIT ファイルからの場合より信頼性が下がります。",

  // ── archive.ts ─────────────────────────────────────────────────────────
  "archive.empty":
    "このアーカイブには FIT・TCX・GPX ファイルが含まれていません。",
  "archive.tooBig":
    "アーカイブが大きすぎてブラウザで処理できません。展開して、必要なセッションだけをドロップしてください。",
  "archive.unsupported":
    "このアーカイブはここでは読み込めません（ZIP64、暗号化、または特殊な圧縮方式）。展開して FIT・TCX・GPX ファイルをドロップしてください。",
  "archive.corrupt":
    "アーカイブが破損しているか不完全です。もう一度ダウンロードしてください。",
};
