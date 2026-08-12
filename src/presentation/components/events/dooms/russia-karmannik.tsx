/**
 * 満員の地下鉄でスリに遭う。吊り革につかまる乗客の後ろから伸びた手が、
 * 肩掛けバッグの留め具をそっと開けて財布を抜き取り、また引っ込む。
 */
export function RussiaKarmannik() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 車内の空気。 */}
      <rect width="400" height="210" fill="#4a4f5a" />
      <rect y="0" width="400" height="60" fill="#5a5f6a" />

      {/* 天井の吊り革バー。 */}
      <rect x="0" y="30" width="400" height="6" fill="#8a8f95" />
      <g stroke="#8a8f95" strokeWidth="3">
        <line x1="60" y1="36" x2="60" y2="60" />
        <line x1="160" y1="36" x2="160" y2="56" />
        <line x1="260" y1="36" x2="260" y2="60" />
        <line x1="340" y1="36" x2="340" y2="56" />
      </g>
      <g fill="none" stroke="#c8ccc4" strokeWidth="3">
        <path d="M52,60 a8,8 0 1,0 16,0" />
        <path d="M252,60 a8,8 0 1,0 16,0" />
      </g>

      {/* 混み合う乗客たち(背景、動かない)。 */}
      <g strokeLinejoin="round" strokeLinecap="round" opacity="0.85">
        <circle cx="60" cy="120" r="12" fill="#8a8478" stroke="#20364a" strokeWidth="1.8" />
        <rect x="46" y="132" width="28" height="46" rx="6" fill="#5a5f6a" stroke="#20364a" strokeWidth="1.8" />
        <circle cx="340" cy="122" r="12" fill="#9a8f70" stroke="#20364a" strokeWidth="1.8" />
        <rect x="326" y="134" width="28" height="44" rx="6" fill="#3f5a3a" stroke="#20364a" strokeWidth="1.8" />
      </g>

      {/* 主役の乗客(前景、中央)。 */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <circle cx="190" cy="110" r="14" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="172" y="124" width="36" height="60" rx="8" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        {/* 肩掛けバッグ。 */}
        <rect x="196" y="150" width="26" height="20" rx="3" fill="#8a6f4a" stroke="#20364a" strokeWidth="2" />
        <path d="M204,150 L182,128" stroke="#8a6f4a" strokeWidth="4" fill="none" />
      </g>

      {/* 後ろから伸びてくる手。 */}
      <g className="rk-hand" strokeLinejoin="round" strokeLinecap="round">
        <rect x="0" y="-4" width="30" height="10" rx="5" fill="#c98f5f" stroke="#20364a" strokeWidth="1.6" />
        {/* 財布(手と一緒に動く)。 */}
        <rect className="rk-wallet" x="18" y="-6" width="16" height="12" rx="2" fill="#5a3f2a" stroke="#20364a" strokeWidth="1.4" />
      </g>

      <style>{`
        .rk-hand {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: rk-reach 3.4s ease-in-out infinite;
        }
        @keyframes rk-reach {
          0%, 15% { transform: translate(230px, 168px) scaleX(0.3); opacity: 0; }
          35% { transform: translate(210px, 168px) scaleX(1); opacity: 1; }
          55% { transform: translate(210px, 168px) scaleX(1); opacity: 1; }
          80% { transform: translate(260px, 160px) scaleX(1); opacity: 1; }
          100% { transform: translate(300px, 150px) scaleX(1); opacity: 0; }
        }
        .rk-wallet {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: rk-fade 3.4s ease-in-out infinite;
        }
        @keyframes rk-fade {
          0%, 54% { opacity: 0; }
          58%, 100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rk-hand { animation: none; transform: translate(260px, 160px) scaleX(1); opacity: 1; }
          .rk-wallet { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
