/**
 * ソンダ風がアンデスから吹き下ろす。チリ側で湿気を失った熱く乾いた風が
 * 東斜面を吹き下ろし、1時間で気温を20度も上げる。
 *
 * 人を描かず、**傾いだ木と、吹き流される砂ぼこりの帯**で表す
 * (韓国の黄砂と同じ考え方だが、色を熱風らしい橙にしている)。
 * 動くのは、水平に流れる砂ぼこりの帯1つだけ。
 */
export function SouthamericaZonda() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 熱っぽい橙の空。 */}
      <rect width="400" height="210" fill="#e0a860" />
      <rect y="0" width="400" height="80" fill="#eabc80" />
      <circle cx="80" cy="46" r="24" fill="#f5d090" opacity="0.8" />

      {/* 遠景のアンデスの稜線。 */}
      <path d="M0,90 L90,20 L180,90z" fill="#b3946a" opacity="0.75" />
      <path d="M150,90 L260,10 L360,90z" fill="#a8886a" opacity="0.75" />

      {/* 乾いた地面。 */}
      <rect y="90" width="400" height="120" fill="#c2a06a" />

      {/* 傾いた木々。 */}
      <g strokeLinecap="round">
        <path d="M100,180 Q112,150 140,132" stroke="#6b5330" strokeWidth="6" fill="none" />
        <circle cx="140" cy="130" r="16" fill="#8a9a4a" opacity="0.85" />
        <path d="M260,190 Q276,158 310,138" stroke="#6b5330" strokeWidth="7" fill="none" />
        <circle cx="310" cy="136" r="18" fill="#9aa85c" opacity="0.85" />
      </g>

      {/* 飛ばされる屋根の波トタン。 */}
      <g strokeLinejoin="round" transform="rotate(-18 60 150)">
        <rect x="30" y="146" width="60" height="10" fill="#8b8f98" stroke="#5a5f52" strokeWidth="1.6" />
      </g>

      {/* 手前の乾いた低木。 */}
      <g fill="#8a7a4c" opacity="0.8">
        <circle cx="200" cy="196" r="10" />
        <circle cx="220" cy="200" r="7" />
      </g>

      {/* 水平に流れる砂ぼこりの帯。**ここだけが動く。** */}
      <g className="sa-zonda-dust" fill="#f0d8a0" opacity="0.6">
        <ellipse cx="60" cy="110" rx="70" ry="9" />
        <ellipse cx="220" cy="96" rx="90" ry="11" />
        <ellipse cx="360" cy="118" rx="60" ry="8" />
      </g>

      <style>{`
        .sa-zonda-dust {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: sa-zonda-blow 2.4s linear infinite;
        }
        @keyframes sa-zonda-blow {
          0%   { transform: translateX(-40px); opacity: 0.3; }
          50%  { opacity: 0.65; }
          100% { transform: translateX(40px); opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-zonda-dust { animation: none; }
        }
      `}</style>
    </svg>
  );
}
