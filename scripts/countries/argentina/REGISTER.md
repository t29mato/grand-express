# アルゼンチン盤面の登録(取りまとめ側が当てる7箇所+1)

`scripts/countries/argentina/` の7ファイル(index / cities / geography / quiz /
money-events / flavour / music)は揃っています。**`art.mjs` と
`src/presentation/components/events/dooms/argentina-*.tsx` 7枚は絵の担当が
別途作成します。**このREGISTER.mdの7番目はその7枚ができてから当ててください。

## 芯・都市数について

芯・5都市案は team-lead 承認済み(2026-08-21)。**都市は最終的に49件**です
(当初案48件+リオ・グランデ1件)。理由は `cities.mjs` 末尾のコメントと、
本ファイル末尾の「焼く前の検査」の節を参照してください
(リオ・ガジェゴス⇄ウシュアイアの航路がマゼラン海峡北岸の陸地に60px超
かかる問題を、中継の町を挟んで解消しました)。

## 1. `scripts/extract-legacy-content.mjs`

```js
import { buildArgentinaContent } from "./countries/argentina/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追記:

```js
  buildArgentinaContent(),
```

## 2. `scripts/content-overrides/property-economy.mjs`

倍率90000。**team-lead が2026-08-21時点の実勢で検算済み。**

```
1 ARS = 0.1062円(2026-08-21実勢、team-lead確認)
倍率 = 12,000,000 ÷ 0.1062 ÷ 1200 ≒ 94,162
直近30日の変動幅 0.1052〜0.1104円 → 倍率換算で 90,580〜95,000
90000 はこの幅の内側なので、そのまま使ってよい(team-lead確認済み)
公式1497.25ペソ/ドルと非公式「ドル・ブルー」1528.50ペソ/ドルの差は
2026-08-21時点でわずか2%(かつて数倍あった乖離は縮んでいる)
```

執筆時に自分で仮定した「1ドル≒150円・1ドル≒1300ペソ」は実勢(公定
1497.25)から13%ずれていたが、円建て・ドル建ての誤差が打ち消し合って
結果の倍率(86,957→90000に丸め)は妥当な幅に収まっていた。

**アルゼンチンは為替が激しく動く国なので、次に触る人はこのレートが
古くなっていないか確認すること。**

```js
  // AR$ 1,200 → AR$ 108,000,000。2026-08-21実勢(1ARS=0.1062円)で
  // 12,000,000÷0.1062÷1200≒94,162、30日の変動幅換算90,580〜95,000の
  // 内側に収まる90000とした(team-lead検算済み)
  // (2026-08-21時点の想定レート。実勢と大きくずれている可能性が高いので要確認)。
  argentina: 90000,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追記:

