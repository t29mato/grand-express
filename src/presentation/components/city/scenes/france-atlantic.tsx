/**
 * 大西洋岸(ビアリッツ、ラ・ロシェルなど)に重ねる動き。
 *
 * 灯台の光が明滅し、うねりの白い筋が沖から寄せ、
 * 沖のヨットが揺れ、砂丘の草が風になびいてカモメがわたる。
 * 灯台・砂丘・海は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FranceAtlantic() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灯台の光(静止画の光条 65,34 と 79,34 に重ねて明滅させる) */}
      <g fill="#f5d06a">
        <path className="fratl-beam-l" d="M65,34L14,26v18z" opacity="0.3" />
        <path className="fratl-beam-r" d="M79,34l50,-8v18z" opacity="0.3" />
        <circle className="fratl-lamp" cx="72" cy="39" r="7" opacity="0.45" />
      </g>

      {/* 寄せる波の白い筋(海は y=100〜144) */}
      <g stroke="#eaf6fb" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path className="fratl-wave fratl-w1" d="M24,108h46" opacity="0.5" />
        <path className="fratl-wave fratl-w2" d="M150,118h58" opacity="0.45" />
        <path className="fratl-wave fratl-w3" d="M268,114h62" opacity="0.5" />
        <path className="fratl-wave fratl-w4" d="M60,130h54" opacity="0.55" />
        <path className="fratl-wave fratl-w5" d="M196,138h60" opacity="0.5" />
      </g>

      {/* 波打ちぎわの泡(砂との境 y=144 あたり) */}
      <g fill="#f4fbfe">
        <ellipse className="fratl-foam-a" cx="90" cy="143" rx="52" ry="3.4" opacity="0.5" />
        <ellipse className="fratl-foam-b" cx="250" cy="145" rx="64" ry="3" opacity="0.42" />
      </g>

      {/* 沖のヨット(静止画の船体 228〜272, 帆 252,102) */}
      <g transform="translate(250,124)">
        <g className="fratl-yacht">
          <path d="M-22,0c10,-4 34,-4 44,0c-6,6 -38,6 -44,0z" fill="#3f5f6a" opacity="0.9" />
          <path d="M2,-2V-24l16,22z" fill="#f6efe2" opacity="0.9" />
        </g>
      </g>

      {/* 砂丘の草(静止画の草 212,150 / 268,142 / 330,138 に重ねる) */}
      <g stroke="#8a9a52" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path className="fratl-grass-a" d="M212,150c-3,-8 -5,-12 -4,-16M212,150c1,-9 2,-13 5,-17" opacity="0.75" />
        <path className="fratl-grass-b" d="M268,142c-3,-8 -5,-12 -4,-16M268,142c1,-9 2,-13 5,-17" opacity="0.7" />
        <path className="fratl-grass-c" d="M330,138c-3,-8 -5,-12 -4,-16M330,138c1,-9 2,-13 5,-17" opacity="0.7" />
      </g>

      {/* わたるカモメ */}
      <g transform="translate(150,58)">
        <g className="fratl-gull">
          <path
            className="fratl-flap"
            d="M-9,0 Q-4.5,-6 0,-0.9 Q4.5,-6 9,0"
            fill="none"
            stroke="#f6efe2"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </g>

      <style>{`
        .fratl-beam-l, .fratl-beam-r, .fratl-lamp, .fratl-wave,
        .fratl-foam-a, .fratl-foam-b, .fratl-yacht,
        .fratl-grass-a, .fratl-grass-b, .fratl-grass-c, .fratl-flap {
          transform-box: fill-box;
        }
        .fratl-beam-l { transform-origin: 100% 50%; animation: fratl-sweep 7s ease-in-out infinite; }
        .fratl-beam-r { transform-origin: 0% 50%; animation: fratl-sweep 7s ease-in-out infinite; animation-delay: -3.5s; }
        .fratl-lamp { transform-origin: 50% 50%; animation: fratl-blink 7s ease-in-out infinite; }
        .fratl-wave { animation: fratl-roll 14s linear infinite; }
        .fratl-w2 { animation-duration: 18s; animation-delay: -5s; }
        .fratl-w3 { animation-duration: 12s; animation-delay: -8s; }
        .fratl-w4 { animation-duration: 16s; animation-delay: -3s; }
        .fratl-w5 { animation-duration: 11s; animation-delay: -6s; }
        .fratl-foam-a { transform-origin: 50% 50%; animation: fratl-wash 8s ease-in-out infinite; }
        .fratl-foam-b { transform-origin: 50% 50%; animation: fratl-wash 10.5s ease-in-out infinite; animation-delay: -4s; }
        .fratl-yacht { transform-origin: 50% 100%; animation: fratl-heel 5.6s ease-in-out infinite; }
        .fratl-grass-a { transform-origin: 50% 100%; animation: fratl-bend 4.4s ease-in-out infinite; }
        .fratl-grass-b { transform-origin: 50% 100%; animation: fratl-bend 5.2s ease-in-out infinite; animation-delay: -1.6s; }
        .fratl-grass-c { transform-origin: 50% 100%; animation: fratl-bend 4.8s ease-in-out infinite; animation-delay: -3s; }
        .fratl-gull { animation: fratl-cross 26s linear infinite; animation-delay: -8s; }
        .fratl-flap { transform-origin: 50% 100%; animation: fratl-flap 2s ease-in-out infinite; }
        @keyframes fratl-sweep {
          0%, 100% { transform: scaleX(0.7); opacity: 0.12; }
          50% { transform: scaleX(1.15); opacity: 0.42; }
        }
        @keyframes fratl-blink {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
        @keyframes fratl-roll {
          0% { transform: translateX(-30px); opacity: 0; }
          30%, 70% { opacity: 0.55; }
          100% { transform: translateX(30px); opacity: 0; }
        }
        @keyframes fratl-wash {
          0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.24; }
          50% { transform: translateY(3px) scaleX(1.1); opacity: 0.55; }
        }
        @keyframes fratl-heel {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(5deg) translateY(-2px); }
        }
        @keyframes fratl-bend {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(11deg); }
        }
        @keyframes fratl-cross {
          0% { transform: translate(-190px, 10px); }
          100% { transform: translate(250px, -12px); }
        }
        @keyframes fratl-flap {
          0%, 100% { transform: scaleY(0.55); }
          50% { transform: scaleY(1.35); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fratl-beam-l, .fratl-beam-r, .fratl-lamp, .fratl-wave,
          .fratl-foam-a, .fratl-foam-b, .fratl-yacht,
          .fratl-grass-a, .fratl-grass-b, .fratl-grass-c,
          .fratl-gull, .fratl-flap { animation: none; }
        }
      `}</style>
    </svg>
  );
}
