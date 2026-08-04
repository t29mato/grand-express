import { describe, expect, it } from "vitest";
import { ItemKey, NodeId, PlayerId } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { MAX_INVENTORY_SIZE, addItem, createPlayer } from "../player/player";
import { FixedRandom } from "../../../tests/fakes/deterministic-random";
import { giveRandomItem } from "./give-random-item";

function player() {
  return createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(0), startingNode: NodeId("x") });
}

describe("giveRandomItem", () => {
  const keys = [ItemKey("a"), ItemKey("b"), ItemKey("c")];

  it("在庫に空きがあればランダムなアイテムを1つ渡す", () => {
    const result = giveRandomItem(player(), keys, new FixedRandom(1));
    expect(result.itemKey).toBe("b");
    expect(result.player.inventory).toEqual(["b"]);
  });

  it("所持数が上限ならnullを返し変化なし", () => {
    let full = player();
    for (let i = 0; i < MAX_INVENTORY_SIZE; i++) full = addItem(full, ItemKey(`x${i}`));
    const result = giveRandomItem(full, keys, new FixedRandom(0));
    expect(result.itemKey).toBeNull();
    expect(result.player).toBe(full);
  });
});
