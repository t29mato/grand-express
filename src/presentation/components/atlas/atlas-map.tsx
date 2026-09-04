"use client";

import { useEffect, useRef } from "react";
import type { CityId, CountryId } from "../../../domain/shared-kernel/ids";
import { useAtlasText } from "./use-atlas-text";
import {
  AtlasBand,
  bandOf,
  boundsRects,
  degreesPerPixel,
  labelFits,
  normalizeLon,
  polygonPath,
  polylinePath,
  replacedWorldPolygons,
  routeSegments,
  showsCityNames,
  showsRoutes,
  showsSeaLabels,
  viewBounds,
  viewBoxOf,
} from "./atlas-projection";
import {
  AtlasBoard,
  AtlasBoardLand,
  AtlasBounds,
  AtlasCity,
  AtlasLink,
  AtlasSource,
  MARK_SIZE,
  isCoverageBoard,
  isWholeEarthBoard,
  isWideBoard,
} from "./atlas-source";
import { AtlasCamera, useAtlasGestures } from "./use-atlas-camera";

/**
 * 1枚の世界地図。**引き具合で出すものを入れ替える。**
 *
 * | 段        | 見えている経度 | 地図に出るもの                                     |
 * |-----------|----------------|----------------------------------------------------|
 * | `world`   | 100度〜        | 海と陸・**まだ盤面が無い陸**・遊べる範囲・海の名前 |
 * | `region`  | 24〜100度      | 同じ塗り分けと、盤面の枠。大きく映っているものだけ名前 |
 * | `country` | 14〜24度       | **その盤面自身の海岸線・地形帯・飾り・湖・川**と、枠と名前 |
 * | `town`    | 〜14度         | 同じ下敷きに**線路と航路**と町の印。9度より寄ると町の名前も |
 *
 * ## 線路と航路は、町の印の下に
 *
 * 町の印だけが浮いていると、**どの町とどの町がつながっているのか**が
 * 地図のどこにも出ていない。この遊びは線を辿って旅をするものなので、
 * つながりが見えなければ盤面の半分しか写していないことになる。
 * 線は必ず**印より先に**描く。後から描くと、線が印の上を横切って
 * 印の絵が読めなくなる。
 *
 * ## 寄ったら、下敷きを盤面の地形へ入れ替える
 *
 * 世界一周盤の輪郭は地球ぜんぶで38枚しかない。**日本は5枚62点。**
 * これを国の大きさまで拡大すると、海岸線は数本の直線になり、そこから先は
 * ただの緑の面になる(実測: 見えている経度 0.82度で、地図の中身が0要素)。
 * 各盤面のコンテンツは実座標の海岸線・地形帯・湖・川を持っているので、
 * 国の段からそちらへ敷き替える(`loadBoardLand`)。
 * 粗い輪郭のうち**その盤面が描き直すかたまりだけ**を下げるので、
 * 日本へ寄っても隣の朝鮮半島や中国沿岸は消えない(`replacedWorldPolygons`)。
 *
 * ## 世界の眺めで、広い盤面を塗らない
 *
 * `world` と大陸6枚は地球の陸をほぼ丸ごと覆う。**47枚ぜんぶで塗ると、
 * 地球全体が「盤面あり」になって、まだ無い場所が消える。**
 * 塗るのは国と、その中の盤面(39枚)だけ。広い盤面は寄ってから
 * 破線の枠で「この範囲をまとめて遊ぶ盤面」として出す。
 *
 * ## 大きさは画面のピクセルで決める
 *
 * 字も線も印も、**寄るほど巨大に膨らんではいけない。**この地図の座標は度なので、
 * 1ピクセルが何度にあたるか(`degreesPerPixel`)を掛けて、
 * 画面上の見た目の大きさを一定に保つ。
 *
 * ## 読み上げ
 *
 * 地図そのものは `role="img"` の1枚の絵として扱い、**中の印は読み上げに出さない。**
 * 盤面や町へ辿り着く道は隣の一覧(`atlas-index.tsx`)が持っている。
 * 両方から読めると、同じ名前が2回ずつ読まれて使いものにならない。
 */
