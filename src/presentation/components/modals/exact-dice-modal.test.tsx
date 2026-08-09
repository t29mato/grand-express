import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LocaleProvider } from "../../i18n/locale-context";
import { ExactDiceModal } from "./exact-dice-modal";

/**
 * 「出目を自分で選べる」アイテム(時刻表・タクシー・周遊券・急行券・時計)の選択画面。
 *
 * `applyItemUse` は前から `await-exact-dice-choice` を正しく返していて、
 * その単体テストもあった。**壊れていたのは受け取る側で、分岐が無かった。**
 * 使うとアイテムが持ち物から消え、ログが1行増えるだけで何も起きなかった。
 * ドメインだけを見ていると気づけないので、ここで押さえる。
 */
describe("ExactDiceModal", () => {
  it("1〜6のすべてを選べる", () => {
    render(
      <LocaleProvider>
        <ExactDiceModal onChoose={vi.fn()} />
      </LocaleProvider>,
    );
    for (const v of [1, 2, 3, 4, 5, 6]) {
      expect(screen.getByRole("button", { name: String(v) })).toBeInTheDocument();
    }
  });

  it("押した数がそのまま渡る(ずれない)", () => {
    const onChoose = vi.fn();
    render(
      <LocaleProvider>
        <ExactDiceModal onChoose={onChoose} />
      </LocaleProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "4" }));
    expect(onChoose).toHaveBeenCalledWith(4);
  });

  /**
   * 選ばずに閉じられると、**アイテムを失ったうえに手番も進まない**行き止まりになる。
   * 閉じる手段を置いていないことを、意図として残しておく。
   */
  it("閉じるだけのボタンは無い(選ばないと進めない)", () => {
    const { container } = render(
      <LocaleProvider>
        <ExactDiceModal onChoose={vi.fn()} />
      </LocaleProvider>,
    );
    // `Modal` は言語切替(EN/ES/FR/JA)を持つので、選択の行だけを見る。
    const labels = [...container.querySelectorAll(".btnrow button")].map((b) => b.textContent?.trim());
    expect(labels).toEqual(["1", "2", "3", "4", "5", "6"]);
  });
});
