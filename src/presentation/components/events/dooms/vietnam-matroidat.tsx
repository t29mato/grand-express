/**
 * マー・チョーイに化かされる。暗闇の中、帰り道はどの角を曲がっても同じ景色に見え、
 * 夜明けになってようやく同じ田んぼの畦道を四度も横切っていたと分かった。
 * 昔話はこの仕掛けをマー・チョーイのしわざだとする。面白がって一晩じゅう数歩先を漂い、
 * 日が地平線に昇った瞬間に消えるという。
 *
 * 構図: 夜の水田。畦道が格子に走り、水面が空を映している。
 * **同じ畦を四度横切った足跡**が画面に残っていて、それが厄災の中身。
 * 旅人は小さく後ろ姿で、数歩先を漂う蒼白い光を追っている。
 * 右端の地平だけがわずかに明るい——もうすぐ夜明けで、そのとき光は消える。
 *
 * **マー・チョーイは人型ではない。**目も口も輪郭も描かない。
 * **光そのものが本体**なので、蒼白い玉と、その後ろに残る軌跡だけにしてある。
 * ナダーハ(輪郭を葦で隠す)やアプ(稜線だけ)より単純で、ここでは光が全部を担う。
 *
 * 動くのは5つ: 数歩先を漂う光、その軌跡、水面に映る光の揺れ、
 * 畦の草の揺れ、地平の白み。
 * 止めても「四度横切った足跡と、数歩先の光」で伝わる。
 *
 * (ペルー盤の霧とは別物にする: あちらは昼の灰色の霧で、目印が霞に消える。
 *  こちらは**夜**で、霧は無く、**光が導いている。**)
 */
