import { describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { FixedRandom } from "../../../../tests/fakes/deterministic-random";
import { landOnMoneySquare } from "./money-square.use-case";

function session(cash: number, month = 0) {
  const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(cash), startingNode: NodeId("x") });
  return { ...createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: CityId("y") }), month };
}

describe("landOnMoneySquare", () => {
  it("青マスは現金を得る(月0、index0の候補=100)", () => {
    const result = landOnMoneySquare(session(1000), PlayerId("p1"), true, new FixedRandom(0));
    expect(result.gained).toBe(true);
    expect(result.amount).toBe(100);
    expect(result.session.players[0].cash.amount).toBe(1100);
  });

  it("赤マスは現金を失う", () => {
    const result = landOnMoneySquare(session(1000), PlayerId("p1"), false, new FixedRandom(0));
    expect(result.gained).toBe(false);
    expect(result.amount).toBe(80);
    expect(result.session.players[0].cash.amount).toBe(920);
  });

  it("赤マスでも残高不足なら払える分だけ", () => {
    const result = landOnMoneySquare(session(50), PlayerId("p1"), false, new FixedRandom(0));
    expect(result.amount).toBe(50);
    expect(result.session.players[0].cash.amount).toBe(0);
  });

  it("月が進むと金額が大きくなる", () => {
    const early = landOnMoneySquare(session(1000, 0), PlayerId("p1"), true, new FixedRandom(0));
    const later = landOnMoneySquare(session(1000, 10), PlayerId("p1"), true, new FixedRandom(0));
    expect(later.amount).toBeGreaterThan(early.amount);
  });
});
