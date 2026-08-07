"use client";

import { useEffect, useRef, useState } from "react";
import { NodeId } from "../../../domain/shared-kernel/ids";
import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { movedToLabel, whereYouAreLabel } from "../board/candidate-guide";

/**
 * いま自分がどこに居るかの一文と、移動したことを読み上げに伝える通知。
 *
 * **サイコロを振る前、盤面には押せるものが1つも無い。**行き先の候補が
 * 出ていないときの盤面は、決める対象ではなく状況の絵なので、
 * 200個のマスを読み上げで辿れるようにはしていない(辿れても地図の形が
 * 分かるだけで、判断の材料にはならない)。
 * 代わりに、判断に要ることだけをここで言葉にする——**いまどこに居て、
 * 目的地まであと何マスか。**目で地図を読める人にも役に立つので、
 * 隠さずに出している。
 *
 * 移動した先は `aria-live` で伝える。候補のまとまりは選んだ瞬間に消えて
 * フォーカスが宙に浮くため、そのままでは何が起きたのか分からない。
 *
 * 候補が**出た**ときはここでは何も言わない。盤面側が先頭の候補へ
 * フォーカスを移し、グループ名と候補が読まれる。両方やると二重に喋る。
 */
export function BoardStatus({ context, session }: { context: GameEngineContext; session: GameSession }) {
  const { t, tx } = useLocale();
  const player = currentPlayer(session);
  const summary = whereYouAreLabel({ context, session, t, tx }, player.location);

  // 移動したことの通知。場所が変わったときだけ入れ替える。
  const [moved, setMoved] = useState<string | null>(null);
  const previousLocation = useRef<NodeId | null>(null);
  useEffect(() => {
    const before = previousLocation.current;
    previousLocation.current = player.location;
    // 初回(旅の開始時)は「移動しました」ではないので黙っている。
    if (before === null || before === player.location) return;
    setMoved(movedToLabel({ context, session, t, tx }, player.location));
  }, [player.location, context, session, t, tx]);

  return (
    <div className="card board-status">
      <p className="board-status-line">{summary}</p>
      {/* 読み上げ専用。目で見る人には上の一文と盤面で足りている。 */}
      <p className="sr-only" role="status" aria-live="polite">
        {moved}
      </p>
    </div>
  );
}
