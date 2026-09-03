import { beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { CountryId, GameSessionId, PropertyIndex, PropertyRef } from "../../../domain/shared-kernel/ids";
import { GameSession, replacePlayers } from "../../../domain/game-session/game-session";
import { Money } from "../../../domain/shared-kernel/money";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../../application/game-engine-context";
import { startGame } from "../../../application/use-cases/start-game/start-game.use-case";
import { endGame } from "../../../application/use-cases/end-game/end-game.use-case";
import { FixedRandom } from "../../../../tests/fakes/deterministic-random";
import { LocaleProvider } from "../../i18n/locale-context";
import { formatMoney } from "../../i18n/money-format";
import { GameOverModal } from "./game-over-modal";

// 表彰式が鳴らす音は、jsdom には出せないので黙らせる。
vi.mock("../../state/game-store-dependencies", () => ({
  soundAdapter: { playWin: vi.fn(), playFanfare: vi.fn() },
}));

/**
 * 旅の終わりの順位。12ヶ月を走りきったことが報われる画面になっているか——
 * 1位が大きく出て、順位の一覧に内訳と独占した町の名前が出ることを見る。
 *
 * 表彰(`awards`)があると先に表彰式が出る(物件王など)。ここでは
 * 表彰を最後までめくってから順位の画面を見る。
 */
describe("GameOverModal", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;
  let session: GameSession;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    session = startGame(context, new FixedRandom(0), {
      countryId: CountryId("bolivia"),
      players: [
        { name: "You", isCpu: false },
        { name: "Illimani", isCpu: true },
      ],
      maxMonths: 12,
      cpuLevel: "normal",
      sessionId: GameSessionId("s1"),
    });
  });

  /** 2人目が町を丸ごと持って勝つ盤面。1人目は現金だけ。 */
  function richSession(): GameSession {
    const city = context.content.cities[0];
    const portfolio = new Map<PropertyRef, 1>();
    for (let i = 0; i < city.properties.length; i++) portfolio.set(PropertyRef.of(city.id, PropertyIndex(i)), 1);
    const [a, b] = session.players;
    return replacePlayers(session, [
      { ...a, cash: Money.of(500) },
      { ...b, cash: Money.of(900), portfolio },
    ]);
  }

  function renderModal(s: GameSession) {
    const outcome = endGame(context, s);
    render(
      <LocaleProvider>
        <GameOverModal outcome={outcome} currency={context.content.currency} context={context} onPlayAgain={() => {}} />
      </LocaleProvider>,
    );
    // 表彰式を最後までめくる(「次の賞」→ … →「そして優勝は…」)。
    for (let i = 0; i < 10 && screen.queryByTestId("award-ceremony-modal"); i++) {
      fireEvent.click(screen.getByRole("button", { name: /Next award|And the winner/ }));
    }
    return outcome;
  }

  it("表彰をめくり終えると順位が出て、1位を札で大きく出す", () => {
    const outcome = renderModal(richSession());
    // 物件を持つのは1人だけなので物件王が出る=表彰式を経て順位へ来ている。
    expect(outcome.awards.length).toBeGreaterThan(0);
    expect(screen.getByTestId("game-over-modal")).toBeInTheDocument();
    // 1位は見出しとして名前が出る(「あなたの勝ち」とは書かない)。
    expect(screen.getByRole("heading", { name: /Illimani/ })).toBeInTheDocument();
    expect(screen.getByText("Winner")).toBeInTheDocument();
    expect(screen.getByTestId("game-over-modal").textContent).not.toMatch(/\byou win\b/i);
  });

  it("順位の一覧に、順位・内訳・独占した町の名前・記録を出す", () => {
    const outcome = renderModal(richSession());
    const rows = screen.getAllByTestId("finale-row");
    expect(rows).toHaveLength(2);
    // 総資産の多い順。
    expect(within(rows[0]).getByText("1")).toBeInTheDocument();
    expect(within(rows[0]).getByText("Illimani")).toBeInTheDocument();
    expect(within(rows[1]).getByText("2")).toBeInTheDocument();
    expect(within(rows[1]).getByText("You")).toBeInTheDocument();
    // 現金と物件の内訳。
    const money = (n: number) => formatMoney(n, context.content.currency);
    const top = outcome.ranking[0];
    expect(rows[0].textContent).toContain(`Cash ${money(top.player.cash.amount)}`);
    expect(rows[0].textContent).toContain(`Businesses ${money(top.netWorth - top.player.cash.amount)}`);
    // 町を丸ごと持っているので、その町の名前が出る。
    const townName = context.content.cities[0].name.en;
    expect(within(rows[0]).getByText(`Whole towns: ${townName}`)).toBeInTheDocument();
    // 物件の無い人には「物件なし」と言い、独占の行は出さない。
    expect(rows[1].textContent).toContain("No businesses");
    expect(rows[1].textContent).not.toContain("Whole towns");
    // 目的地とクイズの記録。
    expect(rows[0].textContent).toContain("0 destinations · 0 quiz answers right");
  });

  it("走りきった月数を言う", () => {
    renderModal(richSession());
    expect(screen.getByText("12 months on the rails — the journey is complete.")).toBeInTheDocument();
  });
});
