/**
 * バザールの人混みですりに遭う。屋根付きの露店の合間、ざわめきに紛れて
 * ポケットの荷が消える。
 *
 * 人を描かず、**開いたポケットへ伸びる手**ですりの瞬間を表す。
 * 動くのは、伸びて引っ込むその手だけ。
 */
export function AsiaBazaarpickpocket() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 屋根付きバザールの薄暗い空間。 */}
      <rect width="400" height="210" fill="#8b6a1a" />
      <rect y="0" width="400" height="50" fill="#a3841f" />

      {/* 布屋根の連なり。 */}
      <g strokeLinejoin="round">
        <path d="M0,50 L60,20 L120,50z" fill="#c8443f" />
        <path d="M120,50 L180,20 L240,50z" fill="#1a4a8f" />
        <path d="M240,50 L300,20 L360,50z" fill="#c8443f" />
        <path d="M360,50 L400,30 L400,50z" fill="#1a4a8f" />
      </g>

      {/* 露店の並び。 */}
      <g strokeLinejoin="round">
        <rect x="20" y="120" width="70" height="60" fill="#c9a26a" stroke="#3a2f26" strokeWidth="2" />
        <rect x="120" y="130" width="70" height="50" fill="#b3854f" stroke="#3a2f26" strokeWidth="2" />
        <rect x="300" y="124" width="80" height="56" fill="#c9a26a" stroke="#3a2f26" strokeWidth="2" />
      </g>

      {/* 露店に積まれた壺と反物。 */}
      <g>
        <ellipse cx="45" cy="150" rx="10" ry="8" fill="#8b6a1a" />
        <ellipse cx="65" cy="152" rx="9" ry="7" fill="#c9a26a" />
        <rect x="320" y="140" width="40" height="12" fill="#c8102e" />
        <rect x="320" y="154" width="40" height="12" fill="#f4c430" />
      </g>

      {/* 地面。 */}
      <rect y="180" width="400" height="30" fill="#7a5f3f" />

      {/* 人混みの輪郭(顔の無い群像)。 */}
      <g fill="#4a4038" opacity="0.9">
        <path d="M150,210 q0,-40 20,-40 q20,0 20,40z" />
        <path d="M195,210 q0,-46 18,-46 q18,0 18,46z" />
        <path d="M235,210 q0,-38 18,-38 q18,0 18,38z" />
      </g>

      {/* 肩掛け鞄。開いた口が下を向く。 */}
      <g strokeLinejoin="round">
        <path d="M205,170 L225,170 L228,196 L202,196z" fill="#7a4a2a" stroke="#3a2f26" strokeWidth="2" />
        <path d="M205,170 Q215,164 225,170" fill="none" stroke="#3a2f26" strokeWidth="2" />
      </g>

      {/* 伸びて引っ込むすりの手。**ここだけが動く。** */}
      <g className="asia-pickpocket-hand" strokeLinecap="round" strokeLinejoin="round">
        <path d="M260,190 L228,178" stroke="#d9a273" strokeWidth="8" fill="none" />
        <circle cx="228" cy="178" r="6" fill="#d9a273" />
      </g>

      <style>{`
        .asia-pickpocket-hand {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: asia-pickpocket-hand-move 2s ease-in-out infinite;
        }
        @keyframes asia-pickpocket-hand-move {
          0% { transform: translate(30px, 10px); opacity: 0; }
          30% { transform: translate(0, 0); opacity: 1; }
          60% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(30px, 10px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .asia-pickpocket-hand { animation: none; }
        }
      `}</style>
    </svg>
  );
}
