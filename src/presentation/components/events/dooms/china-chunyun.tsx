/**
 * 春運に巻き込まれる。帰省列車の座席はどれも何週間も前に売り切れ、
 * 世界最大の年に一度の民族大移動がおよそ四十日のあいだ続く。
 *
 * 動くのは、ホームを離れていく列車1本だけ。
 */
export function ChinaChunyun() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 駅の屋根の下。 */}
      <rect width="400" height="210" fill="#c9d4dc" />
      <rect y="0" width="400" height="60" fill="#8f96a0" />
      <g fill="#7a8290">
        <rect x="0" y="52" width="400" height="10" />
        <rect x="20" y="10" width="8" height="50" />
        <rect x="190" y="10" width="8" height="50" />
        <rect x="360" y="10" width="8" height="50" />
      </g>

      {/* 出発案内板。「満」の赤いランプが並ぶ。 */}
      <g strokeLinejoin="round">
        <rect x="150" y="70" width="100" height="34" rx="2" fill="#20364a" stroke="#4a4a52" strokeWidth="2" />
        <g fill="#e8443f">
          <circle cx="166" cy="80" r="3" />
          <circle cx="166" cy="90" r="3" />
          <circle cx="182" cy="80" r="3" />
          <circle cx="182" cy="90" r="3" />
          <circle cx="198" cy="80" r="3" />
          <circle cx="198" cy="90" r="3" />
        </g>
      </g>

      {/* ホーム。 */}
      <rect y="150" width="400" height="60" fill="#9a9488" />
      <rect y="150" width="400" height="4" fill="#e8dcc0" />

      {/* 積み上げた荷物の山。 */}
      <g strokeLinejoin="round">
        <rect x="30" y="168" width="30" height="30" rx="2" fill="#c9302c" stroke="#20364a" strokeWidth="2" />
        <rect x="62" y="176" width="26" height="22" rx="2" fill="#3f8f6f" stroke="#20364a" strokeWidth="2" />
        <path d="M40,168 v-14 M50,168 v-14" stroke="#8a1f1f" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* 待つ人々(簡略シルエット)。 */}
      <g fill="#4a4a52">
        <circle cx="110" cy="176" r="7" />
        <rect x="103" y="183" width="14" height="24" rx="3" />
        <circle cx="320" cy="178" r="7" />
        <rect x="313" y="185" width="14" height="24" rx="3" />
        <circle cx="345" cy="174" r="6" />
        <rect x="339" y="180" width="12" height="22" rx="3" />
      </g>

      {/* ホームを離れていく列車。**ここだけが動く。** */}
      <g className="ccy-train" strokeLinejoin="round">
        <rect x="140" y="118" width="120" height="34" rx="4" fill="#2f6ea8" stroke="#20364a" strokeWidth="2.5" />
        <rect x="150" y="126" width="18" height="14" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.6" />
        <rect x="176" y="126" width="18" height="14" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.6" />
        <rect x="202" y="126" width="18" height="14" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.6" />
        <rect x="228" y="126" width="18" height="14" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.6" />
        <rect x="146" y="150" width="108" height="6" fill="#4a4a52" />
      </g>

      <style>{`
        .ccy-train {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: ccy-depart 2.2s ease-in infinite;
        }
        @keyframes ccy-depart {
          0% { transform: translateX(0); opacity: 1; }
          70% { transform: translateX(220px); opacity: 1; }
          100% { transform: translateX(260px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ccy-train { animation: none; }
        }
      `}</style>
    </svg>
  );
}
