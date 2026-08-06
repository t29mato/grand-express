/**
 * 電車に置き忘れた財布が、中身そのままで遺失物窓口から戻ってくる。
 *
 * 駅員がカウンターに財布を滑らせ、旅人の手元へ。奥の窓には
 * 置き忘れた現場の電車が流れていく。
 */
export function LostWalletReturned() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 窓口の部屋 */}
      <rect width="400" height="210" fill="#2c4a63" />
      <rect y="168" width="400" height="42" fill="#c9a877" />

      {/* 奥の窓を流れる電車(置き忘れた現場) */}
      <rect x="248" y="26" width="120" height="52" fill="#16222e" />
      <clipPath id="lwr-window-clip">
        <rect x="248" y="26" width="120" height="52" />
      </clipPath>
      <g clipPath="url(#lwr-window-clip)">
        <rect x="248" y="70" width="120" height="4" fill="#2c4a63" />
        <g className="lwr-train">
          <rect x="0" y="36" width="150" height="32" rx="6" fill="#6f8496" />
          <rect x="10" y="42" width="130" height="13" fill="#20364a" />
          <rect x="0" y="60" width="150" height="5" fill="#3f8f6f" />
        </g>
      </g>
      <rect
        x="248"
        y="26"
        width="120"
        height="52"
        fill="none"
        stroke="#6d4526"
        strokeWidth="5"
      />

      {/* 忘れ物の棚 */}
      <rect x="24" y="62" width="128" height="7" fill="#6d4526" />
      <rect x="34" y="36" width="26" height="26" rx="3" fill="#5b8fe8" />
      <rect x="70" y="30" width="11" height="32" rx="5" fill="#e8443f" />
      <rect x="92" y="42" width="32" height="20" rx="4" fill="#3f8f6f" />

      {/* 窓口の駅員 */}
      <circle cx="110" cy="96" r="13" fill="#f6efe2" />
      <rect x="96" y="82" width="28" height="10" rx="5" fill="#20364a" />
      <rect x="118" y="90" width="17" height="4" rx="2" fill="#16222e" />
      <rect x="92" y="108" width="36" height="32" rx="7" fill="#3b4f7a" />
      <g className="lwr-arm">
        <rect x="126" y="116" width="40" height="10" rx="5" fill="#3b4f7a" />
        <circle cx="166" cy="121" r="5" fill="#f6efe2" />
      </g>

      {/* 受け取る旅人 */}
      <circle cx="302" cy="92" r="14" fill="#f6efe2" />
      <rect x="288" y="76" width="28" height="10" rx="5" fill="#3a2f28" />
      <rect x="282" y="106" width="40" height="34" rx="8" fill="#e8443f" />
      <g className="lwr-reach">
        <rect x="250" y="118" width="36" height="10" rx="5" fill="#e8443f" />
        <circle cx="250" cy="123" r="5.5" fill="#f6efe2" />
      </g>

      {/* カウンター */}
      <rect x="20" y="128" width="360" height="11" rx="2" fill="#8a5c33" />
      <rect x="20" y="139" width="360" height="30" fill="#5e3c22" />

      {/* 中身が残ったまま返ってくる財布 */}
      <g className="lwr-wallet">
        <rect x="-12" y="-36" width="22" height="16" rx="1" fill="#f6efe2" />
        <rect x="-3" y="-39" width="19" height="16" rx="1" fill="#f5b31c" />
        <rect x="-22" y="-24" width="44" height="24" rx="3" fill="#8a5c33" />
        <rect x="-22" y="-24" width="44" height="8" rx="2" fill="#6d4526" />
        <circle cx="0" cy="-11" r="3.5" fill="#f5b31c" />
      </g>

      {/* 無事だったよろこび */}
      <path className="lwr-spark-a" d="M222,80 l4,9 l-4,9 l-4,-9 z" fill="#f5b31c" />
      <path className="lwr-spark-b" d="M240,62 l3,7 l-3,7 l-3,-7 z" fill="#f5b31c" />
      <path className="lwr-spark-c" d="M206,64 l3,6 l-3,6 l-3,-6 z" fill="#f6efe2" />

      <style>{`
        .lwr-train { transform: translateX(258px); animation: lwr-pass 4.5s linear infinite; }
        .lwr-wallet { transform: translate(246px, 128px); animation: lwr-hand-over 2.8s ease-in-out infinite; }
        .lwr-arm { transform-box: fill-box; transform-origin: 0% 50%; animation: lwr-push 2.8s ease-in-out infinite; }
        .lwr-reach { transform-box: fill-box; transform-origin: 100% 50%; animation: lwr-take 2.8s ease-in-out infinite; }
        .lwr-spark-a, .lwr-spark-b, .lwr-spark-c {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: lwr-sparkle 2.8s ease-out infinite;
        }
        .lwr-spark-b { animation-delay: 0.12s; }
        .lwr-spark-c { animation-delay: 0.24s; }
        @keyframes lwr-pass {
          from { transform: translateX(372px); }
          to { transform: translateX(-160px); }
        }
        @keyframes lwr-hand-over {
          0% { transform: translate(158px, 128px); opacity: 0; }
          10% { transform: translate(164px, 128px); opacity: 1; }
          55%, 90% { transform: translate(246px, 128px); opacity: 1; }
          100% { transform: translate(246px, 128px); opacity: 0; }
        }
        @keyframes lwr-push {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-9deg); }
        }
        @keyframes lwr-take {
          0%, 100% { transform: rotate(0deg); }
          60% { transform: rotate(7deg); }
        }
        @keyframes lwr-sparkle {
          0%, 52%, 100% { transform: scale(0.2); opacity: 0; }
          64% { transform: scale(1); opacity: 1; }
          80% { transform: scale(0.7); opacity: 0.45; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lwr-train, .lwr-wallet, .lwr-arm, .lwr-reach,
          .lwr-spark-a, .lwr-spark-b, .lwr-spark-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
