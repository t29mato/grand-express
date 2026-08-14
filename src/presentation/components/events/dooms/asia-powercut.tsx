/**
 * 架線が停電する。電化区間を走る特急が駅と駅の間でじわじわ止まる。
 *
 * 人を描かず、**止まった列車と垂れた架線**で立ち往生を表す。
 * 動くのは、パンタグラフのあたりで明滅する火花だけ。
 */
export function AsiaPowercut() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の線路。 */}
      <rect width="400" height="210" fill="#1c2a3a" />
      <rect y="0" width="400" height="90" fill="#243a52" />

      {/* 遠くの山影。 */}
      <path d="M0,90 L60,50 L120,90z" fill="#16233a" />
      <path d="M300,90 L360,44 L400,90z" fill="#16233a" />

      {/* 架線柱。 */}
      <g stroke="#3a4a5c" strokeWidth="5">
        <line x1="40" y1="20" x2="40" y2="120" />
        <line x1="360" y1="20" x2="360" y2="120" />
      </g>
      <line x1="10" y1="30" x2="70" y2="30" stroke="#3a4a5c" strokeWidth="4" />
      <line x1="330" y1="30" x2="390" y2="30" stroke="#3a4a5c" strokeWidth="4" />

      {/* 垂れて途切れた架線。 */}
      <path d="M40,40 Q140,90 200,80 Q210,78 210,60" stroke="#5c6a72" strokeWidth="3" fill="none" />
      <path d="M215,58 Q260,70 360,40" stroke="#5c6a72" strokeWidth="3" fill="none" />

      {/* 地面。 */}
      <rect y="150" width="400" height="60" fill="#2a3a4a" />

      {/* 線路。 */}
      <g strokeLinecap="round">
        <rect x="0" y="176" width="400" height="4" fill="#16233a" />
        {Array.from({ length: 20 }).map((_, i) => (
          <rect key={i} x={i * 20} y="174" width="8" height="8" fill="#0f1826" />
        ))}
      </g>

      {/* 止まった電車。 */}
      <g strokeLinejoin="round">
        <rect x="120" y="120" width="160" height="40" rx="6" fill="#3a5a7a" stroke="#0f1826" strokeWidth="2" />
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={i} x={134 + i * 34} y="128" width="20" height="16" fill="#16233a" />
        ))}
        <circle cx="140" cy="164" r="8" fill="#0f1826" />
        <circle cx="260" cy="164" r="8" fill="#0f1826" />
        {/* パンタグラフ。 */}
        <path d="M180,120 L190,100 L200,108 L210,100 L220,120" fill="none" stroke="#8b8f98" strokeWidth="2" />
      </g>

      {/* 明滅する火花。**ここだけが動く。** */}
      <g className="asia-power-spark" fill="#f5b31c">
        <circle cx="200" cy="105" r="4" />
        <circle cx="206" cy="100" r="2.4" />
      </g>

      <style>{`
        .asia-power-spark {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: asia-power-spark-flicker 0.6s steps(2, jump-none) infinite;
        }
        @keyframes asia-power-spark-flicker {
          0% { opacity: 1; }
          50% { opacity: 0.1; }
          100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .asia-power-spark { animation: none; }
        }
      `}</style>
    </svg>
  );
}
