"use client";

import { useEffect, useRef, useState } from "react";
import { GameSession } from "../../../domain/game-session/game-session";
import { LogEntry } from "../../state/game-store";
import { useLocale } from "../../i18n/locale-context";
import { renderRichText } from "../../i18n/rich-text";

/** 出しておく時間。読み切れて、次の手番の邪魔にはならない長さ。 */
export const TOAST_MS = 4200;

/**
 * トーストに出す出来事。
 *
 * **ここに無いキーは旅の記録に残るだけで、画面には出さない。**
 * 出すのは「**何が起きたか**」だけ。
 *
 * **金額の増減は出さない。** 所持金の変化は旅人一覧の `MoneyTicker` が
 * 数字と `+Bs 221` のチップで見せている。同じことをトーストでも言うと、
 * 1回の出来事で画面の2か所が同時に喋ることになって煩い。
 * (四半期収入もこの理由で外した。金額はあちらが見せる。)
 *
 * クイズ・青赤マス・町・季節・ゲーム終了はモーダルが出るので入れていない。
 * 町での買い物も、自分で「買う」を押した直後にその町のモーダルの上へ
 * 「買いました」と出るだけなので入れていない。
 * サイコロの目や「CPUが町を素通りした」も、毎手番出ると読むものが増えるだけ。
 */
const TOAST_KEYS: ReadonlySet<string> = new Set([
  // 手番が飛ぶ/増える。次に何が起きるかが変わる。
  "stuck",
  "extraTurn",
  // 厄災の神が誰に移ったか。押し付けられた側は知らないと備えられない。
  "passLog",
  "spiritBlockedLog",
  // 「はじめて」の人の最初の1年、連続を止めて災難を見送ったこと(`doom-relief.ts`)。
  // **黙って見送らない。**何も出さないと「厄災は運で起きたり起きなかったりする」
  // としか見えず、救済が働いていることが伝わらない。
  "spiritSparedLog",
  // アイテムで流された先。自分で選んでいないので、どこに着いたか分からない。
  "carriedLog",
  "carriedToLog",
]);

/**
 * その1行が人間のプレイヤーに関わるものか。
 *
 * ログの引数にはプレイヤー名が入っているので、CPUでない名前が含まれていれば
 * 「自分たちに起きたこと」とみなす。**CPUの手番のことは出さない。**
 * CPUが3人いると手番ごとにトーストが出て、見ているだけの時間が
 * 読まされる時間になってしまう。
 */
function concernsHuman(entry: LogEntry, session: GameSession): boolean {
  const humanNames = session.players.filter((p) => !p.isCpu).map((p) => p.name);
  return entry.args.some((arg) => typeof arg === "string" && humanNames.includes(arg));
}

/** この1行を画面に出すか。 */
export function isToastworthy(entry: LogEntry, session: GameSession): boolean {
  if (entry.tone === "neutral") return false;
  if (!TOAST_KEYS.has(entry.key)) return false;
  return concernsHuman(entry, session);
}

/**
 * 直近の出来事を画面の上に一瞬だけ出す。
 *
 * 旅の記録(`TravelLog`)はサイドバーのいちばん下にあり、遊んでいる最中は
 * 目に入らない。かといって全部を画面に出すと、盤面より文字を読む時間のほうが
 * 長くなる。**モーダルも `MoneyTicker` も説明してくれない出来事のうち、
 * 自分に関わるものだけ**を出す(金額の増減は `MoneyTicker` の担当)。
 *
 * モーダルより手前に出す。運ばれた先の町のモーダルは、なぜそこに居るのかを
 * 教えてくれない。後ろに置くと、こういう行はほぼ毎回隠れて出ないままになる。
 *
 * 動きは入りの一瞬だけ。`prefers-reduced-motion` では全体CSSで
 * `animation: none` になるが、**既定の見た目が「見えている状態」**なので
 * 動きを消しても読める(透明から始めると、動きを止めたとき出てこなくなる)。
 */
export function LogToast({ log, session }: { log: readonly LogEntry[]; session: GameSession }) {
  const { t, tx } = useLocale();
  // 新しく足した記録の文言も引けるようにする(`misfortune-messages.ts`)。
  const [visible, setVisible] = useState<LogEntry | null>(null);
  // 一度出したか見送ったかを覚えておく。これが無いと、モーダルを閉じた拍子や
  // 言語を切り替えた拍子に、同じ行がもう一度出てくる。
  const handledIdRef = useRef<number | null>(null);

  const newest = log[0] ?? null;

  useEffect(() => {
    if (!newest || newest.id === handledIdRef.current) return;
    const lastHandled = handledIdRef.current;
    handledIdRef.current = newest.id;
    // **1回の操作で何行も増える。** アイテムで運ばれると「使った」「運ばれた」
    // 「着いた先で起きたこと」が一度に積まれ、Reactはそれをまとめて1回描く。
    // 先頭の1行だけを見ていると、出したい行が後の行に埋もれて出てこない。
    // 前に見た行より後に増えたぶんから、出す価値のある最新の1行を選ぶ。
    const fresh = lastHandled === null ? [newest] : log.filter((entry) => entry.id > lastHandled);
    setVisible(fresh.find((entry) => isToastworthy(entry, session)) ?? null);
  }, [newest, log, session]);

  // 消すのは別の効果にしておく。表示を決める側と混ぜると、
  // 上の効果が再実行されるたびにタイマーが解除されて消えなくなる。
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(null), TOAST_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  const resolve = (arg: LogEntry["args"][number]) => (typeof arg === "object" ? tx(arg) : arg);
  return (
    // 読むだけのもの。押す先にはしない(`pointer-events: none` で盤面の操作を邪魔しない)。
    // 読み上げにも流れるよう role="status" を付ける。
    <div className="log-toast-slot" role="status" aria-live="polite">
      <div className={`log-toast ${visible.tone}`}>
        {renderRichText(t(visible.key, ...visible.args.map(resolve)))}
      </div>
    </div>
  );
}
