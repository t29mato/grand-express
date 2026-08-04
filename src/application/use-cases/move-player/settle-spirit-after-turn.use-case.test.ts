import { describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { attachToFarthestPlayer, INITIAL_MISFORTUNE_STATE } from "../../../domain/misfortune/misfortune-spirit";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { createGameEngineContext } from "../../game-engine-context";
import { settleSpiritAfterTurn } from "./settle-spirit-after-turn.use-case";

describe("settleSpiritAfterTurn", () => {
  const repo = new JsonCountryContentRepository();
  const context = createGameEngineContext(repo.load(CountryId("bolivia")));
  const dest = CityId("sucre");

  it("厄災の神が憑いていなければ何もしない", () => {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(0), startingNode: NodeId("lapaz") });
    const session = createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: dest });
    const result = settleSpiritAfterTurn(context, session);
    expect(result.misfortune.level).toBe(0);
  });

  it("最も遅れているプレイヤーへ移動する", () => {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(0), startingNode: dest }); // 目的地=距離0
    const p2 = createPlayer({ id: PlayerId("p2"), name: "B", isCpu: false, startingCash: Money.of(0), startingNode: NodeId("lapaz") }); // 遠い
    let session = createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1, p2], destination: dest });
    session = { ...session, misfortune: attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")) };

    const result = settleSpiritAfterTurn(context, session);
    expect(result.misfortune.holderId).toBe("p2");
  });
});
