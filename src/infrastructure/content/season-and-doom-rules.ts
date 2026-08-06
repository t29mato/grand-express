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
};

/**
 * 両国とも全く同じ7種類の災難ロジック(数値も同じ)で、`id` だけが国ごとの
 * フレーバーに応じて異なる。`id` → 効果種別の対応。
 */
export const DOOM_EFFECT_ID_BY_LEGACY_ID: Readonly<Record<string, DoomEffectId>> = {
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
};
