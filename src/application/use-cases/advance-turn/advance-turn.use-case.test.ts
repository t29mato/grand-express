import { beforeAll, describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, PlayerId, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer, acquireProperty } from "../../../domain/player/player";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../game-engine-context";
import { FixedRandom } from "../../../../tests/fakes/deterministic-random";
import { advanceTurn } from "./advance-turn.use-case";
import { PropertyIndex, PropertyRef } from "../../../domain/shared-kernel/ids";

describe("advanceTurn (実データ: ボリビア)", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;
  let startCity: CityId;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    startCity = context.content.startCityId;
  });

  function twoPlayerSession(maxMonths = 12) {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(1200), startingNode: cityIdToNodeId(startCity) });
    const p2 = createPlayer({ id: PlayerId("p2"), name: "B", isCpu: false, startingCash: Money.of(1200), startingNode: cityIdToNodeId(startCity) });
    return createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths, players: [p1, p2], destination: startCity });
  }

  it("1人だけ手番を進めても月は変わらない", () => {
    const session = twoPlayerSession();
    const result = advanceTurn(context, session, new FixedRandom(0, 0));
    expect(result.monthChanged).toBe(false);
    expect(result.session.month).toBe(0);
  });

  it("全員が1周すると月が変わり、その月の季節イベントが適用される", () => {
    let session = twoPlayerSession();
    session = advanceTurn(context, session, new FixedRandom(0, 0)).session; // p1 -> p2
    const result = advanceTurn(context, session, new FixedRandom(0, 0)); // p2 -> p1、月が進む
    expect(result.monthChanged).toBe(true);
    expect(result.session.month).toBe(1);
    expect(result.season).toBeDefined();
    expect(result.season?.monthIndex).toBe(1);
  });

  it("四半期(3ヶ月ごと)には所有物件の収入が支払われる", () => {
    let session = twoPlayerSession();
    session = { ...session, players: session.players.map((p) => (p.id === "p1" ? acquireProperty(p, PropertyRef.of(startCity, PropertyIndex(0)), Money.of(0)) : p)) };
    // month 0->1->2->3 まで3回一周させる(2人なので advanceTurnを6回)
    for (let i = 0; i < 5; i++) {
      session = advanceTurn(context, session, new FixedRandom(0, 0.99)).session; // pleasedにならないよう高いfloat
    }
    const result = advanceTurn(context, session, new FixedRandom(0, 0.99));
    expect(result.session.month).toBe(3);
    expect(result.quarterlyIncome.length).toBeGreaterThan(0);
    expect(result.quarterlyIncome.some((q) => q.playerId === "p1")).toBe(true);
  });

  it("最大月数に達するとゲーム終了になる", () => {
    let session = twoPlayerSession(1);
    session = advanceTurn(context, session, new FixedRandom(0, 0)).session;
    const result = advanceTurn(context, session, new FixedRandom(0, 0));
    expect(result.gameEnded).toBe(true);
  });
});
