/**
 * 軒先のドミノで大負けする(カラー・ドミノ)。手が悪い牌を置くたび、
 * コーヒーカップが負けた側へすっと滑っていく。
 *
 * 動くのは手が牌を置く動きと、カップが滑っていく動きだけ。
 */
export function IndonesiaKalahdomino() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜のワルンの軒先。 */}
      <rect width="400" height="210" fill="#2a2440" />
      <rect y="0" width="400" height="90" fill="#3a3458" />

      {/* 軒(屋根の下端)。 */}
      <path d="M0,50 L400,50 L400,66 L0,66z" fill="#6b5330" />
      <g fill="#f5b31c" opacity="0.85">
        <circle cx="40" cy="58" r="3" />
        <circle cx="120" cy="58" r="3" />
        <circle cx="280" cy="58" r="3" />
        <circle cx="360" cy="58" r="3" />
      </g>

      {/* テーブル。 */}
      <rect y="150" width="400" height="60" fill="#8a5a3a" />
      <rect y="150" width="400" height="8" fill="#a87f4a" />

      {/* 卓上のドミノ牌(すでに並んだ列)。 */}
      <g strokeLinejoin="round">
        <rect x="120" y="130" width="16" height="26" rx="2" fill="#f6efe2" stroke="#241a10" strokeWidth="1.6" />
        <circle cx="128" cy="138" r="1.6" fill="#241a10" />
        <circle cx="128" cy="148" r="1.6" fill="#241a10" />
        <rect x="140" y="130" width="16" height="26" rx="2" fill="#f6efe2" stroke="#241a10" strokeWidth="1.6" />
        <circle cx="148" cy="136" r="1.6" fill="#241a10" />
        <circle cx="148" cy="142" r="1.6" fill="#241a10" />
        <circle cx="148" cy="148" r="1.6" fill="#241a10" />
      </g>

      {/* 手(新しい牌を置く)。 */}
      <g className="idn-dm-hand">
        <rect x="150" y="90" width="16" height="24" rx="3" fill="#f6efe2" stroke="#241a10" strokeWidth="1.6" />
        <circle cx="154" cy="98" r="1.6" fill="#241a10" />
        <circle cx="162" cy="106" r="1.6" fill="#241a10" />
        <circle cx="154" cy="106" r="1.6" fill="#241a10" />
        <path d="M158,114 q6,20 0,40" stroke="#c9a877" strokeWidth="10" strokeLinecap="round" fill="none" />
      </g>

      {/* コーヒーカップ(負けた側へ滑っていく)。 */}
      <g className="idn-dm-cup" strokeLinejoin="round">
        <rect x="60" y="170" width="22" height="16" rx="2" fill="#f6efe2" stroke="#241a10" strokeWidth="1.8" />
        <path d="M82,174c6,0 6,10 0,10" fill="none" stroke="#241a10" strokeWidth="1.8" />
        <rect x="63" y="170" width="16" height="4" fill="#3a2f24" />
      </g>

      <style>{`
        .idn-dm-hand {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: idn-dm-place 2.6s ease-in-out infinite;
        }
        @keyframes idn-dm-place {
          0% { transform: translateY(-6px); opacity: 0; }
          20% { opacity: 1; }
          45% { transform: translateY(30px); }
          60% { transform: translateY(30px); }
          80% { transform: translateY(-6px); opacity: 1; }
          100% { transform: translateY(-6px); opacity: 0; }
        }
        .idn-dm-cup {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: idn-dm-slide 2.6s ease-in-out infinite;
        }
        @keyframes idn-dm-slide {
          0% { transform: translateX(0); }
          45% { transform: translateX(0); }
          70% { transform: translateX(-28px); }
          100% { transform: translateX(-28px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .idn-dm-hand { animation: none; opacity: 1; transform: translateY(30px); }
          .idn-dm-cup { animation: none; transform: translateX(-28px); }
        }
      `}</style>
    </svg>
  );
}
