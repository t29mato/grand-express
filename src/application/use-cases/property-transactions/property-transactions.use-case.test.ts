import { describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, PlayerId, PropertyIndex, PropertyRef } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { createGameEngineContext } from "../../game-engine-context";
import { buyProperty, investInProperty, sellPropertyUseCase } from "./property-transactions.use-case";
import { cityIdToNodeId } from "../../../domain/shared-kernel/ids";

describe("property transactions (実データ)", () => {
  const repo = new JsonCountryContentRepository();
  const context = createGameEngineContext(repo.load(CountryId("bolivia")));
  const startCity = context.content.startCityId;

  function sessionWithCash(amount: number) {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(amount), startingNode: cityIdToNodeId(startCity) });
    return createGameSession({ id: GameSessionId("s1"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: CityId("sucre") });
  }

  it("資金があれば物件を購入できる", () => {
    const session = sessionWithCash(5000);
    const result = buyProperty(context, session, PlayerId("p1"), startCity, PropertyIndex(0));
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("unreachable");
    const player = result.value.session.players[0];
    expect(player.portfolio.get(result.value.ref)).toBe(1);
  });

  it("資金不足なら購入できない", () => {
    const session = sessionWithCash(1);
    const result = buyProperty(context, session, PlayerId("p1"), startCity, PropertyIndex(0));
    expect(result).toEqual({ ok: false, error: "insufficient-cash" });
  });

  it("既に他プレイヤーが所有している物件は買えない", () => {
    let session = sessionWithCash(5000);
    const p2 = createPlayer({ id: PlayerId("p2"), name: "B", isCpu: false, startingCash: Money.of(5000), startingNode: cityIdToNodeId(startCity) });
    session = { ...session, players: [...session.players, p2] };
    const first = buyProperty(context, session, PlayerId("p1"), startCity, PropertyIndex(0));
    if (!first.ok) throw new Error("unreachable");
    const second = buyProperty(context, first.value.session, PlayerId("p2"), startCity, PropertyIndex(0));
    expect(second).toEqual({ ok: false, error: "already-owned" });
  });

  it("都市の全物件を購入すると独占達成フラグが立つ", () => {
    const propCount = context.getCity(startCity).properties.length;
    let session = sessionWithCash(100000);
    let ref: ReturnType<typeof PropertyRef.of> | undefined;
    for (let i = 0; i < propCount; i++) {
      const result = buyProperty(context, session, PlayerId("p1"), startCity, PropertyIndex(i));
      if (!result.ok) throw new Error("unreachable: " + result.error);
      session = result.value.session;
      ref = result.value.ref;
      if (i === propCount - 1) {
        expect(result.value.monopolyAchieved).toBe(true);
      } else {
        expect(result.value.monopolyAchieved).toBe(false);
      }
    }
    expect(ref).toBeDefined();
  });

  it("所有している物件に増資できる(レベルが上がり現金が減る)", () => {
    let session = sessionWithCash(5000);
    const bought = buyProperty(context, session, PlayerId("p1"), startCity, PropertyIndex(0));
    if (!bought.ok) throw new Error("unreachable");
    session = bought.value.session;
    const result = investInProperty(context, session, PlayerId("p1"), bought.value.ref);
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("unreachable");
    expect(result.value.newLevel).toBe(2);
    expect(result.value.session.players[0].portfolio.get(bought.value.ref)).toBe(2);
  });

  it("所有していない物件を売却しようとするとエラー", () => {
    const session = sessionWithCash(5000);
    const result = sellPropertyUseCase(context, session, PlayerId("p1"), PropertyRef.of(startCity, PropertyIndex(0)));
    expect(result).toEqual({ ok: false, error: "not-owned" });
  });

  it("所有している物件を売却すると現金が増える", () => {
    let session = sessionWithCash(5000);
    const bought = buyProperty(context, session, PlayerId("p1"), startCity, PropertyIndex(0));
    if (!bought.ok) throw new Error("unreachable");
    session = bought.value.session;
    const cashBefore = session.players[0].cash.amount;
    const sold = sellPropertyUseCase(context, session, PlayerId("p1"), bought.value.ref);
    expect(sold.ok).toBe(true);
    if (!sold.ok) throw new Error("unreachable");
    expect(sold.value.session.players[0].cash.amount).toBeGreaterThan(cashBefore);
    expect(sold.value.session.players[0].portfolio.has(bought.value.ref)).toBe(false);
  });
});
