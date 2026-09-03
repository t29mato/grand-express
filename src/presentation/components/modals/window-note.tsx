"use client";

import { useEffect } from "react";
import { WindowNote as WindowNoteData } from "../../../domain/board/window-note";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";

/** 出しておく時間。**読み切れるが、次の手番を待たせない長さ。** */
export const WINDOW_NOTE_MS = 800;

/**
 * 何も起きないマスに止まったときの、**車窓の一言**。
 *
 * ## 出来事ではなく、返事
 *
 * 9手番のうち4回は無印マスで、駒が動いたあとは無音・無反応のまま
 * CPUの手番に切り替わっていた(実プレイの記録 2026-09-02)。
 * 「息をつげる間」は意図して作ったものだが、**返事が無いと、操作が
 * 受理されたのかどうか分からない。**
 *
 * ここに出すのは短い一言だけで、**押すものは無く、手番も止めない。**
 * 0.8秒で自分から消える。汽笛(`playWhistle`)と駒のバウンドが同時に走る。
 *
 * ## 新しい文章を書かない
 *
 * 一言に使うのは、そのマスが結んでいる2つの町の名前と、乗っている地方の名前
 * だけ(`domain/board/window-note.ts`)。どちらも国パックに既にある。
 */
export function WindowNoteCaption({
  context,
  note,
  nonce,
  onDone,
}: {
  context: GameEngineContext;
  note: WindowNoteData;
  /** 同じマスに続けて止まっても出し直すための連番。 */
  nonce: number;
  onDone: () => void;
}) {
  const { t, tx } = useLocale();

  useEffect(() => {
    const timer = setTimeout(onDone, WINDOW_NOTE_MS);
    return () => clearTimeout(timer);
  }, [nonce, onDone]);

  const region = tx(context.content.regions.get(note.regionId));
  const text =
    note.kind === "between"
      ? t("windowBetween", region, tx(context.getCity(note.from).name), tx(context.getCity(note.to).name))
      : t("windowRegion", region);

  return (
    // 読むだけのもの。押す先にはしない(盤面の操作を邪魔しない)。
    <div className="window-note-slot" role="status" aria-live="polite">
      <div key={nonce} className="window-note">
        <span aria-hidden="true">🚂</span> {text}
      </div>
    </div>
  );
}
