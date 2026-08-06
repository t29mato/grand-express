/**
 * 黄色い旗。船は接岸を許されず、沖に錨を下ろしたまま日数を数える。
 *
 * 港の灯りは見えているのに、湾口には鎖が渡されていて入れない。
 * 医師の小舟が近づいてくる。上陸できるのは、その先である。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function WorldQuarantine() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の空と海 */}
      <rect width="400" height="210" fill="#16324f" />
      <rect width="400" height="96" fill="#101f33" />
      <circle cx="52" cy="34" r="17" fill="#e8e2c8" opacity="0.8" />
      <circle cx="45" cy="30" r="15" fill="#101f33" />

      {/* 遠い港町 */}
      <g fill="#1c2f42">
        <rect x="0" y="76" width="150" height="24" />
        <rect x="18" y="62" width="26" height="18" />
        <rect x="66" y="56" width="20" height="24" />
        <rect x="110" y="66" width="24" height="14" />
      </g>
      <g fill="#f5b31c" opacity="0.75">
        <rect className="wqu-lamp-a" x="24" y="68" width="5" height="6" />
        <rect className="wqu-lamp-b" x="72" y="64" width="5" height="6" />
        <rect className="wqu-lamp-c" x="116" y="70" width="5" height="6" />
        <rect x="42" y="84" width="5" height="6" />
        <rect x="92" y="84" width="5" height="6" />
      </g>

      {/* 海面 */}
      <rect y="100" width="400" height="110" fill="#16324f" />
      <g fill="#1e4266">
        <rect
          className="wqu-wave-a"
          x="0"
          y="132"
          width="150"
          height="5"
          rx="2.5"
        />
        <rect
          className="wqu-wave-b"
          x="180"
          y="152"
          width="180"
          height="5"
          rx="2.5"
        />
        <rect
          className="wqu-wave-c"
          x="40"
          y="176"
          width="200"
          height="6"
          rx="3"
        />
        <rect
          className="wqu-wave-d"
          x="240"
          y="196"
          width="150"
          height="5"
          rx="2.5"
        />
      </g>

      {/* 湾口を塞ぐ鎖(これより内には入れない) */}
      <g fill="#5b6673">
        <rect x="0" y="100" width="16" height="20" rx="4" />
        <rect x="152" y="98" width="16" height="22" rx="4" />
      </g>
      <g className="wqu-boom" stroke="#8d949c" strokeWidth="5" fill="none">
        <path d="M10,108 q76,20 150,-2" />
      </g>
      <g fill="#a5acb4">
        <circle cx="46" cy="116" r="6" />
        <circle cx="84" cy="119" r="6" />
        <circle cx="122" cy="115" r="6" />
      </g>

      {/* 沖に停められた船 */}
      <g transform="translate(268,146)">
        <g className="wqu-ship">
          {/* 帆柱と黄色い旗 */}
          <rect x="-3" y="-92" width="6" height="72" fill="#8d7d5c" />
          <g className="wqu-flag">
            <path d="M3,-90 q18,7 36,0 l0,22 q-18,7 -36,0z" fill="#f5d033" />
          </g>
          <rect x="-30" y="-42" width="60" height="22" rx="4" fill="#d8d2c4" />
          <g fill="#2a3a4a">
            <rect x="-22" y="-36" width="12" height="10" rx="2" />
            <rect x="-4" y="-36" width="12" height="10" rx="2" />
            <rect x="14" y="-36" width="12" height="10" rx="2" />
          </g>
          <rect x="8" y="-62" width="14" height="22" rx="3" fill="#c04434" />
          <rect x="8" y="-62" width="14" height="6" rx="3" fill="#8d3227" />
          {/* 船体 */}
          <path d="M-84,-20 l168,0 l-18,32 -132,0z" fill="#2f4a5f" />
          <rect x="-84" y="-20" width="168" height="7" fill="#3d5d76" />
          <g fill="#f5b31c" opacity="0.7">
            <circle cx="-56" cy="-6" r="4" />
            <circle cx="-24" cy="-6" r="4" />
            <circle cx="8" cy="-6" r="4" />
            <circle cx="40" cy="-6" r="4" />
          </g>
        </g>
      </g>
      {/* 錨鎖 */}
      <g className="wqu-chain" stroke="#4a5866" strokeWidth="4" fill="none">
        <path d="M186,132 q-10,26 -22,48" />
      </g>

      {/* 医師の小舟 */}
      <g transform="translate(120,182)">
        <g className="wqu-launch">
          <path d="M-30,-6 l60,0 l-8,14 -44,0z" fill="#3a4a5b" />
          <rect x="-30" y="-9" width="60" height="5" rx="2" fill="#4d5f72" />
          <circle cx="-6" cy="-19" r="8" fill="#e8dfd0" />
          <rect x="-14" y="-13" width="17" height="8" rx="3" fill="#e8dfd0" />
          <rect x="10" y="-22" width="5" height="16" fill="#6b7480" />
          <path d="M13,-22 q10,4 20,0 l0,10 q-10,4 -20,0z" fill="#f5d033" />
        </g>
      </g>

      <style>{`
        .wqu-ship { transform-box: fill-box; transform-origin: 50% 100%; animation: wqu-roll 5.6s ease-in-out infinite; }
        .wqu-flag { transform-box: fill-box; transform-origin: left center; animation: wqu-fly 2.4s ease-in-out infinite; }
        .wqu-boom { transform-box: fill-box; transform-origin: center; animation: wqu-slack 5s ease-in-out infinite; }
        .wqu-chain { transform-box: fill-box; transform-origin: top center; animation: wqu-taut 5.6s ease-in-out infinite; }
        .wqu-launch { transform-box: fill-box; transform-origin: 50% 100%; animation: wqu-row 7s ease-in-out infinite; }
        .wqu-wave-a { transform-box: fill-box; transform-origin: center; animation: wqu-drift 6s linear infinite; }
        .wqu-wave-b { transform-box: fill-box; transform-origin: center; animation: wqu-drift 7.5s linear infinite; animation-delay: -2s; }
        .wqu-wave-c { transform-box: fill-box; transform-origin: center; animation: wqu-drift 5.5s linear infinite; animation-delay: -3.4s; }
        .wqu-wave-d { transform-box: fill-box; transform-origin: center; animation: wqu-drift 8s linear infinite; animation-delay: -1.2s; }
        .wqu-lamp-a { animation: wqu-glow 3.2s ease-in-out infinite; }
        .wqu-lamp-b { animation: wqu-glow 4s ease-in-out infinite; animation-delay: -1.4s; }
        .wqu-lamp-c { animation: wqu-glow 3.6s ease-in-out infinite; animation-delay: -2.2s; }
        @keyframes wqu-roll {
          0%, 100% { transform: rotate(-1.6deg) translate(0, 0); }
          50% { transform: rotate(1.6deg) translate(0, -3px); }
        }
        @keyframes wqu-fly {
          0%, 100% { transform: skewY(-4deg) scaleX(0.94); }
          50% { transform: skewY(4deg) scaleX(1); }
        }
        @keyframes wqu-slack {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, 3px); }
        }
        @keyframes wqu-taut {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes wqu-row {
          0%, 100% { transform: translate(0, 0) rotate(-2deg); }
          50% { transform: translate(26px, -6px) rotate(2deg); }
        }
        @keyframes wqu-drift {
          0% { transform: translate(-30px, 0); opacity: 0.35; }
          50% { opacity: 0.9; }
          100% { transform: translate(30px, 0); opacity: 0.35; }
        }
        @keyframes wqu-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wqu-ship, .wqu-flag, .wqu-boom, .wqu-chain, .wqu-launch,
          .wqu-wave-a, .wqu-wave-b, .wqu-wave-c, .wqu-wave-d,
          .wqu-lamp-a, .wqu-lamp-b, .wqu-lamp-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
