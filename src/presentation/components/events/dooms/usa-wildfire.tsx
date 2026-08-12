/**
 * 山火事が迫り避難を強いられる。乾いた丘の斜面で炎が揺れながら燃え広がり、
 * 煙が立ちのぼる。手前では避難する車が走り去る。
 *
 * 動くのは、炎の揺らめきと煙、車の走行だけ。
 */
export function UsaWildfire() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 煙でオレンジがかった空。 */}
      <rect width="400" height="210" fill="#c8834a" />
      <rect y="0" width="400" height="90" fill="#e0a868" />

      {/* 立ちのぼる煙。 */}
      <g className="usa-wf-smoke1" fill="#8a8478" opacity="0.7">
        <ellipse cx="260" cy="60" rx="30" ry="18" />
        <ellipse cx="290" cy="40" rx="26" ry="16" />
      </g>
      <g className="usa-wf-smoke2" fill="#9a9488" opacity="0.6">
        <ellipse cx="320" cy="50" rx="24" ry="14" />
      </g>

      {/* 乾いた丘の斜面。 */}
      <path d="M0,150c60,-20 140,-14 200,-2c70,-14 140,0 200,-10v70H0z" fill="#8a7a4a" />
      <rect y="180" width="400" height="30" fill="#5f7f4a" />

      {/* 燃える茂み(斜面の複数箇所)。 */}
      <g className="usa-wf-flame1">
        <path d="M220,150c-4,-10 2,-14 0,-22c8,6 10,14 6,20c6,-4 8,-10 6,-16c6,8 6,16 -2,20c8,-2 10,-8 8,-14c4,10 2,18 -8,20c-4,0 -8,-4 -10,-8z" fill="#e8443f" />
        <path d="M226,150c-2,-6 2,-8 0,-14c5,4 6,9 3,12c3,-2 4,-6 3,-10c4,5 3,10 -2,12z" fill="#f5b31c" />
      </g>
      <g className="usa-wf-flame2">
        <path d="M270,152c-3,-8 2,-11 0,-18c6,5 8,11 5,16c5,-3 6,-8 5,-13c5,6 5,13 -2,16c6,-2 8,-6 6,-11c3,8 1,14 -6,16c-3,0 -6,-3 -8,-6z" fill="#e8443f" />
        <path d="M275,152c-2,-5 2,-6 0,-11c4,3 5,7 2,9c2,-1 3,-4 2,-8c3,4 2,8 -1,10z" fill="#f5b31c" />
      </g>
      <g className="usa-wf-flame3">
        <path d="M320,155c-3,-7 2,-10 0,-16c5,4 7,9 4,14c4,-3 5,-7 4,-11c4,5 4,11 -2,14c5,-2 7,-5 5,-10c3,7 1,12 -5,14c-3,0 -5,-3 -6,-5z" fill="#e8443f" />
      </g>

      {/* 避難する車(走り去る)。 */}
      <g className="usa-wf-car">
        <path d="M40,190 L52,176 L96,176 L108,190z" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.2" strokeLinejoin="round" />
        <rect x="36" y="188" width="76" height="16" rx="3" fill="#4a7bd0" stroke="#20364a" strokeWidth="2.2" />
        <circle cx="54" cy="206" r="8" fill="#241a10" />
        <circle cx="96" cy="206" r="8" fill="#241a10" />
      </g>

      <style>{`
        .usa-wf-flame1, .usa-wf-flame2, .usa-wf-flame3 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: usa-wf-flicker 0.5s ease-in-out infinite alternate;
        }
        .usa-wf-flame2 { animation-delay: 0.15s; }
        .usa-wf-flame3 { animation-delay: 0.3s; }
        @keyframes usa-wf-flicker {
          0% { transform: scaleY(1) scaleX(1); }
          100% { transform: scaleY(1.12) scaleX(0.94); }
        }
        .usa-wf-smoke1, .usa-wf-smoke2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: usa-wf-rise 3s ease-in infinite;
        }
        .usa-wf-smoke2 { animation-delay: 1s; }
        @keyframes usa-wf-rise {
          0% { transform: translateY(0); opacity: 0.75; }
          100% { transform: translateY(-24px); opacity: 0; }
        }
        .usa-wf-car {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: usa-wf-drive 3s linear infinite;
        }
        @keyframes usa-wf-drive {
          0% { transform: translateX(-30px); }
          100% { transform: translateX(340px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .usa-wf-flame1, .usa-wf-flame2, .usa-wf-flame3, .usa-wf-smoke1, .usa-wf-smoke2 { animation: none; }
          .usa-wf-car { animation: none; transform: translateX(200px); }
        }
      `}</style>
    </svg>
  );
}
