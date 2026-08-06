/**
 * 旅立ちの前に「メサ」(菓子・羊毛・香草の束)を買って、パチャママに捧げて焚く。
 *
 *   - 石囲いの中でメサが燃え、煙が立ちのぼる
 *   - 跪いた人がコカの葉を落とす
 *   - 買い求めた分の硬貨が火にくべられて消える
 */
export function PachamamaOffering() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの高原 */}
      <rect width="400" height="210" fill="#2b3a55" />
      <g fill="#f6efe2">
        <circle className="pcha-star" cx="46" cy="28" r="2" />
        <circle className="pcha-star" cx="124" cy="16" r="1.6" />
        <circle className="pcha-star" cx="210" cy="34" r="2.2" />
        <circle className="pcha-star" cx="298" cy="20" r="1.8" />
        <circle className="pcha-star" cx="356" cy="44" r="2" />
      </g>
      <path d="M0,98 L58,52 L118,98z" fill="#38455e" />
      <path d="M96,98 L172,44 L248,98z" fill="#2f3c53" />
      <path d="M172,44 L190,62 L154,62z" fill="#94a6bc" />
      <path d="M226,98 L296,56 L366,98z" fill="#38455e" />
      <path d="M330,98 L380,66 L400,98z" fill="#2f3c53" />
      <rect y="96" width="400" height="114" fill="#463a2c" />

      {/* 立ちのぼる煙 */}
      <g>
        <circle className="pcha-smoke pcha-smoke-a" cx="208" cy="112" r="14" fill="#6f7684" />
        <circle className="pcha-smoke pcha-smoke-b" cx="194" cy="86" r="12" fill="#828a99" />
        <circle className="pcha-smoke pcha-smoke-c" cx="220" cy="70" r="13" fill="#5c626e" />
      </g>

      {/* 石囲い */}
      <g fill="#6e6760">
        <ellipse cx="164" cy="184" rx="15" ry="10" />
        <ellipse cx="192" cy="190" rx="16" ry="10" />
        <ellipse cx="222" cy="190" rx="16" ry="10" />
        <ellipse cx="250" cy="184" rx="15" ry="10" />
      </g>
      <ellipse cx="207" cy="180" rx="46" ry="14" fill="#2f2820" />

      {/* 束の奥で立ちのぼる炎 */}
      <g>
        <path className="pcha-flame pcha-flame-a" d="M186,178 C186,158 202,150 200,126 C216,142 222,162 214,178z" fill="#e8443f" />
        <path className="pcha-flame pcha-flame-b" d="M196,178 C196,162 208,156 206,140 C216,152 218,166 212,178z" fill="#f5b31c" />
      </g>

      {/* メサ(供物の束) */}
      <g transform="translate(207,172)">
        <ellipse cx="0" cy="0" rx="30" ry="10" fill="#c9a877" />
        <rect x="-20" y="-11" width="11" height="9" rx="2" fill="#f6efe2" />
        <rect x="-6" y="-13" width="11" height="11" rx="2" fill="#f6efe2" />
        <rect x="9" y="-10" width="10" height="8" rx="2" fill="#efe4cf" />
        <circle cx="-24" cy="-8" r="6" fill="#e8a2b8" />
        <circle cx="21" cy="-9" r="6" fill="#f6efe2" />
        <path d="M-14,-14 L-6,-26 L-2,-14z" fill="#4f9e4a" />
        <path d="M2,-14 L10,-24 L14,-14z" fill="#3f8a3c" />
      </g>

      {/* 手前をなめる炎 */}
      <g>
        <path className="pcha-flame pcha-flame-c" d="M228,178 C226,166 238,160 236,148 C246,160 246,172 242,178z" fill="#e8802f" />
        <path className="pcha-flame pcha-flame-d" d="M170,178 C168,168 180,162 178,150 C188,160 188,172 184,178z" fill="#e8802f" />
      </g>

      {/* 舞い落ちるコカの葉 */}
      <g fill="#4f9e4a">
        <path className="pcha-leaf pcha-leaf-a" d="M162,140 C168,134 176,136 178,142 C172,148 164,146 162,140z" />
        <path className="pcha-leaf pcha-leaf-b" d="M176,128 C182,122 190,124 192,130 C186,136 178,134 176,128z" />
        <path className="pcha-leaf pcha-leaf-c" d="M150,152 C156,146 164,148 166,154 C160,160 152,158 150,152z" />
      </g>

      {/* 火にくべる硬貨 */}
      <g fill="#f5b31c">
        <ellipse className="pcha-coin-a" cx="268" cy="128" rx="8" ry="7" />
        <ellipse className="pcha-coin-b" cx="292" cy="112" rx="7" ry="6" />
      </g>

      {/* 跪いて捧げる人 */}
      <g transform="translate(108,180)">
        <ellipse cx="4" cy="8" rx="30" ry="6" fill="#3a3024" />
        <rect x="-4" y="-6" width="34" height="12" rx="6" fill="#4a3a52" />
        <path d="M-22,-2 L-14,-42 L16,-42 L24,-2z" fill="#8a4a3f" />
        <rect x="-19" y="-30" width="41" height="5" fill="#e8a2b8" />
        <rect x="-20" y="-20" width="42" height="5" fill="#f5b31c" />
        <circle cx="0" cy="-52" r="12" fill="#c98a5e" />
        <path d="M-13,-54 a13,13 0 0 1 26,0 L11,-48 L-11,-48z" fill="#e8443f" />
        <rect x="-14" y="-52" width="6" height="14" rx="3" fill="#e8443f" />
        <rect x="8" y="-52" width="6" height="14" rx="3" fill="#e8443f" />
        <circle cx="-11" cy="-36" r="3.5" fill="#f5b31c" />
        <circle cx="11" cy="-36" r="3.5" fill="#f5b31c" />
        <g className="pcha-hand">
          <rect x="18" y="-42" width="26" height="8" rx="4" fill="#c98a5e" />
          <circle cx="46" cy="-38" r="6" fill="#c98a5e" />
        </g>
      </g>

      <style>{`
        .pcha-flame { transform-box: fill-box; transform-origin: 50% 100%; }
        .pcha-flame-a { animation: pcha-lick 0.7s ease-in-out infinite alternate; }
        .pcha-flame-b { animation: pcha-lick 0.5s ease-in-out infinite alternate-reverse; }
        .pcha-flame-c { animation: pcha-lick 0.6s ease-in-out infinite alternate; }
        .pcha-flame-d { animation: pcha-lick 0.45s ease-in-out infinite alternate-reverse; }
        .pcha-smoke { transform-box: fill-box; transform-origin: 50% 100%; }
        .pcha-smoke-a { animation: pcha-rise 4s ease-out infinite; }
        .pcha-smoke-b { animation: pcha-rise 4s ease-out infinite; animation-delay: -1.4s; }
        .pcha-smoke-c { animation: pcha-rise 4s ease-out infinite; animation-delay: -2.7s; }
        .pcha-leaf { transform-box: fill-box; transform-origin: 50% 50%; }
        .pcha-leaf-a { animation: pcha-fall 2.8s ease-in infinite; }
        .pcha-leaf-b { animation: pcha-fall 2.8s ease-in infinite; animation-delay: -1s; }
        .pcha-leaf-c { animation: pcha-fall 2.8s ease-in infinite; animation-delay: -1.9s; }
        .pcha-coin-a { animation: pcha-give 2.4s ease-in infinite; }
        .pcha-coin-b { animation: pcha-give 2.4s ease-in infinite; animation-delay: -1.1s; }
        .pcha-hand { transform-box: fill-box; transform-origin: 0 50%; animation: pcha-drop 2.8s ease-in-out infinite; }
        .pcha-star { animation: pcha-twinkle 3s ease-in-out infinite; }
        .pcha-star:nth-child(2n) { animation-delay: -1.5s; }
        @keyframes pcha-lick {
          from { transform: scaleY(0.8) skewX(6deg); }
          to { transform: scaleY(1.22) skewX(-7deg); }
        }
        @keyframes pcha-rise {
          0% { transform: translateY(44px) scale(0.25); opacity: 0.1; }
          30% { opacity: 0.75; }
          100% { transform: translateY(-46px) scale(1.6); opacity: 0; }
        }
        @keyframes pcha-fall {
          0% { transform: translate(-8px, -18px) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          60% { transform: translate(22px, 12px) rotate(140deg); }
          100% { transform: translate(46px, 34px) rotate(320deg); opacity: 0; }
        }
        @keyframes pcha-give {
          0% { transform: translate(40px, -26px); opacity: 0; }
          25% { opacity: 1; }
          80% { transform: translate(-56px, 44px); opacity: 1; }
          100% { transform: translate(-62px, 50px); opacity: 0; }
        }
        @keyframes pcha-drop {
          0%, 100% { transform: rotate(0deg); }
          45% { transform: rotate(-14deg); }
        }
        @keyframes pcha-twinkle {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pcha-flame-a, .pcha-flame-b, .pcha-flame-c, .pcha-flame-d,
          .pcha-smoke-a, .pcha-smoke-b, .pcha-smoke-c,
          .pcha-leaf-a, .pcha-leaf-b, .pcha-leaf-c,
          .pcha-coin-a, .pcha-coin-b, .pcha-hand, .pcha-star { animation: none; }
        }
      `}</style>
    </svg>
  );
}
