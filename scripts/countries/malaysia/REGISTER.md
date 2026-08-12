# マレーシア盤面の登録内容

`scripts/countries/malaysia/` 8ファイルと `dooms/malaysia-*.tsx` 7枚は作成済み。
以下、共有ファイルへ貼り付けるためのコード片。

## 1. `scripts/extract-legacy-content.mjs`

import 行(既存の `buildItalyContent` の import の下に追加):

```js
import { buildMalaysiaContent } from "./countries/malaysia/index.mjs";
```

`AUTHORED_COUNTRIES` への追加行(既存の配列に1行足すだけ):

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
  buildUkContent(),
  buildItalyContent(),
  buildMalaysiaContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の通貨倍率

`CURRENCY_MULTIPLIERS` に1行追加:

```js
  // RM 1,200 → RM 360,000。1リンギット≒33円として、日本(×10000で
  // ¥12,000,000)と比べると RM360,000×33円 ≒ ¥11,880,000 で、日本の0.99倍。
  // 為替1.8倍以内の基準に十分収まる。
  malaysia: 300,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  malaysia: () => import("./malaysia.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  malaysia: () => import("../content/malaysia.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

```ts
  // Malaysia
  beca: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  jadual: { type: "choose-exact-dice" },
  ets: { type: "roll-fixed-dice", diceCount: 2 },
  platinum: { type: "roll-fixed-dice", diceCount: 3 },
  azimat: { type: "none" }, // 厄災の神(トヨル)のward item(passive)
  jampi: { type: "repel-spirit" },
  bocoran: { type: "quiz-save" },
  durianruntuh: { type: "gain-cash", amount: 380 },
  orangdalam: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6a. `SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん

地方コード: `cen`=中部(クランバレー) / `nor`=北部 / `eco`=東海岸 / `sou`=南部 /
`swk`=サラワク / `sab`=サバ。4月始まり。10月(index 6、旧正月)が休神、
9月(index 5、タイプーサム)が全員アイテム配布。

```ts
  /**
   * マレーシア。清明節 → カアマタン(サバ収穫祭) → ガワイ祭(サラワク収穫祭) →
   * ドリアンの最盛期と学校の長期休暇 → ムルデカ(独立記念日) →
   * マレーシア・デー(サバ・サラワク加盟) → ディーパヴァリ →
   * 北東モンスーンで東海岸が閉じる → クリスマスとモンスーン最盛期 →
   * タイプーサム(全員アイテム配布) → 旧正月(休神) →
   * ハリラヤ・アイディルフィトリ、という流れ。
   */
  malaysia: [
    /* 0 Apr 清明節 */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 1.15 },
    ],
    /* 1 May カアマタン(サバ収穫祭) */ [
      { op: "region-income-multiplier", regionId: region("sab"), multiplier: 1.3 },
    ],
    /* 2 Jun ガワイ祭(サラワク収穫祭) */ [
      { op: "region-income-multiplier", regionId: region("swk"), multiplier: 1.3 },
    ],
    /* 3 Jul ドリアンの最盛期と学校の長期休暇 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("eco"), multiplier: 1.15 },
    ],
    /* 4 Aug ムルデカ(独立記念日) */ [
      { op: "all-players-gain-cash", amount: 260 },
    ],
    /* 5 Sep マレーシア・デー(サバ・サラワク加盟) */ [
      { op: "region-income-multiplier", regionId: region("swk"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("sab"), multiplier: 1.25 },
    ],
    /* 6 Oct ディーパヴァリ */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sou"), multiplier: 1.15 },
    ],
    /* 7 Nov 北東モンスーンで東海岸が閉じる */ [
      { op: "region-income-multiplier", regionId: region("eco"), multiplier: 0.75 },
    ],
    /* 8 Dec クリスマスとモンスーン最盛期 */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("eco"), multiplier: 0.7 },
    ],
    /* 9 Jan タイプーサム(バトゥ洞窟) */ [{ op: "give-item-to-all" }],
    /* 10 Feb 旧正月(休神) */ [
      { op: "rest-spirit" },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 1.2 },
    ],
    /* 11 Mar ハリラヤ・アイディルフィトリ */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 1.2 },
    ],
  ],
```

### 6b. `DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件

```ts
  // Malaysia
  "denda-aes": "fine",
  "banjir-kilat": "percentLoss",
  "gangguan-ets": "skipTurn",
  "kebakaran-pasar": "loseProperties",
  "kalah-mahjong": "payOthers",
  "bas-salah": "teleport",
  ragut: "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts` に足す7枚

