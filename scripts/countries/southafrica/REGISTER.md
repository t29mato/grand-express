# 南アフリカ盤 — 登録用スニペット(取りまとめ側が7箇所に貼る)

書いたのは `scripts/countries/southafrica/` の7ファイル(index / cities /
geography / quiz / money-events / flavour / music)と `ART-KEYS.md`。
`art.mjs` と厄災の絵7枚(`src/presentation/components/events/dooms/southafrica-*.tsx`)
は絵の専任が別途作る。

通貨: ランド(R)。倍率1200(根拠は `cities.mjs` 冒頭コメントと team-lead との
やり取りで確認済み)。

---

## 1. `scripts/extract-legacy-content.mjs`

```js
import { buildSouthafricaContent } from "./countries/southafrica/index.mjs";
```

`AUTHORED_COUNTRIES`(または相当する配列)に追記:

```js
buildSouthafricaContent(),
```

---

## 2. `scripts/content-overrides/property-economy.mjs`

`CURRENCY_MULTIPLIERS` に追記:

```js
  // R1,440,000(1200×1200)。1ドル≒150円/1ドル≒18.5ランド(2020年代半ばの目安)
  // とすると1ランド≒8.1円になり、12,000,000÷8.1÷1200≒1235を
  // きりのよい1200に丸めた。日本(¥12,000,000)の実質-2.5%に収まる。
  southafrica: 1200,
```

---

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追記:

```ts
  southafrica: () => import("./southafrica.content.json").then((m) => m.default),
```

---

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追記:

```ts
  southafrica: () => import("../content/southafrica.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

---

## 5. `src/infrastructure/content/item-effect-rules.ts`

`ITEM_EFFECT_BY_LEGACY_KEY` に追記。鍵はすべて既存37盤面と重複しないことを
確認済み(2026-08-19)。

```ts
  // South Africa
  coalwagon: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  transkaroo: { type: "choose-exact-dice" },
  shosholoza: { type: "roll-fixed-dice", diceCount: 2 },
  bluetrain: { type: "roll-fixed-dice", diceCount: 3 },
  muthi: { type: "none" }, // 厄災の霊(トコロシュ)のward item(passive)
  bonethrow: { type: "repel-spirit" },
  matricpapers: { type: "quiz-save" },
  biltong: { type: "gain-cash", amount: 380 },
  hooterblast: { type: "extra-turn" },
```

---

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 厄災(7件、韓国と同じ7種の効果に1件ずつ対応させた)

```ts
  // South Africa
  "load-shedding-line": "fine",
  "cable-theft": "percentLoss",
  "veld-fire-tracks": "skipTurn",
  "highveld-storm-cutting": "loseProperties",
  "cape-doctor-crane": "payOthers",
  "tokoloshe-astray": "teleport",
  "park-station-pickpocket": "steal",
