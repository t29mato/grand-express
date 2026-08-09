import { test, expect } from "@playwright/test";

/**
 * 厄災の神が起きたあと、ゲームが続けられることの試験。
 *
 * 本番(v0.22.0)で**厄災が一度起きるとゲームが進まなくなった**。
 * 旅の記録に「👹 …is struck by misfortune.」が延々と伸び続ける、という報告。
 *
 * 原因は手番の頭で毎回厄災を判定していたこと。災難のモーダルを閉じても
 * 厄災は憑いたままなので、**サイコロを押し直すとまた災難が起きる。**
 * 閉じて押して、また災難——と繰り返し、いつまでもサイコロが振れなかった。
 *
 * 厄災は乱数で憑くので、遊んで待っていると再現しない。
 * **セーブデータを書き換えて確実に憑ける。**
 */

/** 1人目に厄災を憑けた状態で読み直す。お守りは持たせない。 */
async function startAfflicted(page: import("@playwright/test").Page) {
  await page.goto("/");
  // CPUの手番は演出のぶん待たされる。全員を人間にして手番を速く回す
  // (この試験の関心は厄災のあと進めるかであって、CPUの挙動ではない)。
  await page.getByRole("button", { name: "Human" }).nth(1).click();
  await page.getByRole("button", { name: "Human" }).nth(2).click();
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  await expect(page.locator("#die")).toBeVisible();

  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.evaluate(() => {
    const KEY = "grand-express:save:v1";
    const raw = window.localStorage.getItem(KEY);
    if (!raw) throw new Error("セーブデータが見つからない");
    const save = JSON.parse(raw);
    save.activePlayerIndex = 0;
    save.players[0].inventory = [];
    save.misfortune = {
      holderId: save.players[0].id,
      level: 1,
      turnsOnCurrentHolder: 0,
      resting: false,
      stuckTurnsRemaining: 0,
    };
    window.localStorage.setItem(KEY, JSON.stringify(save));
  });

  await page.goto("/");
  await page.getByRole("button", { name: /Continue saved journey/ }).click();
  await expect(page.locator("#die")).toBeVisible();
  for (const name of ["Depart!", "Full steam ahead", "Continue"]) {
    const button = page.getByRole("button", { name, exact: true });
    if (await button.isVisible().catch(() => false)) {
      await button.click();
      break;
    }
  }
}

/** 進行を止めているモーダルを1つ閉じる。 */
async function dismissOne(page: import("@playwright/test").Page): Promise<boolean> {
  const option = page.locator(".btn.opt").first();
  if (await option.isVisible().catch(() => false)) {
    await option.click().catch(() => {});
    return true;
  }
  for (const [name, exact] of [
    ["Back to the rails", false],
    ["Full steam ahead", false],
    ["Continue", true],
  ] as const) {
    const button = page.getByRole("button", { name, exact });
    if (await button.isVisible().catch(() => false)) {
      await button.click().catch(() => {});
      return true;
    }
  }
  return false;
}

const choosable = "svg.board-svg g[data-choosable='true']";

test("災難のモーダルを閉じたら、手番の頭に戻らず先へ進む", async ({ page }) => {
  await startAfflicted(page);

  const turnBefore = await page.locator(".turn-name").textContent();
  await page.locator("#die").click();

  // **厄災が憑いていても、必ず災難になるとは限らない。**
  // 8%の確率で「お目こぼし」になり、そのときはモーダルが出ずにそのまま振られる。
  // ここを「必ず出る」と書くと12回に1回落ちる試験になる。
  const doom = page.getByTestId("doom-modal");
  if (await doom.isVisible({ timeout: 6_000 }).catch(() => false)) {
    // 何が起きたのかが絵と文で出ていること(記録の1行だけで終わらせない)。
    await expect(page.locator(".modal-box .event-anim svg")).toHaveCount(1);
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await expect(doom).toBeHidden();
  }

  // **どの引きでも、手番の頭には戻らないこと。**
  // 不具合のあった頃は災難を閉じるとサイコロ待ちへ戻り、押し直すとまた災難が出て、
  // ここから先へ一切進めなかった。
  // 進んだ形は2通りある——行き先が選べるようになるか、
  // 手番を飛ばされて次の人に移るか。どちらでもよい。
  await expect
    .poll(
      async () => {
        if ((await page.locator(choosable).count()) > 0) return "進んだ";
        if ((await page.locator(".turn-name").textContent()) !== turnBefore) return "進んだ";
        if (await doom.isVisible().catch(() => false)) return "災難が繰り返している";
        return "止まっている";
      },
      { timeout: 15_000, message: "災難のあと手番が進まない" },
    )
    .toBe("進んだ");
});

test("厄災のあと10手番進められ、災難がログを埋め尽くさない", async ({ page }) => {
  // 10手番を実際に回すので、既定の30秒では足りない(手動で計って約36秒)。
  test.setTimeout(120_000);
  await startAfflicted(page);

  let turns = 0;
  for (let step = 0; step < 400 && turns < 10; step++) {
    const state = await page.evaluate(() => ({
      modal: !!document.querySelector(".modal-box"),
      choosable: document.querySelectorAll("svg.board-svg g[data-choosable='true']").length,
      canRoll: !((document.querySelector("#die") as HTMLButtonElement | null)?.disabled ?? true),
      rolling: document.querySelectorAll(".dice-stage").length,
    }));

    if (state.modal) {
      await dismissOne(page);
      await page.waitForTimeout(60);
      continue;
    }
    if (state.choosable > 0) {
      const targets = page.locator(choosable);
      const count = await targets.count();
      for (let i = 0; i < count; i++) {
        const clicked = await targets.nth(i).click({ timeout: 2500 }).then(() => true, () => false);
        if (clicked) break;
      }
      turns++;
      await page.waitForTimeout(80);
      continue;
    }
    if (state.rolling === 0 && state.canRoll) {
      await page.locator("#die").click().catch(() => {});
      await page.locator(".dice-stage").waitFor({ state: "detached", timeout: 8000 }).catch(() => {});
    }
    await page.waitForTimeout(80);
  }

  expect(turns, "厄災のあと手番が進まなくなった").toBeGreaterThanOrEqual(10);

  // 災難の行が記録の大半を占めていたら、それが報告された無限ループ。
  const counts = await page.evaluate(() => {
    const lines = [...document.querySelectorAll("#log p")].map((p) => p.textContent ?? "");
    return { total: lines.length, strikes: lines.filter((t) => /misfortune/i.test(t)).length };
  });
  expect(counts.total).toBeGreaterThan(5);
  expect(counts.strikes, `災難の行が多すぎる(${counts.strikes}/${counts.total})`).toBeLessThan(counts.total / 2);
});
