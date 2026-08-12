/**
 * 次のラウンド(ルンデ)を奢らされる。ビールテントの長い共用テーブルで
 * ジョッキが次々と運ばれてきて、財布からじりじりコインが減っていく。
 *
 * 暴飲を面白がる場面にはしない。**財布が軽くなっていくこと**と
 * **並ぶジョッキの数が増えること**だけで「払わされている」を伝える。
 */
export function GermanyRunde() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* テントの中の暖色の空間。 */}
      <rect width="400" height="210" fill="#6b4a2a" />
      <rect y="0" width="400" height="60" fill="#8a6438" />
      <g fill="#f4c430" opacity="0.5">
        <circle cx="60" cy="20" r="10" />
        <circle cx="340" cy="26" r="12" />
      </g>

      {/* 長い共用テーブル。 */}
      <rect y="140" width="400" height="16" fill="#5a3a20" />
      <rect y="156" width="400" height="54" fill="#4a3020" />

      {/* 並んだジョッキ。左から右へ数が増えていくアニメーション。 */}
      <g>
        <g className="grd-stein-a"><rect x="40" y="112" width="26" height="34" rx="3" fill="#f4c430" stroke="#4a3826" strokeWidth="2" /><rect x="40" y="112" width="26" height="7" fill="#f6efe2" /><rect x="66" y="118" width="6" height="16" rx="2" fill="none" stroke="#4a3826" strokeWidth="2.4" /></g>
        <g className="grd-stein-b"><rect x="100" y="112" width="26" height="34" rx="3" fill="#f4c430" stroke="#4a3826" strokeWidth="2" /><rect x="100" y="112" width="26" height="7" fill="#f6efe2" /><rect x="126" y="118" width="6" height="16" rx="2" fill="none" stroke="#4a3826" strokeWidth="2.4" /></g>
        <g className="grd-stein-c"><rect x="160" y="112" width="26" height="34" rx="3" fill="#f4c430" stroke="#4a3826" strokeWidth="2" /><rect x="160" y="112" width="26" height="7" fill="#f6efe2" /><rect x="186" y="118" width="6" height="16" rx="2" fill="none" stroke="#4a3826" strokeWidth="2.4" /></g>
        <g className="grd-stein-d"><rect x="220" y="112" width="26" height="34" rx="3" fill="#f4c430" stroke="#4a3826" strokeWidth="2" /><rect x="220" y="112" width="26" height="7" fill="#f6efe2" /><rect x="246" y="118" width="6" height="16" rx="2" fill="none" stroke="#4a3826" strokeWidth="2.4" /></g>
      </g>

      {/* 奢らされる人(困り顔)。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <rect x="290" y="150" width="26" height="46" rx="8" fill="#5a4636" />
        <circle cx="303" cy="134" r="14" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M296,138q7,5 14,0" stroke="#241a10" strokeWidth="2" fill="none" />
      </g>

      {/* 軽くなっていく財布。 */}
      <g strokeLinejoin="round">
        <rect x="340" y="168" width="34" height="24" rx="4" fill="#8a5a3a" stroke="#241a10" strokeWidth="2" />
        <rect x="340" y="168" width="34" height="7" fill="#a8763a" />
      </g>
      <g className="grd-coin">
        <circle r="5" fill="#f4c430" stroke="#a8763a" strokeWidth="1.4" />
      </g>

      <style>{`
        .grd-stein-a, .grd-stein-b, .grd-stein-c, .grd-stein-d {
          transform-box: fill-box;
          transform-origin: bottom center;
          opacity: 0;
          animation: grd-arrive 3.2s ease-in-out infinite;
        }
        .grd-stein-a { animation-delay: 0s; }
        .grd-stein-b { animation-delay: 0.7s; }
        .grd-stein-c { animation-delay: 1.4s; }
        .grd-stein-d { animation-delay: 2.1s; }
        .grd-coin {
          transform-box: fill-box;
          transform-origin: center;
          animation: grd-drop 1.6s ease-in infinite;
        }
        @keyframes grd-arrive {
          0% { transform: translateY(-24px) scale(0.7); opacity: 0; }
          15%, 90% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes grd-drop {
          0% { transform: translate(357px, 172px) scale(1); opacity: 1; }
          80% { transform: translate(357px, 210px) scale(0.6); opacity: 0.6; }
          100% { transform: translate(357px, 214px) scale(0.4); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .grd-stein-a, .grd-stein-b, .grd-stein-c, .grd-stein-d { animation: none; opacity: 1; transform: none; }
          .grd-coin { animation: none; transform: translate(357px, 176px); }
        }
      `}</style>
    </svg>
  );
}
