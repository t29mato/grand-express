"use client";

import { SeasonDefinition } from "../../../domain/season/season-effect";
import { useLocale } from "../../i18n/locale-context";
import { Modal } from "./modal";

/**
 * 月替わりのたびに表示する季節イベントのモーダル
 * (legacyの `applySeason()` 内の `modalOnce(...)` の移植)。
 * 季節効果そのもの(地方収入の補正・全員の現金増減・厄災の休止など)は
 * `advanceTurn` ユースケースの時点ですでにセッションへ反映済みで、
 * このモーダルはその内容を読み物として見せるだけの表示用コンポーネント。
 */
export function SeasonModal({ season, onContinue }: { season: SeasonDefinition; onContinue: () => void }) {
  const { t, tx, monthName } = useLocale();

  return (
    <Modal testId="season-modal">
      <div className="eyebrow">
        {t("monthEvent")} · {monthName(season.monthIndex)}
      </div>
      <h3>
        {season.emoji} {tx(season.name)}
      </h3>
      <p>{tx(season.narrative)}</p>
      <div className="fact">
        <b>{t("didYouKnow")}</b> {tx(season.fact)}
      </div>
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn" onClick={onContinue}>
          {t("continue")}
        </button>
      </div>
    </Modal>
  );
}
