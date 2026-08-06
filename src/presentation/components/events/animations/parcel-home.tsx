/**
 * 鞄に入りきらない分を郵便局で箱に詰めて送る。送料が中身より高くつく(減)。
 *
 *   - 秤の上の箱に品を入れるたび、針が右へ振れていく
 *   - 足元には口の閉まらない鞄
 *   - 針が振れたぶんだけ、硬貨が窓口の向こうへ吸い込まれていく
 */
export function ParcelHome() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 郵便局の中 */}
      <rect width="400" height="210" fill="#4a4a5c" />
      <rect width="400" height="120" fill="#5c5c72" />
      <g fill="#6e6e88">
        <rect x="20" y="18" width="76" height="54" rx="3" />
        <rect x="300" y="18" width="76" height="54" rx="3" />
      </g>
      <g fill="#8a8aa8">
        <rect x="26" y="24" width="64" height="12" />
        <rect x="26" y="42" width="64" height="12" />
        <rect x="306" y="24" width="64" height="12" />
        <rect x="306" y="42" width="64" height="12" />
      </g>

      {/* カウンター */}
      <rect y="132" width="400" height="78" fill="#7a5a34" />
      <rect y="126" width="400" height="10" fill="#9a7444" />

      {/* 秤 */}
      <g transform="translate(268,126)">
        <rect x="-40" y="-10" width="80" height="10" rx="3" fill="#8f9aa8" />
        <rect x="-30" y="-58" width="8" height="48" fill="#7f8a99" />
        <circle cx="-26" cy="-70" r="20" fill="#e8e2d2" stroke="#5f6b7a" strokeWidth="3" />
        <g transform="translate(-26,-70)">
          <rect className="pcl-needle" x="-1.6" y="-16" width="3.2" height="17" rx="1.6" fill="#e8443f" />
        </g>
        <circle cx="-26" cy="-70" r="3" fill="#5f6b7a" />
      </g>

      {/* 秤に載った箱 */}
      <g transform="translate(276,116)">
        <path d="M-34,0 L34,0 L34,-34 L-34,-34z" fill="#c9a877" />
        <path d="M-34,-34 L34,-34 L22,-46 L-22,-46z" fill="#a8813c" />
        <rect x="-5" y="-46" width="10" height="46" fill="#e8dfc8" />
        <rect x="-34" y="-22" width="68" height="7" fill="#e8dfc8" />
      </g>

      {/* 箱に落ちていく品 */}
      <g>
        <rect className="pcl-drop-a" x="248" y="46" width="22" height="14" rx="3" fill="#e8443f" />
        <circle className="pcl-drop-b" cx="298" cy="42" r="9" fill="#5b8fe8" />
      </g>

      {/* 口の閉まらない鞄 */}
      <g transform="translate(92,206)">
        <path d="M-46,0 L-40,-52 L40,-52 L46,0z" fill="#3b4a63" />
        <path d="M-42,-52 L42,-52 L38,-64 L-38,-64z" fill="#2f3b52" />
        <path d="M-30,-64 q30,-16 60,0z" fill="#4a5c78" />
        <g fill="#e8dfc8">
          <rect x="-26" y="-78" width="20" height="16" rx="3" transform="rotate(-12 -16 -70)" />
          <rect x="4" y="-76" width="24" height="14" rx="3" transform="rotate(10 16 -69)" />
        </g>
        <rect x="-10" y="-34" width="20" height="12" rx="3" fill="#f5b31c" />
      </g>

      {/* 出ていく送料 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="pcl-coin-a" cx="176" cy="120" r="8" />
        <circle className="pcl-coin-b" cx="176" cy="120" r="7" />
        <circle className="pcl-coin-c" cx="176" cy="120" r="6" />
      </g>

      <style>{`
        .pcl-needle {
          transform-origin: 0 16px;
          animation: pcl-weigh 4.4s ease-in-out infinite;
        }
        .pcl-drop-a {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: pcl-fall 4.4s ease-in infinite;
        }
        .pcl-drop-b {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: pcl-fall 4.4s ease-in infinite;
          animation-delay: -2.2s;
        }
        .pcl-coin-a { animation: pcl-spend 3.2s ease-in infinite; }
        .pcl-coin-b { animation: pcl-spend 3.2s ease-in infinite; animation-delay: -1.1s; }
        .pcl-coin-c { animation: pcl-spend 3.2s ease-in infinite; animation-delay: -2.2s; }
        @keyframes pcl-weigh {
          0%, 8% { transform: rotate(-52deg); }
          40% { transform: rotate(-8deg); }
          70%, 100% { transform: rotate(34deg); }
        }
        @keyframes pcl-fall {
          0% { transform: translate(0, -44px) rotate(0deg); opacity: 0; }
          14% { opacity: 1; }
          46% { transform: translate(6px, 26px) rotate(40deg); opacity: 1; }
          56%, 100% { transform: translate(8px, 32px) rotate(48deg); opacity: 0; }
        }
        @keyframes pcl-spend {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          18% { opacity: 1; }
          100% { transform: translate(96px, -46px) scale(0.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pcl-needle, .pcl-drop-a, .pcl-drop-b,
          .pcl-coin-a, .pcl-coin-b, .pcl-coin-c { animation: none; }
          .pcl-drop-a, .pcl-drop-b { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
