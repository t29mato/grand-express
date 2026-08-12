/**
 * 交通警察の検問と罰金。GIBDD(交通警察)の隊員が路肩に立ち、
 * 白黒の縞のバトン(ジェズル)を振って車を停める。屋根の警光灯が明滅する。
 *
 * 動くのは、走ってきて停まる車と、警光灯の明滅だけ。
 */
export function RussiaGibdd() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の空。 */}
      <rect width="400" height="210" fill="#5f7f9f" />
      <rect y="0" width="400" height="90" fill="#7f9fb8" />

      {/* 遠景の丘。 */}
      <path d="M0,112c60,-18 120,-18 180,-4c80,-16 160,-4 220,-12v20H0z" fill="#4a6a4a" opacity="0.8" />

      {/* 道路。 */}
      <rect y="122" width="400" height="88" fill="#4a4a52" />
      <g stroke="#e8dcc0" strokeWidth="4" strokeDasharray="26 20">
        <path d="M0,166h400" />
      </g>
      {/* 路肩線。 */}
      <path d="M0,196h400" stroke="#e8dcc0" strokeWidth="2" opacity="0.6" />

      {/* GIBDDの隊員(路肩に立つ)。 */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <circle cx="340" cy="150" r="11" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="329" y="160" width="22" height="30" rx="4" fill="#2a5a8f" stroke="#20364a" strokeWidth="2" />
        <rect x="322" y="140" width="36" height="8" rx="2" fill="#20364a" opacity="0.85" />
        {/* 縞のバトン(ジェズル)。腕は静止、バトンだけ強調。 */}
        <rect x="352" y="156" width="26" height="5" rx="2" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
        <rect x="360" y="156" width="6" height="5" fill="#20364a" />
        <rect x="372" y="156" width="6" height="5" fill="#20364a" />
      </g>

      {/* 屋根の警光灯(灰色の柱の上)。 */}
      <g strokeLinejoin="round">
        <rect x="313" y="118" width="4" height="10" fill="#6b7060" />
        <rect x="306" y="110" width="18" height="8" rx="2" fill="#8a8f95" stroke="#4a4f42" strokeWidth="1.6" />
      </g>
      <circle className="rg-light-blue" cx="311" cy="114" r="5" fill="#5b8fe8" />
      <circle className="rg-light-red" cx="319" cy="114" r="5" fill="#e8443f" />

      {/* 車(右から入って停まる)。 */}
      <g className="rg-car">
        <path d="M60,180 L74,158 L126,158 L140,180z" fill="#c9a877" stroke="#20364a" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="56" y="178" width="88" height="18" rx="4" fill="#b8945f" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="76" cy="198" r="9" fill="#241a10" />
        <circle cx="124" cy="198" r="9" fill="#241a10" />
        <rect x="82" y="164" width="18" height="10" fill="#bfe0f0" opacity="0.9" />
      </g>

      <style>{`
        .rg-car {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: rg-drive 3.4s linear infinite;
        }
        @keyframes rg-drive {
          0% { transform: translateX(220px); }
          55% { transform: translateX(60px); }
          100% { transform: translateX(60px); }
        }
        .rg-light-blue, .rg-light-red {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .rg-light-blue { animation: rg-blink-a 0.6s steps(1) infinite; }
        .rg-light-red { animation: rg-blink-b 0.6s steps(1) infinite; }
        @keyframes rg-blink-a {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @keyframes rg-blink-b {
          0%, 49% { opacity: 0.25; }
          50%, 100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rg-car { animation: none; transform: translateX(60px); }
          .rg-light-blue, .rg-light-red { animation: none; opacity: 0.9; }
        }
      `}</style>
    </svg>
  );
}
