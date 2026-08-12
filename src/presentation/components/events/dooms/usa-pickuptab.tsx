/**
 * テーブル全員分の勘定を持たされる。会計伝票がテーブルの真ん中に置かれ、
 * 財布から紙幣が何枚も抜き取られていく。
 *
 * 動くのは、紙幣が財布から伝票へ飛んでいく動きだけ。
 */
export function UsaPickuptab() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* レストランの暖色の室内。 */}
      <rect width="400" height="210" fill="#7a5a40" />
      <rect y="0" width="400" height="70" fill="#8a6a4c" />

      {/* 壁の照明。 */}
      <circle cx="80" cy="30" r="14" fill="#f5b31c" opacity="0.85" />
      <circle cx="320" cy="30" r="14" fill="#f5b31c" opacity="0.85" />

      {/* テーブル(円形、木目)。 */}
      <ellipse cx="200" cy="150" rx="150" ry="40" fill="#5a4630" stroke="#3a2f22" strokeWidth="2" />
      <ellipse cx="200" cy="146" rx="150" ry="40" fill="#6b5330" />

      {/* 皿(複数人ぶん、片付いた様子)。 */}
      <g fill="#f6efe2" stroke="#c8b898" strokeWidth="1">
        <ellipse cx="110" cy="150" rx="20" ry="8" />
        <ellipse cx="200" cy="158" rx="20" ry="8" />
        <ellipse cx="290" cy="150" rx="20" ry="8" />
      </g>

      {/* 会計伝票(テーブル中央、裏返し)。 */}
      <rect x="185" y="128" width="30" height="20" rx="2" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
      <line x1="190" y1="134" x2="210" y2="134" stroke="#c8b898" strokeWidth="1.4" />
      <line x1="190" y1="140" x2="206" y2="140" stroke="#c8b898" strokeWidth="1.4" />

      {/* 財布(左手前)。 */}
      <rect x="40" y="170" width="34" height="24" rx="3" fill="#3a2f22" stroke="#20364a" strokeWidth="1.6" />
      <rect x="40" y="170" width="34" height="4" fill="#5a4630" />

      {/* 財布から伝票へ飛んでいく紙幣。 */}
      <g className="usa-pt-bill1" fill="#8fae63" stroke="#4f6f3f" strokeWidth="1">
        <rect x="52" y="176" width="18" height="10" rx="1" />
      </g>
      <g className="usa-pt-bill2" fill="#8fae63" stroke="#4f6f3f" strokeWidth="1">
        <rect x="52" y="176" width="18" height="10" rx="1" />
      </g>
      <g className="usa-pt-bill3" fill="#8fae63" stroke="#4f6f3f" strokeWidth="1">
        <rect x="52" y="176" width="18" height="10" rx="1" />
      </g>

      <style>{`
        .usa-pt-bill1, .usa-pt-bill2, .usa-pt-bill3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: usa-pt-fly 2.4s ease-in infinite;
          opacity: 0;
        }
        .usa-pt-bill2 { animation-delay: 0.5s; }
        .usa-pt-bill3 { animation-delay: 1s; }
        @keyframes usa-pt-fly {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          70% { transform: translate(140px, -40px) rotate(200deg); opacity: 1; }
          100% { transform: translate(140px, -40px) rotate(200deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .usa-pt-bill1, .usa-pt-bill2, .usa-pt-bill3 {
            animation: none;
            opacity: 1;
            transform: translate(140px, -40px) rotate(200deg);
          }
        }
      `}</style>
    </svg>
  );
}
