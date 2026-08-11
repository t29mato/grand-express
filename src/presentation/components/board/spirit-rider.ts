import { PlayerId } from "../../../domain/shared-kernel/ids";
import { MisfortuneSpiritState } from "../../../domain/misfortune/misfortune-spirit";

/**
 * 厄災の神を**盤面で背負って見せる駒**を返す。憑いていなければ `null`。
 *
 * `holderId` だけでは足りない。level 0 は「まだ現れていない」を表す状態で、
 * ここが 0 のあいだは盤面に出してはいけない
 * (`misfortune-spirit.ts` の `MisfortuneLevel` を参照)。
 *
 * 現行の遷移では level が 0 に戻る経路は無く、level 0 のとき holderId は
 * 必ず null なので、いまは level を見なくても結果は同じ。それでも見ているのは、
 * **旅人一覧の 👹 が同じ条件で出ているから**(`side-panel.tsx`)。
 * 片方だけが条件を変えると、一覧には居るのに盤面には居ない、が起きる。
 */
export function hauntedPlayerId(misfortune: MisfortuneSpiritState): PlayerId | null {
  return misfortune.level > 0 ? misfortune.holderId : null;
}
