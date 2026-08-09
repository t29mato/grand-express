import { beforeEach, describe, expect, it } from "vitest";
import { CountryId, ItemKey, PlayerId } from "../../domain/shared-kernel/ids";
import { useGameStore } from "./game-store";

/**
 * **アイテムを実際に使って、何かが起きることを確かめる。**
 *
 * 時刻表(`choose-exact-dice`)は、ドメインが正しく `await-exact-dice-choice` を
 * 返していて**その単体テストもあった**のに、受け取る側に枝が無かったため
 * 「持ち物から消えるだけで何も起きない」状態だった。6盤面すべてで、
 * このアイテムは一度も動いたことがなかったことになる。
 *
 * ドメインの単体テストでは捕まらない。**使った結果、画面や局面が変わるか**まで
 * 見ないと分からないので、ストアを動かして確かめる。
 *
 * `useInventoryItem` の switch は `never` で網羅を強制してあるので、
 * **結果の種類を足すと型エラーになる**。ここでは「効果の種類ごとに、
 * 実際に何が起きるか」を押さえる。
 */
describe("アイテムを使うと、ちゃんと何かが起きる", () => {
  /** ボリビアには8種類の効果がすべて揃っている。 */
  const bolivia = CountryId("bolivia");

  async function startGame() {
    await useGameStore.getState().startNewGame({
      countryId: bolivia,
      players: [
        { name: "You", isCpu: false },
        { name: "CPU 1", isCpu: true },
      ],
      maxMonths: 12,
      cpuLevel: "normal",
    });
    useGameStore.setState({ ui: { kind: "idle" } });
  }

  /** 人間プレイヤーの持ち物を、そのアイテム1つだけにする。 */
  function giveItem(key: string) {
    const session = useGameStore.getState().session!;
    const me = session.players[0];
    useGameStore.setState({
      session: {
        ...session,
        players: session.players.map((p) => (p.id === me.id ? { ...p, inventory: [ItemKey(key)] } : p)),
      },
      ui: { kind: "idle" },
      diceRoll: null,
    });
    return me.id;
  }

  beforeEach(async () => {
    await startGame();
  });

  it("エケコ人形(carried-far)は、その場で運ばれて移動が終わる", () => {
    const before = useGameStore.getState().session!.players[0].location;
    giveItem("ekeko");
    useGameStore.getState().useInventoryItem(0);
    const after = useGameStore.getState().session!.players[0].location;
    expect(after, "運ばれていない").not.toBe(before);
  });

  it("テレフェリコ周遊券(choose-exact-dice)は、出目を選ぶ画面を出す", () => {
    giveItem("pass");
    useGameStore.getState().useInventoryItem(0);
    // ここが抜けていた。以前は ui が idle のままで、何も起きなかった。
    expect(useGameStore.getState().ui.kind, "出目を選ぶ画面が出ない").toBe("exact-dice");
  });

  it("選んだ出目が、そのままマスの候補になる", () => {
    giveItem("pass");
    useGameStore.getState().useInventoryItem(0);
    useGameStore.getState().chooseExactDiceValue(4);
    const ui = useGameStore.getState().ui;
    expect(ui.kind).toBe("choosing-square");
    if (ui.kind !== "choosing-square") return;
    expect(ui.steps, "選んだ数と違う").toBe(4);
    expect(ui.reachable.size, "行けるマスが1つも無い").toBeGreaterThan(0);
    // 候補は「ちょうど4マス先」でなければならない。
    for (const [, path] of ui.reachable) expect(path.length).toBe(4);
  });

  it("フェロブス切符(roll-fixed-dice)は、サイコロを振り始める", () => {
    giveItem("ferro");
    useGameStore.getState().useInventoryItem(0);
    expect(useGameStore.getState().ui.kind, "転がり始めていない").toBe("rolling");
    const roll = useGameStore.getState().diceRoll;
    expect(roll, "サイコロの演出が出ていない").not.toBeNull();
    expect(roll!.rolls.length, "2個振るはずが違う").toBe(2);
    expect(roll!.value, "合計が目と合っていない").toBe(roll!.rolls.reduce((a, b) => a + b, 0));
  });

  it("シンガニの乾杯(gain-cash)は、所持金を増やす", () => {
    const before = useGameStore.getState().session!.players[0].cash.amount;
    giveItem("singani");
    useGameStore.getState().useInventoryItem(0);
    expect(useGameStore.getState().session!.players[0].cash.amount, "増えていない").toBeGreaterThan(before);
  });

  it("シマウマの案内(extra-turn)は、もう1手番を立てる", () => {
    giveItem("zebra");
    useGameStore.getState().useInventoryItem(0);
    expect(useGameStore.getState().session!.players[0].hasExtraTurn, "もう1回が立っていない").toBe(true);
  });

  it("チャラの供物(repel-spirit)は、厄災を自分から手放す", () => {
    const me = giveItem("challa");
    // 厄災を自分に背負わせてから使う(持っていないと何も起きない効果なので)。
    const session = useGameStore.getState().session!;
    useGameStore.setState({
      session: { ...session, misfortune: { ...session.misfortune, holderId: me, level: 1 } },
    });
    useGameStore.getState().useInventoryItem(0);
    const after = useGameStore.getState().session!.misfortune;
    expect(after.holderId, "厄災が自分に残ったまま").not.toBe(me);
  });

  it.each([["coca"], ["pacha"]])("%s は使うものではなく、自動で効く持ちもの", (key) => {
    // 受け身のアイテムは押せない作りなので、押して何も起きなくても不具合ではない。
    // 取り違えないよう、種別として受け身であることをここで押さえておく。
    const context = useGameStore.getState().context!;
    const item = context.content.items.find((i) => i.key === key)!;
    expect(item.kind, `${key} が受け身になっていない`).toBe("passive");
  });

  it("どのアイテムも、使えば必ず持ち物から消える", () => {
    for (const key of ["ekeko", "pass", "ferro", "challa", "zebra", "singani", "expreso"]) {
      startGameSync();
      giveItem(key);
      useGameStore.getState().useInventoryItem(0);
      expect(useGameStore.getState().session!.players[0].inventory, `${key} が残っている`).toEqual([]);
    }
  });

  /** 上のループ用。`beforeEach` の局面をそのまま使い回すと厄災などが混ざる。 */
  function startGameSync() {
    const session = useGameStore.getState().session!;
    useGameStore.setState({
      session: {
        ...session,
        players: session.players.map((p) => ({ ...p, location: session.players[0].location })),
        misfortune: { ...session.misfortune, holderId: null as unknown as PlayerId, level: 0 },
      },
      ui: { kind: "idle" },
      diceRoll: null,
    });
  }
});
