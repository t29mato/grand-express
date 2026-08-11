import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { SETTLE_MS } from "./discard-confirm";
import { LocaleProvider } from "../../i18n/locale-context";
import { CountryId } from "../../../domain/shared-kernel/ids";
import { SavedGameSummary } from "../../state/game-store-types";
import { LocaleSwitch } from "../hud/locale-switch";
import { SavedGameCard } from "./saved-game-card";

const saved: SavedGameSummary = {
  countryId: CountryId("bolivia"),
  month: 2,
  maxMonths: 12,
  players: [
    { name: "タロウ", isCpu: false, cash: 1200 },
    { name: "CPU 1", isCpu: true, cash: 800 },
  ],
};

function renderCard(onDiscard = vi.fn()) {
  render(
    <LocaleProvider>
      {/* 言語切替はセットアップ画面の見出し側にあるので、切替を試すために添える。 */}
      <LocaleSwitch />
      <SavedGameCard saved={saved} onResume={vi.fn()} onDiscard={onDiscard} />
    </LocaleProvider>,
  );
  return onDiscard;
}

const discardButton = () => screen.getByRole("button", { name: "Discard" });

/** 開いた直後の「連打よけ」の間を飛ばす。 */
const settle = () => act(() => void vi.advanceTimersByTime(SETTLE_MS + 10));

/**
 * ユーザーからの報告:「押し間違い1回で、12ヶ月遊んだものが消える」。
 *
 * ここで守りたいのは**「削除」を押した時点では何も起きない**こと。
 * 見た目の確認画面が出ているかどうかではなく、`onDiscard` が呼ばれたかで測る。
 * 確認を出しながら裏で消す、という直し方をこのテストで塞いでいる。
 */
describe("SavedGameCard の削除", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("「削除」を押しただけでは消さない", () => {
    const onDiscard = renderCard();
    fireEvent.click(discardButton());
    expect(onDiscard).not.toHaveBeenCalled();
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("確認で「消す」を選ぶと消す", () => {
    const onDiscard = renderCard();
    fireEvent.click(discardButton());
    settle();
    fireEvent.click(screen.getByRole("button", { name: "Delete it" }));
    expect(onDiscard).toHaveBeenCalledTimes(1);
  });

  /**
   * 375pxで測ると、「消す」が出る場所は**さっき「削除」を押した指の位置とほぼ同じ**
   * だった(削除 x256-346 y441-483 / 消す x244-338 y440-482)。
   * 反応が無いと思ってもう一度叩くと、2打目がそのまま削除に届く。
   */
  it("開いた直後の連打では消えない", () => {
    const onDiscard = renderCard();
    fireEvent.click(discardButton());
    fireEvent.click(screen.getByRole("button", { name: "Delete it" }));
    expect(onDiscard).not.toHaveBeenCalled();

    // 少し待てば、いつもどおり押せる。
    settle();
    fireEvent.click(screen.getByRole("button", { name: "Delete it" }));
    expect(onDiscard).toHaveBeenCalledTimes(1);
  });

  // 開いた瞬間に消すほうへフォーカスが載っていると、押した勢いの Enter が
  // そのまま削除に届く。既定は残すほう。
  it("開いた直後のフォーカスは「消さない」に載る", () => {
    renderCard();
    fireEvent.click(discardButton());
    expect(screen.getByRole("button", { name: "Keep it" })).toHaveFocus();
  });

  it("「消さない」を選ぶと閉じるだけで、フォーカスは「削除」に戻る", () => {
    const onDiscard = renderCard();
    fireEvent.click(discardButton());
    fireEvent.click(screen.getByRole("button", { name: "Keep it" }));
    expect(onDiscard).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(discardButton()).toHaveFocus();
  });

  it("Escape でも消えない", () => {
    const onDiscard = renderCard();
    fireEvent.click(discardButton());
    fireEvent.keyDown(screen.getByRole("button", { name: "Keep it" }), { key: "Escape" });
    expect(onDiscard).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  // 「本当に消しますか」だけだと、どの旅の話か分からないまま押すことになる。
  it("消えるものの中身を出す(国・何年目の何月・進み具合・旅人)", () => {
    renderCard();
    fireEvent.click(discardButton());
    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toHaveTextContent("Bolivia");
    expect(dialog).toHaveTextContent("Year 1");
    expect(dialog).toHaveTextContent("Month 3 of 12");
    expect(dialog).toHaveTextContent("タロウ, CPU 1");
    expect(dialog).toHaveTextContent("cannot be brought back");
  });

  // Tab が背後のセットアップ画面へ抜けると、読み上げでは確認が消えたように聞こえる。
  it("Tab は確認の中の2つを行き来する", () => {
    renderCard();
    fireEvent.click(discardButton());
    const keep = screen.getByRole("button", { name: "Keep it" });
    const del = screen.getByRole("button", { name: "Delete it" });

    fireEvent.keyDown(keep, { key: "Tab" });
    expect(del).toHaveFocus();
    fireEvent.keyDown(del, { key: "Tab" });
    expect(keep).toHaveFocus();
  });
});

describe("SavedGameCard の確認は4言語で読める", () => {
  it.each([
    ["ES", "¿Eliminar este viaje guardado?", "Conservarlo", "Eliminarlo"],
    ["FR", "Supprimer ce voyage enregistré ?", "Le garder", "Le supprimer"],
    ["JA", "この旅を消しますか?", "消さずに置いておく", "消す"],
  ])("%s", (language, title, keep, remove) => {
    renderCard();
    fireEvent.click(screen.getByRole("button", { name: language }));
    fireEvent.click(screen.getByRole("button", { name: /Discard|Descartar|Supprimer|削除/ }));

    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toHaveTextContent(title);
    expect(screen.getByRole("button", { name: keep })).toHaveFocus();
    expect(screen.getByRole("button", { name: remove })).toBeInTheDocument();
  });
});
