/**
 * ソローチェ(高山病)。
 *
 * 薄い空気に頭を割られ、一行はよりによって逆方向の汽車に押し込まれる。
 *   - 旅人の頭のまわりを星がぐるぐる回り、体はふらつく
 *   - 連れが背中を押して、開いたドアへ乗せてしまう
 *   - 道標の矢印は左を向いているのに、汽車は右へ出ていく
 */
export function BoliviaSoroche() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄い空気の空 */}
      <rect width="400" height="210" fill="#5f80a2" />
      <rect y="58" width="400" height="18" fill="#7093b4" />
      <rect y="76" width="400" height="16" fill="#88a8c4" />
      <g fill="#4a6480">
        <path d="M0,104 L46,56 L92,104z" />
        <path d="M74,104 L136,44 L198,104z" />
        <path d="M182,104 L236,60 L290,104z" />
        <path d="M276,104 L332,50 L388,104z" />
      </g>
      <g fill="#e4eef4">
        <path d="M124,58 L136,44 L148,58 L140,54 L132,56z" />
        <path d="M322,64 L332,50 L344,64 L336,60 L328,62z" />
      </g>

      {/* 駅の地面と線路 */}
      <rect y="102" width="400" height="108" fill="#6b5a44" />
      <g fill="#5c4d3a">
        <ellipse cx="46" cy="116" rx="30" ry="6" />
        <ellipse cx="300" cy="114" rx="34" ry="6" />
      </g>
      <g fill="#4f4234">
        <rect x="4" y="146" width="20" height="16" />
        <rect x="44" y="146" width="20" height="16" />
        <rect x="84" y="146" width="20" height="16" />
        <rect x="124" y="146" width="20" height="16" />
        <rect x="164" y="146" width="20" height="16" />
      </g>
      <g fill="#8f8a80">
        <rect y="146" width="400" height="4" />
        <rect y="158" width="400" height="4" />
      </g>
      <rect y="176" width="400" height="34" fill="#5c4d3a" />

      {/* 逆方向を指す道標 */}
      <g>
        <rect x="56" y="112" width="7" height="72" fill="#7d6a58" />
        <path d="M78,100 L78,122 L36,122 L22,111 L36,100z" fill="#f6efe2" />
        <path d="M40,106 L28,111 L40,116z" fill="#4a6480" />
        <rect x="44" y="108" width="28" height="6" rx="3" fill="#4a6480" />
      </g>

      {/* 出ていく汽車 */}
      <g className="bsor-train">
        <rect x="186" y="66" width="214" height="10" rx="4" fill="#33495f" />
        <rect x="192" y="74" width="208" height="72" rx="6" fill="#4a6a8a" />
        <rect x="192" y="112" width="208" height="9" fill="#f0e6d2" />
        <g fill="#a9d0ea">
          <rect x="246" y="84" width="26" height="22" rx="3" />
          <rect x="282" y="84" width="26" height="22" rx="3" />
          <rect x="318" y="84" width="26" height="22" rx="3" />
          <rect x="354" y="84" width="26" height="22" rx="3" />
        </g>
        <rect x="204" y="80" width="34" height="66" fill="#25313f" />
        <rect x="200" y="144" width="42" height="7" rx="2" fill="#33495f" />
        <rect x="352" y="48" width="17" height="20" rx="2" fill="#33495f" />
        <g fill="#1f1f24">
          <circle cx="258" cy="152" r="12" />
          <circle cx="316" cy="152" r="12" />
          <circle cx="374" cy="152" r="12" />
        </g>
        <g fill="#6b6f78">
          <circle className="bsor-wheel bsor-wheel-a" cx="258" cy="152" r="5" />
          <circle className="bsor-wheel bsor-wheel-b" cx="316" cy="152" r="5" />
          <circle className="bsor-wheel bsor-wheel-c" cx="374" cy="152" r="5" />
        </g>
      </g>

      {/* 煙 */}
      <g fill="#dfe6ec">
        <g className="bsor-steam bsor-steam-a" opacity="0.8">
          <circle cx="344" cy="36" r="12" />
          <circle cx="360" cy="42" r="9" />
        </g>
        <g className="bsor-steam bsor-steam-b" opacity="0.6">
          <circle cx="316" cy="20" r="14" />
          <circle cx="334" cy="26" r="10" />
        </g>
        <g className="bsor-steam bsor-steam-c" opacity="0.4">
          <circle cx="288" cy="10" r="15" />
        </g>
      </g>

      {/* 背中を押す連れ */}
      <g transform="translate(126,190)">
        <rect x="-11" y="-20" width="8" height="20" rx="3" fill="#3a2f26" />
        <rect x="1" y="-20" width="8" height="20" rx="3" fill="#3a2f26" />
        <rect x="-12" y="-48" width="24" height="30" rx="7" fill="#8a4a3f" />
        <circle cx="0" cy="-56" r="11" fill="#c98a5e" />
        <path d="M-12,-58 a12,12 0 0 1 24,0z" fill="#2a2028" />
        <rect x="-15" y="-66" width="30" height="6" rx="3" fill="#2f8f5b" />
        <rect className="bsor-push" x="10" y="-46" width="26" height="8" rx="4" fill="#8a4a3f" />
      </g>
      <g transform="translate(88,192)">
        <rect x="-10" y="-18" width="8" height="18" rx="3" fill="#4a3f52" />
        <rect x="1" y="-18" width="8" height="18" rx="3" fill="#4a3f52" />
        <rect x="-11" y="-44" width="22" height="28" rx="6" fill="#3f6bb0" />
        <circle cx="0" cy="-52" r="10" fill="#c98a5e" />
        <path d="M-11,-54 a11,11 0 0 1 22,0z" fill="#2a2028" />
        <rect x="-14" y="-62" width="28" height="6" rx="3" fill="#2a2028" />
        <g className="bsor-bag">
          <rect x="-30" y="-36" width="22" height="18" rx="4" fill="#2f8f5b" />
          <rect x="-24" y="-40" width="10" height="6" rx="3" fill="#256f47" />
        </g>
      </g>

      {/* ふらつく旅人 */}
      <g transform="translate(176,188)">
        <g className="bsor-wobble">
          <rect x="-10" y="-20" width="8" height="20" rx="3" fill="#2e2a38" />
          <rect x="2" y="-20" width="8" height="20" rx="3" fill="#2e2a38" />
          <rect x="-13" y="-50" width="26" height="32" rx="7" fill="#f5b31c" />
          <rect x="-22" y="-46" width="10" height="22" rx="5" fill="#f5b31c" transform="rotate(-18 -17 -35)" />
          <circle cx="0" cy="-60" r="12" fill="#f6efe2" />
          <path d="M-12,-62 a12,12 0 0 1 24,0z" fill="#5a4230" />
          <g fill="none" stroke="#3b2f2a" strokeWidth="1.8" strokeLinecap="round">
            <path d="M-5,-64 a4,4 0 1 1 -4,4 a2,2 0 1 0 2,-2" />
            <path d="M6,-64 a4,4 0 1 1 -4,4 a2,2 0 1 0 2,-2" />
            <path d="M-6,-50 q6,-5 12,0" strokeWidth="2" />
          </g>
        </g>
      </g>

      {/* 目が回る */}
      <g transform="translate(176,128)">
        <g className="bsor-orbit bsor-orbit-a">
          <circle cx="0" cy="0" r="24" fill="none" />
          <path d="M0,-30 L3,-25 L9,-24 L4,-20 L6,-14 L0,-17 L-6,-14 L-4,-20 L-9,-24 L-3,-25z" fill="#f5b31c" />
        </g>
        <g className="bsor-orbit bsor-orbit-b">
          <circle cx="0" cy="0" r="24" fill="none" />
          <path d="M-26,10 L-23,14 L-18,15 L-22,18 L-20,23 L-26,21 L-31,23 L-30,18 L-34,15 L-29,14z" fill="#f0e6d2" />
        </g>
        <g className="bsor-orbit bsor-orbit-c">
          <circle cx="0" cy="0" r="24" fill="none" />
          <path d="M26,10 L29,14 L34,15 L30,18 L32,23 L26,21 L21,23 L22,18 L18,15 L23,14z" fill="#e05252" />
        </g>
      </g>

      {/* 白い息 */}
      <g fill="#f0f6fa">
        <circle className="bsor-breath bsor-breath-a" cx="196" cy="132" r="5" />
        <circle className="bsor-breath bsor-breath-b" cx="202" cy="134" r="4" />
      </g>

      {/* 落とした帽子 */}
      <g transform="translate(66,196)">
        <ellipse cx="0" cy="2" rx="16" ry="5" fill="#4a3f2c" />
        <path d="M-9,1 a9,8 0 0 1 18,0z" fill="#5a4a34" />
      </g>

      <style>{`
        .bsor-train { transform-box: fill-box; transform-origin: 50% 100%; animation: bsor-depart 2.2s ease-in-out infinite; }
        .bsor-wheel { transform-box: fill-box; transform-origin: 50% 50%; }
        .bsor-wheel-a { animation: bsor-turn 1.4s linear infinite; }
        .bsor-wheel-b { animation: bsor-turn 1.4s linear infinite; animation-delay: -0.4s; }
        .bsor-wheel-c { animation: bsor-turn 1.4s linear infinite; animation-delay: -0.8s; }
        .bsor-steam { transform-box: fill-box; transform-origin: 50% 100%; }
        .bsor-steam-a { animation: bsor-puff 3.4s ease-out infinite; }
        .bsor-steam-b { animation: bsor-puff 3.4s ease-out infinite; animation-delay: -1.2s; }
        .bsor-steam-c { animation: bsor-puff 3.4s ease-out infinite; animation-delay: -2.3s; }
        .bsor-wobble { transform-box: fill-box; transform-origin: 50% 100%; animation: bsor-sway 2.6s ease-in-out infinite; }
        .bsor-orbit { transform-box: fill-box; transform-origin: 50% 50%; }
        .bsor-orbit-a { animation: bsor-spin 2.4s linear infinite; }
        .bsor-orbit-b { animation: bsor-spin 2.4s linear infinite; animation-delay: -0.8s; }
        .bsor-orbit-c { animation: bsor-spin 2.4s linear infinite; animation-delay: -1.6s; }
        .bsor-push { transform-box: fill-box; transform-origin: 0 50%; animation: bsor-shove 1.8s ease-in-out infinite; }
        .bsor-bag { transform-box: fill-box; transform-origin: 100% 100%; animation: bsor-jog 1.8s ease-in-out infinite; }
        .bsor-breath { transform-box: fill-box; transform-origin: 50% 50%; }
        .bsor-breath-a { animation: bsor-gasp 2.2s ease-out infinite; }
        .bsor-breath-b { animation: bsor-gasp 2.2s ease-out infinite; animation-delay: -1.1s; }
        @keyframes bsor-depart {
          0%, 100% { transform: translate(0, 0); }
          35% { transform: translate(4px, -1px); }
          70% { transform: translate(-2px, 1px); }
        }
        @keyframes bsor-turn {
          from { transform: rotate(0deg) translateY(0); }
          to { transform: rotate(360deg) translateY(0); }
        }
        @keyframes bsor-puff {
          0% { transform: translate(20px, 46px) scale(0.3); opacity: 0; }
          25% { opacity: 0.8; }
          100% { transform: translate(-38px, -22px) scale(1.7); opacity: 0; }
        }
        @keyframes bsor-sway {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes bsor-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bsor-shove {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.35); }
        }
        @keyframes bsor-jog {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes bsor-gasp {
          0% { transform: translate(0, 0) scale(0.3); opacity: 0; }
          30% { opacity: 0.85; }
          100% { transform: translate(18px, -12px) scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bsor-train, .bsor-wheel-a, .bsor-wheel-b, .bsor-wheel-c, .bsor-steam-a, .bsor-steam-b,
          .bsor-steam-c, .bsor-wobble, .bsor-orbit-a, .bsor-orbit-b, .bsor-orbit-c, .bsor-push,
          .bsor-bag, .bsor-breath-a, .bsor-breath-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
