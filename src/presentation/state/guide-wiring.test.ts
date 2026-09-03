import { beforeEach, describe, expect, it, vi } from "vitest";
import { CountryId, NodeId } from "../../domain/shared-kernel/ids";
import { KnowledgeLevel } from "../../domain/quiz/knowledge-level";
import { isCityNode } from "../../domain/board/node";
import { useGameStore } from "./game-store";

/**
 * 1行ガイド(`components/hud/first-turns-guide.tsx`)を出すための数え上げが、
 * 実際の操作でちゃんと動くか。
 *
 * 何を言うかの判断はコンポーネント側(`guideMessageKeyFor`)が持つので、
 * ここで見るのは**その材料が正しく貯まるか**だけ。
 */
describe("1行ガイドの進み具合", () => {
  async function startGame(knowledgeLevel: KnowledgeLevel) {
    await useGameStore.getState().startNewGame({
      countryId: CountryId("bolivia"),
      players: [
        { name: "You", isCpu: false, knowledgeLevel },
        { name: "CPU 1", isCpu: true },
      ],
      maxMonths: 12,
      cpuLevel: "normal",
    });
    useGameStore.setState({ ui: { kind: "idle" }, walk: null, diceRoll: null });
  }

  /** 人間の駒の近くにある、目的地ではない町へ着く一歩手前まで局面を整える。 */
  function aimAtNearbyTown(): NodeId {
    const { context, session } = useGameStore.getState();
    const from = session!.players[0].location;
    for (let steps = 1; steps <= 6; steps++) {
      const reach = context!.pathfinding.reachableNodes(from, steps);
      for (const [nodeId] of reach) {
        const node = context!.getNode(nodeId);
        if (!isCityNode(node) || nodeId === from) continue;
        if (node.cityId === session!.destination) continue;
        useGameStore.setState({
          session: { ...session!, activePlayerIndex: 0 },
          ui: { kind: "choosing-square", steps, reachable: reach },
          walk: null,
        });
        return nodeId;
      }
    }
    throw new Error("近くに目的地でない町が見つからない(盤面データが変わった?)");
  }

  async function settleWalk() {
    await vi.waitFor(() => expect(useGameStore.getState().walk).toBeNull(), { timeout: 5000, interval: 20 });
  }

  beforeEach(() => {
    useGameStore.getState().backToSetup();
  });

  it("旅の始めは何も進んでいない", async () => {
    await startGame("newcomer");
    expect(useGameStore.getState().guide).toEqual({
      turnsRolled: 0,
      cityHintOpen: false,
      cityHintDone: false,
      dismissed: false,
    });
  });

  it("「はじめて」の人が振るたびに、手番の数が増える", async () => {
    await startGame("newcomer");
    useGameStore.getState().rollForHumanTurn();
    expect(useGameStore.getState().guide.turnsRolled).toBe(1);
  });

  it("「はじめて」でない人の手番は数えない(ガイドを出さないので)", async () => {
    await startGame("familiar");
    useGameStore.getState().rollForHumanTurn();
    expect(useGameStore.getState().guide.turnsRolled).toBe(0);
  });

  it("初めての町を開くと物件の一言が立ち、閉じると下りる", async () => {
    await startGame("newcomer");
    const town = aimAtNearbyTown();
    useGameStore.getState().chooseSquare(town);
    await settleWalk();

    expect(useGameStore.getState().ui.kind).toBe("city");
    expect(useGameStore.getState().guide.cityHintOpen, "町の一言が立っていない").toBe(true);
    expect(useGameStore.getState().guide.cityHintDone).toBe(true);

    useGameStore.getState().closeCityModal();
    expect(useGameStore.getState().guide.cityHintOpen, "町を閉じても立ったまま").toBe(false);
  });

  it("町の一言は旅のあいだ1回だけ", async () => {
    await startGame("newcomer");
    const town = aimAtNearbyTown();
    useGameStore.getState().chooseSquare(town);
    await settleWalk();
    useGameStore.getState().closeCityModal();

    // 2つめの町。もう出さない。
    useGameStore.setState({ ui: { kind: "idle" } });
    const next = aimAtNearbyTown();
    useGameStore.setState({
      session: { ...useGameStore.getState().session!, activePlayerIndex: 0 },
    });
    useGameStore.getState().chooseSquare(next);
    await settleWalk();
    expect(useGameStore.getState().guide.cityHintOpen, "2つめの町でも出ている").toBe(false);
  });

  it("読み飛ばすと、町の一言も引っ込む", async () => {
    await startGame("newcomer");
    useGameStore.setState({ guide: { ...useGameStore.getState().guide, cityHintOpen: true } });
    useGameStore.getState().dismissGuide();
    expect(useGameStore.getState().guide.dismissed).toBe(true);
    expect(useGameStore.getState().guide.cityHintOpen).toBe(false);
  });

  it("新しい旅を始めたら、また最初から数え直す", async () => {
    await startGame("newcomer");
    useGameStore.getState().rollForHumanTurn();
    expect(useGameStore.getState().guide.turnsRolled).toBe(1);
    await startGame("newcomer");
    expect(useGameStore.getState().guide.turnsRolled).toBe(0);
  });
});
