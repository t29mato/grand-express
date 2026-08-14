# 南アメリカ登録内容

`scripts/countries/southamerica/`(8ファイル)と `dooms/southamerica-*.tsx`(7枚)は
作成済みです。以下7か所への追記をお願いします(共有ファイルはこちらから触っていません)。

## quiz.mjsを39問→101問に拡張(2026-08-14、クイズ拡張の指示を受けて)

難易度7以上が6問しかなく、くわしい人には毎回ほぼ同じ問題しか出ない、という
指摘を受けて拡張しました。**追加は62問(既存39問はそのまま。文言は一切
変えていません)。**内訳(既存→合計):

```
難易度   1  2  3  4  5  6  7  8  9 10  計
既存     3  4  7  8  7  4  4  2  0  0  39
追加     2  2  3  5  5  9  9 11  9  7  62
合計     5  6 10 13 12 13 13 13  9  7 101
```

難易度7以上は42問(目標25以上)、9〜10は16問(目標10以上)、1〜3は21問
(目標20以上)を満たしています。正解の位置(a)は既存13/12/14と合わせて
合計0:34/1:33/2:34、ほぼ均等です。

**題材は都市カード46件の主題と重ならないものを選び、46都市名そのものは
問い・答えのどちらにも使っていません。**大陸規模の自然史(カピバラ・
アナコンダ・ジャガー・トゥーカン等の生態と語源)・独立戦争史(サンマルティン・
アヤクーチョの戦い・大コロンビア)・植民地史(エンコミエンダ・グアノ交易・
ゴムブームの崩壊)・考古学(チンチョーロのミイラ・フアニータ・チャンチャン・
ティワナクの太陽の門)を中心にしています。

**題材選びの途中で2件、都市カードとの重なりに気づいて差し替えました。**
- 当初「ドレーク海峡を越えるとどの大陸か→南極大陸」としていましたが、
  ウスアイアのカードが「南極大陸行きクルーズ船の主要な出港地」と書いており、
  読んだ人がそのまま答えられてしまうため、「ホーン岬付近で出会う二つの海
  (太平洋と大西洋)」に差し替えました。
- 当初「1903年のペトロポリス条約でブラジルにアクレを譲った国→ボリビア」
  としていましたが、「条約」「国境紛争」「解決」「約束」という言葉の並びが、
  アリカのカード(1904年チリ・ボリビア条約の詳しい経緯)とあまりに近い
  印象を与えると考え、「トゥパク・アマル二世の元の名前」に差し替えました。

**`node scripts/check-quiz.mjs southamerica` は、あなたが焼き直すまで
今回の追加分を反映できません**(焼き上がりの39問を見るだけです)。
そこで `cities.mjs` と `quiz.mjs` のソースを直接importして同じ判定ロジックを
手元で再現し、追加62問だけを対象に回しました。結果は4件の「漏れ?」表示
(ブラジル/ボリビア/ケチュア語/ペルーが、無関係な文脈でたまたま同じ国名や
「南米」「意味」を含むカードに当たっただけの誤検知と判断。上の2件のような
実質的な重なりは無し)。言語混入・欠けは0件でした。

**焼き上がりの39問に対しても同じ判定ロジックを走らせたところ、17件の
「漏れ?」が出ました(今回の62問追加より前から存在)。**サンプルで数件
中身を確認したところ(例: Q17「ラパス」がボゴタのカードに当たった件は、
ボゴタのカードが「リマ・キト・ラパスとは違い鉄道が海に届かなかった」と
触れているだけで、設問(ボリビアの二つの首都のどちらが行政府か)には
無関係でした)、いずれも国名などの一般的な語句が別の文脈でたまたま
一致した誤検知に見えます。ただし39問すべてを1件ずつ確認したわけでは
ないので、断定はしていません。焼き直し後に本物の`check-quiz.mjs`で
確認いただき、本物の漏れがあれば教えてください(直します)。

## 46都市目「ベレン」の追加について(2026-08-14)

ブラジルの大西洋岸(選んだ4都市が全部コルンバ/タバチンガ/フォス・ド・
イグアス/ウルグアイアナという西・南の国境町だった)が空いているというご
指摘を受け、ベレンを1件追加しました(45→46都市、57→58路線)。

