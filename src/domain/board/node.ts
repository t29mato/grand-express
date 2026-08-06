import { CityId, NodeId, RegionId } from "../shared-kernel/ids";
import { EdgeKind } from "./city";

export type NodeType = "city" | "quiz" | "card";

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
 * カードマス(アイテムが手に入る)。
 *
 * かつては所持金が増える青マス・減る赤マスもあったが、**学ぶことが目的**の
 * アプリなので、運だけで金額が動くマスは廃止した。中間マスはクイズか
 * カードのどちらかになる。
 */
export interface PlainSquareNode extends BoardNodeBase {
  readonly type: "card";
  readonly between: readonly [CityId, CityId];
  /** この中間マスが乗っている路線の種類(描き分けに使う)。 */
  readonly edgeKind: EdgeKind;
}

export type BoardNode = CityNode | QuizNode | PlainSquareNode;

export function isCityNode(node: BoardNode): node is CityNode {
  return node.type === "city";
}
