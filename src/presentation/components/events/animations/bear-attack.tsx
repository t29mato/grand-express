/**
 * 知床でヒグマに出くわす。
 *
 * 見本として作った1本。他の絵もこの形に揃える。
 *   - viewBox は 0 0 400 210 固定
 *   - 外部リソースを使わず、<style> にキーフレームを直接書く
 *   - ずっと繰り返す(モーダルが開いている数秒のあいだ流れ続ける)
 *   - `prefers-reduced-motion` が有効なら動きを止める
 */
export function BearAttack() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 森と地面 */}
      <rect width="400" height="210" fill="#20364a" />
      <g fill="#1d4030">
        <path d="M20,150 L48,70 L76,150z" />
        <path d="M70,150 L104,58 L138,150z" />
        <path d="M300,150 L332,66 L364,150z" />
        <path d="M348,150 L376,84 L400,150z" />
      </g>
      <rect y="148" width="400" height="62" fill="#2f4a33" />

      {/* 逃げる旅人 */}
      <g className="runner">
        <circle cx="0" cy="-34" r="11" fill="#f6efe2" />
        <rect x="-8" y="-24" width="16" height="26" rx="5" fill="#e8447a" />
        <rect className="leg-a" x="-7" y="0" width="6" height="18" rx="3" fill="#3b2f4a" />
        <rect className="leg-b" x="2" y="0" width="6" height="18" rx="3" fill="#3b2f4a" />
      </g>

      {/* 追うヒグマ */}
      <g className="bear">
        <ellipse cx="0" cy="-18" rx="34" ry="24" fill="#5a3a22" />
        <circle cx="30" cy="-32" r="16" fill="#6b4629" />
        <circle cx="24" cy="-46" r="6" fill="#4a2f1c" />
        <circle cx="37" cy="-46" r="6" fill="#4a2f1c" />
        <circle cx="42" cy="-30" r="4" fill="#2a1a0f" />
        <g fill="#3f2917">
          <rect className="paw-a" x="-24" y="0" width="13" height="14" rx="6" />
          <rect className="paw-b" x="8" y="0" width="13" height="14" rx="6" />
        </g>
      </g>

      <style>{`
        .runner { transform: translate(120px, 150px); animation: flee 1.5s ease-in-out infinite; }
        .bear { transform: translate(300px, 150px); animation: chase 1.5s ease-in-out infinite; }
        .leg-a { animation: stride 0.35s linear infinite; transform-origin: 50% 0; }
        .leg-b { animation: stride 0.35s linear infinite reverse; transform-origin: 50% 0; }
        .paw-a { animation: stride 0.4s linear infinite; transform-origin: 50% 0; }
        .paw-b { animation: stride 0.4s linear infinite reverse; transform-origin: 50% 0; }
        @keyframes flee {
          0%, 100% { transform: translate(120px, 150px); }
          50% { transform: translate(104px, 143px); }
        }
        @keyframes chase {
          0%, 100% { transform: translate(300px, 150px); }
          50% { transform: translate(272px, 150px); }
        }
        @keyframes stride {
          0%, 100% { transform: rotate(24deg); }
          50% { transform: rotate(-24deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .runner, .bear, .leg-a, .leg-b, .paw-a, .paw-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
