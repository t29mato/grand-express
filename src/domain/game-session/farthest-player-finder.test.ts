import { describe, expect, it } from "vitest";
import { NodeId, PlayerId } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { createPlayer } from "../player/player";
import { findFarthestPlayer } from "./farthest-player-finder";

function player(id: string) {
  return createPlayer({ id: PlayerId(id), name: id, isCpu: false, startingCash: Money.of(0), startingNode: NodeId("x") });
}

describe("findFarthestPlayer", () => {
  it("目的地から最も遠いプレイヤーを返す", () => {
    const p1 = player("p1");
    const p2 = player("p2");
    const distances = new Map([[p1, 3], [p2, 7]]);
    const result = findFarthestPlayer([p1, p2], (p) => distances.get(p)!);
    expect(result?.id).toBe("p2");
  });

  it("同着の場合は先に見つかった方を返す", () => {
    const p1 = player("p1");
    const p2 = player("p2");
    const result = findFarthestPlayer([p1, p2], () => 5);
    expect(result?.id).toBe("p1");
  });

  it("プレイヤーがいなければnull", () => {
    expect(findFarthestPlayer([], () => 0)).toBeNull();
  });
});
