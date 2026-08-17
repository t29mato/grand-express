import { CityId, NodeId, cityIdToNodeId } from "../domain/shared-kernel/ids";
import { BoardGraph } from "../domain/board/board-graph";
import { buildBoardGraph } from "../domain/board/board-graph-builder";
import { PathfindingService } from "../domain/board/pathfinding-service";
import { BoardNode } from "../domain/board/node";
import { City } from "../domain/board/city";
import { CountryContentPack, getCityOrThrow } from "../domain/country/country-content-pack";

/**
 * 1つの `CountryContentPack` から導出される、複数のユースケースで共有される
 * 読み取り専用のコンテキスト(盤面グラフ・経路探索・都市/マスの参照)。
 */
export interface GameEngineContext {
  readonly content: CountryContentPack;
  readonly graph: BoardGraph;
  readonly pathfinding: PathfindingService;
  getCity(id: CityId): City;
  getNode(id: NodeId): BoardNode;
  /** ノードから都市(目的地)までの距離。プレイヤーの現在地→目的地の判定に使う。 */
  distanceToCity(from: NodeId, to: CityId): number;
}

export function createGameEngineContext(content: CountryContentPack): GameEngineContext {
  // 出発地を渡すと、その周りの出来事マスが薄くなる(序盤に走り出す間を作るため)。
  const graph = buildBoardGraph(content.cities, content.edges, content.projection, content.startCityId);
  const pathfinding = new PathfindingService(graph);
  return {
    content,
    graph,
    pathfinding,
    getCity: (id) => getCityOrThrow(content, id),
    getNode: (id) => {
      const node = graph.nodes.get(id);
      if (!node) throw new Error(`Unknown node: ${id}`);
      return node;
    },
    distanceToCity: (from, to) => pathfinding.distance(from, cityIdToNodeId(to)),
  };
}
