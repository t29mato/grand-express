import {
  atlasBoards,
  boardsAt,
  coverageGaps,
  loadAtlasCities,
  loadBoardLand,
  worldColors,
  worldLabels,
  worldLand,
} from "../../atlas/atlas-model";
import type { AtlasSource } from "./atlas-source";

/**
 * 注文書(`atlas-source.ts`)と実物(`src/presentation/atlas/atlas-model.ts`)の
 * つなぎ目。**画面のうちデータ層を直に読むのはこの1ファイルだけ。**
 *
 * ここで `AtlasSource` として受けているので、実物の形が注文と食い違ったら
 * **この行が型で落ちる。**画面のあちこちが赤くなるより原因が分かりやすい。
 */
export const liveAtlasSource: AtlasSource = {
  atlasBoards,
  worldLand,
  worldColors,
  worldLabels,
  boardsAt,
  coverageGaps,
  loadAtlasCities,
  loadBoardLand,
};
