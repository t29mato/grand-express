/**
 * 熱帯の町(シンガポール、ジャカルタ、ラゴスなど)に重ねる動き。
 *
 * 椰子の葉が海風にひるがえり、浅瀬に波が寄せて泡が引き、
 * 通り雨のしずくが落ちて、海鳥が沖へわたっていく。
 * 浜・椰子・小屋は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldTropics() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 寄せる波(海は y=104〜152) */}
      <g stroke="#ddf6fa" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path className="wtro-wave wtro-v1" d="M26,116h72" opacity="0.55" />
        <path className="wtro-wave wtro-v2" d="M164,112h62" opacity="0.5" />
        <path className="wtro-wave wtro-v3" d="M262,122h82" opacity="0.55" />
        <path className="wtro-wave wtro-v4" d="M70,138h84" opacity="0.5" />
        <path className="wtro-wave wtro-v5" d="M238,142h92" opacity="0.45" />
      </g>

      {/* 波打ちぎわの泡(砂との境 y=152) */}
      <g fill="#f0fdfd">
        <ellipse className="wtro-foam-a" cx="120" cy="151" rx="80" ry="3.4" opacity="0.5" />
        <ellipse className="wtro-foam-b" cx="300" cy="152" rx="86" ry="3" opacity="0.42" />
      </g>

      {/* 椰子の葉(静止画の葉に重ねてひるがえらせる) */}
      <g fill="#2f7d3f">
        <path
          className="wtro-frond wtro-f1"
          d="M30,154c-14,-4 -19,3 -21,9c7,-6 14,-6 21,-2c7,-4 14,-4 21,2c-2,-6 -7,-13 -21,-9z"
        />
        <path
          className="wtro-frond wtro-f2"
          d="M143.33,154c-14,-4 -19,3 -21,9c7,-6 14,-6 21,-2c7,-4 14,-4 21,2c-2,-6 -7,-13 -21,-9z"
        />
        <path
          className="wtro-frond wtro-f3"
          d="M256.67,154c-14,-4 -19,3 -21,9c7,-6 14,-6 21,-2c7,-4 14,-4 21,2c-2,-6 -7,-13 -21,-9z"
        />
        <path
          className="wtro-frond wtro-f4"
          d="M370,154c-14,-4 -19,3 -21,9c7,-6 14,-6 21,-2c7,-4 14,-4 21,2c-2,-6 -7,-13 -21,-9z"
        />
      </g>

      {/* 通り雨のしずく */}
      <g stroke="#cfe8f4" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path className="wtro-drop wtro-d1" d="M96,0v7" opacity="0.55" />
        <path className="wtro-drop wtro-d2" d="M188,0v6" opacity="0.5" />
        <path className="wtro-drop wtro-d3" d="M262,0v7" opacity="0.5" />
        <path className="wtro-drop wtro-d4" d="M330,0v6" opacity="0.45" />
        <path className="wtro-drop wtro-d5" d="M142,0v6" opacity="0.45" />
      </g>

      {/* 沖へわたる海鳥 */}
      <g transform="translate(200,54)">
        <g className="wtro-bird">
          <path className="wtro-flap" d="M-8,0 Q-4,-5.4 0,-0.8 Q4,-5.4 8,0" fill="none" stroke="#f6efe2" strokeWidth="1.9" strokeLinecap="round" />
        </g>
      </g>

      <style>{`
        .wtro-wave, .wtro-foam-a, .wtro-foam-b, .wtro-frond, .wtro-drop, .wtro-flap {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .wtro-wave { animation: wtro-roll 12s linear infinite; }
        .wtro-v2 { animation-duration: 16s; animation-delay: -5s; }
        .wtro-v3 { animation-duration: 10s; animation-delay: -7s; }
        .wtro-v4 { animation-duration: 14s; animation-delay: -3s; }
        .wtro-v5 { animation-duration: 11s; animation-delay: -8s; }
        .wtro-foam-a { animation: wtro-wash 7.5s ease-in-out infinite; }
        .wtro-foam-b { animation: wtro-wash 9.5s ease-in-out infinite; animation-delay: -4s; }
        .wtro-frond { transform-origin: 50% 100%; animation: wtro-sway 5.4s ease-in-out infinite; }
        .wtro-f2 { animation-duration: 6.4s; animation-delay: -1.6s; }
        .wtro-f3 { animation-duration: 4.8s; animation-delay: -3s; }
        .wtro-f4 { animation-duration: 6s; animation-delay: -2.2s; }
        .wtro-drop { animation: wtro-rain 3.4s linear infinite; }
        .wtro-d2 { animation-duration: 3s; animation-delay: -1.1s; }
        .wtro-d3 { animation-duration: 3.8s; animation-delay: -2.2s; }
        .wtro-d4 { animation-duration: 3.2s; animation-delay: -0.7s; }
        .wtro-d5 { animation-duration: 4s; animation-delay: -2.8s; }
        .wtro-bird { animation: wtro-cross 25s linear infinite; animation-delay: -9s; }
        .wtro-flap { transform-origin: 50% 100%; animation: wtro-flap 1.9s ease-in-out infinite; }
        @keyframes wtro-roll {
          0% { transform: translateX(-34px); opacity: 0; }
          30%, 70% { opacity: 0.55; }
          100% { transform: translateX(34px); opacity: 0; }
        }
        @keyframes wtro-wash {
          0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.24; }
          50% { transform: translateY(3px) scaleX(1.1); opacity: 0.58; }
        }
        @keyframes wtro-sway {
          0%, 100% { transform: rotate(-5deg) scaleX(1); }
          50% { transform: rotate(5deg) scaleX(0.92); }
        }
        @keyframes wtro-rain {
          0% { transform: translate(0, -10px); opacity: 0; }
          15% { opacity: 0.55; }
          85% { opacity: 0.45; }
          100% { transform: translate(-10px, 168px); opacity: 0; }
        }
        @keyframes wtro-cross {
          0% { transform: translate(-240px, 10px); }
          100% { transform: translate(230px, -12px); }
        }
        @keyframes wtro-flap {
          0%, 100% { transform: scaleY(0.55); }
          50% { transform: scaleY(1.35); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wtro-wave, .wtro-foam-a, .wtro-foam-b, .wtro-frond,
          .wtro-drop, .wtro-bird, .wtro-flap { animation: none; }
        }
      `}</style>
    </svg>
  );
}
