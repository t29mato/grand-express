/**
 * 8月。雨のなかの独立記念日。
 *
 * 十五日、雨の切れ間に屋上から三色の凧が上がる。旗はいっぱいにはためき、
 * 街の足もとでは増水した水がじわじわ広がって、小舟が高いほうへ渡っていく。
 */
export function India04() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 一面の雨雲 */}
      <rect width="400" height="210" fill="#7b93a8" />
      <g fill="#516a80">
        <rect x="-40" width="480" height="34" />
        <ellipse cx="-4" cy="44" rx="64" ry="30" />
        <ellipse cx="72" cy="36" rx="56" ry="24" />
        <ellipse cx="160" cy="30" rx="52" ry="20" />
        <ellipse cx="248" cy="30" rx="52" ry="20" />
        <ellipse cx="330" cy="38" rx="58" ry="26" />
        <ellipse cx="408" cy="44" rx="64" ry="30" />
      </g>

      {/* 雨の切れ間 */}
      <g fill="#a8c1d2">
        <ellipse cx="216" cy="52" rx="98" ry="42" />
        <ellipse cx="150" cy="42" rx="52" ry="26" />
        <ellipse cx="284" cy="40" rx="48" ry="24" />
      </g>
      <g fill="#8fadc2" opacity="0.7">
        <ellipse className="i04-wisp-a" cx="150" cy="30" rx="34" ry="10" />
        <ellipse className="i04-wisp-b" cx="250" cy="70" rx="40" ry="9" />
      </g>

      {/* 三色の凧 */}
      <g className="i04-kite-a">
        <path d="M0,-16 L12,0 L0,16 L-12,0 z" fill="#f5931c" />
        <path d="M0,-16 L12,0 L-12,0 z" fill="#f6efe2" />
        <path d="M-12,0 L12,0 L0,16 z" fill="#3a7a4a" />
        <path className="i04-tail-a" d="M0,16 q7,10 -2,18 q-8,8 1,17" fill="none" stroke="#e8443f" strokeWidth="2.5" />
      </g>
      <g className="i04-kite-b">
        <path d="M0,-13 L10,0 L0,13 L-10,0 z" fill="#e8443f" />
        <path d="M0,-13 L10,0 L-10,0 z" fill="#f5b31c" />
        <path className="i04-tail-b" d="M0,13 q-6,9 2,16 q7,7 -1,15" fill="none" stroke="#f6efe2" strokeWidth="2.5" />
      </g>
      <g className="i04-kite-c">
        <path d="M0,-11 L9,0 L0,11 L-9,0 z" fill="#5b8fe8" />
        <path d="M0,-11 L9,0 L-9,0 z" fill="#f6efe2" />
      </g>

      {/* 三色旗 */}
      <rect x="112" y="46" width="5" height="120" fill="#6b6154" />
      <circle cx="114" cy="44" r="5" fill="#f5b31c" />
      <g className="i04-flag">
        <rect x="117" y="50" width="76" height="14" fill="#f5931c" />
        <rect x="117" y="64" width="76" height="14" fill="#f6efe2" />
        <rect x="117" y="78" width="76" height="14" fill="#3a7a4a" />
        <circle cx="155" cy="71" r="6" fill="none" stroke="#20407a" strokeWidth="2.5" />
        <circle cx="155" cy="71" r="1.6" fill="#20407a" />
      </g>

      {/* 屋上の街 */}
      <g fill="#4c6070">
        <rect x="0" y="118" width="72" height="60" />
        <rect x="64" y="134" width="58" height="44" />
        <rect x="196" y="112" width="66" height="66" />
        <rect x="256" y="130" width="52" height="48" />
        <rect x="304" y="106" width="60" height="72" />
        <rect x="358" y="128" width="42" height="50" />
      </g>
      <g fill="#3c4e5c">
        <rect x="0" y="114" width="72" height="6" />
        <rect x="64" y="130" width="58" height="6" />
        <rect x="196" y="108" width="66" height="6" />
        <rect x="256" y="126" width="52" height="6" />
        <rect x="304" y="102" width="60" height="6" />
        <rect x="358" y="124" width="42" height="6" />
      </g>
      <g fill="#f5b31c" opacity="0.9">
        <rect x="12" y="130" width="9" height="11" />
        <rect x="34" y="130" width="9" height="11" />
        <rect x="210" y="124" width="9" height="11" />
        <rect x="236" y="124" width="9" height="11" />
        <rect x="318" y="118" width="9" height="11" />
        <rect x="344" y="118" width="9" height="11" />
      </g>

      {/* 屋上で糸を繰る人 */}
      <g className="i04-flyer">
        <rect x="322" y="78" width="10" height="24" fill="#2f3b46" />
        <rect x="317" y="54" width="20" height="26" rx="6" fill="#f6efe2" />
        <circle cx="327" cy="46" r="9" fill="#c08a5a" />
        <path d="M318,44 a9,9 0 0 1 18,0 z" fill="#2a1f18" />
        <rect className="i04-arm" x="334" y="56" width="22" height="6" rx="3" fill="#c08a5a" />
      </g>

      {/* 増水した街路 */}
      <rect y="176" width="400" height="34" fill="#6a6a4e" />
      <rect y="176" width="400" height="4" fill="#4e4e37" />
      <g fill="#87865f">
        <rect className="i04-wave-a" x="18" y="188" width="94" height="5" rx="2.5" />
        <rect className="i04-wave-b" x="180" y="200" width="110" height="5" rx="2.5" />
        <rect className="i04-wave-c" x="260" y="182" width="86" height="4" rx="2" />
      </g>
      <g className="i04-boat">
        <path d="M-30,0 L30,0 L22,12 L-22,12 z" fill="#8a5a2a" />
        <rect x="-4" y="-22" width="4" height="22" fill="#6b4a2a" />
        <path d="M0,-22 L18,-8 L0,-8 z" fill="#f6efe2" />
        <circle cx="-13" cy="-8" r="6" fill="#e8443f" />
        <circle cx="10" cy="-9" r="6" fill="#5b8fe8" />
      </g>

      {/* 切れ間からまた降りだす雨 */}
      <g stroke="#cfe4f0" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5">
        <path className="i04-rain-a" d="M20,10 l-6,24" />
        <path className="i04-rain-b" d="M52,70 l-6,24" />
        <path className="i04-rain-c" d="M84,26 l-6,24" />
        <path className="i04-rain-d" d="M300,14 l-6,24" />
        <path className="i04-rain-e" d="M334,66 l-6,24" />
        <path className="i04-rain-f" d="M368,22 l-6,24" />
        <path className="i04-rain-g" d="M36,124 l-6,24" />
        <path className="i04-rain-h" d="M352,140 l-6,24" />
      </g>

      <style>{`
        .i04-wisp-a { animation: i04-creep 13s ease-in-out infinite; }
        .i04-wisp-b { animation: i04-creep 17s ease-in-out infinite reverse; }
        .i04-kite-a { transform: translate(250px, 52px); animation: i04-soar-a 6s ease-in-out infinite; }
        .i04-kite-b { transform: translate(300px, 34px); animation: i04-soar-b 5.2s ease-in-out infinite; }
        .i04-kite-c { transform: translate(210px, 26px); animation: i04-soar-c 7s ease-in-out infinite; }
        .i04-tail-a, .i04-tail-b {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: i04-flick 1.1s ease-in-out infinite;
        }
        .i04-tail-b { animation-duration: 0.9s; animation-delay: -0.4s; }
        .i04-flag {
          transform-box: fill-box;
          transform-origin: 0 50%;
          animation: i04-wave 2.4s ease-in-out infinite;
        }
        .i04-flyer { animation: i04-lean 3s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
        .i04-arm { transform-box: fill-box; transform-origin: 0 50%; animation: i04-tug 1.3s ease-in-out infinite; }
        .i04-wave-a { animation: i04-flow 6.4s linear infinite; }
        .i04-wave-b { animation: i04-flow 7.6s linear infinite; animation-delay: -2.6s; }
        .i04-wave-c { animation: i04-flow 5.6s linear infinite; animation-delay: -4s; }
        .i04-boat { transform: translate(120px, 190px); animation: i04-row 9s linear infinite; }
        .i04-rain-a { animation: i04-fall 0.72s linear infinite; }
        .i04-rain-b { animation: i04-fall 0.86s linear infinite; animation-delay: -0.3s; }
        .i04-rain-c { animation: i04-fall 0.64s linear infinite; animation-delay: -0.5s; }
        .i04-rain-d { animation: i04-fall 0.9s linear infinite; animation-delay: -0.15s; }
        .i04-rain-e { animation: i04-fall 0.76s linear infinite; animation-delay: -0.55s; }
        .i04-rain-f { animation: i04-fall 0.68s linear infinite; animation-delay: -0.35s; }
        .i04-rain-g { animation: i04-fall 0.82s linear infinite; animation-delay: -0.6s; }
        .i04-rain-h { animation: i04-fall 0.6s linear infinite; animation-delay: -0.2s; }
        @keyframes i04-creep {
          0%, 100% { transform: translate(-26px, 0); opacity: 0.2; }
          50% { transform: translate(26px, -5px); opacity: 0.7; }
        }
        @keyframes i04-soar-a {
          0%, 100% { transform: translate(250px, 52px) rotate(-8deg); }
          50% { transform: translate(266px, 34px) rotate(8deg); }
        }
        @keyframes i04-soar-b {
          0%, 100% { transform: translate(300px, 34px) rotate(6deg); }
          50% { transform: translate(284px, 20px) rotate(-9deg); }
        }
        @keyframes i04-soar-c {
          0%, 100% { transform: translate(210px, 26px) rotate(5deg); }
          50% { transform: translate(226px, 14px) rotate(-6deg); }
        }
        @keyframes i04-flick {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(12deg); }
        }
        @keyframes i04-wave {
          0%, 100% { transform: skewY(-4deg) scaleX(1); }
          50% { transform: skewY(4deg) scaleX(0.93); }
        }
        @keyframes i04-lean {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes i04-tug {
          0%, 100% { transform: rotate(-14deg); }
          50% { transform: rotate(-38deg); }
        }
        @keyframes i04-flow {
          0% { transform: translate(70px, 0); opacity: 0; }
          22%, 74% { opacity: 0.9; }
          100% { transform: translate(-100px, 0); opacity: 0; }
        }
        @keyframes i04-row {
          0% { transform: translate(-40px, 190px); }
          50% { transform: translate(180px, 186px); }
          100% { transform: translate(430px, 190px); }
        }
        @keyframes i04-fall {
          0% { transform: translate(14px, -60px); opacity: 0; }
          18%, 82% { opacity: 0.55; }
          100% { transform: translate(-12px, 66px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .i04-wisp-a, .i04-wisp-b, .i04-kite-a, .i04-kite-b, .i04-kite-c,
          .i04-tail-a, .i04-tail-b, .i04-flag, .i04-flyer, .i04-arm,
          .i04-wave-a, .i04-wave-b, .i04-wave-c, .i04-boat,
          .i04-rain-a, .i04-rain-b, .i04-rain-c, .i04-rain-d,
          .i04-rain-e, .i04-rain-f, .i04-rain-g, .i04-rain-h { animation: none; }
        }
      `}</style>
    </svg>
  );
}
