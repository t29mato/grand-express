import { IBARAKI_COAST_BG } from "./bg-coast.mjs";

/**
 * 茨城県の都市イラスト。
 *
 * `IBARAKI_MARKS` は 24×24 の座標系に描くシンボル、`IBARAKI_BG` は 400×210 の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。フランス・世界一周と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。茨城らしさは
 * **梅の紅 #c4384f、台地の砂 #d8c8a0、干し芋の飴色 #d8a24a、
 * 松と杉の濃緑 #2f5f3f、常磐の海の青 #2f6ea8** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 * 増やすときは両方を揃えること。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品
// ---------------------------------------------------------------------------

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/** 空。関東平野は空が広いので、他の盤面より帯を高く取る。 */
/**
 * 空。**第3引数に「次に来る塗りの開始y」を渡すこと。**
 *
 * 既定では y=124 までしか塗らないので、地面が y=128 から始まるシーンでは
 * あいだの4行が塗り残しになり、カードの地色がそのまま透ける。
 * エラーにならないので気づけない(茨城で3種が透けていた)。
 *
 * `node scripts/check-city-backgrounds.mjs ibaraki` で検査できる。
 */
function sky(top = "#8fc4e8", bottom = "#cfe4f0", to = 124) {
  return band(0, 92, top) + band(84, Math.max(0, to - 84), bottom);
}

function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

function sun(cx, cy, r, fill = "#f5b31c") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1) {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".8" fill="#f6efe2">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/**
 * 筑波山。**この県の背景の要**なので部品にしてある。
 * 二峰なので、必ず左右で高さを変えた二つの山を描くこと。
 */
function tsukuba(cx, base, h, fill = "#7f8fa8") {
  const w = r1(h * 1.9);
  const gap = r1(h * 0.46);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - gap)},${r1(base - h * 0.92)}L${r1(cx - gap + w * 0.26)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.18)},${base}L${r1(cx + gap * 0.6)},${r1(base - h)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>`
  );
}

/** 遠景のなだらかな丘。県北以外はこれで十分。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 74},${y}c22,-30 52,-30 74,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 水面の反射線。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** 杉。県北の谷と社叢に使う。まっすぐで細いのが茨城の植林の姿。 */
function cedar(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.34);
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - 6)}" width="3.2" height="6" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - 4)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - 4)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2.4)},${r1(base - h * 0.46)}L${x},${r1(base - h * 0.94)}L${r1(x + w / 2.4)},${r1(base - h * 0.46)}z" fill="${fill}"/>`
  );
}

/** 丸い樹冠の木。 */
function roundTree(x, base, r, crown = "#3f8f4f", trunk = "#6b5330") {
  const th = r1(r * 1.2);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.55)}" r="${r}" fill="${crown}"/>`
  );
}

/** 梅の木。枝が曲がり、花が点で付く。桜と描き分けるため幹を黒く太く。 */
function plumTree(x, base, h) {
  const c = "#c4384f";
  const dots = [];
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    dots.push(
      `<circle cx="${r1(x + Math.cos(a) * h * 0.34)}" cy="${r1(base - h * 0.68 + Math.sin(a) * h * 0.3)}" r="${r1(h * 0.09)}" fill="${c}"/>`,
    );
  }
  return (
    `<path d="M${x},${base}c-2,${r1(-h * 0.4)} -6,${r1(-h * 0.45)} -9,${r1(-h * 0.6)}M${x},${base}c2,${r1(-h * 0.4)} 7,${r1(-h * 0.5)} 10,${r1(-h * 0.62)}" stroke="#3b2a1c" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<rect x="${r1(x - 2.4)}" y="${r1(base - h * 0.5)}" width="4.8" height="${r1(h * 0.5)}" fill="#3b2a1c"/>` +
    dots.join("")
  );
}

/** 切妻の家。棟が低く、瓦が黒いのが関東の平屋の姿。 */
function house(x, base, w, h, wall = "#f6efe2", roof = "#4a4436") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw - 4)},${r1(base - h)}L${x},${r1(base - h - h * 0.62)}L${r1(x + hw + 4)},${r1(base - h)}z" fill="${roof}"/>` +
    `<rect x="${r1(x - w * 0.14)}" y="${r1(base - h * 0.6)}" width="${r1(w * 0.28)}" height="${r1(h * 0.6)}" fill="#6b5330"/>`
  );
}

/** 鳥居。笠木が両端で反り上がる明神型。 */
function torii(x, base, h, fill = "#c4384f") {
  const w = r1(h * 0.86);
  return (
    `<path d="M${r1(x - w / 2 - 5)},${r1(base - h)}q${r1(w / 2 + 5)},${r1(-h * 0.1)} ${r1(w + 10)},0v5q${r1(-w / 2 - 5)},${r1(h * 0.07)} ${r1(-w - 10)},0z" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2 - 1)}" y="${r1(base - h * 0.78)}" width="${r1(w + 2)}" height="4.5" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="5" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x + w / 2 - 5)}" y="${r1(base - h)}" width="5" height="${h}" fill="${fill}"/>`
  );
}

/** 蓮田。丸い葉が水面に浮く。 */
function lotusField(y) {
  const parts = [];
  for (let i = 0; i < 11; i++) {
    const x = 18 + i * 35 + (i % 2) * 12;
    const yy = y + (i % 3) * 9;
    parts.push(`<ellipse cx="${x}" cy="${yy}" rx="15" ry="6" fill="#3f8f4f"/>`);
    parts.push(`<ellipse cx="${x}" cy="${r1(yy - 1.5)}" rx="9" ry="3.4" fill="#5aa85f" opacity=".8"/>`);
  }
  return parts.join("");
}

