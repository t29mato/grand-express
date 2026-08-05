"use client";

import { Locale } from "../../../domain/shared-kernel/localized-text";
import { SUPPORTED_LOCALES } from "../../i18n/messages";
import { useLocale } from "../../i18n/locale-context";

/**
 * 言語切替ボタン。legacyと同様、セットアップ画面だけでなく
 * プレイ中も常にヘッダーから切り替えられるようにするためのコンポーネント。
 */
export function LocaleSwitch() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="langseg" role="group" aria-label="Language">
      {SUPPORTED_LOCALES.map((l) => (
        <button
          key={l}
          className={l === locale ? "on" : ""}
          aria-pressed={l === locale}
          onClick={() => setLocale(l as Locale)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
