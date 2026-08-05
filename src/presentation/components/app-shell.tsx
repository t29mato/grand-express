"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "../i18n/locale-context";
import { AppFooter } from "./app-footer";

/**
 * 全ページ共通の外枠。言語の状態とフッターをここで持つ。
 * App Routerのレイアウトはページ遷移で再マウントされないため、
 * リリースノートへ移動して戻っても選んだ言語が保たれる。
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      {children}
      <AppFooter />
    </LocaleProvider>
  );
}
