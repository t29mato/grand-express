import { beforeEach, describe, expect, it, vi } from "vitest";
import { CityId, CountryId, NodeId } from "../../domain/shared-kernel/ids";
import { isCityNode } from "../../domain/board/node";
import { useGameStore } from "./game-store";

/**
 * **目的地に着いたら、まず全画面で「着いた」ことを見せる。**
 *
 * 到達はこの遊びの最大の見せ場なのに、これまでは町の買い物の画面が開くだけで、
 * 着いたこと自体を見せる場面が無かった。順番は
 * **到達の演出 →(町のモーダル)→ 次の区間の案内。**
 *
 * 絵(`modals/arrival-fanfare.tsx`)は別の担当が作る。ここで押さえるのは
 * **状態の並びと、演出に渡す値**。
 */
describe("目的地に着いたときの流れ", () => {
  async function startGame() {
    await useGameStore.getState().startNewGame({
      countryId: CountryId("bolivia"),
      players: [
        { name: "You", isCpu: false },
        { name: "CPU 1", isCpu: true },
      ],
      maxMonths: 12,
      cpuLevel: "normal",
    });
    useGameStore.setState({ ui: { kind: "idle" }, walk: null, diceRoll: null });
  }

  /**
   * 人間の駒の近くにある町を目的地にして、そこへ着く一歩手前まで局面を整える。
   * 戻り値はその町(=これから着く目的地)。
   */
  function aimAtNearbyCity(): { cityId: CityId; nodeId: NodeId } {
    const { context, session } = useGameStore.getState();
    const from = session!.players[0].location;
    for (let steps = 1; steps <= 6; steps++) {
      const reach = context!.pathfinding.reachableNodes(from, steps);
      for (const [nodeId] of reach) {
        const node = context!.getNode(nodeId);
        if (!isCityNode(node) || nodeId === from) continue;
        useGameStore.setState({
          session: { ...session!, activePlayerIndex: 0, destination: node.cityId },
          ui: { kind: "choosing-square", steps, reachable: reach },
          walk: null,
        });
        return { cityId: node.cityId, nodeId };
      }
    }
    throw new Error("近くに町が見つからない(盤面データが変わった?)");
  }

  async function settleWalk() {
    await vi.waitFor(() => expect(useGameStore.getState().walk).toBeNull(), { timeout: 5000, interval: 20 });
  }

  beforeEach(async () => {
    await startGame();
  });

  it("着いた瞬間は、町ではなく到達の演出になる", async () => {
    const target = aimAtNearbyCity();
    useGameStore.getState().chooseSquare(target.nodeId);
    await settleWalk();

    const ui = useGameStore.getState().ui;
    expect(ui.kind, "町の画面がいきなり開いている").toBe("arrival");
    if (ui.kind !== "arrival") return;
    expect(ui.playerName).toBe("You");
    expect(ui.playerIndex, "旅人の色を引くための番号").toBe(0);
    expect(ui.cityId).toBe(target.cityId);
    expect(ui.prize, "賞金が入っていない").toBeGreaterThan(0);
    expect(ui.isFirstArrival, "この旅で初めての到達なのに false").toBe(true);
  });

  it("到達の演出を閉じると町へ、町を閉じると次の区間の案内へ進む", async () => {
    const target = aimAtNearbyCity();
    useGameStore.getState().chooseSquare(target.nodeId);
    await settleWalk();
    const arrival = useGameStore.getState().ui;
    if (arrival.kind !== "arrival") throw new Error("到達の演出が出ていない");

    useGameStore.getState().dismissArrival();
    const city = useGameStore.getState().ui;
    expect(city.kind).toBe("city");
    if (city.kind !== "city") return;
    expect(city.cityId).toBe(target.cityId);
    expect(city.arrivalPrize, "町の画面に賞金が渡っていない").toBe(arrival.prize);

    useGameStore.getState().closeCityModal();
    expect(useGameStore.getState().ui.kind, "次の区間の案内が出ない").toBe("next-leg");
  });

  /**
   * CPUの手番では、手番を進めるのはCPUループの仕事。
   * ここで町を開いてしまうと、人間がCPUの買い物を操作できてしまう。
   */
  it("CPUの手番で閉じたときは、CPUの待ちを解くだけ", () => {
    const session = useGameStore.getState().session!;
    useGameStore.setState({
      session: { ...session, activePlayerIndex: 1 },
      ui: {
        kind: "arrival",
        playerName: "CPU 1",
        playerIndex: 1,
        cityId: session.destination,
        prize: 700,
        isFirstArrival: true,
      },
    });
    useGameStore.getState().dismissArrival();
    const ui = useGameStore.getState().ui;
    expect(ui.kind).toBe("cpu-turn");
    if (ui.kind !== "cpu-turn") return;
    expect(ui.playerName).toBe("CPU 1");
  });
});
