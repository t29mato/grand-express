# ドイツ登録内容

`scripts/countries/germany/` と `dooms/germany-*.tsx` はできています。
共有ファイルには触っていません。以下7つをそのまま貼ってください。

## 1. `scripts/extract-legacy-content.mjs`

import行(`buildKoreaContent` の下に追加):

```js
import { buildKoreaContent } from "./countries/korea/index.mjs";
import { buildGermanyContent } from "./countries/germany/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行:

```js
const AUTHORED_COUNTRIES = [
  buildIndiaContent(),
  buildFranceContent(),
  buildWorldContent(),
  buildIbarakiContent(),
  buildKoreaContent(),
  buildGermanyContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の `CURRENCY_MULTIPLIERS`

```js
  // €1,200 → €120,000。フランス・世界一周と同じ据え置き
  // (€120,000は既に不動産の桁として通る)。日本(×10000)の1.6倍。
  germany: 100,
```

`CITY_PROPS` への追加は不要です。韓国と同じく、各都市の物件価格は
`cities.mjs` の `prop()` 呼び出しで直接指定してあります(旗艦はベルリンの
Reichstag Glass Dome、cost 2900)。

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  korea: () => import("./korea.content.json").then((m) => m.default),
  germany: () => import("./germany.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  korea: () => import("../content/korea.content.json").then((m) => (m.default as { styles: unknown }).styles),
  germany: () => import("../content/germany.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

```ts
  // Germany
  zeppelinfahrt: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  fahrplan: { type: "choose-exact-dice" },
  intercity: { type: "roll-fixed-dice", diceCount: 2 },
  ice: { type: "roll-fixed-dice", diceCount: 3 },
  kaminkehrer: { type: "none" }, // 厄災の神(リューベツァール)のward item(passive)
  almglocke: { type: "repel-spirit" },
  eselsbruecke: { type: "quiz-save" },
  flohmarkt: { type: "gain-cash", amount: 380 },
  autobahn: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

`SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん(地方コードは `nord` 北部 /
`rhein` ラインラント / `sw` 南西部 / `bay` バイエルン / `mitte` 中部 /
`ost` 東部。`mitte` は今回どの月にも登場しない=季節の仕掛けが薄い地方
だが、都市6件の月別収入自体はそれぞれの都市の物件を持てば入る):

```ts
  /**
   * ドイツ。春のシュパーゲルツァイト(白アスパラガス) → バイエルンの
   * マイバウム → ラインの花火 → キーラー・ヴォッヘ → 夏休み(休神) →
   * オクトーバーフェスト → 統一記念日とワイン収穫 → 聖マルティンの提灯 →
   * クリスマス市 → ジルヴェスター(給アイテム) → カーニバル →
   * 春の大掃除、という流れ。
   */
  germany: [
    /* 0 Apr シュパーゲルツァイト(白アスパラガス) */ [
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ost"), multiplier: 1.15 },
    ],
    /* 1 May マイバウム(バイエルンの五月柱) */ [
      { op: "region-income-multiplier", regionId: region("bay"), multiplier: 1.25 },
    ],
    /* 2 Jun ラインの花火(ライン・イン・フラメン) */ [
      { op: "region-income-multiplier", regionId: region("rhein"), multiplier: 1.2 },
    ],
    /* 3 Jul キーラー・ヴォッヘ */ [
      { op: "region-income-multiplier", regionId: region("nord"), multiplier: 1.3 },
    ],
    /* 4 Aug 夏休み(休神) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep オクトーバーフェスト開幕 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("bay"), multiplier: 1.3 },
    ],
    /* 6 Oct 統一記念日とワイン収穫 */ [
      { op: "all-players-gain-cash", amount: 320 },
      { op: "region-income-multiplier", regionId: region("rhein"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.15 },
    ],
    /* 7 Nov 聖マルティンの提灯行列(ラインラント) */ [
      { op: "region-income-multiplier", regionId: region("rhein"), multiplier: 1.2 },
    ],
    /* 8 Dec クリスマス市 */ [
      { op: "region-income-multiplier", regionId: region("bay"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("ost"), multiplier: 1.2 },
    ],
    /* 9 Jan ジルヴェスター(給アイテム) */ [{ op: "give-item-to-all" }],
    /* 10 Feb カーニバル(ラインラント) */ [
      { op: "all-players-pay-cash", amount: 150 },
      { op: "region-income-multiplier", regionId: region("rhein"), multiplier: 1.3 },
    ],
    /* 11 Mar 春の大掃除と新年度の準備 */ [
      { op: "all-players-pay-cash", amount: 120 },
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.1 },
    ],
  ],
```

`DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件(他国と同じ7種の効果、`id` だけが
土地のフレーバー):

```ts
  // Germany
  foehn: "fine",
  hochwasser: "percentLoss",
  stau: "skipTurn",
  sturmflut: "loseProperties",
  runde: "payOthers",
  bergnebel: "teleport",
  marktdieb: "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts`

import行(`France...` と `Ibaraki...` のあいだにアルファベット順で挿入):

```ts
import { GermanyBergnebel } from "./germany-bergnebel";
import { GermanyFoehn } from "./germany-foehn";
import { GermanyHochwasser } from "./germany-hochwasser";
import { GermanyMarktdieb } from "./germany-marktdieb";
import { GermanyRunde } from "./germany-runde";
import { GermanyStau } from "./germany-stau";
import { GermanySturmflut } from "./germany-sturmflut";
```

`DOOM_ANIMATIONS` への追加行(同じくアルファベット順で挿入):

```ts
  "germany-bergnebel": GermanyBergnebel,
  "germany-foehn": GermanyFoehn,
  "germany-hochwasser": GermanyHochwasser,
  "germany-marktdieb": GermanyMarktdieb,
  "germany-runde": GermanyRunde,
  "germany-stau": GermanyStau,
  "germany-sturmflut": GermanySturmflut,
```

## 参考: 自分で確かめたこと

- `node -e 'import("./scripts/countries/germany/index.mjs").then(m => {...})'` で
  `buildGermanyContent()` が例外なく組み上がることを確認済み(45都市・59路線・
  クイズ40問・アイテム9件・厄災7件・季節12件・マーク26種・背景25種)。
- 4言語の欠けは、`cities.mjs` / `quiz.mjs` / `money-events.mjs` / `flavour.mjs` /
  全都市・全設問・全出来事を機械的に走査して0件を確認(`city()` / `t()` の
  バリデーションも全件通過)。
- 座標は自作のpoint-in-polygon検証で全45都市が陸地内(境界まで最低15px)に
  収まることを確認。ズュルト島への航路(フーズム↔ズュルト)は直線を40分割して
  実測し、両端の町自身の陸地を除いた中間区間(約27%)が海であることを確認。
- 背景SVGは自作のマゼンタ台紙テストで25種とも塗り残し0pxを確認
  (`sky()` の第3引数を全箇所で次の塗りのyに合わせた)。
- クイズは自作の簡易チェック(答えの文字列が都市カードに出ていないか)で
  怪しい箇所を洗い出し、実際に重なっていた1件(ベルリンのタグにあった
  「首都」がQ1の正解ベルリンと共起する)を直した。
