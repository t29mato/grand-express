import { test, expect } from "@playwright/test";

/** 盤面のviewBox(カメラ位置)を読む。 */
async function readViewBox(page: import("@playwright/test").Page): Promise<string> {
  return (await page.locator("svg.board-svg").getAttribute("viewBox")) ?? "";
}

test("盤面をドラッグすると地図が移動する", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  const board = page.locator("svg.board-svg");
  await expect(board).toBeVisible();

  // カメラの追尾アニメーションが落ち着くのを待ってから基準を取る。
  await page.waitForTimeout(1200);
  const before = await readViewBox(page);

  // 盤面は縦に長くビューポートからはみ出すため、確実に見えている範囲を起点にする。
  await board.scrollIntoViewIfNeeded();
  const box = (await board.boundingBox())!;
  const viewport = page.viewportSize()!;
  const startX = box.x + box.width / 2;
  const startY = Math.min(box.y + box.height / 2, viewport.height - 120);

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX - 160, startY - 90, { steps: 12 });
  await page.mouse.up();

  const after = await readViewBox(page);
  expect(after).not.toBe(before);
});

test("ゲーム中でも言語を切り替えられる", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();

  // 英語では「Travelers」「Save」。
  await expect(page.getByRole("heading", { name: "Travelers" })).toBeVisible();

  await page.getByRole("button", { name: "JA", exact: true }).click();

  // 日本語に切り替わり、既に出ているゲームログも日本語になる。
  await expect(page.getByRole("heading", { name: "旅人" })).toBeVisible();
  await expect(page.locator("#log")).toContainText("新しい旅");
});
