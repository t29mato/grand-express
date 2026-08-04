"use client";

import { useMemo } from "react";
import { NodeId } from "../../../domain/shared-kernel/ids";
import { isCityNode } from "../../../domain/board/node";
import { GameSession } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useBoardLayout } from "../../hooks/use-board-layout";
import { useLocale } from "../../i18n/locale-context";

const PLAYER_COLORS = ["#e8447a", "#f5b31c", "#37b3a4", "#7bc86c"];
const NODE_COLORS: Record<string, string> = {
  city: "#f6efe2",
  quiz: "#5b8fe8",
  blue: "#5b8fe8",
  red: "#e05252",
  card: "#f5d31c",
};

export interface BoardViewProps {
  context: GameEngineContext;
  session: GameSession;
  reachable: ReadonlySet<NodeId> | null;
  onChooseNode?: (id: NodeId) => void;
}

export function BoardView({ context, session, reachable, onChooseNode }: BoardViewProps) {
  const positions = useBoardLayout(context);
  const { tx } = useLocale();
  const { boardWidth, boardHeight } = context.content.projection;

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
    <svg
      viewBox={`0 0 ${boardWidth} ${boardHeight}`}
      className="board-svg"
      role="img"
      aria-label="Game board"
    >
      <g className="edges">
        {edges.map((line, i) => (
          <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#4a3b7d" strokeWidth={3} />
        ))}
      </g>
      <g className="nodes">
        {[...context.graph.nodes].map(([id, node]) => {
          const pos = positions.get(id);
          if (!pos) return null;
          const isDestination = isCityNode(node) && node.cityId === session.destination;
          const isChoosable = reachable?.has(id) ?? false;
          const radius = isCityNode(node) ? 14 : 7;
          return (
            <g
              key={id}
              transform={`translate(${pos.x}, ${pos.y})`}
              onClick={isChoosable ? () => onChooseNode?.(id) : undefined}
              style={{ cursor: isChoosable ? "pointer" : "default" }}
            >
              {isChoosable && <circle r={radius + 8} className="halo" fill="#f5b31c" opacity={0.6} />}
              <circle
                r={radius}
                fill={NODE_COLORS[node.type] ?? "#888"}
                stroke={isDestination ? "#f5b31c" : "#241a3f"}
                strokeWidth={isDestination ? 4 : 1.5}
              />
              {isCityNode(node) && (
                <text y={-radius - 6} textAnchor="middle" className="city-label">
                  {tx(context.getCity(node.cityId).name)}
                </text>
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
    </svg>
  );
}
