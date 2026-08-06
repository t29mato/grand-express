/**
 * レー(himalaya)に重ねる動き。
 *
 * タルチョがぱたぱたとはためき、稜線から雪煙が横に流れ、
 * 大きな鳥が一羽、峰の上を旋回する。乾いた空気に細かい粉雪が舞う。
 * 背景(空・雪山・僧院)は下の静止画が描いているので、ここでは動くものだけ。
 */

/** 背景のタルチョと同じ位置・同じ色。ここに重ねてはためかせる。 */
const HIM_FLAGS: ReadonlyArray<readonly [number, number, string]> = [
  [7, 111.5, "#e8443f"],
  [34, 114, "#f5b31c"],
  [61, 116.5, "#5b8fe8"],
  [88, 119, "#f6efe2"],
  [115, 120.5, "#e8447a"],
  [142, 122, "#e8443f"],
  [169, 123, "#f5b31c"],
  [196, 123, "#5b8fe8"],
  [223, 122.5, "#f6efe2"],
  [250, 121.5, "#e8447a"],
  [277, 120.5, "#e8443f"],
  [304, 118.5, "#f5b31c"],
  [331, 116, "#5b8fe8"],
  [358, 113.5, "#f6efe2"],
];

export function IndiaHimalaya() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* はためくタルチョ */}
      <g>
        {HIM_FLAGS.map(([x, y, color], i) => (
          <path
            key={x}
            className="ihim-flag"
            d={`M${x},${y}h14l-7,15z`}
            fill={color}
            opacity=".95"
            style={{ animationDelay: `${(i % 5) * 0.18 + (i % 3) * 0.11}s` }}
          />
        ))}
      </g>

      {/* 稜線を離れて流れる雪煙 */}
      <g fill="#f8fbfd">
        <g transform="translate(60,58)">
          <path className="ihim-drift ihim-drift-1" d="M0,0c16,-4 38,-3 54,-9c-13,11 -34,15 -54,11z" />
        </g>
        <g transform="translate(144,46)">
          <path className="ihim-drift ihim-drift-2" d="M0,0c14,-3 34,-2 48,-8c-12,10 -30,13 -48,9z" />
        </g>
        <g transform="translate(306,80)">
          <path className="ihim-drift ihim-drift-3" d="M0,0c12,-3 28,-2 40,-7c-10,9 -25,11 -40,8z" />
        </g>
      </g>

      {/* 峰の上を旋回する鳥 */}
      <g className="ihim-raptor">
        <path className="ihim-raptor-wing" d="M-13,0Q-6.5,-6 0,0Q6.5,-6 13,0" fill="none" stroke="#3f4a52" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      {/* 舞い上がる粉雪 */}
      <g fill="#ffffff">
        <circle className="ihim-mote ihim-mote-1" cx="96" cy="150" r="1.6" />
        <circle className="ihim-mote ihim-mote-2" cx="284" cy="162" r="1.4" />
        <circle className="ihim-mote ihim-mote-3" cx="46" cy="172" r="1.8" />
        <circle className="ihim-mote ihim-mote-4" cx="350" cy="156" r="1.5" />
        <circle className="ihim-mote ihim-mote-5" cx="196" cy="180" r="1.4" />
      </g>

      <style>{`
        .ihim-flag {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: ihim-flutter 2.6s ease-in-out infinite;
        }
        @keyframes ihim-flutter {
          0%, 100% { transform: scale(1.14) rotate(-9deg); }
          50%      { transform: scale(1.14) rotate(8deg); }
        }

        .ihim-drift { transform-box: fill-box; transform-origin: 0 50%; opacity: 0; }
        .ihim-drift-1 { animation: ihim-blow 9s ease-out infinite; }
        .ihim-drift-2 { animation: ihim-blow 11s ease-out 3.5s infinite; }
        .ihim-drift-3 { animation: ihim-blow 10s ease-out 6.5s infinite; }
        @keyframes ihim-blow {
          0%   { transform: translate(0, 0) scaleX(0.4); opacity: 0; }
          35%  { opacity: 0.55; }
          100% { transform: translate(46px, -10px) scaleX(1.6); opacity: 0; }
        }

        .ihim-raptor { animation: ihim-soar 30s ease-in-out infinite; }
        @keyframes ihim-soar {
          0%   { transform: translate(360px, 34px); }
          25%  { transform: translate(240px, 22px); }
          50%  { transform: translate(140px, 40px); }
          75%  { transform: translate(250px, 52px); }
          100% { transform: translate(360px, 34px); }
        }
        .ihim-raptor-wing {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: ihim-tilt 6s ease-in-out infinite alternate;
        }
        @keyframes ihim-tilt {
          from { transform: rotate(-7deg) scaleY(0.8); }
          to   { transform: rotate(7deg) scaleY(1); }
        }

        .ihim-mote { opacity: 0; }
        .ihim-mote-1 { animation: ihim-swirl 8s linear infinite; }
        .ihim-mote-2 { animation: ihim-swirl 10s linear 2s infinite; }
        .ihim-mote-3 { animation: ihim-swirl 9s linear 4.5s infinite; }
        .ihim-mote-4 { animation: ihim-swirl 11s linear 6s infinite; }
        .ihim-mote-5 { animation: ihim-swirl 12s linear 1.2s infinite; }
        @keyframes ihim-swirl {
          0%   { transform: translate(0, 0); opacity: 0; }
          30%  { opacity: 0.7; }
          100% { transform: translate(52px, -28px); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ihim-flag, .ihim-drift-1, .ihim-drift-2, .ihim-drift-3,
          .ihim-raptor, .ihim-raptor-wing,
          .ihim-mote-1, .ihim-mote-2, .ihim-mote-3, .ihim-mote-4, .ihim-mote-5 { animation: none; }
          .ihim-flag { transform: scale(1.14) rotate(-5deg); }
          .ihim-drift { opacity: 0.5; transform: translate(24px, -6px) scaleX(1.2); }
          .ihim-raptor { transform: translate(300px, 30px); }
          .ihim-mote { opacity: 0.6; }
        }
      `}</style>
    </svg>
  );
}
