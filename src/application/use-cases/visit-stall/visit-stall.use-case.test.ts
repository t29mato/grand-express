import { describe, expect, it } from "vitest";
import { CountryId, GameSessionId, PlayerId, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { createGameEngineContext } from "../../game-engine-context";
import { buyStallItem, stallStockFor } from "./visit-stall.use-case";

describe("visit-stall (実データ)", () => {
  const repo = new JsonCountryContentRepository();
  const context = createGameEngineContext(repo.load(CountryId("bolivia")));
  const startCity = context.content.startCityId;

  function session(cash: number) {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(cash), startingNode: cityIdToNodeId(startCity) });
    return createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: startCity });
  }

  it("屋台の品揃えは3件以内", () => {
    const stock = stallStockFor(context, startCity, 0);
    expect(stock.length).toBeGreaterThan(0);
    expect(stock.length).toBeLessThanOrEqual(3);
  });

  it("品揃えにあるアイテムを資金があれば購入できる", () => {
    const stock = stallStockFor(context, startCity, 0);
    const result = buyStallItem(context, session(5000), PlayerId("p1"), startCity, stock[0]);
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("unreachable");
    expect(result.value.players[0].inventory).toContain(stock[0]);
  });

  it("品揃えにないアイテムは買えない", () => {
    const allKeys = context.content.items.map((i) => i.key);
    const stock = stallStockFor(context, startCity, 0);
    const notInStock = allKeys.find((k) => !stock.includes(k))!;
    const result = buyStallItem(context, session(5000), PlayerId("p1"), startCity, notInStock);
    expect(result).toEqual({ ok: false, error: "not-in-stock" });
  });

  it("資金不足なら買えない", () => {
    const stock = stallStockFor(context, startCity, 0);
    const result = buyStallItem(context, session(0), PlayerId("p1"), startCity, stock[0]);
    expect(result).toEqual({ ok: false, error: "insufficient-cash" });
  });
});
