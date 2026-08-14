import { CityId, NodeId, RegionId } from "../shared-kernel/ids";
import { EdgeKind } from "./city";

export type NodeType = "city" | "quiz" | "blue" | "red" | "card" | "quiet";

interface BoardNodeBase {
  readonly id: NodeId;
  readonly regionId: RegionId;
}

export interface CityNode extends BoardNodeBase {
  readonly type: "city";
  readonly cityId: CityId;
}

/**
 * クイズマス。難易度は**マスではなく問題の属性**として持つようになったため、
 * ここには段階を持たない(止まった時点でプレイヤーの知識レベルに応じて抽選する)。
 */
export interface QuizNode extends BoardNodeBase {
  readonly type: "quiz";
  readonly between: readonly [CityId, CityId];
  /** この中間マスが乗っている路線の種類(描き分けに使う)。 */
  readonly edgeKind: EdgeKind;
}

/**
 * クイズ以外の中間マス。
 *
 * - `blue` / `red` … 所持金が増える/減る。**金額はルーレットでは決まらず**、
 *   その地方で起こりそうな出来事(MoneyEvent)を引いて、その話に応じて動く。
 * - `card` … アイテムが手に入る。
 * - `quiet` … **何も起きない。**止まっても、そのまま次の人の手番になる。
 *
 * ## なぜ何も起きないマスが要るか
 *
 * **以前は中間マスの100%が何かを起こしていた**(quiz 52% / blue 27% / red 21%)。
 * つまり止まれば必ずモーダルが開き、閉じるまで盤面が見えなかった。
 * 「停止マスが多すぎてテンポが悪い」という指摘はここを指している。
 *
 * **息をつげる場所が要る。**線路の上を進んでいるという感じを出すためにも、
 * 何も起きないマスがあったほうがよい。
 */
export interface PlainSquareNode extends BoardNodeBase {
  readonly type: "blue" | "red" | "card" | "quiet";
  readonly between: readonly [CityId, CityId];
  /** この中間マスが乗っている路線の種類(描き分けに使う)。 */
  readonly edgeKind: EdgeKind;
}

export type BoardNode = CityNode | QuizNode | PlainSquareNode;

export function isCityNode(node: BoardNode): node is CityNode {
  return node.type === "city";
}
