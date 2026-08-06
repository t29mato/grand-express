/**
 * 富士を望む温泉地(箱根など)に重ねる動き。
 *
 * 源泉から湯気が立ちのぼって消え、山腹には霞がゆっくり流れる。
 * 空・富士・草地は静止画が描いているので、ここでは何も塗りつぶさない。
 */

/** 湯けむりの上がる場所(背景の草木のあいだ)。 */
const JFV_VENTS = [
  { x: 47, y: 180, scale: 1 },
  { x: 105, y: 186, scale: 1.15 },
  { x: 281, y: 184, scale: 1.05 },
  { x: 341, y: 178, scale: 0.9 },
];

export function JapanFujiview() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 山腹を流れる霞 */}
      <g fill="#ffffff">
        <ellipse className="jfv-haze jfv-h1" cx="196" cy="94" rx="104" ry="6" opacity="0.32" />
        <ellipse className="jfv-haze jfv-h2" cx="232" cy="112" rx="78" ry="5" opacity="0.24" />
      </g>

      {/* 立ちのぼる湯気 */}
      <g fill="#ffffff">
        {JFV_VENTS.map((v, i) => (
          <g key={v.x} transform={`translate(${v.x},${v.y}) scale(${v.scale})`}>
            <ellipse
              className="jfv-puff"
              style={{ animationDelay: `-${(i * 0.9).toFixed(1)}s` }}
              cx="0"
              cy="-2"
              rx="5.4"
              ry="3.8"
              opacity="0.6"
            />
            <ellipse
              className="jfv-puff"
              style={{ animationDelay: `-${(i * 0.9 + 1.8).toFixed(1)}s` }}
              cx="-1.4"
              cy="-9"
              rx="6.8"
              ry="4.6"
              opacity="0.5"
            />
            <ellipse
              className="jfv-puff"
              style={{ animationDelay: `-${(i * 0.9 + 3.6).toFixed(1)}s` }}
              cx="-3.2"
              cy="-17"
              rx="8.2"
              ry="5.4"
              opacity="0.4"
            />
            <ellipse
              className="jfv-puff"
              style={{ animationDelay: `-${(i * 0.9 + 5.4).toFixed(1)}s` }}
              cx="-5.4"
              cy="-25"
              rx="9.6"
              ry="6.2"
              opacity="0.3"
            />
          </g>
        ))}
      </g>

      <style>{`
        .jfv-puff {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: jfv-rise 8.4s linear infinite;
        }
        .jfv-haze { animation: jfv-drift 64s ease-in-out infinite; }
        .jfv-h2 { animation-duration: 84s; animation-delay: -30s; }
        @keyframes jfv-rise {
          0% { transform: translate(2px, 7px) scale(0.55); opacity: 0; }
          25% { opacity: 0.7; }
          75% { opacity: 0.45; }
          100% { transform: translate(-6px, -13px) scale(1.35); opacity: 0; }
        }
        @keyframes jfv-drift {
          0%, 100% { transform: translateX(-58px); }
          50% { transform: translateX(58px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jfv-puff, .jfv-haze { animation: none; }
        }
      `}</style>
    </svg>
  );
}