import(アルファベット順。`ItalyXxx` と他国の頭文字のあいだ、
登録順に合わせて挿入してください):

```ts
import { MalaysiaBanjirKilat } from "./malaysia-banjir-kilat";
import { MalaysiaBasSalah } from "./malaysia-bas-salah";
import { MalaysiaDendaAes } from "./malaysia-denda-aes";
import { MalaysiaGangguanEts } from "./malaysia-gangguan-ets";
import { MalaysiaKalahMahjong } from "./malaysia-kalah-mahjong";
import { MalaysiaKebakaranPasar } from "./malaysia-kebakaran-pasar";
import { MalaysiaRagut } from "./malaysia-ragut";
```

`DOOM_ANIMATIONS` への追加行:

```ts
  "malaysia-banjir-kilat": MalaysiaBanjirKilat,
  "malaysia-bas-salah": MalaysiaBasSalah,
  "malaysia-denda-aes": MalaysiaDendaAes,
  "malaysia-gangguan-ets": MalaysiaGangguanEts,
  "malaysia-kalah-mahjong": MalaysiaKalahMahjong,
  "malaysia-kebakaran-pasar": MalaysiaKebakaranPasar,
  "malaysia-ragut": MalaysiaRagut,
```

## 補足: `src/presentation/components/setup/country-groups.ts`

未確認。アジア圏の束(`asia` 等)に `"malaysia"` を含める必要があるか、
登録側で確認してください(触っていません)。

## 自分で確かめたこと

- `node -e 'import("./scripts/countries/malaysia/index.mjs").then(m => { const c = m.buildMalaysiaContent(); console.log(Object.keys(c.cities).length, c.edges.length, c.quiz.length, c.moneyEvents.length, Object.keys(c.marks).length, Object.keys(c.bg).length); })'`
  → `42 54 39 22 28 28`(都市42・路線54・クイズ39・出来事22・mark28種・bg28種)。
  例外なし(`buildMalaysiaContent()` 自体が全 `t()` 呼び出しを通すため、1件でも
  4言語の欠けがあれば例外で落ちる)。
- 4言語の欠け: `cities.mjs` / `flavour.mjs` / `quiz.mjs` / `money-events.mjs` /
  `geography.mjs` の5ファイルを対象に、`"...|...|...|..."` 形の文字列を
  機械的に抽出して`|`の数が3本かを数える簡易チェックを実施。0件
  (ヒットした4件はいずれも `t()` ヘルパー自身の `source.split("|")` という
  コードの一部で、コンテンツではない誤検知と確認済み)。作業中には
  実際に2件(コタキナバルの物件名・ジョホールバルの物件名)を書き漏らして
  `buildMalaysiaContent()` 相当の読み込みで例外落ちし、その場で気づいて
  直した。
- **都市と海岸線の距離を全42都市で機械チェック**(最近傍のポリゴン頂点との
  経緯度距離)。最初の版でジョージタウン(0.018度)・コタキナバル(0.0024度、
  ほぼ座標が重なっていた)が危険域で、team-leadの指摘どおり境界線上の
  判定が不安定になるところだった。追加で書いた37都市でも同じ問題が
  6件(ミリ・ビントゥル・サンダカン・タワウ・センポルナ・クアラブスット)
  見つかり、いずれも海岸線側の座標を沖へ振って直した。ランカウイは
  都市側の座標を島の中心寄りへ動かして直した。**最終的に全42都市が
  海岸線から0.05度以上離れていることを確認済み**(最小はジョージタウンの
  0.0518度)。
- mark(28種)とbg(28種)は `cities.mjs` の42都市から過不足なく参照されて
  いることを機械チェック済み(未使用キー0・不足キー0、両方向とも)。
  未使用関数もチェックし、`sun()` が1件も呼ばれていなかったため削除した
  (`crane()` は最初のバージョンで未使用だったため、`port` 背景を追加して
  実際に使うようにした)。
- `sky()` の第3引数: 28背景すべてを対象に、`rsvg-convert` でマゼンタ台紙の
  上にPNG化して目視確認した。**1回目で `hillstation-casino` に実害のある
  塗り残しを発見**(雲の切れ間からマゼンタが透けていた。`sky()` の第3引数が
  120のままで、実際に次に来る全面塗り `ground()` は150から始まっていた)。
  第3引数を150に直して再確認、透ける帯なしを確認した。
