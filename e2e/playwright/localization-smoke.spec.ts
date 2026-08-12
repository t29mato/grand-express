import { test, expect } from "@playwright/test";

test("言語を切り替えるとセットアップ画面の文言が変わる", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();

  await page.getByRole("button", { name: "JA", exact: true }).click();
  await expect(page.getByText("旅を選ぼう")).toBeVisible();
  // **地図の印の名前で見る。**盤面の名前は印(押せる相手)と、その下の
  // 説明行(`.country-chosen`)の2箇所に出るので、どちらか一方に絞って見る。
  await expect(page.locator(".world-picker").getByRole("button", { name: "ボリビア", exact: true })).toBeVisible();

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
