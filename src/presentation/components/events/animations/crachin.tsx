/**
 * 降っているとも言えない霧雨に、二時間で全身濡れて油引きの合羽を買う(ブレスト)。
 *
 *   - 傘は出てこない。風が横から来るので、この街では役に立たない
 *   - 細かい雨が斜めに流れ、旅人の帽子の縁と裾からしずくが落ちる
 *   - 店先の黄色い合羽へ手を伸ばし、そのぶんの小銭が出ていく
 */
export function Crachin() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 低くたれこめた空 */}
      <rect width="400" height="210" fill="#6c7d84" />
      <rect y="52" width="400" height="26" fill="#7d8d92" />

      {/* 霧にかすむ町なみ */}
      <g fill="#5d6d74" opacity="0.85">
        <rect x="12" y="74" width="44" height="52" />
        <path d="M8,74 L34,56 L60,74z" />
        <rect x="66" y="84" width="34" height="42" />
        <path d="M62,84 L83,70 L104,84z" />
        <rect x="300" y="80" width="40" height="46" />
        <path d="M296,80 L320,64 L344,80z" />
      </g>
      <g fill="#4f5f66" opacity="0.7">
        <rect x="24" y="90" width="9" height="12" />
        <rect x="42" y="90" width="9" height="12" />
        <rect x="316" y="96" width="9" height="12" />
      </g>

      {/* 濡れた敷石 */}
      <rect y="126" width="400" height="84" fill="#4a5a56" />
      <path d="M0,150 Q120,142 240,152 Q330,159 400,148 L400,210 L0,210z" fill="#41504d" />
      <g stroke="#586a66" strokeWidth="2" opacity="0.6" fill="none">
        <path d="M0,168h400M0,186h400M0,204h400" />
      </g>
      {/* 路面の水たまり */}
      <g fill="#7d939a" opacity="0.5">
        <ellipse className="cra-puddle cra-u1" cx="96" cy="192" rx="40" ry="7" />
        <ellipse className="cra-puddle cra-u2" cx="300" cy="200" rx="46" ry="7" />
      </g>

      {/* 店先に吊るされた黄色い合羽 */}
      <g transform="translate(322,150)">
        <rect x="-46" y="-56" width="92" height="8" rx="3" fill="#3f4a44" />
        <rect x="-2" y="-48" width="4" height="8" fill="#3f4a44" />
        <g className="cra-oilskin">
          <path d="M-20,-40 L20,-40 L26,-2 L-26,-2z" fill="#f5b31c" />
          <path d="M-20,-40 L-30,-22 L-24,-18 L-16,-32z" fill="#e0a112" />
          <path d="M20,-40 L30,-22 L24,-18 L16,-32z" fill="#e0a112" />
          <path d="M-6,-40 L6,-40 L4,-2 L-4,-2z" fill="#e0a112" opacity="0.6" />
          <path d="M-14,-42 a14,10 0 0 1 28,0z" fill="#f5c53c" />
        </g>
      </g>

      {/* びしょ濡れの旅人 */}
      <g transform="translate(150,182)">
        {/* 脚 */}
        <rect x="-13" y="-2" width="11" height="24" rx="4" fill="#3b3550" />
        <rect x="3" y="-2" width="11" height="24" rx="4" fill="#3b3550" />
        {/* 肩をすくめた胴 */}
        <path d="M-19,0 L19,0 L15,-48 L-15,-48z" fill="#43608a" />
        {/* 手を伸ばす腕 */}
        <rect className="cra-arm" x="12" y="-44" width="40" height="10" rx="5" fill="#f6efe2" />
        {/* 顔 */}
        <circle cx="0" cy="-58" r="13" fill="#f6efe2" />
        <path d="M-6,-54 q6,-5 12,0" stroke="#2a2028" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="-5" cy="-62" r="1.8" fill="#2a2028" />
        <circle cx="5" cy="-62" r="1.8" fill="#2a2028" />
        {/* つばの垂れた帽子 */}
        <path d="M-16,-66 a16,13 0 0 1 32,0z" fill="#3f4a44" />
        <path d="M-22,-64 h44 q-4,6 -22,6 q-18,0 -22,-6z" fill="#354039" />
        {/* 帽子の縁から落ちるしずく */}
        <g fill="#bcd4d8">
          <circle className="cra-drip cra-d1" cx="-20" cy="-58" r="2" />
          <circle className="cra-drip cra-d2" cx="20" cy="-58" r="2" />
          <circle className="cra-drip cra-d3" cx="-15" cy="-2" r="1.8" />
          <circle className="cra-drip cra-d4" cx="15" cy="-2" r="1.8" />
        </g>
      </g>

      {/* 横なぐりの霧雨 */}
      <g stroke="#c4d8dc" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6">
        <path className="cra-mist cra-m1" d="M0,0 l-9,16" />
        <path className="cra-mist cra-m2" d="M60,0 l-9,16" />
        <path className="cra-mist cra-m3" d="M120,0 l-9,16" />
        <path className="cra-mist cra-m4" d="M180,0 l-9,16" />
        <path className="cra-mist cra-m5" d="M240,0 l-9,16" />
        <path className="cra-mist cra-m6" d="M300,0 l-9,16" />
        <path className="cra-mist cra-m7" d="M360,0 l-9,16" />
        <path className="cra-mist cra-m8" d="M30,0 l-9,16" />
        <path className="cra-mist cra-m9" d="M210,0 l-9,16" />
        <path className="cra-mist cra-m10" d="M330,0 l-9,16" />
      </g>

      {/* 合羽の代金 */}
      <g className="cra-coin cra-c1">
        <circle cx="238" cy="120" r="9" fill="#f5b31c" />
        <circle cx="238" cy="120" r="4.5" fill="#c98a0d" />
      </g>
      <g className="cra-coin cra-c2">
        <circle cx="222" cy="136" r="7.4" fill="#f5b31c" />
        <circle cx="222" cy="136" r="3.6" fill="#c98a0d" />
      </g>

      <style>{`
        .cra-puddle, .cra-oilskin, .cra-arm, .cra-drip, .cra-mist, .cra-coin {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .cra-puddle { animation: cra-ripple 4.4s ease-in-out infinite; }
        .cra-u2 { animation-duration: 5.6s; animation-delay: -2s; }
        .cra-oilskin { transform-origin: 50% 0%; animation: cra-swing 4s ease-in-out infinite; }
        .cra-arm { transform-origin: 0% 50%; animation: cra-reach 4s ease-in-out infinite; }
        .cra-drip { animation: cra-drip 1.8s ease-in infinite; }
        .cra-d2 { animation-delay: -0.6s; }
        .cra-d3 { animation-delay: -1.1s; }
        .cra-d4 { animation-delay: -1.5s; }
        .cra-mist { animation: cra-blow 1.6s linear infinite; }
        .cra-m2 { animation-duration: 1.9s; animation-delay: -0.4s; }
        .cra-m3 { animation-duration: 1.5s; animation-delay: -0.8s; }
        .cra-m4 { animation-duration: 2.1s; animation-delay: -1.2s; }
        .cra-m5 { animation-duration: 1.7s; animation-delay: -0.3s; }
        .cra-m6 { animation-duration: 2s; animation-delay: -1s; }
        .cra-m7 { animation-duration: 1.6s; animation-delay: -0.7s; }
        .cra-m8 { animation-duration: 2.2s; animation-delay: -1.5s; }
        .cra-m9 { animation-duration: 1.8s; animation-delay: -0.2s; }
        .cra-m10 { animation-duration: 2s; animation-delay: -1.3s; }
        .cra-coin { animation: cra-spend 2.8s ease-in infinite; }
        .cra-c2 { animation-delay: -1.4s; }
        @keyframes cra-ripple {
          0%, 100% { transform: scaleX(1); opacity: 0.35; }
          50% { transform: scaleX(1.08); opacity: 0.6; }
        }
        @keyframes cra-swing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes cra-reach {
          0%, 100% { transform: rotate(2deg) scaleX(1); }
          50% { transform: rotate(-9deg) scaleX(1.12); }
        }
        @keyframes cra-drip {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 0.85; }
          100% { transform: translateY(22px); opacity: 0; }
        }
        @keyframes cra-blow {
          0% { transform: translate(0, -20px); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.5; }
          100% { transform: translate(-124px, 216px); opacity: 0; }
        }
        @keyframes cra-spend {
          0% { transform: translate(0, 0); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(64px, 34px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cra-puddle, .cra-oilskin, .cra-arm, .cra-drip, .cra-mist, .cra-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
