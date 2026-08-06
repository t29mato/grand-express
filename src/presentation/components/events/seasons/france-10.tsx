/**
 * 2月・クレープと謝肉祭。
 *
 * 二日、片手に硬貨を握って最初のクレープを宙返しさせる。その年、
 * 金に困らないようにという願いである。二週間後にはニースが山車で埋まり、
 * マントンは柑橘を積んで動物をこしらえる。
 */
export function France10() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の終わりの空。祭りの日だけ晴れている */}
      <rect width="400" height="210" fill="#9fb8cf" />
      <g fill="#c4d6e6">
        <ellipse className="f10-cloud" cx="80" cy="22" rx="52" ry="14" />
        <ellipse className="f10-cloud f10-cloud2" cx="300" cy="16" rx="46" ry="12" />
      </g>

      {/* 通りの建物 */}
      <rect y="42" width="400" height="112" fill="#e0c9a8" />
      <rect y="42" width="400" height="8" fill="#c3a983" />
      <g fill="#8fa8bd">
        <rect x="28" y="62" width="24" height="32" rx="2" />
        <rect x="120" y="62" width="24" height="32" rx="2" />
        <rect x="252" y="62" width="24" height="32" rx="2" />
        <rect x="344" y="62" width="24" height="32" rx="2" />
      </g>

      {/* 万国旗 */}
      <g>
        <path d="M0,52 q100,22 200,10 q100,-12 200,8" stroke="#8a6b4a" strokeWidth="2" fill="none" />
        <g className="f10-bunting">
          <path d="M34,58 l10,0 l-5,11z" fill="#e8443f" />
          <path d="M78,63 l10,0 l-5,11z" fill="#f5b31c" />
          <path d="M122,66 l10,0 l-5,11z" fill="#5b8fe8" />
          <path d="M166,67 l10,0 l-5,11z" fill="#7bc86c" />
          <path d="M210,65 l10,0 l-5,11z" fill="#e8443f" />
          <path d="M254,61 l10,0 l-5,11z" fill="#f5b31c" />
          <path d="M298,58 l10,0 l-5,11z" fill="#5b8fe8" />
          <path d="M342,58 l10,0 l-5,11z" fill="#7bc86c" />
        </g>
      </g>

      {/* 山車。大きな頭の人形が通っていく */}
      <g transform="translate(0,154)">
        <g className="f10-float">
          <rect x="-56" y="-24" width="112" height="24" rx="3" fill="#5b8fe8" />
          <g stroke="#3f6cc0" strokeWidth="3">
            <path d="M-40,-24 v24 M-16,-24 v24 M8,-24 v24 M32,-24 v24" />
          </g>
          <rect x="-46" y="-32" width="92" height="9" rx="3" fill="#f5b31c" />
          {/* 大きな頭 */}
          <g className="f10-head">
            <circle cx="0" cy="-64" r="30" fill="#f6efe2" />
            <circle cx="-11" cy="-70" r="4.5" fill="#2a2233" />
            <circle cx="11" cy="-70" r="4.5" fill="#2a2233" />
            <path d="M-13,-54 q13,12 26,0" stroke="#c0392b" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M-30,-72 q10,-24 30,-22 q20,-2 30,22 q-6,-30 -30,-30 q-24,0 -30,30z" fill="#e8443f" />
            <circle cx="0" cy="-96" r="5" fill="#f5b31c" />
          </g>
          {/* 胴 */}
          <path d="M-20,-32 L-16,-38 L16,-38 L20,-32z" fill="#7bc86c" />
          <circle cx="-34" cy="-2" r="9" fill="#2a2233" />
          <circle cx="-34" cy="-2" r="4" fill="#6b6478" />
          <circle cx="34" cy="-2" r="9" fill="#2a2233" />
          <circle cx="34" cy="-2" r="4" fill="#6b6478" />
        </g>
      </g>

      {/* 柑橘で組んだ動物(マントン) */}
      <g transform="translate(348,154)">
        <path d="M-26,0 q-4,-24 10,-30 q6,-16 20,-12 q14,4 12,20 q-2,18 -14,22z" fill="#e8a11c" />
        <g fill="#f5b31c">
          <circle cx="-16" cy="-8" r="6" />
          <circle cx="-4" cy="-14" r="6" />
          <circle cx="8" cy="-8" r="6" />
          <circle cx="-10" cy="-22" r="6" />
          <circle cx="4" cy="-26" r="6" />
          <circle cx="14" cy="-18" r="6" />
        </g>
        <g fill="#f7c752">
          <circle cx="-14" cy="-32" r="5" />
          <circle cx="0" cy="-36" r="5" />
        </g>
        <circle cx="4" cy="-40" r="8" fill="#e8a11c" />
        <circle cx="1" cy="-42" r="1.8" fill="#7a4a12" />
        <path d="M-3,-46 l-4,-6 l7,2z M9,-47 l5,-5 l-1,7z" fill="#e8a11c" />
        <g fill="#4f8a3c">
          <path d="M-8,-30 l-7,-4 l6,-3z" />
          <path d="M10,-24 l7,-4 l-6,-3z" />
        </g>
      </g>

      {/* 舗道 */}
      <rect y="154" width="400" height="56" fill="#b3a894" />
      <rect y="154" width="400" height="5" fill="#928871" />

      {/* クレープ屋。硬貨を握って宙返しさせる */}
      <g transform="translate(84,204)">
        <rect x="-52" y="-26" width="104" height="8" rx="2" fill="#8a5f36" />
        <path d="M-44,-18 L-40,0 M44,-18 L40,0" stroke="#6b4526" strokeWidth="5" strokeLinecap="round" />
        {/* 焼き台 */}
        <circle cx="-22" cy="-30" r="17" fill="#4a4436" />
        <circle cx="-22" cy="-30" r="13" fill="#5f5847" />
        {/* 焼き手 */}
        <g transform="translate(24,-26)">
          <g className="f10-cook">
            <path d="M-14,0 L-12,-30 L12,-30 L14,0z" fill="#37b3a4" />
            <path d="M-9,0 L-8,-22 L8,-22 L9,0z" fill="#f4f1e8" />
            <circle cx="0" cy="-41" r="12" fill="#f6efe2" />
            <path d="M-12,-45 q12,-12 24,-2 q2,-13 -12,-13 q-13,0 -12,15z" fill="#3b2f24" />
            {/* 硬貨を握った手 */}
            <g className="f10-coinhand">
              <path d="M11,-27 q8,-4 9,-11" stroke="#f6efe2" strokeWidth="5" strokeLinecap="round" fill="none" />
              <circle cx="21" cy="-40" r="5" fill="#f5b31c" />
              <circle cx="21" cy="-40" r="2.4" fill="#d99a10" />
            </g>
            {/* 鍋を持つ手 */}
            <path d="M-11,-27 q-8,-1 -9,-6" stroke="#f6efe2" strokeWidth="5" strokeLinecap="round" fill="none" />
          </g>
        </g>
        {/* 鍋 */}
        <g transform="translate(-22,-40)">
          <g className="f10-pan">
            <ellipse cx="0" cy="0" rx="17" ry="4.5" fill="#3b352c" />
            <rect x="14" y="-3" width="22" height="4" rx="2" fill="#3b352c" />
          </g>
        </g>
        {/* 宙返りするクレープ */}
        <g transform="translate(-22,-46)">
          <g className="f10-crepe">
            <ellipse cx="0" cy="0" rx="15" ry="4" fill="#e8c98a" />
            <ellipse cx="0" cy="-1.5" rx="15" ry="4" fill="#f2d9a4" />
          </g>
        </g>
      </g>

      {/* 紙吹雪 */}
      <g>
        <rect className="f10-confetti" x="60" y="0" width="5" height="8" rx="1" fill="#e8443f" />
        <rect className="f10-confetti f10-c2" x="150" y="0" width="5" height="8" rx="1" fill="#f5b31c" />
        <rect className="f10-confetti f10-c3" x="228" y="0" width="5" height="8" rx="1" fill="#5b8fe8" />
        <rect className="f10-confetti f10-c4" x="300" y="0" width="5" height="8" rx="1" fill="#7bc86c" />
        <rect className="f10-confetti f10-c5" x="368" y="0" width="5" height="8" rx="1" fill="#e8443f" />
        <rect className="f10-confetti f10-c6" x="104" y="0" width="5" height="8" rx="1" fill="#c98fd0" />
      </g>

      <style>{`
        .f10-cloud { animation: f10-drift 15s ease-in-out infinite; }
        .f10-cloud2 { animation-delay: 3.4s; animation-duration: 12s; }
        .f10-bunting {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: f10-flutter 3.4s ease-in-out infinite;
        }
        .f10-float {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f10-parade 12s linear infinite backwards;
        }
        .f10-head {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f10-nod 2.6s ease-in-out infinite;
        }
        .f10-cook {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f10-toss 3s ease-in-out infinite;
        }
        .f10-coinhand {
          transform-box: fill-box; transform-origin: 0 100%;
          animation: f10-grip 3s ease-in-out infinite;
        }
        .f10-pan {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f10-flick 3s ease-in-out infinite;
        }
        .f10-crepe {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f10-flip 3s ease-in-out infinite;
        }
        .f10-confetti {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f10-drop 5.4s linear infinite backwards;
        }
        .f10-c2 { animation-delay: 0.9s; animation-duration: 6.2s; }
        .f10-c3 { animation-delay: 1.8s; animation-duration: 4.8s; }
        .f10-c4 { animation-delay: 2.7s; animation-duration: 5.8s; }
        .f10-c5 { animation-delay: 3.6s; animation-duration: 5.2s; }
        .f10-c6 { animation-delay: 4.5s; animation-duration: 6.6s; }
        @keyframes f10-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(22px); }
        }
        @keyframes f10-flutter {
          0%, 100% { transform: translateY(0) skewX(-2deg); }
          50% { transform: translateY(3px) skewX(2deg); }
        }
        @keyframes f10-parade {
          0% { transform: translateX(70px); opacity: 0; }
          8% { opacity: 1; }
          82% { opacity: 1; }
          100% { transform: translateX(400px); opacity: 0; }
        }
        @keyframes f10-nod {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes f10-toss {
          0%, 100% { transform: translateY(0); }
          22% { transform: translateY(-4px); }
          40% { transform: translateY(2px); }
        }
        @keyframes f10-grip {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-16deg); }
        }
        @keyframes f10-flick {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          18% { transform: rotate(-16deg) translateY(-4px); }
          34% { transform: rotate(6deg) translateY(1px); }
        }
        @keyframes f10-flip {
          0% { transform: translateY(0) rotate(0deg) scale(1); }
          20% { transform: translateY(-38px) rotate(180deg) scale(0.9); }
          42% { transform: translateY(-6px) rotate(352deg) scale(1); }
          52%, 100% { transform: translateY(0) rotate(360deg) scale(1); }
        }
        @keyframes f10-drop {
          0% { transform: translate(0, -12px) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          84% { opacity: 1; }
          100% { transform: translate(-38px, 190px) rotate(420deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .f10-cloud, .f10-bunting, .f10-float, .f10-head, .f10-cook,
          .f10-coinhand, .f10-pan, .f10-crepe, .f10-confetti { animation: none; }
        }
      `}</style>
    </svg>
  );
}
