/**
 * ドーバー海峡の突風。午後四時に船は欠航し、港町の部屋代はどこも倍になる。
 *
 * 防波堤を波が越え、繋がれた連絡船は動かない。案内板には赤い×。
 * 宿の戸口では、昨日の倍の高さに積まれた硬貨が待っている。
 * 沖では貨物船が、この程度の時化では引き返さずに進んでいく。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function CoupDeVentManche() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空 */}
      <rect width="400" height="210" fill="#5b6673" />
      <rect width="400" height="56" fill="#4a5462" />
      <g fill="#68727f" opacity="0.8">
        <ellipse cx="90" cy="22" rx="90" ry="18" />
        <ellipse cx="300" cy="16" rx="96" ry="16" />
      </g>
      {/* 風の筋 */}
      <g fill="#a8cfe4" opacity="0.3">
        <rect
          className="cvm-gust-a"
          x="240"
          y="30"
          width="140"
          height="5"
          rx="2.5"
        />
        <rect
          className="cvm-gust-b"
          x="240"
          y="52"
          width="110"
          height="4"
          rx="2"
        />
        <rect
          className="cvm-gust-c"
          x="240"
          y="70"
          width="160"
          height="5"
          rx="2.5"
        />
      </g>

      {/* 沖を行く貨物船 */}
      <g transform="translate(330,92)">
        <g className="cvm-freighter">
          <path d="M-40,-4 l80,0 l-9,10 -62,0z" fill="#3a4450" />
          <rect x="14" y="-16" width="14" height="12" rx="2" fill="#4d5a68" />
          <rect x="-30" y="-12" width="36" height="8" rx="2" fill="#4d5a68" />
        </g>
      </g>

      {/* 海 */}
      <rect y="96" width="400" height="114" fill="#2f4a5f" />
      <g fill="#3d5d76">
        <rect
          className="cvm-swell-a"
          x="0"
          y="112"
          width="160"
          height="6"
          rx="3"
        />
        <rect
          className="cvm-swell-b"
          x="180"
          y="128"
          width="180"
          height="6"
          rx="3"
        />
      </g>

      {/* 防波堤と越えてくる波 */}
      <rect x="0" y="126" width="238" height="18" fill="#8d8a80" />
      <rect x="0" y="126" width="238" height="5" fill="#9c998e" />
      <g transform="translate(232,126)">
        <g className="cvm-spray">
          <circle cx="0" cy="-10" r="17" fill="#f2f8fc" />
          <circle cx="-17" cy="-25" r="13" fill="#eaf3f8" />
          <circle cx="11" cy="-32" r="15" fill="#f2f8fc" />
          <circle cx="-32" cy="-15" r="10" fill="#e0edf4" />
        </g>
      </g>

      {/* 繋がれたままの連絡船 */}
      <g transform="translate(120,150)">
        <g className="cvm-ferry">
          <path d="M-72,-14 l144,0 l-16,26 -112,0z" fill="#3f5c74" />
          <rect x="-72" y="-18" width="144" height="6" rx="3" fill="#4d7090" />
          <rect x="-40" y="-42" width="80" height="24" rx="4" fill="#e8e2d4" />
          <g fill="#2b3038">
            <rect x="-32" y="-36" width="14" height="10" rx="2" />
            <rect x="-11" y="-36" width="14" height="10" rx="2" />
            <rect x="10" y="-36" width="14" height="10" rx="2" />
          </g>
          <rect x="16" y="-62" width="14" height="22" rx="3" fill="#c0362f" />
          <rect x="16" y="-62" width="14" height="6" rx="3" fill="#8d2a24" />
        </g>
      </g>

      {/* 欠航の案内板 */}
      <g transform="translate(312,152)">
        <rect x="-4" y="0" width="8" height="52" fill="#5f6875" />
        <g className="cvm-board">
          <rect x="-38" y="-34" width="76" height="38" rx="3" fill="#2f333a" />
          <rect x="-38" y="-34" width="76" height="8" rx="3" fill="#3f4450" />
          <g stroke="#e8443f" strokeWidth="7" strokeLinecap="round">
            <path d="M-20,-24 L20,-4" />
            <path d="M20,-24 L-20,-4" />
          </g>
        </g>
      </g>

      {/* 飛んでいく帽子 */}
      <g transform="translate(200,70)">
        <g className="cvm-hat">
          <ellipse cx="0" cy="0" rx="20" ry="6" fill="#5c4632" />
          <path d="M-12,-2 q12,-16 24,0z" fill="#6e553c" />
        </g>
      </g>

      {/* 岸壁 */}
      <rect y="168" width="400" height="42" fill="#8d8a80" />
      <rect y="168" width="400" height="5" fill="#9c998e" />

      {/* 宿の戸口と、昨日の倍に積まれた宿代 */}
      <g transform="translate(56,208)">
        <rect x="-42" y="-40" width="84" height="40" rx="3" fill="#5c4636" />
        <rect x="-42" y="-40" width="84" height="8" rx="3" fill="#6e553f" />
        <rect x="-16" y="-28" width="32" height="28" rx="2" fill="#3a2c22" />
        <circle cx="8" cy="-14" r="3" fill="#c9a877" />
      </g>
      <g className="cvm-stack-old" fill="#f5b31c">
        <ellipse cx="126" cy="202" rx="11" ry="4.5" />
        <ellipse cx="126" cy="194" rx="11" ry="4.5" />
      </g>
      <g className="cvm-stack-new" fill="#f5b31c">
        <ellipse cx="172" cy="202" rx="11" ry="4.5" />
        <ellipse cx="172" cy="194" rx="11" ry="4.5" />
        <ellipse cx="172" cy="186" rx="11" ry="4.5" />
        <ellipse cx="172" cy="178" rx="11" ry="4.5" />
      </g>
      <g transform="translate(172,162)">
        <g className="cvm-up">
          <rect x="-5" y="-2" width="10" height="18" rx="3" fill="#e8443f" />
          <path d="M-14,-2 L0,-18 L14,-2z" fill="#e8443f" />
        </g>
      </g>

      <style>{`
        .cvm-gust-a { transform-box: fill-box; transform-origin: center; animation: cvm-blow 1.4s linear infinite; }
        .cvm-gust-b { transform-box: fill-box; transform-origin: center; animation: cvm-blow 1.8s linear infinite; animation-delay: -0.6s; }
        .cvm-gust-c { transform-box: fill-box; transform-origin: center; animation: cvm-blow 1.2s linear infinite; animation-delay: -0.9s; }
        .cvm-ferry { transform-box: fill-box; transform-origin: 50% 100%; animation: cvm-heave 3s ease-in-out infinite; }
        .cvm-freighter { transform-box: fill-box; transform-origin: 50% 100%; animation: cvm-steam 9s linear infinite; }
        .cvm-spray { transform-box: fill-box; transform-origin: 50% 100%; animation: cvm-burst 2.6s ease-out infinite; }
        .cvm-swell-a { transform-box: fill-box; transform-origin: center; animation: cvm-roll 4.4s linear infinite; }
        .cvm-swell-b { transform-box: fill-box; transform-origin: center; animation: cvm-roll 5.6s linear infinite; animation-delay: -2s; }
        .cvm-board { transform-box: fill-box; transform-origin: 50% 100%; animation: cvm-swing 2.8s ease-in-out infinite; }
        .cvm-hat { transform-box: fill-box; transform-origin: center; animation: cvm-fly 3.6s linear infinite; }
        .cvm-stack-new { transform-box: fill-box; transform-origin: 50% 100%; animation: cvm-pile 3.6s ease-out infinite; }
        .cvm-up { transform-box: fill-box; transform-origin: center; animation: cvm-rise 3.6s ease-in-out infinite; }
        @keyframes cvm-blow {
          0% { transform: translate(160px, 0) scaleX(0.5); opacity: 0; }
          25%, 65% { opacity: 0.3; }
          100% { transform: translate(-300px, 0) scaleX(1.3); opacity: 0; }
        }
        @keyframes cvm-heave {
          0%, 100% { transform: rotate(-2.6deg) translate(0, 0); }
          50% { transform: rotate(2.6deg) translate(0, -5px); }
        }
        @keyframes cvm-steam {
          0% { transform: translate(60px, 0); }
          100% { transform: translate(-420px, 0); }
        }
        @keyframes cvm-burst {
          0%, 12% { transform: translate(0, 26px) scale(0.3); opacity: 0; }
          34% { transform: translate(-8px, -4px) scale(1); opacity: 0.9; }
          70% { transform: translate(-30px, 8px) scale(1.15); opacity: 0.5; }
          92%, 100% { transform: translate(-46px, 26px) scale(0.7); opacity: 0; }
        }
        @keyframes cvm-roll {
          0% { transform: translate(-34px, 0); opacity: 0.35; }
          50% { opacity: 0.9; }
          100% { transform: translate(34px, 0); opacity: 0.35; }
        }
        @keyframes cvm-swing {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes cvm-fly {
          0% { transform: translate(150px, 40px) rotate(0deg); opacity: 0; }
          16% { opacity: 1; }
          82% { opacity: 1; }
          100% { transform: translate(-230px, -50px) rotate(-420deg); opacity: 0; }
        }
        @keyframes cvm-pile {
          0%, 26% { transform: scaleY(0.5); }
          46%, 100% { transform: scaleY(1); }
        }
        @keyframes cvm-rise {
          0%, 100% { transform: translate(0, 6px); opacity: 0.7; }
          50% { transform: translate(0, -4px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cvm-gust-a, .cvm-gust-b, .cvm-gust-c, .cvm-ferry, .cvm-freighter,
          .cvm-spray, .cvm-swell-a, .cvm-swell-b, .cvm-board, .cvm-hat,
          .cvm-stack-new, .cvm-up { animation: none; }
        }
      `}</style>
    </svg>
  );
}
