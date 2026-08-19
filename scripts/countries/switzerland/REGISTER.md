# スイス盤面 登録メモ(取りまとめ側へ)

貼れる形でまとめた。7箇所ぶん。**焼く前に、私の手元では以下を確認済み。**

- `node --check` 全ファイル通過
- `npx eslint scripts/countries/switzerland/` 通過
- `cities.mjs` 44都市・56路線、4言語欠落0
- `quiz.mjs` 102問(1〜3:25問 / 7以上:28問 / 9〜10:10問。目安をすべて満たす)
- `flavour.mjs` items 9 / doom 7 / seasons 12、4言語欠落0
- `money-events.mjs` 20件(増11・減9)、4言語欠落0
- `music.mjs` 4地方、`lead` はすべて `"flute"` か `"pluck"`(既存の型どおり)
- `mark`+`bg` の組み合わせ重複 **0組**(44都市/44組み合わせ)
- `node scripts/check-quiz.mjs switzerland`(使い捨てパックで実行・削除済み)
  → 漏れ4件・混入9件。**すべて目視確認済み、下記に理由を記載**
- `node scripts/check-sea-routes.mjs` は**未実施**(このボードは内陸国で
  海路・sea種別の路線が0本のため、判定対象になる経路が無い。念のため
  焼き上がり後に一度回すことを勧める)

---

## 1. `scripts/extract-legacy-content.mjs`

