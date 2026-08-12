# 中国盤面の登録手順

`scripts/countries/china/`(8ファイル)と `src/presentation/components/events/dooms/china-*.tsx`(7ファイル)は
作成済み・検証済み。共有ファイルには一切触れていない。ここに書いた変更を
取りまとめ側で適用し、`node scripts/extract-legacy-content.mjs` と
`npm run check` を通してほしい。

韓国のときと同じ8箇所(+ 3点は確認のみで変更不要だったので省略)。
貼り付け用のコードをそのまま載せてある。

---

## 1. `scripts/extract-legacy-content.mjs`

import を1行追加(既存の `buildGermanyContent` の下)。

```js
import { buildChinaContent } from "./countries/china/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に1行追加。

```js
const AUTHORED_COUNTRIES = [
  buildIndiaContent(),
  buildFranceContent(),
  buildWorldContent(),
  buildIbarakiContent(),
  buildKoreaContent(),
  buildTurkeyContent(),
  buildGermanyContent(),
  buildChinaContent(),
];
```

---

## 2. `scripts/content-overrides/property-economy.mjs`

`CURRENCY_MULTIPLIERS` に1行追加。

```js
  // ¥1,200 → ¥600,000。1元≒21円(1ドル≒150円/7.2元、2020年代半ばの相場)
  // とすると、日本(×10000)を21で割って≒476。トルコ(×2500=10000/4)と同じ
  // 考え方で、きりのよい500に丸めた。
  china: 500,
```

**china/flavour.mjs の `CHINA_META.cur` は暫定値 `mul: 100` のまま**にしてある
(他の書き起こし国と同じ約束。ここで実値に置き換わる)。

---

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に1行追加。

```ts
  china: () => import("./china.content.json").then((m) => m.default),
