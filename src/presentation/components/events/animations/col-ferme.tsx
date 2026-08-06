/**
 * 夜のうちに雪で峠が閉ざされ、迂回に一日と満タン一回ぶんかかる(イズラン峠)。
 *
 *   - 赤白の遮断棒が下りていて、その先の道は雪に埋まっている
 *   - 引き返す車のテールランプが灯り、雪は降りやまない
 *   - 燃料計の針が満から空へ落ち、そのぶんの小銭が出ていく
 */
export function ColFerme() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雪雲の垂れた夕闇 */}
      <rect width="400" height="210" fill="#3a4a63" />
      <rect y="40" width="400" height="26" fill="#465872" />

      {/* 峠の両側の稜線 */}
      <path d="M0,104 L52,44 L100,80 L146,36 L200,104z" fill="#4f5f78" />
      <path d="M146,36 L162,50 L130,50z" fill="#e6edf2" />
      <path d="M52,44 L64,56 L40,56z" fill="#e6edf2" />
      <path d="M196,104 L252,50 L300,86 L344,54 L400,104z" fill="#455471" />
      <path d="M252,50 L266,62 L238,62z" fill="#e6edf2" />
      <path d="M344,54 L356,66 L332,66z" fill="#e6edf2" />

      {/* 雪に埋まった路面 */}
      <rect y="102" width="400" height="108" fill="#c9d6e0" />
      <path d="M0,126 Q110,114 220,128 Q320,140 400,124 L400,210 L0,210z" fill="#dde7ee" />
      <path d="M150,126 L250,126 L340,210 L60,210z" fill="#c2cfda" />
      {/* 峠の先を埋める吹きだまり */}
      <path d="M132,148 Q200,124 274,150 Q330,168 400,158 L400,182 L120,182z" fill="#eaf1f6" />

      {/* 下りた遮断棒 */}
      <g>
        <rect x="60" y="120" width="10" height="60" rx="3" fill="#4a5568" />
        <rect x="56" y="176" width="18" height="7" rx="2" fill="#3a4453" />
        <g className="col-barrier">
          <rect x="64" y="130" width="188" height="11" rx="4" fill="#f2ede0" />
          <g fill="#e8443f">
            <rect x="88" y="130" width="26" height="11" />
            <rect x="140" y="130" width="26" height="11" />
            <rect x="192" y="130" width="26" height="11" />
          </g>
        </g>
        {/* 点滅する警告灯 */}
        <circle className="col-lamp" cx="65" cy="114" r="6" fill="#f5b31c" />
      </g>

      {/* 引き返す車 */}
      <g transform="translate(300,176)">
        <path d="M-40,-8 L-30,-26 q20,-7 44,0 L26,-8z" fill="#3b4a63" />
        <rect x="-44" y="-10" width="88" height="18" rx="6" fill="#5b8fe8" />
        <path d="M-26,-24 q18,-6 38,0 l3,13 h-44z" fill="#bfd8ee" />
        <circle cx="-24" cy="9" r="8" fill="#2a2f38" />
        <circle cx="24" cy="9" r="8" fill="#2a2f38" />
        <circle cx="-24" cy="9" r="3.2" fill="#8a8578" />
        <circle cx="24" cy="9" r="3.2" fill="#8a8578" />
        {/* 屋根の荷物 */}
        <rect x="-18" y="-34" width="34" height="9" rx="3" fill="#8a5a2c" />
        {/* こちらを向いたテールランプ */}
        <g fill="#e8443f">
          <rect className="col-tail col-t1" x="-46" y="-6" width="7" height="7" rx="2" />
          <rect className="col-tail col-t2" x="-46" y="2" width="7" height="5" rx="2" />
        </g>
      </g>

      {/* 空になっていく燃料計 */}
      <g transform="translate(58,36)">
        <circle cx="0" cy="0" r="26" fill="#20303f" />
        <circle cx="0" cy="0" r="22" fill="#2c4055" />
        <path d="M-16,6 A18,18 0 0 1 16,6" stroke="#8fa4b8" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="-16" cy="6" r="2.6" fill="#e8443f" />
        <circle cx="16" cy="6" r="2.6" fill="#6fbf7a" />
        <g className="col-needle">
          <rect x="-1.8" y="-16" width="3.6" height="24" rx="1.8" fill="#f2ede0" />
        </g>
        <circle cx="0" cy="6" r="4" fill="#f2ede0" />
      </g>

      {/* 降りやまない雪 */}
      <g fill="#f2f8fc">
        <circle className="col-flake col-f1" cx="24" cy="0" r="2.2" />
        <circle className="col-flake col-f2" cx="72" cy="0" r="1.8" />
        <circle className="col-flake col-f3" cx="128" cy="0" r="2.4" />
        <circle className="col-flake col-f4" cx="176" cy="0" r="1.9" />
        <circle className="col-flake col-f5" cx="224" cy="0" r="2.2" />
        <circle className="col-flake col-f6" cx="272" cy="0" r="1.7" />
        <circle className="col-flake col-f7" cx="320" cy="0" r="2.3" />
        <circle className="col-flake col-f8" cx="368" cy="0" r="1.8" />
        <circle className="col-flake col-f9" cx="200" cy="0" r="1.5" />
        <circle className="col-flake col-f10" cx="348" cy="0" r="1.6" />
      </g>

      {/* 迂回にかかる代金 */}
      <g className="col-coin col-c1">
        <circle cx="176" cy="92" r="9" fill="#f5b31c" />
        <circle cx="176" cy="92" r="4.5" fill="#c98a0d" />
      </g>
      <g className="col-coin col-c2">
        <circle cx="196" cy="76" r="7.4" fill="#f5b31c" />
        <circle cx="196" cy="76" r="3.6" fill="#c98a0d" />
      </g>

      <style>{`
        .col-barrier, .col-lamp, .col-tail, .col-needle, .col-flake, .col-coin {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .col-barrier { transform-origin: 0% 50%; animation: col-settle 5.5s ease-in-out infinite; }
        .col-lamp { animation: col-blink 1.4s steps(1, end) infinite; }
        .col-tail { animation: col-brake 2.2s ease-in-out infinite; }
        .col-t2 { animation-delay: -0.5s; }
        .col-needle { transform-origin: 50% 92%; animation: col-drain 5s ease-in-out infinite; }
        .col-flake { animation: col-fall 8s linear infinite; }
        .col-f1 { animation-duration: 9s; animation-delay: -2s; }
        .col-f2 { animation-duration: 11s; animation-delay: -5s; }
        .col-f3 { animation-duration: 8s; animation-delay: -7s; }
        .col-f4 { animation-duration: 10s; animation-delay: -3s; }
        .col-f5 { animation-duration: 7.5s; animation-delay: -6s; }
        .col-f6 { animation-duration: 12s; animation-delay: -9s; }
        .col-f7 { animation-duration: 8.5s; animation-delay: -4s; }
        .col-f8 { animation-duration: 10.5s; animation-delay: -1s; }
        .col-f9 { animation-duration: 13s; animation-delay: -11s; }
        .col-f10 { animation-duration: 9.5s; animation-delay: -8s; }
        .col-coin { animation: col-spend 2.8s ease-in infinite; }
        .col-c2 { animation-delay: -1.4s; }
        @keyframes col-settle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1.2deg); }
        }
        @keyframes col-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.18; }
        }
        @keyframes col-brake {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        @keyframes col-drain {
          0%, 12% { transform: rotate(-52deg); }
          70%, 100% { transform: rotate(52deg); }
        }
        @keyframes col-fall {
          0% { transform: translate(0, -8px); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.7; }
          100% { transform: translate(-30px, 218px); opacity: 0; }
        }
        @keyframes col-spend {
          0% { transform: translate(0, 0); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(52px, 40px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .col-barrier, .col-lamp, .col-tail, .col-needle, .col-flake, .col-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
