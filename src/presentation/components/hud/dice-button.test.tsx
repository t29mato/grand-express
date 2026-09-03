import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { LocaleProvider } from "../../i18n/locale-context";
import { resetKeyboardHintSeen } from "../../hooks/keyboard-hint-seen";
import { SHOW_DELAY_MS } from "./keyboard-hint";
import { DiceButton } from "./dice-button";

function session() {
  const p1 = createPlayer({ id: PlayerId("p1"), name: "Alex", isCpu: false, startingCash: Money.of(1200), startingNode: NodeId("lapaz") });
  return createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: CityId("sucre") });
}

/** サイコロのボタン。案内の閉じるボタンも並ぶので、読み上げ名で引く。 */
function die() {
  return screen.getByRole("button", { name: "Roll the die" });
}

describe("DiceButton", () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetKeyboardHintSeen();
  });

  it("クリックするとonRollが呼ばれる", () => {
    const onRoll = vi.fn();
    render(
      <LocaleProvider>
        <DiceButton session={session()} disabled={false} onRoll={onRoll} />
      </LocaleProvider>,
    );
    fireEvent.click(die());
    expect(onRoll).toHaveBeenCalledOnce();
  });

  it("disabledのときはクリックしてもonRollが呼ばれない", () => {
    const onRoll = vi.fn();
    render(
      <LocaleProvider>
        <DiceButton session={session()} disabled onRoll={onRoll} />
      </LocaleProvider>,
    );
    fireEvent.click(die());
    expect(onRoll).not.toHaveBeenCalled();
  });

  it("現在の手番のプレイヤー名が表示される", () => {
    render(
      <LocaleProvider>
        <DiceButton session={session()} disabled={false} onRoll={vi.fn()} />
      </LocaleProvider>,
    );
    expect(screen.getByText(/Alex/)).toBeInTheDocument();
  });

  /**
   * legacy の `turnOf` は「{0} の番」という所有格の型で、英語では "{0}'s turn"。
   * 既定名 "You" を流し込むと "You's turn" になり、英語として壊れる
   * (実機のスクリーンショットで見つけた)。名前の部分だけ差し替える作りでは
   * 所有格の要る言語で必ず崩れるので、既定名のときだけ文ごと分けている。
   */
  it("名前を付けずに始めた人には所有格を使わない(英語で You's turn にならない)", () => {
    const p = createPlayer({ id: PlayerId("p1"), name: "You", isCpu: false, startingCash: Money.of(1200), startingNode: NodeId("lapaz") });
    render(
      <LocaleProvider>
        <DiceButton
          session={createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p], destination: CityId("sucre") })}
          disabled={false}
          onRoll={vi.fn()}
        />
      </LocaleProvider>,
    );
    expect(screen.queryByText(/You's turn/)).not.toBeInTheDocument();
    expect(screen.getByText("Your turn")).toBeInTheDocument();
  });

  /**
   * 転がっている最中に出目が読めてしまうと、止まるのを待つ理由が無くなる。
   * サイコロの絵の横に答えが書いてあった不具合の再発防止。
   */
  it("転がっている間は出目もマス数も出さない", () => {
    render(
      <LocaleProvider>
        <DiceButton session={session()} disabled rolling onRoll={vi.fn()} />
      </LocaleProvider>,
    );
    const button = die();
    expect(button.textContent).toBe("🎲");
    expect(screen.queryByText(/You rolled/)).toBeNull();
    expect(screen.getByText(/rolling/i)).toBeInTheDocument();
  });

  it("止まってから出目とマス数を出す", () => {
    render(
      <LocaleProvider>
        <DiceButton session={session()} disabled steps={4} onRoll={vi.fn()} />
      </LocaleProvider>,
    );
    expect(die().textContent).toBe("4");
    expect(screen.getByText(/You rolled 4/)).toBeInTheDocument();
  });

  /**
   * Space = 振る(F-18)。以前は `<button>` にフォーカスが残っていたときだけ偶然振れていた
   * (マウスで押すと disabled になった瞬間にフォーカスが body へ落ちるので、
   * 次の手番では毎回 Tab で戻る必要があった)。フォーカスがどこにあっても振れるようにする。
   */
  it("フォーカスが body にあっても Space で振れる", () => {
    const onRoll = vi.fn();
    render(
      <LocaleProvider>
        <DiceButton session={session()} disabled={false} onRoll={onRoll} />
      </LocaleProvider>,
    );
    fireEvent.keyDown(document.body, { key: " " });
    expect(onRoll).toHaveBeenCalledOnce();
  });

  it("振れないとき(相手の番・転がっている最中)は Space で振れない", () => {
    const onRoll = vi.fn();
    const { rerender } = render(
      <LocaleProvider>
        <DiceButton session={session()} disabled onRoll={onRoll} />
      </LocaleProvider>,
    );
    fireEvent.keyDown(document.body, { key: " " });
    rerender(
      <LocaleProvider>
        <DiceButton session={session()} disabled={false} rolling onRoll={onRoll} />
      </LocaleProvider>,
    );
    fireEvent.keyDown(document.body, { key: " " });
    expect(onRoll).not.toHaveBeenCalled();
  });

  it("別のボタンにフォーカスがあるときの Space は横取りしない", () => {
    const onRoll = vi.fn();
    render(
      <LocaleProvider>
        <button type="button">other</button>
        <DiceButton session={session()} disabled={false} onRoll={onRoll} />
      </LocaleProvider>,
    );
    fireEvent.keyDown(screen.getByRole("button", { name: "other" }), { key: " " });
    expect(onRoll).not.toHaveBeenCalled();
  });

  it("キーボードの案内は、振れる最初の手番に一度だけ出て、二度目は出ない", () => {
    vi.useFakeTimers();
    try {
      const first = render(
        <LocaleProvider>
          <DiceButton session={session()} disabled={false} onRoll={vi.fn()} />
        </LocaleProvider>,
      );
      expect(screen.queryByTestId("keyboard-hint")).toBeNull();
      act(() => {
        vi.advanceTimersByTime(SHOW_DELAY_MS + 10);
      });
      expect(screen.getByTestId("keyboard-hint")).toBeInTheDocument();
      // 案内したキーを使ったら、分かったと見なして閉じる。
      fireEvent.keyDown(document.body, { key: "ArrowRight" });
      expect(screen.queryByTestId("keyboard-hint")).toBeNull();
      first.unmount();

      render(
        <LocaleProvider>
          <DiceButton session={session()} disabled={false} onRoll={vi.fn()} />
        </LocaleProvider>,
      );
      act(() => {
        vi.advanceTimersByTime(SHOW_DELAY_MS + 10);
      });
      expect(screen.queryByTestId("keyboard-hint")).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it("サイコロは読み上げ名を持ち、いま何をする番かを隣の文で添える", () => {
    render(
      <LocaleProvider>
        <DiceButton session={session()} disabled steps={4} onRoll={vi.fn()} />
      </LocaleProvider>,
    );
    expect(die()).toHaveAccessibleDescription(/You rolled 4/);
  });
});
