/**
 * 稜線で雷雲に捕まる。午後の積乱雲が真上に来るまで30分もかからず、
 * 開けた稜線は捕まる最悪の場所になる。
 *
 * 落雷そのものが人に当たる絵は描かない。**低く身をかがめ、
 * ストックを離して置く登山者**と、**空を裂く一筋の光**で示す
 * (`04-doom-animation-guide.md` の方針どおり)。動くのは、雷光と
 * その明滅する空だけ。
 */
export function HyakumeizanRakurai() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暗い雷雲の空。 */}
      <rect width="400" height="210" fill="#232338" />
      <g className="hkr-skyflash" fill="#3a3a52">
        <rect width="400" height="120" />
      </g>

      {/* 積乱雲。 */}
      <g fill="#1c1c2e">
        <ellipse cx="120" cy="50" rx="90" ry="34" />
        <ellipse cx="230" cy="40" rx="100" ry="40" />
        <ellipse cx="330" cy="56" rx="70" ry="30" />
      </g>

      {/* 稜線。 */}
      <path d="M0,140 L60,110 L120,128 L190,90 L260,124 L330,100 L400,120 L400,210 L0,210z" fill="#2a2a3a" />
      <rect y="150" width="400" height="60" fill="#33334a" />

      {/* 雨脚。 */}
      <g stroke="#6a6a90" strokeWidth="2" opacity="0.6">
        <path d="M60,70 L48,110" />
        <path d="M100,60 L86,104" />
        <path d="M300,68 L288,108" />
        <path d="M340,78 L330,114" />
      </g>

      {/* くぼみに低く身をかがめ、ストックを置いた登山者。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M182,196 Q198,170 226,178 Q244,184 240,198" stroke="#3a4a3a" strokeWidth="18" fill="none" />
        <circle cx="200" cy="164" r="10" fill="#d9a273" stroke="#1c1c2e" strokeWidth="2" />
        <path d="M192,172 L182,190" stroke="#d9a273" strokeWidth="6" fill="none" />
        <rect x="176" y="178" width="12" height="18" rx="3" fill="#8b6a44" />
        {/* 手元から離して寝かせたストック。 */}
        <path d="M244,196 L282,188" stroke="#7a828a" strokeWidth="3" />
        <circle cx="283" cy="187" r="2.4" fill="#e05252" />
      </g>

      {/* 雷光。**ここだけが動く。** */}
      <g className="hkr-bolt">
        <path
          d="M214,10 L198,66 L216,66 L192,140 L214,80 L196,80 L220,10z"
          fill="#f5e88a"
        />
      </g>

      <style>{`
        .hkr-bolt {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: hkr-flash 2.4s steps(1, end) infinite;
        }
        .hkr-skyflash {
          animation: hkr-glow 2.4s steps(1, end) infinite;
        }
        @keyframes hkr-flash {
          0%, 82%, 100% { opacity: 0; }
          84%, 90% { opacity: 1; }
          92% { opacity: 0.3; }
          94% { opacity: 1; }
          96%, 98% { opacity: 0; }
        }
        @keyframes hkr-glow {
          0%, 82%, 100% { opacity: 0; }
          84%, 96% { opacity: 0.55; }
          98% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkr-bolt { animation: none; opacity: 1; }
          .hkr-skyflash { animation: none; opacity: 0.3; }
        }
      `}</style>
    </svg>
  );
}
