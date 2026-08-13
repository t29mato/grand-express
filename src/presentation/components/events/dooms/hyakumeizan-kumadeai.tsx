/**
 * クマと鉢合わせして退却する。30メートルほど先の茂みをのっそり歩く
 * 黒い影を見た瞬間、その日の計画はそこで終わる。
 *
 * クマを襲う姿にも、噛みつく姿にも描かない。**ゆっくり後ずさりし、
 * 両手を上げて大声で知らせる登山者**と、**茂みの奥の影**だけで示す
 * (`04-doom-animation-guide.md` の方針どおり。暴力にはしない)。
 * 動くのは、後ずさる登山者と、かすかに揺れる影だけ。
 */
export function HyakumeizanKumadeai() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの森。 */}
      <rect width="400" height="210" fill="#26301f" />
      <rect y="0" width="400" height="90" fill="#37452a" />
      <circle cx="330" cy="40" r="20" fill="#e8b23c" opacity="0.6" />

      {/* 遠景の木立。 */}
      <g fill="#1c2416">
        <rect x="30" y="60" width="10" height="90" />
        <ellipse cx="35" cy="58" rx="26" ry="34" />
        <rect x="350" y="50" width="10" height="100" />
        <ellipse cx="355" cy="48" rx="28" ry="36" />
      </g>

      {/* 手前の地面。 */}
      <rect y="150" width="400" height="60" fill="#2f3a22" />

      {/* 茂み。 */}
      <g fill="#243018">
        <ellipse cx="270" cy="168" rx="70" ry="26" />
        <ellipse cx="330" cy="176" rx="50" ry="20" />
      </g>

      {/* 茂みの奥のクマの影。 */}
      <g className="hkk-bear" fill="#151a10" opacity="0.9">
        <ellipse cx="290" cy="158" rx="30" ry="16" />
        <circle cx="316" cy="148" r="11" />
        <circle cx="308" cy="140" r="3.4" />
        <circle cx="322" cy="140" r="3.4" />
      </g>

      {/* 後ずさりながら両手を上げる登山者。 */}
      <g className="hkk-hiker" strokeLinecap="round" strokeLinejoin="round">
        <path d="M148,168 L140,198" stroke="#2f3a42" strokeWidth="9" fill="none" />
        <path d="M158,168 L166,198" stroke="#3a4650" strokeWidth="9" fill="none" />
        <path d="M152,140 L152,170" stroke="#4a5568" strokeWidth="20" fill="none" />
        <rect x="140" y="138" width="14" height="22" rx="3" fill="#8b6a44" />
        <circle cx="152" cy="126" r="11" fill="#d9a273" stroke="#151a10" strokeWidth="2" />
        <path d="M144,138 L124,116" stroke="#d9a273" strokeWidth="7" fill="none" />
        <path d="M160,138 L180,116" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      <style>{`
        .hkk-bear {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hkk-sway 2.6s ease-in-out infinite;
        }
        .hkk-hiker {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hkk-back 2.6s ease-in-out infinite;
        }
        @keyframes hkk-sway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        @keyframes hkk-back {
          0% { transform: translateX(0); }
          100% { transform: translateX(-30px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkk-bear { animation: none; }
          .hkk-hiker { animation: none; transform: translateX(-30px); }
        }
      `}</style>
    </svg>
  );
}
