# 日本百名山 登録用スニペット

取りまとめ側が以下7箇所に貼り付ける。**担当(自分)はこれらのファイルを直接編集していない。**

## 地方の分割(3回のご指摘への対応)

**`joshinetsu`(29座・全体の3割)と `fujihakone`(2座)の偏りを直しました。**
`joshinetsu` を `kanto`(関東・日光・奥秩父・丹沢・富士・伊豆14座)と
`joshinetsu`(上信越17座)に分割し、`fujihakone` の富士山・天城山を `kanto` に
吸収しました。以下のスニペットはすべてこの新しい8地方
(`hokkaido`/`tohoku`/`kanto`/`joshinetsu`/`kitaalps`/`chuo_minami_alps`/
`kinkihokuriku`/`nishinihon`)に基づいています。

## 1. `scripts/extract-legacy-content.mjs`

import に追加(他の `buildXContent` の並びに合わせる):

```js
import { buildHyakumeizanContent } from "./countries/hyakumeizan/index.mjs";
```

`AUTHORED_COUNTRIES` 配列に追加:

```js
  buildHyakumeizanContent(),
```

## 2. `scripts/content-overrides/property-economy.mjs`

通貨倍率。指示どおり日本・茨城と同じ `hyakumeizan: 10000`(¥12,000,000スタート)。

```js
  hyakumeizan: 10000,
```

## 3. `src/infrastructure/content/json-country-content-repository.ts`

`LOADERS` に追加:

```ts
  hyakumeizan: () => import("./hyakumeizan.content.json").then((m) => m.default),
```

## 4. `src/infrastructure/audio/country-music-styles.ts`

`STYLE_LOADERS` に追加:

```ts
  hyakumeizan: () => import("../content/hyakumeizan.content.json").then((m) => (m.default as { styles: unknown }).styles),
```

## 5. `src/infrastructure/content/item-effect-rules.ts`

9件。**うち2件(`bearbells`/`bearspray`)はカナダが既に使っている鍵で、効果も同じ
(none=ward / repel-spirit)なので新規追加ではなく確認のみでよい**(team-lead確認済み)。
残り7件が新規。既存キーと衝突しないことを確認済み。

```ts
  // Hyakumeizan
  kyuujoheri: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  chikeizu: { type: "choose-exact-dice" },
  tozanbus: { type: "roll-fixed-dice", diceCount: 2 },
  yakoubus: { type: "roll-fixed-dice", diceCount: 3 },
  // bearbells は既存(カナダ)と同じ鍵・同じ効果なので追記不要(確認のみ)
  // bearspray も既存(カナダ)と同じ鍵・同じ効果なので追記不要(確認のみ)
  yamachizu: { type: "quiz-save" },
  matsutake: { type: "gain-cash", amount: 380 },
  raicho: { type: "extra-turn" },
```

## 6. `src/infrastructure/content/season-and-doom-rules.ts`

### 季節(12ヶ月、`SEASON_EFFECTS_BY_COUNTRY` に追加)

`region()` は `hokkaido` / `tohoku` / `kanto` / `joshinetsu` / `kitaalps` /
`chuo_minami_alps` / `kinkihokuriku` / `nishinihon`(地方分割後の8つ)。

