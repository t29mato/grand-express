import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CountryId } from "../../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../../application/game-engine-context";
import { LocaleProvider } from "../../i18n/locale-context";
import { PLAYER_COLORS } from "../player-colors";
import { ArrivalFanfare } from "./arrival-fanfare";

/**
 * 目的地への到達は乱数次第でしか起きないので、演出を単体で描画して確かめる。
 * 実データ(ボリビア)を使い、町の名前・賞金の通貨表記・誰が着いたかが
 * 正しく組み立てられることを見る。
 */
describe("ArrivalFanfare", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
  });

  afterEach(() => {
    // 動きを減らす設定の偽装を片付ける。
    delete (window as { matchMedia?: unknown }).matchMedia;
  });

  function renderFanfare(extra: { isFirstArrival?: boolean; onDone?: () => void; playerIndex?: number } = {}) {
    const city = context.content.cities[0];
    const onDone = extra.onDone ?? (() => {});
    render(
      <LocaleProvider>
        <ArrivalFanfare
          context={context}
          playerName="Illimani"
          playerIndex={extra.playerIndex ?? 1}
          cityId={city.id}
          prize={700}
          isFirstArrival={extra.isFirstArrival ?? false}
          onDone={onDone}
        />
      </LocaleProvider>,
    );
    return { city, onDone };
  }

  it("町の名前・誰が着いたか・賞金を出す", () => {
    const { city } = renderFanfare();
    expect(screen.getByRole("heading", { name: `Arrived in ${city.name.en}!` })).toBeInTheDocument();
    expect(screen.getByText("Illimani")).toBeInTheDocument();
    // 賞金は国ごとの通貨表記(内部値 × multiplier)。桁を直接書かず設定から組み立てる。
    const { prefix, multiplier } = context.content.currency;
    expect(screen.getByText("+" + prefix + (700 * multiplier).toLocaleString("en-US"))).toBeInTheDocument();
  });

  it("文に人称を入れない(CPUの到着を自分のことだと読ませない)", () => {
    renderFanfare();
    const dialog = screen.getByRole("dialog");
    expect(dialog.textContent).not.toMatch(/\byou\b/i);
    // 名前は文の外(色の丸の横)にある。
    expect(dialog.querySelector(".fanfare-who")?.textContent).toBe("Illimani");
  });

  it("駒の色は何人目かで決まる", () => {
    renderFanfare({ playerIndex: 2 });
    const dot = screen.getByRole("dialog").querySelector(".fanfare-dot") as HTMLElement;
    expect(dot.style.background).toBe(hexToRgb(PLAYER_COLORS[2]));
  });

  it("一番乗りのときだけ帯を出し、さらに華やかにする", () => {
    renderFanfare({ isFirstArrival: true });
    expect(screen.getByText("First to arrive!")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveClass("first");
  });

  it("一番乗りでなければ帯は出ない", () => {
    renderFanfare({ isFirstArrival: false });
    expect(screen.queryByText("First to arrive!")).toBeNull();
    expect(screen.getByRole("dialog")).not.toHaveClass("first");
  });

  it("画面のどこを押しても閉じる(ボタンを押しても一度だけ閉じる)", () => {
    const onDone = vi.fn();
    renderFanfare({ onDone });
    fireEvent.click(screen.getByRole("dialog"));
    expect(onDone).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(onDone).toHaveBeenCalledTimes(2);
  });

  it("Escキーでも閉じる", () => {
    const onDone = vi.fn();
    renderFanfare({ onDone });
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("動きを減らす設定では、後光と紙吹雪を出さず静止した札にする", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: (query: string) => ({ matches: query.includes("reduce") }),
    });
    renderFanfare({ isFirstArrival: true });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("still");
    expect(dialog.querySelector(".fanfare-rays")).toBeNull();
    expect(dialog.querySelector(".fanfare-confetti")).toBeNull();
    // 止めても、何が起きたかは読める。
    expect(screen.getByText("First to arrive!")).toBeInTheDocument();
  });
});

/** jsdom は style の色を rgb() に正規化するので、比べる側も揃える。 */
function hexToRgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
}
