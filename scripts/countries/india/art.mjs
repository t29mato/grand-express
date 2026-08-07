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
  /** 首都・行政都市(広い並木道と赤砂岩の建物)。 */
  capital:
    sky("#9ccbe8", "#cfe4f0", 132) +
    sun(322, 32, 15) +
    clouds(96, 30) +
    ground(140, "#c9b98c") +
    `<rect x="0" y="132" width="400" height="12" fill="#8a9a52"/>` +
    // 赤砂岩の官庁舎とドーム
    `<rect x="120" y="76" width="160" height="60" fill="#c2603c"/>` +
    `<path d="M170,76h60v-8a30,30 0 0 0 -60,0z" fill="#d8734a"/>` +
    `<circle cx="200" cy="60" r="26" fill="#e0dbcd"/><rect x="196" y="26" width="8" height="12" fill="#f5b31c"/>` +
    `<g fill="#8f4429"><rect x="132" y="94" width="12" height="42"/><rect x="160" y="94" width="12" height="42"/><rect x="228" y="94" width="12" height="42"/><rect x="256" y="94" width="12" height="42"/></g>` +
    // 広い車道
    `<rect x="0" y="168" width="400" height="42" fill="#6f6a5e"/>` +
    `<g stroke="#f6efe2" stroke-width="3" stroke-dasharray="18 16" opacity=".8"><path d="M0,189h400"/></g>`,

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

  /** 砂漠の城塞都市。 */
  desertfort:
    sky("#8fb8d8", "#e2d0a8", 136) +
    sun(80, 34, 17, "#f5d06a") +
    ground(136, "#dcc182") +
    `<path d="M0,150c60,-16 120,-6 180,-16c60,-10 140,-4 220,8v68H0z" fill="#cfae6e"/>` +
    // 丘の上の城砦
    `<g fill="#c98a4a"><rect x="120" y="70" width="170" height="66"/></g>` +
    `<g fill="#b0733c"><rect x="120" y="62" width="16" height="10"/><rect x="152" y="62" width="16" height="10"/><rect x="184" y="62" width="16" height="10"/><rect x="216" y="62" width="16" height="10"/><rect x="248" y="62" width="16" height="10"/><rect x="274" y="62" width="16" height="10"/></g>` +
    `<g fill="#8a5a2c"><rect x="146" y="96" width="14" height="40"/><rect x="196" y="96" width="14" height="40"/><rect x="246" y="96" width="14" height="40"/></g>` +
    // ラクダの影
    `<path d="M320,178c4,-10 10,-10 12,-2c2,-8 8,-8 10,2l3,16h-5l-2,-10h-14l-2,10h-5z" fill="#7a5a34" opacity=".8"/>`,

  /** 南インドの寺院都市(彩色されたゴープラム)。 */
  gopuram:
    sky("#8fc4e8", "#d4ead8", 150) +
    clouds(310, 28) +
    ground(150, "#9ab45c") +
    // 階段状の塔門
    `<g fill="#e0dbcd"><path d="M150,150v-16h100v16z"/><path d="M158,134v-18h84v18z"/><path d="M166,116v-18h68v18z"/><path d="M174,98v-18h52v18z"/><path d="M182,80v-16h36v16z"/></g>` +
    `<g fill="#e8443f" opacity=".85"><rect x="152" y="128" width="96" height="4"/><rect x="160" y="110" width="80" height="4"/><rect x="168" y="92" width="64" height="4"/><rect x="176" y="76" width="48" height="4"/></g>` +
    `<path d="M182,64h36l-18,-14z" fill="#f5b31c"/>` +
    // 参道と池
    band(178, 32, "#4f8f9f") +
    ripples(190, "#bfe8f4") +
    palmRow(150, 3),

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

  /** 茶畑の丘(ダージリン・ニルギリ)。 */
  teagarden:
    sky("#a8cfe0", "#dceae0", 126) +
    clouds(120, 26, 1.2) +
    hills(120, "#4d7a44", 3) +
    ground(126, "#5f9450") +
    // 等高線状の茶畝
    `<g stroke="#3f6b3a" stroke-width="3" opacity=".7" fill="none"><path d="M0,142q100,-14 200,0t200,0"/><path d="M0,160q100,-14 200,0t200,0"/><path d="M0,178q100,-14 200,0t200,0"/><path d="M0,196q100,-14 200,0t200,0"/></g>` +
    // 摘み手のかご
    `<path d="M300,150c0,-8 5,-12 10,-12s10,4 10,12l-3,14h-14z" fill="#a8813c"/>`,

  /** ヒマラヤの山あいの町。 */
  himalaya:
    sky("#7fb0d8", "#cfe0ea", 132) +
    // 雪嶺
    `<path d="M0,132l60,-72l40,44l44,-56l52,66l50,-38l60,56l94,0v90H0z" fill="#e8eef2"/>` +
    `<path d="M60,60l22,26h-44zM144,48l28,36h-56zM306,82l24,22h-48z" fill="#f8fbfd"/>` +
    ground(150, "#6b7f5a") +
    // 経文旗
    bunting(110) +
    // 僧院
    `<g fill="#e0dbcd"><rect x="150" y="120" width="70" height="34"/></g>` +
    `<rect x="150" y="112" width="70" height="8" fill="#c2603c"/>` +
    `<g fill="#8a5a2c"><rect x="162" y="130" width="12" height="24"/><rect x="196" y="130" width="12" height="24"/></g>`,

  /** 大都会(高層ビルと高架)。 */
  megacity:
    sky("#7fa8c8", "#c9d8e0", 150) +
    sun(340, 36, 14, "#f2c05a") +
    // スカイライン
    `<g fill="#4a5566"><rect x="20" y="60" width="34" height="90"/><rect x="66" y="86" width="28" height="64"/><rect x="106" y="44" width="38" height="106"/><rect x="156" y="72" width="30" height="78"/><rect x="198" y="54" width="34" height="96"/><rect x="244" y="88" width="26" height="62"/><rect x="282" y="66" width="36" height="84"/><rect x="330" y="94" width="30" height="56"/></g>` +
    `<g fill="#f5d06a" opacity=".85"><rect x="28" y="72" width="6" height="8"/><rect x="42" y="72" width="6" height="8"/><rect x="114" y="58" width="6" height="8"/><rect x="128" y="58" width="6" height="8"/><rect x="206" y="68" width="6" height="8"/><rect x="220" y="68" width="6" height="8"/><rect x="290" y="80" width="6" height="8"/><rect x="304" y="80" width="6" height="8"/></g>` +
    ground(150, "#6f6a5e") +
    // 高架と列車
    `<rect x="0" y="156" width="400" height="8" fill="#8a8578"/>` +
    `<g fill="#3a4453"><rect x="30" y="164" width="10" height="20"/><rect x="130" y="164" width="10" height="20"/><rect x="230" y="164" width="10" height="20"/><rect x="330" y="164" width="10" height="20"/></g>` +
    `<g fill="#e8443f"><rect x="120" y="134" width="120" height="22" rx="6"/></g>` +
    `<g fill="#cfe4f0"><rect x="130" y="140" width="18" height="10"/><rect x="156" y="140" width="18" height="10"/><rect x="182" y="140" width="18" height="10"/><rect x="208" y="140" width="18" height="10"/></g>`,

  /** river island / 湿地の村(アッサム・ベンガル)。 */
  wetland:
    sky("#a8c8d8", "#d8e6e0", 130) +
    clouds(90, 32, 1.3) +
    hills(126, "#4d7a44", 3) +
    band(130, 80, "#5f8f7a") +
    ripples(146, "#bfe8d4") +
    // 水田の畦と苗
    `<g stroke="#3f6b3a" stroke-width="2" opacity=".8"><path d="M0,166h400M0,186h400"/></g>` +
    `<g fill="#8fc46a"><rect x="30" y="158" width="3" height="10"/><rect x="70" y="158" width="3" height="10"/><rect x="110" y="158" width="3" height="10"/><rect x="150" y="158" width="3" height="10"/><rect x="190" y="158" width="3" height="10"/><rect x="230" y="158" width="3" height="10"/><rect x="270" y="158" width="3" height="10"/><rect x="310" y="158" width="3" height="10"/><rect x="350" y="158" width="3" height="10"/></g>` +
    // 一角犀の影
    `<path d="M250,140c-10,0 -18,5 -20,12h-4l-2,12h6l2,-6h24l2,6h6l-2,-14c6,-4 6,-10 0,-10z" fill="#6b7f8a" opacity=".85"/>` +
    `<path d="M228,148l4,-8l4,8z" fill="#4f5f6a"/>`,

  /** 綿とダイヤモンドの商都(グジャラート)。 */
  bazaar:
    sky("#e0c48a", "#f0dcb0", 130) +
    sun(60, 36, 16, "#f0a83c") +
    ground(130, "#c9a877") +
    bunting(70) +
    // 露店の並び
    `<g><rect x="20" y="104" width="86" height="34" fill="#c2603c"/><path d="M14,104h98l-10,-16H24z" fill="#e8443f"/></g>` +
    `<g><rect x="130" y="104" width="86" height="34" fill="#3f7f6a"/><path d="M124,104h98l-10,-16h-78z" fill="#4f9f8a"/></g>` +
    `<g><rect x="240" y="104" width="86" height="34" fill="#8a5aa8"/><path d="M234,104h98l-10,-16h-78z" fill="#a878c8"/></g>` +
    // 積み上げた反物
    `<g fill="#f5b31c"><rect x="30" y="146" width="60" height="8"/><rect x="34" y="156" width="52" height="8"/><rect x="40" y="166" width="40" height="8"/></g>` +
    `<g fill="#e8447a"><rect x="250" y="146" width="60" height="8"/><rect x="254" y="156" width="52" height="8"/></g>`,

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

  /** 宮殿と湖(ラージャスターン)。 */
  lakepalace:
    sky("#f0b48a", "#f8d8b8", 120) +
    sun(310, 44, 22, "#f2803c") +
    hills(112, "#7a6a58", 3) +
    band(120, 90, "#3f7f9f") +
    ripples(140, "#bfe0f0") +
    // 湖上の白い宮殿
    `<g fill="#f2ede0"><rect x="140" y="72" width="120" height="48"/></g>` +
    `<g fill="#e0dbcd"><rect x="130" y="112" width="140" height="10"/></g>` +
    `<g fill="#f2ede0"><path d="M156,72a14,14 0 0 1 28,0zM186,72a14,14 0 0 1 28,0zM216,72a14,14 0 0 1 28,0z"/></g>` +
    `<circle cx="200" cy="46" r="14" fill="#f2ede0"/><rect x="197" y="22" width="6" height="10" fill="#f5b31c"/>` +
    // 反射
    `<g opacity=".35" fill="#f2ede0"><rect x="140" y="122" width="120" height="30"/></g>`,

  /** IT都市の庭園(ベンガルール)。 */
  citypark:
    sky("#9ccbe8", "#d8e8e0", 140) +
    clouds(300, 30) +
    hills(130, "#4d7a44", 4) +
    ground(140, "#5f9450") +
    // ガラスのオフィス
    `<g fill="#5f8fa8"><rect x="40" y="70" width="46" height="70" rx="4"/><rect x="300" y="84" width="52" height="56" rx="4"/></g>` +
    `<g fill="#bfe0f0" opacity=".7"><rect x="46" y="78" width="34" height="10"/><rect x="46" y="94" width="34" height="10"/><rect x="46" y="110" width="34" height="10"/><rect x="306" y="92" width="40" height="10"/><rect x="306" y="108" width="40" height="10"/></g>` +
    // 並木と池
    `<g><rect x="150" y="112" width="6" height="28" fill="#6b5330"/><circle cx="153" cy="106" r="20" fill="#2f7d3f"/></g>` +
    `<g><rect x="220" y="118" width="6" height="22" fill="#6b5330"/><circle cx="223" cy="112" r="16" fill="#3f8f4f"/></g>` +
    `<ellipse cx="200" cy="180" rx="90" ry="22" fill="#4f8f9f"/>` +
    ripples(176, "#bfe8f4"),
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
