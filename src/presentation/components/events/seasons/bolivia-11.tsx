/**
 * ボリビア 3月 — 海の日(Día del Mar)。
 *
 * 3月23日、内陸国が1879年から触れていない海のほうを向く。
 * 各都市で海軍の候補生が行進する。彼らの背後にあるのは、描かれた海だけ。
 */
export function Bolivia11() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      <defs>
        <clipPath id="diadelmar-sea-clip">
          <rect x="38" y="64" width="324" height="62" />
        </clipPath>
      </defs>

      {/* アンデスの空と山 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <g fill="#7f93b0">
        <path d="M0,64 L44,16 L88,64z" />
        <path d="M70,64 L124,8 L178,64z" />
        <path d="M160,64 L212,20 L264,64z" />
        <path d="M244,64 L302,10 L360,64z" />
        <path d="M336,64 L382,22 L400,50 L400,64z" />
      </g>
      <g fill="#f2f6fa">
        <path d="M28,36 L44,16 L60,36 L50,30 L40,40 L34,32z" />
        <path d="M106,28 L124,8 L142,28 L130,22 L120,34 L114,24z" />
        <path d="M196,38 L212,20 L228,38 L218,32 L208,44 L202,34z" />
        <path d="M284,30 L302,10 L320,30 L308,24 L298,36 L292,26z" />
      </g>

      {/* 描かれた海(壁画) */}
      <g clipPath="url(#diadelmar-sea-clip)">
        <rect x="38" y="64" width="324" height="62" fill="#2f6f9e" />
        <rect x="38" y="64" width="324" height="14" fill="#a8d8ee" />
        <circle cx="316" cy="76" r="9" fill="#f5e2a8" />
        {/* 船 */}
        <g className="diadelmar-ship">
          <path d="M176,100 L232,100 L224,110 L184,110z" fill="#2a3550" />
          <rect x="196" y="86" width="18" height="14" fill="#e8e2d2" />
          <rect x="202" y="76" width="6" height="12" fill="#c0392b" />
          <path d="M186,86 L186,66 L182,86z" fill="#2a3550" />
        </g>
        {/* 寄せる波 */}
        <g fill="#5b9cc4">
          <path
            className="diadelmar-wave-a"
            d="M-40,96 q20,-8 40,0 q20,8 40,0 q20,-8 40,0 q20,8 40,0 q20,-8 40,0 q20,8 40,0
               q20,-8 40,0 q20,8 40,0 q20,-8 40,0 q20,8 40,0 q20,-8 40,0 L480,132 L-40,132z"
          />
        </g>
        <g fill="#7cb8d8">
          <path
            className="diadelmar-wave-b"
            d="M-40,108 q22,-9 44,0 q22,9 44,0 q22,-9 44,0 q22,9 44,0 q22,-9 44,0 q22,9 44,0
               q22,-9 44,0 q22,9 44,0 q22,-9 44,0 q22,9 44,0 L480,132 L-40,132z"
          />
        </g>
        <g fill="#c6e3f0">
          <path
            className="diadelmar-wave-c"
            d="M-40,120 q18,-7 36,0 q18,7 36,0 q18,-7 36,0 q18,7 36,0 q18,-7 36,0 q18,7 36,0
               q18,-7 36,0 q18,7 36,0 q18,-7 36,0 q18,7 36,0 q18,-7 36,0 q18,7 36,0 L480,134 L-40,134z"
          />
        </g>
      </g>
      {/* 壁画の額縁と支柱 */}
      <g fill="#e8e2d2">
        <rect x="30" y="56" width="340" height="8" />
        <rect x="30" y="126" width="340" height="8" />
        <rect x="30" y="56" width="8" height="78" />
        <rect x="362" y="56" width="8" height="78" />
      </g>
      <g fill="#8a7a62">
        <rect x="46" y="134" width="8" height="18" />
        <rect x="346" y="134" width="8" height="18" />
      </g>

      {/* 広場 */}
      <rect y="146" width="400" height="64" fill="#b0a08c" />
      <rect y="146" width="400" height="5" fill="#9a8a76" />
      <rect y="186" width="400" height="24" fill="#a4947e" />

      {/* かもめ */}
      <g stroke="#f6efe2" strokeWidth="3" fill="none" strokeLinecap="round">
        <path className="diadelmar-gull-a" d="M0,0 q7,-7 13,0 q6,-7 13,0" />
        <path className="diadelmar-gull-b" d="M0,0 q5,-5 10,0 q5,-5 10,0" />
      </g>

      {/* 行進する海軍候補生 */}
      <g transform="translate(76,196) scale(0.8)">
        <g className="diadelmar-cadet-a">
          <rect className="diadelmar-leg-a" x="-9" y="-28" width="9" height="22" rx="2" fill="#f6efe2" />
          <rect className="diadelmar-leg-b" x="1" y="-28" width="9" height="22" rx="2" fill="#f6efe2" />
          <rect x="-11" y="-8" width="10" height="8" rx="2" fill="#2a2028" />
          <rect x="1" y="-8" width="10" height="8" rx="2" fill="#2a2028" />
          <rect x="-12" y="-54" width="24" height="28" rx="4" fill="#f6efe2" />
          <path d="M-12,-54 L12,-54 L4,-42 L0,-36 L-4,-42z" fill="#3b5fb8" />
          <rect x="-12" y="-34" width="24" height="4" fill="#2a3550" />
          <rect className="diadelmar-arm-a" x="-18" y="-52" width="8" height="24" rx="4" fill="#f6efe2" />
          <circle cx="0" cy="-63" r="9" fill="#c98a5e" />
          <rect x="-11" y="-78" width="22" height="10" rx="4" fill="#f6efe2" />
          <rect x="-12" y="-70" width="24" height="4" rx="2" fill="#2a2028" />
        </g>
      </g>
      <g transform="translate(134,196) scale(0.8)">
        <g className="diadelmar-cadet-b">
          <rect className="diadelmar-leg-b" x="-9" y="-28" width="9" height="22" rx="2" fill="#f6efe2" />
          <rect className="diadelmar-leg-a" x="1" y="-28" width="9" height="22" rx="2" fill="#f6efe2" />
          <rect x="-11" y="-8" width="10" height="8" rx="2" fill="#2a2028" />
          <rect x="1" y="-8" width="10" height="8" rx="2" fill="#2a2028" />
          <rect x="-12" y="-54" width="24" height="28" rx="4" fill="#f6efe2" />
          <path d="M-12,-54 L12,-54 L4,-42 L0,-36 L-4,-42z" fill="#3b5fb8" />
          <rect x="-12" y="-34" width="24" height="4" fill="#2a3550" />
          <rect className="diadelmar-arm-b" x="-18" y="-52" width="8" height="24" rx="4" fill="#f6efe2" />
          <circle cx="0" cy="-63" r="9" fill="#8a5c38" />
          <rect x="-11" y="-78" width="22" height="10" rx="4" fill="#f6efe2" />
          <rect x="-12" y="-70" width="24" height="4" rx="2" fill="#2a2028" />
        </g>
      </g>
      <g transform="translate(192,196) scale(0.8)">
        <g className="diadelmar-cadet-c">
          <rect className="diadelmar-leg-a" x="-9" y="-28" width="9" height="22" rx="2" fill="#f6efe2" />
          <rect className="diadelmar-leg-b" x="1" y="-28" width="9" height="22" rx="2" fill="#f6efe2" />
          <rect x="-11" y="-8" width="10" height="8" rx="2" fill="#2a2028" />
          <rect x="1" y="-8" width="10" height="8" rx="2" fill="#2a2028" />
          <rect x="-12" y="-54" width="24" height="28" rx="4" fill="#f6efe2" />
          <path d="M-12,-54 L12,-54 L4,-42 L0,-36 L-4,-42z" fill="#3b5fb8" />
          <rect x="-12" y="-34" width="24" height="4" fill="#2a3550" />
          <rect className="diadelmar-arm-a" x="-18" y="-52" width="8" height="24" rx="4" fill="#f6efe2" />
          <circle cx="0" cy="-63" r="9" fill="#e8c39e" />
          <rect x="-11" y="-78" width="22" height="10" rx="4" fill="#f6efe2" />
          <rect x="-12" y="-70" width="24" height="4" rx="2" fill="#2a2028" />
        </g>
      </g>

      {/* 旗手 */}
      <g transform="translate(272,198) scale(0.88)">
        <g className="diadelmar-cadet-d">
          <rect className="diadelmar-leg-b" x="-9" y="-28" width="9" height="22" rx="2" fill="#f6efe2" />
          <rect className="diadelmar-leg-a" x="1" y="-28" width="9" height="22" rx="2" fill="#f6efe2" />
          <rect x="-11" y="-8" width="10" height="8" rx="2" fill="#2a2028" />
          <rect x="1" y="-8" width="10" height="8" rx="2" fill="#2a2028" />
          <rect x="-12" y="-54" width="24" height="28" rx="4" fill="#f6efe2" />
          <path d="M-12,-54 L12,-54 L4,-42 L0,-36 L-4,-42z" fill="#3b5fb8" />
          <rect x="-12" y="-34" width="24" height="4" fill="#2a3550" />
          <circle cx="0" cy="-63" r="9" fill="#c98a5e" />
          <rect x="-11" y="-78" width="22" height="10" rx="4" fill="#f6efe2" />
          <rect x="-12" y="-70" width="24" height="4" rx="2" fill="#2a2028" />
          <rect x="6" y="-120" width="5" height="88" rx="2" fill="#8a6a48" />
          <rect x="8" y="-50" width="12" height="8" rx="4" fill="#f6efe2" />
          <g className="diadelmar-flag">
            <path
              d="M11,-118 q16,6 32,0 q16,-6 32,0 L75,-84 q-16,6 -32,0 q-16,-6 -32,0z"
              fill="#2f6f9e"
            />
            <path d="M11,-118 q16,6 32,0 q16,-6 32,0 L75,-108 q-16,6 -32,0 q-16,-6 -32,0z" fill="#f5b31c" />
            <path
              d="M40,-104 a5,5 0 1 1 6,0 L45,-92 M36,-96 q7,10 18,0 M34,-100 L52,-100"
              stroke="#f6efe2"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>

      <style>{`
        .diadelmar-cadet-a { transform-box: fill-box; transform-origin: 50% 100%; animation: diadelmar-march 0.9s ease-in-out infinite; }
        .diadelmar-cadet-b { transform-box: fill-box; transform-origin: 50% 100%; animation: diadelmar-march 0.9s ease-in-out infinite; animation-delay: -0.45s; }
        .diadelmar-cadet-c { transform-box: fill-box; transform-origin: 50% 100%; animation: diadelmar-march 0.9s ease-in-out infinite; }
        .diadelmar-cadet-d { transform-box: fill-box; transform-origin: 50% 100%; animation: diadelmar-march 0.9s ease-in-out infinite; animation-delay: -0.45s; }
        .diadelmar-leg-a { transform-box: fill-box; transform-origin: 50% 0; animation: diadelmar-step 0.9s ease-in-out infinite; }
        .diadelmar-leg-b { transform-box: fill-box; transform-origin: 50% 0; animation: diadelmar-step 0.9s ease-in-out infinite reverse; }
        .diadelmar-arm-a { transform-box: fill-box; transform-origin: 50% 0; animation: diadelmar-swing 0.9s ease-in-out infinite reverse; }
        .diadelmar-arm-b { transform-box: fill-box; transform-origin: 50% 0; animation: diadelmar-swing 0.9s ease-in-out infinite; }
        .diadelmar-flag { transform-box: fill-box; transform-origin: 0 50%; animation: diadelmar-furl 2.4s ease-in-out infinite; }
        .diadelmar-wave-a { animation: diadelmar-roll 7s linear infinite; }
        .diadelmar-wave-b { animation: diadelmar-roll 5s linear infinite; }
        .diadelmar-wave-c { animation: diadelmar-roll 3.4s linear infinite; }
        .diadelmar-ship { transform-box: fill-box; transform-origin: 50% 100%; animation: diadelmar-pitch 3.6s ease-in-out infinite; }
        .diadelmar-gull-a { transform: translate(70px, 34px); animation: diadelmar-glide 11s linear infinite; }
        .diadelmar-gull-b { transform: translate(250px, 22px); animation: diadelmar-glide 14s linear infinite; animation-delay: -6s; }
        @keyframes diadelmar-march {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes diadelmar-step {
          0%, 100% { transform: rotate(17deg); }
          50% { transform: rotate(-17deg); }
        }
        @keyframes diadelmar-swing {
          0%, 100% { transform: rotate(24deg); }
          50% { transform: rotate(-18deg); }
        }
        @keyframes diadelmar-furl {
          0%, 100% { transform: skewY(4deg) scaleY(1); }
          50% { transform: skewY(-4deg) scaleY(0.94); }
        }
        @keyframes diadelmar-roll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-80px); }
        }
        @keyframes diadelmar-pitch {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-3px) rotate(2deg); }
        }
        @keyframes diadelmar-glide {
          0% { transform: translate(-40px, 40px); }
          50% { transform: translate(200px, 22px); }
          100% { transform: translate(440px, 40px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .diadelmar-cadet-a, .diadelmar-cadet-b, .diadelmar-cadet-c, .diadelmar-cadet-d,
          .diadelmar-leg-a, .diadelmar-leg-b, .diadelmar-arm-a, .diadelmar-arm-b,
          .diadelmar-flag, .diadelmar-wave-a, .diadelmar-wave-b, .diadelmar-wave-c,
          .diadelmar-ship, .diadelmar-gull-a, .diadelmar-gull-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
