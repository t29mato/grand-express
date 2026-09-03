import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { LocaleProvider } from "../../i18n/locale-context";
import { resetMusicPreferenceCache } from "../../state/music-preference";
import { PRESS_HINT_FLASH_MS, PRESS_HINT_HOLD_MS } from "../../hooks/use-press-hint";
import { MusicToggle } from "./music-toggle";

function renderToggle() {
  return render(
    <LocaleProvider>
      <MusicToggle />
    </LocaleProvider>,
  );
}

/** ボタンは読み上げ名で引く(絵しか出ていないので、名前が付いていないと引けない)。 */
function toggle() {
  return screen.getByRole("button", { name: "Music" });
}

describe("MusicToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetMusicPreferenceCache();
  });

  it("はじめは音楽が入っていて、押すと切れる", () => {
    renderToggle();
    expect(toggle()).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(toggle());
    expect(toggle()).toHaveAttribute("aria-pressed", "false");
  });

  it("切った設定が残り、次に開いたときも切れたまま", () => {
    const first = renderToggle();
    fireEvent.click(toggle());
    first.unmount();

    // 次にページを開いたところ(モジュールの覚えを捨てて、保存からやり直す)。
    resetMusicPreferenceCache();
    renderToggle();
    expect(toggle()).toHaveAttribute("aria-pressed", "false");
  });

  /**
   * 絵だけのボタンなので、名札(`data-tip`)に「音楽: ON」の形で名前と状態を持つ(F-15)。
   * 名札はホバー・フォーカス・長押し・押した直後に出る。以前の `title` はやめた
   * (出るまで1秒かかり、指では出ず、名札と二重になる)。
   */
  it("読み上げ名は入り切りで変わらず、名札だけが今の状態を示す", () => {
    renderToggle();
    expect(toggle()).toHaveAttribute("data-tip", "Music: ON");
    expect(toggle()).not.toHaveAttribute("title");
    fireEvent.click(toggle());
    // 名前が変わらないので、同じ引き方でまだ見つかる。
    expect(toggle()).toHaveAttribute("data-tip", "Music: OFF");
    // 押した直後は名札が出ている(指で押した人にも結果が読めるように)。
    expect(toggle()).toHaveAttribute("data-tip-shown", "true");
  });

  it("長押しは「これは何?」なので、名札を出すだけで切り替えない", () => {
    vi.useFakeTimers();
    try {
      renderToggle();
      fireEvent.pointerDown(toggle(), { pointerType: "touch" });
      act(() => {
        vi.advanceTimersByTime(PRESS_HINT_HOLD_MS + 10);
      });
      expect(toggle()).toHaveAttribute("data-tip-shown", "true");
      fireEvent.pointerUp(toggle(), { pointerType: "touch" });
      fireEvent.click(toggle());
      expect(toggle()).toHaveAttribute("aria-pressed", "true");
      // しばらくすると名札は引っ込む。
      act(() => {
        vi.advanceTimersByTime(PRESS_HINT_FLASH_MS + 10);
      });
      expect(toggle()).not.toHaveAttribute("data-tip-shown");
      // 次の普通のタップは切り替わる(長押しの印を持ち越さない)。
      fireEvent.pointerDown(toggle(), { pointerType: "touch" });
      fireEvent.pointerUp(toggle(), { pointerType: "touch" });
      fireEvent.click(toggle());
      expect(toggle()).toHaveAttribute("aria-pressed", "false");
    } finally {
      vi.useRealTimers();
    }
  });
});
