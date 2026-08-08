/**
 * インドの都市イラスト。
 *
 * `marks` は 24×24 の座標系に描くシンボル、`bg` は 400×210 の座標系に描く
 * 背景シーン(いずれもSVG断片の文字列)。他国では legacy の関数を抽出時に
 * 評価して文字列化していたが、インドは最初から文字列として持つ。
 *
 * 描き直した背景は `bg-rich.mjs` にあり、末尾で上書きしている。
 *
 * ⚠ **中央 x=151〜249 / y=54〜152 は都市のシンボルに隠れる。**
 *   細部は左右3分の1と、y>170 の手前に置くこと。
 *   詳しくは docs/50-authoring/12-city-background-guide.md。
 */
import { INDIA_BG_RICH } from "./bg-rich.mjs";

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品(legacy の band/dotc/clouds/treeRow と同じ役割)
// ---------------------------------------------------------------------------

const W = 400;

/** 横帯。 */
function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/**
 * 空(グラデーション代わりに2枚重ねる)。
 *
 * `to` は**空を塗り下ろす深さ**。既定の118はこの下にすぐ地面が来る場合の値で、
 * 地面がもっと下から始まるシーンでは、その位置まで塗り下ろさないと
 * **空と地面のあいだが塗り残しになり、カードの地色が透ける**。
 * 実測(2026-08-08)で13種中11種にこの穴があり、gopuram では32行ぶん空いていた。
 * 塗り残しは目で見つけにくいので、背景を足したら必ず画素で数えること。
 */
function sky(top, bottom, to = 118) {
  return band(0, 84, top) + band(78, to - 78, bottom);
}

function sun(cx, cy, r, fill = "#f5b31c") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1) {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${cx + dx * scale}" cy="${cy}" rx="${rx * scale}" ry="${ry * scale}"/>`;
  return `<g opacity=".8" fill="#f6efe2">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** 地面。 */
function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

/** 遠景の丘の連なり。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 70},${y}c20,-34 50,-34 70,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** ヤシ並木。 */
function palmRow(y, count = 5) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = 30 + (i * (W - 60)) / (count - 1);
    parts.push(
      `<rect x="${x - 2}" y="${y - 34}" width="4" height="34" fill="#6b5330"/>`,
      `<path d="M${x},${y - 34}c-14,-4 -19,3 -21,9c7,-6 14,-6 21,-2c7,-4 14,-4 21,2c-2,-6 -7,-13 -21,-9z" fill="#2f7d3f"/>`,
    );
  }
  return parts.join("");
}

/** 水面の反射線。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7"><path d="M30,${y}h70M180,${y + 12}h90M110,${y + 24}h64"/></g>`;
}

/** 三角旗の連なり(祭りの飾り)。 */
function bunting(y) {
  const colors = ["#e8443f", "#f5b31c", "#5b8fe8", "#f6efe2", "#e8447a"];
  const parts = [`<path d="M0,${y}q200,26 400,0" stroke="#4a3a24" stroke-width="2" fill="none"/>`];
  for (let i = 0; i < 14; i++) {
    const x = 14 + i * 27;
    const dip = Math.round(13 * Math.sin((Math.PI * x) / W) * 2) / 2;
    parts.push(
      `<path d="M${x - 7},${y + dip}h14l-7,15z" fill="${colors[i % colors.length]}" opacity=".95"/>`,
    );
  }
  return parts.join("");
}

// ---------------------------------------------------------------------------
// 人と小物
//
// 背景を厚くするのに、いちばん効くのが**人**だった(建物だけの町にしない)。
// 20px前後で描く。同時に、置いたものの大きさが伝わるようになる。
// ---------------------------------------------------------------------------

/** 小数の桁を抑える。 */
const r1 = (v) => Math.round(v * 10) / 10;

/** 接地の影。敷かないと浮く。 */
function shade(cx, cy, rx, ry, o = ".2") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`;
}

/** 人。胴・脚・頭だけ。腕は `arm()` で別に足して、何をしているかを出す。 */
function person(x, base, h, shirt, skin = "#8a6440") {
  const hd = r1(h * 0.19);
  const top = r1(base - h + hd * 1.7);
  return (
    `<g><rect x="${r1(x - h * 0.09)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<rect x="${r1(x + h * 0.02)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<path d="M${r1(x - h * 0.16)},${top}h${r1(h * 0.32)}l${r1(h * 0.03)},${r1(h * 0.42)}h${r1(-h * 0.38)}z" fill="${shirt}"/>` +
    `<circle cx="${x}" cy="${r1(top - hd * 0.75)}" r="${hd}" fill="${skin}"/></g>`
  );
}

function arm(x, y, dx, dy, color = "#8a6440", w = 3) {
  return `<path d="M${x},${y}l${dx},${dy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
}

/** ガートの竹の傘。これが立っているだけで沐浴場だと分かる。 */
function parasol(x, base, h, r, fill = "#d8733c") {
  return (
    `<path d="M${x},${base}v${-h}" stroke="#6b5330" stroke-width="2.6" fill="none"/>` +
    `<path d="M${r1(x - r)},${r1(base - h)}q${r},${r1(-r * 0.85)} ${r1(r * 2)},0z" fill="${fill}"/>` +
    `<path d="M${r1(x - r)},${r1(base - h)}q${r},${r1(-r * 0.85)} ${r1(r * 2)},0" stroke="#8a4426" stroke-width="1.4" fill="none"/>` +
    `<g stroke="#8a4426" stroke-width="1" opacity=".55" fill="none"><path d="M${x},${r1(base - h)}v${r1(-r * 0.62)}M${r1(x - r * 0.55)},${r1(base - h)}q${r1(r * 0.3)},${r1(-r * 0.5)} ${r1(r * 0.55)},${r1(-r * 0.62)}M${r1(x + r * 0.55)},${r1(base - h)}q${r1(-r * 0.3)},${r1(-r * 0.5)} ${r1(-r * 0.55)},${r1(-r * 0.62)}"/></g>`
  );
}

/** 灯明(ディヤ)。葉の皿に灯をひとつ。水に流す。 */
function diya(x, y, s = 1) {
  return (
    `<path d="M${r1(x - 5 * s)},${y}q${r1(5 * s)},${r1(4 * s)} ${r1(10 * s)},0z" fill="#4f8f4a"/>` +
    `<ellipse cx="${x}" cy="${y}" rx="${r1(5 * s)}" ry="${r1(1.6 * s)}" fill="#6ba85a"/>` +
    `<path d="M${x},${r1(y - 1)}q${r1(-2.4 * s)},${r1(-4 * s)} 0,${r1(-6.4 * s)}q${r1(2.4 * s)},${r1(2.4 * s)} 0,${r1(6.4 * s)}z" fill="#f5b31c"/>` +
    `<circle cx="${x}" cy="${r1(y - 3.4 * s)}" r="${r1(1.5 * s)}" fill="#fff0c0"/>`
  );
}

/**
 * 水に浮かぶ舟。
 *
 * **平たい輪郭だけでは「水の上の物」か「水に空いた穴」かが決まらない。**
 * ガートで船体を暗い塊にしたら、水面に開いた穴に見えた。舷を明るくして縁は立ったが、
 * それは容器だと言えただけで、**水の上にあるとまでは言えていなかった**。
 *
 * 決めているのは輪郭ではなく**前後関係**なので、3つ重ねる。
 *
 * 1. **さざ波を遮る** — 波より後に描く。波が隠れていれば水面より手前にある
 * 2. **内側に暗い三日月** — へこんだ容器だと分かる(平らな板と区別がつく)
 * 3. **真下に映り込みの筋** — 影ではなく縦に伸びる筋。映り込むものは水の上にある
 *
 * 呼ぶ順に注意。**さざ波を描いたあとに呼ぶこと。**
 */
function boat(x, y, w, hull = "#6b4a2c", rim = "#c99a5c", trim = "#a8814c") {
  const h = r1(w * 0.18);
  return (
    // 映り込み(水面に落ちる縦の筋)
    `<g fill="${hull}" opacity=".2"><path d="M${r1(x - w * 0.36)},${r1(y + h + 1)}q${r1(w * 0.36)},${r1(h * 2.2)} ${r1(w * 0.72)},0z"/></g>` +
    // 船体
    `<path d="M${r1(x - w / 2)},${y}c${r1(w * 0.24)},${r1(-h * 0.7)} ${r1(w * 0.76)},${r1(-h * 0.7)} ${w},0c${r1(-w * 0.15)},${r1(h * 1.05)} ${r1(-w * 0.85)},${r1(h * 1.05)} ${-w},0z" fill="${hull}"/>` +
    // 内側の面(ここが「容器」だと言っている)
    `<path d="M${r1(x - w * 0.455)},${r1(y - 0.6)}c${r1(w * 0.22)},${r1(-h * 0.5)} ${r1(w * 0.69)},${r1(-h * 0.5)} ${r1(w * 0.91)},0c${r1(-w * 0.16)},${r1(h * 0.5)} ${r1(-w * 0.75)},${r1(h * 0.5)} ${r1(-w * 0.91)},0z" fill="${trim}"/>` +
    `<path d="M${r1(x - w * 0.42)},${r1(y - 1.4)}c${r1(w * 0.2)},${r1(-h * 0.34)} ${r1(w * 0.64)},${r1(-h * 0.34)} ${r1(w * 0.84)},0" stroke="#4a3323" stroke-width="1.2" fill="none" opacity=".55"/>` +
    // 舷(縁を立てる)
    `<path d="M${r1(x - w / 2)},${y}c${r1(w * 0.24)},${r1(-h * 0.7)} ${r1(w * 0.76)},${r1(-h * 0.7)} ${w},0" stroke="${rim}" stroke-width="2" fill="none"/>`
  );
}

/** 屋根つきの家船(シュリーナガルのシカラ)。 */
function houseBoat(x, y, w) {
  const bw = r1(w * 0.62);
  return (
    boat(x, y, w, "#5f4227", "#d8b06a", "#a8814c") +
    `<rect x="${r1(x - bw / 2)}" y="${r1(y - w * 0.3)}" width="${bw}" height="${r1(w * 0.24)}" fill="#e6d8bc"/>` +
    `<path d="M${r1(x - bw / 2 - 4)},${r1(y - w * 0.3)}h${r1(bw + 8)}l${-6},${r1(-w * 0.1)}h${r1(-bw + 4)}z" fill="#8a5a2c"/>` +
    `<g fill="#6b8fa8">${[0.2, 0.45, 0.7].map((t) => `<rect x="${r1(x - bw / 2 + bw * t)}" y="${r1(y - w * 0.24)}" width="${r1(bw * 0.14)}" height="${r1(w * 0.11)}"/>`).join("")}</g>` +
    `<g fill="#e8443f"><rect x="${r1(x - bw / 2)}" y="${r1(y - w * 0.32)}" width="${bw}" height="2.4"/></g>`
  );
}

/** 蓮の葉と花。水面に散らすと湖らしくなる。 */
function lotus(x, y, s = 1) {
  return (
    `<path d="M${r1(x - 7 * s)},${y}a${r1(7 * s)},${r1(3 * s)} 0 1 0 ${r1(14 * s)},0a${r1(7 * s)},${r1(3 * s)} 0 1 0 ${r1(-14 * s)},0z" fill="#3f7a4a"/>` +
    `<path d="M${x},${r1(y - 0.4)}l${r1(4 * s)},${r1(-1.6 * s)}" stroke="#2f5f3a" stroke-width="1" fill="none"/>`
  );
}

/**
 * らくだ。
 *
 * 胴と脚をひと筆の `path` で描いたら**犬にしか見えなかった。**
 * らくだだと分かるのは3つ — **こぶ・長い首・長い脚**。輪郭をまとめず、部位ごとに置く。
 */
function camel(x, base, s = 1, fill = "#c9a877", dark = "#a8875c") {
  const p = (v) => r1(v * s);
  // 部位に分けても、**輪郭にこぶと首が出ていなければ四つ足の獣にしか見えない。**
  // 直したのは3つ:
  //   ・こぶを細く高くした(幅14→11・高さ6.5→12)。裾が広いと背中の丸みに溶ける
  //   ・口先を前下がりにした(前は尖って前上がりで、鳥のくちばしに見えた)
  //   ・尾を短く下げた(上へ弧を描いていて、猫の尾に見えた)
  // 目安は「背の上に山が1つ、その前に首が斜めに立ち、頭は背より高い」。
  return (
    // 脚(細く長い。太いと机の脚になる)
    `<g stroke="${dark}" stroke-width="${p(2.2)}" stroke-linecap="round" fill="none">` +
    `<path d="M${x - p(9)},${base}v${-p(15)}M${x - p(4.5)},${base}v${-p(14)}M${x + p(4)},${base}v${-p(14)}M${x + p(9)},${base}v${-p(15)}"/></g>` +
    // 尾(短く、下へ垂らす)
    `<path d="M${x - p(12)},${base - p(21)}q${-p(3)},${p(5)} ${-p(1.5)},${p(9)}" stroke="${dark}" stroke-width="${p(1.4)}" stroke-linecap="round" fill="none"/>` +
    // 胴(背の線は水平に近く保つ。ここが基準線になる)
    `<path d="M${x - p(13)},${base - p(21)}q${p(13)},${-p(4)} ${p(25)},0q${p(1)},${p(7)} ${-p(3)},${p(8)}h${-p(19)}q${-p(4)},${-p(1)} ${-p(3)},${-p(8)}z" fill="${fill}"/>` +
    // こぶ。**背の線よりはっきり上に出す**
    `<path d="M${x - p(5.5)},${base - p(22.5)}q${p(1.5)},${-p(12)} ${p(5.5)},${-p(12)}q${p(4)},0 ${p(5.5)},${p(12)}z" fill="${fill}"/>` +
    // 首(肩から斜めに立ち上げる)
    `<path d="M${x + p(8)},${base - p(21)}q${p(7)},${-p(3)} ${p(9)},${-p(17)}l${p(4.5)},${p(1)}q${-p(1)},${p(15)} ${-p(8)},${p(19)}z" fill="${fill}"/>` +
    // 頭。口先は**前下がり**に
    `<path d="M${x + p(16)},${base - p(41)}q${p(4)},${-p(2.5)} ${p(6.5)},${p(1)}q${p(1)},${p(3)} ${p(3)},${p(4.5)}q${-p(2)},${p(2.5)} ${-p(5)},${p(2)}q${-p(4)},${-p(1)} ${-p(4.5)},${-p(5)}z" fill="${fill}"/>` +
    // 耳と目
    `<path d="M${x + p(17.4)},${base - p(41.4)}l${-p(0.5)},${-p(2.5)}l${p(2.6)},${p(1.6)}z" fill="${dark}"/>` +
    `<circle cx="${x + p(20)}" cy="${base - p(39.5)}" r="${p(0.9)}" fill="#3f3428"/>`
  );
}

