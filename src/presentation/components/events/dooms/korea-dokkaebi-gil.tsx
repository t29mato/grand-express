/**
 * トッケビに化かされる。帰り道はどの角を曲がっても同じ景色に見え、夜明けに
 * なってようやく同じ畑を四度も横切っていたと分かった。
 *
 * この盤面の厄災の神は**トッケビ**。ここでは姿を出さず、
 * **円を描く足あとと、導く鬼火**だけで「化かされている」ことを示す。
 * 動くのは、先を漂う鬼火1つだけ。
 */
export function KoreaDokkaebiGil() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の畑道。 */}
      <rect width="400" height="210" fill="#1c2436" />
      <rect y="0" width="400" height="80" fill="#26314a" />
      <circle cx="330" cy="40" r="18" fill="#e8e0c8" opacity="0.85" />
      <g fill="#e8e0c8" opacity="0.6">
        <circle cx="60" cy="24" r="1.6" />
        <circle cx="120" cy="46" r="1.4" />
        <circle cx="220" cy="20" r="1.6" />
        <circle cx="270" cy="56" r="1.4" />
      </g>

      {/* 畑。 */}
      <rect y="80" width="400" height="130" fill="#2f3a2a" />
      <g stroke="#3a4a32" strokeWidth="3" fill="none">
        <path d="M0,110 L400,102" />
        <path d="M0,140 L400,128" />
        <path d="M0,180 L400,164" />
      </g>

      {/* 堂々巡りした足あと。輪になっている。 */}
      <g fill="#141a26" opacity="0.9">
        <ellipse cx="150" cy="150" rx="7" ry="4" />
        <ellipse cx="180" cy="132" rx="7" ry="4" />
        <ellipse cx="210" cy="126" rx="7" ry="4" />
        <ellipse cx="238" cy="140" rx="7" ry="4" />
        <ellipse cx="242" cy="170" rx="7" ry="4" />
        <ellipse cx="216" cy="186" rx="7" ry="4" />
        <ellipse cx="184" cy="188" rx="7" ry="4" />
        <ellipse cx="156" cy="176" rx="7" ry="4" />
      </g>

      {/* 立ち止まって辺りを見回す人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M196,152 L192,180" stroke="#2f2c34" strokeWidth="8" fill="none" />
        <path d="M204,152 L210,180" stroke="#3d3a42" strokeWidth="8" fill="none" />
        <path d="M198,128 L198,154" stroke="#4a5a72" strokeWidth="18" fill="none" />
        <circle cx="198" cy="116" r="10" fill="#d9a273" stroke="#141a26" strokeWidth="2" />
        <path d="M188,132 L176,120" stroke="#d9a273" strokeWidth="7" fill="none" />
        {/* 提げた灯り。 */}
        <path d="M176,120 L172,132" stroke="#4a3c2c" strokeWidth="2" />
        <circle cx="172" cy="136" r="4.5" fill="#f5b31c" opacity="0.9" />
      </g>

      {/* 遠くの竹林のシルエット。 */}
      <g stroke="#242e3a" strokeWidth="3" strokeLinecap="round">
        <path d="M20,110 L22,60" />
        <path d="M34,110 L30,52" />
        <path d="M48,110 L52,64" />
      </g>

      {/* 先を漂う鬼火(도깨비불)。**ここだけが動く。** */}
      <g className="kdg-wisp">
        <circle r="10" fill="#5fd0a0" opacity="0.35" />
        <circle r="5" fill="#9ff0c8" opacity="0.9" />
      </g>

      <style>{`
        .kdg-wisp {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: kdg-drift 4s ease-in-out infinite;
        }
        @keyframes kdg-drift {
          0%   { transform: translate(270px, 100px); opacity: 0.5; }
          25%  { transform: translate(300px, 80px); opacity: 1; }
          50%  { transform: translate(280px, 60px); opacity: 0.6; }
          75%  { transform: translate(250px, 78px); opacity: 1; }
          100% { transform: translate(270px, 100px); opacity: 0.5; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kdg-wisp {
            animation: none;
            transform: translate(280px, 80px);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
