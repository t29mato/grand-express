/**
 * モンスーンの雨で鉄砲水が通りを襲う。1階の店先まで水位が上がり、
 * 木の葉やビニール袋が水面を漂う。雨脚は強いが、被害そのもの
 * (店の中身が壊れる様子など)は描かない。水位の上昇と雨、漂う物だけ。
 *
 * 動くのは降る雨、上昇する水位、水面の波紋と漂流物だけ。
 */
export function MalaysiaBanjirKilat() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暗いモンスーンの空。 */}
      <rect width="400" height="210" fill="#5a6270" />
      <rect y="0" width="400" height="70" fill="#6f7888" />

      {/* 雨雲。 */}
      <g fill="#4a5058" opacity="0.9">
        <ellipse cx="100" cy="34" rx="90" ry="24" />
        <ellipse cx="280" cy="30" rx="100" ry="26" />
      </g>

      {/* 店の建物(ショップハウス)。 */}
      <g fill="#c9a877">
        <rect x="40" y="70" width="90" height="120" />
        <rect x="270" y="70" width="90" height="120" />
      </g>
      <g fill="#e8dcc0">
        <rect x="56" y="86" width="24" height="26" />
        <rect x="90" y="86" width="24" height="26" />
        <rect x="286" y="86" width="24" height="26" />
        <rect x="320" y="86" width="24" height="26" />
      </g>
      <rect x="36" y="66" width="98" height="8" fill="#8a3a2a" />
      <rect x="266" y="66" width="98" height="8" fill="#8a3a2a" />

      {/* 街灯。 */}
      <rect x="200" y="90" width="4" height="100" fill="#5a5a5a" />
      <circle cx="202" cy="88" r="6" fill="#f4c430" opacity="0.8" />

      {/* 降り注ぐ雨。 */}
      <g className="my-bk-rain" stroke="#bfe8f4" strokeWidth="2" opacity="0.7">
        <path d="M30,-10 L20,20 M90,-10 L80,20 M150,-10 L140,20 M210,-10 L200,20 M270,-10 L260,20 M330,-10 L320,20 M60,-30 L50,0 M180,-30 L170,0 M300,-30 L290,0" />
      </g>

      {/* 上昇する濁った水位(グループ全体で上下し、中の要素はそれぞれ別に動く)。 */}
      <g className="my-bk-water-group">
        <rect x="0" y="150" width="400" height="60" fill="#5a6a3a" opacity="0.88" />
        <path
          className="my-bk-ripple"
          d="M20,164q15,-6 30,0t30,0t30,0t30,0t30,0t30,0t30,0t30,0t30,0t30,0"
          stroke="#8a9a5c"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        <g className="my-bk-debris">
          <ellipse cx="0" cy="174" rx="8" ry="4" fill="#5f9f4a" />
          <path d="M40,178 q6,-6 12,0 q-6,6 -12,0z" fill="#f6efe2" opacity="0.8" />
          <ellipse cx="90" cy="176" rx="6" ry="3" fill="#3f7a3a" />
        </g>
      </g>

      <style>{`
        .my-bk-rain {
          animation: my-bk-fall 0.9s linear infinite;
        }
        @keyframes my-bk-fall {
          0% { transform: translateY(0); }
          100% { transform: translateY(210px); }
        }
        .my-bk-water-group {
          animation: my-bk-rise 4s ease-in-out infinite;
        }
        @keyframes my-bk-rise {
          0% { transform: translateY(0); }
          50% { transform: translateY(-70px); }
          100% { transform: translateY(0); }
        }
        .my-bk-ripple {
          transform-box: fill-box;
          animation: my-bk-wave 1.6s ease-in-out infinite;
        }
        @keyframes my-bk-wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
        }
        .my-bk-debris {
          animation: my-bk-drift 3s linear infinite;
        }
        @keyframes my-bk-drift {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(340px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .my-bk-rain { animation: none; opacity: 0.3; }
          .my-bk-water-group { animation: none; transform: translateY(-40px); }
          .my-bk-ripple { animation: none; }
          .my-bk-debris { animation: none; transform: translateX(150px); }
        }
      `}</style>
    </svg>
  );
}
