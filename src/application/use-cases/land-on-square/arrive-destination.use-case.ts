import { PlayerId } from "../../../domain/shared-kernel/ids";
import { Random } from "../../../domain/shared-kernel/random";
import { receiveCash } from "../../../domain/player/player";
import { GameSession, destinationPrize, replacePlayer, setDestination } from "../../../domain/game-session/game-session";
import { selectNewDestination } from "../../../domain/game-session/destination-selection-service";
import { findFarthestPlayer } from "../../../domain/game-session/farthest-player-finder";
import { attachToFarthestPlayer } from "../../../domain/misfortune/misfortune-spirit";
import { GameEngineContext } from "../../game-engine-context";

export interface ArriveDestinationOutcome {
  readonly session: GameSession;
  readonly prize: number;
  readonly firstTimeSpiritAppearance: boolean;
  readonly spiritHolderId: PlayerId | null;
}

/**
 * 目的地に到着する(現行コードの `arriveDest`)。賞金を受け取り、新しい目的地を
 * 抽選し、厄災の神を(新しい目的地から見て)最も遠いプレイヤーへ憑依させる。
 *
 * 到着した町での物件購入(`cityStop`)は本ユースケースの範囲外
 * (property-transactions / cpu-take-turn 側で別途呼び出す)。
 */
export function arriveAtDestination(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  random: Random,
): ArriveDestinationOutcome {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) throw new Error(`Unknown player: ${playerId}`);

  const prize = destinationPrize(session);
  let current = replacePlayer(session, receiveCash(player, prize));

  const oldDestination = current.destination;
  const allCityIds = context.content.cities.map((c) => c.id);
  const newDestination = selectNewDestination(
    allCityIds,
    oldDestination,
    current.players.map((p) => p.location),
    (from, to) => context.distanceToCity(from, to),
    random,
  );
  current = setDestination(current, newDestination);

  const firstTimeSpiritAppearance = current.misfortune.level === 0;
  const farthest = findFarthestPlayer(current.players, (p) => context.distanceToCity(p.location, newDestination));
  if (farthest) {
    current = { ...current, misfortune: attachToFarthestPlayer(current.misfortune, farthest.id) };
  }

  return {
    session: current,
    prize: prize.amount,
    firstTimeSpiritAppearance,
    spiritHolderId: current.misfortune.holderId,
  };
}
