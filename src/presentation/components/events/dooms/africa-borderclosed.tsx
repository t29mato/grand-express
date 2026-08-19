/**
 * 突然の国境封鎖。越境路線のゲートが下り、二本の旗ざおの間で
 * ディーゼル機関車が足止めを食う。ベレー帽の係官が腕を組んで立つ。
 *
 * 動くのは3つ: ゲートの赤いランプの明滅、機関車のアイドリングの排気、
 * 三角旗のはためき。止めても「下りた遮断棒と待つ機関車」で伝わる。
 */
export function AfricaBorderclosed() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 乾いた昼の空。 */}
      <rect width="400" height="210" fill="#c9b380" />
      <rect width="400" height="92" fill="#b8ccd0" />
      <g fill="#e6eee8" opacity="0.85">
        <ellipse cx="70" cy="34" rx="30" ry="8" />
        <ellipse cx="300" cy="48" rx="26" ry="7" />
      </g>

      {/* 中景: 低い丘とまばらなアカシア。 */}
      <path d="M0,92 q80,-18 170,-6 q120,14 230,-4 v14 H0z" fill="#a89a68" />
      <g>
        <path d="M60,86 q0,-8 -3,-12 M60,86 q1,-9 4,-12" stroke="#6b4a2e" strokeWidth="2" fill="none" />
        <path d="M48,74 q12,-8 24,0 q-5,5 -12,5 t-12,-5z" fill="#5f7f3a" />
      </g>

      {/* 地面と線路。 */}
      <rect y="100" width="400" height="110" fill="#c9b380" />
      <rect y="168" width="400" height="10" fill="#a08a58" opacity="0.7" />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={6 + i * 29} y="169" width="12" height="7" fill="#6b5a44" />
      ))}
      <rect y="166" width="400" height="4" fill="#4a4640" />

      {/* 国境線: 地面に引かれた白線と、左右で違う三角旗の旗ざお。 */}
      <rect x="236" y="152" width="5" height="58" fill="#e8e0cc" opacity="0.35" />
      <g>
        <rect x="216" y="66" width="4" height="102" fill="#8a8478" />
        <g className="africa-bc-flag1">
          <path d="M220,68 l26,7 l-26,7z" fill="#f5b31c" />
        </g>
        <rect x="262" y="72" width="4" height="96" fill="#8a8478" />
        <g className="africa-bc-flag2">
          <path d="M266,74 l26,7 l-26,7z" fill="#3f8f5a" />
        </g>
      </g>

      {/* 詰所と、線路をふさぐ遮断棒。 */}
      <g>
        <rect x="300" y="118" width="54" height="48" fill="#b8ae98" />
        <path d="M295,118 h64 l-8,-12 h-48z" fill="#8a8478" />
        <rect x="310" y="132" width="14" height="14" fill="#20364a" />
        <rect x="334" y="132" width="14" height="34" fill="#6b5f52" />
        {/* 掲示板(文字は描かない)。 */}
        <rect x="360" y="128" width="26" height="18" fill="#e8e0cc" />
        <path d="M364,133 h18 M364,138 h13" stroke="#8a4a3a" strokeWidth="2.4" />
      </g>
      <g>
        <rect x="286" y="140" width="8" height="30" fill="#5a5f52" />
        <rect x="196" y="143" width="92" height="7" rx="3.5" fill="#f6efe2" />
        <g fill="#e8443f">
          <rect x="204" y="143" width="14" height="7" />
          <rect x="232" y="143" width="14" height="7" />
          <rect x="260" y="143" width="14" height="7" />
        </g>
        <g className="africa-bc-lamp">
          <circle cx="290" cy="136" r="5" fill="#e8443f" />
        </g>
      </g>

      {/* 足止めされたディーゼル機関車(左)。 */}
      <g>
        <rect x="10" y="122" width="120" height="44" rx="4" fill="#8a4a3a" />
        <rect x="10" y="122" width="120" height="8" fill="#e8b020" />
        <rect x="108" y="130" width="22" height="20" fill="#20364a" />
        <rect x="16" y="134" width="80" height="16" fill="#6b3a2c" />
        <g fill="#e8b020">
          <rect x="20" y="152" width="14" height="8" />
          <rect x="116" y="152" width="14" height="8" />
        </g>
        <circle cx="34" cy="168" r="7" fill="#1c2026" />
        <circle cx="66" cy="168" r="7" fill="#1c2026" />
        <circle cx="106" cy="168" r="7" fill="#1c2026" />
        <rect x="30" y="112" width="12" height="10" fill="#5a4a3a" />
        {/* アイドリングの排気。 */}
        <g className="africa-bc-smoke" fill="#c8ccc4" opacity="0.8">
          <circle cx="36" cy="104" r="5" />
          <circle cx="40" cy="92" r="7" />
          <circle cx="34" cy="78" r="9" />
        </g>
      </g>

      {/* 係官。オリーブの制服に赤いベレー、腕を組んで動かない。 */}
      <g transform="translate(172,0)">
        <circle cx="0" cy="126" r="7.5" fill="#3a2a1e" />
        <path d="M-8,122 q8,-7 16,0 l-2,-5 q-6,-4 -12,0z" fill="#c8384f" />
        <path d="M0,134 q-3,14 -2,30" stroke="#5f6b4a" strokeWidth="11" fill="none" />
        <path d="M-7,142 q7,5 14,0" stroke="#4a5540" strokeWidth="5" fill="none" />
        <path d="M-3,164 l-5,18 M-1,164 l5,18" stroke="#3a4030" strokeWidth="5" fill="none" />
      </g>

      <style>{`
        .africa-bc-lamp {
          animation: africa-bc-blink 1.2s steps(1) infinite;
        }
        @keyframes africa-bc-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        .africa-bc-smoke {
          animation: africa-bc-idle 2.6s ease-in-out infinite;
        }
        @keyframes africa-bc-idle {
          0% { transform: translateY(6px); opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-10px); opacity: 0.15; }
        }
        .africa-bc-flag1 {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: africa-bc-flap 1.4s ease-in-out infinite;
        }
        .africa-bc-flag2 {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: africa-bc-flap 1.4s ease-in-out -0.7s infinite;
        }
        @keyframes africa-bc-flap {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.82) rotate(2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .africa-bc-lamp,
          .africa-bc-smoke,
          .africa-bc-flag1,
          .africa-bc-flag2 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
