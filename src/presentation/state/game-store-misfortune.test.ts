import { beforeEach, describe, expect, it, vi } from "vitest";
import { CountryId, PlayerId } from "../../domain/shared-kernel/ids";

/**
 * 厄災の神まわりの手番進行の試験。
 *
 * 本番で**厄災が一度起きるとゲームが進まなくなった**。
 * 旅の記録に「👹 rubi is struck by misfortune.」が延々と伸び続ける、という報告。
 *
 * 原因は手番の頭で毎回 `resolveMisfortuneStrike` を呼んでいたこと。
 * 災難のモーダルを閉じても厄災は憑いたままなので、**もう一度サイコロを押すと
 * また災難が起きる。**押すたびに繰り返し、いつまでもサイコロが振れない。
 *
 * ## 乱数を固定してある
 *
 * 災難の中身は乱数で選ばれ、**手番を飛ばすもの(skipTurn)とそれ以外**で
 * モーダルを閉じたあとの道が分かれる。固定しないと引き次第で結果が変わり、
 * 5回に2回落ちる試験になっていた(実際になった)。
 * ここでは災難の種類を名指しし、**2通りとも**確かめる。
 */

/** 乱数を差し替えられるようにする。`vi.mock` は巻き上げられるので `vi.hoisted` で作る。 */
const fake = vi.hoisted(() => {
  const state = { ints: [0] as number[], floats: [0.99] as number[], i: 0, f: 0 };
  return {
    state,
    random: {
      nextInt(n: number) {
        const value = state.ints[state.i % state.ints.length];
        state.i++;
        return value % Math.max(1, n);
      },
      nextFloat() {
        const value = state.floats[state.f % state.floats.length];
        state.f++;
        return value;
      },
    },
  };
});

vi.mock("./game-store-dependencies", async () => {
  const { JsonCountryContentRepository } = await import("../../infrastructure/content/json-country-content-repository");
  const { LocalStorageGameRepository } = await import("../../infrastructure/persistence/local-storage-game-repository");
  const silent = new Proxy({}, { get: () => async () => {} });
  return {
    contentRepository: new JsonCountryContentRepository(),
    gameRepository: new LocalStorageGameRepository(),
    random: fake.random,
    soundAdapter: silent,
  };
});

const { useGameStore } = await import("./game-store");

/**
 * 乱数を決め打ちにする。
 * `floats` を 0.99 にしておくと「お目こぼし」(8%)を引かない。
 * `ints` を災難の番号にすると、その災難だけが選ばれる。
 */
function scriptRandom(ints: number[], floats: number[] = [0.99]) {
  fake.state.ints = ints;
  fake.state.floats = floats;
  fake.state.i = 0;
  fake.state.f = 0;
}

async function startGame() {
  scriptRandom([0]);
  await useGameStore.getState().startNewGame({
    countryId: CountryId("bolivia"),
    players: [
      { name: "rubi", isCpu: false, knowledgeLevel: "familiar" },
      { name: "CPU 1", isCpu: true, knowledgeLevel: "familiar" },
    ],
    maxMonths: 12,
    cpuLevel: "normal",
  });
  useGameStore.getState().dismissIntro();
}

/** 手番の人に厄災を憑ける。お守りは持たせない(防がれると災難が起きない)。 */
function afflictCurrentPlayer() {
  const session = useGameStore.getState().session!;
  useGameStore.setState({
    session: {
      ...session,
      activePlayerIndex: 0,
      misfortune: {
        holderId: PlayerId(session.players[0].id),
        level: 1,
        turnsOnCurrentHolder: 0,
        resting: false,
        stuckTurnsRemaining: 0,
      },
      players: session.players.map((p, i) => (i === 0 ? { ...p, inventory: [] } : p)),
    },
    ui: { kind: "idle" },
  });
}

/** その効果を持つ災難の番号。`resolveMisfortuneStrike` はこの番号で災難を選ぶ。 */
function flavorIndexOf(effectId: string): number {
  const flavors = useGameStore.getState().context!.content.doomFlavors;
  const index = flavors.findIndex((f) => f.effectId === effectId);
  if (index < 0) throw new Error(`${effectId} の災難がボリビアに無い`);
  return index;
}

describe("厄災の神と手番の進行", () => {
  beforeEach(async () => {
    useGameStore.setState({ log: [], diceRoll: null });
    await startGame();
  });

  // 手番を飛ばさない災難。閉じたらそのままサイコロが振られること。
  it("手番が続く災難なら、閉じたあとそのままサイコロが振られる", () => {
    afflictCurrentPlayer();
    scriptRandom([flavorIndexOf("fine")]);

    useGameStore.getState().rollForHumanTurn();
    expect(useGameStore.getState().ui.kind).toBe("doom");

    useGameStore.getState().dismissDoom();

    // **`idle` に戻してはいけない。** 戻すとサイコロを押し直せてしまい、
    // 手番の頭の厄災判定がもう一度走って災難が繰り返す。
    const after = useGameStore.getState().ui.kind;
    expect(after, "手番の頭に戻ってしまった(押し直すと災難が再発する)").not.toBe("idle");
    expect(after).not.toBe("doom");
    expect(after).toBe("rolling");
  });

  // 手番を飛ばす災難。閉じたら次の人へ渡ること。
  it("手番を飛ばす災難なら、閉じたあと次の人へ進む", () => {
    afflictCurrentPlayer();
    scriptRandom([flavorIndexOf("skipTurn")]);

    useGameStore.getState().rollForHumanTurn();
    expect(useGameStore.getState().ui.kind).toBe("doom");

    useGameStore.getState().dismissDoom();

    expect(useGameStore.getState().ui.kind, "災難がもう一度出た").not.toBe("doom");
    expect(
      useGameStore.getState().session!.activePlayerIndex,
      "手番が飛ばされたのに、同じ人のままになっている",
    ).not.toBe(0);
  });

  it("何度サイコロを押しても、災難が繰り返し起きてログが伸び続けることはない", () => {
    afflictCurrentPlayer();
    scriptRandom([flavorIndexOf("fine")]);

    for (let i = 0; i < 8; i++) {
      if (useGameStore.getState().ui.kind === "doom") useGameStore.getState().dismissDoom();
      if (useGameStore.getState().ui.kind === "idle") useGameStore.getState().rollForHumanTurn();
    }

    const strikes = useGameStore.getState().log.filter((e) => e.key === "spiritStruckLog").length;
    expect(strikes, "同じ手番で災難が何度も起きている").toBeLessThanOrEqual(1);
  });
});
