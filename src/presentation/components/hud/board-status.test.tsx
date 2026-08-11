import { beforeAll, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { GameSession, createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../../application/game-engine-context";
import { LocaleProvider } from "../../i18n/locale-context";
import { LocaleSwitch } from "./locale-switch";
import { PLAYER_COLORS } from "../player-colors";
import { BoardStatus } from "./board-status";

/**
 * ユーザーからの報告:
 * 「CPUの手番なのに『You are at X』と出るので、自分の位置の話に読める」。
 *
 * この枠は**手番の人が誰であっても同じ形で出る。**だから
 * 文からは人を外し、誰の話かは色と名前の札で外に出した。
 * ここではその2つを固定する——**札が手番の人を指していること**と、
 * **文に二人称が残っていないこと。**
 */
describe("BoardStatus", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
  });

  function sessionWithActive(activePlayerIndex: number): GameSession {
    const session = createGameSession({
      id: GameSessionId("s"),
      countryId: CountryId("bolivia"),
      maxMonths: 12,
      players: [
        createPlayer({ id: PlayerId("p1"), name: "You", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("lapaz") }),
        createPlayer({ id: PlayerId("p2"), name: "CPU 1", isCpu: true, startingCash: Money.of(1000), startingNode: NodeId("oruro") }),
      ],
      destination: CityId("sucre"),
    });
    return { ...session, activePlayerIndex };
  }

  /** ブラウザは `#e8447a` を `rgb(232, 68, 122)` に直して返すので、比べる形をそろえる。 */
  function rgb(hex: string): string {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return `rgb(${r}, ${g}, ${b})`;
  }

  function renderStatus(activePlayerIndex: number) {
    render(
      <LocaleProvider>
        <LocaleSwitch />
        <BoardStatus context={context} session={sessionWithActive(activePlayerIndex)} />
      </LocaleProvider>,
    );
    return document.querySelector(".board-status-who") as HTMLElement;
  }

  it("人間の手番では、その人の名前と色の札が付く", () => {
    const badge = renderStatus(0);
    expect(badge).toHaveTextContent("You");
    expect(badge.querySelector(".cpu-tag")).toBeNull();
    expect(badge.style.borderColor).toBe(rgb(PLAYER_COLORS[0]));
  });

  // これが今回の報告そのもの。CPUの手番でも自分の話に見えていた。
  it("CPUの手番では、CPUの名前と色の札が付く", () => {
    const badge = renderStatus(1);
    expect(badge).toHaveTextContent("CPU 1");
    // CPUだと分かる印も出す。色だけに頼らせない。
    expect(badge.querySelector(".cpu-tag")).not.toBeNull();
    expect(badge.style.borderColor).toBe(rgb(PLAYER_COLORS[1]));
    // 位置もCPUのもの(オルロ)。人間のいるラパスではない。
    expect(screen.getByText(/Oruro/)).toBeInTheDocument();
  });

  it.each([
    ["EN", /\b(You|you)\b/],
    ["ES", /\b(Estás|Tú|tu)\b/],
    ["FR", /\b(Tu|Toi|toi)\b/],
  ])("%s: 手番の人を指す文に二人称を混ぜない", (language, secondPerson) => {
    renderStatus(1);
    fireEvent.click(screen.getByRole("button", { name: language }));

    // 名前の札を除いた「文」の部分だけを見る(札の中の名前は二人称ではない)。
    const line = document.querySelector(".board-status-line") as HTMLElement;
    const badge = line.querySelector(".board-status-who")!;
    const sentence = line.textContent!.replace(badge.textContent!, "");
    expect(sentence, `${language}: ${sentence}`).not.toMatch(secondPerson);
  });

  // 色は駒・旅人一覧と同じ並びから引く。どこで見ても同じ人が同じ色でないと、
  // 色は名前の代わりにならない。
  it("色は旅人の並び順どおり", () => {
    expect(PLAYER_COLORS.length).toBeGreaterThanOrEqual(4);
    expect(renderStatus(0).style.borderColor).toBe(rgb(PLAYER_COLORS[0]));
  });
});
