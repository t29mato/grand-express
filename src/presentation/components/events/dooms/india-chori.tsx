/**
 * 荷物に伸びる手。混み合った車内で肩を押しつけられているあいだに、
 * 背嚢の脇ポケットが開けられて軽くなる。
 *
 * 後ろ姿の旅人は前を向いたまま気づかない。ジッパーが引かれ、
 * 財布が抜き出され、硬貨が一枚こぼれる。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function IndiaChori() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 車内 */}
      <rect width="400" height="210" fill="#2a3340" />
      <rect y="0" width="400" height="26" fill="#222a35" />
      <rect y="186" width="400" height="24" fill="#1c242e" />

      {/* 窓の外を流れる灯り */}
      <rect x="18" y="34" width="86" height="58" rx="5" fill="#48586a" />
      <rect x="23" y="39" width="76" height="48" fill="#16232f" />
      <g fill="#f5b31c" opacity="0.75">
        <rect className="ich-lamp-a" x="30" y="52" width="12" height="22" rx="3" />
        <rect className="ich-lamp-b" x="60" y="60" width="10" height="18" rx="3" />
        <rect className="ich-lamp-c" x="84" y="46" width="12" height="24" rx="3" />
      </g>
      <g fill="#48586a">
        <rect x="40" y="34" width="6" height="58" />
        <rect x="60" y="34" width="6" height="58" />
        <rect x="80" y="34" width="6" height="58" />
      </g>

      {/* つかまり棒 */}
      <rect x="128" y="0" width="7" height="210" fill="#3d4a58" />
      <rect x="352" y="0" width="6" height="210" fill="#36424f" />

      {/* 押し合う乗客 */}
      <g fill="#1a222c">
        <g className="ich-crowd-a">
          <circle cx="24" cy="118" r="18" />
          <rect x="-4" y="138" width="58" height="76" rx="16" />
        </g>
        <g className="ich-crowd-b">
          <circle cx="90" cy="128" r="16" />
          <rect x="66" y="146" width="50" height="68" rx="15" />
        </g>
        <g className="ich-crowd-c">
          <circle cx="376" cy="112" r="19" />
          <rect x="348" y="134" width="60" height="80" rx="17" />
        </g>
      </g>

      {/* 肩を押しつけてくる相手 */}
      <g className="ich-press">
        <circle cx="326" cy="96" r="21" fill="#22303c" />
        <path d="M300,120 q26,-10 52,0 l6,92 l-64,0z" fill="#28323f" />
      </g>

      {/* 後ろ姿の旅人 */}
      <g className="ich-victim">
        <path d="M158,132 q46,-22 92,0 l10,80 l-112,0z" fill="#4a6a8a" />
        <rect x="192" y="110" width="24" height="18" fill="#e8cfae" />
        <circle cx="204" cy="94" r="28" fill="#2a1f18" />
        <path d="M180,108 q24,12 48,0 l0,6 -48,0z" fill="#241a12" />
        <ellipse cx="177" cy="98" rx="5" ry="7" fill="#e8cfae" />
        <ellipse cx="231" cy="98" rx="5" ry="7" fill="#e8cfae" />
      </g>

      {/* 背嚢と脇ポケット */}
      <g>
        <rect x="164" y="128" width="84" height="82" rx="16" fill="#8a4a3a" />
        <rect x="164" y="128" width="84" height="24" rx="12" fill="#7a3f30" />
        <rect x="190" y="150" width="32" height="8" rx="4" fill="#6b3527" />
        <rect x="180" y="176" width="52" height="26" rx="6" fill="#7a3f30" />
        <g fill="#c9a877">
          <rect x="168" y="120" width="12" height="20" rx="5" transform="rotate(-16 174 130)" />
          <rect x="232" y="120" width="12" height="20" rx="5" transform="rotate(16 238 130)" />
        </g>
        {/* 脇ポケット */}
        <rect x="246" y="146" width="42" height="52" rx="8" fill="#7a3f30" />
        <rect x="246" y="146" width="42" height="8" rx="4" fill="#6b3527" />
        <rect x="248" y="152" width="38" height="6" rx="3" fill="#3a1e16" />
        <g transform="translate(248,152)">
          <rect className="ich-zip" x="0" y="0" width="38" height="5" rx="2.5" fill="#d8c9a8" />
        </g>
        <g transform="translate(284,154)">
          <rect className="ich-pull" x="-5" y="-4" width="10" height="9" rx="2" fill="#f5b31c" />
        </g>
      </g>

      {/* 伸びてくる手 */}
      <g transform="translate(266,176)">
        <g className="ich-hand">
          <rect x="0" y="-9" width="140" height="19" rx="9" fill="#4a3a5a" />
          <rect x="0" y="-9" width="140" height="6" rx="3" fill="#584568" />
          <ellipse cx="-2" cy="0" rx="14" ry="12" fill="#d8a878" />
          <rect x="-14" y="-4" width="12" height="6" rx="3" fill="#c99a6c" />
        </g>
      </g>

      {/* 抜き出される財布 */}
      <g transform="translate(270,174)">
        <g className="ich-wallet">
          <rect x="-15" y="-11" width="30" height="22" rx="3" fill="#5c3a20" />
          <rect x="-15" y="-11" width="30" height="7" rx="3" fill="#6e4828" />
          <rect x="-6" y="-15" width="13" height="7" rx="2" fill="#f5b31c" />
          <circle cx="8" cy="2" r="4" fill="#c98a12" />
        </g>
      </g>

      {/* こぼれる硬貨 */}
      <g transform="translate(262,178)">
        <g className="ich-coin-a">
          <circle r="7" fill="#f5b31c" />
          <circle r="3" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(288,184)">
        <g className="ich-coin-b">
          <circle r="6" fill="#f5b31c" />
          <circle r="2.5" fill="#c98a12" />
        </g>
      </g>

      <style>{`
        .ich-victim { transform-box: fill-box; transform-origin: 50% 100%; animation: ich-sway 2.6s ease-in-out infinite; }
        .ich-press { transform-box: fill-box; transform-origin: 50% 100%; animation: ich-shove 2.6s ease-in-out infinite; }
        .ich-crowd-a { transform-box: fill-box; transform-origin: 50% 100%; animation: ich-sway 2.9s ease-in-out infinite; animation-delay: -0.4s; }
        .ich-crowd-b { transform-box: fill-box; transform-origin: 50% 100%; animation: ich-sway 2.3s ease-in-out infinite; animation-delay: -0.9s; }
        .ich-crowd-c { transform-box: fill-box; transform-origin: 50% 100%; animation: ich-sway 3.1s ease-in-out infinite; animation-delay: -1.3s; }
        .ich-lamp-a { transform-box: fill-box; transform-origin: center; animation: ich-passby 2.2s linear infinite; }
        .ich-lamp-b { transform-box: fill-box; transform-origin: center; animation: ich-passby 2.2s linear infinite; animation-delay: -0.7s; }
        .ich-lamp-c { transform-box: fill-box; transform-origin: center; animation: ich-passby 2.2s linear infinite; animation-delay: -1.4s; }
        .ich-zip { transform-box: fill-box; transform-origin: right center; animation: ich-unzip 4.8s ease-in-out infinite; }
        .ich-pull { transform-box: fill-box; transform-origin: center; animation: ich-slide 4.8s ease-in-out infinite; }
        .ich-hand { transform-box: fill-box; transform-origin: right center; animation: ich-reach 4.8s ease-in-out infinite; }
        .ich-wallet {
          transform-box: fill-box;
          transform-origin: center;
          transform: translate(8px, -12px) rotate(-8deg);
          animation: ich-lift 4.8s ease-in-out infinite;
        }
        .ich-coin-a {
          transform-box: fill-box;
          transform-origin: center;
          transform: translate(-2px, 12px);
          animation: ich-spill 4.8s ease-in infinite;
        }
        .ich-coin-b {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: ich-spill 4.8s ease-in infinite;
          animation-delay: 0.4s;
        }
        @keyframes ich-sway {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-4px, 0) rotate(-1.4deg); }
        }
        @keyframes ich-shove {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-9px, 0) rotate(-2.5deg); }
        }
        @keyframes ich-passby {
          0% { transform: translate(46px, 0); opacity: 0; }
          25%, 70% { opacity: 0.75; }
          100% { transform: translate(-76px, 0); opacity: 0; }
        }
        @keyframes ich-unzip {
          0%, 14% { transform: scaleX(1); }
          38%, 78% { transform: scaleX(0.12); }
          96%, 100% { transform: scaleX(1); }
        }
        @keyframes ich-slide {
          0%, 14% { transform: translate(0, 0); }
          38%, 78% { transform: translate(-33px, 0); }
          96%, 100% { transform: translate(0, 0); }
        }
        @keyframes ich-reach {
          0% { transform: translate(56px, 0); }
          24%, 58% { transform: translate(-8px, 0); }
          84%, 100% { transform: translate(56px, 0); }
        }
        @keyframes ich-lift {
          0%, 44% { transform: translate(0, 0); opacity: 0; }
          52% { transform: translate(4px, -2px); opacity: 1; }
          72% { transform: translate(38px, -8px) rotate(-10deg); opacity: 1; }
          88%, 100% { transform: translate(78px, -12px) rotate(-16deg); opacity: 0; }
        }
        @keyframes ich-spill {
          0%, 56% { transform: translate(0, 0); opacity: 0; }
          62% { transform: translate(2px, 2px); opacity: 1; }
          86%, 100% { transform: translate(-6px, 34px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ich-victim, .ich-press, .ich-crowd-a, .ich-crowd-b, .ich-crowd-c,
          .ich-lamp-a, .ich-lamp-b, .ich-lamp-c,
          .ich-zip, .ich-pull, .ich-hand, .ich-wallet,
          .ich-coin-a, .ich-coin-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
