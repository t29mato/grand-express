/**
 * ダムソーで停電になる。街灯が消え、家々の電球が消える。
 * ろうそくの炎だけが暗がりでゆらめき続ける。
 *
 * 動くのは、ゆらめくろうそくの炎1つだけ。
 */
export function GhanaDumsor() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜。 */}
      <rect width="400" height="210" fill="#20364a" />
      <rect y="150" width="400" height="60" fill="#16283a" />

      {/* 消えた家並みのシルエット。 */}
      <g fill="#152233">
        <rect x="20" y="90" width="80" height="60" />
        <path d="M20,90 l40,-24 l40,24z" />
        <rect x="120" y="70" width="70" height="80" />
        <rect x="300" y="100" width="70" height="50" />
        <path d="M300,100 l35,-20 l35,20z" />
      </g>

      {/* 消えた窓。 */}
      <g fill="#0f1c2a" stroke="#2a3f52" strokeWidth="1.4">
        <rect x="35" y="105" width="14" height="14" />
        <rect x="60" y="105" width="14" height="14" />
        <rect x="140" y="90" width="14" height="14" />
        <rect x="165" y="90" width="14" height="14" />
        <rect x="140" y="115" width="14" height="14" />
        <rect x="315" y="115" width="14" height="14" />
      </g>

      {/* 電柱と垂れた電線。街灯も消えている。 */}
      <g strokeLinejoin="round">
        <rect x="230" y="60" width="6" height="90" fill="#2a2a2a" />
        <circle cx="233" cy="56" r="6" fill="#1a1a1a" stroke="#2a3f52" strokeWidth="1.4" />
        <path d="M233,56 q40,10 80,0" fill="none" stroke="#1a1a1a" strokeWidth="2" />
      </g>

      {/* 窓辺のろうそく。**ここだけが動く。** */}
      <g transform="translate(160,150)">
        <rect x="-4" y="0" width="8" height="16" fill="#e8e0cc" />
        <g className="gd-flame">
          <path d="M0,-2 c-3,-6 3,-8 0,-14 c3,6 5,10 0,14z" fill="#f5b31c" />
          <path d="M0,-4 c-1.4,-3 1.4,-4 0,-7 c1.4,3 2.4,5 0,7z" fill="#e8443f" />
        </g>
      </g>

      <style>{`
        .gd-flame {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: gd-flicker 0.9s ease-in-out infinite;
        }
        @keyframes gd-flicker {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          30% { transform: scale(1.15, 0.9) rotate(-4deg); opacity: 0.85; }
          60% { transform: scale(0.9, 1.1) rotate(3deg); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gd-flame { animation: none; }
        }
      `}</style>
    </svg>
  );
}
