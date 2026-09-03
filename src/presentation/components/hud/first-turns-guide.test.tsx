import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { GameSession, createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { KnowledgeLevel } from "../../../domain/quiz/knowledge-level";
import { EMPTY_GUIDE, GuideState, UiState } from "../../state/game-store-types";
import { LocaleProvider } from "../../i18n/locale-context";
import { GUIDE_MESSAGES } from "../../i18n/guide-messages";
import { FirstTurnsGuide, GUIDED_TURNS, guideMessageKeyFor } from "./first-turns-guide";

/**
 * 実プレイの観察(2026-09-02、日本盤面):「はじめて」を選んでも説明は
 * 出発モーダルの約120字のヒント文だけで、最初の手番に方向のヒントが無く、
 * **最初の町に着くまで5手番かかった。**
 *
 * ここで固定するのは、**誰に・いつ・何を1行で言うか**。
 * 場面ごとの分岐は `guideMessageKeyFor` だけが持つので、そこを直に押さえる。
 */
describe("FirstTurnsGuide", () => {
  function sessionWith(knowledgeLevel: KnowledgeLevel, isCpu = false): GameSession {
    return createGameSession({
      id: GameSessionId("s"),
      countryId: CountryId("bolivia"),
      maxMonths: 12,
      players: [
        createPlayer({
          id: PlayerId("p1"),
          name: "You",
          isCpu,
          knowledgeLevel,
          startingCash: Money.of(1000),
          startingNode: NodeId("lapaz"),
        }),
      ],
      destination: CityId("sucre"),
    });
  }

  const idle: UiState = { kind: "idle" };
  const choosing: UiState = { kind: "choosing-square", steps: 3, reachable: new Map() };
  const city: UiState = { kind: "city", cityId: CityId("sucre"), arrivalPrize: null, firstVisit: true };

  function keyFor(ui: UiState, guide: Partial<GuideState> = {}, options: { walking?: boolean; knowledgeLevel?: KnowledgeLevel } = {}) {
    return guideMessageKeyFor({
      session: sessionWith(options.knowledgeLevel ?? "newcomer"),
      ui,
      guide: { ...EMPTY_GUIDE, ...guide },
      walking: options.walking ?? false,
    });
  }

  it("最初の手番では、まずサイコロを押すことを言う", () => {
    expect(keyFor(idle)).toBe("guideRoll");
  });

  it("候補が光っているあいだは、数字の小さいマスを選ぶことを言う", () => {
    expect(keyFor(choosing, { turnsRolled: 1 })).toBe("guideChooseSquare");
  });

  it("駒が歩き始めたら黙る(もう選べない)", () => {
    expect(keyFor(choosing, { turnsRolled: 1 }, { walking: true })).toBeNull();
  });

  it("盤面のガイドは最初の3手番だけ", () => {
    expect(keyFor(idle, { turnsRolled: GUIDED_TURNS - 1 })).toBe("guideRoll");
    // 3手番ぶん振り終えたら、次の手番では言わない。
    expect(keyFor(idle, { turnsRolled: GUIDED_TURNS })).toBeNull();
    expect(keyFor(choosing, { turnsRolled: GUIDED_TURNS })).toBe("guideChooseSquare");
    expect(keyFor(choosing, { turnsRolled: GUIDED_TURNS + 1 })).toBeNull();
  });

  /**
   * **町の一言だけは手番の数で切らない。**町が遠い引きだと、
   * いちばん出したい場面(初めての町)で一度も出ないまま終わる。
   */
  it("初めての町では、手番が進んでいても物件の一言を出す", () => {
    expect(keyFor(city, { turnsRolled: 9, cityHintOpen: true })).toBe("guideBuyProperty");
    expect(keyFor(city, { turnsRolled: 9, cityHintOpen: false })).toBeNull();
  });

  it("「はじめて」でない人には出さない", () => {
    expect(keyFor(idle, {}, { knowledgeLevel: "familiar" })).toBeNull();
    expect(keyFor(idle, {}, { knowledgeLevel: "local" })).toBeNull();
  });

  it("CPUの手番には出さない", () => {
    const key = guideMessageKeyFor({
      session: sessionWith("newcomer", true),
      ui: idle,
      guide: EMPTY_GUIDE,
      walking: false,
    });
    expect(key).toBeNull();
  });

  it("読み飛ばされたら、以後は何も出さない", () => {
    expect(keyFor(idle, { dismissed: true })).toBeNull();
    expect(keyFor(city, { dismissed: true, cityHintOpen: true })).toBeNull();
  });

  /**
   * **文言そのものは見ない。**`GUIDE_MESSAGES` を `i18n/messages.ts` に
   * 重ねるのは取りまとめ側の仕事なので、それが済むまで `t()` はキーを返す。
   * ここで見るのは「読み上げに乗る1行が出て、消せること」。
   * 文言が4言語そろっているかは、下の別のテストが見る。
   */
  it("画面に1行で出て、「ヒントを消す」で読み飛ばせる", () => {
    const onDismiss = vi.fn();
    render(
      <LocaleProvider>
        <FirstTurnsGuide session={sessionWith("newcomer")} ui={idle} guide={EMPTY_GUIDE} walking={false} onDismiss={onDismiss} />
      </LocaleProvider>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("4言語ぶんの文言がそろっている", () => {
    const locales = ["en", "es", "fr", "ja"] as const;
    const keys = ["guideRoll", "guideChooseSquare", "guideBuyProperty", "guideHide"];
    for (const locale of locales) {
      for (const key of keys) {
        expect(GUIDE_MESSAGES[locale][key], `${locale}/${key} が無い`).toBeTruthy();
      }
    }
  });

  it("出すものが無ければ、何も描かない", () => {
    const { container } = render(
      <LocaleProvider>
        <FirstTurnsGuide
          session={sessionWith("familiar")}
          ui={idle}
          guide={EMPTY_GUIDE}
          walking={false}
          onDismiss={() => {}}
        />
      </LocaleProvider>,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
