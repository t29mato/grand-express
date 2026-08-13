/**
 * トップ画面の地図に、押せる「名札」を並べる。
 *
 * ## なぜ印(点)をやめたか
 *
 * 19枚を世界地図に点で打つと、アジアに9個が半径50px以内に集まる。画面では
 * 1000px幅に縮むので**点そのものより間隔が狭い。**押し離しても字が読めず、
 * 「どこを押せばどの国か」が分からなかった。
 *
 * そこで**大陸をひとつ選んでから国を選ぶ**二段にして、国の側は
 * 点ではなく**国名を書いた札**にした。名前がそのまま押せる範囲になるので、
 * 「どこを押せばよいか」を見た目で説明する必要がない。
 *
 * ## なぜ国の輪郭でなく札なのか
 *
 * 盤面が持っているのは**投影の四隅だけ**で、世界地図と重ねられる輪郭は持っていない。
 * 四隅の矩形をそのまま押せる範囲にすると、日本と韓国、フランスとドイツのように
 * **重なる盤面どうしで押し分けられない。**名札なら押し離せる。
 */
import { LocalizedText } from "../../../domain/shared-kernel/localized-text";

/** 盤面が世界のどこにあたるか。`lat0` が北、`lat1` が南。 */
export interface Bounds {
  readonly lon0: number;
  readonly lon1: number;
  readonly lat0: number;
  readonly lat1: number;
}

/** 緯度経度を絵の座標に落とすための対応。下地の絵ごとに違う。 */
export interface MapProjection extends Bounds {
  readonly width: number;
  readonly height: number;
}

/**
 * 世界一周の盤面の投影。**世界地図の下地はこの盤面のサムネイルそのもの。**
 * 地図を別に用意していない。
 */
export const WORLD_PROJECTION: MapProjection = {
  lon0: -188,
  lon1: 216,
  lat0: 75,
  lat1: -56,
  width: 3703,
  height: 1210,
};

