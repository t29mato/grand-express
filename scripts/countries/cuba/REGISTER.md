# キューバ盤面の登録(取りまとめ側が当てる7箇所)

`scripts/countries/cuba/` の6ファイル(cities / geography / quiz / money-events /
flavour / music)は揃っています。**`index.mjs` と `art.mjs`、
`src/presentation/components/events/dooms/cuba-*.tsx` 7枚は取りまとめ側・
絵の担当が別途作成します。**このREGISTER.mdの7番目はその7枚ができてから
当ててください。

## 1. `scripts/extract-legacy-content.mjs`

```js
import { buildCubaContent } from "./countries/cuba/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追記:

```js
  buildCubaContent(),
```

（`index.mjs` はまだ無いので、peru の `index.mjs` を手本にオセアニア方式で
組んでください。`buildCubaContent()` が `CUBA_META` / `CUBA_PROJ` /
`CUBA_REGIONS` / `CUBA_CITIES` / `CUBA_EDGES` / `CUBA_QUIZ` / `CUBA_ITEMS` /
`CUBA_SPIRIT` / `CUBA_DOOM` / `CUBA_SEASONS` / `CUBA_MONEY_EVENTS` /
`CUBA_STYLES` / `CUBA_MARKS` / `CUBA_BG` / 地形一式 / `renderCubaDecor` を
束ねる形です。)

## 2. `scripts/content-overrides/property-economy.mjs`

**team-lead確認済み。米ドル建て、倍率100(ベネズエラ盤と同じ扱い)。**
キューバ・ペソは公式レートと市中レートが何倍も開いており、どちらを選んでも
片方の読者にとって不正確になる。ベネズエラ盤(`venezuela: { pre: "$", mul: 100 }`)
と同じ理由で米ドル建てにした。`flavour.mjs` の `CUBA_META.cur` も
`{ pre: "$", post: "", mul: 100 }` に直してある。

```js
  // $ 1,200 → $ 120,000。ベネズエラ盤と同じくドル建て、倍率100。
  cuba: 100,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追記:

```ts
  cuba: () => import("./cuba.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追記:

```ts
  cuba: () => import("../content/cuba.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts`

アイテム9件。**`azabache` は既存キー(スペイン盤面・厄災の神「トラスグ」の
ward item)と同じ鍵を使っており、効果も同じ `{ type: "none" }` です。
新規追記は不要、既存の行をそのまま使ってください。** 残り8件は新規追記
(鍵は既存全盤面と衝突しないことを確認済み)。

```ts
  // Cuba
  camello: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  electrico: { type: "choose-exact-dice" },
  guagua: { type: "roll-fixed-dice", diceCount: 2 },
  trenfrances: { type: "roll-fixed-dice", diceCount: 3 },
  // azabache は既存キー(スペイン盤面と共有)。追記不要。
  machetazo: { type: "repel-spirit" },
  hojaderuta: { type: "quiz-save" },
  cigarros: { type: "gain-cash", amount: 400 },
  cambiavia: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 災難7件の対応

`CUBA_DOOM`(`flavour.mjs`)は fine / percentLoss / skipTurn /
loseProperties / payOthers / teleport / steal の順に並べてあります。
**順序を変えずにそのまま対応させてください。**

```ts
  // Cuba
  "tranca-de-rio": "fine",
  "ciclon-de-la-zafra": "percentLoss",
  descarrilamiento: "skipTurn",
  "incendio-del-central": "loseProperties",
  "paro-de-los-obreros": "payOthers",
  "desvio-del-guije": "teleport",
  "robo-en-la-estacion": "steal",
```

### 季節12ヶ月(4月始まり)

地方コード: `oc`=オクシデンテ(西部) / `ce`=セントロ(中部) / `or`=オリエンテ
(東部)。キューバは北半球なので季節の中身は他の北半球の盤面と同じ向き。
`CUBA_SEASONS` の文面に対応させた提案値。**数値は叩き台**なので、
他盤面とのバランスを見て調整してください。1件(9月・エル・コブレの祭り)が
`give-item-to-all`、1件(3月)が `rest-spirit` です。

```ts
  /**
   * キューバ。サフラの終わり(4月) → ティエンポ・ムエルトの始まり(5月) →
   * ハリケーン季開幕(6月) → サンティアゴのカルナバル(7月) →
   * ハリケーン季の頂点(8月) → エル・コブレの祭り(9月・給アイテム) →
   * 雨の底(10月) → 修理の追い込み(11月) → レメディオスのパランダス
   * (12月・全員給付) → サフラ本格化(1月) → カルナバル各地(2月・全員給付) →
   * グイヘが静まる季節(3月・休神)、という流れ。
   */
  cuba: [
    /* 0 Apr サフラの終わり */ [
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.2 },
    ],
    /* 1 May ティエンポ・ムエルトの始まり */ [
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 0.85 },
    ],
    /* 2 Jun ハリケーン季開幕 */ [
      { op: "region-income-multiplier", regionId: region("or"), multiplier: 0.9 },
    ],
    /* 3 Jul サンティアゴのカルナバル */ [
      { op: "region-income-multiplier", regionId: region("or"), multiplier: 1.3 },
    ],
    /* 4 Aug ハリケーン季の頂点 */ [
      { op: "region-income-multiplier", regionId: region("oc"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("or"), multiplier: 0.85 },
    ],
    /* 5 Sep エル・コブレの祭り(全員給付) */ [
      { op: "give-item-to-all" },
    ],
    /* 6 Oct 雨の底 */ [
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 0.8 },
    ],
    /* 7 Nov 修理の追い込み */ [
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.1 },
    ],
    /* 8 Dec レメディオスのパランダス(全員給付) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.2 },
    ],
    /* 9 Jan サフラ本格化 */ [
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.35 },
      { op: "region-income-multiplier", regionId: region("oc"), multiplier: 1.15 },
    ],
    /* 10 Feb カルナバル各地(全員給付) */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("or"), multiplier: 1.15 },
    ],
    /* 11 Mar グイヘが静まる季節(休神) */ [
      { op: "rest-spirit" },
    ],
  ],
