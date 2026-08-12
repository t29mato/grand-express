/**
 * オワレの勝負に負ける。マンゴーの木の下、木彫りの盤に並んだ穴から
 * 種が次々と取られていく。
 *
 * 動くのは、穴から穴へ弧を描いて跳ぶ種1粒だけ。
 */
export function GhanaOwarebet() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 木陰。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="80" width="400" height="40" fill="#cfe4f0" />
      <circle cx="330" cy="40" r="34" fill="#2f6b3a" />
      <rect x="326" y="60" width="8" height="30" fill="#6b5330" />

      {/* 地面。 */}
      <rect y="150" width="400" height="60" fill="#c9a877" />

      {/* オワレの盤(2列8穴)。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="140" width="280" height="46" rx="8" fill="#6b5330" stroke="#4a3620" strokeWidth="2.4" />
        <g fill="#4a3620">
          <circle cx="84" cy="152" r="9" />
          <circle cx="118" cy="152" r="9" />
          <circle cx="152" cy="152" r="9" />
          <circle cx="186" cy="152" r="9" />
          <circle cx="220" cy="152" r="9" />
          <circle cx="254" cy="152" r="9" />
          <circle cx="288" cy="152" r="9" />
          <circle cx="316" cy="152" r="9" />
          <circle cx="84" cy="174" r="9" />
          <circle cx="118" cy="174" r="9" />
          <circle cx="152" cy="174" r="9" />
          <circle cx="186" cy="174" r="9" />
          <circle cx="220" cy="174" r="9" />
          <circle cx="254" cy="174" r="9" />
          <circle cx="288" cy="174" r="9" />
          <circle cx="316" cy="174" r="9" />
        </g>
      </g>

      {/* 残った種(取られ続けて数が減っている片方の列)。 */}
      <g fill="#e8e0cc">
        <circle cx="80" cy="151" r="2.4" />
        <circle cx="88" cy="153" r="2.4" />
        <circle cx="150" cy="151" r="2.4" />
        <circle cx="286" cy="153" r="2.4" />
      </g>

      {/* 見守る老人のシルエット。 */}
      <g fill="#4a4a52">
        <circle cx="30" cy="126" r="8" />
        <rect x="21" y="134" width="18" height="26" rx="4" />
      </g>

      {/* 弧を描いて跳ぶ種。**ここだけが動く。** */}
      <circle className="gow-seed" cx="118" cy="152" r="3" fill="#f5b31c" />

      <style>{`
        .gow-seed {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          animation: gow-hop 1.1s ease-in-out infinite;
        }
        @keyframes gow-hop {
          0% { transform: translate(0, 0); }
          50% { transform: translate(68px, -34px); }
          100% { transform: translate(136px, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gow-seed { animation: none; transform: translate(68px, 0); }
        }
      `}</style>
    </svg>
  );
}
