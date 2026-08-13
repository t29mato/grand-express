/**
 * 雹嵐が果樹園をなぎ倒す。空は一時間もしないうちにあざの色に変わり、
 * クルミほどの大きさの雹が一シーズン分のリンゴを枝からもぎ取っていく。
 *
 * **暗い空から降る雹と、実を落とされるリンゴの木**だけで筋を見せる。
 * 動くのは、落ちて弾む雹粒1つだけ。
 */
export function UkraineHrad() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暗い嵐の空。 */}
      <rect width="400" height="210" fill="#3a4552" />
      <g fill="#4a5666">
        <ellipse cx="80" cy="36" rx="90" ry="24" />
        <ellipse cx="260" cy="26" rx="110" ry="28" />
      </g>

      {/* 果樹園の地面。 */}
      <rect y="150" width="400" height="60" fill="#4f7a52" />
      <rect y="150" width="400" height="6" fill="#3a2a1a" opacity="0.4" />

      {/* リンゴの木(左)。 */}
      <path d="M110,150 Q116,110 100,80" stroke="#5a4630" strokeWidth="9" fill="none" strokeLinecap="round" />
      <circle cx="94" cy="70" r="34" fill="#2f6b3a" />
      <g fill="#c8102e">
        <circle cx="78" cy="66" r="5" />
        <circle cx="104" cy="58" r="5" />
        <circle cx="112" cy="80" r="5" />
        <circle cx="82" cy="86" r="5" />
      </g>

      {/* リンゴの木(右)。 */}
      <path d="M320,150 Q312,116 330,90" stroke="#5a4630" strokeWidth="8" fill="none" strokeLinecap="round" />
      <circle cx="332" cy="80" r="30" fill="#3f7a4a" />
      <g fill="#c8102e">
        <circle cx="318" cy="76" r="4.5" />
        <circle cx="342" cy="68" r="4.5" />
        <circle cx="346" cy="88" r="4.5" />
      </g>

      {/* 降りしきる雹(静止した粒)。 */}
      <g fill="#dbe6e0" opacity="0.9">
        <circle cx="150" cy="30" r="4" />
        <circle cx="190" cy="18" r="3.5" />
        <circle cx="230" cy="40" r="4.5" />
        <circle cx="60" cy="20" r="3.5" />
        <circle cx="360" cy="24" r="4" />
        <circle cx="270" cy="16" r="3.5" />
      </g>

      {/* かごに実を集めようとしてしゃがむ人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M206,178 L200,204" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M216,178 L224,204" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M210,150 L210,180" stroke="#0057B7" strokeWidth="20" fill="none" />
        <circle cx="210" cy="138" r="10" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M198,158 L184,168" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>
      <path d="M170,192 a16,8 0 0,1 32,0z" fill="#8a6a3a" stroke="#5a4630" strokeWidth="2" />

      {/* 落ちて弾む雹粒。**ここだけが動く。** */}
      <g className="uhr-stone">
        <circle r="7" fill="#f6efe2" stroke="#c8bfae" strokeWidth="1.5" />
      </g>

      <style>{`
        .uhr-stone {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: uhr-fall 1.6s ease-in infinite;
        }
        @keyframes uhr-fall {
          0%   { transform: translate(140px, 10px) scale(1); opacity: 1; }
          70%  { transform: translate(148px, 150px) scale(1); opacity: 1; }
          78%  { transform: translate(148px, 150px) scale(1.4, 0.6); opacity: 1; }
          100% { transform: translate(160px, 138px) scale(0.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .uhr-stone {
            animation: none;
            transform: translate(148px, 150px) scale(1.2, 0.6);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
