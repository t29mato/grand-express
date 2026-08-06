/**
 * 8月・台風とお盆。
 *
 * 南から来た渦が空で回り、横なぐりの雨に松がしなる一方で、
 * 川面では送り火の灯籠がゆらゆらと流れていく。
 */
export function Japan04() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空 */}
      <rect width="400" height="210" fill="#2b3d52" />
      <g fill="#3b5069">
        <ellipse className="j04-cloud" cx="60" cy="18" rx="80" ry="26" />
        <ellipse className="j04-cloud j04-cloud2" cx="200" cy="10" rx="94" ry="24" />
        <ellipse className="j04-cloud j04-cloud3" cx="336" cy="20" rx="86" ry="26" />
      </g>

      {/* 台風の渦 */}
      <g transform="translate(306,62)">
        <g className="j04-swirl">
          <g fill="#a8c2d8">
            <path d="M0,-34 A34,34 0 0,1 30,10 L22,4 A22,22 0 0,0 0,-18 Z" />
            <path d="M0,-34 A34,34 0 0,1 30,10 L22,4 A22,22 0 0,0 0,-18 Z" transform="rotate(120)" />
            <path d="M0,-34 A34,34 0 0,1 30,10 L22,4 A22,22 0 0,0 0,-18 Z" transform="rotate(240)" />
          </g>
          <circle cx="0" cy="0" r="8" fill="#2b3d52" />
        </g>
      </g>

      {/* 土手 */}
      <path d="M0,148 Q100,138 200,146 Q300,154 400,142 L400,164 L0,164z" fill="#2a4030" />

      {/* 風にしなる松 */}
      <g transform="translate(70,152)">
        <g className="j04-pine">
          <path d="M-5,0 L-3,-40 Q4,-58 16,-70 L22,-66 Q8,-54 5,-38 L5,0 Z" fill="#4a3524" />
          <g fill="#2c5c3a">
            <ellipse cx="18" cy="-72" rx="30" ry="13" />
            <ellipse cx="34" cy="-84" rx="22" ry="10" />
            <ellipse cx="2" cy="-58" rx="22" ry="9" />
            <ellipse cx="40" cy="-64" rx="18" ry="8" />
          </g>
          <g fill="#3d7a4c">
            <ellipse cx="24" cy="-78" rx="16" ry="6" />
            <ellipse cx="6" cy="-62" rx="12" ry="5" />
          </g>
        </g>
      </g>

      {/* 川 */}
      <rect y="160" width="400" height="50" fill="#1f3346" />
      <g fill="none" stroke="#31506c" strokeWidth="3" strokeLinecap="round">
        <path className="j04-wave" d="M18,172 q12,-5 24,0" />
        <path className="j04-wave j04-w2" d="M112,182 q12,-5 24,0" />
        <path className="j04-wave j04-w3" d="M212,168 q12,-5 24,0" />
        <path className="j04-wave j04-w4" d="M296,192 q12,-5 24,0" />
        <path className="j04-wave j04-w5" d="M356,176 q12,-5 24,0" />
      </g>

      {/* 流れる灯籠 */}
      <g transform="translate(40,178)">
        <g className="j04-toro">
          <ellipse cx="0" cy="12" rx="20" ry="5" fill="#f5b31c" opacity="0.3" />
          <rect x="-14" y="6" width="28" height="6" rx="2" fill="#6b5a3e" />
          <rect x="-11" y="-14" width="22" height="20" fill="#f8f0dc" />
          <rect x="-11" y="-14" width="22" height="20" fill="none" stroke="#8a6b3e" strokeWidth="2" />
          <rect x="-6" y="-9" width="12" height="12" rx="1" fill="#f5b31c" />
          <path d="M-13,-14 L13,-14 L8,-20 L-8,-20z" fill="#8a6b3e" />
        </g>
      </g>
      <g transform="translate(126,190) scale(1.15)">
        <g className="j04-toro j04-toro2">
          <ellipse cx="0" cy="12" rx="20" ry="5" fill="#f5b31c" opacity="0.3" />
          <rect x="-14" y="6" width="28" height="6" rx="2" fill="#6b5a3e" />
          <rect x="-11" y="-14" width="22" height="20" fill="#f8f0dc" />
          <rect x="-11" y="-14" width="22" height="20" fill="none" stroke="#8a6b3e" strokeWidth="2" />
          <rect x="-6" y="-9" width="12" height="12" rx="1" fill="#e8443f" />
          <path d="M-13,-14 L13,-14 L8,-20 L-8,-20z" fill="#8a6b3e" />
        </g>
      </g>
      <g transform="translate(212,172) scale(0.85)">
        <g className="j04-toro j04-toro3">
          <ellipse cx="0" cy="12" rx="20" ry="5" fill="#f5b31c" opacity="0.3" />
          <rect x="-14" y="6" width="28" height="6" rx="2" fill="#6b5a3e" />
          <rect x="-11" y="-14" width="22" height="20" fill="#f8f0dc" />
          <rect x="-11" y="-14" width="22" height="20" fill="none" stroke="#8a6b3e" strokeWidth="2" />
          <rect x="-6" y="-9" width="12" height="12" rx="1" fill="#f5b31c" />
          <path d="M-13,-14 L13,-14 L8,-20 L-8,-20z" fill="#8a6b3e" />
        </g>
      </g>
      <g transform="translate(284,196) scale(1.2)">
        <g className="j04-toro j04-toro4">
          <ellipse cx="0" cy="12" rx="20" ry="5" fill="#f5b31c" opacity="0.3" />
          <rect x="-14" y="6" width="28" height="6" rx="2" fill="#6b5a3e" />
          <rect x="-11" y="-14" width="22" height="20" fill="#f8f0dc" />
          <rect x="-11" y="-14" width="22" height="20" fill="none" stroke="#8a6b3e" strokeWidth="2" />
          <rect x="-6" y="-9" width="12" height="12" rx="1" fill="#f5b31c" />
          <path d="M-13,-14 L13,-14 L8,-20 L-8,-20z" fill="#8a6b3e" />
        </g>
      </g>
      <g transform="translate(344,180)">
        <g className="j04-toro j04-toro5">
          <ellipse cx="0" cy="12" rx="20" ry="5" fill="#f5b31c" opacity="0.3" />
          <rect x="-14" y="6" width="28" height="6" rx="2" fill="#6b5a3e" />
          <rect x="-11" y="-14" width="22" height="20" fill="#f8f0dc" />
          <rect x="-11" y="-14" width="22" height="20" fill="none" stroke="#8a6b3e" strokeWidth="2" />
          <rect x="-6" y="-9" width="12" height="12" rx="1" fill="#e8443f" />
          <path d="M-13,-14 L13,-14 L8,-20 L-8,-20z" fill="#8a6b3e" />
        </g>
      </g>

      {/* 横なぐりの雨と風 */}
      <g stroke="#9fc0d6" strokeWidth="2" strokeLinecap="round" opacity="0.6">
        <path className="j04-rain" d="M40,4 l-16,20" />
        <path className="j04-rain j04-r2" d="M96,40 l-16,20" />
        <path className="j04-rain j04-r3" d="M152,10 l-16,20" />
        <path className="j04-rain j04-r4" d="M208,54 l-16,20" />
        <path className="j04-rain j04-r5" d="M264,18 l-16,20" />
        <path className="j04-rain j04-r6" d="M320,66 l-16,20" />
        <path className="j04-rain j04-r7" d="M376,30 l-16,20" />
        <path className="j04-rain j04-r8" d="M68,92 l-16,20" />
        <path className="j04-rain j04-r9" d="M180,104 l-16,20" />
        <path className="j04-rain j04-r10" d="M292,116 l-16,20" />
        <path className="j04-rain j04-r11" d="M132,132 l-16,20" />
        <path className="j04-rain j04-r12" d="M356,96 l-16,20" />
      </g>
      <g fill="none" stroke="#b8d0e0" strokeWidth="2.5" strokeLinecap="round" opacity="0.26">
        <path className="j04-gust" d="M16,96 q40,-9 78,4 q26,8 46,0" />
        <path className="j04-gust j04-g2" d="M132,134 q40,-9 78,4 q26,8 46,0" />
      </g>

      <style>{`
        .j04-swirl {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j04-spin 6s linear infinite;
        }
        .j04-pine {
          transform-box: fill-box; transform-origin: 15% 100%;
          animation: j04-bend 2.8s ease-in-out infinite;
        }
        .j04-cloud { animation: j04-scud 7s ease-in-out infinite; }
        .j04-cloud2 { animation-delay: 1.2s; animation-duration: 8.4s; }
        .j04-cloud3 { animation-delay: 2.4s; animation-duration: 6.4s; }
        .j04-rain { animation: j04-slant 0.9s linear infinite; }
        .j04-r2 { animation-delay: 0.08s; animation-duration: 1.05s; }
        .j04-r3 { animation-delay: 0.16s; animation-duration: 0.82s; }
        .j04-r4 { animation-delay: 0.24s; animation-duration: 0.96s; }
        .j04-r5 { animation-delay: 0.32s; animation-duration: 1.1s; }
        .j04-r6 { animation-delay: 0.4s; animation-duration: 0.88s; }
        .j04-r7 { animation-delay: 0.48s; animation-duration: 1s; }
        .j04-r8 { animation-delay: 0.56s; animation-duration: 0.92s; }
        .j04-r9 { animation-delay: 0.64s; animation-duration: 1.08s; }
        .j04-r10 { animation-delay: 0.72s; animation-duration: 0.86s; }
        .j04-r11 { animation-delay: 0.3s; animation-duration: 1.02s; }
        .j04-r12 { animation-delay: 0.6s; animation-duration: 0.94s; }
        .j04-gust { animation: j04-blow 2.4s ease-in-out infinite; }
        .j04-g2 { animation-delay: 1.2s; }
        .j04-toro { animation: j04-float 9s ease-in-out infinite; }
        .j04-toro2 { animation-delay: 1.8s; animation-duration: 10.4s; }
        .j04-toro3 { animation-delay: 3.6s; animation-duration: 8.2s; }
        .j04-toro4 { animation-delay: 5.4s; animation-duration: 11s; }
        .j04-toro5 { animation-delay: 7.2s; animation-duration: 9.6s; }
        .j04-wave {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j04-lap 3s ease-in-out infinite;
        }
        .j04-w2 { animation-delay: 0.5s; }
        .j04-w3 { animation-delay: 1s; }
        .j04-w4 { animation-delay: 1.5s; }
        .j04-w5 { animation-delay: 2s; }
        @keyframes j04-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes j04-bend {
          0%, 100% { transform: rotate(3deg) skewX(2deg); }
          50% { transform: rotate(15deg) skewX(8deg); }
        }
        @keyframes j04-scud {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(24px); }
        }
        @keyframes j04-slant {
          0% { transform: translate(0, -26px); opacity: 0; }
          15% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { transform: translate(-84px, 132px); opacity: 0; }
        }
        @keyframes j04-blow {
          0% { transform: translateX(-30px); opacity: 0; }
          30% { opacity: 0.5; }
          70% { opacity: 0.5; }
          100% { transform: translateX(78px); opacity: 0; }
        }
        @keyframes j04-float {
          0% { transform: translate(0, 0) rotate(-3deg); opacity: 0; }
          8% { opacity: 1; }
          25% { transform: translate(16px, -4px) rotate(3deg); }
          50% { transform: translate(32px, 2px) rotate(-3deg); }
          75% { transform: translate(48px, -4px) rotate(3deg); }
          88% { opacity: 1; }
          100% { transform: translate(66px, 0) rotate(0deg); opacity: 0; }
        }
        @keyframes j04-lap {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(9px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .j04-swirl, .j04-pine, .j04-cloud, .j04-rain, .j04-gust,
          .j04-toro, .j04-wave { animation: none; }
        }
      `}</style>
    </svg>
  );
}
