"use client";

import { useEffect } from "react";
import { CityId } from "../../../domain/shared-kernel/ids";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { formatMoney } from "../../i18n/money-format";
import { arrivalText } from "../../i18n/arrival-messages";
import { prefersReducedMotion } from "../../state/motion-preference";
import { CityArt } from "../city/city-art";
import { playerColor } from "../player-colors";

/**
 * 目的地に着いた瞬間の、画面いっぱいの演出。
 *
 * ## なぜ足したか
 *
 * この遊びの最大の見せ場は目的地への到達なのに、CPUが着いて賞金を
 * 受け取ったことに、遊んでいる人がまったく気づかなかった
 * (実プレイの記録 2026-09-02。あとから旅の記録を読んで知った)。
 * v0.61.0 で「誰の手番でも止めて見せる」ところまでは入ったが、
 * 出るのは他の出来事と同じ地味な札だった。
 * ここでは**町の絵・誰が着いたか・賞金**の3つを、他のどの場面よりも大きく出す。
 *
 * ## 誰の話かを、文の外に出す
 *
 * この画面は**CPUが着いたときにも出る。**「あなたが到着しました」と書くと、
 * CPUの到着を自分のことだと読んでしまう(`hud/board-status.tsx` に同じ失敗の
 * 記録がある)。色の丸と名前を先に置き、文は「東京に到着!」のように主語を持たない。
 * 色は駒・旅人一覧と同じ並び(`player-colors.ts`)。**色だけに頼らない**——名前を必ず添える。
 *
 * ## 音は鳴らさない
 *
 * 到着の音は状態側(`game-store-turn-flow.ts`)が `soundAdapter.playArrival()` で
 * 鳴らしている。ここでも鳴らすと二重になる。
 *
 * ## 必ず飛ばせる
 *
 * 画面のどこを押しても閉じる。ボタンとEscキーでも閉じる(読み上げ・キーボード向け)。
 * 動きを減らす設定(`prefersReducedMotion`)では、後光と紙吹雪を出さず静止した札にする。
 */
export function ArrivalFanfare({
  context,
  playerName,
  playerIndex,
  cityId,
  prize,
  isFirstArrival,
  onDone,
}: {
  context: GameEngineContext;
  playerName: string;
  /** 何人目か。駒の色はここから引く(`playerColor`)。 */
  playerIndex: number;
  cityId: CityId;
  /** 獲得した賞金(内部値。通貨表記への整形はここで行う)。 */
  prize: number;
  /** 一番乗りかどうか。真ならさらに華やかにする。 */
  isFirstArrival: boolean;
  /** 閉じる。クリック/タップでいつでも呼ばれる。 */
  onDone: () => void;
}) {
  const { t, tx, locale } = useLocale();
  const ta = (key: string, ...args: (string | number)[]) => arrivalText(locale, key, ...args);
  const color = playerColor(playerIndex);
  const still = prefersReducedMotion();
  const cityName = tx(context.getCity(cityId).name);
  const amount = formatMoney(prize, context.content.currency);
  const title = ta("fanfareArrivedIn", cityName);

  // Escキーでも閉じられるようにする(ポインタを使わない人向け)。
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  const className = ["arrival-fanfare", isFirstArrival ? "first" : "", still ? "still" : ""].filter(Boolean).join(" ");

  return (
    <div
      className={className}
      data-testid="arrival-fanfare"
      role="dialog"
      aria-modal="true"
      aria-label={`${playerName} — ${title}`}
      style={{ ["--fanfare-color" as string]: color }}
      onClick={onDone}
    >
      {/* 後光と紙吹雪は飾り。動きを止める設定では出さない(静止した札で十分読める)。 */}
      {!still && <div className="fanfare-rays" aria-hidden="true" />}
      {!still && (
        <div className="fanfare-confetti" aria-hidden="true">
          {/* 横の位置は 37% ずつずらして散らす(乱数を使わないので描画のたびに同じ絵)。 */}
          {Array.from({ length: isFirstArrival ? 30 : 18 }, (_, i) => (
            <span
              key={i}
              style={{ ["--x" as string]: `${(i * 37) % 100}%`, ["--d" as string]: `${(i * 0.11).toFixed(2)}s` }}
            />
          ))}
        </div>
      )}

      <div className="fanfare-card">
        <div className="fanfare-eyebrow">{t("arrivalTitle")}</div>
        {/* 誰が着いたか。文の前に置く(文そのものには人を入れない)。 */}
        <div className="fanfare-who">
          <span className="fanfare-dot" style={{ background: color }} aria-hidden="true" />
          <span>{playerName}</span>
        </div>
        {isFirstArrival && (
          <div>
            <span className="fanfare-first">{ta("fanfareFirst")}</span>
          </div>
        )}
        <div className="fanfare-art">
          <CityArt context={context} cityId={cityId} />
        </div>
        <h2 className="fanfare-title">{title}</h2>
        <div className="fanfare-prize">
          <span className="fanfare-prize-label">{ta("fanfarePrizeLabel")}</span>
          <span className="fanfare-prize-amount money">+{amount}</span>
        </div>
        <p className="fanfare-hint">{ta("fanfareTap")}</p>
        {/* ボタンからの click は上の onClick まで届く(閉じるのは一度だけ)。 */}
        <div className="btnrow">
          <button
            className="btn"
            onClick={(event) => {
              event.stopPropagation();
              onDone();
            }}
          >
            {t("continue")}
          </button>
        </div>
      </div>
    </div>
  );
}
