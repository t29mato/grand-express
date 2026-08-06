/**
 * 台風上陸。
 *
 * 駅前の時刻表が一斉に赤く染まり、商店のシャッターが下りる。
 * 電車は止まったまま、傘も看板も風に持っていかれる。
 */
export function JapanTyphoon() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空 */}
      <rect width="400" height="210" fill="#1b2b3d" />
      <g fill="#132030">
        <ellipse className="jtyp-cloud-a" cx="70" cy="20" rx="96" ry="26" />
        <ellipse className="jtyp-cloud-b" cx="230" cy="12" rx="112" ry="28" />
        <ellipse className="jtyp-cloud-c" cx="376" cy="26" rx="88" ry="24" />
      </g>

      {/* 濡れた路面 */}
      <rect y="166" width="400" height="44" fill="#2c3f4c" />
      <rect y="166" width="400" height="3" fill="#3d5666" />

      {/* 止まったままの電車 */}
      <g>
        <rect x="246" y="96" width="154" height="60" rx="8" fill="#cfd7de" />
        <rect x="246" y="112" width="154" height="9" fill="#e05252" />
        <g fill="#22384c">
          <rect x="258" y="126" width="26" height="20" rx="3" />
          <rect x="292" y="126" width="26" height="20" rx="3" />
          <rect x="326" y="126" width="26" height="20" rx="3" />
          <rect x="360" y="126" width="26" height="20" rx="3" />
        </g>
        <rect x="246" y="152" width="154" height="6" fill="#8f9aa4" />
        <circle cx="278" cy="162" r="7" fill="#1a2530" />
        <circle cx="330" cy="162" r="7" fill="#1a2530" />
        <circle cx="382" cy="162" r="7" fill="#1a2530" />
        <rect y="168" width="400" height="4" fill="#4a5c69" />
      </g>

      {/* 停止を告げる赤信号 */}
      <g>
        <rect x="232" y="104" width="6" height="64" fill="#3d4c58" />
        <rect x="222" y="82" width="26" height="26" rx="5" fill="#1a2530" />
        <circle className="jtyp-signal" cx="235" cy="95" r="8" fill="#e05252" />
      </g>

      {/* 商店 ― 一斉に赤くなった時刻表と下りるシャッター */}
      <g>
        <rect x="4" y="72" width="120" height="96" fill="#243546" />
        <rect x="10" y="78" width="108" height="34" rx="3" fill="#101a26" />
        <g fill="#e05252">
          <rect className="jtyp-row-a" x="16" y="83" width="70" height="5" rx="2" />
          <rect className="jtyp-row-b" x="16" y="92" width="86" height="5" rx="2" />
          <rect className="jtyp-row-c" x="16" y="101" width="60" height="5" rx="2" />
        </g>
        <rect x="92" y="83" width="20" height="23" rx="2" fill="#e05252" opacity="0.55" />
        <g className="jtyp-shutter">
          <rect x="12" y="116" width="104" height="52" fill="#7f8b96" />
          <g fill="#63707c">
            <rect x="12" y="124" width="104" height="3" />
            <rect x="12" y="134" width="104" height="3" />
            <rect x="12" y="144" width="104" height="3" />
            <rect x="12" y="154" width="104" height="3" />
          </g>
          <rect x="12" y="164" width="104" height="4" fill="#4d5862" />
        </g>
      </g>

      {/* 風に踏ん張る旅人と裏返った傘 */}
      <g className="jtyp-walker">
        {/* 裏返った傘 */}
        <g className="jtyp-brolly">
          <path d="M-27,-118 Q0,-80 27,-118 Q0,-100 -27,-118 z" fill="#e05252" />
          <g stroke="#8f2f2f" strokeWidth="2" fill="none">
            <path d="M-27,-118 L0,-92 L27,-118" />
            <path d="M-14,-110 L0,-92 M14,-110 L0,-92" />
          </g>
          <rect x="12" y="-96" width="4" height="24" rx="2" fill="#3b2f2a" transform="rotate(14 14 -96)" />
        </g>
        {/* 旅人 */}
        <rect x="-14" y="-22" width="11" height="23" rx="5" fill="#2b3a48" />
        <rect x="3" y="-22" width="11" height="23" rx="5" fill="#2b3a48" />
        <path d="M-13,-52 L13,-52 L16,-19 L-16,-19 z" fill="#3f6b8a" />
        <circle cx="0" cy="-64" r="13" fill="#f6efe2" />
        <path d="M-13,-66 a13,13 0 0 1 26,0 l-5,-6 -8,3 -13,3 z" fill="#2a1f18" />
        <g className="jtyp-arm">
          <rect x="10" y="-80" width="9" height="31" rx="4.5" fill="#3f6b8a" />
          <circle cx="14.5" cy="-80" r="5.5" fill="#f6efe2" />
        </g>
      </g>

      {/* 風に飛ばされていくもの */}
      <g className="jtyp-fly-brolly">
        <path d="M-14,0 Q0,16 14,0 Q0,6 -14,0 z" fill="#5b8fe8" />
        <rect x="-1.5" y="4" width="3" height="16" rx="1.5" fill="#3b2f2a" />
      </g>
      <g className="jtyp-fly-leaf" fill="#3f6b4a">
        <ellipse rx="7" ry="4" />
      </g>
      <g className="jtyp-fly-sheet">
        <path d="M0,0 q10,-8 20,0 q-10,10 -20,0 z" fill="#8fa2b0" opacity="0.7" />
      </g>

      {/* 吹き付ける風 */}
      <g stroke="#a8cfe4" fill="none" strokeLinecap="round" opacity="0.35">
        <path className="jtyp-gust-a" d="M0,52 q40,-8 80,0" strokeWidth="3" />
        <path className="jtyp-gust-b" d="M0,124 q46,-10 92,0" strokeWidth="3" />
        <path className="jtyp-gust-c" d="M0,88 q34,8 68,0" strokeWidth="2" />
      </g>

      {/* 横殴りの雨 */}
      <g stroke="#a8cfe4" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5">
        <path className="jtyp-rain-a" d="M40,0 l-20,26" />
        <path className="jtyp-rain-b" d="M96,0 l-20,26" />
        <path className="jtyp-rain-c" d="M152,0 l-20,26" />
        <path className="jtyp-rain-d" d="M208,0 l-20,26" />
        <path className="jtyp-rain-e" d="M264,0 l-20,26" />
        <path className="jtyp-rain-f" d="M320,0 l-20,26" />
        <path className="jtyp-rain-g" d="M376,0 l-20,26" />
        <path className="jtyp-rain-h" d="M68,0 l-20,26" />
        <path className="jtyp-rain-i" d="M180,0 l-20,26" />
        <path className="jtyp-rain-j" d="M292,0 l-20,26" />
      </g>

      <style>{`
        .jtyp-cloud-a { animation: jtyp-drift 9s linear infinite; }
        .jtyp-cloud-b { animation: jtyp-drift 7s linear infinite; animation-delay: -3s; }
        .jtyp-cloud-c { animation: jtyp-drift 11s linear infinite; animation-delay: -5s; }
        .jtyp-signal { animation: jtyp-blink 1.1s steps(1, end) infinite; }
        .jtyp-row-a { animation: jtyp-blink 1.4s steps(1, end) infinite; }
        .jtyp-row-b { animation: jtyp-blink 1.4s steps(1, end) infinite; animation-delay: -0.5s; }
        .jtyp-row-c { animation: jtyp-blink 1.4s steps(1, end) infinite; animation-delay: -0.9s; }
        .jtyp-shutter {
          transform-box: fill-box;
          transform-origin: top center;
          animation: jtyp-close 4.2s ease-in-out infinite;
        }
        .jtyp-walker {
          transform: translate(172px, 196px) rotate(-12deg);
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jtyp-brace 1.8s ease-in-out infinite;
        }
        .jtyp-brolly {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jtyp-flip 1.8s ease-in-out infinite;
        }
        .jtyp-arm {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jtyp-tug 1.8s ease-in-out infinite;
        }
        .jtyp-fly-brolly {
          transform: translate(300px, 46px);
          transform-box: fill-box;
          transform-origin: center;
          animation: jtyp-blow 3.4s linear infinite;
        }
        .jtyp-fly-leaf {
          transform: translate(300px, 70px);
          transform-box: fill-box;
          transform-origin: center;
          animation: jtyp-blow-leaf 2.6s linear infinite;
        }
        .jtyp-fly-sheet {
          transform: translate(300px, 30px);
          transform-box: fill-box;
          transform-origin: center;
          animation: jtyp-blow-sheet 3s linear infinite;
        }
        .jtyp-gust-a { animation: jtyp-sweep 2.2s linear infinite; }
        .jtyp-gust-b { animation: jtyp-sweep 2.8s linear infinite; animation-delay: -1s; }
        .jtyp-gust-c { animation: jtyp-sweep 2.5s linear infinite; animation-delay: -1.6s; }
        .jtyp-rain-a { animation: jtyp-fall 0.62s linear infinite; }
        .jtyp-rain-b { animation: jtyp-fall 0.74s linear infinite; animation-delay: -0.2s; }
        .jtyp-rain-c { animation: jtyp-fall 0.58s linear infinite; animation-delay: -0.4s; }
        .jtyp-rain-d { animation: jtyp-fall 0.7s linear infinite; animation-delay: -0.1s; }
        .jtyp-rain-e { animation: jtyp-fall 0.66s linear infinite; animation-delay: -0.5s; }
        .jtyp-rain-f { animation: jtyp-fall 0.78s linear infinite; animation-delay: -0.3s; }
        .jtyp-rain-g { animation: jtyp-fall 0.6s linear infinite; animation-delay: -0.45s; }
        .jtyp-rain-h { animation: jtyp-fall 0.72s linear infinite; animation-delay: -0.25s; }
        .jtyp-rain-i { animation: jtyp-fall 0.64s linear infinite; animation-delay: -0.55s; }
        .jtyp-rain-j { animation: jtyp-fall 0.68s linear infinite; animation-delay: -0.35s; }
        @keyframes jtyp-drift {
          from { transform: translate(60px, 0); }
          to { transform: translate(-120px, 0); }
        }
        @keyframes jtyp-blink {
          0%, 62% { opacity: 1; }
          63%, 100% { opacity: 0.25; }
        }
        @keyframes jtyp-close {
          0%, 12% { transform: scaleY(0.12); }
          58%, 100% { transform: scaleY(1); }
        }
        @keyframes jtyp-brace {
          0%, 100% { transform: translate(172px, 196px) rotate(-12deg); }
          50% { transform: translate(166px, 196px) rotate(-21deg); }
        }
        @keyframes jtyp-flip {
          0%, 100% { transform: rotate(-4deg) scale(1, 1); }
          50% { transform: rotate(9deg) scale(1.08, 1.14); }
        }
        @keyframes jtyp-tug {
          0%, 100% { transform: rotate(6deg); }
          50% { transform: rotate(-10deg); }
        }
        @keyframes jtyp-blow {
          0% { transform: translate(410px, 60px) rotate(0deg); opacity: 0; }
          12%, 80% { opacity: 1; }
          100% { transform: translate(-40px, 6px) rotate(-420deg); opacity: 0; }
        }
        @keyframes jtyp-blow-leaf {
          0% { transform: translate(420px, 78px) rotate(0deg); opacity: 0; }
          14%, 82% { opacity: 1; }
          100% { transform: translate(-30px, 30px) rotate(-540deg); opacity: 0; }
        }
        @keyframes jtyp-blow-sheet {
          0% { transform: translate(410px, 26px) rotate(10deg); opacity: 0; }
          16%, 78% { opacity: 1; }
          100% { transform: translate(-40px, 62px) rotate(-320deg); opacity: 0; }
        }
        @keyframes jtyp-sweep {
          0% { transform: translate(400px, 0); opacity: 0; }
          20%, 70% { opacity: 0.45; }
          100% { transform: translate(-120px, 0); opacity: 0; }
        }
        @keyframes jtyp-fall {
          0% { transform: translate(30px, -40px); opacity: 0; }
          14%, 82% { opacity: 0.6; }
          100% { transform: translate(-120px, 170px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jtyp-cloud-a, .jtyp-cloud-b, .jtyp-cloud-c, .jtyp-signal,
          .jtyp-row-a, .jtyp-row-b, .jtyp-row-c, .jtyp-shutter,
          .jtyp-walker, .jtyp-brolly, .jtyp-arm,
          .jtyp-fly-brolly, .jtyp-fly-leaf, .jtyp-fly-sheet,
          .jtyp-gust-a, .jtyp-gust-b, .jtyp-gust-c,
          .jtyp-rain-a, .jtyp-rain-b, .jtyp-rain-c, .jtyp-rain-d, .jtyp-rain-e,
          .jtyp-rain-f, .jtyp-rain-g, .jtyp-rain-h, .jtyp-rain-i, .jtyp-rain-j { animation: none; }
        }
      `}</style>
    </svg>
  );
}
