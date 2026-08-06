/**
 * 夏の放牧地から牛を里へ下ろす日。村は道に出た人手のぶんだけ払ってくれる(アルプス)。
 *
 *   - 花冠と大きな鈴を付けた牛が、峠の道を先頭で下りてくる
 *   - 鈴が左右に振れ、あとから小さく二頭が続く
 *   - 道端で受け取る駄賃のコインが舞い上がる
 */
export function Desalpe() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 秋の高い空 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="40" width="400" height="22" fill="#bcdcee" />

      {/* 雪の残る峰 */}
      <path d="M0,96 L58,34 L104,72 L150,26 L206,96z" fill="#8a94a8" />
      <path d="M150,26 L166,40 L134,40z" fill="#f8fbfd" />
      <path d="M58,34 L70,46 L46,46z" fill="#f8fbfd" />
      <path d="M196,96 L262,44 L318,84 L360,58 L400,96z" fill="#7d8a9e" />
      <path d="M262,44 L276,56 L248,56z" fill="#f8fbfd" />

      {/* 牧草地 */}
      <rect y="94" width="400" height="116" fill="#6f9f52" />
      <path d="M0,124 Q110,110 220,126 Q320,140 400,122 L400,210 L0,210z" fill="#5d8f46" />
      <rect y="176" width="400" height="34" fill="#4f7f40" />

      {/* 里へ下りる道 */}
      <path d="M362,96 Q286,124 210,146 Q120,172 0,186 L0,210 L92,210 Q230,178 302,150 Q372,124 400,110 L400,96z" fill="#c4ac82" />

      {/* 後続の二頭 */}
      <g transform="translate(300,136)" opacity="0.85">
        <ellipse cx="0" cy="0" rx="16" ry="9" fill="#f6efe2" />
        <ellipse cx="-6" cy="-2" rx="5" ry="4" fill="#8a5a2c" />
        <circle cx="-17" cy="-6" r="6" fill="#f6efe2" />
        <g fill="#5a4630">
          <rect x="-10" y="7" width="3" height="9" />
          <rect x="8" y="7" width="3" height="9" />
        </g>
      </g>
      <g transform="translate(346,120)" opacity="0.75">
        <ellipse cx="0" cy="0" rx="13" ry="7" fill="#f6efe2" />
        <ellipse cx="-5" cy="-1" rx="4" ry="3" fill="#8a5a2c" />
        <circle cx="-14" cy="-5" r="5" fill="#f6efe2" />
        <g fill="#5a4630">
          <rect x="-8" y="6" width="2.4" height="7" />
          <rect x="6" y="6" width="2.4" height="7" />
        </g>
      </g>

      {/* 先頭の一頭 */}
      <g transform="translate(150,164)">
        {/* 脚 */}
        <g fill="#5a4630">
          <rect className="desa-leg desa-l1" x="-26" y="14" width="7" height="22" rx="2" />
          <rect className="desa-leg desa-l2" x="-8" y="14" width="7" height="22" rx="2" />
          <rect className="desa-leg desa-l3" x="14" y="14" width="7" height="22" rx="2" />
          <rect className="desa-leg desa-l4" x="30" y="14" width="7" height="22" rx="2" />
        </g>
        {/* 胴 */}
        <rect x="-32" y="-16" width="74" height="34" rx="14" fill="#f6efe2" />
        <ellipse cx="-12" cy="-4" rx="13" ry="10" fill="#8a5a2c" />
        <ellipse cx="24" cy="6" rx="10" ry="7" fill="#8a5a2c" />
        {/* 尻尾 */}
        <path className="desa-tail" d="M42,-10 c10,2 12,12 8,22" stroke="#f6efe2" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* 頭 */}
        <g>
          <ellipse cx="-46" cy="-14" rx="16" ry="13" fill="#f6efe2" />
          <ellipse cx="-56" cy="-8" rx="8" ry="6" fill="#e8b8a8" />
          <circle cx="-50" cy="-20" r="2.2" fill="#3a3428" />
          {/* 角 */}
          <path d="M-56,-26 q-6,-8 -1,-11" stroke="#c9b98c" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M-40,-26 q6,-8 1,-11" stroke="#c9b98c" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          {/* 花冠 */}
          <g className="desa-crown">
            <path d="M-62,-27 q16,-11 32,0" stroke="#3f8f4f" strokeWidth="3.4" fill="none" />
            <circle cx="-58" cy="-29" r="4" fill="#e8443f" />
            <circle cx="-46" cy="-34" r="4.6" fill="#f5b31c" />
            <circle cx="-34" cy="-29" r="4" fill="#c95fa8" />
          </g>
        </g>
        {/* 首の大きな鈴 */}
        <g className="desa-bell">
          <rect x="-40" y="-2" width="18" height="6" rx="2" fill="#8a5a2c" />
          <path d="M-38,4 q7,-2 14,0 l3,14 q-10,4 -20,0z" fill="#e0a63c" />
          <path d="M-38,4 q7,-2 14,0" stroke="#b8801c" strokeWidth="2" fill="none" />
          <circle cx="-31" cy="21" r="3" fill="#b8801c" />
        </g>
      </g>

      {/* 追う牧夫 */}
      <g transform="translate(246,150)">
        <circle cx="0" cy="-34" r="9" fill="#f6efe2" />
        <path d="M-11,-38 a11,11 0 0 1 22,0z" fill="#4a3a2a" />
        <rect x="-9" y="-25" width="19" height="26" rx="6" fill="#e8443f" />
        <rect x="-8" y="0" width="7" height="16" rx="3" fill="#3b3550" />
        <rect x="2" y="0" width="7" height="16" rx="3" fill="#3b3550" />
        <path className="desa-stick" d="M9,-20 L22,-42" stroke="#8a6a3c" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* 道に出た駄賃 */}
      <g className="desa-coin desa-c1">
        <circle cx="66" cy="150" r="10" fill="#f5b31c" />
        <circle cx="66" cy="150" r="5" fill="#d8930d" />
      </g>
      <g className="desa-coin desa-c2">
        <circle cx="44" cy="164" r="8" fill="#f5b31c" />
        <circle cx="44" cy="164" r="4" fill="#d8930d" />
      </g>

      <style>{`
        .desa-leg, .desa-tail, .desa-crown, .desa-bell, .desa-stick, .desa-coin {
          transform-box: fill-box;
        }
        .desa-leg { transform-origin: 50% 0%; animation: desa-step 1.4s ease-in-out infinite; }
        .desa-l2 { animation-delay: -0.7s; }
        .desa-l3 { animation-delay: -0.35s; }
        .desa-l4 { animation-delay: -1.05s; }
        .desa-tail { transform-origin: 0% 0%; animation: desa-swish 2.8s ease-in-out infinite; }
        .desa-crown { transform-origin: 50% 100%; animation: desa-nod 1.4s ease-in-out infinite; }
        .desa-bell { transform-origin: 50% 0%; animation: desa-ring 1.4s ease-in-out infinite; }
        .desa-stick { transform-origin: 0% 100%; animation: desa-wave 2.2s ease-in-out infinite; }
        .desa-coin { transform-origin: 50% 50%; animation: desa-rise 2.5s ease-out infinite; }
        .desa-c2 { animation-delay: -1.25s; }
        @keyframes desa-step {
          0%, 100% { transform: rotate(-9deg); }
          50% { transform: rotate(9deg); }
        }
        @keyframes desa-swish {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes desa-nod {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50% { transform: translateY(1.6px) rotate(1.5deg); }
        }
        @keyframes desa-ring {
          0%, 100% { transform: rotate(-13deg); }
          50% { transform: rotate(13deg); }
        }
        @keyframes desa-wave {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(7deg); }
        }
        @keyframes desa-rise {
          0% { transform: translate(0, 16px); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(-10px, -40px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .desa-leg, .desa-tail, .desa-crown, .desa-bell, .desa-stick, .desa-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