/** 香辛料の山(円錐に盛る)。インドールやナーグプルの市場の顔。 */
function spiceCone(x, base, r, fill) {
  return (
    `<ellipse cx="${x}" cy="${base}" rx="${r}" ry="${r1(r * 0.3)}" fill="${fill}"/>` +
    `<path d="M${r1(x - r)},${base}q${r1(r * 0.35)},${r1(-r * 1.5)} ${r},${r1(-r * 1.5)}q${r1(r * 0.65)},0 ${r},${r1(r * 1.5)}z" fill="${fill}"/>` +
    `<path d="M${x},${r1(base - r * 1.5)}q${r1(r * 0.65)},0 ${r},${r1(r * 1.5)}z" fill="#000" opacity=".12"/>`
  );
}

/** オートリキシャ。インドの街角の記号。 */
function rickshaw(x, base, s = 1) {
  return (
    `<path d="M${r1(x - 13 * s)},${base}v${r1(-9 * s)}q${r1(3 * s)},${r1(-9 * s)} ${r1(13 * s)},${r1(-9 * s)}q${r1(10 * s)},0 ${r1(13 * s)},${r1(9 * s)}v${r1(9 * s)}z" fill="#f5b31c"/>` +
    `<path d="M${r1(x - 13 * s)},${r1(base - 9 * s)}q${r1(3 * s)},${r1(-9 * s)} ${r1(13 * s)},${r1(-9 * s)}q${r1(10 * s)},0 ${r1(13 * s)},${r1(9 * s)}z" fill="#3f6b4a"/>` +
    `<rect x="${r1(x - 8 * s)}" y="${r1(base - 8 * s)}" width="${r1(16 * s)}" height="${r1(5 * s)}" fill="#2f3a44" opacity=".7"/>` +
    `<g fill="#3f3428"><circle cx="${r1(x - 8 * s)}" cy="${base}" r="${r1(3 * s)}"/><circle cx="${r1(x + 9 * s)}" cy="${base}" r="${r1(3 * s)}"/></g>`
  );
}

/** ストゥーパ(チョルテン)。 */
function stupa(x, base, s = 1) {
  // 白一色だと、淡い遠景の上で背景に溶ける。陰の面を1段落として立体にする。
  return (
    `<path d="M${r1(x - 13 * s)},${base}h${r1(26 * s)}l${r1(-3 * s)},${r1(-5 * s)}h${r1(-20 * s)}z" fill="#c9c0ac"/>` +
    `<rect x="${r1(x - 10 * s)}" y="${r1(base - 10 * s)}" width="${r1(20 * s)}" height="${r1(5 * s)}" fill="#ded6c4"/>` +
    `<path d="M${r1(x - 10 * s)},${r1(base - 10 * s)}q${r1(10 * s)},${r1(-13 * s)} ${r1(20 * s)},0z" fill="#f2ede0"/>` +
    `<path d="M${x},${r1(base - 18.4 * s)}q${r1(6 * s)},${r1(4.6 * s)} ${r1(10 * s)},${r1(8.4 * s)}h${r1(-10 * s)}z" fill="#d8cfba"/>` +
    `<rect x="${r1(x - 4 * s)}" y="${r1(base - 23 * s)}" width="${r1(8 * s)}" height="${r1(5 * s)}" fill="#cfc6b0"/>` +
    `<path d="M${r1(x - 2.6 * s)},${r1(base - 23 * s)}l${r1(2.6 * s)},${r1(-7 * s)}l${r1(2.6 * s)},${r1(7 * s)}z" fill="#f5b31c"/>`
  );
}

