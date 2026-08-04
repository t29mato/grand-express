/**
 * 4言語対応の文言(ADR-0007: コンテンツの翻訳文字列はnext-intlへ分離せず、
 * コンテンツJSON内に{en,es,fr,ja}としてインラインで持たせる)。
 */
export type Locale = "en" | "es" | "fr" | "ja";
export type LocalizedText = Record<Locale, string>;

/** テストやプレースホルダー用に、同じ文字列を4言語すべてに割り当てる。 */
export function sameForAllLocales(text: string): LocalizedText {
  return { en: text, es: text, fr: text, ja: text };
}
