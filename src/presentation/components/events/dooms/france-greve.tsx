/**
 * ストライキの日。地下鉄の入口はシャッターが下り、予告の貼り紙が一枚。
 *
 * 大通りの奥を赤い旗の行列が通っていく。手前では旅人が
 * 鞄に腰かけ、腕時計を見ては空を仰ぐ。待つよりほかにない。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function FranceGreve() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの大通り */}
      <rect width="400" height="210" fill="#33404f" />
      <rect width="400" height="96" fill="#2a3543" />

      {/* オスマン様式の並び */}
      <g fill="#3d4a58">
        <rect x="0" y="14" width="120" height="84" />
        <rect x="128" y="4" width="132" height="94" />
        <rect x="268" y="18" width="132" height="80" />
      </g>
      <g fill="#222c38">
        <rect x="14" y="30" width="18" height="26" rx="2" />
        <rect x="46" y="30" width="18" height="26" rx="2" />
        <rect x="78" y="30" width="18" height="26" rx="2" />
        <rect x="142" y="22" width="18" height="28" rx="2" />
        <rect x="176" y="22" width="18" height="28" rx="2" />
        <rect x="210" y="22" width="18" height="28" rx="2" />
        <rect x="282" y="34" width="18" height="26" rx="2" />
        <rect x="316" y="34" width="18" height="26" rx="2" />
        <rect x="350" y="34" width="18" height="26" rx="2" />
      </g>
      <g fill="#4a5766">
        <rect x="0" y="62" width="400" height="5" />
        <rect x="0" y="92" width="400" height="6" />
      </g>

      {/* 行列(旅人と重ならないよう右へ寄せる) */}
      <g transform="translate(40,0)">
        <g fill="#1d2833">
          <g className="fgr-march-a">
            <circle cx="58" cy="112" r="11" />
            <rect x="46" y="124" width="24" height="40" rx="9" />
          </g>
          <g className="fgr-march-b">
            <circle cx="92" cy="110" r="11" />
            <rect x="80" y="122" width="24" height="42" rx="9" />
          </g>
          <g className="fgr-march-c">
            <circle cx="128" cy="113" r="11" />
            <rect x="116" y="125" width="24" height="40" rx="9" />
          </g>
          <g className="fgr-march-d">
            <circle cx="166" cy="110" r="11" />
            <rect x="154" y="122" width="24" height="42" rx="9" />
          </g>
          <g className="fgr-march-e">
            <circle cx="202" cy="113" r="11" />
            <rect x="190" y="125" width="24" height="40" rx="9" />
          </g>
        </g>

        {/* 掲げられた横断幕と赤旗 */}
        <g fill="#5b6673">
          <rect x="70" y="72" width="5" height="46" />
          <rect x="188" y="72" width="5" height="46" />
        </g>
        <g transform="translate(131,82)">
          <g className="fgr-banner">
            <rect
              x="-59"
              y="-10"
              width="118"
              height="24"
              rx="3"
              fill="#e05252"
            />
            <rect x="-49" y="-3" width="46" height="6" rx="3" fill="#f6d8d8" />
            <rect x="5" y="-3" width="30" height="6" rx="3" fill="#f6d8d8" />
          </g>
        </g>
        <g transform="translate(206,88)">
          <g className="fgr-flag-a">
            <rect x="-2" y="-16" width="4" height="52" fill="#5b6673" />
            <path d="M2,-16 q16,6 32,0 l0,20 q-16,6 -32,0z" fill="#e05252" />
          </g>
        </g>
      </g>

      {/* 歩道 */}
      <rect y="164" width="400" height="46" fill="#4a4f56" />
      <rect y="164" width="400" height="6" fill="#5a6068" />

      {/* 閉まった地下鉄の入口 */}
      <g>
        <rect x="268" y="98" width="120" height="80" fill="#243b31" />
        <rect x="262" y="90" width="132" height="14" rx="5" fill="#2f6b4a" />
        <path d="M268,90 q60,-30 120,0z" fill="#2f6b4a" />
        <circle cx="286" cy="80" r="7" fill="#f5b31c" opacity="0.55" />
        <circle cx="370" cy="80" r="7" fill="#f5b31c" opacity="0.55" />
        {/* 下りたシャッター */}
        <rect x="276" y="104" width="104" height="74" fill="#6b7078" />
        <g stroke="#565b62" strokeWidth="4" fill="none">
          <path d="M276,114 L380,114" />
          <path d="M276,126 L380,126" />
          <path d="M276,138 L380,138" />
          <path d="M276,150 L380,150" />
          <path d="M276,162 L380,162" />
        </g>
        <rect x="276" y="174" width="104" height="6" fill="#494e55" />
      </g>
      {/* 予告の貼り紙 */}
      <g transform="translate(330,132)">
        <g className="fgr-notice">
          <rect x="-19" y="-24" width="38" height="48" rx="2" fill="#f6efe2" />
          <rect x="-12" y="-16" width="24" height="4" rx="2" fill="#8d96a0" />
          <rect x="-12" y="-7" width="24" height="4" rx="2" fill="#8d96a0" />
          <rect x="-12" y="2" width="16" height="4" rx="2" fill="#8d96a0" />
          <rect x="-12" y="12" width="20" height="7" rx="3" fill="#e05252" />
        </g>
      </g>

      {/* 鞄に腰かけて待つ旅人 */}
      <g transform="translate(56,164)">
        <rect x="-34" y="-22" width="68" height="24" rx="4" fill="#5c4632" />
        <rect x="-34" y="-22" width="68" height="6" rx="3" fill="#6e553c" />
        <rect x="-8" y="-28" width="16" height="8" rx="4" fill="#3f3022" />
        <g className="fgr-wait">
          <path d="M-16,-24 q16,-14 32,0 l4,-30 -40,0z" fill="#4a6a8a" />
          <rect x="-30" y="-46" width="26" height="9" rx="4" fill="#4a6a8a" />
          <circle cx="-32" cy="-42" r="6" fill="#f6efe2" />
          <circle cx="0" cy="-66" r="14" fill="#f6efe2" />
          <path d="M-14,-70 a14,14 0 0 1 28,0 l0,3 -28,0z" fill="#3a2a1e" />
          <circle cx="-5" cy="-64" r="2.6" fill="#2a1f18" />
          <circle cx="6" cy="-64" r="2.6" fill="#2a1f18" />
          <path
            d="M-5,-56 q5,-3 10,0"
            stroke="#a8654a"
            strokeWidth="2.4"
            fill="none"
          />
          {/* 腕時計 */}
          <rect x="-38" y="-46" width="9" height="6" rx="2" fill="#f5b31c" />
        </g>
      </g>

      <style>{`
        .fgr-march-a { transform-box: fill-box; transform-origin: 50% 100%; animation: fgr-step 1.4s ease-in-out infinite; }
        .fgr-march-b { transform-box: fill-box; transform-origin: 50% 100%; animation: fgr-step 1.4s ease-in-out infinite; animation-delay: -0.35s; }
        .fgr-march-c { transform-box: fill-box; transform-origin: 50% 100%; animation: fgr-step 1.4s ease-in-out infinite; animation-delay: -0.7s; }
        .fgr-march-d { transform-box: fill-box; transform-origin: 50% 100%; animation: fgr-step 1.4s ease-in-out infinite; animation-delay: -1.05s; }
        .fgr-march-e { transform-box: fill-box; transform-origin: 50% 100%; animation: fgr-step 1.4s ease-in-out infinite; animation-delay: -0.2s; }
        .fgr-banner { transform-box: fill-box; transform-origin: center; animation: fgr-slack 2.8s ease-in-out infinite; }
        .fgr-flag-a { transform-box: fill-box; transform-origin: 50% 100%; animation: fgr-wave 2.2s ease-in-out infinite; }

        .fgr-notice { transform-box: fill-box; transform-origin: left center; animation: fgr-peel 3.4s ease-in-out infinite; }
        .fgr-wait { transform-box: fill-box; transform-origin: 50% 100%; animation: fgr-sigh 4s ease-in-out infinite; }
        @keyframes fgr-step {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -4px); }
        }
        @keyframes fgr-slack {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(0, 3px) rotate(-1.5deg); }
        }
        @keyframes fgr-wave {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes fgr-peel {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes fgr-sigh {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          40% { transform: rotate(-4deg) translate(0, 2px); }
          70% { transform: rotate(2deg) translate(0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fgr-march-a, .fgr-march-b, .fgr-march-c, .fgr-march-d, .fgr-march-e,
          .fgr-banner, .fgr-flag-a, .fgr-notice, .fgr-wait { animation: none; }
        }
      `}</style>
    </svg>
  );
}