```

## 7. `src/presentation/components/events/dooms/index.ts`

**絵の担当が7枚(`cuba-tranca-de-rio.tsx` など)を作成したあとで当ててください。**
鍵は上の災難7件の `id` と同じにする想定です。

```ts
import { CubaCicloneDeLaZafra } from "./cuba-ciclon-de-la-zafra";
import { CubaDescarrilamiento } from "./cuba-descarrilamiento";
import { CubaDesvioDelGuije } from "./cuba-desvio-del-guije";
import { CubaIncendioDelCentral } from "./cuba-incendio-del-central";
import { CubaParoDeLosObreros } from "./cuba-paro-de-los-obreros";
import { CubaRoboEnLaEstacion } from "./cuba-robo-en-la-estacion";
import { CubaTrancaDeRio } from "./cuba-tranca-de-rio";

// ...DOOM_COMPONENTS の中に追記
  "cuba-tranca-de-rio": CubaTrancaDeRio,
  "cuba-ciclon-de-la-zafra": CubaCicloneDeLaZafra,
  "cuba-descarrilamiento": CubaDescarrilamiento,
  "cuba-incendio-del-central": CubaIncendioDelCentral,
  "cuba-paro-de-los-obreros": CubaParoDeLosObreros,
  "cuba-desvio-del-guije": CubaDesvioDelGuije,
  "cuba-robo-en-la-estacion": CubaRoboEnLaEstacion,