export function AtlasMap({
  source,
  camera,
  cities,
  citiesLoading,
  links = EMPTY_LINKS,
  boardLand,
  boardLandBounds,
  selectedBoardId,
  selectedCityId,
  onPickBoard,
  onPickCity,
}: {
  source: AtlasSource;
  camera: AtlasCamera;
  /** 寄っている盤面の町。まだ読めていない盤面は入っていない。 */
  cities: readonly AtlasCity[];
  citiesLoading: boolean;
  /** その町どうしをつなぐ線路と航路。まだ読めていなければ空。 */
  links?: readonly AtlasLink[];
  /** いま真下にある盤面の海岸線と地形。まだ読めていなければ `null`。 */
  boardLand: AtlasBoardLand | null;
  /** その海岸線を持つ盤面の四隅(粗い輪郭のどれを置き換えるかの判断に使う)。 */
  boardLandBounds: AtlasBounds | null;
  selectedBoardId: CountryId | null;
  selectedCityId: CityId | null;
  onPickBoard: (board: AtlasBoard) => void;
  onPickCity: (city: AtlasCity) => void;
}) {
  const { at, tx } = useAtlasText();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  useAtlasGestures(camera, svgRef);

  // 枠の実寸をカメラへ。**測れていないと `viewBox` が NaN になりうる**ので、
  // 測れるまでは投影側が世界ぜんぶに落としている。
  const { setSize } = camera;
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const rect = frame.getBoundingClientRect();
      setSize(rect.width, rect.height);
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [setSize]);

  const { view, aspect, sizePx } = camera;
  const band: AtlasBand = bandOf(view.span);
  const bounds = viewBounds(view, aspect);
  const dpp = degreesPerPixel(view, sizePx.width);
  const colors = source.worldColors();

  const boards = source.atlasBoards();
  const land = source.worldLand();
  const onMap = boards.filter((board) => !board.offEarth);
  const covered = onMap.filter(isCoverageBoard);
  /**
   * まだ盤面が無い陸をどれだけ濃く見せるか。**寄ったら消す。**
   * 盤面まで寄れば「枠が無い＝盤面が無い」で分かるし、画面の大半が
   * 暗いだけの絵になっては地図の役に立たない。
   */
  const gapInk = band === "world" ? 1 : band === "region" ? 0.55 : 0;
  const roomForSeaLabels = showsSeaLabels(view.span, sizePx.width);

  const visible = onMap
    .filter((board) => !isWholeEarthBoard(board))
    .filter((board) => boundsRects(board.bounds).some((r) => rectInView(r, bounds)));
  const outlined = band === "world" ? [] : [...visible].sort((a, b) => area(b) - area(a));
  const townish = band === "town";
  /** 線路と航路を出す段。**町の印と同じ段**(決めた理由は `showsRoutes`)。 */
  const routish = showsRoutes(view.span);

  /**
   * **盤面まで寄ったら、その盤面自身の海岸線を下敷きにする。**
   *
   * 世界の粗い輪郭のままだと、寄るほど何も無くなる(実測: 日本で 0.82度まで
   * 寄ると海岸線も地形も町も無い緑の面だけが残った)。国の段から敷き替える。
   * 引いた眺め(world / region)では出さない——粗い輪郭で足りているし、
   * そこで見せたいのは「遊べる範囲とまだ無い場所」の塗り分けのほうである。
   */
  const detailed = boardLand && boardLandBounds && (band === "country" || band === "town");
  const replaced =
    detailed && boardLandBounds ? replacedWorldPolygons(land, boardLandBounds) : EMPTY_REPLACED;
  /**
   * 塗り分け(金と斜線)は引いた眺めだけ。**寄ってからも残すと、
   * せっかくの海岸線の上に金の膜がかかる**うえ、四隅の長方形なので
   * 海まで金色になる。凡例も world / region でだけ出している。
   */
  const paintCoverage = band === "world" || band === "region";

  return (
    <div className="atlas-map-frame" ref={frameRef}>
      <svg
        ref={svgRef}
        className="atlas-map"
        viewBox={viewBoxOf(view, aspect)}
        role="img"
        aria-label={at("atlasMapLabel")}
        style={{ background: "var(--atlas-void)" }}
      >
        <defs>
          {/*
            **塗り分けは陸だけに乗せる。**盤面が持っているのは投影の四隅
            (長方形)なので、そのまま塗ると海まで金色になり、
            撮ってみたら**地球ぜんぶが金の板**にしか見えなかった。
            陸で切り抜くと、「明かりの点いた陸」と「まだ暗い陸」の対比になる。
          */}
          <clipPath id="atlas-land-clip">
            {land.map((polygon, i) => {
              const d = polygonPath(polygon);
              return d ? <path key={i} d={d} /> : null;
            })}
          </clipPath>
          {/* 空白の格子。ただ塗るだけだと「海」に見えるので、斜線を重ねる。 */}
          <pattern
            id="atlas-gap-hatch"
            width={dpp * 7}
            height={dpp * 7}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width={dpp * 7} height={dpp * 7} fill="#0d1526" opacity="0.62" />
            <rect width={dpp * 2.4} height={dpp * 7} fill="#f6efe2" opacity="0.13" />
          </pattern>
          {/*
            **「盤面が無い陸」は、盤面のある陸を切り抜いた残り**として描く。
            最初は `coverageGaps(5)` の5度格子をそのまま並べたが、格子が陸の形と
            揃わず、**塗りの縁に緑の帯が残った**(撮って分かった)。凡例に無い
            3つめの色が生まれ、「これは何?」となる。
            切り抜きなら残りは1色で、境目は海岸線と盤面の枠だけになる。
            数(157か所)は `coverageGaps` のまま読み上げに使っている。
          */}
          <mask id="atlas-uncovered-mask">
            <rect x={-180} y={-260} width={360} height={520} fill="#fff" />
            <g fill="#000">
              {covered.flatMap((board) =>
                boundsRects(board.bounds).map((r, j) => (
                  <rect key={`${board.id}-${j}`} x={r.x} y={r.y} width={r.w} height={r.h} />
                )),
              )}
            </g>
          </mask>
        </defs>

        {/* 海。**見えている範囲より広く敷く。**世界ぜんぶを横に収めると、
            枠の比によっては縦が180度を超え、極の外に地の色の帯が出る。
            帯があると「地図が壊れている」ように見えた(撮って分かった)。 */}
        <rect x={-180} y={-260} width={360} height={520} fill={colors.sea} />

        <g fill={colors.land} stroke={colors.coast} strokeWidth={dpp * 0.7} strokeLinejoin="round">
          {land.map((polygon, i) => {
            // その盤面が描き直すかたまり(日本の四隅なら北海道・本州・九州・四国)は
            // 出さない。**残したまま上に重ねると、粗い輪郭が細かい海岸線の外へ
            // 緑のふちとなってはみ出す。**隣の国(ユーラシア)は置き換わらないので残る。
            if (replaced.has(i)) return null;
            const d = polygonPath(polygon);
            return d ? <path key={i} d={d} /> : null;
          })}
        </g>

        {/* 盤面自身の海岸線・地形帯・湖・川。**寄ったときだけ。** */}
        {detailed && boardLand && <BoardLandLayer land={boardLand} dpp={dpp} />}

        {/* まだ盤面が無い陸。陸で切り抜き、盤面のある範囲を抜いた残りに斜線を敷く。 */}
        {gapInk > 0 && (
          <g
            className="atlas-gaps"
            clipPath="url(#atlas-land-clip)"
            mask="url(#atlas-uncovered-mask)"
            opacity={gapInk}
          >
            <rect x={-180} y={-260} width={360} height={520} fill="url(#atlas-gap-hatch)" />
          </g>
        )}

        {/* 遊べる範囲。**まとまり全体に1つの透明度**を掛ける(重なっても濃くならない) */}
        {paintCoverage && (
          <g
            className="atlas-covered"
            clipPath="url(#atlas-land-clip)"
            opacity={band === "world" ? 0.62 : 0.26}
          >
            {covered.flatMap((board) =>
              boundsRects(board.bounds).map((r, j) => (
                <rect key={`${board.id}-${j}`} x={r.x} y={r.y} width={r.w} height={r.h} fill="var(--gold)" />
              )),
            )}
          </g>
        )}

        {/* 町と町をつなぐ線路と航路。**町の印より先に描く**(後から描くと
            線が印の上を横切って、印の絵が読めなくなる)。 */}
        {routish && <RouteLayer links={links} dpp={dpp} />}

        {/* 盤面の枠。広い盤面(世界一周・大陸)は破線で、別のものだと分かるように。 */}
        <g fill="none">
          {outlined.flatMap((board) => {
            const wide = isWideBoard(board);
            const chosen = board.id === selectedBoardId;
            return boundsRects(board.bounds).map((r, j) => (
              <rect
                key={`${board.id}-${j}`}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                className={`atlas-board-rect${wide ? " wide" : ""}${chosen ? " chosen" : ""}`}
                strokeWidth={dpp * (chosen ? 2.4 : 1.4)}
                strokeDasharray={wide ? `${dpp * 8} ${dpp * 6}` : undefined}
                rx={dpp * 3}
              />
            ));
          })}
        </g>

        {/* 海と地形帯の名前。**世界の眺めのときだけ。**寄ると盤面の名前と喧嘩する。
            狭い画面では出さない——375pxで撮ったら、19枚の札が地球の上で
            折り重なり、地図そのものが読めなくなった。 */}
        {band === "world" && roomForSeaLabels && (
          <g className="atlas-sea-labels" fontSize={dpp * 11}>
            {source.worldLabels().map((label, i) => (
              <text key={i} x={label.lon} y={-label.lat} textAnchor="middle" className={label.isWater ? "water" : "land"}>
                {tx(label.text)}
              </text>
            ))}
          </g>
        )}

        {/* 盤面の名前。**十分大きく映っているものだけ。**小さいままの盤面に
            名前を出すと、親の名前と重なって両方読めなくなる。 */}
        {band !== "world" && (
          <g className="atlas-board-labels" fontSize={dpp * 13}>
            {outlined
              .filter((board) => labelFits(board.bounds, view, aspect))
              .map((board) => {
                const r = boundsRects(board.bounds)[0];
                if (!r) return null;
                const wide = isWideBoard(board);
                // **大陸の名前は枠の上端に置く。**真ん中に置くと、その中の国の
                // 名前と必ずぶつかる(ヨーロッパを撮ったら「Europe」と
                // 「Germany」が重なって両方読めなかった)。
                // 枠が画面からはみ出しているときは、見えている側の上端に寄せる。
                const spot = wide ? topOfVisible(r, bounds, dpp) : centreOf(r);
                return (
                  <text
                    key={board.id}
                    x={spot.x}
                    y={spot.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    data-atlas-hit="board"
                    data-board-id={board.id}
                    className={`atlas-board-label${isWideBoard(board) ? " wide" : ""}${
                      board.id === selectedBoardId ? " chosen" : ""
                    }`}
                    onClick={() => onPickBoard(board)}
                  >
                    {tx(board.name)}
                  </text>
                );
              })}
          </g>
        )}

        {/* 町。**寄ったときだけ読み、寄ったときだけ出す。** */}
        {townish && (
          <g className="atlas-cities">
            {cities
              .filter((city) => pointInside(city.lon, city.lat, bounds))
              .map((city) => (
                <CityMark
                  key={city.id}
                  city={city}
                  dpp={dpp}
                  name={showsCityNames(view.span) ? tx(city.name) : null}
                  chosen={city.id === selectedCityId}
                  onPick={onPickCity}
                />
              ))}
          </g>
        )}
      </svg>

      {citiesLoading && (
        <p className="atlas-map-loading" role="status">
          <span className="atlas-spinner" aria-hidden="true" />
          {at("atlasCitiesLoading")}
        </p>
      )}
    </div>
  );
}

