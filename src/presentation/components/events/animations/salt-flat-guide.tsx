/**
 * 水を張って鏡になった塩湖(ウユニ)の浅瀬を先に見つけ、ツアー客に案内料をもらう。
 *
 *   - 空も人も水面に映り込む
 *   - 案内人が浅瀬を指し示し、後ろから客の一団が続く
 *   - 礼の硬貨が弧を描いてこちらへ飛んでくる
 */
export function SaltFlatGuide() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空と鏡の水面 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="78" width="400" height="18" fill="#d4eaf6" />
      <path d="M24,88 L52,68 L80,88z" fill="#8fa8bc" />
      <path d="M300,88 L336,64 L372,88z" fill="#8fa8bc" />
      <path d="M336,64 L344,72 L328,72z" fill="#f2f6f8" />
      <rect y="96" width="400" height="114" fill="#a9cfe8" />
      <rect y="96" width="400" height="12" fill="#c7e2f2" />
      {/* 乾いた塩の地殻 */}
      <g fill="#eef4f8">
        <path d="M0,184 L44,180 L92,190 L86,210 L0,210z" />
        <path d="M346,196 L400,188 L400,210 L342,210z" />
      </g>
      <g stroke="#c8d8e0" strokeWidth="2" fill="none">
        <path d="M0,196 L34,190 L70,198 L58,210" />
        <path d="M70,198 L90,193" />
        <path d="M360,202 L394,197" />
      </g>

      {/* 雲とその映り込み */}
      <g fill="#f6efe2">
        <g className="salt-cloud-a">
          <ellipse cx="86" cy="36" rx="26" ry="11" />
          <ellipse cx="70" cy="40" rx="18" ry="9" />
          <ellipse cx="104" cy="41" rx="16" ry="8" />
        </g>
        <g className="salt-cloud-b">
          <ellipse cx="272" cy="28" rx="22" ry="9" />
          <ellipse cx="290" cy="32" rx="16" ry="8" />
        </g>
      </g>
      <g className="salt-refl-cloud" fill="#e2eef5" opacity="0.35">
        <ellipse cx="86" cy="156" rx="26" ry="9" />
        <ellipse cx="70" cy="150" rx="18" ry="7" />
        <ellipse cx="272" cy="164" rx="22" ry="8" />
        <ellipse cx="290" cy="158" rx="16" ry="6" />
      </g>

      {/* 水面をなでる光 */}
      <path className="salt-shine" d="M150,96 L188,96 L152,192 L114,192z" fill="#f6efe2" opacity="0.28" />

      {/* 客の一団の映り込み */}
      <g className="salt-refl-group" opacity="0.3" transform="translate(0,296) scale(1,-1)">
        <g transform="translate(252,148)">
          <rect x="-11" y="-40" width="22" height="24" rx="7" fill="#2f8f5b" />
          <circle cx="0" cy="-48" r="9" fill="#b98a63" />
          <rect x="-8" y="-18" width="6" height="18" rx="3" fill="#3b4a63" />
          <rect x="2" y="-18" width="6" height="18" rx="3" fill="#3b4a63" />
        </g>
        <g transform="translate(286,152)">
          <rect x="-11" y="-38" width="22" height="23" rx="7" fill="#f5b31c" />
          <circle cx="0" cy="-46" r="9" fill="#b98a63" />
          <rect x="-8" y="-17" width="6" height="17" rx="3" fill="#3b4a63" />
          <rect x="2" y="-17" width="6" height="17" rx="3" fill="#3b4a63" />
        </g>
        <g transform="translate(318,148)">
          <rect x="-11" y="-39" width="22" height="23" rx="7" fill="#5b8fe8" />
          <circle cx="0" cy="-47" r="9" fill="#b98a63" />
          <rect x="-8" y="-18" width="6" height="18" rx="3" fill="#3b4a63" />
          <rect x="2" y="-18" width="6" height="18" rx="3" fill="#3b4a63" />
        </g>
      </g>

      {/* 案内人の映り込み */}
      <g className="salt-refl-guide" opacity="0.32" transform="translate(0,300) scale(1,-1)">
        <g transform="translate(120,150)">
          <rect x="-9" y="-22" width="8" height="22" rx="4" fill="#3b4a63" />
          <rect x="1" y="-22" width="8" height="22" rx="4" fill="#3b4a63" />
          <rect x="-13" y="-48" width="26" height="28" rx="8" fill="#e8443f" />
          <rect x="10" y="-46" width="30" height="7" rx="3.5" fill="#d9a273" />
          <circle cx="0" cy="-58" r="11" fill="#d9a273" />
          <ellipse cx="0" cy="-64" rx="20" ry="4.5" fill="#c9a877" />
          <rect x="-9" y="-76" width="18" height="13" rx="4" fill="#c9a877" />
        </g>
      </g>

      {/* 客の一団 */}
      <g>
        <g transform="translate(252,148)">
          <g className="salt-walker-a">
            <rect className="salt-leg salt-leg-a" x="-8" y="-18" width="6" height="18" rx="3" fill="#3b4a63" />
            <rect className="salt-leg salt-leg-b" x="2" y="-18" width="6" height="18" rx="3" fill="#3b4a63" />
            <rect x="-11" y="-40" width="22" height="24" rx="7" fill="#2f8f5b" />
            <circle cx="0" cy="-48" r="9" fill="#d9a273" />
            <path d="M-9,-50 a9,9 0 0 1 18,0z" fill="#3b2f2a" />
          </g>
        </g>
        <g transform="translate(286,152)">
          <g className="salt-walker-b">
            <rect className="salt-leg salt-leg-b" x="-8" y="-17" width="6" height="17" rx="3" fill="#3b4a63" />
            <rect className="salt-leg salt-leg-a" x="2" y="-17" width="6" height="17" rx="3" fill="#3b4a63" />
            <rect x="-11" y="-38" width="22" height="23" rx="7" fill="#f5b31c" />
            <circle cx="0" cy="-46" r="9" fill="#e8c39e" />
            <path d="M-9,-48 a9,9 0 0 1 18,0z" fill="#5a4030" />
          </g>
        </g>
        <g transform="translate(318,148)">
          <g className="salt-walker-c">
            <rect className="salt-leg salt-leg-a" x="-8" y="-18" width="6" height="18" rx="3" fill="#3b4a63" />
            <rect className="salt-leg salt-leg-b" x="2" y="-18" width="6" height="18" rx="3" fill="#3b4a63" />
            <rect x="-11" y="-39" width="22" height="23" rx="7" fill="#5b8fe8" />
            <circle cx="0" cy="-47" r="9" fill="#d9a273" />
            <path d="M-9,-49 a9,9 0 0 1 18,0z" fill="#3b2f2a" />
          </g>
        </g>
      </g>

      {/* 浅瀬を指し示す案内人 */}
      <g transform="translate(120,150)">
        <rect x="-9" y="-22" width="8" height="22" rx="4" fill="#3b4a63" />
        <rect x="1" y="-22" width="8" height="22" rx="4" fill="#3b4a63" />
        <rect x="-13" y="-48" width="26" height="28" rx="8" fill="#e8443f" />
        <circle cx="0" cy="-58" r="11" fill="#d9a273" />
        <ellipse cx="0" cy="-64" rx="20" ry="4.5" fill="#c9a877" />
        <rect x="-9" y="-76" width="18" height="13" rx="4" fill="#c9a877" />
        <rect x="-11" y="-68" width="22" height="4" fill="#a8894f" />
        <g className="salt-point">
          <rect x="10" y="-46" width="30" height="7" rx="3.5" fill="#d9a273" />
          <circle cx="42" cy="-42" r="5.5" fill="#d9a273" />
        </g>
      </g>

      {/* 案内料 */}
      <g fill="#f5b31c">
        <ellipse className="salt-coin-a" cx="206" cy="106" rx="8" ry="7" />
        <ellipse className="salt-coin-b" cx="228" cy="116" rx="7" ry="6" />
      </g>
      <g className="salt-spark" fill="#f6efe2">
        <path d="M180,86 L183,94 L191,97 L183,100 L180,108 L177,100 L169,97 L177,94z" />
      </g>

      <style>{`
        .salt-cloud-a { animation: salt-drift 16s linear infinite; }
        .salt-cloud-b { animation: salt-drift 16s linear infinite; animation-delay: -8s; }
        .salt-shine { animation: salt-sweep 6s linear infinite; }
        .salt-refl-cloud { animation: salt-ripple 4s ease-in-out infinite; }
        .salt-refl-group { animation: salt-ripple 4s ease-in-out infinite; animation-delay: -1.4s; }
        .salt-refl-guide { animation: salt-ripple 4s ease-in-out infinite; animation-delay: -2.6s; }
        .salt-point { transform-box: fill-box; transform-origin: 0 50%; animation: salt-gesture 2.6s ease-in-out infinite; }
        .salt-leg { transform-box: fill-box; transform-origin: 50% 0; }
        .salt-leg-a { animation: salt-stride 0.8s ease-in-out infinite; }
        .salt-leg-b { animation: salt-stride 0.8s ease-in-out infinite reverse; }
        .salt-walker-a { animation: salt-bob 0.8s ease-in-out infinite; }
        .salt-walker-b { animation: salt-bob 0.8s ease-in-out infinite; animation-delay: -0.3s; }
        .salt-walker-c { animation: salt-bob 0.8s ease-in-out infinite; animation-delay: -0.5s; }
        .salt-coin-a { animation: salt-tip 2.2s ease-out infinite; }
        .salt-coin-b { animation: salt-tip 2.2s ease-out infinite; animation-delay: -1.1s; }
        .salt-spark { transform-box: fill-box; transform-origin: 50% 50%; animation: salt-twinkle 2.2s ease-in-out infinite; }
        @keyframes salt-drift {
          0% { transform: translateX(-40px); }
          100% { transform: translateX(40px); }
        }
        @keyframes salt-sweep {
          0% { transform: translateX(-230px); }
          100% { transform: translateX(290px); }
        }
        @keyframes salt-ripple {
          0%, 100% { opacity: 0.22; }
          50% { opacity: 0.42; }
        }
        @keyframes salt-gesture {
          0%, 100% { transform: rotate(6deg); }
          50% { transform: rotate(-9deg); }
        }
        @keyframes salt-stride {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(-15deg); }
        }
        @keyframes salt-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes salt-tip {
          0% { transform: translate(52px, 26px); opacity: 0; }
          22% { opacity: 1; }
          62% { transform: translate(-6px, -16px); }
          100% { transform: translate(-58px, 6px); opacity: 0; }
        }
        @keyframes salt-twinkle {
          0%, 100% { transform: scale(0.35); opacity: 0.2; }
          50% { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .salt-cloud-a, .salt-cloud-b, .salt-shine, .salt-refl-cloud, .salt-refl-group,
          .salt-refl-guide, .salt-point, .salt-leg-a, .salt-leg-b, .salt-walker-a,
          .salt-walker-b, .salt-walker-c, .salt-coin-a, .salt-coin-b, .salt-spark { animation: none; }
        }
      `}</style>
    </svg>
  );
}
