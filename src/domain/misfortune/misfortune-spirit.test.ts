import { describe, expect, it } from "vitest";
import { PlayerId } from "../shared-kernel/ids";
import {
  INITIAL_MISFORTUNE_STATE,
  attachToFarthestPlayer,
  consumeRestIfAny,
  isKing,
  passTo,
  recordStrike,
  setResting,
  settleAfterTurn,
} from "./misfortune-spirit";

describe("MisfortuneSpirit state machine", () => {
  it("初期状態ではlevel 0で誰にも憑いていない", () => {
    expect(INITIAL_MISFORTUNE_STATE.level).toBe(0);
    expect(INITIAL_MISFORTUNE_STATE.holderId).toBeNull();
  });

  it("新しい目的地が決まると最も遅れているプレイヤーに憑依しlevel 1になる", () => {
    const state = attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1"));
    expect(state.holderId).toBe("p1");
    expect(state.level).toBe(1);
  });

  it("4ターン居座るとking(level 2)になる", () => {
    let state = attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1"));
    state = recordStrike(state);
    state = recordStrike(state);
    state = recordStrike(state);
    expect(isKing(state)).toBe(false);
    state = recordStrike(state);
    expect(state.turnsOnCurrentHolder).toBe(4);
    expect(isKing(state)).toBe(true);
  });

  it("ターン終了時、最も遅れているプレイヤーへ自然に移動する", () => {
    const state = attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1"));
    const settled = settleAfterTurn(state, PlayerId("p2"));
    expect(settled.holderId).toBe("p2");
    expect(settled.turnsOnCurrentHolder).toBe(0);
  });

  it("すれ違いで押し付けた直後は猶予ターンの間、自動では移動しない", () => {
    let state = attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1"));
    state = passTo(state, PlayerId("p2"), 3);
    expect(state.stuckTurnsRemaining).toBe(3);
    // 猶予中はfarthestPlayerIdがp1でも移動しない
    state = settleAfterTurn(state, PlayerId("p1"));
    expect(state.holderId).toBe("p2");
    expect(state.stuckTurnsRemaining).toBe(2);
  });

  it("restingがtrueの間は1回だけ発動が見送られる", () => {
    const state = setResting(attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")));
    const first = consumeRestIfAny(state);
    expect(first.wasResting).toBe(true);
    expect(first.state.resting).toBe(false);
    const second = consumeRestIfAny(first.state);
    expect(second.wasResting).toBe(false);
  });
});
