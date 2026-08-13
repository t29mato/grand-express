/**
 * 太陽フレアで電子機器が飛ぶ。太陽表面から放たれた光条が船体に届き、
 * 計器盤に火花が散る。
 *
 * 動くのは、船体に走る火花1つだけ。
 */
export function SolarsystemSolarflare() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 深宇宙。 */}
      <rect width="400" height="210" fill="#08101f" />
      <g fill="#f0ead6" opacity="0.7">
        <circle cx="40" cy="30" r="1.2" />
        <circle cx="90" cy="60" r="1" />
        <circle cx="360" cy="40" r="1.4" />
        <circle cx="320" cy="90" r="1" />
        <circle cx="20" cy="150" r="1.2" />
      </g>

      {/* 太陽(左端)と光条。 */}
      <circle cx="20" cy="105" r="46" fill="#f5b31c" />
      <g stroke="#ffdf9a" strokeWidth="3" opacity="0.85">
        <path d="M60,80 L200,50" />
        <path d="M64,105 L230,100" />
        <path d="M60,130 L200,160" />
      </g>

      {/* 探査機の船体(右寄り)。 */}
      <g strokeLinejoin="round">
        <rect x="260" y="90" width="80" height="34" rx="6" fill="#c9d6f0" stroke="#20364a" strokeWidth="2" />
        <rect x="230" y="100" width="30" height="6" fill="#c8a850" />
        <rect x="340" y="100" width="30" height="6" fill="#c8a850" />
        <rect x="292" y="70" width="16" height="20" fill="#8a92a0" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 計器盤にはねる火花。**ここだけが動く。** */}
      <g className="ssf-spark">
        <circle cx="300" cy="107" r="4" fill="#ffe08a" />
        <path d="M300,107 l10,-8 M300,107 l-8,-10 M300,107 l12,4 M300,107 l-4,12" stroke="#ffe08a" strokeWidth="2" strokeLinecap="round" />
      </g>

      <style>{`
        .ssf-spark {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ssf-flash 0.5s steps(2) infinite;
        }
        @keyframes ssf-flash {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(0.6); }
          100% { opacity: 1; transform: scale(1.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ssf-spark { animation: none; opacity: 0.8; }
        }
      `}</style>
    </svg>
  );
}
