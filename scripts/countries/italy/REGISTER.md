# イタリア盤面の登録内容

`scripts/countries/italy/` 8ファイルと `dooms/italy-*.tsx` 7枚は作成済み。
以下、共有ファイルへ貼り付けるためのコード片。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の `buildKoreaContent` の import の下に追加):

```js
import { buildItalyContent } from "./countries/italy/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行(既存の配列に1行足すだけ):

```js
const AUTHORED_COUNTRIES = [
  buildIndiaContent(),
  buildFranceContent(),
  buildWorldContent(),
  buildIbarakiContent(),
  buildKoreaContent(),
  buildItalyContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加:

```js
  // フランスと同じ通貨(ユーロ)なので据え置き。€120,000(1200×100)は
  // 1ユーロ≒160円で換算すると約1,920万円になり、日本(×10000で¥12,000,000)の
  // 1.6倍に収まる。既存の「為替1.8倍以内」の基準を満たすため、フランス・
  // 世界一周と同じ理由でここも据え置きが妥当と判断した。
  italy: 100,
```

（`CITY_PROPS` への追加は無し。韓国と同じく、都市の物件価格は `cities.mjs` に直接
書き込んであり、上書きテーブルは不要。）

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  italy: () => import("./italy.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  italy: () => import("../content/italy.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

```ts
  // Italy
  vespa: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  orario: { type: "choose-exact-dice" },
  intercity: { type: "roll-fixed-dice", diceCount: 2 },
  frecciarossa: { type: "roll-fixed-dice", diceCount: 3 },
  cornicello: { type: "none" }, // 厄災の神(モナチェッロ)のward item(passive)
  malocchio: { type: "repel-spirit" },
  bigino: { type: "quiz-save" },
  lotteria: { type: "gain-cash", amount: 380 },
  raccomandazione: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `nov`=北西 / `nes`=北東 / `cen`=中部 / `sud`=南部 / `sic`=シチリア / `sar`=サルデーニャ。
4月始まり。8月(index 4)が休神、1月(index 9)が全員アイテム配布(エピファニア/ベファーナ)。

```ts
  /**
   * イタリア。復活祭とオリーブの春 → 開いたワイナリーと避暑 →
   * フェラゴスト(8月・休神) → 収穫とヴェネツィアのレガータ → トリュフの秋 →
   * 万霊節 → クリスマス市とプレゼーペ → エピファニア(1月・給アイテム) →
   * カーニバル → アーモンドの花咲くシチリアの春、という流れ。
   */
  italy: [
    /* 0 Apr 復活祭とオリーブの開花 */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.15 },
    ],
    /* 1 May カンティーネ・アペルテ(開かれた酒蔵) */ [
      { op: "region-income-multiplier", regionId: region("nov"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
    ],
    /* 2 Jun 海開きと共和国記念日 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sar"), multiplier: 1.15 },
    ],
    /* 3 Jul パリオと真夏の観光 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("sic"), multiplier: 1.2 },
    ],
    /* 4 Aug フェラゴスト(街が空になる) */ [
      { op: "region-income-multiplier", regionId: region("nov"), multiplier: 0.7 },
      { op: "region-income-multiplier", regionId: region("sar"), multiplier: 1.3 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep ヴェンデンミアとレガータ・ストーリカ */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("nes"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
    ],
    /* 6 Oct 白トリュフと新しいオリーブオイル */ [
      { op: "region-income-multiplier", regionId: region("nov"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.15 },
    ],
    /* 7 Nov 万霊節と今年最後のオリーブ */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.2 },
    ],
    /* 8 Dec クリスマス市とプレゼーペ */ [
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("nes"), multiplier: 1.15 },
    ],
    /* 9 Jan エピファニアとベファーナ */ [{ op: "give-item-to-all" }],
    /* 10 Feb カーニバルの仮面 */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("nes"), multiplier: 1.35 },
    ],
    /* 11 Mar アーモンドの花とシチリアの早春 */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("sic"), multiplier: 1.3 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

```ts
  // Italy
  autovelox: "fine",
  grandinata: "percentLoss",
  sciopero: "skipTurn",
  incendio: "loseProperties",
  morra: "payOthers",
  "treno-sbagliato": "teleport",
  scippo: "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(アルファベット順、`IbarakiXxx` と `IndiaXxx` のあいだ):

```ts
import { ItalyAutovelox } from "./italy-autovelox";
import { ItalyGrandinata } from "./italy-grandinata";
import { ItalyIncendio } from "./italy-incendio";
import { ItalyMorra } from "./italy-morra";
import { ItalyScippo } from "./italy-scippo";
import { ItalySciopero } from "./italy-sciopero";
import { ItalyTrenoSbagliato } from "./italy-treno-sbagliato";
```

`DOOM_ANIMATIONS` への追加行(`ibaraki-*` と `japan-*` のあいだ):

```ts
  "italy-autovelox": ItalyAutovelox,
  "italy-grandinata": ItalyGrandinata,
  "italy-incendio": ItalyIncendio,
  "italy-morra": ItalyMorra,
  "italy-scippo": ItalyScippo,
  "italy-sciopero": ItalySciopero,
  "italy-treno-sbagliato": ItalyTrenoSbagliato,
```

## 補足: `src/presentation/components/setup/country-groups.ts` は変更不要

`europe` 束の `countryIds` に `"italy"` がすでに含まれていました(他の担当が先に
用意していたようです)。触っていません。

## 自分で確かめたこと

*下記は team-lead 指摘の3点(アルベロベッロの伝説化・都市カードの1話1事実・
背景27種の絞り込み)を直したあとの、最終状態での確認結果です。*

- `node -e 'import("./scripts/countries/italy/index.mjs").then(m => { const c = m.buildItalyContent(); console.log(Object.keys(c.cities).length, c.edges.length, c.quiz.length, c.moneyEvents.length); })'`
  → `45 59 53 21`(都市45・路線59・クイズ53・出来事21)。例外なし。
- 4言語の欠け: 全8ファイルを対象に「`"`で始まり`|`を含む行のパイプ数が3本か」を
  機械的に数える簡易チェックを流し、cities.mjs / quiz.mjs / money-events.mjs で
  計29件の欠け(タグ・タイトル行で日本語だけ書き漏らしていた)を発見して修正。
  今回の修正作業中にも追加で1件(ナポリの`fact`を書き換える際に自分で作った
  一時的な欠け)を作ってその場で直した。再チェックで全ファイル0件。加えて
  `buildItalyContent()` 自体が全 `t()` 呼び出しを通すため、1件でも欠けがあれば
  例外で落ちる(実際、作業中に2回ここで落ちて気づけた)。
- 英字/和文の混入チェック(cities/quiz/money-events/items/doom/seasons)を機械的に
  実施し、問題なし(CJK文字が入るべき`ja`枠に入っているか/入るべきでない
  `en`・`es`・`fr`枠に入っていないかを全フィールドで確認。数字・略号だけの
  選択肢による誤検知3件は目視で問題なしと判断)。
- `sky()` の第3引数: 19背景すべてで「次に来る全面塗り(`ground`/`band`/全幅rect)の
  開始yと、`sky` の第3引数が一致しているか」を機械チェックし、問題なし
  (27→19への絞り込み時に該当箇所も含めて作り直したため)。`rsvg-convert` で
  マゼンタ台紙の上に全19枚をPNG化して目視確認済み(透ける帯なし)。この過程で
  `cliffhouses` に実害のある塗り残し(崖の曲線がx=240で止まり、浜の曲線が
  y=208で止まっていた)を発見し、`ground()` の安全地を1枚敷いて修正。
- 都市カードの1話1事実チェック: 全45都市の`fact`英語文を並べて読み、「別々の話が
  2つ」パターンをアオスタ・コモ・ヴェローナ・ボローニャ・ラヴェンナ・ソレント・
  レッチェ・ラクイラ・シラクーサ・カリアリ・オルビア・ヌオーロ・タオルミーナ・
  ペルージャ・オルヴィエート・ナポリ・バーリ・トロペア・レッジョカラブリア・
  チェファルの20件で検出し、1話に絞って修正(元の指摘対象だったローマ・
  ヴェネツィア・ミラノ・ジェノヴァ・パドヴァ・トリエステ・ボルツァーノ・
  フィレンツェの8件は前段階で修正済み)。**修正後に`tag`(短い見出し)が
  古い方の話を指したまま残っていないかも再確認し、ヌオーロ・ボルツァーノ・
  トロペアの3件で`tag`が切り落とした側の話を指したままだったのを発見して
  修正した**(`fact`だけ直して`tag`を直し忘れる、という別種の見落としがあった)。
- クイズと都市カードの重なりチェック: `check-quiz.mjs`と同じロジック(答えの
  語がカードに載っているか、かつ問い文の特徴語もそのカードに載っているか)を
  自分で書いて流した。1件は判断が必要(下記参照)。正解の位置は
  0=18 / 1=18 / 2=17(53問)でほぼ均等。

## 質について

- 背景1枚あたりの平均要素数(`<rect|circle|ellipse|path|line|polygon|polyline>`
  のタグ数で機械計測): **19種・平均52.2個**(目安40を上回る。最少は
  factory/bayの44、最多はcountrysideの68)。韓国の16種・平均27個より、
  種類を絞りつつ1枚あたりの密度は大きく厚くした。
- `mark`(27種、都市アイコン)と`bg`(19種、背景)はキー集合が別であることを
  前提に設計しており、両方とも `cities.mjs` の45都市から過不足なく参照されている
  ことを機械チェック済み(未使用キー0・不足キー0、両方向とも)。

## クイズの判断が必要な1件

`check-quiz.mjs` 相当の簡易チェック(答えの漏れ・言語混入)を自分で書いて流した
結果、以下の1件が引っかかったが、韓国盤面の `ACCEPTED`/`ACCEPTED_LEAKS` と同じ
理由で許容できると判断した。本番の `check-quiz.mjs` で `italy` を対象に流すと
同じ1件が出るはずなので、必要なら `ACCEPTED` 系の配列に追記してください。

- 「教皇が治める小さな独立国で、サン・ピエトロ大聖堂があるのは? → バチカン市国」が、
  ミラノのカード(「バチカン市国を除けばイタリア最大の教会」という比較の一文)と、
  「大聖堂」という語で一致する。ただしこれは常識で答えられる難易度2の問題で、
  ミラノのカードが教えているのはミラノ大聖堂の完成史であって、サン・ピエトロが
  バチカンにあることそのものではない(韓国盤面の `world:アフリカ`/`world:エチオピア`
  の例外と同じ性質)。

  (前回の版で挙げていた「アオスタの二言語表記」の例外は、1話1事実の修正で
  アオスタのカードから二言語表記の話そのものを削ったため、もう存在しない。)

## 迷った点

- **通貨倍率の根拠**: フランス・世界一周が据え置きだった理由(「€120,000は
  既に不動産の桁」)をそのままイタリアにも適用した。ユーロ圏の国が増えるなら
  同じ倍率で揃うはず。
- **路線の密度**: 45都市に対して59本(1都市あたり1.31本)。韓国(40都市55本、
  1.375本)よりわずかに疎ら。単一路線しかない都市が10(アオスタ・コモ・
  トリエステ・ボルツァーノ・サンジミニャーノ・アッシジ・ポジターノ・マテーラ・
  ラクイラ・シラクーサ・ヌオーロ・バルーミニ)あるが、いずれも実際の鉄道網が
  スカスカな山間部・内陸部・小島の町で、地理的に無理のない範囲だと判断した
  (ラクイラは実際に鉄道の便が乏しいことを豆知識でも触れている)。
  全体としては1つの連結成分になっていることを確認済み(どの町からもどの町へも
  たどり着ける)。
- **アルベロベッロとマテーラの間**に `alberobello-lecce` と `matera-alberobello`
  を補助線として足し、南部(11都市)の中で三角形の周回ルートができるようにした。
  南部と島を薄くしないという指示を、路線の選択肢の多さでも支えたかったため。
- **アルベロベッロの伝説化**: 「税吏が来ると屋根を崩せるようにした」という話を、
  「地元ガイドが繰り返す言い伝えだが、裏付ける記録は残っていない」という体裁に
  書き直した。トゥルッリが無漆喰の乾式石積みであること自体は事実として断定し、
  税逃れの逸話だけを言い伝え扱いにする、という切り分けにした。
- **切り落とした話の置き場所**: 1話1事実に絞る過程で、ローマの地下鉄C線遺構
  (→money-events.mjsの新規出来事)とヴェネツィアのMOSE(→quiz.mjsの新規問題)
  に加えて、ラヴェンナ・ボローニャ・ヴェローナ・ナポリ・ヌオーロ・カリアリの
  6件をquiz.mjsの新規問題6問に移した。残り(ジェノヴァのコロンブス・パドヴァの
  大学・トリエステのボラ風・ボルツァーノの二言語表記・ペルージャの水道橋と
  大学・オルヴィエートの地下洞窟・バーリのオレッキエッテ・トロペアの玉ねぎと
  離島教会・チェファルのラ・ロッカ巨石遺構・コモの湖の形・アオスタの
  二言語表記・ソレントのセイレーン伝説・レッチェのローマ円形闘技場発見・
  ラクイラの2009年地震・オルビアのローマ沈没船・タオルミーナの19世紀避暑地化)
  は時間の制約で移設を見送り、`fact` から削っただけになっている。惜しい題材
  (とくにラクイラの地震・チェファルの巨石遺構)がいくつかあるので、次にこの
  盤面に触る人がクイズか出来事を増やす機会があれば使ってほしい。
