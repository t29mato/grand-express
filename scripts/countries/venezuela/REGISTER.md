# ベネズエラ盤面の登録手順

`scripts/countries/venezuela/`(8ファイル)と
`src/presentation/components/events/dooms/venezuela-*.tsx`(7ファイル)は
作成済み・検証済み。共有ファイルには一切触れていない。ここに書いた変更を
取りまとめ側で適用し、`node scripts/extract-legacy-content.mjs` と
`npm run check` を通してほしい。

中国のときと同じ7箇所。貼り付け用のコードをそのまま載せてある。

---

## 1. `scripts/extract-legacy-content.mjs`

import を1行追加(既存の末尾の下)。

```js
import { buildVenezuelaContent } from "./countries/venezuela/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に1行追加。

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
  buildVenezuelaContent(),
];
```

（他のエージェントが並行して追加している国がある場合は、その並びの末尾に置けばよい。）

---

## 2. `scripts/content-overrides/property-economy.mjs`

`CURRENCY_MULTIPLIERS` に1行追加。**これは「据え置き」でよいはずです。**

```js
  // 据え置き。$120,000(1200×100)は既に不動産の桁として通る
  // (フランス・世界一周・イタリア・アメリカと同じ理由)。
  // ベネズエラ盤面は最初からドル建て(flavour.mjsのcur.pre="$")なので、
  // 他国のような為替換算そのものが要らない——$1200が実際に$1200である。
  venezuela: 100,
```

**venezuela/flavour.mjs の `VENEZUELA_META.cur` は暫定値 `mul: 100` のまま**にしてありますが、
上記の理由でこれがそのまま最終値になるはずです(korea/china のような後で置き換える前提の
暫定値ではありません)。もし別の意図があれば教えてください。

---

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に1行追加。

```ts
  venezuela: () => import("./venezuela.content.json").then((m) => m.default),
```

---

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に1行追加。

```ts
  venezuela: () => import("../content/venezuela.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

---

## 5. `src/infrastructure/content/item-effect-rules.ts`

`ITEM_EFFECT_BY_LEGACY_KEY` に9行追加。

```ts
  // Venezuela
  condor: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  animalito: { type: "choose-exact-dice" },
  porpuesto: { type: "roll-fixed-dice", diceCount: 2 },
  metro: { type: "roll-fixed-dice", diceCount: 3 },
  tabaco: { type: "none" }, // 厄災の神(エル・シルボン)のward item(passive)
  ruda: { type: "repel-spirit" },
  chuleta: { type: "quiz-save" },
  billete: { type: "gain-cash", amount: 240 },
  mototaxi: { type: "extra-turn" },
