import { test, expect } from "@playwright/test";

/**
 * 盤面をキーボードと読み上げから扱えるかの試験。
 *
 * **ここではマウスを使わない。**準備(国選び・出発)まではクリックで進めるが、
 * 手番の操作——サイコロを振る・行き先を選ぶ——は最後までキーで行う。
 *
 * **axeの結果を根拠にしないこと。** `<svg role="img">` の中は検査対象から
 * 消えるため、盤面がキーボードから完全に触れなかった頃も
 * `accessibility.spec.ts` は3件とも緑だった。実際に押せることを確かめる。
 */

async function startGame(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  await expect(page.locator("#die")).toBeVisible();
}

/** キーボードだけでサイコロのボタンまで行き、Enterで振る。 */
async function rollWithKeyboard(page: import("@playwright/test").Page) {
  await page.evaluate(() => document.body.focus());
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    if (await page.evaluate(() => document.activeElement?.id === "die")) {
      await page.keyboard.press("Enter");
      return true;
    }
  }
  return false;
}

const candidates = "svg.board-svg g[data-choosable='true']";

test("キーボードだけでサイコロを振り、行き先を選んで進める", async ({ page }) => {
  await startGame(page);

  expect(await rollWithKeyboard(page), "Tabでサイコロに辿り着けない").toBe(true);
  await page.locator(".dice-stage").waitFor({ state: "detached", timeout: 10_000 }).catch(() => {});
  await expect(page.locator(candidates).first()).toBeVisible();

  // 振ると、先頭の候補にフォーカスが移っている(サイコロは盤面より後ろにあるので、
  // ここで移さないとTabでは候補へ進めない)。
  const focused = await page.evaluate(() => ({
    role: document.activeElement?.getAttribute("role"),
    choosable: document.activeElement?.getAttribute("data-choosable"),
  }));
  expect(focused).toEqual({ role: "button", choosable: "true" });

  // 矢印で送れる。
  const before = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
  await page.keyboard.press("ArrowRight");
  const after = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
  expect(after).not.toBe(before);
  await page.keyboard.press("ArrowLeft");
  expect(await page.evaluate(() => document.activeElement?.getAttribute("aria-label"))).toBe(before);

  // Enterで決まる。<g role="button"> はEnterが自動でクリックにならないので、
  // ここが通ることが実装の要。
  await page.keyboard.press("Enter");
  await expect(page.locator(candidates)).toHaveCount(0);
});

test("候補が読み上げに出て、向き・種類・目的地までの残りが分かる", async ({ page }) => {
  await startGame(page);
  expect(await rollWithKeyboard(page)).toBe(true);
  await page.locator(".dice-stage").waitFor({ state: "detached", timeout: 10_000 }).catch(() => {});
  await expect(page.locator(candidates).first()).toBeVisible();

  // まとまりに「何マス進むか」と「候補が何個か」が入っている。
  await expect(page.locator("svg.board-svg g.nodes")).toHaveAttribute(
    "aria-label",
    /Move \d+ squares\. \d+ places you can reach\./,
  );

  // 候補1つずつが**ボタンとして**引ける(引けなければツリーに出ていない)。
  const label = await page.locator(candidates).first().getAttribute("aria-label");
  expect(label).toMatch(/^(north|north-east|east|south-east|south|south-west|west|north-west), /);
  // 末尾で固定しない。**同じ文の候補が並んで区別が付かなかったのを直したとき**、
  // 「On the Coroico–La Paz line.」のような路線名を後ろに足したため
  // (盤面には分かれ道があり、方位も種類も距離も同じ候補が並ぶことがある)。
  expect(label).toMatch(/(squares away|This is your destination\.)/);
  // **1件だけとは限らない。** 盤面には分かれ道があるので、方位も種類も
  // 目的地までの距離も同じ候補が並ぶことがある(6盤面で数えて組の15.5%)。
  // 読み上げ側はそこに路線名を足して区別するが、**同じ路線の上に並ぶ組**は
  // まだ残る(0.16%)。ここで「1件」と決めつけると4回に1回落ちる試験になる。
  await expect(page.getByRole("button", { name: label!, exact: true }).first()).toBeVisible();
});

test("Tab停止は候補全体で1つだけ(200個のマスがTab順に入らない)", async ({ page }) => {
  await startGame(page);
  expect(await rollWithKeyboard(page)).toBe(true);
  await page.locator(".dice-stage").waitFor({ state: "detached", timeout: 10_000 }).catch(() => {});
  await expect(page.locator(candidates).first()).toBeVisible();

  const total = await page.locator("svg.board-svg g.nodes > g").count();
  expect(total, "この盤面のマスが少なすぎる(試験の前提が崩れている)").toBeGreaterThan(100);

  // tabIndex=0 を持つのは候補のうち1つだけ。残りは -1。
  const tabbable = await page.locator("svg.board-svg g.nodes > g[tabindex='0']").count();
  expect(tabbable).toBe(1);
});

test("行き先を選んでいないときは、盤面にフォーカスできる要素が無い", async ({ page }) => {
  await startGame(page);
  await expect(page.locator(candidates)).toHaveCount(0);
  expect(await page.locator("svg.board-svg [tabindex]").count()).toBe(0);

  // 代わりに、いまどこに居るかはHUDに文で出ている。
  // 誰の話かは文の外(名前の札)にある——この枠はCPUの手番でも同じ形で出るため、
  // 文そのものは二人称で書かない。
  const status = page.locator(".board-status-line");
  await expect(status).toHaveText(/^You .*At .+\. .+ is \d+ squares away\.$/);
  await expect(status.locator(".board-status-who")).toContainText("You");
});

test("盤面の飾りは読み上げから外れている", async ({ page }) => {
  await startGame(page);
  // 地形・路線・都市名・駒。ツリーに残すのは行き先の候補だけ。
  for (const layer of [".edges", ".city-labels", ".tokens"]) {
    await expect(page.locator(`svg.board-svg ${layer}`)).toHaveAttribute("aria-hidden", "true");
  }
  // 盤面そのものの説明は4言語に載っている(英語のハードコードではない)。
  await expect(page.locator("svg.board-svg")).toHaveAttribute("aria-label", "Game board");
  await page.getByRole("button", { name: "JA", exact: true }).click();
  await expect(page.locator("svg.board-svg")).toHaveAttribute("aria-label", "ゲーム盤");
});
