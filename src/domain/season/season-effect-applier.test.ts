import { describe, expect, it } from "vitest";
import { NodeId, PlayerId, RegionId } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { createPlayer } from "../player/player";
import { applySeasonEffects } from "./season-effect-applier";

function player(cash: number) {
  return createPlayer({
    id: PlayerId("p"),
    name: "p",
    isCpu: false,
    startingCash: Money.of(cash),
    startingNode: NodeId("a"),
  });
}

describe("applySeasonEffects", () => {
  it("地方収入倍率を指定できる(複数地方も可)", () => {
    const result = applySeasonEffects(
      [player(1000)],
      [
        { op: "region-income-multiplier", regionId: RegionId("kan"), multiplier: 1.25 },
        { op: "region-income-multiplier", regionId: RegionId("kin"), multiplier: 1.2 },
      ],
      (p) => p,
    );
    expect(result.regionModifiers.get(RegionId("kan"))).toBe(1.25);
    expect(result.regionModifiers.get(RegionId("kin"))).toBe(1.2);
  });

  it("全員に現金を配る(Golden Weekなど)", () => {
    const result = applySeasonEffects([player(1000), player(500)], [{ op: "all-players-gain-cash", amount: 300 }], (p) => p);
    expect(result.players.map((p) => p.cash.amount)).toEqual([1300, 800]);
  });

  it("全員から現金を徴収するが0未満にはならない(暖房費など)", () => {
    const result = applySeasonEffects([player(100), player(500)], [{ op: "all-players-pay-cash", amount: 180 }], (p) => p);
    expect(result.players.map((p) => p.cash.amount)).toEqual([0, 320]);
  });

  it("厄災の神を1ターン休ませるフラグを立てられる(お盆など)", () => {
    const result = applySeasonEffects([player(1000)], [{ op: "rest-spirit" }], (p) => p);
    expect(result.spiritShouldRest).toBe(true);
  });

  it("全員にアイテムを配れる(Alasitas/初詣など)", () => {
    let called = 0;
    const result = applySeasonEffects([player(1000), player(1000)], [{ op: "give-item-to-all" }], (p) => {
      called++;
      return p;
    });
    expect(called).toBe(2);
    expect(result.players).toHaveLength(2);
  });

  it("複数の効果を組み合わせられる(台風とお盆など)", () => {
    const result = applySeasonEffects(
      [player(1000)],
      [
        { op: "region-income-multiplier", regionId: RegionId("kyu"), multiplier: 0.7 },
        { op: "rest-spirit" },
      ],
      (p) => p,
    );
    expect(result.regionModifiers.get(RegionId("kyu"))).toBe(0.7);
    expect(result.spiritShouldRest).toBe(true);
  });
});
