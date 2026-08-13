/**
 * ドライブスルーの長い行列にはまる。配送トラックが車線を塞ぎ、
 * 後ろに並んだ車の列がアイドリングのまま動かない。
 *
 * 動くのは並んだ車の排気の湯気と、コーヒーカップの湯気だけ。
 */
export function CanadaDriveThruLine() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 朝のドライブスルー車線。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="80" fill="#a8d4ec" />
      <rect y="150" width="400" height="60" fill="#8a8478" />
      <rect y="146" width="400" height="4" fill="#f6efe2" />

      {/* コーヒー店の建物。 */}
      <rect x="0" y="90" width="130" height="60" fill="#e8443f" />
      <rect x="20" y="106" width="40" height="30" fill="#bfe0f0" />
      <circle cx="100" cy="112" r="14" fill="#f6efe2" />

      {/* 配送トラック(車線をふさぐ)。 */}
      <g strokeLinejoin="round">
        <rect x="150" y="118" width="90" height="34" rx="3" fill="#c8ccc4" stroke="#20364a" strokeWidth="2.5" />
        <rect x="230" y="126" width="26" height="26" fill="#a8ada4" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="172" cy="154" r="9" fill="#241a10" />
        <circle cx="238" cy="154" r="9" fill="#241a10" />
      </g>

      {/* 並んだ車の列。 */}
      <g strokeLinejoin="round">
        <rect x="270" y="128" width="52" height="20" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <circle cx="282" cy="150" r="7" fill="#241a10" /><circle cx="312" cy="150" r="7" fill="#241a10" />
        <rect x="335" y="130" width="50" height="18" rx="4" fill="#f5b31c" stroke="#20364a" strokeWidth="2" />
        <circle cx="346" cy="150" r="6" fill="#241a10" /><circle cx="374" cy="150" r="6" fill="#241a10" />
      </g>

      {/* 排気の湯気。ここが動く。 */}
      <g className="cdt-exhaust" fill="#f6efe2" opacity="0.6">
        <ellipse cx="266" cy="150" rx="5" ry="4" />
      </g>
      <g className="cdt-exhaust cdt-exhaust2" fill="#f6efe2" opacity="0.6">
        <ellipse cx="331" cy="150" rx="4" ry="3.5" />
      </g>

      {/* 手にしたコーヒーカップの湯気。ここも動く。 */}
      <g transform="translate(60,80)">
        <rect x="0" y="10" width="16" height="20" rx="2" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <g className="cdt-steam" stroke="#e8e0c8" strokeWidth="2" fill="none">
          <path d="M4,8c-2,-4 2,-6 0,-10" />
          <path d="M12,8c-2,-4 2,-6 0,-10" />
        </g>
      </g>

      <style>{`
        .cdt-exhaust {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cdt-puff 1.8s ease-out infinite;
        }
        .cdt-exhaust2 { animation-delay: -0.9s; }
        @keyframes cdt-puff {
          0% { transform: scale(0.4) translateY(0); opacity: 0.7; }
          100% { transform: scale(1.6) translateY(-14px); opacity: 0; }
        }
        .cdt-steam {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cdt-rise 2s ease-in-out infinite;
        }
        @keyframes cdt-rise {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cdt-exhaust, .cdt-steam { animation: none; }
        }
      `}</style>
    </svg>
  );
}
