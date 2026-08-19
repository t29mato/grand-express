/**
 * シエスタで何もかも閉まる。昼の数時間、窓口も商店もいっせいに閉まり、
 * 切符も買えず足止めを食う。
 *
 * **昼寝している人は描かない**(「スペイン人は昼に寝る」は紋切り型)。
 * 描くのは事実の側: 下りたシャッター2枚・真昼の高い日差しと濃い影・
 * 2時半を指す時計と、その前で待つしかない旅人。
 *
 * 動き: 旅人のため息と足のいらいら、日よけの揺れ、路面から立ちのぼる陽炎。
 * 止めても「閉まった店の前で人が待っている」構図はそのまま残る。
 */
export function SpainSiesta() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 白く暑い真昼の空 */}
      <rect width="400" height="210" fill="#a8d4ec" />
      <rect width="400" height="54" fill="#bfe0f0" />
      <circle cx="338" cy="34" r="18" fill="#f6e6a8" />
      <circle cx="338" cy="34" r="26" fill="#f6e6a8" opacity="0.35" />

      {/* 白い漆喰の通り。屋根はテラコッタ瓦 */}
      <rect x="0" y="52" width="400" height="116" fill="#f6efe2" />
      <rect x="0" y="46" width="400" height="10" fill="#c9773f" />
      <g fill="#b5602f">
        <rect x="14" y="46" width="4" height="10" />
        <rect x="54" y="46" width="4" height="10" />
        <rect x="94" y="46" width="4" height="10" />
        <rect x="134" y="46" width="4" height="10" />
        <rect x="174" y="46" width="4" height="10" />
        <rect x="214" y="46" width="4" height="10" />
        <rect x="254" y="46" width="4" height="10" />
        <rect x="294" y="46" width="4" height="10" />
        <rect x="334" y="46" width="4" height="10" />
        <rect x="374" y="46" width="4" height="10" />
      </g>

      {/* 壁の時計。昼下がりの2時半 */}
      <g>
        <circle cx="200" cy="74" r="15" fill="#f6efe2" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="200" cy="86" r="2" fill="#20364a" opacity="0" />
        <path d="M200,74 L207,79" stroke="#20364a" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M200,74 L200,85" stroke="#e8443f" strokeWidth="2" strokeLinecap="round" />
        <circle cx="200" cy="74" r="1.8" fill="#20364a" />
      </g>

      {/* 左の店: 縞の日よけと下りたシャッター */}
      <g>
        <rect x="52" y="96" width="104" height="72" fill="#e0d3b8" />
        {/* 日よけ(揺れる) */}
        <g className="ssta-awning">
          <path d="M46,96 L162,96 L154,80 L54,80z" fill="#e8443f" />
          <g fill="#f6efe2">
            <path d="M66,80 L62,96 L76,96 L79,80z" />
            <path d="M92,80 L90,96 L104,96 L105,80z" />
            <path d="M118,80 L118,96 L132,96 L131,80z" />
            <path d="M144,80 L146,96 L158,96 L152,80z" />
          </g>
        </g>
        {/* シャッター */}
        <rect x="58" y="100" width="92" height="68" fill="#7a8088" />
        <g stroke="#61666e" strokeWidth="3.4" fill="none">
          <path d="M58,109 H150" />
          <path d="M58,120 H150" />
          <path d="M58,131 H150" />
          <path d="M58,142 H150" />
          <path d="M58,153 H150" />
        </g>
        <rect x="58" y="162" width="92" height="6" fill="#565b62" />
        {/* 貼り紙(文字は描かない。赤い帯だけの掲示) */}
        <g className="ssta-note">
          <rect x="88" y="112" width="32" height="24" rx="2" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
          <rect x="93" y="118" width="22" height="5" rx="2.5" fill="#e8443f" />
          <rect x="93" y="127" width="14" height="3" rx="1.5" fill="#8d96a0" />
        </g>
      </g>

      {/* 右の店: こちらもシャッター、前に積んだ椅子 */}
      <g>
        <rect x="268" y="98" width="88" height="70" fill="#e0d3b8" />
        <rect x="274" y="104" width="76" height="64" fill="#8a9098" />
        <g stroke="#70767e" strokeWidth="3.2" fill="none">
          <path d="M274,113 H350" />
          <path d="M274,124 H350" />
          <path d="M274,135 H350" />
          <path d="M274,146 H350" />
          <path d="M274,157 H350" />
        </g>
        {/* 逆さに積んだテラス席の椅子 */}
        <g stroke="#6b5330" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M362,168 L362,146 M376,168 L376,146 M358,150 H380" />
          <path d="M364,144 L374,144 M362,146 L376,138" />
        </g>
      </g>

      {/* 通りの路面と真昼の濃い影 */}
      <rect x="0" y="168" width="400" height="42" fill="#c9a877" />
      <path d="M0,168 H400 V178 L0,186z" fill="#8a6a44" opacity="0.55" />

      {/* 待つ旅人: 腕組みして時計を見上げる */}
      <g transform="translate(196,168)">
        <g className="ssta-wait">
          <circle cx="0" cy="-52" r="12" fill="#d9a273" />
          <path d="M-12,-56 a12,12 0 0 1 24,0 l0,2 -24,0z" fill="#3a2a1e" />
          <circle cx="-4" cy="-51" r="2.2" fill="#2a1f18" />
          <circle cx="5" cy="-51" r="2.2" fill="#2a1f18" />
          <path d="M-3,-44 h7" stroke="#a8654a" strokeWidth="2.2" strokeLinecap="round" />
          {/* 胴と組んだ腕 */}
          <path d="M-13,-40 h26 l-3,32 h-20z" fill="#5b8fe8" />
          <path d="M-13,-30 q13,8 26,0 l0,7 q-13,8 -26,0z" fill="#4a7bd0" />
        </g>
        {/* 脚。右足だけいらいらと爪先を鳴らす */}
        <rect x="-9" y="-9" width="7" height="9" fill="#20364a" />
        <g className="ssta-foot">
          <rect x="3" y="-9" width="7" height="9" fill="#20364a" />
        </g>
        {/* 旅行鞄 */}
        <rect x="16" y="-16" width="26" height="16" rx="3" fill="#5c4632" />
        <rect x="25" y="-20" width="8" height="5" rx="2" fill="#3f3022" />
      </g>

      {/* 縁石に座って扇であおぐ人 */}
      <g transform="translate(36,168)">
        <rect x="-14" y="-8" width="42" height="8" fill="#b08a5c" />
        <circle cx="4" cy="-38" r="11" fill="#e8b88a" />
        <path d="M-7,-42 a11,11 0 0 1 22,0 l0,2 -22,0z" fill="#6e553c" />
        <circle cx="0" cy="-37" r="2" fill="#2a1f18" />
        <circle cx="8" cy="-37" r="2" fill="#2a1f18" />
        <path d="M1,-31 q3,2 6,0" stroke="#a8654a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M-8,-28 h24 l-2,20 h-20z" fill="#3f8f6f" />
        <path d="M-6,-8 h9 v-8 h-9z M13,-8 h9 v-8 h-9z" fill="#20364a" />
        {/* 扇(あおぐ) */}
        <g className="ssta-fan">
          <path d="M18,-26 l14,-12 a19,19 0 0 1 6,16z" fill="#e8443f" />
          <path d="M18,-26 l14,-12 M18,-26 l17,-7 M18,-26 l19,-1" stroke="#f6efe2" strokeWidth="1.2" fill="none" />
        </g>
        <path d="M12,-24 L18,-26" stroke="#e8b88a" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* 路面から立ちのぼる陽炎 */}
      <g stroke="#f6efe2" strokeWidth="2" fill="none" opacity="0.5">
        <path className="ssta-heat-a" d="M120,164 q4,-8 0,-16 q-4,-8 0,-16" />
        <path className="ssta-heat-b" d="M244,166 q4,-8 0,-16 q-4,-8 0,-16" />
        <path className="ssta-heat-c" d="M312,180 q4,-8 0,-16 q-4,-8 0,-16" />
      </g>

      <style>{`
        .ssta-awning { transform-box: fill-box; transform-origin: 50% 0%; animation: ssta-sway 3.2s ease-in-out infinite; }
        .ssta-note { transform-box: fill-box; transform-origin: top center; animation: ssta-peel 4.2s ease-in-out infinite; }
        .ssta-wait { transform-box: fill-box; transform-origin: 50% 100%; animation: ssta-sigh 3.6s ease-in-out infinite; }
        .ssta-foot { transform-box: fill-box; transform-origin: 50% 0%; animation: ssta-tap 0.6s ease-in-out infinite; }
        .ssta-fan { transform-box: fill-box; transform-origin: 0% 100%; animation: ssta-flutter 0.9s ease-in-out infinite; }
        .ssta-heat-a { animation: ssta-rise 2.4s linear infinite; }
        .ssta-heat-b { animation: ssta-rise 2.4s linear infinite; animation-delay: -0.8s; }
        .ssta-heat-c { animation: ssta-rise 2.4s linear infinite; animation-delay: -1.6s; }
        @keyframes ssta-sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1.6deg); }
        }
        @keyframes ssta-peel {
          0%, 100% { transform: rotate(0deg); }
          55% { transform: rotate(3deg); }
        }
        @keyframes ssta-sigh {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          40% { transform: rotate(-3deg) translateY(1.5px); }
          70% { transform: rotate(1.5deg) translateY(0); }
        }
        @keyframes ssta-tap {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-14deg); }
        }
        @keyframes ssta-flutter {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(14deg); }
        }
        @keyframes ssta-rise {
          0% { transform: translateY(6px); opacity: 0; }
          30% { opacity: 0.5; }
          100% { transform: translateY(-14px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ssta-awning, .ssta-note, .ssta-wait, .ssta-foot, .ssta-fan,
          .ssta-heat-a, .ssta-heat-b, .ssta-heat-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
