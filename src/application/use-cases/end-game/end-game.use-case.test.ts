import { beforeAll, describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, PlayerId, PropertyIndex, PropertyRef, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { acquireProperty, createPlayer } from "../../../domain/player/player";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../game-engine-context";
import { endGame } from "./end-game.use-case";

describe("endGame (実データ)", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;
  let startCity: CityId;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    startCity = context.content.startCityId;
  });

  it("総資産(現金+物件)が最も多いプレイヤーが勝者になる", () => {
    let p1 = createPlayer({ id: PlayerId("p1"), name: "Rich", isCpu: false, startingCash: Money.of(5000), startingNode: cityIdToNodeId(startCity) });
    p1 = acquireProperty(p1, PropertyRef.of(startCity, PropertyIndex(0)), Money.of(0));
    const p2 = createPlayer({ id: PlayerId("p2"), name: "Poor", isCpu: false, startingCash: Money.of(100), startingNode: cityIdToNodeId(startCity) });

    const session = createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1, p2], destination: startCity });
    const outcome = endGame(context, session);

    expect(outcome.session.status).toBe("finished");
    expect(outcome.winner.player.id).toBe("p1");
    expect(outcome.ranking.map((r) => r.player.id)).toEqual(["p1", "p2"]);
  });
});