export interface ViewBox {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

/** 絵ぜんぶを写す枠。 */
export function fullView(projection: MapProjection): ViewBox {
  return { x: 0, y: 0, w: projection.width, h: projection.height };
}

/** 緯度経度を、その絵の座標へ。 */
export function project(
  lon: number,
  lat: number,
  projection: MapProjection,
): { x: number; y: number } {
  return {
    x: ((lon - projection.lon0) / (projection.lon1 - projection.lon0)) * projection.width,
    y: ((lat - projection.lat0) / (projection.lat1 - projection.lat0)) * projection.height,
  };
}

/** いくつかの盤面をまとめて囲む四隅。 */
export function unionBounds(all: readonly Bounds[]): Bounds {
  return {
    lon0: Math.min(...all.map((b) => b.lon0)),
    lon1: Math.max(...all.map((b) => b.lon1)),
    lat0: Math.max(...all.map((b) => b.lat0)),
    lat1: Math.min(...all.map((b) => b.lat1)),
  };
}

export function centreOf(bounds: Bounds): { lon: number; lat: number } {
  return { lon: (bounds.lon0 + bounds.lon1) / 2, lat: (bounds.lat0 + bounds.lat1) / 2 };
}

/**
 * 大陸の名札を置く場所。**四隅の真ん中ではなく、その大陸に属する盤面の中央値。**
 *
 * 四隅の真ん中にすると、ロシアが経度180度まで伸びているせいで
 * **「ヨーロッパ」の札がシベリアの上に乗った**(撮って分かった)。
 * 中央値なら、外れて大きい1枚に引きずられない。
 */
export function medianCentre(all: readonly Bounds[]): { lon: number; lat: number } {
  const mid = (values: number[]) => {
    const sorted = [...values].sort((a, b) => a - b);
    const half = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[half] : (sorted[half - 1] + sorted[half]) / 2;
  };
  const centres = all.map(centreOf);
  return { lon: mid(centres.map((c) => c.lon)), lat: mid(centres.map((c) => c.lat)) };
}

/**
 * 四隅から、地図に出す枠を作る。
 *
 * **縦横比は下地の絵と同じに固定する。**大陸ごとの形のままにすると、
 * ヨーロッパ(縦長)を選んだ瞬間に地図の高さが倍になり、その下の
 * 「誰が遊ぶか」が画面の外へ飛ぶ。地図の入れ物の大きさは変えない。
 *
 * 余白は名札のぶん。名札は四隅の**外側**にはみ出しうるので、
 * これが無いと端の国の名前が切れる。
 */
export function viewBoxFor(
  bounds: Bounds,
  projection: MapProjection,
  padRatio = 0.22,
): ViewBox {
  const aspect = projection.width / projection.height;
  const a = project(bounds.lon0, bounds.lat0, projection);
  const b = project(bounds.lon1, bounds.lat1, projection);
  let w = Math.abs(b.x - a.x) * (1 + padRatio * 2);
  let h = Math.abs(b.y - a.y) * (1 + padRatio * 2);
  let cx = (a.x + b.x) / 2;
  let cy = (a.y + b.y) / 2;

  // 縦横比を揃える。足りないほうを広げる(縮めると盤面が枠の外に出る)。
  if (w / h < aspect) w = h * aspect;
  else h = w / aspect;

  // 絵の外まで寄ると、下地の無いところが写る。中に押し戻す。
  w = Math.min(w, projection.width);
  h = Math.min(h, projection.height);
  cx = Math.min(Math.max(cx, w / 2), projection.width - w / 2);
  cy = Math.min(Math.max(cy, h / 2), projection.height - h / 2);
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

/** 地図の入れ物の縦横比。CSSの `.world-picker-map` と揃えること。 */
export const CONTAINER_ASPECT = WORLD_PROJECTION.width / WORLD_PROJECTION.height;

/**
 * 名札の字の大きさ(絵の座標)。
 *
 * 寄るほど下地は拡大されるので、**同じ字を書くと画面上で大きくなりすぎる。**
 * 枠に比例させて、画面上の大きさが変わらないようにする。
 * `0.020` は世界地図(3703)のとき74。1000pxの画面でおよそ20px。
 *
 * **枠の幅だけで決めてはいけない。**入れ物の縦横比は固定なので、
 * 縦長の枠(日本の盤面など)は左右に余白を残して縮んで収まる。幅で決めると、
 * 日本まで寄ったところで**字が8pxになって読めなかった**(撮って分かった)。
 * 実際に効いているのは幅と「高さ×入れ物の比」の大きいほう。
 */
export function fontFor(view: ViewBox): number {
  return Math.max(view.w, view.h * CONTAINER_ASPECT) * 0.02;
}

export interface AreaSource {
  readonly id: string;
  readonly name: LocalizedText;
  /** 名札を置く場所(緯度経度)。 */
  readonly at: { readonly lon: number; readonly lat: number };
}

export interface Plate {
  readonly id: string;
  readonly text: string;
  /** 押し離したあとの中心。 */
  x: number;
  y: number;
  /** 本来の位置。動いた札にはここへ線を引く。 */
  readonly trueX: number;
  readonly trueY: number;
  readonly w: number;
  readonly h: number;
}

/** 名札の大きさ。字の幅は1文字あたりおよそ0.62emで見積もる(等幅ではないので概算)。 */
function plateSize(text: string, font: number): { w: number; h: number } {
  return { w: text.length * font * 0.62 + font * 1.4, h: font * 1.9 };
}

/** 押し離しの回数。これ以上まわしても動かなくなる。 */
const PASSES = 60;

/**
 * 名札を並べる。重なったら押し離し、枠の中に収める。
 *
 * 押し離しは**重なりの少ないほうの軸だけ**を動かす。両方向へ均等に押すと、
 * 横に並んだ2枚が斜めにずれて、どちらの国を指しているのか読めなくなる。
 */
export function layoutPlates(
  sources: readonly AreaSource[],
  names: readonly string[],
  view: ViewBox,
  font: number,
  projection: MapProjection,
): Plate[] {
  const plates: Plate[] = sources.map((source, index) => {
    const at = project(source.at.lon, source.at.lat, projection);
    const { w, h } = plateSize(names[index], font);
    return { id: source.id, text: names[index], x: at.x, y: at.y, trueX: at.x, trueY: at.y, w, h };
  });

  const clamp = (plate: Plate) => {
    plate.x = Math.min(Math.max(plate.x, view.x + plate.w / 2), view.x + view.w - plate.w / 2);
    plate.y = Math.min(Math.max(plate.y, view.y + plate.h / 2), view.y + view.h - plate.h / 2);
  };
  plates.forEach(clamp);

  for (let pass = 0; pass < PASSES; pass++) {
    let touched = false;
    for (let i = 0; i < plates.length; i++) {
      for (let j = i + 1; j < plates.length; j++) {
        const a = plates[i];
        const b = plates[j];
        const overlapX = (a.w + b.w) / 2 - Math.abs(b.x - a.x);
        const overlapY = (a.h + b.h) / 2 - Math.abs(b.y - a.y);
        if (overlapX <= 0 || overlapY <= 0) continue;
        // 少しだけ余分に離す。ぴったりで止めると縁どうしが触れて1枚に見える。
        if (overlapY <= overlapX) {
          const push = (overlapY + font * 0.25) / 2;
          const dir = b.y >= a.y ? 1 : -1;
          a.y -= dir * push;
          b.y += dir * push;
        } else {
          const push = (overlapX + font * 0.25) / 2;
          const dir = b.x >= a.x ? 1 : -1;
          a.x -= dir * push;
          b.x += dir * push;
        }
        clamp(a);
        clamp(b);
        touched = true;
      }
    }
    if (!touched) break;
  }
  return plates;
}

/** 名札が本来の位置から動いたか(引き出し線を引くかの判断)。 */
export function isMoved(plate: Plate, font: number): boolean {
  return Math.hypot(plate.x - plate.trueX, plate.y - plate.trueY) > font * 0.6;
}
