/**
 * ブラン(猛吹雪)が襲う。小さなイズバー(木造家屋)と、柱のあいだに
 * 張られたロープが、横殴りの白い雪の帯にほとんど覆われていく。
 *
 * 動くのは、画面を横切る雪の帯と、揺れるロープだけ。
 */
export function RussiaBuran() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暗い吹雪の空。 */}
      <rect width="400" height="210" fill="#3a4f6a" />
      <rect y="0" width="400" height="120" fill="#4a5f7a" />

      {/* 雪原。 */}
      <rect y="150" width="400" height="60" fill="#c4ccc0" />
      <rect y="150" width="400" height="6" fill="#d4dcd0" />

      {/* イズバー(小さな木造家屋)。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="130" width="70" height="40" fill="#8a6f4a" stroke="#20364a" strokeWidth="2.2" />
        <path d="M54,130L95,100L136,130z" fill="#5a3f2a" stroke="#20364a" strokeWidth="2.2" />
        <rect x="86" y="148" width="18" height="22" fill="#3a2818" />
      </g>

      {/* 用心のロープを張った柱2本。 */}
      <g strokeLinecap="round">
        <line x1="170" y1="130" x2="170" y2="170" stroke="#5a4630" strokeWidth="4" />
        <line x1="300" y1="130" x2="300" y2="170" stroke="#5a4630" strokeWidth="4" />
        <path className="rb-rope" d="M170,140 Q235,150 300,140" fill="none" stroke="#c9a877" strokeWidth="3" />
      </g>

      {/* 横殴りの雪の帯(何本も、右から左へ流れる)。 */}
      <g className="rb-snow" stroke="#f6efe2" strokeLinecap="round">
        <line x1="0" y1="40" x2="60" y2="30" strokeWidth="3" opacity="0.85" />
        <line x1="120" y1="70" x2="180" y2="60" strokeWidth="3" opacity="0.7" />
        <line x1="240" y1="30" x2="300" y2="20" strokeWidth="3" opacity="0.8" />
        <line x1="330" y1="90" x2="390" y2="80" strokeWidth="3" opacity="0.75" />
        <line x1="20" y1="110" x2="80" y2="100" strokeWidth="3" opacity="0.7" />
        <line x1="200" y1="120" x2="260" y2="110" strokeWidth="3" opacity="0.75" />
      </g>
      <g className="rb-snow2" stroke="#f6efe2" strokeLinecap="round">
        <line x1="60" y1="20" x2="110" y2="12" strokeWidth="2.4" opacity="0.7" />
        <line x1="180" y1="55" x2="230" y2="46" strokeWidth="2.4" opacity="0.65" />
        <line x1="300" y1="15" x2="350" y2="6" strokeWidth="2.4" opacity="0.7" />
        <line x1="380" y1="80" x2="400" y2="76" strokeWidth="2.4" opacity="0.6" />
      </g>

      <style>{`
        .rb-snow {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: rb-blow-a 1.4s linear infinite;
        }
        .rb-snow2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: rb-blow-b 1.9s linear infinite;
        }
        @keyframes rb-blow-a {
          0% { transform: translateX(-40px); }
          100% { transform: translateX(40px); }
        }
        @keyframes rb-blow-b {
          0% { transform: translateX(30px); }
          100% { transform: translateX(-50px); }
        }
        .rb-rope {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: rb-sway 1.6s ease-in-out infinite;
        }
        @keyframes rb-sway {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rb-snow, .rb-snow2 { animation: none; }
          .rb-rope { animation: none; }
        }
      `}</style>
    </svg>
  );
}
