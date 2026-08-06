/**
 * 夜明けからさくらんぼを摘む。支払いは重さで決まる(増)。
 *
 *   - 東の空がまだ白みかけたころ、腰の桶に実を落としていく
 *   - 桶がいっぱいになると、脇の大箱へ空ける
 *   - 箱の目方が上がったぶんだけ、硬貨が跳ねる
 */
export function PickingByTheBin() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜明けの空 */}
      <rect width="400" height="210" fill="#f0c4a0" />
      <rect width="400" height="50" fill="#c9a8c0" />
      <rect y="50" width="400" height="34" fill="#f0c8a8" />
      <circle cx="336" cy="76" r="20" fill="#f5b31c" />
      <circle cx="336" cy="76" r="30" fill="#f5b31c" opacity="0.25" />

      {/* 果樹園の列 */}
      <rect y="104" width="400" height="106" fill="#6b8f4a" />
      <rect y="104" width="400" height="7" fill="#5a7f3a" />
      <g fill="#4d7a3a">
        <ellipse cx="46" cy="96" rx="34" ry="16" />
        <ellipse cx="140" cy="92" rx="30" ry="14" />
        <ellipse cx="360" cy="96" rx="32" ry="15" />
      </g>

      {/* さくらんぼの木 */}
      <rect x="196" y="96" width="14" height="72" fill="#5a3d22" />
      <path d="M203,120 L172,100 M203,110 L236,92" stroke="#5a3d22" strokeWidth="7" strokeLinecap="round" />
      <g fill="#3f8f4f">
        <ellipse cx="202" cy="72" rx="62" ry="34" />
        <ellipse cx="150" cy="86" rx="34" ry="20" />
        <ellipse cx="252" cy="84" rx="36" ry="21" />
      </g>
      <g fill="#c93a3a">
        <circle className="pbb-fruit" cx="164" cy="98" r="6" />
        <circle className="pbb-fruit pbb-f2" cx="196" cy="104" r="6" />
        <circle className="pbb-fruit pbb-f3" cx="232" cy="100" r="6" />
        <circle className="pbb-fruit pbb-f4" cx="262" cy="94" r="5.5" />
        <circle className="pbb-fruit pbb-f5" cx="140" cy="92" r="5.5" />
      </g>

      {/* 摘み手 */}
      <g transform="translate(112,192)">
        <rect x="-12" y="-20" width="9" height="20" fill="#3b4a63" />
        <rect x="2" y="-20" width="9" height="20" fill="#3b4a63" />
        <rect x="-16" y="-58" width="32" height="40" rx="9" fill="#5b8fe8" />
        <circle cx="0" cy="-69" r="12" fill="#f6efe2" />
        <path d="M-13,-72 a13,13 0 0 1 26,0z" fill="#e8c88a" />
        {/* 腰の桶 */}
        <g>
          <path d="M-30,-40 L2,-40 L-2,-16 L-26,-16z" fill="#c9a877" />
          <path d="M-30,-40 L2,-40 L2,-36 L-30,-36z" fill="#a8813c" />
          <g fill="#c93a3a">
            <circle cx="-20" cy="-30" r="4" />
            <circle cx="-10" cy="-27" r="4" />
          </g>
        </g>
        {/* 伸ばす腕 */}
        <g className="pbb-arm">
          <rect x="10" y="-62" width="9" height="30" rx="4.5" fill="#f6efe2" />
          <circle cx="14" cy="-64" r="5.5" fill="#f6efe2" />
        </g>
      </g>

      {/* 落ちていく実 */}
      <circle className="pbb-drop" cx="150" cy="126" r="5.5" fill="#c93a3a" />

      {/* 大箱 */}
      <g transform="translate(316,196)">
        <rect x="-46" y="-46" width="92" height="46" fill="#a8813c" />
        <rect x="-46" y="-46" width="92" height="7" fill="#8a6a2c" />
        <g stroke="#8a6a2c" strokeWidth="2.4">
          <path d="M-24,-39 L-24,0 M0,-39 L0,0 M24,-39 L24,0" />
        </g>
        <g fill="#c93a3a">
          <circle cx="-28" cy="-48" r="7" />
          <circle cx="-10" cy="-51" r="8" />
          <circle cx="10" cy="-48" r="7" />
          <circle cx="28" cy="-50" r="7" />
        </g>
      </g>

      {/* 目方ぶんの日当 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="pbb-coin-a" cx="312" cy="122" r="8" />
        <circle className="pbb-coin-b" cx="336" cy="110" r="7" />
        <circle className="pbb-coin-c" cx="290" cy="110" r="6" />
      </g>

      <style>{`
        .pbb-arm {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: pbb-reach 2.8s ease-in-out infinite;
        }
        .pbb-fruit {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: pbb-hang 3.4s ease-in-out infinite;
        }
        .pbb-f2 { animation-delay: -0.6s; }
        .pbb-f3 { animation-delay: -1.2s; }
        .pbb-f4 { animation-delay: -1.8s; }
        .pbb-f5 { animation-delay: -2.4s; }
        .pbb-drop {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: pbb-fall 2.8s ease-in infinite;
        }
        .pbb-coin-a { animation: pbb-pop 2.8s ease-out infinite; }
        .pbb-coin-b { animation: pbb-pop 2.8s ease-out infinite; animation-delay: -0.9s; }
        .pbb-coin-c { animation: pbb-pop 2.8s ease-out infinite; animation-delay: -1.9s; }
        @keyframes pbb-reach {
          0%, 100% { transform: rotate(6deg); }
          40% { transform: rotate(32deg); }
          62% { transform: rotate(14deg); }
        }
        @keyframes pbb-hang {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes pbb-fall {
          0%, 34% { transform: translate(0, -22px); opacity: 0; }
          44% { opacity: 1; }
          78% { transform: translate(-38px, 32px); opacity: 1; }
          88%, 100% { transform: translate(-40px, 38px); opacity: 0; }
        }
        @keyframes pbb-pop {
          0%, 32% { transform: translate(0, 30px); opacity: 0; }
          54% { transform: translate(0, 0); opacity: 1; }
          84% { transform: translate(0, -8px); opacity: 1; }
          100% { transform: translate(0, -20px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pbb-arm, .pbb-fruit, .pbb-drop,
          .pbb-coin-a, .pbb-coin-b, .pbb-coin-c { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
