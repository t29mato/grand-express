/**
 * legacy由来の国(日本・ボリビア)の都市背景の上書き — まとめ役。
 *
 * `applyContentOverrides` から見る入口をここ1つにしておくと、背景を足すたびに
 * 共有ファイルの `index.mjs` を触らずに済む(並行作業でぶつかるのを避けるため)。
 * **背景を足すときは、この2つの辞書に足すだけでよい。**
 *
 * 中身は2種類ある。
 *
 * - `city-bg-gap-fixes.mjs` — 塗り残しを埋めただけ。絵は legacy のまま
 * - `japan-city-bg.mjs`     — 描き直したもの(層・人・時間を足して密度を上げた)
 *
 * 同じキーが両方にあるときは**描き直したほうが勝つ**(後ろに置いてある)。
 */
import { JAPAN_CITY_BG as JAPAN_GAP_FIXES, BOLIVIA_CITY_BG as BOLIVIA_GAP_FIXES } from "./city-bg-gap-fixes.mjs";
import { JAPAN_RICH_BG } from "./japan-city-bg.mjs";
import { BOLIVIA_RICH_BG } from "./bolivia-city-bg.mjs";

export const CITY_BG = {
  japan: { ...JAPAN_GAP_FIXES, ...JAPAN_RICH_BG },
  bolivia: { ...BOLIVIA_GAP_FIXES, ...BOLIVIA_RICH_BG },
};
