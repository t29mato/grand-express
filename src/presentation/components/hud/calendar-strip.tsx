"use client";

import { useEffect, useRef, useState } from "react";
import { GameSession, currentYear, seasonIndex } from "../../../domain/game-session/game-session";
import { useLocale } from "../../i18n/locale-context";
import { prefersReducedMotion } from "../../state/motion-preference";

/**
 * いま何月で、旅の終わりまであと何ヶ月かを常に見せる帯。手番パネルの真上に置く。
 *
 * 勝ち負けは「決められた月数が過ぎたときの資産」で決まるのに、遊んでいる最中の
 * 画面には**今が何月か・あと何手番かがどこにも無かった**(あったのは旅人一覧の
 * 下の「年目 1・日本」の札だけ)。季節の出来事のカードから逆算するしかなく、
 * 終盤の「そろそろ稼ぎ切らないと」という判断ができなかった。開始画面の
 * 「続きから」には「Year 1・May / Month 2 of 12」があるのに、盤面には無い。
 *
 * ## 数の出どころ
 *
 * `session.month`(0始まりの経過月)と `session.maxMonths`(総月数)から出す。
 * 「続きから」のカード(`setup/saved-game-card.tsx`)と同じ計算で、12ヶ月と
 * 決め打ちしない(設定で24・36ヶ月も選べる)。
 *
 * - 月名は `monthName(seasonIndex)`。既存の季節の出来事と同じ表(0=4月始まり)。
 * - **残り月数は今月を含めて数える。**含めないと最後の月が「残り0ヶ月」になり、
 *   まだ手番があるのに終わったように読める。最後の月は数ではなく「最後の月」と書く。
 * - 年は、総月数が12を超えるときだけ出す。1年で終わる旅で「1年目」は情報にならない。
 *
 * ## 演出と色
 *
 * 月が替わった瞬間だけ、月名を小さくめくる(`is-flipping`)。動きを減らす設定では
 * めくらない——CSS側の `prefers-reduced-motion` も効くが、JS側でクラスを付けなければ
 * 待ちも起きない。残り2ヶ月からは帯の色を変えて(`is-ending`)、終わりが近いことを
 * 目で分かるようにする。**音は変えない。**音楽は別の担当。
 *
 * ## 読み上げ
 *
 * 帯全体を `role="group"` にして、`aria-label` に「5月、残り8ヶ月」の一文を持たせる。
 * 中の目盛りや飾りは読み上げから外す(12個の点を1つずつ読まれても意味が無い)。
 */
export function CalendarStrip({ session }: { session: GameSession }) {
  const { t, monthName } = useLocale();

  const month = monthName(seasonIndex(session));
  const year = currentYear(session);
  const showYear = session.maxMonths > 12;
  const remaining = Math.max(0, session.maxMonths - session.month);
  const ending = remaining <= ENDING_THRESHOLD_MONTHS;
  const remainingText = remaining <= 1 ? t("calendarLastMonth") : t("calendarMonthsLeft", remaining);
  const when = showYear ? `${t("year")} ${year} · ${month}` : month;
  const label = t("calendarLabel", when, remainingText) + (ending ? `. ${t("calendarEnding")}` : "");

  // 月が替わったときだけめくる。初回(旅の開始・再開)は替わったのではないので黙っている。
  const [flipping, setFlipping] = useState(false);
  const previousMonth = useRef<number | null>(null);
  useEffect(() => {
    const before = previousMonth.current;
    previousMonth.current = session.month;
    if (before === null || before === session.month || prefersReducedMotion()) return;
    setFlipping(true);
    const timer = window.setTimeout(() => setFlipping(false), FLIP_MS);
    return () => window.clearTimeout(timer);
  }, [session.month]);

  const className = ["calendar-strip", ending ? "is-ending" : "", flipping ? "is-flipping" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} role="group" aria-label={label}>
      <div className="calendar-row" aria-hidden="true">
        {/* `key` に月を付けて、替わるたびに新しい要素にする。同じ要素にクラスを
            付け直すだけだと、連続で替わったときにめくり直されない。 */}
        <span className="calendar-month" key={session.month}>
          {showYear && <span className="calendar-year">{t("year")} {year}</span>}
          {month}
        </span>
        <span className="calendar-left">{remainingText}</span>
      </div>
      {/* 月ごとの目盛り。過ぎた月を埋め、今月を光らせる。あと何手番かが数えなくても見える。 */}
      <div className="calendar-ticks" aria-hidden="true">
        {Array.from({ length: session.maxMonths }, (_, i) => (
          <span
            key={i}
            className={`calendar-tick${i < session.month ? " is-done" : i === session.month ? " is-now" : ""}`}
          />
        ))}
      </div>
      {ending && (
        <div className="calendar-ending" aria-hidden="true">
          {t("calendarEnding")}
        </div>
      )}
    </div>
  );
}

/** 残りがこの月数以下になったら、帯の色を変える。 */
export const ENDING_THRESHOLD_MONTHS = 2;

/** めくる演出の長さ。CSS の `calendar-flip` と合わせる。 */
const FLIP_MS = 700;
