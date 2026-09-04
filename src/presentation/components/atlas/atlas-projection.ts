import type { AtlasBoard, AtlasBounds, AtlasPolygon } from "./atlas-source";

/**
 * 地図帳の座標まわり。**ここは全部ただの関数**にしてある(描画も状態も持たない)。
 *
 * ## 平面のとりかた
 *
 * 正距円筒。**平面の座標は度そのもの**にする——`x = 経度`, `y = -緯度`。
 * 拡大率という数を別に持たず、「いま何度ぶん見えているか」(`span`)だけを持つ。
 * 画面の見た目の大きさが要るところは `span` と枠の幅から都度出す。
 *
 * ## NaN を外に出さない
 *
 * 地図の計算は割り算と `Math.min/max` だらけで、**枠がまだ測れていない一瞬**や
 * **空配列**から簡単に NaN と Infinity が出る。`viewBox` に NaN が入っても
 * 画面は黙って何も描かないだけなので、目では気づけない
 * (`use-camera.ts` が同じことで一度やられている)。
 * ここでは外に出す値をすべて `Number.isFinite` で確かめ、
 * 駄目なら**世界ぜんぶ**に落とす。
 */

/**
 * いちばん寄ったところ。0.25度 ≒ 東西28km。県や島の盤面(茨城・バリ)の
 * 細かさに合わせた値で、**どの盤面でもここまで寄れるという意味ではない。**
 * 実際に止まる位置は、いま真下にある盤面で決まる(`minSpanForBoard`)。
 */
export const MIN_SPAN = 0.25;
/** いちばん引いたところ。世界ぜんぶ。 */
export const MAX_SPAN = 360;
/**
 * 縦に動ける範囲。
 *
 * **地図の中身は南極まで無い。**下敷きにしている世界一周盤の陸地は
 * 緯度 78〜-56 までしか描かれていないので、±90 まで動けるようにすると
 * 何も無い海だけの眺めへ落ちていける。中身のあるところに合わせて止める。
 */
export const LAT_NORTH = 84;
export const LAT_SOUTH = -60;
/**
 * **南極大陸は地図に無い。**世界一周盤の陸地は緯度78〜-56までで、南極の輪郭を
 * 1点も持っていない(47枚のどの盤面にも入っていない)。
 *
 * 描けるようになる当てが無いのに ±90 まで動けるようにすると、**大陸があるはずの
 * ところに何も無い海が広がる**——これは「まだ盤面が無い陸」ではなく
 * 「そもそも地図に無い」という別の意味で、斜線の凡例では言えない。
 * 中身のあるところで止めれば、少なくとも嘘は言わない。
 * 南極に盤面を作る予定は無いので、ここは**割り切って止める**ことにしてある。
 */
/** 引ききったときに縦の中心に置く緯度。中身の真ん中。 */
export const LAT_MID = (LAT_NORTH + LAT_SOUTH) / 2;

export interface AtlasView {
  /** 画面の中心の経度。 */
  readonly lon: number;
  /** 画面の中心の緯度。 */
  readonly lat: number;
  /** 横に見えている経度の幅(度)。 */
  readonly span: number;
}

export const WORLD_VIEW: AtlasView = { lon: 10, lat: 22, span: MAX_SPAN };

