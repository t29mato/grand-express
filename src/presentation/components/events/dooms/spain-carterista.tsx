/**
 * 市場ですりに遭う。混み合う市場で、オレンジを選んでいるあいだに
 * 肩掛け鞄から財布が抜かれていく(次の店まで気づかない)。
 *
 * 動き: 抜き取られていく財布・すりの目の泳ぎ・吊るしたハモンの揺れ・
 * 秤の皿の揺れ。買い物客はオレンジに夢中で動かない。
 */
export function SpainCarterista() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 市場のホールの中。鉄骨と天窓 */}
      <rect width="400" height="210" fill="#5a5044" />
      <rect width="400" height="60" fill="#4a4238" />
      <g stroke="#6e6254" strokeWidth="3" fill="none">
        <path d="M0,44 Q200,10 400,44" />
        <path d="M60,36 v-14 M200,22 v-14 M340,36 v-14" />
      </g>
      <rect x="150" y="8" width="100" height="8" rx="4" fill="#8fc4e8" opacity="0.5" />

      {/* 市場の屋台 */}
      <g>
        {/* 縞のひさし */}
        <path d="M10,72 h250 l-8,-18 H18z" fill="#3f8f6f" />
        <g fill="#f6efe2">
          <path d="M40,54 l-4,18 h22 l2,-18z" />
          <path d="M100,54 l-2,18 h22 l0,-18z" />
          <path d="M160,54 l0,18 h22 l-2,-18z" />
          <path d="M220,54 l2,18 h22 l-4,-18z" />
        </g>
        {/* 台と果物 */}
        <rect x="16" y="120" width="240" height="14" fill="#8a5a3a" />
        <rect x="24" y="134" width="224" height="42" fill="#6e4630" />
        {/* オレンジの山 */}
        <g fill="#f4941c">
          <circle cx="46" cy="114" r="7" />
          <circle cx="60" cy="114" r="7" />
          <circle cx="53" cy="106" r="7" />
          <circle cx="74" cy="114" r="7" />
          <circle cx="67" cy="106" r="7" />
        </g>
        {/* レモンの箱 */}
        <g fill="#f4c430">
          <circle cx="110" cy="114" r="6" />
          <circle cx="122" cy="114" r="6" />
          <circle cx="116" cy="107" r="6" />
        </g>
        {/* トマト */}
        <g fill="#e8443f">
          <circle cx="160" cy="114" r="6.5" />
          <circle cx="173" cy="114" r="6.5" />
          <circle cx="166" cy="106" r="6.5" />
        </g>
        {/* 吊るしたハモン(揺れる) */}
        <g transform="translate(226,72)">
          <g className="scar-jamon">
            <path d="M0,0 v8" stroke="#4a4436" strokeWidth="2" />
            <path d="M-6,8 q-4,22 6,30 q12,-6 8,-30 q-2,-8 -7,-8 q-5,0 -7,8z" fill="#8a3a2f" />
            <path d="M-3,10 q-2,16 5,24" stroke="#c98a5f" strokeWidth="2.5" fill="none" />
          </g>
        </g>
        {/* 秤 */}
        <g transform="translate(200,118)">
          <path d="M0,0 v-14 M-10,-14 h20" stroke="#c9922f" strokeWidth="2.5" />
          <g className="scar-scale">
            <path d="M-10,-14 v8 M-16,-2 a6,4 0 0 0 12,0z" stroke="#c9922f" strokeWidth="2" fill="#c9922f" />
          </g>
          <path d="M10,-14 v6 M4,-4 a6,4 0 0 0 12,0z" stroke="#c9922f" strokeWidth="2" fill="#c9922f" />
        </g>
      </g>

      {/* 床 */}
      <rect y="176" width="400" height="34" fill="#8a7b68" />
      <path d="M0,176 h400" stroke="#a8967e" strokeWidth="3" />

      {/* 買い物客(左)。オレンジを手に取って夢中 */}
      <g transform="translate(84,206)">
        <circle cx="0" cy="-72" r="12" fill="#e8b88a" />
        <path d="M-12,-76 a12,12 0 0 1 24,0 l2,3 h-28z" fill="#8a3a2f" />
        <circle cx="5" cy="-71" r="2" fill="#241a10" />
        <path d="M-13,-62 h26 l-3,40 h-20z" fill="#c8845f" />
        {/* オレンジへ伸ばす腕 */}
        <path d="M-10,-56 q-14,-8 -18,-24" stroke="#e8b88a" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="-28" cy="-82" r="5.5" fill="#f4941c" />
        {/* 肩掛け鞄(体の後ろ側) */}
        <path d="M8,-62 L20,-40" stroke="#5a4a38" strokeWidth="3" />
        <rect x="12" y="-42" width="22" height="18" rx="4" fill="#6e5a44" />
        {/* 抜かれていく財布 */}
        <g className="scar-wallet">
          <rect x="18" y="-38" width="14" height="10" rx="2" fill="#8a3a2f" />
          <rect x="18" y="-38" width="14" height="3.5" fill="#a8542f" />
        </g>
        <g fill="#3f3a30">
          <rect x="-8" y="-24" width="7" height="24" />
          <rect x="3" y="-24" width="7" height="24" />
        </g>
      </g>

      {/* すり(右)。人混みに紛れて手だけ伸ばす */}
      <g transform="translate(148,208)">
        <g className="scar-thief-body">
          <path d="M-12,-58 h24 l-2,36 h-20z" fill="#5f6673" />
          <circle cx="0" cy="-66" r="11" fill="#d9a273" />
          <path d="M-11,-64 a11,12 0 0 1 22,0 l0,-8 q-11,-6 -22,0z" fill="#3f4a5a" />
          <g className="scar-eyes">
            <circle cx="-4" cy="-66" r="2" fill="#241a10" />
            <circle cx="4" cy="-66" r="2" fill="#241a10" />
          </g>
          {/* 財布へ伸びる腕 */}
          <g className="scar-arm">
            <path d="M-10,-50 q-16,-2 -26,-8" stroke="#d9a273" strokeWidth="5.5" fill="none" strokeLinecap="round" />
          </g>
        </g>
        <g fill="#2f2a24">
          <rect x="-8" y="-22" width="7" height="22" />
          <rect x="3" y="-22" width="7" height="22" />
        </g>
      </g>

      {/* 人混み(右奥のシルエット) */}
      <g fill="#4a4238" opacity="0.9">
        <circle cx="300" cy="120" r="12" />
        <rect x="286" y="132" width="28" height="46" rx="8" />
        <circle cx="345" cy="126" r="11" />
        <rect x="332" y="137" width="26" height="42" rx="8" />
        <circle cx="380" cy="118" r="12" />
        <rect x="366" y="130" width="28" height="48" rx="8" />
      </g>

      <style>{`
        .scar-jamon { transform-box: fill-box; transform-origin: 50% 0%; animation: scar-swing 2.6s ease-in-out infinite; }
        .scar-scale { transform-box: fill-box; transform-origin: 50% 0%; animation: scar-tip 3.2s ease-in-out infinite; }
        .scar-wallet { animation: scar-lift 2.8s ease-in-out infinite; }
        .scar-arm { transform-box: fill-box; transform-origin: 100% 0%; animation: scar-reach 2.8s ease-in-out infinite; }
        .scar-thief-body { transform-box: fill-box; transform-origin: 50% 100%; animation: scar-lean 2.8s ease-in-out infinite; }
        .scar-eyes { animation: scar-dart 2.8s ease-in-out infinite; }
        @keyframes scar-swing {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes scar-tip {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-6deg); }
        }
        @keyframes scar-lift {
          0%, 20% { transform: translate(0, 0); }
          60% { transform: translate(9px, -7px) rotate(10deg); }
          85%, 100% { transform: translate(16px, -4px) rotate(16deg); }
        }
        @keyframes scar-reach {
          0%, 20% { transform: rotate(0deg); }
          60%, 85% { transform: rotate(-7deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes scar-lean {
          0%, 20% { transform: rotate(0deg); }
          60%, 85% { transform: rotate(-3deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes scar-dart {
          0%, 40%, 100% { transform: translateX(0); }
          55%, 75% { transform: translateX(-2.5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .scar-jamon, .scar-scale, .scar-wallet, .scar-arm,
          .scar-thief-body, .scar-eyes { animation: none; }
        }
      `}</style>
    </svg>
  );
}
