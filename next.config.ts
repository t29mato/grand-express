import { readFileSync } from "node:fs";
import type { NextConfig } from "next";

/**
 * アプリに表示するバージョン。package.json を唯一の出所とし、ビルド時に埋め込む
 * (実行時に package.json を読むとクライアントへ丸ごと同梱されてしまうため)。
 * コミットSHAはVercelのビルド環境変数から拾い、無い環境では省略する。
 */
const { version } = JSON.parse(readFileSync("./package.json", "utf8")) as { version: string };
const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_APP_COMMIT: commit,
  },
};

export default nextConfig;
