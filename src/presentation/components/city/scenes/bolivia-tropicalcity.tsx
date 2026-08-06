/**
 * 熱帯の平野の大きな町(サンタクルスなど)に重ねる動き。
 *
 * 積雲がゆっくり流れ、その影が畑を渡っていく。インコの群れが低く横切る。
 * 背景(空・平野・並木道)は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function BoliviaTropicalcity() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 流れる積雲 */}
      <g transform="translate(180,54)">
        <g className="btc-cloud-a" fill="#ffffff" opacity="0.42">
          <ellipse cx="0" cy="4" rx="34" ry="10" />
          <ellipse cx="-14" cy="-4" rx="20" ry="11" />
          <ellipse cx="12" cy="-6" rx="22" ry="12" />
        </g>
      </g>
      <g transform="translate(58,88)">
        <g className="btc-cloud-b" fill="#ffffff" opacity="0.3">
          <ellipse cx="0" cy="2" rx="24" ry="7" />
          <ellipse cx="10" cy="-3" rx="15" ry="8" />
        </g>
      </g>

      {/* 畑を渡る雲の影 */}
      <g fill="#3f6b2f">
        <g transform="translate(140,158)">
          <ellipse className="btc-shade-a" cx="0" cy="0" rx="62" ry="12" opacity="0.12" />
        </g>
        <g transform="translate(300,186)">
          <ellipse className="btc-shade-b" cx="0" cy="0" rx="48" ry="9" opacity="0.1" />
        </g>
      </g>

      {/* インコの群れ */}
      <g transform="translate(210,96)">
        <g className="btc-flock">
          <g transform="translate(0,0)">
            <path className="btc-wing btc-k1" d="M-8,0 q4,-6 8,0 q4,-6 8,0" stroke="#2f8f4a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(24,-10)">
            <path className="btc-wing btc-k2" d="M-7,0 q4,-5 7,0 q3,-5 7,0" stroke="#2f8f4a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(46,6)">
            <path className="btc-wing btc-k3" d="M-6,0 q3,-5 6,0 q3,-5 6,0" stroke="#2f8f4a" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        </g>
      </g>

      <style>{`
        .btc-cloud-a { animation: btc-drift-a 58s linear infinite; }
        .btc-cloud-b { animation: btc-drift-b 74s linear infinite; }
        .btc-shade-a { animation: btc-sweep-a 58s linear infinite; }
        .btc-shade-b { animation: btc-sweep-b 74s linear infinite; }
        .btc-flock { animation: btc-cross 26s linear infinite; }
        .btc-wing {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: btc-flap 0.9s ease-in-out infinite;
        }
        .btc-k2 { animation-delay: -0.2s; animation-duration: 1.05s; }
        .btc-k3 { animation-delay: -0.4s; animation-duration: 0.8s; }
        @keyframes btc-drift-a {
          0% { transform: translateX(-250px); }
          100% { transform: translateX(260px); }
        }
        @keyframes btc-drift-b {
          0% { transform: translateX(-130px); }
          100% { transform: translateX(400px); }
        }
        @keyframes btc-sweep-a {
          0% { transform: translateX(-230px); }
          100% { transform: translateX(280px); }
        }
        @keyframes btc-sweep-b {
          0% { transform: translateX(-370px); }
          100% { transform: translateX(160px); }
        }
        @keyframes btc-cross {
          0% { transform: translate(-280px, 14px); }
          100% { transform: translate(230px, -16px); }
        }
        @keyframes btc-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .btc-cloud-a, .btc-cloud-b, .btc-shade-a, .btc-shade-b,
          .btc-flock, .btc-wing { animation: none; }
        }
      `}</style>
    </svg>
  );
}
