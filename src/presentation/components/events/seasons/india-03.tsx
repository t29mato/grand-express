/**
 * 7月。平原一面の雨。
 *
 * 灰青の空から雨が降りやまず、田は一夜で青くなり、濁った川が土手ぎりぎりまで
 * 水位を上げる。その上をおくれた列車がのろのろと渡っていく。
 */
export function India03() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨雲の空 */}
      <rect width="400" height="210" fill="#4a5f72" />
      <g className="i03-clouds" fill="#37495a">
        <rect x="-40" width="480" height="20" />
        <ellipse cx="-10" cy="24" rx="66" ry="22" />
        <ellipse cx="96" cy="30" rx="76" ry="24" />
        <ellipse cx="212" cy="22" rx="70" ry="22" />
        <ellipse cx="320" cy="30" rx="74" ry="24" />
        <ellipse cx="416" cy="24" rx="66" ry="22" />
      </g>

      {/* 遠くの村と並木 */}
      <g fill="#2b4a44">
        <rect y="96" width="400" height="12" />
        <circle cx="26" cy="94" r="12" />
        <circle cx="52" cy="90" r="10" />
        <circle cx="132" cy="92" r="11" />
        <circle cx="286" cy="90" r="12" />
        <circle cx="352" cy="94" r="10" />
        <rect x="180" y="80" width="30" height="18" />
        <rect x="214" y="86" width="22" height="12" />
      </g>

      {/* 土手と線路 */}
      <rect y="106" width="400" height="16" fill="#6b5a42" />
      <rect y="104" width="400" height="3" fill="#3d3427" />

      {/* おくれて走る列車 */}
      <g className="i03-train">
        <rect x="0" y="-24" width="60" height="20" rx="3" fill="#26333f" />
        <rect x="64" y="-24" width="60" height="20" rx="3" fill="#26333f" />
        <rect x="128" y="-30" width="48" height="26" rx="4" fill="#8f3a34" />
        <g fill="#f5b31c">
          <rect x="8" y="-19" width="10" height="8" />
          <rect x="26" y="-19" width="10" height="8" />
          <rect x="44" y="-19" width="10" height="8" />
          <rect x="72" y="-19" width="10" height="8" />
          <rect x="90" y="-19" width="10" height="8" />
          <rect x="108" y="-19" width="10" height="8" />
          <rect x="136" y="-24" width="14" height="9" />
          <circle cx="171" cy="-11" r="4" />
        </g>
        <rect x="0" y="-5" width="176" height="4" fill="#1a222b" />
        <g fill="#1a222b">
          <circle cx="12" cy="0" r="4" />
          <circle cx="48" cy="0" r="4" />
          <circle cx="76" cy="0" r="4" />
          <circle cx="112" cy="0" r="4" />
          <circle cx="140" cy="0" r="4" />
          <circle cx="166" cy="0" r="4" />
        </g>
      </g>

      {/* 一気に青くなった田 */}
      <rect y="122" width="400" height="46" fill="#4e8f4b" />
      <g fill="#3f7a41">
        <rect y="130" width="400" height="4" />
        <rect y="144" width="400" height="5" />
        <rect y="160" width="400" height="6" />
      </g>
      <g stroke="#2f6234" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <g className="i03-shoot-a">
          <path d="M40,166 l-5,-16" />
          <path d="M50,166 l0,-19" />
          <path d="M60,166 l6,-15" />
        </g>
        <g className="i03-shoot-b">
          <path d="M156,166 l-6,-15" />
          <path d="M166,166 l0,-18" />
          <path d="M176,166 l5,-16" />
        </g>
        <g className="i03-shoot-c">
          <path d="M290,166 l-5,-17" />
          <path d="M300,166 l1,-19" />
          <path d="M310,166 l6,-14" />
        </g>
      </g>

      {/* 水位を上げた濁流 */}
      <rect y="168" width="400" height="42" fill="#7d6b46" />
      <rect y="168" width="400" height="4" fill="#5c4e32" />
      <g fill="#9a8659">
        <rect className="i03-wave-a" x="10" y="180" width="96" height="5" rx="2.5" />
        <rect className="i03-wave-b" x="140" y="192" width="120" height="5" rx="2.5" />
        <rect className="i03-wave-c" x="270" y="174" width="90" height="4" rx="2" />
        <rect className="i03-wave-d" x="60" y="202" width="110" height="5" rx="2.5" />
      </g>
      <g fill="none" stroke="#c2b189" strokeWidth="2.5">
        <ellipse className="i03-ring-a" cx="112" cy="188" rx="14" ry="5" />
        <ellipse className="i03-ring-b" cx="248" cy="200" rx="14" ry="5" />
        <ellipse className="i03-ring-c" cx="330" cy="184" rx="14" ry="5" />
      </g>

      {/* 降りやまない雨 */}
      <g stroke="#bcd9ea" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55">
        <path className="i03-rain-a" d="M22,16 l-6,26" />
        <path className="i03-rain-b" d="M58,64 l-6,26" />
        <path className="i03-rain-c" d="M96,20 l-6,26" />
        <path className="i03-rain-d" d="M134,110 l-6,26" />
        <path className="i03-rain-e" d="M170,42 l-6,26" />
        <path className="i03-rain-f" d="M206,142 l-6,26" />
        <path className="i03-rain-g" d="M242,26 l-6,26" />
        <path className="i03-rain-h" d="M278,84 l-6,26" />
        <path className="i03-rain-i" d="M314,14 l-6,26" />
        <path className="i03-rain-j" d="M350,124 l-6,26" />
        <path className="i03-rain-k" d="M382,54 l-6,26" />
        <path className="i03-rain-l" d="M12,166 l-6,26" />
        <path className="i03-rain-m" d="M186,182 l-6,26" />
        <path className="i03-rain-n" d="M300,158 l-6,26" />
      </g>

      <style>{`
        .i03-clouds { animation: i03-drift 22s ease-in-out infinite; }
        .i03-train {
          transform: translate(96px, 106px);
          animation: i03-crawl 17s linear infinite;
          animation-delay: -6s;
        }
        .i03-shoot-a, .i03-shoot-b, .i03-shoot-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: i03-sway 3.2s ease-in-out infinite;
        }
        .i03-shoot-b { animation-duration: 3.8s; animation-delay: -1.1s; }
        .i03-shoot-c { animation-duration: 2.8s; animation-delay: -2s; }
        .i03-wave-a { animation: i03-flow 6s linear infinite; }
        .i03-wave-b { animation: i03-flow 7.4s linear infinite; animation-delay: -2.4s; }
        .i03-wave-c { animation: i03-flow 5.4s linear infinite; animation-delay: -3.8s; }
        .i03-wave-d { animation: i03-flow 8s linear infinite; animation-delay: -1.4s; }
        .i03-ring-a, .i03-ring-b, .i03-ring-c {
          transform-box: fill-box;
          transform-origin: center;
          animation: i03-splash 1.7s ease-out infinite;
        }
        .i03-ring-b { animation-delay: -0.6s; }
        .i03-ring-c { animation-delay: -1.2s; }
        .i03-rain-a { animation: i03-fall 0.7s linear infinite; }
        .i03-rain-b { animation: i03-fall 0.84s linear infinite; animation-delay: -0.3s; }
        .i03-rain-c { animation: i03-fall 0.62s linear infinite; animation-delay: -0.5s; }
        .i03-rain-d { animation: i03-fall 0.9s linear infinite; animation-delay: -0.1s; }
        .i03-rain-e { animation: i03-fall 0.74s linear infinite; animation-delay: -0.6s; }
        .i03-rain-f { animation: i03-fall 0.66s linear infinite; animation-delay: -0.25s; }
        .i03-rain-g { animation: i03-fall 0.86s linear infinite; animation-delay: -0.45s; }
        .i03-rain-h { animation: i03-fall 0.58s linear infinite; animation-delay: -0.15s; }
        .i03-rain-i { animation: i03-fall 0.78s linear infinite; animation-delay: -0.55s; }
        .i03-rain-j { animation: i03-fall 0.68s linear infinite; animation-delay: -0.35s; }
        .i03-rain-k { animation: i03-fall 0.82s linear infinite; animation-delay: -0.65s; }
        .i03-rain-l { animation: i03-fall 0.72s linear infinite; animation-delay: -0.2s; }
        .i03-rain-m { animation: i03-fall 0.64s linear infinite; animation-delay: -0.4s; }
        .i03-rain-n { animation: i03-fall 0.88s linear infinite; animation-delay: -0.7s; }
        @keyframes i03-drift {
          0%, 100% { transform: translate(-12px, 0); }
          50% { transform: translate(12px, 0); }
        }
        @keyframes i03-crawl {
          0% { transform: translate(-190px, 106px); }
          100% { transform: translate(400px, 106px); }
        }
        @keyframes i03-sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes i03-flow {
          0% { transform: translate(70px, 0); opacity: 0; }
          22%, 74% { opacity: 0.9; }
          100% { transform: translate(-100px, 0); opacity: 0; }
        }
        @keyframes i03-splash {
          0% { transform: scale(0.25); opacity: 0.9; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes i03-fall {
          0% { transform: translate(16px, -70px); opacity: 0; }
          16%, 84% { opacity: 0.6; }
          100% { transform: translate(-14px, 78px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .i03-clouds, .i03-train,
          .i03-shoot-a, .i03-shoot-b, .i03-shoot-c,
          .i03-wave-a, .i03-wave-b, .i03-wave-c, .i03-wave-d,
          .i03-ring-a, .i03-ring-b, .i03-ring-c,
          .i03-rain-a, .i03-rain-b, .i03-rain-c, .i03-rain-d, .i03-rain-e,
          .i03-rain-f, .i03-rain-g, .i03-rain-h, .i03-rain-i, .i03-rain-j,
          .i03-rain-k, .i03-rain-l, .i03-rain-m, .i03-rain-n { animation: none; }
        }
      `}</style>
    </svg>
  );
}
