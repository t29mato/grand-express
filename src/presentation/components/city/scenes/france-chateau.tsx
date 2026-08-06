/**
 * 城館(シャンボール、アンボワーズなど)に重ねる動き。
 *
 * 塔の三角旗が風にはためき、堀の水面が光を返し、
 * 白鳥のまわりに波紋が広がって、館の影がゆっくり揺れる。
 * 城・堀・芝は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FranceChateau() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 塔の三角旗(静止画の旗 129,16 と 275,16 に重ねる) */}
      <g fill="#e8443f">
        <path className="frcha-flag-a" d="M129,16h11l-3.4,3.4L140,23h-11z" />
        <path className="frcha-flag-b" d="M275,16h11l-3.4,3.4L286,23h-11z" />
      </g>

      {/* 流れる薄雲 */}
      <g fill="#f6efe2">
        <g className="frcha-cloud" opacity="0.32">
          <ellipse cx="190" cy="18" rx="18" ry="4.6" />
          <ellipse cx="179" cy="20" rx="11" ry="3.2" />
          <ellipse cx="201" cy="20" rx="12" ry="3.2" />
        </g>
      </g>

      {/* 堀の水面のきらめき(水は y=158〜188) */}
      <g stroke="#dff0fa" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path className="frcha-glint frcha-g1" d="M34,166h44" opacity="0.5" />
        <path className="frcha-glint frcha-g2" d="M186,178h56" opacity="0.45" />
        <path className="frcha-glint frcha-g3" d="M116,186h40" opacity="0.5" />
        <path className="frcha-glint frcha-g4" d="M280,170h48" opacity="0.4" />
      </g>

      {/* 館の映り込みのゆらぎ(静止画の反射 140,158 に重ねる) */}
      <g fill="#eae4d6">
        <rect className="frcha-mirror-a" x="140" y="158" width="122" height="24" opacity="0.16" />
        <rect className="frcha-mirror-b" x="113" y="158" width="30" height="20" opacity="0.14" />
        <rect className="frcha-mirror-c" x="259" y="158" width="30" height="20" opacity="0.14" />
      </g>

      {/* 白鳥(66,176)のまわりに広がる波紋 */}
      <g fill="none" stroke="#dff0fa" strokeWidth="1.2">
        <ellipse className="frcha-ripple-a" cx="66" cy="180" rx="10" ry="3" opacity="0.5" />
        <ellipse className="frcha-ripple-b" cx="66" cy="180" rx="10" ry="3" opacity="0.4" />
        <ellipse className="frcha-ripple-c" cx="214" cy="184" rx="8" ry="2.4" opacity="0.35" />
      </g>

      {/* 堀を渡るトンボ */}
      <g transform="translate(300,150)">
        <g className="frcha-dragon">
          <ellipse cx="0" cy="0" rx="4" ry="0.9" fill="#4f7f9f" opacity="0.7" />
          <path className="frcha-wing" d="M-2,-0.6q3,-3.4 6,0" fill="none" stroke="#cfe4f0" strokeWidth="0.9" opacity="0.8" />
        </g>
      </g>

      <style>{`
        .frcha-flag-a, .frcha-flag-b, .frcha-cloud, .frcha-glint,
        .frcha-mirror-a, .frcha-mirror-b, .frcha-mirror-c,
        .frcha-ripple-a, .frcha-ripple-b, .frcha-ripple-c, .frcha-wing {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .frcha-flag-a { transform-origin: 0% 50%; animation: frcha-flap 3.2s ease-in-out infinite; }
        .frcha-flag-b { transform-origin: 0% 50%; animation: frcha-flap 3.8s ease-in-out infinite; animation-delay: -1.4s; }
        .frcha-cloud { animation: frcha-drift 88s linear infinite; }
        .frcha-glint { animation: frcha-slide 16s linear infinite; }
        .frcha-g2 { animation-duration: 21s; animation-delay: -7s; }
        .frcha-g3 { animation-duration: 13s; animation-delay: -4s; }
        .frcha-g4 { animation-duration: 18s; animation-delay: -11s; }
        .frcha-mirror-a { animation: frcha-wobble 7.5s ease-in-out infinite; }
        .frcha-mirror-b { animation: frcha-wobble 9s ease-in-out infinite; animation-delay: -3s; }
        .frcha-mirror-c { animation: frcha-wobble 8.2s ease-in-out infinite; animation-delay: -5s; }
        .frcha-ripple-a { animation: frcha-ripple 7s ease-out infinite; }
        .frcha-ripple-b { animation: frcha-ripple 7s ease-out infinite; animation-delay: -3.5s; }
        .frcha-ripple-c { animation: frcha-ripple 9s ease-out infinite; animation-delay: -5s; }
        .frcha-dragon { animation: frcha-hover 19s ease-in-out infinite; }
        .frcha-wing { transform-origin: 0% 100%; animation: frcha-buzz 0.5s ease-in-out infinite; }
        @keyframes frcha-flap {
          0%, 100% { transform: scaleX(1) skewY(0deg); }
          50% { transform: scaleX(0.72) skewY(-7deg); }
        }
        @keyframes frcha-drift {
          0% { transform: translateX(-230px); }
          100% { transform: translateX(430px); }
        }
        @keyframes frcha-slide {
          0% { transform: translateX(-26px); opacity: 0; }
          30%, 70% { opacity: 0.5; }
          100% { transform: translateX(26px); opacity: 0; }
        }
        @keyframes frcha-wobble {
          0%, 100% { transform: scaleY(1) translateY(0); opacity: 0.1; }
          50% { transform: scaleY(1.14) translateY(2px); opacity: 0.22; }
        }
        @keyframes frcha-ripple {
          0% { transform: scale(0.25); opacity: 0.5; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes frcha-hover {
          0% { transform: translate(-40px, 6px); }
          25% { transform: translate(-8px, -8px); }
          50% { transform: translate(28px, 4px); }
          75% { transform: translate(60px, -6px); }
          100% { transform: translate(96px, 6px); }
        }
        @keyframes frcha-buzz {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .frcha-flag-a, .frcha-flag-b, .frcha-cloud, .frcha-glint,
          .frcha-mirror-a, .frcha-mirror-b, .frcha-mirror-c,
          .frcha-ripple-a, .frcha-ripple-b, .frcha-ripple-c,
          .frcha-dragon, .frcha-wing { animation: none; }
        }
      `}</style>
    </svg>
  );
}
