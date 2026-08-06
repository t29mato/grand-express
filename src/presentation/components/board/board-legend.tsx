"use client";

import { CurrencyFormat } from "../../../domain/country/country-content-pack";
import { MAX_QUIZ_DIFFICULTY, MIN_QUIZ_DIFFICULTY, quizReward } from "../../../domain/quiz/quiz-question";
import { useLocale } from "../../i18n/locale-context";
import { formatMoney } from "../../i18n/money-format";

/** クイズマスの色(board-view の SQUARE_STYLES と同じ)。難易度で色分けはしない。 */
const SQUARE_QUIZ_COLOR = "#f5b31c";

/**
 * 盤面の右下に置く凡例(legacyの `drawBoard()` 末尾の移植)。
 * 行の順序・色・寸法・配置(盤面の右下から `translate(BW-286, BH-232)`)はlegacyと同じ。
 */
export function BoardLegend({
  boardWidth,
  boardHeight,
  currency,
}: {
  boardWidth: number;
  boardHeight: number;
  currency: CurrencyFormat;
}) {
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
    { color: "#f5d31c", label: t("cardSq") },
    { color: "#f6efe2", label: t("townSq") },
  ];

  return (
    <g transform={`translate(${boardWidth - 286},${boardHeight - 116})`} style={{ pointerEvents: "none" }}>
      <rect x={-14} y={-18} width={286} height={116} rx={12} fill="#141d31" opacity={0.82} />
      {rows.map((row, i) => {
        const y = i * 29;
        const isTown = i === rows.length - 1;
        return (
          <g key={row.label}>
            {isTown ? (
              <circle cx={9.5} cy={y + 9.5} r={9.5} fill={row.color} stroke="#20180f" strokeWidth={2} />
            ) : (
              <rect x={0} y={y} width={19} height={19} rx={5} fill={row.color} stroke="#20180f" strokeWidth={2} />
            )}
            <text x={30} y={y + 15} className="legend">
              {row.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
