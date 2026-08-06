/**
 * 湯に浸かったら気が変わり、旅館にもう一泊してしまう。
 *
 * 露天風呂で湯気が立ちのぼり、月が空を渡って夜が更け、宿代のコインが湯に沈む。
 */
export function OnsenRyokan() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の山あい */}
      <rect width="400" height="210" fill="#16273a" />
      <path d="M0,104 L58,44 L116,104z" fill="#1d3247" />
      <path d="M96,104 L168,36 L240,104z" fill="#22394f" />
      <path d="M250,104 L316,52 L382,104z" fill="#1d3247" />
      <circle className="onr-moon" cx="308" cy="42" r="15" fill="#f5e9c0" />

      {/* 旅館(灯りがともる) */}
      <rect x="24" y="80" width="118" height="40" fill="#2a2438" />
      <path d="M14,82 L83,50 L152,82z" fill="#3b3550" />
      <rect x="14" y="78" width="138" height="7" fill="#4a4360" />
      <rect x="36" y="92" width="24" height="20" fill="#f5b31c" />
      <rect x="72" y="92" width="24" height="20" fill="#f5b31c" />
      <rect className="onr-window" x="108" y="92" width="24" height="20" fill="#f5b31c" />

      {/* 岩風呂 */}
      <ellipse cx="200" cy="176" rx="196" ry="54" fill="#5b6672" />
      <g fill="#6f7a86">
        <circle cx="46" cy="150" r="20" />
        <circle cx="94" cy="136" r="17" />
        <circle cx="148" cy="128" r="15" />
        <circle cx="252" cy="128" r="16" />
        <circle cx="308" cy="136" r="18" />
        <circle cx="358" cy="150" r="21" />
      </g>
      <ellipse cx="200" cy="180" rx="172" ry="46" fill="#39788c" />
      <ellipse cx="200" cy="178" rx="172" ry="42" fill="#4d8fa0" />

      {/* 湯船に浮かぶ桶 */}
      <ellipse cx="298" cy="162" rx="22" ry="9" fill="#b58a4e" />
      <ellipse cx="298" cy="159" rx="22" ry="9" fill="#d0a568" />
      <ellipse cx="298" cy="159" rx="14" ry="5" fill="#8a6535" />

      {/* 波紋 */}
      <ellipse className="onr-ripple" cx="172" cy="164" rx="34" ry="10" fill="none" stroke="#8fd0dd" strokeWidth="2" />
      <ellipse className="onr-ripple onr-r2" cx="172" cy="164" rx="34" ry="10" fill="none" stroke="#8fd0dd" strokeWidth="2" />

      {/* 湯に浸かる旅人 */}
      <g className="onr-bather">
        <ellipse cx="172" cy="150" rx="30" ry="14" fill="#e8cfae" />
        <circle cx="172" cy="122" r="19" fill="#f6efe2" />
        <circle cx="165" cy="120" r="2.4" fill="#2a2233" />
        <circle cx="179" cy="120" r="2.4" fill="#2a2233" />
        <path d="M166,130 Q172,135 178,130" stroke="#2a2233" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M153,110 L191,110 L188,101 L156,101z" fill="#f7f7f2" />
        <circle cx="132" cy="146" r="10" fill="#f6efe2" />
        <circle cx="212" cy="146" r="10" fill="#f6efe2" />
      </g>

      {/* 湯気 */}
      <g fill="none" stroke="#dff0f4" strokeWidth="5" strokeLinecap="round">
        <path className="onr-s1" d="M118,140 q10,-16 0,-30 q-10,-14 0,-28" />
        <path className="onr-s2" d="M228,130 q10,-15 0,-28 q-10,-13 0,-26" />
        <path className="onr-s3" d="M300,138 q10,-16 0,-29 q-10,-13 0,-25" />
      </g>

      {/* 湯に沈む宿代 */}
      <g className="onr-coin">
        <circle cx="238" cy="108" r="10" fill="#f5b31c" />
        <circle cx="238" cy="108" r="5" fill="#d8930d" />
      </g>
      <g className="onr-coin onr-c2">
        <circle cx="264" cy="92" r="8" fill="#f5b31c" />
        <circle cx="264" cy="92" r="4" fill="#d8930d" />
      </g>

      <style>{`
        .onr-moon { animation: onr-night 6s ease-in-out infinite; }
        .onr-window { animation: onr-lamp 6s steps(1, end) infinite; }
        .onr-bather { transform-origin: 172px 164px; animation: onr-soak 3.6s ease-in-out infinite; }
        .onr-ripple { transform-origin: 172px 164px; animation: onr-spread 3.6s ease-out infinite; }
        .onr-r2 { animation-delay: 1.8s; }
        .onr-s1 { animation: onr-rise 4s ease-in infinite; }
        .onr-s2 { animation: onr-rise 4s ease-in infinite 1.3s; }
        .onr-s3 { animation: onr-rise 4s ease-in infinite 2.6s; }
        .onr-coin { animation: onr-sink 3s ease-in infinite; }
        .onr-c2 { animation-delay: 1.5s; }
        @keyframes onr-night {
          0% { transform: translate(-60px, 34px); opacity: 0.4; }
          20%, 80% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(56px, 30px); opacity: 0.4; }
        }
        @keyframes onr-lamp {
          0%, 45% { opacity: 0.25; }
          50%, 100% { opacity: 1; }
        }
        @keyframes onr-soak {
          0%, 100% { transform: translate(0, 0) rotate(-2deg); }
          50% { transform: translate(0, 4px) rotate(2deg); }
        }
        @keyframes onr-spread {
          0% { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes onr-rise {
          0% { transform: translate(0, 18px) scale(0.7); opacity: 0; }
          25% { opacity: 0.85; }
          100% { transform: translate(-10px, -60px) scale(1.15); opacity: 0; }
        }
        @keyframes onr-sink {
          0% { transform: translate(0, -30px); opacity: 0; }
          20% { transform: translate(0, -14px); opacity: 1; }
          62% { transform: translate(-6px, 56px); opacity: 1; }
          100% { transform: translate(-10px, 84px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .onr-moon, .onr-window, .onr-bather, .onr-ripple, .onr-s1, .onr-s2, .onr-s3, .onr-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
