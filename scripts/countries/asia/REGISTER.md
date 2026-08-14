# アジア盤面の登録内容

`scripts/countries/asia/` 8ファイルと `dooms/asia-*.tsx` 7枚は作成済み。
都市64・路線68・クイズ33・お金の出来事18・アイテム9・厄災7・季節12・
mark45種・bg18種・音楽7地方。以下、共有ファイルへ貼り付けるためのコード片。

**team-lead指摘の反映(2026-08-14、2回目)**: インド3都市(アターリー/ワガー・
ハルディバリ・レド)と丹東を追加(60→64都市)、カスピ海の楕円を縮小
(バクーは含みシェキは含まない形に)、`istanbul-tabriz`・`danang-hanoi`・
`tehran-tabriz`・`kanchanaburi-phnompenh` の端を入れ替え、`doha-dubai` を
航路に変更、`amman-baghdad`(冗長な連結)と `dhaka-ledo`・`ledo-kunming`・
`beijing-dandong` を追加、`kanchanaburi-malacca` を削除(sas経由の連結で
代替)。背景18種すべてを40要素以上に引き上げ済み(平均42.2)。詳しくは
末尾の「自分で確かめたこと」を参照。

**3回目の反映(同日)**: 自分で `check-sea-routes.mjs` / `check-quiz.mjs` を
回せる状態になったので実行。`amman-baghdad` の挿入で `tabriz-istanbul` の
添字が1つずれ、直したはずの端の入れ替えが打ち消されていたのを発見して
`istanbul-tabriz` に戻した。`busan-hongkong`・`istanbul-beirut` も端を
入れ替えた(未試行だったため)。アイテム`magiccarpet`を560→300に
(`bogie`380より安く)。クイズ3問(マラッカ海峡/バイカル湖/オスマン帝国)が
都市カードと内容が重なっていたため別の設問に差し替えた。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の `buildSouthAmericaContent` の import の下に追加):