export function VietnamMatroidat() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜。地平の右だけがわずかに明るい。 */}
      <rect width="400" height="210" fill="#141b30" />
      <rect width="400" height="96" fill="#1b2340" />
      <path d="M400,96H180q60,-30 220,-26z" fill="#2a3450" />
      <path d="M400,96H286q40,-18 114,-15z" fill="#3f4a62" />
      <g className="vietnam-mr-dawn" fill="#6a6a70" opacity="0.5">
        <ellipse cx="392" cy="94" rx="60" ry="12" />
      </g>

      {/* 星。 */}
      <g fill="#c8d4e8" opacity="0.7">
        <circle cx="40" cy="22" r="1.4" />
        <circle cx="88" cy="14" r="1.2" />
        <circle cx="136" cy="30" r="1.4" />
        <circle cx="180" cy="18" r="1.2" />
        <circle cx="62" cy="46" r="1.2" />
        <circle cx="220" cy="34" r="1.2" />
      </g>

      {/* 遠くの村の灯り。帰り着けない家。 */}
      <g fill="#26304a">
        <rect x="18" y="76" width="34" height="20" />
        <rect x="58" y="82" width="26" height="14" />
      </g>
      <g fill="#e8a83c" opacity="0.85">
        <rect x="26" y="82" width="8" height="7" />
        <rect x="66" y="86" width="7" height="6" />
      </g>
      <g stroke="#26304a" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M112,96V78M112,78q-9,-3 -13,2M112,78q9,-3 13,2M112,78q-7,-9 -14,-8" />
        <path d="M258,96V80M258,80q-8,-3 -11,2M258,80q8,-3 11,2" />
      </g>

      {/* 水田。水面が空を映している。 */}
      <rect y="96" width="400" height="114" fill="#1f2a44" />
      <g fill="#26344f">
        <rect y="104" width="400" height="26" />
        <rect y="146" width="400" height="26" />
      </g>
      {/* 苗の列 */}
      <g
        stroke="#2f4a44"
        strokeWidth="2"
        opacity="0.9"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M24,126v-8M48,128v-9M72,125v-7M300,128v-8M324,130v-9M348,127v-7M60,168v-8M84,170v-9M108,167v-7M280,170v-8M304,172v-9" />
      </g>

      {/* 畦道の格子。**同じ畦を四度横切る。** */}
      <g fill="#3f4438">
        <rect y="130" width="400" height="9" />
        <rect y="172" width="400" height="10" />
        <rect x="126" y="96" width="8" height="114" />
        <rect x="266" y="96" width="8" height="114" />
      </g>
      <g fill="#4f5442">
        <rect y="130" width="400" height="3" />
        <rect y="172" width="400" height="3" />
      </g>

      {/* 四度横切った足跡。**止めても残る主役。** */}
      <g fill="#6a7060" opacity="0.9">
        <ellipse cx="44" cy="134" rx="4" ry="2.4" />
        <ellipse cx="56" cy="136" rx="4" ry="2.4" />
        <ellipse cx="150" cy="134" rx="4" ry="2.4" />
        <ellipse cx="162" cy="136" rx="4" ry="2.4" />
        <ellipse cx="286" cy="134" rx="4" ry="2.4" />
        <ellipse cx="298" cy="136" rx="4" ry="2.4" />
        <ellipse cx="352" cy="176" rx="4" ry="2.4" />
        <ellipse cx="340" cy="178" rx="4" ry="2.4" />
        <ellipse cx="212" cy="176" rx="4" ry="2.4" />
        <ellipse cx="200" cy="178" rx="4" ry="2.4" />
        <ellipse cx="88" cy="176" rx="4" ry="2.4" />
        <ellipse cx="76" cy="178" rx="4" ry="2.4" />
      </g>
      {/* 同じ所を回った道筋 */}
      <g
        stroke="#5f6a5a"
        strokeWidth="2.4"
        strokeDasharray="7 8"
        opacity="0.75"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M40,196q30,-24 88,-22q60,2 84,-20q22,-20 -14,-28q-38,-8 -64,14q-24,20 24,26q48,6 96,-16" />
      </g>

      {/* 旅人。後ろ姿。数歩先の光を追っている。 */}
      <g transform="translate(176,0)">
        <g className="vietnam-mr-walk">
          <path d="M-9,196v-28q0,-7 9,-7q9,0 9,7v28z" fill="#3f4a62" />
          <circle cx="0" cy="152" r="8.4" fill="#5f4a3c" />
          <path d="M-13,150h26l-13,-12z" fill="#8f8266" />
          <path
            d="M-7,198l-4,10M7,198l4,10"
            stroke="#2a3040"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M9,172q12,-4 16,-12"
            stroke="#3f4a62"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* **マー・チョーイ。**光そのもの。顔も輪郭も描かない。 */}
      <g className="vietnam-mr-wisp">
        <circle cx="238" cy="148" r="22" fill="#7fe0c0" opacity="0.1" />
        <circle cx="238" cy="148" r="13" fill="#7fe0c0" opacity="0.2" />
        <circle cx="238" cy="148" r="7" fill="#a8f0d8" opacity="0.6" />
        <circle cx="238" cy="148" r="3.4" fill="#e4fff4" />
      </g>
      {/* 光の軌跡。 */}
      <g className="vietnam-mr-trail" fill="#7fe0c0">
        <circle cx="222" cy="152" r="2.6" opacity="0.45" />
        <circle cx="208" cy="158" r="2" opacity="0.3" />
        <circle cx="196" cy="164" r="1.6" opacity="0.18" />
      </g>
      {/* 水面に映った光。 */}
      <g className="vietnam-mr-reflect" fill="#7fe0c0" opacity="0.3">
        <ellipse cx="238" cy="164" rx="9" ry="3" />
        <ellipse cx="238" cy="192" rx="6" ry="2.4" />
      </g>

      {/* 畦の草。 */}
      <g
        className="vietnam-mr-grass"
        stroke="#3f4a38"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      >
        <path d="M16,172l-5,-8M16,172v-10M16,172l5,-8M116,182l-5,-8M116,182v-10M116,182l5,-8M320,180l-5,-8M320,180v-10M320,180l5,-8" />
      </g>

      <style>{`
        .vietnam-mr-wisp {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: vietnam-mr-drift 6.4s ease-in-out infinite;
        }
        @keyframes vietnam-mr-drift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-18px, -8px); }
          50% { transform: translate(-30px, 6px); }
          75% { transform: translate(-14px, 10px); }
        }
        .vietnam-mr-trail {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: vietnam-mr-fade 6.4s ease-in-out infinite;
        }
        @keyframes vietnam-mr-fade {
          0%, 100% { opacity: 0.9; transform: translate(0, 0); }
          50% { opacity: 0.35; transform: translate(-14px, 6px); }
        }
        .vietnam-mr-reflect {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: vietnam-mr-shiver 2.4s ease-in-out infinite;
        }
        @keyframes vietnam-mr-shiver {
          0%, 100% { transform: scaleX(1); opacity: 0.22; }
          50% { transform: scaleX(1.4); opacity: 0.4; }
        }
        .vietnam-mr-walk {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-mr-follow 6.4s ease-in-out infinite;
        }
        @keyframes vietnam-mr-follow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-13px); }
        }
        .vietnam-mr-grass {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-mr-sway 4.2s ease-in-out infinite;
        }
        @keyframes vietnam-mr-sway {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(5deg); }
        }
        .vietnam-mr-dawn {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: vietnam-mr-lighten 8s ease-in-out infinite;
        }
        @keyframes vietnam-mr-lighten {
          0%, 100% { opacity: 0.28; }
          50% { opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vietnam-mr-wisp,
          .vietnam-mr-trail,
          .vietnam-mr-reflect,
          .vietnam-mr-walk,
          .vietnam-mr-grass,
          .vietnam-mr-dawn { animation: none; }
        }
      `}</style>
    </svg>
  );
}
