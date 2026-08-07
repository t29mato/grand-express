import { NextRequest, NextResponse } from "next/server";

/**
 * 遊んだ人の声を GitHub の issue にする。
 *
 * **issue は公開リポジトリに立てる。** 送った人があとから
 * 「あの要望はどうなったか」を自分で見に行けるようにするため。
 * ソースコードのリポジトリとは**別の、issue専用の公開リポジトリ**を使う
 * (コードは非公開のままにしたいので)。設定は環境変数:
 *
 *   FEEDBACK_REPO   例 `t29mato/grand-express-feedback`
 *   FEEDBACK_TOKEN  そのリポジトリの Issues:write だけを持つ細粒度トークン
 *
 * どちらか欠けていれば 503 を返す。画面側はそれを見て
 * 「GitHubで直接書く」リンクに切り替える。
 *
 * 誰でも叩ける入口なので、荒らし対策を3つ入れてある。
 *   - 文字数の上限(長文を大量に貼られると issue が読めなくなる)
 *   - 同じIPからの連投を1分に3件まで
 *   - 罠の入力欄(人には見えない欄。埋まっていれば自動投稿とみなす)
 */

const MAX_BODY = 4000;
const MAX_TITLE = 120;
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000;

const CATEGORIES = ["bug", "idea", "content", "other"] as const;
type Category = (typeof CATEGORIES)[number];

const LABEL_BY_CATEGORY: Record<Category, string> = {
  bug: "bug",
  idea: "idea",
  content: "content",
  other: "feedback",
};

/**
 * 直近の投稿時刻をIPごとに覚える。
 *
 * サーバーレスなので実体は呼び出しごとに消えることがあり、**厳密な制限にはならない**。
 * それでも同じインスタンスに連続で来る大半の連投は止まる。
 * 本気で守るなら外部のストアが要るが、いまの規模では割に合わない。
 */
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentByIp.get(ip) ?? []).filter((at) => now - at < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  recentByIp.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  const repo = process.env.FEEDBACK_REPO;
  const token = process.env.FEEDBACK_TOKEN;
  if (!repo || !token) {
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "too-many" }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  const { category, title, body, board, locale, honeypot } = (payload ?? {}) as Record<string, unknown>;

  // 罠の欄。人が使う画面では隠してあるので、埋まっていれば自動投稿。
  // 断りの理由は返さない(仕組みを教えることになるため)。成功したように見せる。
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json({ url: null, ignored: true });
  }

  if (typeof title !== "string" || typeof body !== "string") {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }
  const trimmedTitle = title.trim().slice(0, MAX_TITLE);
  const trimmedBody = body.trim().slice(0, MAX_BODY);
  if (trimmedTitle.length === 0 || trimmedBody.length === 0) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }

  const kind: Category = CATEGORIES.includes(category as Category) ? (category as Category) : "other";

  // 遊んでいた盤面と言語は、再現の手がかりになるので本文の末尾に添える。
  const context = [
    board ? `盤面: ${String(board).slice(0, 40)}` : null,
    locale ? `言語: ${String(locale).slice(0, 8)}` : null,
  ].filter(Boolean);

  const issueBody = [
    trimmedBody,
    "",
    "---",
    ...context,
    "_アプリのフィードバック画面から送信されました。_",
  ].join("\n");

  const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: trimmedTitle,
      body: issueBody,
      labels: [LABEL_BY_CATEGORY[kind]],
    }),
  });

  if (!response.ok) {
    // GitHub の返す本文はトークンの情報を含みうるので、そのまま返さない。
    console.error("feedback: GitHub returned", response.status);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  const issue = (await response.json()) as { html_url?: string; number?: number };
  return NextResponse.json({ url: issue.html_url ?? null, number: issue.number ?? null });
}
