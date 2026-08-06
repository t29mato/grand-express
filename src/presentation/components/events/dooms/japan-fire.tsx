/**
 * 木造街区の火事。
 *
 * 紙と杉でできた町では火鉢ひとつで足りる。屋根から炎と黒煙が上がり、
 * 火の粉が舞い、住人は桶を提げて逃げ出す。
 */
export function JapanFire() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の町。火事の照り返しで空がにじむ */}
      <rect width="400" height="210" fill="#1d1a2b" />
      <g className="jf-glow" fill="#7a3320">
        <ellipse cx="196" cy="164" rx="266" ry="170" opacity="0.2" />
        <ellipse cx="196" cy="150" rx="132" ry="96" opacity="0.18" />
      </g>

      {/* 立ちのぼる黒煙 */}
      <g fill="#443f55">
        <ellipse className="jf-smoke-a" cx="196" cy="70" rx="20" ry="15" />
        <ellipse className="jf-smoke-b" cx="184" cy="70" rx="17" ry="13" />
        <ellipse className="jf-smoke-c" cx="210" cy="70" rx="22" ry="16" />
        <ellipse className="jf-smoke-d" cx="200" cy="70" rx="15" ry="12" />
      </g>

      {/* 隣の町家 */}
      <g>
        <rect x="16" y="112" width="104" height="60" fill="#4a3527" />
        <path d="M6,112 L26,96 L110,96 L130,112 z" fill="#3a4450" />
        <path d="M6,112 L130,112 L130,117 L6,117 z" fill="#2b3541" />
        <rect x="28" y="124" width="34" height="26" fill="#2b1f18" />
        <g stroke="#6b4b32" strokeWidth="2">
          <path d="M34,124 L34,150 M42,124 L42,150 M50,124 L50,150 M58,124 L58,150" />
        </g>
        <rect x="76" y="124" width="30" height="48" fill="#2b1f18" />
      </g>
      <g>
        <rect x="280" y="116" width="106" height="56" fill="#4a3527" />
        <path d="M270,116 L290,100 L376,100 L396,116 z" fill="#3a4450" />
        <path d="M270,116 L396,116 L396,121 L270,121 z" fill="#2b3541" />
        <rect x="292" y="128" width="34" height="24" fill="#2b1f18" />
        <g stroke="#6b4b32" strokeWidth="2">
          <path d="M298,128 L298,152 M306,128 L306,152 M314,128 L314,152 M322,128 L322,152" />
        </g>
        <rect x="342" y="128" width="30" height="44" fill="#2b1f18" />
      </g>

      {/* 燃えている町家 */}
      <g>
        <rect x="128" y="106" width="140" height="66" fill="#4a3527" />
        <path d="M118,106 L140,88 L256,88 L278,106 z" fill="#3a4450" />
        <path d="M118,106 L278,106 L278,111 L118,111 z" fill="#2b3541" />
        <rect x="146" y="120" width="42" height="30" fill="#f5b31c" />
        <rect className="jf-window-a" x="146" y="120" width="42" height="30" fill="#ffe9b0" />
        <g stroke="#7a3320" strokeWidth="2.5">
          <path d="M154,120 L154,150 M164,120 L164,150 M174,120 L174,150 M184,120 L184,150" />
        </g>
        <rect x="212" y="122" width="36" height="50" fill="#f5b31c" />
        <rect className="jf-window-b" x="212" y="122" width="36" height="50" fill="#ffe9b0" />
      </g>

      {/* 屋根を突き抜ける炎 */}
      <g className="jf-flames">
        <g className="jf-flame-a">
          <path d="M170,96 C152,74 162,50 170,32 C182,52 190,74 170,96 z" fill="#e05252" />
          <path d="M170,96 C160,80 166,62 170,50 C178,64 180,82 170,96 z" fill="#f5b31c" />
        </g>
        <g className="jf-flame-b">
          <path d="M226,98 C206,74 218,48 226,28 C240,50 248,76 226,98 z" fill="#e05252" />
          <path d="M226,98 C214,80 222,58 226,44 C236,60 240,82 226,98 z" fill="#f5b31c" />
          <path d="M226,98 C220,84 224,68 226,60 C232,72 232,86 226,98 z" fill="#ffe9b0" />
        </g>
        <g className="jf-flame-c">
          <path d="M198,100 C182,80 190,58 198,42 C210,60 216,82 198,100 z" fill="#e05252" />
          <path d="M198,100 C190,84 194,66 198,56 C206,70 208,86 198,100 z" fill="#f5b31c" />
        </g>
      </g>

      {/* 舞う火の粉 */}
      <g fill="#ffd166">
        <circle className="jf-spark-a" cx="0" cy="0" r="4" />
        <circle className="jf-spark-b" cx="0" cy="0" r="3.5" />
        <circle className="jf-spark-c" cx="0" cy="0" r="4.5" />
        <circle className="jf-spark-d" cx="0" cy="0" r="3" />
        <circle className="jf-spark-e" cx="0" cy="0" r="4" />
      </g>

      {/* 通り */}
      <rect y="172" width="400" height="38" fill="#2b2436" />
      <rect y="172" width="400" height="3" fill="#3b3149" />

      {/* 桶を提げて逃げる人 */}
      <g className="jf-runner-a" fill="#16121f">
        <circle cx="0" cy="-38" r="11" />
        <path d="M-13,0 q1,-28 13,-28 q12,0 13,28 z" />
        <rect className="jf-leg-a1" x="-9" y="-4" width="7" height="18" rx="3" />
        <rect className="jf-leg-a2" x="3" y="-4" width="7" height="18" rx="3" />
        <rect x="-25" y="-25" width="15" height="6" rx="3" transform="rotate(-16 -17 -22)" />
        <path d="M-35,-19 L-17,-19 L-20,-4 L-32,-4 z" fill="#6b4b32" />
      </g>
      <g className="jf-runner-b" fill="#16121f">
        <circle cx="0" cy="-34" r="10" />
        <path d="M-12,0 q1,-26 12,-26 q11,0 12,26 z" />
        <rect className="jf-leg-b1" x="-8" y="-4" width="6" height="16" rx="3" />
        <rect className="jf-leg-b2" x="3" y="-4" width="6" height="16" rx="3" />
        <rect x="-22" y="-38" width="13" height="6" rx="3" transform="rotate(-34 -15 -35)" />
        <rect x="-33" y="-50" width="19" height="13" rx="3" fill="#6b4b32" />
      </g>

      <style>{`
        .jf-glow { animation: jf-breathe 2.4s ease-in-out infinite; }
        .jf-smoke-a { animation: jf-rise 3.6s ease-out infinite; }
        .jf-smoke-b { animation: jf-rise 4.4s ease-out infinite; animation-delay: -1.1s; }
        .jf-smoke-c { animation: jf-rise 4s ease-out infinite; animation-delay: -2.2s; }
        .jf-smoke-d { animation: jf-rise 3.2s ease-out infinite; animation-delay: -2.8s; }
        .jf-window-a { animation: jf-flicker 0.7s steps(1, end) infinite; }
        .jf-window-b { animation: jf-flicker 0.9s steps(1, end) infinite; animation-delay: -0.4s; }
        .jf-flame-a {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jf-lick 0.9s ease-in-out infinite;
        }
        .jf-flame-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jf-lick 1.1s ease-in-out infinite;
          animation-delay: -0.4s;
        }
        .jf-flame-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jf-lick 0.78s ease-in-out infinite;
          animation-delay: -0.6s;
        }
        .jf-spark-a { transform: translate(180px, 60px); animation: jf-fly-a 2.6s linear infinite; }
        .jf-spark-b { transform: translate(210px, 60px); animation: jf-fly-b 3.2s linear infinite; animation-delay: -1s; }
        .jf-spark-c { transform: translate(196px, 60px); animation: jf-fly-c 2.9s linear infinite; animation-delay: -1.8s; }
        .jf-spark-d { transform: translate(226px, 60px); animation: jf-fly-a 3.4s linear infinite; animation-delay: -2.4s; }
        .jf-spark-e { transform: translate(168px, 60px); animation: jf-fly-b 2.4s linear infinite; animation-delay: -0.6s; }
        .jf-runner-a { transform: translate(84px, 200px); animation: jf-flee-a 3.4s linear infinite; }
        .jf-runner-b { transform: translate(150px, 194px); animation: jf-flee-b 3.4s linear infinite; animation-delay: -1.7s; }
        .jf-leg-a1 { transform-box: fill-box; transform-origin: 50% 0; animation: jf-stride 0.34s linear infinite; }
        .jf-leg-a2 { transform-box: fill-box; transform-origin: 50% 0; animation: jf-stride 0.34s linear infinite reverse; }
        .jf-leg-b1 { transform-box: fill-box; transform-origin: 50% 0; animation: jf-stride 0.3s linear infinite; }
        .jf-leg-b2 { transform-box: fill-box; transform-origin: 50% 0; animation: jf-stride 0.3s linear infinite reverse; }
        @keyframes jf-breathe {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes jf-rise {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          18% { opacity: 0.9; }
          100% { transform: translate(-34px, -78px) scale(1.7); opacity: 0; }
        }
        @keyframes jf-flicker {
          0%, 62% { opacity: 0.85; }
          63%, 100% { opacity: 0.15; }
        }
        @keyframes jf-lick {
          0%, 100% { transform: scale(1, 1) skewX(0deg); }
          35% { transform: scale(0.86, 1.16) skewX(-7deg); }
          70% { transform: scale(1.1, 0.9) skewX(6deg); }
        }
        @keyframes jf-fly-a {
          0% { transform: translate(180px, 96px) scale(1); opacity: 0; }
          14% { opacity: 1; }
          100% { transform: translate(232px, 4px) scale(0.4); opacity: 0; }
        }
        @keyframes jf-fly-b {
          0% { transform: translate(210px, 92px) scale(1); opacity: 0; }
          14% { opacity: 1; }
          100% { transform: translate(154px, 8px) scale(0.4); opacity: 0; }
        }
        @keyframes jf-fly-c {
          0% { transform: translate(196px, 98px) scale(1); opacity: 0; }
          14% { opacity: 1; }
          100% { transform: translate(268px, 20px) scale(0.4); opacity: 0; }
        }
        @keyframes jf-flee-a {
          0% { transform: translate(176px, 200px); }
          100% { transform: translate(-40px, 200px); }
        }
        @keyframes jf-flee-b {
          0% { transform: translate(200px, 194px); }
          100% { transform: translate(-30px, 194px); }
        }
        @keyframes jf-stride {
          0%, 100% { transform: rotate(26deg); }
          50% { transform: rotate(-26deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jf-glow, .jf-smoke-a, .jf-smoke-b, .jf-smoke-c, .jf-smoke-d,
          .jf-window-a, .jf-window-b, .jf-flame-a, .jf-flame-b, .jf-flame-c,
          .jf-spark-a, .jf-spark-b, .jf-spark-c, .jf-spark-d, .jf-spark-e,
          .jf-runner-a, .jf-runner-b,
          .jf-leg-a1, .jf-leg-a2, .jf-leg-b1, .jf-leg-b2 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
