# カナダ登録用スニペット

取りまとめ側が以下7箇所に貼り付ける。**担当(自分)はこれらのファイルを直接編集していない。**

## 4回目の差し戻しへの対応(残り4本のうち2本を実測で解消)

`node scripts/check-sea-routes.mjs canada` を自分で回せるようになったので実測した。

- **`northsydney–halifax`**(このとき自分の手元の順)は63px。**逆順
  `halifax–northsydney` に戻したら2pxに下がった。**(以前の2回、同じ「端を
  入れ替え」の提案を試したときは効かなかったが、今回は実測で確認できた。
  今後は「提案どおりに変えたら、必ず自分で再実測して確かめる」ようにする。)
- **`northsydney–cornerbrook`**(航路)も端を入れ替えて `cornerbrook–northsydney`
  にしたら116px→55pxに下がった(60px閾値の下)。

残り2本(`vancouver–princerupert` / `princerupert–whitehorse`)は KEPT に。
文言案は前回のまま(下記)。

```
["canada:vancouver-princerupert", "インサイド・パッセージ航路。BC海岸は入り江・島が複雑で、簡略化した輪郭では航路が陸を横切る。実在するBCフェリーの航路"],
["canada:princerupert-whitehorse", "アラスカ・マリン・ハイウェイ〜白馬周辺の簡略化。同様にBC・南東アラスカの海岸が複雑なための誤検知"],
```

`npx tsc --noEmit` / `npx eslint scripts/countries/canada/` は引き続きエラー・
警告0件、`buildCanadaContent()` も45都市・50路線で成功を確認済み。

## 3回目の差し戻しへの対応(五大湖の楕円が粗すぎた件)

**team-leadの見立てどおりでした。**8本→7本になった2回目の差し戻しのうち、
`thunderbay–wawa`(100%海)・`toronto–kingston`(86%海)・`toronto–sudbury`
(前回と1pxも変わらず)の3本は、**海岸線ではなく `CANADA_LAKES` の湖の楕円が
実際の湖岸の町を呑み込むほど大きかったこと**が原因でした(scratchpadで検算し
直して確認)。スペリオル湖の楕円はサンダーベイ・ワワの座標をどちらも内側に
含んでおり、オンタリオ湖の楕円はトロントの座標を内側に含んでいました。

**直しかた:** 3つの湖(スペリオル・ヒューロン・オンタリオ)の楕円を、開けた
湖面だけに寄せて縮小・位置調整しました(エリー湖は指摘が無かったのでそのまま)。
オンタリオ湖は縮小すると中心が海側にはみ出したため、中心座標を陸の上に
戻しています(`geography.mjs` のコメント参照)。scratchpadで、関係する町
(サンダーベイ・ワワ・スーセントマリー・トロント・キングストン・ナイアガラ
フォールズ・サドバリー)がすべて楕円の外にあり、該当4路線の直線が楕円と
交差しないことを検算しました。

**`quebec–moncton`(セントローレンス湾・シャルー湾の辺りで海に出る)**は、
リビエール・デュ・ルー(実際のVIA「オーシャン」号の経路上の町。45都市目)を
挟んで2本に分割しました。

**`halifax–northsydney`**は端の順を入れ替えました(直線は100%陸の上だったので、
オクトリニアの曲がり方だけの問題と判断)。

## プリンスルパートの2本は KEPT で残す判断にしました

`vancouver–princerupert` と `princerupert–whitehorse` は、BC海岸の入り江・島の
複雑さを盤面の簡略化した輪郭では表現しきれないため、**直さずに理由を書いて
残す**ほうを選びました。インサイド・パッセージは実在するBCフェリー/アラスカ・
マリン・ハイウェイの航路です。`KEPT` への追記文言案:

```
["canada:vancouver-princerupert", "インサイド・パッセージ航路。BC海岸は入り江・島が複雑で、簡略化した輪郭では航路が陸を横切る。実在するBCフェリーの航路"],
["canada:princerupert-whitehorse", "アラスカ・マリン・ハイウェイ〜白馬周辺の簡略化。同様にBC・南東アラスカの海岸が複雑なための誤検知"],
```

## 直したあとの再確認

都市**44→45**(リビエール・デュ・ルーを追加。qc地方が5→6)、路線**49→50**。
`use-board-layout.test.ts` と同じ検算(45都市・湖6件とも陸の上)、連結性
(45都市すべて到達可能)、`npx tsc --noEmit` / `npx eslint` エラー・警告0件を
再確認済みです。物件開きは160〜2700で変わらず16.9倍。

