/**
 * 速度違反取締機(アウトヴェロックス)に捕まる。灰色の小さな箱が道端にあり、
 * 車が通り過ぎた瞬間に白い閃光がまたたく。運転手は気づいていない。
 *
 * 動くのは車の走行と、閃光の明滅だけ。壊れたものは描かない
 * (道路交通の取り締まりであって事故ではない)。
 */
export function ItalyAutovelox() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の空。 */}
      <rect width="400" height="210" fill="#5f7f9f" />
      <rect y="0" width="400" height="90" fill="#7f9fb8" />

      {/* 遠景の丘。 */}
      <path d="M0,110c60,-20 120,-20 180,-6c80,-18 160,-6 220,-14v20H0z" fill="#4a6a4a" opacity="0.8" />

      {/* 道路。 */}
      <rect y="120" width="400" height="90" fill="#4a4a52" />
      <g stroke="#e8dcc0" strokeWidth="4" strokeDasharray="26 20">
        <path d="M0,164h400" />
      </g>

      {/* 取締機の箱(道端、灰色)。 */}
      <g strokeLinejoin="round">
        <rect x="330" y="118" width="4" height="24" fill="#6b7060" />
        <rect x="316" y="96" width="30" height="24" rx="3" fill="#8a8f95" stroke="#4a4f42" strokeWidth="2" />
        <rect x="322" y="102" width="18" height="12" rx="2" fill="#20364a" />
      </g>

      {/* 車(左から右へ走る)。 */}
      <g className="ita-av-car">
        <path d="M40,178 L54,156 L106,156 L120,178z" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="36" y="176" width="88" height="18" rx="4" fill="#4a7bd0" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="56" cy="196" r="9" fill="#241a10" />
        <circle cx="104" cy="196" r="9" fill="#241a10" />
        <rect x="62" y="162" width="18" height="10" fill="#bfe0f0" opacity="0.9" />
      </g>

      {/* 取締機の閃光(ここだけが明滅する)。 */}
      <circle className="ita-av-flash" cx="331" cy="108" r="14" fill="#f6efe2" />

      {/* 郵送で届く違反通知の封筒(遠くにうっすら、後で届くことの暗示)。 */}
      <g opacity="0.75">
        <rect x="250" y="30" width="30" height="20" rx="2" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
        <path d="M250,30l15,12l15,-12" fill="none" stroke="#20364a" strokeWidth="1.4" />
      </g>

      <style>{`
        .ita-av-car {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ita-av-drive 3.2s linear infinite;
        }
        @keyframes ita-av-drive {
          0% { transform: translateX(-40px); }
          70% { transform: translateX(300px); }
          100% { transform: translateX(300px); }
        }
        .ita-av-flash {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          opacity: 0;
          animation: ita-av-blink 3.2s linear infinite;
        }
        @keyframes ita-av-blink {
          0% { opacity: 0; }
          52% { opacity: 0; }
          55% { opacity: 1; transform: scale(1.6); }
          60% { opacity: 0; transform: scale(1); }
          100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ita-av-car { animation: none; transform: translateX(260px); }
          .ita-av-flash { animation: none; opacity: 0.9; }
        }
      `}</style>
    </svg>
  );
}
