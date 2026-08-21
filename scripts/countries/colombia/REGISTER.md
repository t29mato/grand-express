# コロンビア盤面の登録(取りまとめ側が当てる7箇所)

`scripts/countries/colombia/` の7ファイル(cities / geography / quiz /
money-events / flavour / music / ART-KEYS.md)は揃っています。
**`art.mjs` と `src/presentation/components/events/dooms/colombia-*.tsx` 7枚は
絵の担当が別途作成します。**このREGISTER.mdの7番目はその7枚ができてから
当ててください。`index.mjs` も取りまとめ側で作成してください(ペルーの
`index.mjs` と同じ形で、`buildColombiaContent()` を組んでいただければ
そのまま動くはずです)。

## 1. `scripts/extract-legacy-content.mjs`

```js
import { buildColombiaContent } from "./countries/colombia/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追記:

```js
  buildColombiaContent(),
```

## 2. `scripts/content-overrides/property-economy.mjs`

倍率265000。根拠: 1ドル≒152円・1ドル≒4050ペソとして1ペソ≒0.0375円、
12,000,000÷0.0375÷1200≒266,445を265,000に丸めた(コロンビア・ペソは
対円で非常に単価が低いため、他盤面と比べ倍率の桁が大きくなる)。

```js
  // $ 1,200 → $ 318,000,000。1ドル≒152円・1ドル≒4050ペソとして
  // 1ペソ≒0.0375円、12,000,000÷0.0375÷1200≒266,445を265,000に丸めた。
  colombia: 265000,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追記:

```ts
  colombia: () => import("./colombia.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追記:

```ts
  colombia: () => import("../content/colombia.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts`

アイテム9件。鍵は既存全盤面(約380件)と衝突しないことを確認済み。

```ts
  // Colombia
  hidroavion: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  chiva: { type: "choose-exact-dice" },
  trensabana: { type: "roll-fixed-dice", diceCount: 2 },
  expresodelsol: { type: "roll-fixed-dice", diceCount: 3 },
  tabacoatado: { type: "none" }, // 厄災の神(エル・モアン)のward item(passive)
  cruzguayacan: { type: "repel-spirit" },
  torpedo: { type: "quiz-save" },
  esmeralda: { type: "gain-cash", amount: 380 },
  correoaereo: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 災難7件の対応

`COLOMBIA_DOOM`(`flavour.mjs`)は fine / percentLoss / skipTurn /
loseProperties / payOthers / teleport / steal の順に並べてあります。
**順序を変えずにそのまま対応させてください。**

```ts
  // Colombia
  "chiva-varada": "fine",
  "roya-cafetera": "percentLoss",
  "creciente-cierra-paso": "skipTurn",
  "via-nueva-expropia": "loseProperties",
  "tejo-apuesta-perdida": "payOthers",
  "vuelo-desviado": "teleport",
  "raponazo-callejero": "steal",
```

### 季節12ヶ月(4月始まり)

地方コード: `car`=カリブ海岸 / `and`=アンデス / `pac`=太平洋岸(チョコ) /
`lla`=東部平原(リャノス) / `ama`=南部アマゾニア。`COLOMBIA_SEASONS` の
文面に対応させた提案値。**数値は叩き台**なので、他盤面とのバランスを見て
調整してください。`give-item-to-all` は12月(クリスマス)、`rest-spirit`は
7月(独立記念日)に1回ずつ置いてあります。

```ts
  /**
   * コロンビア。バジェナート伝説祭(4月) → コーヒーのミタカ収穫(5月) →
   * ネイバのバンブーコ祭・アマゾン増水期(6月) → 独立記念日(7月・全員給付・
   * 休神) → メデジンの花祭り(8月) → キブドのサン・パチョ祭(9月) →
   * コーヒー本収穫(10月) → カルタヘナ独自の独立記念日(11月・全員給付) →
   * クリスマスとノベナ(12月・全員給付) → パストのカーニバル(1月・全員給付) →
   * リャノスの乾季とバケリア(2月) → アンデスの乾季明け(3月)、という流れ。
   */
  colombia: [
    /* 0 Apr バジェナート伝説祭(バジェドゥパル) */ [
      { op: "region-income-multiplier", regionId: region("car"), multiplier: 1.2 },
    ],
    /* 1 May コーヒーのミタカ(小さいほうの収穫) */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.15 },
    ],
    /* 2 Jun ネイバのバンブーコ祭・アマゾンの増水期 */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("ama"), multiplier: 1.15 },
    ],
    /* 3 Jul 独立記念日(1810年7月20日蜂起の記念日) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.1 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug メデジンの花祭り(シジェテロスの行列) */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.25 },
    ],
    /* 5 Sep キブドのサン・パチョ祭 */ [
      { op: "region-income-multiplier", regionId: region("pac"), multiplier: 1.2 },
    ],
    /* 6 Oct コーヒーの本収穫(大きいほうの収穫) */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.3 },
    ],
    /* 7 Nov カルタヘナ独自の独立記念日(1811年11月11日) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("car"), multiplier: 1.25 },
    ],
    /* 8 Dec クリスマス・ノベナ・メデジンのイルミネーション */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.2 },
      { op: "give-item-to-all" },
    ],
    /* 9 Jan パストのカーニバル(ネグロス・イ・ブランコス) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.2 },
    ],
    /* 10 Feb リャノスの乾季、バケリア(牛の集め) */ [
      { op: "region-income-multiplier", regionId: region("lla"), multiplier: 1.25 },
    ],
    /* 11 Mar アンデスの乾季明け、聖週間の準備 */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.1 },
    ],
  ],
