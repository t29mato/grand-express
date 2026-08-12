# ガーナ盤面の登録内容

`scripts/countries/ghana/` 8ファイルと `dooms/ghana-*.tsx` 7枚は作成済み。
以下、共有ファイルへ貼り付けるためのコード片。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の import 群の下に追加):

```js
import { buildGhanaContent } from "./countries/ghana/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行:

```js
const AUTHORED_COUNTRIES = [
  // ...既存の呼び出し...
  buildGhanaContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加:

```js
  // ₵1,200 → ₵1,200,000。1セディ≒10円(1ドル≒150円/1ドル≒15セディ、
  // 2025年半ばの相場を基準)として、日本(×10000で¥12,000,000)と
  // 同じ物価感覚になるよう mul=10000/10=1000 を当てた。
  ghana: 1000,
```

(`CITY_PROPS` への追加は無し。イタリア・韓国と同じく、都市の物件価格は
`cities.mjs` に直接書き込んである。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  ghana: () => import("./ghana.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  ghana: () => import("../content/ghana.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

キーは禁止語リスト(既存64か国ぶんのキー一覧)と突き合わせて衝突なしを確認済み。

```ts
  // Ghana
  kwahu: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  adae: { type: "choose-exact-dice" },
  trotro: { type: "roll-fixed-dice", diceCount: 2 },
  motorway: { type: "roll-fixed-dice", diceCount: 3 },
  sankofa: { type: "none" }, // 厄災の神(アナンシ)のward item(passive)
  libation: { type: "repel-spirit" },
  expo: { type: "quiz-save" },
  lotto: { type: "gain-cash", amount: 380 },
  okyeame: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `gar`=大アクラ / `cen`=中部・海岸 / `asa`=アシャンティ / `vol`=ヴォルタ /
`nor`=北部 / `wes`=西部。4月始まり。

```ts
  /**
   * ガーナ。クワフェのイースター・パラグライディングと大雨季の始まり →
   * 雨季のピーク → 雨のあいまの小休止(漁期) → 八月の休み →
   * ホモウォ(8月・休神) → 小雨季と新ヤムイモ → カカオの収穫開始 →
   * ハルマッタン到来とホグベツォツォ → ハルマッタンとクリスマス →
   * 一年でいちばん乾いた1月 → ナショナル・チョコレート・デー → 独立記念日、という流れ。
   */
  ghana: [
    /* 0 Apr クワフェのイースターと大雨季の始まり */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("gar"), multiplier: 1.15 },
    ],
    /* 1 May 大雨季のピーク */ [
      { op: "region-income-multiplier", regionId: region("asa"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("wes"), multiplier: 1.15 },
    ],
    /* 2 Jun 雨のあいまの小休止(漁期) */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.25 },
    ],
    /* 3 Jul 八月の休み(海岸の乾いた凪) */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("asa"), multiplier: 0.85 },
    ],
    /* 4 Aug ホモウォ(休神) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("gar"), multiplier: 1.3 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep 小雨季と新ヤムイモ・オドウィラ */ [
      { op: "region-income-multiplier", regionId: region("asa"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("vol"), multiplier: 1.15 },
    ],
    /* 6 Oct カカオの収穫開始 */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("asa"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("wes"), multiplier: 1.25 },
    ],
    /* 7 Nov ハルマッタン到来とホグベツォツォ */ [
      { op: "region-income-multiplier", regionId: region("vol"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 0.85 },
    ],
    /* 8 Dec ハルマッタンとクリスマス */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("gar"), multiplier: 1.2 },
    ],
    /* 9 Jan 一年でいちばん乾いた月 */ [
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("wes"), multiplier: 1.15 },
    ],
    /* 10 Feb ナショナル・チョコレート・デー */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("wes"), multiplier: 1.2 },
    ],
    /* 11 Mar 独立記念日 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("gar"), multiplier: 1.3 },
    ],
  ],
```

**この節は他国の相場を見て私が仮に数値を当てたものです。** 季節1件ごとの
`amount`/`multiplier` は他国(イタリア・韓国)の値を目安に揃えましたが、
ゲーム全体のバランス調整はここを扱う担当の判断を優先してください。
`rest-spirit`(厄災の神が休むターン)は8月(index 4、ホモウォ)に置きました
(イタリアが8月にフェラゴストで休神にしたのと同じ考え方)。

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

7種の効果それぞれに1件ずつ割り当ててあります(下記「迷った点」参照)。

```ts
  // Ghana
  matecall: "teleport",
  dumsor: "percentLoss",
  harmattanhaze: "skipTurn",
  owarebet: "payOthers",
  fantasycoffin: "loseProperties",
  mudroad: "fine",
  pickpocket: "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(アルファベット順、`FranceXxx` と `GermanyXxx` のあいだ):

```ts
import { GhanaDumsor } from "./ghana-dumsor";
import { GhanaFantasycoffin } from "./ghana-fantasycoffin";
import { GhanaHarmattanhaze } from "./ghana-harmattanhaze";
import { GhanaMatecall } from "./ghana-matecall";
import { GhanaMudroad } from "./ghana-mudroad";
import { GhanaOwarebet } from "./ghana-owarebet";
import { GhanaPickpocket } from "./ghana-pickpocket";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "ghana-matecall": GhanaMatecall,
  "ghana-dumsor": GhanaDumsor,
  "ghana-harmattanhaze": GhanaHarmattanhaze,
  "ghana-owarebet": GhanaOwarebet,
  "ghana-fantasycoffin": GhanaFantasycoffin,
  "ghana-mudroad": GhanaMudroad,
  "ghana-pickpocket": GhanaPickpocket,
```

## 自分で確かめたこと

- `node -e 'import("./scripts/countries/ghana/index.mjs").then(m => { const c = m.buildGhanaContent(); console.log(Object.keys(c.cities).length, c.edges.length, c.quiz.length, c.moneyEvents.length); })'`
  → `37 41 38 22`(都市37・路線41・クイズ38・出来事22)。例外なし
  (`buildGhanaContent()` は全 `t()` 呼び出しを通すため、4言語のどれか1つでも
  欠けていれば例外で落ちる。実際に作業中、quiz.mjsで1件〈PANAFESTの設問の
  日本語訳を書き忘れ〉ここで落ちて気づけた)。
- 4言語欠けの機械チェック: `cities.mjs`(37都市×n+props)・`flavour.mjs`
  (アイテム9・厄災神・災難7・季節12・地方6・meta)・`quiz.mjs`(38問)・
  `money-events.mjs`(22件)それぞれについて、全ロケールフィールドが
  非空文字列かを走査するnode script(このメッセージ内で使ったもの)を書いて
  実行し、0件を確認。
- 都市の座標: 全37都市が投影範囲内(`LON0<lo<LON1`・`LAT1<la<LAT0`)かつ
  海岸線ポリゴン(`GHANA_LAND[0]`)の内側にあることをpoint-in-polygonで
  機械確認済み(37件とも `true`)。海岸沿いの都市はいずれも海岸線から
  緯度でおよそ0.12〜0.16度(≒39〜52px)の余裕を持たせてある(実測)。
- `mark`/`bg`: 37都市すべての参照先(15キー)が `GHANA_MARKS`/`GHANA_BG` に
  存在することを機械確認済み(不足0)。未使用キーも無し(15キーすべて
  1件以上の都市から参照されている)。
- `seg` の実測: 41路線すべての投影後距離を実測。既定の84だと3本
  (最長939px、クマシ―タマレ)が5マス超になったため、110にして
  クマシ―タマレ1本(939px→9マス、上限クランプ)だけが5マス超に収まる
  ことを確認した。
- 背景の平均要素数: 15種・平均**30.0個**(`<rect|circle|ellipse|path|line|
  polygon|polyline>` のタグ数で機械計測、最少はcapital/savanna/goldmineの25、
  最多はmosqueの52)。目安40には届いていないが、韓国の16種27個は上回った。
  goldmine/kente/damが特に薄かった(13〜15個)ため、鉱山車・糸巻き・
  川辺の建物などを足して底上げした一回の修正を経ての数値。
- `sky()` の第3引数: 15背景すべてで「次に来る全面塗りの開始y」と突き合わせ、
  `rsvg-convert` でマゼンタ台紙の上に全15枚をPNG化して目視確認済み
  (塗り残しの帯なし)。密度を足す修正のあとも再度PNG化して確認した。
- 物件価格の階段: 実測で**最安150〜最高2800、18.7倍**(茨城16.3倍・
  イタリア16.5倍・韓国12.7倍と同水準)。当初はアクラを2800(顔)にしていたが、
  team-lead指摘を受けてケープコースト城を2800(顔)に、アクラは1200へ
  格下げした。
- アイテム9件のキー(`kwahu` `adae` `trotro` `motorway` `sankofa` `libation`
  `expo` `lotto` `okyeame`)を、依頼メッセージに貼られた既存64か国分のキー
  一覧と突き合わせ、衝突なしを確認済み。
- 厄災の絵7枚: `<text` 要素を使っていないことを機械確認済み(0件)。
  SVGタグの開閉数(`<svg`/`<g`/`<style`とその対応する閉じタグ)を機械確認し、
  全7枚で数が一致することを確認。`rsvg-convert`でPNG化して目視確認もした。

## 質について

- `mark` と `bg` はキーを1対1で揃えた(イタリアのように別集合にはしていない)。
  37都市に対し15種(1種あたり平均2.47都市)で、イタリア(27種/45都市≒1.67)
  より粗いが、韓国(16種/40都市=2.5)に近い密度。
- 路線41本/37都市≒1.11本/都市。イタリア(59/45≒1.31)よりやや疎ら。
  北部8都市(タマレ・イェンディ・ボルガタンガ・ワ・パガ・ララバンガ・
  サラガ・イェジ)は鉄道が無いため道路だけで疎に結んであり、単一路線の
  末端になっている町(サラガ・ヨェジ・パガの一部)がある。全体は
  1つの連結成分であることを確認済み(どの町からもどの町へもたどり着ける)。

## 迷った点・確認してほしい点

- **厄災の効果割り当て(6b)**: 7種の効果(fine/percentLoss/skipTurn/
  loseProperties/payOthers/teleport/steal)に対して、`matecall`→teleport
  (乗り違えて別の場所へ)・`owarebet`→payOthers(賭けで負けて相手に払う)・
  `pickpocket`→steal・`harmattanhaze`→skipTurn(足止め)は自信を持って
  割り当てたが、`fantasycoffin`(葬列渋滞)→loseProperties は他の6つに比べて
  narrative上の結びつきが弱い(イタリアの「山火事→loseProperties」ほど
  直接的でない)。7個の枠を埋める都合で割り当てたので、より良い組み合わせが
  あれば直してほしい。
- **ボルタ湖の渡し(アコソンボ⇄イェジ)の航路**: 両端(アコソンボ0.0563,6.2986
  とイェジ-0.75,7.85)はどちらも実測でボルタ湖の楕円チェーンの上に正しく
  乗っているが、湖はアコソンボから北へ伸びたあと西へ折れる「く」の字形
  (西の腕がイェジへ向かう)をしているため、2点を直線で結ぶ航路は湖の
  最も幅の広い中央部分ではなく、折れ曲がりの内側(陸に近い部分)を
  斜めに横切る形になる。`check-sea-routes.mjs`で引っかかる可能性が高いが、
  両端点はどちらも動かせない(実在の港町の座標のため)。折れ線を許容する
  仕組みが無ければ、中継点を挟む対応が要るかもしれない。
- **通貨倍率の根拠**: 1ドル≒150円・1ドル≒15セディ(2025年半ばの相場、
  セディは変動が大きい通貨)を基準に mul=1000 とした。トルコ・中国と同じ
  「実勢に厳密には合わせず、時期を明記して丸めた値」という扱い。
- **季節12ヶ月の数値(6a)**: 他国の相場を見て仮に置いた値で、ゲーム全体の
  バランスは見ていない。8月(ホモウォ)を休神にする判断はイタリアの
  フェラゴストにならったが、他の月にすべきという判断があれば直してほしい。
- **地名の言い換え**: 依頼にあった「アバンダ」「ンクルンバ」「アクスンボ」は
  実在の町として特定できなかったため(team-lead確認の結果、依頼時の
  書き間違いと判明)、実在が確認できる町(コフォリドゥア・ンカウカウなど)に
  置き換えた。
