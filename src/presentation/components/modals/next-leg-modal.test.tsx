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

  function renderModal(firstTimeSpiritAppearance: boolean, extra: { onCpuTurn?: boolean; arrivedBy?: string; prize?: string } = {}) {
    render(
      <LocaleProvider>
        <NextLegModal
          context={context}
          session={session}
          firstTimeSpiritAppearance={firstTimeSpiritAppearance}
          spiritHolderId={session.players[1].id}
          onContinue={() => {}}
          {...extra}
        />
      </LocaleProvider>,
    );
  }

  it("次の目的地の名前と賞金を表示する", () => {
    renderModal(false);
    const destinationName = context.getCity(session.destination).name.en;
    expect(screen.getByRole("heading", { name: `🧭 On to ${destinationName}` })).toBeInTheDocument();
    // 賞金(月0なので内部値700)が、国ごとの通貨表記で money クラスに強調表示される。
    // **表示は内部値 × cur.mul。**ボリビアは ×500 なので Bs 350,000。
    // お金を「お土産ではなく不動産を買う」桁に上げたときに変わった。
    // 桁を直接書かず、通貨の設定から組み立てて、次に倍率が変わっても壊れないようにする。
    const { prefix, multiplier } = context.content.currency;
    const expected = prefix + (700 * multiplier).toLocaleString("en-US");
    expect(screen.getByText(expected)).toHaveClass("money");
  });

  it("厄災の神が初めて現れるときは arrive の文言を使う", () => {
    renderModal(true);
    // ボリビアの spirit.arrive は「El Tío boards the rails!」で始まる。
    expect(screen.getByText(/El Tío boards the rails/)).toBeInTheDocument();
    // 憑いたプレイヤー名が埋め込まれている。
    // **名前は2か所に出る。**国ごとのフレーバー文と、仕組みの説明(SpiritBriefing)。
    expect(screen.getAllByText("Illimani").length).toBeGreaterThan(0);
  });

  it("2回目以降は moves の文言を使い、乗り換えたことを伝える", () => {
    renderModal(false);
    expect(screen.getByText(/changes trains/)).toBeInTheDocument();
    expect(screen.queryByText(/boards the rails/)).not.toBeInTheDocument();
  });

  it("厄災の神の「なぜ」と「どうすれば離れるか」を書く", () => {
    renderModal(true);
    // 実装どおりの説明であること(目的地からいちばん遠い人に憑く)。
    // 「最も遠い人に憑く」は、国のフレーバー文と仕組みの説明の両方に出る。
    expect(screen.getAllByText(/farthest from/).length).toBeGreaterThan(0);
    expect(screen.getByText(/moves to whoever is farthest right then/)).toBeInTheDocument();
    // 供物(ボリビアは ward アイテム)で1回だけ肩代わりできること。
    expect(screen.getByText(/buys off one disaster/)).toBeInTheDocument();
  });

  it("誰の到着で目的地が変わったのかを出す", () => {
    renderModal(false, { arrivedBy: "Illimani", prize: "Bs 350,000" });
    // 「到着 — <b>Illimani</b>」の行。名前は仕組みの説明にも出るので、数で見る。
    expect(screen.getAllByText("Illimani", { selector: "b" }).length).toBeGreaterThanOrEqual(2);
  });

  it("CPUの手番でも押して飛ばせる(文言は「出発」ではなく「続ける」)", () => {
    renderModal(false, { onCpuTurn: true });
    // 出発するのは自分ではないので「Full steam」は出さない。
    expect(screen.queryByRole("button", { name: /steam/i })).toBeNull();
    // ただしボタン自体はある。見せ場は必ず飛ばせる。
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
  });
});
