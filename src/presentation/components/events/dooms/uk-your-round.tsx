/**
 * なぜかまた自分の番になる会計。食卓を囲む誰もが自分の番だと言い張り、
 * 断るより払うほうが分がいい。
 *
 * 伸び続ける勘定書と、指をさす手で「押し付けられた」ことを示す。
 * 動くのは、下へ伸びていく勘定書と、小さくなっていく手元の小銭。
 */
export function UkYourRound() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄暗いパブの店内。 */}
      <rect width="400" height="210" fill="#3a2f28" />
      <rect y="0" width="400" height="70" fill="#4a3d32" />
      <circle cx="90" cy="34" r="16" fill="#f5c25a" opacity="0.7" />
      <circle cx="320" cy="30" r="14" fill="#f5c25a" opacity="0.6" />

      {/* 奥の棚とグラス。 */}
      <rect x="0" y="40" width="400" height="10" fill="#2a221c" />
      <g fill="#c8ccc4" opacity="0.5">
        <rect x="20" y="30" width="6" height="10" />
        <rect x="32" y="30" width="6" height="10" />
        <rect x="360" y="30" width="6" height="10" />
        <rect x="372" y="30" width="6" height="10" />
      </g>

      {/* テーブル。 */}
      <rect y="150" width="400" height="60" fill="#5a4530" />
      <rect y="150" width="400" height="6" fill="#6b5540" />

      {/* パイントグラス数個。 */}
      <g strokeLinejoin="round">
        <path d="M60,120 L58,150 L82,150 L80,120z" fill="#e8c860" opacity="0.9" stroke="#3a2f28" strokeWidth="1.6" />
        <rect x="58" y="120" width="22" height="8" fill="#f2f0e8" opacity="0.85" />
        <path d="M120,128 L118,150 L140,150 L138,128z" fill="#c8843a" opacity="0.9" stroke="#3a2f28" strokeWidth="1.6" />
        <rect x="118" y="128" width="20" height="7" fill="#f2f0e8" opacity="0.8" />
        <path d="M280,124 L278,150 L302,150 L300,124z" fill="#e8c860" opacity="0.9" stroke="#3a2f28" strokeWidth="1.6" />
        <rect x="278" y="124" width="22" height="8" fill="#f2f0e8" opacity="0.85" />
      </g>

      {/* 指をさす手。 */}
      <path d="M180,120 L210,140" stroke="#d9a273" strokeWidth="7" strokeLinecap="round" />
      <path d="M340,124 L312,140" stroke="#d9a273" strokeWidth="7" strokeLinecap="round" />

      {/* 座って肩を落とす人(勘定を払う側)。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="222" cy="118" r="11" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <path d="M222,128 a4,4 0 0 0 0,10" stroke="#20364a" strokeWidth="1.6" fill="none" />
        <path d="M210,132 L234,132 L230,158 L214,158z" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 小さくなる手元の小銭。**ここが動く。** */}
      <g className="ukr-coins" fill="#f5b31c">
        <circle cx="200" cy="164" r="7" />
        <circle cx="216" cy="166" r="6" />
        <circle cx="188" cy="170" r="5" />
      </g>

      {/* 伸び続ける勘定書。**ここも動く。** */}
      <g className="ukr-bill">
        <rect x="230" y="90" width="26" height="0" fill="#f6efe2" stroke="#8a8478" strokeWidth="1" />
        <line x1="235" y1="0" x2="251" y2="0" stroke="#3a2f28" strokeWidth="1" />
        <line x1="235" y1="0" x2="251" y2="0" stroke="#3a2f28" strokeWidth="1" />
        <line x1="235" y1="0" x2="251" y2="0" stroke="#c8383f" strokeWidth="1.2" />
      </g>

      <style>{`
        .ukr-bill rect {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: ukr-grow 3s ease-in-out infinite;
        }
        @keyframes ukr-grow {
          0%   { height: 6px; }
          70%  { height: 60px; }
          100% { height: 60px; }
        }
        .ukr-bill line:nth-of-type(1) {
          transform-box: fill-box;
          animation: ukr-l1 3s ease-in-out infinite;
        }
        .ukr-bill line:nth-of-type(2) {
          transform-box: fill-box;
          animation: ukr-l2 3s ease-in-out infinite;
        }
        .ukr-bill line:nth-of-type(3) {
          transform-box: fill-box;
          animation: ukr-l3 3s ease-in-out infinite;
        }
        @keyframes ukr-l1 { 0%,20% { transform: translateY(94px); opacity: 0; } 45%,100% { transform: translateY(102px); opacity: 1; } }
        @keyframes ukr-l2 { 0%,35% { transform: translateY(94px); opacity: 0; } 60%,100% { transform: translateY(122px); opacity: 1; } }
        @keyframes ukr-l3 { 0%,55% { transform: translateY(94px); opacity: 0; } 80%,100% { transform: translateY(144px); opacity: 1; } }
        .ukr-coins {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ukr-shrink 3s ease-in-out infinite;
        }
        @keyframes ukr-shrink {
          0%   { transform: scale(1); opacity: 1; }
          70%  { transform: scale(0.3); opacity: 0.4; }
          100% { transform: scale(0.3); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ukr-bill rect { animation: none; height: 60px; }
          .ukr-bill line:nth-of-type(1) { animation: none; transform: translateY(102px); opacity: 1; }
          .ukr-bill line:nth-of-type(2) { animation: none; transform: translateY(122px); opacity: 1; }
          .ukr-bill line:nth-of-type(3) { animation: none; transform: translateY(144px); opacity: 1; }
          .ukr-coins { animation: none; transform: scale(0.3); opacity: 0.4; }
        }
      `}</style>
    </svg>
  );
}
