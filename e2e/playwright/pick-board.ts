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
const CONTINENTS = ["Asia", "Europe", "Africa", "The Americas", "Oceania"];

function isNarrow(page: Page): boolean {
  return (page.viewportSize()?.width ?? 1280) <= 640;
}

/** 選び終わったあとの、その盤面を指す相手(`aria-pressed` を持つ)。 */
export function boardChoice(page: Page, name: string): Locator {
  if (isNarrow(page)) return page.locator(".ccard").filter({ hasText: name });
  if (name === WHOLE_WORLD) return page.locator(".world-whole-board");
  return page.locator(".picker-plate").filter({ hasText: name });
}

/** 「地球をまわる」だけは地図の下のボタン。1点で指せないため名札にしていない。 */
const WHOLE_WORLD = "Around the World";

/**
 * 盤面を選ぶ。広い画面では、その国が入っている大陸を先に開く。
 * **どの大陸かはテスト側に書かせない。**盤面が増えるたびにテストを直すことになる。
 */
export async function pickBoard(page: Page, name: string): Promise<Locator> {
  const target = boardChoice(page, name);
  if (isNarrow(page) || name === WHOLE_WORLD) {
    await target.click();
    return target;
  }

  for (const continent of CONTINENTS) {
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
