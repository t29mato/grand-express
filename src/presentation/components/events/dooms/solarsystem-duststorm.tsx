/**
 * 砂嵐が太陽電池パネルを覆う。火星の地表で、あめ色の空から
 * 舞い上がった砂塵の壁がパネルへ迫る。
 *
 * 動くのは、迫ってくる砂塵の壁1つだけ。
 */
export function SolarsystemDuststorm() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 火星の空と地表。 */}
      <rect width="400" height="210" fill="#c98a5a" />
      <rect y="130" width="400" height="80" fill="#b5502a" />
      <path d="M0,150 q60,-10 120,0t120,0t120,0t40,0v60H0z" fill="#9a4020" opacity="0.8" />

      {/* 探査車と太陽電池パネル。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="150" width="60" height="20" rx="4" fill="#c9d6f0" stroke="#20364a" strokeWidth="2" />
        <circle cx="70" cy="172" r="7" fill="#4a4436" />
        <circle cx="110" cy="172" r="7" fill="#4a4436" />
        <rect x="50" y="130" width="80" height="8" fill="#20364a" />
        <rect x="52" y="132" width="76" height="4" fill="#3f5f9a" />
      </g>

      {/* 迫ってくる砂塵の壁。**ここだけが動く。** */}
      <g className="sds-wall">
        <path d="M0,0 Q40,-20 80,0 Q120,-24 160,0 Q200,-18 240,0 L240,210 L0,210 Z" fill="#8a5a2a" opacity="0.88" />
        <path d="M0,20 Q40,0 80,20 Q120,-4 160,20 Q200,2 240,20" fill="none" stroke="#a86a34" strokeWidth="4" opacity="0.7" />
      </g>

      <style>{`
        .sds-wall {
          animation: sds-advance 3.5s linear infinite;
        }
        @keyframes sds-advance {
          0% { transform: translateX(400px); }
          100% { transform: translateX(-40px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sds-wall { animation: none; transform: translateX(160px); }
        }
      `}</style>
    </svg>
  );
}
