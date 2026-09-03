import { useMemo } from "react";
import { CityId, NodeId, cityIdToNodeId } from "../../domain/shared-kernel/ids";
import { Locale } from "../../domain/shared-kernel/localized-text";
import { isCityNode } from "../../domain/board/node";
import { GameEngineContext } from "../../application/game-engine-context";
import {
  CITY_GLYPH_BASE_UNITS,
  SIZES,
  SQUARE_FOOTPRINT,
  cityFootprint,
} from "../components/board/board-metrics";
import { NodePosition } from "./use-board-layout";

/** 都市名ラベルの表示位置(都市マーカーからの相対座標)。 */
export interface CityLabelPlacement {
  readonly dx: number;
  readonly dy: number;
  readonly anchor: "start" | "middle" | "end";
  /**
   * 「一言」(`City.tag`)を出す場所。**出さないときは undefined。**
   *
   * 名前と同じ当たり判定にかけ、空いていなければ付けない。
   * 一言のほうが名前より長いので、無理に置くと地図が文字で埋まる。
   */
  readonly tag?: TagPlacement;
}

/** 一言の置き場所。名札のすぐ外側に、ひとまわり小さい字で置く。 */
export interface TagPlacement {
  readonly dx: number;
  readonly dy: number;
  readonly anchor: "start" | "middle" | "end";
  readonly fontUnits: number;
  /** 見積もった文字幅(盤面座標の単位)。下敷きの札をこの幅で描く。 */
  readonly widthUnits: number;
}

/** 一言の字の大きさ(名札に対する比)。名前より前に出ないように小さくする。 */
const TAG_FONT_RATIO = 0.76;

/**
 * 一度に出す一言の上限。
 *
 * 行き先の候補は実測で2〜15件あり、その全部が町だった場合に
 * 全部へ一言を付けると、選ぶ前に地図が読めなくなる。
 * 優先順(目的地 → いま居る町 → 候補)の先頭から数えて打ち切る。
 */
const MAX_TAGS = 5;

