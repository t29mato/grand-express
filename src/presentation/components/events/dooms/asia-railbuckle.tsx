/**
 * 猛暑でレールが曲がる。鋼が伸びて、まっすぐだったはずのレールが
 * 横へゆるくたわんでいる。
 *
 * 人を描かず、**たわんだレールと簡易温度計**で異常な暑さを表す。
 * 動くのは、地面から立ちのぼる陽炎の帯だけ。
 */
export function AsiaRailbuckle() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灼けた空。 */}
      <rect width="400" height="210" fill="#e8c98f" />
      <rect y="0" width="400" height="70" fill="#f4dfb0" />
      <circle cx="330" cy="40" r="28" fill="#f5b31c" />
      <g stroke="#f5b31c" strokeWidth="3" opacity="0.7">
        <line x1="330" y1="0" x2="330" y2="10" />
        <line x1="290" y1="20" x2="298" y2="26" />
        <line x1="370" y1="20" x2="362" y2="26" />
      </g>

      {/* 砂利の地面。 */}
      <rect y="120" width="400" height="90" fill="#c9a877" />

      {/* たわんだレール(まっすぐな枕木の上を横に曲がって走る)。 */}
      <g strokeLinecap="round">
        {Array.from({ length: 20 }).map((_, i) => (
          <rect key={i} x={10 + i * 20} y="152" width="10" height="8" fill="#6b5330" />
        ))}
      </g>
      <path
        d="M10,156 Q80,140 140,156 Q200,172 260,156 Q320,140 390,156"
        stroke="#5c6a72"
        strokeWidth="5"
        fill="none"
      />
      <path
        d="M10,166 Q80,150 140,166 Q200,182 260,166 Q320,150 390,166"
        stroke="#8b8f98"
        strokeWidth="5"
        fill="none"
      />

      {/* 簡易温度計(ペンキ缶式)。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="90" width="4" height="60" fill="#4a4a52" />
        <rect x="50" y="80" width="24" height="16" rx="2" fill="#e8443f" stroke="#4a4a52" strokeWidth="2" />
        <rect x="55" y="130" width="14" height="14" rx="2" fill="#f6efe2" stroke="#4a4a52" strokeWidth="2" />
      </g>

      {/* 徐行の標識。 */}
      <g strokeLinejoin="round">
        <rect x="300" y="100" width="4" height="24" fill="#3a2f26" />
        <circle cx="302" cy="88" r="14" fill="#f5b31c" stroke="#3a2f26" strokeWidth="2" />
      </g>

      {/* 立ちのぼる陽炎。**ここだけが動く。** */}
      <g className="asia-heat-shimmer" stroke="#f6efe2" strokeWidth="2" opacity="0.5" fill="none">
        <path d="M120,190 q6,-14 0,-28 q-6,-14 0,-28" />
        <path d="M220,190 q6,-14 0,-28 q-6,-14 0,-28" />
        <path d="M340,190 q6,-14 0,-28 q-6,-14 0,-28" />
      </g>

      <style>{`
        .asia-heat-shimmer {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: asia-heat-shimmer-move 1.4s ease-in-out infinite;
        }
        @keyframes asia-heat-shimmer-move {
          0% { transform: translateY(4px) scaleY(0.9); opacity: 0.2; }
          50% { transform: translateY(-6px) scaleY(1.1); opacity: 0.6; }
          100% { transform: translateY(4px) scaleY(0.9); opacity: 0.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .asia-heat-shimmer { animation: none; }
        }
      `}</style>
    </svg>
  );
}
