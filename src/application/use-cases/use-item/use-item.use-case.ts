import { NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { Random } from "../../../domain/shared-kernel/random";
import { Player, receiveCash, removeItemAt } from "../../../domain/player/player";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";
import { passTo } from "../../../domain/misfortune/misfortune-spirit";
import { GameEngineContext } from "../../game-engine-context";
import { rollDice } from "../roll-dice/roll-dice.use-case";

export type UseItemEffectResult =
  /**
   * 大きく進む。**何マス進むかは運任せ、どちらへ行くかは選べる。**
   *
   * `destinations` は「ちょうど `steps` マス先」の行き先と、そこまでの道のりの一覧で、
   * サイコロを振ったあとの候補(`reachableNodesFor`)と同じ形をしている。
   * 呼び出し側はこれをそのまま行き先の選択画面に渡す。
   *
   * ## なぜ行き先を返さず、候補を返すのか
   *
   * もとは**行き先まで抽選して**返していた(「どっちへ行くか分からない」ことを
   * このアイテムの肝と考えていた)。ところが実プレイの記録(2026-09-02)では、
   * ¥2,400,000 の飛行機のチケットを使って **11マス流され、目的地までの残りは
   * 24→23マス。1マスしか縮まらなかった。**高い買い物の結果が損に見えると、
   * 以後アイテムそのものが買われなくなる。
   *
   * **距離だけを運任せにして、向きは遊ぶ人に返す。**8〜12マスという大きな移動と
   * 「どこへ降りるか」の判断が同じ手番に来るので、値段に見合う手応えになる。
   */
  | {
      readonly type: "carried-far";
      readonly steps: number;
      readonly destinations: ReadonlyMap<NodeId, readonly NodeId[]>;
    }
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
export function applyItemUse(
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
    case "carried-far": {
      const { minSteps, maxSteps } = item.effect;
      const steps = minSteps + random.nextInt(maxSteps - minSteps + 1);
      // その距離で行ける先をすべて出して、そのまま返す。**選ぶのは遊ぶ人。**
      const destinations = context.pathfinding.reachableNodes(player.location, steps);
      if (destinations.size === 0) {
        return { session: sessionAfterConsuming, result: { type: "no-effect" } };
      }
      return { session: sessionAfterConsuming, result: { type: "carried-far", steps, destinations } };
    }

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
