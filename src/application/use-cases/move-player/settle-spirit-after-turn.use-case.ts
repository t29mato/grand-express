import { GameSession } from "../../../domain/game-session/game-session";
import { findFarthestPlayer } from "../../../domain/game-session/farthest-player-finder";
import { settleAfterTurn } from "../../../domain/misfortune/misfortune-spirit";
import { GameEngineContext } from "../../game-engine-context";

/**
 * 手番の終わりに、厄災の神が自然に最も遅れているプレイヤーへ移動する
 * (現行コードの `settleSpirit`)。
 */
export function settleSpiritAfterTurn(context: GameEngineContext, session: GameSession): GameSession {
  if (session.misfortune.level === 0) return session;
  const farthest = findFarthestPlayer(session.players, (p) =>
    context.distanceToCity(p.location, session.destination),
  );
  return {
    ...session,
    misfortune: settleAfterTurn(session.misfortune, farthest?.id ?? null),
  };
}
