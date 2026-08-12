import { Locator, Page } from "@playwright/test";

/**
 * 盤面を選ぶ操作。**画面の幅で選び方が変わる。**
 *
 * 広い画面は世界地図の印、狭い画面(640px以下)は札の一覧。
 * 携帯の幅だと地図は324×106pxにしかならず、印の間隔が7pxになって
 * 指で押し分けられないので、そちらでは一覧に切り替えている
 * (`globals.css` の `.world-picker` / `.country-grid`)。
 *
 * どちらも押せたことを `aria-pressed` で確かめられる作りにしてあるので、
 * 空振りしたまま「鳴っていない」と読み違えることはない。
 */
export function boardChoice(page: Page, name: string): Locator {
  const width = page.viewportSize()?.width ?? 1280;
  if (width <= 640) return page.locator(".ccard").filter({ hasText: name });
  return page.locator(".world-picker").getByRole("button", { name, exact: true });
}
