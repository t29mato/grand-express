/**
 * 地図帳(Atlas)のデータ層。**画面はここだけを見ればよい。**
 *
 * 1枚の世界地図を、引けば全球・寄れば盤面・もっと寄れば町、と見せるための
 * 材料をそろえる。React にもブラウザAPIにも依存しない純粋な関数だけを置く。
 *
 * ```ts
 * import { atlasBoards, boardsAt, coverageGaps, loadAtlasCities, worldLand } from "../atlas/atlas-model";
 * ```
 *
 * ## 何がどこにあるか
 *
 * | 使うもの | 中身 |
 * |---|---|
 * | `worldLand` `worldColors` `worldLabels` | 世界地図の下敷き(`atlas-world-map.ts`) |
 * | `atlasBoards` `atlasBoard` `boardsAt` | 盤面47枚と、その一点を含む盤面(`atlas-boards.ts`) |
 * | `coverageGaps` `coverageReport` `isLand` | まだ国の盤面が無い場所(`atlas-coverage.ts`) |
 * | `loadAtlasCities` `loadAtlasCity` | 町(寄ったときだけ読む。`atlas-cities.ts`) |
 * | `loadAtlasLinks` | 町と町をつなぐ線路・航路(寄ったときだけ読む。`atlas-links.ts`) |
 * | `loadBoardLand` | 盤面の海岸線・地形帯・湖・川・飾り(寄ったときだけ読む。`atlas-board-land.ts`) |
 *
 * **この入口は再輸出だけを行う。**実装から入口を参照すると循環参照になり、
 * `npm run depcruise` の `no-circular` で落ちる。
 */

export type {
  AtlasBoard,
  AtlasBoardDecor,
  AtlasBoardLand,
  AtlasBounds,
  AtlasCity,
  AtlasLabel,
  AtlasLake,
  AtlasLink,
  AtlasLinkKind,
  AtlasPolygon,
  AtlasScale,
  AtlasTerrainBand,
} from "./atlas-types";
export { ATLAS_MARK_VIEW_BOX } from "./atlas-types";

export { atlasBoard, atlasBoards, boardsAt } from "./atlas-boards";
export { worldColors, worldLabels, worldLand } from "./atlas-world-map";
export { coverageGaps, coverageReport, isLand } from "./atlas-coverage";
export type { CoverageReport } from "./atlas-coverage";
export { loadAtlasCities, loadAtlasCity } from "./atlas-cities";
export { loadAtlasLinks } from "./atlas-links";
export { loadBoardLand } from "./atlas-board-land";
export {
  boundsArea,
  boundsContain,
  boundsLatSpan,
  boundsLonSpan,
  normalizeLongitude,
} from "./geo";
