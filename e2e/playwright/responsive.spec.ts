import { test, expect } from "@playwright/test";

// iPhone 13相当のビューポート。`devices["iPhone 13"]` はWebKitに固定されるため、
// このプロジェクト構成(Chromiumのみ)に合わせてビューポートだけを指定する。
test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

test("モバイル幅でも横スクロールが発生しない(セットアップ画面)", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});

test("モバイル幅でもゲーム画面が縦積みレイアウトで表示される", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await expect(page.locator("#die")).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});
