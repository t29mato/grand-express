/**
 * 山火事が尾根を越える。倒壊した建物や逃げ惑う人は描かない。
 *
 * 動くのは尾根を這い上る炎と、立ちのぼる煙、舞い上がる残り火だけ。
 * 手前のユーカリは黒いシルエットのまま静止させ、炎の勢いだけで
 * 恐ろしさを伝える。
 */
export function AustraliaBushfire() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 煙で赤黒く染まった空。 */}
      <rect width="400" height="210" fill="#3a2420" />
      <g fill="#5a3a30" opacity="0.85">
        <ellipse cx="80" cy="46" rx="100" ry="30" />
        <ellipse cx="260" cy="34" rx="120" ry="34" />
        <ellipse cx="370" cy="58" rx="70" ry="24" />
      </g>

      {/* 尾根。 */}
      <path d="M0,150 L60,110 L140,140 L220,90 L300,130 L400,100 L400,210 L0,210 Z" fill="#221812" />

      {/* 黒いシルエットのユーカリ(静止)。 */}
      <g fill="#160e0a">
        <rect x="68" y="90" width="4" height="26" />
        <ellipse cx="66" cy="84" rx="16" ry="8" />
        <ellipse cx="80" cy="90" rx="12" ry="6" />
        <rect x="238" y="66" width="4" height="30" />
        <ellipse cx="236" cy="58" rx="18" ry="9" />
        <ellipse cx="252" cy="66" rx="13" ry="6" />
      </g>

      {/* 炎。尾根の稜線に沿って並べ、それぞれ違う速さで揺れさせる。 */}
      <g>
        {[
          [58, 112, 1],
          [96, 128, 0.8],
          [138, 142, 1.15],
          [180, 118, 0.9],
          [222, 92, 1.05],
          [268, 112, 0.85],
          [310, 132, 1.1],
        ].map(([x, y, s], i) => (
          <g key={i} className="abf-flame" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.15}s` }}>
            <path
              d={`M${x - 8 * s},${y} Q${x - 6 * s},${y - 14 * s} ${x},${y - 26 * s} Q${x + 7 * s},${y - 14 * s} ${x + 8 * s},${y} Z`}
              fill="#e8443f"
            />
            <path
              d={`M${x - 4 * s},${y} Q${x - 3 * s},${y - 8 * s} ${x},${y - 16 * s} Q${x + 4 * s},${y - 8 * s} ${x + 4 * s},${y} Z`}
              fill="#f5b31c"
            />
          </g>
        ))}
      </g>

      {/* 立ちのぼる煙。 */}
      <g className="abf-smoke" fill="#6b5048" opacity="0.7">
        <ellipse cx="150" cy="60" rx="30" ry="16" />
        <ellipse cx="230" cy="40" rx="36" ry="18" />
      </g>

      {/* 舞い上がる残り火。1つだけ動かす。 */}
      <circle className="abf-ember" cx="150" cy="140" r="3" fill="#f5b31c" />

      <style>{`
        .abf-flame {
          transform-box: fill-box;
          animation: abf-flicker 0.9s ease-in-out infinite alternate;
        }
        @keyframes abf-flicker {
          0%   { transform: scaleY(1) scaleX(1); }
          100% { transform: scaleY(1.22) scaleX(0.92); }
        }
        .abf-smoke {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: abf-rise 6s ease-in infinite;
        }
        @keyframes abf-rise {
          0%   { transform: translateY(0) scale(1); opacity: 0.7; }
          100% { transform: translateY(-60px) scale(1.6); opacity: 0; }
        }
        .abf-ember {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: abf-float 2.6s ease-out infinite;
        }
        @keyframes abf-float {
          0%   { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(40px, -90px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .abf-flame, .abf-smoke, .abf-ember {
            animation: none;
          }
          .abf-ember { opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
