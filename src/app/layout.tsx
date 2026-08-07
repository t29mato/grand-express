import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "../presentation/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Altiplano Express — A Rail Fortune Game",
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
      </body>
    </html>
  );
}
