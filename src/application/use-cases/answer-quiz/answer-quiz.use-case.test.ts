import { beforeAll, describe, expect, it } from "vitest";
import { QuizQuestionId } from "../../../domain/shared-kernel/ids";
import { CityId, CountryId, GameSessionId, ItemKey, PlayerId, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { sameForAllLocales } from "../../../domain/shared-kernel/localized-text";
import { createGameSession } from "../../../domain/game-session/game-session";
import { addItem, createPlayer } from "../../../domain/player/player";
import { QuizQuestion } from "../../../domain/quiz/quiz-question";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../game-engine-context";
import { FixedRandom } from "../../../../tests/fakes/deterministic-random";
import { answerQuiz } from "./answer-quiz.use-case";

const question: QuizQuestion = {
  id: QuizQuestionId("q-test"),
  question: sameForAllLocales("2+2?"),
  options: ["3", "4"].map(sameForAllLocales),
  correctOptionIndex: 1,
  fact: sameForAllLocales("basic arithmetic"),
};

describe("answerQuiz (実データ: ボリビア)", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;
  let startCity: CityId;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    startCity = context.content.startCityId;
  });

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

  it("お守り(pacha)は損失だけを肩代わりし、不正解は不正解のままにする", () => {
    // legacyは不正解を正解へ変換していたが、それでは自分の間違いに気づけず
    // 学習の信号が消えるため、損失の肩代わりだけに変更している
    // (docs/40-learning-design/01-quiz-as-learning-device.md 案4)。
    let s = session(1000);
    s = { ...s, players: s.players.map((p) => addItem(p, ItemKey("pacha"))) };
    const result = answerQuiz(context, s, PlayerId("p1"), question, "low", 0, new FixedRandom(0, 0.99));
    expect(result.correct).toBe(false);
    expect(result.savedByCharm).toBe(true);
    expect(result.session.players[0].inventory).not.toContain("pacha");
    expect(result.session.players[0].cash.amount).toBe(1000); // 損失なし・賞金なし
    // 不正解なので、おさらい用に問題が記録される。
    expect(result.session.learningRecord.missedQuestionIds).toEqual([question.id]);
  });

  it("不正解の問題はおさらい用に記録され、同じ問題は重複しない", () => {
    const first = answerQuiz(context, session(1000), PlayerId("p1"), question, "low", 0, new FixedRandom(0, 0.99));
    expect(first.session.learningRecord.missedQuestionIds).toEqual([question.id]);
    const second = answerQuiz(context, first.session, PlayerId("p1"), question, "low", 0, new FixedRandom(0, 0.99));
    expect(second.session.learningRecord.missedQuestionIds).toEqual([question.id]);
  });

  it("正解した問題は記録されない", () => {
    const result = answerQuiz(context, session(1000), PlayerId("p1"), question, "low", 1, new FixedRandom(0, 0.99));
    expect(result.correct).toBe(true);
    expect(result.session.learningRecord.missedQuestionIds).toEqual([]);
  });

  it("知識レベルに応じて増減額が変わる(初級は得が大きく損が小さい)", () => {
    const withLevel = (level: "newcomer" | "familiar" | "local") => ({
      ...session(1000),
      players: session(1000).players.map((p) => ({ ...p, knowledgeLevel: level })),
    });
    // low ティアは正解+100 / 不正解-30。
    expect(answerQuiz(context, withLevel("newcomer"), PlayerId("p1"), question, "low", 1, new FixedRandom(0, 0.99)).amount.amount).toBe(150);
    expect(answerQuiz(context, withLevel("familiar"), PlayerId("p1"), question, "low", 1, new FixedRandom(0, 0.99)).amount.amount).toBe(100);
    expect(answerQuiz(context, withLevel("local"), PlayerId("p1"), question, "low", 1, new FixedRandom(0, 0.99)).amount.amount).toBe(75);
    expect(answerQuiz(context, withLevel("newcomer"), PlayerId("p1"), question, "low", 0, new FixedRandom(0, 0.99)).amount.amount).toBe(15);
    expect(answerQuiz(context, withLevel("local"), PlayerId("p1"), question, "low", 0, new FixedRandom(0, 0.99)).amount.amount).toBe(45);
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
