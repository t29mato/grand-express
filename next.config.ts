import { readFileSync } from "node:fs";
import type { NextConfig } from "next";

/**
 * アプリに表示するバージョン。package.json を唯一の出所とし、ビルド時に埋め込む
 * (実行時に package.json を読むとクライアントへ丸ごと同梱されてしまうため)。
 *
 * コミットSHAは出し先によって環境変数が違う。**両方を見る。**
 *   Vercel          VERCEL_GIT_COMMIT_SHA
 *   GitHub Actions  GITHUB_SHA
 * どちらも無い環境(手元)では省略する。
 */
const { version } = JSON.parse(readFileSync("./package.json", "utf8")) as { version: string };
const commit = (process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? "").slice(0, 7);

/**
 * GitHub Pages は `https://<user>.github.io/<repo>/` の下に置かれるので、
 * すべてのURLに `/grand-express` が前置される。**設定ファイルに焼かず、
 * ビルド時の環境変数で渡す。**
 *
 * 焼いてしまうと、手元の `npm run dev` も E2E も `scripts/shot.mjs` も
 * すべて `/grand-express` を付けないと動かなくなる。life-game でも同じ理由で
 * コマンドラインから渡している(あちらは Vite の `--base`)。
 *
 *   手元・Vercel   BASE_PATH 未設定 → ルート直下
 *   GitHub Pages   BASE_PATH=/grand-express
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /**
   * **静的な書き出しにする。**GitHub Pages にはサーバーが無い。
   *
   * これに伴い `src/app/api/feedback/route.ts` は消した。フィードバックは
   * サーバーを介さず、GitHubのissue作成画面へ内容を持たせて飛ばす形に変えてある
   * (`feedback-screen.tsx`)。**送り先が公開のissueであることは変わらない。**
   */
  output: "export",

  /**
   * `/feedback` を `/feedback/index.html` として書き出す。
   *
   * **これが無いと GitHub Pages で404になる。**trailingSlash が false だと
   * `feedback.html` が出るが、Pages は `/feedback` というリクエストに対して
   * `feedback/index.html` しか探さない。
   */
  trailingSlash: true,

  basePath,
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_APP_COMMIT: commit,
    // 画面側で `/grand-express` を自前で足したい箇所(生のfetchなど)のために公開する。
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  /**
   * 静的な書き出しでは Next の画像最適化サーバーが使えない。
   * いまは `next/image` を1箇所も使っていないが、**使い始めた瞬間にビルドが
   * 落ちるより、最初から素通しにしておくほうが親切。**
   */
  images: { unoptimized: true },
};

export default nextConfig;
