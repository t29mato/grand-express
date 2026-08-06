/**
 * 大都市(東京など)に重ねる動き。
 *
 * 高層ビルの窓がひとつずつ灯ったり落ちたりし、屋上の航空障害灯が赤く点滅する。
 * 薄暮の空を旅客機が一機、ゆっくり横切っていく。
 * 空・ビル・既存の窓は静止画が描いているので、ここでは何も塗りつぶさない。
 */

/** ちらつかせる窓。背景の窓と同じ座標に重ねて、明るくなったり落ちたりを作る。 */
const JMT_WINDOWS: [number, number][] = [
  [15, 162],
  [25, 194],
  [45, 122],
  [55, 154],
  [45, 186],
  [85, 174],
  [105, 190],
  [135, 100],
  [145, 164],
  [175, 178],
  [205, 194],
  [255, 168],
  [265, 200],
  [285, 132],
  [295, 180],
  [325, 112],
  [345, 160],
  [325, 192],
  [375, 156],
  [385, 188],
];

export function JapanMetropolis() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灯りがゆらぐ窓 */}
      <g fill="#ffe3a0">
        {JMT_WINDOWS.map(([x, y], i) => (
          <rect
            key={`${x}-${y}`}
            className="jmt-win"
            style={{ animationDuration: `${6 + (i % 5) * 2.4}s`, animationDelay: `-${(i * 1.7).toFixed(1)}s` }}
            x={x}
            y={y}
            width="6"
            height="8"
            opacity="0.45"
          />
        ))}
      </g>

      {/* 屋上の航空障害灯 */}
      <g fill="#ff5347">
        <circle className="jmt-beacon jmt-beacon-a" cx="137" cy="78" r="2.6" />
        <circle className="jmt-beacon jmt-beacon-b" cx="337" cy="90" r="2.6" />
      </g>

      {/* 空を横切る旅客機 */}
      <g transform="translate(150,26)">
        <g className="jmt-plane">
          <path d="M-1,0 L-10,-8 L-3,-8 L5,-0.6 Z" fill="#b9c1d8" />
          <path d="M-1,0 L-10,8 L-3,8 L5,0.6 Z" fill="#b9c1d8" />
          <path d="M-10,0 L-15,-5 L-11,-5 Z" fill="#b9c1d8" />
          <ellipse cx="0" cy="0" rx="12" ry="2.2" fill="#e2e7f4" />
          <circle className="jmt-navlight" cx="-13" cy="0" r="1.5" fill="#ff5347" />
        </g>
      </g>

      <style>{`
        .jmt-win { animation-name: jmt-twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        .jmt-beacon { animation: jmt-blink 3.2s ease-in-out infinite; }
        .jmt-beacon-b { animation-duration: 4.1s; animation-delay: -1.4s; }
        .jmt-plane { animation: jmt-fly 27s linear infinite; animation-delay: -5s; }
        .jmt-navlight { animation: jmt-blink 2.2s steps(1, end) infinite; }
        @keyframes jmt-twinkle {
          0%, 40% { opacity: 0.08; }
          55%, 90% { opacity: 0.85; }
          100% { opacity: 0.08; }
        }
        @keyframes jmt-blink {
          0%, 44% { opacity: 1; }
          55%, 100% { opacity: 0.12; }
        }
        @keyframes jmt-fly {
          0% { transform: translate(-170px, 10px); }
          100% { transform: translate(250px, -8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jmt-win, .jmt-beacon, .jmt-plane, .jmt-navlight { animation: none; }
        }
      `}</style>
    </svg>
  );
}
