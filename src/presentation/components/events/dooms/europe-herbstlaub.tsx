/**
 * 落ち葉で列車が遅れる。線路脇の木から葉が舞い落ち、
 * レールの上に積もっていく。事故は描かない。**舞い落ちる葉**の動きだけで伝える。
 */
export function EuropeHerbstlaub() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。 */}
      <rect width="400" height="210" fill="#c9a877" />
      <rect y="0" width="400" height="90" fill="#dcc196" />

      {/* 紅葉した木。 */}
      <g strokeLinejoin="round">
        <rect x="46" y="80" width="10" height="60" fill="#6b5330" />
        <circle cx="51" cy="70" r="34" fill="#c8622f" />
        <circle cx="30" cy="88" r="22" fill="#d9843f" />
        <circle cx="74" cy="86" r="24" fill="#b8501f" />
      </g>
      <g strokeLinejoin="round">
        <rect x="336" y="76" width="10" height="64" fill="#6b5330" />
        <circle cx="341" cy="66" r="32" fill="#d9843f" />
        <circle cx="362" cy="84" r="22" fill="#c8622f" />
      </g>

      {/* 地面と線路。 */}
      <rect y="150" width="400" height="60" fill="#b89858" />
      <rect y="150" width="400" height="5" fill="#c9a877" />
      <rect y="182" width="400" height="6" fill="#3a332c" />
      <g stroke="#241a10" strokeWidth="3">
        <path d="M20,184 L380,184" />
        <path d="M40,178 L40,190M90,178 L90,190M140,178 L140,190M190,178 L190,190M240,178 L240,190M290,178 L290,190" />
      </g>
      {/* 積もった落ち葉。 */}
      <g fill="#a8501f" opacity="0.8">
        <ellipse cx="60" cy="186" rx="14" ry="4" />
        <ellipse cx="160" cy="188" rx="18" ry="5" />
        <ellipse cx="260" cy="186" rx="16" ry="4" />
      </g>

      {/* のろのろ進む列車と困る運転士。 */}
      <g strokeLinejoin="round">
        <rect x="150" y="152" width="80" height="28" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="168" cy="180" r="8" fill="#241a10" />
        <circle cx="212" cy="180" r="8" fill="#241a10" />
        <circle cx="240" cy="148" r="9" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 舞い落ちる葉。 */}
      <g className="ehl-leaf1" fill="#c8622f">
        <path d="M0,0 q6,-8 12,0 q-6,8 -12,0z" />
      </g>
      <g className="ehl-leaf2" fill="#d9843f">
        <path d="M0,0 q6,-8 12,0 q-6,8 -12,0z" />
      </g>
      <g className="ehl-leaf3" fill="#b8501f">
        <path d="M0,0 q6,-8 12,0 q-6,8 -12,0z" />
      </g>

      <style>{`
        .ehl-leaf1, .ehl-leaf2, .ehl-leaf3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .ehl-leaf1 { animation: ehl-fall1 2.6s linear infinite; }
        .ehl-leaf2 { animation: ehl-fall2 3.1s linear infinite 0.7s; }
        .ehl-leaf3 { animation: ehl-fall3 2.8s linear infinite 1.4s; }
        @keyframes ehl-fall1 {
          0% { transform: translate(60px, 60px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate(100px, 180px) rotate(200deg); opacity: 0; }
        }
        @keyframes ehl-fall2 {
          0% { transform: translate(320px, 60px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate(280px, 180px) rotate(-220deg); opacity: 0; }
        }
        @keyframes ehl-fall3 {
          0% { transform: translate(200px, 40px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate(230px, 178px) rotate(180deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ehl-leaf1, .ehl-leaf2, .ehl-leaf3 { animation: none; opacity: 0.9; }
          .ehl-leaf1 { transform: translate(100px, 178px); }
          .ehl-leaf2 { transform: translate(280px, 176px); }
          .ehl-leaf3 { transform: translate(190px, 180px); }
        }
      `}</style>
    </svg>
  );
}
