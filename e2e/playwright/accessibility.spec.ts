import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("セットアップ画面に重大なアクセシビリティ違反がない", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});

test("出発ストーリーのモーダルに重大なアクセシビリティ違反がない", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await expect(page.getByRole("button", { name: "Depart!" })).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});

test("ゲーム画面に重大なアクセシビリティ違反がない", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  await expect(page.locator("#die")).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});
