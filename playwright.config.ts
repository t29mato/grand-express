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
          command: "npm run build && npm run start -- -p 3100",
          url: localURL,
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
        },
      }),
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
