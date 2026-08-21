# オセアニア盤面の登録内容

`scripts/countries/oceania/` の7ファイルのうち6つ(`cities`/`geography`/`quiz`/
`money-events`/`flavour`/`music`)は作成済み。**`art.mjs` と `index.mjs`、
`dooms/oceania-*.tsx` 7枚は未作成**(絵の担当待ち。`cities.mjs` に書いた
mark40種・bg30種のキー一覧は下記「4. 絵の鍵」参照)。

都市51・路線54・クイズ101・お金の出来事16・アイテム9・厄災7・季節12・
mark40種・bg30種(計70枚、上限ちょうど)・音楽3地方。以下、共有ファイルへ
貼り付けるためのコード片(絵が揃うまでは1・2・3・5・6のみ有効)。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の最後の大陸盤面の import の下に追加):

```js
import { buildOceaniaContent } from "./countries/oceania/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行:

```js
const AUTHORED_COUNTRIES = [
  // ...既存の各国...
  buildOceaniaContent(),
];
```

**`index.mjs` はまだ無い。** `art.mjs` ができたら、`scripts/countries/africa/index.mjs`
を手本に以下の形で作成すること(中身はほぼ機械的):

```js
import { OCEANIA_BG, OCEANIA_MARKS } from "./art.mjs";
import { OCEANIA_CITIES, OCEANIA_EDGES } from "./cities.mjs";
import {
  OCEANIA_DOOM, OCEANIA_ITEMS, OCEANIA_META, OCEANIA_REGIONS,
  OCEANIA_SEASONS, OCEANIA_SPIRIT,
} from "./flavour.mjs";
import {
  OCEANIA_COLORS, OCEANIA_LABELS, OCEANIA_LAKES, OCEANIA_LAND,
  OCEANIA_PROJ, OCEANIA_RIVERS, OCEANIA_TERRAIN, renderOceaniaDecor,
} from "./geography.mjs";
import { OCEANIA_MONEY_EVENTS } from "./money-events.mjs";
import { OCEANIA_STYLES } from "./music.mjs";
import { OCEANIA_QUIZ } from "./quiz.mjs";

function buildDecor() {
  const p = OCEANIA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderOceaniaDecor(px, py); // 現状は空文字を返すだけ(装飾なし)
}

export function buildOceaniaContent() {
  return {
    id: OCEANIA_META.id,
    name: OCEANIA_META.name,
    blurb: OCEANIA_META.blurb,
    cur: OCEANIA_META.cur,
    start: OCEANIA_META.start,
    cpuNames: OCEANIA_META.cpuNames,
    proj: OCEANIA_PROJ,
    regions: OCEANIA_REGIONS,
    cities: OCEANIA_CITIES,
    edges: OCEANIA_EDGES,
    quiz: OCEANIA_QUIZ,
    items: OCEANIA_ITEMS,
    spirit: OCEANIA_SPIRIT,
    doom: OCEANIA_DOOM,
    seasons: OCEANIA_SEASONS,
    moneyEvents: OCEANIA_MONEY_EVENTS,
    stripe: OCEANIA_META.stripe,
    marks: OCEANIA_MARKS,
    bg: OCEANIA_BG,
    sea: OCEANIA_COLORS.sea,
    seaWave: OCEANIA_COLORS.seaWave,
    landBase: OCEANIA_COLORS.landBase,
    coast: OCEANIA_COLORS.coast,
    land: OCEANIA_LAND,
    terrain: OCEANIA_TERRAIN,
    lakes: OCEANIA_LAKES,
    rivers: OCEANIA_RIVERS,
    labels: OCEANIA_LABELS,
    decor: buildDecor(),
    styles: OCEANIA_STYLES,
  };
}
```

`renderOceaniaDecor` はいまのところ空文字を返す関数(装飾なし)。
`(px, py)` を受け取れるよう引数を足すか、無装飾のまま `()` のままにするかは
実装側の一貫性に合わせて調整してよい(他の盤面は `(px, py)` を受け取る形)。

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

```js
  // 開始資金1200 × 100 = $120,000。世界一周・アジア・アフリカなど他の大陸盤面と同じ倍率。
  oceania: 100,
```

(`CITY_PROPS` への追加は無し。物件価格は `cities.mjs` に直接書き込んである。
最安90〜最高1100=12.2倍で、目安の12〜17倍の下限ぎりぎりに収まっている。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  oceania: () => import("./oceania.content.json").then((m) => m.default),
```

## 4. 絵の鍵(art.mjs待ち)

