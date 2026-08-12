/**
 * バンジャール(隣組)の寄付籠が回る。輪になった人々のあいだを籠が渡り、
 * 手から手へ紙幣が籠に落ちていく。動くのは籠の移動と、紙幣が落ちる動きだけ。
 */
export function BaliSumbanganUpacara() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="90" fill="#cfe4f0" />
      <rect y="150" width="400" height="60" fill="#8fae63" />

      {/* 輪になった人々。 */}
      {(
        [
          { x: 50, color: "#4a7bd0" },
          { x: 130, color: "#e8443f" },
          { x: 210, color: "#3f8f4a" },
          { x: 290, color: "#c2603c" },
          { x: 360, color: "#5b8fe8" },
        ] as const
      ).map(({ x, color }) => (
        <g key={x} strokeLinejoin="round">
          <ellipse cx={x} cy="196" rx="12" ry="3" fill="#000" opacity="0.14" />
          <path d={`M${x - 8},192q8,-4 16,0l-2,-18q-6,-3 -12,0z`} fill={color} />
          <circle cx={x} cy="166" r="6" fill="#a8763a" />
          <rect x={x - 3.4} y="192" width="3.4" height="5" fill="#3a3446" />
          <rect x={x + 1} y="192" width="3.4" height="5" fill="#3a3446" />
        </g>
      ))}

      {/* 寄付籠(手から手へ渡る)。 */}
      <g className="bsu-basket">
        <rect x="-14" y="0" width="28" height="10" rx="2" fill="#c9a877" />
        <path d="M-14,0h28l-4,-6h-20z" fill="#a8926c" />
      </g>

      {/* 落ちる紙幣。 */}
      <g className="bsu-bill">
        <rect x="-8" y="0" width="16" height="9" rx="1" fill="#6fae4a" stroke="#3a3446" strokeWidth="0.8" />
      </g>

      <style>{`
        .bsu-basket {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bsu-pass 4s linear infinite;
        }
        @keyframes bsu-pass {
          0% { transform: translate(50px,182px); }
          22% { transform: translate(130px,182px); }
          44% { transform: translate(210px,182px); }
          66% { transform: translate(290px,182px); }
          88% { transform: translate(360px,182px); }
          100% { transform: translate(50px,182px); }
        }
        .bsu-bill {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bsu-drop 4s linear infinite;
        }
        @keyframes bsu-drop {
          0%, 4% { transform: translate(50px,168px); opacity: 0; }
          8% { opacity: 1; }
          20% { transform: translate(130px,168px); opacity: 0; }
          26% { opacity: 1; }
          42% { transform: translate(210px,168px); opacity: 0; }
          48% { opacity: 1; }
          64% { transform: translate(290px,168px); opacity: 0; }
          70% { opacity: 1; }
          86% { transform: translate(360px,168px); opacity: 0; }
          92% { opacity: 1; }
          100% { transform: translate(50px,168px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bsu-basket { animation: none; transform: translate(210px,182px); }
          .bsu-bill { animation: none; transform: translate(210px,168px); opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
