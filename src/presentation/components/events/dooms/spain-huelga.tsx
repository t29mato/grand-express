/**
 * 鉄道スト。労働組合の一斉ストライキで最低限の便しか動かず、
 * 乗れる列車がほとんど無い。
 *
 * 車庫に灯を落として並ぶ2本の列車と、赤字だらけの発車標。
 * フランスの絵(行進とシャッター)と被らないよう、こちらは
 * **止まったままの車両と、掲示を読んで頭をかく旅人**で描く。
 *
 * 動き: 発車標の赤い欠航ランプの明滅・組合の赤旗のはためき・
 * 旅人が掲示を確かめては頭をかく・鳩がついばむ。
 */
export function SpainHuelga() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の車庫。架線に電気は来ていない */}
      <rect width="400" height="210" fill="#4a4456" />
      <rect width="400" height="84" fill="#3f3a4a" />
      <g stroke="#5a5468" strokeWidth="1.6" fill="none">
        <path d="M0,30 Q200,44 400,30" />
        <path d="M60,33 v10 M200,37 v10 M340,33 v10" />
      </g>

      {/* 止まったままの列車2本(灯なし) */}
      <g>
        <path d="M8,128 V96 q0,-6 6,-6 h130 q16,0 24,10 l10,12 q2,6 -4,6z" fill="#6e6a7a" />
        <g fill="#3f3a4a">
          <rect x="20" y="98" width="20" height="10" rx="2" />
          <rect x="48" y="98" width="20" height="10" rx="2" />
          <rect x="76" y="98" width="20" height="10" rx="2" />
          <rect x="104" y="98" width="20" height="10" rx="2" />
        </g>
        <path d="M12,122 h160" stroke="#8a3a2f" strokeWidth="3" />
        <g fill="#2f2a38">
          <circle cx="36" cy="128" r="6" />
          <circle cx="66" cy="128" r="6" />
          <circle cx="132" cy="128" r="6" />
        </g>
      </g>
      <g>
        <path d="M392,140 V108 q0,-6 -6,-6 h-120 q-16,0 -24,10 l-10,12 q-2,6 4,6z" fill="#5f5a6c" />
        <g fill="#38333f">
          <rect x="290" y="110" width="20" height="10" rx="2" />
          <rect x="318" y="110" width="20" height="10" rx="2" />
          <rect x="346" y="110" width="20" height="10" rx="2" />
        </g>
        <path d="M240,134 h150" stroke="#8a3a2f" strokeWidth="3" />
        <g fill="#2f2a38">
          <circle cx="300" cy="140" r="6" />
          <circle cx="330" cy="140" r="6" />
          <circle cx="366" cy="140" r="6" />
        </g>
      </g>

      {/* 柵に結ばれた組合の赤旗 */}
      <g transform="translate(226,88)">
        <rect x="-2" y="0" width="4" height="56" fill="#5a5468" />
        <g className="shue-flag">
          <path d="M2,2 q18,6 34,0 l0,20 q-16,6 -34,0z" fill="#e8443f" />
          <circle cx="14" cy="12" r="4" fill="#f6efe2" opacity="0.9" />
        </g>
      </g>

      {/* ホームの床 */}
      <rect y="144" width="400" height="66" fill="#6e6a7a" />
      <rect y="144" width="400" height="5" fill="#8a8696" />
      <path d="M0,152 h400" stroke="#f5b31c" strokeWidth="3" opacity="0.7" />

      {/* 発車標。ほとんどの行に赤い欠航ランプ */}
      <g transform="translate(96,176)">
        <rect x="-42" y="-64" width="84" height="52" rx="4" fill="#20364a" />
        <rect x="-4" y="-12" width="8" height="12" fill="#4a4456" />
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            <rect x="-34" y={-56 + row * 12} width="36" height="5" rx="2.5" fill="#5a6673" />
            {row === 2 ? (
              <rect x="10" y={-56 + row * 12} width="22" height="5" rx="2.5" fill="#3f8f6f" />
            ) : (
              <circle
                className={`shue-cancel-${row}`}
                cx="20"
                cy={-53.5 + row * 12}
                r="3.4"
                fill="#e8443f"
              />
            )}
          </g>
        ))}
      </g>

      {/* 掲示を見上げて頭をかく旅人 */}
      <g transform="translate(170,198)">
        <rect x="14" y="-18" width="26" height="18" rx="3" fill="#8a5a3a" />
        <rect x="23" y="-22" width="8" height="5" rx="2" fill="#5a3a26" />
        <g className="shue-scratch-body">
          <path d="M-11,-52 h22 l-2,34 h-18z" fill="#3f8f6f" />
          <circle cx="0" cy="-60" r="11" fill="#e8b88a" />
          <path d="M-11,-63 a11,11 0 0 1 22,0 l0,-1 q-11,-7 -22,0z" fill="#241a10" />
          <circle cx="-4" cy="-59" r="2" fill="#241a10" />
          <circle cx="4" cy="-59" r="2" fill="#241a10" />
          <path d="M-3,-52 h6" stroke="#a8654a" strokeWidth="2" strokeLinecap="round" />
          {/* 頭をかく腕 */}
          <g className="shue-scratch-arm">
            <path d="M9,-46 q10,-6 6,-20" stroke="#e8b88a" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
        </g>
        <g fill="#2f2a38">
          <rect x="-8" y="-18" width="6" height="18" />
          <rect x="2" y="-18" width="6" height="18" />
        </g>
      </g>

      {/* 誰もいないホームで鳩がついばむ */}
      <g transform="translate(320,196)">
        <g className="shue-pigeon">
          <ellipse cx="0" cy="-8" rx="9" ry="6" fill="#8a96a4" />
          <circle cx="9" cy="-13" r="4" fill="#6e7a88" />
          <path d="M12,-12 l5,1.5 l-5,1.5z" fill="#f5b31c" />
          <circle cx="10" cy="-14" r="1" fill="#241a10" />
          <path d="M-2,-2 v2 M3,-2 v2" stroke="#c9773f" strokeWidth="1.6" />
        </g>
      </g>

      <style>{`
        .shue-flag { transform-box: fill-box; transform-origin: 0% 50%; animation: shue-wave 2.4s ease-in-out infinite; }
        .shue-cancel-0 { animation: shue-blink 1.6s step-end infinite; }
        .shue-cancel-1 { animation: shue-blink 1.6s step-end infinite; animation-delay: -0.5s; }
        .shue-cancel-3 { animation: shue-blink 1.6s step-end infinite; animation-delay: -1s; }
        .shue-scratch-body { transform-box: fill-box; transform-origin: 50% 100%; animation: shue-sway 3.8s ease-in-out infinite; }
        .shue-scratch-arm { transform-box: fill-box; transform-origin: 0% 100%; animation: shue-scratch 1.3s ease-in-out infinite; }
        .shue-pigeon { transform-box: fill-box; transform-origin: 50% 100%; animation: shue-peck 1.6s ease-in-out infinite; }
        @keyframes shue-wave {
          0%, 100% { transform: skewY(0deg); }
          50% { transform: skewY(-5deg); }
        }
        @keyframes shue-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes shue-sway {
          0%, 100% { transform: rotate(0deg); }
          55% { transform: rotate(-2.5deg); }
        }
        @keyframes shue-scratch {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(9deg); }
        }
        @keyframes shue-peck {
          0%, 60%, 100% { transform: rotate(0deg); }
          75% { transform: rotate(16deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .shue-flag, .shue-cancel-0, .shue-cancel-1, .shue-cancel-3,
          .shue-scratch-body, .shue-scratch-arm, .shue-pigeon { animation: none; }
        }
      `}</style>
    </svg>
  );
}
