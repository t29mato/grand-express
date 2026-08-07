import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 音まわりの操作のためのUI文言。
 *
 * `src/i18n/messages/*.json` は `scripts/extract-legacy-content.mjs` の生成物なので
 * 直接書き足すと次の抽出で消える。legacy 由来でない文言はここに置き、
 * `messages.ts` で読み込み時にマージする(`setup-messages.ts` と同じ作法)。
 *
 * `musicToggle` はボタンの読み上げ名。**入り切りで変えない**
 * (切り替えボタンの名前は状態で変えず、状態は `aria-pressed` で伝えるのが作法)。
 * `musicTurnOn` / `musicTurnOff` は、マウスで触る人向けの吹き出し(title)に使う。
 */
export const SOUND_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    musicToggle: "Music",
    musicTurnOn: "Turn the music on",
    musicTurnOff: "Turn the music off",
  },
  es: {
    musicToggle: "Música",
    musicTurnOn: "Activar la música",
    musicTurnOff: "Silenciar la música",
  },
  fr: {
    musicToggle: "Musique",
    musicTurnOn: "Activer la musique",
    musicTurnOff: "Couper la musique",
  },
  ja: {
    musicToggle: "音楽",
    musicTurnOn: "音楽を鳴らす",
    musicTurnOff: "音楽を止める",
  },
};
