import { test, expect } from "@playwright/test";

/**
 * 前の旅の顔ぶれを覚えているかの試験。
 *
 * 「新しいゲームを始めるときに、前のゲームプレイヤーの名前を残しておいてください。
 * そうすると、再入力必要ないので」という要望。
 * 毎回名前を入れ直させていた。
 *
 * **既定名は覚えない**ことも確かめる。「あなた/Tú/Toi」を保存してしまうと、
 * 次に別の言語で開いたときに前の言語の既定名が残り、言語に追随しなくなる。
 */

const nameField = (page: import("@playwright/test").Page, index: number) =>
  page.locator(".slot input").nth(index);

test("名前を付けて始め、New game を押すと名前が残っている", async ({ page }) => {
  await page.goto("/");
  await nameField(page, 0).fill("みか");
  await nameField(page, 1).fill("たろう");
  // 2人目を人間にする(名前を付けた枠が CPU のままだと見えないため)。
  await page.getByRole("button", { name: "Human" }).nth(1).click();

  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  await expect(page.locator("#die")).toBeVisible();

  await page.getByRole("button", { name: "New game" }).click();
  await expect(page.getByText("Choose your journey")).toBeVisible();

  await expect(nameField(page, 0), "1人目の名前が消えている").toHaveValue("みか");
  await expect(nameField(page, 1), "2人目の名前が消えている").toHaveValue("たろう");
  // 誰がどの枠を使うかも戻っていること(名前だけ戻っても、枠が CPU なら名前は出てこない)。
  // 選ばれている側は `class="on"` で示される作り(`aria-pressed` は付いていない)。
  await expect(page.getByRole("button", { name: "Human" }).nth(1)).toHaveClass(/\bon\b/);
});

test("覚えた名前はページを開き直しても残る", async ({ page }) => {
  await page.goto("/");
  await nameField(page, 0).fill("みか");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  await expect(page.locator("#die")).toBeVisible();

  await page.goto("/");
  await expect(nameField(page, 0)).toHaveValue("みか");
});

test("既定名のまま始めた場合は覚えず、言語を切り替えると既定名が追従する", async ({ page }) => {
  await page.goto("/");
  // 名前は触らずに始める。
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  await expect(page.locator("#die")).toBeVisible();
  await page.getByRole("button", { name: "New game" }).click();

  await expect(nameField(page, 0)).toHaveValue("You");
  // 既定名を保存していれば、ここで英語のまま固まる。
  await page.getByRole("button", { name: "JA", exact: true }).click();
  await expect(nameField(page, 0), "既定名が言語に追従しなくなっている").toHaveValue("あなた");
});