export interface Rect {
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
export function estimateWidthEm(text: string): number {
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

/**
 * 置き場所ひとつぶんの相対座標。
 *
 * `glyphTop` は都市シンボルの上端(中心からの相対、負の値)。**印の大きさは
 * 縮尺で変わる**ので固定値にできない。上に置く候補はこの上端から逃がす。
 */
function placementFor(direction: Direction, ring: number, glyphTop: number): CityLabelPlacement {
  const gapX = (SIZES.cityRadius + 5) * ring;
  const below = SIZES.cityRadius + 14 * ring;
  const above = glyphTop - 4 * ring;
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

export function labelRect(at: NodePosition, placement: CityLabelPlacement, widthUnits: number, fontUnits: number): Rect {
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
export function insideBoard(rect: Rect, projection: { boardWidth: number; boardHeight: number }): boolean {
  return rect.x0 >= 0 && rect.x1 <= projection.boardWidth && rect.y0 >= 0 && rect.y1 <= projection.boardHeight;
}

/** 地形の地名(`terrain-layer.tsx` が描く文字)の矩形。文字の大きさはあちらと揃える。 */
const TERRAIN_LABEL_FONT_UNITS = 19;
const WATER_LABEL_FONT_UNITS = 15;
const TERRAIN_LABEL_LETTER_SPACING = 2;

export function terrainLabelRects(context: GameEngineContext, locale: Locale): readonly Rect[] {
  const { projection, terrain } = context.content;
  const px = (lon: number) => ((lon - projection.lon0) / (projection.lon1 - projection.lon0)) * projection.boardWidth;
  const py = (lat: number) => ((lat - projection.lat0) / (projection.lat1 - projection.lat0)) * projection.boardHeight;
  const rects: Rect[] = [];
  for (const [lon, lat, text, isWater] of terrain.labels) {
    const label = text[locale] ?? text.en;
    if (!label) continue;
    const fontUnits = isWater ? WATER_LABEL_FONT_UNITS : TERRAIN_LABEL_FONT_UNITS;
    const spacing = isWater ? 0 : TERRAIN_LABEL_LETTER_SPACING * [...label].length;
    const widthUnits = estimateWidthEm(label) * fontUnits + spacing;
    rects.push(labelRect({ x: px(lon), y: py(lat) }, { dx: 0, dy: 0, anchor: "middle" }, widthUnits, fontUnits));
  }
  return rects;
}

export interface UseCityLabelsParams {
  context: GameEngineContext;
  positions: ReadonlyMap<NodeId, NodePosition>;
  /** ラベルの文字サイズ(盤面座標の単位)。画面上で一定サイズになるよう呼び出し側が算出する。 */
  fontUnits: number;
  locale: Locale;
  /** 目的地は常に表示する(他と重なっても隠さない)。 */
  destination: CityId;
  /**
   * 都市シンボルの一辺(盤面座標の単位)。縮尺で変わるので呼び出し側が渡す。
   * 名札はこの大きさの矩形を避ける(避けないと名前が絵の上に乗る)。
   */
  glyphUnits?: number;
  /**
   * **一言を出す町**を、出したい順に並べたもの。ここに無い町には一言を付けない。
   *
   * 全部の町に付けると地図が文字だらけになる(実測: 茨城の全体表示で
   * 都市名30件が全部出ている。そこに一言を足すと文字量が3倍になる)。
   * 「いま関係のある町」だけに絞るのは呼び出し側の判断。
   */
  tagCityIds?: readonly CityId[];
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
  glyphUnits = CITY_GLYPH_BASE_UNITS,
  tagCityIds,
}: UseCityLabelsParams): ReadonlyMap<CityId, CityLabelPlacement> {
  // 配列をそのまま依存に入れると毎描画で作り直しになるので、中身で比べる。
  const tagKey = tagCityIds ? tagCityIds.join("|") : "";
  return useMemo(() => {
    const placed = new Map<CityId, CityLabelPlacement>();
    if (!(fontUnits > 0)) return placed;
    const cityBox = cityFootprint(glyphUnits);

    // 1. マーカーが専有する矩形を集める(ラベルはこれらを避ける)。
    //
    //    **都市は2つに分ける。** 印(絵)は丸の上に乗っていて、丸そのものより
    //    ずっと幅がある。ひとつの箱で囲うと、絵の高さの帯が丸の左右にも
    //    広がってしまい、印を大きくしたとたん「左」「右」の置き場所が
    //    どの町でも塞がる(計測: 世界一周の追従で名札が38→30件に減った)。
    //    絵の箱と丸の箱を別々に置けば、丸の高さに来る名札は絵に邪魔されない。
    const cityMarkerRects: Rect[] = [];
    const squareRects: Rect[] = [];
    const dotHalf = SIZES.cityRadius + 3;
    for (const [id, node] of context.graph.nodes) {
      const at = positions.get(id);
      if (!at) continue;
      if (isCityNode(node)) {
        // 印(丸の上)
        cityMarkerRects.push({
          x0: at.x + cityBox.left,
          x1: at.x + cityBox.right,
          y0: at.y + cityBox.top,
          y1: at.y - 6,
        });
        // 丸そのもの
        cityMarkerRects.push({
          x0: at.x - dotHalf,
          x1: at.x + dotHalf,
          y0: at.y - dotHalf,
          y1: at.y + cityBox.bottom,
        });
        continue;
      }
      squareRects.push({
        x0: at.x + SQUARE_FOOTPRINT.left,
        x1: at.x + SQUARE_FOOTPRINT.right,
        y0: at.y + SQUARE_FOOTPRINT.top,
        y1: at.y + SQUARE_FOOTPRINT.bottom,
      });
    }
    // 地図の書き込み(山脈・海の名前)も避ける。**高山の名札が「日本アルプス」の
    // 文字に重なって読めなかった**(実プレイで観察)。地形の文字は盤面座標で
    // 大きさが固定なので、そのまま矩形にできる。
    const terrainRects = terrainLabelRects(context, locale);
    const obstacles: Rect[] = [...cityMarkerRects, ...squareRects, ...terrainRects];

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
          const placement = placementFor(direction, ring, cityBox.top);
          const rect = labelRect(at, placement, widthUnits, fontUnits);
          if (!insideBoard(rect, context.content.projection)) continue;
          if (obstacles.some((o) => overlaps(rect, o))) continue;
          if (placedRects.some((o) => overlaps(rect, o))) continue;
          chosen = placement;
          placedRects.push(rect);
          break outer;
        }
      }

      // 目的地はどこにも置けなくても出す(行き先を見失わないため)。
      // **ただし盤面の外へは出さない。**外に描かれた名札はそこで切り取られ、
      // 「stov-on-Don」のように読めなくなる(ロストフ・ナ・ドヌが目的地に
      // なったときに実際に起きた)。重なりは許すが、はみ出しは許さない。
      if (!chosen && city.id === destination) {
        chosen =
          candidateOrder(city.labelPosition)
            .map((direction) => placementFor(direction, 1, cityBox.top))
            .find((placement) =>
              insideBoard(labelRect(at, placement, widthUnits, fontUnits), context.content.projection),
            ) ?? placementFor(city.labelPosition, 1, cityBox.top);
        placedRects.push(labelRect(at, chosen, widthUnits, fontUnits));
      }
      if (chosen) placed.set(city.id, chosen);
    }

    // 3. 一言(`City.tag`)を足す。**名前を全部置き終えてから。**
    //    先に混ぜると、一言のほうが長いぶん、どこかの町の名前を押しのけてしまう。
    //    名前が出ていない町には付けない(名無しの説明文だけが浮くことになる)。
    //
    //    **一言だけは中間マスを避けない。** 一言は名前の3〜5倍の長さがあり
    //    (「A garden opened to everyone」で名札の約4倍)、
    //    盤面には20単位おきに中間マスが並んでいるので、マスを避ける条件を付けると
    //    **どの町でも置き場所が見つからない**(実際に水戸で1件も出なかった)。
    //    一言は地図の書き込みではなく吹き出しなので、下敷きの札を敷いて
    //    マスの上に重ねる。避けるのは**文字と町の印**——読めなくなるのはそこだけ。
    const textObstacles: Rect[] = [...cityMarkerRects, ...terrainRects];
    let tagsLeft = MAX_TAGS;
    for (const cityId of tagCityIds ?? []) {
      if (tagsLeft <= 0) break;
      const placement = placed.get(cityId);
      if (!placement) continue;
      const at = positions.get(cityIdToNodeId(cityId));
      if (!at) continue;
      const city = context.content.cities.find((c) => c.id === cityId);
      const text = city?.tag[locale];
      if (!text) continue;

      const tagFont = fontUnits * TAG_FONT_RATIO;
      const tagWidth = estimateWidthEm(text) * tagFont;
      // 名札のさらに外側へ。名札が町より上にあるなら上へ、それ以外は下へ。
      // 逆向きに置くと、一言が名前と印のあいだに割り込んで両方読みにくくなる。
      const outward = placement.dy <= cityBox.top / 2 ? -1 : 1;
      // 外側を優先しつつ、詰まっていたら反対側と、もう一段外も試す。
      // **全体表示では一言が長い帯になる**(字が盤面座標では大きくなるため、
      // 27字の一言は茨城の全体表示で約357単位=画面154px)。1か所しか試さないと、
      // 他の町の名前に当たって目的地の一言すら出せない(実際に0件だった)。
      const offsets = [outward, outward * 1.6, -outward, outward * 2.4, -outward * 1.6];
      let chosenTag: TagPlacement | null = null;
      for (const step of offsets) {
        const candidate: TagPlacement = {
          dx: placement.dx,
          dy: placement.dy + fontUnits * 1.06 * step,
          anchor: placement.anchor,
          fontUnits: tagFont,
          widthUnits: tagWidth,
        };
        const rect = labelRect(at, candidate, tagWidth, tagFont);
        if (!insideBoard(rect, context.content.projection)) continue;
        if (textObstacles.some((o) => overlaps(rect, o))) continue;
        if (placedRects.some((o) => overlaps(rect, o))) continue;
        chosenTag = candidate;
        placedRects.push(rect);
        break;
      }
      if (chosenTag) {
        placed.set(cityId, { ...placement, tag: chosenTag });
        tagsLeft--;
      }
    }
    return placed;
    // `tagCityIds` は毎描画で新しい配列が来るので、中身から作った鍵で比べる。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, positions, fontUnits, locale, destination, glyphUnits, tagKey]);
}