```

---

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に1行追加。

```ts
  china: () => import("../content/china.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

---

## 5. `src/infrastructure/content/item-effect-rules.ts`

`ITEM_EFFECT_BY_LEGACY_KEY` に9行追加(他国と同じ並び順)。

```ts
  // China
  jindouyun: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  luopan: { type: "choose-exact-dice" },
  lupiheche: { type: "roll-fixed-dice", diceCount: 2 },
  gaotiepiao: { type: "roll-fixed-dice", diceCount: 3 },
  baozhu: { type: "none" }, // 厄災の神(年獣)のward item(passive)
  taomujian: { type: "repel-spirit" },
  jinnang: { type: "quiz-save" },
  yuzhuo: { type: "gain-cash", amount: 380 },
  qianlima: { type: "extra-turn" },
```

---

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6.1 `SEASON_EFFECTS_BY_COUNTRY` に `china:` を追加

`china/flavour.mjs` の `CHINA_SEASONS`(フレーバー文)と対になる数値ルール。
地方コードは `hb`=華北 / `db`=東北 / `hd`=華東 / `hn`=華南 / `xn`=西南 / `xb`=西北。

```ts
  china: [
    /* 0 Apr 清明・洛陽の牡丹(華北) */ [
      { op: "region-income-multiplier", regionId: region("hb"), multiplier: 1.3 },
    ],
    /* 1 May 労働節の旅ラッシュ・華東の工場休業 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("hd"), multiplier: 1.15 },
    ],
    /* 2 Jun 端午節の竜舟(長江=華東・珠江=華南) */ [
      { op: "region-income-multiplier", regionId: region("hn"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("hd"), multiplier: 1.15 },
    ],
    /* 3 Jul 暑さで東北が避暑地に、華南は屋内へ */ [
      { op: "region-income-multiplier", regionId: region("db"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("hn"), multiplier: 0.8 },
    ],
    /* 4 Aug 夏休み最盛期、南の海辺(厦門〜三亜)が埋まる */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("hn"), multiplier: 1.2 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep 中秋節、月餅を贈り合う */ [
      { op: "all-players-gain-cash", amount: 380 },
      { op: "region-income-multiplier", regionId: region("hn"), multiplier: 1.2 },
    ],
    /* 6 Oct 国慶節の黄金週間、北京の公園と紅葉 */ [
      { op: "region-income-multiplier", regionId: region("hb"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("xn"), multiplier: 1.15 },
    ],
    /* 7 Nov 菊花展と収穫市 */ [
      { op: "region-income-multiplier", regionId: region("hd"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("hb"), multiplier: 1.15 },
    ],
    /* 8 Dec 冬至の餃子、ハルビン氷祭りの準備(東北) */ [
      { op: "region-income-multiplier", regionId: region("db"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("xb"), multiplier: 0.85 },
    ],
    /* 9 Jan 春節 */ [{ op: "give-item-to-all" }],
    /* 10 Feb 元宵節、ハルビンの氷祭りが続く */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("db"), multiplier: 1.2 },
    ],
    /* 11 Mar 黄砂の季節が始まる(西北・華北) */ [
      { op: "region-income-multiplier", regionId: region("xb"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("hb"), multiplier: 0.9 },
    ],
  ],
```

### 6.2 `DOOM_EFFECT_ID_BY_LEGACY_ID` に7行追加

`china/flavour.mjs` の `CHINA_DOOM` は最初からこの並び順(fine→steal)で書いてある。

```ts
  // China
  shachenbao: "fine",
  taifeng: "percentLoss",
  chunyun: "skipTurn",
  chaiqian: "loseProperties",
  suifenzi: "payOthers",
  "wuru-taohuayuan": "teleport",
  "miaohui-paishou": "steal",
```

---

## 7. `src/presentation/components/events/dooms/index.ts`

import を7行追加。

```ts
import { ChinaChaiqian } from "./china-chaiqian";
import { ChinaChunyun } from "./china-chunyun";
import { ChinaMiaohuiPaishou } from "./china-miaohui-paishou";
import { ChinaShachenbao } from "./china-shachenbao";
import { ChinaSuifenzi } from "./china-suifenzi";
import { ChinaTaifeng } from "./china-taifeng";
import { ChinaWuruTaohuayuan } from "./china-wuru-taohuayuan";
```

登録テーブルに7行追加。

```ts
  "china-chaiqian": ChinaChaiqian,
  "china-chunyun": ChinaChunyun,
  "china-miaohui-paishou": ChinaMiaohuiPaishou,
  "china-shachenbao": ChinaShachenbao,
  "china-suifenzi": ChinaSuifenzi,
  "china-taifeng": ChinaTaifeng,
  "china-wuru-taohuayuan": ChinaWuruTaohuayuan,
```

7枚とも `npx tsc` による単体の型検査(strict・jsx: react-jsx)を通してある。
`transform-box: fill-box` を使うアニメーションは `transform-origin` を
パーセントで指定してある(絶対px指定は bbox が小さいと破綻するため。
`bolivia-bloqueo.tsx` の `blq-arm` と同じ書き方)。

---

## 8. 確認済み・変更不要だったもの

- **`scripts/content-overrides/country-groups.ts`(setup配下)**: `asia` グループに
  `"china"` が既に入っていた(他エージェントの作業か、あらかじめの下準備と思われる)。
  `boardScale()` も未登録IDは既定で `"country"` になるので、そのままでよい。
- **`scripts/check-quiz.mjs` / `scripts/check-city-backgrounds.mjs` / `scripts/shot.mjs`**:
  いずれも `country-index.json` から動的に国一覧を読む形に直っていた(韓国のときは
  手で足す必要があったが、いまは不要)。抽出さえ済めば自動的に対象に入る。
- **4つのテストファイル**(`board-movement-invariants.test.ts` /
  `json-country-content-repository.test.ts` / `item-pricing.test.ts` /
  `use-board-layout.test.ts`): いずれも `ALL_COUNTRY_IDS`(`country-index.json` から
  動的生成)を使う形に直っていた。手を加える必要はない。

## 9. `check-quiz.mjs` の `ACCEPTED` に追記してほしいもの(2件)

`china/quiz.mjs` の手作り検査(下記参照)で、日本語文に英字が混じると出る。
いずれも**原語そのものが問いの中身**であるため意図的(フランスの
「TGVとは」「denim(デニム)」と同じ扱い)。

```js
  { c: "china", has: "\"tea\"", why: "英語とロシア語の語形そのものを比べる問題。原語が無いと問いが成立しない" },
  { c: "china", has: "\"China\"", why: "英語の国名そのものの語源を訊く問題" },
```

---

## 通貨倍率の考え方(再掲)

韓国は「ウォンは円のおよそ10倍(1ドル≒150円/1300ウォン)」という考え方で
日本(×10000)の10倍(×100000)にした。トルコは「1リラ≒4円」で
日本を4で割った(×2500)。中国は「1元≒21円」なので、同じ考え方で
日本を21で割ると≒476。きりのよい**500**に丸めてある(§2参照)。

---

## 自己検証の方法(共有ファイルを一切使わない)

- `node --input-type=module -e "import { buildChinaContent } from './scripts/countries/china/index.mjs'; ..."`
  で直接組み立てて、都市48・路線66・クイズ42・アイテム9・厄災7・季節12・
  出来事21・シンボル20・背景16・地方6・BGM6を確認済み。
- 4言語の欠けは `t()` が import 時に例外を投げる仕組みに加え、全ファイルで
  「4フィールドとも空でない」を確認するNodeスクリプトを別途通した。
- 海陸判定は `scripts/check-sea-routes.mjs` を模した手作りスクリプトを
  `china/geography.mjs` と `china/cities.mjs` に直接かけて確認(60px超の
  食い違いなし)。
- クイズの漏れ・言語混入・位置の偏りは `scripts/check-quiz.mjs` を模した
  手作りスクリプトで確認(漏れ0件、位置は0/1/2が14/14/14で均等)。
- 背景の空・地面のyの食い違い(塗り残し)は全16種で解析的に確認(0件)。
  中央の隠れ帯(x=151–249/y=54–152)に主役級の図形が入っていないかも確認。
- 実際に `playwright` で16背景×マゼンタ台紙・20シンボル・主要な合成結果を
  スクリーンショットして目視した(`npm run shot` は使わず、china/art.mjs を
  直接importする独自スクリプトで代用)。背景1枚あたりの平均要素数は
  62.9(韓国27・フランス94と同じ数え方)。
