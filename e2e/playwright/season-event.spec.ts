import { test, expect, Page } from "@playwright/test";

/**
 * 月替わり(全員が1手番ずつ終える)ごとに季節イベントのモーダルが表示されることを、
 * 実際にプレイして確認する。既定のセットアップは3人(人間1・CPU2)なので、
 * 数ターン進めれば必ず月が替わる。
 */

async function takeOneTurn(page: Page): Promise<void> {
  const die = page.locator("#die");
  if (await die.isEnabled().catch(() => false)) {
    await die.click();
    const choosable = page.locator("svg.board-svg g[style*='cursor: pointer']").first();
    if (await choosable.isVisible({ timeout: 2000 }).catch(() => false)) {
      await choosable.click({ timeout: 5000 }).catch(() => {});
    }
  }
  await page.waitForTimeout(400);
  // 町・クイズのモーダルが出ていたら閉じて手番を終える(季節モーダルは閉じない)。
  const quizOption = page.locator(".btn.opt").first();
  if (await quizOption.isVisible().catch(() => false)) {
    await quizOption.click();
    await page.waitForTimeout(300);
  }
  const backToRails = page.getByRole("button", { name: "Back to the rails" });
  if (await backToRails.isVisible().catch(() => false)) {
    await backToRails.click();
    await page.waitForTimeout(300);
  }
  // 目的地に到着していたら「次の区間」の案内も閉じる。
  const fullSteam = page.getByRole("button", { name: "Full steam ahead" });
  if (await fullSteam.isVisible().catch(() => false)) {
    await fullSteam.click();
    await page.waitForTimeout(300);
  }
}

test("月が替わると季節イベントのモーダルが表示され、閉じるとプレイを続けられる", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();

  // 月が替わるまでプレイする(3人なので通常1〜2ターンで替わるが、余裕をみて最大6ターン)。
  const seasonHeading = page.getByText("Seasonal event");
  for (let turn = 0; turn < 6; turn++) {
    if (await seasonHeading.isVisible().catch(() => false)) break;
    await takeOneTurn(page);
  }

  await expect(seasonHeading).toBeVisible();

  // 「次へ」で閉じるとゲーム画面に戻り、引き続き遊べる。
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(seasonHeading).not.toBeVisible();
  await expect(page.getByRole("heading", { name: "Travelers" })).toBeVisible();
  expect(errors).toEqual([]);
});
