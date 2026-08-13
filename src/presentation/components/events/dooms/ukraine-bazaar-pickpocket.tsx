/**
 * バザールですりに遭う。混み合う露店の合間で肩がぶつかった程度にしか
 * 感じなかったが、次の店に着いてはじめてポケットの軽さに気づいた。
 *
 * **すれ違う二人と、抜き取られる財布**だけで筋を見せる。
 * 動くのは、そっと抜き取られる財布1つだけ。
 */
export function UkraineBazaarPickpocket() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* にぎやかなバザール。 */}
      <rect width="400" height="210" fill="#8a7048" />
      <rect y="0" width="400" height="70" fill="#a8875a" />

      {/* 露店の屋根の列。 */}
      <g strokeLinejoin="round">
        <path d="M0,70 L40,48 L80,70z" fill="#0057B7" />
        <path d="M90,70 L130,46 L170,70z" fill="#FFD700" />
        <path d="M280,70 L320,48 L360,70z" fill="#c8102e" />
        <path d="M360,70 L400,50 L400,70z" fill="#0057B7" />
      </g>
      <g fill="#4a3624">
        <rect x="10" y="70" width="60" height="40" />
        <rect x="100" y="70" width="60" height="40" />
        <rect x="290" y="70" width="60" height="40" />
      </g>

      {/* 吊るされた品(刺繍布とひまわりの種の袋)。 */}
      <g fill="#c8102e">
        <rect x="24" y="80" width="8" height="14" />
        <rect x="40" y="80" width="8" height="14" />
        <rect x="56" y="80" width="8" height="14" />
      </g>
      <g fill="#d8b34a">
        <circle cx="120" cy="84" r="6" /><circle cx="136" cy="88" r="6" /><circle cx="150" cy="84" r="6" />
      </g>

      {/* 通りの地面と遠くの人影。 */}
      <rect y="110" width="400" height="100" fill="#6b5230" />
      <g fill="#4a3624" opacity="0.6">
        <ellipse cx="40" cy="180" rx="14" ry="26" />
        <ellipse cx="360" cy="176" rx="15" ry="28" />
      </g>

      {/* すれ違いざまに肩をぶつける人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M170,168 L162,198" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M182,168 L192,198" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M176,138 L176,172" stroke="#0057B7" strokeWidth="22" fill="none" />
        <circle cx="176" cy="126" r="11" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M188,146 L206,152" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      {/* 気づかず歩き続ける人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M226,170 L232,198" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M238,170 L230,198" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M232,140 L232,174" stroke="#c8102e" strokeWidth="22" fill="none" />
        <circle cx="232" cy="128" r="11" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M220,148 L204,144" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      {/* 抜き取られる財布。**ここだけが動く。** */}
      <g className="ubp-wallet">
        <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#5a4630" stroke="#241a10" strokeWidth="1.5" />
        <rect x="-8" y="-6" width="16" height="4" fill="#8a6a3a" />
      </g>

      <style>{`
        .ubp-wallet {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ubp-lift 2.4s ease-in-out infinite;
        }
        @keyframes ubp-lift {
          0%, 15%  { transform: translate(214px, 156px) rotate(0deg); opacity: 1; }
          55%      { transform: translate(190px, 138px) rotate(-18deg); opacity: 1; }
          85%, 100% { transform: translate(172px, 130px) rotate(-24deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ubp-wallet {
            animation: none;
            transform: translate(180px, 134px) rotate(-20deg);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
