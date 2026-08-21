# チリ盤面の登録(取りまとめ側が当てる7箇所+選ぶ画面)

`scripts/countries/chile/` の7ファイル(index以外の全部: cities / geography /
quiz / money-events / flavour / music / ART-KEYS.md)は揃っています。
**`art.mjs` と `index.mjs`、`src/presentation/components/events/dooms/chile-*.tsx`
7枚は絵の担当・取りまとめ側が別途作成してください。**このREGISTER.mdの
6番目・8番目はそれができてから当ててください。

## この盤面の芯(再掲)

「なぜ鉄道が敷かれ、なぜ止まったか」。北は硝石・太平洋戦争という経済的な
理由、南はプエルト・モントで地理的に途切れるという理由で、鉄道の物語が
対になっている。team-lead承認済み(2026-08-21)。

## 1. `scripts/extract-legacy-content.mjs`

```js
import { buildChileContent } from "./countries/chile/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追記:

```js
  buildChileContent(),
```

(`index.mjs` は他の担当が `art.mjs` 完成後に作成する想定。中身は
`scripts/countries/peru/index.mjs` と同じ形で、`PERU_*` を `CHILE_*` に
置き換えるだけです。)

## 2. `scripts/content-overrides/property-economy.mjs`

**倍率57000に修正済み(team-lead確認済み、2026-08-21)。**当初63000で提出した
レート(1ドル≒950ペソという記憶による概算)は実勢より弱すぎ、team-lead側で
実勢レート(1 CLP = 0.174円、1円 ≈ 5.75ペソ)を引き直しています。
12,000,000÷0.174÷1200≒57,471を57000に丸めたもの。表記も `$` 単独(米ドルと
衝突)から `CLP$` に直しました(`flavour.mjs` の `CHILE_META.cur` に反映済み)。

```js
  // CLP$ 1,200 → CLP$ 68,400,000。1 CLP = 0.174円(2026-08-21、team-lead確認)、
  // 12,000,000÷0.174÷1200≒57,471を57000に丸めた。
  chile: 57000,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追記:

