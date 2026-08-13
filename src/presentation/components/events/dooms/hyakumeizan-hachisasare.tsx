/**
 * オオスズメバチに追われる。一匹の偵察バチが登山道の近くを旋回し始めたら、
 * 払いのけず動きを止めるのが合図である。
 *
 * 刺す瞬間は描かない。**頭を低くしてかがむ登山者**と、**旋回する
 * ハチ**だけで示す(`04-doom-animation-guide.md` の方針どおり)。
 * 動くのは、円を描いて飛ぶハチだけ。
 */
export function HyakumeizanHachisasare() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夏の森の道。 */}
      <rect width="400" height="210" fill="#3a4a28" />
      <rect y="0" width="400" height="80" fill="#4f6234" />
      <circle cx="70" cy="40" r="22" fill="#f5d873" opacity="0.7" />

      {/* 木漏れ日の葉むら。 */}
      <g fill="#2c3a1e">
        <ellipse cx="330" cy="46" rx="80" ry="40" />
        <ellipse cx="380" cy="70" rx="50" ry="30" />
      </g>

      {/* 地面と登山道。 */}
      <rect y="150" width="400" height="60" fill="#4a5a30" />
      <path d="M0,180 Q150,160 250,178 Q330,192 400,176 L400,210 L0,210z" fill="#8a7454" />

      {/* かがんで頭を低くする登山者。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M170,196 Q190,178 214,192" stroke="#3a4a3a" strokeWidth="18" fill="none" />
        <circle cx="180" cy="176" r="10" fill="#d9a273" stroke="#2c3a1e" strokeWidth="2" />
        <path d="M172,182 L160,196" stroke="#d9a273" strokeWidth="6" fill="none" />
        <rect x="158" y="184" width="12" height="16" rx="3" fill="#8b6a44" />
      </g>

      {/* 巣(茂みの奥、ぼんやりと)。 */}
      <ellipse cx="330" cy="150" rx="22" ry="14" fill="#5a4426" opacity="0.7" />

      {/* 旋回するオオスズメバチ。**ここだけが動く。** */}
      <g className="hkh-hornet">
        <ellipse cx="0" cy="0" rx="7" ry="4" fill="#3a2a10" />
        <g fill="#f5b31c">
          <rect x="-6" y="-2.4" width="4" height="1.6" />
          <rect x="-1" y="-2.4" width="4" height="1.6" />
          <rect x="4" y="-2.4" width="3" height="1.6" />
        </g>
        <ellipse cx="4" cy="-4" rx="5" ry="2.6" fill="#e8ecec" opacity="0.7" />
      </g>

      <style>{`
        .hkh-hornet {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: hkh-loop 1.8s linear infinite;
        }
        @keyframes hkh-loop {
          0%   { transform: translate(210px, 130px); }
          25%  { transform: translate(250px, 110px); }
          50%  { transform: translate(230px, 90px); }
          75%  { transform: translate(195px, 108px); }
          100% { transform: translate(210px, 130px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkh-hornet { animation: none; transform: translate(230px, 110px); }
        }
      `}</style>
    </svg>
  );
}
