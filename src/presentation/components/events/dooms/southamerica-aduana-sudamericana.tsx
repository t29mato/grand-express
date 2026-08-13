/**
 * 国境で書類が足りないと言われる。税関職員が書類の不足を言い張り、
 * 長い待ち時間のすえようやく遮断機が上がる。
 *
 * 人を描かず、**下りたままの遮断機と、列をなして待つ車**で表す。
 * 動くのは、停まった車から立ちのぼる陽炎(アイドリングの熱)1つだけ。
 */
export function SouthamericaAduanaSudamericana() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="80" fill="#cfe4f0" />
      <circle cx="340" cy="40" r="22" fill="#f5d060" opacity="0.9" />

      {/* 検問所の建物。 */}
      <rect x="150" y="70" width="100" height="60" fill="#e2ddc8" />
      <rect x="150" y="70" width="100" height="8" fill="#8a6a4c" />
      <rect x="170" y="100" width="20" height="30" fill="#3f7f9a" opacity="0.7" />
      <rect x="210" y="100" width="20" height="30" fill="#3f7f9a" opacity="0.7" />

      {/* 道路。 */}
      <rect y="130" width="400" height="80" fill="#7a7468" />
      <g stroke="#e2ddc8" strokeWidth="3" strokeDasharray="12 8" opacity="0.6">
        <line x1="0" y1="170" x2="150" y2="170" />
        <line x1="250" y1="170" x2="400" y2="170" />
      </g>

      {/* 下りたままの遮断機。 */}
      <g strokeLinecap="round">
        <rect x="196" y="150" width="8" height="24" fill="#3a3f46" />
        <rect x="150" y="146" width="100" height="7" fill="#e8443f" />
        <rect x="150" y="146" width="16" height="7" fill="#f2f6f8" />
        <rect x="184" y="146" width="16" height="7" fill="#f2f6f8" />
        <rect x="218" y="146" width="16" height="7" fill="#f2f6f8" />
      </g>

      {/* 列をなして待つ車。 */}
      <g strokeLinejoin="round">
        <path d="M20,168 L28,152 L70,152 L78,168z" fill="#e8443f" stroke="#3a3f46" strokeWidth="2" />
        <rect x="18" y="166" width="62" height="16" rx="3" fill="#c8443a" stroke="#3a3f46" strokeWidth="2" />
        <circle cx="34" cy="184" r="8" fill="#241a10" />
        <circle cx="66" cy="184" r="8" fill="#241a10" />

        <path d="M280,168 L288,154 L326,154 L334,168z" fill="#2f6ea8" stroke="#3a3f46" strokeWidth="2" />
        <rect x="278" y="166" width="58" height="16" rx="3" fill="#265f92" stroke="#3a3f46" strokeWidth="2" />
        <circle cx="292" cy="184" r="8" fill="#241a10" />
        <circle cx="322" cy="184" r="8" fill="#241a10" />
      </g>

      {/* アイドリングの熱で揺れる陽炎。**ここだけが動く。** */}
      <g className="sa-aduana-heat" stroke="#f2f6f8" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M46,150 q4,-10 0,-20 q-4,-10 0,-20" />
        <path d="M62,150 q4,-10 0,-20 q-4,-10 0,-20" />
      </g>

      <style>{`
        .sa-aduana-heat {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: sa-aduana-shimmer 1.6s ease-in-out infinite;
        }
        @keyframes sa-aduana-shimmer {
          0%   { transform: scaleY(0.9) translateX(0px); opacity: 0.3; }
          50%  { transform: scaleY(1.1) translateX(3px); opacity: 0.7; }
          100% { transform: scaleY(0.9) translateX(0px); opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-aduana-heat { animation: none; }
        }
      `}</style>
    </svg>
  );
}
