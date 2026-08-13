/**
 * ブヨの大群が押し寄せる。虫よけが切れたハイカーの頭のまわりを
 * 小さな黒い点の群れが渦を巻くように飛び回る。
 *
 * 動くのはブヨの群れと、それを払う手だけ。
 */
export function CanadaBlackflySwarm() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* ボレアル林のハイキング道。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="90" fill="#a8d4ec" />
      <rect y="130" width="400" height="80" fill="#2f5f3f" />
      <path d="M0,130c60,-14 120,-14 180,0c60,-14 140,-14 220,0v10H0z" fill="#3f7f4f" />

      {/* 遠くの針葉樹。 */}
      <g fill="#1a5f3f">
        <path d="M60,130l-14,24h28z" /><path d="M340,130l-14,24h28z" />
      </g>

      {/* ジャケットを鼻まで上げた人。 */}
      <g strokeLinejoin="round">
        <rect x="176" y="120" width="48" height="70" rx="8" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="200" cy="104" r="18" fill="#d9a273" stroke="#20364a" strokeWidth="2.5" />
        <path d="M182,110 a18,14 0 0 0 36,0z" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="192" cy="100" r="2" fill="#20364a" />
        <circle cx="208" cy="100" r="2" fill="#20364a" />
      </g>

      {/* 払う手。ここが動く。 */}
      <g className="cbs-hand" transform="translate(224,120)">
        <path d="M0,0 L26,-14" stroke="#d9a273" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>

      {/* ブヨの群れ。ここが渦を巻いて動く。 */}
      <g className="cbs-swarm" fill="#20232a">
        <circle className="cbs-fly cbs-fly1" cx="200" cy="80" r="2.4" />
        <circle className="cbs-fly cbs-fly2" cx="200" cy="80" r="2" />
        <circle className="cbs-fly cbs-fly3" cx="200" cy="80" r="2.2" />
        <circle className="cbs-fly cbs-fly4" cx="200" cy="80" r="1.8" />
        <circle className="cbs-fly cbs-fly5" cx="200" cy="80" r="2" />
        <circle className="cbs-fly cbs-fly6" cx="200" cy="80" r="2.2" />
      </g>

      <style>{`
        .cbs-hand {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: cbs-wave 1s ease-in-out infinite;
        }
        @keyframes cbs-wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-30deg); }
        }
        .cbs-fly {
          transform-origin: 200px 80px;
          animation: cbs-orbit 2.2s linear infinite;
        }
        .cbs-fly2 { animation-delay: -0.35s; }
        .cbs-fly3 { animation-delay: -0.7s; }
        .cbs-fly4 { animation-delay: -1.05s; }
        .cbs-fly5 { animation-delay: -1.4s; }
        .cbs-fly6 { animation-delay: -1.75s; }
        @keyframes cbs-orbit {
          0% { transform: rotate(0deg) translate(16px, 0); }
          100% { transform: rotate(360deg) translate(16px, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cbs-hand, .cbs-fly { animation: none; }
          .cbs-hand { transform: rotate(-30deg); }
          .cbs-fly1 { transform: rotate(0deg) translate(16px, 0); }
          .cbs-fly2 { transform: rotate(60deg) translate(16px, 0); }
          .cbs-fly3 { transform: rotate(120deg) translate(16px, 0); }
          .cbs-fly4 { transform: rotate(180deg) translate(16px, 0); }
          .cbs-fly5 { transform: rotate(240deg) translate(16px, 0); }
          .cbs-fly6 { transform: rotate(300deg) translate(16px, 0); }
        }
      `}</style>
    </svg>
  );
}
