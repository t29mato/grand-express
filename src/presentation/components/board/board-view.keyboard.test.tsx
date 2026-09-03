import { beforeAll, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render } from "@testing-library/react";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { GameSession, createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../../application/game-engine-context";
import { LocaleProvider } from "../../i18n/locale-context";
import { BoardView } from "./board-view";

/**
 * 行き先を選んでいるあいだの、フォーカスが候補の上に**無い**ときのキー(F-18)。
 *
 * マウスでサイコロを押した人はフォーカスが body に落ちている(計測: use-turn-keys.ts)。
 * その状態で ←→ や Space を押しても何も起きず、キーがあるのか分からなかった。
 * 最初の1押しはいまの候補にフォーカスを移すだけで、**いきなり決めない**。
 *
 * 候補の上に乗ってからの矢印・Enter・Space は E2E(board-keyboard.spec.ts)が押している。
 */
describe("BoardView: 候補が出ているときのキー", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;
  let session: GameSession;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    session = createGameSession({
      id: GameSessionId("s"),
      countryId: CountryId("bolivia"),
      maxMonths: 12,
      players: [
        createPlayer({ id: PlayerId("p1"), name: "You", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("lapaz") }),
      ],
      destination: CityId("sucre"),
    });
    // jsdom には無いものを補う(盤面の実寸と、SVG の focus)。
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );
  });

  function reachableFrom(node: NodeId, steps: number): ReadonlySet<NodeId> {
    return new Set([...context.graph.nodes.keys()].filter((id) => id !== node && context.pathfinding.distance(node, id) === steps));
  }

  it("フォーカスが body のとき、→ はいまの候補へフォーカスを移すだけで決めない", () => {
    const onChooseNode = vi.fn();
    const reachable = reachableFrom(NodeId("lapaz"), 2);
    expect(reachable.size).toBeGreaterThan(0);
    render(
      <LocaleProvider>
        <BoardView context={context} session={session} reachable={reachable} steps={2} onChooseNode={onChooseNode} />
      </LocaleProvider>,
    );
    expect(document.activeElement).toBe(document.body);
    act(() => {
      fireEvent.keyDown(document.body, { key: "ArrowRight" });
    });
    expect(document.activeElement?.getAttribute("data-choosable")).toBe("true");
    expect(onChooseNode).not.toHaveBeenCalled();
  });

  it("フォーカスが body のとき、Space も候補へ移すだけ(振るのとは取り違えない)", () => {
    const onChooseNode = vi.fn();
    render(
      <LocaleProvider>
        <BoardView context={context} session={session} reachable={reachableFrom(NodeId("lapaz"), 2)} steps={2} onChooseNode={onChooseNode} />
      </LocaleProvider>,
    );
    act(() => {
      fireEvent.keyDown(document.body, { key: " " });
    });
    expect(document.activeElement?.getAttribute("data-choosable")).toBe("true");
    expect(onChooseNode).not.toHaveBeenCalled();
  });

  it("候補が無いときは何もしない", () => {
    render(
      <LocaleProvider>
        <BoardView context={context} session={session} reachable={null} />
      </LocaleProvider>,
    );
    act(() => {
      fireEvent.keyDown(document.body, { key: "ArrowRight" });
    });
    expect(document.activeElement).toBe(document.body);
  });
});
