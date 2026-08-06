/**
 * 海辺の町(鎌倉など)に重ねる動き。
 *
 * 沖から波頭が次々に立っては崩れ、陽の下の海面がちらちらと光る。
 * かもめが二羽、浜のうえを渡っていく。
 * 空・岬・海・家並みは静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function JapanCoasttown() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 寄せては崩れる波頭 */}
      <g stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="jco-crest jco-c1" d="M24,118 q16,-3 32,0 q16,3 30,0" opacity="0.45" />
        <path className="jco-crest jco-c2" d="M148,124 q14,-3 28,0 q14,3 26,0" opacity="0.4" />
        <path className="jco-crest jco-c3" d="M244,116 q16,-3 32,0 q16,3 30,0" opacity="0.45" />
        <path className="jco-crest jco-c4" d="M62,136 q18,-4 36,0 q18,4 34,0" opacity="0.5" />
        <path className="jco-crest jco-c5" d="M196,138 q18,-4 36,0 q18,4 34,0" opacity="0.45" />
      </g>

      {/* 陽をはじく海面 */}
      <g stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path className="jco-glint jco-g1" d="M292,120h7" opacity="0.7" />
        <path className="jco-glint jco-g2" d="M312,128h6" opacity="0.6" />
        <path className="jco-glint jco-g3" d="M332,118h7" opacity="0.65" />
        <path className="jco-glint jco-g4" d="M300,136h6" opacity="0.55" />
        <path className="jco-glint jco-g5" d="M344,132h7" opacity="0.6" />
        <path className="jco-glint jco-g6" d="M322,140h5" opacity="0.5" />
      </g>

      {/* 渡るかもめ(高い) */}
      <g transform="translate(180,40)">
        <g className="jco-gull-a">
          <path
            className="jco-flap-a"
            d="M-9,0 Q-4.5,-6 0,-0.8 Q4.5,-6 9,0"
            fill="none"
            stroke="#f6efe2"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* 渡るかもめ(低い・岬の手前) */}
      <g transform="translate(74,78)">
        <g className="jco-gull-b">
          <path
            className="jco-flap-b"
            d="M-7,0 Q-3.5,-5 0,-0.6 Q3.5,-5 7,0"
            fill="none"
            stroke="#f6efe2"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      </g>

      <style>{`
        .jco-crest {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: jco-roll 9s ease-in-out infinite;
          animation-delay: -3s;
        }
        .jco-c2 { animation-duration: 11s; animation-delay: -4s; }
        .jco-c3 { animation-duration: 8s; animation-delay: -2s; }
        .jco-c4 { animation-duration: 12s; animation-delay: -7s; }
        .jco-c5 { animation-duration: 10s; animation-delay: -5s; }
        .jco-glint { animation: jco-sparkle 3.6s ease-in-out infinite; }
        .jco-g2 { animation-duration: 4.4s; animation-delay: -1.2s; }
        .jco-g3 { animation-duration: 3s; animation-delay: -2.1s; }
        .jco-g4 { animation-duration: 5s; animation-delay: -0.7s; }
        .jco-g5 { animation-duration: 4s; animation-delay: -2.8s; }
        .jco-g6 { animation-duration: 3.4s; animation-delay: -1.7s; }
        .jco-gull-a { animation: jco-cross-a 30s linear infinite; animation-delay: -13s; }
        .jco-gull-b { animation: jco-cross-b 24s linear infinite; animation-delay: -9s; }
        .jco-flap-a, .jco-flap-b {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: jco-flap 2.1s ease-in-out infinite;
        }
        .jco-flap-b { animation-duration: 1.7s; }
        @keyframes jco-roll {
          0% { transform: translateX(-14px) scaleY(0.4); opacity: 0; }
          40% { opacity: 0.5; }
          70% { transform: translateX(6px) scaleY(1.3); opacity: 0.5; }
          100% { transform: translateX(16px) scaleY(0.5); opacity: 0; }
        }
        @keyframes jco-sparkle {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.8; }
        }
        @keyframes jco-cross-a {
          0% { transform: translate(-240px, 16px); }
          100% { transform: translate(240px, -12px); }
        }
        @keyframes jco-cross-b {
          0% { transform: translate(-120px, -10px); }
          100% { transform: translate(90px, 14px); }
        }
        @keyframes jco-flap {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.35); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jco-crest, .jco-glint, .jco-gull-a, .jco-gull-b, .jco-flap-a, .jco-flap-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
