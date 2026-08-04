import { describe, expect, it } from "vitest";
import { CountryId, GameSessionId } from "../../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { createGameEngineContext } from "../../game-engine-context";
import { FixedRandom } from "../../../../tests/fakes/deterministic-random";
import { startGame } from "./start-game.use-case";

describe("startGame", () => {
  const repo = new JsonCountryContentRepository();
  const context = createGameEngineContext(repo.load(CountryId("bolivia")));

  it("開始都市に全プレイヤーを配置し、初期資金1200で始まる", () => {
    const session = startGame(context, new FixedRandom(0), {
      countryId: CountryId("bolivia"),
      players: [{ name: "You", isCpu: false }, { name: "CPU", isCpu: true }],
      maxMonths: 12,
      cpuLevel: "normal",
      sessionId: GameSessionId("s1"),
    });

    expect(session.players).toHaveLength(2);
    expect(session.players.every((p) => p.location === context.content.startCityId)).toBe(true);
    expect(session.players[0].cash.amount).toBe(1200);
    expect(session.players[1].cash.amount).toBe(1200);
    expect(session.month).toBe(0);
    expect(session.destination).not.toBe(context.content.startCityId);
  });

  it("mercilessレベルのCPUは開始資金にボーナスが付く", () => {
    const session = startGame(context, new FixedRandom(0), {
      countryId: CountryId("bolivia"),
      players: [{ name: "You", isCpu: false }, { name: "CPU", isCpu: true }],
      maxMonths: 12,
      cpuLevel: "merciless",
      sessionId: GameSessionId("s2"),
    });
    expect(session.players[0].cash.amount).toBe(1200);
    expect(session.players[1].cash.amount).toBe(1500);
  });
});
