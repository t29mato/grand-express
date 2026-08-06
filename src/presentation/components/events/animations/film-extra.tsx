/**
 * 群衆シーンの外国人役として雇われ、その日のうちに現金でもらう。
 *
 * カメラのリールが回り、カチンコが鳴り、照明の帯がエキストラの列を舐める。
 * 列の真ん中で手を振っているのが雇われた旅人で、脇から出演料が跳ね上がる。
 */
export function FilmExtra() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 撮影所のホリゾントと床 */}
      <rect width="400" height="210" fill="#1c2a3a" />
      <rect width="400" height="164" fill="#2b4258" />
      <rect y="164" width="400" height="46" fill="#3d3346" />

      {/* 照明の帯 */}
      <path className="fx-beam" d="M46,24 L64,38 L394,92 L344,206z" fill="#f5e2a8" opacity="0.15" />

      {/* 吊り照明 */}
      <g>
        <rect x="28" y="0" width="5" height="12" fill="#22222a" />
        <rect x="16" y="10" width="28" height="26" rx="3" fill="#2a2a33" />
        <rect x="42" y="4" width="6" height="38" rx="2" fill="#4a4a58" />
        <ellipse cx="46" cy="23" rx="6" ry="12" fill="#f5e2a8" />
      </g>

      {/* 三脚に載った撮影カメラ */}
      <g>
        <path
          d="M100,126 L80,168 M100,126 L100,168 M100,126 L120,168"
          stroke="#191922"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="74" y="98" width="52" height="30" rx="4" fill="#2a2a33" />
        <rect x="126" y="106" width="14" height="13" rx="3" fill="#3a3a46" />
        <circle cx="145" cy="112" r="7" fill="#5b8fe8" />
        <circle cx="145" cy="112" r="3" fill="#1c2a3a" />
        <circle className="fx-rec" cx="81" cy="94" r="3.2" fill="#e8443f" />
        <g transform="translate(88,90)">
          <g className="fx-reel-a">
            <circle r="11" fill="#4a4a58" />
            <circle r="3" fill="#22222a" />
            <circle cx="0" cy="-6.5" r="2.4" fill="#22222a" />
            <circle cx="5.6" cy="3.3" r="2.4" fill="#22222a" />
            <circle cx="-5.6" cy="3.3" r="2.4" fill="#22222a" />
          </g>
        </g>
        <g transform="translate(114,90)">
          <g className="fx-reel-b">
            <circle r="11" fill="#4a4a58" />
            <circle r="3" fill="#22222a" />
            <circle cx="0" cy="-6.5" r="2.4" fill="#22222a" />
            <circle cx="5.6" cy="3.3" r="2.4" fill="#22222a" />
            <circle cx="-5.6" cy="3.3" r="2.4" fill="#22222a" />
          </g>
        </g>
      </g>

      {/* エキストラの列 */}
      <g transform="translate(226,170)">
        <g className="fx-bob-a">
          <rect x="-8" y="-16" width="7" height="16" fill="#2c3444" />
          <rect x="1" y="-16" width="7" height="16" fill="#2c3444" />
          <rect x="-11" y="-44" width="22" height="30" rx="7" fill="#3f7a5a" />
          <circle cx="0" cy="-53" r="9" fill="#c08a5c" />
          <path d="M-9,-56 Q0,-67 9,-56z" fill="#241a13" />
        </g>
      </g>
      <g transform="translate(252,170)">
        <g className="fx-bob-b">
          <rect x="-8" y="-16" width="7" height="16" fill="#2c3444" />
          <rect x="1" y="-16" width="7" height="16" fill="#2c3444" />
          <rect x="-11" y="-44" width="22" height="30" rx="7" fill="#8f5ea8" />
          <circle cx="0" cy="-53" r="9" fill="#c08a5c" />
          <path d="M-9,-56 Q0,-67 9,-56z" fill="#241a13" />
        </g>
      </g>
      <g transform="translate(322,170)">
        <g className="fx-bob-c">
          <rect x="-8" y="-16" width="7" height="16" fill="#2c3444" />
          <rect x="1" y="-16" width="7" height="16" fill="#2c3444" />
          <rect x="-11" y="-44" width="22" height="30" rx="7" fill="#c9a877" />
          <circle cx="0" cy="-53" r="9" fill="#c08a5c" />
          <path d="M-9,-56 Q0,-67 9,-56z" fill="#241a13" />
        </g>
      </g>
      <g transform="translate(352,170)">
        <g className="fx-bob-d">
          <rect x="-8" y="-16" width="7" height="16" fill="#2c3444" />
          <rect x="1" y="-16" width="7" height="16" fill="#2c3444" />
          <rect x="-11" y="-44" width="22" height="30" rx="7" fill="#5b8fe8" />
          <circle cx="0" cy="-53" r="9" fill="#c08a5c" />
          <path d="M-9,-56 Q0,-67 9,-56z" fill="#241a13" />
        </g>
      </g>

      {/* 雇われた旅人(列の手前で手を振っている) */}
      <g transform="translate(288,178)">
        <rect x="-10" y="-16" width="8" height="16" rx="2" fill="#3b2f4a" />
        <rect x="2" y="-16" width="8" height="16" rx="2" fill="#3b2f4a" />
        <rect x="-13" y="-48" width="26" height="34" rx="8" fill="#e8443f" />
        <rect className="fx-wave" x="10" y="-52" width="8" height="30" rx="4" fill="#f6efe2" />
        <circle cx="0" cy="-59" r="11.5" fill="#f6efe2" />
        <path d="M-11,-62 Q0,-75 11,-62z" fill="#8a6a44" />
      </g>

      {/* カチンコ */}
      <g transform="translate(176,178)">
        <rect x="-26" y="-18" width="52" height="34" rx="2" fill="#22222a" />
        <rect x="-20" y="-8" width="40" height="2.5" fill="#e8e2d2" />
        <rect x="-20" y="2" width="40" height="2.5" fill="#e8e2d2" />
        <g className="fx-clap">
          <rect x="-26" y="-28" width="52" height="10" rx="2" fill="#e8e2d2" />
          <g fill="#22222a">
            <polygon points="-18,-28 -11,-28 -15,-18 -22,-18" />
            <polygon points="-4,-28 3,-28 -1,-18 -8,-18" />
            <polygon points="10,-28 17,-28 13,-18 6,-18" />
          </g>
        </g>
      </g>

      {/* その日の出演料 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="fx-coin-a" cx="322" cy="62" r="8" />
        <circle className="fx-coin-b" cx="344" cy="84" r="7" />
        <circle className="fx-coin-c" cx="306" cy="42" r="6" />
      </g>

      <style>{`
        .fx-reel-a { transform-origin: 0px 0px; animation: fx-spin 1.5s linear infinite; }
        .fx-reel-b { transform-origin: 0px 0px; animation: fx-spin 1.5s linear infinite; }
        .fx-rec { animation: fx-blink 1.1s steps(1, end) infinite; }
        .fx-beam { animation: fx-flicker 2.7s ease-in-out infinite; }
        .fx-clap {
          transform: rotate(-20deg);
          transform-origin: -26px -23px;
          animation: fx-snap 2.4s ease-in-out infinite;
        }
        .fx-wave { transform-origin: 14px -48px; animation: fx-hand 1.2s ease-in-out infinite; }
        .fx-bob-a { animation: fx-bob 1.8s ease-in-out infinite; }
        .fx-bob-b { animation: fx-bob 1.8s ease-in-out infinite; animation-delay: -0.4s; }
        .fx-bob-c { animation: fx-bob 1.8s ease-in-out infinite; animation-delay: -0.9s; }
        .fx-bob-d { animation: fx-bob 1.8s ease-in-out infinite; animation-delay: -1.3s; }
        .fx-coin-a { animation: fx-pop 2.4s ease-out infinite; animation-delay: 0.6s; }
        .fx-coin-b { animation: fx-pop 2.4s ease-out infinite; animation-delay: 0.85s; }
        .fx-coin-c { animation: fx-pop 2.4s ease-out infinite; animation-delay: 1.05s; }
        @keyframes fx-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fx-blink {
          0%, 55% { opacity: 1; }
          56%, 100% { opacity: 0.15; }
        }
        @keyframes fx-flicker {
          0%, 100% { opacity: 0.13; }
          50% { opacity: 0.24; }
        }
        @keyframes fx-snap {
          0%, 8% { transform: rotate(-32deg); }
          16% { transform: rotate(0deg); }
          21% { transform: rotate(-6deg); }
          27%, 72% { transform: rotate(0deg); }
          90%, 100% { transform: rotate(-32deg); }
        }
        @keyframes fx-hand {
          0%, 100% { transform: rotate(-18deg); }
          50% { transform: rotate(-52deg); }
        }
        @keyframes fx-bob {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -4px); }
        }
        @keyframes fx-pop {
          0%, 30% { transform: translate(0, 30px); opacity: 0; }
          52% { transform: translate(0, -2px); opacity: 1; }
          82% { transform: translate(0, -10px); opacity: 1; }
          100% { transform: translate(0, -20px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fx-reel-a, .fx-reel-b, .fx-rec, .fx-beam, .fx-clap, .fx-wave,
          .fx-bob-a, .fx-bob-b, .fx-bob-c, .fx-bob-d,
          .fx-coin-a, .fx-coin-b, .fx-coin-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
