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
import { monopolyCount, propertyCount, totalIncome } from "../../../domain/property/property-income-service";
import { GameEngineContext } from "../../game-engine-context";
import { economyContextFor } from "../../economy-context";

export interface QuarterlyIncomePaid {
  readonly playerId: string;
  readonly amount: number;
}

/**
 * 四半期の決算の1行。**受け取りが0の人も含めて全員ぶん**返す。
 *
 * 実プレイの記録(2026-09-02)で、CPUの所持金が ¥12,000,000 → ¥15,000,000 と
 * 増えたのに、その場では何も説明が出なかった。正体は3ヶ月ごとの物件収入で、
 * 旅の記録には1人1行ずつ流れていたが、遊んでいる最中には目に入らない。
 *
 * **1枚のカードで全員を並べると、誰が伸びているかが分かる見せ場になる。**
 * そのために、支払いのあった人だけを集めた `quarterlyIncome` とは別に、
 * 全員ぶんの内訳をここで返す。
 */
export interface QuarterlySettlementRow {
  readonly playerId: string;
  /** その回に受け取った物件収入。持っていなければ0。 */
  readonly amount: number;
  /** 持っている物件の数。 */
  readonly properties: number;
  /** 独占している町の数(その町の収入は2倍になる)。 */
  readonly monopolies: number;
}

export interface AdvanceTurnResult {
  readonly session: GameSession;
  readonly monthChanged: boolean;
  readonly gameEnded: boolean;
  readonly season?: SeasonDefinition;
  readonly quarterlyIncome: readonly QuarterlyIncomePaid[];
  /** 四半期の決算だった月のみ、全員ぶんの内訳。それ以外の月は空。 */
  readonly quarterlySettlement: readonly QuarterlySettlementRow[];
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
    return { session: advanced, monthChanged: false, gameEnded: false, quarterlyIncome: [], quarterlySettlement: [] };
  }

  if (isOver(advanced)) {
    return { session: advanced, monthChanged: true, gameEnded: true, quarterlyIncome: [], quarterlySettlement: [] };
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
  const quarterlySettlement: QuarterlySettlementRow[] = [];
  if (isQuarterlyIncomeMonth(current)) {
    const economyContext = economyContextFor(context, current);
    current = {
      ...current,
      players: current.players.map((player) => {
        const income = totalIncome(player, economyContext);
        // 決算のカードには**全員を並べる。**0の人を落とすと、
        // 「自分だけ増えていない」ことに気づけない。
        quarterlySettlement.push({
          playerId: player.id,
          amount: income.amount,
          properties: propertyCount(player),
          monopolies: monopolyCount(player, economyContext),
        });
        if (income.amount <= 0) return player;
        quarterlyIncome.push({ playerId: player.id, amount: income.amount });
        return receiveCash(player, income);
      }),
    };
  }

  return { session: current, monthChanged: true, gameEnded: false, season, quarterlyIncome, quarterlySettlement };
}
