/**
 * 山火事が尾根を焼く。山から乾いた風が一週間吹き続け、火の粉を尾根一本を
 * 走り抜ける炎の壁に変えた。四十年かけて育った斜面が午後ひとつではげ山になる。
 *
 * 燃え崩れる建物ではなく、**煙を上げて逃げる人**で被害を示す
 * (`docs/50-authoring/04-doom-animation-guide.md` の方針どおり、破壊そのものは描かない)。
 * 動くのは、尾根を這い上る炎1つだけ。
 */
export function KoreaSanbul() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 煙でくすんだ夕方の空。 */}
      <rect width="400" height="210" fill="#3a2e2a" />
      <rect y="0" width="400" height="80" fill="#5a423a" />
      <circle cx="100" cy="50" r="24" fill="#e8443f" opacity="0.5" />

      {/* 煙の帯。 */}
      <g fill="#6b5a52" opacity="0.8">
        <ellipse cx="160" cy="60" rx="90" ry="24" />
        <ellipse cx="300" cy="46" rx="70" ry="20" />
      </g>

      {/* 尾根のシルエット。 */}
      <path d="M0,140 L70,86 L140,120 L210,60 L280,110 L340,80 L400,110 L400,210 L0,210z" fill="#241a14" />

      {/* まだ燃えていない松林(手前・右)。対比として。 */}
      <g>
        <rect x="4" y="176" width="3" height="16" fill="#3a2a1c" />
        <path d="M5.5,150 l-9,26h18z" fill="#1f4a30" />
        <rect x="360" y="180" width="3" height="14" fill="#3a2a1c" />
        <path d="M361.5,158 l-8,22h16z" fill="#1f4a30" />
      </g>

      {/* 焼け跡の地面。 */}
      <rect y="176" width="400" height="34" fill="#2a201c" />

      {/* 荷物を抱えて駆け出す人。振り返らずに走る前傾姿勢。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M220,188 L206,206" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M230,188 L246,204" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M214,160 Q224,172 226,186" stroke="#8a5a3a" strokeWidth="20" fill="none" />
        <circle cx="210" cy="150" r="10" fill="#d9a273" stroke="#1c140f" strokeWidth="2" />
        <path d="M224,164 L246,158 L248,176 L228,178z" fill="#f5b31c" stroke="#1c140f" strokeWidth="2" />
        <path d="M212,166 L196,158" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      {/* 這い上る炎。**ここだけが動く。** */}
      <g className="ksb-flame">
        <path
          d="M60,140 q-10,-14 0,-26 q4,10 8,4 q-2,16 8,20 q6,-8 2,-16 q10,10 4,24 q-10,4 -22,-6z"
          fill="#f5b31c"
        />
        <path
          d="M62,138 q-6,-9 0,-17 q3,7 5,3 q-1,10 5,13 q4,-5 1,-10 q6,6 2,15 q-6,3 -13,-4z"
          fill="#e8443f"
        />
      </g>
      <g className="ksb-flame2" opacity="0.9">
        <path
          d="M300,150 q-8,-11 0,-21 q3,8 6,3 q-1,13 6,16 q5,-6 1,-13 q8,8 3,19 q-8,3 -16,-4z"
          fill="#f5b31c"
        />
      </g>

      <style>{`
        .ksb-flame, .ksb-flame2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ksb-flicker 1.1s ease-in-out infinite;
        }
        .ksb-flame2 { animation-delay: 0.4s; }
        @keyframes ksb-flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(1.15) scaleX(0.94) translateY(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ksb-flame, .ksb-flame2 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
