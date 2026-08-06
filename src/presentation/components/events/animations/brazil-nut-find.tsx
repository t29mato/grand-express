/**
 * ブラジルナッツの当たり週。
 *
 * 森の巨木から落ちてくる硬い実(ポッド)を拾い集める。割ると中に十数個の種が並んでいる。
 */
export function BrazilNutFind() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 森 */}
      <rect width="400" height="210" fill="#2b5c3f" />
      <rect width="400" height="30" fill="#8fc4e8" />
      <g fill="#17402b">
        <ellipse cx="24" cy="12" rx="52" ry="26" />
        <ellipse cx="104" cy="6" rx="46" ry="24" />
        <ellipse cx="196" cy="10" rx="44" ry="22" />
        <ellipse cx="266" cy="4" rx="40" ry="22" />
        <ellipse cx="348" cy="14" rx="56" ry="26" />
      </g>

      {/* 実をつける巨木 */}
      <path d="M46,0 L92,0 L96,150 L112,172 L28,172 L44,150z" fill="#8a6a4a" />
      <g fill="#6b4629">
        <rect x="54" y="0" width="6" height="150" />
        <rect x="72" y="0" width="4" height="150" />
        <path d="M92,0 L96,150 L112,172 L100,172 L84,148 L82,0z" />
      </g>
      <rect x="336" y="0" width="20" height="164" fill="#6b4629" />
      <g fill="#1f5230">
        <ellipse cx="356" cy="120" rx="34" ry="12" />
        <ellipse cx="20" cy="150" rx="30" ry="14" />
        <ellipse cx="316" cy="152" rx="26" ry="12" />
      </g>

      {/* 林床 */}
      <rect y="164" width="400" height="46" fill="#3c4a2c" />
      <g fill="#4f5f36">
        <ellipse cx="46" cy="184" rx="18" ry="5" />
        <ellipse cx="196" cy="200" rx="22" ry="6" />
        <ellipse cx="330" cy="190" rx="20" ry="5" />
      </g>

      {/* 割れたポッドと中の種 */}
      <g transform="translate(160,182)">
        <ellipse cx="2" cy="8" rx="26" ry="6" fill="#22252b" opacity="0.3" />
        <path d="M-18,-2 A18,16 0 0,0 18,-2z" fill="#6b4a2f" />
        <path d="M-16,-2 A16,13 0 0,0 16,-2z" fill="#a5834f" />
        <g fill="#d8b98a">
          <path d="M-13,-2 L-8,-16 L-3,-2z" />
          <path d="M-5,-2 L0,-18 L5,-2z" />
          <path d="M3,-2 L9,-16 L13,-2z" />
        </g>
        <path d="M22,-4 A14,12 0 0,1 48,-4z" fill="#6b4a2f" />
      </g>

      {/* 拾い集める人 */}
      <g transform="translate(272,184)">
        <ellipse cx="0" cy="4" rx="22" ry="6" fill="#22252b" opacity="0.3" />
        <path d="M-14,0 L-8,-26 L0,-26 L-4,0z" fill="#3b2f4a" />
        <path d="M4,0 L2,-26 L11,-26 L14,0z" fill="#3b2f4a" />
        <g className="bn-bend">
          <path d="M14,-56 L34,-46 L30,-24 L12,-32z" fill="#c9a877" />
          <g fill="#a8895f">
            <circle cx="22" cy="-46" r="5" />
            <circle cx="29" cy="-36" r="5" />
          </g>
          <rect x="-13" y="-58" width="26" height="34" rx="8" fill="#5b8fe8" />
          <circle cx="-4" cy="-68" r="11" fill="#f6efe2" />
          <path d="M-16,-70 A12,12 0 0,1 8,-70z" fill="#f5b31c" />
          <rect x="-20" y="-71" width="30" height="4" rx="2" fill="#f5b31c" />
          <path d="M-12,-52 L-30,-34" stroke="#f6efe2" strokeWidth="7" strokeLinecap="round" />
          <circle cx="-33" cy="-30" r="6" fill="#f6efe2" />
          <circle cx="-38" cy="-24" r="9" fill="#6b4a2f" />
          <path d="M-44,-28 A9,9 0 0,1 -34,-31z" fill="#8a6a4a" />
        </g>
      </g>

      {/* 落ちてくるポッド */}
      <g transform="translate(126,10)">
        <g className="bn-pod-a">
          <circle cx="0" cy="0" r="11" fill="#6b4a2f" />
          <path d="M-8,-6 A11,11 0 0,1 4,-10z" fill="#8a6a4a" />
          <circle cx="0" cy="-8" r="3" fill="#4a3320" />
        </g>
      </g>
      <g transform="translate(210,10)">
        <g className="bn-pod-b">
          <circle cx="0" cy="0" r="9" fill="#6b4a2f" />
          <path d="M-7,-4 A9,9 0 0,1 3,-8z" fill="#8a6a4a" />
        </g>
      </g>
      <g transform="translate(318,10)">
        <g className="bn-pod-c">
          <circle cx="0" cy="0" r="10" fill="#6b4a2f" />
          <path d="M-7,-5 A10,10 0 0,1 4,-9z" fill="#8a6a4a" />
          <circle cx="0" cy="-7" r="2.5" fill="#4a3320" />
        </g>
      </g>

      {/* 落下の土ぼこり */}
      <ellipse className="bn-puff" cx="128" cy="180" rx="16" ry="5" fill="#c9a877" />

      <style>{`
        .bn-bend {
          transform-box: fill-box;
          transform-origin: 48% 96%;
          transform: rotate(-12deg);
          animation: bn-stoop 3.2s ease-in-out infinite;
        }
        .bn-pod-a, .bn-pod-b, .bn-pod-c {
          transform: translate(2px, 96px);
          animation: bn-drop 2.8s cubic-bezier(0.5, 0, 0.9, 0.6) infinite;
        }
        .bn-pod-b { animation-delay: 1.1s; }
        .bn-pod-c { animation-delay: 1.9s; }
        .bn-puff {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          opacity: 0.35;
          animation: bn-dust 2.8s ease-out infinite;
        }
        @keyframes bn-stoop {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes bn-drop {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          78% { transform: translate(6px, 168px) rotate(160deg); opacity: 1; }
          86% { transform: translate(6px, 168px) rotate(160deg); opacity: 0; }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
        }
        @keyframes bn-dust {
          0%, 74% { transform: scale(0.2); opacity: 0; }
          82% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bn-bend, .bn-pod-a, .bn-pod-b, .bn-pod-c, .bn-puff { animation: none; }
        }
      `}</style>
    </svg>
  );
}
