/**
 * 満席で当日枠(タトカル)の割増料金を払う。
 *
 * 予約窓口の空席表示は赤ばかり。後ろには行列。旅人の手から硬貨が窓口へ
 * 吸い込まれ、割増印の押された切符が台の上を滑り出てくる。
 */
export function TrainTatkalFee() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の予約所 */}
      <rect width="400" height="210" fill="#233549" />
      <rect y="170" width="400" height="40" fill="#2b3d50" />

      {/* 窓口の壁 */}
      <rect x="196" y="24" width="204" height="146" fill="#3a4d63" />
      <rect x="196" y="24" width="204" height="7" fill="#4e6683" />

      {/* 空席表示板 — ぜんぶ埋まっている */}
      <rect x="212" y="36" width="116" height="32" rx="3" fill="#16232f" />
      <g fill="#e8443f">
        <rect x="219" y="42" width="13" height="9" rx="2" />
        <rect x="236" y="42" width="13" height="9" rx="2" />
        <rect x="253" y="42" width="13" height="9" rx="2" />
        <rect x="270" y="42" width="13" height="9" rx="2" />
        <rect x="287" y="42" width="13" height="9" rx="2" />
        <rect x="304" y="42" width="13" height="9" rx="2" />
        <rect x="219" y="55" width="13" height="9" rx="2" />
        <rect x="236" y="55" width="13" height="9" rx="2" />
        <rect x="253" y="55" width="13" height="9" rx="2" />
        <rect x="270" y="55" width="13" height="9" rx="2" />
        <rect x="287" y="55" width="13" height="9" rx="2" />
      </g>
      {/* 最後のひと席がいま埋まった */}
      <rect
        className="tatkal-full"
        x="304"
        y="55"
        width="13"
        height="9"
        rx="2"
        fill="#e8443f"
      />

      {/* 窓口の中の係員 */}
      <rect x="212" y="84" width="116" height="64" fill="#16232f" />
      <g>
        <rect x="248" y="126" width="38" height="24" rx="7" fill="#3f6f92" />
        <circle cx="267" cy="112" r="12" fill="#f6efe2" />
        <path d="M255,111 a12,12 0 0 1 24,0 z" fill="#2a1f18" />
      </g>
      {/* 窓口の格子と受け台 */}
      <g fill="#5d7590">
        <rect x="230" y="84" width="4" height="64" />
        <rect x="250" y="84" width="4" height="64" />
        <rect x="270" y="84" width="4" height="64" />
        <rect x="290" y="84" width="4" height="64" />
        <rect x="310" y="84" width="4" height="64" />
      </g>
      <rect x="196" y="148" width="204" height="9" fill="#5d7590" />
      <rect x="196" y="157" width="204" height="13" fill="#2f4054" />

      {/* 後ろにのびる行列 */}
      <g fill="#1b2937">
        <g className="tatkal-queue-a">
          <circle cx="30" cy="106" r="12" />
          <rect x="16" y="120" width="28" height="52" rx="9" />
        </g>
        <g className="tatkal-queue-b">
          <circle cx="64" cy="101" r="12" />
          <rect x="50" y="115" width="28" height="57" rx="9" />
        </g>
        <g className="tatkal-queue-c">
          <circle cx="98" cy="106" r="12" />
          <rect x="84" y="120" width="28" height="52" rx="9" />
        </g>
      </g>

      {/* 窓口に立つ旅人 */}
      <g>
        <rect x="136" y="150" width="9" height="22" fill="#3a3348" />
        <rect x="151" y="150" width="9" height="22" fill="#3a3348" />
        <rect x="132" y="106" width="30" height="46" rx="9" fill="#c9a877" />
        <circle cx="146" cy="92" r="14" fill="#f6efe2" />
        <path d="M132,91 a14,14 0 0 1 28,0 z" fill="#2a1f18" />
        <rect x="158" y="110" width="44" height="9" rx="4.5" fill="#e5d8bf" />
      </g>

      {/* 割増ぶんの硬貨が窓口へ吸い込まれていく */}
      <g transform="translate(206,116)">
        <g className="tatkal-coin tatkal-coin-a">
          <circle r="7" fill="#f5b31c" />
          <circle r="3.5" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(224,122)">
        <g className="tatkal-coin tatkal-coin-b">
          <circle r="7" fill="#f5b31c" />
          <circle r="3.5" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(242,128)">
        <g className="tatkal-coin tatkal-coin-c">
          <circle r="7" fill="#f5b31c" />
          <circle r="3.5" fill="#c98a12" />
        </g>
      </g>

      {/* 当日枠の切符が台を滑り出てくる */}
      <g transform="translate(190,140)">
        <g className="tatkal-ticket">
          <rect x="-38" y="-9" width="38" height="18" rx="2" fill="#f6efe2" />
          <rect x="-38" y="-9" width="6" height="18" fill="#e8443f" />
          <circle className="tatkal-stamp" cx="-12" cy="0" r="6" fill="#e8443f" />
        </g>
      </g>

      <style>{`
        .tatkal-full { animation: tatkal-blink 1.1s steps(1, end) infinite; }
        .tatkal-queue-a { animation: tatkal-press 1.9s ease-in-out infinite; }
        .tatkal-queue-b { animation: tatkal-press 2.3s ease-in-out infinite 0.3s; }
        .tatkal-queue-c { animation: tatkal-press 1.7s ease-in-out infinite 0.6s; }
        .tatkal-coin { animation: tatkal-pay 1.5s ease-in infinite; }
        .tatkal-coin-b { animation-delay: 0.25s; }
        .tatkal-coin-c { animation-delay: 0.5s; }
        .tatkal-ticket { animation: tatkal-slip 3s ease-out infinite; }
        .tatkal-stamp { animation: tatkal-stamp 3s ease-out infinite; }
        @keyframes tatkal-blink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0.2; }
        }
        @keyframes tatkal-press {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(4px, -2px); }
        }
        @keyframes tatkal-pay {
          0% { transform: translate(0, 0); opacity: 1; }
          70% { transform: translate(26px, 10px); opacity: 1; }
          100% { transform: translate(40px, 16px); opacity: 0; }
        }
        @keyframes tatkal-slip {
          0%, 6% { transform: translate(34px, 0); opacity: 0; }
          22% { opacity: 1; }
          48%, 88% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-8px, 0); opacity: 0; }
        }
        @keyframes tatkal-stamp {
          0%, 44% { transform: scale(1); }
          52% { transform: scale(1.35); }
          62%, 100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tatkal-full, .tatkal-queue-a, .tatkal-queue-b, .tatkal-queue-c,
          .tatkal-coin, .tatkal-ticket, .tatkal-stamp { animation: none; }
        }
      `}</style>
    </svg>
  );
}
