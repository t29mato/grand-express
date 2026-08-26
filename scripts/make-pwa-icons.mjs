/**
 * ホーム画面に置くアイコンを作る。
 *
 * カバー画像(`make-itchio-cover.mjs`)と同じ考えで、**絵を手で描かず
 * 世界盤の海岸線から起こす。**ただし表紙と違って正距円筒のままでは使えない。
 * 四角い地図を丸に切ると、地球ではなく「丸く切った地図」に見えるため、
 * ここでは**正射図法**(地球を横から見た形)で描き直す。
 *
 * 出すもの:
 *   icon-192.png            ふつうのアイコン
 *   icon-512.png            同上・大きいほう
 *   icon-maskable-512.png   Androidが好きな形に切るぶん。中身を小さくして余白を取る
 *   apple-touch-icon-180.png  iOS用。透過も角丸も入れない(iOSが自分で丸める)
 *
 *   node scripts/make-pwa-icons.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const OUT_DIR = "public/icons";
/** SVGは焼くための下ごしらえ。**`public/` に置くと配信物に混ざる**ので外に出す。 */
const TMP_DIR = join(tmpdir(), "world-express-icons");
const board = JSON.parse(readFileSync("src/infrastructure/content/world.content.json", "utf8"));

const BG = "#241a3f"; // アプリの地の色(globals.css の --night)。起動画面と揃える
const SEA = "#1d4e7a";
const LAND = board.landBase; // #83a55c
const COAST = board.coast;
const RIM = "#f6efe2";
const ROUTE = board.stripe[4]; // #f5b31c

/** 地球を見る向き。アフリカとヨーロッパが正面に来ると、ひと目で地球と分かる。 */
const LON0 = 15;
const LAT0 = 20;

const rad = (d) => (d * Math.PI) / 180;

/**
 * 正射図法。戻り値は単位円の中の [x, y] と、表を向いているかどうか。
 */
function ortho(lon, lat) {
  const p = rad(lat);
  const l = rad(lon - LON0);
  const p0 = rad(LAT0);
  const cosC = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
  const x = Math.cos(p) * Math.sin(l);
  const y = Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l);
  return { x, y, front: cosC >= 0 };
}

/** 表を向いている点だけを返す(路線の端に使う。裏なら null)。 */
function frontOnly(lon, lat) {
  const p = ortho(lon, lat);
  return p.front ? [p.x, p.y] : null;
}

const round = (n) => Math.round(n * 1000) / 1000;

/**
 * 陸のかたちを組む。
 *
 * **裏へ回った点は、捨てずに輪郭線の上へ寄せる。**
 * 捨てて弦で閉じると、ユーラシアのように地球の縁をまたぐ陸で
 * **円盤を横切る細い筋**が出る(最初これで失敗した)。
 * 同じ方位のまま半径だけ縁に合わせれば、裏側の海岸線は縁に畳まれて
 * 「陸が地球の向こうへ回り込んでいる」正しい見え方になる。
 */
function landPaths(cx, cy, r) {
  const out = [];
  for (const ring of board.land) {
    const run = [];
    for (const [lon, lat] of ring) {
      const { x, y, front } = ortho(lon, lat);
      if (front) {
        run.push([cx + x * r, cy - y * r]);
        continue;
      }
      const len = Math.hypot(x, y);
      if (len < 1e-6) continue; // ちょうど裏の一点。方位が決まらないので飛ばす
      run.push([cx + (x / len) * r, cy - (y / len) * r]);
    }
    if (run.length >= 3) out.push(run);
  }
  return out
    .filter((run) => {
      const xs = run.map((p) => p[0]);
      const ys = run.map((p) => p[1]);
      const w = Math.max(...xs) - Math.min(...xs);
      const h = Math.max(...ys) - Math.min(...ys);
      return w * h > (r * 0.05) ** 2; // 小さすぎる破片は捨てる(縮むと汚れになる)
    })
    .map((run) => `M${run.map(([x, y]) => `${round(x)},${round(y)}`).join("L")}Z`);
}

/**
 * @param size   一辺の px
 * @param inset  中身の縮め具合(1 = 目一杯、0.72 = まわりに余白)
 */
