/**
 * 城下町(姫路など)に重ねる動き。
 *
 * 白鷺が2羽、天守のある空をゆっくり渡っていく。
 * 薄雲が流れ、桜の花びらが町並みへ舞い落ちる。
 * 背景(空・城山・町家)は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function JapanCastletown() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 流れる薄雲 */}
      <g transform="translate(190,34)">
        <g className="jct-cloud-a" fill="#ffffff" opacity="0.42">
          <ellipse cx="0" cy="0" rx="26" ry="8" />
          <ellipse cx="-14" cy="3" rx="16" ry="6" />
          <ellipse cx="16" cy="3" rx="18" ry="6" />
        </g>
      </g>
      <g transform="translate(60,62)">
        <g className="jct-cloud-b" fill="#ffffff" opacity="0.3">
          <ellipse cx="0" cy="0" rx="20" ry="6" />
          <ellipse cx="14" cy="2" rx="13" ry="5" />
        </g>
      </g>

      {/* 白鷺(手前) */}
      <g transform="translate(150,66)">
        <g className="jct-heron-a">
          <g className="jct-glide-a">
            <ellipse cx="0" cy="0" rx="11" ry="3.4" fill="#f8f4ea" />
            <path d="M9,-1 L19,-3 L23,-2 L19,0 Z" fill="#f8f4ea" />
            <path d="M22,-2 L28,-1.6 L22,-0.4 Z" fill="#f0b03c" />
            <path d="M-9,1 L-21,3" stroke="#e0d6c4" strokeWidth="1.4" strokeLinecap="round" />
            <path className="jct-wing-up-a" d="M-3,-1 L3,-15 L10,-2 Z" fill="#ffffff" />
            <path className="jct-wing-dn-a" d="M-3,1 L2,12 L9,2 Z" fill="#dcd3c2" />
          </g>
        </g>
      </g>

      {/* 白鷺(奥・小さめ) */}
      <g transform="translate(250,44)">
        <g className="jct-heron-b">
          <g className="jct-glide-b">
            <ellipse cx="0" cy="0" rx="7.5" ry="2.4" fill="#f8f4ea" />
            <path d="M6,-1 L14,-2.4 L17,-1.6 L14,0 Z" fill="#f8f4ea" />
            <path d="M-6,1 L-15,2.4" stroke="#e0d6c4" strokeWidth="1.1" strokeLinecap="round" />
            <path className="jct-wing-up-b" d="M-2,-1 L2,-11 L7,-1.4 Z" fill="#ffffff" />
            <path className="jct-wing-dn-b" d="M-2,0.8 L1.4,8.6 L6.4,1.4 Z" fill="#dcd3c2" />
          </g>
        </g>
      </g>

      {/* 舞う桜の花びら */}
      <g fill="#f7c6d8" opacity="0.62">
        <ellipse className="jct-petal jct-petal-a" cx="72" cy="96" rx="3.4" ry="2.2" />
        <ellipse className="jct-petal jct-petal-b" cx="146" cy="132" rx="3" ry="2" />
        <ellipse className="jct-petal jct-petal-c" cx="228" cy="80" rx="3.6" ry="2.3" />
        <ellipse className="jct-petal jct-petal-d" cx="304" cy="118" rx="3.1" ry="2.1" />
        <ellipse className="jct-petal jct-petal-e" cx="360" cy="150" rx="3.4" ry="2.2" />
      </g>

      <style>{`
        .jct-cloud-a { animation: jct-drift-a 46s linear infinite; }
        .jct-cloud-b { animation: jct-drift-b 62s linear infinite; }
        .jct-heron-a { animation: jct-cross-a 26s linear infinite; }
        .jct-heron-b { animation: jct-cross-b 34s linear infinite; }
        .jct-glide-a, .jct-glide-b { animation: jct-bob 3.4s ease-in-out infinite; }
        .jct-glide-b { animation-duration: 4.2s; }
        .jct-wing-up-a, .jct-wing-up-b {
          transform-box: fill-box; transform-origin: 46% 100%;
          animation: jct-flap-up 2.6s ease-in-out infinite;
        }
        .jct-wing-dn-a, .jct-wing-dn-b {
          transform-box: fill-box; transform-origin: 46% 0%;
          animation: jct-flap-dn 2.6s ease-in-out infinite;
        }
        .jct-wing-up-b, .jct-wing-dn-b { animation-duration: 3.1s; }
        .jct-petal {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: jct-fall 13s linear infinite;
        }
        .jct-petal-b { animation-duration: 16s; animation-delay: -5s; }
        .jct-petal-c { animation-duration: 11s; animation-delay: -8s; }
        .jct-petal-d { animation-duration: 15s; animation-delay: -3s; }
        .jct-petal-e { animation-duration: 18s; animation-delay: -11s; }
        @keyframes jct-drift-a {
          0% { transform: translateX(-240px); }
          100% { transform: translateX(240px); }
        }
        @keyframes jct-drift-b {
          0% { transform: translateX(-120px); }
          100% { transform: translateX(380px); }
        }
        @keyframes jct-cross-a {
          0% { transform: translate(-190px, 14px); }
          100% { transform: translate(270px, -22px); }
        }
        @keyframes jct-cross-b {
          0% { transform: translate(-290px, 10px); }
          100% { transform: translate(170px, -8px); }
        }
        @keyframes jct-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes jct-flap-up {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(26deg); }
        }
        @keyframes jct-flap-dn {
          0%, 100% { transform: rotate(16deg); }
          50% { transform: rotate(-26deg); }
        }
        @keyframes jct-fall {
          0% { transform: translate(0, -80px) rotate(0deg); }
          100% { transform: translate(26px, 110px) rotate(320deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jct-cloud-a, .jct-cloud-b,
          .jct-heron-a, .jct-heron-b,
          .jct-glide-a, .jct-glide-b,
          .jct-wing-up-a, .jct-wing-up-b,
          .jct-wing-dn-a, .jct-wing-dn-b,
          .jct-petal { animation: none; }
        }
      `}</style>
    </svg>
  );
}
