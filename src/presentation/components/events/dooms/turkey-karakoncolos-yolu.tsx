/**
 * カラコンジョロスに化かされる。同じ景色に見える帰り道を、
 * 夜明けまで堂々巡りする。
 *
 * 妖怪そのものを怖く描くのではなく、**同じ石橋を回り続ける足跡の輪**で
 * 「堂々巡り」を表す。動くのは、輪をたどる旅人1人だけ。
 */
export function TurkeyKarakoncolosYolu() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の夜。 */}
      <rect width="400" height="210" fill="#20264a" />
      <g fill="#f6efe2" opacity="0.9">
        <circle cx="60" cy="34" r="1.6" />
        <circle cx="120" cy="20" r="1.2" />
        <circle cx="300" cy="30" r="1.6" />
        <circle cx="340" cy="50" r="1.2" />
        <circle cx="200" cy="18" r="1.2" />
      </g>
      <circle cx="350" cy="40" r="18" fill="#dbe0ea" opacity="0.9" />

      {/* 雪原。 */}
      <rect y="120" width="400" height="90" fill="#dfe8ee" />
      <path d="M0,118c60,-8 120,4 200,-2c80,-6 140,4 200,-2v6H0z" fill="#f2f6f8" />

      {/* 石橋。 */}
      <g strokeLinejoin="round">
        <path d="M140,150a60,40 0 0 1 120,0" fill="none" stroke="#7a7468" strokeWidth="10" />
        <rect x="132" y="148" width="16" height="10" fill="#7a7468" />
        <rect x="252" y="148" width="16" height="10" fill="#7a7468" />
      </g>

      {/* 小川(橋の下)。 */}
      <path d="M170,158q30,10 60,0" fill="none" stroke="#5a7fa0" strokeWidth="6" opacity="0.8" />

      {/* 木立(雪をかぶって)。 */}
      <g strokeLinecap="round">
        <rect x="40" y="132" width="3" height="18" fill="#3a2e1c" />
        <path d="M41.5,108l-11,26h22z" fill="#1f3a2a" />
        <path d="M31,120a11,4 0 0 0 21,0" fill="#f2f6f8" opacity="0.8" />
        <rect x="360" y="128" width="3" height="20" fill="#3a2e1c" />
        <path d="M361.5,104l-10,26h20z" fill="#1f3a2a" />
      </g>

      {/* カラコンジョロスの影(遠く、脅かさない程度に)。 */}
      <path d="M20,150q10,-24 22,-24t22,24z" fill="#141a34" opacity="0.7" />
      <circle cx="34" cy="132" r="2" fill="#f5b31c" opacity="0.8" />
      <circle cx="42" cy="132" r="2" fill="#f5b31c" opacity="0.8" />

      {/* 堂々巡りの足跡の輪。 */}
      <ellipse cx="200" cy="185" rx="60" ry="14" fill="none" stroke="#b8c4cc" strokeWidth="2" strokeDasharray="4 6" opacity="0.8" />

      {/* 輪をたどる旅人。**ここだけが動く。** */}
      <g className="kky-walker">
        <rect x="-4" y="-4" width="8" height="11" rx="2" fill="#5b8fe8" stroke="#141a34" strokeWidth="1.6" />
        <circle cx="0" cy="-9" r="4" fill="#d9a273" stroke="#141a34" strokeWidth="1.4" />
      </g>

      <style>{`
        .kky-walker {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: kky-loop 5s linear infinite;
        }
        @keyframes kky-loop {
          0%    { transform: translate(260px, 185px); }
          12.5% { transform: translate(242px, 195px); }
          25%   { transform: translate(200px, 199px); }
          37.5% { transform: translate(158px, 195px); }
          50%   { transform: translate(140px, 185px); }
          62.5% { transform: translate(158px, 175px); }
          75%   { transform: translate(200px, 171px); }
          87.5% { transform: translate(242px, 175px); }
          100%  { transform: translate(260px, 185px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kky-walker {
            animation: none;
            transform: translate(200px, 199px);
          }
        }
      `}</style>
    </svg>
  );
}
