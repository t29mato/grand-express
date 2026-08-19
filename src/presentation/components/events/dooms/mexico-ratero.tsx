/**
 * 市場ですりに遭う。青いビニールシートのティアンギス(青空市)。
 * 花柄ワンピースの買い物客がパパイヤを吟味している隙に、
 * 後ろからそっと伸びた手が籠の財布を抜いていく。
 *
 * 動くのは、抜かれていく財布・すりの忍び足・果物を吟味する手。
 * 止めても「財布が半分抜かれた瞬間」で分かる。残酷にせず、
 * 気づいていないおかしみの間で描く。
 */
export function MexicoRatero() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 明るい市場。 */}
      <rect width="400" height="210" fill="#d8c8a8" />
      <rect width="400" height="54" fill="#c8b895" />

      {/* ティアンギス名物の青いシート屋根。 */}
      <path d="M8,66 L200,44 L392,66 L376,86 L200,64 L24,86 z" fill="#2f6ea8" />
      <path d="M8,66 L24,86 M392,66 L376,86" stroke="#255a8a" strokeWidth="3" />
      <g stroke="#255a8a" strokeWidth="2" opacity="0.8">
        <path d="M60,60 L70,80 M120,53 L128,74 M200,44 L200,64 M280,53 L272,74 M340,60 L330,80" />
      </g>
      <rect x="16" y="80" width="5" height="120" fill="#8a6a44" />
      <rect x="379" y="80" width="5" height="120" fill="#8a6a44" />

      {/* 地面。 */}
      <rect y="170" width="400" height="40" fill="#b09a74" />

      {/* 果物の屋台(左)。 */}
      <g>
        <rect x="30" y="120" width="130" height="12" fill="#a8744a" />
        <rect x="36" y="132" width="8" height="52" fill="#8a5a3a" />
        <rect x="146" y="132" width="8" height="52" fill="#8a5a3a" />
        {/* 木箱と山盛りの果物。 */}
        <rect x="34" y="104" width="38" height="16" fill="#c8a050" />
        <g fill="#e8862f">
          <circle cx="42" cy="103" r="4.4" />
          <circle cx="51" cy="101" r="4.4" />
          <circle cx="60" cy="103" r="4.4" />
          <circle cx="46" cy="97" r="4.4" />
          <circle cx="56" cy="97" r="4.4" />
        </g>
        <rect x="78" y="104" width="38" height="16" fill="#c8a050" />
        <g fill="#c8e04f">
          <circle cx="86" cy="103" r="4" />
          <circle cx="95" cy="101" r="4" />
          <circle cx="104" cy="103" r="4" />
          <circle cx="90" cy="97" r="4" />
          <circle cx="100" cy="97" r="4" />
        </g>
        <rect x="122" y="104" width="34" height="16" fill="#c8a050" />
        <g fill="#c8383f">
          <circle cx="130" cy="103" r="3.6" />
          <circle cx="138" cy="101" r="3.6" />
          <circle cx="146" cy="103" r="3.6" />
          <circle cx="134" cy="97" r="3.6" />
          <circle cx="142" cy="97" r="3.6" />
        </g>
        {/* 吊るしたバナナ。 */}
        <path d="M46,120 q4,14 12,16 q-10,4 -14,-4 z" fill="#f4c430" />
        <path d="M96,120 q4,14 12,16 q-10,4 -14,-4 z" fill="#f4c430" />
      </g>

      {/* 買い物客(花柄ワンピース+三つ編み)。パパイヤを吟味中。 */}
      <g transform="translate(196,0)">
        <ellipse cx="0" cy="200" rx="15" ry="3.4" fill="#141a12" opacity="0.35" />
        <path d="M-5,172 L-7,198" stroke="#6b4a3a" strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <path d="M5,172 L7,198" stroke="#7a5544" strokeWidth="6.5" strokeLinecap="round" fill="none" />
        {/* ワンピース(花柄)。 */}
        <path d="M-10,132 L10,132 L16,176 L-16,176 z" fill="#e8a03f" />
        <g fill="#c8383f">
          <circle cx="-6" cy="146" r="2.2" />
          <circle cx="5" cy="152" r="2.2" />
          <circle cx="-3" cy="164" r="2.2" />
          <circle cx="8" cy="166" r="2.2" />
        </g>
        {/* 頭と三つ編み。 */}
        <circle cx="0" cy="121" r="9.5" fill="#b5835a" />
        <path d="M-9,118 a9.5,9.5 0 0 1 19,0 l-1,4 l-4,-5 l-13,1 z" fill="#2a1a10" />
        <path d="M8,124 q6,8 3,18" stroke="#2a1a10" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="-4" cy="121" r="1.2" fill="#2a1a10" />
        <path d="M-5,127 q3,1.8 6,0" stroke="#2a1a10" strokeWidth="1.2" fill="none" />
        {/* パパイヤを持ち上げて吟味する腕。**ここが動く。** */}
        <g className="mxra-inspect">
          <path d="M-8,140 Q-24,136 -30,124" stroke="#b5835a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <ellipse cx="-34" cy="118" rx="8" ry="11" fill="#7fa060" transform="rotate(-18 -34 118)" />
        </g>
        {/* 肘に提げた買い物籠と、抜かれていく財布。 */}
        <path d="M8,146 L18,160" stroke="#b5835a" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M14,160 h20 l-3,16 h-14 z" fill="#c8a050" />
        <path d="M14,160 h20" stroke="#a8885f" strokeWidth="2" />
        <path d="M17,160 q7,-10 14,0" stroke="#a8885f" strokeWidth="2.4" fill="none" />
        <g className="mxra-wallet">
          <rect x="20" y="150" width="13" height="9" rx="2" fill="#c8383f" />
          <rect x="20" y="153" width="13" height="2" fill="#a82a28" />
        </g>
      </g>

      {/* すり。忍び足で財布へ手を伸ばす(顔は出すが匿名的に)。 */}
      <g transform="translate(268,0)">
        <g className="mxra-thief">
          <path d="M-4,174 L-14,196" stroke="#3a3a42" strokeWidth="6.5" strokeLinecap="round" fill="none" />
          <path d="M6,174 L10,192 L18,196" stroke="#4a4a54" strokeWidth="6.5" strokeLinecap="round" fill="none" />
          {/* 前屈みの胴。 */}
          <path d="M-8,142 L14,150 L10,178 L-8,174 z" fill="#8a8a92" />
          {/* キャップの頭(前傾)。 */}
          <circle cx="-12" cy="140" r="8.6" fill="#c98a5f" />
          <path d="M-20,138 a8.6,8.6 0 0 1 14,-5 l-16,2 z" fill="#4a4a54" />
          <path d="M-21,137 l-6,2" stroke="#4a4a54" strokeWidth="3" />
          <circle cx="-15" cy="140" r="1.2" fill="#2a1a10" />
          {/* 財布へ伸びる腕。 */}
          <path d="M-6,152 Q-24,150 -37,152" stroke="#c98a5f" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* 「しーっ」と立てたもう片方の手。 */}
          <path d="M10,154 Q18,148 16,140" stroke="#c98a5f" strokeWidth="4.4" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 気づいていない店主(奥で新聞)。 */}
      <g transform="translate(72,0)">
        <circle cx="0" cy="138" r="8" fill="#b5835a" />
        <path d="M-8,136 a8,8 0 0 1 16,0" stroke="#d8d0c8" strokeWidth="3" fill="none" />
        <path d="M-9,146 L9,146 L11,168 L-11,168 z" fill="#5b8fe8" />
        <path d="M-12,152 h24 l-2,10 h-20 z" fill="#e8e0d0" />
        <path d="M-8,156 h16 M-8,159 h16" stroke="#8a8680" strokeWidth="1" />
      </g>

      <style>{`
        .mxra-wallet {
          animation: mxra-slip 3.2s ease-in-out infinite;
        }
        @keyframes mxra-slip {
          0%, 20%  { transform: translate(0, 6px) rotate(0deg); }
          55%      { transform: translate(10px, -2px) rotate(14deg); }
          80%, 100% { transform: translate(22px, -6px) rotate(24deg); }
        }
        .mxra-thief {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mxra-tiptoe 0.9s ease-in-out infinite;
        }
        @keyframes mxra-tiptoe {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2.4px); }
        }
        .mxra-inspect {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: mxra-turn 2.4s ease-in-out infinite;
        }
        @keyframes mxra-turn {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-8deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mxra-wallet, .mxra-thief, .mxra-inspect {
            animation: none;
          }
          /* 止まっていても分かるように: 財布は籠から半分抜かれた位置。 */
          .mxra-wallet { transform: translate(8px, 0) rotate(12deg); }
        }
      `}</style>
    </svg>
  );
}
