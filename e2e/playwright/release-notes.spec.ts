import { test, expect } from "@playwright/test";

/**
 * フッターのバージョン表示と、リリースノートページへの導線。
 * バージョンは package.json からビルド時に埋め込まれる(`next.config.ts`)。
 */

test("フッターにバージョンが表示され、更新情報ページへ行き来できる", async ({ page }) => {
  await page.goto("/");

  const footer = page.locator(".app-footer");
  await expect(footer).toBeVisible();
  // 0.0.0 のままなら埋め込みに失敗している。
  await expect(footer.locator(".app-version")).toHaveText(/World Express v\d+\.\d+\.\d+/);
  await expect(footer.locator(".app-version")).not.toHaveText(/v0\.0\.0/);

  await page.getByRole("link", { name: "What's new" }).click();
  // **末尾のスラッシュは必須。**GitHub Pages は `/release-notes` に対して
  // `release-notes/index.html` しか探さないので、next.config.ts で
  // trailingSlash: true にしてある。その結果URLは `/release-notes/` になる。
  await expect(page).toHaveURL(/\/release-notes\/$/);
  await expect(page.getByRole("heading", { name: "What's new", level: 1 })).toBeVisible();

  // 版ごとの見出しが新しい順に並んでいる。
  const versions = await page.locator(".note-version").allTextContents();
  expect(versions.length).toBeGreaterThan(0);
  expect(versions[0]).toMatch(/^v\d+\.\d+\.\d+$/);

  await page.getByRole("link", { name: "Back to the game" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText("Choose your journey")).toBeVisible();
});

test("更新情報ページで選んだ言語がゲーム画面にも引き継がれる", async ({ page }) => {
  await page.goto("/release-notes/");
  await page.getByRole("button", { name: "JA", exact: true }).click();
  await expect(page.getByRole("heading", { name: "更新情報", level: 1 })).toBeVisible();

  // レイアウトで言語を保持しているので、ページを移動しても戻らない。
  await page.getByRole("link", { name: "ゲームに戻る" }).click();
  await expect(page.getByText("旅を選ぼう")).toBeVisible();
});
