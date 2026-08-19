# ベトナム盤面の登録内容

`scripts/countries/vietnam/` 7ファイル(`cities`/`geography`/`quiz`/
`money-events`/`flavour`/`music`/`index`)と `ART-KEYS.md` は作成済み。
`art.mjs` と `dooms/vietnam-*.tsx` 7枚は別担当(絵の専任)にお願いします。

都市43・路線43・クイズ103・お金の出来事28・アイテム9・厄災7・季節12・
mark43種・bg25種・音楽7地方。以下、共有ファイルへ貼り付けるためのコード片。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の最後の国盤面の import の下に追加):

```js
import { buildVietnamContent } from "./countries/vietnam/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行:

```js
const AUTHORED_COUNTRIES = [
  // ...既存の各国...
  buildVietnamContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

```js
  // 想定為替 1USD≒150円・1USD≒25,000ドン(1ドン≒0.006円)として
  // 12,000,000 ÷ 0.006 ÷ 1200 ≒ 1,650,000。インドネシア(1,000,000)より
  // 大きいのは、ドンのほうがルピアより「1ドル当たりの単位数」が多い
  // (25,000 vs 15,900程度)ため。**実際の為替レートでの検算をお願いします**
  // (自分ではAPI等でレートを確認できていません)。
  vietnam: 1650000,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  vietnam: () => import("./vietnam.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  vietnam: () =>
    import("../content/vietnam.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

**鍵の衝突なしを確認済み**(既存311件、下記「自分で確かめたこと」参照)。
9種の効果(carried-far / choose-exact-dice / roll-fixed-dice×2種 / none(ward) /
repel-spirit / quiz-save / gain-cash / extra-turn)が過不足なく1つずつ
埋まっていることを、韓国の9件と突き合わせて確認しました。

```ts
  // Vietnam
  xeomlift: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  riverferry: { type: "choose-exact-dice" },
  taucho: { type: "roll-fixed-dice", diceCount: 2 },
  setrain: { type: "roll-fixed-dice", diceCount: 3 },
  amuletward: { type: "none" }, // 厄災の神(マー・チョーイ)のward item(passive)
  baguamirror: { type: "repel-spirit" },
  examsave: { type: "quiz-save" },
  lixi: { type: "gain-cash", amount: 380 },
  caffeinerush: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `rrd`=紅河デルタ / `nmt`=北部山岳 / `btb`=北中部沿岸 /
`ntb`=南中部沿岸 / `tn`=西原高原 / `dnb`=南東部 / `mkd`=メコンデルタ。
4月始まり。10番目(2月・旧正月テト)を給アイテム、5番目(8月・ヴーラン/
さまよう霊の日)を休神の月として提案します。

既存の `SEASON_EFFECTS_BY_COUNTRY` オブジェクトの閉じ `};` の直前に追加:

```ts
  /**
   * ベトナム。統一記念日の帰省ラッシュ → 南部の雨季 → 中部沿岸の乾季・
   * 海水浴シーズン → ダラットへの避暑 → ヴーラン(さまよう霊の日、休神) →
   * 中秋節・国慶節 → 台風・増水の最盛期 → デルタの水引き・収穫 →
   * 北部の寒さとクリスマス商戦 → 西原高原のコーヒー収穫 →
   * 旧正月テト(給アイテム) → 高原のコーヒーの花、という流れ。
   */
  vietnam: [
    /* 0 Apr 統一記念日・メーデーの帰省ラッシュ */ [
      { op: "region-income-multiplier", regionId: region("ntb"), multiplier: 1.1 },
    ],
    /* 1 May 南部の雨季が戻る */ [
      { op: "region-income-multiplier", regionId: region("mkd"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("dnb"), multiplier: 0.95 },
    ],
    /* 2 Jun 学校が休みになり中部の海水浴シーズン最盛期 */ [
      { op: "region-income-multiplier", regionId: region("ntb"), multiplier: 1.2 },
    ],
    /* 3 Jul 高地への避暑(ダラット) */ [
      { op: "region-income-multiplier", regionId: region("tn"), multiplier: 1.15 },
    ],
    /* 4 Aug ヴーラン・さまよう霊の日(休神) */ [{ op: "rest-spirit" }],
    /* 5 Sep 中秋節・国慶節 */ [
      { op: "region-income-multiplier", regionId: region("rrd"), multiplier: 1.1 },
    ],
    /* 6 Oct 台風・増水の最盛期 */ [
      { op: "region-income-multiplier", regionId: region("btb"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("ntb"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("mkd"), multiplier: 0.85 },
    ],
    /* 7 Nov 水が引き、デルタが収穫を迎える */ [
      { op: "region-income-multiplier", regionId: region("mkd"), multiplier: 1.15 },
    ],
    /* 8 Dec 北部の寒さとクリスマス商戦 */ [
      { op: "region-income-multiplier", regionId: region("rrd"), multiplier: 1.05 },
      { op: "region-income-multiplier", regionId: region("nmt"), multiplier: 0.9 },
    ],
    /* 9 Jan 西原高原のコーヒー収穫最盛期 */ [
      { op: "region-income-multiplier", regionId: region("tn"), multiplier: 1.25 },
    ],
    /* 10 Feb 旧正月テト(給アイテム、帰省・移動コストで全員支払い) */ [
      { op: "give-item-to-all" },
      { op: "all-players-pay-cash", amount: 150 },
    ],
    /* 11 Mar 高原のコーヒーの花(観光)・南部の乾季最盛期 */ [
      { op: "region-income-multiplier", regionId: region("tn"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("dnb"), multiplier: 1.05 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

既存の `DOOM_EFFECT_ID_BY_LEGACY_ID` オブジェクトの閉じ `};` の直前に追加。
**`id` は絵の担当が実際に描いたファイル名
(`dooms/vietnam-{bao,lut,nong,ketxe,chaunhau,matroidat,chomoctui}.tsx`)に
合わせて `flavour.mjs` 側を直してあります。**韓国の対応(hwangsa→fine /
taepung→percentLoss / poksol→skipTurn / sanbul→loseProperties /
hoesikgap→payOthers / dokkaebi-gil→teleport / somaechigi→steal)に
ならって割り当てました。

```ts
  // Vietnam
  bao: "percentLoss", // 台風で財産の一部が飛ばされる(韓国のtaepungと同じ割り当て)
  lut: "loseProperties", // 増水で物件が水没・損なわれる
  nong: "skipTurn", // 熱波でレールが歪み列車が遅れる(韓国のpoksolと同じ発想)
  ketxe: "fine", // 渋滞に巻き込まれ、迂回や牽引の費用がかかる
  chaunhau: "payOthers", // 乾杯ゲームに負けて卓の全員分を払う(韓国のhoesikgapと同じ発想)
  matroidat: "teleport", // マー・チョーイに化かされ、遠くまで連れ回される(韓国のdokkaebi-gilと同じ発想)
  chomoctui: "steal", // 市場ですりに遭う
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(既存の最後の国盤面の import の下に追加):

