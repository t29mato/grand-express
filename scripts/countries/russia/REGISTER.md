# ロシア盤面の登録内容

`scripts/countries/russia/` 8ファイルと `dooms/russia-*.tsx` 7枚は作成済み。
前の担当が「都市40件・地理・路線ゼロ」まで進めていたところから引き継ぎ、
ノリリスクの中身(プレースホルダのまま止まっていた)を書き、極東8都市
(ハバロフスク・ウラジオストク・ブラゴヴェシチェンスク・ヤクーツク・
マガダン・ペトロパブロフスク・カムチャツキー・ユジノサハリンスク・
ビロビジャン)を追加して48都市にし、路線50本・残り6ファイル・厄災の絵7枚を
新たに書いた。以下、共有ファイルへ貼り付けるためのコード片。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の `buildChinaContent` の import の下に追加):

```js
import { buildRussiaContent } from "./countries/russia/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行(既存の配列に1行足すだけ):

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
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加(既存の `china: 500,` の下):

```js
  // ₽1,200 → ₽7,080,000。1ルーブル≒1.7円(2026年8月時点の目安相場)とすると
  // 12,000,000÷1.7≒7,058,824円相当になり、それを開始資金1200で割った5882.35を
  // きりのよい5900に丸めた。日本(¥12,000,000)の実質+0.3%に収まる、
  // 全盤面中もっとも日本に近い倍率になった。ルーブルは変動が激しいため、
  // この相場と時期を根拠として明記しておく。次にこの盤面を触る人は、
  // 相場が大きく動いていたらここを見直してほしい。
  russia: 5900,
```

(`CITY_PROPS` への追加は無し。韓国・イタリアと同じく、都市の物件価格は
`cities.mjs` に直接書き込んであり、上書きテーブルは不要。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  russia: () => import("./russia.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  russia: () =>
    import("../content/russia.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

**鍵の衝突なしを確認済み**(下記「自分で確かめたこと」参照)。

```ts
  // Russia
  troika: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  raspisanie: { type: "choose-exact-dice" },
  platskart: { type: "roll-fixed-dice", diceCount: 2 },
  sapsan: { type: "roll-fixed-dice", diceCount: 3 },
  khlebsol: { type: "none" }, // 厄災の神(ドモヴォイ)のward item(passive)
  sol: { type: "repel-spirit" },
  shpargalka: { type: "quiz-save" },
  gosloto: { type: "gain-cash", amount: 380 },
  blat: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `tsn`=中央 / `szp`=北西 / `yug`=南部・カフカス / `vlg`=ヴォルガ・ウラル /
`sib`=シベリア / `dv`=極東。4月始まり。8月(index 4)が休神、
1月(index 9)が全員アイテム配布(新年・ジェド・マロース)。

既存の `SEASON_EFFECTS_BY_COUNTRY` オブジェクトの閉じ `};` の直前に、
イタリアの項の後ろへ足す形で追加:

```ts
  /**
   * ロシア。ラスプーチツァ(4月・雪解けの泥濘) → 戦勝記念日 →
   * 白夜のサンクトペテルブルク → ヴォルガの遊覧船とダーチャの夏 →
   * ダーチャの収穫(8月・休神) → きのこ狩りと新学期 → 黄金の秋 →
   * 初雪と民族統一の日 → 新年準備 → 新年とジェド・マロース(1月・給アイテム) →
   * 冬将軍 → マースレニツァとバイカルの氷、という流れ。
   */
  russia: [
    /* 0 Apr ラスプーチツァ(泥濘の季節) */ [
      { op: "region-income-multiplier", regionId: region("yug"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("vlg"), multiplier: 0.85 },
    ],
    /* 1 May 戦勝記念日 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("yug"), multiplier: 1.15 },
    ],
    /* 2 Jun 白夜とロシアの日 */ [
      { op: "region-income-multiplier", regionId: region("szp"), multiplier: 1.35 },
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("dv"), multiplier: 1.2 },
    ],
    /* 3 Jul ヴォルガの遊覧船とダーチャの夏 */ [
      { op: "region-income-multiplier", regionId: region("vlg"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 1.15 },
    ],
    /* 4 Aug ダーチャの収穫(街が空になる) */ [
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("yug"), multiplier: 1.3 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep きのこ狩りと新学期 */ [
      { op: "region-income-multiplier", regionId: region("sib"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("dv"), multiplier: 1.15 },
    ],
    /* 6 Oct 黄金の秋 */ [
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("szp"), multiplier: 1.15 },
    ],
    /* 7 Nov 初雪と民族統一の日 */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("dv"), multiplier: 1.15 },
    ],
    /* 8 Dec 新年準備の市 */ [
      { op: "all-players-pay-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("szp"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 1.2 },
    ],
    /* 9 Jan 新年とジェド・マロース */ [{ op: "give-item-to-all" }],
    /* 10 Feb 冬将軍 */ [
      { op: "all-players-pay-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("sib"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("vlg"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("yug"), multiplier: 0.85 },
    ],
    /* 11 Mar マースレニツァとバイカルの氷 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("sib"), multiplier: 1.3 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

既存の `DOOM_EFFECT_ID_BY_LEGACY_ID` オブジェクトの閉じ `};` の直前
(イタリアの項の後ろ)に追加:

```ts
  // Russia
  gibdd: "fine",
  obmennik: "percentLoss",
  ochered: "skipTurn",
  buran: "loseProperties",
  zastolye: "payOthers",
  "ne-tot-poyezd": "teleport",
  karmannik: "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(既存の `ItalyTrenoSbagliato` の import の下に追加。他国の並びと同じく
