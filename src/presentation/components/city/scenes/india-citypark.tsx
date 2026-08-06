/**
 * チャンディーガル(citypark)に重ねる動き。
 *
 * 池に波紋がひろがり、木から葉が芝生へ落ち、
 * 足もとの草がそよいで、雲と鳥が高いところをゆっくり流れる。
 * 背景(空・丘・建物・木・池)は下の静止画が描いているので、ここでは動くものだけ。
 */
export function IndiaCitypark() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 流れる雲 */}
      <g className="ipark-cloud" fill="#f6efe2">
        <ellipse cx="60" cy="24" rx="24" ry="8" />
        <ellipse cx="44" cy="26" rx="15" ry="6" />
        <ellipse cx="76" cy="26" rx="17" ry="6" />
      </g>

      {/* 空をわたる鳥 */}
      <g className="ipark-bird ipark-bird-1">
        <path className="ipark-wing" d="M-7,0Q-3.5,-5 0,0Q3.5,-5 7,0" fill="none" stroke="#40525e" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="ipark-bird ipark-bird-2">
        <path className="ipark-wing ipark-wing-slow" d="M-5,0Q-2.5,-3.5 0,0Q2.5,-3.5 5,0" fill="none" stroke="#40525e" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* 木から落ちる葉 */}
      <g transform="translate(138,118)">
        <g className="ipark-leaf ipark-leaf-1">
          <ellipse cx="0" cy="0" rx="5.2" ry="3" fill="#3f8f4f" />
        </g>
      </g>
      <g transform="translate(146,110)">
        <g className="ipark-leaf ipark-leaf-2">
          <ellipse cx="0" cy="0" rx="4.4" ry="2.6" fill="#2f7d3f" />
        </g>
      </g>
      <g transform="translate(258,120)">
        <g className="ipark-leaf ipark-leaf-3">
          <ellipse cx="0" cy="0" rx="4.8" ry="2.8" fill="#3f8f4f" />
        </g>
      </g>

      {/* 池の波紋 */}
      <g fill="none" stroke="#cfeef8" strokeWidth="1.6" vectorEffect="non-scaling-stroke">
        <g transform="translate(154,178)">
          <ellipse className="ipark-ring ipark-ring-1" cx="0" cy="0" rx="10" ry="3" />
        </g>
        <g transform="translate(248,188)">
          <ellipse className="ipark-ring ipark-ring-2" cx="0" cy="0" rx="10" ry="3" />
        </g>
        <g transform="translate(200,196)">
          <ellipse className="ipark-ring ipark-ring-3" cx="0" cy="0" rx="10" ry="3" />
        </g>
      </g>

      {/* そよぐ芝草 */}
      <g fill="#7fb45c">
        <g className="ipark-tuft ipark-tuft-1">
          <path d="M28,200c-3,-4 -4,-9 -2,-12c2,3 3,8 2,12z" />
          <path d="M33,200c3,-5 4,-10 2,-13c-2,3 -3,8 -2,13z" />
        </g>
        <g className="ipark-tuft ipark-tuft-2">
          <path d="M66,206c-3,-4 -4,-10 -2,-13c2,3 3,9 2,13z" />
          <path d="M71,206c3,-5 4,-11 2,-14c-2,4 -3,9 -2,14z" />
        </g>
        <g className="ipark-tuft ipark-tuft-3">
          <path d="M336,202c-3,-4 -4,-9 -2,-12c2,3 3,8 2,12z" />
          <path d="M341,202c3,-5 4,-10 2,-13c-2,3 -3,8 -2,13z" />
        </g>
        <g className="ipark-tuft ipark-tuft-4">
          <path d="M374,196c-3,-4 -4,-9 -2,-12c2,3 3,8 2,12z" />
          <path d="M379,196c3,-5 4,-10 2,-13c-2,3 -3,8 -2,13z" />
        </g>
      </g>

      <style>{`
        .ipark-cloud { opacity: 0.7; animation: ipark-drift 60s linear infinite; }
        @keyframes ipark-drift {
          0%   { transform: translateX(-120px); }
          100% { transform: translateX(400px); }
        }

        .ipark-bird-1 { animation: ipark-fly-a 23s linear infinite; }
        .ipark-bird-2 { animation: ipark-fly-b 29s linear 6s infinite; }
        @keyframes ipark-fly-a {
          0%   { transform: translate(-22px, 52px); }
          100% { transform: translate(422px, 32px); }
        }
        @keyframes ipark-fly-b {
          0%   { transform: translate(422px, 30px); }
          100% { transform: translate(-22px, 48px); }
        }
        .ipark-wing { transform-box: fill-box; transform-origin: 50% 100%; animation: ipark-flap 0.85s ease-in-out infinite alternate; }
        .ipark-wing-slow { animation-duration: 1.2s; }
        @keyframes ipark-flap {
          from { transform: scaleY(0.45); }
          to   { transform: scaleY(1); }
        }

        .ipark-leaf { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ipark-leaf-1 { animation: ipark-fall-a 12s ease-in-out infinite; }
        .ipark-leaf-2 { animation: ipark-fall-b 15s ease-in-out 5s infinite; }
        .ipark-leaf-3 { animation: ipark-fall-a 17s ease-in-out 9s infinite; }
        @keyframes ipark-fall-a {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          12%  { opacity: 0.9; }
          55%  { transform: translate(-14px, 30px) rotate(140deg); }
          88%  { opacity: 0.9; }
          100% { transform: translate(-4px, 62px) rotate(280deg); opacity: 0; }
        }
        @keyframes ipark-fall-b {
          0%   { transform: translate(0, 0) rotate(30deg); opacity: 0; }
          12%  { opacity: 0.9; }
          55%  { transform: translate(16px, 34px) rotate(-120deg); }
          88%  { opacity: 0.9; }
          100% { transform: translate(6px, 70px) rotate(-260deg); opacity: 0; }
        }

        .ipark-ring { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ipark-ring-1 { animation: ipark-spread 8s ease-out infinite; }
        .ipark-ring-2 { animation: ipark-spread 10s ease-out 3.4s infinite; }
        .ipark-ring-3 { animation: ipark-spread 9s ease-out 6.2s infinite; }
        @keyframes ipark-spread {
          0%   { transform: scale(0.3); opacity: 0; }
          20%  { opacity: 0.5; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        .ipark-tuft { transform-box: fill-box; transform-origin: 50% 100%; }
        .ipark-tuft-1 { animation: ipark-sway 5.2s ease-in-out infinite; }
        .ipark-tuft-2 { animation: ipark-sway 6.4s ease-in-out 0.9s infinite; }
        .ipark-tuft-3 { animation: ipark-sway 5.8s ease-in-out 2s infinite; }
        .ipark-tuft-4 { animation: ipark-sway 6.8s ease-in-out 1.3s infinite; }
        @keyframes ipark-sway {
          0%, 100% { transform: rotate(-7deg); }
          50%      { transform: rotate(7deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ipark-cloud, .ipark-bird-1, .ipark-bird-2, .ipark-wing, .ipark-wing-slow,
          .ipark-leaf-1, .ipark-leaf-2, .ipark-leaf-3,
          .ipark-ring-1, .ipark-ring-2, .ipark-ring-3,
          .ipark-tuft-1, .ipark-tuft-2, .ipark-tuft-3, .ipark-tuft-4 { animation: none; }
          .ipark-cloud { transform: translateX(90px); }
          .ipark-bird-1 { transform: translate(96px, 44px); }
          .ipark-bird-2 { transform: translate(250px, 34px); }
          .ipark-leaf { opacity: 0.9; }
          .ipark-leaf-1 { transform: translate(-10px, 22px) rotate(120deg); }
          .ipark-leaf-2 { transform: translate(12px, 40px) rotate(-60deg); }
          .ipark-leaf-3 { transform: translate(-6px, 14px) rotate(200deg); }
          .ipark-ring { opacity: 0.45; }
          .ipark-ring-2 { transform: scale(1.7); }
          .ipark-ring-3 { transform: scale(2.1); }
          .ipark-tuft-2 { transform: rotate(-6deg); }
          .ipark-tuft-4 { transform: rotate(6deg); }
        }
      `}</style>
    </svg>
  );
}
