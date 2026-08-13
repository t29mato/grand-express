/**
 * 吹雪で線路が止まる。除雪車が出るより先に、列車のドアより高い吹きだまりが
 * できてしまい、線路が再び通れるようになるまで時刻表は意味を失った。
 *
 * **雪に埋もれた線路と、吹きつける雪**だけで筋を見せる。
 * 動くのは、横殴りに吹きつける雪粒だけ。
 */
export function UkraineZamitil() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 白く沈んだ空。 */}
      <rect width="400" height="210" fill="#8a97a4" />
      <rect y="0" width="400" height="90" fill="#a3b0bc" />

      {/* 遠くの止まった列車。 */}
      <rect x="40" y="70" width="130" height="34" rx="4" fill="#5a4630" />
      <rect x="50" y="76" width="18" height="14" fill="#bfe0f0" opacity="0.7" />
      <rect x="80" y="76" width="18" height="14" fill="#bfe0f0" opacity="0.7" />
      <rect x="110" y="76" width="18" height="14" fill="#bfe0f0" opacity="0.7" />

      {/* 積もった雪原。 */}
      <rect y="120" width="400" height="90" fill="#e2e8ec" />
      <path d="M0,120c50,-14 100,-14 150,0c60,-16 140,-16 250,2v8H0z" fill="#f2f6f8" />

      {/* 線路にかぶさる吹きだまり。 */}
      <path d="M60,150c40,-30 260,-30 300,0v40H60z" fill="#f2f6f8" />
      <g stroke="#8a8478" strokeWidth="4" opacity="0.5">
        <path d="M20,190h360" />
      </g>

      {/* シャベルで雪をかく人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M232,168 L226,196" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M242,168 L250,196" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M236,140 L236,170" stroke="#0057B7" strokeWidth="20" fill="none" />
        <circle cx="236" cy="128" r="10" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M224,148 L204,158" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>
      <path d="M204,158 L188,178" stroke="#6b5330" strokeWidth="4" strokeLinecap="round" />
      <path d="M176,176 L200,178 L192,192z" fill="#8a8478" />

      {/* 静止した雪の粒。 */}
      <g fill="#ffffff" opacity="0.85">
        <circle cx="70" cy="30" r="3" />
        <circle cx="140" cy="16" r="2.6" />
        <circle cx="300" cy="24" r="3" />
        <circle cx="340" cy="44" r="2.4" />
      </g>

      {/* 横殴りに吹きつける雪。**ここだけが動く。** */}
      <g className="uzm-gust" fill="#ffffff">
        <circle cx="0" cy="0" r="3" />
        <circle cx="20" cy="14" r="2.4" />
        <circle cx="-16" cy="24" r="2.6" />
        <circle cx="34" cy="-10" r="2" />
      </g>

      <style>{`
        .uzm-gust {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: uzm-blow 1.4s linear infinite;
        }
        @keyframes uzm-blow {
          0%   { transform: translate(420px, 40px); opacity: 0.9; }
          100% { transform: translate(-40px, 96px); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .uzm-gust {
            animation: none;
            transform: translate(190px, 68px);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
