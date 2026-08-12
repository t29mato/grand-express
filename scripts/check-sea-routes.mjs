#!/usr/bin/env node
/**
 * 路線が「あるべきでない場所」を通っていないか調べる。
 *
 *   航路(点線・`"sea"`)が陸をなぞっていないか
 *   陸路(線路)が海の上を走っていないか
 *
 * **この検査は存在しなかった。** 幾何の検査は `use-board-layout.test.ts`
 * (都市が海に浮いていないか)と `octilinear-route.test.ts`(角度が0/45/90度か)
 * の2つで、路線が何の上を通るかは誰も見ていなかった。
 *
 *   node scripts/check-sea-routes.mjs            全6盤面
 *   node scripts/check-sea-routes.mjs world      1つだけ
 *   node scripts/check-sea-routes.mjs world -v   閾値以下も全部出す
 *
 * 路線は直線ではなく「軸に沿った脚 + 45度の脚」で描かれる
 * (`src/presentation/hooks/octilinear-route.ts`)ので、判定も同じ形でなぞる。
 * 日付変更線の折り返しにも合わせてある(下の WRAP の節)。
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const CONTENT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "infrastructure", "content");

/**
 * 報告する下限。**割合ではなく画素数で見る。**
 *
 * 最初は「陸を踏んだ割合」で並べたが、それだと london–paris(91%)が
 * いちばん悪いことになってしまう。実際には線が34pxしかないので誰も気づかない。
 * 逆に capetown–perth は12%でも901pxあるので、陸に乗る長さは3倍以上ある。
 *
 * **目に付くのは「間違った面の上を何px走るか」**なので、そちらで判定する。
 */
const REPORT_PX = 60;
const SAMPLES = 600;

/**
 * **わざと残している路線。**閾値を超えても ✗ にしない。
 *
 * 2種類ある。
 *
 * 1. **地図のほうが正しく、この検査が間違っているもの。** 青函トンネルは
 *    本当に海の下を列車が通る。数字を下げようとすると地図が嘘になる。
 * 2. **長い航路が岬をかすめているだけのもの。** 実際の船もそう通る。
 *    割合が2割以下で、他の引き方にすると軒並み増える。
 *
 * ここに書いておかないと、次に見た人が同じ判断をやり直すことになる。
 * 直しかたを4通り測ったうえで「直さない」と決めた、という記録でもある。
 */
const KEPT = new Map([
  ["japan:aomori-hakodate", "青函トンネル。列車が海の下を通るのが正しい"],
  ["uk:belfast-holyhead", "アイリッシュ海を渡る418pxの航路。アングルシー島とベルファスト湾の両端で自分の陸地をかすめる(21%)。実在のフェリー航路"],
  ["uk:bristol-penzance", "コーンウォール半島を下る591pxの長距離線。デヴォンに中継の町を置いていないため、湾を横切って見える(19%)。実在の鉄道"],
  ["world:bangkok-singapore", "マレー半島を下る実在の鉄道。粗いのは経路ではなく海岸線の描き方のほう"],
  ["world:reykjavik-toronto", "北大西洋を渡る605pxの航路が、グリーンランド南端をかすめるだけ(18%)"],
  ["world:sydney-tokyo", "西太平洋を縦断する686pxの航路が、ニューギニア東端をかすめるだけ(15%)"],
  ["world:lima-ushuaia", "ホーン岬回り。陸路にすると51pxに下がるが、アンデスを4000km走る嘘になる"],
  ["world:capetown-perth", "盤面最長901pxの航路。オーストラリア南西端をかすめるだけ(8%)"],
  ["world:dubai-zanzibar", "ザンジバルは島なので陸路にできない。アフリカの角をかすめる(20%)"],
  [
    "korea:jeju-yeosu",
    "済州へは陸路にできない。618pxの航路が麗水半島の先端をかすめるだけ(11%)。" +
      "港を釜山(25%)・統営(10%)に替えても改善せず、端の入れ替えでも悪化するので、実測した中で最良のもの",
  ],
]);

/** 端の順に関係なく引けるようにする(入れ替えで直すことがあるため)。 */
function keptReason(board, from, to) {
  return KEPT.get(`${board}:${[from, to].sort().join("-")}`);
}

const args = process.argv.slice(2);
const verbose = args.includes("-v");
const only = args.find((a) => !a.startsWith("-"));
const files = readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".content.json"))
  .filter((f) => !only || f === `${only}.content.json`);