```

## 7. `src/presentation/components/events/dooms/index.ts`

**絵の担当が7枚(`colombia-chiva-varada.tsx` など)を作成したあとで
当ててください。**鍵は上の災難7件の `id` と同じにする想定です。

```ts
import { ColombiaChivaVarada } from "./colombia-chiva-varada";
import { ColombiaCrecienteCierraPaso } from "./colombia-creciente-cierra-paso";
import { ColombiaRaponazoCallejero } from "./colombia-raponazo-callejero";
import { ColombiaRoyaCafetera } from "./colombia-roya-cafetera";
import { ColombiaTejoApuestaPerdida } from "./colombia-tejo-apuesta-perdida";
import { ColombiaViaNuevaExpropia } from "./colombia-via-nueva-expropia";
import { ColombiaVueloDesviado } from "./colombia-vuelo-desviado";

// ...DOOM_COMPONENTS の中に追記
  "colombia-chiva-varada": ColombiaChivaVarada,
  "colombia-creciente-cierra-paso": ColombiaCrecienteCierraPaso,
  "colombia-raponazo-callejero": ColombiaRaponazoCallejero,
  "colombia-roya-cafetera": ColombiaRoyaCafetera,
  "colombia-tejo-apuesta-perdida": ColombiaTejoApuestaPerdida,
  "colombia-via-nueva-expropia": ColombiaViaNuevaExpropia,
  "colombia-vuelo-desviado": ColombiaVueloDesviado,