/** 干し場。棚に薄切りの芋が並ぶ。 */
function dryingRack(x, base, w) {
  const rows = [];
  for (let r = 0; r < 3; r++) {
    const y = r1(base - 10 - r * 11);
    rows.push(`<rect x="${x}" y="${y}" width="${w}" height="6" fill="#d8a24a"/>`);
    rows.push(`<rect x="${x}" y="${r1(y + 6)}" width="${w}" height="1.6" fill="#a8763a"/>`);
  }
  return (
    `<rect x="${r1(x - 3)}" y="${r1(base - 44)}" width="3" height="44" fill="#6b5330"/>` +
    `<rect x="${r1(x + w)}" y="${r1(base - 44)}" width="3" height="44" fill="#6b5330"/>` +
    rows.join("")
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(13種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const IBARAKI_BASE_BG = {
  /** 城下町。堀と土塁の上に低い櫓、手前に梅。 */
  /**
   * 城下町。水戸ほか4都市。
   *
   * **櫓を左3分の1へ移した。** 元は x=176〜228 / y=66〜100 で、
   * 隠れる帯(x=151〜249 / y=54〜152)にすっぽり入っていて一度も見えていなかった。
   * 中央に通すのは**土塀と堀** — どちらも繰り返しなので、隠れても失うものが少ない。
   *
   * 田園3種と分けるため、地面を草ではなく**土塁と石垣と堀**にしている。
   */
  castletown:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 30, 1.1) +
    clouds(78, 32) +
    hills(126, "#8fae7a") +
    // 土塁(全幅に通す繰り返し)
    ground(126, "#7f9f5f") +
    `<path d="M0,126c60,-10 120,4 200,-2c80,-6 140,2 200,6v20H0z" fill="#8faf68"/>` +
    /*
     * 櫓。**左3分の1(x=52〜116)。**この絵で唯一「城下町」と言える形なので、
     * 隠れるところに置いてはいけない。
     */
    `<rect x="56" y="72" width="56" height="36" fill="#f2ede0"/>` +
    `<rect x="56" y="72" width="14" height="36" fill="#e2dccb"/>` +
    `<path d="M46,72h76l-12,-15H58z" fill="#4a4436"/>` +
    `<path d="M46,72h76v4H46z" fill="#3a352c"/>` +
    `<rect x="60" y="52" width="48" height="8" fill="#f2ede0"/>` +
    `<path d="M52,52h64l-10,-12H62z" fill="#4a4436"/>` +
    `<g fill="#3b2a1c"><rect x="66" y="82" width="10" height="12"/><rect x="82" y="82" width="10" height="12"/><rect x="98" y="82" width="10" height="12"/></g>` +
    `<g fill="#8a8272"><rect x="52" y="108" width="64" height="5"/></g>` +
    // 石垣。**布積みの目地は繰り返し**なので、中央に来ても惜しくない。
    `<path d="M40,113h88l10,25H32z" fill="#a89e88"/>` +
    `<g stroke="#8a8272" stroke-width="1.2" opacity=".8" fill="none">` +
    `<path d="M38,120h92M35,128h98M42,113v25M60,113v25M78,113v25M96,113v25M114,113v25"/></g>` +
    /*
     * 土塀。中央を横切る繰り返し。瓦の列と下見板で、ただの帯にしない。
     */
    `<rect x="128" y="118" width="272" height="20" fill="#e8e2d2"/>` +
    `<rect x="128" y="130" width="272" height="8" fill="#c9bfa8"/>` +
    `<path d="M124,118h280l-6,-7H130z" fill="#5a5348"/>` +
    `<g fill="#4a4436">` +
    Array.from({ length: 18 }, (_, i) => `<rect x="${130 + i * 15}" y="111" width="11" height="3"/>`).join("") +
    `</g>` +
    `<g stroke="#c2b9a4" stroke-width="1.2" opacity=".9" fill="none"><path d="M128,124h272M128,134h272"/></g>` +
    // 塀の門(右3分の1)
    `<rect x="316" y="112" width="44" height="26" fill="#5a4630"/>` +
    `<path d="M310,112h56l-8,-9h-40z" fill="#3a352c"/>` +
    `<rect x="326" y="120" width="24" height="18" fill="#2f2418"/>` +
    // 堀。石垣と塀を映す。**明るい草地に対して、いちばん濃い横帯。**
    band(150, 16, "#3f6f94") +
    `<rect x="0" y="150" width="400" height="4" fill="#2f5878"/>` +
    `<g fill="#8a8272" opacity=".3"><rect x="32" y="154" width="106" height="10"/></g>` +
    `<g fill="#e8e2d2" opacity=".25"><rect x="128" y="154" width="272" height="8"/></g>` +
    `<g stroke="#9fd0e4" stroke-width="1.6" opacity=".7" fill="none"><path d="M20,160h70M180,163h90M300,158h70"/></g>` +
    // 手前の土手と、偕楽園の梅
    ground(166, "#7f9f5f") +
    `<path d="M0,176c70,-8 130,6 200,0c70,-6 130,4 200,8v26H0z" fill="#6f9450"/>` +
    `<g stroke="#6b8a48" stroke-width="1.6" opacity=".55" fill="none"><path d="M0,190q100,-8 200,0t200,0M0,202q100,-8 200,0t200,0"/></g>` +
    plumTree(48, 194, 46) +
    plumTree(104, 200, 38) +
    plumTree(340, 198, 42) +
    plumTree(286, 190, 32) +
    // 落ちた花びら
    `<g fill="#e8a0b0" opacity=".8"><circle cx="66" cy="200" r="1.6"/><circle cx="78" cy="204" r="1.4"/><circle cx="92" cy="207" r="1.5"/>` +
    `<circle cx="322" cy="204" r="1.5"/><circle cx="334" cy="207" r="1.4"/></g>` +
    // 梅を見に来た人
    `<ellipse cx="196" cy="203" rx="8" ry="2.4" fill="#000" opacity=".14"/>` +
    `<path d="M189,202q7,-3.4 14,0l-2,-14q-5,-2.6 -10,0z" fill="#5b3f6b"/>` +
    `<circle cx="196" cy="184" r="5" fill="#8a5a34"/>` +
    `<path d="M191,181q5,-4 10,0q-5,-2 -10,0z" fill="#2f2418"/>` +
    `<g fill="#3a3446"><rect x="191.6" y="202" width="3.6" height="4.4"/><rect x="196.8" y="202" width="3.6" height="4.4"/></g>` +
    `<ellipse cx="216" cy="205" rx="7" ry="2.2" fill="#000" opacity=".12"/>` +
    `<path d="M210,204q6,-3 12,0l-1.8,-12q-4.4,-2.2 -8.6,0z" fill="#c2603c"/>` +
    `<circle cx="216" cy="188" r="4.4" fill="#8a5a34"/>` +
    `<g fill="#3a3446"><rect x="212" y="204" width="3.2" height="4"/><rect x="217" y="204" width="3.2" height="4"/></g>` +
    // 石灯籠(繰り返しの調度)
    `<g fill="#a89e88"><rect x="140" y="186" width="6" height="16"/><path d="M134,186h18l-9,-7z"/><rect x="136" y="178" width="14" height="5"/>` +
    `<rect x="366" y="184" width="6" height="18"/><path d="M360,184h18l-9,-7z"/><rect x="362" y="176" width="14" height="5"/></g>`,

  /** 焼き物の町。登り窯が斜面に段を作り、煙が細く上がる。 */
  pottery:
    sky("#8fc4e8", "#e8d8bf") +
    clouds(300, 30, 0.8) +
    hills(122, "#7f8f5c") +
    ground(122, "#a88f5f") +
    `<path d="M60,168L250,110l26,0l0,58z" fill="#8a7250"/>` +
    `<g fill="#5a4630">` +
    `<rect x="86" y="150" width="26" height="18"/><rect x="128" y="139" width="26" height="18"/>` +
    `<rect x="170" y="128" width="26" height="18"/><rect x="212" y="117" width="26" height="18"/></g>` +
    `<g fill="#e8443f"><rect x="92" y="156" width="14" height="12"/><rect x="134" y="145" width="14" height="12"/>` +
    `<rect x="176" y="134" width="14" height="12"/><rect x="218" y="123" width="14" height="12"/></g>` +
    `<path d="M264,110c6,-16 -6,-24 2,-40" stroke="#f6efe2" stroke-width="5" fill="none" opacity=".7" stroke-linecap="round"/>` +
    `<g fill="#e8e2d2" opacity=".5"><ellipse cx="268" cy="72" rx="9" ry="7"/><ellipse cx="272" cy="58" rx="11" ry="8"/></g>` +
    // 窯の焚き口と、積み上げた薪(繰り返し)
    `<path d="M60,168h22l-4,-14H64z" fill="#2f2418"/>` +
    `<path d="M66,166h10l-2,-8h-6z" fill="#e8823c"/>` +
    `<g fill="#8a6a3c">` +
    Array.from({ length: 3 }, (_, r) =>
      Array.from({ length: 5 }, (_, i) => `<ellipse cx="${22 + i * 9}" cy="${192 - r * 8}" rx="4.4" ry="3.6"/>`).join(""),
    ).join("") +
    `</g>` +
    `<g fill="#6b5330">` +
    Array.from({ length: 3 }, (_, r) =>
      Array.from({ length: 5 }, (_, i) => `<circle cx="${22 + i * 9}" cy="${192 - r * 8}" r="1.8"/>`).join(""),
    ).join("") +
    `</g>` +
    /*
     * 干した器の棚。**繰り返しなので、中央の帯に来て構わない。**
     * 笠間焼らしさは、形の揃わない器が並ぶところに出る。
     */
    `<g fill="#6b5330"><rect x="120" y="176" width="150" height="3.4"/><rect x="120" y="190" width="150" height="3.4"/>` +
    `<rect x="120" y="172" width="3.4" height="34"/><rect x="196" y="172" width="3.4" height="34"/><rect x="266" y="172" width="3.4" height="34"/></g>` +
    `<g fill="#a8926c">` +
    [128, 146, 164, 182, 206, 224, 242, 258]
      .map((x, i) => {
        const w = 6 + (i % 3) * 2;
        const h = 8 + (i % 2) * 3;
        return `<ellipse cx="${x}" cy="${176 - h / 2}" rx="${w}" ry="${h / 2}"/>`;
      })
      .join("") +
    `</g>` +
    `<g fill="#8a7250">` +
    [130, 150, 172, 200, 220, 244, 262]
      .map((x, i) => {
        const w = 5 + (i % 3) * 2;
        return `<ellipse cx="${x}" cy="${190 - 4}" rx="${w}" ry="${4 + (i % 2)}"/>`;
      })
      .join("") +
    `</g>` +
    // 轆轤を回す人(右3分の1、いちばん見える場所)
    `<ellipse cx="330" cy="200" rx="10" ry="3" fill="#000" opacity=".14"/>` +
    `<rect x="318" y="188" width="24" height="4" fill="#6b5330"/>` +
    `<rect x="327" y="192" width="6" height="10" fill="#6b5330"/>` +
    `<ellipse cx="330" cy="188" rx="12" ry="3.4" fill="#8a7250"/>` +
    `<path d="M325,187q5,-12 10,0z" fill="#c9a877"/>` +
    `<path d="M343,196q7,-4 14,0l-2,-16q-5,-3 -10,0z" fill="#4a6b86"/>` +
    `<circle cx="350" cy="176" r="5.4" fill="#8a5a34"/>` +
    `<path d="M343,182l-8,4" stroke="#8a5a34" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
    `<g fill="#3a3446"><rect x="345" y="196" width="3.6" height="4.4"/><rect x="350.4" y="196" width="3.6" height="4.4"/></g>` +
    // 焼き上がった大甕を、地面より2段暗くして置く
    `<g fill="#7a6248"><ellipse cx="300" cy="196" rx="16" ry="18"/><ellipse cx="300" cy="180" rx="10" ry="4"/></g>` +
    `<ellipse cx="300" cy="180" rx="6.4" ry="2.4" fill="#5a4630"/>` +
    `<path d="M286,192q14,6 28,0" stroke="#5a4630" stroke-width="1.6" fill="none" opacity=".7"/>` +
    `<ellipse cx="376" cy="200" rx="12" ry="13" fill="#6b5330"/>` +
    `<ellipse cx="376" cy="189" rx="7.4" ry="3" fill="#4a3a28"/>`,

  /** 海辺。岩の上の鳥居と、水平線から昇る日。 */
  seaside:
    sky("#f5b31c", "#f6d9a8") +
    sun(300, 56, 26, "#f6efe2") +
    band(112, 98, "#2f6ea8") +
    ripples(140) +
    ripples(176, "#8fc4e8") +
    `<path d="M84,190c8,-30 30,-44 56,-42c22,2 30,16 34,42z" fill="#3b3a3c"/>` +
    torii(130, 150, 52) +
    `<path d="M0,206c30,-8 70,-8 100,0z" fill="#3b3a3c" opacity=".8"/>`,

  /** 港町。防波堤と工場の影、係留された小型船。 */
  harbourtown:
    sky("#8fc4e8", "#cfe4f0") +
    clouds(96, 28) +
    band(118, 92, "#2f6ea8") +
    ripples(150) +
    `<g fill="#6b6b74"><rect x="240" y="76" width="20" height="42"/><rect x="276" y="88" width="14" height="30"/>` +
    `<rect x="230" y="98" width="80" height="20"/></g>` +
    `<path d="M246,76c4,-14 -4,-20 2,-32" stroke="#f6efe2" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/>` +
    `<rect x="0" y="118" width="140" height="10" fill="#8a8272"/>` +
    `<path d="M56,152h84l-12,20h-60z" fill="#f6efe2"/>` +
    `<rect x="86" y="130" width="6" height="22" fill="#3b2a1c"/>` +
    `<path d="M92,132h30l-30,16z" fill="#e8443f"/>`,

  /** 内陸の緑の街。並木と低い建物、遠くに筑波山。 */
  citygreen:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(70, 30) +
    tsukuba(320, 128, 54) +
    ground(128, "#7f9f5f") +
    band(128, 8, "#8fae7a") +
    `<g fill="#f6efe2"><rect x="40" y="88" width="34" height="40"/><rect x="86" y="72" width="28" height="56"/>` +
    `<rect x="126" y="96" width="40" height="32"/></g>` +
    `<g fill="#5b8fe8" opacity=".7"><rect x="46" y="96" width="8" height="8"/><rect x="60" y="96" width="8" height="8"/>` +
    `<rect x="92" y="82" width="8" height="8"/><rect x="92" y="100" width="8" height="8"/></g>` +
    // 並木。**中央を横切る繰り返し**なので、隠れる帯に来て構わない。
    // 幹の間隔を揃え、樹冠の大きさだけ変える。
    `<g fill="#6b5330">` +
    [64, 108, 152, 196, 240, 284, 328, 372]
      .map((x) => `<rect x="${x - 3}" y="150" width="6" height="34"/>`)
      .join("") +
    `</g>` +
    `<g fill="#3f8f4f">` +
    [
      [64, 17],
      [108, 14],
      [152, 18],
      [196, 15],
      [240, 17],
      [284, 14],
      [328, 18],
      [372, 15],
    ]
      .map(([x, r]) => `<ellipse cx="${x}" cy="${150 - r * 0.5}" rx="${r}" ry="${r * 0.78}"/>`)
      .join("") +
    `</g>` +
    `<g fill="#4f9f5c" opacity=".85">` +
    [
      [64, 17],
      [152, 18],
      [240, 17],
      [328, 18],
    ]
      .map(([x, r]) => `<ellipse cx="${x - r * 0.3}" cy="${150 - r * 0.9}" rx="${r * 0.6}" ry="${r * 0.44}"/>`)
      .join("") +
    `</g>` +
    // 木陰。明るい芝に濃い形を落として、木が立っていることを見せる。
    `<g fill="#6f8f4a" opacity=".55">` +
    [64, 108, 152, 196, 240, 284, 328, 372]
      .map((x) => `<ellipse cx="${x}" cy="185" rx="16" ry="4.4"/>`)
      .join("") +
    `</g>` +
    // 芝生と園路
    `<path d="M0,168c70,-6 130,6 200,0c70,-6 130,4 200,8v34H0z" fill="#8faf68"/>` +
    `<path d="M0,196q100,-14 200,-2q100,12 200,-2v18H0z" fill="#cfc7b4"/>` +
    `<g stroke="#b8b09c" stroke-width="1.4" opacity=".8" fill="none"><path d="M0,202q100,-13 200,-1q100,11 200,-1"/></g>` +
    // ベンチ(繰り返しの調度)と、街灯
    `<g fill="#8a6a3c">` +
    [96, 300]
      .map((x) => `<rect x="${x}" y="186" width="30" height="3.4"/><rect x="${x}" y="191" width="30" height="3"/>`)
      .join("") +
    `</g>` +
    `<g fill="#5a5348">` +
    [96, 300]
      .map((x) => `<rect x="${x + 2}" y="189" width="2.6" height="8"/><rect x="${x + 25}" y="189" width="2.6" height="8"/>`)
      .join("") +
    `</g>` +
    // 街灯。**灯りの丸を x=190 に置いたら 100% 隠れていた**(`--hidden` が指摘)。
    // 灯っているのが見えないと置いた意味が無いので、見える側へ寄せる。
    `<g fill="#4a4436"><rect x="118" y="160" width="3.4" height="34"/><rect x="114" y="156" width="12" height="5" rx="2"/></g>` +
    `<circle cx="120" cy="158" r="8" fill="#f5d06a" opacity=".22"/>` +
    // 公園の人。犬を連れた人と、走る子。
    `<ellipse cx="140" cy="200" rx="8" ry="2.4" fill="#000" opacity=".14"/>` +
    `<path d="M133,199q7,-3.4 14,0l-2,-14q-5,-2.6 -10,0z" fill="#37536b"/>` +
    `<circle cx="140" cy="180" r="5" fill="#8a5a34"/>` +
    `<g fill="#3a3446"><rect x="135.6" y="199" width="3.6" height="4.4"/><rect x="140.8" y="199" width="3.6" height="4.4"/></g>` +
    `<path d="M147,188l10,4" stroke="#8a8272" stroke-width="1.2" fill="none"/>` +
    `<g fill="#c9955c"><ellipse cx="162" cy="196" rx="7" ry="3.4"/><circle cx="169" cy="192.6" r="3"/>` +
    `<rect x="157" y="198" width="1.8" height="4"/><rect x="164" y="198" width="1.8" height="4"/></g>` +
    `<path d="M155,194q-3,-2.4 -1,-5" stroke="#c9955c" stroke-width="1.5" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="266" cy="202" rx="7" ry="2.2" fill="#000" opacity=".12"/>` +
    `<path d="M260,201q6,-3 12,0l-1.8,-12q-4.4,-2.2 -8.6,0z" fill="#e8443f"/>` +
    `<circle cx="266" cy="185" r="4.4" fill="#8a5a34"/>` +
    `<g fill="#3a3446"><rect x="262" y="201" width="3.2" height="4"/><rect x="267" y="201" width="3.2" height="4"/></g>` +
    // 花壇
    `<g fill="#4f8f42"><ellipse cx="44" cy="200" rx="20" ry="5"/><ellipse cx="356" cy="198" rx="18" ry="4.6"/></g>` +
    `<g fill="#e8443f"><circle cx="36" cy="198" r="2"/><circle cx="48" cy="199" r="1.8"/></g>` +
    `<g fill="#f5b31c"><circle cx="42" cy="196" r="1.8"/><circle cx="54" cy="198" r="1.6"/></g>` +
    `<g fill="#e8447a"><circle cx="350" cy="196" r="1.8"/><circle cx="362" cy="197" r="1.6"/></g>`,

  /** 湖の港。帆引き船の四角い帆が横を向いて浮かぶ。 */
  lakeport:
    sky() +
    clouds(300, 26, 0.8) +
    hills(112, "#8fae7a", 3) +
    band(112, 98, "#4a8fb8") +
    ripples(146) +
    `<g><rect x="150" y="84" width="4" height="70" fill="#3b2a1c"/>` +
    `<path d="M154,86h84v58h-84z" fill="#f6efe2"/>` +
    `<g stroke="#c9a877" stroke-width="1.6"><path d="M176,86v58M198,86v58M220,86v58"/></g>` +
    `<path d="M126,152h140l-16,16h-108z" fill="#5a4630"/></g>` +
    `<g opacity=".85"><rect x="52" y="120" width="3" height="34" fill="#3b2a1c"/>` +
    `<path d="M55,122h34v26h-34z" fill="#f6efe2"/><path d="M38,152h64l-8,10h-48z" fill="#5a4630"/></g>`,

  /** 蓮田。低い水面いっぱいに丸い葉、遠景は平ら。 */
  wetland:
    sky() +
    clouds(88, 26) +
    band(112, 10, "#8fae7a") +
    band(122, 88, "#6b8f7a") +
    lotusField(132) +
    `<path d="M300,140c0,-14 8,-22 14,-22c-4,8 -2,16 4,20z" fill="#f6efe2"/>` +
    `<circle cx="316" cy="136" r="7" fill="#e8a8bf"/>` +
    `<g stroke="#3f8f4f" stroke-width="2.4" fill="none"><path d="M316,143v22M296,150v18"/></g>`,

  /** 水田。畦で区切られた水面が空を映す。 */
  /**
   * 平地の水田。**9都市が使う、この盤面でいちばん多く出る絵。**
   *
   * 小美玉・東海・稲敷・鉾田・利根・阿見・取手・坂東・古河。県内に散っているので、
   * どこか1つの町の景色にはせず、**関東平野の田んぼ**の共通項で組む。
   *
   * 季節は田植えのあと(初夏)。水を張った田は空を映して**とても明るい**ので、
   * そのままだと紙のように白く抜ける。電柱・畦・アオサギ・人を**濃い色で置いて**
   * 明るさに芯を作る。
   *
   * **筑波山は左3分の1(cx=82)に置いてある。**この県の顔なので、
   * 隠れる帯(x=151〜249)に入れると絵の意味が消える。
   * 帯の中に来るのは稲の列と畦と電柱 — どれも繰り返しなので、隠れても失うものが少ない。
   *
   * 茨城には動きの層(`city/scenes/ibaraki-*.tsx`)が1つも無いので、
   * 重ねる図形との座標合わせは不要。
   */
  ricefield:
    sky("#8fc4e8", "#dce8ee", 118) +
    `<g fill="#f6efe2" opacity=".5"><ellipse cx="150" cy="20" rx="70" ry="4.4"/><ellipse cx="320" cy="14" rx="48" ry="3.6"/></g>` +
    clouds(300, 30, 1.1) +
    clouds(120, 24, 0.9) +
    // 筑波山。二峰の高さを変えるのが決まり。
    // 同じ位置に2回描いても後の1枚しか見えないので、奥の一枚をずらして重ねる。
    tsukuba(96, 118, 40, "#9aa8bf") +
    tsukuba(82, 118, 48, "#7f8fa8") +
    `<g fill="#6d7d96"><path d="M64,118L60.9,74.8L74,118z"/><path d="M95.6,118L91,70L104,118z"/></g>` +
    hills(114, "#9fb886", 3) +
    // 地平の屋敷林。関東平野は、木は平地に点々と固まって生える。
    `<g fill="#4d7a44">` +
    [18, 46, 138, 176, 214, 258, 296, 340, 378]
      .map((x, i) => {
        const h = 10 + (i % 3) * 3;
        return `<ellipse cx="${x}" cy="${118 - h / 2}" rx="${10 + (i % 2) * 4}" ry="${h / 2 + 1}"/>`;
      })
      .join("") +
    `</g>` +
    `<rect x="0" y="112" width="400" height="7" fill="#dce8ee" opacity=".4"/>` +
    /*
     * 水田。奥から手前へ、畦の間隔と太さを広げて遠近を出す。
     * 水は空を映すので、奥ほど空の色に近づける。
     */
    band(118, 92, "#a8cbdc") +
    `<rect x="0" y="118" width="400" height="14" fill="#b8d6e4"/>` +
    `<rect x="0" y="150" width="400" height="22" fill="#9fc2d6"/>` +
    `<rect x="0" y="176" width="400" height="34" fill="#93b8ce"/>` +
    // 水面に映る筑波山と空。**明るい面に濃い形を落とすと、水だと分かる。**
    `<g fill="#8a9cb4" opacity=".45"><path d="M60,152L82,178L104,152z"/><path d="M46,152L64,172L82,152z"/></g>` +
    `<g stroke="#cfe4f0" stroke-width="2" opacity=".7" fill="none"><path d="M120,160h60M250,166h70M40,190h80M230,194h90"/></g>` +
    /*
     * 畦(あぜ)。**太い帯にすると柵に見える。**
     * 土の細い高まりに草が乗っているだけなので、細く・土の色で・
     * 手前ほど太く(遠近)。縦の畦は上を細く下を太くして奥行きを出す。
     */
    `<g fill="#9a8a5c"><rect x="0" y="131" width="400" height="1.8"/><rect x="0" y="148" width="400" height="2.6"/>` +
    `<rect x="0" y="171" width="400" height="4"/><rect x="0" y="198" width="400" height="7"/></g>` +
    `<g fill="#7f9450"><rect x="0" y="130.4" width="400" height="1.2"/><rect x="0" y="147" width="400" height="1.6"/>` +
    `<rect x="0" y="169.4" width="400" height="2.2"/><rect x="0" y="195.4" width="400" height="3"/></g>` +
    /*
     * 縦の畦。**ほぼ垂直に引いたら柵に見えた。**
     * 地平 (200,118) の一点へ収束させ、手前を太く奥を細くする。
     * これを入れて初めて、横の帯が「奥へ続く田んぼ」になる。
     */
    `<g fill="#9a8a5c">` +
    [20, 128, 272, 380]
      .map((bx) => {
        const tx = r1(200 + (bx - 200) * 0.2);
        const bw = 5.6;
        return `<path d="M${r1(tx - 0.7)},118L${r1(bx - bw / 2)},210h${bw}L${r1(tx + 0.7)},118z"/>`;
      })
      .join("") +
    `</g>` +
    `<g fill="#7f9450" opacity=".8">` +
    [20, 128, 272, 380]
      .map((bx) => {
        const tx = r1(200 + (bx - 200) * 0.2);
        return `<path d="M${r1(tx - 0.7)},118L${r1(bx - 2.8)},210h2L${r1(tx)},118z"/>`;
      })
      .join("") +
    `</g>` +
    /*
     * 稲の苗。**隠れる帯に来るのはここ。**列なので中央が隠れても失うものが少ない。
     *
     * 最初、`map` が返す文字列を `<g>` に直接入れてしまい、
     * **生のパスデータのままで苗が1本も描かれていなかった**(要素数を数えても
     * 塗り残しを検査しても出ない)。`<path d="...">` で包むこと。
     */
    `<g stroke="#5f9f4f" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="` +
    Array.from({ length: 16 }, (_, i) => {
      const x = 12 + i * 25;
      return `M${x},129l-2.6,-5M${x},129v-6M${x},129l2.6,-5`;
    }).join("") +
    `"/></g>` +
    `<g stroke="#5f9f4f" stroke-width="2" fill="none" stroke-linecap="round"><path d="` +
    Array.from({ length: 14 }, (_, i) => {
      const x = 16 + i * 28;
      return `M${x},146l-3.4,-6.4M${x},146v-8M${x},146l3.4,-6.4`;
    }).join("") +
    `"/></g>` +
    `<g stroke="#4f8f42" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="` +
    Array.from({ length: 11 }, (_, i) => {
      const x = 20 + i * 36;
      return `M${x},169l-4.4,-8M${x},169v-10.4M${x},169l4.4,-8`;
    }).join("") +
    `"/></g>` +
    `<g stroke="#41803a" stroke-width="3.4" fill="none" stroke-linecap="round"><path d="` +
    Array.from({ length: 8 }, (_, i) => {
      const x = 28 + i * 50;
      return `M${x},195l-6,-11M${x},195v-14M${x},195l6,-11`;
    }).join("") +
    `"/></g>` +
    /*
     * 電柱の列。**明るい水面に対して、いちばん濃い縦の線。**
     * 手前ほど大きく、奥へ小さく並べると、平野の広さが出る。
     * 列なので、中央の1本が隠れても惜しくない。
     */
    `<g fill="#5a5348">` +
    [
      [30, 200, 74],
      [124, 176, 54],
      [190, 160, 40],
      [238, 148, 30],
      [272, 140, 22],
    ]
      .map(([x, base, h]) => {
        const w = r1(h * 0.055 + 1.6);
        return (
          `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}"/>` +
          `<rect x="${r1(x - h * 0.11)}" y="${r1(base - h)}" width="${r1(h * 0.22)}" height="${r1(h * 0.035 + 1)}"/>` +
          `<rect x="${r1(x - h * 0.085)}" y="${r1(base - h * 0.86)}" width="${r1(h * 0.17)}" height="${r1(h * 0.03 + 0.8)}"/>`
        );
      })
      .join("") +
    `</g>` +
    `<g stroke="#5a5348" stroke-width="1.1" opacity=".85" fill="none">` +
    `<path d="M30,126q47,3 94,-4q33,-2 66,-10q24,-6 48,-6q17,-1 34,-2"/>` +
    `<path d="M30,131q47,3 94,-3q33,-2 66,-9q24,-5 48,-5q17,-1 34,-2"/></g>` +
    /*
     * 手前(y>170 は中央でも隠れない)。
     * 田んぼを田んぼにしているのは、そこで人が水を見に来ていること。
     */
    // 用水路と、板の水門
    `<rect x="0" y="186" width="400" height="7" fill="#7fa8c0"/>` +
    `<rect x="0" y="186" width="400" height="2" fill="#5f8fa8"/>` +
    `<g fill="#6b5330"><rect x="286" y="180" width="3.4" height="18"/><rect x="316" y="180" width="3.4" height="18"/>` +
    `<rect x="286" y="180" width="34" height="4"/></g>` +
    `<rect x="292" y="186" width="22" height="8" fill="#8a6a3c"/>` +
    // 田を見に来た人。麦わら帽と長靴、腰をかがめている。
    `<ellipse cx="150" cy="205" rx="9" ry="2.6" fill="#000" opacity=".14"/>` +
    `<path d="M143,204q7,-3 14,0l-2,-13q-5,-2.6 -10,0z" fill="#37536b"/>` +
    `<circle cx="150" cy="188" r="4.6" fill="#8a5a34"/>` +
    `<path d="M139,187h22l-11,-6z" fill="#d8b46a"/>` +
    `<rect x="138.6" y="185.6" width="22.8" height="2.4" rx="1.2" fill="#c9a05c"/>` +
    `<g fill="#2a3a4c"><rect x="145.6" y="203" width="4" height="5"/><rect x="151" y="203" width="4" height="5"/></g>` +
    `<path d="M157,194l9,-5" stroke="#37536b" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
    // アオサギ。白い鳥だと明るい水に沈むので、灰青の鷺にする。
    // 首は**太い棒にしない**(配管に見えた)。細く、S字に曲げる。
    `<g fill="#7f93a8"><ellipse cx="248" cy="196" rx="9" ry="4"/></g>` +
    `<path d="M244.6,193q-3.6,-6 -0.6,-10q2.6,-3.4 -1,-6.6" stroke="#7f93a8" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="240.6" cy="175" rx="3.4" ry="2.2" fill="#7f93a8"/>` +
    `<path d="M240.6,171.4q2.6,0.4 3,2.2" stroke="#3a4453" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
    `<path d="M237.6,174.6l-6,1.4l5,1.6z" fill="#e8b23c"/>` +
    `<g stroke="#4a4436" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M246,200v6M251,200v6"/></g>` +
    `<g stroke="#cfe4f0" stroke-width="1.6" opacity=".8" fill="none"><path d="M236,207h26M240,203h20"/></g>` +
    // 畦に置いた苗箱と、刈った草
    `<g fill="#4f8f42"><rect x="60" y="196" width="16" height="5" rx="1"/><rect x="60" y="191" width="16" height="5" rx="1"/>` +
    `<rect x="79" y="196" width="16" height="5" rx="1"/></g>` +
    `<g stroke="#8a9a52" stroke-width="1.8" opacity=".9" fill="none" stroke-linecap="round">` +
    `<path d="M18,208v-7M24,209v-8M30,207v-6M348,208v-7M356,209v-9M364,207v-6"/></g>` +
    // 畦に立てかけた自転車。田を見に来た人の足。
    `<g stroke="#3a4453" stroke-width="1.8" fill="none"><circle cx="96" cy="202" r="6"/><circle cx="116" cy="202" r="6"/>` +
    `<path d="M96,202l7,-9h9l4,9M103,193l-2,-4h6M116,202l-4,-9"/></g>` +
    `<path d="M99,189h7" stroke="#3a4453" stroke-width="2.2" fill="none" stroke-linecap="round"/>` +
    // 水面に落ちる電柱の影。明るい水に縦の濃い線を落とすと、水面だと分かる。
    `<g fill="#7f93a8" opacity=".35"><rect x="28.4" y="200" width="3.2" height="10"/>` +
    `<rect x="122.8" y="176" width="2.4" height="8"/><rect x="189" y="160" width="2" height="6"/></g>` +
    // 遠くの農家と屋敷林(この盤面の `villagehouse` と役割が重ならないよう、小さく地平に)
    `<g fill="#2f5f3f"><ellipse cx="330" cy="110" rx="13" ry="9"/><ellipse cx="348" cy="112" rx="10" ry="7"/>` +
    `<ellipse cx="316" cy="113" rx="8" ry="6"/></g>` +
    `<rect x="326" y="110" width="20" height="8" fill="#e8e2d2"/>` +
    `<path d="M323,110h26l-13,-6z" fill="#5a5348"/>`,

  /** 川の渡し。堤と広い川面、対岸は低い。 */
  riverport:
    sky() +
    clouds(70, 28) +
    band(108, 12, "#8fae7a") +
    band(120, 90, "#5f9fc4") +
    ripples(152, "#bfe8f4") +
    `<rect x="0" y="104" width="400" height="6" fill="#a89a72"/>` +
    `<path d="M150,166h108l-14,18h-80z" fill="#5a4630"/>` +
    `<rect x="196" y="140" width="4" height="26" fill="#3b2a1c"/>` +
    `<path d="M200,142h28l-28,14z" fill="#f6efe2"/>` +
    house(56, 108, 46, 22) +
    house(330, 110, 40, 20),

  /** 社叢。杉の暗い列と、その奥の朱い門。 */
  /**
   * 社叢(鹿島神宮の杜)。
   *
   * **大鳥居を左3分の1へ移した。** 元は x=200 の中央で、
   * 隠れる帯にすっぽり入って一度も見えていなかった。鳥居はこの絵の顔なので、
   * 隠れると何の場所か分からなくなる。
   *
   * 中央に通すのは**参道と、並ぶ石灯籠** — どちらも繰り返しなので惜しくない。
   * 杜の中なので光は薄暗く、参道だけが明るい。
   */
  shrineforest:
    sky("#7fb4d8", "#cfe4f0", 122) +
    hills(120, "#5f7f4f", 3) +
    ground(120, "#4a6b3f") +
    // 杜の奥。暗い緑を重ねて、木の壁にする。
    `<path d="M0,120c60,-12 120,6 200,-2c80,-8 140,4 200,10v82H0z" fill="#3f5f3a"/>` +
    `<g fill="#355232"><ellipse cx="60" cy="132" rx="46" ry="16"/><ellipse cx="200" cy="128" rx="60" ry="14"/>` +
    `<ellipse cx="340" cy="134" rx="50" ry="16"/></g>` +
    // 木洩れ日。暗い杜に明るい形を落とすと、木の下だと分かる。
    `<g fill="#9fc47a" opacity=".3"><ellipse cx="126" cy="186" rx="26" ry="7"/><ellipse cx="262" cy="196" rx="30" ry="8"/>` +
    `<ellipse cx="70" cy="200" rx="20" ry="6"/></g>` +
    // 古木。太い杉を左右に立てる。
    cedar(30, 204, 104) +
    cedar(72, 208, 84) +
    cedar(108, 200, 70) +
    cedar(300, 200, 76) +
    cedar(336, 206, 96) +
    cedar(374, 202, 80) +
    `<g fill="#5a4630"><rect x="26" y="180" width="9" height="24"/><rect x="332" y="184" width="9" height="22"/></g>` +
    // 幹に巻いた注連縄(御神木)
    `<rect x="24" y="176" width="13" height="4" fill="#e8e2d2"/>` +
    `<g fill="#e8e2d2"><path d="M26,180l-1.6,6h3zM31,180l-1.6,6h3zM36,180l-1.6,6h3z"/></g>` +
    /*
     * 参道。**中央を奥へ通す繰り返し。**両脇に石灯籠を並べる。
     */
    `<path d="M156,120h88l52,90H104z" fill="#a89e88"/>` +
    `<path d="M162,120h76l44,90H118z" fill="#c2b9a4"/>` +
    `<g stroke="#a89e88" stroke-width="1.6" opacity=".8" fill="none">` +
    `<path d="M158,138h84M152,156h96M144,176h112M134,196h132"/></g>` +
    `<g fill="#8a8272">` +
    [
      [140, 196, 1],
      [156, 172, 0.82],
      [168, 154, 0.68],
      [178, 140, 0.56],
      [260, 196, 1],
      [244, 172, 0.82],
      [232, 154, 0.68],
      [222, 140, 0.56],
    ]
      .map(([x, base, s]) => {
        const w = r1(14 * s);
        const h = r1(20 * s);
        return (
          `<rect x="${r1(x - w * 0.22)}" y="${r1(base - h)}" width="${r1(w * 0.44)}" height="${h}"/>` +
          `<path d="M${r1(x - w / 2)},${r1(base - h)}h${w}l${r1(-w / 2)},${r1(-h * 0.42)}z"/>` +
          `<rect x="${r1(x - w * 0.34)}" y="${r1(base - h * 1.62)}" width="${r1(w * 0.68)}" height="${r1(h * 0.2)}"/>`
        );
      })
      .join("") +
    `</g>` +
    /*
     * 大鳥居。**左3分の1(x=76)。**参道の入口に立たせる。
     */
    torii(76, 196, 74) +
    `<g fill="#a82c40"><rect x="46" y="196" width="7" height="4"/><rect x="99" y="196" width="7" height="4"/></g>` +
    // 手水舎
    `<g fill="#5a4630"><rect x="330" y="168" width="4" height="26"/><rect x="374" y="168" width="4" height="26"/></g>` +
    `<path d="M324,168h60l-30,-14z" fill="#3a352c"/>` +
    `<rect x="336" y="182" width="36" height="10" fill="#8a8272"/>` +
    `<rect x="339" y="184" width="30" height="5" fill="#9fc4d8"/>` +
    // 参る人。杜の暗さに沈まないよう明るい色を着せる。
    `<ellipse cx="200" cy="198" rx="8" ry="2.4" fill="#000" opacity=".16"/>` +
    `<path d="M193,197q7,-3.4 14,0l-2,-14q-5,-2.6 -10,0z" fill="#f2ede0"/>` +
    `<circle cx="200" cy="178" r="5" fill="#8a5a34"/>` +
    `<g fill="#3a3446"><rect x="195.6" y="197" width="3.6" height="4.4"/><rect x="200.8" y="197" width="3.6" height="4.4"/></g>` +
    `<ellipse cx="222" cy="202" rx="7" ry="2.2" fill="#000" opacity=".14"/>` +
    `<path d="M216,201q6,-3 12,0l-1.8,-12q-4.4,-2.2 -8.6,0z" fill="#c2603c"/>` +
    `<circle cx="222" cy="185" r="4.4" fill="#8a5a34"/>` +
    `<g fill="#3a3446"><rect x="218" y="201" width="3.2" height="4"/><rect x="223" y="201" width="3.2" height="4"/></g>` +
    // 鹿島の鹿。**枝角は独立した図形で置く**(輪郭に塗り込むと四つ足の塊になる)。
    `<g fill="#a8825c"><rect x="118" y="192" width="2" height="9"/><rect x="122" y="192" width="2" height="9"/>` +
    `<rect x="132" y="192" width="2" height="9"/><rect x="136" y="192" width="2" height="9"/>` +
    `<ellipse cx="128" cy="188" rx="10" ry="5"/></g>` +
    `<path d="M120,186L116,177L120,176L124,185z" fill="#a8825c"/>` +
    `<ellipse cx="115.6" cy="174.6" rx="3.6" ry="2.2" fill="#a8825c"/>` +
    `<g fill="#6b5330"><path d="M114,172.4L111,166l1.8,-0.4l2.6,6z"/><path d="M112.4,168.6l-4,-1.2l0.4,-1.6l4,1.2z"/>` +
    `<path d="M118,172.4L117,165.6l1.8,-0.2l0.8,6.6z"/></g>` +
    `<g fill="#e8e2d2"><circle cx="126" cy="186" r="1.3"/><circle cx="132" cy="188" r="1.1"/><circle cx="129" cy="190.6" r="1"/></g>` +
    // 落ち葉
    `<g fill="#a8763c" opacity=".7"><ellipse cx="60" cy="206" rx="3" ry="1.4"/><ellipse cx="74" cy="203" rx="2.6" ry="1.3"/>` +
    `<ellipse cx="308" cy="204" rx="3" ry="1.4"/><ellipse cx="322" cy="207" rx="2.6" ry="1.3"/></g>`,

  /**
   * 谷。両側から迫る斜面と、そのあいだの細い流れ。
   * 空の下帯を淡い青のままにし、谷底を高く取ること。
   * ここを砂色にすると、谷ではなく砂丘に見える(一度そうなった)。
   */
  /**
   * 谷あいの田。2都市。
   *
   * `ricefield`(平らに広がる水田)との違いは**斜面と段**。
   * 平地では畦がまっすぐ横に通るが、谷では等高線に沿って弓なりに曲がり、
   * 一段ずつ高さが変わる。**その曲がりと段差が、この絵の主題。**
   *
   * 隠れる帯に来るのは棚田の段(繰り返し)。
   * 読ませたいもの(小屋・滝・人)は左右へ寄せる。
   */
  valley2:
    sky("#8fc4e8", "#cfe4f0", 128) +
    `<g fill="#f6efe2" opacity=".45"><ellipse cx="200" cy="24" rx="60" ry="4"/></g>` +
    // 谷を挟む両側の斜面
    `<path d="M0,44L136,210H0z" fill="#5f7f4f"/>` +
    `<path d="M400,36L262,210h138z" fill="#4a6b3f"/>` +
    `<path d="M0,44L84,146L0,120z" fill="#547247" opacity=".8"/>` +
    `<path d="M400,36L322,142l78,-26z" fill="#41603a" opacity=".8"/>` +
    // 斜面の襞。**大きな緑の三角のままだと、ただの色面になる。**
    // 沢筋を数本、不規則な長さで彫る。
    `<g stroke="#456b3c" stroke-width="2.6" opacity=".7" fill="none" stroke-linecap="round">` +
    `<path d="M24,84l26,42M52,64l30,54M8,110l22,36M74,116l18,32"/></g>` +
    `<g stroke="#3a5632" stroke-width="2.6" opacity=".7" fill="none" stroke-linecap="round">` +
    `<path d="M376,74l-28,46M348,52l-30,58M392,110l-20,34M322,120l-14,28"/></g>` +
    // 斜面に散る植林の杉(小さく並べて、面に粒を与える)
    `<g fill="#2f5f3f">` +
    [
      [40, 118, 14],
      [62, 132, 12],
      [86, 150, 15],
      [22, 96, 11],
      [356, 116, 14],
      [334, 132, 12],
      [310, 150, 15],
      [378, 96, 11],
    ]
      .map(([x, base, h]) => `<path d="M${r1(x - h * 0.32)},${base}L${x},${r1(base - h)}L${r1(x + h * 0.32)},${base}z"/>`)
      .join("") +
    `</g>` +
    // 稜線に残る雑木
    `<g fill="#3f7540"><ellipse cx="112" cy="152" rx="16" ry="9"/><ellipse cx="288" cy="150" rx="15" ry="8"/>` +
    `<ellipse cx="58" cy="166" rx="13" ry="7"/><ellipse cx="342" cy="168" rx="14" ry="7"/></g>` +
    hills(128, "#6b8f5a", 3) +
    ground(128, "#7f8f5c") +
    /*
     * 棚田。等高線に沿って弓なりに曲げ、下ほど段を広く取る。
     * **横一直線に引くと平地の田になってしまう。**
     */
    `<g fill="#a8cbdc">` +
    [
      [132, 34],
      [145, 52],
      [160, 72],
      [178, 94],
      [199, 118],
      [224, 144],
    ]
      .map(([y, half]) => `<path d="M${200 - half},${y}q${half},9 ${half * 2},0v-9q-${half},-8 -${half * 2},0z"/>`)
      .join("") +
    `</g>` +
    `<g fill="#9a8a5c">` +
    [
      [132, 34],
      [145, 52],
      [160, 72],
      [178, 94],
      [199, 118],
      [224, 144],
    ]
      .map(([y, half]) => `<path d="M${200 - half},${y}q${half},9 ${half * 2},0v4q-${half},-9 -${half * 2},0z"/>`)
      .join("") +
    `</g>` +
    // 段の小口(石積み)。段差があることは、この影で分かる。
    `<g fill="#7f7350" opacity=".8">` +
    [
      [141, 52],
      [156, 72],
      [174, 94],
      [195, 118],
    ]
      .map(([y, half]) => `<path d="M${200 - half},${y}q${half},9 ${half * 2},0v3q-${half},-9 -${half * 2},0z"/>`)
      .join("") +
    `</g>` +
    `<g stroke="#5f9f4f" stroke-width="2" fill="none" stroke-linecap="round"><path d="` +
    [
      [131, 26, 5],
      [144, 40, 6],
      [160, 54, 7],
      [180, 70, 8],
    ]
      .map(([y, half, n]) =>
        Array.from({ length: n }, (_, i) => {
          const x = r1(200 - half + (i * half * 2) / (n - 1));
          const dy = r1(y + Math.abs(x - 200) * -0.02);
          return `M${x},${dy}l-2.6,-5M${x},${dy}v-6M${x},${dy}l2.6,-5`;
        }).join(""),
      )
      .join("") +
    `"/></g>` +
    // 谷底の沢。斜面の裾で細く光る。
    `<path d="M172,210q14,-40 30,-58q-6,32 -8,58z" fill="#9fc4d8"/>` +
    `<g stroke="#dff0fa" stroke-width="1.6" opacity=".8" fill="none"><path d="M180,200q10,-14 16,-24M186,208q8,-12 12,-20"/></g>` +
    // 山の斜面から落ちる細い滝(左3分の1、見える側)
    `<path d="M76,96L88,96L86,140L74,140z" fill="#3f5c38"/>` +
    `<path d="M79,98q-2,20 -1,40h4q-1,-20 1,-40z" fill="#eaf8fb" opacity=".9"/>` +
    `<ellipse cx="81" cy="139" rx="7" ry="2.6" fill="#eaf8fb" opacity=".7"/>` +
    // 杉。谷の植林。
    cedar(46, 196, 70) +
    cedar(96, 186, 58) +
    cedar(330, 194, 62) +
    cedar(368, 202, 52) +
    cedar(300, 178, 46) +
    // 田の脇の小屋(右3分の1)
    `<rect x="316" y="158" width="34" height="18" fill="#a8926c"/>` +
    `<path d="M310,158h46l-23,-10z" fill="#5a5348"/>` +
    `<rect x="328" y="164" width="11" height="12" fill="#3b2a1c"/>` +
    // 段を上る畦道と、見回りの人
    `<path d="M120,210q30,-30 54,-52q22,-20 30,-34" stroke="#9a8a5c" stroke-width="4" fill="none" opacity=".9"/>` +
    `<ellipse cx="140" cy="196" rx="7" ry="2.2" fill="#000" opacity=".14"/>` +
    `<path d="M134,195q6,-3 12,0l-1.8,-12q-4.4,-2.2 -8.6,0z" fill="#37536b"/>` +
    `<circle cx="140" cy="179" r="4.4" fill="#8a5a34"/>` +
    `<path d="M131,178h18l-9,-5z" fill="#d8b46a"/>` +
    `<g fill="#2a3a4c"><rect x="136" y="195" width="3.2" height="4"/><rect x="141" y="195" width="3.2" height="4"/></g>` +
    // 斜面の下草
    `<g stroke="#6f9450" stroke-width="1.8" opacity=".85" fill="none" stroke-linecap="round">` +
    `<path d="M18,206v-8M26,208v-9M34,204v-7M366,206v-8M376,208v-10M386,204v-7"/></g>`,

  /** 海岸の町。低い崖の上に家が並び、下に浜。 */
  coasttown:
    sky() +
    clouds(310, 30, 0.9) +
    band(104, 106, "#2f6ea8") +
    ripples(140) +
    `<path d="M0,104h230l-14,34H0z" fill="#8fae7a"/>` +
    `<rect x="0" y="138" width="216" height="10" fill="#c9a877"/>` +
    house(48, 104, 44, 22) +
    house(112, 104, 36, 18) +
    house(172, 104, 40, 20) +
    `<path d="M0,178c40,-10 90,-10 130,0z" fill="#e8dfc8"/>`,

  /** 集落。低い家と生垣、屋敷林。関東平野の農家の姿。 */
  /**
   * 屋敷林(いぐね)に囲まれた農家。4都市。
   *
   * `ricefield`(平らな水田)`valley2`(斜面の段)と分けるため、ここは
   * **家と、それを囲う木の壁**を主役にする。関東平野の農家は、北西の風を防ぐため
   * 屋敷の北と西に杉や欅を列で植える。**その列が、この絵の背骨。**
   *
   * 母屋は**左3分の1(x=54〜150)**。隠れる帯に来るのは屋敷林の列と畑の畝で、
   * どちらも繰り返しなので隠れても失うものが少ない。
   */
  villagehouse:
    // 地面は y=122 から始まるので、空もそこまで塗り下ろす
    // (120 で切って、丘の谷間の2行・134px が透けた)。
    sky("#8fc4e8", "#dce8ee", 122) +
    clouds(300, 26, 1.1) +
    clouds(96, 30) +
    hills(122, "#9fb886", 4) +
    // 平地林。地平に点々と固まって残るのが関東平野の姿。
    `<g fill="#4d7a44"><ellipse cx="30" cy="115" rx="14" ry="8"/><ellipse cx="196" cy="116" rx="12" ry="7"/>` +
    `<ellipse cx="240" cy="114" rx="16" ry="9"/><ellipse cx="380" cy="116" rx="13" ry="7"/></g>` +
    ground(122, "#8f9f5f") +
    `<path d="M0,138c70,-8 130,6 200,0c70,-6 130,4 200,8v64H0z" fill="#7f9450"/>` +
    /*
     * 屋敷林。**中央を横切る繰り返し**なので、隠れる帯に来て構わない。
     * 高さを不揃いにし、手前ほど濃くする。
     */
    cedar(158, 160, 72) +
    cedar(184, 156, 62) +
    cedar(210, 162, 78) +
    cedar(238, 158, 66) +
    cedar(264, 164, 70) +
    cedar(292, 158, 58) +
    cedar(318, 162, 74) +
    cedar(346, 158, 62) +
    cedar(372, 164, 68) +
    `<g fill="#25503a"><ellipse cx="184" cy="160" rx="16" ry="5"/><ellipse cx="264" cy="166" rx="17" ry="5"/>` +
    `<ellipse cx="346" cy="162" rx="15" ry="4.6"/></g>` +
    /*
     * 母屋。**明るい草地に溶けないよう、壁を地面より2段落とす**
     * (白い壁のままだと、明るい緑の中で輪郭が消える)。
     */
    `<rect x="54" y="146" width="96" height="34" fill="#d8cdb4"/>` +
    `<rect x="54" y="146" width="22" height="34" fill="#c2b79c"/>` +
    `<path d="M44,146h116l-58,-30z" fill="#5a5348"/>` +
    `<path d="M44,146h116v5H44z" fill="#40392f"/>` +
    `<path d="M92,116l10,-8l10,8z" fill="#40392f"/>` +
    `<g fill="#3b2a1c"><rect x="70" y="158" width="16" height="22"/><rect x="94" y="158" width="16" height="22"/>` +
    `<rect x="118" y="158" width="16" height="22"/></g>` +
    `<g fill="#e8dfc8"><rect x="72" y="160" width="12" height="9"/><rect x="96" y="160" width="12" height="9"/>` +
    `<rect x="120" y="160" width="12" height="9"/></g>` +
    `<g stroke="#a89a80" stroke-width="1.2" opacity=".8" fill="none"><path d="M54,153h96M54,175h96"/></g>` +
    // 納屋
    `<rect x="158" y="164" width="42" height="18" fill="#a8926c"/>` +
    `<path d="M152,164h54l-27,-11z" fill="#5a5348"/>` +
    `<rect x="172" y="170" width="14" height="12" fill="#3b2a1c"/>` +
    // 生垣と門
    `<g fill="#3f7540"><rect x="20" y="174" width="30" height="10" rx="4"/><rect x="204" y="176" width="34" height="9" rx="4"/></g>` +
    `<g fill="#6b5330"><rect x="50" y="168" width="4" height="16"/><rect x="0" y="168" width="4" height="16"/>` +
    `<rect x="0" y="166" width="54" height="4"/></g>` +
    // 畑の畝。繰り返しなので中央でよい。
    `<rect x="0" y="182" width="400" height="6" fill="#5f8f4f"/>` +
    `<g fill="#8a7a52">` +
    Array.from({ length: 7 }, (_, i) => {
      const x = 12 + i * 56;
      return `<path d="M${x},210l6,-22h26l-6,22z"/>`;
    }).join("") +
    `</g>` +
    `<g fill="#4f8f42">` +
    Array.from({ length: 7 }, (_, i) => {
      const x = 12 + i * 56;
      return `<ellipse cx="${x + 16}" cy="194" rx="9" ry="3.4"/><ellipse cx="${x + 12}" cy="202" rx="8" ry="3"/>`;
    }).join("") +
    `</g>` +
    // 干した大根と、柿の木
    `<g fill="#6b5330"><rect x="248" y="168" width="3" height="22"/><rect x="292" y="168" width="3" height="22"/>` +
    `<rect x="246" y="166" width="49" height="3.4"/></g>` +
    `<g fill="#f2ede0">` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${252 + i * 5}" y="170" width="2.6" height="13" rx="1.3"/>`).join("") +
    `</g>` +
    roundTree(352, 190, 15, "#3f7540") +
    `<g fill="#e8823c"><circle cx="346" cy="170" r="2.4"/><circle cx="357" cy="174" r="2.2"/><circle cx="352" cy="164" r="2"/></g>` +
    // 庭先の人と、鶏
    `<ellipse cx="120" cy="200" rx="8" ry="2.4" fill="#000" opacity=".14"/>` +
    `<path d="M113,199q7,-3.4 14,0l-2,-14q-5,-2.6 -10,0z" fill="#4a6b86"/>` +
    `<circle cx="120" cy="181" r="5" fill="#8a5a34"/>` +
    `<path d="M110,180h20l-10,-5z" fill="#d8b46a"/>` +
    `<g fill="#3a3446"><rect x="115.6" y="199" width="3.6" height="4.4"/><rect x="120.8" y="199" width="3.6" height="4.4"/></g>` +
    `<g fill="#f2ede0"><ellipse cx="88" cy="200" rx="6" ry="4"/><circle cx="93" cy="195.6" r="2.6"/></g>` +
    `<path d="M95.4,193.6q2,-2.4 0.6,-3.6" stroke="#e8443f" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
    `<path d="M95.8,196.4l3,0.8l-2.6,1z" fill="#e8b23c"/>` +
    `<g fill="#c9a877"><rect x="86" y="203" width="1.4" height="3"/><rect x="90" y="203" width="1.4" height="3"/></g>` +
    dryingRack(38, 178, 56),
};

/**
 * 水辺6種(`bg-coast.mjs`)を重ねたものが最終形。
 *
 * 茨城は13種のうち6種が水辺で、そのまま描くとどれも「空・水・岸」になる。
 * 描き分けは1人がまとめて持つ必要があったため、そこだけ別ファイルにして
 * 並行に作った(インドの `bg-rich.mjs` と同じ形)。
 */
export const IBARAKI_BG = { ...IBARAKI_BASE_BG, ...IBARAKI_COAST_BG };

// ---------------------------------------------------------------------------
// シンボル(13種)。24×24。鍵は cities.mjs の `mark` と対応。
// ---------------------------------------------------------------------------

export const IBARAKI_MARKS = {
  /** 梅。水戸。五弁で、中心に蕊を点で置く。 */
  plum:
    '<g fill="#c4384f">' +
    Array.from({ length: 5 }, (_, i) => {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      return `<circle cx="${r1(12 + Math.cos(a) * 5.6)}" cy="${r1(12 + Math.sin(a) * 5.6)}" r="4.2"/>`;
    }).join("") +
    '</g><circle cx="12" cy="12" r="3" fill="#f6efe2"/>' +
    '<g fill="#f5b31c"><circle cx="12" cy="9.4" r="1"/><circle cx="14.4" cy="12.8" r="1"/><circle cx="9.6" cy="12.8" r="1"/></g>',

  /** 窯。笠間。段になった登り窯と火。 */
  craft:
    '<path d="M2,20L16,7h4v13z" fill="#8a7250"/>' +
    '<g fill="#5a4630"><rect x="4.4" y="15.6" width="4.4" height="4.4"/><rect x="10.4" y="12.4" width="4.4" height="4.4"/></g>' +
    '<g fill="#e8443f"><rect x="5.6" y="17" width="2" height="3"/><rect x="11.6" y="13.8" width="2" height="3"/></g>' +
    '<path d="M20.6,7c1.6,-3 -1,-4.2 0.4,-6.6" stroke="#8a8272" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
    '<rect x="1" y="20" width="22" height="2.6" fill="#4a4436"/>',

  /** 鳥居。大洗・鹿島。 */
  faith:
    '<path d="M2.6,6.6q9.4,-2 18.8,0v3.4q-9.4,-1.6 -18.8,0z" fill="#c4384f"/>' +
    '<rect x="4.4" y="11" width="15.2" height="2.6" fill="#c4384f"/>' +
    '<rect x="5.4" y="6.6" width="3" height="15.4" fill="#c4384f"/>' +
    '<rect x="15.6" y="6.6" width="3" height="15.4" fill="#c4384f"/>' +
    '<rect x="1.6" y="22" width="20.8" height="1.6" fill="#3b2a1c"/>',

  /** 歯車。日立。 */
  steam:
    '<g fill="#6b6b74">' +
    Array.from(
      { length: 8 },
      (_, i) => `<rect x="10.6" y="0.8" width="2.8" height="5" transform="rotate(${r1((i * 360) / 8)} 12 12)"/>`,
    ).join("") +
    '</g><circle cx="12" cy="12" r="7.4" fill="#8a8272"/><circle cx="12" cy="12" r="3.2" fill="#f6efe2"/>',

  /** ロケット。つくば。 */
  science:
    '<path d="M12,1c3.4,3.6 4.8,8.2 4.8,12.6H7.2C7.2,9.2 8.6,4.6 12,1z" fill="#f6efe2"/>' +
    '<path d="M7.2,13.6L3.4,18.6h4.4zM16.8,13.6L20.6,18.6h-4.4z" fill="#e8443f"/>' +
    '<circle cx="12" cy="8.4" r="2.4" fill="#5b8fe8"/>' +
    '<path d="M9.6,18.6h4.8l-2.4,4.6z" fill="#f5b31c"/>',

  /** 帆引き船。かすみがうら・行方。四角い帆が横を向く。 */
  boat:
    '<rect x="6.4" y="3" width="1.8" height="13" fill="#3b2a1c"/>' +
    '<path d="M8.2,3.8h11.4v10.6H8.2z" fill="#f6efe2"/>' +
    '<g stroke="#c9a877" stroke-width="0.8"><path d="M11.8,3.8v10.6M15.4,3.8v10.6"/></g>' +
    '<path d="M2.6,16.6h18.8l-3,4.6H5.6z" fill="#5a4630"/>' +
    '<path d="M1,22.4h22" stroke="#4a8fb8" stroke-width="1.6"/>',

  /** 蓮。土浦・かすみがうら。 */
  flowerfield:
    '<ellipse cx="12" cy="18.6" rx="10" ry="3.6" fill="#3f8f4f"/>' +
    '<ellipse cx="12" cy="17.6" rx="6" ry="2.2" fill="#5aa85f"/>' +
    '<g fill="#e8a8bf">' +
    Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      return `<ellipse cx="${r1(12 + Math.cos(a) * 3.6)}" cy="${r1(9.6 + Math.sin(a) * 3.6)}" rx="2.6" ry="3.6" transform="rotate(${r1((i * 360) / 6)} ${r1(12 + Math.cos(a) * 3.6)} ${r1(9.6 + Math.sin(a) * 3.6)})"/>`;
    }).join("") +
    '</g><circle cx="12" cy="9.6" r="2.2" fill="#f5b31c"/>',

  /** 花火。土浦。競技として裁かれる菊型。 */
  festival:
    '<g stroke="#f5b31c" stroke-width="1.4" stroke-linecap="round">' +
    Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return `<path d="M${r1(12 + Math.cos(a) * 3)},${r1(11 + Math.sin(a) * 3)}L${r1(12 + Math.cos(a) * 9.6)},${r1(11 + Math.sin(a) * 9.6)}"/>`;
    }).join("") +
    '</g>' +
    '<g fill="#e8443f">' +
    Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return `<circle cx="${r1(12 + Math.cos(a) * 9.6)}" cy="${r1(11 + Math.sin(a) * 9.6)}" r="1.5"/>`;
    }).join("") +
    '</g><circle cx="12" cy="11" r="2.4" fill="#f6efe2"/>',

  /** 城。水戸・古河。低い櫓と石垣。 */
  castle:
    '<path d="M2,22h20l-2.6,-6H4.6z" fill="#8a8272"/>' +
    '<rect x="6.4" y="8.4" width="11.2" height="7.6" fill="#f6efe2"/>' +
    '<path d="M4.4,8.4h15.2l-2.6,-3.4H7z" fill="#4a4436"/>' +
    '<path d="M7.4,5h9.2l-2,-2.6h-5.2z" fill="#4a4436"/>' +
    '<rect x="10.6" y="11.4" width="2.8" height="4.6" fill="#3b2a1c"/>',

  /** 干し芋の棚。ひたちなか一帯。 */
  harvest:
    '<rect x="2.6" y="4" width="2" height="17" fill="#6b5330"/>' +
    '<rect x="19.4" y="4" width="2" height="17" fill="#6b5330"/>' +
    '<g fill="#d8a24a"><rect x="4.6" y="6" width="14.8" height="3.4"/><rect x="4.6" y="11.4" width="14.8" height="3.4"/>' +
    '<rect x="4.6" y="16.8" width="14.8" height="3.4"/></g>' +
    '<g fill="#a8763a"><rect x="4.6" y="9.4" width="14.8" height="1"/><rect x="4.6" y="14.8" width="14.8" height="1"/>' +
    '<rect x="4.6" y="20.2" width="14.8" height="1"/></g>',

  /** 筑波山。二峰。県南のしるし。 */
  scenery:
    '<path d="M1,21L8.4,7.6L14,21z" fill="#7f8fa8"/>' +
    '<path d="M9.4,21L16.4,5.6L23,21z" fill="#6b7f98"/>' +
    '<path d="M14.2,10.4L16.4,5.6L18.7,10.4L17.2,9.4L16.4,8.2L15.6,9.4z" fill="#f6efe2"/>' +
    '<rect x="1" y="21" width="22" height="1.8" fill="#4a6b3f"/>',

  /** 筆と紬。結城・笠間の手仕事。 */
  brush:
    '<path d="M15.6,2.4l6,6L11,19l-6,-6z" fill="#c9a877"/>' +
    '<path d="M15.6,2.4l6,6l1.4,-1.4a4.2,4.2 0 0 0 -6,-6z" fill="#8a7250"/>' +
    '<path d="M5,13l-3.4,8.4L10,18z" fill="#3b2a1c"/>' +
    '<g stroke="#f6efe2" stroke-width="0.9" opacity=".8"><path d="M9.4,8.6l6,6M12.4,5.6l6,6"/></g>',

  /** 予科練の飛行機。阿見。 */
  airplane:
    '<path d="M12,2c1.4,0 2.4,1.6 2.4,4.4v6.2l7.6,4.6v2.4l-7.6,-2.2v3.4l2.4,1.8v1.4L12,22.6L7.2,24v-1.4l2.4,-1.8v-3.4L2,19.6v-2.4l7.6,-4.6V6.4C9.6,3.6 10.6,2 12,2z" fill="#8a8272"/>' +
    '<circle cx="12" cy="8.4" r="1.8" fill="#5b8fe8"/>',
};
