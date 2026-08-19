# 九州盤面の登録内容

`scripts/countries/kyushu/` 7ファイル(`cities`/`geography`/`quiz`/
`money-events`/`flavour`/`music`/`index`)と `ART-KEYS.md` は作成済み。
`art.mjs` と `dooms/kyushu-*.tsx` 7枚は別担当(絵の専任)がこれから作成する。

都市40・路線43(うち航路4)・クイズ102・お金の出来事20・アイテム9・厄災7・
季節12・地方7(県)・mark35種・bg35種・音楽7地方。以下、共有ファイルへ
貼り付けるためのコード片。

測定時刻: 2026-08-20 03:58 JST(最終版)。

## この盤面の芯(1行)

**鎖国の二百年、日本で外へ開いていた窓は、ここだけだった。**
平戸→出島(長崎の浦上に接続)→浦上と、窓の位置が移り、何が通り、何が
咎められたかを軸にした。石炭(大牟田・端島・飯塚・田川)・火口の隣の暮らし
(桜島・阿蘇)・元寇と朝鮮出兵という逆向きの「窓」(博多・唐津)は、芯では
なく題材として扱った。強制労働・原爆・虐殺は事実として和らげずに書いた。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の最後の国コンテンツの import の下に追加):

```js
import { buildKyushuContent } from "./countries/kyushu/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行(既存の配列末尾に1行足すだけ):

```js
const AUTHORED_COUNTRIES = [
  // ...既存の各国...
  buildKyushuContent(),
];
```

**`art.mjs` が無いと `index.mjs` のimportが失敗するので、絵ができるまでは
焼けません。** 絵が揃ってから追加してください。

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

```js
  // 日本・茨城・百名山と同じ円建て、倍率10000。
  // team-lead から明示指示(2026-08-20)があったため計算はしていない。
  kyushu: 10000,
```

(`CITY_PROPS` への追加は無し。物件価格は `cities.mjs` に直接書き込んで
ある。最安195〜最高2720=13.95倍で、目安の12〜17倍に収まっていることを
確認済み。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  kyushu: () => import("./kyushu.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  kyushu: () =>
    import("../content/kyushu.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

**鍵の衝突なしを確認済み**(既存の全盤面の鍵一覧と突き合わせ、下記「自分で
確かめたこと」参照)。

```ts
  // Kyushu
  gatasuki: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  tetsudoukaishagojikoku: { type: "choose-exact-dice" },
  relaykamome: { type: "roll-fixed-dice", diceCount: 2 },
  tsubametokkyu: { type: "roll-fixed-dice", diceCount: 3 },
  kyuurinohono: { type: "none" }, // 厄災の神(がらっぱ)のward item(passive)
  suijinomamori: { type: "repel-spirit" },
  kangientouan: { type: "quiz-save" },
  imarizuke: { type: "gain-cash", amount: 320 },
  botayamasuberidai: { type: "extra-turn" },
