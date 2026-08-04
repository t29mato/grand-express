import { PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { Random } from "../../../domain/shared-kernel/random";
import { payUpTo, receiveCash } from "../../../domain/player/player";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";

const BLUE_BASE_VALUES = [100, 180, 260, 360, 520, 760, 1100];
const RED_BASE_VALUES = [80, 140, 220, 320, 460, 680];

/** 月が進むほど金額が大きくなる(現行コードの `scaleAmt`)。 */
function scaleAmount(base: number, month: number): number {
  return Math.round((base * (1 + month * 0.06)) / 10) * 10;
}

export interface MoneySquareOutcome {
  readonly session: GameSession;
  readonly gained: boolean;
  readonly amount: number;
}

/** 青(収入)/赤(支出)マス(現行コードの `moneySquare`)。 */
export function landOnMoneySquare(
  session: GameSession,
  playerId: PlayerId,
  isBlue: boolean,
  random: Random,
): MoneySquareOutcome {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) throw new Error(`Unknown player: ${playerId}`);

  const baseValues = isBlue ? BLUE_BASE_VALUES : RED_BASE_VALUES;
  const values = baseValues.map((v) => scaleAmount(v, session.month));
  const picked = values[random.nextInt(values.length)];

  if (isBlue) {
    const updated = receiveCash(player, Money.of(picked));
    return { session: replacePlayer(session, updated), gained: true, amount: picked };
  }
  const { player: updated, paid } = payUpTo(player, Money.of(picked));
  return { session: replacePlayer(session, updated), gained: false, amount: paid.amount };
}
