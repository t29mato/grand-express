"use client";

import { useEffect, useRef, useState } from "react";
import { NodeId } from "../../../domain/shared-kernel/ids";
import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { atLabel, movedToLabel, whoAtLabel } from "../board/candidate-guide";
import { playerColor } from "../player-colors";

/**
 * いま手番の人がどこに居るかの一文と、移動したことを読み上げに伝える通知。
 *
 * **サイコロを振る前、盤面には押せるものが1つも無い。**行き先の候補が
 * 出ていないときの盤面は、決める対象ではなく状況の絵なので、
 * 200個のマスを読み上げで辿れるようにはしていない(辿れても地図の形が
 * 分かるだけで、判断の材料にはならない)。
 * 代わりに、判断に要ることだけをここで言葉にする——**いまどこに居て、
 * 目的地まであと何マスか。**目で地図を読める人にも役に立つので、
 * 隠さずに出している。
 *
 * ## 誰の話かを、文の外に出す
 *
 * この枠は**CPUの手番でも同じ形で出る。**もとは「You are at Potosí.」と
 * 二人称で書いていたので、CPUの位置を自分の位置として読めてしまった
 * (ユーザーからの指摘)。いまは
 *
 *   [● タロウ] — いまいるのはポトシ。スクレまで残り3マス。
 *
 * のように、**色の丸と名前を先に置いて**、文そのものからは人を外している
 * (旅の記録の「名前 — 出来事」と同じ形)。
 * 色は駒・旅人一覧と同じ並び(`player-colors.ts`)。
 * **色だけに頼らない**——名前を必ず添えるので、色が見分けにくくても誰か分かる。
 *
 * 移動した先は `aria-live` で伝える。候補のまとまりは選んだ瞬間に消えて
 * フォーカスが宙に浮くため、そのままでは何が起きたのか分からない。
 * こちらも誰が動いたのかを名前から言う。
 *
 * 候補が**出た**ときはここでは何も言わない。盤面側が先頭の候補へ
 * フォーカスを移し、グループ名と候補が読まれる。両方やると二重に喋る。
 */
export function BoardStatus({ context, session }: { context: GameEngineContext; session: GameSession }) {
  const { t, tx } = useLocale();
  const player = currentPlayer(session);
  const color = playerColor(session.activePlayerIndex);
  const deps = { context, session, t, tx };
  const where = atLabel(deps, player.location);

  // 移動したことの通知。場所が変わったときだけ入れ替える。
  const [moved, setMoved] = useState<string | null>(null);
  const previousLocation = useRef<NodeId | null>(null);
  useEffect(() => {
    const before = previousLocation.current;
    previousLocation.current = player.location;
    // 初回(旅の開始時)は「移動しました」ではないので黙っている。
    if (before === null || before === player.location) return;
    setMoved(whoAtLabel({ context, session, t, tx }, player.name, movedToLabel({ context, session, t, tx }, player.location)));
  }, [player.location, player.name, context, session, t, tx]);

  return (
    <div className="card board-status">
      <p className="board-status-line">
        {/* 誰の話か。丸は駒と同じ色、その隣に名前。
            CSSは `globals.css` に足さず、ここで直に指定している——この帯のためだけの
            見た目で、いま複数人が同じ `globals.css` を触っているため。 */}
        <span
          className="board-status-who"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginRight: 8,
            padding: "1px 9px 1px 7px",
            borderRadius: 999,
            border: `1px solid ${color}`,
            background: `${color}22`,
            color: "var(--salt)",
            fontWeight: 800,
            verticalAlign: "baseline",
          }}
        >
          <span className="pdot" style={{ display: "inline-block", background: color }} />
          {player.name}
          {player.isCpu && <span className="cpu-tag">CPU</span>}
        </span>
        {/* 読み上げのための区切り。目で見る人には札の枠と余白で足りているが、
            文字だけを続けて読むと「YouAt La Paz」と地続きになる
            (札と本文のあいだに空白の文字が1つも無いため)。
            旅の記録と同じ「名前 — 出来事」の区切りをここに置く。 */}
        <span className="sr-only"> — </span>
        {where}
      </p>
      {/* 読み上げ専用。目で見る人には上の一文と盤面で足りている。 */}
      <p className="sr-only" role="status" aria-live="polite">
        {moved}
      </p>
    </div>
  );
}
