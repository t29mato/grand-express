/**
 * ダージリン(teagarden)に重ねる動き。
 *
 * 谷から霧が湧いて尾根をゆっくり渡り、茶樹の新芽が風にゆれ、
 * 二羽の鳥が畝の上をかすめていく。
 * 背景(空・丘・茶畑)は下の静止画が描いているので、ここでは動くものだけ。
 */
export function IndiaTeagarden() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 尾根を渡る霧 */}
      <g fill="#f4f9fb">
        <g className="tea-mist tea-mist-1">
          <ellipse cx="60" cy="112" rx="70" ry="9" />
          <ellipse cx="120" cy="108" rx="44" ry="7" />
        </g>
        <g className="tea-mist tea-mist-2">
          <ellipse cx="300" cy="122" rx="86" ry="8" />
          <ellipse cx="240" cy="118" rx="46" ry="6" />
        </g>
        <g className="tea-mist tea-mist-3">
          <ellipse cx="180" cy="132" rx="100" ry="7" />
        </g>
      </g>

      {/* 風にゆれる茶樹の新芽 */}
      <g fill="#8fc46a">
        <g className="tea-sprig tea-sprig-1">
          <path d="M34,150c-7,-3 -10,-9 -8,-13c5,-1 10,3 11,9z" />
          <path d="M40,150c6,-4 8,-10 6,-13c-5,-1 -9,4 -9,10z" />
        </g>
        <g className="tea-sprig tea-sprig-2">
          <path d="M92,170c-8,-3 -11,-10 -9,-14c6,-1 11,4 12,10z" />
          <path d="M99,170c7,-4 9,-11 7,-14c-6,-1 -10,5 -10,11z" />
        </g>
        <g className="tea-sprig tea-sprig-3">
          <path d="M318,164c-8,-3 -11,-10 -9,-14c6,-1 11,4 12,10z" />
          <path d="M325,164c7,-4 9,-11 7,-14c-6,-1 -10,5 -10,11z" />
        </g>
        <g className="tea-sprig tea-sprig-4">
          <path d="M366,192c-9,-4 -12,-11 -10,-15c7,-1 12,4 13,11z" />
          <path d="M374,192c8,-4 10,-12 8,-15c-7,-1 -11,5 -11,12z" />
        </g>
        <g className="tea-sprig tea-sprig-5">
          <path d="M52,198c-9,-4 -12,-11 -10,-15c7,-1 12,4 13,11z" />
          <path d="M60,198c8,-4 10,-12 8,-15c-7,-1 -11,5 -11,12z" />
        </g>
      </g>

      {/* 畝の上をかすめる鳥 */}
      <g className="tea-bird tea-bird-1">
        <path className="tea-wing" d="M-7,0Q-3.5,-5 0,0Q3.5,-5 7,0" fill="none" stroke="#3d5140" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="tea-bird tea-bird-2">
        <path className="tea-wing tea-wing-slow" d="M-5,0Q-2.5,-3.5 0,0Q2.5,-3.5 5,0" fill="none" stroke="#3d5140" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      <style>{`
        .tea-mist { opacity: 0; }
        .tea-mist-1 { animation: tea-roll-a 26s ease-in-out infinite; }
        .tea-mist-2 { animation: tea-roll-b 34s ease-in-out 6s infinite; }
        .tea-mist-3 { animation: tea-roll-a 30s ease-in-out 14s infinite; }
        @keyframes tea-roll-a {
          0%   { transform: translate(-90px, 6px); opacity: 0; }
          30%, 70% { opacity: 0.3; }
          100% { transform: translate(110px, -4px); opacity: 0; }
        }
        @keyframes tea-roll-b {
          0%   { transform: translate(80px, 4px); opacity: 0; }
          30%, 70% { opacity: 0.26; }
          100% { transform: translate(-100px, -6px); opacity: 0; }
        }

        .tea-sprig { transform-box: fill-box; transform-origin: 50% 100%; }
        .tea-sprig-1 { animation: tea-sway 4.6s ease-in-out infinite; }
        .tea-sprig-2 { animation: tea-sway 5.4s ease-in-out 0.7s infinite; }
        .tea-sprig-3 { animation: tea-sway 5s ease-in-out 1.4s infinite; }
        .tea-sprig-4 { animation: tea-sway 6.2s ease-in-out 0.3s infinite; }
        .tea-sprig-5 { animation: tea-sway 5.8s ease-in-out 2.1s infinite; }
        @keyframes tea-sway {
          0%, 100% { transform: rotate(-6deg); }
          50%      { transform: rotate(6deg); }
        }

        .tea-bird-1 { animation: tea-fly-a 19s linear infinite; }
        .tea-bird-2 { animation: tea-fly-b 25s linear 5s infinite; }
        @keyframes tea-fly-a {
          0%   { transform: translate(-22px, 60px); }
          100% { transform: translate(422px, 42px); }
        }
        @keyframes tea-fly-b {
          0%   { transform: translate(422px, 36px); }
          100% { transform: translate(-22px, 54px); }
        }
        .tea-wing { transform-box: fill-box; transform-origin: 50% 100%; animation: tea-flap 0.8s ease-in-out infinite alternate; }
        .tea-wing-slow { animation-duration: 1.1s; }
        @keyframes tea-flap {
          from { transform: scaleY(0.45); }
          to   { transform: scaleY(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .tea-mist-1, .tea-mist-2, .tea-mist-3,
          .tea-sprig-1, .tea-sprig-2, .tea-sprig-3, .tea-sprig-4, .tea-sprig-5,
          .tea-bird-1, .tea-bird-2, .tea-wing, .tea-wing-slow { animation: none; }
          .tea-mist { opacity: 0.28; }
          .tea-sprig-2 { transform: rotate(-5deg); }
          .tea-sprig-4 { transform: rotate(5deg); }
          .tea-bird-1 { transform: translate(120px, 52px); }
          .tea-bird-2 { transform: translate(268px, 42px); }
        }
      `}</style>
    </svg>
  );
}