```

## 8. 選ぶ画面(`src/presentation/components/setup/country-groups.ts`)

**team-lead確認済み。北アメリカの束に入れる(新しい「カリブ」枠は作らない)。**
北アメリカの大陸盤(`northamerica`)の投影(西経168〜52度・北緯72〜7度)が
既にキューバを含んでおり、ハバナ・サンティアゴ・デ・クーバ・シエンフエゴスが
描かれているとのこと。**このファイルは共有ファイルなので触っていません。**
`countryIds: ["northamerica", "canada", "usa", "mexico"]` にキューバを足す
作業はteam-lead側で行ってください。

## 測定(2026-08-21、登録前)

```
node --check scripts/countries/cuba/*.mjs        # 全ファイル構文OK
npx eslint scripts/countries/cuba/                # 警告0
node scripts/check-sea-routes.mjs cuba            # 使い捨てjsonで確認済み。43本中、60px超の食い違いなし
```

`node scripts/extract-legacy-content.mjs` と `node scripts/check-quiz.mjs cuba`
は未登録のため未実行。登録後にお願いします。

## 追記(2026-08-21・ビニャーレスが海に出ていた件の修正)

ご指摘のとおり、海岸線38頂点(188px/頂点)では西端が丸ごと落ち、
ビニャーレスが海の外に出ていました。西岸を中心に頂点を足し、
**62頂点・105px/頂点**まで詰めました(アルゼンチン120px/チリ129pxと
同水準)。40都市すべてが陸の内側にあることを実測し直しています。

```
海岸線      62頂点・周長7162px・105px/頂点(目安120px/頂点以下)
陸外        0件(40都市とも実測で陸の内側)
海陸判定    43路線とも60px超の食い違いなし(check-sea-routesで再確認)
```

直す途中、頂点を足すたびにバタバノー―ヌエバ・ヘロナの航路が壊れたり
直ったりして、一時「頂点を足すと航路に沿って陸地判定が伸びる構造的な
問題」だと誤診しかけました。**実際は自分がコミット済みの座標
(-82.90, 22.65)を打ち直す過程で (-82.90, 22.55) と1桁打ち間違えていた
だけ**で、`git show <直前のコミット>` で正しい値と突き合わせて分かりました。
詳しい経緯は `geography.mjs` 冒頭のコメントに残しています。

音楽3地方(地方の数と同じ)の件、了解しました。地方は oc/ce/or の3つの
ままなので変更ありません。

厄災のid(`tranca-de-rio` / `ciclon-de-la-zafra` / `descarrilamiento` /
`incendio-del-central` / `paro-de-los-obreros` / `desvio-del-guije` /
`robo-en-la-estacion`)は `src/infrastructure/content/season-and-doom-rules.ts`
を grep し、既存43枚と衝突しないことを確認しました(2026-08-21)。

## 数字(2026-08-21実測)

```
都市        40(西部oc 11 / 中部ce 17 / 東部or 12)
路線        43本(陸路42・海路1)。都市数+3
クイズ      92問。難易度 1-3:24 / 4-6:39 / 7-8:19 / 9-10:10
お金の出来事 16件(増8・減8。全国4・各地方4×3)
道具        9個(型は9種を1つずつ。azabacheのみ既存キー共有)
厄災        7個(fine/percentLoss/skipTurn/loseProperties/payOthers/teleport/steal を1つずつ)
季節        12ヶ月。give-item-to-all 1件(9月)・rest-spirit 1件(3月)
音楽        3地方(oc/ce/or)
記号 + 背景  記号40種(全都市で重複なし)+ 背景17種 = 57枚(上限70枚以下)
同じ絵になる都市  0組(記号がすべて異なるため。都市数の10%=4組まで許容のところ0)
物件価格    190〜2600(比13.68倍。12〜17倍の範囲内)
道具の値段  quiz-save(hojaderuta)は130(上限140以下)。gain-cash(cigarros)は280で、
            提案する効果額400より安い
通貨倍率    100(team-lead確認済み。米ドル建て、ベネズエラ盤と同じ扱い)
```

## 重ならないこと(確認方法と結果)

- **既存4盤面(南アメリカ・メキシコ・北アメリカ・世界一周)** の
  `*.content.json` を機械的に検索(2026-08-21)。北アメリカに15件
  ヒットしたが(ハリケーンの語源・野球の人気比較・キューバ―ユカタン海峡・
  米州機構など)、いずれもキューバの砂糖・鉄道の芯とは無関係なので避けた。
  今回追加したクイズ(グアンタナモ・プラット修正条項・USSメイン号・
  ミサイル危機・バカルディ・カパブランカ・ダンソンなど)についても
  同じ4か国のクイズに同一の語で再検索し、ヒット0件を確認した。
- **並行して書かれているアルゼンチン・チリ・コロンビア**とは、
  team-leadから伺った芯(チリ=硝石とハーバー・ボッシュ法/コロンビア=川が
  道だった国)と重ならない。「独立戦争」「アメリカの介入」に触れた設問
  (十年戦争とラ・トロチャ、バヤモの国歌、プラット修正条項、ピッグス湾)は
  いずれも**キューバに固有の出来事**で、他国の独立戦争(1810〜20年代の
  スペインからの独立)とは時代も文脈も異なる。

## 都市カードとの重複チェック(2026-08-21、相互レビュー前の自己点検)

クイズを書いたあと、**都市カードの豆知識(fact)に書いた具体的な事実を
そのまま答えにしていないか**を、都市名・年号・固有名詞で機械的に
突き合わせて確認した。最初の下書きで**5件が重複**していた(いずれも
都市カードにある年号・地名・人名をほぼそのまま問うクイズになっていた)。

```
Q「1832年グイネスへの鉄道を請願したのは誰か」→ Pedro Diago
    → グイネスの豆知識に "Pedro Diago and Rafael O'Farril" と明記済み。
      「請願した道路委員会の正式名称」に差し替えた(委員会の名前自体は
      カードに出てこない)。
Qシエンフエゴス「1819年フランス人入植者はルイジアナとどこから来たか」
    → シエンフエゴスの豆知識に "Louisiana and Bordeaux" と明記済み。
      「改名前の元の集落名(フェルナンディーナ・デ・ハグア)」に差し替えた。
Qチャンギー「どの東部都市の農村部で育まれたか」→ グアンタナモ
    → グアンタナモの豆知識にほぼ同一の文がある。
      「ソンがハバナへ広まったのはおよそ何年代か」に差し替えた。
Qイスラ・デ・ラ・フベントゥの狭軌鉄道「主に何を運んだか」→ 柑橘類
    → ヌエバ・ヘロナの豆知識にほぼ同一の文がある。
      「イスラ・デ・ピノスから改名された年」に差し替えた。
Qラ・トロチャ「1871年、どの戦争のさなかに着工したか」→ 十年戦争
    → シエゴ・デ・アビラの豆知識に年号・戦争名とも明記済み。
      「路線のおよその長さ(70km)」に差し替えた。
Qダンソン「1879年マタンサスで初演」→ Danzón
    → マタンサスの豆知識に年号・地名・人名(ファイジェ)まで明記済み。
      年号と地名を問い文から外し、踊りの特徴(コントラダンサから生まれた
      ゆっくりした踊り)だけで答えさせる形にした。
```

**上の5件は修正済み。**ほかにも似た事例が残っている可能性があるため、
`check-quiz.mjs` が漏れを指摘した場合は、まずこの5件と同じ形(都市カードの
年号・固有名詞の直接一致)かどうかを確認してください。

## 難易度9〜10・確度が中程度の項目(自己申告)

以下は一次資料までは当たれておらず、確度「中」として報告する。
**相互レビューで優先して見てほしい。**

```
1. アルフレッド・クルーガーがサウスカロライナ運河鉄道会社に在籍していたこと
   (専門の鉄道史文献に見られるが一次資料未確認)
2. ビリャヌエバ駅(ハバナの最初の鉄道駅の名)が解体されたという前提
   (駅名がビリャヌエバ伯にちなむこと自体は確度が高い)
3. シエンフエゴスの元の名前「フェルナンディーナ・デ・ハグア」
4. イスラ・デ・ラ・フベントゥへの改名年(1978年)
5. ラ・トロチャのおよその長さ(70km)
6. レナード・ウッドが1902年にキューバ初代大統領へ権限を引き渡した将軍で
   あること(在任期間・役職名の細部)
7. ペルーチョ・フィゲレド処刑年(1870年)
8. ヘスス・メネンデス暗殺年(1948年)
9. マナカ・イスナガの塔が7階建てとされること
10. Bacardí社の1862年創業(サンティアゴ・デ・クーバ)は確度高いが、
    のちの移転先(質問には使っていないが、REGISTER内の検討過程で出た
    バミューダ諸島説)は未使用・未検証のため今回のクイズには含めていない
```

道具・厄災・季節の英西仏日訳はすべて自分で書き下ろした(直訳ではない)。
