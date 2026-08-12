/**
 * 海岸の松林で山火事が起きる。乾いた夏の風が火の粉を炎の壁に変え、
 * 別荘地が予防のため避難する。
 *
 * 燃え落ちる木ではなく、**消火機と逃げる人、立ちのぼる煙**で
 * 「増えた仕事」ではなく「避難」を表す。動くのは、流れる煙の帯1つだけ。
 */
export function TurkeyCamyangini() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 橙にかすむ空。 */}
      <rect width="400" height="210" fill="#e89858" />
      <rect y="0" width="400" height="90" fill="#f0b878" />
      <circle cx="70" cy="46" r="20" fill="#f5c060" opacity="0.8" />

      {/* 遠い山並み。 */}
      <path d="M0,90c60,-20 120,-20 180,0c70,-24 140,-24 220,0v20H0z" fill="#8a7a5c" opacity="0.85" />

      {/* 松の斜面。 */}
      <path d="M0,110L140,80L260,100L400,78V210H0z" fill="#5a6a3a" />
      <g strokeLinecap="round">
        <rect x="30" y="150" width="3" height="16" fill="#5a4630" />
        <path d="M31.5,132l-8,20h16z" fill="#2f5f3f" />
        <rect x="90" y="140" width="3" height="20" fill="#5a4630" />
        <path d="M91.5,118l-9,24h18z" fill="#2f5f3f" />
        <rect x="330" y="146" width="3" height="18" fill="#5a4630" />
        <path d="M331.5,126l-8,22h16z" fill="#2f5f3f" />
      </g>

      {/* 燃える木立(奥、炎は控えめに)。 */}
      <g>
        <rect x="180" y="140" width="3" height="18" fill="#3a2e1c" />
        <path d="M181.5,118l-9,24h18z" fill="#7a2a1a" />
        <path d="M175,132q6,-14 13,-16q7,2 13,16z" fill="#e8443f" opacity="0.85" />
        <rect x="210" y="144" width="3" height="16" fill="#3a2e1c" />
        <path d="M211.5,124l-8,22h16z" fill="#7a2a1a" />
        <path d="M205,136q6,-12 11,-14q6,2 11,14z" fill="#f5b31c" opacity="0.85" />
      </g>

      {/* 消火機(旋回中)。 */}
      <g strokeLinejoin="round">
        <path d="M300,60 L340,64 L332,68 L296,66z" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
        <path d="M312,58 L312,50 M320,74 L320,80" stroke="#f6efe2" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="316" cy="68" rx="4" ry="8" fill="#5b8fe8" opacity="0.7" />
      </g>

      {/* 避難する人々(手前)。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="60" cy="176" r="7" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="53" y="182" width="14" height="18" rx="2" fill="#5b8fe8" stroke="#20364a" strokeWidth="1.6" />
        <path d="M56,184 L44,190" stroke="#d9a273" strokeWidth="5" />
        <rect x="30" y="186" width="14" height="10" rx="1.4" fill="#e8dcc0" stroke="#8a6a3a" strokeWidth="1.4" />
        <circle cx="90" cy="178" r="7" fill="#c98a5a" stroke="#20364a" strokeWidth="2" />
        <rect x="83" y="184" width="14" height="18" rx="2" fill="#8a1f2b" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 避難する車。 */}
      <g strokeLinejoin="round">
        <rect x="150" y="180" width="60" height="20" rx="4" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <rect x="160" y="172" width="36" height="12" rx="3" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.6" />
        <circle cx="164" cy="200" r="6" fill="#241a10" />
        <circle cx="196" cy="200" r="6" fill="#241a10" />
      </g>

      {/* 流れる煙の帯。**ここだけが動く。** */}
      <g className="cyn-smoke" fill="#8a8478" opacity="0.6">
        <ellipse cx="180" cy="70" rx="50" ry="16" />
        <ellipse cx="230" cy="50" rx="60" ry="18" />
        <ellipse cx="290" cy="34" rx="40" ry="14" />
      </g>

      <style>{`
        .cyn-smoke {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: cyn-drift 4s ease-in-out infinite;
        }
        @keyframes cyn-drift {
          0%   { transform: translate(0px, 6px); opacity: 0.4; }
          50%  { transform: translate(24px, -8px); opacity: 0.7; }
          100% { transform: translate(48px, -18px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cyn-smoke { animation: none; opacity: 0.55; }
        }
      `}</style>
    </svg>
  );
}
