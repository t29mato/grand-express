/**
 * 10月。九夜と十日目。
 *
 * 竹を組んだ仮設の堂にドゥルガーが座り、そのわきで人が輪になって
 * 棒を打ち合わせながら回りつづける。灯明は九つ。
 */
export function India06() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 祭りの夜 */}
      <rect width="400" height="210" fill="#2a2350" />
      <g fill="#f5e2a8">
        <circle className="i06-star-a" cx="196" cy="18" r="2" />
        <circle className="i06-star-b" cx="248" cy="34" r="1.6" />
        <circle className="i06-star-c" cx="330" cy="16" r="2" />
        <circle className="i06-star-d" cx="384" cy="42" r="1.6" />
      </g>
      <rect y="170" width="400" height="40" fill="#3d3159" />
      <rect y="170" width="400" height="4" fill="#2f2545" />

      {/* 渡した電飾 */}
      <path d="M0,26 Q200,60 400,20" fill="none" stroke="#4a3d6b" strokeWidth="2.5" />
      <g fill="#f5e2a8">
        <circle className="i06-bulb-a" cx="44" cy="35" r="3.5" />
        <circle className="i06-bulb-b" cx="100" cy="43" r="3.5" />
        <circle className="i06-bulb-c" cx="156" cy="49" r="3.5" />
        <circle className="i06-bulb-d" cx="212" cy="50" r="3.5" />
        <circle className="i06-bulb-e" cx="268" cy="47" r="3.5" />
        <circle className="i06-bulb-f" cx="324" cy="39" r="3.5" />
        <circle className="i06-bulb-g" cx="378" cy="27" r="3.5" />
      </g>

      {/* 組み上げ中の竹 */}
      <g stroke="#c9a877" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M8,172 L24,74" />
        <path d="M34,172 L22,74" />
        <path d="M6,120 L36,116" />
        <path className="i06-pole" d="M14,172 L54,96" />
      </g>

      {/* 仮設の堂(パンダル) */}
      <path d="M46,172 L46,104 Q112,44 178,104 L178,172 z" fill="#f5b31c" />
      <path d="M58,172 L58,110 Q112,58 166,110 L166,172 z" fill="#b5342f" />
      <path d="M112,52 L120,72 L104,72 z" fill="#f5b31c" />
      <circle cx="112" cy="46" r="6" fill="#f5b31c" />
      <g fill="#e8443f">
        <path d="M46,104 L46,172 L58,172 L58,110 z" />
        <path d="M178,104 L178,172 L166,172 L166,110 z" />
      </g>

      {/* ドゥルガー */}
      <circle cx="112" cy="112" r="26" fill="#f5b31c" opacity="0.55" />
      <g className="i06-arms" stroke="#e8c9a0" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M104,128 L74,110" />
        <path d="M104,130 L76,126" />
        <path d="M104,132 L78,142" />
        <path d="M120,128 L150,110" />
        <path d="M120,130 L148,126" />
        <path d="M120,132 L146,142" />
      </g>
      <path d="M112,124 L94,172 L130,172 z" fill="#e8443f" />
      <path d="M112,124 L100,172 L124,172 z" fill="#c93a52" />
      <circle cx="112" cy="112" r="13" fill="#e8c9a0" />
      <path d="M99,110 a13,13 0 0 1 26,0 z" fill="#2a1f2e" />
      <path d="M99,110 l-4,14 4,2 z" fill="#2a1f2e" />
      <path d="M125,110 l4,14 -4,2 z" fill="#2a1f2e" />
      <circle cx="107" cy="113" r="1.8" fill="#2a1f2e" />
      <circle cx="117" cy="113" r="1.8" fill="#2a1f2e" />
      <circle cx="112" cy="106" r="2" fill="#e8443f" />
      <path d="M101,100 L112,76 L123,100 z" fill="#f5b31c" />
      <path d="M104,100 L112,84 L120,100 z" fill="#e09a10" />
      <circle cx="112" cy="130" r="4" fill="#f5b31c" />

      {/* 九つの灯明 */}
      <g fill="#c9773a">
        <ellipse cx="52" cy="176" rx="6" ry="3" />
        <ellipse cx="67" cy="176" rx="6" ry="3" />
        <ellipse cx="82" cy="176" rx="6" ry="3" />
        <ellipse cx="97" cy="176" rx="6" ry="3" />
        <ellipse cx="112" cy="176" rx="6" ry="3" />
        <ellipse cx="127" cy="176" rx="6" ry="3" />
        <ellipse cx="142" cy="176" rx="6" ry="3" />
        <ellipse cx="157" cy="176" rx="6" ry="3" />
        <ellipse cx="172" cy="176" rx="6" ry="3" />
      </g>
      <g fill="#f5e2a8">
        <ellipse className="i06-flame-a" cx="52" cy="170" rx="2.6" ry="5" />
        <ellipse className="i06-flame-b" cx="67" cy="170" rx="2.6" ry="5" />
        <ellipse className="i06-flame-c" cx="82" cy="170" rx="2.6" ry="5" />
        <ellipse className="i06-flame-d" cx="97" cy="170" rx="2.6" ry="5" />
        <ellipse className="i06-flame-e" cx="112" cy="170" rx="2.6" ry="5" />
        <ellipse className="i06-flame-f" cx="127" cy="170" rx="2.6" ry="5" />
        <ellipse className="i06-flame-g" cx="142" cy="170" rx="2.6" ry="5" />
        <ellipse className="i06-flame-h" cx="157" cy="170" rx="2.6" ry="5" />
        <ellipse className="i06-flame-i" cx="172" cy="170" rx="2.6" ry="5" />
      </g>

      {/* 輪の中心の灯 */}
      <ellipse cx="298" cy="186" rx="30" ry="9" fill="#332a54" />
      <path d="M288,186 q10,-16 20,0 z" fill="#b5342f" />
      <ellipse className="i06-lamp" cx="298" cy="172" rx="4" ry="8" fill="#f5e2a8" />

      {/* 輪になって回る踊り手 */}
      <g className="i06-dancer i06-dancer-a">
        <path d="M-11,0 L11,0 L7,-22 L-7,-22 z" fill="#e8443f" />
        <rect x="-6" y="-36" width="12" height="16" rx="4" fill="#f5b31c" />
        <circle cx="0" cy="-42" r="7" fill="#e8c9a0" />
        <g className="i06-stick" stroke="#c9a877" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M-4,-32 L-18,-42" />
          <path d="M4,-32 L18,-42" />
        </g>
      </g>
      <g className="i06-dancer i06-dancer-b">
        <path d="M-11,0 L11,0 L7,-22 L-7,-22 z" fill="#5b8fe8" />
        <rect x="-6" y="-36" width="12" height="16" rx="4" fill="#f6efe2" />
        <circle cx="0" cy="-42" r="7" fill="#c08a5a" />
        <g className="i06-stick" stroke="#c9a877" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M-4,-32 L-18,-42" />
          <path d="M4,-32 L18,-42" />
        </g>
      </g>
      <g className="i06-dancer i06-dancer-c">
        <path d="M-11,0 L11,0 L7,-22 L-7,-22 z" fill="#3a7a4a" />
        <rect x="-6" y="-36" width="12" height="16" rx="4" fill="#e8443f" />
        <circle cx="0" cy="-42" r="7" fill="#e8c9a0" />
        <g className="i06-stick" stroke="#c9a877" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M-4,-32 L-18,-42" />
          <path d="M4,-32 L18,-42" />
        </g>
      </g>
      <g className="i06-dancer i06-dancer-d">
        <path d="M-11,0 L11,0 L7,-22 L-7,-22 z" fill="#f5931c" />
        <rect x="-6" y="-36" width="12" height="16" rx="4" fill="#5b8fe8" />
        <circle cx="0" cy="-42" r="7" fill="#c08a5a" />
        <g className="i06-stick" stroke="#c9a877" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M-4,-32 L-18,-42" />
          <path d="M4,-32 L18,-42" />
        </g>
      </g>

      <style>{`
        .i06-pole { transform-box: fill-box; transform-origin: 0 100%; animation: i06-raise 5s ease-in-out infinite; }
        .i06-arms { transform-box: fill-box; transform-origin: 50% 100%; animation: i06-bless 3.6s ease-in-out infinite; }
        .i06-lamp { transform-box: fill-box; transform-origin: 50% 100%; animation: i06-burn 1.1s ease-in-out infinite; }
        .i06-dancer {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: i06-circle 6s linear infinite;
        }
        .i06-dancer-a { transform: translate(350px, 184px) scale(1.02); }
        .i06-dancer-b { transform: translate(286px, 193px) scale(1.1); animation-delay: -1.5s; }
        .i06-dancer-c { transform: translate(230px, 176px) scale(0.95); animation-delay: -3s; }
        .i06-dancer-d { transform: translate(314px, 165px) scale(0.86); animation-delay: -4.5s; }
        .i06-stick { transform-box: fill-box; transform-origin: 50% 100%; animation: i06-clash 0.75s ease-in-out infinite; }
        .i06-star-a { animation: i06-twinkle 2.4s ease-in-out infinite; }
        .i06-star-b { animation: i06-twinkle 3s ease-in-out infinite; animation-delay: -1s; }
        .i06-star-c { animation: i06-twinkle 2.6s ease-in-out infinite; animation-delay: -1.7s; }
        .i06-star-d { animation: i06-twinkle 3.4s ease-in-out infinite; animation-delay: -0.5s; }
        .i06-bulb-a { animation: i06-blink 1.6s steps(1, end) infinite; }
        .i06-bulb-b { animation: i06-blink 1.6s steps(1, end) infinite; animation-delay: -0.2s; }
        .i06-bulb-c { animation: i06-blink 1.6s steps(1, end) infinite; animation-delay: -0.4s; }
        .i06-bulb-d { animation: i06-blink 1.6s steps(1, end) infinite; animation-delay: -0.6s; }
        .i06-bulb-e { animation: i06-blink 1.6s steps(1, end) infinite; animation-delay: -0.8s; }
        .i06-bulb-f { animation: i06-blink 1.6s steps(1, end) infinite; animation-delay: -1s; }
        .i06-bulb-g { animation: i06-blink 1.6s steps(1, end) infinite; animation-delay: -1.2s; }
        .i06-flame-a, .i06-flame-b, .i06-flame-c, .i06-flame-d, .i06-flame-e,
        .i06-flame-f, .i06-flame-g, .i06-flame-h, .i06-flame-i {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: i06-burn 1.3s ease-in-out infinite;
        }
        .i06-flame-b { animation-delay: -0.15s; }
        .i06-flame-c { animation-delay: -0.3s; }
        .i06-flame-d { animation-delay: -0.45s; }
        .i06-flame-e { animation-delay: -0.6s; }
        .i06-flame-f { animation-delay: -0.75s; }
        .i06-flame-g { animation-delay: -0.9s; }
        .i06-flame-h { animation-delay: -1.05s; }
        .i06-flame-i { animation-delay: -1.2s; }
        @keyframes i06-raise {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-16deg); }
        }
        @keyframes i06-bless {
          0%, 100% { transform: rotate(-2.5deg); }
          50% { transform: rotate(2.5deg); }
        }
        @keyframes i06-burn {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(0.78, 1.22); }
        }
        @keyframes i06-clash {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(16deg); }
        }
        @keyframes i06-circle {
          0%   { transform: translate(360px, 178px) scale(1.06); }
          12.5%{ transform: translate(342px, 186px) scale(1.1); }
          25%  { transform: translate(298px, 190px) scale(1.1); }
          37.5%{ transform: translate(254px, 186px) scale(1.06); }
          50%  { transform: translate(236px, 178px) scale(0.94); }
          62.5%{ transform: translate(254px, 170px) scale(0.9); }
          75%  { transform: translate(298px, 166px) scale(0.9); }
          87.5%{ transform: translate(342px, 170px) scale(0.94); }
          100% { transform: translate(360px, 178px) scale(1.06); }
        }
        @keyframes i06-twinkle {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @keyframes i06-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .i06-pole, .i06-arms, .i06-lamp, .i06-stick,
          .i06-dancer, .i06-dancer-a, .i06-dancer-b, .i06-dancer-c, .i06-dancer-d,
          .i06-star-a, .i06-star-b, .i06-star-c, .i06-star-d,
          .i06-bulb-a, .i06-bulb-b, .i06-bulb-c, .i06-bulb-d,
          .i06-bulb-e, .i06-bulb-f, .i06-bulb-g,
          .i06-flame-a, .i06-flame-b, .i06-flame-c, .i06-flame-d, .i06-flame-e,
          .i06-flame-f, .i06-flame-g, .i06-flame-h, .i06-flame-i { animation: none; }
        }
      `}</style>
    </svg>
  );
}
