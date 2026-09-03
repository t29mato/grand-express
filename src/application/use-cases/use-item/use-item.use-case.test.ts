import { beforeAll, describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, ItemKey, NodeId, PlayerId, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { addItem, createPlayer } from "../../../domain/player/player";
import { attachToFarthestPlayer, INITIAL_MISFORTUNE_STATE } from "../../../domain/misfortune/misfortune-spirit";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../game-engine-context";
import { DeterministicRandom } from "../../../../tests/fakes/deterministic-random";
import { applyItemUse } from "./use-item.use-case";

describe("applyItemUse (実データ: ボリビアの9アイテム)", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
  });

  function sessionWithItem(itemKey: string) {
    let p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("lapaz") });
    p1 = addItem(p1, ItemKey(itemKey));
    const p2 = createPlayer({ id: PlayerId("p2"), name: "B", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("e0_1") });
    return createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1, p2], destination: CityId("sucre") });
  }

  it("ekeko(move)は8〜12マス先の候補を返す(行き先は選ばせる)", () => {
    // 乱数は距離だけを決める(8+0)。行き先の抽選はもう無い。
    const { session, result } = applyItemUse(context, sessionWithItem("ekeko"), PlayerId("p1"), 0, new DeterministicRandom([0]));
    expect(result.type).toBe("carried-far");
    if (result.type !== "carried-far") return;
    expect(result.steps).toBe(8);
    // 候補は「ちょうど8マス先」でなければならない(サイコロの候補と同じ形)。
    expect(result.destinations.size).toBeGreaterThan(0);
    for (const [node, path] of result.destinations) {
      expect(path).toHaveLength(8);
      expect(path[path.length - 1]).toBe(node);
    }
    expect(session.players[0].inventory).toHaveLength(0);
  });

  it("ekekoの候補には、目的地に近づく先も遠ざかる先もある", () => {
    // **どこへ降りるかは遊ぶ人が決める。**ただし距離は運任せなので、
    // 引きによっては近づく先が1つも無いこともありうる。ここで押さえるのは
    // 「候補の中に選ぶ意味がある(全部が同じ結果ではない)」こと。
    const goal = cityIdToNodeId(CityId("sucre"));
    const before = context.pathfinding.distance(NodeId("lapaz"), goal);
    const { result } = applyItemUse(context, sessionWithItem("ekeko"), PlayerId("p1"), 0, new DeterministicRandom([0]));
    if (result.type !== "carried-far") throw new Error("carried-far ではない");
    const distances = [...result.destinations.keys()].map((node) => context.pathfinding.distance(node, goal));
    expect(Math.min(...distances), "どの候補も目的地から遠ざかる").toBeLessThan(before);
    expect(Math.max(...distances), "どの候補も同じだけ近づく(選ぶ意味がない)").toBeGreaterThan(Math.min(...distances));
  });

  it("pass(choose-exact-dice)はUIでの選択待ちを返す", () => {
    const { result } = applyItemUse(context, sessionWithItem("pass"), PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "await-exact-dice-choice" });
  });

  it("ferro(2個振る)はサイコロを2つ振って合計を返す", () => {
    const random = new DeterministicRandom([2, 4]); // -> 3,5
    const { result } = applyItemUse(context, sessionWithItem("ferro"), PlayerId("p1"), 0, random);
    expect(result).toEqual({ type: "rolled", steps: 8, rolls: [3, 5] });
  });

  it("expreso(3個振る)はサイコロを3つ振って合計を返す", () => {
    const random = new DeterministicRandom([0, 0, 0]); // -> 1,1,1
    const { result } = applyItemUse(context, sessionWithItem("expreso"), PlayerId("p1"), 0, random);
    expect(result).toEqual({ type: "rolled", steps: 3, rolls: [1, 1, 1] });
  });

  it("singani(現金+380)は即座に現金を得る", () => {
    const { session, result } = applyItemUse(context, sessionWithItem("singani"), PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "gained-cash", amount: 380 });
    expect(session.players[0].cash.amount).toBe(1380);
  });

  it("zebra(もう1回)はhasExtraTurnを立てる", () => {
    const { session, result } = applyItemUse(context, sessionWithItem("zebra"), PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "extra-turn" });
    expect(session.players[0].hasExtraTurn).toBe(true);
  });

  it("challa(厄災の神を押し付け)は自分が持っていなければ何も起きない", () => {
    const { result } = applyItemUse(context, sessionWithItem("challa"), PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "repelled-spirit", toPlayerId: null });
  });

  it("challaは自分が厄災の神を持っていれば最も近い他プレイヤーへ移す", () => {
    let session = sessionWithItem("challa");
    session = { ...session, misfortune: attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")) };
    const { session: after, result } = applyItemUse(context, session, PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "repelled-spirit", toPlayerId: "p2" });
    expect(after.misfortune.holderId).toBe("p2");
  });

  it("coca/pacha(none)は雰囲気のみで効果がない", () => {
    const { result } = applyItemUse(context, sessionWithItem("pacha"), PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "no-effect" });
  });
});
