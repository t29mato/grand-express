import { test, expect } from "@playwright/test";
import { waitForDiceToSettle } from "./helpers";

test("セットアップからゲーム開始、サイコロを振って移動できる", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();

  // 2人目のスロットをCPUのままにし、開始する(1人目は人間のまま)。
  await page.getByRole("button", { name: "Start the journey" }).click();

  // ゲーム画面に遷移し、出発ストーリーのモーダルが表示される。閉じると盤面とダイスボタンで遊べる。
  await expect(page.locator("#die")).toBeVisible();
  await page.getByRole("button", { name: "Depart!" }).click();
  await expect(page.getByText(/'s turn/)).toBeVisible();

  await page.locator("#die").click();

  // サイコロ演出が終わるまで待つと、移動可能なマスのハイライトか
  // 何らかの着地処理(モーダル)が出そろっている。
  await waitForDiceToSettle(page);
  const svg = page.locator("svg.board-svg");
  await expect(svg).toBeVisible();
});

test("旅人一覧・目的地カード・アイテム欄が表示される", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  await expect(page.getByText("Travelers")).toBeVisible();
  await expect(page.getByText("Next destination")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Items" })).toBeVisible();
});
