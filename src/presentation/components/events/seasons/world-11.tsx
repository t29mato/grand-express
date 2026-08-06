/**
 * 3月。大移動がまた始まる。
 *
 * 分点なので、画面をちょうど半分に割って左を昼、右を夜にしてある
 * (地球上のどこでも昼と夜の長さが並ぶ日)。その境を鳥の群れが北へ渡り、
 * 冬のあいだ覆いをかけてあった船が海へ戻る。
 */
export function World11() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 左=昼 / 右=夜。ちょうど半分ずつ */}
      <rect width="200" height="210" fill="#8fc4e8" />
      <rect x="200" width="200" height="210" fill="#22304f" />
      <circle cx="52" cy="40" r="20" fill="#f5b31c" />
      <circle cx="348" cy="40" r="17" fill="#e6eef4" />
      <circle cx="341" cy="35" r="15" fill="#22304f" />
      <g fill="#f6efe2" opacity="0.85">
        <circle cx="234" cy="26" r="1.6" />
        <circle cx="268" cy="52" r="1.2" />
        <circle cx="300" cy="20" r="1.4" />
        <circle cx="384" cy="70" r="1.6" />
        <circle cx="252" cy="80" r="1.2" />
        <circle cx="316" cy="92" r="1.4" />
        <circle cx="372" cy="28" r="1.2" />
      </g>

      {/* 海 */}
      <rect y="112" width="200" height="98" fill="#2f7fa8" />
      <rect x="200" y="112" width="200" height="98" fill="#1f4a68" />
      <g strokeWidth="3" strokeLinecap="round" fill="none">
        <path className="w11-wave" d="M22,140 q14,-6 28,0" stroke="#8fd0e8" />
        <path className="w11-wave w11-w2" d="M104,158 q14,-6 28,0" stroke="#8fd0e8" />
        <path className="w11-wave w11-w3" d="M240,148 q14,-6 28,0" stroke="#4f7f9f" />
        <path className="w11-wave w11-w4" d="M330,166 q14,-6 28,0" stroke="#4f7f9f" />
      </g>

      {/* 月の道 */}
      <path d="M336,112 L360,112 L376,210 L316,210z" fill="#e6eef4" opacity="0.12" />

      {/* 岸壁 */}
      <rect y="176" width="400" height="34" fill="#6b6350" />
      <rect x="200" y="176" width="200" height="34" fill="#3f3b30" />
      <rect y="176" width="400" height="6" fill="#7f7660" />
      <rect x="200" y="176" width="200" height="6" fill="#4d4839" />

      {/* 覆いを外した船 */}
      <g className="w11-boat">
        <path d="M30,174 c22,-9 74,-9 96,0 c-14,12 -82,12 -96,0z" fill="#5a3d22" />
        <path d="M36,172 c18,-6 62,-6 80,0 c-11,7 -69,7 -80,0z" fill="#a8813c" />
        <rect x="28" y="170" width="100" height="4" rx="2" fill="#3f2c19" />
        <rect x="74" y="112" width="5" height="60" fill="#5a4630" />
        <path className="w11-sail" d="M79,118 L79,164 L114,164z" fill="#f6efe2" />
        <path d="M79,120 L79,152 L54,152z" fill="#e0dbcd" />
      </g>
      {/* 畳んで置いた冬の覆い */}
      <g>
        <path d="M138,204 L184,198 L190,208 L142,210z" fill="#5b8fe8" />
        <path d="M140,200 L182,194 L186,199 L140,205z" fill="#4a7fd0" />
        <g stroke="#3d6fc4" strokeWidth="1.6" fill="none">
          <path d="M152,196 L154,208 M168,195 L170,207" />
        </g>
      </g>

      {/* 分点の境目 */}
      <rect x="197" width="6" height="210" fill="#f6efe2" opacity="0.28" />
      <path d="M200,0 L200,210" stroke="#f6efe2" strokeWidth="2" strokeDasharray="10 9" opacity="0.6" />

      {/* 北へ渡る群れ。昼側でも夜側でも見えるよう、明るい縁取りを敷いている */}
      <g className="w11-flock">
        <g className="w11-bird">
          <path d="M160,60 q9,-8 18,0 q9,-8 18,0" fill="none" stroke="#f6efe2" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
          <path d="M160,60 q9,-8 18,0 q9,-8 18,0" fill="none" stroke="#2f3a44" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className="w11-bird w11-b2">
          <path d="M126,76 q8,-7 16,0 q8,-7 16,0" fill="none" stroke="#f6efe2" strokeWidth="5.4" strokeLinecap="round" opacity="0.7" />
          <path d="M126,76 q8,-7 16,0 q8,-7 16,0" fill="none" stroke="#2f3a44" strokeWidth="2.6" strokeLinecap="round" />
        </g>
        <g className="w11-bird w11-b3">
          <path d="M198,80 q8,-7 16,0 q8,-7 16,0" fill="none" stroke="#f6efe2" strokeWidth="5.4" strokeLinecap="round" opacity="0.7" />
          <path d="M198,80 q8,-7 16,0 q8,-7 16,0" fill="none" stroke="#2f3a44" strokeWidth="2.6" strokeLinecap="round" />
        </g>
        <g className="w11-bird w11-b4">
          <path d="M164,96 q7,-6 14,0 q7,-6 14,0" fill="none" stroke="#f6efe2" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
          <path d="M164,96 q7,-6 14,0 q7,-6 14,0" fill="none" stroke="#2f3a44" strokeWidth="2.2" strokeLinecap="round" />
        </g>
        <g className="w11-bird w11-b5">
          <path d="M228,64 q7,-6 14,0 q7,-6 14,0" fill="none" stroke="#f6efe2" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
          <path d="M228,64 q7,-6 14,0 q7,-6 14,0" fill="none" stroke="#2f3a44" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </g>

      {/* 灯りのついた船小屋(夜の側) */}
      <g>
        <rect x="288" y="146" width="66" height="30" fill="#4a4030" />
        <path d="M282,146 L360,146 L342,128 L300,128z" fill="#5c5040" />
        <rect className="w11-window" x="304" y="154" width="16" height="14" fill="#f5b31c" />
        <rect x="330" y="154" width="14" height="22" fill="#2f2a20" />
      </g>

      <style>{`
        .w11-wave {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w11-lap 4s ease-in-out infinite;
        }
        .w11-w2 { animation-delay: -1s; }
        .w11-w3 { animation-delay: -2s; }
        .w11-w4 { animation-delay: -3s; }
        .w11-boat {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w11-rock 6s ease-in-out infinite;
        }
        .w11-sail {
          transform-box: fill-box; transform-origin: 0 50%;
          animation: w11-fill 6s ease-in-out infinite;
        }
        .w11-bird {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w11-flap 0.9s ease-in-out infinite;
        }
        .w11-b2 { animation-delay: -0.2s; }
        .w11-b3 { animation-delay: -0.4s; }
        .w11-b4 { animation-delay: -0.6s; }
        .w11-b5 { animation-delay: -0.3s; }
        .w11-flock {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w11-migrate 13s linear infinite;
        }
        .w11-window {
          transform-box: fill-box; transform-origin: center;
          animation: w11-lamp 5s ease-in-out infinite;
        }
        @keyframes w11-lap {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(12px); }
        }
        @keyframes w11-rock {
          0%, 100% { transform: rotate(-1.6deg); }
          50% { transform: rotate(1.6deg); }
        }
        @keyframes w11-fill {
          0%, 100% { transform: scaleX(0.94); }
          50% { transform: scaleX(1.06); }
        }
        @keyframes w11-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }
        @keyframes w11-migrate {
          0% { transform: translate(150px, 34px); }
          100% { transform: translate(-190px, -34px); }
        }
        @keyframes w11-lamp {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          .w11-wave, .w11-boat, .w11-sail, .w11-bird, .w11-flock,
          .w11-window { animation: none; }
        }
      `}</style>
    </svg>
  );
}
