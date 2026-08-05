import { test, expect } from "@playwright/test";
import { dismissOneModal, rollAndMove } from "./helpers";

/**
 * 実際の乱数(CryptoRandomAdapter)を使い、何ターンも実際にプレイして
 * ゲームループ全体(クイズ/町での売買/青赤・カードマス/目的地到着/CPU自動進行)を
 * 通しで検証する「稼働テスト」。個々のシナリオを決定的に再現するテスト用の
 * 乱数注入(バックドア)は本番コードへのリスクを避けるため導入せず、
 * 代わりに十分な回数プレイして各マス種別を実際に踏むことを狙う
 * (docs/90-migration/03-as-built-status.md 参照)。
 */
test.setTimeout(180_000);

test("実際の乱数で何ターンもプレイしてもクラッシュしない(稼働テスト)", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();
  await page.getByRole("button", { name: "Start the journey" }).click();
  await expect(page.locator("#die")).toBeVisible();
  await page.getByRole("button", { name: "Depart!" }).click();

  for (let turn = 0; turn < 10; turn++) {
    await rollAndMove(page);
    // 1ターンの間に複数のモーダルが連鎖することがある(町→月替わり等)。
    for (let i = 0; i < 5; i++) {
      if (!(await dismissOneModal(page))) break;
      await page.waitForTimeout(250);
    }
    await page.waitForTimeout(300);
  }

  // ゲーム画面が壊れず表示され続けていること(致命的なReactエラーが出ていないこと)。
  await expect(page.getByRole("heading", { name: "Travelers" })).toBeVisible();
  expect(errors).toEqual([]);
});
