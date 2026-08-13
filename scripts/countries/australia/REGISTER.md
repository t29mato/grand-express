# オーストラリア盤面の登録手順

`scripts/countries/australia/`(8ファイル)と
`src/presentation/components/events/dooms/australia-*.tsx`(7ファイル)は
作成済み・検証済み。共有ファイルには一切触れていない。ここに書いた変更を
取りまとめ側で適用し、`node scripts/extract-legacy-content.mjs` と
`npm run check` を通してほしい。

china のときと同じ7箇所。貼り付け用のコードをそのまま載せてある。

---

## 1. `scripts/extract-legacy-content.mjs`

import を1行追加(既存の `buildCanadaContent` など、末尾の import の下)。

```js
import { buildAustraliaContent } from "./countries/australia/index.mjs";
```

`AUTHORED_COUNTRIES` 配列の末尾に1行追加。

```js
  buildAustraliaContent(),
```

※ 作業中に他の担当の登録で配列が伸びていたため、正確な行番号ではなく
「末尾に足す」と書いている。

---

## 2. `scripts/content-overrides/property-economy.mjs`

`CURRENCY_MULTIPLIERS` に1行追加。ブリーフで指示のあった `australia: 100`
（A$120,000）をそのまま使うことを想定しているが、念のため根拠を書いておく。

```js
  // A$1,200 → A$120,000。1豪ドル≒100円(2020年代半ばの目安相場)とすると、
  // 日本(×10000で¥12,000,000)を100で割った120とほぼ一致する。
  // ブリーフの指示どおり、きりのよい100に丸めた(実質は日本の-16.7%)。
  australia: 100,
```

**australia/flavour.mjs の `AUSTRALIA_META.cur` は暫定値 `mul: 100` のまま**
にしてある(他の書き起こし国と同じ約束。ここで実値に置き換わる想定)。

---

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に1行追加。

```ts
  australia: () => import("./australia.content.json").then((m) => m.default),
```

---

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に1行追加。

```ts
  australia: () => import("../content/australia.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

---

## 5. `src/infrastructure/content/item-effect-rules.ts`

`ITEM_EFFECT_BY_LEGACY_KEY` に9行追加(他国と同じ並び順)。

```ts
  // Australia
  willywilly: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  swag: { type: "choose-exact-dice" },
  roadtrain: { type: "roll-fixed-dice", diceCount: 2 },
  ghanticket: { type: "roll-fixed-dice", diceCount: 3 },
  vegemite: { type: "none" }, // 厄災の神(バニップ)のward item(passive)
  canetoad: { type: "repel-spirit" },
  speewah: { type: "quiz-save" },
  cupsweep: { type: "gain-cash", amount: 380 },
  twoup: { type: "extra-turn" },
