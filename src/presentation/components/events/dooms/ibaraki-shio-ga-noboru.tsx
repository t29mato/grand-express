/**
 * 潮が川を遡る。大潮になると海水が内陸まで押し上がり、河口に近い田に入り込む。
 *
 * この土地は同じ潮でシジミを太らせてもいるので、**潮を呪い、潮に感謝する。**
 * 手前の畦にシジミ籠を置いて、恵みのほうも同じ画面に入れてある。
 *
 * ## 二度描き直している
 *
 * 一度目は緑の野に青い塊が乗っているだけで、**何が起きているのか読み取れなかった。**
 * 二度目は仕組みを描こうとして水門を大きく組んだが、脚の付いた**机に見えた**うえ、
 * 潮の舌を人より後ろに描いたせいで**人が塩水に塗り潰されていた。**
 *
 * 三度目のいまは、こう組んでいる。
 *
 * - 川は横に流し、田との間を**低い土手**で仕切る。塩の入口は土手に空いた**樋門**ひとつ
 * - **稲の色で被害を示す。**入口の周りは枯れ色、遠いところは青いまま。
 *   潮が止まっていても、どこまで入ったかが分かる
 * - **人は最後に描く。**動くものの下に人を置かない
 *
 * **動くものは1つだけ**——樋門から広がる潮の舌。止めると広がりきった形で残る。
 */
