"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CountryId } from "../../../domain/shared-kernel/ids";
import { useAtlasText } from "./use-atlas-text";
import { LocaleSwitch } from "../hud/locale-switch";
import { liveAtlasSource } from "./atlas-live-source";
import { AtlasCityDetail } from "./atlas-city-detail";
import { AtlasIndex } from "./atlas-index";
import { AtlasMap } from "./atlas-map";
import {
  AtlasView,
  bandOf,
  boundsCentre,
  minSpanForBoard,
  spanForBounds,
  viewBounds,
} from "./atlas-projection";
import {
  AtlasBoard,
  AtlasBoardLand,
  AtlasCity,
  AtlasSource,
  isOffMapBoard,
  isWideBoard,
} from "./atlas-source";
import { STEP_FACTOR, useAtlasCamera } from "./use-atlas-camera";

/**
 * 地図帳(`/atlas`)。**Googleマップのような1枚の世界地図。**
 *
 * 開始画面の地図(`setup-screen.tsx` の `WorldPicker`)とは別物である。
 * あちらは「盤面を選ぶ」ための道具なので、世界→大陸→国と**段を降りる**。
 * こちらは**眺めるための地図**なので段が無く、どこまでも連続して寄り引きする。
 * 開始画面はそのまま残してある。
 *
 * ## 画面の組み立て
 *
 * - 左: 地図。ドラッグ・ホイール・ピンチ・ダブルタップ。
 * - 右: 盤面の一覧。**キーボードと読み上げはここを通る。**
 * - 押した町の詳細。広い画面では地図の上に浮かせ、狭い画面では地図の下に置く。
 *
 * ## 狭い端末では、縦に積む
 *
 * はじめ「地図」「一覧」を切り替えるボタンを置いたが、375pxで撮ったら
 * **地図が縦に長すぎて、世界ぜんぶを映すと上下が海だけの帯になった**
 * (見えている緯度が644度。中身は144度ぶんしか無い)。
 * 地図の高さを 3:2 に決め打ちして上に置き、残りを一覧に渡すと、
 * 世界が枠の6割を占める形に収まり、**切り替えボタンも要らなくなった。**
 * 一覧が最初から見えているぶん、盤面へ辿り着く道も短い。
 */
