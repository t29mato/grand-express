import { CountryId } from "../../domain/shared-kernel/ids";
import { AtlasLink } from "./atlas-types";
import { atlasContentRepository } from "./content-packs";

/**
 * 盤面の線路と航路を読む。**町(`atlas-cities.ts`)と同じJSONの別の部分。**
 *
 * ## なぜ要るのか
 *
 * 地図帳には町の印だけが浮いていて、**どの町とどの町がつながっているのかが
 * どこにも出ていなかった。**この遊びは線路と航路を辿って旅をするものなので、
 * つながりが見えない地図は、盤面の半分しか写していない。
 *
 * 全47盤面で2,599本(線路2,316・航路283)。1盤面あたり30〜100本しかないので、
 * 寄った盤面ぶんだけなら軽い。
 *
 * ## 町と別々に読んでいるように見えるが、取りに行くのは1回
 *
 * 読み込みそのものは `JsonCountryContentRepository` に任せている
 * (`content-packs.ts` の入れ物を町・海岸線と分け合う)。**日本へ寄っても
 * 185KBを読むのは1回きり**で、同じ盤面を2度読まない。
 * 3つを1回の呼び出しにまとめる案もあったが、
 *
 * - 町と海岸線はすでに別々の口で、画面側もそれぞれ別に覚えている、
 * - 線だけ要らない場面(引いた眺め)と、線だけ先に欲しい場面が分かれている、
 *
 * ので、**既にある2つと同じ作法**に揃えるほうが読みやすいと判断した。
 *
 * ## 両端の座標はここで解く
 *
 * 元データの `edges` は町のIDの組でしかない。町は実座標を持っているので、
 * ここで座標まで解いて渡す。**知らない町を指す線と、座標が数でない線は捨てる**
 * ——SVGへ NaN を流すと、その線どころか**まとまり全体が黙って消える。**
 */
export function loadAtlasLinks(boardId: CountryId): Promise<readonly AtlasLink[]> {
  return atlasContentRepository.load(boardId).then((pack) => {
    const cityById = new Map(pack.cities.map((city) => [city.id as string, city]));
    const links: AtlasLink[] = [];
    for (const edge of pack.edges) {
      const a = cityById.get(edge.from as string);
      const b = cityById.get(edge.to as string);
      if (!a || !b) continue;
      const link: AtlasLink = {
        from: a.id,
        to: b.id,
        kind: edge.kind,
        lonA: a.longitude,
        latA: a.latitude,
        lonB: b.longitude,
        latB: b.latitude,
      };
      if (![link.lonA, link.latA, link.lonB, link.latB].every(Number.isFinite)) continue;
      links.push(link);
    }
    return links;
  });
}
