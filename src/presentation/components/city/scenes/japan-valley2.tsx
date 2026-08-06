/**
 * 山あいの盆地(盛岡など)に重ねる動き。
 *
 * 段々の牧草地を風がひと撫でしていき、草の株が左から順にたわむ。
 * 高いところを二羽の鳥が旋回し、薄雲がゆっくり流れる。
 * 空・山・草地は静止画が描いているので、ここでは何も塗りつぶさない。
 */

/** 手前の草の株。x座標の順に遅らせて、風が左から右へ渡るように見せる。 */
const JV2_FRONT = [14, 44, 74, 104, 134, 164, 194, 224, 254, 284, 314, 344, 374];
/** 奥の草の株。手前より小さく、間隔をあける。 */
const JV2_BACK = [28, 88, 148, 208, 268, 328, 388];

export function JapanValley2() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 流れる薄雲 */}
      <g transform="translate(150,44)">
        <g className="jv2-cloud" fill="#ffffff" opacity="0.38">
          <ellipse cx="0" cy="0" rx="24" ry="7.5" />
          <ellipse cx="-13" cy="3" rx="15" ry="5.5" />
          <ellipse cx="15" cy="3" rx="17" ry="5.5" />
        </g>
      </g>

      {/* 旋回する鳥 */}
      <g transform="translate(300,64)">
        <g className="jv2-bird-a">
          <path
            className="jv2-wing-a"
            d="M-7,0 Q-3.5,-5 0,-0.8 Q3.5,-5 7,0"
            fill="none"
            stroke="#3f4a3a"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
      </g>
      <g transform="translate(330,80)">
        <g className="jv2-bird-b">
          <path
            className="jv2-wing-b"
            d="M-5,0 Q-2.5,-4 0,-0.6 Q2.5,-4 5,0"
            fill="none"
            stroke="#3f4a3a"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      </g>

      {/* 奥の草 */}
      <g stroke="#6b9a5f" strokeWidth="1.2" strokeLinecap="round" fill="none">
        {JV2_BACK.map((x, i) => (
          <g key={x} transform={`translate(${x},178)`}>
            <path
              className="jv2-blade"
              style={{ animationDelay: `${(i * 0.34).toFixed(2)}s` }}
              d="M0,0 C-1,-4 -3,-6 -4,-9 M0,0 C0,-4 0,-7 0,-10 M0,0 C1,-4 3,-6 4,-8"
            />
          </g>
        ))}
      </g>

      {/* 手前の草 */}
      <g stroke="#5d8a54" strokeWidth="1.5" strokeLinecap="round" fill="none">
        {JV2_FRONT.map((x, i) => (
          <g key={x} transform={`translate(${x},207)`}>
            <path
              className="jv2-blade"
              style={{ animationDelay: `${(i * 0.22).toFixed(2)}s` }}
              d="M0,0 C-2,-5 -4,-8 -5,-12 M0,0 C0,-6 0,-9 0,-14 M0,0 C2,-5 4,-8 6,-11"
            />
          </g>
        ))}
      </g>

      <style>{`
        .jv2-blade {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: jv2-sway 4.4s ease-in-out infinite;
        }
        .jv2-cloud { animation: jv2-drift 58s linear infinite; animation-delay: -20s; }
        .jv2-bird-a { animation: jv2-circle-a 19s ease-in-out infinite; }
        .jv2-bird-b { animation: jv2-circle-b 25s ease-in-out infinite; }
        .jv2-wing-a, .jv2-wing-b {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: jv2-flap 1.6s ease-in-out infinite;
        }
        .jv2-wing-b { animation-duration: 2.1s; }
        @keyframes jv2-sway {
          0%, 100% { transform: rotate(-7deg) scaleY(1); }
          50% { transform: rotate(7deg) scaleY(0.94); }
        }
        @keyframes jv2-drift {
          0% { transform: translateX(-190px); }
          100% { transform: translateX(280px); }
        }
        @keyframes jv2-circle-a {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-46px, 12px); }
          50% { transform: translate(-70px, -6px); }
          75% { transform: translate(-30px, -18px); }
        }
        @keyframes jv2-circle-b {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-24px, -14px); }
          50% { transform: translate(-58px, -4px); }
          75% { transform: translate(-34px, 10px); }
        }
        @keyframes jv2-flap {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jv2-blade, .jv2-cloud, .jv2-bird-a, .jv2-bird-b, .jv2-wing-a, .jv2-wing-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
