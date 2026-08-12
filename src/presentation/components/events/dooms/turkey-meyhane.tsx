/**
 * メイハーネの勘定が回ってくる。メゼの小皿とラクの杯が食卓を巡ったあと、
 * 誰も目を合わせようとしないまま勘定書きが真ん中に置かれる。
 *
 * 気まずさを大げさな悲劇にせず、**すべらせて置かれる勘定書きと、
 * そらされる目**で表す。動くのは、テーブルを滑る勘定書き1つだけ。
 */
export function TurkeyMeyhane() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の店内。 */}
      <rect width="400" height="210" fill="#2f2a3a" />
      <rect y="0" width="400" height="70" fill="#3a3450" />

      {/* 提灯の明かり。 */}
      <g fill="#f5b31c" opacity="0.9">
        <circle cx="70" cy="34" r="5" />
        <circle cx="330" cy="30" r="5" />
      </g>
      <g stroke="#6b5330" strokeWidth="1">
        <path d="M70,20v14M330,16v14" />
      </g>
      <g fill="#f5c060" opacity="0.25">
        <circle cx="70" cy="34" r="22" />
        <circle cx="330" cy="30" r="22" />
      </g>

      {/* 壁の棚とラク瓶。 */}
      <g>
        <rect x="10" y="50" width="90" height="6" fill="#5a4a5a" />
        <rect x="20" y="30" width="8" height="20" fill="#bfe0f0" opacity="0.8" />
        <rect x="34" y="34" width="8" height="16" fill="#bfe0f0" opacity="0.8" />
        <rect x="48" y="30" width="8" height="20" fill="#bfe0f0" opacity="0.8" />
      </g>

      {/* 長い食卓。 */}
      <rect x="40" y="140" width="320" height="14" fill="#6b5330" />
      <rect x="40" y="154" width="320" height="56" fill="#4a3a28" />

      {/* メゼの小皿(何枚も)。 */}
      <g fill="#f6efe2" stroke="#c9bda0" strokeWidth="1">
        <circle cx="90" cy="134" r="10" />
        <circle cx="150" cy="132" r="10" />
        <circle cx="210" cy="134" r="10" />
        <circle cx="270" cy="132" r="10" />
        <circle cx="320" cy="134" r="10" />
      </g>
      <g fill="#3f6f34"><circle cx="90" cy="134" r="4" /><circle cx="270" cy="132" r="4" /></g>
      <g fill="#c9531a"><circle cx="150" cy="132" r="4" /></g>
      <g fill="#8a1f2b"><circle cx="210" cy="134" r="4" /><circle cx="320" cy="134" r="4" /></g>

      {/* ラクのグラス。 */}
      <g fill="#f6efe2" opacity="0.9">
        <rect x="120" y="122" width="6" height="12" />
        <rect x="180" y="120" width="6" height="12" />
        <rect x="240" y="122" width="6" height="12" />
      </g>

      {/* 食卓を囲む人々(目をそらす)。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="70" cy="118" r="9" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="60" y="126" width="20" height="14" fill="#5b8fe8" />
        <circle cx="160" cy="116" r="9" fill="#c98a5a" stroke="#20364a" strokeWidth="2" />
        <rect x="150" y="124" width="20" height="14" fill="#8a1f2b" />
        <circle cx="250" cy="118" r="9" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="240" y="126" width="20" height="14" fill="#3f6f34" />
        <circle cx="330" cy="116" r="9" fill="#c98a5a" stroke="#20364a" strokeWidth="2" />
        <rect x="320" y="124" width="20" height="14" fill="#5a4a5a" />
      </g>
      {/* そらされた視線(小さな矢印目)。 */}
      <g stroke="#20364a" strokeWidth="1.4" strokeLinecap="round">
        <path d="M66,117h-6M74,117h6" />
        <path d="M156,115h-6M164,115h6" />
        <path d="M246,117h-6M254,117h6" />
        <path d="M326,115h-6M334,115h6" />
      </g>

      {/* 滑ってくる勘定書き。**ここだけが動く。** */}
      <g className="mhn-bill">
        <rect x="-10" y="-13" width="20" height="26" rx="1.4" fill="#f6efe2" stroke="#3a2e1c" strokeWidth="1.4" />
        <g stroke="#8a8478" strokeWidth="1"><path d="M-6,-7h12M-6,-2h12M-6,3h12M-6,8h8" /></g>
      </g>

      <style>{`
        .mhn-bill {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: mhn-slide 3s ease-in-out infinite;
        }
        @keyframes mhn-slide {
          0%   { transform: translate(80px, 148px) rotate(-6deg); }
          50%  { transform: translate(200px, 148px) rotate(3deg); }
          100% { transform: translate(80px, 148px) rotate(-6deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mhn-bill {
            animation: none;
            transform: translate(200px, 148px) rotate(3deg);
          }
        }
      `}</style>
    </svg>
  );
}
