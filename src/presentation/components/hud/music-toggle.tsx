"use client";

import { useMusicEnabled } from "../../hooks/use-music-enabled";
import { useLocale } from "../../i18n/locale-context";

/**
 * BGMの入り切りボタン。トップ画面とゲーム画面の両方のヘッダーに置く。
 *
 * 止まるのは音楽だけで、サイコロや購入の効果音は残る
 * (鳴り続けていて邪魔になるのは音楽の方で、効果音は自分の操作への返事なので)。
 * 設定はブラウザに覚えさせるため、次に開いたときも切ったままになる。
 *
 * 読み上げのために、名前は入り切りで変えず(`aria-label` は「音楽」で固定)、
 * いま鳴っているかどうかは `aria-pressed` で伝える。
 * 絵だけでは何のボタンか分からないので、マウスの人には `title` で動作を出す。
 */
export function MusicToggle() {
  const { t } = useLocale();
  const [enabled, setEnabled] = useMusicEnabled();

  return (
    <button
      type="button"
      className={`music-toggle${enabled ? " on" : ""}`}
      data-testid="music-toggle"
      aria-label={t("musicToggle")}
      aria-pressed={enabled}
      title={enabled ? t("musicTurnOff") : t("musicTurnOn")}
      onClick={() => setEnabled(!enabled)}
    >
      <svg
        viewBox="0 0 24 24"
        role="presentation"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 17V5l11-2v12" />
        <circle cx="6" cy="17" r="3" />
        <circle cx="17" cy="15" r="3" />
        {/* 切っているときは音符に斜線を重ねる(色の違いだけに頼らない)。 */}
        {!enabled && <path d="M3 21 21 3" />}
      </svg>
    </button>
  );
}
