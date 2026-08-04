import { RegionId } from "../../../domain/shared-kernel/ids";
import { Random } from "../../../domain/shared-kernel/random";
import { receiveCash } from "../../../domain/player/player";
import { giveRandomItem } from "../../../domain/item/give-random-item";
import {
  GameSession,
  advanceTurn as advanceTurnIndex,
  isOver,
  isQuarterlyIncomeMonth,
  seasonIndex,
  setRegionIncomeModifiers,
} from "../../../domain/game-session/game-session";
import { setResting } from "../../../domain/misfortune/misfortune-spirit";
import { applySeasonEffects } from "../../../domain/season/season-effect-applier";
import { SeasonDefinition } from "../../../domain/season/season-effect";
import { totalIncome } from "../../../domain/property/property-income-service";
import { GameEngineContext } from "../../game-engine-context";
import { economyContextFor } from "../../economy-context";

export interface QuarterlyIncomePaid {
  readonly playerId: string;
  readonly amount: number;
}

export interface AdvanceTurnResult {
  readonly session: GameSession;
  readonly monthChanged: boolean;
  readonly gameEnded: boolean;
  readonly season?: SeasonDefinition;
  readonly quarterlyIncome: readonly QuarterlyIncomePaid[];
}

/**
 * 手番を次のプレイヤーへ進める。月が変わった場合は季節イベントの適用・
 * 四半期収入の支払い・ゲーム終了判定まで行う(現行コードの `gameLoop` の
 * ターン送り部分)。
 */
export function advanceTurn(
  context: GameEngineContext,
  session: GameSession,
  random: Random,
): AdvanceTurnResult {
  const { session: advanced, newMonthStarted } = advanceTurnIndex(session);

  if (!newMonthStarted) {
    return { session: advanced, monthChanged: false, gameEnded: false, quarterlyIncome: [] };
  }

  if (isOver(advanced)) {
    return { session: advanced, monthChanged: true, gameEnded: true, quarterlyIncome: [] };
  }

  const season = context.content.seasons[seasonIndex(advanced)];
  const allItemKeys = context.content.items.map((i) => i.key);
  const seasonResult = applySeasonEffects(advanced.players, season.effects, (player) =>
    giveRandomItem(player, allItemKeys, random).player,
  );

  let current = { ...advanced, players: seasonResult.players };
  current = setRegionIncomeModifiers(current, seasonResult.regionModifiers as ReadonlyMap<RegionId, number>);
  if (seasonResult.spiritShouldRest) {
    current = { ...current, misfortune: setResting(current.misfortune) };
  }

  const quarterlyIncome: QuarterlyIncomePaid[] = [];
  if (isQuarterlyIncomeMonth(current)) {
    const economyContext = economyContextFor(context, current);
    current = {
      ...current,
      players: current.players.map((player) => {
        const income = totalIncome(player, economyContext);
        if (income.amount <= 0) return player;
        quarterlyIncome.push({ playerId: player.id, amount: income.amount });
        return receiveCash(player, income);
      }),
    };
  }

  return { session: current, monthChanged: true, gameEnded: false, season, quarterlyIncome };
}
