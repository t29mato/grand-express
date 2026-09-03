import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { CityId, CountryId, GameSessionId, PropertyIndex, PropertyRef } from "../../../domain/shared-kernel/ids";
import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { Money } from "../../../domain/shared-kernel/money";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../../application/game-engine-context";
import { startGame } from "../../../application/use-cases/start-game/start-game.use-case";
import { buyProperty } from "../../../application/use-cases/property-transactions/property-transactions.use-case";
import { FixedRandom } from "../../../../tests/fakes/deterministic-random";
import { LocaleProvider } from "../../i18n/locale-context";
import { CITY_MESSAGES } from "../../i18n/city-messages";
import { CityModal, PEEK_DELAY_MS, PEEK_HOLD_MS } from "./city-modal";

/**
 * 町のモーダル。実データ(ボリビア)で描画し、
 * - 物件の数字が「価格」「収入」のラベル付きで出ること(F-16)
 * - 買った直後の行にはのぼりが立ち、売却ボタンが出ないこと(F-08)
 * - 売却が「押す → 本当に売る?」の2段になっていること(F-08)
 * - 買ったあと、モーダルが一瞬薄くなって地図を見せること(F-08)
 * を確かめる。
 */
describe("CityModal", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;
  let session: GameSession;
  let cityId: CityId;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    const started = startGame(context, new FixedRandom(0), {
      countryId: CountryId("bolivia"),
      players: [
        { name: "You", isCpu: false },
        { name: "Illimani", isCpu: true },
      ],
      maxMonths: 12,
      cpuLevel: "normal",
      sessionId: GameSessionId("s1"),
    });
    // 物件が2つ以上ある町を選び、手番の人がどれでも買えるだけの金を持たせる。
    const city = context.content.cities.find((c) => c.properties.length >= 2)!;
    cityId = city.id;
    const richest = Math.max(...city.properties.map((p) => p.cost)) * 3;
    const me = currentPlayer(started);
    session = {
      ...started,
      players: started.players.map((p) => (p.id === me.id ? { ...p, cash: Money.of(richest) } : p)),
    };
  });

  afterEach(() => {
    vi.useRealTimers();
    // matchMedia を差し替えたテストの後始末。
    delete (window as unknown as { matchMedia?: unknown }).matchMedia;
  });

  function renderModal(s: GameSession, handlers: Partial<Parameters<typeof CityModal>[0]> = {}) {
    const onBuy = vi.fn();
    const onSell = vi.fn();
    const onInvest = vi.fn();
    const props = {
      context,
      session: s,
      cityId,
      arrivalPrize: null,
      firstVisit: true,
      onBuy,
      onInvest,
      onSell,
      onBuyItem: () => {},
      onDone: () => {},
      ...handlers,
    };
    const utils = render(
      <LocaleProvider>
        <CityModal {...props} />
      </LocaleProvider>,
    );
    const rerender = (next: GameSession) =>
      utils.rerender(
        <LocaleProvider>
          <CityModal {...props} session={next} />
        </LocaleProvider>,
      );
    return { ...utils, rerender, onBuy, onSell, onInvest };
  }

  /** 手番の人が index 番の物件を買ったあとのセッション。 */
  function bought(s: GameSession, index: number): GameSession {
    const result = buyProperty(context, s, currentPlayer(s).id, cityId, PropertyIndex(index));
    if (!result.ok) throw new Error(`buy failed: ${result.error}`);
    return result.value.session;
  }

  it("文言は4言語で同じキーがそろっている", () => {
    const keys = Object.keys(CITY_MESSAGES.en).sort();
    for (const locale of ["es", "fr", "ja"] as const) {
      expect(Object.keys(CITY_MESSAGES[locale]).sort()).toEqual(keys);
    }
  });

  it("物件の数字は「価格」「収入」のラベル付きで、/qtr は使わない(F-16)", () => {
    renderModal(session);
    const row = screen.getByTestId("prop-0");
    expect(within(row).getByText("Price")).toBeInTheDocument();
    expect(within(row).getByText("Income / quarter")).toBeInTheDocument();
    const property = context.getCity(cityId).properties[0];
    const { prefix, multiplier } = context.content.currency;
    expect(within(row).getByText(prefix + (property.cost * multiplier).toLocaleString("en-US"))).toBeInTheDocument();
    expect(within(row).getByText("+" + prefix + (property.income * multiplier).toLocaleString("en-US"))).toBeInTheDocument();
    expect(document.body.textContent).not.toContain("/qtr");
    // 買える行には、買ったあとの残りが出る。
    expect(within(row).getByText(/ left$/)).toHaveClass("ok");
  });

  it("「買う」を押すと onBuy が呼ばれ、その行にはのぼりが立って売却ボタンが出ない(F-08)", () => {
    const { onBuy, rerender } = renderModal(session);
    const row = screen.getByTestId("prop-0");
    fireEvent.click(within(row).getByRole("button", { name: "Buy" }));
    expect(onBuy).toHaveBeenCalledWith(PropertyIndex(0));

    rerender(bought(session, 0));
    const after = screen.getByTestId("prop-0");
    expect(within(after).getByTestId("bought-banner")).toHaveTextContent("Yours!");
    expect(after).toHaveClass("just-bought");
    expect(within(after).queryByRole("button", { name: /^Sell for/ })).not.toBeInTheDocument();
    // 増資はできる。
    expect(within(after).getByRole("button", { name: "Invest" })).toBeInTheDocument();
    // 自分の物件は価格を出さず、収入だけ。
    expect(within(after).queryByText("Price")).not.toBeInTheDocument();
    expect(within(after).getByText("Income / quarter")).toBeInTheDocument();
  });

  it("開く前から持っていた物件は、売却が「押す → 本当に売る?」の2段になる(F-08)", () => {
    const owned = bought(session, 0);
    const { onSell } = renderModal(owned);
    const row = screen.getByTestId("prop-0");
    expect(within(row).queryByTestId("bought-banner")).not.toBeInTheDocument();

    fireEvent.click(within(row).getByRole("button", { name: /^Sell for/ }));
    expect(onSell).not.toHaveBeenCalled();
    expect(within(row).getByText("Really sell?")).toBeInTheDocument();
    expect(within(row).getByText(/less than you paid/)).toBeInTheDocument();

    // やめると元のボタンに戻る。
    fireEvent.click(within(row).getByRole("button", { name: "Keep it" }));
    expect(onSell).not.toHaveBeenCalled();
    expect(within(row).getByRole("button", { name: /^Sell for/ })).toBeInTheDocument();

    // 2度目の確認で初めて売れる。
    fireEvent.click(within(row).getByRole("button", { name: /^Sell for/ }));
    fireEvent.click(within(row).getByRole("button", { name: "Sell it" }));
    expect(onSell).toHaveBeenCalledWith(PropertyRef.of(cityId, PropertyIndex(0)));
  });

  it("買ったあと、少し置いてからモーダルが薄くなり、地図を見せてから戻る(F-08)", () => {
    vi.useFakeTimers();
    const { rerender } = renderModal(session);
    const body = screen.getByTestId("city-modal-body");
    fireEvent.click(within(screen.getByTestId("prop-0")).getByRole("button", { name: "Buy" }));
    rerender(bought(session, 0));

    // のぼりが立つあいだはまだ薄くならない。
    expect(body).not.toHaveClass("peeking");
    act(() => vi.advanceTimersByTime(PEEK_DELAY_MS));
    expect(body).toHaveClass("peeking");
    expect(screen.getByRole("status")).toHaveTextContent(/Look at the map/);
    act(() => vi.advanceTimersByTime(PEEK_HOLD_MS));
    expect(body).not.toHaveClass("peeking");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("動きを減らす設定では、地図を見せに行かない", () => {
    vi.useFakeTimers();
    window.matchMedia = ((query: string) => ({ matches: query.includes("reduce") })) as typeof window.matchMedia;
    const { rerender } = renderModal(session);
    fireEvent.click(within(screen.getByTestId("prop-0")).getByRole("button", { name: "Buy" }));
    rerender(bought(session, 0));
    act(() => vi.advanceTimersByTime(PEEK_DELAY_MS + PEEK_HOLD_MS));
    expect(screen.getByTestId("city-modal-body")).not.toHaveClass("peeking");
    // のぼりは立つ(動かないだけで、買ったことは伝える)。
    expect(screen.getByTestId("bought-banner")).toBeInTheDocument();
  });
});
