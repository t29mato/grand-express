# ヨーロッパ盤面の登録内容

`scripts/countries/europe/` 8ファイルと `dooms/europe-*.tsx` 7枚は作成済み。
以下、共有ファイルへ貼り付けるためのコード片。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の import の下に追加):

```js
import { buildEuropeContent } from "./countries/europe/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行(既存の配列に1行足すだけ):

```js
const AUTHORED_COUNTRIES = [
  // ...既存の並び...
  buildEuropeContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加:

```js
  // €120,000(1200×100)。フランス・世界一周・イタリア・ドイツと同じユーロ圏の
  // 据え置き(€120,000は既に不動産の桁として通る)。
  europe: 100,
```

(`CITY_PROPS` への追加は無し。韓国・イタリア・ロシアと同じく、都市の物件価格は
`cities.mjs` に直接書き込んであり、パリを頂点とする4段階の格付けで
190〜2900の15.3倍にしてある。上書きテーブルは不要。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  europe: () => import("./europe.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  europe: () =>
    import("../content/europe.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

**鍵の衝突なしを確認済み**(下記「自分で確かめたこと」参照)。

```ts
  // Europe
  interrail: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  bradshaw: { type: "choose-exact-dice" },
  eurocity: { type: "roll-fixed-dice", diceCount: 2 },
  eurostar: { type: "roll-fixed-dice", diceCount: 3 },
  rauhnachtskreide: { type: "none" }, // 厄災の神(クランプス)のward item(passive)
  schnapsflasche: { type: "repel-spirit" },
  phrasebook: { type: "quiz-save" },
  wechselstube: { type: "gain-cash", amount: 380 },
  laissezpasser: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `nord`=北欧 / `brit`=ブリテン諸島 / `ibe`=イベリア半島 / `west`=西欧 /
`cent`=中欧 / `balk`=バルカン半島 / `east`=東欧。4月始まり。8月(index 4)が
休神(フェラゴスト、国じゅうが休業する)、12月(index 8)が全員アイテム配布
(クリスマス市とクランプスナハト)。

既存の `SEASON_EFFECTS_BY_COUNTRY` オブジェクトの閉じ `};` の直前に追加:

```ts
  /**
   * ヨーロッパ。アルプス峠の春の再開通 → 球根畑 → 白夜 →
   * インターレイルの季節 → フェラゴスト(8月・休神) → ぶどうの収穫 →
   * ライン渓谷の紅葉 → 日暮れが早まる → クリスマス市とクランプスナハト
   * (12月・給アイテム) → 冬ダイヤへの切り替えと寒波 → カーニバル →
   * 夏時間への切り替えとアルプス峠の試運転、という流れ。都市カードと同じく
   * 「国単位の好不況」ではなく「大陸ぜんぶの鉄道網に起きること」で差をつけた。
   */
  europe: [
    /* 0 Apr 高い峠が春に開く */ [
      { op: "region-income-multiplier", regionId: region("nord"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("cent"), multiplier: 1.15 },
    ],
    /* 1 May 球根畑の脇を列車が走る */ [
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("brit"), multiplier: 1.1 },
    ],
    /* 2 Jun 白夜が北で始まる */ [
      { op: "region-income-multiplier", regionId: region("nord"), multiplier: 1.35 },
      { op: "region-income-multiplier", regionId: region("east"), multiplier: 1.1 },
    ],
    /* 3 Jul インターレイルの季節が始まる */ [
      { op: "all-players-gain-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("brit"), multiplier: 1.15 },
    ],
    /* 4 Aug 国じゅうが8月に休業する(フェラゴスト) */ [
      { op: "region-income-multiplier", regionId: region("ibe"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("balk"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 0.85 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep ぶどうの収穫が谷を遡る */ [
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("ibe"), multiplier: 1.15 },
    ],
    /* 6 Oct 色がライン渓谷を下る */ [
      { op: "region-income-multiplier", regionId: region("cent"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.1 },
    ],
    /* 7 Nov 日暮れが早まる */ [
      { op: "all-players-pay-cash", amount: 150 },
      { op: "region-income-multiplier", regionId: region("nord"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("east"), multiplier: 0.85 },
    ],
    /* 8 Dec クリスマス市とクランプスナハト */ [
      { op: "region-income-multiplier", regionId: region("cent"), multiplier: 1.3 },
      { op: "give-item-to-all" },
    ],
    /* 9 Jan 冬ダイヤへの切り替えと寒波 */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("east"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("nord"), multiplier: 0.8 },
    ],
    /* 10 Feb カーニバル */ [
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("cent"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("ibe"), multiplier: 1.1 },
    ],
    /* 11 Mar 夏時間への切り替えとアルプス峠の試運転 */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("cent"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("nord"), multiplier: 1.1 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

既存の `DOOM_EFFECT_ID_BY_LEGACY_ID` オブジェクトの閉じ `};` の直前に追加:

```ts
  // Europe
  lawine: "skipTurn",
  hitzewelle: "fine",
  "greve-continentale": "payOthers",
  nebel: "teleport",
  herbstlaub: "percentLoss",
  waldbrand: "loseProperties",
  grenzstau: "steal",
```

**すでに登録・焼き込み済み。**`greve` がフランスの既存の厄災(スト、skipTurn)と鍵が
衝突していたため、team-lead側で `greve-continentale` に改名済み(`flavour.mjs` の
`id`・絵のファイル名 `europe-greve-continentale.tsx`・登録表の3箇所)。中身(効果・
文章・絵)は変えていない。上記コードはこの節を読む人のために改名後の名前で書いてある。

対応の考え方: 雪崩(lawine)は峠で足止め→skipTurn、熱波(hitzewelle)は振替の
出費→fine、ストライキ(greve-continentale)は足止めされた者どうしでタクシーを
割り勘し負担が大きくなる→payOthers、霧(nebel)はフェリーが別の港へ回される→teleport、
落ち葉(herbstlaub)は積み重なる小さな出費→percentLoss、山火事(waldbrand)は
近くに持つ物件が被害を受ける→loseProperties、国境検問(grenzstau)は
行列の中ですられる/没収される→steal。

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

**すでに登録・焼き込み済み**(`greve-continentale` への改名を反映した状態)。
参考までに最終形を記す:

```ts
import { EuropeLawine } from "./europe-lawine";
import { EuropeHitzewelle } from "./europe-hitzewelle";
import { EuropeGreveContinentale } from "./europe-greve-continentale";
import { EuropeNebel } from "./europe-nebel";
import { EuropeHerbstlaub } from "./europe-herbstlaub";
import { EuropeWaldbrand } from "./europe-waldbrand";
import { EuropeGrenzstau } from "./europe-grenzstau";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "europe-lawine": EuropeLawine,
  "europe-hitzewelle": EuropeHitzewelle,
  "europe-greve-continentale": EuropeGreveContinentale,
  "europe-nebel": EuropeNebel,
  "europe-herbstlaub": EuropeHerbstlaub,
  "europe-waldbrand": EuropeWaldbrand,
  "europe-grenzstau": EuropeGrenzstau,
```

## 補足: `src/presentation/components/setup/country-groups.ts`

確認していません(触らない指示のファイル)。ヨーロッパは地理的な区分そのものなので
振り分けに迷いは無いはずですが、既存の束の切り方に合わせて登録側で入れてください。

## 自分で確かめたこと

- `node --input-type=module -e "import('./scripts/countries/europe/index.mjs').then(m => {...})"`
  → `51 54 50 25 9 7 12 51 51 7`(都市51・路線54・クイズ50・出来事25・
  アイテム9・厄災7・季節12・mark51種・bg51種・音楽スタイル7地方。ホーリーヘッド追加分で
  都市・路線・mark・bgが1件ずつ増えている)。例外なし。
- 4言語の欠け: `city-helpers.mjs` と各ファイル自前の `t()` はパイプが
  ちょうど3本(4分割)でなければ即座に例外を出すため、`buildEuropeContent()`
  自体が通ることで担保される。作業中に `money-events.mjs` で3件
  (タイトルが3言語しか無い/5言語になっていた書き間違い)が実際に例外で
  落ち、その場で見つけて直した。
- 座標: 51都市すべてが `EUROPE_LAND` のいずれかの多角形の内側にあることを
  点内判定で確認済み。当初ヘルシンキ・カレー・タリン・ドゥラスの4件が
  海に浮いていたのを見つけ、該当する海岸線の頂点を沖側へ押し出して解消。
  ヴィスビュー(ゴットランド島)とヴァレッタ(マルタ島)用に新しい島の
  多角形を2つ追加した(どちらもWorld盤面には元々無い)。**あとから足した
  ホーリーヘッドも同じ理由で海に浮いていた**(アングルシーの頂点が実際の
  ホーリーヘッドよりわずかに西寄りだったため)。同じやり方で沖へ押し出して解消した。
- **路線の geometry: team-lead側で焼く前の使い捨て検査を計3回回してもらい、
  53本中6本→4本→(ホーリーヘッド分割後は未検査)と絞り込んだ。** 自分の見た目の
  判断(「露骨な破綻は無さそう」)は最初は外れていた。最終的に:
  - `reykjavik-torshavn`: 端の入れ替えで239px(44%)→33pxに解消(確認済み)
  - `rodbyhavn-berlin`: 100%陸だったため `"sea"` を外し陸路にした(確認済み。消えた)
  - `london-calais`: 指摘の6件には入っていなかったが、英仏海峡トンネルを
    列車が通るのに `"sea"` のままだった同じ間違いに自分で気づき、陸路に直した
  - `visby-malmo`: 端の入れ替えで90%→34%まで下がったが、**team-lead指摘によりKEPTに
    変更した。** ゴットランド発の実際の船はニュネスハムン/オスカルスハムン行きで、
    マルメ行きの航路は実在しない。この盤面にその2港が無いため、マルメへ引くかぎり
    南スウェーデンの陸を横切る。検査は「陸路にすれば21px」と出すが、ゴットランドは
    島なので陸路にはできない(数字に従うと嘘になる例、として理由をコメントに残した)
  - `dublin-london`: 端の入れ替えでは72%→65%とほとんど効かなかった。
    **team-lead指摘のとおり、実在するアイリッシュ・メイル航路(ダブリン—ホーリーヘッド、
    1848年〜)に沿ってホーリーヘッドを新設し、`dublin-holyhead`(航路)+
    `holyhead-london`(陸路)の2本に割った。** 路線配列への途中挿入を避けるため、
    元の `dublin-london` の配列位置はそのまま `dublin-holyhead` に差し替え、
    `holyhead-london` は末尾に追加している(添字は動いていない)。
    **この分割後の2本は、まだ検査してもらえていない。**焼き直しての再確認をお願いしたい
  - `torshavn-copenhagen`(14%)・`valletta-thessaloniki`(33%)はKEPTとし、
    理由をコメントに残した(team-leadも同意済み)
- `seg`: 54本の投影後距離を実測。team-lead指定の `seg=90` のままで、
  9マスに張り付く路線は0本、8マスが2本(トースハウン—コペンハーゲン間の
  海路、マルメ—キルナ間の国内長距離線)、6マス以上はあわせて3本のみ
  だったため、上げる必要が無いと判断してそのまま採用した(ホーリーヘッド追加後も
  再確認し、分布に変化が無いことを確認済み)。
- **クイズの答えの漏れ: `node scripts/check-quiz.mjs europe` を実際に実行できた
  (焼き上がった `europe.content.json` が生成されていたため)。** 6件の漏れ
  (アドリア海の問いがリュブリャナのカードに、1435mmの問いがブレスト・ロンドン・
  バルセロナ3枚のカードに、ケーニヒスベルクの問いがカリーニングラードのカードに、
  リトアニアの問いがタリンのカードに、オーストリア=ハンガリー帝国の問いがプラハの
  カードに、1989年の問いがショプロンのカードに、それぞれ出ていた)がすべて実在の
  漏れだったため、6問すべて書き直した(1435mmの問いは原子力発電の話題に、
  1989年の問いはチョルノービリの年号に、それぞれ題材ごと差し替え)。
  差し替え後、同じ判定ロジックを自分でも `EUROPE_QUIZ`/`EUROPE_CITIES` に対して
  走らせ、**漏れ0件**を確認した(ただし焼き直した本物の `check-quiz.mjs` での
  再確認はしてもらえていない)。
- 背景1枚あたりの平均要素数(`<rect|circle|ellipse|path|g>` のタグ数で
  機械計測): **51種・平均29.1個**(目安40を下回っている、と正直に書く。
  isolated_rail=17が最少、rebuilt_city_blocks=81が最多。ホーリーヘッド用に
  足した boat_train_quay は29個で、平均への影響はごくわずか)。`sky()` の第3引数と
  次の全面塗りの開始yが一致しているかを51種すべてで機械チェックし、
  当初9件で10〜30pxの塗り残しを検出して修正、再チェックで0件(新規追加分も含む)。
  マゼンタ台紙の上でPNG化して主要な背景を目視確認済み(透ける帯なし)。
- `mark`(51種)と`bg`(51種)は、51都市から過不足なく参照されていることを
  機械チェック済み(未使用キー0・不足キー0、両方向とも)。
- 物件価格: 当初パリを含む全都市が240〜360の1.5倍しか開いておらず、
  ドキュメントの目安(12〜17倍)を大きく割っていた。パリ(2900)を頂点に
  4段階で格付けし直し、190〜2900の**15.3倍**にした(スクリプトで一括置換)。
  ホーリーヘッド追加分(280/220)もこの範囲に収まっている。
- アイテム鍵9件(`interrail`/`bradshaw`/`eurocity`/`eurostar`/
  `rauhnachtskreide`/`schnapsflasche`/`phrasebook`/`wechselstube`/
  `laissezpasser`)が、既存26盤面の鍵の一覧と衝突しないことを機械チェック済み(0件)。
- クイズの答えの位置(`a`)は当初0が36・1が11・2が2という大きな偏りが
  あった(ドキュメントが「参考程度で必須ではない」としている項目だが、
  それでも直す価値はあると判断)。50問すべての選択肢の並びをスクリプトで
  組み替え、17/17/16まで均した。数の不足(49問しか無かった)も見つけて
  1問追加し、50問にしている。その後、答えの漏れ6件の差し替えで最終的な
  位置は16/18/16。
- 音楽: 7地方すべての`mel`(8小節)が1小節16ステップの範囲に収まっている
  ことを確認済み。
- 厄災の絵7枚: `npx vitest run src/presentation/components/events/dooms/dooms.test.ts`
  を実行し、既存196件すべて(自分の7枚を含む)が通過することを確認済み
  (このテストはファイルさえあれば回せるので、他国と違って実際に実行できた)。
  `npx tsc --noEmit` と `npx eslint` もプロジェクト全体で0件。

## 質について

- 都市1件あたりの面積: 51都市・BW2290×BH1970=4,511,300px² →
  約88,500px²/都市。ガイドの目安どおり。
- 路線密度: 51都市に対して54本(1都市あたり1.06本)。フランス(50都市・
  本数は未確認だが同程度の規模)に近い密度。全体で1つの連結成分になっている
  ことを確認済み(パリからどの都市へもたどり着ける)。

## 迷った点・判断した点

- **アウシュヴィッツ=ビルケナウ**: 単独の止まりマスにしていない。この盤面の
  「止まって物件を買い、四半期ごとに収入を得る」仕組みが絶滅収容所の跡地には
  原理的に合わないと判断したため。代わりに、日本盤面の広島が採っている形
  (実在して人が暮らす都市の豆知識として史実を淡々と述べ、購入できる物件は
  その歴史と無関係な地元の商いにする)を踏襲し、クラクフの項目で扱った。
  同じ考え方で、テッサロニキ(セファルディム系ユダヤ人とホロコースト)・
  サラエヴォ(1914年の暗殺と1992〜96年の包囲戦)・スコピエ(1963年の地震)も
  観光案内の口調にせず史実として置いている。
- **ウクライナ**: キーウとリヴィウのみを採用。占領地・前線には触れていない。
  リヴィウは「ブレストより早く軌間が変わる国境だった」という鉄道史の切り口、
  キーウは地下鉄の深さと2022年侵攻初期の避難列車という切り口で、どちらも
  現在ふつうに機能している都市として書いた。
- **領有権に争いのある土地**: キプロス・北キプロス・コソボ・トランスニストリアは
  外した。クレタ・キプロスは盤面の南端(緯度34.5)の設計時点で「手前」に
  収まるよう意図されていたため、地理的にわずかに範囲内でも都市を置いていない。
- **カリーニングラード・ブレスト(ベラルーシ)**: どちらも軌間・国境という
  鉄道の技術的な事実に絞って書き、現在の政治的な緊張には立ち入っていない。
- **クランプス**(厄災の神)の選定: アルプス一帯(オーストリア・南ドイツ・
  スロベニア・クロアチア・ハンガリーなど、この盤面の中欧・バルカンに多い地域)の
  民話で、聖ニコラウスに連れ添う角の生えた精霊。「残酷ではなく度が過ぎる
  だけ」という扱いは韓国のトッケビ・茨城のダイダラボウと同じ考え方。
- **ホーリーヘッド**(51都市目)の追加: 当初 `dublin-london` を直接結んでいたが、
  この線がウェールズ・イングランドの陸をまるごと突っ切っており(72%が陸上)、
  端の入れ替えでもほとんど効かなかった(65%)。team-lead指摘のとおり、
  実在するアイリッシュ・メイル航路(1848年〜、ダブリン—ホーリーヘッド間の船と
  ホーリーヘッド—ロンドン間の鉄道が一つの時刻表で組まれていた)に沿って
  都市を割った。イギリスはこれで2都市(ロンドン・ホーリーヘッド)になったが、
  1国1〜3都市の枠内。
- **通貨倍率**: フランス・世界一周・イタリア・ドイツと同じユーロ圏なので
  据え置きの100とした(€120,000は既に不動産の桁として通る)。判断に迷う点は無い。
- **オリエント急行の経路**: パリ→ミュンヘン/ウィーン→ブダペスト→
  ベオグラード→ソフィア→イスタンブールを1本の経路として辿れる形には
  していない。イスタンブールはTurkey盤面・World盤面ですでに2回書かれて
  いるため置かず、ミュンヘン・ベオグラード・ソフィアも都市としては置いて
  いない(それぞれドイツ盤面の領域、モクラ・ゴラ、ルセに切り口を譲った)。
  ルセ⇄ジュルジュ(ドナウ対岸のペア)とパリの豆知識を直接つなげる形で、
  経路の一部を示すに留めている。都市を追加して経路を辿れる形にするかは
  登録側の判断を仰ぎたい(その場合、既存40の「国・地域」枠を超えるか、
  どこかを削る判断が要る)。
