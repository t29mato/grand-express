# バリ盤面の登録内容

`scripts/countries/bali/` 8ファイル(index/cities/geography/quiz/money-events/flavour/music/art)と
`dooms/bali-*.tsx` 7枚は作成済み。以下、共有ファイルへ貼り付けるためのコード片。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の import の下に追加):

```js
import { buildBaliContent } from "./countries/bali/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行:

```js
const AUTHORED_COUNTRIES = [
  buildIndiaContent(),
  buildFranceContent(),
  buildWorldContent(),
  buildIbarakiContent(),
  buildKoreaContent(),
  buildItalyContent(),
  // ...(他の担当が並行して追加している国)
  buildBaliContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加:

```js
  // Rp 1,200,000,000。team-lead指示の「1円≒100ルピア」を基準に、
  // 日本(¥12,000,000スタート、×10000)と実質を揃えると
  // 12,000,000円×100=Rp 1,200,000,000、mul=1,200,000,000÷1200=1,000,000。
  // 実質は日本の1.0倍で「為替1.8倍以内」を厳密に満たす。桁は10桁になるが、
  // インドネシア・ルピアは実生活でも「1億ルピアの家」のような大きな数字が
  // 普通に使われる通貨なので、丸めというより実感に近い(この点は
  // team-lead指示の「桁が大きいので遊びやすさ優先で丸めてよい」を、
  // 丸めずにきりのよい数のまま採用した、という判断)。
  // インドネシア盤面と同じ通貨。倍率を揃えるかどうかはteam-lead判断。
  bali: 1000000,
```

（`CITY_PROPS` への追加は無し。物件価格は `cities.mjs` に直接書き込んである。）

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  bali: () => import("./bali.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  bali: () => import("../content/bali.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

既存キーと衝突しないことを、指示にあった鍵の一覧と全件突き合わせて確認済み。

```ts
  // Bali
  ojek: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  padewasan: { type: "choose-exact-dice" },
  bemo: { type: "roll-fixed-dice", diceCount: 2 },
  perama: { type: "roll-fixed-dice", diceCount: 3 },
  tridatu: { type: "none" }, // 厄災の神(レヤック)のward item(passive)
  keris: { type: "repel-spirit" },
  lontar: { type: "quiz-save" },
  perak: { type: "gain-cash", amount: 380 },
  kecak: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `sel`=南部 / `ubu`=中部・ウブド / `gl`=山岳・湖 / `tim`=東部 / `utr`=北部 / `brt`=西部・島嶼。
4月始まり。**島ひとつの盤面なので、茨城と同じく「地方まるごとの好不況」ではなく
実際の行事に結びつけて地方収入を動かしている**(詳細は `flavour.mjs` 冒頭コメント)。
3月(index 11)がニュピで rest-spirit、1月(index 9)がガルンガン/クニンガンで
give-item-to-all(茨城の1月・イタリアの1月と同じ型)。

```ts
  /**
   * バリ。乾季とサーフの始まり → コーヒーの摘み始め → 芸術祭 → 凧の季節 →
   * ガルンガン/クニンガン(1回目) → 棚田の刈り取りとマンゴー → 塩づくりの
   * 仕上げ → 雨季と田起こし → 雨季本番と工芸の季節 → ガルンガン/クニンガン
   * (2回目、給アイテム) → 雨季の底(南部の水害リスク) → ニュピ(休神)、という流れ。
   */
  bali: [
    /* 0 Apr 乾季とサーフの波が始まる */ [
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("brt"), multiplier: 1.15 },
    ],
    /* 1 May コーヒーの実が色づき始める */ [
      { op: "region-income-multiplier", regionId: region("gl"), multiplier: 1.25 },
    ],
    /* 2 Jun 芸術祭(州都) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 1.2 },
    ],
    /* 3 Jul 凧の季節 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 1.15 },
    ],
    /* 4 Aug ガルンガンとクニンガン(1回目) */ [
      { op: "all-players-gain-cash", amount: 280 },
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("tim"), multiplier: 1.25 },
    ],
    /* 5 Sep 棚田の刈り取りとマンゴー */ [
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("tim"), multiplier: 1.15 },
    ],
    /* 6 Oct 塩田をならす(乾季の仕上げ) */ [
      { op: "region-income-multiplier", regionId: region("brt"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("utr"), multiplier: 1.1 },
    ],
    /* 7 Nov 雨が戻り田を起こす */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 1.1 },
    ],
    /* 8 Dec 雨季本番、工芸の季節 */ [
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 1.1 },
    ],
    /* 9 Jan ガルンガンとクニンガン(2回目)、サラスワティ */ [{ op: "give-item-to-all" }],
    /* 10 Feb 雨季の底(南部の水害リスク) */ [
      { op: "all-players-pay-cash", amount: 140 },
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 0.75 },
    ],
    /* 11 Mar ニュピ(島が丸ごと止まる日) */ [
      { op: "rest-spirit" },
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 0.65 },
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 0.65 },
      { op: "region-income-multiplier", regionId: region("gl"), multiplier: 0.65 },
      { op: "region-income-multiplier", regionId: region("tim"), multiplier: 0.65 },
      { op: "region-income-multiplier", regionId: region("utr"), multiplier: 0.65 },
      { op: "region-income-multiplier", regionId: region("brt"), multiplier: 0.65 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

```ts
  // Bali
  "razia-polisi": "fine",
  "hama-tikus": "percentLoss",
  "menunggu-dewasa": "skipTurn",
  "abu-vulkanik": "loseProperties",
  "sumbangan-upacara": "payOthers",
  "arus-balik": "teleport",
  "monyet-mencuri": "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(アルファベット順、`AutriaXxx`/近い並びの前後 — 実際の位置は既存の並びに合わせて調整してください):

```ts
import { BaliAbuVulkanik } from "./bali-abu-vulkanik";
import { BaliArusBalik } from "./bali-arus-balik";
import { BaliHamaTikus } from "./bali-hama-tikus";
import { BaliMenungguDewasa } from "./bali-menunggu-dewasa";
import { BaliMonyetMencuri } from "./bali-monyet-mencuri";
import { BaliRaziaPolisi } from "./bali-razia-polisi";
import { BaliSumbanganUpacara } from "./bali-sumbangan-upacara";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "bali-abu-vulkanik": BaliAbuVulkanik,
  "bali-arus-balik": BaliArusBalik,
  "bali-hama-tikus": BaliHamaTikus,
  "bali-menunggu-dewasa": BaliMenungguDewasa,
  "bali-monyet-mencuri": BaliMonyetMencuri,
  "bali-razia-polisi": BaliRaziaPolisi,
  "bali-sumbangan-upacara": BaliSumbanganUpacara,
```

## 補足: `src/presentation/components/setup/country-groups.ts` は変更不要

`bali` は最初から `asia` 束の `countryIds` に登録されていた(team-lead確認済み)。触っていない。

## 自分で確かめたこと

**生成器(`extract-legacy-content.mjs`)も `npm run check` も、指示により実行していません。**
かわりに `node -e 'import(...)'` で各ファイル・`buildBaliContent()` を直接読み込み、
以下を機械的に確認しました。

- `buildBaliContent()` が例外なく組み上がることを確認(`t()` は4言語に分けられないと
  その場で例外を出すので、1件でも欠けがあれば下記の件数取得より前に落ちる)。
  結果: **都市32・路線43・クイズ36・アイテム9・厄災7・季節12・出来事20・
  mark12・bg12・地方6・音楽スタイル6・陸地ポリゴン3(本島・ヌサペニダ・
  ヌサレンボンガン)**。
- 4言語の欠け: 全8ファイルの `t()` 呼び出しがすべて成功すること(欠けがあれば例外)に加え、
  都市・アイテム・厄災・季節・地方名・国メタの全 `t()` オブジェクトについて、
  「en/es/fr に日本語(CJK)が混入していないか」「ja に必ずCJKが含まれるか」を
  機械チェックし、**問題0件**。クイズも同様に0件。
  作業中、クイズの1問(バロン・バンカルの問い)で `ja` を書き忘れて `+ ""` で
  誤魔化してしまっていたのを機械チェックで検出し、修正しました
  (「1件ずつ読んでも出ない」典型で、機械で数えて初めて気づけました)。
- クイズの答えの位置: 最初の版は0が34/36と大きく偏っていたのを検出し、
  `i % 3` で機械的に選択肢を並べ替えて **0/1/2が12/12/12** になるよう修正。
- クイズと都市カードの重なり: 答えの語(小文字化・冠詞除去)が各都市カードの
  `tag`+`fact`(英語)に含まれるかを機械チェックしました。
  「Indonesian」「rupiah」がブドゥグルのカード文中に(通貨・国語という一般語として)
  偶然出現しますが、カードの主題(1633年の寺院・5万ルピア紙幣・デウィ・ダヌ信仰)
  とは関係のない一般常識問題(難度2・3)なので、韓国盤面の `ACCEPTED` と同じ理由で
  許容できると判断しました。「jukung」がアメッドのカードと実際に重なっていた
  1件は、**問いそのものを「トリ・ヒタ・カラナ」に差し替えて解消**しました。
- 出来事(青マス・赤マスの `moneyEvents`)の gain/loss: 全国共通4件(増2減2)に加え、
  6地方すべてで**その地方タグの出来事だけで増・減の両方が引けること**を
  個別に確認済み(南部/中部/山岳/東部は増2減1、北部/西部は増1減1)。
- `mark`/`bg` のキー突き合わせ: 32都市が参照する `mark`(12種)・`bg`(12種)が
  すべて `art.mjs` に定義されていること、逆に定義した12種がすべて
  少なくとも1都市から使われていること(未使用0)を機械チェック。
  最初 `offering` が未使用だったため、クブタンブハンの `mark` を
  `meru` から `offering`(供物)に差し替えて解消しました。
- 背景の平均要素数: `<rect|circle|ellipse|path|line|polygon|polyline>` の
  タグ数で機械計測し、**12種・平均39.1個**(目安40にほぼ一致。最少は
  cliffcoveの34、最多はroyaltownの48)。最初の下書きは平均32.6だったため、
  海鳥・追加のジュクン・棚田の畝・水牛など繰り返しの利く要素を足して調整しました。
- `sky()` の第3引数: 12背景すべてで「次に来る全面塗りの開始yと第3引数が
  一致しているか」を目で確かめ、cratervolcanoで1件(第3引数96 vs 実際の
  全面塗り開始130)を発見して修正しました。`rsvg-convert` でマゼンタ台紙の
  上に全12枚をPNG化し、密度を上げる編集の前後で計2回、目視で透ける帯が
  無いことを確認済みです。
- 都市カードの1話1事実: 全32都市の `fact` を書く際、1文目に固有の事実
  (年号・数字・固有名詞のいずれか)、2文目に背景か現在の姿、という型を
  最初から統一して書いたため、後からの絞り込みは発生していません。
- 路線の連結性: 43路線が32都市すべてを1つの連結成分にまとめていることを
  機械確認(どの町からもどの町へもたどり着ける)。
- `seg` の実測: `BALI_PROJ` の式で43路線すべての投影後px距離を計算し、
  seg=110で最大8マス・5マス超3本(いずれも実在する長い一本道)という
  結果を得て採用しました(詳細は `geography.mjs` と `cities.mjs` のコメント)。

## 確かめられなかったこと(登録側にお願いしたいこと)

- **`check-sea-routes.mjs`**: content-overrides層に登録されるまで対象国として
  認識されないため、走らせられませんでした。43路線のうち、地理的に海を渡る
  想定なのは4本(サヌール〜ヌサペニダ・パダンバイ〜ヌサペニダ・ヌサペニダ〜
  ヌサレンボンガン・サヌール〜ヌサレンボンガン、いずれも実在する船便)のみで、
  残り39本はすべて陸路のつもりです。座標上は違和感がないはずですが、
  登録後に必ず実行して確認してください。
- **`check-city-backgrounds.mjs`**: 同上の理由で走らせていません。目視の
  マゼンタ台紙チェックで代替していますが、機械チェックも登録後にお願いします。
- **`npm run shot -- bali overview`**: 生成器を回していないので撮れません。
  ラベル位置(`lp`)は「西側の都市はr、東側はl」という簡便な目安で32都市ぶん
  割り振っただけで、実際に隣接ラベルが重ならないかは未確認です
  (デンパサール周辺・南部6都市が特に密集しているため、重なりが出るとしたら
  ここだと思います)。
- **`npm run check`**: 指示により未実行です。ESLint・型・依存・テスト・build・
  E2Eのいずれも通していません。

## 迷った点・報告したいこと

- **通貨倍率**: 「1円≒100ルピア」をそのまま日本の実質(¥12,000,000スタート)に
  当てはめると mul=1,000,000 になり、Rp 1,200,000,000という10桁の数字になります。
  team-leadの「丸めてよい」を、下げて桁を減らす方向ではなく、きりのよい
  100万倍のまま採用しました。理由は、インドネシア・ルピアは実生活でも
  「1億ルピア」のような大きな数字がふつうに使われる通貨で、10桁は
  誇張ではなく実感に近いと判断したためです。インドネシア盤面と同じ通貨なので、
  揃えるかどうかはteam-lead判断とのことでしたので、そちらに委ねます。
- **クタの2002年爆弾事件**: 観光案内から消さず、慰霊碑(実在するグラウンド・
  ゼロ・モニュメント)に触れる形で、犠牲者数(202人)を含めて書きました。
  「サーファーが居着いた町」という明るい書き出しの直後に置くことで、
  美化も忌避もしない扱いを狙いました。
- **デンパサール(1906)とクルンクン(1908)、2件のププタン**: どちらも
  実在する史実で、意図的に両方入れています。ただし内容が近い(儀礼的集団死)
  ため、デンパサールは「地名の由来」、クルンクンは「クルタ・ゴサの天井画」を
  1文目に置き、ププタン自体は2文目の背景情報として位置づけて重複感を薄めました。
- **観光地への偏り**: 南部6・東部6に対し北部4とやや少なめです。指示の
  「シガラジャ・ロビナは必ず入れる」は満たしていますが、北部をもう1〜2件
  厚くする余地はあると思います(候補: セリリット、テジャクラ)。
- **ヌガラのマクプン(水牛レース)とロロアンのブギス人**: 1つの都市カードに
  2つの話題(競技と少数民族)を入れており、「1話1事実」の原則からはやや外れます。
  西部・島嶼で唯一の内陸行政都市であり、他に割く都市が無かったための判断です。
  次にこの盤面に触る人が都市を増やす機会があれば、ロロアンを独立した
  都市カードに分けることを検討してください。
- **インドネシア盤面(別担当)との重なり**: バリの都市カードは意図的に
  インドネシア全体ではなくバリ島固有の話題(スバック・ププタン・レヤック等)に
  絞りましたが、クイズは逆に「インドネシア全体の一般知識」(通貨・言語・
  宗教比率・時間帯など)を何問か含めています。インドネシア盤面のクイズと
  題材が重ならないか、そちらの担当と突き合わせを推奨します。
