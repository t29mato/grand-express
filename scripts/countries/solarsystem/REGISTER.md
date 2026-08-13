# 太陽系盤面の登録手順

**2026-08-13追記: 7箇所の登録は完了・焼き済み。** そのあとteam-leadが実測で
見つけた3件(voyager1/sedna/oortcloudが海に浮く・"land"→"rail"・
missionuplinkの値段)と、盤面の縦が17%しか使われていない指摘への対応で
`geography.mjs` を書き直した(天体を上下に大きく散らした)。以下は
最初の登録時点の記録なので、`geography.mjs` の現物とは数値が食い違う
(seg・oortcloudの経度・天体の緯度など)。**最新の状態はソース本体を見ること。**
再登録は不要(すでに全箇所当たっている)。再度 `node scripts/extract-legacy-content.mjs`
で焼き直してもらうだけでよい。

---

`scripts/countries/solarsystem/`(8ファイル)と
`src/presentation/components/events/dooms/solarsystem-*.tsx`(7ファイル)は
作成済み・自己検証済み。共有ファイルには一切触れていない。ここに書いた変更を
取りまとめ側で適用し、`node scripts/extract-legacy-content.mjs` と
`npm run check` を通してほしい。

他国と同じ7箇所。貼り付け用のコードをそのまま載せてある。

---

## 1. `scripts/extract-legacy-content.mjs`

import を1行追加。

```js
import { buildSolarsystemContent } from "./countries/solarsystem/index.mjs";
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
  buildSolarsystemContent(),
  // ...(他に並行作業中の盤面があれば、その並びに合わせて追加)
];
```

---

## 2. `scripts/content-overrides/property-economy.mjs`

`CURRENCY_MULTIPLIERS` に1行追加。team-lead指示どおり ×100
(所持金1200×100=120,000cr スタート)。実世界の為替換算ではなく
架空通貨なので、他国のような換算根拠のコメントは不要。

```js
  solarsystem: 100,
```

**`solarsystem/flavour.mjs` の `SOLARSYSTEM_META.cur` も最初から `mul: 100`**
にしてあるので、ここは実質そのまま反映するだけ。

---

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に1行追加。

```ts
  solarsystem: () => import("./solarsystem.content.json").then((m) => m.default),
```

---

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に1行追加。

```ts
  solarsystem: () => import("../content/solarsystem.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

---

## 5. `src/infrastructure/content/item-effect-rules.ts`

`ITEM_EFFECT_BY_LEGACY_KEY` に9行追加。**既存キーと衝突していないことを確認済み**
(下記「確認方法」参照)。

```ts
  // Solar System
  gravassist: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  ionburn: { type: "choose-exact-dice" },
  solarsail: { type: "roll-fixed-dice", diceCount: 2 },
  fusiondrive: { type: "roll-fixed-dice", diceCount: 3 },
  shieldplating: { type: "none" }, // 厄災の神(スクラップ・スプライト)のward item(passive)
  distressflare: { type: "repel-spirit" },
  missionuplink: { type: "quiz-save" },
  salvagepod: { type: "gain-cash", amount: 380 },
  overclock: { type: "extra-turn" },
```

### 確認方法(衝突していないこと)

```
node -e 'const ids=require("./src/infrastructure/content/country-index.json").map(c=>c.id);
const k=new Set(); for(const i of ids){Object.keys(require(`./src/infrastructure/content/${i}.content.json`).items).forEach(x=>k.add(x))}
console.log([...k].sort().join(" "))'
```
の結果に `gravassist ionburn solarsail fusiondrive shieldplating distressflare
missionuplink salvagepod overclock` のいずれも含まれないことを確認した
(2026-08-13時点の全焼き上がりキー一覧に対して、9件とも新規)。

---

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6.1 `SEASON_EFFECTS_BY_COUNTRY` に `solarsystem:` を追加

`solarsystem/flavour.mjs` の `SOLARSYSTEM_SEASONS`(フレーバー文、宇宙開発史の
記念日)と対になる数値ルール。地方コードは `core`=太陽 / `inner`=地球型惑星 /
`belt`=小惑星帯 / `outer`=巨大惑星 / `tno`=冥王星以遠 / `deep`=太陽系の縁 /
`probe`=探査機。実際の四季が無いため、**「その月に起きた出来事に近い地方」**
を上げ下げする形にしてある(日射しや収穫のような季節要因の代わり)。

```ts
  solarsystem: [
    /* 0 Apr ガガーリンの日(地球周回) */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.3 },
    ],
    /* 1 May シェパードの弾道飛行 */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("probe"), multiplier: 1.15 },
    ],
    /* 2 Jun テレシコワ、初の女性宇宙飛行士 */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.25 },
    ],
    /* 3 Jul 月面着陸(太陽系じゅうが祝う特別な月) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("core"), multiplier: 1.1 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug キュリオシティの火星着陸 */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.25 },
    ],
    /* 5 Sep ボイジャー打ち上げの季節(巨大惑星を回った探査機) */ [
      { op: "region-income-multiplier", regionId: region("outer"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("probe"), multiplier: 1.2 },
    ],
    /* 6 Oct スプートニク1号(最初の人工衛星) */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("probe"), multiplier: 1.15 },
    ],
    /* 7 Nov ライカを偲ぶ月(静かな追悼) */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 0.9 },
    ],
    /* 8 Dec 「地球の出」(贈り物のような一枚の写真) */ [
      { op: "give-item-to-all" },
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.15 },
    ],
    /* 9 Jan エクスプローラー1号、ヴァン・アレン帯の発見 */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("outer"), multiplier: 0.85 },
    ],
    /* 10 Feb ペイル・ブルー・ドット(海王星を越えた辺りから撮影) */ [
      { op: "region-income-multiplier", regionId: region("tno"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("deep"), multiplier: 1.15 },
    ],
    /* 11 Mar 最初の宇宙遊泳(小惑星帯へ踏み出す気概にかけて) */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("belt"), multiplier: 1.15 },
    ],
  ],
