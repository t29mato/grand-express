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
      <g className="park-cloud" fill="#f6efe2">
        <ellipse cx="60" cy="24" rx="24" ry="8" />
        <ellipse cx="44" cy="26" rx="15" ry="6" />
        <ellipse cx="76" cy="26" rx="17" ry="6" />
      </g>

      {/* 空をわたる鳥 */}
      <g className="park-bird park-bird-1">
        <path className="park-wing" d="M-7,0Q-3.5,-5 0,0Q3.5,-5 7,0" fill="none" stroke="#40525e" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="park-bird park-bird-2">
        <path className="park-wing park-wing-slow" d="M-5,0Q-2.5,-3.5 0,0Q2.5,-3.5 5,0" fill="none" stroke="#40525e" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* 木から落ちる葉 */}
      <g transform="translate(138,118)">
        <g className="park-leaf park-leaf-1">
          <ellipse cx="0" cy="0" rx="5.2" ry="3" fill="#3f8f4f" />
        </g>
      </g>
      <g transform="translate(146,110)">
        <g className="park-leaf park-leaf-2">
          <ellipse cx="0" cy="0" rx="4.4" ry="2.6" fill="#2f7d3f" />
        </g>
      </g>
      <g transform="translate(258,120)">
        <g className="park-leaf park-leaf-3">
          <ellipse cx="0" cy="0" rx="4.8" ry="2.8" fill="#3f8f4f" />
        </g>
      </g>

      {/* 池の波紋 */}
      <g fill="none" stroke="#cfeef8" strokeWidth="1.6" vectorEffect="non-scaling-stroke">
        <g transform="translate(154,178)">
          <ellipse className="park-ring park-ring-1" cx="0" cy="0" rx="10" ry="3" />
        </g>
        <g transform="translate(248,188)">
          <ellipse className="park-ring park-ring-2" cx="0" cy="0" rx="10" ry="3" />
        </g>
        <g transform="translate(200,196)">
          <ellipse className="park-ring park-ring-3" cx="0" cy="0" rx="10" ry="3" />
        </g>
      </g>

      {/* そよぐ芝草 */}
      <g fill="#7fb45c">
        <g className="park-tuft park-tuft-1">
          <path d="M28,200c-3,-4 -4,-9 -2,-12c2,3 3,8 2,12z" />
          <path d="M33,200c3,-5 4,-10 2,-13c-2,3 -3,8 -2,13z" />
        </g>
        <g className="park-tuft park-tuft-2">
          <path d="M66,206c-3,-4 -4,-10 -2,-13c2,3 3,9 2,13z" />
          <path d="M71,206c3,-5 4,-11 2,-14c-2,4 -3,9 -2,14z" />
        </g>
        <g className="park-tuft park-tuft-3">
          <path d="M336,202c-3,-4 -4,-9 -2,-12c2,3 3,8 2,12z" />
          <path d="M341,202c3,-5 4,-10 2,-13c-2,3 -3,8 -2,13z" />
        </g>
        <g className="park-tuft park-tuft-4">
          <path d="M374,196c-3,-4 -4,-9 -2,-12c2,3 3,8 2,12z" />
          <path d="M379,196c3,-5 4,-10 2,-13c-2,3 -3,8 -2,13z" />
        </g>
      </g>

      <style>{`
        .park-cloud { opacity: 0.7; animation: park-drift 60s linear infinite; }
        @keyframes park-drift {
          0%   { transform: translateX(-120px); }
          100% { transform: translateX(400px); }
        }

        .park-bird-1 { animation: park-fly-a 23s linear infinite; }
        .park-bird-2 { animation: park-fly-b 29s linear 6s infinite; }
        @keyframes park-fly-a {
          0%   { transform: translate(-22px, 52px); }
          100% { transform: translate(422px, 32px); }
        }
        @keyframes park-fly-b {
          0%   { transform: translate(422px, 30px); }
          100% { transform: translate(-22px, 48px); }
        }
        .park-wing { transform-box: fill-box; transform-origin: 50% 100%; animation: park-flap 0.85s ease-in-out infinite alternate; }
        .park-wing-slow { animation-duration: 1.2s; }
        @keyframes park-flap {
          from { transform: scaleY(0.45); }
          to   { transform: scaleY(1); }
        }

        .park-leaf { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .park-leaf-1 { animation: park-fall-a 12s ease-in-out infinite; }
        .park-leaf-2 { animation: park-fall-b 15s ease-in-out 5s infinite; }
        .park-leaf-3 { animation: park-fall-a 17s ease-in-out 9s infinite; }
        @keyframes park-fall-a {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          12%  { opacity: 0.9; }
          55%  { transform: translate(-14px, 30px) rotate(140deg); }
          88%  { opacity: 0.9; }
          100% { transform: translate(-4px, 62px) rotate(280deg); opacity: 0; }
        }
        @keyframes park-fall-b {
          0%   { transform: translate(0, 0) rotate(30deg); opacity: 0; }
          12%  { opacity: 0.9; }
          55%  { transform: translate(16px, 34px) rotate(-120deg); }
          88%  { opacity: 0.9; }
          100% { transform: translate(6px, 70px) rotate(-260deg); opacity: 0; }
        }

        .park-ring { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .park-ring-1 { animation: park-spread 8s ease-out infinite; }
        .park-ring-2 { animation: park-spread 10s ease-out 3.4s infinite; }
        .park-ring-3 { animation: park-spread 9s ease-out 6.2s infinite; }
        @keyframes park-spread {
          0%   { transform: scale(0.3); opacity: 0; }
          20%  { opacity: 0.5; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        .park-tuft { transform-box: fill-box; transform-origin: 50% 100%; }
        .park-tuft-1 { animation: park-sway 5.2s ease-in-out infinite; }
        .park-tuft-2 { animation: park-sway 6.4s ease-in-out 0.9s infinite; }
        .park-tuft-3 { animation: park-sway 5.8s ease-in-out 2s infinite; }
        .park-tuft-4 { animation: park-sway 6.8s ease-in-out 1.3s infinite; }
        @keyframes park-sway {
          0%, 100% { transform: rotate(-7deg); }
          50%      { transform: rotate(7deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .park-cloud, .park-bird-1, .park-bird-2, .park-wing, .park-wing-slow,
          .park-leaf-1, .park-leaf-2, .park-leaf-3,
          .park-ring-1, .park-ring-2, .park-ring-3,
          .park-tuft-1, .park-tuft-2, .park-tuft-3, .park-tuft-4 { animation: none; }
          .park-cloud { transform: translateX(90px); }
          .park-bird-1 { transform: translate(96px, 44px); }
          .park-bird-2 { transform: translate(250px, 34px); }
          .park-leaf { opacity: 0.9; }
          .park-leaf-1 { transform: translate(-10px, 22px) rotate(120deg); }
          .park-leaf-2 { transform: translate(12px, 40px) rotate(-60deg); }
          .park-leaf-3 { transform: translate(-6px, 14px) rotate(200deg); }
          .park-ring { opacity: 0.45; }
          .park-ring-2 { transform: scale(1.7); }
          .park-ring-3 { transform: scale(2.1); }
          .park-tuft-2 { transform: rotate(-6deg); }
          .park-tuft-4 { transform: rotate(6deg); }
        }
      `}</style>
    </svg>
  );
}
