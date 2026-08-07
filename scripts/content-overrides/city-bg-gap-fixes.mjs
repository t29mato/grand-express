/**
 * 都市の背景の塗り残しの修正(日本・ボリビア)。
 *
 * 背景SVGは「空の帯」と「地面の矩形」を別々に置くので、両者のyが噛み合っていないと
 * **横一文字の塗り残し**ができ、都市カードの地色がそのまま透ける。
 * 2026-08-08 にマゼンタの台紙へ焼いて画素を数えたところ、全80背景のうち**30種**で
 * 起きていた(合計63,266px)。ここはそのうち日本3種・ボリビア4種を直す。
 * インド11種・世界9種は `scripts/countries/<国>/art.mjs` の `sky()` 側で直した。
 *
 * この2国の背景は `legacy/grand-express.html` に書かれているが、legacy は凍結して
 * いるので直接は直せない。`applyContentOverrides` の `bg` で差し替える。
 *
 * **直した文字列を丸ごと持つのではなく、`(prev) => 直したもの` の形で持つ。**
 * 丸ごと写すと20KBになり、次に読む人が「どこを変えたのか」を追えなくなる。
 * 置換が1か所だけ当たることを毎回検査しているので、legacy 側がずれたら気づける。
 *
 * 確認: `node scripts/check-city-backgrounds.mjs`
 * 解説: docs/50-authoring/12-city-background-guide.md
 */

/**
 * ちょうど1か所だけ置き換える。0か所でも2か所以上でも落とす。
 * legacy が凍結されている前提に寄りかかっているので、前提が崩れたら
 * **静かに効かなくなるのではなく、抽出時に止まってほしい。**
 */
function replaceOnce(where, from, to) {
  return (svg) => {
    const hits = svg.split(from).length - 1;
    if (hits !== 1) {
      throw new Error(`${where}: 置き換える対象が ${hits} か所ありました(1か所であること)\n  探した文字列: ${from}`);
    }
    return svg.replace(from, to);
  };
}

export const JAPAN_CITY_BG = {
  /**
   * 空が y=110 までしか無く、地面は y=126 から。あいだの16pxが、木と木のすきまで
   * 透けていた(実測51px)。空を地面の高さまで塗り下ろす。
   */
  forest: replaceOnce(
    "japan/forest",
    '<rect x="0" y="0" width="400" height="110" fill="#8fc4e8"/>',
    '<rect x="0" y="0" width="400" height="126" fill="#8fc4e8"/>',
  ),

  /**
   * 空が y=116 まで、草地が y=120 から。あいだの4pxが山のすきまで透けていた
   * (実測40px)。草地のほうを 116 まで上げる(山の裾は元から草地が覆っている)。
   */
  volcano: replaceOnce(
    "japan/volcano",
    '<rect x="0" y="120" width="400" height="90" fill="#6f8f56"/>',
    '<rect x="0" y="116" width="400" height="94" fill="#6f8f56"/>',
  ),

  /**
   * **地面が1枚も無い。** 空は y=120 までで、その下はビルだけ。ビルとビルのあいだが
   * 下端まで素通しで、**8,664px**(最大幅230px)透けていた。全80背景で最悪。
   * 月のうしろ・ビルより手前に、夜の地面を1枚敷く。
   */
  metropolis: replaceOnce(
    "japan/metropolis",
    '<circle cx="324" cy="30" r="14" fill="#f6efe2"/>',
    '<circle cx="324" cy="30" r="14" fill="#f6efe2"/><rect x="0" y="120" width="400" height="90" fill="#242a44"/>',
  ),
};

export const BOLIVIA_CITY_BG = {
  /** 空 y=120 まで、地面 y=140 から。木立のすきまで透けていた(実測533px)。 */
  amazon: replaceOnce(
    "bolivia/amazon",
    '<rect x="0" y="0" width="400" height="120" fill="#8fd0ea"/>',
    '<rect x="0" y="0" width="400" height="140" fill="#8fd0ea"/>',
  ),

  /** 空 y=110 まで、地面 y=112 から。2pxの隙間(実測14px)。 */
  yungas: replaceOnce(
    "bolivia/yungas",
    '<rect x="0" y="0" width="400" height="110" fill="#a8d8f0"/>',
    '<rect x="0" y="0" width="400" height="112" fill="#a8d8f0"/>',
  ),

  /** 空 y=132 まで、地面 y=134 から。2pxの隙間(実測196px)。 */
  whitecity: replaceOnce(
    "bolivia/whitecity",
    '<rect x="0" y="0" width="400" height="132" fill="#79aee8"/>',
    '<rect x="0" y="0" width="400" height="134" fill="#79aee8"/>',
  ),

  /** 空 y=112 まで、地面 y=114 から。2pxの隙間(実測18px)。 */
  redcanyon: replaceOnce(
    "bolivia/redcanyon",
    '<rect x="0" y="0" width="400" height="112" fill="#f2c48a"/>',
    '<rect x="0" y="0" width="400" height="114" fill="#f2c48a"/>',
  ),
};
