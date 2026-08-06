/**
 * 信号故障で運転見合わせ。
 *
 * 赤のまま変わらない信号、動かない電車、九十秒ごとの詫び。
 * 駅員が頭を下げ続けるあいだ、ホームには人が溜まっていく。
 */
export function JapanDelay() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 駅の構内 */}
      <rect width="400" height="210" fill="#22303c" />
      <rect width="400" height="20" fill="#1a2630" />
      <g fill="#2b3946">
        <rect x="176" y="20" width="9" height="150" />
        <rect x="352" y="20" width="9" height="40" />
      </g>

      {/* 発車標 ― 全部が赤 */}
      <g>
        <rect x="20" y="20" width="140" height="8" fill="#1a2630" />
        <rect x="24" y="28" width="132" height="46" rx="3" fill="#101a24" />
        <g fill="#e05252">
          <rect className="jd-row-a" x="30" y="34" width="86" height="6" rx="3" />
          <rect className="jd-row-b" x="30" y="46" width="104" height="6" rx="3" />
          <rect className="jd-row-c" x="30" y="58" width="72" height="6" rx="3" />
        </g>
        <rect x="122" y="34" width="28" height="30" rx="2" fill="#e05252" opacity="0.5" />
      </g>

      {/* ホーム */}
      <rect y="168" width="400" height="42" fill="#3a4a54" />
      <rect y="168" width="400" height="4" fill="#4c606c" />
      <g fill="#f5b31c" opacity="0.85">
        <rect x="0" y="180" width="16" height="5" />
        <rect x="24" y="180" width="16" height="5" />
        <rect x="48" y="180" width="16" height="5" />
        <rect x="72" y="180" width="16" height="5" />
        <rect x="96" y="180" width="16" height="5" />
        <rect x="120" y="180" width="16" height="5" />
        <rect x="144" y="180" width="16" height="5" />
        <rect x="168" y="180" width="16" height="5" />
        <rect x="192" y="180" width="16" height="5" />
        <rect x="216" y="180" width="16" height="5" />
        <rect x="240" y="180" width="16" height="5" />
        <rect x="264" y="180" width="16" height="5" />
        <rect x="288" y="180" width="16" height="5" />
        <rect x="312" y="180" width="16" height="5" />
        <rect x="336" y="180" width="16" height="5" />
        <rect x="360" y="180" width="16" height="5" />
        <rect x="384" y="180" width="16" height="5" />
      </g>

      {/* 動かない電車 */}
      <g>
        <rect x="250" y="52" width="150" height="118" rx="8" fill="#cfd7de" />
        <rect x="250" y="66" width="150" height="10" fill="#3f6b8a" />
        <rect x="256" y="84" width="52" height="34" rx="3" fill="#22384c" />
        <rect x="316" y="84" width="34" height="60" rx="3" fill="#1a2b3a" />
        <rect x="358" y="84" width="36" height="34" rx="3" fill="#22384c" />
        <rect x="312" y="80" width="4" height="90" fill="#8f9aa4" />
        <rect x="350" y="80" width="4" height="90" fill="#8f9aa4" />
        <rect x="250" y="160" width="150" height="10" fill="#8f9aa4" />
      </g>

      {/* 赤のまま変わらない信号 */}
      <g>
        <rect x="222" y="96" width="7" height="74" fill="#3a4a58" />
        <rect x="210" y="58" width="31" height="52" rx="6" fill="#141d26" />
        <circle className="jd-lamp-red" cx="225.5" cy="72" r="9" fill="#e05252" />
        <circle cx="225.5" cy="94" r="8" fill="#22323e" />
      </g>

      {/* 溜まっていく人 */}
      <g fill="#16222c">
        <g className="jd-queue-a">
          <circle cx="30" cy="120" r="13" />
          <path d="M12,168 q2,-36 18,-36 q16,0 18,36 z" />
        </g>
        <g className="jd-queue-b">
          <circle cx="62" cy="126" r="12" />
          <path d="M46,168 q2,-34 16,-34 q14,0 16,34 z" />
        </g>
        <g className="jd-queue-c">
          <circle cx="92" cy="118" r="13" />
          <path d="M74,168 q2,-38 18,-38 q16,0 18,38 z" />
        </g>
        <g className="jd-queue-d">
          <circle cx="124" cy="128" r="12" />
          <path d="M108,168 q2,-32 16,-32 q14,0 16,32 z" />
        </g>
        <g className="jd-queue-e">
          <circle cx="152" cy="122" r="12" />
          <path d="M136,168 q2,-36 16,-36 q14,0 16,36 z" />
        </g>
      </g>

      {/* 頭を下げ続ける駅員 */}
      <g transform="translate(202,168)">
        <rect x="-11" y="-28" width="10" height="28" rx="3" fill="#1c2731" />
        <rect x="1" y="-28" width="10" height="28" rx="3" fill="#1c2731" />
        <g className="jd-bow">
          <path d="M-13,-64 L13,-64 L16,-27 L-16,-27 z" fill="#4a7ea3" />
          <path d="M-6,-64 L0,-52 L6,-64 z" fill="#eef3f7" />
          <rect x="-17" y="-62" width="8" height="32" rx="4" fill="#4a7ea3" />
          <rect x="9" y="-62" width="8" height="32" rx="4" fill="#4a7ea3" />
          <circle cx="0" cy="-76" r="12" fill="#f6efe2" />
          <path d="M-12,-78 a12,12 0 0 1 24,0 l0,3 -24,0 z" fill="#22323e" />
          <rect x="-22" y="-79" width="24" height="5" rx="2.5" fill="#16222c" />
        </g>
      </g>

      <style>{`
        .jd-row-a { animation: jd-blink 1.5s steps(1, end) infinite; }
        .jd-row-b { animation: jd-blink 1.5s steps(1, end) infinite; animation-delay: -0.5s; }
        .jd-row-c { animation: jd-blink 1.5s steps(1, end) infinite; animation-delay: -1s; }
        .jd-lamp-red { animation: jd-pulse 1.2s ease-in-out infinite; }
        .jd-bow {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jd-bow-move 2.6s ease-in-out infinite;
        }
        .jd-queue-a { animation: jd-arrive 7s linear infinite; }
        .jd-queue-b { animation: jd-arrive 7s linear infinite; animation-delay: -1.2s; }
        .jd-queue-c { animation: jd-arrive 7s linear infinite; animation-delay: -2.4s; }
        .jd-queue-d { animation: jd-arrive 7s linear infinite; animation-delay: -3.6s; }
        .jd-queue-e { animation: jd-arrive 7s linear infinite; animation-delay: -4.8s; }
        @keyframes jd-blink {
          0%, 58% { opacity: 1; }
          59%, 100% { opacity: 0.3; }
        }
        @keyframes jd-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.42; }
        }
        @keyframes jd-bow-move {
          0%, 18% { transform: rotate(-4deg); }
          40%, 66% { transform: rotate(-30deg); }
          86%, 100% { transform: rotate(-4deg); }
        }
        @keyframes jd-arrive {
          0% { transform: translate(-60px, 0); opacity: 0; }
          10% { opacity: 1; }
          22%, 92% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(0, 0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jd-row-a, .jd-row-b, .jd-row-c, .jd-lamp-red, .jd-bow,
          .jd-queue-a, .jd-queue-b, .jd-queue-c, .jd-queue-d, .jd-queue-e { animation: none; }
        }
      `}</style>
    </svg>
  );
}
