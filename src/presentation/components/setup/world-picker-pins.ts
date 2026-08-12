/**
 * トップ画面の世界地図に打つ印の位置。
 *
 * 下地には**世界一周の盤面のサムネイル**をそのまま使う(`thumbSvg`)。
 * 座標系も世界一周の投影(3703×1210)なので、各盤面の中心を同じ式で落とせば
 * そのまま重なる。地図を別に用意する必要がない。
 *
 * ## 印は必ず重なる
 *
 * 19盤面の中心を素直に置くと、実測でこうなる(世界一周の座標)。
 *
 * ```
 * 日本—茨城        50px      バリ—インドネシア   61px
 * 韓国—日本        62px      ドイツ—イタリア     88px
 * フランス—ドイツ  89px      マレーシア—インドネシア 100px
 * ```
 *
 * 画面ではこれが1000px幅に縮むので、50pxは13px。印そのものより小さい。
 * **押し離してから描く。**都市マーカーで同じことをしている
 * (`use-board-layout.ts` の `relaxOverlaps`)。
 */
import { LocalizedText } from "../../../domain/shared-kernel/localized-text";

/** 世界一周の盤面の投影。下地のサムネイルと同じ座標系。 */
const WORLD_PROJECTION = { lon0: -188, lon1: 216, lat0: 75, lat1: -56, width: 3703, height: 1210 };

export interface BoardPin {
  readonly id: string;
  readonly name: LocalizedText;
  /** 押し離したあとの、印を描く位置。 */
  readonly x: number;
  readonly y: number;
  /** 実際の位置。押し離した場合はここへ引き出し線を引く。 */
  readonly trueX: number;
  readonly trueY: number;
}

interface BoardCentre {
  readonly id: string;
  readonly name: LocalizedText;
  readonly centre?: { readonly lon: number; readonly lat: number };
}

/**
 * 印どうしが最低これだけ離れているようにする(世界一周の盤面座標)。
 * 画面上でおよそ22px。指で押し分けられる大きさから逆算している。
 */
const MIN_GAP = 82;

/** 押し離しの回数。これ以上まわしても動かなくなる(実測で12回で収束)。 */
const PASSES = 40;

/**
 * 盤面の中心を世界地図の上に落とし、印どうしが重ならないよう離す。
 *
 * **世界一周の盤面は印にしない。**中心はギニア湾の沖(x1852 y605)になり、
 * 「地球ぜんぶ」を1点で指すことに意味がない。地図そのものが世界一周にあたる。
 */
export function boardPins(boards: readonly BoardCentre[]): BoardPin[] {
  const { lon0, lon1, lat0, lat1, width, height } = WORLD_PROJECTION;
  const pins: BoardPin[] = boards
    .filter((board) => board.id !== "world" && board.centre)
    .map((board) => {
      const x = ((board.centre!.lon - lon0) / (lon1 - lon0)) * width;
      const y = ((board.centre!.lat - lat0) / (lat1 - lat0)) * height;
      return { id: board.id, name: board.name, x, y, trueX: x, trueY: y };
    });

  const moved = pins.map((pin) => ({ ...pin }));
  for (let pass = 0; pass < PASSES; pass++) {
    let touched = false;
    for (let i = 0; i < moved.length; i++) {
      for (let j = i + 1; j < moved.length; j++) {
        const a = moved[i];
        const b = moved[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.hypot(dx, dy) || 0.01;
        if (distance >= MIN_GAP) continue;
        // 足りないぶんの半分ずつ、互いに反対へ動かす。
        const push = (MIN_GAP - distance) / 2;
        const ux = dx / distance;
        const uy = dy / distance;
        a.x -= ux * push;
        a.y -= uy * push;
        b.x += ux * push;
        b.y += uy * push;
        touched = true;
      }
    }
    if (!touched) break;
  }
  return moved;
}

/** 印が実際の位置から動いたか(引き出し線を引くかの判断)。 */
export function isDisplaced(pin: BoardPin): boolean {
  return Math.hypot(pin.x - pin.trueX, pin.y - pin.trueY) > 6;
}

/** 名前を印の上に置くか下に置くか。置けなければ出さない。 */
export type NameSide = "above" | "below" | null;

/** 名前の字の大きさ(盤面座標)。CSSの `.world-pin-name` と揃えること。 */
const NAME_FONT = 44;
/** 印の丸の半径ぶん、名前を離す。 */
const NAME_GAP = 40;

/**
 * 印に添える名前の置き場所を決める。**入るものだけ出す。**
 *
 * 上限まで絞っても、アジアのように9枚が寄っている地域では名前どうしがぶつかる。
 * 実際、日本の名前が韓国と茨城の名前の下に隠れ、インドネシアは
 * マレーシアに削られて「donesia」しか見えていなかった(撮って分かった)。
 *
 * 都市の名札と同じ考え方で、上→下の順に試し、どちらも埋まっていたら**出さない。**
 * 出せなかった盤面も、選べば名前が下の行に出るので迷子にはならない。
 */
export function nameSides(pins: readonly BoardPin[], names: readonly string[]): NameSide[] {
  const placed: { x0: number; x1: number; y0: number; y1: number }[] = [];
  const overlaps = (a: (typeof placed)[number], b: (typeof placed)[number]) =>
    a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

  return pins.map((pin, index) => {
    // 字の幅は「1文字あたりおよそ0.62em」で見積もる(等幅ではないので概算)。
    // **見積もりは大きめに取る。**ぎりぎりに取ったら、マレーシアとインドネシアの
    // 名前が51しか離れていないのに「ぶつかっていない」と判定され、
    // インドネシアが「donesia」に削られた(撮って分かった)。
    const width = names[index].length * NAME_FONT * 0.62 + NAME_FONT;
    for (const side of ["above", "below"] as const) {
      const cy = side === "above" ? pin.y - NAME_GAP : pin.y + NAME_GAP + NAME_FONT * 0.8;
      const rect = {
        x0: pin.x - width / 2,
        x1: pin.x + width / 2,
        y0: cy - NAME_FONT * 1.05,
        y1: cy + NAME_FONT * 0.45,
      };
      if (placed.some((other) => overlaps(rect, other))) continue;
      placed.push(rect);
      return side;
    }
    return null;
  });
}
