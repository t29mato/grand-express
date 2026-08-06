/**
 * 生きた火山のふもとの城下(熊本など)に重ねる動き。
 *
 * 火口から噴煙がゆっくり立ちのぼって右へ流れ、火口の縁が明滅する。
 * 山裾には陽炎がゆらぐ。
 * 背景(空・火山・野)は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function JapanVolcano() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 火口の照り返し */}
      <ellipse className="jvo-ember" cx="110" cy="33" rx="17" ry="5" fill="#e8663f" opacity="0.4" />

      {/* 噴煙 */}
      <g transform="translate(110,32)" fill="#c4b6a8">
        <ellipse className="jvo-puff jvo-p1" cx="0" cy="0" rx="12" ry="6" opacity="0.5" />
        <ellipse className="jvo-puff jvo-p2" cx="6" cy="-10" rx="15" ry="8" opacity="0.42" />
        <ellipse className="jvo-puff jvo-p3" cx="14" cy="-20" rx="18" ry="9" opacity="0.32" />
        <ellipse className="jvo-puff jvo-p4" cx="24" cy="-29" rx="21" ry="10" opacity="0.2" />
      </g>

      {/* 流れていく灰の帯 */}
      <g transform="translate(180,14)">
        <g className="jvo-ash" fill="#c4b6a8" opacity="0.22">
          <ellipse cx="0" cy="0" rx="30" ry="7" />
          <ellipse cx="26" cy="3" rx="20" ry="5" />
        </g>
      </g>

      {/* 山裾の陽炎(地平の際でゆらぐ) */}
      <g stroke="#ffe8c8" strokeWidth="5" strokeLinecap="round" fill="none">
        <path className="jvo-heat jvo-h1" d="M30,120 h84" opacity="0.16" />
        <path className="jvo-heat jvo-h2" d="M150,122 h96" opacity="0.13" />
        <path className="jvo-heat jvo-h3" d="M270,119 h88" opacity="0.15" />
      </g>

      <style>{`
        .jvo-puff {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: jvo-rise 11s ease-in infinite;
        }
        .jvo-p2 { animation-delay: -2.7s; animation-duration: 12s; }
        .jvo-p3 { animation-delay: -5.4s; animation-duration: 10s; }
        .jvo-p4 { animation-delay: -8.1s; animation-duration: 13s; }
        .jvo-ash { animation: jvo-drift 38s linear infinite; }
        .jvo-ember { animation: jvo-flicker 5.5s ease-in-out infinite; }
        .jvo-heat {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: jvo-shimmer 6s ease-in-out infinite;
        }
        .jvo-h2 { animation-duration: 7.4s; animation-delay: -2s; }
        .jvo-h3 { animation-duration: 8.2s; animation-delay: -4s; }
        @keyframes jvo-rise {
          0% { transform: translate(0, 12px) scale(0.45); opacity: 0; }
          25% { opacity: 0.5; }
          70% { opacity: 0.3; }
          100% { transform: translate(34px, -34px) scale(1.9); opacity: 0; }
        }
        @keyframes jvo-drift {
          0% { transform: translate(-230px, 6px); }
          100% { transform: translate(250px, -8px); }
        }
        @keyframes jvo-flicker {
          0%, 100% { opacity: 0.24; }
          50% { opacity: 0.62; }
        }
        @keyframes jvo-shimmer {
          0%, 100% { transform: translate(-5px, 1px) scaleX(0.92); opacity: 0.07; }
          50% { transform: translate(5px, -1px) scaleX(1.08); opacity: 0.24; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jvo-puff, .jvo-ash, .jvo-ember, .jvo-heat { animation: none; }
        }
      `}</style>
    </svg>
  );
}
