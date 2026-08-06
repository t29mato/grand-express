/**
 * 港(ロッテルダム、上海、シンガポールなど)に重ねる動き。
 *
 * 貨物船の煙突から煙が上がり、ガントリークレーンがコンテナを吊り下ろし、
 * 岸壁に波が当たってカモメが舞う。
 * 船・クレーン・コンテナは静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldHarbour() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 煙突(136,104)から立ちのぼる煙 */}
      <g fill="#d8dee2">
        <circle className="whar-smoke whar-s1" cx="142" cy="100" r="4" opacity="0.42" />
        <circle className="whar-smoke whar-s2" cx="142" cy="100" r="5.2" opacity="0.32" />
        <circle className="whar-smoke whar-s3" cx="142" cy="100" r="3.2" opacity="0.46" />
      </g>

      {/* 右のクレーンが吊り下ろすコンテナ(桁は y=74〜82) */}
      <g className="whar-hoist">
        <path d="M340,82v0" stroke="#4a4438" strokeWidth="1.4" fill="none" />
        <g className="whar-drop">
          <path className="whar-line" d="M340,82v34" stroke="#4a4438" strokeWidth="1.4" fill="none" />
          <rect x="330" y="116" width="20" height="9" fill="#3f8f7a" stroke="#3a3428" strokeWidth="1" />
        </g>
      </g>

      {/* 岸壁に当たる波(海は y=108〜156) */}
      <g stroke="#bfe0f0" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="whar-wave whar-v1" d="M24,118h58" opacity="0.5" />
        <path className="whar-wave whar-v2" d="M188,130h72" opacity="0.45" />
        <path className="whar-wave whar-v3" d="M300,124h72" opacity="0.5" />
        <path className="whar-wave whar-v4" d="M96,146h68" opacity="0.45" />
      </g>

      {/* 岸壁の波しぶき(水と岸壁の境 y=156) */}
      <g fill="#e8f4fa">
        <ellipse className="whar-splash-a" cx="70" cy="155" rx="30" ry="2.6" opacity="0.45" />
        <ellipse className="whar-splash-b" cx="250" cy="155" rx="38" ry="2.4" opacity="0.4" />
      </g>

      {/* 舞うカモメ */}
      <g transform="translate(70,56)">
        <g className="whar-gull-a">
          <path className="whar-flap-a" d="M-8,0 Q-4,-5.4 0,-0.8 Q4,-5.4 8,0" fill="none" stroke="#f6efe2" strokeWidth="1.9" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(200,40)">
        <g className="whar-gull-b">
          <path className="whar-flap-b" d="M-6,0 Q-3,-4.2 0,-0.6 Q3,-4.2 6,0" fill="none" stroke="#f6efe2" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </g>

      <style>{`
        .whar-smoke, .whar-drop, .whar-wave,
        .whar-splash-a, .whar-splash-b, .whar-flap-a, .whar-flap-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .whar-smoke { animation: whar-rise 9s linear infinite; }
        .whar-s2 { animation-duration: 12s; animation-delay: -5s; }
        .whar-s3 { animation-duration: 7s; animation-delay: -3s; }
        .whar-hoist { transform-box: fill-box; transform-origin: 50% 0%; animation: whar-travel 24s ease-in-out infinite; }
        .whar-drop { transform-origin: 50% 0%; animation: whar-lower 12s ease-in-out infinite; }
        .whar-line { transform-box: fill-box; transform-origin: 50% 0%; }
        .whar-wave { animation: whar-roll 14s linear infinite; }
        .whar-v2 { animation-duration: 18s; animation-delay: -6s; }
        .whar-v3 { animation-duration: 12s; animation-delay: -9s; }
        .whar-v4 { animation-duration: 16s; animation-delay: -3s; }
        .whar-splash-a { animation: whar-splash 6s ease-in-out infinite; }
        .whar-splash-b { animation: whar-splash 7.6s ease-in-out infinite; animation-delay: -3s; }
        .whar-gull-a { animation: whar-cross-a 26s linear infinite; animation-delay: -9s; }
        .whar-gull-b { animation: whar-cross-b 32s linear infinite; animation-delay: -16s; }
        .whar-flap-a { transform-origin: 50% 100%; animation: whar-flap 1.9s ease-in-out infinite; }
        .whar-flap-b { transform-origin: 50% 100%; animation: whar-flap 2.3s ease-in-out infinite; }
        @keyframes whar-rise {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          22% { opacity: 0.42; }
          100% { transform: translate(26px, -52px) scale(2); opacity: 0; }
        }
        @keyframes whar-travel {
          0%, 100% { transform: translateX(-28px); }
          50% { transform: translateX(28px); }
        }
        @keyframes whar-lower {
          0%, 100% { transform: translateY(0) scaleY(1); }
          45%, 55% { transform: translateY(52px) scaleY(2.5); }
        }
        @keyframes whar-roll {
          0% { transform: translateX(-28px); opacity: 0; }
          30%, 70% { opacity: 0.5; }
          100% { transform: translateX(28px); opacity: 0; }
        }
        @keyframes whar-splash {
          0%, 100% { transform: scaleY(0.7) translateY(0); opacity: 0.2; }
          50% { transform: scaleY(1.6) translateY(-2px); opacity: 0.5; }
        }
        @keyframes whar-cross-a {
          0% { transform: translate(-120px, 12px); }
          100% { transform: translate(360px, -14px); }
        }
        @keyframes whar-cross-b {
          0% { transform: translate(220px, -10px); }
          100% { transform: translate(-250px, 14px); }
        }
        @keyframes whar-flap {
          0%, 100% { transform: scaleY(0.55); }
          50% { transform: scaleY(1.35); }
        }
        @media (prefers-reduced-motion: reduce) {
          .whar-smoke, .whar-hoist, .whar-drop, .whar-wave,
          .whar-splash-a, .whar-splash-b, .whar-gull-a, .whar-gull-b,
          .whar-flap-a, .whar-flap-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
