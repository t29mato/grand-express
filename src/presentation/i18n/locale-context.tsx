"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Locale, LocalizedText } from "../../domain/shared-kernel/localized-text";
import { MESSAGES_BY_LOCALE, formatMessage } from "./messages";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** UIチロム文言を取得する(現行コードの `T()`)。 */
  t: (key: string, ...args: (string | number)[]) => string;
  /** コンテンツの{en,es,fr,ja}から現在の言語の文字列を取り出す(現行コードの `tx()`)。 */
  tx: (text: LocalizedText | undefined) => string;
  /** 月名を取得する(0=4月 … 11=3月。現行コードの `MONTHS[month%12]` に対応)。 */
  monthName: (monthIndex: number) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const value = useMemo<LocaleContextValue>(() => {
    const messages = MESSAGES_BY_LOCALE[locale];
    return {
      locale,
      setLocale,
      t: (key, ...args) => {
        const template = (messages as Record<string, unknown>)[key];
        if (typeof template !== "string") return key;
        return formatMessage(template, ...args);
      },
      tx: (text) => (text ? text[locale] : ""),
      monthName: (monthIndex) => messages.months[((monthIndex % 12) + 12) % 12] ?? "",
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