// --- WRAP: 日付変更線の折り返し ---------------------------------------
// `use-board-layout.ts` の wrapWidthOf / nearestAcrossSeam / seamX / wrapX と
// 同じ式。ここを揃えておかないと、スバ—パペーテのように**盤面の端で折り返して
// 描かれる路線**を「盤面幅の81%を横断する線」と誤って報告してしまう。
// (実際に描かれるのは2本に割れた短い線で、どちらも盤面に収まっている)

function wrapWidthOf({ LON0, LON1, BW }) {
  const span = LON1 - LON0;
  return span < 360 ? null : (360 / span) * BW;
}

function seamX({ LON0, LON1, BW }) {
  const pxPerDegree = BW / (LON1 - LON0);
  const dateLine = (180 - LON0) * pxPerDegree;
  return dateLine + (BW - dateLine) / 2;
}

function nearestAcrossSeam(fromX, toX, wrapWidth) {
  if (wrapWidth === null) return toX;
  const shift = Math.round((fromX - toX) / wrapWidth) * wrapWidth;
  return toX + shift;
}

function wrapBack(x, proj, wrapWidth) {
  if (wrapWidth === null) return x;
  const seam = seamX(proj);
  if (x <= seam && x > seam - wrapWidth) return x;
  return x - Math.ceil((x - seam) / wrapWidth) * wrapWidth;
}

/** `octilinearCorner` と同じ式。軸に沿った脚と45度の脚の折れ点。 */
function corner(a, b, diagonalFirst) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const diagonal = Math.min(Math.abs(dx), Math.abs(dy));
  const sx = Math.sign(dx);
  const sy = Math.sign(dy);
  const horizontalIsLonger = Math.abs(dx) >= Math.abs(dy);
  if (diagonalFirst) {
    return horizontalIsLonger ? { x: a.x + sx * diagonal, y: b.y } : { x: b.x, y: a.y + sy * diagonal };
  }
  return horizontalIsLonger ? { x: b.x - sx * diagonal, y: a.y } : { x: a.x, y: b.y - sy * diagonal };
}

function pointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi || 1e-9) + xi) inside = !inside;
  }
  return inside;
}

