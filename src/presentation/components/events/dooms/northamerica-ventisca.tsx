/**
 * 吹雪が峠を埋める。ロータリー除雪車が雪を弧を描いて吹き飛ばし、
 * 峠の雪が肩の高さまで積もっている様子で足止めを伝える。
 * 遭難や事故は描かない。
 *
 * 動くのは、除雪車が吹き飛ばす雪の弧と、横殴りの雪粒だけ。
 */
export function NorthamericaVentisca() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 吹雪の空。 */}
      <rect width="400" height="210" fill="#7f96a8" />
      <rect y="0" width="400" height="86" fill="#9fb2c0" />

      {/* 遠景の山。 */}
      <path d="M0,90 L70,20 L150,90z" fill="#8b98a4" opacity="0.85" />
      <path d="M250,90 L340,10 L400,90z" fill="#7c8a98" opacity="0.85" />

      {/* 峠に積もった雪原。 */}
      <rect y="140" width="400" height="70" fill="#eef4f6" />
      <path d="M0,140 q100,-16 200,0 t200,0 v70 h-400z" fill="#e2ecef" />

      {/* 吹きだまり。 */}
      <g fill="#f4f8f9">
        <ellipse cx="70" cy="150" rx="60" ry="20" />
        <ellipse cx="330" cy="152" rx="55" ry="18" />
      </g>

      {/* ロータリー除雪車(簡略)。 */}
      <g strokeLinejoin="round">
        <rect x="150" y="146" width="80" height="30" rx="4" fill="#e05252" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="196" cy="150" r="14" fill="#8b8f98" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="196" cy="150" r="5" fill="#20364a" />
        <circle cx="168" cy="178" r="8" fill="#20364a" />
        <circle cx="212" cy="178" r="8" fill="#20364a" />
      </g>

      {/* 吹き飛ばされる雪の弧。 */}
      <g className="ven-blow" fill="#f4f8f9" opacity="0.9">
        <ellipse cx="0" cy="0" rx="14" ry="8" />
      </g>

      {/* 横殴りの雪粒。 */}
      <g className="ven-snow" fill="#ffffff" opacity="0.85">
        <circle cx="40" cy="30" r="2.6" />
        <circle cx="120" cy="60" r="2.2" />
        <circle cx="260" cy="20" r="2.6" />
        <circle cx="340" cy="50" r="2.2" />
        <circle cx="370" cy="90" r="2.4" />
      </g>

      <style>{`
        .ven-blow {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: ven-arc 0.9s ease-out infinite;
        }
        @keyframes ven-arc {
          0% { transform: translate(210px, 150px) scale(0.4); opacity: 0; }
          25% { opacity: 0.9; }
          100% { transform: translate(270px, 90px) scale(1.6); opacity: 0; }
        }
        .ven-snow {
          animation: ven-gust 1.6s linear infinite;
        }
        @keyframes ven-gust {
          0% { transform: translate(-40px, -14px); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translate(50px, 20px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ven-blow, .ven-snow { animation: none; }
        }
      `}</style>
    </svg>
  );
}
