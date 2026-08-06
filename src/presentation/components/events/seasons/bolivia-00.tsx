/**
 * 4月 — 雨季の終わり(ボリビア)。
 *
 * 雨雲は左へ退き、最後の数滴を落としながら消えていく。
 * 谷には虹がかかり、段々畑ではジャガイモとトウモロコシの収穫。
 * 乾いた道をバスが時間どおりに走る。
 */
export function Bolivia00() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 晴れてきた空 */}
      <rect width="400" height="210" fill="#7fb8e0" />

      {/* 虹 */}
      <g fill="none" strokeWidth="6" strokeLinecap="butt">
        <path d="M100,130 A100,100 0 0 1 300,130" stroke="#e8443f" opacity="0.85" />
        <path d="M106,130 A94,94 0 0 1 294,130" stroke="#ef8a2f" opacity="0.85" />
        <path d="M112,130 A88,88 0 0 1 288,130" stroke="#f5d21c" opacity="0.85" />
        <path d="M118,130 A82,82 0 0 1 282,130" stroke="#4f9e4a" opacity="0.85" />
        <path d="M124,130 A76,76 0 0 1 276,130" stroke="#5b8fe8" opacity="0.85" />
      </g>

      {/* 顔を出した太陽 */}
      <g className="b00-ray">
        <g fill="#f7c94a">
          <rect x="344" y="0" width="8" height="14" rx="4" />
          <rect x="344" y="50" width="8" height="14" rx="4" />
          <rect x="316" y="28" width="14" height="8" rx="4" />
          <rect x="366" y="28" width="14" height="8" rx="4" />
          <rect x="324" y="8" width="8" height="14" rx="4" transform="rotate(-45 328 15)" />
          <rect x="364" y="8" width="8" height="14" rx="4" transform="rotate(45 368 15)" />
          <rect x="324" y="42" width="8" height="14" rx="4" transform="rotate(45 328 49)" />
          <rect x="364" y="42" width="8" height="14" rx="4" transform="rotate(-45 368 49)" />
        </g>
      </g>
      <circle cx="348" cy="32" r="21" fill="#f5b31c" />

      {/* 去っていく雨雲と、最後の数滴 */}
      <g className="b00-cloud">
        <g fill="#66748a">
          <ellipse cx="52" cy="30" rx="42" ry="16" />
          <ellipse cx="30" cy="22" rx="24" ry="14" />
          <ellipse cx="76" cy="22" rx="26" ry="13" />
        </g>
        <g fill="#8b97a8">
          <ellipse cx="40" cy="20" rx="20" ry="10" />
        </g>
      </g>
      <g fill="#9fc8e4">
        <rect className="b00-drop b00-drop-a" x="-2" y="-7" width="4" height="14" rx="2" />
        <rect className="b00-drop b00-drop-b" x="-2" y="-6" width="3.4" height="12" rx="1.7" />
        <rect className="b00-drop b00-drop-c" x="-2" y="-7" width="4" height="14" rx="2" />
      </g>

      {/* アンデスの峰 */}
      <path d="M0,120 L48,58 L104,120 Z" fill="#6d88a6" />
      <path d="M48,58 L64,78 L32,78 Z" fill="#eaf2fa" />
      <path d="M70,120 L146,44 L222,120 Z" fill="#5d789a" />
      <path d="M146,44 L168,70 L124,70 Z" fill="#eaf2fa" />
      <path d="M190,120 L258,62 L326,120 Z" fill="#6d88a6" />
      <path d="M258,62 L274,80 L242,80 Z" fill="#eaf2fa" />
      <path d="M300,120 L364,72 L400,120 Z" fill="#5d789a" />

      {/* 段々畑 */}
      <rect y="118" width="400" height="10" fill="#5f9450" />
      <rect y="126" width="400" height="4" fill="#8a6b40" />
      <rect y="129" width="400" height="10" fill="#6ba459" />
      <rect y="137" width="400" height="4" fill="#8a6b40" />
      <rect y="140" width="400" height="9" fill="#5f9450" />
      <g fill="#3f7a38">
        <circle cx="26" cy="122" r="4" />
        <circle cx="64" cy="121" r="3.4" />
        <circle cx="112" cy="123" r="4" />
        <circle cx="168" cy="121" r="3.6" />
        <circle cx="224" cy="123" r="4" />
        <circle cx="286" cy="122" r="3.6" />
        <circle cx="344" cy="123" r="4" />
        <circle cx="44" cy="133" r="4" />
        <circle cx="98" cy="134" r="3.6" />
        <circle cx="152" cy="133" r="4" />
        <circle cx="208" cy="134" r="3.6" />
        <circle cx="266" cy="133" r="4" />
        <circle cx="322" cy="134" r="3.6" />
        <circle cx="376" cy="133" r="4" />
      </g>

      {/* 乾いた道 */}
      <rect y="147" width="400" height="24" fill="#c9a877" />
      <rect y="147" width="400" height="3" fill="#a8875a" />
      <g fill="#e3caa0">
        <rect className="b00-dash b00-dash-a" x="0" y="158" width="26" height="4" />
        <rect className="b00-dash b00-dash-b" x="0" y="158" width="26" height="4" />
        <rect className="b00-dash b00-dash-c" x="0" y="158" width="26" height="4" />
      </g>

      {/* 時間どおりに走るバス */}
      <g className="b00-bus">
        <g transform="translate(0,16) scale(0.85)">
        <rect x="0" y="112" width="122" height="46" rx="6" fill="#e8443f" />
        <rect x="0" y="128" width="122" height="7" fill="#f5b31c" />
        <rect x="0" y="106" width="122" height="8" rx="3" fill="#c9a877" />
        <rect x="6" y="102" width="106" height="6" rx="3" fill="#8a6b40" />
        <g fill="#b8dcf0">
          <rect x="8" y="116" width="20" height="12" rx="2" />
          <rect x="34" y="116" width="20" height="12" rx="2" />
          <rect x="60" y="116" width="20" height="12" rx="2" />
          <rect x="90" y="116" width="26" height="14" rx="2" />
        </g>
        <circle cx="118" cy="140" r="4" fill="#f6efe2" />
        <g fill="#2b2436">
          <circle className="b00-wheel b00-wheel-a" cx="26" cy="160" r="11" />
          <circle className="b00-wheel b00-wheel-b" cx="96" cy="160" r="11" />
        </g>
        <g fill="#8f8f9c">
          <circle cx="26" cy="160" r="4.5" />
          <circle cx="96" cy="160" r="4.5" />
        </g>
        </g>
      </g>

      {/* 手前の畑 */}
      <rect y="169" width="400" height="41" fill="#6b5334" />
      <g fill="#7d6340">
        <rect y="176" width="400" height="4" />
        <rect y="190" width="400" height="4" />
        <rect y="204" width="400" height="4" />
      </g>

      {/* 掘り出されたジャガイモと袋 */}
      <path d="M148,206 L146,178 C146,172 176,172 176,178 L174,206 Z" fill="#b59a6e" />
      <path d="M146,178 C146,171 176,171 176,178 C176,183 146,183 146,178 Z" fill="#cbb287" />
      <g fill="#c9a05e">
        <ellipse cx="154" cy="176" rx="7" ry="5" />
        <ellipse cx="167" cy="175" rx="6.5" ry="5" />
        <ellipse cx="160" cy="171" rx="6" ry="4.6" />
      </g>
      <g fill="#c9a05e">
        <ellipse cx="188" cy="200" rx="7" ry="5" />
        <ellipse cx="200" cy="204" rx="6.4" ry="4.6" />
        <ellipse cx="180" cy="207" rx="6" ry="4.4" />
      </g>

      {/* ジャガイモを袋に入れるチョリータ */}
      <g transform="translate(104,204)">
        <ellipse cx="0" cy="2" rx="30" ry="6" fill="#57411f" />
        <path d="M-26,2 L-18,-34 L18,-34 L26,2 Z" fill="#b0384f" />
        <path d="M-24,-8 L24,-8 L25,-2 L-25,-2 Z" fill="#8e2a3e" />
        <rect x="-15" y="-60" width="30" height="28" rx="6" fill="#3b6fa8" />
        <path d="M-16,-58 L-30,-40 L-22,-32 L-13,-46 Z" fill="#4f9e4a" />
        <path d="M-30,-46 L-16,-52 L-14,-44 L-28,-38 Z" fill="#f5b31c" />
        <circle cx="0" cy="-70" r="11" fill="#c98a5e" />
        <path d="M-8,-62 L-12,-38 L-6,-38 L-3,-61 Z" fill="#2b2436" />
        <path d="M8,-62 L12,-38 L6,-38 L3,-61 Z" fill="#2b2436" />
        <path d="M-11,-72 a11,11 0 0 1 22,0 L9,-68 L-9,-68 Z" fill="#2b2436" />
        <rect x="-16" y="-82" width="32" height="4" rx="2" fill="#3a3244" />
        <rect x="-11" y="-92" width="22" height="12" rx="3" fill="#3a3244" />
        <g className="b00-arm">
          <rect x="12" y="-56" width="30" height="8" rx="4" fill="#3b6fa8" />
          <circle cx="42" cy="-52" r="6" fill="#c98a5e" />
        </g>
      </g>
      <g fill="#c9a05e">
        <ellipse className="b00-spud b00-spud-a" cx="0" cy="0" rx="6" ry="4.6" />
        <ellipse className="b00-spud b00-spud-b" cx="0" cy="0" rx="5" ry="4" />
      </g>

      {/* トウモロコシ */}
      <g>
        <g className="b00-stalk b00-stalk-a">
          <rect x="298" y="150" width="5" height="58" fill="#4f8a3c" />
          <path d="M300,166 C282,158 274,146 272,138 C286,142 296,152 300,166 Z" fill="#5f9e46" />
          <path d="M301,180 C318,172 326,160 328,152 C314,156 304,166 301,180 Z" fill="#4f8a3c" />
          <path d="M300,158 L292,148 L296,140 L306,146 Z" fill="#f5b31c" />
        </g>
        <g className="b00-stalk b00-stalk-b">
          <rect x="336" y="146" width="5" height="62" fill="#4f8a3c" />
          <path d="M338,162 C320,154 312,142 310,134 C324,138 334,148 338,162 Z" fill="#4f8a3c" />
          <path d="M339,178 C356,170 364,158 366,150 C352,154 342,164 339,178 Z" fill="#5f9e46" />
          <path d="M339,152 L344,140 L354,144 L348,154 Z" fill="#f5b31c" />
        </g>
        <g className="b00-stalk b00-stalk-c">
          <rect x="372" y="152" width="5" height="56" fill="#4f8a3c" />
          <path d="M374,168 C356,160 348,148 346,140 C360,144 370,154 374,168 Z" fill="#5f9e46" />
          <path d="M375,162 L382,152 L392,158 L384,166 Z" fill="#f5b31c" />
        </g>
      </g>

      <style>{`
        .b00-ray { transform-box: fill-box; transform-origin: 50% 50%; animation: b00-spin 34s linear infinite; }
        .b00-cloud { transform-box: fill-box; transform-origin: 50% 50%; animation: b00-retreat 12s ease-in-out infinite; }
        .b00-drop-a { transform: translate(38px, 60px); animation: b00-rain 2.4s linear infinite; }
        .b00-drop-b { transform: translate(60px, 70px); animation: b00-rain-b 2.8s linear -1.1s infinite; }
        .b00-drop-c { transform: translate(20px, 78px); animation: b00-rain-c 3.2s linear -2s infinite; }
        .b00-dash-a { animation: b00-slide 2.4s linear infinite; }
        .b00-dash-b { animation: b00-slide 2.4s linear -0.8s infinite; }
        .b00-dash-c { animation: b00-slide 2.4s linear -1.6s infinite; }
        .b00-bus { transform: translateX(186px); animation: b00-drive 11s linear infinite; }
        .b00-wheel { transform-box: fill-box; transform-origin: 50% 50%; }
        .b00-arm { transform-box: fill-box; transform-origin: 4% 40%; animation: b00-scoop 2.6s ease-in-out infinite; }
        .b00-spud-a { transform: translate(150px, 168px); animation: b00-drop-in 2.6s ease-in infinite; }
        .b00-spud-b { transform: translate(158px, 160px); animation: b00-drop-in 2.6s ease-in -1.3s infinite; }
        .b00-stalk { transform-box: fill-box; transform-origin: 50% 100%; }
        .b00-stalk-a { animation: b00-sway 4.2s ease-in-out infinite; }
        .b00-stalk-b { animation: b00-sway 4.2s ease-in-out -1.4s infinite; }
        .b00-stalk-c { animation: b00-sway 4.2s ease-in-out -2.8s infinite; }
        @keyframes b00-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes b00-retreat {
          0% { transform: translateX(24px); opacity: 0.95; }
          70% { transform: translateX(-24px); opacity: 0.7; }
          100% { transform: translateX(-44px); opacity: 0.45; }
        }
        @keyframes b00-rain {
          0% { transform: translate(38px, 42px); opacity: 0; }
          20% { opacity: 0.9; }
          100% { transform: translate(24px, 116px); opacity: 0; }
        }
        @keyframes b00-rain-b {
          0% { transform: translate(66px, 38px); opacity: 0; }
          20% { opacity: 0.9; }
          100% { transform: translate(50px, 112px); opacity: 0; }
        }
        @keyframes b00-rain-c {
          0% { transform: translate(20px, 44px); opacity: 0; }
          20% { opacity: 0.9; }
          100% { transform: translate(6px, 118px); opacity: 0; }
        }
        @keyframes b00-slide {
          from { transform: translateX(430px); }
          to { transform: translateX(-40px); }
        }
        @keyframes b00-drive {
          from { transform: translateX(-140px); }
          to { transform: translateX(410px); }
        }
        @keyframes b00-scoop {
          0%, 100% { transform: rotate(6deg); }
          45% { transform: rotate(40deg); }
        }
        @keyframes b00-drop-in {
          0% { transform: translate(140px, 186px) scale(0.8); opacity: 0; }
          18% { transform: translate(146px, 176px) scale(1); opacity: 1; }
          60% { transform: translate(158px, 158px) scale(1); opacity: 1; }
          95% { transform: translate(164px, 174px) scale(1); opacity: 1; }
          100% { transform: translate(164px, 176px) scale(1); opacity: 0; }
        }
        @keyframes b00-sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .b00-ray, .b00-cloud, .b00-drop-a, .b00-drop-b, .b00-drop-c,
          .b00-dash-a, .b00-dash-b, .b00-dash-c, .b00-bus,
          .b00-arm, .b00-spud-a, .b00-spud-b,
          .b00-stalk-a, .b00-stalk-b, .b00-stalk-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
