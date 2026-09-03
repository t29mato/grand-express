import { GameSession } from "../../domain/game-session/game-session";
import { isFinalStretch } from "../../domain/game-session/final-stretch";
import { soundAdapter } from "./game-store-dependencies";

/**
 * いま鳴っている曲を、終盤(残り2ヶ月)かどうかに合わせる。
 *
 * **月が変わりうるところから毎回呼んでよい。**同じ値なら音のほうが何もしない。
 *
 * **ここで前回の値を覚えてはいけない。**`setCountry()`(旅の開始・再開)は
 * 音のほうの終盤フラグを false に戻すので、呼ぶ側が「前回も true だった」と
 * 覚えていると、**残り2ヶ月のセーブを再開したときに曲が戻らない。**
 *
 * 呼ぶ場所:
 * - 旅の開始・再開(途中から始めるとき、もう終盤かもしれない)
 * - 人間の手番の後始末(`finishHumanLandingAndAdvance`)
 * - CPUループの手番送り
 */
export function updateFinalStretchMusic(session: GameSession | null): void {
  soundAdapter.setFinalStretch(session ? isFinalStretch(session) : false);
}
