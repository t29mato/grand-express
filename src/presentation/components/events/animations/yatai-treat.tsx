/**
 * 福岡の屋台で話し込み、店主が代金を受け取ってくれない。
 *
 * 湯気の立つラーメン越しに、差し出した札と小銭を店主が手を振って押し返す。
 */
export function YataiTreat() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の川端 */}
      <rect width="400" height="210" fill="#1b2436" />
      <g fill="#141d2c">
        <rect x="0" y="18" width="46" height="86" />
        <rect x="352" y="8" width="48" height="96" />
      </g>
      <g fill="#f5b31c" opacity="0.65">
        <rect x="8" y="30" width="10" height="10" />
        <rect x="26" y="48" width="10" height="10" />
        <rect x="360" y="24" width="10" height="10" />
        <rect x="378" y="52" width="10" height="10" />
      </g>
      <rect y="96" width="400" height="26" fill="#22384f" />
      <g fill="#3d6a86" opacity="0.7">
        <rect x="30" y="100" width="8" height="18" />
        <rect x="120" y="104" width="8" height="14" />
        <rect x="286" y="100" width="8" height="18" />
      </g>
      <rect y="118" width="400" height="92" fill="#2c3444" />

      {/* 屋台の屋根と柱 */}
      <path d="M28,42 L372,42 L358,20 L42,20z" fill="#3b2f2a" />
      <rect x="24" y="42" width="352" height="8" fill="#54423a" />
      <rect x="44" y="50" width="11" height="120" fill="#54423a" />
      <rect x="346" y="50" width="11" height="120" fill="#54423a" />

      {/* のれん */}
      <g className="yt-noren" fill="#c23b32">
        <rect x="62" y="50" width="46" height="40" />
        <rect x="112" y="50" width="46" height="40" />
        <rect x="162" y="50" width="46" height="40" />
        <rect x="62" y="50" width="146" height="7" fill="#8f2a24" />
      </g>

      {/* 赤提灯 */}
      <g className="yt-lantern">
        <rect x="318" y="46" width="3" height="12" fill="#54423a" />
        <ellipse cx="320" cy="76" rx="19" ry="24" fill="#d94b3f" />
        <g fill="#8f2a24">
          <rect x="301" y="60" width="38" height="4" />
          <rect x="301" y="74" width="38" height="4" />
          <rect x="301" y="88" width="38" height="4" />
        </g>
      </g>

      {/* 店主 */}
      <g>
        <path d="M232,150 Q232,116 268,116 Q304,116 304,150z" fill="#f2efe6" />
        <circle cx="268" cy="94" r="19" fill="#f6efe2" />
        <rect x="248" y="80" width="40" height="9" rx="3" fill="#e8443f" />
        <path d="M248,84 L236,78 L240,90z" fill="#e8443f" />
        <circle cx="261" cy="96" r="2.6" fill="#2a2233" />
        <circle cx="276" cy="96" r="2.6" fill="#2a2233" />
        <path d="M261,105 Q268,111 276,105" stroke="#2a2233" strokeWidth="2" fill="none" strokeLinecap="round" />
        <g className="yt-wave">
          <rect x="212" y="118" width="42" height="12" rx="6" fill="#f2efe6" />
          <rect x="200" y="104" width="20" height="30" rx="9" fill="#f6efe2" />
          <g fill="#f6efe2">
            <rect x="200" y="98" width="6" height="12" rx="3" />
            <rect x="208" y="96" width="6" height="14" rx="3" />
            <rect x="216" y="98" width="6" height="12" rx="3" />
          </g>
        </g>
      </g>

      {/* 屋台の台 */}
      <rect x="20" y="146" width="360" height="12" fill="#a06c39" />
      <rect x="26" y="158" width="348" height="34" fill="#6b4629" />
      <g fill="#5a3a22">
        <rect x="100" y="158" width="4" height="34" />
        <rect x="230" y="158" width="4" height="34" />
      </g>
      <rect x="52" y="192" width="40" height="7" rx="3" fill="#4a3524" />
      <rect x="292" y="192" width="40" height="7" rx="3" fill="#4a3524" />

      {/* ラーメン */}
      <g>
        <path d="M84,120 L164,120 Q158,148 124,148 Q90,148 84,120z" fill="#f0efe6" />
        <rect x="84" y="120" width="80" height="8" fill="#c23b32" />
        <path d="M92,120 q10,-12 22,-4 q10,-12 22,-2 q10,-10 20,6z" fill="#e8d38a" />
        <circle cx="106" cy="118" r="7" fill="#f7f7f2" />
        <path d="M106,113 q6,4 0,10" stroke="#e58aa0" strokeWidth="2" fill="none" />
        <ellipse cx="142" cy="117" rx="10" ry="6" fill="#c9855c" />
        <g fill="#3f7a34">
          <circle cx="122" cy="114" r="3" />
          <circle cx="132" cy="122" r="3" />
        </g>
      </g>
      <g fill="none" stroke="#dfe8f0" strokeWidth="5" strokeLinecap="round" opacity="0.85">
        <path className="yt-s1" d="M104,110 q9,-14 0,-26 q-9,-12 0,-24" />
        <path className="yt-s2" d="M144,110 q9,-13 0,-24 q-9,-11 0,-22" />
      </g>

      {/* 押し返される代金 */}
      <g className="yt-money">
        <rect x="150" y="158" width="46" height="24" rx="2" fill="#e4e7c2" transform="rotate(-8 173 170)" />
        <circle cx="192" cy="160" r="9" fill="#f5b31c" />
        <circle cx="192" cy="160" r="4.5" fill="#d8930d" />
      </g>
      <g>
        <rect x="112" y="176" width="46" height="13" rx="6" fill="#5b8fe8" />
        <circle cx="156" cy="182" r="10" fill="#f6efe2" />
      </g>

      <style>{`
        .yt-wave { transform-origin: 252px 124px; animation: yt-refuse 1.6s ease-in-out infinite; }
        .yt-money { animation: yt-pushback 3.2s ease-in-out infinite; }
        .yt-noren { transform-origin: 135px 50px; animation: yt-sway 4s ease-in-out infinite; }
        .yt-lantern { transform-origin: 320px 46px; animation: yt-swing 4s ease-in-out infinite; }
        .yt-s1 { animation: yt-rise 3.4s ease-in infinite; }
        .yt-s2 { animation: yt-rise 3.4s ease-in infinite 1.7s; }
        @keyframes yt-refuse {
          0%, 100% { transform: rotate(-9deg); }
          50% { transform: rotate(11deg); }
        }
        @keyframes yt-pushback {
          0%, 100% { transform: translate(0, 0); }
          35% { transform: translate(26px, -4px); }
          55% { transform: translate(-14px, 2px); }
          75% { transform: translate(-4px, 0); }
        }
        @keyframes yt-sway {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(4deg); }
        }
        @keyframes yt-swing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes yt-rise {
          0% { transform: translate(0, 16px) scale(0.8); opacity: 0; }
          25% { opacity: 0.85; }
          100% { transform: translate(-8px, -54px) scale(1.15); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .yt-wave, .yt-money, .yt-noren, .yt-lantern, .yt-s1, .yt-s2 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
