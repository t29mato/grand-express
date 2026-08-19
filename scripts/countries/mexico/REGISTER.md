# メキシコ盤面の登録内容

`scripts/countries/mexico/` の7ファイル(`index` / `cities` / `geography` /
`quiz` / `money-events` / `flavour` / `music`)は作成済み。
都市45・路線51・クイズ109・お金の出来事25・アイテム9・厄災7・季節12・
地方7・音楽7地方。**`art.mjs` と `src/presentation/components/events/
dooms/mexico-*.tsx` は絵の専任担当が別途作成します。**必要なキー一覧は
`scripts/countries/mexico/ART-KEYS.md` に渡してあります(2026-08-19、
`cities.mjs` 確定にあわせて `artGlyphKey` を38種に確定・訂正済み)。

以下、共有ファイルへ貼り付けるためのコード片です。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の import の下に追加):

```js
import { buildMexicoContent } from "./countries/mexico/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行:

```js
const AUTHORED_COUNTRIES = [
  // ...既存の各国...
  buildMexicoContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加(具体的な倍率はteam-lead側の基準に
合わせて決めてください。物件価格は220〜2800の範囲で `cities.mjs` に
直接書き込んであります):

```js
  mexico: 100, // 仮。他の中南米・単独国盤面の相場に合わせて調整してください
```

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  mexico: () => import("./mexico.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  mexico: () =>
    import("../content/mexico.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

**鍵の衝突なしを確認済み**(既存266鍵と重複0件。下記「自分で確かめたこと」参照)。

```ts
  // Mexico
  globo: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  brujula: { type: "choose-exact-dice" },
  chepe: { type: "roll-fixed-dice", diceCount: 2 },
  trenmaya: { type: "roll-fixed-dice", diceCount: 3 },
  copal: { type: "none" }, // 厄災の神(チャネケ)のward item(passive)
  silbato: { type: "repel-spirit" },
  acordeon: { type: "quiz-save" },
  centenario: { type: "gain-cash", amount: 380 },
  chapulin: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `norte` / `bajio` / `occidente` / `centro` / `golfo` / `sur` /
`yucatan`。4月始まり。季節の物語は `flavour.mjs` の `MEXICO_SEASONS`
(4月サン・マルコス祭〜3月チチェン・イッツァの分点まで)を参照してください。
**数値効果(倍率・支払い額)はteam-lead側の基準で決めてください。**
参考までに、season文の内容と対応する地方は:

```
0 Apr サン・マルコス祭(アグアスカリエンテス) → bajio 好況
1 May 五月五日(プエブラ中心) → centro 弱含みの好況
2 Jun ハリケーン期入り(両岸) → norte/golfo/sur/yucatan 弱含みの不況
3 Jul グエラゲッツァ(オアハカ) → sur 好況
4 Aug グアダルーペ谷の収穫(バハカリフォルニア) → norte 好況
5 Sep 独立記念日(全国) → 全地方微増、休神
6 Oct オオカバマダラ飛来開始(アンガングエオ) → occidente 好況
7 Nov 死者の日(全国、特にパツクアロ) → occidente/centro 好況
8 Dec グアダルペの日〜ポサーダ(全国) → 全地方微増、給アイテム
9 Jan 公現祭(全国) → 全地方微減(タマレス代の出費を反映してもよい)
10 Feb ベラクルス・カーニバル → golfo 好況
11 Mar 分点(チチェン・イッツァ) → yucatan 好況
```

厄災 `DOOM_EFFECT_ID_BY_LEGACY_ID` への追加7件(効果の種類はteam-lead側で
既存7種から選んでください。物語は `flavour.mjs` の `MEXICO_DOOM` 参照):

```ts
  // Mexico
  huracan: "???", // ハリケーン上陸。fine/percentLoss/loseProperties系が合う
  temblor: "???", // 地震
  ceniza: "???", // 火山灰。skipTurn系(空港便が止まる)が合う
  contingencia: "???", // 大気汚染の自動車規制。skipTurn系が合う
  chaneque: "???", // 精霊に化かされる。teleport系が合う
  ratero: "???", // すり。steal系が合う
  padrino: "???", // 代父母の費用負担。payOthers系が合う
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

art担当がファイルを作り次第、import行と `DOOM_ANIMATIONS` への追加が
必要です(ファイル名は `mexico-huracan.tsx` 等を想定)。

```ts
import { MexicoHuracan } from "./mexico-huracan";
import { MexicoTemblor } from "./mexico-temblor";
import { MexicoCeniza } from "./mexico-ceniza";
import { MexicoContingencia } from "./mexico-contingencia";
import { MexicoChaneque } from "./mexico-chaneque";
import { MexicoRatero } from "./mexico-ratero";
import { MexicoPadrino } from "./mexico-padrino";
```

```ts
  "mexico-huracan": MexicoHuracan,
  "mexico-temblor": MexicoTemblor,
  "mexico-ceniza": MexicoCeniza,
  "mexico-contingencia": MexicoContingencia,
  "mexico-chaneque": MexicoChaneque,
  "mexico-ratero": MexicoRatero,
  "mexico-padrino": MexicoPadrino,
```

## 自分で確かめたこと(2026-08-19)

- `node --check` を7ファイルすべてに実行 → 構文OK。
- `npx eslint scripts/countries/mexico/` → 警告0件。
- 都市45・路線51・クイズ109・お金の出来事25・アイテム9・厄災7・季節12・
  地方7・音楽7地方であることを機械確認(`node -e "..."` で全ファイルの
  export件数を数えた)。
- **4言語の欠け**: 全ファイルで `t()` が例外を投げていないことを実行時に確認
  (`|` が3本無いと即座に例外になる仕組みのため、読み込みが通れば欠けは無い)。
- **陸地判定・海陸判定**: 使い捨ての `mexico.content.json`
  (`proj`/`cities`/`edges`/`land`/`lakes` のみ)を組んで
  `node scripts/check-sea-routes.mjs mexico` を実行 → 当初51本中7本が
  海/陸に大きくはみ出し。「端の入れ替え」「航路化」で6本を完全解消。
  **残り1本(`mexicali–hermosillo`)は282px→67px(14%)まで縮めたところで
  打ち止め**にしてあります(間に挟める町が無く、実在するソノラ砂漠沿いの
  陸路なのでコメントに`KEPT`として残してあります)。使い捨てjsonは
  検査後に削除済み。
- **`seg`**: 全51本の投影後距離を実測し、140に確定(最長662px、
  seg=140で最大5マス・5マス超0本)。
- **クイズ**: 使い捨ての `mexico.content.json`(`cities`/`quiz`のみ)を組んで
  `node scripts/check-quiz.mjs mexico` を実行。当初11件の指摘のうち
  6件(実質的な重複3件・言語混入2件・語尾の書き漏れ1件)を直し、
  **残り5件は確認のうえ「短い答えの誤検知」として残してあります**
  (下記「判断が要ること」参照)。使い捨てjsonは検査後に削除済み。
- アイテム鍵9件(`globo`/`brujula`/`chepe`/`trenmaya`/`copal`/`silbato`/
  `acordeon`/`centenario`/`chapulin`)が既存266鍵と衝突しないことを
  機械チェック済み(0件)。
- 音楽: 7地方すべての `mel`(8小節)が1小節16ステップぴったりで埋まっている
  ことを機械チェック済み(過不足0)、`ch`(和音)が全て3音であることも確認済み。
- `mark`(38種)・`bg`(18種)は、`ART-KEYS.md` の表と `cities.mjs` の
  実際の使用が完全一致することを機械チェック済み(2026-08-19、
  以前このファイルに書いていた「33種」の誤りを発見して38種に訂正)。
- **物件価格の開き**: 45都市書き終えた時点で通しで測ったところ、
  最安220〜最高900の4.1倍しか無かった(目安12〜17倍に届いていなかった)。
  5件(テオティワカン「死者の大通りの展望台」・マンサニージョ「コンテナ
  ターミナルのクレーン列」・モンテレイ「第3高炉のテラス」・チチェン・
  イッツァの2件)を引き上げ、**最安220〜最高3000の13.6倍**に直した
  (利回りは0.204〜0.210で揃えたまま)。チチェン・イッツァの2件のうち
  安いほうは1200止まりにして、最高額(3000)がその1都市に集中しすぎ
  ないようにした。

## 判断が要ること

- **art.mjs**: team-leadから伝えられたとおり絵は専任担当が別途書きます。
  `ART-KEYS.md` を見て進めてもらってください。**当初、絵担当のタスクが
  「記号18種」で完了扱いになっていた形跡があります**(こちらの `mark` は
  最終的に38種)。突き合わせをお願いします。
- **通貨倍率**: `mexico: 100` を仮に置きましたが、他の中南米・単独国盤面
  (northamerica/southamerica/venezuela等)との実質差(為替1.8倍以内)を
  確認したうえで確定してください。
- **季節・厄災の数値効果**: `season-and-doom-rules.ts` の書式に合わせて
  倍率と `DoomEffectId` を割り当ててください(上の6節に叩き台を書きました)。
- **クイズの答えの位置**: 0=25 / 1=55 / 2=29 とやや1に偏っています
  (出題時にシャッフルされるため実害はありませんが、参考までに)。
- **クイズで「短い答え」として残した5件**(`check-quiz.mjs`が挙げたもの。
  いずれも一般知識で、特定のカードを読まないと分からない秘密の情報では
  ないと判断しました):
  - Q21 正解「カトリック」/ サン・クリストバル・デ・ラス・カサスのカードと
    「信仰」で一致 → メキシコの多数派宗教という一般常識
  - Q29 正解「1810年」/ グアナフアトのカードと「独立戦争」で一致 →
    独立戦争の開始年という広く知られた基礎知識(グアナフアト以外に
    ケレタロ・サン・ミゲル・サン・ルイス・ポトシのカードも1810年や
    独立に触れているため、特定のカード1枚に紐づく話ではない)
  - Q59 正解「ユカタン半島」/ バカラールのカードと「半島」で一致 →
    チクシュルーブ・クレーターの位置という科学的に広く知られた事実
  - Q90 正解「ラサロ・カルデナス」/ タンピコのカードと「大統領」で一致 →
    「大統領」という語の一致による誤検知(質問は石油国有化に触れない
    ように書き直し済み)
  - Q101 正解「メキシコ」/ 複数カードと「革命」で一致 →
    国名そのものはどのカードにも出る枠語(「アフリカ」「Africa」と同じ扱い)

## 迷った点

- **難易度9〜10(15問)は1問ずつ裏を取りました。**確度がやや低いと
  判断したもの2件:
  - グリセルダ・アルバレスがコリマ州知事に就任した年(1979年)。
    複数の資料で一致していますが、念のため確認をお願いします。
  - ユカテコ・マヤ語が「先住民言語で話者数2位」という順位。
    国勢調査の年度によって多少の入れ替わりがありうる統計です。
  - メキシコ国歌の「婚約者に部屋へ閉じ込められて歌詞を書いた」逸話は
    **伝承として明記**し、事実として断定していません。
- **麻薬組織関連の題材は入れていません。**都市・厄災・クイズすべてで
  「いま人が普通に暮らし、公共交通が普通に動いている町か」を物差しにしました。
- **マヤ列車(トレン・マヤ)は賛否両方を事実として書きました。**
  ビジャエルモサ(西の起点。北アメリカ大陸盤面のカード、参考)ではなく
  トゥルムのカードとアイテム`trenmaya`の両方で触れており、
  トゥルムのほうは洞窟ダイバーや環境団体の訴訟という批判の側を中心に
  書いています。