```ts
  chile: () => import("./chile.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追記:

```ts
  chile: () => import("../content/chile.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts`

アイテム9件。鍵は既存全盤面(約300件)と衝突しないことを確認済み
(2026-08-21)。

```ts
  // Chile
  avionpatagonico: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  pullman: { type: "choose-exact-dice" },
  trensalitrero: { type: "roll-fixed-dice", diceCount: 2 },
  expresolongitudinal: { type: "roll-fixed-dice", diceCount: 3 },
  ramadecanelo: { type: "none" }, // 厄災の神(カレウチェ)のward item(passive)
  linternafarera: { type: "repel-spirit" },
  torpedo: { type: "quiz-save" },
  boletokino: { type: "gain-cash", amount: 380 },
  atajoarriero: { type: "extra-turn" },
```

**boletokinoの価格280は、amount380より安いことを確認済みです**
(「向きの選べない移動アイテムは操縦できるものより安い」の原則にも
avionpatagonico=260 < pullman=380 で沿っています)。
**torpedoの価格130は上限140以内です。**

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 災難7件の対応

`CHILE_DOOM`(`flavour.mjs`)は fine / percentLoss / skipTurn /
loseProperties / payOthers / teleport / steal の順に並べてあります。
**順序を変えずにそのまま対応させてください。**

```ts
  // Chile
  "impuesto-salitre": "fine",
  terremoto: "percentLoss",
  aluvion: "skipTurn",
  "relave-derrame": "loseProperties",
  "polla-perdida": "payOthers",
  "barco-desviado": "teleport",
  "lanza-metro": "steal",
```

### 季節12ヶ月(4月始まり)

地方コード: `ng`=ノルテ・グランデ / `nc`=ノルテ・チコ / `ce`=セントラル /
`su`=スル / `au`=アウストラル。南半球なので中身は他国と季節が逆になる
(4月=収穫祭、9月=独立記念日、2月=真夏)。`CHILE_SEASONS` の文面に
対応させた提案値。**数値は叩き台**なので、他盤面とのバランスを見て
調整してください。

```ts
  /**
   * チリ。ブドウ収穫祭(4月・給アイテム) → 海軍栄光の日(5月) →
   * ウェ・トリパントゥ/冬至(6月・su増) → ラ・ティラーナ祭(7月・ng) →
   * アンデス峠の雪closure(8月・ce/nc減) → フィエスタス・パトリアス
   * (9月・全員給付+休神) → 春の作付け(10月・ce増) → コピウエの開花
   * (11月・su増) → クリスマス(12月・全員給付) → 海岸の夏(1月・ce/su増) →
   * ビニャ・デル・マール歌謡祭(2月・全員給付+ce増) → 新学年(3月・nc/ce増)、
   * という流れ。
   */
  chile: [
    /* 0 Apr ブドウ収穫祭 */ [{ op: "give-item-to-all" }],
    /* 1 May 海軍栄光の日 */ [
      { op: "all-players-gain-cash", amount: 260 },
    ],
    /* 2 Jun ウェ・トリパントゥ/冬至 */ [
      { op: "region-income-multiplier", regionId: region("su"), multiplier: 1.15 },
    ],
    /* 3 Jul ラ・ティラーナ祭(北部砂漠の祭り) */ [
      { op: "region-income-multiplier", regionId: region("ng"), multiplier: 1.3 },
    ],
    /* 4 Aug アンデス峠が雪で閉ざされる */ [
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("nc"), multiplier: 0.9 },
    ],
    /* 5 Sep フィエスタス・パトリアス(独立記念日) */ [
      { op: "all-players-gain-cash", amount: 320 },
      { op: "rest-spirit" },
    ],
    /* 6 Oct 中央谷で春の作付けが始まる */ [
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.2 },
    ],
    /* 7 Nov コピウエ(国花)が南部の森で咲く */ [
      { op: "region-income-multiplier", regionId: region("su"), multiplier: 1.15 },
    ],
    /* 8 Dec クリスマス、海岸の夏が始まる */ [
      { op: "all-players-gain-cash", amount: 300 },
    ],
    /* 9 Jan 海岸の夏が盛りを迎える */ [
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("su"), multiplier: 1.15 },
    ],
    /* 10 Feb ビニャ・デル・マール歌謡祭 */ [
      { op: "all-players-gain-cash", amount: 280 },
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.2 },
    ],
    /* 11 Mar 新学年、新たな収穫期へ */ [
      { op: "region-income-multiplier", regionId: region("nc"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("ce"), multiplier: 1.1 },
    ],
  ],
```

## 7. `src/presentation/components/events/dooms/index.ts`

**絵の担当が7枚(`chile-impuesto-salitre.tsx` など)を作成したあとで
当ててください。**鍵は上の災難7件の `id` と同じにする想定です。

```ts
import { ChileAluvion } from "./chile-aluvion";
import { ChileBarcoDesviado } from "./chile-barco-desviado";
import { ChileImpuestoSalitre } from "./chile-impuesto-salitre";
import { ChileLanzaMetro } from "./chile-lanza-metro";
import { ChilePollaPerdida } from "./chile-polla-perdida";
import { ChileRelaveDerrame } from "./chile-relave-derrame";
import { ChileTerremoto } from "./chile-terremoto";

// ...DOOM_COMPONENTS の中に追記
  "chile-aluvion": ChileAluvion,
  "chile-barco-desviado": ChileBarcoDesviado,
  "chile-impuesto-salitre": ChileImpuestoSalitre,
  "chile-lanza-metro": ChileLanzaMetro,
  "chile-polla-perdida": ChilePollaPerdida,
  "chile-relave-derrame": ChileRelaveDerrame,
  "chile-terremoto": ChileTerremoto,
```

## 8. 選ぶ画面(`src/presentation/components/setup/country-groups.ts`)

**南アメリカの束は既にあります**(`southamerica`, `peru`, `venezuela`,
`bolivia`, `brazil` が入っている)。オセアニアと同じく、新設ではなく
**既存の束の `countryIds` にチリを足してください。**

```ts
{
  key: "southamerica",
  ...
  wholeBoardId: "southamerica",
  countryIds: ["southamerica", "peru", "venezuela", "bolivia", "brazil", "chile"],
},
```

**アルゼンチン・コロンビア・キューバも並行して同じ束に足される予定です。**
複数の担当が同時に同じ配列へ追記すると衝突するので、**この束への追記は
まとめて取りまとめ側が行ってください。**

## 解決済み: 海陸判定の路線2本(team-lead指摘、2026-08-21)

`puertoaysen–puertonatales`(539px/100%)と `porvenir–puertowilliams`
(212px/78%)が閾値超で残っていましたが、**team-leadの指摘どおり海岸線を
作り直して解決しました。**「陸路にする」は採用していません(コクラン・
ビジャ・オイギンス・プエルト・ウィリアムズの都市カードの「道が無い」
という記述と矛盾するため)。

直した内容:

1. **アイセン〜マガジャネスの本土海岸線を、実際のフィヨルドの奥(東寄り)
   まで絞った。**以前はチョノス〜ウェリントン諸島まで含めて1本の陸
   ポリゴンで塗り潰しており、航路が全区間「陸の上」判定になっていた
2. **プエルト・エデン**(ウェリントン島、南緯49度)を中継都市として追加
   (47都市め)。ナビエラ・アウストラルの実在のフェリーがこの島に寄港する
   経路と同じ扱い。mark/bgはプエルト・アイセンと共有(`riverport` /
   `patagoniasteppe`)し、記号+背景は70枚のまま
3. **ティエラ・デル・フエゴの南岸(ビーグル水道側)とポルベニル沖(西岸)を
   ともに北へ絞り、ナバリノ島(プエルト・ウィリアムズ)の楕円を少し
   縮めた。**以前は両者がほぼ接しており、航路がティエラ・デル・フエゴの
   西岸を大きくかすめていた

結果(2026-08-21測定、使い捨てjsonで確認):

```
node scripts/check-sea-routes.mjs chile
# chile 路線 50本(うち航路5本) — 60px超の食い違いなし
```

## 測定(2026-08-21時点、最終)

```
node --check scripts/countries/chile/*.mjs                # 全ファイル構文OK
npx eslint scripts/countries/chile/                        # 警告0
node scripts/check-sea-routes.mjs chile                    # 使い捨てjsonで確認。60px超0本
```

都市47(ng10・nc5・ce12・su10・au9・プエルト・エデン追加分は au)。
路線50本(陸路44・航路6)。記号46+背景24=70枚、同じ絵になる都市1組
(プエルト・アイセン/プエルト・エデン、47都市の上限4組の内側)。
クイズ95問(難易度1〜3が22問・7以上が34問・9〜10が12問。南アフリカ盤との
重複1件を修正済み)。お金の出来事17件(増10・減7、全地方で増減とも
最低1件引ける)。道具9件(鍵の重複なし、価格規則を満たす。torpedoは
コロンビア盤との衝突をteam-lead側で解消済み)。物件価格は最安160・
最高2400で比15.00倍(プエルト・エデンの2物件を含めても変わらず)。
厄災7件(既存301件+新規28件の329件で衝突なし、team-lead確認済み)。
季節12ヶ月(give-item-to-all 1件・rest-spirit 1件〈フィエスタス・パトリアス〉)。
音楽5地方。通貨倍率57000・表記CLP$(team-lead確認済み)。

`node scripts/extract-legacy-content.mjs` と `node scripts/check-quiz.mjs chile`
は未登録のため未実行です。登録後にお願いします。**クイズの答え漏れは
自作の照合スクリプトで手動チェック済み**(ヨウ素の1問が実際にマリア・
エレナのカードと重なっていたため差し替え済み。詳細はコミット履歴参照)。
