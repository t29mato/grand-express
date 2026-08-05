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
