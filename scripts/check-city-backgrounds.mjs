#!/usr/bin/env node
/**
 * 都市の背景SVGに**塗り残し**が無いか実測する。
 *
 *   node scripts/check-city-backgrounds.mjs                全部見る(生成物を見る)
 *   node scripts/check-city-backgrounds.mjs japan          1国だけ
 *   node scripts/check-city-backgrounds.mjs --src world    **焼き直さずに元を見る**
 *   node scripts/check-city-backgrounds.mjs --hidden japan  シンボルに隠れる帯の図形を挙げる
 *   node scripts/check-city-backgrounds.mjs --src ibaraki-coast  取り込み前の水辺6種を見る
 *
 * `--src` は `scripts/countries/<国>/art.mjs` を直接読む。
 * `extract-legacy-content.mjs` を回さずに済むので、**描きながら何度でも回せる**。
 * 凍結中や、他の担当が `scripts/` を編集している最中に生成器を回したくないときにも使う。
 *
 * 塗り残しは実測しないと見つからない。少なくとも3回、描いた本人が気づけずに作っている
 * (日本 valley2 / インド cavetemple / インド megacity)。**間違えないようにするのではなく、
 * 間違えてもすぐ分かるようにする**ための道具。
 *
 * 背景は「空の帯」と「地面の矩形」を別々に置くので、両者のyが噛み合っていないと
 * **横一文字の塗り残し**ができ、都市カードの地色がそのまま透ける。
 * 2026-08-08 の初回計測では全77背景のうち**30種・63,266px**で起きていた。
 * いちばんひどい `japan/metropolis` は地面が1枚も無く、ビルのあいだが下端まで素通しだった。
 *
 * **静的に `<rect>` を数える方法では見つからない。** 地面を `<path>` で描いている
 * シーンを塗り残しと誤判定するし、逆に図形の重なりで塞がっている箇所も分からない。
 * そこで実際にマゼンタ `#ff00ff` の台紙へ描いて、透けている画素を数える。
 *
 * 直す場所は国によって違う:
 *   india / france / world / ibaraki → scripts/countries/<国>/art.mjs の sky() の深さ
 *   japan / bolivia                 → legacy が凍結なので scripts/content-overrides/ で上書き
 */
import { chromium } from "playwright";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, "..", "src", "infrastructure", "content");
/**
 * 盤面の一覧は**焼き上がった目録から引く。**同じ配列を検査ごとに書いていたので、
 * 盤面を1枚足すたびに何箇所も直す必要があり、直し忘れても検査は緑のまま通った
 * (増えた盤面を見に行かないだけなので)。
 */
const ALL = JSON.parse(
  readFileSync(new URL("../src/infrastructure/content/country-index.json", import.meta.url), "utf8"),
).map((entry) => entry.id);
/** `--src` のとき、その国の背景がどのモジュールのどの名前で出ているか。 */
const SOURCES = {
  india: ["countries/india/art.mjs", "INDIA_BG"],
  france: ["countries/france/art.mjs", "FRANCE_BG"],
  world: ["countries/world/art.mjs", "WORLD_BG"],
  ibaraki: ["countries/ibaraki/art.mjs", "IBARAKI_BG"],
  korea: ["countries/korea/art.mjs", "KOREA_BG"],
  mexico: ["countries/mexico/art.mjs", "MEXICO_BG"],
  africa: ["countries/africa/art.mjs", "AFRICA_BG"],
  egypt: ["countries/egypt/art.mjs", "EGYPT_BG"],
  switzerland: ["countries/switzerland/art.mjs", "SWITZERLAND_BG"],
  vietnam: ["countries/vietnam/art.mjs", "VIETNAM_BG"],
  peru: ["countries/peru/art.mjs", "PERU_BG"],
  southafrica: ["countries/southafrica/art.mjs", "SOUTHAFRICA_BG"],
  norway: ["countries/norway/art.mjs", "NORWAY_BG"],
  hokkaido: ["countries/hokkaido/art.mjs", "HOKKAIDO_BG"],
  kyushu: ["countries/kyushu/art.mjs", "KYUSHU_BG"],
  oceania: ["countries/oceania/art.mjs", "OCEANIA_BG"],
  argentina: ["countries/argentina/art.mjs", "ARGENTINA_BG"],
  chile: ["countries/chile/art.mjs", "CHILE_BG"],
  colombia: ["countries/colombia/art.mjs", "COLOMBIA_BG"],
  cuba: ["countries/cuba/art.mjs", "CUBA_BG"],
  spain: ["countries/spain/art.mjs", "SPAIN_BG"],
  newzealand: ["countries/newzealand/art.mjs", "NEWZEALAND_BG"],
  japan: ["content-overrides/japan-city-bg.mjs", "JAPAN_RICH_BG"],
  // 茨城は田園・町(art.mjs)と水辺(bg-coast.mjs)を別の担当が書くのでファイルが分かれている。
  // 取り込み前でも実測できるよう、水辺だけを見る名前を用意してある。
  "ibaraki-coast": ["countries/ibaraki/bg-coast.mjs", "IBARAKI_COAST_BG"],
};

