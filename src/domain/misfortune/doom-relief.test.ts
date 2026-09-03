import { describe, expect, it } from "vitest";
import { FIRST_YEAR_DOOM_LIMIT, DoomReliefInput, shouldSpareFromDoom } from "./doom-relief";

const base: DoomReliefInput = {
  knowledgeLevel: "newcomer",
  isCpu: false,
  month: 0,
  turnsOnCurrentHolder: 0,
};

describe("はじめての人への厄災の救済", () => {
  it("2回目までは、そのまま災難が起きる", () => {
    for (let turns = 0; turns < FIRST_YEAR_DOOM_LIMIT; turns++) {
      expect(shouldSpareFromDoom({ ...base, turnsOnCurrentHolder: turns }), `${turns}回目`).toBe(false);
    }
  });

  it("3回目からは見送る(連続で殴られ続けない)", () => {
    expect(shouldSpareFromDoom({ ...base, turnsOnCurrentHolder: FIRST_YEAR_DOOM_LIMIT })).toBe(true);
    expect(shouldSpareFromDoom({ ...base, turnsOnCurrentHolder: 5 })).toBe(true);
  });

  it("神が別の人へ移れば数えは0に戻るので、また2回まで受ける", () => {
    // `turnsOnCurrentHolder` は移動で0に戻る値(misfortune-spirit.ts)。
    expect(shouldSpareFromDoom({ ...base, turnsOnCurrentHolder: 0 })).toBe(false);
  });

  it("「すこし知っている」以上の人にはかけない", () => {
    for (const level of ["familiar", "knowledgeable", "local"] as const) {
      expect(
        shouldSpareFromDoom({ ...base, knowledgeLevel: level, turnsOnCurrentHolder: 4 }),
        level,
      ).toBe(false);
    }
  });

  it("2年目からはかけない", () => {
    expect(shouldSpareFromDoom({ ...base, month: 12, turnsOnCurrentHolder: 4 })).toBe(false);
    expect(shouldSpareFromDoom({ ...base, month: 11, turnsOnCurrentHolder: 4 })).toBe(true);
  });

  it("CPUにはかけない(手加減はCPUの強さで表す軸なので)", () => {
    expect(shouldSpareFromDoom({ ...base, isCpu: true, turnsOnCurrentHolder: 4 })).toBe(false);
  });
});
