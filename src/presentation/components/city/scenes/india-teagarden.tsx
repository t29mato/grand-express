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
        <g className="itea-mist itea-mist-1">
          <ellipse cx="60" cy="112" rx="70" ry="9" />
          <ellipse cx="120" cy="108" rx="44" ry="7" />
        </g>
        <g className="itea-mist itea-mist-2">
          <ellipse cx="300" cy="122" rx="86" ry="8" />
          <ellipse cx="240" cy="118" rx="46" ry="6" />
        </g>
        <g className="itea-mist itea-mist-3">
          <ellipse cx="180" cy="132" rx="100" ry="7" />
        </g>
      </g>

      {/* 風にゆれる茶樹の新芽 */}
      <g fill="#8fc46a">
        <g className="itea-sprig itea-sprig-1">
          <path d="M34,150c-7,-3 -10,-9 -8,-13c5,-1 10,3 11,9z" />
          <path d="M40,150c6,-4 8,-10 6,-13c-5,-1 -9,4 -9,10z" />
        </g>
        <g className="itea-sprig itea-sprig-2">
          <path d="M92,170c-8,-3 -11,-10 -9,-14c6,-1 11,4 12,10z" />
          <path d="M99,170c7,-4 9,-11 7,-14c-6,-1 -10,5 -10,11z" />
        </g>
        <g className="itea-sprig itea-sprig-3">
          <path d="M318,164c-8,-3 -11,-10 -9,-14c6,-1 11,4 12,10z" />
          <path d="M325,164c7,-4 9,-11 7,-14c-6,-1 -10,5 -10,11z" />
        </g>
        <g className="itea-sprig itea-sprig-4">
          <path d="M366,192c-9,-4 -12,-11 -10,-15c7,-1 12,4 13,11z" />
          <path d="M374,192c8,-4 10,-12 8,-15c-7,-1 -11,5 -11,12z" />
        </g>
        <g className="itea-sprig itea-sprig-5">
          <path d="M52,198c-9,-4 -12,-11 -10,-15c7,-1 12,4 13,11z" />
          <path d="M60,198c8,-4 10,-12 8,-15c-7,-1 -11,5 -11,12z" />
        </g>
      </g>

      {/* 畝の上をかすめる鳥 */}
      <g className="itea-bird itea-bird-1">
        <path className="itea-wing" d="M-7,0Q-3.5,-5 0,0Q3.5,-5 7,0" fill="none" stroke="#3d5140" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="itea-bird itea-bird-2">
        <path className="itea-wing itea-wing-slow" d="M-5,0Q-2.5,-3.5 0,0Q2.5,-3.5 5,0" fill="none" stroke="#3d5140" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      <style>{`
        .itea-mist { opacity: 0; }
        .itea-mist-1 { animation: itea-roll-a 26s ease-in-out infinite; }
        .itea-mist-2 { animation: itea-roll-b 34s ease-in-out 6s infinite; }
        .itea-mist-3 { animation: itea-roll-a 30s ease-in-out 14s infinite; }
        @keyframes itea-roll-a {
          0%   { transform: translate(-90px, 6px); opacity: 0; }
          30%, 70% { opacity: 0.3; }
          100% { transform: translate(110px, -4px); opacity: 0; }
        }
        @keyframes itea-roll-b {
          0%   { transform: translate(80px, 4px); opacity: 0; }
          30%, 70% { opacity: 0.26; }
          100% { transform: translate(-100px, -6px); opacity: 0; }
        }

        .itea-sprig { transform-box: fill-box; transform-origin: 50% 100%; }
        .itea-sprig-1 { animation: itea-sway 4.6s ease-in-out infinite; }
        .itea-sprig-2 { animation: itea-sway 5.4s ease-in-out 0.7s infinite; }
        .itea-sprig-3 { animation: itea-sway 5s ease-in-out 1.4s infinite; }
        .itea-sprig-4 { animation: itea-sway 6.2s ease-in-out 0.3s infinite; }
        .itea-sprig-5 { animation: itea-sway 5.8s ease-in-out 2.1s infinite; }
        @keyframes itea-sway {
          0%, 100% { transform: rotate(-6deg); }
          50%      { transform: rotate(6deg); }
        }

        .itea-bird-1 { animation: itea-fly-a 19s linear infinite; }
        .itea-bird-2 { animation: itea-fly-b 25s linear 5s infinite; }
        @keyframes itea-fly-a {
          0%   { transform: translate(-22px, 60px); }
          100% { transform: translate(422px, 42px); }
        }
        @keyframes itea-fly-b {
          0%   { transform: translate(422px, 36px); }
          100% { transform: translate(-22px, 54px); }
        }
        .itea-wing { transform-box: fill-box; transform-origin: 50% 100%; animation: itea-flap 0.8s ease-in-out infinite alternate; }
        .itea-wing-slow { animation-duration: 1.1s; }
        @keyframes itea-flap {
          from { transform: scaleY(0.45); }
          to   { transform: scaleY(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .itea-mist-1, .itea-mist-2, .itea-mist-3,
          .itea-sprig-1, .itea-sprig-2, .itea-sprig-3, .itea-sprig-4, .itea-sprig-5,
          .itea-bird-1, .itea-bird-2, .itea-wing, .itea-wing-slow { animation: none; }
          .itea-mist { opacity: 0.28; }
          .itea-sprig-2 { transform: rotate(-5deg); }
          .itea-sprig-4 { transform: rotate(5deg); }
          .itea-bird-1 { transform: translate(120px, 52px); }
          .itea-bird-2 { transform: translate(268px, 42px); }
        }
      `}</style>
    </svg>
  );
}
