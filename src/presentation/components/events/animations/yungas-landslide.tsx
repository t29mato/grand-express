/**
 * 雨季の崩落。ユンガスの斜面が道の上に崩れ、待っているあいだに
 * 積んでいた柑橘と珈琲が傷む。
 *
 * **動くものは1つだけ**——崩れた土がひと筋、斜面をこぼれ落ちる。
 *
 * 損の中身は「迂回代」ではなく**傷んだ積み荷**なので、荷台の柑橘と
 * 珈琲の袋を手前に大きく置き、運転手がそれを見ている構図にした
 * (既存の `bloqueo-detour` と同じ話に見えないように)。
 */
export function YungasLandslide() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨あがりのユンガス。減る話なので暗く、霧を垂れこめさせる。 */}
      <rect width="400" height="210" fill="#5b6b63" />
      <path d="M0,0 L400,0 L400,40 L0,52z" fill="#6e7d74" opacity="0.7" />
      {/* 谷の向こうの尾根 */}
      <path d="M0,96 L86,30 L172,96z" fill="#3f5148" />
      <path d="M140,96 L236,44 L332,96z" fill="#48594f" />

      {/* 崩れた斜面。道の上まで土が出ている。 */}
      {/* 斜面。上端を斜めにして、四角い建物に見えないようにする。 */}
      <path d="M0,0 L74,0 L134,44 L158,150 L0,150z" fill="#4a3a2c" />
      <path d="M112,30 L134,44 L158,150 L128,150z" fill="#3a2d22" />
      <g stroke="#6b5030" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M18,44 q28,10 44,34" />
        <path d="M10,88 q30,8 46,28" />
      </g>
      <path d="M112,58 L176,150 L64,150z" fill="#6b5030" />
      <path d="M112,58 L150,116 L96,116z" fill="#7d5f3a" />
      <g fill="#3a2d22">
        <circle cx="118" cy="128" r="9" />
        <circle cx="140" cy="140" r="7" />
        <circle cx="96" cy="138" r="8" />
      </g>

      {/* 道。崩れた土でここから先が塞がっている。 */}
      <path d="M60,150 L400,138 L400,182 L60,196z" fill="#41404a" />
      <g fill="#c9c4b4">
        <rect x="210" y="163" width="26" height="4" />
        <rect x="264" y="161" width="26" height="4" />
        <rect x="318" y="159" width="26" height="4" />
      </g>
      {/* 谷側のガードレール。静物。 */}
      <g stroke="#8a8279" strokeWidth="3">
        <line x1="196" y1="196" x2="400" y2="184" />
        <line x1="220" y1="192" x2="220" y2="204" />
        <line x1="300" y1="189" x2="300" y2="201" />
      </g>

      {/* 積み荷を載せた小型トラック。荷台の柑橘と珈琲が傷む。 */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="246" y="118" width="72" height="34" rx="4" fill="#6b4630" />
        <rect x="318" y="116" width="46" height="36" rx="6" fill="#5b8fe8" />
        <rect x="326" y="122" width="26" height="15" rx="2" fill="#2b3a4a" />
        <circle cx="272" cy="154" r="11" fill="#20242b" />
        <circle cx="344" cy="154" r="11" fill="#20242b" />
        <circle cx="272" cy="154" r="4" fill="#4a4f57" />
        <circle cx="344" cy="154" r="4" fill="#4a4f57" />
      </g>
      {/* 荷台の柑橘。傷んで色がくすんでいる。 */}
      <g stroke="#2a2028" strokeWidth="2">
        <circle cx="258" cy="112" r="9" fill="#b8862f" />
        <circle cx="276" cy="110" r="9" fill="#a87a33" />
        <circle cx="294" cy="112" r="9" fill="#b8862f" />
        <circle cx="267" cy="100" r="9" fill="#a87a33" />
        <circle cx="285" cy="100" r="9" fill="#96702f" />
      </g>
      {/* 珈琲の袋 */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M304,118 L302,96 L322,92 L326,118z" fill="#c9a877" />
        <rect x="306" y="100" width="16" height="5" fill="#6b4630" />
      </g>

      {/* 運転手。崩れた土を見上げて立っている。**動かさない。** */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="196" cy="198" rx="26" ry="5" fill="#33323a" stroke="none" />
        <rect x="184" y="164" width="12" height="34" rx="6" fill="#2f3b4f" />
        <rect x="199" y="164" width="12" height="34" rx="6" fill="#2f3b4f" />
        <rect x="180" y="118" width="36" height="52" rx="11" fill="#e8802f" />
        <circle cx="198" cy="104" r="14" fill="#d9a273" />
        <path d="M184,102 a14,14 0 0 1 28,0z" fill="#241c1a" />
        {/* 崩れた斜面を指す腕 */}
        <g transform="translate(182,128) rotate(210)">
          <rect x="0" y="-6" width="36" height="12" rx="6" fill="#d9a273" />
        </g>
        <circle cx="152" cy="110" r="7" fill="#d9a273" />
      </g>

      {/* こぼれ落ちる土。**ここだけが動く。** */}
      <path
        className="ylnd-slip"
        d="M120,66 q10,4 12,16 q-14,-2 -12,-16z"
        fill="#8a6a45"
        stroke="#2a2028"
        strokeWidth="2"
      />

      <style>{`
        .ylnd-slip {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ylnd-slide 2.6s ease-in infinite;
        }
        @keyframes ylnd-slide {
          0%   { transform: translate(0, 0) scale(0.4); opacity: 0; }
          15%  { transform: translate(2px, 8px) scale(1); opacity: 1; }
          78%  { transform: translate(16px, 62px) scale(1); opacity: 1; }
          100% { transform: translate(20px, 76px) scale(0.8); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ylnd-slip { animation: none; }
        }
      `}</style>
    </svg>
  );
}
