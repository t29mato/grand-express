import { beforeAll, describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, ItemKey, PlayerId, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { addItem, createPlayer } from "../../../domain/player/player";
import { attachToFarthestPlayer, INITIAL_MISFORTUNE_STATE, setResting } from "../../../domain/misfortune/misfortune-spirit";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../game-engine-context";
import { DeterministicRandom, FixedRandom } from "../../../../tests/fakes/deterministic-random";
import { resolveMisfortuneStrike } from "./resolve-misfortune-strike.use-case";

describe("resolveMisfortuneStrike (実データ: ボリビア)", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;
  let startCity: CityId;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    startCity = context.content.startCityId;
  });

  function session() {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(1000), startingNode: cityIdToNodeId(startCity) });
    const p2 = createPlayer({ id: PlayerId("p2"), name: "B", isCpu: false, startingCash: Money.of(1000), startingNode: cityIdToNodeId(startCity) });
    return createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1, p2], destination: startCity });
  }

  it("憑いていなければ何も起きない", () => {
    const { result } = resolveMisfortuneStrike(context, session(), PlayerId("p1"), new FixedRandom(0, 0));
    expect(result).toEqual({ type: "not-afflicted" });
  });

  it("resting中なら1回だけ見送られる", () => {
    let s = session();
    s = { ...s, misfortune: setResting(attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1"))) };
    const { session: after, result } = resolveMisfortuneStrike(context, s, PlayerId("p1"), new FixedRandom(0, 0.5));
    expect(result).toEqual({ type: "rested" });
    expect(after.misfortune.resting).toBe(false);
  });

  it("ward(coca)を持っていれば発動を防ぎ、消費される", () => {
    let s = session();
    s = { ...s, misfortune: attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")) };
    s = { ...s, players: s.players.map((p) => (p.id === "p1" ? addItem(p, ItemKey("coca")) : p)) };
    const { session: after, result } = resolveMisfortuneStrike(context, s, PlayerId("p1"), new FixedRandom(0, 0.5));
    expect(result).toEqual({ type: "warded", wasKing: false });
    expect(after.players[0].inventory).toHaveLength(0);
  });

  it("低確率でご機嫌になり現金を得る", () => {
    let s = session();
    s = { ...s, misfortune: attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")) };
    const random = new DeterministicRandom([50], [0.01]); // 0.01 < 0.08 -> pleased
    const { session: after, result } = resolveMisfortuneStrike(context, s, PlayerId("p1"), random);
    expect(result.type).toBe("pleased");
    if (result.type === "pleased") {
      expect(result.amount).toBe(250); // 200 + 50
      expect(after.players[0].cash.amount).toBe(1250);
    }
  });

  it("それ以外は災難が発動する(7種のいずれか)", () => {
    let s = session();
    s = { ...s, misfortune: attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")) };
    const random = new DeterministicRandom([0, 0, 0], [0.5]); // 0.5 >= 0.08 -> struck
    const { result } = resolveMisfortuneStrike(context, s, PlayerId("p1"), random);
    expect(result.type).toBe("struck");
    if (result.type === "struck") {
      expect(context.content.doomFlavors.map((f) => f.effectId)).toContain(result.outcome.effectId);
    }
  });

  it("同じ相手に4ターン居座るとking化する", () => {
    let s = session();
    s = { ...s, misfortune: attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")) };
    const random = new DeterministicRandom([0], [0.5]);
    for (let i = 0; i < 3; i++) {
      s = resolveMisfortuneStrike(context, s, PlayerId("p1"), random).session;
    }
    const fourth = resolveMisfortuneStrike(context, s, PlayerId("p1"), random);
    if (fourth.result.type === "struck") {
      expect(fourth.result.wasKing).toBe(true);
    }
  });

  /**
   * 「この国は初めて」の人の最初の1年だけ、連続を2回で止める(`doom-relief.ts`)。
   * 実プレイで3手番連続の被害が出たことへの救済。
   */
  describe("はじめての人への救済", () => {
    function afflictedNewcomer(turnsOnCurrentHolder: number, month = 0) {
      const s = session();
      const players = s.players.map((p) => (p.id === "p1" ? { ...p, knowledgeLevel: "newcomer" as const } : p));
      return {
        ...s,
        month,
        players,
        misfortune: { ...attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")), turnsOnCurrentHolder },
      };
    }

    it("3回目からは災難を見送る", () => {
      const { session: after, result } = resolveMisfortuneStrike(
        context,
        afflictedNewcomer(2),
        PlayerId("p1"),
        new FixedRandom(0, 0.5),
      );
      expect(result).toEqual({ type: "spared" });
      // 所持金は減っていない。
      expect(after.players[0].cash.amount).toBe(1000);
      // **居座りの数えも進めない**(見送った手番が大厄災への歩数に入らない)。
      expect(after.misfortune.turnsOnCurrentHolder).toBe(2);
      expect(after.misfortune.level).toBe(1);
    });

    it("2回目までは、そのまま災難が起きる", () => {
      const { result } = resolveMisfortuneStrike(
        context,
        afflictedNewcomer(1),
        PlayerId("p1"),
        new FixedRandom(0, 0.5),
      );
      expect(result.type).toBe("struck");
    });

    it("2年目に入ると救済は切れる", () => {
      const { result } = resolveMisfortuneStrike(
        context,
        afflictedNewcomer(4, 12),
        PlayerId("p1"),
        new FixedRandom(0, 0.5),
      );
      expect(result.type).toBe("struck");
    });
  });
});