```ts
import { VietnamBao } from "./vietnam-bao";
import { VietnamLut } from "./vietnam-lut";
import { VietnamNong } from "./vietnam-nong";
import { VietnamKetxe } from "./vietnam-ketxe";
import { VietnamChaunhau } from "./vietnam-chaunhau";
import { VietnamMatroidat } from "./vietnam-matroidat";
import { VietnamChomoctui } from "./vietnam-chomoctui";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "vietnam-bao": VietnamBao,
  "vietnam-lut": VietnamLut,
  "vietnam-nong": VietnamNong,
  "vietnam-ketxe": VietnamKetxe,
  "vietnam-chaunhau": VietnamChaunhau,
  "vietnam-matroidat": VietnamMatroidat,
  "vietnam-chomoctui": VietnamChomoctui,
```

**絵の担当が実際にエクスポートした名前と、上のimport文が一致しているか
`grep -n "^export function" dooms/vietnam-*.tsx` で確認してから当ててください**
(自分では絵をまだ描いていないので、ここは確認できていません)。

## 補足: `src/presentation/components/setup/country-groups.ts`

確認していません(触らない指示のファイル)。

## 自分で確かめたこと

- `node -e "import('./scripts/countries/vietnam/index.mjs')…"` は
  `art.mjs` が無いため実行できません(絵の担当の成果物待ち)。代わりに
  `cities.mjs`・`geography.mjs`・`quiz.mjs`・`flavour.mjs`・`money-events.mjs`・
  `music.mjs` の6ファイルは個別に `node --check` と、値を直接importして
  件数・構造を確認しました(下記)。
- **4言語の欠け**: 全ファイルで `city-helpers.mjs` / 各ファイル内の `t()` 検証
  (`|`が3本ちょうど)を通過。書いている最中に例外で気づいたものはすべて
  直った状態でコミットしてあります。
- **cities.mjs**: 43都市・43路線。全都市が地理的に妥当な範囲内
  (投影範囲102.0〜109.6度E・8.4〜23.5度N)にあることを確認。