/** 川べりの塔(シカラ)。段のある尖塔。 */
function shikhara(x, base, w, h, body = "#c9603c", trim = "#e0dbcd") {
  return (
    `<rect x="${x}" y="${r1(base - h * 0.62)}" width="${w}" height="${r1(h * 0.62)}" fill="${body}"/>` +
    `<path d="M${x},${r1(base - h * 0.62)}q${r1(w / 2)},${r1(-h * 0.44)} ${w},0z" fill="${body}"/>` +
    `<path d="M${r1(x + w * 0.18)},${r1(base - h * 0.62)}q${r1(w * 0.32)},${r1(-h * 0.3)} ${r1(w * 0.64)},0z" fill="${trim}" opacity=".55"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h * 0.66)}" width="${r1(w + 4)}" height="4" fill="${trim}"/>` +
    // 頂の飾り。**塔の先端の実際の位置に載せる。**
    // 屋根は二次ベジェなので、頂点は制御点(-0.44h)ではなく **-0.22h**。
    // 制御点の高さに置いたら、飾りが14px浮いて空に金の玉が漂って見えた。
    `<circle cx="${r1(x + w / 2)}" cy="${r1(base - h * 0.84 - w * 0.09)}" r="${r1(w * 0.11)}" fill="#f5b31c"/>` +
    `<rect x="${r1(x + w / 2 - 1)}" y="${r1(base - h * 0.84 - w * 0.3)}" width="2" height="${r1(w * 0.22)}" fill="#f5b31c"/>` +
    `<rect x="${r1(x + w * 0.36)}" y="${r1(base - h * 0.42)}" width="${r1(w * 0.28)}" height="${r1(h * 0.42)}" fill="#5a4630"/>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン
// ---------------------------------------------------------------------------

const BASE_BG = {
  /**
   * 首都(デリー)。**1都市専用。**
   *
   * 元は24要素。赤砂岩の箱とドームが中央にあり、**そこはシンボルの真後ろだった。**
   *
   * 層: 空 / 遠い官庁の稜線 / **左右に振り分けた列柱棟**(中央は低い塀)/
   * 並木 / 広い車道 / 車と人力車 / 手前の芝と旗。
   *
   * 「ひとつの平原に七つの都」— 首都の広い軸線を、並木道の遠近で出す。
   */
  capital:
    sky("#9ccbe8", "#cfe4f0", 128) +
    sun(322, 32, 15) +
    clouds(96, 30) +
    `<g fill="#f6efe2" opacity=".5"><ellipse cx="220" cy="20" rx="30" ry="4.2"/></g>` +
    `<g stroke="#7a6a50" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M150,44q4,-4 8,0q4,-4 8,0M188,34q3.4,-3.4 7,0q3.4,-3.4 7,0"/></g>` +
    // ── 遠景: 官庁街の稜線(霞ませる)
    `<g fill="#b8a898" opacity=".6"><rect x="96" y="98" width="26" height="30"/><rect x="130" y="90" width="20" height="38"/><rect x="252" y="94" width="24" height="34"/><rect x="284" y="100" width="20" height="28"/></g>` +
    // ── 赤砂岩の列柱棟。**左右に2棟、あいだは低い塀**(中央は隠れる)
    `<g fill="#c2603c"><rect x="14" y="76" width="112" height="52"/><rect x="274" y="82" width="110" height="46"/></g>` +
    `<g fill="#a84f30"><rect x="10" y="70" width="120" height="7"/><rect x="270" y="76" width="118" height="7"/></g>` +
    `<g fill="#d8734a"><path d="M46,70h48v-7a24,24 0 0 0 -48,0z"/><path d="M300,76h44v-6a22,22 0 0 0 -44,0z"/></g>` +
    `<circle cx="70" cy="56" r="21" fill="#e0dbcd"/><rect x="60" y="56" width="20" height="10" fill="#e0dbcd"/>` +
    `<rect x="66" y="28" width="7" height="10" fill="#f5b31c"/><circle cx="69.5" cy="37" r="4" fill="#f5b31c"/>` +
    `<circle cx="322" cy="64" r="17" fill="#e0dbcd"/><rect x="314" y="64" width="16" height="9" fill="#e0dbcd"/>` +
    `<rect x="319" y="42" width="6" height="8" fill="#f5b31c"/><circle cx="322" cy="50" r="3.4" fill="#f5b31c"/>` +
    // 列柱
    `<g fill="#8f4429">${[24, 44, 64, 84, 104, 284, 304, 324, 344, 364]
      .map((x) => `<rect x="${x}" y="${x < 200 ? 92 : 98}" width="11" height="${x < 200 ? 36 : 30}"/>`)
      .join("")}</g>` +
    `<g fill="#d8734a">${[24, 44, 64, 84, 104, 284, 304, 324, 344, 364]
      .map((x) => `<rect x="${x - 2}" y="${x < 200 ? 88 : 94}" width="15" height="5"/>`)
      .join("")}</g>` +
    // 中央の低い塀と門柱(隠れても惜しくない繰り返し)
    `<g fill="#c9b09c"><rect x="132" y="112" width="136" height="16"/></g>` +
    `<g fill="#a8907c">${[138, 158, 178, 198, 218, 238, 258].map((x) => `<rect x="${x}" y="${106}" width="6" height="22"/>`).join("")}</g>` +
    // ── 芝と並木道
    ground(128, "#8a9a52") +
    `<rect x="0" y="128" width="400" height="8" fill="#7a8a46"/>` +
    `<path d="M0,168h400v42H0z" fill="#c9b98c"/>` +
    `<g>${[[36, 166, 18], [92, 164, 15], [308, 166, 17], [360, 163, 14]]
      .map(([x, b, r]) => `<rect x="${x - 3}" y="${b - r - 8}" width="6" height="${r + 8}" fill="#6b5330"/><circle cx="${x}" cy="${b - r - 12}" r="${r}" fill="#3f8f4f"/>`)
      .join("")}</g>` +
    // ── 広い車道
    `<rect x="0" y="172" width="400" height="38" fill="#6f6a5e"/>` +
    `<g stroke="#f6efe2" stroke-width="3" stroke-dasharray="18 16" opacity=".75" fill="none"><path d="M0,191h400"/></g>` +
    `<rect x="0" y="172" width="400" height="3" fill="#8a8578"/>` +
    // 車と人力車。**y>170 の中央は隠れない**
    shade(196, 202, 24, 4, ".22") +
    `<path d="M174,202v-8q0,-4 5,-5l7,-6q2,-2 5,-2h13q4,0 5,3l3,5l7,2q4,1 4,5v6z" fill="#f0e6d2"/>` +
    `<g fill="#7f97ad" opacity=".85"><path d="M183,186h10v6h-15zM197,186h8l3,6h-11z"/></g>` +
    `<g fill="#3f3428"><circle cx="184" cy="202" r="3.6"/><circle cx="211" cy="202" r="3.6"/></g>` +
    shade(258, 206, 20, 3.6, ".2") +
    rickshaw(258, 206, 0.85) +
    shade(112, 200, 18, 3.4, ".2") +
    `<path d="M98,200v-6q0,-3 4,-4l6,-5q2,-2 4,-2h11q3,0 4,3l2,4l6,2q3,1 3,4v4z" fill="#e8443f"/>` +
    `<g fill="#3f3428"><circle cx="106" cy="200" r="3"/><circle cx="129" cy="200" r="3"/></g>` +
    // 歩く人
    shade(52, 204, 11, 3, ".2") +
    person(50, 204, 21, "#5b8fe8") +
    shade(342, 200, 11, 3, ".2") +
    person(340, 200, 20, "#f5b31c") +
    arm(340, 188, 11, 4) +
    // 手前の芝と旗
    `<g fill="#7a8a46"><ellipse cx="30" cy="209" rx="34" ry="6"/><ellipse cx="366" cy="208" rx="30" ry="6"/></g>` +
    `<path d="M148,172v-26" stroke="#8a8578" stroke-width="2.4" fill="none"/>` +
    `<g><rect x="149" y="146" width="24" height="6" fill="#f5b31c"/><rect x="149" y="152" width="24" height="5" fill="#f6efe2"/><rect x="149" y="157" width="24" height="6" fill="#3f8f4f"/></g>`,

  /**
   * ガンジスのガート(沐浴の石段)。**6都市が共用。**
   * (リシケシュ・ハリドワール・プラヤーグラージ・ワーラーナシー・パトナ・ナーシク)
   *
   * 元は23要素で、空と石段4本と川、岸に箱形の寺が2つあるだけだった。
   * **ガートは人が沐浴し灯明を流す場所なのに、人が1人もいなかった。**
   *
   * 層: 夕空 / 町の稜線(塔とハヴェリー)/ 幅と色を変えた石段 / 竹の傘 /
   * 石段の人々 / 川 / 渡し舟 / 水に流れる灯明。
   *
   * 灯明は**シンボルの下(y>170)の中央**にも置いている。ここは隠れない。
   */
  ghat:
    sky("#e2915a", "#f0b87a", 122) +
    sun(316, 62, 21, "#f2803c") +
    `<circle cx="316" cy="62" r="26" fill="#f8d8a8" opacity=".14"/>` +
    `<g fill="#f8dcb0" opacity=".5"><ellipse cx="96" cy="26" rx="34" ry="4.6"/><ellipse cx="70" cy="33" rx="22" ry="3.4"/><ellipse cx="216" cy="18" rx="26" ry="4"/></g>` +
    // 夕方の鳥
    `<g stroke="#7a5a3c" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M120,40q4,-4 8,0q4,-4 8,0M156,30q3.4,-3.4 7,0q3.4,-3.4 7,0M96,52q3,-3 6,0q3,-3 6,0"/></g>` +
    // ── 町の稜線。**中央はシンボルに隠れるので、目立つ塔は左右に置く**
    `<g fill="#b08a6a" opacity=".55"><rect x="150" y="86" width="34" height="36"/><rect x="196" y="80" width="28" height="42"/><rect x="234" y="90" width="30" height="32"/></g>` +
    shikhara(30, 122, 30, 66) +
    shikhara(74, 122, 22, 46, "#d8a05c") +
    shikhara(330, 122, 26, 74, "#c26a44") +
    // ハヴェリー(川に面した館)。窓とバルコニーで密度を出す
    `<g fill="#e0d2b8"><rect x="104" y="82" width="42" height="40"/><rect x="270" y="88" width="52" height="34"/></g>` +
    `<g fill="#c9b898"><rect x="100" y="78" width="50" height="6"/><rect x="266" y="84" width="60" height="6"/></g>` +
    `<g fill="#6b5330"><rect x="110" y="92" width="9" height="14" rx="4.5"/><rect x="124" y="92" width="9" height="14" rx="4.5"/><rect x="278" y="96" width="9" height="14" rx="4.5"/><rect x="292" y="96" width="9" height="14" rx="4.5"/><rect x="306" y="96" width="9" height="14" rx="4.5"/></g>` +
    `<g fill="#d8733c" opacity=".8"><rect x="106" y="110" width="38" height="4"/><rect x="274" y="114" width="44" height="4"/></g>` +
    // ── 石段。**幅と色を変える。**同じ帯を等間隔に並べると縞模様に見える
    ground(122, "#c9a877") +
    `<g fill="#b8a179"><path d="M0,122h400v9H0z"/><path d="M0,134h400v11H0z"/><path d="M0,148h400v9H0z"/><path d="M0,160h400v11H0z"/></g>` +
    `<g fill="#a89468"><path d="M0,131h400v3H0z"/><path d="M0,157h400v3H0z"/></g>` +
    `<g fill="#d8c9a4" opacity=".7"><path d="M0,122h400v2H0z"/><path d="M0,134h400v2H0z"/><path d="M0,148h400v2H0z"/><path d="M0,160h400v2H0z"/></g>` +
    // 石の縦の目地。**横帯だけだと縞模様に見える。**継ぎ目を段ごとにずらす
    `<g stroke="#8f7c54" stroke-width="1.3" opacity=".55" fill="none"><path d="M24,122v9M92,122v9M158,122v9M228,122v9M296,122v9M366,122v9M58,134v11M126,134v11M192,134v11M262,134v11M330,134v11M390,134v11M18,148v9M88,148v9M166,148v9M236,148v9M304,148v9M372,148v9M52,160v11M120,160v11M196,160v11M268,160v11M338,160v11"/></g>` +
    // 水へ下りる階段の切れ目(左右)
    `<g fill="#a89468"><rect x="86" y="122" width="5" height="49"/><rect x="312" y="122" width="5" height="49"/></g>` +
    // ── 竹の傘。ガートの目印
    parasol(60, 150, 30, 19) +
    parasol(120, 154, 26, 16, "#c95a3c") +
    parasol(296, 152, 28, 18, "#d88a3c") +
    parasol(352, 156, 24, 15, "#c95a3c") +
    // ── 石段の人々(左右へ。中央はシンボルの下敷きになる)
    shade(46, 168, 11, 3, ".18") +
    person(44, 168, 20, "#f5b31c") +
    arm(44, 156, 10, -7) +
    shade(70, 172, 10, 3, ".18") +
    person(68, 172, 18, "#e8443f") +
    shade(134, 166, 10, 3, ".18") +
    person(132, 166, 19, "#f0e6d2") +
    arm(132, 154, -9, -6) +
    shade(286, 170, 11, 3, ".18") +
    person(284, 170, 21, "#d8733c") +
    arm(284, 157, 11, 5) +
    shade(342, 174, 10, 3, ".18") +
    person(340, 174, 18, "#5b8fe8") +
    // 座っている僧(オレンジの衣)
    `<g fill="#e08a2c"><path d="M104,172q9,-6 18,0l3,8h-24z"/></g>` +
    `<circle cx="113" cy="162" r="4.2" fill="#8a6440"/>` +
    // ── 川。手前ほど明るく
    band(172, 16, "#4f7f72") +
    band(186, 24, "#5f9282") +
    `<g stroke="#a8c8b4" stroke-width="2" opacity=".55" fill="none"><path d="M20,180h56M120,177h40M250,181h64M334,178h52M46,192h50M180,195h58M296,198h74M14,204h64"/></g>` +
    // 沐浴する人。**頭だけだと水に浮いた顔に見える。**肩と腕を水面の上に出す
    `<g><path d="M167,183q9,-11 18,0z" fill="#e8443f"/><circle cx="176" cy="172" r="4.4" fill="#8a6440"/>` +
    `<path d="M170,176l-7,5M182,176l7,5" stroke="#8a6440" stroke-width="2.6" stroke-linecap="round" fill="none"/></g>` +
    `<g><path d="M206,187q8,-10 16,0z" fill="#f0e6d2"/><circle cx="214" cy="177" r="4" fill="#8a6440"/>` +
    `<path d="M209,181l-6,-5M219,181l6,-5" stroke="#8a6440" stroke-width="2.4" stroke-linecap="round" fill="none"/></g>` +
    `<g stroke="#cfe4dc" stroke-width="1.6" opacity=".7" fill="none"><path d="M160,184q16,5 32,0M198,188q16,5 32,0"/></g>` +
    // ── 渡し舟。手前の川に2隻。
    // 濃い茶の船体だけだと水面に開いた穴に見えたので、舷を明るくして縁を立てる
    shade(88, 201, 30, 4, ".16") +
    `<path d="M56,190c16,-6 50,-6 66,0c-10,9 -56,9 -66,0z" fill="#5f4227"/>` +
    `<path d="M58,190c15,-5 48,-5 62,0c-9,4 -53,4 -62,0z" fill="#a8814c"/>` +
    `<path d="M56,190c16,-6 50,-6 66,0" stroke="#c99a5c" stroke-width="2" fill="none"/>` +
    `<path d="M96,190v-20" stroke="#4a3a24" stroke-width="2" fill="none"/>` +
    `<path d="M98,172l14,18h-14z" fill="#f0e6d2"/>` +
    person(74, 190, 17, "#f5b31c") +
    shade(336, 200, 26, 4, ".16") +
    `<path d="M308,196c12,-5 40,-5 52,0c-8,7 -44,7 -52,0z" fill="#5f4227"/>` +
    `<path d="M310,196c11,-4 38,-4 48,0c-7,3 -41,3 -48,0z" fill="#a8814c"/>` +
    `<path d="M308,196c12,-5 40,-5 52,0" stroke="#c99a5c" stroke-width="1.8" fill="none"/>` +
    person(330, 196, 15, "#5b8fe8") +
    arm(330, 186, 12, -6) +
    // ── 水に流れる灯明。**y>170 の中央は隠れないので、ここを使う**
    diya(158, 200, 1.15) +
    diya(196, 192, 1) +
    diya(232, 202, 1.1) +
    diya(268, 190, 0.9) +
    diya(140, 186, 0.85) +
    diya(202, 207, 1.2) +
    `<g fill="#f5b31c" opacity=".22"><ellipse cx="158" cy="203" rx="12" ry="3.4"/><ellipse cx="232" cy="205" rx="11" ry="3"/><ellipse cx="202" cy="210" rx="13" ry="3.4"/></g>` +
    // 岸に並べた灯明の盆
    `<ellipse cx="256" cy="167" rx="15" ry="4.6" fill="#a8813c"/>` +
    diya(250, 165, 0.7) +
    diya(262, 166, 0.7),

  /**
   * 砂漠の城塞都市。**6都市が共用。**
   * (グワリオル・ジャイプル・ジョードプル・ジャイサルメール・ビーカーネール・ブジ)
   *
   * 元は22要素。城砦の箱がひとつと、ラクダの影が1頭。
   *
   * 層: 空 / 砂丘の稜線 / **横に広い城壁**(中央が隠れても両翼の櫓が見える)/
   * 城門 / 麓の街(ジョードプルの青い家)/ 日除けの布 / らくだの隊商 / 砂丘の起伏。
   *
   * らくだと人は **y>170 の中央**。ここは隠れないので隊商がそのまま見える。
   */
  desertfort:
    sky("#8fb8d8", "#e2d0a8", 132) +
    sun(70, 32, 17, "#f5d06a") +
    `<circle cx="70" cy="32" r="22" fill="#fdf0c8" opacity=".16"/>` +
    `<g fill="#f2e2c0" opacity=".5"><ellipse cx="250" cy="22" rx="32" ry="4.4"/><ellipse cx="226" cy="29" rx="20" ry="3.2"/></g>` +
    // 鳶
    `<g stroke="#8a7050" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M320,40q4,-4 8,0q4,-4 8,0M356,30q3.4,-3.4 7,0q3.4,-3.4 7,0"/></g>` +
    // ── 岩山の稜線(城砦が乗る台地)
    `<path d="M0,132q40,-16 86,-14q30,1 44,-8h140q16,10 46,9q46,-2 84,13z" fill="#b89a68"/>` +
    // ── 城壁。**中央はシンボルに隠れるので、櫓を左右の端に置く**
    `<g fill="#c98a4a"><rect x="42" y="74" width="316" height="42"/></g>` +
    `<g fill="#b0733c">${[46, 74, 102, 130, 158, 186, 214, 242, 270, 298, 326].map((x) => `<rect x="${x}" y="66" width="16" height="9"/>`).join("")}</g>` +
    `<g fill="#d8a05c"><rect x="42" y="74" width="316" height="4"/></g>` +
    // 左右の櫓(ここが見える部分)
    `<g fill="#c07f42"><rect x="34" y="52" width="36" height="64"/><rect x="330" y="46" width="38" height="70"/></g>` +
    `<g fill="#b0733c"><rect x="30" y="46" width="44" height="8"/><rect x="326" y="40" width="46" height="8"/></g>` +
    `<g fill="#d8a05c"><path d="M40,46a12,12 0 0 1 24,0z"/><path d="M336,40a13,13 0 0 1 26,0z"/></g>` +
    `<g fill="#8a5a2c"><rect x="44" y="66" width="10" height="16" rx="5"/><rect x="340" y="60" width="10" height="16" rx="5"/><rect x="44" y="92" width="10" height="16" rx="5"/><rect x="340" y="86" width="10" height="16" rx="5"/></g>` +
    // 城門(中央下寄り。上半分は隠れるが門の口は見える)
    `<path d="M176,116V96a24,24 0 0 1 48,0v20z" fill="#7a4a22"/>` +
    `<path d="M182,116V98a18,18 0 0 1 36,0v18z" fill="#4f3018"/>` +
    // ── 麓の街(ジョードプルの青い家)。城壁の下に段々に積む
    ground(116, "#dcc182") +
    `<g fill="#6f93bc"><rect x="16" y="118" width="30" height="22"/><rect x="52" y="124" width="24" height="16"/><rect x="82" y="116" width="28" height="24"/><rect x="290" y="120" width="26" height="20"/><rect x="322" y="116" width="30" height="24"/><rect x="358" y="124" width="26" height="16"/></g>` +
    `<g fill="#8fb0d0"><rect x="16" y="118" width="30" height="4"/><rect x="82" y="116" width="28" height="4"/><rect x="322" y="116" width="30" height="4"/></g>` +
    `<g fill="#3f5f80"><rect x="26" y="126" width="8" height="14"/><rect x="92" y="124" width="8" height="16"/><rect x="332" y="124" width="8" height="16"/><rect x="366" y="130" width="7" height="10"/></g>` +
    // 日除けの布(路地に渡す)
    `<g fill="#e8443f" opacity=".85"><path d="M46,122h32l-4,8h-24z"/></g>` +
    `<g fill="#f5b31c" opacity=".85"><path d="M352,122h30l-4,8h-22z"/></g>` +
    // ── 砂丘(手前ほど明るく、起伏を重ねる)
    `<path d="M0,146q60,-14 122,-4q64,10 130,-2q58,-11 148,6v64H0z" fill="#cfae6e"/>` +
    `<path d="M0,170q70,-12 138,0q62,11 132,-2q52,-11 130,4v38H0z" fill="#c29c58"/>` +
    `<g fill="#b8934e" opacity=".7"><ellipse cx="86" cy="192" rx="70" ry="8"/><ellipse cx="320" cy="200" rx="76" ry="8"/></g>` +
    // ── らくだの隊商。
    // **らくだの首と頭は背より高い = y=150 あたりに来る。**中央に置くと
    // シンボルの台座に食われるので、隊商は左へ寄せ、引き手だけを中央下に置く。
    shade(80, 196, 26, 4, ".18") +
    camel(80, 196, 1.1) +
    shade(128, 202, 22, 3.6, ".18") +
    camel(128, 202, 0.9) +
    // 引き手(中央の y>170。ここは隠れない)
    shade(198, 202, 12, 3.2, ".18") +
    person(196, 202, 22, "#f0e6d2") +
    arm(196, 188, -13, -2) +
    `<path d="M182,185l-32,-11" stroke="#8a5a2c" stroke-width="1.4" fill="none"/>` +
    // 荷を担ぐ人と、日陰で休む人
    shade(34, 186, 11, 3, ".18") +
    person(32, 186, 20, "#e8443f") +
    `<rect x="22" y="166" width="20" height="7" fill="#a8813c"/>` +
    arm(32, 174, -7, -6) +
    shade(346, 190, 11, 3, ".18") +
    person(344, 190, 19, "#5b8fe8") +
    // 乾いた草
    `<g stroke="#a89050" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M20,204v-9M26,205v-7M32,203v-10M372,206v-8M378,204v-10"/></g>`,

  /**
   * 南インドの寺院都市。**2都市が共用。**(マドゥライ・タンジャーヴール)
   *
   * 元は32要素。塔門が中央にひとつだけで、**そこはシンボルの真後ろだった。**
   *
   * 層: 空 / 椰子の遠景 / **左右に振り分けた塔門2基**(南インドの寺は四方に門がある)/
   * 回廊 / 沐浴池と石段 / 参拝者 / 花輪売り。
   */
  gopuram:
    sky("#8fc4e8", "#d4ead8", 146) +
    sun(64, 32, 16) +
    clouds(310, 26) +
    `<g fill="#f6efe2" opacity=".5"><ellipse cx="190" cy="20" rx="28" ry="4"/></g>` +
    palmRow(146, 5) +
    // ── 塔門。**中央に1基だと隠れるので、左右に2基**。段ごとに色帯と小塔を載せる
    `<g fill="#e6dcc4">${[[26, 146, 78, 0], [292, 146, 74, 1]]
      .map(([x, b, w]) => {
        const steps = [];
        for (let i = 0; i < 5; i++) {
          const sw = r1(w - i * (w * 0.13));
          const sx = r1(x + (w - sw) / 2);
          steps.push(`<path d="M${sx},${b - i * 17}v-17h${sw}v17z"/>`);
        }
        return steps.join("");
      })
      .join("")}</g>` +
    `<g fill="#c9583c" opacity=".9">${[[26, 78], [292, 74]]
      .map(([x, w]) =>
        [0, 1, 2, 3]
          .map((i) => {
            const sw = r1(w - i * (w * 0.13));
            const sx = r1(x + (w - sw) / 2);
            return `<rect x="${sx}" y="${146 - i * 17 - 5}" width="${sw}" height="4"/>`;
          })
          .join(""),
      )
      .join("")}</g>` +
    `<g fill="#f5b31c">${[[26, 78], [292, 74]]
      .map(([x, w]) => {
        const tw = r1(w * 0.42);
        const tx = r1(x + (w - tw) / 2);
        return `<path d="M${tx},${146 - 85}h${tw}l${r1(-tw / 2)},-13z"/><rect x="${r1(x + w / 2 - 1.6)}" y="${146 - 104}" width="3.2" height="7"/>`;
      })
      .join("")}</g>` +
    // 塔門の入口
    `<g fill="#5a3f24"><path d="M52,146v-22a13,13 0 0 1 26,0v22z"/><path d="M316,146v-20a12,12 0 0 1 24,0v20z"/></g>` +
    `<g fill="#3f2c18"><path d="M57,146v-20a8,8 0 0 1 16,0v20z"/><path d="M320,146v-18a8,8 0 0 1 16,0v18z"/></g>` +
    // 彫像の列(段に並ぶ)
    `<g fill="#d8a05c" opacity=".85">${[[34, 129], [46, 129], [58, 129], [70, 129], [82, 129], [300, 129], [312, 129], [324, 129], [336, 129], [42, 112], [56, 112], [70, 112], [306, 112], [320, 112], [334, 112]]
      .map(([x, y]) => `<rect x="${x}" y="${y}" width="7" height="10" rx="3.5"/>`)
      .join("")}</g>` +
    // ── 回廊(中央。隠れても惜しくない繰り返し)
    ground(146, "#9ab45c") +
    `<g fill="#e0d6bc"><rect x="104" y="118" width="188" height="28"/></g>` +
    `<g fill="#c9bda0">${[112, 136, 160, 184, 208, 232, 256, 276].map((x) => `<path d="M${x},146V128a8,8 0 0 1 16,0v18z"/>`).join("")}</g>` +
    `<g fill="#c9583c" opacity=".8"><rect x="100" y="114" width="196" height="5"/></g>` +
    // ── 沐浴池(手前)と石段
    `<path d="M0,158h400v52H0z" fill="#8aa858"/>` +
    `<g fill="#7f9a50"><rect x="0" y="158" width="400" height="6"/><rect x="0" y="168" width="400" height="6"/></g>` +
    band(178, 32, "#3f8f9f") +
    `<path d="M0,178h400v5H0z" fill="#d8c9a4"/>` +
    `<g stroke="#bfe8f4" stroke-width="2" opacity=".6" fill="none"><path d="M22,190h56M110,196h44M250,192h68M336,200h52"/></g>` +
    `<g fill="#5fa8b8" opacity=".5"><ellipse cx="120" cy="196" rx="40" ry="7"/><ellipse cx="300" cy="202" rx="46" ry="7"/></g>` +
    // ── 参拝者と花輪売り
    shade(70, 176, 11, 3, ".18") +
    person(68, 176, 21, "#e8443f") +
    arm(68, 163, 11, -6) +
    shade(120, 174, 10, 3, ".18") +
    person(118, 174, 19, "#f0e6d2") +
    shade(268, 176, 11, 3, ".18") +
    person(266, 176, 20, "#f5b31c") +
    arm(266, 164, -10, 5) +
    // 池に入る人(肩から上)
    `<g><path d="M188,196q8,-10 16,0z" fill="#f0e6d2"/><circle cx="196" cy="186" r="4.2" fill="#8a6440"/>` +
    `<path d="M191,190l-6,-5M201,190l6,-5" stroke="#8a6440" stroke-width="2.4" stroke-linecap="round" fill="none"/></g>` +
    `<g stroke="#cfe8ec" stroke-width="1.6" opacity=".7" fill="none"><path d="M180,197q16,5 32,0"/></g>` +
    // 花輪(南インドの寺の前には必ず売っている)
    `<g fill="#a8813c"><rect x="330" y="164" width="46" height="4"/><rect x="332" y="168" width="4" height="10"/><rect x="370" y="168" width="4" height="10"/></g>` +
    `<g fill="#f5b31c">${[336, 346, 356, 366].map((x) => `<circle cx="${x}" cy="${161}" r="4"/>`).join("")}</g>` +
    `<g fill="#e8443f">${[341, 351, 361].map((x) => `<circle cx="${x}" cy="${158}" r="3.4"/>`).join("")}</g>`,

  /** 海辺の港町(アラビア海側)。 */
  arabianport:
    sky("#8fc4e8", "#cfe4f0") +
    sun(70, 32, 15) +
    clouds(300, 26) +
    band(112, 56, "#2f7fa8") +
    ripples(126) +
    ground(160, "#d2bd8e") +
    palmRow(160, 4) +
    // 中華網(チャイニーズ・フィッシングネット)
    `<g stroke="#4a3a24" stroke-width="3" fill="none"><path d="M60,112l-34,26M60,112l34,26M60,112v-24"/></g>` +
    `<path d="M26,138h68l-34,20z" fill="#6b8f7a" opacity=".7"/>` +
    // 帆かけ舟
    `<path d="M250,140c16,-6 54,-6 68,0c-10,10 -58,10 -68,0z" fill="#7a5a34"/>` +
    `<path d="M284,138v-40l26,40z" fill="#f6efe2"/>`,

  /**
   * 茶畑の丘。**3都市が共用。**(ダージリン・ムンナール・シロン)
   *
   * 元は20要素で、**インドで最も薄い背景**だった。丘の輪郭と等高線が4本あるだけ。
   *
   * 層: 朝靄の空 / 遠い雪嶺(カンチェンジュンガ)/ 霧の帯 / 段になった茶畝 /
   * 茶摘みの人 / 日除けの木 / 手前の茶株。
   */
  teagarden:
    sky("#a8cfe0", "#dceae0", 136) +
    `<circle cx="330" cy="34" r="15" fill="#fdf6dc"/>` +
    `<circle cx="330" cy="34" r="22" fill="#fdf6dc" opacity=".16"/>` +
    // 遠い雪嶺(ダージリンからはカンチェンジュンガが見える)
    `<path d="M0,108L46,66L82,92L128,58L176,96L222,70L268,98L316,72L360,94L400,80V120H0z" fill="#cfdce8"/>` +
    `<path d="M46,66l14,18q-7,4 -14,0q-7,4 -14,0zM128,58l15,20q-7,5 -15,0q-7,5 -15,0zM316,72l14,18q-7,4 -14,0q-7,4 -14,0z" fill="#f8fbfd"/>` +
    // 霧の帯。茶園は雲の中にある
    `<g fill="#eaf2f4" opacity=".8"><path d="M0,104q60,-8 120,0t140,2q70,-4 140,-6v18H0z"/></g>` +
    `<g fill="#f4f9fa" opacity=".55"><ellipse cx="96" cy="112" rx="80" ry="7"/><ellipse cx="300" cy="118" rx="90" ry="6"/></g>` +
    // 丘の重なり(奥を淡く、手前を濃く)
    `<path d="M0,124q54,-18 112,-4q56,14 116,-4q58,-17 172,4v26H0z" fill="#6f9a5a"/>` +
    ground(140, "#5f9450") +
    `<path d="M0,152q70,-12 138,2q66,13 132,-4q54,-13 130,4v56H0z" fill="#4f8544"/>` +
    // ── 段になった茶畝。**畝の高さも色も変える**(等間隔の線だと縞になる)
    `<g stroke="#3f6b3a" stroke-width="3.4" opacity=".65" fill="none"><path d="M-6,146q100,-14 200,0t206,-2M-6,164q100,-14 200,0t206,-2M-6,182q100,-14 200,0t206,-2M-6,200q100,-14 200,0t206,-2"/></g>` +
    `<g stroke="#79b062" stroke-width="1.6" opacity=".5" fill="none"><path d="M-6,140q100,-14 200,0t206,-2M-6,158q100,-14 200,0t206,-2M-6,176q100,-14 200,0t206,-2M-6,194q100,-14 200,0t206,-2"/></g>` +
    // 茶株(丸い塊を畝に沿って)
    `<g fill="#3f7a3c">${[[16, 150], [52, 147], [88, 146], [124, 147], [270, 148], [306, 150], [342, 152], [378, 154], [30, 186], [70, 184], [110, 183], [292, 186], [332, 189], [372, 192]]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="6"/>`)
      .join("")}</g>` +
    // ── 茶摘みの人。背に籠を負い、手を茶株に伸ばす
    shade(154, 178, 12, 3.2, ".18") +
    person(152, 178, 22, "#e8443f") +
    arm(152, 164, 12, 4) +
    `<path d="M141,162q-9,3 -8,12q1,8 9,7z" fill="#a8813c"/>` +
    `<path d="M144,160l3,-6" stroke="#7a5a34" stroke-width="1.4" fill="none"/>` +
    shade(238, 184, 11, 3, ".18") +
    person(236, 184, 20, "#f5b31c") +
    arm(236, 172, -11, 4) +
    `<path d="M226,168q-8,3 -7,11q1,7 8,6z" fill="#a8813c"/>` +
    // ── 日除けの木(茶園には必ず日陰樹がある)
    `<path d="M46,150v-30" stroke="#5a4630" stroke-width="4" fill="none" stroke-linecap="round"/>` +
    `<path d="M46,128l-12,-8M46,134l11,-9" stroke="#5a4630" stroke-width="2.2" fill="none" stroke-linecap="round"/>` +
    `<g fill="#2f6b3a"><ellipse cx="34" cy="116" rx="18" ry="10"/><ellipse cx="58" cy="120" rx="16" ry="9"/><ellipse cx="46" cy="108" rx="17" ry="9"/></g>` +
    `<path d="M348,146v-26" stroke="#5a4630" stroke-width="3.4" fill="none" stroke-linecap="round"/>` +
    `<g fill="#2f6b3a"><ellipse cx="338" cy="116" rx="15" ry="8"/><ellipse cx="358" cy="119" rx="14" ry="8"/><ellipse cx="348" cy="109" rx="15" ry="8"/></g>` +
    // ── 製茶工場(茶園には必ずある。摘んだ葉をここへ運ぶ)
    `<rect x="250" y="130" width="76" height="18" fill="#e6dcc4"/>` +
    `<path d="M246,130h84l-8,-9h-68z" fill="#b8412f"/>` +
    `<g fill="#8fa8b8"><rect x="256" y="135" width="10" height="9"/><rect x="272" y="135" width="10" height="9"/><rect x="288" y="135" width="10" height="9"/><rect x="304" y="135" width="10" height="9"/></g>` +
    `<rect x="330" y="118" width="7" height="30" fill="#c9bda0"/>` +
    `<g fill="#eef4f4" opacity=".6"><ellipse cx="334" cy="112" rx="9" ry="5"/><ellipse cx="342" cy="104" rx="7" ry="4"/></g>` +
    shade(288, 149, 44, 4, ".14") +
    // ── **y>170 の中央は隠れない**ので、ここにも茶株と摘み手を置く
    `<g fill="#3f7a3c">${[[146, 178], [176, 176], [206, 177], [236, 179], [162, 196], [194, 194], [226, 196], [256, 198]]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="6.5"/>`)
      .join("")}</g>` +
    shade(300, 196, 12, 3.2, ".18") +
    person(298, 196, 21, "#5b8fe8") +
    arm(298, 182, -12, 4) +
    `<path d="M288,180q-9,3 -8,12q1,8 9,7z" fill="#a8813c"/>` +
    // ── 最前景の茶株(大きく、手前に)
    `<g fill="#356b34"><ellipse cx="30" cy="206" rx="26" ry="11"/><ellipse cx="98" cy="209" rx="24" ry="10"/><ellipse cx="352" cy="208" rx="26" ry="11"/></g>` +
    `<g fill="#4a8548"><ellipse cx="26" cy="202" rx="16" ry="6"/><ellipse cx="348" cy="204" rx="15" ry="6"/></g>`,

  /**
   * ヒマラヤの山あいの町。**5都市が共用。**
   * (レー・ダラムサラ・シムラー・ガントク・タワン)
   *
   * 元は28要素。雪嶺のジグザグが1本と、経文旗と、箱形の僧院がひとつ。
   *
   * 層: 高山の空(上が濃い)/ 遠い雪嶺 / 手前の稜線 / 経文旗 / **左に僧院、右にストゥーパ** /
   * 段々の集落 / 僧2人とヤク / 最前景の岩と草。
   */
  himalaya:
    sky("#4f8fc8", "#93bfdc", 128) +
    `<circle cx="330" cy="30" r="14" fill="#fdf4d8"/>` +
    `<circle cx="330" cy="30" r="21" fill="#fdf4d8" opacity=".14"/>` +
    `<g fill="#f4fafd" opacity=".55"><ellipse cx="96" cy="26" rx="34" ry="4.4"/><ellipse cx="70" cy="33" rx="21" ry="3.2"/><ellipse cx="220" cy="20" rx="26" ry="3.8"/></g>` +
    // ── 遠い雪嶺(奥は霞ませる)
    `<path d="M0,120L44,58L78,88L120,44L166,92L214,52L262,96L308,50L352,86L400,60V150H0z" fill="#cfdae8"/>` +
    `<path d="M44,58l14,19q-7,4 -14,0q-7,4 -14,0zM120,44l16,21q-8,5 -16,0q-8,5 -16,0zM214,52l15,20q-7,5 -15,0q-8,5 -15,0zM308,50l16,21q-8,5 -16,0q-8,5 -16,0z" fill="#f8fbfd"/>` +
    // 手前の稜線(乾いた高地の色)
    `<path d="M0,138L48,102L96,126L146,98L196,130L248,104L300,128L348,100L400,126V160H0z" fill="#8a8f8a"/>` +
    `<path d="M0,150L52,126L108,144L164,124L220,148L276,126L330,146L400,128V170H0z" fill="#6f7a68"/>` +
    // ── 経文旗。高地の町の記号
    bunting(104) +
    // ── 僧院(左)。段になった白壁に赤い帯
    ground(150, "#7a8560") +
    `<g fill="#f2ede0"><rect x="26" y="104" width="76" height="46"/><rect x="40" y="86" width="48" height="20"/></g>` +
    `<g fill="#e0d8c4"><rect x="22" y="100" width="84" height="6"/><rect x="36" y="82" width="56" height="6"/></g>` +
    `<g fill="#b8412f"><rect x="26" y="112" width="76" height="9"/><rect x="40" y="90" width="48" height="6"/></g>` +
    `<g fill="#f5b31c"><rect x="36" y="76" width="56" height="7"/></g>` +
    `<path d="M50,76h28l-14,-10z" fill="#d8a02c"/>` +
    `<g fill="#5a4630"><rect x="36" y="126" width="12" height="24"/><rect x="58" y="126" width="12" height="24"/><rect x="80" y="126" width="12" height="24"/><rect x="52" y="94" width="10" height="12"/><rect x="70" y="94" width="10" height="12"/></g>` +
    `<g fill="#e8443f" opacity=".8"><rect x="36" y="124" width="12" height="3"/><rect x="58" y="124" width="12" height="3"/><rect x="80" y="124" width="12" height="3"/></g>` +
    // ── ストゥーパ(右)と小さな祠
    stupa(322, 150, 1.5) +
    shade(322, 151, 24, 4, ".16") +
    stupa(366, 154, 0.95) +
    // 集落(段々に積む)
    `<g fill="#e6dcc4"><rect x="118" y="128" width="30" height="22"/><rect x="252" y="132" width="28" height="18"/><rect x="282" y="126" width="24" height="24"/></g>` +
    `<g fill="#c9bda0"><rect x="118" y="126" width="30" height="4"/><rect x="252" y="130" width="28" height="4"/><rect x="282" y="124" width="24" height="4"/></g>` +
    `<g fill="#8a5a2c"><rect x="128" y="136" width="9" height="14"/><rect x="262" y="140" width="8" height="10"/><rect x="290" y="134" width="9" height="16"/></g>` +
    // ── 僧2人(えび茶の衣)とヤク
    shade(118, 176, 12, 3.2, ".18") +
    person(116, 176, 22, "#a8412f") +
    arm(116, 162, 11, 5) +
    shade(140, 180, 11, 3, ".18") +
    person(138, 180, 20, "#c2523a") +
    // ── ヤク。**輪郭をひと筆にすると黒い塊にしかならない。**らくだと同じで、
    // ヤクだと分かるのは **垂れ下がる長い毛・低い体・上へ反った角**。部位ごとに置く。
    shade(268, 191, 28, 4, ".18") +
    // 脚(短く太い)
    `<g stroke="#2f2820" stroke-width="4" stroke-linecap="round" fill="none"><path d="M252,190v-8M262,190v-7M278,190v-7M288,190v-8"/></g>` +
    // 胴
    `<path d="M244,178q0,-11 12,-11h30q12,0 12,11v6H244z" fill="#3f3428"/>` +
    // 垂れ下がる毛(裾を波打たせる。これがヤクの決め手)
    `<path d="M242,176h56q2,8 -1,12q-4,-5 -7,1q-3,-6 -7,1q-4,-6 -8,1q-4,-6 -8,1q-4,-6 -8,1q-4,-5 -9,-1q-3,-5 -8,-16z" fill="#332c24"/>` +
    // 頭(左を向く)と鼻づら
    `<path d="M244,170q-11,1 -13,9q-1,7 7,8q7,0 10,-5z" fill="#3f3428"/>` +
    `<path d="M231,182q-5,1 -5,4q0,3 5,3q4,0 5,-3z" fill="#5f5448"/>` +
    `<circle cx="237" cy="177" r="1.4" fill="#e0d8c4"/>` +
    // 角(上へ反らせる)
    `<path d="M236,172q-5,-6 -12,-6M243,170q-2,-7 2,-12" stroke="#e0d8c4" stroke-width="2.4" stroke-linecap="round" fill="none"/>` +
    // 房のある尾
    `<path d="M298,174q6,2 7,10" stroke="#2f2820" stroke-width="2.4" stroke-linecap="round" fill="none"/>` +
    `<path d="M303,182q5,2 3,8q-4,2 -6,-3z" fill="#2f2820"/>` +
    // 背に掛けた織物
    `<g fill="#b8412f"><path d="M254,167h28l-2,9h-24z"/></g>` +
    `<g fill="#f5b31c"><rect x="255" y="170" width="26" height="2"/></g>` +
    // ── マニ石の壁。**y>170 の中央は隠れないので、ここに主役級のものを置く**
    shade(202, 199, 60, 5, ".16") +
    `<path d="M144,198h116v-14q0,-4 -6,-4H150q-6,0 -6,4z" fill="#9a9484"/>` +
    `<path d="M144,184q0,-4 6,-4h104q6,0 6,4z" fill="#b0aa98"/>` +
    `<g fill="#7f7a6c">${[152, 170, 188, 206, 224, 242].map((x) => `<rect x="${x}" y="${186}" width="12" height="9" rx="2"/>`).join("")}</g>` +
    `<g fill="#e8d8a8" opacity=".8">${[152, 170, 188, 206, 224, 242].map((x) => `<path d="M${x + 3},${190}h6M${x + 3},${193}h4"/>`).join("")}</g>` +
    `<g stroke="#e8d8a8" stroke-width="1.2" opacity=".75" fill="none">${[152, 170, 188, 206, 224, 242].map((x) => `<path d="M${x + 3},190h6M${x + 3},193h4"/>`).join("")}</g>` +
    // 壁の端の小さなチョルテン。
    // 左右に置いたら右のものがヤクの胸に重なって窮屈だったので、左端だけにした
    stupa(136, 198, 0.7) +
    // ── 最前景: 岩と乾いた草
    `<path d="M0,210v-22q26,-10 48,2q20,10 26,20z" fill="#5f6656"/>` +
    `<path d="M400,210v-18q-24,-9 -44,2q-18,9 -22,16z" fill="#5f6656"/>` +
    `<g stroke="#94a06a" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M90,206v-10M97,207v-8M104,205v-11M300,207v-9M307,205v-11M314,208v-8"/></g>` +
    `<g fill="#e8e2d4" opacity=".7"><ellipse cx="76" cy="204" rx="30" ry="4.4"/><ellipse cx="326" cy="196" rx="24" ry="4"/></g>`,

  /**
   * 大都会。**4都市が共用。**(ムンバイ・ハイダラーバード・チェンナイ・コルカタ)
   *
   * 元は40要素。同じ幅のビルが8本、同じ高さで並び、赤い箱の列車が中央にあった。
   * **列車はシンボルの真後ろで、ほとんど見えていなかった。**
   *
   * 層: 夕空 / 遠いスカイライン(霞ませる)/ 近いビル(灯りを入れる)/ 高架 /
   * 通り / **黄色いタクシーとオートリキシャ**(y>170 の中央)/ 屋台と人 / 看板。
   */
  megacity:
    // 空はビルの足元(地面の開始 y=150)まで塗り下ろす。
    // 118 にしたら、ビルとビルのあいだの 118〜150 が32行ぶん透けた(実測4,582px)。
    // **見えている空の高さではなく、後ろに回り込む深さで決める。**
    sky("#e8a26a", "#f2c894", 150) +
    sun(60, 40, 18, "#f2803c") +
    `<circle cx="60" cy="40" r="24" fill="#fadcb0" opacity=".2"/>` +
    `<g fill="#f8dcb0" opacity=".4"><ellipse cx="230" cy="24" rx="34" ry="4.4"/><ellipse cx="204" cy="31" rx="21" ry="3.2"/></g>` +
    // ── 遠いスカイライン。**霞ませて奥に置く**(全部同じ濃さだと平board になる)
    `<g fill="#a08fa0" opacity=".55"><rect x="10" y="76" width="24" height="42"/><rect x="42" y="64" width="20" height="54"/><rect x="70" y="82" width="26" height="36"/><rect x="140" y="70" width="22" height="48"/><rect x="172" y="86" width="24" height="32"/><rect x="240" y="66" width="22" height="52"/><rect x="272" y="80" width="26" height="38"/><rect x="340" y="72" width="22" height="46"/><rect x="372" y="84" width="24" height="34"/></g>` +
    // ── 近いビル。高さも幅もばらし、灯りを入れる
    `<g fill="#3f4a5c"><rect x="4" y="52" width="32" height="98"/><rect x="44" y="86" width="26" height="64"/><rect x="78" y="38" width="36" height="112"/><rect x="122" y="72" width="28" height="78"/><rect x="262" y="48" width="34" height="102"/><rect x="304" y="80" width="26" height="70"/><rect x="338" y="60" width="32" height="90"/><rect x="378" y="92" width="22" height="58"/></g>` +
    `<g fill="#2f3848"><rect x="4" y="52" width="32" height="5"/><rect x="78" y="38" width="36" height="5"/><rect x="262" y="48" width="34" height="5"/><rect x="338" y="60" width="32" height="5"/></g>` +
    `<g fill="#f5d06a" opacity=".9">${[[10, 62], [22, 62], [10, 78], [22, 78], [10, 94], [22, 94], [10, 112], [22, 112], [50, 96], [60, 96], [50, 114], [60, 114], [84, 48], [96, 48], [84, 64], [96, 64], [84, 82], [96, 82], [84, 100], [96, 100], [84, 120], [96, 120], [128, 82], [138, 82], [128, 100], [138, 100], [128, 120], [138, 120], [268, 58], [280, 58], [268, 76], [280, 76], [268, 94], [280, 94], [268, 114], [280, 114], [310, 90], [320, 90], [310, 110], [320, 110], [344, 70], [356, 70], [344, 88], [356, 88], [344, 106], [356, 106], [344, 126], [356, 126], [384, 102], [384, 122]]
      .map(([x, y]) => `<rect x="${x}" y="${y}" width="7" height="9"/>`)
      .join("")}</g>` +
    // 屋上の給水タンクとアンテナ
    `<g fill="#5f6a7c"><rect x="86" y="30" width="10" height="8"/><rect x="270" y="40" width="9" height="8"/></g>` +
    `<g stroke="#5f6a7c" stroke-width="1.6" fill="none"><path d="M20,52v-10M348,60v-12"/></g>` +
    // 看板(大都会の記号)
    `<g fill="#e8443f"><rect x="46" y="60" width="20" height="24"/></g>` +
    `<g fill="#f5b31c"><rect x="49" y="64" width="14" height="4"/><rect x="49" y="71" width="14" height="4"/><rect x="49" y="78" width="10" height="4"/></g>` +
    `<g fill="#3f9fb8"><rect x="306" y="56" width="18" height="22"/></g>` +
    `<g fill="#f6efe2"><rect x="309" y="60" width="12" height="4"/><rect x="309" y="67" width="12" height="4"/></g>` +
    // ── 高架と列車。**中央は隠れるので、車両を左に寄せる**
    ground(150, "#6f6a5e") +
    `<rect x="0" y="150" width="400" height="7" fill="#8a8578"/>` +
    `<g fill="#3a4453"><rect x="26" y="157" width="11" height="18"/><rect x="126" y="157" width="11" height="18"/><rect x="266" y="157" width="11" height="18"/><rect x="356" y="157" width="11" height="18"/></g>` +
    `<g fill="#e8443f"><rect x="0" y="128" width="132" height="22" rx="5"/></g>` +
    `<g fill="#f6efe2"><rect x="0" y="126" width="132" height="4"/></g>` +
    `<g fill="#cfe4f0"><rect x="8" y="134" width="18" height="10"/><rect x="34" y="134" width="18" height="10"/><rect x="60" y="134" width="18" height="10"/><rect x="86" y="134" width="18" height="10"/><rect x="112" y="134" width="16" height="10"/></g>` +
    // ── 通り
    `<rect x="0" y="175" width="400" height="35" fill="#5f5b52"/>` +
    `<g stroke="#e8dcc0" stroke-width="2.6" stroke-dasharray="16 14" opacity=".6" fill="none"><path d="M0,193h400"/></g>` +
    // ── 車。**y>170 の中央は隠れない**
    shade(196, 200, 26, 4, ".22") +
    `<g fill="#f5b31c"><path d="M172,200v-9q0,-4 5,-5l8,-7q2,-2 6,-2h14q4,0 5,3l3,6l8,2q4,1 4,5v7z"/></g>` +
    `<g fill="#2f3848" opacity=".8"><path d="M182,186h11v7h-17zM197,186h9l3,7h-12z"/></g>` +
    `<g fill="#3f3428"><circle cx="182" cy="200" r="4"/><circle cx="212" cy="200" r="4"/></g>` +
    `<rect x="188" y="176" width="14" height="4" fill="#e8443f"/>` +
    shade(252, 204, 22, 4, ".22") +
    rickshaw(252, 204, 1) +
    shade(96, 196, 20, 3.6, ".2") +
    rickshaw(96, 196, 0.85) +
    // ── 屋台と人
    `<g fill="#8a6a44"><rect x="304" y="178" width="60" height="4"/><rect x="308" y="182" width="4" height="14"/><rect x="356" y="182" width="4" height="14"/></g>` +
    `<path d="M298,178h72l-8,-12h-56z" fill="#e8447a"/>` +
    `<g fill="#f5b31c"><circle cx="320" cy="174" r="3.4"/><circle cx="334" cy="174" r="3.4"/><circle cx="348" cy="174" r="3.4"/></g>` +
    shade(292, 200, 11, 3, ".2") +
    person(290, 200, 21, "#f0e6d2") +
    arm(290, 187, 12, 3) +
    shade(374, 202, 11, 3, ".2") +
    person(372, 202, 20, "#5b8fe8") +
    shade(38, 202, 11, 3, ".2") +
    person(36, 202, 22, "#e8443f") +
    arm(36, 188, -10, 6) +
    `<path d="M22,196q6,-6 12,0" stroke="#8a6a44" stroke-width="1.6" fill="none"/>`,

  /**
   * 湿地と川中島。**2都市が共用。**(グワハーティ・カジランガ)
   *
   * 元は32要素。水面と苗の点と、一角犀の影がひとつ。
   *
   * 層: 靄の空 / 遠い丘 / 川 / 象草(カジランガの高い草)/ **一角犀の親子** /
   * 水牛 / 高床の家 / 舟 / 水鳥。
   *
   * 犀はカジランガの顔なので、影ではなく**きちんと描く**。
   */
  wetland:
    sky("#a8c8d8", "#d8e6e0", 132) +
    `<circle cx="316" cy="30" r="15" fill="#fdf6dc"/>` +
    clouds(90, 30, 1.3) +
    `<g fill="#eef4f2" opacity=".7"><ellipse cx="220" cy="106" rx="120" ry="8"/><ellipse cx="60" cy="112" rx="80" ry="7"/></g>` +
    hills(118, "#5f8a52", 3) +
    `<path d="M0,122q60,-10 124,-2q66,9 134,-4q58,-11 142,4v22H0z" fill="#4d7a44"/>` +
    // ── 川
    band(138, 34, "#5f8f7a") +
    band(168, 42, "#6fa08a") +
    `<g stroke="#bfe8d4" stroke-width="2" opacity=".55" fill="none"><path d="M18,146h56M110,143h40M258,148h64M340,144h50M40,158h48M180,161h58M300,164h74M20,182h60M140,186h50M290,190h84"/></g>` +
    // ── 象草(カジランガの高い草。ここに犀が隠れる)
    `<g stroke="#7fa84c" stroke-width="2" stroke-linecap="round" fill="none">${[8, 16, 24, 32, 40, 48, 342, 352, 362, 372, 382, 392]
      .map((x, i) => `<path d="M${x},172v${-16 - (i % 3) * 5}"/>`)
      .join("")}</g>` +
    `<g stroke="#5f8a3c" stroke-width="2" stroke-linecap="round" fill="none">${[12, 22, 34, 44, 348, 358, 368, 378, 388]
      .map((x, i) => `<path d="M${x},176v${-13 - (i % 3) * 4}"/>`)
      .join("")}</g>` +
    // ── 一角犀の親子。**輪郭ひと筆にせず、角・胴の甲・短い脚を分けて置く。**
    // 最初は中央(x=172〜260)に置いたが、**そこはシンボルと影に食われて灰色の塊**にしか
    // 見えなかった。カジランガの顔なので、右へ寄せて丸ごと見せる。
    shade(296, 176, 34, 5, ".18") +
    `<g stroke="#4f5f6a" stroke-width="4" stroke-linecap="round" fill="none"><path d="M280,176v-9M292,176v-8M312,176v-8M322,176v-9"/></g>` +
    `<path d="M270,168q0,-16 16,-16h34q16,0 16,16v3h-66z" fill="#7f8f9a"/>` +
    `<path d="M282,152q10,-4 20,0q2,10 -2,16h-18q-3,-8 0,-16z" fill="#6b7f8a"/>` +
    `<path d="M270,160q-12,-1 -14,6q-1,7 8,8q8,0 10,-5z" fill="#7f8f9a"/>` +
    `<path d="M258,158l3,-11l5,10z" fill="#4f5f6a"/>` +
    `<circle cx="264" cy="164" r="1.4" fill="#3f4a52"/>` +
    `<path d="M336,158q7,2 8,10" stroke="#6b7f8a" stroke-width="3" stroke-linecap="round" fill="none"/>` +
    // 仔犀
    shade(368, 184, 20, 3.6, ".16") +
    `<g stroke="#4f5f6a" stroke-width="3" stroke-linecap="round" fill="none"><path d="M358,184v-6M366,184v-5M378,184v-5M384,184v-6"/></g>` +
    `<path d="M352,178q0,-10 10,-10h20q10,0 10,10v2h-40z" fill="#8a99a4"/>` +
    `<path d="M352,172q-8,0 -9,4q-1,4 5,5q5,0 6,-3z" fill="#8a99a4"/>` +
    `<path d="M344,171l2,-7l3,6z" fill="#4f5f6a"/>` +
    // ── 高床の家(左)
    `<g stroke="#8a6a44" stroke-width="3" fill="none"><path d="M28,176v-14M50,176v-14M72,176v-14"/></g>` +
    `<rect x="20" y="146" width="60" height="18" fill="#d8c9a4"/>` +
    `<path d="M12,146h76l-38,-16z" fill="#a8813c"/>` +
    `<rect x="42" y="152" width="14" height="12" fill="#6b5330"/>` +
    `<path d="M16,164h68v3H16z" fill="#8a6a44"/>` +
    // ── 舟。**y>170 の中央は隠れない**ので、ここへ移した
    boat(178, 198, 54, "#5f4227", "#c99a5c") +
    person(164, 196, 17, "#e8443f") +
    arm(164, 186, 13, -7) +
    `<path d="M178,180l-2,14" stroke="#8a6a44" stroke-width="1.8" stroke-linecap="round" fill="none"/>` +
    // ── 水鳥(白鷺)
    `<g fill="#f6efe2"><ellipse cx="106" cy="196" rx="9" ry="4"/><path d="M112,193q4,-8 6,-12l3,1q-2,6 -5,13z"/></g>` +
    `<path d="M121,180l5,-1" stroke="#f5b31c" stroke-width="1.6" stroke-linecap="round" fill="none"/>` +
    `<g stroke="#c9a877" stroke-width="1.4" fill="none"><path d="M104,200v6M109,200v6"/></g>` +
    `<g stroke="#5f5240" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M60,60q4,-4 8,0q4,-4 8,0M104,48q3.4,-3.4 7,0q3.4,-3.4 7,0"/></g>`,

  /**
   * 市場の街。**5都市が共用。**
   * (ラクナウ・アフマダーバード・スーラト・インドール・ナーグプル)
   *
   * 元は40要素。天幕が3つ等間隔に並び、反物が積んであるだけで、
   * **市場なのに売り手も買い手もいなかった。**
   *
   * 層: 空 / 三角旗 / 奥の町並み / **左右に寄せた露店** / 反物と真鍮 /
   * 売り手と買い手 / **香辛料の山**(y>170 の中央)/ 手前の籠。
   *
   * インドールとナーグプルは食べ物と橙の町なので、香辛料を主役に据えた。
   */
  bazaar:
    sky("#e0c48a", "#f0dcb0", 128) +
    sun(56, 34, 16, "#f0a83c") +
    `<circle cx="56" cy="34" r="21" fill="#fdeec4" opacity=".18"/>` +
    // 奥の町並み。#c2ab84 だと空(#f0dcb0)との差が小さく、ほとんど見えなかった。
    // 遠景でも、空とは明度を2段は離す
    `<g fill="#a8906a"><rect x="10" y="76" width="46" height="52"/><rect x="66" y="66" width="38" height="62"/><rect x="112" y="82" width="42" height="46"/><rect x="248" y="70" width="44" height="58"/><rect x="300" y="80" width="38" height="48"/><rect x="346" y="64" width="44" height="64"/></g>` +
    `<g fill="#8f7955"><rect x="10" y="76" width="46" height="4"/><rect x="66" y="66" width="38" height="4"/><rect x="248" y="70" width="44" height="4"/><rect x="346" y="64" width="44" height="4"/></g>` +
    `<g fill="#8a7550"><rect x="20" y="86" width="10" height="14" rx="5"/><rect x="38" y="86" width="10" height="14" rx="5"/><rect x="76" y="78" width="9" height="13" rx="4.5"/><rect x="258" y="82" width="10" height="14" rx="5"/><rect x="276" y="82" width="10" height="14" rx="5"/><rect x="356" y="76" width="10" height="14" rx="5"/><rect x="374" y="76" width="10" height="14" rx="5"/></g>` +
    // ドームとミナレット(ラクナウ・アフマダーバード)
    `<circle cx="87" cy="60" r="13" fill="#e8dcc0"/><rect x="78" y="60" width="18" height="8" fill="#e8dcc0"/>` +
    `<rect x="84" y="42" width="6" height="8" fill="#f5b31c"/><circle cx="87" cy="49" r="3.2" fill="#f5b31c"/>` +
    `<g fill="#e8dcc0"><rect x="238" y="52" width="9" height="76"/><rect x="293" y="52" width="9" height="76"/></g>` +
    `<g fill="#d8c9a4"><path d="M238,52h9l-4.5,-9zM293,52h9l-4.5,-9z"/></g>` +
    bunting(66) +
    // ── 地面
    ground(128, "#c9a877") +
    `<path d="M0,150q100,-8 200,2t200,-4v62H0z" fill="#bd9a68"/>` +
    // ── 露店。**中央はシンボルに隠れるので左右に寄せる**
    `<g><rect x="6" y="106" width="96" height="34" fill="#c2603c"/><path d="M0,106h108l-11,-17H10z" fill="#e8443f"/></g>` +
    `<g stroke="#a84a34" stroke-width="1.4" fill="none"><path d="M22,89v17M50,89v17M78,89v17"/></g>` +
    `<g fill="#8a3f2c"><rect x="6" y="140" width="96" height="4"/></g>` +
    `<g><rect x="290" y="110" width="98" height="30" fill="#3f7f6a"/><path d="M284,110h110l-11,-17h-88z" fill="#4f9f8a"/></g>` +
    `<g stroke="#2f6b58" stroke-width="1.4" fill="none"><path d="M306,93v17M334,93v17M362,93v17"/></g>` +
    `<g fill="#2f6b58"><rect x="290" y="140" width="98" height="4"/></g>` +
    // 支柱
    `<g fill="#8a6a44"><rect x="4" y="106" width="4" height="42"/><rect x="100" y="106" width="4" height="42"/><rect x="288" y="110" width="4" height="38"/><rect x="384" y="110" width="4" height="38"/></g>` +
    // ── 商品: 反物の山と真鍮の器
    `<g fill="#f5b31c"><rect x="14" y="146" width="58" height="8"/><rect x="18" y="155" width="50" height="8"/><rect x="24" y="164" width="38" height="8"/></g>` +
    `<g fill="#e8447a"><rect x="16" y="139" width="54" height="6"/></g>` +
    `<g stroke="#c98a2c" stroke-width="1" opacity=".6" fill="none"><path d="M14,150h58M18,159h50"/></g>` +
    `<g fill="#c9a02c"><ellipse cx="306" cy="152" rx="12" ry="4"/><ellipse cx="306" cy="147" rx="9" ry="3.4"/><ellipse cx="332" cy="154" rx="11" ry="3.6"/></g>` +
    `<g fill="#8a5aa8"><rect x="352" y="146" width="34" height="7"/><rect x="356" y="154" width="26" height="7"/></g>` +
    // ── 売り手と買い手
    shade(118, 168, 12, 3.2, ".18") +
    person(116, 168, 22, "#f0e6d2") +
    arm(116, 154, -12, 4) +
    shade(140, 172, 11, 3, ".18") +
    person(138, 172, 20, "#5b8fe8") +
    arm(138, 160, 10, 5) +
    shade(276, 172, 11, 3, ".18") +
    person(274, 172, 21, "#e8443f") +
    arm(274, 159, 12, 4) +
    `<ellipse cx="274" cy="150" rx="10" ry="3.6" fill="#a8813c"/>` +
    shade(60, 176, 11, 3, ".18") +
    person(58, 176, 19, "#3f7f6a") +
    // ── 香辛料の山。**y>170 の中央は隠れないので、ここを主役にする**
    `<rect x="140" y="188" width="128" height="5" fill="#8a6a44"/>` +
    spiceCone(158, 188, 15, "#d8621c") +
    spiceCone(188, 188, 13, "#c9a02c") +
    spiceCone(216, 188, 14, "#8a3f2c") +
    spiceCone(246, 188, 12, "#5f7a2c") +
    `<g fill="#a8813c"><path d="M143,188h30l-3,14h-24z" opacity=".55"/></g>` +
    // 手前の籠と量り
    `<g fill="#a8813c"><path d="M40,206q14,-8 28,0l-3,10H43z"/><path d="M330,208q13,-7 26,0l-3,9h-20z"/></g>` +
    `<g stroke="#7a5a34" stroke-width="1.2" fill="none"><path d="M42,200h24M332,203h22"/></g>` +
    `<g fill="#e8443f"><circle cx="54" cy="200" r="3.4"/><circle cx="62" cy="202" r="2.8"/></g>` +
    `<g fill="#f5b31c"><circle cx="341" cy="202" r="3"/><circle cx="348" cy="204" r="2.6"/></g>`,

  /** 石窟・遺跡。 */
  cavetemple:
    sky("#b8c8b0", "#dce4d0") +
    // 岩壁
    `<path d="M0,0h400v150H0z" fill="#8a7f66"/>` +
    `<g fill="#7a7058" opacity=".8"><path d="M0,20h400v6H0zM0,58h400v6H0zM0,96h400v6H0z"/></g>` +
    // 掘り抜かれた入口
    `<path d="M140,150V86a60,60 0 0 1 120,0v64z" fill="#3f3a2e"/>` +
    `<path d="M156,150V90a44,44 0 0 1 88,0v60z" fill="#2a251c"/>` +
    // 柱
    `<g fill="#a89873"><rect x="168" y="104" width="12" height="46"/><rect x="220" y="104" width="12" height="46"/></g>` +
    ground(150, "#9a8f70") +
    `<g fill="#6b6350" opacity=".7"><ellipse cx="90" cy="178" rx="46" ry="10"/><ellipse cx="310" cy="188" rx="56" ry="12"/></g>`,

  /**
   * 宮殿と湖(ラージャスターン・カシミール)。**6都市が共用。**
   * (シュリーナガル・アムリトサル・アーグラ・ウダイプル・ボーパール・マイソール)
   *
   * 元は26要素で、湖の真ん中に白い箱がひとつ。**その箱はシンボルの真後ろで、
   * ほとんど見えていなかった。**
   *
   * 層: 夕空 / 遠い丘 / 対岸の町影 / 湖(2階調)/ **左右に振り分けた宮殿** /
   * 水面の映り込み / 蓮 / 家船と小舟 / 水鳥。
   *
   * 宮殿を中央に置いても隠れるので、**楼閣を左右に、あいだは低い列柱**にした。
   * 列柱は繰り返しなので、中央が隠れても失うものが少ない。
   */
  lakepalace:
    sky("#f0a068", "#f8c898", 116) +
    sun(324, 52, 20, "#f2803c") +
    `<circle cx="324" cy="52" r="26" fill="#fae0c0" opacity=".16"/>` +
    `<g fill="#fae0c0" opacity=".45"><ellipse cx="88" cy="24" rx="32" ry="4.4"/><ellipse cx="62" cy="31" rx="20" ry="3.2"/><ellipse cx="220" cy="18" rx="24" ry="3.8"/></g>` +
    hills(104, "#8a7360", 3) +
    `<g fill="#6f5c4c" opacity=".7"><path d="M0,104v-12q16,-8 30,-2q14,6 22,14zM400,104v-14q-20,-9 -36,-1q-14,7 -20,15z"/></g>` +
    // 対岸の町影(遠く、霞ませる)
    `<g fill="#9a8574" opacity=".55"><rect x="120" y="92" width="18" height="12"/><rect x="146" y="86" width="14" height="18"/><rect x="240" y="90" width="16" height="14"/><rect x="264" y="84" width="12" height="20"/></g>` +
    // ── 湖(沖は濃く、手前を明るく)
    band(104, 26, "#2f6f92") +
    band(128, 30, "#3f87a8") +
    band(156, 54, "#4f9cbc") +
    `<g stroke="#bfe0f0" stroke-width="2" opacity=".45" fill="none"><path d="M18,112h50M96,110h34M270,113h58M348,110h46M40,124h44M300,126h64M14,142h56M330,146h58M60,164h48M292,168h72M20,186h60M310,192h74"/></g>` +
    // ── 宮殿。**楼閣を左右に、あいだは低い列柱**
    `<g fill="#e6ddc8"><rect x="106" y="98" width="188" height="18"/></g>` +
    `<g fill="#cfc4ac">${[112, 132, 152, 172, 192, 212, 232, 252, 272].map((x) => `<path d="M${x},116V104a7,7 0 0 1 14,0v12z"/>`).join("")}</g>` +
    `<g fill="#f2ede0"><rect x="26" y="66" width="80" height="50"/><rect x="294" y="72" width="78" height="44"/></g>` +
    `<g fill="#e0d6bc"><rect x="20" y="60" width="92" height="8"/><rect x="288" y="66" width="90" height="8"/></g>` +
    `<g fill="#f2ede0"><path d="M34,60a12,12 0 0 1 24,0zM74,60a12,12 0 0 1 24,0zM302,66a11,11 0 0 1 22,0zM340,66a11,11 0 0 1 22,0z"/></g>` +
    // ドームは**屋根の帯に載せる。**
    // 中心を高く取ったら下端と屋根のあいだが4px空き、白い玉が宙に浮いて見えた
    // (シカラの頂飾りと同じ間違い)。太鼓部を挟んで必ず重ねる。
    `<rect x="56" y="48" width="20" height="14" fill="#e8e0cc"/>` +
    `<circle cx="66" cy="48" r="13" fill="#f2ede0"/>` +
    `<rect x="63" y="28" width="6" height="9" fill="#f5b31c"/><circle cx="66" cy="36" r="3.8" fill="#f5b31c"/>` +
    `<rect x="324" y="56" width="18" height="12" fill="#e8e0cc"/>` +
    `<circle cx="333" cy="56" r="11" fill="#f2ede0"/>` +
    `<rect x="330" y="38" width="6" height="8" fill="#f5b31c"/><circle cx="333" cy="45.5" r="3.2" fill="#f5b31c"/>` +
    // 窓とアーチ
    `<g fill="#8a7f66"><rect x="38" y="80" width="10" height="18" rx="5"/><rect x="58" y="80" width="10" height="18" rx="5"/><rect x="78" y="80" width="10" height="18" rx="5"/><rect x="306" y="86" width="9" height="16" rx="4.5"/><rect x="324" y="86" width="9" height="16" rx="4.5"/><rect x="342" y="86" width="9" height="16" rx="4.5"/></g>` +
    `<g fill="#d8733c" opacity=".7"><rect x="30" y="104" width="72" height="4"/><rect x="298" y="108" width="70" height="4"/></g>` +
    // ── 水面の映り込み。建物の真下に、にじませて伸ばす
    `<g fill="#f2ede0" opacity=".26"><path d="M26,116h80v26q-40,7 -80,0z"/><path d="M294,116h78v22q-38,6 -78,0z"/><path d="M106,116h188v14q-94,6 -188,0z"/></g>` +
    // ── 蓮の葉(岸寄りに散らす)
    lotus(34, 158, 1.1) + lotus(58, 166, 0.9) + lotus(18, 172, 1) +
    lotus(366, 162, 1.1) + lotus(342, 170, 0.95) + lotus(384, 176, 0.9) +
    `<g fill="#e8a0c0"><circle cx="46" cy="160" r="3.4"/><circle cx="356" cy="164" r="3"/></g>` +
    // 水鳥
    `<g fill="#f0e6d2"><ellipse cx="130" cy="150" rx="7" ry="3.4"/><circle cx="136" cy="145" r="3"/></g>` +
    `<path d="M138,144l4,-1.4" stroke="#f5b31c" stroke-width="1.6" stroke-linecap="round" fill="none"/>` +
    // ── 舟。**さざ波の後に描いて、波を遮らせる**(水面より手前だと分かる)
    houseBoat(74, 196, 62) +
    boat(316, 184, 46) +
    person(310, 182, 15, "#e8443f") +
    arm(310, 173, 11, -6) +
    // 中央は y>170 なら隠れないので、小舟を1隻置く
    boat(200, 200, 52, "#5f4227", "#d8b06a") +
    person(188, 198, 16, "#f5b31c") +
    arm(188, 188, 13, -7) +
    `<path d="M201,197v-14" stroke="#4a3a24" stroke-width="1.8" fill="none"/>` +
    `<path d="M203,185l10,12h-10z" fill="#f0e6d2"/>`,

  /**
   * 計画都市の庭園。**3都市が共用。**(チャンディーガル・プネー・ベンガルール)
   *
   * 元は37要素。ガラスのビル2棟と木2本と池だけ。
   *
   * 層: 空 / 遠い丘 / ガラスのオフィス街(左右)/ 並木道 / 池と噴水 /
   * ベンチと歩く人 / 手前の花壇。
   */
  citypark:
    sky("#9ccbe8", "#d8e8e0", 136) +
    sun(66, 34, 15) +
    clouds(300, 28) +
    `<g fill="#f6efe2" opacity=".5"><ellipse cx="180" cy="22" rx="30" ry="4.4"/></g>` +
    hills(126, "#5f8a52", 4) +
    // ── ガラスのオフィス街。**高さも幅もばらす**
    `<g fill="#5f8fa8"><rect x="16" y="62" width="44" height="74" rx="4"/><rect x="66" y="88" width="30" height="48" rx="3"/><rect x="298" y="70" width="48" height="66" rx="4"/><rect x="352" y="94" width="34" height="42" rx="3"/></g>` +
    `<g fill="#4a7288"><rect x="16" y="62" width="44" height="5" rx="2"/><rect x="298" y="70" width="48" height="5" rx="2"/></g>` +
    `<g fill="#bfe0f0" opacity=".75">${[[22, 72], [38, 72], [22, 88], [38, 88], [22, 104], [38, 104], [22, 120], [38, 120], [72, 96], [72, 112], [72, 126], [304, 80], [322, 80], [304, 96], [322, 96], [304, 112], [322, 112], [358, 102], [372, 102], [358, 118], [372, 118]]
      .map(([x, y]) => `<rect x="${x}" y="${y}" width="14" height="10"/>`)
      .join("")}</g>` +
    `<g fill="#f2fbff" opacity=".35"><path d="M16,62l24,74h-10L16,86z"/><path d="M298,70l22,66h-9L298,90z"/></g>` +
    // ── 芝と並木道
    ground(136, "#68a05a") +
    `<path d="M0,150q100,-8 200,2t200,-6v64H0z" fill="#589049"/>` +
    `<path d="M120,210q28,-58 76,-58q50,0 82,58z" fill="#c9b98c"/>` +
    `<path d="M134,210q26,-50 64,-50q42,0 70,50z" fill="#d8c9a4"/>` +
    // 並木。左右に振り分け、大きさを変える
    `<g>${[[42, 152, 21, "#2f7d3f"], [92, 148, 16, "#3f8f4f"], [316, 150, 19, "#2f7d3f"], [362, 154, 15, "#3f8f4f"]]
      .map(([x, b, r, c]) => `<rect x="${x - 3}" y="${b - r - 6}" width="6" height="${r + 6}" fill="#6b5330"/><circle cx="${x}" cy="${b - r - 10}" r="${r}" fill="${c}"/>`)
      .join("")}</g>` +
    // ── 池と噴水(左右へずらす。中央は隠れる)
    `<ellipse cx="82" cy="180" rx="66" ry="17" fill="#4f8f9f"/>` +
    `<ellipse cx="82" cy="177" rx="58" ry="13" fill="#5fa8b8"/>` +
    `<g stroke="#bfe8f4" stroke-width="2" opacity=".6" fill="none"><path d="M42,178h34M96,184h40"/></g>` +
    `<path d="M80,172v-16" stroke="#e8f4fa" stroke-width="3" stroke-linecap="round" fill="none"/>` +
    `<g fill="#e8f4fa" opacity=".8"><ellipse cx="80" cy="155" rx="9" ry="4"/><circle cx="70" cy="163" r="2.4"/><circle cx="91" cy="165" r="2"/></g>` +
    `<g fill="#3f7a4a"><ellipse cx="52" cy="186" rx="8" ry="3.4"/><ellipse cx="112" cy="188" rx="7" ry="3"/></g>` +
    // ── ベンチと人
    `<g fill="#8a6a44"><rect x="290" y="176" width="42" height="4"/><rect x="290" y="168" width="42" height="4"/><rect x="292" y="180" width="4" height="9"/><rect x="326" y="180" width="4" height="9"/></g>` +
    shade(300, 189, 12, 3, ".18") +
    person(300, 178, 19, "#5b8fe8") +
    shade(346, 192, 11, 3, ".18") +
    person(344, 192, 21, "#e8443f") +
    arm(344, 179, 11, 5) +
    shade(196, 200, 12, 3.2, ".18") +
    person(194, 200, 22, "#f0e6d2") +
    arm(194, 186, -12, 4) +
    shade(220, 204, 11, 3, ".18") +
    person(218, 204, 18, "#f5b31c") +
    // ── 手前の花壇
    `<g fill="#3f7a3c"><ellipse cx="26" cy="204" rx="24" ry="8"/><ellipse cx="376" cy="202" rx="22" ry="8"/></g>` +
    `<g fill="#e8443f"><circle cx="16" cy="200" r="3"/><circle cx="30" cy="202" r="2.6"/><circle cx="368" cy="198" r="2.8"/></g>` +
    `<g fill="#f5b31c"><circle cx="24" cy="197" r="2.6"/><circle cx="380" cy="200" r="2.6"/></g>`,
};

