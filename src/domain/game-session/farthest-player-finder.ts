import { Player } from "../player/player";

/**
 * 目的地から最も遠いプレイヤーを見つける(現行コードの `farthestIdx`)。
 * 同着の場合は先に見つかったプレイヤーを優先する(`>`比較のため)。
 */
export function findFarthestPlayer(
  players: readonly Player[],
  distanceToDestination: (player: Player) => number,
): Player | null {
  let farthest: Player | null = null;
  let farthestDistance = -1;
  for (const player of players) {
    const distance = distanceToDestination(player);
    if (distance > farthestDistance) {
      farthestDistance = distance;
      farthest = player;
    }
  }
  return farthest;
}
