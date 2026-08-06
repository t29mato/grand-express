/**
 * 砂漠から風が来て、空が薄い紅茶の色になる。飛行場は閉まり、道は歩く速さ(減)。
 *
 *   - 砂塵の帯が横に流れ、その向こうは輪郭しか見えない
 *   - トラックはヘッドライトだけを頼りに進み、吹き流しは張りつめたまま
 *   - 布で口元を覆っていても、出ていく金は止まらない
 */
export function HarmattanDust() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄い紅茶色の空 */}
      <rect width="400" height="210" fill="#c9a86a" />
      <rect width="400" height="94" fill="#d8bc82" />
      <circle cx="300" cy="46" r="22" fill="#e8cc92" />

      {/* 霞んだ町の輪郭 */}
      <g fill="#b09257" opacity="0.85">
        <rect x="16" y="70" width="40" height="52" />
        <rect x="64" y="82" width="30" height="40" />
        <rect x="330" y="76" width="44" height="46" />
      </g>

      {/* 吹き流しと竿 */}
      <g>
        <rect x="118" y="60" width="7" height="70" fill="#8a7a54" />
        <g className="hmd-sock">
          <path d="M125,66 L166,72 L164,86 L125,86z" fill="#e8443f" />
          <path d="M166,72 L188,76 L186,84 L164,86z" fill="#f6efe2" />
        </g>
      </g>

      {/* 道 */}
      <rect y="130" width="400" height="80" fill="#a8905c" />
      <rect y="130" width="400" height="6" fill="#8f7a48" />
      <g stroke="#c2ab74" strokeWidth="4" strokeDasharray="22 20" fill="none" opacity="0.7">
        <path d="M0,178 L400,178" />
      </g>

      {/* 輪郭しか見えないトラック */}
      <g transform="translate(268,168)">
        <rect x="-56" y="-40" width="56" height="34" rx="4" fill="#8a7448" />
        <rect x="0" y="-28" width="34" height="22" rx="3" fill="#8a7448" />
        <g fill="#2f2a20">
          <circle cx="-38" cy="-4" r="8" />
          <circle cx="16" cy="-4" r="8" />
        </g>
        <g fill="#f5e2a8">
          <circle className="hmd-lamp" cx="34" cy="-18" r="6" />
        </g>
        <path className="hmd-beam" d="M38,-18 L96,-38 L96,4z" fill="#f5e2a8" opacity="0.28" />
      </g>

      {/* 布で口元を覆う人 */}
      <g transform="translate(76,198)">
        <rect x="-15" y="-46" width="30" height="46" rx="10" fill="#3f6b8a" />
        <circle cx="0" cy="-57" r="13" fill="#f6efe2" />
        <path d="M-13,-61 a13,13 0 0 1 26,0z" fill="#3b2f2a" />
        <g className="hmd-cloth">
          <path d="M-14,-56 q14,10 28,0 q4,12 -14,14 q-18,-2 -14,-14z" fill="#e8dfc8" />
          <path d="M12,-54 q14,-2 18,10 q-12,0 -18,-2z" fill="#e8dfc8" />
        </g>
      </g>

      {/* 流れる砂塵 */}
      <g fill="#e0c48a">
        <ellipse className="hmd-dust" cx="120" cy="104" rx="70" ry="13" opacity="0.65" />
        <ellipse className="hmd-dust hmd-d2" cx="290" cy="126" rx="86" ry="15" opacity="0.55" />
        <ellipse className="hmd-dust hmd-d3" cx="200" cy="156" rx="76" ry="12" opacity="0.5" />
        <ellipse className="hmd-dust hmd-d4" cx="60" cy="182" rx="90" ry="14" opacity="0.45" />
      </g>

      {/* 止まっているあいだに出ていく金 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="hmd-coin-a" cx="196" cy="100" r="8" />
        <circle className="hmd-coin-b" cx="196" cy="100" r="7" />
      </g>

      <style>{`
        .hmd-dust {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: hmd-blow 9s linear infinite;
        }
        .hmd-d2 { animation-duration: 11s; animation-delay: -4s; }
        .hmd-d3 { animation-duration: 8s; animation-delay: -2s; }
        .hmd-d4 { animation-duration: 12s; animation-delay: -6s; }
        .hmd-sock {
          transform-box: fill-box; transform-origin: 0 50%;
          animation: hmd-strain 3.4s ease-in-out infinite;
        }
        .hmd-cloth {
          transform-box: fill-box; transform-origin: 0 0;
          animation: hmd-flap 2.6s ease-in-out infinite;
        }
        .hmd-lamp { animation: hmd-glow 2.2s ease-in-out infinite; }
        .hmd-beam { animation: hmd-glow 2.2s ease-in-out infinite; }
        .hmd-coin-a { animation: hmd-spend 3.4s ease-in infinite; }
        .hmd-coin-b { animation: hmd-spend 3.4s ease-in infinite; animation-delay: -1.7s; }
        @keyframes hmd-blow {
          0% { transform: translateX(240px); opacity: 0; }
          16%, 78% { opacity: 0.6; }
          100% { transform: translateX(-300px); opacity: 0; }
        }
        @keyframes hmd-strain {
          0%, 100% { transform: rotate(-2deg) scaleX(1); }
          50% { transform: rotate(2deg) scaleX(1.04); }
        }
        @keyframes hmd-flap {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes hmd-glow {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.45; }
        }
        @keyframes hmd-spend {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          18% { opacity: 1; }
          100% { transform: translate(-92px, 46px) scale(0.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hmd-dust, .hmd-sock, .hmd-cloth, .hmd-lamp, .hmd-beam,
          .hmd-coin-a, .hmd-coin-b { animation: none; opacity: 0.6; }
          .hmd-lamp { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
