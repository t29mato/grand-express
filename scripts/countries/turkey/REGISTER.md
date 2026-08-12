# トルコ登録内容

`scripts/countries/turkey/` と `dooms/turkey-*.tsx` は作成済み。
以下7か所への追記をお願いします(私からは共有ファイルを触っていません)。

## 1. `scripts/extract-legacy-content.mjs`

import行(既存の import 群、`buildKoreaContent` の下あたりに):

```js
import { buildTurkeyContent } from "./countries/turkey/index.mjs";
```

`AUTHORED_COUNTRIES` 配列への追加行:

```js
const AUTHORED_COUNTRIES = [
  buildIndiaContent(),
  buildFranceContent(),
  buildWorldContent(),
  buildIbarakiContent(),
  buildKoreaContent(),
  buildTurkeyContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の `CURRENCY_MULTIPLIERS`

```js
  // ₺3,000,000 → 開始資金1200×2500。1ドル=150円/37.5リラ
  // (2025年半ば頃の相場)とすると1リラ≒4円になり、日本(×10000)を
  // 4で割った倍率にあたる。トルコリラは変動が激しい通貨なので、
  // 実勢に厳密には合わせず、この相場・時期を基準に丸めた値としている。
  turkey: 2500,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  turkey: () => import("./turkey.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  turkey: () => import("../content/turkey.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

`ITEM_EFFECT_BY_LEGACY_KEY` の末尾に:

```ts
  // Turkey
  balon: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  fal: { type: "choose-exact-dice" },
  mavitren: { type: "roll-fixed-dice", diceCount: 2 },
  yht: { type: "roll-fixed-dice", diceCount: 3 },
  nazar: { type: "none" }, // 厄災の神(カラコンジョロス)のward item(passive)
  karacevap: { type: "repel-spirit" },
  deneme: { type: "quiz-save" },
  akce: { type: "gain-cash", amount: 380 },
  dolmus: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

`SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん(4月始まり):

```ts
  /**
   * トルコ。チューリップ(4月) → ヒドゥレルレズ(5月) → さくらんぼ(6月) →
   * 海岸リゾートの最盛期(7月) → 戦勝記念日・休神(8月) → ブドウの収穫(9月) →
   * 共和国記念日(10月・最大の祝日) → オリーブ(11月) → 柑橘(12月) →
   * シェケル・バイラム(1月・給アイテム) → カラコンジョロス・ギュンレリ/寒波
   * (2月) → ネヴルズ(3月・東部で特に盛ん)、という流れ。
   * 中央アナトリア(ica)は首都アンカラを含むため、国の祝日でよく上がる。
   */
  turkey: [
    /* 0 Apr チューリップとカッパドキアの好天 */ [
      { op: "region-income-multiplier", regionId: region("mar"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 1.15 },
    ],
    /* 1 May ヒドゥレルレズ */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("mar"), multiplier: 1.2 },
    ],
    /* 2 Jun さくらんぼの収穫 */ [
      { op: "region-income-multiplier", regionId: region("kar"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 1.15 },
    ],
    /* 3 Jul 海岸リゾートの最盛期 */ [
      { op: "region-income-multiplier", regionId: region("ege"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("akd"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 0.85 },
    ],
    /* 4 Aug 戦勝記念日と休神 */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 1.2 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep ブドウの収穫 */ [
      { op: "region-income-multiplier", regionId: region("mar"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ege"), multiplier: 1.2 },
    ],
    /* 6 Oct 共和国記念日 */ [
      { op: "all-players-gain-cash", amount: 380 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 1.25 },
    ],
    /* 7 Nov オリーブの収穫 */ [
      { op: "region-income-multiplier", regionId: region("ege"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("akd"), multiplier: 1.1 },
    ],
    /* 8 Dec 柑橘の収穫 */ [
      { op: "region-income-multiplier", regionId: region("akd"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("ege"), multiplier: 1.1 },
    ],
    /* 9 Jan シェケル・バイラム(旧暦のため月は便宜上の固定) */ [{ op: "give-item-to-all" }],
    /* 10 Feb カラコンジョロス・ギュンレリ(寒波) */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("dogu"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("kar"), multiplier: 0.85 },
    ],
    /* 11 Mar ネヴルズ(春分) */ [
      { op: "all-players-gain-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("dogu"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 1.1 },
    ],
  ],
```

`DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件(7種の効果それぞれ1件ずつ):

```ts
  // Turkey
  ayakkabi: "fine",
  lodos: "percentLoss",
  trafik: "skipTurn",
  camyangini: "loseProperties",
  meyhane: "payOthers",
  "karakoncolos-yolu": "teleport",
  yankesici: "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts`

import行:

```ts
import { TurkeyAyakkabi } from "./turkey-ayakkabi";
import { TurkeyCamyangini } from "./turkey-camyangini";
import { TurkeyKarakoncolosYolu } from "./turkey-karakoncolos-yolu";
import { TurkeyLodos } from "./turkey-lodos";
import { TurkeyMeyhane } from "./turkey-meyhane";
import { TurkeyTrafik } from "./turkey-trafik";
import { TurkeyYankesici } from "./turkey-yankesici";
```

登録簿への追加行:

```ts
  "turkey-ayakkabi": TurkeyAyakkabi,
  "turkey-camyangini": TurkeyCamyangini,
  "turkey-karakoncolos-yolu": TurkeyKarakoncolosYolu,
  "turkey-lodos": TurkeyLodos,
  "turkey-meyhane": TurkeyMeyhane,
  "turkey-trafik": TurkeyTrafik,
  "turkey-yankesici": TurkeyYankesici,
```

## 検算メモ(そのまま貼れます)

- `node scripts/check-sea-routes.mjs turkey` を回すと、イスタンブール⇄イズミット
  (`istanbul`–`izmit`)がおそらく引っかかります。**マルマライが実際にボスポラス
  海峡の海底を通る区間なので、地図のほうが正しい例**です(青函トンネルと同じ扱い)。
  `KEPT` へ理由付きで登録をお願いします。座標はそちらの指示どおり、
  海の上を通る前提で選んであります。
