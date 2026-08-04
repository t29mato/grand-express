import { describe, expect, it } from "vitest";
import { DeterministicRandom } from "../../../../tests/fakes/deterministic-random";
import { rollDice, rollOneDie } from "./roll-dice.use-case";

describe("rollOneDie", () => {
  it("1〜6の範囲で、nextIntの結果+1を返す", () => {
    expect(rollOneDie(new DeterministicRandom([0]))).toBe(1);
    expect(rollOneDie(new DeterministicRandom([5]))).toBe(6);
  });
});

describe("rollDice", () => {
  it("指定した個数のサイコロを振り合計する", () => {
    const random = new DeterministicRandom([1, 2, 3]); // -> 2,3,4
    const result = rollDice(random, 3);
    expect(result.rolls).toEqual([2, 3, 4]);
    expect(result.total).toBe(9);
  });
});
