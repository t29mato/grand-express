import { GameSession, isOver } from "./game-session";

/**
 * 旅の終わりが近いことを、**残りこの月数以下**で判定する。
 *
 * 暦の帯(`hud/calendar-strip.tsx` の `ENDING_THRESHOLD_MONTHS`)が
 * 色を変えるのと**同じ月数**にしてある。色は変わったのに音は変わらない、
 * あるいはその逆になると、遊ぶ人には「何かがおかしい」としか映らない。
 * 2つが同じ値であることは `presentation/state/final-stretch-music.test.ts` が見ている
 * (暦の定数は表示層にあり、domain からは参照できないため、突き合わせはそちら側で行う)。
 */
export const FINAL_STRETCH_MONTHS = 2;

/**
 * いま終盤か。**残りは今月を含めて数える**(暦の帯と同じ数え方)。
 *
 * 旅が終わっていれば false。終わったあとの表彰の裏で、終盤の曲が
 * 鳴り続けているのはおかしいため。
 */
export function isFinalStretch(session: GameSession): boolean {
  if (isOver(session)) return false;
  return Math.max(0, session.maxMonths - session.month) <= FINAL_STRETCH_MONTHS;
}
