/**
 * ロドス風がボスポラスを閉じる。強い南西風が海峡を白波立て、
 * フェリーは欠航し、橋は通行止めになる。
 *
 * 荒天そのものではなく、**傾いだフェリーと閉ざされた橋の遮断機**で
 * 「足止め」を表す。動くのは、うねる白波の帯1つだけ。
 */
export function TurkeyLodos() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空。 */}
      <rect width="400" height="210" fill="#3a465c" />
      <g fill="#465272" opacity="0.9">
        <ellipse cx="80" cy="36" rx="90" ry="24" />
        <ellipse cx="260" cy="26" rx="100" ry="28" />
        <ellipse cx="370" cy="44" rx="60" ry="20" />
      </g>

      {/* 海。 */}
      <rect y="110" width="400" height="100" fill="#20364a" />

      {/* ボスポラス大橋(背景、通行止め)。 */}
      <g strokeLinecap="round">
        <path d="M20,110 Q200,50 380,110" stroke="#5a6272" strokeWidth="6" fill="none" />
        <path d="M120,60 L120,110 M280,60 L280,110" stroke="#5a6272" strokeWidth="3" />
      </g>
      {/* 遮断機(赤白のバー)。 */}
      <g>
        <rect x="150" y="104" width="60" height="6" fill="#f6efe2" />
        <rect x="150" y="104" width="12" height="6" fill="#e8443f" />
        <rect x="174" y="104" width="12" height="6" fill="#e8443f" />
        <rect x="198" y="104" width="12" height="6" fill="#e8443f" />
      </g>

      {/* 傾いだフェリー。 */}
      <g strokeLinejoin="round" transform="rotate(-8 100 150)">
        <path d="M60,150 Q100,142 140,150 L134,168 L66,168z" fill="#e8443f" stroke="#20364a" strokeWidth="2" />
        <rect x="82" y="128" width="36" height="20" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <rect x="88" y="118" width="8" height="12" fill="#5a6272" />
      </g>

      {/* 岸壁で待つ人々。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <rect x="280" y="150" width="120" height="10" fill="#8a8478" />
        <circle cx="300" cy="140" r="7" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="294" y="146" width="12" height="16" rx="2" fill="#5b8fe8" stroke="#20364a" strokeWidth="1.6" />
        <circle cx="320" cy="141" r="7" fill="#c98a5a" stroke="#20364a" strokeWidth="2" />
        <rect x="314" y="147" width="12" height="16" rx="2" fill="#8a1f2b" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 手前の防波堤。 */}
      <rect y="180" width="400" height="30" fill="#6a6458" />

      {/* うねる白波の帯。**ここだけが動く。** */}
      <g className="lod-wave" fill="#dbe6e0" opacity="0.85">
        <path d="M0,116q20,-10 40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0" />
        <path d="M0,132q20,-8 40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0" opacity="0.7" />
      </g>

      <style>{`
        .lod-wave {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: lod-surge 2.2s ease-in-out infinite;
        }
        @keyframes lod-surge {
          0%   { transform: translateY(0px) scaleY(1); }
          50%  { transform: translateY(-6px) scaleY(1.3); }
          100% { transform: translateY(0px) scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lod-wave { animation: none; }
        }
      `}</style>
    </svg>
  );
}
