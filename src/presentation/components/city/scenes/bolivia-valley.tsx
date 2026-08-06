/**
 * アンデスの谷あいの村(サマイパタなど)に重ねる動き。
 *
 * コンドルが翼をひろげたまま谷をゆっくり滑空し、雲が流れ、その影が段々畑を渡る。
 * 背景(空・山・段々畑)は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function BoliviaValley() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 流れる薄雲 */}
      <g transform="translate(200,42)">
        <g className="bva-cloud" fill="#ffffff" opacity="0.34">
          <ellipse cx="0" cy="0" rx="28" ry="8" />
          <ellipse cx="-15" cy="3" rx="17" ry="6" />
          <ellipse cx="17" cy="3" rx="19" ry="6" />
        </g>
      </g>

      {/* 段々畑を渡る雲の影 */}
      <g fill="#3f6b3a">
        <g transform="translate(150,166)">
          <ellipse className="bva-shade-a" cx="0" cy="0" rx="58" ry="11" opacity="0.13" />
        </g>
        <g transform="translate(310,196)">
          <ellipse className="bva-shade-b" cx="0" cy="0" rx="44" ry="8" opacity="0.1" />
        </g>
      </g>

      {/* 滑空するコンドル */}
      <g transform="translate(196,64)">
        <g className="bva-condor">
          <g className="bva-bank">
            <path
              className="bva-wing-l"
              d="M-3,-1 C-10,-5 -18,-6 -25,-5 L-22,-3 L-26,-2.4 L-23,-0.8 L-27,0 L-22,1.4 C-14,3 -8,3 -3,2.2 Z"
              fill="#33302b"
            />
            <path
              className="bva-wing-r"
              d="M3,-1 C10,-5 18,-6 25,-5 L22,-3 L26,-2.4 L23,-0.8 L27,0 L22,1.4 C14,3 8,3 3,2.2 Z"
              fill="#33302b"
            />
            <ellipse cx="0" cy="0.4" rx="5" ry="3" fill="#3d3933" />
            <ellipse cx="0" cy="-2.6" rx="3.4" ry="1.6" fill="#efe6d4" />
            <path d="M-2.6,3 L0,8 L2.6,3 Z" fill="#33302b" />
          </g>
        </g>
      </g>

      <style>{`
        .bva-cloud { animation: bva-drift 70s linear infinite; }
        .bva-shade-a { animation: bva-sweep-a 70s linear infinite; }
        .bva-shade-b { animation: bva-sweep-b 92s linear infinite; }
        .bva-condor { animation: bva-soar 30s ease-in-out infinite; }
        .bva-bank { transform-box: fill-box; transform-origin: 50% 50%; animation: bva-tilt 30s ease-in-out infinite; }
        .bva-wing-l { transform-box: fill-box; transform-origin: 100% 70%; animation: bva-hold 9s ease-in-out infinite; }
        .bva-wing-r { transform-box: fill-box; transform-origin: 0% 70%; animation: bva-hold-r 9s ease-in-out infinite; }
        @keyframes bva-drift {
          0% { transform: translateX(-240px); }
          100% { transform: translateX(250px); }
        }
        @keyframes bva-sweep-a {
          0% { transform: translateX(-220px); }
          100% { transform: translateX(280px); }
        }
        @keyframes bva-sweep-b {
          0% { transform: translateX(-360px); }
          100% { transform: translateX(140px); }
        }
        @keyframes bva-soar {
          0% { transform: translate(-190px, 22px) scale(0.85); }
          50% { transform: translate(40px, -14px) scale(1.05); }
          100% { transform: translate(240px, 18px) scale(0.85); }
        }
        @keyframes bva-tilt {
          0%, 100% { transform: rotate(6deg); }
          50% { transform: rotate(-6deg); }
        }
        @keyframes bva-hold {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes bva-hold-r {
          0%, 100% { transform: rotate(3deg); }
          50% { transform: rotate(-3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bva-cloud, .bva-shade-a, .bva-shade-b,
          .bva-condor, .bva-bank, .bva-wing-l, .bva-wing-r { animation: none; }
        }
      `}</style>
    </svg>
  );
}
