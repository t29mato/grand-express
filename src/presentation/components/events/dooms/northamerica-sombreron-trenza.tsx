/**
 * ソンブレロンに化かされる。大きな黒い帽子の小男が、
 * 繋がれた馬のたてがみを編み続ける様子で「化かされて足止め」を伝える。
 * 恐ろしい顔や暴力は描かない。ただ夜通し手を動かし続けるだけの、
 * 度の過ぎたいたずら好きとして描く(トッケビ・ダイダラボウと同じ扱い)。
 *
 * 動くのは、編む両手と、地面に淡く残る堂々巡りの足あとの帯だけ。
 */
export function NorthamericaSombreronTrenza() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の空。 */}
      <rect width="400" height="210" fill="#1e2a3a" />
      <circle cx="340" cy="40" r="20" fill="#e2ecef" opacity="0.9" />
      <g fill="#e2ecef" opacity="0.6">
        <circle cx="60" cy="30" r="1.6" />
        <circle cx="120" cy="55" r="1.6" />
        <circle cx="200" cy="24" r="1.6" />
        <circle cx="270" cy="70" r="1.6" />
      </g>

      {/* 地面。 */}
      <rect y="150" width="400" height="60" fill="#2f4a33" />

      {/* 堂々巡りの足あとの帯(淡く、輪になる)。 */}
      <ellipse cx="200" cy="185" rx="120" ry="14" fill="none" stroke="#3f6b3a" strokeWidth="3" strokeDasharray="6 8" opacity="0.6" />

      {/* 繋がれた馬(横向き、簡略)。 */}
      <g strokeLinejoin="round">
        <rect x="230" y="130" width="90" height="36" rx="14" fill="#8a5a3a" stroke="#20364a" strokeWidth="2.5" />
        <rect x="212" y="118" width="26" height="34" rx="8" fill="#8a5a3a" stroke="#20364a" strokeWidth="2.5" />
        <g stroke="#20364a" strokeWidth="6" strokeLinecap="round">
          <line x1="250" y1="164" x2="250" y2="188" />
          <line x1="300" y1="164" x2="300" y2="188" />
        </g>
      </g>

      {/* たてがみ。半分は編まれ、半分はまだほどけている。 */}
      <path d="M215,120 q10,-6 8,-16 q10,4 6,-10 q10,2 4,-12" fill="none" stroke="#4a3624" strokeWidth="5" strokeLinecap="round" />
      <path d="M228,118 q6,4 4,10 q6,2 3,8 q6,1 2,7" fill="none" stroke="#c8a860" strokeWidth="4" strokeLinecap="round" />

      {/* ソンブレロン(大きな帽子の小男、簡略)。 */}
      <g strokeLinejoin="round">
        <path d="M170,150 a34,10 0 0 1 68,0z" fill="#1a1a1a" stroke="#0c0c0c" strokeWidth="2" />
        <circle cx="204" cy="146" r="14" fill="#1a1a1a" />
        <circle cx="204" cy="150" r="9" fill="#d9a273" stroke="#20364a" strokeWidth="1.6" />
        <rect x="196" y="160" width="16" height="24" fill="#3a2a4a" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 編む両手。左右に振れて動く。 */}
      <g className="somb-hands" strokeLinecap="round">
        <line x1="204" y1="168" x2="222" y2="132" stroke="#d9a273" strokeWidth="6" />
        <line x1="204" y1="168" x2="186" y2="130" stroke="#d9a273" strokeWidth="6" />
      </g>

      <style>{`
        .somb-hands {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: somb-weave 0.8s ease-in-out infinite;
        }
        @keyframes somb-weave {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(8deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .somb-hands { animation: none; }
        }
      `}</style>
    </svg>
  );
}
