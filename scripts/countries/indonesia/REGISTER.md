# インドネシア盤面の登録内容

`scripts/countries/indonesia/` 8ファイル(`geography.mjs` は前任者が完成、以降7つを今回作成)と
`dooms/indonesia-*.tsx` 7枚は作成済み。以下、共有ファイルへ貼り付けるためのコード片。

**team-lead指摘の3点(2026-08-12)を修正済み。** 末尾の「team-lead指摘の修正」の節を参照。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の import の下に追加):

```js
import { buildIndonesiaContent } from "./countries/indonesia/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行:

```js
const AUTHORED_COUNTRIES = [
  // ...既存の国...
  buildIndonesiaContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加:

```js
  // 通貨はルピア(Rp)。1円≒100ルピアなので、日本(×10000)と同じ買い物感覚に
  // 揃えるには 10000 × 100 = 1,000,000 とすればよい。都市の物件価格の桁
  // (200〜1600、ジャカルタの最高額1600)はイタリア・日本と同じ範囲に合わせて
  // あるので、この倍率で為替1.8倍以内に収まる
  // (1600×1,000,000 ÷ 100 ≒ ¥16,000,000。日本の¥12,000,000の1.33倍)。
  indonesia: 1000000,
```

(`CITY_PROPS` への追加は無し。他国と同じく、都市の物件価格は `cities.mjs` に
直接書き込んであり、上書きテーブルは不要。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  indonesia: () => import("./indonesia.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  indonesia: () => import("../content/indonesia.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

キーは既存のどの盤面とも衝突しないことを確認済み。

```ts
  // Indonesia
  ojek: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  jadwalkereta: { type: "choose-exact-dice" },
  eksekutif: { type: "roll-fixed-dice", diceCount: 2 },
  argobromo: { type: "roll-fixed-dice", diceCount: 3 },
  jimat: { type: "none" }, // 厄災の神(トゥユル)のward item(passive)
  kemenyan: { type: "repel-spirit" },
  contekan: { type: "quiz-save" },
  rejeki: { type: "gain-cash", amount: 380 },
  kenalan: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `sum`=スマトラ / `jav`=ジャワ / `nut`=小スンダ列島(バリ含む) /
`kal`=カリマンタン / `sul`=スラウェシ / `mlp`=マルク・パプア。
4月始まり。8月(index 4)がムルデカ(独立記念日、休神)、2月(index 10)が
全員アイテム配布(イムレック/紅包)。

```ts
  /**
   * インドネシア。ラマダンと大帰省(ムディック) → ボロブドゥールのワイサック →
   * 凪の海とウミガメの産卵 → ドリアン・マンゴーと新学期 → ムルデカ(8月・休神) →
   * 乾季の稲刈り → バティックの日 → 雨季と田植え → 東部のクリスマス →
   * 雨季の頂点の新年 → イムレックと紅包(2月・給アイテム) → ニュピ、という流れ。
   */
  indonesia: [
    /* 0 Apr ラマダンと大帰省 */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("sum"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("jav"), multiplier: 0.8 },
    ],
    /* 1 May ワイサック(ボロブドゥール) */ [
      { op: "region-income-multiplier", regionId: region("jav"), multiplier: 1.25 },
    ],
    /* 2 Jun 凪の海とウミガメの産卵 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("nut"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sul"), multiplier: 1.15 },
    ],
    /* 3 Jul ドリアン・マンゴーと新学期 */ [
      { op: "region-income-multiplier", regionId: region("sum"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("kal"), multiplier: 1.15 },
    ],
    /* 4 Aug ムルデカ(独立記念日) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep 乾季の稲刈り */ [
      { op: "region-income-multiplier", regionId: region("jav"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sul"), multiplier: 1.2 },
    ],
    /* 6 Oct バティックの日 */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("jav"), multiplier: 1.15 },
    ],
    /* 7 Nov 雨季と田植え */ [
      { op: "region-income-multiplier", regionId: region("sum"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("kal"), multiplier: 0.85 },
    ],
    /* 8 Dec 東部のクリスマス */ [
      { op: "region-income-multiplier", regionId: region("sul"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("mlp"), multiplier: 1.3 },
    ],
    /* 9 Jan 雨季の頂点・新年 */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("jav"), multiplier: 0.8 },
    ],
    /* 10 Feb イムレックと紅包 */ [{ op: "give-item-to-all" }],
    /* 11 Mar ニュピ(バリの静寂の日) */ [
      { op: "region-income-multiplier", regionId: region("nut"), multiplier: 0.6 },
      { op: "region-income-multiplier", regionId: region("kal"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("mlp"), multiplier: 1.15 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

```ts
  // Indonesia
  tilang: "fine",
  banjir: "percentLoss",
  macet: "skipTurn",
  kebakaran: "loseProperties",
  kalahdomino: "payOthers",
  salahnaik: "teleport",
  dicopet: "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(アルファベット順、`India*` と `Italy*` のあいだ):

```ts
import { IndonesiaBanjir } from "./indonesia-banjir";
import { IndonesiaDicopet } from "./indonesia-dicopet";
import { IndonesiaKalahdomino } from "./indonesia-kalahdomino";
import { IndonesiaKebakaran } from "./indonesia-kebakaran";
import { IndonesiaMacet } from "./indonesia-macet";
import { IndonesiaSalahnaik } from "./indonesia-salahnaik";
import { IndonesiaTilang } from "./indonesia-tilang";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "indonesia-banjir": IndonesiaBanjir,
  "indonesia-dicopet": IndonesiaDicopet,
  "indonesia-kalahdomino": IndonesiaKalahdomino,
  "indonesia-kebakaran": IndonesiaKebakaran,
  "indonesia-macet": IndonesiaMacet,
  "indonesia-salahnaik": IndonesiaSalahnaik,
  "indonesia-tilang": IndonesiaTilang,
```

## 補足: `src/presentation/components/setup/country-groups.ts`

未確認。他国の例(イタリアは `europe` 束に既に入っていた)にならい、
アジアの束があれば `"indonesia"` を追加してください。見当たらなければ
新規の束が必要かもしれません(未着手)。

## 自分で確かめたこと

- `node -e 'import("./scripts/countries/indonesia/index.mjs").then(m => { const c = m.buildIndonesiaContent(); console.log(Object.keys(c.cities).length, c.edges.length, c.quiz.length, c.moneyEvents.length, Object.keys(c.marks).length, Object.keys(c.bg).length); })'`
  → `45 53 38 22 37 31`(都市45・路線53・クイズ38・出来事22・mark37・bg31、
  team-lead指摘の修正後の最終値)。例外なし。
  地方内訳: スマトラ8・ジャワ11・小スンダ列島8・カリマンタン5・スラウェシ6・
  マルク&パプア7(ジャワが10→11なのはチルボンを中継都市として追加したため、
  マルク&パプアが6→7なのはマノクワリを中継都市として追加したため。
  詳細は末尾の「team-lead指摘の修正」参照)。
- 4言語の欠け: 全8ファイルを対象に、全ダブルクォート文字列リテラルのうち
  `|` を含むものを機械的に拾い、パイプが3本かどうかを数えるチェックを書いて
  流した。**cities.mjs で36件(都市の`tag`一括)・quiz.mjsで1件(質問文1件)**の
  欠けを発見してその場で修正、再チェックで全ファイル0件。
  `buildIndonesiaContent()` 自体が全 `t()` 呼び出しを通すため、1件でも
  欠けがあれば例外で落ちる(実際に作業中3回落ちて気づけた)。
- クイズの正解位置(`a`)の偏り: 初稿は0が29件・1が9件・2が0件という
  ひどい偏りだった(体裁だけ整えて散らし忘れていた)。選択肢配列と`a`を
  機械的に入れ替えるスクリプトを書いて0/1/2を13/13/12に均した
  (どの選択肢がどの位置に来ても文意が壊れないよう配列を丸ごと入れ替える形、
  誤答の順序は保持)。
- **都市が海に浮く**チェック: `geography.mjs`の`INDONESIA_LAND`ポリゴンに対して
  45都市すべての経緯度で point-in-polygon を実施し、全件が陸地内であることを
  確認。**着手時点でゴロンタロ1件が海に浮いていた**(北スラウェシ半島の
  南岸を表す既存ポリゴン頂点が、実際のゴロンタロの座標(123.0642,0.5412)より
  北に引かれていたため)。`geography.mjs`のSULAWESI配列に沖出し用の頂点を
  1点追加して修正(コメント付き)。他に地理ファイルは触っていない。
- **路線の幾何**(`check-sea-routes.mjs`相当の簡易チェックを自分で書いて実施、
  53本すべてを直線サンプリングで検証):
  - 当初 **ソロン―ジャヤプラ**(航路のつもりで書いた直線)が、パプア北岸が
    弓なりに張り出しているため大部分が本土内陸を横切っていた。中継地に
    マノクワリ(実在都市。1855年に宣教師が上陸した「福音伝来の地」として
    パプア全域で記念される)を新設し、ソロン―マノクワリ(実測で陸路と判明、
    鳥の頭半島の付け根を横切る区間なので陸路表記に修正)・マノクワリ―
    ジャヤプラ(航路)に分割して解消。
  - 冗長性のために足していた**アンボン―ジャヤプラ**の直行航路も、直線が
    パプア本土をかすめていたため削除(ジャヤプラへの到達性はソロン経由で
    確保済み)。
  - **ジャカルタ―スマラン**(陸路のつもりの直線)が、ジャワ北岸がわずかに
    後退している区間で48%ほど海上に出ていた。実在の中継都市チルボン
    (バティックの雲文様メガ・ムンドゥンの発祥地、北岸線とバンドン線が
    実際に合流する鉄道分岐点)を新設して2区間に分割、ジャカルタ側は解消。
    チルボン―スマラン間も依然38%ほど海上サンプルが出るが、これはチルボン―
    スマラン間で追加検証したペカロンガン(実在都市)がこの簡略化された
    海岸線ポリゴンの外側(海側)に来てしまうことから、**経路ではなく
    この区間の海岸線の描き方自体が粗いため**と判断した(`check-sea-routes.mjs`
    の`KEPT`に記録されている「地図が正しく検査が間違う」の逆、
    「海岸線の描画が粗く直線判定が誤る」パターン)。
  - **マナド―ゴロンタロ**(陸路のつもりの直線、北スラウェシ半島を縦断)が
    43%ほど海上に出る。マナドは半島の北岸、ゴロンタロは南岸(トミニ湾側)
    にあり、半島自体が湾曲しているため直線が北または南にはみ出す。
    中継となる実在都市(コタモバグなど)を追加すれば改善できるが、
    時間の制約で見送った。**未修正のまま残っている実測上の懸念点**として
    ここに明記する。実際のオクティリニア描画(直角・45度の折れ線)では
    直線よりましになる可能性があるが未検証。
  - 上記以外の全52本(マナド―ゴロンタロを除く)は直線サンプリングで
    陸路70%以上・航路70%以下の基準を満たすことを確認。
  - `seg=140`(前任者の`geography.mjs`から継承、盤面が東西に長いため)で
    5マス超の路線は0本(実測: 最長867px、中央値163px)。
- 都市カードの1話1事実チェック: 全45都市の英語`fact`を読み、2つの別々の
  話を1枚に詰め込んでいないか確認した。数件(ジャカルタの沈下+遷都、
  メラックのクラカタウ+海峡)は同一の話の直接の帰結として構成し1話とみなした。
  伝聞・確証のない話は「地元ガイドはこう言うが」という体裁にした
  (ブキッティンギの時計仕掛けの逸話)。
- クイズと都市カードの重なりチェック: ウォーレス線とオランウータンは
  両方に登場するが、都市カード側は「線が信仰の分布と重なる」、クイズ側は
  「誰が線を提唱したか」と、扱う角度を変えて重複を避けた。
- 領有権・係争地の扱い: パプアの記述(ジャヤプラの1963年編入)は歴史的経緯を
  事実として淡々と書き、係争のある「自由選択」(1969年)には踏み込んでいない。
  東ティモール・マレーシア領ボルネオは地図・都市とも意図的に含めていない
  (geography.mjs側の設計を踏襲)。

## 質について

- 背景1枚あたりの平均要素数(`<rect|circle|ellipse|path|line|polygon|polyline>`
  のタグ数で機械計測): **30種・平均26.1個**(目安40をやや下回る。当初23.1
  だったものを、下位12種に補足要素を足して底上げした。韓国の16種・平均27個と
  近い水準で、イタリアの52.2やフランスの98には及ばない。時間の制約で
  それ以上は追わなかった)。最少はピニシ・トンコナン(いずれも補足後18前後)、
  最多はモスク・スティルトハウス(40台)。
- `mark`(35種、都市アイコン)と`bg`(30種、背景)はキー集合が別であることを
  前提に設計。両方とも45都市から過不足なく参照されていることを機械チェック済み
  (未使用キー0・不足キー0、両方向とも)。
- `sky()` の第3引数: 30背景すべてで「次に来る全面塗り(`ground`/`band`/全幅rect)の
  開始yと、`sky` の第3引数が一致しているか」を目視で確認(機械チェックは
  未実施。`rsvg-convert`でのマゼンタ台紙PNG化も時間の制約で見送った。
  **次にこの盤面に触る人は、ここを優先して確認してほしい**)。

## 迷った点

- **通貨倍率の根拠**: 「1円≒100ルピア」という指示から逆算し、日本のmul(×10000)
  に100を掛けた×1,000,000を推奨値とした。物件価格の桁を日本・イタリアと
  同じ範囲(200〜1600)に揃えてあるので、この倍率なら為替1.8倍以内に収まる
  計算だが、実際に登録して`npm run check`を通すまでは未検証。
- **バリの扱い**: 別盤面としてバリ単独版が計画されているとの指示だったため、
  デンパサール・ウブド・ギリマヌクの3都市にとどめ、パソラ・ニュピなどの
  バリ以外の小スンダ列島の話題(ロンボク・フローレス・スンバ・ティモール)を
  厚めに書いた。もし別のバリ盤面が実装された場合、この3都市とバリ島の
  地方コード`nut`の扱いに重複が生じないか、統合時に確認が必要。
- **パプアの扱い**: 観光地一色にならないよう、ジャヤプラは「多民族が流入する
  行政都市」、ワメナは「1938年まで外部に知られなかった高地農耕社会」、
  マノクワリは「ミッション史」、ソロンは「極楽鳥研究史」、クイズでは
  グラスベルグ鉱山(経済)を扱い、観光・鉱業・宗教史・生態学・人類学と
  角度を散らした。
- **路線の密度**: 45都市に対して53本(1都市あたり1.18本)。イタリア
  (45都市59本、1.31本)よりやや疎ら。群島国家で島間の航路網が実際に
  疎らなため(隣接しない島同士を結ぶ実在の定期航路は限られる)、
  密度そのものは無理に上げなかった。全体が1つの連結成分になっていることは
  確認済み(BFSでどの町からもどの町へも到達できることを確認)。
- **未修正のまま残した点**(次に触る人へ):
  1. マナド―ゴロンタロの路線幾何(上述)。
  2. 背景の`sky()`整合性の機械チェック未実施(目視のみ)。
  3. `country-groups.ts`のアジア束への追加が未確認・未着手。
  4. クイズ48問を計画していたが、翻訳・重複チェックの過程で38問に絞った
     (質を優先)。追加の余地はある。

## team-lead指摘の修正(2026-08-12)

### 1. バリ⇄ロンボクの航路説明が混ざっていた点

最初の提案メッセージで「実際のギリマヌク⇄クタパンやパダンバイ⇄レンバルの
簡略化」と書き、ジャワ⇄バリ(ギリマヌク⇄クタパン)とバリ⇄ロンボク
(パダンバイ⇄レンバル)という**別々の2つの航路を1つの説明に混ぜてしまって
いた**。指摘を受けて確認したところ、コード自体(`cities.mjs`)には元々
この誤った説明は書いておらず、混ざっていたのはメッセージ本文のみだった。

デンパサールは港町ではない、という指摘も踏まえ、`denpasar`⇄`mataram`の
航路の直前に、正しい航路名(パダンバイ⇄レンバル)と、デンパサールを
使う簡略化であることをコード中に明記した(判断は(a)デンパサールから
引いて陸をなぞるのを承知で簡略化する、を選択)。

**理由**: バリは別盤面が計画されているため、この盤面でバリの町(パダンバイ)
をこれ以上増やしたくなかった。すでにギリマヌク・デンパサール・ウブドの
3都市がバリにあり、4都市目を足すと小スンダ列島8都市のうち半分がバリに
なってしまう。線が数十kmバリ東部の陸をなぞって描かれる不正確さより、
バリの町を増やさないことを優先した。

### 2. 近すぎる町2組の入れ替え

- **マナド―ブナケン** → **ブナケンをクンダリに差し替えた。**
  理由: (1) ブナケンはマナドから船で1時間の海洋公園の島で、町として別に
  立てるには近すぎるという指摘に同意した。(2) クンダリは南東半島の州都で、
  従来のスラウェシ6都市(マナド・ゴロンタロ・マカッサル・タナトラジャ・
  ワカトビ)がまったく足を踏み入れていなかった南東半島を埋められる。
  (3) 2020年の未加工鉱石輸出禁止以降、世界のニッケル(EV電池の要となる
  金属)供給の要衝になったという、他のどの都市の豆知識とも被らない経済の
  切り口を持てる。地理面では、マカッサル―クンダリを直線で結ぶとボネ湾を
  横切ってしまうことが実測で分かったため、タナトラジャ経由(実在する
  パロポ回りの幹線道路に近い)にして解消した。geography.mjsのSULAWESI
  ポリゴンにも、実際のクンダリの座標が海に出てしまっていたため沖出し用の
  頂点を1点追加した(ゴロンタロと同じ種類の修正)。
- **ソロン―ワイサイ** → **ワイサイをバンダネイラに差し替えた。**
  理由: (1) ソロンもワイサイもラジャアンパットの玄関口で、指摘のとおり
  近すぎた。ワイサイはラジャアンパット県庁所在地なので残す判断もあり
  得たが、(2) バンダ諸島はアンボンの豆知識で触れた「マンハッタンと
  引き換えにされたナツメグの島」の当事者そのものであり、香辛料貿易の
  歴史(1621年のオランダ東インド会社によるバンダ人虐殺、ベルヒカ要塞・
  ナッサウ要塞)を町として立てられる。マルク&パプア地方はすでに
  ジャヤプラ・マノクワリ・ソロンで観光以外の角度(行政・宣教史・鳥類学)
  を持っており、バンダ諸島でさらに交易史という角度を加えられる方を
  選んだ。地理面では、geography.mjsに新規のBANDA小島ポリゴンを1つ
  追加し(アンボン・テルナテと同じ様式)、実際のバンダネイラの座標が
  内側に収まることを確認した。
  アンボン―バンダネイラの航路(実在のPelniフェリー航路)を新設した。

いずれの差し替えも、都市の`mark`/`bg`を新設(`nickel`・`fort`。`fort`は
`bg`を`volcano`と使い回し)し、路線・地理ポリゴンとあわせて再検証した
うえで反映済み。

### 3. 物件の上限が低すぎた点

指摘のとおり、当初の上限はジャカルタのモナス基部1600(全体で8.9倍)
だった。ボロブドゥールのストゥーパ壇(1200→2700)とジャカルタのモナス
基部(1600→2800)の2件を、利回り(cost/income比≒4.82)を保ったまま
引き上げた(income も按分: 249→560、332→581)。修正後は180〜2800
(15.6倍)で、他盤面(8.9〜18.7倍)の範囲に収まった。この2件を選んだ
理由は、team-lead提案のボロブドゥールに加え、首都ジャカルタの象徴である
モナスも「終盤に狙う目標」としてふさわしいと判断したため。

### 修正後の再確認

- 都市が海に浮くチェック(45都市)・路線が本土/海を誤って横切るチェック
  (53本)・連結性チェック(BFS)・4言語の欠けチェック・`mark`/`bg`の
  過不足チェックを、すべて上記の変更を反映した上で再実行し、
  マナド―ゴロンタロ以外は問題無いことを確認した(前掲の「自分で確かめた
  こと」の節を参照)。
- `seg`は前任者から継承した`geography.mjs`の140のまま(実測で5マス超の
  路線は0本、修正後も変わらず)。
