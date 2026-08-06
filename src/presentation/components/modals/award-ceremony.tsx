"use client";

import { useState } from "react";
import { Award, AWARD_TEXT_KEYS } from "../../../domain/game-session/awards";
import { GameSession } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { AwardTrophy } from "../events/award-trophy";

/**
 * 表彰式。
 *
 * 最終順位をいきなり出すと、その一画面で勝負が分かってしまう。
 * 総資産以外の観点の賞を**1つずつめくって**から順位へ進むことで、
 * 最後まで誰が勝ったのか分からないようにする。
 *
 * 賞が1つも無い旅(短い旅など)では何も挟まず、そのまま順位へ進む。
 */
export function AwardCeremony({
  awards,
  session,
  context,
  onFinish,
}: {
  awards: readonly Award[];
  session: GameSession;
  context: GameEngineContext;
  onFinish: () => void;
}) {
  const { t, tx } = useLocale();
  const [shown, setShown] = useState(0);
  const award = awards[shown];
  const last = shown >= awards.length - 1;

  if (!award) return null;

  const winner = session.players.find((p) => p.id === award.winnerId);
  const keys = AWARD_TEXT_KEYS[award.id];
  const regionName =
    award.regionId !== undefined ? context.content.regions.get(award.regionId) : undefined;

  return (
    <>
      <div className="eyebrow">{t("awardsTitle")}</div>
      <p style={{ color: "var(--salt-dim)" }}>{t("awardsLead")}</p>

      {/* key を変えることで、賞がめくられるたびに絵が最初から再生される。 */}
      <div className="event-anim award-stage" key={award.id}>
        <AwardTrophy />
      </div>

      <h3 className="award-name">{t(keys.name)}</h3>
      <p className="award-winner">{winner?.name ?? award.winnerId}</p>
      <p className="award-detail">
        {t(keys.detail, String(award.value))}
        {regionName ? ` · ${tx(regionName)}` : ""}
      </p>

      <div className="award-progress" aria-hidden="true">
        {awards.map((a, i) => (
          <span key={a.id} className={i <= shown ? "on" : ""} />
        ))}
      </div>

      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn" onClick={() => (last ? onFinish() : setShown(shown + 1))}>
          {last ? t("awardsToResults") : t("awardsNext")}
        </button>
      </div>
    </>
  );
}
