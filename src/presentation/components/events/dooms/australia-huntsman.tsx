/**
 * 運転中にダッシュボードへ大グモが降ってくる。クモそのものは
 * 大きく怖がらせず、平たい体と長い脚だけの簡潔な形にする。
 * 動くのはサンバイザーから落ちてくるクモと、驚いてのけぞる腕だけ。
 */
export function AustraliaHuntsman() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 車内。フロントガラス越しの道路。 */}
      <rect width="400" height="210" fill="#20242a" />
      <path d="M0,0 L400,0 L340,90 L60,90 Z" fill="#8fc4e8" />
      <rect y="90" width="400" height="10" fill="#4a4a52" />
      <path d="M0,100 L400,100 L400,210 L0,210 Z" fill="#2f3b4f" />

      {/* サンバイザー。 */}
      <rect x="40" y="4" width="90" height="14" rx="3" fill="#4a4a52" />

      {/* ダッシュボード。 */}
      <path d="M0,150 L400,150 L400,210 L0,210 Z" fill="#3a4048" />
      <rect x="140" y="160" width="120" height="30" rx="4" fill="#20242a" />
      <circle cx="90" cy="178" r="26" fill="none" stroke="#4a4a52" strokeWidth="8" />

      {/* ハンドルを握る手と、驚いてのけぞる腕。 */}
      <g className="ahm-flinch" style={{ transformOrigin: "90px 178px" }}>
        <path d="M90,178 L60,150" stroke="#d9a273" strokeWidth="10" strokeLinecap="round" />
      </g>

      {/* サンバイザーから落ちてくるクモ。 */}
      <g className="ahm-spider" style={{ transformOrigin: "85px 18px" }}>
        <line x1="85" y1="0" x2="85" y2="18" stroke="#4a4436" strokeWidth="1" />
        <g fill="#241a10">
          <ellipse cx="85" cy="22" rx="7" ry="9" />
          <circle cx="85" cy="14" r="4" />
          <path d="M78,20 q-10,-4 -16,2 M78,26 q-10,2 -14,10 M92,20 q10,-4 16,2 M92,26 q10,2 14,10" stroke="#241a10" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      </g>

      <style>{`
        .ahm-spider {
          transform-box: fill-box;
          animation: ahm-drop 2.4s ease-in infinite;
        }
        @keyframes ahm-drop {
          0%   { transform: translateY(0); }
          35%  { transform: translateY(140px); }
          55%  { transform: translateY(130px); }
          100% { transform: translateY(140px); }
        }
        .ahm-flinch {
          transform-box: fill-box;
          animation: ahm-jerk 2.4s ease-in-out infinite;
        }
        @keyframes ahm-jerk {
          0%, 30%  { transform: rotate(0deg); }
          45%      { transform: rotate(-24deg) translate(-6px, -4px); }
          65%      { transform: rotate(-14deg) translate(-4px, -2px); }
          100%     { transform: rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ahm-spider, .ahm-flinch {
            animation: none;
          }
          .ahm-spider { transform: translateY(140px); }
        }
      `}</style>
    </svg>
  );
}