```

### 季節(12ヶ月。地方コードは `gt/wc/kzn/ec/fs/nw/mp/lp/nc`)

**南半球なので実際の季節は北半球と逆**(4月始まりの配列だが、中身は
南アフリカの実際の季節・祝日)。数値は韓国・ドイツ等の既存盤面の相場
(全国給付200〜380、地方倍率0.8〜1.3)に合わせた**たたき台**。最終値は
取りまとめ側の判断で調整してよい。

```ts
  southafrica: [
    /* 0 Apr 自由の日(1994年4月・初めての民主選挙) */ [
      { op: "all-players-gain-cash", amount: 260 },
    ],
    /* 1 May ハイフェルトの初霜・メーデー */ [
      { op: "all-players-gain-cash", amount: 220 },
    ],
    /* 2 Jun 若者の日(1976年ソウェト蜂起)・真冬 */ [
      { op: "region-income-multiplier", regionId: region("kzn"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("fs"), multiplier: 0.85 },
    ],
    /* 3 Jul マンデラ・デー(67分間) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug 女性の日(1956年の行進)・ナマクアランド開花期の始まり */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("nc"), multiplier: 1.2 },
    ],
    /* 5 Sep 遺産の日(ナショナル・ブライ・デー)・春 */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("gt"), multiplier: 1.15 },
    ],
    /* 6 Oct ジャカランダの満開 */ [
      { op: "region-income-multiplier", regionId: region("gt"), multiplier: 1.25 },
    ],
    /* 7 Nov マトリック最終試験 */ [
      { op: "region-income-multiplier", regionId: region("gt"), multiplier: 0.9 },
    ],
    /* 8 Dec 和解の日・夏休み開始 */ [
      { op: "all-players-gain-cash", amount: 380 },
      { op: "region-income-multiplier", regionId: region("wc"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("kzn"), multiplier: 1.2 },
    ],
    /* 9 Jan 新学年・真夏 */ [
      { op: "region-income-multiplier", regionId: region("wc"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("nc"), multiplier: 0.85 },
    ],
    /* 10 Feb フィンボスの野火の季節 */ [
      { op: "region-income-multiplier", regionId: region("wc"), multiplier: 0.8 },
    ],
    /* 11 Mar 人権の日(1960年シャープビル) */ [
      { op: "all-players-gain-cash", amount: 260 },
    ],
  ],
```

---

## 7. `src/presentation/components/events/dooms/index.ts`

絵の専任が7枚(`southafrica-load-shedding-line.tsx` など、`load-shedding-line`
/ `cable-theft` / `veld-fire-tracks` / `highveld-storm-cutting` /
`cape-doctor-crane` / `tokoloshe-astray` / `park-station-pickpocket`)を
描いたら、そのファイル名で追記する。

---

## 測定記録

- 2026-08-19 22:15〜22:17 JST: 5都市時点で `node --check` / `eslint` / import テスト通過
- 2026-08-19 23:xx JST: 41都市・53路線まで拡張。`node --check` / `eslint` 通過、
  重複キー無し、孤立都市無し
- `node scripts/check-sea-routes.mjs southafrica`(使い捨てcontent.jsonで実施、
  実施後に削除済み): hermanus–knysna が海上51%で引っかかり、端を入れ替えて解消。
  最終結果「60px超の食い違いなし」
- mark/bg: 41都市・組み合わせ41 → 同じ絵になる都市0組
- money-events: 22件(増11・減11)、9州すべてでgain/lossどちらも引ける
- flavour: items 9件・doom 7件・seasons 12件・regions 9件
- music: 9州ぶんのSTYLES、全て8和音・8小節
- 2026-08-20 JST: quiz.mjs を3問から101問に拡張。難易度分布は
  1〜3=26問(≥20)/ 7以上=30問(≥25)/ 9〜10=10問(=10)、全基準を満たす。
  `node --check` / `eslint` 通過、重複する問い文なし。難易度9〜10の10問は
  互いに異なる題材(ディストリクト・シックス/ソフィアタウン/リヴォニア裁判/
  国歌の作曲者/コンスティテューション・ヒル/SSメンディ号/ファナカロ/
  スティーブ・ビコ/マリカナ/SSワラター号)で重ならないことを確認済み。
  `scripts/check-quiz.mjs` 本体は焼き上がった `country-index.json` が要るため
  自分では回せなかった(southafricaは未登録)。代わりに `cities.mjs` の
  tag/factを突き合わせる簡易スクリプトを自分で書いて全問チェックし、
  答えの文字列が都市カードの記述と重なる61件(誤検知含む延べ件数、
  同一問題が4言語ぶん重複計上されている)を1件ずつ目で確認した。
  本物とみなして直したのは1件(Q「世界最大の鳥」→ダチョウ。
  アウツホールンのカードが丸ごとダチョウ羽根産業の話だったため、
  ミーアキャットの問いに差し替えた)。残りは地名・国名・「金」「鉱山」
  「南アフリカ」のような、どのカードにも出る一般名詞や、都市カードとは
  別の事実(例:オレンジ川=アピントンのカードは灌漑の話、問いは川の長さの
  話)による誤検知と判断した。**難易度9〜10の10問は、別の盤面の担当に
  裏取りを依頼したい。**
