/**
 * 短い摘採期の茶園で、目方いくらの日雇いに入る。
 *
 * 畝のあいだに立った摘み手が芯芽と二葉だけを摘み、肩越しに背負い籠へ放る。
 * 右手の吊り秤は摘んだ葉の目方で針が振れ、その分だけ硬貨が跳ね上がる。
 */
export function TeaGardenWork() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 朝もやの丘 */}
      <rect width="400" height="210" fill="#20364a" />
      <rect width="400" height="104" fill="#8fc4e8" />
      <g fill="#e8f2fa" opacity="0.8">
        <ellipse cx="72" cy="30" rx="30" ry="11" />
        <ellipse cx="96" cy="24" rx="20" ry="9" />
        <ellipse cx="300" cy="22" rx="34" ry="12" />
      </g>
      <path
        d="M0,104 Q62,66 132,96 Q202,58 270,92 Q334,64 400,98 L400,124 L0,124z"
        fill="#7f9aa8"
      />

      {/* 茶の畝(奥) */}
      <path
        d="M0,112 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 q14,-14 28,0 L400,112 L400,210 L0,210z"
        fill="#4d8a52"
      />
      {/* 茶の畝(中) */}
      <path
        d="M0,140 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 q14,-18 28,0 L400,140 L400,210 L0,210z"
        fill="#3f7a4a"
      />

      {/* 吊り秤 */}
      <g>
        <rect x="342" y="84" width="9" height="96" fill="#8a6a44" />
        <rect x="292" y="84" width="59" height="8" rx="3" fill="#8a6a44" />
        <path d="M300,92 L300,107" stroke="#5a4028" strokeWidth="2.5" />
        <circle cx="300" cy="118" r="11.5" fill="#e8e2d2" stroke="#5a4028" strokeWidth="2" />
        <g transform="translate(300,118)">
          <rect className="tg-needle" x="-1.3" y="-9.5" width="2.6" height="10.5" rx="1.3" fill="#e8443f" />
        </g>
        <path d="M300,130 L300,139" stroke="#5a4028" strokeWidth="2.5" />
        <g transform="translate(300,139)">
          <g className="tg-load">
            <ellipse cx="0" cy="0" rx="21" ry="8" fill="#4d8a52" />
            <path d="M-22,0 L22,0 L16,32 L-16,32z" fill="#c9a877" />
            <g stroke="#a8834d" strokeWidth="2.5" fill="none">
              <path d="M-20,10 L20,10" />
              <path d="M-18,20 L18,20" />
            </g>
          </g>
        </g>
      </g>

      {/* 摘み手 */}
      <g transform="translate(148,198)">
        <rect x="-10" y="-22" width="9" height="22" fill="#3b2f4a" />
        <rect x="2" y="-22" width="9" height="22" fill="#3b2f4a" />
        {/* 背負い籠 */}
        <g>
          <path d="M-48,-66 L-16,-71 L-22,-22 L-42,-22z" fill="#c9a877" />
          <g stroke="#a8834d" strokeWidth="2.5" fill="none">
            <path d="M-46,-54 L-19,-58" />
            <path d="M-44,-42 L-21,-45" />
            <path d="M-42,-31 L-23,-33" />
          </g>
          <ellipse cx="-32" cy="-69" rx="16" ry="6" fill="#4d8a52" />
          <ellipse cx="-38" cy="-74" rx="6" ry="4" fill="#5faa5a" />
          <ellipse cx="-25" cy="-73" rx="5" ry="3.5" fill="#5faa5a" />
        </g>
        <path d="M-17,-70 Q-6,-84 6,-72" stroke="#8a6a44" strokeWidth="3.5" fill="none" />
        <rect x="-13" y="-54" width="26" height="34" rx="8" fill="#e8443f" />
        <rect className="tg-arm" x="8" y="-52" width="8" height="32" rx="4" fill="#f6efe2" />
        <circle cx="0" cy="-64" r="11" fill="#f6efe2" />
        <path d="M-11,-67 Q0,-81 11,-67z" fill="#f5b31c" />
      </g>

      {/* 摘んだ芯芽と二葉 */}
      <g className="tg-leaf">
        <ellipse cx="-5" cy="1" rx="5.5" ry="2.6" fill="#5faa5a" />
        <ellipse cx="5" cy="1" rx="5.5" ry="2.6" fill="#5faa5a" />
        <ellipse cx="0" cy="-4" rx="2.4" ry="4.8" fill="#8fc46a" />
      </g>

      {/* 茶の畝(手前) */}
      <path
        d="M0,174 q7,-22 14,0 q14,-22 28,0 q14,-22 28,0 q14,-22 28,0 q14,-22 28,0 q14,-22 28,0 q14,-22 28,0 q14,-22 28,0 q14,-22 28,0 q14,-22 28,0 q14,-22 28,0 q14,-22 28,0 q14,-22 28,0 q14,-22 28,0 L400,174 L400,210 L0,210z"
        fill="#2f5f38"
      />

      {/* 目方ぶんの日当 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="tg-coin-a" cx="338" cy="58" r="8" />
        <circle className="tg-coin-b" cx="358" cy="40" r="7" />
        <circle className="tg-coin-c" cx="320" cy="42" r="6" />
      </g>

      <style>{`
        .tg-arm {
          transform: rotate(34deg);
          transform-origin: 12px -50px;
          animation: tg-pluck 2.4s ease-in-out infinite;
        }
        .tg-leaf {
          transform: translate(138px, 124px) rotate(-20deg);
          animation: tg-toss 2.4s ease-in-out infinite;
        }
        .tg-needle { transform-origin: 0px 0px; animation: tg-weigh 2.4s ease-in-out infinite; }
        .tg-load { transform-origin: 0px 0px; animation: tg-sway 2.4s ease-in-out infinite; }
        .tg-coin-a { animation: tg-pop 2.4s ease-out infinite; animation-delay: 1.1s; }
        .tg-coin-b { animation: tg-pop 2.4s ease-out infinite; animation-delay: 1.3s; }
        .tg-coin-c { animation: tg-pop 2.4s ease-out infinite; animation-delay: 1.5s; }
        @keyframes tg-pluck {
          0%, 100% { transform: rotate(34deg); }
          22% { transform: rotate(58deg); }
          46% { transform: rotate(-52deg); }
          66% { transform: rotate(-30deg); }
        }
        @keyframes tg-toss {
          0%, 18% { transform: translate(168px, 152px) rotate(0deg); opacity: 0; }
          26% { transform: translate(166px, 148px) rotate(-10deg); opacity: 1; }
          58% { transform: translate(140px, 118px) rotate(-140deg); opacity: 1; }
          84% { transform: translate(114px, 136px) rotate(-250deg); opacity: 1; }
          92%, 100% { transform: translate(112px, 140px) rotate(-260deg); opacity: 0; }
        }
        @keyframes tg-weigh {
          0%, 100% { transform: rotate(-34deg); }
          50% { transform: rotate(38deg); }
        }
        @keyframes tg-sway {
          0%, 100% { transform: rotate(-2.5deg); }
          50% { transform: rotate(2.5deg); }
        }
        @keyframes tg-pop {
          0%, 40% { transform: translate(0, 30px); opacity: 0; }
          58% { transform: translate(0, -2px); opacity: 1; }
          84% { transform: translate(0, -9px); opacity: 1; }
          100% { transform: translate(0, -18px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tg-arm, .tg-leaf, .tg-needle, .tg-load,
          .tg-coin-a, .tg-coin-b, .tg-coin-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
