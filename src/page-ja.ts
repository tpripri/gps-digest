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

  "home.title": "ガーミン（Garmin）や Strava のデータを ChatGPT で分析 — gps-digest",
  "home.description":
    "Garmin・Strava・Apple Watch のトレーニングを書き出して、ChatGPT・Claude・Gemini に分析させましょう。無料・登録不要で、すべてブラウザ内で完結します。",
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
    "いいえ。計算はすべてブラウザ内で行われ、ファイルがサーバーを経由することはありません。ネットワークタブで確認できます。GPS の軌跡は自宅の住所をメートル単位で明かしてしまうため、記録からは初期設定で座標を削除します。",
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
    "<strong>ファイルはブラウザの外に出ません。</strong>計算はすべてお使いの端末で行われ、ネットワークタブで確認できます。GPS の軌跡は住所をメートル単位で明かしてしまうため、記録からは初期設定で座標を削除します。<a href=\"{{href:confidentialite.html}}\">外に出るもの、決して出ないもの</a>。",
  "home.step1.title": "Strava のアーカイブをダウンロード",
  "home.step1.text": "<a href=\"https://www.strava.com/account\" rel=\"noopener\">strava.com/account</a> の「Download your account」から申請します。通常は数時間以内に ZIP がメールで届きます。急いでいる、または Strava を使っていない場合は、個別に書き出しましょう：<a href=\"{{href:guide-garmin.html}}\">Garmin</a> · <a href=\"{{href:guide-strava.html}}\">Strava</a> · <a href=\"{{href:guide-apple.html}}\">Apple Watch</a>。",
  "home.step1.badge":
    "おすすめ",
  "home.step2.title": "ZIP をそのままここにドロップ",
  "home.step2.text": "直近 12 か月分を使い、写真やルートは無視します。計算はすべてブラウザ内で行われ、ファイルがどこかに送信されることはありません。",
  "home.step3.title": "記録を AI に貼り付ける",
  "home.step3.text": "ChatGPT・Claude・Gemini・Vibe に、質問と一緒に貼り付けます。<a href=\"{{href:post-ia-coach.html}}\">何を聞けばいい？</a>",

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

  "home.set.title": "分析を細かく調整（任意）：最大心拍数、最近のレース結果、天気",
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
  "home.set.privacy": "プライバシーゾーン",
  "home.set.privacyHint": "座標を残す場合に位置を消去する半径（m）。セッションを切り詰めることはありません。",
  "home.set.lthr":
    "閾値心拍数",
  "home.set.lthrHint":
    "bpm。最も信頼できる基準",
  "home.set.lthrPlaceholder":
    "例：160",
  "home.set.restHr":
    "安静時心拍数",
  "home.set.restHrHint":
    "bpm。予備心拍数モデルで使用",
  "home.set.zoneModel":
    "心拍ゾーン",
  "home.set.zoneAuto":
    "自動（閾値がわかれば閾値、なければ最大心拍数）",
  "home.set.zoneMax":
    "最大心拍数の %",
  "home.set.zoneReserve":
    "予備心拍数の %",
  "home.set.zoneThreshold":
    "閾値心拍数の %",
  "home.set.weather": "気温",
  "home.set.weatherOn": "実際の天気を取得",
  "home.set.weatherOff": "何も送信しない",
  "home.set.weatherHint":
    "コースの<strong>中間地点</strong>（約 1 km 単位に丸めたもの）と日付を Open-Meteo に送信します。スタート地点もあなたのデータも、決して送りません。",

  "home.files.title": "ファイル",
  "home.reads.title":
    "ガイドと記事",
  "home.files.drop": "ここにファイルをドロップ",
  "home.files.formats": "Strava のアーカイブ全体、Garmin の ZIP、FIT・TCX・GPX ファイル：どれもそのままドロップできます。",
  "home.files.fit":
    "FIT はウォッチのネイティブ形式です。プールの往復ごとの記録と、実際にペアリングされた心拍センサーの情報を含むのは FIT だけです。",
  "home.files.pick": "ファイルを選択",
  "home.archive.period":
    "分析する期間：",
  "home.archive.p3m":
    "直近 3 か月",
  "home.archive.p6m":
    "直近 6 か月",
  "home.archive.p1y":
    "直近 12 か月",
  "home.archive.p2y":
    "直近 2 年",
  "home.archive.pAll":
    "全期間",

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
    "いいえ。計算はすべてブラウザ内で行われ、ネットワークタブで確認できます。GPS の軌跡は自宅の住所をメートル単位で明かしてしまうため、記録からは初期設定で座標を削除します。座標を残す場合は、プライバシーゾーンがスタートとゴール付近の位置を消去します。",
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
    "<strong>ツールを読み込めませんでした。</strong>接続を確認して、ページを再読み込みしてください。社内ネットワークでは、セキュリティフィルターがサイトをブロックしている場合があります。別の回線でお試しください。",
  "js.archiveNote":
    "<strong>アーカイブ：</strong>{total} 件中 {kept} セッションを使用。直近 {days} 日分はセッションごとに詳細を記載し、それ以外の期間は記録に 1 セッション 1 行でまとめています。",
  "js.archiveProgress":
    "アーカイブを読み込み中：{n} セッションを使用（{read} ファイル読み込み済み）…",
  "js.olderInTable":
    "直近 {days} 日のセッションのみ詳細を表示しています。それより前の {n} セッションはセッション一覧と記録に含まれています。",
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
  "privacy.ld.q3": "ツールは自宅の住所をどう守っていますか？",
  "privacy.ld.a3":
    "GPS の軌跡の最初と最後のポイントは、自宅の住所をメートル単位で明かしてしまいます。初期設定では、記録に座標は一切含まれません。座標を残す場合は、調整可能なプライバシーゾーンがスタートとゴール付近の位置を消去します。セッションは切り詰めないので、距離・時間・各種計算はすべて完全なままです。",
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
  "privacy.trim.title": "プライバシーゾーン",
  "privacy.trim.text":
    "軌跡の最初と最後のポイントは、自宅の玄関を明かしてしまいます。初期設定では<strong>記録に座標は一切含まれません</strong>。高低差、ペース、心拍数があれば分析には十分です。座標を残す場合は、プライバシーゾーンを設定してください。スタートとゴールからその半径内の位置は、途中で自宅付近を再び通った場合も含めて消去されます。セッションが切り詰められることはなく、距離・時間・各種計算は記録全体が対象で、そのことは AI にも記録の中で伝えます。",
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
  "post.next":
    "こうした質問を、毎週の継続的なサポートにつなげるには：<a href=\"{{href:post-ia-coach.html}}\">ChatGPT・Claude・Gemini・Vibe で AI コーチを設定する</a>。",

  "coach.title": "ChatGPT・Claude・Gemini・Vibe をランニングコーチとして使う方法",
  "coach.description":
    "アスリートシート、コピペで使えるコーチ用ルール、ChatGPT・Claude・Gemini・Vibe での設定手順、そしてトレーニングデータを無料で渡す方法。",
  "coach.kicker": "実践ガイド",
  "coach.h1": "ChatGPT・Claude・Gemini・Vibe をあなたのランニングコーチにする",
  "coach.meta": "公開日：<time datetime=\"2026-09-29\">2026 年 9 月 29 日</time> · 約 11 分で読めます",
  "coach.lede":
    "あなたのセッション、目標、そして痛めやすいふくらはぎまで知っていて、夜 11 時でも相談でき、追加料金もかからないコーチ。AI アシスタントが約束するのは、そんな存在です。この約束は守られますが、条件が 2 つあります。一度きちんと状況を伝えておかないと、毎回初対面の相手のように扱われます。そして、セッションのデータを渡す必要があります。これが見た目よりずっと難しいのです。",
  "coach.tldr1":
    "AI が良いコーチになるには 3 つのものが必要です。あなたのプロフィール、実際のセッションデータ、そして守るべきルール。これがないと、汎用的なプランを繰り返すだけです。",
  "coach.tldr2":
    "いちばん難しいのは、セッションデータを渡すことです。Strava の公式コネクタは有料で、Claude でしか使えません。ファイルのエクスポートは無料でどこでも使えますが、生のファイルは重すぎるので圧縮が必要です。",
  "coach.tldr3":
    "ChatGPT・Claude・Vibe には「プロジェクト」、Gemini には「Gem」があり、アスリートシートとルールを会話をまたいで保持できます。どれも無料版で使えます。",
  "coach.tldr4":
    "効果的な習慣は、週に 1 回、新しい会話でセッションデータと体調の一言を添えて振り返ること。そして主導権は手放さないこと。AI はあなたに同調しがちです。",

  "coach.can.title": "AI は本当にコーチになれるのか？",
  "coach.can.p1":
    "なれます。セッションを読み解き、目標と結びつけ、次のメニューを調整するという、コーチの仕事の大部分については。なれません。あなたを直接見たり触れたりする必要があることについては。境界ははっきりしているので、始める前に知っておく価値があります。",
  "coach.can.goodIntro": "AI が得意なこと：",
  "coach.can.good1": "セッションを分析し、狙いどおりだったかを数字で示す",
  "coach.can.good2": "出張、風邪、長引く会議など、予定が崩れたときに 1 週間を組み直す",
  "coach.can.good3": "各セッションの意図を説明する（既製のプランの多くはこれをしません）",
  "coach.can.good4": "夜 11 時でも、10 個目の質問に嫌な顔ひとつせず答える",
  "coach.can.badIntro": "AI にはできないこと：",
  "coach.can.bad1": "あなたの走りを見ること。だからフォームや姿勢は直せない",
  "coach.can.bad2": "あなたが口で言う以上に疲れていると気づくこと",
  "coach.can.bad3": "痛みを診断すること",
  "coach.can.p2":
    "いつでも相談に乗ってくれるけれど、あなたの走りを一度も見たことがないコーチだと考えてください。AI があなたについて知っているのは、あなたが読ませた内容だけです。そこで、次の話になります。",

  "coach.need.title": "始める前に、AI コーチが知っておくべきことは？",
  "coach.need.p1": "3 つあります。1 つでも欠けると、アドバイスの質が一気に落ちます。",
  "coach.need.li1":
    "<strong>あなたのプロフィール。</strong>レベル、目標、制約、弱点。これがないと、AI はあなたを「平均的なランナー」として扱います。そんな人は存在しません。",
  "coach.need.li2":
    "<strong>実際のセッション。</strong>記憶ではなく、データです。いちばん用意しにくい材料なので、このあと詳しく説明します。",
  "coach.need.li3":
    "<strong>守るべきルール。</strong>どう考えるか、何を断るか、どんな形で答えるか。これがコーチと「アドバイスの自動販売機」の違いです。",
  "coach.sheet.title": "アスリートシート（一度書けば OK）",
  "coach.sheet.intro":
    "このテンプレートをコピーし、5 分で記入してテキストファイルに保存しましょう。レースのあとや目標が変わったときに更新します。",
  "coach.sheet.text":
    "アスリートシート\n年齢、性別、ランニング歴：\n現在の走行量（週あたりの km と回数）：\n直近 12 か月のベスト（5 km、10 km、ハーフ、フル）：\n最大心拍数と安静時心拍数（わかれば）：\n目標（大会、距離、日付、目標タイム）：\n練習できる日時（曜日、1 回の最長時間）：\n過去のけがと弱い部位：\n機材（ウォッチ、胸ストラップまたは手首の心拍センサー）：\n練習で好きなこと、嫌いなこと：",

  "coach.data.title": "AI コーチにセッションデータをどう渡すか？",
  "coach.data.p1":
    "ほとんどのガイドが触れないステップで、しかもいちばん難しいところです。AI にはあなたのウォッチが見えません。セッションを届けるのはあなたです。方法は 2 つあり、コストは同じではありません。",
  "coach.data.strava.title": "Strava コネクタ：便利だが有料、しかも Claude 専用",
  "coach.data.strava.p":
    "2026 年 6 月から、Strava は公式コネクタ（MCP サーバー）を提供しており、Claude があなたの履歴を直接読めるようになりました。エクスポート不要で、AI が必要なデータを自分で取りに行くので快適です。ただし Strava の有料サブスクリプションが必要で、コネクタが使えるのは Claude だけです。Strava はほかのアシスタントへの対応を「今後」と約束していますが、時期は未定です。ChatGPT・Gemini・Vibe 向けの Strava 公式コネクタは現時点でなく、非公式のものは技術的な設定が必要です。",
  "coach.data.garmin.title":
    "Garmin 向けのサードパーティサービス：仲介役を挟むもう一つの方法",
  "coach.data.garmin.p":
    "Garmin 側では、サードパーティのサービスが橋渡しをしています。Garmin の公式パートナーである Tredict は、無料の ChatGPT アカウントでも使える ChatGPT 内のアプリと、Claude 向けの MCP サーバーを提供しています。Shape も同様のことを月 5 ドルで提供していますが、ChatGPT の有料プランが必要です。どちらの場合も、第三者のアカウントを作り、Garmin のデータを預けることになります。ワークアウトをウォッチに送りたい場合には便利です。走りを分析してもらうだけなら、エクスポートは無料で、誰も経由しません。",
  "coach.data.export.title": "ファイルのエクスポート：無料で万能、ただし圧縮が条件",
  "coach.data.export.p1":
    "Garmin Connect、COROS、Polar Flow、Strava はいずれも、セッションを FIT・TCX・GPX 形式で無料エクスポートできます。このファイルは無料版を含むあらゆる AI で使えます。落とし穴はサイズです。1 時間のランニングの TCX は約 533,000 トークンあり、1 セッションだけで無料版の上限に達しかねません（<a href=\"{{href:post-ia-analyse.html}}\">理由はこちら</a>）。",
  "coach.data.export.p2":
    "解決策は、AI に渡す前にファイルを圧縮し、構造を組み替えることです。gps-digest は 1 セッションを約 5,800 トークンの記録にまとめます。スプリット、ゾーン、レップ、心拍ドリフト、センサーの信頼性まで入っています。無料でも有料でも、どのアシスタントも最後まで読めます。",
  "coach.data.colStrava": "Strava コネクタ",
  "coach.data.colExport": "エクスポート + gps-digest",
  "coach.data.r1": "費用",
  "coach.data.r1strava": "Strava の有料サブスクリプション",
  "coach.data.r1export": "無料",
  "coach.data.r2": "対応アシスタント",
  "coach.data.r2strava": "現時点では Claude のみ",
  "coach.data.r2export": "すべて：ChatGPT・Claude・Gemini・Vibe など",
  "coach.data.r3": "手間",
  "coach.data.r3strava": "接続後は不要",
  "coach.data.r3export": "週 1 回のエクスポートとドラッグ＆ドロップ",
  "coach.data.r4": "AI が受け取るもの",
  "coach.data.r4strava": "Strava のデータ（要約または 1 秒ごと）",
  "coach.data.r4export": "計算済みの記録：ゾーン、レップ、ドリフト、センサーの信頼性",
  "coach.data.r5": "GPS 座標",
  "coach.data.r5strava": "AI が読める",
  "coach.data.r5export": "初期設定で削除",
  "coach.data.p3":
    "Strava の有料会員で Claude を使っているなら、コネクタで週に数分を節約できます。それ以外の人は、無料のエクスポートで十分うまくいきます。AI に渡す前にファイルを圧縮するだけです。",

  "coach.rules.title": "コピペで使えるコーチ用の指示",
  "coach.rules.intro":
    "このテキストが AI のふるまいを決めます。あえて短くしてあります。どのルールも、言語モデルの既知のクセを 1 つずつ正すためのものです。",
  "coach.rules.text":
    "あなたは私のランニングコーチです。私のセッションを分析し、目標への進み具合を追い、毎週トレーニングを調整してください。\n\n私のプロフィールはアスリートシートにあります。セッションは gps-digest の記録として渡します。\n\nルール：\n1. すべての指摘は記録の数字に基づき、その数字を引用すること。\n2. データが欠けている、または信頼できない場合は、推測せずにそう伝えること。\n3. 率直であること。セッションが失敗だった、または目標が非現実的なら、はっきり言うこと。\n4. 私の実際の走行量から出発し、負荷を増やすときは必ず理由を示すこと。\n5. 続く痛み、悪化する痛み、走り方が変わる痛みを私が訴えたら、プランを出す代わりに医療の専門家に相談するよう伝えること。\n6. 判断に必要な情報が足りなければ、私に質問すること。\n7. 振り返りの最後は、具体的な行動を最大 3 つにまとめること。",
  "coach.rules.note":
    "ルール 1 と 2 は、AI がもっともらしい数字で穴埋めするのを防ぎます。ルール 3 は、あなたに同調しがちな傾向への対策です。ルール 4 は野心的すぎるプランに歯止めをかけます。ルール 5 は、チャットボットは医師ではないという念押しです。",
  "coach.copy": "コピー",
  "coach.copied": "コピーしました",

  "coach.setup.title": "ChatGPT・Claude・Gemini・Vibe でコーチを設定するには？",
  "coach.setup.intro":
    "4 つのアシスタントにはどれも、シートとルールを会話をまたいで保持できる専用スペースがあります。毎回貼り直す必要はありません。",
  "coach.setup.colTool": "アシスタント",
  "coach.setup.colWhere": "コーチの置き場所",
  "coach.setup.colPlus": "ランナーにとっての強み",
  "coach.setup.gpt.where": "プロジェクト（指示とファイル）",
  "coach.setup.gpt.plus": "音声モードで、帰り道に声で振り返りができる",
  "coach.setup.claude.where": "プロジェクト（指示とナレッジ）",
  "coach.setup.claude.plus": "週のプランを独立したドキュメントとして出せるので、使い回しやすい",
  "coach.setup.gemini.where": "Gem（指示と知識）",
  "coach.setup.gemini.plus": "Google ドライブや Google カレンダーと連携",
  "coach.setup.vibe.where": "プロジェクト（指示とファイル）",
  "coach.setup.vibe.plus": "欧州の事業者：パリに本社を置く Mistral AI",
  "coach.setup.gpt.title": "ChatGPT：プロジェクトを作る",
  "coach.setup.gpt.text":
    "サイドバーで新しいプロジェクトを作ります（名前は「ランニングコーチ」など）。ルールを<strong>プロジェクトの指示</strong>に貼り付け、アスリートシートをプロジェクトの<strong>ファイル</strong>に追加します。このプロジェクトで開く会話はすべて、この前提から始まります。無料版はプロジェクトあたりのファイル数に上限があるので、枠はシートに使い、セッションの記録は会話に直接貼り付けましょう。",
  "coach.setup.claude.title": "Claude：プロジェクトを作る",
  "coach.setup.claude.text":
    "プロジェクトを作り、ルールを<strong>指示</strong>に貼り付け、アスリートシートを<strong>ナレッジ</strong>にアップロードします。プロジェクト内の新しい会話は、どれも両方を読んだ状態で始まります。無料版はプロジェクト数と容量に上限がありますが、シート 1 つと週 1 回分の記録なら余裕で収まります。",
  "coach.setup.gemini.title": "Gemini：Gem を作る",
  "coach.setup.gemini.text":
    "Gem マネージャーを開き、<strong>新しい Gem</strong> を作成します。ルールを<strong>カスタム指示</strong>に貼り付け、パソコンか Google ドライブからアスリートシートを<strong>知識</strong>に追加します。Gem は無料で、モバイルアプリにも同期されます。",
  "coach.setup.vibe.title": "Vibe：プロジェクトを作る",
  "coach.setup.vibe.text":
    "Vibe は、2026 年 5 月から Mistral AI の Le Chat の新しい名前になりました。<strong>新しいプロジェクト</strong>を作り、カスタマイズ設定を開いてルールを貼り付け、アスリートシートをプロジェクトの<strong>ファイル</strong>に追加します。プロジェクトはすべてのプランで使えますが、上限があります。",
  "coach.setup.fallback":
    "プランに専用スペースがない、または作りたくない場合は、新しい会話を始めるたびにシートとルールを冒頭に貼り付けてください。少し手間ですが、効果は同じです。",

  "coach.weekly.title": "伸びる習慣：週に 1 回の振り返り",
  "coach.weekly.intro":
    "役に立つコーチは、長期的に寄り添います。いちばん効果的なのは、日曜の夜か月曜の朝に決まった時間を取ること。10 分で済みます。",
  "coach.weekly.step1":
    "<strong>その週のセッションをエクスポートする</strong>：ウォッチか Strava から、できれば FIT 形式で。",
  "coach.weekly.step2":
    "<strong><a href=\"{{href:index.html}}\">gps-digest</a> にドロップする</strong>：記録をコピーします。計算はすべてブラウザ内で行われます。",
  "coach.weekly.step3": "<strong>プロジェクトで新しい会話を開く</strong>：記録を貼り付け、体調を一言添えます。",
  "coach.weekly.step4":
    "<strong>振り返りの質問をする</strong>：提案された翌週のメニューは、採用する前に話し合いましょう。",
  "coach.weekly.promptIntro": "振り返りの質問（そのままコピーしてください）：",
  "coach.weekly.prompt":
    "今週のセッションと体調です。振り返ってください。\n1. うまくいったことは？ 数字で示してください。\n2. 注意して見ておくべきことは？\n3. 私の負荷は、目標とレースの日程に見合っていますか？\n4. 来週のメニューを 1 回ずつ、それぞれの狙いとあわせて提案してください。\n\n来週の制約：［記入する］",
  "coach.weekly.feel":
    "体調の一言は、データと同じくらい重要です。あなたが寝不足だったことも、火曜からふくらはぎが張っていることも、ウォッチは知りません。たとえば「土曜の主観的強度 8/10、2 晩よく眠れず、右ふくらはぎが火曜から張っている」。これがないと、AI はウォッチだけを頼りに 1 週間を評価します。",
  "coach.weekly.fresh":
    "なぜ毎週新しい会話にするのか。とても長いやりとりの中ほどにある情報を、モデルはうまく活かせないからです（Liu et al., 2024）。同じスレッドで何週間も続けると、最初の指示が薄れていきます。シートとルールはプロジェクトが保持し、事実は記録が運びます。月に 1 回は直近 4 週間分の記録を渡し、傾向を判断してもらいましょう。",

  "coach.more.title": "ほかにも使える 4 つの頼み方",
  "coach.more.intro": "週の振り返り以外にも、きちんと設定した AI コーチの力を引き出せる頼み方があります。",
  "coach.more.q1": "「インターバルを分析して。各レップのばらつき、レップ間の回復、次回変えるべき点を教えて」",
  "coach.more.q2":
    "「10 日後にレースがある。これが直近 6 週間の記録。目標ペースはどれくらいで、テーパリングはどう組めばいい？」",
  "coach.more.q3": "「今週は 3 日しか走れない。大事なものだけ残して、何を削るのか教えて」",
  "coach.more.q4":
    "「今の走行量から始めて、ハーフマラソン 1 時間 45 分を目指す 12 週間のプランを作って。回復週を入れて、負荷の上げ方の根拠も示して」",

  "coach.traps.title": "AI コーチの 5 つの落とし穴と、その避け方",
  "coach.traps.intro": "使い方を誤った AI コーチは、間違っていても教えてくれません。よくある失敗はこちらです。",
  "coach.traps.li1":
    "<strong>あなたに同調する。</strong>言語モデルには、話し相手に合わせる傾向があることが知られています（Sharma et al., 2024）。「いいセッションだった？」ではなく、「このセッションの問題点は？」と聞きましょう。",
  "coach.traps.li2":
    "<strong>数字がないと作り話をする。</strong>データがなければ、もっともらしい値で埋めてしまいます。しかも口調は自信たっぷりです。だからこそルール 1 と 2、そして完全な記録が必要です。",
  "coach.traps.li3":
    "<strong>伝えたことしか知らない。</strong>睡眠、ストレス、仕事の忙しさは、どれもウォッチには記録されません。体調の一言がなければ、AI はあなたが絶好調だと思い込みます。",
  "coach.traps.li4":
    "<strong>プランが野心的すぎることがある。</strong>紙の上のプランは誰も疲れさせません。実際の走行量から出発し、負荷を上げるたびに理由を示すよう求めましょう。",
  "coach.traps.li5":
    "<strong>医師ではない。</strong>続く痛み、悪化する痛み、走り方が変わる痛みは、チャットボットではなく医療の専門家に相談すべきものです。",

  "coach.choose.title": "ランニングコーチにはどの AI を選ぶべき？",
  "coach.choose.p1":
    "すでに使っているものを選びましょう。ChatGPT・Claude・Gemini・Vibe はどれも、構造化された記録を読み、ルールに従い、筋の通った 1 週間を提案できます。違いは使い方の好みです。Google のサービスを使うなら Gemini、声で振り返るなら ChatGPT、長いドキュメントや Strava コネクタなら Claude、欧州の事業者を選びたいなら Vibe。",
  "coach.choose.p2": "コーチングの質を本当に左右するのは、モデルではありません。AI に何を読ませるかです。",

  "coach.faq.q1": "ChatGPT を無料でランニングコーチとして使えますか？",
  "coach.faq.a1":
    "使えます。ChatGPT・Claude・Vibe のプロジェクトも Gemini の Gem も、ファイル数や利用量の上限つきで無料版に用意されています。セッションのエクスポートも無料です。ただし貼り付ける前に圧縮してください。そうしないと、1 セッションで無料版の上限に達することがあります。",
  "coach.faq.q2": "ChatGPT はフルマラソンの練習プランを作れますか？",
  "coach.faq.a2":
    "作れます。現在の走行量、最近のベスト、練習できる日時、レースの日程など、あなたの実際のレベルから出発すれば、かなり良いものができます。これを測定した研究もあります。コーチの専門家は ChatGPT のプランを最適ではないと評価しましたが、ランナーの情報を多く与えるほど質がはっきり上がりました（Düking et al., 2024）。負荷の上げ方の根拠を示してもらい、盲目的に従うのではなく、実際のセッションをもとに毎週プランを調整しましょう。",
  "coach.faq.q3": "Strava や Garmin を AI に直接つなげられますか？",
  "coach.faq.a3":
    "2026 年 6 月から Strava は公式コネクタを提供していますが、有料会員限定で、現時点では Claude 専用です。Garmin では、Tredict や Shape などのサードパーティサービスが橋渡し役になりますが、そちらでアカウントを作る必要があります。それ以外では、Garmin Connect でも Strava でも使えるファイルのエクスポートがいちばん簡単な方法です。無料で、どの AI でも使えます。ただし貼り付ける前に圧縮が必要です。",
  "coach.faq.q4": "AI コーチに渡したデータはどうなりますか？",
  "coach.faq.a4":
    "アシスタントに貼り付けた内容は、その提供元が自社の規約に従って処理します。履歴の保存期間や、会話がモデルの学習に使われるかどうかを設定で確認しましょう。なお、gps-digest の記録には初期設定で GPS 座標が含まれません。",
  "coach.faq.q5": "AI コーチとは英語でやりとりする必要がありますか？",
  "coach.faq.a5":
    "いいえ。4 つのアシスタントはどれも日本語でしっかり答えてくれますし、gps-digest もページの言語で記録を作成します。アスリートシートから週の振り返りまで、すべて日本語で進められます。",

  "coach.end.title": "良いコーチは、良いデータから始まる",
  "coach.end.text":
    "gps-digest は、ウォッチのファイルを ChatGPT・Claude・Gemini・Vibe が本当に分析できる記録に変換します。無料版でも使えます。アカウント不要で、ファイルはブラウザの外に出ません。",

  "coach.sources.sharma":
    "Sharma M, et al. <em>Towards Understanding Sycophancy in Language Models.</em> ICLR 2024. <a href=\"https://arxiv.org/abs/2310.13548\" rel=\"nofollow\">arXiv:2310.13548</a>.",
  "coach.sources.duking":
    "Düking P, et al. <em>ChatGPT Generated Training Plans for Runners are not Rated Optimal by Coaching Experts, but Increase in Quality with Additional Input Information.</em> Journal of Sports Science and Medicine, 2024, 23(1), 56-72. <a href=\"https://www.jssm.org/jssm-23-56.xml%3EFulltext\" rel=\"nofollow\">jssm.org</a>.",

  "guide.kicker":
    "エクスポートガイド",
  "guide.formats.title":
    "FIT・TCX・GPX：どの形式で書き出すべき？",
  "guide.formats.colFormat":
    "形式",
  "guide.formats.colContent":
    "含まれる内容",
  "guide.formats.colUse":
    "使いどころ",
  "guide.formats.fit":
    "すべて：心拍数、ラップ、ペアリングした心拍センサー、気圧高度計による獲得標高、プールの往復数",
  "guide.formats.fitUse":
    "第一候補",
  "guide.formats.tcx":
    "心拍数、ラップ、ケイデンス。ペアリングしたセンサーや気圧高度計の標高は含まれない",
  "guide.formats.tcxUse":
    "十分な代替",
  "guide.formats.gpx":
    "ルートと時刻。心拍数とケイデンスも含まれることが多い。ラップはない",
  "guide.formats.gpxUse":
    "最後の手段",
  "guide.why.title":
    "なぜファイルを ChatGPT に直接貼り付けないのか？",
  "guide.why.p":
    "ウォッチのファイルは、人が読むためではなくソフトウェアのために作られているからです。FIT はバイナリ形式で、1 時間のランニングの TCX は約 533,000 トークンあり、1 セッションだけで無料版の上限に達しかねません。ファイルが入ったとしても、何千行もの生データでは AI はうまく推論できません。<a href=\"{{href:post-ia-analyse.html}}\">詳しい説明はこちら</a>。",
  "guide.next.title":
    "次のステップ：AI にセッションを分析させる",
  "guide.next.s1":
    "<strong><a href=\"{{href:index.html}}\">gps-digest</a> にファイルをそのままドロップする</strong>：FIT・TCX・GPX・ZIP・.gz のどれでも OK。計算はすべてブラウザ内で行われます。",
  "guide.next.s2":
    "<strong>生成された記録をコピーする</strong>：1 セッションあたり数十万ではなく、数千トークンで済みます。",
  "guide.next.s3":
    "<strong>ChatGPT・Claude・Gemini・Vibe に貼り付ける</strong>：質問を添えましょう。毎週の継続的なサポートには、<a href=\"{{href:post-ia-coach.html}}\">AI コーチのガイド</a>をどうぞ。",
  "guide.next.cta":
    "セッションを分析する",
  "guide.more.title":
    "ほかのエクスポートガイド",
  "blog.guides":
    "エクスポートガイド",
  "guide.garmin.title":
    "ガーミン（Garmin）のデータを FIT で書き出して ChatGPT で分析する方法",
  "guide.garmin.description":
    "Garmin Connect のアクティビティを FIT で書き出す方法、全履歴の取得、USB でウォッチからファイルをコピーする方法、そして ChatGPT での分析まで。",
  "guide.garmin.h1":
    "ガーミンのセッションを書き出して ChatGPT に分析させる",
  "guide.garmin.meta":
    "公開日：<time datetime=\"2026-10-01\">2026 年 10 月 1 日</time> · 約 4 分で読めます",
  "guide.garmin.lede":
    "Garmin Connect はセッションを表示してくれますが、ChatGPT には渡してくれません。まずはファイルを取り出す必要があります。いちばん手軽な方法から最も完全な方法まで 3 つの手順と、その後の使い方を紹介します。",
  "guide.garmin.tldr1":
    "1 セッションなら：connect.garmin.com でアクティビティの歯車アイコンから元のファイルを書き出します。FIT ファイル入りの ZIP が手に入ります。",
  "guide.garmin.tldr2":
    "Garmin Connect のスマホアプリではファイルを書き出せません。パソコンを使うか、ウォッチを USB で接続しましょう。",
  "guide.garmin.tldr3":
    "生の FIT は ChatGPT には読めません。ZIP のまま gps-digest にドロップし、生成された記録を AI に貼り付けます。",
  "guide.garmin.m1.title":
    "Garmin Connect から 1 セッションを書き出す",
  "guide.garmin.m1.intro":
    "普段使いの方法です。パソコンからウェブサイトで行います。",
  "guide.garmin.m1.s1":
    "<strong>connect.garmin.com</strong> にログインします。",
  "guide.garmin.m1.s2":
    "左のメニューから<strong>アクティビティ</strong>を開き、目的のセッションを選びます。",
  "guide.garmin.m1.s3":
    "アクティビティ右上の<strong>歯車アイコン</strong>をクリックします。",
  "guide.garmin.m1.s4":
    "<strong>元のファイル</strong>を書き出すオプションを選びます。名称はサイトのバージョンによって異なります。TCX や GPX での書き出しもありますが、元の FIT のほうが情報量は多くなります。",
  "guide.garmin.m1.s5":
    "ダウンロードされるのは FIT ファイル入りの <strong>ZIP</strong> です。展開は不要で、gps-digest がそのまま開きます。",
  "guide.garmin.m1.note":
    "複数のセッションがある場合は、1 つずつ書き出して、ZIP をまとめてドロップしましょう。",
  "guide.garmin.m2.title":
    "ネット不要：USB でウォッチからファイルをコピーする",
  "guide.garmin.m2.p":
    "付属のケーブルでウォッチをパソコンに接続すると、GARMIN という名前のドライブまたはデバイスとして表示されます。セッションは <code>GARMIN/Activity</code> フォルダにあり、アクティビティごとに FIT ファイルが 1 つあります。最新のものをコピーして gps-digest にドロップしましょう。Mac では最近のウォッチはドライブとして表示されないため、MTP 対応のファイル転送ツールが必要です。",
  "guide.garmin.m3.title":
    "全履歴：アカウント全体のエクスポート",
  "guide.garmin.m3.p":
    "何年分ものセッションを取り出すには、Garmin アカウントにログインし、データ管理の項目からデータのエクスポートを申請します。アカウント全体の ZIP アーカイブへのリンクがメールで届きます。通常は数日以内です。FIT ファイルは入れ子になった ZIP の中にあります。gps-digest はそこからも見つけられますが、アーカイブは数百 MB になることが多いので、展開して直近数週間のセッションだけをドロップしましょう。",
  "guide.garmin.faq.q1":
    "Garmin Connect のスマホアプリからセッションを書き出せますか？",
  "guide.garmin.faq.a1":
    "いいえ、スマホアプリにはファイルの書き出し機能がありません。パソコンで connect.garmin.com を使うか、USB でウォッチからファイルをコピーしてください。",
  "guide.garmin.faq.q2":
    "ChatGPT がガーミンの FIT ファイルを読めないのはなぜですか？",
  "guide.garmin.faq.a2":
    "FIT はバイナリ形式です。ChatGPT はスクリプトを書いてデコードする必要があり、一部しか使えないことがよくあります。テキストに変換しても、1 時間のランニングは数十万トークンになります。gps-digest はブラウザ内でデコードし、1 セッションあたり約 5,800 トークンの記録にまとめます。",
  "guide.garmin.faq.q3":
    "データを書き出すのに Garmin Connect+ の契約は必要ですか？",
  "guide.garmin.faq.a3":
    "いいえ。1 セッションの書き出しも、アカウント全体のエクスポートも無料です。",
  "guide.strava.title":
    "Strava のアクティビティを GPX・FIT で書き出して ChatGPT で分析する方法",
  "guide.strava.description":
    "Strava のアクティビティを GPX や元の形式で書き出し、アーカイブ全体を取得して、ChatGPT・Claude・Gemini で分析する方法。無料です。",
  "guide.strava.h1":
    "Strava のアクティビティを書き出して ChatGPT に分析させる",
  "guide.strava.meta":
    "公開日：<time datetime=\"2026-10-01\">2026 年 10 月 1 日</time> · 約 4 分で読めます",
  "guide.strava.lede":
    "Strava はランの記録を保存してくれますが、AI には渡してくれません。例外は Claude 専用の有料コネクタだけです。朗報は、ウェブサイトを使えば書き出しは無料だということ。その方法と、書き出した後の使い方を紹介します。",
  "guide.strava.tldr1":
    "最も情報量が多いのはアカウントのアーカイブ（strava.com/account の「Download your account」）。ZIP をそのままドロップすれば、gps-digest が直近 12 か月分を使います。",
  "guide.strava.tldr2":
    "Strava のスマホアプリでは書き出せません。パソコンからウェブサイトを使います。",
  "guide.strava.tldr3":
    "生のファイルは ChatGPT には重すぎます。.gz のままでも gps-digest にドロップし、記録を AI に貼り付けましょう。",
  "guide.strava.m1.title":
    "strava.com からアクティビティを書き出す",
  "guide.strava.m1.intro":
    "書き出しは Strava のウェブサイトでしかできません。自分のアクティビティなら無料です。",
  "guide.strava.m1.s1":
    "パソコンで <strong>strava.com</strong> にログインし、アクティビティを開きます。",
  "guide.strava.m1.s2":
    "アクティビティの左側にある<strong>「…」</strong>（その他の操作）ボタンをクリックします。",
  "guide.strava.m1.s3":
    "ウォッチで記録したアクティビティなら、<strong>元のファイルの書き出し</strong>を選びます。ウォッチの FIT ファイルが手に入り、情報量が最も多くなります。",
  "guide.strava.m1.s4":
    "それ以外は <strong>GPX の書き出し</strong>を選びます。ルート、時刻、そして記録されていれば心拍数、ケイデンス、気温が含まれます。",
  "guide.strava.m1.s5":
    "ダウンロードしたファイルを gps-digest にドロップします。",
  "guide.strava.m1.note":
    "スマホの Strava アプリで記録したアクティビティなら、GPX の書き出しで十分です。",
  "guide.strava.m2.title":
    "おすすめ：アカウントのアーカイブで 1 年分の文脈を",
  "guide.strava.m2.p":
    "<a href=\"https://www.strava.com/account\" rel=\"noopener\">strava.com/account</a> の「Download your account」から、アカウントのアーカイブを申請します。通常は数時間以内にリンクがメールで届きます。ZIP をそのまま gps-digest にドロップすれば、セッションを見つけ出し、写真やルートは無視して、初期設定では直近 12 か月分を使います（3 か月から全期間まで選択可能）。直近 14 日分はセッションごとに詳細を、それ以外は 1 セッション 1 行でまとめます。300 件を超える 1 年分のトレーニングで約 30,000 トークンです。",
  "guide.strava.m3.title":
    "注意点：Strava のペースは Garmin とは違う",
  "guide.strava.m3.p":
    "Strava は移動時間をもとにペースを計算し、Garmin Connect は総時間をもとに計算します。信号待ちのある街中のランでは、その差は 1 km あたり 15 秒を簡単に超えます。gps-digest はどちらの計算方法かを記録に明記するので、AI が比較できない数字を比べることはありません。",
  "guide.strava.faq.q1":
    "Strava のアプリからアクティビティを書き出せますか？",
  "guide.strava.faq.a1":
    "いいえ。書き出しはパソコンから strava.com のウェブサイトでしかできません。",
  "guide.strava.faq.q2":
    "アクティビティを書き出すのに Strava の有料プランは必要ですか？",
  "guide.strava.faq.a2":
    "いいえ、自分のアクティビティの書き出しは無料です。有料プランが必要なのは、Strava と Claude をつなぐ公式コネクタだけです。",
  "guide.strava.faq.q3":
    "GPX と元のファイル、どちらを書き出すべき？",
  "guide.strava.faq.a3":
    "ウォッチで記録したアクティビティなら元のファイルです。たいていは FIT で、ラップ、ペアリングしたセンサー、気圧高度計の標高まで含まれます。それ以外は GPX で、ルートとほとんどの場合は心拍数が残ります。",
  "guide.strava.source":
    "Strava ヘルプ『<em>Exporting your Data and Bulk Export</em>』。<a href=\"https://support.strava.com/en-us/articles/15401919-exporting-your-data-and-bulk-export\" rel=\"nofollow\">support.strava.com</a>。",
  "guide.apple.title":
    "Apple Watch のワークアウトを GPX・FIT で書き出して ChatGPT で分析する方法",
  "guide.apple.description":
    "Apple にはワークアウトを直接書き出す機能がありません。Apple Watch のセッションを FIT や GPX で取り出し、ChatGPT で分析する 3 つの方法。",
  "guide.apple.h1":
    "Apple Watch のワークアウトを書き出して ChatGPT に分析させる",
  "guide.apple.meta":
    "公開日：<time datetime=\"2026-10-01\">2026 年 10 月 1 日</time> · 約 4 分で読めます",
  "guide.apple.lede":
    "Apple Watch で走った記録は iPhone のヘルスケアアプリに保存されていますが、Apple には GPX や FIT ファイルとして取り出すボタンがありません。それでも、取り出す方法は 3 つあります。",
  "guide.apple.tldr1":
    "いちばん簡単なのは、ヘルスケアのデータを読み取って FIT や GPX で書き出すアプリを使うこと。HealthFit や WorkoutGPX などがあります。",
  "guide.apple.tldr2":
    "お金をかけずに：ワークアウトを Strava に同期し、strava.com から書き出します。",
  "guide.apple.tldr3":
    "iPhone の Safari で gps-digest を直接開き、書き出したファイルをそこにドロップすることもできます。",
  "guide.apple.m1.title":
    "書き出しアプリを使う：最も情報量が多い方法",
  "guide.apple.m1.intro":
    "ヘルスケアのワークアウトを読み取り、心拍数を含めて標準形式で書き出せるアプリがあります。HealthFit は FIT・GPX・TCX、WorkoutGPX は GPX に対応しています。無料版でできることは App Store で確認してください。",
  "guide.apple.m1.s1":
    "アプリをインストールし、ヘルスケアの<strong>ワークアウト</strong>、<strong>ワークアウトルート</strong>、<strong>心拍数</strong>の読み取りを許可します。",
  "guide.apple.m1.s2":
    "書き出すワークアウトを選びます。",
  "guide.apple.m1.s3":
    "アプリが対応していれば <strong>FIT</strong> で、なければ GPX で書き出します。",
  "guide.apple.m1.s4":
    "ファイルを<strong>ファイル</strong>アプリに保存するか、AirDrop でパソコンに送ります。",
  "guide.apple.m1.s5":
    "iPhone かパソコンの Safari で gps-digest を開き、ファイルをドロップします。",
  "guide.apple.m1.note":
    "GPX より FIT のほうがおすすめです。ラップとセンサーのデータが残ります。",
  "guide.apple.m2.title":
    "お金をかけずに：Strava を経由する",
  "guide.apple.m2.p":
    "Strava を使っているなら、Strava アプリの設定でヘルスケアのワークアウトの読み取りを許可しましょう。Apple Watch のワークアウトが自動で送られるようになります。あとは strava.com から書き出すだけです。手順は <a href=\"{{href:guide-strava.html}}\">Strava のガイド</a>で説明しています。",
  "guide.apple.m3.title":
    "ヘルスケアの標準エクスポート：興味のある人向け",
  "guide.apple.m3.p":
    "ヘルスケアアプリでプロフィール写真をタップし、「すべてのヘルスケアデータを書き出す」を選びます。ZIP アーカイブが作られ、<code>workout-routes</code> フォルダに GPX 形式のルートが入っています。ただし、このルートに含まれるのは位置、高度、時刻だけで、心拍数は別の巨大な XML ファイルにあります。アーカイブは数百 MB になることも珍しくありません。ワークアウトを分析するなら、最初の 2 つの方法のほうがずっと優れています。",
  "guide.apple.faq.q1":
    "アプリなしで Apple Watch のランを GPX で書き出せますか？",
  "guide.apple.faq.a1":
    "ヘルスケアの全データ書き出しを使えば可能ですが、ルートに心拍数は含まれません。完全なファイルが欲しいなら、書き出しアプリを使うか Strava を経由してください。",
  "guide.apple.faq.q2":
    "gps-digest は iPhone で使えますか？",
  "guide.apple.faq.a2":
    "使えます。Safari でページを開き、ファイルを選ぶボタンをタップして、ファイルアプリから選択してください。分析はスマホの中で行われ、サーバーには何も送信されません。",
  "guide.apple.faq.q3":
    "Apple Watch のワークアウトにはどの形式を選ぶべき？",
  "guide.apple.faq.a3":
    "書き出しアプリが対応していれば FIT です。ラップとセンサーのデータが残ります。GPX でもかまいませんが、心拍数が含まれている必要があります。書き出しアプリなら含まれますが、ヘルスケアの標準エクスポートには含まれません。",
  "coach.sources.strava":
    "Strava『<em>Strava Launches MCP Connector, Allowing Athletes to Sync Training History to Claude</em>』プレスリリース、2026 年 6 月 1 日。<a href=\"https://press.strava.com/articles/strava-launches-mcp-connector\" rel=\"nofollow\">press.strava.com</a>。",
  "coach.sources.docs":
    "公式ドキュメント：<a href=\"https://help.openai.com/en/articles/10169521-projects-in-chatgpt\" rel=\"nofollow\">ChatGPT のプロジェクト</a>、<a href=\"https://support.claude.com/en/articles/9517075-what-are-projects\" rel=\"nofollow\">Claude のプロジェクト</a>、<a href=\"https://support.google.com/gemini/answer/15146780\" rel=\"nofollow\">Gemini の Gem</a>、<a href=\"https://docs.mistral.ai/vibe/work/projects\" rel=\"nofollow\">Vibe のプロジェクト</a>。",
  "privacy.analytics.row": "アクセス統計",
  "privacy.analytics.rowText":
    "<strong>送信します（匿名）。</strong>Cloudflare Web Analytics がページビューを数えます。cookie も永続的な識別子も使いません。ファイルやセッションの情報は含まれません。",
  "privacy.analytics.active":
    "アクセス解析には Cloudflare Web Analytics を使っています。cookie も永続的な識別子も使わず、ファイルのデータも一切含みません。数えるのはページビュー、国、流入元、端末の種類で、個人を追跡することはありません。",
  "privacy.verify.p1Analytics":
    "私たちの言葉をうのみにしないでください。ブラウザの開発者ツール（<code>F12</code>）を開き、<strong>ネットワーク</strong>タブを表示してからファイルをドロップしてください。表示されるのは、ページの読み込み、<code>cloudflareinsights.com</code> へのアクセス解析のリクエスト、そして天気を有効にしている場合の <code>open-meteo.com</code> へのリクエストだけです。ほかには何もありません。ファイルの内容を含むリクエストはありません。",
};
