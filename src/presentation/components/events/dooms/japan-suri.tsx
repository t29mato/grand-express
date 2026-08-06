/**
 * 人混みのスリ。
 *
 * 乗り換えのラッシュ。四方から押されているあいだに、自分のものではない手が
 * 内ポケットを探り当て、財布だけが人波の向こうへ消える。
 */
export function JapanSuri() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 乗り換え通路 */}
      <rect width="400" height="210" fill="#26343f" />
      <rect width="400" height="16" fill="#1a2530" />
      <rect x="60" y="16" width="280" height="5" fill="#4a5f70" opacity="0.6" />

      {/* 奥の人波 */}
      <g fill="#1b2733">
        <g className="jsuri-back-a">
          <circle cx="26" cy="74" r="15" />
          <path d="M2,140 q2,-50 24,-50 q22,0 24,50 z" />
        </g>
        <g className="jsuri-back-b">
          <circle cx="78" cy="80" r="14" />
          <path d="M56,140 q2,-46 22,-46 q20,0 22,46 z" />
        </g>
        <g className="jsuri-back-c">
          <circle cx="128" cy="72" r="15" />
          <path d="M104,140 q2,-52 24,-52 q22,0 24,52 z" />
        </g>
        <g className="jsuri-back-d">
          <circle cx="268" cy="76" r="15" />
          <path d="M244,140 q2,-50 24,-50 q22,0 24,50 z" />
        </g>
        <g className="jsuri-back-e">
          <circle cx="320" cy="70" r="14" />
          <path d="M298,140 q2,-52 22,-52 q20,0 22,52 z" />
        </g>
        <g className="jsuri-back-f">
          <circle cx="370" cy="78" r="15" />
          <path d="M346,140 q2,-48 24,-48 q22,0 24,48 z" />
        </g>
      </g>

      {/* 押されている旅人 */}
      <g className="jsuri-victim">
        <rect x="150" y="98" width="94" height="112" rx="20" fill="#3f6b8a" />
        <path d="M178,98 L197,136 L216,98 z" fill="#eef3f7" />
        <path d="M178,98 L197,136 L184,98 z" fill="#35597a" />
        <path d="M216,98 L197,136 L210,98 z" fill="#35597a" />
        <circle cx="197" cy="64" r="23" fill="#f6efe2" />
        <path d="M174,62 a23,23 0 0 1 46,0 l-9,-9 -16,4 -21,5 z" fill="#2a1f18" />
        <g fill="#2a1f18">
          <ellipse cx="188" cy="64" rx="3" ry="4" />
          <ellipse cx="206" cy="64" rx="3" ry="4" />
          <rect x="188" y="76" width="18" height="3" rx="1.5" />
        </g>
        {/* 内ポケット */}
        <rect x="157" y="116" width="30" height="34" rx="3" fill="#35597a" />
        <path className="jsuri-flap" d="M157,116 h30 v9 h-30 z" fill="#2c4a68" />
      </g>

      {/* 内ポケットを探る手 */}
      <g className="jsuri-arm">
        <rect x="60" y="122" width="112" height="17" rx="8.5" fill="#3b2f4a" />
        <ellipse cx="172" cy="130" rx="14" ry="12" fill="#d8a878" />
        <g className="jsuri-wallet">
          <rect x="152" y="120" width="26" height="19" rx="2" fill="#8a4a2a" />
          <rect x="157" y="116" width="11" height="7" rx="1" fill="#f5b31c" />
        </g>
      </g>

      {/* こぼれた硬貨 */}
      <g>
        <g className="jsuri-coin-a">
          <circle r="6" fill="#f5b31c" />
          <circle r="2.6" fill="#c98a12" />
        </g>
        <g className="jsuri-coin-b">
          <circle r="5" fill="#f5b31c" />
          <circle r="2.2" fill="#c98a12" />
        </g>
      </g>

      {/* 手前で押し合う人 */}
      <g fill="#131c26">
        <g className="jsuri-front-a">
          <circle cx="66" cy="104" r="27" />
          <path d="M18,210 q4,-78 48,-78 q44,0 48,78 z" />
        </g>
        <g className="jsuri-front-b">
          <circle cx="330" cy="98" r="28" />
          <path d="M280,210 q4,-80 50,-80 q46,0 50,80 z" />
        </g>
      </g>

      <style>{`
        .jsuri-back-a { animation: jsuri-shuffle 2.6s ease-in-out infinite; }
        .jsuri-back-b { animation: jsuri-shuffle 3s ease-in-out infinite; animation-delay: -0.4s; }
        .jsuri-back-c { animation: jsuri-shuffle 2.2s ease-in-out infinite; animation-delay: -0.9s; }
        .jsuri-back-d { animation: jsuri-shuffle 2.8s ease-in-out infinite; animation-delay: -1.3s; }
        .jsuri-back-e { animation: jsuri-shuffle 2.4s ease-in-out infinite; animation-delay: -1.8s; }
        .jsuri-back-f { animation: jsuri-shuffle 3.2s ease-in-out infinite; animation-delay: -2.2s; }
        .jsuri-front-a { animation: jsuri-press 3.4s ease-in-out infinite; }
        .jsuri-front-b { animation: jsuri-press 3.4s ease-in-out infinite reverse; }
        .jsuri-victim { animation: jsuri-squeeze 3.4s ease-in-out infinite; }
        .jsuri-flap {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: jsuri-lift 3.6s ease-in-out infinite;
        }
        .jsuri-arm { transform: translate(0, 0); animation: jsuri-reach 3.6s ease-in-out infinite; }
        .jsuri-wallet { animation: jsuri-take 3.6s steps(1, end) infinite; }
        .jsuri-coin-a { transform: translate(172px, 152px); animation: jsuri-drop 3.6s ease-in infinite; }
        .jsuri-coin-b { transform: translate(164px, 158px); animation: jsuri-drop 3.6s ease-in infinite; animation-delay: -0.35s; }
        @keyframes jsuri-shuffle {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(4px, -2px); }
        }
        @keyframes jsuri-press {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(9px, -3px); }
        }
        @keyframes jsuri-squeeze {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-4px, 2px); }
        }
        @keyframes jsuri-lift {
          0%, 16% { transform: rotate(0deg); }
          30%, 72% { transform: rotate(-34deg); }
          88%, 100% { transform: rotate(0deg); }
        }
        @keyframes jsuri-reach {
          0% { transform: translate(-96px, 0); }
          26%, 54% { transform: translate(0, 0); }
          92%, 100% { transform: translate(-104px, -10px); }
        }
        @keyframes jsuri-take {
          0%, 55% { opacity: 0; }
          56%, 100% { opacity: 1; }
        }
        @keyframes jsuri-drop {
          0%, 58% { transform: translate(172px, 148px); opacity: 0; }
          62% { opacity: 1; }
          100% { transform: translate(160px, 206px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jsuri-back-a, .jsuri-back-b, .jsuri-back-c, .jsuri-back-d, .jsuri-back-e,
          .jsuri-back-f, .jsuri-front-a, .jsuri-front-b, .jsuri-victim, .jsuri-flap,
          .jsuri-arm, .jsuri-wallet, .jsuri-coin-a, .jsuri-coin-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
