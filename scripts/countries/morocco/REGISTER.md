# モロッコ盤面の登録内容

`scripts/countries/morocco/` 8ファイルと `dooms/morocco-*.tsx` 7枚は作成済み。
以下、共有ファイルへ貼り付けるためのコード片。**生成器 (`extract-legacy-content.mjs`)
と `npm run check` は実行していません**(並行して他の担当が `scripts/` を編集中のため)。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の country import 群の下に追加):

```js
import { buildMoroccoContent } from "./countries/morocco/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行(既存の配列に1行足すだけ):

```js
const AUTHORED_COUNTRIES = [
  // ...既存の呼び出し...
  buildMoroccoContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加:

```js
  // MAD 780,000(1200×650)。1ディルハム≒15円で換算すると約1,170万円になり、
  // 日本(×10000で¥12,000,000)の0.975倍に収まる(為替1.8倍以内の基準を満たす)。
  // 10000÷15≒667を650に丸めた(トルコ・中国と同じ「割って丸める」考え方)。
  morocco: 650,
```

(`CITY_PROPS` への追加は無し。イタリア・韓国と同じく、都市の物件価格は
`cities.mjs` に直接書き込んであり、上書きテーブルは不要。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  morocco: () => import("./morocco.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  morocco: () => import("../content/morocco.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

```ts
  // Morocco
  mobylette: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  horaire: { type: "choose-exact-dice" },
  rapide: { type: "roll-fixed-dice", diceCount: 2 },
  alboraq: { type: "roll-fixed-dice", diceCount: 3 },
  khamsa: { type: "none" }, // 厄災の神(戸口のジュヌーン)のward item(passive)
  bakhour: { type: "repel-spirit" },
  fiche: { type: "quiz-save" },
  zerbia: { type: "gain-cash", amount: 380 },
  wasta: { type: "extra-turn" },
```

キーが既存語(`scripts/countries/**` 全体)と衝突しないことを確認済み
(team-lead から共有された衝突済みリストと突き合わせ、9件とも既存に無い語)。

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `rif`=北部・リーフ / `atl`=大西洋岸 / `cen`=中部・内陸 /
`atm`=アトラス山脈 / `sud`=南部・砂漠 / `est`=東部。
4月始まり。**ラマダンは意図的に入れていない**(太陰暦で年ごとに月がずれるため。
トルコ盤面と同じ判断)。代わりに王位記念日(7月30日)・独立記念日/緑の行進
(11月18日/6日)・ヤンナイル(アマジグ暦新年、1月中旬、グレゴリオ暦で固定)
など、日付が固定された祝祭を選んだ。

```ts
  /**
   * モロッコ。移牧の春 → バラの谷の収穫 → 聖なる音楽とグナワの6月 →
   * 王位記念日とサハラの暑さの始まり(7月) → 暑さの頂点(8月) →
   * イミルシルの婚約祭 → デーツの収穫 → 緑の行進と独立記念日(11月) →
   * オリーブの初搾り(12月) → ヤンナイルと峠の初雪(1月) →
   * タフラウトのアーモンドの花(2月) → ガルブのオレンジの花(3月)、という流れ。
   */
  morocco: [
    /* 0 Apr 移牧(アザガル)の春 */ [
      { op: "region-income-multiplier", regionId: region("atm"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.1 },
    ],
    /* 1 May バラの谷の収穫(ケラア・ムグナ) */ [
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("atm"), multiplier: 1.15 },
    ],
    /* 2 Jun 聖なる音楽祭とグナワ音楽祭 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("atl"), multiplier: 1.2 },
    ],
    /* 3 Jul 王位記念日とサハラの暑さの始まり */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.2 },
    ],
    /* 4 Aug 暑さの頂点、ハッタラが涸れる */ [
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("atm"), multiplier: 1.3 },
    ],
    /* 5 Sep イミルシルの婚約祭 */ [
      { op: "all-players-gain-cash", amount: 280 },
      { op: "region-income-multiplier", regionId: region("atm"), multiplier: 1.2 },
    ],
    /* 6 Oct エルフードのデーツ祭り */ [
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.15 },
    ],
    /* 7 Nov 緑の行進と独立記念日 */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("rif"), multiplier: 1.2 },
    ],
    /* 8 Dec オリーブの初搾り(メクネス) */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.15 },
    ],
    /* 9 Jan ヤンナイルと峠の初雪(給アイテム) */ [{ op: "give-item-to-all" }],
    /* 10 Feb タフラウトのアーモンドの花 */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.25 },
    ],
    /* 11 Mar ガルブのオレンジの花 */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("atl"), multiplier: 1.15 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

```ts
  // Morocco
  compteur: "fine",
  chergui: "percentLoss",
  souqday: "skipTurn",
  harika: "loseProperties",
  atay: "payOthers",
  grandtaxi: "teleport",
  nachal: "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(アルファベット順に挿入):

```ts
import { MoroccoAtay } from "./morocco-atay";
import { MoroccoChergui } from "./morocco-chergui";
import { MoroccoCompteur } from "./morocco-compteur";
import { MoroccoGrandtaxi } from "./morocco-grandtaxi";
import { MoroccoHarika } from "./morocco-harika";
import { MoroccoNachal } from "./morocco-nachal";
import { MoroccoSouqday } from "./morocco-souqday";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "morocco-atay": MoroccoAtay,
  "morocco-chergui": MoroccoChergui,
  "morocco-compteur": MoroccoCompteur,
  "morocco-grandtaxi": MoroccoGrandtaxi,
  "morocco-harika": MoroccoHarika,
  "morocco-nachal": MoroccoNachal,
  "morocco-souqday": MoroccoSouqday,
```

## 補足: `src/presentation/components/setup/country-groups.ts` は変更不要

`africa` 束の `countryIds` に `["morocco", "ghana"]` がすでに含まれていました
(team-lead 側で先に用意されていたようです)。触っていません。

## 自分で確かめたこと

- `node -e` で `buildMoroccoContent()` を呼び、`cities`/`edges`/`quiz`/`moneyEvents`/
  `items`/`doom`/`seasons`/`regions`/`marks`/`bg`/`styles` の件数を確認:
  **都市38・路線41・クイズ36・出来事20・アイテム9・厄災7・季節12・地方6・
  mark32・bg22・音楽6地方**。例外なし。
- 4言語の欠け: `t()` が1件でも欠けると即座に例外で落ちる作りなので、
  8ファイルすべてを `node -e` で実際に読み込んで確認した(欠けがあれば
  ここで止まる)。作業中に3回、書き漏らし(imlilの物件・tinghirのtag・
  quizの1問)で実際に落ち、その場で直した。再読み込みで全ファイル通過。
- **都市の陸地判定**: 38都市すべての座標が `geography.mjs` の海岸線ポリゴンの
  内側にあることを、レイキャスティング法の点内判定スクリプトで実測確認。
  最初の座標案では**3件(シディイフニ・タルファヤ・フィギッグ)が海または
  国境の外側に出ていた**(海岸線・国境線を町の座標のすぐそばに引いていたため)。
  タルファヤは南の切断線と海岸線の交点をそのまま町の座標に重ねていたのが
  原因で、町の緯度をわずかに挟むよう海岸線に中間点を1つ足して直した。
  フィギッグは国境線を町より西に引いていたため町が「国外」判定になっており、
  投影の東端近くまで国境を張り出させて直した。直したあとは全38件が
  陸地の内側・投影範囲内であることを再確認済み。
- **`seg` の実測**: 41路線すべての投影後距離を計算し、最長はウジダ―フィギッグ
  522px・アガディール―タンタン469px。`seg=90`(暫定値)では6マスの路線が
  1本出ていたが、`seg=100` にすると**全路線が5マス以下に収まる**(5マスは2本)。
  実測に基づき `seg=100` に確定した。
- **背景の塗り残し**: `check-city-backgrounds.mjs` と同じロジック(マゼンタ台紙+
  実ブラウザ描画)を自分のスクラッチパッドに再現したスクリプトで、22背景すべてを
  実測。**最初の実装では2件(medina・chalet)で `sky()` の第3引数が `hills()` の
  基準線と噛み合っておらず塗り残しが出ており**、さらに新規に足した `gorge` でも
  同じ理由で13,540pxの塗り残しが出た。`sky()` の第3引数を「次に来る全面塗り
  (`ground()`)の開始y」に揃えて3件とも修正し、再実測で0px。
- **隠れ帯(横151〜249・縦54〜152)チェック**: `getBBox()` で図形ごとの外接矩形を
  測り帯との重なりを見るスクリプトを自作して22背景を確認。**当初3件
  (metropolis・countryside・palmoasis)で主要素(モスクの尖塔・遠景の雪山・
  遠くの土の塔)が帯の中に完全に隠れていた**ため、x座標をずらして外へ出した。
  再確認で0件。
- **背景の密度**: 22背景の要素数(`<rect|circle|ellipse|path|line|polygon|polyline>`
  タグ数)を機械計測。当初平均36.8(目安40をわずかに下回る)だったため、
  下位8背景(strait・rifbay・cistern・pottery・countryside・mountains・gorge・
  coastdesert)に要素を足し、**最終的に平均41.5(最少29・最多61)**まで底上げした。
  rsvg-convert でPNG化し、capital・koutoubia・cistern・kasbah・metropolis・gorge
  を目視確認済み(cisternは唯一の屋内場面で、他と雰囲気が明確に違うことを確認)。
- `mark`(32種)と `bg`(22種)は `cities.mjs` の38都市から過不足なく参照されている
  ことを機械チェック済み(未使用キー0・不足キー0、両方向とも)。
- クイズの答えの位置(`a`)は当初 0=18/1=17/2=1 と大きく偏っていたため、
  11問の選択肢の並びを入れ替えて **0=12/1=12/2=12** に均等化した。
- クイズと都市カードの重なりチェック: 答えの語がカードに載っているか、かつ
  問い文の特徴語もそのカードに載っているかを機械的に確認する簡易スクリプトを
  自作して36問を流した。**1件(首都を問う設問とラバトの都市カード)で
  「1912年」という具体的な事実が完全に重複していた**ため、クイズ側の解説文を
  カサブランカとの人口規模比較の話に差し替えて重複を解消した。残り数件
  (「アフリカ」「アマジグ」「スペイン」などの一般的な語の一致)は、問いが
  教えている具体的な事実とカードの話が異なる性質のものと判断し、韓国・イタリア
  盤面の `ACCEPTED` 系の例外と同じ理由で許容した。
- 出来事(money-events)は地方ごとの `gains`/`losses` を、全国共通4件に頼らず
  地方専用の出来事だけで両方引けることを個別に確認済み(rif/atl/cen/sudは
  各2増1減、atm/estは各1増1減)。
- 厄災の絵7枚は `npx tsc --noEmit`(jsx: react-jsx)で構文チェック済み、
  エラー無し。**実機での動きの確認(`npm run shot -- morocco event`)はまだ
  行っていません**(生成器を回していないため)。登録後に確認してください。

## 迷った点

- **通貨倍率の根拠**: 1ディルハム≒15円という為替の想定に基づき
  `10000÷15≒667` を650に丸めた。トルコ(1リラ≒4円→2500)・中国
  (1元≒21円→500)と同じ「割って丸める」考え方に揃えている。
- **地方区分と都市数**: rif7・atl8・cen5・atm5・sud9・est4。南部・砂漠が
  いちばん多いのは、team-leadの指示にあった「メルズーガ・ザゴラ・
  ティネリール・エルラシディア・アイット・ベン・ハドゥ・ワルザザート・
  シディイフニ・タンタン・タルファヤ」をすべて活かした結果で、
  「南は疎らでよい」という路線密度の指示とは別に、都市そのものは
  この地方に厚く配分した。東部(ウジダ・フィギッグ・タザ・ベルカン)が
  いちばん薄いのは、実在する町の選択肢自体が他地方より少ないため。
- **アイット・ベン・ハドゥ**: 「映画の撮影地としてだけ書かない」という指示を
  踏まえ、都市カードの`fact`は「クサルに住むのは十世帯未満で、大半は対岸の
  新しい村に移った」という現在の住民構成の話にし、映画には一切触れていない
  (映画の話はワルザザートの`fact`に寄せた)。
- **西サハラの扱い**: 南端をタルファヤ・タンタンの緯度(北緯27.9度あたり)で
  切り、Green March(緑の行進)についてはモロッコの国民祝日として11月の
  季節説明に日付だけ触れたが、その歴史的背景(西サハラ帰属問題)には立ち入って
  いない。タンタン・タルファヤの都市カードでも同様に、ムーセム(遊牧民の祭り)
  とサン=テグジュペリの飛行史という、係争と無関係な話題を選んだ。
- **伝説の扱い**: シェフシャウエンの青壁の由来(ユダヤ人難民説)は「ガイドが
  語る言い伝え」として明示し、歴史家の指摘(色が広まったのは生きた記憶の
  範囲内)を添えた。ザゴラの「ラクダで52日」の看板も、1990年代の観光用標識だと
  明記し、史実の隊商路そのものは別に事実として肯定した。
