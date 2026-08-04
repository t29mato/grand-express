import { describe, expect, it } from "vitest";
import { sameForAllLocales } from "../shared-kernel/localized-text";
import { QuizQuestion } from "./quiz-question";
import { QuizDeck, gradeAnswer } from "./quiz-grading-service";

const sample: QuizQuestion = {
  question: sameForAllLocales("1+1=?"),
  options: ["1", "2", "3"].map(sameForAllLocales),
  correctOptionIndex: 1,
  fact: sameForAllLocales("basic arithmetic"),
};

describe("gradeAnswer", () => {
  it.each([
    ["low", 100, 30],
    ["mid", 190, 65],
    ["high", 320, 140],
  ] as const)("%sティア: 正解で+%i、不正解で%iが基準額になる", (tier, win, lose) => {
    expect(gradeAnswer(sample, tier, 1)).toEqual({ correct: true, amount: expect.objectContaining({ amount: win }) });
    expect(gradeAnswer(sample, tier, 0)).toEqual({ correct: false, amount: expect.objectContaining({ amount: lose }) });
  });
});

describe("QuizDeck", () => {
  it("問題を使い切ったら再シャッフルして再構築する", () => {
    const questions = [
      sample,
      { ...sample, question: sameForAllLocales("q2") },
      { ...sample, question: sameForAllLocales("q3") },
    ];
    const deck = new QuizDeck(questions, (items) => [...items]);
    const drawn = [deck.draw(), deck.draw(), deck.draw()];
    expect(drawn.map((q) => q.question.en).sort()).toEqual(["1+1=?", "q2", "q3"]);
    // 4回目は再シャッフルされた新しい山から引ける
    expect(() => deck.draw()).not.toThrow();
  });

  it("問題が1つもない場合はエラーになる", () => {
    const deck = new QuizDeck([], (items) => [...items]);
    expect(() => deck.draw()).toThrow();
  });
});
