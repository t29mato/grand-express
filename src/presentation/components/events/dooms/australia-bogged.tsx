/**
 * 黒土の道でぬかるみにはまる。人が困っている様子はコミカルに留める。
 *
 * 動くのは空転する後輪と、跳ねる泥はねだけ。車体は静止させ、
 * 「動かない」こと自体を絵で示す。
 */
export function AustraliaBogged() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 乾いた空。 */}
      <rect width="400" height="210" fill="#c9a877" />
      <rect y="0" width="400" height="90" fill="#e8dcc0" />
      <g fill="#f6efe2" opacity="0.9">
        <ellipse cx="70" cy="34" rx="26" ry="10" />
        <ellipse cx="320" cy="26" rx="30" ry="11" />
      </g>

      {/* 平らな低木地。 */}
      <rect y="90" width="400" height="30" fill="#a8874a" />
      <g fill="#7a9a5e">
        <ellipse cx="40" cy="112" rx="16" ry="8" />
        <ellipse cx="360" cy="108" rx="18" ry="9" />
      </g>

      {/* 黒土の泥道。 */}
      <rect y="118" width="400" height="92" fill="#3a2f22" />
      <ellipse cx="200" cy="180" rx="150" ry="26" fill="#241c14" />

      {/* 泥にはまったユート(ピックアップトラック)。車体は動かさない。 */}
      <g>
        <path d="M110,168 L120,140 L170,140 L190,150 L280,150 L290,168 Z" fill="#5b8fe8" stroke="#2f3b4f" strokeWidth="2" />
        <rect x="150" y="126" width="60" height="20" fill="#8fc4e8" stroke="#2f3b4f" strokeWidth="2" />
        {/* 前輪。泥に沈んで静止。 */}
        <ellipse cx="140" cy="178" rx="20" ry="10" fill="#20242a" />
        {/* 後輪。空転させる。半分泥に沈んだ位置を軸に回す。 */}
        <g className="abg-wheel" style={{ transformOrigin: "255px 172px" }}>
          <circle cx="255" cy="172" r="18" fill="#20242a" />
          <circle cx="255" cy="172" r="18" fill="none" stroke="#4a4a52" strokeWidth="2" strokeDasharray="6 6" />
        </g>
      </g>

      {/* 空転で跳ねる泥はね。後輪の脇から繰り返し飛び出す。 */}
      <g className="abg-splat">
        <circle cx="255" cy="172" r="3" fill="#241c14" />
      </g>
      <g className="abg-splat2">
        <circle cx="255" cy="172" r="2.4" fill="#3a2f22" />
      </g>

      <style>{`
        .abg-wheel {
          transform-box: fill-box;
          animation: abg-spin 0.4s linear infinite;
        }
        @keyframes abg-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .abg-splat, .abg-splat2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: abg-fling 0.9s ease-out infinite;
        }
        .abg-splat2 {
          animation-delay: 0.35s;
        }
        @keyframes abg-fling {
          0%   { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-34px, -26px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .abg-wheel, .abg-splat, .abg-splat2 {
            animation: none;
          }
          .abg-splat, .abg-splat2 { opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
