# ウクライナ盤面の登録手順

`scripts/countries/ukraine/`(8ファイル)と
`src/presentation/components/events/dooms/ukraine-*.tsx`(7ファイル)は
作成済み・検証済み。共有ファイルには一切触れていない。ここに書いた変更を
取りまとめ側で適用し、`node scripts/extract-legacy-content.mjs` と
`npm run check` を通してほしい。

ベネズエラ・中国のときと同じ7箇所。貼り付け用のコードをそのまま載せてある。

---

## 1. `scripts/extract-legacy-content.mjs`

import を1行追加(既存の末尾の下)。

```js
import { buildUkraineContent } from "./countries/ukraine/index.mjs";
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
  buildUkContent(),
  buildItalyContent(),
  buildRussiaContent(),
  buildUsaContent(),
  buildIndonesiaContent(),
  buildMoroccoContent(),
  buildGhanaContent(),
  buildBaliContent(),
  buildMalaysiaContent(),
  buildVenezuelaContent(),
  buildCanadaContent(),
  buildUkraineContent(),
];
```

（他のエージェントが並行して追加している国がある場合は、その並びの末尾に置けばよい。）

---

## 2. `scripts/content-overrides/property-economy.mjs`

`CURRENCY_MULTIPLIERS` に1行追加。team-lead から指示のあった **`ukraine: 2800`**
(₴3,360,000スタート)をそのまま使う想定。

```js
  ukraine: 2800,
```

`ukraine/flavour.mjs` の `UKRAINE_META.cur` は他国と同じ暫定値 `mul: 100` のまま
にしてある(korea/china と同じく、表示用の実倍率は上のテーブル側が持つ設計のため)。

---

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に1行追加。

```ts
  ukraine: () => import("./ukraine.content.json").then((m) => m.default),
```

---

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に1行追加。

```ts
  ukraine: () => import("../content/ukraine.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

---

## 5. `src/infrastructure/content/item-effect-rules.ts`

`ITEM_EFFECT_BY_LEGACY_KEY` に9行追加。

```ts
  // Ukraine
  leleka: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  vinok: { type: "choose-exact-dice" },
  elektrychka: { type: "roll-fixed-dice", diceCount: 2 },
  shvydkisnyi: { type: "roll-fixed-dice", diceCount: 3 },
  rushnyk: { type: "none" }, // 厄災の神(リソヴィク)のward item(passive)
  sil: { type: "repel-spirit" },
  shpora: { type: "quiz-save" },
  karbovanets: { type: "gain-cash", amount: 380 },
  marshrutka: { type: "extra-turn" },
```

**9件とも既存キー(下記コマンドで確認)と衝突していません。**ただし今回は
中国・韓国・トルコ・ドイツ・イタリア・イギリスと同時に他の5盤面
(カナダ・オーストラリア・ベネズエラ・ブラジルなど)が並行して作られているため、
**焼き上がった `country-index.json` にはまだそれらが載っておらず、この確認だけでは
衝突を防げません。**最終的な突き合わせはそちらでお願いします。

```
node -e 'const ids=require("./src/infrastructure/content/country-index.json").map(c=>c.id);
const k=new Set(); for(const i of ids){Object.keys(require(`./src/infrastructure/content/${i}.content.json`).items).forEach(x=>k.add(x))}
console.log([...k].sort().join(" "))'
```

実行結果(2026-08-13時点の焼き上がり分)は以下で、
`leleka` `vinok` `elektrychka` `shvydkisnyi` `rushnyk` `sil` `shpora` `karbovanets`
`marshrutka` はいずれも含まれていませんでした。

```
bolivia,japan,india,france,world,ibaraki,korea,turkey,germany,china,uk,italy,
russia,usa,indonesia,morocco,ghana,bali,malaysia,venezuela,canada
```

（`shpargalka` は既存に含まれていたため避け、代わりに `shpora` にした。
同時進行中のロシア盤面と語彙が近くなりうる点は `flavour.mjs` 冒頭のコメントに
書いてある。）

---

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6.1 `SEASON_EFFECTS_BY_COUNTRY` に `ukraine:` を追加

`ukraine/flavour.mjs` の `UKRAINE_SEASONS`(フレーバー文)と対になる数値ルール。
地方コードは `ky`=キーウ周辺 / `pl`=ポリッシャ(北) / `west`=西部・カルパチア /
`cen`=中部 / `south`=南部・黒海/ドナウ沿岸 / `east`=東部。

```ts
  ukraine: [
    /* 0 Apr 柳の日曜日とピサンカ、復活祭の支度 */ [
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.15 },
      { op: "all-players-pay-cash", amount: 160 },
    ],
    /* 1 May マイウカ(春の野遊び)が西部で盛ん、市場に春物 */ [
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.1 },
    ],
    /* 2 Jun イヴァナ・クパーラの焚き火と牧草刈り */ [
      { op: "region-income-multiplier", regionId: region("pl"), multiplier: 1.2 },
    ],
    /* 3 Jul 桜桃(スミミザクラ)の収穫期 */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("pl"), multiplier: 1.1 },
    ],
    /* 4 Aug 蜂蜜・リンゴのスパス祭と独立記念日(24日) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.15 },
    ],
    /* 5 Sep 新学期「最初の鐘」とぶどうの収穫始め */ [
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.2 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 6 Oct ポクロヴァ(コサックの守護聖人祭)とジャガイモの収穫 */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("east"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.1 },
    ],
    /* 7 Nov 聖マルティヌスのガチョウ祭りと新酒、待降節の斎で市が静まる */ [
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("pl"), multiplier: 0.9 },
    ],
    /* 8 Dec ディドゥフを立て、十二品のクリスマスイブ(いまは12/25が中心) */ [
      { op: "all-players-pay-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("ky"), multiplier: 1.15 },
    ],
    /* 9 Jan マランカの仮面行列とキャロル歌い、旧正月 */ [
      { op: "give-item-to-all" },
      { op: "region-income-multiplier", regionId: region("pl"), multiplier: 1.1 },
    ],
    /* 10 Feb ブリヌィ週間(マスリャナ)、市に薄焼きが並ぶ */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.1 },
    ],
    /* 11 Mar シェウチェンコの日(9日)、早春の静けさ */ [
      { op: "region-income-multiplier", regionId: region("ky"), multiplier: 1.15 },
      { op: "rest-spirit" },
    ],
  ],
