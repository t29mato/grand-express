"use client";

/**
 * OS/ブラウザ側の「視差効果を減らす」設定を見る。
 *
 * CSSの `@media (prefers-reduced-motion: reduce)` で止められるのは、**CSSが動かしている
 * ぶんだけ**。サイコロや駒の道のりのように**JS側が時間をかけて進める演出**は、ここを
 * 自分で見て飛ばす必要がある。飛ばさないと、動きは消えたのに待ち時間だけが残り、
 * 「固まった」ように見えてしまう。
 */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

/**
 * 駒が1マス進むごとの間隔(ミリ秒)。
 *
 * サイコロの移動は1〜6マスなので最長 6×90 = 0.54秒、運ばれるアイテムは8〜12マスなので
 * 最長でも約1.1秒。**これ以上遅くすると、毎手番これを見せられることになる。**
 *
 * 駒を滑らせる時間も同じ値を使う(`train-token.tsx`)。既定の0.35秒のままだと、
 * 次のマスへ移る前に滑り切らず、駒が道のりから何マスも遅れてしまう。
 */
export const WALK_STEP_MS = 90;
