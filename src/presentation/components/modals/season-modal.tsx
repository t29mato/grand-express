"use client";

import { createElement } from "react";
import { SeasonDefinition } from "../../../domain/season/season-effect";
import { useLocale } from "../../i18n/locale-context";
import { Modal } from "./modal";
import { seasonAnimationFor } from "../events/seasons";

/**
 * 月替わりのたびに表示する季節イベントのモーダル
 * (legacyの `applySeason()` 内の `modalOnce(...)` の移植)。
 * 季節効果そのもの(地方収入の補正・全員の現金増減・厄災の休止など)は
 * `advanceTurn` ユースケースの時点ですでにセッションへ反映済みで、
 * このモーダルはその内容を読み物として見せるだけの表示用コンポーネント。
 */
export function SeasonModal({
  season,
  countryId,
  onContinue,
}: {
  season: SeasonDefinition;
  /** その国のその月の絵を引くために使う。 */
  countryId: string;
  onContinue: () => void;
}) {
  const { t, tx, monthName } = useLocale();
  // createElement で組み立てる。大文字の局所変数をJSXで直に使うと、
  // 「描画のたびにコンポーネントを作っている」とlintに判定されるため。
  const scene = seasonAnimationFor(countryId, season.monthIndex);

  return (
    <Modal testId="season-modal">
      {/* 月の絵。まだ用意していない国・月では絵なしで文章だけになる。 */}
      {scene && <div className="event-anim">{createElement(scene)}</div>}
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
