# ノルウェー盤面の登録内容

`scripts/countries/norway/` の7ファイル(index/cities/geography/quiz/
money-events/flavour/music)と `ART-KEYS.md` は作成済み。**`art.mjs` と
厄災の絵7枚は絵の専任が別途作成する。**以下、共有ファイルへ貼り付けるための
コード片。

## 0. 地方区分(5区分)の決定理由

```
ol 東部(Østlandet、オスロ周辺)      11都市
ve 西部・フィヨルド地帯(Vestlandet)  11都市
tr トロンデラーグ(Trøndelag)          6都市
nn 北部(Nord-Norge)                 12都市
so 南部海岸(Sørlandet)                8都市
```

全区分が6都市以上のため、地方まるごとの季節・音楽を分けても薄くなりません。
`so`(本来のソールランネットは6都市)には、地理的に隣接するヴェストフォル/
テレマルクの2都市(シーエン・トンスベルグ)を加えて8にしました。この2都市は
歴史的に別州(ヴェストフォル・テレマルク)ですが、南向きの海岸線という地理的
連続性があり、6都市のままより季節・音楽の性格を持たせやすいと判断しました。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の import の下に追加):

```js
import { buildNorwayContent } from "./countries/norway/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行:

```js
const AUTHORED_COUNTRIES = [
  // ...既存の並び...
  buildNorwayContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加:

```js
  // kr840,000(1200×700)。1NOK≒14.3円(USD/JPY≒150、USD/NOK≒10.5から逆算)として
  // 12,000,000÷14.3÷1200≒699 → 700。team-lead確認済み(2026-08-19)。
  norway: 700,
```

(`CITY_PROPS` への追加は無し。都市の物件価格は `cities.mjs` に直接書き込んで
ある。当初は最安260〜最高2800で10.8倍と目安の12〜17倍をわずかに割っていた
ため、最安の2件(ホーネフォスの支線停留所・ミルダルの防雪覆い区間)を
200まで下げ、**最終的に200〜2800の14.0倍**にした。利回りの率はどの物件も
統一してある。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  norway: () => import("./norway.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  norway: () =>
    import("../content/norway.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

**鍵の衝突なしを確認済み**(下記「自分で確かめたこと」参照)。

```ts
  // Norway
  reinsdyr: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  hurtigrute: { type: "choose-exact-dice" },
  regiontog: { type: "roll-fixed-dice", diceCount: 2 },
  flytoget: { type: "roll-fixed-dice", diceCount: 3 },
  rommegrot: { type: "none" }, // 厄災の神(ニッセ)のward item(passive)
  jernspiker: { type: "repel-spirit" },
  lesenotater: { type: "quiz-save" },
  solvklump: { type: "gain-cash", amount: 380 },
  hurtigbat: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `ol`=東部 / `ve`=西部・フィヨルド / `tr`=トロンデラーグ /
`nn`=北部 / `so`=南部海岸。4月始まり。7月(index 3)がフェッレスフェーリエ
(産業が三週間いっせいに休む慣習・休神)、12月(index 8)が全員アイテム配布
(クリスマスとユーレニッセ)。

既存の `SEASON_EFFECTS_BY_COUNTRY` オブジェクトの閉じ `};` の直前に追加:

```ts
  /**
   * ノルウェー。イースターの山スキー → 憲法記念日の子どもの行進 →
   * サンクトハンスの夜のかがり火と漁の解禁 → フェッレスフェーリエ(7月・休神) →
   * 新学期と明るい夜の終わり → 高原からの家畜の下山とヘラジカ猟 →
   * 大西洋からの秋の嵐 → 北部の極夜の始まり → クリスマスとユーレニッセ
   * (12月・給アイテム) → 内陸の谷の厳寒 → サーミ週間 → 北部への光の帰還、
   * という流れ。都市カードと同じく「国単位の好不況」ではなく
   * 「地方ごとの気候・産業・行事」で差をつけた。
   */
  norway: [
    /* 0 Apr イースターの山スキー */ [
      { op: "region-income-multiplier", regionId: region("ve"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("ol"), multiplier: 1.1 },
    ],
    /* 1 May 憲法記念日の子どもの行進 */ [
      { op: "all-players-gain-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("ol"), multiplier: 1.15 },
    ],
    /* 2 Jun サンクトハンスの夜のかがり火と漁の解禁 */ [
      { op: "region-income-multiplier", regionId: region("so"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ve"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("nn"), multiplier: 1.1 },
    ],
    /* 3 Jul フェッレスフェーリエ、産業がいっせいに休む */ [
      { op: "region-income-multiplier", regionId: region("so"), multiplier: 1.3 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug 新学期と明るい夜の終わり */ [
      { op: "all-players-pay-cash", amount: 150 },
      { op: "region-income-multiplier", regionId: region("ol"), multiplier: 1.1 },
    ],
    /* 5 Sep 高原からの家畜の下山とヘラジカ猟 */ [
      { op: "region-income-multiplier", regionId: region("tr"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("nn"), multiplier: 1.15 },
    ],
    /* 6 Oct 大西洋からの秋の嵐 */ [
      { op: "all-players-pay-cash", amount: 150 },
      { op: "region-income-multiplier", regionId: region("ve"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("nn"), multiplier: 0.85 },
    ],
    /* 7 Nov 北部で極夜が始まる */ [
      { op: "region-income-multiplier", regionId: region("nn"), multiplier: 0.8 },
    ],
    /* 8 Dec クリスマスとユーレニッセ */ [
      { op: "region-income-multiplier", regionId: region("ol"), multiplier: 1.2 },
      { op: "give-item-to-all" },
    ],
    /* 9 Jan 内陸の谷の厳寒 */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("tr"), multiplier: 0.85 },
    ],
    /* 10 Feb サーミ週間 */ [
      { op: "region-income-multiplier", regionId: region("nn"), multiplier: 1.25 },
    ],
    /* 11 Mar 北部への光の帰還 */ [
      { op: "all-players-gain-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("nn"), multiplier: 1.15 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

既存の `DOOM_EFFECT_ID_BY_LEGACY_ID` オブジェクトの閉じ `};` の直前に追加:

```ts
  // Norway
  snoskred: "skipTurn",
  havstorm: "payOthers",
  reinsdyrspor: "skipTurn",
  midnattsinnsomni: "percentLoss",
  bomstasjon: "fine",
  nissespill: "teleport",
  spleiselag: "steal",
```

対応の考え方: 雪崩(snoskred)は除雪が終わるまで足止め→skipTurn、嵐による
欠航(havstorm)は足止めされた者どうしで負担を分け合う→payOthers(既存の
`ferry-cancelled` と同じ考え方)、トナカイの居座り(reinsdyrspor)も同じく
足止め→skipTurn、白夜の寝不足で物をどこにしまったか分からなくなる
(midnattsinnsomni)は積み重なる小さな損失→percentLoss、思わぬ通行料金所
(bomstasjon)はそのまま固定額の出費→fine、腹を空かせたニッセに化かされる
(nissespill)は気づけば別の場所へ迷い込んでいる→teleport(既存の
`taniwha-lost` / `lisovyk-stezhka` と同じ「土地の精霊に化かされる」パターン)、
割り勘が足りない(spleiselag)は誰かの分がひっそり消えている→steal。

`loseProperties` は今回使っていません(自分の持つ物件が壊れる筋の話が
無かったため)。7種類のうち6種類を使い、skipTurnのみ2件重複しています。

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

**絵の専任の担当が作成します。**ファイル名は `norway-snoskred.tsx` /
`norway-havstorm.tsx` / `norway-reinsdyrspor.tsx` /
`norway-midnattsinnsomni.tsx` / `norway-bomstasjon.tsx` /
`norway-nissespill.tsx` / `norway-spleiselag.tsx` を想定しています。
`laborcamp`(モー・イ・ラーナ、捕虜労働)・`battle`(ナルヴィク、1940年海戦)・
`totaldestruction`(ハンメルフェスト、焦土作戦)・`sovietliberation`
(シルケネス)は都市の mark/bg であって厄災の絵ではありませんが、念のため
ART-KEYS.md の「重い題材について」の節を参照してください(記念碑的な描き方を
求めています)。

## 補足: `src/presentation/components/setup/country-groups.ts`

確認していません(触らない指示のファイル)。ノルウェーは1国なので振り分けに
迷いは無いはずですが、既存の束の切り方に合わせて登録側で入れてください。

## 自分で確かめたこと

- `node --input-type=module -e "import('./scripts/countries/norway/index.mjs')..."`
  は `art.mjs` が無いため実行できません。**絵ができ次第、team-lead側で
  一度通して都市・路線・クイズ・出来事・アイテム・厄災・季節・mark/bg・
  音楽スタイルの件数を確認してください。**個別ファイルはそれぞれ
  `node --check` と直接 import して以下を確認済みです。
  - 都市48 / 路線51(2026-08-19 23:58 JST)
  - クイズ100(2026-08-19 23:37 JST)
  - アイテム9 / 厄災7 / 季節12 / 地方5(2026-08-20 00:xx JST)
  - 出来事19(増12・減7)、全5地方でgain≥1・loss≥1を確認済み
- 4言語の欠け: 各ファイル自前の `t()` はパイプがちょうど3本(4分割)で
  なければ即座に例外を出すため、各ファイルを単独でimportできた時点で担保
  されている。
- 座標: 48都市すべてが `NORWAY_PROJ` の範囲内([4.3, 31.3]×[57.85, 71.35])に
  収まっていることを機械チェック済み。
- **路線のgeometry: `check-sea-routes.mjs` を、使い捨てcontent.json
  (id/proj/cities/edges/land/lakesの5項目のみ)を自分で組んで計3回以上
  回し、13本→3本→0本まで絞り込んだ。最終結果は「60px超の食い違いなし」。**
  使い捨てファイルは毎回検査後に削除し、tracked でないことを都度確認済み。
  直しかたの内訳・踏んだ穴(edgeIndexの添字ずれ・海岸線をどちら側に寄せるかの
  勘違い)は2026-08-19 23:59 JSTの報告メッセージに詳しく書いてあります。
  経路の変更が2件あります: `odda-voss(sea)` → `odda-bergen(sea)`
  (ヴォスが内陸のため)、`narvik-tromso(sea)` を削除(svolvaer経由の冗長路線)。
- `seg`: 51本の投影後距離を実測。最長412px(スヴォルヴェル—トロムソ)で
  `seg=120` なら412/120≒3.4マス。5マス超は0本のため、この値を採用した。
- mark(41種)とbg(**29種**、2026-08-20に48種から統合。理由は下記)は
  48都市から過不足なく参照されていることを機械チェック済み。
  **記号+背景=計70枚(上限70枚に一致)、同じ絵になる都市は4組。**
  統合前は mark41・bg48(計89枚・同じ絵0組)で上限(当初55枚→後に70枚に
  改定)を超えていた。土地の性格が実際に同じ町どうしをまとめる形で
  bg19種を削減した(例: 星形要塞の3町のうち2町を `fortresstown` に、
  焦土作戦で全焼し建て直された3町を `scorchedearth` に)。統合した組は
  受け持つ町の mark がすべて異なるため、意図せず同じ絵になった組は無い。
  同じ絵になる4組(コングスヴィンゲル/フレドリクスタ・ドンボース/ドランメン・
  オッダ/モーシューエン・グリムスタ/シーエン)は、mark も bg も土地の
  性格が実際に同じであることを理由に意図的に選んだ。詳細は ART-KEYS.md 参照。
- 物件価格: 当初260〜2800(10.8倍)で目安をわずかに割っていたため、
  最安2件を200まで下げ、**200〜2800の14.0倍**にした。利回りの率は
  どの物件も統一してあります。
- アイテム鍵9件が既存全盤面の鍵の一覧と衝突しないことを機械チェック済み
  (0件、2026-08-20時点)。
- クイズ: `check-quiz.mjs` を使い捨てcontent.json(id/cities/quiz)で実行
  (2026-08-19 23:37 JST)。答えの漏れ2件・言語混入19件を検出し、**すべて
  誤検知と判断した理由を quiz.mjs 完成報告のメッセージに書いてあります。**
  `ACCEPTED` / `ACCEPTED_LEAKS` への追記をお願いします。
- クイズの答えの位置(`a`)は0が99・1が0・2が1という大きな偏りがあります。
  指示書のとおり出題時にシャッフルされるため直していませんが、数字として
  報告しておきます。
- 音楽: 5地方すべての`mel`(8小節)が1小節16ステップの範囲に収まっている
  ことを確認済み。
- 厄災の絵7枚・`art.mjs`: **絵の専任の担当作業のため未着手。**
  `npx eslint scripts/countries/norway/` は全ファイルで警告0。

## 質について

- 都市1件あたりの面積: 48都市・BW1930×BH2250=4,342,500px² →
  約90,469px²/都市。ガイドの目安(90k)どおり。
- 路線密度: 48都市に対して51本(1都市あたり1.06本)。フランス・韓国に近い
  密度。全体で1つの連結成分になっていることを確認済み(オスロからどの
  都市へもたどり着ける)。

## 迷った点・判断した点

- **ブリーフにあった「鉄鉱石のためにスウェーデン側から敷かれた線、不凍港」
  というナルヴィクの題材は、europe盤面(ナルヴィク+キルナ)が既に語って
  いたため、この盤面では主役にしていません。**代わりに「その線がどこへ
  行かないか」(ノルウェー自身の鉄道網とはついに結ばれなかった)を軸に
  しました。詳細は cities.mjs 完成報告(2026-08-19)参照。
- **サーミの人々**: カラショーク(サーミ議会所在地)の都市カードと、
  クイズ5問(サプミ4か国・サーミ語の公式地位・サーミの旗・トナカイ放牧権・
  ラーヴ)、季節1件(サーミ週間)に分散させました。伝説を事実として書かず、
  「議会」「放牧の権利」「公式言語としての地位」という制度的な事実で描いて
  あります。
- **占領期**: ボードー・モー・イ・ラーナ(捕虜労働、「血の道」)・モルデ
  (政府亡命)・オンダルスネス/ナムソス(連合軍上陸と撤退)・ハンメルフェスト/
  ホニングスヴォーグ/アルタ(焦土作戦)・シルケネス(千回超の空襲、ソ連軍
  解放)の7都市に分散させ、同じ「爆撃された」の一本調子にならないよう
  それぞれ異なる具体的な出来事にしました。ナルヴィクは1940年のナルヴィク
  海戦(連合軍の初期の地上戦勝利)です。
- **ブラックメタルの教会放火**(クイズ、難易度7): 1990年代の実際の犯罪史で
  あり、現代文化の暗い一章として飾らずに書きました。ジャンル自体を貶める
  書き方にはしていません。
- **領有権に争いのある土地**: 該当なし(スヴァールバル諸島は都市を置いて
  いない。クイズでスヴァールバル条約のビザ無し居住権を扱ってはいるが、
  盤面上の都市としては採用していない)。
