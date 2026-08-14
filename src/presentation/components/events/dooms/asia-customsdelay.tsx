/**
 * 荷物が全部下ろされて検査される。新しい係官が全部の鞄を開けさせ、
 * 行列がホームの端まで伸びている。
 *
 * 人を描かず、**開けられた鞄の列と検査台のスタンプ**で足止めを表す。
 * 動くのは、上下するスタンプだけ。
 */
export function AsiaCustomsdelay() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 屋内の検問所。 */}
      <rect width="400" height="210" fill="#cfd6da" />
      <rect y="0" width="400" height="60" fill="#e6e9ea" />

      {/* 天井の梁。 */}
      <g stroke="#8b8f98" strokeWidth="4">
        <line x1="0" y1="20" x2="400" y2="20" />
        <line x1="80" y1="0" x2="80" y2="20" />
        <line x1="200" y1="0" x2="200" y2="20" />
        <line x1="320" y1="0" x2="320" y2="20" />
      </g>

      {/* 検査台。 */}
      <rect x="140" y="120" width="160" height="16" fill="#8b8f98" />
      <rect x="140" y="136" width="160" height="50" fill="#5c6a72" />

      {/* 開けられた鞄の列。 */}
      <g strokeLinejoin="round">
        <rect x="20" y="150" width="46" height="34" rx="4" fill="#7a4a2a" stroke="#3a2f26" strokeWidth="2" />
        <path d="M20,150 L20,134 L66,134 L66,150" fill="none" stroke="#3a2f26" strokeWidth="2" />
        <rect x="80" y="156" width="40" height="28" rx="4" fill="#c9a26a" stroke="#3a2f26" strokeWidth="2" />
        <path d="M80,156 L80,142 L120,142 L120,156" fill="none" stroke="#3a2f26" strokeWidth="2" />
        <rect x="310" y="152" width="42" height="32" rx="4" fill="#8b6a1a" stroke="#3a2f26" strokeWidth="2" />
        <rect x="360" y="158" width="34" height="26" rx="4" fill="#7a4a2a" stroke="#3a2f26" strokeWidth="2" />
      </g>

      {/* 検査台の上に開いた鞄の中身。 */}
      <g>
        <rect x="170" y="126" width="24" height="10" rx="2" fill="#f6efe2" />
        <rect x="200" y="126" width="18" height="10" rx="2" fill="#5b8fe8" />
        <circle cx="240" cy="130" r="6" fill="#e8443f" />
      </g>

      {/* 検問のゲート。 */}
      <g strokeLinejoin="round">
        <rect x="30" y="60" width="8" height="130" fill="#4a4a52" />
        <rect x="362" y="60" width="8" height="130" fill="#4a4a52" />
        <rect x="30" y="60" width="340" height="8" fill="#e8443f" />
      </g>

      {/* 上下するスタンプ。**ここだけが動く。** */}
      <g className="asia-stamp-press">
        <rect x="248" y="90" width="6" height="24" fill="#3a2f26" />
        <rect x="234" y="106" width="34" height="16" rx="2" fill="#4a4a52" stroke="#20364a" strokeWidth="2" />
      </g>

      <style>{`
        .asia-stamp-press {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: asia-stamp-press-move 1.1s ease-in-out infinite;
        }
        @keyframes asia-stamp-press-move {
          0% { transform: translateY(0); }
          40% { transform: translateY(16px); }
          55% { transform: translateY(16px); }
          100% { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .asia-stamp-press { animation: none; }
        }
      `}</style>
    </svg>
  );
}
