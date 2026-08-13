/**
 * 国境検問所で足止め。遮断棒が上がらず、係官のスタンプが繰り返し下りる様子で、
 * 列の長さと「待たされている」感じを伝える。厳しい表情や対立は描かない。
 *
 * 動くのは、上下するスタンプと、点滅する遮断棒の赤ランプだけ。
 */
export function NorthamericaAduana() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="84" width="400" height="6" fill="#cfe4f0" />

      {/* 地面(検問の敷地)。 */}
      <rect y="90" width="400" height="120" fill="#c9a877" />

      {/* 検問小屋。 */}
      <g strokeLinejoin="round">
        <rect x="290" y="100" width="90" height="60" fill="#e8dcc0" stroke="#20364a" strokeWidth="2.5" />
        <rect x="284" y="94" width="102" height="10" fill="#5a6a70" stroke="#20364a" strokeWidth="2" />
        <rect x="304" y="118" width="26" height="26" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 遮断棒。斜めの縞、支柱は固定。 */}
      <g strokeLinejoin="round">
        <rect x="240" y="150" width="10" height="40" fill="#8b8f98" stroke="#20364a" strokeWidth="2" />
        <rect x="180" y="146" width="66" height="10" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <g fill="#e05252">
          <rect x="186" y="146" width="10" height="10" />
          <rect x="206" y="146" width="10" height="10" />
          <rect x="226" y="146" width="10" height="10" />
        </g>
        {/* 点滅する赤ランプ。 */}
        <circle className="adu-lamp" cx="245" cy="140" r="5" fill="#e05252" />
      </g>

      {/* 待つ車の列。 */}
      <g strokeLinejoin="round">
        <rect x="20" y="160" width="60" height="22" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <circle cx="34" cy="184" r="6" fill="#20364a" />
        <circle cx="66" cy="184" r="6" fill="#20364a" />
        <rect x="90" y="164" width="54" height="18" rx="4" fill="#f5b31c" stroke="#20364a" strokeWidth="2" />
        <circle cx="102" cy="184" r="6" fill="#20364a" />
        <circle cx="130" cy="184" r="6" fill="#20364a" />
        <rect x="152" y="160" width="60" height="22" rx="4" fill="#e05252" stroke="#20364a" strokeWidth="2" />
        <circle cx="166" cy="184" r="6" fill="#20364a" />
        <circle cx="198" cy="184" r="6" fill="#20364a" />
      </g>

      {/* 係官と書類。 */}
      <g strokeLinejoin="round">
        <circle cx="360" cy="176" r="10" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="348" y="184" width="24" height="22" fill="#4a5a68" stroke="#20364a" strokeWidth="2" />
        <rect x="322" y="188" width="20" height="14" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 上下するスタンプ。 */}
      <g className="adu-stamp" strokeLinecap="round" strokeLinejoin="round">
        <rect x="326" y="0" width="14" height="10" rx="2" fill="#e05252" stroke="#20364a" strokeWidth="1.6" />
        <line x1="333" y1="10" x2="333" y2="18" stroke="#20364a" strokeWidth="3" />
      </g>

      <style>{`
        .adu-lamp {
          animation: adu-blink 1s steps(1) infinite;
        }
        @keyframes adu-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.15; }
        }
        .adu-stamp {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: adu-press 1.1s ease-in-out infinite;
        }
        @keyframes adu-press {
          0%, 100% { transform: translateY(178px); }
          40% { transform: translateY(178px); }
          55% { transform: translateY(196px); }
          70% { transform: translateY(178px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .adu-lamp, .adu-stamp { animation: none; }
        }
      `}</style>
    </svg>
  );
}
