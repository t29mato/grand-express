"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CityId, NodeId, PlayerId, PropertyRef, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { isCityNode } from "../../../domain/board/node";
import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { railPolylines, useBoardLayout } from "../../hooks/use-board-layout";
import { useCamera } from "../../hooks/use-camera";
import { useLocale } from "../../i18n/locale-context";
import { useCityLabels } from "../../hooks/use-city-labels";
import { SIZES } from "./board-metrics";
import { TOKEN, TrainToken } from "./train-token";
import { TerrainLayer } from "./terrain-layer";
import { BoardLegend } from "./board-legend";
import { BoardCompass } from "./board-compass";

const PLAYER_COLORS = ["#e8447a", "#f5b31c", "#37b3a4", "#7bc86c"];

/**
 * 追尾時の視野幅(現行コードの `FOLLOW_W` = 520 / BW 1150 ≒ 0.45)。
 * 盤面の座標系は国ごと・改訂ごとに変わるため、固定値ではなく盤面幅に対する比で持つ。
 */
const FOLLOW_WIDTH_RATIO = 0.45;

/** 路線の3層描画(現行コードの `drawBoard` のレール描画と同じ色・線幅)。 */
const RAIL_LAYERS: readonly { stroke: string; width: number; dash?: string; opacity?: number }[] = [
  { stroke: "#20180f", width: 9, opacity: 0.55 },
  { stroke: "#e6dcc6", width: 5, dash: undefined },
  { stroke: "#3b3123", width: 5, dash: "1.5 9" },
];

/**
 * 航路の描画。陸路(枕木のあるレール)と見分けがつくよう、
 * 海になじむ青系の破線で描く。
 */
const SEA_LAYERS: readonly { stroke: string; width: number; dash?: string; opacity?: number }[] = [
  { stroke: "#0e1626", width: 9, opacity: 0.45 },
  { stroke: "#7fc8e8", width: 5, dash: "14 10" },
  { stroke: "#d8f0ff", width: 2, dash: "4 20", opacity: 0.9 },
];

/**
 * 都市名ラベルの画面上の文字サイズ(CSSピクセル)。
 * SVGの font-size は盤面座標の単位なので、そのまま指定するとズームしても
 * ラベルの相対サイズが変わらず、いつまでも重なったままになる。
 * 画面上で一定サイズになるよう毎回換算し、ズームインするほど地図に対して
 * 小さく=すいて見えるようにする。
 */
const LABEL_FONT_PX = 13;
const DEST_LABEL_FONT_PX = 15;


/**
 * 中間マスの色と記号(現行コードの `SQUARE`)。
 * クイズマスは**難易度で色分けしない**。難易度はマスではなく問題の属性になり、
 * 止まった時点でプレイヤーの知識レベルに応じて抽選されるため、
 * マスを見て難易度が分かるわけではない。
 */
const SQUARE_STYLES: Record<string, { color: string; glyph: string }> = {
  quiz: { color: "#f5b31c", glyph: "?" },
  blue: { color: "#5b8fe8", glyph: "+" },
  red: { color: "#e05252", glyph: "−" },
  card: { color: "#f5d31c", glyph: "★" },
};

/**
 * 幹線(その国の背骨になる路線)。**都市の並びで書く。**
 *
 * 辺に1つずつ印を付ける形にすると、東海道新幹線のように何区間も続く路線を
 * 表せない(この盤面には tokyo-nagoya のような直通の辺が無く、
 * 横浜・鎌倉・箱根・静岡を経由する連なりになっている)。
 * 並びで書けば、途中の区間を書き落とす心配もない。
 *
 * いまは日本の2本だけの試作。方向が良ければ他の盤面にも広げ、
 * 置き場所も content 側へ移す(絵ではなく内容の話なので)。
 */
const TRUNK_LINES: Record<string, readonly (readonly string[])[]> = {
  japan: [
    // 東北・北海道新幹線
    ["hakodate", "aomori", "morioka", "sendai"],
    // 東海道・山陽新幹線(この盤面では鎌倉・箱根を経由して名古屋へ抜ける)
    ["tokyo", "yokohama", "kamakura", "hakone", "shizuoka", "nagoya", "kyoto", "osaka", "himeji"],
  ],
};

