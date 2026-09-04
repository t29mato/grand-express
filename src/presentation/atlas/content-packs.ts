import { JsonCountryContentRepository } from "../../infrastructure/content/json-country-content-repository";

/**
 * 盤面のコンテンツを読む入口。**地図帳の中ではこの1つだけを使う。**
 *
 * 町(`atlas-cities.ts`)と海岸線(`atlas-board-land.ts`)は同じJSONの
 * 別の部分である。読み手を別々に持つと、**日本へ寄ったときに同じ185KBを
 * 2回読む**ことになる。`JsonCountryContentRepository` は読み込み済みを
 * 覚えているので、同じ入れ物を分け合えば1回で済む。
 */
export const atlasContentRepository = new JsonCountryContentRepository();
