/**
 * 夜行列車の切符はあるが、横になる場所の分が入っていない(減)。
 *
 *   - 通路の窓の外を、夜の灯りが流れていく
 *   - 車掌が最後の寝台を売る。急ぐ様子はまったくない
 *   - 渡した硬貨は、切符ばさみのほうへ吸われていく
 */
export function BerthSupplement() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 車内 */}
      <rect width="400" height="210" fill="#3a2f2a" />
      <rect width="400" height="26" fill="#4a3c34" />
      <rect y="176" width="400" height="34" fill="#2a221e" />
      <rect y="172" width="400" height="6" fill="#5a4630" />

      {/* 通路の窓と、流れる夜の灯り */}
      <rect x="18" y="44" width="150" height="72" rx="5" fill="#141d2e" />
      <rect x="18" y="38" width="150" height="8" rx="4" fill="#5a4630" />
      <g fill="#f5e2a8" opacity="0.9">
        <rect className="brs-light" x="30" y="70" width="9" height="14" rx="3" />
        <rect className="brs-light brs-l2" x="78" y="58" width="7" height="11" rx="3" />
        <rect className="brs-light brs-l3" x="122" y="86" width="10" height="15" rx="3" />
        <rect className="brs-light brs-l4" x="152" y="64" width="7" height="10" rx="3" />
      </g>

      {/* 三段の寝台 */}
      <g transform="translate(300,0)">
        <rect x="-84" y="34" width="180" height="8" fill="#6b5330" />
        <rect x="-84" y="42" width="180" height="16" rx="4" fill="#8fa4b8" />
        <rect x="-84" y="90" width="180" height="8" fill="#6b5330" />
        <rect x="-84" y="98" width="180" height="16" rx="4" fill="#8fa4b8" />
        <rect x="-84" y="146" width="180" height="8" fill="#6b5330" />
        <rect x="-84" y="154" width="180" height="16" rx="4" fill="#8fa4b8" />
        <g fill="#f6efe2">
          <rect x="-78" y="34" width="30" height="10" rx="4" />
          <rect x="-78" y="90" width="30" height="10" rx="4" />
        </g>
        <g stroke="#5a4630" strokeWidth="5">
          <path d="M-84,34 L-84,176 M92,34 L92,176" />
        </g>
      </g>

      {/* 車掌 */}
      <g transform="translate(192,196)">
        <rect x="-14" y="-24" width="10" height="24" fill="#2a2f3a" />
        <rect x="2" y="-24" width="10" height="24" fill="#2a2f3a" />
        <rect x="-18" y="-66" width="34" height="44" rx="10" fill="#2f3b52" />
        <rect x="-18" y="-56" width="34" height="5" fill="#f5b31c" />
        <circle cx="-1" cy="-77" r="13" fill="#f6efe2" />
        <path d="M-15,-80 a14,14 0 0 1 28,0z" fill="#20283a" />
        <rect x="-19" y="-82" width="36" height="5" rx="2.5" fill="#20283a" />
        {/* 差し出す切符 */}
        <g className="brs-ticket">
          <rect x="14" y="-56" width="9" height="26" rx="4.5" fill="#f6efe2" />
          <rect x="20" y="-40" width="26" height="16" rx="2" fill="#f5e2a8" />
          <rect x="24" y="-35" width="18" height="4" rx="2" fill="#c9a04f" />
        </g>
      </g>

      {/* 廊下に立たされた旅人 */}
      <g transform="translate(96,198)">
        <rect x="-16" y="-46" width="32" height="46" rx="11" fill="#e8443f" />
        <circle cx="0" cy="-57" r="12" fill="#f6efe2" />
        <path d="M-12,-61 a12,12 0 0 1 24,0z" fill="#4a3a2a" />
        <g className="brs-pay">
          <rect x="12" y="-42" width="9" height="22" rx="4.5" fill="#f6efe2" />
        </g>
        {/* 足元の荷物 */}
        <rect x="-42" y="-22" width="26" height="22" rx="4" fill="#3b4a63" />
        <rect x="-34" y="-27" width="10" height="6" rx="3" fill="#2f3b52" />
      </g>

      {/* 二人のあいだを渡っていく硬貨 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="brs-coin-a" cx="122" cy="158" r="7" />
        <circle className="brs-coin-b" cx="122" cy="158" r="6" />
      </g>

      <style>{`
        .brs-light {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: brs-stream 2.6s linear infinite;
        }
        .brs-l2 { animation-delay: -0.7s; animation-duration: 3.2s; }
        .brs-l3 { animation-delay: -1.4s; animation-duration: 2.2s; }
        .brs-l4 { animation-delay: -2s; animation-duration: 3s; }
        .brs-ticket {
          transform-box: fill-box; transform-origin: 0 0;
          animation: brs-offer 4.4s ease-in-out infinite;
        }
        .brs-pay {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: brs-reach 4.4s ease-in-out infinite;
        }
        .brs-coin-a { animation: brs-hand-over 4.4s ease-in-out infinite; }
        .brs-coin-b { animation: brs-hand-over 4.4s ease-in-out infinite; animation-delay: -1.4s; }
        @keyframes brs-stream {
          0% { transform: translateX(24px); opacity: 0; }
          20%, 76% { opacity: 0.9; }
          100% { transform: translateX(-130px); opacity: 0; }
        }
        @keyframes brs-offer {
          0%, 100% { transform: rotate(0deg); }
          40% { transform: rotate(-16deg); }
          70% { transform: rotate(-6deg); }
        }
        @keyframes brs-reach {
          0%, 100% { transform: rotate(6deg); }
          46% { transform: rotate(34deg); }
        }
        @keyframes brs-hand-over {
          0%, 14% { transform: translate(0, 0); opacity: 0; }
          26% { opacity: 1; }
          70% { transform: translate(38px, -14px); opacity: 1; }
          82%, 100% { transform: translate(46px, -18px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brs-light, .brs-ticket, .brs-pay,
          .brs-coin-a, .brs-coin-b { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
