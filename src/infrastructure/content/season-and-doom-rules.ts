/**
 * legacy/grand-express.html の季節イベント・厄災の `run()` 関数(手続き的なロジック)を
 * 読み解いて書き起こした、宣言的なルール定義。
 *
 * コンテンツJSON(bolivia.content.json / japan.content.json)には、
 * 元コードの `run` 関数はJSON化できないため含まれていない(名前・物語文・
 * 「豆知識」だけが入っている)。ここで両国のルールを人手で再現する。
 *
 * 出典: legacy/grand-express.html の `BOLIVIA.seasons` / `BOLIVIA.doom` /
 * `JAPAN.seasons` / `JAPAN.doom`(2026-08時点)。数値・地方コードは
 * すべてソースを直接読んで書き起こしたもの。
 */
import { RegionId } from "../../domain/shared-kernel/ids";
import { DoomEffectId } from "../../domain/misfortune/doom-effect";
import { SeasonEffectOp } from "../../domain/season/season-effect";

const region = (code: string) => RegionId(code);

/** 月インデックス(0=4月)ごとの季節効果。 */
export const SEASON_EFFECTS_BY_COUNTRY: Readonly<Record<string, readonly (readonly SeasonEffectOp[])[]>> = {
newzealand: [
  /* 0 Apr 誰かが植えた場所にだけ来る紅葉(アロータウン) */ [
    { op: "region-income-multiplier", regionId: region("ota"), multiplier: 1.15 },
  ],
  /* 1 May ウナギが海へ下る */ [
    { op: "region-income-multiplier", regionId: region("wcs"), multiplier: 1.15 },
    { op: "region-income-multiplier", regionId: region("fld"), multiplier: 1.1 },
  ],
  /* 2 Jun マタリキ(マオリの新年・2022年から祝日) */ [{ op: "give-item-to-all" }],
  /* 3 Jul スキー場が開く */ [
    { op: "region-income-multiplier", regionId: region("ota"), multiplier: 1.25 },
    { op: "region-income-multiplier", regionId: region("cni"), multiplier: 1.15 },
  ],
  /* 4 Aug ザトウクジラの冬の回遊 */ [
    { op: "region-income-multiplier", regionId: region("cby"), multiplier: 1.2 },
  ],
  /* 5 Sep 時計が進み、子羊が生まれ始める */ [
    { op: "region-income-multiplier", regionId: region("wko"), multiplier: 1.15 },
    { op: "region-income-multiplier", regionId: region("cby"), multiplier: 1.1 },
  ],
  /* 6 Oct ブドウが開花し、収穫年を左右する */ [
    { op: "region-income-multiplier", regionId: region("top"), multiplier: 1.3 },
  ],
  /* 7 Nov ポフツカワの蕾がふくらむ */ [
    { op: "region-income-multiplier", regionId: region("akl"), multiplier: 1.15 },
    { op: "region-income-multiplier", regionId: region("egc"), multiplier: 1.15 },
  ],
  /* 8 Dec ポフツカワが深紅に咲き、クリスマス(休神) */ [
    { op: "all-players-gain-cash", amount: 300 },
    { op: "region-income-multiplier", regionId: region("akl"), multiplier: 1.2 },
    { op: "rest-spirit" },
  ],
  /* 9 Jan 国じゅうが一斉に休暇 */ [
    { op: "all-players-pay-cash", amount: 200 },
    { op: "region-income-multiplier", regionId: region("ota"), multiplier: 1.3 },
    { op: "region-income-multiplier", regionId: region("top"), multiplier: 1.2 },
  ],
  /* 10 Feb ワイタンギ・デー */ [
    { op: "all-players-gain-cash", amount: 260 },
    { op: "region-income-multiplier", regionId: region("akl"), multiplier: 1.2 },
  ],
  /* 11 Mar 時計が戻り、収穫が始まる */ [
    { op: "region-income-multiplier", regionId: region("top"), multiplier: 1.25 },
    { op: "region-income-multiplier", regionId: region("cby"), multiplier: 1.15 },
  ],
],
  /**
   * スペイン。聖週間の行列 → コルドバのパティオ祭り → サン・フアンの
   * かがり火 → サン・フェルミン → 8月バカンス(中央が縮み沿岸が伸びる) →
   * ラ・リオハのぶどう収穫 → サラゴサのピラール祭り → マタンサ(豚の解体) →
   * エル・ゴルド(クリスマス宝くじ・給アイテム) → レジェス・マゴスの贈り物出費 →
   * カディスのカーニバル → バレンシアのファリャス、という流れ。
   * `SPAIN_SEASONS`(flavour.mjs)の12件と対応する。
   */
  spain: [
    /* 0 Apr 聖週間の行列(アンダルシア・カスティーリャが賑わう) */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("ctr"), multiplier: 1.15 },
    ],
    /* 1 May コルドバのパティオ祭り */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.25 },
    ],
    /* 2 Jun サン・フアンのかがり火(地中海・大西洋の海辺) */ [
      { op: "region-income-multiplier", regionId: region("cat"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.1 },
    ],
    /* 3 Jul サン・フェルミン(パンプローナ) */ [
      { op: "region-income-multiplier", regionId: region("eus"), multiplier: 1.35 },
    ],
    /* 4 Aug 8月バカンス(中央・バスク・カタルーニャが縮み、沿岸が伸びる) */ [
      { op: "region-income-multiplier", regionId: region("ctr"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("eus"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("cat"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.2 },
    ],
    /* 5 Sep ラ・リオハのぶどう収穫 */ [
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.25 },
    ],
    /* 6 Oct サラゴサのピラール祭り */ [
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.2 },
    ],
    /* 7 Nov マタンサ(豚の解体。エストレマドゥーラ・カスティーリャの農村) */ [
      { op: "region-income-multiplier", regionId: region("ext"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ctr"), multiplier: 1.1 },
    ],
    /* 8 Dec エル・ゴルド(クリスマス宝くじ) */ [
      { op: "region-income-multiplier", regionId: region("ctr"), multiplier: 1.15 },
      { op: "give-item-to-all" },
    ],
    /* 9 Jan レジェス・マゴス(公現祭の贈り物出費) */ [
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 10 Feb カディスのカーニバル */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.25 },
    ],
    /* 11 Mar バレンシアのファリャス */ [
      { op: "all-players-gain-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.3 },
    ],
  ],
  // 地方: norte / bajio / occidente / centro / golfo / sur / yucatan
  mexico: [
    /* 0 Apr サン・マルコス祭(アグアスカリエンテス) */ [
      { op: "region-income-multiplier", regionId: region("bajio"), multiplier: 1.3 },
    ],
    /* 1 May 五月五日(プエブラ) */ [
      { op: "region-income-multiplier", regionId: region("centro"), multiplier: 1.15 },
    ],
    /* 2 Jun ハリケーン期に入る */ [
      { op: "region-income-multiplier", regionId: region("golfo"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("yucatan"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("sur"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("norte"), multiplier: 0.95 },
    ],
    /* 3 Jul グエラゲッツァ(オアハカ) */ [
      { op: "region-income-multiplier", regionId: region("sur"), multiplier: 1.3 },
    ],
    /* 4 Aug グアダルーペ谷の収穫 */ [
      { op: "region-income-multiplier", regionId: region("norte"), multiplier: 1.25 },
    ],
    /* 5 Sep 独立記念日(全国) */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "rest-spirit" },
    ],
    /* 6 Oct オオカバマダラ飛来(アンガングエオ) */ [
      { op: "region-income-multiplier", regionId: region("occidente"), multiplier: 1.25 },
    ],
    /* 7 Nov 死者の日(パツクアロ) */ [
      { op: "region-income-multiplier", regionId: region("occidente"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("centro"), multiplier: 1.15 },
    ],
    /* 8 Dec グアダルペの日〜ポサーダ */ [{ op: "give-item-to-all" }],
    /* 9 Jan 公現祭(ロスカとタマレス) */ [
      { op: "all-players-pay-cash", amount: 200 },
    ],
    /* 10 Feb ベラクルスのカーニバル */ [
      { op: "region-income-multiplier", regionId: region("golfo"), multiplier: 1.3 },
    ],
    /* 11 Mar 分点(チチェン・イッツァ) */ [
      { op: "region-income-multiplier", regionId: region("yucatan"), multiplier: 1.3 },
    ],
  ],
  /**
   * アジア大陸。草原のチューリップ → 暑さの前の隊商 → フェルガナの綿花 →
   * ベンガル湾のモンスーン → ヒジャーズへの巡礼 → 環太平洋の台風(9月・休神) →
   * オアシスのメロン → 東アジアの中秋節 → ヒマラヤ山麓の紅葉 →
   * 湾岸の大晦日(1月・給アイテム) → タイガの初氷 → 高原からの冷風、という流れ。
   */
  asia: [
    /* 0 Apr 草原のチューリップ */ [
      { op: "region-income-multiplier", regionId: region("cas"), multiplier: 1.2 },
    ],
    /* 1 May 暑さの前の隊商 */ [
      { op: "region-income-multiplier", regionId: region("arb"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("cas"), multiplier: 1.1 },
    ],
    /* 2 Jun フェルガナの綿花 */ [
      { op: "region-income-multiplier", regionId: region("cas"), multiplier: 1.3 },
    ],
    /* 3 Jul ベンガル湾のモンスーン */ [
      { op: "region-income-multiplier", regionId: region("sas"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("sea"), multiplier: 0.9 },
    ],
    /* 4 Aug ヒジャーズへの巡礼 */ [
      { op: "region-income-multiplier", regionId: region("arb"), multiplier: 1.3 },
    ],
    /* 5 Sep 環太平洋の台風(休神) */ [
      { op: "region-income-multiplier", regionId: region("eas"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("sea"), multiplier: 0.9 },
      { op: "rest-spirit" },
    ],
    /* 6 Oct オアシスのメロン */ [
      { op: "region-income-multiplier", regionId: region("cas"), multiplier: 1.25 },
    ],
    /* 7 Nov 東アジアの中秋節(帰省ラッシュ) */ [
      { op: "region-income-multiplier", regionId: region("eas"), multiplier: 1.3 },
      { op: "all-players-pay-cash", amount: 200 },
    ],
    /* 8 Dec ヒマラヤ山麓の紅葉(トレッキング最盛期) */ [
      { op: "region-income-multiplier", regionId: region("sas"), multiplier: 1.2 },
    ],
    /* 9 Jan 湾岸の大晦日 */ [{ op: "give-item-to-all" }],
    /* 10 Feb タイガの初氷 */ [
      { op: "region-income-multiplier", regionId: region("sib"), multiplier: 0.75 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 11 Mar 高原からの冷風 */ [
      { op: "region-income-multiplier", regionId: region("sea"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("arb"), multiplier: 1.1 },
    ],
  ],

  /**
   * 南アメリカ大陸。メンドーサの収穫終わり(4月) → アンデス高地の収穫
   * (5月) → インティ・ライミとスキー開幕(6月) → フリアヘの寒波で
   * アマゾン・アンデスが沈む(7月) → パチャママの月(8月) → チリの
   * ディエシオチョ(9月) → アタカマの花咲く砂漠とアマゾン乾季の観光
   * (10月) → 死者の日(11月) → 真夏のクリスマス(12月) → パタゴニアの
   * 短い夏の観光(1月) → 大陸各地のカーニバル(2月) → アンデスの峠が
   * 雪で閉じ交易が滞る(3月)、という流れ。
   *
   * **地方の偏りについて:** `and`(アンデス、11都市)が12か月中6回、
   * `pla`(ラプラタ・パンパ・パタゴニア、15都市)が4回登場する。
   * どちらも大陸内で都市数が多い地方で、実際の経済規模の大きさを
   * 反映した形のつもりだが、`pla` は最大の地方でもあるので、
   * 効きすぎていないか確認をお願いしたい(team-leadの指摘どおり)。
   * `car`・`gui` は各1回のみで、実質的な出番は薄い
   * (この2地方はもともと都市数が少なく、路線も大陸の中では
   * 疎らな地方であるため)。
   */
  /**
   * 南アメリカ大陸。メンドーサの収穫終わり(4月) → アマゾンの乾季で
   * 川が通りやすくなる(5月) → インティ・ライミとアンデスのスキー開幕
   * (6月) → フリアヘの寒波でアマゾン・アンデスが沈む(7月) →
   * パチャママの月(8月) → チリのディエシオチョ(9月) → アタカマの
   * 花咲く砂漠とアマゾン乾季の観光(10月) → 死者の日の代わりに
   * ラプラタ側の秋の観光(11月) → 真夏のクリスマス(12月) → パタゴニアの
   * 短い夏の観光(1月) → 大陸各地のカーニバル(2月) → アンデスの峠が
   * 雪で閉じ交易が滞る(3月)、という流れ。
   *
   * **地方の偏りについて(2026-08-14、指摘を受けて直した版):**
   * `and`(アンデス、11都市)を6回から4回に減らし、`riv`(川の国境、
   * 5都市)を1回から3回に増やした。最終的な出番は
   * car1 / gui1 / riv3 / and4 / atc4 / pla4 で、`pla`(15都市、最大の
   * 地方)と同じ4回の水準に `and`・`atc` を揃え、`riv` も3回まで
   * 底上げしている。`car`・`gui` が1回ずつなのは指摘のとおりそのままにした
   * (都市数・路線数がもともと少ない地方であるため)。
   */
  southamerica: [
    /* 0 Apr メンドーサの収穫終わり */ [
      { op: "region-income-multiplier", regionId: region("pla"), multiplier: 1.2 },
    ],
    /* 1 May アマゾンの乾季で川が通りやすくなる */ [
      { op: "region-income-multiplier", regionId: region("riv"), multiplier: 1.1 },
    ],
    /* 2 Jun インティ・ライミ(クスコ)とアンデスのスキー開幕 */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("atc"), multiplier: 1.15 },
    ],
    /* 3 Jul フリアヘの寒波(アマゾン・アンデスが沈む) */ [
      { op: "region-income-multiplier", regionId: region("riv"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 0.9 },
    ],
    /* 4 Aug パチャママの月(アンデス各地の供物) */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.2 },
    ],
    /* 5 Sep チリのディエシオチョ(独立記念日) */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("atc"), multiplier: 1.3 },
    ],
    /* 6 Oct アタカマの花咲く砂漠とアマゾン乾季の観光 */ [
      { op: "region-income-multiplier", regionId: region("atc"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("riv"), multiplier: 1.15 },
    ],
    /* 7 Nov ラプラタ側の秋の観光(死者の日はandの豆知識にのみ残す) */ [
      { op: "region-income-multiplier", regionId: region("pla"), multiplier: 1.1 },
    ],
    /* 8 Dec 真夏のクリスマス */ [
      { op: "all-players-gain-cash", amount: 280 },
      { op: "region-income-multiplier", regionId: region("pla"), multiplier: 1.15 },
    ],
    /* 9 Jan パタゴニアの短い夏の観光シーズン */ [
      { op: "region-income-multiplier", regionId: region("pla"), multiplier: 1.3 },
    ],
    /* 10 Feb 大陸各地のカーニバル(バランキージャ・マシュラマニ・エンカルナシオン) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("car"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("gui"), multiplier: 1.15 },
    ],
    /* 11 Mar アンデスの峠が雪で閉じ、交易が滞る */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("atc"), multiplier: 0.85 },
    ],
  ],

  /**
   * 北アメリカ。中米のコーヒー開花(4月)→ウミガメの産卵(5月)→乾季の合間の雨
   * (6月)→バナナ収穫の盛り(7月)→ハリケーンシーズン開幕(8月・出費)→
   * コーヒー収穫本番(9月)→独立記念日ラッシュ(10月・休神)→北の紅葉(11月)→
   * 北の収穫祝日で鉄路混雑(12月・出費)→ポインセチアとポサーダ(1月・給アイテム)
   * →寒波の南下(2月)→乾季明けと保線(3月)、という流れ。北米(米加)は北半球の
   * 秋冬に、中米・カリブは乾季/雨季と収穫暦に沿わせてある。
   */
  /**
   * 北アメリカ。中米のコーヒー開花(4月)→ウミガメの産卵(5月)→乾季の合間の雨
   * (6月)→バナナ収穫の盛り(7月)→ハリケーンシーズン開幕(8月・出費)→
   * コーヒー収穫本番(9月)→独立記念日ラッシュ(10月・休神)→北の紅葉(11月)→
   * 北の収穫祝日で鉄路混雑(12月・出費)→ポインセチアとポサーダ(1月・給アイテム)
   * →寒波の南下(2月)→乾季明けと保線(3月)、という流れ。北米(米加)は北半球の
   * 秋冬に、中米・カリブは乾季/雨季と収穫暦に沿わせてある。中米向けの効果は
   * canorth/casouthの両方に等しく掛けている(コーヒー・バナナは北部
   * 〔グアテマラ・ホンジュラス〕にも南部〔コスタリカ〕にもまたがる産業のため)。
   */
  northamerica: [
    /* 0 Apr 中米高地でコーヒーの花が咲く */ [
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.15 },
    ],
    /* 1 May ウミガメが産卵に上陸する */ [
      { op: "region-income-multiplier", regionId: region("cargr"), multiplier: 1.1 },
    ],
    /* 2 Jun 乾季の合間に雨が来る */ [
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.1 },
    ],
    /* 3 Jul バナナの収穫が盛りを迎える */ [
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.25 },
    ],
    /* 4 Aug ハリケーンシーズンが始まる(備えの出費) */ [
      { op: "all-players-pay-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("cargr"), multiplier: 0.85 },
    ],
    /* 5 Sep コーヒーの収穫が本格化する */ [
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("mex"), multiplier: 1.1 },
    ],
    /* 6 Oct 独立記念日が相次ぐ(休神) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.15 },
      { op: "rest-spirit" },
    ],
    /* 7 Nov 北の鉄路沿いに紅葉が広がる */ [
      { op: "region-income-multiplier", regionId: region("plains"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("atl"), multiplier: 1.2 },
    ],
    /* 8 Dec 収穫祝日で北の鉄路が混む(旅費がかさむ) */ [
      { op: "region-income-multiplier", regionId: region("plains"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("atl"), multiplier: 1.25 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 9 Jan ポインセチアとポサーダが南から北へ(新年の贈り物) */ [
      { op: "give-item-to-all" },
      { op: "region-income-multiplier", regionId: region("mex"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.1 },
    ],
    /* 10 Feb 寒波がふだんより南まで下がる */ [
      { op: "region-income-multiplier", regionId: region("mex"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 0.9 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 0.9 },
    ],
    /* 11 Mar 乾季が終わり、線路が開き直す */ [
      { op: "region-income-multiplier", regionId: region("canorth"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("casouth"), multiplier: 1.1 },
    ],
  ],

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

  /**
   * 日本百名山。残雪期で北アルプス・中央南アルプスが閉山気味(4月) → GW混雑
   * (5月) → 梅雨で西日本が沈む(6月) → 山開きで富士・北アルプスが賑わい
   * 休神(7月) → お盆最混雑と雷雲の物入り(8月) → 台風と初冠雪の物入り
   * (9月) → 紅葉前線で東北・中央南アルプス・近畿北陸が賑わう(10月) →
   * 小屋閉めで上信越・北アルプス・中央南アルプスが沈む(11月) → 樹氷で
   * 東北、本格積雪で北海道が沈む(12月) → スキー最盛期で北アルプス・
   * 上信越・北海道が賑わい新年アイテム(1月) → 豪雪の物入り(2月) →
   * 雪解けで近畿北陸・西日本がやや戻る(3月)、という流れ。
   */
  hyakumeizan: [
    /* 0 Apr 残雪期・雪崩注意(北アルプス・中央南アルプスはまだ本調子でない) */ [
      { op: "region-income-multiplier", regionId: region("kitaalps"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("chuo_minami_alps"), multiplier: 0.85 },
    ],
    /* 1 May ゴールデンウィークで登山口が混み合う */ [
      { op: "region-income-multiplier", regionId: region("joshinetsu"), multiplier: 1.3 },
      { op: "all-players-gain-cash", amount: 200 },
    ],
    /* 2 Jun 梅雨(西日本・近畿北陸がやや沈む) */ [
      { op: "region-income-multiplier", regionId: region("nishinihon"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("kinkihokuriku"), multiplier: 0.9 },
    ],
    /* 3 Jul 山開きで夏山シーズン開幕(休神) */ [
      { op: "region-income-multiplier", regionId: region("fujihakone"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("kitaalps"), multiplier: 1.15 },
      { op: "all-players-gain-cash", amount: 240 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug お盆最混雑と雷雲の物入り */ [
      { op: "region-income-multiplier", regionId: region("fujihakone"), multiplier: 1.4 },
      { op: "region-income-multiplier", regionId: region("joshinetsu"), multiplier: 1.15 },
      { op: "all-players-pay-cash", amount: 150 },
    ],
    /* 5 Sep 台風と初冠雪の物入り(西日本が沈む) */ [
      { op: "region-income-multiplier", regionId: region("nishinihon"), multiplier: 0.8 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 6 Oct 紅葉前線(東北・中央南アルプス・近畿北陸が賑わう) */ [
      { op: "region-income-multiplier", regionId: region("tohoku"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("chuo_minami_alps"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("kinkihokuriku"), multiplier: 1.15 },
      { op: "all-players-gain-cash", amount: 220 },
    ],
    /* 7 Nov 小屋閉め(上信越・北アルプス・中央南アルプスが沈む) */ [
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

  solarsystem: [
    /* 0 Apr ガガーリンの日(地球周回) */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.3 },
    ],
    /* 1 May シェパードの弾道飛行 */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("probe"), multiplier: 1.15 },
    ],
    /* 2 Jun テレシコワ、初の女性宇宙飛行士 */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.25 },
    ],
    /* 3 Jul 月面着陸(太陽系じゅうが祝う特別な月) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("core"), multiplier: 1.1 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug キュリオシティの火星着陸 */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.25 },
    ],
    /* 5 Sep ボイジャー打ち上げの季節(巨大惑星を回った探査機) */ [
      { op: "region-income-multiplier", regionId: region("outer"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("probe"), multiplier: 1.2 },
    ],
    /* 6 Oct スプートニク1号(最初の人工衛星) */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("probe"), multiplier: 1.15 },
    ],
    /* 7 Nov ライカを偲ぶ月(静かな追悼) */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 0.9 },
    ],
    /* 8 Dec 「地球の出」(贈り物のような一枚の写真) */ [
      { op: "give-item-to-all" },
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.15 },
    ],
    /* 9 Jan エクスプローラー1号、ヴァン・アレン帯の発見 */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("outer"), multiplier: 0.85 },
    ],
    /* 10 Feb ペイル・ブルー・ドット(海王星を越えた辺りから撮影) */ [
      { op: "region-income-multiplier", regionId: region("tno"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("deep"), multiplier: 1.15 },
    ],
    /* 11 Mar 最初の宇宙遊泳(小惑星帯へ踏み出す気概にかけて) */ [
      { op: "region-income-multiplier", regionId: region("inner"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("belt"), multiplier: 1.15 },
    ],
  ],

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

  ukraine: [
    /* 0 Apr 柳の日曜日とピサンカ、復活祭の支度 */ [
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.15 },
      { op: "all-players-pay-cash", amount: 160 },
    ],
    /* 1 May マイウカ(春の野遊び)が西部で盛ん、市場に春物 */ [
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.1 },
    ],
    /* 2 Jun イヴァナ・クパーラの焚き火と牧草刈り */ [
      { op: "region-income-multiplier", regionId: region("pl"), multiplier: 1.2 },
    ],
    /* 3 Jul 桜桃(スミミザクラ)の収穫期 */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("pl"), multiplier: 1.1 },
    ],
    /* 4 Aug 蜂蜜・リンゴのスパス祭と独立記念日(24日) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.15 },
    ],
    /* 5 Sep 新学期「最初の鐘」とぶどうの収穫始め */ [
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.2 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 6 Oct ポクロヴァ(コサックの守護聖人祭)とジャガイモの収穫 */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("east"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.1 },
    ],
    /* 7 Nov 聖マルティヌスのガチョウ祭りと新酒、待降節の斎で市が静まる */ [
      { op: "region-income-multiplier", regionId: region("west"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("pl"), multiplier: 0.9 },
    ],
    /* 8 Dec ディドゥフを立て、十二品のクリスマスイブ(いまは12/25が中心) */ [
      { op: "all-players-pay-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("ky"), multiplier: 1.15 },
    ],
    /* 9 Jan マランカの仮面行列とキャロル歌い、旧正月 */ [
      { op: "give-item-to-all" },
      { op: "region-income-multiplier", regionId: region("pl"), multiplier: 1.1 },
    ],
    /* 10 Feb ブリヌィ週間(マスリャナ)、市に薄焼きが並ぶ */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.1 },
    ],
    /* 11 Mar シェウチェンコの日(9日)、早春の静けさ */ [
      { op: "region-income-multiplier", regionId: region("ky"), multiplier: 1.15 },
      { op: "rest-spirit" },
    ],
  ],

  venezuela: [
    /* 0 Apr 聖週間、海辺とアンデスの巡礼で賑わう */ [
      { op: "region-income-multiplier", regionId: region("cap"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.1 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 1 May 五月の十字架、バルロベント海岸の徹夜の歌 */ [
      { op: "region-income-multiplier", regionId: region("cap"), multiplier: 1.2 },
    ],
    /* 2 Jun サンフアンの太鼓とカラボボ戦勝記念日(同日) */ [
      { op: "region-income-multiplier", regionId: region("cap"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.3 },
    ],
    /* 3 Jul 独立記念日とボリバル誕生日、国じゅうが祝う */ [
      { op: "all-players-gain-cash", amount: 260 },
    ],
    /* 4 Aug エンジェルフォールが雨季で水量最大に(カナイマ観光の書き入れ時) */ [
      { op: "region-income-multiplier", regionId: region("gua"), multiplier: 1.3 },
    ],
    /* 5 Sep 台風シーズンだが低緯度のため直撃をほぼ免れる(オリエンテ沿岸は平常どおり) */ [
      { op: "region-income-multiplier", regionId: region("ori"), multiplier: 1.1 },
    ],
    /* 6 Oct ラノスが増水し、牧畜が難しくなる */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 0.85 },
    ],
    /* 7 Nov フェリア・デ・ラ・チニタ(マラカイボ)とガイタの季節の始まり */ [
      { op: "region-income-multiplier", regionId: region("zu"), multiplier: 1.3 },
      { op: "all-players-gain-cash", amount: 240 },
    ],
    /* 8 Dec ガイタがラジオを占拠するクリスマス、アジャカ作りで物入り */ [
      { op: "region-income-multiplier", regionId: region("zu"), multiplier: 1.15 },
      { op: "all-players-pay-cash", amount: 220 },
    ],
    /* 9 Jan アンデスのパラドゥーラ・デル・ニーニョ(名付け親が宴を開く) */ [
      { op: "region-income-multiplier", regionId: region("and"), multiplier: 1.2 },
      { op: "give-item-to-all" },
    ],
    /* 10 Feb カーニバル、エルカジャオとカルパノが練り歩く */ [
      { op: "region-income-multiplier", regionId: region("gua"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ori"), multiplier: 1.2 },
      { op: "rest-spirit" },
    ],
    /* 11 Mar 乾季の締めくくり、ロス・ロケスの海が澄む */ [
      { op: "region-income-multiplier", regionId: region("cap"), multiplier: 1.2 },
    ],
  ],

  /**
   * カナダ。メープル season(4月) → 5月連休・別荘地(5月) → 建設シーズンと
   * ブヨ(6月) → カナダ・デーと山火事(7月・休神) → プレーリー収穫(8月) →
   * テリー・フォックスと新学期(9月) → 感謝祭と紅葉(10月) → 戦没者追悼の日と
   * グレイカップ(11月) → クリスマスマーケット(12月) → ポーラーベア・ディップ
   * (1月・給アイテム) → ウィンタールードと冬祭り(2月) → 春休みとメープル再開
   * (3月)、という流れ。
   */
  canada: [
    /* 0 Apr メープルシロップの season 終盤 */ [
      { op: "region-income-multiplier", regionId: region("qc"), multiplier: 1.2 },
    ],
    /* 1 May 5月の連休・別荘地の season 開き */ [
      { op: "region-income-multiplier", regionId: region("on"), multiplier: 1.25 },
      { op: "all-players-gain-cash", amount: 220 },
    ],
    /* 2 Jun 建設シーズンとブヨ */ [
      { op: "region-income-multiplier", regionId: region("on"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("north"), multiplier: 0.85 },
    ],
    /* 3 Jul カナダ・デーと山火事シーズン(休神) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("bc"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("ab"), multiplier: 0.85 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug プレーリーの収穫 */ [
      { op: "region-income-multiplier", regionId: region("pr"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("ab"), multiplier: 1.1 },
    ],
    /* 5 Sep テリー・フォックスと新学期の物入り */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("on"), multiplier: 1.1 },
    ],
    /* 6 Oct 感謝祭と紅葉 */ [
      { op: "all-players-gain-cash", amount: 280 },
      { op: "region-income-multiplier", regionId: region("qc"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("on"), multiplier: 1.15 },
    ],
    /* 7 Nov 戦没者追悼の日 */ [
      { op: "all-players-pay-cash", amount: 140 },
    ],
    /* 8 Dec クリスマスマーケット */ [
      { op: "all-players-pay-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("qc"), multiplier: 1.15 },
    ],
    /* 9 Jan 新年・ポーラーベア・ディップ */ [
      { op: "give-item-to-all" },
      { op: "region-income-multiplier", regionId: region("north"), multiplier: 0.85 },
    ],
    /* 10 Feb ウィンタールードと冬祭り */ [
      { op: "region-income-multiplier", regionId: region("on"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("qc"), multiplier: 1.2 },
      { op: "all-players-gain-cash", amount: 200 },
    ],
    /* 11 Mar 春休みとメープルの season 再開 */ [
      { op: "region-income-multiplier", regionId: region("ab"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("qc"), multiplier: 1.1 },
    ],
  ],

  bolivia: [
    /* 0 Apr */ [{ op: "region-income-multiplier", regionId: region("val"), multiplier: 1.25 }],
    /* 1 May */ [{ op: "region-income-multiplier", regionId: region("alt"), multiplier: 1.2 }],
    /* 2 Jun */ [{ op: "all-players-gain-cash", amount: 260 }],
    /* 3 Jul */ [{ op: "all-players-pay-cash", amount: 180 }],
    /* 4 Aug */ [{ op: "all-players-pay-cash", amount: 120 }, { op: "rest-spirit" }],
    /* 5 Sep */ [{ op: "region-income-multiplier", regionId: region("alt"), multiplier: 1.15 }],
    /* 6 Oct */ [{ op: "region-income-multiplier", regionId: region("cha"), multiplier: 0.7 }],
    /* 7 Nov */ [{ op: "region-income-multiplier", regionId: region("ama"), multiplier: 0.75 }],
    /* 8 Dec */ [{ op: "region-income-multiplier", regionId: region("cha"), multiplier: 1.3 }],
    /* 9 Jan */ [{ op: "give-item-to-all" }],
    /* 10 Feb */ [
      { op: "all-players-gain-cash", amount: 380 },
      { op: "region-income-multiplier", regionId: region("alt"), multiplier: 1.3 },
    ],
    /* 11 Mar */ [{ op: "all-players-gain-cash", amount: 200 }],
  ],
  japan: [
    /* 0 Apr */ [
      { op: "region-income-multiplier", regionId: region("kan"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("kin"), multiplier: 1.2 },
    ],
    /* 1 May */ [{ op: "all-players-gain-cash", amount: 300 }],
    /* 2 Jun */ [
      { op: "region-income-multiplier", regionId: region("kan"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("kin"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("kyu"), multiplier: 0.8 },
    ],
    /* 3 Jul */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("kin"), multiplier: 1.25 },
    ],
    /* 4 Aug */ [
      { op: "region-income-multiplier", regionId: region("kyu"), multiplier: 0.7 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep */ [{ op: "region-income-multiplier", regionId: region("nor"), multiplier: 1.3 }],
    /* 6 Oct */ [
      { op: "region-income-multiplier", regionId: region("kin"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 1.15 },
    ],
    /* 7 Nov */ [
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("kan"), multiplier: 1.1 },
    ],
    /* 8 Dec */ [{ op: "region-income-multiplier", regionId: region("kan"), multiplier: 1.3 }],
    /* 9 Jan */ [{ op: "give-item-to-all" }],
    /* 10 Feb */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 1.2 },
    ],
    /* 11 Mar */ [
      { op: "all-players-pay-cash", amount: 150 },
      { op: "region-income-multiplier", regionId: region("kan"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("kin"), multiplier: 1.15 },
    ],
  ],

  /**
   * インド。legacy には無い新規の国なので、ここが唯一の定義。
   * 1年の骨格は「暑季 → モンスーン → 祭りの季節 → 涼季」で、
   * モンスーンは南(6月)から北東(8月)へ移りながら効いていく。
   */
  india: [
    /* 0 Apr 麦の収穫と初夏 */ [
      { op: "region-income-multiplier", regionId: region("gan"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("des"), multiplier: 1.15 },
    ],
    /* 1 May 酷暑(ルー) */ [
      { op: "all-players-pay-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("des"), multiplier: 0.7 },
      { op: "region-income-multiplier", regionId: region("gan"), multiplier: 0.8 },
    ],
    /* 2 Jun モンスーン、南から来る */ [
      { op: "region-income-multiplier", regionId: region("sou"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("him"), multiplier: 0.8 },
    ],
    /* 3 Jul 平原一面の雨 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("gan"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("dec"), multiplier: 1.2 },
    ],
    /* 4 Aug 独立記念日と大水 */ [
      { op: "region-income-multiplier", regionId: region("eas"), multiplier: 0.7 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep ガネーシャ祭 */ [
      { op: "region-income-multiplier", regionId: region("dec"), multiplier: 1.3 },
    ],
    /* 6 Oct ナヴラートリとドゥルガー・プージャー */ [
      { op: "region-income-multiplier", regionId: region("eas"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("des"), multiplier: 1.2 },
    ],
    /* 7 Nov ディワーリー */ [
      { op: "all-players-gain-cash", amount: 380 },
      { op: "region-income-multiplier", regionId: region("gan"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("des"), multiplier: 1.2 },
    ],
    /* 8 Dec 婚礼の季節 */ [
      { op: "region-income-multiplier", regionId: region("des"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("him"), multiplier: 0.75 },
    ],
    /* 9 Jan サンクラーンティ(凧祭り) */ [{ op: "give-item-to-all" }],
    /* 10 Feb 旅に最も良い季節 */ [
      { op: "region-income-multiplier", regionId: region("sou"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("dec"), multiplier: 1.2 },
    ],
    /* 11 Mar ホーリー */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("gan"), multiplier: 1.15 },
    ],
  ],

  /**
   * フランス。春の解禁 → 夏のヴァカンス → ぶどうの収穫 → 冬の市、という流れ。
   * 8月は国じゅうが休むので厄災の神も休ませ、1月のガレット・デ・ロワで
   * 全員にアイテムが配られる(王冠が当たる、という趣向)。
   */
  france: [
    /* 0 Apr 春の市と復活祭 */ [
      { op: "region-income-multiplier", regionId: region("idf"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("oue"), multiplier: 1.15 },
    ],
    /* 1 May 祝日が続く月 */ [{ op: "all-players-gain-cash", amount: 280 }],
    /* 2 Jun 音楽祭と長い日 */ [
      { op: "region-income-multiplier", regionId: region("idf"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("med"), multiplier: 1.2 },
    ],
    /* 3 Jul 革命記念日と自転車競技 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.2 },
    ],
    /* 4 Aug ヴァカンス(街が空になる) */ [
      { op: "region-income-multiplier", regionId: region("idf"), multiplier: 0.7 },
      { op: "region-income-multiplier", regionId: region("med"), multiplier: 1.35 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep ぶどうの収穫 */ [
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.25 },
    ],
    /* 6 Oct 茸と栗の季節 */ [
      { op: "region-income-multiplier", regionId: region("oue"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.15 },
    ],
    /* 7 Nov 新酒と諸聖人の日 */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.2 },
    ],
    /* 8 Dec 冬の市 */ [
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("idf"), multiplier: 1.2 },
    ],
    /* 9 Jan ガレット・デ・ロワ */ [{ op: "give-item-to-all" }],
    /* 10 Feb 冬の底とカーニバル */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("med"), multiplier: 1.15 },
    ],
    /* 11 Mar 早春 */ [
      { op: "all-players-pay-cash", amount: 140 },
      { op: "region-income-multiplier", regionId: region("oue"), multiplier: 1.15 },
    ],
  ],

  /**
   * 世界一周。ここだけは**南半球と北半球で季節が逆**なので、どの月も
   * 「どこかが稼ぎどきで、どこかが端境期」になる。国内の盤面のように
   * 全体が同時に上下することはない。
   *
   * 8月は赤道の無風帯で帆に頼るものが動かないため厄災の神も止まり、
   * 1月は真夜中がUTC+14から26時間かけて世界を一周するので、
   * その道中で全員に贈り物が配られる。
   */
  world: [
    /* 0 Apr 北の花と南の収穫 */ [
      { op: "region-income-multiplier", regionId: region("sam"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("eur"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("asi"), multiplier: 1.15 },
    ],
    /* 1 May 氷が解けて北の航路が開く */ [
      { op: "region-income-multiplier", regionId: region("nam"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("eur"), multiplier: 1.15 },
    ],
    /* 2 Jun 白夜とインティ・ライミ */ [
      { op: "region-income-multiplier", regionId: region("eur"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("sam"), multiplier: 1.2 },
    ],
    /* 3 Jul 北半球が休みに入り、東アフリカは大移動 */ [
      { op: "region-income-multiplier", regionId: region("eur"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("nam"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("afr"), multiplier: 1.3 },
    ],
    /* 4 Aug 赤道の無風帯 */ [
      { op: "region-income-multiplier", regionId: region("oce"), multiplier: 0.7 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep 二つの海の嵐 */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("asi"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("nam"), multiplier: 0.75 },
    ],
    /* 6 Oct 紅葉とジャカランダ */ [
      { op: "region-income-multiplier", regionId: region("nam"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("afr"), multiplier: 1.2 },
    ],
    /* 7 Nov ディワーリーと死者の日 */ [
      { op: "region-income-multiplier", regionId: region("asi"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("nam"), multiplier: 1.2 },
    ],
    /* 8 Dec 二つの気温のクリスマス */ [
      { op: "region-income-multiplier", regionId: region("oce"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("sam"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("eur"), multiplier: 1.2 },
    ],
    /* 9 Jan 真夜中が世界を一周する */ [{ op: "give-item-to-all" }],
    /* 10 Feb 謝肉祭 */ [
      { op: "region-income-multiplier", regionId: region("sam"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("eur"), multiplier: 0.8 },
    ],
    /* 11 Mar 大移動がまた始まる */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("eur"), multiplier: 1.15 },
    ],
  ],

  /**
   * 茨城。**県単位なので「地方まるごとの好不況」が書けない。**
   * 県北が不況で県南が好況、というほどの差は一つの県の中には無く、
   * 書けば嘘になる。そこで**その月にその場所で実際に起きる行事**で差をつける。
   *
   * 梅(2月・偕楽園)、桃(3月・城跡)、あやめ(6月・潮来)、海開き(7月・大洗)、
   * 花火(10月・土浦)、紅葉(11月・袋田)、干し芋(12月・那珂湊)、
   * 氷瀑(1月・袋田)。土地の暮らしの周期そのものが季節になっている。
   *
   * 8月は「雷と、雷でないもの」。関東平野の雷は夏の風物で、
   * 厄災の神(ダイダラボウ)もこの月は雷に紛れて休む。
   */
  ibaraki: [
    /* 0 Apr 田に水が入る */ [
      { op: "region-income-multiplier", regionId: region("nan"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sei"), multiplier: 1.2 },
    ],
    /* 1 May メロンと新茶 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("rok"), multiplier: 1.25 },
    ],
    /* 2 Jun 水路のあやめ(潮来) */ [
      { op: "region-income-multiplier", regionId: region("rok"), multiplier: 1.3 },
    ],
    /* 3 Jul 海が開く(大洗・鹿島灘) */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("rok"), multiplier: 1.2 },
    ],
    /* 4 Aug 雷と、雷でないもの */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep 梨と、それを落とす風 */ [
      { op: "region-income-multiplier", regionId: region("sei"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("hok"), multiplier: 0.8 },
    ],
    /* 6 Oct 技を裁かれる花火(土浦) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("nan"), multiplier: 1.3 },
    ],
    /* 7 Nov 渓谷が色を変える(袋田) */ [
      { op: "region-income-multiplier", regionId: region("hok"), multiplier: 1.35 },
    ],
    /* 8 Dec 干し場が立つ(那珂湊) */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("hok"), multiplier: 1.15 },
    ],
    /* 9 Jan 滝が止まる(袋田の氷瀑) */ [{ op: "give-item-to-all" }],
    /* 10 Feb 何よりも先に梅(偕楽園) */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.35 },
    ],
    /* 11 Mar 城跡の桃 */ [
      { op: "all-players-gain-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("sei"), multiplier: 1.15 },
    ],
  ],

  /**
   * 韓国。桜前線(4月) → 梅雨と避暑(6〜7月) → 光復節(8月・休神) →
   * 秋夕(9月) → 紅葉(10月) → キムジャン(11月) → クリスマスとスキー(12月) →
   * ソルラル(1月・給アイテム) → 寒波と済州避寒(2月) → 新学期(3月)、という流れ。
   * 江原(gw)は観光・行楽の地方として一年を通じてよく上がる。
   */
  korea: [
    /* 0 Apr 桜前線 */ [
      { op: "region-income-multiplier", regionId: region("gs"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("jj"), multiplier: 1.15 },
    ],
    /* 1 May こどもの日・釈迦誕生日 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("gw"), multiplier: 1.2 },
    ],
    /* 2 Jun 大麦の収穫と梅雨入り(南から) */ [
      { op: "region-income-multiplier", regionId: region("jl"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("jj"), multiplier: 0.8 },
    ],
    /* 3 Jul 梅雨と避暑 */ [
      { op: "region-income-multiplier", regionId: region("gw"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("gg"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("cc"), multiplier: 0.8 },
    ],
    /* 4 Aug 光復節と休暇の頂点 */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("gs"), multiplier: 1.2 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep 秋夕(ハンガウィ) */ [
      { op: "all-players-gain-cash", amount: 380 },
      { op: "region-income-multiplier", regionId: region("cc"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("jl"), multiplier: 1.2 },
    ],
    /* 6 Oct 紅葉 */ [
      { op: "region-income-multiplier", regionId: region("gw"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("gs"), multiplier: 1.2 },
    ],
    /* 7 Nov キムジャン */ [
      { op: "region-income-multiplier", regionId: region("jl"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("cc"), multiplier: 1.15 },
    ],
    /* 8 Dec クリスマスとスキーシーズン */ [
      { op: "region-income-multiplier", regionId: region("gw"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("gg"), multiplier: 1.2 },
    ],
    /* 9 Jan ソルラル(旧正月) */ [{ op: "give-item-to-all" }],
    /* 10 Feb 寒波と済州への避寒旅行 */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("jj"), multiplier: 1.25 },
    ],
    /* 11 Mar 新学期と済州の早春 */ [
      { op: "all-players-pay-cash", amount: 140 },
      { op: "region-income-multiplier", regionId: region("jj"), multiplier: 1.15 },
    ],
  ],

  /**
   * トルコ。チューリップ(4月) → ヒドゥレルレズ(5月) → さくらんぼ(6月) →
   * 海岸リゾートの最盛期(7月) → 戦勝記念日・休神(8月) → ブドウの収穫(9月) →
   * 共和国記念日(10月・最大の祝日) → オリーブ(11月) → 柑橘(12月) →
   * シェケル・バイラム(1月・給アイテム) → カラコンジョロス・ギュンレリ/寒波
   * (2月) → ネヴルズ(3月・東部で特に盛ん)、という流れ。
   * 中央アナトリア(ica)は首都アンカラを含むため、国の祝日でよく上がる。
   */
  turkey: [
    /* 0 Apr チューリップとカッパドキアの好天 */ [
      { op: "region-income-multiplier", regionId: region("mar"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 1.15 },
    ],
    /* 1 May ヒドゥレルレズ */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("mar"), multiplier: 1.2 },
    ],
    /* 2 Jun さくらんぼの収穫 */ [
      { op: "region-income-multiplier", regionId: region("kar"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 1.15 },
    ],
    /* 3 Jul 海岸リゾートの最盛期 */ [
      { op: "region-income-multiplier", regionId: region("ege"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("akd"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 0.85 },
    ],
    /* 4 Aug 戦勝記念日と休神 */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 1.2 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep ブドウの収穫 */ [
      { op: "region-income-multiplier", regionId: region("mar"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ege"), multiplier: 1.2 },
    ],
    /* 6 Oct 共和国記念日 */ [
      { op: "all-players-gain-cash", amount: 380 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 1.25 },
    ],
    /* 7 Nov オリーブの収穫 */ [
      { op: "region-income-multiplier", regionId: region("ege"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("akd"), multiplier: 1.1 },
    ],
    /* 8 Dec 柑橘の収穫 */ [
      { op: "region-income-multiplier", regionId: region("akd"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("ege"), multiplier: 1.1 },
    ],
    /* 9 Jan シェケル・バイラム(旧暦のため月は便宜上の固定) */ [{ op: "give-item-to-all" }],
    /* 10 Feb カラコンジョロス・ギュンレリ(寒波) */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("dogu"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("kar"), multiplier: 0.85 },
    ],
    /* 11 Mar ネヴルズ(春分) */ [
      { op: "all-players-gain-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("dogu"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("ica"), multiplier: 1.1 },
    ],
  ],

  /**
   * ドイツ。春のシュパーゲルツァイト(白アスパラガス) → バイエルンの
   * マイバウム → ラインの花火 → キーラー・ヴォッヘ → 夏休み(休神) →
   * オクトーバーフェスト → 統一記念日とワイン収穫 → 聖マルティンの提灯 →
   * クリスマス市 → ジルヴェスター(給アイテム) → カーニバル →
   * 春の大掃除、という流れ。
   */
  germany: [
    /* 0 Apr シュパーゲルツァイト(白アスパラガス) */ [
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ost"), multiplier: 1.15 },
    ],
    /* 1 May マイバウム(バイエルンの五月柱) */ [
      { op: "region-income-multiplier", regionId: region("bay"), multiplier: 1.25 },
    ],
    /* 2 Jun ラインの花火(ライン・イン・フラメン) */ [
      { op: "region-income-multiplier", regionId: region("rhein"), multiplier: 1.2 },
    ],
    /* 3 Jul キーラー・ヴォッヘ */ [
      { op: "region-income-multiplier", regionId: region("nord"), multiplier: 1.3 },
    ],
    /* 4 Aug 夏休み(休神) */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep オクトーバーフェスト開幕 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("bay"), multiplier: 1.3 },
    ],
    /* 6 Oct 統一記念日とワイン収穫 */ [
      { op: "all-players-gain-cash", amount: 320 },
      { op: "region-income-multiplier", regionId: region("rhein"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.15 },
    ],
    /* 7 Nov 聖マルティンの提灯行列(ラインラント) */ [
      { op: "region-income-multiplier", regionId: region("rhein"), multiplier: 1.2 },
    ],
    /* 8 Dec クリスマス市 */ [
      { op: "region-income-multiplier", regionId: region("bay"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("ost"), multiplier: 1.2 },
    ],
    /* 9 Jan ジルヴェスター(給アイテム) */ [{ op: "give-item-to-all" }],
    /* 10 Feb カーニバル(ラインラント) */ [
      { op: "all-players-pay-cash", amount: 150 },
      { op: "region-income-multiplier", regionId: region("rhein"), multiplier: 1.3 },
    ],
    /* 11 Mar 春の大掃除と新年度の準備 */ [
      { op: "all-players-pay-cash", amount: 120 },
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.1 },
    ],
  ],

  china: [
    /* 0 Apr 清明・洛陽の牡丹(華北) */ [
      { op: "region-income-multiplier", regionId: region("hb"), multiplier: 1.3 },
    ],
    /* 1 May 労働節の旅ラッシュ・華東の工場休業 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("hd"), multiplier: 1.15 },
    ],
    /* 2 Jun 端午節の竜舟(長江=華東・珠江=華南) */ [
      { op: "region-income-multiplier", regionId: region("hn"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("hd"), multiplier: 1.15 },
    ],
    /* 3 Jul 暑さで東北が避暑地に、華南は屋内へ */ [
      { op: "region-income-multiplier", regionId: region("db"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("hn"), multiplier: 0.8 },
    ],
    /* 4 Aug 夏休み最盛期、南の海辺(厦門〜三亜)が埋まる */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("hn"), multiplier: 1.2 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep 中秋節、月餅を贈り合う */ [
      { op: "all-players-gain-cash", amount: 380 },
      { op: "region-income-multiplier", regionId: region("hn"), multiplier: 1.2 },
    ],
    /* 6 Oct 国慶節の黄金週間、北京の公園と紅葉 */ [
      { op: "region-income-multiplier", regionId: region("hb"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("xn"), multiplier: 1.15 },
    ],
    /* 7 Nov 菊花展と収穫市 */ [
      { op: "region-income-multiplier", regionId: region("hd"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("hb"), multiplier: 1.15 },
    ],
    /* 8 Dec 冬至の餃子、ハルビン氷祭りの準備(東北) */ [
      { op: "region-income-multiplier", regionId: region("db"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("xb"), multiplier: 0.85 },
    ],
    /* 9 Jan 春節 */ [{ op: "give-item-to-all" }],
    /* 10 Feb 元宵節、ハルビンの氷祭りが続く */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("db"), multiplier: 1.2 },
    ],
    /* 11 Mar 黄砂の季節が始まる(西北・華北) */ [
      { op: "region-income-multiplier", regionId: region("xb"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("hb"), multiplier: 0.9 },
    ],
  ],

  /**
   * イギリス。イースターと競馬(4月) → チェルシー花博(5月) → ウィンブルドンと
   * 夏至(6月) → 夏休みと海辺(7月) → エディンバラ・フリンジと休神(8月) →
   * サッカー再開と収穫(9月) → 紅葉と冬時間(10月) → ボンファイア・ナイト(11月) →
   * クリスマス市(12月) → ホグマネイと給アイテム(1月) → シックス・ネイションズ(2月) →
   * 聖デイヴィッド・聖パトリックの日(3月)、という流れ。
   * 他国のAugust=休神/January=給アイテムの慣例に揃えてある。
   */
  uk: [
    /* 0 Apr イースターとグランドナショナル(リヴァプール) */ [
      { op: "region-income-multiplier", regionId: region("no"), multiplier: 1.2 },
    ],
    /* 1 May チェルシー・フラワー・ショーとメーデー */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.25 },
    ],
    /* 2 Jun ウィンブルドンと夏至 */ [
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sc"), multiplier: 1.1 },
    ],
    /* 3 Jul 夏休みと海辺・湖水地方のにぎわい */ [
      { op: "all-players-pay-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("wa"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("no"), multiplier: 1.15 },
    ],
    /* 4 Aug エディンバラ・フリンジとヒースの季節 */ [
      { op: "region-income-multiplier", regionId: region("sc"), multiplier: 1.3 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep サッカー再開と収穫 */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("mi"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("no"), multiplier: 1.15 },
    ],
    /* 6 Oct 紅葉と冬時間 */ [
      { op: "region-income-multiplier", regionId: region("no"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("wa"), multiplier: 1.1 },
    ],
    /* 7 Nov ボンファイア・ナイトとリメンバランス */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("mi"), multiplier: 1.15 },
    ],
    /* 8 Dec クリスマス市とパントマイム */ [
      { op: "all-players-pay-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("se"), multiplier: 1.3 },
    ],
    /* 9 Jan ホグマネイとバーンズ・ナイト */ [{ op: "give-item-to-all" }],
    /* 10 Feb シックス・ネイションズと中間休み */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("wa"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("sc"), multiplier: 1.15 },
    ],
    /* 11 Mar 聖デイヴィッドの日・聖パトリックの日 */ [
      { op: "all-players-gain-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("wa"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("ni"), multiplier: 1.25 },
    ],
  ],

  /**
   * イタリア。復活祭とオリーブの春 → 開いたワイナリーと避暑 →
   * フェラゴスト(8月・休神) → 収穫とヴェネツィアのレガータ → トリュフの秋 →
   * 万霊節 → クリスマス市とプレゼーペ → エピファニア(1月・給アイテム) →
   * カーニバル → アーモンドの花咲くシチリアの春、という流れ。
   */
  italy: [
    /* 0 Apr 復活祭とオリーブの開花 */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.15 },
    ],
    /* 1 May カンティーネ・アペルテ(開かれた酒蔵) */ [
      { op: "region-income-multiplier", regionId: region("nov"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
    ],
    /* 2 Jun 海開きと共和国記念日 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sar"), multiplier: 1.15 },
    ],
    /* 3 Jul パリオと真夏の観光 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("sic"), multiplier: 1.2 },
    ],
    /* 4 Aug フェラゴスト(街が空になる) */ [
      { op: "region-income-multiplier", regionId: region("nov"), multiplier: 0.7 },
      { op: "region-income-multiplier", regionId: region("sar"), multiplier: 1.3 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep ヴェンデンミアとレガータ・ストーリカ */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("nes"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
    ],
    /* 6 Oct 白トリュフと新しいオリーブオイル */ [
      { op: "region-income-multiplier", regionId: region("nov"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.15 },
    ],
    /* 7 Nov 万霊節と今年最後のオリーブ */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.2 },
    ],
    /* 8 Dec クリスマス市とプレゼーペ */ [
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("nes"), multiplier: 1.15 },
    ],
    /* 9 Jan エピファニアとベファーナ */ [{ op: "give-item-to-all" }],
    /* 10 Feb カーニバルの仮面 */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("nes"), multiplier: 1.35 },
    ],
    /* 11 Mar アーモンドの花とシチリアの早春 */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("sic"), multiplier: 1.3 },
    ],
  ],

  /**
   * ロシア。ラスプーチツァ(4月・雪解けの泥濘) → 戦勝記念日 →
   * 白夜のサンクトペテルブルク → ヴォルガの遊覧船とダーチャの夏 →
   * ダーチャの収穫(8月・休神) → きのこ狩りと新学期 → 黄金の秋 →
   * 初雪と民族統一の日 → 新年準備 → 新年とジェド・マロース(1月・給アイテム) →
   * 冬将軍 → マースレニツァとバイカルの氷、という流れ。
   */
  russia: [
    /* 0 Apr ラスプーチツァ(泥濘の季節) */ [
      { op: "region-income-multiplier", regionId: region("yug"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("vlg"), multiplier: 0.85 },
    ],
    /* 1 May 戦勝記念日 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("yug"), multiplier: 1.15 },
    ],
    /* 2 Jun 白夜とロシアの日 */ [
      { op: "region-income-multiplier", regionId: region("szp"), multiplier: 1.35 },
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("dv"), multiplier: 1.2 },
    ],
    /* 3 Jul ヴォルガの遊覧船とダーチャの夏 */ [
      { op: "region-income-multiplier", regionId: region("vlg"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 1.15 },
    ],
    /* 4 Aug ダーチャの収穫(街が空になる) */ [
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("yug"), multiplier: 1.3 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep きのこ狩りと新学期 */ [
      { op: "region-income-multiplier", regionId: region("sib"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("dv"), multiplier: 1.15 },
    ],
    /* 6 Oct 黄金の秋 */ [
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("szp"), multiplier: 1.15 },
    ],
    /* 7 Nov 初雪と民族統一の日 */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("dv"), multiplier: 1.15 },
    ],
    /* 8 Dec 新年準備の市 */ [
      { op: "all-players-pay-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("szp"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 1.2 },
    ],
    /* 9 Jan 新年とジェド・マロース */ [{ op: "give-item-to-all" }],
    /* 10 Feb 冬将軍 */ [
      { op: "all-players-pay-cash", amount: 200 },
      { op: "region-income-multiplier", regionId: region("sib"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("vlg"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("tsn"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("yug"), multiplier: 0.85 },
    ],
    /* 11 Mar マースレニツァとバイカルの氷 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("sib"), multiplier: 1.3 },
    ],
  ],

  /**
   * アメリカ合衆国。オープニングデー(野球) → ダービーと road trip 開幕 →
   * ルート66の夏 → 独立記念日(7月・休神) → 州フェアと熱波 →
   * 紅葉狩りとレイバーデー → ワールドシリーズ → 感謝祭の帰省ラッシュ →
   * ホリデー商戦とクリスマス市 → 元日のボウルゲーム(1月・給アイテム) →
   * グラウンドホッグ・デーとスーパーボウル → 桜とスプリングトレーニング、
   * という流れ。
   */
  usa: [
    /* 0 Apr オープニングデーと国立公園の再開 */ [
      { op: "region-income-multiplier", regionId: region("mw"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("plains"), multiplier: 1.15 },
    ],
    /* 1 May ケンタッキーダービーとメモリアルデー */ [
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.25 },
      { op: "all-players-gain-cash", amount: 220 },
    ],
    /* 2 Jun ルート66の夏休みロードトリップ */ [
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("pacific"), multiplier: 1.15 },
    ],
    /* 3 Jul 独立記念日(グレムリンも休む) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "rest-spirit" },
    ],
    /* 4 Aug 州フェアと熱波ドーム */ [
      { op: "region-income-multiplier", regionId: region("mw"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("plains"), multiplier: 0.75 },
    ],
    /* 5 Sep 紅葉狩りとレイバーデー */ [
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.3 },
      { op: "all-players-pay-cash", amount: 180 },
    ],
    /* 6 Oct ワールドシリーズ */ [
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("mw"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.15 },
    ],
    /* 7 Nov 感謝祭の帰省ラッシュ */ [
      { op: "all-players-pay-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.15 },
    ],
    /* 8 Dec ホリデー商戦とクリスマス市 */ [
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("mw"), multiplier: 1.2 },
      { op: "all-players-gain-cash", amount: 200 },
    ],
    /* 9 Jan 元日のボウルゲーム */ [
      { op: "give-item-to-all" },
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.2 },
    ],
    /* 10 Feb グラウンドホッグ・デーとスーパーボウル */ [
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.15 },
      { op: "all-players-gain-cash", amount: 260 },
    ],
    /* 11 Mar 桜とスプリングトレーニング */ [
      { op: "region-income-multiplier", regionId: region("ne"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("south"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sw"), multiplier: 1.2 },
    ],
  ],

  /**
   * インドネシア。ラマダンと大帰省(ムディック) → ボロブドゥールのワイサック →
   * 凪の海とウミガメの産卵 → ドリアン・マンゴーと新学期 → ムルデカ(8月・休神) →
   * 乾季の稲刈り → バティックの日 → 雨季と田植え → 東部のクリスマス →
   * 雨季の頂点の新年 → イムレックと紅包(2月・給アイテム) → ニュピ、という流れ。
   */
  indonesia: [
    /* 0 Apr ラマダンと大帰省 */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("sum"), multiplier: 0.8 },
      { op: "region-income-multiplier", regionId: region("jav"), multiplier: 0.8 },
    ],
    /* 1 May ワイサック(ボロブドゥール) */ [
      { op: "region-income-multiplier", regionId: region("jav"), multiplier: 1.25 },
    ],
    /* 2 Jun 凪の海とウミガメの産卵 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("nut"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sul"), multiplier: 1.15 },
    ],
    /* 3 Jul ドリアン・マンゴーと新学期 */ [
      { op: "region-income-multiplier", regionId: region("sum"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("kal"), multiplier: 1.15 },
    ],
    /* 4 Aug ムルデカ(独立記念日) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep 乾季の稲刈り */ [
      { op: "region-income-multiplier", regionId: region("jav"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sul"), multiplier: 1.2 },
    ],
    /* 6 Oct バティックの日 */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("jav"), multiplier: 1.15 },
    ],
    /* 7 Nov 雨季と田植え */ [
      { op: "region-income-multiplier", regionId: region("sum"), multiplier: 0.85 },
      { op: "region-income-multiplier", regionId: region("kal"), multiplier: 0.85 },
    ],
    /* 8 Dec 東部のクリスマス */ [
      { op: "region-income-multiplier", regionId: region("sul"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("mlp"), multiplier: 1.3 },
    ],
    /* 9 Jan 雨季の頂点・新年 */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("jav"), multiplier: 0.8 },
    ],
    /* 10 Feb イムレックと紅包 */ [{ op: "give-item-to-all" }],
    /* 11 Mar ニュピ(バリの静寂の日) */ [
      { op: "region-income-multiplier", regionId: region("nut"), multiplier: 0.6 },
      { op: "region-income-multiplier", regionId: region("kal"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("mlp"), multiplier: 1.15 },
    ],
  ],

  /**
   * モロッコ。移牧の春 → バラの谷の収穫 → 聖なる音楽とグナワの6月 →
   * 王位記念日(7月) → ラマダン(8月に便宜上固定。太陰暦で実際の月は
   * 毎年動く) → イミルシルの婚約祭 → デーツの収穫 →
   * 緑の行進と独立記念日(11月) → オリーブの初搾り(12月) →
   * ヤンナイルと峠の初雪(1月) → タフラウトのアーモンドの花(2月) →
   * ガルブのオレンジの花(3月)、という流れ。
   */
  morocco: [
    /* 0 Apr 移牧(アザガル)の春 */ [
      { op: "region-income-multiplier", regionId: region("atm"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.1 },
    ],
    /* 1 May バラの谷の収穫(ケラア・ムグナ) */ [
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("atm"), multiplier: 1.15 },
    ],
    /* 2 Jun 聖なる音楽祭とグナワ音楽祭 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("atl"), multiplier: 1.2 },
    ],
    /* 3 Jul 王位記念日とサハラの暑さの始まり */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.2 },
    ],
    /* 4 Aug ラマダン(旧暦のため月は便宜上の固定)。日中の商いは静まり、
       日没後のイフタール商戦でにぎわう */ [
      { op: "all-players-pay-cash", amount: 140 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.15 },
    ],
    /* 5 Sep イミルシルの婚約祭 */ [
      { op: "all-players-gain-cash", amount: 280 },
      { op: "region-income-multiplier", regionId: region("atm"), multiplier: 1.2 },
    ],
    /* 6 Oct エルフードのデーツ祭り */ [
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.15 },
    ],
    /* 7 Nov 緑の行進と独立記念日 */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("rif"), multiplier: 1.2 },
    ],
    /* 8 Dec オリーブの初搾り(メクネス) */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("est"), multiplier: 1.15 },
    ],
    /* 9 Jan ヤンナイルと峠の初雪(給アイテム) */ [{ op: "give-item-to-all" }],
    /* 10 Feb タフラウトのアーモンドの花 */ [
      { op: "all-players-pay-cash", amount: 180 },
      { op: "region-income-multiplier", regionId: region("sud"), multiplier: 1.25 },
    ],
    /* 11 Mar ガルブのオレンジの花 */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("atl"), multiplier: 1.15 },
    ],
  ],

  /**
   * ガーナ。クワフェのイースター・パラグライディングと大雨季の始まり →
   * 雨季のピーク → 雨のあいまの小休止(漁期) → 八月の休み →
   * ホモウォ(8月・休神) → 小雨季と新ヤムイモ → カカオの収穫開始 →
   * ハルマッタン到来とホグベツォツォ → ハルマッタンとクリスマス →
   * 一年でいちばん乾いた1月 → ナショナル・チョコレート・デー → 独立記念日、という流れ。
   */
  ghana: [
    /* 0 Apr クワフェのイースターと大雨季の始まり */ [
      { op: "all-players-gain-cash", amount: 220 },
      { op: "region-income-multiplier", regionId: region("gar"), multiplier: 1.15 },
    ],
    /* 1 May 大雨季のピーク */ [
      { op: "region-income-multiplier", regionId: region("asa"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("wes"), multiplier: 1.15 },
    ],
    /* 2 Jun 雨のあいまの小休止(漁期) */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.25 },
    ],
    /* 3 Jul 八月の休み(海岸の乾いた凪) */ [
      { op: "region-income-multiplier", regionId: region("cen"), multiplier: 1.1 },
      { op: "region-income-multiplier", regionId: region("asa"), multiplier: 0.85 },
    ],
    /* 4 Aug ホモウォ(休神) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("gar"), multiplier: 1.3 },
      { op: "rest-spirit" },
    ],
    /* 5 Sep 小雨季と新ヤムイモ・オドウィラ */ [
      { op: "region-income-multiplier", regionId: region("asa"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("vol"), multiplier: 1.15 },
    ],
    /* 6 Oct カカオの収穫開始 */ [
      { op: "all-players-gain-cash", amount: 300 },
      { op: "region-income-multiplier", regionId: region("asa"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("wes"), multiplier: 1.25 },
    ],
    /* 7 Nov ハルマッタン到来とホグベツォツォ */ [
      { op: "region-income-multiplier", regionId: region("vol"), multiplier: 1.25 },
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 0.85 },
    ],
    /* 8 Dec ハルマッタンとクリスマス */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("gar"), multiplier: 1.2 },
    ],
    /* 9 Jan 一年でいちばん乾いた月 */ [
      { op: "region-income-multiplier", regionId: region("nor"), multiplier: 0.75 },
      { op: "region-income-multiplier", regionId: region("wes"), multiplier: 1.15 },
    ],
    /* 10 Feb ナショナル・チョコレート・デー */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("wes"), multiplier: 1.2 },
    ],
    /* 11 Mar 独立記念日 */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("gar"), multiplier: 1.3 },
    ],
  ],

  /**
   * バリ。乾季とサーフの始まり → コーヒーの摘み始め → 芸術祭 → 凧の季節 →
   * ガルンガン/クニンガン(1回目) → 棚田の刈り取りとマンゴー → 塩づくりの
   * 仕上げ → 雨季と田起こし → 雨季本番と工芸の季節 → ガルンガン/クニンガン
   * (2回目、給アイテム) → 雨季の底(南部の水害リスク) → ニュピ(休神)、という流れ。
   */
  bali: [
    /* 0 Apr 乾季とサーフの波が始まる */ [
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("brt"), multiplier: 1.15 },
    ],
    /* 1 May コーヒーの実が色づき始める */ [
      { op: "region-income-multiplier", regionId: region("gl"), multiplier: 1.25 },
    ],
    /* 2 Jun 芸術祭(州都) */ [
      { op: "all-players-gain-cash", amount: 260 },
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 1.2 },
    ],
    /* 3 Jul 凧の季節 */ [
      { op: "all-players-gain-cash", amount: 240 },
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 1.15 },
    ],
    /* 4 Aug ガルンガンとクニンガン(1回目) */ [
      { op: "all-players-gain-cash", amount: 280 },
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("tim"), multiplier: 1.25 },
    ],
    /* 5 Sep 棚田の刈り取りとマンゴー */ [
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 1.15 },
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 1.2 },
      { op: "region-income-multiplier", regionId: region("tim"), multiplier: 1.15 },
    ],
    /* 6 Oct 塩田をならす(乾季の仕上げ) */ [
      { op: "region-income-multiplier", regionId: region("brt"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("utr"), multiplier: 1.1 },
    ],
    /* 7 Nov 雨が戻り田を起こす */ [
      { op: "all-players-pay-cash", amount: 160 },
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 1.1 },
    ],
    /* 8 Dec 雨季本番、工芸の季節 */ [
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 1.3 },
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 1.1 },
    ],
    /* 9 Jan ガルンガンとクニンガン(2回目)、サラスワティ */ [{ op: "give-item-to-all" }],
    /* 10 Feb 雨季の底(南部の水害リスク) */ [
      { op: "all-players-pay-cash", amount: 140 },
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 0.75 },
    ],
    /* 11 Mar ニュピ(島が丸ごと止まる日) */ [
      { op: "rest-spirit" },
      { op: "region-income-multiplier", regionId: region("sel"), multiplier: 0.65 },
      { op: "region-income-multiplier", regionId: region("ubu"), multiplier: 0.65 },
      { op: "region-income-multiplier", regionId: region("gl"), multiplier: 0.65 },
      { op: "region-income-multiplier", regionId: region("tim"), multiplier: 0.65 },
      { op: "region-income-multiplier", regionId: region("utr"), multiplier: 0.65 },
      { op: "region-income-multiplier", regionId: region("brt"), multiplier: 0.65 },
    ],
  ],

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
};

/**
 * 両国とも全く同じ7種類の災難ロジック(数値も同じ)で、`id` だけが国ごとの
 * フレーバーに応じて異なる。`id` → 効果種別の対応。
 */
export const DOOM_EFFECT_ID_BY_LEGACY_ID: Readonly<Record<string, DoomEffectId>> = {
// New Zealand
"ruapehu-ash": "fine", // 降灰の掃除・保線費用
norwester: "loseProperties", // 強風で緩んだ屋根が飛ばされる被害
"flood-washout": "steal", // 混乱に紛れて盗まれる(増水で迂回する人混みの中)
sandflies: "percentLoss", // 虫よけ・応急処置に現金の一部を費やす
"ferry-cancelled": "payOthers", // 波止場で足止めされた者どうし食料・宿を分け合う
"taniwha-lost": "teleport", // 化かされて気づけば別の場所にいる
"sheep-jam": "skipTurn", // 羊の大群が退くまで待たされる
  // Spain
  calima: "fine",
  "ola-calor": "skipTurn",
  dana: "loseProperties",
  huelga: "payOthers",
  siesta: "percentLoss",
  procesion: "teleport",
  carterista: "steal",
  // Mexico
  huracan: "loseProperties", // ハリケーン上陸。沿岸の物件が飛ぶ
  temblor: "percentLoss", // 地震。建て直しに資産の一部が消える
  ceniza: "skipTurn", // 火山灰。空港も線路も止まる
  contingencia: "skipTurn", // 大気汚染の通行規制。動けない
  chaneque: "teleport", // 精霊に化かされて、まるで違う場所に出る
  ratero: "steal", // 市場のすり
  padrino: "payOthers", // 代父母に指名され、費用を持たされる
  // Asia
  sandstorm: "fine", // 埋もれた線路の掘り出し費用
  monsoonwash: "loseProperties", // 洗い流された土手ぞいの物件
  avalanche: "teleport", // 雪崩で迂回路に回される
  railbuckle: "percentLoss", // 徐行と積み荷の傷みで目減り
  customsdelay: "skipTurn", // 全部の鞄を検められて足止め
  bazaarpickpocket: "steal", // すりに盗まれる
  powercut: "payOthers", // 立ち往生した車内で食料を分け合う

  // South America
  huayco: "loseProperties", // アンデスの土石流が線路沿いの資産を押し流す
  creciente: "percentLoss", // アマゾンの増水で商品・現金の一部が水浸しになる
  camanchaca: "skipTurn", // 太平洋岸の朝霧でバスが立ち往生し足止め
  // **既存と鍵がぶつかった。**効果が違うので統合できず、あとから入れたこちらを改名。
  "aduana-sudamericana": "steal", // 国境の税関職員が「不足した書類」を口実に金品を取る
  // **既存と鍵がぶつかった。**効果が違うので統合できず、あとから入れたこちらを改名。
  "bloqueo-sudamericano": "payOthers", // 道路封鎖の通行料・迂回の手配で周りに金を払う
  zonda: "fine", // アンデスから吹く熱風の被害で修繕費がかかる
  tunchesilba: "teleport", // エル・トゥンチェの口笛に化かされ、別の場所へ迷い込む

  // North America
  hurricane: "loseProperties",
  hielo: "percentLoss",
  cenizas: "fine",
  ventisca: "payOthers",
  "sombreron-trenza": "teleport",
  aduana: "skipTurn",
  "pickpocket-mercado": "steal",

  // Europe
  lawine: "skipTurn",
  hitzewelle: "fine",
  // **フランスの `greve`(skipTurn)と鍵がぶつかった。**この表は全盤面で1つなので、
  // 違う効果に同じ鍵は当てられない。あとから入れたこちらの名前を変えている。
  "greve-continentale": "payOthers",
  nebel: "teleport",
  herbstlaub: "percentLoss",
  waldbrand: "loseProperties",
  grenzstau: "steal",

  // Hyakumeizan
  kirimayoi: "skipTurn",       // 濃霧: 晴れるまで足止め
  rakurai: "fine",             // 雷雲: 緊急避難・装備の修理費
  kumadeai: "percentLoss",     // クマ: 慌てて後退し荷物を落とす割合ダメージ
  hachisasare: "payOthers",    // スズメバチ: 応急手当をした近くの登山者に礼を払う
  manshitsu: "steal",          // 満室: 先に着いた誰かに予約の寝床を取られる
  korogashi: "loseProperties", // 落石: 予定していた資産を手放して迂回費に充てる
  tengukakushi: "teleport",    // 天狗: 気づけば違う場所に立っている

  // Solar System
  solarflare: "fine",             // 太陽フレア: 機器修理費
  debris: "percentLoss",          // デブリ衝突: 船体の割合ダメージ
  commblackout: "skipTurn",       // 通信途絶: 手も足も出ず足止め
  gravityassistfail: "teleport",  // 重力アシスト失敗: 意図しない場所へ飛ばされる
  radiationbelt: "loseProperties",// 被曝: 治療費のため資産を手放す
  duststorm: "steal",             // 砂嵐: 電力(=稼ぎ)を奪われる
  fuelshortage: "payOthers",      // 燃料切れ: 近くの誰かに融通してもらう

  // Australia
  sunburn: "fine",
  // **インドの `cyclone`(percentLoss)と鍵がぶつかった。**この表は全盤面で
  // 1つなので、違う効果に同じ鍵は当てられない(アイテムの `intercity` と同じ形)。
  // あとから入れたこちらの名前を変えている。
  coastalcyclone: "percentLoss",
  bogged: "skipTurn",
  bushfire: "loseProperties",
  shout: "payOthers",
  huntsman: "teleport",
  magpieswoop: "steal",

  // Brazil
  "conta-atrasada": "fine",
  enchente: "percentLoss",
  "greve-onibus": "skipTurn",
  deslizamento: "loseProperties",
  "rodada-boteco": "payOthers",
  redemoinho: "teleport",
  arrastao: "steal",

  // Ukraine
  hrad: "fine",
  povin: "percentLoss",
  zamitil: "skipTurn",
  "stepova-pozhezha": "loseProperties",
  "tamada-obov-yazok": "payOthers",
  "lisovyk-stezhka": "teleport",
  "bazaar-pickpocket": "steal",

  // Venezuela
  "relampago-catatumbo": "fine",
  "derrumbe-andino": "percentLoss",
  "cola-de-transito": "skipTurn",
  "techo-inundado": "loseProperties",
  "vaca-de-cumpleanos": "payOthers",
  "silbon-enganio": "teleport",
  "carterista-mercado": "steal",

  // Canada
  "gravy-spill": "fine",
  "raccoon-cooler": "steal",
  "black-ice-fender": "percentLoss",
  "blackfly-swarm": "payOthers",
  "led-astray": "teleport",
  "drive-thru-line": "skipTurn",
  "ice-storm-outage": "loseProperties",

  // Bolivia
  offering: "fine",
  collapse: "percentLoss",
  bloqueo: "skipTurn",
  landslide: "loseProperties",
  tranca: "payOthers",
  soroche: "teleport",
  theft: "steal",
  // Japan
  typhoon: "fine",
  quake: "percentLoss",
  delay: "skipTurn",
  fire: "loseProperties",
  bottakuri: "payOthers",
  maigo: "teleport",
  suri: "steal",
  // India
  monsoonflood: "fine",
  drought: "percentLoss",
  bandh: "skipTurn",
  cyclone: "loseProperties",
  tollgate: "payOthers",
  wrongtrain: "teleport",
  chori: "steal",
  // France
  mistral: "fine",
  "vendange-ratee": "percentLoss",
  greve: "skipTurn",
  "feu-de-garrigue": "loseProperties",
  "tournee-generale": "payOthers",
  "rame-coupee": "teleport",
  "tire-laine": "steal",
  // World
  "customs-shed": "fine",
  devaluation: "percentLoss",
  quarantine: "skipTurn",
  expropriation: "loseProperties",
  "crossing-the-line": "payOthers",
  "wrong-port": "teleport",
  "shell-game": "steal",
  // Ibaraki
  kaminari: "fine",
  "mizu-ga-hikanai": "percentLoss",
  "karakkaze-doom": "skipTurn",
  "shio-ga-noboru": "loseProperties",
  "hakobi-ga-tsukanai": "payOthers",
  "ashiato-numa": "teleport",
  "hoshiba-ga-nureru": "steal",
  // Korea
  hwangsa: "fine",
  taepung: "percentLoss",
  poksol: "skipTurn",
  sanbul: "loseProperties",
  hoesikgap: "payOthers",
  "dokkaebi-gil": "teleport",
  somaechigi: "steal",

  // Turkey
  ayakkabi: "fine",
  lodos: "percentLoss",
  trafik: "skipTurn",
  camyangini: "loseProperties",
  meyhane: "payOthers",
  "karakoncolos-yolu": "teleport",
  yankesici: "steal",

  // Germany
  foehn: "fine",
  hochwasser: "percentLoss",
  stau: "skipTurn",
  sturmflut: "loseProperties",
  runde: "payOthers",
  bergnebel: "teleport",
  marktdieb: "steal",

  // China
  shachenbao: "fine",
  taifeng: "percentLoss",
  chunyun: "skipTurn",
  chaiqian: "loseProperties",
  suifenzi: "payOthers",
  "wuru-taohuayuan": "teleport",
  "miaohui-paishou": "steal",

  // UK
  "parking-warden": "fine",
  "fog-delay": "percentLoss",
  "leaves-on-line": "skipTurn",
  "fete-rained-off": "loseProperties",
  "your-round": "payOthers",
  "last-bus": "teleport",
  "queue-jumper": "steal",

  // Italy
  autovelox: "fine",
  grandinata: "percentLoss",
  sciopero: "skipTurn",
  incendio: "loseProperties",
  morra: "payOthers",
  "treno-sbagliato": "teleport",
  scippo: "steal",

  // Russia
  gibdd: "fine",
  obmennik: "percentLoss",
  ochered: "skipTurn",
  buran: "loseProperties",
  zastolye: "payOthers",
  "ne-tot-poyezd": "teleport",
  karmannik: "steal",

  // USA
  speedingticket: "fine",
  tornado: "percentLoss",
  governmentshutdown: "skipTurn",
  wildfire: "loseProperties",
  pickuptab: "payOthers",
  wrongexit: "teleport",
  threecardmonte: "steal",

  // Indonesia
  tilang: "fine",
  banjir: "percentLoss",
  macet: "skipTurn",
  kebakaran: "loseProperties",
  kalahdomino: "payOthers",
  salahnaik: "teleport",
  dicopet: "steal",

  // Morocco
  compteur: "fine",
  chergui: "percentLoss",
  souqday: "skipTurn",
  harika: "loseProperties",
  atay: "payOthers",
  grandtaxi: "teleport",
  nachal: "steal",

  // Ghana
  matecall: "teleport",
  dumsor: "percentLoss",
  harmattanhaze: "skipTurn",
  owarebet: "payOthers",
  fantasycoffin: "loseProperties",
  mudroad: "fine",
  pickpocket: "steal",

  // Bali
  "razia-polisi": "fine",
  "hama-tikus": "percentLoss",
  "menunggu-dewasa": "skipTurn",
  "abu-vulkanik": "loseProperties",
  "sumbangan-upacara": "payOthers",
  "arus-balik": "teleport",
  "monyet-mencuri": "steal",

  // Malaysia
  "denda-aes": "fine",
  "banjir-kilat": "percentLoss",
  "gangguan-ets": "skipTurn",
  "kebakaran-pasar": "loseProperties",
  "kalah-mahjong": "payOthers",
  "bas-salah": "teleport",
  ragut: "steal",
};
