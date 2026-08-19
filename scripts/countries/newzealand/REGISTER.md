# ニュージーランド登録メモ(取りまとめ側用)

このファイルの内容を、指示された7箇所に貼り込んでください。都市・地方・
アイテム・厄災の`id`はすべて `scripts/countries/newzealand/` 内の実ファイルから
そのまま引いています(架空の値はありません)。

## 1. `scripts/extract-legacy-content.mjs`

```js
import { buildNewZealandContent } from "./countries/newzealand/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追加:

```js
buildNewZealandContent(),
```

## 2. `scripts/content-overrides/property-economy.mjs`

`CURRENCY_MULTIPLIERS` に追加:

```js
// NZ$120,000(開始資金1200×100)。1NZドル≒85〜95円(2020年代半ばの目安相場)とすると
// 12,000,000÷90≒133,333円相当になり、開始資金1200で割った約111を、オーストラリア
// (100)と同じ扱いのきりのよい100に丸めた。両者は実質1割強のひらきに収まり、
// 目安の1.8倍以内。
newzealand: 100,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追加:

```ts
newzealand: () => import("./newzealand.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追加:

```ts
newzealand: () => import("../content/newzealand.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts`

`ITEM_EFFECT_BY_LEGACY_KEY` に追加(既存の全キーと重複しないことを確認済み):

```ts
// New Zealand
roaringforties: { type: "carried-far", minSteps: 8, maxSteps: 12 },
starcompass: { type: "choose-exact-dice" },
tuisong: { type: "roll-fixed-dice", diceCount: 2 },
northernexplorer: { type: "roll-fixed-dice", diceCount: 3 },
heitiki: { type: "none" }, // 厄災の神(タニファ)のward item(passive)
taniwhaoffering: { type: "repel-spirit" },
correspondence: { type: "quiz-save" },
kauirgum: { type: "gain-cash", amount: 380 },
jandalsprint: { type: "extra-turn" },
```

**`NEWZEALAND_SPIRIT.ward` は `"heitiki"`(自動ブロックのpassive)です。**
`"correspondence"` は別枠のクイズ救済アイテムなので、`ward` に誤って
当てないよう注意してください(執筆中に一度取り違えて直しました)。

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### `SEASON_EFFECTS_BY_COUNTRY` に追加

4月始まり12ヶ月。南半球なので4月は秋の始まり(北半球の国と季節が半年ずれる)。
6月にMatariki(マオリの新年。2022年から祝日)で `give-item-to-all`、
12月にクリスマス・ポフツカワ開花で `rest-spirit`。地方コードは
`akl/wko/cni/egc/tar/wgn/top/cby/wcs/ota/fld`(`flavour.mjs` の
`NEWZEALAND_REGIONS` と同じ)。

```ts
newzealand: [
  /* 0 Apr 誰かが植えた場所にだけ来る紅葉(アロータウン) */ [
    { op: "region-income-multiplier", regionId: region("ota"), multiplier: 1.15 },
  ],
  /* 1 May ウナギが海へ下る */ [
    { op: "region-income-multiplier", regionId: region("wcs"), multiplier: 1.15 },
    { op: "region-income-multiplier", regionId: region("fld"), multiplier: 1.1 },
  ],
  /* 2 Jun マタリキ(マオリの新年・2022年から祝日) */ [{ op: "give-item-to-all" }],
  /* 3 Jul スキー場が開く */ [
    { op: "region-income-multiplier", regionId: region("ota"), multiplier: 1.25 },
    { op: "region-income-multiplier", regionId: region("cni"), multiplier: 1.15 },
  ],
  /* 4 Aug ザトウクジラの冬の回遊 */ [
    { op: "region-income-multiplier", regionId: region("cby"), multiplier: 1.2 },
  ],
  /* 5 Sep 時計が進み、子羊が生まれ始める */ [
    { op: "region-income-multiplier", regionId: region("wko"), multiplier: 1.15 },
    { op: "region-income-multiplier", regionId: region("cby"), multiplier: 1.1 },
  ],
  /* 6 Oct ブドウが開花し、収穫年を左右する */ [
    { op: "region-income-multiplier", regionId: region("top"), multiplier: 1.3 },
  ],
  /* 7 Nov ポフツカワの蕾がふくらむ */ [
    { op: "region-income-multiplier", regionId: region("akl"), multiplier: 1.15 },
    { op: "region-income-multiplier", regionId: region("egc"), multiplier: 1.15 },
  ],
  /* 8 Dec ポフツカワが深紅に咲き、クリスマス(休神) */ [
    { op: "all-players-gain-cash", amount: 300 },
    { op: "region-income-multiplier", regionId: region("akl"), multiplier: 1.2 },
    { op: "rest-spirit" },
  ],
  /* 9 Jan 国じゅうが一斉に休暇 */ [
    { op: "all-players-pay-cash", amount: 200 },
    { op: "region-income-multiplier", regionId: region("ota"), multiplier: 1.3 },
    { op: "region-income-multiplier", regionId: region("top"), multiplier: 1.2 },
  ],
  /* 10 Feb ワイタンギ・デー */ [
    { op: "all-players-gain-cash", amount: 260 },
    { op: "region-income-multiplier", regionId: region("akl"), multiplier: 1.2 },
  ],
  /* 11 Mar 時計が戻り、収穫が始まる */ [
    { op: "region-income-multiplier", regionId: region("top"), multiplier: 1.25 },
    { op: "region-income-multiplier", regionId: region("cby"), multiplier: 1.15 },
  ],
],
```

### `DOOM_EFFECT_ID_BY_LEGACY_ID` に追加

既存の全キーと重複しないことを確認済み。7種の効果型(`fine` /
`loseProperties` / `teleport` / `percentLoss` / `skipTurn` / `steal` /
`payOthers`)を他国と同じく1対1で割り当てています。

```ts
// New Zealand
"ruapehu-ash": "fine", // 降灰の掃除・保線費用
norwester: "loseProperties", // 強風で緩んだ屋根が飛ばされる被害
"flood-washout": "steal", // 混乱に紛れて盗まれる(増水で迂回する人混みの中)
sandflies: "percentLoss", // 虫よけ・応急処置に現金の一部を費やす
"ferry-cancelled": "payOthers", // 波止場で足止めされた者どうし食料・宿を分け合う
"taniwha-lost": "teleport", // 化かされて気づけば別の場所にいる
"sheep-jam": "skipTurn", // 羊の大群が退くまで待たされる
```

## 7. `src/presentation/components/events/dooms/index.ts`

絵は別担当(NZ絵の担当)が `newzealand-ruapehu-ash.tsx` のように
7ファイル描きます。できあがったら、次の形で登録してください
(korea-*.tsx と同じパターン)。

```ts
import { NewZealandFerryCancelled } from "./newzealand-ferry-cancelled";
import { NewZealandFloodWashout } from "./newzealand-flood-washout";
import { NewZealandNorwester } from "./newzealand-norwester";
import { NewZealandRuapehuAsh } from "./newzealand-ruapehu-ash";
import { NewZealandSandflies } from "./newzealand-sandflies";
import { NewZealandSheepJam } from "./newzealand-sheep-jam";
import { NewZealandTaniwhaLost } from "./newzealand-taniwha-lost";

// ... DOOM_COMPONENTS 内に追加
"newzealand-ferry-cancelled": NewZealandFerryCancelled,
"newzealand-flood-washout": NewZealandFloodWashout,
"newzealand-norwester": NewZealandNorwester,
"newzealand-ruapehu-ash": NewZealandRuapehuAsh,
"newzealand-sandflies": NewZealandSandflies,
"newzealand-sheep-jam": NewZealandSheepJam,
"newzealand-taniwha-lost": NewZealandTaniwhaLost,
```

厄災の場面・演出の元ネタは `scripts/countries/newzealand/ART-KEYS.md` の
「厄災7種」表を参照してください。

---

## 測定記録(2026-08-19)

すべて `scripts/countries/newzealand/` を対象。焼き上がり前の一時
content.json(`proj`/`cities`/`edges`/`land`/`lakes` あるいは
`cities`/`quiz` のみ)を都度組んで検査し、**検査後に必ず削除**しています。

```
09:29  node --check scripts/countries/newzealand/cities.mjs         → 構文OK(40都市時点)
09:33  node --check scripts/countries/newzealand/geography.mjs      → 構文OK
09:33  node scripts/check-sea-routes.mjs newzealand -v              → 60px超 6本(40都市)
09:39  (ファンガレイ・ワイトモ・アシュバートンを追加/端の入替を実施)
09:39  node scripts/check-sea-routes.mjs newzealand -v              → 60px超 0本(43都市・53路線)
09:48  node --check scripts/countries/newzealand/flavour.mjs        → 構文OK(11地方・9アイテム・厄災7・季節12)
09:52  node --check scripts/countries/newzealand/money-events.mjs   → 構文OK(28件・全11地方でgain/loss各1件以上)
09:54  node --check scripts/countries/newzealand/music.mjs          → 構文OK(11地方・各8和音8旋律)
10:13  node --check scripts/countries/newzealand/quiz.mjs           → 構文OK(102問)
10:13  (正解の位置を機械的に均等化)                                  → 0/1/2 = 34/34/34
10:16  node scripts/check-quiz.mjs newzealand                       → 残り6件(下記参照、いずれも許容範囲と判断)
10:17  node --check scripts/countries/newzealand/index.mjs          → 構文OK。buildNewZealandContent() 実行確認済み
10:18  node scripts/check-sea-routes.mjs newzealand (再測定)         → 60px超 0本(価格改定後も変化なし。座標は無傷)
10:18  npx eslint scripts/countries/newzealand/*.mjs                → エラー0件(art.mjsのみ担当外の警告3件あり、未対応)
```

### `check-quiz.mjs` の残り6件(判断つき)

| Q | 内容 | 判断 |
|---|---|---|
| Q1 | 正解「南半球」がオアマルのカードにも出る | 短い一般語(既存の「アフリカ」「アジア」と同種)。オアマルのカードを読んでも答えは導けない。**許容** |
| Q46 | 正解「ダニーデン」がダニーデン自身のカードに出る | 都市名そのものを答えさせる設問。既存の「アンカラ」例と同種で、読んだ人が答えられるのは狙いどおり。**許容** |
| Q73 | 正解「ウェリントン」がウェリントン自身のカードに出る | 同上(世界一風の強い首都、という別の事実を問うており、カードの首都選定の話とは重ならない)。**許容** |
| Q89 f | 日本語文中の英字「bach」 | 語そのものが問いの中身(TGV・denimと同種の例外)。**許容** |
| Q90 f | 日本語文中の英字「Japanese」「sandals」 | jandalsの語源説明。原語を出さないと成立しない(Rücken/wandernと同種)。**許容** |

`ACCEPTED` / `ACCEPTED_LEAKS` への追記は取りまとめ側にお任せします
(共有配列のため自分では触っていません)。

### クイズの確度が低いもの

- **投票年齢18歳への引き下げ年(1974年)** — 21→20(1969年)→18(1974年)の
  二段階だったという理解に基づいています。1974年という年号そのものへの
  確信度は他の年号(1893・1908・1985など)より一段低いです。念のため
  ご確認をお願いします。
- 上記以外の難易度9〜10の年号・固有名詞(女性参政権1893年・ラザフォードの
  ノーベル化学賞1908年・レインボー・ウォリア号1985年・ピーター・ブレイク
  没2001年・NZドル変動相場制1985年・ウェストミンスター憲章採択1947年・
  老齢年金法1898年・スプリングボクス遠征1981年)は、いずれも広く記録された
  史実として確度が高いと判断しています。

### 都市数・路線数が当初計画から変わった理由

40都市で計画しましたが、`check-sea-routes.mjs` で60px超の食い違いが6本出たため、
中継の町を3件(ファンガレイ・ワイトモ・アシュバートン)足して43都市・
53路線(うち航路1本)にしました。詳しい経緯は `cities.mjs` 冒頭のコメントと
`NEWZEALAND_EDGES` 内の各コメントを参照してください。

### 物件の価格帯

86件、180〜2800(15.6倍)。オークランドのスカイタワー展望台(2800)と
ウェリントンの議事堂ビーハイブ(2200)を「1年ぶん貯めないと買えない」
上位2件として設定しています。
