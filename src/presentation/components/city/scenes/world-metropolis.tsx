/**
 * 大都市(ニューヨーク、ロンドン、トロントなど)に重ねる動き。
 *
 * オフィスの窓の灯りが階ごとに入れ替わり、大通りを車のライトが流れ、
 * 高層階のガラスに日が反射して、屋上のうえを雲がわたる。
 * ビル・バス・道路は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldMetropolis() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 窓の灯り(静止画の窓 6x7 に重ねて入れ替わらせる) */}
      <g fill="#ffe6a0">
        <rect className="wmet-win wmet-a1" x="20" y="74" width="6" height="7" opacity="0.5" />
        <rect className="wmet-win wmet-a2" x="32" y="88" width="6" height="7" opacity="0.5" />
        <rect className="wmet-win wmet-a3" x="20" y="102" width="6" height="7" opacity="0.5" />
        <rect className="wmet-win wmet-a4" x="32" y="116" width="6" height="7" opacity="0.5" />
        <rect className="wmet-win wmet-a5" x="20" y="130" width="6" height="7" opacity="0.5" />
        <rect className="wmet-win wmet-a6" x="56" y="102" width="6" height="7" opacity="0.5" />
      </g>

      {/* ビルのガラスの反射(建物の柱に沿って光の帯を落とす) */}
      <g fill="#fff6d8">
        <rect className="wmet-sheen-a" x="80" y="46" width="34" height="104" opacity="0.1" />
        <rect className="wmet-sheen-b" x="156" y="34" width="40" height="116" opacity="0.09" />
        <rect className="wmet-sheen-c" x="122" y="78" width="26" height="72" opacity="0.1" />
      </g>

      {/* 太陽(336,30)の光の脈 */}
      <circle className="wmet-sun" cx="336" cy="30" r="20" fill="#ffe9a8" opacity="0.2" />

      {/* 大通りを流れる車のライト */}
      <g strokeLinecap="round" fill="none">
        <path className="wmet-car wmet-r1" d="M0,202h18" stroke="#ffe6a8" strokeWidth="3.6" opacity="0.75" />
        <path className="wmet-car wmet-r2" d="M0,202h13" stroke="#ffe6a8" strokeWidth="3" opacity="0.6" />
        <path className="wmet-car wmet-l1" d="M0,196h18" stroke="#f0938a" strokeWidth="3.4" opacity="0.65" />
      </g>

      {/* 流れる雲 */}
      <g fill="#f6efe2">
        <g className="wmet-cloud" opacity="0.3">
          <ellipse cx="220" cy="16" rx="17" ry="4.4" />
          <ellipse cx="209" cy="18" rx="10" ry="3" />
          <ellipse cx="231" cy="18" rx="11" ry="3" />
        </g>
      </g>

      <style>{`
        .wmet-win, .wmet-sheen-a, .wmet-sheen-b, .wmet-sheen-c,
        .wmet-sun, .wmet-car, .wmet-cloud {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .wmet-win { animation: wmet-lamp 7s ease-in-out infinite; }
        .wmet-a2 { animation-duration: 8.6s; animation-delay: -2s; }
        .wmet-a3 { animation-duration: 6.2s; animation-delay: -4s; }
        .wmet-a4 { animation-duration: 9.4s; animation-delay: -1s; }
        .wmet-a5 { animation-duration: 7.6s; animation-delay: -5.5s; }
        .wmet-a6 { animation-duration: 6.8s; animation-delay: -3s; }
        .wmet-sheen-a { transform-origin: 50% 0%; animation: wmet-sheen 15s ease-in-out infinite; }
        .wmet-sheen-b { transform-origin: 50% 0%; animation: wmet-sheen 19s ease-in-out infinite; animation-delay: -8s; }
        .wmet-sheen-c { transform-origin: 50% 0%; animation: wmet-sheen 13s ease-in-out infinite; animation-delay: -4s; }
        .wmet-sun { animation: wmet-pulse 10s ease-in-out infinite; }
        .wmet-car { transform-origin: 0% 50%; }
        .wmet-r1 { animation: wmet-right 5.5s linear infinite; }
        .wmet-r2 { animation: wmet-right 8s linear infinite; animation-delay: -3s; }
        .wmet-l1 { animation: wmet-left 7s linear infinite; animation-delay: -2s; }
        .wmet-cloud { animation: wmet-drift 82s linear infinite; }
        @keyframes wmet-lamp {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.62; }
        }
        @keyframes wmet-sheen {
          0%, 100% { transform: scaleY(0.15) translateY(30px); opacity: 0.04; }
          50% { transform: scaleY(0.5) translateY(6px); opacity: 0.18; }
        }
        @keyframes wmet-pulse {
          0%, 100% { transform: scale(0.84); opacity: 0.12; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
        @keyframes wmet-right {
          0% { transform: translateX(-30px); opacity: 0; }
          12%, 88% { opacity: 0.78; }
          100% { transform: translateX(420px); opacity: 0; }
        }
        @keyframes wmet-left {
          0% { transform: translateX(420px); opacity: 0; }
          12%, 88% { opacity: 0.68; }
          100% { transform: translateX(-30px); opacity: 0; }
        }
        @keyframes wmet-drift {
          0% { transform: translateX(-250px); }
          100% { transform: translateX(420px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wmet-win, .wmet-sheen-a, .wmet-sheen-b, .wmet-sheen-c,
          .wmet-sun, .wmet-car, .wmet-cloud { animation: none; }
        }
      `}</style>
    </svg>
  );
}
