/**
 * モンスーンが路盤を洗い流す。線路脇の細い流れが一夜で川になり、土手を
 * えぐった。バラストと枕木が宙にぶら下がっている。
 *
 * 人を描かず、**宙に浮いた枕木と濁流**で被害を表す。
 * 動くのは、降り続く雨脚の帯だけ。
 */
export function AsiaMonsoonwash() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った空。 */}
      <rect width="400" height="210" fill="#5a6a72" />
      <rect y="0" width="400" height="80" fill="#6f7f88" />

      {/* 遠景の木立。 */}
      <g fill="#3a5a3a" opacity="0.85">
        <ellipse cx="40" cy="80" rx="24" ry="18" />
        <ellipse cx="70" cy="86" rx="20" ry="16" />
        <ellipse cx="340" cy="78" rx="26" ry="18" />
      </g>

      {/* 地面(土手)。 */}
      <rect y="100" width="400" height="110" fill="#7a5f3f" />

      {/* えぐれた土手(欠けた形)。 */}
      <path d="M140,100 L140,140 Q180,170 220,140 L220,100z" fill="#5a6a72" />

      {/* 濁流。 */}
      <path d="M140,140 Q180,168 220,140 L220,210 L140,210z" fill="#8a6a3a" opacity="0.9" />
      <g stroke="#c9a877" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M150,160 q20,-6 40,0" />
        <path d="M155,180 q20,-6 40,0" />
      </g>

      {/* 宙にぶら下がる線路。 */}
      <g strokeLinecap="round">
        <rect x="40" y="118" width="340" height="4" fill="#5a4a3a" />
        {Array.from({ length: 18 }).map((_, i) => (
          <rect key={i} x={44 + i * 18} y="116" width="8" height="8" fill="#3a2f26" />
        ))}
      </g>

      {/* たわんだレール(えぐれた区間で下に垂れる)。 */}
      <path d="M140,120 Q180,150 220,120" stroke="#8b8f98" strokeWidth="4" fill="none" />

      {/* 降り続く雨脚。**ここだけが動く。** */}
      <g className="asia-rain-fall" stroke="#cfe4f0" strokeWidth="2" opacity="0.6">
        <line x1="60" y1="0" x2="40" y2="40" />
        <line x1="120" y1="0" x2="100" y2="40" />
        <line x1="260" y1="0" x2="240" y2="40" />
        <line x1="320" y1="0" x2="300" y2="40" />
        <line x1="380" y1="0" x2="360" y2="40" />
      </g>

      <style>{`
        .asia-rain-fall {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: asia-rain-fall-move 0.9s linear infinite;
        }
        @keyframes asia-rain-fall-move {
          0% { transform: translateY(-20px); opacity: 0.2; }
          50% { opacity: 0.7; }
          100% { transform: translateY(140px); opacity: 0.1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .asia-rain-fall { animation: none; }
        }
      `}</style>
    </svg>
  );
}
