/**
 * 表彰のときに出るトロフィーの絵。
 *
 * 賞をめくるたびに最初から再生される(呼び出し側で key を変えている)。
 * 台から立ち上がって光り、紙吹雪が舞う。
 */
export function AwardTrophy() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      <rect width="400" height="210" fill="#2a1f3d" />
      <rect y="150" width="400" height="60" fill="#1d1630" />

      {/* 後光 */}
      <g className="at-rays">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <path
            key={deg}
            d="M200,105L188,-40h24z"
            fill="#f5b31c"
            opacity="0.06"
            transform={`rotate(${deg} 200 105)`}
          />
        ))}
      </g>

      {/* トロフィー */}
      <g className="at-cup">
        <ellipse cx="200" cy="176" rx="44" ry="8" fill="#000" opacity="0.3" />
        <rect x="180" y="158" width="40" height="12" rx="3" fill="#8a6a2c" />
        <rect x="188" y="140" width="24" height="20" rx="3" fill="#a8813c" />
        <path d="M164,72h72v24a36,36 0 0 1 -72,0z" fill="#f5b31c" stroke="#a8760a" strokeWidth="3" />
        <path d="M164,80c-16,0 -22,10 -18,20c4,10 12,12 18,10z" fill="none" stroke="#f5b31c" strokeWidth="7" />
        <path d="M236,80c16,0 22,10 18,20c-4,10 -12,12 -18,10z" fill="none" stroke="#f5b31c" strokeWidth="7" />
        <rect x="162" y="66" width="76" height="9" rx="3" fill="#f5d06a" />
        <circle cx="200" cy="98" r="12" fill="#f8e6a8" opacity="0.55" />
      </g>

      {/* きらめき */}
      <g className="at-sparks" fill="#f8f0d0">
        <path className="at-s1" d="M120,60l4,10l10,4l-10,4l-4,10l-4,-10l-10,-4l10,-4z" />
        <path className="at-s2" d="M284,54l3,8l8,3l-8,3l-3,8l-3,-8l-8,-3l8,-3z" />
        <path className="at-s3" d="M150,120l3,7l7,3l-7,3l-3,7l-3,-7l-7,-3l7,-3z" />
      </g>

      {/* 紙吹雪 */}
      <g className="at-confetti">
        {[40, 90, 140, 190, 240, 290, 340].map((x, i) => (
          <rect key={x} className={`at-flake at-f${i % 4}`} x={x} y="-12" width="7" height="11" rx="1.5"
            fill={["#e8447a", "#37b3a4", "#5b8fe8", "#f6efe2"][i % 4]} />
        ))}
      </g>

      <style>{`
        .at-cup { transform-box: fill-box; transform-origin: 50% 100%; animation: at-rise 1.4s cubic-bezier(.2,.9,.3,1.1) both; }
        .at-rays { transform-origin: 200px 105px; animation: at-spin 14s linear infinite; }
        .at-sparks path { transform-box: fill-box; transform-origin: center; }
        .at-s1 { animation: at-twinkle 1.5s ease-in-out infinite; }
        .at-s2 { animation: at-twinkle 1.9s ease-in-out infinite; animation-delay: -0.6s; }
        .at-s3 { animation: at-twinkle 1.7s ease-in-out infinite; animation-delay: -1.1s; }
        .at-flake { transform-box: fill-box; transform-origin: center; animation: at-fall 3.2s linear infinite; }
        .at-f1 { animation-delay: -0.8s; }
        .at-f2 { animation-delay: -1.6s; }
        .at-f3 { animation-delay: -2.4s; }

        @keyframes at-rise {
          0% { transform: translateY(40px) scale(0.7); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes at-spin { to { transform: rotate(360deg); } }
        @keyframes at-twinkle {
          0%, 100% { transform: scale(0.5); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes at-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(230px) rotate(400deg); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .at-cup, .at-rays, .at-sparks path, .at-flake { animation: none; }
          .at-cup { opacity: 1; }
          .at-flake { transform: translateY(100px) rotate(24deg); }
        }
      `}</style>
    </svg>
  );
}
