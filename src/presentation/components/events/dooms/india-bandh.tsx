/**
 * バンド(全面ストライキ)。店のシャッターが次々と下り、バスも止まる。
 *
 * 赤い旗が立ち、日が傾いても何も動かない。荷物に腰かけて待つほかない。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function IndiaBandh() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 傾きかけた空 */}
      <rect width="400" height="210" fill="#2a3550" />
      <g transform="translate(210,42)">
        <g className="ibn-sun">
          <circle r="17" fill="#e8a44a" />
          <circle r="26" fill="#e8a44a" opacity="0.25" />
        </g>
      </g>
      <g fill="#33425a">
        <rect x="16" y="30" width="46" height="40" />
        <rect x="120" y="22" width="38" height="48" />
        <rect x="300" y="26" width="52" height="44" />
      </g>

      {/* 商店の並び */}
      <rect y="62" width="400" height="98" fill="#3a4a5a" />
      <rect y="62" width="400" height="8" fill="#46586a" />
      <g fill="#1c2836">
        <rect x="18" y="76" width="22" height="18" rx="2" />
        <rect x="58" y="76" width="22" height="18" rx="2" />
        <rect x="166" y="76" width="22" height="18" rx="2" />
        <rect x="206" y="76" width="22" height="18" rx="2" />
        <rect x="312" y="76" width="22" height="18" rx="2" />
        <rect x="352" y="76" width="22" height="18" rx="2" />
      </g>
      <g fill="#f5b31c">
        <rect className="ibn-win-a" x="58" y="76" width="22" height="18" rx="2" />
        <rect className="ibn-win-b" x="312" y="76" width="22" height="18" rx="2" />
      </g>

      {/* 店先(看板・軒・シャッター) */}
      <g>
        <rect x="14" y="100" width="96" height="10" fill="#c9563a" />
        <rect x="150" y="100" width="96" height="10" fill="#3a7a5a" />
        <rect x="286" y="100" width="96" height="10" fill="#c9963a" />
        <g fill="#16202c">
          <rect x="14" y="110" width="96" height="50" />
          <rect x="150" y="110" width="96" height="50" />
          <rect x="286" y="110" width="96" height="50" />
        </g>
      </g>
      <g>
        <g transform="translate(14,110)">
          <g className="ibn-shutter-a">
            <rect width="96" height="50" fill="#8a94a0" />
            <g fill="#6e7884">
              <rect y="10" width="96" height="3" />
              <rect y="22" width="96" height="3" />
              <rect y="34" width="96" height="3" />
              <rect y="45" width="96" height="5" />
            </g>
          </g>
        </g>
        <g transform="translate(150,110)">
          <g className="ibn-shutter-b">
            <rect width="96" height="50" fill="#8a94a0" />
            <g fill="#6e7884">
              <rect y="10" width="96" height="3" />
              <rect y="22" width="96" height="3" />
              <rect y="34" width="96" height="3" />
              <rect y="45" width="96" height="5" />
            </g>
          </g>
        </g>
        <g transform="translate(286,110)">
          <g className="ibn-shutter-c">
            <rect width="96" height="50" fill="#8a94a0" />
            <g fill="#6e7884">
              <rect y="10" width="96" height="3" />
              <rect y="22" width="96" height="3" />
              <rect y="34" width="96" height="3" />
              <rect y="45" width="96" height="5" />
            </g>
          </g>
        </g>
      </g>

      {/* 通り */}
      <rect y="160" width="400" height="50" fill="#2b3340" />
      <rect y="160" width="400" height="4" fill="#39424f" />

      {/* 止まったままのバス */}
      <g>
        <rect x="252" y="112" width="148" height="52" rx="7" fill="#40566e" />
        <rect x="252" y="126" width="148" height="7" fill="#e8a44a" />
        <g fill="#1f2c3a">
          <rect x="260" y="136" width="26" height="18" rx="2" />
          <rect x="292" y="136" width="26" height="18" rx="2" />
          <rect x="324" y="136" width="26" height="18" rx="2" />
          <rect x="356" y="136" width="26" height="18" rx="2" />
          <rect x="256" y="116" width="140" height="8" rx="3" />
        </g>
        <rect x="252" y="160" width="148" height="6" fill="#2c3d4f" />
        <circle cx="284" cy="170" r="12" fill="#1a222c" />
        <circle cx="284" cy="170" r="5" fill="#33414f" />
        <circle cx="366" cy="170" r="12" fill="#1a222c" />
        <circle cx="366" cy="170" r="5" fill="#33414f" />
      </g>

      {/* ストライキの赤旗 */}
      <g>
        <rect x="60" y="96" width="5" height="96" fill="#4a4038" />
        <g transform="translate(65,100)">
          <g className="ibn-flag">
            <path d="M0,0 L48,4 L48,26 L0,24z" fill="#e05252" />
            <path d="M0,0 L48,4 L48,10 L0,8z" fill="#f07070" />
          </g>
        </g>
      </g>

      {/* 荷物に腰かけて待つ旅人 */}
      <g transform="translate(128,196)">
        <rect x="-26" y="-26" width="52" height="26" rx="3" fill="#8a6a3a" />
        <rect x="-26" y="-19" width="52" height="4" fill="#6e5229" />
        <rect x="-9" y="-31" width="18" height="6" rx="3" fill="#6e5229" />
        <g className="ibn-wait">
          <rect x="-15" y="-64" width="30" height="40" rx="10" fill="#e8a44a" />
          <rect x="8" y="-56" width="26" height="10" rx="5" fill="#e8a44a" />
          <rect x="26" y="-52" width="12" height="26" rx="6" fill="#e8a44a" />
          <circle cx="0" cy="-75" r="13" fill="#f6efe2" />
          <path d="M-13,-77 a13,13 0 0 1 26,0 l0,3 -26,0z" fill="#2a1f18" />
          <circle cx="-5" cy="-72" r="2.4" fill="#241a12" />
          <circle cx="5" cy="-72" r="2.4" fill="#241a12" />
          <path d="M-5,-65 q5,3 10,0" stroke="#241a12" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
        <g fill="#3b3446">
          <rect x="6" y="-26" width="30" height="11" rx="5" />
          <rect x="26" y="-24" width="11" height="24" rx="5" />
        </g>
        {/* ためいき */}
        <g fill="#c9d4e0">
          <circle className="ibn-sigh-a" cx="18" cy="-70" r="4" />
          <circle className="ibn-sigh-b" cx="18" cy="-70" r="3" />
        </g>
      </g>

      {/* 暮れていく */}
      <rect className="ibn-dusk" width="400" height="210" fill="#101828" />

      <style>{`
        .ibn-sun {
          transform-box: fill-box;
          transform-origin: center;
          animation: ibn-sink 12s linear infinite;
        }
        .ibn-shutter-a {
          transform-box: fill-box;
          transform-origin: top center;
          animation: ibn-close 6s ease-in-out infinite;
        }
        .ibn-shutter-b {
          transform-box: fill-box;
          transform-origin: top center;
          animation: ibn-close 6s ease-in-out infinite;
          animation-delay: -0.5s;
        }
        .ibn-shutter-c {
          transform-box: fill-box;
          transform-origin: top center;
          animation: ibn-close 6s ease-in-out infinite;
          animation-delay: -1s;
        }
        .ibn-flag {
          transform-box: fill-box;
          transform-origin: left center;
          animation: ibn-wave 1.9s ease-in-out infinite;
        }
        .ibn-wait {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ibn-slump 4.4s ease-in-out infinite;
        }
        .ibn-sigh-a {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: ibn-puff 4.4s ease-out infinite;
        }
        .ibn-sigh-b {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: ibn-puff 4.4s ease-out infinite;
          animation-delay: 0.35s;
        }
        .ibn-win-a { animation: ibn-lights 6s steps(1, end) infinite; }
        .ibn-win-b { animation: ibn-lights 6s steps(1, end) infinite; animation-delay: -1.4s; }
        .ibn-dusk { opacity: 0.16; animation: ibn-evening 12s ease-in-out infinite; }
        @keyframes ibn-sink {
          0% { transform: translate(-170px, 26px); }
          50% { transform: translate(0, -12px); }
          100% { transform: translate(170px, 26px); }
        }
        @keyframes ibn-close {
          0% { transform: scaleY(0.08); }
          26%, 88% { transform: scaleY(1); }
          100% { transform: scaleY(0.08); }
        }
        @keyframes ibn-wave {
          0%, 100% { transform: rotate(-5deg) scaleX(1); }
          50% { transform: rotate(5deg) scaleX(0.9); }
        }
        @keyframes ibn-slump {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(3deg) translate(0, 2px); }
        }
        @keyframes ibn-puff {
          0%, 46% { transform: translate(0, 0) scale(0.3); opacity: 0; }
          58% { opacity: 0.55; }
          88%, 100% { transform: translate(16px, -20px) scale(1.5); opacity: 0; }
        }
        @keyframes ibn-lights {
          0%, 54% { opacity: 1; }
          55%, 100% { opacity: 0; }
        }
        @keyframes ibn-evening {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.34; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ibn-sun, .ibn-shutter-a, .ibn-shutter-b, .ibn-shutter-c, .ibn-flag,
          .ibn-wait, .ibn-sigh-a, .ibn-sigh-b, .ibn-win-a, .ibn-win-b,
          .ibn-dusk { animation: none; }
        }
      `}</style>
    </svg>
  );
}