```js
import { buildSwitzerlandContent } from "./countries/switzerland/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追加:

```js
buildSwitzerlandContent(),
```

## 2. `scripts/content-overrides/property-economy.mjs`

`CURRENCY_MULTIPLIERS` に追加:

```js
// CHF 66,000(1200×55)。1スイス・フラン≒176円(2026年8月時点の目安。
// 1ドル≒150円・1ドル≒0.85CHFとして 150÷0.85)とすると
// 12,000,000÷176÷1200=56.8。イギリス(53)と近い実質になる、きりのよい55に丸めた。
switzerland: 55,
```

**根拠は指示書の式どおり自分で計算した。**当初54(CHF/JPY≒185円の見積もり)で
報告したが、団長から「もう少し円安のレートで見てほしい」との指摘を受け、
150÷0.85≒176円で再計算し55に改めた(2026-08-19 のやり取り)。

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追加:

```ts
switzerland: () => import("./switzerland.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追加:

```ts
switzerland: () => import("../content/switzerland.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts`

9件。**既存29盤面の鍵と衝突しないことを確認済み**(下記コマンドで
`foehn` `kursbuch` `postauto` `icn` `kuhglocke` `alphorn` `spickzettel`
`fundbuero` `anschlusszug` のいずれも既存に無いことを確認)。

```js
node -e 'const ids=require("./src/infrastructure/content/country-index.json").map(c=>c.id);
const k=new Set(); for(const i of ids){Object.keys(require(`./src/infrastructure/content/${i}.content.json`).items).forEach(x=>k.add(x))}
console.log([...k].sort().join(" "))'
```

```js
  // Switzerland
  foehn: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  kursbuch: { type: "choose-exact-dice" },
  postauto: { type: "roll-fixed-dice", diceCount: 2 },
  icn: { type: "roll-fixed-dice", diceCount: 3 },
  kuhglocke: { type: "none" }, // 厄災の神(バルベガジ)のward item(passive)
  alphorn: { type: "repel-spirit" },
  spickzettel: { type: "quiz-save" },
  fundbuero: { type: "gain-cash", amount: 380 },
  anschlusszug: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 季節(`SEASON_EFFECTS_BY_COUNTRY.switzerland`、4月始まり12ヶ月)

**数値は私の側で仮に置いたたたき台。**地方まるごとの好不況という考え方
(韓国・日本と同じ)に沿わせてあるが、他盤面との強さの釣り合いは
そちらで最終調整してほしい。`region()` の引数は `de`/`fr`/`it`/`gr`。

```js
  switzerland: [
    /* 0 Apr セシュラウテン(チューリヒ) */ [
      { op: "region-income-multiplier", regionId: region("de"), multiplier: 1.15 },
    ],
    /* 1 May 山小屋の営業再開 */ [
      { op: "all-players-gain-cash", amount: 220 },
    ],
    /* 2 Jun アルプアウフツーク(家畜の登り) */ [
      { op: "region-income-multiplier", regionId: region("de"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("gr"), multiplier: 1.2 },
    ],
    /* 3 Jul 議会の夏季休会・登山シーズン */ [
      { op: "region-income-multiplier", regionId: region("de"), multiplier: 1.1 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug 建国記念日の篝火 */ [
      { op: "all-players-gain-cash", amount: 300 },
    ],
    /* 5 Sep ぶどうの収穫 */ [
      { op: "region-income-multiplier", regionId: region("fr"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("it"), multiplier: 1.15 },
    ],
    /* 6 Oct アルプアプツーク(家畜の下り) */ [
      { op: "region-income-multiplier", regionId: region("de"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("gr"), multiplier: 1.15 },
    ],
    /* 7 Nov ミッテルラントの霧 */ [
      { op: "region-income-multiplier", regionId: region("de"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("fr"), multiplier: 0.9 },
    ],
    /* 8 Dec クラウスヤーゲン(中央スイスの鈴の行列) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("de"), multiplier: 1.1 },
    ],
    /* 9 Jan 雪崩情報の季節 */ [
      { op: "region-income-multiplier", regionId: region("gr"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("de"), multiplier: 1.1 },
    ],
    /* 10 Feb バーゼルのファスナハト */ [
      { op: "region-income-multiplier", regionId: region("de"), multiplier: 1.2 },
    ],
    /* 11 Mar フェーンの季節 */ [
      { op: "region-income-multiplier", regionId: region("de"), multiplier: 0.9 },
    ],
  ],
```

### 厄災(`DOOM_EFFECT_ID_BY_LEGACY_ID`、7件)

**既存の鍵と衝突していた2件を改名済み**(2026-08-20 実測)。

```
lawine       → europe に既存(skipTurn)なので `alpenlawine` に改名
hochwasser   → 既存の別盤面と衝突するため `schneeschmelze` に改名
```

7種の効果(`skipTurn` / `fine` / `percentLoss` / `payOthers` / `teleport` /
`loseProperties` / `steal`)への割り当て案。**下2件(★)は文章上の必然性が
薄く、私の判断に自信が無い。**団長の判断で入れ替えて構わない。

```js
  // Switzerland
  steinschlag: "skipTurn", // 落石で線路が塞がり、撤去まで足止め
  alpenlawine: "loseProperties", // 雪崩が道と沿線の資産を埋める
  schneeschmelze: "percentLoss", // 雪解け増水で資産の一部が水浸しになる
  foehnsturm: "fine", // フェーン嵐の後片付け・修理費
  "barbegazi-gil": "teleport", // バルベガジに化かされ、気づけば別の場所に
  abstimmungssonntag: "payOthers", // ★ 投票の人混みに巻き込まれる、程度の弱い結びつき
  "raclette-missgeschick": "steal", // ★ 同上。もっと合う効果があれば入れ替えてほしい
```

## 7. `src/presentation/components/events/dooms/index.ts`

**絵はこのボードの担当外。**別の担当が7枚(`switzerland-steinschlag.tsx` ほか、
上の7つの `id` に対応するファイル名)を用意し次第、Korea の例にならって
`import` と `DOOM_COMPONENTS` への追記をお願いしたい。

---

## 地方区分を「ロマンシュ語圏」ではなく「グラウビュンデン州」にした理由

`gr` を独立区分にする案(`rm` ロマンシュ語圏)も検討したが、実際に
ロマンシュ語が主に話される町(ディセンティス・ツェルネッツなど)は
グラウビュンデン州の中でも限られ、独立区分にすると**1〜2都市のためだけに
地方まるごとの音楽・季節ボーナスを別立てする**ことになる(団長の追記に
あった「ニュージーランドの壁」と同じ理由)。

そこで **グラウビュンデン州という行政区分**で1地方にまとめ、ロマンシュ語
そのものについては、実際に多言語併存の当事者であるディセンティスの
都市カードで語ることにした(カードの主題:五つの書き言葉に分かれた
言語に、人工的な統一標準語を作らねばならなかった経緯)。

## 5都市の承認から変わった点

承認時点の5都市(ベルン・ジュネーブ・シュヴィーツ・アンデルマット・
キアッソ)は**内容を変更していない。**追加した39都市も同じ芯
(「丸腰の平和ではなく、山ごと要塞にした武装中立」)で選んでいる。

## クイズの確度について

難易度9〜10の10問のうち、年号・数値を伴うものは**一次資料までは
当たっていない。**指示書の指示どおり、**他盤面の担当に確認を依頼したい。**
自分で確度が高いと判断したもの/中程度のものは各問いのコメントで
特に断っていないが、以下は特に確度を落として書いた(概算・推定の
言い回しを使っている)。

- 電力に占める水力の割合(「半分をかなり上回る」とだけ書き、数値を断定していない)
- スイス人口(「900万人近く」と概数で書いている)

## `check-quiz.mjs` の指摘(4件)を目視確認した結果

いずれも**誤検知と判断した。**理由を1行ずつ書く。

```
Q2  正解「スイス」がベルン/ツェルネッツのカードに
    → 国名そのもの。ほぼ全カードに登場する語で、この検査自体
      「スイス」を頻出語として除外リストに載せている(枠として除外: スイス×74)。
      個別の答え一致判定のほうはこの除外の対象外だったため出た、構造的な誤検知。

Q42 正解「レマン湖」がモントルーのカードに(問いとも「滞在」で一致)
    → 問いはバイロン卿とメアリー・シェリーが1816年にレマン湖畔に「滞在」し
      『フランケンシュタイン』の着想を得た話。モントルーのカードは
      1971年のディープ・パープルが「滞在していた」ホテルから火事を目撃した話。
      年代も人物もまったく別の出来事で、「レマン湖」「滞在」が
      たまたま両方に出る偶然の一致(モントルーがレマン湖畔の町である以上避けがたい)。

Q70 正解「ベルン州」がドゥレモンのカードに(問いとも「独立」で一致)
    → 問いは1803年、ヴォー州がベルンの属領から独立した話。
      ドゥレモンのカードは1979年、ジュラ州がベルン州から分離した話。
      二百年近く離れた別々の出来事で、「ベルン州から独立/分離」という
      構図が繰り返し起きているという事実そのものが偶然ではないにせよ、
      問いの答えとして書いた事実はカードの文言と重ならない。

Q98 正解「バーゼル」がバーゼルのカードに(問いとも「バーゼル」で一致)
    → 問いは「アート・バーゼル」の開催都市を尋ねるもの。答えの都市名が
      その都市自身のカードに出るのは、どんな「〇〇の開催都市は?」型の
      問いでも避けられない構造的な一致(バーゼルのカードの主題は
      1986年のサンド社火災と国際決済銀行で、アート・バーゼルには触れていない)。
```

**言語混入の9件はすべて「原語を出さないと問いが成立しない」型の例外**
(Graubünden/Grigioni/Grischun/Vierwaldstättersee/Bodensee/CONMEBOL)。
文面はそのまま残してある。
