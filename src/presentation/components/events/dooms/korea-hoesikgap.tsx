/**
 * 会食代を持たされる。上司は今夜はおごりだと言って席を立ったまま、勘定が
 * 来るまで戻らなかった。その場に残った中でいちばん年上であることは、
 * 誰も本当は望まない名誉である。
 *
 * **長い食卓と、伸びてくる伝票**で「払わされる」を示す。
 * 動くのは、テーブルへ伸びてくる伝票1つだけ。
 */
export function KoreaHoesikgap() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の食堂。 */}
      <rect width="400" height="210" fill="#2a2430" />
      <rect y="0" width="400" height="60" fill="#3a3240" />
      {/* 提灯風の灯り。 */}
      <g fill="#f5b31c" opacity="0.9">
        <ellipse cx="70" cy="34" rx="14" ry="18" />
        <ellipse cx="330" cy="30" rx="12" ry="16" />
      </g>
      <g stroke="#3a3240" strokeWidth="2">
        <path d="M70,16 L70,52" />
        <path d="M330,14 L330,46" />
      </g>

      {/* 座敷の床と長い食卓。 */}
      <rect y="150" width="400" height="60" fill="#241f2a" />
      <rect x="20" y="150" width="360" height="20" fill="#5a4030" />
      <rect x="20" y="150" width="360" height="5" fill="#6f4f3a" />

      {/* 食卓に並ぶ皿とソジュ瓶。 */}
      <g>
        <ellipse cx="70" cy="146" rx="16" ry="5" fill="#f6efe2" />
        <ellipse cx="130" cy="146" rx="14" ry="4.5" fill="#c8384f" opacity="0.8" />
        <rect x="180" y="128" width="10" height="20" rx="2" fill="#3f8fc4" />
        <rect x="196" y="128" width="10" height="20" rx="2" fill="#3f8fc4" />
        <ellipse cx="250" cy="146" rx="15" ry="5" fill="#f6efe2" />
        <ellipse cx="310" cy="146" rx="14" ry="4.5" fill="#e8a860" opacity="0.85" />
      </g>

      {/* 席に着いたまま固まる人たち(簡略な頭と肩)。 */}
      <g fill="#d9a273">
        <circle cx="60" cy="118" r="9" />
        <circle cx="150" cy="116" r="9" />
        <circle cx="230" cy="118" r="9" />
      </g>
      <g fill="#3a3240">
        <path d="M50,128 q10,-8 20,0v14h-20z" />
        <path d="M140,126 q10,-8 20,0v14h-20z" />
        <path d="M220,128 q10,-8 20,0v14h-20z" />
      </g>

      {/* 空いた上司の席。椅子だけが引かれたまま。 */}
      <g stroke="#5a4a3a" strokeWidth="3" fill="none">
        <path d="M340,150 L340,130 M340,130 L360,130 M360,130 L360,150" />
      </g>

      {/* 一番年上の人が頭を抱える。 */}
      <g strokeLinecap="round">
        <circle cx="310" cy="118" r="10" fill="#d9a273" />
        <path d="M303,112 a10,7 0 0 1 14,0" fill="none" stroke="#8a8f99" strokeWidth="3" />
        <path d="M300,124 L294,134 M320,124 L326,134" stroke="#d9a273" strokeWidth="6" fill="none" />
      </g>

      {/* テーブルへ伸びてくる伝票。**ここだけが動く。** */}
      <g className="khsg-bill">
        <rect x="-8" y="-16" width="16" height="32" rx="1" fill="#f6efe2" stroke="#3a3240" strokeWidth="1.5" />
        <g stroke="#8a8478" strokeWidth="1">
          <path d="M-5,-9h10M-5,-3h10M-5,3h10M-5,9h10" />
        </g>
      </g>

      <style>{`
        .khsg-bill {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: khsg-slide 2.8s ease-in-out infinite;
        }
        @keyframes khsg-slide {
          0%   { transform: translate(400px, 40px) rotate(-8deg); opacity: 0; }
          30%  { opacity: 1; }
          60%  { transform: translate(220px, 128px) rotate(4deg); opacity: 1; }
          100% { transform: translate(220px, 128px) rotate(4deg); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .khsg-bill {
            animation: none;
            transform: translate(220px, 128px) rotate(4deg);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