let failures = 0;
for (const file of files) {
  const pack = JSON.parse(readFileSync(join(CONTENT_DIR, file), "utf8"));
  const proj = pack.proj;
  const { BW, BH, LON0, LON1, LAT0, LAT1 } = proj;
  const wrapWidth = wrapWidthOf(proj);
  const px = (lon) => ((lon - LON0) / (LON1 - LON0)) * BW;
  const py = (lat) => ((lat - LAT0) / (LAT1 - LAT0)) * BH;
  const lonAt = (x) => (x / BW) * (LON1 - LON0) + LON0;
  const latAt = (y) => (y / BH) * (LAT1 - LAT0) + LAT0;
  const onLand = (x, y) => {
    const wx = wrapBack(x, proj, wrapWidth);
    return pack.land.some((poly) => pointInPolygon(lonAt(wx), latAt(y), poly));
  };

  /** 経路をなぞって、陸の上と海の上をそれぞれ何px走るかを返す。 */
  const trace = (a, b, diagonalFirst) => {
    const c = corner(a, b, diagonalFirst);
    const leg1 = Math.hypot(c.x - a.x, c.y - a.y);
    const leg2 = Math.hypot(b.x - c.x, b.y - c.y);
    const length = leg1 + leg2;
    const split = leg1 / (length || 1);
    let land = 0;
    for (let i = 0; i <= SAMPLES; i++) {
      const t = i / SAMPLES;
      let x, y;
      if (t <= split) {
        const u = split === 0 ? 0 : t / split;
        x = a.x + (c.x - a.x) * u;
        y = a.y + (c.y - a.y) * u;
      } else {
        const u = split === 1 ? 0 : (t - split) / (1 - split);
        x = c.x + (b.x - c.x) * u;
        y = c.y + (b.y - c.y) * u;
      }
      if (onLand(x, y)) land++;
    }
    const landRatio = land / (SAMPLES + 1);
    return { length, landPx: landRatio * length, seaPx: (1 - landRatio) * length, landRatio };
  };

  const findings = [];
  pack.edges.forEach((edge, edgeIndex) => {
    const [from, to] = edge;
    const isSea = edge[2] === "sea";
    // **実際に描かれる折れ方**は路線の添字で決まる(use-board-layout.ts)。
    // 悪いほうを採るのではなく、そのものを測る。
    const diagonalFirst = edgeIndex % 2 === 1;
    const A = { x: px(pack.cities[from].lo), y: py(pack.cities[from].la) };
    const Braw = { x: px(pack.cities[to].lo), y: py(pack.cities[to].la) };
    // 折り返す盤面では、近いほうの向きで経路を組む(描画と同じ)。
    const B = { x: nearestAcrossSeam(A.x, Braw.x, wrapWidth), y: Braw.y };
    // 端の順を入れ替えると折れ点が「Aの緯度」から「Bの緯度」へ移る。
    // 添字は変わらないので、他の路線に影響しない直しかた。
    const Aswap = { x: nearestAcrossSeam(Braw.x, A.x, wrapWidth), y: A.y };
    const kept = trace(A, B, diagonalFirst);
    const swapped = trace(Braw, Aswap, diagonalFirst);

    const wrongOf = (t, sea) => (sea ? t.landPx : t.seaPx);
    const options = [
      { label: "そのまま", px: wrongOf(kept, isSea), sea: isSea, swap: false },
      { label: "端を入れ替え", px: wrongOf(swapped, isSea), sea: isSea, swap: true },
      { label: isSea ? "陸路にする" : "航路にする", px: wrongOf(kept, !isSea), sea: !isSea, swap: false },
      { label: isSea ? "陸路にして入れ替え" : "航路にして入れ替え", px: wrongOf(swapped, !isSea), sea: !isSea, swap: true },
    ];
    const best = options.reduce((m, o) => (o.px < m.px ? o : m));
    findings.push({
      from, to, isSea, edgeIndex,
      wrongPx: options[0].px,
      ratio: options[0].px / (kept.length || 1),
      length: kept.length,
      share: kept.length / BW,
      best, options,
    });
  });

  const name = file.replace(".content.json", "");
  const over = findings.filter((f) => f.wrongPx > REPORT_PX).sort((p, q) => q.wrongPx - p.wrongPx);
  const bad = over.filter((f) => !keptReason(name, f.from, f.to));
  const kept = over.filter((f) => keptReason(name, f.from, f.to));
  const seaCount = findings.filter((f) => f.isSea).length;
  // -v でも、わざと残しているものは下の 〜 の欄にだけ出す。
  // 両方に出すと、上の欄で ✗ が付いて「まだ直っていない」と読まれ、
  // **せっかく理由を書いて決めたことを、次の人がやり直す。**
  const shown = verbose
    ? findings
        .filter((f) => !keptReason(name, f.from, f.to))
        .sort((p, q) => q.wrongPx - p.wrongPx)
    : bad;
  console.log(
    `${name.padEnd(9)} 路線 ${String(findings.length).padStart(3)}本(うち航路 ${String(seaCount).padStart(2)}本) — ` +
      (bad.length === 0 ? `${REPORT_PX}px超の食い違いなし` : `${bad.length}本が${REPORT_PX}px超`) +
      (kept.length ? `(ほかに、わざと残している ${kept.length}本)` : ""),
  );
  failures += bad.length;
  for (const f of shown) {
    const what = f.isSea ? "航路が陸" : "線路が海";
    const hint =
      f.best.px < f.wrongPx - 20 ? `  → 「${f.best.label}」で ${f.best.px.toFixed(0)}px` : "";
    console.log(
      `    ${f.wrongPx > REPORT_PX ? "✗" : "·"} ${`${f.from}–${f.to}`.padEnd(26)} ${what} ${f.wrongPx.toFixed(0).padStart(4)}px` +
        `(${(f.ratio * 100).toFixed(0).padStart(3)}%)  線長 ${f.length.toFixed(0).padStart(5)}px${hint}`,
    );
    // 「いちばん小さい数」が地理として正しいとは限らない(ザンジバルは島なので
    // 陸路にはできない)。選ぶのは人なので、4通りとも見せる。
    if (verbose) {
      console.log(`        ${f.options.map((o) => `${o.label} ${o.px.toFixed(0)}px`).join(" / ")}`);
    }
  }
  for (const f of kept) {
    const what = f.isSea ? "航路が陸" : "線路が海";
    console.log(
      `    〜 ${`${f.from}–${f.to}`.padEnd(26)} ${what} ${f.wrongPx.toFixed(0).padStart(4)}px` +
        `(${(f.ratio * 100).toFixed(0).padStart(3)}%)  ${keptReason(name, f.from, f.to)}`,
    );
  }
}

process.exit(failures > 0 ? 1 : 0);
