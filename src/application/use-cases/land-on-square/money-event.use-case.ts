import { Money } from "../../../domain/shared-kernel/money";
import { PlayerId } from "../../../domain/shared-kernel/ids";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";
import { payUpTo, receiveCash } from "../../../domain/player/player";
import { MoneyEvent } from "../../../domain/board/money-event";

export interface MoneyEventOutcome {
  readonly session: GameSession;
  readonly event: MoneyEvent;
  /** 実際に動いた金額(常に正)。 */
  readonly amount: Money;
  readonly gained: boolean;
}

/**
 * 青マス・赤マスに止まったときの処理。
 *
 * 金額は引いた出来事(MoneyEvent)が持っている。「なぜ増えたのか/減ったのか」を
 * プレイヤーに示せるよう、結果には出来事そのものを含めて返す。
 */
export function applyMoneyEvent(
  session: GameSession,
  playerId: PlayerId,
  event: MoneyEvent,
): MoneyEventOutcome {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) throw new Error(`Unknown player: ${playerId}`);

  const gained = event.kind === "gain";
  if (gained) {
    const amount = Money.of(event.amount);
    return { session: replacePlayer(session, receiveCash(player, amount)), event, amount, gained };
  }

  // 手持ちが足りなければ払える分だけ払う(所持金は負にならない)。
  const { player: updated, paid } = payUpTo(player, Money.of(event.amount));
  return { session: replacePlayer(session, updated), event, amount: paid, gained };
}
