import { COUNTRY_INDEX } from "./country-index";

/**
 * いま遊べる盤面のID。**焼き上がった目録から引く。**
 *
 * かつては同じ配列
 * (`["bolivia", "japan", "india", "france", "world", "ibaraki"]`)が
 * 検査スクリプトとテストに**6箇所そのまま書かれていた。**盤面を1枚足すたびに
 * 6箇所を直す必要があり、直し忘れても**テストは緑のまま通る**
 * (増えた盤面を誰も見に行かないだけなので)。
 * 13枚足すと78回の書き換えになり、抜けが出ないほうがおかしい。
 *
 * ここを通せば、盤面を焼いた時点で全部の検査が新しい盤面を見に行く。
 */
export const ALL_COUNTRY_IDS: readonly string[] = COUNTRY_INDEX.map((entry) => entry.id);
