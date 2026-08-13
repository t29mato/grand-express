/**
 * 葦原の火が草原を走る。乾いた葦原に飛んだ火の粉が、地元の消防団が耕した
 * 防火帯で囲い込むより先に、歩く人間を追い越すほどの炎の壁に変わった。
 *
 * **乾いた葦原と、迫る炎の壁**だけで筋を見せる。動くのは炎の揺らめきだけ。
 */
export function UkraineStepovaPozhezha() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 煙にかすむ空。 */}
      <rect width="400" height="210" fill="#8a7a5c" />
      <g fill="#a89272" opacity="0.8">
        <ellipse cx="120" cy="40" rx="100" ry="26" />
        <ellipse cx="320" cy="30" rx="90" ry="24" />
      </g>

      {/* 焼け残った草原(奥)。 */}
      <rect y="90" width="400" height="120" fill="#4a3c1c" />

      {/* まだ燃えていない乾いた葦原(右手前)。 */}
      <g stroke="#d8b34a" strokeWidth="3" opacity="0.9">
        <path d="M280,210 L286,150M296,210 L300,146M312,210 L316,152M330,210 L334,148M346,210 L352,154M364,210 L368,150" />
      </g>

      {/* 耕した防火帯(手前の帯)。 */}
      <rect y="186" width="400" height="24" fill="#5a4630" />
      <g stroke="#3a2a1a" strokeWidth="2" opacity="0.6">
        <path d="M0,196h400M0,204h400" />
      </g>

      {/* 逃げる人と手押し車。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M116,158 L108,186" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M128,158 L136,186" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M122,132 L122,160" stroke="#f4c430" strokeWidth="20" fill="none" />
        <circle cx="122" cy="120" r="10" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M134,140 L152,150" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>
      <circle cx="168" cy="186" r="10" fill="none" stroke="#5a4630" strokeWidth="3" />
      <path d="M152,178 L168,176 L168,196 L152,196z" fill="#8a6a3a" />

      {/* 遠くの消防団のシルエット。 */}
      <g fill="#241a10" opacity="0.7">
        <ellipse cx="350" cy="180" rx="8" ry="16" />
        <ellipse cx="368" cy="182" rx="8" ry="16" />
      </g>

      {/* 迫る炎の壁。左右2本を静的に、中央だけ揺らめかせる。 */}
      <g fill="#e8443f">
        <path d="M40,150 q10,-30 4,-46 q14,14 12,-8 q16,20 6,-4 q14,18 -2,58z" opacity="0.95" />
        <path d="M200,150 q10,-26 2,-42 q12,12 10,-6 q14,18 4,-2 q12,16 -4,50z" opacity="0.95" />
      </g>
      <g className="usp-flame" fill="#f5b31c">
        <path d="M0,0 q10,-28 4,-44 q14,14 12,-8 q16,20 6,-4 q14,18 -2,56z" />
      </g>

      <style>{`
        .usp-flame {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: usp-flicker 0.9s ease-in-out infinite alternate;
        }
        @keyframes usp-flicker {
          0%   { transform: translate(120px, 148px) scale(1, 1); }
          50%  { transform: translate(120px, 148px) scale(0.9, 1.12); }
          100% { transform: translate(120px, 148px) scale(1.08, 0.94); }
        }
        @media (prefers-reduced-motion: reduce) {
          .usp-flame {
            animation: none;
            transform: translate(120px, 148px) scale(1, 1);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
