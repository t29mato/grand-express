# 北海道盤面 登録用スニペット(進行中)

`cities.mjs` の凍結時点のメモ。登録7箇所への貼り付け内容(通貨倍率・アイテム・
厄災・季節など)は、残りのファイル(`index.mjs` / `flavour.mjs` /
`money-events.mjs` / `music.mjs` / `quiz.mjs` 本編)が揃ってから追記する。

## 地方区分を4分割にした理由

`chuo`(道央)/ `nan`(道南)/ `hoku`(道北)/ `tou`(道東)の4区分は、
北海道が実際に使う区分をそのまま採った。**各区分ちょうど10都市**になるよう
数えてから配分した(目安「各区分6都市以上」を大きく上回る)。1〜2都市しか
入らない区分を作らず、地方ごとの音楽・季節をすべての区分で意味のある単位に
するため。

内訳: `chuo` 10 / `nan` 10 / `hoku` 10 / `tou` 10(合計40)。

道南(木古内・松前・江差・上ノ国・八雲・長万部・森・福島・せたな・奥尻)は
team-lead の指摘どおり、盤面の芯(石炭のための鉄道が人口減で閉じられていく)
の**外側**にある地域として意図的に加えた。松前藩によるアイヌとの交易独占・
道南十二館(15世紀)など、開拓期より前からこの土地にあった歴史を書いている。

## `cities.mjs` の凍結時点の数値(測定 2026-08-20 02:51 JST)

```
都市数        40(chuo10 / nan10 / hoku10 / tou10)
路線数        43(BFSで40/40都市に到達。孤立都市0)
mark          32種
bg            23種
mark+bg合計   55枚(上限70枚以内)
同じ絵になる都市  1組(夕張×歌志内。coalmine+minetown。意図した共有。
                40都市の1割以内)
物件価格      最安150〜最高2600(17.3倍)
4言語チェック  0件漏れ(全 city()/prop() 呼び出しの引数を機械的に
                `|`が3本かで走査)
node --check          OK(構文)
npx eslint scripts/countries/hokkaido/   0件(警告・エラーとも)
```

廃止済み路線を7本、あえて `HOKKAIDO_EDGES` に含めている(瀬棚線・天北線・
名寄本線・歌志内線・松前線・江差線木古内―江差間・標津線・留萌本線増毛延伸・
ふるさと銀河線=旧池北線。該当都市のカードで「廃止された」事実を書いている)。
函館・札幌・旭川・釧路・帯広など日本盤側だけにある大都市はこの盤面に無いため、
それらを経由する現実の経路は橋渡しの1本の路線に圧縮した(`cities.mjs` の
`HOKKAIDO_EDGES` 末尾コメント参照)。

## 4言語の漏れの見つけかた(次の担当への引き継ぎ)

**1件ずつ目で読まない。** `city()`/`prop()` に渡す文字列引数はすべて
`"en|es|fr|ja"` の形なので、ファイル全体を1行ずつ正規表現で走査し、
「行末が `",`」で終わる文字列リテラルの中の `|` の数を数えればよい。
3本(=4言語)でなければその場で行番号ごと分かる。

```js
node -e '
const fs = require("fs");
const lines = fs.readFileSync("scripts/countries/hokkaido/cities.mjs","utf8").split("\n");
for (let i=0;i<lines.length;i++){
  const m = lines[i].match(/^\s*"(.*)",\s*$/);
  if (m) { const p=(m[1].match(/\|/g)||[]).length; if(p!==3) console.log((i+1)+":",p,m[1].slice(0,60)); }
}
'
```

`city()`/`prop()` は内部の `t()` が `|` 3本でなければ例外を投げるが、
**それは実行時(import時)にしか分からない。** この機械的な走査は実行せずに
全箇所を一度に洗える。40都市×複数フィールドの中で3件(倶知安・鶴居・奥尻)を
1件ずつ目で見ずに見つけられた。

## `geography.mjs` を書いた(測定 2026-08-20 03:13 JST)

- 投影: `BW2020×BH1800`、`LON0 139.6 / LON1 146.0 / LAT0 45.3 / LAT1 41.15`
  (都市1つあたり約90,900px²)。`seg: 84`(暫定値。焼いたあとに全43路線の
  投影後距離を実測して調整予定)