## 2回目の差し戻しへの対応(`check-sea-routes.mjs` で見つかった8本)

**再度焼き直しが必要です。**`scripts/countries/canada/` 側だけを直しました。

- 都市が**40→44**(プリンスルパート/bc・ワワ/on・ロンドン/on・ノースシドニー/atl の
  4件を追加)、路線が**46→49**になりました。地域内訳・mark/bg件数は
  `cities.mjs` 冒頭コメントを直接見てください(bc6/ab6/pr5/on10/qc5/atl9/north3、
  mark31種・bg34種)。
- 8本の路線はすべて、team-lead の見立てどおり**実在する中継地・実在するフェリー港を
  挟むか、端の順を入れ替える**方法で直しました(詳細は各都市・路線の直前のコメントに
  書いてあります)。
  - `vancouver–whitehorse` → プリンスルパートを挟んで2本の航路に分割
  - `winnipeg–churchill` / `sudbury–toronto`(→`toronto-sudbury`) /
    `quebec–moncton`(→`moncton-quebec`) → 端の順を入れ替えるだけ(無料の直し)
  - `thunderbay–saultstemarie` → ワワを挟んで2本の陸路に分割(実際の道路・鉄道どおり)
  - `thunderbay–sudbury` → **直結の路線そのものを削除**(ワワ経由のほうが実在の経路で、
    直結は湖を横切るだけの冗長な路線だったため)
  - `toronto–windsor` → ロンドンを挟んで2本の陸路に分割(実際のVIAコリドー線どおり)
  - `halifax–cornerbrook` → ノースシドニーを挟んで陸路+航路に分割
    (ハリファックス〜ノースシドニーはキャンソー地峡道の固定リンクなので陸路、
    ノースシドニー〜コーナーブルックが実在するマリン・アトランティックのフェリー)
- **路線配列は末尾に追記する形にし、既存路線の添字はできるだけ動かしていません**
  (中継地を挟む場合の新しい2本目の路線は配列の末尾にまとめて置いてあります)。
  ただし `thunderbay–sudbury` の削除と、置き換えが必要だった行の書き換えは
  その場で行っています。
- 新しい4都市も、`use-board-layout.test.ts` と同じ point-in-polygon で
  陸の上にあることを確認済みです(プリンスルパート6.3px・ノースシドニー13.2px・
  ワワ86.8px・ロンドン53.4pxの余白)。プリンスルパートの海岸線は、実際は半島・
  島が入り組んだ地形を大幅に簡略化していたため、1点だけ張り出しを追加しました
  (`geography.mjs` 参照)。
- `npx tsc --noEmit` / `npx eslint scripts/countries/canada/` はエラー・警告0件、
  `buildCanadaContent()` の実行(4言語チェック含む)も成功、連結性(44都市すべてに
  到達可能)・投影範囲内・陸の上であることも再確認済みです。
- **`check-sea-routes.mjs` はこちらでは走らせていません**(焼く必要があるため)。
  直した8本が実際に閾値を下回っているかは、再度焼いたあとの結果で確認してください。

## 1. `scripts/extract-legacy-content.mjs`

import に追加(他の `buildXContent` の並びに合わせる):

```js
import { buildCanadaContent } from "./countries/canada/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追加:

```js
  buildCanadaContent(),
```

## 2. `scripts/content-overrides/property-economy.mjs`

通貨倍率。作業開始時の指示どおり `canada: 90`(C$108,000スタート)。

```js
  canada: 90,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追加:

