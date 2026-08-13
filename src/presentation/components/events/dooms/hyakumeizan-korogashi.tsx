/**
 * 落石で登山道が塞がれる。緩んでいた岩が斜面のどこかで外れ、標識のある
 * 登山道をちょうど塞ぐ形で止まる。
 *
 * 岩が人に当たる瞬間は描かない。**すでに道を塞いで止まった岩**と、
 * **驚いて足を止め、腕を上げる登山者**だけで示す
 * (`04-doom-animation-guide.md` の方針どおり)。動くのは、
 * 岩から立ちのぼる砂ぼこりだけ。
 */
export function HyakumeizanKorogashi() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った岩の斜面。 */}
      <rect width="400" height="210" fill="#7a726a" />
      <rect y="0" width="400" height="80" fill="#94897e" />
      <path d="M0,110 L90,60 L180,96 L260,50 L340,90 L400,66 L400,210 L0,210z" fill="#5f584f" />

      {/* 手前の岩場の地面と登山道。 */}
      <rect y="150" width="400" height="60" fill="#6a6058" />
      <path d="M0,182 Q140,168 220,180 Q320,194 400,178 L400,210 L0,210z" fill="#8a7c68" />

      {/* 道を塞いで止まった大岩。 */}
      <g fill="#4a443c">
        <path d="M210,150 L260,132 L300,148 L296,182 L232,190 L204,172z" />
      </g>
      <path d="M222,150 L258,138 L286,150" stroke="#332e28" strokeWidth="2" fill="none" opacity="0.6" />

      {/* 転がり落ちた小石。 */}
      <g fill="#4a443c">
        <circle cx="180" cy="188" r="6" />
        <circle cx="316" cy="176" r="5" />
      </g>

      {/* 驚いて足を止め、腕を上げる登山者。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M120,168 L114,198" stroke="#2f3a42" strokeWidth="9" fill="none" />
        <path d="M130,168 L136,198" stroke="#3a4650" strokeWidth="9" fill="none" />
        <path d="M124,140 L124,170" stroke="#4a5568" strokeWidth="20" fill="none" />
        <rect x="112" y="138" width="14" height="22" rx="3" fill="#8b6a44" />
        <circle cx="124" cy="126" r="11" fill="#d9a273" stroke="#5f584f" strokeWidth="2" />
        <path d="M116,140 L100,120" stroke="#d9a273" strokeWidth="7" fill="none" />
        <path d="M134,140 L150,124" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      {/* 立ちのぼる砂ぼこり。**ここだけが動く。** */}
      <g className="hkg-dust1" fill="#c8bfae">
        <circle r="14" />
      </g>
      <g className="hkg-dust2" fill="#c8bfae">
        <circle r="10" />
      </g>
      <g className="hkg-dust3" fill="#d4ccbc">
        <circle r="8" />
      </g>

      <style>{`
        .hkg-dust1, .hkg-dust2, .hkg-dust3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: hkg-rise 1.8s ease-out infinite;
        }
        .hkg-dust2 { animation-delay: 0.4s; }
        .hkg-dust3 { animation-delay: 0.8s; }
        @keyframes hkg-rise {
          0%   { transform: translate(250px, 175px) scale(0.4); opacity: 0.8; }
          100% { transform: translate(250px, 120px) scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkg-dust1, .hkg-dust2, .hkg-dust3 {
            animation: none;
            transform: translate(250px, 148px) scale(1);
            opacity: 0.5;
          }
        }
      `}</style>
    </svg>
  );
}
