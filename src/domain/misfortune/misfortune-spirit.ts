import { PlayerId } from "../shared-kernel/ids";

/**
 * 「厄災の神」の状態機械(現行コードの `spiritHolder/spiritLevel/spiritTurns/
 * spiritRest/spiritStuck` を1つの値オブジェクトにまとめたもの)。
 *
 * - level 0: まだ誰にも憑いていない
 * - level 1: 憑いている(通常)
 * - level 2: 同じ相手に4ターン居座ると格上げされる「大厄災」モード(king)
 */
export type MisfortuneLevel = 0 | 1 | 2;

export interface MisfortuneSpiritState {
  readonly holderId: PlayerId | null;
  readonly level: MisfortuneLevel;
  readonly turnsOnCurrentHolder: number;
  readonly resting: boolean;
  /** すれ違いで押し付けた直後の猶予ターン数。0になるまで自動では移動しない。 */
  readonly stuckTurnsRemaining: number;
}

export const INITIAL_MISFORTUNE_STATE: MisfortuneSpiritState = {
  holderId: null,
  level: 0,
  turnsOnCurrentHolder: 0,
  resting: false,
  stuckTurnsRemaining: 0,
};

export function isKing(state: MisfortuneSpiritState): boolean {
  return state.level === 2;
}

/** 新しい目的地が決まった際、目的地から最も遠いプレイヤーに憑依する(現行コードの `arriveDest`)。 */
export function attachToFarthestPlayer(
  state: MisfortuneSpiritState,
  farthestPlayerId: PlayerId,
): MisfortuneSpiritState {
  return {
    ...state,
    holderId: farthestPlayerId,
    level: Math.max(state.level, 1) as MisfortuneLevel,
    turnsOnCurrentHolder: state.holderId === farthestPlayerId ? state.turnsOnCurrentHolder : 0,
    stuckTurnsRemaining: 0,
  };
}

/** 各ターンの終わりに、最も遅れているプレイヤーへ自然に移動する(現行コードの `settleSpirit`)。 */
export function settleAfterTurn(
  state: MisfortuneSpiritState,
  farthestPlayerId: PlayerId | null,
): MisfortuneSpiritState {
  if (state.level === 0) return state;
  if (state.stuckTurnsRemaining > 0) {
    return { ...state, stuckTurnsRemaining: state.stuckTurnsRemaining - 1 };
  }
  if (farthestPlayerId === null || farthestPlayerId === state.holderId) return state;
  return { ...state, holderId: farthestPlayerId, turnsOnCurrentHolder: 0 };
}

/** すれ違いによる意図的な押し付け(現行コードの `tryPassSpirit` / アイテム効果 `repel-spirit`)。 */
export function passTo(
  state: MisfortuneSpiritState,
  newHolderId: PlayerId,
  playerCount: number,
): MisfortuneSpiritState {
  return {
    ...state,
    holderId: newHolderId,
    turnsOnCurrentHolder: 0,
    stuckTurnsRemaining: playerCount,
  };
}

/** 憑依されたプレイヤーの手番で災難が発動した後、居座りターン数を進める。4ターンでking化。 */
export function recordStrike(state: MisfortuneSpiritState): MisfortuneSpiritState {
  const turns = state.turnsOnCurrentHolder + 1;
  const level: MisfortuneLevel = turns === 4 && state.level === 1 ? 2 : state.level;
  return { ...state, turnsOnCurrentHolder: turns, level };
}

export function setResting(state: MisfortuneSpiritState): MisfortuneSpiritState {
  return { ...state, resting: true };
}

/** お盆などで一度だけ発動が見送られる(現行コードの `spiritRest`)。 */
export function consumeRestIfAny(
  state: MisfortuneSpiritState,
): { state: MisfortuneSpiritState; wasResting: boolean } {
  if (!state.resting) return { state, wasResting: false };
  return { state: { ...state, resting: false }, wasResting: true };
}
