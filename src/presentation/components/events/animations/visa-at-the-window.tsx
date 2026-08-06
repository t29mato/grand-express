/**
 * 到着した窓口で査証を買う。現金のみ、紙幣は綺麗なものに限る(減)。
 *
 *   - 係官が受け取った札を灯りに透かして、隅から隅まで検める
 *   - 判が下りるまで、後ろの列はそのまま待たされる
 *   - 通ったぶんだけ、硬貨は窓の奥へ消えていく
 */
export function VisaAtTheWindow() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 到着ホールの壁 */}
      <rect width="400" height="210" fill="#3f4657" />
      <rect y="150" width="400" height="60" fill="#33394a" />
      <rect y="146" width="400" height="6" fill="#4d5568" />

      {/* 窓口の枠 */}
      <rect x="126" y="14" width="180" height="132" fill="#5a6274" />
      <rect x="140" y="30" width="152" height="88" fill="#20283a" />
      <rect x="134" y="118" width="164" height="14" fill="#8f9aa8" />
      <g stroke="#8f9aa8" strokeWidth="5">
        <path d="M176,30 L176,118 M216,30 L216,118 M256,30 L256,118" />
      </g>

      {/* 窓口の灯り */}
      <circle cx="216" cy="46" r="13" fill="#f5e2a8" />
      <path d="M216,58 L182,110 L250,110z" fill="#f5e2a8" opacity="0.2" />

      {/* 透かして見られている札 */}
      <g className="vsw-note">
        <rect x="196" y="72" width="44" height="26" rx="3" fill="#8fc46a" />
        <rect x="196" y="72" width="44" height="7" rx="3" fill="#6faa4a" />
        <circle cx="218" cy="87" r="6" fill="#cfe8b8" />
      </g>
      <g className="vsw-hand" fill="#f6efe2">
        <rect x="182" y="76" width="16" height="20" rx="7" />
        <rect x="238" y="76" width="16" height="20" rx="7" />
      </g>

      {/* 判が下りる書類 */}
      <rect x="316" y="128" width="52" height="30" rx="3" fill="#e8dfc8" />
      <rect x="324" y="138" width="36" height="5" rx="2.5" fill="#b0a894" />
      {/* 下りてくる判(位置決めは外側、動きは内側) */}
      <g transform="translate(342,126)">
        <g className="vsw-stamp">
          <rect x="-18" y="-14" width="36" height="15" rx="3" fill="#c93a3a" />
          <rect x="-7" y="-38" width="14" height="24" rx="4" fill="#8a2f2f" />
          <rect x="-16" y="-48" width="32" height="11" rx="5" fill="#8a2f2f" />
        </g>
      </g>

      {/* 後ろに伸びる列 */}
      <g fill="#2a3040">
        <g className="vsw-queue">
          <circle cx="46" cy="150" r="12" />
          <path d="M30,196 L30,166 Q46,154 62,166 L62,196z" />
        </g>
        <g className="vsw-queue vsw-q2">
          <circle cx="82" cy="156" r="11" />
          <path d="M68,198 L68,172 Q82,161 96,172 L96,198z" />
        </g>
        <g className="vsw-queue vsw-q3">
          <circle cx="358" cy="154" r="11" />
          <path d="M344,198 L344,170 Q358,159 372,170 L372,198z" />
        </g>
      </g>

      {/* 窓の奥へ吸い込まれる硬貨 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="vsw-coin-a" cx="150" cy="176" r="8" />
        <circle className="vsw-coin-b" cx="150" cy="176" r="7" />
        <circle className="vsw-coin-c" cx="150" cy="176" r="6" />
      </g>

      <style>{`
        .pcl-none { display: none; }
        .vsw-note {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: vsw-inspect 4.6s ease-in-out infinite;
        }
        .vsw-hand {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: vsw-inspect 4.6s ease-in-out infinite;
        }
        .vsw-stamp {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: vsw-press 4.6s ease-in-out infinite;
        }
        .vsw-queue {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: vsw-wait 5.4s ease-in-out infinite;
        }
        .vsw-q2 { animation-delay: -1.8s; }
        .vsw-q3 { animation-delay: -3.6s; }
        .vsw-coin-a { animation: vsw-swallow 3.4s ease-in infinite; }
        .vsw-coin-b { animation: vsw-swallow 3.4s ease-in infinite; animation-delay: -1.1s; }
        .vsw-coin-c { animation: vsw-swallow 3.4s ease-in infinite; animation-delay: -2.3s; }
        @keyframes vsw-inspect {
          0%, 100% { transform: rotate(-4deg) translateY(0); }
          30% { transform: rotate(5deg) translateY(-5px); }
          62% { transform: rotate(-6deg) translateY(2px); }
        }
        @keyframes vsw-press {
          0%, 60% { transform: translateY(-18px); }
          70% { transform: translateY(0); }
          80%, 100% { transform: translateY(-18px); }
        }
        @keyframes vsw-wait {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        @keyframes vsw-swallow {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          16% { opacity: 1; }
          100% { transform: translate(64px, -54px) scale(0.45); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vsw-note, .vsw-hand, .vsw-stamp, .vsw-queue,
          .vsw-coin-a, .vsw-coin-b, .vsw-coin-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
