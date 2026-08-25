import { defineConfig, devices } from "@playwright/test";

/**
 * 既定ではローカルで本番ビルドを立ち上げてテストする。
 * `PLAYWRIGHT_BASE_URL` を指定した場合はそのURL(デプロイ済みの本番環境など)に対して
 * 実行し、ローカルサーバーは起動しない
 * (デプロイ後のスモークテスト用。docs/90-migration/04-deployment-guide.md 参照)。
 *
 *   PLAYWRIGHT_BASE_URL=https://grand-express.vercel.app npx playwright test
 */
const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL;
const localURL = "http://localhost:3100";

export default defineConfig({
  testDir: "./e2e/playwright",
  fullyParallel: true,
  /**
   * ゲームを実際にプレイする試験が多く、サイコロ演出やカメラ追尾で
   * requestAnimationFrame を回し続けるため、多重実行すると互いに処理時間を奪い合って
   * 時間切れになる。安定性を優先してワーカー数を絞る。
   */
  workers: process.env.CI ? 2 : 2,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: externalBaseURL ?? localURL,
    trace: "on-first-retry",
  },
  ...(externalBaseURL
    ? {}
    : {
        webServer: {
          // **`next start` は output: "export" と両立しない。**
          // (「next start does not work with output: export」で落ちる)
          // 書き出した out/ をそのまま配る。**本番と同じ静的ファイルを試験する**
          // ことになるので、むしろ確かめたいものに近い。
          // `-s`(SPAとして扱う)は付けない。**付けると404がHTMLにすり替わり、
          // 「何が無いのか」が見えなくなる。**実際それで
          // `/_vercel/insights/script.js` の404が
          // `SyntaxError: Unexpected token '<'` に化けて、原因を探すのに時間がかかった。
          // 静的な書き出しは実ファイルが並んでいるので、そもそも SPA 扱いが要らない。
          command: "npm run build && npx serve out -l 3100",
          url: localURL,
          reuseExistingServer: !process.env.CI,
          // **冷えた状態からのビルドは120秒に収まらない。**CIは毎回冷えている。
          // `next start` を使っていた頃も同じ時間だったが、`output: "export"` は
          // 全ページを書き出すぶん時間がかかり、ここで時間切れになった。
          timeout: 600_000,
        },
      }),
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
