import { test, expect, Page } from "@playwright/test";

/**
 * 月替わり(全員が1手番ずつ終える)ごとに季節イベントのモーダルが表示されることを、
 * 実際にプレイして確認する。
 *
 * CPUの手番はサイコロ演出・結果モーダルを挟んで進むため、1周にそれなりの時間がかかる。
 * ターン数ではなく「季節モーダルが出るまで」を条件に、時間予算つきで回す。
 */

/** 季節モーダル以外の、進行を止めているモーダルを1つ閉じる。閉じたら true。 */
async function dismissBlockingModal(page: Page): Promise<boolean> {
  const quizOption = page.locator(".btn.opt").first();
  if (await quizOption.isVisible().catch(() => false)) {
    await quizOption.click();
    return true;
  }
  const backToRails = page.getByRole("button", { name: "Back to the rails" });
  if (await backToRails.isVisible().catch(() => false)) {
    await backToRails.click();
    return true;
  }
  const fullSteam = page.getByRole("button", { name: "Full steam ahead" });
  if (await fullSteam.isVisible().catch(() => false)) {
    await fullSteam.click();
    return true;
  }
  // CPUの結果モーダル(町・クイズ)。季節モーダルと同じ Continue ボタンなので、
  // 季節の見出しが出ていないときだけ閉じる。
  const seasonVisible = await page.getByText("Seasonal event").isVisible().catch(() => false);
  if (!seasonVisible) {
    const cont = page.getByRole("button", { name: "Continue", exact: true });
    if (await cont.isVisible().catch(() => false)) {
      await cont.click();
      return true;
    }
  }
  return false;
}

test("月が替わると季節イベントのモーダルが表示され、閉じるとプレイを続けられる", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();

  const seasonHeading = page.getByText("Seasonal event");
  const die = page.locator("#die");

  // 季節モーダルが出るまで、人間の手番を進めつつ他のモーダルは閉じ続ける。
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (await seasonHeading.isVisible().catch(() => false)) break;
    if (await dismissBlockingModal(page)) {
      await page.waitForTimeout(250);
      continue;
    }
    if (await die.isEnabled().catch(() => false)) {
      await die.click();
      await page.waitForTimeout(2600); // サイコロ演出
      const choosable = page.locator("svg.board-svg g[style*='cursor: pointer']").first();
      if (await choosable.isVisible({ timeout: 2000 }).catch(() => false)) {
        await choosable.click({ timeout: 5000 }).catch(() => {});
      }
    }
    await page.waitForTimeout(300);
  }

  await expect(seasonHeading).toBeVisible();

  // 「次へ」で閉じるとゲーム画面に戻り、引き続き遊べる。
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(seasonHeading).not.toBeVisible();
  await expect(page.getByRole("heading", { name: "Travelers" })).toBeVisible();
  expect(errors).toEqual([]);
});
