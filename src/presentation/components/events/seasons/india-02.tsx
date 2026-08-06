/**
 * インド 6月 — モンスーン、ケーララに来る。
 *
 * 6月1日ごろ、雨が南の海岸に届く。海の側から雨の壁が押し寄せ、椰子がしなり、
 * 浜に上げた小舟に雨が叩きつける。3月からこれを待っていた。
 */
export function India02() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空 */}
      <rect width="400" height="210" fill="#4f7078" />
      <rect width="400" height="52" fill="#37525c" />
      <g fill="#2b4049">
        <ellipse cx="60" cy="24" rx="66" ry="24" />
        <ellipse cx="176" cy="16" rx="74" ry="26" />
        <ellipse cx="300" cy="26" rx="68" ry="24" />
        <ellipse cx="392" cy="16" rx="46" ry="20" />
      </g>
      <g fill="#43616b">
        <ellipse cx="112" cy="46" rx="60" ry="16" />
        <ellipse cx="264" cy="50" rx="66" ry="17" />
        <ellipse cx="380" cy="44" rx="44" ry="14" />
      </g>

      {/* 海 */}
      <rect y="88" width="400" height="56" fill="#2f7a82" />
      <rect y="88" width="400" height="8" fill="#3f929a" />
      <g fill="#5aaab0">
        <rect className="keralaburst-swell-a" x="0" y="102" width="110" height="4" rx="2" />
        <rect className="keralaburst-swell-b" x="0" y="116" width="140" height="5" rx="2.5" />
        <rect className="keralaburst-swell-c" x="0" y="130" width="120" height="4" rx="2" />
      </g>
      <g fill="#d8eef0">
        <path className="keralaburst-surf" d="M-20,140 q26,-9 52,0 q26,9 52,0 q26,-9 52,0 q26,9 52,0 q26,-9 52,0 q26,9 52,0 q26,-9 52,0 L440,152 L-20,152z" />
      </g>

      {/* 浜 */}
      <rect y="144" width="400" height="30" fill="#d3bd93" />
      <rect y="144" width="400" height="5" fill="#c2aa7d" />
      <g fill="#b8a071" opacity="0.7">
        <ellipse cx="76" cy="164" rx="34" ry="7" />
        <ellipse cx="286" cy="168" rx="40" ry="7" />
      </g>

      {/* 緑の岸 */}
      <rect y="170" width="400" height="40" fill="#2f5138" />
      <rect y="170" width="400" height="6" fill="#3d6845" />
      <g fill="#3d6845">
        <ellipse cx="30" cy="182" rx="26" ry="10" />
        <ellipse cx="150" cy="188" rx="30" ry="11" />
        <ellipse cx="330" cy="184" rx="28" ry="10" />
      </g>

      {/* 浜に上げた小舟 */}
      <g transform="translate(180,164)">
        <path d="M-56,-6 C-46,10 40,10 54,-6 C40,-2 -42,-2 -56,-6z" fill="#7a5230" />
        <path d="M-56,-6 C-46,6 40,6 54,-6 C40,-3 -42,-3 -56,-6z" fill="#94663c" />
        <path d="M-56,-6 q-10,-6 -14,-14 q10,2 16,10z" fill="#7a5230" />
        <path d="M54,-6 q10,-6 14,-14 q-10,2 -16,10z" fill="#7a5230" />
        <rect x="-30" y="-6" width="6" height="6" fill="#5f3d22" />
        <rect x="10" y="-6" width="6" height="6" fill="#5f3d22" />
        <path d="M-20,-8 L38,-40" stroke="#5f3d22" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>

      {/* 椰子の木 */}
      <g transform="translate(56,176) scale(-1,1)">
        <g className="keralaburst-palm-a">
          <path d="M-5,0 L5,0 C2,-28 -4,-52 -14,-72 L-24,-67 C-13,-48 -7,-26 -5,0z" fill="#8a6a48" />
          <g transform="translate(-19,-70)">
            <g className="keralaburst-crown-a">
              <g transform="rotate(-28)"><path d="M0,0 C14,-10 34,-12 50,-4 C34,-1 14,6 0,2z" fill="#2f7a4a" /></g>
              <g transform="rotate(16)"><path d="M0,0 C14,-10 34,-12 50,-4 C34,-1 14,6 0,2z" fill="#256a3e" /></g>
              <g transform="rotate(-72)"><path d="M0,0 C13,-9 30,-11 44,-4 C30,-1 12,5 0,2z" fill="#2f7a4a" /></g>
              <g transform="rotate(-118)"><path d="M0,0 C14,-10 34,-12 50,-4 C34,-1 14,6 0,2z" fill="#256a3e" /></g>
              <g transform="rotate(-154)"><path d="M0,0 C13,-9 30,-11 44,-4 C30,-1 12,5 0,2z" fill="#2f7a4a" /></g>
              <g transform="rotate(164)"><path d="M0,0 C14,-10 34,-12 50,-4 C34,-1 14,6 0,2z" fill="#256a3e" /></g>
              <circle cx="2" cy="6" r="4.5" fill="#6b4630" />
              <circle cx="-6" cy="8" r="4" fill="#7d543a" />
            </g>
          </g>
        </g>
      </g>
      <g transform="translate(306,192) scale(-1,1)">
        <g className="keralaburst-palm-b">
          <path d="M-6,0 L6,0 C3,-34 -5,-62 -18,-88 L-30,-82 C-16,-58 -8,-32 -6,0z" fill="#8a6a48" />
          <g transform="translate(-24,-85)">
            <g className="keralaburst-crown-b">
              <g transform="rotate(-24)"><path d="M0,0 C16,-12 40,-14 58,-5 C40,-1 16,7 0,2z" fill="#2f7a4a" /></g>
              <g transform="rotate(20)"><path d="M0,0 C16,-12 40,-14 58,-5 C40,-1 16,7 0,2z" fill="#256a3e" /></g>
              <g transform="rotate(-68)"><path d="M0,0 C15,-11 36,-13 52,-5 C36,-1 14,6 0,2z" fill="#2f7a4a" /></g>
              <g transform="rotate(-114)"><path d="M0,0 C16,-12 40,-14 58,-5 C40,-1 16,7 0,2z" fill="#256a3e" /></g>
              <g transform="rotate(-150)"><path d="M0,0 C15,-11 36,-13 52,-5 C36,-1 14,6 0,2z" fill="#2f7a4a" /></g>
              <g transform="rotate(160)"><path d="M0,0 C16,-12 40,-14 58,-5 C40,-1 16,7 0,2z" fill="#256a3e" /></g>
              <circle cx="3" cy="7" r="5.5" fill="#6b4630" />
              <circle cx="-7" cy="10" r="5" fill="#7d543a" />
            </g>
          </g>
        </g>
      </g>
      <g transform="translate(370,180) scale(-1,1)">
        <g className="keralaburst-palm-c">
          <path d="M-5,0 L5,0 C2,-26 -3,-48 -12,-66 L-22,-61 C-12,-44 -7,-24 -5,0z" fill="#7a5c3e" />
          <g transform="translate(-17,-64)">
            <g className="keralaburst-crown-c">
              <g transform="rotate(-30)"><path d="M0,0 C12,-9 30,-11 44,-4 C30,-1 11,5 0,2z" fill="#256a3e" /></g>
              <g transform="rotate(14)"><path d="M0,0 C12,-9 30,-11 44,-4 C30,-1 11,5 0,2z" fill="#1f5a35" /></g>
              <g transform="rotate(-74)"><path d="M0,0 C11,-8 27,-10 40,-4 C27,-1 10,5 0,2z" fill="#256a3e" /></g>
              <g transform="rotate(-120)"><path d="M0,0 C12,-9 30,-11 44,-4 C30,-1 11,5 0,2z" fill="#1f5a35" /></g>
              <g transform="rotate(-156)"><path d="M0,0 C11,-8 27,-10 40,-4 C27,-1 10,5 0,2z" fill="#256a3e" /></g>
              <g transform="rotate(166)"><path d="M0,0 C12,-9 30,-11 44,-4 C30,-1 11,5 0,2z" fill="#1f5a35" /></g>
            </g>
          </g>
        </g>
      </g>

      {/* 海から押し寄せる雨の壁 */}
      <g className="keralaburst-wall" fill="#dceaee">
        <rect x="-260" y="0" width="66" height="180" opacity="0.05" />
        <rect x="-194" y="0" width="66" height="180" opacity="0.08" />
        <rect x="-128" y="0" width="66" height="180" opacity="0.11" />
        <rect x="-62" y="0" width="62" height="180" opacity="0.14" />
      </g>

      {/* 叩きつける雨 */}
      <g stroke="#d8eef0" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.6">
        <path className="keralaburst-rain-a" d="M18,6 l9,26" />
        <path className="keralaburst-rain-b" d="M54,58 l9,26" />
        <path className="keralaburst-rain-c" d="M92,2 l9,26" />
        <path className="keralaburst-rain-d" d="M128,80 l9,26" />
        <path className="keralaburst-rain-e" d="M164,28 l9,26" />
        <path className="keralaburst-rain-f" d="M198,110 l9,26" />
        <path className="keralaburst-rain-g" d="M236,44 l9,26" />
        <path className="keralaburst-rain-h" d="M270,136 l9,26" />
        <path className="keralaburst-rain-i" d="M308,14 l9,26" />
        <path className="keralaburst-rain-j" d="M344,92 l9,26" />
        <path className="keralaburst-rain-k" d="M380,36 l9,26" />
        <path className="keralaburst-rain-l" d="M36,150 l9,26" />
        <path className="keralaburst-rain-m" d="M148,178 l9,26" />
        <path className="keralaburst-rain-n" d="M292,70 l9,26" />
        <path className="keralaburst-rain-o" d="M72,112 l9,26" />
        <path className="keralaburst-rain-p" d="M216,164 l9,26" />
        <path className="keralaburst-rain-q" d="M356,158 l9,26" />
      </g>

      {/* 跳ねる雨 */}
      <g fill="none" stroke="#e8f4f6" strokeWidth="2.2">
        <ellipse className="keralaburst-splash-a" cx="106" cy="120" rx="14" ry="4" />
        <ellipse className="keralaburst-splash-b" cx="256" cy="128" rx="14" ry="4" />
        <ellipse className="keralaburst-splash-c" cx="70" cy="162" rx="14" ry="4" />
        <ellipse className="keralaburst-splash-d" cx="290" cy="166" rx="14" ry="4" />
        <ellipse className="keralaburst-splash-e" cx="180" cy="112" rx="14" ry="4" />
      </g>

      <style>{`
        .keralaburst-palm-a, .keralaburst-palm-b, .keralaburst-palm-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .keralaburst-palm-a { animation: keralaburst-bend 2.4s ease-in-out infinite; }
        .keralaburst-palm-b { animation: keralaburst-bend 2.9s ease-in-out infinite; animation-delay: -0.9s; }
        .keralaburst-palm-c { animation: keralaburst-bend 2.1s ease-in-out infinite; animation-delay: -1.5s; }
        .keralaburst-crown-a, .keralaburst-crown-b, .keralaburst-crown-c {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .keralaburst-crown-a { animation: keralaburst-whip 1.2s ease-in-out infinite; }
        .keralaburst-crown-b { animation: keralaburst-whip 1.45s ease-in-out infinite; animation-delay: -0.5s; }
        .keralaburst-crown-c { animation: keralaburst-whip 1.05s ease-in-out infinite; animation-delay: -0.8s; }
        .keralaburst-wall { animation: keralaburst-sweep 7s linear infinite; }
        .keralaburst-swell-a { animation: keralaburst-roll 4.6s linear infinite; }
        .keralaburst-swell-b { animation: keralaburst-roll 5.8s linear infinite; animation-delay: -2.2s; }
        .keralaburst-swell-c { animation: keralaburst-roll 5.2s linear infinite; animation-delay: -3.6s; }
        .keralaburst-surf { animation: keralaburst-wash 3.2s ease-in-out infinite; }
        .keralaburst-splash-a, .keralaburst-splash-b, .keralaburst-splash-c,
        .keralaburst-splash-d, .keralaburst-splash-e {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: keralaburst-burst 1.3s ease-out infinite;
        }
        .keralaburst-splash-b { animation-delay: -0.3s; }
        .keralaburst-splash-c { animation-delay: -0.6s; }
        .keralaburst-splash-d { animation-delay: -0.9s; }
        .keralaburst-splash-e { animation-delay: -1.1s; }
        .keralaburst-rain-a { animation: keralaburst-fall 0.52s linear infinite; }
        .keralaburst-rain-b { animation: keralaburst-fall 0.64s linear infinite; animation-delay: -0.2s; }
        .keralaburst-rain-c { animation: keralaburst-fall 0.46s linear infinite; animation-delay: -0.35s; }
        .keralaburst-rain-d { animation: keralaburst-fall 0.7s linear infinite; animation-delay: -0.1s; }
        .keralaburst-rain-e { animation: keralaburst-fall 0.56s linear infinite; animation-delay: -0.45s; }
        .keralaburst-rain-f { animation: keralaburst-fall 0.5s linear infinite; animation-delay: -0.15s; }
        .keralaburst-rain-g { animation: keralaburst-fall 0.66s linear infinite; animation-delay: -0.3s; }
        .keralaburst-rain-h { animation: keralaburst-fall 0.44s linear infinite; animation-delay: -0.25s; }
        .keralaburst-rain-i { animation: keralaburst-fall 0.6s linear infinite; animation-delay: -0.4s; }
        .keralaburst-rain-j { animation: keralaburst-fall 0.54s linear infinite; animation-delay: -0.05s; }
        .keralaburst-rain-k { animation: keralaburst-fall 0.68s linear infinite; animation-delay: -0.5s; }
        .keralaburst-rain-l { animation: keralaburst-fall 0.48s linear infinite; animation-delay: -0.22s; }
        .keralaburst-rain-m { animation: keralaburst-fall 0.62s linear infinite; animation-delay: -0.38s; }
        .keralaburst-rain-n { animation: keralaburst-fall 0.58s linear infinite; animation-delay: -0.12s; }
        .keralaburst-rain-o { animation: keralaburst-fall 0.42s linear infinite; animation-delay: -0.28s; }
        .keralaburst-rain-p { animation: keralaburst-fall 0.72s linear infinite; animation-delay: -0.48s; }
        .keralaburst-rain-q { animation: keralaburst-fall 0.5s linear infinite; animation-delay: -0.18s; }
        @keyframes keralaburst-bend {
          0%, 100% { transform: skewX(3deg) rotate(1deg); }
          50% { transform: skewX(-9deg) rotate(-4deg); }
        }
        @keyframes keralaburst-whip {
          0%, 100% { transform: rotate(5deg) scaleY(1); }
          50% { transform: rotate(-9deg) scaleY(0.9); }
        }
        @keyframes keralaburst-sweep {
          0% { transform: translateX(0); opacity: 0; }
          18%, 74% { opacity: 1; }
          100% { transform: translateX(680px); opacity: 0; }
        }
        @keyframes keralaburst-roll {
          0% { transform: translateX(400px); opacity: 0; }
          22%, 74% { opacity: 0.8; }
          100% { transform: translateX(-130px); opacity: 0; }
        }
        @keyframes keralaburst-wash {
          0%, 100% { transform: translate(-14px, 3px); }
          50% { transform: translate(14px, -3px); }
        }
        @keyframes keralaburst-burst {
          0% { transform: scale(0.2); opacity: 0.9; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes keralaburst-fall {
          0% { transform: translate(-28px, -72px); opacity: 0; }
          14% { opacity: 0.7; }
          86% { opacity: 0.7; }
          100% { transform: translate(24px, 82px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .keralaburst-palm-a, .keralaburst-palm-b, .keralaburst-palm-c,
          .keralaburst-crown-a, .keralaburst-crown-b, .keralaburst-crown-c,
          .keralaburst-wall,
          .keralaburst-swell-a, .keralaburst-swell-b, .keralaburst-swell-c,
          .keralaburst-surf,
          .keralaburst-splash-a, .keralaburst-splash-b, .keralaburst-splash-c,
          .keralaburst-splash-d, .keralaburst-splash-e,
          .keralaburst-rain-a, .keralaburst-rain-b, .keralaburst-rain-c, .keralaburst-rain-d,
          .keralaburst-rain-e, .keralaburst-rain-f, .keralaburst-rain-g, .keralaburst-rain-h,
          .keralaburst-rain-i, .keralaburst-rain-j, .keralaburst-rain-k, .keralaburst-rain-l,
          .keralaburst-rain-m, .keralaburst-rain-n, .keralaburst-rain-o, .keralaburst-rain-p,
          .keralaburst-rain-q { animation: none; }
        }
      `}</style>
    </svg>
  );
}
