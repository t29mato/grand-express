/**
 * よその結婚式でタマダに任命される。付き添い役の声が十五回目あたりの
 * 乾杯でかすれ、テーブル中の視線がいちばん素面に見える者へ向いた。
 *
 * **長い宴会の食卓と、掲げられ続けるグラス**だけで筋を見せる。
 * 動くのは、掲げて鳴らされるグラス1つだけ。
 */
export function UkraineTamadaObovYazok() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の宴の間。 */}
      <rect width="400" height="210" fill="#3a2a2f" />
      <rect y="0" width="400" height="80" fill="#4a343a" />
      <g fill="#f5b31c" opacity="0.8">
        <circle cx="60" cy="30" r="3" />
        <circle cx="150" cy="20" r="3" />
        <circle cx="260" cy="26" r="3" />
        <circle cx="350" cy="18" r="3" />
      </g>

      {/* 長いテーブル。 */}
      <rect y="140" width="400" height="16" fill="#6b4630" />
      <rect y="156" width="400" height="54" fill="#4a3020" />

      {/* 皿とごちそう。 */}
      <g fill="#f6efe2">
        <ellipse cx="60" cy="146" rx="18" ry="6" />
        <ellipse cx="140" cy="146" rx="18" ry="6" />
        <ellipse cx="300" cy="146" rx="18" ry="6" />
        <ellipse cx="360" cy="146" rx="18" ry="6" />
      </g>
      <g fill="#c8102e">
        <circle cx="54" cy="144" r="4" /><circle cx="66" cy="144" r="4" />
        <circle cx="294" cy="144" r="4" /><circle cx="306" cy="144" r="4" />
      </g>

      {/* 座る客たち(シルエット)。 */}
      <g fill="#2a1e22">
        <ellipse cx="90" cy="132" rx="12" ry="20" />
        <ellipse cx="330" cy="132" rx="12" ry="20" />
        <ellipse cx="60" cy="130" rx="10" ry="18" />
        <ellipse cx="360" cy="130" rx="10" ry="18" />
      </g>

      {/* 立ち上がって乾杯するタマダ。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M198,150 L192,206" stroke="#2f2c34" strokeWidth="10" fill="none" />
        <path d="M212,150 L220,206" stroke="#3d3a42" strokeWidth="10" fill="none" />
        <path d="M204,98 L204,152" stroke="#0057B7" strokeWidth="24" fill="none" />
        <circle cx="204" cy="84" r="12" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M214,110 L232,90" stroke="#d9a273" strokeWidth="8" fill="none" />
      </g>

      {/* 掲げて鳴らされるグラス。**ここだけが動く。** */}
      <g className="utm-glass">
        <path d="M-6,10 L-4,-6 L4,-6 L6,10 L-6,10z" fill="#f6efe2" opacity="0.35" stroke="#dbe6e0" strokeWidth="1.5" />
        <rect x="-1.4" y="10" width="2.8" height="6" fill="#c9a877" />
        <ellipse cx="0" cy="-4" rx="4" ry="2.2" fill="#f5b31c" opacity="0.8" />
      </g>

      <style>{`
        .utm-glass {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: utm-toast 1.8s ease-in-out infinite;
        }
        @keyframes utm-toast {
          0%, 100% { transform: translate(234px, 84px) rotate(-6deg); }
          40%      { transform: translate(234px, 66px) rotate(8deg); }
          55%      { transform: translate(234px, 62px) rotate(10deg); }
          70%      { transform: translate(234px, 84px) rotate(-6deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .utm-glass {
            animation: none;
            transform: translate(234px, 66px) rotate(8deg);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
