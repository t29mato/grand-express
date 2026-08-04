import { PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { Random } from "../../../domain/shared-kernel/random";
import { Player, receiveCash, removeItemAt } from "../../../domain/player/player";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";
import { passTo } from "../../../domain/misfortune/misfortune-spirit";
import { GameEngineContext } from "../../game-engine-context";
import { rollDice } from "../roll-dice/roll-dice.use-case";

export type UseItemEffectResult =
  | { readonly type: "teleport-to-destination" }
  | { readonly type: "await-exact-dice-choice" }
  | { readonly type: "rolled"; readonly steps: number; readonly rolls: readonly number[] }
  | { readonly type: "gained-cash"; readonly amount: number }
  | { readonly type: "extra-turn" }
  | { readonly type: "repelled-spirit"; readonly toPlayerId: PlayerId | null }
  | { readonly type: "no-effect" };

export interface UseItemOutcome {
  readonly session: GameSession;
  readonly result: UseItemEffectResult;
}

/** アイテムを使用する(現行コードの `humanAction` 内の `itemHandler`)。 */
export function useItem(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  itemIndex: number,
  random: Random,
): UseItemOutcome {
  const player = findPlayer(session, playerId);
  const itemKey = player.inventory[itemIndex];
  if (itemKey === undefined) {
    return { session, result: { type: "no-effect" } };
  }
  const item = context.content.items.find((i) => i.key === itemKey);
  if (!item) throw new Error(`Unknown item: ${itemKey}`);

  const playerWithoutItem = removeItemAt(player, itemIndex);
  let sessionAfterConsuming = replacePlayer(session, playerWithoutItem);

  switch (item.effect.type) {
    case "teleport-to-destination":
      return { session: sessionAfterConsuming, result: { type: "teleport-to-destination" } };

    case "choose-exact-dice":
      return { session: sessionAfterConsuming, result: { type: "await-exact-dice-choice" } };

    case "roll-fixed-dice": {
      const { rolls, total } = rollDice(random, item.effect.diceCount);
      return { session: sessionAfterConsuming, result: { type: "rolled", steps: total, rolls } };
    }

    case "gain-cash": {
      const updated = receiveCash(playerWithoutItem, Money.of(item.effect.amount));
      sessionAfterConsuming = replacePlayer(sessionAfterConsuming, updated);
      return { session: sessionAfterConsuming, result: { type: "gained-cash", amount: item.effect.amount } };
    }

    case "extra-turn": {
      const updated = { ...playerWithoutItem, hasExtraTurn: true };
      sessionAfterConsuming = replacePlayer(sessionAfterConsuming, updated);
      return { session: sessionAfterConsuming, result: { type: "extra-turn" } };
    }

    case "repel-spirit": {
      if (sessionAfterConsuming.misfortune.holderId !== playerId) {
        return { session: sessionAfterConsuming, result: { type: "repelled-spirit", toPlayerId: null } };
      }
      const nearest = findNearestOtherPlayer(context, sessionAfterConsuming, playerWithoutItem);
      if (!nearest) {
        return { session: sessionAfterConsuming, result: { type: "repelled-spirit", toPlayerId: null } };
      }
      sessionAfterConsuming = {
        ...sessionAfterConsuming,
        misfortune: passTo(sessionAfterConsuming.misfortune, nearest.id, sessionAfterConsuming.players.length),
      };
      return { session: sessionAfterConsuming, result: { type: "repelled-spirit", toPlayerId: nearest.id } };
    }

    case "none":
    default:
      return { session: sessionAfterConsuming, result: { type: "no-effect" } };
  }
}

function findPlayer(session: GameSession, playerId: PlayerId): Player {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) throw new Error(`Unknown player: ${playerId}`);
  return player;
}

/** 厄災の神を最も近い他プレイヤーへ押し付ける(現行コードの `challa`/`morishio` 効果)。 */
function findNearestOtherPlayer(
  context: GameEngineContext,
  session: GameSession,
  self: Player,
): Player | null {
  let nearest: Player | null = null;
  let nearestDistance = Infinity;
  for (const other of session.players) {
    if (other.id === self.id) continue;
    const distance = context.pathfinding.distance(self.location, other.location);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = other;
    }
  }
  return nearest;
}
