"use client";

import Link from "next/link";
import { RELEASE_NOTES } from "../release-notes/release-notes";
import { useLocale } from "../i18n/locale-context";
import { LocaleSwitch } from "./hud/locale-switch";

/**
 * プレイヤー向けのリリースノート。
 * 内容は `release-notes.ts` にデータとして持ち、アプリ本体と同じく4言語で表示する。
 */
export function ReleaseNotesScreen() {
  const { t, tx } = useLocale();
  return (
    <div className="notes-screen">
      <div className="card notes-card">
        <div className="notes-head">
          <LocaleSwitch />
          <Link href="/" className="btn ghost">
            {t("backToGame")}
          </Link>
        </div>

        <h1 style={{ marginTop: 12 }}>{t("releaseNotes")}</h1>
        <p className="tagline">{t("releaseNotesLead")}</p>

        {RELEASE_NOTES.map((note) => (
          <section className="note" key={note.version}>
            <div className="note-head">
              <span className="note-version">v{note.version}</span>
              <span className="note-date">{note.date}</span>
            </div>
            <h2 className="note-title">{tx(note.title)}</h2>
            <ul className="note-list">
              {note.highlights.map((highlight, i) => (
                <li key={i}>{tx(highlight)}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
