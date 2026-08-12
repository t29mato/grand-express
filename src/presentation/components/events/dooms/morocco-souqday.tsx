/**
 * 週市(スーク)の日、羊の群れが道を塞ぐ。羊たちが横切っていき、
 * 待たされる車がクラクションの代わりに小さく揺れる。
 *
 * 動くのは羊の行列と、待つ車の小さな揺れだけ。
 */
export function MoroccoSouqday() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="90" fill="#cfe4f0" />
      <path d="M0,110c60,-16 120,-16 180,-4c80,-14 160,-4 220,-10v14H0z" fill="#b8c26a" opacity="0.7" />

      {/* 道路。 */}
      <rect y="130" width="400" height="80" fill="#c9a877" />
      <rect y="130" width="400" height="6" fill="#9c7a52" />

      {/* 待たされる車(左)。 */}
      <g className="mo-sq-car">
        <path d="M20,180 L34,158 L86,158 L100,180z" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="16" y="178" width="88" height="18" rx="4" fill="#4a7bd0" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="36" cy="198" r="9" fill="#241a10" />
        <circle cx="84" cy="198" r="9" fill="#241a10" />
      </g>

      {/* 横切る羊の群れ。 */}
      <g className="mo-sq-flock">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(${150 + i * 34},${168 + (i % 2) * 6})`}>
            <ellipse cx="0" cy="0" rx="13" ry="9" fill="#f6efe2" />
            <circle cx="12" cy="-2" r="5" fill="#4a3c2e" />
            <rect x="-8" y="6" width="3" height="7" fill="#4a3c2e" />
            <rect x="4" y="6" width="3" height="7" fill="#4a3c2e" />
          </g>
        ))}
      </g>

      {/* 土埃(羊の足元)。 */}
      <g className="mo-sq-dust" fill="#c9922f" opacity="0.5">
        <ellipse cx="200" cy="190" rx="60" ry="6" />
      </g>

      <style>{`
        .mo-sq-car {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mo-sq-idle 0.6s ease-in-out infinite;
        }
        @keyframes mo-sq-idle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1.4px); }
        }
        .mo-sq-flock {
          animation: mo-sq-cross 4s linear infinite;
        }
        @keyframes mo-sq-cross {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-320px); }
        }
        .mo-sq-dust {
          animation: mo-sq-shimmer 1.4s ease-in-out infinite;
        }
        @keyframes mo-sq-shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mo-sq-car { animation: none; }
          .mo-sq-flock { animation: none; transform: translateX(-140px); }
          .mo-sq-dust { animation: none; opacity: 0.5; }
        }
      `}</style>
    </svg>
  );
}
