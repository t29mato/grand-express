/**
 * 10月・紅葉。
 *
 * 山から下りてきた色が楓を緑から黄、赤へと染めていき、
 * ライトアップされた寺の庭で葉が池に散っていく。
 */
export function Japan06() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の庭 */}
      <rect width="400" height="210" fill="#241a30" />
      <ellipse className="j06-glow" cx="200" cy="156" rx="210" ry="88" fill="#f5731c" />

      {/* 奥の山。上から色づいてくる */}
      <path
        d="M0,92 L46,54 L94,88 L148,44 L212,88 L266,58 L320,90 L364,66 L400,94 L400,152 L0,152z"
        fill="#33253f"
      />
      <g>
        <circle cx="58" cy="90" r="11" fill="#8a3a3a" />
        <circle cx="120" cy="84" r="13" fill="#a04531" />
        <circle cx="186" cy="92" r="10" fill="#8a3a3a" />
        <circle cx="250" cy="86" r="12" fill="#a04531" />
        <circle cx="314" cy="92" r="11" fill="#8a3a3a" />
        <circle cx="372" cy="88" r="10" fill="#a04531" />
      </g>

      {/* 五重塔 */}
      <g>
        <g fill="#4a3550">
          <rect x="236" y="60" width="9" height="112" />
          <path d="M240,36 L245,50 L235,50z" fill="#8a6b3e" />
          <path d="M210,64 L272,64 L260,52 L222,52z" />
          <path d="M206,88 L276,88 L263,74 L219,74z" />
          <path d="M202,114 L280,114 L266,98 L216,98z" />
          <path d="M197,142 L285,142 L270,124 L212,124z" />
        </g>
        <g fill="#3a2740">
          <rect x="226" y="64" width="30" height="12" />
          <rect x="222" y="88" width="38" height="12" />
          <rect x="218" y="114" width="46" height="12" />
          <rect x="214" y="142" width="54" height="30" />
        </g>
        <g fill="#f5b31c">
          <rect className="j06-window" x="234" y="66" width="14" height="8" rx="1" />
          <rect className="j06-window j06-window2" x="232" y="90" width="18" height="8" rx="1" />
          <rect className="j06-window j06-window3" x="230" y="116" width="22" height="9" rx="1" />
          <rect className="j06-window j06-window4" x="228" y="148" width="26" height="12" rx="1" />
        </g>
      </g>

      {/* 地面 */}
      <rect y="152" width="400" height="30" fill="#3d2e42" />

      {/* 灯籠のあかり */}
      <path className="j06-beam" d="M166,166 L128,74 L212,74z" fill="#f5b31c" opacity="0.13" />
      <path className="j06-beam j06-beam2" d="M306,168 L272,86 L344,86z" fill="#f5b31c" opacity="0.11" />

      {/* 手前の楓 */}
      <g>
        <rect x="90" y="96" width="14" height="72" fill="#4a3626" />
        <path d="M97,116 L58,92 M97,104 L136,84 M97,132 L70,118 M97,124 L128,110" stroke="#4a3626" strokeWidth="7" strokeLinecap="round" />
        <circle className="j06-turn" cx="96" cy="66" r="26" fill="#e8443f" />
        <circle className="j06-turn j06-turn2" cx="60" cy="80" r="20" fill="#e8443f" />
        <circle className="j06-turn j06-turn3" cx="132" cy="76" r="22" fill="#e8443f" />
        <circle cx="80" cy="44" r="18" fill="#f5731c" />
        <circle cx="114" cy="42" r="16" fill="#f5b31c" />
        <circle cx="44" cy="58" r="14" fill="#e8443f" />
        <circle cx="152" cy="56" r="15" fill="#f5731c" />
        <circle className="j06-turn j06-turn4" cx="100" cy="96" r="17" fill="#e8443f" />
        <circle cx="66" cy="100" r="13" fill="#c0392b" />
        <circle cx="136" cy="98" r="14" fill="#f5b31c" />
      </g>

      {/* 右の楓 */}
      <g>
        <rect x="343" y="104" width="10" height="62" fill="#4a3626" />
        <circle className="j06-turn j06-turn5" cx="348" cy="90" r="20" fill="#e8443f" />
        <circle cx="324" cy="76" r="14" fill="#f5731c" />
        <circle cx="372" cy="80" r="13" fill="#f5b31c" />
        <circle cx="336" cy="108" r="13" fill="#c0392b" />
        <circle cx="366" cy="106" r="12" fill="#f5731c" />
      </g>

      {/* 石灯籠 */}
      <g>
        <rect x="156" y="158" width="20" height="12" fill="#7d7488" />
        <rect x="161" y="144" width="10" height="16" fill="#6d6478" />
        <rect x="152" y="132" width="28" height="13" rx="2" fill="#f5b31c" />
        <path d="M146,132 L182,132 L173,120 L155,120z" fill="#8a8194" />
        <circle cx="164" cy="117" r="3.5" fill="#8a8194" />
      </g>
      <g>
        <rect x="298" y="160" width="17" height="10" fill="#7d7488" />
        <rect x="302" y="148" width="9" height="14" fill="#6d6478" />
        <rect x="294" y="138" width="25" height="11" rx="2" fill="#f5b31c" />
        <path d="M289,138 L322,138 L314,127 L297,127z" fill="#8a8194" />
        <circle cx="306" cy="124" r="3" fill="#8a8194" />
      </g>

      {/* 池 */}
      <rect y="180" width="400" height="30" fill="#1e2a3e" />
      <rect y="180" width="400" height="3" fill="#3a4a60" />
      <g stroke="#a04531" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7">
        <path className="j06-ripple" d="M62,190 q22,-4 44,0" />
        <path className="j06-ripple j06-rip2" d="M150,200 q22,-4 44,0" />
        <path className="j06-ripple j06-rip3" d="M252,188 q22,-4 44,0" />
        <path className="j06-ripple j06-rip4" d="M320,202 q20,-4 40,0" />
        <path className="j06-ripple j06-rip5" d="M8,202 q20,-4 40,0" />
      </g>

      {/* 散る紅葉 */}
      <g>
        <g transform="translate(190,44)">
          <g className="j06-leaf" fill="#e8443f">
            <ellipse cx="0" cy="-8" rx="3.6" ry="7.5" />
            <ellipse cx="-6" cy="-5" rx="3.2" ry="6.4" transform="rotate(-38 -6 -5)" />
            <ellipse cx="6" cy="-5" rx="3.2" ry="6.4" transform="rotate(38 6 -5)" />
            <ellipse cx="-9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(-72 -9.5 1)" />
            <ellipse cx="9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(72 9.5 1)" />
            <rect x="-0.9" y="-1" width="1.8" height="8" />
          </g>
        </g>
        <g transform="translate(216,94)">
          <g className="j06-leaf j06-leaf2" fill="#f5731c">
            <ellipse cx="0" cy="-8" rx="3.6" ry="7.5" />
            <ellipse cx="-6" cy="-5" rx="3.2" ry="6.4" transform="rotate(-38 -6 -5)" />
            <ellipse cx="6" cy="-5" rx="3.2" ry="6.4" transform="rotate(38 6 -5)" />
            <ellipse cx="-9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(-72 -9.5 1)" />
            <ellipse cx="9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(72 9.5 1)" />
            <rect x="-0.9" y="-1" width="1.8" height="8" />
          </g>
        </g>
        <g transform="translate(172,126)">
          <g className="j06-leaf j06-leaf3" fill="#f5b31c">
            <ellipse cx="0" cy="-8" rx="3.6" ry="7.5" />
            <ellipse cx="-6" cy="-5" rx="3.2" ry="6.4" transform="rotate(-38 -6 -5)" />
            <ellipse cx="6" cy="-5" rx="3.2" ry="6.4" transform="rotate(38 6 -5)" />
            <ellipse cx="-9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(-72 -9.5 1)" />
            <ellipse cx="9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(72 9.5 1)" />
            <rect x="-0.9" y="-1" width="1.8" height="8" />
          </g>
        </g>
        <g transform="translate(300,64)">
          <g className="j06-leaf j06-leaf4" fill="#e8443f">
            <ellipse cx="0" cy="-8" rx="3.6" ry="7.5" />
            <ellipse cx="-6" cy="-5" rx="3.2" ry="6.4" transform="rotate(-38 -6 -5)" />
            <ellipse cx="6" cy="-5" rx="3.2" ry="6.4" transform="rotate(38 6 -5)" />
            <ellipse cx="-9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(-72 -9.5 1)" />
            <ellipse cx="9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(72 9.5 1)" />
            <rect x="-0.9" y="-1" width="1.8" height="8" />
          </g>
        </g>
        <g transform="translate(272,136)">
          <g className="j06-leaf j06-leaf5" fill="#f5731c">
            <ellipse cx="0" cy="-8" rx="3.6" ry="7.5" />
            <ellipse cx="-6" cy="-5" rx="3.2" ry="6.4" transform="rotate(-38 -6 -5)" />
            <ellipse cx="6" cy="-5" rx="3.2" ry="6.4" transform="rotate(38 6 -5)" />
            <ellipse cx="-9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(-72 -9.5 1)" />
            <ellipse cx="9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(72 9.5 1)" />
            <rect x="-0.9" y="-1" width="1.8" height="8" />
          </g>
        </g>
        <g transform="translate(56,140)">
          <g className="j06-leaf j06-leaf6" fill="#f5b31c">
            <ellipse cx="0" cy="-8" rx="3.6" ry="7.5" />
            <ellipse cx="-6" cy="-5" rx="3.2" ry="6.4" transform="rotate(-38 -6 -5)" />
            <ellipse cx="6" cy="-5" rx="3.2" ry="6.4" transform="rotate(38 6 -5)" />
            <ellipse cx="-9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(-72 -9.5 1)" />
            <ellipse cx="9.5" cy="1" rx="2.9" ry="5.6" transform="rotate(72 9.5 1)" />
            <rect x="-0.9" y="-1" width="1.8" height="8" />
          </g>
        </g>
      </g>

      <style>{`
        .j06-glow { opacity: 0.09; animation: j06-warm 5s ease-in-out infinite; }
        .j06-turn { animation: j06-color 9s ease-in-out infinite; }
        .j06-turn2 { animation-delay: 1.5s; }
        .j06-turn3 { animation-delay: 3s; }
        .j06-turn4 { animation-delay: 4.5s; }
        .j06-turn5 { animation-delay: 0.8s; }
        .j06-beam { animation: j06-shine 4.4s ease-in-out infinite; }
        .j06-beam2 { animation-delay: 1.6s; animation-duration: 5.2s; }
        .j06-window { animation: j06-lamp 3.6s ease-in-out infinite; }
        .j06-window2 { animation-delay: 0.5s; }
        .j06-window3 { animation-delay: 1s; }
        .j06-window4 { animation-delay: 1.5s; }
        .j06-leaf {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j06-flutter 6s linear infinite;
        }
        .j06-leaf2 { animation-delay: 1s; animation-duration: 6.8s; }
        .j06-leaf3 { animation-delay: 2s; animation-duration: 5.4s; }
        .j06-leaf4 { animation-delay: 3s; animation-duration: 7.2s; }
        .j06-leaf5 { animation-delay: 4s; animation-duration: 5.8s; }
        .j06-leaf6 { animation-delay: 5s; animation-duration: 6.4s; }
        .j06-ripple {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j06-shimmer 4s ease-in-out infinite;
        }
        .j06-rip2 { animation-delay: 0.7s; }
        .j06-rip3 { animation-delay: 1.4s; }
        .j06-rip4 { animation-delay: 2.1s; }
        .j06-rip5 { animation-delay: 2.8s; }
        @keyframes j06-warm {
          0%, 100% { opacity: 0.07; }
          50% { opacity: 0.14; }
        }
        @keyframes j06-color {
          0% { fill: #4f7f45; }
          22% { fill: #8fa03a; }
          44% { fill: #f5b31c; }
          66% { fill: #f5731c; }
          84%, 100% { fill: #e8443f; }
        }
        @keyframes j06-shine {
          0%, 100% { opacity: 0.09; }
          50% { opacity: 0.2; }
        }
        @keyframes j06-lamp {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.62; }
        }
        @keyframes j06-flutter {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translate(-20px, 56px) rotate(180deg); }
          88% { opacity: 1; }
          100% { transform: translate(-48px, 116px) rotate(390deg); opacity: 0; }
        }
        @keyframes j06-shimmer {
          0%, 100% { transform: translateX(0) scaleX(1); }
          50% { transform: translateX(9px) scaleX(1.14); }
        }
        @media (prefers-reduced-motion: reduce) {
          .j06-glow, .j06-turn, .j06-beam, .j06-window,
          .j06-leaf, .j06-ripple { animation: none; }
        }
      `}</style>
    </svg>
  );
}
