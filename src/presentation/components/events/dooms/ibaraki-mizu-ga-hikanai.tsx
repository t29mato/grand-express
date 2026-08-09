/**
 * 水が引かない。深さ4メートル、面積220平方キロメートルの湖には、
 * 水を早く逃がす先がない。一週間の雨がひと月居座る。
 *
 * ## 描き直しでやったこと
 *
 * 人が7枚とも同じ赤いシャツの立ち姿だったので、ここは
 * **舟に立って竿で進む人**にした。竿を斜めに構えた形は他の6枚と重ならないうえ、
 * **道だったところを舟で行く**という一点で「水が引かない」が伝わる。
 *
 * 水面しか無かった背景に、半分沈んだガードレール・水に立つ電柱の列・
 * 対岸の堤防と家並み・水位標を入れた。**沈んでいるものの数で深さを示す。**
 *
 * **動くものは1つだけ**——水没した道の上をゆっくり波が渡る。
 */
export function IbarakiMizuGaHikanai() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨あがりの重い空。 */}
      <rect width="400" height="210" fill="#4a5464" />
      <g fill="#3f4857">
        <ellipse cx="70" cy="14" rx="86" ry="22" />
        <ellipse cx="240" cy="10" rx="94" ry="22" />
        <ellipse cx="376" cy="16" rx="64" ry="20" />
      </g>
      <g fill="#566072">
        <ellipse cx="120" cy="38" rx="100" ry="8" />
        <ellipse cx="310" cy="36" rx="96" ry="8" />
      </g>

      {/* 対岸。堤防と林と、屋根だけ見える家並み。 */}
      <rect y="62" width="400" height="8" fill="#3b4a3c" />
      <g fill="#33472f">
        <ellipse cx="46" cy="61" rx="26" ry="8" />
        <ellipse cx="150" cy="59" rx="30" ry="9" />
        <ellipse cx="286" cy="61" rx="24" ry="8" />
        <ellipse cx="372" cy="60" rx="22" ry="7" />
      </g>
      <g fill="#4a4450">
        <path d="M96,62 L110,52 L124,62z" />
        <path d="M212,62 L224,53 L236,62z" />
        <path d="M330,62 L341,54 L352,62z" />
      </g>
      <rect y="68" width="400" height="6" fill="#5a5c4e" />

      {/* 一面の水。ここが本体。 */}
      <rect y="74" width="400" height="136" fill="#41586e" />
      <rect y="74" width="400" height="4" fill="#54708a" />
      <g stroke="#4d6880" strokeWidth="3" fill="none">
        <path d="M0,96 L400,92" />
        <path d="M0,124 L400,118" />
        <path d="M0,166 L400,158" />
        <path d="M0,202 L400,192" />
      </g>

      {/* 水に立つ電柱の列。**根元が見えないことで深さを出す。** */}
      <g stroke="#5c5646" strokeWidth="3" strokeLinecap="round">
        <path d="M354,102 L354,60" />
        <path d="M344,66 L364,66" />
        <path d="M300,110 L300,72" />
        <path d="M292,77 L308,77" />
        <path d="M242,122 L242,80" />
        <path d="M234,85 L250,85" />
      </g>
      <g stroke="#5c5646" strokeWidth="1.5" fill="none">
        <path d="M242,84 Q270,80 300,76" />
        <path d="M300,76 Q328,70 354,65" />
      </g>

      {/* 半分沈んだガードレール。道がここにあった証拠。 */}
      <g stroke="#1f2833" strokeWidth="2" strokeLinejoin="round">
        <rect x="18" y="112" width="118" height="9" rx="3" fill="#9aa0a8" />
        <rect x="28" y="121" width="6" height="14" fill="#8a8f99" />
        <rect x="76" y="121" width="6" height="14" fill="#8a8f99" />
        <rect x="124" y="121" width="6" height="14" fill="#8a8f99" />
      </g>

      {/* 頭だけ出した道路標識と、水位標。 */}
      <g stroke="#1f2833" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="308" y="120" width="7" height="42" fill="#8a8f99" />
        <rect x="288" y="100" width="48" height="20" rx="3" fill="#e0dcd0" />
        <rect x="294" y="107" width="36" height="6" rx="3" fill="#e05252" />
      </g>
      <g stroke="#1f2833" strokeWidth="2" strokeLinejoin="round">
        <rect x="60" y="86" width="6" height="52" fill="#e0dcd0" />
        <rect x="60" y="96" width="6" height="8" fill="#2f3b4f" />
        <rect x="60" y="112" width="6" height="8" fill="#2f3b4f" />
        <rect x="60" y="128" width="6" height="8" fill="#2f3b4f" />
      </g>

      {/* 水没したれんこん田。葉だけが水面に残る。 */}
      <g fill="#4f7a44" stroke="#2f4a2c" strokeWidth="2">
        <ellipse cx="42" cy="150" rx="20" ry="7" />
        <ellipse cx="104" cy="176" rx="18" ry="6" />
        <ellipse cx="352" cy="150" rx="19" ry="7" />
        <ellipse cx="306" cy="184" rx="21" ry="7" />
        <ellipse cx="386" cy="176" rx="16" ry="6" />
      </g>

      {/* ゆっくり渡る波。**ここだけが動く。**人より先に描く。 */}
      <path
        className="imzh-wave"
        d="M-40,140 q26,-7 52,0 t52,0 t52,0 t52,0 t52,0 t52,0 t52,0"
        fill="none"
        stroke="#7fa4bc"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 舟に立って竿を差す人。**道だったところを舟で行く。** */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="200" cy="192" rx="76" ry="9" fill="#37506a" />
        {/* 竿。人より先に描いて、握っている形にする。 */}
        <path d="M244,96 L196,178" stroke="#8a6f42" strokeWidth="5" fill="none" />
        {/* 平底の舟。 */}
        <g stroke="#241f18" strokeWidth="2.5">
          <path d="M132,172 L268,166 L258,190 L142,192z" fill="#7a5c3c" />
          <path d="M140,174 L262,169 L260,176 L143,180z" fill="#5a4028" stroke="none" />
          <path d="M152,178 L182,177 L182,186 L153,187z" fill="#4a3320" stroke="none" />
        </g>
        {/* 立っている人。膝を割って踏ん張らせる。 */}
        <path d="M196,148 L188,166 L184,174" stroke="#2f3b4f" strokeWidth="10" fill="none" />
        <path d="M204,148 L208,166 L206,174" stroke="#3b4a63" strokeWidth="10" fill="none" />
        <path d="M200,116 L200,152" stroke="#4f7a6a" strokeWidth="24" fill="none" />
        <path d="M190,132 L214,134 L212,152 L188,150z" fill="#3f6656" />
        <circle cx="200" cy="100" r="11" fill="#d9a273" stroke="#3a3228" strokeWidth="2" />
        <ellipse cx="200" cy="92" rx="20" ry="5" fill="#c9a86a" />
        <path d="M190,82 L210,82 L214,92 L186,92z" fill="#c9a86a" />
        {/* 竿を握る両手。 */}
        <path d="M198,120 L214,112" stroke="#d9a273" strokeWidth="8" fill="none" />
        <path d="M202,142 L206,152" stroke="#d9a273" strokeWidth="8" fill="none" />
        <circle cx="217" cy="110" r="5.5" fill="#d9a273" />
        <circle cx="207" cy="154" r="5.5" fill="#d9a273" />
      </g>

      <style>{`
        .imzh-wave {
          transform-box: fill-box;
          transform-origin: 0 50%;
          animation: imzh-swell 6s linear infinite;
        }
        @keyframes imzh-swell {
          0%   { transform: translateX(0); }
          100% { transform: translateX(104px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .imzh-wave { animation: none; }
        }
      `}</style>
    </svg>
  );
}
