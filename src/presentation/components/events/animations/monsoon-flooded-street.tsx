/**
 * 一時間の雨で道路が川になり、オートリクシャーの運賃が三倍になる。
 *
 * 水没した通りを黄色いオートが波を立てて漕ぎ進む。客席の窓から硬貨が
 * こぼれ落ち、濁った水の底へ沈んでいく。
 */
export function MonsoonFloodedStreet() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨雲の下の街 */}
      <rect width="400" height="210" fill="#16283a" />
      <g fill="#1d3348">
        <rect width="400" height="42" />
        <ellipse cx="58" cy="44" rx="56" ry="20" />
        <ellipse cx="176" cy="40" rx="70" ry="22" />
        <ellipse cx="316" cy="46" rx="62" ry="20" />
      </g>
      <g fill="#22415c">
        <rect x="0" y="66" width="58" height="90" />
        <rect x="66" y="88" width="46" height="68" />
        <rect x="300" y="58" width="52" height="98" />
        <rect x="358" y="82" width="42" height="74" />
      </g>
      <g fill="#f5b31c">
        <rect x="12" y="80" width="9" height="11" opacity="0.85" />
        <rect className="mf-win-a" x="32" y="80" width="9" height="11" />
        <rect x="76" y="100" width="9" height="11" opacity="0.85" />
        <rect className="mf-win-b" x="312" y="72" width="9" height="11" />
        <rect x="332" y="72" width="9" height="11" opacity="0.85" />
        <rect x="370" y="96" width="9" height="11" opacity="0.85" />
      </g>

      {/* 水没した路面 */}
      <rect y="150" width="400" height="60" fill="#2f5f7a" />

      {/* オートリクシャー */}
      <g transform="translate(198,138)">
        <circle cx="-30" cy="14" r="13" fill="#20222a" />
        <circle cx="34" cy="14" r="12" fill="#20222a" />
        <rect x="-48" y="-38" width="96" height="32" rx="6" fill="#20222a" />
        <path d="M-48,-38 Q-44,-60 -14,-62 L12,-62 Q42,-58 48,-38z" fill="#f5b31c" />
        <rect x="-40" y="-54" width="30" height="24" rx="4" fill="#12202c" />
        <path d="M26,-56 L44,-40 L26,-40z" fill="#4d86a6" />
        <rect x="8" y="-42" width="20" height="14" rx="5" fill="#e8e2d2" />
        <circle cx="18" cy="-48" r="8" fill="#c08a5c" />
        <circle cx="48" cy="-24" r="5" fill="#f5e2a8" />
        <rect x="-48" y="-14" width="96" height="6" fill="#12161c" />
      </g>

      {/* 窓からこぼれて沈む運賃 */}
      <g transform="translate(150,102)" fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="mf-coin-a" r="8" />
        <circle className="mf-coin-b" r="7" />
        <circle className="mf-coin-c" r="6" />
      </g>

      {/* 水面 */}
      <rect y="150" width="400" height="60" fill="#2f5f7a" opacity="0.66" />
      <g fill="#4d86a6">
        <rect className="mf-ripple-a" x="20" y="162" width="90" height="4" rx="2" />
        <rect className="mf-ripple-b" x="150" y="178" width="120" height="4" rx="2" />
        <rect className="mf-ripple-c" x="284" y="194" width="100" height="4" rx="2" />
        <rect className="mf-ripple-d" x="96" y="200" width="70" height="4" rx="2" />
      </g>
      <g transform="translate(250,152)" fill="none" stroke="#a8cfe4" strokeWidth="2.5">
        <ellipse className="mf-ring-a" rx="18" ry="6" />
        <ellipse className="mf-ring-b" rx="18" ry="6" />
      </g>

      {/* 降り続く雨 */}
      <g stroke="#a8cfe4" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5">
        <path className="mf-rain-a" d="M28,14 l-5,22" />
        <path className="mf-rain-b" d="M76,58 l-5,22" />
        <path className="mf-rain-c" d="M122,10 l-5,22" />
        <path className="mf-rain-d" d="M168,74 l-5,22" />
        <path className="mf-rain-e" d="M212,30 l-5,22" />
        <path className="mf-rain-f" d="M258,110 l-5,22" />
        <path className="mf-rain-g" d="M296,52 l-5,22" />
        <path className="mf-rain-h" d="M338,18 l-5,22" />
        <path className="mf-rain-i" d="M372,96 l-5,22" />
        <path className="mf-rain-j" d="M52,124 l-5,22" />
        <path className="mf-rain-k" d="M186,134 l-5,22" />
      </g>

      <style>{`
        .mf-coin-a { transform: translate(-2px, 2px); animation: mf-sink 2.8s ease-in infinite; }
        .mf-coin-b {
          transform: translate(-20px, 32px);
          animation: mf-sink 2.8s ease-in infinite;
          animation-delay: -0.9s;
        }
        .mf-coin-c {
          transform: translate(-38px, 62px);
          animation: mf-sink 2.8s ease-in infinite;
          animation-delay: -1.8s;
        }
        .mf-ripple-a { animation: mf-drift 5s linear infinite; }
        .mf-ripple-b { animation: mf-drift 6.4s linear infinite; animation-delay: -2s; }
        .mf-ripple-c { animation: mf-drift 5.6s linear infinite; animation-delay: -3.4s; }
        .mf-ripple-d { animation: mf-drift 7s linear infinite; animation-delay: -1.2s; }
        .mf-ring-a {
          transform-box: fill-box;
          transform-origin: center;
          animation: mf-bow 1.6s ease-out infinite;
        }
        .mf-ring-b {
          transform-box: fill-box;
          transform-origin: center;
          animation: mf-bow 1.6s ease-out infinite;
          animation-delay: -0.8s;
        }
        .mf-win-a { animation: mf-flicker 2.3s steps(1, end) infinite; }
        .mf-win-b { animation: mf-flicker 3.1s steps(1, end) infinite; }
        .mf-rain-a { animation: mf-fall 0.72s linear infinite; }
        .mf-rain-b { animation: mf-fall 0.86s linear infinite; animation-delay: -0.3s; }
        .mf-rain-c { animation: mf-fall 0.64s linear infinite; animation-delay: -0.5s; }
        .mf-rain-d { animation: mf-fall 0.92s linear infinite; animation-delay: -0.1s; }
        .mf-rain-e { animation: mf-fall 0.76s linear infinite; animation-delay: -0.6s; }
        .mf-rain-f { animation: mf-fall 0.68s linear infinite; animation-delay: -0.25s; }
        .mf-rain-g { animation: mf-fall 0.88s linear infinite; animation-delay: -0.45s; }
        .mf-rain-h { animation: mf-fall 0.6s linear infinite; animation-delay: -0.15s; }
        .mf-rain-i { animation: mf-fall 0.8s linear infinite; animation-delay: -0.55s; }
        .mf-rain-j { animation: mf-fall 0.7s linear infinite; animation-delay: -0.35s; }
        .mf-rain-k { animation: mf-fall 0.84s linear infinite; animation-delay: -0.65s; }
        @keyframes mf-sink {
          0% { transform: translate(6px, -14px); opacity: 0; }
          14% { transform: translate(-2px, 0); opacity: 1; }
          58% { transform: translate(-30px, 44px); opacity: 1; }
          100% { transform: translate(-46px, 82px); opacity: 0; }
        }
        @keyframes mf-drift {
          0% { transform: translate(60px, 0); opacity: 0; }
          20%, 70% { opacity: 0.9; }
          100% { transform: translate(-90px, 0); opacity: 0; }
        }
        @keyframes mf-bow {
          0% { transform: scale(0.35); opacity: 0.9; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes mf-flicker {
          0%, 78% { opacity: 0.85; }
          79%, 100% { opacity: 0.2; }
        }
        @keyframes mf-fall {
          0% { transform: translate(18px, -74px); opacity: 0; }
          16% { opacity: 0.55; }
          84% { opacity: 0.55; }
          100% { transform: translate(-16px, 82px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mf-coin-a, .mf-coin-b, .mf-coin-c,
          .mf-ripple-a, .mf-ripple-b, .mf-ripple-c, .mf-ripple-d,
          .mf-ring-a, .mf-ring-b, .mf-win-a, .mf-win-b,
          .mf-rain-a, .mf-rain-b, .mf-rain-c, .mf-rain-d, .mf-rain-e, .mf-rain-f,
          .mf-rain-g, .mf-rain-h, .mf-rain-i, .mf-rain-j, .mf-rain-k { animation: none; }
        }
      `}</style>
    </svg>
  );
}
