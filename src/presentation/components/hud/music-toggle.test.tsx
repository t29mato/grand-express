import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LocaleProvider } from "../../i18n/locale-context";
import { resetMusicPreferenceCache } from "../../state/music-preference";
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

  it("読み上げ名は入り切りで変わらず、吹き出しだけが次にすることを示す", () => {
    renderToggle();
    expect(toggle()).toHaveAttribute("title", "Turn the music off");
    fireEvent.click(toggle());
    // 名前が変わらないので、同じ引き方でまだ見つかる。
    expect(toggle()).toHaveAttribute("title", "Turn the music on");
  });
});
