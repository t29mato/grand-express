/**
 * 店じゅうに一杯。ペタンクで13対0の負けには専用の呼び名があり、
 * 罰も決まっている——負けた者がカウンターの全員におごる。
 *
 * 手前に球と豚玉(コショネ)。相手の球だけが豚玉を囲み、こちらの球は
 * 遠くに転がったまま。カウンターにはグラスが並び、次々に満たされていく。
 * 負けた側は財布から硬貨を出し、それが一枚ずつ台の上を滑っていく。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function FranceTourneeGenerale() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 店の中 */}
      <rect width="400" height="210" fill="#3a2c26" />
      <rect width="400" height="86" fill="#2e231e" />

      {/* 棚 */}
      <rect x="0" y="18" width="400" height="7" fill="#4a382c" />
      <g fill="#6b4a2e">
        <rect x="24" y="0" width="14" height="18" rx="3" />
        <rect x="48" y="2" width="12" height="16" rx="3" />
        <rect x="300" y="0" width="14" height="18" rx="3" />
        <rect x="324" y="3" width="12" height="15" rx="3" />
      </g>
      {/* 吊り下げの灯り */}
      <g transform="translate(200,0)">
        <rect x="-2" y="0" width="4" height="24" fill="#4a382c" />
        <g className="ftg-lamp">
          <path d="M-20,24 l40,0 l-10,16 -20,0z" fill="#8d6b3c" />
          <ellipse cx="0" cy="40" rx="10" ry="4" fill="#f5b31c" />
        </g>
      </g>

      {/* 亜鉛のカウンター */}
      <rect y="96" width="400" height="24" fill="#8d949c" />
      <rect y="96" width="400" height="6" fill="#a5acb4" />
      <rect y="120" width="400" height="28" fill="#5c4632" />

      {/* 並んだグラス */}
      <g transform="translate(52,96)">
        <g className="ftg-glass-a">
          <path d="M-11,-30 l22,0 l-3,30 -16,0z" fill="#cfe3ee" opacity="0.5" />
          <path d="M-9,-14 l18,0 l-2,14 -14,0z" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(100,96)">
        <g className="ftg-glass-b">
          <path d="M-11,-30 l22,0 l-3,30 -16,0z" fill="#cfe3ee" opacity="0.5" />
          <path d="M-9,-14 l18,0 l-2,14 -14,0z" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(148,96)">
        <g className="ftg-glass-c">
          <path d="M-11,-30 l22,0 l-3,30 -16,0z" fill="#cfe3ee" opacity="0.5" />
          <path d="M-9,-14 l18,0 l-2,14 -14,0z" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(196,96)">
        <g className="ftg-glass-d">
          <path d="M-11,-30 l22,0 l-3,30 -16,0z" fill="#cfe3ee" opacity="0.5" />
          <path d="M-9,-14 l18,0 l-2,14 -14,0z" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(244,96)">
        <g className="ftg-glass-e">
          <path d="M-11,-30 l22,0 l-3,30 -16,0z" fill="#cfe3ee" opacity="0.5" />
          <path d="M-9,-14 l18,0 l-2,14 -14,0z" fill="#f5b31c" />
        </g>
      </g>

      {/* 注ぐ壜 */}
      <g transform="translate(262,60)">
        <g className="ftg-bottle">
          <rect x="-11" y="-30" width="22" height="34" rx="4" fill="#4a6b3a" />
          <rect x="-5" y="-44" width="10" height="16" rx="3" fill="#3d5a30" />
          <rect x="-9" y="-18" width="18" height="10" rx="2" fill="#d8c9a8" />
        </g>
      </g>
      <g transform="translate(250,68)">
        <g className="ftg-pour">
          <path
            d="M0,0 q-6,14 -3,26"
            stroke="#f5b31c"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* 滑っていく硬貨 */}
      <g transform="translate(330,92)">
        <g className="ftg-coin-a">
          <circle r="8" fill="#f5b31c" />
          <circle r="3.5" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(340,92)">
        <g className="ftg-coin-b">
          <circle r="7" fill="#f5b31c" />
          <circle r="3" fill="#c98a12" />
        </g>
      </g>

      {/* 空になった財布 */}
      <g transform="translate(366,104)">
        <g className="ftg-purse">
          <rect x="-14" y="-10" width="28" height="20" rx="3" fill="#5c3a20" />
          <rect x="-14" y="-10" width="28" height="6" rx="3" fill="#6e4828" />
          <path d="M-10,-10 q10,-10 20,0z" fill="#4a2e19" />
        </g>
      </g>

      {/* 土間 */}
      <rect y="148" width="400" height="62" fill="#6b5a44" />
      <rect y="148" width="400" height="5" fill="#7d6b52" />

      {/* ペタンクの球と豚玉 */}
      <g transform="translate(150,182)">
        <ellipse cx="0" cy="14" rx="80" ry="9" fill="#5c4c38" />
        {/* 豚玉 */}
        <circle cx="0" cy="0" r="7" fill="#d8582e" />
        {/* 相手の球が豚玉を囲む */}
        <g fill="#a8b0b8">
          <circle cx="-20" cy="-4" r="13" />
          <circle cx="18" cy="4" r="13" />
          <circle cx="-2" cy="-16" r="12" />
        </g>
        <g fill="#c4ccd4" opacity="0.5">
          <circle cx="-24" cy="-9" r="4" />
          <circle cx="14" cy="-1" r="4" />
          <circle cx="-6" cy="-21" r="4" />
        </g>
      </g>
      {/* 届かなかった自分の球 */}
      <g transform="translate(318,190)">
        <g className="ftg-boule">
          <circle r="13" fill="#7d858d" />
          <circle cx="-4" cy="-5" r="4" fill="#98a0a8" />
        </g>
      </g>

      <style>{`
        .ftg-lamp { transform-box: fill-box; transform-origin: 50% 0; animation: ftg-swing 4.4s ease-in-out infinite; }
        .ftg-glass-a { transform-box: fill-box; transform-origin: 50% 100%; animation: ftg-raise 3.6s ease-in-out infinite; }
        .ftg-glass-b { transform-box: fill-box; transform-origin: 50% 100%; animation: ftg-raise 3.6s ease-in-out infinite; animation-delay: -0.3s; }
        .ftg-glass-c { transform-box: fill-box; transform-origin: 50% 100%; animation: ftg-raise 3.6s ease-in-out infinite; animation-delay: -0.6s; }
        .ftg-glass-d { transform-box: fill-box; transform-origin: 50% 100%; animation: ftg-raise 3.6s ease-in-out infinite; animation-delay: -0.9s; }
        .ftg-glass-e { transform-box: fill-box; transform-origin: 50% 100%; animation: ftg-raise 3.6s ease-in-out infinite; animation-delay: -1.2s; }
        .ftg-bottle { transform-box: fill-box; transform-origin: 50% 100%; animation: ftg-tip 3.6s ease-in-out infinite; }
        .ftg-pour { transform-box: fill-box; transform-origin: 50% 0; animation: ftg-stream 3.6s ease-in-out infinite; }
        .ftg-coin-a { transform-box: fill-box; transform-origin: center; animation: ftg-slide 3.6s ease-in infinite; }
        .ftg-coin-b { transform-box: fill-box; transform-origin: center; animation: ftg-slide 3.6s ease-in infinite; animation-delay: -1.8s; }
        .ftg-purse { transform-box: fill-box; transform-origin: 50% 100%; animation: ftg-shake 3.6s ease-in-out infinite; }
        .ftg-boule { transform-box: fill-box; transform-origin: 50% 100%; animation: ftg-settle 3.6s ease-out infinite; }
        @keyframes ftg-swing {
          0%, 100% { transform: rotate(-2.5deg); }
          50% { transform: rotate(2.5deg); }
        }
        @keyframes ftg-raise {
          0%, 40% { transform: translate(0, 0); }
          58% { transform: translate(0, -12px) rotate(-6deg); }
          78% { transform: translate(0, -12px) rotate(4deg); }
          94%, 100% { transform: translate(0, 0); }
        }
        @keyframes ftg-tip {
          0%, 16% { transform: rotate(0deg); }
          34%, 54% { transform: rotate(-34deg) translate(-6px, 0); }
          74%, 100% { transform: rotate(0deg); }
        }
        @keyframes ftg-stream {
          0%, 20% { transform: scaleY(0); opacity: 0; }
          36%, 52% { transform: scaleY(1); opacity: 1; }
          64%, 100% { transform: scaleY(0); opacity: 0; }
        }
        @keyframes ftg-slide {
          0%, 10% { transform: translate(0, 0); opacity: 0; }
          22% { transform: translate(-8px, 0); opacity: 1; }
          70% { transform: translate(-96px, 2px); opacity: 1; }
          92%, 100% { transform: translate(-150px, 4px); opacity: 0; }
        }
        @keyframes ftg-shake {
          0%, 100% { transform: rotate(0deg); }
          24% { transform: rotate(-9deg); }
          44% { transform: rotate(7deg); }
          64% { transform: rotate(0deg); }
        }
        @keyframes ftg-settle {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(3px, 0) rotate(6deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ftg-lamp, .ftg-glass-a, .ftg-glass-b, .ftg-glass-c, .ftg-glass-d, .ftg-glass-e,
          .ftg-bottle, .ftg-pour, .ftg-coin-a, .ftg-coin-b,
          .ftg-purse, .ftg-boule { animation: none; }
        }
      `}</style>
    </svg>
  );
}
