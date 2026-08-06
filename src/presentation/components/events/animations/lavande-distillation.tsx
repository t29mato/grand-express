/**
 * ラヴェンダーを刈り、積んで、湯気の立つ荷車を引いて蒸留所へ下る(プロヴァンス)。
 *
 *   - 畝のあいだに刈り跡がひと筋あり、そこをトラクターが荷車を引いて進む
 *   - 荷車は刈った花で山盛りになり、湯気を上げている
 *   - 行き先の蒸留所では白鳥の首から精油がしたたり、代金のコインが舞い上がる
 */
export function LavandeDistillation() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* プロヴァンスの空 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="42" width="400" height="20" fill="#c4d8ee" />
      <circle cx="58" cy="34" r="17" fill="#f5d06a" />

      {/* 遠くの山なみ */}
      <path d="M0,88 L52,54 L104,80 L158,58 L214,88z" fill="#9aa2b0" />
      <path d="M200,88 Q280,64 400,84 L400,88z" fill="#8e97a8" />

      {/* 高原 */}
      <rect y="86" width="400" height="124" fill="#c9a877" />
      <rect y="86" width="400" height="6" fill="#d8c9a4" />

      {/* ラヴェンダーの畝 */}
      <g fill="#8a7ab8">
        <rect y="98" width="400" height="12" />
        <rect y="116" width="400" height="14" />
        <rect y="162" width="400" height="18" />
        <rect y="188" width="400" height="22" />
      </g>
      <g fill="#6f5f9c" opacity="0.6">
        <rect y="106" width="400" height="4" />
        <rect y="125" width="400" height="5" />
        <rect y="174" width="400" height="6" />
        <rect y="203" width="400" height="7" />
      </g>

      {/* 刈り跡のひと筋(トラクターが通る道) */}
      <rect y="136" width="400" height="22" fill="#b39a6a" />
      <g stroke="#9c8354" strokeWidth="2" opacity="0.7" fill="none">
        <path d="M0,142h400M0,152h400" />
      </g>

      {/* 蒸留所(行き先) */}
      <g transform="translate(348,132)">
        {/* 小屋 */}
        <rect x="-34" y="-46" width="68" height="46" fill="#e0d6c0" />
        <path d="M-40,-46 h80 l-12,-16 h-56z" fill="#c2603c" />
        <rect x="-12" y="-24" width="20" height="24" fill="#6b4423" />
        {/* 銅の蒸留器 */}
        <g transform="translate(-2,-2)">
          <path d="M-16,-26 q16,-9 32,0 l-3,26 h-26z" fill="#c98a4c" />
          <rect x="-18" y="-29" width="36" height="5" rx="2" fill="#a86f33" />
          <path d="M14,-28 C28,-36 33,-22 28,-12 L28,-4" stroke="#c98a4c" strokeWidth="4.4" fill="none" strokeLinecap="round" />
          <path className="lav-fire" d="M-9,0 q4,-11 9,-2 q5,-9 9,2z" fill="#e8443f" />
          <g fill="#f5d06a">
            <circle className="lav-drip lav-o1" cx="28" cy="-2" r="2.4" />
            <circle className="lav-drip lav-o2" cx="28" cy="-2" r="2" />
          </g>
        </g>
        {/* 屋根から抜ける蒸気 */}
        <g stroke="#e8e2f0" strokeWidth="3.4" fill="none" strokeLinecap="round">
          <path className="lav-vent lav-w1" d="M8,-64 C2,-72 14,-78 8,-88" />
        </g>
      </g>

      {/* 荷車を引いて蒸留所へ向かうトラクター */}
      <g className="lav-rig">
        {/* 湯気を上げる荷車 */}
        <g transform="translate(52,158)">
          <rect x="-30" y="-20" width="60" height="16" rx="3" fill="#8a5a2c" />
          <rect x="-30" y="-20" width="60" height="4" fill="#6b4423" />
          <path d="M-29,-20 q15,-19 30,-11 q15,-9 29,11z" fill="#7a68ac" />
          <g fill="#9a8ac4">
            <ellipse cx="-16" cy="-26" rx="7" ry="4" />
            <ellipse cx="3" cy="-30" rx="8" ry="4.4" />
            <ellipse cx="20" cy="-25" rx="7" ry="4" />
          </g>
          <circle cx="-18" cy="-2" r="7" fill="#3a3428" />
          <circle cx="18" cy="-2" r="7" fill="#3a3428" />
          <circle cx="-18" cy="-2" r="3" fill="#8a8578" />
          <circle cx="18" cy="-2" r="3" fill="#8a8578" />
          <g stroke="#e8e2f0" strokeWidth="3.2" fill="none" strokeLinecap="round">
            <path className="lav-steam lav-t1" d="M-10,-36 C-16,-44 -4,-50 -10,-60" />
            <path className="lav-steam lav-t2" d="M10,-36 C4,-44 16,-50 10,-60" />
          </g>
        </g>
        {/* 連結棒 */}
        <rect x="82" y="152" width="14" height="4" rx="2" fill="#5a4630" />
        {/* トラクター */}
        <g transform="translate(122,158)">
          <rect x="-26" y="-22" width="48" height="18" rx="4" fill="#e8443f" />
          <rect x="-16" y="-36" width="26" height="15" rx="3" fill="#3b4a63" />
          <rect x="-12" y="-33" width="18" height="9" fill="#bfe0f0" />
          <rect x="-30" y="-30" width="6" height="10" rx="2" fill="#3a3428" />
          <circle cx="-16" cy="-2" r="8" fill="#3a3428" />
          <circle cx="12" cy="-2" r="11" fill="#3a3428" />
          <circle cx="-16" cy="-2" r="3.4" fill="#8a8578" />
          <circle cx="12" cy="-2" r="4.4" fill="#8a8578" />
          {/* 排気 */}
          <g fill="#c9c0d4">
            <circle className="lav-puff lav-u1" cx="-27" cy="-34" r="3.4" opacity="0.55" />
            <circle className="lav-puff lav-u2" cx="-27" cy="-34" r="4.4" opacity="0.4" />
          </g>
        </g>
      </g>

      {/* 刈られて舞う花 */}
      <g fill="#8a7ab8">
        <ellipse className="lav-chip lav-p1" cx="180" cy="146" rx="3.4" ry="1.8" />
        <ellipse className="lav-chip lav-p2" cx="196" cy="152" rx="3" ry="1.6" />
      </g>

      {/* 蒸留所からの支払い */}
      <g className="lav-coin lav-c1">
        <circle cx="248" cy="112" r="10" fill="#f5b31c" />
        <circle cx="248" cy="112" r="5" fill="#d8930d" />
      </g>
      <g className="lav-coin lav-c2">
        <circle cx="270" cy="124" r="8" fill="#f5b31c" />
        <circle cx="270" cy="124" r="4" fill="#d8930d" />
      </g>

      <style>{`
        .lav-rig, .lav-chip, .lav-steam, .lav-vent, .lav-puff,
        .lav-fire, .lav-drip, .lav-coin {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .lav-rig { transform-origin: 0% 50%; animation: lav-haul 11s ease-in-out infinite; }
        .lav-chip { animation: lav-fly 1.6s ease-out infinite; }
        .lav-p2 { animation-delay: -0.8s; }
        .lav-steam { transform-origin: 50% 100%; animation: lav-waft 3s ease-out infinite; }
        .lav-t2 { animation-delay: -1.5s; }
        .lav-vent { transform-origin: 50% 100%; animation: lav-waft 3.8s ease-out infinite; }
        .lav-puff { animation: lav-exhaust 2.4s linear infinite; }
        .lav-u2 { animation-duration: 3s; animation-delay: -1.4s; }
        .lav-fire { transform-origin: 50% 100%; animation: lav-flicker 0.8s ease-in-out infinite; }
        .lav-drip { animation: lav-drip 2.2s ease-in infinite; }
        .lav-o2 { animation-delay: -1.1s; }
        .lav-coin { animation: lav-rise 2.6s ease-out infinite; }
        .lav-c2 { animation-delay: -1.3s; }
        @keyframes lav-haul {
          0% { transform: translateX(-60px); }
          88%, 100% { transform: translateX(146px); }
        }
        @keyframes lav-fly {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          25% { opacity: 0.9; }
          100% { transform: translate(-24px, -20px) rotate(220deg); opacity: 0; }
        }
        @keyframes lav-waft {
          0% { transform: translateY(10px) scale(0.5); opacity: 0; }
          30% { opacity: 0.85; }
          100% { transform: translateY(-16px) scale(1.2); opacity: 0; }
        }
        @keyframes lav-exhaust {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          25% { opacity: 0.5; }
          100% { transform: translate(-14px, -26px) scale(2); opacity: 0; }
        }
        @keyframes lav-flicker {
          0%, 100% { transform: scaleY(0.75); }
          50% { transform: scaleY(1.25); }
        }
        @keyframes lav-drip {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(14px); opacity: 0; }
        }
        @keyframes lav-rise {
          0% { transform: translate(0, 16px); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(-10px, -40px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lav-rig, .lav-chip, .lav-steam, .lav-vent, .lav-puff,
          .lav-fire, .lav-drip, .lav-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
