/**
 * カタトゥンボの雷が街区を停電させる。角の変圧器が落ち、家々の窓の明かりが
 * 消える。それでも空だけは数秒おきに光り続け、近所の人が椅子を出して眺める。
 *
 * 動くのは、明滅する雷光1つ(空を照らすフラッシュを含む)だけ。
 */
export function VenezuelaRelampagoCatatumbo() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜空。 */}
      <rect width="400" height="210" fill="#1a2440" />
      <rect y="0" width="400" height="70" fill="#233257" />

      {/* 遠くの丘の稜線。 */}
      <path d="M0,110 q60,-18 120,0 t120,0 t120,0 t40,0 v100 H0 z" fill="#101a30" />

      {/* 電柱と電線。 */}
      <g stroke="#0d1526" strokeWidth="3">
        <line x1="50" y1="60" x2="50" y2="150" />
        <line x1="30" y1="72" x2="70" y2="72" />
      </g>
      <path d="M30,72 q90,20 180,4 t160,-6" stroke="#0d1526" strokeWidth="1.6" fill="none" />

      {/* 家並みと消えた窓明かり(暗いまま)。 */}
      <g fill="#101a30" stroke="#0d1526" strokeWidth="1.6" strokeLinejoin="round">
        <rect x="140" y="110" width="80" height="60" />
        <rect x="230" y="90" width="70" height="80" />
        <rect x="310" y="120" width="60" height="50" />
      </g>
      <g fill="#1f2c4a" opacity="0.9">
        <rect x="152" y="120" width="14" height="14" />
        <rect x="180" y="120" width="14" height="14" />
        <rect x="152" y="144" width="14" height="14" />
        <rect x="244" y="102" width="14" height="14" />
        <rect x="270" y="102" width="14" height="14" />
        <rect x="244" y="128" width="14" height="14" />
        <rect x="322" y="132" width="12" height="12" />
        <rect x="344" y="132" width="12" height="12" />
      </g>

      {/* 歩道に椅子を出して空を見る近所の人々。 */}
      <g fill="#0d1526">
        <circle cx="90" cy="176" r="6" />
        <rect x="84" y="182" width="12" height="16" rx="2" />
        <circle cx="112" cy="180" r="5" />
        <rect x="107" y="185" width="10" height="13" rx="2" />
      </g>
      <g stroke="#0d1526" strokeWidth="2">
        <line x1="84" y1="198" x2="96" y2="198" />
        <line x1="107" y1="198" x2="117" y2="198" />
      </g>

      {/* 雷光。**ここだけが動く。** */}
      <g className="vrc-bolt">
        <path
          d="M250,4 L228,64 L246,64 L220,130 L272,58 L252,58 z"
          fill="#f4c430"
        />
      </g>
      <rect className="vrc-flash" width="400" height="210" fill="#f6efe2" />

      <style>{`
        .vrc-bolt {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: vrc-flicker 2.4s steps(1) infinite;
        }
        .vrc-flash {
          animation: vrc-flash 2.4s steps(1) infinite;
        }
        @keyframes vrc-flicker {
          0%, 82%, 100% { opacity: 0; }
          84%, 88% { opacity: 1; }
          86% { opacity: 0.3; }
          90% { opacity: 0.7; }
          92% { opacity: 0; }
        }
        @keyframes vrc-flash {
          0%, 82%, 100% { opacity: 0; }
          84% { opacity: 0.55; }
          86% { opacity: 0.1; }
          88% { opacity: 0.4; }
          90% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vrc-bolt { animation: none; opacity: 1; }
          .vrc-flash { animation: none; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
