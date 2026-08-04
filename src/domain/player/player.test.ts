import { describe, expect, it } from "vitest";
import { Money } from "../shared-kernel/money";
import { ItemKey, NodeId, PlayerId, PropertyRef, CityId, PropertyIndex } from "../shared-kernel/ids";
import {
  MAX_INVENTORY_SIZE,
  acquireProperty,
  addItem,
  canAddItem,
  createPlayer,
  hasItem,
  moveTo,
  payUpTo,
  receiveCash,
  removeItemAt,
  sellProperty,
} from "./player";

function samplePlayer() {
  return createPlayer({
    id: PlayerId("p1"),
    name: "Alex",
    isCpu: false,
    startingCash: Money.of(1200),
    startingNode: NodeId("lapaz"),
  });
}

describe("Player", () => {
  it("移動すると位置が更新される(不変オブジェクトとして新しい値を返す)", () => {
    const player = samplePlayer();
    const moved = moveTo(player, NodeId("sucre"));
    expect(moved.location).toBe("sucre");
    expect(player.location).toBe("lapaz"); // 元は変わらない
  });

  it("現金を受け取れる", () => {
    const player = receiveCash(samplePlayer(), Money.of(300));
    expect(player.cash.amount).toBe(1500);
  });

  it("payUpToは残高が足りなければ払える分だけ払う", () => {
    const poor = receiveCash(createPlayer({
      id: PlayerId("p2"), name: "Poor", isCpu: false,
      startingCash: Money.of(50), startingNode: NodeId("lapaz"),
    }), Money.zero());
    const { player, paid } = payUpTo(poor, Money.of(500));
    expect(paid.amount).toBe(50);
    expect(player.cash.amount).toBe(0);
  });

  it("アイテムは最大5個まで所持できる(現行コードのbagFull相当)", () => {
    let player = samplePlayer();
    for (let i = 0; i < MAX_INVENTORY_SIZE; i++) {
      expect(canAddItem(player)).toBe(true);
      player = addItem(player, ItemKey(`item-${i}`));
    }
    expect(canAddItem(player)).toBe(false);
    const unchanged = addItem(player, ItemKey("overflow"));
    expect(unchanged.inventory.length).toBe(MAX_INVENTORY_SIZE);
  });

  it("アイテムを使用すると手持ちから取り除かれる", () => {
    let player = addItem(samplePlayer(), ItemKey("ekeko"));
    expect(hasItem(player, ItemKey("ekeko"))).toBe(true);
    player = removeItemAt(player, 0);
    expect(hasItem(player, ItemKey("ekeko"))).toBe(false);
  });

  it("物件を取得すると現金が減りポートフォリオに追加される", () => {
    const ref = PropertyRef.of(CityId("lapaz"), PropertyIndex(0));
    const player = acquireProperty(samplePlayer(), ref, Money.of(300));
    expect(player.cash.amount).toBe(900);
    expect(player.portfolio.get(ref)).toBe(1);
  });

  it("物件を売却すると現金が増えポートフォリオから消える", () => {
    const ref = PropertyRef.of(CityId("lapaz"), PropertyIndex(0));
    const owned = acquireProperty(samplePlayer(), ref, Money.of(300));
    const sold = sellProperty(owned, ref, Money.of(200));
    expect(sold.cash.amount).toBe(1100);
    expect(sold.portfolio.has(ref)).toBe(false);
  });
});
