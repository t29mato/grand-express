import { describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { GameSessionSnapshot } from "../../dto/game-session-snapshot";
import { GameRepository } from "../../ports/game-repository";
import { clearSavedGame, loadGame, saveGame } from "./save-load-game.use-case";

class InMemoryGameRepository implements GameRepository {
  private snapshot: GameSessionSnapshot | null = null;
  save(snapshot: GameSessionSnapshot): void {
    this.snapshot = snapshot;
  }
  load(): GameSessionSnapshot | null {
    return this.snapshot;
  }
  clear(): void {
    this.snapshot = null;
  }
}

function session() {
  const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(1200), startingNode: NodeId("lapaz") });
  return createGameSession({ id: GameSessionId("s1"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: CityId("sucre") });
}

describe("save/load/clear game", () => {
  it("保存したゲームを読み込むと元と同じ状態になる", () => {
    const repo = new InMemoryGameRepository();
    saveGame(repo, session());
    const loaded = loadGame(repo);
    expect(loaded).toEqual(session());
  });

  it("保存されていなければnullを返す", () => {
    const repo = new InMemoryGameRepository();
    expect(loadGame(repo)).toBeNull();
  });

  it("終了済みのゲームは保存しない", () => {
    const repo = new InMemoryGameRepository();
    saveGame(repo, { ...session(), status: "finished" });
    expect(loadGame(repo)).toBeNull();
  });

  it("clearするとロードできなくなる", () => {
    const repo = new InMemoryGameRepository();
    saveGame(repo, session());
    clearSavedGame(repo);
    expect(loadGame(repo)).toBeNull();
  });
});
