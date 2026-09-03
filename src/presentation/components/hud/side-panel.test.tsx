import { beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ItemBar, TravelLog } from "./side-panel";
import { LocaleProvider } from "../../i18n/locale-context";
import { CityId, CountryId, GameSessionId, ItemKey, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { addItem, createPlayer } from "../../../domain/player/player";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../../application/game-engine-context";

describe("TravelLog", () => {
  it("ログエントリを新しい順に表示する", () => {
    render(
      <LocaleProvider>
        <TravelLog
          log={[
            { id: 2, key: "second", args: [], tone: "good" },
            { id: 1, key: "first", args: [], tone: "neutral" },
          ]}
        />
      </LocaleProvider>,
    );
    const items = screen.getAllByText(/first|second/);
    expect(items[0]).toHaveTextContent("second");
    expect(items[1]).toHaveTextContent("first");
  });

  it("ログが空でも見出しは表示される", () => {
    render(
      <LocaleProvider>
        <TravelLog log={[]} />
      </LocaleProvider>,
    );
    expect(screen.getByText("Travel log")).toBeInTheDocument();
  });
});

describe("ItemBar", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
  });

  /** `inventory` を持った人間プレイヤーの手番のセッションを作る。 */
  function sessionWith(inventory: string[], { isCpu = false } = {}) {
    let p1 = createPlayer({
      id: PlayerId("p1"),
      name: "A",
      isCpu,
      startingCash: Money.of(1000),
      startingNode: NodeId("lapaz"),
    });
    for (const key of inventory) p1 = addItem(p1, ItemKey(key));
    const p2 = createPlayer({
      id: PlayerId("p2"),
      name: "B",
      isCpu: false,
      startingCash: Money.of(1000),
      startingNode: NodeId("e0_1"),
    });
    return createGameSession({
      id: GameSessionId("s"),
      countryId: CountryId("bolivia"),
      maxMonths: 12,
      players: [p1, p2],
      destination: CityId("sucre"),
    });
  }

  function renderBar(inventory: string[], options?: { isCpu?: boolean }) {
    const onUseItem = vi.fn();
    render(
      <LocaleProvider>
        <ItemBar context={context} session={sessionWith(inventory, options)} onUseItem={onUseItem} />
      </LocaleProvider>,
    );
    return onUseItem;
  }

  // これがこの欄の存在意義。以前は効果を `title` に隠していて、
  // 触る画面では読めなかった(= 説明が無いのと同じだった)。
  it("効果の説明がホバーなしで読める", () => {
    renderBar(["pacha"]);
    // 文言は legacy の「正解にする」から差し替えてある。本作は学習が目的なので
    // **正誤は変えず損失だけを肩代わりする**(`answer-quiz.use-case.ts` の意図的な変更)。
    // 以前はここが legacy のままの説明を守っていて、嘘の説明が固定されていた。
    expect(screen.getByText("Your next wrong answer costs you nothing — but it is still wrong.")).toBeVisible();
  });

  it("使えるアイテムはボタンで、押すと使用が呼ばれる", () => {
    const onUseItem = renderBar(["zebra"]);
    const button = screen.getByRole("button", { name: /Zebra Guide/ });
    fireEvent.click(button);
    expect(onUseItem).toHaveBeenCalledWith(0);
  });

  it("passiveなアイテムは押せず、自動で効くことが書かれている", () => {
    renderBar(["pacha"]);
    expect(screen.queryByRole("button", { name: /Pachamama/ })).toBeNull();
    expect(screen.getByText("Automatic")).toBeVisible();
  });

  // CPUの持ちものを見ているときに「使う」と出ていると、押せるように見えてしまう。
  it("CPUの持ちものには「使う」を出さない", () => {
    renderBar(["zebra"], { isCpu: true });
    expect(screen.getByText("Zebra Guide")).toBeVisible();
    expect(screen.queryByText("Use")).toBeNull();
  });

  /**
   * **サイドバーの主役は、いつも画面の前の人。**
   * CPUの手番のあいだ、この欄がCPUの持ちものに切り替わって
   * 自分の持ちものが見えなくなっていた(実プレイの記録 2026-09-02)。
   */
  it("CPUの手番でも、自分の持ちものが主役のまま残る", () => {
    // p1 = CPU(手番)、p2 = 人間。人間の側に持ちものを渡す。
    let cpu = createPlayer({
      id: PlayerId("p1"),
      name: "CPU 1",
      isCpu: true,
      startingCash: Money.of(1000),
      startingNode: NodeId("lapaz"),
    });
    cpu = addItem(cpu, ItemKey("zebra"));
    let human = createPlayer({
      id: PlayerId("p2"),
      name: "You",
      isCpu: false,
      startingCash: Money.of(1000),
      startingNode: NodeId("e0_1"),
    });
    human = addItem(human, ItemKey("pacha"));
    const session = createGameSession({
      id: GameSessionId("s"),
      countryId: CountryId("bolivia"),
      maxMonths: 12,
      players: [cpu, human],
      destination: CityId("sucre"),
    });
    render(
      <LocaleProvider>
        <ItemBar context={context} session={{ ...session, activePlayerIndex: 0 }} onUseItem={vi.fn()} />
      </LocaleProvider>,
    );
    // 自分の持ちものは、説明つきの札のまま残っている。
    expect(screen.getByText("Pachamama Blessing")).toBeVisible();
    // 手番の人(CPU)の持ちものは、名前だけ小さく添える。
    expect(screen.getByText("Held by CPU 1")).toBeVisible();
    expect(screen.getByText(/Zebra Guide/)).toBeVisible();
  });

  it("同じアイテムを2つ持っていても、押した側の位置が渡る", () => {
    const onUseItem = renderBar(["pacha", "zebra"]);
    fireEvent.click(screen.getByRole("button", { name: /Zebra Guide/ }));
    expect(onUseItem).toHaveBeenCalledWith(1);
  });
});
