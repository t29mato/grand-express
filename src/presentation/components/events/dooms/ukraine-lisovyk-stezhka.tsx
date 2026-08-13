/**
 * リソヴィクに輪を描いて歩かされる。森を抜ける道はどの角を曲がっても
 * 同じ景色に見え、日が暮れてからようやく同じ倒木を四度もまたいでいたと
 * 気づいた。
 *
 * この盤面の厄災の神は**リソヴィク**。ここでは姿を出さず、
 * **円を描く足あとと、木々のあいだに光る目**だけで「化かされている」ことを
 * 示す。動くのは、梢を移っていく光る目だけ。
 */
export function UkraineLisovykStezhka() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の森。 */}
      <rect width="400" height="210" fill="#1c2a20" />
      <rect y="0" width="400" height="90" fill="#243428" />
      <circle cx="60" cy="36" r="16" fill="#e8e0c8" opacity="0.8" />

      {/* 木立のシルエット(左右)。 */}
      <g fill="#12200f">
        <path d="M20,150 L34,60 L48,150z" />
        <path d="M50,150 L60,80 L70,150z" />
        <path d="M330,150 L344,54 L358,150z" />
        <path d="M358,150 L372,74 L386,150z" />
      </g>

      {/* 地面。 */}
      <rect y="150" width="400" height="60" fill="#243020" />
      <g stroke="#2f4028" strokeWidth="3" fill="none" opacity="0.7">
        <path d="M0,176 L400,168" />
        <path d="M0,196 L400,184" />
      </g>

      {/* 堂々巡りした足あと(輪)。 */}
      <g fill="#12200f" opacity="0.9">
        <ellipse cx="160" cy="168" rx="7" ry="4" />
        <ellipse cx="190" cy="150" rx="7" ry="4" />
        <ellipse cx="220" cy="144" rx="7" ry="4" />
        <ellipse cx="246" cy="158" rx="7" ry="4" />
        <ellipse cx="248" cy="186" rx="7" ry="4" />
        <ellipse cx="222" cy="200" rx="7" ry="4" />
        <ellipse cx="192" cy="200" rx="7" ry="4" />
        <ellipse cx="164" cy="188" rx="7" ry="4" />
      </g>

      {/* 同じ倒木を跨いで途方に暮れる人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M200,158 L196,186" stroke="#2f2c34" strokeWidth="8" fill="none" />
        <path d="M208,158 L214,186" stroke="#3d3a42" strokeWidth="8" fill="none" />
        <path d="M203,134 L203,160" stroke="#4a5a72" strokeWidth="18" fill="none" />
        <circle cx="203" cy="122" r="10" fill="#d9a273" stroke="#12200f" strokeWidth="2" />
        <path d="M212,138 L226,128" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>
      <path d="M150,168 q40,-14 80,0" stroke="#3a2a1a" strokeWidth="9" fill="none" strokeLinecap="round" />

      {/* 木々のあいだに光る目。**ここだけが動く。** */}
      <g className="uls-eyes" fill="#9ff0a0">
        <circle cx="-4" cy="0" r="2.4" />
        <circle cx="4" cy="0" r="2.4" />
      </g>

      <style>{`
        .uls-eyes {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: uls-watch 5s steps(4) infinite;
        }
        @keyframes uls-watch {
          0%   { transform: translate(38px, 96px); opacity: 0.9; }
          25%  { transform: translate(320px, 88px); opacity: 0.9; }
          50%  { transform: translate(360px, 104px); opacity: 0.9; }
          75%  { transform: translate(56px, 108px); opacity: 0.9; }
          100% { transform: translate(38px, 96px); opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .uls-eyes {
            animation: none;
            transform: translate(320px, 88px);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
