"use client";

import { useState } from "react";
import { CurrencyFormat } from "../../../domain/country/country-content-pack";
import { MAX_QUIZ_DIFFICULTY, MIN_QUIZ_DIFFICULTY, quizReward } from "../../../domain/quiz/quiz-question";
import { useLocale } from "../../i18n/locale-context";
import { formatMoney } from "../../i18n/money-format";

/** クイズマスの色(board-view の SQUARE_STYLES と同じ)。難易度で色分けはしない。 */
const SQUARE_QUIZ_COLOR = "#f5b31c";

/**
 * マスの見かたを示す凡例。
 *
 * legacy は盤面の右下(`translate(BW-286, BH-232)`)にSVGとして置いていたが、
 * それだと**盤面の右下に陸地がある国で地名に必ず被る**
 * (フランスのコルシカ島=アジャクシオ、世界一周のオークランド)。
 * ズームすると凡例まで拡大・縮小されるのも読みにくかった。
 *
 * 盤面の座標系から出して、画面の隅に貼るHTMLにした。地図の内容と衝突せず、
 * どこまで寄っても同じ大きさで読める。
 *
 * 書く内容は**色の名前ではなく起きること**。「青マス」「赤マス」とだけ
 * 書いてあった頃は、赤に止まって所持金が減るまで赤が危ないと分からなかった。
 *
 * 狭い画面では常時出すと地図を覆ってしまうので、たたんでボタンにする。
 * 以前は単に非表示にしていたが、それだと**スマホで遊ぶ人は凡例を一度も
 * 見られない**(いちばん説明を必要とする人に届かない)。
 */
export function BoardLegend({ currency }: { currency: CurrencyFormat }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  // 難易度によって増減額が変わるので、凡例では下限〜上限の幅で示す。
  const quizRange = `+${formatMoney(quizReward(MIN_QUIZ_DIFFICULTY).winAmount, currency)}〜${formatMoney(
    quizReward(MAX_QUIZ_DIFFICULTY).winAmount,
    currency,
  )}`;

  const rows: readonly { color: string; label: string; town?: boolean }[] = [
    { color: SQUARE_QUIZ_COLOR, label: t("legendQuiz", quizRange) },
    { color: "#5b8fe8", label: t("legendBlue") },
    { color: "#e05252", label: t("legendRed") },
    { color: "#7c7469", label: t("legendQuiet") },
    { color: "#f6efe2", label: t("townSq"), town: true },
  ];

  return (
    <div className="board-legend-wrap">
      {/* 狭い画面だけに出るたたみボタン。広い画面ではCSSで隠す。 */}
      {/*
        読み上げ名は `aria-label` で固定する。狭い画面では文字を隠して
        「?」だけの丸ボタンにするので、見えている文字に名前を頼れない
        (文字が消えると、読み上げでは名前の無いボタンになってしまう)。
      */}
      <button
        type="button"
        className="board-legend-toggle"
        aria-label={t("legendTitle")}
        aria-expanded={open}
        aria-controls="board-legend"
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{open ? "×" : "?"}</span>
        <span className="board-legend-toggle-text" aria-hidden="true">
          {t("legendTitle")}
        </span>
      </button>
      <div id="board-legend" className={`board-legend${open ? " open" : ""}`}>
        <div className="board-legend-title">{t("legendTitle")}</div>
        {rows.map((row) => (
          <div className="board-legend-row" key={row.label}>
            <span
              className={`board-legend-chip${row.town ? " town" : ""}`}
              style={{ background: row.color }}
            />
            <span>{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