/**
 * 描き直した背景で上書きする。**同じキーは `bg-rich.mjs` のほうが勝つ。**
 * 1ファイルが長くなりすぎないよう、描き直したものは別ファイルに置いている。
 */
export const INDIA_BG = { ...BASE_BG, ...INDIA_BG_RICH };

// ---------------------------------------------------------------------------
// シンボル(24×24)
// ---------------------------------------------------------------------------

export const INDIA_MARKS = {
  /** インド門・凱旋門型。 */
  gateway:
    '<path d="M3,23V9a9,9 0 0 1 18,0v14z" fill="#c98a4a"/>' +
    '<path d="M8,23V11a4,4 0 0 1 8,0v12z" fill="#5a4630"/>' +
    '<rect x="2" y="6" width="20" height="3" fill="#b0733c"/>' +
    '<rect x="1" y="3" width="22" height="3" fill="#d8a05c"/>',

  /** 白亜の霊廟(ドーム+ミナレット)。 */
  domewhite:
    '<circle cx="12" cy="11" r="6" fill="#f2ede0"/>' +
    '<rect x="6" y="12" width="12" height="11" fill="#f2ede0"/>' +
    '<rect x="11.2" y="2" width="1.6" height="4" fill="#f5b31c"/>' +
    '<g fill="#e0dbcd"><rect x="2" y="7" width="3" height="16"/><rect x="19" y="7" width="3" height="16"/></g>' +
    '<g fill="#cfc7b4"><circle cx="3.5" cy="6" r="1.8"/><circle cx="20.5" cy="6" r="1.8"/></g>',

  /** 南インドの塔門(ゴープラム)。 */
  gopuramark:
    '<path d="M4,23v-5h16v5z" fill="#e0dbcd"/>' +
    '<path d="M5.5,18v-4h13v4z" fill="#e8443f"/>' +
    '<path d="M7,14v-4h10v4z" fill="#e0dbcd"/>' +
    '<path d="M8.5,10v-3.5h7v3.5z" fill="#e8443f"/>' +
    '<path d="M9,6.5h6l-3,-4z" fill="#f5b31c"/>',

  /** ヒンドゥー寺院のシカラ(北方型の反り塔)。 */
  shikhara:
    '<path d="M12,1c4,6 6,12 6,18H6c0,-6 2,-12 6,-18z" fill="#c2603c"/>' +
    '<path d="M6,19h12v4H6z" fill="#a84f30"/>' +
    '<rect x="10.6" y="16" width="2.8" height="3" fill="#5a3220"/>' +
    '<circle cx="12" cy="1.6" r="1.4" fill="#f5b31c"/>',

  /** モスクのドームと三日月。 */
  masjid:
    '<path d="M5,23V13a7,7 0 0 1 14,0v10z" fill="#3f8f7a"/>' +
    '<path d="M9,23v-6a3,3 0 0 1 6,0v6z" fill="#f2ede0"/>' +
    '<g fill="#2f7a66"><rect x="1.5" y="9" width="2.5" height="14"/><rect x="20" y="9" width="2.5" height="14"/></g>' +
    '<path d="M12,5.4a3,3 0 1 0 2.2,5a2.4,2.4 0 1 1 -2.2,-5z" fill="#f5b31c"/>',

  /** シク教のグルドワーラ(黄金の丸屋根)。 */
  goldendome:
    '<path d="M4,23v-9h16v9z" fill="#f5b31c"/>' +
    '<circle cx="12" cy="10" r="6" fill="#f5d06a"/>' +
    '<path d="M6,14h12v1.6H6z" fill="#e0a015"/>' +
    '<rect x="11.3" y="1.5" width="1.4" height="3.5" fill="#e0a015"/>' +
    '<g fill="#e0a015"><rect x="4" y="12" width="2" height="11"/><rect x="18" y="12" width="2" height="11"/></g>',

  /** 仏塔(ストゥーパ)。 */
  stupa:
    '<path d="M3,23c0-6 4-10 9-10s9,4 9,10z" fill="#e0dbcd"/>' +
    '<rect x="9" y="8" width="6" height="5" fill="#cfc7b4"/>' +
    '<g fill="#a89873"><rect x="8" y="7" width="8" height="1.4"/><rect x="9" y="4.6" width="6" height="1.4"/><rect x="10" y="2.4" width="4" height="1.4"/></g>' +
    '<rect x="1" y="21" width="22" height="2" fill="#a89873"/>',

  /** 蒸気機関車(インド国鉄)。 */
  loco:
    '<rect x="2" y="10" width="14" height="8" rx="2" fill="#2f5f8f"/>' +
    '<rect x="16" y="6" width="6" height="12" rx="1.5" fill="#3f7fb0"/>' +
    '<rect x="4" y="4" width="4" height="6" fill="#2f5f8f"/>' +
    '<g fill="#e8443f"><circle cx="6" cy="20" r="2.6"/><circle cx="13" cy="20" r="2.6"/><circle cx="19.5" cy="20" r="2.2"/></g>' +
    '<rect x="17" y="9" width="4" height="4" fill="#cfe4f0"/>',

  /** 紅茶(茶葉と一芯二葉)。 */
  tealeaf:
    '<path d="M12,22C7,18 4,13 5,7c6,-1 11,3 12,9c1,-4 4,-6 7,-6c0,6 -5,11 -12,12z" fill="#3f8f4f"/>' +
    '<path d="M12,22C9,17 7,12 6.4,8.2" stroke="#2a6a36" stroke-width="1" fill="none"/>' +
    '<circle cx="18" cy="5" r="1.6" fill="#8fc46a"/>',

  /** 香辛料の山。 */
  spice:
    '<path d="M2,22c0,-4 3,-7 6,-7s6,3 6,7z" fill="#e8443f"/>' +
    '<path d="M11,22c0,-3.4 2.6,-6 5.5,-6s5.5,2.6 5.5,6z" fill="#f5b31c"/>' +
    '<path d="M6,22c0,-2.6 2,-4.6 4.4,-4.6s4.4,2 4.4,4.6z" fill="#8a5a2c"/>' +
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#a8813c"/>',

  /** 象(祭礼の飾り象)。 */
  elephant:
    '<path d="M4,20v-5c0,-4 3.4,-7 8,-7s8,3 8,7v5h-3v-3h-10v3z" fill="#8a8f98"/>' +
    '<path d="M4,12c-2.4,0 -3.4,2.6 -2.2,4.6C2.8,18.4 4,17.6 4,16z" fill="#7a7f88"/>' +
    '<path d="M18,14c0,3 -1,6 -1,8h2.4c0.6,-2 1.6,-5 1.6,-8z" fill="#7a7f88"/>' +
    '<path d="M6,9c2,-3 10,-3 12,0z" fill="#e8443f"/>' +
    '<circle cx="9" cy="13" r="1" fill="#3a3f48"/>',

  /** 蓮の花。 */
  lotus:
    '<path d="M12,4c3,3 4,7 3,11h-6c-1,-4 0,-8 3,-11z" fill="#f2ede0"/>' +
    '<path d="M12,15C8,14 5,11 4,7c4,0 7,2 8,6z" fill="#e8a8c8"/>' +
    '<path d="M12,15c4,-1 7,-4 8,-8c-4,0 -7,2 -8,6z" fill="#e8a8c8"/>' +
    '<path d="M12,16c-5,0 -9,-2 -11,-5c3,-1 8,0 11,3z" fill="#e88ab0"/>' +
    '<path d="M12,16c5,0 9,-2 11,-5c-3,-1 -8,0 -11,3z" fill="#e88ab0"/>' +
    '<path d="M2,18h20v3H2z" fill="#3f8f7a"/>',

  /** 帆かけ舟(海岸都市)。 */
  dhow:
    '<path d="M2,18c6,-3 14,-3 20,0c-3,4 -17,4 -20,0z" fill="#7a5a34"/>' +
    '<path d="M12,17V3l9,14z" fill="#f6efe2"/>' +
    '<rect x="11.2" y="2" width="1.6" height="16" fill="#5a4630"/>' +
    '<path d="M1,21h22v2H1z" fill="#3f7fa8"/>',

  /** 天文台の日時計(ジャンタル・マンタル)。 */
  sundial:
    '<path d="M3,21L17,4v17z" fill="#c98a4a"/>' +
    '<path d="M17,21V9l4,5v7z" fill="#b0733c"/>' +
    '<rect x="1" y="21" width="22" height="2.4" fill="#8a5a2c"/>' +
    '<circle cx="20" cy="4" r="2" fill="#f5b31c"/>',

  /** ロケット(宇宙開発)。 */
  rocket:
    '<path d="M12,1c3,3 4.6,7 4.6,12v4H7.4v-4C7.4,8 9,4 12,1z" fill="#f2ede0"/>' +
    '<path d="M7.4,13L4,19h3.4zM16.6,13L20,19h-3.4z" fill="#e8443f"/>' +
    '<circle cx="12" cy="9" r="2.2" fill="#5b8fe8"/>' +
    '<path d="M9.6,17h4.8l-2.4,6z" fill="#f5b31c"/>',

  /** 一角犀(カジランガ)。 */
  rhino:
    '<path d="M3,20v-4c0,-4 4,-7 9,-7s9,3 9,7v4h-3v-2H6v2z" fill="#7a8790"/>' +
    '<path d="M21,13c1.6,-1 2.4,-3 1,-4c-1,-0.8 -2.4,0 -3,1.6z" fill="#6a7780"/>' +
    '<path d="M20,9.6l1.6,-3.6l1.4,3.6z" fill="#e0dbcd"/>' +
    '<circle cx="18" cy="13" r="0.9" fill="#3a3f48"/>',

  /** 綿と織機(繊維の町)。 */
  cotton:
    '<circle cx="8" cy="8" r="4.4" fill="#f6efe2"/>' +
    '<circle cx="15" cy="10" r="3.6" fill="#f2ede0"/>' +
    '<path d="M8,12v9M15,13v8" stroke="#6b8f4a" stroke-width="1.6" fill="none"/>' +
    '<path d="M2,21h20v2.4H2z" fill="#8a5a2c"/>',
};