```js
import { buildAsiaContent } from "./countries/asia/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行(既存の配列末尾に1行足すだけ):

```js
const AUTHORED_COUNTRIES = [
  // ...既存の27件...
  buildSouthAmericaContent(),
  buildAsiaContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加(指示どおり `asia: 100`。世界一周・
ヨーロッパ・北アメリカ・南アメリカの各大陸盤面と同じ倍率):

```js
  // 開始資金1200 × 100 = $120,000。世界一周・他の大陸盤面と同じ倍率。
  asia: 100,
```

(`CITY_PROPS` への追加は無し。物件価格は `cities.mjs` に直接書き込んである。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  asia: () => import("./asia.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  asia: () =>
    import("../content/asia.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

**鍵の衝突なしを確認済み**(下記「自分で確かめたこと」参照)。

```ts
  // Asia
  relay: { type: "extra-turn" },
  magiccarpet: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  bogie: { type: "choose-exact-dice" },
  caravanserairest: { type: "none" }, // 厄災の神(時刻表に無い列車)のward item(passive)
  silkbolt: { type: "gain-cash", amount: 380 },
  waybill: { type: "quiz-save" },
  teabrick: { type: "roll-fixed-dice", diceCount: 2 },
  sleeperticket: { type: "roll-fixed-dice", diceCount: 3 },
  firman: { type: "repel-spirit" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `lev`=レヴァント・コーカサス / `arb`=アラビア半島・湾岸 /
`cas`=中央アジア / `sib`=シベリア・モンゴル・極東 / `eas`=東アジア /
`sas`=南アジア / `sea`=東南アジア。4月始まり。9月(index 5, 台風)が
休神、1月(index 9, 大晦日の花火)が全員アイテム配布。

既存の `SEASON_EFFECTS_BY_COUNTRY` オブジェクトの閉じ `};`(1654行目)の直前に追加:

```ts
  /**
   * アジア大陸。草原のチューリップ → 暑さの前の隊商 → フェルガナの綿花 →
   * ベンガル湾のモンスーン → ヒジャーズへの巡礼 → 環太平洋の台風(9月・休神) →
   * オアシスのメロン → 東アジアの中秋節 → ヒマラヤ山麓の紅葉 →
   * 湾岸の大晦日(1月・給アイテム) → タイガの初氷 → 高原からの冷風、という流れ。
   */
  asia: [
    /* 0 Apr 草原のチューリップ */ [
      { op: "region-income-multiplier", regionId: region("cas"), multiplier: 1.2 },
    ],
    /* 1 May 暑さの前の隊商 */ [
      { op: "region-income-multiplier", regionId: region("arb"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("cas"), multiplier: 1.1 },
    ],
    /* 2 Jun フェルガナの綿花 */ [
      { op: "region-income-multiplier", regionId: region("cas"), multiplier: 1.3 },
    ],
    /* 3 Jul ベンガル湾のモンスーン */ [
      { op: "region-income-multiplier", regionId: region("sas"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("sea"), multiplier: 0.9 },
    ],
    /* 4 Aug ヒジャーズへの巡礼 */ [
      { op: "region-income-multiplier", regionId: region("arb"), multiplier: 1.3 },
    ],
    /* 5 Sep 環太平洋の台風(休神) */ [
      { op: "region-income-multiplier", regionId: region("eas"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("sea"), multiplier: 0.9 },
      { op: "rest-spirit" },
    ],
    /* 6 Oct オアシスのメロン */ [
      { op: "region-income-multiplier", regionId: region("cas"), multiplier: 1.25 },
    ],
    /* 7 Nov 東アジアの中秋節(帰省ラッシュ) */ [
      { op: "region-income-multiplier", regionId: region("eas"), multiplier: 1.3 },
      { op: "all-players-pay-cash", amount: 200 },
    ],
    /* 8 Dec ヒマラヤ山麓の紅葉(トレッキング最盛期) */ [
      { op: "region-income-multiplier", regionId: region("sas"), multiplier: 1.2 },
    ],
    /* 9 Jan 湾岸の大晦日 */ [{ op: "give-item-to-all" }],
    /* 10 Feb タイガの初氷 */ [
      { op: "region-income-multiplier", regionId: region("sib"), multiplier: 0.75 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 11 Mar 高原からの冷風 */ [
      { op: "region-income-multiplier", regionId: region("sea"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("arb"), multiplier: 1.1 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

既存の `DOOM_EFFECT_ID_BY_LEGACY_ID` オブジェクトの閉じ `};`(1922行目)の直前に追加。
7種の効果(`fine`/`percentLoss`/`skipTurn`/`loseProperties`/`payOthers`/
`teleport`/`steal`)にそれぞれ1件ずつ、物語に合う形で当てた:

```ts
  // Asia
  sandstorm: "fine", // 埋もれた線路の掘り出し費用
  monsoonwash: "loseProperties", // 洗い流された土手ぞいの物件
  avalanche: "teleport", // 雪崩で迂回路に回される
  railbuckle: "percentLoss", // 徐行と積み荷の傷みで目減り
  customsdelay: "skipTurn", // 全部の鞄を検められて足止め
  bazaarpickpocket: "steal", // すりに盗まれる
  powercut: "payOthers", // 立ち往生した車内で食料を分け合う
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(既存の最後の大陸盤面の import の下に追加):

```ts
import { AsiaSandstorm } from "./asia-sandstorm";
import { AsiaMonsoonwash } from "./asia-monsoonwash";
import { AsiaAvalanche } from "./asia-avalanche";
import { AsiaRailbuckle } from "./asia-railbuckle";
import { AsiaCustomsdelay } from "./asia-customsdelay";
import { AsiaBazaarpickpocket } from "./asia-bazaarpickpocket";
import { AsiaPowercut } from "./asia-powercut";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "asia-sandstorm": AsiaSandstorm,
  "asia-monsoonwash": AsiaMonsoonwash,
  "asia-avalanche": AsiaAvalanche,
  "asia-railbuckle": AsiaRailbuckle,
  "asia-customsdelay": AsiaCustomsdelay,
  "asia-bazaarpickpocket": AsiaBazaarpickpocket,
  "asia-powercut": AsiaPowercut,
```

## 補足: `src/presentation/components/setup/country-groups.ts`

確認していません(触らない指示のファイル)。

## 自分で確かめたこと

- `node -e "import('./scripts/countries/asia/index.mjs').then(m => { const c = m.buildAsiaContent(); console.log(Object.keys(c.cities).length, c.edges.length, c.quiz.length, c.moneyEvents.length, Object.keys(c.items).length, c.doom.length, c.seasons.length, Object.keys(c.marks).length, Object.keys(c.bg).length, Object.keys(c.styles).length); })"`
  → `64 68 33 18 9 7 12 45 18 7`。例外なし。
- **4言語の欠け**: 8ファイルすべてを対象に、`t()`に渡す文字列がパイプ
  ちょうど3本(4分割)かを機械的に数えるチェックを自分で書いて流した。
  0件(作業中に計6回、書いた直後に例外で気づいて直したものはすべて反映済み)。
- **陸地判定**: 64都市すべての座標を point-in-polygon で機械確認 → 全て陸地内
  (アターリー/ワガー・ハルディバリ・レド・丹東の4件も含めて確認済み)。
  作業中に6件(ジェッダ・マスカット・ドーハ・マナーマ・下関・コロンボ)が
  海上に出ていた。ドーハはカタール半島の輪郭が無かったため
  `geography.mjs` に半島を描き足し、マナーマはバーレーン島そのものが
  描かれていなかったため新しく描き足した。残り4件は都市座標が海岸線の
  頂点とほぼ同じ値になっていた(誤差レベルの重なりで判定がぶれる)ので、
  座標を少しだけ内陸側にずらした。
- **カスピ海の楕円**: バクー(49.8671,40.4093)・シェキ(47.1706,41.1970)が
  ともに楕円の内側に入っていた指摘を受け、中心を東へ(50.6→51.0)・
  横幅を縮めて(rx105→76)直した。自分でも point-in-ellipse を書いて
  確認し、いまはバクーのみが内側・シェキ/ガンジャ/トビリシは外側に
  なることを機械確認した。
- **路線のgeometry**: `check-sea-routes.mjs` は本番のcontent.jsonを必要とするため
  (生成器を回せない指示のため)実行していない。1回目の海陸判定
  (12本)への対応として以下を直した:
  - カスピ海の楕円を縮小(上記。`baku-sheki`・`tabriz-baku`・
    `baku-tbilisi`の3本が対象と教わった)
  - 端の入れ替え(添字を動かさない直し): `istanbul-tabriz`→
    `tabriz-istanbul`、`danang-hanoi`→`hanoi-danang`、
    `tabriz-tehran`→`tehran-tabriz`、`kanchanaburi-phnompenh`→
    `phnompenh-kanchanaburi`
  - `doha-dubai` を航路(`"sea"`)に変更(この区間に旅客鉄道はまだ無い)
  - `kanchanaburi-malacca`(タイランド湾を横切っていた)を削除。
    malaccaは`malacca-singapore`と`colombo-singapore`(sas経由)で
    引き続き全体と連結していることを確認済み
  - `istanbul-beirut`(地中海東岸、35%海)は直せていない。
    `amman-baghdad`を新たに足して、この1本が直らなくても
    beirut/ammanが孤立しない形にした(冗長な連結)
  - `chittagong-colombo`・`colombo-singapore`は前回`KEPT`候補と
    言われたので変更していない
  - この回の直しは**添字が動く直し(インド3都市・丹東の追加、
    edges配列への追加)と、向きだけの直し(端の入れ替え)を同時に
    行っている。**次の測定で予測どおりの結果にならなかった場合、
    まずこの2種類を切り分けて再測定してほしい
  - 全68本の投影後距離を自分でも計算し、1〜9マスの範囲に収まる
    ことを確認した(9マスに張り付く路線は無し)
- **背景1枚あたりの平均要素数**(`<rect|circle|ellipse|path|line|g>` の
  タグ数で機械計測): 18種・**全て40個以上**(平均42.2)。前回「30個以上」
  としか言えていなかった14種すべてに要素を足して40を超えた
  (最少は複数種で40ちょうど、最多はmodernの60)。`sky()`の
  第3引数と次の全面塗りの開始yが一致しているかを18種すべて読み直し、
  3件の不具合(`harborcity`のground(210,...)が高さ0で無意味だった/
  `ricefield`の水牛の脚が沈んでいた/`hillcity`で存在しない`hills()`を
  呼んでいて実行時エラーだった)を見つけて直した。**この3件はart.mjsを
  引き継いだ別担当が書いたコードに対して見つけたもの**で、node --checkの
  構文チェックだけでは検出できなかった(`hills()`の呼び出しは実際に
  importして実行するまでエラーが出なかった)。
- `mark`(45種)と`bg`(18種)は、64都市から過不足なく参照されている
  ことを機械チェック済み(未使用キー0・不足キー0、両方向とも)。
- アイテム鍵9件(`relay`/`magiccarpet`/`bogie`/`caravanserairest`/
  `silkbolt`/`waybill`/`teabrick`/`sleeperticket`/`firman`)が、指示された
  既存鍵の一覧(約200件)と衝突しないことを機械チェック済み(0件)。
- クイズの答えの位置(`a`)は0/1/2が11問ずつ。当初16/12/5と偏っていたのを、
  6問の選択肢の並びを入れ替えて均等にした。
- 音楽: 7地方すべての`mel`(8小節)が1小節16ステップぴったりで埋まっている
  ことを機械チェック済み(過不足0)。
- 厄災の絵7枚: `npx tsc --noEmit`(プロジェクト全体)を通し、asia関連の
  エラー0件を確認。`npx eslint`も警告0件。viewBox="0 0 400 210"・
  prefers-reduced-motion・`<text>`不使用・`animation:...infinite`・
  aria-hidden・外部URL不参照の6点を7枚すべて機械チェック済み。
  `npm run dev`を立てていないため`npm run shot`での実機スクリーンショット
  確認はできていない(登録側で見てほしい)。

## 質について

- 都市1件あたりの面積: 64都市・BW3040×BH1780=5,411,200px² →
  約84,550px²/都市(目安90kよりやや詰まっている。都市を増やした分)。
- 路線密度: 64都市に対して68本(1都市あたり1.06本)。全体で1つの
  連結成分になっていることを確認済み(istanbulからどの都市へも
  たどり着ける)。
- 物件価格: 最安180〜最高2600、14.4倍の開き(目安12〜17倍に収まる)。

## 迷った点

- **インドを3都市入れた(アターリー/ワガー・ハルディバリ・レド)。**
  当初「切り口が見つからない」として0都市にしたが、team-leadの指摘
  (「探す場所が違う。国境をまたぐ話ならインド盤面には書けない」)を
  受けて、パキスタン国境(サムジャウタ急行)・バングラデシュ国境
  (2020年復活線)・ミャンマー方面(レド公路)の3か所を選んだ。
  いずれもラホール・ダッカ・カンチャナブリと対になる話になっている。
- **中国が4都市の上限を超えて5都市になった(丹東を追加)。**
  北朝鮮との国境を、止まりマスを置かずに書ける場所として妥当と判断し、
  上限超過はこの1件のみであることをここに明記する。
- **総都市数が62〜63の想定より1多い64になった。**インド3都市+丹東の
  4件をすべて採用した結果で、どれも指示された候補をそのまま使っている。
  代わりに周辺国(パキスタン・ネパール・スリランカ・バングラデシュ)から
  インドとの越境鉄道の話を書いた。
- **キプロス・ギルギット・バルティスタン(カシミール係争地の一部)・
  北朝鮮・アフガニスタン・シリア・イエメン・ミャンマーには都市を
  置いていない。**キプロスは南北分断の扱いが複雑で時間内に慎重に
  扱いきれないと判断した。ミャンマーはカンチャナブリの文中でのみ
  史実として触れている。
- **厄災の神を、特定の一国の民話ではなく「大陸を走る鉄道自体の噂」
  (時刻表に無い列車)にした。**35か国にまたがる盤面で一国の民話を
  大陸全体の伝承であるかのように語るのは不誠実だと判断し、世界一周
  盤面の「さまよえるオランダ人」と同じ扱い方(実在の民話類型を、
  一つの文化に帰属させずに引用する)を採った。
- **art.mjsの引き継ぎ**: 通信エラーで一時的に別の担当(europe-board)が
  art.mjsを書いた版に置き換わっていたが、team-leadの判断で「書き直さず、
  中身を読んで質を確認したうえでpaint orderの不具合だけ直して使う」
  ことになった。詳しい経緯はteam-leadとのやり取りを参照。
