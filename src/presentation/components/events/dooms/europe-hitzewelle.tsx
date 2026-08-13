/**
 * 熱波でレールが曲がる。強い日差しの下、線路が横にたわみ、
 * 陽炎が立つ。壊れた車両や脱線は描かない。**波打つ線路と陽炎**で伝える。
 */
export function EuropeHitzewelle() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。強い日差し。 */}
      <rect width="400" height="210" fill="#f0d080" />
      <rect y="0" width="400" height="90" fill="#f6e0a0" />
      <circle cx="330" cy="46" r="30" fill="#f5b31c" />
      <g stroke="#f5b31c" strokeWidth="3" opacity="0.7">
        <path d="M330,6 L330,-6" />
        <path d="M292,46 L280,46" />
        <path d="M303,19 L295,11" />
        <path d="M303,73 L295,81" />
      </g>

      {/* 遠景の丘。 */}
      <path d="M0,110 c60,-24 140,-24 200,0 c60,-20 140,-20 200,0 v10 H0z" fill="#d9c07a" opacity="0.9" />

      {/* 地面。 */}
      <rect y="130" width="400" height="80" fill="#c9a877" />
      <rect y="130" width="400" height="5" fill="#dabb8c" />

      {/* たわんだ線路。 */}
      <g stroke="#3a332c" strokeWidth="4" fill="none">
        <path d="M10,178 Q70,166 130,180 Q190,196 250,178 Q310,162 390,178" />
        <path d="M10,192 Q70,180 130,194 Q190,210 250,192 Q310,176 390,192" />
      </g>
      <g stroke="#3a332c" strokeWidth="2.5">
        <path d="M30,176 L30,194M70,168 L70,186M110,176 L110,198M150,188 L150,208M190,196 L190,212M230,190 L230,208M270,172 L270,192M310,164 L310,182M350,172 L350,190" />
      </g>

      {/* 足止めされた列車と困る運転士。 */}
      <g strokeLinejoin="round">
        <rect x="230" y="132" width="70" height="28" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="248" cy="160" r="8" fill="#241a10" />
        <circle cx="282" cy="160" r="8" fill="#241a10" />
        <circle cx="320" cy="128" r="9" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <path d="M312,133 a9,5 0 0,0 18,0" stroke="#20364a" strokeWidth="2" fill="none" />
      </g>

      {/* 立ちのぼる陽炎。半透明の帯が上下に揺れる。 */}
      <g className="ehw-shimmer" fill="#fff6da" opacity="0.35">
        <rect x="0" y="120" width="400" height="10" />
        <rect x="0" y="105" width="400" height="8" />
      </g>

      <style>{`
        .ehw-shimmer {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ehw-wave 1.4s ease-in-out infinite;
        }
        @keyframes ehw-wave {
          0% { transform: scaleY(1) translateY(0); opacity: 0.2; }
          50% { transform: scaleY(1.6) translateY(-6px); opacity: 0.5; }
          100% { transform: scaleY(1) translateY(0); opacity: 0.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ehw-shimmer { animation: none; }
        }
      `}</style>
    </svg>
  );
}
