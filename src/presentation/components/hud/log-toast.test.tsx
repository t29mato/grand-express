import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { LogToast, TOAST_MS, isToastworthy } from "./log-toast";
import { LocaleProvider } from "../../i18n/locale-context";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { LogEntry } from "../../state/game-store";

/** 人間1人(You)とCPU1人(CPU 1)のセッション。 */
const session = createGameSession({
  id: GameSessionId("s"),
  countryId: CountryId("bolivia"),
  maxMonths: 12,
  players: [
    createPlayer({ id: PlayerId("p1"), name: "You", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("lapaz") }),
    createPlayer({ id: PlayerId("p2"), name: "CPU 1", isCpu: true, startingCash: Money.of(1000), startingNode: NodeId("lapaz") }),
  ],
  destination: CityId("sucre"),
});

function entry(key: string, args: LogEntry["args"], tone: LogEntry["tone"] = "gold"): LogEntry {
  return { id: Math.floor(Math.random() * 1e9), key, args, tone };
}

describe("isToastworthy", () => {
  it("自分に起きた大きな出来事は出す", () => {
    expect(isToastworthy(entry("carriedToLog", ["You", 9, "Sucre"]), session)).toBe(true);
    expect(isToastworthy(entry("extraTurn", ["You"]), session)).toBe(true);
    expect(isToastworthy(entry("stuck", ["You"], "bad"), session)).toBe(true);
  });

  // CPUが3人いると手番ごとにトーストが出て、見ているだけの時間が読む時間になる。
  it("CPUに起きたことは出さない", () => {
    expect(isToastworthy(entry("carriedToLog", ["CPU 1", 9, "Sucre"]), session)).toBe(false);
    expect(isToastworthy(entry("stuck", ["CPU 1"], "bad"), session)).toBe(false);
  });

  // 所持金の増減は旅人一覧の MoneyTicker が見せる。ここでも言うと二重になる。
  it("金額の増減は出さない(MoneyTickerの担当)", () => {
    expect(isToastworthy(entry("quarterly", ["You", "Bs 300"], "good"), session)).toBe(false);
    expect(isToastworthy(entry("boughtItemLog", ["You", "🦓", "Zebra Guide"]), session)).toBe(false);
  });

  // 盤面からカードマスが無くなったので cardLog は出ない(残っていると死んだ分岐になる)。
  it("いまの盤面に出てこないキーは対象にしない", () => {
    expect(isToastworthy(entry("cardLog", ["You", "🦓", "Zebra Guide"]), session)).toBe(false);
  });

  // モーダルで同じことを見せている出来事は、2回言うことになるので出さない。
  it("モーダルが出る出来事は出さない", () => {
    expect(isToastworthy(entry("quizOkLog", ["You", "Bs 200"], "good"), session)).toBe(false);
    expect(isToastworthy(entry("blueLog", ["You", "Bs 200"], "good"), session)).toBe(false);
    expect(isToastworthy(entry("arriveDestLog", ["You", "Bs 700"]), session)).toBe(false);
  });

  it("サイコロの目のような細かい行は出さない", () => {
    expect(isToastworthy(entry("rolls", ["You", 4], "neutral"), session)).toBe(false);
  });

  // 押し付けた側がCPUでも、押し付けられた先が人間なら自分に関わる。
  it("厄災の神を人間になすりつけた行は出す", () => {
    expect(isToastworthy(entry("passLog", ["👹", "CPU 1", "You"], "bad"), session)).toBe(true);
  });
});

describe("LogToast", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  function renderToast(log: readonly LogEntry[]) {
    return render(
      <LocaleProvider>
        <LogToast log={log} session={session} />
      </LocaleProvider>,
    );
  }

  it("直近1件を出し、しばらくすると消える", () => {
    renderToast([entry("carriedToLog", ["You", 9, "Sucre"])]);
    expect(screen.getByRole("status")).toHaveTextContent("You is carried 9 squares and comes down at Sucre.");

    act(() => void vi.advanceTimersByTime(TOAST_MS + 10));
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("出す対象でない行のときは何も出さない", () => {
    renderToast([entry("rolls", ["You", 4], "neutral")]);
    expect(screen.queryByRole("status")).toBeNull();
  });

  // 出すのは直近1件だけ。溜まったログをまとめて出したりしない。
  it("古い行は出さない", () => {
    renderToast([
      entry("rolls", ["You", 4], "neutral"),
      entry("carriedToLog", ["You", 9, "Sucre"]),
    ]);
    expect(screen.queryByRole("status")).toBeNull();
  });

  // 言語切替やモーダルの開閉で再描画されても、消えた行が戻ってきては困る。
  it("消えたあと、同じログのまま再描画されても出し直さない", () => {
    const log = [entry("carriedToLog", ["You", 9, "Sucre"])];
    const { rerender } = renderToast(log);
    act(() => void vi.advanceTimersByTime(TOAST_MS + 10));
    expect(screen.queryByRole("status")).toBeNull();

    rerender(
      <LocaleProvider>
        <LogToast log={log} session={session} />
      </LocaleProvider>,
    );
    expect(screen.queryByRole("status")).toBeNull();
  });
});
