/**
 * 結婚式の祝儀を包まされる。紅包の額は同じ席の他の客に合わせなければならず、
 * それとなく周りをうかがうと相場がまた上がっているのが分かる。
 *
 * 動くのは、卓を滑っていく紅包1つだけ。
 */
export function ChinaSuifenzi() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 宴会場の壁。 */}
      <rect width="400" height="210" fill="#f2e0c4" />
      <rect y="0" width="400" height="70" fill="#f6ead4" />

      {/* 提灯。 */}
      <g strokeLinejoin="round">
        <ellipse cx="60" cy="36" rx="16" ry="19" fill="#c9302c" stroke="#8a1f1f" strokeWidth="2" />
        <rect x="58" y="14" width="4" height="6" fill="#4a4436" />
        <rect x="58" y="55" width="4" height="8" fill="#d4a017" />
        <ellipse cx="340" cy="34" rx="14" ry="17" fill="#c9302c" stroke="#8a1f1f" strokeWidth="2" />
        <rect x="338" y="13" width="4" height="6" fill="#4a4436" />
      </g>

      {/* 円卓。 */}
      <ellipse cx="200" cy="150" rx="150" ry="34" fill="#8a5a3a" stroke="#5a3a20" strokeWidth="2.5" />
      <ellipse cx="200" cy="146" rx="140" ry="28" fill="#c9a877" />

      {/* 座った客たち(簡略シルエット)。 */}
      <g fill="#4a4a52">
        <circle cx="90" cy="118" r="10" />
        <rect x="80" y="128" width="20" height="30" rx="4" />
        <circle cx="310" cy="118" r="10" />
        <rect x="300" y="128" width="20" height="30" rx="4" />
        <circle cx="200" cy="94" r="9" />
        <rect x="191" y="103" width="18" height="26" rx="4" fill="#c9302c" />
      </g>

      {/* 料理の皿。 */}
      <g fill="#f6efe2" stroke="#c9a877" strokeWidth="1.4">
        <ellipse cx="150" cy="150" rx="20" ry="8" />
        <ellipse cx="250" cy="150" rx="20" ry="8" />
      </g>
      <g fill="#e8443f" opacity="0.8">
        <circle cx="146" cy="148" r="3" />
        <circle cx="154" cy="150" r="3" />
        <circle cx="246" cy="149" r="3" />
      </g>

      {/* 卓を滑っていく紅包。**ここだけが動く。** */}
      <g className="csz-envelope" strokeLinejoin="round">
        <rect x="150" y="128" width="30" height="20" rx="2" fill="#c9302c" stroke="#8a1f1f" strokeWidth="2" />
        <rect x="160" y="128" width="10" height="20" fill="#d4a017" opacity="0.9" />
        <circle cx="165" cy="138" r="3" fill="#f6efe2" />
      </g>

      <style>{`
        .csz-envelope {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: csz-slide 2.4s ease-in-out infinite;
        }
        @keyframes csz-slide {
          0%, 15% { transform: translate(0, 0); }
          50% { transform: translate(70px, 6px); }
          85%, 100% { transform: translate(0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .csz-envelope { animation: none; }
        }
      `}</style>
    </svg>
  );
}
