import { beforeEach, describe, expect, it, vi } from "vitest";
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

  /**
   * エケコが運ぶ最小のマス数。
   * 出所は `src/infrastructure/content/item-effect-rules.ts` の
   * `ekeko: { type: "carried-far", minSteps: 8, maxSteps: 12 }`。
   * ここから直接読むと presentation が infrastructure に依ることになるので写す。
   */
  const EKEKO_MIN_STEPS = 8;

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
      walk: null,
    });
    return me.id;
  }

  /**
   * 駒が道のりを歩き終わるまで待つ。
   *
   * 運ばれるアイテム(`carried-far`)は、**押した瞬間には移動が終わらない。**
   * 8〜12マスぶんを1マスずつ進み、**着いてから**盤の状態と着地の処理が動く。
   * そうしないと着地のモーダルが移動と同じ瞬間に開き、暗幕の下で駒が滑るので
   * 「8〜12マス運ばれる」という**このアイテムの見せ場が一度も見えない**
   * (直す前に実測: モーダルが開くのは押してから95〜202ms、駒の位置が変わるのと同じフレーム)。
   *
   * 歩いている最中は `useInventoryItem` が受け付けないので、**待たずに次へ進むと
   * 歩き残しが次のテストに漏れて、そちらが道連れで落ちる。**
   */
  async function settleWalk() {
    await vi.waitFor(() => expect(useGameStore.getState().walk).toBeNull(), { timeout: 5000, interval: 20 });
  }

  beforeEach(async () => {
    await startGame();
  });

  /**
   * **テスト名を「その場で運ばれて移動が終わる」から変えている。**
   * その場で終わってしまうのが、遊ぶ人から見た不具合のほうだった
   * (押した瞬間に着地のモーダルが開き、8〜12マスの道のりが一度も見えない)。
   * 直したので、**押した瞬間はまだ動いていないこと**もここで押さえる。
   */
  it("エケコ人形(carried-far)は、道のりを進んでから移動が終わる", async () => {
    const before = useGameStore.getState().session!.players[0].location;

    /**
     * 通ったマスを控えておく。
     *
     * **「移動先が変わったか」では確かめられない。**エケコは向きを選べず、
     * 8〜12マスの経路は元の町へ戻ってくることがある(行き先を選ぶ
     * `reachableNodes` は**出発点そのものを含みうる**)。一周して戻るのは
     * 遊びとして正しい結果なので、それで落ちるテストは嘘をつく。
     * 実際 2026-08-26 にCIで1度落ち、デプロイを止めた
     * (`expected 'lapaz' not to be 'lapaz'`)。
     *
     * ここで見たいのは**道のりが1マスずつ見えたか**なので、そちらを数える。
     */
    const walked: string[] = [];
    const unsubscribe = useGameStore.subscribe((state) => {
      const at = state.walk;
      // `walk` を変えない `set` でも呼ばれるので、続けて同じマスなら数えない。
      if (at && walked[walked.length - 1] !== at.nodeId) walked.push(at.nodeId);
    });

    giveItem("ekeko");
    useGameStore.getState().useInventoryItem(0);
    expect(
      useGameStore.getState().session!.players[0].location,
      "押した瞬間に着いてしまっている(道のりを見せる間が無い)",
    ).toBe(before);
    expect(useGameStore.getState().walk, "駒が歩き始めていない").not.toBeNull();

    await settleWalk();
    unsubscribe();

    expect(walked.length, "道のりが1マスずつ見えていない").toBeGreaterThanOrEqual(EKEKO_MIN_STEPS);
    expect(
      useGameStore.getState().session!.players[0].location,
      "最後に見せたマスと、着いた先が食い違う",
    ).toBe(walked[walked.length - 1]);
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

  /**
   * **誰に押し付けたかを言うこと。**局面は変わっていたのに、それをどこにも
   * 出していなかった(旅人一覧の👹が動いたことに気づくしかなかった)。
   * `toPlayerId` は返ってきているのに受け皿が捨てていた。
   *
   * すれ違いで移るときは `passLog` が出てトーストにも載る。**同じ出来事**なので、
   * 同じ行を出す。片方の経路にだけ有って、もう片方に無いのが元の状態だった。
   */
  it("厄災を押し付けたら、誰に移ったかを旅の記録に出す", () => {
    const me = giveItem("challa");
    const session = useGameStore.getState().session!;
    const target = session.players.find((p) => p.id !== me)!;
    useGameStore.setState({
      session: { ...session, misfortune: { ...session.misfortune, holderId: me, level: 1 } },
      log: [],
    });
    useGameStore.getState().useInventoryItem(0);

    const passed = useGameStore.getState().log.filter((e) => e.key === "passLog");
    expect(passed.length, "誰に移ったかの行が出ていない").toBe(1);
    // 引数は [絵文字, 誰から, 誰へ]。すれ違いのときと同じ並び。
    expect(passed[0].args).toContain(target.name);
  });

  it.each([["coca"], ["pacha"]])("%s は使うものではなく、自動で効く持ちもの", (key) => {
    // 受け身のアイテムは押せない作りなので、押して何も起きなくても不具合ではない。
    // 取り違えないよう、種別として受け身であることをここで押さえておく。
    const context = useGameStore.getState().context!;
    const item = context.content.items.find((i) => i.key === key)!;
    expect(item.kind, `${key} が受け身になっていない`).toBe("passive");
  });

  it("どのアイテムも、使えば必ず持ち物から消える", async () => {
    for (const key of ["ekeko", "pass", "ferro", "challa", "zebra", "singani", "expreso"]) {
      startGameSync();
      giveItem(key);
      useGameStore.getState().useInventoryItem(0);
      expect(useGameStore.getState().session!.players[0].inventory, `${key} が残っている`).toEqual([]);
      // 歩いている駒を残したまま次のアイテムへ進むと、そちらが受け付けられずに落ちる。
      await settleWalk();
    }
  });

  /**
   * 上のループ用。`beforeEach` の局面をそのまま使い回すと厄災などが混ざる。
   *
   * **手番を人間(添字0)に戻すのを忘れない。**ここが抜けていて、
   * 「何も起きないマス」を入れた途端にループが落ちた。**アイテムの不具合ではない。**
   * それまでは着地すると必ずモーダルが開き、閉じるまで手番が進まなかったので、
   * 1周したあとも人間が手番を持ったままだった。何も起きないマスに止まると
   * モーダルが開かずそのまま手番が進むので、次の周では**CPUが手番を持っている。**
   * `useInventoryItem` は手番の人の持ち物に働くため、人間の持ち物は減らないまま
   * 「消えていない」と落ちる(実測: `activePlayerIndex` が 1 になっていた)。
   */
  function startGameSync() {
    const session = useGameStore.getState().session!;
    useGameStore.setState({
      session: {
        ...session,
        activePlayerIndex: 0,
        players: session.players.map((p) => ({ ...p, location: session.players[0].location })),
        misfortune: { ...session.misfortune, holderId: null as unknown as PlayerId, level: 0 },
      },
      ui: { kind: "idle" },
      diceRoll: null,
      walk: null,
    });
  }
});
