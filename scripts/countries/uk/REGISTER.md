# イギリス盤面の登録内容

`scripts/countries/uk/` 一式は作成済み・自己検証済みです。以下7か所を共有ファイルに
貼り込んでください(いずれも韓国の登録パターンを踏襲しています)。

---

## 1. `scripts/extract-legacy-content.mjs`

**import行**(既存の `buildTurkeyContent` の下に追加):

```js
import { buildUkContent } from "./countries/uk/index.mjs";
```

**`AUTHORED_COUNTRIES` への追加行**:

```js
const AUTHORED_COUNTRIES = [
  buildIndiaContent(),
  buildFranceContent(),
  buildWorldContent(),
  buildIbarakiContent(),
  buildKoreaContent(),
  buildTurkeyContent(),
  buildUkContent(),
];
```

---

## 2. `scripts/content-overrides/property-economy.mjs`

**`CURRENCY_MULTIPLIERS` への追加行**:

```js
  // £1,200 → £63,600。日本(¥12,000,000)と同じ物価感覚になるよう、
  // 「ポンドは円の約190分の1」で逆算(12,000,000÷190≒63,158)し、
  // 内部の開始資金1200に対して割り切れる倍率53を当てた(63,158に対して+0.7%)。
  uk: 53,
```

UKの都市物件は韓国と同じく `CITY_PROPS` の上書き対象にしていません(`scripts/countries/uk/cities.mjs`
に直接、S目玉2,600〜3,000/A大都市900〜1,400/B中核350〜650/C小さな町150〜300、利回り約20.6%で
書き込み済みです)。`CITY_PROPS` に `uk:` のエントリを足す必要はありません。

---

## 3. `src/infrastructure/content/json-country-content-repository.ts`

**`LOADERS` への追加行**(`korea:` の下に):

```ts
  uk: () => import("./uk.content.json").then((m) => m.default),
```

---

## 4. `src/infrastructure/audio/country-music-styles.ts`

**`STYLE_LOADERS` への追加行**:

```ts
  uk: () => import("../content/uk.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

---

## 5. `src/infrastructure/content/item-effect-rules.ts`

**`ITEM_EFFECT_BY_LEGACY_KEY` への追加9件**(`// Korea` ブロックの下に):

```ts
  // UK
  girdle: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  osmap: { type: "choose-exact-dice" },
  nightriviera: { type: "roll-fixed-dice", diceCount: 2 },
  scotsman: { type: "roll-fixed-dice", diceCount: 3 },
  horseshoe: { type: "none" }, // 厄災の神(ボガート)のward item(passive)
  rowan: { type: "repel-spirit" },
  pubquiz: { type: "quiz-save" },
  detectorist: { type: "gain-cash", amount: 380 },
  guardswhistle: { type: "extra-turn" },
```

---

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 季節12ヶ月(`SEASON_EFFECTS_BY_COUNTRY` への追加)

流れ: イースターと競馬(4月) → チェルシー(5月) → ウィンブルドンと夏至(6月) →
夏休み・海辺(7月) → フリンジと休神(8月) → サッカー再開と収穫(9月) →
紅葉と冬時間(10月) → ボンファイア・ナイト(11月) → クリスマス市(12月) →
ホグマネイと給アイテム(1月) → シックス・ネイションズ(2月) →
聖デイヴィッド・聖パトリック(3月)。地方は `se`/`mi`/`no`/`wa`/`sc`/`ni`。

```ts
  /**
   * イギリス。イースターと競馬(4月) → チェルシー花博(5月) → ウィンブルドンと
   * 夏至(6月) → 夏休みと海辺(7月) → エディンバラ・フリンジと休神(8月) →
   * サッカー再開と収穫(9月) → 紅葉と冬時間(10月) → ボンファイア・ナイト(11月) →
   * クリスマス市(12月) → ホグマネイと給アイテム(1月) → シックス・ネイションズ(2月) →
   * 聖デイヴィッド・聖パトリックの日(3月)、という流れ。
   * 他国のAugust=休神/January=給アイテムの慣例に揃えてある。
   */
  uk: [
    /* 0 Apr イースターとグランドナショナル(リヴァプール) */ [
      { op: "region-income-multiplier", regionId: region("no"), multiplier: 1.2 },
    ],
    /* 1 May チェルシー・フラワー・ショーとメーデー */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.25 },
    ],
    /* 2 Jun ウィンブルドンと夏至 */ [
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sc"), multiplier: 1.1 },
    ],
    /* 3 Jul 夏休みと海辺・湖水地方のにぎわい */ [
      { op: "all-players-pay-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("wa"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("no"), multiplier: 1.15 },
    ],
    /* 4 Aug エディンバラ・フリンジとヒースの季節 */ [
      { op: "region-income-multiplier", regionId: region("sc"), multiplier: 1.3 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep サッカー再開と収穫 */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("mi"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("no"), multiplier: 1.15 },
    ],
    /* 6 Oct 紅葉と冬時間 */ [
      { op: "region-income-multiplier", regionId: region("no"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("wa"), multiplier: 1.1 },
    ],
    /* 7 Nov ボンファイア・ナイトとリメンバランス */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("mi"), multiplier: 1.15 },
    ],
    /* 8 Dec クリスマス市とパントマイム */ [
      { op: "all-players-pay-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.3 },
    ],
    /* 9 Jan ホグマネイとバーンズ・ナイト */ [{ op: "give-item-to-all" }],
    /* 10 Feb シックス・ネイションズと中間休み */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("wa"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("sc"), multiplier: 1.15 },
    ],
    /* 11 Mar 聖デイヴィッドの日・聖パトリックの日 */ [
      { op: "all-players-gain-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("wa"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ni"), multiplier: 1.25 },
    ],
  ],
```

