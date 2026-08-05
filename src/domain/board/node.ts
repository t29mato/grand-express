import { CityId, NodeId, RegionId } from "../shared-kernel/ids";

export type NodeType = "city" | "quiz" | "blue" | "red" | "card";

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
}

export interface PlainSquareNode extends BoardNodeBase {
  readonly type: "blue" | "red" | "card";
  readonly between: readonly [CityId, CityId];
}

export type BoardNode = CityNode | QuizNode | PlainSquareNode;

export function isCityNode(node: BoardNode): node is CityNode {
  return node.type === "city";
}
