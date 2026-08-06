/**
 * 遮断機の連続。五十キロごとに券を取り、列に並び、金額が変わる。
 *
 * 料金所の島が並び、手前の遮断機は下りたまま。運転席から腕が伸びて
 * 発券機の券を引き抜くと、その先にまた次の遮断機が見えている。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function PeageAutoroute() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇りの空 */}
      <rect width="400" height="210" fill="#5a6472" />
      <rect width="400" height="62" fill="#4c5665" />
      <g fill="#66707e" opacity="0.7">
        <ellipse cx="90" cy="26" rx="74" ry="18" />
        <ellipse cx="290" cy="18" rx="86" ry="16" />
      </g>

      {/* 料金所の屋根 */}
      <rect x="0" y="52" width="400" height="18" fill="#3f4855" />
      <rect x="0" y="52" width="400" height="6" fill="#4c5665" />
      <g fill="#5f6875">
        <rect x="46" y="70" width="10" height="66" />
        <rect x="182" y="70" width="10" height="66" />
        <rect x="318" y="70" width="10" height="66" />
      </g>

      {/* 奥に続く次の遮断機 */}
      <g opacity="0.55">
        <rect x="196" y="88" width="6" height="34" fill="#8d949c" />
        <g fill="#e8443f">
          <rect x="202" y="92" width="52" height="7" rx="3" />
        </g>
        <rect x="332" y="94" width="5" height="28" fill="#8d949c" />
        <rect x="337" y="97" width="40" height="6" rx="3" fill="#e8443f" />
      </g>

      {/* 路面 */}
      <rect y="122" width="400" height="88" fill="#4a4d55" />
      <rect y="122" width="400" height="5" fill="#585c65" />
      <g fill="#c9bda4">
        <rect x="20" y="196" width="40" height="6" rx="3" />
        <rect x="96" y="196" width="40" height="6" rx="3" />
        <rect x="172" y="196" width="40" height="6" rx="3" />
        <rect x="248" y="196" width="40" height="6" rx="3" />
        <rect x="324" y="196" width="40" height="6" rx="3" />
      </g>

      {/* 島と発券機 */}
      <g transform="translate(212,158)">
        <rect x="-26" y="-6" width="52" height="52" rx="4" fill="#7a828c" />
        <rect x="-26" y="-6" width="52" height="6" rx="3" fill="#8d949c" />
        <rect x="-16" y="-52" width="32" height="48" rx="5" fill="#5f6875" />
        <rect x="-16" y="-52" width="32" height="8" rx="4" fill="#6f7783" />
        <rect x="-10" y="-42" width="20" height="14" rx="2" fill="#2b3038" />
        <rect x="-11" y="-22" width="22" height="4" rx="2" fill="#2b3038" />
        {/* 出てくる券 */}
        <g className="pau-ticket">
          <rect x="-9" y="-24" width="18" height="12" rx="1.5" fill="#f6efe2" />
          <rect x="-6" y="-20" width="12" height="3" rx="1.5" fill="#9aa4ae" />
        </g>
      </g>

      {/* 下りたままの遮断機 */}
      <g transform="translate(238,132)">
        <rect x="-7" y="0" width="14" height="42" rx="4" fill="#8d949c" />
        <g className="pau-boom">
          <rect x="0" y="-5" width="130" height="10" rx="5" fill="#f6efe2" />
          <g fill="#e8443f">
            <rect x="6" y="-5" width="20" height="10" />
            <rect x="46" y="-5" width="20" height="10" />
            <rect x="86" y="-5" width="20" height="10" />
          </g>
          <circle cx="128" cy="0" r="6" fill="#e8443f" />
        </g>
        <circle className="pau-lamp" cx="0" cy="-12" r="6" fill="#e8443f" />
      </g>

      {/* 券を取る車 */}
      <g transform="translate(120,168)">
        <g className="pau-car">
          <path d="M-62,4 q10,-30 30,-32 l42,0 q22,4 32,32z" fill="#5b8fe8" />
          <path d="M-40,-8 q8,-18 22,-20 l30,0 q16,4 24,20z" fill="#a8cfe4" />
          <rect x="-64" y="0" width="128" height="20" rx="8" fill="#4a76c4" />
          <rect x="-30" y="-42" width="56" height="14" rx="4" fill="#3f4a58" />
          <circle cx="-38" cy="22" r="11" fill="#2b3038" />
          <circle cx="38" cy="22" r="11" fill="#2b3038" />
          <circle cx="-38" cy="22" r="4" fill="#6f7783" />
          <circle cx="38" cy="22" r="4" fill="#6f7783" />
          {/* 券を取る腕 */}
          <g className="pau-arm">
            <rect x="44" y="-14" width="50" height="11" rx="5" fill="#f0e2cf" />
            <ellipse cx="96" cy="-9" rx="10" ry="8" fill="#f0e2cf" />
          </g>
        </g>
      </g>

      {/* 並んで待つ後続 */}
      <g transform="translate(6,180)">
        <g className="pau-queue">
          <path d="M-40,2 q8,-22 24,-24 l32,0 q18,3 24,24z" fill="#9c6a5c" />
          <rect x="-42" y="0" width="94" height="16" rx="7" fill="#7d5348" />
          <circle cx="-22" cy="18" r="9" fill="#2b3038" />
          <circle cx="30" cy="18" r="9" fill="#2b3038" />
        </g>
      </g>

      <style>{`
        .pau-boom { transform-box: fill-box; transform-origin: left center; animation: pau-bar 5s ease-in-out infinite; }
        .pau-lamp { animation: pau-blink 1s steps(1, end) infinite; }
        .pau-ticket { transform-box: fill-box; transform-origin: 50% 100%; animation: pau-issue 5s ease-out infinite; }
        .pau-arm { transform-box: fill-box; transform-origin: left center; animation: pau-take 5s ease-in-out infinite; }
        .pau-car { transform-box: fill-box; transform-origin: 50% 100%; animation: pau-creep 5s ease-in-out infinite; }
        .pau-queue { transform-box: fill-box; transform-origin: 50% 100%; animation: pau-nudge 5s ease-in-out infinite; }
        @keyframes pau-bar {
          0%, 74% { transform: rotate(0deg); }
          88%, 100% { transform: rotate(-6deg); }
        }
        @keyframes pau-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
        }
        @keyframes pau-issue {
          0%, 16% { transform: translate(0, 8px) scaleY(0.1); opacity: 0; }
          30% { transform: translate(0, 0) scaleY(1); opacity: 1; }
          58% { transform: translate(0, 0) scaleY(1); opacity: 1; }
          72%, 100% { transform: translate(-16px, -6px) scaleY(1); opacity: 0; }
        }
        @keyframes pau-take {
          0%, 22% { transform: translate(0, 0); }
          46%, 60% { transform: translate(16px, 12px); }
          82%, 100% { transform: translate(0, 0); }
        }
        @keyframes pau-creep {
          0%, 70% { transform: translate(0, 0); }
          92%, 100% { transform: translate(16px, 0); }
        }
        @keyframes pau-nudge {
          0%, 74% { transform: translate(0, 0); }
          94%, 100% { transform: translate(12px, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pau-boom, .pau-lamp, .pau-ticket, .pau-arm, .pau-car, .pau-queue { animation: none; }
        }
      `}</style>
    </svg>
  );
}
