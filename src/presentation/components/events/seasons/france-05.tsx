/**
 * 9月・ラントレ(新学期)。
 *
 * 同じ月曜に学校も仕事も出版も一斉に動き出す。校門にはランドセルを背負った
 * 子どもの列ができ、文房具屋の棚は空になり、書店の平台には秋の小説が
 * 次から次へと積み上がっていく。
 */
export function France05() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 秋口の空 */}
      <rect width="400" height="210" fill="#c3dced" />
      <g fill="#e6f1f8">
        <ellipse className="f05-cloud" cx="120" cy="24" rx="46" ry="13" />
        <ellipse className="f05-cloud f05-cloud2" cx="316" cy="18" rx="40" ry="12" />
      </g>

      {/* 街路樹(色づきはじめ) */}
      <g transform="translate(212,150)">
        <rect x="-4" y="-38" width="8" height="38" fill="#6b4a2a" />
        <g className="f05-tree">
          <circle cx="0" cy="-52" r="24" fill="#7f9c46" />
          <circle cx="-18" cy="-42" r="15" fill="#93a94f" />
          <circle cx="18" cy="-44" r="16" fill="#c2a24a" />
        </g>
      </g>

      {/* 校舎 */}
      <g transform="translate(88,150)">
        <rect x="-80" y="-96" width="160" height="96" fill="#d8c9ae" />
        <rect x="-80" y="-96" width="160" height="9" fill="#b8a889" />
        <path d="M-24,-96 L24,-96 L18,-116 L-18,-116z" fill="#b8a889" />
        <circle cx="0" cy="-106" r="7" fill="#f4f1e8" />
        <path d="M0,-110 v4 h4" stroke="#5a5044" strokeWidth="2" strokeLinecap="round" fill="none" />
        <g fill="#8fb0c6">
          <rect x="-66" y="-78" width="22" height="26" rx="2" />
          <rect x="-34" y="-78" width="22" height="26" rx="2" />
          <rect x="14" y="-78" width="22" height="26" rx="2" />
          <rect x="46" y="-78" width="22" height="26" rx="2" />
        </g>
        {/* 開いた校門 */}
        <rect x="-22" y="-44" width="44" height="44" fill="#4a4030" />
        <g className="f05-gate">
          <rect x="-46" y="-46" width="22" height="46" rx="2" fill="#6b7f92" />
          <g stroke="#8fa2b4" strokeWidth="2">
            <path d="M-40,-42 v42 M-34,-42 v42 M-28,-42 v42" />
          </g>
        </g>
        <g className="f05-gate f05-gate2">
          <rect x="24" y="-46" width="22" height="46" rx="2" fill="#6b7f92" />
          <g stroke="#8fa2b4" strokeWidth="2">
            <path d="M30,-42 v42 M36,-42 v42 M42,-42 v42" />
          </g>
        </g>
      </g>

      {/* 文房具屋と書店。棚はもう空に近い */}
      <g transform="translate(330,150)">
        <rect x="-72" y="-92" width="144" height="92" fill="#a85f4a" />
        <rect x="-72" y="-92" width="144" height="9" fill="#8a4a38" />
        <rect x="-58" y="-74" width="116" height="54" rx="3" fill="#eef3f6" />
        <rect x="-58" y="-74" width="116" height="54" rx="3" fill="none" stroke="#7d4433" strokeWidth="4" />
        <g stroke="#c8bda6" strokeWidth="3">
          <path d="M-52,-58 h104 M-52,-42 h104" />
        </g>
        {/* 売り切れた棚に残る最後の一本 */}
        <g className="f05-lastpen">
          <rect x="-44" y="-68" width="5" height="10" rx="2.5" fill="#e8443f" />
        </g>
        <rect x="30" y="-52" width="5" height="10" rx="2.5" fill="#5b8fe8" />
        <rect x="-14" y="-36" width="5" height="10" rx="2.5" fill="#f5b31c" />
        <rect x="-30" y="-20" width="60" height="20" fill="#7d4433" />
      </g>

      {/* 地面 */}
      <rect y="150" width="400" height="60" fill="#a8a08e" />
      <rect y="150" width="400" height="5" fill="#8b8371" />

      {/* 校門へ入っていく子ども。鞄を背負っている */}
      <g className="f05-kid">
        <g transform="translate(0,196)">
          <path d="M-11,0 L-9,-24 L9,-24 L11,0z" fill="#e8443f" />
          <rect x="-16" y="-22" width="10" height="15" rx="3" fill="#5a3a22" />
          <circle cx="0" cy="-33" r="10" fill="#f6efe2" />
          <path d="M-10,-35 q10,-10 20,-1 q-3,-9 -10,-9 q-9,0 -10,10z" fill="#3b2f24" />
        </g>
      </g>
      <g className="f05-kid f05-kid2">
        <g transform="translate(0,198)">
          <path d="M-11,0 L-9,-23 L9,-23 L11,0z" fill="#5b8fe8" />
          <rect x="-16" y="-21" width="10" height="14" rx="3" fill="#7bc86c" />
          <circle cx="0" cy="-32" r="9.5" fill="#f6efe2" />
          <path d="M-10,-35 q10,-9 19,0 q-2,-9 -9,-9 q-9,0 -10,9z" fill="#6b4326" />
        </g>
      </g>
      <g className="f05-kid f05-kid3">
        <g transform="translate(0,200)">
          <path d="M-10,0 L-8,-22 L8,-22 L10,0z" fill="#f5b31c" />
          <rect x="-15" y="-20" width="9" height="13" rx="3" fill="#37b3a4" />
          <circle cx="0" cy="-31" r="9" fill="#f6efe2" />
          <path d="M-9,-33 q9,-9 18,0 q-2,-9 -9,-9 q-8,0 -9,9z" fill="#2a2233" />
        </g>
      </g>

      {/* 書店の平台。秋の小説が次々に積まれる */}
      <g transform="translate(324,196)">
        <rect x="-56" y="-12" width="112" height="8" rx="2" fill="#a97a32" />
        <path d="M-46,-4 L-42,10 M46,-4 L42,10" stroke="#8a6128" strokeWidth="5" strokeLinecap="round" />
        {/* 一山目 */}
        <g>
          <rect x="-46" y="-20" width="30" height="8" rx="1" fill="#e8443f" />
          <rect x="-46" y="-28" width="30" height="8" rx="1" fill="#f5b31c" />
          <rect className="f05-book" x="-46" y="-36" width="30" height="8" rx="1" fill="#5b8fe8" />
          <rect className="f05-book f05-book2" x="-46" y="-44" width="30" height="8" rx="1" fill="#7bc86c" />
        </g>
        {/* 二山目 */}
        <g>
          <rect x="-8" y="-20" width="30" height="8" rx="1" fill="#37b3a4" />
          <rect className="f05-book f05-book3" x="-8" y="-28" width="30" height="8" rx="1" fill="#e8443f" />
          <rect className="f05-book f05-book4" x="-8" y="-36" width="30" height="8" rx="1" fill="#f4f1e8" />
        </g>
        {/* 立てて置いた一冊 */}
        <g className="f05-standing">
          <rect x="30" y="-40" width="22" height="28" rx="1.5" fill="#f5b31c" />
          <rect x="30" y="-40" width="5" height="28" rx="1.5" fill="#c9900e" />
        </g>
      </g>

      <style>{`
        .f05-cloud { animation: f05-drift 15s ease-in-out infinite; }
        .f05-cloud2 { animation-delay: 3.2s; animation-duration: 12s; }
        .f05-tree {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f05-sway 5.4s ease-in-out infinite;
        }
        .f05-gate {
          transform-box: fill-box; transform-origin: 100% 50%;
          animation: f05-swing 7s ease-in-out infinite;
        }
        .f05-gate2 { transform-origin: 0 50%; animation-name: f05-swing-r; }
        .f05-kid {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f05-walkin 7s linear infinite backwards;
        }
        .f05-kid2 { animation-delay: 2.2s; animation-duration: 7.6s; }
        .f05-kid3 { animation-delay: 4.4s; animation-duration: 6.6s; }
        .f05-book {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f05-stack 5s ease-out infinite backwards;
        }
        .f05-book2 { animation-delay: 1.2s; }
        .f05-book3 { animation-delay: 2.4s; }
        .f05-book4 { animation-delay: 3.6s; }
        .f05-standing {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f05-tip 6s ease-in-out infinite;
        }
        .f05-lastpen {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f05-taken 6s ease-in-out infinite;
        }
        @keyframes f05-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }
        @keyframes f05-sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes f05-swing {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-9deg); }
        }
        @keyframes f05-swing-r {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(9deg); }
        }
        @keyframes f05-walkin {
          0% { transform: translateX(230px); opacity: 0; }
          10% { opacity: 1; }
          72% { opacity: 1; }
          88%, 100% { transform: translateX(84px); opacity: 0; }
        }
        @keyframes f05-stack {
          0%, 10% { transform: translateY(-18px) rotate(-12deg); opacity: 0; }
          22% { transform: translateY(0) rotate(0deg); opacity: 1; }
          92% { opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
        @keyframes f05-tip {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes f05-taken {
          0%, 55% { opacity: 1; transform: translateY(0); }
          70%, 100% { opacity: 0; transform: translateY(-14px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .f05-cloud, .f05-tree, .f05-gate, .f05-kid, .f05-book,
          .f05-standing, .f05-lastpen { animation: none; }
        }
      `}</style>
    </svg>
  );
}
