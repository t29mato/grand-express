import { describe, expect, it } from "vitest";
import { CountryId, GameSessionId, ItemKey, PlayerId, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { sameForAllLocales } from "../../../domain/shared-kernel/localized-text";
import { createGameSession } from "../../../domain/game-session/game-session";
import { addItem, createPlayer } from "../../../domain/player/player";
import { QuizQuestion } from "../../../domain/quiz/quiz-question";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { createGameEngineContext } from "../../game-engine-context";
import { FixedRandom } from "../../../../tests/fakes/deterministic-random";
import { answerQuiz } from "./answer-quiz.use-case";

const question: QuizQuestion = {
  question: sameForAllLocales("2+2?"),
  options: ["3", "4"].map(sameForAllLocales),
  correctOptionIndex: 1,
  fact: sameForAllLocales("basic arithmetic"),
};

describe("answerQuiz (実データ: ボリビア)", () => {
  const repo = new JsonCountryContentRepository();
  const context = createGameEngineContext(repo.load(CountryId("bolivia")));
  const startCity = context.content.startCityId;

  function session(cash: number, isCpu = false) {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu, startingCash: Money.of(cash), startingNode: cityIdToNodeId(startCity) });
    return createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: startCity });
  }

  it("正解すると獲得額が加算される(ボーナス確率に外れた場合)", () => {
    const result = answerQuiz(context, session(1000), PlayerId("p1"), question, "low", 1, new FixedRandom(0, 0.99));
    expect(result.correct).toBe(true);
    expect(result.amount.amount).toBe(100);
    expect(result.session.players[0].cash.amount).toBe(1100);
    expect(result.bonusItem).toBeNull();
  });

  it("不正解だと減点額が減算される", () => {
    const result = answerQuiz(context, session(1000), PlayerId("p1"), question, "low", 0, new FixedRandom(0, 0.99));
    expect(result.correct).toBe(false);
    expect(result.amount.amount).toBe(30);
    expect(result.session.players[0].cash.amount).toBe(970);
  });

  it("お守り(pacha)を持つ人間プレイヤーは不正解が正解に変わる", () => {
    let s = session(1000);
    s = { ...s, players: s.players.map((p) => addItem(p, ItemKey("pacha"))) };
    const result = answerQuiz(context, s, PlayerId("p1"), question, "low", 0, new FixedRandom(0, 0.99));
    expect(result.correct).toBe(true);
    expect(result.savedByCharm).toBe(true);
    expect(result.session.players[0].inventory).not.toContain("pacha");
    expect(result.session.players[0].cash.amount).toBe(1100); // お守りセーブ時も正解と同じ賞金がもらえる
  });

  it("CPUはお守りを持っていても自動セーブされない(現行コードの仕様)", () => {
    let s = session(1000, true);
    s = { ...s, players: s.players.map((p) => addItem(p, ItemKey("pacha"))) };
    const result = answerQuiz(context, s, PlayerId("p1"), question, "low", 0, new FixedRandom(0, 0.99));
    expect(result.correct).toBe(false);
    expect(result.savedByCharm).toBe(false);
  });

  it("正解時に低確率でボーナスアイテムを獲得する", () => {
    const result = answerQuiz(context, session(1000), PlayerId("p1"), question, "low", 1, new FixedRandom(0, 0.01));
    expect(result.correct).toBe(true);
    expect(result.bonusItem).not.toBeNull();
    expect(result.session.players[0].inventory).toContain(result.bonusItem);
  });

  it("残高不足でも払える分だけ減算される(マイナスにならない)", () => {
    const result = answerQuiz(context, session(10), PlayerId("p1"), question, "high", 0, new FixedRandom(0, 0.99));
    expect(result.amount.amount).toBe(10);
    expect(result.session.players[0].cash.amount).toBe(0);
  });
});
