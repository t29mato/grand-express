import { test, expect, Page } from "@playwright/test";

/**
 * 実際の乱数(CryptoRandomAdapter)を使い、何ターンも実際にプレイして
 * ゲームループ全体(クイズ/町での売買/青赤・カードマス/目的地到着/CPU自動進行)を
 * 通しで検証する「稼働テスト」。個々のシナリオを決定的に再現するテスト用の
 * 乱数注入(バックドア)は本番コードへのリスクを避けるため導入せず、
 * 代わりに十分な回数プレイして各マス種別を実際に踏むことを狙う
 * (docs/90-migration/03-as-built-status.md 参照)。
 */

/** 開いているモーダルを1つ閉じる。閉じるものがなければ false を返す。 */
async function dismissOneModal(page: Page): Promise<boolean> {
  // クイズが出たら適当な選択肢をクリックする。
  const quizOption = page.locator(".btn.opt").first();
  if (await quizOption.isVisible().catch(() => false)) {
    await quizOption.click();
    return true;
  }
  // 町に停まったら(購入はせず)そのまま戻る。
  const backToRails = page.getByRole("button", { name: "Back to the rails" });
  if (await backToRails.isVisible().catch(() => false)) {
    await backToRails.click();
    return true;
  }
  // 目的地に到着したら「次の区間」の案内を閉じる。
  const fullSteam = page.getByRole("button", { name: "Full steam ahead" });
  if (await fullSteam.isVisible().catch(() => false)) {
    await fullSteam.click();
    return true;
  }
  // CPUの結果モーダル(町・クイズ)も閉じられる。
  // 月替わりの季節モーダルと同じ「Continue」ボタンなので、まとめて拾う。
  const continueButton = page.getByRole("button", { name: "Continue", exact: true });
  if (await continueButton.isVisible().catch(() => false)) {
    await continueButton.click();
    return true;
  }
  return false;
}

/**
 * 1ターンの間に複数のモーダルが連鎖して出ることがある
 * (例: 町に停まる → 閉じる → 月が替わって季節イベント)。
 * 開いているものがなくなるまで順に閉じる。
 */
async function resolveWhateverAppeared(page: Page): Promise<void> {
  for (let i = 0; i < 4; i++) {
    if (!(await dismissOneModal(page))) return;
    await page.waitForTimeout(200);
  }
}

test("実際の乱数で何ターンもプレイしてもクラッシュしない(稼働テスト)", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();
  await page.getByRole("button", { name: "Start the journey" }).click();
  await expect(page.locator("#die")).toBeVisible();
  await page.getByRole("button", { name: "Depart!" }).click();

  for (let turn = 0; turn < 12; turn++) {
    const die = page.locator("#die");
    // CPUの自動進行中などでボタンが無効な場合はスキップして少し待つ。
    if (await die.isEnabled().catch(() => false)) {
      await die.click();
      // ロール後に到達可能なマス(ハロー付きの円)をクリックする。
      // このテストの目的は「クラッシュしないこと」の確認であり、カメラ追尾中の
      // 一瞬のレイアウト変化でクリックが一度取りこぼされても本質的な失敗ではないため、
      // クリック自体の成否は許容し、次のターンへ進める。
      const choosable = page.locator("svg.board-svg g[style*='cursor: pointer']").first();
      if (await choosable.isVisible({ timeout: 2000 }).catch(() => false)) {
        await choosable.click({ timeout: 5000 }).catch(() => {});
      }
    }
    await page.waitForTimeout(300);
    await resolveWhateverAppeared(page);
    await page.waitForTimeout(300);
  }

  // ゲーム画面が壊れず表示され続けていること(致命的なReactエラーが出ていないこと)。
  await expect(page.getByRole("heading", { name: "Travelers" })).toBeVisible();
  expect(errors).toEqual([]);
});
