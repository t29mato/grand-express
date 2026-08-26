import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { AppShell } from "../presentation/components/app-shell";
import "./globals.css";

/**
 * GitHub Pages では `/grand-express/` の下に入る。**アイコンのURLには
 * Next が基準パスを足してくれない**ので、自分で足す(`manifest.ts` と同じ事情)。
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "World Express — A Rail Fortune Game",
  description: "A rail fortune game · learn as you ride",
  applicationName: "World Express",
  icons: {
    icon: [
      { url: `${base}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${base}/icons/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
    /**
     * iOS はこれを見てホーム画面の絵を決める。**manifest の icons は読まない。**
     * 入れ忘れると、画面を縮めた写真がアイコンとして置かれる。
     */
    apple: [{ url: `${base}/icons/apple-touch-icon-180.png`, sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    /** ホーム画面の下に出る名前。manifest の `short_name` と揃える。 */
    title: "World Express",
    /**
     * 上端の時計まわりを地の色に溶かす。地が濃い紫(`--night`)なので、
     * 白い帯が乗ると、そこだけ切り取ったように見える。
     */
    statusBarStyle: "black-translucent",
  },
  /**
   * Next が出すのは新しいほうの綴り(`mobile-web-app-capable`)だけ。
   * **iOS 15.4 より前は古い綴りしか見ない**ので、こちらも自分で足しておく。
   * 足りないと、ホーム画面から開いてもSafariのアドレスバーが被ったままになる。
   */
  other: { "apple-mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  /** manifest の `theme_color` と揃える。ずれると起動時に色が飛ぶ。 */
  themeColor: "#241a3f",
  width: "device-width",
  initialScale: 1,
  /**
   * ノッチのある機種で、画面の端まで地の色を伸ばす。
   * **食い込む部分の逃げは `globals.css` 側で確保している**
   * (`@media (display-mode: standalone)` のところ)。
   */
  viewportFit: "cover",
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
        {/*
          **Vercel の上でしか出さない。**計測は `/_vercel/insights/script.js` を
          読みに行くが、その入口を用意しているのは Vercel だけである。
          GitHub Pages でも、手元でも、CIの静的配信でも404になり、
          `serve -s` のような入口だとHTMLが返って
          **`SyntaxError: Unexpected token '<'` になる。**
          E2Eの「致命的なエラーが出ていないこと」がこれで落ちた。

          最初は BASE_PATH の有無で分けたが、**それでは足りなかった。**
          基準パス無しで焼くのは Vercel だけではなく、手元とCIもそうだから。
          Vercel が自分で入れる `NEXT_PUBLIC_VERCEL_ENV` を見るのが正確。
        */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
