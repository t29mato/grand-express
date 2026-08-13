# 北アメリカ登録用スニペット

取りまとめ側が以下7箇所に貼り付ける。**担当(自分)はこれらのファイルを直接編集していない。**

## 1. `scripts/extract-legacy-content.mjs`

import に追加(他の `buildXContent` の並びに合わせる):

```js
import { buildNorthAmericaContent } from "./countries/northamerica/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追加:

```js
  buildNorthAmericaContent(),
```

## 2. `scripts/content-overrides/property-economy.mjs`

通貨倍率。作業開始時の指示どおり `northamerica: 100`(US$120,000スタート)。

```js
  northamerica: 100,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追加:

```ts
  northamerica: () => import("./northamerica.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追加:

```ts
  northamerica: () => import("../content/northamerica.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts`

9件。既存キーと衝突しないことを確認済み(下記「確認したこと」参照)。

```ts
  // North America
  boxcar: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  officialguide: { type: "choose-exact-dice" },
  zephyr: { type: "roll-fixed-dice", diceCount: 2 },
  superchief: { type: "roll-fixed-dice", diceCount: 3 },
  worrydoll: { type: "none" }, // 厄災の神(エル・ソンブレロン)のward item(passive)
  cintaroja: { type: "repel-spirit" },
  cliffsnotes: { type: "quiz-save" },
  pieceseight: { type: "gain-cash", amount: 380 },
  handcar: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 季節(12ヶ月、`SEASON_EFFECTS_BY_COUNTRY` に追加)

`region()` は `arctic` / `pac` / `plains` / `atl` / `mex` / `canorth` / `casouth` /
`cargr`(8地方。中米を`canorth`/`casouth`に、カリブとバハマを`cargr`に
統合した最終版。旧版の`ca`/`car`はここでは使わない)。

```ts
  /**
   * 北アメリカ。中米のコーヒー開花(4月)→ウミガメの産卵(5月)→乾季の合間の雨
   * (6月)→バナナ収穫の盛り(7月)→ハリケーンシーズン開幕(8月・出費)→
   * コーヒー収穫本番(9月)→独立記念日ラッシュ(10月・休神)→北の紅葉(11月)→
   * 北の収穫祝日で鉄路混雑(12月・出費)→ポインセチアとポサーダ(1月・給アイテム)
   * →寒波の南下(2月)→乾季明けと保線(3月)、という流れ。北米(米加)は北半球の
   * 秋冬に、中米・カリブは乾季/雨季と収穫暦に沿わせてある。中米向けの効果は
   * canorth/casouthの両方に等しく掛けている(コーヒー・バナナは北部
   * 〔グアテマラ・ホンジュラス〕にも南部〔コスタリカ〕にもまたがる産業のため)。
   */
  northamerica: [
    /* 0 Apr 中米高地でコーヒーの花が咲く */ [
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.15 },
    ],
    /* 1 May ウミガメが産卵に上陸する */ [
      { op: "region-income-multiplier", regionId: region("cargr"), multiplier: 1.1 },
    ],
    /* 2 Jun 乾季の合間に雨が来る */ [
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.1 },
    ],
    /* 3 Jul バナナの収穫が盛りを迎える */ [
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.25 },
    ],
    /* 4 Aug ハリケーンシーズンが始まる(備えの出費) */ [
      { op: "all-players-pay-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("cargr"), multiplier: 0.85 },
    ],
    /* 5 Sep コーヒーの収穫が本格化する */ [
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("mex"), multiplier: 1.1 },
    ],
    /* 6 Oct 独立記念日が相次ぐ(休神) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.15 },
      { op: "rest-spirit" },
    ],
    /* 7 Nov 北の鉄路沿いに紅葉が広がる */ [
      { op: "region-income-multiplier", regionId: region("plains"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("atl"), multiplier: 1.2 },
    ],
    /* 8 Dec 収穫祝日で北の鉄路が混む(旅費がかさむ) */ [
      { op: "region-income-multiplier", regionId: region("plains"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("atl"), multiplier: 1.25 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 9 Jan ポインセチアとポサーダが南から北へ(新年の贈り物) */ [
      { op: "give-item-to-all" },
      { op: "region-income-multiplier", regionId: region("mex"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.1 },
    ],
    /* 10 Feb 寒波がふだんより南まで下がる */ [
      { op: "region-income-multiplier", regionId: region("mex"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 0.9 },
    ],
    /* 11 Mar 乾季が終わり、線路が開き直す */ [
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.1 },
    ],
  ],
```

### 厄災(7件、`DOOM_EFFECT_ID_BY_LEGACY_ID` に追加)

```ts
  // North America
  hurricane: "loseProperties",
  hielo: "percentLoss",
  cenizas: "fine",
  ventisca: "payOthers",
  "sombreron-trenza": "teleport",
  aduana: "skipTurn",
  "pickpocket-mercado": "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts`

```ts
import { NorthamericaHurricane } from "./northamerica-hurricane";
import { NorthamericaHielo } from "./northamerica-hielo";
import { NorthamericaCenizas } from "./northamerica-cenizas";
import { NorthamericaVentisca } from "./northamerica-ventisca";
import { NorthamericaSombreronTrenza } from "./northamerica-sombreron-trenza";
import { NorthamericaAduana } from "./northamerica-aduana";
import { NorthamericaPickpocketMercado } from "./northamerica-pickpocket-mercado";
```

`DOOM_ANIMATIONS` に追加:

```ts
  "northamerica-hurricane": NorthamericaHurricane,
  "northamerica-hielo": NorthamericaHielo,
  "northamerica-cenizas": NorthamericaCenizas,
  "northamerica-ventisca": NorthamericaVentisca,
  "northamerica-sombreron-trenza": NorthamericaSombreronTrenza,
  "northamerica-aduana": NorthamericaAduana,
  "northamerica-pickpocket-mercado": NorthamericaPickpocketMercado,
```

---

# 報告(3回目。17都市を復元し、59都市・8地方に組み直した)

## 経緯

前回、team-leadの区分表(arctic5/pac7/plains7/atl7=26)が国別上限(米10+加8=18)を
超えていた点を計算して指摘し、比率を保ったまま18に収める案
(arctic4/pac5/plains5/atl4)を出したところで、**中米・カリブの都市を
17件削って帳尻を合わせてしまった。** これは誤りで、team-leadの意図は
「北を厚くするために上限を緩めた」のであって「南を削れ」ではなかった。
目標は50都市、削る前は45都市だったので、本来は北へ10都市・ハイチへ1都市を
**足すだけ**でよかった。指摘を受けて、削った17都市を**全部復元**した。

## 件数(42→59都市に復元)

- 都市**59**(45+新規10+新規メキシコ3+ハイチ1)・路線**58**・クイズ36・
  お金の出来事18・アイテム9・厄災7・季節12・**地方8**
  (`arctic`/`pac`/`plains`/`atl`/`mex`/`canorth`/`casouth`/`cargr`)
- 都市シンボル(mark)4種・都市背景(bg)5種(既存を使い回し、増やしていない)
- 密度: 4,509,000px² ÷ 59 ≈ 76,000px²/都市(カナダ91,000・イタリア90,000と
  近い水準。団子にはならない)

## 地方構成(8地方。canorth/casouthは分離のまま、バハマはcargrに合流)

- `arctic`(4): fairbanks・skagway・dawsoncity・inuvik(米2・加2)
- `pac`(5): promontorysummit・craigellachie・fieldbc・pointroberts・truckee(米3・加2)
- `plains`(5): amherstburg・sarnia・niagarafallsny・fargo・porthuron(加2・米3)
- `atl`(4): calaismaine・rousespoint・saintjeansurrichelieu・portauxbasques(米2・加2)
- `mex`(7): chihuahua・ciudaddemexico・ciudadjuarez・veracruz・tijuana・nuevolaredo・merida
- `canorth`(10): guatemalacity・puertobarrios・quetzaltenango・belizecity・
  sanignacio・tegucigalpa・sanpedrosula・laceiba・sansalvador・santaana
- `casouth`(9): granada・managua・leonnicaragua・puertolimon・sanjose・
  cartago・colon・panamacity・portobelo
- `cargr`(15): havana・santiagodecuba・cienfuegos・kingston・montegobay・
  portantonio・caphaitien・santodomingo・puertoplata・
  santiagodeloscaballeros・sanjuanpr・ponce・mayaguez・**nassau・freeport**
  (バハマの2都市を、単独では薄すぎる`carbs`地方にせず`cargr`へ合流。
  team-leadから「あなたの判断で構わない」と預けられた判断で、そう決めた)

米加の内訳はアメリカ10(fairbanks・skagway・promontorysummit・
pointroberts・truckee・niagarafallsny・fargo・porthuron・calaismaine・
rousespoint)、カナダ8(dawsoncity・inuvik・craigellachie・fieldbc・
amherstburg・sarnia・saintjeansurrichelieu・portauxbasques)で、
それぞれ上限どおり。メキシコも7で上限どおり。

## 復元した17都市(削る前の切り口をそのまま復元)

パナマシティ・ポルトベロ・サンサルバドル・カルタゴ・サンホセ・
レオン(ニカラグア)・マナグア・サンペドロスーラ・ラセイバ・
サンイグナシオ・ケツァルテナンゴ・シエンフエゴス・ポートアントニオ・
サンティアゴデロスカバジェロス・マヤグエス・ナッソー・フリーポート。

内容(豆知識)はすべて削る前と同じテキストを再利用しており、書き直しはしていない。

## 路線の組み直し(46本の旧構成を土台に、59都市ぶんへ再構築)

地帯どうしの橋渡し7本(いずれも既存のまま。座標や意味は変えていない):
`dawsoncity-craigellachie`(arctic-pac)・`promontorysummit-fargo`
(pac-plains)・`rousespoint-niagarafallsny`(plains-atl)・
`promontorysummit-ciudadjuarez`(pac-mex)・`ciudaddemexico-guatemalacity`
(mex-canorth)・`tegucigalpa-granada`(canorth-casouth)・`colon-kingston`
(casouth-cargr。航路)。

canorth・casouth・cargrの内部路線は、59都市が同時に存在するのが今回が
初めてのため、実在の鉄道・道路のつながりに沿わせて新たに引いた:

- **canorth**: guatemalacityを結節点に、puertobarrios(カリブ海岸)・
  belizecity→sanignacio(ベリーズ)・quetzaltenango→santaana→sansalvador→
  tegucigalpa→sanpedrosula→laceiba(高地から大西洋岸バナナ鉄道まで)。
  **`santaana-guatemalacity`の直結は今回も置いていない**(サンタアナの
  豆知識「測量はされたが未完成」と矛盾するため)。quetzaltenango経由の
  高地の迂回に差し替えた。
- **casouth**: granadaを結節点に、managua→leonnicaragua(ニカラグア内)、
  sanjose→cartago→puertolimon(コスタリカのアトランティック鉄道)、
  sanjose→panamacity→colon→portobelo(パナマ運河地帯)。
- **cargr**: 既存8路線に、havana-cienfuegos・montegobay-portantonio・
  puertoplata-santiagodeloscaballeros・ponce-mayaguezの4本(島内の陸路)と、
  havana-nassau・nassau-freeport(いずれも航路。バハマをcargrへ合流させる橋渡し)
  の2本を追加。

全59都市・58路線でBFS連結性を確認済み(未到達0)。

## 海陸チェックへの対応(「端を西の港へ」の指示との整合)

team-leadの実焼き(旧45都市版)で`santiagodecuba–santodomingo`(陸76px・52%)
が基準超過と判明していた。指示は「端を西の港へ」だったが、**すでに
実装済みだった経路がその指示を満たしていた**と判断し、そのまま残した:

`santiagodecuba-caphaitien`(航路)+`caphaitien-santodomingo`(陸路)。

この経路は、イスパニョーラ側の端をサントドミンゴ(島の南東端)から
カパイシャン(島の北西部)へ移す形になっている。東西で見てもカパイシャンの
ほうが西で、キューバ南東岸からの海の渡りもサントドミンゴ直行より短い。
ハイチをカリブに加える決定と、海陸の直しが同時に解決した形。
**この経路そのものは自分の手では測れない**(焼かないと分からない)ため、
焼き直したあとに再度 `check-sea-routes.mjs northamerica` で確認してほしい。
特に見てほしいのは以下の、新しく足した都市を含む航路:

- `santiagodecuba-caphaitien`(上記の直しの本体)
- `havana-nassau` / `nassau-freeport`(バハマ合流の新しい橋渡し)
- `portauxbasques-calaismaine`(前回すでに指摘済みで未実測のまま)

## seg の実測

59都市・58路線で投影後距離を測り直した。90/100/110/120/130/140/150を
比較し、**90・100では最長辺(dawsoncity-craigellachie、579px)が6マスに
なって「5マス超0本」を満たさない**が、**110の時点で「5マス超0本・9マス
(上限)0本」**になった。42都市版から値は変わっていない
(geography.mjsのNORTHAMERICA_PROJ.seg参照)。

## アイテム価格の修正

team-leadの実焼きで`cliffsnotes`(quiz-save)の価格160がeffect価格上限147を
超過していると判明。他盤面のquiz-save系アイテム(baedeker/pacha/fiche、
いずれも130)に合わせて**130**に下げた。

## music.mjs の組み直し

地方が7→8になったため、旧`north`(米加1地方時代の名残)を`plains`に改名し、
`arctic`/`pac`/`atl`用に3種を新規に書いた(いずれも`plains`と同じ
コード進行の型を調・テンポだけ変えて展開し、聞き分けられるようにしてある)。
`carbs`(バハマ用のホ長調・フルート)は、バハマをcargrへ合流させたのに伴い
削除し、バハマの2都市もcargr(ハ短調・撥弦)の曲を使うことになる。
`NORTHAMERICA_STYLES`のキーは`NORTHAMERICA_REGIONS`と完全に一致(8/8)。

## money-events.mjs の組み直し

`["ca"]`だった2件(coffee-picking-day/bus-breakdown)は`["canorth"]`へ、
`["ca"]`だった2件(canal-pilot-tip/volcanic-ash-cleanup)は`["casouth"]`へ、
`["car"]`だった4件(cigar-rolling-demo/hurricane-shutters/duty-free-tip/
ferry-missed)はすべて`["cargr"]`へ直した。8地方すべてで増減が引けることを
確認済み(全18件、増9・減9)。

## quiz.mjs

前回report済みのアラスカ購入問題への差し替え以降、変更なし。
team-leadの実焼きで指摘されたQ16(チョコレート/トマト/コヨーテ)の重複は
team-lead側でホワイトリスト対応とのことなので、こちらでは何もしていない。

## 物件価格

最安220(craigellachie・Eagle Pass Section House)〜最高2800
(ciudaddemexico・Chapultepec Causeway Villa)で**12.7倍**。復元した17都市に
極端な価格の物件は無く、前回と変わっていない。

## アイテムの鍵(9件)・4言語・連結性の再確認

`boxcar` `officialguide` `zephyr` `superchief` `worrydoll` `cintaroja`
`cliffsnotes` `pieceseight` `handcar`。既存27盤面(全content.json)と再度
突き合わせ、衝突なしを確認した。`buildNorthAmericaContent()`の実行・59都市の
陸地内確認(point-in-polygon、7つの海岸線リング全てに対して。バハマの
リングも健在)・58路線でのBFS連結性・4言語の欠け(name・tag・fact・全物件名を
機械的に確認、欠落0件)を再確認済み。`npx eslint` `npx tsc --noEmit` ともに
警告・エラー0件。

## 走らせていない検査(3回目時点)

`node scripts/extract-legacy-content.mjs` は指示どおり走らせていない。
`check-quiz.mjs` / `check-sea-routes.mjs`(特に上記3本の新しい・変更した
航路)/ `check-city-backgrounds.mjs` / `npm run check` / `npm run shot` は
すべて未実行。焼いたあとに回してほしい。

---

# 報告(4回目。実焼きで出た海陸3件とmusic.mjsの直し忘れを対応)

## 経緯

2つご指摘をいただきましたが、**1つ目(17都市の復元・music.mjs・
cliffsnotes価格)はすでに3回目の報告で対応済みだったため、行き違い**
だったとお伝えしました。**2つ目の実焼き結果(59都市版、単体テスト1483件
全通過・背景塗り残し0件)への対応が、今回の本題**です。

## 海陸チェック3件への対応

- **`ciudaddemexico–merida`(64%海)**: `veracruz-merida` に差し替え。
  `ciudaddemexico-veracruz` はすでにあるので、実質
  `ciudaddemexico→veracruz→merida` と湾岸沿いに繋がる形になった。
- **`havana–nassau`(64%陸)**: `nassau-havana` へ端を入れ替え。
- **`portauxbasques–calaismaine`(64%陸)**: ご指摘のとおり実在のフェリー
  航路(ポートオーバスク—ノースシドニー)に合わせ、**ノースシドニーを
  新規都市として追加**し、`portauxbasques-northsydney`(航路)+
  `northsydney-calaismaine`(陸路)に分割した。
  - ノースシドニーの豆知識は、**シドニー炭田の炭鉱鉄道網**を軸にした
    (フェリーの話は`portauxbasques`自身の豆知識と物件「North Sydney Ferry
    Waiting Room」にすでにあったため、重複を避けた)。
  - geography.mjsのMAINLANDリングに、ケープブレトン北岸(ノースシドニー
    付近)の座標点を1つ追加した(point-in-polygonで確認済み)。
  - **これでカナダが9都市になり、当初合意の上限8を1超えている。**
    削れば済む話ではなく(米加4地方の橋渡し先を失う)、この1都市増は
    海陸修正に必要な最小限の対応だったので、上限超過をそのまま報告する。
    許容いただけるか、他の対応(例えば既存カナダ都市を1つ削って9→8に
    戻すか)をご指示いただきたい。

60都市・59路線でBFS連結性・point-in-polygon(60都市全件)を再確認済み。
segは60都市・59路線でも110のままで足りた(90/100だとdawsoncity-craigellachie
が6マスになり不足、110で条件を満たす)。

## quiz.mjs の追加確認

`check-quiz.mjs northamerica` を自分でも回した。

- Q16(チョコレート/トマト/コヨーテ): ご連絡のとおりteam-lead側で
  ホワイトリスト対応とのことなので、こちらでは何もしていない。
- **Q23(アキー/ジャマイカ)がプエルト・リモンのカードと「ジャマイカ」
  「果物」の語で一致、と出た。**中身を見たところ、Q23は「アキーは食べ方を
  誤ると毒になる、ジャマイカの国果」という話、プエルト・リモンの豆知識は
  「コスタリカの鉄道建設でのジャマイカ人労働者の犠牲とバナナ貿易の起源」
  という話で、**共通する語(ジャマイカ・果物)はあるが、内容そのものは
  重ならない**と判断し、そのままにした。誤検知だと考えているが、
  念のため報告する。

## 物件価格・アイテム鍵の再確認

物件価格は最安220〜最高2800で12.7倍のまま(変わらず)。アイテム9件は
既存盤面と衝突なし(変わらず)。

## 走らせていない検査(4回目時点)

`node scripts/extract-legacy-content.mjs` は今回も走らせていない。
`check-sea-routes.mjs`(特に上記3本の直した航路と、新設の
`portauxbasques-northsydney`)・`check-city-backgrounds.mjs`(ノースシドニーの
mark/bgは既存キー`spike`/`canalport`の使い回しなので新しい塗り残しは
出ないはずだが未確認)・`npm run check` / `npm run shot` は未実行。
焼き直したあとに確認をお願いします。

---

# 報告(5回目。残り1本 `veracruz–merida` を直した)

## カナダ9都市の承認

ありがとうございます。「上限は目的ではなく手段」というのはそのとおりで、
ノースシドニーもビジャエルモサも、実在の航路・実在の鉄道に必然のある
町なので、削って上限を守るより残す方が盤面としては正しいと考えています。

## `veracruz–merida`(海88%)への対応

**team-leadの見立て2(ビジャエルモサを中継に挟む)を採用しました。**

- `villahermosa`(mex)を新規都市として追加。座標`-92.9303, 17.9895`、
  point-in-polygonで陸地内を確認済み
- 豆知識は**トレン・マヤ(2023年開通)の西の起点**を軸にした。
  「19世紀のベラクルス—メキシコシティ線(コーヒーと石油のための鉄道)と
  同じ湾岸を走りながら一度も交わらない」という一文で、19世紀の大陸横断
  鉄道の話が多いこの盤面に、現在進行形の鉄道史を対比として置いています
- 路線を `veracruz-villahermosa` + `villahermosa-merida` に分割
  (既存の`veracruz-merida`を`veracruz-villahermosa`に書き換え、
  `villahermosa-merida`は末尾に追加。配列途中への挿入はしていません)
- これでメキシコが8都市になりました(上限超過。理由はカナダ9都市と同じで、
  ご承認いただいたものとして進めています)

## 全体の再確認(61都市・60路線・地方8)

`buildNorthAmericaContent()`成功・61都市全件のpoint-in-polygon・60路線での
BFS連結性・4言語欠落0件・`npx eslint``npx tsc --noEmit`エラー0件を確認済み。
segは61都市・60路線でも110のままで足りました(90/100だと
dawsoncity-craigellachieが6マスになり不足)。物件価格は12.7倍のまま
(変わらず)。地方の内訳は
`arctic4 pac5 plains5 atl5 mex8 canorth10 casouth9 cargr15`(合計61)。

## quiz Q23

ご確認ありがとうございます。誤検知と判断したままにしています。

## 走らせていない検査(5回目時点)

`node scripts/extract-legacy-content.mjs`は今回も走らせていません。
`check-sea-routes.mjs`(特に`veracruz-villahermosa`)・
`check-city-backgrounds.mjs`(ビジャエルモサのmark/bgも既存キー
`canyonrail`/`canyon`の使い回し)・`npm run check` / `npm run shot`は
未実行です。焼き直しをお願いします。