```

**9件とも既存キー(下記コマンドで確認)と衝突していません。**ただし今回は
中国・韓国・トルコ・ドイツ・イタリア・イギリスと同時に他の5盤面
(カナダ・オーストラリア・ウクライナ・ブラジルなど)が並行して作られているため、
**焼き上がった `country-index.json` にはまだそれらが載っておらず、この確認だけでは
衝突を防げません。**最終的な突き合わせはそちらでお願いします。

```
node -e 'const ids=require("./src/infrastructure/content/country-index.json").map(c=>c.id);
const k=new Set(); for(const i of ids){Object.keys(require(`./src/infrastructure/content/${i}.content.json`).items).forEach(x=>k.add(x))}
console.log([...k].sort().join(" "))'
```
実行結果(2026-08-13時点の焼き上がり分。china含む)に `condor` `animalito` `porpuesto`
`metro` `tabaco` `ruda` `chuleta` `billete` `mototaxi` はいずれも含まれていませんでした。

---

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6.1 `SEASON_EFFECTS_BY_COUNTRY` に `venezuela:` を追加

`venezuela/flavour.mjs` の `VENEZUELA_SEASONS`(フレーバー文)と対になる数値ルール。
地方コードは `cap`=首都圏 / `zu`=スリア / `and`=アンデス / `cen`=中西部・ラノス /
`gua`=グアヤナ / `ori`=オリエンテ。

```ts
  venezuela: [
    /* 0 Apr 聖週間、海辺とアンデスの巡礼で賑わう */ [
      { op: "region-income-multiplier", regionId: region("cap"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.1 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 1 May 五月の十字架、バルロベント海岸の徹夜の歌 */ [
      { op: "region-income-multiplier", regionId: region("cap"), multiplier: 1.2 },
    ],
    /* 2 Jun サンフアンの太鼓とカラボボ戦勝記念日(同日) */ [
      { op: "region-income-multiplier", regionId: region("cap"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.3 },
    ],
    /* 3 Jul 独立記念日とボリバル誕生日、国じゅうが祝う */ [
      { op: "all-players-gain-cash", amount: 260 },
    ],
    /* 4 Aug エンジェルフォールが雨季で水量最大に(カナイマ観光の書き入れ時) */ [
      { op: "region-income-multiplier", regionId: region("gua"), multiplier: 1.3 },
    ],
    /* 5 Sep 台風シーズンだが低緯度のため直撃をほぼ免れる(オリエンテ沿岸は平常どおり) */ [
      { op: "region-income-multiplier", regionId: region("ori"), multiplier: 1.1 },
    ],
    /* 6 Oct ラノスが増水し、牧畜が難しくなる */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 0.85 },
    ],
    /* 7 Nov フェリア・デ・ラ・チニタ(マラカイボ)とガイタの季節の始まり */ [
      { op: "region-income-multiplier", regionId: region("zu"), multiplier: 1.3 },
      { op: "all-players-gain-cash", amount: 240 },
    ],
    /* 8 Dec ガイタがラジオを占拠するクリスマス、アジャカ作りで物入り */ [
      { op: "region-income-multiplier", regionId: region("zu"), multiplier: 1.15 },
      { op: "all-players-pay-cash", amount: 220 },
    ],
    /* 9 Jan アンデスのパラドゥーラ・デル・ニーニョ(名付け親が宴を開く) */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.2 },
      { op: "give-item-to-all" },
    ],
    /* 10 Feb カーニバル、エルカジャオとカルパノが練り歩く */ [
      { op: "region-income-multiplier", regionId: region("gua"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ori"), multiplier: 1.2 },
      { op: "rest-spirit" },
    ],
    /* 11 Mar 乾季の締めくくり、ロス・ロケスの海が澄む */ [
      { op: "region-income-multiplier", regionId: region("cap"), multiplier: 1.2 },
    ],
  ],
```

### 6.2 `DOOM_EFFECT_ID_BY_LEGACY_ID` に7行追加

`venezuela/flavour.mjs` の `VENEZUELA_DOOM` は最初からこの並び順
(fine→percentLoss→skipTurn→loseProperties→payOthers→teleport→steal)で書いてある。

```ts
  // Venezuela
  "relampago-catatumbo": "fine",
  "derrumbe-andino": "percentLoss",
  "cola-de-transito": "skipTurn",
  "techo-inundado": "loseProperties",
  "vaca-de-cumpleanos": "payOthers",
  "silbon-enganio": "teleport",
  "carterista-mercado": "steal",
```

---

## 7. `src/presentation/components/events/dooms/index.ts`

import を7行追加。

```ts
import { VenezuelaCarteristaMercado } from "./venezuela-carterista-mercado";
import { VenezuelaColaDeTransito } from "./venezuela-cola-de-transito";
import { VenezuelaDerrumbeAndino } from "./venezuela-derrumbe-andino";
import { VenezuelaRelampagoCatatumbo } from "./venezuela-relampago-catatumbo";
import { VenezuelaSilbonEnganio } from "./venezuela-silbon-enganio";
import { VenezuelaTechoInundado } from "./venezuela-techo-inundado";
import { VenezuelaVacaDeCumpleanos } from "./venezuela-vaca-de-cumpleanos";
```

登録テーブルに7行追加。

```ts
  "venezuela-carterista-mercado": VenezuelaCarteristaMercado,
  "venezuela-cola-de-transito": VenezuelaColaDeTransito,
  "venezuela-derrumbe-andino": VenezuelaDerrumbeAndino,
  "venezuela-relampago-catatumbo": VenezuelaRelampagoCatatumbo,
  "venezuela-silbon-enganio": VenezuelaSilbonEnganio,
  "venezuela-techo-inundado": VenezuelaTechoInundado,
  "venezuela-vaca-de-cumpleanos": VenezuelaVacaDeCumpleanos,
```

7枚とも `npx tsc --noEmit -p .`(プロジェクト全体、strict）と、
`npx vitest run src/presentation/components/events/dooms/dooms.test.ts`(142件→私の7枚を
含めて145件、全通過)を確認済み。文字要素は使っていない
(コメントの中の言い換えも含めて確認済み)。

---

## 8. 確認済み・変更不要だったもの

- **`src/presentation/components/setup/country-groups.ts`**: `americas` グループに
  `"venezuela"` が既に入っていました(他エージェントの下準備と思われます)。
  `boardScale()` も未登録IDは既定で `"country"` になるので、そのままでよいはずです。
- **`scripts/check-quiz.mjs` / `scripts/check-city-backgrounds.mjs` / `scripts/shot.mjs`**:
  中国のREGISTER.mdにある記載のとおり、`country-index.json` から動的に国一覧を読む形に
  なっているようなので、抽出さえ済めば自動的に対象に入るはずです(未確認・伝聞。
  焼いたあとに確認してください)。

## 9. `check-quiz.mjs` の `ACCEPTED` に追記が要るかもしれないもの(3件)

`venezuela/quiz.mjs` の日本語文に、次の3語がラテン文字のまま混じります。
いずれも組織名・企業名の頭字語そのものが問いの中身であるため意図的です
(中国の「"tea"」「"China"」と同じ扱い)。

```js
  { c: "venezuela", has: "\"NATO\"", why: "NATOという頭字語そのものを選択肢に含む設問(OPECとの比較)" },
  { c: "venezuela", has: "\"OPEC\"", why: "1960年にベネズエラが創設に加わった国際組織の名がOPECそのもの" },
  { c: "venezuela", has: "\"PDVSA\"", why: "国営石油会社の略称そのものを答えさせる設問" },
```

手作りスクリプトで日本語(`.ja`)フィールドだけをラテン文字の有無で走査し、
上記3箇所以外に混入が無いことを確認済み。

## 10. `check-quiz.mjs` の差し戻し(4件)への対応(2026-08-13)

- **Q13とQ18が同じ「コロンビア」を答えにし、同じシウダー・ボリバルの都市カードと
  重なっていた件は直しました。**Q18(「シモン・ボリバルはどの国で没したか」)を、
  ボリバル/コロンビアに触れない新しい題材(国旗の星の数、8つ。1811年の独立宣言に
  署名した州を表し、2006年にグアヤナ州を称える8つ目が加わった)に差し替えました。
  正解の位置(添字1)は変えていないので、0/1/2の分布(10/10/10)は保たれています。
- **Q1(カラカス=首都)とQ5(カリブ海)は直していません。**「首都はどこか」
  「国の北岸の海は何か」は都市カード自身と同じ語を答えにするのがほぼ避けられない
  設問形式で(韓国盤面のQ1「韓国の首都は?」もソウルの都市カードと同じ語を答えに
  している)、短い答えの誤検知に該当すると判断しました。直すべきという判断があれば
  教えてください。

---

## 通貨をドルにした理由(再掲。§2とflavour.mjsのコメントにも書いてある)

ベネズエラは2008年・2018年・2021年と3度のデノミネーションを行い、直近までに
旧単位から数字を14桁削っている。ハイパーインフレでボリバル建ての値付けそのものが
機能しなくなり、不動産・中古車・家賃・露店の値段まで、いまは日常的に米ドルで
交渉・支払いされる(「ドル化」)。この盤面がドルで物件価格を表示するのは、
面白い豆知識としてではなく、通貨が実質的な役目を果たせなくなった生活の結果として
起きている事実をそのまま反映したもの。

## seg について(実測結果。海陸判定の直しで30路線に更新後も再確認)

当初28都市・32路線で実測。**seg=80だとバリナス—シウダーボリバル
(833px)が上限9マスに張り付き**、シウダーボリバル—プエルトアヤクーチョ(595px)も
8マスになった。**seg=120にすると、この2本は7マスと5マスに収まり(9マスへの
張り付きが解消)**。`geography.mjs` の `VENEZUELA_PROJ.seg` に120を設定済み。

海陸判定の差し戻しでマラカイボ湖を渡る2路線を外し30路線になった後も再測した
(分布: 1が20本・2が7本・3が1本・5が1本・7が1本。5マス超はバリナス—
シウダーボリバルの1本のみで変化なし)。seg=120のままで問題ない。

中継の町を挟む案(たとえばラノスにカラボソを足してバリナス—シウダーボリバルを
2本に割る)は次のバッチの検討事項として残した。今回はseg調整のみで対応している。

## 海陸判定について(差し戻しを受けて追記・2026-08-13)

登録・焼き込み後、team-leadが`check-sea-routes.mjs`を回して5路線を差し戻した。
共有ファイルはいまも走らせられないため、`playwright`で`venezuela/geography.mjs`と
`cities.mjs`を直接importしてマゼンタ台紙に描く自作スクリプトを作り、
実測しながら直した。結果、**5件とも解消し、新たに30路線・0件(60px超)を確認。**

- **`ciudadbolivar-canaima`(元は`"sea"`、100%陸)**: ご指摘のとおり事実誤認でした。
  カナイマへは実際には道路が無く、シウダー・ボリバルからの**空路**が実情です。
  このゲームに空路の仕組みが無いため、いちばん近い扱いとして**陸路**に変更
  (「舟」と偽るより正直な選び方のはず、という判断です)。
- **`maracaibo-santabarbaradelzulia` / `cabimas-santabarbaradelzulia`**:
  実測したところ、どちらの直線もマラカイボ湖の広い湖面を横切ってしまい、
  端の入れ替えでは解決しませんでした(サンタバルバラ・デル・スリアが湖の
  南端の低地にあり、北側のどの町から直線を引いても湖を横切るため)。
  **実際の道もこの湖を短絡しません**(南端を回り込みます)。2本とも路線から
  外し、`santabarbaradelzulia-merida`(zu-and橋渡しの1本)だけで接続を保つ形に
  変更しました。zu地方の内部連結はマラカイボ—カビマスのみになります。
- **`puertolacruz-porlamar`(フェリー、`"sea"`のまま)**: ご指摘のとおり海岸線の
  粗さが原因でした。実測すると3つの複合要因があり、直しました。
  1. マラカイボ湖の西岸・東岸の点がタブラソ海峡の東西で入れ替わって描かれ、
     **海岸線自体が自己交差**していた(マラカイボ・カビマスも実測で「海の上」に
     出ていた。全53辺を総当たりする交差検出スクリプトで発見)。
  2. **マルガリータ島を描き忘れていた**(`VENEZUELA_LAND`が本土1枚だけだった
     ため、ポルラマルの実座標が実測で「海の上」に出ていた)。楕円近似で追加。
  3. プエルトラクルス付近の海岸線点が都市の実座標から西へ0.28度・南へ
     ずれており、フェリー航路がジグザグに陸を跨いでいた。座標を都市の実座標に
     合わせ、モチマ国立公園付近の点の並び順も単調になるよう直した(西へ戻る点が
     あり、尖った陸の突起ができていたため)。

自己検証の手順(全て`playwright`直描き。共有ファイルは未使用):
1. 全53辺(2つの陸地ポリゴンの外周)を総当たりして自己交差ゼロを確認。
2. 全28都市の経緯度がマゼンタ台紙上で陸地色になることを確認
   (`laguaira`/`coro`/`santaelenadeuairen`は境界にごく近く、目視では緑と読めるが
   1px単位の判定ではまだ怪しいところが残っている。ただし実際に触れる30路線は
   すべて0px/60px超なしを確認済みで、影響は無さそうに見える)。
3. 各路線を3px刻みでサンプリングし、始点・終点から半径20px(都市マーカー相当)を
   除いた区間で陸/海の判定を集計。60px超は0件。

**この自作検査は`check-sea-routes.mjs`そのものではなく、模した再現です。**
数値がぴったり一致する保証はありません。お手数ですが、もう一度
`check-sea-routes.mjs`を回して確認してください。まだ何か引っかかれば、
座標か路線構成のどちらを直すべきかコメントいただければ対応します。

## 背景の塗り残しについて(実測して1件見つけて直した)

共有の `check-city-backgrounds.mjs` は焼き上がり前の盤面を扱えないため、
`playwright` で直接 `venezuela/art.mjs` をimportしてマゼンタ台紙に描く
自作スクリプトで16背景すべてを実測した。**`dunes` 背景で4,588px(全16背景中
唯一)の塗り残しを検出。**原因は `dune()` ヘルパーの曲線が累積dyで
実際の終点をy方向に32px押し上げていたのに、下端への余白を20pxしか
取っていなかったこと(12px不足)。余白を60pxに直し、再実測して16背景とも
0pxを確認した。都市シンボルが隠す帯(x=151–249/y=54–152)に主役級の図形が
入っていないかも目視確認済み(隠れているのは山の稜線などの塗りだけで、
建物・ケーブルカー・橋・家などの主要な絵はすべて左右の端かy>170に置いてある)。

## 背景の密度(実測)

16背景の平均要素数(rect/path/circle/ellipse/line/polygonの開始タグを機械的に数えた)は
**43.2**(最小29=dunes、最大63=capital・llanos)。目安の40と、見本のイタリア(48)に近い。

## 物件価格

最安200(ハヒ・トゥクピタの2件目)〜最高2800(カラカスのアビラ山ケーブルカー駅)で
**14.0倍**。目標の12〜17倍に収まっている。`inc`(四半期収入)は
`property-economy.mjs` の `incomeFor(cost) = 2*round(cost*0.207/2)` と全56件で
一致することを実測・自動修正済み(初回は0.206で手計算していたため31件ずれていた)。

## 4言語の欠けをどう数えたか

`t()` が4分割できないと例外を投げる仕組みを使い、8ファイルすべてを
`node --input-type=module -e "import ... "` で直接importして例外が出ないことを確認
(1件でも欠けがあればその場で落ちる)。加えて、`.ja` フィールドだけを機械的に
抜き出してラテン文字の混入を走査し、意図した3箇所(NATO/OPEC/PDVSA)以外に
無いことも確認した(上記§9)。

## 迷った点・判断した点

- **マラカイボ湖を海岸線に含む入江として描いた**(実際にタブラソ海峡で海と
  つながる汽水湖のため。国の輪郭そのものがこの湖の形で決まる)。
- **エセキボ地域は描いていない。**国境線はガイアナ側の未係争ラインの手前
  (デルタアマクロ東端)で止めている。
- **カラカス地下鉄をロス・テケスの豆知識に入れた**(実在する路線としての事実。
  「旅客鉄道はほぼ無い国で、それでも動いている線」というteam-lead指示に沿う)。
- **1999年バルガスの地滑り災害(ラグアイラ)は史実として書いたが、数十年前の
  出来事として扱い、何事もなかったかのような観光案内にはしていない。**
  推定死者数は諸説あり幅があるため「推定で数万人」と幅を持たせた。
- **経済危機・移民(700万人以上)は、通貨(ドル化)とアイテム「billete」の
  豆知識で事実として触れた。**盤面全体を悲惨さで塗ることはせず、
  厄災カードはより軽い日常の不運(渋滞・停電・すり)に留めている。
- **物件の格差は反映したが、都市そのものの「格」で差別化しておらず**、
  首都カラカスと同格の物件をマラカイボ・シウダーグアヤナにも置いた
  (石油・鉱工業の実質的な豊かさを反映)。

## 走らせていない検査(正直に列挙。2026-08-13の差し戻し対応後に更新)

- `check-sea-routes.mjs` 本体は共有ファイルなので今回も走らせていない。
  代わりに、それを模した自作スクリプト(`playwright`直描き)で30路線・
  全53辺の海岸線を実測し、60px超0件・自己交差0件を確認した(§「海陸判定に
  ついて」参照)。**ただし本物のスクリプトと数値が完全一致する保証は無い。**
  もう一度回して確認してください。
- `check-quiz.mjs` 本体も同様に共有ファイル。位置バランス(10/10/10)・難易度
  分布・欠けの確認は手作りスクリプトで代用済み。今回の差し戻し4件のうち
  Q13/Q18の重なりのみ直し、Q1/Q5は判断の理由を上記§10に書いた。
- `npm run shot`(index.mjsは書いたが、共有ファイルへの登録前なので撮れない)
- `npm run check` 全体(依存する共有ファイルの変更が済んでいないため)

これらは焼き込み後にそちらで回して、まだ問題があれば差し戻してください。

---

## 11. 2回目の差し戻し(2026-08-13、焼き直し後)への対応

`npm run check` を回したところ2件落ちたとのご連絡を受けて直した。

### 11.1 `item-pricing.test.ts` — chuleta の値付け

`chuleta`(quiz-save)の価格が効果の上限(難易度10のクイズ失点147)より
高い180になっていた。**韓国の同じ効果のアイテム`jokbo`(130)に合わせて
130に下げた。**`flavour.mjs`のコメントに理由を追記済み。

### 11.2 `use-board-layout.test.ts` — 都市が海に浮いている(3件)

`laguaira` / `coro` / `santaelenadeuairen` の3件。**この検査は自分では
走らせられなかったので、team-leadから走らせ方(`npx vitest run
use-board-layout`。共有ファイルではないので実行可)を教えてもらい、
実際に回して直した。**

診断のため、`useBoardLayout`フックと投影を直接呼ぶ一時テストを
`tests/`配下に作って実行し(確認後に削除済み)、3件とも
**押し離し(`relaxOverlaps`)による移動量はゼロ**(`drift=(0,0)`)、
**生の経緯度の時点ですでに海岸線のポリゴンからわずか0.1〜2.6pxだけ
外に出ていた**ことを確認した。つまり配置の押し出しは無関係で、
**3件とも海岸線の粗さが原因**(トルコの50/50とは違い、ベネズエラの
今回の3件は片方に寄っていた)。

該当する海岸線の点をそれぞれ実測で「都市が陸側に入る」経緯度まで
動かして直した(`geography.mjs`)。

- `laguaira`: 海岸線の点(-66.93, 10.60)を緯度+0.03(10.63)へ。
- `coro`: 海岸線の点(-69.68, 11.40)を緯度+0.03(11.43)へ。
- `santaelenadeuairen`: ロライマ山付近の国境点(-60.75, 5.10)を
  経度+0.15(-60.60)へ(実測で複数の組み合わせが有効だったなかから、
  エセキボ側へ寄りすぎない範囲を選んだ)。

直した後、`playwright`直描きの自作スクリプトで再実測し、**30路線とも
60px超0件・自己交差0件を維持していること**(この3点の変更が既存の
経路を壊していないこと)も確認した。

### 11.3 やったこと・やっていないこと(正直に)

- やった: 上記の自作再現スクリプトでの実測・修正・再実測。`npx eslint`と
  `buildVenezuelaContent()`の再構築が通ることの確認。
- **やっていない: 実際の`use-board-layout.test.ts`をこの直し済みの状態に対して
  再実行すること。**このテストは焼き込み済みJSON
  (`src/infrastructure/content/venezuela.content.json`)を読むため、
  ソースを直しただけでは反映されない。診断用の一時テストは
  `useBoardLayout`フックを直接呼んでいたが、それも同じ焼き込み済みJSON
  経由だった(pointInPolygonのロジック自体はソースを変えても変わらないため、
  自作スクリプトでの実測は妥当と考えているが、本物のテストでの確認はできて
  いない)。**焼き直したあと、もう一度`npx vitest run use-board-layout`と
  `npx vitest run item-pricing`を回して確認してください。**

---

## 12. 3回目の差し戻し(2026-08-13)への対応 — 本物の検査を使うようになった

team-leadから「24盤面すべて焼き上がったので、共有の検査スクリプトを
直接読むだけで実行してよい」と教えてもらい、以降は自作の代用ではなく
本物を使っている。

```
node scripts/check-sea-routes.mjs venezuela
npx vitest run item-pricing
npx vitest run use-board-layout
```

item-pricing・use-board-layoutはこの時点で緑だった(§11の直しが焼き込みに
反映されていた)。**残っていたのは海陸2本**(前回のご連絡と同じ内容)。

### 12.1 `check-sea-routes.mjs` の中身を読んで、経路の描き方を正確に理解した

これまでの自作検査は**直線**で判定していたが、本物は
`src/presentation/hooks/octilinear-route.ts` と同じ「45度の脚 + 軸に沿った脚」
の折れ線でなぞっていて、**どちらの脚を先にするかは路線の配列内の添字の
偶奇(`edgeIndex % 2 === 1`)で決まる。**この違いが、自分の直線ベースの
実測と本物の数字がずれていた主因だった。

`check-sea-routes.mjs`本体(共有ファイル)を読むだけして、その式を
そのまま移植した検証スクリプトを自分の手元(スクラッチパッド)に作り、
**焼き込み前のソースに対して本物と同じ式で** 実測できるようにした
(このスクリプト自体は成果物には含まれない。共有ファイルは変更していない)。

### 12.2 `caracas–puertolacruz` は実はすでに直っていた

差し戻しの135px(45%)は「そのまま」の値ではなく**「端を入れ替え」を
選んだ場合の値**で、現在のソース(§11以前の直しを含む)では「そのまま」が
**0px**になることを、上記の移植スクリプトで確認した。おそらく前回の
焼き込みのタイミングがこの直しの前後にまたがっていた。再度焼き込めば
解消しているはず。

### 12.3 `puertolacruz–porlamar` — アラヤ半島の付け根を直して54pxに

移植スクリプトで経路上の各点を1つずつ追跡し、陸に乗っている区間を
特定した。71pxの内訳はおおよそ次の3か所だった。

1. 出発直後(プエルトラクルスの港を出てすぐ、~13px。港が陸にある以上
   ある程度は避けられない)
2. **経路の中ほど(~20px)。アラヤ半島の付け根がクマナ—アラヤ間の
   線で急に張り出しており、45度の脚がそこをかすめていた。**
3. 到着直前(マルガリータ島に入ってから、~27px。到着地が島である以上
   ある程度は避けられない)

2.が直せる部分だと判断し、**アラヤ半島の座標を実測で調整した**
((-64.35, 10.70) → (-64.40, 10.50)。半島の輪郭を少し内側に描き直した形で、
半島そのものを消したわけではない)。他の組み合わせも試した(終点をクマナ・
カルパノに替える、端を入れ替える、45度の脚の順を変える)なかで、
**元の都市の組み合わせ(プエルトラクルス—ポルラマル、実在のフェリー)を
保ったまま直せる案**として選んだ。

再測すると **54px(40%)** まで下がり、60pxの閾値を下回った。念のため
`puertolacruz–cumana`・`cumana–carupano`(どちらもこの半島の近く)への
影響も確認し、悪化していないことを確認済み(移植スクリプトの全路線再測で
0本、自己交差0件)。

### 12.4 やったこと・やっていないこと

- やった: `check-sea-routes.mjs`本体を読んでロジックを理解し、同じ式を
  移植したスクリプトでソース段階の実測・修正・再測。全30路線・55辺の
  自己交差ゼロも再確認。`npx eslint`・`buildVenezuelaContent()`の再構築も確認。
- **やっていない: 今回直した2本(caracas–puertolacruzの再確認・
  puertolacruz–porlamarのアラヤ半島調整)を、本物の`node
  scripts/check-sea-routes.mjs venezuela`に対して確認すること。**
  ソースを直しただけでは焼き込み済みJSONに反映されないため。
  **焼き直したあと、もう一度同じコマンドで確認してください。**
