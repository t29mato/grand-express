/**
 * 北アメリカ大陸の都市イラスト(まず5都市ぶんの見本)。
 *
 * `NORTHAMERICA_MARKS` は24×24の座標系に描くシンボル、`NORTHAMERICA_BG` は
 * 400×210の座標系に描く背景シーン(いずれもSVG断片の文字列)。韓国・フランスと
 * 同じく最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * この盤面は大陸横断鉄道の史実が軸なので、色は他盤面の家系(空 #8fc4e8〜#cfe4f0、
 * 地面の緑 #8fae63、砂 #d8c07f、岩 #8b8f98)に、**鉄路そのものの色**
 * (レール #8b8f98・枕木 #6b5330・金の犬釘 #f4c430)を足して揃える。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて見えない。**
 * 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる(過去に茨城・韓国・イタリアで起きた)。
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

/**
 * 空。**第3引数に「次に来る塗りの開始y」を渡すこと。**
 * 既定では y=124 までしか塗らないので、地面が y=128 から始まるシーンでは
 * あいだの4行が塗り残しになる。
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

/** 遠景のなだらかな丘。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 74},${y}c22,-30 52,-30 74,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 岩肌の山(雪を頂く)。ロッキー山脈・シエラマドレに使う。 */
function snowPeak(cx, base, h, fill = "#8b8f98") {
  const w = r1(h * 1.3);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx + w * 0.1)},${r1(base - h * 0.62)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx - w * 0.02)},${r1(base - h * 0.8)}L${r1(cx + w * 0.04)},${r1(base - h * 0.86)}z" fill="#f2f6f8"/>`
  );
}

/** 針葉樹。ロッキー・シエラの森。 */
function pine(x, base, h, fill = "#3f6b3a") {
  const w = r1(h * 0.6);
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - 8)}" width="4" height="8" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.32)}L${x},${r1(base - h * 0.62)}L${r1(x + w / 2)},${r1(base - h * 0.32)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.42)},${r1(base - h * 0.6)}L${x},${r1(base - h * 0.86)}L${r1(x + w * 0.42)},${r1(base - h * 0.6)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.3)},${r1(base - h * 0.84)}L${x},${r1(base - h)}L${r1(x + w * 0.3)},${r1(base - h * 0.84)}z" fill="${fill}"/>`
  );
}

/** ヤシ。カリブ海・中米の海岸に使う。 */
function palm(x, base, h, fill = "#2f7a44") {
  return (
    `<path d="M${r1(x - 2)},${base}q-4,${r1(-h * 0.4)} 1,${r1(-h)}q3,${r1(h * 0.5)} 1,${base}z" fill="#8a6a3f"/>` +
    `<g fill="${fill}"><ellipse cx="${x}" cy="${r1(base - h)}" rx="16" ry="6" transform="rotate(18 ${x} ${r1(base - h)})"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h)}" rx="16" ry="6" transform="rotate(-18 ${x} ${r1(base - h)})"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h)}" rx="15" ry="6" transform="rotate(70 ${x} ${r1(base - h)})"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h)}" rx="15" ry="6" transform="rotate(-70 ${x} ${r1(base - h)})"/></g>`
  );
}