/**
 * 盤面自身の地形。**遊ぶときに見ている盤面と同じ絵**を、地図の座標へ置き直したもの。
 *
 * 重ね順は盤面の絵(`terrain-layer.tsx`)に合わせてある——
 * 陸 → 地形帯 → 湖 → 川。地形帯・湖・川は**陸で切り抜く**(切り抜かないと、
 * 川が河口から海へ数十kmはみ出して伸びる)。
 *
 * 色はその盤面の色をそのまま使う。エジプトの砂色のように世界地図の緑と
 * 違う盤面もあるが、**遊ぶときに見る色と揃っているほうが地図として正しい。**
 *
 * 線の太さは画面の点で決める(`dpp` を掛ける)。寄っても川が膨らまない。
 */
function BoardLandLayer({ land, dpp }: { land: AtlasBoardLand; dpp: number }) {
  const paths = land.land.map(polygonPath).filter((d) => d !== "");
  if (paths.length === 0) return null;
  return (
    <g className="atlas-board-land">
      <defs>
        <clipPath id="atlas-board-land-clip">
          {paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </clipPath>
      </defs>

      <g
        fill={land.colors.land}
        stroke={land.colors.coast}
        strokeWidth={dpp * 0.9}
        strokeLinejoin="round"
      >
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      <g clipPath="url(#atlas-board-land-clip)">
        {land.terrain.map((band, i) => {
          const d = polygonPath(band.polygon);
          return d ? <path key={`t${i}`} d={d} fill={band.color} /> : null;
        })}
        {/*
          山・鳥居・森などの飾り。**遊びの盤面と同じ絵をそのまま置いている。**
          日本の全体表示で数えると、盤面の `<path>` 553本に対して地図帳は117本
          しか無く、差の大半がこれだった——地図帳だけ山も鳥居も無い野原だった。

          断片の座標は盤面のピクセルなので、データ層が付けてくれた `transform`
          (盤面のピクセル → 経度緯度)で写す。**中身は読まない。**
          コンテンツJSON由来でユーザー入力を含まないため、遊びの盤面
          (`terrain-layer.tsx`)と同じ理由で `dangerouslySetInnerHTML` を使う。

          出すのは**いま開いている盤面の1枚だけ**なので、日本と茨城のように
          親子が重なっていても飾りが二重にならない(下敷きにする盤面を
          1つに決めているのは `atlas-screen.tsx` の `landBoard`)。
        */}
        {land.decor && (
          <g
            className="atlas-board-decor"
            transform={land.decor.transform}
            dangerouslySetInnerHTML={{ __html: land.decor.svg }}
          />
        )}
        {land.lakes.map((lake, i) => (
          <ellipse
            key={`l${i}`}
            cx={lake.lon}
            cy={-lake.lat}
            rx={lake.rxDeg}
            ry={lake.ryDeg}
            fill={lake.color}
            transform={`rotate(${lake.rotation} ${lake.lon} ${-lake.lat})`}
          />
        ))}
        {land.rivers.map((river, i) => {
          const d = polylinePath(river);
          return d ? (
            <path
              key={`r${i}`}
              d={d}
              fill="none"
              stroke="#4f9fd0"
              strokeWidth={dpp * 1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.9}
            />
          ) : null;
        })}
      </g>
    </g>
  );
}

/** 置き換わる粗い多角形が1枚も無いとき用。毎回 `new Set()` を作らない。 */
const EMPTY_REPLACED: ReadonlySet<number> = new Set<number>();

/** 線がまだ読めていないとき用。毎回 `[]` を作ると、描き直しの理由になる。 */
const EMPTY_LINKS: readonly AtlasLink[] = [];

/**
 * 線路の重ね。**遊びの盤面(`board-view.tsx` の `RAIL_LAYERS`)と同じ3層**
 * ——暗い縁取り → 明るいレール → 枕木の刻み。
 *
 * 太さは盤面の値(9/5/5)をそのまま持ってこない。あちらは1画面に路線が
 * 30本ほど、こちらは実際の地理の上に**同じ本数がずっと狭い範囲に**乗る
 * (日本は97本)ので、半分ほどに落としてある。枕木は逆に、細くすると
 * ただの点線に見えたので、盤面より間隔を詰めた。
 *
 * 単位は「画面のピクセル」。描くときに `dpp` を掛けて度に直すので、
 * **寄っても線は太らない。**
 */
const RAIL_LAYERS: readonly { stroke: string; width: number; dash?: number[]; opacity?: number }[] = [
  { stroke: "#20180f", width: 4.4, opacity: 0.5 },
  { stroke: "#e6dcc6", width: 2.4 },
  { stroke: "#3b3123", width: 2.4, dash: [0.9, 3.2] },
];

/**
 * 航路の重ね。盤面と同じく**水色の破線**にして、枕木のある帯と見分ける。
 * 暗い下敷きを1枚敷くのは、岸すれすれを通る航路が陸の緑に埋もれるため。
 */
const SEA_LAYERS: readonly { stroke: string; width: number; dash?: number[]; opacity?: number }[] = [
  { stroke: "#0e1626", width: 4.4, opacity: 0.4 },
  { stroke: "#7fc8e8", width: 2, dash: [5, 4] },
  { stroke: "#d8f0ff", width: 1, dash: [1.6, 7.4], opacity: 0.9 },
];

/**
 * 町と町をつなぐ線路と航路。**遊びの盤面と同じ描き分け**にしてある——
 * 線路は枕木のある帯、航路は水色の破線。
 *
 * ただし**形は盤面と同じにしない。**盤面の路線は八方位に折れた線で、
 * 中間マスの位置で曲がっている。地図帳は実際の地理の上に引くので、
 * 町と町を素直に結ぶ。曲げる理由(マスを等間隔に並べる)がここには無い。
 *
 * 日付変更線をまたぐ線は `routeSegments` が端で2本に切ってくれる。
 * 切らずに結ぶと、太平洋の航路1本が地図を丸ごと横断する。
 */
function RouteLayer({ links, dpp }: { links: readonly AtlasLink[]; dpp: number }) {
  const rail: string[] = [];
  const sea: string[] = [];
  for (const link of links) {
    for (const segment of routeSegments(link.lonA, link.latA, link.lonB, link.latB)) {
      const d =
        `M${segment.x1.toFixed(3)},${segment.y1.toFixed(3)}` +
        `L${segment.x2.toFixed(3)},${segment.y2.toFixed(3)}`;
      (link.kind === "sea" ? sea : rail).push(d);
    }
  }
  if (rail.length === 0 && sea.length === 0) return null;

  const draw = (
    className: string,
    paths: readonly string[],
    layers: typeof RAIL_LAYERS,
  ) => (
    <g className={className}>
      {layers.map((layer, layerIndex) => (
        <g
          key={layerIndex}
          fill="none"
          stroke={layer.stroke}
          strokeWidth={dpp * layer.width}
          strokeLinecap="round"
          strokeDasharray={layer.dash?.map((n) => dpp * n).join(" ")}
          opacity={layer.opacity}
        >
          {paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      ))}
    </g>
  );

  return (
    <g className="atlas-routes">
      {/* 航路を先に。盤面と同じ重ね順で、港では線路が上に来る。 */}
      {sea.length > 0 && draw("atlas-sea-routes", sea, SEA_LAYERS)}
      {rail.length > 0 && draw("atlas-rail-routes", rail, RAIL_LAYERS)}
    </g>
  );
}

/**
 * 町の印。断片は 24×24 で描かれているので、**画面上で常に同じ大きさ**になる倍率へ落とす。
 * 印が空の町(絵の付いていない町)も点だけは打つ——地図の上で存在が消えないように。
 *
 * **経度は畳んでから置く。**町の経度は畳まれていない値で入っており
 * (オセアニアのアピアは188.2、ファカオフォは188.8)、そのまま置くと
 * 地図の右端の外——カメラがどう動いても入らないところ——に落ちる。
 * 線(`RouteLayer`)も畳んだ座標で引くので、揃えないと**線の端に印が無い**
 * という眺めになる。
 */
function CityMark({
  city,
  dpp,
  name,
  chosen,
  onPick,
}: {
  city: AtlasCity;
  dpp: number;
  name: string | null;
  chosen: boolean;
  onPick: (city: AtlasCity) => void;
}) {
  const px = chosen ? 30 : 22;
  const scale = (px / MARK_SIZE) * dpp;
  const x = normalizeLon(city.lon);
  const y = -city.lat;
  return (
    <g
      className={`atlas-city${chosen ? " chosen" : ""}`}
      data-atlas-hit="city"
      data-city-id={city.id}
      onClick={() => onPick(city)}
    >
      {/* 押せる範囲。印より広めに取る(印は細い線が多く、指では当たらない) */}
      <circle cx={x} cy={y} r={dpp * 16} fill="transparent" />
      <circle cx={x} cy={y} r={dpp * (chosen ? 15 : 12)} className="atlas-city-disc" />
      {city.markSvg ? (
        <g
          transform={`translate(${x} ${y}) scale(${scale}) translate(${-MARK_SIZE / 2} ${-MARK_SIZE / 2})`}
          dangerouslySetInnerHTML={{ __html: city.markSvg }}
        />
      ) : (
        <circle cx={x} cy={y} r={dpp * 4} fill="var(--salt)" />
      )}
      {name && (
        <text
          x={x}
          y={y + dpp * 26}
          textAnchor="middle"
          fontSize={dpp * 12}
          className="atlas-city-name"
        >
          {name}
        </text>
      )}
    </g>
  );
}

function rectInView(
  rect: { x: number; y: number; w: number; h: number },
  view: { lon0: number; lon1: number; lat0: number; lat1: number },
): boolean {
  const west = Math.min(view.lon0, view.lon1);
  const east = Math.max(view.lon0, view.lon1);
  const top = -Math.max(view.lat0, view.lat1);
  const bottom = -Math.min(view.lat0, view.lat1);
  return rect.x <= east && rect.x + rect.w >= west && rect.y <= bottom && rect.y + rect.h >= top;
}

/**
 * 点が見えている範囲に入っているか。
 *
 * **経度を ±360度ずらした3通りで当てる。**町の経度は畳まれておらず
 * (オセアニアのアピアは188.2)、見えている範囲のほうも端では畳みの外へ
 * はみ出す(中心170度・幅30度なら 155〜185度)。素朴に大小を比べると、
 * 変更線のまわりの町だけが**印も名前も出ない**ことになる。
 */
function pointInside(
  lon: number,
  lat: number,
  view: { lon0: number; lon1: number; lat0: number; lat1: number },
): boolean {
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return false;
  if (lat < Math.min(view.lat0, view.lat1) || lat > Math.max(view.lat0, view.lat1)) return false;
  const west = Math.min(view.lon0, view.lon1);
  const east = Math.max(view.lon0, view.lon1);
  const here = normalizeLon(lon);
  return [here - 360, here, here + 360].some((x) => x >= west && x <= east);
}

function centreOf(r: { x: number; y: number; w: number; h: number }): { x: number; y: number } {
  return { x: r.x + r.w / 2, y: r.y + r.h / 2 };
}

/** 枠のうち画面に見えている部分の、上端の真ん中。 */
function topOfVisible(
  r: { x: number; y: number; w: number; h: number },
  view: { lon0: number; lon1: number; lat0: number; lat1: number },
  dpp: number,
): { x: number; y: number } {
  const west = Math.max(r.x, Math.min(view.lon0, view.lon1));
  const east = Math.min(r.x + r.w, Math.max(view.lon0, view.lon1));
  const top = Math.max(r.y, -Math.max(view.lat0, view.lat1));
  const x = east > west ? (west + east) / 2 : r.x + r.w / 2;
  return { x, y: top + dpp * 22 };
}

function area(board: AtlasBoard): number {
  return boundsRects(board.bounds).reduce((sum, r) => sum + r.w * r.h, 0);
}
