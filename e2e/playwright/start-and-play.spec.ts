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
  // 名前を付けずに始めたので "Your turn"。ここは以前 /'s turn/ を待っていたが、
  // それは既定名 "You" を所有格に入れて "You's turn" になっていた頃の文言だった
  // (テストが壊れた英語のほうを固定していた)。
  await expect(page.getByText("Your turn")).toBeVisible();

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
