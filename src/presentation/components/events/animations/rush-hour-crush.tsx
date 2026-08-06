/**
 * 通勤ラッシュの押し合いで眼鏡が犠牲になる(関東)。
 *
 * 白手袋の駅員が客を押し込み、締まる扉から割れた眼鏡が飛び出してホームに落ちる。
 */
export function RushHourCrush() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 駅のホーム */}
      <rect width="400" height="210" fill="#1b2c3e" />
      <rect y="158" width="400" height="52" fill="#3c4653" />
      <rect y="158" width="400" height="4" fill="#5b6672" />
      <rect y="180" width="400" height="7" fill="#c9992a" />

      {/* 車両 */}
      <rect x="86" y="16" width="314" height="142" rx="8" fill="#c9d2da" />
      <rect x="86" y="104" width="314" height="15" fill="#2f6fbf" />
      <rect x="86" y="146" width="314" height="12" fill="#8b96a1" />
      <rect x="96" y="34" width="66" height="46" rx="4" fill="#16212c" />
      <rect x="330" y="34" width="62" height="46" rx="4" fill="#16212c" />

      {/* 扉の開口部と、詰め込まれた乗客 */}
      <rect x="176" y="30" width="94" height="128" fill="#101b26" />
      <g className="rh-crowd">
        <g fill="#3f4c63">
          <rect x="180" y="86" width="30" height="72" rx="9" />
          <rect x="236" y="90" width="30" height="68" rx="9" />
        </g>
        <rect x="208" y="80" width="32" height="78" rx="10" fill="#5b4a6b" />
        <circle cx="195" cy="76" r="13" fill="#f6efe2" />
        <circle cx="224" cy="68" r="14" fill="#f6efe2" />
        <circle cx="251" cy="80" r="12" fill="#f6efe2" />
        <g fill="#2a2233">
          <path d="M182,72 Q195,58 208,72 L208,64 Q195,54 182,64z" />
          <path d="M210,64 Q224,50 238,64 L238,56 Q224,46 210,56z" />
          <path d="M239,76 Q251,63 263,76 L263,68 Q251,59 239,68z" />
        </g>
      </g>

      {/* 押し込まれる扉 */}
      <g className="rh-door-l">
        <rect x="132" y="30" width="44" height="128" fill="#dbe3e9" />
        <rect x="140" y="44" width="28" height="40" rx="3" fill="#16212c" />
        <rect x="172" y="30" width="4" height="128" fill="#8b96a1" />
      </g>
      <g className="rh-door-r">
        <rect x="270" y="30" width="44" height="128" fill="#dbe3e9" />
        <rect x="278" y="44" width="28" height="40" rx="3" fill="#16212c" />
        <rect x="270" y="30" width="4" height="128" fill="#8b96a1" />
      </g>

      {/* 白手袋の駅員 */}
      <g className="rh-pusher">
        <rect x="322" y="118" width="30" height="52" rx="8" fill="#243a5a" />
        <rect x="326" y="168" width="9" height="26" rx="3" fill="#1b2740" />
        <rect x="340" y="168" width="9" height="26" rx="3" fill="#1b2740" />
        <circle cx="337" cy="104" r="14" fill="#f6efe2" />
        <path d="M321,100 Q337,84 353,100 L353,94 Q337,82 321,94z" fill="#1b2740" />
        <rect x="288" y="120" width="38" height="9" rx="4" fill="#243a5a" />
        <rect x="288" y="141" width="38" height="9" rx="4" fill="#243a5a" />
        <circle cx="286" cy="124" r="8" fill="#f7f7f2" />
        <circle cx="286" cy="145" r="8" fill="#f7f7f2" />
      </g>

      {/* 弾き出された衝撃 */}
      <g className="rh-burst" stroke="#f5b31c" strokeWidth="3" strokeLinecap="round">
        <path d="M238,46 L238,34" />
        <path d="M222,50 L214,40" />
        <path d="M254,50 L262,40" />
      </g>

      {/* 割れた眼鏡 */}
      <g className="rh-fly">
        <g className="rh-spin">
          <rect x="216" y="56" width="46" height="4" rx="2" fill="#2a2a2a" />
          <circle cx="224" cy="62" r="10" fill="#8fb6cf" opacity="0.55" />
          <circle cx="254" cy="62" r="10" fill="#8fb6cf" opacity="0.55" />
          <circle cx="224" cy="62" r="10" fill="none" stroke="#2a2a2a" strokeWidth="4" />
          <circle cx="254" cy="62" r="10" fill="none" stroke="#2a2a2a" strokeWidth="4" />
          <path d="M234,62 L244,62" stroke="#2a2a2a" strokeWidth="4" />
          <path d="M247,55 L252,63 L246,66 L262,70" stroke="#f7f7f2" strokeWidth="2" fill="none" />
        </g>
      </g>

      <style>{`
        .rh-door-l { animation: rh-shut-l 1.8s ease-in-out infinite; }
        .rh-door-r { animation: rh-shut-r 1.8s ease-in-out infinite; }
        .rh-crowd { transform-origin: 223px 120px; animation: rh-squeeze 1.8s ease-in-out infinite; }
        .rh-pusher { animation: rh-shove 1.8s ease-in-out infinite; }
        .rh-burst { transform-origin: 238px 48px; animation: rh-pop 2.7s ease-out infinite; }
        .rh-fly { animation: rh-arc 2.7s ease-in infinite; }
        .rh-spin { transform-origin: 239px 62px; animation: rh-tumble 2.7s linear infinite; }
        @keyframes rh-shut-l {
          0%, 100% { transform: translate(0, 0); }
          55% { transform: translate(20px, 0); }
        }
        @keyframes rh-shut-r {
          0%, 100% { transform: translate(0, 0); }
          55% { transform: translate(-20px, 0); }
        }
        @keyframes rh-squeeze {
          0%, 100% { transform: scaleX(1); }
          55% { transform: scaleX(0.84); }
        }
        @keyframes rh-shove {
          0%, 100% { transform: translate(0, 0); }
          55% { transform: translate(-14px, 0); }
        }
        @keyframes rh-pop {
          0%, 24% { transform: scale(0.3); opacity: 0; }
          32% { transform: scale(1); opacity: 1; }
          46%, 100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes rh-arc {
          0%, 26% { transform: translate(0, 0); opacity: 1; }
          60% { transform: translate(-70px, 26px); }
          84% { transform: translate(-118px, 122px); opacity: 1; }
          92% { transform: translate(-124px, 116px); }
          97%, 100% { transform: translate(-128px, 124px); opacity: 0; }
        }
        @keyframes rh-tumble {
          0%, 26% { transform: rotate(-12deg); }
          100% { transform: rotate(300deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rh-door-l, .rh-door-r, .rh-crowd, .rh-pusher, .rh-burst, .rh-fly, .rh-spin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
