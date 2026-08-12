/**
 * 村祭りが雨で流れる。最後のテーブルを出し終えたところで、前触れもなく
 * 空が開く。ケーキ売り場だけは借り物のテント一張りの下で営業を続ける。
 *
 * 慌ててケーキにシートを掛ける手で「せっかくの祭りが雨に降られた」ことを
 * 示す。動くのは、降り出す雨と、引っ張られる防水シート。
 */
export function UkFeteRainedOff() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 急に曇った空。 */}
      <rect width="400" height="210" fill="#8a949c" />
      <rect y="0" width="400" height="70" fill="#9aa4ac" />
      <ellipse cx="90" cy="34" rx="46" ry="16" fill="#7a848c" opacity="0.8" />
      <ellipse cx="300" cy="26" rx="40" ry="14" fill="#7a848c" opacity="0.8" />

      {/* 遠くの教会の塔と木立(村祭りの背景)。 */}
      <rect x="20" y="40" width="16" height="34" fill="#8a8478" />
      <path d="M18,40 L28,24 L38,40 z" fill="#6b6558" />
      <circle cx="360" cy="56" r="18" fill="#5f7f4a" opacity="0.8" />

      {/* 芝生。 */}
      <rect y="70" width="400" height="140" fill="#7a9a52" />

      {/* 万国旗のブンティング。 */}
      <path d="M20,70 L200,50 L380,70" stroke="#4a4f56" strokeWidth="1.4" fill="none" />
      <g strokeLinejoin="round">
        <path d="M60,66 L68,66 L64,76 z" fill="#c8383f" />
        <path d="M110,58 L118,58 L114,68 z" fill="#f5b31c" />
        <path d="M160,53 L168,53 L164,63 z" fill="#5b8fe8" />
        <path d="M210,52 L218,52 L214,62 z" fill="#f6efe2" />
        <path d="M260,55 L268,55 L264,65 z" fill="#c8383f" />
        <path d="M310,60 L318,60 L314,70 z" fill="#5b8fe8" />
      </g>

      {/* ケーキ売り場のテーブル。 */}
      <rect x="130" y="150" width="140" height="10" fill="#8a5a3a" />
      <rect x="136" y="160" width="6" height="30" fill="#6b5330" />
      <rect x="258" y="160" width="6" height="30" fill="#6b5330" />

      {/* テーブルの上のケーキ(まだ覆われる前)。 */}
      <g strokeLinejoin="round">
        <ellipse cx="165" cy="150" rx="18" ry="7" fill="#f2ead6" stroke="#c8a878" strokeWidth="1.4" />
        <ellipse cx="200" cy="150" rx="16" ry="6" fill="#e8c890" stroke="#c8a878" strokeWidth="1.4" />
        <ellipse cx="235" cy="150" rx="15" ry="6" fill="#f2c8c8" stroke="#c8a878" strokeWidth="1.4" />
      </g>

      {/* シートを引っ張る両手。 */}
      <path d="M126,140 L112,124" stroke="#d9a273" strokeWidth="7" strokeLinecap="round" />
      <path d="M274,140 L288,124" stroke="#d9a273" strokeWidth="7" strokeLinecap="round" />

      {/* 引っ張られる防水シート。**ここが動く。** */}
      <g className="ukf-tarp">
        <rect x="120" y="118" width="160" height="34" rx="4" fill="#5b8fe8" opacity="0.9" />
        <line x1="120" y1="134" x2="280" y2="134" stroke="#3f6fae" strokeWidth="1.4" />
      </g>

      {/* 降り出す雨。**ここも動く。** */}
      <g className="ukf-rain" stroke="#c8ccc4" strokeWidth="1.6" opacity="0.7">
        <line x1="20" y1="0" x2="14" y2="14" />
        <line x1="55" y1="0" x2="49" y2="14" />
        <line x1="90" y1="0" x2="84" y2="14" />
        <line x1="125" y1="0" x2="119" y2="14" />
        <line x1="160" y1="0" x2="154" y2="14" />
        <line x1="195" y1="0" x2="189" y2="14" />
        <line x1="230" y1="0" x2="224" y2="14" />
        <line x1="265" y1="0" x2="259" y2="14" />
        <line x1="300" y1="0" x2="294" y2="14" />
        <line x1="335" y1="0" x2="329" y2="14" />
        <line x1="370" y1="0" x2="364" y2="14" />
      </g>

      <style>{`
        .ukf-tarp {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ukf-pull 2.6s ease-in-out infinite;
        }
        @keyframes ukf-pull {
          0%   { transform: translateY(-30px) scaleY(0.2); opacity: 0; }
          40%  { transform: translateY(-30px) scaleY(0.2); opacity: 0; }
          75%  { transform: translateY(0) scaleY(1); opacity: 1; }
          100% { transform: translateY(0) scaleY(1); opacity: 1; }
        }
        .ukf-rain {
          transform-box: fill-box;
          animation: ukf-fall 0.6s linear infinite;
        }
        @keyframes ukf-fall {
          0%   { transform: translateY(60px); opacity: 0; }
          20%  { opacity: 0.8; }
          100% { transform: translateY(150px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ukf-tarp { animation: none; transform: translateY(0) scaleY(1); opacity: 1; }
          .ukf-rain { animation: none; transform: translateY(110px); opacity: 0.5; }
        }
      `}</style>
    </svg>
  );
}
