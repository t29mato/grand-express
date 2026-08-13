/**
 * 交通ストライキが呼びかけられる。発車案内は運休の印だらけになり、
 * 駅員は組合の旗を掲げて並ぶ。暴力・対立は描かない。**無地の旗が揺れる**だけで伝える。
 */
export function EuropeGreveContinentale() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。 */}
      <rect width="400" height="210" fill="#7f96a0" />
      <rect y="0" width="400" height="70" fill="#a6b8c0" />

      {/* 駅舎の壁と屋根。 */}
      <rect y="60" width="400" height="30" fill="#9aa6ac" />
      <path d="M0,60 L60,20 L340,20 L400,60z" fill="#5c6a72" />

      {/* ホーム。 */}
      <rect y="90" width="400" height="120" fill="#c7ccce" />
      <rect y="90" width="400" height="6" fill="#e6e9ea" />

      {/* 止まったままの発車案内板(空欄の枠だけ、運休を示す斜線)。 */}
      <rect x="150" y="35" width="100" height="30" rx="2" fill="#2a2a30" />
      <g stroke="#e8443f" strokeWidth="4">
        <path d="M158,42 L192,58" />
        <path d="M208,42 L242,58" />
      </g>

      {/* 動かない車両。 */}
      <g strokeLinejoin="round">
        <rect x="30" y="150" width="90" height="26" rx="3" fill="#8b8f98" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="48" cy="176" r="8" fill="#241a10" />
        <circle cx="102" cy="176" r="8" fill="#241a10" />
      </g>

      {/* 並んで立つ職員たち。腕組みと、旗を掲げる一人。 */}
      <g strokeLinejoin="round">
        <circle cx="260" cy="140" r="10" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <rect x="248" y="150" width="24" height="34" rx="4" fill="#f5b31c" stroke="#20364a" strokeWidth="2" />
        <circle cx="300" cy="142" r="10" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="288" y="152" width="24" height="34" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <circle cx="340" cy="140" r="10" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <rect x="328" y="150" width="24" height="34" rx="4" fill="#e8443f" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 揺れる無地の旗。 */}
      <g className="egv-flag">
        <rect x="336" y="96" width="3" height="46" fill="#3a332c" />
        <path d="M339,98 L370,106 L339,116z" fill="#f5b31c" stroke="#20364a" strokeWidth="2" strokeLinejoin="round" />
      </g>

      <style>{`
        .egv-flag {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: egv-wave 1.8s ease-in-out infinite;
        }
        @keyframes egv-wave {
          0% { transform: rotate(-6deg); }
          50% { transform: rotate(8deg); }
          100% { transform: rotate(-6deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .egv-flag { animation: none; }
        }
      `}</style>
    </svg>
  );
}
