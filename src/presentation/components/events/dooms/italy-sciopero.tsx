/**
 * 全国的な鉄道ストで運行が止まる。ホームに列車は停まったまま動かず、
 * 赤い組合旗だけが風にはためく。乗客は荷物を抱えて立ち尽くす。
 *
 * 動くのは旗と、足踏みする乗客の重心だけ。列車自体は静止させたままにして
 * 「止まっている」ことをはっきりさせる。
 */
export function ItalySciopero() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った空。 */}
      <rect width="400" height="210" fill="#7f8896" />
      <rect y="0" width="400" height="86" fill="#9aa0a8" />

      {/* 駅の屋根。 */}
      <rect x="0" y="40" width="400" height="10" fill="#4a4f42" />
      <g fill="#4a4f42">
        <rect x="20" y="50" width="8" height="60" />
        <rect x="180" y="50" width="8" height="60" />
        <rect x="372" y="50" width="8" height="60" />
      </g>

      {/* ホーム。 */}
      <rect y="150" width="400" height="60" fill="#9a9484" />
      <rect y="150" width="400" height="6" fill="#e8dcc0" />

      {/* 停まったままの列車(動かない)。 */}
      <g strokeLinejoin="round">
        <rect x="30" y="90" width="340" height="60" rx="6" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <rect x="30" y="90" width="340" height="10" fill="#3f6bb0" />
        <g fill="#bfe0f0">
          <rect x="50" y="106" width="26" height="20" />
          <rect x="90" y="106" width="26" height="20" />
          <rect x="130" y="106" width="26" height="20" />
          <rect x="250" y="106" width="26" height="20" />
          <rect x="290" y="106" width="26" height="20" />
          <rect x="330" y="106" width="26" height="20" />
        </g>
      </g>

      {/* 待つ乗客(スーツケースを持ち、足を止めている)。 */}
      <g>
        <circle cx="220" cy="172" r="8" fill="#d9a273" />
        <rect x="212" y="180" width="16" height="22" fill="#5b8fe8" />
        <rect x="234" y="192" width="16" height="12" rx="2" fill="#8a5a3a" />
      </g>
      <g className="ita-sc-foot">
        <circle cx="260" cy="174" r="7" fill="#d9a273" />
        <rect x="253" y="181" width="14" height="20" fill="#e8443f" />
        <rect x="272" y="196" width="14" height="10" rx="2" fill="#4a4436" />
      </g>

      {/* 組合の赤旗(はためく)。 */}
      <g>
        <rect x="60" y="60" width="4" height="90" fill="#4a4436" />
        <path
          className="ita-sc-flag"
          d="M64,62 L110,68 L100,78 L110,88 L64,94 z"
          fill="#c8102e"
          stroke="#7a0a1e"
          strokeWidth="1.5"
        />
      </g>

      <style>{`
        .ita-sc-flag {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: ita-sc-wave 1.6s ease-in-out infinite;
        }
        @keyframes ita-sc-wave {
          0%, 100% { transform: scaleX(1) skewY(0deg); }
          50% { transform: scaleX(0.92) skewY(-4deg); }
        }
        .ita-sc-foot {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ita-sc-tap 1.1s ease-in-out infinite;
        }
        @keyframes ita-sc-tap {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ita-sc-flag, .ita-sc-foot { animation: none; }
        }
      `}</style>
    </svg>
  );
}
