import { CityId, NodeId } from "../shared-kernel/ids";
import { Random } from "../shared-kernel/random";

/**
 * 新しい目的地を選ぶ(現行コードの `pickDest`)。全プレイヤーから距離8以上
 * 離れた都市を優先し、なければ現在地以外のどの都市でもよい。
 */
export function selectNewDestination(
  allCityIds: readonly CityId[],
  currentCityId: CityId,
  playerNodes: readonly NodeId[],
  distance: (from: NodeId, to: CityId) => number,
  random: Random,
): CityId {
  const candidates = allCityIds.filter((id) => id !== currentCityId);
  const farEnough = candidates.filter((id) =>
    playerNodes.every((node) => distance(node, id) >= 8),
  );
  const pool = farEnough.length ? farEnough : candidates;
  return pool[random.nextInt(pool.length)];
}