```

`imarizuke` の `amount` は `flavour.mjs` の物件価格帯を見直した後の
基準(320前後)に合わせて設定した。他盤面の `gain-cash` 系アイテム
(kasamayaki 380・oldpiastres 260)と桁を揃えてある。

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `fuk`=福岡 / `sag`=佐賀 / `nag`=長崎 / `kum`=熊本 / `oit`=大分 /
`miy`=宮崎 / `kag`=鹿児島(cities.mjsの地方区分と同じ)。4月始まり。
0月(桜前線、給アイテム)・4月(台風本格化、九州南部が不況)という
起伏に合わせた。

既存の `SEASON_EFFECTS_BY_COUNTRY` オブジェクトの閉じ `};` の直前に追加:

```ts
  /**
   * 九州。全国最速の桜前線(給アイテム) → 博多どんたく → 有明海のムツゴロウと
   * 梅雨 → 博多祇園山笠 → 台風本格化(南九州が不況) → 筑紫平野の稲刈り →
   * 芋焼酎の仕込み → 唐津くんち → みかんの段々畑 → 玄界灘のブリ漁 →
   * 長崎ランタンフェスティバル → 茶の剪定、という流れ。
   */
  kyushu: [
    /* 0 Apr 全国最速の桜前線(給アイテム) */ [{ op: "give-item-to-all" }],
    /* 1 May 博多どんたく(福岡の街頭祭り) */ [
      { op: "region-income-multiplier", regionId: region("fuk"), multiplier: 1.2 },
    ],
    /* 2 Jun 有明海のムツゴロウ・梅雨入り */ [
      { op: "region-income-multiplier", regionId: region("sag"), multiplier: 1.1 },
    ],
    /* 3 Jul 博多祇園山笠 */ [
      { op: "region-income-multiplier", regionId: region("fuk"), multiplier: 1.25 },
    ],
    /* 4 Aug 台風が本格化(九州南部が最初に受け止める) */ [
      { op: "region-income-multiplier", regionId: region("kag"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("miy"), multiplier: 0.85 },
    ],
    /* 5 Sep 筑紫平野の稲がそろって実る */ [
      { op: "region-income-multiplier", regionId: region("fuk"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("sag"), multiplier: 1.1 },
    ],
    /* 6 Oct 芋焼酎の仕込み(南九州) */ [
      { op: "region-income-multiplier", regionId: region("miy"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("kag"), multiplier: 1.15 },
    ],
    /* 7 Nov 唐津くんちの曳山 */ [
      { op: "region-income-multiplier", regionId: region("sag"), multiplier: 1.2 },
    ],
    /* 8 Dec みかんの段々畑が色づく */ [
      { op: "region-income-multiplier", regionId: region("nag"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("oit"), multiplier: 1.1 },
    ],
    /* 9 Jan 玄界灘の寒ブリ漁 */ [
      { op: "region-income-multiplier", regionId: region("fuk"), multiplier: 1.15 },
    ],
    /* 10 Feb 長崎ランタンフェスティバル */ [
      { op: "region-income-multiplier", regionId: region("nag"), multiplier: 1.15 },
    ],
    /* 11 Mar 茶の木を刈り込む(実入りの薄い月) */ [
      { op: "region-income-multiplier", regionId: region("fuk"), multiplier: 0.95 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

既存の `DOOM_EFFECT_ID_BY_LEGACY_ID` オブジェクトの閉じ `};` の直前に追加。
**`id` は絵の担当が実際に描くファイル名
(`dooms/kyushu-{kougai-jiban,shiokaze-sabi,gouu-keihou,kanmon-kiri,
kazan-bai-kansoku,taifuu-shinro,kigyou-torikeshi}.tsx`)を想定しているが、
実際に描かれたファイル名と食い違っていないか、登録時に確認してほしい。**

```ts
  // Kyushu
  "kougai-jiban": "skipTurn", // 旧坑道の陥没で通行止め
  "shiokaze-sabi": "fine", // 潮風で錆びた分岐器の修理費
  "gouu-keihou": "skipTurn", // 大雨警報で足止め
  "kanmon-kiri": "skipTurn", // 海峡の霧で船が動けず足止め
  "kazan-bai-kansoku": "fine", // 降灰で空路が止まり振替の交通費
  "taifuu-shinro": "percentLoss", // 進路を変えた台風で物件が値崩れ
  "kigyou-torikeshi": "teleport", // 乗継列車が運休し、バスへ迂回させられる
```

（`id` はJSでは文字列キー。ハイフンを含むため `"..."` で囲む必要がある。）

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(既存の最後の国コンテンツの import の下に追加。**絵の担当が実際に
つけたファイル名・エクスポート名に合わせて直すこと**):

```ts
import { KyushuKougaiJiban } from "./kyushu-kougai-jiban";
import { KyushuShiokazeSabi } from "./kyushu-shiokaze-sabi";
import { KyushuGouuKeihou } from "./kyushu-gouu-keihou";
import { KyushuKanmonKiri } from "./kyushu-kanmon-kiri";
import { KyushuKazanBaiKansoku } from "./kyushu-kazan-bai-kansoku";
import { KyushuTaifuuShinro } from "./kyushu-taifuu-shinro";
import { KyushuKigyouTorikeshi } from "./kyushu-kigyou-torikeshi";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "kyushu-kougai-jiban": KyushuKougaiJiban,
  "kyushu-shiokaze-sabi": KyushuShiokazeSabi,
  "kyushu-gouu-keihou": KyushuGouuKeihou,
  "kyushu-kanmon-kiri": KyushuKanmonKiri,
  "kyushu-kazan-bai-kansoku": KyushuKazanBaiKansoku,
  "kyushu-taifuu-shinro": KyushuTaifuuShinro,
  "kyushu-kigyou-torikeshi": KyushuKigyouTorikeshi,
```

## 補足: `src/presentation/components/setup/country-groups.ts`

確認していません(触らない指示のファイル)。九州は「日本の中の地方盤」
という扱いなので、茨城・百名山と同じグループに入れるのが筋だと思います。

## 自分で確かめたこと(2026-08-20 03:58時点)

- `art.mjs` が無いため `index.mjs` はまだ実行できない(絵ができたら
  取りまとめ側で最終確認をお願いします)。代わりに `cities`/`geography`/
  `quiz`/`flavour`/`money-events`/`music` の各ファイルを個別に import して
  以下を確認した。
  - 都市40・路線43(うち航路4)・クイズ102(難易度1〜3が26問・7以上が
    34問・9〜10が10問)・お金の出来事20(増10・減10)・アイテム9・厄災7・
    季節12・地方7。例外なし。
- **4言語の欠け**: 全ファイルで `t()`/`city()` の検証(`|`が3本ちょうど、
  props2件ちょうど)を通過。書いている最中に例外で気づいたもの
  (money-eventsで3件・quizで4件)はすべて直った状態でコミットしてある。
- **mark/bg の過不足**: `cities.mjs` が使うキー(mark35種・bg35種、
  計70枚=上限ちょうど)を機械集計し、`ART-KEYS.md` の表と1件ずつ突き合わせて
  一致を確認した(diff 0件)。**同じ「mark」と「bg」の組み合わせを持つ
  都市は1組**(飯塚・田川。ともに筑豊の炭鉱町で、同じ姿になるのはむしろ
  正確だと判断した。都市数40の1割=4組以内に収まっている)。
- **陸地判定**: 自作のray-casting判定で、40都市中39都市が `KYUSHU_LAND`
  の内側・投影範囲内にあることを確認した。**端島(軍艦島)だけは
  意図的に海上**(現在無人島・実在の観光船で結ぶ想定。team-lead確認済み)。
- **路線のgeometry**: `check-sea-routes.mjs` を自分で実行できた(使い捨て
  content.jsonを組んで検査後に削除、手順書の「焼く前でも回せる」節どおり)。
  当初10本が60px超で引っかかった。
  - 6本(`yahata-munakata`・`fukuoka-karatsu`・`isahaya-saga`・
    `amakusa-yatsushiro`・`minamata-yatsushiro`・`obi-nobeoka`・
    `kagoshima-chiran`)は端の入れ替えで0px、または大幅に改善したので
    そのまま適用した。
  - 残り4本(`omuta-kumamoto` 71px・`nakatsu-oita` 62px・
    `kagoshima-tanegashima` 80px・`nagasaki-goto` 68px)は、ジオメトリ
    調整を2回試したところ**いずれも悪化した**(omuta-kumamotoは
    71px→165px→177pxと2回とも悪化)。理由は `cities.mjs` の
    `KYUSHU_EDGES` 直前のコメントに記載。実在する経路で、簡略化した
    海岸線の限界と判断して残した。
- **クイズの機械検査**: `check-quiz.mjs` を自分で実行(使い捨てcontent.json
  で検査後に削除)。「漏れ?」候補が6件・混入1件挙がり、**1件は本物の
  漏れと判断して修正、5件は誤検知または許容できる重なりと判断した。**

  | 候補 | 判断 | 理由 |
  |---|---|---|
  | Q3「1889年」/久留米 | **本物の漏れ(修正済み)** | 難易度9の問い「九州最初の鉄道の開業年」の答えが、久留米のカードに「in 1889」と明示されていた。**久留米のカード側から年号の数字だけを抜き**、「the very first railway line」という言い回しに直した。クイズの答え・解説文は変えていない |
  | Q5「関門海峡」/門司 | 許容 | 難易度2の易しい問い。門司のカードそのものが海峡の話なので出て当然。読んだ人が答えられるのはむしろ狙いどおり(`uk:belfast-holyhead` と同種) |
  | Q20「オランダ」/平戸 | 許容 | 島原の乱でのオランダ艦砲射撃を問う難易度8の問題。平戸のカードは別の文脈(オランダ商館の取り壊し)で「オランダ」の語を含むだけで、島原の乱には触れていない。枠の語の偶然の一致 |
  | Q40「1945年」/小倉・長崎・知覧 | 許容 | 難易度1の常識問題(長崎に原爆が落ちた年)。第二次大戦を扱うどのカードにも出うる年号で、読んだ人が答えられるのはむしろ狙いどおり |
  | Q70「1960年代」/飯塚 | 許容 | 宮崎の新婚旅行ブームを問う問題。飯塚のカードは炭鉱閉山の年代として「1960年代」を含むだけで無関係。枠の語の偶然の一致 |
  | 混入Q52「PayPay」 | 許容(要`ACCEPTED`登録) | PayPayドームという実在の施設名(命名権による正式名称)。TGVやPDVSAと同種の、原語を出さないと成立しない固有名詞。ACCEPTED配列に `{ c: "kyushu", has: "PayPay", why: "..." }` を足してもらえると次回から挙がらなくなります |

  あわせて、**難関層(難易度7〜10、34問)の題材が2回以上重ならないか
  自分で数えた。** 重複なし(西鉄ライオンズ・武蔵・アマミノクロウサギ・
  TSMC・ななつ星・JR九州上場・島原大変肥後迷惑・たびら平戸口駅・仙巌園・
  九州最初の鉄道、ほか全問が別の題材)。
- 難易度9〜10(10問)の裏取り: 1問ずつ確認した。確度に幅があるため、
  自分で判断した区分は次のとおり。
  - **確度が高い**: 九州最初の鉄道の開業年(1889年、team-lead裏取り済み)、
    武蔵の建造地(長崎)、アマミノクロウサギ、ななつ星の名の由来、
    JR九州の株式上場(2016年)、仙巌園の借景。
  - **確度中**: TSMC熊本工場(2024年開業、拠点の町「菊陽町」までは
    問いに含めず県名どまりにした)、たびら平戸口駅の「本土最西端」
    (現地の記念碑に基づく通称で、学術的な定義には幅がありうる)、
    1792年の島原大変肥後迷惑の死者数(「およそ1万5千人」と幅を持たせた)。
  - **裏取りを他盤面の担当にお願いしたい**: 上記のうち「確度中」3問。
    指示書(new-board-brief.md)にある「他の盤面の担当に読ませる」対応を
    お願いします。
- アイテム鍵9件(`gatasuki`/`tetsudoukaishagojikoku`/`relaykamome`/
  `tsubametokkyu`/`kyuurinohono`/`suijinomamori`/`imarizuke`/
  `botayamasuberidai`/`kangientouan`)が、既存の鍵一覧(全盤面分)と
  衝突しないことを機械チェック済み(0件)。
- 音楽: 7地方すべての `mel`(8小節)が1小節16ステップぴったりで埋まって
  いることを機械チェック済み(過不足0)、`ch` も8和音ぴったり。
- 物件価格: **最初の草稿が最安220〜最高340(1.55倍)しか無く、目安の
  12〜17倍に遠く届いていなかった。**40都市80件を都市の重み(自分で
  つけた1〜40位のランク)に沿って対数的に組み直し、**最安195〜最高2720
  (13.95倍)に収め直した。**利回りはおよそ8.2%で統一。
- 正解の位置(`a`)は散らしていない(102問すべて添字0)。指示書
  (new-board-brief.md)に「出題時にシャッフルされる」とあるための対応。

## 迷った点・確認したいこと

- **物件価格のランク付けは自分の判断でつけた。** 県庁所在地(長崎・福岡・
  鹿児島・熊本・佐賀・大分)と世界的知名度の高い史跡(端島)を上位に、
  炭鉱町(飯塚・田川)や離島(五島)を下位に置いた。異論があれば
  `cities.mjs` の `prop()` の数値だけ直せばよい(文章は変えていない)。
- **`check-sea-routes.mjs` で残った4本**(`omuta-kumamoto` 71px・
  `nakatsu-oita` 62px・`kagoshima-tanegashima` 80px・`nagasaki-goto` 68px)は
  ジオメトリ調整を2回試して悪化したため、簡略化した海岸線の限界として
  残した。海岸線の精緻化、または中継都市の追加(例: 大牟田―熊本間に
  玉名を挟む)を検討してほしい。**都市を足す場合は先に相談する**
  (凍結後に足すと絵を描き直すことになるため)。
- **`taifuu-shinro`(percentLoss)と `kigyou-torikeshi`(teleport)の効果
  種類は、他盤面とのバランスを見て自分で割り振った。** 内容の文章と
  合っているか(`percentLoss`=物件の値崩れ、`teleport`=バスへ迂回)、
  team-leadの目でも確認してほしい。
- **地方分けは県そのもの(7県)にした。** ibaraki(5地方)・
  hyakumeizan(8地方)と同じく、実際の行政区分をそのまま使う方針に沿った。
