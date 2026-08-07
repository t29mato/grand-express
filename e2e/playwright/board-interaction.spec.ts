import { test, expect } from "@playwright/test";
import { clickAnyChoosableSquare } from "./helpers";

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

declare global {
  interface Window {
    /** 「行けません」の輪が一度でも出たか(下の試験用)。 */
    __sawReject?: boolean;
  }
}

/**
 * 届かないマスを押したときに、必ず何かが返ること。
 *
 * 遊んだ人が「出目と違う距離のマスを押しても、エラー音もメッセージも出ず何も起きない」
 * 「反応していないのか操作を間違えたのか判断できない」と**2回**書いた箇所。
 * 無反応は「壊れている」に見えるので、見た目の良し悪しより重い。
 */
test("届かないマスを押すと「行けません」と返る", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();

  await page.locator("#die").click();
  await page.locator(".dice-stage").waitFor({ state: "detached", timeout: 10_000 }).catch(() => {});
  await expect(page.locator("svg.board-svg g[data-choosable='true']").first()).toBeVisible();

  // 輪は0.4秒ほどで消えるので、出た瞬間を見張っておく(撮りに行くと間に合わない)。
  await page.evaluate(() => {
    window.__sawReject = false;
    new MutationObserver(() => {
      if (document.querySelector(".reject-ring")) window.__sawReject = true;
    }).observe(document.body, { subtree: true, childList: true });
  });

  // マーカーの中心が他の絵に隠れていることがあるので、当たるまで何個か試す。
  const unreachable = page.locator("svg.board-svg .nodes > g:not([data-choosable='true'])");
  const tries = Math.min(await unreachable.count(), 40);
  let answered = false;
  for (let i = 0; i < tries && !answered; i += 3) {
    await unreachable
      .nth(i)
      .click({ force: true, timeout: 3000 })
      .catch(() => {});
    await page.waitForTimeout(120);
    answered = (await page.evaluate(() => window.__sawReject === true)) === true;
  }
  expect(answered, "届かないマスを押しても何も返らなかった").toBe(true);

  // 返したあとも、届くマスはこれまでどおり選べる。
  // 1つ目だけを狙わないのは、マスが重なっていて隠れていることがあるため
  // (盤面によっては2マスが1単位ほどしか離れていない)。
  expect(await clickAnyChoosableSquare(page), "届くマスが選べなくなった").toBe(true);
  await expect(page.locator("svg.board-svg g[data-choosable='true']")).toHaveCount(0);
});
