import { useMemo } from "react";
import { NodeId } from "../../domain/shared-kernel/ids";
import { isCityNode } from "../../domain/board/node";
import { GameEngineContext } from "../../application/game-engine-context";

export interface NodePosition {
  readonly x: number;
  readonly y: number;
}

/**
 * 盤面ノードのSVG座標を計算する(Presentation層の責務。ADR-0003)。
 * 都市は経度緯度から投影し、路線上の中間マスは両端の都市を線形補間して配置する
 * (見た目の湾曲(jitter)は現行コードにはあるが、ここでは簡略化して直線配置とする)。
 */
export function useBoardLayout(context: GameEngineContext): ReadonlyMap<NodeId, NodePosition> {
  return useMemo(() => {
    const { projection } = context.content;
    const projectX = (lon: number) => ((lon - projection.lon0) / (projection.lon1 - projection.lon0)) * projection.boardWidth;
    const projectY = (lat: number) => ((lat - projection.lat0) / (projection.lat1 - projection.lat0)) * projection.boardHeight;

    const cityPositions = new Map<string, NodePosition>();
    for (const city of context.content.cities) {
      cityPositions.set(city.id, { x: projectX(city.longitude), y: projectY(city.latitude) });
    }

    // 同じ路線(e{edgeIndex}_*)に属する中間マスの総数を数え、t=k/(n+1)で線形補間する。
    const siblingCounts = new Map<string, number>();
    for (const id of context.graph.nodes.keys()) {
      const match = /^e(\d+)_(\d+)$/.exec(id);
      if (!match) continue;
      const prefix = `e${match[1]}_`;
      siblingCounts.set(prefix, (siblingCounts.get(prefix) ?? 0) + 1);
    }

    const positions = new Map<NodeId, NodePosition>();
    for (const [id, node] of context.graph.nodes) {
      if (isCityNode(node)) {
        positions.set(id, cityPositions.get(node.cityId)!);
        continue;
      }
      const match = /^e(\d+)_(\d+)$/.exec(id);
      const [cityAId, cityBId] = node.between;
      const a = cityPositions.get(cityAId)!;
      const b = cityPositions.get(cityBId)!;
      if (!match) {
        positions.set(id, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
        continue;
      }
      const k = Number(match[2]);
      const n = siblingCounts.get(`e${match[1]}_`) ?? 1;
      const t = k / (n + 1);
      positions.set(id, { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
    return positions;
  }, [context]);
}
