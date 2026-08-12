/**
 * 猿がゆるんだ物をさらう。石段に座る人からサングラスをかすめ取り、
 * 手の届かない枝まで駆け上がる。動くのは猿の跳躍と、サングラスの動きだけ。
 */
export function BaliMonyetMencuri() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="90" fill="#cfe4f0" />

      {/* 石段の遺構(左手前)と地面。 */}
      <rect y="150" width="400" height="60" fill="#8fae63" />
      <g fill="#a8926c">
        <rect x="20" y="150" width="90" height="14" />
        <rect x="30" y="136" width="70" height="14" />
        <rect x="40" y="122" width="50" height="14" />
      </g>

      {/* 木(右、猿が逃げ込む枝)。 */}
      <rect x="330" y="80" width="10" height="90" fill="#6b5330" />
      <path d="M335,90c-30,-6 -50,10 -60,28c30,-4 50,-2 60,-10c26,10 46,4 56,-8c-24,-14 -40,-16 -56,-10z" fill="#3f8f4a" />

      {/* 石段に座る人。 */}
      <g strokeLinejoin="round">
        <ellipse cx="60" cy="132" rx="12" ry="3" fill="#000" opacity="0.14" />
        <path d="M52,130q8,4 16,0l-2,-16q-6,-3 -12,0z" fill="#e8443f" />
        <circle cx="60" cy="106" r="6" fill="#a8763a" />
      </g>

      {/* サングラス(猿が奪う対象)。 */}
      <g className="bmm-glasses">
        <rect x="-9" y="-2" width="7" height="5" rx="1.6" fill="#20364a" />
        <rect x="2" y="-2" width="7" height="5" rx="1.6" fill="#20364a" />
        <path d="M-2,0h4" stroke="#20364a" strokeWidth="1.2" />
      </g>

      {/* 猿(石段から木へ跳ぶ)。 */}
      <g className="bmm-monkey">
        <ellipse cx="0" cy="0" rx="10" ry="8" fill="#8a6a3c" />
        <circle cx="8" cy="-6" r="6" fill="#c9a877" />
        <circle cx="6" cy="-8" r="1.2" fill="#20364a" />
        <path d="M-8,4q-8,10 -2,20" stroke="#8a6a3c" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M6,4l10,10" stroke="#8a6a3c" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      <style>{`
        .bmm-monkey {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bmm-leap 3s ease-in-out infinite;
        }
        @keyframes bmm-leap {
          0% { transform: translate(60px,118px); }
          15% { transform: translate(60px,118px); }
          50% { transform: translate(200px,60px); }
          85% { transform: translate(340px,100px); }
          100% { transform: translate(340px,100px); }
        }
        .bmm-glasses {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bmm-snatch 3s ease-in-out infinite;
        }
        @keyframes bmm-snatch {
          0% { transform: translate(60px,120px); }
          15% { transform: translate(60px,120px); }
          50% { transform: translate(200px,62px); }
          85% { transform: translate(340px,102px); }
          100% { transform: translate(340px,102px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bmm-monkey { animation: none; transform: translate(340px,100px); }
          .bmm-glasses { animation: none; transform: translate(340px,102px); }
        }
      `}</style>
    </svg>
  );
}
