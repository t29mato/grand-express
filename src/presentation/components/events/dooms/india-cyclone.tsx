/**
 * サイクロン上陸。ベンガル湾から名前つきの嵐が上がってくる。
 *
 * 椰子がしなり、屋根のトタンが剥がれ、看板が外れ、
 * 取っておいたはずのものまで内陸へ飛んでいく。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function IndiaCyclone() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空 */}
      <rect width="400" height="210" fill="#1b2b3a" />
      <g fill="#243a4d">
        <g transform="translate(200,26)">
          <ellipse className="icy-cloud-a" cx="0" cy="0" rx="120" ry="24" />
        </g>
        <g transform="translate(200,58)">
          <ellipse className="icy-cloud-b" cx="0" cy="0" rx="96" ry="18" />
        </g>
      </g>
      <rect width="400" height="18" fill="#243a4d" />

      {/* 高波の湾 */}
      <rect y="104" width="400" height="42" fill="#2f5f7a" />
      <g fill="#4d86a6">
        <g transform="translate(300,112)">
          <path className="icy-wave-a" d="M-60,0 q14,-9 28,0 q14,9 28,0 q14,-9 28,0 l0,8 l-84,0z" />
        </g>
        <g transform="translate(140,126)">
          <path className="icy-wave-b" d="M-60,0 q14,-9 28,0 q14,9 28,0 q14,-9 28,0 l0,8 l-84,0z" />
        </g>
        <g transform="translate(330,138)">
          <path className="icy-wave-c" d="M-60,0 q14,-9 28,0 q14,9 28,0 q14,-9 28,0 l0,8 l-84,0z" />
        </g>
      </g>

      {/* 砂浜 */}
      <rect y="142" width="400" height="68" fill="#6b5a42" />
      <rect y="142" width="400" height="6" fill="#7d6a4e" />

      {/* トタンが剥がれる家 */}
      <g>
        <rect x="86" y="128" width="96" height="58" fill="#8a7358" />
        <rect x="86" y="128" width="96" height="6" fill="#9a8266" />
        <rect x="104" y="150" width="24" height="36" fill="#3f3529" />
        <rect x="146" y="148" width="22" height="20" rx="2" fill="#3f3529" />
        <path d="M78,128 L134,102 L190,128z" fill="#7d5f3a" />
        <path d="M78,128 L134,102 L134,128z" fill="#6b4f2e" />
      </g>
      <g transform="translate(118,98)">
        <g className="icy-sheet-a">
          <path d="M-28,-7 L28,-11 L30,3 L-26,7z" fill="#9aa8ac" />
          <g fill="#78888c">
            <path d="M-16,-8 L-13,-8 L-11,6 L-14,6z" />
            <path d="M-2,-9 L1,-9 L3,5 L0,5z" />
            <path d="M12,-10 L15,-10 L17,4 L14,4z" />
          </g>
        </g>
      </g>
      <g transform="translate(156,88)">
        <g className="icy-sheet-b">
          <path d="M-22,-6 L22,-9 L23,3 L-21,6z" fill="#8a999d" />
          <g fill="#6e7d81">
            <path d="M-10,-7 L-7,-7 L-6,5 L-9,5z" />
            <path d="M4,-8 L7,-8 L8,4 L5,4z" />
          </g>
        </g>
      </g>

      {/* 外れかけた看板 */}
      <g>
        <rect x="238" y="120" width="6" height="66" fill="#4a4038" />
        <rect x="288" y="120" width="6" height="66" fill="#4a4038" />
        <g transform="translate(241,120)">
          <g className="icy-sign">
            <rect x="0" y="-24" width="52" height="26" rx="2" fill="#e05252" />
            <rect x="0" y="-24" width="52" height="7" fill="#f07070" />
            <rect x="6" y="-13" width="30" height="4" rx="2" fill="#f6d8d8" />
            <rect x="6" y="-6" width="20" height="4" rx="2" fill="#f6d8d8" />
          </g>
        </g>
      </g>

      {/* しなる椰子 */}
      <g>
        <g transform="translate(62,192)">
          <g className="icy-palm-a">
            <path d="M-5,0 q-2,-38 -14,-64 l10,-4 q12,28 13,68z" fill="#5c4a30" />
            <g fill="#2f6b48" transform="translate(-15,-67)">
              <path d="M0,0 q-32,-12 -48,4 q28,-3 48,5z" />
              <path d="M0,0 q-28,-24 -50,-20 q26,7 50,11z" />
              <path d="M0,0 q-18,-28 -2,-42 q-5,24 4,38z" />
              <path d="M0,0 q18,-22 38,-18 q-20,5 -36,11z" />
              <path d="M0,0 q24,-5 33,9 q-20,-7 -33,0z" />
            </g>
            <circle cx="-10" cy="-61" r="5" fill="#7d5f3a" />
            <circle cx="-19" cy="-58" r="4" fill="#7d5f3a" />
          </g>
        </g>
        <g transform="translate(336,186)">
          <g className="icy-palm-b">
            <path d="M-5,0 q-2,-32 -12,-56 l10,-4 q11,26 12,60z" fill="#5c4a30" />
            <g fill="#2b6142" transform="translate(-13,-59)">
              <path d="M0,0 q-30,-10 -44,5 q26,-3 44,4z" />
              <path d="M0,0 q-26,-22 -46,-18 q24,6 46,10z" />
              <path d="M0,0 q-16,-26 -2,-38 q-5,22 4,34z" />
              <path d="M0,0 q17,-20 35,-17 q-18,5 -33,10z" />
              <path d="M0,0 q22,-5 30,8 q-18,-6 -30,0z" />
            </g>
          </g>
        </g>
      </g>

      {/* 飛んでいく持ちもの */}
      <g transform="translate(200,72)">
        <g className="icy-fly-a">
          <circle r="9" fill="#f5b31c" />
          <circle r="4" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(200,116)">
        <g className="icy-fly-b">
          <path d="M-14,2 q-2,-14 14,-15 q16,1 14,15 q-14,7 -28,0z" fill="#c9713a" />
          <path d="M-7,-13 l-6,-9 l10,4 l6,-5 l3,7 l8,-2 l-4,7z" fill="#a85a28" />
        </g>
      </g>
      <g transform="translate(200,52)">
        <g className="icy-fly-c">
          <circle r="7" fill="#f5b31c" />
          <circle r="3" fill="#c98a12" />
        </g>
      </g>

      {/* 吹き抜ける風 */}
      <g fill="none" stroke="#a8cfe4" strokeWidth="3" strokeLinecap="round">
        <g transform="translate(200,40)">
          <path className="icy-gust-a" d="M-90,0 q40,-12 80,0 q30,9 58,-2" opacity="0.4" />
        </g>
        <g transform="translate(200,86)">
          <path className="icy-gust-b" d="M-90,0 q40,-12 80,0 q30,9 58,-2" opacity="0.35" />
        </g>
        <g transform="translate(200,132)">
          <path className="icy-gust-c" d="M-90,0 q40,-12 80,0 q30,9 58,-2" opacity="0.3" />
        </g>
        <g transform="translate(200,172)">
          <path className="icy-gust-d" d="M-70,0 q30,-9 62,0 q24,7 44,-2" opacity="0.25" />
        </g>
      </g>

      {/* 横なぐりの雨 */}
      <g stroke="#a8cfe4" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.45">
        <path className="icy-rain-a" d="M60,20 l-20,12" />
        <path className="icy-rain-b" d="M150,60 l-20,12" />
        <path className="icy-rain-c" d="M240,14 l-20,12" />
        <path className="icy-rain-d" d="M320,74 l-20,12" />
        <path className="icy-rain-e" d="M110,110 l-20,12" />
        <path className="icy-rain-f" d="M270,140 l-20,12" />
        <path className="icy-rain-g" d="M370,36 l-20,12" />
        <path className="icy-rain-h" d="M200,96 l-20,12" />
      </g>

      <style>{`
        .icy-cloud-a { transform-box: fill-box; transform-origin: center; animation: icy-sweep 8s linear infinite; }
        .icy-cloud-b { transform-box: fill-box; transform-origin: center; animation: icy-sweep 6s linear infinite; animation-delay: -2.5s; }
        .icy-wave-a { transform-box: fill-box; transform-origin: center; animation: icy-swell 2.4s ease-in-out infinite; }
        .icy-wave-b { transform-box: fill-box; transform-origin: center; animation: icy-swell 2.9s ease-in-out infinite; animation-delay: -0.9s; }
        .icy-wave-c { transform-box: fill-box; transform-origin: center; animation: icy-swell 2.1s ease-in-out infinite; animation-delay: -1.5s; }
        .icy-palm-a {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: rotate(-20deg);
          animation: icy-bend 2.6s ease-in-out infinite;
        }
        .icy-palm-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: rotate(-24deg);
          animation: icy-bend 2.2s ease-in-out infinite;
          animation-delay: -0.7s;
        }
        .icy-sheet-a {
          transform-box: fill-box;
          transform-origin: center;
          animation: icy-tearoff 3.6s ease-in infinite;
        }
        .icy-sheet-b {
          transform-box: fill-box;
          transform-origin: center;
          animation: icy-tearoff 3.6s ease-in infinite;
          animation-delay: -1.8s;
        }
        .icy-sign {
          transform-box: fill-box;
          transform-origin: right bottom;
          transform: rotate(16deg);
          animation: icy-swing 2.8s ease-in-out infinite;
        }
        .icy-fly-a {
          transform-box: fill-box;
          transform-origin: center;
          animation: icy-blowaway 4.2s linear infinite;
        }
        .icy-fly-b {
          transform-box: fill-box;
          transform-origin: center;
          animation: icy-blowaway 5.4s linear infinite;
          animation-delay: -2.2s;
        }
        .icy-fly-c {
          transform-box: fill-box;
          transform-origin: center;
          animation: icy-blowaway 4.8s linear infinite;
          animation-delay: -3.4s;
        }
        .icy-gust-a { transform-box: fill-box; transform-origin: center; animation: icy-rush 1.9s linear infinite; }
        .icy-gust-b { transform-box: fill-box; transform-origin: center; animation: icy-rush 2.3s linear infinite; animation-delay: -0.7s; }
        .icy-gust-c { transform-box: fill-box; transform-origin: center; animation: icy-rush 2.1s linear infinite; animation-delay: -1.2s; }
        .icy-gust-d { transform-box: fill-box; transform-origin: center; animation: icy-rush 2.6s linear infinite; animation-delay: -1.7s; }
        .icy-rain-a { animation: icy-slant 0.7s linear infinite; }
        .icy-rain-b { animation: icy-slant 0.84s linear infinite; animation-delay: -0.3s; }
        .icy-rain-c { animation: icy-slant 0.62s linear infinite; animation-delay: -0.5s; }
        .icy-rain-d { animation: icy-slant 0.9s linear infinite; animation-delay: -0.15s; }
        .icy-rain-e { animation: icy-slant 0.74s linear infinite; animation-delay: -0.6s; }
        .icy-rain-f { animation: icy-slant 0.66s linear infinite; animation-delay: -0.25s; }
        .icy-rain-g { animation: icy-slant 0.86s linear infinite; animation-delay: -0.45s; }
        .icy-rain-h { animation: icy-slant 0.78s linear infinite; animation-delay: -0.55s; }
        @keyframes icy-sweep {
          0% { transform: translate(140px, 0); }
          100% { transform: translate(-140px, 0); }
        }
        @keyframes icy-swell {
          0%, 100% { transform: translate(0, 0) scaleY(1); }
          50% { transform: translate(-8px, -5px) scaleY(1.5); }
        }
        @keyframes icy-bend {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(-30deg); }
        }
        @keyframes icy-tearoff {
          0% { transform: translate(58px, 24px) rotate(10deg); opacity: 0; }
          12% { transform: translate(40px, 14px) rotate(-6deg); opacity: 1; }
          70% { transform: translate(-70px, -22px) rotate(-150deg); opacity: 1; }
          100% { transform: translate(-150px, -46px) rotate(-300deg); opacity: 0; }
        }
        @keyframes icy-swing {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(26deg); }
        }
        @keyframes icy-blowaway {
          0% { transform: translate(230px, 26px) rotate(0deg); opacity: 0; }
          14%, 82% { opacity: 1; }
          100% { transform: translate(-230px, -34px) rotate(-620deg); opacity: 0; }
        }
        @keyframes icy-rush {
          0% { transform: translate(210px, 0) scaleX(0.7); opacity: 0; }
          25%, 70% { opacity: 1; }
          100% { transform: translate(-210px, -8px) scaleX(1.3); opacity: 0; }
        }
        @keyframes icy-slant {
          0% { transform: translate(64px, -34px); opacity: 0; }
          20%, 80% { opacity: 0.45; }
          100% { transform: translate(-64px, 34px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .icy-cloud-a, .icy-cloud-b, .icy-wave-a, .icy-wave-b, .icy-wave-c,
          .icy-palm-a, .icy-palm-b, .icy-sheet-a, .icy-sheet-b, .icy-sign,
          .icy-fly-a, .icy-fly-b, .icy-fly-c,
          .icy-gust-a, .icy-gust-b, .icy-gust-c, .icy-gust-d,
          .icy-rain-a, .icy-rain-b, .icy-rain-c, .icy-rain-d,
          .icy-rain-e, .icy-rain-f, .icy-rain-g, .icy-rain-h { animation: none; }
        }
      `}</style>
    </svg>
  );
}