```

## 選ぶ画面(`country-groups.ts`)について

南アメリカは大陸盤としてすでに束があるはずです(オセアニアと同じ形)。
`COUNTRY_GROUPS` の該当する束の `countryIds` に `"colombia"` を追記して
ください。束が無い場合は、他の並行盤面(アルゼンチン・チリ・キューバ)と
まとめて新設するのが良さそうです。

## 測定(2026-08-21時点、登録前)

```
node --check scripts/countries/colombia/*.mjs             # 全ファイル構文OK
npx eslint scripts/countries/colombia/                     # 警告0
node scripts/check-sea-routes.mjs colombia                 # 使い捨てjsonで確認済み。51本すべて60px超の食い違いなし
```

```
都市数        46(and17 / car13 / pac5 / lla5 / ama6)
路線数        51(都市数+5。海路13本のうち7本は道路の無い区間の実際の航路、
              6本はマグダレナ川沿いの短区間で現代は道路が並行するため陸路に
              直した。焼く前に使い捨てjsonでcheck-sea-routes.mjsを回して
              確認済み)
記号+背景     46+24=70枚(上限70枚ちょうど)、同じ絵になる都市 0組
クイズ        95問(難易度1〜3:22 / 4〜6:37 / 7〜8:19 / 9〜10:17)
              7以上36問(基準25以上)・9〜10は17問(基準10以上)・
              1〜3は22問(基準20以上)、いずれも満たす
お金の出来事  16件(増8・減8。全国4+car2+and4+pac2+lla2+ama2。
              全地方で増減とも最低1件は引けることを確認済み)
道具          9個(effectの型8種のうちroll-fixed-diceのみdiceCount違いで
              2件、計9件。既存約380件の鍵と衝突しないことを確認済み。
              quiz-save〈torpedo〉は140、gain-cash〈esmeralda〉の額380より
              安い320)
厄災          7個(fine/percentLoss/skipTurn/loseProperties/payOthers/
              teleport/stealを1つずつ)
季節          12ヶ月。give-item-to-allは12月、rest-spiritは7月に1回ずつ
音楽          5地方(car/and/pac/lla/ama)
物件価格      最安180(オンダ/シエナガ)〜最高2600(ボゴタのカフェ)、
              倍率14.4倍(目安12〜17倍の範囲内)。当初は最安180〜最高520
              (2.9倍)しか無く、規則を満たしていなかった。全92件の価格を
              「最安180は据え置き、そこからの差を約7.12倍に引き伸ばす」
              変換で調整し、収入は各件とも価格のおよそ20〜21%に再計算した
              (物件の順位・都市ごとの相対的な高低は変えていない)
通貨倍率      265000(使ったレート: 1ドル≒152円・1ドル≒4050ペソ。上記2番参照)
```

```
node --input-type=module -e '
import { COLOMBIA_CITIES } from "./scripts/countries/colombia/cities.mjs";
const costs = Object.values(COLOMBIA_CITIES).flatMap(c => c.props.map(p => p.cost));
const min = Math.min(...costs), max = Math.max(...costs);
console.log("最安", min, "最高", max, "比", (max/min).toFixed(2) + "倍");
'
# 最安 180 最高 2600 比 14.44倍
```

## 事実修正の経緯(2026-08-21、team-lead指摘分)

5都市の下書き段階で2件の年号・因果の誤りが見つかり、修正済みです
(コミット `ea0cbdb`)。

- プエルト・コロンビア: 1871年開業時点ではまだ桟橋が無かった(桟橋は
  1893年、クピノ湾までの延伸で開業。当時「世界最長」と謳われた)。
- ボゴタ: 川の便がボゴタまで直接届いたことは無い。SCADTA(のちの
  アビアンカ)は滑走路を持たず、水上機でマグダレナ川に着水しながら
  川港ジラルドットまで飛び、そこから先は鉄道だった。

## クイズの答えの漏れについて(自己点検済み)

95問を書き終えたあと、自作の総当たりチェック(ある問いの答えが、別の
問いの本文中にそのまま書かれていないか)で4件を発見し、修正済みです
(コミット `13544e3`)。詳細はそのコミットメッセージを参照してください。
`check-quiz.mjs` は colombia が未登録のため実行できていません。
**登録後にぜひ実行し、他の見落としが無いか確認をお願いします。**

## 難易度9〜10の相互レビューについて

17問あります。手順書の慣例どおり、**他の盤面の担当に読んでもらうことを
希望します。**特に確度への自己申告は以下のとおりです。

- 「コムネロスの反乱とマヌエラ・ベルトラン」(難度8): 本文で「彼女の
  生涯については、この行為以外ほとんど記録が無く、歴史家は物語の多くが
  後年に脚色されたと指摘する」と明記し、伝説性をヘッジしてあります。
- 「NATOのグローバルパートナー」(難度9): 正確な締結年に自信が持てず、
  「2010年代後半」という幅のある書き方にしてあります。
- 「トムソン=ウルティア条約の2500万ドル」(難度9)・「国立大学1867年設立」
  (難度9)・「デボラ・アランゴ」(難度9)は、いずれも一次資料で年号や
  金額を再確認できておらず、**確度は中程度**です。
