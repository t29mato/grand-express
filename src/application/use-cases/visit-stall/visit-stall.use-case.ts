import { CityId, ItemKey, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { Result } from "../../../domain/shared-kernel/result";
import { addItem, canAddItem } from "../../../domain/player/player";
import { shopStock } from "../../../domain/item/shop-stock-service";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../game-engine-context";

export type VisitStallError = "unknown-player" | "bag-full" | "insufficient-cash" | "not-in-stock";

/** その町の今日の屋台の品揃え(現行コードの `shopStock` の呼び出し口)。 */
export function stallStockFor(context: GameEngineContext, cityId: CityId, month: number): readonly ItemKey[] {
  return shopStock(cityId, month, context.content.items.map((i) => i.key));
}

/** 屋台でアイテムを購入する(現行コードの `data-shop` ハンドラ)。 */
export function buyStallItem(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  cityId: CityId,
  itemKey: ItemKey,
): Result<GameSession, VisitStallError> {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) return Result.err("unknown-player");

  const stock = stallStockFor(context, cityId, session.month);
  if (!stock.includes(itemKey)) return Result.err("not-in-stock");
  if (!canAddItem(player)) return Result.err("bag-full");

  const item = context.content.items.find((i) => i.key === itemKey)!;
  const price = Money.of(item.price);
  if (player.cash.isLessThan(price)) return Result.err("insufficient-cash");

  const updated = addItem({ ...player, cash: player.cash.subtract(price) }, itemKey);
  return Result.ok(replacePlayer(session, updated));
}
