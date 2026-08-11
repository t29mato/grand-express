/**
 * 市場ですりに遭う。混み合う露店の合間で肩がぶつかった程度にしか感じなかったが、
 * 次の店に着いてはじめてポケットの軽さに気づいた。市場はざわめきと人混みで
 * いっぱいで、近くの誰も何にも気づかなかった。
 *
 * **すれ違う二人と、抜き取られる財布**だけで筋を見せる。
 * 動くのは、そっと抜き取られる財布1つだけ。
 */
export function KoreaSomaechigi() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* にぎやかな市場。 */}
      <rect width="400" height="210" fill="#5a4a38" />
      <rect y="0" width="400" height="70" fill="#7a6448" />

      {/* 露店の屋根の列。 */}
      <g strokeLinejoin="round">
        <path d="M0,70 L40,50 L80,70z" fill="#c8102e" />
        <path d="M90,70 L130,48 L170,70z" fill="#f4c430" />
        <path d="M280,70 L320,50 L360,70z" fill="#1a4a8f" />
        <path d="M360,70 L400,52 L400,70z" fill="#c8102e" />
      </g>
      <g fill="#3a2e20">
        <rect x="10" y="70" width="60" height="40" />
        <rect x="100" y="70" width="60" height="40" />
        <rect x="290" y="70" width="60" height="40" />
      </g>
      {/* 吊るされた品物。 */}
      <g fill="#e8a860">
        <circle cx="30" cy="82" r="5" /><circle cx="44" cy="86" r="5" /><circle cx="58" cy="82" r="5" />
      </g>
      <g fill="#c8384f">
        <circle cx="120" cy="82" r="5" /><circle cx="134" cy="86" r="5" /><circle cx="148" cy="82" r="5" />
      </g>

      {/* 通りの地面と人混みのシルエット(遠景)。 */}
      <rect y="110" width="400" height="100" fill="#4a3c2c" />
      <g fill="#3a2e20" opacity="0.6">
        <ellipse cx="40" cy="180" rx="14" ry="26" />
        <ellipse cx="360" cy="176" rx="15" ry="28" />
      </g>

      {/* すり(すれ違いざまに肩をぶつける人)。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M170,168 L162,198" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M182,168 L192,198" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M176,138 L176,172" stroke="#4a4a52" strokeWidth="22" fill="none" />
        <circle cx="176" cy="126" r="11" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M188,146 L206,152" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      {/* 気づかず歩き続ける人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M226,170 L232,198" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M238,170 L230,198" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M232,140 L232,174" stroke="#5b8fe8" strokeWidth="22" fill="none" />
        <circle cx="232" cy="128" r="11" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M220,148 L204,144" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      {/* 抜き取られる財布。**ここだけが動く。** */}
      <g className="ksm-wallet">
        <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#8a5a3a" stroke="#241a10" strokeWidth="1.5" />
        <rect x="-8" y="-6" width="16" height="4" fill="#a8763a" />
      </g>

      <style>{`
        .ksm-wallet {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ksm-lift 2.4s ease-in-out infinite;
        }
        @keyframes ksm-lift {
          0%, 15%  { transform: translate(214px, 156px) rotate(0deg); opacity: 1; }
          55%      { transform: translate(190px, 138px) rotate(-18deg); opacity: 1; }
          85%, 100% { transform: translate(172px, 130px) rotate(-24deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ksm-wallet {
            animation: none;
            transform: translate(180px, 134px) rotate(-20deg);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
