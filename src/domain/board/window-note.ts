import { CityId, RegionId } from "../shared-kernel/ids";
import { BoardNode, isCityNode } from "./node";

/**
 * 何も起きないマスに止まったときに出す、**車窓の一言**の材料。
 *
 * ## なぜ要るか
 *
 * 実プレイの記録(2026-09-02)では、9手番のうち4回が無印マスで、
 * 駒が動いたあとは無音・無反応のままCPUの手番に切り替わった。
 * 「息をつげる間」は v0.45.0 で意図して作ったものだが、
 * **返事が無いと、操作が受理されたのか分からない。**
 *
 * ここで返すのは**出来事ではなく返事**なので、金額も判断も伴わない。
 *
 * ## 新しい文章を書かない
 *
 * 一言に使うのは**すでにあるもの**だけ——その中間マスが結んでいる2つの町の名前と、
 * 乗っている地方の名前。どちらも国パックに入っている。
 * ここで新しいコンテンツを書き始めると、国が増えるたびに書く量が増える。
 */
export type WindowNote =
  /** 2つの町のあいだを走っている(中間マス)。 */
  | { readonly kind: "between"; readonly regionId: RegionId; readonly from: CityId; readonly to: CityId }
  /** 町のマスなど、結んでいる先が分からないとき。地方名だけを言う。 */
  | { readonly kind: "region"; readonly regionId: RegionId };

export function windowNoteFor(node: BoardNode): WindowNote {
  if (isCityNode(node)) return { kind: "region", regionId: node.regionId };
  return { kind: "between", regionId: node.regionId, from: node.between[0], to: node.between[1] };
}
