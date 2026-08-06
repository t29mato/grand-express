/**
 * 田園(新潟など)に重ねる動き。
 *
 * 稲穂が左から順にたわみ、風が水田を渡っていく。
 * そのうえをとんぼが二匹、ふわふわと位置を変えながら飛ぶ。
 * 空・山・田は静止画が描いているので、ここでは何も塗りつぶさない。
 */

/** 稲穂を挿す畝。背景の株のあいだ(x=21,51,…)に置いて、混み合わないようにする。 */
const JRF_ROWS = [
  { y: 155, xs: [21, 81, 141, 201, 261, 321, 381], scale: 0.72 },
  { y: 173, xs: [21, 51, 81, 111, 141, 171, 201, 231, 261, 291, 321, 351, 381], scale: 0.88 },
  { y: 191, xs: [36, 66, 96, 126, 156, 186, 216, 246, 276, 306, 336, 366], scale: 1.1 },
];

export function JapanRicefield() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 風にたわむ稲穂 */}
      <g>
        {JRF_ROWS.map((row) =>
          row.xs.map((x, i) => (
            <g key={`${row.y}-${x}`} transform={`translate(${x},${row.y}) scale(${row.scale})`}>
              <g className="jrf-ear" style={{ animationDelay: `${(i * 0.28 + row.y * 0.01).toFixed(2)}s` }}>
                <path
                  d="M0,0 C0,-6 0,-10 2,-13"
                  stroke="#6f9e40"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <ellipse cx="4.6" cy="-15" rx="4.4" ry="1.9" fill="#c9b45e" transform="rotate(-32 4.6 -15)" />
              </g>
            </g>
          )),
        )}
      </g>

      {/* とんぼ(手前) */}
      <g transform="translate(78,128)">
        <g className="jrf-dragon-a">
          <path d="M-8,0 h15" stroke="#4a5a6a" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="9" cy="0" r="2.2" fill="#4a5a6a" />
          <ellipse className="jrf-wing jrf-wing-up" cx="0" cy="-3" rx="7" ry="2" fill="#dcecf6" opacity="0.75" />
          <ellipse className="jrf-wing jrf-wing-dn" cx="2" cy="3" rx="6" ry="1.8" fill="#dcecf6" opacity="0.6" />
        </g>
      </g>

      {/* とんぼ(奥・小さめ) */}
      <g transform="translate(312,148)">
        <g className="jrf-dragon-b">
          <path d="M-6,0 h11" stroke="#4a5a6a" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="7" cy="0" r="1.7" fill="#4a5a6a" />
          <ellipse className="jrf-wing jrf-wing-dn" cx="0" cy="-2.4" rx="5.4" ry="1.6" fill="#dcecf6" opacity="0.7" />
          <ellipse className="jrf-wing jrf-wing-up" cx="1.6" cy="2.4" rx="4.6" ry="1.4" fill="#dcecf6" opacity="0.55" />
        </g>
      </g>

      <style>{`
        .jrf-ear {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: jrf-bend 4.8s ease-in-out infinite;
        }
        .jrf-dragon-a { animation: jrf-hover-a 16s ease-in-out infinite; }
        .jrf-dragon-b { animation: jrf-hover-b 21s ease-in-out infinite; }
        .jrf-wing {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: jrf-flutter 0.6s ease-in-out infinite;
        }
        .jrf-wing-dn { animation-delay: -0.3s; }
        @keyframes jrf-bend {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes jrf-hover-a {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(26px, -12px); }
          45% { transform: translate(58px, 6px); }
          70% { transform: translate(22px, 16px); }
        }
        @keyframes jrf-hover-b {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-34px, -18px); }
          55% { transform: translate(-12px, -34px); }
          80% { transform: translate(18px, -10px); }
        }
        @keyframes jrf-flutter {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.35); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jrf-ear, .jrf-dragon-a, .jrf-dragon-b, .jrf-wing { animation: none; }
        }
      `}</style>
    </svg>
  );
}
