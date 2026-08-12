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
};
