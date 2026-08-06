/**
 * 花見の場所取りを代行して報酬をもらう(関東)。
 *
 * 桜の下、ブルーシートに座り続ける旅人へ、依頼主の手が札を差し出す。
 */
export function CherryBlossomSpot() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空と土手 */}
      <rect width="400" height="210" fill="#9fcbe8" />
      <path d="M0,140 Q120,124 240,140 Q320,150 400,138 L400,210 L0,210z" fill="#4f7f45" />
      <rect y="170" width="400" height="40" fill="#3f6b3c" />

      {/* 奥の桜並木 */}
      <g opacity="0.6">
        <rect x="46" y="92" width="8" height="52" fill="#5a3a22" />
        <circle cx="50" cy="84" r="24" fill="#f0a9c4" />
        <rect x="130" y="98" width="7" height="46" fill="#5a3a22" />
        <circle cx="133" cy="92" r="19" fill="#f0a9c4" />
      </g>

      {/* 手前の桜 */}
      <rect x="292" y="84" width="17" height="88" fill="#5a3a22" />
      <path d="M300,110 L272,90 M300,100 L330,80" stroke="#5a3a22" strokeWidth="7" strokeLinecap="round" />
      <circle cx="300" cy="66" r="48" fill="#f7b8cf" />
      <circle cx="252" cy="82" r="27" fill="#f0a9c4" />
      <circle cx="348" cy="78" r="29" fill="#f0a9c4" />
      <circle cx="304" cy="34" r="24" fill="#fbd0e0" />

      {/* ブルーシートと重し石 */}
      <path d="M46,196 L82,158 L226,158 L206,196z" fill="#5b8fe8" />
      <path d="M46,196 L82,158 L226,158 L206,196z" fill="none" stroke="#3d6fc4" strokeWidth="3" />
      <g fill="#8a8f96">
        <circle cx="86" cy="162" r="6" />
        <circle cx="220" cy="162" r="6" />
        <circle cx="52" cy="192" r="6" />
      </g>

      {/* 座り続ける旅人 */}
      <g className="cbs-sitter">
        <path d="M108,190 L164,190 L156,170 L116,170z" fill="#3b3550" />
        <rect x="118" y="132" width="34" height="42" rx="10" fill="#e8443f" />
        <circle cx="135" cy="118" r="15" fill="#f6efe2" />
        <path d="M119,114 Q135,96 151,114 L151,108 Q135,94 119,108z" fill="#2a2233" />
        <rect className="cbs-hand" x="150" y="146" width="26" height="9" rx="4" fill="#f6efe2" />
      </g>

      {/* 差し出される依頼主の腕と札 */}
      <g className="cbs-pay">
        <rect x="232" y="138" width="70" height="10" rx="5" fill="#4a5a7a" />
        <circle cx="230" cy="143" r="9" fill="#f6efe2" />
        <g className="cbs-note">
          <rect x="192" y="132" width="42" height="22" rx="2" fill="#e4e7c2" />
          <rect x="192" y="132" width="42" height="22" rx="2" fill="none" stroke="#a8b077" strokeWidth="2" />
          <circle cx="213" cy="143" r="6" fill="#c3cc95" />
        </g>
      </g>

      {/* 舞い散る花びら */}
      <g fill="#fbd0e0">
        <ellipse className="cbs-petal" cx="214" cy="28" rx="6" ry="4" />
        <ellipse className="cbs-petal cbs-p2" cx="176" cy="42" rx="5" ry="3.5" />
        <ellipse className="cbs-petal cbs-p3" cx="240" cy="114" rx="6" ry="4" />
        <ellipse className="cbs-petal cbs-p4" cx="200" cy="66" rx="5" ry="3.5" />
        <ellipse className="cbs-petal cbs-p5" cx="158" cy="98" rx="5" ry="3.5" />
        <ellipse className="cbs-petal cbs-p6" cx="192" cy="122" rx="6" ry="4" />
      </g>

      {/* 受け取った駄賃 */}
      <g className="cbs-coin">
        <circle cx="168" cy="114" r="10" fill="#f5b31c" />
        <circle cx="168" cy="114" r="5" fill="#d8930d" />
      </g>

      <style>{`
        .cbs-sitter { transform-origin: 135px 190px; animation: cbs-sway 3.4s ease-in-out infinite; }
        .cbs-hand { transform-origin: 152px 150px; animation: cbs-reach 2.6s ease-in-out infinite; }
        .cbs-pay { animation: cbs-hand-in 2.6s ease-in-out infinite; }
        .cbs-note { animation: cbs-give 2.6s ease-in-out infinite; }
        .cbs-coin { animation: cbs-rise 2.6s ease-out infinite; }
        .cbs-petal { animation: cbs-fall 4.2s linear infinite; }
        .cbs-p2 { animation-delay: 0.7s; animation-duration: 5s; }
        .cbs-p3 { animation-delay: 1.4s; animation-duration: 3.8s; }
        .cbs-p4 { animation-delay: 2.1s; animation-duration: 4.6s; }
        .cbs-p5 { animation-delay: 2.8s; animation-duration: 5.4s; }
        .cbs-p6 { animation-delay: 3.5s; animation-duration: 4s; }
        @keyframes cbs-sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes cbs-reach {
          0%, 40%, 100% { transform: rotate(0deg); }
          70% { transform: rotate(-16deg); }
        }
        @keyframes cbs-hand-in {
          0%, 100% { transform: translate(46px, 0); }
          45%, 75% { transform: translate(0, 0); }
        }
        @keyframes cbs-give {
          0%, 45% { transform: translate(0, 0); }
          75%, 100% { transform: translate(-16px, 4px); }
        }
        @keyframes cbs-rise {
          0%, 55% { transform: translate(0, 16px); opacity: 0; }
          72% { opacity: 1; }
          100% { transform: translate(-4px, -22px); opacity: 0; }
        }
        @keyframes cbs-fall {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          100% { transform: translate(-64px, 132px) rotate(320deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cbs-sitter, .cbs-hand, .cbs-pay, .cbs-note, .cbs-coin, .cbs-petal { animation: none; }
        }
      `}</style>
    </svg>
  );
}
