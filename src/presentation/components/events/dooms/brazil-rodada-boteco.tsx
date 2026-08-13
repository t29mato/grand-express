/**
 * テーブル全員分の勘定を持たされる。ボテコで注文したショッピが
 * 次々とテーブルに並び、支払いは自分の持ち分になる。
 *
 * 人を描かず、**並んだグラスと運ばれるトレイ**、**自分の側からこぼれ出る
 * 硬貨**で「持たされた勘定」を表す。動くのは注がれる泡とトレイ、
 * 流れ出る硬貨だけ。
 */
export function BrazilRodadaBoteco() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄暗いバーの店内。 */}
      <rect width="400" height="210" fill="#3a2e24" />
      <rect y="0" width="400" height="70" fill="#4a3a2c" />
      <circle cx="340" cy="40" r="16" fill="#f5b31c" opacity="0.5" />

      {/* テーブル。 */}
      <rect y="150" width="400" height="60" fill="#5a4230" />
      <rect y="150" width="400" height="6" fill="#6b5238" />

      {/* 並んだショッピのグラス(手前・多数)。 */}
      <g strokeLinejoin="round">
        <path d="M60,150 L62,190 L88,190 L90,150z" fill="#e8d090" stroke="#20364a" strokeWidth="2" />
        <path d="M110,150 L112,190 L138,190 L140,150z" fill="#e8d090" stroke="#20364a" strokeWidth="2" />
        <path d="M160,150 L162,190 L188,190 L190,150z" fill="#e8d090" stroke="#20364a" strokeWidth="2" />
        <path d="M210,150 L212,190 L238,190 L240,150z" fill="#e8d090" stroke="#20364a" strokeWidth="2" />
      </g>
      {/* 泡(揺れる)。 */}
      <g className="bra-foam">
        <ellipse cx="75" cy="150" rx="15" ry="6" fill="#f6efe2" />
        <ellipse cx="125" cy="150" rx="15" ry="6" fill="#f6efe2" />
        <ellipse cx="175" cy="150" rx="15" ry="6" fill="#f6efe2" />
        <ellipse cx="225" cy="150" rx="15" ry="6" fill="#f6efe2" />
      </g>

      {/* 給仕のトレイ(奥から近づいてくる)。 */}
      <g className="bra-tray" strokeLinejoin="round">
        <ellipse cx="300" cy="120" rx="34" ry="8" fill="#8a5a3a" stroke="#20364a" strokeWidth="2" />
        <path d="M288,116 L286,124 L294,124z" fill="#e8d090" stroke="#20364a" strokeWidth="1.4" />
        <path d="M304,116 L302,124 L310,124z" fill="#e8d090" stroke="#20364a" strokeWidth="1.4" />
      </g>

      {/* 自分側の小皿から流れ出る硬貨。 */}
      <ellipse cx="330" cy="196" rx="30" ry="8" fill="#4a3a2c" stroke="#20364a" strokeWidth="1.6" />
      <g className="bra-coin1">
        <circle cx="320" cy="190" r="6" fill="#f5b31c" stroke="#20364a" strokeWidth="1.4" />
      </g>
      <g className="bra-coin2">
        <circle cx="335" cy="192" r="5" fill="#f5b31c" stroke="#20364a" strokeWidth="1.4" />
      </g>
      <g className="bra-coin3">
        <circle cx="345" cy="188" r="5.5" fill="#f5b31c" stroke="#20364a" strokeWidth="1.4" />
      </g>

      <style>{`
        .bra-foam {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bra-foam-fizz 1.6s ease-in-out infinite;
        }
        @keyframes bra-foam-fizz {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-2px) scaleY(1.15); }
        }
        .bra-tray {
          transform-box: fill-box;
          animation: bra-tray-approach 3s ease-in-out infinite;
        }
        @keyframes bra-tray-approach {
          0% { transform: translate(40px,-10px); opacity: 0.5; }
          50% { transform: translate(0,0); opacity: 1; }
          100% { transform: translate(40px,-10px); opacity: 0.5; }
        }
        .bra-coin1, .bra-coin2, .bra-coin3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bra-coin-drain 2s ease-in infinite;
        }
        .bra-coin2 { animation-delay: 0.6s; }
        .bra-coin3 { animation-delay: 1.2s; }
        @keyframes bra-coin-drain {
          0% { transform: translate(0,0); opacity: 1; }
          80% { transform: translate(-60px,10px); opacity: 0.8; }
          100% { transform: translate(-70px,12px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bra-foam, .bra-tray, .bra-coin1, .bra-coin2, .bra-coin3 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
