"use client";

import { useEffect, useState } from "react";
import { Award, AWARD_TEXT_KEYS } from "../../../domain/game-session/awards";
import { GameSession } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { arrivalText } from "../../i18n/arrival-messages";
import { AwardTrophy } from "../events/award-trophy";
import { playerColor } from "../player-colors";
import { soundAdapter } from "../../state/game-store-dependencies";

/**
 * 表彰式。
 *
 * 最終順位をいきなり出すと、その一画面で勝負が分かってしまう。
 * 総資産以外の観点の賞を**1つずつめくって**から順位へ進むことで、
 * 最後まで誰が勝ったのか分からないようにする。
 *
 * 賞が1つも無い旅(短い旅など)では何も挟まず、そのまま順位へ進む。
 *
 * ここは旅の終わりなので、**他のどの場面よりも華やかにする。**
 * 1つめくるごとにファンファーレを鳴らし、最後の1つは勝利の音に変える。
 * 紙吹雪も、最後だけ量を増やす。
 *
 * 受賞者の名前には**駒の色**を添える(`player-colors.ts`)。盤面・旅人一覧と
 * 同じ色なので、名前を読まなくても誰か分かる——ただし色だけに頼らず名前も出す。
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
  const { t, tx, locale } = useLocale();
  const [shown, setShown] = useState(0);
  const award = awards[shown];
  const last = shown >= awards.length - 1;

  // 賞がめくられるたびに鳴らす。最後の1つは勝利の音にして、区切りを付ける。
  useEffect(() => {
    if (!awards[shown]) return;
    if (shown >= awards.length - 1) soundAdapter.playWin();
    else soundAdapter.playFanfare();
  }, [shown, awards]);

  if (!award) return null;

  const winnerIndex = session.players.findIndex((p) => p.id === award.winnerId);
  const winner = session.players[winnerIndex];
  const keys = AWARD_TEXT_KEYS[award.id];
  const regionName =
    award.regionId !== undefined ? context.content.regions.get(award.regionId) : undefined;

  return (
    <>
      <div className="eyebrow">{t("awardsTitle")}</div>
      <p style={{ color: "var(--salt-dim)" }}>{t("awardsLead")}</p>

      {/* key を変えることで、賞がめくられるたびに絵が最初から再生される。 */}
      <div className={`event-anim award-stage${last ? " finale" : ""}`} key={award.id}>
        <AwardTrophy />
        {/* 紙吹雪。最後の賞だけ倍に増やして、締めくくりを分かるようにする。 */}
        <div className="award-confetti" aria-hidden="true">
          {Array.from({ length: last ? 28 : 14 }, (_, i) => (
            <span key={i} style={{ ["--i" as string]: i }} />
          ))}
        </div>
      </div>

      <h3 className="award-name">{t(keys.name)}</h3>
      <p className="award-winner">
        {winner && <span className="finale-dot" style={{ background: playerColor(winnerIndex) }} aria-hidden="true" />}
        <span>{winner?.name ?? award.winnerId}</span>
      </p>
      <p className="award-detail">
        {t(keys.detail, String(award.value))}
        {regionName ? ` · ${tx(regionName)}` : ""}
      </p>

      {/* 最後の賞には、ここで表彰が終わりだと一言添える(次のボタンが「そして優勝は…」に変わる理由)。 */}
      {last && <p className="award-done">{arrivalText(locale, "awardsFinish")}</p>}

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