```

**9件とも既存キーと衝突しないことを確認済み。** 確認方法は本ファイル末尾の
「9. 自己検証の方法」を参照(21件の既存盤面すべてに対して確認した)。

---

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 6.1 `SEASON_EFFECTS_BY_COUNTRY` に `australia:` を追加

`australia/flavour.mjs` の `AUSTRALIA_SEASONS`(フレーバー文)と対になる
数値ルール。地方コードは `nsw` / `vic` / `qld` / `sa` / `wa` / `tas` / `nt`。

```ts
  australia: [
    /* 0 Apr アンザック・デー(夜明けの式典) */ [
      { op: "rest-spirit" },
    ],
    /* 1 May ヴィヴィッド・シドニー */ [
      { op: "region-income-multiplier", regionId: region("nsw"), multiplier: 1.25 },
    ],
    /* 2 Jun アルパインスキーのシーズン開幕(NSW・VICの山岳部) */ [
      { op: "region-income-multiplier", regionId: region("nsw"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("vic"), multiplier: 1.15 },
    ],
    /* 3 Jul NAIDOC週間 */ [
      { op: "all-players-gain-cash", amount: 240 },
    ],
    /* 4 Aug クジラの回遊とWAの野生の花畑 */ [
      { op: "region-income-multiplier", regionId: region("wa"), multiplier: 1.3 },
    ],
    /* 5 Sep グランドファイナル(AFL=VIC・NRL=NSW) */ [
      { op: "region-income-multiplier", regionId: region("vic"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("nsw"), multiplier: 1.15 },
    ],
    /* 6 Oct サマータイム開始、州で食い違う */ [
      { op: "all-players-pay-cash", amount: 150 },
    ],
    /* 7 Nov メルボルン・カップ */ [
      { op: "region-income-multiplier", regionId: region("vic"), multiplier: 1.35 },
      { op: "all-players-gain-cash", amount: 260 },
    ],
    /* 8 Dec クリスマスとボクシングデー・テスト(MCG=VIC) */ [
      { op: "region-income-multiplier", regionId: region("vic"), multiplier: 1.2 },
      { op: "all-players-gain-cash", amount: 300 },
    ],
    /* 9 Jan オーストラリア・デー(祝日勤務の割増賃金という形で経済効果のみ扱う) */ [
      { op: "all-players-gain-cash", amount: 220 },
    ],
    /* 10 Feb 猛暑とシドニー・マルディグラ */ [
      { op: "region-income-multiplier", regionId: region("nsw"), multiplier: 1.25 },
    ],
    /* 11 Mar ムーンバ(メルボルン) */ [
      { op: "region-income-multiplier", regionId: region("vic"), multiplier: 1.15 },
    ],
  ],
```

9月(オーストラリア・デー)は係争のある祝日であるため、祝祭として扱わず
「祝日勤務は割増賃金になる」という実務的な経済効果だけにとどめてある
(詳しくは §8 の「迷った点」を参照)。

### 6.2 `DOOM_EFFECT_ID_BY_LEGACY_ID` に7行追加

`australia/flavour.mjs` の `AUSTRALIA_DOOM` はこの並び順(fine→steal)で書いてある。

```ts
  // Australia
  sunburn: "fine",
  coastalcyclone: "percentLoss",
  bogged: "skipTurn",
  bushfire: "loseProperties",
  shout: "payOthers",
  huntsman: "teleport",
  magpieswoop: "steal",
```

**`cyclone` は `coastalcyclone` に改名済み。** インドの既存 `cyclone`(effect: `percentLoss` で
偶然同じ)と鍵が衝突したため、取りまとめ側で `flavour.mjs` の id・絵のファイル名
(`australia-cyclone.tsx` → `australia-coastalcyclone.tsx`)・関数名
(`AustraliaCyclone` → `AustraliaCoastalCyclone`)・登録表の4箇所を直接改名してもらった。
中身(効果・文章・絵)は変わっていない。下のimport例はその結果を反映している。

---

## 7. `src/presentation/components/events/dooms/index.ts`

import を7行追加。

```ts
import { AustraliaBogged } from "./australia-bogged";
import { AustraliaBushfire } from "./australia-bushfire";
import { AustraliaCoastalCyclone } from "./australia-coastalcyclone";
import { AustraliaHuntsman } from "./australia-huntsman";
import { AustraliaMagpieSwoop } from "./australia-magpieswoop";
import { AustraliaShout } from "./australia-shout";
import { AustraliaSunburn } from "./australia-sunburn";
```

登録テーブルに7行追加。

```ts
  "australia-bogged": AustraliaBogged,
  "australia-bushfire": AustraliaBushfire,
  "australia-coastalcyclone": AustraliaCoastalCyclone,
  "australia-huntsman": AustraliaHuntsman,
  "australia-magpieswoop": AustraliaMagpieSwoop,
  "australia-shout": AustraliaShout,
  "australia-sunburn": AustraliaSunburn,
```

**この2箇所は取りまとめ側ですでに適用済み**(§ `cyclone` の改名を参照)。

7枚とも `npx tsc --noEmit --jsx react-jsx --esModuleInterop --skipLibCheck --strict`
による単体の型検査を通してある。動的な値を使うアニメーション
(バニップ…ではなく、火の粉・泥はね・カササギの急降下など)は
`transform-box: fill-box` と `transformOrigin` を JSX の `style` 属性で渡す形にした
(china の `transform-origin` パーセント指定と同じ考え方)。

---

## 8. 迷った点・判断した点

### 領有権・係争

- **ウルルはユララとして本編に入れた。** 2019年10月26日の登山禁止(伝統的
  所有者アナング族への正式な土地返還から34年後)を史実として明記し、
  観光案内の口調に流していない。装飾用のシンボル・背景では、なだらかな
  ドーム型の岩の輪郭だけを描き、登る人物は一切描いていない。
- **オーストラリア・デー(1月26日)は「祝いと異議が並び立つ日」として書いた。**
  多くのアボリジナル・トレス海峡諸島民が同じ日を「侵略の日」「生存の日」と
  呼んでいる事実を、季節フレーバーの1文目に明記した。season-and-doom-rules側の
  経済効果も、祝祭としてではなく「祝日勤務の割増賃金」という実務的な扱いに
  とどめている(§6.1参照)。
- **CPU名を英語の動物名(Kookaburra / Dingo / Bilby / Wombat)にした。**
  アボリジナル諸語は250以上あり土地ごとに違うため、綴りと言語の正確さを
  確認しきれないまま使うのは避けた(team-leadに事前確認済み)。

### 戦災・災害

- ダーウィンの1942年の空襲とサイクロン・トレイシー(1974年)は、破壊の
  描写を避けつつ史実として都市カードに明記した。厄災の絵
  (`australia-coastalcyclone.tsx` / `australia-bushfire.tsx`)は倒壊した建物や
  逃げ惑う人を描かず、炎・雲・傾く木だけで示している。
- マッカイの都市カードでは、サトウキビ産業を支えた太平洋諸島出身者の
  年季奉公労働(ブラックバーディング)を、歴史家の評価とともに明記した
  (地域が公に認め始めたのが最近であることも含めて)。
- ポート・アーサーは1996年の銃乱射事件(35人死亡)には一切触れていない。
  存命の遺族がいる規模の惨事であり、家族で遊ぶボードゲームの豆知識として
  扱うべきではないと判断した。都市カードは1830〜1877年の流刑地としての
  歴史とユネスコ世界遺産登録(2010年)のみを扱っている。

### 伝説・語源

- クーバー・ペディの地名由来(「穴の中の白人」)は「一般に〜と説明される」と
  ヘッジしてある。
- ムーンバ(メルボルンの祭り)の名の意味とされてきた「集まって楽しもう」が
  近年アボリジナル諸語の専門家に不正確・創作と指摘されている件は、
  季節フレーバーの本文とfactの両方に明記した(主催者自身が公に認めている)。

---

## 9. team-leadの指摘を受けて直したこと(クイズ)

- **Q18(アッシュズ)の日本語文に英語 "famous" が混入していた。** 単純な
  書き漏らしで、「有名な」に直した。
- **Q40(「Country」の意味を問う問題)は語そのものが問いの中身なので対応不要**
  (team-leadが理由付きで許容リストに登録済み)。
- **Q12(連邦結成の年)が、キャンベラ・メルボルン両方の都市カードの
  「1901年」の記述と重なっていた。** 都市カードを見て確認し、本物の重なりと
  判断。**「オーストラリア本土の最高峰(コジオスコ山)」を問う問題に
  差し替えた**(都市カードに未出の話題)。正解位置は0のまま据え置き、
  4言語とも書き直し済み。

---

## 10. 自己検証の方法(共有ファイルを一切使わない)

- `node --input-type=module -e "..."` で `buildAustraliaContent()` を直接
  組み立てて確認: 都市42・路線48・クイズ42・アイテム9・厄災7・季節12・
  出来事25・シンボル34・背景41・地方7・BGM7。
- 4言語の欠けは `t()` が import 時に例外を投げる仕組みで確認(全ファイル
  例外なくimportできた)。
- 都市42件すべてが本土/タスマニアのポリゴン内にあることを、点内判定を
  自作して確認(海に浮いている都市 0件)。
- **路線48本の海陸判定。** 最初に自作した検査(直線を経緯度で40分割して
  サンプリング)では見つからなかったが、**その検査は間違っていた**。
  実際の路線は直線ではなく「軸に沿った脚+45度の脚」で折れて描かれる
  (`src/presentation/hooks/octilinear-route.ts`)ため、直線での近似では
  正しく測れない。取りまとめ側が本番の `check-sea-routes.mjs` を回して
  5本(broome–katherine・port-hedland–broome・perth–geraldton・
  townsville–cairns・rockhampton–mackay)の食い違いを指摘してくれた。
  焼き上がった時点だったので `node scripts/check-sea-routes.mjs australia`
  を自分でも回して同じ5本を確認した。
  修正後の `cities.mjs`(まだ焼いていない)を検証するため、
  **`check-sea-routes.mjs` と同じ折れ方のアルゴリズム(軸に沿った脚+45度の脚、
  湖の穴あけを含む)を再現するスクリプトを自分のsrcに対して書き**、
  5本とも指摘のとおり本番同様の割合(64〜94%)で海に出ることをまず再現し、
  そのうえで5本とも**「端を入れ替え」で0pxになる**ことを確認してから
  `cities.mjs` の該当5行で都市の順序を入れ替えた
  (添字は変えていないので他の路線には影響しない)。
  同じスクリプトでの最終再検証は**48本中0本が60px超**。
  なお、カルグーリー—ポート・オーガスタとパース—ジェラルトンの海岸線調整、
  マウント・ガンビアの接続をウォーナンブール経由に変えた判断
  (前回の直線近似の検査がきっかけで見つけて直した分)は、今回の
  正しいアルゴリズムでの再検証でも問題なしと出ており、そのまま活かしている。
  **修正版はまだ焼いていない**ので、取りまとめ側で再度
  `node scripts/extract-legacy-content.mjs` → `node scripts/check-sea-routes.mjs australia`
  を回して、本番の結果が0本になることを確認してほしい。
- `seg` は100に決めた。全48路線を実測し、seg=100で**9マスに張り付く路線
  0本・5マス超1本**(カルグーリー—ポート・オーガスタの8マス。ナラボー
  平原横断として意図どおり)。ヒストグラムは
  `{1:25, 2:12, 3:7, 5:3, 8:1}`。
- 背景41種を マゼンタ台紙にレンダリングして塗り残しを実測 →
  **全背景0px。** 平均要素数31.8(韓国27より濃いが、ガイド目安40には
  届いていない。追加の密度アップは今回の作業時間内では見送った)。
- 中央の隠れ帯(x151-249/y54-152)への主役級の描き込みを自作スクリプトで
  検出し、見つかった7件(キャンベラの旗竿・アリス・スプリングスの
  乾いた川床・ウロンゴンの煙突の煙・ブルーマウンテンズの谷の靄・
  ジェラルトンの鳥・オールバニの煮沸釜・ポート・ヘッドランドのクレーン)は
  すべて位置をずらして解消した。**ユララ(モノリス)の岩の表面の
  ハイライト線1件だけ残っている。** これは一枚岩の輪郭そのもの
  ではなく表面の装飾線で、岩の外形は帯の外(左右)からも十分見えるため、
  意図的に残した(消しても惜しくない繰り返し要素ではなく、逆に
  端まで見えている主要素の一部)。
- アイテムキー9件(willywilly / swag / roadtrain / ghanticket / vegemite /
  canetoad / speewah / cupsweep / twoup)は、焼き上がった21国ぶんの
  `country-index.json` + 各 `*.content.json` の `items` キー一覧と突き合わせ、
  **衝突0件**を確認(コマンドは02-authoring/01-content-guide.mdと同じもの)。
  ただし**同時進行中の他盤面(Ukraine・Canada・Venezuela・Brazilなど、
  まだ焼かれていないもの)とは突き合わせられていない。** 最終的な突き合わせは
  取りまとめ側にお願いします。
- `npx eslint scripts/countries/australia/ src/presentation/components/events/dooms/australia-*.tsx`
  は警告0。
- 厄災の絵7枚を `npx tsc --noEmit --jsx react-jsx --esModuleInterop --skipLibCheck --strict`
  で個別に型検査、全て通過。`npm run preview` で7枚とも実際にレンダリングし、
  目視で確認済み(暴力的な描写が無いこと、文字要素が無いことを含む)。
- **`node scripts/extract-legacy-content.mjs` と `npm run check` は実行していない。**
  共有ファイル・作業ツリーを他の担当と共有しているため、ブリーフの指示どおり
  自分では走らせていません。
