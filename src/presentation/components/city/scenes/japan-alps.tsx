/**
 * 山岳の城下(松本など)に重ねる動き。
 *
 * 雪の稜線から雪煙が風下へ吹き流され、その上を鷹が大きく旋回する。
 * 高い雲もゆっくり流れていく。
 * 空・連峰・林は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function JapanAlps() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 流れる高い雲 */}
      <g transform="translate(120,26)">
        <g className="jal-cloud" fill="#ffffff" opacity="0.3">
          <ellipse cx="0" cy="0" rx="22" ry="6" />
          <ellipse cx="-12" cy="2" rx="14" ry="4.5" />
          <ellipse cx="14" cy="2" rx="16" ry="4.5" />
        </g>
      </g>

      {/* 稜線から吹き流れる雪煙(左の峰) */}
      <g transform="translate(60,34)" stroke="#ffffff" strokeLinecap="round" fill="none">
        <path className="jal-drift jal-d1" d="M2,2 q22,-5 42,-11" strokeWidth="2.6" opacity="0.5" />
        <path className="jal-drift jal-d2" d="M4,8 q18,-2 34,-6" strokeWidth="2" opacity="0.4" />
        <path className="jal-drift jal-d3" d="M6,14 q16,-1 30,-3" strokeWidth="1.6" opacity="0.32" />
      </g>

      {/* 稜線から吹き流れる雪煙(主峰) */}
      <g transform="translate(200,22)" stroke="#ffffff" strokeLinecap="round" fill="none">
        <path className="jal-drift jal-d4" d="M2,2 q24,-6 46,-12" strokeWidth="2.8" opacity="0.5" />
        <path className="jal-drift jal-d5" d="M4,9 q20,-3 38,-7" strokeWidth="2.1" opacity="0.4" />
        <path className="jal-drift jal-d6" d="M6,16 q17,-1 32,-3" strokeWidth="1.7" opacity="0.3" />
      </g>

      {/* 旋回する鷹 */}
      <g transform="translate(318,62)">
        <g className="jal-hawk">
          <g className="jal-tilt">
            <path
              className="jal-wing"
              d="M-13,0 Q-6,-8 0,-1.2 Q6,-8 13,0 Q6,-3 0,1.6 Q-6,-3 -13,0 Z"
              fill="#3d3a34"
              opacity="0.8"
            />
          </g>
        </g>
      </g>

      <style>{`
        .jal-cloud { animation: jal-cloud-drift 72s linear infinite; animation-delay: -24s; }
        .jal-drift { animation: jal-blow 6.5s ease-in-out infinite; }
        .jal-d2 { animation-duration: 8s; animation-delay: -2.2s; }
        .jal-d3 { animation-duration: 7.2s; animation-delay: -4.4s; }
        .jal-d4 { animation-duration: 7.6s; animation-delay: -1.1s; }
        .jal-d5 { animation-duration: 9s; animation-delay: -3.3s; }
        .jal-d6 { animation-duration: 6.8s; animation-delay: -5.5s; }
        .jal-hawk { animation: jal-soar 28s ease-in-out infinite; }
        .jal-tilt { transform-box: fill-box; transform-origin: 50% 50%; animation: jal-bank 28s ease-in-out infinite; }
        .jal-wing { transform-box: fill-box; transform-origin: 50% 60%; animation: jal-beat 4.6s ease-in-out infinite; }
        @keyframes jal-cloud-drift {
          0% { transform: translateX(-160px); }
          100% { transform: translateX(320px); }
        }
        @keyframes jal-blow {
          0% { transform: translateX(-6px) scaleX(0.6); opacity: 0; }
          35% { opacity: 0.5; }
          100% { transform: translateX(26px) scaleX(1.25); opacity: 0; }
        }
        @keyframes jal-soar {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-62px, 16px); }
          50% { transform: translate(-96px, -10px); }
          75% { transform: translate(-40px, -24px); }
        }
        @keyframes jal-bank {
          0%, 100% { transform: rotate(6deg); }
          30% { transform: rotate(-8deg); }
          65% { transform: rotate(4deg); }
        }
        @keyframes jal-beat {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.62); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jal-cloud, .jal-drift, .jal-hawk, .jal-tilt, .jal-wing { animation: none; }
        }
      `}</style>
    </svg>
  );
}
