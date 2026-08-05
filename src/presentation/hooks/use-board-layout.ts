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
 * 都市は経度緯度から投影し、路線上の中間マスは両端の都市を線形補間して配置したうえで、
 * 現行コードと同じ規則で路線に垂直な向きへずらす(jitter)。
 *
 * このずれは見た目の変化だけでなく、**同じ都市から似た方向へ延びる路線の中間マスが
 * 重なるのを防ぐ**役割がある(路線番号 `ei` に依存してずれ幅が変わるため、
 * 平行に近い路線同士が離れる)。当初は簡略化して直線配置にしていたが、
 * 都市を増やしたことでマスの重なりが目立つようになったため復元した。
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
      const edgeIndex = Number(match[1]);
      const k = Number(match[2]);
      const n = siblingCounts.get(`e${match[1]}_`) ?? 1;
      const t = k / (n + 1);
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const length = Math.hypot(dx, dy) || 1;
      // 現行コードの `((ei*7+k*13)%5-2)*5`。ずれ幅の単位は盤面の縮尺に追従させるため、
      // 固定値ではなく中間マスの目安距離(seg)から導く(legacyのseg=48で約4.8)。
      const jitterUnit = (projection.segmentLength ?? 64) / 10;
      const jitter = (((edgeIndex * 7 + k * 13) % 5) - 2) * jitterUnit;
      positions.set(id, {
        x: a.x + dx * t + (-dy / length) * jitter,
        y: a.y + dy * t + (dx / length) * jitter,
      });
    }
    return positions;
  }, [context]);
}
