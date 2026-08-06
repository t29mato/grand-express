/**
 * 夜のうちに斜面が崩れ、道が二百メートルほど失われる(減)。
 *
 *   - 山肌から土砂が流れ落ち、道が途中でぷつりと切れている
 *   - 手前でトラックが止まり、ライトが何もない空間を照らしている
 *   - 迂回は砂利道で一日半。待っているあいだにも金は出ていく
 */
export function RoadWashedOut() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨の空 */}
      <rect width="400" height="210" fill="#4f5a5e" />
      <rect width="400" height="60" fill="#444e52" />

      {/* 山肌 */}
      <path d="M0,60 L84,14 L168,66 L246,26 L330,72 L400,40 L400,150 L0,150z" fill="#5c6350" />
      <path d="M168,66 L246,26 L330,72 L400,40 L400,150 L168,150z" fill="#525944" />

      {/* 崩れた土砂 */}
      <path d="M188,66 L236,60 L272,150 L162,150z" fill="#7a6a48" />
      <path d="M204,72 L242,68 L262,150 L182,150z" fill="#8f7d54" />
      <g fill="#6b5c3c">
        <circle className="rwo-rock" cx="216" cy="120" r="9" />
        <circle className="rwo-rock rwo-k2" cx="240" cy="104" r="7" />
        <circle className="rwo-rock rwo-k3" cx="196" cy="132" r="6" />
      </g>

      {/* 道。途中で切れている */}
      <rect y="150" width="400" height="26" fill="#6b6b60" />
      <rect y="150" width="400" height="5" fill="#7f7f72" />
      <path d="M148,150 L276,150 L262,176 L162,176z" fill="#8f7d54" />
      <g stroke="#e8dfc8" strokeWidth="4" strokeDasharray="20 18" fill="none" opacity="0.8">
        <path d="M0,164 L142,164" />
        <path d="M282,164 L400,164" />
      </g>
      <rect y="176" width="400" height="34" fill="#3f4438" />

      {/* 止まったトラック */}
      <g transform="translate(78,176)">
        <rect x="-52" y="-40" width="54" height="34" rx="4" fill="#3f6b8a" />
        <rect x="2" y="-30" width="32" height="24" rx="3" fill="#33566e" />
        <rect x="8" y="-26" width="20" height="12" fill="#bfe0f0" />
        <g fill="#2a2f38">
          <circle cx="-34" cy="-4" r="9" />
          <circle cx="18" cy="-4" r="9" />
        </g>
        <circle className="rwo-lamp" cx="36" cy="-16" r="6" fill="#f5e2a8" />
        <path className="rwo-beam" d="M40,-16 L106,-40 L106,6z" fill="#f5e2a8" opacity="0.26" />
      </g>

      {/* 通行止めの標識 */}
      <g transform="translate(150,176)">
        <rect x="-4" y="-46" width="8" height="46" fill="#8f9aa8" />
        <circle cx="0" cy="-56" r="16" fill="#c93a3a" />
        <rect x="-11" y="-59" width="22" height="7" rx="3" fill="#f6efe2" />
      </g>

      {/* 雨 */}
      <g stroke="#bcd0dd" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <path className="rwo-rain" d="M40,0 L30,22" />
        <path className="rwo-rain rwo-r2" d="M110,0 L100,22" />
        <path className="rwo-rain rwo-r3" d="M180,0 L170,22" />
        <path className="rwo-rain rwo-r4" d="M250,0 L240,22" />
        <path className="rwo-rain rwo-r5" d="M320,0 L310,22" />
        <path className="rwo-rain rwo-r6" d="M384,0 L374,22" />
        <path className="rwo-rain rwo-r7" d="M74,0 L64,22" />
        <path className="rwo-rain rwo-r8" d="M146,0 L136,22" />
        <path className="rwo-rain rwo-r9" d="M214,0 L204,22" />
        <path className="rwo-rain rwo-r10" d="M286,0 L276,22" />
      </g>

      {/* 迂回のあいだに出ていく金 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="rwo-coin-a" cx="330" cy="112" r="8" />
        <circle className="rwo-coin-b" cx="330" cy="112" r="7" />
      </g>

      <style>{`
        .rwo-rock {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: rwo-tumble 3.6s ease-in infinite;
        }
        .rwo-k2 { animation-delay: -1.2s; animation-duration: 4.2s; }
        .rwo-k3 { animation-delay: -2.4s; animation-duration: 3.2s; }
        .rwo-lamp { animation: rwo-blink 2.4s ease-in-out infinite; }
        .rwo-beam { animation: rwo-blink 2.4s ease-in-out infinite; }
        .rwo-rain {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: rwo-pour 1.2s linear infinite;
        }
        .rwo-r2 { animation-delay: -0.12s; }
        .rwo-r3 { animation-delay: -0.24s; }
        .rwo-r4 { animation-delay: -0.36s; }
        .rwo-r5 { animation-delay: -0.48s; }
        .rwo-r6 { animation-delay: -0.6s; }
        .rwo-r7 { animation-delay: -0.72s; }
        .rwo-r8 { animation-delay: -0.84s; }
        .rwo-r9 { animation-delay: -0.96s; }
        .rwo-r10 { animation-delay: -1.08s; }
        .rwo-coin-a { animation: rwo-spend 3.4s ease-in infinite; }
        .rwo-coin-b { animation: rwo-spend 3.4s ease-in infinite; animation-delay: -1.7s; }
        @keyframes rwo-tumble {
          0% { transform: translate(0, -34px) rotate(0deg); opacity: 0; }
          16% { opacity: 1; }
          78% { transform: translate(-14px, 26px) rotate(220deg); opacity: 1; }
          92%, 100% { transform: translate(-18px, 34px) rotate(260deg); opacity: 0; }
        }
        @keyframes rwo-blink {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.45; }
        }
        @keyframes rwo-pour {
          0% { transform: translate(20px, -24px); opacity: 0; }
          16%, 84% { opacity: 0.55; }
          100% { transform: translate(-100px, 220px); opacity: 0; }
        }
        @keyframes rwo-spend {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          18% { opacity: 1; }
          100% { transform: translate(56px, 64px) scale(0.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rwo-rock, .rwo-lamp, .rwo-beam, .rwo-rain,
          .rwo-coin-a, .rwo-coin-b { animation: none; opacity: 1; }
          .rwo-beam { opacity: 0.26; }
        }
      `}</style>
    </svg>
  );
}
