"use client";

import { useState } from "react";
import Link from "next/link";
import { COUNTRY_INDEX } from "../../infrastructure/content/country-index";
import { useLocale } from "../i18n/locale-context";
import { LocaleSwitch } from "./hud/locale-switch";

/**
 * 遊んだ人が気づいたことをその場で送れる画面。
 *
 * 送ったものは**公開のチケット**になる。「言ったきり何も分からない」を
 * 避けたいので、あとから自分で経過を見に行けることを明示する。
 *
 * ## サーバーを介さない
 *
 * かつては `/api/feedback` に POST し、こちらのトークンで issue を立てていた。
 * **GitHub Pages へ移したときにサーバーが無くなったので、やめた。**
 *
 * いまは**内容を載せた issue 作成画面のURLを組み立てて、そこへ送る。**
 * 送信するのは遊んだ人自身の GitHub アカウントになる。こちらに得もある——
 * 荒らし対策(文字数・連投・罠の欄)はぜんぶ GitHub 側の持ち物になり、
 * 秘密のトークンを置く必要もなくなった。**送り先が公開の issue であることは
 * 変わらない。**
 */

const KINDS = [
  { id: "bug", label: "feedbackKindBug" },
  { id: "idea", label: "feedbackKindIdea" },
  { id: "content", label: "feedbackKindContent" },
  { id: "other", label: "feedbackKindOther" },
] as const;

/** issue に付ける札。サーバー側にあった対応表をそのまま持ってきた。 */
const LABEL_BY_KIND: Record<string, string> = {
  bug: "bug",
  idea: "idea",
  content: "content",
  other: "feedback",
};

type Status = { state: "editing" } | { state: "opened"; url: string };

export function FeedbackScreen() {
  const { t, tx, locale } = useLocale();
  const [kind, setKind] = useState<string>("bug");
  const [summary, setSummary] = useState("");
  const [detail, setDetail] = useState("");
  const [board, setBoard] = useState("");
  const [status, setStatus] = useState<Status>({ state: "editing" });

  const canSend = summary.trim().length > 0 && detail.trim().length > 0;

  const repo = process.env.NEXT_PUBLIC_FEEDBACK_REPO;

  /**
   * 内容を載せた issue 作成画面のURLを組み立てる。
   *
   * 遊んでいた盤面と言語は、再現の手がかりになるので本文の末尾に添える
   * (サーバーで組み立てていたときと同じ形)。
   */
  const issueUrl = () => {
    const label = LABEL_BY_KIND[kind] ?? "feedback";
    const context = [
      board ? `盤面: ${board}` : null,
      `言語: ${locale}`,
      `版: ${process.env.NEXT_PUBLIC_APP_VERSION ?? "?"}`,
    ].filter(Boolean);
    const body = [detail.trim(), "", "---", ...context].join("\n");
    const q = new URLSearchParams({
      title: summary.trim().slice(0, 120),
      body: body.slice(0, 4000),
      labels: label,
    });
    return `https://github.com/${repo}/issues/new?${q.toString()}`;
  };

  const send = () => {
    if (!canSend || !repo) return;
    const url = issueUrl();
    // **開かないことがある**(ポップアップの遮断)。開いた前提にせず、
    // 画面にも同じリンクを出して、押し直せるようにする。
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus({ state: "opened", url });
  };

  if (status.state === "opened") {
    return (
      <div className="setup-screen">
        <div className="feedback-shell card">
          <LocaleSwitch />
          {/*
            **まだ届いていない。**GitHubの画面で送信ボタンを押すまでは何も起きない。
            「受け付けました」と書くと嘘になるので、起きたことだけを書く。
          */}
          <h1 style={{ marginTop: 12 }}>{t("feedbackOpenedTitle")}</h1>
          <p className="tagline">{t("feedbackOpenedLead")}</p>
          <div className="btnrow">
            <a className="btn" href={status.url} target="_blank" rel="noreferrer">
              {t("feedbackOpenIssue")}
            </a>
          </div>
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

        <div className="btnrow" style={{ marginTop: 16 }}>
          <button
            className="btn"
            style={{ width: "100%" }}
            onClick={send}
            disabled={!canSend || !repo}
          >
            {t("feedbackSend")}
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
