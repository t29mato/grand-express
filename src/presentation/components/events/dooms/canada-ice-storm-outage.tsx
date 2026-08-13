/**
 * 着氷性の嵐で何日も停電する。氷に覆われた枝の重みで電線が切れ、
 * 家の窓の明かりが消える。
 *
 * 動くのは垂れ下がる電線と、消える窓の明かりだけ。
 */
export function CanadaIceStormOutage() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜、氷に覆われた通り。 */}
      <rect width="400" height="210" fill="#141c28" />
      <rect y="0" width="400" height="150" fill="#1c2836" />
      <rect y="150" width="400" height="60" fill="#0f161f" />

      {/* 氷をまとった木。 */}
      <g stroke="#cfe4f0" strokeWidth="2" fill="none" opacity="0.9">
        <path d="M60,150V80" />
        <path d="M60,110l-30,-16M60,100l32,-14M60,90l-26,-10" />
      </g>
      <circle cx="30" cy="64" r="2" fill="#e8f4f6" /><circle cx="92" cy="86" r="2" fill="#e8f4f6" />

      {/* 家。 */}
      <rect x="220" y="120" width="90" height="60" fill="#2a3442" />
      <path d="M214,120h102l-18,-24h-66z" fill="#1c2430" />

      {/* 消える窓の明かり。ここが動く。 */}
      <g className="cio-window" fill="#f5e8c0">
        <rect x="240" y="140" width="18" height="18" />
        <rect x="270" y="140" width="18" height="18" />
      </g>

      {/* 電柱と、氷の重みで垂れ下がる電線。ここも動く(2枚を入れ替えて表す)。 */}
      <rect x="130" y="70" width="5" height="90" fill="#4a4f5a" />
      <rect x="360" y="80" width="5" height="80" fill="#4a4f5a" />
      <path className="cio-wire-taut" d="M135,90 Q250,110 360,96" fill="none" stroke="#20232a" strokeWidth="2.5" />
      <path className="cio-wire-sag" d="M135,90 Q250,150 360,96" fill="none" stroke="#20232a" strokeWidth="2.5" />

      {/* 垂れ下がった先で弾ける火花。 */}
      <g className="cio-spark" fill="#f5b31c">
        <circle cx="250" cy="120" r="2.4" />
        <circle cx="256" cy="124" r="1.8" />
      </g>

      <style>{`
        .cio-wire-taut {
          animation: cio-taut 3s steps(1) infinite;
        }
        @keyframes cio-taut {
          0%, 58% { opacity: 1; }
          62%, 100% { opacity: 0; }
        }
        .cio-wire-sag {
          animation: cio-sag 3s steps(1) infinite;
        }
        @keyframes cio-sag {
          0%, 58% { opacity: 0; }
          62%, 100% { opacity: 1; }
        }
        .cio-spark {
          opacity: 0;
          animation: cio-flash 3s steps(1) infinite;
        }
        @keyframes cio-flash {
          0%, 58% { opacity: 0; }
          62%, 70% { opacity: 1; }
          74%, 100% { opacity: 0; }
        }
        .cio-window {
          animation: cio-outage 3s steps(1) infinite;
        }
        @keyframes cio-outage {
          0%, 60% { opacity: 1; }
          62%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cio-wire-taut, .cio-wire-sag, .cio-spark, .cio-window { animation: none; }
          .cio-wire-taut { opacity: 0; }
          .cio-wire-sag { opacity: 1; }
          .cio-spark { opacity: 1; }
          .cio-window { opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
