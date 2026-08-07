"use client";

import { useState } from "react";
import Link from "next/link";
import { COUNTRY_INDEX } from "../../infrastructure/content/country-index";
import { useLocale } from "../i18n/locale-context";
import { LocaleSwitch } from "./hud/locale-switch";

/**
 * 遊んだ人が気づいたことをその場で送れる画面。
 *
 * 送ったものは**公開のチケット**になり、完了画面でそのURLを見せる。
 * 「言ったきり何も分からない」を避けたいので、あとから自分で経過を
 * 見に行けることを明示する。
 */

const KINDS = [
  { id: "bug", label: "feedbackKindBug" },
  { id: "idea", label: "feedbackKindIdea" },
  { id: "content", label: "feedbackKindContent" },
  { id: "other", label: "feedbackKindOther" },
] as const;

type Status =
  | { state: "editing" }
  | { state: "sending" }
  | { state: "sent"; url: string | null }
  | { state: "error"; message: string };

export function FeedbackScreen() {
  const { t, tx, locale } = useLocale();
  const [kind, setKind] = useState<string>("bug");
  const [summary, setSummary] = useState("");
  const [detail, setDetail] = useState("");
  const [board, setBoard] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>({ state: "editing" });

  const canSend = summary.trim().length > 0 && detail.trim().length > 0;

  const send = async () => {
    if (!canSend) return;
    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: kind,
          title: summary,
          body: detail,
          board,
          locale,
          honeypot,
        }),
      });
      if (response.status === 429) {
        setStatus({ state: "error", message: t("feedbackTooMany") });
        return;
      }
      if (response.status === 503) {
        setStatus({ state: "error", message: t("feedbackUnavailable") });
        return;
      }
      if (!response.ok) {
        setStatus({ state: "error", message: t("feedbackFailed") });
        return;
      }
      const data = (await response.json()) as { url?: string | null };
      setStatus({ state: "sent", url: data.url ?? null });
    } catch {
      setStatus({ state: "error", message: t("feedbackFailed") });
    }
  };

  if (status.state === "sent") {
    return (
      <div className="setup-screen">
        <div className="feedback-shell card">
          <LocaleSwitch />
          <h1 style={{ marginTop: 12 }}>{t("feedbackThanks")}</h1>
          {status.url && (
            <>
              <p className="tagline">{t("feedbackKeepUrl")}</p>
              <p className="fact" style={{ wordBreak: "break-all" }}>
                <a href={status.url} target="_blank" rel="noreferrer">
                  {status.url}
                </a>
              </p>
              <div className="btnrow">
                <a className="btn" href={status.url} target="_blank" rel="noreferrer">
                  {t("feedbackOpenIssue")}
                </a>
              </div>
            </>
          )}
          <div className="btnrow" style={{ marginTop: 12 }}>
            <button
              className="btn"
              onClick={() => {
                setSummary("");
                setDetail("");
                setStatus({ state: "editing" });
              }}
            >
              {t("feedbackAnother")}
            </button>
          </div>
          <p style={{ marginTop: 16 }}>
            <Link href="/" className="footer-link">
              {t("feedbackBack")}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="setup-screen">
      <div className="feedback-shell card">
        <LocaleSwitch />
        <h1 style={{ marginTop: 12 }}>{t("feedbackTitle")}</h1>
        <p className="tagline">{t("feedbackLead")}</p>

        <div className="eyebrow">{t("feedbackKind")}</div>
        <div className="seg" style={{ flexWrap: "wrap" }}>
          {KINDS.map((entry) => (
            <button
              key={entry.id}
              className={kind === entry.id ? "on" : ""}
              onClick={() => setKind(entry.id)}
            >
              {t(entry.label)}
            </button>
          ))}
        </div>

        <div className="eyebrow" style={{ marginTop: 16 }}>
          {t("feedbackSummary")}
        </div>
        <input
          value={summary}
          maxLength={120}
          placeholder={t("feedbackSummaryHint")}
          aria-label={t("feedbackSummary")}
          onChange={(e) => setSummary(e.target.value)}
          style={{ width: "100%" }}
        />

        <div className="eyebrow" style={{ marginTop: 16 }}>
          {t("feedbackDetail")}
        </div>
        <textarea
          value={detail}
          maxLength={4000}
          rows={7}
          placeholder={t("feedbackDetailHint")}
          aria-label={t("feedbackDetail")}
          onChange={(e) => setDetail(e.target.value)}
          style={{ width: "100%" }}
        />

        <div className="eyebrow" style={{ marginTop: 16 }}>
          {t("feedbackBoard")}
        </div>
        <select
          value={board}
          aria-label={t("feedbackBoard")}
          onChange={(e) => setBoard(e.target.value)}
          style={{ width: "100%" }}
        >
          <option value="">{t("feedbackBoardNone")}</option>
          {COUNTRY_INDEX.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {tx(entry.name)}
            </option>
          ))}
        </select>

        {/* 罠の入力欄。人には見えないので、埋まっていれば自動投稿とみなす。 */}
        <input
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
        />

        {status.state === "error" && (
          <p className="fact" style={{ marginTop: 16 }}>
            {status.message}
          </p>
        )}

        <div className="btnrow" style={{ marginTop: 16 }}>
          <button
            className="btn"
            style={{ width: "100%" }}
            onClick={send}
            disabled={!canSend || status.state === "sending"}
          >
            {status.state === "sending" ? t("feedbackSending") : t("feedbackSend")}
          </button>
        </div>

        <p style={{ marginTop: 16 }}>
          <Link href="/" className="footer-link">
            {t("feedbackBack")}
          </Link>
        </p>
      </div>
    </div>
  );
}
