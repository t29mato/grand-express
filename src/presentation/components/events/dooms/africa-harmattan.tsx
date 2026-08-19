/**
 * ハルマッタン。サハラから吹く乾いた季節風が線路を砂で埋める。
 * 白茶けた霞の向こうにバオバブと村がかすみ、手前では作業員が
 * 線路をシャベルで掘り出している。
 *
 * 動くのは3つ: 右から左へ流れる砂塵の帯、作業員の掘る動き、
 * ポールの布のはためき。止めても「半分埋まった線路と掘る人」で伝わる。
 * (アジア盤の砂嵐とは別物にする: あちらは無人・銅色の空・シャベルは置物)
 */
export function AfricaHarmattan() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 白茶けた霞の空。太陽は輪郭だけ。 */}
      <rect width="400" height="210" fill="#d9c49a" />
      <rect width="400" height="96" fill="#e4d2ac" />
      <circle cx="86" cy="48" r="20" fill="#f0e2c0" />

      {/* 中景: 霞に沈むバオバブと村。 */}
      <g fill="#b89a6e">
        <path d="M296,128 q3,-12 1,-24 q-1,-9 5,-11 h12 q6,2 5,11 q-2,12 1,24z" />
        <path d="M303,94 q-7,-6 -15,-7 M306,93 q-3,-9 -8,-14 M310,92 v-12 M314,93 q3,-9 8,-14 M317,94 q7,-6 15,-7" stroke="#b89a6e" strokeWidth="3.4" fill="none" />
        <rect x="40" y="112" width="26" height="16" />
        <path d="M36,112 h34 l-17,-12z" />
        <rect x="76" y="116" width="20" height="12" />
        <path d="M73,116 h26 l-13,-9z" />
      </g>

      {/* 地面。 */}
      <rect y="128" width="400" height="82" fill="#c9a468" />
      <path d="M0,128 q80,-8 160,0 t240,0 v8 H0z" fill="#d4b47c" />

      {/* 線路。右半分が吹きだまりに沈む。 */}
      <g>
        <rect x="0" y="168" width="400" height="12" fill="#b8935f" opacity="0.6" />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={8 + i * 29} y="168" width="12" height="7" fill="#7a6444" />
        ))}
        <rect x="0" y="166" width="400" height="4" fill="#5a5248" />
        <path d="M212,152 q60,-6 110,10 q40,12 78,10 v38 H190 q-4,-30 22,-58z" fill="#d4b47c" />
        <path d="M242,162 q40,-4 70,8" stroke="#c09858" strokeWidth="3" fill="none" />
      </g>

      {/* 目印のポールと、風で流れる布。 */}
      <g>
        <rect x="330" y="126" width="4" height="44" fill="#7a6444" />
        <g className="africa-hm-cloth">
          <path d="M330,130 q-16,2 -26,-4 q4,8 -2,12 q16,2 28,-2z" fill="#c8384f" />
        </g>
      </g>

      {/* 作業員。ヘッドラップと青緑のシャツで、線路を掘り出す。 */}
      <g transform="translate(120,0)">
        <g className="africa-hm-digger">
          <circle cx="0" cy="128" r="8" fill="#6b4a34" />
          <path d="M-7,124 q7,-6 14,0 l-1,-4 q-6,-4 -12,0z" fill="#e8dcc4" />
          <path d="M0,136 q-4,12 -2,24" stroke="#2f8f8a" strokeWidth="10" fill="none" />
          <path d="M-3,158 l-8,16 M-1,158 l6,16" stroke="#5a4a3a" strokeWidth="5" fill="none" />
          <path d="M2,140 q10,4 18,12" stroke="#2f8f8a" strokeWidth="5" fill="none" />
          {/* シャベル。 */}
          <path d="M20,152 L38,168" stroke="#8b6a1a" strokeWidth="4" fill="none" />
          <path d="M34,164 l10,8 -7,7 -9,-9z" fill="#8b8f98" />
        </g>
        {/* 掘り上げた砂の山。 */}
        <path d="M28,180 q10,-8 22,0z" fill="#b8935f" />
      </g>

      {/* 流れる砂塵の帯。**ここが主に動く。** */}
      <g className="africa-hm-dust1" fill="#e8d4a4" opacity="0.55">
        <ellipse cx="320" cy="60" rx="90" ry="12" />
        <ellipse cx="150" cy="92" rx="110" ry="14" />
      </g>
      <g className="africa-hm-dust2" fill="#f0e2c0" opacity="0.45">
        <ellipse cx="240" cy="140" rx="120" ry="12" />
        <ellipse cx="60" cy="70" rx="70" ry="10" />
      </g>

      <style>{`
        .africa-hm-dust1 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: africa-hm-drift 3s linear infinite;
        }
        .africa-hm-dust2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: africa-hm-drift 4.2s linear -2s infinite;
        }
        @keyframes africa-hm-drift {
          0% { transform: translateX(48px); opacity: 0.25; }
          50% { opacity: 0.6; }
          100% { transform: translateX(-48px); opacity: 0.25; }
        }
        .africa-hm-digger {
          transform-box: fill-box;
          transform-origin: 30% 90%;
          animation: africa-hm-dig 1.6s ease-in-out infinite;
        }
        @keyframes africa-hm-dig {
          0%, 100% { transform: rotate(0deg); }
          45% { transform: rotate(9deg) translateY(3px); }
        }
        .africa-hm-cloth {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: africa-hm-flap 1.1s ease-in-out infinite;
        }
        @keyframes africa-hm-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.72) rotate(-6deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .africa-hm-dust1,
          .africa-hm-dust2,
          .africa-hm-digger,
          .africa-hm-cloth { animation: none; }
        }
      `}</style>
    </svg>
  );
}
