/**
 * 通信途絶で本部との連絡が切れる。中継アンテナが同調を失い、
 * 受信の波形が乱れて静止したまま消えていく。
 *
 * 動くのは、波形が乱れて消えていく1本の線だけ。
 */
export function SolarsystemCommblackout() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 深宇宙。 */}
      <rect width="400" height="210" fill="#04081a" />
      <g fill="#f0ead6" opacity="0.6">
        <circle cx="50" cy="30" r="1.2" />
        <circle cx="330" cy="24" r="1" />
        <circle cx="370" cy="70" r="1.2" />
        <circle cx="20" cy="120" r="1" />
      </g>

      {/* 中継アンテナ皿。 */}
      <g strokeLinejoin="round">
        <path d="M120,150 Q200,90 280,150" fill="#c9d6f0" stroke="#20364a" strokeWidth="3" />
        <line x1="200" y1="150" x2="200" y2="185" stroke="#8a92a0" strokeWidth="6" />
        <rect x="180" y="185" width="40" height="14" fill="#8a92a0" stroke="#20364a" strokeWidth="1.6" />
        <line x1="200" y1="120" x2="200" y2="60" stroke="#c9d6f0" strokeWidth="2" />
        <circle cx="200" cy="56" r="4" fill="#c9d6f0" />
      </g>

      {/* 受信モニタ(枠だけ)。 */}
      <rect x="30" y="30" width="90" height="50" rx="4" fill="#0c1830" stroke="#20364a" strokeWidth="2" />

      {/* 乱れて消えていく波形。**ここだけが動く。** */}
      <g className="scb-wave">
        <path d="M36,55 h8 l4,-16 l4,32 l4,-24 l4,16 l4,-8 l4,20 l4,-28 l4,10 l4,4 h20" fill="none" stroke="#8fe0a8" strokeWidth="2" strokeLinejoin="round" />
      </g>

      <style>{`
        .scb-wave {
          animation: scb-flicker 0.9s steps(4) infinite;
        }
        @keyframes scb-flicker {
          0% { opacity: 1; }
          40% { opacity: 0.3; }
          55% { opacity: 0.9; }
          80% { opacity: 0.15; }
          100% { opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scb-wave { animation: none; opacity: 0.3; }
        }
      `}</style>
    </svg>
  );
}
