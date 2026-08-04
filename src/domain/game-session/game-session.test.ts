import { describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { createPlayer } from "../player/player";
import {
  advanceTurn,
  createGameSession,
  currentPlayer,
  destinationPrize,
  isOver,
  isQuarterlyIncomeMonth,
  seasonIndex,
} from "./game-session";

function twoPlayerSession(maxMonths = 12) {
  const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(1200), startingNode: NodeId("lapaz") });
  const p2 = createPlayer({ id: PlayerId("p2"), name: "B", isCpu: true, startingCash: Money.of(1200), startingNode: NodeId("lapaz") });
  return createGameSession({
    id: GameSessionId("s1"),
    countryId: CountryId("bolivia"),
    maxMonths,
    players: [p1, p2],
    destination: CityId("sucre"),
  });
}

describe("GameSession", () => {
  it("初期状態では最初のプレイヤーの手番、月は0", () => {
    const session = twoPlayerSession();
    expect(currentPlayer(session).id).toBe("p1");
    expect(session.month).toBe(0);
    expect(isOver(session)).toBe(false);
  });

  it("手番を進めると次のプレイヤーになる。一周すると月が進む", () => {
    const session = twoPlayerSession();
    const { session: afterP1, newMonthStarted: m1 } = advanceTurn(session);
    expect(currentPlayer(afterP1).id).toBe("p2");
    expect(m1).toBe(false);

    const { session: afterP2, newMonthStarted: m2 } = advanceTurn(afterP1);
    expect(currentPlayer(afterP2).id).toBe("p1");
    expect(m2).toBe(true);
    expect(afterP2.month).toBe(1);
  });

  it("最大月数に達するとゲーム終了", () => {
    let session = twoPlayerSession(1);
    // 2人が1周すると month=1 になり、maxMonths=1なので終了
    session = advanceTurn(session).session;
    session = advanceTurn(session).session;
    expect(isOver(session)).toBe(true);
  });

  it("目的地到着ボーナスは月が進むほど増える", () => {
    const session = twoPlayerSession();
    expect(destinationPrize(session).amount).toBe(700);
    const later = { ...session, month: 5 };
    expect(destinationPrize(later).amount).toBe(1050);
  });

  it("季節インデックスと四半期判定", () => {
    const session = { ...twoPlayerSession(), month: 15 };
    expect(seasonIndex(session)).toBe(3);
    expect(isQuarterlyIncomeMonth({ ...session, month: 3 })).toBe(true);
    expect(isQuarterlyIncomeMonth({ ...session, month: 4 })).toBe(false);
  });
});