- 海岸線: 北海道本島(64点)+ 奥尻島(独立した島、7点)の2リング
- 40都市すべてが陸地の内側にあることを point-in-polygon で確認(自作の
  ray casting、失敗0件)。自己交差も0件(隣接判定のみのセグメント総当たり)
- `check-sea-routes.mjs` は焼く前でも回せる(`docs/50-authoring/13-new-board.md`
  の手順どおり、5項目だけの使い捨て `hokkaido.content.json` を組んで検査に
  掛け、確認後すぐ削除。tracked でないことを `git status` で確認してから削除)

### 海陸判定で直したこと

- **`setana–esashi`**: 端を入れ替えて 158px(34%)→0px
- **`kikonai–mori`**(`mori–kikonai` に入れ替え): 16px→0px
- **`nemuro–akkeshi`**(`akkeshi–nemuro` に入れ替え): 22px→0px
- **`esashi–okushiri`**: 当初 `"sea"` の指定漏れがあり陸路として誤判定されていた。
  `"sea"` を足したところ、今度は奥尻島の描画位置が本島の海岸線バルジに近すぎて
  航路の大半が陸を通ってしまうと判明。**奥尻島の座標そのものを描き直し**
  (投影範囲の西端寄り・江差寄りの緯度に置き直し)、都市座標(`cities.mjs` の
  `okushiri`)も新しい島の位置に合わせて動かした(**内容は変えていない**。
  緯度経度のみの技術的な調整で、hyakumeizan の「海に近い山を内陸へ寄せた」
  対応と同じ扱い)。複数の座標を実測で試し、**43px(49%、線長89px)** が
  実測した中の最良値だったのでこれを採用(60pxの報告閾値は下回る)。
  `KEPT` として理由を残す場合は「江差―奥尻の実在フェリー。奥尻島を島として
  描くかぎり、投影の縮尺では航路の半分弱が本島の海岸線をかすめる」で
  お願いしたい。

## `quiz.mjs` 本編(100問。測定 2026-08-20 03:56 JST)

```
問題数        100(目安100〜120の範囲内)
難易度1〜3    34問(目安20問以上)
難易度7以上   29問(目安25問以上)
難易度9〜10   11問(目安10問以上。9が10問・10が1問)
node --check              OK
npx eslint                0件
4言語チェック(全"..."引数を機械走査)  0件漏れ
選択肢が3つでない/答えindex範囲外       0件
質問文の重複                            0件
```

### 盤面をまたぐ重複チェック(2つとも実施。2026-08-20 03:54 JST)

1. **`node scripts/check-quiz-across-boards.mjs hokkaido japan --all`** →
   最初の実行で1件ヒット(hokkaido Q4「北海道の先住民族は?」= japan Q20と
   ほぼ同一)。**該当問題を丸ごと差し替えて**(アイヌの伝統的な生業を問う内容に
   変更)、再実行で **0件** を確認。
2. **`node scripts/check-quiz-across-boards.mjs hokkaido --all`**(全盤面)→
   asia・mexico と各1件ヒットしたが、**どちらも誤検知として却下**。
   - `hokkaido↔asia`: 答えがどちらも「およそ5分の1」なだけで、
     問いは「北海道が日本の面積に占める割合」対「モンゴル帝国が世界の
     陸地面積に占めた割合」で無関係
   - `hokkaido↔mexico`: 同じく「およそ5分の1」の一致のみ。「北海道の面積」対
     「米墨戦争でメキシコが割譲した領土の面積」で無関係