```

### 6.2 `DOOM_EFFECT_ID_BY_LEGACY_ID` に7行追加

`solarsystem/flavour.mjs` の `SOLARSYSTEM_DOOM` は語感で選んだ対応にしてある
(他国も「ハンター蜘蛛→ teleport(驚いて飛びのく)」のような語感対応なので、
それに揃えた)。**配列の並び順とは一致しない**ので、下のとおり `id` で指定すること。

```ts
  // Solar System
  solarflare: "fine",             // 太陽フレア: 機器修理費
  debris: "percentLoss",          // デブリ衝突: 船体の割合ダメージ
  commblackout: "skipTurn",       // 通信途絶: 手も足も出ず足止め
  gravityassistfail: "teleport",  // 重力アシスト失敗: 意図しない場所へ飛ばされる
  radiationbelt: "loseProperties",// 被曝: 治療費のため資産を手放す
  duststorm: "steal",             // 砂嵐: 電力(=稼ぎ)を奪われる
  fuelshortage: "payOthers",      // 燃料切れ: 近くの誰かに融通してもらう
```

---

## 7. `src/presentation/components/events/dooms/index.ts`

import を7行追加。

```ts
import { SolarsystemCommblackout } from "./solarsystem-commblackout";
import { SolarsystemDebris } from "./solarsystem-debris";
import { SolarsystemDuststorm } from "./solarsystem-duststorm";
import { SolarsystemFuelshortage } from "./solarsystem-fuelshortage";
import { SolarsystemGravityassistfail } from "./solarsystem-gravityassistfail";
import { SolarsystemRadiationbelt } from "./solarsystem-radiationbelt";
import { SolarsystemSolarflare } from "./solarsystem-solarflare";
```

`DOOM_ANIMATIONS` に7行追加。

```ts
  "solarsystem-solarflare": SolarsystemSolarflare,
  "solarsystem-debris": SolarsystemDebris,
  "solarsystem-commblackout": SolarsystemCommblackout,
  "solarsystem-gravityassistfail": SolarsystemGravityassistfail,
  "solarsystem-radiationbelt": SolarsystemRadiationbelt,
  "solarsystem-duststorm": SolarsystemDuststorm,
  "solarsystem-fuelshortage": SolarsystemFuelshortage,
