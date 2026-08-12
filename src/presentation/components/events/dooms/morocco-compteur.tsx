/**
 * プティ・タクシーの運転手がメーター(コンプトゥール)を回さず、値段を
 * 勝手に決める。運転手の腕がメーターを手で払いのけ、代わりに札を突き出す。
 *
 * 動くのはタクシーの走行、運転手の腕の動き、突き出される紙幣だけ。
 */
export function MoroccoCompteur() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の街並み。 */}
      <rect width="400" height="210" fill="#5f7f9f" />
      <rect y="0" width="400" height="90" fill="#7f9fb8" />
      <path d="M0,110c60,-16 120,-16 180,-4c80,-14 160,-4 220,-10v14H0z" fill="#c9a877" opacity="0.7" />

      {/* 道路。 */}
      <rect y="120" width="400" height="90" fill="#4a4a52" />
      <g stroke="#e8dcc0" strokeWidth="4" strokeDasharray="26 20">
        <path d="M0,164h400" />
      </g>

      {/* 走ってくるプティ・タクシー(赤)。 */}
      <g className="mo-cmp-car">
        <path d="M20,180 L34,158 L96,158 L110,180z" fill="#e8443f" stroke="#20364a" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="16" y="178" width="98" height="18" rx="4" fill="#d0362c" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="38" cy="198" r="9" fill="#241a10" />
        <circle cx="92" cy="198" r="9" fill="#241a10" />
        <rect x="44" y="164" width="18" height="10" fill="#bfe0f0" opacity="0.9" />

        {/* 運転席の腕。メーターを払いのける仕草。 */}
        <g className="mo-cmp-arm" transform="translate(56,170)">
          <rect x="-3" y="0" width="6" height="16" rx="3" fill="#c98a5a" />
        </g>
        {/* ダッシュボードのメーター(小さな箱)。 */}
        <rect x="48" y="176" width="8" height="8" rx="1.4" fill="#20364a" />
        <circle className="mo-cmp-meter-off" cx="52" cy="180" r="2" fill="#e8443f" />
      </g>

      {/* 突き出される紙幣(客の手に渡る)。 */}
      <g className="mo-cmp-bill">
        <rect x="140" y="172" width="26" height="14" rx="1.4" fill="#c9a877" stroke="#5a4630" strokeWidth="1.4" />
        <circle cx="153" cy="179" r="4" fill="#e8dcc0" />
      </g>

      {/* 客の困った様子(単純な人影、腕組み)。 */}
      <g>
        <circle cx="190" cy="164" r="10" fill="#f6efe2" />
        <rect x="180" y="174" width="20" height="30" rx="6" fill="#5b8fe8" />
      </g>

      <style>{`
        .mo-cmp-car {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: mo-cmp-drive 3.4s linear infinite;
        }
        @keyframes mo-cmp-drive {
          0% { transform: translateX(-20px); }
          55% { transform: translateX(80px); }
          100% { transform: translateX(80px); }
        }
        .mo-cmp-arm {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: mo-cmp-wave 3.4s linear infinite;
        }
        @keyframes mo-cmp-wave {
          0%, 55% { transform: rotate(0deg); }
          62% { transform: rotate(-30deg); }
          68% { transform: rotate(10deg); }
          74% { transform: rotate(-20deg); }
          80%, 100% { transform: rotate(0deg); }
        }
        .mo-cmp-meter-off {
          animation: mo-cmp-blink 3.4s linear infinite;
        }
        @keyframes mo-cmp-blink {
          0%, 60% { opacity: 1; }
          65% { opacity: 0.15; }
          70% { opacity: 1; }
          75%, 100% { opacity: 0.15; }
        }
        .mo-cmp-bill {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          opacity: 0;
          animation: mo-cmp-hand 3.4s linear infinite;
        }
        @keyframes mo-cmp-hand {
          0%, 68% { opacity: 0; transform: translateX(-20px); }
          78% { opacity: 1; transform: translateX(0px); }
          100% { opacity: 1; transform: translateX(0px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mo-cmp-car { animation: none; transform: translateX(80px); }
          .mo-cmp-arm { animation: none; transform: rotate(-20deg); }
          .mo-cmp-meter-off { animation: none; opacity: 0.15; }
          .mo-cmp-bill { animation: none; opacity: 1; transform: translateX(0px); }
        }
      `}</style>
    </svg>
  );
}
