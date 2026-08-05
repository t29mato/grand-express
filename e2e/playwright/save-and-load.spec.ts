import { test, expect } from "@playwright/test";

test("セーブしてリロードすると、続きから遊べる", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await expect(page.locator("#die")).toBeVisible();
  await page.getByRole("button", { name: "Depart!" }).click();

  await page.getByRole("button", { name: "Save", exact: true }).click();
  // セーブ完了はモーダルで知らせる(ログにも同じ文言が残る)。
  await expect(page.getByRole("heading", { name: "Journey saved." })).toBeVisible();
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  await page.reload();
  await expect(page.getByText("Choose your journey")).toBeVisible();

  // 押す前に「何が保存されているか」が読めること(国・進行度・参加者と所持金)。
  const savedCard = page.locator(".saved-card");
  await expect(savedCard).toBeVisible();
  await expect(savedCard).toContainText("Bolivia");
  await expect(savedCard).toContainText("Year 1");
  await expect(savedCard).toContainText(/Month \d+ of 12/);
  await expect(savedCard.locator(".saved-player")).toHaveCount(3);
  await expect(savedCard.locator(".saved-player .cash").first()).toContainText("Bs");

  const resumeButton = page.getByRole("button", { name: "Continue saved journey" });
  await expect(resumeButton).toBeVisible();

  await resumeButton.click();
  await expect(page.locator("#die")).toBeVisible();
  await expect(page.getByText("Journey restored from your last save.")).toBeVisible();
});

test("セーブデータを削除すると「続きから」の表示が消える", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await expect(page.locator("#die")).toBeVisible();
  await page.getByRole("button", { name: "Depart!" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  await page.reload();
  const savedCard = page.locator(".saved-card");
  await expect(savedCard).toBeVisible();

  await page.getByRole("button", { name: "Discard" }).click();
  await expect(savedCard).not.toBeVisible();

  // 消えたことがリロード後も保たれる。
  await page.reload();
  await expect(page.getByText("Choose your journey")).toBeVisible();
  await expect(page.locator(".saved-card")).not.toBeVisible();
});
