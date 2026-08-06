/**
 * ダウ船に、渡した板の上を人の手で積み込む(増)。
 *
 *   - 三角帆の木造船が舷を寄せ、岸から一枚板が渡してある
 *   - 麻袋を担いだ人が板を上がっていく。脇にはオートバイと積み荷
 *   - 日暮れに、札束から抜いた紙幣ぶんの硬貨が跳ねる
 */
export function DhowCargo() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の空と入り江 */}
      <rect width="400" height="210" fill="#f0c48a" />
      <rect width="400" height="72" fill="#e8b36a" />
      <circle cx="330" cy="42" r="24" fill="#f0a83c" />
      <rect y="96" width="400" height="46" fill="#3f7f9f" />
      <g stroke="#8fc4e8" strokeWidth="3" strokeLinecap="round" fill="none">
        <path className="dhw-ripple" d="M22,116 q13,-5 26,0" />
        <path className="dhw-ripple dhw-r2" d="M300,128 q13,-5 26,0" />
        <path className="dhw-ripple dhw-r3" d="M212,110 q13,-5 26,0" />
      </g>

      {/* 岸 */}
      <rect y="140" width="400" height="70" fill="#c9a877" />
      <rect y="140" width="400" height="6" fill="#a8813c" />

      {/* ダウ船 */}
      <g transform="translate(266,144)">
        <path d="M-96,0 q10,-22 46,-26 L92,-30 q6,16 -14,30z" fill="#8a5a2c" />
        <path d="M-84,-8 q10,-12 38,-14 L84,-24 q4,10 -10,16z" fill="#a8813c" />
        <rect x="-30" y="-118" width="6" height="90" fill="#5a3d22" />
        <path className="dhw-sail" d="M-24,-116 L-24,-32 L64,-38z" fill="#f2ede0" />
        <path d="M-24,-116 L64,-38" stroke="#c9a877" strokeWidth="3" fill="none" />
      </g>

      {/* 渡し板 */}
      <path d="M96,178 L214,132 L224,142 L106,188z" fill="#9a7444" />
      <path d="M100,180 L216,135" stroke="#7a5a34" strokeWidth="2" fill="none" />

      {/* 板を上がる人 */}
      <g className="dhw-porter">
        <g transform="translate(140,168)">
          <rect x="-12" y="-20" width="9" height="20" fill="#3b2f4a" />
          <rect x="2" y="-20" width="9" height="20" fill="#3b2f4a" />
          <rect x="-15" y="-54" width="30" height="36" rx="9" fill="#3f8f7a" />
          <circle cx="0" cy="-64" r="12" fill="#f6efe2" />
          <path d="M-12,-68 a12,12 0 0 1 24,0z" fill="#3b2f2a" />
          {/* 右肩に担いだ麻袋 */}
          <g transform="rotate(-14 20 -58)">
            <path d="M2,-72 q22,-9 42,0 q5,18 -21,20 q-26,-2 -21,-20z" fill="#c9a877" />
            <path d="M2,-72 q22,-9 42,0" fill="none" stroke="#8a6a3c" strokeWidth="3" />
            <path d="M16,-76 q7,-5 14,0 q-7,3 -14,0z" fill="#8a6a3c" />
          </g>
          <rect x="8" y="-66" width="9" height="20" rx="4.5" fill="#f6efe2" />
        </g>
      </g>

      {/* 岸に積まれた荷 */}
      <g transform="translate(56,196)">
        <path d="M-34,0 q34,-16 68,0z" fill="#a8813c" />
        <path d="M-28,-14 q28,-14 56,0z" fill="#c9a877" />
        <path d="M-22,-26 q22,-12 44,0z" fill="#a8813c" />
        <g fill="none" stroke="#8a6a3c" strokeWidth="2">
          <path d="M-30,-4 q30,-13 60,0M-25,-18 q25,-11 50,0" />
        </g>
      </g>
      {/* オートバイ */}
      <g transform="translate(196,198)">
        <circle cx="-22" cy="-8" r="10" fill="#3a3f48" />
        <circle cx="22" cy="-8" r="10" fill="#3a3f48" />
        <circle cx="-22" cy="-8" r="4" fill="#8f9aa8" />
        <circle cx="22" cy="-8" r="4" fill="#8f9aa8" />
        <path d="M-22,-8 L-4,-22 L14,-22 L22,-8" fill="none" stroke="#c93a3a" strokeWidth="5" />
        <rect x="-10" y="-30" width="22" height="9" rx="3" fill="#3a3f48" />
        <path d="M12,-24 L24,-32" stroke="#8f9aa8" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* 抜き取られる紙幣と、日当 */}
      <g className="dhw-note">
        <rect x="286" y="122" width="42" height="24" rx="3" fill="#8fc46a" />
        <rect x="286" y="122" width="42" height="6" rx="3" fill="#6faa4a" />
        <circle cx="307" cy="136" r="5" fill="#6faa4a" />
      </g>
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="dhw-coin-a" cx="252" cy="84" r="8" />
        <circle className="dhw-coin-b" cx="278" cy="70" r="7" />
        <circle className="dhw-coin-c" cx="228" cy="70" r="6" />
      </g>

      <style>{`
        .dhw-ripple {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: dhw-lap 3.8s ease-in-out infinite;
        }
        .dhw-r2 { animation-delay: -1.3s; }
        .dhw-r3 { animation-delay: -2.6s; }
        .dhw-sail {
          transform-box: fill-box; transform-origin: 0 0;
          animation: dhw-fill 5.4s ease-in-out infinite;
        }
        .dhw-porter {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: dhw-climb 4.6s ease-in-out infinite;
        }
        .dhw-note {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: dhw-peel 4.6s ease-in-out infinite;
        }
        .dhw-coin-a { animation: dhw-pop 2.8s ease-out infinite; }
        .dhw-coin-b { animation: dhw-pop 2.8s ease-out infinite; animation-delay: -0.9s; }
        .dhw-coin-c { animation: dhw-pop 2.8s ease-out infinite; animation-delay: -1.9s; }
        @keyframes dhw-lap {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(11px); }
        }
        @keyframes dhw-fill {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(-3deg); }
        }
        @keyframes dhw-climb {
          0% { transform: translate(-34px, 14px); opacity: 0; }
          12% { opacity: 1; }
          80% { transform: translate(58px, -22px); opacity: 1; }
          92%, 100% { transform: translate(70px, -26px); opacity: 0; }
        }
        @keyframes dhw-peel {
          0%, 40% { transform: translate(0, 8px); opacity: 0; }
          54% { transform: translate(0, 0); opacity: 1; }
          84% { transform: translate(0, -6px); opacity: 1; }
          96%, 100% { transform: translate(0, -12px); opacity: 0; }
        }
        @keyframes dhw-pop {
          0%, 32% { transform: translate(0, 30px); opacity: 0; }
          54% { transform: translate(0, 0); opacity: 1; }
          84% { transform: translate(0, -8px); opacity: 1; }
          100% { transform: translate(0, -20px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dhw-ripple, .dhw-sail, .dhw-porter, .dhw-note,
          .dhw-coin-a, .dhw-coin-b, .dhw-coin-c { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
