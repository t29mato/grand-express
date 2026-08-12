/**
 * 違う長距離列車に乗ってしまう。向かい合う2本のホームに、
 * 反対方向へ行く列車が並んで停まっている。小さな人物が片方に
 * 乗り込むと、扉が閉まってそちらの列車だけが走り去っていく。
 */
export function RussiaNeTotPoyezd() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 駅の屋根の下、薄暗い空気。 */}
      <rect width="400" height="210" fill="#5f6a78" />
      <rect y="0" width="400" height="60" fill="#6f7a88" />

      {/* 奥のホーム・列車(左向き、静止)。 */}
      <rect x="0" y="60" width="400" height="14" fill="#8a8f95" />
      <g strokeLinejoin="round">
        <rect x="20" y="74" width="360" height="30" fill="#2a5a8f" stroke="#20364a" strokeWidth="2" />
        <g fill="#bfe0f0" opacity="0.85">
          <rect x="36" y="80" width="16" height="12" />
          <rect x="70" y="80" width="16" height="12" />
          <rect x="104" y="80" width="16" height="12" />
        </g>
      </g>

      {/* 中央の通路。 */}
      <rect y="104" width="400" height="18" fill="#7f8896" />

      {/* 手前のホーム・列車(右向き)。 */}
      <rect x="0" y="122" width="400" height="14" fill="#9a9fa5" />
      <g className="rntp-train" strokeLinejoin="round">
        <rect x="20" y="136" width="360" height="34" fill="#8f2d2d" stroke="#20364a" strokeWidth="2" />
        <g fill="#bfe0f0" opacity="0.85">
          <rect x="36" y="144" width="16" height="12" />
          <rect x="70" y="144" width="16" height="12" />
          <rect x="104" y="144" width="16" height="12" />
        </g>
        {/* 扉(閉まる)。 */}
        <rect className="rntp-door" x="150" y="140" width="18" height="26" fill="#20364a" />
      </g>

      {/* 人物(歩いて乗り込む)。 */}
      <g className="rntp-person" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="0" cy="180" r="8" fill="#d9a273" stroke="#20364a" strokeWidth="1.8" />
        <rect x="-7" y="188" width="14" height="18" rx="4" fill="#f5b31c" stroke="#20364a" strokeWidth="1.8" />
      </g>

      {/* ホームの床。 */}
      <rect y="170" width="400" height="40" fill="#7f8896" />

      <style>{`
        .rntp-person {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: rntp-walk 4s linear infinite;
        }
        @keyframes rntp-walk {
          0% { transform: translate(60px, 0); opacity: 1; }
          35% { transform: translate(155px, 0); opacity: 1; }
          40% { transform: translate(155px, 0); opacity: 0; }
          100% { transform: translate(155px, 0); opacity: 0; }
        }
        .rntp-door {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: rntp-close 4s linear infinite;
        }
        @keyframes rntp-close {
          0%, 38% { transform: scaleX(0); opacity: 0; }
          45%, 100% { transform: scaleX(1); opacity: 1; }
        }
        .rntp-train {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: rntp-depart 4s linear infinite;
        }
        @keyframes rntp-depart {
          0%, 50% { transform: translateX(0); }
          100% { transform: translateX(120px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rntp-person { animation: none; opacity: 0; }
          .rntp-door { animation: none; transform: scaleX(1); opacity: 1; }
          .rntp-train { animation: none; transform: translateX(60px); }
        }
      `}</style>
    </svg>
  );
}
