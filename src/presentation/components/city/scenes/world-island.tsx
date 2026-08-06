/**
 * 島(ホノルル、スバ、パペーテなど)に重ねる動き。
 *
 * 火口から白い噴気が細く上がり、環礁の内側で波がきらめき、
 * 椰子が貿易風にそよいで、軍艦鳥が山の肩をまわっていく。
 * 島影・浜・カヌーは静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldIsland() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 火口(178,58)から立ちのぼる噴気 */}
      <g fill="#eef4f6">
        <circle className="wisl-steam wisl-t1" cx="178" cy="56" r="4" opacity="0.4" />
        <circle className="wisl-steam wisl-t2" cx="178" cy="56" r="5.4" opacity="0.32" />
        <circle className="wisl-steam wisl-t3" cx="178" cy="56" r="3.2" opacity="0.44" />
      </g>

      {/* 礁湖のきらめき(海は y=116〜164) */}
      <g stroke="#ddf6fa" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path className="wisl-wave wisl-w1" d="M44,126h62" opacity="0.55" />
        <path className="wisl-wave wisl-w2" d="M206,122h72" opacity="0.5" />
        <path className="wisl-wave wisl-w3" d="M128,140h92" opacity="0.55" />
        <path className="wisl-wave wisl-w4" d="M288,144h72" opacity="0.5" />
        <path className="wisl-wave wisl-w5" d="M30,156h68" opacity="0.45" />
      </g>

      {/* 浜に寄せる泡(砂との境 y=164) */}
      <g fill="#f0fdfd">
        <ellipse className="wisl-foam-a" cx="120" cy="163" rx="88" ry="3.4" opacity="0.5" />
        <ellipse className="wisl-foam-b" cx="310" cy="164" rx="80" ry="3" opacity="0.42" />
      </g>

      {/* 椰子の葉(静止画の葉 30,156 / 200,156 / 370,156 に重ねる) */}
      <g fill="#2f7d3f">
        <path
          className="wisl-frond wisl-f1"
          d="M30,156c-14,-4 -19,3 -21,9c7,-6 14,-6 21,-2c7,-4 14,-4 21,2c-2,-6 -7,-13 -21,-9z"
        />
        <path
          className="wisl-frond wisl-f2"
          d="M200,156c-14,-4 -19,3 -21,9c7,-6 14,-6 21,-2c7,-4 14,-4 21,2c-2,-6 -7,-13 -21,-9z"
        />
        <path
          className="wisl-frond wisl-f3"
          d="M370,156c-14,-4 -19,3 -21,9c7,-6 14,-6 21,-2c7,-4 14,-4 21,2c-2,-6 -7,-13 -21,-9z"
        />
      </g>

      {/* 山の肩をまわる軍艦鳥 */}
      <g transform="translate(240,72)">
        <g className="wisl-bird">
          <path className="wisl-flap" d="M-9,0 Q-4.5,-6 0,-0.9 Q4.5,-6 9,0" fill="none" stroke="#3a3428" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        </g>
      </g>

      <style>{`
        .wisl-steam, .wisl-wave, .wisl-foam-a, .wisl-foam-b, .wisl-frond, .wisl-flap {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .wisl-steam { animation: wisl-rise 10s linear infinite; }
        .wisl-t2 { animation-duration: 13s; animation-delay: -5s; }
        .wisl-t3 { animation-duration: 8s; animation-delay: -6.5s; }
        .wisl-wave { animation: wisl-roll 13s linear infinite; }
        .wisl-w2 { animation-duration: 17s; animation-delay: -5s; }
        .wisl-w3 { animation-duration: 11s; animation-delay: -8s; }
        .wisl-w4 { animation-duration: 15s; animation-delay: -3s; }
        .wisl-w5 { animation-duration: 12s; animation-delay: -9s; }
        .wisl-foam-a { animation: wisl-wash 8s ease-in-out infinite; }
        .wisl-foam-b { animation: wisl-wash 10s ease-in-out infinite; animation-delay: -4.5s; }
        .wisl-frond { transform-origin: 50% 100%; animation: wisl-sway 5.6s ease-in-out infinite; }
        .wisl-f2 { animation-duration: 6.6s; animation-delay: -2s; }
        .wisl-f3 { animation-duration: 4.9s; animation-delay: -3.4s; }
        .wisl-bird { animation: wisl-circle 30s ease-in-out infinite; }
        .wisl-flap { transform-origin: 50% 100%; animation: wisl-flap 2.1s ease-in-out infinite; }
        @keyframes wisl-rise {
          0% { transform: translate(0, 0) scale(0.35); opacity: 0; }
          22% { opacity: 0.4; }
          100% { transform: translate(24px, -44px) scale(2.1); opacity: 0; }
        }
        @keyframes wisl-roll {
          0% { transform: translateX(-32px); opacity: 0; }
          30%, 70% { opacity: 0.55; }
          100% { transform: translateX(32px); opacity: 0; }
        }
        @keyframes wisl-wash {
          0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.24; }
          50% { transform: translateY(3px) scaleX(1.1); opacity: 0.58; }
        }
        @keyframes wisl-sway {
          0%, 100% { transform: rotate(-5deg) scaleX(1); }
          50% { transform: rotate(5deg) scaleX(0.92); }
        }
        @keyframes wisl-circle {
          0%, 100% { transform: translate(-110px, 0) scaleX(1); }
          25% { transform: translate(-40px, 16px) scaleX(0.45); }
          50% { transform: translate(50px, 2px) scaleX(1); }
          75% { transform: translate(-40px, -14px) scaleX(0.45); }
        }
        @keyframes wisl-flap {
          0%, 100% { transform: scaleY(0.6); }
          50% { transform: scaleY(1.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wisl-steam, .wisl-wave, .wisl-foam-a, .wisl-foam-b,
          .wisl-frond, .wisl-bird, .wisl-flap { animation: none; }
        }
      `}</style>
    </svg>
  );
}