- **mark/bg の過不足**: `cities.mjs` が使うキー(mark43種・bg25種)を
  `ART-KEYS.md` に書き出し、絵の担当が同じキー名で `art.mjs`
  (`VIETNAM_MARKS`/`VIETNAM_BG`)を作れば過不足0になるようにしてあります
  (絵がまだ無いため、双方向の突き合わせ自体はできていません。**絵の
  担当が `art.mjs` を作ったあと、突き合わせをもう一度お願いします**)。
- **同じ絵になる都市**: `mark+bg` の組み合わせが43都市/43組み合わせで
  重複0組(機械確認済み)。
- **陸地判定**: `geography.mjs` の `VIETNAM_LAND`(本土1枚+フーコック島)
  ポリゴンで43都市すべてが陸地内であることを、自作の点内判定スクリプトで
  機械確認済み(当初ディエンビエンフーが1件だけ海側の判定になり、
  海岸線を西へ膨らませて直した)。
- **路線のgeometry**: `check-sea-routes.mjs` を自分で実行できました
  (使い捨てcontent.jsonを組んで検査後に削除、手順書の「焼く前でも
  回せる」節どおり)。当初7本が60px超で引っかかり、以下のように直して
  **最終的に0本**まで減らしました(2026-08-20時点で確認)。
  - `quangngai`–`quynhon`(トゥンク線本体、47〜51%が海の上): 端の入れ替え
    (`["quynhon","quangngai","rail"]` の順に変更)で0pxに解消。**添字は
    動かしていない**ので、他の路線への波及はありません。
  - メコンデルタ・ホーチミン〜ヴンタウの6本(いずれも「航路が陸の上・100%」):
    当初は「実在しない移動をゲーム上の連結のために抽象化する」扱いで
    `"rail"` に変更しましたが、team-lead指摘のとおり**都市カードの
    factが「実在の鉄道が無い」と明記している町に鉄道の線が引かれるのは
    嘘になる**ため、指摘を受けて考え直しました。このデルタは実際に
    ティエン川・ハウ川の本流とサーノー運河・カイサン運河・サイゴン川が
    通っているので、`"sea"` のまま残し、代わりに `geography.mjs` の
    `VIETNAM_LAKES` に細長い楕円9個で実際の川筋の水面を切り込みました
    (ガーナ盤面のボルタ湖の渡しと同じ手法。`check-sea-routes.mjs` は
    湖を陸地ポリゴンより優先する水面として扱うため、陸地ポリゴン自体は
    直さずに済みました)。楕円の位置は、実際に描かれる路線の折れ方
    (軸+45度の脚、`edgeIndex%2`)に沿わせて計算し、**43都市どれも
    水面に重ならない**ことを機械確認したうえで置いています。
    `hochiminh`–`vungtau`・メコンデルタの6本を`"sea"`に戻し、
    最終的に**60px超の食い違い0本**を確認しました。
  - 焼き上がった `vietnam.content.json` でこの検査を再実行してもらえると
    安心です。
- **seg の実測**: 当初seg=90で組んだところ、43路線のほぼ全てが1〜3マスに
  収まってしまいマス数の変化に乏しいと判断し、seg=60に下げました。
  最長路線(クアンガイ―クイニョン、282px)でも267/60≒4.5マスで、9マスの
  上限には届きません(全路線を実測して確認)。
- **クイズの機械検査**: `check-quiz.mjs` を自分で実行(使い捨てcontent.json
  で検査後に削除)。当初4件の「漏れ?」候補が挙がりました。
  - **本物の漏れ1件を直しました**: Q19「強い匂いの大きな果物は?→ドリアン」が
    カントーのカード本文(水上市場で売る果物にドリアンを含めていた)と
    重複していたため、カードのドリアンをマンゴーに差し替えて解消しました。
  - **本物の漏れ1件を、問いの差し替えで直しました**: 当初のQ2
    「1954〜1975年にベトナムを分けた線は北緯何度線か?」がドンハーの
    カード本文(まさに北緯17度線・1954〜1975年を明記)と直接重複していた
    ため、承認いただいた「38度線との混同を試す」設計は保ちつつ、
    問いをDMZの幅(約5km)に差し替えました。
  - 残る2件は誤検知と判断しました。
    - Q1「ベトナムの首都は?→ハノイ」がニンビンのカード(「ホアルー城は
      ベトナムの首都だった…李太祖がのちのハノイへ都を移す」)と一致した
      もの。首都を問う易しい問題がその町のカードと重なるのは
      スペイン/トルコの首都問題と同種の想定どおりの重なりと判断しました。
    - Q16「ベトナムを植民地化した国は?→フランス」が複数のカードと
      一致したもの。「フランス」はこの盤面の多くのカードに登場する
      通奏低音の語で、「世紀」「ヨーロッパ」という一般的な語との
      偶然の一致による誤検知と判断しました(アフリカ盤面の「屈指」
      「天然」と同種)。
  - この2件は `ACCEPTED_LEAKS` への追加をお願いします(下の表)。
  - 日本語欄へのローマ字混入は0件でした。
