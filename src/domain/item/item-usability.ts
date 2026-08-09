import { GameSession } from "../game-session/game-session";
import { Player } from "../player/player";
import { ItemEffect } from "./item";

/**
 * いまアイテムを使っても効果が出ない理由。
 *
 * **押せるのに何も起きないアイテムがあった。**厄災を背負っていないのに
 * 「チャラの供物」を使うと、持ち物から消えるだけで何も起きない。
 * 出目を選ぶ画面で「閉じるボタンを置かない」と決めたのと同じ理由で、
 * **使って何も起きずアイテムだけ失うのは行き止まり**なので、押せなくする。
 *
 * ただし**灰色にするだけでは「壊れている」に見える。**理由を言うために、
 * 何が足りないのかを型で返す(文言は `hud-messages.ts`)。
 */
export type ItemUseBlocker = "itemNeedsMisfortune" | "itemAlreadyExtraTurn" | "itemNoOneToPassTo";

/**
 * そのアイテムを**いま**使えるか。使えないなら理由を返す。
 *
 * ここで見るのは「局面が効果の前提を満たしているか」だけ。
 * CPUの持ち物かどうか、受け身のアイテムかどうかは呼び出し側(`side-panel.tsx`)の判断。
 */
export function itemUseBlocker(session: GameSession, player: Player, effect: ItemEffect): ItemUseBlocker | null {
  switch (effect.type) {
    case "repel-spirit":
      // 背負っていない厄災は追い払えない。
      if (session.misfortune.level === 0 || session.misfortune.holderId !== player.id) {
        return "itemNeedsMisfortune";
      }
      // 押し付ける相手がいなければ、手放しようがない。
      if (session.players.length < 2) return "itemNoOneToPassTo";
      return null;

    case "extra-turn":
      // すでに1回ぶん持っているときに重ねても増えない(`hasExtraTurn` は真偽値)。
      return player.hasExtraTurn ? "itemAlreadyExtraTurn" : null;

    default:
      return null;
  }
}
