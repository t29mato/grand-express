/**
 * 乾杯続きのザスチョリエの席から抜けられない。並んだグラスの一つが
 * 何度も持ち上がっては隣のグラスに触れ、また置かれる――を繰り返す。
 *
 * 動くのは、持ち上がるグラス1個(と腕)だけ。
 */
export function RussiaZastolye() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暖かい室内の空気。 */}
      <rect width="400" height="210" fill="#5a3f2a" />
      <rect y="0" width="400" height="120" fill="#6b4f38" />

      {/* テーブル。 */}
      <rect y="150" width="400" height="60" fill="#8a6a44" />
      <rect y="150" width="400" height="6" fill="#a08054" />

      {/* 料理の皿(並んだ丸)。 */}
      <g fill="#f6efe2" stroke="#20364a" strokeWidth="1.6">
        <ellipse cx="70" cy="158" rx="26" ry="8" />
        <ellipse cx="330" cy="160" rx="24" ry="7" />
      </g>
      <g fill="#c8202f" opacity="0.8">
        <circle cx="62" cy="157" r="4" />
        <circle cx="74" cy="159" r="4" />
      </g>

      {/* 瓶。 */}
      <g strokeLinejoin="round">
        <rect x="190" y="120" width="12" height="34" rx="2" fill="#3f8f6f" stroke="#20364a" strokeWidth="1.6" />
        <rect x="193" y="112" width="6" height="10" fill="#3f8f6f" stroke="#20364a" strokeWidth="1.4" />
      </g>

      {/* 静止しているグラス(奥の客のぶん)。 */}
      <g fill="none" stroke="#f6efe2" strokeWidth="2">
        <path d="M250,148 L254,132 L266,132 L270,148z" />
        <path d="M100,150 L104,136 L114,136 L118,150z" />
      </g>

      {/* 手前、持ち上がる腕とグラス。 */}
      <g className="rz-arm">
        <rect x="150" y="150" width="16" height="40" rx="6" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <path d="M150,150 L154,132 L166,132 L170,150z" fill="none" stroke="#20364a" strokeWidth="2.2" />
        <path d="M152,148 L154,136 L166,136 L168,148z" fill="#e8b840" opacity="0.85" />
      </g>

      {/* 触れ合う瞬間に光る、乾杯の輝き。 */}
      <g className="rz-clink" fill="#f6efe2">
        <circle cx="150" cy="128" r="6" />
      </g>

      <style>{`
        .rz-arm {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: rz-lift 1.8s ease-in-out infinite;
        }
        @keyframes rz-lift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          40% { transform: translate(-6px, -18px) rotate(-8deg); }
          55% { transform: translate(-6px, -18px) rotate(-8deg); }
        }
        .rz-clink {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          opacity: 0;
          animation: rz-flash 1.8s ease-in-out infinite;
        }
        @keyframes rz-flash {
          0%, 38% { opacity: 0; transform: scale(0.6); }
          46% { opacity: 1; transform: scale(1.6); }
          58%, 100% { opacity: 0; transform: scale(0.6); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rz-arm { animation: none; transform: translate(-6px, -18px) rotate(-8deg); }
          .rz-clink { animation: none; opacity: 0.9; }
        }
      `}</style>
    </svg>
  );
}
