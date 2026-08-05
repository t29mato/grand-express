"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NodeId } from "../../../domain/shared-kernel/ids";
import { isCityNode } from "../../../domain/board/node";
import { City } from "../../../domain/board/city";
import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useBoardLayout } from "../../hooks/use-board-layout";
import { useCamera } from "../../hooks/use-camera";
import { useLocale } from "../../i18n/locale-context";
import { TerrainLayer } from "./terrain-layer";
import { BoardLegend } from "./board-legend";

const PLAYER_COLORS = ["#e8447a", "#f5b31c", "#37b3a4", "#7bc86c"];

/** 追尾時の視野幅(現行コードの `FOLLOW_W`)。 */
const FOLLOW_WIDTH = 520;

/** 路線の3層描画(現行コードの `drawBoard` のレール描画と同じ色・線幅)。 */
const RAIL_LAYERS: readonly { stroke: string; width: number; dash?: string; opacity?: number }[] = [
  { stroke: "#20180f", width: 11, opacity: 0.55 },
  { stroke: "#e6dcc6", width: 6 },
  { stroke: "#3b3123", width: 6, dash: "1.5 10" },
];

/** 中間マスの色と記号(現行コードの `SQUARE` / `TIER`)。 */
const SQUARE_STYLES: Record<string, { color: string; glyph: string }> = {
  blue: { color: "#5b8fe8", glyph: "+" },
  red: { color: "#e05252", glyph: "−" },
  card: { color: "#f5d31c", glyph: "★" },
};
const TIER_COLORS: Record<string, string> = { low: "#37b3a4", mid: "#f5b31c", high: "#e8447a" };

export interface BoardViewProps {
  context: GameEngineContext;
  session: GameSession;
  reachable: ReadonlySet<NodeId> | null;
  onChooseNode?: (id: NodeId) => void;
}

