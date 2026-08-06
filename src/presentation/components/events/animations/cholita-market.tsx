/**
 * 市場のチョリータがまとめ買いを値引きし、さらに「ヤパ」(おまけ)まで載せてくれる。
 *
 *   - 山高帽のおばちゃんの手からおまけの果物が籠へ飛ぶ
 *   - 多めに返ってきた釣り銭が客の手元へ弧を描く
 */
export function CholitaMarket() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高原の空と乾いた地面 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <path d="M0,104 L54,58 L104,104z" fill="#7d93ad" />
      <path d="M84,104 L150,46 L214,104z" fill="#6e83a0" />
      <path d="M196,104 L262,62 L330,104z" fill="#7d93ad" />
      <path d="M306,104 L360,66 L400,104z" fill="#6e83a0" />
      <rect y="104" width="400" height="106" fill="#c9a877" />

      {/* 屋台の日よけ */}
      <rect x="70" y="46" width="6" height="104" fill="#8a5c38" />
      <rect x="270" y="46" width="6" height="104" fill="#8a5c38" />
      <g>
        <rect x="56" y="24" width="230" height="8" fill="#e8443f" />
        <rect x="56" y="32" width="230" height="8" fill="#f5b31c" />
        <rect x="56" y="40" width="230" height="8" fill="#2f8f5b" />
      </g>
      <g className="chol-fringe" fill="#f6efe2">
        <circle cx="66" cy="48" r="6" />
        <circle cx="88" cy="48" r="6" />
        <circle cx="110" cy="48" r="6" />
        <circle cx="132" cy="48" r="6" />
        <circle cx="154" cy="48" r="6" />
        <circle cx="176" cy="48" r="6" />
        <circle cx="198" cy="48" r="6" />
        <circle cx="220" cy="48" r="6" />
        <circle cx="242" cy="48" r="6" />
        <circle cx="264" cy="48" r="6" />
      </g>

      {/* 売り子(チョリータ) */}
      <g transform="translate(116,142)">
        <path d="M-26,0 L-16,-48 L16,-48 L26,0z" fill="#c2447a" />
        <path d="M-23,-14 L-17,-46 L17,-46 L23,-14z" fill="#e8443f" />
        <rect x="-21" y="-34" width="42" height="5" fill="#f5b31c" />
        <rect x="-21" y="-25" width="42" height="5" fill="#2f8f5b" />
        <circle cx="0" cy="-58" r="13" fill="#d9a273" />
        <g fill="#241c1a">
          <rect x="-18" y="-54" width="6" height="34" rx="3" />
          <rect x="12" y="-54" width="6" height="34" rx="3" />
        </g>
        <circle cx="-15" cy="-18" r="4" fill="#e8443f" />
        <circle cx="15" cy="-18" r="4" fill="#e8443f" />
        <ellipse cx="0" cy="-66" rx="22" ry="5" fill="#3f3540" />
        <rect x="-12" y="-80" width="24" height="15" rx="3" fill="#3f3540" />
        <rect x="-12" y="-70" width="24" height="4" fill="#8a6a44" />
        <g className="chol-arm">
          <rect x="12" y="-46" width="30" height="8" rx="4" fill="#d9a273" />
          <circle cx="44" cy="-42" r="6" fill="#d9a273" />
        </g>
      </g>

      {/* 台と山積みの野菜 */}
      <g>
        <circle cx="96" cy="132" r="9" fill="#e8802f" />
        <circle cx="112" cy="134" r="9" fill="#e8802f" />
        <circle cx="104" cy="122" r="9" fill="#f0913f" />
        <circle cx="146" cy="133" r="8" fill="#b08b5a" />
        <circle cx="162" cy="134" r="8" fill="#b08b5a" />
        <circle cx="154" cy="124" r="8" fill="#c49b66" />
        <circle cx="196" cy="133" r="8" fill="#4f9e4a" />
        <circle cx="212" cy="134" r="8" fill="#4f9e4a" />
        <circle cx="204" cy="124" r="8" fill="#5cb054" />
      </g>
      <rect x="64" y="140" width="216" height="12" fill="#8a5c38" />
      <rect x="64" y="152" width="216" height="24" fill="#6b4630" />

      {/* 客の籠 */}
      <g transform="translate(238,140)">
        <circle cx="-8" cy="-24" r="8" fill="#e8443f" />
        <circle cx="8" cy="-24" r="8" fill="#e8802f" />
        <path d="M-20,-20 L20,-20 L15,0 L-15,0z" fill="#c98f4e" />
        <rect x="-19" y="-16" width="38" height="4" fill="#a87038" />
        <rect x="-17" y="-8" width="34" height="4" fill="#a87038" />
      </g>

      {/* おまけのヤパ */}
      <g transform="translate(196,74)">
        <g className="chol-yapa">
          <circle cx="0" cy="0" r="8" fill="#f0913f" />
          <path d="M0,-7 L7,-13 L2,-4z" fill="#2f8f5b" />
        </g>
      </g>

      {/* 多めに返る釣り銭 */}
      <g fill="#f5b31c">
        <circle className="chol-coin-a" cx="268" cy="112" r="7" />
        <circle className="chol-coin-b" cx="258" cy="124" r="6" />
      </g>
      <g className="chol-spark" fill="#f6efe2">
        <path d="M286,96 L289,104 L297,107 L289,110 L286,118 L283,110 L275,107 L283,104z" />
      </g>

      {/* 客 */}
      <g transform="translate(334,182)">
        <ellipse cx="0" cy="6" rx="20" ry="5" fill="#a8864f" />
        <rect x="-9" y="-14" width="7" height="20" rx="3" fill="#2f3b4f" />
        <rect x="2" y="-14" width="7" height="20" rx="3" fill="#2f3b4f" />
        <rect x="-17" y="-50" width="34" height="40" rx="9" fill="#3b4a63" />
        <rect x="-12" y="-44" width="24" height="26" rx="7" fill="#2f8f5b" />
        <circle cx="0" cy="-60" r="12" fill="#e8c39e" />
        <path d="M-12,-62 a12,12 0 0 1 24,0z" fill="#3b2f2a" />
        <rect x="-44" y="-48" width="30" height="8" rx="4" fill="#e8c39e" />
        <circle cx="-46" cy="-44" r="6" fill="#e8c39e" />
      </g>

      <style>{`
        .chol-yapa { animation: chol-toss 2.4s ease-in-out infinite; }
        .chol-arm { transform-box: fill-box; transform-origin: 0 50%; animation: chol-offer 2.4s ease-in-out infinite; }
        .chol-fringe { animation: chol-sway 3.2s ease-in-out infinite; }
        .chol-coin-a { animation: chol-change 2s ease-out infinite; }
        .chol-coin-b { animation: chol-change 2s ease-out infinite; animation-delay: -0.9s; }
        .chol-spark { transform-box: fill-box; transform-origin: 50% 50%; animation: chol-twinkle 2s ease-in-out infinite; }
        @keyframes chol-toss {
          0% { transform: translate(-36px, 28px); opacity: 0; }
          14% { opacity: 1; }
          46% { transform: translate(2px, -6px); }
          88% { transform: translate(30px, 44px); opacity: 1; }
          100% { transform: translate(30px, 44px); opacity: 0; }
        }
        @keyframes chol-offer {
          0%, 100% { transform: rotate(0deg); }
          40% { transform: rotate(-16deg); }
        }
        @keyframes chol-sway {
          0%, 100% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
        }
        @keyframes chol-change {
          0% { transform: translate(-14px, 12px); opacity: 0; }
          20% { opacity: 1; }
          60% { transform: translate(10px, -10px); }
          100% { transform: translate(26px, 18px); opacity: 0; }
        }
        @keyframes chol-twinkle {
          0%, 100% { transform: scale(0.4); opacity: 0.2; }
          50% { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chol-yapa, .chol-arm, .chol-fringe, .chol-coin-a, .chol-coin-b,
          .chol-spark { animation: none; }
        }
      `}</style>
    </svg>
  );
}
