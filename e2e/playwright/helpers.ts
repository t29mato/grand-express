import { Page } from "@playwright/test";

/**
 * E2E共通のヘルパー。
 *
 * サイコロ演出が入ったことで「振ってから盤面を操作できるまで」に時間がかかるように
 * なった。固定時間で待つと余裕が足りずクリックが不安定になるため、
 * **演出用の要素が消えるのを待つ**(=演出の終了を待つ)ようにしている。
 */

/** サイコロ演出が終わるまで待つ(出ていなければすぐ返る)。 */
export async function waitForDiceToSettle(page: Page): Promise<void> {
  const stage = page.locator(".dice-stage");
  // 演出が始まるまで少し猶予を見る(始まらなければそのまま抜ける)。
  await stage.waitFor({ state: "attached", timeout: 1500 }).catch(() => {});
  await stage.waitFor({ state: "detached", timeout: 8000 }).catch(() => {});
  // 演出が消えた直後の再描画が落ち着くのを待つ。
  await page.waitForTimeout(250);
}

/** 人間の手番でサイコロを振り、到達可能なマスがあれば1つ選ぶ。 */
export async function rollAndMove(page: Page): Promise<void> {
  const die = page.locator("#die");
  if (!(await die.isEnabled().catch(() => false))) return;
  await die.click();
  await waitForDiceToSettle(page);
  await clickAnyChoosableSquare(page);
}

/**
 * 到達可能なマスを1つ選ぶ。押せたら true。
 *
 * 1つ目だけを狙うと、そのマスが何かに隠れていた場合に永久に選べず、
 * 呼び出し側のループが手詰まりになる。押せるまで順に試す。
 */
export async function clickAnyChoosableSquare(page: Page): Promise<boolean> {
  const choosable = page.locator("svg.board-svg g[data-choosable='true']");
  const count = await choosable.count().catch(() => 0);
  for (let i = 0; i < count; i++) {
    const clicked = await choosable
      .nth(i)
      .click({ timeout: 4000 })
      .then(() => true)
      .catch(() => false);
    if (clicked) return true;
  }
  return false;
}

/**
 * 進行を止めているモーダルを1つ閉じる。閉じたら true。
 * `skipSeason` を指定すると、季節イベントのモーダルだけは閉じずに残す。
 */
export async function dismissOneModal(page: Page, options: { skipSeason?: boolean } = {}): Promise<boolean> {
  const quizOption = page.locator(".btn.opt").first();
  if (await quizOption.isVisible().catch(() => false)) {
    await quizOption.click();
    return true;
  }
  for (const name of ["Back to the rails", "Full steam ahead"]) {
    const button = page.getByRole("button", { name });
    if (await button.isVisible().catch(() => false)) {
      await button.click();
      return true;
    }
  }
  // 季節イベント・CPUの結果モーダルはどちらも「Continue」で閉じるため、
  // 文言ではなく testId でどちらが開いているかを判別する。
  if (options.skipSeason) {
    const seasonVisible = await page
      .getByTestId("season-modal")
      .isVisible()
      .catch(() => false);
    if (seasonVisible) return false;
  }
  const cont = page.getByRole("button", { name: "Continue", exact: true });
  if (await cont.isVisible().catch(() => false)) {
    await cont.click();
    return true;
  }
  return false;
}
