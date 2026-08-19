# スペイン盤面の登録内容

`scripts/countries/spain/` 8ファイルは作成済み(`art.mjs` は絵の担当が並行して作成中)。
`dooms/spain-*.tsx` 7枚も絵の担当が別途作成する。以下、共有ファイルへ貼り付けるための
コード片。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の import の下に追加):

```js
import { buildSpainContent } from "./countries/spain/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行:

```js
const AUTHORED_COUNTRIES = [
  // ...既存の並び...
  buildSpainContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加:

```js
  // €120,000(1200×100)。フランス・世界一周・イタリア・ドイツ・ヨーロッパと
  // 同じユーロ圏の据え置き。
  spain: 100,
```

(`CITY_PROPS` への追加は無し。物件価格は `cities.mjs` に直接書き込んであり、
マドリード〜サンティリャーナ・デル・マルの2件を両端に170〜2800の**16.5倍**に
してある。上書きテーブルは不要。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  spain: () => import("./spain.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  spain: () =>
    import("../content/spain.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

**鍵の衝突なしを確認済み**(下記「自分で確かめたこと」参照)。

```ts
  // Spain
  encierro: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  itinerario: { type: "choose-exact-dice" },
  talgo: { type: "roll-fixed-dice", diceCount: 2 },
  ave: { type: "roll-fixed-dice", diceCount: 3 },
  azabache: { type: "none" }, // 厄災の神(トラスグ)のward item(passive)
  esquila: { type: "repel-spirit" },
  apuntes: { type: "quiz-save" },
  decimo: { type: "gain-cash", amount: 380 },
  carajillo: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `ctr`=中央(メセタ) / `ext`=エストレマドゥーラ / `cat`=カタルーニャ /
`eus`=バスク+ナバラ / `nor`=カンタブリア海岸 / `gal`=ガリシア / `and`=アンダルシア /
`est`=アラゴン+レバンテ+ムルシア。4月始まり。8月(index 4)がスペイン名物の
「バカンスで国じゅうが閉まる」月(中央・バスク・カタルーニャが縮み、沿岸の
アンダルシア・レバンテが伸びる)、12月(index 8)が全員アイテム配布
(クリスマス宝くじ「エル・ゴルド」)。

既存の `SEASON_EFFECTS_BY_COUNTRY` オブジェクトの閉じ `};` の直前に追加:

```ts
  /**
   * スペイン。聖週間の行列 → コルドバのパティオ祭り → サン・フアンの
   * かがり火 → サン・フェルミン → 8月バカンス(中央が縮み沿岸が伸びる) →
   * ラ・リオハのぶどう収穫 → サラゴサのピラール祭り → マタンサ(豚の解体) →
   * エル・ゴルド(クリスマス宝くじ・給アイテム) → レジェス・マゴスの贈り物出費 →
   * カディスのカーニバル → バレンシアのファリャス、という流れ。
   * `SPAIN_SEASONS`(flavour.mjs)の12件と対応する。
   */
  spain: [
    /* 0 Apr 聖週間の行列(アンダルシア・カスティーリャが賑わう) */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("ctr"), multiplier: 1.15 },
    ],
    /* 1 May コルドバのパティオ祭り */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.25 },
    ],
    /* 2 Jun サン・フアンのかがり火(地中海・大西洋の海辺) */ [
      { op: "region-income-multiplier", regionId: region("cat"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.1 },
    ],
    /* 3 Jul サン・フェルミン(パンプローナ) */ [
      { op: "region-income-multiplier", regionId: region("eus"), multiplier: 1.35 },
    ],
    /* 4 Aug 8月バカンス(中央・バスク・カタルーニャが縮み、沿岸が伸びる) */ [
      { op: "region-income-multiplier", regionId: region("ctr"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("eus"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("cat"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.2 },
    ],
    /* 5 Sep ラ・リオハのぶどう収穫 */ [
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.25 },
    ],
    /* 6 Oct サラゴサのピラール祭り */ [
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.2 },
    ],
    /* 7 Nov マタンサ(豚の解体。エストレマドゥーラ・カスティーリャの農村) */ [
      { op: "region-income-multiplier", regionId: region("ext"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ctr"), multiplier: 1.1 },
    ],
    /* 8 Dec エル・ゴルド(クリスマス宝くじ) */ [
      { op: "region-income-multiplier", regionId: region("ctr"), multiplier: 1.15 },
      { op: "give-item-to-all" },
    ],
    /* 9 Jan レジェス・マゴス(公現祭の贈り物出費) */ [
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 10 Feb カディスのカーニバル */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.25 },
    ],
    /* 11 Mar バレンシアのファリャス */ [
      { op: "all-players-gain-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.3 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

既存の `DOOM_EFFECT_ID_BY_LEGACY_ID` オブジェクトの閉じ `};` の直前に追加:

```ts
  // Spain
  calima: "fine",
  "ola-calor": "skipTurn",
  dana: "loseProperties",
  huelga: "payOthers",
  siesta: "percentLoss",
  procesion: "teleport",
  carterista: "steal",
```

対応の考え方: カリマ(砂塵)は目薬・洗車代の小さな出費 → fine、熱波での速度制限
(ola-calor)は列車が遅れて足止め → skipTurn、DANA(集中豪雨)は近くに持つ物件が
浸水被害を受ける → loseProperties、ストライキ(huelga)は減便した便を他の乗客と
分け合う負担 → payOthers、シエスタ(siesta)は窓口が閉まっていて用事を済ませ
損ねる積み重なる損失 → percentLoss、行列による通行止め(procesion)は迂回を
強いられ目的地から遠ざかる → teleport、市場のすり(carterista)はそのまま → steal。

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

**絵の担当が `dooms/spain-*.tsx` を作成したのち、以下の形で登録してください**
(まだ絵ができていないため、ファイル名は ART-KEYS.md の id 一覧から想定):

```ts
import { SpainCalima } from "./spain-calima";
import { SpainOlaCalor } from "./spain-ola-calor";
import { SpainDana } from "./spain-dana";
import { SpainHuelga } from "./spain-huelga";
import { SpainSiesta } from "./spain-siesta";
import { SpainProcesion } from "./spain-procesion";
import { SpainCarterista } from "./spain-carterista";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "spain-calima": SpainCalima,
  "spain-ola-calor": SpainOlaCalor,
  "spain-dana": SpainDana,
  "spain-huelga": SpainHuelga,
  "spain-siesta": SpainSiesta,
  "spain-procesion": SpainProcesion,
  "spain-carterista": SpainCarterista,
```

## 補足: `src/presentation/components/setup/country-groups.ts`

確認していません(触らない指示のファイル)。スペインは地理的にヨーロッパ束に
入るのが自然に見えますが、既存の束の切り方に合わせて登録側で判断してください。

## 自分で確かめたこと

- `node --input-type=module -e "import('./scripts/countries/spain/index.mjs').then(m => {...})"`
  で `buildSpainContent()` を実際に呼び出して確認(art.mjs は絵の担当が既に
  一部作成済みだったため、この呼び出しは今回**本物の art.mjs に対して**通った):
  → 都市45・路線57・クイズ117・アイテム9・厄災7・季節12・出来事20・
  mark0種(絵は未着手)・bg3種(絵は着手中の見本ぶん)・音楽スタイル8地方。例外なし。
- 4言語の欠け: `city-helpers.mjs` と各ファイル自前の `t()` はパイプがちょうど
  3本(4分割)でなければ即座に例外を出すため、`buildSpainContent()` 自体が
  通ることで担保される。作業中に2件(バルセロナの物件名・スペイン国名以外の
  問いのタグ行5件)が実際に例外で落ち、その場で見つけて直した。
- 座標: 45都市すべてが `SPAIN_LAND` の多角形の内側にあることを点内判定で
  確認済み(2026-08-19 09:29 JST時点で0件)。
- **路線の geometry: `node scripts/check-sea-routes.mjs spain` を、5項目だけの
  使い捨ての焼き上がり(`cities.mjs`+`geography.mjs`)を組んで自分で走らせた**
  (手順書の「焼く前でも回せる」節のとおり)。57本中、当初2本が60px超だった:
  - `bilbao-santander`: 71%(119px)が海上 → 端の入れ替えで0pxに解消(確認済み)
  - `tarragona-valencia`: 14%(71px)が海上 → 端の入れ替えは逆効果(91%に悪化)
    だったため、実際の海岸線(エブロ川三角州の張り出し)を穏やかにする方向で
    座標を2点修正し、0pxに解消(確認済み)
  - 再チェックで**60px超0本**。**この使い捨ての焼き上がりは確認後すぐ削除した。**
  - **team-lead側で本物の焼き上がりに対して再確認をお願いしたい**
    (手順書が警告するとおり、添字ずれを直す前後で向きの判断が変わりうるため)。
- `seg`: 57本の投影後直線距離を実測。最長はマドリード〜コルドバの600px。
  seg=84だと5マス超が6本出たが、seg=110で5マス超0本になったため110を採用。
- **クイズの答えの漏れ: `node scripts/check-quiz.mjs spain` を、`cities`+`quiz`
  だけの使い捨ての焼き上がりを組んで自分で走らせた。** 当初6件の漏れ
  (マドリード=首都/バリャドリッド、アル=アンダルス、カタルーニャ語、
  リオハ、セルバンテス、1492年)が出て、うち5件は実在の漏れと判断し
  問いを差し替えた(国歌の問い・バスク語に差し替え・ワイン畑面積の問い・
  ロペ・デ・ベガの問い・コロンブスの出港地の問い)。残る1件
  (「スペインの首都は?」→マドリード がマドリード/バリャドリッドのカードに
  出る)は、既存の `ACCEPTED_LEAKS`(トルコ盤面のアンカラの例と同型)に
  相当する**易しすぎて避けられない漏れ**と判断し、そのまま残した。
  再チェックで、この1件を除いて漏れ0件・言語混入0件を確認。
  **この使い捨ての焼き上がりも確認後すぐ削除した。**
  正解の位置は出題時にシャッフルされるため散らしていない(手順書のとおり)。
- 難易度9〜10は1問ずつ裏取りした。次の3件は年号の出典に幅があり、
  確度がやや低いと申告する:
  - ペセタ導入年(1868年10月): 複数の一般的な参考資料で一致しているが、
    一次資料までは確認していない
  - ナバラ王国のイベリア側併合(1512年): 征服そのものの年は確実だが、
    「大部分を完了した」という言い方の precision(1515年の追加措置などとの
    境目)は幅がある
  - スペイン風邪の命名理由(1918年・中立国の報道): これは確度が高い
    (広く確立された史実)と判断している
- 難関層(難易度7〜10、40問)の題材の重なりを自分で数えた。コロンブス/1492年が
  複数問(建国記念日の問い・出港地の問い)にまたがるが、それぞれ**問うている
  具体的事実が違う**(祝日の由来 vs 出港した港)ため重複とはしていない。
  同様にエル・シッド(叙事詩の名 vs ブルゴス大聖堂の墓所在地は都市カード側)、
  フエロス/バスクの財政制度(難易度8で1問のみに絞った。当初2問あったのを
  1問に統合した)を確認している。
- 都市カードとの重なり: `check-quiz.mjs` が機械検出した6件はすべて確認し、
  5件を実在の漏れとして問いを差し替えた(上記)。
- 通貨倍率: フランス・世界一周・イタリア・ドイツ・ヨーロッパと同じユーロ圏
  なので据え置きの100とした(€120,000は既に不動産の桁として通る)。
- アイテム鍵9件(`encierro`/`itinerario`/`talgo`/`ave`/`azabache`/`esquila`/
  `apuntes`/`decimo`/`carajillo`)が既存27盤面ぶんの鍵の一覧と衝突しないことを
  機械チェック済み(0件、2026-08-19時点)。
- 音楽: 8地方すべての `ch`(8小節)・`mel`(8小節、各ステップ0〜15の範囲)・
  `strum`・`drum` の形を機械チェック済み(異常なし)。`lead` は `flute`/`pluck`
  の2種のみ(型定義どおり)。
- 物件価格: マドリードのキロメートル0(2800)からサンティリャーナ・デル・マル
  の封鎖された原洞窟の入口(170)まで、**16.5倍**の開きにしてある
  (手順書の目安「12〜17倍」の範囲内)。

## 質について

- 都市1件あたりの面積: 45都市・BW2245×BH1804=4,049,980px² →
  約90,000px²/都市。ガイドの目安どおり。
- 路線密度: 45都市に対して57本(1都市あたり1.27本)。韓国(40都市55本・
  1.375)よりやや疎だが、フランス級の盤面としては妥当な範囲。
  全体で1つの連結成分になっていることを確認済み(マドリードからどの都市へも
  たどり着ける。放射網+地方内の実在路線で組んだため)。

## 迷った点・判断した点

- **カタルーニャ・バスクの独立**: 政治的立場を取らず、言語・自治・財政制度
  として確かめられる事実だけを書いた(バルセロナ=カタルーニャ語イマージョン
  教育、ビルバオ=第三の軌間という鉄道の技術的事実、クイズのフエロス/
  財政協定の問い)。2017年の住民投票は「違憲とされ、政府が結果を認めなかった」
  という手続き上の事実のみをクイズで問うている。
- **内戦とフランコ体制**: 避けずに事実として置いた(クエンカの抽象美術館=
  国外亡命画家の話、カディスのカーニバル=検閲との攻防、ゲルニカ爆撃の
  クイズ、フランコの統治期間そのものを問うクイズ)。
- **ジブラルタル**: 領有権に争いのある土地のため止まりマスにしていない。
  クイズでは「現在イギリスの統治下にある」という事実のみを問うている。
- **カナリア諸島・バレアレス諸島**: 本土のみとし、盤面には含めていない
  (理由は geography.mjs にコメント済み)。クイズには両諸島の一般知識問題を
  含めている(盤面に無い分、クイズで扱うのは問題ない)。
- **ボタフメイロの由来・ガリシア語とポルトガル語の分岐年**: 伝聞・論争のある
  年号を事実として断定せず、それぞれ「〜と言われている」「12世紀ごろ」という
  hedge した書き方にした(サンティアゴのカード)。
- **通貨倍率**: ユーロ圏なので据え置きの100とした。判断に迷う点は無い。
