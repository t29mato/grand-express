"use client";

import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { COUNTRY_INDEX } from "../../../infrastructure/content/country-index";
import { SavedGameSummary } from "../../state/game-store-types";
import { useLocale } from "../../i18n/locale-context";

/**
 * 開いてから「消す」を押せるようになるまでの間。
 * 待たされたと感じない程度に短く、連打の2打目(だいたい150〜250ms間隔)より長く。
 */
export const SETTLE_MS = 400;

/**
 * 保存された旅を消す前の確認。
 *
 * 「削除」を押した瞬間に消えていた。**12ヶ月遊んだものが、押し間違い1回で無くなる。**
 * ここで一度止める。
 *
 * ## 設計で効いているところ
 *
 * - **既定は「消さない」。**開いた直後のフォーカスは「消さずに置いておく」に置く。
 *   Enter を押しっぱなしにしていても、Space を空打ちしても、消えない。
 *   Escape も同じく「消さない」に倒す。
 * - **消えるものを見せる。**国・何年目の何月・何ヶ月中何ヶ月目・旅人の名前。
 *   「本当に消しますか」だけだと、**どの旅の話か**が分からないまま押すことになる。
 *   セーブは1つだけなので取り違えは起きないが、12ヶ月遊んだものだと気付けるかどうかで
 *   押す指が止まる。
 * - **背景を押しても閉じない。**「削除」を押した指がそのまま下の暗幕に触れると、
 *   確認が一瞬で消えて「押したのに何も起きない」ように見える。
 *   閉じ方はボタンと Escape に限る。
 * - **開いた直後は「消す」を押せない**(`SETTLE_MS`)。375pxで測ったところ、
 *   「消す」が出る場所は**さっき「削除」を押した指の位置とほぼ同じ**だった
 *   (削除 x256-346 y441-483 / 消す x244-338 y440-482)。反応が無いと思って
 *   もう一度叩くと、2打目がそのまま削除に届く。位置をずらすだけでは画面の高さが
 *   変わると元に戻るので、**時間**で止める。
 * - **言語切替はここに置かない。**他のモーダル(`modal.tsx`)は中でも切り替えられる
 *   ようにしているが、ここは「消す/消さない」の二択で、Tab の行き先が増えるほど
 *   消すほうへ触れる機会が増える。読み直したければ「消さずに置いておく」で戻れる。
 */
export function DiscardConfirm({
  saved,
  onConfirm,
  onCancel,
}: {
  saved: SavedGameSummary;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { t, tx, monthName } = useLocale();
  const titleId = useId();
  const bodyId = useId();
  const keepRef = useRef<HTMLButtonElement>(null);
  const deleteRef = useRef<HTMLButtonElement>(null);

  const country = COUNTRY_INDEX.find((c) => c.id === saved.countryId);
  const year = Math.floor(saved.month / 12) + 1;
  const elapsed = Math.min(saved.month + 1, saved.maxMonths);

  // 開いたら「消さない」ほうに合わせる。ここを外すと、押した勢いの Enter が
  // そのまま削除に届く。
  useEffect(() => {
    keepRef.current?.focus();
  }, []);

  // 連打の2打目を落とすための間。押せないあいだも見た目は変えない——
  // 一瞬だけ灰色になって戻るほうが、壊れているように見える。
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setSettled(true), SETTLE_MS);
    return () => clearTimeout(timer);
  }, []);

  /**
   * ボタンは2つだけなので、Tab は相手側へ送るだけで閉じ込められる。
   * 閉じ込めないと、Tab が背後のセットアップ画面へ抜けて、
   * 読み上げでは確認が消えたように聞こえる。
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
      return;
    }
    if (e.key !== "Tab") return;
    e.preventDefault();
    (document.activeElement === keepRef.current ? deleteRef : keepRef).current?.focus();
  };

  return (
    <div className="overlay" onKeyDown={handleKeyDown}>
      <div
        className="modal-box"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        data-testid="discard-confirm"
      >
        <div className="eyebrow">{t("savedJourney")}</div>
        <h3 id={titleId}>{t("discardConfirmTitle")}</h3>

        {/* 消えるものの中身。読み上げでも1つのまとまりとして読まれるよう、
            aria-describedby はこの箱を指している。
            `.saved-card` は付けない——E2Eが `.saved-card` で「続きから」のカードを
            引いているので、確認が開くと2件になって取り違える。中の文字だけ揃える。 */}
        <div
          id={bodyId}
          style={{
            margin: "12px 0",
            padding: "10px 12px",
            border: "1px solid var(--line)",
            borderRadius: 12,
            background: "var(--panel2)",
          }}
        >
          <div className="saved-head">
            <span className="saved-country">{country ? tx(country.name) : saved.countryId}</span>
            <span className="saved-when">
              {t("year")} {year} · {monthName(saved.month)}
            </span>
          </div>
          <div className="saved-progress-label">{t("monthProgress", elapsed, saved.maxMonths)}</div>
          <div className="saved-progress-label" style={{ marginTop: 4 }}>
            {t("travelers")}: {saved.players.map((p) => p.name).join(", ")}
          </div>
        </div>

        <p style={{ color: "var(--red)", fontWeight: 700 }}>{t("discardConfirmWarn")}</p>

        {/* 「消さない」を先に、そして目立つほうに置く。カードの
            「続きから / 削除」と同じ並び順なので、指の行き先も揃う。 */}
        <div className="btnrow">
          <button className="btn" style={{ flex: 1 }} ref={keepRef} onClick={onCancel}>
            {t("discardConfirmKeep")}
          </button>
          {/* `disabled` にはしない。400ms だけ灰色になって戻るほうが目に付くうえ、
              読み上げにも「使えません」と伝わってしまう。落とすのは連打の2打目だけで、
              読んでから押す人はこの間にはたどり着かない。 */}
          <button className="btn ghost" ref={deleteRef} onClick={() => settled && onConfirm()}>
            {t("discardConfirmDelete")}
          </button>
        </div>
      </div>
    </div>
  );
}
