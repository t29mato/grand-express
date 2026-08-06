/**
 * 夜のうちに山肌が滑り、物件をまるごと持っていく。
 *
 *   - 斜面に地滑りの跡(むき出しの土)が扇形に広がる
 *   - その真ん中で店が傾き、土砂と一緒にずるずる滑っている
 *   - 土くれが斜面を流れ落ち、裾では土煙が上がる
 */
export function BoliviaLandslide() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜空 */}
      <rect width="400" height="210" fill="#1e2a44" />
      <g fill="#f2efdc">
        <circle className="lsl-star lsl-star-a" cx="118" cy="34" r="2.5" />
        <circle className="lsl-star lsl-star-b" cx="164" cy="18" r="2" />
        <circle className="lsl-star lsl-star-c" cx="88" cy="72" r="2" />
        <circle className="lsl-star lsl-star-d" cx="196" cy="52" r="2.5" />
        <circle className="lsl-star lsl-star-e" cx="42" cy="96" r="2" />
      </g>
      <circle cx="58" cy="42" r="19" fill="#eae5cc" />
      <circle cx="64" cy="36" r="4" fill="#d6d0b4" />
      <circle cx="52" cy="50" r="3" fill="#d6d0b4" />

      {/* 谷底の集落 */}
      <rect y="176" width="400" height="34" fill="#25301f" />
      <g fill="#33402a">
        <rect x="12" y="158" width="34" height="20" />
        <rect x="54" y="164" width="28" height="14" />
      </g>
      <g fill="#f5b31c">
        <rect x="20" y="164" width="8" height="7" />
        <rect x="62" y="168" width="7" height="6" />
      </g>

      {/* 山肌 */}
      <path d="M104,210 L200,116 L288,62 L360,26 L400,12 L400,210z" fill="#2f3d33" />
      <path d="M200,116 L288,62 L360,26 L400,12 L400,26 L358,42 L288,78 L204,130z" fill="#3d4c40" />
      <g fill="#26332a">
        <ellipse cx="152" cy="176" rx="16" ry="10" />
        <ellipse cx="128" cy="196" rx="14" ry="9" />
        <ellipse cx="392" cy="72" rx="14" ry="9" />
      </g>

      {/* 崩れた跡 */}
      <path d="M316,58 L352,42 L350,210 L214,210z" fill="#6b5a3a" />
      <path d="M330,58 L352,46 L351,210 L306,210z" fill="#7d6a44" />

      {/* 流れ落ちる土くれ */}
      <g fill="#57503f">
        <path className="lsl-clod lsl-clod-a" d="M330,74 L342,70 L346,84 L334,89 L326,81z" />
        <path className="lsl-clod lsl-clod-b" d="M312,104 L322,101 L326,112 L316,117 L309,110z" />
        <path className="lsl-clod lsl-clod-c" d="M340,116 L350,113 L353,123 L344,127 L337,121z" />
        <path className="lsl-clod lsl-clod-d" d="M292,148 L303,145 L307,157 L296,161 L288,154z" />
        <path className="lsl-clod lsl-clod-e" d="M324,160 L333,158 L336,168 L327,171 L321,165z" />
      </g>

      {/* 滑り落ちる店 */}
      <g transform="translate(294,136) rotate(-17) scale(1.2)">
        <g className="lsl-shop">
          <rect x="-32" y="-6" width="64" height="8" fill="#6b4f34" />
          <rect x="-28" y="-38" width="56" height="34" fill="#d9976a" />
          <rect x="-8" y="-26" width="20" height="22" fill="#5a3f2c" />
          <rect x="-24" y="-32" width="12" height="10" fill="#f5b31c" />
          <rect x="-36" y="-46" width="72" height="9" rx="2" fill="#8a8279" />
          <g fill="#6e6760">
            <rect x="-30" y="-46" width="4" height="9" />
            <rect x="-14" y="-46" width="4" height="9" />
            <rect x="2" y="-46" width="4" height="9" />
            <rect x="18" y="-46" width="4" height="9" />
          </g>
          <g>
            <rect x="12" y="-42" width="26" height="8" fill="#e05252" />
            <rect x="12" y="-34" width="26" height="8" fill="#f6efe2" />
          </g>
          <g className="lsl-bulb">
            <rect x="-33" y="-46" width="2" height="12" fill="#4a4038" />
            <circle cx="-32" cy="-31" r="5" fill="#f5e08a" />
          </g>
        </g>
      </g>

      {/* 一緒に転がる荷物 */}
      <g>
        <g className="lsl-crate lsl-crate-a">
          <rect x="262" y="168" width="20" height="18" rx="2" fill="#a8916e" />
          <rect x="262" y="174" width="20" height="4" fill="#8a7355" />
        </g>
        <circle className="lsl-crate lsl-crate-b" cx="300" cy="182" r="7" fill="#4f9e4a" />
        <circle className="lsl-crate lsl-crate-c" cx="318" cy="192" r="6" fill="#e05252" />
      </g>

      {/* 裾の土砂と土煙 */}
      <path d="M196,210 Q248,166 302,180 Q356,194 386,210z" fill="#5a4a2e" />
      <g fill="#4a3d26">
        <circle cx="252" cy="190" r="13" />
        <circle cx="300" cy="192" r="11" />
        <circle cx="344" cy="200" r="10" />
      </g>
      <g fill="#a8967a">
        <g className="lsl-dust lsl-dust-a" opacity="0.4">
          <circle cx="236" cy="176" r="17" />
          <circle cx="258" cy="184" r="12" />
        </g>
        <g className="lsl-dust lsl-dust-b" opacity="0.3">
          <circle cx="308" cy="170" r="15" />
          <circle cx="330" cy="180" r="11" />
        </g>
        <g className="lsl-dust lsl-dust-c" opacity="0.24">
          <circle cx="190" cy="192" r="14" />
          <circle cx="212" cy="200" r="10" />
        </g>
      </g>

      <style>{`
        .lsl-shop { transform-box: fill-box; transform-origin: 50% 100%; animation: lsl-slip 3.2s ease-in-out infinite; }
        .lsl-bulb { transform-box: fill-box; transform-origin: 50% 0; animation: lsl-swing 1.5s ease-in-out infinite; }
        .lsl-clod { transform-box: fill-box; transform-origin: 50% 50%; }
        .lsl-clod-a { animation: lsl-slide 2.8s linear infinite; }
        .lsl-clod-b { animation: lsl-slide 2.8s linear infinite; animation-delay: -0.6s; }
        .lsl-clod-c { animation: lsl-slide 2.8s linear infinite; animation-delay: -1.1s; }
        .lsl-clod-d { animation: lsl-slide 2.8s linear infinite; animation-delay: -1.7s; }
        .lsl-clod-e { animation: lsl-slide 2.8s linear infinite; animation-delay: -2.3s; }
        .lsl-crate { transform-box: fill-box; transform-origin: 50% 50%; }
        .lsl-crate-a { animation: lsl-tumble 3.2s ease-in infinite; }
        .lsl-crate-b { animation: lsl-tumble 3.2s ease-in infinite; animation-delay: -1.2s; }
        .lsl-crate-c { animation: lsl-tumble 3.2s ease-in infinite; animation-delay: -2.2s; }
        .lsl-dust { transform-box: fill-box; transform-origin: 50% 100%; }
        .lsl-dust-a { animation: lsl-puff 3.6s ease-out infinite; }
        .lsl-dust-b { animation: lsl-puff 3.6s ease-out infinite; animation-delay: -1.3s; }
        .lsl-dust-c { animation: lsl-puff 3.6s ease-out infinite; animation-delay: -2.4s; }
        .lsl-star-a { animation: lsl-twinkle 3s ease-in-out infinite; }
        .lsl-star-b { animation: lsl-twinkle 3s ease-in-out infinite; animation-delay: -0.6s; }
        .lsl-star-c { animation: lsl-twinkle 3s ease-in-out infinite; animation-delay: -1.2s; }
        .lsl-star-d { animation: lsl-twinkle 3s ease-in-out infinite; animation-delay: -1.8s; }
        .lsl-star-e { animation: lsl-twinkle 3s ease-in-out infinite; animation-delay: -2.4s; }
        @keyframes lsl-slip {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          35% { transform: rotate(-3deg) translate(-3px, 4px); }
          70% { transform: rotate(2deg) translate(2px, 1px); }
        }
        @keyframes lsl-swing {
          0%, 100% { transform: rotate(-14deg); }
          50% { transform: rotate(14deg); }
        }
        @keyframes lsl-slide {
          0% { transform: translate(9px, -14px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(-28px, 46px) rotate(190deg); opacity: 0; }
        }
        @keyframes lsl-tumble {
          0% { transform: translate(14px, -34px) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          82% { opacity: 1; }
          100% { transform: translate(-24px, 26px) rotate(240deg); opacity: 0; }
        }
        @keyframes lsl-puff {
          0% { transform: translate(14px, 16px) scale(0.3); opacity: 0; }
          30% { opacity: 0.42; }
          100% { transform: translate(-24px, -22px) scale(1.6); opacity: 0; }
        }
        @keyframes lsl-twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lsl-shop, .lsl-bulb, .lsl-clod-a, .lsl-clod-b, .lsl-clod-c, .lsl-clod-d, .lsl-clod-e,
          .lsl-crate-a, .lsl-crate-b, .lsl-crate-c, .lsl-dust-a, .lsl-dust-b, .lsl-dust-c,
          .lsl-star-a, .lsl-star-b, .lsl-star-c, .lsl-star-d, .lsl-star-e { animation: none; }
        }
      `}</style>
    </svg>
  );
}
