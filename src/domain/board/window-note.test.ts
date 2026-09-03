import { describe, expect, it } from "vitest";
import { CityId, NodeId, RegionId } from "../shared-kernel/ids";
import { BoardNode } from "./node";
import { windowNoteFor } from "./window-note";

describe("車窓の一言の材料", () => {
  it("中間マスでは、結んでいる2つの町と地方を返す", () => {
    const node: BoardNode = {
      id: NodeId("e0_1"),
      regionId: RegionId("tohoku"),
      type: "quiet",
      between: [CityId("sendai"), CityId("morioka")],
      edgeKind: "rail",
    };
    expect(windowNoteFor(node)).toEqual({
      kind: "between",
      regionId: "tohoku",
      from: "sendai",
      to: "morioka",
    });
  });

  it("町のマスでは地方名だけを返す", () => {
    const node: BoardNode = { id: NodeId("sendai"), regionId: RegionId("tohoku"), type: "city", cityId: CityId("sendai") };
    expect(windowNoteFor(node)).toEqual({ kind: "region", regionId: "tohoku" });
  });
});
