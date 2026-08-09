/**
 * 税関の上屋。鞄が一つ目に留まり、次には全部が台の上に出される。
 *
 * 開かれた鞄から中身が並べられ、役人の手が判を持ち上げては
 * 書類に振り下ろす。押されるたびに赤い印が増える。
 * 控えの紙は、読めない文字で書かれている。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function WorldCustomsShed() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 上屋の中 */}
      <rect width="400" height="210" fill="#2f3038" />
      <rect width="400" height="34" fill="#24252c" />
      <g stroke="#3a3b44" strokeWidth="4" fill="none">
        <path d="M0,12 L400,12" />
        <path d="M0,24 L400,24" />
      </g>

      {/* 裸電球 */}
      <g transform="translate(112,0)">
        <rect x="-1.5" y="0" width="3" height="30" fill="#4a4b54" />
        <g className="wcs-bulb">
          <circle cx="0" cy="38" r="11" fill="#f5b31c" />
          <rect x="-5" y="26" width="10" height="8" rx="2" fill="#8d949c" />
        </g>
      </g>

      {/* 奥の仕切りと窓口 */}
      <rect x="0" y="46" width="400" height="72" fill="#3a3b45" />
      <rect x="0" y="46" width="400" height="7" fill="#454651" />
      <g fill="#272830">
        <rect x="24" y="60" width="52" height="34" rx="3" />
        <rect x="330" y="60" width="52" height="34" rx="3" />
      </g>

      {/* 役人 */}
      <g>
        <path d="M224,128 q42,-38 84,0 l0,10 -84,0z" fill="#33455c" />
        <rect x="254" y="92" width="24" height="16" fill="#c9a882" />
        <path
          d="M254,104 l12,12 l12,-12 l10,6 -22,20 -22,-20z"
          fill="#f0e8d8"
        />
        <rect x="262" y="112" width="8" height="18" rx="3" fill="#2a3a4e" />
        <rect x="238" y="118" width="56" height="6" rx="3" fill="#e8c23f" />
        <circle cx="266" cy="80" r="20" fill="#c9a882" />
        <circle cx="259" cy="80" r="2.7" fill="#2a1f18" />
        <circle cx="274" cy="80" r="2.7" fill="#2a1f18" />
        <rect x="259" y="88" width="15" height="4" rx="2" fill="#4a3728" />
        {/* 制帽 */}
        <path d="M245,66 a21,17 0 0 1 42,0 l0,4 -42,0z" fill="#2a3a4e" />
        <rect x="244" y="66" width="44" height="8" rx="2" fill="#33455c" />
        <rect x="261" y="67" width="10" height="6" rx="1.5" fill="#e8c23f" />
        <path d="M241,74 q25,8 50,0 l0,4 q-25,8 -50,0z" fill="#1f2c3c" />
      </g>

      {/* 台 */}
      <rect y="118" width="400" height="20" fill="#8a6a44" />
      <rect y="118" width="400" height="6" fill="#9c7c52" />
      <rect y="138" width="400" height="72" fill="#4a3c2c" />

      {/* 開かれた鞄 */}
      <g transform="translate(58,118)">
        <path d="M-34,-40 l68,0 l0,38 -68,0z" fill="#5c4632" />
        <path d="M-34,-40 l68,0 l0,7 -68,0z" fill="#6e553c" />
        <rect x="-30" y="-2" width="60" height="4" fill="#3f3022" />
        <g className="wcs-lid">
          <path d="M-34,-40 l68,0 l0,-34 -68,0z" fill="#4a3728" />
          <path d="M-30,-70 l60,0 l0,26 -60,0z" fill="#3a2b1e" />
        </g>
      </g>

      {/* 台に並べられた中身 */}
      <g>
        <rect x="104" y="100" width="30" height="18" rx="3" fill="#8fa8c4" />
        <rect x="104" y="100" width="30" height="6" rx="3" fill="#a5bdd8" />
        <rect x="142" y="104" width="26" height="14" rx="3" fill="#c47a52" />
        <g transform="translate(190,108)">
          <rect x="-14" y="-10" width="28" height="20" rx="3" fill="#3a4450" />
          <circle cx="0" cy="0" r="7" fill="#8fc4e8" />
          <circle cx="0" cy="0" r="3" fill="#2a3a4a" />
          <rect x="-12" y="-14" width="10" height="5" rx="2" fill="#4a5866" />
        </g>
        <g transform="translate(224,106)">
          <rect x="-9" y="-12" width="18" height="24" rx="4" fill="#7aa86b" />
          <rect x="-9" y="-14" width="18" height="5" rx="2" fill="#5c8a50" />
        </g>
      </g>

      {/* 白墨の印 */}
      <g stroke="#e8e2d4" strokeWidth="3" fill="none" opacity="0.8">
        <path d="M28,96 L48,112" />
        <path d="M48,96 L28,112" />
      </g>

      {/* 書類 */}
      <g transform="translate(300,124)">
        <rect x="-30" y="-16" width="60" height="34" rx="2" fill="#f6efe2" />
        <g fill="#9aa4ae">
          <rect x="-23" y="-9" width="34" height="3.5" rx="1.75" />
          <rect x="-23" y="-2" width="34" height="3.5" rx="1.75" />
          <rect x="-23" y="5" width="22" height="3.5" rx="1.75" />
        </g>
        {/* 押された印 */}
        <g className="wcs-mark-a">
          <circle
            cx="16"
            cy="6"
            r="9"
            fill="none"
            stroke="#e05252"
            strokeWidth="3"
          />
          <rect x="10" y="4" width="12" height="3.5" rx="1.75" fill="#e05252" />
        </g>
        <g className="wcs-mark-b">
          <circle
            cx="-14"
            cy="-10"
            r="7"
            fill="none"
            stroke="#e05252"
            strokeWidth="3"
          />
        </g>
      </g>

      {/* 判を持つ手 */}
      <g transform="translate(316,104)">
        <g className="wcs-stamp">
          <rect x="-11" y="-6" width="22" height="18" rx="3" fill="#5c3f2a" />
          <rect x="-6" y="-26" width="12" height="22" rx="5" fill="#7a5638" />
          <ellipse cx="0" cy="-30" rx="12" ry="9" fill="#c9a882" />
          <rect x="-11" y="12" width="22" height="5" rx="2" fill="#3a2618" />
        </g>
      </g>

      {/* 台の手前に置かれた空の鞄 */}
      <g transform="translate(340,178)">
        <rect x="-32" y="-24" width="64" height="34" rx="4" fill="#4a3728" />
        <rect x="-32" y="-24" width="64" height="7" rx="3" fill="#5c4632" />
        <rect x="-8" y="-30" width="16" height="8" rx="4" fill="#3a2b1e" />
      </g>

      {/* 台の縁に置かれた、空になった旅人の手 */}
      <g transform="translate(120,140)">
        <g className="wcs-hands">
          <ellipse cx="-20" cy="0" rx="15" ry="11" fill="#e8c9a8" />
          <ellipse cx="14" cy="1" rx="15" ry="11" fill="#e8c9a8" />
          <rect x="-36" y="6" width="30" height="26" rx="9" fill="#4a5866" />
          <rect x="0" y="8" width="30" height="26" rx="9" fill="#4a5866" />
        </g>
      </g>

      <style>{`
        .wcs-bulb { transform-box: fill-box; transform-origin: 50% 0; animation: wcs-swing 3.8s ease-in-out infinite; }
        .wcs-lid { transform-box: fill-box; transform-origin: 50% 100%; animation: wcs-flap 5.2s ease-in-out infinite; }
        .wcs-stamp { transform-box: fill-box; transform-origin: center; animation: wcs-thump 2.4s ease-in infinite; }
        .wcs-mark-a { transform-box: fill-box; transform-origin: center; opacity: 0; animation: wcs-ink 2.4s steps(1, end) infinite; }
        .wcs-mark-b { transform-box: fill-box; transform-origin: center; opacity: 0; animation: wcs-ink 2.4s steps(1, end) infinite; animation-delay: -1.2s; }
        .wcs-hands { transform-box: fill-box; transform-origin: 50% 100%; animation: wcs-shrug 4.8s ease-in-out infinite; }
        @keyframes wcs-swing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes wcs-flap {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-5deg); }
        }
        @keyframes wcs-thump {
          0%, 30% { transform: translate(0, -20px); }
          46% { transform: translate(0, 12px); }
          58% { transform: translate(0, 8px); }
          80%, 100% { transform: translate(0, -20px); }
        }
        @keyframes wcs-ink {
          0%, 45% { opacity: 0; }
          46%, 100% { opacity: 1; }
        }
        @keyframes wcs-shrug {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          45% { transform: translate(0, -5px) rotate(-3deg); }
          70% { transform: translate(0, -2px) rotate(2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wcs-bulb, .wcs-lid, .wcs-stamp, .wcs-mark-a, .wcs-mark-b, .wcs-hands { animation: none; }
          /* **規則そのものに opacity: 0 を書いている要素は、animation: none だけでは
             消えたままになる。**動きを減らす設定にしている人にだけ、
             出来事そのものが見えなくなる。押された印。押したという結果が止めた絵にも残るように。 */
          .wcs-mark-a, .wcs-mark-b { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
