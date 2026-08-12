import { useMemo } from "react";
import { CityId, NodeId, cityIdToNodeId } from "../../domain/shared-kernel/ids";
import { Locale } from "../../domain/shared-kernel/localized-text";
import { isCityNode } from "../../domain/board/node";
import { GameEngineContext } from "../../application/game-engine-context";
import { CITY_FOOTPRINT, SIZES, SQUARE_FOOTPRINT } from "../components/board/board-metrics";
import { NodePosition } from "./use-board-layout";

/** 都市名ラベルの表示位置(都市マーカーからの相対座標)。 */
export interface CityLabelPlacement {
  readonly dx: number;
  readonly dy: number;
  readonly anchor: "start" | "middle" | "end";
}

interface Rect {
  readonly x0: number;
  readonly y0: number;
  readonly x1: number;
  readonly y1: number;
}

function overlaps(a: Rect, b: Rect): boolean {
  return a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
}

/**
 * 文字列の幅をem単位で見積もる。全角(CJK)は1em、その他は0.58emとして数える。
 * 実際に計測するにはDOMへの描画が要るため、ラベルの衝突判定にはこの近似で足りる。
 */
function estimateWidthEm(text: string): number {
  let em = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    const wide =
      (code >= 0x1100 && code <= 0x115f) ||
      (code >= 0x2e80 && code <= 0xa4cf) ||
      (code >= 0xac00 && code <= 0xd7a3) ||
      (code >= 0xf900 && code <= 0xfaff) ||
      (code >= 0xfe30 && code <= 0xfe6f) ||
      (code >= 0xff00 && code <= 0xff60);
    em += wide ? 1 : 0.58;
  }
  return em;
}

/**
 * ラベルを置ける候補位置。8方向 × 2段の距離を用意し、
 * 空いている場所を広く探せるようにする(候補が少ないと、少し混んだだけで
 * 置き場所が見つからずラベルが消えてしまう)。
 */
type Direction = "bottom" | "right" | "left" | "top" | "br" | "bl" | "tr" | "tl";

const DIRECTIONS: readonly Direction[] = ["bottom", "right", "left", "top", "br", "bl", "tr", "tl"];

/** その都市の既定位置に近い順で候補を並べる。 */
function candidateOrder(preferred: "left" | "right" | "bottom"): readonly Direction[] {
  const near: Record<"left" | "right" | "bottom", readonly Direction[]> = {
    bottom: ["bottom", "bl", "br", "right", "left", "tr", "tl", "top"],
    right: ["right", "br", "tr", "bottom", "top", "bl", "tl", "left"],
    left: ["left", "bl", "tl", "bottom", "top", "br", "tr", "right"],
  };
  return near[preferred] ?? DIRECTIONS;
}

function placementFor(direction: Direction, ring: number): CityLabelPlacement {
  const gapX = (SIZES.cityRadius + 5) * ring;
  const below = SIZES.cityRadius + 14 * ring;
  const above = CITY_FOOTPRINT.top - 4 * ring;
  switch (direction) {
    case "left":
      return { dx: -gapX, dy: 4, anchor: "end" };
    case "right":
      return { dx: gapX, dy: 4, anchor: "start" };
    case "top":
      return { dx: 0, dy: above, anchor: "middle" };
    case "br":
      return { dx: gapX * 0.8, dy: below * 0.85, anchor: "start" };
    case "bl":
      return { dx: -gapX * 0.8, dy: below * 0.85, anchor: "end" };
    case "tr":
      return { dx: gapX * 0.8, dy: above * 0.7, anchor: "start" };
    case "tl":
      return { dx: -gapX * 0.8, dy: above * 0.7, anchor: "end" };
    default:
      return { dx: 0, dy: below, anchor: "middle" };
  }
}

function labelRect(at: NodePosition, placement: CityLabelPlacement, widthUnits: number, fontUnits: number): Rect {
  const pad = fontUnits * 0.12;
  const x = at.x + placement.dx;
  const y = at.y + placement.dy;
  const x0 = placement.anchor === "middle" ? x - widthUnits / 2 : placement.anchor === "end" ? x - widthUnits : x;
  return {
    x0: x0 - pad,
    x1: x0 + widthUnits + pad,
    y0: y - fontUnits * 0.82 - pad,
    y1: y + fontUnits * 0.24 + pad,
  };
}

