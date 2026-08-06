/**
 * 白い街(スクレ)に重ねる、屋根の上の鳩と旗。
 *
 * 白壁と赤瓦の広場には鳩がいて、人が通るたび一斉に舞い上がる。
 * 独立宣言の街らしく、屋根の旗がゆっくりはためく。
 */
export function BoliviaWhitecity() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空を流れる薄雲 */}
      <g fill="#f6efe2">
        <g className="bolwhite-cloud-a" opacity="0.34">
          <ellipse cx="150" cy="16" rx="46" ry="4" />
          <ellipse cx="180" cy="20" rx="26" ry="2.6" />
        </g>
        <g className="bolwhite-cloud-b" opacity="0.26">
          <ellipse cx="290" cy="52" rx="38" ry="3.4" />
        </g>
      </g>

      {/* 屋根の旗 */}
      <g transform="translate(98,72)">
        <rect x="-0.9" y="-30" width="1.8" height="30" fill="#8a7458" />
        <g className="bolwhite-flag">
          <path d="M0,-29 L20,-25 L20,-16 L0,-19z" fill="#e8443f" />
          <path d="M0,-25 L20,-21 L20,-18 L0,-22z" fill="#f5b31c" />
        </g>
      </g>

      {/* 屋根の上を舞う鳩 */}
      <g fill="#f6efe2">
        <g className="bolwhite-dove-a">
          <ellipse cx="0" cy="0" rx="4.2" ry="2.4" />
          <path d="M3,-0.8 L7,0.2 L3,1.2z" />
          <path d="M-4,0.4 L-8,2.4 L-3.4,1.4z" fill="#dcd4c2" />
          <path className="bolwhite-dwing-a" d="M-1,-0.6 C-3,-7 3,-8.4 5,-2.6 C2.6,-4.4 0.4,-3.4 -1,-0.6z" fill="#e8e0ce" />
        </g>
        <g className="bolwhite-dove-b">
          <ellipse cx="0" cy="0" rx="3.4" ry="2" />
          <path d="M2.4,-0.6 L5.8,0.2 L2.4,1z" />
          <path d="M-3.2,0.4 L-6.4,2 L-2.8,1.2z" fill="#dcd4c2" />
          <path className="bolwhite-dwing-b" d="M-0.8,-0.5 C-2.4,-5.8 2.4,-7 4,-2.2 C2,-3.6 0.4,-2.8 -0.8,-0.5z" fill="#e8e0ce" />
        </g>
        <g className="bolwhite-dove-c">
          <ellipse cx="0" cy="0" rx="3" ry="1.8" />
          <path d="M2,-0.5 L5,0.2 L2,0.9z" />
          <path d="M-2.8,0.4 L-5.6,1.8 L-2.4,1z" fill="#dcd4c2" />
          <path className="bolwhite-dwing-c" d="M-0.7,-0.4 C-2,-5.2 2,-6.2 3.4,-2 C1.7,-3.2 0.3,-2.5 -0.7,-0.4z" fill="#e8e0ce" />
        </g>
      </g>

      <style>{`
        .bolwhite-cloud-a, .bolwhite-cloud-b,
        .bolwhite-dove-a, .bolwhite-dove-b, .bolwhite-dove-c {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .bolwhite-cloud-a { animation: bolwhite-drift 60s linear infinite; }
        .bolwhite-cloud-b { animation: bolwhite-drift 76s linear infinite; animation-delay: -30s; }
        .bolwhite-flag {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: bolwhite-wave 3.4s ease-in-out infinite;
        }
        .bolwhite-dove-a { transform: translate(64px, 56px); animation: bolwhite-fly-a 16s ease-in-out infinite; }
        .bolwhite-dove-b { transform: translate(330px, 44px); animation: bolwhite-fly-b 21s ease-in-out infinite; }
        .bolwhite-dove-c { transform: translate(266px, 66px); animation: bolwhite-fly-c 19s ease-in-out infinite; }
        .bolwhite-dwing-a, .bolwhite-dwing-b, .bolwhite-dwing-c {
          transform-box: fill-box;
          transform-origin: 0% 100%;
        }
        .bolwhite-dwing-a { animation: bolwhite-flap 0.5s ease-in-out infinite; }
        .bolwhite-dwing-b { animation: bolwhite-flap 0.58s ease-in-out infinite; animation-delay: -0.2s; }
        .bolwhite-dwing-c { animation: bolwhite-flap 0.44s ease-in-out infinite; animation-delay: -0.3s; }
        @keyframes bolwhite-drift {
          0% { transform: translateX(-210px); }
          100% { transform: translateX(280px); }
        }
        @keyframes bolwhite-wave {
          0%, 100% { transform: skewY(0deg) scaleY(1); }
          35% { transform: skewY(-7deg) scaleY(1.1); }
          70% { transform: skewY(6deg) scaleY(0.92); }
        }
        @keyframes bolwhite-fly-a {
          0% { transform: translate(20px, 66px); }
          45% { transform: translate(88px, 42px); }
          70% { transform: translate(120px, 54px); }
          100% { transform: translate(176px, 34px); }
        }
        @keyframes bolwhite-fly-b {
          0% { transform: translate(384px, 60px); }
          40% { transform: translate(320px, 36px); }
          72% { transform: translate(268px, 50px); }
          100% { transform: translate(222px, 28px); }
        }
        @keyframes bolwhite-fly-c {
          0% { transform: translate(300px, 64px); }
          50% { transform: translate(246px, 42px); }
          100% { transform: translate(196px, 58px); }
        }
        @keyframes bolwhite-flap {
          0%, 100% { transform: rotate(-26deg) scaleY(1); }
          50% { transform: rotate(30deg) scaleY(0.55); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bolwhite-cloud-a, .bolwhite-cloud-b, .bolwhite-flag,
          .bolwhite-dove-a, .bolwhite-dove-b, .bolwhite-dove-c,
          .bolwhite-dwing-a, .bolwhite-dwing-b, .bolwhite-dwing-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
