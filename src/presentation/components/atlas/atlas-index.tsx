"use client";

import type { CityId, CountryId } from "../../../domain/shared-kernel/ids";
import { useAtlasText } from "./use-atlas-text";
import { AtlasBoard, AtlasCity, isOffMapBoard, isWideBoard } from "./atlas-source";

/**
 * 地図の隣に置く盤面の一覧。**目で地図を読まない人のための、同じ地図。**
 *
 * 地図そのものは1枚の絵(`role="img"`)にしてあるので、キーボードと読み上げは
 * ここを通る。押せば地図がそこへ飛び、開いた盤面の中の町がそのまま下にぶら下がる。
 * つまり
 *
 *   盤面の一覧 → 盤面ひとつ → その盤面の町 → 町の詳細
 *
 * という道が、マウスを使わずに最後まで通る。**「盤面の一覧」と「町の詳細」に
 * 辿り着けること**がこの部品の役目である。
 *
 * ## 3つに分ける
 *
 * - **盤面** … 国と、その中の県・島(39枚)。地図で塗られているのはこれ。
 * - **広い範囲をまとめて遊ぶ盤面** … 世界一周と大陸6枚。
 *   地図の塗り分けには使わない(使うと地球ぜんぶが「あり」になる)ので、
 *   一覧でも別の見出しにして、性質が違うことを言葉で示す。
 * - **地図の外** … 太陽系。地図に置きようがない。
 *
 * ## 町は寄ったときだけ
 *
 * 2,218件を最初に読むと重すぎるので、盤面を開いたときに読む。
 * 読んでいる間は骨組み(灰色の棒)を出す。**空のまま黙って待たない。**
 */
export function AtlasIndex({
  boards,
  openBoardId,
  cities,
  citiesLoading,
  selectedCityId,
  onOpenBoard,
  onPickCity,
}: {
  boards: readonly AtlasBoard[];
  /** いま開いている盤面。その中の町を並べる。 */
  openBoardId: CountryId | null;
  cities: readonly AtlasCity[];
  citiesLoading: boolean;
  selectedCityId: CityId | null;
  onOpenBoard: (board: AtlasBoard) => void;
  onPickCity: (city: AtlasCity) => void;
}) {
  const { at, tx } = useAtlasText();

  const named = (board: AtlasBoard) => tx(board.name);
  const sorted = (list: readonly AtlasBoard[]) =>
    [...list].sort((a, b) => named(a).localeCompare(named(b)));

  const plain = sorted(boards.filter((board) => !isWideBoard(board) && !isOffMapBoard(board)));
  const wide = sorted(boards.filter(isWideBoard));
  const offMap = sorted(boards.filter(isOffMapBoard));

  const countLabel = (board: AtlasBoard) =>
    board.cityCount === 1 ? at("atlasCityCountOne") : at("atlasCityCount", board.cityCount);

  const group = (title: string, list: readonly AtlasBoard[]) =>
    list.length === 0 ? null : (
      <section className="atlas-index-group" key={title}>
        <h3 className="atlas-index-heading">{title}</h3>
        <ul className="atlas-index-list">
          {list.map((board) => {
            const open = board.id === openBoardId;
            return (
              <li key={board.id}>
                <button
                  type="button"
                  className={`atlas-index-item${open ? " open" : ""}`}
                  aria-expanded={open}
                  onClick={() => onOpenBoard(board)}
                >
                  <span className="atlas-index-name">{named(board)}</span>
                  <span className="atlas-index-count">{countLabel(board)}</span>
                </button>
                {open && (
                  <div className="atlas-index-cities">
                    {citiesLoading ? (
                      <ul className="atlas-index-skeleton" aria-hidden="true">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <li key={i} style={{ width: `${86 - i * 9}%` }} />
                        ))}
                      </ul>
                    ) : cities.length === 0 ? (
                      <p className="atlas-index-empty">{at("atlasCitiesEmpty")}</p>
                    ) : (
                      <ul className="atlas-index-city-list">
                        {cities.map((city) => (
                          <li key={city.id}>
                            <button
                              type="button"
                              className={`atlas-index-city${city.id === selectedCityId ? " on" : ""}`}
                              onClick={() => onPickCity(city)}
                            >
                              {tx(city.name)}
                              <span className="atlas-index-city-tag">{tx(city.tag)}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="atlas-index-loading" role="status">
                      {citiesLoading ? at("atlasCitiesLoading") : ""}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    );

  return (
    <nav className="atlas-index" aria-label={at("atlasIndexTitle")}>
      {group(at("atlasIndexTitle"), plain)}
      {group(at("atlasIndexWide"), wide)}
      {group(at("atlasIndexOffEarth"), offMap)}
    </nav>
  );
}
