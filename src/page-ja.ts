/**
 * Catalogue de page : japonais. Clés et emplacements : voir page-i18n.ts.
 * Même typographie que i18n-ja.ts : ponctuation pleine chasse, « 〜 » pour
 * les intervalles, chiffres et unités en caractères latins.
 */

import type { PageCatalog } from "./page-i18n.ts";

export const ja: Partial<PageCatalog> = {
  "common.langs": "言語",
  "common.footerNav": "フッター",
  "common.privacy": "プライバシー",
  "common.source": "ソースコード",

  "home.title": "TCX・GPX・FIT ファイルを ChatGPT や Gemini 向けの CSV に変換 — gps-digest",
  "home.description":
    "GPS ウォッチのファイルを、AI が読めるトレーニング記録に変換する無料ツール。胸ストラップの判定、心拍ドリフトの算出、インターバルが予定どおりにこなせたかの確認、レースタイムの予測を行います。計算はすべてブラウザ内で完結し、ファイルは一切送信されません。",
  "home.h1": "ランニングのセッションを AI に分析させよう",
  "home.og.description":
    "ウォッチのファイルは AI にとって大きすぎます。このツールは、AI が本当に分析できる構造化された記録に変換します。",
  "home.og.imageAlt": "構造化されたトレーニング記録に変換された GPS ウォッチのファイル。",

  "home.ld.description":
    "GPS ウォッチのファイル（TCX、GPX、FIT）を、言語モデルが分析できる構造化されたトレーニング記録に変換します。",
  "home.ld.feature1": "TCX・GPX・FIT を構造化 CSV に変換",
  "home.ld.feature2": "すべてブラウザ内で処理、ファイルは送信しない",
  "home.ld.feature3": "心拍センサーの判定（胸ストラップか手首か）",
  "home.ld.feature4": "有効性チェック付きの心拍ドリフト",
  "home.ld.feature5": "インターバルの達成度の分析",
  "home.ld.feature6": "5km、10km、ハーフマラソン、フルマラソンのタイム予測",
  "home.ld.feature7": "ファイル数は無制限",
  "home.ld.howto": "ランニングのセッションを AI に分析させる",
  "home.ld.step1.name": "ファイルをアップロード",
  "home.ld.step1.text": "ウォッチから書き出した TCX、GPX、FIT ファイルをドラッグします。数に制限はありません。",
  "home.ld.step2.name": "基準値を入力",
  "home.ld.step2.text": "実測の最大心拍数と、最近のレースタイムを入力します。",
  "home.ld.step3.name": "警告を読む",
  "home.ld.step3.text": "心拍センサーの変更や、心拍数が信頼できないセッションをツールが知らせます。",
  "home.ld.step4.name": "記録を AI にコピー",
  "home.ld.step4.text": "生成された記録をコピーし、質問と一緒に ChatGPT、Gemini、Claude に貼り付けます。",
  "home.ld.faq1.q": "なぜ TCX ファイルは AI にとって大きすぎるのですか？",
  "home.ld.faq1.a":
    "1 Hz で記録した 1 時間の TCX は約 1.7 MB で、その 90% 近くが XML タグです。トークンにすると約 533,000 です。コンテキストウィンドウに収まったとしても、何千行もの生の座標からトレーニング分析を求められるため、モデルはうまく推論できません。",
  "home.ld.faq2.q": "GPS ファイルはサーバーに送信されますか？",
  "home.ld.faq2.a":
    "いいえ。計算はすべてブラウザ内で行われます。ファイルがサーバーを経由することはなく、ネットワークタブで確認できます。GPS の軌跡は自宅の住所をメートル単位で明かしてしまうため、ツールは初期設定でスタートとゴールをトリミングします。",
  "home.ld.faq3.q": "セッションが胸ストラップで記録されたか、手首のセンサーかを見分けるには？",
  "home.ld.faq3.a":
    "ファイルにはほとんど記録されていません。ツールは信号の特徴から推定します。最もわかりやすい目印はケイデンスへの固定です。光学センサーは足の回転を心拍と取り違え、たとえば 140 のところを 172 bpm と表示します。胸ストラップは電気信号を測るため、この誤りは起こりません。",
  "home.ld.faq4.q": "手首の心拍数と胸ストラップの心拍数は比較できますか？",
  "home.ld.faq4.a":
    "できません。2 つの方式は運動中に明らかにずれ、強度が変わると光学センサーの精度は落ちます。期間の途中でセンサーを替えると、ゾーン、ドリフト、傾向が気づかないうちに歪みます。ツールはこの変更を検出して日付を示し、2 つの期間を別々に分析します。",
  "home.ld.faq5.q": "フルマラソンの予測はどのくらい信頼できますか？",
  "home.ld.faq5.a":
    "低めです。市民ランナー 2,303 人を対象とした研究では、Riegel の式はハーフマラソンまではよく合うものの、フルマラソンでは半数のランナーについて少なくとも 10 分速すぎる予測になりました。実際のレース結果 1〜2 件に基づくモデルなら、誤差はおよそ半分になります。",
  "home.ld.faq6.q": "時計に表示される温度は気温ですか？",
  "home.ld.faq6.a":
    "いいえ。センサーは手首に着けられ、体温で温められるため、通常 3〜8°C 高く表示されます。ツールは値を表示しますが、AI に送る記録も含め、必ずこの警告を添えます。",

  "home.lede":
    "ウォッチのファイルは ChatGPT、Gemini、Claude にとって大きすぎます。このツールは、AI が本当に分析できる構造化されたトレーニング記録（ペース、ラップ、ゾーン、レップ、心拍ドリフト）に変換します。",
  "home.promise":
    "<strong>ファイルはブラウザの外に出ません。</strong>計算はすべてお使いの端末で行われ、ネットワークタブで確認できます。GPS の軌跡は住所をメートル単位で明かしてしまうため、スタートとゴールは初期設定でトリミングされます。<a href=\"{{href:confidentialite.html}}\">外に出るもの、決して出ないもの</a>。",
  "home.step1.title": "ファイルをアップロード",
  "home.step1.text": "TCX、GPX、FIT をいくつでも。ウォッチや Strava から書き出したものが使えます。",
  "home.step2.title": "基準値を入力",
  "home.step2.text": "最大心拍数と最新のレースタイム。これがないと、ゾーンと予測はおおよその値になります。",
  "home.step3.title": "警告を読む",
  "home.step3.text": "センサーの変更や信頼できない心拍数は、ほかの結果の有効性を左右します。",
  "home.step4.title": "記録を受け取る",
  "home.step4.text": "注釈付きの完全なテキストファイル。ChatGPT、Gemini、Claude にそのまま渡せます。",

  "home.why.title": "なぜこのツールを使うのか",
  "home.why.p1":
    "1 Hz で記録した 1 時間の TCX ファイルは約 1.7 MB で、その 90% 近くが XML タグです。トークンにすると約 <strong>533,000</strong> です。コンテキストウィンドウに収まったとしても、何千行もの生の座標からトレーニング分析を求められるため、モデルはうまく推論できません。",
  "home.why.p2":
    "ここで生成される記録は数万トークンで、モデルが理解できる形になっています。1 km ごとのスプリット、ラップ、ゾーンごとの時間、レップごとの結果、ベスト記録、予測です。<strong>元のファイルをそのまま渡すより分析の質が上がります</strong>。安くなるだけではありません。",
  "home.why.tableTitle": "ツールが自動で計算するもの",
  "home.why.colAnalysis": "分析",
  "home.why.colAnswer": "答える問い",
  "home.why.sensor": "心拍のソース",
  "home.why.sensorText":
    "胸ストラップか手首のセンサーか。ファイルにはほとんど記録されていません。ツールは信号、特にケイデンスへの固定（時計が足の運びを心拍と取り違える現象）から推定します。",
  "home.why.drift": "心拍ドリフト",
  "home.why.driftText":
    "運動の後半に効率が落ちていないか。5% を超えるなら基礎持久力が課題です。インターバル練習では数値に意味がないため、ツールはドリフトを算出しません。",
  "home.why.blocks": "インターバルの達成度",
  "home.why.blocksText":
    "レップは安定しているか。ペースは落ちていないか。ペースを保ったまま心拍数が上がっていないか。それは脚が止まる前に現れる疲労のサインです。",
  "home.why.projections": "タイム予測",
  "home.why.projectionsText":
    "5km、10km、ハーフマラソン、フルマラソンを、幅と信頼度付きで予測します。レースの記録は練習の記録より重視され、その重みは時間とともに小さくなります。",
  "home.why.hardware": "機器の変更",
  "home.why.hardwareText":
    "複数のセッションにわたって、心拍センサーの変更を検出し、日付を示します。見逃すと、心拍数の比較がすべて気づかないうちに無効になります。",

  "home.set.title": "1. 基準値",
  "home.set.intro":
    "任意ですが、これらの値がないと、ゾーンはファイル内で観測された最大心拍数から推定されるため、おおよその値になります。",
  "home.set.fcmax": "最大心拍数",
  "home.set.fcmaxHint": "実測値。220 − 年齢ではなく",
  "home.set.fcmaxPlaceholder": "例：185",
  "home.set.threshold": "閾値ペース",
  "home.set.thresholdHint": "約 1 時間維持できるペース",
  "home.set.refDist": "基準となるレース",
  "home.set.refDistHint": "距離",
  "home.set.refNone": "なし",
  "home.set.ref5k": "5km",
  "home.set.ref10k": "10km",
  "home.set.refHalf": "ハーフマラソン",
  "home.set.refMarathon": "フルマラソン",
  "home.set.refTime": "タイム",
  "home.set.refTimeHint": "h:mm:ss",
  "home.set.refDate": "レースの日付",
  "home.set.refDateHint": "古さに応じて重み付け",
  "home.set.privacy": "プライバシー用トリミング",
  "home.set.privacyHint": "スタートとゴールで削る距離（m）",
  "home.set.weather": "気温",
  "home.set.weatherOn": "実際の天気を取得",
  "home.set.weatherOff": "何も送信しない",
  "home.set.weatherHint":
    "コースの<strong>中間地点</strong>（約 1 km 単位に丸めたもの）と日付を Open-Meteo に送信します。スタート地点もあなたのデータも、決して送りません。",

  "home.files.title": "2. ファイル",
  "home.files.drop": "ここにファイルをドロップ",
  "home.files.formats": "TCX、GPX、FIT をいくつでも。必要ならシーズン丸ごとでも",
  "home.files.fit":
    "FIT はウォッチのネイティブ形式です。プールの往復ごとの記録と、実際にペアリングされた心拍センサーの情報を含むのは FIT だけです。",
  "home.files.pick": "ファイルを選択",

  "home.export.title": "3. 分析できる記録",
  "home.export.intro":
    "現在のコンテキストウィンドウは 100,000 トークンを楽に扱えるため、初期設定では詳しさを優先しています。モデルの容量が小さい場合や、多くのセッションを読み込む場合は一段下げてください。",
  "home.export.resolution": "データ列の細かさ",
  "home.export.res5s": "5 秒ごとに 1 点（最大）",
  "home.export.res10s": "10 秒ごとに 1 点（推奨）",
  "home.export.res30s": "30 秒ごとに 1 点（軽量）",
  "home.export.res100m": "100 m ごとに 1 点",
  "home.export.res10m": "10 m ごとに 1 点（非常に詳細）",
  "home.export.resNone": "表のみ、連続データ列なし",
  "home.export.resSummary": "短い概要のみ、セッションごとの詳細なし",
  "home.export.coords": "GPS 座標",
  "home.export.coordsDrop": "削除する（推奨）",
  "home.export.coordsKeep": "残す",
  "home.export.coordsHint": "高低差、ペース、心拍数はどちらの場合も残ります。",
  "home.export.questions": "AI に聞くとよい質問",
  "home.export.q1": "気温を考慮して私の心拍ドリフトを分析し、基礎持久力が制限要因かどうか教えてください。",
  "home.export.q2": "インターバルは予定どおりにこなせていますか？次のセッションで何を直すべきですか？",
  "home.export.q3": "センサーごとの期間を分けて比較し、何が変わったか教えてください。",
  "home.export.q4": "この負荷をもとに、来週のトレーニングを提案してください。",
  "home.export.q5": "強度の配分は目標に合っていますか？",
  "home.export.preview": "生成された記録を見る",

  "home.results.title": "4. 詳しく見たい場合の詳細",
  "home.results.overview": "概要",
  "home.results.colFile": "ファイル",
  "home.results.colDate": "日付",
  "home.results.colDist": "距離",
  "home.results.colMoving": "移動時間",
  "home.results.colElapsed": "経過時間",
  "home.results.colSpeed": "ペース / 速度",
  "home.results.colHr": "平均心拍",
  "home.results.colSensor": "センサー",
  "home.results.colDrift": "ドリフト",
  "home.results.colBlocks": "インターバル",
  "home.results.detail": "セッションごとの詳細",
  "home.results.detailIntro":
    "セッションを開くと、それぞれの判定の根拠となった信号を確認できます。特にセンサー判定の評価に役立ちます。どのセッションで胸ストラップを使ったかは、あなただけが知っています。",
  "home.results.load": "トレーニング負荷",
  "home.results.progression": "有酸素能力の推移",
  "home.results.progressionIntro":
    "同じペースでの心拍数の推移。コースにもその日の気分にも左右されない唯一のコンディション指標です。センサーごとに分けて扱います。",
  "home.results.projections": "予測",

  "home.faq.title": "よくある質問",
  "home.faq.q1": "なぜ TCX ファイルは Gemini や ChatGPT にとって大きすぎるのですか？",
  "home.faq.a1":
    "1 Hz で記録した 1 時間の TCX は約 1.7 MB で、その 90% 近くが XML タグです。トークンにすると約 533,000 です。コンテキストウィンドウに収まったとしても、何千行もの生の座標を前にモデルはうまく推論できません。",
  "home.faq.q2": "ファイルはサーバーに送信されますか？",
  "home.faq.a2":
    "いいえ。計算はすべてブラウザ内で行われ、ネットワークタブで確認できます。GPS の軌跡の最初と最後の数点には、自宅の住所がメートル単位で含まれます。ツールは初期設定でそこをトリミングします。",
  "home.faq.q3": "胸ストラップを着けていたかどうかを、ツールはどう判断するのですか？",
  "home.faq.a3":
    "最もわかりやすい目印はケイデンスへの固定です。光学センサーは足の回転を心拍と取り違え、たとえば 140 のところを 172 bpm と表示します。胸ストラップは電気信号を測るため、この誤りは起こりません。さらに、同じ値が続く平坦区間の長さ、拍ごとの細かさ、ペース変化への応答の遅れも手がかりにします。あくまで推定なので、信頼度には上限があり、その値も表示します。",
  "home.faq.q4": "一部のセッションでドリフトが算出されないのはなぜですか？",
  "home.faq.a4":
    "その場合は意味をなさないからです。ドリフトは、<em>持続的な</em>運動の前半と後半の効率を比べるものです。インターバル練習では、速度と心拍数の比がレップとレストの間で揺れ動くため、得られる数値は見せかけにすぎません。ツールは誤解を招く数字を出すより、測れないと伝えることを選びます。",
  "home.faq.q5": "表示される温度は気温ですか？",
  "home.faq.a5":
    "いいえ。センサーは手首にあり、体温で温められるため、通常 3〜8°C 高く表示されます。値は表示しますが、AI に送る記録も含め、必ずこの警告を添えます。",
  "home.faq.q6": "フルマラソンの予測はどのくらい信頼できますか？",
  "home.faq.a6":
    "低めです。これははっきり伝えておくべきことです。市民ランナー 2,303 人を対象とした研究では、Riegel の式はハーフマラソンまではよく合うものの、フルマラソンでは半数のランナーについて少なくとも 10 分速すぎる予測になりました。実際のレース結果に基づくモデルなら、誤差はおよそ半分になります。",
  "home.faq.q7": "対応しているファイル形式は？",
  "home.faq.a7":
    "TCX、GPX、FIT です。<strong>おすすめは FIT</strong>。Garmin、Coros、Wahoo、Suunto の多くのウォッチのネイティブ形式で、プールの往復を 1 本ずつ記録し、ペアリングされた機器の一覧も含む唯一の形式です。そのため、心拍ストラップを着けていたかどうかを推定ではなく確実に判断できます。Garmin Connect の TCX 書き出しでは、水泳セッションの往復がすべて 1 行にまとめられてしまいます。",
  "home.faq.q8": "表示されるペースが Garmin Connect と一致しません",
  "home.faq.a8":
    "これは計算方式の違いで、誤りではありません。ここでのペースは Strava と同じく<strong>移動時間</strong>で計算しており、信号待ちや一時停止は除外されます。Garmin Connect は合計時間で割るため、ペースが遅く表示されます。市街地での 16 km ランなら、差は 1 km あたり 15 秒に簡単に達します。違いがわかるよう 2 つの時間を並べて表示し、AI に送る記録にも使った方式を明記しています。そうしないと、モデルが比較できない数字同士を比べてしまうからです。",
  "home.faq.q9": "獲得標高も一致しません",
  "home.faq.a9":
    "FIT ファイルをアップロードした場合、ツールはウォッチの気圧高度計で測った獲得標高をそのまま使います。TCX や GPX にはこの情報がないため、GPS の高度から計算し直すことになり、通常 30〜50% 過小になります。実際の 16 km ランでは、計算値 61 m に対し実測値は 140 m でした。これも FIT をおすすめする理由の一つです。",
  "home.faq.q10": "検出されたスポーツが間違っているのはなぜですか？",
  "home.faq.a10":
    "ファイルに記録されたスポーツ名は不正確なことが多いため、ツールはそれを信用しません。ランニング区間を含む筋力トレーニングが「ランニング」、プールでのセッションが「その他」と記録されることがあります。そのため分類はデータの形に基づいて行います。各セッションにはレベルが割り当てられます。ランニングとサイクリングは完全な分析、水泳は専用の処理、それ以外はすべて負荷としてのみカウントします。筋力トレーニングは、ペースに意味がなくても回復に影響するからです。",

  "home.refs.title": "計算の根拠",
  "home.refs.intro": "各指標は公表された研究に基づいています。どの研究か、そしてそれぞれが何を言っていないかを示します。",
  "home.refs.minetti":
    "<strong>勾配補正ペース。</strong>Minetti AE, et al. <em>Energy cost of walking and running at extreme uphill and downhill slopes.</em> J Appl Physiol. 2002;93(3):1039–46. <a href=\"https://doi.org/10.1152/japplphysiol.01177.2001\" rel=\"nofollow\">doi</a> · <a href=\"https://pubmed.ncbi.nlm.nih.gov/12183501/\" rel=\"nofollow\">PubMed</a>。トレッドミルで得られた結果で、テクニカルな路面も、長い下りでの筋ダメージも考慮していません。",
  "home.refs.sensors":
    "<strong>心拍センサー間の差。</strong>Gillinov S, et al. Med Sci Sports Exerc. 2017;49(8):1697–703. · Pasadyn SR, et al. Cardiovasc Diagn Ther. 2019;9(4):379–85. <a href=\"https://doi.org/10.21037/cdt.2019.06.05\" rel=\"nofollow\">doi</a>。これらの研究は光学センサーの誤差を測定したもので、ファイルだけからセンサーを見分ける方法は示していません。私たちの判定はそこから導いたもので、検証済みの手法ではありません。",
  "home.refs.riegel":
    "<strong>タイム予測。</strong>Riegel PS. <em>Athletic records and human endurance.</em> American Scientist. 1981;69(3):285–90。世界記録をもとに、平坦なロードで調整されたものです。",
  "home.refs.vickers":
    "<strong>市民ランナー向けの補正。</strong>Vickers AJ, Vertosick EA. <em>An empirical study of race times in recreational endurance runners.</em> BMC Sports Sci Med Rehabil. 2016;8:26. <a href=\"https://doi.org/10.1186/s13102-016-0052-y\" rel=\"nofollow\">doi</a>。レースの記録を練習の記録より重視する直接の理由です。",
  "home.refs.cs":
    "<strong>クリティカルスピード。</strong>Jones AM, et al. <em>Critical power: implications for determination of V̇O₂max and exercise tolerance.</em> Med Sci Sports Exerc. 2010;42(10):1876–90. <a href=\"https://doi.org/10.1249/MSS.0b013e3181d9cf7f\" rel=\"nofollow\">doi</a>。このモデルはクリティカルスピードを無限に維持できると仮定していますが、約 90 分を超えるとその仮定は成り立ちません。",
  "home.refs.coggan":
    "<strong>ノーマライズドパワー、TSS、Pa:Hr ドリフト。</strong>広く採用されているトレーニング手法（Coggan、Friel）ですが、査読付き論文ではありません。この違いは重要です。",
  "home.refs.noteTitle": "これらの文献が保証しないこと",
  "home.refs.note":
    "文献が裏付けるのは計算式であって、結論ではありません。故障したセンサーから正しく計算した数字は、やはり間違っています。痛みがある場合や、トレーニング計画を変える前には、このツールよりも、結果を渡す AI よりも、専門家の意見を優先してください。",
  "home.footer": "MIT ライセンス。アカウント不要、広告なし、トラッカーなし。",

  "js.libError":
    "<strong>ライブラリを読み込めませんでした。</strong><code>npm run dev</code> でページを開いてください。ファイルエクスプローラーから直接開いても動作しません。",
  "js.vigilance": "記録に含まれる注意点：{n} 件",
  "js.indicShort": "参考",
  "js.sensorSummary": "{file} — {label}（信頼度 {confidence}）",
  "js.noSignal": "利用できる信号がありません。",
  "js.signal": "{name}：<b>{value}</b> — {note}",
  "js.lock": "ケイデンスへの固定：<b>{pct}</b>、<b>{n}</b> 区間をドリフトの計算から除外。",
  "js.sets": "検出されたセット：<b>{sets}</b>",
  "js.weather": "気温 <b>{temp}°C</b>{feels}{humidity}{wind} — Open-Meteo",
  "js.weatherFeels": "（体感 {temp}）",
  "js.weatherHumidity": "、湿度 {pct}",
  "js.weatherWind": "、風速 {kmh} km/h",
  "js.drift":
    "ドリフト <b>{pct}</b> {badge}：{min} 分間、ペース {pace} の区間（セッションの {coverage}）— {interpretation}",
  "js.driftNone": "ドリフトは算出していません：{reason}",
  "js.hrr": "心拍の回復：60 秒で <b>{bpm} bpm</b> 低下{erosion}",
  "js.hrrErosion": "、1 本ごとに {bpm} bpm ずつ低下",
  "js.adherence": "<b>{set}</b> — {grade}：{verdicts}",
  "js.progPace": "ペース",
  "js.progSensor": "センサー",
  "js.progPoints": "データ数",
  "js.progTrend": "傾向",
  "js.progReading": "解釈",
  "js.perWeek": "{value} bpm/週",
  "js.progNone":
    "まだ推移を追えません。同じ心拍センサーで、同程度のペースを保ったランニングのセッションが 3 回以上必要です。",
  "js.trendTitle": "{pace} での心拍数 — {source}",
  "js.projDistance": "距離",
  "js.projEstimate": "予測",
  "js.projRange": "幅",
  "js.projReliability": "信頼度",
  "js.projMethod": "方法",
  "js.cs": "クリティカルスピード <b>{pace}/km</b>、D' <b>{d} m</b>、R² <b>{r2}</b>",
  "js.projNone": "予測できません。ランニングのセッションが 1 回以上必要です。",
  "js.redOriginal": "元のファイル",
  "js.redGenerated": "生成された記録",
  "js.redReduction": "削減率",
  "js.redCompat": "対応",
  "js.sizeMb": "{value} MB — 約 {tokens} トークン",
  "js.sizeKb": "{value} KB — 約 {tokens} トークン",
  "js.compatTooBig": "⚠ ChatGPT には大きすぎます。細かさを下げてください",
  "js.compatGemini": "⚠ Gemini のみ",
  "js.compatOk": "✓ ChatGPT、Claude、Gemini に対応",
  "js.truncated": "… プレビューは一部のみです。コピーにはすべて含まれます。",
  "js.download": "記録をダウンロード（.txt）",
  "js.copy": "クリップボードにコピー",
  "js.copied": "コピーしました",
  "js.filename": "gps-digest-training.txt",

  "privacy.title": "プライバシー：ブラウザの外に出るもの、決して出ないもの",
  "privacy.description":
    "GPS ファイルがサーバーに送信されることはありません。計算はすべてブラウザ内で行われます。唯一の例外は天気で、約 1 km 単位に丸めたコースの中間地点を送信します。技術的な詳細をすべて示し、検証できるようにしています。",
  "privacy.ld.q1": "GPS ファイルはサーバーに送信されますか？",
  "privacy.ld.a1":
    "いいえ。読み込みと分析は、ユーザーの端末のブラウザ内で JavaScript により実行されます。ファイルは一切送信されず、開発者ツールのネットワークタブで確認できます。ファイルの内容を含むリクエストはありません。",
  "privacy.ld.q2": "第三者に送信されるものは何ですか？",
  "privacy.ld.a2":
    "有効にした場合の天気のリクエストだけです。小数点以下 2 桁に丸めたコースの中間地点（約 1.1 km の精度）とセッションの日付を Open-Meteo に送ります。通常は自宅にあたるスタート地点や、生理的なデータ、識別子は決して送りません。",
  "privacy.ld.q3": "なぜツールは軌跡の最初と最後をトリミングするのですか？",
  "privacy.ld.a3":
    "GPS の軌跡の最初と最後の数点は、自宅の住所をメートル単位で明かしてしまうからです。このトリミングは初期設定で 250 m に有効化されており、人工知能向けのものを含むあらゆる書き出しの前に適用されます。",
  "privacy.back": "← ツールに戻る",
  "privacy.h1": "プライバシー",
  "privacy.lede":
    "GPS の軌跡には、自宅の住所がメートル単位で含まれています。このページでは、何が端末に残り、何が外に出るのか、そしてそれを自分で確かめる方法を正確に説明します。",
  "privacy.principle.title": "基本方針",
  "privacy.principle.p1":
    "<strong>ファイルが送信されることはありません。</strong>デコードと分析は、お使いの端末のブラウザ内で JavaScript により実行されます。ファイルを受け取るサーバーは存在しません。方針ではなく、そもそもその仕組みがないのです。",
  "privacy.principle.p2":
    "実際、ページを読み込んだ後にインターネット接続を切ってからファイルをドロップしても、分析はできます。失敗するのは天気だけで、それこそが外に出る唯一のものである証拠です。",
  "privacy.table.title": "外に出るもの、出ないもの",
  "privacy.table.colData": "データ",
  "privacy.table.colSent": "送信の有無",
  "privacy.table.file": "ウォッチのファイル",
  "privacy.table.fileText": "<strong>送信しません。</strong>ブラウザがディスクから読み込み、メモリ上で分析します。",
  "privacy.table.track": "GPS の軌跡",
  "privacy.table.never": "<strong>送信しません。</strong>",
  "privacy.table.physio": "心拍数、ペース、パワー",
  "privacy.table.settings": "最大心拍数、閾値ペース、入力したレースタイム",
  "privacy.table.settingsText":
    "<strong>送信しません。</strong>セッション中だけメモリに保持され、タブを閉じると消えます。",
  "privacy.table.dossier": "生成された記録",
  "privacy.table.dossierText":
    "ツールからは<strong>送信しません</strong>。コピーやダウンロードをするのはあなただけで、その後どう使うかはあなた次第です。",
  "privacy.table.midpoint": "コースの中間地点（丸めたもの）",
  "privacy.table.midpointText": "天気を有効にしている場合は<strong>送信します</strong>。詳しくは下記を参照してください。",
  "privacy.weather.title": "天気：唯一の例外",
  "privacy.weather.p1":
    "ウォッチの温度センサーは手首に着けられ、体温で温められるため、3〜8°C 高く表示され、湿度や風も反映しません。ところが暑さは心拍ドリフトの最大の交絡要因です。実際の気温がわからないと、暑さによる通常のコストを不調のせいにしてしまいます。",
  "privacy.weather.p2": "そのため、リクエストは位置情報として使えないように作られています。",
  "privacy.weather.midTitle": "送るのはコースの中間地点で、スタート地点は決して送らない",
  "privacy.weather.midText": "スタート地点はあなたの自宅です。中間地点はどこにでもある場所で、あなたが寝ている場所とは関係ありません。",
  "privacy.weather.roundTitle": "座標は小数点以下 2 桁に丸める",
  "privacy.weather.roundText":
    "精度は約 1.1 km です。天気は地域的な現象なので精度は失われず、リクエストが特定の場所を指すこともなくなります。",
  "privacy.weather.nothingTitle": "ほかには何も添付しない",
  "privacy.weather.nothingText":
    "心拍数も、ペースも、軌跡も、識別子も、cookie もありません。丸めた緯度と経度、そして日付だけです。リクエスト全体は次のとおりです。",
  "privacy.weather.recipient":
    "送信先はオープンな天気サービスの <a href=\"https://open-meteo.com\" rel=\"nofollow noopener\">Open-Meteo</a> です。この機能はトップページのプルダウンメニューでオフにでき、オフにしてもツールは動作します。",
  "privacy.trim.title": "自宅付近のトリミング",
  "privacy.trim.text":
    "軌跡の最初と最後の数点は、あなたの家の玄関を明かしてしまいます。ツールはあらゆる分析と書き出しの前に、スタートとゴールの両方で<strong>初期設定では 250 m</strong> を削除します。この設定は変更でき、高低差、ペース、心拍数を残したまま座標を完全に削除するオプションもあります。",
  "privacy.note.title": "私たちが管理できないこと",
  "privacy.note.text":
    "ChatGPT、Gemini、Claude にコピーした記録は、貼り付けた時点でブラウザの外に出て、私たちではなくそのサービスの規約に従うことになります。記録に座標が残っていれば、それも一緒に送られます。書き出し時に「座標を削除する」オプションが初期設定で有効になっているのは、まさにそのためです。",
  "privacy.dont.title": "私たちがしないこと",
  "privacy.dont.1": "アカウントなし、登録なし、パスワードなし。",
  "privacy.dont.2": "cookie なし、広告トラッカーなし、ピクセルなし。",
  "privacy.dont.3": "広告がないので、何かを収集する動機もありません。",
  "privacy.dont.4": "データの転売なし。そもそも転売するデータがありません。",
  "privacy.dont.analytics":
    "アクセス解析を導入する場合も、cookie や永続的な識別子は使わず、事前にこのページを更新します。",
  "privacy.verify.title": "自分で確かめる",
  "privacy.verify.p1":
    "私たちの言葉をうのみにしないでください。ブラウザの開発者ツール（<code>F12</code>）を開き、<strong>ネットワーク</strong>タブを表示してからファイルをドロップしてください。表示されるのはページの読み込みと、天気を有効にしている場合の <code>open-meteo.com</code> へのリクエストだけです。ほかには何もありません。ファイルの内容を含むリクエストはありません。",
  "privacy.verify.p2":
    "<a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">ソースコードは公開されています</a>（MIT ライセンス）。ページが何をしているか、1 行ずつ確認できます。",
  "privacy.rights.title": "あなたの権利",
  "privacy.rights.text":
    "個人データを収集も保存もしないため、閲覧・訂正・削除の対象となる記録は存在しません。タブを閉じればすべて消えます。質問がある場合は、上記の GitHub リポジトリでディスカッションを始めてください。",
  "privacy.footerTool": "ツール",
  "privacy.updated": "最終更新日：<time datetime=\"2026-09-29\">2026 年 9 月 29 日</time>。",
  "common.blog": "ブログ",
  "home.why.more":
    "AI に生のファイルではなく構造化された記録が必要な理由：<a href=\"{{href:post-ia-analyse.html}}\">記事を読む</a>。",

  "blog.title": "gps-digest ブログ：トレーニング、ウォッチのデータ、AI",
  "blog.description":
    "AI によるトレーニング分析についての記事。ChatGPT、Gemini、Claude があなたのセッションで何ができるのか、そして本当に使えるデータをどう渡すのかを解説します。",
  "blog.lede": "トレーニング、ウォッチのデータ、そして人工知能。数字に基づいた短い記事で、データが裏付けられない約束はしません。",
  "blog.readMore": "記事を読む",

  "post.title": "ChatGPT でランニングを分析する：トークンの落とし穴",
  "post.description":
    "AI はトレーニングの分析が得意ですが、1 時間分の TCX ファイルは 533,000 トークンにもなります。なぜうまくいかないのか、そして 3 分で解決する方法を紹介します。",
  "post.kicker": "トレーニングと AI",
  "post.h1": "ChatGPT はランニングのセッションを分析できる。ただし、データを読めればの話。",
  "post.meta": "公開日：<time datetime=\"2026-09-28\">2026 年 9 月 28 日</time> · 約 7 分で読めます",
  "post.lede":
    "火曜日のインターバルがなぜあんなにきつかったのか。AI に聞けば、たいていのトレーニングアプリよりも良い答えが返ってきます。ただし条件があります。AI があなたのデータを本当に見られることです。そして問題はまさにそこにあり、その理由は想像とは違います。",
  "post.tldrTitle": "要点",
  "post.tldr1":
    "ChatGPT、Gemini、Claude は、セッションを解釈し、目標と結びつけ、続けて出る質問にも答えられます。いつでも相談できるコーチのような存在です。",
  "post.tldr2": "1 Hz で記録した 1 時間の TCX ファイルは約 1.7 MB、トークンにして約 533,000 で、その 90% 近くが XML タグです。",
  "post.tldr3": "ファイルを渡せたとしても、何千行もの生の座標を前にモデルはうまく推論できません。",
  "post.tldr4":
    "解決策は圧縮ではなく、構造を組み替えることです。スプリット、ラップ、ゾーン、レップ。そうすれば 1 セッションは約 5,800 トークンに収まり、分析の質も上がります。",

  "post.why.title": "なぜ AI はトレーニングの良きパートナーになるのか",
  "post.why.p1":
    "AI はダッシュボードではなく、あなたの質問から出発するからです。アプリは誰にでも同じグラフを見せます。AI なら、暑さや忙しかった 1 週間、あなたが伝えた目標を踏まえて、8 km 地点でペースが落ちた理由を説明できます。",
  "post.why.listIntro": "良いデータがあれば、AI は次のことができます。",
  "post.why.li1": "専門用語を使わず、わかりやすい言葉でセッションを説明する",
  "post.why.li2": "数字を目標と結びつける（10km で 45 分切りと初めてのフルマラソンでは、必要な練習がまったく違います）",
  "post.why.li3": "数週間分を比べて、見落としていた傾向を見つける",
  "post.why.li4": "次の質問にも、その次の質問にも、夜 11 時でも付き合ってくれるコーチのように根気よく答える",
  "post.why.li5": "汎用的な計画ではなく、実際のトレーニング負荷をもとに翌週のメニューを提案する",
  "post.why.p2":
    "この個別最適化こそが違いを生みます。ただし、それはほとんど誰も確かめていない前提の上に成り立っています。モデルが 3 行の要約や読めないファイルではなく、あなたの本当のデータにアクセスできているという前提です。",

  "post.tokens.title": "トークンとは何か、なぜウォッチはそれほど多く生み出すのか",
  "post.tokens.p1":
    "トークンとは、言語モデルが読み取り、課金の単位にするテキストの断片です。単語や数字、句読点の一部にあたります。どのモデルにも上限（コンテキストウィンドウ）があり、それを超えると何も読めません。モデルや契約プランによって、現在は数万から数百万トークンまでさまざまです。",
  "post.tokens.p2":
    "問題は、ウォッチのファイルがソフトウェア向けに作られていて、読むためのものではないことです。TCX ファイルは、走った 1 秒ごとに同じ XML タグを繰り返します。私たちのテストで測った結果は次のとおりです。",
  "post.tokens.colCase": "データ",
  "post.tokens.colSize": "サイズ",
  "post.tokens.colTokens": "推定トークン数",
  "post.tokens.r1": "1 時間のセッション、生の TCX ファイル",
  "post.tokens.r1size": "1.7 MB",
  "post.tokens.r1tokens": "≈ 533,000",
  "post.tokens.r2": "同じセッションを構造化した記録",
  "post.tokens.r2size": "≈ 18 KB",
  "post.tokens.r2tokens": "≈ 5,800",
  "post.tokens.r3": "実際のファイル 15 MB 分、生データ",
  "post.tokens.r3size": "15 MB",
  "post.tokens.r3tokens": "≈ 470 万",
  "post.tokens.r4": "同じファイルを構造化した記録",
  "post.tokens.r4size": "≈ 100 KB",
  "post.tokens.r4tokens": "≈ 32,000",
  "post.tokens.note":
    "1 トークンあたり 3.2 文字で推定。数値の CSV で観測された比率です。測定はソースコードで公開しているテストで再現できます。",
  "post.tokens.p3":
    "つまり、生データのセッション 1 回分だけで一般向けプランの上限に達することがあり、シーズン丸ごとのデータはどこにも収まりません。",

  "post.paste.title": "TCX ファイルを ChatGPT に貼り付けると何が起きるか",
  "post.paste.intro": "考えられる展開は 3 つ。どれも良い結果にはなりません。",
  "post.paste.h1": "1. ファイルが受け付けられない",
  "post.paste.p1": "いちばん正直なケースです。画面にファイルが大きすぎると表示されます。時間は無駄になりますが、少なくとも状況はわかります。",
  "post.paste.h2": "2. ファイルの一部しか読まれず、それを知らされない",
  "post.paste.p2":
    "大きな添付ファイルの場合、AI アシスタントは一部だけを読んだり、要約するスクリプトに任せたりすることがよくあります。すると AI は、セッションの一部だけをもとに自信たっぷりに答えます。答えはもっともらしく見えます。でも正しいとは限りません。",
  "post.paste.h3": "3. ファイルは読み込めるが、分析の質が低い",
  "post.paste.p3":
    "コンテキストウィンドウが大きくても、長い文書の途中に埋もれた情報をモデルはうまく活用できません。スタンフォード大学の研究者たちは、この現象を「lost in the middle」と名付けて報告しています（Liu ほか、2024 年）。3,600 行の緯度と経度からトレーニング分析をさせるのは、苦手な暗算を、ほとんど何も教えてくれないデータでやらせるのと同じです。",

  "post.restructure.title": "ファイルは圧縮すべきか？いいえ、構造を組み替えるべきです",
  "post.restructure.p1":
    "ファイルを小さくするだけでは足りません。読める形にする必要があります。コーチは GPS 座標を 1 秒ずつ読んだりしません。見るのは 1 km ごとのタイム、各レップ、ゾーン別の心拍数です。それこそが、言語モデルが理解できる形です。",
  "post.restructure.colRaw": "生のファイルの中身",
  "post.restructure.colDossier": "構造化した記録の中身",
  "post.restructure.r1raw": "緯度・経度・高度が 3,600 行",
  "post.restructure.r1dossier": "1 km ごとのスプリット、ラップ、ゾーンごとの時間",
  "post.restructure.r2raw": "1 秒ごとの心拍数",
  "post.restructure.r2dossier": "計算済みの心拍ドリフトと、その測定区間",
  "post.restructure.r3raw": "心拍センサーについての情報なし",
  "post.restructure.r3dossier": "胸ストラップか手首か、信頼度付きで",
  "post.restructure.r4raw": "各データ点で繰り返される XML タグ",
  "post.restructure.r4dossier": "単位が明記された CSV の表",
  "post.restructure.p2":
    "実際のファイル 15 MB 分で、構造化した記録は約 32,000 トークンです。しかも分析の質は、元のファイルをそのまま渡すより高くなります。安くなるだけでなく良くなるのは、モデルが理解できるものを扱うからです。",

  "post.blind.title": "AI が自分では見抜けないことは何か",
  "post.blind.p1": "数字を見ただけではわからない誤りがあります。誰も指摘しなければ、AI はそれを事実として受け取り、その上に分析を組み立ててしまいます。",
  "post.blind.li1":
    "<strong>心拍センサー。</strong>手首のセンサーは、ときどき足の回転を心拍と取り違え、140 のところを 172 bpm と表示します。手首で測ったセッションと胸ストラップのセッションを比べるのは、2 つの測定器を比べることであって、2 つのコンディションを比べることではありません。",
  "post.blind.li2":
    "<strong>気温。</strong>ウォッチの温度センサーは手首の熱で温められ、気温より 3〜8°C 高く表示されます。これを天気として扱う AI は、心拍ドリフトの原因を取り違えます。",
  "post.blind.li3":
    "<strong>ペース。</strong>Strava は移動時間で、Garmin Connect は合計時間で計算します。市街地のランでは、その差は 1 km あたり 15 秒を簡単に超えます。",
  "post.blind.li4":
    "<strong>意味のない指標。</strong>インターバル練習で計算した心拍ドリフトには意味がありません。もっともらしく見える間違った数字より、数字がないほうがましです。",
  "post.blind.p2": "良い記録は要約するだけではありません。何が信頼でき、何ができないかを示し、AI が砂の上で推論しないようにします。",

  "post.howto.title": "3 分で AI にセッションを分析させるには",
  "post.howto.step1": "<strong>ファイルを書き出す</strong>：ウォッチや Strava から。いちばん情報が多い FIT 形式がおすすめです。",
  "post.howto.step2": "<strong>gps-digest にドロップする。</strong>計算はすべてブラウザ内で行われ、ファイルがサーバーに送られることはありません。",
  "post.howto.step3": "<strong>記録をコピーする</strong>：ChatGPT、Gemini、Claude に貼り付けて、質問します。",
  "post.howto.cta": "AI 用にセッションを準備する",

  "post.prompts.title": "AI にどんな質問をすればいいか",
  "post.prompts.intro": "良い質問は、本当の疑問から生まれます。構造化した記録と相性の良い例を 5 つ紹介します。",
  "post.prompts.q1": "「気温が同じくらいの日で比べて、先月より心拍ドリフトは大きくなっている？」",
  "post.prompts.q2": "「火曜日のレップは目標ペースを守れていた？次は何を直せばいい？」",
  "post.prompts.q3": "「この練習量で、6 週間後に 10km で 45 分を切れそう？」",
  "post.prompts.q4": "「ジョグとポイント練習の配分は、フルマラソンに向けて適切？」",
  "post.prompts.q5": "「今の疲労度を考えて、来週のメニューを組んで。」",

  "post.faq.title": "よくある質問",
  "post.faq.q1": "ChatGPT は FIT や TCX のファイルを直接読めますか？",
  "post.faq.a1":
    "開くことはできますが、うまく活用はできません。FIT はバイナリ形式なので AI はスクリプトでデコードする必要があり、1 時間分の TCX は約 533,000 トークンになります。どちらの場合も、分析は一部の抜粋か、分析に向かない生データに基づくことになります。構造化した記録なら、どちらの問題も解決します。",
  "post.faq.q2": "Garmin Connect から CSV を書き出すだけではだめですか？",
  "post.faq.a2":
    "その書き出しは基本的にラップの情報だけだからです。心拍ドリフトも、センサーの判定も、レップごとの詳細も含まれていません。ペースの計算方法など、誤解を防ぐための前提情報もありません。",
  "post.faq.q3": "データはどこかに送信されますか？",
  "post.faq.a3":
    "いいえ。ファイルはブラウザ内で読み込まれ、分析されます。端末の外に出るのは、あなた自身が AI にコピーした記録だけで、GPS 座標は初期設定で削除されます。",
  "post.faq.q4": "AI はコーチの代わりになりますか？",
  "post.faq.a4":
    "なりませんし、それが目的でもありません。AI は説明し、比較し、提案しますが、あなたが走る姿を見ることも、痛みを感じることもできません。けがや深刻な不安があるときは、専門家の意見を優先してください。",
  "post.faq.q5": "ChatGPT、Gemini、Claude のどれを使えばいいですか？",
  "post.faq.a5":
    "3 つとも構造化した記録を分析できます。本当の違いは、契約プランのコンテキストウィンドウの大きさです。1 セッションあたり数千トークンの記録なら、どれを選ぶかはもう問題になりません。",

  "post.sources.title": "出典",
  "post.sources.liu":
    "Liu NF, et al. <em>Lost in the Middle: How Language Models Use Long Contexts.</em> Transactions of the Association for Computational Linguistics, 2024. <a href=\"https://arxiv.org/abs/2307.03172\" rel=\"nofollow\">arXiv:2307.03172</a>。",
  "post.sources.bench":
    "サイズとトークン数の測定：gps-digest のテスト。再現可能で、<a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">公開ソースコード</a>に含まれています。",

  "post.end.title": "次のセッションには、ありきたりのグラフ以上の分析を",
  "post.end.text":
    "ウォッチのファイルを、ChatGPT、Gemini、Claude が本当に分析できる記録に変換しましょう。無料、アカウント不要、ファイルはブラウザの外に出ません。",
  "post.end.cta": "gps-digest を試す",
  "privacy.analytics.row": "アクセス統計",
  "privacy.analytics.rowText":
    "<strong>送信します（匿名）。</strong>Cloudflare Web Analytics がページビューを数えます。cookie も永続的な識別子も使いません。ファイルやセッションの情報は含まれません。",
  "privacy.analytics.active":
    "アクセス解析には Cloudflare Web Analytics を使っています。cookie も永続的な識別子も使わず、ファイルのデータも一切含みません。数えるのはページビュー、国、流入元、端末の種類で、個人を追跡することはありません。",
  "privacy.verify.p1Analytics":
    "私たちの言葉をうのみにしないでください。ブラウザの開発者ツール（<code>F12</code>）を開き、<strong>ネットワーク</strong>タブを表示してからファイルをドロップしてください。表示されるのは、ページの読み込み、<code>cloudflareinsights.com</code> へのアクセス解析のリクエスト、そして天気を有効にしている場合の <code>open-meteo.com</code> へのリクエストだけです。ほかには何もありません。ファイルの内容を含むリクエストはありません。",
};