```ts
  argentina: () => import("./argentina.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追記:

```ts
  argentina: () => import("../content/argentina.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts`

アイテム9件。鍵は既存全盤面(約300件)と衝突しないことを確認済み
(2026-08-21)。**quiniela の `amount` は 380 を提案します**
(price 280 < amount 380 の原則どおり)。

```ts
  // Argentina
  hacerdedo: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  cochecama: { type: "choose-exact-dice" },
  grancapitan: { type: "roll-fixed-dice", diceCount: 2 },
  trenalasnubes: { type: "roll-fixed-dice", diceCount: 3 },
  gauchitogil: { type: "none" }, // 厄災の神(エル・ファミリアル)のward item(passive)
  salgruesa: { type: "repel-spirit" },
  resumen: { type: "quiz-save" },
  quiniela: { type: "gain-cash", amount: 380 },
  vivezacriolla: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 災難7件の対応

`ARGENTINA_DOOM`(`flavour.mjs`)は fine / percentLoss / skipTurn /
loseProperties / payOthers / teleport / steal の順に並べてあります。
**順序を変えずにそのまま対応させてください。**

```ts
  // Argentina
  sinboleto: "fine",
  megadevaluacion: "percentLoss",
  parogeneral: "skipTurn",
  cierrederamal: "loseProperties",
  trasbordoforzado: "payOthers",
  trenfantasma: "teleport",
  arrebatoretiro: "steal",
```

### 季節12ヶ月(4月始まり)

地方コード: `pa`=パンパ・首都圏 / `no`=北西部(NOA) / `me`=メソポタミア・
北東部 / `cu`=クージョ / `pt`=パタゴニア。南半球なので中身は他国と季節が
逆になる(7月=独立記念日・乾季の頂点、1月=大西洋岸の真夏)。
`ARGENTINA_SEASONS`(`flavour.mjs`)の文面に対応させた提案値。**数値は
叩き台**なので、他盤面とのバランスを見て調整してください。

```ts
  /**
   * アルゼンチン。大豆・とうもろこしの本作収穫(4月) → イェルバ・マテの
   * サフラ(5月) → 第1回アギナルド・バリローチェのスキー場開き(6月・全員給付) →
   * 独立記念日(7月・全員給付・休神) → パチャママの日(8月) →
   * トゥクマンのサトウキビのサフラ(9月) → クージョのぶどうの芽吹き(10月) →
   * パタゴニアの毛刈り開始(11月) → 第2回アギナルド・海水浴シーズン開幕
   * (12月・全員給付) → 大西洋岸の真夏(1月) → グアレグアイチュの
   * カーニバル(2月・給アイテム) → メンドーサのベンディミア(3月)、という流れ。
   */
  argentina: [
    /* 0 Apr 大豆・とうもろこしの本作収穫が最盛期 */ [
      { op: "region-income-multiplier", regionId: region("pa"), multiplier: 1.3 },
    ],
    /* 1 May イェルバ・マテのサフラ(ミシオネス) */ [
      { op: "region-income-multiplier", regionId: region("me"), multiplier: 1.2 },
    ],
    /* 2 Jun 第1回アギナルド・バリローチェのスキー場開き */ [
      { op: "all-players-gain-cash", amount: 320 },
      { op: "region-income-multiplier", regionId: region("pt"), multiplier: 1.15 },
    ],
    /* 3 Jul 独立記念日(乾季の頂点) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug パチャママの日(北西部) */ [
      { op: "region-income-multiplier", regionId: region("no"), multiplier: 1.15 },
    ],
    /* 5 Sep トゥクマンのサトウキビのサフラ */ [
      { op: "region-income-multiplier", regionId: region("no"), multiplier: 1.2 },
    ],
    /* 6 Oct クージョのぶどうの芽吹き(生育期の始まり) */ [
      { op: "region-income-multiplier", regionId: region("cu"), multiplier: 1.1 },
    ],
    /* 7 Nov パタゴニアの毛刈り(エスキラ)が始まる */ [
      { op: "region-income-multiplier", regionId: region("pt"), multiplier: 1.2 },
    ],
    /* 8 Dec 第2回アギナルド・大西洋岸の海水浴シーズン開幕 */ [
      { op: "all-players-gain-cash", amount: 320 },
      { op: "region-income-multiplier", regionId: region("pa"), multiplier: 1.15 },
    ],
    /* 9 Jan 大西洋岸の真夏 */ [
      { op: "region-income-multiplier", regionId: region("pa"), multiplier: 1.3 },
    ],
    /* 10 Feb グアレグアイチュのカーニバル(給アイテム) */ [
      { op: "give-item-to-all" },
      { op: "region-income-multiplier", regionId: region("me"), multiplier: 1.3 },
    ],
    /* 11 Mar メンドーサのブドウ収穫祭(ベンディミア) */ [
      { op: "region-income-multiplier", regionId: region("cu"), multiplier: 1.3 },
    ],
  ],
```

## 7. `src/presentation/components/events/dooms/index.ts`

**絵の担当が7枚(`argentina-sinboleto.tsx` など)を作成したあとで当てて
ください。**鍵は上の災難7件の `id` と同じにする想定です。

```ts
import { ArgentinaArrebatoRetiro } from "./argentina-arrebatoretiro";
import { ArgentinaCierreDeRamal } from "./argentina-cierrederamal";
import { ArgentinaMegaDevaluacion } from "./argentina-megadevaluacion";
import { ArgentinaParoGeneral } from "./argentina-parogeneral";
import { ArgentinaSinBoleto } from "./argentina-sinboleto";
import { ArgentinaTrasbordoForzado } from "./argentina-trasbordoforzado";
import { ArgentinaTrenFantasma } from "./argentina-trenfantasma";

// ...DOOM_COMPONENTS の中に追記
  "argentina-arrebatoretiro": ArgentinaArrebatoRetiro,
  "argentina-cierrederamal": ArgentinaCierreDeRamal,
  "argentina-megadevaluacion": ArgentinaMegaDevaluacion,
  "argentina-parogeneral": ArgentinaParoGeneral,
  "argentina-sinboleto": ArgentinaSinBoleto,
  "argentina-trasbordoforzado": ArgentinaTrasbordoForzado,
  "argentina-trenfantasma": ArgentinaTrenFantasma,
```

## 8. `src/presentation/components/setup/country-groups.ts`(選ぶ画面)

**オセアニアと同じ形です。**南アメリカの束は既にあるので、新設せず
`countryIds` の末尾に足してください。

```ts
  {
    key: "southamerica",
    label: { en: "South America", es: "América del Sur", fr: "Amérique du Sud", ja: "南アメリカ" },
    wholeBoardId: "southamerica",
    countryIds: ["southamerica", "peru", "venezuela", "bolivia", "brazil", "argentina"], // ← argentina を追記
  },
```

同時にチリ・コロンビア・キューバも登録される場合、それぞれの担当の
REGISTER.md と合わせて1回で `countryIds` を更新してください(同じ行を
複数回に分けて編集すると衝突します)。

## 測定(2026-08-21 15:xx JST、登録前)

```
node --check scripts/countries/argentina/*.mjs        # 全ファイル構文OK
npx eslint scripts/countries/argentina/                 # 警告0
node scripts/check-sea-routes.mjs argentina             # 使い捨てjsonで確認済み。60px超の食い違いなし(52本中)
```

`node scripts/extract-legacy-content.mjs` と
`node scripts/check-quiz.mjs argentina` は未登録のため未実行。登録後に
お願いします。

## 数字(2026-08-21測定)

```
都市          49(当初案48 + リオ・グランデ。理由は上記)
地方          5(pa/no/me/cu/pt)
路線          52本(うち航路1本。マゼラン海峡=リオ・ガジェゴス⇄リオ・グランデ)
クイズ        106問。難易度分布 1-3:24 / 4-6:44 / 7-8:27 / 9-10:11
お金の出来事  16件(増8・減8)。全地方で増減とも最低1件を確認済み
道具          9個。effect型9種を1つずつ(quiz-save の resumen は価格140)
厄災          7個。fine/percentLoss/skipTurn/loseProperties/payOthers/
              teleport/steal を1つずつ。id は既存301件と衝突なし確認済み
季節          12ヶ月。give-item-to-all 1回(2月)・rest-spirit 1回(7月)
音楽          5地方(pa/no/me/cu/pt)
記号+背景     49+20=69枚(上限70)。同じ絵になる都市 0組(49都市中)
物件価格      160〜2200(13.8倍)
```

## 焼く前の検査で見つかった問題(2026-08-21)

`check-sea-routes.mjs` を使い捨てjsonで回したところ、当初51本のうち3本が
60px超でした。

```
riogallegos–ushuaia(航路)        90px(28%)  → 地形の作り直しで65pxまで改善したが解消せず
necochea–bahiablanca(陸路)       87px(34%)  → 端の入れ替えで0px
comodororivadavia–puertomadryn(陸路) 85px(24%) → 端の入れ替えで0px
```

後者2本は端の入れ替えで解消しましたが、**マゼラン海峡越えの航路だけは
地形の調整(海岸線・ティエラ・デル・フエゴ島の輪郭を複数回引き直し)でも
60px未満に落ちませんでした。**原因は、リオ・ガジェゴスとウシュアイアを
結ぶ直線が、簡略化した海岸線ではマゼラン海峡北岸の陸地(カボ・ビルヘネス
付近)を斜めに横切ってしまうことでした。

**中継の町「リオ・グランデ」(ティエラ・デル・フエゴ島東岸、標高0m、
実在の同島第2の都市)を挟んで解消しました。**

```
riogallegos–riogrande(航路。マゼラン海峡越え)  60px超の食い違いなし
riogrande–ushuaia(陸路。島内、国道3号線)        60px超の食い違いなし
```

これにより都市数は48→49になりました。リオ・グランデは埋め草ではなく、
1972年の特別関税地域指定以降の電子機器組立産業とキングペンギンの
コロニーという実在の重みのある都市として書いています(`cities.mjs` 参照)。

## 難易度9〜10の裏取り状況(2026-08-21)

11問あります。各問の直前にコメントで裏取りの確度を書きました。すべて
「複数の一般的な参考情報で確認できる、確度の高い事実」ですが、**一次資料
(公文書・当時の新聞等)には当たれていません。**数値・固有名詞は基本情報の
範囲に留め、断定的すぎる書き方は避けています。他盤面の担当による
相互レビューをお願いします。

## クイズの相互チェック(自作)

`check-quiz.mjs` は国別コンテンツ(`*.content.json`)を読むため、未登録の
段階では回せません。代わりに、都市カードの tag/fact と全106問の正解を
総当たりで突き合わせる自作スクリプトを回しました。**3件、都市カードの
中心的事実とほぼ同一の問いが見つかり、差し替えました**(トゥクマンの
1816年独立宣言→問いを「宣言の名宛て」に変更、ロサリオの大豆油・大豆粕
輸出→問いを2001年危機の準通貨「パタコネス」に変更、コリエンテスの
チャマメ→問いを「サンバ」の踊りに変更)。残りのヒットは、都市名そのものが
答えである設問(例:「アルゼンチンの首都は?」の答え「ブエノスアイレス」が
他の都市カードの本文中に地名として出てくる)などの誤検知で、実際の漏れでは
ありません。

## 重ならないことの確認(2026-08-21)

- 南アメリカ盤(タンゴの起源・ガウチョ/パンパの語源・アコンカグア・
  サンマルティンの1817年アンデス越え・プーマ/ジャガーの語源・グアナコ・
  チャコ戦争の同盟国)とは重ならないよう確認済み
- 世界一周盤の「世界最長の陸の国境」(答えはカナダ/米国。選択肢に
  アルゼンチン/チリが出るが正解ではない)とは別の問い(アルゼンチンの
  **自国の**最長国境がチリだという別スコープの事実)にした
- 厄災の id は既存301件と衝突なし(「zonda」は南アメリカ盤の厄災と衝突する
  ため、percentLoss は通貨切り下げに変更した)
- 並行して書かれているチリ盤(アンデス越え・移民・ワイン)とは、
  「アンデス越えの鉄道」「ワイン産業の隆盛」そのものを主題にする問い・
  都市カードを避けた(カファジャテ/サンラファエルのワインはトロンテス種と
  標高という別角度に絞った)
