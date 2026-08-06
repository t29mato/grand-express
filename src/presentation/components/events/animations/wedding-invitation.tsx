/**
 * 見知らぬ結婚式に引き込まれ、菓子と土産を持たされる。
 *
 * マリーゴールドの飾りが揺れ、ドールが鳴る。家人が旅人の腕をつかんで
 * 引き寄せ、菓子箱を押しつける。足元には土産、頭上に硬貨が舞い上がる。
 */
export function WeddingInvitation() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼下がりの通り */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="154" width="400" height="56" fill="#c9a877" />
      <rect y="154" width="400" height="4" fill="#b0895f" />

      {/* マリーゴールドの飾り紐 */}
      <g className="wedinv-bunting">
        <path
          d="M-10,10 Q200,60 410,10"
          fill="none"
          stroke="#3a7a4a"
          strokeWidth="3"
        />
        <g>
          <circle cx="32" cy="19" r="5" fill="#f5b31c" />
          <circle cx="74" cy="26" r="5" fill="#e8443f" />
          <circle cx="116" cy="31" r="5" fill="#f5b31c" />
          <circle cx="158" cy="34" r="5" fill="#e8443f" />
          <circle cx="200" cy="35" r="5" fill="#f5b31c" />
          <circle cx="242" cy="34" r="5" fill="#e8443f" />
          <circle cx="284" cy="31" r="5" fill="#f5b31c" />
          <circle cx="326" cy="26" r="5" fill="#e8443f" />
          <circle cx="368" cy="19" r="5" fill="#f5b31c" />
        </g>
      </g>

      {/* 婚礼の天蓋(マンダプ)と新郎新婦 */}
      <rect x="300" y="100" width="10" height="58" fill="#e8443f" />
      <rect x="356" y="100" width="10" height="58" fill="#e8443f" />
      <rect x="290" y="84" width="86" height="18" rx="3" fill="#f5b31c" />
      <g className="wedinv-fringe" fill="#e8443f">
        <circle cx="296" cy="104" r="4" />
        <circle cx="309" cy="104" r="4" />
        <circle cx="322" cy="104" r="4" />
        <circle cx="335" cy="104" r="4" />
        <circle cx="348" cy="104" r="4" />
        <circle cx="361" cy="104" r="4" />
        <circle cx="374" cy="104" r="4" />
      </g>
      <g className="wedinv-couple">
        {/* 花嫁 */}
        <path d="M310,158 L320,124 L330,158 z" fill="#e8443f" />
        <circle cx="320" cy="116" r="8" fill="#f6efe2" />
        <path d="M311,116 a9,9 0 0 1 18,0 l0,10 -18,0 z" fill="#c93a52" />
        <circle cx="320" cy="128" r="3" fill="#f5b31c" />
        {/* 花婿 */}
        <rect x="337" y="124" width="15" height="34" rx="4" fill="#f0e6d2" />
        <circle cx="344" cy="116" r="8" fill="#f6efe2" />
        <path d="M335,113 q9,-12 18,0 z" fill="#f5b31c" />
        <path d="M338,124 l6,10 6,-10" fill="none" stroke="#f5b31c" strokeWidth="3" />
      </g>

      {/* ドールを叩く人 */}
      <g>
        <rect x="42" y="152" width="9" height="24" fill="#3a3348" />
        <rect x="55" y="152" width="9" height="24" fill="#3a3348" />
        <rect x="40" y="116" width="26" height="40" rx="8" fill="#f6efe2" />
        <circle cx="53" cy="104" r="12" fill="#c08a5a" />
        <path d="M40,102 q0,-16 13,-16 q13,0 13,16 z" fill="#f5b31c" />
        <rect x="30" y="132" width="46" height="22" rx="11" fill="#8a5a2a" />
        <ellipse cx="31" cy="143" rx="5" ry="11" fill="#f0e6d2" />
        <ellipse cx="75" cy="143" rx="5" ry="11" fill="#f0e6d2" />
        <rect
          className="wedinv-stick-a"
          x="18"
          y="124"
          width="20"
          height="4"
          rx="2"
          fill="#6b4a2a"
        />
        <rect
          className="wedinv-stick-b"
          x="68"
          y="124"
          width="20"
          height="4"
          rx="2"
          fill="#6b4a2a"
        />
      </g>

      {/* 引き込む家人 */}
      <g>
        <rect x="205" y="152" width="9" height="24" fill="#3a3348" />
        <rect x="219" y="152" width="9" height="24" fill="#3a3348" />
        <rect x="203" y="112" width="27" height="44" rx="8" fill="#5b8fe8" />
        <circle cx="216" cy="98" r="13" fill="#c08a5a" />
        <path d="M203,97 a13,13 0 0 1 26,0 z" fill="#2a1f18" />
        {/* 旅人の腕をつかむ手 */}
        <g className="wedinv-pull">
          <rect x="168" y="118" width="40" height="9" rx="4.5" fill="#c08a5a" />
          <circle cx="169" cy="122" r="6" fill="#d19a68" />
        </g>
      </g>

      {/* 押しつけられる菓子箱 */}
      <g className="wedinv-sweets">
        <rect x="-17" y="-9" width="34" height="20" rx="3" fill="#f5b31c" />
        <rect x="-19" y="-14" width="38" height="7" rx="2" fill="#e09a10" />
        <circle cx="-8" cy="-18" r="5" fill="#e8843f" />
        <circle cx="2" cy="-19" r="5" fill="#e8843f" />
        <circle cx="12" cy="-18" r="5" fill="#e8843f" />
      </g>

      {/* 引っぱられる旅人 */}
      <g className="wedinv-guest">
        <rect x="139" y="154" width="9" height="22" fill="#3a3348" />
        <rect x="153" y="154" width="9" height="22" fill="#3a3348" />
        <rect x="124" y="118" width="16" height="30" rx="5" fill="#6b4a2a" />
        <rect x="137" y="114" width="27" height="44" rx="8" fill="#3a7a4a" />
        <circle cx="150" cy="100" r="13" fill="#f6efe2" />
        <path d="M137,99 a13,13 0 0 1 26,0 z" fill="#2a1f18" />
        <rect x="160" y="120" width="26" height="9" rx="4.5" fill="#f6efe2" />
      </g>

      {/* 足元の土産 */}
      <g>
        <rect x="100" y="160" width="28" height="18" rx="2" fill="#e8443f" />
        <rect x="112" y="160" width="5" height="18" fill="#f5b31c" />
        <rect x="100" y="167" width="28" height="4" fill="#f5b31c" />
      </g>

      {/* 得をした分の硬貨 */}
      <g transform="translate(150,84)">
        <g className="wedinv-coin wedinv-coin-a">
          <circle r="7" fill="#f5b31c" />
          <circle r="3.5" fill="#e09a10" />
        </g>
      </g>
      <g transform="translate(172,92)">
        <g className="wedinv-coin wedinv-coin-b">
          <circle r="6" fill="#f5b31c" />
          <circle r="3" fill="#e09a10" />
        </g>
      </g>
      <g transform="translate(130,94)">
        <g className="wedinv-coin wedinv-coin-c">
          <circle r="5" fill="#f5b31c" />
          <circle r="2.5" fill="#e09a10" />
        </g>
      </g>

      <style>{`
        .wedinv-bunting { animation: wedinv-sway 3.4s ease-in-out infinite; transform-origin: 200px 20px; }
        .wedinv-fringe { animation: wedinv-sway 2.6s ease-in-out infinite; transform-origin: 333px 100px; }
        .wedinv-couple { animation: wedinv-bob 2.8s ease-in-out infinite; }
        .wedinv-stick-a { animation: wedinv-beat 0.6s ease-in-out infinite; transform-origin: 38px 126px; }
        .wedinv-stick-b { animation: wedinv-beat 0.6s ease-in-out infinite reverse; transform-origin: 68px 126px; }
        .wedinv-pull { animation: wedinv-tug 1.8s ease-in-out infinite; }
        .wedinv-guest { animation: wedinv-drawn 1.8s ease-in-out infinite; transform-origin: 150px 176px; }
        .wedinv-sweets { transform: translate(190px, 140px); animation: wedinv-offer 1.8s ease-in-out infinite; }
        .wedinv-coin { animation: wedinv-rise 2.2s ease-out infinite; }
        .wedinv-coin-b { animation-delay: 0.5s; }
        .wedinv-coin-c { animation-delay: 1s; }
        @keyframes wedinv-sway {
          0%, 100% { transform: rotate(-1.2deg); }
          50% { transform: rotate(1.2deg); }
        }
        @keyframes wedinv-bob {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -3px); }
        }
        @keyframes wedinv-beat {
          0%, 100% { transform: rotate(-26deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes wedinv-tug {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-8px, 2px); }
        }
        @keyframes wedinv-drawn {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(4deg) translate(6px, 0); }
        }
        @keyframes wedinv-offer {
          0%, 100% { transform: translate(190px, 140px); }
          50% { transform: translate(180px, 136px); }
        }
        @keyframes wedinv-rise {
          0% { transform: translate(0, 0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(0, -46px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wedinv-bunting, .wedinv-fringe, .wedinv-couple, .wedinv-stick-a,
          .wedinv-stick-b, .wedinv-pull, .wedinv-guest, .wedinv-sweets,
          .wedinv-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
