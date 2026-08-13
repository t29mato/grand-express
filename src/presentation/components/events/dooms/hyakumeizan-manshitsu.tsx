/**
 * 予約したはずの山小屋が満室。紙の予約票と山小屋の宿泊台帳が食い違い、
 * 部屋の布団はすべて先に着いた誰かのものになっている。
 *
 * 口論の場面は描かない。**灯りの点いた窓の奥に並ぶ人影**と、**戸口で
 * 肩を落とす登山者**だけで示す(`04-doom-animation-guide.md` の方針
 * どおり)。動くのは、軒先で揺れるランタンだけ。
 */
export function HyakumeizanManshitsu() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の稜線。 */}
      <rect width="400" height="210" fill="#1c2436" />
      <rect y="0" width="400" height="90" fill="#242e46" />
      <g fill="#e8e0c8" opacity="0.7">
        <circle cx="60" cy="30" r="1.6" />
        <circle cx="300" cy="20" r="1.4" />
        <circle cx="340" cy="50" r="1.6" />
      </g>
      <path d="M0,110 L80,80 L160,100 L240,70 L320,96 L400,84 L400,210 L0,210z" fill="#151b2a" />

      {/* 山小屋の建物。 */}
      <rect x="150" y="110" width="180" height="80" fill="#3a2e22" />
      <path d="M140,110 L240,66 L340,110z" fill="#241a12" />

      {/* 灯りの点いた窓と、中に並ぶ人影。 */}
      <rect x="200" y="126" width="90" height="46" fill="#f5b31c" opacity="0.85" />
      <g fill="#241a12">
        <ellipse cx="218" cy="158" rx="8" ry="14" />
        <ellipse cx="240" cy="160" rx="8" ry="14" />
        <ellipse cx="262" cy="158" rx="8" ry="14" />
        <ellipse cx="280" cy="160" rx="7" ry="13" />
      </g>

      {/* 戸口。 */}
      <rect x="160" y="150" width="30" height="40" fill="#1c130c" />

      {/* 肩を落として戸口に立つ登山者。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M96,168 L92,198" stroke="#2f3a42" strokeWidth="9" fill="none" />
        <path d="M106,168 L110,198" stroke="#3a4650" strokeWidth="9" fill="none" />
        <path d="M100,144 Q96,156 100,170" stroke="#4a5568" strokeWidth="18" fill="none" />
        <rect x="88" y="142" width="14" height="22" rx="3" fill="#8b6a44" />
        <circle cx="102" cy="132" r="10" fill="#d9a273" stroke="#151b2a" strokeWidth="2" />
        <path d="M92,138 L82,150" stroke="#d9a273" strokeWidth="6" fill="none" />
      </g>

      {/* 軒先のランタン。**ここだけが動く。** */}
      <g className="hkm2-lantern">
        <line x1="0" y1="0" x2="0" y2="14" stroke="#4a3c2c" strokeWidth="2" />
        <circle cx="0" cy="20" r="6" fill="#f5b31c" />
        <circle cx="0" cy="20" r="10" fill="#f5b31c" opacity="0.25" />
      </g>

      <style>{`
        .hkm2-lantern {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: hkm2-swing 2.4s ease-in-out infinite;
        }
        @keyframes hkm2-swing {
          0%, 100% { transform: translate(345px, 100px) rotate(-8deg); }
          50% { transform: translate(345px, 100px) rotate(8deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkm2-lantern { animation: none; transform: translate(345px, 100px); }
        }
      `}</style>
    </svg>
  );
}
