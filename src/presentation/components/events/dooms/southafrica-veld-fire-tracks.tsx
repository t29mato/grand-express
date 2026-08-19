/**
 * 野火が線路を焼き払う。冬の乾いたハイフェルトで、車輪の火花から燃え移った火が
 * 風に乗って線路を横切っていく。
 *
 * 構図: **画面のなかを火の線が斜めに走り、その後ろは黒く焼けている。**
 * 進行方向の先はまだ枯草色のまま。線路はその真ん中を通っていて、
 * 列車は煙の壁の向こうで止まって待っている。乗務員がふたり、
 * 手前の道床から眺めている。消火にあたる人は描かない——
 * 火が線路を越えて自然に鎮まるのを待つ、という話だからである。
 *
 * 動くのは4つ: 火の舌、立ちのぼる煙、舞い上がる残り火、風になびく枯草。
 * 止めた状態でも「焼けた側と焼けていない側があり、その境に火の線がある」で伝わる。
 *
 * (オーストラリア盤の山火事とは別物にする: あちらは**尾根・赤黒い空・無人**。
 *  こちらは**平原・白茶けた空・人がいて待っている**)
 */
export function SouthafricaVeldFireTracks() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 煙に白茶けた冬の空。 */}
      <rect width="400" height="210" fill="#e0d2b0" />
      <rect width="400" height="58" fill="#d8c8a4" />
      <rect y="52" width="400" height="34" fill="#e8dcbc" />
      <circle cx="316" cy="40" r="16" fill="#f2c869" opacity="0.55" />

      {/* 立ちのぼる煙の壁。風で右へ倒れている。 */}
      <g className="sa-vf-smoke-a" fill="#a89e90" opacity="0.62">
        <ellipse cx="150" cy="46" rx="46" ry="22" />
        <ellipse cx="196" cy="30" rx="34" ry="17" />
        <ellipse cx="112" cy="62" rx="34" ry="17" />
      </g>
      <g className="sa-vf-smoke-b" fill="#c2b8a8" opacity="0.55">
        <ellipse cx="210" cy="54" rx="40" ry="19" />
        <ellipse cx="256" cy="40" rx="28" ry="14" />
        <ellipse cx="168" cy="70" rx="30" ry="15" />
      </g>
      <g className="sa-vf-smoke-c" fill="#8f8578" opacity="0.5">
        <ellipse cx="120" cy="84" rx="52" ry="20" />
        <ellipse cx="196" cy="90" rx="46" ry="18" />
      </g>

      {/* 遠くの地平と、まばらな低木。 */}
      <rect y="98" width="400" height="112" fill="#c9b678" />
      <path d="M0,98 q90,-8 180,0 q104,8 220,-4 v16 H0z" fill="#b8a468" />
      <g fill="#7f7a4a">
        <ellipse cx="316" cy="104" rx="13" ry="6" />
        <ellipse cx="352" cy="108" rx="10" ry="5" />
        <ellipse cx="382" cy="102" rx="11" ry="5" />
      </g>

      {/* ── 焼けた側(左)。火の線より後ろは黒い。 */}
      <path d="M0,98 h96 l64,112 H0z" fill="#3a332c" />
      <path d="M0,120 h72 l50,90 H0z" fill="#2b2622" />
      {/* 焼け残った黒い株。灰の色を少し変えて、焼け跡を平らにしない。 */}
      <g fill="#4a4238" opacity="0.4">
        <ellipse cx="44" cy="154" rx="22" ry="5" />
        <ellipse cx="92" cy="188" rx="26" ry="6" />
      </g>
      <g fill="#181614">
        <path d="M38,154 q3,-11 7,-11 q4,0 6,11z" />
        <path d="M44,145 l6,-7 M45,146 l-5,-6" stroke="#181614" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M86,188 q3,-13 8,-13 q5,0 7,13z" />
        <path d="M93,175 l7,-8 M94,176 l-6,-7" stroke="#181614" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>

      {/* 線路。焼けた側から焼けていない側へ、そのまま続く。 */}
      <rect y="128" width="400" height="15" fill="#a89a68" />
      <rect y="128" width="160" height="15" fill="#4a4438" />
      <g fill="#6b5f42">
        <rect x="2" y="130" width="13" height="6" />
        <rect x="36" y="130" width="13" height="6" />
        <rect x="70" y="130" width="13" height="6" />
        <rect x="104" y="130" width="13" height="6" />
        <rect x="138" y="130" width="13" height="6" />
        <rect x="172" y="130" width="13" height="6" />
        <rect x="206" y="130" width="13" height="6" />
        <rect x="240" y="130" width="13" height="6" />
        <rect x="274" y="130" width="13" height="6" />
        <rect x="308" y="130" width="13" height="6" />
        <rect x="342" y="130" width="13" height="6" />
        <rect x="376" y="130" width="13" height="6" />
      </g>
      <rect y="127" width="400" height="3" fill="#9a9488" />
      <rect y="139" width="400" height="2.6" fill="#8a8478" />

      {/* 煙の壁の向こうで待つ列車(左奥)。かすんでいる。 */}
      <g opacity="0.72">
        <rect x="-10" y="96" width="126" height="32" rx="4" fill="#5a5f52" />
        <rect x="-10" y="96" width="126" height="6" fill="#8a7f4a" />
        <g fill="#3a3f38">
          <rect x="2" y="106" width="16" height="12" rx="2" />
          <rect x="24" y="106" width="16" height="12" rx="2" />
          <rect x="46" y="106" width="16" height="12" rx="2" />
          <rect x="68" y="106" width="16" height="12" rx="2" />
        </g>
        <path d="M116,96 q10,12 8,32 h-8z" fill="#5a5f52" />
        <circle cx="119" cy="116" r="3.6" fill="#f5b31c" />
        <g fill="#22241f">
          <circle cx="14" cy="128" r="5" />
          <circle cx="38" cy="128" r="5" />
          <circle cx="92" cy="128" r="5" />
        </g>
      </g>

      {/* ── 火の線。斜めに走り、右へ進んでいる。 */}
      <path d="M96,98 l64,112 h30 l-62,-112z" fill="#8f3a1c" opacity="0.9" />
      <g fill="#e8553f">
        <path d="M100,100 l58,108 h14 l-56,-108z" />
      </g>
      {/* 火の舌。3つの群れが別々に揺れる。 */}
      <g className="sa-vf-flame-a" fill="#f5b31c">
        <path d="M104,112 q7,-13 3,-22 q11,10 8,22z" />
        <path d="M112,132 q8,-14 4,-24 q12,11 9,24z" />
      </g>
      <g className="sa-vf-flame-b" fill="#f5b31c">
        <path d="M124,156 q8,-15 4,-25 q13,12 10,25z" />
        <path d="M134,178 q9,-16 5,-27 q14,13 10,27z" />
      </g>
      <g className="sa-vf-flame-c" fill="#f8d98a">
        <path d="M108,120 q5,-9 2,-15 q8,7 6,15z" />
        <path d="M129,166 q5,-10 2,-16 q9,7 6,16z" />
        <path d="M146,196 q6,-11 2,-18 q10,8 7,18z" />
      </g>

      {/* 舞い上がる残り火。 */}
      <g fill="#f5b31c">
        <circle className="sa-vf-ember-a" cx="150" cy="150" r="2.2" />
        <circle className="sa-vf-ember-b" cx="176" cy="120" r="1.8" />
        <circle className="sa-vf-ember-c" cx="132" cy="180" r="2" />
        <circle className="sa-vf-ember-d" cx="198" cy="164" r="1.6" />
      </g>

      {/* ── まだ焼けていない側の枯草。風で右へ寝る。 */}
      <g className="sa-vf-grass" stroke="#8f8450" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path d="M232,210 v-20 M244,210 v-15 M258,210 v-22 M272,210 v-16" />
        <path d="M330,210 v-19 M344,210 v-14 M358,210 v-23 M372,210 v-17" />
      </g>
      <g className="sa-vf-grass" stroke="#a89a5e" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M226,152 v-12 M240,154 v-9 M300,150 v-13 M314,152 v-9 M386,152 v-12" />
      </g>

      {/* 道床に立って眺める乗務員ふたり。別の服・別の姿勢。 */}
      {/* ひとり目: 目の上に手をかざして、火の行く先を追っている。 */}
      <g>
        <g fill="#2b3038">
          <rect x="275" y="180" width="5" height="18" />
          <rect x="284" y="180" width="5" height="18" />
        </g>
        <path d="M273,162 h18 l2,20 h-22z" fill="#c8e04a" />
        <rect x="272" y="171" width="20" height="3.4" fill="#f2f6e0" />
        <circle cx="282" cy="154" r="7.4" fill="#6b4a34" />
        <path d="M274,151 q8,-8 16,-1 h-16z" fill="#e8e2d4" />
        {/* 右腕は下ろしたまま、左腕だけを額へ上げて日差しと煙をよけている。 */}
        <path d="M291,166 q6,7 5,14" stroke="#6b4a34" strokeWidth="4.2" fill="none" strokeLinecap="round" />
        <path d="M273,166 q-7,-7 -4,-14" stroke="#6b4a34" strokeWidth="4.2" fill="none" strokeLinecap="round" />
        <path d="M269,151 h13" stroke="#6b4a34" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
      {/* ふたり目: 腰に手を当てて、待つしかないのを受け入れている。 */}
      <g>
        <g fill="#4a3a2c">
          <rect x="311" y="188" width="5" height="16" />
          <rect x="320" y="188" width="5" height="16" />
        </g>
        <path d="M309,172 h18 l2,18 h-22z" fill="#c2453c" />
        <circle cx="318" cy="164" r="7.4" fill="#8a5a3c" />
        <path d="M310,161 q8,-8 16,-1 h-16z" fill="#3f4a56" />
        <path d="M310,176 l-7,7 l8,4" stroke="#8a5a3c" strokeWidth="4.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M327,176 l7,7 l-8,4" stroke="#8a5a3c" strokeWidth="4.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <style>{`
        .sa-vf-flame-a, .sa-vf-flame-b, .sa-vf-flame-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .sa-vf-flame-a { animation: sa-vf-lick 0.9s ease-in-out infinite; }
        .sa-vf-flame-b { animation: sa-vf-lick 1.1s ease-in-out -0.4s infinite; }
        .sa-vf-flame-c { animation: sa-vf-lick 0.7s ease-in-out -0.25s infinite; }
        @keyframes sa-vf-lick {
          0%, 100% { transform: scaleY(1) skewX(0deg); }
          40% { transform: scaleY(1.35) skewX(9deg); }
          70% { transform: scaleY(0.86) skewX(-5deg); }
        }
        .sa-vf-smoke-a { animation: sa-vf-drift 9s ease-in-out infinite; }
        .sa-vf-smoke-b { animation: sa-vf-drift 11s ease-in-out -3s infinite; }
        .sa-vf-smoke-c { animation: sa-vf-drift 13s ease-in-out -6s infinite; }
        @keyframes sa-vf-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(24px, -8px); }
        }
        .sa-vf-ember-a { animation: sa-vf-rise 3.4s linear infinite; }
        .sa-vf-ember-b { animation: sa-vf-rise 4.2s linear -1.4s infinite; }
        .sa-vf-ember-c { animation: sa-vf-rise 3s linear -2.2s infinite; }
        .sa-vf-ember-d { animation: sa-vf-rise 3.8s linear -0.7s infinite; }
        @keyframes sa-vf-rise {
          0% { transform: translate(0, 0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(46px, -74px); opacity: 0; }
        }
        .sa-vf-grass {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: sa-vf-bend 2.8s ease-in-out infinite;
        }
        @keyframes sa-vf-bend {
          0%, 100% { transform: skewX(6deg); }
          50% { transform: skewX(15deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-vf-flame-a,
          .sa-vf-flame-b,
          .sa-vf-flame-c,
          .sa-vf-smoke-a,
          .sa-vf-smoke-b,
          .sa-vf-smoke-c,
          .sa-vf-ember-a,
          .sa-vf-ember-b,
          .sa-vf-ember-c,
          .sa-vf-ember-d,
          .sa-vf-grass { animation: none; }
        }
      `}</style>
    </svg>
  );
}
