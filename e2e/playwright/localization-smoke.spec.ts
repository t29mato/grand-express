import { test, expect } from "@playwright/test";

test("言語を切り替えるとセットアップ画面の文言が変わる", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();

  await page.getByRole("button", { name: "JA", exact: true }).click();
  await expect(page.getByText("旅を選ぼう")).toBeVisible();
  // **札の中の名前だけを見る。**選んでいる盤面の名前は、札と、その下の
  // 説明行(`.country-chosen`)の2箇所に出る。盤面が19枚になっても
  // 「誰が遊ぶか」を画面の外へ押し出さないため、説明を札から外した結果。
  await expect(page.locator(".ccard .nm").getByText("ボリビア", { exact: true })).toBeVisible();

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