```

---

## 焼いたあとにお願いしたいこと

- `node scripts/check-quiz.mjs solarsystem` — 自己検算はしたが(下記参照)、
  実物での確認はできていない
- `node scripts/check-sea-routes.mjs solarsystem -v` —
  **下記「島の大きさと航路の食い違いについて」を先に読んでほしい。
  6本、KEPT行き待ちの既知の食い違いがある**
- `node scripts/check-city-backgrounds.mjs`
- `npm run shot -- solarsystem overview` / `city sun` などで見た目を確認

---

## 島の大きさと航路の食い違いについて(要判断)

`check-sea-routes.mjs` のアルゴリズムをそのまま写した自己検算スクリプトで、
**焼く前のソースに対して**39路線すべてを測った(やり方は
`docs/50-authoring/13-new-board.md`「自作の検査で代用しない」の指示どおり、
本物の `corner`/`trace` 関数をコピーして使った)。

結果、**6本が60px超で残る。**

```
sun-mercury          航路が陸 82px / 線長230px
ceres-jupiter        航路が陸 79px / 線長262px
jupiter-saturn       航路が陸 94px / 線長237px
saturn-uranus        航路が陸 85px / 線長273px
uranus-neptune       航路が陸 72px / 線長175px
sun-parkersolarprobe 航路が陸 72px / 線長143px
```

**原因は他国の「岬をかすめる」パターンとは違う。**天体を「都市の中心=島の
中心」にしているため(そうしないと都市が海に浮く)、大きな天体から出る航路は
**天体自身の半径ぶんだけ最初から陸を通る。**この6本はすべて太陽・木星・土星・
天王星という盤面でもっとも大きい天体が絡んでいて、数値はほぼ「両端の半径の
合計」と一致する(例: 木星—土星は48px+46px=94pxで、報告値94pxとほぼ一致)。

**取りうる手は2つ。**

1. **KEPTとして残す。**理由は「天体自身の大きさが太陽系でいちばんの見せ場
   なので、60px以下まで小さくすると太陽・木星・土星・天王星が主役級の
   大きさに見えなくなる」。他国の「実在の鉄道だから」「実在のフェリー航路
   だから」と同種の判断だが、根拠は「盤面の作りそのもの(天体=島)から
   来る構造的な特徴」である点が異なる。
2. **さらに小さくする。**半径を40px未満まで削れば6本とも解消する見込みだが、
   太陽と木星・土星・天王星が他の惑星と比べて大きく見えなくなる
   (最初の版では太陽100px・木星85pxだったのを、この6本を減らすために
   すでに58px・48p​pxまで縮めている)。

**取りまとめ側の判断を仰ぎたい。**1で進めてよいなら、上の6本を
`check-sea-routes.mjs` の `KEPT` に追記する形で対応する(理由はこの節を
要約したものを用意する)。2を選ぶ場合は、どの天体をどこまで縮めるか
指示があれば当方で直す。

---

## 短く報告

- **都市数40・路線数39**(主系列18・支線5=いずれも航路、天体系内16=陸路)
- **4言語の欠け**: `node -e` で `import()` させ、`t()` が4言語に分けられない
  文字列で例外を投げる仕組みを利用して機械的に検出。cities.mjs・
  money-events.mjs で各1件ずつ実際に検出して直した(欠けたまま提出していない)。
  現在は全ファイルが例外無しで読み込める。
- **物件価格**: 最安170〜最高2900(17.06倍)。80件(40天体×2)全件で計算して確認。
- **アイテムの鍵9件**: `gravassist ionburn solarsail fusiondrive shieldplating
  distressflare missionuplink salvagepod overclock`。既存キーと衝突しないことを
  上記コマンドで確認済み。
- **クイズ32問**: 正解位置は0=11・1=11・2=10。難易度1〜10すべて使用。
  都市カード(tag/fact)との重なりは、答えの文字列を全カード文に対して
  総当たりで検索する自己検算スクリプトで確認し、出た17件はすべて
  「答えがその天体自身の名前」という正常なパターン(「中国の首都は?」と
  同種)であることを目視で確認した。
- **seg**: 指示値130のままだと1マスに丸まる路線が39本中31本になり
  マス数の変化がほとんど付かなかったため、**60に下げた**
  (1マス17・2マス11・3マス3・4マス5・5マス1・6マス1・7マス1本、
  9マスへの張り付き無し)。
- **迷った点・判断した点**
  - **オールトの雲**は対数尺の式にそのまま通すと経度368.8になり盤面の外に
    出る(team-lead試算どおり)。この数字自体を豆知識として使い、盤面上は
    右端に象徴として引き戻して置いた。
  - **冥王星以遠の詰まり**は、緯度方向(同天体系を散らす軸)を流用して
    ハウメア・マケマケ・ハレー彗星・ニューホライズンズを主系列から
    上下にずらす形で解決した(team-lead承認済み)。
  - **衛星は親星と1枚の島に凸包で合体させた。**そうしないと「同じ天体系の
    中は陸路にしてよい」という指示が使えない(陸路なのに大半が宇宙空間を
    通ることになり検査に弾かれるため)。凸包は各天体の円周上の点をすべて
    まとめて包む方式で、中心が島の外に出ないことを数学的に保証している。
  - **季節(12ヶ月)は宇宙開発史の記念日にした。**最初に書いたときは月を
    意識せずに事実を選び、7月に2件・11月に2件が重なって8月・1月が空く
    間違いをしていた。気づいて並べ替え、重なった側の2件(バイキング1号・
    ザーリャ)は当該の月に実際に起きた別の事実(8月のキュリオシティ着陸・
    1月のエクスプローラー1号)に差し替えた。
  - 探査機の現在距離(ニューホライズンズ60AU・ボイジャー2号139AU・
    ボイジャー1号167AU)は**日々変わる値のスナップショット**なので、
    豆知識の中でそう明記した。
  - 領有権・戦災・伝説の扱いは今回の題材上ほぼ発生しない
    (唯一、パーカー・ソーラー・プローブとオールトの雲は「盤面の縮尺に
    収まらない」ことを隠さず豆知識にした)。
- **走らせていない検査**: `node scripts/check-quiz.mjs solarsystem` /
  `node scripts/check-sea-routes.mjs`(本物) / `node scripts/check-city-backgrounds.mjs` /
  `npm run check` / `npm run shot` はいずれも走らせていない
  (焼く前なので実行できない、または共有ファイルにつき取りまとめ側の作業)。
  上に書いた数値はすべて、焼く前のソースに対する自己検算スクリプトの結果。