function svgFor(size, inset) {
  const S = 512; // 中身は常に512の座標で組み、出すときに縮める
  const cx = S / 2;
  const cy = S / 2;
  const r = (S / 2) * 0.86 * inset;
  const paths = landPaths(cx, cy, r);
  const strokeW = round(1.6 * (r / 220));

  // 都市をつなぐ線を1本だけ渡す。「路線でつながっている」ことの合図。
  const a = frontOnly(-3, 40); // だいたいマドリード
  const b = frontOnly(37, -1); // だいたいナイロビ
  const arc =
    a && b
      ? `<path d="M${round(cx + a[0] * r)},${round(cy - a[1] * r)} Q${round(cx + (a[0] + b[0]) * 0.5 * r - r * 0.3)},${round(cy - (a[1] + b[1]) * 0.5 * r - r * 0.22)} ${round(cx + b[0] * r)},${round(cy - b[1] * r)}"
        fill="none" stroke="${ROUTE}" stroke-width="${round(9 * inset)}" stroke-linecap="round" stroke-dasharray="${round(20 * inset)} ${round(14 * inset)}"/>
       <circle cx="${round(cx + a[0] * r)}" cy="${round(cy - a[1] * r)}" r="${round(13 * inset)}" fill="${RIM}" stroke="${BG}" stroke-width="${round(4 * inset)}"/>
       <circle cx="${round(cx + b[0] * r)}" cy="${round(cy - b[1] * r)}" r="${round(13 * inset)}" fill="${RIM}" stroke="${BG}" stroke-width="${round(4 * inset)}"/>`
      : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${S} ${S}">
  <defs>
    <clipPath id="disc"><circle cx="${cx}" cy="${cy}" r="${round(r)}"/></clipPath>
    <radialGradient id="shade" cx="0.36" cy="0.32" r="0.85">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.20"/>
      <stop offset="0.65" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000814" stop-opacity="0.45"/>
    </radialGradient>
  </defs>
  <rect width="${S}" height="${S}" fill="${BG}"/>
  <circle cx="${cx}" cy="${cy}" r="${round(r)}" fill="${SEA}"/>
  <g clip-path="url(#disc)">
    <g fill="${LAND}" stroke="${COAST}" stroke-width="${strokeW}" stroke-linejoin="round">
      ${paths.map((d) => `<path d="${d}"/>`).join("\n      ")}
    </g>
    ${arc}
    <circle cx="${cx}" cy="${cy}" r="${round(r)}" fill="url(#shade)"/>
  </g>
  <circle cx="${cx}" cy="${cy}" r="${round(r)}" fill="none" stroke="${RIM}" stroke-width="${round(6 * inset)}" stroke-opacity="0.9"/>
</svg>
`;
}

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(TMP_DIR, { recursive: true });

const jobs = [
  // ふつうのアイコン。丸は縁いっぱいまで使ってよい。
  { file: "icon-192.png", size: 192, inset: 1 },
  { file: "icon-512.png", size: 512, inset: 1 },
  /**
   * Androidは好きな形(円・角丸・雫)に切り抜く。**外側の20%は切られる前提**なので、
   * 中身を縮めて安全圏(中央80%)に収める。縮めないと縁の丸が欠ける。
   */
  { file: "icon-maskable-512.png", size: 512, inset: 0.82 },
  /**
   * iOSは角を自分で丸める。**透過を入れると黒く塗られる**ので背景は必ず不透明。
   * 角丸で少し削られるぶん、ほんの少し内側に寄せる。
   */
  { file: "apple-touch-icon-180.png", size: 180, inset: 0.92 },
];

for (const { file, size, inset } of jobs) {
  const svgPath = join(TMP_DIR, file.replace(/\.png$/, ".svg"));
  writeFileSync(svgPath, svgFor(size, inset));
  execFileSync("rsvg-convert", ["-w", String(size), "-h", String(size), "-o", `${OUT_DIR}/${file}`, svgPath]);
  console.log(`${file}  ${size}×${size}`);
}
console.log(`→ ${OUT_DIR}/`);
