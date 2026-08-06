/**
 * 9月。二つの海の嵐。
 *
 * 空に渦がふたつ。大西洋と西太平洋で同時に嵐が立ち、港は閉じる。
 * 灯台の光が回り、荷は岸壁に置かれたまま、船は錨を打って揺れている。
 */
export function World05() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空 */}
      <rect width="400" height="210" fill="#3f4a5a" />
      <rect width="400" height="92" fill="#333d4c" />

      {/* 二つの海の嵐。片方が光り、少し置いてもう片方が光る */}
      <g fill="#252d3c">
        <ellipse cx="76" cy="44" rx="52" ry="24" />
        <ellipse cx="34" cy="52" rx="30" ry="17" />
        <ellipse cx="122" cy="50" rx="34" ry="18" />
        <rect x="4" y="44" width="152" height="24" />
      </g>
      <g fill="#3b465a">
        <ellipse cx="70" cy="34" rx="38" ry="16" />
        <ellipse cx="106" cy="38" rx="24" ry="12" />
      </g>
      <path className="w05-bolt" d="M78,68 L64,96 L76,96 L62,124 L92,88 L79,88 L92,68z" fill="#f5e2a8" />

      <g fill="#252d3c">
        <ellipse cx="316" cy="36" rx="46" ry="21" />
        <ellipse cx="278" cy="44" rx="27" ry="15" />
        <ellipse cx="356" cy="42" rx="30" ry="16" />
        <rect x="252" y="36" width="136" height="22" />
      </g>
      <g fill="#3b465a">
        <ellipse cx="310" cy="26" rx="34" ry="14" />
        <ellipse cx="342" cy="30" rx="21" ry="11" />
      </g>
      <path className="w05-bolt w05-bolt2" d="M318,58 L306,82 L316,82 L304,108 L330,76 L319,76 L330,58z" fill="#f5e2a8" />

      {/* 荒れた海 */}
      <rect y="112" width="400" height="52" fill="#2a5670" />
      <path className="w05-swell" d="M0,120 q26,-13 52,0 q26,13 52,0 q26,-13 52,0 q26,13 52,0 q26,-13 52,0 q26,13 52,0 q26,-13 52,0 L400,166 L0,166z" fill="#35708f" />
      <path className="w05-swell w05-sw2" d="M0,132 q30,-11 60,0 q30,11 60,0 q30,-11 60,0 q30,11 60,0 q30,-11 60,0 q30,11 60,0 L400,168 L0,168z" fill="#2a5670" />
      <g fill="#cfe4f0">
        <path className="w05-spray" d="M162,122 q10,-20 22,-6 q10,-14 14,8 q-22,6 -36,-2z" />
        <path className="w05-spray w05-sp2" d="M282,128 q9,-18 20,-5 q9,-12 12,7 q-20,5 -32,-2z" />
      </g>

      {/* 岸壁 */}
      <rect y="160" width="400" height="50" fill="#4a4438" />
      <rect y="160" width="400" height="7" fill="#5c5646" />

      {/* 岩の上の灯台 */}
      <path d="M8,210 L14,168 L74,168 L80,210z" fill="#3a3a34" />
      <path d="M22,168 L34,96 L58,96 L70,168z" fill="#e0dbcd" />
      <g fill="#c93a3a">
        <path d="M31,118 L61,118 L63,132 L29,132z" />
        <path d="M25,150 L67,150 L69,164 L23,164z" />
      </g>
      <rect x="32" y="80" width="28" height="17" fill="#3a4453" />
      <rect x="36" y="82" width="20" height="13" fill="#f5e2a8" />
      <path d="M28,78 L64,78 L58,72 L34,72z" fill="#3a4453" />
      <g transform="translate(56,89)">
        <path className="w05-beam" d="M0,0 L186,-26 L186,30z" fill="#f5e2a8" opacity="0.22" />
      </g>

      {/* 錨を打って揺れている船 */}
      <g transform="translate(-8,0)">
        <g className="w05-ship">
          <path d="M212,148 L308,148 L296,166 L224,166z" fill="#3a4453" />
          <path d="M216,154 L304,154 L300,160 L220,160z" fill="#c2603c" />
          <rect x="244" y="132" width="34" height="16" fill="#e0dbcd" />
          <rect x="254" y="118" width="10" height="14" fill="#e8443f" />
          <rect x="254" y="118" width="10" height="4" fill="#2a2f38" />
          <rect x="230" y="124" width="2.6" height="24" fill="#2a2f38" />
        </g>
      </g>

      {/* 止まったクレーンと、置かれたままの荷 */}
      <g fill="#8a7a3c">
        <rect x="330" y="110" width="8" height="52" />
        <rect x="372" y="110" width="8" height="52" />
        <rect x="326" y="104" width="58" height="8" />
        <rect x="302" y="90" width="90" height="7" />
        <rect x="348" y="70" width="7" height="22" />
      </g>
      <g transform="translate(314,97)">
        <g className="w05-hook">
          <path d="M0,0 L0,22" stroke="#2f2b22" strokeWidth="2" fill="none" />
          <path d="M-9,22 L9,22 L9,31 L-9,31z" fill="#5c5646" />
        </g>
      </g>
      <g>
        <rect x="316" y="172" width="36" height="16" fill="#e8443f" />
        <rect x="354" y="172" width="32" height="16" fill="#f5b31c" />
        <rect x="326" y="190" width="36" height="16" fill="#3f8f7a" />
        <g fill="none" stroke="#2a251c" strokeWidth="1.4">
          <rect x="316" y="172" width="36" height="16" />
          <rect x="354" y="172" width="32" height="16" />
          <rect x="326" y="190" width="36" height="16" />
        </g>
      </g>

      {/* 横なぐりの雨 */}
      <g stroke="#bcd0dd" strokeWidth="1.6" strokeLinecap="round" opacity="0.6">
        <path className="w05-rain" d="M40,0 L26,22" />
        <path className="w05-rain w05-r2" d="M112,0 L98,22" />
        <path className="w05-rain w05-r3" d="M176,0 L162,22" />
        <path className="w05-rain w05-r4" d="M238,0 L224,22" />
        <path className="w05-rain w05-r5" d="M298,0 L284,22" />
        <path className="w05-rain w05-r6" d="M356,0 L342,22" />
        <path className="w05-rain w05-r7" d="M74,0 L60,22" />
        <path className="w05-rain w05-r8" d="M146,0 L132,22" />
        <path className="w05-rain w05-r9" d="M208,0 L194,22" />
        <path className="w05-rain w05-r10" d="M268,0 L254,22" />
        <path className="w05-rain w05-r11" d="M328,0 L314,22" />
        <path className="w05-rain w05-r12" d="M390,0 L376,22" />
      </g>

      <style>{`
        .w05-bolt {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: w05-flash 4.2s steps(1, end) infinite;
          opacity: 0;
        }
        .w05-bolt2 { animation-delay: -2.1s; }
        .w05-beam {
          transform-box: fill-box; transform-origin: 0 50%;
          animation: w05-sweep 6.4s ease-in-out infinite;
        }
        .w05-swell {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w05-heave 4.6s ease-in-out infinite;
        }
        .w05-sw2 { animation-delay: -2.3s; animation-duration: 5.4s; }
        .w05-spray {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w05-burst 3.4s ease-out infinite;
        }
        .w05-sp2 { animation-delay: -1.7s; animation-duration: 4s; }
        .w05-ship {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w05-pitch 4.6s ease-in-out infinite;
        }
        .w05-hook {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: w05-swing 5.6s ease-in-out infinite;
        }
        .w05-rain {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w05-pour 1.2s linear infinite;
        }
        .w05-r2 { animation-delay: -0.1s; }
        .w05-r3 { animation-delay: -0.2s; }
        .w05-r4 { animation-delay: -0.3s; }
        .w05-r5 { animation-delay: -0.4s; }
        .w05-r6 { animation-delay: -0.5s; }
        .w05-r7 { animation-delay: -0.6s; }
        .w05-r8 { animation-delay: -0.7s; }
        .w05-r9 { animation-delay: -0.8s; }
        .w05-r10 { animation-delay: -0.9s; }
        .w05-r11 { animation-delay: -1s; }
        .w05-r12 { animation-delay: -1.1s; }
        @keyframes w05-flash {
          0%, 3% { opacity: 1; }
          4%, 7% { opacity: 0; }
          8%, 11% { opacity: 1; }
          12%, 100% { opacity: 0; }
        }
        @keyframes w05-sweep {
          0%, 100% { transform: rotate(-10deg); opacity: 0.12; }
          50% { transform: rotate(10deg); opacity: 0.3; }
        }
        @keyframes w05-heave {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-16px, -7px); }
        }
        @keyframes w05-burst {
          0% { transform: translateY(10px) scale(0.4); opacity: 0; }
          35% { opacity: 0.9; }
          100% { transform: translateY(-26px) scale(1.4); opacity: 0; }
        }
        @keyframes w05-pitch {
          0%, 100% { transform: rotate(-3.5deg) translateY(0); }
          50% { transform: rotate(3.5deg) translateY(-5px); }
        }
        @keyframes w05-swing {
          0%, 100% { transform: rotate(-9deg); }
          50% { transform: rotate(9deg); }
        }
        @keyframes w05-pour {
          0% { transform: translate(30px, -26px); opacity: 0; }
          15%, 85% { opacity: 0.6; }
          100% { transform: translate(-160px, 224px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .w05-bolt, .w05-beam, .w05-swell, .w05-spray,
          .w05-ship, .w05-hook, .w05-rain { animation: none; }
          .w05-bolt { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