```ts
  /**
   * 日本百名山。残雪期で北アルプス・中央南アルプスが閉山気味(4月) → GW混雑
   * で関東・上信越が賑わう(5月) → 梅雨で西日本・近畿北陸が沈む(6月) →
   * 山開きで富士(関東)・北アルプスが賑わい休神(7月) → お盆最混雑と雷雲の
   * 物入り(8月) → 台風と初冠雪の物入り(9月) → 紅葉前線で東北・上信越・
   * 中央南アルプス・近畿北陸が賑わう(10月) → 小屋閉めで関東・上信越・
   * 北アルプス・中央南アルプスが沈む(11月) → 樹氷で東北、本格積雪で
   * 北海道が沈む(12月) → スキー最盛期で北アルプス・上信越・北海道が
   * 賑わい新年アイテム(1月) → 豪雪の物入り(2月) → 雪解けで近畿北陸・
   * 西日本がやや戻る(3月)、という流れ。
   */
  hyakumeizan: [
    /* 0 Apr 残雪期・雪崩注意(北アルプス・中央南アルプスはまだ本調子でない) */ [
      { op: "region-income-multiplier", regionId: region("kitaalps"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("chuo_minami_alps"), multiplier: 0.85 },
    ],
    /* 1 May ゴールデンウィークで関東・上信越の登山口が混み合う */ [
      { op: "region-income-multiplier", regionId: region("kanto"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("joshinetsu"), multiplier: 1.15 },
      { op: "all-players-gain-cash", amount: 200 },
    ],
    /* 2 Jun 梅雨(西日本・近畿北陸がやや沈む) */ [
      { op: "region-income-multiplier", regionId: region("nishinihon"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("kinkihokuriku"), multiplier: 0.9 },
    ],
    /* 3 Jul 山開きで夏山シーズン開幕(休神) */ [
      { op: "region-income-multiplier", regionId: region("kanto"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("kitaalps"), multiplier: 1.15 },
      { op: "all-players-gain-cash", amount: 240 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug お盆最混雑(富士)と雷雲の物入り */ [
      { op: "region-income-multiplier", regionId: region("kanto"), multiplier: 1.4 },
      { op: "region-income-multiplier", regionId: region("kitaalps"), multiplier: 1.1 },
      { op: "all-players-pay-cash", amount: 150 },
    ],
    /* 5 Sep 台風と初冠雪の物入り(西日本が沈む) */ [
      { op: "region-income-multiplier", regionId: region("nishinihon"), multiplier: 0.8 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 6 Oct 紅葉前線(東北・上信越・中央南アルプス・近畿北陸が賑わう) */ [
      { op: "region-income-multiplier", regionId: region("tohoku"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("chuo_minami_alps"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("kinkihokuriku"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("joshinetsu"), multiplier: 1.1 },
      { op: "all-players-gain-cash", amount: 220 },
    ],
    /* 7 Nov 小屋閉め(関東・上信越・北アルプス・中央南アルプスが沈む) */ [
      { op: "region-income-multiplier", regionId: region("kanto"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("joshinetsu"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("kitaalps"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("chuo_minami_alps"), multiplier: 0.8 },
    ],
    /* 8 Dec 樹氷(東北が賑わう)・本格積雪(北海道が沈む) */ [
      { op: "region-income-multiplier", regionId: region("tohoku"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("hokkaido"), multiplier: 0.8 },
    ],
    /* 9 Jan スキー最盛期(北アルプス・上信越・北海道が賑わう)・新年 */ [
      { op: "region-income-multiplier", regionId: region("kitaalps"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("joshinetsu"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("hokkaido"), multiplier: 1.2 },
      { op: "give-item-to-all" },
    ],
    /* 10 Feb 豪雪の物入り(上信越・北海道が沈む) */ [
      { op: "region-income-multiplier", regionId: region("joshinetsu"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("hokkaido"), multiplier: 0.8 },
      { op: "all-players-pay-cash", amount: 160 },
    ],
    /* 11 Mar 雪解け・残雪期入口(近畿北陸・西日本がやや戻る) */ [
      { op: "region-income-multiplier", regionId: region("kinkihokuriku"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("nishinihon"), multiplier: 1.1 },
    ],
  ],
```

### 厄災(7件、`DOOM_EFFECT_ID_BY_LEGACY_ID` に追加)

7つの型(fine/percentLoss/skipTurn/loseProperties/payOthers/teleport/steal)に
過不足なく対応させてある(自分で決めた対応)。

```ts
  // Hyakumeizan
  kirimayoi: "skipTurn",       // 濃霧: 晴れるまで足止め
  rakurai: "fine",             // 雷雲: 緊急避難・装備の修理費
  kumadeai: "percentLoss",     // クマ: 慌てて後退し荷物を落とす割合ダメージ
  hachisasare: "payOthers",    // スズメバチ: 応急手当をした近くの登山者に礼を払う
  manshitsu: "steal",          // 満室: 先に着いた誰かに予約の寝床を取られる
  korogashi: "loseProperties", // 落石: 予定していた資産を手放して迂回費に充てる
  tengukakushi: "teleport",    // 天狗: 気づけば違う場所に立っている
```

