/**
 * 8月・国じゅうが休みに入る。
 *
 * シャッターは軒並み下りていて、パン屋の扉には「今月開けている店」の貼り紙だけ。
 * 荷物を積んだ車が一台、街を出ていく。日ざしに舗石が揺れる。
 * 通りの隅では、厄災の神まで鎌を立てかけて寝椅子で眠っている。
 */
export function France04() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 白っぽい真夏の空 */}
      <rect width="400" height="210" fill="#cfe6f5" />
      <circle cx="60" cy="26" r="22" fill="#fbe9a8" opacity="0.55" />
      <circle cx="60" cy="26" r="13" fill="#fdf3c8" />

      {/* 通りの建物 */}
      <rect y="34" width="400" height="128" fill="#e6dcc6" />
      <rect y="34" width="400" height="8" fill="#c8bb9e" />
      <g fill="#d5c9ae">
        <rect x="112" y="42" width="6" height="120" />
        <rect x="238" y="42" width="6" height="120" />
      </g>

      {/* 下りたシャッター */}
      <g>
        <rect x="16" y="86" width="82" height="76" rx="3" fill="#9aa2a8" />
        <g stroke="#7d868d" strokeWidth="2">
          <path d="M16,94 h82 M16,102 h82 M16,110 h82 M16,118 h82 M16,126 h82 M16,134 h82 M16,142 h82 M16,150 h82 M16,158 h82" />
        </g>
        <rect x="258" y="86" width="82" height="76" rx="3" fill="#9aa2a8" />
        <g stroke="#7d868d" strokeWidth="2">
          <path d="M258,94 h82 M258,102 h82 M258,110 h82 M258,118 h82 M258,126 h82 M258,134 h82 M258,142 h82 M258,150 h82 M258,158 h82" />
        </g>
      </g>

      {/* 開いている一軒のパン屋。扉に貼り紙 */}
      <g transform="translate(178,162)">
        <rect x="-48" y="-80" width="96" height="80" fill="#c98f3a" />
        <rect x="-48" y="-80" width="96" height="10" fill="#a8722a" />
        <rect x="-40" y="-62" width="34" height="42" rx="2" fill="#fbe9a8" />
        <rect x="6" y="-62" width="34" height="62" rx="2" fill="#8a5f22" />
        {/* 貼り紙 */}
        <g className="f04-notice">
          <rect x="12" y="-52" width="22" height="26" rx="1.5" fill="#fdfaf0" />
          <g stroke="#c0b7a2" strokeWidth="1.6" strokeLinecap="round">
            <path d="M16,-46 h14 M16,-41 h14 M16,-36 h9" />
          </g>
        </g>
        {/* 棚のパン */}
        <g fill="#d9a349">
          <ellipse cx="-30" cy="-46" rx="8" ry="4" />
          <ellipse cx="-14" cy="-46" rx="8" ry="4" />
          <ellipse cx="-30" cy="-34" rx="8" ry="4" />
          <ellipse cx="-14" cy="-34" rx="8" ry="4" />
        </g>
      </g>

      {/* 舗道 */}
      <rect y="162" width="400" height="48" fill="#c4bcac" />
      <rect y="162" width="400" height="5" fill="#a49b8a" />

      {/* 日ざしの揺らぎ */}
      <g fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.4">
        <path className="f04-heat" d="M60,178 q10,-5 20,0 q10,5 20,0" />
        <path className="f04-heat f04-heat2" d="M180,190 q10,-5 20,0 q10,5 20,0" />
        <path className="f04-heat f04-heat3" d="M290,182 q10,-5 20,0 q10,5 20,0" />
      </g>

      {/* 荷物を積んで出ていく車 */}
      <g transform="translate(0,188)">
        <g className="f04-car">
          <rect x="-34" y="-30" width="30" height="9" rx="2" fill="#5b8fe8" />
          <rect x="-30" y="-36" width="20" height="7" rx="2" fill="#e8443f" />
          <path d="M-40,-20 q6,-10 18,-11 l24,0 q10,2 16,11z" fill="#f5b31c" />
          <rect x="-42" y="-20" width="86" height="14" rx="4" fill="#e8a318" />
          <path d="M-20,-21 q4,-7 12,-8 l14,0 q6,1 10,8z" fill="#bcdcf2" />
          <circle cx="-24" cy="-4" r="7" fill="#2a2233" />
          <circle cx="-24" cy="-4" r="3" fill="#6b6478" />
          <circle cx="26" cy="-4" r="7" fill="#2a2233" />
          <circle cx="26" cy="-4" r="3" fill="#6b6478" />
        </g>
      </g>

      {/* 寝椅子で眠る厄災の神。鎌は壁に立てかけたまま */}
      <g transform="translate(348,204)">
        {/* 立てかけた鎌 */}
        <path d="M18,0 L32,-56" stroke="#8a6b3e" strokeWidth="4" strokeLinecap="round" />
        <path d="M32,-56 q-18,3 -22,16" stroke="#c4ccd2" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* 寝椅子 */}
        <path d="M-26,0 L4,-38" stroke="#c9954a" strokeWidth="4" strokeLinecap="round" />
        <path d="M12,0 L-12,-20" stroke="#c9954a" strokeWidth="4" strokeLinecap="round" />
        <path d="M-22,-4 L1,-33 L11,-26 L-11,-1z" fill="#7bc86c" />
        <g stroke="#f4f1e8" strokeWidth="2.5">
          <path d="M-16,-2 L5,-29 M-7,-1 L13,-26" />
        </g>
        {/* 眠っている本人 */}
        <g className="f04-nap">
          <path d="M-16,-8 q12,-14 22,-20 q7,4 4,10 q-9,8 -20,14z" fill="#3b2f4a" />
          <circle cx="9" cy="-30" r="8.5" fill="#4a3b5e" />
          <path d="M1,-32 q8,-10 16,-2 q1,-10 -8,-10 q-8,0 -8,12z" fill="#2a2233" />
        </g>
      </g>

      {/* 日なたで寝る猫 */}
      <g transform="translate(228,206)">
        <ellipse cx="0" cy="-6" rx="18" ry="8" fill="#d9a349" />
        <circle cx="-16" cy="-10" r="7" fill="#d9a349" />
        <path d="M-21,-15 l2,-6 l5,4z M-13,-16 l4,-5 l2,6z" fill="#d9a349" />
        <path className="f04-tail" d="M17,-8 q12,-2 10,-12" stroke="#d9a349" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>

      <style>{`
        .f04-car {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f04-leave 10s ease-in infinite;
        }
        .f04-heat { animation: f04-shimmer 3.4s ease-in-out infinite; }
        .f04-heat2 { animation-delay: 1.1s; animation-duration: 4s; }
        .f04-heat3 { animation-delay: 2.2s; animation-duration: 3s; }
        .f04-notice {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: f04-flutter 4.6s ease-in-out infinite;
        }
        .f04-nap {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f04-breathe 5.2s ease-in-out infinite;
        }
        .f04-tail {
          transform-box: fill-box; transform-origin: 0 100%;
          animation: f04-flick 4.4s ease-in-out infinite;
        }
        @keyframes f04-leave {
          0% { transform: translateX(70px); opacity: 0; }
          8% { opacity: 1; }
          78% { opacity: 1; }
          100% { transform: translateX(452px); opacity: 0; }
        }
        @keyframes f04-shimmer {
          0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.18; }
          50% { transform: translateY(-4px) scaleX(1.14); opacity: 0.45; }
        }
        @keyframes f04-flutter {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes f04-breathe {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.07); }
        }
        @keyframes f04-flick {
          0%, 70%, 100% { transform: rotate(0deg); }
          80% { transform: rotate(-22deg); }
          90% { transform: rotate(12deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .f04-car, .f04-heat, .f04-notice, .f04-nap, .f04-tail { animation: none; }
        }
      `}</style>
    </svg>
  );
}
