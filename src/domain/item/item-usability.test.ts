import { describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, ItemKey, NodeId, PlayerId } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { createGameSession } from "../game-session/game-session";
import { createPlayer } from "../player/player";
import { itemUseBlocker } from "./item-usability";

/**
 * 「押せるのに何も起きない」を無くすための判定。
 *
 * 厄災を背負っていないのにチャラの供物を使うと、**持ち物から消えるだけで
 * 何も起きなかった**(実測で確認)。出目を選ぶ画面に閉じるボタンを置かなかったのと
 * 同じ理由で、アイテムを失って何も起きないのは行き止まりなので、押せなくする。
 */
describe("いまアイテムが使えるか", () => {
  function sessionWith(players: number) {
    const list = Array.from({ length: players }, (_, i) =>
      createPlayer({
        id: PlayerId(`p${i}`),
        name: i ? `CPU ${i}` : "You",
        isCpu: i > 0,
        startingCash: Money.of(1200),
        startingNode: NodeId("lapaz"),
      }),
    );
    return createGameSession({
      id: GameSessionId("s"),
      countryId: CountryId("bolivia"),
      maxMonths: 12,
      players: list,
      destination: CityId("sucre"),
    });
  }

  it("厄災を背負っていなければ、追い払うアイテムは使えない", () => {
    const session = sessionWith(2);
    expect(itemUseBlocker(session, session.players[0], { type: "repel-spirit" })).toBe("itemNeedsMisfortune");
  });

  it("背負っていれば使える", () => {
    const base = sessionWith(2);
    const session = { ...base, misfortune: { ...base.misfortune, holderId: PlayerId("p0"), level: 1 as const } };
    expect(itemUseBlocker(session, session.players[0], { type: "repel-spirit" })).toBeNull();
  });

  it("他人が背負っているぶんには使えない", () => {
    const base = sessionWith(2);
    const session = { ...base, misfortune: { ...base.misfortune, holderId: PlayerId("p1"), level: 1 as const } };
    expect(itemUseBlocker(session, session.players[0], { type: "repel-spirit" })).toBe("itemNeedsMisfortune");
  });

  it("押し付ける相手がいなければ使えない", () => {
    const base = sessionWith(1);
    const session = { ...base, misfortune: { ...base.misfortune, holderId: PlayerId("p0"), level: 1 as const } };
    expect(itemUseBlocker(session, session.players[0], { type: "repel-spirit" })).toBe("itemNoOneToPassTo");
  });

  it("すでに追加手番があれば、もう1回のアイテムは使えない", () => {
    const session = sessionWith(2);
    const withTurn = { ...session.players[0], hasExtraTurn: true };
    expect(itemUseBlocker(session, withTurn, { type: "extra-turn" })).toBe("itemAlreadyExtraTurn");
    expect(itemUseBlocker(session, session.players[0], { type: "extra-turn" })).toBeNull();
  });

  it("前提を持たない効果は、いつでも使える", () => {
    const session = sessionWith(2);
    const me = session.players[0];
    for (const effect of [
      { type: "carried-far", minSteps: 8, maxSteps: 12 },
      { type: "choose-exact-dice" },
      { type: "roll-fixed-dice", diceCount: 2 },
      { type: "gain-cash", amount: 100 },
    ] as const) {
      expect(itemUseBlocker(session, me, effect), `${effect.type} が塞がれている`).toBeNull();
    }
  });

  /** 持ちものの中身は判定に関係しない(前提は局面の側にある)。 */
  it("同じ効果でも、局面が変われば結果が変わる", () => {
    const base = sessionWith(2);
    const me = { ...base.players[0], inventory: [ItemKey("challa")] };
    expect(itemUseBlocker(base, me, { type: "repel-spirit" })).toBe("itemNeedsMisfortune");
    const held = { ...base, misfortune: { ...base.misfortune, holderId: me.id, level: 2 as const } };
    expect(itemUseBlocker(held, me, { type: "repel-spirit" })).toBeNull();
  });
});
