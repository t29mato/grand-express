import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { LocaleProvider } from "../../i18n/locale-context";
import { DiceButton } from "./dice-button";

function session() {
  const p1 = createPlayer({ id: PlayerId("p1"), name: "Alex", isCpu: false, startingCash: Money.of(1200), startingNode: NodeId("lapaz") });
  return createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: CityId("sucre") });
}

describe("DiceButton", () => {
  it("クリックするとonRollが呼ばれる", () => {
    const onRoll = vi.fn();
    render(
      <LocaleProvider>
        <DiceButton session={session()} disabled={false} onRoll={onRoll} />
      </LocaleProvider>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onRoll).toHaveBeenCalledOnce();
  });

  it("disabledのときはクリックしてもonRollが呼ばれない", () => {
    const onRoll = vi.fn();
    render(
      <LocaleProvider>
        <DiceButton session={session()} disabled onRoll={onRoll} />
      </LocaleProvider>,
    );
    fireEvent.click(screen.getByRole("button"));
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
   * 転がっている最中に出目が読めてしまうと、止まるのを待つ理由が無くなる。
   * サイコロの絵の横に答えが書いてあった不具合の再発防止。
   */
  it("転がっている間は出目もマス数も出さない", () => {
    render(
      <LocaleProvider>
        <DiceButton session={session()} disabled rolling onRoll={vi.fn()} />
      </LocaleProvider>,
    );
    const button = screen.getByRole("button");
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
    expect(screen.getByRole("button").textContent).toBe("4");
    expect(screen.getByText(/You rolled 4/)).toBeInTheDocument();
  });
});
