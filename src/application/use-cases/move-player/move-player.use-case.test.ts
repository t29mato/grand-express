import { describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { attachToFarthestPlayer, INITIAL_MISFORTUNE_STATE } from "../../../domain/misfortune/misfortune-spirit";
import { movePlayerAlongPath, reachableNodesFor } from "./move-player.use-case";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { createGameEngineContext } from "../../game-engine-context";

function baseSession(startNode: string) {
  const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(1200), startingNode: NodeId(startNode) });
  const p2 = createPlayer({ id: PlayerId("p2"), name: "B", isCpu: false, startingCash: Money.of(1200), startingNode: NodeId(startNode) });
  return createGameSession({
    id: GameSessionId("s1"),
    countryId: CountryId("bolivia"),
    maxMonths: 12,
    players: [p1, p2],
    destination: CityId("sucre"),
  });
}

describe("movePlayerAlongPath", () => {
  it("経路に沿って最終的な位置まで移動する", () => {
    const session = baseSession("lapaz");
    const result = movePlayerAlongPath(session, PlayerId("p1"), [NodeId("e0_1"), NodeId("e0_2")]);
    const moved = result.session.players.find((p) => p.id === "p1")!;
    expect(moved.location).toBe("e0_2");
    expect(result.finalNode).toBe("e0_2");
  });

  it("厄災の神を持つプレイヤーが他プレイヤーのいるマスを通過すると、すれ違いで移る", () => {
    let session = baseSession("lapaz");
    // p2 は e0_1 に立っている
    session = {
      ...session,
      players: session.players.map((p) => (p.id === "p2" ? { ...p, location: NodeId("e0_1") } : p)),
      misfortune: attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")),
    };
    const result = movePlayerAlongPath(session, PlayerId("p1"), [NodeId("e0_1")]);
    expect(result.session.misfortune.holderId).toBe("p2");
    expect(result.spiritPassEvents).toEqual([
      { type: "spirit-passed", fromPlayerId: "p1", toPlayerId: "p2", atNode: "e0_1" },
    ]);
  });

  it("厄災の神を持っていないプレイヤーが通過しても何も起きない", () => {
    let session = baseSession("lapaz");
    session = {
      ...session,
      players: session.players.map((p) => (p.id === "p2" ? { ...p, location: NodeId("e0_1") } : p)),
    };
    const result = movePlayerAlongPath(session, PlayerId("p1"), [NodeId("e0_1")]);
    expect(result.spiritPassEvents).toEqual([]);
  });
});

describe("reachableNodesFor (実データでの疎通確認)", () => {
  it("到達可能なマスの一覧を返す", async () => {
    const repo = new JsonCountryContentRepository();
    const context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    const session = baseSession(context.content.startCityId);
    const reach = reachableNodesFor(context, session, PlayerId("p1"), 3);
    expect(reach.size).toBeGreaterThan(0);
  });
});
