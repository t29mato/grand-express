/**
 * 流氷が予定より早く押し寄せ、フェリーが欠航して宿代を払うことになる。
 *
 * 岸につながれたまま動けない船に氷が寄せ、旅人は
 * 灯りのついた宿へ引き返して一泊分を払う。
 */
export function DriftIceCruise() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の港 */}
      <rect width="400" height="210" fill="#3b566e" />
      <path d="M0,118 L54,84 L108,118 Z" fill="#6d8ba1" />
      <path d="M96,118 L150,90 L198,118 Z" fill="#6d8ba1" />
      <rect y="118" width="400" height="92" fill="#2a4a63" />

      {/* 桟橋 */}
      <rect x="300" y="140" width="100" height="9" fill="#4a3524" />
      <rect x="318" y="149" width="8" height="42" fill="#4a3524" />
      <rect x="364" y="149" width="8" height="42" fill="#4a3524" />

      {/* 出られないフェリー */}
      <g className="dic-ferry">
        <rect x="246" y="76" width="3" height="22" fill="#4a3524" />
        <rect x="284" y="78" width="17" height="19" rx="2" fill="#e8443f" />
        <rect x="284" y="78" width="17" height="5" fill="#20364a" />
        <rect x="236" y="96" width="74" height="24" rx="2" fill="#f6efe2" />
        <rect x="242" y="101" width="62" height="9" fill="#20364a" />
        <path d="M206,120 L336,120 L322,150 L220,150 Z" fill="#f6efe2" />
        <rect x="206" y="120" width="130" height="7" fill="#3b6fa8" />
        <g fill="#20364a">
          <circle cx="232" cy="136" r="4" />
          <circle cx="254" cy="136" r="4" />
          <circle cx="276" cy="136" r="4" />
          <circle cx="298" cy="136" r="4" />
        </g>
      </g>

      {/* 船体に詰んだ流氷 */}
      <path d="M196,146 L226,141 L248,152 L212,161 Z" fill="#e8f2f7" />
      <path d="M244,152 L286,147 L306,158 L262,165 Z" fill="#cfe3ee" />
      <path d="M300,145 L340,143 L352,154 L312,159 Z" fill="#e8f2f7" />

      {/* 押し寄せる流氷 */}
      <path className="dic-floe dic-floe-1" d="M0,168 L34,162 L56,170 L24,178 Z" fill="#e8f2f7" />
      <path className="dic-floe dic-floe-2" d="M0,184 L40,178 L60,188 L20,196 Z" fill="#cfe3ee" />
      <path className="dic-floe dic-floe-3" d="M0,156 L28,152 L46,160 L18,166 Z" fill="#e8f2f7" />
      <path className="dic-floe dic-floe-4" d="M0,200 L44,194 L64,204 L22,210 Z" fill="#cfe3ee" />
      <path className="dic-floe dic-floe-5" d="M0,176 L30,170 L50,180 L16,186 Z" fill="#e8f2f7" />

      {/* 雪の岸 */}
      <path d="M0,110 L60,106 L124,114 L166,210 L0,210 Z" fill="#dfeaf2" />

      {/* 泊まる宿 */}
      <path d="M18,116 L66,88 L114,116 Z" fill="#2a2436" />
      <path d="M66,92 L96,110 L36,110 Z" fill="#e8f2f7" />
      <rect x="28" y="116" width="76" height="48" fill="#3a3040" />
      <rect className="dic-window" x="38" y="126" width="22" height="18" fill="#f5b31c" />
      <rect x="72" y="132" width="20" height="32" fill="#4a3524" />
      <rect x="70" y="130" width="24" height="9" fill="#c0392b" />

      {/* 宿代を払う旅人 */}
      <circle cx="126" cy="126" r="11" fill="#f6efe2" />
      <rect x="115" y="112" width="22" height="8" rx="4" fill="#c0392b" />
      <rect x="113" y="138" width="26" height="30" rx="6" fill="#c0392b" />
      <rect x="138" y="146" width="14" height="14" rx="2" fill="#4a3524" />
      <rect x="116" y="168" width="9" height="14" rx="4" fill="#20364a" />
      <rect x="128" y="168" width="9" height="14" rx="4" fill="#20364a" />
      <rect x="94" y="142" width="22" height="8" rx="4" fill="#c0392b" />
      <circle cx="94" cy="146" r="4.5" fill="#f6efe2" />
      <g className="dic-coin">
        <circle r="6" fill="#f5b31c" />
        <circle r="3" fill="#c98f10" />
      </g>

      {/* 雪 */}
      <circle className="dic-snow dic-snow-1" cx="0" cy="0" r="3" fill="#f6efe2" />
      <circle className="dic-snow dic-snow-2" cx="0" cy="0" r="2" fill="#f6efe2" />
      <circle className="dic-snow dic-snow-3" cx="0" cy="0" r="2.5" fill="#f6efe2" />
      <circle className="dic-snow dic-snow-4" cx="0" cy="0" r="2" fill="#f6efe2" />

      <style>{`
        .dic-ferry { transform-box: fill-box; transform-origin: 50% 100%; animation: dic-moor 5s ease-in-out infinite; }
        .dic-floe { animation: dic-drift 12s linear infinite; }
        .dic-floe-1 { transform: translateX(60px); animation-duration: 11s; animation-delay: -3s; }
        .dic-floe-2 { transform: translateX(160px); animation-duration: 14s; animation-delay: -8s; }
        .dic-floe-3 { transform: translateX(250px); animation-duration: 9s; animation-delay: -5s; }
        .dic-floe-4 { transform: translateX(320px); animation-duration: 16s; animation-delay: -11s; }
        .dic-floe-5 { transform: translateX(210px); animation-duration: 12s; animation-delay: -1s; }
        .dic-window { animation: dic-lamp 3.4s ease-in-out infinite; }
        .dic-coin { transform: translate(88px, 136px); animation: dic-pay 3.4s ease-in-out infinite; }
        .dic-snow-1 { transform: translate(200px, 60px); animation: dic-fall-1 7s linear -2s infinite; }
        .dic-snow-2 { transform: translate(300px, 40px); animation: dic-fall-2 5.5s linear -4s infinite; }
        .dic-snow-3 { transform: translate(120px, 30px); animation: dic-fall-3 6.5s linear -1s infinite; }
        .dic-snow-4 { transform: translate(360px, 70px); animation: dic-fall-4 8s linear -6s infinite; }
        @keyframes dic-moor {
          0%, 100% { transform: rotate(-1.2deg); }
          50% { transform: rotate(1.2deg); }
        }
        @keyframes dic-drift {
          from { transform: translateX(430px); }
          to { transform: translateX(-80px); }
        }
        @keyframes dic-lamp {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.72; }
        }
        @keyframes dic-pay {
          0%, 18% { transform: translate(90px, 142px); opacity: 0; }
          30% { transform: translate(88px, 136px); opacity: 1; }
          68% { transform: translate(80px, 132px); opacity: 1; }
          88%, 100% { transform: translate(76px, 130px); opacity: 0; }
        }
        @keyframes dic-fall-1 {
          from { transform: translate(250px, -20px); }
          to { transform: translate(150px, 230px); }
        }
        @keyframes dic-fall-2 {
          from { transform: translate(340px, -20px); }
          to { transform: translate(268px, 230px); }
        }
        @keyframes dic-fall-3 {
          from { transform: translate(160px, -20px); }
          to { transform: translate(60px, 230px); }
        }
        @keyframes dic-fall-4 {
          from { transform: translate(392px, -20px); }
          to { transform: translate(320px, 230px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dic-ferry, .dic-floe, .dic-window, .dic-coin,
          .dic-snow-1, .dic-snow-2, .dic-snow-3, .dic-snow-4 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
