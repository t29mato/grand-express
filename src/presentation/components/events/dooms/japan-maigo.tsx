/**
 * 駅で迷子。
 *
 * 同じ形の出口がいくつも並び、案内の矢印は向きを変え続ける。
 * 地図を広げて回っているあいだに、時計の針だけが進んでいく。
 */
export function JapanMaigo() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 地下通路 */}
      <rect width="400" height="210" fill="#2f3a48" />
      <rect width="400" height="18" fill="#1e2733" />
      <rect y="164" width="400" height="46" fill="#3d4a58" />
      <rect y="164" width="400" height="3" fill="#4e5e6e" />

      {/* どれも同じ形の出口 */}
      <g>
        <g>
          <path d="M14,164 L14,116 a26,26 0 0 1 52,0 L66,164 z" fill="#16202b" />
          <rect x="24" y="96" width="32" height="12" rx="2" fill="#f5b31c" />
          <path d="M30,102 l10,0 l0,-4 l7,4 l-7,4 l0,-4 z" fill="#1e2733" />
        </g>
        <g>
          <path d="M84,164 L84,116 a26,26 0 0 1 52,0 L136,164 z" fill="#16202b" />
          <rect x="94" y="96" width="32" height="12" rx="2" fill="#f5b31c" />
          <path d="M120,102 l-10,0 l0,-4 l-7,4 l7,4 l0,-4 z" fill="#1e2733" />
        </g>
        <g>
          <path d="M264,164 L264,116 a26,26 0 0 1 52,0 L316,164 z" fill="#16202b" />
          <rect x="274" y="96" width="32" height="12" rx="2" fill="#f5b31c" />
          <path d="M280,102 l10,0 l0,-4 l7,4 l-7,4 l0,-4 z" fill="#1e2733" />
        </g>
        <g>
          <path d="M334,164 L334,116 a26,26 0 0 1 52,0 L386,164 z" fill="#16202b" />
          <rect x="344" y="96" width="32" height="12" rx="2" fill="#f5b31c" />
          <path d="M370,102 l-10,0 l0,-4 l-7,4 l7,4 l0,-4 z" fill="#1e2733" />
        </g>
      </g>

      {/* 向きの変わる案内板 */}
      <g>
        <rect x="112" y="18" width="176" height="7" fill="#4e5e6e" />
        <rect x="120" y="25" width="26" height="4" fill="#3d4a58" />
        <rect x="254" y="25" width="26" height="4" fill="#3d4a58" />
        <g>
          <rect x="112" y="29" width="52" height="30" rx="3" fill="#f5b31c" />
          <path className="jm-arrow-a" d="M-13,-4 L2,-4 L2,-9 L12,0 L2,9 L2,4 L-13,4 z" fill="#1e2733" />
        </g>
        <g>
          <rect x="174" y="29" width="52" height="30" rx="3" fill="#f5b31c" />
          <path className="jm-arrow-b" d="M-13,-4 L2,-4 L2,-9 L12,0 L2,9 L2,4 L-13,4 z" fill="#1e2733" />
        </g>
        <g>
          <rect x="236" y="29" width="52" height="30" rx="3" fill="#f5b31c" />
          <path className="jm-arrow-c" d="M-13,-4 L2,-4 L2,-9 L12,0 L2,9 L2,4 L-13,4 z" fill="#1e2733" />
        </g>
      </g>

      {/* 進んでいく時計 */}
      <g>
        <circle cx="200" cy="88" r="24" fill="#1e2733" />
        <circle cx="200" cy="88" r="20" fill="#eef3f7" />
        <g fill="#1e2733">
          <rect x="199" y="70" width="2.5" height="4" />
          <rect x="199" y="102" width="2.5" height="4" />
          <rect x="182" y="87" width="4" height="2.5" />
          <rect x="214" y="87" width="4" height="2.5" />
        </g>
        <rect className="jm-hand-h" x="198.5" y="76" width="3" height="13" rx="1.5" fill="#2a3644" />
        <rect className="jm-hand-m" x="199" y="70" width="2.4" height="19" rx="1.2" fill="#e05252" />
        <circle cx="200" cy="88" r="2.6" fill="#1e2733" />
      </g>

      {/* 通り過ぎる人 */}
      <g fill="#3a4a5c">
        <g className="jm-pass-a">
          <circle cx="0" cy="-40" r="11" />
          <path d="M-13,0 q1,-30 13,-30 q12,0 13,30 z" />
        </g>
        <g className="jm-pass-b">
          <circle cx="0" cy="-36" r="10" />
          <path d="M-12,0 q1,-28 12,-28 q11,0 12,28 z" />
        </g>
      </g>

      {/* 地図を広げて回る旅人 */}
      <g className="jm-lost">
        <rect x="-13" y="-26" width="11" height="26" rx="4" fill="#2b3a48" />
        <rect x="2" y="-26" width="11" height="26" rx="4" fill="#2b3a48" />
        <path d="M-16,-24 q3,-38 16,-38 q13,0 16,38 z" fill="#e05252" />
        <g className="jm-head">
          <circle cx="0" cy="-72" r="14" fill="#f6efe2" />
          <path d="M-14,-74 a14,14 0 0 1 28,0 l-6,-6 -10,3 -12,3 z" fill="#2a1f18" />
          <ellipse cx="-6" cy="-71" rx="2.4" ry="3.4" fill="#2a1f18" />
          <ellipse cx="6" cy="-71" rx="2.4" ry="3.4" fill="#2a1f18" />
          <ellipse cx="0" cy="-62" rx="4" ry="3" fill="#8a3a3a" />
        </g>
        <g className="jm-map">
          <rect x="-30" y="-52" width="60" height="38" rx="2" fill="#ddd3bd" />
          <g stroke="#9aa8b4" strokeWidth="2" fill="none">
            <path d="M-24,-42 L24,-42 M-24,-34 L10,-34 M-24,-26 L18,-26" />
            <path d="M0,-52 L0,-14" strokeWidth="1.5" />
          </g>
          <circle cx="16" cy="-33" r="4" fill="#e05252" />
          <ellipse cx="-32" cy="-30" rx="6" ry="8" fill="#f6efe2" />
          <ellipse cx="32" cy="-30" rx="6" ry="8" fill="#f6efe2" />
        </g>
      </g>

      {/* 冷や汗 */}
      <g fill="#a8cfe4">
        <path className="jm-sweat-a" d="M0,0 q4,6 0,9 q-4,-3 0,-9 z" />
        <path className="jm-sweat-b" d="M0,0 q3,5 0,8 q-3,-3 0,-8 z" />
      </g>

      <style>{`
        .jm-arrow-a {
          transform: translate(138px, 44px);
          transform-box: fill-box;
          transform-origin: center;
          animation: jm-spin-a 3.2s steps(4, end) infinite;
        }
        .jm-arrow-b {
          transform: translate(200px, 44px) rotate(90deg);
          transform-box: fill-box;
          transform-origin: center;
          animation: jm-spin-b 2.4s steps(4, end) infinite;
        }
        .jm-arrow-c {
          transform: translate(262px, 44px) rotate(180deg);
          transform-box: fill-box;
          transform-origin: center;
          animation: jm-spin-c 2.8s steps(4, end) infinite;
        }
        .jm-hand-h {
          transform-box: fill-box;
          transform-origin: 50% 92%;
          animation: jm-tick 9s linear infinite;
        }
        .jm-hand-m {
          transform-box: fill-box;
          transform-origin: 50% 95%;
          animation: jm-tick 1.5s linear infinite;
        }
        .jm-pass-a { transform: translate(70px, 164px); animation: jm-walk-r 6s linear infinite; }
        .jm-pass-b { transform: translate(320px, 160px); animation: jm-walk-l 7s linear infinite; }
        .jm-lost {
          transform: translate(200px, 200px) rotate(0deg);
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jm-turn 4.4s ease-in-out infinite;
        }
        .jm-head {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jm-look 2.2s ease-in-out infinite;
        }
        .jm-map {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jm-shuffle 2.2s ease-in-out infinite;
        }
        .jm-sweat-a { transform: translate(222px, 120px); animation: jm-drip 1.6s ease-in infinite; }
        .jm-sweat-b { transform: translate(178px, 124px); animation: jm-drip-l 1.6s ease-in infinite; animation-delay: -0.8s; }
        @keyframes jm-spin-a {
          from { transform: translate(138px, 44px) rotate(0deg); }
          to { transform: translate(138px, 44px) rotate(360deg); }
        }
        @keyframes jm-spin-b {
          from { transform: translate(200px, 44px) rotate(90deg); }
          to { transform: translate(200px, 44px) rotate(450deg); }
        }
        @keyframes jm-spin-c {
          from { transform: translate(262px, 44px) rotate(180deg); }
          to { transform: translate(262px, 44px) rotate(540deg); }
        }
        @keyframes jm-tick {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes jm-walk-r {
          0% { transform: translate(-30px, 164px); opacity: 0; }
          12%, 88% { opacity: 1; }
          100% { transform: translate(160px, 164px); opacity: 0; }
        }
        @keyframes jm-walk-l {
          0% { transform: translate(430px, 160px); opacity: 0; }
          12%, 88% { opacity: 1; }
          100% { transform: translate(250px, 160px); opacity: 0; }
        }
        @keyframes jm-turn {
          0%, 100% { transform: translate(200px, 200px) rotate(-9deg); }
          50% { transform: translate(200px, 200px) rotate(9deg); }
        }
        @keyframes jm-look {
          0%, 100% { transform: rotate(-8deg) translate(-3px, 0); }
          50% { transform: rotate(8deg) translate(3px, 0); }
        }
        @keyframes jm-shuffle {
          0%, 100% { transform: rotate(3deg) translate(2px, 0); }
          50% { transform: rotate(-3deg) translate(-2px, 0); }
        }
        @keyframes jm-drip {
          0% { transform: translate(222px, 116px) scale(0.5); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(238px, 152px) scale(1); opacity: 0; }
        }
        @keyframes jm-drip-l {
          0% { transform: translate(178px, 120px) scale(0.5); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(162px, 156px) scale(1); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jm-arrow-a, .jm-arrow-b, .jm-arrow-c, .jm-hand-h, .jm-hand-m,
          .jm-pass-a, .jm-pass-b, .jm-lost, .jm-head, .jm-map,
          .jm-sweat-a, .jm-sweat-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
