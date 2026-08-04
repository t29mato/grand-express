import { describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { sameForAllLocales } from "../../../domain/shared-kernel/localized-text";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { QuizQuestion } from "../../../domain/quiz/quiz-question";
import { answerQuiz } from "./answer-quiz.use-case";

const question: QuizQuestion = {
  question: sameForAllLocales("2+2?"),
  options: ["3", "4"].map(sameForAllLocales),
  correctOptionIndex: 1,
  fact: sameForAllLocales("basic arithmetic"),
};

function session(cash: number) {
  const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(cash), startingNode: NodeId("x") });
  return createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: CityId("y") });
}

describe("answerQuiz", () => {
  it("正解すると獲得額が加算される", () => {
    const result = answerQuiz(session(1000), PlayerId("p1"), question, "low", 1);
    expect(result.correct).toBe(true);
    expect(result.amount.amount).toBe(100);
    expect(result.session.players[0].cash.amount).toBe(1100);
  });

  it("不正解だと減点額が減算される", () => {
    const result = answerQuiz(session(1000), PlayerId("p1"), question, "low", 0);
    expect(result.correct).toBe(false);
    expect(result.amount.amount).toBe(30);
    expect(result.session.players[0].cash.amount).toBe(970);
  });

  it("残高不足でも払える分だけ減算される(マイナスにならない)", () => {
    const result = answerQuiz(session(10), PlayerId("p1"), question, "high", 0);
    expect(result.amount.amount).toBe(10);
    expect(result.session.players[0].cash.amount).toBe(0);
  });
});
