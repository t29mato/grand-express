/**
 * 運河の町(ミディ運河、ストラスブールなど)に重ねる動き。
 *
 * ペニッシュの煙突から煙が上がり、運河の水面に光が滑り、
 * プラタナスの葉が水に落ちて、橋の下の映り込みが揺れる。
 * 橋・船・並木は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FranceCanal() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 煙突(234,136 と 264,136)から立ちのぼる煙 */}
      <g fill="#e6ecef">
        <circle className="frcan-smoke frcan-s1" cx="234" cy="132" r="3" opacity="0.42" />
        <circle className="frcan-smoke frcan-s2" cx="234" cy="132" r="4" opacity="0.32" />
        <circle className="frcan-smoke frcan-s3" cx="264" cy="132" r="2.6" opacity="0.4" />
        <circle className="frcan-smoke frcan-s4" cx="264" cy="132" r="3.6" opacity="0.3" />
      </g>

      {/* 運河の水面を滑る光(水は台形 170,104 → 40,210) */}
      <g stroke="#c8e8f0" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="frcan-glint frcan-g1" d="M172,128h56" opacity="0.5" />
        <path className="frcan-glint frcan-g2" d="M152,156h96" opacity="0.45" />
        <path className="frcan-glint frcan-g3" d="M124,188h152" opacity="0.4" />
        <path className="frcan-glint frcan-g4" d="M186,116h30" opacity="0.5" />
      </g>

      {/* 橋の映り込みのゆらぎ */}
      <rect className="frcan-mirror" x="150" y="196" width="104" height="14" fill="#dfd8c8" opacity="0.12" />

      {/* 舳先が立てる波紋 */}
      <g fill="none" stroke="#c8e8f0" strokeWidth="1.2">
        <ellipse className="frcan-ripple-a" cx="130" cy="198" rx="16" ry="4" opacity="0.45" />
        <ellipse className="frcan-ripple-b" cx="130" cy="198" rx="16" ry="4" opacity="0.35" />
      </g>

      {/* 落ちるプラタナスの葉 */}
      <g fill="#8a9a52">
        <ellipse className="frcan-leaf frcan-l1" cx="66" cy="130" rx="2.6" ry="1.5" opacity="0.8" />
        <ellipse className="frcan-leaf frcan-l2" cx="338" cy="134" rx="2.4" ry="1.4" opacity="0.75" />
        <ellipse className="frcan-leaf frcan-l3" cx="104" cy="118" rx="2.2" ry="1.3" opacity="0.7" />
        <ellipse className="frcan-leaf frcan-l4" cx="302" cy="120" rx="2.4" ry="1.4" opacity="0.7" />
        <ellipse className="frcan-leaf frcan-l5" cx="28" cy="140" rx="2.8" ry="1.6" opacity="0.75" />
      </g>

      {/* 岸のカモ */}
      <g transform="translate(96,186)">
        <g className="frcan-duck">
          <ellipse cx="0" cy="0" rx="5" ry="2.6" fill="#4a4436" opacity="0.85" />
          <circle cx="4" cy="-3" r="2" fill="#3f5f4a" />
        </g>
      </g>

      <style>{`
        .frcan-smoke, .frcan-glint, .frcan-mirror,
        .frcan-ripple-a, .frcan-ripple-b, .frcan-leaf {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .frcan-smoke { animation: frcan-rise 8s linear infinite; }
        .frcan-s2 { animation-duration: 10.5s; animation-delay: -4s; }
        .frcan-s3 { animation-duration: 9s; animation-delay: -2s; }
        .frcan-s4 { animation-duration: 12s; animation-delay: -6s; }
        .frcan-glint { animation: frcan-slide 15s linear infinite; }
        .frcan-g2 { animation-duration: 19s; animation-delay: -6s; }
        .frcan-g3 { animation-duration: 23s; animation-delay: -11s; }
        .frcan-g4 { animation-duration: 12s; animation-delay: -3s; }
        .frcan-mirror { animation: frcan-wobble 8s ease-in-out infinite; }
        .frcan-ripple-a { animation: frcan-ripple 6.5s ease-out infinite; }
        .frcan-ripple-b { animation: frcan-ripple 6.5s ease-out infinite; animation-delay: -3.2s; }
        .frcan-leaf { animation: frcan-fall 14s linear infinite; }
        .frcan-l2 { animation-duration: 17s; animation-delay: -6s; }
        .frcan-l3 { animation-duration: 12s; animation-delay: -9s; }
        .frcan-l4 { animation-duration: 19s; animation-delay: -3s; }
        .frcan-l5 { animation-duration: 15s; animation-delay: -12s; }
        .frcan-duck { animation: frcan-paddle 26s ease-in-out infinite; }
        @keyframes frcan-rise {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          25% { opacity: 0.4; }
          100% { transform: translate(-18px, -42px) scale(2); opacity: 0; }
        }
        @keyframes frcan-slide {
          0% { transform: translateX(-26px); opacity: 0; }
          30%, 70% { opacity: 0.5; }
          100% { transform: translateX(26px); opacity: 0; }
        }
        @keyframes frcan-wobble {
          0%, 100% { transform: scaleY(1); opacity: 0.08; }
          50% { transform: scaleY(1.3); opacity: 0.2; }
        }
        @keyframes frcan-ripple {
          0% { transform: scale(0.3); opacity: 0.45; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes frcan-fall {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          12% { opacity: 0.8; }
          88% { opacity: 0.6; }
          100% { transform: translate(-26px, 76px) rotate(420deg); opacity: 0; }
        }
        @keyframes frcan-paddle {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(34px, 8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .frcan-smoke, .frcan-glint, .frcan-mirror,
          .frcan-ripple-a, .frcan-ripple-b, .frcan-leaf, .frcan-duck { animation: none; }
        }
      `}</style>
    </svg>
  );
}
