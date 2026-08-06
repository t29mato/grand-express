/**
 * 熟れたところを刈っては、その晩のうちに北へ移る刈り取り班に加わる(増)。
 *
 *   - コンバインが麦を刈り進み、刈り跡の帯が後ろに伸びていく
 *   - 排出筒から、並走するトレーラーへ麦が流れ込む
 *   - 積み終えたぶんだけ、日当の硬貨が跳ね上がる
 */
export function HarvestRunNorth() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 大きな空 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect width="400" height="52" fill="#7fb4dc" />
      <g fill="#f6efe2" opacity="0.85">
        <ellipse cx="72" cy="30" rx="30" ry="10" />
        <ellipse cx="52" cy="34" rx="18" ry="7" />
        <ellipse cx="308" cy="24" rx="34" ry="11" />
        <ellipse cx="336" cy="28" rx="20" ry="8" />
      </g>

      {/* 地平と麦畑 */}
      <rect y="92" width="400" height="118" fill="#e8c85c" />
      <rect y="92" width="400" height="8" fill="#d8b23c" />
      <g stroke="#d8b23c" strokeWidth="2" opacity="0.8">
        <path d="M0,112 L400,112 M0,132 L400,132" />
      </g>

      {/* 刈り跡の帯 */}
      <rect y="150" width="400" height="34" fill="#d8bc72" />
      <g stroke="#c2a45c" strokeWidth="2">
        <path d="M0,160 L400,160 M0,174 L400,174" />
      </g>
      <g fill="#c2a45c">
        <rect x="24" y="184" width="30" height="10" rx="5" />
        <rect x="140" y="190" width="30" height="10" rx="5" />
        <rect x="272" y="186" width="30" height="10" rx="5" />
      </g>

      {/* 立ったままの麦 */}
      <g stroke="#e0b83c" strokeWidth="2.4" strokeLinecap="round">
        <path className="hrn-stalk" d="M330,150 L330,132" />
        <path className="hrn-stalk hrn-s2" d="M346,150 L346,128" />
        <path className="hrn-stalk hrn-s3" d="M362,150 L362,134" />
        <path className="hrn-stalk hrn-s4" d="M378,150 L378,130" />
        <path className="hrn-stalk hrn-s5" d="M394,150 L394,133" />
      </g>

      {/* トレーラー */}
      <g transform="translate(92,164)">
        <rect x="-52" y="-38" width="104" height="34" rx="3" fill="#6b7f8a" />
        <rect x="-52" y="-42" width="104" height="6" rx="3" fill="#8f9aa8" />
        <path d="M-46,-38 q46,-12 92,0z" fill="#e8c85c" />
        <g fill="#2a2f38">
          <circle cx="-30" cy="0" r="9" />
          <circle cx="26" cy="0" r="9" />
        </g>
        <rect x="50" y="-24" width="26" height="7" rx="3" fill="#5f6b7a" />
      </g>

      {/* コンバイン */}
      <g transform="translate(230,164)">
        <rect x="-42" y="-48" width="76" height="34" rx="4" fill="#c93a3a" />
        <rect x="-6" y="-72" width="34" height="26" rx="4" fill="#8a2f2f" />
        <rect x="0" y="-66" width="22" height="14" fill="#bfe0f0" />
        <g fill="#2a2f38">
          <circle cx="-24" cy="-8" r="14" />
          <circle cx="24" cy="-6" r="9" />
        </g>
        <g fill="#8f9aa8">
          <circle cx="-24" cy="-8" r="5" />
          <circle cx="24" cy="-6" r="3.5" />
        </g>
        {/* 刈刃(リール) */}
        <g transform="translate(-58,-28)">
          <rect x="-16" y="-4" width="34" height="22" rx="3" fill="#8a2f2f" />
          <g className="hrn-reel">
            <path d="M0,0 L0,-14 M0,0 L12,7 M0,0 L-12,7" stroke="#e8dfc8" strokeWidth="3.4" strokeLinecap="round" />
          </g>
        </g>
        {/* 排出筒 */}
        <path d="M-38,-44 L-108,-56 L-108,-46 L-38,-36z" fill="#8a2f2f" />
      </g>

      {/* 流れ込む麦 */}
      <g fill="#f0d060" stroke="#c2a03c" strokeWidth="1.6">
        <ellipse className="hrn-grain" cx="124" cy="110" rx="10" ry="6" />
        <ellipse className="hrn-grain hrn-g2" cx="124" cy="110" rx="8" ry="5" />
        <ellipse className="hrn-grain hrn-g3" cx="124" cy="110" rx="11" ry="6.5" />
      </g>

      {/* 日当 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="hrn-coin-a" cx="200" cy="60" r="8" />
        <circle className="hrn-coin-b" cx="224" cy="46" r="7" />
        <circle className="hrn-coin-c" cx="178" cy="44" r="6" />
      </g>

      <style>{`
        .hrn-reel {
          transform-box: fill-box; transform-origin: center;
          animation: hrn-turn 1.4s linear infinite;
        }
        .hrn-stalk {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: hrn-sway 3.2s ease-in-out infinite;
        }
        .hrn-s2 { animation-delay: -0.5s; }
        .hrn-s3 { animation-delay: -1s; }
        .hrn-s4 { animation-delay: -1.5s; }
        .hrn-s5 { animation-delay: -2s; }
        .hrn-grain {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: hrn-pour 1.8s ease-in infinite;
        }
        .hrn-g2 { animation-delay: -0.6s; }
        .hrn-g3 { animation-delay: -1.2s; }
        .hrn-coin-a { animation: hrn-pop 2.8s ease-out infinite; }
        .hrn-coin-b { animation: hrn-pop 2.8s ease-out infinite; animation-delay: -0.9s; }
        .hrn-coin-c { animation: hrn-pop 2.8s ease-out infinite; animation-delay: -1.9s; }
        @keyframes hrn-turn {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes hrn-sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes hrn-pour {
          0% { transform: translate(0, -6px); opacity: 0; }
          20% { opacity: 1; }
          80% { transform: translate(-14px, 14px); opacity: 1; }
          100% { transform: translate(-16px, 20px); opacity: 0; }
        }
        @keyframes hrn-pop {
          0%, 32% { transform: translate(0, 32px); opacity: 0; }
          54% { transform: translate(0, 0); opacity: 1; }
          84% { transform: translate(0, -8px); opacity: 1; }
          100% { transform: translate(0, -20px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hrn-reel, .hrn-stalk, .hrn-grain,
          .hrn-coin-a, .hrn-coin-b, .hrn-coin-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
