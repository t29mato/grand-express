/**
 * 砂漠の町(カイロ、マラケシュ、ドバイなど)に重ねる動き。
 *
 * 稜線から砂が舞い上がって風下へ流れ、地面すれすれに陽炎が立ち、
 * オアシスの水が光り、なつめやしの葉が乾いた風にそよぐ。
 * 砂丘・らくだ・太陽は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldDesert() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 太陽(298,46)の陽の脈 */}
      <circle className="wdes-sun" cx="298" cy="46" r="30" fill="#ffcf80" opacity="0.18" />

      {/* 稜線から舞い上がる砂 */}
      <g fill="#f2ddb4">
        <ellipse className="wdes-sand wdes-a1" cx="120" cy="128" rx="34" ry="3.4" opacity="0.5" />
        <ellipse className="wdes-sand wdes-a2" cx="280" cy="136" rx="42" ry="3" opacity="0.45" />
        <ellipse className="wdes-sand wdes-a3" cx="190" cy="158" rx="50" ry="3.6" opacity="0.4" />
        <ellipse className="wdes-sand wdes-a4" cx="320" cy="186" rx="56" ry="3.2" opacity="0.35" />
      </g>

      {/* 地面すれすれの陽炎 */}
      <g fill="#f8dcb0">
        <ellipse className="wdes-heat-a" cx="200" cy="120" rx="140" ry="4" opacity="0.3" />
        <ellipse className="wdes-heat-b" cx="140" cy="146" rx="110" ry="3.4" opacity="0.24" />
      </g>

      {/* オアシス(60,140)の水面のきらめき */}
      <g fill="#bfe8f0">
        <ellipse className="wdes-water-a" cx="52" cy="139" rx="22" ry="2" opacity="0.5" />
        <ellipse className="wdes-water-b" cx="76" cy="142" rx="16" ry="1.6" opacity="0.4" />
      </g>

      {/* なつめやしの葉(静止画の葉 36,106 と 68,114 に重ねてそよがせる) */}
      <g>
        <path
          className="wdes-frond-a"
          d="M36,106c-13,-4 -18,3 -20,9c7,-6 13,-6 20,-2c7,-4 13,-4 20,2c-2,-6 -7,-13 -20,-9z"
          fill="#2f7d3f"
        />
        <path
          className="wdes-frond-b"
          d="M68,114c-11,-3 -15,3 -17,8c6,-5 11,-5 17,-2c6,-3 11,-3 17,2c-2,-5 -6,-11 -17,-8z"
          fill="#3f8f4f"
        />
      </g>

      <style>{`
        .wdes-sun, .wdes-sand, .wdes-heat-a, .wdes-heat-b,
        .wdes-water-a, .wdes-water-b, .wdes-frond-a, .wdes-frond-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .wdes-sun { animation: wdes-pulse 10s ease-in-out infinite; }
        .wdes-sand { animation: wdes-blow 13s linear infinite; }
        .wdes-a2 { animation-duration: 17s; animation-delay: -6s; }
        .wdes-a3 { animation-duration: 15s; animation-delay: -10s; }
        .wdes-a4 { animation-duration: 19s; animation-delay: -4s; }
        .wdes-heat-a { animation: wdes-heat 6.5s ease-in-out infinite; }
        .wdes-heat-b { animation: wdes-heat 8.5s ease-in-out infinite; animation-delay: -3s; }
        .wdes-water-a { animation: wdes-glint 5.5s ease-in-out infinite; }
        .wdes-water-b { animation: wdes-glint 7s ease-in-out infinite; animation-delay: -2.5s; }
        .wdes-frond-a { transform-origin: 50% 100%; animation: wdes-sway 6s ease-in-out infinite; }
        .wdes-frond-b { transform-origin: 50% 100%; animation: wdes-sway 7.4s ease-in-out infinite; animation-delay: -2.4s; }
        @keyframes wdes-pulse {
          0%, 100% { transform: scale(0.82); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
        @keyframes wdes-blow {
          0% { transform: translate(-60px, 4px) scaleX(0.6); opacity: 0; }
          25% { opacity: 0.45; }
          75% { opacity: 0.3; }
          100% { transform: translate(80px, -8px) scaleX(1.4); opacity: 0; }
        }
        @keyframes wdes-heat {
          0%, 100% { transform: scaleY(1) translateY(0); opacity: 0.16; }
          50% { transform: scaleY(2.2) translateY(-3px); opacity: 0.36; }
        }
        @keyframes wdes-glint {
          0%, 100% { transform: scaleX(0.8); opacity: 0.22; }
          50% { transform: scaleX(1.25); opacity: 0.6; }
        }
        @keyframes wdes-sway {
          0%, 100% { transform: rotate(-3.5deg) scaleX(1); }
          50% { transform: rotate(3.5deg) scaleX(0.94); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wdes-sun, .wdes-sand, .wdes-heat-a, .wdes-heat-b,
          .wdes-water-a, .wdes-water-b, .wdes-frond-a, .wdes-frond-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
