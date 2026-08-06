/**
 * ボリビア 10月 — チキタニアの火入れ期。
 *
 * 雨季の前に土地を焼く。煙が東の空を茶色く濁らせ、太陽は鈍い赤い円になる。
 * 手前の焼き跡では炎の列が揺れ、火が乾いた森へ移りかけている。
 */
export function Bolivia06() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 煙で濁った空 */}
      <rect width="400" height="210" fill="#8a5734" />
      <rect width="400" height="62" fill="#5b3f30" />
      <rect y="62" width="400" height="44" fill="#7d5233" />
      <rect y="106" width="400" height="30" fill="#b8763a" />

      {/* 煙にかすんだ太陽 */}
      <circle cx="312" cy="48" r="30" fill="#c25a2c" opacity="0.35" />
      <circle className="fireseason-sun" cx="312" cy="48" r="17" fill="#e2612c" />

      {/* 立ち上る煙 */}
      <g fill="#7d6c5e" opacity="0.72">
        <g className="fireseason-smoke-a">
          <circle cx="82" cy="118" r="22" />
          <circle cx="106" cy="102" r="18" />
          <circle cx="66" cy="98" r="16" />
          <circle cx="90" cy="80" r="15" />
          <circle cx="112" cy="70" r="11" />
          <circle cx="70" cy="66" r="10" />
        </g>
        <g className="fireseason-smoke-b">
          <circle cx="192" cy="116" r="26" />
          <circle cx="220" cy="96" r="20" />
          <circle cx="170" cy="94" r="18" />
          <circle cx="200" cy="72" r="17" />
          <circle cx="228" cy="60" r="12" />
          <circle cx="176" cy="56" r="11" />
        </g>
        <g className="fireseason-smoke-c">
          <circle cx="292" cy="120" r="20" />
          <circle cx="312" cy="104" r="16" />
          <circle cx="272" cy="102" r="14" />
          <circle cx="298" cy="84" r="12" />
          <circle cx="278" cy="70" r="9" />
        </g>
      </g>

      {/* 奥に残る乾いた森 */}
      <g fill="#33361f">
        <rect x="322" y="120" width="7" height="34" />
        <ellipse cx="325" cy="118" rx="21" ry="14" />
        <rect x="356" y="114" width="7" height="40" />
        <ellipse cx="359" cy="112" rx="24" ry="16" />
        <rect x="386" y="124" width="7" height="30" />
        <ellipse cx="389" cy="122" rx="18" ry="12" />
        <rect x="14" y="122" width="6" height="32" />
        <ellipse cx="17" cy="120" rx="18" ry="12" />
      </g>

      {/* 燃えている藪 */}
      <path
        d="M0,158 Q18,142 38,150 Q56,136 76,148 Q96,134 116,150 Q136,138 158,148
           Q180,132 202,148 Q224,136 246,150 Q266,138 288,148 Q310,134 332,150
           Q354,140 376,148 Q390,142 400,152 L400,166 L0,166z"
        fill="#2c2317"
      />

      {/* 焼き跡の地面 */}
      <rect y="162" width="400" height="48" fill="#4a3423" />
      <g fill="#39281b">
        <ellipse cx="70" cy="180" rx="46" ry="8" />
        <ellipse cx="212" cy="196" rx="62" ry="9" />
        <ellipse cx="340" cy="176" rx="40" ry="7" />
      </g>

      {/* 火の列 */}
      <g fill="#e8443f">
        <path className="fireseason-flame-a" d="M30,158 C22,146 24,134 30,124 C36,134 38,146 30,158z" />
        <path className="fireseason-flame-b" d="M74,160 C62,146 65,126 74,112 C83,126 86,146 74,160z" />
        <path className="fireseason-flame-c" d="M108,157 C101,148 102,139 108,131 C114,139 115,148 108,157z" />
        <path className="fireseason-flame-d" d="M154,161 C141,146 144,124 154,109 C164,124 167,146 154,161z" />
        <path className="fireseason-flame-e" d="M196,157 C187,146 189,133 196,122 C203,133 205,146 196,157z" />
        <path className="fireseason-flame-f" d="M244,160 C233,146 236,128 244,114 C252,128 255,146 244,160z" />
        <path className="fireseason-flame-g" d="M282,156 C276,148 277,140 282,133 C287,140 288,148 282,156z" />
        <path className="fireseason-flame-h" d="M326,160 C314,146 317,126 326,112 C335,126 338,146 326,160z" />
        <path className="fireseason-flame-c" d="M362,157 C354,147 356,135 362,125 C368,135 370,147 362,157z" />
        <path className="fireseason-flame-e" d="M390,158 C383,148 384,138 390,129 C396,138 397,148 390,158z" />
      </g>
      <g fill="#f5b31c">
        <path className="fireseason-flame-b" d="M74,158 C67,147 69,134 74,124 C79,134 81,147 74,158z" />
        <path className="fireseason-flame-d" d="M154,159 C146,147 148,131 154,120 C160,131 162,147 154,159z" />
        <path className="fireseason-flame-f" d="M244,158 C238,148 240,135 244,126 C248,135 250,148 244,158z" />
        <path className="fireseason-flame-a" d="M30,157 C26,149 27,141 30,134 C33,141 34,149 30,157z" />
        <path className="fireseason-flame-h" d="M326,158 C320,148 322,134 326,125 C330,134 332,148 326,158z" />
        <path className="fireseason-flame-e" d="M196,156 C192,148 193,140 196,133 C199,140 200,148 196,156z" />
      </g>

      {/* 舞い上がる火の粉 */}
      <g fill="#f5d27a">
        <circle className="fireseason-ember-a" cx="60" cy="140" r="2.6" />
        <circle className="fireseason-ember-b" cx="152" cy="140" r="2.2" />
        <circle className="fireseason-ember-c" cx="216" cy="140" r="3" />
        <circle className="fireseason-ember-d" cx="266" cy="140" r="2.4" />
        <circle className="fireseason-ember-e" cx="318" cy="140" r="2.6" />
        <circle className="fireseason-ember-f" cx="110" cy="140" r="2" />
      </g>

      {/* 焼け残った切り株 */}
      <g fill="#241a12">
        <path d="M112,210 L112,178 L124,176 L126,210z" />
        <path d="M262,210 L264,182 L276,180 L278,210z" />
        <path d="M186,206 L188,190 L196,189 L197,206z" />
      </g>

      <style>{`
        .fireseason-flame-a, .fireseason-flame-b, .fireseason-flame-c, .fireseason-flame-d,
        .fireseason-flame-e, .fireseason-flame-f, .fireseason-flame-g, .fireseason-flame-h {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .fireseason-flame-a { animation: fireseason-lick 0.62s ease-in-out infinite; }
        .fireseason-flame-b { animation: fireseason-lick 0.78s ease-in-out infinite; animation-delay: -0.2s; }
        .fireseason-flame-c { animation: fireseason-lick 0.54s ease-in-out infinite; animation-delay: -0.35s; }
        .fireseason-flame-d { animation: fireseason-lick 0.86s ease-in-out infinite; animation-delay: -0.5s; }
        .fireseason-flame-e { animation: fireseason-lick 0.68s ease-in-out infinite; animation-delay: -0.15s; }
        .fireseason-flame-f { animation: fireseason-lick 0.74s ease-in-out infinite; animation-delay: -0.44s; }
        .fireseason-flame-g { animation: fireseason-lick 0.58s ease-in-out infinite; animation-delay: -0.26s; }
        .fireseason-flame-h { animation: fireseason-lick 0.82s ease-in-out infinite; animation-delay: -0.6s; }
        .fireseason-smoke-a {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: fireseason-rise 7s ease-out infinite;
        }
        .fireseason-smoke-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: fireseason-rise 8.4s ease-out infinite;
          animation-delay: -3.2s;
        }
        .fireseason-smoke-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: fireseason-rise 6.2s ease-out infinite;
          animation-delay: -4.6s;
        }
        .fireseason-sun { animation: fireseason-glow 4.5s ease-in-out infinite; }
        .fireseason-ember-a { animation: fireseason-spark 2.6s linear infinite; }
        .fireseason-ember-b { animation: fireseason-spark 3.2s linear infinite; animation-delay: -1.1s; }
        .fireseason-ember-c { animation: fireseason-spark 2.2s linear infinite; animation-delay: -1.7s; }
        .fireseason-ember-d { animation: fireseason-spark 3s linear infinite; animation-delay: -0.6s; }
        .fireseason-ember-e { animation: fireseason-spark 2.8s linear infinite; animation-delay: -2.1s; }
        .fireseason-ember-f { animation: fireseason-spark 3.4s linear infinite; animation-delay: -1.4s; }
        @keyframes fireseason-lick {
          0%, 100% { transform: scaleY(1) skewX(0deg); }
          30% { transform: scaleY(1.26) skewX(-7deg); }
          65% { transform: scaleY(0.84) skewX(6deg); }
        }
        @keyframes fireseason-rise {
          0% { transform: translate(0, 26px) scale(0.4); opacity: 0; }
          25% { opacity: 0.55; }
          70% { opacity: 0.4; }
          100% { transform: translate(46px, -76px) scale(1.5); opacity: 0; }
        }
        @keyframes fireseason-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.62; }
        }
        @keyframes fireseason-spark {
          0% { transform: translate(0, 14px); opacity: 0; }
          18% { opacity: 1; }
          100% { transform: translate(30px, -104px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fireseason-flame-a, .fireseason-flame-b, .fireseason-flame-c, .fireseason-flame-d,
          .fireseason-flame-e, .fireseason-flame-f, .fireseason-flame-g, .fireseason-flame-h,
          .fireseason-smoke-a, .fireseason-smoke-b, .fireseason-smoke-c,
          .fireseason-sun,
          .fireseason-ember-a, .fireseason-ember-b, .fireseason-ember-c,
          .fireseason-ember-d, .fireseason-ember-e, .fireseason-ember-f { animation: none; }
        }
      `}</style>
    </svg>
  );
}
