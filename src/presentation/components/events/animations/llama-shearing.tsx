/**
 * リャマの毛刈り。牧夫が鋏を入れ、刈った毛が足元の山に落ちてゆく。
 *
 * **動くものは1つだけ**——鋏から離れた毛のひと房が、地面の山へ落ちる。
 *
 * リャマだと分かるための特徴は、**輪郭の中に描かず独立した図形で置く**。
 * 長い首・小さな頭・立った耳・胴の毛のふくらみの4つ。
 * ひと筆の path に胴と脚をまとめると、何の動物か読めない塊になる。
 *
 * 胴の後ろ半分は刈り終えた地肌の色。毛刈りの途中だと分かるように。
 *
 * 牧夫はリャマの右に**全身で立たせる。**最初は座らせて胴の陰に置いたら、
 * リャマばかり大きく人が小さな人形に見えた。
 */
export function LlamaShearing() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高原。増える話なので明るい空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <path d="M0,100 L58,52 L112,100z" fill="#7d93ad" />
      <path d="M58,52 L72,66 L44,66z" fill="#e8f2fb" />
      <path d="M92,100 L166,44 L238,100z" fill="#6e83a0" />
      <path d="M166,44 L184,62 L148,62z" fill="#e8f2fb" />
      <path d="M220,100 L288,58 L356,100z" fill="#7d93ad" />
      <rect y="100" width="400" height="110" fill="#c9a877" />
      <rect y="100" width="400" height="5" fill="#d8b98c" />

      {/* イチュ(高原の草)。静物。 */}
      <g stroke="#a8864f" strokeWidth="2.5" strokeLinecap="round">
        <path d="M28,192 L24,178" />
        <path d="M34,192 L36,176" />
        <path d="M378,186 L374,172" />
        <path d="M384,186 L387,171" />
      </g>

      {/* リャマ。頭は左、刈られているのは右の脇腹。 */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        {/* 脚。4本を別々に置く。 */}
        <rect x="112" y="142" width="10" height="46" rx="5" fill="#d8c0a0" />
        <rect x="132" y="144" width="10" height="44" rx="5" fill="#c9ae8c" />
        <rect x="168" y="144" width="10" height="44" rx="5" fill="#c9ae8c" />
        <rect x="188" y="142" width="10" height="46" rx="5" fill="#d8c0a0" />
        {/* 胴。刈り終えた地肌を先に敷く。 */}
        <ellipse cx="156" cy="128" rx="50" ry="28" fill="#d8c0a0" />
        {/* まだ毛の残っている前半分。ふくらみを丸で足して毛だと分かるようにする。 */}
        <path d="M106,128 a50,28 0 0 1 50,-28 L156,156 a50,28 0 0 1 -50,-28z" fill="#f6efe2" />
        <circle cx="118" cy="110" r="14" fill="#f6efe2" />
        <circle cx="140" cy="102" r="15" fill="#f6efe2" />
        <circle cx="160" cy="104" r="12" fill="#f6efe2" />
        {/* 首。胴の中から生やして継ぎ目を作らない。 */}
        <g transform="translate(122,116) rotate(-113)">
          <rect x="0" y="-12" width="60" height="24" rx="11" fill="#f6efe2" />
        </g>
        {/* 小さな頭と口先。 */}
        <ellipse cx="92" cy="60" rx="16" ry="12" fill="#f6efe2" />
        <ellipse cx="76" cy="65" rx="9" ry="7" fill="#e8ddc4" />
        {/* 立った耳。リャマの目印。 */}
        <path d="M84,50 L86,32 L93,50z" fill="#f6efe2" />
        <path d="M96,50 L102,33 L105,51z" fill="#f6efe2" />
        {/* 尻尾。短い毛の房。 */}
        <ellipse cx="208" cy="118" rx="9" ry="11" fill="#f6efe2" />
      </g>
      <circle cx="86" cy="58" r="2.5" fill="#2a2028" />

      {/* 牧夫。リャマの右に立って鋏を入れている。**動かさない。** */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="312" cy="202" rx="36" ry="6" fill="#a8864f" stroke="none" />
        <rect x="296" y="162" width="14" height="40" rx="7" fill="#3b4a63" />
        <rect x="314" y="162" width="14" height="40" rx="7" fill="#3b4a63" />
        <rect x="288" y="106" width="48" height="62" rx="13" fill="#c2447a" />
        <rect x="294" y="130" width="36" height="38" rx="7" fill="#3b4a63" />
        <circle cx="312" cy="88" r="18" fill="#d9a273" />
        <path d="M294,86 a18,18 0 0 1 36,0z" fill="#241c1a" />
        <ellipse cx="312" cy="74" rx="27" ry="6" fill="#3f3540" />
        <rect x="298" y="60" width="28" height="16" rx="3" fill="#3f3540" />
        {/* 鋏へ伸ばした腕 */}
        <g transform="translate(290,120) rotate(158)">
          <rect x="0" y="-8" width="54" height="16" rx="8" fill="#d9a273" />
        </g>
        <circle cx="242" cy="140" r="9" fill="#d9a273" />
      </g>
      {/* 鋏。静物。 */}
      <g stroke="#2a2028" strokeWidth="2" fill="#b9c2cc">
        <path d="M236,133 L214,124 L218,133z" />
        <path d="M236,147 L214,150 L218,141z" />
      </g>

      {/* 刈った毛の山。静物。 */}
      <g fill="#f6efe2" stroke="#2a2028" strokeWidth="2">
        <circle cx="228" cy="188" r="14" />
        <circle cx="250" cy="192" r="12" />
        <circle cx="241" cy="177" r="11" />
      </g>

      {/* 鋏から離れたひと房。**ここだけが動く。** */}
      <ellipse className="llam-tuft" cx="222" cy="142" rx="12" ry="9" fill="#f6efe2" stroke="#2a2028" strokeWidth="2" />

      <style>{`
        .llam-tuft {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: llam-fall 2.2s ease-in infinite;
        }
        @keyframes llam-fall {
          0%   { transform: translate(0, 0) scale(0.5); opacity: 0; }
          18%  { transform: translate(1px, 5px) scale(1); opacity: 1; }
          80%  { transform: translate(9px, 38px) scale(1); opacity: 1; }
          100% { transform: translate(12px, 44px) scale(0.9); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .llam-tuft { animation: none; }
        }
      `}</style>
    </svg>
  );
}