### 厄災7種(`DOOM_EFFECT_ID_BY_LEGACY_ID` への追加)

他国と同じ7種類の効果に、UKの `id` を割り当てます。**文字通り一致するものを優先**しました
(`skipTurn`=電車が動けない、`fine`=駐車違反金、`payOthers`=奢らされる会計)。
残る3つ(`percentLoss`/`loseProperties`/`teleport`/`steal`)は、韓国のhwangsa=fineや
taepung=percentLossと同様、他国も含め文字通りの一致より「効果の重さ」で割り当てている
部分があるため、UKも近い考え方で以下のようにしました。迷った点として明記します:
`fete-rained-off`(祭りが流れる)を`loseProperties`に、`fog-delay`(霧で足止め)を
`percentLoss`に、`last-bus`(歩いて帰る)を`teleport`に、`queue-jumper`(列に割り込まれる)を
`steal`に当てています。呼び名ほど字義通りではないので、違和感があれば入れ替えてください
(実害は無く、どのidがどの効果でも動きます)。

```ts
  // UK
  "parking-warden": "fine",
  "fog-delay": "percentLoss",
  "leaves-on-line": "skipTurn",
  "fete-rained-off": "loseProperties",
  "your-round": "payOthers",
  "last-bus": "teleport",
  "queue-jumper": "steal",
```

---

## 7. `src/presentation/components/events/dooms/index.ts`

**import行**(`Korea*` の下に追加):

```ts
import { UkFeteRainedOff } from "./uk-fete-rained-off";
import { UkFogDelay } from "./uk-fog-delay";
import { UkLastBus } from "./uk-last-bus";
import { UkLeavesOnLine } from "./uk-leaves-on-line";
import { UkParkingWarden } from "./uk-parking-warden";
import { UkQueueJumper } from "./uk-queue-jumper";
import { UkYourRound } from "./uk-your-round";
```

**登録テーブルへの追加行**:

```ts
  "uk-fete-rained-off": UkFeteRainedOff,
  "uk-fog-delay": UkFogDelay,
  "uk-last-bus": UkLastBus,
  "uk-leaves-on-line": UkLeavesOnLine,
  "uk-parking-warden": UkParkingWarden,
  "uk-queue-jumper": UkQueueJumper,
  "uk-your-round": UkYourRound,
```

---

## 自分で確かめたこと

- `node -e 'import("./scripts/countries/uk/index.mjs").then(m => { const c = m.buildUkContent(); console.log(Object.keys(c.cities).length, c.edges.length, c.quiz.length); })'`
  → `42 55 40`(都市42・路線55・クイズ40)。エラーなし。
- **4言語の書き漏らし**: `buildUkContent()` の出力全体を再帰的に walk し、
  `{en,es,fr,ja}` の形をした値をすべて機械的に検出して空文字が無いか確認するスクリプトを
  自作して実行 → **548件すべて4言語とも非空**(韓国で起きた「日本語だけ33都市分欠落」の
  パターンは無いことを確認済み)。
- **`sky()` の第3引数**: 22背景すべてに渡っている。加えて、空の下端(`to`)と
  地面が始まるyのあいだに隙間が無いか、各背景のSVG文字列を自作スクリプトでパースして確認し、
  1件(`castletown`。岩山が画面中央だけを覆う構図で、左右に隙間があった)を実際に見つけて直した。
- **海岸線と都市の位置**: `use-board-layout.test.ts` と同じ point-in-polygon 判定を
  自作スクリプトで再現し、42都市全件が陸の上にあることを確認(海岸線に近い都市は
  最短で4.9px、多くは10px以上の余白)。
- **路線の陸海判定**: `check-sea-routes.mjs` と同じ式(octilinear の折れ点・land判定)を
  自作スクリプトで再現し、55路線のうち陸海の食い違いが60px超のものを検出 → 10件を
  端の入れ替えで解消。残る1件(`belfast-holyhead`、418px中88px=21%がアングルシー北端を
  かすめる)は、韓国のjeju-yeosu(11%)と同じ理由で意図的に残した(実際のフェリーも
  アングルシー北端をかすめて出港する)。
- **都市どうしの近さ**: `use-board-layout.test.ts` と同じ式で、押し離しても重なる
  組が無いことを確認(0件)。
- **クイズの正解位置**: 0/1/2 が 14/13/13 になるよう調整済み(初回は 14/19/10 に偏っていた
  ため、6問を選択肢の並べ替えで直した)。
- **アイテム・厄災・季節の件数**: items 9 / doom 7 / seasons 12 / moneyEvents 19
  (増10・減9、全地方で最低1件ずつgain/lossを引けることを確認)。
- **背景の密度**: 22背景の平均68.4要素(`<rect|circle|ellipse|line|path|polygon|polyline|g`
  の開始タグ数で計測。同じ数え方で韓国を計測すると26.9になり、team-leadの言う「27」と
  ほぼ一致したので数え方の妥当性を確認済み)。最小は39(`linksgolf`)。
- **厄災の絵7枚**: `npx tsc --noEmit --jsx react-jsx --strict` で型検査(エラー0件)。
  各ファイルに `viewBox="0 0 400 210"` / `role="img" aria-hidden="true"` /
  `prefers-reduced-motion` を確認。図形数は27〜53(JSXを直接数えた実測。`.map()`は
  使っていないので、この数え方でも正確なはず)。
- **`node scripts/extract-legacy-content.mjs` と `npm run check` は実行していません**
  (指示どおり。生成物の同時書き換えを避けるため)。