- **ナタウは見送りました。** ブラジルの自国盤面(`brazil/cities.mjs`)を
  読んだところ、想定していた「アフリカに最も近い」＋第二次大戦の
  トランポリン・ダ・ヴィトーリア空路のファクトが、既存の`natal`項目と
  実質同一だったためです。ベレンのほうは、ブラジル盤面が
  「ヴェル・オ・ペーゾ市場・シリオ・ジ・ナザレ」の切り口で書いているのに
  対し、こちらは「アマゾン水系全体の出口(河口)」という別の切り口で書き、
  盤面に既にあるレティシア・タバチンガ(アマゾン上流の国境の町)とつながる
  大陸規模の話にしました。
- **「1か国4都市」の上限をブラジルだけ1件超えています**(4→5)。
  team-lead自身のご提案・確認済みの例外という理解です
  (密度予算1620×2500÷46≒88,000px²は他都市と同水準)。
- **地方は`riv`(川の国境)に入れています。** ベレン自体は国境の町では
  なくアマゾン水系の出口ですが、他5都市(レティシア・サンカルロス・デ・
  リオネグロ・コルンバ・タバチンガ・プエルトスアレス)と同じ「アマゾン・
  パンタナールの水系」という軸でまとめました。地方名と厳密には一致しない
  点は`flavour.mjs`にコメントで残し、11月の季節文の不一致と同じ扱いに
  しています。
- **路線は`tabatinga–belem`の1本を追加**(既存57本の末尾に追記。
  途中への挿入はしていません)。アマゾン本流を下る旅客船の実在ルートに
  相当します。直線距離は約723px(seg100でおよそ7区間)、自作の点内
  判定で全区間が陸地ポリゴンの中を通ることは確認済みですが、
  **`check-sea-routes.mjs`(実際の折れ方に基づく本検査)はまだ未実行**
  です(下記「まだ確認できていないこと」参照)。
- **座標の注意:** ベレンの実座標(-48.4902,-1.4558)は、マラジョ湾を
  跨ぐ簡略海岸線の外(海側)に落ちてしまうため、都市座標を湾の内側
  (西へ約0.25度、-48.75,-1.30)へ寄せています。海岸線側は変更していません。
- **art.mjs**: mark `riverexit`・bg `amazonmouth` を追加。マゼンタ台紙+
  隠れ帯の枠での目視確認済み(塗り残し無し)。新規ヘルパー関数
  `waterBuffalo`(マラジョ島の水牛)を1件追加しています。
- この追加により、既に登録いただいた `SOUTHAMERICA_SEASONS` /
  `SOUTHAMERICA_DOOM` / アイテム9件 / 厄災の鍵の登録内容(下記1〜7節)に
  **変更はありません**(新しい地方コード・アイテム・厄災は増やしていない
  ため)。焼き直しが必要なのは `cities.mjs` と `art.mjs` の2ファイルのみです。

## 焼き直しをお願いしたい3点(2026-08-14、ご指摘を受けて直しました)

1. **`SOUTHAMERICA_SEASONS`(`flavour.mjs`)12件すべてに欠けていた `f`
   フィールドを追加しました。** zodの検証で読み込みごと落ちていた原因です。
   もう一度importして12件とも`f`があることを確認済みです。
2. **`SOUTHAMERICA_DOOM`(同ファイル)3件に紛れ込んでいた余分な `months`
   キーを削除しました。**(huayco・creciente・zondaの3件。厄災に月を
   持たせる仕組みが無いことを理解していませんでした)
3. **下記6節の季節倍率表を、`and` が12か月中6回だったものを4回に
   減らして書き直しました。** `riv` の出番も1回から3回に増やし、
   全地方が2回以上登場するようにしています(car・guiは1回のまま、
   というご指摘どおり)。

**この3点により、下記6節の`SEASON_EFFECTS_BY_COUNTRY`は前回お渡しした
版から内容が変わっています。**すでに登録いただいた分の差し替えを
お願いします。

## 厄災の鍵の衝突について

**`aduana` → `aduana-sudamericana`、`bloqueo` → `bloqueo-sudamericano`に
改名いただいたことを確認しました。**`flavour.mjs`・絵のファイル名
(`southamerica-aduana-sudamericana.tsx` / `southamerica-bloqueo-sudamericano.tsx`)
とも新しい名前になっていることを確認済みです。以下の各節は、この
改名後の名前で書いています。

## 1. `scripts/extract-legacy-content.mjs`

import行(既存の import 群の下あたりに):

```js
import { buildSouthAmericaContent } from "./countries/southamerica/index.mjs";
```

