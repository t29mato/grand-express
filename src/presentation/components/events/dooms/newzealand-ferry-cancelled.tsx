/**
 * クック海峡が荒れる。高波でフェリーが欠航し、埠頭で足止めを食う。
 * 鎖の張られた乗船口、沖に停まったままのフェリー、防波堤に砕ける波、
 * スーツケースを持ったまま立ち尽くす旅客。
 *
 * 動くのは、うねる波と砕けるしぶき・煽られる旗・上下するフェリー。
 */
export function NewzealandFerryCancelled() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れ模様の空。 */}
      <rect width="400" height="210" fill="#6f7a86" />
      <rect y="0" width="400" height="60" fill="#5a6572" />
      <g fill="#67727e" opacity="0.9">
        <ellipse cx="70" cy="28" rx="66" ry="12" />
        <ellipse cx="230" cy="18" rx="76" ry="13" />
        <ellipse cx="350" cy="36" rx="58" ry="11" />
      </g>
      {/* 対岸(南島)の山影。 */}
      <path d="M230,92 l40,-18 36,12 30,-14 40,14 24,-6 v12 h-170 z" fill="#4a5a63" />

      {/* 海。うねりが大きい。 */}
      <rect y="88" width="400" height="70" fill="#3a5563" />
      <g className="nzfc-swell" fill="#456573">
        <path d="M-400,100 q25,-9 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 v58 h-400 z" />
        <path d="M0,100 q25,-9 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 v58 H0 z" />
      </g>
      <g className="nzfc-swell2" fill="#527585" opacity="0.9">
        <path d="M-400,124 q30,-11 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t40,0 v34 h-400 z" />
        <path d="M0,124 q30,-11 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t40,0 v34 H0 z" />
      </g>

      {/* 沖に停まったままのフェリー(波で上下する)。 */}
      <g className="nzfc-ferry">
        <path d="M226,112 q40,5 80,0 l-8,12 h-64 z" fill="#2f4a56" />
        <rect x="234" y="98" width="64" height="15" rx="2" fill="#f2ede0" />
        <rect x="242" y="88" width="42" height="11" rx="2" fill="#f6efe2" />
        <g fill="#4a5568">
          <rect x="246" y="91" width="6" height="4.4" />
          <rect x="256" y="91" width="6" height="4.4" />
          <rect x="266" y="91" width="6" height="4.4" />
          <rect x="276" y="91" width="6" height="4.4" />
        </g>
        <rect x="286" y="80" width="9" height="10" fill="#3f7f5a" />
        <rect x="286" y="78" width="9" height="3" fill="#2a2622" />
      </g>

      {/* 防波堤と砕ける波。 */}
      <rect x="0" y="132" width="150" height="10" fill="#57534a" />
      <g stroke="#4a4640" strokeWidth="1.2" opacity="0.7" fill="none">
        <path d="M16,132 v10 M46,132 v10 M76,132 v10 M106,132 v10 M136,132 v10" />
      </g>
      <g className="nzfc-splash">
        <g fill="#e8f2f6" opacity="0.95">
          <circle cx="30" cy="124" r="6" />
          <circle cx="40" cy="116" r="4.4" />
          <circle cx="21" cy="115" r="3.6" />
          <circle cx="34" cy="106" r="2.8" />
        </g>
        <g stroke="#e8f2f6" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" fill="none">
          <path d="M28,112 v-10 M36,108 v-8 M20,108 v-7" />
        </g>
      </g>
      <g className="nzfc-splash2">
        <g fill="#e8f2f6" opacity="0.95">
          <circle cx="108" cy="126" r="5" />
          <circle cx="117" cy="119" r="3.8" />
          <circle cx="100" cy="118" r="3" />
        </g>
        <g stroke="#e8f2f6" strokeWidth="2" strokeLinecap="round" opacity="0.8" fill="none">
          <path d="M106,115 v-9 M114,112 v-7" />
        </g>
      </g>

      {/* 埠頭。 */}
      <rect y="158" width="400" height="52" fill="#8a8578" />
      <rect y="158" width="400" height="6" fill="#9a948a" />
      <g stroke="#6f6b62" strokeWidth="1.4" opacity="0.7" fill="none">
        <path d="M0,178 h400 M0,196 h400 M60,164 v46 M160,164 v46 M260,164 v46 M360,164 v46" />
      </g>

      {/* 乗船口。鎖が張られている。 */}
      <g>
        <rect x="298" y="120" width="8" height="52" fill="#c9773c" />
        <rect x="368" y="120" width="8" height="52" fill="#c9773c" />
        <path d="M306,138 q32,14 62,0" stroke="#5a5248" strokeWidth="3.4" strokeDasharray="5 3" fill="none" />
        <rect x="322" y="122" width="30" height="18" rx="2" fill="#e8443f" />
        <rect x="326" y="127" width="22" height="8" rx="1.5" fill="#f6efe2" />
      </g>
      {/* 煽られる旗。 */}
      <rect x="180" y="96" width="3" height="64" fill="#57534a" />
      <g className="nzfc-flag">
        <path d="M0,0 q10,3 20,-2 q-1,7 1,13 q-11,4 -21,0 z" fill="#f5b31c" />
      </g>

      {/* 足止めの旅客。スーツケースの上に手を置いて立ち尽くす。 */}
      <ellipse cx="230" cy="200" rx="13" ry="3.4" fill="#000" opacity="0.2" />
      <g strokeLinecap="round">
        <path d="M226,180 L224,199" stroke="#3a3040" strokeWidth="5" fill="none" />
        <path d="M234,180 L237,199" stroke="#463a50" strokeWidth="5" fill="none" />
        <path d="M230,154 L230,182" stroke="#6b5a8c" strokeWidth="14" fill="none" />
        <circle cx="230" cy="146" r="7.5" fill="#e0b48a" />
        <path d="M222.5,144 a7.5,7.5 0 0 1 15,0 z" fill="#4a3c5c" />
        {/* うつむき加減の視線を出す前髪。 */}
        <path d="M224,166 L212,176" stroke="#e0b48a" strokeWidth="3.4" fill="none" />
        <path d="M236,166 L246,172" stroke="#e0b48a" strokeWidth="3.4" fill="none" />
      </g>
      <g>
        <rect x="243" y="172" width="18" height="26" rx="2.5" fill="#a8763c" />
        <rect x="249" y="166" width="6" height="7" fill="#6b5330" />
        <path d="M243,182 h18" stroke="#8a5a2c" strokeWidth="2" fill="none" />
      </g>

      {/* 風に飛ぶしぶきの粒。 */}
      <g className="nzfc-spray" fill="#c4d4dc" opacity="0.7">
        <circle cx="-340" cy="70" r="1.6" />
        <circle cx="-250" cy="96" r="1.4" />
        <circle cx="-150" cy="76" r="1.6" />
        <circle cx="-60" cy="100" r="1.4" />
        <circle cx="60" cy="70" r="1.6" />
        <circle cx="150" cy="96" r="1.4" />
        <circle cx="250" cy="76" r="1.6" />
        <circle cx="340" cy="100" r="1.4" />
      </g>

      <style>{`
        .nzfc-swell { animation: nzfc-roll 5s linear infinite; }
        .nzfc-swell2 { animation: nzfc-roll 3.4s linear infinite; }
        .nzfc-ferry {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: nzfc-pitch 3.4s ease-in-out infinite;
        }
        .nzfc-splash {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nzfc-burst 2.4s ease-in infinite;
        }
        .nzfc-splash2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nzfc-burst 2.4s ease-in infinite;
          animation-delay: -1.2s;
        }
        .nzfc-flag {
          transform: translate(183px, 98px);
          animation: nzfc-whip 0.6s ease-in-out infinite alternate;
        }
        .nzfc-spray { animation: nzfc-blow 2.8s linear infinite; }
        @keyframes nzfc-roll {
          from { transform: translateX(0); }
          to { transform: translateX(400px); }
        }
        @keyframes nzfc-pitch {
          0%, 100% { transform: translateY(2.5px) rotate(-1.6deg); }
          50% { transform: translateY(-3px) rotate(1.6deg); }
        }
        @keyframes nzfc-burst {
          0% { transform: scale(0.3); opacity: 0; }
          30% { transform: scale(1); opacity: 1; }
          70% { transform: scale(1.15) translateY(-4px); opacity: 0.7; }
          100% { transform: scale(0.4) translateY(-8px); opacity: 0; }
        }
        @keyframes nzfc-whip {
          from { transform: translate(183px, 98px) scaleX(0.85) skewY(4deg); }
          to { transform: translate(183px, 98px) scaleX(1.08) skewY(-5deg); }
        }
        @keyframes nzfc-blow {
          from { transform: translateX(0); }
          to { transform: translateX(400px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nzfc-swell, .nzfc-swell2, .nzfc-ferry, .nzfc-splash, .nzfc-splash2,
          .nzfc-flag, .nzfc-spray {
            animation: none;
          }
          /* 止めてもしぶきが防波堤の上に見えるようにする。 */
          .nzfc-splash, .nzfc-splash2 { transform: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
