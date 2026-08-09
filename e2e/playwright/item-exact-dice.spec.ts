import { test, expect, type Page } from "@playwright/test";
import { clickAnyChoosableSquare } from "./helpers";

/**
 * 「出目を自分で選べる」アイテムを、買うところから使うところまで通しで確かめる。
 *
 * このアイテム(周遊券・タクシー・時刻表・急行券・時計)は、`useInventoryItem` に
 * 受け皿が無かったため**6盤面すべてで一度も動いたことがなかった。**
 * 使うと持ち物から消えて、ログが1行増えるだけだった。
 * ドメインの単体テストは前から緑だったので、**通しで動かさないと分からない。**
 *
 * ⚠ **アイテムは乱数で手に入れない。**屋台に着くまで進める作りにすると、
 * 出目次第で着かず、気まぐれに落ちるテストになる(今日それで別の試験が
 * 5回中2回落ちている)。**セーブデータに直接差し込んで確実に持たせる。**
 */
const SAVE_KEY = "grand-express:save:v1";

/** ゲームを始め、保存データ経由で「出目を選べる」アイテムを持たせて再開する。 */
async function startWithExactDiceItem(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  await expect(page.locator("#die")).toBeVisible();

  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  // ボリビアの `pass`(テレフェリコ周遊券)が choose-exact-dice。
  await page.evaluate((key) => {
    const raw = window.localStorage.getItem(key);
    if (!raw) throw new Error("保存データが見つからない");
    const save = JSON.parse(raw);
    save.players[0].inventory = ["pass"];
    window.localStorage.setItem(key, JSON.stringify(save));
  }, SAVE_KEY);

  await page.reload();
  await page.getByRole("button", { name: "Continue saved journey" }).click();
  await expect(page.locator("#die")).toBeVisible();
}

test("出目を選べるアイテムを使うと、選んだ数だけ進める", async ({ page }) => {
  await startWithExactDiceItem(page);

  // 1. 使うと、選ぶ画面が出る(以前はここで何も起きなかった)。
  await page.locator("aside button.item.usable").first().click();
  const modal = page.getByTestId("exact-dice-modal");
  await expect(modal, "出目を選ぶ画面が出ない").toBeVisible();
  await expect(modal.locator(".btnrow button"), "1〜6が揃っていない").toHaveCount(6);

  // 2. 4を選ぶと、その数で行けるマスが光る。
  await modal.getByRole("button", { name: "4", exact: true }).click();
  await expect(modal).not.toBeVisible();
  await expect(page.locator(".turn-hint"), "選んだ数が案内に出ていない").toContainText("4");
  const choosable = page.locator("svg.board-svg g[data-choosable='true']");
  await expect(choosable.first(), "行けるマスが光っていない").toBeVisible();

  // 3. 押すと実際に移動する(候補が消える)。
  expect(await clickAnyChoosableSquare(page), "光っているマスを押せない").toBe(true);
  await expect(choosable, "移動していない").toHaveCount(0);

  // アイテムは使い切りなので、持ち物から消えている。
  await expect(page.locator("aside button.item.usable")).toHaveCount(0);
});

test("選ぶ画面は、狭い幅でも1〜6が全部見えて押せる", async ({ page }) => {
  // 縦積みになる幅。6つのボタンが折り返しても画面から出ないこと。
  await page.setViewportSize({ width: 375, height: 820 });
  await startWithExactDiceItem(page);
  await page.locator("aside button.item.usable").first().click();

  const modal = page.getByTestId("exact-dice-modal");
  await expect(modal).toBeVisible();
  const buttons = modal.locator(".btnrow button");
  await expect(buttons).toHaveCount(6);

  const fits = await page.evaluate(() => {
    const box = document.querySelector('[data-testid="exact-dice-modal"]')!.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const outside = [...document.querySelectorAll('[data-testid="exact-dice-modal"] .btnrow button')]
      .map((b) => b.getBoundingClientRect())
      .filter((r) => r.left < 0 || r.right > vw || r.top < 0 || r.bottom > vh).length;
    return { outside, modalRight: Math.round(box.right), vw, overflow: document.documentElement.scrollWidth - vw };
  });
  expect(fits.outside, "画面の外に出ているボタンがある").toBe(0);
  expect(fits.modalRight, "モーダルが画面からはみ出している").toBeLessThanOrEqual(fits.vw);
  expect(fits.overflow, "横スクロールが出ている").toBeLessThanOrEqual(1);

  // 実際に押せること(見えているだけでなく)。
  await buttons.nth(5).click();
  await expect(page.locator(".turn-hint")).toContainText("6");
});