```

### 6.2 `DOOM_EFFECT_ID_BY_LEGACY_ID` に7行追加

`ukraine/flavour.mjs` の `UKRAINE_DOOM` は最初からこの並び順
(fine→percentLoss→skipTurn→loseProperties→payOthers→teleport→steal、
韓国・ベネズエラと同じ型)で書いてある。

```ts
  // Ukraine
  hrad: "fine",
  povin: "percentLoss",
  zamitil: "skipTurn",
  "stepova-pozhezha": "loseProperties",
  "tamada-obov-yazok": "payOthers",
  "lisovyk-stezhka": "teleport",
  "bazaar-pickpocket": "steal",
```

---

## 7. `src/presentation/components/events/dooms/index.ts`

import を7行追加。

```ts
import { UkraineBazaarPickpocket } from "./ukraine-bazaar-pickpocket";
import { UkraineHrad } from "./ukraine-hrad";
import { UkraineLisovykStezhka } from "./ukraine-lisovyk-stezhka";
import { UkrainePovin } from "./ukraine-povin";
import { UkraineStepovaPozhezha } from "./ukraine-stepova-pozhezha";
import { UkraineTamadaObovYazok } from "./ukraine-tamada-obov-yazok";
import { UkraineZamitil } from "./ukraine-zamitil";
```

登録テーブルに7行追加。

```ts
  "ukraine-bazaar-pickpocket": UkraineBazaarPickpocket,
  "ukraine-hrad": UkraineHrad,
  "ukraine-lisovyk-stezhka": UkraineLisovykStezhka,
  "ukraine-povin": UkrainePovin,
  "ukraine-stepova-pozhezha": UkraineStepovaPozhezha,
  "ukraine-tamada-obov-yazok": UkraineTamadaObovYazok,
  "ukraine-zamitil": UkraineZamitil,