- **難易度9〜10(10問)の裏取り**: 1問ずつ確認しました。確度が高いと
  自分で判断したものが大半ですが、2件は中程度の確度と自己判断しています。
  - メーターゲージの割合(約85%、約2,169/2,600km): team-leadから
    「Wikipedia の Rail transport in Vietnam で裏取り済み」と確認をいただき、
    数値を「約2,169km/約2,600km」まで具体化しました。
  - コイン流通停止の年(2011年ごろ): 複数回目にした記憶があるが
    一次資料までは当たれていません。「around」で概算であることを明示。
  - 残り8問(アレクサンドル・ド・ロード辞典1651年・ドンソン銅鼓の
    タインホア出自・ゴ・バオ・チャウのフィールズ賞2010年・ファンシパン
    標高約3,147m・森林被覆率約42%・統一急行の距離約1,726km・所要時間
    約33時間・ベトナム語のオーストロアジア語族分類)は、複数の情報源で
    一致していると判断していますが、**一次資料での再確認はしていません**。
    他盤面の担当に読んでいただければ安心です。
- 音楽: 7地方すべての `ch`(8和音・3和音構成)・`mel`(8小節・1小節16ステップ
  ぴったり)を機械チェック済み(過不足0)。
- 物件価格: 対数線形変換で最安170〜最高2600(15.3倍)に引き直しました
  (元は最安260〜最高2000=7.7倍で目安に届いていませんでした)。利回りは
  全件約20.6%を維持。
- アイテム鍵9件(`xeomlift`/`riverferry`/`taucho`/`setrain`/`amuletward`/
  `baguamirror`/`examsave`/`lixi`/`caffeinerush`)が既存の鍵一覧(311件)と
  衝突しないことを機械チェック済み(0件)。
- 正解の位置(`a`)は散らしていません(101/2/0)。指示書
  (new-board-brief.md)に「出題時にシャッフルされる」とあるための対応です。

## `ACCEPTED_LEAKS` への追加提案(`scripts/check-quiz.mjs`)

```js
  { c: "vietnam", ans: "ハノイ", city: "ニンビン", why: "首都を訊く易しい問題(難易度2)。ニンビンのカードは『ホアルー城はベトナムの首都だった』という別の町(ホアルー)の話で、答えの理由は与えていない。読んだ人が答えられるのはむしろ狙いどおり" },
  { c: "vietnam", ans: "フランス", city: "ホイアン/クアンガイ/ファンティエット", why: "植民地化した国を訊く問題。『フランス』はこの盤面の多くのカードに通奏低音のように登場する語で、共有語は『世紀』『ヨーロッパ』という一般的な語の偶然の一致(アフリカ盤面の『屈指』『天然』と同種の誤検知)" },
```

## 質について

- 都市1件あたりの面積: 43都市・BW1370×BH2830=3,877,100px² →
  約90,165px²/都市(目安90kにほぼ一致)。
- 路線密度: 43都市に対して43本(1都市あたり1.0本)。全体で1つの
  連結成分になっていることを確認済み。
- 地方の内訳: 7地方 rrd6・nmt8・btb6・ntb8・tn4・dnb4・mkd7。

## 確認済みの点(team-leadに確認いただいたもの)

- **通貨倍率1,650,000は確定です。**team-leadに実際の為替レートで
  検算いただき、1USD≒150円・1USD≒25,000ドンの想定で計算どおりである
  ことを確認済みです。
- **メコンデルタ・ヴンタウの6路線は"sea"のままにし、`VIETNAM_LAKES`に
  川筋の水面を切り込んで解消しました**(上記「路線のgeometry」参照)。
  都市カードの文章(実在の鉄道が無い)と路線の見た目(水路)が食い違わない
  形に直してあります。
- **クイズ難易度9〜10(9問)はエジプト盤面の担当にレビューいただき、
  8問は問題なし、Q76(コイン流通停止の年)のみ解説文を修正しました**
  (答えの「2011年ごろ」は正しく、解説の「数年のうちに」がずれていた
  ため、2011年4月に国家銀行が払い出しを停止したこと・いまも法定通貨の
  ままであることを明記する形に直しました)。森林被覆率(約42%)は
  「およそ」の幅が効いていると評価いただいています。
