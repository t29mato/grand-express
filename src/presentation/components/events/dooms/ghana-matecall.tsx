/**
 * 助手(メイト)が違う行き先を叫ぶ。道端で出した手のサインは合っていたはずが、
 * トロトロは標識の指す方向とは逆へ走り去っていく。
 *
 * 動くのは、逆方向へ走り去っていくトロトロ1台だけ。
 */
export function GhanaMatecall() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 乾いた午後の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="90" width="400" height="30" fill="#cfe4f0" />

      {/* 土の道。 */}
      <rect y="150" width="400" height="60" fill="#c9a877" />
      <rect y="150" width="400" height="6" fill="#a8895c" />

      {/* 道標。右向きの矢印だけが正しい方向を示す。 */}
      <g strokeLinejoin="round">
        <rect x="196" y="90" width="8" height="60" fill="#6b5330" stroke="#20364a" strokeWidth="1.6" />
        <path d="M204,102 h40 l-10,-10 M244,102 l-10,10" fill="none" stroke="#2f6b3a" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* 見送る人影。 */}
      <g fill="#4a4a52">
        <circle cx="260" cy="176" r="7" />
        <rect x="253" y="183" width="14" height="24" rx="3" />
      </g>

      {/* 逆方向へ走り去るトロトロ。**ここだけが動く。** */}
      <g className="gmc-bus" strokeLinejoin="round">
        <rect x="60" y="130" width="90" height="34" rx="4" fill="#f5b31c" stroke="#20364a" strokeWidth="2.5" />
        <rect x="66" y="136" width="16" height="14" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.4" />
        <rect x="86" y="136" width="16" height="14" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.4" />
        <rect x="106" y="136" width="16" height="14" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.4" />
        <circle cx="76" cy="166" r="8" fill="#2a2a2a" />
        <circle cx="134" cy="166" r="8" fill="#2a2a2a" />
        <path d="M60,146 h-14" stroke="#20364a" strokeWidth="3" strokeLinecap="round" />
      </g>

      <style>{`
        .gmc-bus {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: gmc-drive 2.4s ease-in infinite;
        }
        @keyframes gmc-drive {
          0% { transform: translateX(0); opacity: 1; }
          70% { transform: translateX(-180px); opacity: 1; }
          100% { transform: translateX(-220px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gmc-bus { animation: none; transform: translateX(-140px); }
        }
      `}</style>
    </svg>
  );
}