/** 幹線に含まれる区間の集合(都市idを並べ替えて `a|b` の形にしたもの)。 */
function trunkSegments(countryId: string): ReadonlySet<string> {
  const segments = new Set<string>();
  for (const chain of TRUNK_LINES[countryId] ?? []) {
    for (let i = 0; i < chain.length - 1; i++) {
      segments.add([chain[i], chain[i + 1]].sort().join("|"));
    }
  }
  return segments;
}

export interface BoardViewProps {
  context: GameEngineContext;
  session: GameSession;
  reachable: ReadonlySet<NodeId> | null;
  onChooseNode?: (id: NodeId) => void;
}

export function BoardView({ context, session, reachable, onChooseNode }: BoardViewProps) {
  const positions = useBoardLayout(context);
  const { tx, t, locale } = useLocale();
  const { boardWidth, boardHeight } = context.content.projection;
  const [overview, setOverview] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewportWidthPx, setViewportWidthPx] = useState(0);
  const [viewportHeightPx, setViewportHeightPx] = useState(0);
  const { camera, viewBox, fitWidth, animateTo, panByPixels, zoomBy, stopAnimation } = useCamera({
    boardWidth,
    boardHeight,
    // 枠の比をカメラに渡すことで、viewBoxの縦横比が枠と一致する。
    // 一致していないとSVG側で余白付き縮小(preserveAspectRatio)が起き、
    // 「全体表示」でも盤面の端が見えないことがある。
    viewportAspect: viewportHeightPx > 0 ? viewportWidthPx / viewportHeightPx : 0,
  });
  // ドラッグ中の直前のポインタ位置。null ならドラッグしていない。
  const dragRef = useRef<{ x: number; y: number; pointerId: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  const activePlayerId = currentPlayer(session).id;
  const activeLocation = currentPlayer(session).location;

  // 行き先の候補が全部見えるように、候補と現在地を囲む枠を求める。
  // 候補が画面の外にあると、そこへ移りたくても押せない(地図を動かさないと選べない)。
  const candidateFrame = useMemo(() => {
    if (!reachable || reachable.size === 0) return null;
    const here = positions.get(activeLocation);
    const points = [...reachable.keys()].map((id) => positions.get(id)).filter((p) => p !== undefined);
    if (here) points.push(here);
    if (points.length === 0) return null;

    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    // マーカーと都市名のぶんの余白。
    const margin = SIZES.haloRadius * 4;
    return {
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2,
      width: maxX - minX + margin * 2,
      height: maxY - minY + margin * 2,
    };
  }, [reachable, positions, activeLocation]);

  // 手番のプレイヤーを追尾する(現行コードの `focusNode`)。全体表示モードなら盤面全体を映す。
  useEffect(() => {
    if (overview) {
      // 盤面全体が確実に収まる幅(枠が縦長なら盤面幅より広い)。
      animateTo(boardWidth / 2, boardHeight / 2, fitWidth + 60);
      return;
    }

    // マスを選んでいる間は、候補が全部入る大きさまで引く。
    if (candidateFrame) {
      const aspect = viewportHeightPx > 0 ? viewportWidthPx / viewportHeightPx : boardWidth / boardHeight;
      const needed = Math.max(candidateFrame.width, candidateFrame.height * aspect);
      animateTo(
        candidateFrame.cx,
        candidateFrame.cy,
        Math.max(needed, boardWidth * FOLLOW_WIDTH_RATIO),
      );
      return;
    }

    const pos = positions.get(activeLocation);
    if (pos) animateTo(pos.x, pos.y, boardWidth * FOLLOW_WIDTH_RATIO);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLocation, overview, boardWidth, boardHeight, fitWidth, positions, candidateFrame]);

  // 盤面SVGの実表示サイズを追跡する(盤面座標→画面pxの換算と、viewBoxの縦横比に使う)。
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const update = () => {
      const rect = svg.getBoundingClientRect();
      setViewportWidthPx(rect.width);
      setViewportHeightPx(rect.height);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  // 盤面座標1単位あたりの画面px。これでラベルを画面上で一定サイズに保つ。
  const unitsPerPx = viewportWidthPx > 0 ? camera.w / viewportWidthPx : 0;
  // ズーム中に毎フレーム再配置しないよう、文字サイズは0.5単位に丸めてから使う。
  const labelFontUnits = Math.round(LABEL_FONT_PX * unitsPerPx * 2) / 2;
  const labelPlacements = useCityLabels({
    context,
    positions,
    fontUnits: labelFontUnits,
    locale,
    destination: session.destination,
  });

  // 盤面のドラッグによる手動パン(現行コードの `pointerdown`/`pointermove` 実装の移植)。
  // 移動可能なマスの上から始まったドラッグは、マスのクリックを妨げないよう無視する。
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      if ((e.target as Element).closest?.("[data-choosable='true']")) return;
      dragRef.current = { x: e.clientX, y: e.clientY, pointerId: e.pointerId, moved: false };
      setDragging(true);
      stopAnimation();
      svgRef.current?.setPointerCapture(e.pointerId);
    },
    [stopAnimation],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 3) return; // 微小な揺れはクリック扱いのまま
      drag.moved = true;
      drag.x = e.clientX;
      drag.y = e.clientY;
      // SVG要素の `clientWidth` はブラウザによって0を返すことがあるため、
      // レイアウト済みの実寸が確実に取れる getBoundingClientRect を使う。
      panByPixels(dx, dy, svgRef.current?.getBoundingClientRect().width ?? 0);
    },
    [panByPixels],
  );

  const endDrag = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    setDragging(false);
    svgRef.current?.releasePointerCapture?.(e.pointerId);
  }, []);

  // ホイール/ピンチでのズーム。ページのスクロールを奪わないよう、
  // 盤面上でのホイール操作のときだけ preventDefault する。
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopAnimation();
      zoomBy(e.deltaY > 0 ? 1.12 : 1 / 1.12);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [zoomBy, stopAnimation]);

  /**
   * 路線の線分。陸路と航路で描き分けるため、種類ごとに分けて持つ。
   * 種類は中間マスが持つ `edgeKind` から判定する(都市同士が直接繋がる場合は
   * 中間マスが無いので、相手側から辿れなければ陸路として扱う)。
   */
  // 曲がり角の丸めの半径。マスの間隔に比例させる(盤面の縮尺が変わっても崩れない)。
  const cornerRadius = (context.content.projection.segmentLength ?? 64) / 3;

  const edges = useMemo(() => {
    const rail: { d: string; isTrunk: boolean }[] = [];
    const sea: { d: string; isTrunk: boolean }[] = [];
    // マスとマスを直接結ぶと、折れ点がそのあいだに来たときに角を斜めに
    // 突っ切ってしまう。経路そのもの(折れ点を通る折れ線)を描く。
    const trunk = trunkSegments(context.content.id);
    for (const { points, kind, between } of railPolylines(context, positions)) {
      const d = roundedPath(points, cornerRadius);
      if (kind === "sea") sea.push({ d, isTrunk: false });
      else rail.push({ d, isTrunk: trunk.has([...between].sort().join("|")) });
    }
    return { rail, sea };
  }, [context, positions, cornerRadius]);

  /**
   * 町ごとの持ち主。
   *
   * 桃鉄の面白さの核は「地図が自分の色に染まっていくのを見る」ことなのに、
   * これまで物件を買っても盤面は何も変わらず、所有は横の数字でしか
   * 分からなかった。いちばん多く持っている人の色を町に付ける。
   * 同数で並んだときは色を付けない(誰の町とも言えないため)。
   */
  const ownershipByCity = useMemo(() => {
    const countsByCity = new Map<string, Map<PlayerId, number>>();
    session.players.forEach((player) => {
      for (const ref of player.portfolio.keys()) {
        const { cityId } = PropertyRef.parse(ref);
        const perPlayer = countsByCity.get(cityId) ?? new Map<PlayerId, number>();
        perPlayer.set(player.id, (perPlayer.get(player.id) ?? 0) + 1);
        countsByCity.set(cityId, perPlayer);
      }
    });

    const colorByPlayer = new Map(
      session.players.map((player, i) => [player.id, PLAYER_COLORS[i % PLAYER_COLORS.length]]),
    );
    const result = new Map<string, CityOwnership>();
    for (const [cityId, perPlayer] of countsByCity) {
      const ranked = [...perPlayer.entries()].sort((a, b) => b[1] - a[1]);
      if (ranked.length > 1 && ranked[0][1] === ranked[1][1]) continue;
      const [playerId, owned] = ranked[0];
      const color = colorByPlayer.get(playerId);
      if (!color) continue;
      result.set(cityId, {
        color,
        isMonopoly: owned === context.getCity(CityId(cityId)).properties.length,
      });
    }
    return result;
  }, [session.players, context]);

  const tokensByNode = useMemo(() => {
    const map = new Map<string, { name: string; color: string; isActive: boolean }[]>();
    session.players.forEach((p, i) => {
      const list = map.get(p.location) ?? [];
      list.push({
        name: p.name,
        color: PLAYER_COLORS[i % PLAYER_COLORS.length],
        isActive: p.id === activePlayerId,
      });
      map.set(p.location, list);
    });
    return map;
  }, [session.players, activePlayerId]);

  return (
    // 盤面SVGとその上に重ねるボタン類の基準になる箱。
    // **高さを枠から受け取る**必要がある(高さ0だと、絶対配置のSVGが
    // 固有縦横比に戻ってしまい、盤面の端が見えなくなる)。
    <div className="board-stage">
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className={`board-svg${dragging ? " dragging" : ""}`}
        // 縦長の盤面を横長の枠に収めると盤面の外側が見える。そこを枠の地色ではなく
        // 海の色で埋めて、地図が途中で途切れて見えないようにする。
        style={{ background: context.content.terrain.seaColor }}
        role="img"
        aria-label="Game board"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <TerrainLayer
          terrain={context.content.terrain}
          projection={context.content.projection}
          monthIndex={session.month}
        />
        {/* 路線。legacyの `drawBoard` と同じく、暗い縁取り→明るいレール→枕木のダッシュ
            という3層で描く。legacyは路線1本ずつ3層を重ねるが、ここでは層ごとに
            まとめて描くことで、隣り合う路線の縁取りが手前の路線を欠けさせないようにしている
            (都市の合流点は都市のシンボルが上に載るため見た目の差は出ない)。 */}
        <g className="edges">
          {/* 航路。陸路の下に敷き、波打つ点線で船の道と分かるようにする。 */}
          <g className="sea-routes">
            {SEA_LAYERS.map((layer, layerIndex) => (
              <g key={layerIndex}>
                {edges.sea.map((line, i) => (
                  <path
                    key={i}
                    d={line.d}
                    fill="none"
                    stroke={layer.stroke}
                    strokeWidth={layer.width}
                    strokeLinecap="round"
                    strokeDasharray={layer.dash}
                    opacity={layer.opacity}
                  />
                ))}
              </g>
            ))}
          </g>
          {RAIL_LAYERS.map((layer, layerIndex) => (
            <g key={layerIndex}>
              {edges.rail.map((line, i) => (
                <path
                  key={i}
                  d={line.d}
                  fill="none"
                  stroke={layer.stroke}
                  /* 幹線は少し太くする。その国の背骨がひと目で分かるように。 */
                  strokeWidth={line.isTrunk ? layer.width * 1.55 : layer.width}
                  strokeLinecap="round"
                  strokeDasharray={layer.dash}
                  opacity={layer.opacity}
                />
              ))}
            </g>
          ))}
        </g>
        <g className="nodes">
          {[...context.graph.nodes].map(([id, node]) => {
            const pos = positions.get(id);
            if (!pos) return null;
            const isDestination = isCityNode(node) && node.cityId === session.destination;
            const isChoosable = reachable?.has(id) ?? false;
            return (
              <g
                key={id}
                transform={`translate(${pos.x}, ${pos.y})`}
                data-choosable={isChoosable ? "true" : undefined}
                /* マスの種類。E2Eから「クイズマスを選ぶ」といった指定ができるようにする
                   (乱数任せに歩き回って偶然止まるのを待つと、試験が不安定になるため)。 */
                data-node-kind={isCityNode(node) ? "city" : node.type}
                onClick={isChoosable ? () => onChooseNode?.(id) : undefined}
                style={{ cursor: isChoosable ? "pointer" : "inherit" }}
              >
                {isChoosable && <circle r={SIZES.haloRadius} className="halo" fill="#f5b31c" opacity={0.6} />}
                {isCityNode(node) ? (
                  <CityMarker
                    glyphSvg={context.content.artGlyphs[context.getCity(node.cityId).artGlyphKey] ?? ""}
                    isDestination={isDestination}
                    ownership={ownershipByCity.get(node.cityId)}
                  />
                ) : (
                  <SquareMarker type={node.type} />
                )}
              </g>
            );
          })}
        </g>
        {/* 駒は純粋な表示用マーカー。手前に描画されるため、下のマスへのクリックを
            妨げないよう pointer-events を無効化する(他プレイヤーが乗っているマスへも
            移動できる必要があるため)。 */}
        <g className="tokens" style={{ pointerEvents: "none" }}>
          {[...tokensByNode.entries()].map(([nodeId, tokens]) => {
            const pos = positions.get(nodeId as NodeId);
            if (!pos) return null;
            return tokens.map((token, i) => (
              <TrainToken
                key={token.name}
                x={pos.x + (i - (tokens.length - 1) / 2) * TOKEN.spacing}
                y={pos.y}
                color={token.color}
                isActive={token.isActive}
              />
            ));
          })}
        </g>
        {/* 都市名は独立したレイヤーに描く。マスの<g>に入れるとラベルのぶん
            バウンディングボックスが広がり、その中心が空白に来てクリック判定が
            地形ポリゴンに奪われてしまうため(マスを選べなくなる)。
            最前面に置くことで、他のマーカーに隠れず読めるという利点もある。 */}
        <g className="city-labels" style={{ pointerEvents: "none" }}>
          {[...labelPlacements.entries()].map(([cityId, placement]) => {
            const at = positions.get(cityIdToNodeId(cityId));
            if (!at) return null;
            const isDestination = cityId === session.destination;
            const fontUnits = (isDestination ? DEST_LABEL_FONT_PX / LABEL_FONT_PX : 1) * labelFontUnits;
            return (
              <text
                key={cityId}
                className={`city-label${isDestination ? " dest" : ""}`}
                x={at.x + placement.dx}
                y={at.y + placement.dy}
                textAnchor={placement.anchor}
                fontSize={fontUnits}
                strokeWidth={fontUnits * 0.26}
              >
                {tx(context.getCity(cityId).name)}
              </text>
            );
          })}
        </g>
      </svg>
      <BoardLegend currency={context.content.currency} />
      <BoardCompass />
      <button
        type="button"
        className="cam-toggle"
        aria-pressed={overview}
        onClick={() => setOverview((v) => !v)}
        title={t("overview")}
      >
        🗺
      </button>
    </div>
  );
}