`AUTHORED_COUNTRIES` 配列への追加行:

```js
const AUTHORED_COUNTRIES = [
  // ...既存の並び...
  buildSouthAmericaContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の `CURRENCY_MULTIPLIERS`

```js
  // US$120,000 → 開始資金1200×100(team-lead指定)。
  southamerica: 100,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  southamerica: () => import("./southamerica.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  southamerica: () => import("../content/southamerica.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

`ITEM_EFFECT_BY_LEGACY_KEY` の末尾に:

```ts
  // South America
  harpia: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  salvoconducto: { type: "choose-exact-dice" },
  trasandino: { type: "roll-fixed-dice", diceCount: 2 },
  alasnubes: { type: "roll-fixed-dice", diceCount: 3 },
  ojodevenado: { type: "none" }, // 厄災の神(エル・トゥンチェ)のward item(passive)
  palosanto: { type: "repel-spirit" },
  amauta: { type: "quiz-save" },
  escudo: { type: "gain-cash", amount: 380 },
  sacoleiro: { type: "extra-turn" },
```

新たに使う9件(harpia salvoconducto trasandino alasnubes ojodevenado palosanto
amauta escudo sacoleiro)は、いずれもケチュア語・スペイン語・ポルトガル語の
南米固有の語(harpia=オウギワシ、salvoconducto=通行許可証、trasandino=
トランスアンディーノ鉄道、alasnubes=雲への列車、ojodevenado=鹿の目の種、
palosanto=聖なる木、amauta=インカの学者教師、escudo=植民地時代の金貨、
sacoleiro=国境の日帰り商人)から選び、着手時点(2026-08-14)の焼き上がり
目録248件とは衝突していないことを確認済みです。他の担当が同時に鍵を
決めている状況のため、最終的な突き合わせをお願いします。

```
node -e 'const ids=require("./src/infrastructure/content/country-index.json").map(c=>c.id);
const k=new Set(); for(const i of ids){Object.keys(require(`./src/infrastructure/content/${i}.content.json`).items).forEach(x=>k.add(x))}
console.log([...k].sort().join(" "))'
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

`SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん(4月始まり。**この表は
差し替え版です**):

```ts
  /**
   * 南アメリカ大陸。メンドーサの収穫終わり(4月) → アマゾンの乾季で
   * 川が通りやすくなる(5月) → インティ・ライミとアンデスのスキー開幕
   * (6月) → フリアヘの寒波でアマゾン・アンデスが沈む(7月) →
   * パチャママの月(8月) → チリのディエシオチョ(9月) → アタカマの
   * 花咲く砂漠とアマゾン乾季の観光(10月) → 死者の日の代わりに
   * ラプラタ側の秋の観光(11月) → 真夏のクリスマス(12月) → パタゴニアの
   * 短い夏の観光(1月) → 大陸各地のカーニバル(2月) → アンデスの峠が
   * 雪で閉じ交易が滞る(3月)、という流れ。
   *
   * **地方の偏りについて(2026-08-14、指摘を受けて直した版):**
   * `and`(アンデス、11都市)を6回から4回に減らし、`riv`(川の国境、
   * 5都市)を1回から3回に増やした。最終的な出番は
   * car1 / gui1 / riv3 / and4 / atc4 / pla4 で、`pla`(15都市、最大の
   * 地方)と同じ4回の水準に `and`・`atc` を揃え、`riv` も3回まで
   * 底上げしている。`car`・`gui` が1回ずつなのは指摘のとおりそのままにした
   * (都市数・路線数がもともと少ない地方であるため)。
   */
  southamerica: [
    /* 0 Apr メンドーサの収穫終わり */ [
      { op: "region-income-multiplier", regionId: region("pla"), multiplier: 1.2 },
    ],
    /* 1 May アマゾンの乾季で川が通りやすくなる */ [
      { op: "region-income-multiplier", regionId: region("riv"), multiplier: 1.1 },
    ],
    /* 2 Jun インティ・ライミ(クスコ)とアンデスのスキー開幕 */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("atc"), multiplier: 1.15 },
    ],
    /* 3 Jul フリアヘの寒波(アマゾン・アンデスが沈む) */ [
      { op: "region-income-multiplier", regionId: region("riv"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 0.9 },
    ],
    /* 4 Aug パチャママの月(アンデス各地の供物) */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.2 },
    ],
    /* 5 Sep チリのディエシオチョ(独立記念日) */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("atc"), multiplier: 1.3 },
    ],
    /* 6 Oct アタカマの花咲く砂漠とアマゾン乾季の観光 */ [
      { op: "region-income-multiplier", regionId: region("atc"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("riv"), multiplier: 1.15 },
    ],
    /* 7 Nov ラプラタ側の秋の観光(死者の日はandの豆知識にのみ残す) */ [
      { op: "region-income-multiplier", regionId: region("pla"), multiplier: 1.1 },
    ],
    /* 8 Dec 真夏のクリスマス */ [
      { op: "all-players-gain-cash", amount: 280 },
      { op: "region-income-multiplier", regionId: region("pla"), multiplier: 1.15 },
    ],
    /* 9 Jan パタゴニアの短い夏の観光シーズン */ [
      { op: "region-income-multiplier", regionId: region("pla"), multiplier: 1.3 },
    ],
    /* 10 Feb 大陸各地のカーニバル(バランキージャ・マシュラマニ・エンカルナシオン) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("car"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("gui"), multiplier: 1.15 },
    ],
    /* 11 Mar アンデスの峠が雪で閉じ、交易が滞る */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("atc"), multiplier: 0.85 },
    ],
  ],
```

**季節の物語文(`flavour.mjs` の `SOUTHAMERICA_SEASONS`)は変更していません。**
11月は`flavour.mjs`側では引き続き「死者の日」の物語のままですが、上の
効果表では`and`をこれ以上増やさないため、効果は`pla`側に振っています
(物語と数値の地方が一致しない月が1つできていますが、他の月は一致して
います)。気になるようであれば、11月の効果を`and`の小さめの倍率
(1.1程度)に戻して`pla`を7回中3回に留める案も可能です。判断をお任せします。

`DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件(7種の効果それぞれ1件ずつ。
**鍵は改名後の `aduana-sudamericana` / `bloqueo-sudamericano`**):

```ts
  // South America
  huayco: "loseProperties", // アンデスの土石流が線路沿いの資産を押し流す
  creciente: "percentLoss", // アマゾンの増水で商品・現金の一部が水浸しになる
  camanchaca: "skipTurn", // 太平洋岸の朝霧でバスが立ち往生し足止め
  "aduana-sudamericana": "steal", // 国境の税関職員が「不足した書類」を口実に金品を取る
  "bloqueo-sudamericano": "payOthers", // 道路封鎖の通行料・迂回の手配で周りに金を払う
  zonda: "fine", // アンデスから吹く熱風の被害で修繕費がかかる
  tunchesilba: "teleport", // エル・トゥンチェの口笛に化かされ、別の場所へ迷い込む
```

## 7. `src/presentation/components/events/dooms/index.ts`

import行(**鍵は改名後の名前**):

```ts
import { SouthamericaAduanaSudamericana } from "./southamerica-aduana-sudamericana";
import { SouthamericaBloqueoSudamericano } from "./southamerica-bloqueo-sudamericano";
import { SouthamericaCamanchaca } from "./southamerica-camanchaca";
import { SouthamericaCreciente } from "./southamerica-creciente";
import { SouthamericaHuayco } from "./southamerica-huayco";
import { SouthamericaTunchesilba } from "./southamerica-tunchesilba";
import { SouthamericaZonda } from "./southamerica-zonda";
```

登録簿への追加行:

```ts
  "southamerica-aduana-sudamericana": SouthamericaAduanaSudamericana,
  "southamerica-bloqueo-sudamericano": SouthamericaBloqueoSudamericano,
  "southamerica-camanchaca": SouthamericaCamanchaca,
  "southamerica-creciente": SouthamericaCreciente,
  "southamerica-huayco": SouthamericaHuayco,
  "southamerica-tunchesilba": SouthamericaTunchesilba,
  "southamerica-zonda": SouthamericaZonda,
```

`src/presentation/components/events/dooms/dooms.test.ts` の `DOOM_IDS` にも
1行足していただく必要があります(現状 japan/bolivia/india の3か国だけが
書かれています):

```ts
  southamerica: ["huayco", "creciente", "camanchaca", "aduana-sudamericana", "bloqueo-sudamericano", "zonda", "tunchesilba"],
```

## 焼く前に確認済みのこと(このリポジトリ内で完結する範囲)

- **海陸判定(`check-sea-routes.mjs`)**: 58路線(`tabatinga–belem`込み)を
  実測いただき、0本(2026-08-14再測)。`arica–antofagasta` は海岸線側
  (イキケの頂点)を沖へ押し出して直したもので、以後の座標変更はしていません。
- **点内判定・自己交差の自作チェック**: 46都市とも陸地ポリゴンの内側、
  MAINLAND(85点)・FUEGO(10点)とも自己交差0件(繰り返し確認済み。
  ベレン追加後も再実行し、46都市全件で確認)。
- **4言語の欠け**: `cities.mjs`(46都市)・`quiz.mjs`(101問、うち追加62問は
  今回)・
  `money-events.mjs`(25件)・`flavour.mjs`(アイテム9・厄災7・季節12、
  `f`追加後の再確認込み)をすべてimportし、`t()`が投げる例外が0件で
  あることを機械的に確認。
- **`SOUTHAMERICA_SEASONS` の `f` フィールド**: 12件とも存在することを
  importして機械的に確認(今回の焼き直しの原因)。
- **`SOUTHAMERICA_DOOM` の余分な `months` キー**: 3件とも削除済みで
  あることを確認(`'months' in d` で総当たり)。
- **art.mjsの塗り残し・要素消失**: 45背景すべてをマゼンタ台紙+隠れ帯
  (横151〜249・縦54〜152)の枠を重ねてplaywrightでスクリーンショットし、
  5列×9行の一覧で全数目視。塗り残し1件(クスコ、sky第3引数のずれ)、
  要素消失1件(シウダーデルエステ、水面の全幅塗りが手前の絵より後に
  書かれていた)を見つけて直した。密度は平均41.1要素/枚(目安40)。
  **ベレン追加分(`amazonmouth`)も同じ方法で個別確認済み**(マゼンタの
  露出無し。sky第3引数98=ground開始y98で一致)。
- **厄災の絵7枚**: `viewBox="0 0 400 210"` / `prefers-reduced-motion` /
  `<text` 不使用 / `animation:...infinite` / `aria-hidden` / 外部URL不参照、
  の6点をすべて機械的に確認(grepで1枚ずつ)。`npx eslint` と
  `npx tsc --noEmit` も実行し、警告・エラー0件。
- **アイテムの鍵9件**: 上記のとおり、着手時点(2026-08-14)の焼き上がり
  目録248件と衝突していないことを確認済み。

## まだ確認できていないこと(焼いたあとにお願いしたいこと)

- `node scripts/check-quiz.mjs southamerica` — 追加62問ぶんは、上の節に
  書いたとおり自作の同等ロジックで確認済みですが、本物のスクリプトでの
  確認はまだです。既存39問の17件の「漏れ?」もあわせて見ていただきたいです。
- `node scripts/check-city-backgrounds.mjs` — マゼンタ台紙での目視は
  自作のplaywrightスクリプトで行いましたが、本物のスクリプトでの
  確認はしていません。
- `npx vitest run src/presentation/components/events/dooms/dooms.test.ts` —
  上記6点はgrepで個別確認しましたが、このテスト自体はまだ実行していません
  (`DOOM_IDS` に南アメリカがまだ登録されていないため、登録後にお願いします)。
- クイズ101問を含めた本検査一式(zodの読み込みなど)。ここまでの2回の
  焼き直しはいずれも通っているので、大きな崩れは無いはずですが、今回の
  62問追加分はまだ一度も焼いていません。

`check-sea-routes.mjs`(58路線・0本)は前回の焼き直しで確認済みです。

## 検算メモ

- `npx eslint scripts/countries/southamerica/*.mjs src/presentation/components/events/dooms/southamerica-*.tsx` は
  警告0件(未使用の絵の部品は無し)。
- `npx tsc --noEmit` は南アメリカ関連ファイルに関するエラー0件
  (厄災tsx作成後に実行)。
- `buildSouthAmericaContent()` を直接呼び出して確認: 都市46・路線58・
  クイズ101(難易度1:5/2:6/3:10/4:13/5:12/6:13/7:13/8:13/9:9/10:7、
  正解位置0:34/1:33/2:34)・アイテム9・厄災7・季節12・出来事25・
  マーク46・背景46・地形帯9・河川3・湖沼1・ラベル11、いずれもエラー無し
  (ベレン追加・クイズ拡張の両方を反映して再実行して確認)。
  **ただしこの呼び出しはzodの検証を通らないため、`f`欠落を見つけられ
  なかった。**次はこの種の欠けを機械的に拾う手段(zodスキーマを
  こちらでも参照する、など)を検討したい。
