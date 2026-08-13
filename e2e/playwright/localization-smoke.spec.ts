import { test, expect } from "@playwright/test";

test("言語を切り替えるとセットアップ画面の文言が変わる", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();

  await page.getByRole("button", { name: "JA", exact: true }).click();
  await expect(page.getByText("旅を選ぼう")).toBeVisible();
  // **地図の名札で見る。**まず大陸を選ばないと国の名札は出ない。
  await page.locator(".picker-plate").filter({ hasText: "アメリカ大陸" }).click();
  await expect(page.locator(".picker-plate").filter({ hasText: "ボリビア" })).toBeVisible();

  await page.getByRole("button", { name: "ES", exact: true }).click();
  await expect(page.getByText("Elige tu viaje")).toBeVisible();

  await page.getByRole("button", { name: "FR", exact: true }).click();
  await expect(page.getByText("Choisis ton voyage")).toBeVisible();
});

test("4言語すべてでセットアップ画面が表示できる", async ({ page }) => {
  await page.goto("/");
  for (const [code, label] of [
    ["EN", "Choose your journey"],
    ["ES", "Elige tu viaje"],
    ["FR", "Où roulons-nous ?"],
    ["JA", "旅を選ぼう"],
  ] as const) {
    await page.getByRole("button", { name: code, exact: true }).click();
    await expect(page.getByText(label, { exact: false })).toBeVisible();
  }
});
