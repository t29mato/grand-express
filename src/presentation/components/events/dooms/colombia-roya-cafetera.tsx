/**
 * コーヒーさび病が収穫を減らす(コロンビア盤の厄災 2/7・percentLoss)。
 *
 * 構図表の担当:**湿った曇り・畝の中の接写・葉の橙斑・人1・深緑。晴れの青は使わない。**
 *
 * 画面手前に大きなコーヒーの枝。葉の裏に赤橙のさび斑が広がっている。
 * 農夫が1枚の葉を持ち上げて検分し、実の残りは少ない。
 * 動くのは**斑点の脈動(広がって見える)・はらりと落ちる1枚の葉・霧の流れ・
 * 農夫の腕**。止めた状態でも、橙の斑と落ちた葉で「病気」と分かる。
 */
export function ColombiaRoyaCafetera() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 湿った曇り空(青を使わない) */}
      <rect width="400" height="210" fill="#aab4a8" />
      <rect y="34" width="400" height="26" fill="#bcc4b8" />

      {/* 奥のコーヒーの畝(中景) */}
      <path d="M0,60 q100,-16 200,-6 q100,10 200,-12 V210 H0 Z" fill="#3a7040" />
      <g fill="#2d6b3f">
        {[10, 44, 78, 112, 146, 180, 214, 248, 282, 316, 350, 384].map((x) => (
          <ellipse key={x} cx={x} cy={70 + (x % 5) * 4} rx="15" ry="11" />
        ))}
      </g>
      <g fill="#255f36">
        {[26, 62, 96, 130, 164, 198, 232, 266, 300, 334, 368].map((x) => (
          <ellipse key={x} cx={x} cy={92 + (x % 4) * 5} rx="17" ry="12" />
        ))}
      </g>
      {/* 谷の霧 */}
      <g className="roy-mist" fill="#cfd8cc" opacity="0.6">
        <ellipse cx="90" cy="56" rx="110" ry="9" />
        <ellipse cx="320" cy="64" rx="90" ry="7" />
      </g>

      {/* 手前の地面 */}
      <rect y="120" width="400" height="90" fill="#265f3c" />
      <path d="M0,120 q100,-8 200,-2 q100,6 200,-6 v10 q-100,10 -200,4 Q100,122 0,130 Z" fill="#2d6b3f" />

      {/* 主役:画面左から伸びる大きなコーヒーの枝 */}
      <g>
        <path d="M0,96 q60,10 120,30 q50,16 86,40" stroke="#5a4630" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M60,112 q20,-8 34,-22 M118,132 q22,-6 36,-18 M170,152 q20,-4 34,-14" stroke="#5a4630" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* 健康な葉(少数) */}
        <g fill="#3f8f52">
          <ellipse cx="100" cy="84" rx="20" ry="9" transform="rotate(-34 100 84)" />
          <ellipse cx="212" cy="130" rx="19" ry="8.4" transform="rotate(-30 212 130)" />
        </g>
        {/* 病んだ葉:黄ばんだ地に赤橙の斑 */}
        <g>
          <ellipse cx="52" cy="102" rx="22" ry="10" transform="rotate(-20 52 102)" fill="#8f9a4a" />
          <g className="roy-spot" fill="#c86a2f">
            <circle cx="44" cy="100" r="3.4" />
            <circle cx="54" cy="105" r="2.8" />
            <circle cx="61" cy="99" r="2.2" />
          </g>
          <ellipse cx="152" cy="112" rx="23" ry="10" transform="rotate(-28 152 112)" fill="#9aa14e" />
          <g className="roy-spot2" fill="#c8641f">
            <circle cx="142" cy="114" r="3.6" />
            <circle cx="152" cy="108" r="2.6" />
            <circle cx="160" cy="112" r="3" />
            <circle cx="148" cy="120" r="2" />
          </g>
          <ellipse cx="258" cy="152" rx="21" ry="9" transform="rotate(-24 258 152)" fill="#8f9a4a" />
          <g className="roy-spot3" fill="#c86a2f">
            <circle cx="250" cy="150" r="3" />
            <circle cx="260" cy="155" r="2.6" />
            <circle cx="266" cy="149" r="2" />
          </g>
        </g>
        {/* 実:熟したのはわずか、緑の実と、しなびた実 */}
        <g>
          <circle cx="84" cy="106" r="3.4" fill="#e8443f" />
          <circle cx="92" cy="112" r="3.2" fill="#4f8048" />
          <circle cx="130" cy="126" r="3.2" fill="#4f8048" />
          <circle cx="138" cy="132" r="3" fill="#6b5330" />
          <circle cx="196" cy="146" r="3.2" fill="#e8443f" />
          <circle cx="204" cy="152" r="3" fill="#6b5330" />
        </g>
      </g>

      {/* はらりと落ちる葉。**静的位置は地面=落ちた結果** */}
      <g className="roy-fall">
        <ellipse cx="150" cy="196" rx="12" ry="5" transform="rotate(-12 150 196)" fill="#a8842f" />
        <circle cx="146" cy="194" r="2" fill="#c86a2f" />
      </g>
      {/* すでに落ちて積もった葉 */}
      <g fill="#8f6f2f" opacity="0.9">
        <ellipse cx="96" cy="200" rx="10" ry="4" transform="rotate(10 96 200)" />
        <ellipse cx="122" cy="205" rx="11" ry="4" transform="rotate(-8 122 205)" />
        <ellipse cx="180" cy="203" rx="10" ry="4" transform="rotate(14 180 203)" />
      </g>

      {/* 農夫:麦わら帽+白シャツ+腰かご。葉を持ち上げて見る */}
      <g transform="translate(316,0)">
        <ellipse cx="0" cy="200" rx="15" ry="4" fill="#000" opacity="0.2" />
        <rect x="-5.4" y="172" width="5" height="28" fill="#4a3a28" />
        <rect x="1" y="172" width="5" height="28" fill="#4a3a28" />
        <path d="M-9,140 h18 l3,34 h-24 z" fill="#efe8d8" />
        <circle cx="0" cy="131" r="8.4" fill="#8a6a4a" />
        <path d="M-12,129 h24 l-3,-3 h-7 a8,8 0 0 0 -8,-5 a8,8 0 0 0 -6,8 z" fill="#c8a86a" />
        <path d="M-12,129 h24" stroke="#a8884a" strokeWidth="1.6" />
        {/* 検分する腕:葉をつまむ */}
        <g className="roy-arm">
          <path d="M-8,146 l-22,-8" stroke="#efe8d8" strokeWidth="5.4" strokeLinecap="round" fill="none" />
          <ellipse cx="-36" cy="134" rx="9" ry="4.4" transform="rotate(-18 -36 134)" fill="#9aa14e" />
          <circle cx="-38" cy="133" r="2.2" fill="#c86a2f" />
        </g>
        <path d="M8,146 l10,14" stroke="#efe8d8" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        {/* 腰の収穫かご(中はほぼ空) */}
        <path d="M8,160 q10,-2 16,4 l-3,14 q-8,3 -13,-2 z" fill="#b08a4f" />
        <path d="M9,164 q8,-1 13,3 M8.4,170 q8,-1 13,3" stroke="#8a6b3a" strokeWidth="1.4" fill="none" />
        <circle cx="16" cy="162" r="2.4" fill="#e8443f" />
      </g>

      {/* 手前の草 */}
      <g stroke="#3f8f52" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M20,208 q2,-6 6,-9 M28,209 q1,-5 4,-8 M370,206 q2,-6 6,-9 M380,208 q1,-5 4,-8" />
      </g>

      <style>{`
        .roy-mist { animation: roy-drift 8s ease-in-out infinite; }
        @keyframes roy-drift {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(-16px); }
        }
        .roy-spot, .roy-spot2, .roy-spot3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .roy-spot  { animation: roy-bloom 4.2s ease-in-out infinite; }
        .roy-spot2 { animation: roy-bloom 4.2s ease-in-out 1.2s infinite; }
        .roy-spot3 { animation: roy-bloom 4.2s ease-in-out 2.4s infinite; }
        @keyframes roy-bloom {
          0%, 100% { transform: scale(1); opacity: 1; }
          40%      { transform: scale(0.82); opacity: 0.8; }
        }
        .roy-fall {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: roy-drop 5.2s ease-in infinite;
        }
        @keyframes roy-drop {
          0%   { transform: translate(24px, -72px) rotate(50deg); opacity: 0; }
          12%  { opacity: 1; }
          40%  { transform: translate(-8px, -36px) rotate(-18deg); }
          70%  { transform: translate(6px, -10px) rotate(16deg); }
          88%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        }
        .roy-arm {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: roy-inspect 4.6s ease-in-out infinite;
        }
        @keyframes roy-inspect {
          0%, 100% { transform: rotate(0deg); }
          55%      { transform: rotate(-7deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .roy-mist, .roy-spot, .roy-spot2, .roy-spot3, .roy-fall, .roy-arm {
            animation: none;
          }
        }
      `}</style>
    </svg>
  );
}
