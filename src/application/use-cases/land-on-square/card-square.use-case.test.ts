import { beforeAll, describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, PlayerId, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../game-engine-context";
import { FixedRandom } from "../../../../tests/fakes/deterministic-random";
import { landOnCardSquare } from "./card-square.use-case";

describe("landOnCardSquare (実データ)", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;
  let startCity: CityId;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    startCity = context.content.startCityId;
  });

  it("ランダムなアイテムを1つ拾う", () => {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(0), startingNode: cityIdToNodeId(startCity) });
    const session = createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: startCity });
    const result = landOnCardSquare(context, session, PlayerId("p1"), new FixedRandom(0));
    expect(result.itemKey).not.toBeNull();
    expect(result.session.players[0].inventory).toEqual([result.itemKey]);
  });
});
