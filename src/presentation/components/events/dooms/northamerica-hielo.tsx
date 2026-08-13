/**
 * 着氷が線路を止める。凍雨で覆われた架線とレールを、
 * 除氷棒を振る作業員が一本ずつ叩いて回る様子で「足止め」を伝える。
 * 事故や破損は描かない。
 *
 * 動くのは、除氷棒を振る腕と、架線から落ちる氷のかけらだけ。
 */
export function NorthamericaHielo() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冷たい曇り空。 */}
      <rect width="400" height="210" fill="#c9d6dc" />
      <rect y="0" width="400" height="86" fill="#e2ecef" />

      {/* 遠景の凍った木。 */}
      <g stroke="#8a9aa0" strokeWidth="4" strokeLinecap="round">
        <path d="M40,120 L40,80 M40,95 L20,80 M40,95 L60,80 M40,105 L24,92 M40,105 L56,92" />
        <path d="M370,124 L370,84 M370,98 L352,84 M370,98 L388,84" />
      </g>

      {/* 地面の雪。 */}
      <rect y="150" width="400" height="60" fill="#dce6ea" />
      <rect y="150" width="400" height="4" fill="#f4f8f9" />

      {/* 架線柱とレール。 */}
      <g stroke="#5a6a70" strokeWidth="3">
        <line x1="90" y1="150" x2="90" y2="70" />
        <line x1="310" y1="150" x2="310" y2="70" />
        <line x1="60" y1="72" x2="340" y2="72" />
      </g>
      <g stroke="#8b8f98" strokeWidth="4">
        <line x1="0" y1="170" x2="400" y2="170" />
        <line x1="0" y1="178" x2="400" y2="178" />
      </g>

      {/* 架線と枕木を覆う氷。 */}
      <g fill="#bfe0ea" opacity="0.85">
        <rect x="60" y="70" width="280" height="5" />
        <path d="M100,75 l3,10 l-6,0z" />
        <path d="M150,75 l3,12 l-6,0z" />
        <path d="M210,75 l3,9 l-6,0z" />
        <path d="M270,75 l3,11 l-6,0z" />
      </g>

      {/* 立ち止まった列車の先頭(簡略)。 */}
      <g strokeLinejoin="round">
        <rect x="0" y="146" width="70" height="24" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="16" cy="172" r="7" fill="#20364a" />
        <circle cx="52" cy="172" r="7" fill="#20364a" />
      </g>

      {/* 除氷棒を振る作業員。腕だけが動く。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="180" cy="140" r="11" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="170" y="150" width="20" height="28" rx="4" fill="#e05252" stroke="#20364a" strokeWidth="2" />
        <g className="hielo-arm" transform="translate(190,155)">
          <line x1="0" y1="0" x2="24" y2="-30" stroke="#d9a273" strokeWidth="7" />
          <line x1="24" y1="-30" x2="24" y2="-58" stroke="#6b5330" strokeWidth="4" />
        </g>
      </g>

      {/* 落ちる氷のかけら。 */}
      <g className="hielo-drop" fill="#bfe0ea">
        <path d="M0,0 l3,8 l-6,0z" />
      </g>

      <style>{`
        .hielo-arm {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: hielo-swing 1.1s ease-in-out infinite;
        }
        @keyframes hielo-swing {
          0%, 100% { transform: translate(190px, 155px) rotate(-18deg); }
          50% { transform: translate(190px, 155px) rotate(22deg); }
        }
        .hielo-drop {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: hielo-fall 1.3s linear infinite;
        }
        @keyframes hielo-fall {
          0% { transform: translate(212px, 78px); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(212px, 148px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hielo-arm, .hielo-drop { animation: none; }
        }
      `}</style>
    </svg>
  );
}
