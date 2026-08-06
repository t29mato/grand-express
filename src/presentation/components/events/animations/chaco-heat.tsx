/**
 * チャコの熱波でラジエーターが音を上げる。
 *
 * 45℃を超える乾いた低木林。ボンネットを開けた車から蒸気が噴き上がり、温度計は振り切れている。
 */
export function ChacoHeat() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灼ける空 */}
      <rect width="400" height="210" fill="#d9853a" />
      <rect y="112" width="400" height="38" fill="#c9773a" />

      {/* 太陽 */}
      <g transform="translate(322,36)">
        <g className="ch-rays" fill="#f5b31c" opacity="0.75">
          <path d="M-4,-52 L4,-52 L0,-34z" />
          <path d="M-4,52 L4,52 L0,34z" />
          <path d="M-52,-4 L-52,4 L-34,0z" />
          <path d="M52,-4 L52,4 L34,0z" />
          <path d="M-38,-32 L-32,-38 L-22,-22z" />
          <path d="M38,32 L32,38 L22,22z" />
          <path d="M32,-38 L38,-32 L22,-22z" />
          <path d="M-32,38 L-38,32 L-22,22z" />
        </g>
        <circle className="ch-sun" cx="0" cy="0" r="25" fill="#f5b31c" />
      </g>

      {/* 枯れた棘の林 */}
      <g stroke="#5a3f28" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M92,150 L92,96 M92,116 L74,100 M92,108 L110,92 M92,126 L106,116" />
        <path d="M372,150 L372,104 M372,122 L354,108 M372,114 L390,100" />
      </g>
      <g fill="#4a6b3c">
        <rect x="126" y="106" width="14" height="46" rx="7" />
        <rect x="112" y="120" width="10" height="22" rx="5" />
        <path d="M112,132 h16 v8 h-16z" />
        <rect x="144" y="116" width="10" height="26" rx="5" />
        <path d="M138,128 h16 v8 h-16z" />
      </g>

      {/* 乾いた地面 */}
      <rect y="148" width="400" height="62" fill="#a8703a" />
      <g stroke="#7d4f28" strokeWidth="2.5" fill="none">
        <path d="M0,178 L34,170 L60,182 L96,174" />
        <path d="M120,198 L156,190 L190,202 L232,194" />
        <path d="M282,172 L320,182 L358,172 L400,180" />
        <path d="M46,158 L58,166 M300,200 L316,192" />
      </g>

      {/* 立ちのぼる陽炎 */}
      <g stroke="#f6efe2" strokeWidth="3" fill="none" strokeLinecap="round">
        <path className="ch-shimmer-a" d="M60,164 q9,-8 18,0 t18,0" />
        <path className="ch-shimmer-b" d="M188,178 q9,-8 18,0 t18,0" />
        <path className="ch-shimmer-c" d="M300,168 q9,-8 18,0 t18,0" />
      </g>

      {/* 止まってしまった車 */}
      <g transform="translate(232,178)">
        <ellipse cx="-10" cy="8" rx="76" ry="7" fill="#7d4f28" opacity="0.6" />
        <rect x="0" y="-36" width="64" height="26" rx="3" fill="#4f7fbf" />
        <rect x="0" y="-36" width="64" height="6" fill="#3b6396" />
        <rect x="-42" y="-56" width="46" height="46" rx="5" fill="#4f7fbf" />
        <rect x="-36" y="-51" width="32" height="19" rx="3" fill="#cfe4f2" />
        <rect x="-80" y="-34" width="40" height="24" fill="#3b6396" />
        <rect x="-78" y="-30" width="30" height="16" rx="2" fill="#22252b" />
        <rect x="-74" y="-27" width="18" height="10" rx="2" fill="#7c8189" />
        <rect x="-84" y="-18" width="14" height="9" rx="2" fill="#8a9099" />
        {/* 開いたボンネット */}
        <g transform="translate(-40,-34) rotate(58)">
          <rect x="-40" y="-4" width="40" height="8" rx="3" fill="#4f7fbf" />
          <rect x="-40" y="-4" width="40" height="3" rx="1.5" fill="#6b98d1" />
        </g>
        <circle cx="-26" cy="-8" r="12" fill="#22252b" />
        <circle cx="42" cy="-8" r="12" fill="#22252b" />
        <circle cx="-26" cy="-8" r="4.5" fill="#8a9099" />
        <circle cx="42" cy="-8" r="4.5" fill="#8a9099" />
      </g>

      {/* 噴き上がる蒸気 */}
      <g transform="translate(166,140)">
        <circle className="ch-steam-a" cx="0" cy="0" r="9" fill="#f6efe2" />
        <circle className="ch-steam-b" cx="0" cy="0" r="7" fill="#f6efe2" />
        <circle className="ch-steam-c" cx="0" cy="0" r="8" fill="#f6efe2" />
        <circle className="ch-steam-d" cx="0" cy="0" r="6" fill="#f6efe2" />
      </g>

      {/* 振り切れた温度計 */}
      <g transform="translate(40,52)">
        <rect x="-9" y="-6" width="18" height="94" rx="9" fill="#3b2f2a" />
        <rect x="-7" y="-4" width="14" height="90" rx="7" fill="#f6efe2" />
        <circle cx="0" cy="88" r="15" fill="#3b2f2a" />
        <circle cx="0" cy="88" r="12" fill="#e8443f" />
        <rect className="ch-merc" x="-4" y="0" width="8" height="88" rx="4" fill="#e8443f" />
        <g stroke="#3b2f2a" strokeWidth="2.5">
          <path d="M4,10 h8 M4,26 h6 M4,42 h8 M4,58 h6 M4,74 h8" />
        </g>
      </g>

      {/* 帽子で扇ぐ人 */}
      <g transform="translate(342,196)">
        <ellipse cx="0" cy="2" rx="16" ry="5" fill="#7d4f28" opacity="0.6" />
        <rect x="-8" y="-22" width="7" height="22" rx="3" fill="#4a5b6b" />
        <rect x="2" y="-22" width="7" height="22" rx="3" fill="#4a5b6b" />
        <rect x="-11" y="-50" width="22" height="30" rx="7" fill="#f0e2c4" />
        <circle cx="0" cy="-59" r="10" fill="#f6efe2" />
        <path d="M-10,-61 Q0,-74 10,-61 Q0,-67 -10,-61z" fill="#3b2f4a" />
        <path d="M-11,-46 L-22,-34" stroke="#f6efe2" strokeWidth="6" strokeLinecap="round" />
        <g className="ch-fan">
          <ellipse cx="0" cy="0" rx="14" ry="4" fill="#c9a877" />
          <path d="M-7,-2 A7,7 0 0,1 7,-2z" fill="#c9a877" />
        </g>
      </g>

      <style>{`
        .ch-rays {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ch-turn 22s linear infinite;
        }
        .ch-sun {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ch-throb 2.6s ease-in-out infinite;
        }
        .ch-merc {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: scaleY(1);
          animation: ch-rise 4.5s ease-in-out infinite;
        }
        .ch-steam-a, .ch-steam-b, .ch-steam-c, .ch-steam-d {
          animation: ch-boil 2.4s ease-out infinite;
        }
        .ch-steam-a { transform: translate(-2px, -5px) scale(0.7); opacity: 0.8; }
        .ch-steam-b { transform: translate(-8px, -22px) scale(1.1); opacity: 0.55; animation-delay: 0.6s; }
        .ch-steam-c { transform: translate(-13px, -36px) scale(1.5); opacity: 0.35; animation-delay: 1.2s; }
        .ch-steam-d { transform: translate(-18px, -50px) scale(1.9); opacity: 0.16; animation-delay: 1.8s; }
        .ch-shimmer-a, .ch-shimmer-b, .ch-shimmer-c {
          opacity: 0.3;
          animation: ch-waver 3.2s ease-out infinite;
        }
        .ch-shimmer-b { animation-delay: 1.1s; }
        .ch-shimmer-c { animation-delay: 2.1s; }
        .ch-fan {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          transform: translate(-24px, -34px) rotate(-14deg);
          animation: ch-wave 1.1s ease-in-out infinite;
        }
        @keyframes ch-turn {
          to { transform: rotate(360deg); }
        }
        @keyframes ch-throb {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        @keyframes ch-rise {
          0% { transform: scaleY(0.34); }
          45%, 100% { transform: scaleY(1); }
          60% { transform: scaleY(0.96); }
        }
        @keyframes ch-boil {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0.85; }
          60% { transform: translate(-10px, -28px) scale(1.25); opacity: 0.45; }
          100% { transform: translate(-18px, -46px) scale(1.8); opacity: 0; }
        }
        @keyframes ch-waver {
          0% { transform: translate(0, 6px); opacity: 0; }
          30% { opacity: 0.4; }
          100% { transform: translate(0, -22px); opacity: 0; }
        }
        @keyframes ch-wave {
          0%, 100% { transform: translate(-24px, -34px) rotate(-30deg); }
          50% { transform: translate(-24px, -34px) rotate(6deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ch-rays, .ch-sun, .ch-merc,
          .ch-steam-a, .ch-steam-b, .ch-steam-c, .ch-steam-d,
          .ch-shimmer-a, .ch-shimmer-b, .ch-shimmer-c, .ch-fan { animation: none; }
        }
      `}</style>
    </svg>
  );
}
