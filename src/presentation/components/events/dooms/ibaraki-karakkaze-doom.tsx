/**
 * からっ風が止まない。四日続けば、持ち物のすべてに砂が入る。
 * 縫い目にも、食べ物にも、錠の中にも。
 *
 * **動くものは1つだけ**——ひと吹きの砂が右へ流れる。
 * 砂は何本かの筋だが、ひとつの `<g>` にまとめて同じ動きをさせている
 * (別々に動かすと、目で追う先が増えて何を見ればよいか分からなくなる)。
 *
 * 山から乾ききって下りてくる風なので、背景に筑波の山と、
 * 一方向にだけ倒れた木を置いて向きを示す。
 */
export function IbarakiKarakkazeDoom() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の乾いた空。 */}
      <rect width="400" height="210" fill="#6b7284" />
      <rect y="40" width="400" height="30" fill="#7c8496" />
      {/* 風の下りてくる山。 */}
      <path d="M0,104 L64,44 L128,104z" fill="#4f5668" />
      <path d="M96,104 L150,58 L204,104z" fill="#596173" />
      <rect y="104" width="400" height="106" fill="#8a7a58" />
      <rect y="104" width="400" height="4" fill="#9c8c66" />
      {/* 吹きさらしの地面。 */}
      <g stroke="#7a6a4a" strokeWidth="3">
        <line x1="0" y1="140" x2="400" y2="134" />
        <line x1="0" y1="176" x2="400" y2="168" />
      </g>

      {/* 一方向に倒れた冬木。風の向きを静物で示す。 */}
      <g stroke="#3b3226" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M56,166 q10,-30 34,-42" />
        <path d="M70,146 q14,-6 26,-16" />
        <path d="M64,156 q16,-4 30,-10" />
        <path d="M330,158 q8,-26 30,-36" />
        <path d="M340,142 q12,-5 22,-13" />
      </g>

      {/* 風に耐える人。**胴だけを回すと体がばらける**(一度そうなった)。
          まっすぐ組んで、傾きは帽子と砂の向きで示す。 */}
      <g stroke="#2a2430" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="196" cy="192" rx="28" ry="5" fill="#7a6a4a" stroke="none" />
        <rect x="184" y="162" width="12" height="30" rx="6" fill="#3b4a63" />
        <rect x="199" y="162" width="12" height="30" rx="6" fill="#3b4a63" />
        <rect x="180" y="120" width="34" height="46" rx="11" fill="#e05252" />
        <circle cx="197" cy="106" r="14" fill="#d9a273" />
        <path d="M183,104 a14,14 0 0 1 28,0z" fill="#241c1a" />
        {/* 飛ばされかけの帽子。風下へずれている。 */}
        <ellipse cx="206" cy="92" rx="23" ry="5" fill="#5a4030" />
        <path d="M196,78 L218,78 L222,92 L192,92z" fill="#5a4030" />
        {/* 帽子を押さえる手。顔にかからないよう頭の脇に置く。 */}
        <g transform="translate(222,134) rotate(-100)">
          <rect x="0" y="-6" width="34" height="12" rx="6" fill="#d9a273" />
        </g>
        <circle cx="218" cy="99" r="6.5" fill="#d9a273" />
      </g>

      {/* ひと吹きの砂。**ここだけが動く。** */}
      <g className="ikkz-dust" fill="none" stroke="#d8c9a8" strokeLinecap="round">
        <path d="M20,120 q40,-8 84,-2" strokeWidth="3.5" opacity="0.85" />
        <path d="M8,146 q56,-10 110,-4" strokeWidth="3" opacity="0.7" />
        <path d="M36,168 q46,-9 92,-3" strokeWidth="2.5" opacity="0.6" />
        <path d="M0,190 q50,-8 96,-2" strokeWidth="3" opacity="0.5" />
      </g>

      <style>{`
        .ikkz-dust {
          transform-box: fill-box;
          transform-origin: 0 50%;
          animation: ikkz-gust 2.1s linear infinite;
        }
        @keyframes ikkz-gust {
          0%   { transform: translateX(-40px); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(300px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ikkz-dust { animation: none; }
        }
      `}</style>
    </svg>
  );
}