const args = process.argv.slice(2);
const fromSource = args.includes("--src");
const hiddenMode = args.includes("--hidden");
const only = args.find((a) => !a.startsWith("--"));
const countries = only ? [only] : ALL;

for (const c of countries) {
  if (!ALL.includes(c) && !SOURCES[c]) {
    console.error(`知らない国です: ${c}(${ALL.join(" / ")})`);
    process.exit(2);
  }
  if (fromSource && !SOURCES[c]) {
    console.error(
      `--src は ${c} に使えません(${Object.keys(SOURCES).join(" / ")} のみ)。\n` +
        "legacy由来の背景を上書きの関数で直している国は、元の絵が無いと評価できません。",
    );
    process.exit(2);
  }
  if (!fromSource && !ALL.includes(c)) {
    console.error(`${c} は --src 専用です(生成物にはこの名前がありません)。`);
    process.exit(2);
  }
  if (!fromSource && !existsSync(join(contentDir, `${c}.content.json`))) {
    console.error(`${c}.content.json がありません。先に node scripts/extract-legacy-content.mjs を実行してください。`);
    process.exit(2);
  }
}

/** その国の「背景キー → SVG文字列」を取り出す。 */
async function loadScenes(country) {
  if (!fromSource) {
    return JSON.parse(readFileSync(join(contentDir, `${country}.content.json`), "utf8")).bg;
  }
  const [path, name] = SOURCES[country];
  const mod = await import(`./${path}?v=${Date.now()}`);
  const bg = mod[name];
  if (!bg) throw new Error(`${path} が ${name} を export していません`);
  // 上書きが `(prev) => next` の関数で書かれているものは、元の絵が無いと評価できない
  return Object.fromEntries(Object.entries(bg).filter(([, v]) => typeof v === "string"));
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 300 } });

/** SVG断片をマゼンタの台紙へ描き、透けている画素を行ごとに数える。 */
async function measure(svg) {
  return page.evaluate(async (inner) => {
    const src =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 210" width="400" height="210">${inner}</svg>`;
    const img = new Image();
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(src);
    await img.decode();
    const cv = document.createElement("canvas");
    cv.width = 400;
    cv.height = 210;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#ff00ff";
    ctx.fillRect(0, 0, 400, 210);
    ctx.drawImage(img, 0, 0);
    const px = ctx.getImageData(0, 0, 400, 210).data;
    let total = 0;
    const rows = [];
    for (let y = 0; y < 210; y++) {
      let n = 0;
      for (let x = 0; x < 400; x++) {
        const i = (y * 400 + x) * 4;
        // 台紙のマゼンタがそのまま残っている = そこは何も塗られていない
        if (px[i] > 200 && px[i + 1] < 60 && px[i + 2] > 200) n++;
      }
      total += n;
      if (n > 0) rows.push([y, n]);
    }
    return { total, rows };
  }, svg);
}

/**
 * **見えにくい帯に置かれた図形**を洗い出す(`--hidden`)。
 *
 * 中央はシンボルが必ず覆う。ここに主役級のものを置くと見えなくなるのだが、
 * **知っていても繰り返し置いてしまう**
 * (沖の貨物船・軽トラ・クレーン・旅館・一角犀・松・赤レンガ倉庫で7回)。
 * 注意力ではなく道具の問題にする。
 *
 * 帯は**シンボル(x=151〜249 / y=54〜152)と影の楕円((200,155) rx53 ry14)の合併**。
 * 影に沈むものも見えにくいので、まとめて外接矩形で見る。
 * `getBBox()` で図形ごとの外接矩形を測り、**帯との重なりが一定以上のもの**を挙げる。
 *
 * しきい値は実測で決めた。**過去に実際に消した8件で試したところ、**
 * 「完全に帯の中」だけを見る作りでは 3件しか拾えず、
 * 重なり65%以上にすると **6件** 拾えた。
 *
 * 取りこぼす2件は性質が違う。旅館(56%)は「隠れた」のではなく**左半分を切られた**もの、
 * 松は樹冠が帯からはみ出していたもの。**半分見えている状態の良し悪しは機械では決まらない。**
 *
 * 見るのは**根の直下の要素だけ**。列柱や町並みのような繰り返しは `<g>` でまとまって
 * いて、群としては帯からはみ出すので拾わない。単独で置かれた建物や乗り物は拾える。
 *
 * **これは判定ではなく手がかり。**全80背景で149件出る。その多くは
 * 「隠れても惜しくない繰り返し」か「動きの層がそこを指している」もの(湯気の出口など)で、
 * そのままでよい。**終了コードは変えない。**描いた本人が自分の絵を見るのに使う。
 */
