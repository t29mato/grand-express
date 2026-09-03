import { describe, expect, it } from "vitest";
import { CountryId, GameSessionId, NodeId, PlayerId, CityId } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { createPlayer } from "../player/player";
import { GameSession, createGameSession, finish } from "./game-session";
import { FINAL_STRETCH_MONTHS, isFinalStretch } from "./final-stretch";

function sessionAt(month: number, maxMonths = 12): GameSession {
  const player = createPlayer({
    id: PlayerId("p1"),
    name: "A",
    isCpu: false,
    startingCash: Money.of(1000),
    startingNode: NodeId("start"),
  });
  const session = createGameSession({
    id: GameSessionId("s"),
    countryId: CountryId("japan"),
    maxMonths,
    players: [player],
    destination: CityId("kyoto"),
  });
  return { ...session, month };
}

describe("終盤かどうか", () => {
  it("残りが2ヶ月以下になったら終盤", () => {
    expect(FINAL_STRETCH_MONTHS).toBe(2);
    expect(isFinalStretch(sessionAt(9)), "残り3ヶ月").toBe(false);
    expect(isFinalStretch(sessionAt(10)), "残り2ヶ月").toBe(true);
    expect(isFinalStretch(sessionAt(11)), "残り1ヶ月").toBe(true);
  });

  it("月数の設定が変わっても、残りで決まる", () => {
    expect(isFinalStretch(sessionAt(21, 24)), "24ヶ月の旅で残り3ヶ月").toBe(false);
    expect(isFinalStretch(sessionAt(22, 24)), "24ヶ月の旅で残り2ヶ月").toBe(true);
  });

  it("旅が終わっていたら終盤ではない(表彰の裏で鳴り続けない)", () => {
    expect(isFinalStretch(sessionAt(12))).toBe(false);
    expect(isFinalStretch(finish(sessionAt(1)))).toBe(false);
  });
});
