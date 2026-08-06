/**
 * 自動販売機が、ボトルと一緒に入れた硬貨まで返してくる。
 *
 * 取り出し口にボトルが落ち、釣り銭口から硬貨が2枚こぼれて
 * 差し出した手のひらに収まる。
 */
export function VendingChange() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の路地 */}
      <rect width="400" height="210" fill="#20364a" />
      <rect y="170" width="400" height="40" fill="#2f3a46" />

      {/* 販売機の灯り */}
      <ellipse className="vc-glow" cx="176" cy="112" rx="120" ry="98" fill="#f5b31c" />

      {/* 自動販売機 */}
      <rect x="112" y="32" width="122" height="138" rx="5" fill="#e8443f" />
      <rect x="214" y="38" width="16" height="126" fill="#b8332e" />

      {/* 商品の窓 */}
      <rect x="122" y="42" width="84" height="58" rx="3" fill="#8fc4e8" />
      <rect x="130" y="52" width="16" height="42" rx="6" fill="#f6efe2" />
      <rect x="134" y="47" width="8" height="6" rx="1" fill="#20364a" />
      <rect x="154" y="52" width="16" height="42" rx="6" fill="#f5b31c" />
      <rect x="158" y="47" width="8" height="6" rx="1" fill="#20364a" />
      <rect x="178" y="52" width="16" height="42" rx="6" fill="#3f8f6f" />
      <rect x="182" y="47" width="8" height="6" rx="1" fill="#20364a" />

      {/* ボタンと投入口 */}
      <rect x="122" y="106" width="84" height="20" rx="3" fill="#f6efe2" />
      <circle cx="134" cy="116" r="5" fill="#e8443f" />
      <circle className="vc-lit" cx="152" cy="116" r="5" fill="#f5b31c" />
      <circle cx="170" cy="116" r="5" fill="#e8443f" />
      <circle cx="188" cy="116" r="5" fill="#e8443f" />
      <rect x="215" y="52" width="14" height="4" rx="2" fill="#20364a" />

      {/* 取り出し口と釣り銭口 */}
      <rect x="122" y="134" width="78" height="28" rx="3" fill="#20364a" />
      <g className="vc-bottle">
        <rect x="-8" y="-26" width="16" height="26" rx="6" fill="#f6efe2" />
        <rect x="-8" y="-18" width="16" height="10" fill="#e8443f" />
        <rect x="-4" y="-31" width="8" height="6" rx="1" fill="#f5b31c" />
      </g>
      <rect className="vc-flap" x="122" y="134" width="78" height="9" rx="2" fill="#b8332e" />
      <rect x="210" y="118" width="22" height="16" rx="3" fill="#20364a" />

      {/* 手を出す旅人 */}
      <circle cx="300" cy="104" r="14" fill="#f6efe2" />
      <rect x="286" y="88" width="28" height="10" rx="5" fill="#3a2f28" />
      <rect x="282" y="118" width="38" height="36" rx="8" fill="#5b8fe8" />
      <rect x="288" y="154" width="10" height="16" rx="4" fill="#20364a" />
      <rect x="304" y="154" width="10" height="16" rx="4" fill="#20364a" />
      <rect x="250" y="130" width="38" height="10" rx="5" fill="#5b8fe8" />
      <circle cx="248" cy="136" r="8" fill="#f6efe2" />

      {/* 戻ってきた硬貨 */}
      <g className="vc-coin-a">
        <circle r="7" fill="#f5b31c" />
        <circle r="3.4" fill="#c98f10" />
      </g>
      <g className="vc-coin-b">
        <circle r="6" fill="#f5b31c" />
        <circle r="3" fill="#c98f10" />
      </g>
      <path className="vc-spark" d="M262,104 l4,8 l-4,8 l-4,-8 z" fill="#f6efe2" />

      <style>{`
        .vc-glow { opacity: 0.12; animation: vc-hum 2.6s ease-in-out infinite; }
        .vc-lit { animation: vc-blink 2.4s steps(1, end) infinite; }
        .vc-flap { transform-box: fill-box; transform-origin: 50% 0%; transform: scaleY(0.15); animation: vc-open 2.4s ease-in-out infinite; }
        .vc-bottle { transform: translate(150px, 160px); animation: vc-drop 2.4s ease-out infinite; }
        .vc-coin-a { transform: translate(246px, 128px); animation: vc-return 2.4s ease-in infinite; }
        .vc-coin-b { transform: translate(224px, 126px); animation: vc-return 2.4s ease-in 0.55s infinite; }
        .vc-spark { transform-box: fill-box; transform-origin: 50% 50%; animation: vc-shine 2.4s ease-out infinite; }
        @keyframes vc-hum {
          0%, 100% { opacity: 0.09; }
          50% { opacity: 0.17; }
        }
        @keyframes vc-blink {
          0%, 60% { fill: #f5b31c; }
          61%, 100% { fill: #e8443f; }
        }
        @keyframes vc-open {
          0%, 8% { transform: scaleY(1); }
          20%, 100% { transform: scaleY(0.15); }
        }
        @keyframes vc-drop {
          0%, 10% { transform: translate(150px, 146px); opacity: 0; }
          22% { transform: translate(150px, 160px); opacity: 1; }
          30% { transform: translate(150px, 156px); opacity: 1; }
          38%, 100% { transform: translate(150px, 160px); opacity: 1; }
        }
        @keyframes vc-return {
          0% { transform: translate(221px, 126px); opacity: 0; }
          12% { transform: translate(224px, 130px); opacity: 1; }
          46% { transform: translate(236px, 148px); opacity: 1; }
          70%, 100% { transform: translate(246px, 128px); opacity: 1; }
        }
        @keyframes vc-shine {
          0%, 62%, 100% { transform: scale(0.2); opacity: 0; }
          74% { transform: scale(1); opacity: 1; }
          88% { transform: scale(0.6); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vc-glow, .vc-lit, .vc-flap, .vc-bottle,
          .vc-coin-a, .vc-coin-b, .vc-spark { animation: none; }
        }
      `}</style>
    </svg>
  );
}
