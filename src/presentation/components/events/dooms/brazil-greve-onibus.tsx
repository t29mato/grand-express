/**
 * バスのストで足止め。運転手が朝に一斉に離脱し、停留所には
 * 二時間もバスが来ない。待つ人と、回り続ける時計の針で「足止め」を表す。
 *
 * 人を描かず、**空の停留所とバリケード**、**回り続ける時計の針**で
 * 待ちぼうけを表す。動くのは時計の針と、揺れる路線案内の吊り具だけ。
 */
export function BrazilGreveOnibus() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇り空。 */}
      <rect width="400" height="210" fill="#8fa4b0" />
      <rect y="0" width="400" height="90" fill="#a8bcc4" />

      {/* 遠くの建物。 */}
      <g fill="#7f8f96" opacity="0.8">
        <rect x="20" y="70" width="26" height="60" />
        <rect x="340" y="60" width="30" height="70" />
      </g>

      {/* 地面。 */}
      <rect y="130" width="400" height="80" fill="#9a9488" />
      <rect y="130" width="400" height="4" fill="#8a8478" />

      {/* 停留所の屋根とベンチ(空)。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="120" width="140" height="6" fill="#4a4a52" stroke="#20364a" strokeWidth="1.6" />
        <rect x="66" y="126" width="6" height="30" fill="#4a4a52" />
        <rect x="188" y="126" width="6" height="30" fill="#4a4a52" />
        <rect x="80" y="152" width="90" height="8" fill="#8a5a3a" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 路線案内板(吊り具で揺れる)。文字は使わず色帯だけで表す。 */}
      <g className="bra-sign" strokeLinejoin="round">
        <line x1="130" y1="120" x2="130" y2="106" stroke="#4a4a52" strokeWidth="2" />
        <rect x="108" y="90" width="44" height="18" rx="2" fill="#f5b31c" stroke="#20364a" strokeWidth="1.6" />
        <rect x="114" y="95" width="32" height="4" fill="#20364a" opacity="0.6" />
        <rect x="114" y="101" width="20" height="4" fill="#20364a" opacity="0.6" />
      </g>

      {/* バリケードのコーン(バスが来ない目印)。 */}
      <g strokeLinejoin="round">
        <path d="M250,160 L258,130 L266,160z" fill="#e8443f" stroke="#20364a" strokeWidth="1.6" />
        <rect x="248" y="158" width="20" height="5" fill="#e8443f" stroke="#20364a" strokeWidth="1.6" />
        <path d="M300,160 L308,132 L316,160z" fill="#e8443f" stroke="#20364a" strokeWidth="1.6" />
        <rect x="298" y="158" width="20" height="5" fill="#e8443f" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 大きな時計。 */}
      <circle cx="330" cy="70" r="26" fill="#f6efe2" stroke="#20364a" strokeWidth="2.5" />
      <circle cx="330" cy="70" r="2.4" fill="#20364a" />
      <g className="bra-clock-hour">
        <line x1="330" y1="70" x2="330" y2="56" stroke="#20364a" strokeWidth="2.6" strokeLinecap="round" />
      </g>
      <g className="bra-clock-min">
        <line x1="330" y1="70" x2="344" y2="70" stroke="#20364a" strokeWidth="2" strokeLinecap="round" />
      </g>

      <style>{`
        .bra-clock-hour {
          transform-box: fill-box;
          transform-origin: 330px 70px;
          animation: bra-hour-spin 6s linear infinite;
        }
        .bra-clock-min {
          transform-box: fill-box;
          transform-origin: 330px 70px;
          animation: bra-min-spin 2s linear infinite;
        }
        @keyframes bra-hour-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bra-min-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .bra-sign {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: bra-sign-sway 3s ease-in-out infinite;
        }
        @keyframes bra-sign-sway {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bra-clock-hour, .bra-clock-min, .bra-sign { animation: none; }
        }
      `}</style>
    </svg>
  );
}