/**
 * 盤面上の都市マーカー(legacyの `drawBoard` の city ノード描画)。
 * 影の楕円 → 都市のシンボル(1.25倍) → 円 → 中心の点 → 目的地リング → 都市名
 * という重ね順・座標・色はlegacyと同じ。
 */
/** その町を誰がどれだけ持っているか。 */
interface CityOwnership {
  readonly color: string;
  /** その町の物件を全部持っている(独占)。 */
  readonly isMonopoly: boolean;
}

function CityMarker({
  glyphSvg,
  isDestination,
  ownership,
}: {
  glyphSvg: string;
  isDestination: boolean;
  ownership?: CityOwnership;
}) {
  const scale = SIZES.cityGlyphScale;
  const glyphWidth = 24 * scale;

  return (
    <>
      <ellipse cx={0} cy={2} rx={SIZES.cityShadowRx} ry={SIZES.cityShadowRy} fill="#0e1626" opacity={0.35} />
      <g
        transform={`translate(${-glyphWidth / 2},${-6 - 24 * scale}) scale(${scale})`}
        stroke="#241a10"
        strokeWidth={0.75}
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: glyphSvg }}
      />
      {/* 持ち主の色。物件を1つでも買うと輪が付き、全部そろえると太い二重の輪になる。
          数字を見なくても、盤面が誰の色に染まってきたかが分かるようにするため。 */}
      {ownership && (
        // key に色と独占を含めることで、持ち主が変わった瞬間に要素が作り直され、
        // 輪が広がる演出がもう一度再生される(買ったことが目に留まるように)。
        <circle
          key={`${ownership.color}-${ownership.isMonopoly}`}
          className="own-ring"
          r={SIZES.cityRadius + (ownership.isMonopoly ? 4.5 : 3)}
          fill="none"
          stroke={ownership.color}
          strokeWidth={ownership.isMonopoly ? 5 : 3}
        />
      )}
      {ownership?.isMonopoly && (
        <circle r={SIZES.cityRadius + 8.5} fill="none" stroke={ownership.color} strokeWidth={1.5} opacity={0.7} />
      )}
      <circle r={SIZES.cityRadius} fill="#f6efe2" stroke="#241a10" strokeWidth={2.5} />
      <circle r={SIZES.cityInnerRadius} fill={ownership ? ownership.color : "#241a3f"} />
      {isDestination && (
        <circle r={SIZES.destRingRadius} fill="none" stroke="#f5b31c" strokeWidth={3.5} strokeDasharray="8 9" className="dest-ring" />
      )}
    </>
  );
}