`cities.mjs` が使う mark40種・bg30種は以下(取り出し方は下記コマンド)。
**同じ絵になる都市は5組**(都市数51の10%ちょうど、上限内)。
規則(記号+背景≤70枚/同じ絵になる都市≤都市数の1割)は両方満たしている。

```
node --input-type=module -e '
import { OCEANIA_CITIES } from "./scripts/countries/oceania/cities.mjs";
const cs = Object.entries(OCEANIA_CITIES);
const mark = {}, bg = {};
for (const [id,c] of cs) {
  (mark[c.mark] ??= []).push(id);
  (bg[c.bg] ??= []).push(id);
}
console.log("MARK", mark);
console.log("BG", bg);
'
```

同じ絵になる5組(意図的な重複。理由は `cities.mjs` 各都市のコメント参照):
`lautoka`=`labasa`(サトウキビ鉄道)/`yaren`=`banaba`(燐鉱採掘で住民ごと移住)/
`majuro`=`funafuti`(海抜2m前後の首都環礁)/`honiara`と`hagatna`が
`battlefield`+`pacificwarfront`で重複。

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

**鍵の衝突なしを確認済み**(既存373件)。

```ts
  // Oceania
  coastwatcherpriority: { type: "extra-turn" },
  tradewindpassage: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  steamerticket: { type: "choose-exact-dice" },
  pandanuscharm: { type: "none" }, // 厄災の神(まだ来ない船)のward item(passive)
  shellmoneystring: { type: "gain-cash", amount: 380 },
  starcompasschart: { type: "quiz-save" },
  coprasack: { type: "roll-fixed-dice", diceCount: 2 },
  phosphatemanifest: { type: "roll-fixed-dice", diceCount: 3 },
  reefflare: { type: "repel-spirit" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `mel`=メラネシア / `mic`=ミクロネシア / `pol`=ポリネシア。4月始まり。
7月(index 3、トンガのクジラ)は変更なし、8月(index 4、貿易風の季節)が
全員アイテム配布、10月(index 6、台風の最盛期)が休神。

```ts
  /**
   * オセアニア大陸。バヌアツの地上ダイビング → PNGコーヒー収穫 →
   * トンガのクジラ → フィジーのハイビスカス祭り → 貿易風の季節(8月・給アイテム) →
   * ゴロカ・ショー → 台風の最盛期(10月・休神) → ウミガメの産卵 →
   * コプラの収穫 → 海鳥の営巣 → カツオ漁期 → パンノキの豊作、という流れ。
   */
  oceania: [
    /* 0 Apr バヌアツの地上ダイビング(ヤムイモ収穫祭) */ [
      { op: "region-income-multiplier", regionId: region("mel"), multiplier: 1.15 },
    ],
    /* 1 May PNGコーヒー収穫 */ [
      { op: "region-income-multiplier", regionId: region("mel"), multiplier: 1.1 },
    ],
    /* 2 Jun トンガのクジラ(ホエールウォッチング最盛期) */ [
      { op: "region-income-multiplier", regionId: region("pol"), multiplier: 1.25 },
    ],
    /* 3 Jul フィジーのハイビスカス祭り */ [
      { op: "region-income-multiplier", regionId: region("mel"), multiplier: 1.2 },
    ],
    /* 4 Aug 貿易風の安定した季節 */ [{ op: "give-item-to-all" }],
    /* 5 Sep ゴロカ・ショー */ [
      { op: "region-income-multiplier", regionId: region("mel"), multiplier: 1.15 },
    ],
    /* 6 Oct 台風の最盛期(休神) */ [
      { op: "region-income-multiplier", regionId: region("mic"), multiplier: 0.8 },
      { op: "rest-spirit" },
    ],
    /* 7 Nov ウミガメの産卵 */ [
      { op: "region-income-multiplier", regionId: region("mel"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("pol"), multiplier: 1.1 },
    ],
    /* 8 Dec コプラの収穫 */ [
      { op: "region-income-multiplier", regionId: region("mel"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("pol"), multiplier: 1.1 },
    ],
    /* 9 Jan 海鳥の営巣(遠隔環礁) */ [
      { op: "region-income-multiplier", regionId: region("mic"), multiplier: 1.15 },
    ],
    /* 10 Feb カツオ漁期(PNA操業日数) */ [
      { op: "region-income-multiplier", regionId: region("mic"), multiplier: 1.2 },
    ],
    /* 11 Mar パンノキの豊作(サイクロン季への備蓄) */ [
      { op: "region-income-multiplier", regionId: region("mel"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("mic"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("pol"), multiplier: 0.9 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

**`id` は絵の担当が実際に描くファイル名
(`dooms/oceania-{cyclonehalt,kingtideflood,ashfallground,reefstrand,
biosecurityhold,islandhopperfog,supplyshipslip}.tsx`)に合わせること。**
7種の効果(fine/skipTurn/percentLoss/loseProperties/payOthers/teleport/steal)
に1件ずつ割り当てた。一部は結びつきがやや弱いが、既存盤面にも同種の
弱い結びつき(例: 日本の「流氷で足止め中に置き引き」)があり、許容範囲内と判断した。

```ts
  // Oceania
  cyclonehalt: "steal", // ★ 港封鎖の混乱に紛れて荷物が盗まれる、というやや弱い結びつき
  kingtideflood: "skipTurn", // 冠水した滑走路で便が欠航し足止め
  ashfallground: "teleport", // 火山灰で便が別の空港へ振り替えられる
  reefstrand: "fine", // 座礁からの曳航・修理費
  biosecurityhold: "percentLoss", // 留め置かれた荷が傷んで値崩れ
  islandhopperfog: "loseProperties", // その週唯一の便を逃し、島の物件に商品を届けられない
  supplyshipslip: "payOthers", // ★ 高くついた備蓄を、同じ波止場で足止めされた他の旅行者と分け合う、というやや弱い結びつき
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

**art.mjsと同じく未着手。** 絵の担当が7枚(`OceaniaCyclonehalt` 等、
命名規則は他盤面に合わせる)を描き終えたら、`africa/REGISTER.md` の
該当節と同じ形でimport文と`DOOM_ANIMATIONS`への追加行を作成すること。

## 補足: `src/presentation/components/setup/country-groups.ts`

確認していません(触らない指示のファイル)。

## 自分で確かめたこと(測定 2026-08-21)

```
node --check scripts/countries/oceania/{cities,quiz,flavour,geography,money-events,music}.mjs   全てOK
npx eslint scripts/countries/oceania/                                                             警告なし
```

- **都市51・路線54・クイズ101・お金の出来事16・アイテム9・厄災7・季節12・音楽3地方**。
  すべて import して件数を実測(本文参照)。
- **4言語の欠け**: 全ファイルで `t()` の検証(`|`が3本ちょうど)を通過。
  書いている最中に例外で気づいたものはすべて直った状態でコミットしてある。
- **mark/bgの上限**: 記号40種+背景30種=70枚(上限ちょうど)。
  同じ絵になる都市5組(都市数51の10%ちょうど)。
- **陸地判定**: `node scripts/check-sea-routes.mjs oceania` を、使い捨ての
  `src/infrastructure/content/oceania.content.json`({id,proj,cities,edges,land,lakes})
  を組んで検査後に削除する手法(手順書の「焼く前でも回せる」と同じ)で回し、
  **60px超の食い違い0本**を確認した。当初5本の食い違いがあり、
  ラエ―ポートモレスビー・ラエ―ウェワクの直行便は削除(既存の迂回経路
  ポートモレスビー―アロタウ―ホニアラ―アラワ―ココポ―ラエで連結は保たれる。
  ラエは北岸・ポートモレスビーは南岸で、山を挟んだ直線航路が地図上
  陸を横切ってしまうため)、ポートモレスビー―ホニアラはアロタウ―ホニアラに
  差し替え、ラエ―ココポとポートビラ―ヌメアは端の入れ替えで直した。
  51都市すべてが1つの連結成分であることも確認済み(孤立都市0)。
- **クイズの漏れ**: `node scripts/check-quiz.mjs oceania` を同じ手法(quiz版)
  で回し、15件のうち9件を誤検知、2件を本物の漏れと判断して差し替えた
  (詳細はteam-leadへのメッセージ済み。判断理由も添付済み)。
  残り4件の「混入」はすべて、原語を出さないと問いが成立しない例外
  (`agreement`/`taboo`/`tattoo`/`television`)。`ACCEPTED_LEAKS`/`ACCEPTED`
  への追加は登録側にお願いしたい。
- **物件価格**: 最安90〜最高1100=12.2倍(目安12〜17倍の下限ぎりぎり)。
- **盤面の寸法**: BW3240×BH1420(比2.286)。トルコ(3020×1280・比2.36)に迫る、
  6枚の中で最も横長の盤面。太平洋の実際の広さを反映した形として
  team-leadに確認済み(2026-08-21のやり取り)。
- **難易度9〜10(10問)の確度**: 5問はやや確度が低いと自己申告済み
  (フェルディナンド符丁・フランシス・オナ・北ソロモン共和国・ジョン・フラムの日・
  マリアナ定住年代)。他盤面の担当によるレビューを依頼済み。
