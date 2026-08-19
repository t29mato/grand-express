# アフリカ盤面の登録内容

`scripts/countries/africa/` 7ファイル(`cities`/`geography`/`quiz`/
`money-events`/`flavour`/`music`/`index`)と `ART-KEYS.md` は作成済み。
`art.mjs` と `dooms/africa-*.tsx` 7枚は別担当(絵の専任)が作成済み。

都市61・路線65・クイズ103・お金の出来事18・アイテム9・厄災7・季節12・
mark18種・bg17種・音楽7地方。以下、共有ファイルへ貼り付けるためのコード片。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の最後の大陸盤面の import の下に追加):

```js
import { buildAfricaContent } from "./countries/africa/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行(既存の配列末尾に1行足すだけ):

```js
const AUTHORED_COUNTRIES = [
  // ...既存の各国...
  buildAfricaContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

```js
  // 開始資金1200 × 100 = $120,000。世界一周・アジアなど他の大陸盤面と同じ倍率。
  africa: 100,
```

(`CITY_PROPS` への追加は無し。物件価格は `cities.mjs` に直接書き込んである。
最安180〜最高2700=15倍で、目安の12〜17倍に収まっていることを確認済み。)

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  africa: () => import("./africa.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  africa: () =>
    import("../content/africa.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

**鍵の衝突なしを確認済み**(既存293件、下記「自分で確かめたこと」参照)。

```ts
  // Africa
  telegraphslip: { type: "extra-turn" },
  dhowpassage: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  gaugechit: { type: "choose-exact-dice" },
  resthousevoucher: { type: "none" }, // 厄災の神(繋がらなかった線)のward item(passive)
  kolanuts: { type: "gain-cash", amount: 260 },
  goldweight: { type: "quiz-save" },
  coffeesack: { type: "roll-fixed-dice", diceCount: 2 },
  orewagonslip: { type: "roll-fixed-dice", diceCount: 3 },
  trackwalkerlantern: { type: "repel-spirit" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `mag`=マグレブ・ナイル・モーリタニア / `sah`=サヘル・西アフリカ内陸 /
`gof`=ギニア湾岸 / `caf`=中部アフリカ・コンゴ盆地 / `hoa`=アフリカの角 /
`eaf`=東アフリカ・大湖地方 / `saf`=南部アフリカ。4月始まり。
12月(index 8, サイクロン季)が休神、9月(index 5, エンクタタシュ=
エチオピア新年)が全員アイテム配布。

既存の `SEASON_EFFECTS_BY_COUNTRY` オブジェクトの閉じ `};` の直前に追加:

```ts
  /**
   * アフリカ大陸。東アフリカの長雨 → ザンベジの増水 → サヘルの酷暑 →
   * グレート・マイグレーションのマラ川渡渉 → ナマクアランドの花 →
   * エンクタタシュ(9月・給アイテム) → 東アフリカの短雨 → ハルマッタン →
   * インド洋サイクロン季(12月・休神) → セレンゲティの出産期 →
   * ケープワインの収穫 → ラマダーンの移動、という流れ。
   */
  africa: [
    /* 0 Apr 東アフリカの長雨 */ [
      { op: "region-income-multiplier", regionId: region("eaf"), multiplier: 0.9 },
    ],
    /* 1 May ザンベジの増水(ヴィクトリアフォールズ観光の最盛期) */ [
      { op: "region-income-multiplier", regionId: region("saf"), multiplier: 1.15 },
    ],
    /* 2 Jun サヘルの酷暑(雨季の前) */ [
      { op: "region-income-multiplier", regionId: region("sah"), multiplier: 0.85 },
    ],
    /* 3 Jul グレート・マイグレーションのマラ川渡渉(サファリ最盛期) */ [
      { op: "region-income-multiplier", regionId: region("eaf"), multiplier: 1.3 },
    ],
    /* 4 Aug ナマクアランドの花(南部アフリカの観光最盛期) */ [
      { op: "region-income-multiplier", regionId: region("saf"), multiplier: 1.2 },
    ],
    /* 5 Sep エンクタタシュ(エチオピア新年) */ [{ op: "give-item-to-all" }],
    /* 6 Oct 東アフリカの短雨 */ [
      { op: "region-income-multiplier", regionId: region("eaf"), multiplier: 0.9 },
    ],
    /* 7 Nov ハルマッタン(サハラの砂塵が西アフリカを覆う) */ [
      { op: "region-income-multiplier", regionId: region("mag"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("sah"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("gof"), multiplier: 0.9 },
    ],
    /* 8 Dec インド洋サイクロン季(休神) */ [
      { op: "region-income-multiplier", regionId: region("saf"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("eaf"), multiplier: 0.85 },
      { op: "rest-spirit" },
    ],
    /* 9 Jan セレンゲティの出産期(サファリ最盛期) */ [
      { op: "region-income-multiplier", regionId: region("eaf"), multiplier: 1.25 },
    ],
    /* 10 Feb ケープワインの収穫 */ [
      { op: "region-income-multiplier", regionId: region("saf"), multiplier: 1.15 },
    ],
    /* 11 Mar ラマダーン(営業時間短縮とイード・アル=フィトルの喜捨) */ [
      { op: "region-income-multiplier", regionId: region("mag"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("sah"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("hoa"), multiplier: 0.9 },
      { op: "all-players-pay-cash", amount: 150 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

既存の `DOOM_EFFECT_ID_BY_LEGACY_ID` オブジェクトの閉じ `};` の直前に追加。
**`id` は絵の担当が実際に描いたファイル名
(`dooms/africa-{harmattan,washout,borderclosed,gaugebreak,checkpoint,
wildlifedetour,coppertheft}.tsx`)に合わせて `flavour.mjs` 側を直してある。**

```ts
  // Africa
  harmattan: "fine", // 砂に埋もれた線路の掘り出し費用
  washout: "loseProperties", // 洗い流された土手ぞいの物件
  borderclosed: "skipTurn", // 突然の国境封鎖で足止め
  gaugebreak: "percentLoss", // 積み替えの手間で荷が傷んで値崩れ
  checkpoint: "payOthers", // 検問の袖の下を全員に分け与える
  wildlifedetour: "teleport", // 保護区を迂回させられる
  coppertheft: "steal", // 架線の銅線が盗まれる
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(既存の最後の大陸盤面の import の下に追加):

```ts
import { AfricaHarmattan } from "./africa-harmattan";
import { AfricaWashout } from "./africa-washout";
import { AfricaBorderclosed } from "./africa-borderclosed";
import { AfricaGaugebreak } from "./africa-gaugebreak";
import { AfricaCheckpoint } from "./africa-checkpoint";
import { AfricaWildlifedetour } from "./africa-wildlifedetour";
import { AfricaCoppertheft } from "./africa-coppertheft";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "africa-harmattan": AfricaHarmattan,
  "africa-washout": AfricaWashout,
  "africa-borderclosed": AfricaBorderclosed,
  "africa-gaugebreak": AfricaGaugebreak,
  "africa-checkpoint": AfricaCheckpoint,
  "africa-wildlifedetour": AfricaWildlifedetour,
  "africa-coppertheft": AfricaCoppertheft,
```

エクスポート名は7枚とも `grep -n "^export function" dooms/africa-*.tsx` で
直接確認済み(`AfricaHarmattan`/`AfricaWashout`/`AfricaBorderclosed`/
`AfricaGaugebreak`/`AfricaCheckpoint`/`AfricaWildlifedetour`/
`AfricaCoppertheft`、上のimport文と一致)。

## 補足: `src/presentation/components/setup/country-groups.ts`

確認していません(触らない指示のファイル)。

## 自分で確かめたこと

- `node -e "import('./scripts/countries/africa/index.mjs').then(m => { const c = m.buildAfricaContent(); console.log(Object.keys(c.cities).length, c.edges.length, c.quiz.length, c.moneyEvents.length, Object.keys(c.items).length, c.doom.length, c.seasons.length, Object.keys(c.marks).length, Object.keys(c.bg).length, Object.keys(c.styles).length); })"`
  → `61 65 103 18 9 7 12 18 17 7`。例外なし。
- **4言語の欠け**: 全ファイルで `t()` の検証(`|`が3本ちょうど)を通過。
  書いている最中に例外で気づいたものはすべて直った状態でコミットしてある。
- **mark/bg の過不足**: `cities.mjs` が使うキーと `art.mjs`
  (`AFRICA_MARKS`/`AFRICA_BG`)が定義するキーを突き合わせ、
  両方向とも過不足0を機械確認した(使われているが描かれていないキー0件・
  描かれているが使われていないキー0件)。
- **陸地判定**: `world/geography.mjs` の `AFRICA`/`MADAGASCAR`/`ZANZIBAR`
  ポリゴンで61都市すべてが陸地内・投影範囲内であることを確認した。
  世界盤面用の粗い海岸線のままだと8都市(ダーバン・ナカラ・ワルビスベイ・
  ポワントノワール・コナクリ・フリータウン・モンロビア・スファックス・オラン)
  が海側に出たため、`geography.mjs` でその周辺の頂点を追加・修正した。
- **路線のgeometry**: `check-sea-routes.mjs` を自分で実行できた(使い捨て
  content.jsonを組んで検査後に削除、手順書の「焼く前でも回せる」節どおり)。
  当初14本が60px超で引っかかり、端の入れ替え・陸路/航路の種別変更・
  中継都市トゥアマシナの追加(60→61都市)を経て1本まで減らした。
  **残る1本(`toamasina`—`nacala`、136px・41%)はKEPT扱いで
  `cities.mjs` の `AFRICA_EDGES` 末尾にコメントで理由を残してある**
  (アンタナナリボが内陸のため、相手都市を変えても136px未満にならなかった。
  `bali:nusapenida-sanur` 46%と同種の「4通り試したうえでの最小値」)。
  焼き上がった `africa.content.json` でこの検査を再実行してもらえると安心です。
- **クイズの機械検査**: `check-quiz.mjs` を自分で実行(使い捨てcontent.json
  で検査後に削除)。答えの漏れ1件を見つけて直した(Q103「ジンバブエは
  内陸国」→`beira`カードの記述と重複していたため、カバの生態の設問に
  差し替え)。日本語欄へのローマ字混入2件を言い換えで解消。残り10件の
  「漏れ?」候補は国名の偶然の一致と判断した(下記「難易度9〜10の裏取り」
  とあわせて詳しくは `quiz.mjs` 冒頭のコメント参照)。`M-Pesa`(Q71)は
  固有名詞そのもので`TGV`と同種の例外だが、**ACCEPTEDへの追加が
  既に反映されているのを確認した**(このメッセージを書いている時点で
  `check-quiz.mjs` の出力に「例外」として出るようになっていた)。
- **難易度9〜10(11問)の裏取り**: 1問ずつ確認した。確度がやや低いと
  自分で判断したものが1件ある: マシアス・ンゲマ政権下(赤道ギニア)で
  死亡・亡命した人口の割合「およそ3分の1」(複数の資料で繰り返し見る
  数字だが、厳密な統計調査ではなく概算)。残り10問は年号・数値とも
  複数の情報源で一致しており確度が高いと判断した。
- アイテム鍵9件(`telegraphslip`/`dhowpassage`/`gaugechit`/
  `resthousevoucher`/`kolanuts`/`goldweight`/`coffeesack`/`orewagonslip`/
  `trackwalkerlantern`)が、既存の鍵一覧(293件)と衝突しないことを
  機械チェック済み(0件)。
- 音楽: 7地方すべての `mel`(8小節)が1小節16ステップぴったりで埋まっている
  ことを機械チェック済み(過不足0、8小節8和音・3和音構成であることも確認)。
- 物件価格: 対数線形変換で最安180〜最高2700(15倍)に引き直した(元は
  最安260〜最高1400=5.4倍で目安に届いていなかった)。利回りは全件20.6%を
  維持。
- 正解の位置(`a`)は散らしていない(0=83/1=15/2=5)。指示書
  (new-board-brief.md)に「出題時にシャッフルされる」とあるための対応。

## 質について

- 都市1件あたりの面積: 61都市・BW2268×BH2382=5,402,376px² →
  約88,564px²/都市(目安90kにほぼ一致)。
- 路線密度: 61都市に対して65本(1都市あたり1.07本)。全体で1つの
  連結成分になっていることを確認済み。
- 国の内訳: 33か国、1国につき1〜3都市(上限厳守)。

## 迷った点

- **`toamasina` を61都市目として追加した。**当初の60都市承認後、
  `antananarivo`—`nacala` の航路がどう調整しても陸を大きく横切ったため、
  実在するタナナリブ―コートエスト鉄道(1913年)を中継する形で追加した。
  team-leadの承認を得ないまま1都市増やした形になるので、ここで報告する。
- **サヘル地域(マリ・ブルキナファソ・ニジェール)には都市を置いていない。**
  ジハード系武装勢力の活動が国土の広い範囲に及んでいるため。
  ダカール・アビジャン・コトヌーの文中で言及するに留めた。チャドの
  ンジャメナだけは、紛争ではなく「鉄道が一度も届いていない」空白を
  主題にできる首都として `sah` 枠に採用した。
- **厄災の神を、特定の一国の民話ではなく「完成しなかったケープ〜カイロ
  鉄道」そのものにまつわる噂にした。**61都市・33か国にまたがる盤面で
  一国の民話を大陸全体の伝承であるかのように語るのは不誠実だと判断し、
  アジア盤面の「時刻表に無い列車」と同じ扱い方を採った。
