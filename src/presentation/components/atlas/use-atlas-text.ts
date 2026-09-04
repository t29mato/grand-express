"use client";

import { useCallback } from "react";
import { ATLAS_MESSAGES } from "../../i18n/atlas-messages";
import { formatMessage } from "../../i18n/messages";
import { useLocale } from "../../i18n/locale-context";

/**
 * 地図帳の文言を引く。
 *
 * ふつうは `useLocale()` の `t()` だけで足りる。ただし `t()` は
 * `messages.ts` に重ねられた表だけを見るので、**`atlas-messages.ts` を
 * そこへ登録するまで、画面じゅうに `atlasTitle` のような鍵の名前が出る。**
 * 登録は共有ファイル(`messages.ts`)への追記なので、並行作業では
 * 取りまとめ側がまとめて行う決まりになっている。
 *
 * そこでここでは **`t()` を先に試し、鍵がそのまま返ってきたときだけ
 * `ATLAS_MESSAGES` を直に読む。**登録の前でも後でも同じように動き、
 * 登録されたあとは何も変わらない(`t()` が先に答えるため)。
 */
export function useAtlasText(): {
  at: (key: string, ...args: (string | number)[]) => string;
  tx: ReturnType<typeof useLocale>["tx"];
  locale: ReturnType<typeof useLocale>["locale"];
} {
  const { t, tx, locale } = useLocale();
  const at = useCallback(
    (key: string, ...args: (string | number)[]) => {
      const fromMessages = t(key, ...args);
      if (fromMessages !== key) return fromMessages;
      const fallback = ATLAS_MESSAGES[locale][key];
      return fallback === undefined ? key : formatMessage(fallback, ...args);
    },
    [t, locale],
  );
  return { at, tx, locale };
}
