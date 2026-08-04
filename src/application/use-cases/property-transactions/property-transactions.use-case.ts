import { CityId, PlayerId, PropertyIndex, PropertyRef } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { Result } from "../../../domain/shared-kernel/result";
import {
  MAX_PROPERTY_LEVEL,
  Player,
  acquireProperty,
  ownsProperty,
  sellProperty,
  upgradeProperty,
} from "../../../domain/player/player";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";
import { monopolyCount, sellValueOf, upgradeCost } from "../../../domain/property/property-income-service";
import { GameEngineContext } from "../../game-engine-context";
import { economyContextFor } from "../../economy-context";

export type PropertyTransactionError =
  | "unknown-player"
  | "already-owned"
  | "not-owned"
  | "insufficient-cash"
  | "max-level";

export interface BuyPropertyOutcome {
  readonly session: GameSession;
  readonly ref: PropertyRef;
  readonly monopolyAchieved: boolean;
}

/** 物件を購入する(現行コードの `cityStop` の `data-buy` ハンドラ)。 */
export function buyProperty(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  cityId: CityId,
  index: PropertyIndex,
): Result<BuyPropertyOutcome, PropertyTransactionError> {
  const player = findPlayer(session, playerId);
  if (!player) return Result.err("unknown-player");

  const ref = PropertyRef.of(cityId, index);
  if (isOwnedByAnyone(session, ref)) return Result.err("already-owned");

  const property = context.getCity(cityId).properties[index];
  const cost = Money.of(property.cost);
  if (player.cash.isLessThan(cost)) return Result.err("insufficient-cash");

  const updatedPlayer = acquireProperty(player, ref, cost);
  const session2 = replacePlayer(session, updatedPlayer);
  const monopolyAchieved = monopolyCount(updatedPlayer, economyContextFor(context, session2)) > 0
    && context.getCity(cityId).properties.every((_, i) => ownsProperty(updatedPlayer, PropertyRef.of(cityId, PropertyIndex(i))));

  return Result.ok({ session: session2, ref, monopolyAchieved });
}

export interface InvestPropertyOutcome {
  readonly session: GameSession;
  readonly ref: PropertyRef;
  readonly newLevel: number;
}

/** 物件に増資する(現行コードの `data-up` ハンドラ)。 */
export function investInProperty(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  ref: PropertyRef,
): Result<InvestPropertyOutcome, PropertyTransactionError> {
  const player = findPlayer(session, playerId);
  if (!player) return Result.err("unknown-player");
  if (!ownsProperty(player, ref)) return Result.err("not-owned");

  const level = player.portfolio.get(ref)!;
  if (level >= MAX_PROPERTY_LEVEL) return Result.err("max-level");

  const { cityId, index } = PropertyRef.parse(ref);
  const property = context.getCity(cityId).properties[index];
  const cost = Money.of(upgradeCost(property.cost, level));
  if (player.cash.isLessThan(cost)) return Result.err("insufficient-cash");

  const newLevel = (level + 1) as typeof level;
  const updatedPlayer = upgradeProperty(player, ref, cost, newLevel);
  return Result.ok({ session: replacePlayer(session, updatedPlayer), ref, newLevel });
}

export interface SellPropertyOutcome {
  readonly session: GameSession;
  readonly ref: PropertyRef;
  readonly proceeds: Money;
}

/** 物件を売却する(現行コードの `data-sell` ハンドラ)。 */
export function sellPropertyUseCase(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  ref: PropertyRef,
): Result<SellPropertyOutcome, PropertyTransactionError> {
  const player = findPlayer(session, playerId);
  if (!player) return Result.err("unknown-player");
  if (!ownsProperty(player, ref)) return Result.err("not-owned");

  const level = player.portfolio.get(ref)!;
  const { cityId, index } = PropertyRef.parse(ref);
  const property = context.getCity(cityId).properties[index];
  const proceeds = Money.of(sellValueOf(property.cost, level));

  const updatedPlayer = sellProperty(player, ref, proceeds);
  return Result.ok({ session: replacePlayer(session, updatedPlayer), ref, proceeds });
}

function findPlayer(session: GameSession, playerId: PlayerId): Player | undefined {
  return session.players.find((p) => p.id === playerId);
}

function isOwnedByAnyone(session: GameSession, ref: PropertyRef): boolean {
  return session.players.some((p) => ownsProperty(p, ref));
}
