import en from "../../i18n/messages/en.json";
import es from "../../i18n/messages/es.json";
import fr from "../../i18n/messages/fr.json";
import ja from "../../i18n/messages/ja.json";
import { Locale } from "../../domain/shared-kernel/localized-text";
import { SETUP_MESSAGES } from "./setup-messages";
import { FEEDBACK_MESSAGES } from "./feedback-messages";
import { GAME_LOG_MESSAGES } from "./game-log-messages";

export type UiMessages = typeof en;

/**
 * `src/i18n/messages/*.json` は抽出の生成物なので、legacy に無いUI文言は
 * `setup-messages.ts` 側に置いてここで重ねる(生成物を直接書き換えない)。
 */
export const MESSAGES_BY_LOCALE: Record<Locale, UiMessages> = {
  en: { ...en, ...SETUP_MESSAGES.en, ...FEEDBACK_MESSAGES.en, ...GAME_LOG_MESSAGES.en },
  es: { ...es, ...SETUP_MESSAGES.es, ...FEEDBACK_MESSAGES.es, ...GAME_LOG_MESSAGES.es },
  fr: { ...fr, ...SETUP_MESSAGES.fr, ...FEEDBACK_MESSAGES.fr, ...GAME_LOG_MESSAGES.fr },
  ja: { ...(ja as UiMessages), ...SETUP_MESSAGES.ja, ...FEEDBACK_MESSAGES.ja, ...GAME_LOG_MESSAGES.ja },
};

export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "es", "fr", "ja"];

/**
 * `{0}`, `{1}` ... 形式のプレースホルダーを埋め込む(現行コードの `T()`/`T2()` を踏襲)。
 * next-intlのICU構文ではなく、legacyから抽出した位置引数プレースホルダーを
 * そのまま使う実用的な選択(ADR-0006の実装上の簡略化)。
 */
export function formatMessage(template: string, ...args: (string | number)[]): string {
  let result = template;
  args.forEach((value, index) => {
    result = result.split(`{${index}}`).join(String(value));
  });
  return result;
}
