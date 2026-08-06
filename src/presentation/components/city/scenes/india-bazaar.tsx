/**
 * ラクナウ(bazaar)に重ねる動き。
 *
 * 頭上の三角旗が風にはためき、店先に吊るした反物がゆれ、
 * 奥の大鍋からは煮込みの湯気が立ちのぼる。日ざしのなかを埃が舞う。
 * 背景(空・地面・露店・旗)は下の静止画が描いているので、ここでは動くものだけ。
 */

/** 背景の三角旗と同じ位置・同じ色。ここに重ねてはためかせる。 */
const BAZ_FLAGS: ReadonlyArray<readonly [number, number, string]> = [
  [7, 71.5, "#e8443f"],
  [34, 74, "#f5b31c"],
  [61, 76.5, "#5b8fe8"],
  [88, 79, "#f6efe2"],
  [115, 80.5, "#e8447a"],
  [142, 82, "#e8443f"],
  [169, 83, "#f5b31c"],
  [196, 83, "#5b8fe8"],
  [223, 82.5, "#f6efe2"],
  [250, 81.5, "#e8447a"],
  [277, 80.5, "#e8443f"],
  [304, 78.5, "#f5b31c"],
  [331, 76, "#5b8fe8"],
  [358, 73.5, "#f6efe2"],
];

export function IndiaBazaar() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* はためく三角旗 */}
      <g>
        {BAZ_FLAGS.map(([x, y, color], i) => (
          <path
            key={x}
            className="baz-flag"
            d={`M${x},${y}h14l-7,15z`}
            fill={color}
            opacity=".95"
            style={{ animationDelay: `${(i % 4) * 0.22 + (i % 3) * 0.13}s` }}
          />
        ))}
      </g>

      {/* 店先に吊るした反物 */}
      <g>
        <rect className="baz-cloth baz-cloth-1" x="32" y="104" width="12" height="30" rx="2" fill="#f5b31c" />
        <rect className="baz-cloth baz-cloth-2" x="52" y="104" width="12" height="26" rx="2" fill="#4f9f8a" />
        <rect className="baz-cloth baz-cloth-3" x="72" y="104" width="12" height="32" rx="2" fill="#f6efe2" />
      </g>

      {/* 煮込みの大鍋 */}
      <g>
        <rect x="341" y="172" width="8" height="13" rx="2" fill="#6b5330" />
        <rect x="369" y="172" width="8" height="13" rx="2" fill="#6b5330" />
        <path className="baz-fire" d="M352,185c-5,-7 -2,-14 7,-17c9,3 12,10 7,17z" fill="#f2803c" />
        <path d="M342,152h34l-4,17a6,6 0 0 1 -6,4h-14a6,6 0 0 1 -6,-4z" fill="#a86a34" />
        <ellipse cx="359" cy="152" rx="19" ry="5" fill="#c88a4a" />
      </g>
      <g transform="translate(352,148)">
        <g className="baz-steam baz-steam-a" fill="#f8f2e4">
          <circle cx="0" cy="0" r="4" />
          <circle cx="3" cy="-7" r="5" />
          <circle cx="-2" cy="-14" r="6" />
        </g>
      </g>
      <g transform="translate(368,148)">
        <g className="baz-steam baz-steam-b" fill="#f8f2e4">
          <circle cx="0" cy="0" r="3.5" />
          <circle cx="-3" cy="-6" r="4.5" />
          <circle cx="1" cy="-13" r="5.5" />
        </g>
      </g>

      {/* 日ざしのなかの埃 */}
      <g fill="#fdf3d8">
        <circle className="baz-mote baz-mote-1" cx="70" cy="112" r="1.8" />
        <circle className="baz-mote baz-mote-2" cx="112" cy="128" r="1.5" />
        <circle className="baz-mote baz-mote-3" cx="40" cy="140" r="1.6" />
        <circle className="baz-mote baz-mote-4" cx="300" cy="130" r="1.5" />
      </g>

      <style>{`
        .baz-flag {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: baz-flutter 3s ease-in-out infinite;
        }
        @keyframes baz-flutter {
          0%, 100% { transform: scale(1.14) rotate(-8deg); }
          50%      { transform: scale(1.14) rotate(7deg); }
        }

        .baz-cloth { transform-box: fill-box; transform-origin: 50% 0; }
        .baz-cloth-1 { animation: baz-swing 5s ease-in-out infinite; }
        .baz-cloth-2 { animation: baz-swing 6.2s ease-in-out 0.8s infinite; }
        .baz-cloth-3 { animation: baz-swing 5.6s ease-in-out 1.9s infinite; }
        @keyframes baz-swing {
          0%, 100% { transform: rotate(-3.5deg) skewX(-2deg); }
          50%      { transform: rotate(3.5deg) skewX(2deg); }
        }

        .baz-steam { transform-box: fill-box; transform-origin: 50% 100%; opacity: 0; }
        .baz-steam-a { animation: baz-rise 6s ease-out infinite; }
        .baz-steam-b { animation: baz-rise 6s ease-out 2.8s infinite; }
        @keyframes baz-rise {
          0%   { transform: translateY(4px) scale(0.5); opacity: 0; }
          25%  { opacity: 0.5; }
          100% { transform: translateY(-42px) scale(1.3); opacity: 0; }
        }

        .baz-fire { transform-box: fill-box; transform-origin: 50% 100%; animation: baz-flicker 0.9s ease-in-out infinite alternate; }
        @keyframes baz-flicker {
          from { transform: scale(0.8, 0.8); opacity: 0.75; }
          to   { transform: scale(1.1, 1.15); opacity: 1; }
        }

        .baz-mote { opacity: 0; }
        .baz-mote-1 { animation: baz-float 12s linear infinite; }
        .baz-mote-2 { animation: baz-float 15s linear 3s infinite; }
        .baz-mote-3 { animation: baz-float 13s linear 6.5s infinite; }
        .baz-mote-4 { animation: baz-float 17s linear 9s infinite; }
        @keyframes baz-float {
          0%   { transform: translate(0, 0); opacity: 0; }
          25%  { opacity: 0.6; }
          100% { transform: translate(40px, -34px); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .baz-flag, .baz-cloth-1, .baz-cloth-2, .baz-cloth-3,
          .baz-steam-a, .baz-steam-b, .baz-fire,
          .baz-mote-1, .baz-mote-2, .baz-mote-3, .baz-mote-4 { animation: none; }
          .baz-flag { transform: scale(1.14) rotate(-5deg); }
          .baz-cloth-1 { transform: rotate(-3deg); }
          .baz-cloth-3 { transform: rotate(3deg); }
          .baz-steam { opacity: 0.45; transform: translateY(-22px) scale(1.1); }
          .baz-mote { opacity: 0.55; }
        }
      `}</style>
    </svg>
  );
}
