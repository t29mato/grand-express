"use client";

import Link from "next/link";
import { APP_COMMIT, APP_VERSION } from "../release-notes/release-notes";
import { useLocale } from "../i18n/locale-context";

/**
 * 全ページ共通のフッター。表示中のバージョンと、リリースノートへの導線を置く。
 * バージョンはビルド時に package.json から埋め込まれる(`next.config.ts`)。
 */
export function AppFooter() {
  const { t } = useLocale();
  return (
    <footer className="app-footer">
      <span className="app-version" title={APP_COMMIT ? `commit ${APP_COMMIT}` : undefined}>
        World Express v{APP_VERSION}
        {APP_COMMIT && <span className="app-commit"> ({APP_COMMIT})</span>}
      </span>
      <Link href="/release-notes" className="footer-link">
        {t("releaseNotes")}
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
