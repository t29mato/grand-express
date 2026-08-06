/**
 * ラダックの僧院に泊めてもらう。バター茶と寝床、宿代は受け取らない。
 *
 * タルチョ(祈祷旗)がはためく僧院の下で、僧が湯気の立つ椀を差し出し、
 * もう一方の手で旅人の硬貨を押し返す。傍らには丸めた寝具。
 */
export function MonasteryHospitality() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高地の夕暮れ */}
      <rect width="400" height="210" fill="#2c4a68" />
      <circle cx="352" cy="32" r="13" fill="#f0e6d2" />
      <g className="monast-stars" fill="#f0e6d2">
        <circle cx="46" cy="26" r="2" />
        <circle cx="118" cy="16" r="1.6" />
        <circle cx="196" cy="34" r="2" />
        <circle cx="286" cy="20" r="1.6" />
        <circle cx="322" cy="60" r="1.6" />
      </g>

      {/* 奥の山 */}
      <g fill="#3c5f80">
        <path d="M0,150 L62,60 L124,150 z" />
        <path d="M96,150 L164,44 L232,150 z" />
      </g>
      <g fill="#dce8f0">
        <path d="M48,82 L62,60 L76,82 L66,76 L56,80 z" />
        <path d="M150,68 L164,44 L178,68 L168,62 L158,66 z" />
      </g>

      {/* 岩の上の僧院 */}
      <path d="M226,168 L250,104 L392,104 L400,168 z" fill="#3a4a55" />
      <rect x="248" y="62" width="132" height="42" fill="#efe4cf" />
      <rect x="248" y="62" width="132" height="10" fill="#8a3a2a" />
      <rect x="288" y="36" width="56" height="28" fill="#efe4cf" />
      <rect x="288" y="36" width="56" height="8" fill="#8a3a2a" />
      <path d="M284,36 L316,20 L348,36 z" fill="#f5b31c" />
      <g className="monast-glow" fill="#f5b31c">
        <rect x="258" y="80" width="12" height="16" rx="1" />
        <rect x="282" y="80" width="12" height="16" rx="1" />
        <rect x="306" y="80" width="12" height="16" rx="1" />
        <rect x="330" y="80" width="12" height="16" rx="1" />
        <rect x="354" y="80" width="12" height="16" rx="1" />
        <rect x="304" y="46" width="24" height="12" rx="1" />
      </g>

      {/* タルチョ */}
      <path d="M252,98 Q148,124 44,74" fill="none" stroke="#26404f" strokeWidth="2" />
      <g className="monast-flags">
        <rect className="monast-flag" x="226" y="102" width="11" height="15" fill="#5b8fe8" />
        <rect className="monast-flag" x="205" y="105" width="11" height="15" fill="#f6efe2" />
        <rect className="monast-flag" x="184" y="107" width="11" height="15" fill="#e8443f" />
        <rect className="monast-flag" x="163" y="107" width="11" height="15" fill="#3a7a4a" />
        <rect className="monast-flag" x="143" y="105" width="11" height="15" fill="#f5b31c" />
        <rect className="monast-flag" x="122" y="102" width="11" height="15" fill="#5b8fe8" />
        <rect className="monast-flag" x="101" y="97" width="11" height="15" fill="#f6efe2" />
        <rect className="monast-flag" x="80" y="91" width="11" height="15" fill="#e8443f" />
        <rect className="monast-flag" x="59" y="83" width="11" height="15" fill="#3a7a4a" />
      </g>

      {/* 中庭 */}
      <rect y="150" width="400" height="60" fill="#464a3e" />
      <rect y="150" width="400" height="4" fill="#565a4a" />

      {/* 用意された寝床 */}
      <g>
        <rect x="258" y="170" width="46" height="15" rx="7.5" fill="#c9a877" />
        <ellipse cx="258" cy="177" rx="5" ry="7.5" fill="#a8875a" />
        <ellipse cx="304" cy="177" rx="5" ry="7.5" fill="#e0c79c" />
      </g>

      {/* 僧 */}
      <g>
        <path d="M197,186 L203,134 L227,134 L233,186 z" fill="#8a3a2a" />
        <path d="M203,134 L227,134 L224,152 L206,152 z" fill="#a8482f" />
        <circle cx="215" cy="122" r="12" fill="#e0b58a" />
        <path d="M203,120 a12,12 0 0 1 24,0 z" fill="#c99a70" />
        {/* 椀を差し出す腕 */}
        <rect x="172" y="142" width="34" height="10" rx="5" fill="#8a3a2a" />
        <circle cx="172" cy="147" r="6" fill="#e0b58a" />
        {/* いらない、と押し返す手 */}
        <g className="monast-refuse">
          <rect x="200" y="122" width="26" height="9" rx="4.5" fill="#8a3a2a" />
          <circle cx="200" cy="126" r="7" fill="#e0b58a" />
        </g>
      </g>

      {/* バター茶と湯気 */}
      <g>
        <path d="M158,138 L180,138 L177,154 L161,154 z" fill="#f0e6d2" />
        <rect x="158" y="138" width="22" height="4" fill="#c9a877" />
      </g>
      <g className="monast-steam" fill="none" stroke="#cfe0ea" strokeWidth="2.5" strokeLinecap="round">
        <path className="monast-steam-a" d="M164,134 q-4,-8 0,-16" />
        <path className="monast-steam-b" d="M172,134 q4,-9 0,-18" />
      </g>

      {/* 硬貨を出す旅人 */}
      <g>
        <rect x="102" y="172" width="9" height="16" fill="#3a3348" />
        <rect x="115" y="172" width="9" height="16" fill="#3a3348" />
        <rect x="98" y="134" width="30" height="42" rx="8" fill="#5b8fe8" />
        <circle cx="113" cy="120" r="13" fill="#f6efe2" />
        <path d="M100,119 a13,13 0 0 1 26,0 z" fill="#2a1f18" />
        <rect x="126" y="130" width="30" height="9" rx="4.5" fill="#f6efe2" />
        <rect x="74" y="158" width="24" height="28" rx="6" fill="#3f6b4a" />
      </g>

      {/* 押し返される硬貨 */}
      <g transform="translate(162,124)">
        <g className="monast-coin">
          <circle r="7" fill="#f5b31c" />
          <circle r="3.5" fill="#c98a12" />
        </g>
      </g>

      <style>{`
        .monast-stars { animation: monast-twinkle 3.2s ease-in-out infinite; }
        .monast-glow { animation: monast-lamp 3.6s ease-in-out infinite; }
        .monast-flag { animation: monast-wave 1.5s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 0; }
        .monast-flags rect:nth-child(3n+2) { animation-delay: 0.25s; }
        .monast-flags rect:nth-child(3n+3) { animation-delay: 0.5s; }
        .monast-refuse { animation: monast-nope 1.6s ease-in-out infinite; transform-origin: 226px 126px; }
        .monast-steam-a { animation: monast-rise 2.6s ease-out infinite; }
        .monast-steam-b { animation: monast-rise 2.6s ease-out infinite 1.3s; }
        .monast-coin { animation: monast-back 1.6s ease-in-out infinite; }
        @keyframes monast-twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes monast-lamp {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.68; }
        }
        @keyframes monast-wave {
          0%, 100% { transform: rotate(-7deg) scaleX(1); }
          50% { transform: rotate(7deg) scaleX(0.82); }
        }
        @keyframes monast-nope {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-13deg); }
        }
        @keyframes monast-rise {
          0% { transform: translate(0, 0); opacity: 0; }
          25% { opacity: 0.9; }
          100% { transform: translate(-5px, -22px); opacity: 0; }
        }
        @keyframes monast-back {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-11px, 3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .monast-stars, .monast-glow, .monast-flag, .monast-refuse,
          .monast-steam-a, .monast-steam-b, .monast-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
