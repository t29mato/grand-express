import { describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, ItemKey, NodeId, PlayerId, PropertyIndex, PropertyRef } from "../../domain/shared-kernel/ids";
import { Money } from "../../domain/shared-kernel/money";
import { createGameSession } from "../../domain/game-session/game-session";
import { acquireProperty, addItem, createPlayer } from "../../domain/player/player";
import { attachToFarthestPlayer, INITIAL_MISFORTUNE_STATE } from "../../domain/misfortune/misfortune-spirit";
import { fromSnapshot, toSnapshot } from "./game-session-snapshot";

describe("GameSessionSnapshot", () => {
  it("JSONシリアライズ可能な形へ変換し、完全に復元できる(往復変換)", () => {
    let p1 = createPlayer({ id: PlayerId("p1"), name: "Alex", isCpu: false, startingCash: Money.of(1200), startingNode: NodeId("lapaz") });
    p1 = acquireProperty(p1, PropertyRef.of(CityId("lapaz"), PropertyIndex(0)), Money.of(300));
    p1 = addItem(p1, ItemKey("ekeko"));
    const p2 = createPlayer({ id: PlayerId("p2"), name: "CPU", isCpu: true, cpuLevel: "normal", startingCash: Money.of(1200), startingNode: NodeId("lapaz") });

    let session = createGameSession({
      id: GameSessionId("s1"),
      countryId: CountryId("bolivia"),
      maxMonths: 12,
      players: [p1, p2],
      destination: CityId("sucre"),
    });
    session = { ...session, misfortune: attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p2")), month: 3 };

    const snapshot = toSnapshot(session);
    // JSON.stringify/parseを経由しても壊れないことを確認(実際の永続化経路と同じ)
    const roundTripped = JSON.parse(JSON.stringify(snapshot));
    const restored = fromSnapshot(roundTripped);

    expect(restored).toEqual(session);
  });
});
