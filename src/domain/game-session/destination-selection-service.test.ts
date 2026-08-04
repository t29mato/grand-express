import { describe, expect, it } from "vitest";
import { CityId, NodeId } from "../shared-kernel/ids";
import { Random } from "../shared-kernel/random";
import { selectNewDestination } from "./destination-selection-service";

class FixedRandom implements Random {
  constructor(private readonly intValue: number) {}
  nextInt(): number {
    return this.intValue;
  }
  nextFloat(): number {
    return 0;
  }
}

describe("selectNewDestination", () => {
  const cities = [CityId("a"), CityId("b"), CityId("c"), CityId("d")];

  it("全プレイヤーから距離8以上離れた都市を優先する", () => {
    const distance = (from: NodeId, to: CityId) => (to === "d" ? 10 : 3);
    const result = selectNewDestination(cities, CityId("a"), [NodeId("a")], distance, new FixedRandom(0));
    expect(result).toBe("d"); // 候補は d のみなので必ず選ばれる
  });

  it("距離8以上の都市が無ければ現在地以外のどこでもよい", () => {
    const distance = () => 1; // どこも近い
    const result = selectNewDestination(cities, CityId("a"), [NodeId("a")], distance, new FixedRandom(0));
    expect(result).toBe("b"); // candidates=[b,c,d]の先頭
  });

  it("現在地自身は候補に含まれない", () => {
    const distance = () => 1;
    const result = selectNewDestination([CityId("a")], CityId("a"), [NodeId("a")], distance, new FixedRandom(0));
    expect(result).toBeUndefined();
  });
});
