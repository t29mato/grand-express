"use client";

import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { GuideState, UiState } from "../../state/game-store-types";
import { useLocale } from "../../i18n/locale-context";

/**
 * 「はじめて」の人の、最初の数手番だけ出る1行ガイド。
 *
 * ## なぜ要るか
 *
 * 「はじめて」を選んでも、遊びかたの説明は出発モーダルの約120字のヒント文
 * (マスが光る/前後どちらでも/町で購入/全部買えば2倍/12ヶ月)**1つだけ**だった。
 * 最初の手番でどちらのマスを選べばよいかのヒントはどこにも無く、実プレイの記録
 * (2026-09-02、日本盤面)では**最初の町に着くまで5手番かかっている。**
 *
 * 盤面のほうを疑って測った。47盤面すべてで出発地から2〜3マスに町があり、
 * 1手番目に町へ止まれる出目は6通り中4.1通り(日本は5通り)。
 * **盤面は悪くない。選びかたが分からなかっただけ。**
 * だから足すのは町ではなく、その場の一言のほう。
 *
 * ## 決めごと
 *
 * - **モーダルにしない。**手を止めない。読み飛ばせる(「ヒントを消す」)。
 * - **1行に1つのことだけ書く。**120字のヒント文が読まれなかったのは、
 *   5つのことが一度に書いてあったから。
 * - 盤面のガイド(サイコロ・マス選び)は**最初の3手番だけ。**
 *   町の一言だけは手番の数で切らない——町が遠い引きだと、
 *   いちばん出したい場面で一度も出ないまま終わるため。
 */
export function FirstTurnsGuide({
  session,
  ui,
  guide,
  walking,
  onDismiss,
}: {
  session: GameSession;
  ui: UiState;
  guide: GuideState;
  /** 駒が道のりを歩いている最中か(歩いているあいだは候補が消えている)。 */
  walking: boolean;
  onDismiss: () => void;
}) {
  const { t } = useLocale();
  const key = guideMessageKeyFor({ session, ui, guide, walking });
  if (!key) return null;

  return (
    <div className="first-turns-guide-slot">
      {/* 文言が入れ替わったことを読み上げに伝える。割り込ませないよう polite。 */}
      <div className="first-turns-guide" role="status">
        <span className="ftg-text">{t(key)}</span>
        <button type="button" className="ftg-hide" onClick={onDismiss}>
          {t("guideHide")}
        </button>
      </div>
    </div>
  );
}

/** 盤面のガイド(サイコロ・マス選び)を出す手番の数。 */
export const GUIDED_TURNS = 3;

/**
 * いま出すべき一言の文言キー(出さないなら null)。
 *
 * **どの場面で何を言うかは、ここだけが決める。**描画側に分岐を散らすと、
 * 「この場面だけ出ない」が後から入り込む。
 */
export function guideMessageKeyFor({
  session,
  ui,
  guide,
  walking,
}: {
  session: GameSession;
  ui: UiState;
  guide: GuideState;
  walking: boolean;
}): string | null {
  if (guide.dismissed) return null;
  const player = currentPlayer(session);
  // **画面の前の人ではなく、手番の人で決める。**言うのは「いま何をすればいいか」
  // なので、その手番の人が「はじめて」でなければ言うことがない。
  if (player.isCpu || player.knowledgeLevel !== "newcomer") return null;

  // 町の一言は、町の画面が開いているあいだだけ。手番の数では切らない。
  if (ui.kind === "city") return guide.cityHintOpen ? "guideBuyProperty" : null;

  if (guide.turnsRolled > GUIDED_TURNS) return null;
  // 候補が光っているあいだ。歩き始めたらもう選べないので黙る。
  if (ui.kind === "choosing-square") return walking ? null : "guideChooseSquare";
  // まだ振っていない手番。3手番ぶん振り終えたら、もう言わない。
  if (ui.kind === "idle" && guide.turnsRolled < GUIDED_TURNS) return "guideRoll";
  return null;
}
