/**
 * ベニのマルカーダ。牧場の色のリボンを一頭ずつ結んでゆく祭り。
 *
 * **動くものは1つだけ**——結んだリボンの端が風に揺れる。
 *
 * 牛だと分かるための特徴は、**輪郭の中に描かず独立した図形で置く**。
 * 低く長い胴・肩のこぶ(この地方の牛はコブウシ)・前へ垂れた首と頭・
 * 上へ伸びる細い角・垂れた耳・尾の房。
 *
 * こぶは**胴に半分埋めて**描く。胴の上に丸ごと載せると、背に置いた荷物に見えた。
 * 角は**細く2本**。太いと1本角の別の獣に見える。
 *
 * 背景は毎年水に浸かる平原と、牛が逃げ込む土の高台(静物)。
 */
export function BeniBranding() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 増える話なので明るい空。水の浮いた草原。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="92" width="400" height="118" fill="#5cb054" />
      <rect y="92" width="400" height="5" fill="#74c268" />
      <g fill="#7fb8d8" opacity="0.85">
        <ellipse cx="46" cy="190" rx="44" ry="9" />
        <ellipse cx="360" cy="180" rx="36" ry="8" />
      </g>
      {/* 牛が逃げ込む土の高台。静物。 */}
      <path d="M266,92 a54,25 0 0 1 108,0z" fill="#8a6a45" stroke="#6b5033" strokeWidth="2" />
      <g stroke="#4f9e4a" strokeWidth="2.5" strokeLinecap="round">
        <path d="M300,74 L298,64" />
        <path d="M334,70 L336,60" />
      </g>

      {/* 牛。コブウシ。頭は左。 */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        {/* 脚。4本を別々に。 */}
        <rect x="104" y="146" width="12" height="44" rx="6" fill="#9c6b4a" />
        <rect x="126" y="148" width="12" height="42" rx="6" fill="#8a5c3e" />
        <rect x="176" y="148" width="12" height="42" rx="6" fill="#8a5c3e" />
        <rect x="198" y="146" width="12" height="44" rx="6" fill="#9c6b4a" />
        {/* 肩のこぶ。先に描いて、胴で下半分を隠す。 */}
        <ellipse cx="128" cy="116" rx="26" ry="18" fill="#b8815c" />
        {/* 低く長い胴 */}
        <rect x="94" y="114" width="124" height="40" rx="17" fill="#a8724e" />
        {/* 前へ垂れた首 */}
        <g transform="translate(102,122) rotate(160)">
          <rect x="0" y="-16" width="36" height="32" rx="13" fill="#a8724e" />
        </g>
        {/* 頭と口先 */}
        <ellipse cx="62" cy="140" rx="21" ry="15" fill="#b8815c" />
        <ellipse cx="44" cy="147" rx="10" ry="8" fill="#8a5c3e" />
        {/* 垂れた耳 */}
        <ellipse cx="74" cy="134" rx="11" ry="6" fill="#8a5c3e" transform="rotate(-18 74 134)" />
        {/* 角。細く2本、上へ。 */}
        <path d="M56,127 q-5,-13 -13,-19 q3,12 5,20z" fill="#e8ddc4" />
        <path d="M70,126 q3,-14 12,-19 q-4,12 -4,20z" fill="#e8ddc4" />
      </g>
      <circle cx="56" cy="136" r="2.5" fill="#2a2028" />
      {/* 尾と房 */}
      <path d="M218,124 q16,10 13,40" fill="none" stroke="#2a2028" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="231" cy="168" rx="6" ry="9" fill="#5c3d2a" stroke="#2a2028" strokeWidth="2" />

      {/* 牧童。牛の右に立ってリボンを結んでいる。**動かさない。** */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="308" cy="200" rx="34" ry="6" fill="#3f7a3c" stroke="none" />
        <rect x="292" y="160" width="14" height="40" rx="7" fill="#3b4a63" />
        <rect x="310" y="160" width="14" height="40" rx="7" fill="#3b4a63" />
        <rect x="284" y="104" width="48" height="62" rx="13" fill="#5b8fe8" />
        <circle cx="308" cy="86" r="18" fill="#d9a273" />
        <path d="M290,84 a18,18 0 0 1 36,0z" fill="#241c1a" />
        <ellipse cx="308" cy="72" rx="28" ry="6" fill="#8a5c38" />
        <path d="M294,56 L322,56 L326,72 L290,72z" fill="#8a5c38" />
        {/* 牛の背へ伸ばした腕 */}
        <g transform="translate(286,118) rotate(184)">
          <rect x="0" y="-8" width="70" height="16" rx="8" fill="#d9a273" />
        </g>
        <circle cx="212" cy="112" r="9" fill="#d9a273" />
      </g>

      {/* 結んだリボンの結び目。静物。 */}
      <rect x="196" y="104" width="15" height="13" rx="3" fill="#e8443f" stroke="#2a2028" strokeWidth="2" />

      {/* リボンの端。**ここだけが動く。**
          結び目を回転の中心にして、風に揺れる。 */}
      <g className="beni-ribbon">
        <path d="M198,116 q-11,20 -32,26 q7,-22 20,-32z" fill="#f5b31c" stroke="#2a2028" strokeWidth="2" strokeLinejoin="round" />
        <path d="M207,116 q6,22 25,30 q-4,-24 -15,-34z" fill="#2f8f5b" stroke="#2a2028" strokeWidth="2" strokeLinejoin="round" />
      </g>

      <style>{`
        .beni-ribbon {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: beni-flutter 1.9s ease-in-out infinite alternate;
        }
        @keyframes beni-flutter {
          from { transform: rotate(-11deg) scaleY(0.9); }
          to   { transform: rotate(10deg) scaleY(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .beni-ribbon { animation: none; }
        }
      `}</style>
    </svg>
  );
}