時系列で末尾へ足す形):

```ts
import { RussiaGibdd } from "./russia-gibdd";
import { RussiaObmennik } from "./russia-obmennik";
import { RussiaOchered } from "./russia-ochered";
import { RussiaBuran } from "./russia-buran";
import { RussiaZastolye } from "./russia-zastolye";
import { RussiaNeTotPoyezd } from "./russia-ne-tot-poyezd";
import { RussiaKarmannik } from "./russia-karmannik";
```

`DOOM_ANIMATIONS` への追加行(`italy-treno-sbagliato` の下に追加):

```ts
  "russia-gibdd": RussiaGibdd,
  "russia-obmennik": RussiaObmennik,
  "russia-ochered": RussiaOchered,
  "russia-buran": RussiaBuran,
  "russia-zastolye": RussiaZastolye,
  "russia-ne-tot-poyezd": RussiaNeTotPoyezd,
  "russia-karmannik": RussiaKarmannik,
```

## 補足: `src/presentation/components/setup/country-groups.ts`

確認していません(触らない指示のファイルで、europe/asia のどちらの束に
入れるかは地理的にも判断が割れる国なので、取りまとめ側で決めてください)。

## 自分で確かめたこと

- `node -e "import('./scripts/countries/russia/index.mjs').then(m => { const c = m.buildRussiaContent(); console.log(Object.keys(c.cities).length, c.edges.length, c.quiz.length, c.moneyEvents.length, Object.keys(c.items).length, c.doom.length, c.seasons.length, Object.keys(c.marks).length, Object.keys(c.bg).length, Object.keys(c.styles).length); })"`
  → `48 50 36 22 9 7 12 21 17 6`(都市48・路線50・クイズ36・出来事22・
  アイテム9・厄災7・季節12・mark21種・bg17種・音楽スタイル6地方)。例外なし。
- 4言語の欠け: 8ファイルすべてを対象に「`t()`が呼ばれる文字列リテラルのうち
  `|`を含むものが、パイプちょうど3本(4分割)か」を機械的に数える簡易
  チェックを自分で書いて流した。作業中に計3件見つけて直した
  (ビロビジャンの都市カード`tag`の日本語欠落1件は目視で気づいて先に直し、
  `money-events.mjs`の`samovar-pochinka`と`metro-kiosk-podmoga`の`title`の
  日本語欠落2件は`buildRussiaContent()`が実際に例外で落ちたところから
  正規表現の簡易チェックで特定して直した)。`city-helpers.mjs`/各ファイル
  自前の`t()`は1件でも欠けがあれば例外で落ちるため、`buildRussiaContent()`
  自体が通ることでも二重に確認できる。
  再チェックで残る「疑わしい」パターンは全ファイル合計4件あるが、
  すべて`source.split("|")`という`t()`ヘルパー自身のコード(内容ではない)
  であることを確認済み(誤検知)。
- 路線の geometry: `check-sea-routes.mjs`は本番のcontent.jsonを必要とするため
  (生成器を回せない指示のため)実行していない。代わりに、投影後距離を
  自分でも計算し、最長辺(イルクーツク⇄ヤクーツク731px・5マス、
  ウランウデ⇄ハバロフスク667px・4マス、クラスノヤルスク⇄ノリリスク577px・
  4マス)を含め全50本が1〜9マスの範囲に収まることを確認した(最大5マス)。
  以下の4本は**実在の鉄道網の単純化**であることをここに明記する
  (登録側で`check-sea-routes.mjs`を回したら、この説明を踏まえて判断してほしい):
  - `krasnoyarsk-norilsk`: ノリリスクは本土の鉄道網と繋がっていない
    (ドゥディンカ港までの短い専用線のみ)。エニセイ川の砕氷船護衛の
    川船を、便宜上ふつうの路線として描いた。
  - `irkutsk-yakutsk` / `yakutsk-magadan`: ヤクーツクも同様に鉄道が届かない。
    アムール・ヤクーツク鉄道(バイカル・アムール鉄道からタイシェット近くで
    分岐)とコルィマ街道(通称「骨の道」)の代わりに、盤面にある最寄りの
    都市から通常の路線として結んだ。
  - `magadan-petropavlovsk`(`"sea"`)・`vladivostok-yuzhnosakhalinsk`(`"sea"`):
    どちらも実在の海路・鉄道連絡船(ヴァニノ⇔ホルムスク)の代わりに、
    盤面にある最寄りの港町を発着地にした。
