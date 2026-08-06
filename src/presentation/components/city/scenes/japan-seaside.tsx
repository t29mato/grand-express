/**
 * 砂浜の街(金沢など)に重ねる動き。
 *
 * 沖の波が寄せ、汀線の泡がひたひたと満ちては引く。
 * 空には金箔がひとひらずつ舞い、光を返してきらめく。
 * 空・海・砂浜・松は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function JapanSeaside() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 沖を流れる波の筋 */}
      <g stroke="#eaf7ff" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="jse-swell jse-s1" d="M32,116h52" opacity="0.5" />
        <path className="jse-swell jse-s2" d="M226,120h60" opacity="0.45" />
        <path className="jse-swell jse-s3" d="M104,130h56" opacity="0.5" />
        <path className="jse-swell jse-s4" d="M296,134h58" opacity="0.4" />
        <path className="jse-swell jse-s5" d="M18,142h64" opacity="0.45" />
      </g>

      {/* 汀線の泡 */}
      <path
        className="jse-foam"
        d="M-6,147 q22,-4 44,0 q22,4 44,0 q22,-4 44,0 q22,4 44,0 q22,-4 44,0 q22,4 44,0 q22,-4 44,0 q22,4 44,0 q22,-4 44,0"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* 舞う金箔 */}
      <g fill="#f5b31c">
        <g transform="translate(86,96)">
          <path className="jse-leaf jse-g1" d="M-4,-2 L3,-3 L4,2 L-3,3 Z" opacity="0.9" />
        </g>
        <g transform="translate(44,132)">
          <path className="jse-leaf jse-g2" d="M-3,-2 L3,-2 L3,2 L-3,2 Z" opacity="0.8" />
        </g>
        <g transform="translate(268,64)">
          <path className="jse-leaf jse-g3" d="M-4,-2 L3,-3 L4,2 L-3,3 Z" opacity="0.85" />
        </g>
        <g transform="translate(320,102)">
          <path className="jse-leaf jse-g4" d="M-3,-2 L3,-2 L3,2 L-3,2 Z" opacity="0.9" />
        </g>
        <g transform="translate(360,150)">
          <path className="jse-leaf jse-g5" d="M-4,-2 L3,-3 L4,2 L-3,3 Z" opacity="0.8" />
        </g>
        <g transform="translate(140,72)">
          <path className="jse-leaf jse-g6" d="M-3,-2 L3,-2 L3,2 L-3,2 Z" opacity="0.85" />
        </g>
      </g>

      <style>{`
        .jse-swell { animation: jse-flow 16s linear infinite; animation-delay: -6s; }
        .jse-s2 { animation-duration: 21s; animation-delay: -7s; }
        .jse-s3 { animation-duration: 13s; animation-delay: -3s; }
        .jse-s4 { animation-duration: 18s; animation-delay: -11s; }
        .jse-s5 { animation-duration: 15s; animation-delay: -5s; }
        .jse-foam { animation: jse-wash 9s ease-in-out infinite; }
        .jse-leaf {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: jse-flutter 15s ease-in-out infinite, jse-glint 4.2s ease-in-out infinite;
        }
        .jse-g2 { animation-duration: 19s, 3.4s; animation-delay: -6s, -1.2s; }
        .jse-g3 { animation-duration: 13s, 5s; animation-delay: -9s, -2.4s; }
        .jse-g4 { animation-duration: 17s, 3.8s; animation-delay: -4s, -3.1s; }
        .jse-g5 { animation-duration: 21s, 4.6s; animation-delay: -12s, -0.8s; }
        .jse-g6 { animation-duration: 16s, 5.4s; animation-delay: -8s, -2.9s; }
        @keyframes jse-flow {
          0% { transform: translateX(-26px); opacity: 0; }
          30%, 70% { opacity: 0.5; }
          100% { transform: translateX(26px); opacity: 0; }
        }
        @keyframes jse-wash {
          0%, 100% { transform: translateY(2px); opacity: 0.35; }
          50% { transform: translateY(-3px); opacity: 0.65; }
        }
        @keyframes jse-flutter {
          0%, 100% { transform: translate(0, 0) rotate(-20deg); }
          33% { transform: translate(-14px, 18px) rotate(140deg); }
          66% { transform: translate(10px, 34px) rotate(300deg); }
        }
        @keyframes jse-glint {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jse-swell, .jse-foam, .jse-leaf { animation: none; }
        }
      `}</style>
    </svg>
  );
}
