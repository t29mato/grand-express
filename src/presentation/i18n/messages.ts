import en from "../../i18n/messages/en.json";
import es from "../../i18n/messages/es.json";
import fr from "../../i18n/messages/fr.json";
import ja from "../../i18n/messages/ja.json";
import { Locale } from "../../domain/shared-kernel/localized-text";

export type UiMessages = typeof en;

export const MESSAGES_BY_LOCALE: Record<Locale, UiMessages> = {
  en,
  es,
  fr,
  ja: ja as UiMessages,
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
