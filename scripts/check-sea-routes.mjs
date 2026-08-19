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
  ["africa:nacala-toamasina", "マダガスカル東岸からモザンビーク北部へ渡る航路。アンタナナリボが内陸のため、相手都市を4通り試しても136px(41%)未満にならなかった。マダガスカル島の東岸に沿うぶんだけ自分の陸に触れている"],
  ["mexico:hermosillo-mexicali", "ソノラ砂漠沿いの実在の陸路。カリフォルニア湾の湾奥をかすめるが、間に挟める町が無い。282px→74px(15%)まで詰めたところで打ち止め(海岸線を張り出したぶん数pxだけ増えた)"],
  ["asia:colombo-singapore", "インド洋を渡る約2,900kmの外洋航路。両端がそれぞれの都市の海岸に近いぶんだけ自分の陸に触れている(20%)"],
  ["asia:chittagong-colombo", "ベンガル湾を渡る約2,700kmの外洋航路。スリランカ北部の海岸線にわずかに沿うだけ(16%)"],
  ["asia:busan-hongkong", "釜山はDMZで大陸への陸路が絶たれているための迂回航路。朝鮮半島南岸をかすめる以外は東シナ海を渡る実在の航路(27%)"],
  ["europe:malmo-visby", "ゴットランド発の実際の船はニュネスハムン/オスカルスハムン行きで、マルメ行きの航路は無い。この盤面にその2港が無いため、マルメへ引くかぎり南スウェーデンの陸を横切る(34%)。**島なので陸路にはできない**——スクリプトの提案どおりに直すと嘘になる"],
  ["europe:copenhagen-torshavn", "フェロー諸島への長い外洋の航路。775pxのうち両端で自分の陸をかすめるだけ(14%)"],
  ["europe:thessaloniki-valletta", "マルタへの長い外洋の航路。ギリシャ半島とマルタ島の両端をかすめる(33%)"],
  // **百名山の選定そのものに空きがある。**大山(133.55E)より西の本州に
  // 百名山は1座も無く、九州北部にも無い。そのため中国地方と四国・九州をつなぐ
  // 路線は、中継にできる山が無く、必ず瀬戸内海か伊予灘を横切る。
  // 実際の陸路(瀬戸大橋・関門)は存在するが、その途中に置ける山が無い。
  ["hyakumeizan:daisen-kujusan", "大山より西の本州に百名山が無く、中継にできる山が無い。実在の陸路(関門)は通れるが、そこに置ける山が無いため直線が瀬戸内海を横切る(28%)"],
  ["hyakumeizan:ishizuchisan-kujusan", "豊予海峡の船。九重も石鎚も内陸の山なので、航路の両端が必ず陸の上から始まる(36%)"],
  ["hyakumeizan:iwakisan-yoteizan", "青函トンネル。実在する鉄道(北海道新幹線)で、地図上は津軽海峡を渡る直線になる。japan の aomori-hakodate と同じ扱い"],
  ["hyakumeizan:rausudake-rishiri", "利尻島—知床を結ぶ実在の船は無いが、盤面として2座をつなぐ必要がある。741pxの大部分は宗谷海峡の外洋で、北海道本島の陸をかすめているだけ(20%)"],
  // 太陽系の盤面は**宇宙が「海」、天体が「島」**。都市(天体)は島の中心に置くので、
  // **大きな天体から出る航路は、必ずその天体自身の半径ぶん「陸」を通る。**
  // 岬をかすめているのではなく、盤面の作りそのものから来る。数字も両端の半径の
  // 合計とほぼ一致する(太陽—水星の82pxは、太陽の島58px+水星の島)。
  // 0にするには太陽・木星・土星・天王星を40px未満まで縮めることになり、
  // **太陽系でいちばん大きい4つが他の惑星と見分けられなくなる。**大きさの違いを取る。
  // 外側の3本も同じ理由。**島を大きくすると増える。**探査機とセドナの島は
  // 当初12〜16pxで、印を押し離した結果が海に出て「都市が海に浮いている」で
  // 落ちた。押し離しの上限(11.2px)+印の半径(9.5px)から半径21px以上が要る。
  // 島を32pxに広げて都市の検査は通ったが、そのぶん航路の食い違いが増えた。
  // **どちらを取るかで、都市が陸の上にあるほうを取った。**
  ["solarsystem:oortcloud-sedna", "セドナ(32px)とオールトの雲(40px)の島の半径の和が、距離148pxの半分を占める(50%)"],
  ["solarsystem:sedna-voyager1", "両端の島の半径の和64pxがそのまま出ている(16%)"],
  ["solarsystem:voyager1-voyager2", "探査機どうしが92pxしか離れておらず、島の半径の和64pxが大半を占める(68%)"],
  ["solarsystem:jupiter-saturn", "木星・土星とも島が大きい。航路が自分の島の上から始まる(40%)"],
  ["solarsystem:saturn-uranus", "同上(31%)"],
  ["solarsystem:mercury-sun", "太陽の島が大きい。距離が近いので割合も大きく出る(35%)"],
  ["solarsystem:ceres-jupiter", "木星の島が大きい(30%)"],
  ["solarsystem:parkersolarprobe-sun", "太陽に最も近づく探査機。距離143pxに対し太陽の島が大きい(51%)"],
  ["solarsystem:neptune-uranus", "同上(41%)"],
  // インサイド・パッセージ(実在の船の道)。**この検査の限界ではなく、盤面の輪郭の限界。**
  // BCから南東アラスカの海岸は島と入り江が迷路のように入り組んでいて、実際の船は
  // その水路を縫って進む。盤面の輪郭はそれを1枚の陸として簡略化しているので、
  // 航路が「陸の上」を通ることになる。**77%は「かすめるだけ」ではない**が、
  // 島を描き分けないかぎり下がらない。陸路にすると船の道が鉄道になってしまう。
  ["canada:princerupert-vancouver", "インサイド・パッセージ航路(BCフェリー)。BC海岸の島と入り江を1枚の陸に簡略化しているため、航路が陸を横切る(77%)"],
  ["canada:princerupert-whitehorse", "アラスカ・マリン・ハイウェイ〜スカグウェイ経由の簡略化。南東アラスカの島々を描き分けていないため両端で陸をかすめる(29%)"],
  ["japan:aomori-hakodate", "青函トンネル。列車が海の下を通るのが正しい"],
  // ボルタ湖の渡し。**この検査の限界**で、湖は楕円の集まりとしてしか
  // 表せない(`lakes` の形)。ボルタ湖は「く」の字に折れた形で、
  // 楕円10個を鎖にしても実際の水面を覆いきれず、渡しの線が楕円の
  // 隙間(=陸と判定される)を通る。船便は実在する(アコソンボ⇄イェジの
  // ヤペイ・クイーン号)。陸路にすると、湖の上を列車が走る絵になる。
  ["bali:nusapenida-sanur", "サヌール⇄ヌサペニダの実在の船便。**あいだにヌサレンボンガン島がある**ので、直線で引くかぎりその島を跨ぐ(46%)。4通り試したうえでの最小値"],
  ["bali:nusapenida-padangbai", "パダンバイ⇄ヌサペニダの実在の船便。両端の岬をかすめるだけ(20%)"],
  ["malaysia:klang-kotakinabalu", "南シナ海を渡る2626pxの航路。半島とボルネオの両端で自分の陸地をかすめるだけ(15%)。定期旅客船は現存しないが、盤面がつながらないほうが困る(ストレーツ・スティームシップ社の航路にならった)"],
  ["malaysia:klang-kuching", "南シナ海を渡る1579pxの航路。両端で自分の陸地をかすめるだけ(23%)"],
  ["indonesia:ambon-makassar", "バンダ海を渡る640pxの航路。マカッサル側とアンボン側の両端で自分の陸地をかすめるだけ(12%)"],
  ["ghana:akosombo-ketekrachi", "ボルタ湖の渡し。湖を楕円でしか表せないための誤検知(下の注記参照)"],
  ["ghana:ketekrachi-yeji", "ボルタ湖の渡し。湖を楕円でしか表せないための誤検知"],
  ["russia:vladivostok-yuzhnosakhalinsk", "間宮海峡を渡る325pxの航路。サハリンは島なので陸路にできない。端の入れ替えで287px→63px(19%)まで下げた、実測での最良"],
  ["russia:magadan-petropavlovsk", "オホーツク海を渡る355pxの航路。マガダン湾とカムチャツカの両端で自分の陸地をかすめるだけ(31%)"],
  ["russia:khabarovsk-ulanude", "シベリア鉄道の711pxの長い区間。バイカル湖の南岸をかすめる(15%)。実在の鉄道"],
  ["italy:genova-olbia", "ティレニア海を渡る759pxの航路。リグーリアとサルデーニャの両端で自分の陸地をかすめるだけ(10%)。実在のフェリー航路"],
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
  /**
   * 湖の上か。**湖は陸ポリゴンの内側に描かれる**ので、引いておかないと
   * 湖を渡る船が「陸の上を走っている」と出る。ガーナのボルタ湖の渡し
   * (アコソンボ⇄イェジ、実在の船便)が100%陸と判定されて分かった。
   *
   * 湖は `[経度, 緯度, 横半径px, 縦半径px, 傾き, 色]` の楕円で持っている。
   */
  const inLake = (x, y) =>
    (pack.lakes ?? []).some(([lo, la, rx, ry, tilt]) => {
      const cx = px(lo);
      const cy = py(la);
      const rad = ((tilt ?? 0) * Math.PI) / 180;
      const dx = x - cx;
      const dy = y - cy;
      const ux = dx * Math.cos(rad) + dy * Math.sin(rad);
      const uy = -dx * Math.sin(rad) + dy * Math.cos(rad);
      return (ux / rx) ** 2 + (uy / ry) ** 2 <= 1;
    });

  const onLand = (x, y) => {
    const wx = wrapBack(x, proj, wrapWidth);
    if (inLake(wx, y)) return false;
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
