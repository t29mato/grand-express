import { test, expect, Page } from "@playwright/test";

/**
 * 月替わり(全員が1手番ずつ終える)ごとに季節イベントのモーダルが表示されることを、
 * 実際にプレイして確認する。
 *
 * CPUの手番はサイコロ演出・結果モーダルを挟んで進むため、1周にそれなりの時間がかかる。
 * ターン数ではなく「季節モーダルが出るまで」を条件に、時間予算つきで回す。
 * どのモーダルが開いているかは文言ではなく `data-testid` で判別する
 * (「Continue」ボタンは季節イベントとCPUの結果モーダルで共通のため)。
 */
test.setTimeout(180_000);

/** いま開いているモーダルの種類(何も開いていなければ null)。 */
async function openModal(page: Page): Promise<string | null> {
  return page.evaluate(() => document.querySelector(".modal-box")?.getAttribute("data-testid") ?? null);
}

/** 開いているモーダルを閉じる(クイズなら適当な選択肢を選ぶ)。 */
async function closeModal(page: Page): Promise<void> {
  const quizOption = page.locator(".btn.opt").first();
  if (await quizOption.isVisible().catch(() => false)) {
    await quizOption.click();
    return;
  }
  for (const [name, exact] of [
    ["Back to the rails", false],
    ["Full steam ahead", false],
    ["Continue", true],
  ] as const) {
    const button = page.getByRole("button", { name, exact });
    if (await button.isVisible().catch(() => false)) {
      await button.click();
      return;
    }
  }
}

test("月が替わると季節イベントのモーダルが表示され、閉じるとプレイを続けられる", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto("/");
  // 月替わりは「全員が1手番ずつ終える」ことで起きる。CPUの手番は演出のぶん
  // 時間がかかるため、全員を人間にして手番を速く回す
  // (この試験の関心は月替わりの表示であってCPUの挙動ではない)。
  await page.getByRole("button", { name: "Human" }).nth(1).click();
  await page.getByRole("button", { name: "Human" }).nth(2).click();
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();

  const seasonModal = page.getByTestId("season-modal");
  const deadline = Date.now() + 90_000;
  let reached = false;

  while (Date.now() < deadline) {
    const modal = await openModal(page);
    if (modal === "season-modal") {
      reached = true;
      break;
    }
    if (modal) {
      await closeModal(page);
      await page.waitForTimeout(250);
      continue;
    }

    // 選べるマスが出ていれば選ぶ。ここを「振った直後だけ」にすると、
    // クリックが一度失敗したときに選択待ちのまま抜け出せなくなる。
    const choosable = page.locator("svg.board-svg g[data-choosable='true']");
    if ((await choosable.count()) > 0) {
      await choosable.first().click({ timeout: 6000 }).catch(() => {});
      await page.waitForTimeout(250);
      continue;
    }

    const rolling = await page.locator(".dice-stage").count();
    const canRoll = await page
      .locator("#die")
      .isEnabled()
      .catch(() => false);
    if (canRoll && rolling === 0) {
      await page.locator("#die").click();
      await page.locator(".dice-stage").waitFor({ state: "detached", timeout: 8000 }).catch(() => {});
    }
    await page.waitForTimeout(250);
  }

  expect(reached, "季節イベントのモーダルが時間内に表示されなかった").toBe(true);
  await expect(seasonModal).toContainText("Seasonal event");

  // 「次へ」で閉じるとゲーム画面に戻り、引き続き遊べる。
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(seasonModal).not.toBeVisible();
  await expect(page.getByRole("heading", { name: "Travelers" })).toBeVisible();
  expect(errors).toEqual([]);
});
