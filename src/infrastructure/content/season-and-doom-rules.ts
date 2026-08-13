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