## 7. `src/presentation/components/events/dooms/index.ts`

```ts
import { HyakumeizanKirimayoi } from "./hyakumeizan-kirimayoi";
import { HyakumeizanRakurai } from "./hyakumeizan-rakurai";
import { HyakumeizanKumadeai } from "./hyakumeizan-kumadeai";
import { HyakumeizanHachisasare } from "./hyakumeizan-hachisasare";
import { HyakumeizanManshitsu } from "./hyakumeizan-manshitsu";
import { HyakumeizanKorogashi } from "./hyakumeizan-korogashi";
import { HyakumeizanTengukakushi } from "./hyakumeizan-tengukakushi";
```

`DOOM_ANIMATIONS` に追加:

```ts
  "hyakumeizan-kirimayoi": HyakumeizanKirimayoi,
  "hyakumeizan-rakurai": HyakumeizanRakurai,
  "hyakumeizan-kumadeai": HyakumeizanKumadeai,
  "hyakumeizan-hachisasare": HyakumeizanHachisasare,
  "hyakumeizan-manshitsu": HyakumeizanManshitsu,
  "hyakumeizan-korogashi": HyakumeizanKorogashi,
  "hyakumeizan-tengukakushi": HyakumeizanTengukakushi,
```

---

# 報告

## 件数(最新)

- 都市(=山)100・路線100・**クイズ35**(27→35に8問追加)・出来事20(増10・減10)・
  アイテム9・厄災7・季節12・**地方8**
  (`hokkaido`9/`tohoku`12/`kanto`14/`joshinetsu`17/`kitaalps`16/
  `chuo_minami_alps`18/`kinkihokuriku`5/`nishinihon`9)
- 都市シンボル(mark)12種・都市背景(bg)16種。`hut` は未使用のまま
  (`npx eslint` は0警告のままなので、消さずに残してある)
- 物件価格は最安180〜最高2400、**13.3倍**の開き

## 地方の分割(対応済み)

`joshinetsu`(29座)→ `kanto`(14: 日光白根・男体山・那須・皇海・筑波・雲取・
両神・甲武信・金峰・瑞牆・大菩薩嶺・丹沢・**富士山・天城山**)+ `joshinetsu`
(17: 会津駒・越後駒・平ヶ岳・巻機・谷川・苗場・妙高・火打・雨飾・高妻・
武尊・至仏・燧・赤城・草津白根・四阿・浅間)に分割。`fujihakone`(2座)は
廃止し `kanto` に吸収。`flavour.mjs`(regions)・`cities.mjs`(reg)・
`music.mjs`(KANTO/JOSHINETSUのスタイル)・`money-events.mjs`(該当2件の地方
タグ)をすべて直し、`buildHyakumeizanContent()` で地方ごとの都市数が
9/12/14/17/16/18/5/9(合計100)になることを確認済み。

## アイテムの値付けと湖の修正(対応済み)

- `kyuujoheri`(山岳救助ヘリ)を520→**220**(`chikeizu` 260未満に)
- `yamachizu`(『山と高原地図』)を240→**130**(クイズ1問の最大損失147未満、
  他盤面の水準に合わせた)
- `HYAKUMEIZAN_LAKES` の芦ノ湖の座標が誤っていました(138.77, 34.93は伊豆
  半島の付け根より西、駿河湾側の海の上)。**実際の位置(139.02, 35.20。
  小田原の南西、伊豆半島東側の付け根)に直し、point-in-polygonで
  陸の上にあることを確認しました。**4湖すべて陸の上を再確認済み。

## 海陸判定(4本の指摘への対応。2回目)

1回目(端の入れ替えだけ)は効きませんでした。2回目は以下のとおりです。

- **`iwakisan–yoteizan` → `KEPT` をお願いします。**team-leadの提案どおり。
  理由文: 「青函トンネル。実在する鉄道(北海道新幹線)で、地図上は津軽海峡を
  渡る直線になるため検査が誤検知する。japanの `aomori-hakodate` と同じ扱い」
