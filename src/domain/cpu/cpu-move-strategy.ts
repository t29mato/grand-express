import { NodeId, PropertyIndex } from "../shared-kernel/ids";
import { Random } from "../shared-kernel/random";
import { BoardNode, isCityNode } from "../board/node";
import { PathfindingService } from "../board/pathfinding-service";
import { City } from "../board/city";
import { CpuTuning } from "./cpu-level";

export interface CpuMoveDecisionContext {
  readonly destination: NodeId;
  readonly pathfinding: PathfindingService;
  readonly getNode: (id: NodeId) => BoardNode;
  readonly getCity: (id: string) => City;
  readonly isPropertyOwned: (cityId: string, index: PropertyIndex) => boolean;
  readonly ownedCountInCity: (cityId: string) => number;
  readonly cash: number;
}

/**
 * 到達可能なマスの中からCPUが移動先を選ぶ(現行コードの `cpuPick`)。
 * 目的地に近いほど・買えそうな都市ほど高スコア、乱数のノイズも加える。
 */
export function chooseMoveTarget(
  reachable: ReadonlyMap<NodeId, readonly NodeId[]>,
  tuning: CpuTuning,
  context: CpuMoveDecisionContext,
  random: Random,
): readonly NodeId[] {
  let best: readonly NodeId[] | null = null;
  let bestScore = -Infinity;

  for (const [nodeId, path] of reachable) {
    let score = -context.pathfinding.distance(nodeId, context.destination) * 10;
    if (nodeId === context.destination) score += 280;

    const node = context.getNode(nodeId);
    if (isCityNode(node)) {
      const city = context.getCity(node.cityId);
      const hasFreeProperty = city.properties.some(
        (_, i) => !context.isPropertyOwned(node.cityId, PropertyIndex(i)),
      );
      const ownedHere = context.ownedCountInCity(node.cityId);
      if (hasFreeProperty && context.cash >= city.properties[0].cost) {
        score += 14 + ownedHere * 12;
      }
    } else if (node.type === "quiz" && node.tier === "high" && context.cash > 300) {
      score += 4;
    }

    score += random.nextFloat() * (4 + tuning.scoreNoise);

    if (score > bestScore) {
      bestScore = score;
      best = path;
    }
  }

  if (!best) {
    throw new Error("No reachable node to choose from");
  }
  return best;
}
