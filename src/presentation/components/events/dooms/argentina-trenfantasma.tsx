/**
 * 幽霊列車に拾われる(気付けば違う場所に)。
 *
 * 7枚の構図表でここは**夜・消えた駅のホーム・藍**の担当。
 * **暖色は列車の窓明かりだけ。**駅舎はもう無い——残っているのは
 * ホームの縁と、点かない街灯と、駅名標の白い枠(文字は無い)。
 * そこを、昔の時刻表どおりの列車が半透明のまま通り過ぎる。
 *
 * 動くのは**すべる幽霊列車(現れて、消える)・窓明かりのちらつき・
 * またたく星**。止めた状態でも、半透明の列車が無人のホームに
 * 停まっている構図で分かる。
 */
export function ArgentinaTrenfantasma() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の藍。月だけが光源。 */}
      <rect width="400" height="210" fill="#1f2740" />
      <rect width="400" height="60" fill="#181e33" />
      <circle cx="330" cy="36" r="14" fill="#dfe4f0" />
      <circle cx="325" cy="32" r="4" fill="#c2c8da" opacity="0.7" />
      <circle cx="336" cy="40" r="3" fill="#c2c8da" opacity="0.6" />

      {/* 星。 */}
      <g fill="#dfe4f0">
        <circle className="atn-star1" cx="40" cy="22" r="1.6" />
        <circle className="atn-star2" cx="96" cy="40" r="1.3" />
        <circle className="atn-star1" cx="160" cy="16" r="1.4" />
        <circle className="atn-star2" cx="226" cy="30" r="1.2" />
        <circle className="atn-star1" cx="276" cy="14" r="1.4" />
        <circle className="atn-star2" cx="386" cy="24" r="1.3" />
      </g>

      {/* 遠くの平原と防風林の影。 */}
      <rect y="96" width="400" height="114" fill="#242c48" />
      <path d="M0,96q90,-8 200,-4q110,4 200,-6v12H0z" fill="#1c2338" />
      <g fill="#161c2c">
        <ellipse cx="60" cy="92" rx="30" ry="10" />
        <ellipse cx="350" cy="90" rx="34" ry="11" />
      </g>

      {/* 線路(月明かりにだけ光る)。 */}
      <g fill="#2c3452">
        {[0, 26, 52, 78, 104, 130, 156, 182, 208, 234, 260, 286, 312, 338, 364, 390].map((x) => (
          <rect key={x} x={x} y={128} width={15} height={9} />
        ))}
      </g>
      <rect y="129" width="400" height="3" fill="#5f6a8f" />
      <rect y="134" width="400" height="3" fill="#5f6a8f" />

      {/* 幽霊列車。半透明。窓の明かりだけが暖色。 */}
      <g className="atn-train">
        <g opacity="0.55">
          {/* 機関車。 */}
          <rect x="0" y="84" width="66" height="40" rx="4" fill="#4a5578" />
          <rect x="44" y="70" width="22" height="18" rx="2" fill="#4a5578" />
          <rect x="6" y="66" width="10" height="20" fill="#3a4462" />
          <path d="M-14,124l14,-10v10z" fill="#3a4462" />
          <g fill="#2c3452">
            <circle cx="16" cy="124" r="8" />
            <circle cx="38" cy="124" r="8" />
            <circle cx="56" cy="124" r="6" />
          </g>
          {/* 客車2両。 */}
          <rect x="74" y="88" width="92" height="36" rx="4" fill="#4a5578" />
          <rect x="174" y="88" width="92" height="36" rx="4" fill="#4a5578" />
          <g fill="#2c3452">
            <circle cx="90" cy="124" r="6" />
            <circle cx="150" cy="124" r="6" />
            <circle cx="190" cy="124" r="6" />
            <circle cx="250" cy="124" r="6" />
          </g>
        </g>
        {/* 窓明かり。ここだけ不透明に近い。 */}
        <g className="atn-glow" fill="#f2d98a" opacity="0.85">
          <rect x="48" y="74" width="13" height="9" rx="1.5" />
          {[80, 100, 120, 140].map((x) => (
            <rect key={x} x={x} y={94} width={13} height={11} rx={1.5} />
          ))}
          {[180, 200, 220, 240].map((x) => (
            <rect key={x} x={x} y={94} width={13} height={11} rx={1.5} />
          ))}
        </g>
        {/* 前照灯のにじみ。 */}
        <ellipse cx="-8" cy="98" rx="18" ry="7" fill="#f2d98a" opacity="0.25" />
      </g>

      {/* 手前:駅の跡。ホームの縁だけが残る。 */}
      <rect y="148" width="400" height="62" fill="#2a3050" />
      <rect y="148" width="400" height="6" fill="#3f486b" />
      <path d="M0,154h400v3H0z" fill="#161c2c" />
      {/* 点かない街灯。 */}
      <g stroke="#3a4462" strokeWidth="4" fill="none">
        <path d="M70,206V128q0,-10 10,-10h6" />
      </g>
      <circle cx="90" cy="118" r="6" fill="#242c48" stroke="#3a4462" strokeWidth="2" />
      {/* 駅名標の枠。名前はもう無い。 */}
      <g>
        <g stroke="#3a4462" strokeWidth="3.4" fill="none">
          <path d="M306,206v-40M336,206v-40" />
        </g>
        <rect x="298" y="152" width="46" height="16" rx="2" fill="#39415f" />
        <rect x="302" y="156" width="38" height="8" rx="1.5" fill="#242c48" />
      </g>
      {/* ホームに置き去りのベンチ。誰も座っていない。 */}
      <g fill="#39415f">
        <rect x="168" y="178" width="56" height="6" rx="2" />
        <rect x="172" y="184" width="5" height="14" />
        <rect x="215" y="184" width="5" height="14" />
        <rect x="168" y="166" width="56" height="4" rx="2" />
      </g>
      <ellipse cx="196" cy="200" rx="32" ry="4" fill="#000" opacity="0.25" />
      {/* ホームの割れ目から生えた草(時間の経過)。 */}
      <g stroke="#3f5244" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M28,204q1,-6 4,-9M35,206q1,-5 3,-8M252,202q1,-6 4,-9M260,205q1,-5 3,-7M382,204q1,-6 4,-9" />
      </g>

      <style>{`
        .atn-train { animation: atn-glide 9s linear infinite; }
        @keyframes atn-glide {
          0%   { transform: translateX(420px); opacity: 0; }
          12%  { opacity: 1; }
          46%  { transform: translateX(80px); opacity: 1; }
          58%  { transform: translateX(40px); opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateX(-300px); opacity: 0; }
        }
        .atn-glow { animation: atn-flicker 1.8s ease-in-out infinite; }
        @keyframes atn-flicker {
          0%, 100% { opacity: 0.85; }
          45%      { opacity: 0.55; }
          60%      { opacity: 0.9; }
        }
        .atn-star1 { animation: atn-twinkle 3.2s ease-in-out infinite; }
        .atn-star2 { animation: atn-twinkle 3.2s ease-in-out 1.6s infinite; }
        @keyframes atn-twinkle {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .atn-train, .atn-glow, .atn-star1, .atn-star2 { animation: none; }
          /* 列車は無人のホームに停まった位置で止める。 */
          .atn-train { transform: translateX(60px); }
        }
      `}</style>
    </svg>
  );
}
