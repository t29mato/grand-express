import { beforeEach, describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../domain/shared-kernel/ids";
import { Money } from "../../domain/shared-kernel/money";
import { createGameSession } from "../../domain/game-session/game-session";
import { createPlayer } from "../../domain/player/player";
import { toSnapshot } from "../../application/dto/game-session-snapshot";
import { LocalStorageGameRepository } from "./local-storage-game-repository";

function snapshot() {
  const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(1200), startingNode: NodeId("lapaz") });
  const session = createGameSession({ id: GameSessionId("s1"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: CityId("sucre") });
  return toSnapshot(session);
}

describe("LocalStorageGameRepository", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("保存したものをそのまま読み込める", () => {
    const repo = new LocalStorageGameRepository();
    repo.save(snapshot());
    expect(repo.load()).toEqual(snapshot());
  });

  it("実際にlocalStorageに書き込まれている", () => {
    const repo = new LocalStorageGameRepository();
    repo.save(snapshot());
    expect(window.localStorage.length).toBeGreaterThan(0);
  });

  it("クリアすると読み込めなくなる", () => {
    const repo = new LocalStorageGameRepository();
    repo.save(snapshot());
    repo.clear();
    expect(repo.load()).toBeNull();
  });

  it("localStorageに壊れたJSONが入っていてもクラッシュせずnullを返す", () => {
    window.localStorage.setItem("grand-express:save:v1", "not json");
    const repo = new LocalStorageGameRepository();
    expect(repo.load()).toBeNull();
  });

  it("何も保存していなければnull", () => {
    const repo = new LocalStorageGameRepository();
    expect(repo.load()).toBeNull();
  });
});
