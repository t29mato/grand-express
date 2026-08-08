import { test, expect, Page } from "@playwright/test";

/**
 * 凡例が盤面の邪魔をしないことを守る。
 *
 * この場所は3回作り直している:
 *  1. legacy は盤面の右下(SVG)→ コルシカ島やニュージーランドに必ず被った
 *  2. 画面の左上へ移し、幅640px未満では `display: none` にした
 *     → **携帯の人、つまりいちばん説明を要る人に一度も出なくなった**
 *  3. たためるようにして出したが、今度は**当たり判定が下のマスを吸っていた**(v0.18.1)
 *  4. 押せるようにはなったが、**まだ都市名を隠していた**(最悪 768px で13件)
 *
 * 直すたびに別の何かが壊れているので、4つまとめて縛る。
 */

interface LegendProbe {
  covered: string[];
  legendVisible: boolean;
  toggleVisible: boolean;
  /** 凡例の矩形の中で、当たり判定を凡例に奪われている点の数(0でなければならない)。 */
  stolen: number;
  /** 同じ範囲で、盤面のマスに届いている点の数(奪われていない証拠)。 */
  reachedNodes: number;
  overflowsX: boolean;
}

/** 都市名と凡例の矩形の重なりを数える。凡例が閉じているときは対象がボタンになる。 */
function probeLegend(): LegendProbe {
  const board = document.querySelector("svg.board-svg");
  const legend = document.querySelector("#board-legend");
  const toggle = document.querySelector(".board-legend-toggle");
  const shown = (el: Element | null) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && getComputedStyle(el).display !== "none";
  };
  const hit = (a: DOMRect, b: DOMRect) =>
    a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

  const bb = board!.getBoundingClientRect();
  const legendVisible = shown(legend);
  const toggleVisible = shown(toggle);

  // 見えている「凡例らしきもの」すべて(開いていれば本体、閉じていればボタン)
  const blockers = [legend, toggle].filter((el) => shown(el)).map((el) => el!.getBoundingClientRect());

  const covered: string[] = [];
  for (const label of Array.from(document.querySelectorAll("svg.board-svg text.city-label"))) {
    const r = label.getBoundingClientRect();
    if (r.width === 0 || !hit(r, bb)) continue;
    if (blockers.some((b) => hit(r, b))) covered.push(label.textContent ?? "?");
  }

  // 当たり判定。凡例の器が押しを吸っていないこと(v0.18.1の再発防止)。
  let stolen = 0;
  let reachedNodes = 0;
  const area = blockers[0];
  if (area) {
    for (let x = area.left + 4; x < area.right - 4; x += 12) {
      for (let y = area.top + 4; y < area.bottom - 4; y += 12) {
        const el = document.elementFromPoint(x, y);
        if (!el) continue;
        // ボタンは押せる必要があるので、ボタン自身は「奪っている」に数えない
        if (el.closest(".board-legend-toggle")) continue;
        if (el.closest(".board-legend-wrap")) stolen++;
        else if (el.closest("g[data-node-kind]")) reachedNodes++;
      }
    }
  }

  return {
    covered,
    legendVisible,
    toggleVisible,
    stolen,
    reachedNodes,
    overflowsX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  };
}

/**
 * カメラの追従が止まるまで待つ。
 *
 * **固定時間で待つと取りこぼす。** 動いている最中は都市名の矩形が定まらず、
 * たまたま重なった1件を拾ったり、逆に見落としたりする(実測で1回起きた)。
 * `viewBox` が変わらなくなったら止まったとみなす。
 */
async function waitForCameraSettled(page: Page) {
  let last: string | null = null;
  let stable = 0;
  for (let i = 0; i < 60 && stable < 3; i++) {
    const vb = await page.locator("svg.board-svg").getAttribute("viewBox");
    if (vb !== null && vb === last) stable++;
    else {
      stable = 0;
      last = vb;
    }
    await page.waitForTimeout(100);
  }
}

async function startGame(page: Page, country: string) {
  await page.goto("/");
  await page.locator(".ccard").filter({ hasText: country }).click();
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  await expect(page.locator("#die")).toBeVisible();
  await waitForCameraSettled(page);
}

/**
 * 幅は**実測でいちばん悪かった 768px** と、よくある 1280px。
 * 盤面は左上に陸が来るものを選ぶ(ボリビアと世界一周)。
 */
for (const width of [1280, 768]) {
  for (const country of ["Bolivia", "Around the World"]) {
    test(`${width}px の ${country}: 凡例が都市名を隠さない`, async ({ page }) => {
      await page.setViewportSize({ width, height: 880 });
      await startGame(page, country);

      const follow = await page.evaluate(probeLegend);
      expect(follow.covered, `追従中に隠れた都市名: ${follow.covered.join(", ")}`).toEqual([]);
      expect(follow.overflowsX, "横スクロールが出ている").toBe(false);
      // 凡例そのものが下のマスの押しを吸っていないこと
      expect(follow.stolen, "凡例が当たり判定を奪っている").toBe(0);

      // 全体表示でも隠さない(遠くの地名が隅に来る)
      await page.getByTitle(/Whole map/).click();
      await waitForCameraSettled(page);
      const overview = await page.evaluate(probeLegend);
      expect(overview.covered, `全体表示で隠れた都市名: ${overview.covered.join(", ")}`).toEqual([]);
    });
  }
}

test("狭い画面でも凡例に手が届く(display:none に戻さない)", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 760 });
  await startGame(page, "Bolivia");

  // 説明への入口が必ず見えていること。**これを消したのが過去の失敗。**
  const toggle = page.getByRole("button", { name: /What the squares do/i });
  await expect(toggle).toBeVisible();

  // 押せば中身が読めること
  await toggle.click();
  await expect(page.locator("#board-legend")).toBeVisible();
  await expect(page.locator("#board-legend")).toContainText(/quiz/i);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(
    false,
  );
});

test("広い画面でも凡例に手が届く", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 880 });
  await startGame(page, "Bolivia");

  const toggle = page.getByRole("button", { name: /What the squares do/i });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("#board-legend")).toBeVisible();
});
