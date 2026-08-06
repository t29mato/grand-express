/**
 * 市の立つ日。六時の設営と一時の撤収を手伝い、小銭と売れ残りをもらう。
 *
 * 縞の日除けの下に木箱が積まれ、野菜が並ぶ。撤収の刻限が来て、
 * 店主が硬貨を数えて渡し、売れ残りの籠を押しつけてくる。
 * 背に見えるのは、その市の日を中世から動かしていない教会の鐘楼。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function JourDeMarche() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 朝の広場 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect width="400" height="52" fill="#a8d4f0" />
      <circle cx="52" cy="40" r="20" fill="#f5e6a8" />

      {/* 鐘楼と町並み */}
      <g fill="#9c8f76">
        <rect x="292" y="18" width="52" height="94" />
        <path d="M286,18 L318,-6 L350,18z" fill="#7d6f56" />
        <rect x="306" y="40" width="24" height="30" rx="12" fill="#5c5344" />
        <circle cx="318" cy="52" r="7" fill="#c9a877" />
      </g>
      <g fill="#b0a288">
        <rect x="0" y="52" width="96" height="60" />
        <rect x="104" y="42" width="86" height="70" />
        <rect x="198" y="58" width="84" height="54" />
      </g>
      <g fill="#6b6252">
        <rect x="16" y="66" width="18" height="24" rx="2" />
        <rect x="48" y="66" width="18" height="24" rx="2" />
        <rect x="122" y="58" width="18" height="26" rx="2" />
        <rect x="156" y="58" width="18" height="26" rx="2" />
        <rect x="216" y="72" width="18" height="24" rx="2" />
        <rect x="248" y="72" width="18" height="24" rx="2" />
      </g>

      {/* 敷石 */}
      <rect y="112" width="400" height="98" fill="#c9bda4" />
      <rect y="112" width="400" height="6" fill="#d8ceb8" />
      <g stroke="#b8ab92" strokeWidth="3" fill="none">
        <path d="M0,140 L400,140" />
        <path d="M0,172 L400,172" />
        <path d="M60,112 L60,210 M180,112 L180,210 M300,112 L300,210" />
      </g>

      {/* 縞の日除け */}
      <g transform="translate(150,96)">
        <g className="jdm-awning">
          <path d="M-128,0 l256,0 l-14,-30 -228,0z" fill="#e8443f" />
          <path d="M-100,0 l-12,-30 l24,0 l10,30z" fill="#f6efe2" />
          <path d="M-42,0 l-8,-30 l24,0 l6,30z" fill="#f6efe2" />
          <path d="M16,0 l-4,-30 l24,0 l2,30z" fill="#f6efe2" />
          <path d="M74,0 l0,-30 l24,0 l-2,30z" fill="#f6efe2" />
          <rect x="-128" y="-2" width="256" height="7" rx="3" fill="#c0362f" />
        </g>
      </g>
      <g fill="#8d7d5c">
        <rect x="24" y="100" width="6" height="62" />
        <rect x="270" y="100" width="6" height="62" />
      </g>

      {/* 台と木箱 */}
      <rect x="34" y="128" width="230" height="12" rx="3" fill="#a8814a" />
      <rect x="34" y="140" width="230" height="24" fill="#8d6b3c" />
      <g>
        <rect x="46" y="106" width="52" height="24" rx="3" fill="#b8894e" />
        <g fill="#5c8a3a">
          <circle cx="58" cy="106" r="8" />
          <circle cx="72" cy="103" r="8" />
          <circle cx="86" cy="106" r="8" />
        </g>
        <rect x="108" y="108" width="52" height="22" rx="3" fill="#b8894e" />
        <g fill="#e8863f">
          <circle cx="120" cy="108" r="7" />
          <circle cx="134" cy="105" r="7" />
          <circle cx="148" cy="108" r="7" />
        </g>
        <rect x="170" y="106" width="52" height="24" rx="3" fill="#b8894e" />
        <g fill="#c0362f">
          <circle cx="182" cy="106" r="7" />
          <circle cx="196" cy="103" r="7" />
          <circle cx="210" cy="106" r="7" />
        </g>
      </g>

      {/* 畳まれていく木箱 */}
      <g transform="translate(300,160)">
        <g className="jdm-crate">
          <rect x="-26" y="-18" width="52" height="20" rx="3" fill="#a8814a" />
          <rect x="-26" y="-18" width="52" height="5" rx="2" fill="#b8894e" />
          <rect x="-22" y="-38" width="44" height="18" rx="3" fill="#8d6b3c" />
        </g>
      </g>

      {/* 店主 */}
      <g transform="translate(96,178)">
        <g className="jdm-seller">
          <path d="M-22,4 q22,-26 44,0z" fill="#4a5866" />
          <rect x="-18" y="-34" width="36" height="40" rx="10" fill="#5b6a7a" />
          <rect x="-18" y="-22" width="36" height="8" fill="#3f4a58" />
          <circle cx="0" cy="-48" r="15" fill="#f0e2cf" />
          <path d="M-16,-52 a16,16 0 0 1 32,0 l0,3 -32,0z" fill="#5c5344" />
          <circle cx="-5" cy="-47" r="2.6" fill="#2a1f18" />
          <circle cx="6" cy="-47" r="2.6" fill="#2a1f18" />
          <path
            d="M-5,-40 q6,4 11,0"
            stroke="#c98a6c"
            strokeWidth="2.4"
            fill="none"
          />
          {/* 硬貨を渡す腕 */}
          <g className="jdm-give">
            <rect x="14" y="-32" width="36" height="11" rx="5" fill="#5b6a7a" />
            <ellipse cx="52" cy="-27" rx="11" ry="9" fill="#f0e2cf" />
          </g>
        </g>
      </g>

      {/* 渡される硬貨 */}
      <g transform="translate(158,150)">
        <g className="jdm-coin-a">
          <circle r="8" fill="#f5b31c" />
          <circle r="3.5" fill="#c98f10" />
        </g>
      </g>
      <g transform="translate(150,158)">
        <g className="jdm-coin-b">
          <circle r="7" fill="#f5b31c" />
          <circle r="3" fill="#c98f10" />
        </g>
      </g>

      {/* 売れ残りの籠 */}
      <g transform="translate(320,196)">
        <g className="jdm-basket">
          <path d="M-30,-24 l60,0 l-7,24 -46,0z" fill="#c9a877" />
          <g stroke="#a8895c" strokeWidth="3" fill="none">
            <path d="M-26,-16 L26,-16" />
            <path d="M-24,-8 L24,-8" />
          </g>
          <ellipse cx="0" cy="-24" rx="30" ry="7" fill="#b89a6c" />
          <g fill="#5c8a3a">
            <circle cx="-12" cy="-28" r="8" />
            <circle cx="2" cy="-31" r="8" />
          </g>
          <circle cx="16" cy="-28" r="7" fill="#e8863f" />
        </g>
      </g>

      <style>{`
        .jdm-awning { transform-box: fill-box; transform-origin: 50% 0; animation: jdm-flap 3.4s ease-in-out infinite; }
        .jdm-seller { transform-box: fill-box; transform-origin: 50% 100%; animation: jdm-bob 3.2s ease-in-out infinite; }
        .jdm-give { transform-box: fill-box; transform-origin: left center; animation: jdm-hand 3.2s ease-in-out infinite; }
        .jdm-coin-a { transform-box: fill-box; transform-origin: center; opacity: 0; animation: jdm-pay 3.2s ease-out infinite; }
        .jdm-coin-b { transform-box: fill-box; transform-origin: center; opacity: 0; animation: jdm-pay 3.2s ease-out infinite; animation-delay: -0.4s; }
        .jdm-basket { transform-box: fill-box; transform-origin: 50% 100%; animation: jdm-offer 3.2s ease-in-out infinite; }
        .jdm-crate { transform-box: fill-box; transform-origin: 50% 100%; animation: jdm-stack 3.2s ease-in-out infinite; }
        @keyframes jdm-flap {
          0%, 100% { transform: skewX(0deg) scaleY(1); }
          50% { transform: skewX(-2deg) scaleY(1.04); }
        }
        @keyframes jdm-bob {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -3px); }
        }
        @keyframes jdm-hand {
          0%, 20% { transform: rotate(0deg); }
          46%, 70% { transform: rotate(-16deg); }
          92%, 100% { transform: rotate(0deg); }
        }
        @keyframes jdm-pay {
          0%, 24% { transform: translate(-30px, 6px) scale(0.6); opacity: 0; }
          40% { transform: translate(-8px, -6px) scale(1); opacity: 1; }
          74% { transform: translate(22px, -14px) scale(1); opacity: 1; }
          94%, 100% { transform: translate(44px, -4px) scale(0.9); opacity: 0; }
        }
        @keyframes jdm-offer {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(0, -6px) rotate(-3deg); }
        }
        @keyframes jdm-stack {
          0%, 40% { transform: translate(0, 0); }
          60%, 100% { transform: translate(0, -4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jdm-awning, .jdm-seller, .jdm-give, .jdm-coin-a, .jdm-coin-b,
          .jdm-basket, .jdm-crate { animation: none; }
        }
      `}</style>
    </svg>
  );
}
