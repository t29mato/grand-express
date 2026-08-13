# ブラジル登録内容

`scripts/countries/brazil/` と `dooms/brazil-*.tsx` は作成済みです。
以下7か所への追記をお願いします(共有ファイルはこちらから触っていません)。

## 1. `scripts/extract-legacy-content.mjs`

import行(既存の import 群の下あたりに):

```js
import { buildBrazilContent } from "./countries/brazil/index.mjs";
```

`AUTHORED_COUNTRIES` 配列への追加行:

```js
const AUTHORED_COUNTRIES = [
  // ...既存の並び...
  buildBrazilContent(),
];
```

## 2. `scripts/content-overrides/property-economy.mjs` の `CURRENCY_MULTIPLIERS`

```js
  // R$432,000 → 開始資金1200×360(team-lead指定)。
  brazil: 360,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts` の `LOADERS`

```ts
  brazil: () => import("./brazil.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts` の `STYLE_LOADERS`

```ts
  brazil: () => import("../content/brazil.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts` に足すアイテム9件

`ITEM_EFFECT_BY_LEGACY_KEY` の末尾に:

```ts
  // Brazil
  arara: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  horacerta: { type: "choose-exact-dice" },
  mariafumaca: { type: "roll-fixed-dice", diceCount: 2 },
  trembala: { type: "roll-fixed-dice", diceCount: 3 },
  figa: { type: "none" }, // 厄災の神(サシ・ペレレ)のward item(passive)
  defumacao: { type: "repel-spirit" },
  cola: { type: "quiz-save" },
  bicho: { type: "gain-cash", amount: 380 },
  atalho: { type: "extra-turn" },
```

**衝突確認について:** `node scripts/countries/../` 側からは、他4か国(カナダ・オーストラリア・
ウクライナ・ベネズエラ)が同時に鍵を決めている状況のため、焼き上がった目録だけでは
確認できません。ポルトガル語かつブラジル固有の語(`arara`=コンゴウインコ、
`horacerta`=時間どおり、`mariafumaca`=蒸気機関車の愛称、`trembala`=弾丸列車、
`figa`=護符、`defumacao`=燻しの儀式、`cola`=カンニングペーパーの俗語、
`bicho`=動物くじ、`atalho`=近道)を選び、既存の焼き上がり目録(下記)とは
衝突していないことを確認済みです。最終的な5か国間の突き合わせをお願いします。

```
node -e 'const ids=require("./src/infrastructure/content/country-index.json").map(c=>c.id);
const k=new Set(); for(const i of ids){Object.keys(require(`./src/infrastructure/content/${i}.content.json`).items).forEach(x=>k.add(x))}
console.log([...k].sort().join(" "))'
```
実行時点(ブラジル着手時)の目録: acela adae akce alboraq almglocke amtrakcoach antiseche
argobromo autobahn azimat baedeker bakhour balon baozhu beca bemo bigino blat blueriband
bocoran brocante buis bujeok chaix challa christopher chronometer coca contekan corail
cornicello cribsheet dabbawala daruma dateline detectorist dolmus durianruntuh ekeko
eksekutif elmo eselsbruecke ets expo expreso fahrplan fal ferro feustjean fiche
flohmarkt frecciarossa gamanoabura gaotiepiao garuda girdle gosloto greyhound
guardswhistle hak hikouki hobiki horaire horseshoe ice intercity jadual jadwalkereta
jampi jikokuhyo jimat jindouyun jinnang jokbo jugaad kaminkehrer karacevap kasamayaki
kashimatachi kecak kemenyan kenalan keris khamsa khlebsol kodokan ktx kwahu libation
lontar lotteria lotteryticket lotto luckypenny luopan lupiheche mailsteamer malocchio
manekineko mavitren mobylette montgolfiere morishio motorway mugunghwa nazar neem
nightriviera nimbumirchi nozomi ojek okyeame omamori ookushigai orangdalam orario
osmap pacha padewasan panchang pass patjuk perak perama platinum platskart
posterestante ppalli pubquiz qianlima rabbitfoot raccomandazione rajdhani rapide
raspisanie rejeki relais roadatlas roadtrip rowan sankofa sapsan scotsman shinkansen
shpargalka singani sol taomujian tasuki tatkal taxi tgv tokiwa tridatu troika trotro
tsukubaex vandebharat vespa wasta yeopjeon yeot yht yuzhuo zebra zeppelin
zeppelinfahrt zerbia

新たに使う9件(arara horacerta mariafumaca trembala figa defumacao cola bicho atalho)
はいずれもこの中に含まれていません。

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

`SEASON_EFFECTS_BY_COUNTRY` に足す12ヶ月ぶん(4月始まり):

