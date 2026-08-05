"use client";

import { COUNTRY_INDEX } from "../../../infrastructure/content/country-index";
import { SavedGameSummary } from "../../state/game-store-types";
import { useLocale } from "../../i18n/locale-context";
import { formatMoney } from "../../i18n/money-format";

/**
 * 「続きから」の中身を見せるカード。
 *
 * ボタンだけだと**どの旅が保存されているのか分からず**、押すまで国も進行度も
 * 参加者も確認できない。国名・何年目の何月か・参加者と所持金を先に見せて、
 * 意図した旅かどうかを判断できるようにする。
 *
 * 表示に必要な値は軽量な `country-index.json`(国名と通貨)とセーブデータだけで
 * 賄い、国のフルコンテンツ(約215KB)は読み込まない。
 */
export function SavedGameCard({
  saved,
  onResume,
  onDiscard,
}: {
  saved: SavedGameSummary;
  onResume: () => void;
  onDiscard: () => void;
}) {
  const { t, tx, monthName } = useLocale();
  const country = COUNTRY_INDEX.find((c) => c.id === saved.countryId);
  const year = Math.floor(saved.month / 12) + 1;
  // 進行度は「12ヶ月中3ヶ月目」のように1始まりで見せる。
  const elapsed = Math.min(saved.month + 1, saved.maxMonths);
  const progressRatio = Math.min(1, saved.month / Math.max(1, saved.maxMonths));

  return (
    <div className="saved-card">
      <div className="eyebrow">{t("savedJourney")}</div>

      <div className="saved-head">
        <span className="saved-country">{country ? tx(country.name) : saved.countryId}</span>
        <span className="saved-when">
          {t("year")} {year} · {monthName(saved.month)}
        </span>
      </div>

      <div className="saved-progress" role="presentation">
        <div className="saved-progress-bar" style={{ width: `${Math.round(progressRatio * 100)}%` }} />
      </div>
      <div className="saved-progress-label">{t("monthProgress", elapsed, saved.maxMonths)}</div>

      <div className="saved-players">
        {saved.players.map((player) => (
          <span className="saved-player" key={player.name}>
            <span className="nm">{player.name}</span>
            {player.isCpu && <span className="cpu-tag">CPU</span>}
            <span className="cash">
              {country ? formatMoney(player.cash, country.currency) : player.cash}
            </span>
          </span>
        ))}
      </div>

      <div className="btnrow">
        <button className="btn" style={{ flex: 1 }} onClick={onResume}>
          {t("resume")}
        </button>
        <button className="btn ghost" onClick={onDiscard}>
          {t("discardSave")}
        </button>
      </div>
    </div>
  );
}
