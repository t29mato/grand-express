/**
 * 暦が「今日ではない」と言う。僧侶がロンタルの暦を指でなぞり、
 * 旅装の人はただ座って待つ。動くのは、指でなぞる動きと、
 * 空を早送りで巡る太陽と月だけ(時間が過ぎることの比喩)。
 */
export function BaliMenungguDewasa() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。太陽と月が交互に巡る(時間の経過)。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="80" fill="#cfe4f0" />
      <g className="bmd-sun">
        <circle cx="0" cy="0" r="18" fill="#f5b31c" />
      </g>
      <g className="bmd-moon">
        <circle cx="0" cy="0" r="12" fill="#e8e2d2" />
      </g>

      {/* 地面と、あずまや。 */}
      <rect y="150" width="400" height="60" fill="#8fae63" />
      <rect x="30" y="120" width="100" height="6" fill="#5a4630" />
      <rect x="34" y="120" width="4" height="34" fill="#5a4630" />
      <rect x="122" y="120" width="4" height="34" fill="#5a4630" />
      <path d="M24,120h112l-14,-16H38z" fill="#3b2a1c" />

      {/* 僧侶(あずまやの中、ロンタルを指でなぞる)。 */}
      <g strokeLinejoin="round">
        <ellipse cx="70" cy="176" rx="12" ry="3" fill="#000" opacity="0.14" />
        <path d="M62,172q8,-4 16,0l-2,-20q-6,-3 -12,0z" fill="#f6efe2" />
        <circle cx="70" cy="146" r="6" fill="#a8763a" />
        <rect x="60" y="160" width="20" height="10" fill="#c9a877" />
        <g className="bmd-finger" transform="translate(60,165)">
          <rect x="0" y="0" width="3" height="8" fill="#a8763a" />
        </g>
      </g>

      {/* 旅装の人(あずまやの外で座って待つ)。 */}
      <g strokeLinejoin="round">
        <ellipse cx="180" cy="196" rx="14" ry="3" fill="#000" opacity="0.14" />
        <path d="M168,196q6,-16 24,0z" fill="#4a7bd0" />
        <circle cx="180" cy="176" r="7" fill="#a8763a" />
        <rect x="196" y="182" width="16" height="14" fill="#8a6a3c" />
      </g>

      <style>{`
        .bmd-sun {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: bmd-arc-sun 3.2s linear infinite;
        }
        @keyframes bmd-arc-sun {
          0% { transform: translate(30px,150px); opacity: 1; }
          48% { transform: translate(370px,20px); opacity: 1; }
          50% { opacity: 0; }
          100% { transform: translate(370px,20px); opacity: 0; }
        }
        .bmd-moon {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: bmd-arc-moon 3.2s linear infinite;
        }
        @keyframes bmd-arc-moon {
          0% { opacity: 0; }
          50% { transform: translate(30px,150px); opacity: 1; }
          98% { transform: translate(370px,20px); opacity: 1; }
          100% { opacity: 0; }
        }
        .bmd-finger {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: bmd-trace 1.6s ease-in-out infinite;
        }
        @keyframes bmd-trace {
          0% { transform: translate(60px,165px); }
          50% { transform: translate(78px,165px); }
          100% { transform: translate(60px,165px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bmd-sun { animation: none; transform: translate(200px,30px); opacity: 1; }
          .bmd-moon { animation: none; opacity: 0; }
          .bmd-finger { animation: none; transform: translate(70px,165px); }
        }
      `}</style>
    </svg>
  );
}
