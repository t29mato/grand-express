# アメリカ合衆国盤面の登録内容

`scripts/countries/usa/` 8ファイルと `dooms/usa-*.tsx` 7枚は作成済み(前の担当が
`geography.mjs` と5都市ぶんの `cities.mjs` を用意していたところから続けた)。
以下、共有ファイルへ貼り付けるためのコード片。

**追記(登録・焼き込み後の追加分)**: team-leadの指摘を受けて `geography.mjs`
にフロリダキーズを描き足し、`keywest` を48番目の都市として追加した(下記
「追加したキーウェストについて」参照)。**一度登録・焼き込み済みの盤面なので、
この変更を反映するには `node scripts/extract-legacy-content.mjs` の再実行が
必要です。** 都市48・路線59・クイズ50・出来事18(数は変わっていない)。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の `buildItalyContent` の import の下に追加):

```js
import { buildUsaContent } from "./countries/usa/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行:

```js
const AUTHORED_COUNTRIES = [
  buildIndiaContent(),
  buildFranceContent(),
  buildWorldContent(),
  buildIbarakiContent(),
  buildKoreaContent(),
  buildItalyContent(),
  buildUsaContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加:

```js
  // 世界一周と同じ米ドルなので据え置き。$120,000(1200×100)は既に不動産の桁
  // として通る(フランス・世界一周・イタリアと同じ理由)。
  usa: 100,
```

(`CITY_PROPS` への追加は無し。都市の物件価格は `cities.mjs` に直接書き込んである。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  usa: () => import("./usa.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  usa: () => import("../content/usa.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

既存の鍵と衝突しないことを確認済み(`greyhound` `roadatlas` `amtrakcoach`
`acela` `rabbitfoot` `luckypenny` `cribsheet` `lotteryticket` `roadtrip` は
既存112盤面のどれにも無い)。

```ts
  // USA
  greyhound: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  roadatlas: { type: "choose-exact-dice" },
  amtrakcoach: { type: "roll-fixed-dice", diceCount: 2 },
  acela: { type: "roll-fixed-dice", diceCount: 3 },
  rabbitfoot: { type: "none" }, // 厄災の神(グレムリン)のward item(passive)
  luckypenny: { type: "repel-spirit" },
  cribsheet: { type: "quiz-save" },
  lotteryticket: { type: "gain-cash", amount: 380 },
  roadtrip: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `ne`=北東部 / `south`=南部 / `mw`=中西部 / `plains`=大平原・山岳部 /
`sw`=南西部 / `pacific`=太平洋岸。4月始まり。7月(index 3)が休神(独立記念日で
グレムリンも休む)、1月(index 9)が全員アイテム配布(元日のボウルゲーム)。

```ts
  /**
   * アメリカ合衆国。オープニングデー(野球) → ダービーと road trip 開幕 →
   * ルート66の夏 → 独立記念日(7月・休神) → 州フェアと熱波 →
   * 紅葉狩りとレイバーデー → ワールドシリーズ → 感謝祭の帰省ラッシュ →
   * ホリデー商戦とクリスマス市 → 元日のボウルゲーム(1月・給アイテム) →
   * グラウンドホッグ・デーとスーパーボウル → 桜とスプリングトレーニング、
   * という流れ。
   */
  usa: [
    /* 0 Apr オープニングデーと国立公園の再開 */ [
      { op: "region-income-multiplier", regionId: region("mw"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("plains"), multiplier: 1.15 },
    ],
    /* 1 May ケンタッキーダービーとメモリアルデー */ [
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.25 },
      { op: "all-players-gain-cash", amount: 220 },
    ],
    /* 2 Jun ルート66の夏休みロードトリップ */ [
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("pacific"), multiplier: 1.15 },
    ],
    /* 3 Jul 独立記念日(グレムリンも休む) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug 州フェアと熱波ドーム */ [
      { op: "region-income-multiplier", regionId: region("mw"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("plains"), multiplier: 0.75 },
    ],
    /* 5 Sep 紅葉狩りとレイバーデー */ [
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.3 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 6 Oct ワールドシリーズ */ [
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("mw"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.15 },
    ],
    /* 7 Nov 感謝祭の帰省ラッシュ */ [
      { op: "all-players-pay-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.15 },
    ],
    /* 8 Dec ホリデー商戦とクリスマス市 */ [
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("mw"), multiplier: 1.2 },
      { op: "all-players-gain-cash", amount: 200 },
    ],
    /* 9 Jan 元日のボウルゲーム */ [
      { op: "give-item-to-all" },
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.2 },
    ],
    /* 10 Feb グラウンドホッグ・デーとスーパーボウル */ [
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.15 },
      { op: "all-players-gain-cash", amount: 260 },
    ],
    /* 11 Mar 桜とスプリングトレーニング */ [
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.2 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

```ts
  // USA
  speedingticket: "fine",
  tornado: "percentLoss",
  governmentshutdown: "skipTurn",
  wildfire: "loseProperties",
  pickuptab: "payOthers",
  wrongexit: "teleport",
  threecardmonte: "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(アルファベット順、`UkXxx` と次の国のあいだ):

```ts
import { UsaGovernmentshutdown } from "./usa-governmentshutdown";
import { UsaPickuptab } from "./usa-pickuptab";
import { UsaSpeedingticket } from "./usa-speedingticket";
import { UsaThreecardmonte } from "./usa-threecardmonte";
import { UsaTornado } from "./usa-tornado";
import { UsaWildfire } from "./usa-wildfire";
import { UsaWrongexit } from "./usa-wrongexit";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "usa-governmentshutdown": UsaGovernmentshutdown,
  "usa-pickuptab": UsaPickuptab,
  "usa-speedingticket": UsaSpeedingticket,
  "usa-threecardmonte": UsaThreecardmonte,
  "usa-tornado": UsaTornado,
  "usa-wildfire": UsaWildfire,
  "usa-wrongexit": UsaWrongexit,
```

## 補足: `src/presentation/components/setup/country-groups.ts`

未確認。他の国(イタリア)の前例では `europe` 束に既に登録されていたとの
記載があったので、`usa` も北米の束(`americas` のような名前があれば)に
入っているか確認してほしい。無ければ1行追加が必要。**このファイルには
触っていない。**

## 自分で確かめたこと

- `node -e 'import("./scripts/countries/usa/index.mjs").then(m => { const c = m.buildUsaContent(); console.log(Object.keys(c.cities).length, c.edges.length, c.quiz.length, c.moneyEvents.length, Object.keys(c.items).length, c.doom.length, c.seasons.length); })'`
  → `48 59 50 18 9 7 12`(都市48・路線59・クイズ50・出来事18・アイテム9・
  厄災7・季節12。キーウェスト追加後の数)。例外なし(`buildUsaContent()` は
  全 `t()` 呼び出しを通すため、4言語のどれか1件でも欠けていればここで落ちる)。
- **4言語の欠け**: `cities.mjs` / `flavour.mjs` / `quiz.mjs` / `money-events.mjs`
  の4ファイルを対象に、「`"`で始まり`|`を含む行のパイプ数が3本か」を機械的に
  数えるチェックを自作して流した。**欠け0件**(韓国33件・イタリア29件が
  出た同じ検査)。加えてCJK混入チェック(en/es/fr枠に日本語が紛れていないか、
  ja枠に日本語が入っているか)も流し、実害のある混入は0件(数字・略号
  だけの選択肢5件を誤検知したが、目視で問題なしと判断)。
- **座標**: 48都市すべてが `USA_LAND`(本土ポリゴン)の内側にあることを
  自作の点-in-多角形チェックで確認(境界まで最低8.8px)。サンディエゴは
  海岸線の単純化に押し出されたため、実際のダウンタウンよりやや北寄りの
  座標に調整してある(下記「迷った点」参照)。キーウェストは実際の経緯度
  (-81.80, 24.56)のまま、`geography.mjs` にフロリダキーズを描き足して
  対応した(下記「追加したキーウェストについて」参照)。
- **路線**: `seg=130`(前の担当が仮置きしていた値)で59本を実測し、
  最長5マス・9マス超0本・**8割が1〜3マス**であることを確認(自作スクリプト)。
  connectivity(全都市が1つの連結成分)も確認済み。miami–keywest は
  配列の**末尾に追加**した(途中挿入すると `edgeIndex % 2` が変わり、
  無関係な路線の折れ方まで変わってしまうため)。
- **海陸判定**: `check-sea-routes.mjs` と同じロジック(軸沿い+45度の折れ線を
  600点サンプリングして陸/海の比率を見る)を自作して59本すべてを検査し、
  60px超の食い違い0本。savannah–miami は当初321px海にはみ出したため、
  savannah–atlanta–tampa–miami の迂回に差し替えて解消した。miami–keywest
  は29px(全長108pxの27%)海の上を通るが、実際にフラグラーの鉄道も
  橋の連なりで海を渡っていたので妥当と判断し、そのまま残した。
- **背景の塗り残し**: 全36背景をマゼンタ台紙の上で `rsvg-convert` により
  PNG化し、自作のPNGデコーダ(node組み込みzlibでIDATを展開)でマゼンタ
  画素を数える検査を流した。**1周目で27背景に塗り残しがあり**(`sky()`の
  第3引数が、そのあとに来る `ground()`/`band()` の実際の開始yと揃って
  いなかった)、全て `sky()` の第3引数を実際の開始yに合わせて修正、
  1件(`goldengate`)は `ground()` の呼び出し自体が抜けていたので追加。
  **修正後は36背景すべてで塗り残し0px。**
- **アイテム9件の鍵**: 衝突禁止語リストと突き合わせ、衝突0件。
- **使わない関数**: 生成直後は無かったが、`art.mjs` に追加した
  `lineTexture` は現在も全背景で使用中(未使用なし)。

## 質について

- 背景1枚あたりの平均要素数(`<rect|circle|ellipse|path|line|polygon|polyline>`
  のタグ数で機械計測): **36種・平均44.3個**(目安40を上回る。最少は
  musicrowの35、最多はsanfrancisco系のgoldengate〜60台)。1周目は平均22.5
  しかなく(韓国の27よりさらに薄い)、`speckle()` / `lineTexture()` /
  `windowGrid()` の呼び出しを地方ごとの題材(砂利・雪片・水面のきらめき・
  星・窓明かり)に合わせて足して底上げした。
- `mark`(41種、都市アイコン。キーウェストの `railbridge` を追加)と
  `bg`(36種、背景。キーウェストは `tropicdeco` をマイアミ・タンパと共有)は、
  48都市から過不足なく参照されていることを機械チェック済み
  (未使用キー0・不足キー0、両方向とも)。

## クイズについて

`check-quiz.mjs` 相当の簡易チェック(答えの語がカードに載っているか)を
自分で書いて流した結果、以下の1件は判断が必要と考えたが、韓国・イタリアの
`ACCEPTED`/`ACCEPTED_LEAKS` と同じ理由で許容できると判断した。

- 「20世紀初頭のジャズ発祥の地とされる都市は? → ニューオーリンズ」が、
  ニューオーリンズの都市カード(「ジャズへとつながるリズムが生き延び
  混ざり合った場所のひとつ」という一文)と部分的に重なる。ただしこれは
  難易度4の常識問題で、カードが教えているのはコンゴ・スクエアでの
  奴隷制下の集会という具体史であって、「ジャズ発祥の地」という単純な
  事実そのものではない。

正解の位置は 0=16 / 1=16 / 2=18(50問)でほぼ均等。1周目は 0=24/1=23/2=3と
大きく偏っていたため、選択肢の並びを入れ替えて揃え直した(内容は変えず、
配列の順序だけを変更)。

## 追加したキーウェストについて

team-leadの指摘(フラグラーのオーバーシーズ鉄道は、この盤面にとって特上の
題材で、タンパへの差し替えでは惜しい)を受け、`geography.mjs` の本土輪郭に
フロリダキーズを描き足し、キーウェストを48番目の都市として実際の経緯度の
まま追加した。**タンパは差し替えず、そのまま残してある**(両方入れる余地が
あるという指摘のとおり)。

- **海岸線の描き方**: 実在の諸島(キーラーゴ〜キーウェスト)を1本の細長い
  岬として単純化した(個々の島は描いていない)。往路(大西洋側)で先端まで
  行き、復路(フロリダ湾側)で戻る形の閉じた輪にして、既存の「フロリダ
  キーズの付け根」の頂点1つだけを共有させた(元の「キーウェスト」の
  頂点1つを削り、往復18頂点に置き換えた)。
- **緯度の下限を超えることについて**: `USA_PROJ` の `LAT1`(緯度の下限)は
  24.5度だが、岬の南側の縁は最大24.14度まで沈む。**これは意図的で、
  問題ない**——盤面からはみ出した陸地はただ画面外になるだけで、都市
  マーカー自体(キーウェスト、緯度24.56度)は盤面下端まで約3px・
  海岸線まで約23pxの余裕がある。`LAT1` そのものを動かす案(緯度の余裕を
  広げる)も検討したが、それをやると本土全体のy座標が約1.6%再スケール
  され、既存47都市・地形・河川・ラベル・装飾すべての再検証が要る
  大きな変更になるため、**やらなかった**。
- **確認したこと**: キーウェストの陸地内マージンを自作の点-in-多角形
  チェックで22.8px(基準の15px超)と確認。既存47都市が新しい海岸線でも
  全て陸地内にあることを再確認(0件の後退)。マゼンタ台紙と同じ発想で、
  本土全体と拡大したフロリダキーズ周辺を実際の投影で `rsvg-convert` に
  よりPNG化し、自己交差や不自然な形になっていないか目視で確認した。
- **物件・アイテムキー**: `railbridge`(新規マーク)は既存の鍵と衝突なし。
  物件2件(オーバーシーズ鉄道の橋脚650/135、デュバル・ストリートの
  夕日桟橋320/66)。

## 迷った点

- **サンディエゴの座標**: 実際のダウンタウン(-117.16, 32.72)は国境近くの
  海岸線単純化で境界まで8.8pxしかなく、9.9px基準に届かなかった。北へ
  0.08度(約5km、ラホヤ寄り)動かして15px以上を確保した。
- **通貨倍率の根拠**: 世界一周・フランス・イタリアが据え置きだった理由
  (「$120,000は既に不動産の桁」)をそのままアメリカにも適用した。
- **路線の密度**: 48都市に対して59本(1都市あたり1.23本)。イタリア
  (45都市59本、1.31本)よりやや疎ら。単一路線しかない都市が8
  (ポートランドメイン・バッファロー・タンパ・コディ・ボーズマン・
  ビスマーク・グランドキャニオン・キーウェスト)あるが、いずれも実際に
  鉄道網がスカスカな半島の先・大平原・国立公園の町・離島同然の観光地で、
  地理的に無理のない範囲だと判断した。全体としては1つの連結成分に
  なっていることを確認済み。
- **地理を割り切った点**: 48都市中47都市は実在の経緯度をそのまま(または
  サンディエゴのみ最小限ずらして)使っている。キーウェストは経緯度を
  動かさず、海岸線側を描き足して対応した。アラスカ・ハワイは
  `geography.mjs` の設計時点で意図的に除外されており、この2州の都市は
  盤面に含めていない(世界一周がホノルルを扱っている)。
- **国立公園の「都市」扱い**: グランドキャニオン・ビレッジとモニュメント
  バレーは行政上の「町」ではないが、既存5都市の時点でモニュメント
  バレーが採用されていたため、同じ扱いで踏襲した。
