/**
 * サスクワッチに堂々巡りさせられる。小道の目印はどれも同じに見え、
 * 見えない何かに導かれるまま同じ倒木のまわりを大きく回り続けている。
 *
 * 動くのは森を歩く人影と、その足跡がなぞる円だけ。
 */
export function CanadaLedAstray() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の森。 */}
      <rect width="400" height="210" fill="#1a2a20" />
      <rect y="0" width="400" height="90" fill="#22342a" />
      <circle cx="60" cy="40" r="16" fill="#e8e0c8" opacity="0.7" />
      <rect y="150" width="400" height="60" fill="#141f18" />

      {/* 周りを取り囲む針葉樹。 */}
      <g fill="#0f2418">
        <path d="M40,150l-16,-40l16,10l16,-10z" /><path d="M90,150l-16,-46l16,12l16,-12z" />
        <path d="M310,150l-16,-46l16,12l16,-12z" /><path d="M360,150l-16,-40l16,10l16,-10z" />
      </g>

      {/* 同じ倒木。常に中央にある。 */}
      <rect x="176" y="168" width="48" height="12" rx="4" fill="#3a2a1a" stroke="#0f180f" strokeWidth="2" />

      {/* 歩いてきた円い足跡の道(常に見える)。 */}
      <ellipse cx="200" cy="160" rx="90" ry="30" fill="none" stroke="#3a4a3a" strokeWidth="3" strokeDasharray="6 8" />

      {/* 森の中を歩く人影。ここが円を描いて動く。 */}
      <g className="cla-walker" transform="translate(200,160)">
        <g transform="translate(90,0)">
          <rect x="-5" y="-16" width="10" height="16" rx="3" fill="#5b8fe8" stroke="#0f180f" strokeWidth="2" />
          <circle cx="0" cy="-20" r="5" fill="#d9a273" stroke="#0f180f" strokeWidth="2" />
        </g>
      </g>

      {/* 見えない何か(サスクワッチ)の巨大な足跡だけが、森の端にかすかに残る。 */}
      <ellipse cx="330" cy="130" rx="10" ry="16" fill="#0f180f" opacity="0.4" />

      <style>{`
        .cla-walker {
          transform-box: view-box;
          transform-origin: 200px 160px;
          animation: cla-circle 4s linear infinite;
        }
        @keyframes cla-circle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cla-walker { animation: none; }
        }
      `}</style>
    </svg>
  );
}
