import { describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, ItemKey, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { addItem, createPlayer } from "../../../domain/player/player";
import { attachToFarthestPlayer, INITIAL_MISFORTUNE_STATE } from "../../../domain/misfortune/misfortune-spirit";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { createGameEngineContext } from "../../game-engine-context";
import { DeterministicRandom } from "../../../../tests/fakes/deterministic-random";
import { useItem } from "./use-item.use-case";

describe("useItem (実データ: ボリビアの9アイテム)", () => {
  const repo = new JsonCountryContentRepository();
  const context = createGameEngineContext(repo.load(CountryId("bolivia")));

  function sessionWithItem(itemKey: string) {
    let p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("lapaz") });
    p1 = addItem(p1, ItemKey(itemKey));
    const p2 = createPlayer({ id: PlayerId("p2"), name: "B", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("e0_1") });
    return createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1, p2], destination: CityId("sucre") });
  }

  it("ekeko(move)は目的地へのテレポートを要求する", () => {
    const { session, result } = useItem(context, sessionWithItem("ekeko"), PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "teleport-to-destination" });
    expect(session.players[0].inventory).toHaveLength(0);
  });

  it("pass(choose-exact-dice)はUIでの選択待ちを返す", () => {
    const { result } = useItem(context, sessionWithItem("pass"), PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "await-exact-dice-choice" });
  });

  it("ferro(2個振る)はサイコロを2つ振って合計を返す", () => {
    const random = new DeterministicRandom([2, 4]); // -> 3,5
    const { result } = useItem(context, sessionWithItem("ferro"), PlayerId("p1"), 0, random);
    expect(result).toEqual({ type: "rolled", steps: 8, rolls: [3, 5] });
  });

  it("expreso(3個振る)はサイコロを3つ振って合計を返す", () => {
    const random = new DeterministicRandom([0, 0, 0]); // -> 1,1,1
    const { result } = useItem(context, sessionWithItem("expreso"), PlayerId("p1"), 0, random);
    expect(result).toEqual({ type: "rolled", steps: 3, rolls: [1, 1, 1] });
  });

  it("singani(現金+380)は即座に現金を得る", () => {
    const { session, result } = useItem(context, sessionWithItem("singani"), PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "gained-cash", amount: 380 });
    expect(session.players[0].cash.amount).toBe(1380);
  });

  it("zebra(もう1回)はhasExtraTurnを立てる", () => {
    const { session, result } = useItem(context, sessionWithItem("zebra"), PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "extra-turn" });
    expect(session.players[0].hasExtraTurn).toBe(true);
  });

  it("challa(厄災の神を押し付け)は自分が持っていなければ何も起きない", () => {
    const { result } = useItem(context, sessionWithItem("challa"), PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "repelled-spirit", toPlayerId: null });
  });

  it("challaは自分が厄災の神を持っていれば最も近い他プレイヤーへ移す", () => {
    let session = sessionWithItem("challa");
    session = { ...session, misfortune: attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")) };
    const { session: after, result } = useItem(context, session, PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "repelled-spirit", toPlayerId: "p2" });
    expect(after.misfortune.holderId).toBe("p2");
  });

  it("coca/pacha(none)は雰囲気のみで効果がない", () => {
    const { result } = useItem(context, sessionWithItem("pacha"), PlayerId("p1"), 0, new DeterministicRandom());
    expect(result).toEqual({ type: "no-effect" });
  });
});
