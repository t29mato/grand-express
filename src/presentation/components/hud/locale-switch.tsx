"use client";

import { Locale } from "../../../domain/shared-kernel/localized-text";
import { SUPPORTED_LOCALES } from "../../i18n/messages";
import { useLocale } from "../../i18n/locale-context";

/**
 * 言語切替ボタン。legacyと同様、セットアップ画面だけでなく
 * プレイ中も常にヘッダーから切り替えられるようにするためのコンポーネント。
 *
 * まとまりの名前は4言語で持つ(以前は "Language" の英語決め打ちだった)。
 * 各ボタンの読み上げ名は見えている "JA" のままにする——E2E がその名前で引いており、
 * 2文字の略号は言語を選ぶ人には十分通じる。代わりに、その言語での正式な名前を
 * `title` で添える(F-15。ここは `.langseg` が角丸のために `overflow: hidden` なので、
 * 他のボタンのような `data-tip` の名札は枠に切られて出せない)。
 */
export function LocaleSwitch() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div className="langseg" role="group" aria-label={t("languageLabel")}>
      {SUPPORTED_LOCALES.map((l) => (
        <button
          key={l}
          className={l === locale ? "on" : ""}
          aria-pressed={l === locale}
          title={LOCALE_NATIVE_NAMES[l as Locale]}
          onClick={() => setLocale(l as Locale)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/** それぞれの言語での、その言語の名前。翻訳しない(選ぶ人はその言語を読める)。 */
export const LOCALE_NATIVE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  ja: "日本語",
};
