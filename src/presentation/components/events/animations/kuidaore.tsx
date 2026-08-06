/**
 * 食い倒れ。たこ焼き・串カツ・お好み焼きと食べ続けて散財する(近畿・大阪)。
 *
 * 次々に口へ飛び込む粉もんに合わせて腹がふくらみ、足元の財布から小銭がこぼれ落ちる。
 */
export function Kuidaore() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の繁華街 */}
      <rect width="400" height="210" fill="#241c2e" />
      <rect x="196" y="18" width="66" height="120" fill="#332942" />
      <rect x="272" y="34" width="58" height="104" fill="#2d2439" />
      <rect x="338" y="10" width="52" height="128" fill="#332942" />
      <g fill="#e8443f">
        <rect x="204" y="30" width="50" height="26" rx="3" />
        <rect x="346" y="24" width="36" height="52" rx="3" />
      </g>
      <g fill="#f5b31c">
        <rect x="280" y="46" width="42" height="16" rx="3" />
        <rect x="280" y="70" width="42" height="10" rx="3" />
        <rect x="212" y="66" width="34" height="10" rx="3" />
      </g>
      <g className="kd-lantern" fill="#d94b3f">
        <ellipse cx="330" cy="102" rx="13" ry="18" />
        <rect x="317" y="96" width="26" height="4" fill="#7d241d" />
        <rect x="317" y="106" width="26" height="4" fill="#7d241d" />
      </g>
      <rect y="138" width="400" height="72" fill="#2e2438" />
      <rect y="138" width="400" height="5" fill="#40334f" />

      {/* 食べ続ける旅人 */}
      <g>
        <rect x="88" y="176" width="12" height="26" rx="4" fill="#3b3550" />
        <rect x="110" y="176" width="12" height="26" rx="4" fill="#3b3550" />
        <ellipse className="kd-belly" cx="106" cy="146" rx="36" ry="32" fill="#5b8fe8" />
        <circle cx="104" cy="90" r="24" fill="#f6efe2" />
        <path d="M80,86 Q104,58 128,86 L128,76 Q104,54 80,74z" fill="#2a2233" />
        <circle cx="118" cy="84" r="3" fill="#2a2233" />
        <ellipse className="kd-mouth" cx="124" cy="102" rx="9" ry="8" fill="#7a2f2f" />
        <g className="kd-arm">
          <rect x="120" y="132" width="38" height="11" rx="5" fill="#f6efe2" />
          <circle cx="160" cy="137" r="8" fill="#f6efe2" />
        </g>
      </g>

      {/* たこ焼き */}
      <g className="kd-food">
        <rect x="286" y="86" width="30" height="4" rx="2" fill="#c8ae7d" transform="rotate(24 301 88)" />
        <circle cx="278" cy="96" r="14" fill="#c98a4a" />
        <circle cx="278" cy="94" r="11" fill="#6b3a1e" />
        <path d="M268,92 q10,5 20,0" stroke="#f7f7f2" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <g fill="#3f7a34">
          <circle cx="272" cy="100" r="2.2" />
          <circle cx="284" cy="99" r="2.2" />
        </g>
        <ellipse cx="279" cy="85" rx="6" ry="2.6" fill="#c9b48c" transform="rotate(-12 279 85)" />
      </g>

      {/* 串カツ */}
      <g className="kd-food kd-f2">
        <rect x="274" y="126" width="98" height="5" rx="2.5" fill="#c8ae7d" />
        <g fill="#d4a05c">
          <rect x="278" y="116" width="22" height="24" rx="6" />
          <rect x="306" y="116" width="22" height="24" rx="6" />
          <rect x="334" y="116" width="22" height="24" rx="6" />
        </g>
        <g fill="#6b3a1e">
          <path d="M280,122 q10,-8 20,0 q-10,6 -20,0z" />
          <path d="M308,122 q10,-8 20,0 q-10,6 -20,0z" />
          <path d="M336,122 q10,-8 20,0 q-10,6 -20,0z" />
        </g>
      </g>

      {/* お好み焼き */}
      <g className="kd-food kd-f3">
        <circle cx="322" cy="62" r="20" fill="#d8a45c" />
        <circle cx="322" cy="60" r="17" fill="#5a3520" />
        <path d="M307,55 q15,7 30,0" stroke="#f7f7f2" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M307,64 q15,7 30,0" stroke="#f7f7f2" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <g fill="#c9b48c">
          <ellipse cx="315" cy="49" rx="7" ry="3" transform="rotate(-16 315 49)" />
          <ellipse cx="331" cy="51" rx="6" ry="3" transform="rotate(14 331 51)" />
        </g>
        <g fill="#3f7a34">
          <circle cx="312" cy="70" r="2.4" />
          <circle cx="332" cy="68" r="2.4" />
        </g>
        <circle cx="322" cy="74" r="3" fill="#e8443f" />
      </g>

      {/* こぼれ落ちる財布の中身 */}
      <g>
        <path d="M310,182 L372,174 L376,200 L314,200z" fill="#6b4629" />
        <path d="M310,182 L372,174 L370,164 L308,172z" fill="#8a5f35" />
        <rect x="336" y="182" width="14" height="9" rx="2" fill="#4a2f1c" />
      </g>
      <g className="kd-coin">
        <circle cx="330" cy="168" r="8" fill="#f5b31c" />
        <circle cx="330" cy="168" r="4" fill="#d8930d" />
      </g>
      <g className="kd-coin kd-k2">
        <circle cx="352" cy="164" r="7" fill="#f5b31c" />
        <circle cx="352" cy="164" r="3.5" fill="#d8930d" />
      </g>
      <g className="kd-coin kd-k3">
        <circle cx="368" cy="160" r="6" fill="#f5b31c" />
        <circle cx="368" cy="160" r="3" fill="#d8930d" />
      </g>

      <style>{`
        .kd-food { animation: kd-eat 3s ease-in infinite; }
        .kd-f2 { animation-delay: 1s; }
        .kd-f3 { animation-delay: 2s; }
        .kd-mouth { transform-origin: 124px 102px; animation: kd-chew 1s ease-in-out infinite; }
        .kd-belly { transform-origin: 106px 178px; animation: kd-swell 3s ease-in-out infinite; }
        .kd-arm { transform-origin: 124px 137px; animation: kd-lift 1s ease-in-out infinite; }
        .kd-lantern { transform-origin: 330px 102px; animation: kd-glow 2.4s ease-in-out infinite; }
        .kd-coin { animation: kd-spill 2.2s ease-in infinite; }
        .kd-k2 { animation-delay: 0.7s; }
        .kd-k3 { animation-delay: 1.4s; }
        @keyframes kd-eat {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          14% { opacity: 1; }
          72% { transform: translate(-150px, 6px) scale(1); opacity: 1; }
          88%, 100% { transform: translate(-158px, 8px) scale(0.15); opacity: 0; }
        }
        @keyframes kd-chew {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(0.85, 0.35); }
        }
        @keyframes kd-swell {
          0% { transform: scale(0.9); }
          90%, 100% { transform: scale(1.12); }
        }
        @keyframes kd-lift {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-22deg); }
        }
        @keyframes kd-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes kd-spill {
          0% { transform: translate(0, 0); opacity: 1; }
          40% { transform: translate(14px, -18px); opacity: 1; }
          100% { transform: translate(34px, 40px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kd-food, .kd-mouth, .kd-belly, .kd-arm, .kd-lantern, .kd-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
