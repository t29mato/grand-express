/**
 * 古酒の泡盛が開き、席の全員分をおごる羽目になる(沖縄)。
 *
 *   - 傾いた瓶から泡盛が注がれ続ける
 *   - 猪口が満たされていく
 *   - 奥には家庭の甕(かめ)、右手では小銭が財布から飛んでいく
 */
export function AwamoriRound() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄暗い店内と卓 */}
      <rect width="400" height="210" fill="#2a1f26" />
      <rect y="96" width="400" height="54" fill="#33262c" />
      <rect y="150" width="400" height="12" fill="#8a5c38" />
      <rect y="162" width="400" height="48" fill="#4a2f1e" />

      {/* 提灯 */}
      <g>
        <rect x="66" y="0" width="3" height="26" fill="#1d1419" />
        <ellipse className="awam-lantern" cx="67" cy="42" rx="18" ry="20" fill="#e8443f" />
        <rect x="49" y="38" width="36" height="4" fill="#a82f2c" />
      </g>

      {/* 泡盛の甕 */}
      <g transform="translate(48,150)">
        <path d="M-26,0 C-32,-16 -26,-40 0,-40 C26,-40 32,-16 26,0z" fill="#6b4630" />
        <rect x="-30" y="-30" width="60" height="6" rx="3" fill="#3f2a1c" />
        <rect x="-14" y="-46" width="28" height="8" rx="3" fill="#4f3524" />
        <rect x="-9" y="-24" width="18" height="12" rx="2" fill="#f5b31c" />
      </g>

      {/* 注ぐ瓶 */}
      <g transform="translate(150,148)">
        <g className="awam-bottle">
          <rect x="-13" y="-46" width="26" height="46" rx="5" fill="#2f5a3f" />
          <rect x="-5" y="-70" width="10" height="26" fill="#2f5a3f" />
          <rect x="-7" y="-76" width="14" height="7" rx="2" fill="#1f3f2c" />
          <rect x="-11" y="-36" width="22" height="15" rx="2" fill="#f5b31c" />
          <rect x="-11" y="-31" width="22" height="4" fill="#c98a1c" />
        </g>
      </g>

      {/* 注がれる酒 */}
      <path
        className="awam-stream"
        d="M209,101 C212,114 206,120 205,134"
        stroke="#efdfae"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* 猪口 */}
      <g transform="translate(205,150)">
        <path d="M-13,-18 L13,-18 L10,0 L-10,0z" fill="#f6efe2" />
        <rect className="awam-fill awam-fill-a" x="-10" y="-15" width="20" height="14" fill="#d9b96a" />
        <path d="M-13,-18 L13,-18 L12,-14 L-12,-14z" fill="#d8cdba" />
      </g>
      <g transform="translate(250,150)">
        <path d="M-13,-18 L13,-18 L10,0 L-10,0z" fill="#f6efe2" />
        <rect className="awam-fill awam-fill-b" x="-10" y="-15" width="20" height="14" fill="#d9b96a" />
        <path d="M-13,-18 L13,-18 L12,-14 L-12,-14z" fill="#d8cdba" />
      </g>
      <g transform="translate(295,150)">
        <path d="M-13,-18 L13,-18 L10,0 L-10,0z" fill="#f6efe2" />
        <rect className="awam-fill awam-fill-c" x="-10" y="-15" width="20" height="14" fill="#d9b96a" />
        <path d="M-13,-18 L13,-18 L12,-14 L-12,-14z" fill="#d8cdba" />
      </g>

      {/* 支払い(飛んでいく小銭) */}
      <g transform="translate(352,178)">
        <rect x="-22" y="-14" width="44" height="26" rx="4" fill="#7a5236" />
        <rect x="-22" y="-6" width="44" height="6" fill="#54341f" />
        <g fill="#f5b31c">
          <circle className="awam-coin-a" cx="-4" cy="-30" r="7" />
          <circle className="awam-coin-b" cx="12" cy="-46" r="6" />
          <circle className="awam-coin-c" cx="-18" cy="-52" r="5" />
        </g>
      </g>

      <style>{`
        .awam-bottle {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: rotate(52deg);
          animation: awam-pour 2.6s ease-in-out infinite;
        }
        .awam-lantern { animation: awam-glow 2.8s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 0; }
        .awam-stream {
          stroke-dasharray: 9 5;
          animation: awam-flow 0.5s linear infinite;
        }
        .awam-fill { transform-box: fill-box; transform-origin: 50% 100%; transform: scaleY(0.6); }
        .awam-fill-a { animation: awam-topup 2.6s ease-in-out infinite; }
        .awam-fill-b { animation: awam-topup 2.6s ease-in-out infinite; animation-delay: -0.9s; }
        .awam-fill-c { animation: awam-topup 2.6s ease-in-out infinite; animation-delay: -1.8s; }
        .awam-coin-a { animation: awam-leave 2.2s ease-out infinite; }
        .awam-coin-b { animation: awam-leave 2.2s ease-out infinite; animation-delay: -0.8s; }
        .awam-coin-c { animation: awam-leave 2.2s ease-out infinite; animation-delay: -1.5s; }
        @keyframes awam-pour {
          0%, 100% { transform: rotate(46deg); }
          50% { transform: rotate(60deg); }
        }
        @keyframes awam-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.72; }
        }
        @keyframes awam-flow {
          0% { stroke-dashoffset: 14; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes awam-topup {
          0% { transform: scaleY(0.15); }
          70%, 100% { transform: scaleY(0.95); }
        }
        @keyframes awam-leave {
          0% { transform: translate(0, 24px); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(14px, -40px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .awam-bottle, .awam-lantern, .awam-stream, .awam-fill-a, .awam-fill-b,
          .awam-fill-c, .awam-coin-a, .awam-coin-b, .awam-coin-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
