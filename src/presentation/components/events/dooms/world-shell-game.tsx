/**
 * 折りたたみ台の三つの椀。前の客が二度当てて、満足そうに立ち去る。
 *
 * あれも仲間だ。ぶつかってくる者も、角を見張っている者もそうである。
 * 椀が入れ替わっているあいだに、背中側から手が懐へ伸びている。
 * 台が畳まれて消える頃には、広場の誰も何も見ていない。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function WorldShellGame() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの広場 */}
      <rect width="400" height="210" fill="#2f2f3d" />
      <rect width="400" height="60" fill="#262633" />
      <g fill="#3a3a4a">
        <rect x="0" y="14" width="112" height="60" />
        <rect x="128" y="6" width="120" height="68" />
        <rect x="266" y="18" width="134" height="56" />
      </g>
      <g fill="#22222d">
        <rect x="16" y="28" width="18" height="24" rx="2" />
        <rect x="46" y="28" width="18" height="24" rx="2" />
        <rect x="146" y="22" width="18" height="26" rx="2" />
        <rect x="178" y="22" width="18" height="26" rx="2" />
        <rect x="288" y="32" width="18" height="24" rx="2" />
        <rect x="320" y="32" width="18" height="24" rx="2" />
      </g>
      <rect y="74" width="400" height="136" fill="#413f4c" />
      <rect y="74" width="400" height="5" fill="#4c4a58" />

      {/* 角を見張っている少年 */}
      <g transform="translate(362,132)">
        <g className="wsg-lookout">
          <circle cx="0" cy="-46" r="14" fill="#22222d" />
          <rect x="-16" y="-32" width="32" height="44" rx="12" fill="#22222d" />
          <circle cx="7" cy="-46" r="3" fill="#8d949c" />
        </g>
      </g>

      {/* 立ち去るサクラ(硬貨を持って) */}
      <g transform="translate(56,150)">
        <g className="wsg-shill">
          <path d="M-18,20 q18,-16 36,0z" fill="#3a3346" />
          <rect x="-16" y="-26" width="32" height="46" rx="11" fill="#46405c" />
          <circle cx="0" cy="-40" r="15" fill="#d8b48c" />
          <path d="M-15,-44 a15,15 0 0 1 30,0 l0,3 -30,0z" fill="#2a2018" />
          <rect x="14" y="-24" width="28" height="10" rx="5" fill="#46405c" />
          <ellipse cx="44" cy="-19" rx="10" ry="8" fill="#d8b48c" />
          <g className="wsg-prize">
            <circle cx="46" cy="-28" r="7" fill="#f5b31c" />
            <circle cx="46" cy="-28" r="3" fill="#c98a12" />
          </g>
        </g>
      </g>

      {/* 折りたたみ台 */}
      <g>
        <rect x="132" y="126" width="150" height="10" rx="3" fill="#7a5a3a" />
        <rect x="132" y="126" width="150" height="4" rx="2" fill="#8d6b47" />
        <g stroke="#5c4632" strokeWidth="6" fill="none">
          <path d="M148,136 L172,190" />
          <path d="M196,136 L172,190" />
          <path d="M242,136 L266,190" />
          <path d="M290,136 L266,190" />
        </g>
      </g>

      {/* 三つの椀 */}
      <g transform="translate(164,126)">
        <g className="wsg-cup-a">
          <path d="M-16,0 q3,-26 16,-26 q13,0 16,26z" fill="#c04434" />
          <path d="M-16,0 l32,0 l0,4 -32,0z" fill="#8d3227" />
        </g>
      </g>
      <g transform="translate(208,126)">
        <g className="wsg-cup-b">
          <path d="M-16,0 q3,-26 16,-26 q13,0 16,26z" fill="#c04434" />
          <path d="M-16,0 l32,0 l0,4 -32,0z" fill="#8d3227" />
        </g>
      </g>
      <g transform="translate(252,126)">
        <g className="wsg-cup-c">
          <path d="M-16,0 q3,-26 16,-26 q13,0 16,26z" fill="#c04434" />
          <path d="M-16,0 l32,0 l0,4 -32,0z" fill="#8d3227" />
        </g>
      </g>
      {/* 玉 */}
      <g transform="translate(208,120)">
        <g className="wsg-ball">
          <circle r="6" fill="#f5d033" />
        </g>
      </g>

      {/* 台の向こうの親(椀を隠さないよう胸から上だけ) */}
      <g>
        <circle cx="232" cy="56" r="16" fill="#2b2836" />
        <path d="M212,94 q20,-30 40,0z" fill="#332e3f" />
        <path d="M214,94 q18,-22 36,0z" fill="#8a7f66" />
      </g>
      {/* 椀を動かす手 */}
      <g transform="translate(246,90)">
        <g className="wsg-dealer">
          <rect x="-56" y="-8" width="56" height="15" rx="7.5" fill="#8a7f66" />
          <rect x="-56" y="-8" width="56" height="5" rx="2.5" fill="#a2977c" />
          <ellipse cx="-62" cy="2" rx="14" ry="11" fill="#d8a878" />
          <rect x="-75" y="-2" width="14" height="7" rx="3" fill="#c99a6c" />
        </g>
      </g>

      {/* 見物人(懐を狙われている) */}
      <g transform="translate(310,190)">
        <g className="wsg-mark">
          <path d="M-26,20 q26,-20 52,0z" fill="#3a4a5b" />
          <path d="M-24,16 q24,-18 48,0 l-6,-58 -36,0z" fill="#46586b" />
          <rect x="-30" y="-34" width="20" height="12" rx="5" fill="#3a4a5b" />
          <circle cx="0" cy="-74" r="19" fill="#f0e2cf" />
          <path d="M-19,-78 a19,19 0 0 1 38,0 l0,4 -38,0z" fill="#463225" />
          <circle cx="-7" cy="-73" r="2.8" fill="#2a1f18" />
          <circle cx="7" cy="-73" r="2.8" fill="#2a1f18" />
          <path
            d="M-6,-64 q6,4 12,0"
            stroke="#c98a6c"
            strokeWidth="2.6"
            fill="none"
          />
          {/* 後ろの隠し */}
          <rect x="-26" y="-30" width="26" height="11" rx="4" fill="#3a4a5b" />
        </g>
      </g>

      {/* 背中側から伸びる手 */}
      <g transform="translate(258,166)">
        <g className="wsg-hand">
          <rect x="0" y="-8" width="46" height="16" rx="8" fill="#332c3f" />
          <ellipse cx="46" cy="0" rx="12" ry="10" fill="#e0b088" />
        </g>
      </g>

      {/* 抜かれる札入れ */}
      <g transform="translate(286,164)">
        <g className="wsg-wallet">
          <rect x="-14" y="-10" width="28" height="20" rx="3" fill="#5c3a20" />
          <rect x="-14" y="-10" width="28" height="6" rx="3" fill="#6e4828" />
          <rect x="-5" y="-14" width="13" height="7" rx="2" fill="#f5b31c" />
        </g>
      </g>

      <style>{`
        .wsg-cup-a { transform-box: fill-box; transform-origin: 50% 100%; animation: wsg-swap-a 3.2s ease-in-out infinite; }
        .wsg-cup-b { transform-box: fill-box; transform-origin: 50% 100%; animation: wsg-swap-b 3.2s ease-in-out infinite; }
        .wsg-cup-c { transform-box: fill-box; transform-origin: 50% 100%; animation: wsg-swap-c 3.2s ease-in-out infinite; }
        .wsg-ball { transform-box: fill-box; transform-origin: center; animation: wsg-peek 3.2s ease-in-out infinite; }
        .wsg-dealer { transform-box: fill-box; transform-origin: right center; animation: wsg-shuffle 3.2s ease-in-out infinite; }
        .wsg-shill { transform-box: fill-box; transform-origin: 50% 100%; animation: wsg-walkoff 6.4s ease-in-out infinite; }
        .wsg-prize { transform-box: fill-box; transform-origin: center; animation: wsg-toss 1.6s ease-in-out infinite; }
        .wsg-lookout { transform-box: fill-box; transform-origin: 50% 100%; animation: wsg-watch 4.2s ease-in-out infinite; }
        .wsg-mark { transform-box: fill-box; transform-origin: 50% 100%; animation: wsg-lean 3.2s ease-in-out infinite; }
        .wsg-hand { transform-box: fill-box; transform-origin: left center; animation: wsg-dip 6.4s ease-in-out infinite; }
        .wsg-wallet { transform-box: fill-box; transform-origin: center; opacity: 0; animation: wsg-take 6.4s ease-in-out infinite; }
        @keyframes wsg-swap-a {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(22px, -10px); }
          50% { transform: translate(44px, 0); }
          75% { transform: translate(22px, -10px); }
        }
        @keyframes wsg-swap-b {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-22px, -12px); }
          50% { transform: translate(-44px, 0); }
          75% { transform: translate(-22px, -12px); }
        }
        @keyframes wsg-swap-c {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -8px); }
        }
        @keyframes wsg-peek {
          0%, 8% { opacity: 1; transform: translate(0, 0); }
          16%, 84% { opacity: 0; transform: translate(0, 0); }
          92%, 100% { opacity: 1; transform: translate(44px, 0); }
        }
        @keyframes wsg-shuffle {
          0%, 100% { transform: translate(0, 2px) rotate(4deg); }
          25% { transform: translate(-24px, 6px) rotate(-7deg); }
          50% { transform: translate(8px, 3px) rotate(9deg); }
          75% { transform: translate(-18px, 6px) rotate(-5deg); }
        }
        @keyframes wsg-walkoff {
          0%, 30% { transform: translate(30px, 0); opacity: 1; }
          72% { transform: translate(-18px, 0); opacity: 1; }
          92%, 100% { transform: translate(-48px, 0); opacity: 0; }
        }
        @keyframes wsg-toss {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(0, -7px) rotate(180deg); }
        }
        @keyframes wsg-watch {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-5px, 0); }
        }
        @keyframes wsg-lean {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-2.6deg) translate(-3px, 0); }
        }
        @keyframes wsg-dip {
          0%, 20% { transform: translate(-44px, 0); }
          44%, 62% { transform: translate(12px, -4px); }
          88%, 100% { transform: translate(-44px, 0); }
        }
        @keyframes wsg-take {
          0%, 56% { transform: translate(0, 0); opacity: 0; }
          64% { transform: translate(-4px, -2px); opacity: 1; }
          80% { transform: translate(-40px, -4px) rotate(-14deg); opacity: 1; }
          94%, 100% { transform: translate(-78px, 4px) rotate(-24deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wsg-cup-a, .wsg-cup-b, .wsg-cup-c, .wsg-ball, .wsg-dealer,
          .wsg-shill, .wsg-prize, .wsg-lookout, .wsg-mark, .wsg-hand, .wsg-wallet { animation: none; }
          /* **規則そのものに opacity: 0 を書いている要素は、animation: none だけでは
             消えたままになる。**動きを減らす設定にしている人にだけ、
             出来事そのものが見えなくなる。抜かれる札入れ。**これが出来事そのもの**なので、止めた絵から消えてはいけない。 */
          .wsg-wallet { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