```ts
  canada: () => import("./canada.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追加:

```ts
  canada: () => import("../content/canada.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts`

9件。既存キーと衝突しないことを確認済み(下記「確認したこと」参照)。

```ts
  // Canada
  bushplane: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  portage: { type: "choose-exact-dice" },
  oceantrain: { type: "roll-fixed-dice", diceCount: 2 },
  canadianrail: { type: "roll-fixed-dice", diceCount: 3 },
  bearbells: { type: "none" }, // 厄災の神(サスクワッチ)のward item(passive)
  bearspray: { type: "repel-spirit" },
  almanac: { type: "quiz-save" },
  loonie: { type: "gain-cash", amount: 380 },
  doubledouble: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 季節(12ヶ月、`SEASON_EFFECTS_BY_COUNTRY` に追加)

`region()` は `bc` / `ab` / `pr` / `on` / `qc` / `atl` / `north`。

```ts
  /**
   * カナダ。メープル season(4月) → 5月連休・別荘地(5月) → 建設シーズンと
   * ブヨ(6月) → カナダ・デーと山火事(7月・休神) → プレーリー収穫(8月) →
   * テリー・フォックスと新学期(9月) → 感謝祭と紅葉(10月) → 戦没者追悼の日と
   * グレイカップ(11月) → クリスマスマーケット(12月) → ポーラーベア・ディップ
   * (1月・給アイテム) → ウィンタールードと冬祭り(2月) → 春休みとメープル再開
   * (3月)、という流れ。
   */
  canada: [
    /* 0 Apr メープルシロップの season 終盤 */ [
      { op: "region-income-multiplier", regionId: region("qc"), multiplier: 1.2 },
    ],
    /* 1 May 5月の連休・別荘地の season 開き */ [
      { op: "region-income-multiplier", regionId: region("on"), multiplier: 1.25 },
      { op: "all-players-gain-cash", amount: 220 },
    ],
    /* 2 Jun 建設シーズンとブヨ */ [
      { op: "region-income-multiplier", regionId: region("on"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("north"), multiplier: 0.85 },
    ],
    /* 3 Jul カナダ・デーと山火事シーズン(休神) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("bc"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("ab"), multiplier: 0.85 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug プレーリーの収穫 */ [
      { op: "region-income-multiplier", regionId: region("pr"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("ab"), multiplier: 1.1 },
    ],
    /* 5 Sep テリー・フォックスと新学期の物入り */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("on"), multiplier: 1.1 },
    ],
    /* 6 Oct 感謝祭と紅葉 */ [
      { op: "all-players-gain-cash", amount: 280 },
      { op: "region-income-multiplier", regionId: region("qc"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("on"), multiplier: 1.15 },
    ],
    /* 7 Nov 戦没者追悼の日 */ [
      { op: "all-players-pay-cash", amount: 140 },
    ],
    /* 8 Dec クリスマスマーケット */ [
      { op: "all-players-pay-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("qc"), multiplier: 1.15 },
    ],
    /* 9 Jan 新年・ポーラーベア・ディップ */ [
      { op: "give-item-to-all" },
      { op: "region-income-multiplier", regionId: region("north"), multiplier: 0.85 },
    ],
    /* 10 Feb ウィンタールードと冬祭り */ [
      { op: "region-income-multiplier", regionId: region("on"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("qc"), multiplier: 1.2 },
      { op: "all-players-gain-cash", amount: 200 },
    ],
    /* 11 Mar 春休みとメープルの season 再開 */ [
      { op: "region-income-multiplier", regionId: region("ab"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("qc"), multiplier: 1.1 },
    ],
  ],
```

### 厄災(7件、`DOOM_EFFECT_ID_BY_LEGACY_ID` に追加)

```ts
  // Canada
  "gravy-spill": "fine",
  "raccoon-cooler": "steal",
  "black-ice-fender": "percentLoss",
  "blackfly-swarm": "payOthers",
  "led-astray": "teleport",
  "drive-thru-line": "skipTurn",
  "ice-storm-outage": "loseProperties",
```

## 7. `src/presentation/components/events/dooms/index.ts`

```ts
import { CanadaGravySpill } from "./canada-gravy-spill";
import { CanadaRaccoonCooler } from "./canada-raccoon-cooler";
import { CanadaBlackIceFender } from "./canada-black-ice-fender";
import { CanadaBlackflySwarm } from "./canada-blackfly-swarm";
import { CanadaLedAstray } from "./canada-led-astray";
import { CanadaDriveThruLine } from "./canada-drive-thru-line";
import { CanadaIceStormOutage } from "./canada-ice-storm-outage";
```

`DOOM_ANIMATIONS` に追加:

```ts
  "canada-gravy-spill": CanadaGravySpill,
  "canada-raccoon-cooler": CanadaRaccoonCooler,
  "canada-black-ice-fender": CanadaBlackIceFender,
  "canada-blackfly-swarm": CanadaBlackflySwarm,
  "canada-led-astray": CanadaLedAstray,
  "canada-drive-thru-line": CanadaDriveThruLine,
  "canada-ice-storm-outage": CanadaIceStormOutage,
```

---

# 報告

## 件数

- 都市40・路線46・クイズ33・出来事(青/赤マス)25・アイテム9・厄災7・季節12・
  地方7(`bc`/`ab`/`pr`/`on`/`qc`/`atl`/`north`)
- 都市シンボル(mark)28種・都市背景(bg)30種(すべて `cities.mjs` の指定と
  1対1で対応していることを機械的に確認済み。過不足なし)

## 4言語の欠けの数え方

`city-helpers.mjs` / 各ファイル内の `t()` は「`|`で4分割できなければ例外」を出す。
このドラフトでは**1件ずつ目で見るのではなく**、`node -e 'import(...)...'` で
`cities.mjs` / `quiz.mjs` / `money-events.mjs` / `flavour.mjs` / `index.mjs`
(= `buildCanadaContent()` を最後まで実行)を実際に読み込ませ、**例外が出ないこと**
を確認した(全ファイル・全キーが対象になる)。結果はすべて成功。

## seg の実測(team-lead 指摘への対応)

初期値として示された140(トルコに合わせた値)で46路線ぶんの投影後距離を測ったところ、
**37本(80%)が1マスに潰れ**、韓国の分布(1:17/2:21/3:9/4:3/5:1/6:1/7:1/9:2、
55路線)と比べて極端に偏っていた。理由は、カナダの路線網が「プレーリー横断・
チャーチル航路・ハドソン湾支線など少数の長距離路線」と「地方内の短い移動
(オタワ―ガティノー3px、トロント―ナイアガラ30pxなど)の多数派」に二極化している
ため。60〜100を実測して比べ、**64(システム既定値と同じ)** が最も韓国の分布に
近づいた(1:18/2:13/3:7/4:2/5:3/6:1/8:1/9:1)。9マスに達するのは
vancouver–whitehorse(757px、インサイド・パッセージ航路)の1本のみ。

`geography.mjs` の `CANADA_PROJ.seg` はこの実測に基づき **64** にしてある
(team-lead から示された140から変更。理由はファイル内コメントにも書いた)。

## 海岸線の押し戻し(team-lead 指摘への対応)

最初、国境ぎりぎりの都市(ウィンザー・ナイアガラフォールズ・キングストン・
セントジョン・セントジョンズ・ハリファックス・チャーチル)のために海岸線側を
10〜20px押し戻していたが、team-lead から「五大湖の形はカナダの輪郭でいちばん
見慣れた部分なので、都市の座標側を内陸へ寄せるほうを優先してほしい」との指摘を
受け、**海岸線の補正を小さく戻し(概ね5〜10px相当)、代わりに都市の座標を
0.05〜0.15度(3〜8px相当)内陸へ寄せる**方式に直した。実際の値:

| 都市 | 実際の座標(Wikipedia等) | このゲームでの座標 | 差 |
|---|---|---|---|
| ウィンザー | -83.03, 42.30 | -82.90, 42.42 | 内陸へ約0.13°+0.12° |
| ナイアガラフォールズ | -79.07, 43.09 | -79.05, 43.15 | 内陸へ約0.06° |
| キングストン | -76.48, 44.23 | -76.52, 44.28 | 内陸へ約0.05° |
| セントジョン | -66.06, 45.27 | -66.10, 45.32 | 内陸へ約0.05° |
| セントジョンズ | -52.71, 47.56 | -52.80, 47.56 | 内陸(西)へ約0.09° |
| ハリファックス | -63.57, 44.65 | -63.60, 44.70 | 内陸へ約0.05° |

補正後の余白(`use-board-layout.test.ts` と同じ point-in-polygon で自分で検算):
ウィンザー6.5px・ナイアガラ8.1px・キングストン10.2px・セントジョン10.6px・
セントジョンズ7.6px・ハリファックス12.0px・チャーチル12.1px。他の33都市は
17〜48pxの余白がある。**焼いたあとの `npm run shot` で五大湖の形が崩れていないか
見てもらいたい。**

## 物件価格

最安160(ヘイリバー・ガンダーの物件)〜最高2700(トロント)で **16.9倍**。
辺境の町(ヘイリバー・ガンダー・コーナーブルック・サグネなど)に160〜380クラス、
トロント・バンクーバー・モントリオール・バンフ・ウィスラーに2200〜2700クラスを置いた。

## アイテムの鍵(9件)と衝突確認

```
node -e 'const ids=require("./src/infrastructure/content/country-index.json").map(c=>c.id);
const k=new Set(); for(const i of ids){Object.keys(require(`./src/infrastructure/content/${i}.content.json`).items).forEach(x=>k.add(x))}
console.log([...k].sort().join(" "))'
```
で既存18か国ぶんの鍵一覧を出し、`bushplane` `portage` `oceantrain` `canadianrail`
`bearbells` `bearspray` `almanac` `loonie` `doubledouble` のどれも含まれていない
ことを確認した(このセッションで並行して書かれているオーストラリア・ウクライナ・
ベネズエラ・ブラジルの分はまだ焼かれていないため、この一覧には載っていない。
`road` `atlas` `coach` のような英語圏で当たりやすい平易な語は避け、カナダに
固有の実在の列車名・実在の習慣を選んだ)。

## 走らせた検査・走らせていない検査

- `node -e 'import(...)'` で `cities.mjs`・`quiz.mjs`・`money-events.mjs`・
  `flavour.mjs`・`geography.mjs`・`art.mjs`・`index.mjs`(=`buildCanadaContent()`)
  を実行し、4言語の欠けと例外が無いことを確認した。
- `use-board-layout.test.ts` と同じ point-in-polygon アルゴリズムを scratchpad に
  写し、40都市・湖6件が投影範囲内・陸の上にあることを確認した。
- `npx tsc --noEmit`(プロジェクト全体)を実行し、エラー0件を確認した。
- `npx eslint scripts/countries/canada/ src/presentation/components/events/dooms/canada-*.tsx`
  を実行し、警告0件を確認した(使わない部品は残していない)。
- `npx vitest run src/presentation/components/events/dooms/dooms.test.ts` を実行し、
  149件全て通過(厄災の絵7枚がviewBox・reduced-motion・文字要素なし・無限ループ・
  aria-hiddenの仕様を守っていることを確認)。
- **`node scripts/extract-legacy-content.mjs` は走らせていない**(作業ツリー共有のため、
  指示どおり)。したがって以下は**走らせていない**:
  - `node scripts/check-quiz.mjs canada`
  - `node scripts/check-sea-routes.mjs canada`
  - `node scripts/check-city-backgrounds.mjs`
  - `npm run check` / `npm run shot -- canada overview`
  焼いたあとにこれらを回して確認してほしい。特に **`vancouver-whitehorse`(sea、
  757px、インサイド・パッセージ航路)・`halifax-cornerbrook`(sea、カボット海峡)・
  `hayriver-yellowknife`(sea、グレートスレーブ湖の渡し)の3本は、自分の手では
  海岸線との交差を測れない**(ドキュメント記載のとおり)ので、
  `check-sea-routes.mjs` の結果を見て直す。

## 迷った点・判断した点

- **厄災の神はサスクワッチ(ビッグフット)にした。** カナダ先住民の口承にも
  西洋開拓者の逸話にも見られる伝承だが、特定の民族の信仰(マニトゥ・ウェンディゴ
  など)とは結び付けず、木こりのキャンプ話として広く流布した「大きいだけで
  残酷ではない」水準にとどめた。ウェンディゴは人食いに関わる先住民の実際の
  信仰概念であり、この扱いには向かないと判断して除外した。
- **CPU名は先住民の固有名詞を創作せず**、オゴポゴ(BCの湖の怪物)・
  ラ・シャスガレ(ケベックの空飛ぶカヌー伝説)・オールド・イエロー・トップ
  (ノバスコシアの光る幽霊の言い伝え)・ブルーノーズ(帆船)という、
  特定の民族の信仰に紐付かない伝承・実在物から選んだ。
- **カムループスの先住民寄宿学校**は、後年見直された具体的な人数(215人など)を
  出さず「印のない墓の痕跡」という確認された水準に留めた。
- **ウィンザーの地下鉄道**(自由を求める人々の逃避先としてのカナダ)は、
  バンクーバーの人頭税と対になる形で、カナダの移民史の両面を示すために選んだ。
- **ジャスパー(2024年山火事)・サグネ(1996年洪水)**は、直近の災害を
  「何事もなかったような観光案内」にしないよう、事実として書いたうえで
  復興が進行中/高台への移転という現在の姿にも触れた。
- **領有権に争いのある土地は無い**(カナダは国境をほぼ確定させた国であり、
  該当する論点は今回の40都市には出てこなかった)。
- **地方は7つ**(bc/ab/pr/on/qc/atl/north)。実際の州・準州(10州3準州)を
  そのまま使うと多すぎるため、経済的・文化的にまとまりのある単位に集約した。
