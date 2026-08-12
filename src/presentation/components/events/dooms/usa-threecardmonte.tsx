/**
 * 街角の三枚カードの詐欺師。段ボール箱の上で3枚のカードが目まぐるしく
 * 入れ替わり、どれが当たりか分からなくなる。
 *
 * 動くのは、3枚のカードが左右に入れ替わる動きだけ。
 */
export function UsaThreecardmonte() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの街角。 */}
      <rect width="400" height="210" fill="#5f5f68" />
      <rect y="0" width="400" height="90" fill="#7a7a84" />

      {/* 建物の壁(背景)。 */}
      <rect x="0" y="60" width="400" height="80" fill="#4a4a52" />
      <g fill="#f5c95c" opacity="0.6">
        <rect x="40" y="76" width="14" height="18" />
        <rect x="70" y="76" width="14" height="18" />
        <rect x="320" y="80" width="14" height="18" />
        <rect x="350" y="80" width="14" height="18" />
      </g>

      {/* 地面。 */}
      <rect y="140" width="400" height="70" fill="#3a2f22" />

      {/* 段ボール箱(台)。 */}
      <rect x="150" y="150" width="100" height="50" fill="#a5622f" stroke="#5a4630" strokeWidth="2" />
      <line x1="150" y1="170" x2="250" y2="170" stroke="#5a4630" strokeWidth="1.4" />

      {/* 詐欺師の腕(両側から伸びる、動かない)。 */}
      <g fill="#c8a06a">
        <rect x="110" y="140" width="16" height="40" rx="6" />
        <rect x="274" y="140" width="16" height="40" rx="6" />
      </g>

      {/* 見物人のシルエット(左右)。 */}
      <g fill="#20364a" opacity="0.7">
        <path d="M40,200v-40a10,10 0 0 1 20,0v40z" />
        <path d="M340,200v-36a9,9 0 0 1 18,0v36z" />
      </g>

      {/* 3枚のカード(左右に入れ替わる)。 */}
      <g className="usa-tcm-card1">
        <rect x="163" y="146" width="24" height="34" rx="2" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
        <circle cx="175" cy="163" r="6" fill="#e8443f" />
      </g>
      <g className="usa-tcm-card2">
        <rect x="188" y="146" width="24" height="34" rx="2" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
        <circle cx="200" cy="163" r="6" fill="#20364a" />
      </g>
      <g className="usa-tcm-card3">
        <rect x="213" y="146" width="24" height="34" rx="2" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
        <circle cx="225" cy="163" r="6" fill="#5b8fe8" />
      </g>

      <style>{`
        .usa-tcm-card1, .usa-tcm-card2, .usa-tcm-card3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .usa-tcm-card1 {
          animation: usa-tcm-shuffle-a 1.8s ease-in-out infinite;
        }
        .usa-tcm-card2 {
          animation: usa-tcm-shuffle-b 1.8s ease-in-out infinite;
        }
        .usa-tcm-card3 {
          animation: usa-tcm-lift 1.8s ease-in-out infinite;
        }
        @keyframes usa-tcm-shuffle-a {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(50px) translateY(-8px); }
          50% { transform: translateX(50px) translateY(0); }
          75% { transform: translateX(0) translateY(-8px); }
        }
        @keyframes usa-tcm-shuffle-b {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-25px) translateY(-6px); }
          50% { transform: translateX(-25px) translateY(0); }
          75% { transform: translateX(25px) translateY(-6px); }
        }
        @keyframes usa-tcm-lift {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .usa-tcm-card1, .usa-tcm-card2, .usa-tcm-card3 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
