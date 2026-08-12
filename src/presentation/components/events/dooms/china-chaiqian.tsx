/**
 * 立ち退きの通知が来る。「拆」の一字が赤く丸で囲まれて壁に描かれ、
 * 数週間のうちにその一角は再開発のために囲われる。
 *
 * 動くのは、解体現場で揺れる鉄球1つだけ。
 */
export function ChinaChaiqian() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った空。 */}
      <rect width="400" height="210" fill="#c8ccc4" />
      <rect y="0" width="400" height="90" fill="#d4d8d0" />
      <ellipse cx="90" cy="40" rx="46" ry="14" fill="#b8bcb4" opacity="0.8" />

      {/* 半分崩れた建物(左)。「拆」の字を丸で囲って描く。 */}
      <g strokeLinejoin="round">
        <rect x="20" y="90" width="90" height="100" fill="#c9bda4" stroke="#20364a" strokeWidth="2.5" />
        <path d="M20,190 L40,120 L60,190 L70,140 L90,190 L110,110 L110,190 Z" fill="#8a8478" stroke="#20364a" strokeWidth="2.5" />
        <rect x="34" y="110" width="16" height="16" fill="#3f5f7f" opacity="0.7" />
        {/* 壁に赤で丸く囲って書かれる「拆」の字。**線で描いている。**
            文字要素として組むと、中国語の字を持たない環境では豆腐(□)になり、
            絵の意味そのものが消える(この盤面の絵は文字を使わない約束)。
            筆で書き殴った字なので、正確な字形より勢いを優先している。 */}
        <g stroke="#c9302c" strokeWidth="2.6" strokeLinecap="round" fill="none">
          <circle cx="70" cy="112" r="15" strokeWidth="2" />
          {/* 扌(てへん) */}
          <path d="M62,104 L62,121" />
          <path d="M58,109 L66,107" />
          <path d="M62,115 L57,120" />
          {/* 斥のつくり */}
          <path d="M70,104 L79,104" />
          <path d="M75,101 L73,121" />
          <path d="M70,111 L80,110" />
          <path d="M76,114 L81,120" />
        </g>
      </g>

      {/* 瓦礫の山(手前)。 */}
      <g fill="#9a9488" stroke="#20364a" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M120,190 L134,166 L150,190 Z" />
        <path d="M148,190 L160,172 L176,190 Z" />
        <rect x="126" y="182" width="10" height="8" fill="#c9302c" />
      </g>

      {/* 地面。 */}
      <rect y="190" width="400" height="20" fill="#8a8478" />

      {/* 工事フェンス。 */}
      <g stroke="#f5b31c" strokeWidth="4" opacity="0.9">
        <path d="M190,190 L190,150 M230,190 L230,150 M270,190 L270,150" />
        <path d="M188,160 L272,180 M188,180 L272,160" stroke="#20364a" strokeWidth="3" />
      </g>

      {/* クレーンの支柱。 */}
      <g strokeLinejoin="round">
        <rect x="330" y="60" width="6" height="130" fill="#8f96a0" stroke="#20364a" strokeWidth="1.6" />
        <rect x="300" y="56" width="70" height="6" fill="#8f96a0" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 揺れる鉄球。**ここだけが動く。** */}
      <g className="ccq-ball">
        <line x1="310" y1="60" x2="310" y2="120" stroke="#4a4a52" strokeWidth="2" />
        <circle cx="310" cy="132" r="16" fill="#4a4a52" stroke="#20364a" strokeWidth="2" />
        <circle cx="305" cy="126" r="4" fill="#7f8896" />
      </g>

      <style>{`
        .ccq-ball {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: ccq-swing 1.8s ease-in-out infinite;
        }
        @keyframes ccq-swing {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(16deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ccq-ball { animation: none; }
        }
      `}</style>
    </svg>
  );
}
