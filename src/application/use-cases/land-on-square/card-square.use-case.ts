import { ItemKey, PlayerId } from "../../../domain/shared-kernel/ids";
import { Random } from "../../../domain/shared-kernel/random";
import { giveRandomItem } from "../../../domain/item/give-random-item";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../game-engine-context";

export interface CardSquareOutcome {
  readonly session: GameSession;
  readonly itemKey: ItemKey | null;
}

/** カード(黄色)マス。ランダムなアイテムを1つ拾う(現行コードの `cardSquare`)。 */
export function landOnCardSquare(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  random: Random,
): CardSquareOutcome {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) throw new Error(`Unknown player: ${playerId}`);

  const allKeys = context.content.items.map((i) => i.key);
  const { player: updated, itemKey } = giveRandomItem(player, allKeys, random);
  return { session: replacePlayer(session, updated), itemKey };
}
