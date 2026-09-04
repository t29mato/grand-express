"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useAtlasText } from "./use-atlas-text";
import { AtlasBoard, AtlasCity, MARK_SIZE } from "./atlas-source";

/**
 * 町ひとつの詳細。**地図の上に浮かせる。**
 *
 * 別の画面へ飛ばすと、せっかく寄せた地図をやり直すことになる。
 * 押した町のそばに札が出て、閉じれば地図はそのまま——という形にした。
 * 幅の狭い端末でも同じ札を使う(位置だけCSSで下に寄せる)。
 *
 * 中身は**その町の絵・名前・一言・解説**の4つ。解説(`fact`)は
 * 盤面で町に着いたときに読むものと同じなので、地図帳から読んでも
 * 遊んでから読んでも同じことを知る。
 *
 * 開いたときにここへフォーカスを移す。**押した瞬間にフォーカスが宙に浮くと、
 * 読み上げでは何が起きたのか分からない**(`board-status.tsx` が
 * 候補の消滅で同じ問題に当たっている)。Escapeで閉じられるようにもしておく。
 */
export function AtlasCityDetail({
  city,
  board,
  onClose,
}: {
  city: AtlasCity;
  board: AtlasBoard | null;
  onClose: () => void;
}) {
  const { at, tx } = useAtlasText();
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    cardRef.current?.focus();
  }, [city.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <section
      className="atlas-detail"
      ref={cardRef}
      tabIndex={-1}
      aria-labelledby="atlas-detail-name"
      data-atlas-hit="detail"
    >
      <div className="atlas-detail-head">
        <span className="atlas-detail-mark" aria-hidden="true">
          {city.markSvg ? (
            <svg viewBox={`0 0 ${MARK_SIZE} ${MARK_SIZE}`} width="34" height="34">
              <g dangerouslySetInnerHTML={{ __html: city.markSvg }} />
            </svg>
          ) : (
            <span className="atlas-detail-dot" />
          )}
        </span>
        <div className="atlas-detail-titles">
          <h2 id="atlas-detail-name">{tx(city.name)}</h2>
          <p className="atlas-detail-tag">{tx(city.tag)}</p>
        </div>
        <button type="button" className="atlas-detail-close" onClick={onClose}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">{at("atlasClose")}</span>
        </button>
      </div>

      <p className="atlas-detail-fact">{tx(city.fact)}</p>

      {board && (
        <p className="atlas-detail-foot">
          <span className="atlas-detail-board">{tx(board.name)}</span>
          <Link className="btn ghost atlas-detail-play" href={`/?board=${board.id}`}>
            {at("atlasPlay")}
          </Link>
        </p>
      )}
    </section>
  );
}