const HIDDEN = { x0: 147, x1: 253, y0: 54, y1: 169 };
const HIDDEN_RATIO = 0.65;
async function findHidden(svg) {
  return page.evaluate(
    async ([inner, H, ratio]) => {
      const NS = "http://www.w3.org/2000/svg";
      const svgEl = document.createElementNS(NS, "svg");
      svgEl.setAttribute("viewBox", "0 0 400 210");
      svgEl.setAttribute("width", "400");
      svgEl.setAttribute("height", "210");
      svgEl.innerHTML = inner;
      document.body.appendChild(svgEl);
      const out = [];
      for (const el of Array.from(svgEl.children)) {
        let b;
        try {
          b = el.getBBox();
        } catch {
          continue;
        }
        if (b.width < 9 || b.height < 9) continue;
        if (b.width * b.height < 180) continue;
        const ox = Math.max(0, Math.min(b.x + b.width, H.x1) - Math.max(b.x, H.x0));
        const oy = Math.max(0, Math.min(b.y + b.height, H.y1) - Math.max(b.y, H.y0));
        const covered = (ox * oy) / (b.width * b.height);
        if (covered < ratio) continue;
        out.push({
          tag: el.tagName,
          x: Math.round(b.x),
          y: Math.round(b.y),
          w: Math.round(b.width),
          h: Math.round(b.height),
          pct: Math.round(covered * 100),
          fill: el.getAttribute("fill") ?? "",
        });
      }
      svgEl.remove();
      return out;
    },
    [svg, HIDDEN, HIDDEN_RATIO],
  );
}

let bad = 0;
let totalPx = 0;
let checked = 0;
let hiddenCount = 0;
for (const country of countries) {
  const scenes = await loadScenes(country);
  for (const [key, svg] of Object.entries(scenes)) {
    checked++;
    if (hiddenMode) {
      const found = await findHidden(svg);
      if (found.length) {
        hiddenCount += found.length;
        console.log(`?  ${country}/${key}: 見えにくい帯に ${found.length}個`);
        for (const f of found) {
          console.log(
            `     ${f.pct}%隠れる  ${f.tag} x=${f.x}〜${f.x + f.w} y=${f.y}〜${f.y + f.h}` +
              `${f.fill ? ` fill=${f.fill}` : ""}`,
          );
        }
      }
      continue;
    }
    const { total, rows } = await measure(svg);
    if (total === 0) continue;
    bad++;
    totalPx += total;
    const ys = rows.map(([y]) => y);
    const widest = Math.max(...rows.map(([, n]) => n));
    console.log(
      `NG ${country}/${key}: ${total}px 透けています ` +
        `(y=${ys[0]}〜${ys[ys.length - 1]} の ${rows.length}行 / 最大幅 ${widest}px)`,
    );
  }
}
await browser.close();

const where = fromSource ? "元(art.mjs)" : "生成物(content.json)";
if (hiddenMode) {
  console.log(
    hiddenCount === 0
      ? `\n${where}の背景 ${checked}種。隠れる帯の中だけに置かれた図形はありません。`
      : `\n背景 ${checked}種で、${hiddenCount}個が見えにくい帯(シンボル + 影)に${Math.round(HIDDEN_RATIO * 100)}%以上かかっています。` +
          "\n**これは判定ではなく手がかり。**隠れても惜しくないもの(列柱・町並みなどの繰り返し)や、" +
          "\n動きの層がそこを指している場合(湯気の出口など)はそのままでよい。" +
          "\n主役なら、左右3分の1か y>170 の手前へ寄せること。",
  );
  process.exit(0); // 手がかりを出すだけ。良し悪しは人が決める
}
if (bad === 0) {
  console.log(`${where}の背景 ${checked}種、塗り残しはありません。`);
  process.exit(0);
}
console.log(`\n背景 ${checked}種のうち ${bad}種 / 合計 ${totalPx}px が透けています。`);
console.log("空を塗り下ろす深さ(sky の第3引数)を、次に来る塗りの開始yに合わせてください。");
process.exit(1);
