/**
 * 7月 — スラソ(ボリビア低地を襲う南風の寒波)。
 *
 * パタゴニアから駆け上がってきた風が椰子をしならせ、雲を横に流す。
 * 牛は身を寄せあって白い息を吐き、家の煙突の煙は横なぎに飛ばされる。
 */
export function Bolivia03() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冷えこんだ空 */}
      <rect width="400" height="210" fill="#6f8299" />
      <rect y="58" width="400" height="34" fill="#7d8fa6" />
      <rect y="92" width="400" height="28" fill="#8d9db1" />

      {/* 走る雲 */}
      <g fill="#5a6b80">
        <g className="b03-cloud b03-cloud-a">
          <ellipse cx="90" cy="20" rx="62" ry="10" />
          <ellipse cx="128" cy="15" rx="34" ry="8" />
        </g>
        <g className="b03-cloud b03-cloud-b">
          <ellipse cx="250" cy="40" rx="54" ry="8" />
          <ellipse cx="282" cy="36" rx="28" ry="7" />
        </g>
        <g className="b03-cloud b03-cloud-c">
          <ellipse cx="330" cy="10" rx="70" ry="9" />
        </g>
      </g>

      {/* 風の筋 */}
      <g fill="#b3c2d2">
        <rect className="b03-streak b03-streak-a" x="0" y="0" width="66" height="3" rx="1.5" />
        <rect className="b03-streak b03-streak-b" x="0" y="0" width="44" height="2.4" rx="1.2" />
        <rect className="b03-streak b03-streak-c" x="0" y="0" width="80" height="3" rx="1.5" />
        <rect className="b03-streak b03-streak-d" x="0" y="0" width="52" height="2.4" rx="1.2" />
        <rect className="b03-streak b03-streak-e" x="0" y="0" width="72" height="3" rx="1.5" />
      </g>

      {/* 遠くの林 */}
      <g fill="#4f6353">
        <ellipse cx="30" cy="118" rx="34" ry="10" />
        <ellipse cx="96" cy="119" rx="28" ry="9" />
        <ellipse cx="168" cy="118" rx="36" ry="10" />
        <ellipse cx="238" cy="119" rx="26" ry="8" />
      </g>

      {/* 草原 */}
      <rect y="120" width="400" height="90" fill="#7f8f62" />
      <rect y="148" width="400" height="62" fill="#728253" />
      <rect y="180" width="400" height="30" fill="#647349" />

      {/* 煙突の煙が横なぎになる家 */}
      <g>
        <path d="M286,116 L322,92 L358,116 Z" fill="#8a4a3f" />
        <rect x="292" y="116" width="60" height="30" fill="#d8cdb4" />
        <rect x="302" y="124" width="14" height="12" fill="#4a5f7a" />
        <rect x="328" y="124" width="14" height="22" fill="#6b4a33" />
        <rect x="336" y="82" width="10" height="18" fill="#8a4a3f" />
      </g>
      <g fill="#c6cfd9">
        <ellipse className="b03-smoke b03-smoke-a" cx="0" cy="0" rx="9" ry="7" />
        <ellipse className="b03-smoke b03-smoke-b" cx="0" cy="0" rx="8" ry="6" />
        <ellipse className="b03-smoke b03-smoke-c" cx="0" cy="0" rx="10" ry="7" />
      </g>

      {/* しなる椰子(左) */}
      <g transform="translate(28,0)">
      <g className="b03-palm b03-palm-a">
        <path d="M52,176 C48,146 40,116 20,94 L32,88 C50,112 58,144 62,176 Z" fill="#6b4a33" />
        <g fill="#4f7a4a">
          <path d="M26,92 C4,82 -10,84 -22,92 C-6,80 10,76 26,86 Z" />
          <path d="M26,92 C6,96 -6,106 -14,118 C-6,100 6,90 26,86 Z" />
          <path d="M26,92 C10,70 -4,60 -18,56 C2,58 18,70 28,86 Z" />
          <path d="M26,92 C36,78 44,70 56,64 C44,76 36,84 30,94 Z" />
        </g>
        <g fill="#3f6a3c">
          <path d="M26,92 C8,88 -6,94 -18,104 C-4,88 10,84 26,86 Z" />
          <path d="M26,92 C14,76 4,66 -10,60 C8,66 22,76 28,88 Z" />
        </g>
        <circle cx="27" cy="90" r="6" fill="#5f4028" />
      </g>
      </g>

      {/* しなる椰子(右) */}
      <g className="b03-palm b03-palm-b">
        <path d="M364,164 C362,142 356,120 342,104 L352,99 C366,118 372,142 373,164 Z" fill="#6b4a33" />
        <g fill="#4f7a4a">
          <path d="M347,103 C330,95 318,96 308,102 C320,92 334,89 347,98 Z" />
          <path d="M347,103 C332,107 322,115 316,124 C322,109 332,101 347,98 Z" />
          <path d="M347,103 C334,86 322,79 310,76 C326,78 339,87 348,98 Z" />
          <path d="M347,103 C356,92 363,86 373,82 C363,91 356,97 351,104 Z" />
        </g>
        <circle cx="348" cy="101" r="5" fill="#5f4028" />
      </g>

      {/* 身を寄せあう牛 */}
      <g className="b03-herd">
        <g transform="translate(196,172)">
        <g className="b03-cow b03-cow-a">
          <rect x="-20" y="-6" width="6" height="16" rx="2" fill="#5a3d28" />
          <rect x="12" y="-6" width="6" height="16" rx="2" fill="#5a3d28" />
          <rect x="-24" y="-30" width="48" height="26" rx="10" fill="#7d5238" />
          <ellipse cx="4" cy="-24" rx="10" ry="7" fill="#e0d5c2" />
          <path d="M24,-26 C32,-30 34,-22 30,-14" stroke="#5a3d28" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="-30" cy="-20" rx="11" ry="9" fill="#7d5238" />
          <ellipse cx="-38" cy="-16" rx="6" ry="5" fill="#e0d5c2" />
          <path d="M-34,-28 C-40,-34 -46,-32 -48,-28" stroke="#4a3222" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M-26,-28 C-24,-36 -18,-38 -14,-34" stroke="#4a3222" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="-34" cy="-21" r="1.8" fill="#2b2436" />
        </g>
        </g>
        <g transform="translate(150,180)">
        <g className="b03-cow b03-cow-b">
          <rect x="-22" y="-6" width="7" height="18" rx="2.5" fill="#4a3222" />
          <rect x="13" y="-6" width="7" height="18" rx="2.5" fill="#4a3222" />
          <rect x="-26" y="-32" width="52" height="28" rx="11" fill="#8a5f3f" />
          <ellipse cx="-6" cy="-26" rx="11" ry="8" fill="#efe6d6" />
          <ellipse cx="12" cy="-14" rx="8" ry="6" fill="#efe6d6" />
          <path d="M26,-28 C35,-32 37,-23 32,-14" stroke="#4a3222" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <ellipse cx="-33" cy="-21" rx="12" ry="10" fill="#8a5f3f" />
          <ellipse cx="-42" cy="-17" rx="7" ry="5.6" fill="#efe6d6" />
          <path d="M-37,-30 C-44,-37 -50,-35 -53,-30" stroke="#3f2a1c" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M-28,-30 C-26,-39 -19,-41 -15,-36" stroke="#3f2a1c" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <circle cx="-38" cy="-22" r="2" fill="#2b2436" />
        </g>
        </g>
        <g transform="translate(240,186)">
        <g className="b03-cow b03-cow-c">
          <rect x="-24" y="-6" width="8" height="20" rx="3" fill="#5a3d28" />
          <rect x="14" y="-6" width="8" height="20" rx="3" fill="#5a3d28" />
          <rect x="-28" y="-34" width="56" height="30" rx="12" fill="#9c6a45" />
          <ellipse cx="-4" cy="-28" rx="12" ry="9" fill="#efe6d6" />
          <ellipse cx="16" cy="-14" rx="9" ry="6" fill="#efe6d6" />
          <path d="M28,-30 C38,-34 40,-24 34,-14" stroke="#5a3d28" strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <ellipse cx="-36" cy="-22" rx="13" ry="10.5" fill="#9c6a45" />
          <ellipse cx="-46" cy="-18" rx="7.5" ry="6" fill="#efe6d6" />
          <path d="M-40,-32 C-48,-39 -54,-37 -57,-32" stroke="#4a3222" strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <path d="M-30,-32 C-28,-41 -21,-43 -17,-38" stroke="#4a3222" strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <circle cx="-42" cy="-23" r="2.2" fill="#2b2436" />
        </g>
        </g>
      </g>

      {/* 牛の白い息 */}
      <g fill="#e4ebf2">
        <ellipse className="b03-breath b03-breath-a" cx="0" cy="0" rx="7" ry="5" />
        <ellipse className="b03-breath b03-breath-b" cx="0" cy="0" rx="6" ry="4.4" />
        <ellipse className="b03-breath b03-breath-c" cx="0" cy="0" rx="8" ry="5.4" />
      </g>

      {/* なぎ倒される草 */}
      <g stroke="#9fb073" strokeWidth="3" fill="none" strokeLinecap="round">
        <path className="b03-grass b03-grass-a" d="M50,208 C46,194 38,186 28,182" />
        <path className="b03-grass b03-grass-b" d="M110,206 C106,194 98,188 88,184" />
        <path className="b03-grass b03-grass-c" d="M196,209 C192,196 184,188 172,184" />
        <path className="b03-grass b03-grass-d" d="M292,207 C288,194 280,187 268,183" />
        <path className="b03-grass b03-grass-e" d="M356,209 C352,196 344,189 332,185" />
      </g>

      {/* 飛ばされる葉 */}
      <g fill="#4f7a4a">
        <ellipse className="b03-leaf b03-leaf-a" cx="0" cy="0" rx="6" ry="3" />
        <ellipse className="b03-leaf b03-leaf-b" cx="0" cy="0" rx="5" ry="2.6" />
        <ellipse className="b03-leaf b03-leaf-c" cx="0" cy="0" rx="7" ry="3.2" />
      </g>

      <style>{`
        .b03-cloud-a { animation: b03-race 7s linear infinite; }
        .b03-cloud-b { animation: b03-race 9s linear -4s infinite; }
        .b03-cloud-c { animation: b03-race 6s linear -2s infinite; }
        .b03-streak-a { transform: translate(180px, 34px); animation: b03-gust-a 1.5s linear infinite; }
        .b03-streak-b { transform: translate(240px, 66px); animation: b03-gust-b 1.9s linear -0.6s infinite; }
        .b03-streak-c { transform: translate(120px, 100px); animation: b03-gust-c 1.3s linear -0.3s infinite; }
        .b03-streak-d { transform: translate(300px, 140px); animation: b03-gust-d 1.7s linear -1s infinite; }
        .b03-streak-e { transform: translate(60px, 164px); animation: b03-gust-e 1.6s linear -0.9s infinite; }
        .b03-smoke-a { transform: translate(320px, 78px); animation: b03-blow 2.6s linear infinite; }
        .b03-smoke-b { transform: translate(280px, 74px); animation: b03-blow-b 2.6s linear -0.9s infinite; }
        .b03-smoke-c { transform: translate(240px, 82px); animation: b03-blow-c 2.6s linear -1.8s infinite; }
        .b03-palm { transform-box: fill-box; }
        .b03-palm-a { transform-origin: 94% 100%; animation: b03-whip 2.8s ease-in-out infinite; }
        .b03-palm-b { transform-origin: 92% 100%; animation: b03-whip 2.8s ease-in-out -0.7s infinite; }
        .b03-cow { transform-box: fill-box; transform-origin: 50% 100%; }
        .b03-cow-a { animation: b03-shiver 0.45s ease-in-out infinite; }
        .b03-cow-b { animation: b03-shiver 0.4s ease-in-out -0.15s infinite; }
        .b03-cow-c { animation: b03-shiver 0.5s ease-in-out -0.25s infinite; }
        .b03-breath-a { transform: translate(140px, 158px); animation: b03-snort-a 3.2s ease-out infinite; }
        .b03-breath-b { transform: translate(90px, 164px); animation: b03-snort-b 3.6s ease-out -1.6s infinite; }
        .b03-breath-c { transform: translate(178px, 168px); animation: b03-snort-c 4s ease-out -2.6s infinite; }
        .b03-grass { transform-box: fill-box; transform-origin: 100% 100%; }
        .b03-grass-a { animation: b03-bend 1.8s ease-in-out infinite; }
        .b03-grass-b { animation: b03-bend 1.8s ease-in-out -0.4s infinite; }
        .b03-grass-c { animation: b03-bend 1.8s ease-in-out -0.8s infinite; }
        .b03-grass-d { animation: b03-bend 1.8s ease-in-out -1.2s infinite; }
        .b03-grass-e { animation: b03-bend 1.8s ease-in-out -1.5s infinite; }
        .b03-leaf { transform-box: fill-box; transform-origin: 50% 50%; }
        .b03-leaf-a { transform: translate(240px, 130px); animation: b03-fly-a 3.4s linear infinite; }
        .b03-leaf-b { transform: translate(160px, 96px); animation: b03-fly-b 4.2s linear -2s infinite; }
        .b03-leaf-c { transform: translate(300px, 158px); animation: b03-fly-c 3.8s linear -1.2s infinite; }
        @keyframes b03-race {
          from { transform: translateX(190px); }
          to { transform: translateX(-330px); }
        }
        @keyframes b03-gust-a {
          from { transform: translate(420px, 34px); }
          to { transform: translate(-90px, 30px); }
        }
        @keyframes b03-gust-b {
          from { transform: translate(420px, 66px); }
          to { transform: translate(-70px, 60px); }
        }
        @keyframes b03-gust-c {
          from { transform: translate(420px, 100px); }
          to { transform: translate(-100px, 96px); }
        }
        @keyframes b03-gust-d {
          from { transform: translate(420px, 140px); }
          to { transform: translate(-80px, 136px); }
        }
        @keyframes b03-gust-e {
          from { transform: translate(420px, 168px); }
          to { transform: translate(-90px, 164px); }
        }
        @keyframes b03-blow {
          0% { transform: translate(336px, 80px) scale(0.35); opacity: 0; }
          15% { opacity: 0.9; }
          100% { transform: translate(212px, 62px) scale(1.7); opacity: 0; }
        }
        @keyframes b03-blow-b {
          0% { transform: translate(336px, 80px) scale(0.35); opacity: 0; }
          15% { opacity: 0.9; }
          100% { transform: translate(206px, 68px) scale(1.7); opacity: 0; }
        }
        @keyframes b03-blow-c {
          0% { transform: translate(336px, 80px) scale(0.35); opacity: 0; }
          15% { opacity: 0.9; }
          100% { transform: translate(218px, 56px) scale(1.7); opacity: 0; }
        }
        @keyframes b03-whip {
          0%, 100% { transform: rotate(3deg) skewX(2deg); }
          50% { transform: rotate(-5deg) skewX(-4deg); }
        }
        @keyframes b03-shiver {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-1.4px, -1px); }
        }
        @keyframes b03-snort-a {
          0% { transform: translate(146px, 158px) scale(0.3); opacity: 0; }
          20% { opacity: 0.85; }
          100% { transform: translate(96px, 144px) scale(1.5); opacity: 0; }
        }
        @keyframes b03-snort-b {
          0% { transform: translate(100px, 164px) scale(0.3); opacity: 0; }
          20% { opacity: 0.85; }
          100% { transform: translate(50px, 150px) scale(1.5); opacity: 0; }
        }
        @keyframes b03-snort-c {
          0% { transform: translate(190px, 168px) scale(0.3); opacity: 0; }
          20% { opacity: 0.85; }
          100% { transform: translate(140px, 154px) scale(1.5); opacity: 0; }
        }
        @keyframes b03-bend {
          0%, 100% { transform: skewX(0deg) rotate(0deg); }
          50% { transform: skewX(-10deg) rotate(-6deg); }
        }
        @keyframes b03-fly-a {
          from { transform: translate(420px, 128px) rotate(0deg); }
          to { transform: translate(-40px, 152px) rotate(-720deg); }
        }
        @keyframes b03-fly-b {
          from { transform: translate(420px, 84px) rotate(0deg); }
          to { transform: translate(-40px, 116px) rotate(640deg); }
        }
        @keyframes b03-fly-c {
          from { transform: translate(420px, 166px) rotate(0deg); }
          to { transform: translate(-40px, 148px) rotate(-580deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .b03-cloud-a, .b03-cloud-b, .b03-cloud-c,
          .b03-streak-a, .b03-streak-b, .b03-streak-c, .b03-streak-d, .b03-streak-e,
          .b03-smoke-a, .b03-smoke-b, .b03-smoke-c,
          .b03-palm-a, .b03-palm-b,
          .b03-cow-a, .b03-cow-b, .b03-cow-c,
          .b03-breath-a, .b03-breath-b, .b03-breath-c,
          .b03-grass-a, .b03-grass-b, .b03-grass-c, .b03-grass-d, .b03-grass-e,
          .b03-leaf-a, .b03-leaf-b, .b03-leaf-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