export function BoardView({ context, session, reachable, onChooseNode }: BoardViewProps) {
  const positions = useBoardLayout(context);
  const { tx, t } = useLocale();
  const { boardWidth, boardHeight } = context.content.projection;
  const { viewBox, animateTo, panByPixels, zoomBy, stopAnimation } = useCamera({ boardWidth, boardHeight });
  const [overview, setOverview] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  // ドラッグ中の直前のポインタ位置。null ならドラッグしていない。
  const dragRef = useRef<{ x: number; y: number; pointerId: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  const activeLocation = currentPlayer(session).location;

  // 手番のプレイヤーを追尾する(現行コードの `focusNode`)。全体表示モードなら盤面全体を映す。
  useEffect(() => {
    if (overview) {
      animateTo(boardWidth / 2, boardHeight / 2, boardWidth + 60);
      return;
    }
    const pos = positions.get(activeLocation);
    if (pos) animateTo(pos.x, pos.y, FOLLOW_WIDTH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLocation, overview, boardWidth, boardHeight, positions]);

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

  const edges = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (const [id, neighbors] of context.graph.adjacency) {
      const from = positions.get(id);
      if (!from) continue;
      for (const neighborId of neighbors) {
        if (neighborId <= id) continue; // 重複を避ける(双方向なので片方だけ描画)
        const to = positions.get(neighborId);
        if (!to) continue;
        lines.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
      }
    }
    return lines;
  }, [context, positions]);

  const tokensByNode = useMemo(() => {
    const map = new Map<string, { name: string; color: string }[]>();
    session.players.forEach((p, i) => {
      const list = map.get(p.location) ?? [];
      list.push({ name: p.name, color: PLAYER_COLORS[i % PLAYER_COLORS.length] });
      map.set(p.location, list);
    });
    return map;
  }, [session.players]);

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className={`board-svg${dragging ? " dragging" : ""}`}
        role="img"
        aria-label="Game board"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <TerrainLayer terrain={context.content.terrain} projection={context.content.projection} />
        {/* 路線。legacyの `drawBoard` と同じく、暗い縁取り→明るいレール→枕木のダッシュ
            という3層で描く。legacyは路線1本ずつ3層を重ねるが、ここでは層ごとに
            まとめて描くことで、隣り合う路線の縁取りが手前の路線を欠けさせないようにしている
            (都市の合流点は都市のシンボルが上に載るため見た目の差は出ない)。 */}
        <g className="edges">
          {RAIL_LAYERS.map((layer, layerIndex) => (
            <g key={layerIndex}>
              {edges.map((line, i) => (
                <line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
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
                onClick={isChoosable ? () => onChooseNode?.(id) : undefined}
                style={{ cursor: isChoosable ? "pointer" : "inherit" }}
              >
                {isChoosable && <circle r={20} className="halo" fill="#f5b31c" opacity={0.6} />}
                {isCityNode(node) ? (
                  <CityMarker
                    city={context.getCity(node.cityId)}
                    glyphSvg={context.content.artGlyphs[context.getCity(node.cityId).artGlyphKey] ?? ""}
                    label={tx(context.getCity(node.cityId).name)}
                    isDestination={isDestination}
                  />
                ) : (
                  <SquareMarker type={node.type} tier={node.type === "quiz" ? node.tier : undefined} />
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
              <circle
                key={token.name}
                className="token"
                cx={pos.x + (i - (tokens.length - 1) / 2) * 10}
                cy={pos.y}
                r={5}
                fill={token.color}
                stroke="#1b1330"
                strokeWidth={2}
              />
            ));
          })}
        </g>
        <BoardLegend boardWidth={boardWidth} boardHeight={boardHeight} currency={context.content.currency} />
      </svg>
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
function CityMarker({
  city,
  glyphSvg,
  label,
  isDestination,
}: {
  city: City;
  glyphSvg: string;
  label: string;
  isDestination: boolean;
}) {
  const scale = 1.25;
  const glyphWidth = 24 * scale;
  const labelX = city.labelPosition === "left" ? -17 : city.labelPosition === "right" ? 17 : 0;
  const labelY = city.labelPosition === "bottom" ? 27 : 5;
  const anchor = city.labelPosition === "left" ? "end" : city.labelPosition === "right" ? "start" : "middle";

  return (
    <>
      <ellipse cx={0} cy={2} rx={19} ry={7} fill="#0e1626" opacity={0.35} />
      <g
        transform={`translate(${-glyphWidth / 2},${-6 - 24 * scale}) scale(${scale})`}
        stroke="#241a10"
        strokeWidth={0.75}
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: glyphSvg }}
      />
      <circle r={11} fill="#f6efe2" stroke="#241a10" strokeWidth={3} />
      <circle r={4} fill="#241a3f" />
      {isDestination && (
        <circle r={26} fill="none" stroke="#f5b31c" strokeWidth={4} strokeDasharray="8 9" className="dest-ring" />
      )}
      <text className="city-label" x={labelX} y={labelY} textAnchor={anchor}>
        {label}
      </text>
    </>
  );
}

/** 中間マス(クイズ/青/赤/カード)のマーカー(legacyの `SQUARE`/`TIER` の描画)。 */
function SquareMarker({ type, tier }: { type: string; tier?: string }) {
  const style = SQUARE_STYLES[type];
  const color = type === "quiz" ? (TIER_COLORS[tier ?? "low"] ?? "#37b3a4") : (style?.color ?? "#888");
  const glyph = type === "quiz" ? "?" : (style?.glyph ?? "");
  return (
    <>
      <rect x={-11} y={-11} width={22} height={22} rx={6.5} fill={color} stroke="#20180f" strokeWidth={3} />
      <text
        y={5.5}
        textAnchor="middle"
        fontSize={type === "quiz" ? 14 : 13}
        fontWeight={800}
        fill="#20180f"
        style={{ pointerEvents: "none" }}
      >
        {glyph}
      </text>
    </>
  );
}
