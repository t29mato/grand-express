import { describe, expect, it } from "vitest";
import { CityId, ItemKey, NodeId, PlayerId, PropertyIndex, PropertyRef } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { Random } from "../shared-kernel/random";
import { acquireProperty, addItem, createPlayer } from "../player/player";
import {
  DoomEffectContext,
  fineDoom,
  losePropertiesDoom,
  payOthersDoom,
  percentLossDoom,
  skipTurnDoom,
  stealDoom,
  teleportDoom,
} from "./doom-effect";

class FixedRandom implements Random {
  constructor(private readonly intValue = 0, private readonly floatValue = 0) {}
  nextInt(): number {
    return this.intValue;
  }
  nextFloat(): number {
    return this.floatValue;
  }
}

function player(id: string, cash: number) {
  return createPlayer({
    id: PlayerId(id),
    name: id,
    isCpu: false,
    startingCash: Money.of(cash),
    startingNode: NodeId("a"),
  });
}

function baseContext(overrides: Partial<DoomEffectContext> = {}): DoomEffectContext {
  const p1 = player("p1", 1000);
  const p2 = player("p2", 1000);
  return {
    random: new FixedRandom(0, 0),
    king: false,
    allPlayers: [p1, p2],
    afflictedPlayerId: PlayerId("p1"),
    farthestNodesFromDestination: () => [NodeId("far1"), NodeId("far2")],
    ...overrides,
  };
}

describe("fineDoom", () => {
  it("通常時は150〜309の範囲(rnd固定で150)を払う", () => {
    const result = fineDoom(baseContext());
    expect(result.outcome).toEqual({ effectId: "fine", amountPaid: 150 });
  });

  it("king時は420〜839の範囲(rnd固定で420)を払う", () => {
    const result = fineDoom(baseContext({ king: true }));
    expect(result.outcome).toEqual({ effectId: "fine", amountPaid: 420 });
  });

  it("残高不足なら払える分だけ払う", () => {
    const context = baseContext();
    const poor = { ...context.allPlayers[0], cash: Money.of(50) };
    const result = fineDoom({ ...context, allPlayers: [poor, context.allPlayers[1]] });
    expect(result.outcome).toEqual({ effectId: "fine", amountPaid: 50 });
  });
});

describe("percentLossDoom", () => {
  it("通常時は現金の14%を失う", () => {
    const result = percentLossDoom(baseContext());
    const p1 = result.updatedPlayers.find((p) => p.id === "p1")!;
    expect(p1.cash.amount).toBe(1000 - Math.round(1000 * 0.14));
  });

  it("king時は現金の32%を失う", () => {
    const result = percentLossDoom(baseContext({ king: true }));
    const p1 = result.updatedPlayers.find((p) => p.id === "p1")!;
    expect(p1.cash.amount).toBe(1000 - Math.round(1000 * 0.32));
  });
});

describe("skipTurnDoom", () => {
  it("通常時は1回休みのみ", () => {
    const result = skipTurnDoom(baseContext());
    expect(result.outcome).toEqual({ effectId: "skipTurn", alsoPaid: null });
    const p1 = result.updatedPlayers.find((p) => p.id === "p1")!;
    expect(p1.skipNextTurn).toBe(true);
  });

  it("king時は1回休み+300支払い", () => {
    const result = skipTurnDoom(baseContext({ king: true }));
    expect(result.outcome).toEqual({ effectId: "skipTurn", alsoPaid: 300 });
  });
});

describe("losePropertiesDoom", () => {
  it("物件を持っていれば通常1件失う", () => {
    const ref = PropertyRef.of(CityId("a"), PropertyIndex(0));
    let p1 = player("p1", 1000);
    p1 = acquireProperty(p1, ref, Money.of(300));
    const context = baseContext({ allPlayers: [p1, player("p2", 1000)] });
    const result = losePropertiesDoom(context);
    expect(result.outcome).toEqual({ effectId: "loseProperties", lostRefs: [ref], fallbackPaid: null });
  });

  it("物件を持っていなければ代わりに最大200を支払う", () => {
    const context = baseContext();
    const result = losePropertiesDoom(context);
    expect(result.outcome).toEqual({ effectId: "loseProperties", lostRefs: [], fallbackPaid: 200 });
  });
});

describe("payOthersDoom", () => {
  it("自分以外の全プレイヤーへ現金を配る(通常時は各100)", () => {
    const p1 = player("p1", 1000);
    const p2 = player("p2", 500);
    const p3 = player("p3", 0);
    const result = payOthersDoom(baseContext({ allPlayers: [p1, p2, p3] }));
    expect(result.outcome).toEqual({ effectId: "payOthers", totalPaid: 200 });
    expect(result.updatedPlayers.find((p) => p.id === "p1")!.cash.amount).toBe(800);
    expect(result.updatedPlayers.find((p) => p.id === "p2")!.cash.amount).toBe(600);
    expect(result.updatedPlayers.find((p) => p.id === "p3")!.cash.amount).toBe(100);
  });
});

describe("teleportDoom", () => {
  it("候補プールの中から移動先を選ぶ", () => {
    const result = teleportDoom(baseContext());
    expect(result.outcome).toEqual({ effectId: "teleport", toNode: NodeId("far1") });
    expect(result.updatedPlayers.find((p) => p.id === "p1")!.location).toBe("far1");
  });
});

describe("stealDoom", () => {
  it("アイテムを持っていればアイテムを奪われる", () => {
    let p1 = player("p1", 1000);
    p1 = addItem(p1, ItemKey("ekeko"));
    const result = stealDoom(baseContext({ allPlayers: [p1, player("p2", 1000)] }));
    expect(result.outcome).toEqual({ effectId: "steal", lostItem: "ekeko", lostCash: 0 });
  });

  it("アイテムがなければ現金を奪われる", () => {
    const result = stealDoom(baseContext());
    expect(result.outcome).toEqual({ effectId: "steal", lostItem: null, lostCash: 170 });
  });
});