export interface PlaneRect {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

const finite = (n: number): boolean => Number.isFinite(n);

/** 枠の縦横比(幅÷高さ)。測れていないときは 16:9 とみなす。 */
export function safeAspect(width: number, height: number): number {
  if (!finite(width) || !finite(height) || width <= 0 || height <= 0) return 16 / 9;
  return width / height;
}

export function clampSpan(span: number): number {
  if (!finite(span)) return MAX_SPAN;
  return Math.max(MIN_SPAN, Math.min(MAX_SPAN, span));
}

/** 縦に見えている緯度の幅(度)。 */
export function spanHeight(span: number, aspect: number): number {
  const a = aspect > 0 && finite(aspect) ? aspect : 16 / 9;
  return clampSpan(span) / a;
}

/**
 * 中心を、地図から落ちない範囲へ収める。
 *
 * `use-camera.ts` の `clampAxis` と同じ考えかた——**見えている範囲のほうが
 * 広い軸は中央に置く**(引ききったときに地図が端に貼りつかない)。
 */
export function clampView(view: AtlasView, aspect: number): AtlasView {
  const span = clampSpan(view.span);
  const height = spanHeight(span, aspect);
  const lon = finite(view.lon) ? view.lon : WORLD_VIEW.lon;
  const lat = finite(view.lat) ? view.lat : WORLD_VIEW.lat;

  const half = span / 2;
  const clampedLon = span >= 360 ? 0 : Math.max(-180 + half, Math.min(180 - half, lon));

  const halfH = height / 2;
  const clampedLat =
    height >= LAT_NORTH - LAT_SOUTH
      ? LAT_MID
      : Math.max(LAT_SOUTH + halfH, Math.min(LAT_NORTH - halfH, lat));

  return { lon: clampedLon, lat: clampedLat, span };
}

/** 見えている範囲を経度緯度の四隅で。 */
export function viewBounds(view: AtlasView, aspect: number): AtlasBounds {
  const span = clampSpan(view.span);
  const height = spanHeight(span, aspect);
  return {
    lon0: view.lon - span / 2,
    lon1: view.lon + span / 2,
    lat0: view.lat + height / 2,
    lat1: view.lat - height / 2,
  };
}

/**
 * SVGの `viewBox` 文字列。**数でない値は絶対に流さない。**
 * 一瞬でも NaN が入ると、コンソールに警告が残って本物の不具合が埋もれる。
 */
export function viewBoxOf(view: AtlasView, aspect: number): string {
  const span = clampSpan(view.span);
  const height = spanHeight(span, aspect);
  const box = [view.lon - span / 2, -view.lat - height / 2, span, height];
  if (!box.every(finite) || span <= 0 || height <= 0) {
    return `-180 ${-LAT_NORTH} 360 ${LAT_NORTH - LAT_SOUTH}`;
  }
  return box.map((n) => n.toFixed(4)).join(" ");
}

/** 経度を [-180, 180) へ畳む。 */
export function normalizeLon(lon: number): number {
  if (!finite(lon)) return 0;
  return ((((lon + 180) % 360) + 360) % 360) - 180;
}

/**
 * 多角形を、画面に置ける経度へ寄せる。
 *
 * 世界一周盤面の下地は経度 -188〜216 で描かれていて、**日付変更線の向こうが
 * はみ出したまま入っている**(チュコト半島が経度190あたりに居る)。
 * 素朴に描くと画面の右外へ飛ぶ。かたまりごとに平均の経度を見て、
 * はみ出しているぶんだけ360度ずらすと、正しい側に落ちる。
 */
export function normalizePolygon(polygon: AtlasPolygon): readonly (readonly [number, number])[] {
  const points = polygon.filter(([lon, lat]) => finite(lon) && finite(lat));
  if (points.length === 0) return [];
  const mean = points.reduce((sum, [lon]) => sum + lon, 0) / points.length;
  const shift = mean > 180 ? -360 : mean < -180 ? 360 : 0;
  return shift === 0 ? points : points.map(([lon, lat]) => [lon + shift, lat] as const);
}

/** 多角形をSVGの `d` に。空なら空文字(`<path d="">` は何も描かない)。 */
export function polygonPath(polygon: AtlasPolygon): string {
  const points = normalizePolygon(polygon);
  if (points.length < 3) return "";
  return (
    points.map(([lon, lat], i) => `${i === 0 ? "M" : "L"}${lon.toFixed(3)},${(-lat).toFixed(3)}`).join("") + "Z"
  );
}

/**
 * 折れ線(川)をSVGの `d` に。**閉じない。**多角形と同じ式で描くと、
 * 川の河口と源流が結ばれて、輪になった水路が現れる。
 */
export function polylinePath(line: AtlasPolygon): string {
  const points = normalizePolygon(line);
  if (points.length < 2) return "";
  return points
    .map(([lon, lat], i) => `${i === 0 ? "M" : "L"}${lon.toFixed(3)},${(-lat).toFixed(3)}`)
    .join("");
}

/**
 * 盤面の四隅を、平面に置ける長方形へ。
 *
 * **日付変更線をまたぐ盤面がある**(`world` は -188〜216、`oceania` は 〜233)。
 * またぐものは2枚に割って返す。360度より広いものは世界ぜんぶ1枚にする。
 */
export function boundsRects(bounds: AtlasBounds): readonly PlaneRect[] {
  const { lon0, lon1, lat0, lat1 } = bounds;
  if (![lon0, lon1, lat0, lat1].every(finite)) return [];

  const top = -Math.max(lat0, lat1);
  const bottom = -Math.min(lat0, lat1);
  const h = Math.max(bottom - top, 0.02);

  const west = Math.min(lon0, lon1);
  const east = Math.max(lon0, lon1);
  const width = east - west;
  if (width >= 360) return [{ x: -180, y: top, w: 360, h }];

  const start = normalizeLon(west);
  const end = start + Math.max(width, 0.02);
  if (end <= 180) return [{ x: start, y: top, w: end - start, h }];
  // 右端からはみ出したぶんを左端へ回す。
  return [
    { x: start, y: top, w: 180 - start, h },
    { x: -180, y: top, w: end - 360 + 180, h },
  ];
}

/** 盤面の中心(平面の座標ではなく経度緯度)。 */
export function boundsCentre(bounds: AtlasBounds): { lon: number; lat: number } {
  const rects = boundsRects(bounds);
  if (rects.length === 0) return { lon: 0, lat: 0 };
  const rect = rects[0];
  return { lon: rect.x + rect.w / 2, lat: -(rect.y + rect.h / 2) };
}

/** その盤面ぜんぶが見える `span`。少し余白を足す。 */
export function spanForBounds(bounds: AtlasBounds, aspect: number): number {
  const rects = boundsRects(bounds);
  if (rects.length === 0) return MAX_SPAN;
  const w = Math.max(...rects.map((r) => r.w));
  const h = Math.max(...rects.map((r) => r.h));
  if (!finite(w) || !finite(h)) return MAX_SPAN;
  // 縦のほうが余るなら、縦が収まる幅にする。
  return clampSpan(Math.max(w, h * (aspect > 0 && finite(aspect) ? aspect : 16 / 9)) * 1.25);
}

/** 見えている範囲と重なるか。 */
export function intersectsView(bounds: AtlasBounds, view: AtlasBounds): boolean {
  const rects = boundsRects(bounds);
  const west = Math.min(view.lon0, view.lon1);
  const east = Math.max(view.lon0, view.lon1);
  const north = Math.max(view.lat0, view.lat1);
  const south = Math.min(view.lat0, view.lat1);
  return rects.some((r) => r.x <= east && r.x + r.w >= west && r.y <= -south && r.y + r.h >= -north);
}

/** 点が見えている範囲に入っているか。 */
export function pointInView(lon: number, lat: number, view: AtlasBounds): boolean {
  if (!finite(lon) || !finite(lat)) return false;
  return (
    lon >= Math.min(view.lon0, view.lon1) &&
    lon <= Math.max(view.lon0, view.lon1) &&
    lat >= Math.min(view.lat0, view.lat1) &&
    lat <= Math.max(view.lat0, view.lat1)
  );
}

/**
 * 引き具合の段。**出すものをここで切り替える。**全部いっぺんに出すと読めない。
 *
 * | 段        | 見えている経度   | 出すもの                                            |
 * |-----------|------------------|-----------------------------------------------------|
 * | `world`   | 100度〜          | 盤面のある陸・まだ無い陸・海と地形帯の名前          |
 * | `region`  | 24〜100度        | 盤面の枠と、大きく映っている盤面の名前              |
 * | `country` | 14〜24度         | **盤面自身の海岸線・地形**と枠と名前(町もここから読む) |
 * | `town`    | 〜14度           | 同じ下敷きに町の印。9度より寄ると町の名前も         |
 *
 * 境目は撮って決めた。世界の眺めで盤面名を出すと、ヨーロッパで6枚が
 * 重なって1文字も読めない。
 *
 * **町の境目は一度やり直している。**はじめ6度にしていたら、日本へ寄っても
 * 町が1つも出ず、そこからさらに寄ると**緑一色の野原に町が3つ**という眺めに
 * なった(撮って分かった)。日本の盤面は経度25度ぶんあるので、
 * 14度なら「国の半分と、そこにある町20軒ほど」が同時に見える。
 */
export type AtlasBand = "world" | "region" | "country" | "town";

export function bandOf(span: number): AtlasBand {
  const s = clampSpan(span);
  if (s > 100) return "world";
  if (s > 24) return "region";
  if (s > 14) return "country";
  return "town";
}

/**
 * 町の名前まで出すか(印だけか)。
 *
 * **印だけの丸が19個並ぶ眺めは、地図として何も言っていない**(撮って分かった)。
 * かといって14度から名前を出すと、東京のまわりで札が重なる。
 * 名前は9度から。9〜14度は「ここに町がある」とだけ言う段になる。
 */
export function showsCityNames(span: number): boolean {
  return clampSpan(span) <= 9;
}

/**
 * 盤面の名前を出してよいか。**画面に対する見た目の大きさ**で決める。
 *
 * 段だけで決めると、茨城県のような小さい盤面は country の段でも
 * 点にしかならないのに名前だけ出て、日本の名前と重なる(開始画面が
 * 番号の印と一覧に逃げたのと同じ問題)。**十分大きく映っているものだけ**
 * 名前を出せば、寄るにつれて自然に名前が増えていく。
 */
export function labelFits(bounds: AtlasBounds, view: AtlasView, aspect: number): boolean {
  const rects = boundsRects(bounds);
  if (rects.length === 0) return false;
  const span = clampSpan(view.span);
  const height = spanHeight(span, aspect);
  if (span <= 0 || height <= 0) return false;
  const w = Math.max(...rects.map((r) => r.w));
  const h = Math.max(...rects.map((r) => r.h));

  // 町まで寄ったら、**画面に収まりきる盤面だけ**名前を出す。収まらない盤面の
  // 名前は「四隅の真ん中」に置かれるので、画面のどこか——たいていは何も無い
  // 野原の真ん中——に「日本」とだけ浮かぶ(撮って分かった)。
  // どの盤面に居るかは横の一覧の見出しが言っている。
  if (span <= 14) return w <= span * 1.05 && h <= height * 1.05;

  return w / span >= 0.1 || h / height >= 0.1;
}

/** その段で世界地図に出す盤面(狭い順に並べる。小さい盤面が上に来る)。 */
export function boardsForBand(
  boards: readonly AtlasBoard[],
  band: AtlasBand,
  view: AtlasBounds,
): readonly AtlasBoard[] {
  const onMap = boards.filter((board) => !board.offEarth && intersectsView(board.bounds, view));
  const wanted =
    band === "world"
      ? onMap.filter((board) => board.scale === "country" || board.scale === "closeup")
      : onMap;
  return [...wanted].sort((a, b) => areaOf(b.bounds) - areaOf(a.bounds));
}

function areaOf(bounds: AtlasBounds): number {
  const rects = boundsRects(bounds);
  if (rects.length === 0) return 0;
  return rects.reduce((sum, r) => sum + r.w * r.h, 0);
}

/**
 * 海と地形帯の名前を出せるだけの幅が地図にあるか。
 *
 * 札の大きさは画面の点で決まる(寄っても膨らまない)ので、**地図が小さいほど
 * 札だけが相対的に大きくなり、重なる。**375pxで撮ったら、19枚の札が地球の上で
 * 折り重なって地図そのものが読めなくなった。
 * 世界ぜんぶが900点ぶんの幅で描けているときだけ出す。
 */
export function showsSeaLabels(span: number, widthPx: number): boolean {
  if (!finite(widthPx) || widthPx <= 0) return false;
  return widthPx * (360 / Math.max(clampSpan(span), 1)) >= 900;
}

/**
 * **その場所で寄れるいちばん狭い `span`。町の混み具合で決める。**
 *
 * 前はどこでも 0.25度まで寄れた。実測すると、日本で 1.33度のとき町が3軒、
 * **0.82度で0軒**、そこから先は海岸線も地形も町も無いただの面だった。
 * 何も増えないところまで寄れても、迷子になるだけで得るものが無い。
 *
 * 止める位置は**その盤面の町の平均間隔の1.4倍**にした
 * (間隔 = √(盤面の広さ ÷ 町の数))。1.4倍だと 16:9 の画面に
 * 「間隔の2乗」がおよそ1.2個ぶん入る——**どの盤面でも、いちばん寄ったところに
 * 町が1〜2軒は残る。**盤面の広さで決めると、九州(3.3度に40軒)が
 * 0.28度まで寄れてしまい、町と町のあいだの何も無い畑で止まった。
 *
 * | 盤面 | 広さ | 町 | 平均間隔 | 止まる位置 |
 * |---|---|---|---|---|
 * | 茨城県 | 1.3×1.3度 | 36 | 0.22度 | 0.30度 |
 * | スイス | 4.7×2.1度 | 44 | 0.47度 | 0.66度 |
 * | 九州 | 3.3×3.8度 | 40 | 0.56度 | 0.78度 |
 * | フランス | 14.8×9.9度 | 50 | 1.71度 | 2.40度 |
 * | 日本 | 19.5×20.2度 | 74 | 2.31度 | 2.50度(上限) |
 * | アメリカ | 58×24度 | 48 | 5.49度 | 2.50度(上限) |
 *
 * 上限の2.5度は、広い盤面(アメリカ・ロシア)まで町の間隔どおりに止めると
 * **大陸の眺めから一歩も寄れなくなる**ため。海岸線と地形は町よりずっと
 * 細かいので、町が視野から外れても見るものは残る。
 *
 * **盤面が無いところ**(大洋や、まだ盤面の無い陸)では 3度で止める。
 * そこにあるのは世界の粗い輪郭だけで、その刻みが中央値2.5度——
 * これ以上寄っても直線が太くなるだけで何も出てこない。
 */
export const NO_BOARD_MIN_SPAN = 3;
/** どんなに広い盤面でも、ここまでは寄れる。 */
export const MAX_BOARD_MIN_SPAN = 2.5;

export function minSpanForBoard(
  board: { readonly bounds: AtlasBounds; readonly cityCount: number } | null,
): number {
  if (!board || !(board.cityCount > 0)) return NO_BOARD_MIN_SPAN;
  const rects = boundsRects(board.bounds);
  if (rects.length === 0) return NO_BOARD_MIN_SPAN;
  const width = rects.reduce((sum, r) => sum + r.w, 0);
  const height = rects[0].h;
  if (!finite(width) || !finite(height) || width <= 0 || height <= 0) return NO_BOARD_MIN_SPAN;
  const spacing = Math.sqrt((width * height) / board.cityCount);
  return Math.max(MIN_SPAN, Math.min(MAX_BOARD_MIN_SPAN, spacing * 1.4));
}

/**
 * その盤面の細かい海岸線が**置き換える**、世界の粗い多角形。
 *
 * 寄ったときに敷き替えるといっても、盤面の四隅の中を丸ごと海で塗ってから
 * 描き直すことはできない。**その中には隣の国も入っている。**日本の四隅には
 * 朝鮮半島と中国沿岸が入っていて、実測ではその四隅の中の「粗いだけの陸」の
 * 18,495セルのうち、日本の細かい陸から0.3度以内はわずか1,809セル——
 * 残りはぜんぶ他所の陸だった。丸ごと塗れば、日本へ寄った瞬間に韓国が消える。
 *
 * そこで**多角形ごと**に見る。四隅の中に丸ごと収まっている粗い多角形だけが
 * 「この盤面が描き直すもの」である。日本の四隅なら、北海道・本州・九州・四国の
 * 4枚がそれにあたり、ユーラシア(経度-179〜179に伸びる1枚)は残る。
 * 英国の四隅ではグレートブリテン島だけが置き換わり、アイルランドは残る。
 * フランスのように大陸と地続きの盤面では1枚も置き換わらず、細かい海岸線が
 * 粗い大陸の上に重なる(陸の上に陸を描くので、境目は見えない)。
 */
export function replacedWorldPolygons(
  polygons: readonly AtlasPolygon[],
  bounds: AtlasBounds,
): ReadonlySet<number> {
  const rects = boundsRects(bounds);
  const replaced = new Set<number>();
  if (rects.length === 0) return replaced;
  polygons.forEach((polygon, index) => {
    const points = normalizePolygon(polygon);
    if (points.length < 3) return;
    const xs = points.map(([lon]) => lon);
    const ys = points.map(([, lat]) => -lat);
    const box = {
      x0: Math.min(...xs),
      x1: Math.max(...xs),
      y0: Math.min(...ys),
      y1: Math.max(...ys),
    };
    if (rects.some((r) => box.x0 >= r.x && box.x1 <= r.x + r.w && box.y0 >= r.y && box.y1 <= r.y + r.h)) {
      replaced.add(index);
    }
  });
  return replaced;
}

/**
 * 見えている範囲の広さに対する画面の1ピクセルぶんの度数。
 * 印や字の大きさを、寄っても膨らまないように保つのに使う。
 */
export function degreesPerPixel(view: AtlasView, widthPx: number): number {
  const span = clampSpan(view.span);
  if (!finite(widthPx) || widthPx <= 0) return span / 1000;
  return span / widthPx;
}
