/**
 * 動かない「コラ」に巻き込まれる。橋の上、故障したトラックの先で車の列が
 * 三つの交差点ぶん止まったまま。エンジンを切って待つほかない炎天下、
 * 車の屋根から陽炎が立ちのぼる。
 *
 * 動くのは、立ちのぼる陽炎(複数の波線)だけ。
 */
export function VenezuelaColaDeTransito() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 炎天下の空。 */}
      <rect width="400" height="210" fill="#bcd8ea" />
      <circle cx="340" cy="40" r="26" fill="#f5b31c" />

      {/* 橋の欄干。 */}
      <rect y="150" width="400" height="60" fill="#8a8478" />
      <g stroke="#6b6a60" strokeWidth="3">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={20 + i * 40} y1="150" x2={20 + i * 40} y2="130" />
        ))}
      </g>
      <rect y="126" width="400" height="6" fill="#6b6a60" />

      {/* 故障したトラック(奥)。 */}
      <g strokeLinejoin="round">
        <rect x="300" y="152" width="70" height="30" rx="3" fill="#c9302c" stroke="#20364a" strokeWidth="2" />
        <rect x="308" y="158" width="20" height="14" fill="#cfe4f0" />
        <circle cx="316" cy="184" r="6" fill="#20364a" />
        <circle cx="356" cy="184" r="6" fill="#20364a" />
      </g>
      {/* 煙(トラックのボンネットから)。 */}
      <g fill="#9aa0a8" opacity="0.7">
        <circle cx="300" cy="150" r="6" />
        <circle cx="292" cy="140" r="8" />
        <circle cx="298" cy="128" r="6" />
      </g>

      {/* 止まった車の列。 */}
      <g strokeLinejoin="round">
        <rect x="40" y="160" width="60" height="24" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <rect x="48" y="164" width="16" height="10" fill="#cfe4f0" />
        <circle cx="52" cy="186" r="6" fill="#20364a" />
        <circle cx="86" cy="186" r="6" fill="#20364a" />

        <rect x="120" y="158" width="58" height="26" rx="4" fill="#f5b31c" stroke="#20364a" strokeWidth="2" />
        <rect x="128" y="163" width="16" height="10" fill="#cfe4f0" />
        <circle cx="132" cy="186" r="6" fill="#20364a" />
        <circle cx="166" cy="186" r="6" fill="#20364a" />

        <rect x="200" y="160" width="60" height="24" rx="4" fill="#e8443f" stroke="#20364a" strokeWidth="2" />
        <rect x="208" y="164" width="16" height="10" fill="#cfe4f0" />
        <circle cx="212" cy="186" r="6" fill="#20364a" />
        <circle cx="246" cy="186" r="6" fill="#20364a" />
      </g>

      {/* 陽炎。**ここだけが動く。** */}
      <g stroke="#f6efe2" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75">
        <path className="vct-haze vct-haze-1" d="M60,158 q6,-10 0,-20 q-6,-10 0,-20" />
        <path className="vct-haze vct-haze-2" d="M148,156 q6,-10 0,-20 q-6,-10 0,-20" />
        <path className="vct-haze vct-haze-3" d="M228,158 q6,-10 0,-20 q-6,-10 0,-20" />
      </g>

      <style>{`
        .vct-haze {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vct-rise 1.6s ease-in-out infinite;
        }
        .vct-haze-2 { animation-delay: 0.4s; }
        .vct-haze-3 { animation-delay: 0.8s; }
        @keyframes vct-rise {
          0% { transform: translateY(6px) scaleY(0.6); opacity: 0.2; }
          50% { transform: translateY(-10px) scaleY(1); opacity: 0.8; }
          100% { transform: translateY(-24px) scaleY(1.2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vct-haze { animation: none; opacity: 0.4; }
        }
      `}</style>
    </svg>
  );
}
