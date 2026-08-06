/**
 * 夜市の屋台で、六時から一時まで働く(増)。
 *
 *   - 吊り下げた裸電球の列。寸胴からは湯気が上がりつづける
 *   - 丼を運び、洗い桶に手を突っ込み、火口の前に立ちっぱなし
 *   - 締めたあと、その晩の分の硬貨が跳ねる
 */
export function NightMarketShift() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の路地 */}
      <rect width="400" height="210" fill="#1f2438" />
      <rect y="150" width="400" height="60" fill="#2a3048" />
      <rect y="146" width="400" height="6" fill="#39405c" />
      <g fill="#2a3350">
        <rect x="0" y="18" width="46" height="90" />
        <rect x="352" y="26" width="48" height="82" />
      </g>
      <g fill="#f5e2a8" opacity="0.55">
        <rect x="10" y="30" width="12" height="14" />
        <rect x="28" y="30" width="12" height="14" />
        <rect x="362" y="38" width="12" height="14" />
        <rect x="380" y="38" width="12" height="14" />
      </g>

      {/* 屋台の日よけ */}
      <path d="M52,64 L348,64 L336,44 L64,44z" fill="#c93a3a" />
      <g fill="#f6efe2">
        <path d="M64,44 L100,44 L92,64 L52,64z" opacity="0.9" />
        <path d="M160,44 L196,44 L192,64 L152,64z" opacity="0.9" />
        <path d="M256,44 L292,44 L292,64 L252,64z" opacity="0.9" />
      </g>
      <rect x="52" y="64" width="296" height="6" fill="#8a2f2f" />

      {/* 吊り下げ電球 */}
      <path d="M60,74 Q200,96 340,74" fill="none" stroke="#5a4630" strokeWidth="2" />
      <g fill="#f5e2a8">
        <circle className="nms-bulb" cx="98" cy="86" r="6" />
        <circle className="nms-bulb nms-b2" cx="152" cy="90" r="6" />
        <circle className="nms-bulb nms-b3" cx="206" cy="92" r="6" />
        <circle className="nms-bulb nms-b4" cx="258" cy="90" r="6" />
        <circle className="nms-bulb nms-b5" cx="308" cy="85" r="6" />
      </g>

      {/* 屋台の台 */}
      <rect x="40" y="140" width="230" height="12" fill="#8a5a2c" />
      <rect x="46" y="152" width="218" height="34" fill="#6b4a2a" />

      {/* 寸胴と湯気 */}
      <g transform="translate(96,140)">
        <path d="M-26,0 L26,0 L22,-40 L-22,-40z" fill="#8f9aa8" />
        <ellipse cx="0" cy="-40" rx="22" ry="7" fill="#b0bcc4" />
        <ellipse cx="0" cy="-42" rx="15" ry="4.5" fill="#e8dfc8" />
        <rect x="-30" y="-26" width="6" height="10" rx="3" fill="#7f8a99" />
        <rect x="24" y="-26" width="6" height="10" rx="3" fill="#7f8a99" />
      </g>
      <g fill="#e8e2d2" opacity="0.75">
        <ellipse className="nms-steam" cx="96" cy="94" rx="8" ry="5" />
        <ellipse className="nms-steam nms-s2" cx="88" cy="86" rx="10" ry="6" />
        <ellipse className="nms-steam nms-s3" cx="102" cy="80" rx="11" ry="6.5" />
      </g>

      {/* 洗い桶 */}
      <g transform="translate(232,140)">
        <path d="M-26,0 L26,0 L21,-22 L-21,-22z" fill="#5b8fe8" />
        <ellipse cx="0" cy="-22" rx="21" ry="6" fill="#8fb8f0" />
        <g fill="#f6efe2">
          <ellipse cx="-8" cy="-24" rx="8" ry="3" />
          <ellipse cx="8" cy="-26" rx="7" ry="2.6" />
        </g>
      </g>

      {/* 丼を運ぶ人 */}
      <g transform="translate(318,192)">
        <rect x="-13" y="-22" width="10" height="22" fill="#3b2f4a" />
        <rect x="3" y="-22" width="10" height="22" fill="#3b2f4a" />
        <rect x="-17" y="-62" width="34" height="42" rx="10" fill="#f5b31c" />
        <circle cx="0" cy="-73" r="13" fill="#f6efe2" />
        <path d="M-13,-77 a13,13 0 0 1 26,0z" fill="#3b2f2a" />
        <rect x="-30" y="-58" width="14" height="9" rx="4" fill="#f6efe2" />
        <g className="nms-tray">
          <ellipse cx="-38" cy="-60" rx="20" ry="6" fill="#c93a3a" />
          <path d="M-46,-64 q8,-10 16,0z" fill="#e8dfc8" />
          <path d="M-32,-66 q6,-8 12,0z" fill="#e8dfc8" />
        </g>
      </g>

      {/* その晩の分 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="nms-coin-a" cx="218" cy="116" r="8" />
        <circle className="nms-coin-b" cx="244" cy="106" r="7" />
        <circle className="nms-coin-c" cx="266" cy="118" r="6" />
      </g>

      <style>{`
        .nms-bulb {
          transform-box: fill-box; transform-origin: center;
          animation: nms-glow 3s ease-in-out infinite;
        }
        .nms-b2 { animation-delay: -0.6s; }
        .nms-b3 { animation-delay: -1.2s; }
        .nms-b4 { animation-delay: -1.8s; }
        .nms-b5 { animation-delay: -2.4s; }
        .nms-steam {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: nms-rise 4.2s ease-out infinite;
        }
        .nms-s2 { animation-delay: -1.4s; }
        .nms-s3 { animation-delay: -2.8s; }
        .nms-tray {
          transform-box: fill-box; transform-origin: 100% 50%;
          animation: nms-carry 2.8s ease-in-out infinite;
        }
        .nms-coin-a { animation: nms-pop 2.6s ease-out infinite; }
        .nms-coin-b { animation: nms-pop 2.6s ease-out infinite; animation-delay: -0.9s; }
        .nms-coin-c { animation: nms-pop 2.6s ease-out infinite; animation-delay: -1.8s; }
        @keyframes nms-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        @keyframes nms-rise {
          0% { transform: translate(0, 10px) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-10px, -16px) scale(1.25); opacity: 0; }
        }
        @keyframes nms-carry {
          0%, 100% { transform: rotate(-3deg) translateY(0); }
          50% { transform: rotate(3deg) translateY(-4px); }
        }
        @keyframes nms-pop {
          0%, 30% { transform: translate(0, 32px); opacity: 0; }
          52% { transform: translate(0, 0); opacity: 1; }
          82% { transform: translate(0, -8px); opacity: 1; }
          100% { transform: translate(0, -20px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nms-bulb, .nms-steam, .nms-tray,
          .nms-coin-a, .nms-coin-b, .nms-coin-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
