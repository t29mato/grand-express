"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "../i18n/locale-context";
import { AppFooter } from "./app-footer";
import { ServiceWorkerUpdate } from "./service-worker-update";

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
      {/* 新しい版の報せ。言語を切り替えたら報せも追随するよう、
          `LocaleProvider` の内側に置く。 */}
      <ServiceWorkerUpdate />
    </LocaleProvider>
  );
}
