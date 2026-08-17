import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { AppShell } from "../presentation/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Express — A Rail Fortune Game",
  description: "A rail fortune game · learn as you ride",
};

// Next.jsが生成するグローバル型(`LayoutProps`)は `next build` 後の `.next/types` に
// 出力されるため、ビルド前に `tsc --noEmit` を走らせるCIでは解決できない。
// props自体は単純なので、生成物に依存せず自前で型付けする。
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* 言語の状態とフッターは全ページで共有する。レイアウトはページ遷移で
            再マウントされないので、リリースノートへ移動しても言語が保たれる。 */}
        <AppShell>{children}</AppShell>
        {/*
          どのページがどれだけ開かれたかを数える。**Cookieを使わず、個人を追わない。**
          Googleアナリティクスではなく Vercel Web Analytics を選んだのは、
          Cookieを置かないぶん**同意バナーが要らない**ため。この遊びは
          英語・スペイン語・フランス語・日本語で出していて欧州の人も遊ぶので、
          Cookieを置くなら同意の仕組みが要る。数を知りたいだけなら割に合わない。

          開発中は何も送らない(`@vercel/analytics` が本番以外では黙る)。
        */}
        <Analytics />
      </body>
    </html>
  );
}
