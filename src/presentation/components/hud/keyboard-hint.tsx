"use client";

import { useEffect, useState } from "react";
import { useLocale } from "../../i18n/locale-context";
import { hasSeenKeyboardHint, markKeyboardHintSeen } from "../../hooks/keyboard-hint-seen";

/**
 * キーボードでも遊べることの案内(F-18)。手番パネルの中、サイコロの下に一度だけ出す。
 *
 * 実プレイで「Space でサイコロが振れたが、意図した機能なのか分からない」と
 * 観察された。割り当ては `use-turn-keys.ts`(Space)と `board-view.tsx`(←→・Enter)で
 * 正式にしたが、**あることを知らなければ無いのと同じ**。パス&プレイで机の上の
 * PC に手を伸ばすとき、キー1つで済むと分かっていれば操作が軽くなる。
 *
 * ## 出すとき・出さないとき
 *
 * - 自分が振れる手番になった最初の1回だけ。出したことは覚えて二度目は出さない
 *   (`keyboard-hint-seen.ts`)。
 * - **指でしか触れない端末では出さない**(`hover: none` かつ `pointer: coarse`)。
 *   スマホにキーボードの話をしても邪魔なだけ。
 * - 案内の中のキーを実際に使ったら、分かったと見なして閉じる。
 *   使わなくても `AUTO_HIDE_MS` で引っ込む(読まなくても遊びは進む)。
 */
export function KeyboardHint({ active }: { active: boolean }) {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  // 振れる手番になってから少し置いて出す(カメラが寄り切って、サイコロに目が行ったころ)。
  useEffect(() => {
    if (!active || visible) return;
    if (hasSeenKeyboardHint() || isTouchOnlyDevice()) return;
    const timer = window.setTimeout(() => {
      markKeyboardHintSeen();
      setVisible(true);
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, visible]);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), AUTO_HIDE_MS);
    // 案内したキーが押されたら、もう分かっている。
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter" || e.key.startsWith("Arrow")) setVisible(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="key-hint" role="note" data-testid="keyboard-hint">
      <span className="key-hint-title">{t("keyHintTitle")}</span>
      <span className="key-hint-keys">
        <span>
          <kbd>Space</kbd> {t("keyHintRoll")}
        </span>
        <span>
          <kbd>←</kbd>
          <kbd>→</kbd> {t("keyHintChoose")}
        </span>
        <span>
          <kbd>Enter</kbd> {t("keyHintConfirm")}
        </span>
      </span>
      <button type="button" className="key-hint-close" aria-label={t("close")} onClick={() => setVisible(false)}>
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}

/** 出すまでの間。手番の切り替えのカメラ移動(board-view.tsx の TURN_SWITCH_MS)より後。 */
export const SHOW_DELAY_MS = 800;

/** 読まれなくても消える。手番1回ぶんより少し長く。 */
export const AUTO_HIDE_MS = 14_000;

/** 指でしか触れない端末か。判定できない環境(テスト等)では「キーボードがある」と見なす。 */
export function isTouchOnlyDevice(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}