3. **手読みでの照合**(ツールが拾えない形の重複がないか、日本盤の道内14都市
   [札幌・函館・旭川・釧路・小樽・ニセコ・室蘭・帯広・富良野・北見・網走・
   知床・稚内・登別]の既存カードを先に全部読んでから執筆): 執筆中に2件の
   実質的な重複を発見・修正した。
   - 札幌の碁盤目設計を問う問題(1871年としていた)が、legacyの札幌カード
     「1869年、アメリカ人顧問の助言で碁盤の目状に設計」と**年が食い違う
     形で同じ主題**だったため、碁盤目の記述を削除し1972年冬季五輪の別の
     事実(大倉山ジャンプ台)に差し替えた
   - 函館の夜景を問う問題が、函館の実際の特徴(運河沿いの旧倉庫群)ではなく
     **小樽の特徴を誤って函館に帰していた**(事実誤認)。函館山からの夜景
     という函館固有の正しい事実に全面的に書き直した
   - 上記以外に、函館(1859年開港・五稜郭・1869年幕府方最後の拠点)・
     旭川(−41℃)・知床(食物連鎖)など道内14都市のカード内容と重なりうる
     語を含む34問を個別に目視で照合し、**答えが直接カードの記述と一致する
     ものは無い**ことを確認した(年号のみ再利用し、問う事実自体は
     カードに無い別の具体的事実にしてある問題が複数あるが、これは
     ドキュメントの前例に沿う許容範囲と判断)。

### 確度が気になる点(申告)

- アイヌ施策推進法(2019年)・二風谷ダム訴訟(1997年)・萱野茂の初当選
  (1994年)・シャクシャインの戦い(1669年)・クナシリ・メナシの戦い
  (1789年)は、いずれも一般に確立した年号として書いたが、一次資料までは
  確認していない
- 洞爺丸事故の犠牲者数(およそ1150人)・アイヌ道民調査のおよそ1万3000人
  (難易度10)は、幅のある推計として「およそ」を付けてヘッジしてある
- 難易度9〜10の11問は**指示どおり、別の盤面の担当に読んでいただきたい**

## 全ファイル完成(測定 2026-08-20 04:18 JST)

`flavour.mjs` / `money-events.mjs` / `music.mjs` / `index.mjs` を書き終え、
`buildHokkaidoContent()` が最後まで通ることを確認した。**7箇所の登録スニペットは
以下のとおり。**

```
node --check (全7ファイル)                      OK
npx eslint scripts/countries/hokkaido/           0件
npx eslint src/presentation/components/events/dooms/hokkaido-*.tsx   0件
node scripts/check-sea-routes.mjs hokkaido       60px超の食い違いなし
node scripts/check-quiz.mjs hokkaido             答えの漏れ: なし
node scripts/check-quiz-across-boards.mjs hokkaido --all  japan等と重なりなし
                                                  (asia・mexicoの各1件は誤検知、後述)
node scripts/check-city-backgrounds.mjs --src hokkaido    元の背景23種、塗り残しなし
都市40・路線43・クイズ100・アイテム9・厄災7・季節12・出来事22
物件価格 150〜2600(17.3倍)
```

### 難易度9〜10の裏取り依頼(継続)

`quiz.mjs` の「JR北海道が2016年11月に公表した路線総延長」の問いは、
team-lead の裏取りに従って解説文から「10路線」を削除済み。**難易度9〜10の
11問すべてを、指示どおり別の盤面の担当に読んでいただきたい。**確度が
気になる点は本文中の該当section(`quiz.mjs` 本編の項)に記載済み。

### `check-quiz.mjs` の指摘への対応(4件は実物、2件は却下)

**実物として直した4件**(いずれも都市カードの記述と答えが一致していた。
質問を丸ごと差し替え、都市カードの内容は変更していない):

```
Q14(旧)  正解「ウトウ」が羽幌のカードに直接記載      → エゾモモンガの問いに差し替え
Q33      正解「北海道南西沖地震」が奥尻のカードに記載  → 地震の規模(M7.8)を問う形に差し替え
Q52(旧)  正解「幌内鉄道」が岩見沢のカードに直接記載    → スケトウダラの問いに差し替え
Q75(旧)  正解「2006年」が足寄のカードに直接記載        → 深名線(1995年廃止)の問いに差し替え
```

**言語混入として却下した2件**(実在の固有名詞の正式表記であり、翻訳の
書き漏れではない):

```
Q43  「YOSAKOIソーラン祭り」— 祭りの公式名称そのものがラテン文字表記
Q50  「エスコンフィールドHOKKAIDO」— 球場の公式名称そのものがラテン文字混じり表記
```

### 盤面をまたぐ重複チェックで却下した2件

`asia`・`mexico` と各1件ヒットしたが、答えが偶然どちらも「およそ5分の1」
なだけで主題が無関係(北海道の面積 対 モンゴル帝国/米墨戦争の割譲地の面積)。
理由は `quiz.mjs` 本編の項に記載済み。

