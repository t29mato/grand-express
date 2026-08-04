import { describe, expect, it } from "vitest";
import { CountryId, GameSessionId, PlayerId, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { createGameEngineContext } from "../../game-engine-context";
import { FixedRandom } from "../../../../tests/fakes/deterministic-random";
import { arriveAtDestination } from "./arrive-destination.use-case";

describe("arriveAtDestination (実データ: ボリビア)", () => {
  const repo = new JsonCountryContentRepository();
  const context = createGameEngineContext(repo.load(CountryId("bolivia")));
  const startCity = context.content.startCityId;

  function session(month = 0) {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(0), startingNode: cityIdToNodeId(startCity) });
    const p2 = createPlayer({ id: PlayerId("p2"), name: "B", isCpu: false, startingCash: Money.of(0), startingNode: cityIdToNodeId(startCity) });
    return { ...createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1, p2], destination: startCity }), month };
  }

  it("賞金を受け取り、新しい目的地が抽選され、厄災の神が初めて憑依する", () => {
    const result = arriveAtDestination(context, session(0), PlayerId("p1"), new FixedRandom(0, 0));
    expect(result.prize).toBe(700);
    expect(result.session.players[0].cash.amount).toBe(700);
    expect(result.session.destination).not.toBe(startCity);
    expect(result.firstTimeSpiritAppearance).toBe(true);
    expect(result.spiritHolderId).not.toBeNull();
  });

  it("月が進むほど賞金が増える", () => {
    const result = arriveAtDestination(context, session(10), PlayerId("p1"), new FixedRandom(0, 0));
    expect(result.prize).toBe(700 + 70 * 10);
  });
});
