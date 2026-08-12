/**
 * 雨で道がぬかるみに変わる。硬く締まっていたラテライトの道が
 * 赤い泥に変わり、タクシーの車輪を飲み込んでいる。
 *
 * 動くのは、斜めに降り続く雨脚1つだけ。
 */
export function GhanaMudroad() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨雲の空。 */}
      <rect width="400" height="210" fill="#6f8090" />
      <g fill="#8f9aa4" opacity="0.85">
        <ellipse cx="90" cy="36" rx="60" ry="16" />
        <ellipse cx="280" cy="24" rx="70" ry="16" />
      </g>

      {/* 赤いぬかるみの道。 */}
      <rect y="130" width="400" height="80" fill="#8a5a3f" />
      <ellipse cx="180" cy="176" rx="130" ry="26" fill="#6f4530" />

      {/* 沈んだタクシー。 */}
      <g strokeLinejoin="round">
        <rect x="120" y="140" width="120" height="34" rx="6" fill="#f5b31c" stroke="#20364a" strokeWidth="2.4" />
        <rect x="150" y="146" width="20" height="16" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.4" />
        <rect x="176" y="146" width="20" height="16" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.4" />
        <ellipse cx="140" cy="184" rx="12" ry="6" fill="#3a2418" opacity="0.8" />
        <ellipse cx="220" cy="184" rx="12" ry="6" fill="#3a2418" opacity="0.8" />
      </g>

      {/* 押している若者のシルエット。 */}
      <g fill="#4a4a52">
        <circle cx="256" cy="160" r="7" />
        <rect x="249" y="167" width="14" height="20" rx="3" />
      </g>

      {/* 斜めに降り続く雨脚。**ここだけが動く。** */}
      <g className="gmr-rain" stroke="#dfe8ee" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <path d="M40,0 L14,44" />
        <path d="M110,-10 L84,34" />
        <path d="M190,6 L164,50" />
        <path d="M270,-6 L244,38" />
        <path d="M350,10 L324,54" />
      </g>

      <style>{`
        .gmr-rain {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: gmr-fall 0.55s linear infinite;
        }
        @keyframes gmr-fall {
          0% { transform: translate(24px, -20px); }
          100% { transform: translate(-14px, 200px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gmr-rain { animation: none; opacity: 0.4; }
        }
      `}</style>
    </svg>
  );
}
