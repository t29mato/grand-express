/**
 * 日焼け止めを忘れて日焼けする。痛がる表情までは描かず、
 * 肌の色がだんだん赤らむことと、あわてて日陰を探す仕草だけで示す。
 */
export function AustraliaSunburn() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 強い日差しの空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="70" fill="#cfe4f0" />

      {/* 照りつける太陽。じわじわ脈打たせる。 */}
      <g className="asb-sun" style={{ transformOrigin: "330px 46px" }}>
        <circle cx="330" cy="46" r="26" fill="#f5b31c" />
        <g stroke="#f5b31c" strokeWidth="3" strokeLinecap="round">
          <path d="M330,8 v10" />
          <path d="M330,84 v10" />
          <path d="M368,46 h-10" />
          <path d="M292,46 h-10" />
        </g>
      </g>

      {/* 砂浜と海。 */}
      <rect y="150" width="400" height="60" fill="#e8dcc0" />
      <rect y="140" width="400" height="14" fill="#3f8fc4" />

      {/* ビーチタオルの上で仰向けの人。肌の色を段階的に赤くする。 */}
      <g>
        <rect x="140" y="176" width="90" height="26" rx="4" fill="#f6efe2" opacity="0.6" />
        <ellipse className="asb-skin" cx="220" cy="182" rx="9" ry="9" />
        <path className="asb-skin" d="M150,190 q30,-14 60,0 q10,4 12,10 l-2,6 q-40,-10 -74,0 l-2,-6 q4,-6 6,-10z" />
      </g>

      {/* あわてて日陰を探して振る腕。 */}
      <g className="asb-fan" style={{ transformOrigin: "150px 190px" }}>
        <path d="M150,190 q-14,-8 -22,-20" stroke="#e8443f" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>

      <style>{`
        .asb-sun {
          transform-box: fill-box;
          animation: asb-pulse 1.6s ease-in-out infinite;
        }
        @keyframes asb-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.12); }
        }
        .asb-skin {
          animation: asb-redden 3s ease-in infinite alternate;
        }
        @keyframes asb-redden {
          0%   { fill: #f0c090; }
          100% { fill: #e0644a; }
        }
        .asb-fan {
          transform-box: fill-box;
          animation: asb-wave 0.6s ease-in-out infinite alternate;
        }
        @keyframes asb-wave {
          0%   { transform: rotate(-10deg); }
          100% { transform: rotate(16deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .asb-sun, .asb-fan {
            animation: none;
          }
          .asb-skin {
            animation: none;
            fill: #e0644a;
          }
        }
      `}</style>
    </svg>
  );
}