- **`rishiri–rausudake` → `KEPT` をお願いします。**同じくteam-leadの提案どおり。
  理由文: 「利尻島—知床を結ぶ実在のフェリーは無いが、盤面として2座をつなぐ
  必要がある。741pxの大部分は宗谷海峡の外洋で、北海道本島の陸をかすめて
  いるだけの誤検知」
- **`tsurugisan–daisen` → 端の入れ替えではなく、経路そのものを変えました。**
  大山(鳥取・San'in側)と剣山(徳島)を直線で結ぶと播磨灘・瀬戸内海を横切る
  ため、**大山は中国地方を西へ抜けて関門海峡(実在する橋・トンネル)を
  渡り九州へ入る経路に変更**しました(`daisen–tsurugisan` を削除し、
  代わりに `kujusan–daisen` を同じ配列位置に置いています)。剣山は石鎚山
  経由で山域内のままつながります。
- **`kujusan–ishizuchisan` → 端を `ishizuchisan–kujusan` に入れ替えました。**
  九重—石鎚をそのまま豊予海峡のフェリー(実在の佐賀関—三崎に近い経路の
  つもり)として残しています。**中継の町を挟む案(佐田岬側の町など)は
  今回のリストに該当する山が無いため見送りました。**これでも閾値を超える
  ようなら、中継の代わりに `KEPT` として残す相談をさせてください。

**配列への途中挿入はしていません**(既存の位置を書き換えただけで、
路線の本数・並び順は変わっていません)。再測定をお願いします。

## 海に近い山の余白(ご指摘への対応)

point-in-polygonの「陸の上」だけでなく、**投影後の座標から海岸線までの
最短距離(px)**を自分で実装して測りました(押し離しの上限41.1pxを踏まえ、
30px未満を要注意としました)。

```
天城山   8.2px → 座標を内陸へ寄せ、海岸線に2点追加して 18.5px
開聞岳   2.1px → 座標はそのまま、海岸線に1点追加して 7.3px(それでも要注意)
羅臼岳  13.3px → 座標を内陸へ寄せ、海岸線に2点追加して 26.5px
大山    37.2px → 座標を内陸へ2km弱寄せて 52.2px(安全域)
伊吹山  78.0px(もとから安全域)
```

**開聞岳は改善しましたが、まだ30px未満です。**実際の開聞岳は海岸から
1km足らずの独立峰で、これ以上座標を動かすと山の性格(海から直接そびえる
という一番の特徴)を損ないます。**焼いて押し離しの結果を見て、まだ海に
出るようなら相談させてください。**

## seg の実測

100路線すべての投影後距離を測定した(`HYAKUMEIZAN_PROJ.seg = 110`、
team-leadの暫定値のまま)。

```
seg=110: 1マス82件・2マス11件・3マス3件・4マス3件・6マス1件(利尻—羅臼の航路)
9マスに張り付く路線は0本。
```

**山の密集(北アルプス・中央南アルプスの39組)は、盤面の押し離し
(`relaxOverlaps`)が吸収すると教えていただきました。**seg=110で片側
20.6px・2都市間で最大41.1px離せるとのことなので、こちらでは座標も
seg値も変更していません。**`lp`(ラベル位置)はl/r/bで互い違いに
してあります**(先に対応済み)。焼いたあと `npm run shot -- hyakumeizan
overview` で北アルプス周辺を見ていただく前提で進めています。

## 4言語の欠けの数え方

`city-helpers.mjs` / 各ファイル内の `t()` は「`|`で4分割できなければ例外」を出す。
**1件ずつ目で見るのではなく**、`node -e 'import(...)...'` で全8ファイル
(= `buildHyakumeizanContent()` を最後まで実行)を実際に読み込ませ、
**例外が出ないこと**を確認した。作業中に実際に3件(物件名2件・クイズ
選択肢1件)がこの方法で日本語訳の書き漏らしとして見つかり、直した。

## 海岸線について

北海道・本州・四国・九州・利尻島・屋久島・佐渡島の7つの海岸線多角形を、
実際の岬・湾の地名を目印に自分で描き直した。**佐渡島は座標のみ描画済みで、
佐渡の山(金北山)は今回の100座には含めていない。**

point-in-polygonで100座すべてが `onLand=true`・投影範囲内であることを確認済み
(標準的な奇偶則のray castingを自分でnodeに実装して実行。team-leadが独立に
同じ判定を5座で回し、投影後座標が一致していることも確認していただいた)。

## 背景の塗り残し

art.mjsの背景16枚すべてを一度マゼンタ台紙の上でPNG化して目視した。最初の版で
4枚に塗り残しがあり、直して再確認して0件にした。**別の不具合も見つけて
直した。**装飾用の線を`<path>`で描く際、`fill="none"`を付け忘れると開いた
線が暗い塗りつぶしの領域として描画されることに気づき(hakusan_snowfieldの
等高線が黒く塗りつぶれていた)、同じ書き方をしていた15箇所すべてに
`fill="none"`を足して直し、再度PNG化して確認した。

## 厄災の絵

7枚とも `npm run preview -- <ファイル> <出力先>` でPNG化して目視した。
`npx vitest run src/presentation/components/events/dooms/dooms.test.ts` を実行し、
viewBox・`prefers-reduced-motion`・文字要素の不使用・無限ループ・`aria-hidden`・
外部URL不参照の機械チェックはすべて通過(184件成功。他盤面ぶんも含む)。

## その他の確認

- `npx tsc --noEmit`: エラー0件
- `npx eslint scripts/countries/hyakumeizan/`: エラー・警告0件
- `npx eslint src/presentation/components/events/dooms/hyakumeizan-*.tsx`: エラー・警告0件
- `buildHyakumeizanContent()` の実行(4言語チェック含む)成功、100都市・
  100路線・全都市の連結性(BFSで100/100到達確認)・投影範囲内・陸の上・
  地方内訳(9/12/14/17/16/18/5/9)を再確認済み

## まだ走らせていないもの

- `node scripts/extract-legacy-content.mjs`(共有ツリーのため指示どおり未実行)
- `check-sea-routes.mjs`・`check-quiz.mjs`・`check-city-backgrounds.mjs`(焼く必要が
  あるため未実行。直した4本の海陸判定と、天城山・開聞岳・羅臼岳の余白が
  特に気になっている)
- `npm run check` 一式
- `npm run shot -- hyakumeizan overview`(焼かれていないため未実行。北アルプス・
  中央南アルプスの押し離し後の見え方を確認してほしい)

## 迷った点・判断した点

- **大峰の女人禁制**: 山上ヶ岳を都市として置き、女人禁制がその結界の内側の
  話であり、大峰山系の実際の最高峰・八経ヶ岳には及ばないことを本文に明記した。
- **遭難・災害の史実**: 谷川岳の遭難者数、御嶽山の噴火警戒、八甲田・十勝岳・
  磐梯山・薬師岳の歴史上の災害は、いずれも60年以上前の出来事で山の性格を
  説明するのに必要と判断し、統計・年号として事実のみを記載した。**2014年の
  御嶽山噴火のような近年の個別の事故は書いていない。**
- **伝説の扱い**: 剣山の秘宝伝説、赤城山と日光の合戦伝説、恵那山の胞衣伝説、
  天狗のカミカクシなどは、いずれも「〜と語り継がれている/伝わる」と分かる
  形で書き、史実として断定していない。
- **アイヌ語由来の山名**: 利尻・羅臼・斜里の名の由来は、諸説あることを明記した。
- **音楽**: `flute`/`pluck`の2種類しか楽器が無いため、律・陽・陰・民謡の4つの
  日本の伝統的な五音音階を8地方に振り分けてテンポと和音密度で描き分けた。
  **北海道はアイヌのトンコリ独自の音階を再現できる確かな典拠を持たなかった
  ため、安易に模すことはせず、他地方と同じ五音音階の枠内で「間の広さ・
  静けさ」として表した**(music.mjs冒頭のコメント参照)。
- **座標の微調整**: 天城山・開聞岳・羅臼岳・大山の4座は、押し離しで海に
  出るのを避けるため、実座標から数百m〜2km程度、海岸線から離す方向に
  動かした(いずれも山自体の性格描写と矛盾しない範囲)。
