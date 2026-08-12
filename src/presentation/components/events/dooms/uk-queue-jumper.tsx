/**
 * 列に割り込まれる。「ちょっと聞くだけだから」と三人分前に割り込まれ、
 * 誰もはっきり文句を言わず、わざとらしい咳払いだけが抗議になる。
 *
 * 横から列に滑り込む人影で「割り込み」を一目で示す。動くのは、
 * 割り込んでくる人影と、押しのけられて後ずさる列の先頭。
 */
export function UkQueueJumper() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った通りの空。 */}
      <rect width="400" height="210" fill="#a8b0a8" />
      <rect y="0" width="400" height="70" fill="#bcc4bc" />

      {/* 店の入口(列の目的地)。 */}
      <rect x="10" y="60" width="70" height="90" fill="#8a5a4a" />
      <rect x="20" y="80" width="24" height="70" fill="#2a2a30" />
      <rect x="50" y="80" width="20" height="30" fill="#dfe8ee" opacity="0.8" />
      <rect x="10" y="60" width="70" height="6" fill="#c8383f" />
      <circle cx="66" cy="90" r="1.6" fill="#f5b31c" />

      {/* 雲。 */}
      <ellipse cx="320" cy="30" rx="26" ry="8" fill="#c8ccc4" opacity="0.6" />
      <ellipse cx="340" cy="26" rx="18" ry="6" fill="#c8ccc4" opacity="0.6" />

      {/* 街灯。 */}
      <rect x="360" y="70" width="4" height="80" fill="#4a4f56" />
      <circle cx="362" cy="66" r="6" fill="#f5c25a" opacity="0.7" />

      {/* 地面。 */}
      <rect y="150" width="400" height="60" fill="#9a9484" />
      <line x1="0" y1="150" x2="400" y2="150" stroke="#7a7468" strokeWidth="2" />

      {/* 列に並ぶ人々(先頭は店の近く)。同じ姿勢で並ばせて「列」を示す。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="110" cy="140" r="10" fill="#d9a273" stroke="#3a3540" strokeWidth="1.8" />
        <rect x="102" y="150" width="16" height="30" rx="3" fill="#5b8fe8" />

        <circle cx="160" cy="142" r="10" fill="#c88a5a" stroke="#3a3540" strokeWidth="1.8" />
        <rect x="152" y="152" width="16" height="28" rx="3" fill="#7fae63" />

        <circle cx="210" cy="140" r="10" fill="#d9a273" stroke="#3a3540" strokeWidth="1.8" />
        <rect x="202" y="150" width="16" height="30" rx="3" fill="#e8443f" />

        <circle cx="260" cy="142" r="10" fill="#c88a5a" stroke="#3a3540" strokeWidth="1.8" />
        <rect x="252" y="152" width="16" height="28" rx="3" fill="#f5b31c" />

        <circle cx="310" cy="140" r="10" fill="#d9a273" stroke="#3a3540" strokeWidth="1.8" />
        <rect x="302" y="150" width="16" height="30" rx="3" fill="#5b8fe8" />
      </g>

      {/* 押しのけられて眉をひそめる先頭の人。 */}
      <g strokeLinecap="round">
        <path className="ukq-brow" d="M104,134 L110,132" stroke="#3a3540" strokeWidth="1.6" fill="none" />
      </g>

      {/* 割り込んでくる人影。**ここが動く。** */}
      <g className="ukq-jumper" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="0" cy="0" r="11" fill="#e8b088" stroke="#20364a" strokeWidth="2" />
        <rect x="-9" y="10" width="18" height="32" rx="3" fill="#8a5a3a" stroke="#20364a" strokeWidth="1.6" />
        <path d="M-9,20 L-24,10" stroke="#e8b088" strokeWidth="6" fill="none" />
      </g>

      {/* 咳払いを示す小さな息の印。 */}
      <g className="ukq-cough" fill="#f6efe2" opacity="0.7">
        <circle cx="118" cy="128" r="3" />
        <circle cx="124" cy="122" r="2" />
      </g>

      <style>{`
        .ukq-jumper {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ukq-slide 2.8s ease-in-out infinite;
        }
        @keyframes ukq-slide {
          0%   { transform: translate(400px, 130px); opacity: 0; }
          30%  { transform: translate(400px, 130px); opacity: 0; }
          65%  { transform: translate(135px, 128px); opacity: 1; }
          100% { transform: translate(135px, 128px); opacity: 1; }
        }
        .ukq-brow {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ukq-frown 2.8s ease-in-out infinite;
        }
        @keyframes ukq-frown {
          0%, 60% { transform: rotate(0deg); }
          100% { transform: rotate(-14deg) translateY(-1px); }
        }
        .ukq-cough {
          transform-box: fill-box;
          animation: ukq-puff 2.8s ease-in-out infinite;
        }
        @keyframes ukq-puff {
          0%, 60% { opacity: 0; transform: translateY(0); }
          75% { opacity: 0.8; transform: translateY(-6px); }
          100% { opacity: 0; transform: translateY(-14px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ukq-jumper { animation: none; transform: translate(135px, 128px); opacity: 1; }
          .ukq-brow { animation: none; transform: rotate(-14deg) translateY(-1px); }
          .ukq-cough { animation: none; opacity: 0.6; transform: translateY(-8px); }
        }
      `}</style>
    </svg>
  );
}
