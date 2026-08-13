import { Locator, Page, expect } from "@playwright/test";

/**
 * 盤面を選ぶ操作。**画面の幅で選び方が変わり、広い画面では二段になる。**
 *
 * - 広い画面 … 地図。大陸の名札を押してから、国の名札を押す
 * - 狭い画面(640px以下) … 札の一覧。390pxだと地図は324×106pxにしかならず、
 *   名札の字が6pxになって読めないので、そちらは一覧のまま
 *   (`globals.css` の `.world-picker` / `.country-grid`)
 *
 * 押せたことは `aria-pressed` で確かめられる。空振りしたまま
 * 「鳴っていない」と読み違えないため、押した相手を返す。
 */

function isNarrow(page: Page): boolean {
  return (page.viewportSize()?.width ?? 1280) <= 640;
}

/** 選び終わったあとの、その盤面を指す相手(`aria-pressed` を持つ)。 */
export function boardChoice(page: Page, name: string): Locator {
  if (isNarrow(page)) return page.locator(".ccard").filter({ hasText: name });
  // **名前で絞る。**地図の下のボタンは1つではない(地球をまわる/太陽系)。
  // 盤面が増えるたびにここが増えるので、位置ではなく名前で指す。
  if (OFF_MAP.includes(name)) return page.locator(".world-whole-board").filter({ hasText: name });
  return page.locator(".picker-plate").filter({ hasText: name });
}

/**
 * 地図の上に置けない盤面。**名札ではなく地図の下のボタン**になる。
 * 「地球をまわる」は1点で指せないため、太陽系はそもそも地球の上に無いため。
 */
const OFF_MAP = ["Around the World", "The Solar System"];

/**
 * 盤面を選ぶ。広い画面では、その国が入っている大陸を先に開く。
 * **どの大陸かはテスト側に書かせない。**盤面が増えるたびにテストを直すことになる。
 */
export async function pickBoard(page: Page, name: string): Promise<Locator> {
  const target = boardChoice(page, name);
  if (isNarrow(page) || OFF_MAP.includes(name)) {
    await target.click();
    return target;
  }

  // **大陸の一覧は画面から読む。**書き並べると、束を分けたときに直し忘れる
  // (アメリカ大陸を南北に分けたとき、実際に直し忘れてE2Eが7件落ちた)。
  const continents = await page.locator(".picker-plate").allTextContents();
  for (const continent of continents) {
    const chip = page.locator(".picker-plate").filter({ hasText: continent });
    if ((await chip.count()) === 0) continue;
    await chip.click();
    if ((await target.count()) > 0) {
      await target.click();
      // 中に入っている盤面(茨城・バリ)を持つ国は、押しても選ばれずに一段降りる。
      // そのときはもう一度押すと選べる。
      if ((await target.getAttribute("aria-pressed")) !== "true") await target.click();
      await expect(target).toHaveAttribute("aria-pressed", "true");
      return target;
    }
    await page.locator(".picker-back").click();
  }
  throw new Error(`盤面「${name}」が地図のどの大陸にも見つからない`);
}