export function IbarakiShioGaNoboru() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 大潮の夕。 */}
      <rect width="400" height="210" fill="#2b2745" />
      <rect y="20" width="400" height="18" fill="#453d64" />
      <rect y="38" width="400" height="12" fill="#7d566e" />
      <rect y="50" width="400" height="10" fill="#c2795a" />
      <circle cx="58" cy="56" r="13" fill="#f2c887" />

      {/* 河口の先の海。潮はここから上がってくる。 */}
      <rect y="56" width="400" height="6" fill="#6b5f7a" />
      <rect y="60" width="400" height="5" fill="#2d3a30" />
      <g fill="#3b4a3c">
        <ellipse cx="30" cy="59" rx="15" ry="5" />
        <ellipse cx="118" cy="58" rx="13" ry="5" />
        <ellipse cx="228" cy="59" rx="16" ry="5" />
        <ellipse cx="330" cy="58" rx="14" ry="5" />
      </g>
      <g fill="#35314a">
        <rect x="160" y="52" width="16" height="10" />
        <path d="M158,52 L168,45 L178,52z" />
        <rect x="288" y="54" width="12" height="8" />
        <path d="M286,54 L294,48 L302,54z" />
      </g>

      {/* 河口の川。横に流す。 */}
      <path d="M0,64 L400,68 L400,100 L0,94z" fill="#3d5570" />
      <path d="M0,64 L400,68 L400,76 L0,72z" fill="#4a6b84" opacity="0.6" />
      <g fill="#b06a52" opacity="0.5">
        <ellipse cx="72" cy="84" rx="26" ry="3" />
        <ellipse cx="196" cy="88" rx="34" ry="3.5" />
        <ellipse cx="330" cy="86" rx="24" ry="3" />
      </g>
      {/* 舫い杭の列と、繋いである小舟。**遠景で人は描かない**——
          この大きさだと棒に丸が乗った形にしかならず、かえって読めなくなる。 */}
      <g fill="#4a3c2c">
        <rect x="250" y="72" width="4" height="20" />
        <rect x="276" y="73" width="4" height="20" />
        <rect x="302" y="74" width="4" height="20" />
        <rect x="328" y="75" width="4" height="20" />
      </g>
      <g stroke="#241f18" strokeWidth="2" strokeLinejoin="round">
        <path d="M244,86 L304,82 L308,92 L248,96z" fill="#5a4028" />
        <path d="M248,86 L300,82 L301,86 L250,90z" fill="#7a5c3c" stroke="none" />
      </g>

      {/* 川と田を仕切る土手。**切れ目をひとつ空ける。**
          はじめは水門を組んだが、脚と天板のせいで**机に見えた。**
          仕組みを説明する構造物より、**土手の切れ目**のほうが速く読める。 */}
      <path d="M0,94 L158,96 L158,111 L0,108z" fill="#4a4436" />
      <path d="M190,97 L400,100 L400,114 L190,111z" fill="#4a4436" />
      <path d="M0,94 L158,96 L158,99 L0,97z" fill="#5c5442" />
      <path d="M190,97 L400,100 L400,103 L190,100z" fill="#5c5442" />
      {/* 切れ目を通る水。静物。潮が引いても、ここは濡れたまま。 */}
      <path d="M158,94 L190,95 L192,113 L156,113z" fill="#45607a" />
      {/* 切れ目の両脇に残った杭と、外れて傾いた戸板。 */}
      <g stroke="#1f2833" strokeWidth="2" strokeLinejoin="round">
        <rect x="150" y="86" width="6" height="24" fill="#6b5238" />
        <rect x="190" y="87" width="6" height="24" fill="#6b5238" />
        <path d="M152,88 L194,82 L195,89 L153,95z" fill="#8a6f42" />
      </g>
      {/* 塩害の目印杭。災難の赤はここだけ。 */}
      <g stroke="#1f2833" strokeWidth="2" strokeLinejoin="round">
        <rect x="232" y="86" width="4" height="18" fill="#6b5c46" />
        <rect x="228" y="78" width="18" height="10" fill="#e05252" />
      </g>

      {/* 塩に弱い田。 */}
      <rect y="112" width="400" height="98" fill="#56616e" />
      <path d="M0,112 L400,118 L400,124 L0,118z" fill="#4d5866" />

      {/* 樋門から広がる潮。**ここだけが動く。**
          稲より先、人より先に描く。**動くものの上に立つものを置かない。**
          口の幅に合わせて上辺を樋門にぴたりと付け、縮んでも口から出て見えるようにする。 */}
      <g className="isgn-tongue" opacity="0.92">
        {/* 先を波形にする。なめらかな閉じた形にすると**レンズか泡に見えた。** */}
        <path
          d="M158,104 L192,104
             C226,120 258,134 274,156
             q-19,12 -38,4 q-19,12 -38,2 q-19,12 -38,0 q-19,11 -38,-3 q-18,9 -36,-11
             C78,140 104,122 146,113z"
          fill="#45607a"
          stroke="#7fa4bc"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 先端の泡。動く塊と一緒に動かすので同じ g に入れる。 */}
        <g fill="#c8dae6" opacity="0.55">
          <ellipse cx="252" cy="164" rx="12" ry="3" />
          <ellipse cx="196" cy="168" rx="15" ry="3" />
          <ellipse cx="132" cy="162" rx="12" ry="3" />
        </g>
      </g>

      {/* 稲。**樋門のまわりだけ枯れ色**にして、潮がどこまで入ったかを静物で示す。
          3本の扇にすると株に見える(2本だとチェック印の並びに見えた)。 */}
      <g stroke="#6f8a4a" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M18,128 l-5,-9 M18,128 l0,-10 M18,128 l5,-9" />
        <path d="M46,129 l-5,-9 M46,129 l0,-10 M46,129 l5,-9" />
        <path d="M74,130 l-5,-9 M74,130 l0,-10 M74,130 l5,-9" />
        <path d="M340,132 l-5,-9 M340,132 l0,-10 M340,132 l5,-9" />
        <path d="M368,133 l-5,-9 M368,133 l0,-10 M368,133 l5,-9" />
        <path d="M14,150 l-6,-11 M14,150 l0,-12 M14,150 l6,-11" />
        <path d="M48,152 l-6,-11 M48,152 l0,-12 M48,152 l6,-11" />
        <path d="M352,156 l-6,-11 M352,156 l0,-12 M352,156 l6,-11" />
        <path d="M10,178 l-7,-13 M10,178 l0,-14 M10,178 l7,-13" />
        <path d="M52,181 l-7,-13 M52,181 l0,-14 M52,181 l7,-13" />
        <path d="M366,186 l-7,-13 M366,186 l0,-14 M366,186 l7,-13" />
      </g>
      {/* 枯れた稲。塩に当たった株は片側へ折れて伏す。 */}
      <g stroke="#9a7a44" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M108,132 l-7,-6 M108,132 l-2,-9 M108,132 l5,-7" />
        <path d="M142,133 l-8,-4 M142,133 l-3,-8 M142,133 l4,-8" />
        <path d="M176,134 l-8,-4 M176,134 l-3,-8 M176,134 l4,-8" />
        <path d="M210,134 l-8,-5 M210,134 l-2,-9 M210,134 l5,-7" />
        <path d="M244,133 l-8,-4 M244,133 l-3,-8 M244,133 l5,-7" />
        <path d="M278,132 l-7,-6 M278,132 l-1,-9 M278,132 l6,-6" />
        <path d="M102,156 l-10,-5 M102,156 l-4,-11 M102,156 l6,-9" />
        <path d="M148,158 l-10,-5 M148,158 l-4,-11 M148,158 l7,-9" />
        <path d="M194,159 l-10,-6 M194,159 l-3,-11 M194,159 l6,-10" />
        <path d="M240,158 l-10,-4 M240,158 l-4,-11 M240,158 l7,-9" />
        <path d="M286,156 l-9,-7 M286,156 l-2,-11 M286,156 l8,-6" />
        <path d="M106,184 l-12,-6 M106,184 l-5,-13 M106,184 l8,-11" />
        <path d="M162,186 l-12,-6 M162,186 l-5,-13 M162,186 l8,-11" />
        <path d="M218,187 l-12,-7 M218,187 l-4,-13 M218,187 l9,-10" />
        <path d="M274,185 l-11,-8 M274,185 l-3,-13 M274,185 l10,-8" />
      </g>

      {/* 引いたあとに残る塩。静物。 */}
      <g fill="#d9dbe0" opacity="0.7">
        <ellipse cx="112" cy="136" rx="16" ry="3" />
        <ellipse cx="300" cy="160" rx="13" ry="2.5" />
        <ellipse cx="238" cy="192" rx="20" ry="3.5" />
      </g>

      {/* 手前の畦。 */}
      <path d="M0,170 L400,184 L400,210 L0,210z" fill="#4a4436" />
      <path d="M0,170 L400,184 L400,188 L0,174z" fill="#5c5442" />

      {/* シジミ籠と鋤簾。潮の恵みのほう。静物。 */}
      <g stroke="#241f18" strokeWidth="2.5" strokeLinejoin="round">
        {/* 鋤簾。柄だけだと棒に板が付いた形にしか見えないので、歯を描く。 */}
        <path d="M86,192 L116,150" stroke="#6b5238" strokeWidth="5" fill="none" />
        <path d="M108,154 L134,144 L137,152 L111,162z" fill="#8f939a" />
        <g stroke="#8f939a" strokeWidth="3" strokeLinecap="round">
          <path d="M116,161 l3,8" />
          <path d="M124,158 l3,8" />
          <path d="M132,155 l3,8" />
        </g>
        <path d="M30,168 L84,168 L76,202 L38,202z" fill="#a8875a" />
        {/* 網代の目。籠だと分かるようにする(無いと植木鉢に見えた)。 */}
        <g stroke="#8a6f42" strokeWidth="2.5" fill="none">
          <path d="M32,178 L82,178" />
          <path d="M34,190 L79,190" />
        </g>
        <rect x="26" y="160" width="62" height="10" rx="4" fill="#8a6f42" />
        <g fill="#4a4a52" stroke="none">
          <ellipse cx="42" cy="160" rx="9" ry="5" />
          <ellipse cx="62" cy="157" rx="9" ry="5" />
          <ellipse cx="52" cy="152" rx="9" ry="5" />
        </g>
      </g>

      {/* 畦にしゃがんで水をすくい、塩気を確かめる農夫。
          他の6枚は立ち姿なので、ここは**前のめりのしゃがみ**で組む。
          潮の舌より後に描くので、塗り潰されない。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="330" cy="200" rx="36" ry="6" fill="#3f3a2e" />
        <path d="M348,170 L328,182 L336,198" stroke="#24384f" strokeWidth="11" fill="none" />
        <path d="M352,172 L332,188 L342,202" stroke="#2f4a6b" strokeWidth="12" fill="none" />
        <rect
          x="330"
          y="142"
          width="28"
          height="36"
          rx="13"
          transform="rotate(22 344 160)"
          fill="#2f4a6b"
        />
        {/* 水へ下ろした腕。手首まで浸かっている。 */}
        <path d="M336,152 L316,166 L302,178" stroke="#d9a273" strokeWidth="9" fill="none" />
        <circle cx="300" cy="180" r="6.5" fill="#d9a273" />
        <circle cx="324" cy="138" r="11" fill="#d9a273" />
        <path d="M316,144 L334,146 L332,152 L318,151z" fill="#e0dcd0" />
        {/* 菅笠。前へ深くかぶらせて、うつむいた形にする。 */}
        <path d="M296,142 Q324,108 352,138 Q326,150 296,142z" fill="#c9a86a" />
        <path d="M296,142 Q326,150 352,138" fill="none" stroke="#8a6f42" strokeWidth="2.5" />
      </g>

      <style>{`
        .isgn-tongue {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: isgn-push 4.4s ease-in-out infinite alternate;
        }
        @keyframes isgn-push {
          from { transform: scale(0.34); }
          to   { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .isgn-tongue { animation: none; }
        }
      `}</style>
    </svg>
  );
}
