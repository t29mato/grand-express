/**
 * 鹿せんべいを買った途端に鹿へ囲まれ、袋ごと持っていかれる(近畿・奈良)。
 *
 * 一頭が飛びかかって袋を奪い、せんべいが宙に散る。別の一頭はおじぎで催促する。
 */
export function DeerCrackers() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 奈良公園 */}
      <rect width="400" height="210" fill="#7ea9c4" />
      <path d="M0,128 Q120,112 250,126 Q330,134 400,120 L400,210 L0,210z" fill="#4a6b3f" />
      <rect y="164" width="400" height="46" fill="#3d5c35" />

      {/* 奥の社殿 */}
      <g fill="#2f4433">
        <rect x="312" y="92" width="66" height="34" />
        <path d="M298,94 L345,66 L392,94z" />
        <path d="M306,72 L345,50 L384,72z" />
      </g>
      <rect x="336" y="104" width="18" height="22" fill="#7d3f36" />

      {/* せんべいを掲げる旅人 */}
      <g className="dc-tourist">
        <rect x="176" y="150" width="11" height="34" rx="4" fill="#3b3550" />
        <rect x="192" y="150" width="11" height="34" rx="4" fill="#3b3550" />
        <rect x="172" y="106" width="34" height="48" rx="10" fill="#e8443f" />
        <circle cx="189" cy="90" r="15" fill="#f6efe2" />
        <path d="M173,86 Q189,68 205,86 L205,80 Q189,66 173,80z" fill="#2a2233" />
        <rect className="dc-arm" x="206" y="62" width="12" height="50" rx="6" fill="#f6efe2" />
        <g className="dc-packet">
          <rect x="204" y="42" width="42" height="24" rx="3" fill="#e6d3a8" />
          <rect x="204" y="50" width="42" height="8" fill="#e8443f" />
          <path d="M204,42 L196,36 M246,42 L254,36" stroke="#e6d3a8" strokeWidth="5" strokeLinecap="round" />
        </g>
      </g>

      {/* おじぎで催促する鹿 */}
      <g>
        <g fill="#3f2a17">
          <rect x="80" y="150" width="6" height="28" rx="3" />
          <rect x="94" y="150" width="6" height="28" rx="3" />
          <rect x="122" y="150" width="6" height="28" rx="3" />
          <rect x="136" y="150" width="6" height="28" rx="3" />
        </g>
        <ellipse cx="110" cy="140" rx="36" ry="21" fill="#9c6a39" />
        <ellipse cx="76" cy="146" rx="7" ry="9" fill="#7f5429" />
        <g className="dc-bow">
          <rect x="137" y="106" width="15" height="36" rx="7" fill="#9c6a39" />
          <ellipse cx="160" cy="102" rx="19" ry="10" fill="#ac7a45" transform="rotate(-18 160 102)" />
          <ellipse cx="148" cy="88" rx="6" ry="9" fill="#7f5429" transform="rotate(-20 148 88)" />
          <path d="M158,86 L164,68 M154,84 L148,70" stroke="#6d4a24" strokeWidth="4" strokeLinecap="round" />
          <circle cx="176" cy="106" r="3.4" fill="#2a1a0f" />
        </g>
      </g>

      {/* 飛びついて袋を奪う鹿 */}
      <g className="dc-lunge">
        <g fill="#3f2a17">
          <rect x="272" y="150" width="6" height="26" rx="3" />
          <rect x="288" y="150" width="6" height="26" rx="3" />
          <rect x="316" y="150" width="6" height="26" rx="3" />
          <rect x="332" y="150" width="6" height="26" rx="3" />
        </g>
        <ellipse cx="302" cy="138" rx="38" ry="22" fill="#a9743f" />
        <g fill="#e0cdb4">
          <circle cx="290" cy="132" r="3" />
          <circle cx="306" cy="128" r="3" />
          <circle cx="318" cy="138" r="3" />
        </g>
        <ellipse cx="340" cy="126" rx="8" ry="10" fill="#8c5f31" />
        <rect x="246" y="94" width="16" height="46" rx="7" fill="#a9743f" transform="rotate(-18 254 118)" />
        <ellipse cx="238" cy="86" rx="20" ry="11" fill="#b8814a" transform="rotate(16 238 86)" />
        <ellipse cx="252" cy="74" rx="7" ry="10" fill="#8c5f31" transform="rotate(28 252 74)" />
        <circle cx="220" cy="80" r="4" fill="#2a1a0f" />
        <circle cx="234" cy="80" r="2.6" fill="#2a1a0f" />
      </g>

      {/* 散らばるせんべい */}
      <g fill="#dcc08c">
        <circle className="dc-fly" cx="174" cy="28" r="9" />
        <circle className="dc-fly dc-x2" cx="156" cy="46" r="8" />
        <circle className="dc-fly dc-x3" cx="182" cy="54" r="8" />
        <circle className="dc-fly dc-x4" cx="148" cy="20" r="7" />
      </g>
      <g fill="#c9a877">
        <ellipse cx="212" cy="188" rx="10" ry="4" />
        <ellipse cx="244" cy="180" rx="9" ry="3.5" />
        <ellipse cx="166" cy="192" rx="9" ry="3.5" />
      </g>

      <style>{`
        .dc-lunge { animation: dc-jump 2s ease-in-out infinite; }
        .dc-arm { transform-origin: 212px 110px; animation: dc-tug 2s ease-in-out infinite; }
        .dc-packet { transform-origin: 225px 54px; animation: dc-shake 2s ease-in-out infinite; }
        .dc-tourist { transform-origin: 189px 184px; animation: dc-lean 2s ease-in-out infinite; }
        .dc-bow { transform-origin: 142px 140px; animation: dc-nod 1.6s ease-in-out infinite; }
        .dc-fly { animation: dc-scatter 1.6s ease-out infinite; }
        .dc-x2 { animation-delay: 0.4s; }
        .dc-x3 { animation-delay: 0.8s; }
        .dc-x4 { animation-delay: 1.2s; }
        @keyframes dc-jump {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-26px, -12px); }
        }
        @keyframes dc-tug {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(14deg); }
        }
        @keyframes dc-shake {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(16deg); }
        }
        @keyframes dc-lean {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-7deg); }
        }
        @keyframes dc-nod {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(26deg); }
        }
        @keyframes dc-scatter {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(-34px, -30px) rotate(180deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dc-lunge, .dc-arm, .dc-packet, .dc-tourist, .dc-bow, .dc-fly { animation: none; }
        }
      `}</style>
    </svg>
  );
}
