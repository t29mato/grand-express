/**
 * フェーン風で頭痛。アルプスから吹き下ろす暖かく乾いた風で、
 * 窓辺の住人は頭を抱え、カーテンと室内の植木鉢の葉が絶えず揺れている。
 *
 * 人を苦しめる場面ではなく、**カーテンが揺れ続け、頭を抱える仕草**だけで
 * 「なんだか調子が悪い」を伝える。動くのは風の筋・カーテン・頭を抱える腕。
 */
export function GermanyFoehn() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 黄色みがかった空(フェーンの日特有のかすみ)。 */}
      <rect width="400" height="210" fill="#c8a860" />
      <rect y="0" width="400" height="90" fill="#d8bc7a" />
      <circle cx="330" cy="46" r="24" fill="#e8d090" opacity="0.7" />

      {/* 遠くのアルプス。 */}
      <path d="M240,90 L280,40 L310,70 L340,30 L400,90z" fill="#b89858" opacity="0.8" />

      {/* 地面と室内の床。 */}
      <rect y="90" width="400" height="120" fill="#a88848" />
      <rect y="90" width="400" height="4" fill="#bc9c5c" />

      {/* 部屋の壁と窓枠。 */}
      <rect x="20" y="30" width="200" height="160" fill="#e8d8b0" />
      <rect x="40" y="46" width="150" height="110" rx="4" fill="#8fc4e8" />
      <rect x="40" y="46" width="150" height="110" rx="4" fill="none" stroke="#5a4630" strokeWidth="6" />
      <line x1="115" y1="46" x2="115" y2="156" stroke="#5a4630" strokeWidth="4" />

      {/* 揺れるカーテン。 */}
      <g className="gfh-curtain-l" fill="#f6efe2" opacity="0.9">
        <path d="M42,48 q10,50 -4,106 l20,0 q10,-56 2,-106z" />
      </g>
      <g className="gfh-curtain-r" fill="#f6efe2" opacity="0.9">
        <path d="M188,48 q-10,50 4,106 l-20,0 q-10,-56 -2,-106z" />
      </g>

      {/* しおれた鉢植え。 */}
      <g strokeLinecap="round">
        <rect x="30" y="168" width="20" height="16" rx="2" fill="#a8503a" />
        <path d="M40,168 q-14,-6 -18,-22" stroke="#5f7f4a" strokeWidth="4" fill="none" />
        <path d="M40,168 q4,-10 -4,-24" stroke="#4a6a3a" strokeWidth="4" fill="none" />
      </g>

      {/* 頭を抱える住人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <rect x="255" y="140" width="26" height="50" rx="8" fill="#3f6b8a" />
        <circle cx="268" cy="120" r="15" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <g className="gfh-arm-l">
          <path d="M258,132 Q244,124 254,110" stroke="#d9a273" strokeWidth="8" fill="none" />
        </g>
        <g className="gfh-arm-r">
          <path d="M278,132 Q292,124 282,110" stroke="#d9a273" strokeWidth="8" fill="none" />
        </g>
      </g>

      {/* 頭痛薬の瓶(テーブル)。 */}
      <rect x="330" y="176" width="14" height="18" rx="2" fill="#f6efe2" stroke="#241a10" strokeWidth="1.5" />
      <rect x="332" y="172" width="10" height="6" fill="#e05252" />

      {/* 吹き付ける風の筋。 */}
      <g className="gfh-gust-a" stroke="#e8d090" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6">
        <path d="M0,60 q40,-10 80,0" />
      </g>
      <g className="gfh-gust-b" stroke="#e8d090" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5">
        <path d="M0,100 q46,-12 92,0" />
      </g>
      <g className="gfh-gust-c" stroke="#e8d090" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.5">
        <path d="M0,190 q34,8 68,0" />
      </g>

      <style>{`
        .gfh-curtain-l, .gfh-curtain-r {
          transform-box: fill-box;
          transform-origin: top center;
          animation: gfh-flap 2.4s ease-in-out infinite;
        }
        .gfh-curtain-r { animation-delay: -1.2s; }
        .gfh-arm-l, .gfh-arm-r {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: gfh-throb 2.4s ease-in-out infinite;
        }
        .gfh-gust-a { animation: gfh-sweep 2.2s linear infinite; }
        .gfh-gust-b { animation: gfh-sweep 2.6s linear infinite; animation-delay: -1s; }
        .gfh-gust-c { animation: gfh-sweep 2.4s linear infinite; animation-delay: -1.6s; }
        @keyframes gfh-flap {
          0%, 100% { transform: skewX(0deg) scaleX(1); }
          50% { transform: skewX(-8deg) scaleX(1.08); }
        }
        @keyframes gfh-throb {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-6deg); }
        }
        @keyframes gfh-sweep {
          0% { transform: translateX(-30px); opacity: 0; }
          20%, 70% { opacity: 0.6; }
          100% { transform: translateX(340px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gfh-curtain-l, .gfh-curtain-r, .gfh-arm-l, .gfh-arm-r,
          .gfh-gust-a, .gfh-gust-b, .gfh-gust-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