## 7箇所の登録スニペット

### 1. `scripts/extract-legacy-content.mjs`

```js
import { buildHokkaidoContent } from "./countries/hokkaido/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追加:

```js
  buildHokkaidoContent(),
```

### 2. `scripts/content-overrides/property-economy.mjs`

指示どおり日本・茨城・日本百名山と同じ `hokkaido: 10000`(¥12,000,000スタート)。

```js
  hokkaido: 10000,
```

### 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追加:

```ts
  hokkaido: () => import("./hokkaido.content.json").then((m) => m.default),
```

### 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追加:

```ts
  hokkaido: () => import("../content/hokkaido.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

### 5. `src/infrastructure/content/item-effect-rules.ts`

9件。**うち `bearbells` はカナダ・日本百名山が既に使っている鍵で、効果も同じ
(repel-spirit)なので新規追加ではなく確認のみでよい**(ヒグマ対策の鈴は
北海道でも実在するため、そのまま使う判断をした)。残り8件が新規。
既存キーと衝突しないことを `node -e '...'` の一覧突き合わせで確認済み。

```ts
  // Hokkaido
  daikoubasu: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  supersooya: { type: "choose-exact-dice" },
  hamanasugou: { type: "roll-fixed-dice", diceCount: 2 },
  hokutoseigou: { type: "roll-fixed-dice", diceCount: 3 },
  haisenkinenban: { type: "none" }, // 厄災の神(踏切番)のward item(passive)
  // bearbells は既存(カナダ・日本百名山)と同じ鍵・同じ効果なので追記不要(確認のみ)
  kyuukokutetsurosen: { type: "quiz-save" },
  keganibako: { type: "gain-cash", amount: 380 },
  teijiunkou: { type: "extra-turn" },
```

### 6. `src/infrastructure/content/season-and-doom-rules.ts`

#### 季節(12ヶ月、`SEASON_EFFECTS_BY_COUNTRY` に追加)

`region()` は `chuo`(道央)/ `nan`(道南)/ `hoku`(道北)/ `tou`(道東)。
`flavour.mjs` の `HOKKAIDO_SEASONS` のコメントと対応させてある
(桜前線が遅れて届く4月 → 石狩平野で種まきの5月 → 札幌ライラックの6月 →
ビアガーデンの7月 → 台風の8月 → 大雪山の紅葉が道内でいちばん早い9月 →
沿岸各地でカニ漁解禁の10月 → 冬タイヤへの履き替えの11月 → 札幌の
イルミネーションの12月 → 内陸盆地が冷え込む本格的な冬の1月 → 札幌雪まつりの
2月 → 流氷が退くオホーツクの3月)。

```ts
  hokkaido: [
    /* 0 Apr 桜前線がようやく届く(観光のわずかな上振れ) */ [
      { op: "all-players-gain-cash", amount: 160 },
    ],
    /* 1 May 石狩平野で種まき(道央がやや賑わう) */ [
      { op: "region-income-multiplier", regionId: region("chuo"), multiplier: 1.1 },
    ],
    /* 2 Jun 札幌にライラックが咲く(道央の観光がわずかに上振れ) */ [
      { op: "region-income-multiplier", regionId: region("chuo"), multiplier: 1.15 },
    ],
    /* 3 Jul ビアガーデンが開く(全域が賑わう) */ [
      { op: "all-players-gain-cash", amount: 200 },
    ],
    /* 4 Aug 台風の物入り(全域) */ [
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 5 Sep 大雪山系の紅葉が日本一早い(道央・道北の内陸が賑わう) */ [
      { op: "region-income-multiplier", regionId: region("chuo"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("hoku"), multiplier: 1.15 },
    ],
    /* 6 Oct 沿岸各地でカニ漁解禁(道南・道北・道東の漁港が賑わう) */ [
      { op: "region-income-multiplier", regionId: region("nan"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("hoku"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("tou"), multiplier: 1.2 },
    ],
    /* 7 Nov 冬タイヤへの履き替え(全域の物入り) */ [
      { op: "all-players-pay-cash", amount: 160 },
    ],
    /* 8 Dec 札幌のイルミネーション(道央が賑わう) */ [
      { op: "region-income-multiplier", regionId: region("chuo"), multiplier: 1.2 },
    ],
    /* 9 Jan 本格的な冬、内陸盆地が沈む(道北がもっとも沈む) */ [
      { op: "region-income-multiplier", regionId: region("hoku"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("tou"), multiplier: 0.85 },
      { op: "all-players-pay-cash", amount: 200 },
    ],
    /* 10 Feb 札幌雪まつり(道央が年間最大の賑わい) */ [
      { op: "region-income-multiplier", regionId: region("chuo"), multiplier: 1.4 },
      { op: "all-players-gain-cash", amount: 220 },
    ],
    /* 11 Mar 流氷が退く(道北・道東のオホーツク側がやや戻る) */ [
      { op: "region-income-multiplier", regionId: region("hoku"), multiplier: 1.05 },
      { op: "region-income-multiplier", regionId: region("tou"), multiplier: 1.05 },
    ],
  ],
```

#### 厄災(7件、`DOOM_EFFECT_ID_BY_LEGACY_ID` に追加)

7つの型(fine/percentLoss/skipTurn/loseProperties/payOthers/teleport/steal)に
過不足なく対応させた(自分で決めた対応)。**★を付けた2件は結びつきが弱く、
もっと合う効果があれば入れ替えてほしい**(南アフリカ・スイスの担当が
同じ形で書き残していた前例に倣った)。

```ts
  // Hokkaido
  fubuki: "teleport",              // 地吹雪のホワイトアウトで方向を見失い、気づけば違う場所にいる
  "ryuuhyou-doom": "steal",        // ★ 流氷で港に足止めされている間に置き引きに遭う、というやや弱い結びつき
  "higuma-doom": "fine",           // ヒグマ出没での通行止め・迂回の通行料
  burakkuauto: "loseProperties",   // 全域停電で自分の物件の稼働が止まる
  "daikoubasu-manin": "skipTurn",  // 代行バスが満員で乗れず、次の便まで足止め
  "sake-fukyou": "percentLoss",    // 鮭の不漁で、同じ予算で買える量が目減りする(割合ダメージ)
  "kion-ranteika": "payOthers",    // ★ ぬかるみにはまり、助けてくれた周りの旅行者に礼を払う、というやや弱い結びつき
```

### 7. `src/presentation/components/events/dooms/index.ts`

厄災の絵は別担当がすでに描き終えている(`hokkaido-*.tsx` 7枚、
`npx eslint` 0件を確認済み)。

```ts
import { HokkaidoFubuki } from "./hokkaido-fubuki";
import { HokkaidoRyuuhyouDoom } from "./hokkaido-ryuuhyou-doom";
import { HokkaidoHigumaDoom } from "./hokkaido-higuma-doom";
import { HokkaidoBurakkuauto } from "./hokkaido-burakkuauto";
import { HokkaidoDaikoubasuManin } from "./hokkaido-daikoubasu-manin";
import { HokkaidoSakeFukyou } from "./hokkaido-sake-fukyou";
import { HokkaidoKionRanteika } from "./hokkaido-kion-ranteika";
```

`DOOM_ANIMATIONS` に追加:

```ts
  "hokkaido-fubuki": HokkaidoFubuki,
  "hokkaido-ryuuhyou-doom": HokkaidoRyuuhyouDoom,
  "hokkaido-higuma-doom": HokkaidoHigumaDoom,
  "hokkaido-burakkuauto": HokkaidoBurakkuauto,
  "hokkaido-daikoubasu-manin": HokkaidoDaikoubasuManin,
  "hokkaido-sake-fukyou": HokkaidoSakeFukyou,
  "hokkaido-kion-ranteika": HokkaidoKionRanteika,
```

## まだ確認できていないこと

- `node scripts/extract-legacy-content.mjs` の実行(共有ツリーのため指示どおり未実行。
  登録7箇所を当てたあとに焼いてもらう前提)
- `npm run check` 一式(焼いたあとにお願いしたい)
- `npm run shot -- hokkaido overview` などの目視確認(焼いたあとにお願いしたい)
- ~~`dooms.test.ts` の実行~~ → **実行した(2026-08-20 04:21 JST)。288件成功**
  (他盤面ぶんを含む全体テストで、hokkaido-*.tsx 7枚もこの中に含まれる)
