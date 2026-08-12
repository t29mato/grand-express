/**
 * 線路に「間違った種類の落ち葉」。すりつぶされた落ち葉の薄い膜がレールを覆い、
 * 車輪が空転して電車が動けなくなる。
 *
 * 電車そのものは壊さず、**空転する車輪の火花と、降り積もる落ち葉**で
 * 「動けずに困っている」ことを示す。動くのは、舞い落ちる葉と車輪の火花。
 */
export function UkLeavesOnLine() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った秋の空。 */}
      <rect width="400" height="210" fill="#9aa0a8" />
      <rect y="0" width="400" height="80" fill="#b0b6ba" />
      <circle cx="330" cy="40" r="20" fill="#c8ccc4" opacity="0.6" />

      {/* プラットホームの屋根と柱。 */}
      <rect y="60" width="400" height="14" fill="#4a4f56" />
      <rect x="40" y="74" width="8" height="60" fill="#4a4f56" />
      <rect x="340" y="74" width="8" height="60" fill="#4a4f56" />

      {/* 発車標。「遅延」を示す赤い表示。 */}
      <rect x="150" y="76" width="80" height="26" rx="2" fill="#2a2a30" />
      <rect x="158" y="84" width="20" height="6" fill="#e05252" />
      <rect x="182" y="84" width="40" height="6" fill="#e05252" />
      <rect x="158" y="94" width="64" height="4" fill="#8a8478" />

      {/* ホームと線路。 */}
      <rect y="134" width="400" height="76" fill="#8a8478" />
      <rect y="134" width="400" height="4" fill="#9a9488" />
      <rect y="188" width="400" height="22" fill="#4a4f56" />
      <rect y="196" width="400" height="4" fill="#2a2a30" />
      <rect y="204" width="400" height="4" fill="#2a2a30" />

      {/* 止まった電車。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="150" width="220" height="42" rx="4" fill="#c8383f" stroke="#2a2a30" strokeWidth="2.5" />
        <rect x="72" y="158" width="30" height="18" rx="2" fill="#dfe8ee" stroke="#2a2a30" strokeWidth="1.6" />
        <rect x="112" y="158" width="30" height="18" rx="2" fill="#dfe8ee" stroke="#2a2a30" strokeWidth="1.6" />
        <rect x="152" y="158" width="30" height="18" rx="2" fill="#dfe8ee" stroke="#2a2a30" strokeWidth="1.6" />
        <rect x="192" y="158" width="30" height="18" rx="2" fill="#dfe8ee" stroke="#2a2a30" strokeWidth="1.6" />
        <circle cx="90" cy="192" r="9" fill="#2a2a30" />
        <circle cx="250" cy="192" r="9" fill="#2a2a30" />
      </g>

      {/* 積もった落ち葉。 */}
      <g fill="#c8843a" opacity="0.85">
        <ellipse cx="120" cy="200" rx="8" ry="3" />
        <ellipse cx="160" cy="203" rx="10" ry="3" />
        <ellipse cx="200" cy="200" rx="9" ry="3" />
        <ellipse cx="230" cy="204" rx="7" ry="2.6" />
      </g>

      {/* 車輪から散る火花。**ここが動く。** */}
      <g className="ukl-spark" fill="#f5b31c">
        <circle cx="90" cy="196" r="2.4" />
        <circle cx="97" cy="200" r="1.8" />
        <circle cx="83" cy="200" r="1.6" />
      </g>

      {/* 舞い落ちる葉。**ここも動く。** */}
      <g className="ukl-leaf1" fill="#e0973a">
        <ellipse cx="0" cy="0" rx="6" ry="4" />
      </g>
      <g className="ukl-leaf2" fill="#c8383f">
        <ellipse cx="0" cy="0" rx="5" ry="3.4" />
      </g>
      <g className="ukl-leaf3" fill="#e0b03a">
        <ellipse cx="0" cy="0" rx="5.5" ry="3.6" />
      </g>

      <style>{`
        .ukl-spark {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ukl-flicker 0.6s steps(2) infinite;
        }
        @keyframes ukl-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .ukl-leaf1, .ukl-leaf2, .ukl-leaf3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .ukl-leaf1 { animation: ukl-fall1 3.4s linear infinite; }
        .ukl-leaf2 { animation: ukl-fall2 4.1s linear infinite 0.8s; }
        .ukl-leaf3 { animation: ukl-fall3 3.7s linear infinite 1.6s; }
        @keyframes ukl-fall1 {
          0%   { transform: translate(60px, 20px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(90px, 190px) rotate(320deg); opacity: 0; }
        }
        @keyframes ukl-fall2 {
          0%   { transform: translate(180px, 10px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(150px, 195px) rotate(-280deg); opacity: 0; }
        }
        @keyframes ukl-fall3 {
          0%   { transform: translate(310px, 15px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(280px, 192px) rotate(300deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ukl-spark { animation: none; opacity: 0.6; }
          .ukl-leaf1 { animation: none; transform: translate(90px, 190px); }
          .ukl-leaf2 { animation: none; transform: translate(150px, 195px); }
          .ukl-leaf3 { animation: none; transform: translate(280px, 192px); }
        }
      `}</style>
    </svg>
  );
}