- 背景1枚あたりの平均要素数(`<rect|circle|ellipse|path|line|polygon|polyline>`
  のタグ数で機械計測): **17種・平均41.4個**(目安40を上回る。最少は
  caspianの31、最多はcapitalの61)。`sky()`の第3引数と次の全面塗りの
  開始yが一致しているかを17種すべてで機械チェックし、当初2件
  (fortress・urals)で10pxの塗り残しを検出して修正、再チェックで0件。
  `rsvg-convert`でマゼンタ台紙の上に全17枚・mark21種をPNG化して目視確認済み
  (透ける帯なし、mark21種はすべて意図した絵に見える)。
- `mark`(21種、都市アイコン)と`bg`(17種、背景)はキー集合が別であることを
  前提に設計しており、両方とも`cities.mjs`の48都市から過不足なく参照されている
  ことを機械チェック済み(未使用キー0・不足キー0、両方向とも)。
- アイテム鍵9件(`troika`/`raspisanie`/`platskart`/`sapsan`/`khlebsol`/`sol`/
  `shpargalka`/`gosloto`/`blat`)が、指示された既存鍵の一覧と衝突しないことを
  機械チェック済み(0件)。
- クイズの答えの位置(`a`)は0/1/2が12問ずつ。作成時に1問(欧州最長の川)で
  選択肢に答えと同じ語を重複させる書き間違いをしたが、機械チェックには
  引っかからず、自分で読み返して見つけて直した(選択肢重複はどのチェックも
  検出しないので、次にクイズを書く人は選択肢どうしの重複も目視した方がよい)。
- 音楽: 6地方すべての`mel`(8小節)が1小節16ステップぴったりで埋まっている
  ことを機械チェック済み(過不足0)。
- 厄災の絵7枚: `tsc --noEmit`(DOM libを付けた最小構成で7ファイルだけを対象に)
  を流して構文・型エラー0件を確認。文字要素(`<text>`や字を象ったパス)は
  使っていない。`npm run dev`を立てていないため`npm run shot`での実機
  スクリーンショット確認はできていない(登録側で見てほしい)。

## 質について

- 都市1件あたりの面積: 48都市・BW3630×BH1190=4,319,700px² →
  約90,000px²/都市。ガイドの目安どおり。
- 路線密度: 48都市に対して50本(1都市あたり1.04本)。イタリア(45都市59本・
  1.31本)より疎ら。ロシアは実際の鉄道網そのものが広大な国土に対して薄いため、
  地理的に無理のない範囲だと判断した。全体で1つの連結成分になっていることを
  確認済み(モスクワからどの町へもたどり着ける)。

## 迷った点

- **通貨倍率の根拠**: 「1ルーブル≒1.7円」という前担当への指示にあった相場を
  そのまま使い、日本(¥12,000,000)に対して+0.3%というほぼ完全な一致に丸めた。
  ルーブルは変動が非常に激しい通貨なので、根拠にした相場と時期をコード内の
  コメントに明記してある(指示どおり)。
- **ウクライナ侵攻・クリミアに触れない**という制約は、都市選定(クリミア半島の
  都市を含めない)・厄災(戦争関連のイベントを作らない)・季節(戦勝記念日は
  1945年の大祖国戦争終結を指す historical な祝日として書き、現在の紛争には
  一切言及しない)のすべてで意識した。マガダンの都市カードでグラーグ
  (強制収容所)の歴史には触れているが、これは前担当のノリリスク・サマラの
  項目でも既に踏襲されている書き方(史実としての強制労働に触れるが、
  現在の政治には立ち入らない)に合わせたもの。
- **ヤクーツク・マガダン・ペトロパブロフスク・カムチャツキー・
  ユジノサハリンスクの4都市は、本土の鉄道網と実際にはつながっていない。**
  この事実そのものを豆知識(fact)の中で明示的に書くことで、路線図の
  単純化(通常の路線として描いた区間)が「地理を知らずに描いた誤り」では
  なく「知った上での簡略化」だと分かるようにした。
- **極東の8都市の選定**: 実在の都市の中から、シベリア鉄道の終点
  (ハバロフスク・ウラジオストク)、BAM沿線・河川都市(ブラゴヴェシチェンスク)、
  永久凍土(ヤクーツク)、グラーグの記憶(マガダン)、火山(ペトロパブロフスク・
  カムチャツキー)、日本領だった歴史(ユジノサハリンスク)、
  ソ連期の少数民族政策(ビロビジャン)と、それぞれ異なる角度の話を持つ町を
  選んだ。コムソモリスク・ナ・アムーレ(BAMの主要都市)は割愛した
  (極東8都市の枠の中で、既にブラゴヴェシチェンスクとハバロフスクが
  アムール川沿いの町を担っていたため)。
