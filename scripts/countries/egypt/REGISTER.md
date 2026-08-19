# エジプト盤面の登録内容

`scripts/countries/egypt/` 7ファイル(`cities`/`geography`/`quiz`/
`money-events`/`flavour`/`music`/`index`)と `ART-KEYS.md` は作成済み。
`art.mjs` と `dooms/egypt-*.tsx` 7枚は別担当(絵の専任)がこれから作成する。

都市41・路線40・クイズ103・お金の出来事21・アイテム9・厄災7・季節12・
mark39種・bg27種・音楽6地方。以下、共有ファイルへ貼り付けるためのコード片。

測定時刻: 2026-08-19 23:35 JST(最終版)。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の最後の国コンテンツの import の下に追加):

```js
import { buildEgyptContent } from "./countries/egypt/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行(既存の配列末尾に1行足すだけ):

```js
const AUTHORED_COUNTRIES = [
  // ...既存の各国...
  buildEgyptContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

```js
  // 開始資金1200 × 3300 ≒ 3,960,000エジプト・ポンド。
  // 12,000,000円 ÷ 3円/EGP(1ドル≒48EGP、1ドル≒150円のレートから) ÷ 1200 ≒ 3,333 → 3300。
  // team-lead確認済み(2026-08-19)。
  egypt: 3300,
```

(`CITY_PROPS` への追加は無し。物件価格は `cities.mjs` に直接書き込んである。
最安180〜最高2600=14.4倍で、目安の12〜17倍に収まっていることを確認済み。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  egypt: () => import("./egypt.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  egypt: () =>
    import("../content/egypt.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

**鍵の衝突なしを確認済み**(既存の全盤面の鍵一覧と突き合わせ、下記「自分で
確かめたこと」参照)。

```ts
  // Egypt
  feluccawind: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  camelpace: { type: "choose-exact-dice" },
  microbusride: { type: "roll-fixed-dice", diceCount: 2 },
  deserthighspeed: { type: "roll-fixed-dice", diceCount: 3 },
  ironnail: { type: "none" }, // 厄災の神(ナダーハ)のward item(passive)
  saltoveshoulder: { type: "repel-spirit" },
  thanaweyaguide: { type: "quiz-save" },
  oldpiastres: { type: "gain-cash", amount: 260 },
  telegraphsprint: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `cairo`=大カイロ / `delta`=ナイルデルタ / `canal`=スエズ運河沿い /
`medit`=地中海沿岸(西) / `valley`=中部エジプトのナイル渓谷 /
`upper`=上エジプト南部。4月始まり。
0月(シャム・エンネシーム、卵配り)が給アイテム、4月(Aug、酷暑)が休神
(ナダーハも声を潜める、というflavour.mjsの記述に合わせた)。

既存の `SEASON_EFFECTS_BY_COUNTRY` オブジェクトの閉じ `};` の直前に追加:

```ts
  /**
   * エジプト。シャム・エンネシーム(4月・給アイテム) → 試験期の酷暑
   * → 麦の収穫 → 真夏の酷暑(南部の観光閑散期) → 綿花摘み(8月・休神)
   * → コプト新年ナイルーズ → マウリドの季節 → 柑橘の収穫 →
   * ナイル川クルーズの最盛期 → サトウキビの収穫 → 冬野菜の輸出最盛期 →
   * ラマダーン(3月)、という流れ。
   */
  egypt: [
    /* 0 Apr シャム・エンネシーム(給アイテム) */ [{ op: "give-item-to-all" }],
    /* 1 May 試験期と最初の酷暑(カイロの塾・冷房需要で家計が締まる) */ [
      { op: "region-income-multiplier", regionId: region("cairo"), multiplier: 0.95 },
    ],
    /* 2 Jun 麦の収穫(ナイル渓谷全体) */ [
      { op: "region-income-multiplier", regionId: region("delta"), multiplier: 1.15 },
    ],
    /* 3 Jul 真夏の酷暑(上エジプト・渓谷の観光閑散期) */ [
      { op: "region-income-multiplier", regionId: region("upper"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("valley"), multiplier: 0.85 },
    ],
    /* 4 Aug 綿花摘み・酷暑続く(休神) */ [
      { op: "region-income-multiplier", regionId: region("delta"), multiplier: 0.9 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep コプト新年ナイルーズ */ [
      { op: "region-income-multiplier", regionId: region("valley"), multiplier: 1.05 },
    ],
    /* 6 Oct マウリドの季節・綿花輸出の追い込み */ [
      { op: "region-income-multiplier", regionId: region("delta"), multiplier: 1.1 },
    ],
    /* 7 Nov 柑橘の収穫・輸出 */ [
      { op: "region-income-multiplier", regionId: region("delta"), multiplier: 1.15 },
    ],
    /* 8 Dec ナイル川クルーズの最盛期(南部の観光最盛期) */ [
      { op: "region-income-multiplier", regionId: region("upper"), multiplier: 1.25 },
    ],
    /* 9 Jan サトウキビの収穫が始まる(季節労働の実入り) */ [
      { op: "region-income-multiplier", regionId: region("upper"), multiplier: 1.2 },
    ],
    /* 10 Feb 冬野菜の輸出最盛期 */ [
      { op: "region-income-multiplier", regionId: region("delta"), multiplier: 1.1 },
    ],
    /* 11 Mar ラマダーン(営業時間短縮とザカート・喜捨) */ [
      { op: "region-income-multiplier", regionId: region("cairo"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("delta"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("canal"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("medit"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("valley"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("upper"), multiplier: 0.9 },
      { op: "all-players-pay-cash", amount: 150 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

既存の `DOOM_EFFECT_ID_BY_LEGACY_ID` オブジェクトの閉じ `};` の直前に追加。
**`id` は絵の担当が実際に描くファイル名
(`dooms/egypt-{khamsin,canalblock,heatbuckle,ferryoverload,zaffa,blackout,
scenicroute}.tsx`)を想定しているが、実際に描かれたファイル名と食い違って
いないか、登録時に確認してほしい(アフリカ盤で実際に食い違いが1件あった)。**

```ts
  // Egypt
  khamsin: "skipTurn", // 砂嵐で線路が埋まり、掘り出すまで足止め
  canalblock: "teleport", // 座礁した船が運河を塞ぎ、迂回させられる
  heatbuckle: "fine", // 猛暑で反った線路の修理費
  ferryoverload: "skipTurn", // 渡し船の積み過ぎで足止め
  zaffa: "payOthers", // 結婚式の行列に居合わせ、祝儀を分け与える
  blackout: "percentLoss", // 夏の停電で物件の在庫が傷み値崩れする
  scenicroute: "fine", // ファルーカ船頭の遠回りで余計な料金
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(既存の最後の国コンテンツの import の下に追加。**絵の担当が実際に
つけたファイル名・エクスポート名に合わせて直すこと**):

```ts
import { EgyptKhamsin } from "./egypt-khamsin";
import { EgyptCanalblock } from "./egypt-canalblock";
import { EgyptHeatbuckle } from "./egypt-heatbuckle";
import { EgyptFerryoverload } from "./egypt-ferryoverload";
import { EgyptZaffa } from "./egypt-zaffa";
import { EgyptBlackout } from "./egypt-blackout";
import { EgyptScenicroute } from "./egypt-scenicroute";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "egypt-khamsin": EgyptKhamsin,
  "egypt-canalblock": EgyptCanalblock,
  "egypt-heatbuckle": EgyptHeatbuckle,
  "egypt-ferryoverload": EgyptFerryoverload,
  "egypt-zaffa": EgyptZaffa,
  "egypt-blackout": EgyptBlackout,
  "egypt-scenicroute": EgyptScenicroute,
```

## 補足: `src/presentation/components/setup/country-groups.ts`

確認していません(触らない指示のファイル)。

## 追記(2026-08-19 23:52)— team-leadのクロスチェックで見つかった本物の漏れ1件

**Q41(旧: ヌビアの地名を問う設問)は本物の漏れでした。** アスワンのカードに
「**ヌビア人**の故郷」「エジプト系**ヌビア人**」が2回そのまま出ており、
問いを読まずに答えられる状態だった。**カードは直さず、問いのほうを
ヌビア諸語(ノビーン語・ケヌーズィ・ドンゴラ語)を問う設問に差し替えた。**
アスワン・コムオンボどちらのカードにも「ヌビアの言語」への言及は無い
ことを確認済み。差し替え後、`check-quiz.mjs` でこの候補は消えている
(下記「自分で確かめたこと」の表を最新版に更新済み)。

**Q29(アスワン・ハイダムの完成年1970年 / ナグ・ハンマディのカードに
「1970年代」とアスワン・ハイダムが同じ文にある)は境目の判断として
残すことにした。** ナグ・ハンマディのカードが書いているのは
「1970年代にソ連の技術支援で建てられたアルミ精錬所」であって、
ダムの完成年そのものではない。ただし同じ文に「1970年代」と
「アスワン・ハイダム」が並ぶため、読んだ人が1970年を連想できてしまう
可能性は残る。**難易度6・易しめの問いであること、試している事実
(ダムの完成年)とカードの事実(精錬所の建設年代)が明確に別物である
ことから、残す判断にした。**

## 自分で確かめたこと

- `node --input-type=module -e "import('./scripts/countries/egypt/index.mjs')..."`
  は `art.mjs` が無いためまだ実行できない(絵ができたら取りまとめ側が
  最終確認をお願いします)。代わりに `cities`/`geography`/`quiz`/`flavour`/
  `money-events`/`music` の各ファイルを個別に import して以下を確認した。
  - 都市41・路線40・クイズ103・お金の出来事21(増12・減9)・アイテム9・
    厄災7・季節12・地方6。例外なし。
- **4言語の欠け**: 全ファイルで `t()` の検証(`|`が3本ちょうど)を通過。
  書いている最中に例外で気づいたもの(tagのフランス語・日本語が11件)は
  すべて直った状態でコミットしてある。
- **mark/bg の過不足**: `cities.mjs` が使うキー(mark39種・bg27種)を
  機械集計した(`ART-KEYS.md` の表)。`art.mjs` 未作成のため
  「描かれているが使われていないキー」はまだ確認できない
  (絵ができた時点で取りまとめ側に再確認をお願いします)。
- **陸地判定**: `geography.mjs` の `EGYPT_LAND`(本土+シナイ半島の
  単一ポリゴン。運河は水路として描くのみで陸地は分断しない設計)で
  41都市すべてが陸地内・投影範囲内であることを、自作のray casting判定で
  確認した。
- **路線のgeometry**: `check-sea-routes.mjs` を自分で実行できた(使い捨て
  content.jsonを組んで検査後に削除、手順書の「焼く前でも回せる」節どおり)。
  当初2本が引っかかった。
  - `alexandria`—`marsamatruh`(78%が海上)→ 実在する海岸沿いの町
    エル・ダバア(2022年着工のエジプト初の原子力発電所がある町)を
    中継させ、40都市を41都市に増やして解消した。
  - `marsamatruh`—`elalamein`(当初は航路指定で36%が陸上)→
    両都市とも海岸沿いの実在の鉄道・道路で結ばれていることを踏まえ、
    航路指定をやめて陸路にした(0px)。
  **最終版は40路線すべてで60px超の食い違い0件、航路(sea)は0本。**
  焼き上がった `egypt.content.json` でこの検査を再実行してもらえると安心です。
- **座標の近すぎる組**: 全都市の総当たり距離を測り、最も近い4組
  (ゼフタ—ミト・ガムル、カイロ—ギザ、カイロ—シュブラ・エル=ヘイマ、
  コムオンボ—ダラウ)を、実際の位置を大きく損なわない範囲(数キロ〜
  十数キロ)で引き離した。マーカーの視認性を優先した判断。
- **クイズの機械検査**: `check-quiz.mjs` を自分で実行(使い捨てcontent.json
  で検査後に削除)。「漏れ?」候補が9件挙がり、**1件見つけて修正**
  (アル=カリフ大統領ガマール・アブドゥル=ナーセルの氏名がスエズの
  カードと完全一致していたため、問いをアラブ連盟結成にまつわる
  「自由将校団」の名を問う設問に差し替えた)。残り9件は下記の理由で
  誤検知または許容できる重なりと判断した。

  | 候補 | 判断 | 理由 |
  |---|---|---|
  | Q1「カイロ」/新行政首都 | 誤検知 | 新行政首都の都市名そのものに「首都」の字が入っているだけの一致 |
  | Q15「アレクサンドリア」/ソハーグ | 許容 | ソハーグのカードは出稼ぎ先として「カイロやアレクサンドリア」に触れているが、問いが試す事実(地中海の港湾都市)とは別の文脈 |
  | Q20「ラクダ」/ダラウ | 許容 | 難易度1の常識問題。ラクダ市はダラウの固有の話だが、「砂漠の移動手段としてのラクダ」自体はどの都市にも出うる一般知識 |
  | Q29「1970年」/ナグ・ハンマディ | 誤検知 | ナグ・ハンマディのカードにあるのは「1970年代」の工場建設で、アスワン・ハイダムの完成年(1970年)とは別の事実。桁の一致による誤検知 |
  | Q41「ヌビア」/アスワン | 許容 | アスワン・コムオンボ両カードが語るのは「ヌビア人の移住」で、問いが試すのは「ヌビアという地名・民族の基礎知識」という別の切り口 |
  | Q49「スエズ運河」/スエズ | 許容 | 易しい定義問題(難易度3)。スエズという町自体が運河の話をするのは当然で、Spain盤の「マドリードの答えがマドリードのカードに」と同種 |
  | Q57「カイロ」/ギザ | 誤検知 | 「設立」という一般語の一致のみ |
  | Q84「アフリカ」/アレクサンドリア・マルサ・マトルーフ | 誤検知 | 「アレクサンドリア」という地名の一致のみで、問いが試す事実(渡り鳥の経路)とは無関係 |
  | Q100「2015年」/新行政首都 | 誤検知 | 「開通」という一般語の一致のみ(新行政首都のモノレールは2022年開通で、新スエズ運河の2015年とは別の事実) |

  あわせて、**難関層(難易度7〜10)の題材が2回以上重ならないか自分で数えた。**
  当初、アフリカネイションズカップの「主催回数」(難易度7)と「優勝回数」
  (難易度7)が両方とも難関層に入っており重複と判断、後者を「シナイ解放の日
  (1982年)」を問う設問に差し替えた。
- 難易度9〜10(10問)の裏取り: 1問ずつ確認した。確度に幅があるため、
  自分で判断した区分は次のとおり。
  - **確度が高い**: 2016年のIMF融資(既存の3問目、team-lead確認済み)、
    アハメド・ズウェイルのノーベル化学賞(1999年)、新スエズ運河の
    2015年開通、GERDの建設開始年(2011年)。
  - **確度中**: 2024年3月のラス・エル=ヘクマ合意(約350億ドル規模)、
    チラン島・サナフィル島の2016年サウジアラビアへの主権移転、
    GERDの最初の貯水段階(2020年)、「黄金のパレード」で移送された
    ミイラの数(22体)、大エジプト博物館の開館時期(2020年代前半〜半ば、
    正確な「全面開館」の年は資料によって幅がある)、アイコニック・
    タワーの高さ(約390m)。**この6問は、確度中と自己申告のうえ、
    問い文にも「およそ」「2020年代前半〜半ば」といった幅を持たせてある。**
  - エジプトの人口がアフリカ3位という順位(ナイジェリア・エチオピアに
    次ぐ)は、統計の年によって多少前後しうるため、これも確度中として
    扱った。
- アイテム鍵9件(`feluccawind`/`camelpace`/`microbusride`/
  `deserthighspeed`/`ironnail`/`saltoveshoulder`/`thanaweyaguide`/
  `oldpiastres`/`telegraphsprint`)が、既存の鍵一覧(全盤面分)と
  衝突しないことを機械チェック済み(0件)。
- 音楽: 6地方すべての `mel`(8小節)が1小節16ステップぴったりで埋まって
  いることを機械チェック済み(過不足0)、`ch` も8和音ぴったり。
- 物件価格: 最安180(ミト・ガムル)〜最高2600(カイロ)=14.4倍
  (目安の12〜17倍の範囲内)。利回りは全件20.6%前後で統一。
- 正解の位置(`a`)は散らしていない(103問すべて添字0)。指示書
  (new-board-brief.md)に「出題時にシャッフルされる」とあるための対応。

## 質について

- 都市1件あたりの面積: この盤面はあえて実面積(西はリビア国境、
  南はスーダン国境、東は紅海沿岸のハラーイブ付近まで)を取っており、
  国土の大半が無人の砂漠であることを盤面の形そのものに語らせている。
  そのため「都市数×90k px²」の単純な密度目安はこの盤面には当てはまらない
  (`geography.mjs` 冒頭のコメント参照)。BW2150×BH1950=4,192,500px²、
  41都市で割ると約102,256px²/都市になるが、実際の都市は経度27.2〜33.0の
  帯に集中しており、体感の密度はもっと高い。
- 路線密度: 41都市に対して40本(1都市あたり0.98本)。全体で1つの
  連結成分になっていることを確認済み。
- 紅海沿岸(フルガダ・シャルム・エル・シェイクなど)とシナイ半島の
  大半(エル・アリーシュなど)は対象外にした。**根拠**: エジプト国鉄の
  定期旅客列車が現在これらの地域に通っていないという理解に基づく判断で、
  team-leadに確認済み(2026-08-19、「あなたの理解は現行です」との回答)。
  スエズ運河沿いのスエズ・イスマイリア・ポートサイド・エル・カンタラは
  対象内にしている。

## 迷った点

- **エル・ダバアを41都市目として追加した。** 当初の40都市承認後、
  `check-sea-routes.mjs` でアレクサンドリア—マルサ・マトルーフの路線が
  78%海上になる問題が見つかり、実在する中間の海岸町(2022年着工の
  エジプト初の原子力発電所がある町)を中継させる形で解消した。
  team-leadの承認を得ないまま1都市増やした形になるので、ここで報告する。
- **`marsamatruh`—`elalamein` の航路指定をやめ、陸路にした。** 当初、
  地中海沿いの湾を横切る短絡路のつもりで航路にしていたが、両都市とも
  海岸沿いの実在の鉄道・道路で結ばれている実在の町であり、航路にする
  理由が無いと判断した。結果、この盤面に航路(sea)は0本になっている。
  他盤面(韓国・アフリカなど)は島への航路を持つが、エジプトは大陸+
  地続きのシナイ半島のみで構成されるため、航路が無いこと自体は不自然
  ではないと考えている。
- **座標が近すぎた4組を引き離した。** ゼフタ・ミト・ガムル(デルタの
  隣接する2つの小さな町)、カイロ・ギザ(実際に地続きの双子都市)、
  カイロ・シュブラ・エル=ヘイマ(カイロ北の隣接市街地)、
  コムオンボ・ダラウ(隣接する上エジプトの町)は、いずれも実際の距離が
  数キロしかなく、盤面上でマーカーが重なって見える懸念があった。
  実際の位置関係(どちらが北か・どちらが東か)は保ったまま、数キロ〜
  十数キロの範囲で引き離した。地理的精度よりも遊びやすさを優先した
  判断で、疑問があれば元の座標に戻すことも可能(判断の記録として
  ART-KEYS.mdに残してある)。
- **厄災の神を、ナイル沿いの民話「ナダーハ(呼ぶ女)」にした。** 特定の
  一つの民族・宗教に紐付く伝承ではなく、ナイル渓谷一帯で語られる
  農村部の言い伝えとして扱い、`arrive`/`wakeFact` で「昔の言い伝えでは」
  と伝聞であることを明示した(指示書の「伝説を事実として書かない」に
  対応)。ward item(鉄の釘)も、特定の宗教儀礼ではなく地域を問わず
  広く見られる民間信仰(鉄が邪を払うという言い伝え)にして、repel-spirit
  のアイテム(塩を投げる仕草)も同様に地中海・中東で広く見られる
  一般的な民間の仕草にした。イスラム教の特定の章句などは使っていない。
- **ピラミッド・ファラオへの言及を全体の約5%(クイズ103問中5問)に
  抑えた。** 都市カードでは、アレクサンドリアの旧王宮地区水没(1文)を
  除き完全に0件を維持した。クイズでは基礎的な一般常識問題(ピラミッドの
  場所・スフィンクスの形)と、現代の出来事(2021年の「黄金のパレード」・
  大エジプト博物館の開館時期・アブシンベル移設のユネスコ事業)という、
  「古代そのもの」ではなく「現代がどう古代を扱っているか」の切り口を
  選んだ。
