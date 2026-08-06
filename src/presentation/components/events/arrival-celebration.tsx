/**
 * 目的地に着いたときのお祝い。
 *
 * 到着はこのゲームでいちばん大きな見せ場(賞金が入り、次の目的地が決まる)
 * なのに、これまでは金額が文字で出るだけだった。列車がホームに滑り込み、
 * 紙吹雪が舞う短い絵を出して、着いたことが目で分かるようにする。
 */
export function ArrivalCelebration() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true" className="arrival-scene">
      {/* 空と駅舎 */}
      <rect width="400" height="210" fill="#1b2a45" />
      <g fill="#25395c">
        <rect x="0" y="24" width="400" height="86" />
        <rect x="30" y="36" width="26" height="20" rx="3" />
        <rect x="70" y="36" width="26" height="20" rx="3" />
        <rect x="304" y="36" width="26" height="20" rx="3" />
        <rect x="344" y="36" width="26" height="20" rx="3" />
      </g>
      {/* ホームの屋根 */}
      <rect x="0" y="104" width="400" height="9" fill="#3c5170" />
      <g fill="#2c405c">
        <rect x="24" y="113" width="7" height="34" />
        <rect x="366" y="113" width="7" height="34" />
      </g>

      {/* ホームと線路 */}
      <rect x="0" y="148" width="400" height="26" fill="#c9b98c" />
      <rect x="0" y="172" width="400" height="8" fill="#5a4a33" />
      <g stroke="#463823" strokeWidth="4">
        <path d="M0,184h400" />
      </g>

      {/* 迎える人 */}
      <g className="ac-crowd">
        <g transform="translate(64,148)">
          <circle cx="0" cy="-26" r="8" fill="#f6efe2" />
          <rect x="-7" y="-18" width="14" height="18" rx="4" fill="#37b3a4" />
        </g>
        <g transform="translate(92,148)">
          <circle cx="0" cy="-24" r="7" fill="#f6efe2" />
          <rect x="-6" y="-17" width="12" height="17" rx="4" fill="#f5b31c" />
        </g>
      </g>

      {/* 到着する列車 */}
      <g className="ac-train">
        <rect x="-4" y="-46" width="92" height="34" rx="7" fill="#e8443f" stroke="#1b1330" strokeWidth="3" />
        <rect x="88" y="-40" width="58" height="28" rx="6" fill="#c9302c" stroke="#1b1330" strokeWidth="3" />
        <g fill="#cfe4f0">
          <rect x="6" y="-40" width="18" height="13" rx="2" />
          <rect x="30" y="-40" width="18" height="13" rx="2" />
          <rect x="54" y="-40" width="18" height="13" rx="2" />
          <rect x="96" y="-34" width="18" height="12" rx="2" />
        </g>
        <rect x="24" y="-58" width="12" height="12" rx="2" fill="#1b1330" />
        <g fill="#1b1330">
          <circle cx="14" cy="-8" r="6" />
          <circle cx="52" cy="-8" r="6" />
          <circle cx="104" cy="-8" r="6" />
          <circle cx="132" cy="-8" r="6" />
        </g>
        <circle cx="150" cy="-26" r="5" fill="#f5d06a" />
      </g>

      {/* 紙吹雪 */}
      <g className="ac-confetti">
        <rect className="ac-c1" x="70" y="-10" width="7" height="11" rx="1.5" fill="#f5b31c" />
        <rect className="ac-c2" x="132" y="-10" width="7" height="11" rx="1.5" fill="#37b3a4" />
        <rect className="ac-c3" x="196" y="-10" width="7" height="11" rx="1.5" fill="#e8447a" />
        <rect className="ac-c4" x="256" y="-10" width="7" height="11" rx="1.5" fill="#5b8fe8" />
        <rect className="ac-c5" x="316" y="-10" width="7" height="11" rx="1.5" fill="#f6efe2" />
        <rect className="ac-c6" x="104" y="-10" width="7" height="11" rx="1.5" fill="#7bc86c" />
        <rect className="ac-c7" x="228" y="-10" width="7" height="11" rx="1.5" fill="#f5b31c" />
        <rect className="ac-c8" x="288" y="-10" width="7" height="11" rx="1.5" fill="#e8443f" />
      </g>

      <style>{`
        .ac-train { transform: translate(400px, 160px); animation: ac-pull-in 3.4s cubic-bezier(.22,.7,.2,1) infinite; }
        .ac-crowd { animation: ac-cheer 0.7s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
        .ac-confetti rect { transform-box: fill-box; transform-origin: center; }
        .ac-c1 { animation: ac-fall 2.6s linear infinite; }
        .ac-c2 { animation: ac-fall 3.1s linear infinite; animation-delay: -0.5s; }
        .ac-c3 { animation: ac-fall 2.3s linear infinite; animation-delay: -1.1s; }
        .ac-c4 { animation: ac-fall 3.4s linear infinite; animation-delay: -1.7s; }
        .ac-c5 { animation: ac-fall 2.8s linear infinite; animation-delay: -0.3s; }
        .ac-c6 { animation: ac-fall 3.0s linear infinite; animation-delay: -2.0s; }
        .ac-c7 { animation: ac-fall 2.5s linear infinite; animation-delay: -1.4s; }
        .ac-c8 { animation: ac-fall 3.3s linear infinite; animation-delay: -0.8s; }

        @keyframes ac-pull-in {
          0%   { transform: translate(400px, 160px); }
          55%  { transform: translate(150px, 160px); }
          70%  { transform: translate(142px, 160px); }
          100% { transform: translate(142px, 160px); }
        }
        @keyframes ac-cheer {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50%      { transform: translateY(-5px) scaleY(1.04); }
        }
        @keyframes ac-fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateY(200px) rotate(420deg); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ac-train { transform: translate(142px, 160px); animation: none; }
          .ac-crowd, .ac-confetti rect { animation: none; }
          .ac-confetti rect { transform: translateY(120px); }
        }
      `}</style>
    </svg>
  );
}
