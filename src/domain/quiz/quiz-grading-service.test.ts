import { describe, expect, it } from "vitest";
import { QuizQuestionId } from "../shared-kernel/ids";
import { sameForAllLocales } from "../shared-kernel/localized-text";
import { QuizQuestion } from "./quiz-question";
import { gradeAnswer } from "./quiz-grading-service";

const sample: QuizQuestion = {
  id: QuizQuestionId("q-test"),
  difficulty: 1,
  question: sameForAllLocales("1+1=?"),
  options: ["1", "2", "3"].map(sameForAllLocales),
  correctOptionIndex: 1,
  fact: sameForAllLocales("basic arithmetic"),
};

describe("gradeAnswer", () => {
  it.each([
    [1, 100, 30],
    [5, 220, 82],
    [10, 370, 147],
  ] as const)("難易度%i: 正解で+%i、不正解で-%iが基準額になる", (difficulty, win, lose) => {
    const question = { ...sample, difficulty };
    expect(gradeAnswer(question, 1)).toEqual({ correct: true, amount: expect.objectContaining({ amount: win }) });
    expect(gradeAnswer(question, 0)).toEqual({ correct: false, amount: expect.objectContaining({ amount: lose }) });
  });

  it("知識レベルで増減額に倍率がかかる(判定そのものは変わらない)", () => {
    const question = { ...sample, difficulty: 1 } as const;
    expect(gradeAnswer(question, 1, "newcomer").amount.amount).toBe(150);
    expect(gradeAnswer(question, 1, "local").amount.amount).toBe(75);
    expect(gradeAnswer(question, 0, "newcomer").correct).toBe(false);
  });
});
