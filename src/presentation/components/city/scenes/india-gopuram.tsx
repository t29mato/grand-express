/**
 * マドゥライ(gopuram)に重ねる動き。
 *
 * 塔の両わきから供物の煙が立ちのぼり、椰子の葉がそよぎ、
 * 空を鳥が横切って、手前の池に光の筋が流れる。
 * 背景(空・塔・地面)は下の静止画が描いているので、ここでは動くものだけ。
 */
export function IndiaGopuram() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 塔の両わきで焚かれる香の煙 */}
      <g transform="translate(128,150)">
        <g className="gop-smoke gop-smoke-a" fill="#f6efe2">
          <circle cx="0" cy="0" r="5" />
          <circle cx="4" cy="-8" r="6" />
          <circle cx="-3" cy="-17" r="7" />
        </g>
      </g>
      <g transform="translate(272,150)">
        <g className="gop-smoke gop-smoke-b" fill="#f6efe2">
          <circle cx="0" cy="0" r="4" />
          <circle cx="-4" cy="-7" r="5.5" />
          <circle cx="2" cy="-15" r="6.5" />
        </g>
      </g>

      {/* そよぐ椰子の葉(背景の葉にぴったり重ねてある) */}
      <path
        className="gop-frond gop-frond-l"
        d="M30,116c-14,-4 -19,3 -21,9c7,-6 14,-6 21,-2c7,-4 14,-4 21,2c-2,-6 -7,-13 -21,-9z"
        fill="#2f7d3f"
      />
      <path
        className="gop-frond gop-frond-r"
        d="M370,116c-14,-4 -19,3 -21,9c7,-6 14,-6 21,-2c7,-4 14,-4 21,2c-2,-6 -7,-13 -21,-9z"
        fill="#2f7d3f"
      />

      {/* 空をよぎる鳥 */}
      <g className="gop-bird gop-bird-1">
        <path className="gop-wing" d="M-8,0Q-4,-5 0,0Q4,-5 8,0" fill="none" stroke="#3a4453" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="gop-bird gop-bird-2">
        <path className="gop-wing gop-wing-slow" d="M-6,0Q-3,-4 0,0Q3,-4 6,0" fill="none" stroke="#3a4453" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <g className="gop-bird gop-bird-3">
        <path className="gop-wing" d="M-5,0Q-2.5,-3.5 0,0Q2.5,-3.5 5,0" fill="none" stroke="#3a4453" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* 手前の池を流れる光 */}
      <g stroke="#dff4fa" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="gop-glint gop-glint-1" d="M40,186h34" />
        <path className="gop-glint gop-glint-2" d="M150,196h44" />
        <path className="gop-glint gop-glint-3" d="M260,204h30" />
      </g>

      <style>{`
        .gop-smoke { transform-box: fill-box; transform-origin: 50% 100%; opacity: 0; }
        .gop-smoke-a { animation: gop-rise 7s ease-out infinite; }
        .gop-smoke-b { animation: gop-rise 7s ease-out 3.2s infinite; }
        @keyframes gop-rise {
          0%   { transform: translateY(4px) scale(0.5); opacity: 0; }
          25%  { opacity: 0.46; }
          100% { transform: translateY(-46px) scale(1.35); opacity: 0; }
        }

        .gop-frond { transform-box: fill-box; transform-origin: 50% 100%; }
        .gop-frond-l { animation: gop-sway 6.5s ease-in-out infinite; }
        .gop-frond-r { animation: gop-sway 7.6s ease-in-out 1.1s infinite; }
        @keyframes gop-sway {
          0%, 100% { transform: scale(1.05) rotate(-3.5deg); }
          50%      { transform: scale(1.05) rotate(3.5deg); }
        }

        .gop-bird-1 { animation: gop-fly-a 21s linear infinite; }
        .gop-bird-2 { animation: gop-fly-b 27s linear 4s infinite; }
        .gop-bird-3 { animation: gop-fly-a 33s linear 11s infinite; }
        @keyframes gop-fly-a {
          0%   { transform: translate(-24px, 46px); }
          100% { transform: translate(424px, 22px); }
        }
        @keyframes gop-fly-b {
          0%   { transform: translate(424px, 26px); }
          100% { transform: translate(-24px, 40px); }
        }
        .gop-wing { transform-box: fill-box; transform-origin: 50% 100%; animation: gop-flap 0.9s ease-in-out infinite alternate; }
        .gop-wing-slow { animation-duration: 1.2s; }
        @keyframes gop-flap {
          from { transform: scaleY(0.45); }
          to   { transform: scaleY(1); }
        }

        .gop-glint { opacity: 0; }
        .gop-glint-1 { animation: gop-slide 9s ease-in-out infinite; }
        .gop-glint-2 { animation: gop-slide 11s ease-in-out 2.5s infinite; }
        .gop-glint-3 { animation: gop-slide 8s ease-in-out 5s infinite; }
        @keyframes gop-slide {
          0%   { transform: translateX(-22px); opacity: 0; }
          50%  { opacity: 0.55; }
          100% { transform: translateX(26px); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gop-smoke-a, .gop-smoke-b, .gop-frond-l, .gop-frond-r,
          .gop-bird-1, .gop-bird-2, .gop-bird-3, .gop-wing, .gop-wing-slow,
          .gop-glint-1, .gop-glint-2, .gop-glint-3 { animation: none; }
          .gop-smoke { opacity: 0.42; transform: translateY(-24px) scale(1.1); }
          .gop-glint { opacity: 0.45; }
          .gop-bird-1 { transform: translate(70px, 34px); }
          .gop-bird-2 { transform: translate(300px, 30px); }
          .gop-bird-3 { transform: translate(348px, 46px); }
        }
      `}</style>
    </svg>
  );
}
