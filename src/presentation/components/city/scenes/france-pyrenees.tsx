/**
 * ピレネー(ルルド、コートレなど)に重ねる動き。
 *
 * 山小屋の煙突から煙が細く立ちのぼり、牧草と野花が風になびき、
 * 谷の上を禿鷲がもう一羽ゆっくり旋回して、稜線を雲の影がわたる。
 * 山・小屋・羊は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FrancePyrenees() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 煙突(112,112)から立ちのぼる煙 */}
      <g fill="#e6ecef">
        <circle className="frpyr-smoke frpyr-s1" cx="116" cy="110" r="3.4" opacity="0.42" />
        <circle className="frpyr-smoke frpyr-s2" cx="116" cy="110" r="4.4" opacity="0.34" />
        <circle className="frpyr-smoke frpyr-s3" cx="116" cy="110" r="2.8" opacity="0.46" />
      </g>

      {/* 稜線をわたる雲の影 */}
      <g fill="#5a5a52">
        <ellipse className="frpyr-shadow-a" cx="150" cy="132" rx="46" ry="7" opacity="0.14" />
        <ellipse className="frpyr-shadow-b" cx="300" cy="150" rx="56" ry="8" opacity="0.11" />
      </g>

      {/* もう一羽の禿鷲(静止画の禿鷲 282,46 より高いところを旋回する) */}
      <g transform="translate(210,34)">
        <g className="frpyr-vulture">
          <path
            className="frpyr-soar"
            d="M-13,0c6,-4 11,-4.5 14,-0.8c3,-3.7 8,-3.2 14,0.8c-6,-0.8 -11,1.4 -14,2.8c-3,-1.4 -8,-3.6 -14,-2.8z"
            fill="#4a4436"
            opacity="0.7"
          />
        </g>
      </g>

      {/* 風になびく牧草 */}
      <g stroke="#5a8a42" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path className="frpyr-blade frpyr-b1" d="M28,196c-1,-7 0,-10 2,-13" opacity="0.7" />
        <path className="frpyr-blade frpyr-b2" d="M96,204c-1,-7 0,-10 2,-13" opacity="0.65" />
        <path className="frpyr-blade frpyr-b3" d="M162,190c-1,-6 0,-9 2,-12" opacity="0.6" />
        <path className="frpyr-blade frpyr-b4" d="M268,202c-1,-7 0,-10 2,-13" opacity="0.65" />
        <path className="frpyr-blade frpyr-b5" d="M332,194c-1,-6 0,-9 2,-12" opacity="0.6" />
        <path className="frpyr-blade frpyr-b6" d="M380,206c-1,-7 0,-10 2,-13" opacity="0.6" />
      </g>

      {/* 揺れる野花(静止画の花 46,182 ほかに重ねる) */}
      <g fill="#f5b31c">
        <circle className="frpyr-bloom frpyr-p1" cx="46" cy="182" r="2.2" opacity="0.9" />
        <circle className="frpyr-bloom frpyr-p2" cx="118" cy="196" r="2.2" opacity="0.9" />
        <circle className="frpyr-bloom frpyr-p3" cx="204" cy="176" r="2.2" opacity="0.9" />
        <circle className="frpyr-bloom frpyr-p4" cx="286" cy="200" r="2.2" opacity="0.9" />
        <circle className="frpyr-bloom frpyr-p5" cx="356" cy="184" r="2.2" opacity="0.9" />
      </g>

      <style>{`
        .frpyr-smoke, .frpyr-shadow-a, .frpyr-shadow-b,
        .frpyr-soar, .frpyr-blade, .frpyr-bloom {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .frpyr-smoke { animation: frpyr-rise 8.5s linear infinite; }
        .frpyr-s2 { animation-duration: 11s; animation-delay: -4s; }
        .frpyr-s3 { animation-duration: 7s; animation-delay: -5.5s; }
        .frpyr-shadow-a { animation: frpyr-sweep 46s linear infinite; }
        .frpyr-shadow-b { animation: frpyr-sweep 62s linear infinite; animation-delay: -22s; }
        .frpyr-vulture { animation: frpyr-circle 34s ease-in-out infinite; }
        .frpyr-soar { animation: frpyr-tilt 8s ease-in-out infinite; }
        .frpyr-blade { transform-origin: 50% 100%; animation: frpyr-bend 4.6s ease-in-out infinite; }
        .frpyr-b2 { animation-duration: 5.4s; animation-delay: -1.5s; }
        .frpyr-b3 { animation-duration: 4.1s; animation-delay: -2.6s; }
        .frpyr-b4 { animation-duration: 5.8s; animation-delay: -3.4s; }
        .frpyr-b5 { animation-duration: 4.9s; animation-delay: -0.8s; }
        .frpyr-b6 { animation-duration: 5.1s; animation-delay: -2.2s; }
        .frpyr-bloom { transform-origin: 50% 100%; animation: frpyr-nod 4.6s ease-in-out infinite; }
        .frpyr-p2 { animation-duration: 5.4s; animation-delay: -1.5s; }
        .frpyr-p3 { animation-duration: 4.1s; animation-delay: -2.6s; }
        .frpyr-p4 { animation-duration: 5.8s; animation-delay: -3.4s; }
        .frpyr-p5 { animation-duration: 4.9s; animation-delay: -0.8s; }
        @keyframes frpyr-rise {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          25% { opacity: 0.4; }
          100% { transform: translate(14px, -44px) scale(1.9); opacity: 0; }
        }
        @keyframes frpyr-sweep {
          0% { transform: translateX(-260px) scaleX(0.8); }
          100% { transform: translateX(300px) scaleX(1.2); }
        }
        @keyframes frpyr-circle {
          0%, 100% { transform: translate(-90px, 0) scaleX(1); }
          25% { transform: translate(-20px, 14px) scaleX(0.5); }
          50% { transform: translate(60px, 2px) scaleX(1); }
          75% { transform: translate(-20px, -12px) scaleX(0.5); }
        }
        @keyframes frpyr-tilt {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes frpyr-bend {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(14deg); }
        }
        @keyframes frpyr-nod {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(1.6px, -1px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .frpyr-smoke, .frpyr-shadow-a, .frpyr-shadow-b,
          .frpyr-vulture, .frpyr-soar, .frpyr-blade, .frpyr-bloom { animation: none; }
        }
      `}</style>
    </svg>
  );
}
