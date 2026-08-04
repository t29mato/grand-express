import { beforeAll, describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, PlayerId, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../game-engine-context";
import { DeterministicRandom } from "../../../../tests/fakes/deterministic-random";
import { cpuTakeTurn } from "./cpu-take-turn.use-case";

describe("cpuTakeTurn (実データ: ボリビア)", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;
  let startCity: CityId;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    startCity = context.content.startCityId;
  });

  function session() {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "CPU-A", isCpu: true, cpuLevel: "normal", startingCash: Money.of(1200), startingNode: cityIdToNodeId(startCity) });
    const p2 = createPlayer({ id: PlayerId("p2"), name: "CPU-B", isCpu: true, cpuLevel: "normal", startingCash: Money.of(1200), startingNode: cityIdToNodeId(startCity) });
    return createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1, p2], destination: context.content.cities[5].id });
  }

  it("スキップ中でなければサイコロを振って移動し、セッションが破綻しない", () => {
    // 多様な乱数を与えて一通りの分岐(アイテム/移動/着地)を通す
    const random = new DeterministicRandom(
      [3, 1, 0, 2, 4, 1, 0, 3, 2, 1, 0, 5, 2, 1, 4, 3, 2, 1, 0],
      [0.9, 0.1, 0.5, 0.9, 0.2, 0.9, 0.4, 0.9, 0.1, 0.9],
    );
    const result = cpuTakeTurn(context, session(), PlayerId("p1"), random);

    expect(result.skippedTurn).toBe(false);
    expect(result.steps).toBeGreaterThanOrEqual(1);
    expect(result.steps).toBeLessThanOrEqual(6);
    expect(result.session.players).toHaveLength(2);
    // 現金がNaNや負の異常値になっていないこと
    for (const p of result.session.players) {
      expect(Number.isFinite(p.cash.amount)).toBe(true);
    }
  });

  it("skipNextTurnが立っていれば、移動せずにターンを終える", () => {
    let s = session();
    s = { ...s, players: s.players.map((p) => (p.id === "p1" ? { ...p, skipNextTurn: true } : p)) };
    const random = new DeterministicRandom([0], [0.9]);
    const result = cpuTakeTurn(context, s, PlayerId("p1"), random);

    expect(result.skippedTurn).toBe(true);
    expect(result.session.players[0].skipNextTurn).toBe(false);
    expect(result.session.players[0].location).toBe(cityIdToNodeId(startCity));
  });

  it("何度実行してもクラッシュしない(ランダムシード違いでのファズ的確認)", () => {
    for (let seed = 0; seed < 15; seed++) {
      const random = new DeterministicRandom(
        Array.from({ length: 10 }, (_, i) => (seed + i) % 6),
        Array.from({ length: 10 }, (_, i) => ((seed * 7 + i * 13) % 100) / 100),
      );
      expect(() => cpuTakeTurn(context, session(), PlayerId("p1"), random)).not.toThrow();
    }
  });
});
