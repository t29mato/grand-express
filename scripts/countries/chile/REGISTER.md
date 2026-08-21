# チリ盤面の登録(取りまとめ側が当てる7箇所+選ぶ画面)

`scripts/countries/chile/` の7ファイル(index以外の全部: cities / geography /
quiz / money-events / flavour / music / ART-KEYS.md)は揃っています。
**`art.mjs` と `index.mjs`、`src/presentation/components/events/dooms/chile-*.tsx`
7枚は絵の担当・取りまとめ側が別途作成してください。**このREGISTER.mdの
6番目・8番目はそれができてから当ててください。

## この盤面の芯(再掲)

「なぜ鉄道が敷かれ、なぜ止まったか」。北は硝石・太平洋戦争という経済的な
理由、南はプエルト・モントで地理的に途切れるという理由で、鉄道の物語が
対になっている。team-lead承認済み(2026-08-21)。

## 1. `scripts/extract-legacy-content.mjs`

```js
import { buildChileContent } from "./countries/chile/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追記:

```js
  buildChileContent(),
```

(`index.mjs` は他の担当が `art.mjs` 完成後に作成する想定。中身は
`scripts/countries/peru/index.mjs` と同じ形で、`PERU_*` を `CHILE_*` に
置き換えるだけです。)

## 2. `scripts/content-overrides/property-economy.mjs`

倍率63000。**根拠(使ったレート)**: 1ドル≒150円・1ドル≒950チリペソと
仮定して1ペソ≒0.158円、12,000,000÷0.158÷1200≒63,291を63000に丸めた。
**この為替レートは2026年時点の実勢を確認したものではなく、私の記憶に基づく
概算です。**登録前に実勢レートと照らして調整をお願いします。

```js
  // $ 1,200 → $ 75,600,000。1ドル≒150円・1ドル≒950チリペソと仮定して
  // 1ペソ≒0.158円、12,000,000÷0.158÷1200≒63,291を63000に丸めた(要検証)。
  chile: 63000,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追記:

