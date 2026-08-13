/**
 * 走り抜ける人波にビーチバッグをさらわれる。突然の人の群れが
 * 砂浜を駆け抜け、タオルのそばに置いていたバッグが消える。
 *
 * 人を細部まで描かず、**走り抜ける脚のシルエットの列**と
 * **連れ去られるバッグ**で出来事を表す。動くのは脚とバッグだけ。
 */
export function BrazilArrastao() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 浜辺の空と海。 */}
      <rect width="400" height="210" fill="#f2ecd8" />
      <rect y="0" width="400" height="70" fill="#8fc4e8" />
      <rect y="70" width="400" height="50" fill="#1e8ea8" />
      <circle cx="340" cy="40" r="18" fill="#f5b31c" />

      {/* 砂浜。 */}
      <rect y="120" width="400" height="90" fill="#e8dcc0" />
      <g stroke="#d9c8a0" strokeWidth="1.4" opacity="0.7">
        <path d="M0,140 h60M120,150 h50M300,145 h60" />
      </g>

      {/* タオルとパラソル(残されたまま)。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="160" width="50" height="24" rx="2" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <rect x="60" y="160" width="50" height="6" fill="#f6efe2" />
      </g>
      <g>
        <path d="M150,180 a22,10 0 0 1 44,0z" fill="#e8443f" stroke="#20364a" strokeWidth="2" />
        <line x1="172" y1="180" x2="172" y2="206" stroke="#6b5330" strokeWidth="3" />
      </g>

      {/* 走り抜ける人影の列(脚だけの簡略シルエット)。 */}
      <g className="bra-runner1">
        <ellipse cx="0" cy="0" rx="7" ry="9" fill="#4a4436" />
        <path d="M-4,8 L-10,26 M4,8 L10,24" stroke="#4a4436" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g className="bra-runner2">
        <ellipse cx="0" cy="0" rx="6" ry="8" fill="#5a4436" />
        <path d="M-3,7 L-9,24 M3,7 L9,22" stroke="#5a4436" strokeWidth="4.4" strokeLinecap="round" />
      </g>
      <g className="bra-runner3">
        <ellipse cx="0" cy="0" rx="7" ry="9" fill="#3a342e" />
        <path d="M-4,8 L-11,25 M4,8 L11,23" stroke="#3a342e" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* さらわれるバッグ。 */}
      <g className="bra-bag" strokeLinejoin="round">
        <path d="M-14,0 L14,0 L11,20 L-11,20z" fill="#8a5a3a" stroke="#20364a" strokeWidth="2" />
        <path d="M-8,0 q8,-14 16,0" fill="none" stroke="#20364a" strokeWidth="2" />
      </g>

      <style>{`
        .bra-runner1, .bra-runner2, .bra-runner3, .bra-bag {
          transform-box: fill-box;
          transform-origin: 0 0;
        }
        .bra-runner1 { animation: bra-run1 1.2s linear infinite; }
        .bra-runner2 { animation: bra-run2 1.1s linear infinite; animation-delay: 0.15s; }
        .bra-runner3 { animation: bra-run3 1.3s linear infinite; animation-delay: 0.3s; }
        .bra-bag { animation: bra-bag-snatch 1.2s ease-in infinite; }
        @keyframes bra-run1 {
          0% { transform: translate(-20px,178px); }
          100% { transform: translate(420px,178px); }
        }
        @keyframes bra-run2 {
          0% { transform: translate(-30px,190px); }
          100% { transform: translate(410px,190px); }
        }
        @keyframes bra-run3 {
          0% { transform: translate(-40px,182px); }
          100% { transform: translate(430px,182px); }
        }
        @keyframes bra-bag-snatch {
          0% { transform: translate(130px,192px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate(400px,170px) rotate(60deg); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bra-runner1, .bra-runner2, .bra-runner3 { animation: none; opacity: 0; }
          .bra-bag { animation: none; transform: translate(300px,175px) rotate(30deg); }
        }
      `}</style>
    </svg>
  );
}
