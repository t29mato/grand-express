import { beforeAll, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CountryId, GameSessionId } from "../../../domain/shared-kernel/ids";
import { GameSession } from "../../../domain/game-session/game-session";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../../application/game-engine-context";
import { startGame } from "../../../application/use-cases/start-game/start-game.use-case";
import { FixedRandom } from "../../../../tests/fakes/deterministic-random";
import { LocaleProvider } from "../../i18n/locale-context";
import { NextLegModal } from "./next-leg-modal";

/**
 * 目的地への到着は実際のプレイでは乱数次第でしか起きないため、E2Eでは決定的に
 * 再現できない。ここでは実データ(ボリビア)を使ってモーダル単体を描画し、
 * 次の目的地の案内と厄災の神のメッセージが正しく組み立てられることを確認する。
 */
describe("NextLegModal", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;
  let session: GameSession;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    session = startGame(context, new FixedRandom(0), {
      countryId: CountryId("bolivia"),
      players: [
        { name: "You", isCpu: false },
        { name: "Illimani", isCpu: true },
      ],
      maxMonths: 12,
      cpuLevel: "normal",
      sessionId: GameSessionId("s1"),
    });
  });

  function renderModal(firstTimeSpiritAppearance: boolean) {
    render(
      <LocaleProvider>
        <NextLegModal
          context={context}
          session={session}
          firstTimeSpiritAppearance={firstTimeSpiritAppearance}
          spiritHolderId={session.players[1].id}
          onContinue={() => {}}
        />
      </LocaleProvider>,
    );
  }

  it("次の目的地の名前と賞金を表示する", () => {
    renderModal(false);
    const destinationName = context.getCity(session.destination).name.en;
    expect(screen.getByRole("heading", { name: `🧭 On to ${destinationName}` })).toBeInTheDocument();
    // 賞金(月0なので700)が、国ごとの通貨表記で money クラスに強調表示される。
    expect(screen.getByText("Bs 700")).toHaveClass("money");
  });

  it("厄災の神が初めて現れるときは arrive の文言を使う", () => {
    renderModal(true);
    // ボリビアの spirit.arrive は「El Tío boards the rails!」で始まる。
    expect(screen.getByText(/El Tío boards the rails/)).toBeInTheDocument();
    // 憑いたプレイヤー名が埋め込まれている。
    expect(screen.getByText("Illimani")).toBeInTheDocument();
  });

  it("2回目以降は moves の文言を使い、乗り換えたことを伝える", () => {
    renderModal(false);
    expect(screen.getByText(/changes trains/)).toBeInTheDocument();
    expect(screen.queryByText(/boards the rails/)).not.toBeInTheDocument();
  });
});
