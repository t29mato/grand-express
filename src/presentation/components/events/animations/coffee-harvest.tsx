/**
 * ユンガスのコーヒー収穫を手伝い、籠の数だけ日当をもらう。
 *
 * 日陰樹の下の畑で、赤く熟した実を一粒ずつ摘んでは腰の籠へ落としていく。
 */
export function CoffeeHarvest() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空と尾根 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <circle cx="268" cy="30" r="20" fill="#f5b31c" opacity="0.85" />
      <path d="M0,74 L58,42 L118,66 L186,36 L252,62 L318,44 L400,70 L400,110 L0,110z" fill="#6f97a4" />

      {/* 段々になった斜面 */}
      <path d="M0,92 L400,80 L400,126 L0,138z" fill="#4f8a56" />
      <path d="M0,130 L400,118 L400,162 L0,176z" fill="#3f7a48" />
      <path d="M0,168 L400,154 L400,210 L0,210z" fill="#356b3e" />

      {/* 日陰をつくる木 */}
      <g>
        <rect x="26" y="30" width="9" height="76" fill="#6b4629" />
        <ellipse cx="30" cy="26" rx="42" ry="22" fill="#1f5230" />
        <rect x="352" y="26" width="9" height="70" fill="#6b4629" />
        <ellipse cx="357" cy="22" rx="46" ry="24" fill="#1f5230" />
      </g>

      <g transform="translate(70,140)">
        <ellipse cx="0" cy="-6" rx="26" ry="16" fill="#2f6b3f" />
        <ellipse cx="26" cy="-12" rx="20" ry="13" fill="#3a7d49" />
      </g>

      {/* 実をつけたコーヒーの木 */}
      <g transform="translate(132,172)">
        <path d="M-4,8 L-2,-26 L3,-26 L5,8z" fill="#6b4629" />
        <g className="cf-branch">
          <ellipse cx="-36" cy="-16" rx="30" ry="20" fill="#2f6b3f" />
          <ellipse cx="2" cy="-34" rx="36" ry="23" fill="#3a7d49" />
          <ellipse cx="44" cy="-20" rx="28" ry="18" fill="#2f6b3f" />
          <ellipse cx="76" cy="-38" rx="22" ry="14" fill="#3a7d49" />
          <g fill="#e8443f">
            <circle cx="-48" cy="-12" r="4" />
            <circle cx="-30" cy="-24" r="4" />
            <circle cx="-14" cy="-8" r="3.5" />
            <circle cx="-4" cy="-44" r="4" />
            <circle cx="14" cy="-28" r="4" />
            <circle cx="24" cy="-46" r="3.5" />
            <circle cx="40" cy="-14" r="4" />
            <circle cx="56" cy="-30" r="3.5" />
            <circle cx="72" cy="-46" r="4" />
            <circle cx="86" cy="-32" r="4" />
          </g>
          <g fill="#f5b31c" opacity="0.7">
            <circle cx="-40" cy="-34" r="2.5" />
            <circle cx="30" cy="-16" r="2.5" />
            <circle cx="64" cy="-24" r="2.5" />
          </g>
        </g>
      </g>

      {/* 摘み手 */}
      <g transform="translate(262,190)">
        <ellipse cx="0" cy="2" rx="20" ry="6" fill="#22252b" opacity="0.25" />
        <rect x="-10" y="-26" width="9" height="26" rx="3" fill="#4a5b6b" />
        <rect x="2" y="-26" width="9" height="26" rx="3" fill="#4a5b6b" />
        <rect x="-14" y="-60" width="28" height="36" rx="8" fill="#f0e2c4" />
        <path d="M-14,-52 L14,-58" stroke="#c9a877" strokeWidth="4" />
        <circle cx="-2" cy="-70" r="11" fill="#f6efe2" />
        <path d="M-14,-70 Q-2,-84 10,-70 Q-2,-76 -14,-70z" fill="#3b2f4a" />
        <ellipse cx="-2" cy="-78" rx="11" ry="8" fill="#c9a877" />
        <ellipse cx="-2" cy="-74" rx="22" ry="5" fill="#c9a877" />
        {/* 腰の籠 */}
        <g className="cf-basket">
          <path d="M-15,-9 L15,-9 L11,15 L-11,15z" fill="#c9a877" />
          <path d="M-14,-3 L14,-3 M-12.5,5 L12.5,5" stroke="#a8895f" strokeWidth="2" />
          <ellipse cx="0" cy="-9" rx="15" ry="5" fill="#d8b98a" />
          <g fill="#e8443f">
            <circle cx="-8" cy="-12" r="4.5" />
            <circle cx="0" cy="-14" r="5" />
            <circle cx="8" cy="-12" r="4.5" />
            <circle cx="-4" cy="-18" r="4" />
            <circle cx="4" cy="-18" r="4" />
            <circle cx="0" cy="-22" r="3.5" />
          </g>
        </g>
        {/* 実に伸ばす腕 */}
        <g className="cf-pick">
          <rect x="-27" y="-4" width="27" height="9" rx="4" fill="#f0e2c4" />
          <circle cx="-30" cy="0" r="6" fill="#f6efe2" />
        </g>
      </g>

      {/* 籠へ落ちる実 */}
      <g transform="translate(222,132)">
        <g className="cf-drop-a">
          <circle cx="0" cy="0" r="4.5" fill="#e8443f" />
          <circle cx="-1.5" cy="-1.5" r="1.5" fill="#f5b31c" opacity="0.7" />
        </g>
        <g className="cf-drop-b">
          <circle cx="0" cy="0" r="4" fill="#e8443f" />
        </g>
        <g className="cf-drop-c">
          <circle cx="0" cy="0" r="4.5" fill="#e8443f" />
        </g>
      </g>

      <style>{`
        .cf-branch {
          transform-box: fill-box;
          transform-origin: 39% 100%;
          animation: cf-sway 4s ease-in-out infinite;
        }
        .cf-basket {
          transform: translate(-28px, -32px);
          animation: cf-bob 2.4s ease-in-out infinite;
        }
        .cf-pick {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          transform: translate(-12px, -52px) rotate(-16deg);
          animation: cf-reach 2.4s ease-in-out infinite;
        }
        .cf-drop-a, .cf-drop-b, .cf-drop-c {
          transform: translate(9px, 11px);
          animation: cf-fall 2.4s ease-in infinite;
        }
        .cf-drop-b { animation-delay: 0.8s; }
        .cf-drop-c { animation-delay: 1.6s; }
        @keyframes cf-sway {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        @keyframes cf-bob {
          0%, 100% { transform: translate(-28px, -32px); }
          50% { transform: translate(-28px, -29px); }
        }
        @keyframes cf-reach {
          0%, 100% { transform: translate(-12px, -52px) rotate(-22deg); }
          45%, 60% { transform: translate(-12px, -52px) rotate(-8deg); }
        }
        @keyframes cf-fall {
          0% { transform: translate(0, 0); opacity: 0; }
          12% { opacity: 1; }
          58% { transform: translate(16px, 20px); opacity: 1; }
          66% { transform: translate(16px, 20px); opacity: 0; }
          100% { transform: translate(0, 0); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cf-branch, .cf-basket, .cf-pick,
          .cf-drop-a, .cf-drop-b, .cf-drop-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
