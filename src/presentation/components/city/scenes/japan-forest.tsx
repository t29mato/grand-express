/**
 * 杉木立(日光など)に重ねる動き。
 *
 * 杉のあいだから射す光の帯がゆっくり明滅し、木の葉が舞い落ちる。
 * 参道の低いところには朝靄が流れる。
 * 空・杉・地面は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function JapanForest() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 木漏れ日の帯 */}
      <g fill="#fdf6d8">
        <path className="jfo-shaft jfo-s1" d="M62,98 L84,98 L46,210 L14,210 Z" opacity="0.13" />
        <path className="jfo-shaft jfo-s2" d="M200,94 L216,94 L182,210 L158,210 Z" opacity="0.1" />
        <path className="jfo-shaft jfo-s3" d="M322,102 L344,102 L312,210 L284,210 Z" opacity="0.12" />
      </g>

      {/* 参道を流れる朝靄 */}
      <g fill="#e4efe0">
        <ellipse className="jfo-mist jfo-m1" cx="120" cy="176" rx="86" ry="7" opacity="0.2" />
        <ellipse className="jfo-mist jfo-m2" cx="300" cy="198" rx="104" ry="8" opacity="0.22" />
      </g>

      {/* 舞い落ちる木の葉 */}
      <g>
        <ellipse className="jfo-leaf jfo-l1" cx="66" cy="104" rx="4" ry="2.4" fill="#c9a877" opacity="0.9" />
        <ellipse className="jfo-leaf jfo-l2" cx="142" cy="142" rx="3.4" ry="2.1" fill="#b8925c" opacity="0.85" />
        <ellipse className="jfo-leaf jfo-l3" cx="228" cy="96" rx="4.2" ry="2.5" fill="#cfa24a" opacity="0.9" />
        <ellipse className="jfo-leaf jfo-l4" cx="298" cy="132" rx="3.6" ry="2.2" fill="#c9a877" opacity="0.85" />
        <ellipse className="jfo-leaf jfo-l5" cx="356" cy="160" rx="4" ry="2.4" fill="#b8925c" opacity="0.9" />
        <ellipse className="jfo-leaf jfo-l6" cx="24" cy="150" rx="3.4" ry="2.1" fill="#cfa24a" opacity="0.85" />
      </g>

      <style>{`
        .jfo-shaft { animation: jfo-glow 11s ease-in-out infinite; }
        .jfo-s2 { animation-duration: 15s; animation-delay: -4s; }
        .jfo-s3 { animation-duration: 13s; animation-delay: -8s; }
        .jfo-mist { animation: jfo-flow 42s linear infinite; animation-delay: -14s; }
        .jfo-m2 { animation-duration: 56s; animation-delay: -20s; }
        .jfo-leaf {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: jfo-fall 14s linear infinite;
        }
        .jfo-l2 { animation-duration: 18s; animation-delay: -6s; }
        .jfo-l3 { animation-duration: 12s; animation-delay: -9s; }
        .jfo-l4 { animation-duration: 16s; animation-delay: -3s; }
        .jfo-l5 { animation-duration: 20s; animation-delay: -13s; }
        .jfo-l6 { animation-duration: 15s; animation-delay: -11s; }
        @keyframes jfo-glow {
          0%, 100% { opacity: 0.06; transform: translateX(-4px); }
          50% { opacity: 0.17; transform: translateX(4px); }
        }
        @keyframes jfo-flow {
          0% { transform: translateX(-150px); opacity: 0; }
          25%, 75% { opacity: 0.22; }
          100% { transform: translateX(150px); opacity: 0; }
        }
        @keyframes jfo-fall {
          0% { transform: translate(0, -70px) rotate(0deg); }
          100% { transform: translate(-34px, 90px) rotate(340deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jfo-shaft, .jfo-mist, .jfo-leaf { animation: none; }
        }
      `}</style>
    </svg>
  );
}
