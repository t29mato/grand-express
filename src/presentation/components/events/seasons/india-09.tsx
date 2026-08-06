/**
 * 1月。サンクラーンティと凧の空。
 *
 * 陽がまた北へ向かい、屋上という屋上が凧の糸で埋まる。晴れた冬空に
 * 色とりどりの凧が上がり、屋上の縁には胡麻と粗糖の菓子が置いてある。
 */
export function India09() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬晴れの空 */}
      <rect width="400" height="210" fill="#7fc0e8" />
      <rect y="88" width="400" height="48" fill="#9fcfec" />

      {/* 北へ戻る陽 */}
      <g className="i09-sun">
        <g className="i09-rays" stroke="#f5d05a" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M352,36 l0,-32" />
          <path d="M352,36 l23,-23" />
          <path d="M352,36 l32,0" />
          <path d="M352,36 l23,23" />
          <path d="M352,36 l0,32" />
          <path d="M352,36 l-23,23" />
          <path d="M352,36 l-32,0" />
          <path d="M352,36 l-23,-23" />
        </g>
        <circle cx="352" cy="36" r="19" fill="#f5b31c" />
      </g>

      {/* 遠くの家並み */}
      <g fill="#9c8060">
        <rect x="0" y="118" width="40" height="18" />
        <rect x="46" y="124" width="34" height="12" />
        <rect x="96" y="114" width="30" height="22" />
        <rect x="150" y="120" width="44" height="16" />
        <rect x="212" y="116" width="36" height="20" />
        <rect x="262" y="124" width="40" height="12" />
        <rect x="316" y="118" width="32" height="18" />
        <rect x="360" y="122" width="40" height="14" />
      </g>

      {/* 空を埋める凧 */}
      <g transform="translate(48,36)">
        <g className="i09-kite-a">
          <path d="M0,-13 L10,0 L0,13 L-10,0 z" fill="#e8443f" />
          <path d="M0,-13 L10,0 L-10,0 z" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(112,22)">
        <g className="i09-kite-b">
          <path d="M0,-12 L9,0 L0,12 L-9,0 z" fill="#5b8fe8" />
          <path d="M0,-12 L9,0 L-9,0 z" fill="#f6efe2" />
        </g>
      </g>
      <g transform="translate(178,74)">
        <g className="i09-kite-c">
          <path d="M0,-14 L11,0 L0,14 L-11,0 z" fill="#3a7a4a" />
          <path d="M0,-14 L11,0 L-11,0 z" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(288,20)">
        <g className="i09-kite-d">
          <path d="M0,-11 L8,0 L0,11 L-8,0 z" fill="#e8447a" />
          <path d="M0,-11 L8,0 L-8,0 z" fill="#f6efe2" />
        </g>
      </g>
      <g transform="translate(324,96)">
        <g className="i09-kite-e">
          <path d="M0,-13 L10,0 L0,13 L-10,0 z" fill="#f5931c" />
          <path d="M0,-13 L10,0 L-10,0 z" fill="#3a7a4a" />
        </g>
      </g>
      <g transform="translate(26,90)">
        <g className="i09-kite-f">
          <path d="M0,-10 L8,0 L0,10 L-8,0 z" fill="#7a4fa8" />
          <path d="M0,-10 L8,0 L-8,0 z" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(206,26)">
        <g className="i09-kite-g">
          <path d="M0,-12 L9,0 L0,12 L-9,0 z" fill="#f6efe2" />
          <path d="M0,-12 L9,0 L-9,0 z" fill="#e8443f" />
        </g>
      </g>

      {/* 糸のつながった凧 */}
      <g className="i09-line-a">
        <path d="M64,142 L128,52" fill="none" stroke="#f6efe2" strokeWidth="1.5" />
        <path d="M128,52 L140,66 L128,80 L116,66 z" fill="#e8443f" />
        <path d="M128,52 L140,66 L116,66 z" fill="#f6efe2" />
        <path d="M128,80 q8,10 -2,18 q-9,8 0,16" fill="none" stroke="#f5b31c" strokeWidth="2" />
      </g>
      <g className="i09-line-b">
        <path d="M188,128 L236,44" fill="none" stroke="#f6efe2" strokeWidth="1.5" />
        <path d="M236,44 L247,57 L236,70 L225,57 z" fill="#5b8fe8" />
        <path d="M236,44 L247,57 L225,57 z" fill="#f5b31c" />
        <path d="M236,70 q-8,9 1,17 q8,7 -1,15" fill="none" stroke="#e8443f" strokeWidth="2" />
      </g>
      <g className="i09-line-c">
        <path d="M300,150 L262,74" fill="none" stroke="#f6efe2" strokeWidth="1.5" />
        <path d="M262,74 L272,86 L262,98 L252,86 z" fill="#3a7a4a" />
        <path d="M262,74 L272,86 L252,86 z" fill="#f6efe2" />
      </g>

      {/* 屋上 */}
      <g>
        <rect x="0" y="150" width="112" height="60" fill="#c9a877" />
        <rect x="0" y="144" width="112" height="8" fill="#a8875a" />
        <rect x="112" y="136" width="118" height="74" fill="#b0895f" />
        <rect x="112" y="130" width="118" height="8" fill="#8e6b45" />
        <rect x="230" y="158" width="112" height="52" fill="#d9b98a" />
        <rect x="230" y="152" width="112" height="8" fill="#b89a6c" />
        <rect x="342" y="142" width="58" height="68" fill="#c9a877" />
        <rect x="342" y="136" width="58" height="8" fill="#a8875a" />
      </g>
      <g fill="#8e6b45">
        <rect x="18" y="166" width="16" height="20" />
        <rect x="62" y="166" width="16" height="20" />
        <rect x="132" y="152" width="16" height="20" />
        <rect x="200" y="152" width="16" height="20" />
        <rect x="252" y="174" width="16" height="20" />
        <rect x="300" y="174" width="16" height="20" />
        <rect x="360" y="158" width="16" height="20" />
      </g>

      {/* 糸を繰る人びと */}
      <g className="i09-flyer-a">
        <rect x="56" y="124" width="16" height="22" rx="5" fill="#e8443f" />
        <circle cx="64" cy="118" r="8" fill="#c08a5a" />
        <rect className="i09-arm-a" x="64" y="126" width="16" height="5" rx="2.5" fill="#c08a5a" />
        <rect x="50" y="126" width="12" height="5" rx="2.5" fill="#c08a5a" />
      </g>
      <g className="i09-flyer-b">
        <rect x="180" y="110" width="16" height="22" rx="5" fill="#f6efe2" />
        <circle cx="188" cy="104" r="8" fill="#8a5a2a" />
        <rect className="i09-arm-b" x="188" y="112" width="16" height="5" rx="2.5" fill="#8a5a2a" />
        <rect x="174" y="112" width="12" height="5" rx="2.5" fill="#8a5a2a" />
      </g>
      <g className="i09-flyer-c">
        <rect x="292" y="132" width="16" height="22" rx="5" fill="#5b8fe8" />
        <circle cx="300" cy="126" r="8" fill="#c08a5a" />
        <rect className="i09-arm-c" x="284" y="134" width="16" height="5" rx="2.5" fill="#c08a5a" />
        <rect x="302" y="134" width="12" height="5" rx="2.5" fill="#c08a5a" />
      </g>

      {/* 糸巻き */}
      <g>
        <rect x="146" y="118" width="7" height="16" rx="2" fill="#8a5a2a" />
        <rect x="164" y="118" width="7" height="16" rx="2" fill="#8a5a2a" />
        <rect className="i09-spool" x="150" y="121" width="18" height="10" rx="2" fill="#e8b06a" />
      </g>

      {/* 胡麻と粗糖の菓子 */}
      <ellipse cx="330" cy="150" rx="24" ry="7" fill="#f6efe2" />
      <g fill="#b5763a">
        <circle className="i09-sweet-a" cx="320" cy="146" r="6" />
        <circle className="i09-sweet-b" cx="332" cy="144" r="6" />
        <circle className="i09-sweet-c" cx="343" cy="147" r="5.5" />
      </g>

      <style>{`
        .i09-sun { animation: i09-climb 9s ease-in-out infinite; }
        .i09-rays { transform-origin: 352px 36px; animation: i09-turn 26s linear infinite; }
        .i09-kite-a, .i09-kite-b, .i09-kite-c, .i09-kite-d,
        .i09-kite-e, .i09-kite-f, .i09-kite-g {
          transform-box: fill-box;
          transform-origin: center;
        }
        .i09-kite-a { animation: i09-float-a 5.4s ease-in-out infinite; }
        .i09-kite-b { animation: i09-float-b 6.2s ease-in-out infinite; }
        .i09-kite-c { animation: i09-float-a 6.8s ease-in-out infinite; animation-delay: -2s; }
        .i09-kite-d { animation: i09-float-b 5.8s ease-in-out infinite; animation-delay: -1.4s; }
        .i09-kite-e { animation: i09-float-a 6s ease-in-out infinite; animation-delay: -3.2s; }
        .i09-kite-f { animation: i09-float-b 7s ease-in-out infinite; animation-delay: -2.6s; }
        .i09-kite-g { animation: i09-float-a 5s ease-in-out infinite; animation-delay: -1s; }
        .i09-line-a { transform-origin: 64px 142px; animation: i09-tug-a 4.4s ease-in-out infinite; }
        .i09-line-b { transform-origin: 188px 128px; animation: i09-tug-b 5.2s ease-in-out infinite; }
        .i09-line-c { transform-origin: 300px 150px; animation: i09-tug-a 4.8s ease-in-out infinite; animation-delay: -1.8s; }
        .i09-flyer-a, .i09-flyer-b, .i09-flyer-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: i09-lean 4.4s ease-in-out infinite;
        }
        .i09-flyer-b { animation-duration: 5.2s; animation-delay: -1.6s; }
        .i09-flyer-c { animation-duration: 4.8s; animation-delay: -3s; }
        .i09-arm-a, .i09-arm-b {
          transform-box: fill-box;
          transform-origin: 0 50%;
          animation: i09-pull 1.5s ease-in-out infinite;
        }
        .i09-arm-c {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: i09-pull 1.5s ease-in-out infinite reverse;
        }
        .i09-spool { transform-box: fill-box; transform-origin: center; animation: i09-reel 2.6s linear infinite; }
        .i09-sweet-a, .i09-sweet-b, .i09-sweet-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: i09-nudge 3.2s ease-in-out infinite;
        }
        .i09-sweet-b { animation-delay: -1s; }
        .i09-sweet-c { animation-delay: -2s; }
        @keyframes i09-climb {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-5px, -6px); }
        }
        @keyframes i09-turn {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes i09-float-a {
          0%, 100% { transform: translate(0, 0) rotate(-11deg); }
          50% { transform: translate(14px, -13px) rotate(11deg); }
        }
        @keyframes i09-float-b {
          0%, 100% { transform: translate(0, 0) rotate(9deg); }
          50% { transform: translate(-15px, 12px) rotate(-9deg); }
        }
        @keyframes i09-tug-a {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes i09-tug-b {
          0%, 100% { transform: rotate(2.6deg); }
          50% { transform: rotate(-2.6deg); }
        }
        @keyframes i09-lean {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes i09-pull {
          0%, 100% { transform: rotate(-34deg); }
          50% { transform: rotate(-6deg); }
        }
        @keyframes i09-reel {
          0% { transform: scaleY(1); }
          50% { transform: scaleY(0.72); }
          100% { transform: scaleY(1); }
        }
        @keyframes i09-nudge {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @media (prefers-reduced-motion: reduce) {
          .i09-sun, .i09-rays,
          .i09-kite-a, .i09-kite-b, .i09-kite-c, .i09-kite-d,
          .i09-kite-e, .i09-kite-f, .i09-kite-g,
          .i09-line-a, .i09-line-b, .i09-line-c,
          .i09-flyer-a, .i09-flyer-b, .i09-flyer-c,
          .i09-arm-a, .i09-arm-b, .i09-arm-c, .i09-spool,
          .i09-sweet-a, .i09-sweet-b, .i09-sweet-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
