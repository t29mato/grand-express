/**
 * 水が引かない。深さ4メートル、面積220平方キロメートルの湖には、
 * 水を早く逃がす先がない。一週間の雨がひと月居座る。
 *
 * **動くものは1つだけ**——水没した道の上をゆっくり波が渡る。
 * れんこん田も岸沿いの道も水の下で、標識だけが頭を出している。
 */
export function IbarakiMizuGaHikanai() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨あがりの重い空。 */}
      <rect width="400" height="210" fill="#4a5464" />
      <rect y="38" width="400" height="28" fill="#566072" />
      {/* 対岸。遠くに低い陸が残る。 */}
      <rect y="78" width="400" height="14" fill="#3f5040" />
      <g fill="#334233">
        <ellipse cx="60" cy="78" rx="30" ry="8" />
        <ellipse cx="188" cy="76" rx="36" ry="9" />
        <ellipse cx="324" cy="79" rx="28" ry="7" />
      </g>

      {/* 一面の水。ここが本体。 */}
      <rect y="92" width="400" height="118" fill="#41586e" />
      <rect y="92" width="400" height="4" fill="#54708a" />
      <g stroke="#4d6880" strokeWidth="3">
        <line x1="0" y1="122" x2="400" y2="118" />
        <line x1="0" y1="158" x2="400" y2="152" />
        <line x1="0" y1="192" x2="400" y2="186" />
      </g>

      {/* 水没したれんこん田。葉だけが水面に残る。 */}
      <g fill="#4f7a44" stroke="#2f4a2c" strokeWidth="2">
        <ellipse cx="58" cy="140" rx="20" ry="7" />
        <ellipse cx="112" cy="164" rx="17" ry="6" />
        <ellipse cx="298" cy="146" rx="19" ry="7" />
        <ellipse cx="352" cy="172" rx="16" ry="6" />
      </g>

      {/* 頭だけ出した道路標識。ここが道だったと示す。 */}
      <g stroke="#232b3a" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="196" y="118" width="7" height="60" fill="#8a8f99" />
        <rect x="174" y="98" width="52" height="22" rx="3" fill="#e0dcd0" />
        <rect x="180" y="106" width="40" height="6" rx="3" fill="#e05252" />
      </g>

      {/* 長靴で立ち尽くす人。水は膝まで来ている。 */}
      <g stroke="#232b3a" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="86" y="140" width="12" height="34" rx="5" fill="#3d3a42" />
        <rect x="101" y="140" width="12" height="34" rx="5" fill="#3d3a42" />
        <rect x="84" y="102" width="32" height="42" rx="10" fill="#e05252" />
        <circle cx="100" cy="90" r="13" fill="#d9a273" />
        <path d="M87,88 a13,13 0 0 1 26,0z" fill="#241c1a" />
        <g transform="translate(114,112) rotate(24)">
          <rect x="0" y="-6" width="34" height="12" rx="6" fill="#d9a273" />
        </g>
        <circle cx="147" cy="127" r="6" fill="#d9a273" />
      </g>

      {/* ゆっくり渡る波。**ここだけが動く。** */}
      <path
        className="imzh-wave"
        d="M-40,134 q26,-7 52,0 t52,0 t52,0 t52,0 t52,0 t52,0 t52,0"
        fill="none"
        stroke="#7fa4bc"
        strokeWidth="3"
        strokeLinecap="round"
      />

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
