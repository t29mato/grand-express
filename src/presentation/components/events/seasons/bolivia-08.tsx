/**
 * ボリビア 12月 — 年末の見本市。
 *
 * サンタクルスに買い手が集まる。天幕の下で大豆と牛とガスの契約が握手で決まり、
 * 三角旗がはためく。表では荷物を抱えた客が行き来している。
 */
export function Bolivia08() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 真夏のサンタクルスの空 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <circle cx="46" cy="30" r="18" fill="#f5e2a8" />
      <g fill="#d9ecf8">
        <ellipse cx="118" cy="26" rx="30" ry="11" />
        <ellipse cx="142" cy="20" rx="20" ry="9" />
        <ellipse cx="318" cy="34" rx="34" ry="12" />
        <ellipse cx="290" cy="28" rx="22" ry="9" />
      </g>

      {/* 奥の椰子と会場の並び */}
      <g>
        <rect x="16" y="96" width="6" height="42" fill="#7a5a34" />
        <g fill="#3f7a45">
          <path d="M19,96 q-22,-4 -30,10 q18,-4 30,2z" />
          <path d="M19,96 q22,-4 30,10 q-18,-4 -30,2z" />
          <path d="M19,96 q-8,-22 4,-30 q6,18 0,30z" />
        </g>
        <rect x="378" y="88" width="6" height="50" fill="#7a5a34" />
        <g fill="#3f7a45">
          <path d="M381,88 q-24,-4 -32,10 q20,-4 32,2z" />
          <path d="M381,88 q22,-4 30,10 q-18,-4 -30,2z" />
          <path d="M381,88 q-8,-24 4,-32 q6,20 0,32z" />
        </g>
      </g>
      <g>
        <path d="M4,130 L36,102 L68,130z" fill="#e8e2d2" />
        <path d="M20,116 L36,102 L52,116 L36,130z" fill="#4f9e4a" />
        <path d="M332,130 L362,104 L392,130z" fill="#e8e2d2" />
        <path d="M347,117 L362,104 L377,117 L362,130z" fill="#5b8fe8" />
      </g>

      {/* 地面 */}
      <rect y="130" width="400" height="16" fill="#6f9a5a" />
      <rect y="144" width="400" height="66" fill="#c9a877" />
      <rect y="176" width="400" height="34" fill="#bb9760" />

      {/* 天幕 */}
      <rect x="52" y="90" width="8" height="58" fill="#8a5c38" />
      <rect x="340" y="90" width="8" height="58" fill="#8a5c38" />
      <g className="feria-canvas">
        <path d="M56,92 L200,38 L344,92z" fill="#f6efe2" />
        <g fill="#e8443f">
          <path d="M200,38 L56,92 L80,92z" />
          <path d="M200,38 L104,92 L128,92z" />
          <path d="M200,38 L152,92 L176,92z" />
          <path d="M200,38 L200,92 L224,92z" />
          <path d="M200,38 L248,92 L272,92z" />
          <path d="M200,38 L296,92 L320,92z" />
        </g>
        <path
          d="M56,92 L344,92 L344,100 a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0
             a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0
             a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0
             a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0
             a8,8 0 0 1 -16,0 a8,8 0 0 1 -16,0 z"
          fill="#d43a36"
        />
        <circle cx="200" cy="34" r="5" fill="#f5b31c" />
      </g>

      {/* 三角旗 */}
      <g fill="none" stroke="#6b5a44" strokeWidth="1.6">
        <path d="M200,36 Q108,86 14,78" />
        <path d="M200,36 Q292,84 386,74" />
      </g>
      <g>
        <path className="feria-flag-a" d="M166,50 L178,50 L172,64z" fill="#f5b31c" />
        <path className="feria-flag-b" d="M139,61 L151,61 L145,75z" fill="#4f9e4a" />
        <path className="feria-flag-c" d="M111,69 L123,69 L117,83z" fill="#e8443f" />
        <path className="feria-flag-d" d="M83,75 L95,75 L89,89z" fill="#5b8fe8" />
        <path className="feria-flag-e" d="M55,78 L67,78 L61,92z" fill="#f5b31c" />
        <path className="feria-flag-f" d="M27,79 L39,79 L33,93z" fill="#4f9e4a" />
        <path className="feria-flag-b" d="M222,49 L234,49 L228,63z" fill="#4f9e4a" />
        <path className="feria-flag-c" d="M249,60 L261,60 L255,74z" fill="#e8443f" />
        <path className="feria-flag-a" d="M277,68 L289,68 L283,82z" fill="#f5b31c" />
        <path className="feria-flag-e" d="M305,73 L317,73 L311,87z" fill="#5b8fe8" />
        <path className="feria-flag-d" d="M333,75 L345,75 L339,89z" fill="#e8443f" />
        <path className="feria-flag-f" d="M361,75 L373,75 L367,89z" fill="#f5b31c" />
      </g>

      {/* 天幕の下 — 握手で決まる契約 */}
      <g>
        <rect x="150" y="126" width="100" height="7" fill="#a8763f" />
        <rect x="156" y="133" width="6" height="15" fill="#8a5c38" />
        <rect x="238" y="133" width="6" height="15" fill="#8a5c38" />
        <rect x="150" y="133" width="100" height="6" fill="#8a5c38" />
      </g>
      <g>
        {/* 左の売り手 */}
        <circle cx="140" cy="102" r="9" fill="#c98a5e" />
        <path d="M131,100 a9,9 0 0 1 18,0 L147,101 L133,101z" fill="#3b2f2a" />
        <rect x="132" y="110" width="17" height="28" rx="5" fill="#5b8fe8" />
        {/* 右の買い手 */}
        <circle cx="262" cy="100" r="9" fill="#e8c39e" />
        <path d="M253,98 a9,9 0 0 1 18,0 L269,99 L255,99z" fill="#f6efe2" />
        <rect x="253" y="108" width="17" height="30" rx="5" fill="#e8e2d2" />
        {/* 握手 */}
        <g className="feria-shake">
          <rect x="146" y="112" width="26" height="7" rx="3.5" fill="#c98a5e" />
          <rect x="230" y="112" width="26" height="7" rx="3.5" fill="#e8c39e" />
          <circle cx="201" cy="115" r="7" fill="#c98a5e" />
        </g>
      </g>
      {/* 契約書とスタンプ */}
      <rect x="176" y="120" width="30" height="8" rx="1" fill="#f6efe2" />
      <g className="feria-stamp">
        <rect x="211" y="108" width="14" height="14" rx="2" fill="#3b2f4a" />
        <rect x="214" y="102" width="8" height="8" rx="3" fill="#5a4a6a" />
      </g>
      <circle className="feria-mark" cx="199" cy="123" r="4" fill="#e8443f" />

      {/* 大豆の袋 */}
      <g fill="#ddc78e">
        <path d="M22,182 q-6,-24 6,-28 q6,10 16,4 q8,4 4,24z" />
        <path d="M60,180 q-6,-22 5,-26 q6,9 15,4 q7,4 4,22z" />
        <path d="M40,152 q-5,-20 5,-24 q5,8 13,3 q7,4 4,21z" />
      </g>
      <g fill="#b8a068">
        <path d="M22,182 L48,182 L48,186 L22,186z" />
        <path d="M60,180 L84,180 L84,184 L60,184z" />
      </g>

      {/* 牛 */}
      <g>
        <ellipse cx="332" cy="164" rx="34" ry="20" fill="#f0e8d8" />
        <ellipse cx="318" cy="160" rx="12" ry="9" fill="#a89880" />
        <rect x="306" y="180" width="7" height="18" rx="3" fill="#dcd2c0" />
        <rect x="322" y="180" width="7" height="18" rx="3" fill="#dcd2c0" />
        <rect x="342" y="180" width="7" height="18" rx="3" fill="#dcd2c0" />
        <rect x="356" y="180" width="7" height="18" rx="3" fill="#dcd2c0" />
        <g className="feria-cowhead">
          <ellipse cx="366" cy="150" rx="15" ry="12" fill="#f0e8d8" />
          <path d="M354,142 q-8,-8 -2,-12 q6,2 8,9z" fill="#e0d4bc" />
          <path d="M378,142 q8,-8 2,-12 q-6,2 -8,9z" fill="#e0d4bc" />
          <circle cx="372" cy="148" r="2.2" fill="#3b2f2a" />
          <ellipse cx="376" cy="156" rx="6" ry="4" fill="#d8b8a8" />
        </g>
        <path className="feria-tail" d="M300,152 q-10,10 -6,26" stroke="#dcd2c0" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>

      {/* 荷物を抱えた客 */}
      <g className="feria-buyer-a">
        <circle cx="0" cy="-38" r="10" fill="#c98a5e" />
        <path d="M-10,-40 a10,10 0 0 1 20,0z" fill="#2a2028" />
        <rect x="-11" y="-28" width="22" height="26" rx="6" fill="#e8443f" />
        <rect x="-14" y="-20" width="28" height="14" rx="2" fill="#f5b31c" />
        <rect className="feria-legs-a" x="-9" y="-2" width="8" height="16" rx="4" fill="#3b3a42" />
        <rect className="feria-legs-b" x="2" y="-2" width="8" height="16" rx="4" fill="#3b3a42" />
      </g>
      <g className="feria-buyer-b">
        <circle cx="0" cy="-34" r="9" fill="#e8c39e" />
        <path d="M-9,-36 a9,9 0 0 1 18,0z" fill="#5a4a3a" />
        <rect x="-10" y="-25" width="20" height="24" rx="6" fill="#4f9e4a" />
        <rect x="9" y="-16" width="12" height="16" rx="2" fill="#e8e2d2" />
        <rect className="feria-legs-b" x="-8" y="-1" width="7" height="15" rx="3.5" fill="#3b3a42" />
        <rect className="feria-legs-a" x="1" y="-1" width="7" height="15" rx="3.5" fill="#3b3a42" />
      </g>

      <style>{`
        .feria-canvas {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: feria-billow 3.6s ease-in-out infinite;
        }
        .feria-flag-a, .feria-flag-b, .feria-flag-c,
        .feria-flag-d, .feria-flag-e, .feria-flag-f {
          transform-box: fill-box;
          transform-origin: 50% 0;
        }
        .feria-flag-a { animation: feria-flap 1.5s ease-in-out infinite; }
        .feria-flag-b { animation: feria-flap 1.8s ease-in-out infinite; animation-delay: -0.3s; }
        .feria-flag-c { animation: feria-flap 1.3s ease-in-out infinite; animation-delay: -0.6s; }
        .feria-flag-d { animation: feria-flap 1.7s ease-in-out infinite; animation-delay: -0.9s; }
        .feria-flag-e { animation: feria-flap 1.4s ease-in-out infinite; animation-delay: -0.45s; }
        .feria-flag-f { animation: feria-flap 1.6s ease-in-out infinite; animation-delay: -1.1s; }
        .feria-shake {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: feria-pump 1.1s ease-in-out infinite;
        }
        .feria-stamp {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: feria-thump 2.4s ease-in-out infinite;
        }
        .feria-mark { animation: feria-ink 2.4s ease-out infinite; }
        .feria-cowhead {
          transform-box: fill-box;
          transform-origin: 20% 50%;
          animation: feria-graze 4.2s ease-in-out infinite;
        }
        .feria-tail {
          transform-box: fill-box;
          transform-origin: 100% 0;
          animation: feria-swish 2.2s ease-in-out infinite;
        }
        .feria-buyer-a {
          transform: translate(120px, 190px);
          animation: feria-strollright 9s linear infinite;
        }
        .feria-buyer-b {
          transform: translate(264px, 196px) scaleX(-1);
          animation: feria-strollleft 11s linear infinite;
        }
        .feria-legs-a {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: feria-step 0.5s linear infinite;
        }
        .feria-legs-b {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: feria-step 0.5s linear infinite reverse;
        }
        @keyframes feria-billow {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(1.035) scaleX(0.99); }
        }
        @keyframes feria-flap {
          0%, 100% { transform: rotate(9deg) scaleX(0.86); }
          50% { transform: rotate(-9deg) scaleX(1); }
        }
        @keyframes feria-pump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes feria-thump {
          0%, 55% { transform: translateY(-12px) rotate(-6deg); }
          70% { transform: translateY(6px) rotate(0deg); }
          80% { transform: translateY(-12px) rotate(-6deg); }
          100% { transform: translateY(-12px) rotate(-6deg); }
        }
        @keyframes feria-ink {
          0%, 68% { opacity: 0; transform: scale(0.4); }
          74% { opacity: 1; transform: scale(1); }
          96% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1); }
        }
        @keyframes feria-graze {
          0%, 100% { transform: rotate(0deg); }
          40% { transform: rotate(16deg); }
          60% { transform: rotate(16deg); }
        }
        @keyframes feria-swish {
          0%, 100% { transform: rotate(12deg); }
          50% { transform: rotate(-14deg); }
        }
        @keyframes feria-strollright {
          0% { transform: translate(-40px, 190px); }
          100% { transform: translate(440px, 190px); }
        }
        @keyframes feria-strollleft {
          0% { transform: translate(440px, 196px) scaleX(-1); }
          100% { transform: translate(-40px, 196px) scaleX(-1); }
        }
        @keyframes feria-step {
          0%, 100% { transform: rotate(22deg); }
          50% { transform: rotate(-22deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .feria-canvas, .feria-flag-a, .feria-flag-b, .feria-flag-c,
          .feria-flag-d, .feria-flag-e, .feria-flag-f,
          .feria-shake, .feria-stamp, .feria-mark, .feria-cowhead, .feria-tail,
          .feria-buyer-a, .feria-buyer-b, .feria-legs-a, .feria-legs-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
