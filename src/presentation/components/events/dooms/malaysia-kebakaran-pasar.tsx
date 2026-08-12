/**
 * 生鮮市場の屋台が火事になる。トタン屋根の下から炎が上がり、
 * 煙が立ちのぼる。焼け落ちる瞬間や被害の詳細は描かず、
 * 揺れる炎と煙だけで表す。
 *
 * 動くのは揺らめく炎と立ちのぼる煙だけ。
 */
export function MalaysiaKebakaranPasar() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の市場。 */}
      <rect width="400" height="210" fill="#5a6270" />
      <rect y="0" width="400" height="90" fill="#7f8898" />

      {/* 隣接する無事な屋台(遠景)。 */}
      <g fill="#c9a877" opacity="0.9">
        <rect x="10" y="120" width="60" height="60" />
        <rect x="330" y="120" width="60" height="60" />
      </g>
      <g fill="#9a7b4a">
        <path d="M4,120h72l-8,-14H12z" />
        <path d="M324,120h72l-8,-14H332z" />
      </g>

      {/* 燃える屋台本体。 */}
      <g>
        <rect x="140" y="130" width="120" height="50" fill="#8a7050" />
        <rect x="150" y="140" width="20" height="40" fill="#4a3a28" />
        <rect x="230" y="140" width="20" height="40" fill="#4a3a28" />
      </g>
      {/* 焦げたトタン屋根。 */}
      <path d="M132,130h136l-14,-18H146z" fill="#5a5a5a" />

      {/* 地面。 */}
      <rect y="180" width="400" height="30" fill="#9a9484" />

      {/* 立ちのぼる煙。 */}
      <g className="my-kp-smoke-a" fill="#4a4f5a" opacity="0.75">
        <circle cx="0" cy="0" r="14" />
        <circle cx="10" cy="-16" r="11" />
        <circle cx="-8" cy="-24" r="9" />
      </g>
      <g className="my-kp-smoke-b" fill="#5a5f6a" opacity="0.6">
        <circle cx="0" cy="0" r="10" />
        <circle cx="-8" cy="-14" r="8" />
      </g>

      {/* 揺らめく炎(2列)。 */}
      <g className="my-kp-flame-a" fill="#e8443f">
        <path d="M0,0c-8,-10 -6,-20 0,-28c6,8 8,18 0,28z" />
      </g>
      <g className="my-kp-flame-b" fill="#f4c430">
        <path d="M0,0c-6,-8 -4,-16 0,-22c4,6 6,14 0,22z" />
      </g>
      <g className="my-kp-flame-c" fill="#e8443f">
        <path d="M0,0c-7,-9 -5,-18 0,-25c5,7 7,16 0,25z" />
      </g>

      <style>{`
        .my-kp-flame-a {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: translate(170px, 130px);
          animation: my-kp-flicker-a 0.5s ease-in-out infinite;
        }
        .my-kp-flame-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: translate(200px, 130px);
          animation: my-kp-flicker-b 0.4s ease-in-out infinite;
        }
        .my-kp-flame-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: translate(230px, 130px);
          animation: my-kp-flicker-a 0.6s ease-in-out infinite reverse;
        }
        @keyframes my-kp-flicker-a {
          0%, 100% { transform: translate(170px, 130px) scaleY(1) rotate(-2deg); }
          50% { transform: translate(170px, 130px) scaleY(1.15) rotate(3deg); }
        }
        @keyframes my-kp-flicker-b {
          0%, 100% { transform: translate(200px, 130px) scaleY(1) rotate(2deg); }
          50% { transform: translate(200px, 130px) scaleY(1.2) rotate(-3deg); }
        }
        .my-kp-smoke-a {
          transform-box: fill-box;
          animation: my-kp-rise-a 3s ease-out infinite;
        }
        @keyframes my-kp-rise-a {
          0% { transform: translate(170px, 112px) scale(0.7); opacity: 0; }
          20% { opacity: 0.75; }
          100% { transform: translate(190px, 30px) scale(1.4); opacity: 0; }
        }
        .my-kp-smoke-b {
          transform-box: fill-box;
          animation: my-kp-rise-b 2.4s ease-out infinite;
        }
        @keyframes my-kp-rise-b {
          0% { transform: translate(220px, 116px) scale(0.6); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translate(200px, 40px) scale(1.3); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .my-kp-flame-a, .my-kp-flame-b, .my-kp-flame-c { animation: none; }
          .my-kp-smoke-a, .my-kp-smoke-b { animation: none; opacity: 0.4; transform: translate(190px, 70px); }
        }
      `}</style>
    </svg>
  );
}
