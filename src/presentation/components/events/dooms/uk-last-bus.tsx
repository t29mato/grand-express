/**
 * 最終バスに乗り遅れる。バス停に着いたときには、バスはもう通りの向こうへ
 * 走り去っていく。雨の中を40分歩いて帰るしかない。
 *
 * バスは壊さず、**走り去る後ろ姿と、追いすがる腕**で「間に合わなかった」
 * ことを示す。動くのは、遠ざかるバスと降り続く雨、追いかける人の腕。
 */
export function UkLastBus() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の雨模様の空。 */}
      <rect width="400" height="210" fill="#2a3a4a" />
      <rect y="0" width="400" height="90" fill="#344656" />
      <circle cx="70" cy="40" r="16" fill="#dfe4e0" opacity="0.5" />

      {/* 街の建物のシルエット。 */}
      <g fill="#233240">
        <rect x="0" y="60" width="40" height="70" />
        <rect x="46" y="44" width="34" height="86" />
        <rect x="330" y="52" width="30" height="78" />
        <rect x="364" y="70" width="36" height="60" />
      </g>
      <g fill="#f5c25a" opacity="0.6">
        <rect x="8" y="70" width="6" height="6" />
        <rect x="20" y="86" width="6" height="6" />
        <rect x="54" y="56" width="6" height="6" />
        <rect x="66" y="72" width="6" height="6" />
      </g>

      {/* 街灯。 */}
      <rect x="150" y="90" width="4" height="50" fill="#4a4f56" />
      <circle cx="152" cy="88" r="8" fill="#f5c25a" opacity="0.8" />

      {/* 歩道と車道。 */}
      <rect y="130" width="400" height="20" fill="#4a4f56" />
      <rect y="150" width="400" height="60" fill="#2a2f36" />
      <g stroke="#8a8478" strokeWidth="3" strokeDasharray="16 12">
        <path d="M0,180 H400" />
      </g>

      {/* バス停の標識と人。 */}
      <rect x="60" y="126" width="4" height="42" fill="#c8383f" />
      <rect x="46" y="112" width="32" height="16" rx="2" fill="#c8383f" />
      <circle cx="62" cy="120" r="6" fill="#f6efe2" opacity="0.9" />

      {/* 走って追いかける人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="90" cy="150" r="9" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <path d="M90,158 L86,182" stroke="#3a3540" strokeWidth="7" fill="none" />
        <path d="M92,158 L100,180" stroke="#4a4550" strokeWidth="7" fill="none" />
        <path d="M90,162 L90,178" stroke="#5b8fe8" strokeWidth="10" fill="none" />
        <path className="ukb-arm" d="M92,164 L112,150" stroke="#d9a273" strokeWidth="6" fill="none" />
      </g>

      {/* 遠ざかるバス。**ここが動く。** */}
      <g className="ukb-bus" strokeLinejoin="round">
        <rect x="0" y="100" width="90" height="50" rx="3" fill="#c8383f" stroke="#20364a" strokeWidth="2" />
        <rect x="8" y="110" width="18" height="14" fill="#dfe8ee" opacity="0.85" />
        <rect x="30" y="110" width="18" height="14" fill="#dfe8ee" opacity="0.85" />
        <rect x="52" y="110" width="18" height="14" fill="#dfe8ee" opacity="0.85" />
        <rect x="8" y="128" width="18" height="14" fill="#dfe8ee" opacity="0.7" />
        <rect x="30" y="128" width="18" height="14" fill="#dfe8ee" opacity="0.7" />
        <circle cx="20" cy="152" r="7" fill="#2a2a30" />
        <circle cx="70" cy="152" r="7" fill="#2a2a30" />
        <rect x="-6" y="122" width="6" height="8" fill="#f5c25a" opacity="0.9" />
      </g>

      {/* 降り続く雨。**ここも動く。** */}
      <g className="ukb-rain" stroke="#9fc0d8" strokeWidth="1.6" opacity="0.6">
        <line x1="0" y1="0" x2="-6" y2="16" />
        <line x1="30" y1="0" x2="24" y2="16" />
        <line x1="60" y1="0" x2="54" y2="16" />
        <line x1="90" y1="0" x2="84" y2="16" />
        <line x1="120" y1="0" x2="114" y2="16" />
        <line x1="150" y1="0" x2="144" y2="16" />
        <line x1="180" y1="0" x2="174" y2="16" />
        <line x1="210" y1="0" x2="204" y2="16" />
        <line x1="240" y1="0" x2="234" y2="16" />
        <line x1="270" y1="0" x2="264" y2="16" />
        <line x1="300" y1="0" x2="294" y2="16" />
        <line x1="330" y1="0" x2="324" y2="16" />
        <line x1="360" y1="0" x2="354" y2="16" />
        <line x1="390" y1="0" x2="384" y2="16" />
      </g>

      <style>{`
        .ukb-bus {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: ukb-drive 3.2s ease-in infinite;
        }
        @keyframes ukb-drive {
          0%   { transform: translateX(60px) scale(1); opacity: 1; }
          70%  { transform: translateX(330px) scale(0.55); opacity: 0.9; }
          100% { transform: translateX(60px) scale(1); opacity: 1; }
        }
        .ukb-rain {
          transform-box: fill-box;
          animation: ukb-fall 0.7s linear infinite;
        }
        @keyframes ukb-fall {
          0%   { transform: translateY(70px); }
          100% { transform: translateY(150px); }
        }
        .ukb-arm {
          transform-box: fill-box;
          transform-origin: 92px 164px;
          animation: ukb-wave 0.5s ease-in-out infinite alternate;
        }
        @keyframes ukb-wave {
          from { transform: rotate(-8deg); }
          to   { transform: rotate(14deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ukb-bus { animation: none; transform: translateX(280px) scale(0.6); }
          .ukb-rain { animation: none; transform: translateY(120px); }
          .ukb-arm { animation: none; transform: rotate(4deg); }
        }
      `}</style>
    </svg>
  );
}
