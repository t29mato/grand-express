/**
 * 新しいコートの前面にグレイビーがこぼれる。売店の列が急に動いた拍子に
 * トレーが傾き、チーズカードとグレイビーがコートの胸元に落ちる。
 *
 * 傾くトレーとこぼれ落ちる茶色いしずくだけを動かす。
 */
export function CanadaGravySpill() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄暗いリンクの売店の裏。 */}
      <rect width="400" height="210" fill="#2a3038" />
      <rect y="0" width="400" height="70" fill="#354048" />
      <rect y="150" width="400" height="60" fill="#20262c" />

      {/* 奥の観客席のシルエット。 */}
      <g fill="#3f4a52" opacity="0.7">
        <rect x="20" y="30" width="360" height="40" />
        <g fill="#2a3038"><rect x="40" y="36" width="14" height="10" /><rect x="70" y="40" width="14" height="10" /><rect x="100" y="34" width="14" height="10" /></g>
      </g>

      {/* コートを着た人の胴体(正面)。 */}
      <g strokeLinejoin="round">
        <rect x="220" y="90" width="70" height="100" rx="8" fill="#e8443f" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="255" cy="70" r="16" fill="#d9a273" stroke="#20364a" strokeWidth="2.5" />
      </g>

      {/* 傾くトレー(手前)。ここが動く。 */}
      <g className="cgs-tray" transform="translate(140,110)">
        <path d="M0,0 L60,0 L54,10 L6,10 Z" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <ellipse cx="30" cy="4" rx="20" ry="5" fill="#e8d090" />
        <ellipse cx="30" cy="3" rx="14" ry="3.5" fill="#8a5a30" />
      </g>

      {/* トレーからこぼれるグレイビー。ここも動く。 */}
      <g className="cgs-drip" fill="#6b4a28">
        <ellipse cx="200" cy="118" rx="4" ry="7" />
        <ellipse cx="210" cy="118" rx="3" ry="5" />
      </g>

      {/* コートに付いたしみ(常に見える)。 */}
      <ellipse cx="245" cy="130" rx="18" ry="14" fill="#4a2f18" opacity="0.85" />

      <style>{`
        .cgs-tray {
          transform-box: fill-box;
          transform-origin: 10% 90%;
          animation: cgs-tilt 2.4s ease-in-out infinite;
        }
        @keyframes cgs-tilt {
          0%, 100% { transform: rotate(0deg); }
          40% { transform: rotate(-22deg); }
          60% { transform: rotate(-22deg); }
        }
        .cgs-drip {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: cgs-fall 2.4s ease-in infinite;
        }
        @keyframes cgs-fall {
          0%, 35% { transform: translateY(-6px); opacity: 0; }
          45% { opacity: 1; }
          70% { transform: translateY(18px); opacity: 1; }
          85%, 100% { transform: translateY(18px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cgs-tray, .cgs-drip { animation: none; }
          .cgs-tray { transform: rotate(-22deg); }
          .cgs-drip { transform: translateY(18px); opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
