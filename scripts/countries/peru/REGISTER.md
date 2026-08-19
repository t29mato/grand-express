# ペルー盤面の登録(取りまとめ側が当てる7箇所)

`scripts/countries/peru/` の8ファイル(index / cities / geography / quiz /
money-events / flavour / music / ART-KEYS.md)は揃っています。
**`art.mjs` と `src/presentation/components/events/dooms/peru-*.tsx` 7枚は
絵の担当が別途作成します。**このREGISTER.mdの7番目はその7枚ができてから
当ててください。

## 1. `scripts/extract-legacy-content.mjs`

```js
import { buildPeruContent } from "./countries/peru/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追記:

```js
  buildPeruContent(),
```

## 2. `scripts/content-overrides/property-economy.mjs`

倍率240。根拠: 1ドル≒152円・1ドル≒3.7ソルとして1ソル≒41円、
12,000,000 ÷ 41 ÷ 1200 ≒ 244 を240に丸めた(team-lead確認済み)。

```js
  // S/ 1,200 → S/ 288,000。1ドル≒152円・1ドル≒3.7ソルとして1ソル≒41円、
  // 12,000,000÷41÷1200≒244を240に丸めた。
  peru: 240,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追記:

```ts
  peru: () => import("./peru.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追記:

```ts
  peru: () => import("../content/peru.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts`

アイテム9件。鍵は既存全盤面(約300件)と衝突しないことを確認済み。

```ts
  // Peru
  avioneta: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  combi: { type: "choose-exact-dice" },
  trenmacho: { type: "roll-fixed-dice", diceCount: 2 },
  expresoandino: { type: "roll-fixed-dice", diceCount: 3 },
  chuspa: { type: "none" }, // 厄災の神(アプ)のward item(passive)
  illa: { type: "repel-spirit" },
  machete: { type: "quiz-save" },
  propina: { type: "gain-cash", amount: 380 },
  chasqui: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 災難7件の対応

`PERU_DOOM`(`flavour.mjs`)は fine / percentLoss / skipTurn /
loseProperties / payOthers / teleport / steal の順に並べてあります。
**順序を変えずにそのまま対応させてください。**

```ts
  // Peru
  sorochazo: "fine",
  friaje: "percentLoss",
  "llama-terca": "skipTurn",
  "derrumbe-mina": "loseProperties",
  "cacho-perdido": "payOthers",
  "neblina-puna": "teleport",
  "robo-terminal": "steal",
```

### 季節12ヶ月(4月始まり)

地方コード: `co`=海岸 / `si`=山地 / `se`=熱帯林 / `al`=高原南部。
南半球なので中身は他国と季節が逆になる(4月=収穫期、7月=乾季で独立記念日、
1月=真夏)。`PERU_SEASONS` の文面に対応させた提案値。**数値は叩き台**なので、
他盤面とのバランスを見て調整してください。

```ts
  /**
   * ペルー。じゃがいも収穫(4月) → ガルーア(5月) → インティ・ライミ(6月) →
   * フィエスタス・パトリアス(7月・全員給付・休神) → パチャママへの捧げ物(8月) →
   * トルヒージョ春祭り(9月) → 奇跡の主の行列(10月・全員給付) →
   * 雨季の戻り(11月) → クリスマスと収穫の輸出(12月・全員給付) →
   * 海岸の真夏とアンデスの道の閉鎖(1月) → カンデラリア祭とカーニバル(2月・全員給付) →
   * 雨季明け(3月)、という流れ。
   */
  peru: [
    /* 0 Apr じゃがいも収穫 */ [
      { op: "region-income-multiplier", regionId: region("si"), multiplier: 1.3 },
    ],
    /* 1 May ガルーアが海岸を覆う */ [
      { op: "region-income-multiplier", regionId: region("co"), multiplier: 0.85 },
    ],
    /* 2 Jun インティ・ライミ(乾季・観光の書き入れ時) */ [
      { op: "region-income-multiplier", regionId: region("si"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("al"), multiplier: 1.1 },
    ],
    /* 3 Jul フィエスタス・パトリアス(独立記念日・乾季の頂点) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("si"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("al"), multiplier: 1.15 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug パチャママへの捧げ物(乾いた風の月) */ [
      { op: "region-income-multiplier", regionId: region("si"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("al"), multiplier: 1.1 },
    ],
    /* 5 Sep トルヒージョ春祭り */ [
      { op: "region-income-multiplier", regionId: region("co"), multiplier: 1.2 },
    ],
    /* 6 Oct 奇跡の主の行列(リマ最大級の行事) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("co"), multiplier: 1.3 },
    ],
    /* 7 Nov 雨季がアンデス・アマゾンへ戻る */ [
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("si"), multiplier: 0.85 },
    ],
    /* 8 Dec クリスマスと輸出向け収穫(アスパラガス・ブルーベリー) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("co"), multiplier: 1.3 },
    ],
    /* 9 Jan 海岸の真夏・アンデスの道は雨季で厳しい */ [
      { op: "region-income-multiplier", regionId: region("co"), multiplier: 1.35 },
      { op: "region-income-multiplier", regionId: region("si"), multiplier: 0.8 },
    ],
    /* 10 Feb カンデラリア祭(プーノ)とカーニバル(カハマルカ) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("al"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("si"), multiplier: 1.15 },
    ],
    /* 11 Mar 雨季明け・ガルーアも崩れ始める */ [
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.1 },
    ],
  ],
```

## 7. `src/presentation/components/events/dooms/index.ts`

**絵の担当が7枚(`peru-sorochazo.tsx` など)を作成したあとで当ててください。**
鍵は上の災難7件の `id` と同じにする想定です。

```ts
import { PeruCachoPerdido } from "./peru-cacho-perdido";
import { PeruDerrumbeMina } from "./peru-derrumbe-mina";
import { PeruFriaje } from "./peru-friaje";
import { PeruLlamaTerca } from "./peru-llama-terca";
import { PeruNeblinaPuna } from "./peru-neblina-puna";
import { PeruRoboTerminal } from "./peru-robo-terminal";
import { PeruSorochazo } from "./peru-sorochazo";

// ...DOOM_COMPONENTS の中に追記
  "peru-cacho-perdido": PeruCachoPerdido,
  "peru-derrumbe-mina": PeruDerrumbeMina,
  "peru-friaje": PeruFriaje,
  "peru-llama-terca": PeruLlamaTerca,
  "peru-neblina-puna": PeruNeblinaPuna,
  "peru-robo-terminal": PeruRoboTerminal,
  "peru-sorochazo": PeruSorochazo,
```

## 測定(2026-08-19時点、登録前)

```
node --check scripts/countries/peru/*.mjs        # 全ファイル構文OK
npx eslint scripts/countries/peru/                # 警告0
node scripts/check-sea-routes.mjs peru            # 使い捨てjsonで確認済み。60px超の食い違いなし
```

`node scripts/extract-legacy-content.mjs` と `node scripts/check-quiz.mjs peru`
は未登録のため未実行。登録後にお願いします。