- 背景1枚あたりの平均要素数(`<rect|circle|ellipse|path|line|polygon|polyline>`
  のタグ数で機械計測): 最初の5都市ぶんだけで平均42.2だったが、残り23種を
  足した直後は平均29.9まで下がった(目安40を下回る種が10件)。密度の低い
  10種(オランウータン16・ミナンカバウ18・海食柱20など)に要素を足し込み、
  **最終的に28種・平均36.3**まで引き上げた(最少は港・水上集落の25、
  最多はショップハウスの63)。
- TypeScriptの型チェック: `dooms/malaysia-*.tsx` 7枚を対象に、プロジェクト全体の
  `npm run check` は使わず、`tsc --noEmit --jsx react-jsx` で7ファイルだけを
  スコープした軽量チェックを実施し、エラー0件を確認。
- 厄災の絵(7枚)に文字要素は使っていません。麻雀の牌は筒子(丸の模様)のみで
  描き、萬子(漢数字)は使っていません。バス乗り間違いの行き先案内は
  色つきランプのみで、文字は入れていません。

## 質について

- 都市数42・路線54(1都市あたり1.29本、イタリアの1.31本に近い)。
- クイズ39問。正解の位置は当初20/6/2と大きく偏っていたため、5問の選択肢を
  並べ替えて17/11/11まで均した(完全な均等ではないが、韓国盤面などの
  既存の許容幅に収まる水準と判断)。
- 出来事22件(増14・減8)。6地方すべてで、全国共通4件に頼らずとも
  地方専用の出来事だけでgain・lossの両方が引けることを機械チェック済み
  (各地方の内訳: gain2・loss1)。

## `seg` について

45都市54路線を実測。ほとんどの路線は同じ地方どうしの近距離(投影後
100〜700px)で、`seg=150`なら1マス38本・2マス14本・3マス1本に収まる。
9マス上限になるのは半島⇄ボルネオの2本(クラン―クチン1497px、
クラン―コタキナバル2472px)だけで、これは南シナ海の空白を渡る本盤面で
いちばん長い航路として意図した結果であり、「9マスに張り付く路線が並ぶ
詰まり」ではないと判断した。詳細な理由は `geography.mjs` の `MALAYSIA_PROJ`
のコメントに残してある。

## 迷った点

- **ペナン大橋の扱い**: 実在するのは道路橋(1985年開通・鉄道は通っていない)
  だが、`georgetown` は他の島(ランカウイ・ティオマン・ラブアン)と同じく
  `"sea"` の航路で本土と結んだ。橋の有無で1島だけ陸路の扱いにすると、
  地図から「なぜペナンだけ違うのか」が読み取れなくなるため、一貫性を
  優先した。判断が違うと感じる場合は `alorsetar-georgetown` /
  `georgetown-lumut` の2本を陸路(`"sea"`を外す)に変えれば済む、
  添字も他路線に波及しない独立した変更にしてある。
- **半島⇄ボルネオの航路**: 現在は定期旅客船が存在しない(空路のみ)。
  ゲームとしての連結性を優先し、かつて実在したストレーツ・スティームシップ社の
  シンガポール―クチン―ラブアン―サンダカン等の歴史的航路にならって
  `klang-kuching` と `klang-kotakinabalu` の2本を航路にした。現存しない
  ことは事実として認識しており、判断に迷いがあれば差し替えや廃止も
  検討の余地がある。
- **テノムを42番目の都市として追加**: 5都市プレビューの時点では想定していな
  かったが、team-leadの指示「無い線を引かないでください」を守りつつ
  ボルネオ唯一の実在する鉄道(コタキナバル―テノム、北ボルネオ鉄道・
  パダス渓谷)を盤面に反映するため、その終着点テノムを追加した。
  「38〜42」の上限にちょうど収まっている。
- **クチンの猫像・コタキナバルのアキ・ナバル**は5都市プレビュー時点で
  team-leadに確認済みの内容のまま変更していない(唯一、マラッカの
  「唯一」の言い回しだけ指摘に従って修正した)。
- **多民族の反映**: マレー系(ハリラヤ・アジマット・ジャンピ・ワウ凧・
  影絵芝居ワヤンクリ)、華人系(清明節・旧正月・麻雀・獅子舞・ショップハウス)、
  インド系(ディーパヴァリ・タイプーサム)、ボルネオの先住民族
  (イバン・カダザンドゥスン・ルングス・ムルット・バジャウ・ラウト)を
  アイテム・季節・都市の豆知識それぞれに分散させ、半島の3民族だけで
  終わらないよう意識した。都市42件のうちサバ・サラワクは14件(合わせて
  33%)で、指示の「10件以上」を上回っている。