/**
 * 折れ線を、角を丸めたパスにする。
 *
 * 地下鉄の路線図はどれも角が丸い。直角のまま折れると盤面が硬く見えるので、
 * 折れ点の手前と先を半径ぶん切り落として、そのあいだを二次曲線でつなぐ。
 * 脚が短いときは半径を縮める(切り落としすぎて線が消えないように)。
 */
function roundedPath(points: readonly { x: number; y: number }[], radius: number): string {
  if (points.length < 2) return "";
  const parts = [`M${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`];

  for (let i = 1; i < points.length - 1; i++) {
    const previous = points[i - 1];
    const corner = points[i];
    const next = points[i + 1];
    const inLength = Math.hypot(corner.x - previous.x, corner.y - previous.y);
    const outLength = Math.hypot(next.x - corner.x, next.y - corner.y);
    if (inLength < 0.01 || outLength < 0.01) continue;

    // 両隣の脚の半分を超えて切らない(隣の折れ点と食い合わないように)。
    const r = Math.min(radius, inLength / 2, outLength / 2);
    const enter = {
      x: corner.x - ((corner.x - previous.x) / inLength) * r,
      y: corner.y - ((corner.y - previous.y) / inLength) * r,
    };
    const leave = {
      x: corner.x + ((next.x - corner.x) / outLength) * r,
      y: corner.y + ((next.y - corner.y) / outLength) * r,
    };
    parts.push(`L${enter.x.toFixed(2)},${enter.y.toFixed(2)}`);
    parts.push(
      `Q${corner.x.toFixed(2)},${corner.y.toFixed(2)} ${leave.x.toFixed(2)},${leave.y.toFixed(2)}`,
    );
  }

  const last = points[points.length - 1];
  parts.push(`L${last.x.toFixed(2)},${last.y.toFixed(2)}`);
  return parts.join(" ");
}

/** 中間マス(クイズ/青/赤/カード)のマーカー(legacyの `SQUARE`/`TIER` の描画)。 */
function SquareMarker({ type }: { type: string }) {
  const style = SQUARE_STYLES[type];
  const color = style?.color ?? "#888";
  const glyph = style?.glyph ?? "";
  return (
    <>
      <rect
        x={-SIZES.squareHalf}
        y={-SIZES.squareHalf}
        width={SIZES.squareHalf * 2}
        height={SIZES.squareHalf * 2}
        rx={5.5}
        fill={color}
        stroke="#20180f"
        strokeWidth={2.5}
      />
      <text
        y={4.5}
        textAnchor="middle"
        fontSize={type === "quiz" ? 12 : 11}
        fontWeight={800}
        fill="#20180f"
        style={{ pointerEvents: "none" }}
      >
        {glyph}
      </text>
    </>
  );
}
