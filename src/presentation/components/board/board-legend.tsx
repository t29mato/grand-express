"use client";

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
 */
export function BoardLegend({ currency }: { currency: CurrencyFormat }) {
  const { t } = useLocale();

  const rows: readonly { color: string; label: string }[] = [
    {
      color: SQUARE_QUIZ_COLOR,
      // 難易度によって増減額が変わるので、凡例では下限〜上限の幅で示す。
      label: `+${formatMoney(quizReward(MIN_QUIZ_DIFFICULTY).winAmount, currency)}〜${formatMoney(
        quizReward(MAX_QUIZ_DIFFICULTY).winAmount,
        currency,
      )}`,
    },
    { color: "#5b8fe8", label: t("blueSq") },
    { color: "#e05252", label: t("redSq") },
    { color: "#f6efe2", label: t("townSq") },
  ];

  return (
    <div className="board-legend" aria-hidden="true">
      {rows.map((row, i) => (
        <div className="board-legend-row" key={row.label}>
          <span
            className={`board-legend-chip${i === rows.length - 1 ? " town" : ""}`}
            style={{ background: row.color }}
          />
          <span>{row.label}</span>
        </div>
      ))}
    </div>
  );
}
