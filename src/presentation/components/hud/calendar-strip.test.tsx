import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { GameSession, createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { LocaleProvider } from "../../i18n/locale-context";
import { LocaleSwitch } from "./locale-switch";
import { CalendarStrip, ENDING_THRESHOLD_MONTHS } from "./calendar-strip";

/**
 * 実プレイの観察:「12ヶ月後に一番資産の多い人の勝ち」なのに、盤面の画面には
 * 今が何月か・あと何ヶ月かが無く、季節の出来事のカードから逆算するしかなかった。
 *
 * ここで固定するのは、**月名と残り月数がセッションの値から出ること**(12ヶ月の
 * 決め打ちではない)、**読み上げで一文として読めること**、**終盤で色が変わること**、
 * **月替わりにめくる演出が動きを減らす設定では省かれること。**
 */
describe("CalendarStrip", () => {
  function stubMotion(reduced: boolean) {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: reduced && query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
  }

  beforeEach(() => {
    stubMotion(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  function sessionAt(month: number, maxMonths = 12): GameSession {
    const session = createGameSession({
      id: GameSessionId("s"),
      countryId: CountryId("bolivia"),
      maxMonths,
      players: [
        createPlayer({ id: PlayerId("p1"), name: "You", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("lapaz") }),
      ],
      destination: CityId("sucre"),
    });
    return { ...session, month };
  }

  function renderStrip(session: GameSession) {
    return render(
      <LocaleProvider>
        <LocaleSwitch />
        <CalendarStrip session={session} />
      </LocaleProvider>,
    );
  }

  it("今の月名と、今月を含めた残り月数を出す(月0=4月・12ヶ月なら残り12)", () => {
    renderStrip(sessionAt(0));
    expect(document.querySelector(".calendar-month")).toHaveTextContent("April");
    expect(document.querySelector(".calendar-left")).toHaveTextContent("12 months left");
  });

  it("読み上げでは「5月、残り11ヶ月」の一文として読める", () => {
    renderStrip(sessionAt(1));
    expect(screen.getByRole("group", { name: "May, 11 months left" })).toBeInTheDocument();
  });

  it("12ヶ月と決め打ちしない——24ヶ月の旅なら残りも目盛りも24から数える", () => {
    renderStrip(sessionAt(13, 24));
    // 13ヶ月目は2年目の5月。1年を超える旅では年も添える。
    expect(screen.getByRole("group", { name: "Year 2 · May, 11 months left" })).toBeInTheDocument();
    expect(document.querySelectorAll(".calendar-tick").length).toBe(24);
    expect(document.querySelectorAll(".calendar-tick.is-done").length).toBe(13);
    expect(document.querySelector(".calendar-tick.is-now")).not.toBeNull();
  });

  it("1年で終わる旅では年を出さない(情報にならないため)", () => {
    renderStrip(sessionAt(1));
    expect(document.querySelector(".calendar-year")).toBeNull();
  });

  it("残り2ヶ月からは終盤の色になり、読み上げにもそのことが入る", () => {
    renderStrip(sessionAt(12 - ENDING_THRESHOLD_MONTHS));
    const strip = document.querySelector(".calendar-strip")!;
    expect(strip).toHaveClass("is-ending");
    expect(strip.getAttribute("aria-label")).toContain("The journey ends soon");
    expect(document.querySelector(".calendar-ending")).not.toBeNull();
  });

  it("残り3ヶ月ではまだ終盤の色にしない", () => {
    renderStrip(sessionAt(12 - ENDING_THRESHOLD_MONTHS - 1));
    expect(document.querySelector(".calendar-strip")).not.toHaveClass("is-ending");
  });

  it("最後の月は「残り0ヶ月」ではなく「最後の月」と書く", () => {
    renderStrip(sessionAt(11));
    expect(document.querySelector(".calendar-left")).toHaveTextContent("Last month");
    expect(screen.getByRole("group", { name: /^March, Last month/ })).toBeInTheDocument();
  });

  it("月が替わった瞬間だけめくる。初回はめくらない", () => {
    vi.useFakeTimers();
    const { rerender } = renderStrip(sessionAt(0));
    const strip = () => document.querySelector(".calendar-strip")!;
    expect(strip()).not.toHaveClass("is-flipping");

    rerender(
      <LocaleProvider>
        <LocaleSwitch />
        <CalendarStrip session={sessionAt(1)} />
      </LocaleProvider>,
    );
    expect(strip()).toHaveClass("is-flipping");
    expect(document.querySelector(".calendar-month")).toHaveTextContent("May");

    // 演出の時間が過ぎたら元に戻る。付けっぱなしだと次の月替わりでめくり直せない。
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(strip()).not.toHaveClass("is-flipping");
  });

  it("動きを減らす設定では、月が替わってもめくらない", () => {
    stubMotion(true);
    const { rerender } = renderStrip(sessionAt(0));
    rerender(
      <LocaleProvider>
        <LocaleSwitch />
        <CalendarStrip session={sessionAt(1)} />
      </LocaleProvider>,
    );
    expect(document.querySelector(".calendar-strip")).not.toHaveClass("is-flipping");
    // 動きは省いても、月そのものは新しくなっている。
    expect(document.querySelector(".calendar-month")).toHaveTextContent("May");
  });

  it.each([
    ["ES", "Mayo", "Quedan 11 meses"],
    ["FR", "Mai", "Encore 11 mois"],
    ["JA", "5月", "残り11ヶ月"],
  ])("%s: 月名と残り月数がその言語で出る", (language, month, left) => {
    renderStrip(sessionAt(1));
    fireEvent.click(screen.getByRole("button", { name: language }));
    expect(document.querySelector(".calendar-month")).toHaveTextContent(month);
    expect(document.querySelector(".calendar-left")).toHaveTextContent(left);
  });
});
