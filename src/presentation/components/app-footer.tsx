"use client";

import Link from "next/link";
import { APP_COMMIT, APP_VERSION } from "../release-notes/release-notes";
import { useLocale } from "../i18n/locale-context";
import { useAtlasText } from "./atlas/use-atlas-text";

/**
 * 全ページ共通のフッター。表示中のバージョンと、リリースノートへの導線を置く。
 * バージョンはビルド時に package.json から埋め込まれる(`next.config.ts`)。
 */
export function AppFooter() {
  const { t } = useLocale();
  // 地図帳の文言は `messages.ts` へ登録されるまで `t()` からは引けない。
  // `at()` は登録の前でも `atlas-messages.ts` を直に読んで答える。
  const { at } = useAtlasText();
  return (
    <footer className="app-footer">
      <span className="app-version" title={APP_COMMIT ? `commit ${APP_COMMIT}` : undefined}>
        World Express v{APP_VERSION}
        {APP_COMMIT && <span className="app-commit"> ({APP_COMMIT})</span>}
      </span>
      <Link href="/release-notes" className="footer-link">
        {t("releaseNotes")}
      </Link>
      {/* 地図帳。遊ばずに世界を眺めたい人のための1枚の地図。 */}
      <Link href="/atlas" className="footer-link">
        {at("atlasLink")}
      </Link>
      {/* 送り先が未設定のうちはリンクを出さない。押しても「準備中」しか
          出ないので、行き止まりを見せないほうがよい。 */}
      {process.env.NEXT_PUBLIC_FEEDBACK_REPO && (
        <Link href="/feedback" className="footer-link">
          {t("feedbackLink")}
        </Link>
      )}
    </footer>
  );
}
