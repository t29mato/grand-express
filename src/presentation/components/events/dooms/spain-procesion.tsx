/**
 * 行列で道が封鎖される。セマナ・サンタの行列や祭りで大通りが
 * 歩行者に占拠され、駅にたどり着けない。
 *
 * 蝋燭を灯した山車(パソ)が通りをゆっくり渡り、担ぎ手の足だけが
 * 幕の下に覗く。見物の人垣の後ろで、旅人が爪先立ちで様子をうかがう。
 *
 * 動き: パソの揺れと担ぎ手の足踏み・蝋燭の炎のまたたき・
 * 旅人の爪先立ち・人垣の小さな揺れ。
 */
export function SpainProcesion() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 宵の空と通り */}
      <rect width="400" height="210" fill="#2a3543" />
      <rect width="400" height="80" fill="#20364a" />
      <circle cx="60" cy="30" r="12" fill="#f6efe2" opacity="0.85" />

      {/* 通りの建物。窓から見物の灯 */}
      <g fill="#3d4a58">
        <rect x="0" y="36" width="150" height="90" />
        <rect x="250" y="30" width="150" height="96" />
      </g>
      <g fill="#f5b31c" opacity="0.6">
        <rect x="16" y="48" width="14" height="18" rx="2" />
        <rect x="52" y="48" width="14" height="18" rx="2" />
        <rect x="104" y="48" width="14" height="18" rx="2" />
        <rect x="268" y="44" width="14" height="18" rx="2" />
        <rect x="306" y="44" width="14" height="18" rx="2" />
        <rect x="356" y="44" width="14" height="18" rx="2" />
      </g>
      {/* バルコニーから見下ろす人影 */}
      <g fill="#241a10">
        <circle cx="59" cy="52" r="4" />
        <rect x="52" y="56" width="14" height="10" rx="3" />
        <circle cx="313" cy="48" r="4" />
        <rect x="306" y="52" width="14" height="10" rx="3" />
      </g>

      {/* 路面 */}
      <rect y="126" width="400" height="84" fill="#4a4f56" />

      {/* パソ(山車)。金の燭台と天蓋、幕の下に担ぎ手の足 */}
      <g transform="translate(150,104)">
        <g className="spro-paso">
          {/* 天蓋 */}
          <rect x="-64" y="-52" width="128" height="8" fill="#5a2a5f" />
          <path d="M-64,-52 h128 l-6,-8 h-116z" fill="#7a3a7f" />
          <g stroke="#f4c430" strokeWidth="2" fill="none">
            <path d="M-58,-44 v10 M58,-44 v10" />
          </g>
          {/* 像の台と衣(具体的な聖像は描かず、衣の形だけ) */}
          <path d="M-10,-46 q10,-14 20,0 l4,18 h-28z" fill="#7a3a7f" />
          <circle cx="0" cy="-48" r="6" fill="#f4c430" opacity="0.9" />
          {/* 山車の台 */}
          <rect x="-70" y="-28" width="140" height="22" fill="#8a5a3a" />
          <rect x="-70" y="-28" width="140" height="5" fill="#a8825f" />
          <g fill="#f4c430">
            <rect x="-62" y="-40" width="4" height="12" />
            <rect x="-38" y="-40" width="4" height="12" />
            <rect x="34" y="-40" width="4" height="12" />
            <rect x="58" y="-40" width="4" height="12" />
          </g>
          {/* 蝋燭の炎 */}
          <g className="spro-flames" fill="#f5b31c">
            <ellipse cx="-60" cy="-44" rx="2.4" ry="4" />
            <ellipse cx="-36" cy="-44" rx="2.4" ry="4" />
            <ellipse cx="36" cy="-44" rx="2.4" ry="4" />
            <ellipse cx="60" cy="-44" rx="2.4" ry="4" />
          </g>
          {/* 幕 */}
          <path d="M-70,-6 h140 v20 q-70,8 -140,0z" fill="#4a2a4f" />
        </g>
        {/* 担ぎ手の足(幕の下)。左右で互い違いに踏む */}
        <g fill="#241a10">
          <g className="spro-feet-a">
            <rect x="-58" y="14" width="7" height="12" rx="3" />
            <rect x="-22" y="15" width="7" height="12" rx="3" />
            <rect x="14" y="14" width="7" height="12" rx="3" />
            <rect x="50" y="15" width="7" height="12" rx="3" />
          </g>
          <g className="spro-feet-b">
            <rect x="-40" y="15" width="7" height="12" rx="3" />
            <rect x="-4" y="14" width="7" height="12" rx="3" />
            <rect x="32" y="15" width="7" height="12" rx="3" />
          </g>
        </g>
      </g>

      {/* 見物の人垣(手前。後ろ姿のシルエット) */}
      <g>
        <g className="spro-crowd-a">
          <g fill="#33404f">
            <circle cx="40" cy="152" r="12" />
            <rect x="26" y="164" width="28" height="46" rx="8" />
          </g>
          <g fill="#3d4a58">
            <circle cx="120" cy="158" r="13" />
            <rect x="105" y="170" width="30" height="40" rx="8" />
          </g>
          <g fill="#2f3a47">
            <circle cx="200" cy="154" r="12" />
            <rect x="186" y="166" width="28" height="44" rx="8" />
          </g>
        </g>
        <g className="spro-crowd-b">
          <g fill="#38434f">
            <circle cx="80" cy="162" r="12" />
            <rect x="66" y="174" width="28" height="36" rx="8" />
          </g>
          <g fill="#2c3844">
            <circle cx="160" cy="164" r="12" />
            <rect x="146" y="176" width="28" height="34" rx="8" />
          </g>
          <g fill="#33404f">
            <circle cx="252" cy="160" r="12" />
            <rect x="238" y="172" width="28" height="38" rx="8" />
          </g>
        </g>
      </g>

      {/* 旅人(右端)。鞄を提げ、爪先立ちで行列の向こうを見ようとする */}
      <g transform="translate(340,210)">
        <g className="spro-tiptoe">
          <rect x="-22" y="-30" width="18" height="22" rx="3" fill="#c9773f" />
          <path d="M-9,-46 h20 l-2,30 h-16z" fill="#3f6f8a" />
          <circle cx="1" cy="-55" r="11" fill="#d9a273" />
          <path d="M-10,-58 a11,11 0 0 1 22,0 l0,-1 q-11,-7 -22,0z" fill="#6e553c" />
          <circle cx="-3" cy="-54" r="2" fill="#241a10" />
          <path d="M-14,-40 q-6,-4 -6,-10" stroke="#d9a273" strokeWidth="5" fill="none" strokeLinecap="round" />
          <g fill="#20364a">
            <rect x="-6" y="-16" width="6" height="14" />
            <rect x="4" y="-16" width="6" height="14" />
          </g>
        </g>
      </g>

      <style>{`
        .spro-paso { transform-box: fill-box; transform-origin: 50% 100%; animation: spro-rock 2.2s ease-in-out infinite; }
        .spro-flames { animation: spro-flicker 0.9s ease-in-out infinite; }
        .spro-feet-a { animation: spro-step 1.1s ease-in-out infinite; }
        .spro-feet-b { animation: spro-step 1.1s ease-in-out infinite; animation-delay: -0.55s; }
        .spro-crowd-a { transform-box: fill-box; transform-origin: 50% 100%; animation: spro-mill 3.4s ease-in-out infinite; }
        .spro-crowd-b { transform-box: fill-box; transform-origin: 50% 100%; animation: spro-mill 3.4s ease-in-out infinite; animation-delay: -1.7s; }
        .spro-tiptoe { transform-box: fill-box; transform-origin: 50% 100%; animation: spro-hop 1.8s ease-in-out infinite; }
        @keyframes spro-rock {
          0%, 100% { transform: rotate(-1.2deg); }
          50% { transform: rotate(1.2deg); }
        }
        @keyframes spro-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        @keyframes spro-step {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes spro-mill {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes spro-hop {
          0%, 55%, 100% { transform: translateY(0); }
          70%, 85% { transform: translateY(-6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .spro-paso, .spro-flames, .spro-feet-a, .spro-feet-b,
          .spro-crowd-a, .spro-crowd-b, .spro-tiptoe { animation: none; }
        }
      `}</style>
    </svg>
  );
}