```ts
  /**
   * ブラジル。復活祭とバカリャウ(4月) → コーヒー収穫最盛期(5月) →
   * フェスタ・ジュニーナ/サンジョアン(6月) → 冬休みの旅行(7月) →
   * 乾季・野焼きの季節(8月・中西部と北部にとって負担) →
   * 独立記念日(9月) → アパレシーダの巡礼(10月・サンパウロ州) →
   * 黒人意識の日(11月) → 夏とイエマンジャーへの捧げ物(12月) →
   * レヴェイヨン(1月・リオ最盛期) → カーニバルの街頭ブローコ(2月) →
   * ジャボチカーバの実り(3月)、という流れ。
   * 北部(no)は乾季の負担を、南東部(se)は観光・収穫での好況を多めに受ける。
   */
  brazil: [
    /* 0 Apr 復活祭とバカリャウ */ [
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.15 },
    ],
    /* 1 May コーヒー収穫最盛期 */ [
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("co"), multiplier: 1.1 },
    ],
    /* 2 Jun フェスタ・ジュニーナ/サンジョアン */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.3 },
    ],
    /* 3 Jul 冬休みの旅行(南東部・南部の観光地) */ [
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("su"), multiplier: 1.2 },
    ],
    /* 4 Aug 乾季・野焼きの季節(負担) */ [
      { op: "all-players-pay-cash", amount: 150 },
      { op: "region-income-multiplier", regionId: region("no"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("co"), multiplier: 0.85 },
    ],
    /* 5 Sep 独立記念日 */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("co"), multiplier: 1.15 },
    ],
    /* 6 Oct アパレシーダの巡礼(サンパウロ州) */ [
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.2 },
    ],
    /* 7 Nov 黒人意識の日 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.15 },
    ],
    /* 8 Dec 夏の始まりとイエマンジャーへの捧げ物 */ [
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.15 },
    ],
    /* 9 Jan レヴェイヨン(リオの最盛期) */ [
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.35 },
    ],
    /* 10 Feb カーニバルの街頭ブローコ */ [
      { op: "all-players-gain-cash", amount: 280 },
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.2 },
    ],
    /* 11 Mar ジャボチカーバの実り */ [
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("co"), multiplier: 1.1 },
    ],
  ],
```

`DOOM_EFFECT_ID_BY_LEGACY_ID` に足す7件(7種の効果それぞれ1件ずつ):

```ts
  // Brazil
  "conta-atrasada": "fine",
  enchente: "percentLoss",
  "greve-onibus": "skipTurn",
  deslizamento: "loseProperties",
  "rodada-boteco": "payOthers",
  redemoinho: "teleport",
  arrastao: "steal",
```

## 7. `src/presentation/components/events/dooms/index.ts`

import行:

```ts
import { BrazilArrastao } from "./brazil-arrastao";
import { BrazilContaAtrasada } from "./brazil-conta-atrasada";
import { BrazilDeslizamento } from "./brazil-deslizamento";
import { BrazilEnchente } from "./brazil-enchente";
import { BrazilGreveOnibus } from "./brazil-greve-onibus";
import { BrazilRedemoinho } from "./brazil-redemoinho";
import { BrazilRodadaBoteco } from "./brazil-rodada-boteco";
```

登録簿への追加行:

```ts
  "brazil-arrastao": BrazilArrastao,
  "brazil-conta-atrasada": BrazilContaAtrasada,
  "brazil-deslizamento": BrazilDeslizamento,
  "brazil-enchente": BrazilEnchente,
  "brazil-greve-onibus": BrazilGreveOnibus,
  "brazil-redemoinho": BrazilRedemoinho,
  "brazil-rodada-boteco": BrazilRodadaBoteco,
```

## 焼いたあとに確認してほしいこと

- `node scripts/check-sea-routes.mjs brazil` — 55路線のうち、内陸を跨ぐ暫定路線
  (`petrolina`–`brasilia`、`salvador`–`brasilia` など)は現状の座標で海には
  出ないはずですが、実測はしていません(手では測れないため)。差し戻しがあれば
  端の入れ替えで直します。
- `node scripts/check-quiz.mjs brazil` — 答えの位置(0:12 / 1:12 / 2:14)は
  自分で数えましたが、機械チェックは未実行です。
- `node scripts/check-city-backgrounds.mjs` — 背景の塗り残しは `sky()` の
  第3引数を全26種で目視確認しましたが、マゼンタ台紙でのPNG化は行っていません。
- 都市シンボルが隠す帯(横151〜249・縦54〜152)に主役を置いていないか、
  `belohorizonte`(教会の曲線)と `missionruins`(十字の断片)の2件は
  座標を計算して帯の外に出しましたが、残り24種は座標を読んだだけで
  PNG化までは確認していません。

## 検算メモ

- `npx tsc --noEmit` は通過(厄災tsx作成後に実行)。
- `npx eslint scripts/countries/brazil/*.mjs src/presentation/components/events/dooms/brazil-*.tsx` は
  警告0件(未使用の絵の部品 `toucanHead` を見つけて `riverport` 背景で使う側に回した)。
- `npx vitest run src/presentation/components/events/dooms/dooms.test.ts` は
  170件全て通過(ブラジルの7ファイルぶんの仕様チェックを含む)。
- `node scripts/countries/brazil/index.mjs` 相当の組み立て(`buildBrazilContent()`)を
  直接呼び出して確認: 都市50・路線55・クイズ38・アイテム9・厄災7・季節12・
  出来事19・マーク28・背景26・地形帯6・河川4・湖沼3・ラベル8、いずれもエラー無し。