/**
 * 名札が盤面の外へはみ出していないか。
 *
 * 端の町の名札は、盤面の外に描かれても**そこは切り取られて見えない。**
 * 実際、カシュガルは「ashgar」、チェシメは「eşme」としか出ていなかった
 * (撮って気づいた。数字の検査には出ない)。
 *
 * 置き場所の候補は「既定 → 下 → 右 → 左 → 上」と順に試す作りなので、
 * **はみ出す候補を弾けば、自動的に内側を向いた位置が選ばれる。**
 * 盤面ごとに名札の向きを手で指定して回る必要はない。
 */
function insideBoard(rect: Rect, projection: { boardWidth: number; boardHeight: number }): boolean {
  return rect.x0 >= 0 && rect.x1 <= projection.boardWidth && rect.y0 >= 0 && rect.y1 <= projection.boardHeight;
}

export interface UseCityLabelsParams {
  context: GameEngineContext;
  positions: ReadonlyMap<NodeId, NodePosition>;
  /** ラベルの文字サイズ(盤面座標の単位)。画面上で一定サイズになるよう呼び出し側が算出する。 */
  fontUnits: number;
  locale: Locale;
  /** 目的地は常に表示する(他と重なっても隠さない)。 */
  destination: CityId;
}

/**
 * 都市名ラベルを、マーカーや他のラベルと重ならない位置に割り当てる。
 *
 * 都市数が増えると全ての名前を同時に出すことはできないため、地図アプリと同じく
 * **入るものだけを出す**方針をとる。優先度の高い都市から順に候補位置
 * (その都市の既定位置 → 下 → 右 → 左 → 上)を試し、どこにも置けない都市の
 * ラベルは省く。文字サイズは画面上で一定になるよう呼び出し側で決めているので、
 * ズームインすると相対的に小さくなり、隠れていたラベルが現れる。
 */
export function useCityLabels({
  context,
  positions,
  fontUnits,
  locale,
  destination,
}: UseCityLabelsParams): ReadonlyMap<CityId, CityLabelPlacement> {
  return useMemo(() => {
    const placed = new Map<CityId, CityLabelPlacement>();
    if (fontUnits <= 0) return placed;

    // 1. マーカーが専有する矩形を集める(ラベルはこれらを避ける)。
    const obstacles: Rect[] = [];
    for (const [id, node] of context.graph.nodes) {
      const at = positions.get(id);
      if (!at) continue;
      const box = isCityNode(node) ? CITY_FOOTPRINT : SQUARE_FOOTPRINT;
      obstacles.push({
        x0: at.x + box.left,
        x1: at.x + box.right,
        y0: at.y + box.top,
        y1: at.y + box.bottom,
      });
    }

    // 2. 目的地を最優先にし、あとはコンテンツの並び順(主要都市が先)で処理する。
    const cities = [...context.content.cities].sort((a, b) => {
      if (a.id === destination) return -1;
      if (b.id === destination) return 1;
      return 0;
    });

    const placedRects: Rect[] = [];
    for (const city of cities) {
      const at = positions.get(cityIdToNodeId(city.id));
      if (!at) continue;
      const text = city.name[locale];
      if (!text) continue;
      const widthUnits = estimateWidthEm(text) * fontUnits;

      let chosen: CityLabelPlacement | null = null;
      outer: for (const ring of [1, 1.9]) {
        for (const direction of candidateOrder(city.labelPosition)) {
          const placement = placementFor(direction, ring);
          const rect = labelRect(at, placement, widthUnits, fontUnits);
          if (!insideBoard(rect, context.content.projection)) continue;
          if (obstacles.some((o) => overlaps(rect, o))) continue;
          if (placedRects.some((o) => overlaps(rect, o))) continue;
          chosen = placement;
          placedRects.push(rect);
          break outer;
        }
      }

      // 目的地はどこにも置けなくても既定位置に出す(行き先を見失わないため)。
      if (!chosen && city.id === destination) {
        chosen = placementFor(city.labelPosition, 1);
        placedRects.push(labelRect(at, chosen, widthUnits, fontUnits));
      }
      if (chosen) placed.set(city.id, chosen);
    }
    return placed;
  }, [context, positions, fontUnits, locale, destination]);
}
