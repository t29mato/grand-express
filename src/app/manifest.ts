import type { MetadataRoute } from "next";

/**
 * ホーム画面に置いてもらうための名札(`manifest.webmanifest`)。
 *
 * ## 置き場所が2通りあることに注意
 *
 * GitHub Pages では `/grand-express/` の下に入る。Vercel と手元では直下。
 * **`start_url` と `scope` を間違えると、ホーム画面から開いたときに
 * 404 になるか、アプリの外へ出た扱いになってブラウザのUIが被る。**
 * `next.config.ts` が渡す `NEXT_PUBLIC_BASE_PATH` を必ず前に付ける
 * (Nextは `<link rel="manifest">` のURLには基準パスを足してくれるが、
 *  **この中身のURLには足してくれない**。手で足す)。
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "World Express — A Rail Fortune Game",
    /** ホーム画面の下に出る名前。12文字を超えると端末が勝手に省略する。 */
    short_name: "World Express",
    description: "Roll dice across real railway maps — 47 boards, four languages, and something worth knowing in every town.",
    start_url: `${base}/`,
    scope: `${base}/`,
    display: "standalone",
    /**
     * 縦横どちらも許す。**固定しない。**
     * 携帯は縦で遊ぶが、盤面全体を見るときは横にしたくなるし、
     * タブレットや折りたたみでは横が既定になる。
     */
    orientation: "any",
    /**
     * 起動直後、絵が出るまでの下地と、上端の色。
     * **盤面の海の色ではなく、アプリの地の色(`--night`)に合わせる。**
     * 起動画面はアプリの外枠であって盤面ではないので、
     * 海の紺にすると、立ち上がった瞬間に色が飛ぶ。
     */
    background_color: "#241a3f",
    theme_color: "#241a3f",
    lang: "en",
    dir: "ltr",
    categories: ["games", "education"],
    icons: [
      { src: `${base}/icons/icon-192.png`, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: `${base}/icons/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "any" },
      /**
       * Androidは好きな形に切り抜く。**`any` の絵をそのまま切ると縁が欠ける**ので、
       * 中身を安全圏(中央80%)に収めた別の絵を渡す(`make-pwa-icons.mjs`)。
       */
      { src: `${base}/icons/icon-maskable-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
