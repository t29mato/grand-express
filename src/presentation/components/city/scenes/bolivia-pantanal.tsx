/**
 * パンタナールの入口の町(プエルト・スアレスなど)に重ねる動き。
 *
 * 夕日を横切って水鳥の群れが帰り、湿地の水面が金色にゆれ、葦がそよぐ。
 * 背景(夕空・湿地・葦)は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function BoliviaPantanal() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 帰る水鳥の群れ */}
      <g transform="translate(150,52)">
        <g className="bpa-flock">
          <g transform="translate(0,0)">
            <path className="bpa-wing bpa-w1" d="M-11,0 q6,-8 11,0 q5,-8 11,0" stroke="#5a2f1c" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(34,-14)">
            <path className="bpa-wing bpa-w2" d="M-9,0 q5,-7 9,0 q4,-7 9,0" stroke="#5a2f1c" strokeWidth="2.3" fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(62,8)">
            <path className="bpa-wing bpa-w3" d="M-8,0 q4,-6 8,0 q4,-6 8,0" stroke="#5a2f1c" strokeWidth="2.1" fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(96,-4)">
            <path className="bpa-wing bpa-w4" d="M-7,0 q4,-5 7,0 q3,-5 7,0" stroke="#5a2f1c" strokeWidth="1.9" fill="none" strokeLinecap="round" />
          </g>
        </g>
      </g>

      {/* 水面の金のゆらぎ */}
      <g stroke="#ffd98a" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path className="bpa-shine bpa-s1" d="M244,132 h30" opacity="0.5" />
        <path className="bpa-shine bpa-s2" d="M300,132 h26" opacity="0.44" />
        <path className="bpa-shine bpa-s3" d="M184,152 h28" opacity="0.48" />
        <path className="bpa-shine bpa-s4" d="M228,152 h24" opacity="0.4" />
        <path className="bpa-shine bpa-s5" d="M286,172 h32" opacity="0.46" />
        <path className="bpa-shine bpa-s6" d="M338,172 h26" opacity="0.42" />
      </g>

      {/* そよぐ葦 */}
      <g stroke="#4a6b3a" strokeWidth="4" strokeLinecap="round" fill="none">
        <path className="bpa-reed bpa-r1" d="M104,206 c2,-24 -4,-38 -2,-54" />
        <path className="bpa-reed bpa-r2" d="M120,206 c3,-22 -2,-36 0,-50" />
        <path className="bpa-reed bpa-r3" d="M136,206 c2,-20 -3,-34 -1,-46" />
      </g>

      <style>{`
        .bpa-flock { animation: bpa-cross 40s linear infinite; }
        .bpa-wing {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: bpa-flap 2s ease-in-out infinite;
        }
        .bpa-w2 { animation-delay: -0.4s; animation-duration: 2.3s; }
        .bpa-w3 { animation-delay: -0.8s; animation-duration: 1.8s; }
        .bpa-w4 { animation-delay: -1.2s; animation-duration: 2.5s; }
        .bpa-shine { animation: bpa-ripple 8s ease-in-out infinite; }
        .bpa-s2 { animation-duration: 10s; animation-delay: -2.1s; }
        .bpa-s3 { animation-duration: 7s; animation-delay: -3.5s; }
        .bpa-s4 { animation-duration: 11s; animation-delay: -1.3s; }
        .bpa-s5 { animation-duration: 9s; animation-delay: -5.2s; }
        .bpa-s6 { animation-duration: 12s; animation-delay: -6.8s; }
        .bpa-reed {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: bpa-sway 7s ease-in-out infinite;
        }
        .bpa-r2 { animation-duration: 8.4s; animation-delay: -1.5s; }
        .bpa-r3 { animation-duration: 6.2s; animation-delay: -3s; }
        @keyframes bpa-cross {
          0% { transform: translate(-290px, 22px); }
          100% { transform: translate(260px, -20px); }
        }
        @keyframes bpa-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.35); }
        }
        @keyframes bpa-ripple {
          0%, 100% { transform: translateX(-9px); opacity: 0.1; }
          50% { transform: translateX(9px); opacity: 0.55; }
        }
        @keyframes bpa-sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3.5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bpa-flock, .bpa-wing, .bpa-shine, .bpa-reed { animation: none; }
        }
      `}</style>
    </svg>
  );
}