/** ヤマヨモギ(セージブラシ)の茂み。西部の乾いた盆地。 */
function sagebrush(x, y, r = 6, fill = "#8a9a6a") {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity=".85"/>`;
}

/** レール2本+枕木。直線区間に使う。 */
function railStraight(x0, x1, y, tieGap = 16) {
  const parts = [
    `<path d="M${x0},${y}H${x1}" stroke="#8b8f98" stroke-width="3"/>`,
    `<path d="M${x0},${y + 5}H${x1}" stroke="#8b8f98" stroke-width="3"/>`,
  ];
  const ties = [];
  for (let x = x0 + 4; x < x1; x += tieGap) {
    ties.push(`<rect x="${r1(x)}" y="${y - 1}" width="6" height="9" fill="#6b5330"/>`);
  }
  return parts.join("") + `<g>${ties.join("")}</g>`;
}

/** 電信柱。 */
function telegraphPole(x, base, h) {
  return (
    `<rect x="${r1(x - 1.5)}" y="${r1(base - h)}" width="3" height="${h}" fill="#6b5330"/>` +
    `<rect x="${r1(x - 8)}" y="${r1(base - h + 4)}" width="16" height="3" fill="#5a4630"/>` +
    `<g stroke="#4a4a52" stroke-width="1" fill="none"><path d="M${r1(x - 7)},${r1(base - h + 5.5)}q40,-6 ${r1(x + 60)},0M${r1(x + 7)},${r1(base - h + 5.5)}q40,-6 ${r1(x + 60)},0"/></g>`
  );
}

/** 台形の乾いたビュート(平頂丘)。 */
function butte(cx, base, w, h, fill = "#9a7a52") {
  const top = r1(w * 0.55);
  return `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - top / 2)},${r1(base - h)}L${r1(cx + top / 2)},${r1(base - h)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>`;
}

/** 鉄橋の桟橋(トレッスル橋)。峡谷や谷を渡す。 */
function trestle(x0, x1, y, h, fill = "#6b5330") {
  const parts = [`<rect x="${x0}" y="${y}" width="${x1 - x0}" height="4" fill="#8b8f98"/>`];
  for (let x = x0 + 6; x < x1 - 4; x += 14) {
    parts.push(
      `<path d="M${x},${y + 4}L${r1(x + 7)},${r1(y + h)}M${r1(x + 14)},${y + 4}L${r1(x + 7)},${r1(y + h)}" stroke="${fill}" stroke-width="2"/>`,
    );
  }
  return parts.join("");
}

// ---------------------------------------------------------------------------
// 背景シーン(5種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const NORTHAMERICA_BASE_BG = {
  /**
   * 高地砂漠の盆地。プロモントリー・サミット専用。左右から迫る二本のレールが
   * 中央手前で出会い、金の犬釘が打たれた瞬間を示す。電信柱を左右に立てて
   * 「その場で全国へ打電された」という都市の豆知識を絵でも支える。
   */
  desertbasin:
    sky("#bde0f0", "#eef2e6", 128) +
    sun(344, 40, 20, "#f5d060") +
    clouds(80, 30, 0.9) +
    butte(40, 126, 70, 46, "#a08258") +
    butte(360, 126, 60, 38, "#9a7a52") +
    hills(126, "#c8b890", 3) +
    ground(128, "#d8c07f") +
    // セージブラシの茂み(左右、隠れ帯を避ける)
    sagebrush(30, 190, 7) + sagebrush(52, 196, 5) + sagebrush(70, 186, 6) +
    sagebrush(330, 192, 6) + sagebrush(352, 186, 7) + sagebrush(374, 196, 5) +
    // 電信柱(左右)
    telegraphPole(46, 178, 34) +
    telegraphPole(354, 178, 34) +
    // 左右から迫る二本のレール(中央手前で出会う)
    railStraight(6, 190, 182) +
    railStraight(210, 394, 182) +
    // 出会う地点。金の犬釘と小旗
    `<rect x="196" y="168" width="3" height="18" fill="#f4c430"/>` +
    `<path d="M170,176l14,-6v10z" fill="#e8443f"/>` +
    `<path d="M230,176l-14,-6v10z" fill="#2f6ea8"/>` +
    // 前景の低い岩
    `<g fill="#9a9484"><ellipse cx="16" cy="206" rx="20" ry="6"/><ellipse cx="384" cy="206" rx="18" ry="6"/></g>`,

  /**
   * 山あいの峠。クレイジェラチー専用。カナディアンロッキーの雪嶺、
   * 針葉樹の森、峠を縫うレールとトンネルの坑口。式典が地味だったという
   * 都市の話にあわせ、旗や群衆は置かない静かな構図にする。
   */
  mountainpass:
    sky("#8fc4e8", "#dbe6e0", 108) +
    clouds(70, 26, 1) +
    snowPeak(60, 106, 60, "#8b8f98") +
    snowPeak(340, 106, 66, "#7f8390") +
    hills(106, "#2f5f3f", 4) +
    ground(108, "#5f8a4a") +
    // 針葉樹の森(左右。地面より濃い色にして埋もれないようにする)
    pine(24, 190, 34, "#1f4a30") + pine(44, 196, 28, "#1f4a30") + pine(64, 188, 32, "#1f4a30") +
    pine(336, 194, 30, "#1f4a30") + pine(358, 188, 34, "#1f4a30") + pine(378, 198, 26, "#1f4a30") +
    // 峠を縫うレール(緩いカーブ)
    `<path d="M0,186Q200,158 400,186" stroke="#8b8f98" stroke-width="4" fill="none"/>` +
    `<g fill="#6b5330">` +
    Array.from({ length: 11 }, (_, i) => {
      const x = 10 + i * 38;
      const y = r1(186 - Math.sin((x / 400) * Math.PI) * 28);
      return `<rect x="${r1(x - 3)}" y="${r1(y - 1)}" width="6" height="8" transform="rotate(${r1((x - 200) * 0.05)} ${x} ${y})"/>`;
    }).join("") +
    `</g>` +
    // トンネルの坑口(右手前)
    `<rect x="300" y="176" width="34" height="24" rx="12" fill="#4a4a52"/>` +
    `<ellipse cx="317" cy="188" rx="10" ry="11" fill="#20242a"/>` +
    // 最後の犬釘の記念柱(左手前。ごく控えめに)
    `<rect x="60" y="182" width="4" height="20" fill="#8b8f98"/>`,

  /**
   * 銅峡谷(バランカス・デル・コブレ)。チワワ専用。地層の見える断崖を左右に、
   * トレッスル橋を渡る小さな列車を中景に置き、エル・チェペが橋とトンネルで
   * 峡谷を越えるという都市の話を絵にする。
   */
  canyon:
    sky("#a8d0e8", "#dcecda", 92) +
    clouds(320, 22, 1) +
    // 遠い断崖(地層)
    `<g><path d="M0,92L60,20L140,92z" fill="#a88860" opacity=".9"/>` +
    `<path d="M0,44L60,20L100,44z" fill="#c8a878" opacity=".9"/>` +
    `<path d="M260,92L340,14L400,92z" fill="#9a7a52" opacity=".9"/>` +
    `<path d="M300,40L340,14L380,40z" fill="#bc9a6c" opacity=".9"/></g>` +
    // 峡谷の奥壁(全幅。左右のV字断崖の背後を埋める塗り残し対策)
    band(92, 118, "#a8865c") +
    // 峡谷そのもの(手前へV字に迫る断崖。地層の縞)
    `<path d="M0,66L130,150L0,210z" fill="#8a6a48"/>` +
    `<path d="M0,90L110,150L0,150z" fill="#9c7c54" opacity=".8"/>` +
    `<path d="M0,120L90,150L0,150z" fill="#b08e60" opacity=".7"/>` +
    `<path d="M400,66L270,150L400,210z" fill="#7c5c3c"/>` +
    `<path d="M400,90L290,150L400,150z" fill="#8e6e48" opacity=".8"/>` +
    `<path d="M400,120L310,150L400,150z" fill="#a68454" opacity=".7"/>` +
    // 谷底の川(遠く小さく)
    `<path d="M150,206q50,-10 100,0" stroke="#3f8fc4" stroke-width="3" fill="none" opacity=".8"/>` +
    // トレッスル橋(峡谷を渡す)
    trestle(120, 280, 130, 26) +
    // 橋の上の小さな列車
    `<rect x="150" y="120" width="60" height="8" fill="#4a4a52"/>` +
    `<rect x="204" y="116" width="10" height="10" fill="#e8443f"/>` +
    // 遠景の松(崖の縁)
    pine(24, 66, 18) + pine(376, 66, 16),

  /**
   * 運河港。コロン専用。閘門と水位差、係留する船、背後にコンテナクレーン。
   * 大陸横断鉄道より14年早い地峡鉄道の終点という話に合わせ、
   * 熱帯の港を「いまも現役」の姿で描く。
   */
  canalport:
    sky("#8fd0d8", "#dff0e2", 120) +
    sun(40, 36, 18, "#f5d060") +
    clouds(300, 26, 1) +
    ground(120, "#2f7a44") +
    // 遠景の熱帯樹林
    `<g fill="#2f7a44" opacity=".8">` +
    Array.from({ length: 8 }, (_, i) => `<circle cx="${10 + i * 50}" cy="112" r="14"/>`).join("") +
    `</g>` +
    // 閘門の水路(水位差のある二段)
    `<rect x="0" y="140" width="400" height="70" fill="#2f6ea8"/>` +
    `<rect x="0" y="140" width="400" height="18" fill="#3f8fc4"/>` +
    // 閘門の扉(水圧を受けるV字に合わさる二枚の観音扉。中央寄りだが手前=y>152なので隠れ帯の影響は薄い)
    `<path d="M155,180L200,164L245,180L245,188L200,172L155,188z" fill="#9a9484"/>` +
    `<g stroke="#5a5f52" stroke-width="1.6" fill="none"><path d="M155,180L200,164L245,180M164,176L166,182M180,170L182,176M218,170L220,176M234,176L236,182"/></g>` +
    // 係留する貨物船(左)
    `<rect x="20" y="158" width="90" height="24" rx="3" fill="#e8443f"/>` +
    `<rect x="30" y="146" width="70" height="14" fill="#f6efe2"/>` +
    `<g fill="#5b8fe8"><rect x="36" y="149" width="10" height="8"/><rect x="52" y="149" width="10" height="8"/><rect x="68" y="149" width="10" height="8"/></g>` +
    // コンテナクレーン(右奥)
    `<rect x="330" y="90" width="4" height="70" fill="#e8443f"/>` +
    `<rect x="300" y="90" width="60" height="4" fill="#e8443f"/>` +
    `<line x1="356" y1="94" x2="356" y2="120" stroke="#e8443f" stroke-width="2"/>` +
    // ヤシ(手前左右)
    palm(24, 210, 46) + palm(374, 208, 42),

  /**
   * 旧植民地の港町。ハバナ専用。石造りの砦と色とりどりの建物、
   * 手前に砂糖を運んだ古い蒸気機関車を置き、鉄道と砂糖経済の話を絵にする。
   */
  oldport:
    sky("#8fc4e8", "#dfeee0", 96) +
    sun(360, 34, 16, "#f5d060") +
    clouds(90, 26, 1) +
    // 砦(モロ城ふう。左奥)
    `<rect x="10" y="60" width="46" height="40" fill="#c8b89a"/>` +
    `<g fill="#9a9484"><rect x="8" y="56" width="8" height="8"/><rect x="24" y="56" width="8" height="8"/><rect x="40" y="56" width="8" height="8"/></g>` +
    `<rect x="26" y="30" width="6" height="26" fill="#c8b89a"/>` +
    // 海
    `<rect x="0" y="96" width="400" height="44" fill="#1e6ea0"/>` +
    `<path d="M0,110q40,-6 80,0t80,0t80,0t80,0t80,0" stroke="#bfe8f4" stroke-width="1.6" fill="none" opacity=".7"/>` +
    // 埠頭・街並み(色とりどりのファサード)
    ground(140, "#c8bda0") +
    `<g><rect x="0" y="110" width="60" height="30" fill="#e8a94a"/><rect x="60" y="112" width="50" height="28" fill="#5b8fe8"/>` +
    `<rect x="290" y="112" width="50" height="28" fill="#e8443f"/><rect x="340" y="110" width="60" height="30" fill="#f4c430"/></g>` +
    `<g fill="#f6efe2" opacity=".85"><rect x="8" y="118" width="8" height="10"/><rect x="24" y="118" width="8" height="10"/><rect x="40" y="118" width="8" height="10"/>` +
    `<rect x="298" y="120" width="8" height="10"/><rect x="314" y="120" width="8" height="10"/><rect x="348" y="118" width="8" height="10"/><rect x="364" y="118" width="8" height="10"/></g>` +
    // ヤシ(手前)
    palm(30, 208, 44) + palm(370, 206, 40) +
    // 砂糖を運んだ古い蒸気機関車(手前中央下、y>170なので隠れ帯の外)
    `<rect x="160" y="176" width="60" height="20" fill="#4a4a52"/>` +
    `<rect x="212" y="168" width="18" height="18" fill="#4a4a52"/>` +
    `<circle cx="176" cy="200" r="8" fill="#2a2a30"/><circle cx="200" cy="200" r="8" fill="#2a2a30"/>` +
    `<rect x="150" y="182" width="10" height="10" fill="#6b5330"/>` +
    // 積み荷(サトウキビの束)
    `<g fill="#e0c07f"><rect x="234" y="180" width="18" height="16" rx="2"/><rect x="254" y="180" width="18" height="16" rx="2"/></g>`,
};

export const NORTHAMERICA_BG = { ...NORTHAMERICA_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(4種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// ---------------------------------------------------------------------------

export const NORTHAMERICA_MARKS = {
  /** 出会う二本のレールと金の犬釘。プロモントリー・サミット/クレイジェラチー。 */
  spike:
    `<rect x="2" y="17" width="8" height="2" fill="#8b8f98"/>` +
    `<rect x="14" y="17" width="8" height="2" fill="#8b8f98"/>` +
    `<g fill="#6b5330"><rect x="3" y="19" width="2" height="3"/><rect x="7" y="19" width="2" height="3"/><rect x="15" y="19" width="2" height="3"/><rect x="19" y="19" width="2" height="3"/></g>` +
    `<rect x="11" y="7" width="2" height="11" fill="#f4c430"/>` +
    `<path d="M6,3l10,6l-2,3l-10,-6z" fill="#4a4a52"/>`,

  /** トレッスル橋を渡る列車。チワワ(エル・チェペ)。 */
  canyonrail:
    `<path d="M2,20L8,10L2,10z" fill="#8b6a4a"/>` +
    `<path d="M22,20L16,10L22,10z" fill="#8b6a4a"/>` +
    `<g stroke="#6b5330" stroke-width="1.3"><path d="M7,19h10M8,15L14,19M14,15L8,19"/></g>` +
    `<rect x="4" y="8" width="16" height="3" fill="#4a4a52"/>`,

  /** 閘門の扉と船。コロン(パナマ地峡鉄道)。 */
  canallock:
    `<rect x="2" y="16" width="20" height="6" fill="#3f8fc4"/>` +
    `<path d="M2,16L11,12L11,16z" fill="#7a7468"/>` +
    `<path d="M22,16L13,12L13,16z" fill="#7a7468"/>` +
    `<rect x="6" y="6" width="12" height="5" rx="1" fill="#e8443f"/>` +
    `<rect x="9" y="2" width="2" height="5" fill="#4a4a52"/>`,

  /** 古い蒸気機関車。ハバナ(ラテンアメリカ最初の鉄道)。 */
  steamloco:
    `<rect x="3" y="12" width="14" height="6" fill="#4a4a52"/>` +
    `<rect x="16" y="8" width="4" height="10" fill="#4a4a52"/>` +
    `<circle cx="7" cy="19" r="3" fill="#2a2a30"/><circle cx="14" cy="19" r="3" fill="#2a2a30"/>` +
    `<rect x="1" y="14" width="3" height="3" fill="#6b5330"/>` +
    `<path d="M8,12q0,-6 -2,-8" stroke="#c8ccc4" stroke-width="1.6" fill="none" opacity=".8"/>`,
};