export function AtlasScreen({ source = liveAtlasSource }: { source?: AtlasSource }) {
  const { at, tx } = useAtlasText();
  const camera = useAtlasCamera();
  const boards = useMemo(() => source.atlasBoards(), [source]);
  const { view, aspect } = camera;
  const band = bandOf(view.span);

  const [pickedBoardId, setPickedBoardId] = useState<CountryId | null>(null);
  const [selectedCity, setSelectedCity] = useState<AtlasCity | null>(null);

  /**
   * 寄ったら、真ん中にある盤面を勝手に開く。
   * **町は寄ったときだけ読む**ので、開く盤面が決まらないと町が出ない。
   * 広い盤面(世界一周・大陸)は開かない——2,000件を読むことになるうえ、
   * その縮尺では点が団子になるだけで何も分からない。
   *
   * 見ているのは**手が止まってからの眺め**(`useSettledView`)である。
   * 動かしている最中の値で決めると、飛んでいく途中に通りかかった盤面の
   * 町まで次々に読みに行く。
   *
   * 一覧から選んだ盤面は、**そこから離れるまで**優先する。離れたら
   * 真ん中にあるものへ譲る(日本を開いたまま中国へ流したのに、
   * 一覧が「日本」のままなのはおかしい)。
   */
  const settled = useSettledView(view);
  /** いま真ん中の真下にある、**いちばん狭い盤面。**開く盤面が決まっていないときの拠り所。 */
  const groundBoard = useMemo(() => {
    const here = source.boardsAt(settled.lon, settled.lat);
    const settledBand = bandOf(settled.span);
    if (settledBand !== "country" && settledBand !== "town") return null;
    return here.find((board) => !isWideBoard(board)) ?? null;
  }, [source, settled]);

  const openBoardId = useMemo(() => {
    const here = source.boardsAt(settled.lon, settled.lat);
    if (pickedBoardId !== null && here.some((board) => board.id === pickedBoardId)) {
      return pickedBoardId;
    }
    return groundBoard?.id ?? pickedBoardId;
  }, [source, settled, pickedBoardId, groundBoard]);

  const { cities, loading } = useAtlasCities(source, openBoardId);
  const boardById = useMemo(() => new Map(boards.map((board) => [board.id, board])), [boards]);
  const openBoard = openBoardId ? (boardById.get(openBoardId) ?? null) : null;

  /**
   * 地図の下敷きにする海岸線。**町と同じ盤面から取る。**
   *
   * 「真下にあるいちばん狭い盤面」にすると、本州の真ん中では
   * *日本百名山*(日本ぜんぶに広がる盤面)が勝つ。あちらの海岸線は152点で
   * 川を1本も持たず、日本の盤面(260点・川5本)より粗い。**地図に出ている町は
   * 日本のものなのに、地面だけ別の盤面から来ている**ことになる。
   * 開いている盤面から取れば、地面と町がいつも同じ盤面のものになり、
   * 読みに行くコンテンツも1つで済む。
   *
   * 広い盤面(大陸・世界一周)からは取らない。あちらの輪郭は世界地図と
   * 同じ粗さなので、敷き替えても何も増えない。**地球の上に無い盤面
   * (太陽系)からも取らない。**あの盤面の「陸」は惑星の絵であって、
   * 経度緯度の地形ではない——地図に敷いたら意味を持たない形が現れる。
   */
  const landBoard =
    openBoard && !isWideBoard(openBoard) && !isOffMapBoard(openBoard) ? openBoard : null;
  const boardLand = useBoardLand(source, landBoard?.id ?? null);

  /**
   * **寄りの限界は、いま真下にある盤面の細かさで決まる。**
   * 何も無いところ(大洋・まだ盤面の無い陸)では早めに止める。
   * 手が止まるのを待たずに、動かしている最中の眺めで決める——
   * 待つと、寄っている途中で一度止まってから続きが動く形になる。
   */
  const { setMinSpan } = camera;
  const liveBoard = useMemo(
    () => source.boardsAt(view.lon, view.lat).find((board) => !isWideBoard(board)) ?? null,
    [source, view.lon, view.lat],
  );
  useEffect(() => {
    setMinSpan(minSpanForBoard(liveBoard));
  }, [setMinSpan, liveBoard]);

  const flyToBoard = useCallback(
    (board: AtlasBoard) => {
      setPickedBoardId(board.id);
      setSelectedCity(null);
      if (board.offEarth) return;
      const centre = boundsCentre(board.bounds);
      camera.flyTo(centre.lon, centre.lat, spanForBounds(board.bounds, aspect));
    },
    [camera, aspect],
  );

  const pickCity = useCallback(
    (city: AtlasCity) => {
      setSelectedCity(city);
      setPickedBoardId(city.boardId);
      // 町を押したら、名前が読める高さまで寄る。すでに寄っていれば動かさない。
      camera.flyTo(city.lon, city.lat, Math.min(camera.view.span, 2.4));
    },
    [camera],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = camera.view.span * 0.22;
    switch (event.key) {
      case "ArrowLeft":
        camera.flyTo(camera.view.lon - step, camera.view.lat, camera.view.span, 0);
        break;
      case "ArrowRight":
        camera.flyTo(camera.view.lon + step, camera.view.lat, camera.view.span, 0);
        break;
      case "ArrowUp":
        camera.flyTo(camera.view.lon, camera.view.lat + step, camera.view.span, 0);
        break;
      case "ArrowDown":
        camera.flyTo(camera.view.lon, camera.view.lat - step, camera.view.span, 0);
        break;
      case "+":
      case "=":
        camera.zoomAt(1 / STEP_FACTOR, 0.5, 0.5);
        break;
      case "-":
      case "_":
        camera.zoomAt(STEP_FACTOR, 0.5, 0.5);
        break;
      case "0":
        camera.reset();
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const spoken = useSpokenView({ source, camera, cities, band });

  return (
    <div className="atlas-screen">
      <header className="atlas-head">
        <Link href="/" className="btn ghost atlas-back">
          {at("backToGame")}
        </Link>
        <div className="atlas-titles">
          <h1>{at("atlasTitle")}</h1>
          <p className="atlas-lead">{at("atlasLead")}</p>
        </div>
        <LocaleSwitch />
      </header>

      <div className="atlas-stage">
        <div
          className="atlas-map-holder"
          role="group"
          tabIndex={0}
          aria-label={at("atlasKeyHint")}
          onKeyDown={onKeyDown}
        >
          <AtlasMap
            source={source}
            camera={camera}
            cities={cities}
            citiesLoading={loading}
            boardLand={boardLand}
            boardLandBounds={landBoard?.bounds ?? null}
            selectedBoardId={openBoardId}
            selectedCityId={selectedCity?.id ?? null}
            onPickBoard={flyToBoard}
            onPickCity={pickCity}
          />

          <div className="atlas-controls">
            <button type="button" onClick={() => camera.zoomAt(1 / STEP_FACTOR, 0.5, 0.5)}>
              <span aria-hidden="true">+</span>
              <span className="sr-only">{at("atlasZoomIn")}</span>
            </button>
            <button type="button" onClick={() => camera.zoomAt(STEP_FACTOR, 0.5, 0.5)}>
              <span aria-hidden="true">−</span>
              <span className="sr-only">{at("atlasZoomOut")}</span>
            </button>
            <button type="button" className="wide" onClick={() => camera.reset()}>
              {at("atlasZoomWorld")}
            </button>
          </div>

          {/* 塗り分けの読みかた。**世界の眺めでいちばん見せたいのはこの対比**
              ——遊べる範囲と、まだ盤面が無い陸。 */}
          {/* 斜線を出している段(世界・地域)でだけ。寄ってから残ると、
              地図に無いものの説明が居座ることになる。 */}
          <ul
            className="atlas-legend"
            aria-hidden={band !== "world" && band !== "region"}
            hidden={band !== "world" && band !== "region"}
          >
            <li>
              <span className="swatch covered" />
              {at("atlasLegendCovered")}
            </li>
            <li>
              <span className="swatch gap" />
              {at("atlasLegendGap")}
            </li>
          </ul>

          <p className="atlas-hint">{at("atlasHint")}</p>
        </div>

        {/* 町の札。広い画面では地図に重ね、狭い画面では地図の下へ回す(CSS)。
            置き場所は1つだけにしてある——2か所に描くと、開いた札が
            読み上げに2回出る。 */}
        {selectedCity && (
          <AtlasCityDetail
            city={selectedCity}
            board={boardById.get(selectedCity.boardId) ?? null}
            onClose={() => setSelectedCity(null)}
          />
        )}

        <aside className="atlas-panel">
          {openBoard && (
            <p className="atlas-panel-open">
              <span className="atlas-panel-open-name">{tx(openBoard.name)}</span>
              {/* 太陽系は地図に置けないだけで、**遊べる盤面である。**
                  地図に出ないことと遊べないことを取り違えない。 */}
              <Link className="btn ghost" href={`/?board=${openBoard.id}`}>
                {at("atlasPlay")}
              </Link>
            </p>
          )}
          <AtlasIndex
            boards={boards}
            openBoardId={openBoardId}
            cities={cities}
            citiesLoading={loading}
            selectedCityId={selectedCity?.id ?? null}
            /*
              狭い画面でも**一覧に留まる。**盤面を開くとその下に町が出るので、
              ここで地図へ切り替えると「盤面 → 町 → 詳細」の道が
              1歩目で切れてしまう(キーボードと読み上げはこの道しか通れない)。
              地図は「地図」ボタンでいつでも見られる。
            */
            onOpenBoard={flyToBoard}
            onPickCity={pickCity}
          />
        </aside>
      </div>

      {/* いま何が見えているかを言葉で。地図は目で見るものなので、
          見ない人には**この一文が地図そのもの**になる。 */}
      <p className="sr-only" role="status" aria-live="polite">
        {spoken}
      </p>
    </div>
  );
}

/**
 * 盤面ひとつぶんの町を読む。**同じ盤面は2度読まない**(データ層側でも
 * 覚えているが、こちらでも持っておくと開き直しで骨組みが出ない)。
 *
 * 読んでいる途中に別の盤面へ移ったときは、**遅れて着いた結果を捨てる。**
 * 捨てないと、日本へ寄ってからフランスへ移った直後にフランスの地図へ
 * 日本の町が降ってくる。
 */
function useAtlasCities(
  source: AtlasSource,
  boardId: CountryId | null,
): { cities: readonly AtlasCity[]; loading: boolean } {
  const [cache, setCache] = useState<ReadonlyMap<CountryId, readonly AtlasCity[]>>(new Map());

  useEffect(() => {
    if (boardId === null || cache.has(boardId)) return;
    let alive = true;
    const remember = (cities: readonly AtlasCity[]) => {
      if (!alive) return;
      setCache((before) => new Map(before).set(boardId, cities));
    };
    source
      .loadAtlasCities(boardId)
      // 読めない盤面があっても地図は使える。空として覚え、繰り返し取りに行かない。
      .then(remember, () => remember([]));
    return () => {
      alive = false;
    };
  }, [source, boardId, cache]);

  // **読み込み中かどうかは覚えておかなくてよい。**覚えの中に無ければ読んでいる。
  // 別に状態を持つと、着いた順と設定した順が食い違って
  // 「読み終わったのにくるくるが残る」が起きる。
  const cities = boardId === null ? EMPTY_CITIES : (cache.get(boardId) ?? EMPTY_CITIES);
  return { cities, loading: boardId !== null && !cache.has(boardId) };
}

const EMPTY_CITIES: readonly AtlasCity[] = [];

/**
 * 盤面ひとつぶんの海岸線を読む。町(`useAtlasCities`)と同じ作り——
 * **寄ったときだけ、同じ盤面は2度読まない。**
 *
 * 町と別々に読んでいるように見えるが、読み先は同じコンテンツで、
 * データ層(`content-packs.ts`)が1つの入れ物を分け合っているので、
 * 同じ盤面へ寄っても取りに行くのは1回きり。
 *
 * 読めなかった盤面は `null` として覚える。**地図は粗い輪郭のまま使える**ので、
 * ここで止まる理由は無い。
 */
function useBoardLand(source: AtlasSource, boardId: CountryId | null): AtlasBoardLand | null {
  const [cache, setCache] = useState<ReadonlyMap<CountryId, AtlasBoardLand | null>>(new Map());

  useEffect(() => {
    if (boardId === null || cache.has(boardId)) return;
    let alive = true;
    const remember = (land: AtlasBoardLand | null) => {
      if (!alive) return;
      setCache((before) => new Map(before).set(boardId, land));
    };
    source.loadBoardLand(boardId).then(remember, () => remember(null));
    return () => {
      alive = false;
    };
  }, [source, boardId, cache]);

  return boardId === null ? null : (cache.get(boardId) ?? null);
}

/**
 * **手が止まってからの眺め。**動かしている最中の値で重い判断をしない。
 *
 * ドラッグ中は毎フレーム `view` が変わる。そのたびに「真ん中にある盤面」を
 * 決めて町を読みに行くと、通りかかった盤面のぶんだけ読み込みが走る。
 */
function useSettledView(view: AtlasView, ms = 260): AtlasView {
  const [settled, setSettled] = useState(view);
  useEffect(() => {
    const timer = setTimeout(() => setSettled(view), ms);
    return () => clearTimeout(timer);
  }, [view, ms]);
  return settled;
}

/**
 * 読み上げ用の一文。**動かすたびに喋ると使いものにならない**ので、
 * 手が止まってから作る。
 */
function useSpokenView({
  source,
  camera,
  cities,
  band,
}: {
  source: AtlasSource;
  camera: ReturnType<typeof useAtlasCamera>;
  cities: readonly AtlasCity[];
  band: ReturnType<typeof bandOf>;
}): string {
  const { at, tx } = useAtlasText();
  const [text, setText] = useState("");
  const { view, aspect } = camera;

  useEffect(() => {
    const timer = setTimeout(() => {
      const bounds = viewBounds(view, aspect);
      const inView = source
        .atlasBoards()
        .filter(
          (board) =>
            !board.offEarth &&
            board.bounds.lon0 <= Math.max(bounds.lon0, bounds.lon1) &&
            board.bounds.lon1 >= Math.min(bounds.lon0, bounds.lon1) &&
            board.bounds.lat1 <= Math.max(bounds.lat0, bounds.lat1) &&
            board.bounds.lat0 >= Math.min(bounds.lat0, bounds.lat1),
        );
      if (band === "world") {
        const covered = source.atlasBoards().filter((b) => !b.offEarth && !isWideBoard(b)).length;
        setText(at("atlasViewWorld", covered, source.coverageGaps(5).length));
        return;
      }
      if (band === "town") {
        const names = cities
          .filter((city) => city.lon >= bounds.lon0 && city.lon <= bounds.lon1)
          .slice(0, 8)
          .map((city) => tx(city.name));
        setText(names.length === 0 ? at("atlasViewNone") : at("atlasViewTown", names.join("、")));
        return;
      }
      const names = inView.slice(0, 8).map((board) => tx(board.name));
      const key = band === "region" ? "atlasViewRegion" : "atlasViewCountry";
      setText(names.length === 0 ? at("atlasViewNone") : at(key, names.join("、")));
    }, 600);
    return () => clearTimeout(timer);
  }, [source, view, aspect, band, cities, at, tx]);

  return text;
}
