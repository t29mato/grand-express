import { test, expect, Page } from "@playwright/test";

/**
 * 画面の音楽ボタンで、BGMが本当に止まるかを実ブラウザで確かめる。
 *
 * **`AudioContext.state` は当てにならない。** 音楽を止めても効果音のために
 * コンテキストは起きたままなので、ずっと `running` に見える。
 * 代わりに `createOscillator` が呼ばれた回数を数える。BGMは拍のスケジューラが
 * 先読みして音を予約し続ける仕組みなので、**増え続けていれば鳴っており、
 * 増えなくなれば止まっている。**
 *
 * ボタンを押せたことは毎回 `aria-pressed` で確かめる。押し損ねたまま
 * 「増えていないから止まった」と読むと、逆の結論になる。
 */

interface Probe {
  osc: number;
  state: string | null;
}

/** AudioContextを包んで、作られた音源の数を数える。ページ読み込み前に仕込む。 */
function installOscillatorCounter(): void {
  const w = window as unknown as {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
    __oscCount?: number;
    __audioCtx?: AudioContext;
  };
  w.__oscCount = 0;
  const Original = w.AudioContext ?? w.webkitAudioContext;
  if (!Original) return;
  class Counted extends Original {
    constructor(...args: ConstructorParameters<typeof AudioContext>) {
      super(...args);
      w.__audioCtx = this;
    }
    createOscillator(): OscillatorNode {
      w.__oscCount = (w.__oscCount ?? 0) + 1;
      return super.createOscillator();
    }
  }
  w.AudioContext = Counted;
  w.webkitAudioContext = Counted;
}

function readProbe(page: Page): Promise<Probe> {
  return page.evaluate(() => {
    const w = window as unknown as { __oscCount?: number; __audioCtx?: AudioContext };
    return { osc: w.__oscCount ?? 0, state: w.__audioCtx ? w.__audioCtx.state : null };
  });
}

/** `ms` のあいだに音源がいくつ増えたかを返す。 */
async function countGrowth(page: Page, ms: number): Promise<number> {
  const before = await readProbe(page);
  await page.waitForTimeout(ms);
  const after = await readProbe(page);
  return after.osc - before.osc;
}

const MUSIC_TOGGLE = "music-toggle";

test("トップ画面で音楽を止められ、開き直しても止まったまま", async ({ page }) => {
  await page.addInitScript(installOscillatorCounter);
  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await expect(page.getByText("Choose your journey")).toBeVisible();

  const toggle = page.getByTestId(MUSIC_TOGGLE);
  await expect(toggle).toHaveAttribute("aria-pressed", "true");

  // 1. 音楽が入っているあいだは、音源が増え続ける。
  //    自動再生ポリシーがあるので、まず何か触って音楽を始める。
  const bolivia = page.locator(".ccard").filter({ hasText: "Bolivia" });
  await bolivia.click();
  await expect(bolivia).toHaveAttribute("aria-pressed", "true");
  await page.waitForTimeout(1500);
  expect(await countGrowth(page, 2000)).toBeGreaterThan(10);

  // 2. 止めると増えなくなる。押せたことを確かめてから数える。
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  // 押した時点で先読み済みだったぶんが乗り切るのを待ってから数え始める。
  await page.waitForTimeout(500);
  expect(await countGrowth(page, 2500)).toBe(0);

  // 効果音のためにコンテキストは起きたまま(だから state では止まったか判断できない)。
  expect((await readProbe(page)).state).toBe("running");

  // 3. 開き直しても止まったまま。数え直しも読み込みと一緒に0から始まる。
  await page.reload();
  await expect(page.getByText("Choose your journey")).toBeVisible();
  await expect(page.getByTestId(MUSIC_TOGGLE)).toHaveAttribute("aria-pressed", "false");
  await page.locator(".ccard").filter({ hasText: "Bolivia" }).click();
  await page.waitForTimeout(1000);
  expect(await countGrowth(page, 2500)).toBe(0);
});

test("ゲーム画面でも音楽を止められ、効果音は残る", async ({ page }) => {
  await page.addInitScript(installOscillatorCounter);
  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();

  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  await expect(page.locator("#die")).toBeVisible();

  // 国のBGMが鳴っている。
  await page.waitForTimeout(1500);
  expect(await countGrowth(page, 2000)).toBeGreaterThan(10);

  const toggle = page.getByTestId(MUSIC_TOGGLE);
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await page.waitForTimeout(500);
  expect(await countGrowth(page, 2500)).toBe(0);

  // 止まるのは音楽だけ。サイコロを振れば効果音は鳴る
  // (自分の操作への返事なので残す、という作りをここで押さえておく)。
  const before = await readProbe(page);
  await page.locator("#die").click();
  await page.waitForTimeout(1500);
  expect((await readProbe(page)).osc).toBeGreaterThan(before.osc);
});
