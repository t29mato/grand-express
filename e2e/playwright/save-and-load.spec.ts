import { test, expect } from "@playwright/test";

test("セーブしてリロードすると、続きから遊べる", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await expect(page.locator("#die")).toBeVisible();
  await page.getByRole("button", { name: "Depart!" }).click();

  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText("Journey saved.")).toBeVisible();

  await page.reload();
  await expect(page.getByText("Choose your journey")).toBeVisible();
  const resumeButton = page.getByRole("button", { name: "Continue saved journey" });
  await expect(resumeButton).toBeVisible();

  await resumeButton.click();
  await expect(page.locator("#die")).toBeVisible();
  await expect(page.getByText("Journey restored from your last save.")).toBeVisible();
});
