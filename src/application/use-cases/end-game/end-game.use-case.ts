import { Player } from "../../../domain/player/player";
import { GameSession, finish } from "../../../domain/game-session/game-session";
import { monopolyCount, netWorth, propertyCount } from "../../../domain/property/property-income-service";
import { GameEngineContext } from "../../game-engine-context";
import { economyContextFor } from "../../economy-context";

export interface PlayerResult {
  readonly player: Player;
  readonly netWorth: number;
  readonly propertyCount: number;
  readonly monopolyCount: number;
}

export interface EndGameOutcome {
  readonly session: GameSession;
  /** 総資産の多い順。 */
  readonly ranking: readonly PlayerResult[];
  readonly winner: PlayerResult;
}

/** ゲームを終了し、総資産(現金+物件評価額)で勝者を決める(現行コードの `endGame`)。 */
export function endGame(context: GameEngineContext, session: GameSession): EndGameOutcome {
  const economyContext = economyContextFor(context, session);
  const ranking = session.players
    .map((player) => ({
      player,
      netWorth: netWorth(player, economyContext).amount,
      propertyCount: propertyCount(player),
      monopolyCount: monopolyCount(player, economyContext),
    }))
    .sort((a, b) => b.netWorth - a.netWorth);

  return { session: finish(session), ranking, winner: ranking[0] };
}
