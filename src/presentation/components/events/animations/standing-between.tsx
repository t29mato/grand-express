/**
 * 病院の窓口で、双方の言葉を訳して三十分立っている(増)。
 *
 *   - 左の家族と、窓口の向こうの係員のあいだに立つ
 *   - 吹き出しが左右から交互に出て、真ん中の人を通っていく
 *   - 帰りぎわ、家族がどうしても受け取ってくれと札を差し出す
 */
export function StandingBetween() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 待合の壁 */}
      <rect width="400" height="210" fill="#dfe6ea" />
      <rect y="130" width="400" height="80" fill="#c2ccd2" />
      <rect y="126" width="400" height="6" fill="#a8b4bc" />
      <g fill="#eef3f6">
        <rect x="16" y="24" width="60" height="42" rx="4" />
        <rect x="16" y="24" width="60" height="8" rx="4" fill="#5b8fe8" />
      </g>

      {/* 窓口 */}
      <rect x="236" y="30" width="156" height="120" fill="#b0bcc4" />
      <rect x="236" y="30" width="156" height="10" fill="#8f9aa8" />
      <rect x="248" y="52" width="132" height="66" fill="#8fc4e8" />
      <rect x="248" y="118" width="132" height="12" fill="#e0dbcd" />
      <g stroke="#8f9aa8" strokeWidth="4">
        <path d="M292,52 L292,118 M336,52 L336,118" />
      </g>

      {/* 窓口の係員 */}
      <g transform="translate(348,118)">
        <rect x="-18" y="-34" width="36" height="34" rx="10" fill="#5b8fe8" />
        <circle cx="0" cy="-44" r="12" fill="#f6efe2" />
        <path d="M-12,-48 a12,12 0 0 1 24,0z" fill="#3b2f2a" />
      </g>

      {/* 家族(左) */}
      <g transform="translate(56,196)">
        <rect x="-18" y="-44" width="36" height="44" rx="11" fill="#e8443f" />
        <circle cx="0" cy="-54" r="13" fill="#f6efe2" />
        <path d="M-13,-58 a13,13 0 0 1 26,0z" fill="#4a3a2a" />
        <rect x="16" y="-40" width="26" height="34" rx="9" fill="#c93a3a" />
        <circle cx="29" cy="-48" r="10" fill="#f6efe2" />
      </g>

      {/* あいだに立つ通訳 */}
      <g transform="translate(176,198)">
        <rect x="-19" y="-48" width="38" height="48" rx="12" fill="#f5b31c" />
        <circle cx="0" cy="-59" r="13" fill="#f6efe2" />
        <path d="M-13,-63 a13,13 0 0 1 26,0z" fill="#3b2f2a" />
        {/* 窓口のほうへ差し出す腕 */}
        <g className="stb-gesture">
          <rect x="16" y="-46" width="9" height="30" rx="4.5" fill="#f5b31c" />
          <circle cx="20" cy="-48" r="5.5" fill="#f6efe2" />
        </g>
      </g>

      {/* 左から来る言葉 */}
      <g className="stb-bubble-l">
        <path d="M76,74 h58 a8,8 0 0 1 8,8 v22 a8,8 0 0 1 -8,8 h-38 l-12,10 v-10 h-8 a8,8 0 0 1 -8,-8 v-22 a8,8 0 0 1 8,-8z" fill="#f6efe2" />
        <g fill="#c93a3a">
          <rect x="80" y="84" width="42" height="5" rx="2.5" />
          <rect x="80" y="95" width="28" height="5" rx="2.5" />
        </g>
      </g>

      {/* 右から来る言葉 */}
      <g className="stb-bubble-r">
        <path d="M292,66 h-58 a8,8 0 0 0 -8,8 v22 a8,8 0 0 0 8,8 h38 l12,10 v-10 h8 a8,8 0 0 0 8,-8 v-22 a8,8 0 0 0 -8,-8z" fill="#f6efe2" />
        <g fill="#3d6fc4">
          <rect x="246" y="76" width="42" height="5" rx="2.5" />
          <rect x="264" y="87" width="24" height="5" rx="2.5" />
        </g>
      </g>

      {/* 差し出される札 */}
      <g className="stb-note">
        <rect x="106" y="150" width="40" height="22" rx="3" fill="#8fc46a" />
        <rect x="106" y="150" width="40" height="6" rx="3" fill="#6faa4a" />
        <circle cx="126" cy="163" r="5" fill="#6faa4a" />
      </g>

      {/* 受け取った分 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="stb-coin-a" cx="196" cy="112" r="8" />
        <circle className="stb-coin-b" cx="214" cy="96" r="7" />
      </g>

      <style>{`
        .stb-bubble-l {
          transform-box: fill-box; transform-origin: 0 100%;
          animation: stb-say 5s ease-in-out infinite;
        }
        .stb-bubble-r {
          transform-box: fill-box; transform-origin: 100% 100%;
          animation: stb-say 5s ease-in-out infinite;
          animation-delay: -2.5s;
        }
        .stb-note {
          transform-box: fill-box; transform-origin: 0 50%;
          animation: stb-offer 5s ease-in-out infinite;
        }
        .stb-gesture {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: stb-point 5s ease-in-out infinite;
        }
        .stb-coin-a { animation: stb-pop 2.6s ease-out infinite; animation-delay: -0.4s; }
        .stb-coin-b { animation: stb-pop 2.6s ease-out infinite; animation-delay: -1.6s; }
        @keyframes stb-say {
          0%, 4% { transform: scale(0.5); opacity: 0; }
          12% { transform: scale(1.06); opacity: 1; }
          18%, 40% { transform: scale(1); opacity: 1; }
          48%, 100% { transform: scale(0.9); opacity: 0; }
        }
        @keyframes stb-offer {
          0%, 46% { transform: translateX(-26px); opacity: 0; }
          58% { transform: translateX(0); opacity: 1; }
          84% { transform: translateX(10px); opacity: 1; }
          94%, 100% { transform: translateX(16px); opacity: 0; }
        }
        @keyframes stb-point {
          0%, 100% { transform: rotate(-8deg); }
          46% { transform: rotate(22deg); }
        }
        @keyframes stb-pop {
          0%, 34% { transform: translate(0, 30px); opacity: 0; }
          56% { transform: translate(0, 0); opacity: 1; }
          84% { transform: translate(0, -8px); opacity: 1; }
          100% { transform: translate(0, -20px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .stb-bubble-l, .stb-bubble-r, .stb-note, .stb-gesture,
          .stb-coin-a, .stb-coin-b { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </svg>
  );
}
