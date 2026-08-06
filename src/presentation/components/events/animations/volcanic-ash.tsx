/**
 * 桜島がまた噴煙を上げ、降り積もる灰のせいで洗車代を二度払う(鹿児島)。
 *
 *   - 右奥の火口から噴煙が上がり続ける
 *   - 画面いっぱいに灰が降る
 *   - 手前ではスポンジで洗っても、そばから車が灰をかぶる
 */
export function VolcanicAsh() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灰色の空・錦江湾・岸 */}
      <rect width="400" height="210" fill="#2b3440" />
      <rect y="116" width="400" height="26" fill="#25404f" />
      <rect y="140" width="400" height="70" fill="#3b4450" />

      {/* 噴煙 */}
      <g>
        <circle className="vash-puff vash-puff-c" cx="316" cy="18" r="16" fill="#5e5d5a" />
        <circle className="vash-puff vash-puff-b" cx="272" cy="22" r="14" fill="#84827c" />
        <circle className="vash-puff vash-puff-a" cx="294" cy="36" r="20" fill="#6f6e6a" />
      </g>

      {/* 桜島 */}
      <path d="M226,118 L294,42 L360,118z" fill="#2f2c28" />
      <path d="M278,60 L294,42 L310,60 L302,66 L286,66z" fill="#453729" />
      <path className="vash-glow" d="M286,60 L294,48 L302,60z" fill="#e8443f" />

      {/* 降灰 */}
      <g fill="#b9b5ac">
        <circle className="vash-ash" cx="34" cy="30" r="2.6" />
        <circle className="vash-ash" cx="76" cy="74" r="2" />
        <circle className="vash-ash" cx="112" cy="24" r="2.4" />
        <circle className="vash-ash" cx="150" cy="96" r="2" />
        <circle className="vash-ash" cx="186" cy="46" r="2.8" />
        <circle className="vash-ash" cx="214" cy="86" r="2" />
        <circle className="vash-ash" cx="244" cy="20" r="2.4" />
        <circle className="vash-ash" cx="274" cy="104" r="2.2" />
        <circle className="vash-ash" cx="330" cy="74" r="2.6" />
        <circle className="vash-ash" cx="364" cy="34" r="2" />
        <circle className="vash-ash" cx="388" cy="94" r="2.4" />
        <circle className="vash-ash" cx="58" cy="112" r="2.2" />
      </g>

      {/* 洗われる車 */}
      <g transform="translate(126,184)">
        <ellipse cx="0" cy="8" rx="54" ry="5" fill="#2f3742" />
        <g fill="#cfd3d9">
          <rect x="-48" y="-24" width="96" height="21" rx="7" />
          <path d="M-28,-24 L-17,-41 L19,-41 L31,-24z" />
        </g>
        <path d="M-21,-26 L-13,-38 L-2,-38 L-2,-26z" fill="#25404f" />
        <path d="M3,-26 L3,-38 L15,-38 L24,-26z" fill="#25404f" />
        {/* 積もる灰 */}
        <g className="vash-dust" fill="#9a958b">
          <rect x="-48" y="-24" width="96" height="7" rx="3.5" />
          <path d="M-17,-41 L19,-41 L23,-34 L-21,-34z" />
        </g>
        <circle cx="-28" cy="-2" r="9" fill="#20242b" />
        <circle cx="28" cy="-2" r="9" fill="#20242b" />
        <circle cx="-28" cy="-2" r="3.5" fill="#4a4f57" />
        <circle cx="28" cy="-2" r="3.5" fill="#4a4f57" />
        {/* スポンジ */}
        <g className="vash-sponge">
          <rect x="-11" y="-52" width="22" height="10" rx="3" fill="#f5b31c" />
          <rect x="-9" y="-55" width="18" height="4" rx="2" fill="#f6efe2" />
        </g>
      </g>

      {/* ホースで洗う人 */}
      <g transform="translate(48,196)">
        <ellipse cx="0" cy="4" rx="16" ry="4" fill="#2f3742" />
        <circle cx="0" cy="-44" r="10" fill="#f6efe2" />
        <path d="M-10,-46 a10,10 0 0 1 20,0z" fill="#3b3a42" />
        <rect x="-9" y="-35" width="18" height="26" rx="6" fill="#5b8fe8" />
        <rect x="-8" y="-10" width="7" height="14" rx="3" fill="#38414f" />
        <rect x="1" y="-10" width="7" height="14" rx="3" fill="#38414f" />
        <rect x="6" y="-34" width="20" height="6" rx="3" fill="#f6efe2" />
        <rect x="24" y="-37" width="13" height="9" rx="2" fill="#3b3a42" />
        <path
          d="M8,-27 C2,-8 -14,-2 -26,2"
          stroke="#2f8f5b"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* 水しぶき */}
        <g fill="#8fd0f0">
          <circle className="vash-drop" cx="42" cy="-31" r="3" />
          <circle className="vash-drop" cx="50" cy="-28" r="2.4" />
          <circle className="vash-drop" cx="58" cy="-24" r="2.8" />
          <circle className="vash-drop" cx="66" cy="-21" r="2.2" />
          <circle className="vash-drop" cx="74" cy="-17" r="2.6" />
        </g>
      </g>

      <style>{`
        .vash-puff { transform-box: fill-box; transform-origin: 50% 100%; }
        .vash-puff-a { animation: vash-rise 3.4s ease-out infinite; }
        .vash-puff-b { animation: vash-rise 3.4s ease-out infinite; animation-delay: -1.1s; }
        .vash-puff-c { animation: vash-rise 3.4s ease-out infinite; animation-delay: -2.3s; }
        .vash-glow { animation: vash-flicker 1.6s ease-in-out infinite; }
        .vash-ash { animation: vash-fall 3.6s linear infinite; }
        .vash-ash:nth-child(3n) { animation-duration: 4.8s; animation-delay: -1.7s; }
        .vash-ash:nth-child(3n+1) { animation-duration: 4.2s; animation-delay: -3.1s; }
        .vash-dust { opacity: 0.7; animation: vash-settle 3s ease-in-out infinite; }
        .vash-sponge { animation: vash-wipe 3s ease-in-out infinite; }
        .vash-drop { animation: vash-jet 0.9s linear infinite; }
        .vash-drop:nth-child(2n) { animation-delay: -0.45s; }
        .vash-drop:nth-child(3n) { animation-delay: -0.7s; }
        @keyframes vash-rise {
          0% { transform: translateY(24px) scale(0.35); opacity: 0.1; }
          35% { opacity: 0.95; }
          100% { transform: translateY(-30px) scale(1.6); opacity: 0; }
        }
        @keyframes vash-flicker {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.25; }
        }
        @keyframes vash-fall {
          0% { transform: translate(8px, -34px); opacity: 0; }
          15%, 85% { opacity: 0.9; }
          100% { transform: translate(-10px, 40px); opacity: 0; }
        }
        @keyframes vash-settle {
          0% { opacity: 0.12; }
          50% { opacity: 0.95; }
          78% { opacity: 0.18; }
          100% { opacity: 0.12; }
        }
        @keyframes vash-wipe {
          0%, 50% { transform: translateX(-32px); }
          78% { transform: translateX(28px); }
          100% { transform: translateX(-32px); }
        }
        @keyframes vash-jet {
          0% { transform: translate(-16px, -7px); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(18px, 12px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vash-puff-a, .vash-puff-b, .vash-puff-c, .vash-glow,
          .vash-ash, .vash-dust, .vash-sponge, .vash-drop { animation: none; }
        }
      `}</style>
    </svg>
  );
}
