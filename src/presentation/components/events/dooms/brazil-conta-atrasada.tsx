/**
 * 滞納した請求書(ボレート)が出てくる。上着のポケットから忘れられていた
 * 紙片が見つかり、延滞料で財布から硬貨がこぼれ落ちる。
 *
 * 人を描かず、**上着のポケットから覗く紙片**と**傾いた財布からこぼれる硬貨**
 * で「請求」を表す。動くのは、こぼれ落ちる硬貨と紙片のわずかな揺れだけ。
 */
export function BrazilContaAtrasada() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 室内の壁と床。 */}
      <rect width="400" height="210" fill="#e8dcc0" />
      <rect y="0" width="400" height="130" fill="#f2ecd8" />
      <rect y="130" width="400" height="80" fill="#c8a878" />
      <rect y="130" width="400" height="4" fill="#b3915f" />

      {/* 掛けられた上着。ポケットから紙片が覗く。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="40" width="10" height="4" fill="#4a4436" />
        <path d="M52,44 L48,110 L52,150 L108,150 L112,110 L108,44z" fill="#2f4a52" stroke="#20364a" strokeWidth="2.5" />
        <rect x="60" y="90" width="30" height="22" rx="2" fill="#3a5a64" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* ポケットから覗く請求書の紙片(バーコード柄)。 */}
      <g className="bra-slip">
        <rect x="66" y="86" width="20" height="30" rx="1.5" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
        <g stroke="#4a4436" strokeWidth="1.4">
          <path d="M69,106 v6M72,106 v6M75,106 v6M78,106 v6M81,106 v6" />
        </g>
      </g>

      {/* 傾いた財布(手前・右)。 */}
      <g strokeLinejoin="round">
        <path d="M240,170 L340,170 L330,196 L250,196z" fill="#6b3f2a" stroke="#20364a" strokeWidth="2.5" />
        <path d="M250,170 L330,170 L326,180 L254,180z" fill="#8a5a3a" />
      </g>

      {/* こぼれ落ちる硬貨。 */}
      <g className="bra-coin1">
        <circle cx="290" cy="150" r="8" fill="#f5b31c" stroke="#20364a" strokeWidth="1.6" />
      </g>
      <g className="bra-coin2">
        <circle cx="270" cy="150" r="7" fill="#f5b31c" stroke="#20364a" strokeWidth="1.6" />
      </g>
      <g className="bra-coin3">
        <circle cx="308" cy="150" r="6.5" fill="#f5b31c" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 積もった硬貨(床)。 */}
      <ellipse cx="290" cy="200" rx="30" ry="5" fill="#c8a040" opacity="0.6" />

      <style>{`
        .bra-slip {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: bra-slip-wobble 2.4s ease-in-out infinite;
        }
        @keyframes bra-slip-wobble {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(4deg); }
        }
        .bra-coin1, .bra-coin2, .bra-coin3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bra-coin-fall 2.2s ease-in infinite;
        }
        .bra-coin2 { animation-delay: 0.5s; }
        .bra-coin3 { animation-delay: 1.1s; }
        @keyframes bra-coin-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          80% { transform: translateY(44px) rotate(200deg); opacity: 1; }
          100% { transform: translateY(48px) rotate(220deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bra-slip, .bra-coin1, .bra-coin2, .bra-coin3 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
