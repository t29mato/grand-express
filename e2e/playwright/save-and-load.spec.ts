import { test, expect } from "@playwright/test";

test("セーブしてリロードすると、続きから遊べる", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await expect(page.locator("#die")).toBeVisible();
  await page.getByRole("button", { name: "Depart!" }).click();

  await page.getByRole("button", { name: "Save", exact: true }).click();
  // セーブ完了はモーダルで知らせる(ログにも同じ文言が残る)。
  await expect(page.getByRole("heading", { name: "Journey saved." })).toBeVisible();
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  await page.reload();
  await expect(page.getByText("Choose your journey")).toBeVisible();

  // 押す前に「何が保存されているか」が読めること(国・進行度・参加者と所持金)。
  const savedCard = page.locator(".saved-card");
  await expect(savedCard).toBeVisible();
  await expect(savedCard).toContainText("Bolivia");
  await expect(savedCard).toContainText("Year 1");
  await expect(savedCard).toContainText(/Month \d+ of 12/);
  await expect(savedCard.locator(".saved-player")).toHaveCount(3);
  await expect(savedCard.locator(".saved-player .cash").first()).toContainText("Bs");

  const resumeButton = page.getByRole("button", { name: "Continue saved journey" });
  await expect(resumeButton).toBeVisible();

  await resumeButton.click();
  await expect(page.locator("#die")).toBeVisible();
  await expect(page.getByText("Journey restored from your last save.")).toBeVisible();
});

/** 保存された旅を1つ作って、セットアップ画面に戻ってくる。 */
async function makeSavedGame(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await expect(page.locator("#die")).toBeVisible();
  await page.getByRole("button", { name: "Depart!" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.reload();
  await expect(page.locator(".saved-card")).toBeVisible();
}

test("セーブデータを削除すると「続きから」の表示が消える", async ({ page }) => {
  await makeSavedGame(page);

  await page.getByRole("button", { name: "Discard" }).click();
  // 「削除」だけでは消えない。確認で「消す」を選んではじめて消える。
  // 開いた直後は連打よけで効かないので、少し置いてから押す(SETTLE_MS)。
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Delete it" }).click();
  await expect(page.locator(".saved-card")).not.toBeVisible();

  // 消えたことがリロード後も保たれる。
  await page.reload();
  await expect(page.getByText("Choose your journey")).toBeVisible();
  await expect(page.locator(".saved-card")).not.toBeVisible();
});

/**
 * ユーザーからの報告:「押し間違い1回で、12ヶ月遊んだものが消える」。
 *
 * 「削除」を押した時点では**何も消えていない**ことを固定する。
 * ここが緑でないと、確認の画面が出ていても裏で消えている、という直し方が通ってしまう。
 */
test("「削除」を押しても、確認するまでセーブは消えない", async ({ page }) => {
  await makeSavedGame(page);

  await page.getByRole("button", { name: "Discard" }).click();

  const confirm = page.getByTestId("discard-confirm");
  await expect(confirm).toBeVisible();
  // 何が消えるのかが確認の中に出ていること(国・何年目の何月・何ヶ月中・旅人)。
  await expect(confirm).toContainText("Bolivia");
  await expect(confirm).toContainText("Year 1");
  await expect(confirm).toContainText(/Month \d+ of 12/);
  await expect(confirm).toContainText("Travelers:");

  // 開いた直後の既定は「消さない」。ここで Enter を打っても消えない。
  await expect(page.getByRole("button", { name: "Keep it" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(confirm).not.toBeVisible();
  await expect(page.locator(".saved-card")).toBeVisible();

  // Escape でも消えない。
  await page.getByRole("button", { name: "Discard" }).click();
  await expect(confirm).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(confirm).not.toBeVisible();

  // 消えていないことを、画面の見た目ではなく保存そのもので確かめる。
  await page.reload();
  await expect(page.locator(".saved-card")).toBeVisible();
});

/**
 * 375pxで測ると、「消す」が出る場所は**さっき「削除」を押した指の位置とほぼ同じ**
 * だった(削除 x256-346 y441-483 / 消す x244-338 y440-482)。
 * 反応が無いと思って叩き直す人がいるので、開いた直後の一打は落とす。
 */
test("「削除」を連打しても消えない", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 720 });
  await makeSavedGame(page);

  const discard = page.getByRole("button", { name: "Discard" });
  const box = await discard.boundingBox();
  if (!box) throw new Error("「削除」が見つからない");

  // 同じ場所を2回叩く。1打目で確認が開き、2打目は「消す」の上に落ちる。
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.click(x, y);
  await page.mouse.click(x, y);

  await expect(page.getByTestId("discard-confirm")).toBeVisible();
  await page.reload();
  await expect(page.locator(".saved-card")).toBeVisible();
});
