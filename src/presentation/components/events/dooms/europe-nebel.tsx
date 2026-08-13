/**
 * 霧で航路が閉じる。港でフェリーが出航を止められ、濃い霧が流れ込む。
 * 事故や遭難は描かない。**流れる霧の帯**が船をほとんど隠すことで伝える。
 */
export function EuropeNebel() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。 */}
      <rect width="400" height="210" fill="#9aabb2" />
      <rect y="0" width="400" height="90" fill="#c3d0d4" />

      {/* 海。 */}
      <rect y="120" width="400" height="90" fill="#4a6270" />
      <g stroke="#5c7684" strokeWidth="2" opacity="0.6">
        <path d="M0,140 q20,-5 40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0" fill="none" />
        <path d="M0,160 q20,-5 40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0" fill="none" />
      </g>

      {/* 岸壁。 */}
      <rect y="110" width="120" height="20" fill="#5c6a72" />
      <rect y="108" width="120" height="4" fill="#7a8790" />

      {/* 停まったフェリー。 */}
      <g strokeLinejoin="round">
        <path d="M170,150 L330,150 L310,180 L190,180z" fill="#8b8f98" stroke="#20364a" strokeWidth="2.5" />
        <rect x="230" y="120" width="16" height="30" fill="#4a4a52" stroke="#20364a" strokeWidth="2" />
        <rect x="200" y="132" width="60" height="18" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <rect x="290" y="100" width="6" height="30" fill="#3a332c" />
        <circle cx="293" cy="98" r="4" fill="#f5b31c" />
      </g>

      {/* 岸で待つ人影。 */}
      <g strokeLinejoin="round">
        <circle cx="60" cy="94" r="9" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <rect x="50" y="103" width="20" height="26" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 流れる濃霧の帯。船をほとんど隠す。 */}
      <g className="enb-fog" fill="#e6ecee">
        <ellipse cx="120" cy="140" rx="110" ry="30" opacity="0.75" />
        <ellipse cx="260" cy="150" rx="130" ry="34" opacity="0.85" />
        <ellipse cx="360" cy="130" rx="90" ry="26" opacity="0.7" />
      </g>

      <style>{`
        .enb-fog {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: enb-drift 4.2s ease-in-out infinite;
        }
        @keyframes enb-drift {
          0% { transform: translateX(-30px); opacity: 0.55; }
          50% { transform: translateX(20px); opacity: 0.9; }
          100% { transform: translateX(-30px); opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .enb-fog { animation: none; opacity: 0.8; }
        }
      `}</style>
    </svg>
  );
}
