import { test, expect } from "@playwright/test";

// iPhone 13相当のビューポート。`devices["iPhone 13"]` はWebKitに固定されるため、
// このプロジェクト構成(Chromiumのみ)に合わせてビューポートだけを指定する。
test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

test("モバイル幅でも横スクロールが発生しない(セットアップ画面)", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});

test("モバイル幅でもゲーム画面が縦積みレイアウトで表示される", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await expect(page.locator("#die")).toBeVisible();
  await page.getByRole("button", { name: "Depart!" }).click();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});

/**
 * 縦積みになる幅で、**開いた瞬間にサイコロが画面の中にあること。**
 *
 * 中間幅で右パネルが盤面を覆っていたのを「携帯と同じく地図の下へ並べる」で直した結果、
 * 操作の層がまるごと画面の外へ落ちていた。768〜900では**326px スクロールしないと
 * サイコロが現れず**(375でも235px)、開いた画面には押せるものが1つも無かった。
 * 覆う問題を、届かない問題に置き換えていたことになる。
 *
 * `toBeVisible()` では捕まらない。**要素は存在していて、ただ画面の下にあるだけ**なので、
 * Playwright は「見えている」と判定する。位置で測る必要がある。
 */
test.describe("縦積みの幅で、サイコロが最初の画面に入っている", () => {
  // 940px 以下で縦積みになる(globals.css)。境目の両側と、代表的な端末幅を見る。
  for (const width of [375, 768, 834, 900]) {
    test(`幅${width}でスクロールせずにサイコロが押せる`, async ({ page }) => {
      await page.setViewportSize({ width, height: 820 });
      await page.goto("/");
      await page.getByRole("button", { name: "Start the journey" }).click();
      await page.getByRole("button", { name: "Depart!" }).click();
      await expect(page.locator("#die")).toBeVisible();

      const fit = await page.evaluate(() => {
        const r = document.querySelector("#die")!.getBoundingClientRect();
        return { top: Math.round(r.top), bottom: Math.round(r.bottom), vh: document.documentElement.clientHeight };
      });
      expect(fit.top, `サイコロの上端が画面の外(top=${fit.top})`).toBeGreaterThanOrEqual(0);
      expect(
        fit.bottom,
        `サイコロの下端が画面の下に隠れている(bottom=${fit.bottom} / 画面高=${fit.vh})`,
      ).toBeLessThanOrEqual(fit.vh);
    });
  }
});