```ts
  chile: () => import("./chile.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追記:

```ts
  chile: () => import("../content/chile.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts`

アイテム9件。鍵は既存全盤面(約300件)と衝突しないことを確認済み
(2026-08-21)。

```ts
  // Chile
  avionpatagonico: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  pullman: { type: "choose-exact-dice" },
  trensalitrero: { type: "roll-fixed-dice", diceCount: 2 },
  expresolongitudinal: { type: "roll-fixed-dice", diceCount: 3 },
  ramadecanelo: { type: "none" }, // 厄災の神(カレウチェ)のward item(passive)
  linternafarera: { type: "repel-spirit" },
  torpedo: { type: "quiz-save" },
  boletokino: { type: "gain-cash", amount: 380 },
  atajoarriero: { type: "extra-turn" },
```

**boletokinoの価格280は、amount380より安いことを確認済みです**
(「向きの選べない移動アイテムは操縦できるものより安い」の原則にも
avionpatagonico=260 < pullman=380 で沿っています)。
**torpedoの価格130は上限140以内です。**

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 災難7件の対応

`CHILE_DOOM`(`flavour.mjs`)は fine / percentLoss / skipTurn /
loseProperties / payOthers / teleport / steal の順に並べてあります。
**順序を変えずにそのまま対応させてください。**

```ts
  // Chile
  "impuesto-salitre": "fine",
  terremoto: "percentLoss",
  aluvion: "skipTurn",
  "relave-derrame": "loseProperties",
  "polla-perdida": "payOthers",
  "barco-desviado": "teleport",
  "lanza-metro": "steal",
```

### 季節12ヶ月(4月始まり)

地方コード: `ng`=ノルテ・グランデ / `nc`=ノルテ・チコ / `ce`=セントラル /
`su`=スル / `au`=アウストラル。南半球なので中身は他国と季節が逆になる
(4月=収穫祭、9月=独立記念日、2月=真夏)。`CHILE_SEASONS` の文面に
対応させた提案値。**数値は叩き台**なので、他盤面とのバランスを見て
調整してください。

```ts
  /**
   * チリ。ブドウ収穫祭(4月・給アイテム) → 海軍栄光の日(5月) →
   * ウェ・トリパントゥ/冬至(6月・su増) → ラ・ティラーナ祭(7月・ng) →
   * アンデス峠の雪closure(8月・ce/nc減) → フィエスタス・パトリアス
   * (9月・全員給付+休神) → 春の作付け(10月・ce増) → コピウエの開花
   * (11月・su増) → クリスマス(12月・全員給付) → 海岸の夏(1月・ce/su増) →
   * ビニャ・デル・マール歌謡祭(2月・全員給付+ce増) → 新学年(3月・nc/ce増)、
   * という流れ。
   */
  chile: [
    /* 0 Apr ブドウ収穫祭 */ [{ op: "give-item-to-all" }],
    /* 1 May 海軍栄光の日 */ [
      { op: "all-players-gain-cash", amount: 260 },
    ],
    /* 2 Jun ウェ・トリパントゥ/冬至 */ [
      { op: "region-income-multiplier", regionId: region("su"), multiplier: 1.15 },
    ],
    /* 3 Jul ラ・ティラーナ祭(北部砂漠の祭り) */ [
      { op: "region-income-multiplier", regionId: region("ng"), multiplier: 1.3 },
    ],
    /* 4 Aug アンデス峠が雪で閉ざされる */ [
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("nc"), multiplier: 0.9 },
    ],
    /* 5 Sep フィエスタス・パトリアス(独立記念日) */ [
      { op: "all-players-gain-cash", amount: 320 },
      { op: "rest-spirit" },
    ],
    /* 6 Oct 中央谷で春の作付けが始まる */ [
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.2 },
    ],
    /* 7 Nov コピウエ(国花)が南部の森で咲く */ [
      { op: "region-income-multiplier", regionId: region("su"), multiplier: 1.15 },
    ],
    /* 8 Dec クリスマス、海岸の夏が始まる */ [
      { op: "all-players-gain-cash", amount: 300 },
    ],
    /* 9 Jan 海岸の夏が盛りを迎える */ [
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("su"), multiplier: 1.15 },
    ],
    /* 10 Feb ビニャ・デル・マール歌謡祭 */ [
      { op: "all-players-gain-cash", amount: 280 },
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.2 },
    ],
    /* 11 Mar 新学年、新たな収穫期へ */ [
      { op: "region-income-multiplier", regionId: region("nc"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.1 },
    ],
  ],
```

## 7. `src/presentation/components/events/dooms/index.ts`

**絵の担当が7枚(`chile-impuesto-salitre.tsx` など)を作成したあとで
当ててください。**鍵は上の災難7件の `id` と同じにする想定です。

```ts
import { ChileAluvion } from "./chile-aluvion";
import { ChileBarcoDesviado } from "./chile-barco-desviado";
import { ChileImpuestoSalitre } from "./chile-impuesto-salitre";
import { ChileLanzaMetro } from "./chile-lanza-metro";
import { ChilePollaPerdida } from "./chile-polla-perdida";
import { ChileRelaveDerrame } from "./chile-relave-derrame";
import { ChileTerremoto } from "./chile-terremoto";

// ...DOOM_COMPONENTS の中に追記
  "chile-aluvion": ChileAluvion,
  "chile-barco-desviado": ChileBarcoDesviado,
  "chile-impuesto-salitre": ChileImpuestoSalitre,
  "chile-lanza-metro": ChileLanzaMetro,
  "chile-polla-perdida": ChilePollaPerdida,
  "chile-relave-derrame": ChileRelaveDerrame,
  "chile-terremoto": ChileTerremoto,
```

## 8. 選ぶ画面(`src/presentation/components/setup/country-groups.ts`)

**南アメリカの束は既にあります**(`southamerica`, `peru`, `venezuela`,
`bolivia`, `brazil` が入っている)。オセアニアと同じく、新設ではなく
**既存の束の `countryIds` にチリを足してください。**

```ts
{
  key: "southamerica",
  ...
  wholeBoardId: "southamerica",
  countryIds: ["southamerica", "peru", "venezuela", "bolivia", "brazil", "chile"],
},
```

**アルゼンチン・コロンビア・キューバも並行して同じ束に足される予定です。**
複数の担当が同時に同じ配列へ追記すると衝突するので、**この束への追記は
まとめて取りまとめ側が行ってください。**

## 未解決の課題(判断をお願いします)

### 路線2本が海陸判定の閾値(60px)を超えたまま残っています

`node scripts/check-sea-routes.mjs chile` で以下の2本が閾値超で残ります
(2026-08-21測定、使い捨てjsonで確認)。

```
✗ puertoaysen–puertonatales  航路が陸  539px(100%)  線長  539px
✗ porvenir–puertowilliams    航路が陸  190px( 78%)  線長  244px
```

どちらも**「陸路にする」で0pxになりますが、採用しませんでした。**
プエルト・アイセン以南(アイセン)とプエルト・ナタレス以南(マガジャネス)の
あいだは現実にも道路が無く(コクラン・ビジャ・オイギンスのカードに
「道はここで終わる」と明記)、プエルト・ウィリアムズはナバリノ島にあり
陸路そのものが存在しません。**都市カードの記述と矛盾する陸路化はできない
と判断しました。**

考えられる対処(私からは実行していません):

1. アイセン〜マガジャネスの海岸線(フィヨルド地帯)を作り直し、実際に
   航路が通れる海の隙間を`CHILE_LAND`(`geography.mjs`)に開ける
2. `check-sea-routes.mjs` の `KEPT` に理由つきで残す(青函トンネルと
   同じ扱い)
3. 経路そのものを別の中継都市案で引き直す(その場合は添字がずれるので
   `cities.mjs` の `CHILE_EDGES` を私の側で直します)

**判断をお願いします。**必要なら私からもう一度手を入れます。

### 通貨レートの検証をお願いします

上記2番のとおり、1ドル≒950チリペソという数字は記憶に基づく概算です。
実勢と大きくずれている場合は倍率63000を調整してください。

## 測定(2026-08-21時点)

```
node --check scripts/countries/chile/*.mjs                # 全ファイル構文OK
npx eslint scripts/countries/chile/                        # 警告0
node scripts/check-sea-routes.mjs chile                    # 使い捨てjsonで確認。
                                                             # 49本中47本が60px以下、
                                                             # 残り2本は上記「未解決の課題」参照
```

都市46(ng10・nc5・ce12・su10・au9)。路線49本(陸路44・航路5)。
記号46+背景24=70枚、同じ絵になる都市0組。クイズ95問(難易度1〜3が22問・
7以上が34問・9〜10が12問)。お金の出来事17件(増10・減7、全地方で
増減とも最低1件引ける)。道具9件(鍵の重複なし、価格規則を満たす)。
物件価格は最安160・最高2400で比15.00倍。厄災7件(鍵の重複なし)。
季節12ヶ月(give-item-to-all 1件・rest-spirit 1件〈フィエスタス・パトリアス〉)。
音楽5地方。

`node scripts/extract-legacy-content.mjs` と `node scripts/check-quiz.mjs chile`
は未登録のため未実行です。登録後にお願いします。**クイズの答え漏れは
自作の照合スクリプトで手動チェック済み**(ヨウ素の1問が実際にマリア・
エレナのカードと重なっていたため差し替え済み。詳細はコミット履歴参照)。
