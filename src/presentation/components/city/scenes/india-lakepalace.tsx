/**
 * シュリーナガル(lakepalace)に重ねる動き。
 *
 * シカラ(小舟)が湖をゆっくり横切り、夕日の道が水面で細かくまたたく。
 * 岸のさざなみが流れ、二羽の鳥が茜空をわたる。
 * 背景(空・湖・宮殿)は下の静止画が描いているので、ここでは動くものだけ。
 */

/** 夕日の映り込み。y座標と幅。 */
const LAK_GLINTS: ReadonlyArray<readonly [number, number]> = [
  [130, 14],
  [140, 20],
  [151, 12],
  [163, 24],
  [176, 16],
  [190, 28],
  [202, 18],
];

export function IndiaLakepalace() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕日の道 */}
      <g fill="#ffd9a0">
        {LAK_GLINTS.map(([y, w], i) => (
          <rect
            key={y}
            className="ilak-glint"
            x={310 - w / 2 + (i % 2 === 0 ? -4 : 5)}
            y={y}
            width={w}
            height="3"
            rx="1.5"
            style={{ animationDelay: `${(i * 0.7) % 4}s`, animationDuration: `${3.6 + (i % 3) * 1.1}s` }}
          />
        ))}
      </g>

      {/* 岸のさざなみ */}
      <g stroke="#cfe8f4" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="ilak-ripple ilak-ripple-1" d="M24,142h38" />
        <path className="ilak-ripple ilak-ripple-2" d="M60,166h48" />
        <path className="ilak-ripple ilak-ripple-3" d="M22,192h40" />
        <path className="ilak-ripple ilak-ripple-4" d="M330,182h42" />
      </g>

      {/* 湖をゆくシカラ */}
      <g transform="translate(0,176)">
        <g className="ilak-boat">
          <g className="ilak-bob">
            <path d="M-26,0c8,6 42,6 50,0c-8,-5 -42,-5 -50,0z" fill="#6b4a2c" />
            <path d="M-26,0c-5,-3 -8,-8 -5,-11" fill="none" stroke="#6b4a2c" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M-10,-5h26v-3a13,13 0 0 0 -26,0z" fill="#f2ede0" />
            <path d="M-10,-5h26v2h-26z" fill="#e8447a" />
            <circle cx="20" cy="-9" r="3.4" fill="#3a2f28" />
            <rect x="17" y="-6" width="7" height="7" rx="2.5" fill="#3a4453" />
            <path className="ilak-oar" d="M24,-6l10,7" stroke="#8a6a3c" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </g>

      {/* 茜空をわたる鳥 */}
      <g className="ilak-bird ilak-bird-1">
        <path className="ilak-wing" d="M-8,0Q-4,-5 0,0Q4,-5 8,0" fill="none" stroke="#5a4038" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="ilak-bird ilak-bird-2">
        <path className="ilak-wing ilak-wing-slow" d="M-6,0Q-3,-4 0,0Q3,-4 6,0" fill="none" stroke="#5a4038" strokeWidth="1.7" strokeLinecap="round" />
      </g>

      <style>{`
        .ilak-glint { opacity: 0; animation-name: ilak-twinkle; animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
        @keyframes ilak-twinkle {
          0%, 100% { opacity: 0.15; transform: translateX(-3px); }
          50%      { opacity: 0.88; transform: translateX(3px); }
        }

        .ilak-ripple { opacity: 0; }
        .ilak-ripple-1 { animation: ilak-lap 9s ease-in-out infinite; }
        .ilak-ripple-2 { animation: ilak-lap 11s ease-in-out 2.6s infinite; }
        .ilak-ripple-3 { animation: ilak-lap 10s ease-in-out 5.2s infinite; }
        .ilak-ripple-4 { animation: ilak-lap 12s ease-in-out 1.4s infinite; }
        @keyframes ilak-lap {
          0%   { transform: translateX(-18px); opacity: 0; }
          50%  { opacity: 0.5; }
          100% { transform: translateX(20px); opacity: 0; }
        }

        .ilak-boat { animation: ilak-cross 40s linear infinite; }
        @keyframes ilak-cross {
          0%   { transform: translateX(440px); }
          100% { transform: translateX(-60px); }
        }
        .ilak-bob { transform-box: fill-box; transform-origin: 50% 100%; animation: ilak-sway 4.5s ease-in-out infinite; }
        @keyframes ilak-sway {
          0%, 100% { transform: rotate(-1.8deg) translateY(0); }
          50%      { transform: rotate(1.8deg) translateY(-1.5px); }
        }
        .ilak-oar { transform-box: fill-box; transform-origin: 0 0; animation: ilak-row 2.2s ease-in-out infinite alternate; }
        @keyframes ilak-row {
          from { transform: rotate(-16deg); }
          to   { transform: rotate(14deg); }
        }

        .ilak-bird-1 { animation: ilak-fly-a 26s linear infinite; }
        .ilak-bird-2 { animation: ilak-fly-b 32s linear 7s infinite; }
        @keyframes ilak-fly-a {
          0%   { transform: translate(-24px, 34px); }
          100% { transform: translate(424px, 20px); }
        }
        @keyframes ilak-fly-b {
          0%   { transform: translate(424px, 18px); }
          100% { transform: translate(-24px, 38px); }
        }
        .ilak-wing { transform-box: fill-box; transform-origin: 50% 100%; animation: ilak-flap 0.9s ease-in-out infinite alternate; }
        .ilak-wing-slow { animation-duration: 1.3s; }
        @keyframes ilak-flap {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ilak-glint, .ilak-ripple-1, .ilak-ripple-2, .ilak-ripple-3, .ilak-ripple-4,
          .ilak-boat, .ilak-bob, .ilak-oar, .ilak-bird-1, .ilak-bird-2, .ilak-wing, .ilak-wing-slow { animation: none; }
          .ilak-glint { opacity: 0.8; }
          .ilak-ripple { opacity: 0.45; }
          .ilak-boat { transform: translateX(120px); }
          .ilak-bird-1 { transform: translate(90px, 28px); }
          .ilak-bird-2 { transform: translate(140px, 22px); }
        }
      `}</style>
    </svg>
  );
}
