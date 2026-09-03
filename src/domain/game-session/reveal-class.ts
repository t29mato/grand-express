/**
 * 出来事を「どう見せるか」の階級。
 *
 * ## なぜ表にするのか
 *
 * 実プレイの記録(2026-09-02、日本盤面)で、9手番のうち3件の重大な出来事を
 * 遊んでいる人が**あとから旅の記録を読んで初めて知った**。
 * CPU 1 の目的地到達(+¥9,100,000)、目的地の山形→小樽への変更、
 * 厄災の神が自分に憑いたこと——どれも盤面全体がひっくり返る話なのに、
 * CPU の手番だったというだけで画面には何も出なかった。
 * 一方で、CPU の青森での物件購入は「次へ」を押すモーダルで出た。
 *
 * **止まるものと流れるものの基準が、遊ぶ側から見えなかった。**
 * 基準を頭の中やコードの分岐に散らすと、また同じことが起きる。
 * ここに1枚の表として置き、**CPUループと人間の着地処理の両方がこの表だけを見る。**
 *
 * ## 3階級
 *
 * - `headline` … 盤面全体の見せ場。**誰の手番でも全画面で止めて見せる。**
 * - `personal` … その人だけの出来事。本人なら止め、他人なら短い自動送りカード。
 * - `silent`   … 止めない。返事(音と小さな動き)だけ返す。
 */
export type RevealClass = "headline" | "personal" | "silent";

/**
 * 見せかたを決めたい出来事の種類。
 *
 * ## 厄災の神の移動を2つに分けている理由
 *
 * 「厄災の神の移動」をひとまとめに `headline` にすると、**毎手番全画面が出る。**
 * `settleSpiritAfterTurn` は手番の終わりに毎回走り、目的地からいちばん遠い人へ
 * 神を移すからで、3人で遊べば移動はごく普通に起きる。
 *
 * そこで、**憑く理由がその瞬間に生まれるもの**だけを見せ場にした。
 *
 * - `spirit-attached` … 新しい目的地が決まって最遠の人に憑く / すれ違いや
 *   アイテムで押し付けられる。**誰かの行動の結果**なので見せ場。
 * - `spirit-drifted`  … 手番の終わりの自然な移動。本人には知らせるが、
 *   他人同士のあいだで動いたぶんは流す。
 */
export type RevealEventKind =
  /**
   * 目的地に着いた瞬間の、全画面の演出(`arrival-fanfare.tsx`)。
   *
   * `destination-arrival`(着いた先の町のカード)と**別に持つ。**
   * 到達はこの遊びの最大の見せ場なので、町の買い物の画面へ入る前に
   * 「着いた」ことだけを1枚で見せる。順番は
   * 到達の演出 →(町のモーダル)→ 次の区間の案内。
   */
  | "arrival-fanfare"
  /** 目的地に着いた(賞金が入る)。 */
  | "destination-arrival"
  /** 次の目的地が発表された。 */
  | "new-destination"
  /** 厄災の神が、目的地の抽選・すれ違い・アイテムで憑いた。 */
  | "spirit-attached"
  /** 厄災の神が、手番の終わりに最遠の人へ自然に移った。 */
  | "spirit-drifted"
  /** 町の物件を全部そろえた(独占)。 */
  | "monopoly"
  /** 四半期の決算。 */
  | "settlement"
  /** 青マス・赤マスの出来事。 */
  | "money-event"
  /** 厄災の神の災難。 */
  | "doom"
  /** クイズ。 */
  | "quiz"
  /** 町での購入・増資・買い物。 */
  | "purchase"
  /** カードマスでアイテムを拾った。 */
  | "card"
  /** 何も起きないマス。 */
  | "quiet";

export const REVEAL_CLASS: Readonly<Record<RevealEventKind, RevealClass>> = {
  "arrival-fanfare": "headline",
  "destination-arrival": "headline",
  "new-destination": "headline",
  "spirit-attached": "headline",
  monopoly: "headline",
  settlement: "headline",
  "spirit-drifted": "personal",
  "money-event": "personal",
  doom: "personal",
  quiz: "personal",
  purchase: "personal",
  card: "personal",
  quiet: "silent",
};

export function revealClassFor(kind: RevealEventKind): RevealClass {
  return REVEAL_CLASS[kind];
}

/**
 * 実際の見せかた。
 *
 * - `hold` … 全画面で止める(押すまで、または長めの間だけ)
 * - `auto` … 短い自動送りカード
 * - `none` … 画面には出さない
 */
export type RevealMode = "hold" | "auto" | "none";

/**
 * その出来事を、いま画面の前にいる人にどう見せるか。
 *
 * `isOwnTurn` は「その出来事が、画面の前の人自身に起きたか」。
 * CPU の手番で起きた CPU の出来事なら false になる。
 */
export function revealModeFor(kind: RevealEventKind, options: { isOwnTurn: boolean }): RevealMode {
  switch (revealClassFor(kind)) {
    case "headline":
      return "hold";
    case "personal":
      return options.isOwnTurn ? "hold" : "auto";
    case "silent":
      return "none";
  }
}
