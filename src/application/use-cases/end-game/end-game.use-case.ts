import { Player } from "../../../domain/player/player";
import { GameSession, finish } from "../../../domain/game-session/game-session";
import { monopolyCount, netWorth, propertyCount } from "../../../domain/property/property-income-service";
import { GameEngineContext } from "../../game-engine-context";
import { economyContextFor } from "../../economy-context";
import { Award, decideAwards } from "../../../domain/game-session/awards";
import { PropertyRef } from "../../../domain/shared-kernel/ids";

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
  /**
   * 総資産以外の観点の表彰。順位を見せる前に1つずつめくることで、
   * 最後まで誰が勝ったか分からないようにする。
   */
  readonly awards: readonly Award[];
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

  // 物件がどの地方のものかは、物件の参照から都市をたどって引く。
  const awards = decideAwards(session.players, (ref) => {
    const { cityId } = PropertyRef.parse(ref);
    return context.content.cities.find((c) => c.id === cityId)?.regionId;
  });

  return { session: finish(session), ranking, winner: ranking[0], awards };
}
