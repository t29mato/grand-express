import { describe, expect, it } from "vitest";
import { QuizQuestionId } from "../../domain/shared-kernel/ids";
import { sameForAllLocales } from "../../domain/shared-kernel/localized-text";
import { QuizQuestion } from "../../domain/quiz/quiz-question";
import { visibleOptionOrder } from "./game-store-formatters";

const question: QuizQuestion = {
  id: QuizQuestionId("q1"),
  question: sameForAllLocales("Which one?"),
  options: ["A", "B", "C"].map(sameForAllLocales),
  correctOptionIndex: 2,
  fact: sameForAllLocales("because"),
};

/**
 * 決定的な擬似乱数(mulberry32)。
 * 素朴な線形合同法は2の冪を法とすると**下位ビットの周期が極端に短く**、
 * `% 2` が常に同じ値になってしまい「位置が偏らないこと」を検証できない。
 */
function seededRandom(seed: number) {
  let state = seed + 0x6d2b79f5;
  const next = () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return { nextInt: (max: number) => Math.floor(next() * max) };
}

describe("visibleOptionOrder", () => {
  it("familiar は全ての選択肢を出す", () => {
    const order = visibleOptionOrder(question, "familiar", seededRandom(1));
    expect([...order].sort()).toEqual([0, 1, 2]);
  });

  it("local も全ての選択肢を出す", () => {
    const order = visibleOptionOrder(question, "local", seededRandom(7));
    expect([...order].sort()).toEqual([0, 1, 2]);
  });

  it("newcomer は2択に絞る", () => {
    const order = visibleOptionOrder(question, "newcomer", seededRandom(3));
    expect(order).toHaveLength(2);
  });

  it("絞ったときも正解は必ず含まれる(伏せるのは誤答だけ)", () => {
    // 乱数の巡りを変えても正解が落ちないことを確かめる。
    for (let seed = 0; seed < 50; seed++) {
      const order = visibleOptionOrder(question, "newcomer", seededRandom(seed));
      expect(order, `seed=${seed}`).toContain(question.correctOptionIndex);
      expect(new Set(order).size, `seed=${seed}`).toBe(order.length);
    }
  });

  it("正解が常に同じ位置に出ない(位置で当てられないこと)", () => {
    const positions = new Set<number>();
    for (let seed = 0; seed < 50; seed++) {
      const order = visibleOptionOrder(question, "newcomer", seededRandom(seed));
      positions.add(order.indexOf(question.correctOptionIndex));
    }
    expect(positions.size).toBeGreaterThan(1);
  });
});