```

7枚とも `npx tsc --noEmit`(ukraine関連の出力なし)と `npx eslint`(警告0件)を
確認済み。文字要素(`<text`)は使っていない(機械的に grep で確認済み)。
`dooms.test.ts` 本体は共有ファイル経由の登録が要るため、焼き込み後にそちらで
`npx vitest run src/presentation/components/events/dooms/dooms.test.ts` を
回して確認してほしい。

---

## 8. 都市を選ぶ判断(扱いに気を使う盤面のため、経緯を残す)

team-lead との相談で、都市を含めるかどうかの基準を「占領されているか」ではなく
**「いま人が普通に暮らし、鉄道が普通に走っている町か」**にした。

- **ヘルソン市を外した。** 2022年11月に解放されたが、ドニプロ川越しに
  連日砲撃を受けている土地のため。占領地ではないが、指示された基準に
  照らして外した。
- **ミコライウは含めた。** 2022年は激しい被害を受けたが、前線から離れ
  鉄道・生活が回復している。
- **アスカニア・ノヴァ(ブリーフの題材例)は外した。** 私の確認で
  ヘルソン州の占領地域にあると分かったため(team-lead 自身、この題材を
  挙げたのは誤りだったと認めている)。
- **ソレダール(ブリーフの題材例)も同じ理由で外した。** ドネツク州、
  2023年に激戦地になった土地。
- **クリミア半島は陸地として輪郭に含め、都市は置いていない。**
  国際的に認められたウクライナの領土のまま描くが、争いのある土地を
  遊びの止まりマスにしないという方針(`cities.mjs` 冒頭のコメント参照)。
- **チョルノービリは含めた。** ウクライナ語表記、1986年の事故を史実として
  落ち着いた調子で書き、1998年に再導入されたオオカミ等が暮らす
  「人が去ったあとの土地」という自然科学寄りの切り口にした。物件も
  見学拠点(ドゥーガ・レーダー展望地点、レンジャー詰所)にとどめている。
- **ハルキウ・ドニプロ・ザポリッジャ・スーミ(東部)は含めた。** 現在の
  戦況には触れず、建築・大学・宇宙開発史・コサック史などの切り口で書いた。
- **戦争で市街の大半が破壊された町(バフムート・マリウポリ・
  アウディーイウカなど)は外した。**

---

## 9. seg について(実測結果)

35都市・49路線が揃った時点で実測。team-lead から渡された `seg=95` を
そのまま使った(変更していない)。分布は次のとおりで、9マスへの張り付きは
無かった: 1マス13本・2マス18本・3マス12本・4マス4本・5マス1本・6マス1本
(最長はヴィーンヌィツャ—オデーサの561px)。5マス超は1本のみで、
韓国盤面の目安と近い水準に収まっている。

---

## 10. 4言語の欠けをどう数えたか

`t()` が4分割できないと例外を投げる仕組みを使い、8ファイルすべてを
`node -e "import(...)"` で直接importして例外が出ないことを確認した
(1件でも欠けがあればその場で落ちる)。実際に7件の欠け
(Truskavets/Kolomyia/Kremenchukのtag、varenyky/saloの問い、Truskavetsと
ビーチ売り子の出来事の title/narrative)を書いている途中で検出・修正した。
最終的に全モジュールがエラー無く読み込めることを確認済み。

---

## 11. 物件価格

最安180(トリピッリャ・ヴィルコヴェの2件目)〜最高2800(キーウの聖ソフィア)で
**15.56倍**。目標の12〜17倍に収まっている。`inc`(四半期収入)は
`inc = round(cost × 0.2064)` で全70件を計算し、韓国盤面と同じ利回りに揃えてある。

---

## 12. 背景の密度・隠れ帯(実測して直したもの)

21背景すべてを自作スクリプトでマゼンタ台紙にレンダーし、都市シンボルが隠す帯
(x=151–249 / y=54–152)に主役級の図形が入っていないか目視確認した。
**4件で問題を発見して直した:**

- `zone`(チョルノービリの新安全閉じ込め施設アーチ)がちょうど帯の中央に
  あり、絵の核心であるアーチの頂点が隠れていた → アーチを左寄りに移動。
- `rocket`(ドニプロ)も同じ理由でロケット本体が帯にかかっていた → 左寄りに移動。
- `residence`(チェルニウツィー)は中央の単一ドームが帯に入っていた →
  左右2つの塔ドームに分けて帯の外に置いた。
- `cossack`(チェルカースィ・ザポリッジャ)は見張り塔が帯の中央にあった →
  左寄りに移動。

また `tunnel`(クレヴァニ)は最初の実装が緑の塊にしか見えず、トンネルとして
読めなかったため、アーチ状の縞・暗い内側・奥の明るみ・線路と貨物列車の
組み合わせに描き直した。

背景1枚あたりの要素数は目安の40前後(未使用の部品(`willow`/`sunflower`/`sun`)を
eslintの警告で見つけ、`capital`/`relic`/`hutsul` に使う側へ回した)。

---

## 13. 走らせていない検査(正直に列挙)

- `check-sea-routes.mjs`(共有ファイル。焼いていないため走らせられない。
  ただし49路線の両端都市は地理的に自然な陸路になるよう自分の目で確認した)
- `check-quiz.mjs` 本体(共有ファイル。日本語フィールドへのラテン文字混入は
  目視で確認したが、機械的な走査はしていない)
- `check-city-backgrounds.mjs`(共有ファイル。代わりに自作のマゼンタ台紙
  レンダースクリプトで21背景すべてを確認した。§12参照)
- `npm run shot`(index.mjsは書いたが、共有ファイルへの登録前なので撮れない)
- `dooms.test.ts` 本体・`npm run check` 全体(依存する共有ファイルの変更が
  済んでいないため)

これらは焼き込み後にそちらで回して、問題があれば差し戻してください。
